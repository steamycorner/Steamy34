    // ---- Blacklist window: every blacklisted tag, recent ones, sorting ----
    const BL_SORT_KEY = 'steamy34_blsort';
    const BL_SORTS = [
        ['newest', 'Newest'],
        ['oldest', 'Oldest'],
        ['az', 'A–Z'],
        ['za', 'Z–A'],
        ['type', 'Type']
    ];
    const BL_TYPE_ORDER = ['artist', 'character', 'copyright', 'general', 'metadata', 'other'];
    const BL_TYPE_NAMES = {
        artist: 'Artists', character: 'Characters', copyright: 'Copyrights',
        general: 'General', metadata: 'Meta', other: 'Type not known yet'
    };
    const BLOCK_SVG = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><path d="M6 6l12 12"/></svg>';

    function timeAgo(ms) {
        if (!ms) return '';
        const s = Math.max(0, (Date.now() - ms) / 1000);
        if (s < 60) return 'just now';
        if (s < 3600) return Math.floor(s / 60) + ' min ago';
        if (s < 86400) return Math.floor(s / 3600) + ' h ago';
        if (s < 86400 * 30) return Math.floor(s / 86400) + ' d ago';
        return new Date(ms).toLocaleDateString();
    }

    function blType(tag) {
        const t = tagTypes.get(tag.toLowerCase());
        if (t) return BL_TYPE_ORDER.includes(t) ? t : 'other';
        // Search filters like rating:explicit (not "honkai:_star_rail", a real tag)
        return BL_FILTER_RE.test(tag) ? 'metadata' : 'other';
    }
    const BL_FILTER_RE = /^(rating|score|user|id|md5|width|height|sort|source|fav|pool|parent|status|ratio|filetype|date|order):/i;

    // Everything on screen that shows blacklist states
    function refreshBlockStates() {
        markBlocklisted();
        document.querySelectorAll('#tag-sidebar li[class*="tag-type-"]').forEach(row => {
            const btn = row.querySelector('.r34-block-btn');
            const tag = getTagFromRow(row);
            if (btn && tag) styleButton(btn, isBlocked(tag));
        });
        const count = document.querySelector('.s34-blbtn-count');
        if (count) count.textContent = blCountText();
    }

    function blCountText() {
        const n = readBlocklist().length;
        return n === 1 ? '1 tag' : n + ' tags';
    }

    function openBlacklistManager() {
        if (document.querySelector('.s34-blm-overlay')) return;
        let sort = GM_getValue(BL_SORT_KEY, 'newest');
        if (!BL_SORTS.some(s => s[0] === sort)) sort = 'newest';
        let filter = '';

        const overlay = document.createElement('div');
        overlay.className = 's34-overlay s34-blm-overlay';
        overlay.innerHTML = `
            <div class="s34-blm" role="dialog" aria-modal="true">
                <div class="s34-blm-head">
                    <div class="s34-blm-icon">${BLOCK_SVG}</div>
                    <div class="s34-blm-heading">
                        <div class="s34-blm-title">Blacklist</div>
                        <div class="s34-blm-sub"></div>
                    </div>
                    <button type="button" class="s34-blm-close" title="Close (Esc)">✕</button>
                </div>
                <div class="s34-blm-add">
                    <input type="text" class="s34-blm-input" placeholder="Blacklist a tag…" autocomplete="off" spellcheck="false">
                    <button type="button" class="s34-blm-addbtn">Add</button>
                </div>
                <div class="s34-blm-recent-box">
                    <div class="s34-blm-label">Recently blacklisted</div>
                    <div class="s34-blm-recent"></div>
                </div>
                <div class="s34-blm-tools">
                    <input type="search" class="s34-blm-filter" placeholder="Filter…" autocomplete="off" spellcheck="false">
                    <div class="s34-blm-sort" role="tablist"></div>
                </div>
                <div class="s34-blm-status" hidden></div>
                <div class="s34-blm-list"></div>
                <div class="s34-blm-foot">
                    <div class="s34-blm-dates" hidden></div>
                    <div>Uses rule34.xxx's own blacklist (the same list as My Account → Options).</div>
                </div>
            </div>`;

        const $ = sel => overlay.querySelector(sel);
        const listEl = $('.s34-blm-list');
        const recentEl = $('.s34-blm-recent');
        const sortEl = $('.s34-blm-sort');
        const addInput = $('.s34-blm-input');

        BL_SORTS.forEach(([key, label]) => {
            const b = document.createElement('button');
            b.type = 'button';
            b.dataset.sort = key;
            b.textContent = label;
            b.addEventListener('click', () => {
                sort = key;
                GM_setValue(BL_SORT_KEY, key);
                render();
            });
            sortEl.appendChild(b);
        });

        function removeTag(tag) {
            const times = getBlTimes();
            const when = times[tag.toLowerCase()];
            writeBlocklist(readBlocklist().filter(t => t.toLowerCase() !== tag.toLowerCase()));
            refreshBlockStates();
            render();
            showToast(`Removed "${prettyTag(tag)}" from the blacklist`, 'Undo', () => {
                writeBlocklist(readBlocklist().concat(tag));
                if (when) { const t = getBlTimes(); t[tag.toLowerCase()] = when; GM_setValue(BL_TIMES_KEY, t); }
                refreshBlockStates();
                if (overlay.isConnected) render();
            });
        }

        function addTags(words) {
            const list = readBlocklist();
            const have = new Set(list.map(t => t.toLowerCase()));
            const added = [];
            words.map(w => w.replace(/^[-~]+/, '').trim()).filter(Boolean).forEach(w => {
                if (!have.has(w.toLowerCase())) { list.push(w); have.add(w.toLowerCase()); added.push(w); }
            });
            if (!added.length) return;
            writeBlocklist(list);
            refreshBlockStates();
            render();
            showToast('Blacklisted ' + added.map(prettyTag).join(', '));
            if (!lookingUp) lookupUnknownTypes(); // find out what kind of tags they are
        }

        function chipFor(tag) {
            const chip = document.createElement('span');
            chip.className = 's34-blm-chip s34-blm-' + blType(tag);
            const name = document.createElement('span');
            name.className = 's34-blm-name';
            name.textContent = prettyTag(tag);
            chip.appendChild(name);
            return chip;
        }

        // Small menu to set a tag's type by hand
        function openTypeMenu(chip, tag) {
            closeTypeMenu();
            const menu = document.createElement('div');
            menu.className = 's34-blm-typemenu';
            const head = document.createElement('div');
            head.className = 's34-blm-typemenu-head';
            head.textContent = 'Type of "' + prettyTag(tag) + '"';
            menu.appendChild(head);
            ['artist', 'character', 'copyright', 'general', 'metadata'].forEach(type => {
                const b = document.createElement('button');
                b.type = 'button';
                b.className = 's34-blm-' + type + (blType(tag) === type ? ' s34-on' : '');
                b.textContent = type === 'metadata' ? 'Meta' : type.charAt(0).toUpperCase() + type.slice(1);
                b.addEventListener('click', () => {
                    tagTypes.set(tag.toLowerCase(), type);
                    scheduleTagTypeSave();
                    closeTypeMenu();
                    render();
                });
                menu.appendChild(b);
            });
            const box = overlay.querySelector('.s34-blm');
            box.appendChild(menu);
            const r = chip.getBoundingClientRect();
            const br = box.getBoundingClientRect();
            menu.style.left = Math.max(8, Math.min(r.left - br.left, br.width - menu.offsetWidth - 12)) + 'px';
            // Below the tag, or above it when there's no room at the bottom
            const below = r.bottom - br.top + 6;
            const above = r.top - br.top - menu.offsetHeight - 6;
            menu.style.top = (below + menu.offsetHeight > br.height - 8 && above > 8 ? above : below) + 'px';
        }
        function closeTypeMenu() {
            const m = overlay.querySelector('.s34-blm-typemenu');
            if (m) m.remove();
        }
        overlay.addEventListener('mousedown', e => {
            if (!e.target.closest('.s34-blm-typemenu, .s34-blm-name')) closeTypeMenu();
        });

        // One compact chip per tag: name + ×; type and date in the tooltip.
        // Clicking the name sets its type.
        function makeChip(tag, when) {
            const chip = chipFor(tag);
            chip.classList.add('s34-blm-item');
            const type = blType(tag);
            const typeName = type !== 'other' ? (type === 'metadata' ? 'Meta' : type.charAt(0).toUpperCase() + type.slice(1)) : 'Type not known yet';
            chip.title = [typeName, when ? 'blacklisted ' + timeAgo(when) : 'blacklisted before Steamy34 tracked dates']
                .join(' · ') + '\nClick to set its type';
            chip.querySelector('.s34-blm-name').addEventListener('click', () => openTypeMenu(chip, tag));
            const x = document.createElement('button');
            x.type = 'button';
            x.className = 's34-blm-x';
            x.textContent = '×';
            x.title = 'Remove from the blacklist';
            x.addEventListener('click', () => removeTag(tag));
            chip.appendChild(x);
            return chip;
        }

        function render() {
            const list = readBlocklist();
            const times = getBlTimes();
            const when = t => times[t.toLowerCase()] || 0;
            $('.s34-blm-sub').textContent = list.length
                ? `${blCountText()} · posts with these tags are hidden`
                : 'Nothing blacklisted yet';

            // Why some tags have no date
            const undated = list.filter(t => !when(t)).length;
            const datesEl = $('.s34-blm-dates');
            datesEl.hidden = !undated;
            datesEl.textContent = undated
                ? `${undated === list.length ? 'These tags were' : undated + (undated === 1 ? ' tag was' : ' tags were')} ` +
                  'blacklisted before Steamy34 started remembering dates (it only does that since it was installed), ' +
                  'so they don\'t show under "Recently blacklisted" and sort as oldest.'
                : '';

            // Recently blacklisted: the last 8 with a known date
            const recent = list.filter(when).sort((a, b) => when(b) - when(a)).slice(0, 8);
            $('.s34-blm-recent-box').hidden = !recent.length;
            recentEl.replaceChildren(...recent.map(tag => {
                const item = document.createElement('div');
                item.className = 's34-blm-recent-item';
                const chip = chipFor(tag);
                chip.title = 'Click to set its type';
                chip.querySelector('.s34-blm-name').addEventListener('click', () => openTypeMenu(chip, tag));
                const x = document.createElement('button');
                x.type = 'button';
                x.className = 's34-blm-x';
                x.textContent = '×';
                x.title = 'Remove from the blacklist';
                x.addEventListener('click', () => removeTag(tag));
                chip.appendChild(x);
                const ago = document.createElement('span');
                ago.className = 's34-blm-ago';
                ago.textContent = timeAgo(when(tag));
                item.append(chip, ago);
                return item;
            }));

            sortEl.querySelectorAll('button').forEach(b => b.classList.toggle('s34-on', b.dataset.sort === sort));

            const f = filter.toLowerCase().replace(/ /g, '_');
            let shown = list.filter(t => !f || t.toLowerCase().includes(f));
            const byName = (a, b) => a.toLowerCase().localeCompare(b.toLowerCase());
            if (sort === 'newest') shown.sort((a, b) => when(b) - when(a) || byName(a, b));
            else if (sort === 'oldest') shown.sort((a, b) => (when(a) || 0) - (when(b) || 0) || byName(a, b));
            else if (sort === 'az') shown.sort(byName);
            else if (sort === 'za') shown.sort((a, b) => byName(b, a));
            else if (sort === 'type') shown.sort((a, b) =>
                BL_TYPE_ORDER.indexOf(blType(a)) - BL_TYPE_ORDER.indexOf(blType(b)) || byName(a, b));

            listEl.replaceChildren();
            if (!shown.length) {
                const empty = document.createElement('div');
                empty.className = 's34-blm-empty';
                empty.textContent = list.length ? 'No tag matches the filter.' : 'Your blacklist is empty. Add a tag above, or use ⊘ next to any tag.';
                listEl.appendChild(empty);
                return;
            }
            // Chips flow in rows; "Type" adds a small heading per group
            let lastType = null;
            let wrap = null;
            shown.forEach(tag => {
                if (!wrap || (sort === 'type' && blType(tag) !== lastType)) {
                    if (sort === 'type') {
                        lastType = blType(tag);
                        const h = document.createElement('div');
                        h.className = 's34-blm-group';
                        h.textContent = BL_TYPE_NAMES[lastType] || lastType;
                        listEl.appendChild(h);
                        if (lastType === 'other') {
                            const note = document.createElement('div');
                            note.className = 's34-blm-why';
                            note.textContent = lookingUp
                                ? 'Looking these up on the tag server…'
                                : 'Steamy34 learns tag types from the pages and suggestions it sees, so tags you ' +
                                  'blacklisted before installing it can be missing here. It looks them up by itself; ' +
                                  'the server didn\'t know these – click a tag to set its type.';
                            listEl.appendChild(note);
                        }
                    }
                    wrap = document.createElement('div');
                    wrap.className = 's34-blm-chips';
                    listEl.appendChild(wrap);
                }
                wrap.appendChild(makeChip(tag, when(tag)));
            });
        }

        // Add box: Space / Enter / picking a suggestion adds the tag
        const commitAdd = all => {
            const v = addInput.value;
            const parts = v.split(/\s+/);
            const keep = all || /\s$/.test(v) ? '' : parts.pop();
            const done = parts.filter(Boolean);
            if (done.length) addTags(done);
            addInput.value = keep;
        };
        addInput.addEventListener('input', () => { if (/\s/.test(addInput.value)) commitAdd(false); });
        if (CONFIG.searchSuggestions) attachSuggestions(addInput);
        addInput.addEventListener('keydown', e => {
            if (e.defaultPrevented || addInput.dataset.acOpen === '1' || e.isComposing) return;
            if (e.key === 'Enter') { e.preventDefault(); commitAdd(true); }
        });
        $('.s34-blm-addbtn').addEventListener('click', () => { commitAdd(true); addInput.focus(); });

        $('.s34-blm-filter').addEventListener('input', e => { filter = e.target.value.trim(); render(); });

        function close() {
            document.removeEventListener('keydown', onKey, true);
            overlay.remove();
        }
        function onKey(e) {
            if (e.key !== 'Escape') return;
            if (addInput.dataset.acOpen === '1') return; // Esc closes the suggestions first
            e.preventDefault();
            e.stopPropagation();
            close();
        }
        $('.s34-blm-close').addEventListener('click', close);
        overlay.addEventListener('mousedown', e => { if (e.target === overlay) close(); });
        document.addEventListener('keydown', onKey, true);

        // Types of tags Steamy34 hasn't seen yet: ask the tag-suggestion server
        let lookingUp = false;
        function setStatus(text) {
            const s = $('.s34-blm-status');
            s.hidden = !text;
            s.textContent = text || '';
        }
        async function lookupUnknownTypes() {
            const unknown = readBlocklist().map(t => t.toLowerCase())
                .filter(t => !tagTypes.has(t) && !BL_FILTER_RE.test(t));
            if (!unknown.length) return;
            lookingUp = true;
            let done = 0;
            for (const t of unknown) {
                if (!overlay.isConnected) break;
                setStatus(`Looking up tag types… ${done} / ${unknown.length}`);
                try {
                    await lookupTypesViaSuggestions([t]);
                } catch (e) {
                    lookingUp = false;
                    setStatus('Couldn\'t reach the tag server right now – you can click a tag to set its type.');
                    render();
                    return;
                }
                done++;
                if (done % 5 === 0) render();
            }
            lookingUp = false;
            setStatus('');
            if (overlay.isConnected) render();
        }

        render();
        document.body.appendChild(overlay);
        addInput.focus();
        lookupUnknownTypes();
    }

    // Sidebar button that opens it (posts page and single posts),
    // right above the Steamy34 Settings button
    function addBlacklistButton() {
        if (document.querySelector('.s34-blbtn')) return;
        const gear = document.querySelector('.s34-gear.s34-inline');
        if (!gear) return;
        const btn = document.createElement('div');
        btn.className = 's34-blbtn';
        btn.title = 'See and manage your blacklist';
        btn.innerHTML = `
            <span class="s34-blbtn-icon">${BLOCK_SVG}</span>
            <span class="s34-blbtn-text"><b>Blacklist</b><span class="s34-blbtn-count"></span></span>`;
        btn.querySelector('.s34-blbtn-count').textContent = blCountText();
        btn.addEventListener('click', openBlacklistManager);
        makeKeyClickable(btn, 'Blacklist');
        gear.before(btn);
    }

