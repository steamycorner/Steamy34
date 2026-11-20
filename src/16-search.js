    // =====================================================================
    //  6. MULTI-LINE SEARCH BOX
    //  Swaps the one-line search field for a textarea that wraps and grows
    //  in height, so every tag stays visible. Width stays the same, so the
    //  sidebar is not affected. Enter still searches.
    // =====================================================================

    function setupMultilineSearch() {
        const input = document.querySelector(
            '.tag-search input[name="tags"], .sidebar input[name="tags"], input[name="tags"][type="text"], input[name="tags"]:not([type])'
        );
        if (!input || input.dataset.s34Multi) return;

        const ta = document.createElement('textarea');
        ta.name = input.name;
        // Deliberately NOT copying the site's id/class: the site attaches its
        // own suggestion list (awesomplete) by those, which would then show a
        // second, see-through list over ours.
        ta.id = 's34-search';
        ta.className = 's34-search';

        // Invisible stand-in that keeps the original id, so any site script
        // looking for the search field still finds it (it has no name, so it
        // isn't sent with the search).
        const mirror = document.createElement('input');
        mirror.type = 'hidden';
        if (input.id) mirror.id = input.id;
        mirror.value = input.value;
        ta.value = input.value;
        ta.placeholder = input.placeholder || 'Search tags';
        ta.rows = 1;
        ta.spellcheck = false;
        ta.autocomplete = 'off';
        ta.dataset.s34Multi = '1';

        Object.assign(ta.style, {
            display: 'block',
            width: '100%',
            boxSizing: 'border-box',
            resize: 'none',
            overflow: 'hidden',
            font: 'inherit',
            fontSize: '13px',
            lineHeight: '1.4',
            padding: '5px 7px',
            minHeight: '30px'
        });

        const grow = () => {
            ta.style.height = 'auto';
            ta.style.height = ta.scrollHeight + 'px';
        };

        ta.addEventListener('input', () => {
            // No line breaks in a search - turn them into spaces
            if (/\n/.test(ta.value)) {
                const pos = ta.selectionStart;
                ta.value = ta.value.replace(/\n/g, ' ');
                ta.setSelectionRange(pos, pos);
            }
            mirror.value = ta.value;
            grow();
        });

        if (CONFIG.searchSuggestions) attachSuggestions(ta);

        ta.addEventListener('keydown', e => {
            // Enter picks a suggestion when the list is open (handled there)
            if (e.defaultPrevented || ta.dataset.acOpen === '1') return;
            if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
                e.preventDefault();
                ta.value = ta.value.trim().replace(/\s+/g, ' ');
                const form = ta.form;
                if (form) {
                    if (form.requestSubmit) form.requestSubmit();
                    else form.submit();
                }
            }
        });

        input.replaceWith(ta);
        ta.after(mirror);
        grow();
        window.addEventListener('resize', grow);
    }

    // ---- Modern search: tag chips + filters + recent/saved ----------------
    // The real search field stays in the form (hidden), so the site's search
    // works exactly as before. What you see is built on top of it:
    //   [3d ×] [-ai_generated ×] [add tags…]          ✕
    //   Score [≥100]  Size [1080p+]  Sort [Newest]  Type [All]
    //   ▸ Recent searches   🔔 Follow (follows the whole search - 20c-following.js)

    const HISTORY_KEY = 'steamy34_history';
    const SAVED_KEY = 'steamy34_saved'; // old saved searches - moved into Following in Beta 3.1
    const FAVTAGS_KEY = 'steamy34_favtags';
    const HISTORY_MAX = 15;

    function getStoredList(key) {
        try {
            const v = GM_getValue(key, []);
            return Array.isArray(v) ? v : [];
        } catch (e) { return []; }
    }

    function addToHistory(q) {
        q = (q || '').trim().replace(/\s+/g, ' ');
        if (!q) return;
        // "3d lara_croft" and "lara_croft 3d" are the same search
        const same = x => normalizeQuery(x) === normalizeQuery(q);
        const list = getStoredList(HISTORY_KEY).filter(x => !same(x));
        list.unshift(q);
        GM_setValue(HISTORY_KEY, list.slice(0, HISTORY_MAX));
    }

    const SEARCH_FILTERS = [
        { key: 'score', label: 'Score', options: [
            ['', 'Any'], ['50', '≥ 50'], ['100', '≥ 100'], ['250', '≥ 250'],
            ['500', '≥ 500'], ['1000', '≥ 1000'], ['custom', 'Custom…']] },
        { key: 'res', label: 'Size', options: [
            ['', 'Any'], ['720', '720p+'], ['1080', '1080p+'], ['1440', '1440p+'],
            ['2160', '4K'], ['custom', 'Custom…']] },
        { key: 'sort', label: 'Sort', options: [
            ['', 'Newest'], ['sort:score:desc', 'Top score'], ['sort:id:asc', 'Oldest'],
            ['sort:random', 'Random']] },
        { key: 'type', label: 'Type', options: [
            ['', 'All'], ['video', 'Videos'], ['animated', 'Animated'], ['image', 'Images']] },
        { key: 'rating', label: 'Rating', options: [
            ['', 'Any'], ['rating:safe', 'Safe'], ['rating:questionable', 'Questionable'],
            ['rating:explicit', 'Explicit'], ['-rating:explicit', 'Not explicit']] }
    ];

    const TYPE_FILTER_TERMS = {
        video: ['video'],
        animated: ['animated', '-video'],
        image: ['-video', '-animated']
    };

    // Split a search into tag chips and filter settings
    function parseQuery(q) {
        const f = { score: '', scoreOp: '>=', res: '', sort: '', type: '', rating: '' };
        let rest = [];
        let h = null, w = null;
        for (const word of (q || '').split(/\s+/).filter(Boolean)) {
            const lw = word.toLowerCase();
            let m;
            if (!f.score && (m = lw.match(/^score:(>=?)(\d+)$/))) { f.scoreOp = m[1]; f.score = m[2]; continue; }
            if (!f.sort && lw.startsWith('sort:')) { f.sort = lw; continue; }
            if (!f.rating && /^-?rating:[a-z]+$/.test(lw)) { f.rating = lw; continue; }
            if (h === null && (m = lw.match(/^height:>=(\d+)$/))) { h = m[1]; continue; }
            if (w === null && (m = lw.match(/^width:>=(\d+)$/))) { w = m[1]; continue; }
            rest.push(word);
        }
        // Size = "both sides at least N" (works for portrait and landscape)
        if (h !== null && h === w) f.res = h;
        else {
            if (h !== null) rest.push('height:>=' + h);
            if (w !== null) rest.push('width:>=' + w);
        }
        for (const [type, terms] of [['image', TYPE_FILTER_TERMS.image],
                                     ['animated', TYPE_FILTER_TERMS.animated],
                                     ['video', TYPE_FILTER_TERMS.video]]) {
            const lower = rest.map(x => x.toLowerCase());
            if (terms.every(t => lower.includes(t))) {
                f.type = type;
                rest = rest.filter(x => !terms.includes(x.toLowerCase()));
                break;
            }
        }
        return { terms: rest, f };
    }

    function filterTerms(f) {
        const out = [];
        if (f.score) out.push('score:' + f.scoreOp + f.score);
        if (f.res) out.push('height:>=' + f.res, 'width:>=' + f.res);
        if (f.sort) out.push(f.sort);
        if (f.type) out.push(...TYPE_FILTER_TERMS[f.type]);
        if (f.rating) out.push(f.rating);
        return out;
    }

    // ---- Pinned filters: kept for every new search ----
    // { score: '100', scoreOp: '>=', res: '1080', sort: 'sort:score:desc', type: 'video' }
    const PINS_KEY = 'steamy34_pinned';

    function getPins() {
        try {
            const v = GM_getValue(PINS_KEY, {});
            return v && typeof v === 'object' ? v : {};
        } catch (e) { return {}; }
    }

    function setPins(p) { GM_setValue(PINS_KEY, p); }

    // Pinned filters fill in whatever a search doesn't set itself
    // (a search that has its own score / size / ... keeps it)
    function withPins(q) {
        const pins = getPins();
        const keys = SEARCH_FILTERS.map(d => d.key).filter(k => pins[k]);
        if (!keys.length) return q;
        const parsed = parseQuery(q || '');
        let changed = false;
        keys.forEach(k => {
            if (parsed.f[k]) return;
            parsed.f[k] = pins[k];
            if (k === 'score') parsed.f.scoreOp = pins.scoreOp || '>=';
            changed = true;
        });
        return changed ? parsed.terms.concat(filterTerms(parsed.f)).join(' ') : q;
    }

    // Links to a search (tags, favourite tags, the site's own links…) get the
    // pinned filters added right before they're followed
    function addPinsToLink(e) {
        const a = e.target && e.target.closest && e.target.closest('a[href]');
        if (!a) return;
        let u;
        try { u = new URL(a.href, location.href); } catch (err) { return; }
        if (u.origin !== location.origin || u.searchParams.get('page') !== 'post' ||
            u.searchParams.get('s') !== 'list' || u.searchParams.get('pid')) return; // page 2, 3… stay as they are
        if (feedIndexFromHash(u.hash) >= 0) return; // the Following feed has its own filter
        const q = (u.searchParams.get('tags') || '').trim();
        const next = withPins(q === 'all' ? '' : q);
        if (next === q) return;
        u.searchParams.set('tags', next);
        a.href = u.href;
    }
    document.addEventListener('mousedown', addPinsToLink, true);
    document.addEventListener('click', addPinsToLink, true);

    // Arrived at a search some other way (bookmark, the site's menu…) without
    // the pinned filters? Add them right away - once, never in a loop.
    (function applyPinsOnArrival() {
        if (isPostView || params.get('page') !== 'post' || params.get('s') !== 'list' || params.get('pid')) return;
        if (feedIndexFromHash(location.hash) >= 0) return; // the Following feed
        const q = (params.get('tags') || '').trim();
        const next = withPins(q === 'all' ? '' : q);
        if (next === q) return;
        const target = location.pathname + '?page=post&s=list&tags=' + encodeURIComponent(next);
        try {
            if (sessionStorage.getItem('s34_pin_redirect') === target) return; // already tried
            sessionStorage.setItem('s34_pin_redirect', target);
        } catch (e) { return; }
        location.replace(target);
    })();

    function setupChipSearch() {
        const input = document.querySelector(
            '.tag-search input[name="tags"], .sidebar input[name="tags"], input[name="tags"][type="text"], input[name="tags"]:not([type])'
        );
        if (!input || input.dataset.s34Multi) return;

        // The site's "(Supports wildcard *)" note would hang under Steamy34's
        // search box on its own (* still works in a tag bubble)
        const searchArea = input.closest('.tag-search');
        const hint = searchArea && searchArea.querySelector(':scope > small');
        if (hint && /wildcard/i.test(hint.textContent)) hint.classList.add('s34-site-hidden');

        // Hidden real field (sent with the form) + stand-in with the old id
        const ta = document.createElement('textarea');
        ta.name = input.name;
        ta.id = 's34-search';
        ta.className = 's34-search';
        ta.dataset.s34Multi = '1';
        ta.style.display = 'none';
        const mirror = document.createElement('input');
        mirror.type = 'hidden';
        if (input.id) mirror.id = input.id;

        // Pinned filters show up straight away on the posts page (on a single
        // post they're added when the new search starts)
        // (the Following feed's "( a ~ b ~ … )" search stays out of the box - it starts empty)
        // (a followed search shows its own words, without pins)
        let { terms, f } = parseQuery(onSearchFeed() ? input.value : onFeedPage() ? '' : isPostView ? input.value : withPins(input.value));

        const root = document.createElement('div');
        root.className = 's34-sb';
        root.innerHTML = `
            <div class="s34-sb-box">
                <span class="s34-sb-pills"></span>
                <input type="text" class="s34-sb-input" placeholder="Add tags…"
                       autocomplete="off" spellcheck="false">
                <button type="button" class="s34-sb-clear" title="Clear the whole search">✕</button>
            </div>
            <div class="s34-sb-filters"></div>
            <div class="s34-sb-tools">
                <button type="button" class="s34-sb-btn" data-act="menu"></button>
                <button type="button" class="s34-sb-btn" data-act="tags"></button>
                <button type="button" class="s34-sb-btn s34-sb-follow" data-act="save"></button>
            </div>
            <div class="s34-sb-menu" hidden></div>
            <div class="s34-ft" hidden>
                <div class="s34-ft-head">
                    <span>Favourite tags</span>
                    <button type="button" class="s34-ft-edit" title="Add or remove favourite tags">Edit</button>
                </div>
                <div class="s34-ft-chips"></div>
                <div class="s34-ft-add">
                    <input type="text" class="s34-ft-input" placeholder="Add a favourite tag…"
                           autocomplete="off" spellcheck="false">
                </div>
            </div>`;

        const box = root.querySelector('.s34-sb-box');
        const pills = root.querySelector('.s34-sb-pills');
        const field = root.querySelector('.s34-sb-input');
        const filtersEl = root.querySelector('.s34-sb-filters');
        const menu = root.querySelector('.s34-sb-menu');

        const query = () => terms.concat(filterTerms(f)).join(' ');

        // ---- filters ----
        const selects = {};
        const pinButtons = {};
        const PIN_SVG = '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6l-1 6 4 4v2H6v-2l4-4z"/><path d="M12 15v6"/></svg>';

        function filterValueText(key) {
            const sel = selects[key];
            const o = sel && sel.selectedOptions[0];
            return o ? o.textContent : '';
        }

        // Following pages (an artist, all artists, a followed search) show
        // everything - pinned filters are paused there, and we say so
        const pinsPaused = onFeedPage();
        if (pinsPaused) {
            root.classList.add('s34-pins-paused');
            if (Object.keys(getPins()).some(k => k !== 'scoreOp' && getPins()[k])) {
                const note = document.createElement('div');
                note.className = 's34-pins-note';
                note.innerHTML = PIN_SVG + '<span></span>';
                note.querySelector('span').textContent = onSearchFeed()
                    ? 'Your pinned filters are paused here – a followed search shows exactly what you followed.'
                    : 'Your pinned filters are paused here, so you see every new post from the artists you follow. Their own filter is under Following → Manage.';
                filtersEl.before(note);
            }
        }

        SEARCH_FILTERS.forEach(def => {
            const label = document.createElement('div');
            label.className = 's34-sb-filter';
            const top = document.createElement('div');
            top.className = 's34-sb-filter-top';
            const name = document.createElement('span');
            name.textContent = def.label;
            // Pin: keep this filter for every new search
            const pin = document.createElement('button');
            pin.type = 'button';
            pin.className = 's34-pin';
            pin.innerHTML = PIN_SVG;
            pin.addEventListener('click', () => {
                const pins = getPins();
                if (pins[def.key]) {
                    delete pins[def.key];
                    if (def.key === 'score') delete pins.scoreOp;
                    setPins(pins);
                    showToast(`${def.label} is no longer kept for new searches.`);
                } else {
                    if (!f[def.key]) { showToast(`Pick a ${def.label.toLowerCase()} first, then pin it.`); return; }
                    pins[def.key] = f[def.key];
                    if (def.key === 'score') pins.scoreOp = f.scoreOp;
                    setPins(pins);
                    showToast(`Pinned: ${def.label} "${filterValueText(def.key)}" is now kept for every new search.`);
                }
                showFilters();
            });
            top.append(name, pin);
            pinButtons[def.key] = pin;
            const sel = document.createElement('select');
            def.options.forEach(([v, t]) => sel.add(new Option(t, v)));
            sel.addEventListener('change', () => {
                let v = sel.value;
                if (v === 'custom') {
                    const ask = def.key === 'score' ? 'Minimum score:' : 'Minimum width and height in pixels:';
                    const n = parseInt(prompt(ask, f[def.key] || ''), 10);
                    v = n > 0 ? String(n) : f[def.key];
                }
                f[def.key] = v;
                if (def.key === 'score') f.scoreOp = '>=';
                // A pinned filter follows your choice; "Any" unpins it
                // (not on Following pages, where pins are paused)
                const pins = getPins();
                if (pins[def.key] && !pinsPaused) {
                    if (v) {
                        pins[def.key] = v;
                        if (def.key === 'score') pins.scoreOp = f.scoreOp;
                    } else {
                        delete pins[def.key];
                        if (def.key === 'score') delete pins.scoreOp;
                        showToast(`${def.label} is no longer kept for new searches.`);
                    }
                    setPins(pins);
                }
                sync();
            });
            label.append(top, sel);
            filtersEl.appendChild(label);
            selects[def.key] = sel;
        });

        function showFilters() {
            SEARCH_FILTERS.forEach(def => {
                const sel = selects[def.key];
                const v = f[def.key];
                // A value from the address that isn't in the list gets its own entry
                Array.from(sel.options).filter(o => o.dataset.extra).forEach(o => o.remove());
                if (v && !Array.from(sel.options).some(o => o.value === v)) {
                    const text = def.key === 'score' ? (f.scoreOp === '>' ? '> ' : '≥ ') + v
                               : def.key === 'res' ? '≥ ' + v + ' px'
                               : v.replace(/^sort:/, '');
                    const o = new Option(text, v);
                    o.dataset.extra = '1';
                    sel.add(o, sel.options[sel.options.length - (def.key === 'sort' || def.key === 'type' ? 0 : 1)] || null);
                }
                sel.value = v;
                sel.classList.toggle('s34-sb-set', !!v);
                const pinned = !!getPins()[def.key];
                const pin = pinButtons[def.key];
                pin.classList.toggle('s34-on', pinned);
                pin.closest('.s34-sb-filter').classList.toggle('s34-pinned', pinned);
                pin.title = pinned && pinsPaused ? 'Pinned, but paused on this page – your other searches still use it'
                          : pinned ? `Pinned: kept for every new search – click to unpin`
                                   : `Pin: keep this ${def.label.toLowerCase()} for every new search`;
            });
        }

        // ---- tag chips ----
        function termType(term) {
            const base = term.replace(/^[-~]+/, '').toLowerCase();
            return tagTypes.get(base) || (base.includes(':') ? 'metadata' : 'general');
        }

        function renderPills() {
            pills.replaceChildren();
            terms.forEach((term, i) => {
                const pill = document.createElement('span');
                const ex = term.startsWith('-');
                pill.className = 's34-pill s34-pill-' + termType(term) + (ex ? ' s34-pill-ex' : '');
                const text = document.createElement('span');
                text.className = 's34-pill-text';
                text.textContent = term.replace(/_/g, ' ');
                text.title = term.startsWith('~') ? term
                    : ex ? 'Excluded - click to include it again' : 'Click to exclude it (-tag)';
                text.addEventListener('click', () => {
                    if (term.startsWith('~')) return;
                    terms[i] = ex ? term.slice(1) : '-' + term;
                    sync();
                });
                const x = document.createElement('button');
                x.type = 'button';
                x.className = 's34-pill-x';
                x.textContent = '×';
                x.title = 'Remove';
                x.addEventListener('click', e => {
                    e.stopPropagation();
                    terms.splice(i, 1);
                    sync();
                    field.focus();
                });
                pill.append(text, x);
                pills.appendChild(pill);
            });
            field.placeholder = terms.length ? 'Add tags…' : 'Search tags…';
        }

        // ---- favourite tags: one click adds them to the search ----
        const ft = root.querySelector('.s34-ft');
        const ftChips = root.querySelector('.s34-ft-chips');
        const ftInput = root.querySelector('.s34-ft-input');
        let ftEditing = false;

        const getFavTags = () => getStoredList(FAVTAGS_KEY).filter(t => typeof t === 'string' && t);
        const setFavTags = list => GM_setValue(FAVTAGS_KEY, list);

        function renderFavTags() {
            const favTags = getFavTags();
            ftChips.replaceChildren();
            if (!favTags.length) ftEditing = true; // empty: show the add box until "Done"
            ft.classList.toggle('s34-ft-editing', ftEditing);
            ft.querySelector('.s34-ft-edit').textContent = ftEditing ? 'Done' : 'Edit';
            ft.querySelector('.s34-ft-edit').hidden = !favTags.length;
            if (!favTags.length) {
                const hint = document.createElement('div');
                hint.className = 's34-ft-hint';
                hint.textContent = 'Add tags you search often – then one click puts them in the search.';
                ftChips.appendChild(hint);
            }
            const lower = terms.map(t => t.toLowerCase());
            favTags.forEach(tag => {
                const lt = tag.toLowerCase();
                const state = lower.includes(lt) ? 'in' : lower.includes('-' + lt) ? 'out' : '';
                const chip = document.createElement('span');
                chip.className = 's34-ft-chip s34-pill-' + termType(tag) + (state ? ' s34-ft-' + state : '');
                const name = document.createElement('span');
                name.className = 's34-ft-name';
                name.textContent = tag.replace(/_/g, ' ');
                name.title = state === 'in' ? 'In the search – click to take it out'
                           : state === 'out' ? 'Excluded – click to remove the exclusion'
                           : 'Click to add to the search (Shift+click: exclude it)';
                name.addEventListener('click', e => {
                    const base = lt;
                    if (state) {
                        terms = terms.filter(t => t.toLowerCase().replace(/^-/, '') !== base);
                        sync();
                    } else {
                        addTerms([(e.shiftKey ? '-' : '') + tag]);
                    }
                });
                chip.appendChild(name);
                if (ftEditing) {
                    const x = document.createElement('button');
                    x.type = 'button';
                    x.className = 's34-ft-x';
                    x.textContent = '×';
                    x.title = 'Remove from favourite tags';
                    x.addEventListener('click', e => {
                        e.stopPropagation();
                        setFavTags(getFavTags().filter(t => t.toLowerCase() !== lt));
                        renderFavTags();
                    });
                    chip.appendChild(x);
                }
                ftChips.appendChild(chip);
            });
        }

        function addFavTags(words) {
            const list = getFavTags();
            const have = new Set(list.map(t => t.toLowerCase()));
            words.map(w => w.replace(/^[-~]+/, '').trim()).filter(Boolean).forEach(w => {
                if (!have.has(w.toLowerCase())) { list.push(w); have.add(w.toLowerCase()); }
            });
            setFavTags(list);
            renderFavTags();
        }

        function commitFavInput(all) {
            const v = ftInput.value;
            const parts = v.split(/\s+/);
            const keep = all || /\s$/.test(v) ? '' : parts.pop();
            const done = parts.filter(Boolean);
            if (done.length) addFavTags(done);
            ftInput.value = keep;
        }

        ftInput.addEventListener('input', () => { if (/\s/.test(ftInput.value)) commitFavInput(false); });
        if (CONFIG.searchSuggestions) attachSuggestions(ftInput);
        ftInput.addEventListener('keydown', e => {
            if (e.defaultPrevented || ftInput.dataset.acOpen === '1' || e.isComposing) return;
            if (e.key === 'Enter') {
                e.preventDefault();
                commitFavInput(true);
            }
        });
        ft.querySelector('.s34-ft-edit').addEventListener('click', () => {
            commitFavInput(true);
            ftEditing = !ftEditing;
            renderFavTags();
            if (ftEditing) ftInput.focus();
        });

        function sync() {
            ta.value = query();
            mirror.value = ta.value;
            renderPills();
            showFilters();
            renderFavTags();
            if (typeof refreshSearchButtons === 'function') refreshSearchButtons();
            styleFollowSearchBtn();
        }

        // 🔔 Follow / Following for the search in the box
        function styleFollowSearchBtn() {
            const b = root.querySelector('.s34-sb-follow');
            if (!b) return;
            const q = query();
            const on = !!q && isQueryFollowed(q);
            b.classList.toggle('s34-following', on);
            // Just the bell (the word is there for screen readers)
            b.innerHTML = (on ? BELL_ON_SVG : BELL_SVG) + `<span class="s34-sr">${on ? 'Following' : 'Follow'}</span>`;
            b.title = !q ? 'Follow a search: its new posts show up in the sidebar' : on ? 'You follow this search – click to stop' : 'Follow this search – its new posts show up in the sidebar, with NEW on them';
            b.setAttribute('aria-pressed', on ? 'true' : 'false');
        }

        function addTerms(words) {
            words.filter(Boolean).forEach(word => {
                const lw = word.toLowerCase();
                // Filter words typed by hand go to their filter instead
                const parsed = parseQuery(word);
                if (!parsed.terms.length) {
                    SEARCH_FILTERS.forEach(def => { if (parsed.f[def.key]) f[def.key] = parsed.f[def.key]; });
                    if (parsed.f.score) f.scoreOp = parsed.f.scoreOp;
                    return;
                }
                const base = lw.replace(/^-/, '');
                // Adding "tag" replaces "-tag" and the other way round; no duplicates
                terms = terms.filter(t => t.toLowerCase().replace(/^-/, '') !== base || t.startsWith('~'));
                terms.push(word);
            });
            sync();
        }

        // Turn finished words into chips
        function commitField(all) {
            const v = field.value;
            const parts = v.split(/\s+/);
            const keep = all || /\s$/.test(v) ? '' : parts.pop();
            const done = parts.filter(Boolean);
            if (done.length) addTerms(done);
            field.value = keep;
        }

        field.addEventListener('input', () => {
            if (/\s/.test(field.value)) commitField(false);
        });

        if (CONFIG.searchSuggestions) attachSuggestions(field);

        field.addEventListener('keydown', e => {
            if (e.defaultPrevented || field.dataset.acOpen === '1' || e.isComposing) return;
            if (e.key === 'Enter') {
                e.preventDefault();
                if (field.value.trim()) {
                    commitField(true);       // Enter adds the word...
                } else {
                    submit();                // ...Enter on an empty field searches
                }
            } else if (e.key === 'Backspace' && !field.value && terms.length) {
                e.preventDefault();
                terms.pop();
                sync();
            }
        });

        function submit() {
            commitField(true);
            ta.value = query();
            mirror.value = ta.value;
            const form = ta.form;
            if (!form) { runSearch(ta.value); return; }
            if (form.requestSubmit) form.requestSubmit(); else form.submit();
        }

        box.addEventListener('mousedown', e => {
            if (e.target === box || e.target === pills) { e.preventDefault(); field.focus(); }
        });

        root.querySelector('.s34-sb-clear').addEventListener('click', () => {
            terms = [];
            f = { score: '', scoreOp: '>=', res: '', sort: '', type: '', rating: '' };
            field.value = '';
            sync();
            field.focus();
        });

        // ---- recent & saved ----
        function menuItem(label, sub, onClick, onDelete, badge) {
            const row = document.createElement('div');
            row.className = 's34-sb-item';
            const main = document.createElement('div');
            main.className = 's34-sb-item-main';
            const l = document.createElement('div');
            l.className = 's34-sb-item-label';
            l.textContent = label;
            if (badge) {
                const b = document.createElement('span');
                b.className = 's34-sb-new';
                b.textContent = badge;
                b.title = 'New posts since you last opened this search';
                l.prepend(b);
            }
            main.appendChild(l);
            if (sub) {
                const s = document.createElement('div');
                s.className = 's34-sb-item-sub';
                s.textContent = sub;
                main.appendChild(s);
            }
            main.title = 'Search: ' + (sub || label);
            main.addEventListener('click', onClick);
            row.appendChild(main);
            if (onDelete) {
                const del = document.createElement('button');
                del.type = 'button';
                del.className = 's34-sb-item-del';
                del.textContent = '✕';
                del.title = 'Remove';
                del.addEventListener('click', e => { e.stopPropagation(); onDelete(); renderMenu(); });
                row.appendChild(del);
            }
            return row;
        }

        function renderMenu() {
            menu.replaceChildren();
            const recent = getStoredList(HISTORY_KEY);
            if (!recent.length) {
                const n = document.createElement('div');
                n.className = 's34-sb-empty';
                n.textContent = 'No searches yet.';
                menu.appendChild(n);
            }
            recent.forEach(q => menu.appendChild(menuItem(q.replace(/_/g, ' '), '',
                () => runSearch(q),
                () => GM_setValue(HISTORY_KEY, getStoredList(HISTORY_KEY).filter(x => x !== q)))));
            if (recent.length) {
                const clear = document.createElement('button');
                clear.type = 'button';
                clear.className = 's34-sb-btn s34-sb-clear-recent';
                clear.textContent = 'Clear recent';
                clear.addEventListener('click', () => { GM_setValue(HISTORY_KEY, []); renderMenu(); });
                menu.appendChild(clear);
            }
            const hide = document.createElement('button');
            hide.type = 'button';
            hide.className = 's34-sb-hide';
            hide.textContent = '▴ Hide this list';
            hide.title = 'Fold the list away - open it again with "Recent"';
            hide.addEventListener('click', () => showPanel(''));
            menu.appendChild(hide);
        }

        // 🕘 Recent · ★ Tags: one list opens below the row at a time
        // (remembered; '' = both folded)
        const CLOCK_SVG = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>';
        const STAR_SVG_S = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linejoin="round"><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/></svg>';
        const recentBtn = root.querySelector('[data-act="menu"]');
        const tagsBtn = root.querySelector('[data-act="tags"]');
        recentBtn.innerHTML = CLOCK_SVG + '<span>Recent</span>';
        tagsBtn.innerHTML = STAR_SVG_S + '<span>Tags</span>';
        function showPanel(which, remember = true) {
            menu.hidden = which !== 'recent';
            ft.hidden = which !== 'tags';
            recentBtn.classList.toggle('s34-sb-open', which === 'recent');
            tagsBtn.classList.toggle('s34-sb-open', which === 'tags');
            recentBtn.title = which === 'recent' ? 'Hide your recent searches' : 'Your recent searches';
            tagsBtn.title = which === 'tags' ? 'Hide your favourite tags' : 'Your favourite tags – one click puts one in the search';
            if (which === 'recent') renderMenu();
            if (remember) GM_setValue('steamy34_sb_panel', which);
        }
        const panelNow = () => (!menu.hidden ? 'recent' : !ft.hidden ? 'tags' : '');
        recentBtn.addEventListener('click', () => showPanel(panelNow() === 'recent' ? '' : 'recent'));
        tagsBtn.addEventListener('click', () => showPanel(panelNow() === 'tags' ? '' : 'tags'));
        const followBtn = root.querySelector('[data-act="save"]');
        followBtn._s34Refresh = styleFollowSearchBtn;
        followBtn.addEventListener('click', () => {
            commitField(true);
            sync();
            const q = query();
            if (!q) { showToast('Type a search first – then the bell follows it.'); return; }
            // Count new posts from now on (from the results you're looking at)
            toggleFollowSearch(q, seenIdForQuery(q));
            styleFollowSearchBtn();
        });
        // Recent is open by default - folded on phones, where it would push the
        // posts a whole screen down. Once you open / fold one yourself, that's
        // kept (before Beta 3.3 only Recent was remembered: steamy34_sbmenu_open)
        let panelSaved = GM_getValue('steamy34_sb_panel', null);
        if (panelSaved === null) {
            const old = GM_getValue('steamy34_sbmenu_open', null);
            panelSaved = old === null ? (isPhoneLayout() ? '' : 'recent') : old !== false ? 'recent' : '';
        }
        showPanel(['recent', 'tags'].includes(panelSaved) ? panelSaved : '', false);
        styleFollowSearchBtn();

        // ---- outside changes (the + / − buttons on posts) ----
        ta.addEventListener('input', () => {
            ({ terms, f } = parseQuery(ta.value));
            sync();
        });

        input.replaceWith(root);
        root.after(ta, mirror);

        // The site's phone layout has a "search options" gear next to its
        // small search field. With the Steamy34 search box it covered the
        // tags and only unfolded a heading, so it's hidden (see SEARCH_CSS).

        // Move the site's Search button right under the filters and style it.
        // The site's phone layout has none (or hides it) - then Steamy34 adds its own.
        let submitBtn = ta.form && ta.form.querySelector('input[type="submit"], button[type="submit"]');
        if (!submitBtn) {
            submitBtn = document.createElement('button');
            submitBtn.type = 'button';
            submitBtn.textContent = 'Search';
            submitBtn.addEventListener('click', e => { e.preventDefault(); submit(); });
        }
        if (!root.contains(submitBtn)) {
            submitBtn.classList.add('s34-sb-submit');
            filtersEl.after(submitBtn);
        }

        // The site's own Search button: take along what's still typed
        if (ta.form) ta.form.addEventListener('submit', () => {
            commitField(true);
            ta.value = query();
            mirror.value = ta.value;
        });
        sync();
    }

    // ---- Tag suggestions -------------------------------------------------

    // Candidate autocomplete endpoints. The one the site itself uses is
    // detected from the page scripts and tried first.
    function findAutocompleteEndpoints() {
        const found = [];
        for (const s of document.scripts) {
            const text = (s.src || '') + ' ' + (s.textContent || '');
            const m = text.match(/((?:https?:)?\/\/[^"'\s]*autocomplete\.php[^"'\s]*)/i);
            if (m) found.push(m[1]);
        }
        found.push('https://ac.rule34.xxx/autocomplete.php', 'https://api.rule34.xxx/autocomplete.php');
        return [...new Set(found.map(u => {
            let base = u.startsWith('//') ? 'https:' + u : u;
            base = base.replace(/([?&])q=[^&]*/, '$1').replace(/[?&]+$/, '');
            return base;
        }))];
    }

    let acEndpoints = null;
    let acWorking = null; // endpoint that answered correctly

    function acUrl(base, term) {
        return base + (base.includes('?') ? '&' : '?') + 'q=' + encodeURIComponent(term);
    }

    function gmGet(url) {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: 'GET',
                url,
                headers: { Referer: location.href },
                onload: r => (r.status >= 200 && r.status < 300) ? resolve(r.responseText) : reject(r.status),
                onerror: reject,
                ontimeout: reject,
                timeout: 8000
            });
        });
    }

    // Normalise whatever the endpoint returns into [{value, label, type}]
    function parseSuggestions(text) {
        const data = JSON.parse(text);
        const list = Array.isArray(data) ? data : (data.tags || data.results || []);
        return list.map(item => {
            if (typeof item === 'string') return { value: item, label: item, type: '' };
            const value = item.value || item.name || item.tag || '';
            return {
                value,
                label: item.label || (item.count != null ? `${value} (${item.count})` : value),
                type: String(item.type || item.category || '').toLowerCase()
            };
        }).filter(s => s.value);
    }

    // Throws if no suggestion server answers (so callers can tell
    // "no match" apart from "couldn't ask")
    async function acQuery(term) {
        if (!acEndpoints) acEndpoints = findAutocompleteEndpoints();
        const order = acWorking ? [acWorking] : acEndpoints;
        for (const base of order) {
            try {
                const list = parseSuggestions(await gmGet(acUrl(base, term)));
                if (!acWorking) {
                    acWorking = base;
                    console.log('[Steamy34] Using suggestions from', base);
                }
                return list;
            } catch (e) {
                if (acWorking) break;
            }
        }
        throw new Error('no tag-suggestion server answered');
    }

    async function fetchSuggestions(term) {
        try {
            return await acQuery(term);
        } catch (e) {
            console.warn('[Steamy34] No tag-suggestion endpoint answered.', acEndpoints);
            return [];
        }
    }

    function attachSuggestions(ta) {
        const wrap = document.createElement('div');
        wrap.className = 's34-ac-wrap';
        // (the textarea is moved into the wrapper once it's in the page - see below)
        const list = document.createElement('ul');
        list.className = 's34-ac-list';

        let items = [];
        let active = -1;
        let debounce = null;
        let reqId = 0;

        // Current word under the cursor, plus a leading - or ~ prefix
        function currentToken() {
            const v = ta.value;
            const pos = ta.selectionStart;
            const start = v.slice(0, pos).search(/\S*$/);
            const endMatch = v.slice(pos).match(/^\S*/);
            const end = pos + (endMatch ? endMatch[0].length : 0);
            const raw = v.slice(start, end);
            const prefix = (raw.match(/^[-~]+/) || [''])[0];
            return { start, end, prefix, term: raw.slice(prefix.length) };
        }

        function close() {
            list.style.display = 'none';
            list.innerHTML = '';
            items = [];
            active = -1;
            ta.dataset.acOpen = '0';
        }

        function highlight(i) {
            active = i;
            Array.from(list.children).forEach((li, n) => li.classList.toggle('s34-ac-active', n === i));
            if (list.children[i]) list.children[i].scrollIntoView({ block: 'nearest' });
        }

        function pick(i) {
            const s = items[i];
            if (!s) return;
            const t = currentToken();
            const before = ta.value.slice(0, t.start);
            const after = ta.value.slice(t.end).replace(/^\s*/, '');
            const insert = t.prefix + s.value + ' ';
            ta.value = before + insert + after;
            const caret = before.length + insert.length;
            ta.setSelectionRange(caret, caret);
            close();
            ta.dispatchEvent(new Event('input')); // regrow
            ta.focus();
        }

        function render(suggestions) {
            items = suggestions.slice(0, CONFIG.suggestionCount);
            list.innerHTML = '';
            if (!items.length) { close(); return; }
            items.forEach((s, i) => {
                const li = document.createElement('li');
                li.textContent = s.label;
                li.title = s.value;
                if (s.type) li.classList.add('s34-ac-' + s.type.replace(/[^a-z]/g, ''));
                li.addEventListener('mousedown', e => { e.preventDefault(); pick(i); });
                li.addEventListener('mouseenter', () => highlight(i));
                list.appendChild(li);
            });
            list.style.display = 'block';
            ta.dataset.acOpen = '1';
            highlight(0);
        }

        function update() {
            clearTimeout(debounce);
            const { term } = currentToken();
            if (!term) { close(); return; }
            const myId = ++reqId;
            debounce = setTimeout(async () => {
                const res = await fetchSuggestions(term);
                if (myId !== reqId || document.activeElement !== ta) return;
                render(res);
            }, 150);
        }

        ta.addEventListener('input', update);
        ta.addEventListener('click', update);
        ta.addEventListener('blur', () => setTimeout(close, 100));

        ta.addEventListener('keydown', e => {
            if (ta.dataset.acOpen !== '1') return;
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                highlight((active + 1) % items.length);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                highlight((active - 1 + items.length) % items.length);
            } else if (e.key === 'Enter' || e.key === 'Tab') {
                if (active >= 0) {
                    e.preventDefault();
                    pick(active);
                }
            } else if (e.key === 'Escape') {
                e.preventDefault();
                close();
            }
        });

        // Finish wiring once the textarea is in place
        queueMicrotask(() => {
            if (ta.parentNode && ta.parentNode !== wrap) {
                ta.parentNode.insertBefore(wrap, ta);
                wrap.appendChild(ta);
                wrap.appendChild(list);
            }
        });
        close();
    }

