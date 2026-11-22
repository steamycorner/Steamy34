    // =====================================================================
    //  10. ARTIST / CHARACTER BAR ON THUMBNAILS (posts page)
    //  Thumbnails only carry plain tag names, not their type. Types are
    //  learned from every tag list the script sees (the posts page sidebar,
    //  every loaded page, every post page) and remembered between visits.
    //  Thumbnails still missing info quietly load their post page, one at a
    //  time, while they're on screen.
    // =====================================================================

    const TAGTYPE_KEY = 'steamy34_tagtypes';
    const TAGTYPE_LIMIT = 40000;
    const tagTypes = new Map(Object.entries((() => {
        try { return GM_getValue(TAGTYPE_KEY, {}) || {}; } catch (e) { return {}; }
    })()));
    let tagTypeSaveTimer = null;

    function learnTagTypes(doc) {
        let learned = 0;
        doc.querySelectorAll('#tag-sidebar li[class*="tag-type-"]').forEach(row => {
            const m = row.className.match(/tag-type-([a-z]+)/);
            const tag = getTagFromRow(row).toLowerCase();
            if (!m || !tag) return;
            if (tagTypes.get(tag) !== m[1]) {
                tagTypes.set(tag, m[1]);
                learned++;
            }
        });
        if (learned) {
            scheduleTagTypeSave();
            if (CONFIG.thumbTagBar && !isPostView) refreshTagBars();
        }
    }

    // The list can hold tens of thousands of tags, so it's saved at most
    // every 15 s while tags are being learned - and right away when you
    // leave or switch away from the page, so nothing gets lost.
    const TAGTYPE_SAVE_MS = 15000;
    function scheduleTagTypeSave() {
        if (tagTypeSaveTimer) return; // a save is already on its way
        tagTypeSaveTimer = setTimeout(saveTagTypes, TAGTYPE_SAVE_MS);
    }
    function flushTagTypes() {
        if (tagTypeSaveTimer) saveTagTypes();
    }
    window.addEventListener('pagehide', flushTagTypes);
    document.addEventListener('visibilitychange', () => { if (document.hidden) flushTagTypes(); });

    // ---- Tag types from the suggestion server ----
    // That server isn't behind the site's Cloudflare check, so this keeps
    // working when loading post pages doesn't. One tag per request.
    const acMissed = new Set(); // tags the server didn't know (this visit only)

    function normalizeType(t) {
        t = String(t || '').toLowerCase();
        if (t === 'meta') return 'metadata';
        if (t === 'char') return 'character';
        return t;
    }

    // Resolves the given tags; returns how many types were learned.
    // Throws if the suggestion server can't be reached at all.
    async function lookupTypesViaSuggestions(tags) {
        let learned = 0;
        for (const tag of tags) {
            if (tagTypes.has(tag) || acMissed.has(tag)) continue;
            const list = await acQuery(tag);
            const hit = list.find(s => s.value.toLowerCase() === tag && s.type);
            if (hit) {
                tagTypes.set(tag, normalizeType(hit.type));
                learned++;
            } else {
                acMissed.add(tag);
            }
            await new Promise(r => setTimeout(r, 120)); // small gap between requests
        }
        if (learned) scheduleTagTypeSave();
        return learned;
    }

    function saveTagTypes() {
        clearTimeout(tagTypeSaveTimer);
        tagTypeSaveTimer = null;
        // Keep the newest entries if the memory gets too big
        if (tagTypes.size > TAGTYPE_LIMIT) {
            const keep = Array.from(tagTypes.entries()).slice(-Math.floor(TAGTYPE_LIMIT * 0.75));
            tagTypes.clear();
            keep.forEach(([k, v]) => tagTypes.set(k, v));
        }
        try { GM_setValue(TAGTYPE_KEY, Object.fromEntries(tagTypes)); } catch (e) {}
    }

    function thumbTagList(thumb) {
        const img = thumb.querySelector('img');
        return img ? thumbTags(img).trim().split(' ').filter(Boolean) : [];
    }

    function prettyTag(tag) {
        return tag.replace(/_/g, ' ');
    }

    function makeChip(tag, type, blockedSet, words) {
        const isBl = blockedSet.has(tag);
        const chip = document.createElement('span');
        chip.className = 's34-chip s34-chip-' + type + (isBl ? ' s34-chip-blocked' : '');

        const name = document.createElement('a');
        name.className = 's34-chip-name';
        name.href = 'index.php?page=post&s=list&tags=' + encodeURIComponent(tag);
        name.textContent = prettyTag(tag);
        name.title = (isBl ? 'Blacklisted – ' : '') + 'Search ' + prettyTag(tag);

        const block = document.createElement('button');
        block.type = 'button';
        block.className = 's34-chip-block';
        block.textContent = isBl ? '↺' : '⊘'; // ↺ unblock / ⊘ block
        block.title = (isBl ? 'Remove from blacklist: ' : 'Blacklist ') + prettyTag(tag);
        block.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();
            toggleFromBar(tag);
        });

        chip.append(name);
        // "+" / "−" / "↺": add the tag to the search or take it out again
        if (CONFIG.addToSearchButtons) chip.append(makeAddButton(tag, 's34-chip-add', words));
        chip.append(block);
        return chip;
    }

    // Blacklist + search words, shared by all tag bars rendered in one go
    function tagBarContext() {
        return {
            blockedSet: new Set(readBlocklist().map(t => t.toLowerCase())),
            words: CONFIG.addToSearchButtons ? searchWords() : []
        };
    }

    function renderTagBar(thumb, ctx) {
        const tags = thumb._s34Tags || (thumb._s34Tags = thumbTagList(thumb));
        const groups = [
            ['artist', tags.filter(t => tagTypes.get(t) === 'artist')],
            ['character', tags.filter(t => tagTypes.get(t) === 'character')]
        ];
        const state = {
            hasArtist: groups[0][1].length > 0,
            hasUnknown: tags.some(t => !tagTypes.has(t))
        };
        ctx = ctx || tagBarContext();

        // Nothing changed since the last time? Then leave the DOM alone
        // (rebuilding hundreds of bars was what made long pages slow).
        const shown = groups.map(([type, list]) => [type, list.slice(0, CONFIG.tagBarMax), list.length]);
        const sig = JSON.stringify([
            shown,
            shown.map(([, list]) => list.map(t => (ctx.blockedSet.has(t) ? 'b' : '') + searchState(t, ctx.words))),
            thumb.dataset.s34Lookup || ''
        ]);
        let bar = thumb.querySelector('.s34-tagbar');
        if (bar && thumb._s34BarSig === sig) return state;
        thumb._s34BarSig = sig;

        if (!bar) {
            bar = document.createElement('div');
            bar.className = 's34-tagbar';
            thumb.appendChild(bar);
        }
        bar.replaceChildren();
        const blockedSet = ctx.blockedSet;

        groups.forEach(([type, list]) => {
            if (!list.length) return;
            const row = document.createElement('div');
            row.className = 's34-chiprow';
            list.slice(0, CONFIG.tagBarMax).forEach(t => row.appendChild(makeChip(t, type, blockedSet, ctx.words)));
            if (list.length > CONFIG.tagBarMax) {
                const more = document.createElement('span');
                more.className = 's34-chip-more';
                more.textContent = '+' + (list.length - CONFIG.tagBarMax);
                more.title = list.slice(CONFIG.tagBarMax).map(prettyTag).join(', ');
                row.appendChild(more);
            }
            bar.appendChild(row);
        });
        // Nothing known yet but a lookup is on its way -> small placeholder
        if (!bar.childElementCount && thumb.dataset.s34Lookup === 'queued') {
            const wait = document.createElement('span');
            wait.className = 's34-chip-more s34-chip-wait';
            wait.textContent = 'loading tags…';
            bar.appendChild(wait);
        }
        bar.style.display = bar.childElementCount ? '' : 'none';

        return state;
    }

    // Thumbnails on (or near) the screen, kept up to date by the observer
    const barsInView = new Set();

    // Update the tag bars after new tag types were learned. Only the ones you
    // can see are redrawn (others catch up when they scroll into view), and
    // many calls in a row are bundled into one.
    let refreshBarsTimer = null;
    function refreshTagBars() {
        if (refreshBarsTimer) return;
        refreshBarsTimer = setTimeout(() => {
            refreshBarsTimer = null;
            const ctx = tagBarContext();
            barsInView.forEach(thumb => {
                if (thumb.isConnected) renderTagBar(thumb, ctx);
                else barsInView.delete(thumb);
            });
        }, 250);
    }

    // ---- Looking up missing tag types: one post page at a time ----
    const lookupQueue = [];
    let lookupRunning = false;

    function queueLookup(thumb) {
        if (thumb.dataset.s34Lookup) return;
        thumb.dataset.s34Lookup = 'queued';
        lookupQueue.push(thumb);
        renderTagBar(thumb); // shows the "…" placeholder
        runLookups();
    }

    // Is the thumbnail on screen or close to it?
    function nearViewport(el, margin = 600) {
        const r = el.getBoundingClientRect();
        return r.bottom > -margin && r.top < window.innerHeight + margin;
    }

    // Drop a thumbnail from the queue; it is queued again when it scrolls into view
    function unqueue(thumb) {
        delete thumb.dataset.s34Lookup;
        if (thumb.isConnected) renderTagBar(thumb);
    }

    let lookupRunId = 0;          // a restarted queue makes an older, stuck run quit
    let lookupProgressAt = 0;     // last time the queue did something

    async function runLookups() {
        if (lookupRunning) return;
        lookupRunning = true;
        const myRun = ++lookupRunId;
        lookupProgressAt = Date.now();
        try {
            while (lookupQueue.length && myRun === lookupRunId) {
                lookupProgressAt = Date.now();

                // (No waiting for Cloudflare here: the suggestion server still
                // works during a check; only the post-page fallback is skipped.)

                // Newest first: what you're looking at right now beats what you
                // scrolled past. Anything far off screen is dropped for now.
                const thumb = lookupQueue.pop();
                try {
                    const link = thumb.querySelector('a[href]');
                    if (!thumb.isConnected || !link || !nearViewport(thumb)) { unqueue(thumb); continue; }

                    const state = renderTagBar(thumb);
                    if (state.hasArtist || !state.hasUnknown) { thumb.dataset.s34Lookup = 'done'; renderTagBar(thumb); continue; }

                    const postId = new URL(link.href, location.href).searchParams.get('id');
                    let usedPostPage = false;

                    // 1) Ask the suggestion server about the unknown tags
                    //    (not affected by the site's Cloudflare checks)
                    let acOk = true;
                    try {
                        const unknown = thumbTagList(thumb).filter(t => !tagTypes.has(t) && !acMissed.has(t));
                        await lookupTypesViaSuggestions(unknown.slice(0, 40));
                    } catch (e) {
                        acOk = false; // server unreachable -> fall back to the post page
                    }
                    lookupProgressAt = Date.now();
                    if (myRun !== lookupRunId) { lookupQueue.push(thumb); break; }

                    let result = renderTagBar(thumb);
                    if (CONFIG.thumbTagBar) refreshTagBars(); // other thumbnails share tags

                    // 2) Still no artist? Read the post page - unless Cloudflare is checking
                    if (!result.hasArtist && !cloudflarePaused() && (!acOk || result.hasUnknown)) {
                        usedPostPage = true;
                        const doc = await fetchPostDoc(link.href, 'lookup', { wanted: () => thumb.isConnected && nearViewport(thumb) });
                        lookupProgressAt = Date.now();
                        if (myRun !== lookupRunId) { lookupQueue.push(thumb); break; }
                        if (!doc && !cloudflarePaused() && !acOk) {
                            console.log('[Steamy34] Tags: post', postId, '→ could not load tags');
                            unqueue(thumb); // retried when it comes into view again
                            continue;
                        }
                    }

                    thumb.dataset.s34Lookup = 'done';
                    result = renderTagBar(thumb);
                    console.log('[Steamy34] Tags: post', postId, '→',
                        result.hasArtist ? 'artist found' : 'no artist tag found',
                        usedPostPage ? '(via post page)' : '(via suggestions)');

                    // Be gentle with the site; post pages need a longer gap
                    await new Promise(r => setTimeout(r, usedPostPage ? 1200 : 150));
                    continue;
                } catch (err) {
                    // One bad thumbnail must never stop the whole queue
                    console.warn('[Steamy34] Tag lookup error:', err);
                    unqueue(thumb);
                }
                await new Promise(r => setTimeout(r, 1200));
            }
        } finally {
            if (myRun === lookupRunId) lookupRunning = false;
        }
    }

    const tagBarObserver = new IntersectionObserver(entries => {
        let ctx = null;
        entries.forEach(e => {
            const thumb = e.target;
            if (!e.isIntersecting) { barsInView.delete(thumb); return; }
            barsInView.add(thumb);
            const state = renderTagBar(thumb, ctx || (ctx = tagBarContext()));
            if (CONFIG.tagBarLookup && !state.hasArtist && state.hasUnknown) queueLookup(thumb);
        });
    }, { rootMargin: '300px 0px' });

    // Safety net: every few seconds, queue visible thumbnails that still
    // have no artist (e.g. ones whose lookup failed or was dropped)
    setInterval(() => {
        if (!CONFIG.thumbTagBar || !CONFIG.tagBarLookup || isPostView || document.hidden) return;

        // Watchdog: queue has work but isn't running, or hasn't moved in 30s -> restart it
        if (lookupQueue.length && (!lookupRunning || Date.now() - lookupProgressAt > 30000)) {
            if (lookupRunning) console.warn('[Steamy34] Tag lookups were stuck - restarting.');
            lookupRunning = false;
            runLookups();
        }

        // Only the thumbnails on screen (not every loaded one)
        let ctx = null;
        barsInView.forEach(thumb => {
            if (!thumb.isConnected) { barsInView.delete(thumb); return; }
            if (thumb.dataset.s34Lookup || !nearViewport(thumb, 0)) return;
            const state = renderTagBar(thumb, ctx || (ctx = tagBarContext()));
            if (!state.hasArtist && state.hasUnknown) queueLookup(thumb);
        });
    }, 4000);

    function setupTagBars(thumbs) {
        (thumbs || pageThumbs()).forEach(thumb => {
            if (thumb.dataset.s34Tagbar) return;
            thumb.dataset.s34Tagbar = '1';
            renderTagBar(thumb);
            tagBarObserver.observe(thumb);
        });
    }

    // ---- Blocking from the bar, with Undo ----
    // Blocking from the bar does NOT make posts vanish: posts already on the
    // page are greyed out and labelled "Blacklisted", so you can keep
    // blocking more tags. Pages loaded later hide them as usual.
    function toggleFromBar(tag) {
        const nowBlocked = toggleBlock(tag);
        markBlocklisted();
        if (nowBlocked) {
            showToast(`Blacklisted "${prettyTag(tag)}"`, 'Undo', () => {
                if (isBlocked(tag)) toggleBlock(tag);
                markBlocklisted();
            });
        } else {
            showToast(`Removed "${prettyTag(tag)}" from the blacklist`);
        }
    }

    function markBlocklisted() {
        const blocked = new Set(readBlocklist().map(t => t.toLowerCase()));
        const ctx = tagBarContext();
        document.querySelectorAll('.image-list span.thumb').forEach(thumb => {
            const hits = (thumb._s34Tags || thumbTagList(thumb)).filter(t => blocked.has(t));
            let label = thumb.querySelector('.s34-bl-label');

            if (hits.length) {
                // Already hidden (came in on a later page)? Leave it hidden.
                if (thumb.classList.contains('s34-bl-hidden')) return;
                thumb.classList.add('s34-bl-marked');
                if (!label) {
                    label = document.createElement('div');
                    label.className = 's34-bl-label';
                    thumb.appendChild(label);
                }
                label.textContent = 'Blacklisted: ' + hits.map(prettyTag).join(', ');
            } else {
                thumb.classList.remove('s34-bl-marked', 's34-bl-hidden');
                if (label) label.remove();
            }
            if (thumb.dataset.s34Tagbar) renderTagBar(thumb, ctx); // update chip states (only if changed)
        });
        if (popupState) renderPopupTags(); // popup viewer shows the same states
    }

    // Messages at the bottom. Several can be on screen at once (newest at the
    // bottom, at most 3), each with its own timer - so an "Undo" doesn't
    // vanish just because another message came in. The same text twice
    // just refreshes the one that's there.
    // durationMs = 0 keeps the message until it's closed
    const TOAST_MAX = 3;

    function hideToast(toast) {
        if (!toast || !toast.isConnected) return;
        clearTimeout(toast._s34Timer);
        toast.classList.remove('s34-show');
        setTimeout(() => toast.remove(), 220);
    }

    function showToast(text, actionLabel, action, durationMs = 6000) {
        if (!document.body) return;
        let stack = document.querySelector('.s34-toasts');
        if (!stack) {
            stack = document.createElement('div');
            stack.className = 's34-toasts';
            document.body.appendChild(stack);
        }
        const live = Array.from(stack.querySelectorAll('.s34-toast.s34-show'));
        let toast = live.find(t => t._s34Text === text + '|' + (actionLabel || ''));
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 's34-toast';
            toast._s34Text = text + '|' + (actionLabel || '');
            const msg = document.createElement('span');
            msg.textContent = text;
            toast.appendChild(msg);
            if (actionLabel) {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.textContent = actionLabel;
                btn.addEventListener('click', () => {
                    action();
                    hideToast(toast);
                });
                toast.appendChild(btn);
            }
            const close = document.createElement('button');
            close.type = 'button';
            close.setAttribute('aria-label', 'Close');
            close.className = 's34-toast-close';
            close.textContent = '✕';
            close.title = 'Close';
            close.addEventListener('click', () => hideToast(toast));
            toast.appendChild(close);
            stack.appendChild(toast);
            // Too many? The oldest goes first
            live.slice(0, Math.max(0, live.length + 1 - TOAST_MAX)).forEach(hideToast);
            requestAnimationFrame(() => toast.classList.add('s34-show'));
        }
        clearTimeout(toast._s34Timer);
        if (durationMs > 0) toast._s34Timer = setTimeout(() => hideToast(toast), durationMs);
    }

    function makeDivider(pageNumber) {
        const div = document.createElement('div');
        div.className = 's34-page-divider';
        const label = document.createElement('span');
        label.textContent = 'Page ' + pageNumber;
        div.appendChild(label);
        return div;
    }

    // The popup asks for the next page when you browse to the end of what's
    // loaded (Beta 3.5.1): 'more' | 'loading' | 'done', null = no infinite
    // scroll on this page. Ask with the 's34-load-more' event.
    let infiniteState = null;

    function setupInfiniteScroll() {
        const list = document.querySelector('.image-list');
        const paginator = document.querySelector('#paginator');
        if (!list || !paginator) return;

        // Next pages are built by counting up "pid" ourselves rather than
        // trusting each fetched page's links - that was ending too early.
        const startPid = pidOf(location.href);
        const info = readPagination(document, startPid);
        if (info.step) pageStep = info.step;
        let maxPid = info.maxPid;               // last page, if the links show it
        if (maxPid === null && !getNextPageUrl(document)) return; // single page of results
        let nextPid = startPid + pageStep;
        let done = false;
        let failures = 0;

        function urlForPid(pid) {
            const u = new URL(location.href);
            u.searchParams.set('pid', String(pid));
            return u.href;
        }

        let loading = false;

        list.dataset.s34Pid = String(startPid); // which page each block is (for "continue where you left off")

        const status = document.createElement('div');
        status.className = 's34-scroll-status';
        list.after(status); // new pages are inserted right before this
        paginator.style.display = 'none';

        // Marker for the page you started on, so every page is labelled
        if (CONFIG.pageDividers) {
            const first = makeDivider(pageNumberOf(location.href));
            first.classList.add('s34-first');
            list.before(first);
        }

        // ---- Cleanup of far-away pages ----
        // A page block that is far outside the window is emptied: its height
        // is kept (so the scroll position doesn't jump), the thumbnails are
        // parked in memory without their images, and everything is put back
        // when you scroll near it again.
        const parked = new Map(); // block -> DocumentFragment

        function park(block) {
            if (parked.has(block)) return;
            const h = block.getBoundingClientRect().height;
            if (!h) return;
            block.style.height = h + 'px';
            block.querySelectorAll('img').forEach(img => {
                const src = img.getAttribute('src');
                if (src) {
                    img.dataset.s34Src = src;
                    img.removeAttribute('src'); // lets the browser free the decoded image
                }
            });
            const frag = document.createDocumentFragment();
            while (block.firstChild) frag.appendChild(block.firstChild);
            parked.set(block, frag);
        }

        function unpark(block) {
            const frag = parked.get(block);
            if (!frag) return;
            parked.delete(block);
            frag.querySelectorAll('img[data-s34-src]').forEach(img => {
                img.src = img.dataset.s34Src; // comes straight from the browser cache
                delete img.dataset.s34Src;
            });
            block.appendChild(frag);
            block.style.height = '';
        }

        const cleanupObserver = CONFIG.cleanupFarPages
            ? new IntersectionObserver(entries => {
                // Only pages you've been near are unloaded (the ones far behind
                // you). A freshly loaded page further down is never put away
                // before you reach it - the popup steps into it (Beta 3.8 fix).
                entries.forEach(e => {
                    if (e.isIntersecting) { e.target.dataset.s34Near = '1'; unpark(e.target); }
                    else if (e.target.dataset.s34Near) park(e.target);
                });
            }, { rootMargin: `${CONFIG.cleanupDistance}px 0px ${CONFIG.cleanupDistance}px 0px` })
            : null;

        if (cleanupObserver) cleanupObserver.observe(list);

        function finish(reason) {
            done = true;
            status.textContent = 'End of results';
            console.log('[Steamy34] Infinite scroll finished:', reason);
        }

        const sleep = ms => new Promise(r => setTimeout(r, ms));

        async function loadNext() {
            if (loading || done) return;
            if (maxPid !== null && nextPid > maxPid) { finish('passed the last page (pid ' + maxPid + ')'); return; }
            loading = true;
            status.onclick = null;
            status.textContent = 'Loading more…';
            const nextUrl = urlForPid(nextPid);

            let ok = false;
            try {
                // (through the shared line - a check throws err.cloudflare)
                const res = await loadPage(nextUrl, 'scroll', { ms: 30000 });
                if (!res.ok) throw new Error('HTTP ' + res.status);
                const doc = new DOMParser().parseFromString(res.html, 'text/html');

                // No post list at all = rate limit / check page, not the end
                if (!doc.querySelector('.image-list')) throw new Error('page had no post list (rate limit or check page?)');

                learnTagTypes(doc); // its sidebar lists the types of that page's tags
                const newThumbs = Array.from(doc.querySelectorAll('.image-list span.thumb'))
                    .map(t => document.adoptNode(t));

                // The site may know about more pages now
                const more = readPagination(doc, nextPid);
                if (more.maxPid !== null && (maxPid === null || more.maxPid > maxPid)) maxPid = more.maxPid;

                if (!newThumbs.length) {
                    finish('page ' + pageNumberOf(nextUrl) + ' was empty');
                } else {
                    if (CONFIG.pageDividers) {
                        status.parentNode.insertBefore(makeDivider(pageNumberOf(nextUrl)), status);
                    }

                    // Each page gets its own block, so the half-full last row
                    // of a page isn't stretched by the justified layout
                    const block = document.createElement('div');
                    block.className = list.className;
                    block.dataset.s34Pid = String(nextPid);
                    hideBlocklisted(newThumbs); // before they're shown
                    newThumbs.forEach(t => block.appendChild(t));
                    status.parentNode.insertBefore(block, status);
                    if (cleanupObserver) cleanupObserver.observe(block);
                    enhanceThumbs(newThumbs);

                    nextPid += pageStep;
                    status.textContent = '';
                }
                failures = 0;
                ok = true;
            } catch (err) {
                if (err.cloudflare) {
                    // Can't continue until the check is solved: wait for it
                    // ("Solve check" right here, where loading stopped)
                    status.replaceChildren(cloudflareInline('Loading more waits for a quick Cloudflare check.'));
                    window.addEventListener('s34-cf-passed', () => {
                        status.textContent = '';
                        failures = 0;
                        loadNext();
                    }, { once: true });
                    loading = false;
                    return;
                }
                failures++;
                console.warn('[Steamy34] Could not load', nextUrl, '-', err.message || err, '(attempt ' + failures + ')');
                const reason = String(err.message || err).slice(0, 60);
                if (failures <= 3) {
                    // Wait a bit longer each time, then try again by itself
                    status.textContent = `Site is busy (${reason}) – retrying…`;
                    await sleep(2500 * failures);
                } else {
                    status.textContent = `Could not load more (${reason}) – click to retry`;
                    status.onclick = () => { failures = 0; loadNext(); };
                    loading = false;
                    return;
                }
            }

            loading = false;
            if (done) return;
            // Still near the bottom (e.g. lots of blocked posts, or a retry)? Keep going,
            // with a short pause so the site isn't flooded with requests.
            if (!ok || status.getBoundingClientRect().top < window.innerHeight + CONFIG.infiniteScrollMargin) {
                await sleep(ok ? 400 : 0);
                loadNext();
            }
        }

        new IntersectionObserver(entries => {
            if (entries.some(e => e.isIntersecting)) loadNext();
        }, { rootMargin: `0px 0px ${CONFIG.infiniteScrollMargin}px 0px` }).observe(status);

        // The popup reached the end of the loaded posts
        infiniteState = () => (done ? 'done' : loading ? 'loading' : 'more');
        window.addEventListener('s34-load-more', () => { if (!loading && !done) loadNext(); });

        // Posts were hidden (e.g. "Hide viewed" switched on) while the end of
        // the list was already on screen: the observer doesn't fire again in
        // that case, so check by hand and keep loading.
        window.addEventListener('s34-layout-changed', () => {
            requestAnimationFrame(() => {
                if (!loading && !done && status.getBoundingClientRect().top < window.innerHeight + CONFIG.infiniteScrollMargin) loadNext();
            });
        });
    }

