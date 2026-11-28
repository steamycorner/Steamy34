    // =====================================================================
    //  CENSORED MODE (was "screenshot mode" until Beta 3.4)
    //  X (or Settings → Developer tools) blurs every picture and video:
    //  thumbnails, the popup, post pages, hover previews, collections - and
    //  (setting censorComments, on by default) comment texts and names.
    //  Only what you see changes - downloads stay exactly as they are.
    //  Stays on (also after a reload) until you turn it off; a small label
    //  at the bottom says it's on. The html classes are set right at the
    //  start (10-colour-modes.js), so nothing flashes unblurred.
    //  The name lives in CENSOR_NAME only - change it there.
    //  (Beta 3.16.1) The blur grows with the size on screen: a fixed blur
    //  hid a thumbnail well but left a big picture in the popup readable.
    //  Each picture's own --s34-blur is about 5 % of its diagonal (never
    //  under 24 px); a ResizeObserver keeps it right while sizes change.
    // =====================================================================
    const SFW_KEY = 'steamy34_sfw';
    const CENSOR_NAME = 'Censored mode';

    function sfwOn() { return document.documentElement.classList.contains('s34-sfw'); }

    // (Beta 3.16.3) Tag words: only artist, character, series and meta tags stay
    // readable - general tags (where the explicit words are) and tags whose type
    // isn't known yet are blurred. A search is blurred when any word in it is.
    // Typed chips (popup, post pages, blacklist, search pills) are done in CSS by
    // their type class; searches written out as text get the class s34-sfw-word.
    const SFW_SAFE_TYPES = ['artist', 'character', 'copyright', 'metadata'];
    function sfwTagSafe(word) {
        const t = String(word || '').trim().toLowerCase().replace(/^[-~]+/, '').replace(/ /g, '_');
        if (!t || /^[(){}~|]+$/.test(t) || t.includes(':')) return true;   // operators, score:/sort:/rating: filters
        let type;
        try { type = tagTypes.get(t); } catch (e) { return false; }
        return SFW_SAFE_TYPES.includes(type);
    }
    function sfwQuerySafe(q) { return String(q || '').trim().split(/\s+/).every(sfwTagSafe); }
    function sfwMark(el, query) { if (el) el.classList.toggle('s34-sfw-word', !sfwQuerySafe(query)); return el; }

    const SFW_MEDIA = 'img, video, canvas';
    let sfwRO = null, sfwMO = null, sfwLoad = null, sfwResize = null;
    function sfwBlurFor(w, h) { return Math.min(240, Math.max(24, Math.round(Math.hypot(w, h) * 0.05))); }
    function sfwWatch(on) {
        if (!on) {
            if (sfwRO) sfwRO.disconnect();
            if (sfwMO) sfwMO.disconnect();
            if (sfwLoad) { document.removeEventListener('load', sfwLoad, true); document.removeEventListener('loadedmetadata', sfwLoad, true); }
            if (sfwResize) window.removeEventListener('resize', sfwResize);
            sfwRO = sfwMO = sfwLoad = sfwResize = null;
            return;
        }
        if (sfwRO || typeof ResizeObserver === 'undefined') return;
        const size = (el, w, h) => { if (w || h) el.style.setProperty('--s34-blur', sfwBlurFor(w, h) + 'px'); };
        const measure = el => { const r = el.getBoundingClientRect(); size(el, r.width, r.height); };
        sfwRO = new ResizeObserver(list => list.forEach(en => size(en.target, en.contentRect.width, en.contentRect.height)));
        // (Beta 3.16.4) also measured right away and when it loads - the observer
        // alone can stay silent in a page that isn't being painted
        let pending = new Set(), timer = 0;
        const later = el => { pending.add(el); if (!timer) timer = setTimeout(() => { timer = 0; const l = pending; pending = new Set(); l.forEach(x => { if (x.isConnected) measure(x); }); }, 60); };
        const add = n => {
            if (n.nodeType !== 1) return;
            const list = n.matches(SFW_MEDIA) ? [n] : [];
            n.querySelectorAll(SFW_MEDIA).forEach(el => list.push(el));
            list.forEach(el => { sfwRO.observe(el); later(el); });
        };
        add(document.documentElement);
        sfwMO = new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(add)));
        sfwMO.observe(document.documentElement, { childList: true, subtree: true });
        sfwLoad = e => { const t = e.target; if (t && t.matches && t.matches(SFW_MEDIA)) later(t); };
        document.addEventListener('load', sfwLoad, true);
        document.addEventListener('loadedmetadata', sfwLoad, true);
        window.addEventListener('resize', sfwResize = () => document.querySelectorAll(SFW_MEDIA).forEach(later));
    }

    function setScreenshotMode(on) {
        document.documentElement.classList.toggle('s34-sfw', on);
        document.documentElement.classList.toggle('s34-sfw-text', on && CONFIG.censorComments);
        try { GM_setValue(SFW_KEY, on); } catch (e) {}
        document.querySelectorAll('.s34-sfw-set').forEach(cb => { cb.checked = on; });
        sfwWatch(on);
        showSfwLabel();
        showToast(on ? `${CENSOR_NAME} on – pictures${CONFIG.censorComments ? ' and comments' : ''} are blurred, safe for screenshots. X turns it off.` : `${CENSOR_NAME} off.`);
    }

    // Small label at the bottom right while it's on (click = off)
    function showSfwLabel() {
        let label = document.querySelector('.s34-sfw-label');
        if (!sfwOn()) { if (label) label.remove(); return; }
        if (label || !document.body) return;
        label = document.createElement('button');
        label.type = 'button';
        label.className = 's34-sfw-label';
        label.title = 'Click (or press X) to show everything again';
        label.innerHTML = '<span></span><kbd>X</kbd>';
        label.querySelector('span').textContent = CENSOR_NAME;
        label.addEventListener('click', () => setScreenshotMode(false));
        document.body.appendChild(label);
    }

    function setupScreenshotMode() {
        showSfwLabel();
        sfwWatch(sfwOn());
        document.addEventListener('keydown', e => {
            if (e.code !== 'KeyX' || e.ctrlKey || e.altKey || e.metaKey || e.shiftKey || e.repeat) return;
            const t = e.target;
            if (t.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName)) return;
            if (document.querySelector('.s34-overlay:not(.s34-pv-overlay):not(.s34-under-popup)')) return; // settings etc. open
            if ([CONFIG.downloadKey, CONFIG.favKey, CONFIG.collectKey, CONFIG.theaterKey, CONFIG.followKey, CONFIG.followingKey].includes('KeyX')) return; // your own key wins
            e.preventDefault();
            setScreenshotMode(!sfwOn());
        }, true);
    }
