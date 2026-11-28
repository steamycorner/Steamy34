    // =====================================================================
    //  CONTINUE WHERE YOU LEFT OFF
    //  While you scroll a search, Steamy34 notes which page you're on (and
    //  the post at the top of the screen). Come back to the same search -
    //  reload, click it again, open it tomorrow - and a small message offers
    //  "Continue" at that page. Kept on this device for 24 hours, per search
    //  (the newest 30). Setting: resumeOffer.
    // =====================================================================
    const RESUME_KEY = 'steamy34_resume';
    const RESUME_MAX_AGE = 24 * 3600 * 1000;
    const RESUME_TARGET_KEY = 's34_resume_post'; // sessionStorage: post to scroll to after the jump

    function resumeKey() {
        if (isPostView || params.get('page') !== 'post' || params.get('s') !== 'list') return null;
        const q = normalizeQuery(tagsFromUrl(location.href) || '');
        if (/(^|\s)sort:random(?!\w)/i.test(q)) return null;   // (Beta 3.17.2, #1) random order: page N is different every time - nothing to continue
        return q || '(all posts)';
    }
    function readResume() {
        let v = {};
        try { v = GM_getValue(RESUME_KEY, {}) || {}; } catch (e) {}
        return v && typeof v === 'object' ? v : {};
    }

    // Where am I? The page block in the upper third of the window, and its
    // first post that's still on screen
    function currentSpot() {
        const blocks = Array.from(document.querySelectorAll('.image-list[data-s34-pid]'));
        if (!blocks.length) {
            const list = document.querySelector('.image-list');
            if (!list) return null;
            blocks.push(list);
        }
        let block = blocks[0];
        for (const b of blocks) { if (b.getBoundingClientRect().top < innerHeight / 3) block = b; }
        const pid = parseInt(block.dataset.s34Pid || String(pidOf(location.href)), 10) || 0;
        const onScreen = Array.from(block.querySelectorAll('span.thumb')).find(t => t.getBoundingClientRect().bottom > 60);
        return { pid, post: onScreen ? thumbPostId(onScreen) : '' };
    }

    function saveSpot() {
        const key = resumeKey();
        const spot = key && currentSpot();
        if (!spot) return;
        const all = readResume();
        if (!spot.pid && scrollY < 600) { if (all[key]) { delete all[key]; GM_setValue(RESUME_KEY, all); } return; } // back at the top
        all[key] = { pid: spot.pid, post: spot.post, at: Date.now() };
        // keep the newest 30, drop old ones
        const keys = Object.keys(all).filter(k => Date.now() - (all[k].at || 0) < RESUME_MAX_AGE)
            .sort((a, b) => all[b].at - all[a].at).slice(0, 30);
        const keep = {};
        keys.forEach(k => { keep[k] = all[k]; });
        GM_setValue(RESUME_KEY, keep);
    }

    function setupResume() {
        const key = resumeKey();
        if (!key) return;
        // Just jumped here with "Continue"? Scroll to the post you were at
        let target = null;
        try { target = sessionStorage.getItem(RESUME_TARGET_KEY); sessionStorage.removeItem(RESUME_TARGET_KEY); } catch (e) {}
        if (target) {
            const t = document.getElementById('s' + target) || document.getElementById('p' + target);
            if (t) setTimeout(() => t.scrollIntoView({ block: 'center' }), 300);
        }
        // Note the spot while scrolling (calmly - at most every 1.5 s). Only
        // real scrolling counts: just opening or leaving a page saves nothing.
        // (Steamy34's own jump to your post doesn't count - only your wheel,
        // finger, keys or scrollbar)
        let timer = null, scrolled = false, userActive = false;
        ['wheel', 'touchmove', 'keydown', 'mousedown'].forEach(ev => window.addEventListener(ev, () => { userActive = true; }, { passive: true, capture: true }));
        window.addEventListener('scroll', () => {
            if (!userActive) return;
            scrolled = true;
            if (timer) return;
            timer = setTimeout(() => { timer = null; saveSpot(); }, 1500);
        }, { passive: true });
        window.addEventListener('pagehide', () => { if (scrolled) saveSpot(); });

        // Offer to continue: only on the first page of a search, when you
        // were at page 2 or further within the last 24 hours
        if (!CONFIG.resumeOffer || target || pidOf(location.href) > 0) return;
        const all = readResume();
        const was = all[key];
        if (!was || !was.pid || was.offered || Date.now() - (was.at || 0) > RESUME_MAX_AGE) return;
        // Offered once - reloads and later visits start fresh, until you scroll
        // deep again (that saves a new spot without the "offered" mark)
        was.offered = true;
        try { GM_setValue(RESUME_KEY, all); } catch (e) {}
        const page = Math.floor(was.pid / pageStep) + 1;
        setTimeout(() => {
            if (scrollY > 400) return; // already scrolling on - no need
            showToast(`You were at page ${page} of this search.`, `Continue at page ${page}`, () => {
                try { sessionStorage.setItem(RESUME_TARGET_KEY, was.post || ''); } catch (e) {}
                const u = new URL(location.href);
                u.searchParams.set('pid', String(was.pid));
                location.href = u.pathname + u.search + u.hash;
            }, 12000);
        }, 1200);
    }
