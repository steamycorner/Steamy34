    // =====================================================================
    //  MY ACCOUNT & OPTIONS in Steamy34's look (Beta 3.7)
    //  My Account: only a redesign - the site's own links as tiles, rule34's
    //  pages on top, password / two-factor / e-mail below (no Steamy34 extras
    //  there: the user's wish - it's rule34's page).
    //  Options: the site's form, sorted into four groups with a small menu:
    //  Filtering (Steamy34's Blacklist panel, inline - see 25), Display, Video
    //  server, Account & API. The site's own fields are MOVED into the new
    //  layout (never copied), so its Save button sends exactly what it always
    //  did. Anything the site adds later lands in "More" as it is.
    //  The API key field stays folded away: Steamy34 never reads it.
    //  Setting accountPages (Look & feel); off = the site's own pages.
    //
    //  Also here, on every page: rule34's own theme cookie follows the colour
    //  mode (matchSiteTheme), the video server (videoServer, same cookies as
    //  the site's "Preferred CDN location") and the site's own suggestion
    //  list on / off (siteSuggestions - it's kept in the site's localStorage).
    // =====================================================================
    const ACC_SVG = {
        user: '<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/><path d="M4.5 20.5c1.2-3.6 4-5.5 7.5-5.5s6.3 1.9 7.5 5.5"/>',
        mail: '<rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="M3.5 7l8.5 6 8.5-6"/>',
        heart: '<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z"/>',
        sliders: '<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/>',
        key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l8-8M16 7l2.5 2.5M14 9l2 2"/>',
        shield: '<path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.2-7.5 9.5-4.3-1.3-7.5-4.9-7.5-9.5V6z"/><path d="M9 12l2 2 4-4"/>',
        at: '<circle cx="12" cy="12" r="3.5"/><path d="M15.5 12v1.5a2.5 2.5 0 0 0 5 0V12a8.5 8.5 0 1 0-3.4 6.8"/>',
        out: '<path d="M14 4h4.5A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5H14"/><path d="M10 16l-4-4 4-4M6 12h10"/>',
        link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
        lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'
    };
    const accIcon = name => `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ACC_SVG[name] || ACC_SVG.link}</svg>`;

    // ---- rule34's own cookies, written the way the site writes them ----
    function readSiteCookie(name) {
        const m = document.cookie.match(new RegExp('(?:^|;\\s*)' + name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '=([^;]*)'));
        if (!m) return null;
        try { return decodeURIComponent(m[1]); } catch (e) { return m[1]; }
    }
    function writeSiteCookie(name, value) {
        const until = new Date(Date.now() + 365 * 20 * 864e5).toUTCString(); // (the site's own: about 20 years)
        document.cookie = `${name}=${value}; expires=${until}; path=/`;
    }
    function removeSiteCookie(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }

    // "Preferred CDN location": the same four cookies the site's Options set
    const VIDEO_SERVERS = {
        default: { label: 'Default' },
        eu:   { label: 'EU', loc: 'EU', vid: 'https://ws-cdn-video.rule34.xxx/', img: 'https://wimg.rule34.xxx/', thumb: 'https://wimg.rule34.xxx/' },
        cusa: { label: 'Central USA', loc: 'Central USA', vid: 'https://uswebm.rule34.xxx/', img: 'https://wimg.rule34.xxx/', thumb: 'https://us.rule34.xxx/' },
        eusa: { label: 'East USA', loc: 'East USA', vid: 'https://nymp4.rule34.xxx/', img: 'https://wimg.rule34.xxx/', thumb: 'https://us.rule34.xxx/' },
        wusa: { label: 'West USA', loc: 'West USA', vid: 'https://ahrimp4.rule34.xxx/', img: 'https://wimg.rule34.xxx/', thumb: 'https://us.rule34.xxx/' },
        api:  { label: 'API-CDN', loc: 'API-CDN', vid: 'https://api-cdn-mp4.rule34.xxx/', img: 'https://api-cdn.rule34.xxx/', thumb: 'https://api-cdn.rule34.xxx/' }
    };
    const VS_APPLIED_KEY = 'steamy34_vserver_applied'; // the server Steamy34 last put in the cookies

    function videoServerFromCookie() {
        const loc = readSiteCookie('domain_override_location');
        return Object.keys(VIDEO_SERVERS).find(k => loc && VIDEO_SERVERS[k].loc === loc) || 'default';
    }
    function writeVideoServer(key) {
        const s = VIDEO_SERVERS[key] || VIDEO_SERVERS.default;
        if (!s.loc) ['vid_domain_override', 'img_domain_override', 'domain_override_location', 'thumb_domain_override'].forEach(removeSiteCookie);
        else {
            writeSiteCookie('vid_domain_override', s.vid);
            writeSiteCookie('img_domain_override', s.img);
            writeSiteCookie('domain_override_location', s.loc);
            writeSiteCookie('thumb_domain_override', s.thumb);
        }
        try { GM_setValue(VS_APPLIED_KEY, key); } catch (e) {}
    }
    // Changed in Steamy34's settings -> into the cookies. Changed on the site
    // (its Options) -> Steamy34's setting follows. The first time, Steamy34
    // takes over whatever the site has.
    function syncVideoServer() {
        let applied;
        try { applied = GM_getValue(VS_APPLIED_KEY, null); } catch (e) { return; }
        const site = videoServerFromCookie();
        if (applied === null || (applied === CONFIG.videoServer && site !== applied)) {
            try { GM_setValue(VS_APPLIED_KEY, site); } catch (e) {}
            if (CONFIG.videoServer !== site) saveSettingsNow({ videoServer: site });
            return;
        }
        if (applied !== CONFIG.videoServer) writeVideoServer(CONFIG.videoServer);
    }

    function syncSiteSwitches() {
        // rule34's theme cookie follows the colour mode (pages arrive dark - no white flash)
        if (CONFIG.matchSiteTheme) {
            const want = CONFIG.theme === 'white' ? 'light' : 'dark';
            if (readSiteCookie('theme') !== want) writeSiteCookie('theme', want);
        }
        // the site's own suggestion list (it reads this itself)
        try {
            const want = CONFIG.siteSuggestions ? 'true' : 'false';
            if (localStorage.getItem('doAutocomplete') !== want) localStorage.setItem('doAutocomplete', want);
        } catch (e) {}
        syncVideoServer();
    }
    try { syncSiteSwitches(); } catch (e) { console.warn('[Steamy34] Site settings:', e); }

    // =====================================================================
    //  My Account
    // =====================================================================
    function setupAccountHome() {
        if (!CONFIG.accountPages) return;
        const box = document.getElementById('user-index');
        if (!box || box.querySelector('.s34-acc')) return;

        // The site's entries: <h4> with a link (or the Logout button) + a <p>
        const entries = Array.from(box.querySelectorAll('h4')).map(h4 => {
            const a = h4.querySelector('a[href]');
            const btn = h4.querySelector('button, input[type="submit"]');
            const holder = h4.closest('form') && box.contains(h4.closest('form')) ? h4.closest('form') : h4;
            const p = holder.nextElementSibling && holder.nextElementSibling.tagName === 'P' ? holder.nextElementSibling : null;
            return { a, btn, title: h4.textContent.replace(/^[\s»>]+/, '').trim(), text: p ? p.textContent.trim() : '' };
        }).filter(e => e.title && (e.a || e.btn));
        if (!entries.length) return;

        const KINDS = [
            { re: /s=profile/, kind: 'profile' },
            { re: /page=gmail/, kind: 'rule34', icon: 'mail', title: 'My Mail', text: 'Read and answer your messages' },
            { re: /page=favorites/, kind: 'rule34', icon: 'heart', title: 'My Favorites', text: 'Everything you\'ve favourited' },
            { re: /s=options/, kind: 'rule34', icon: 'sliders', title: 'Options', text: 'Blacklist, thresholds, theme, video server' },
            { re: /change_password/, kind: 'security', icon: 'key', title: 'Change Password', text: 'A new password for your account' },
            { re: /s=security/, kind: 'security', icon: 'shield', title: 'Two-factor authentication', text: 'A code from an authenticator app at login' },
            { re: /change_email/, kind: 'security', icon: 'at', title: 'Change E-Mail', text: 'The address that proves the account is yours' }
        ];
        let profile = null, logout = null;
        const groups = { rule34: [], security: [] };
        entries.forEach(e => {
            if (e.btn && !e.a) { logout = e.btn; return; }
            const href = e.a.getAttribute('href') || '';
            const k = KINDS.find(x => x.re.test(href));
            if (k && k.kind === 'profile') { profile = e.a; return; }
            // (anything the site adds later: its own words, with the rule34 links)
            groups[k ? k.kind : 'rule34'].push({ href: e.a.href, icon: k ? k.icon : 'link', title: k ? k.title : e.title, text: k ? k.text : e.text });
        });

        const acc = document.createElement('div');
        acc.className = 's34-acc';
        acc.innerHTML = `
            <div class="s34-acc-head">
                <span class="s34-acc-avatar">${accIcon('user')}</span>
                <div class="s34-acc-name"><b>My Account</b><small>rule34.xxx · signed in</small></div>
                <div class="s34-acc-headbtns"></div>
            </div>`;
        const headBtns = acc.querySelector('.s34-acc-headbtns');
        if (profile) {
            const a = document.createElement('a');
            a.className = 's34-acc-btn';
            a.href = profile.href;
            a.innerHTML = accIcon('user') + '<span>My Profile</span>';
            headBtns.appendChild(a);
        }
        if (logout) {
            const b = document.createElement('button');
            b.type = 'button';
            b.className = 's34-acc-btn';
            b.innerHTML = accIcon('out') + '<span>Log out</span>';
            b.addEventListener('click', () => logout.click()); // the site's own form
            headBtns.appendChild(b);
        }

        const section = (label, tiles, cls = '') => {
            if (!tiles.length) return;
            const h = document.createElement('div');
            h.className = 's34-acc-label';
            h.innerHTML = '<span></span>';
            h.querySelector('span').textContent = label;
            const grid = document.createElement('div');
            grid.className = 's34-acc-grid ' + cls;
            tiles.forEach(t => {
                const el = document.createElement('a');
                el.href = t.href;
                el.className = 's34-acc-tile';
                el.innerHTML = `<span class="s34-acc-ico">${accIcon(t.icon)}</span><span class="s34-acc-txt"><b></b><small></small></span>`;
                el.querySelector('b').textContent = t.title;
                el.querySelector('small').textContent = t.text;
                grid.appendChild(el);
            });
            acc.append(h, grid);
        };

        section('rule34', groups.rule34);
        section('Security', groups.security, 's34-acc-quiet');

        box.prepend(acc);
        box.classList.add('s34-acc-on'); // the site's list stays in the page, hidden
    }

    // =====================================================================
    //  Options
    // =====================================================================
    // The account's list comes HTML-escaped from the site (dandy&#039;s_world),
    // the browser's cookie is read unescaped (dandy's_world): compare and show
    // them by the real tag, but leave the site's own spelling in its field.
    const tagKey = t => unescapeHtml(t).toLowerCase();
    const splitTags = text => {
        const seen = new Set();
        return String(text || '').split(/\s+/).filter(t => {
            const k = tagKey(t);
            if (!t || seen.has(k)) return false;
            seen.add(k);
            return true;
        });
    };
    // rule34's Options page says "Max limit 100 tags", but longer lists are
    // saved on the account. What limits the browser: one cookie of about
    // 4,000 characters - so Steamy34 keeps the full list and hides what
    // doesn't fit itself (see readBlocklist / blCookieFit in 14-tag-buttons).

    function setupOptionsPage() {
        if (!CONFIG.accountPages) return;
        const wrap = document.getElementById('user-edit');
        const form = wrap && wrap.querySelector('form');
        const tagsBox = form && form.querySelector('textarea#tags, textarea[name="tags"]');
        const table = form && form.querySelector('table');
        if (!tagsBox || !table || wrap.querySelector('.s34-opt')) return;

        // The site's rows: [label cell, control cell]
        const rows = Array.from(table.querySelectorAll('tr')).filter(tr => tr.cells.length === 2 && tr.cells[0].querySelector('label'));
        const used = new Set();
        const rowOf = sel => rows.find(tr => !used.has(tr) && tr.querySelector(sel));
        const labelOf = tr => (tr.cells[0].querySelector('label') || tr.cells[0]).textContent.replace(/\?\s*$/, '').trim();
        const hintOf = tr => { const p = tr.cells[0].querySelector('p'); return p ? p.textContent.replace(/\s+/g, ' ').trim() : ''; };

        const opt = document.createElement('div');
        opt.className = 's34-opt';
        opt.innerHTML = `
            <nav class="s34-opt-nav" aria-label="Sections"></nav>
            <div class="s34-opt-main"></div>`;
        const nav = opt.querySelector('.s34-opt-nav');
        const main = opt.querySelector('.s34-opt-main');

        const cards = {};
        const card = (id, title) => {
            const c = document.createElement('section');
            c.className = 's34-opt-card';
            c.id = 's34-opt-' + id;
            c.innerHTML = '<h2 class="s34-opt-h"></h2>';
            c.querySelector('h2').textContent = title;
            cards[id] = c;
            const b = document.createElement('button');
            b.type = 'button';
            b.dataset.sec = id;
            b.textContent = title;
            b.addEventListener('click', () => {
                nav.querySelectorAll('button').forEach(x => x.classList.toggle('s34-on', x === b));
                c.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
            nav.appendChild(b);
            main.appendChild(c);
            return c;
        };
        // One row: title + hint on the left, the control on the right (or below: wide)
        const row = (into, title, hint, ctl, wide) => {
            const r = document.createElement('div');
            r.className = 's34-opt-row' + (wide ? ' s34-opt-wide' : '');
            r.innerHTML = '<div class="s34-opt-txt"><b></b><small></small></div><div class="s34-opt-ctl"></div>';
            r.querySelector('b').textContent = title;
            r.querySelector('small').textContent = hint || '';
            if (!hint) r.querySelector('small').remove();
            if (ctl) r.querySelector('.s34-opt-ctl').append(...[].concat(ctl));
            into.appendChild(r);
            return r;
        };
        // A row of buttons that click the site's own radio buttons (their
        // onclick sets the site's cookies) or set its <select>
        const segment = (choices, current, pick) => {
            const seg = document.createElement('div');
            seg.className = 's34-opt-seg';
            seg.setAttribute('role', 'group');
            const draw = on => seg.querySelectorAll('button').forEach(b => b.classList.toggle('s34-on', b.dataset.v === on));
            choices.forEach(([v, text]) => {
                const b = document.createElement('button');
                b.type = 'button';
                b.dataset.v = v;
                b.textContent = text;
                b.addEventListener('click', () => { if (pick(v) !== false) draw(v); });
                seg.appendChild(b);
            });
            draw(current);
            seg.s34Draw = draw;
            return seg;
        };
        const radioSegment = (radios, names) => {
            const list = radios.map(r => {
                const lab = r.id && form.querySelector(`label[for="${CSS.escape(r.id)}"]`);
                return [r.id || r.value, names[r.id] || (lab ? lab.textContent.replace(/[:\s]+$/, '').trim() : r.value), r];
            });
            const on = list.find(x => x[2].checked);
            return segment(list.map(x => [x[0], x[1]]), on ? on[0] : '', v => { const x = list.find(y => y[0] === v); if (x) x[2].click(); });
        };

        // ---- Filtering ----
        const filter = card('filter', 'Filtering');
        const blRow = rowOf('#tags, textarea[name="tags"]');
        used.add(blRow);
        const blCtl = document.createElement('div');
        blCtl.className = 's34-opt-bl';
        blCtl.id = 's34-blacklist'; // (the window's "Save to account" lands here)
        filter.appendChild(blCtl);
        buildBlacklistEditor(blCtl, tagsBox);

        const scoreRow = (sel, title, hint) => {
            const tr = rowOf(sel);
            if (!tr) return;
            used.add(tr);
            const input = tr.querySelector(sel);
            input.classList.add('s34-opt-num');
            input.inputMode = 'numeric';
            row(filter, title, hint, input);
        };
        scoreRow('input[name="pthreshold"]', 'Hide posts below a score', 'Posts with a lower score are left out of every list');
        scoreRow('input[name="cthreshold"]', 'Hide comments below a score', 'Comments with a lower score are left out');

        // ---- Display ----
        const display = card('display', 'Display');
        {
            const tr = rowOf('input[name="theme"]');
            if (tr) {
                used.add(tr);
                const seg = radioSegment(Array.from(tr.querySelectorAll('input[name="theme"]')), { radThemeLight: 'Light', radThemeDark: 'Dark' });
                const hint = CONFIG.matchSiteTheme
                    ? 'Steamy34 keeps this in step with its colour mode, so pages don\'t flash white while loading (Steamy34 Settings → Look & feel → advanced)'
                    : 'rule34\'s own colours, under Steamy34\'s';
                const r = row(display, 'rule34\'s theme', hint, seg);
                if (CONFIG.matchSiteTheme) {
                    r.classList.add('s34-opt-auto');
                    // (the page was made before Steamy34 set the cookie - show what it is now)
                    seg.s34Draw(readSiteCookie('theme') === 'dark' ? 'radThemeDark' : 'radThemeLight');
                    seg.querySelectorAll('button').forEach(b => { b.disabled = true; });
                }
            }
        }
        {
            const tr = rowOf('select[name="mobile_layout"]');
            if (tr) {
                used.add(tr);
                const sel = tr.querySelector('select');
                const names = ['Automatic', 'Always', 'Never'];
                const choices = Array.from(sel.options).map((o, i) => [o.value, names[i] || o.textContent.trim()]);
                const seg = segment(choices, sel.value, v => { sel.value = v; sel.dispatchEvent(new Event('change', { bubbles: true })); });
                row(display, 'rule34\'s phone layout', 'When the site uses its own phone pages', seg);
            }
        }
        {
            const tr = rowOf('input[name="origimage"]');
            if (tr) {
                used.add(tr);
                const seg = radioSegment(Array.from(tr.querySelectorAll('input[name="origimage"]')), { radResizeDefault: 'Ask', radResizeAlwaysOriginal: 'Always original', radResizeDisable: 'No note' });
                row(display, 'Original pictures', 'On single post pages: the note "this image has been resized" – or always the full-size picture', seg);
            }
        }
        {
            const tr = rowOf('#showAutocomplete');
            if (tr) {
                used.add(tr);
                const box = tr.querySelector('#showAutocomplete');
                box.checked = !!CONFIG.siteSuggestions;
                box.onchange = null; // (the site's own handler; Steamy34 keeps the setting)
                box.addEventListener('change', () => {
                    saveSettingsNow({ siteSuggestions: box.checked });
                    try { localStorage.setItem('doAutocomplete', box.checked ? 'true' : 'false'); } catch (e) {}
                });
                const sw = document.createElement('label');
                sw.className = 's34-sw';
                sw.append(box, Object.assign(document.createElement('span'), { className: 's34-sw-track' }));
                row(display, 'rule34\'s own tag suggestions', 'The site\'s list under tag boxes, e.g. when you edit a post. Steamy34\'s search box has its own', sw);
            }
        }

        // ---- Video server ----
        {
            const tr = rowOf('input[name="domain"]');
            if (tr) {
                used.add(tr);
                const vs = card('video', 'Video server');
                const radios = Array.from(tr.querySelectorAll('input[name="domain"]'));
                const keyOf = r => { const lab = r.id && form.querySelector(`label[for="${CSS.escape(r.id)}"]`); const t = lab ? lab.textContent.trim() : ''; return Object.keys(VIDEO_SERVERS).find(k => VIDEO_SERVERS[k].label === t) || null; };
                const known = radios.map(r => [keyOf(r), r]).filter(x => x[0]);
                known.sort((a, b) => (a[0] === 'default' ? -1 : b[0] === 'default' ? 1 : 0));
                const on = known.find(x => x[1].checked);
                const seg = segment(known.map(([k]) => [k, VIDEO_SERVERS[k].label]), on ? on[0] : 'default', k => {
                    const x = known.find(y => y[0] === k);
                    if (x) x[1].click(); // the site's own cookies
                    writeVideoServer(k);   // (the same - and Steamy34 remembers it)
                    saveSettingsNow({ videoServer: k });
                });
                row(vs, 'Where videos load from', 'Videos stall or won\'t start? Try another server – it applies right away, no need to save. Also in Steamy34 Settings → Viewing posts', seg, true);
                if (known.length < radios.length) { // a server Steamy34 doesn't know yet: the site's own choice as well
                    const extra = document.createElement('div');
                    extra.className = 's34-opt-site';
                    extra.append(...Array.from(tr.cells[1].childNodes));
                    row(vs, 'All servers', '', extra, true);
                }
            }
        }

        // ---- Account & API ----
        const account = card('account', 'Account & API');
        {
            const tr = rowOf('textarea[name="my_tags"]');
            if (tr) {
                used.add(tr);
                const ta = tr.querySelector('textarea[name="my_tags"]');
                const holder = ta.closest('.awesomplete') || ta;
                ta.classList.add('s34-opt-text');
                row(account, 'My Tags', 'Offered when you add or edit a post', holder, true);
            }
        }
        // Supporter e-mail and "Disable ads": the site's own, folded
        {
            const trs = [rowOf('input[name="patreon_email"]'), rows.find(tr => !used.has(tr) && /disable ads/i.test(labelOf(tr)))].filter(Boolean);
            if (trs.length) {
                const fold = document.createElement('div');
                fold.className = 's34-opt-fold';
                fold.hidden = true;
                trs.forEach(tr => {
                    used.add(tr);
                    row(fold, labelOf(tr), hintOf(tr), Array.from(tr.cells[1].childNodes), true);
                });
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 's34-opt-btn';
                btn.textContent = 'Show';
                btn.addEventListener('click', () => { fold.hidden = !fold.hidden; btn.textContent = fold.hidden ? 'Show' : 'Hide'; });
                row(account, 'Supporter e-mail · Disable ads', 'rule34\'s supporter options, as the site has them', btn);
                account.appendChild(fold);
            }
        }
        // API access: folded away, never read
        {
            const tr = rows.find(tr => !used.has(tr) && (/api/i.test(labelOf(tr)) || tr.querySelector('input[name="generate_api_key"]')));
            if (tr) {
                used.add(tr);
                const fold = document.createElement('div');
                fold.className = 's34-opt-fold s34-opt-api';
                fold.hidden = true;
                fold.append(...Array.from(tr.cells[1].childNodes)); // moved, not read
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 's34-opt-btn';
                btn.textContent = 'Unfold';
                btn.addEventListener('click', () => { fold.hidden = !fold.hidden; btn.textContent = fold.hidden ? 'Unfold' : 'Fold'; });
                const r = row(account, 'API access', 'For your own scripts and apps. Folded away – Steamy34 never reads this field. (If you like, you can give Steamy34 your key yourself, for fewer Cloudflare checks: Steamy34 Settings → API key.)', btn);
                const why = document.createElement('button');
                why.type = 'button';
                why.className = 's34-opt-btn';
                why.textContent = 'Steamy34 & the API';
                why.title = 'What Steamy34 can do with a key – optional';
                why.addEventListener('click', () => { try { sessionStorage.setItem(SETTINGS_TAB_KEY, 'api'); } catch (e) {} openSettings(); });
                btn.after(why);
                r.classList.add('s34-opt-locked');
                r.querySelector('.s34-opt-txt').insertAdjacentHTML('afterbegin', `<span class="s34-opt-lock">${accIcon('lock')}</span>`);
                account.appendChild(fold);
            }
        }

        // ---- Anything else the site has (or adds later): as it is ----
        const rest = rows.filter(tr => !used.has(tr));
        if (rest.length) {
            const more = card('more', 'More');
            rest.forEach(tr => row(more, labelOf(tr), hintOf(tr), Array.from(tr.cells[1].childNodes), true));
        }

        // ---- Save: the site's own button ----
        const submit = form.querySelector('input[type="submit"], button[type="submit"]');
        const bar = document.createElement('div');
        bar.className = 's34-opt-save';
        bar.innerHTML = '<span class="s34-opt-dirty" hidden>Unsaved changes</span><button type="button" class="s34-opt-btn" data-act="undo">Undo changes</button>';
        bar.querySelector('[data-act="undo"]').addEventListener('click', () => location.reload());
        if (submit) {
            submit.classList.add('s34-opt-submit');
            if (submit.tagName === 'INPUT') submit.value = 'Save';
            bar.appendChild(submit);
        }
        main.appendChild(bar);
        const markDirty = () => { bar.querySelector('.s34-opt-dirty').hidden = false; };
        form.addEventListener('input', e => { if (e.target.type !== 'radio' && e.target.type !== 'checkbox' && !e.target.classList.contains('s34-opt-add')) markDirty(); });
        // (the site's radio buttons - theme, original pictures, video server -
        // set their cookie right away, and the suggestions switch saves itself)
        form.addEventListener('change', e => { if (e.target.type !== 'radio' && !e.target.closest('.s34-opt-seg, .s34-sw')) markDirty(); });
        opt.addEventListener('s34-opt-dirty', markDirty);

        form.prepend(opt);
        wrap.classList.add('s34-opt-on'); // the site's table (and its intro line) stay, hidden
        // The menu follows along while scrolling
        const spy = () => {
            let on = null;
            Object.values(cards).forEach(c => { if (c.getBoundingClientRect().top <= 120) on = c; });
            if (!on) on = Object.values(cards)[0];
            if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) on = Object.values(cards).pop(); // (the bottom)
            nav.querySelectorAll('button').forEach(b => b.classList.toggle('s34-on', on && b.dataset.sec === on.id.replace('s34-opt-', '')));
        };
        let spyQueued = false;
        window.addEventListener('scroll', () => { if (!spyQueued) { spyQueued = true; requestAnimationFrame(() => { spyQueued = false; spy(); }); } }, { passive: true });
        spy();
    }

    // The blacklist on Options: Steamy34's blacklist panel (the same as the
    // window), inline. One list - this browser's - edited right away; the
    // site's (hidden) field always holds it, so Save puts exactly this list
    // on the account. Opening Options takes over the account's tags first.
    function buildBlacklistEditor(host, tagsBox) {
        const account = splitTags(tagsBox.value).map(unescapeHtml);
        const before = readBlocklist();
        const known = new Set(before.map(t => t.toLowerCase()));
        const pickedUp = account.filter(t => !known.has(t.toLowerCase()));
        if (pickedUp.length) writeBlocklist(before.concat(pickedUp), true); // (no "blacklisted now" dates)
        setAccountBlacklist(account);

        host.innerHTML = '<p class="s34-opt-picked" hidden></p><div class="s34-opt-blpanel"></div>';
        if (pickedUp.length) {
            const p = host.querySelector('.s34-opt-picked');
            p.textContent = `✓ Took over ${pickedUp.length === 1 ? '1 tag' : pickedUp.length + ' tags'} from your account – ${pickedUp.length === 1 ? 'it\'s' : 'they\'re'} active in this browser now.`;
            p.hidden = false;
        }
        const sync = () => {
            tagsBox.value = readBlocklist().join(' ');
            const diff = accountDiff(readBlocklist());
            if (diff && diff.add.length + diff.gone.length) host.dispatchEvent(new CustomEvent('s34-opt-dirty', { bubbles: true }));
        };
        const panel = buildBlacklistPanel(host.querySelector('.s34-opt-blpanel'), { inline: true, onChange: sync });
        if (tagsBox.form) tagsBox.form.addEventListener('submit', () => {
            tagsBox.value = readBlocklist().join(' ');
            setAccountBlacklist(readBlocklist()); // (what the account has after this save)
        });
        // after the page is put together (the dirty mark needs the save bar)
        setTimeout(() => {
            sync();
            panel.lookup();
            if (location.hash === '#s34-blacklist') host.scrollIntoView({ block: 'start' });
        }, 0);
    }
