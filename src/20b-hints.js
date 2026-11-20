    // ---- Little tips at the right moment ----
    // A small bubble the first time you meet something (popup, search box,
    // filters, a download, clean thumbnails). Calm on purpose:
    //  - every tip appears only ONCE, ever
    //  - at most one per page, and at most one every 3 minutes
    //  - never on top of a window, never before the welcome tour was seen
    //  - closes by itself; "No more tips" switches them all off
    const HINTS_KEY = 'steamy34_hints_seen';
    const HINT_GAP = 3 * 60 * 1000;
    let hintShownThisPage = false;

    function hintsSeen() {
        try {
            const v = GM_getValue(HINTS_KEY, {});
            return v && typeof v === 'object' ? v : {};
        } catch (e) { return {}; }
    }

    // html: the tip (trusted, written here); anchor: element to point at (optional)
    function showHint(id, html, anchor) {
        if (!CONFIG.contextHints || hintShownThisPage) return false;
        const seen = hintsSeen();
        if (seen[id] || Date.now() - (seen._last || 0) < HINT_GAP) return false;
        let tipsSeen = 0;
        try { tipsSeen = GM_getValue(TIPS_KEY, 0); } catch (e) {}
        if (!tipsSeen) return false; // brand new: the welcome tour comes first
        if (document.querySelector('.s34-overlay, .s34-hint')) return false;
        hintShownThisPage = true;
        seen[id] = seen._last = Date.now();
        GM_setValue(HINTS_KEY, seen);

        const box = document.createElement('div');
        box.className = 's34-hint';
        box.setAttribute('role', 'status');
        box.innerHTML = `<div class="s34-hint-text">${html}</div>
            <div class="s34-hint-foot"><button type="button" class="s34-hint-off">No more tips</button><button type="button" class="s34-hint-ok">Got it</button></div>`;
        document.body.appendChild(box);

        // Next to the anchor (below, or above if there's no room) - else top centre
        const r = anchor && anchor.isConnected ? anchor.getBoundingClientRect() : null;
        if (r && r.width && r.bottom > 0 && r.top < innerHeight) {
            const w = box.offsetWidth, h = box.offsetHeight;
            let top = r.bottom + 10;
            if (top + h > innerHeight - 10) top = r.top - h - 10;
            box.style.top = Math.max(10, Math.min(top, innerHeight - h - 10)) + 'px';
            box.style.left = Math.max(10, Math.min(r.left + r.width / 2 - w / 2, innerWidth - w - 10)) + 'px';
        } else {
            box.classList.add('s34-hint-top');
        }
        requestAnimationFrame(() => box.classList.add('s34-hint-in'));

        let timer = setTimeout(close, 10000);
        box.addEventListener('mouseenter', () => clearTimeout(timer));
        box.addEventListener('mouseleave', () => { clearTimeout(timer); timer = setTimeout(close, 4000); });
        function close() {
            clearTimeout(timer);
            box.classList.remove('s34-hint-in');
            setTimeout(() => box.remove(), 200);
        }
        box.querySelector('.s34-hint-ok').addEventListener('click', close);
        box.querySelector('.s34-hint-off').addEventListener('click', () => {
            saveSettingsNow({ contextHints: false });
            close();
            showToast('Little tips are off – turn them on again in Settings → Viewing posts.');
        });
        return true;
    }

    function setupHints() {
        if (!CONFIG.contextHints) return;
        const phone = isPhoneLayout();
        // First typing in the search box
        document.addEventListener('input', e => {
            const sb = e.target && e.target.closest && e.target.closest('.s34-sb-box');
            if (!sb) return;
            showHint('search', phone
                ? 'Pick a suggestion to add it as a <b>bubble</b>. Tap a bubble to <b>exclude</b> that tag – tap again to bring it back.'
                : '<kbd>Space</kbd> or <kbd>Enter</kbd> turns the word into a <b>bubble</b>. Click a bubble to <b>exclude</b> that tag – click again to bring it back.', sb);
        }, true);
        // First change of a filter menu
        document.addEventListener('change', e => {
            const sel = e.target && e.target.closest && e.target.closest('.s34-sb-filters select');
            if (!sel) return;
            showHint('pin', 'The 📌 next to a filter keeps it for <b>every</b> new search – e.g. always "score ≥ 100".', sel);
        }, true);
        // Clean thumbnails: after looking at a few, say where the tags went
        if (CONFIG.thumbExtras === 'hover' && !NO_HOVER && !isPhoneLayout() && !isPostView) {
            const hovered = new Set();
            document.addEventListener('mouseover', e => {
                const t = e.target && e.target.closest && e.target.closest('.image-list span.thumb');
                if (!t || hovered.has(t)) return;
                hovered.add(t);
                if (hovered.size === 6) {
                    showHint('hover-extras', 'Tags and the ♥ appear while you hover, so the pictures stay clean. Want them always visible? <b>Settings → Look → Tags &amp; buttons on thumbnails</b>.', t);
                }
            });
        }
    }

    // First popup: how to get around
    function hintAfterPopupOpen() {
        if (!CONFIG.contextHints) return;
        setTimeout(() => {
            if (!document.querySelector('.s34-pv-overlay')) return;
            showHint('popup', isPhoneLayout()
                ? 'Swipe ← / → for the next post, swipe down or press Back to close. Tap the picture for full size.'
                : `<kbd>${browseKeyText()}</kbd> next / previous post · <kbd>Esc</kbd> or a middle click closes · <kbd>${keyLabel(CONFIG.downloadKey)}</kbd> downloads`);
        }, 900);
    }

    // First download: the file name, and where it can go
    function hintAfterDownload() {
        if (!CONFIG.contextHints || batchRunning) return;
        setTimeout(() => {
            let folder = '';
            try { folder = GM_getValue('steamy34_dlfolder', ''); } catch (e) {}
            const more = folderPickerAvailable() && !folder
                ? ' Want them in a certain folder? <b>Settings → Downloads → Choose folder…</b>' : '';
            const btn = Array.from(document.querySelectorAll('.s34-dl-btn')).find(b => b.getClientRects().length);
            showHint('download', 'Saved with a tidy name: <b>[character] [series] [artist]</b>.' + more, btn);
        }, 1500);
    }
