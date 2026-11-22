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
        const blocked = readBlocklist().map(t => t.toLowerCase());
        thumbs.forEach(thumb => {
            const img = thumb.querySelector('img');
            if (!img) return;
            const tags = thumbTags(img).trim().split(' ');
            thumb.classList.toggle('s34-bl-hidden', blocked.some(b => tags.includes(b)));
        });
    }

    // Beta 3.7: rule34 hides only the tags in its cookie. The ones that didn't
    // fit (see readBlocklist) are hidden here - while the page is still
    // being built, so they never show up. Only those: the cookie's tags stay
    // with the site (its "Hidden" link keeps working for them).
    function hideExtraBlocklisted() {
        if (isPostView) return;
        const inCookie = new Set(readCookieBlocklist().map(t => t.toLowerCase()));
        const extra = new Set(readBlocklist().map(t => t.toLowerCase()).filter(t => !inCookie.has(t)));
        if (!extra.size) return;
        const check = img => {
            const thumb = img.closest('span.thumb');
            if (!thumb || thumb.classList.contains('s34-bl-hidden')) return;
            if (thumbTags(img).trim().split(' ').some(t => extra.has(t))) thumb.classList.add('s34-bl-hidden');
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
        setupHoverInfo(thumbs);
        markFeedNew(thumbs); // Following feed: NEW on later pages too
    }

