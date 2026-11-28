    // =====================================================================
    //  SAVED SEARCHES (Beta 3.7) - a search with all its filters, kept
    //  The square disk button next to Search saves what the search box
    //  holds right now (tags, score, size, sort, type, rating). The sidebar
    //  lists them under Following, each with "N new" - a row is simply that
    //  search. Since Beta 3.15 (asked for on Discord) a row opens the search in
    //  the Following window – its own circle, NEW since your last look, a name
    //  of its own (✎ Rename); Ctrl / middle click still opens the posts page.
    //  "New" only makes sense for searches sorted newest first: one sorted
    //  by score or at random gets no count and no NEW marks.
    //  Counting: one page per saved search, in the background check of
    //  Following (checkFollowing) - through the shared, gentle line.
    //  Stored on this device (steamy34_saved_searches - not the old
    //  steamy34_saved, which Beta 3.6 moved into Recent and clears).
    // =====================================================================
    const SAVED_SEARCH_KEY = 'steamy34_saved_searches';
    const DISK_SVG = '<svg class="s34-disk" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3h11l4 4v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M7 3v5h9V3"/><path d="M7 21v-7h10v7"/></svg>';

    const normQuery = q => String(q || '').trim().split(/\s+/).filter(Boolean).join(' ');
    const sameQuery = (a, b) => normQuery(a).toLowerCase() === normQuery(b).toLowerCase();
    // Newest first (no sort, or by id): then "new" means something
    const searchCountable = q => !/(^|\s)sort:(?!id(:desc)?(\s|$))/i.test(' ' + q + ' ');

    function getSavedSearches() {
        let v = [];
        try { v = GM_getValue(SAVED_SEARCH_KEY, []); } catch (e) {}
        return (Array.isArray(v) ? v : []).filter(s => s && typeof s.query === 'string' && normQuery(s.query))
            .map(s => Object.assign({ added: 0, seen: 0, latest: 0, count: 0, more: false, pic: '' }, s, { query: normQuery(s.query) }));
    }
    function saveSavedSearches(list) { GM_setValue(SAVED_SEARCH_KEY, list); }
    function findSavedSearch(q, list) { return (list || getSavedSearches()).find(s => sameQuery(s.query, q)) || null; }
    const isSavedSearch = (q, list) => !!findSavedSearch(q, list);

    function savedTotals(list) {
        list = list || getSavedSearches();
        const n = list.reduce((s, x) => s + (x.count || 0), 0);
        return { n, more: list.some(x => x.more) };
    }

    // Save / remove (with Undo)
    function toggleSavedSearch(q) {
        q = normQuery(q);
        if (!q) { showToast('Add a tag or a filter first – then save the search.'); return false; }
        const list = getSavedSearches();
        const i = list.findIndex(s => sameQuery(s.query, q));
        if (i >= 0) {
            const removed = list.splice(i, 1)[0];
            saveSavedSearches(list);
            showToast('Removed "' + searchLabel(removed) + '" from your saved searches.', 'Undo', () => {
                const again = getSavedSearches();
                if (!isSavedSearch(q, again)) { again.splice(Math.min(i, again.length), 0, removed); saveSavedSearches(again); }
                refreshSavedUi();
            });
        } else {
            list.push({ query: q, added: Date.now(), seen: 0, latest: 0, count: 0, more: false, pic: '' });
            saveSavedSearches(list);
            // counting starts with the next check (it sets where "new" begins)
            const d = getFollowing(); d.checkedAt = 0; saveFollowing(d);
            showToast('Saved "' + searchLabel({ query: q }) + '" – it shows up under Saved searches' + (searchCountable(q) ? ', with its new posts.' : '.'));
        }
        refreshSavedUi();
        return i < 0;
    }

    // (Beta 3.16) "Open where?" - a small menu at the row
    function askSavedSearchOpen(row) {
        document.querySelectorAll('.s34-ss-menu').forEach(m => m.remove());
        const q = row.dataset.ss;
        const menu = document.createElement('div');
        menu.className = 's34-cmenu s34-ss-menu';
        menu.innerHTML = '<div class="s34-cmenu-head">Open this search…</div>'
            + '<button type="button" class="s34-cmenu-item" data-o="page"><span class="s34-cmenu-name">Here, as the posts page</span></button>'
            + '<button type="button" class="s34-cmenu-item" data-o="window"><span class="s34-cmenu-name">In the Following window</span></button>'
            + '<label class="s34-ss-remember"><input type="checkbox"> Always do this</label>';
        menu.addEventListener('click', e => {
            const b = e.target.closest('[data-o]');
            if (!b) return;
            if (menu.querySelector('input').checked) { saveSettingsNow({ savedSearchOpen: b.dataset.o }); showToast('Saved searches open ' + (b.dataset.o === 'page' ? 'as the posts page' : 'in the Following window') + ' now – change it in Settings → Following.'); }
            menu.remove();
            if (b.dataset.o === 'window') openFollowPopup(fwKeySearch(q));
            else location.href = row.getAttribute('href');
        });
        document.body.appendChild(menu);
        const r = row.getBoundingClientRect();
        menu.style.left = Math.max(8, Math.min(r.left, window.innerWidth - menu.offsetWidth - 8)) + 'px';
        menu.style.top = Math.min(r.bottom + 4, window.innerHeight - menu.offsetHeight - 8) + 'px';
        const off = e => { if (!menu.contains(e.target) && !row.contains(e.target)) { menu.remove(); document.removeEventListener('mousedown', off, true); } };
        setTimeout(() => document.addEventListener('mousedown', off, true), 0);
    }

    // (Beta 3.15) A name of its own ("deadlock silver" → "Silver") - empty = the search itself
    function renameSavedSearch(q) {
        const list = getSavedSearches();
        const s = findSavedSearch(q, list);
        if (!s) return;
        const name = prompt('A name for this saved search (empty = show the search itself):', s.name || '');
        if (name === null) return;
        const clean = name.trim().slice(0, 60);
        if (clean && clean !== s.query) s.name = clean; else delete s.name;
        saveSavedSearches(list);
        refreshSavedUi();
        showToast(clean ? `Renamed to "${clean}".` : 'Shows the search itself again.');
    }

    // Everything that shows saved searches, after a change
    function refreshSavedUi() {
        renderSavedBox();
        document.querySelectorAll('.s34-sb-save').forEach(b => { if (b._s34Update) b._s34Update(); });
        const win = document.querySelector('.s34-follow-win');
        if (win && win._s34Render) win._s34Render();
        fwRefresh();
        updateTabBadge();
    }

    // ---- The disk button next to Search (made by the search box, 16) ----
    // getQuery: the search right now; beforeSave: take along what's still typed
    function makeSaveSearchButton(getQuery, beforeSave) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 's34-sb-save';
        b.innerHTML = DISK_SVG;
        b._s34Update = () => {
            const q = normQuery(getQuery());
            const on = !!q && isSavedSearch(q);
            b.classList.toggle('s34-on', on);
            b.setAttribute('aria-pressed', on ? 'true' : 'false');
            b.title = !q ? 'Save this search – add a tag or a filter first'
                : on ? 'Saved – click to remove it from your saved searches'
                : 'Save this search (with its filters) – it shows up under Saved searches' + (searchCountable(q) ? ', with its new posts' : '');
            b.setAttribute('aria-label', b.title);
        };
        b.addEventListener('click', e => {
            e.preventDefault();
            if (beforeSave) beforeSave();
            toggleSavedSearch(getQuery());
        });
        b._s34Update();
        return b;
    }

    // ---- Sidebar: "Saved searches" under Following ----
    function addSavedBox() {
        if (document.querySelector('.s34-saved-box')) return;
        const follow = document.querySelector('.s34-follow-box');
        if (!follow) return;
        const box = document.createElement('div');
        box.className = 's34-follow-box s34-saved-box';
        // (a row is a plain link to its search; ✕ removes it, with Undo;
        // Manage opens the Manage window)
        box.addEventListener('click', e => {
            const x = e.target.closest('[data-ss-x]');
            if (x) { e.preventDefault(); toggleSavedSearch(x.dataset.ssX); return; }
            // (Beta 3.15) a row opens the Following window on that search - like an artist
            const row = e.target.closest('[data-ss]');
            if (row && e.button === 0 && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
                // (Beta 3.16) here as the posts page, or in the Following window - as set, or asked
                const mode = CONFIG.savedSearchOpen;
                if (mode === 'page') return; // (the row is a link to the search)
                e.preventDefault();
                if (mode === 'window') openFollowPopup(fwKeySearch(row.dataset.ss));
                else askSavedSearchOpen(row);
                return;
            }
            const t = e.target.closest('[data-fb="manage"]');
            if (!t) return;
            e.preventDefault();
            openFollowingWindow();
        });
        follow.after(box);
        renderSavedBox();
    }

    function renderSavedBox() {
        const box = document.querySelector('.s34-saved-box');
        if (!box) return;
        const list = getSavedSearches();
        box.hidden = !list.length; // (appears with the first saved search)
        if (!list.length) { box.innerHTML = ''; return; }
        const here = isPostView ? '' : normQuery(tagsFromUrl(location.href)); // (the search you're on)
        box.innerHTML = `<div class="s34-follow-head">${DISK_SVG}<b>Saved searches</b><a href="#" data-fb="manage">Manage</a></div>` +
            list.map(s => {
                const badge = s.count ? `<small class="s34-has-new">${s.count}${s.more ? '+' : ''} new</small>` : '';
                const open = fwState && fwState.key === fwKeySearch(s.query);
                return `<div class="s34-saved-item"><a href="${escapeHtml(plainSearchUrl(s.query))}" class="s34-follow-row s34-saved-row${open || (here && sameQuery(here, s.query)) ? ' s34-on' : ''}" data-ss="${escapeHtml(s.query)}" title="${escapeHtml(s.query)} – opens in the Following window (Ctrl + click: the search itself)"><span>${escapeHtml(searchLabel(s))}</span>${badge}</a>` +
                    `<button type="button" class="s34-saved-x" data-ss-x="${escapeHtml(s.query)}" title="Remove from your saved searches" aria-label="Remove ${escapeHtml(searchLabel(s))} from your saved searches">✕</button></div>`;
            }).join('');
    }

    // ---- Background: new posts per saved search (part of checkFollowing) ----
    async function checkSavedSearches(force) {
        const queries = getSavedSearches().filter(s => searchCountable(s.query)).map(s => s.query);
        for (let i = 0; i < queries.length; i++) {
            if (cloudflarePaused()) break;
            // (through the API with a key - else the normal page; see postsForCounting in 20c)
            let got;
            try { got = await postsForCounting(queries[i], force); }
            catch (e) { break; } // a Cloudflare check: the rest waits
            if (!got) continue;
            const ids = got.posts.map(p => p.id).filter(Boolean);
            const max = ids.length ? Math.max(...ids) : 0;
            const list = getSavedSearches(); // fresh
            const s = findSavedSearch(queries[i], list);
            if (!s) continue;
            if (!s.seen) { s.seen = max; s.count = 0; } // first look: "new" starts after what's there now
            else s.count = ids.filter(id => id > s.seen).length;
            s.more = s.count > 0 && s.count === ids.length && got.full;
            s.latest = Math.max(s.latest || 0, max);
            if (got.posts.length) s.pic = got.posts[0].pic || s.pic;
            saveSavedSearches(list);
            renderSavedBox();
            if (i < queries.length - 1) await pause(1500);
        }
        fwRefresh();
        updateTabBadge();
    }

    // A normal search that is a saved one (first page): NEW on what came
    // out since last time, then its newest post is "seen"
    function setupSavedSearchPage() {
        if (isPostView || !onFirstResultsPage()) return;
        const q = normQuery(tagsFromUrl(location.href));
        if (!q || !searchCountable(q)) return;
        const list = getSavedSearches();
        const s = findSavedSearch(q, list);
        if (!s) return;
        const seenBefore = s.seen || 0;
        const thumbs = allThumbs();
        let n = 0;
        if (seenBefore) thumbs.forEach(t => {
            if ((parseInt(thumbPostId(t), 10) || 0) > seenBefore && !t.querySelector('.s34-new-badge')) {
                const b = document.createElement('span');
                b.className = 's34-new-badge';
                b.textContent = 'NEW';
                t.appendChild(b);
                n++;
            }
        });
        const max = pageMaxPostId();
        if (max) { s.seen = Math.max(s.seen || 0, max); s.latest = Math.max(s.latest || 0, max); }
        s.count = 0; s.more = false;
        saveSavedSearches(list);
        renderSavedBox();
        updateTabBadge();
        if (n) showToast(`${n} new post${n === 1 ? '' : 's'} in "${searchLabel(s)}" since your last visit (marked NEW).`);
    }
