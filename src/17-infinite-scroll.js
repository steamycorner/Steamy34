    // =====================================================================
    //  7. INFINITE SCROLLING (posts page)
    //  Loads the next page in the background when you near the bottom and
    //  appends its thumbnails to the current grid.
    // =====================================================================

    function getNextPageUrl(doc) {
        const pag = doc.querySelector('#paginator, .pagination');
        if (!pag) return null;
        let next = pag.querySelector('a[alt="next"], a[rel="next"]');
        if (!next) {
            next = Array.from(pag.querySelectorAll('a')).find(a => a.textContent.trim() === '>');
        }
        if (!next) {
            // The link right after the current page number (<b>)
            const cur = pag.querySelector('b');
            let el = cur && cur.nextElementSibling;
            while (el && el.tagName !== 'A') el = el.nextElementSibling;
            next = el;
        }
        const href = next && next.getAttribute('href');
        return href ? new URL(href, location.href).href : null;
    }

    // pid = number of posts skipped; the site normally shows 42 per page
    let pageStep = 42;

    function pidOf(url) {
        return parseInt(new URL(url, location.href).searchParams.get('pid') || '0', 10) || 0;
    }

    function pageNumberOf(url) {
        return Math.floor(pidOf(url) / pageStep) + 1;
    }

    // Posts per page and the last page, read from the page-number links
    function readPagination(doc, currentPid) {
        const pag = doc.querySelector('#paginator, .pagination');
        let step = null;
        let maxPid = null;
        if (pag) {
            pag.querySelectorAll('a[href*="pid="]').forEach(a => {
                const p = pidOf(a.getAttribute('href'));
                if (p > currentPid && (step === null || p - currentPid < step)) step = p - currentPid;
                if (maxPid === null || p > maxPid) maxPid = p;
            });
        }
        return { step, maxPid };
    }

    // The site hides blocklisted posts only on the first page it renders,
    // so new thumbnails are checked against the blocklist here.
    // Uses its own class, so posts can be shown again after an Undo.
    function hideBlocklisted(thumbs) {
        const set = blockedTagSet(), mutes = getMutes();
        thumbs.forEach(thumb => {
            const img = thumb.querySelector('img');
            if (!img) return;
            const hit = blockedTagsOf(thumbTags(img).trim(), set);
            const mode = blockModeOf(hit, mutes);
            thumb.classList.toggle('s34-bl-hidden', mode === 'hide');
            if (mode === 'soft') markSoft(thumb, hit);
        });
    }

    // (Beta 3.10) Soft block: blurred, its tags named, "Show" uncovers it
    function markSoft(thumb, hit) {
        thumb.classList.add('s34-bl-marked', 's34-bl-soft');
        let label = thumb.querySelector('.s34-bl-label');
        if (!label) {
            label = document.createElement('div');
            label.className = 's34-bl-label';
            thumb.appendChild(label);
        }
        if (label.dataset.soft === hit.join(' ')) return;
        label.dataset.soft = hit.join(' ');
        label.replaceChildren();
        const t = document.createElement('span');
        t.textContent = 'Blurred: ' + hit.map(prettyTag).join(', ');
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 's34-bl-show';
        b.textContent = 'Show';
        b.title = 'Show this post (it stays blurred elsewhere)';
        b.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); thumb.classList.add('s34-bl-unblur'); });
        label.append(t, b);
    }

    // Beta 3.7: rule34 hides only the tags in its cookie. The ones that didn't
    // fit (see readBlocklist) are hidden here - while the page is still
    // being built, so they never show up. Only those: the cookie's tags stay
    // with the site (its "Hidden" link keeps working for them).
    // (Beta 3.8) Now every blacklisted tag, not only the extra ones: rule34's
    // own hiding was seen missing posts (a blacklisted tag on screen anyway).
    // Its "Hidden" link still shows them - see watchSiteHiddenLink.
    function hideExtraBlocklisted() {
        if (isPostView) return;
        const extra = blockedTagSet();
        if (!extra.size) return;
        watchSiteHiddenLink();
        const check = img => {
            const thumb = img.closest('span.thumb');
            if (!thumb || thumb.classList.contains('s34-bl-hidden')) return;
            const hit = blockedTagsOf(thumbTags(img).trim(), extra);
            const mode = blockModeOf(hit);
            if (mode === 'hide') thumb.classList.add('s34-bl-hidden');
            else if (mode === 'soft') markSoft(thumb, hit);
        };
        const all = () => document.querySelectorAll('span.thumb img').forEach(check);
        all();
        if (document.readyState !== 'loading') return;
        const mo = new MutationObserver(muts => muts.forEach(m => m.addedNodes.forEach(n => {
            if (n.nodeType !== 1) return;
            if (n.tagName === 'IMG') check(n);
            else if (n.querySelectorAll) n.querySelectorAll('span.thumb img').forEach(check);
        })));
        mo.observe(document.documentElement, { childList: true, subtree: true });
        document.addEventListener('DOMContentLoaded', () => { mo.disconnect(); all(); }, { once: true });
    }
    // rule34's "Hidden" link (in its sidebar) shows the hidden posts - also the
    // ones Steamy34 hid; a second click hides them again
    let siteHiddenWatched = false;
    function watchSiteHiddenLink() {
        if (siteHiddenWatched) return;
        siteHiddenWatched = true;
        document.addEventListener('click', e => {
            if (!e.target.closest || !e.target.closest('#blacklisted-sidebar a, a[onclick*="showHideBlacklistedPosts"]')) return;
            const reveal = !document.documentElement.classList.toggle('s34-bl-reveal') ? false : true;
            document.querySelectorAll(reveal ? '.image-list span.thumb.s34-bl-hidden' : '.image-list span.thumb.s34-bl-revealed').forEach(t => {
                t.classList.toggle('s34-bl-hidden', !reveal);
                t.classList.toggle('s34-bl-revealed', reveal);
            });
        }, true);
    }
    try { repairBlacklistCookie(); } catch (e) { console.warn('[Steamy34] Blacklist cookie:', e); }

    // (Beta 3.9.1) Blocked stays blocked on the comments page too. Each post
    // there carries its tags in a small script (posts.tags[id] = '…'); posts
    // with a blacklisted (or muted) tag are hidden with their comments. The
    // list stays invisible until it's checked (never longer than 5 s).
    const onCommentsPage = params.get('page') === 'comment';
    if (onCommentsPage) {
        document.documentElement.classList.add('s34-cm-pending');
        setTimeout(() => document.documentElement.classList.remove('s34-cm-pending'), 5000);
    }
    function hideBlockedCommentPosts() {
        const root = document.documentElement;
        try {
            const set = blockedTagSet();
            const hidden = [];
            document.querySelectorAll('#comment-list div.post[id^="p"], div.post[id^="p"]').forEach(post => {
                const sc = Array.from(post.querySelectorAll('script')).map(s => s.textContent).join(' ');
                const m = sc.match(/posts\.tags\[\d+\]\s*=\s*'((?:\\.|[^'\\])*)'/);
                if (!m) return;
                const tags = m[1].replace(/\\(.)/g, '$1').split(/\s+/);
                if (blockedTagsOf(tags, set).length) { post.classList.add('s34-bl-post'); hidden.push(post); }
            });
            if (!hidden.length) return;
            const note = document.createElement('div');
            note.className = 's34-bl-postnote';
            note.innerHTML = '<span></span><button type="button">Show them</button>';
            note.querySelector('span').textContent = hidden.length + (hidden.length === 1 ? ' post with a blacklisted tag is hidden here.' : ' posts with blacklisted tags are hidden here.');
            note.querySelector('button').addEventListener('click', () => {
                const show = !root.classList.toggle('s34-bl-posts-shown') ? false : true;
                note.querySelector('button').textContent = show ? 'Hide them again' : 'Show them';
            });
            const list = document.querySelector('#comment-list') || hidden[0].parentElement;
            list.prepend(note);
        } finally {
            root.classList.remove('s34-cm-pending');
        }
    }
    if (onCommentsPage) onReady(() => setTimeout(hideBlockedCommentPosts, 0));

    // (Beta 3.9.2) Random sort: "Shuffle again" above the posts
    function addShuffleButton() {
        if (isPostView || params.get('page') !== 'post' || params.get('s') !== 'list') return;
        if (!/(^|\s)sort:random(\s|$)/i.test((params.get('tags') || '').replace(/\+/g, ' '))) return;
        const list = document.querySelector('.image-list');
        if (!list || document.querySelector('.s34-shuffle')) return;
        const goRow = document.querySelector('.s34-sb-gorow'); // (under the Search button)
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 's34-shuffle';
        b.textContent = '🔀 Shuffle again';
        b.title = 'New random posts for this search';
        b.addEventListener('click', () => {
            const u = new URL(location.href);
            u.searchParams.delete('pid');
            location.href = u.href;
        });
        if (goRow) { b.classList.add('s34-shuffle-sb'); goRow.after(b); } else list.before(b);
    }
    onReady(() => setTimeout(() => { try { addShuffleButton(); } catch (e) {} }, 50));

    // (Beta 3.9) rule34's "Nobody here but us chickens!" where there should be
    // posts: say what's going on instead of leaving it a mystery. After a
    // Cloudflare check rule34 sends empty pages for a little while; a damaged
    // blacklist cookie did the same (it's repaired above, before this page).
    function explainEmptyPage() {
        if (isPostView || params.get('page') !== 'post' || params.get('s') !== 'list') return;
        if (document.querySelector('.image-list span.thumb, .s34-empty-note')) return;
        const content = document.querySelector('#content') || document.body;
        if (!/nobody here but us chickens/i.test(content.textContent || '')) return;
        const tags = (params.get('tags') || '').trim();
        const cf = lastCheckInfo();
        const recentCheck = cf && cf.at && Date.now() - cf.at < 20 * 60000;
        const note = document.createElement('div');
        note.className = 's34-empty-note';
        const why = blCookieRepaired
            ? 'Your blacklist cookie was damaged – Steamy34 just repaired it. Reload and the posts should be back.'
            : !tags || tags === 'all'
                ? 'This list is never really empty – rule34 sent an empty page. ' + (recentCheck ? 'That happens for a little while after a Cloudflare check.' : 'That usually passes in a minute or two.')
                : recentCheck
                    ? 'If you\'re sure there are posts for this: rule34 sends empty pages for a little while after a Cloudflare check.'
                    : 'Maybe there are no posts for this search (or they\'re all blacklisted). If you\'re sure there are, wait a minute and reload – rule34 sometimes sends empty pages.';
        note.innerHTML = '<b>No posts here</b><span></span><button type="button">Reload</button>';
        note.querySelector('span').textContent = why;
        note.querySelector('button').addEventListener('click', () => location.reload());
        content.prepend(note);
    }
    onReady(() => setTimeout(() => { try { explainEmptyPage(); } catch (e) {} }, 0));
    try { hideExtraBlocklisted(); } catch (e) { console.warn('[Steamy34] Blacklist:', e); }

    // (Beta 3.9.4) Versions of one picture (parent / child) as one thumbnail:
    // the first one stays, the others fold into "+N versions". Only rule34's
    // API says which posts belong together, so this needs the API key.
    async function groupVariants(thumbs) {
        if (!CONFIG.groupVariants || isPostView || !hasApiKey() || !thumbs.length) return;
        const ids = thumbs.map(t => parseInt(thumbPostId(t), 10)).filter(Boolean);
        if (ids.length < 2) return;
        const tags = (params.get('tags') || '').replace(/\+/g, ' ').trim();
        const q = (tags === 'all' ? '' : tags) + ' id:>=' + Math.min(...ids) + ' id:<=' + Math.max(...ids);
        let posts = [];
        try { posts = await apiPosts(q.trim(), 100); } catch (e) { return; }
        const parentOf = {};
        posts.forEach(p => { parentOf[p.id] = p.parent || 0; });
        // a group: the parent and its children - by the parent's number
        const groups = {};
        document.querySelectorAll('.image-list span.thumb').forEach(t => {
            const id = parseInt(thumbPostId(t), 10);
            if (!id || !(id in parentOf || Object.values(parentOf).includes(id))) return;
            const key = parentOf[id] || id;
            (groups[key] = groups[key] || []).push(t);
        });
        Object.entries(groups).forEach(([key, members]) => {
            members = members.filter(t => !t.classList.contains('s34-bl-hidden'));
            if (members.length < 2) return;
            const [first, ...rest] = members;
            if (first.querySelector('.s34-var-badge')) return;
            rest.forEach(t => t.classList.add('s34-var-hidden'));
            const b = document.createElement('button');
            b.type = 'button';
            b.className = 's34-var-badge';
            b.textContent = '+' + rest.length + (rest.length === 1 ? ' version' : ' versions');
            b.title = 'Other versions of this picture – click to show them';
            b.addEventListener('click', e => {
                e.preventDefault(); e.stopPropagation();
                const open = !first.classList.toggle('s34-var-open') ? false : true;
                rest.forEach(t => t.classList.toggle('s34-var-open', open));
                b.textContent = open ? 'Hide versions' : '+' + rest.length + (rest.length === 1 ? ' version' : ' versions');
            });
            first.appendChild(b);
        });
    }
    onReady(() => setTimeout(() => { try { groupVariants(Array.from(document.querySelectorAll('.image-list span.thumb'))); } catch (e) {} }, 300));

    // A newly loaded page: set up only its thumbnails, not every one again
    function enhanceThumbs(thumbs) {
        removeTagTooltips(thumbs);
        if (CONFIG.thumbGrid && CONFIG.thumbLayout === 'justified') setThumbRatios(thumbs);
        if (CONFIG.thumbGrid && CONFIG.thumbBadges) addThumbBadges(thumbs);
        if (CONFIG.hoverPreview || CONFIG.hoverHighRes) setupHoverPreview(thumbs);
        if (CONFIG.thumbTagBar) setupTagBars(thumbs);
        showDownloadedState(thumbs);
        addFavButtons(thumbs);
        showCollectionChips(thumbs);
        setupHoverInfo(thumbs);
        markFeedNew(thumbs); // Following feed: NEW on later pages too
        groupVariants(thumbs).catch(() => {});
    }

