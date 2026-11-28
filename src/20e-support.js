    // =====================================================================
    //  SUPPORT & HEALTH
    //  - "Copy info for a bug report" (Settings → Help): version, browser,
    //    layout, changed settings, counts and the last problems - no
    //    searches, tags, artists or post numbers, so it's safe to share.
    //  - Site check: if rule34's page doesn't look like Steamy34 expects
    //    (the site changed its layout), a calm one-time message instead of
    //    half-working features.
    //  - Rating nudge: once ever, after a week of use.
    // =====================================================================
    const PROBLEMS = [];            // the last problems on this page (for the bug report)
    function noteProblem(msg) {
        const line = new Date().toTimeString().slice(0, 8) + '  ' + String(msg).replace(/\s+/g, ' ').slice(0, 220);
        if (PROBLEMS[PROBLEMS.length - 1] === line) return;
        PROBLEMS.push(line);
        if (PROBLEMS.length > 12) PROBLEMS.shift();
    }
    // Errors that come from Steamy34's own code (or mention it)
    window.addEventListener('error', e => {
        const where = (e.filename || '') + ' ' + ((e.error && e.error.stack) || '');
        if (/steamy34|userscript|tampermonkey|violentmonkey|user\.js/i.test(where + ' ' + e.message)) noteProblem('Error: ' + e.message);
    });
    window.addEventListener('unhandledrejection', e => {
        const r = e.reason || {};
        const text = (r.stack || r.message || String(r));
        if (/steamy34|userscript|user\.js/i.test(text)) noteProblem('Unhandled: ' + (r.message || String(r)));
    });

    function browserName() {
        const ua = navigator.userAgent;
        let m;
        if (navigator.brave) return 'Brave' + ((m = /Chrome\/(\d+)/.exec(ua)) ? ' (Chromium ' + m[1] + ')' : '');
        if ((m = /Edg\/(\d+)/.exec(ua))) return 'Edge ' + m[1];
        if ((m = /OPR\/(\d+)/.exec(ua))) return 'Opera ' + m[1];
        if ((m = /Firefox\/(\d+)/.exec(ua))) return 'Firefox ' + m[1];
        if ((m = /Chrome\/(\d+)/.exec(ua))) return 'Chrome ' + m[1];
        if ((m = /Version\/(\d+).*Safari/.exec(ua))) return 'Safari ' + m[1];
        return 'unknown browser';
    }
    function systemName() {
        const ua = navigator.userAgent;
        if (/Android/i.test(ua)) return 'Android';
        if (/iPhone|iPad/i.test(ua)) return 'iOS';
        if (/Windows/i.test(ua)) return 'Windows';
        if (/Mac OS X/i.test(ua)) return 'macOS';
        if (/Linux/i.test(ua)) return 'Linux';
        return '?';
    }

    function debugInfoText() {
        const lines = [];
        let manager = '?';
        try { if (typeof GM_info !== 'undefined') manager = (GM_info.scriptHandler || 'userscript manager') + ' ' + (GM_info.version || ''); } catch (e) {}
        lines.push('Steamy34 ' + CURRENT_VERSION + ' · ' + browserName() + ' · ' + systemName() + ' · ' + manager.trim());
        const page = isPostView ? 'single post' : fwState ? 'Following window' : (params.get('page') === 'post' ? 'posts page' : (params.get('page') || 'start page'));
        lines.push('Page: ' + page + ' · ' + (isPhoneLayout() ? 'phone layout' : 'computer layout') + ' · window ' + innerWidth + '×' + innerHeight +
                   (NO_HOVER ? ' · touch' : '') + (sfwOn() ? ' · censored mode on' : ''));
        // Settings that differ from the defaults (no folder names or texts)
        const changed = Object.keys(DEFAULTS).filter(k => CONFIG[k] !== DEFAULTS[k] && !/Joiner|Separator|darkMode/.test(k))
            .map(k => k + '=' + CONFIG[k]);
        lines.push('Changed settings: ' + (changed.length ? changed.join(', ') : 'none'));
        let f = { artists: [], searches: [] };
        try { f = getFollowing(); } catch (e) {}
        const count = o => { try { return Object.keys(o || {}).length; } catch (e) { return '?'; } };
        lines.push('Data: following ' + f.artists.length + ' artists · viewed ' + count(loadViewed()) +
                   ' · downloaded ' + count(loadDownloaded()) + ' · blacklist ' + readBlocklist().length + ' tags · collections ' + getCollections().length +
                   ' · saved searches ' + getSavedSearches().length + ' · API key ' + (hasApiKey() ? 'yes (used ' + apiStats.uses + 'x this page' + (apiStats.lastError ? ', last problem: ' + apiStats.lastError.replace(/[A-Za-z0-9]{24,}/g, '…') : '') + ')' : 'no')); // (never the key itself)
        lines.push('Blacklist cookie: ' + readCookieBlocklist().length + ' tags' + (blCookieRepaired ? ' (was ' + blCookieRepaired + ' on this page – written fresh)' : ' · OK'));
        const site = siteShapeProblems();
        lines.push('Site check: ' + (site.length ? 'missing ' + site.join(', ') : 'OK'));
        // The last Cloudflare check: what hit it, and what loaded in the 2 minutes before
        const cf = lastCheckInfo();
        if (cf && cf.at) {
            const mins = Math.round((Date.now() - cf.at) / 60000);
            const ago = mins < 60 ? mins + ' min ago' : mins < 2880 ? Math.round(mins / 60) + ' h ago' : Math.round(mins / 1440) + ' days ago';
            const before = Object.keys(cf.before || {}).map(k => pageKind(k).label + ' ' + cf.before[k]).join(', ');
            lines.push('Last Cloudflare check: ' + ago + ', hit by ' + pageKind(cf.kind).label + ' · page loads in the 2 min before: ' + (before || 'none'));
        } else {
            lines.push('Last Cloudflare check: none');
        }
        const now = recentPages(600000);
        lines.push('Page loads, last 10 min: ' + (Object.keys(now).map(k => pageKind(k).label + ' ' + now[k]).join(', ') || 'none'));
        lines.push('Recent problems:' + (PROBLEMS.length ? '\n  ' + PROBLEMS.join('\n  ') : ' none'));
        return lines.join('\n');
    }

    async function copyText(text) {
        try { await navigator.clipboard.writeText(text); return true; } catch (e) {}
        try {
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.style.cssText = 'position:fixed;left:-9999px;top:0;';
            document.body.appendChild(ta);
            ta.select();
            const ok = document.execCommand('copy');
            ta.remove();
            return ok;
        } catch (e) { return false; }
    }

    // A small window that shows exactly what would be shared, with Copy
    function openDebugInfo() {
        if (document.querySelector('.s34-debug-win')) return;
        const text = debugInfoText();
        const w = openWindow({ cls: 's34-debug-win', icon: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h2"/></svg>', title: 'Info for a bug report', width: 600 });
        w.setSub('No searches, tags, artists or post numbers – only what helps find the problem');
        w.body.innerHTML = `
            <pre class="s34-debug-text"></pre>
            <p class="s34-debug-how">Copy it and paste it into <b>#feedback</b> on the <a href="${DISCORD_URL}" target="_blank" rel="noopener noreferrer">Discord</a> (or the Feedback tab on Sleazy Fork) – together with what you did and what happened.</p>
            <div class="s34-debug-foot"><button type="button" class="s34-follow-act s34-follow-primary" data-a="copy">Copy</button></div>`;
        w.body.querySelector('.s34-debug-text').textContent = text;
        w.body.querySelector('[data-a="copy"]').addEventListener('click', async e => {
            const ok = await copyText(text);
            e.target.textContent = ok ? 'Copied ✓' : 'Select the text and copy it';
        });
    }

    // ---- Site check ----
    // What Steamy34 relies on, per page type ([] = everything there)
    function siteShapeProblems() {
        if (params.get('page') !== 'post') return [];
        const missing = [];
        if (isPostView) {
            if (!document.querySelector('#image, video, .fluid_video_wrapper, #gelcomVideoPlayer, img#image')) missing.push('post picture / video');
            if (!document.querySelector('#tag-sidebar')) missing.push('tag list');
            if (!document.querySelector('#stats, .sidebar #stats')) missing.push('post info');
        } else if (params.get('s') === 'list') {
            if (!document.querySelector('.image-list')) missing.push('post list');
            if (!document.querySelector('input[name="tags"], textarea[name="tags"], .s34-sb')) missing.push('search box');
        }
        return missing;
    }
    const SITE_WARN_KEY = 'steamy34_sitecheck_warned';
    function checkSiteShape() {
        // a Cloudflare check page or an empty page isn't a layout change
        if (!document.body || /just a moment|attention required/i.test(document.title)) return;
        const missing = siteShapeProblems();
        if (!missing.length) return;
        noteProblem('Site check: missing ' + missing.join(', '));
        console.warn('[Steamy34] rule34 looks different than expected – missing:', missing.join(', '));
        let last = 0;
        try { last = GM_getValue(SITE_WARN_KEY, 0) || 0; } catch (e) {}
        if (Date.now() - last < 24 * 3600 * 1000) return; // at most once a day
        try { GM_setValue(SITE_WARN_KEY, Date.now()); } catch (e) {}
        showToast('rule34\'s page looks different than usual – some Steamy34 parts may not work right now. If it stays like this, please tell steamycorner.',
                  'Copy info', openDebugInfo, 15000);
    }

    // ---- (Beta 3.17.2, #16) Feedback nudge: once ever, after ~3 days ----
    // A small note in the bottom-right corner; it goes by itself after 10 s
    // (a line shows the time left; hovering holds it).
    const FEEDBACK_ASKED_KEY = 'steamy34_feedback_asked';
    function maybeAskForFeedback() {
        let first = 0, asked = false;
        try {
            first = GM_getValue('steamy34_first_seen', 0) || 0;
            asked = GM_getValue(FEEDBACK_ASKED_KEY, false) === true;
        } catch (e) { return; }
        if (!first || asked || Date.now() - first < 3 * 24 * 3600 * 1000 || isPostView) return;
        setTimeout(() => {
            if (document.querySelector('.s34-overlay, .s34-fb-nudge') || !document.body) return; // another time
            try { GM_setValue(FEEDBACK_ASKED_KEY, true); } catch (e) {}
            const box = document.createElement('div');
            box.className = 's34-fb-nudge';
            box.setAttribute('role', 'status');
            box.innerHTML = '<b>How is Steamy34 working for you?</b><span>Ideas, bugs or something you miss – a short note helps.</span>'
                + '<div class="s34-fb-row"><a class="s34-fb-go" target="_blank" rel="noopener noreferrer">Give feedback</a><button type="button" class="s34-fb-x" aria-label="Close">✕</button></div>'
                + '<i class="s34-fb-time"></i>';
            box.querySelector('.s34-fb-go').href = SLEAZY_URL + '/feedback#post-discussion';
            const close = () => { box.classList.remove('s34-show'); setTimeout(() => box.remove(), 250); };
            box.querySelector('.s34-fb-go').addEventListener('click', close);
            box.querySelector('.s34-fb-x').addEventListener('click', close);
            box.querySelector('.s34-fb-time').addEventListener('animationend', close);   // (paused while hovered)
            document.body.appendChild(box);
            setTimeout(() => box.classList.add('s34-show'), 20);
        }, 10000);
    }

    // ---- Rating nudge: once ever, after a week of use ----
    const FIRST_SEEN_KEY = 'steamy34_first_seen';
    const RATE_ASKED_KEY = 'steamy34_rate_asked';
    function maybeAskForRating() {
        let first = 0, asked = false;
        try {
            first = GM_getValue(FIRST_SEEN_KEY, 0) || 0;
            if (!first) { GM_setValue(FIRST_SEEN_KEY, Date.now()); return; }
            asked = GM_getValue(RATE_ASKED_KEY, false) === true;
        } catch (e) { return; }
        if (asked || Date.now() - first < 7 * 24 * 3600 * 1000 || isPostView) return;
        setTimeout(() => {
            if (document.querySelector('.s34-overlay')) return; // try again another time
            try { GM_setValue(RATE_ASKED_KEY, true); } catch (e) {}
            showToast('Enjoying Steamy34? A rating on Sleazy Fork helps others find it – thank you! 💜', 'Rate it',
                      () => window.open(SLEAZY_URL + '/feedback', '_blank', 'noopener'), 15000);
        }, 8000);
    }
