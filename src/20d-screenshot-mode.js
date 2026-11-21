    // =====================================================================
    //  CENSORED MODE (was "screenshot mode" until Beta 3.4)
    //  X (or the switch in the sidebar) blurs every picture and video:
    //  thumbnails, the popup, post pages, hover previews, collections - and
    //  (setting censorComments, on by default) comment texts and names.
    //  Only what you see changes - downloads stay exactly as they are.
    //  Stays on (also after a reload) until you turn it off; a small label
    //  at the bottom says it's on. The html classes are set right at the
    //  start (10-colour-modes.js), so nothing flashes unblurred.
    //  The name lives in CENSOR_NAME only - change it there.
    // =====================================================================
    const SFW_KEY = 'steamy34_sfw';
    const CENSOR_NAME = 'Censored mode';

    function sfwOn() { return document.documentElement.classList.contains('s34-sfw'); }

    function setScreenshotMode(on) {
        document.documentElement.classList.toggle('s34-sfw', on);
        document.documentElement.classList.toggle('s34-sfw-text', on && CONFIG.censorComments);
        try { GM_setValue(SFW_KEY, on); } catch (e) {}
        document.querySelectorAll('.s34-q-sfw input').forEach(cb => { cb.checked = on; });
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
        document.addEventListener('keydown', e => {
            if (e.code !== 'KeyX' || e.ctrlKey || e.altKey || e.metaKey || e.shiftKey || e.repeat) return;
            const t = e.target;
            if (t.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName)) return;
            if (document.querySelector('.s34-overlay:not(.s34-pv-overlay)')) return; // settings etc. open
            if ([CONFIG.downloadKey, CONFIG.favKey, CONFIG.collectKey, CONFIG.theaterKey, CONFIG.followKey, CONFIG.followingKey].includes('KeyX')) return; // your own key wins
            e.preventDefault();
            setScreenshotMode(!sfwOn());
        }, true);
    }

    // The switch in the sidebar's "View" group (under "Hide downloaded")
    function addSfwSwitch(panel) {
        if (!panel || panel.querySelector('.s34-q-sfw')) return;
        const row = document.createElement('label');
        row.className = 's34-q-switch s34-q-sfw';
        row.title = 'Blurs every picture and video' + (CONFIG.censorComments ? ' and the comments' : '') + ' – safe for screenshots or in public. X turns it on and off';
        row.innerHTML = '<input type="checkbox"><span class="s34-q-track"></span><span class="s34-q-sfw-name"></span>';
        row.querySelector('.s34-q-sfw-name').textContent = CENSOR_NAME;
        const cb = row.querySelector('input');
        cb.checked = sfwOn();
        cb.addEventListener('change', () => setScreenshotMode(cb.checked));
        const after = panel.querySelector('[data-k="hideDownloaded"]') || panel.querySelector('[data-k="hideViewed"]');
        const head = panel.querySelector('.s34-q-head');
        if (after) after.closest('label').after(row); else if (head) head.after(row); else panel.prepend(row);
    }
