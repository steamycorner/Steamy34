    // =====================================================================
    //  8. SETTINGS MENU (steaming-cup button in the sidebar)
    // =====================================================================

    // Settings window: sections on the left, one section at a time on the
    // right, advanced options folded away, Save / Cancel at the bottom.
    const SETTINGS_TAB_KEY = 'steamy34_settings_tab';
    const LOCK_SVG = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';
    const HELP_SVG = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.4"/><circle cx="12" cy="17" r=".8" fill="currentColor"/></svg>';

    function openSettings() {
        if (document.querySelector('.s34-overlay')) return;

        const overlay = document.createElement('div');
        overlay.className = 's34-overlay s34-set-overlay';
        const panel = document.createElement('div');
        panel.className = 's34-set';
        panel.setAttribute('role', 'dialog');
        overlay.appendChild(panel);

        const sections = SETTINGS_UI.concat([
            { id: 'api', title: 'API key (optional)', icon: KEY_SVG },
            { id: 'privacy', title: 'Privacy & data', icon: LOCK_SVG },
            { id: 'help', title: 'Help', icon: HELP_SVG }
        ]);

        panel.innerHTML = `
            <aside class="s34-set-nav">
                <div class="s34-set-brand">
                    <img src="${logoData()}" alt="">
                    <div><b>Steamy34</b><span>Settings · ${CURRENT_VERSION}</span></div>
                </div>
                <nav></nav>
                <div class="s34-set-safe">${LOCK_SVG}<span>Nothing is collected – everything stays on this computer.</span></div>
                <a class="s34-set-discord" href="${DISCORD_URL}" target="_blank" rel="noopener noreferrer" title="Join the steamycorner Discord – #feedback and #new-ideas for Steamy34">${DISCORD_SVG}<span><b>Join the Discord</b><small>Ideas, bugs, news</small></span></a>
            </aside>
            <section class="s34-set-main">
                <div class="s34-set-head">
                    <h2></h2>
                    <input type="search" class="s34-set-search" placeholder="Search settings…" aria-label="Search settings" autocomplete="off">
                    <button type="button" class="s34-set-x" data-act="cancel" title="Close (Esc)">✕</button>
                </div>
                <div class="s34-set-body"></div>
                <div class="s34-set-foot">
                    <button type="button" class="s34-set-btn s34-set-tourbtn" data-act="welcome" title="Watch the welcome tour again">✨ Welcome tour</button>
                    <span class="s34-set-dirty" hidden>Unsaved changes</span>
                    <button type="button" class="s34-set-btn" data-act="cancel">Cancel</button>
                    <button type="button" class="s34-set-btn s34-set-primary" data-act="save">Save &amp; reload</button>
                </div>
            </section>`;

        const nav = panel.querySelector('nav');
        const body = panel.querySelector('.s34-set-body');
        const fields = {}; // key -> element
        const pages = {};
        const markDirty = () => { panel.querySelector('.s34-set-dirty').hidden = false; };

        function makeControl(key, extra, value, id) {
            let el;
            if (extra.options) {
                el = document.createElement('select');
                Object.entries(extra.options).forEach(([v, text]) => {
                    const o = document.createElement('option');
                    o.value = v;
                    o.textContent = text;
                    if (v === value) o.selected = true;
                    el.appendChild(o);
                });
            } else if (extra.hotkey) {
                // Click the box, then press the key you want
                el = document.createElement('input');
                el.type = 'text';
                el.readOnly = true;
                el.className = 's34-hotkey';
                el.dataset.code = value;
                el.value = keyLabel(value);
                el.addEventListener('focus', () => { el.value = 'Press a key…'; });
                el.addEventListener('blur', () => { el.value = keyLabel(el.dataset.code); });
                el.addEventListener('keydown', e => {
                    if (['Escape', 'Tab'].includes(e.key)) return;
                    if (['Shift', 'Control', 'Alt', 'Meta'].includes(e.key)) return;
                    e.preventDefault();
                    e.stopPropagation();
                    el.dataset.code = e.code;
                    markDirty();
                    el.blur();
                });
            } else if (typeof DEFAULTS[key] === 'boolean') {
                el = document.createElement('input');
                el.type = 'checkbox';
                el.checked = value;
            } else if (typeof DEFAULTS[key] === 'number') {
                el = document.createElement('input');
                el.type = 'number';
                if (extra.min != null) el.min = extra.min;
                if (extra.max != null) el.max = extra.max;
                el.value = value;
            } else {
                el = document.createElement('input');
                el.type = 'text';
                el.value = value;
            }
            el.id = id;
            el.addEventListener('change', markDirty);
            return el;
        }

        function makeRow(key, label, extra) {
            const row = document.createElement('div');
            row.className = 's34-set-row' + (extra.adv ? ' s34-set-adv' : '');
            row.dataset.key = key;
            const id = 's34-set-' + key;
            const text = document.createElement('label');
            text.className = 's34-set-label';
            text.htmlFor = id;
            const b = document.createElement('span');
            b.textContent = label;
            text.appendChild(b);
            if (extra.hint) {
                const h = document.createElement('small');
                h.textContent = extra.hint;
                text.appendChild(h);
            }
            const ctl = document.createElement('div');
            ctl.className = 's34-set-ctl';
            if (extra.folder) {
                // Not a normal setting: the folder is picked / removed right away
                ctl.classList.add('s34-folder-ctl');
                buildFolderControl(ctl, id);
                row.append(text, ctl);
                return row;
            }
            const el = makeControl(key, extra, CONFIG[key], id);
            if (el.type === 'checkbox') {
                // A switch instead of a plain tick box
                const sw = document.createElement('label');
                sw.className = 's34-sw';
                sw.htmlFor = id;
                sw.append(el, Object.assign(document.createElement('span'), { className: 's34-sw-track' }));
                ctl.appendChild(sw);
            } else {
                ctl.appendChild(el);
                if (extra.unit) {
                    const u = document.createElement('span');
                    u.className = 's34-unit';
                    u.textContent = extra.unit;
                    ctl.appendChild(u);
                }
            }
            fields[key] = el;
            row.append(text, ctl);
            return row;
        }

        // ---- the setting sections ----
        const openAdvanced = {};   // section id -> unfolds its "advanced" card
        SETTINGS_UI.forEach(sec => {
            const page = document.createElement('div');
            page.className = 's34-set-page';
            const basic = document.createElement('div');
            basic.className = 's34-set-card';
            const adv = document.createElement('div');
            adv.className = 's34-set-card s34-set-advcard';
            sec.rows.forEach(([key, label, extra = {}]) => (extra.adv ? adv : basic).appendChild(makeRow(key, label, extra)));
            page.appendChild(basic);
            if (adv.childElementCount) {
                const toggle = document.createElement('button');
                toggle.type = 'button';
                toggle.className = 's34-set-advbtn';
                const n = adv.childElementCount;
                const show = open => {
                    adv.hidden = !open;
                    toggle.textContent = (open ? '▾ Hide advanced' : '▸ Show advanced') + ` (${n})`;
                };
                toggle.addEventListener('click', () => show(adv.hidden));
                show(false);
                page.append(toggle, adv);
                openAdvanced[sec.id] = () => show(true);
            }
            pages[sec.id] = page;
        });

        // ---- Privacy & data: what is stored, backup, reset ----
        {
            const page = document.createElement('div');
            page.className = 's34-set-page';
            page.appendChild(buildPrivacySection());
            const backup = document.createElement('div');
            backup.className = 's34-set-card s34-set-plain';
            backup.innerHTML = `
                <div class="s34-set-cardhead">Backup</div>
                <p>Settings, searches, favourite tags, collections, downloaded / viewed posts, favourites, votes and your blacklist in one file – e.g. to move to another browser or your phone.</p>
                <div class="s34-set-actions">
                    <button type="button" class="s34-set-btn" data-act="export">⬇ Export backup</button>
                    <button type="button" class="s34-set-btn" data-act="import">⬆ Import backup</button>
                </div>
                <div class="s34-set-cardhead">Reset</div>
                <p>Puts every setting back to how it was at the start. Your searches, collections and so on stay.</p>
                <div class="s34-set-actions">
                    <button type="button" class="s34-set-btn s34-set-danger" data-act="reset">Reset all settings</button>
                </div>`;
            page.appendChild(backup);
            pages.privacy = page;
        }

        // ---- API key (optional, 20h): explained, pasted by the person themself ----
        {
            const page = document.createElement('div');
            page.className = 's34-set-page';
            page.appendChild(buildApiSection());
            pages.api = page;
        }

        // ---- Help ----
        {
            const page = document.createElement('div');
            page.className = 's34-set-page';
            page.innerHTML = `
                <div class="s34-set-card s34-set-plain">
                    <div class="s34-set-cardhead">About Steamy34</div>
                    <p><b>A fan-made hobby project.</b> Steamy34 is made for fun by steamycorner. It's free and will
                       never be monetized – no ads, no paid features, no data collection. It isn't made by or
                       connected to rule34.xxx.</p>
                    <div class="s34-set-cardhead">Getting around</div>
                    <p>The handiest keys and clicks – middle click closes a post, ${browseKeyText()} browse, ${keyLabel(CONFIG.downloadKey)} downloads – are all in the quick tips.</p>
                    <div class="s34-set-actions">
                        <button type="button" class="s34-set-btn" data-act="welcome">✨ Welcome tour</button>
                        <button type="button" class="s34-set-btn" data-act="tips"><span class="s34-qmark">?</span> Shortcuts &amp; tips</button>
                        <button type="button" class="s34-set-btn" data-act="changelog">What's new</button>
                        <button type="button" class="s34-set-btn" data-act="mobile">${PHONE_SVG.replace('width="22" height="22"', 'width="15" height="15"')} On your phone</button>
                    </div>
                    <div class="s34-set-cardhead">Questions, bugs or ideas?</div>
                    <div class="s34-set-actions"><button type="button" class="s34-set-btn" data-act="debug" title="Shows what would be shared, then copies it – no searches, tags or artists">🐞 Copy info for a bug report</button></div>
                    <p>Join the Steamy34 channels (#feedback, #new-ideas) on steamycorner's <a href="${DISCORD_URL}" target="_blank" rel="noopener noreferrer">Discord</a> – or write in the <a href="${SLEAZY_URL}/feedback" target="_blank" rel="noopener noreferrer">Feedback tab on Sleazy Fork</a>. More from steamycorner: <a href="https://linktr.ee/steamycorner" target="_blank" rel="noopener noreferrer">linktr.ee/steamycorner</a></p>
                    <p class="s34-set-ver">Steamy34 ${CURRENT_VERSION}</p>
                </div>`;
            pages.help = page;
        }

        // ---- section menu ----
        function showSection(id) {
            if (!pages[id]) id = 'look';
            nav.querySelectorAll('button').forEach(b => b.classList.toggle('s34-on', b.dataset.sec === id));
            body.replaceChildren(pages[id]);
            body.scrollTop = 0;
            panel.querySelector('.s34-set-head h2').textContent = sections.find(s => s.id === id).title;
            try { sessionStorage.setItem(SETTINGS_TAB_KEY, id); } catch (e) {}
        }
        sections.forEach(sec => {
            const b = document.createElement('button');
            b.type = 'button';
            b.dataset.sec = sec.id;
            b.innerHTML = sec.icon + '<span></span>';
            b.querySelector('span').textContent = sec.title;
            b.addEventListener('click', () => showSection(sec.id));
            nav.appendChild(b);
        });
        let startTab = 'look';
        try { startTab = sessionStorage.getItem(SETTINGS_TAB_KEY) || 'look'; } catch (e) {}
        showSection(startTab);

        // ---- Search settings: type a word, click a result to jump there ----
        // Searches labels, hints, choices and the section names, plus the
        // buttons on the Privacy and Help pages.
        const searchIndex = [];
        SETTINGS_UI.forEach(sec => sec.rows.forEach(([key, label, extra = {}]) => {
            searchIndex.push({
                sec: sec.id, key, label, hint: extra.hint || '', adv: !!extra.adv,
                text: [label, extra.hint, sec.title, key, extra.options && Object.values(extra.options).join(' ')].filter(Boolean).join(' ').toLowerCase()
            });
        }));
        [
            ['api', 'API key (optional)', 'Your rule34 API key – fewer Cloudflare checks, faster new-post counts and hover previews – private, only sent to rule34'],
            ['privacy', 'What is stored', 'See and delete everything Steamy34 keeps – privacy, data, storage'],
            ['privacy', 'Export / import backup', 'Move everything to another browser or your phone – backup, restore, save'],
            ['privacy', 'Reset all settings', 'Back to how it was at the start – default'],
            ['help', 'Welcome tour', 'The best features, slide by slide – intro, introduction, first start'],
            ['help', 'Shortcuts & quick tips', 'All keys and gestures – keyboard, hotkeys, help'],
            ['help', 'What\'s new', 'The changelog – updates, version'],
            ['help', 'On your phone', 'Android guide – mobile, install'],
            ['help', 'About Steamy34', 'Fan project, contact, feedback, bugs']
        ].forEach(([sec, label, hint]) => searchIndex.push({ sec, key: null, label, hint, adv: false, text: (label + ' ' + hint + ' ' + sec).toLowerCase() }));

        const searchBox = panel.querySelector('.s34-set-search');
        function showSearch(q) {
            const words = q.toLowerCase().split(/\s+/).filter(Boolean);
            if (!words.length) { showSection(nav.querySelector('button.s34-on') ? nav.querySelector('button.s34-on').dataset.sec : 'look'); return; }
            const hits = searchIndex.filter(it => words.every(w => it.text.includes(w)));
            const list = document.createElement('div');
            list.className = 's34-set-card s34-set-results';
            if (!hits.length) {
                list.innerHTML = '<p class="s34-set-nohit">Nothing found – try another word.</p>';
            }
            hits.forEach(it => {
                const b = document.createElement('button');
                b.type = 'button';
                b.className = 's34-set-hit-btn';
                const where = sections.find(s => s.id === it.sec).title + (it.adv ? ' · advanced' : '');
                b.innerHTML = '<span></span><small></small><em></em>';
                b.querySelector('span').textContent = it.label;
                b.querySelector('small').textContent = it.hint;
                b.querySelector('em').textContent = where;
                b.addEventListener('click', () => {
                    searchBox.value = '';
                    showSection(it.sec);
                    if (it.adv && openAdvanced[it.sec]) openAdvanced[it.sec]();
                    const row = it.key && pages[it.sec].querySelector('.s34-set-row[data-key="' + it.key + '"]');
                    if (row) {
                        row.scrollIntoView({ block: 'center' });
                        row.classList.remove('s34-set-flash');
                        void row.offsetWidth;
                        row.classList.add('s34-set-flash');
                        const ctl = row.querySelector('input, select, button');
                        if (ctl) ctl.focus({ preventScroll: true });
                    }
                });
                list.appendChild(b);
            });
            nav.querySelectorAll('button').forEach(b => b.classList.toggle('s34-on', false));
            panel.querySelector('.s34-set-head h2').textContent = hits.length + (hits.length === 1 ? ' result' : ' results');
            body.replaceChildren(list);
            body.scrollTop = 0;
        }
        searchBox.addEventListener('input', () => showSearch(searchBox.value));
        searchBox.addEventListener('keydown', e => {
            if (e.key === 'Enter') { e.preventDefault(); const first = body.querySelector('.s34-set-hit-btn'); if (first) first.click(); }
        });
        // Picking a section in the menu ends the search
        nav.addEventListener('click', () => { searchBox.value = ''; });

        function close() {
            overlay.remove();
            document.removeEventListener('keydown', onKey, true);
        }
        function onKey(e) {
            if (document.querySelector('.s34-tips-overlay, .s34-cl-overlay, .s34-mob-overlay, .s34-wel-overlay')) return; // Esc closes those first
            if (e.key !== 'Escape') return;
            e.stopPropagation();
            // Setting a new hotkey? Esc just cancels that, not the whole window
            const active = document.activeElement;
            if (active && active.classList && active.classList.contains('s34-hotkey')) {
                e.preventDefault();
                active.blur();
                return;
            }
            // Something typed in "Search settings"? Esc clears that first
            if (active && active.classList && active.classList.contains('s34-set-search') && active.value) {
                e.preventDefault();
                active.value = '';
                active.dispatchEvent(new Event('input'));
                return;
            }
            close();
        }

        function collect() {
            const out = {};
            for (const key in fields) {
                const el = fields[key];
                const def = DEFAULTS[key];
                let v;
                if (el.classList.contains('s34-hotkey')) v = el.dataset.code || def;
                else if (typeof def === 'boolean') v = el.checked;
                else if (typeof def === 'number') {
                    v = parseFloat(el.value);
                    if (isNaN(v)) v = def;
                    if (el.min !== '') v = Math.max(v, parseFloat(el.min));
                    if (el.max !== '') v = Math.min(v, parseFloat(el.max));
                } else v = el.value;
                // Only store what differs from the defaults
                if (v !== def) out[key] = v;
            }
            return out;
        }

        panel.addEventListener('click', e => {
            const btn = e.target.closest('[data-act]');
            const act = btn && btn.dataset.act;
            if (!act) return;
            if (act === 'cancel') close();
            else if (act === 'save') {
                // Keep settings that live outside this window (sidebar switches)
                const keep = loadSaved();
                for (const k in fields) delete keep[k];
                GM_setValue(SETTINGS_KEY, Object.assign(keep, collect()));
                location.reload();
            } else if (act === 'welcome') {
                openWelcome(0);
            } else if (act === 'debug') {
                openDebugInfo();
            } else if (act === 'tips') {
                openQuickTips();
            } else if (act === 'changelog') {
                openChangelog(null);
            } else if (act === 'mobile') {
                openMobileGuide();
            } else if (act === 'export') {
                exportBackup();
            } else if (act === 'import') {
                importBackup();
            } else if (act === 'reset') {
                if (confirm('Reset all Steamy34 settings to how they were at the start?')) {
                    GM_setValue(SETTINGS_KEY, {});
                    location.reload();
                }
            }
        });
        overlay.addEventListener('mousedown', e => { if (e.target === overlay) close(); });
        document.addEventListener('keydown', onKey, true);

        document.body.appendChild(overlay);
    }

    // A div that acts as a button: reachable with Tab, Enter / Space click it
    function makeKeyClickable(el, label) {
        el.setAttribute('role', 'button');
        el.tabIndex = 0;
        if (label) el.setAttribute('aria-label', label);
        el.addEventListener('keydown', e => {
            if ((e.key === 'Enter' || e.key === ' ') && e.target === el) {
                e.preventDefault();
                e.stopPropagation();
                el.click();
            }
        });
        return el;
    }

    const GEAR_SVG = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>';

    function addSettingsButton() {
        // (Beta 3.8) In rule34's top menu on every page: "Steamy34 Settings".
        // The sidebar button is still made (other parts are placed next to
        // it) but stays hidden while the top menu has it.
        const inNav = addNavSettings();
        const gear = document.createElement('div');
        gear.className = 's34-gear';
        gear.title = 'Steamy34 Settings · ' + CURRENT_VERSION;
        makeKeyClickable(gear, 'Steamy34 Settings');
        const icon = new Image();
        icon.src = logoData();
        icon.alt = 'Steamy34 Settings';
        gear.appendChild(icon);
        gear.addEventListener('click', openSettings);

        // In the sidebar: a slim "⚙ Settings" button (the logo and version
        // sit in their own small line below - see addTipsLink)
        const makeInline = () => {
            gear.classList.add('s34-inline');
            icon.remove();
            gear.insertAdjacentHTML('beforeend', GEAR_SVG);
            const label = document.createElement('span');
            label.className = 's34-gear-text';
            label.textContent = 'Settings';
            gear.appendChild(label);
        };

        // Posts page: put it in the sidebar where the tag list used to be
        const tagList = document.querySelector('#tag-sidebar');
        const slot = isPostView ? getPostSidebarSlot() : null;
        if (!isPostView && CONFIG.hideListTags && tagList) {
            makeInline();
            if (inNav) gear.classList.add('s34-gear-in-nav');
            tagList.after(gear); // sticks together with the sidebar
        } else if (slot) {
            // Single post: in the sidebar, under the Download button
            makeInline();
            if (inNav) gear.classList.add('s34-gear-in-nav');
            slot.appendChild(gear);
        } else if (inNav) {
            // Pages without the sidebar (favourites, My Account, Options…): the
            // top menu has it. (On phones that menu folds into the ☰ Menu, so
            // there it stays in the corner.)
            return;
        } else {
            document.body.appendChild(gear);
        }
    }

    // Single post pages: a box in the sidebar, right below the search,
    // that holds the Download and Settings buttons
    let postSidebarSlot;
    function getPostSidebarSlot() {
        if (postSidebarSlot !== undefined) return postSidebarSlot;
        postSidebarSlot = null;

        const sidebar = document.querySelector('.sidebar, #sidebar') ||
                        (document.querySelector('#tag-sidebar') || {}).parentElement;
        if (!sidebar) return null;

        const slot = document.createElement('div');
        slot.className = 's34-tools';

        // Find the search block. Climb up towards the sidebar, but never to an
        // element that also holds the tag list (that must not become sticky).
        const tagList = document.querySelector('#tag-sidebar');
        const searchField = sidebar.querySelector('input[name="tags"], textarea[name="tags"]');
        let anchor = searchField && (searchField.closest('.tag-search') || searchField.closest('form'));
        while (anchor && anchor.parentElement && anchor.parentElement !== sidebar &&
               sidebar.contains(anchor.parentElement) &&
               !(tagList && anchor.parentElement.contains(tagList))) {
            anchor = anchor.parentElement;
        }
        if (anchor && tagList && anchor.contains(tagList)) anchor = null;

        // Search + Download + Settings together in one box that stays at
        // the top while you scroll
        const box = document.createElement('div');
        box.className = 's34-sticky-top';
        if (anchor) {
            anchor.before(box);
            box.append(anchor, slot);
        } else {
            sidebar.prepend(box);
            box.append(slot);
        }

        postSidebarSlot = slot;
        return slot;
    }

