    // =====================================================================
    //  SCREENSHOT MODE (safe for work screenshots)
    //  X (or the switch in the sidebar) blurs every picture and video:
    //  thumbnails, the popup, post pages, hover previews, collections.
    //  Only what you see changes - downloads stay exactly as they are.
    //  Stays on (also after a reload) until you turn it off; a small label
    //  at the bottom says it's on. The html class is set right at the start
    //  (10-colour-modes.js), so nothing flashes unblurred.
    // =====================================================================
    const SFW_KEY = 'steamy34_sfw';

    function sfwOn() { return document.documentElement.classList.contains('s34-sfw'); }

    function setScreenshotMode(on) {
        document.documentElement.classList.toggle('s34-sfw', on);
        try { GM_setValue(SFW_KEY, on); } catch (e) {}
        document.querySelectorAll('.s34-q-sfw input').forEach(cb => { cb.checked = on; });
        showSfwLabel();
        showToast(on ? 'Screenshot mode on – all pictures are blurred. X turns it off.' : 'Screenshot mode off.');
    }

    // Small label at the bottom right while it's on (click = off)
    function showSfwLabel() {
        let label = document.querySelector('.s34-sfw-label');
        if (!sfwOn()) { if (label) label.remove(); return; }
        if (label || !document.body) return;
        label = document.createElement('button');
        label.type = 'button';
        label.className = 's34-sfw-label';
        label.title = 'Click (or press X) to show the pictures again';
        label.innerHTML = '<span>Screenshot mode</span><kbd>X</kbd>';
        label.addEventListener('click', () => setScreenshotMode(false));
        document.body.appendChild(label);
    }

    function setupScreenshotMode() {
        showSfwLabel();
        document.addEventListener('keydown', e => {
            if (e.code !== 'KeyX' || e.ctrlKey || e.altKey || e.metaKey || e.shiftKey || e.repeat) return;
            const t = e.target;
            if (t.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName)) return;
            if (document.querySelector('.s34-overlay:not(.s34-pv-overlay)')) return; // settings etc. open
            if (CONFIG.downloadKey === 'KeyX' || CONFIG.favKey === 'KeyX' || CONFIG.collectKey === 'KeyX' || CONFIG.theaterKey === 'KeyX') return; // your own key wins
            e.preventDefault();
            setScreenshotMode(!sfwOn());
        }, true);
    }

    // The switch in the sidebar panel (under "Hide downloaded")
    function addSfwSwitch(panel) {
        if (!panel || panel.querySelector('.s34-q-sfw')) return;
        const row = document.createElement('label');
        row.className = 's34-q-switch s34-q-sfw';
        row.title = 'Blurs every picture and video, e.g. for screenshots – X turns it on and off';
        row.innerHTML = '<input type="checkbox"><span class="s34-q-track"></span>Blur pictures';
        const cb = row.querySelector('input');
        cb.checked = sfwOn();
        cb.addEventListener('change', () => setScreenshotMode(cb.checked));
        const after = panel.querySelector('[data-k="hideDownloaded"]') || panel.querySelector('[data-k="hideViewed"]');
        const head = panel.querySelector('.s34-q-head');
        if (after) after.closest('label').after(row); else if (head) head.after(row); else panel.prepend(row);
    }
