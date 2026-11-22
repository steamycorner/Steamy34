    // =====================================================================
    //  FOLLOWING WINDOW (Beta 3.6)
    //  Everything you follow in one window on top of the page you're on -
    //  the page underneath, its search, pins and filters stay as they are.
    //   - a row of circles: All and your artists. A
    //     coloured ring = new posts. The order is set when the window opens
    //     (new ones first), so nothing jumps around while you browse.
    //   - a small header: picture, name, new / total, Following, "Open as a search"
    //   - a grid of the newest posts, each in its own shape (rows of one
    //     height, like the posts page), NEW on the ones since
    //     your last visit. Always newest first: no score, size or sort here
    //     (the normal search does that - "Open as a search" goes there).
    //  A tile opens the normal popup viewer on top; its ← / → move through
    //  this grid and load more at the end. Closing it brings you back here.
    //  G (changeable) opens / closes the window, ← / → switch circles, Esc
    //  closes. Phones: full screen, the Back button closes.
    //  Pages load through the shared line (15-hover-cloudflare.js): a circle's
    //  first page as 'popup', more while you scroll as 'scroll'. "All" merges
    //  the either/or searches (up to 20 artists each), newest first.
    //  fwState, FW_ALL and the keys ('all', 'a:artist') are in 20c.
    // =====================================================================
    const FW_PAGE = 42;          // posts added per step (one site page)
    const FW_NEAR_END = 900;     // px before the end of the grid at which more loads

    const FW_BIG_KEY = 'steamy34_fw_big'; // the window at nearly full size (remembered)
    const EXPAND_SVG = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6"/><path d="M20 4l-7 7"/><path d="M10 20H4v-6"/><path d="M4 20l7-7"/></svg>';
    const SHRINK_SVG = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 11h-6V5"/><path d="M13 11l7-7"/><path d="M5 13h6v6"/><path d="M11 13l-7 7"/></svg>';

    const fwEl = sel => fwState && fwState.overlay.querySelector(sel);

    // Bigger: nearly the whole window - a margin of the dimmed page stays
    // around it, so it still reads as a window on top of your page
    function fwSetBig(big, overlay) {
        overlay.classList.toggle('s34-fw-large', big);
        const b = overlay.querySelector('.s34-fw-size');
        if (!b) return;
        b.innerHTML = (big ? SHRINK_SVG + '<span>Smaller</span>' : EXPAND_SVG + '<span>Bigger</span>');
        b.title = big ? 'Back to the normal size' : 'Make the window nearly as big as the screen';
        b.setAttribute('aria-pressed', big ? 'true' : 'false');
    }
    const fwView = () => fwState && fwState.views.get(fwState.key);

    // Old feed pages (before 3.6, e.g. a bookmark of #s34-following=artist):
    // the address loses its # right away, and the window opens there (an old
    // followed search's page is just that search now)
    let fwFromAddress = null;
    (function () {
        if (isPostView) return;
        const f = feedFromHash(location.hash);
        if (!f) return;
        fwFromAddress = f.kind === 'all' ? FW_ALL : f.kind === 'artist' ? fwKeyArtist(f.tag) : null;
        try { history.replaceState(history.state, '', location.pathname + location.search); } catch (e) {}
    })();
    function openFollowFromAddress() {
        if (!fwFromAddress) return false;
        openFollowPopup(fwFromAddress);
        fwFromAddress = null;
        return true;
    }

    // What the circles show
    function fwItems(d) {
        d = d || getFollowing();
        const items = [];
        if (d.artists.length > 1) {
            const t = followTotals(d);
            items.push({ key: FW_ALL, kind: 'all', label: 'All', count: t.n, more: /\+/.test(t.text) });
        }
        d.artists.forEach(a => items.push({ key: fwKeyArtist(a.tag), kind: 'artist', tag: a.tag, label: prettyTag(a.tag), count: a.count || 0, more: !!a.more, pic: a.pic || '' }));
        return items;
    }

    // "Seen" as it was when the window opened (per artist): the
    // posts after it are NEW for as long as the window is open, even after
    // you looked at them once
    function fwSeen(k) {
        const st = fwState;
        if (!(k in st.seen)) {
            const it = findArtist(k.slice(2), getFollowing());
            st.seen[k] = it ? it.seen || 0 : 0;
        }
        return st.seen[k];
    }

    // A circle's picture: the newest post's thumbnail, else a letter / icon
    const fwHue = s => { let h = 0; for (const c of String(s)) h = (h * 31 + c.charCodeAt(0)) % 360; return h; };
    function fwAvatarHtml(item, pic) {
        if (item.kind === 'all') return `<span class="s34-fw-pic s34-fw-av s34-fw-allpic">${BELL_ON_SVG}</span>`;
        const src = pic || item.pic;
        const inner = src ? `<img class="s34-fw-av" alt="" src="${escapeHtml(src)}">`
            : `<span class="s34-fw-letter">${escapeHtml((item.label || '?').trim().charAt(0).toUpperCase())}</span>`;
        return `<span class="s34-fw-pic s34-fw-av" style="--h:${fwHue(item.label)}">${inner}</span>`;
    }

    // ---- Open / close ----
    // key: what to show ('all', 'a:artist'); none = All (or the first circle)
    function openFollowPopup(key) {
        if (popupState) closePopup(); // the post viewer steps aside
        const d = getFollowing();
        if (!fwState) fwBuild();
        const items = fwItems(d);
        if (!key || (!items.some(i => i.key === key) && !fwState.views.has(key))) key = items.length ? items[0].key : '';
        fwShow(key);
    }

    function fwBuild() {
        const d = getFollowing();
        const overlay = document.createElement('div');
        overlay.className = 's34-fw-overlay';
        overlay.innerHTML = `
            <div class="s34-fw" role="dialog" aria-modal="true" aria-label="Following">
                <div class="s34-fw-top">
                    <span class="s34-fw-title">${BELL_SVG}<b>Following</b></span>
                    <span class="s34-fw-checked"></span>
                    <button type="button" class="s34-fw-btn" data-fw="manage" title="Follow by name, unfollow, check now">Manage</button>
                    <button type="button" class="s34-fw-btn s34-fw-x" data-fw="close" aria-label="Close" title="Close (Esc)">✕</button>
                </div>
                <div class="s34-fw-circles" role="tablist" aria-label="What you follow"></div>
                <div class="s34-fw-scroll">
                    <div class="s34-fw-head"></div>
                    <div class="s34-fw-grid"></div>
                    <div class="s34-fw-status"></div>
                </div>
                <div class="s34-fw-foot"></div>
            </div>`;
        // New posts first, then the rest as you followed them
        const items = fwItems(d);
        const rank = i => (i.kind === 'all' ? 0 : i.kind === 'artist' ? (i.count ? 1 : 2) : (i.count ? 3 : 4));
        const order = items.map((it, n) => [it, n]).sort((a, b) => rank(a[0]) - rank(b[0]) || a[1] - b[1]).map(x => x[0].key);
        fwState = { overlay, key: '', order, seen: {}, views: new Map(), items: new Map(), pushedHistory: false };
        const keys = CONFIG.browseKeys === 'wasd' ? '<kbd>A</kbd> <kbd>D</kbd>' : '<kbd>←</kbd> <kbd>→</kbd>';
        overlay.querySelector('.s34-fw-foot').innerHTML =
            `<span><kbd>${escapeHtml(keyLabel(CONFIG.followingKey))}</kbd> open / close</span><span>${keys} previous / next</span><span><kbd>Esc</kbd> close</span><span>Scroll down for older posts</span>` +
            `<button type="button" class="s34-fw-btn s34-fw-size" data-fw="size"></button>`;
        fwSetBig(GM_getValue(FW_BIG_KEY, false) === true, overlay);

        overlay.addEventListener('mousedown', e => { if (e.target === overlay) closeFollowPopup(); });
        overlay.addEventListener('click', e => {
            const b = e.target.closest('[data-fw]');
            if (b) {
                const what = b.dataset.fw;
                if (what === 'close') closeFollowPopup();
                else if (what === 'manage') openFollowingWindow();
                else if (what === 'size') {
                    const big = !overlay.classList.contains('s34-fw-large');
                    fwSetBig(big, overlay);
                    try { GM_setValue(FW_BIG_KEY, big); } catch (err) {}
                    setTimeout(fwMaybeMore, 50); // more room - maybe more posts fit
                }
                else if (what === 'retry') { const v = fwView(); if (v) fwLoadMore(v); }
                else if (what === 'follow') {
                    const k = fwState.key;
                    if (k.startsWith('a:')) toggleFollow(k.slice(2));
                }
                return;
            }
            const c = e.target.closest('.s34-fw-c');
            if (c) { fwShow(c.dataset.key); return; }
            // A tile: the normal popup viewer (Ctrl / middle click: the post page in a new tab)
            const a = e.target.closest('.s34-fw-grid span.thumb a[href]');
            if (!a || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
            e.preventDefault();
            const view = fwView();
            if (view) openPopup(a.closest('span.thumb'), fwListFor(view));
        });
        overlay.querySelector('.s34-fw-scroll').addEventListener('scroll', fwMaybeMore, { passive: true });

        document.body.appendChild(overlay);
        document.documentElement.classList.add('s34-fw-open');
        // Phones: the Back button closes the window instead of leaving the page
        if (isPhoneLayout()) {
            try { history.pushState({ s34fw: true }, ''); fwState.pushedHistory = true; } catch (e) {}
        }
    }

    function closeFollowPopup(byBack) {
        const st = fwState;
        if (!st) return;
        if (popupState) closePopup();
        const v = fwView();
        if (v) v.scrollTop = fwEl('.s34-fw-scroll').scrollTop;
        fwState = null;
        st.overlay.remove();
        document.documentElement.classList.remove('s34-fw-open');
        if (st.pushedHistory && byBack !== true) {
            try { if (history.state && history.state.s34fw) history.back(); } catch (e) {}
        }
        renderFollowBox();
    }

    // Phones: Back closes the window (Back from a post opened in it only closes the post)
    window.addEventListener('popstate', () => {
        if (!fwState || !fwState.pushedHistory) return;
        if (history.state && history.state.s34fw) return; // back from the post viewer: still in the window
        closeFollowPopup(true);
    });

    // ---- Keys: G opens / closes, ← / → switch circles, Esc closes ----
    document.addEventListener('keydown', e => {
        const t = e.target;
        if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey) return;
        if (t && (t.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName))) return;
        if (popupState) return; // the post viewer has the keys (Esc closes it first)
        if (document.querySelector('.s34-overlay, .s34-cmenu, .s34-menu-overlay')) return; // a window or menu on top
        const toggleKey = e.code === CONFIG.followingKey && !e.shiftKey && !e.repeat;
        if (!fwState) {
            if (toggleKey) { e.preventDefault(); openFollowPopup(); }
            return;
        }
        if (e.key === 'Escape' || toggleKey) { e.preventDefault(); closeFollowPopup(); return; }
        const dir = browseDirection(e);
        if (dir) { e.preventDefault(); fwStep(dir); }
    }, true);

    function fwStep(dir) {
        const keys = fwOrderedItems().map(i => i.key);
        const i = keys.indexOf(fwState.key);
        const next = keys[i + dir];
        if (next) fwShow(next);
    }

    // ---- Showing one circle ----
    function fwShow(key) {
        const st = fwState;
        if (!st) return;
        const before = fwView();
        if (before) before.scrollTop = fwEl('.s34-fw-scroll').scrollTop;
        st.key = key;
        let view = st.views.get(key);
        if (!view) {
            view = fwNewView(key);
            st.views.set(key, view);
        }
        // "seen before" for everyone this view shows - before anything loads
        if (key === FW_ALL) view.sources.forEach(s => s.tags.forEach(t => fwSeen(fwKeyArtist(t))));
        else if (key) fwSeen(key);
        fwRenderCircles();
        fwRenderHead(view);
        fwEl('.s34-fw-grid').replaceChildren(...view.tiles);
        fwEl('.s34-fw-scroll').scrollTop = view.scrollTop || 0;
        fwRenderStatus(view);
        renderFollowBox(); // the sidebar row of what's shown
        const on = fwEl('.s34-fw-c.s34-on');
        if (on) { try { on.scrollIntoView({ block: 'nearest', inline: 'nearest' }); } catch (e) {} }
        if (!key) return;
        if (!view.tiles.length && view.state === 'more') fwLoadMore(view);
        else setTimeout(fwMaybeMore, 50);
    }

    // A view: one circle's grid, kept while the window is open (switching back is instant)
    function fwNewView(key) {
        const d = getFollowing();
        let sources = [];
        if (key === FW_ALL) sources = followGroups(d).map(g => ({ query: groupQuery(g), tags: g }));
        else if (key.startsWith('a:')) sources = [{ query: key.slice(2), tags: [key.slice(2)] }];
        sources.forEach(s => Object.assign(s, { next: null, started: false, done: false, buf: [] }));
        const item = fwItems(d).find(i => i.key === key) || {};
        return {
            key, sources, tiles: [], ids: new Set(), state: key ? 'more' : 'done', busy: false,
            total: null, pic: '', scrollTop: 0, newN: 0, countAtOpen: item.count || 0, moreAtOpen: !!item.more
        };
    }

    // The circles, in the order the window opened with (new follows at the end)
    function fwOrderedItems() {
        const st = fwState;
        const items = fwItems();
        items.forEach(i => { st.items.set(i.key, i); if (!st.order.includes(i.key)) st.order.push(i.key); });
        // what's shown stays in the row, even right after you unfollowed it
        if (st.key && !items.some(i => i.key === st.key) && st.items.has(st.key)) items.push(Object.assign({}, st.items.get(st.key), { count: 0, gone: true }));
        const pos = k => st.order.indexOf(k);
        return items.sort((a, b) => pos(a.key) - pos(b.key));
    }

    function fwRenderCircles() {
        const st = fwState;
        const box = fwEl('.s34-fw-circles');
        const items = fwOrderedItems();
        box.hidden = !items.length;
        box.innerHTML = items.map(it => {
            const v = st.views.get(it.key);
            const on = it.key === st.key;
            const title = it.label + (it.count ? ' – ' + it.count + (it.more ? '+' : '') + ' new' : '');
            return `<button type="button" class="s34-fw-c${it.count ? ' s34-new' : ''}${on ? ' s34-on' : ''}${it.gone ? ' s34-gone' : ''}" data-key="${escapeHtml(it.key)}" role="tab" aria-selected="${on}" title="${escapeHtml(title)}">
                <span class="s34-fw-ring s34-fw-av">${fwAvatarHtml(it, v && v.pic)}</span>
                <span class="s34-fw-name">${escapeHtml(it.label)}</span></button>`;
        }).join('');
        const d = getFollowing();
        fwEl('.s34-fw-checked').textContent = d.checkedAt ? 'checked ' + timeAgo(d.checkedAt) : '';
    }

    function fwRenderHead(view) {
        const head = fwEl('.s34-fw-head');
        const d = getFollowing();
        const k = view.key;
        if (!k) {
            head.innerHTML = `<div class="s34-fw-empty">Nothing followed yet. Follow an artist with the ${BELL_TEXT} next to their name in a post. Their newest posts show up here, with NEW on the ones since your last visit.</div>`;
            return;
        }
        const isAll = k === FW_ALL;
        const word = k.slice(2);
        const item = fwState.items.get(k) || { kind: isAll ? 'all' : 'artist', label: isAll ? 'All' : prettyTag(word) };
        const on = isFollowed(word, d);
        const name = isAll ? 'All followed artists' : prettyTag(word);
        const n = Math.max(view.newN, view.countAtOpen);
        const nums = [`<span><b>${n}${view.moreAtOpen && n === view.countAtOpen && n ? '+' : ''}</b> new since your last visit</span>`];
        if (view.total) nums.push(`<span><b>${view.total.toLocaleString('en-US')}</b> posts</span>`);
        if (isAll) nums.push(`<span><b>${d.artists.length}</b> artists</span>`);
        head.innerHTML = `
            <span class="s34-fw-big s34-fw-av">${fwAvatarHtml(item, view.pic)}</span>
            <div class="s34-fw-info">
                <div class="s34-fw-row"><b class="s34-fw-nm"></b>
                    ${isAll ? '' : `<button type="button" class="s34-fw-btn s34-fw-follow${on ? ' s34-following' : ''}" data-fw="follow" aria-pressed="${on}">${on ? BELL_ON_SVG + ' Following' : BELL_SVG + ' Follow'}</button>
                    <a class="s34-fw-btn s34-fw-search" href="${escapeHtml(plainSearchUrl(word))}" title="The normal search – with every filter and sort">Open as a search ↗</a>`}
                </div>
                <div class="s34-fw-nums">${nums.join('')}</div>
            </div>`;
        head.querySelector('.s34-fw-nm').textContent = name;
    }

    function fwRenderStatus(view) {
        if (!fwState || fwState.key !== view.key) return;
        const el = fwEl('.s34-fw-status');
        el.replaceChildren();
        if (!view.key) return;
        if (view.busy) el.innerHTML = '<span class="s34-spin"></span> Loading posts…';
        else if (view.state === 'cloudflare') el.appendChild(cloudflareInline('The posts wait for a quick Cloudflare check.'));
        else if (view.state === 'error') el.innerHTML = 'The posts couldn\'t be loaded. <button type="button" class="s34-fw-btn" data-fw="retry">Try again</button>';
        else if (view.state === 'done') el.textContent = view.tiles.length ? 'That\'s all of them.' : 'No posts to show here.';
    }

    // The list the popup viewer browses when a tile is opened (see PAGE_LIST in 26-popup.js)
    function fwListFor(view) {
        return {
            thumbs: () => view.tiles.filter(t => t.isConnected),
            state: () => (view.busy ? 'loading' : view.state === 'done' ? 'done' : 'more'),
            more: () => fwLoadMore(view)
        };
    }

    // Near the end of the grid: the next page
    function fwMaybeMore() {
        const view = fwView();
        const sc = fwEl('.s34-fw-scroll');
        if (!view || !sc || view.busy || view.state !== 'more' || !view.key) return;
        if (sc.scrollTop + sc.clientHeight >= sc.scrollHeight - FW_NEAR_END) fwLoadMore(view);
    }

    // ---- Loading: up to FW_PAGE more posts, newest first ----
    // (several sources - "All" with more than 20 artists - are merged: a post
    // is only placed once every source has shown what comes before it)
    async function fwLoadMore(view) {
        if (!fwState || view.busy || view.state === 'done' || !view.key) return;
        view.busy = true;
        if (view.state !== 'more') view.state = 'more';
        fwRenderStatus(view);
        const added = [];
        try {
            while (added.length < FW_PAGE) {
                const live = view.sources.filter(s => s.buf.length || !s.done);
                if (!live.length) break;
                const empty = live.find(s => !s.buf.length);
                if (empty) { await fwFetch(view, empty); continue; }
                let best = live[0];
                live.forEach(s => { if (s.buf[0].id > best.buf[0].id) best = s; });
                const p = best.buf.shift();
                if (view.ids.has(p.id)) continue; // (in two groups, or moved to the next page meanwhile)
                view.ids.add(p.id);
                added.push(p.thumb);
            }
            if (!view.sources.some(s => s.buf.length || !s.done)) view.state = 'done';
        } catch (e) {
            view.state = e.cloudflare || e.paused ? 'cloudflare' : e.cancelled ? 'more' : 'error';
        } finally {
            view.busy = false;
        }
        if (!fwState || fwState.views.get(view.key) !== view) return; // closed meanwhile
        fwAddTiles(view, added);
        fwRenderStatus(view);
        if (view.state === 'cloudflare') {
            window.addEventListener('s34-cf-passed', () => {
                if (fwState && fwState.views.get(view.key) === view && view.state === 'cloudflare') { view.state = 'more'; fwLoadMore(view); }
            }, { once: true });
        }
        if (fwState.key === view.key) { fwRenderHead(view); fwRenderCircles(); setTimeout(fwMaybeMore, 50); }
    }

    async function fwFetch(view, src) {
        const first = !src.started;
        const url = src.next || plainSearchUrl(src.query);
        const r = await loadPage(url, first ? 'popup' : 'scroll', { wanted: () => !!fwState && fwState.views.get(view.key) === view, ms: 20000 });
        if (!r.ok) throw Object.assign(new Error('status ' + r.status), { status: r.status });
        const doc = new DOMParser().parseFromString(r.html, 'text/html');
        const thumbs = Array.from(doc.querySelectorAll('span.thumb')).filter(t => t.querySelector('a[href]') && t.querySelector('img'));
        src.started = true;
        src.next = thumbs.length ? getNextPageUrl(doc) : null;
        if (!src.next || src.next === new URL(url, location.href).href) { src.next = null; src.done = true; }
        if (first) fwLearn(view, src, doc, thumbs);
        // The site hides blacklisted posts only on pages it shows itself
        hideBlocklisted(thumbs);
        // (not lazy: a tile only gets its shape once its picture is there -
        // lazy pictures would make the rows jump while you scroll)
        thumbs.forEach(t => { t.querySelector('img').decoding = 'async'; });
        src.buf.push(...thumbs.filter(t => !t.classList.contains('s34-bl-hidden'))
            .map(t => ({ id: parseInt(thumbPostId(t), 10) || 0, thumb: document.adoptNode(t) })));
        src.buf.sort((a, b) => b.id - a.id);
    }

    // A source's first page: the total, the picture, and everyone on it is
    // now "seen" (like opening their page used to be - the NEW marks stay)
    function fwLearn(view, src, doc, thumbs) {
        const d = getFollowing();
        const ids = thumbs.map(t => parseInt(thumbPostId(t), 10) || 0);
        const seenUpTo = (it, mine) => {
            const max = mine.reduce((m, t) => Math.max(m, parseInt(thumbPostId(t), 10) || 0), 0);
            if (max) { it.seen = Math.max(it.seen || 0, max); it.latest = Math.max(it.latest || 0, max); }
            it.count = 0; it.more = false;
            if (mine.length) it.pic = thumbPicOf(mine[0]) || it.pic;
        };
        src.tags.forEach(tag => {
            const a = findArtist(tag, d);
            if (!a) return;
            const mine = view.key === FW_ALL ? thumbs.filter(t => thumbArtists(t, [tag]).length) : thumbs;
            if (mine.length || view.key !== FW_ALL) seenUpTo(a, mine);
        });
        if (view.key !== FW_ALL) view.total = fwTagCount(doc, src.tags[0]);
        if (ids.length) {
            saveFollowing(d);
            renderFollowBox(d);
        }
    }

    // "1,234 posts": the artist's count from the page's tag list
    function fwTagCount(doc, tag) {
        const li = Array.from(doc.querySelectorAll('#tag-sidebar li')).find(row =>
            Array.from(row.querySelectorAll('a[href*="tags="]')).some(a => {
                try { return (new URL(a.getAttribute('href'), location.href).searchParams.get('tags') || '').trim().toLowerCase() === tag; } catch (e) { return false; }
            }));
        const c = li && (li.querySelector('.tag-count') || Array.from(li.querySelectorAll('span')).find(s => /^\s*[\d,]+\s*$/.test(s.textContent)));
        const n = c ? parseInt(c.textContent.replace(/\D/g, ''), 10) : 0;
        return n > 0 ? n : null;
    }

    function fwIsNew(view, t) {
        const id = parseInt(thumbPostId(t), 10) || 0;
        const tags = view.key === FW_ALL ? thumbArtists(t, view.sources.reduce((all, s) => all.concat(s.tags), [])) : [view.key.slice(2)];
        return tags.some(tag => { const s = fwSeen(fwKeyArtist(tag)); return !!s && id > s; });
    }

    function fwAddTiles(view, tiles) {
        if (!tiles.length) return;
        tiles.forEach(t => {
            t.classList.add('s34-fw-tile');
            t.removeAttribute('style');
            t.querySelector('img').removeAttribute('style');
        });
        setThumbRatios(tiles); // each tile in its picture's shape (--r)
        removeTagTooltips(tiles);
        // hover: the full-quality picture / the video playing, like on the posts page
        if (CONFIG.hoverPreview || CONFIG.hoverHighRes) setupHoverPreview(tiles);
        setupHoverInfo(tiles);
        if (CONFIG.thumbBadges) addThumbBadges(tiles);
        tiles.forEach(t => {
            if (!fwIsNew(view, t)) return;
            view.newN++;
            const b = document.createElement('span');
            b.className = 's34-new-badge';
            b.textContent = 'NEW';
            t.appendChild(b);
        });
        showDownloadedState(tiles); // ⬇ / 👁 in the corner
        // All: whose post it is, at the bottom of the tile
        if (view.key === FW_ALL) {
            const tags = view.sources.reduce((all, s) => all.concat(s.tags), []);
            tiles.forEach(t => {
                const who = thumbArtists(t, tags);
                if (!who.length) return;
                const by = document.createElement('span');
                by.className = 's34-fw-by';
                by.textContent = who.map(prettyTag).join(', ');
                t.appendChild(by);
            });
        }
        view.tiles.push(...tiles);
        if (!view.pic) view.pic = thumbPicOf(tiles[0]);
        if (fwState && fwState.key === view.key) fwEl('.s34-fw-grid').append(...tiles);
    }

    // After a follow / unfollow / check: circles and header up to date
    function fwRefresh() {
        if (!fwState) return;
        fwRenderCircles();
        const v = fwView();
        if (v) fwRenderHead(v);
    }
