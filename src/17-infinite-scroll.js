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
        const set = blockedTagSet();
        thumbs.forEach(thumb => {
            const img = thumb.querySelector('img');
            if (!img) return;
            thumb.classList.toggle('s34-bl-hidden', blockedTagsOf(thumbTags(img).trim(), set).length > 0);
        });
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
            if (blockedTagsOf(thumbTags(img).trim(), extra).length) thumb.classList.add('s34-bl-hidden');
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
    }

