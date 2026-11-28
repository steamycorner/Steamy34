    // =================================================================
    //  THEATER MODE, COLLECTIONS, DOWNLOAD TAGS, STATS
    // =================================================================

    const THEATER_KEY = 'steamy34_theater';
    const THEATER_SVG = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5"/><path d="M20 9V4h-5"/><path d="M4 15v5h5"/><path d="M20 15v5h-5"/></svg>';
    const THEATER_EXIT_SVG = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4v5H4"/><path d="M15 4v5h5"/><path d="M9 20v-5H4"/><path d="M15 20v-5h5"/></svg>';
    const FOLDER_SVG = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M3 6.5A1.5 1.5 0 0 1 4.5 5H9l2 2.5h8.5A1.5 1.5 0 0 1 21 9v9.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5z"/></svg>';
    const STATS_SVG = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M5 20V12"/><path d="M12 20V5"/><path d="M19 20v-9"/></svg>';

    // ---- Theater mode: the popup without its sidebar ----
    function setTheater(on, overlay) {
        overlay = overlay || (popupState && popupState.overlay);
        if (!overlay) return;
        overlay.classList.toggle('s34-pv-theater', on);
        GM_setValue(THEATER_KEY, on);
    }

    function popupThumbSrc(state) {
        const img = state && state.thumb && state.thumb.querySelector('img');
        return img ? (img.getAttribute('src') || img.dataset.s34Src || '') : '';
    }

    // ---- A window in the same style as the blacklist window ----
    function openWindow({ cls, icon, title, width }) {
        const overlay = document.createElement('div');
        overlay.className = 's34-overlay s34-win-overlay ' + (cls || '');
        overlay.innerHTML = `
            <div class="s34-win" role="dialog" aria-modal="true">
                <div class="s34-win-head">
                    <div class="s34-win-icon">${icon}</div>
                    <div class="s34-win-heading">
                        <div class="s34-win-title"></div>
                        <div class="s34-win-sub"></div>
                    </div>
                    <button type="button" class="s34-win-close" title="Close (Esc)">✕</button>
                </div>
                <div class="s34-win-body"></div>
            </div>`;
        const win = overlay.querySelector('.s34-win');
        if (width) win.style.width = `min(${width}px, calc(100vw - 32px))`;
        overlay.querySelector('.s34-win-title').textContent = title;
        const api = {
            overlay,
            body: overlay.querySelector('.s34-win-body'),
            setTitle: t => { overlay.querySelector('.s34-win-title').textContent = t; },
            setSub: t => { overlay.querySelector('.s34-win-sub').textContent = t; },
            onClose: null,
            close() {
                document.removeEventListener('keydown', onKey, true);
                overlay.remove();
                if (api.onClose) api.onClose();
            }
        };
        function onKey(e) {
            if (e.key !== 'Escape' || document.querySelector('.s34-tips-overlay, .s34-cmenu')) return;
            if (overlay.classList.contains('s34-under-popup') || e.defaultPrevented) return; // the popup on top closes first
            e.preventDefault();
            e.stopPropagation();
            api.close();
        }
        overlay.querySelector('.s34-win-close').addEventListener('click', () => api.close());
        overlay.addEventListener('mousedown', e => { if (e.target === overlay) api.close(); });
        document.addEventListener('keydown', onKey, true);
        document.body.appendChild(overlay);
        return api;
    }

    function postPageUrl(id) {
        return location.origin + '/index.php?page=post&s=view&id=' + encodeURIComponent(id);
    }

    // src: one picture or a list to try in order; onFail: called when none loads
    function thumbOrPlaceholder(src, id, fallback, onFail) {
        const box = document.createElement('div');
        box.className = 's34-tile-img';
        const tries = [].concat(src || [], fallback || []).filter(Boolean);
        if (tries.length) {
            const img = new Image();
            img.loading = 'lazy';
            img.alt = '';
            let n = 0;
            img.src = tries[n];
            img.addEventListener('error', () => {
                if (++n < tries.length) { img.src = tries[n]; return; }
                img.remove();
                box.textContent = '#' + id;
                if (onFail) onFail();
            });
            box.appendChild(img);
        } else {
            box.textContent = '#' + id;
        }
        return box;
    }

    // ---- Download any post by its id (collections) ----
    async function downloadPostById(id, thumb) {
        const url = postPageUrl(id);
        const doc = await fetchPostDoc(url, 'batch');
        if (!doc) return false;
        const media = await getPostMedia(url, 'batch');
        const file = media && (media.video || media.image);
        if (!file) return false;
        const g = readPostTags(doc);
        const names = k => (g[k] || []).map(x => x.tag);
        const tags = { copyright: names('copyright'), character: names('character'), artist: names('artist') };
        const ok = await saveUrlAs(file, buildFilename(file, tags, readPostSize(doc), id), url, { artist: (tags.artist || [])[0] });
        if (ok) rememberDownload(id, { thumb, tags });
        return ok;
    }

    // ---- Download tags (newest first; post, tags, time) - for Stats ----
    const DLHIST_KEY = 'steamy34_dlhistory';
    const DLHIST_LIMIT = 3000;

    function getDlHistory() {
        try {
            const v = GM_getValue(DLHIST_KEY, []);
            return Array.isArray(v) ? v : [];
        } catch (e) { return []; }
    }

    // Only the tags of each download are kept - Stats builds its
    // "top artists / characters / series" from them
    function addDlHistory(id, info) {
        if (!id) return;
        const list = getDlHistory().filter(h => h.id !== id);
        const tags = (info && info.tags) || {};
        list.unshift({
            id,
            time: Date.now(),
            artist: (tags.artist || []).slice(0, 5),
            character: (tags.character || []).slice(0, 5),
            copyright: (tags.copyright || []).slice(0, 5)
        });
        GM_setValue(DLHIST_KEY, list.slice(0, DLHIST_LIMIT));
        updateHubCounts();
    }

    // Older versions also stored preview pictures here (for the removed
    // download history window) - drop them, keep only what Stats needs
    function trimDlHistory() {
        const list = getDlHistory();
        if (!list.some(h => h.thumb || h.fallback || h.checked)) return;
        GM_setValue(DLHIST_KEY, list.map(h => ({
            id: h.id, time: h.time, artist: h.artist || [], character: h.character || [], copyright: h.copyright || []
        })));
    }

    // ---- Your stats ----
    function countTop(lists, n) {
        const c = new Map();
        lists.forEach(list => (list || []).forEach(t => c.set(t, (c.get(t) || 0) + 1)));
        return Array.from(c.entries()).sort((a, b) => b[1] - a[1]).slice(0, n);
    }

    function openStatsWindow() {
        if (document.querySelector('.s34-stats-overlay')) return;
        const w = openWindow({ cls: 's34-stats-overlay', icon: STATS_SVG, title: 'Your stats', width: 700 });
        const hist = getDlHistory();
        const downloadedMap = loadDownloaded();
        const viewedMap = loadViewed();
        const favs = getFavs();
        const colls = getCollections();
        const times = [].concat(Object.values(downloadedMap), Object.values(viewedMap)).filter(Boolean);
        const since = times.length ? Math.min(...times) : 0;

        const tiles = [
            ['Downloaded', Object.keys(downloadedMap).length],
            ['Viewed', Object.keys(viewedMap).length],
            ['Favourites', Object.keys(favs).length],
            ['In collections', colls.reduce((s, c) => s + c.posts.length, 0)],
            ['Blacklisted tags', readBlocklist().length],
            ['Following', getFollowing().artists.length]
        ];
        w.setSub(since ? 'Since ' + new Date(since).toLocaleDateString() + ' · only on this computer' : 'Only on this computer');

        // Last 14 days: views and downloads per day
        const days = [];
        const dayStart = d => { const x = new Date(d); x.setHours(0, 0, 0, 0); return x.getTime(); };
        const today = dayStart(Date.now());
        for (let i = 13; i >= 0; i--) days.push({ t: today - i * 86400000, v: 0, d: 0 });
        const bump = (map, key) => Object.values(map).forEach(t => {
            const day = days.find(x => x.t === dayStart(t));
            if (day) day[key]++;
        });
        bump(viewedMap, 'v');
        bump(downloadedMap, 'd');
        const maxDay = Math.max(1, ...days.map(x => Math.max(x.v, x.d)));

        const top = (title, key) => {
            const list = countTop(hist.map(h => h[key]), 8);
            const max = list.length ? list[0][1] : 1;
            return `<div class="s34-stat-top">
                <div class="s34-stat-label">${title}</div>
                ${list.length ? list.map(([t, n]) => `
                    <div class="s34-stat-bar s34-blm-${key}">
                        <span class="s34-stat-name"></span>
                        <span class="s34-stat-track"><i style="width:${Math.round(n / max * 100)}%"></i></span>
                        <b>${n}</b>
                    </div>`).join('') : '<div class="s34-win-empty">Nothing yet</div>'}
            </div>`;
        };

        w.body.innerHTML = `
            <div class="s34-stat-tiles">
                ${tiles.map(([label, n]) => `<div class="s34-stat-tile"><b>${n.toLocaleString()}</b><span>${label}</span></div>`).join('')}
            </div>
            <div class="s34-stat-label">Last 14 days</div>
            <div class="s34-stat-chart">
                ${days.map(x => `
                    <div class="s34-stat-day" title="${new Date(x.t).toLocaleDateString()}: ${x.v} viewed, ${x.d} downloaded">
                        <div class="s34-stat-cols">
                            <i class="s34-stat-v" style="height:${Math.round(x.v / maxDay * 100)}%"></i>
                            <i class="s34-stat-d" style="height:${Math.round(x.d / maxDay * 100)}%"></i>
                        </div>
                        <span>${new Date(x.t).getDate()}</span>
                    </div>`).join('')}
            </div>
            <div class="s34-stat-legend"><span class="s34-stat-v"></span> viewed <span class="s34-stat-d"></span> downloaded</div>
            <div class="s34-stat-tops">
                ${top('Top artists', 'artist')}
                ${top('Top characters', 'character')}
                ${top('Top series', 'copyright')}
            </div>
            <div class="s34-win-note">Top lists count your downloads${hist.length ? '' : ' (they fill up as you download)'}.</div>`;
        // Tag names as text (never as HTML)
        ['artist', 'character', 'copyright'].forEach((key, i) => {
            const list = countTop(hist.map(h => h[key]), 8);
            w.body.querySelectorAll('.s34-stat-top')[i].querySelectorAll('.s34-stat-name')
                .forEach((el, j) => { el.textContent = prettyTag(list[j][0]); });
        });
    }

    // ---- Local collections (your own folders, only on this computer) ----
    const COLL_KEY = 'steamy34_collections';

    function getCollections() {
        try {
            const v = GM_getValue(COLL_KEY, []);
            return Array.isArray(v) ? v.filter(c => c && c.id && Array.isArray(c.posts)) : [];
        } catch (e) { return []; }
    }

    function saveCollections(list) {
        GM_setValue(COLL_KEY, list);
        updateHubCounts();
        try { refreshCollThumbButtons(); } catch (e) {}
    }

    // (Beta 3.13) Collections set to "Out once downloaded" (e.g. a "Download later"
    // list) let go of posts as soon as they're downloaded - with Undo
    function dropDownloadedFromCollections(ids) {
        const want = new Set(ids.map(String));
        const all = getCollections();
        const gone = [];
        all.forEach(c => {
            if (!c.dropOnDownload) return;
            for (let i = c.posts.length - 1; i >= 0; i--) {
                if (want.has(String(c.posts[i].id))) { gone.push({ col: c.id, name: c.name, index: i, entry: c.posts[i] }); c.posts.splice(i, 1); }
            }
        });
        if (!gone.length) return;
        saveCollections(all);
        const names = Array.from(new Set(gone.map(g => g.name)));
        showToast(`Downloaded – taken out of ${names.length === 1 ? '"' + names[0] + '"' : names.length + ' collections'}.`, 'Undo', () => {
            const again = getCollections();
            gone.slice().reverse().forEach(g => {
                const c = again.find(x => x.id === g.col);
                if (c && !c.posts.some(p => String(p.id) === String(g.entry.id))) c.posts.splice(Math.min(g.index, c.posts.length), 0, g.entry);
            });
            saveCollections(again);
        }, 9000);
    }

    function createCollection(name) {
        const list = getCollections();
        const c = { id: 'c' + Date.now().toString(36), name: name.trim().slice(0, 60) || 'New collection', created: Date.now(), posts: [] };
        list.push(c);
        saveCollections(list);
        return c;
    }

    // Small menu: tick collections for one post, or add several posts at once
    // (Beta 3.13) The collection button adds straight away when there's only one
    // collection (or, if chosen, to the one used last) - opts.menu: always the list
    const COLL_LAST_KEY = 'steamy34_coll_last';
    function oneClickCollection() {
        const list = getCollections();
        if (CONFIG.collectOneClick === 'off' || !list.length) return null;
        if (list.length === 1) return list[0];
        if (CONFIG.collectOneClick !== 'last') return null;
        let last = '';
        try { last = GM_getValue(COLL_LAST_KEY, ''); } catch (e) {}
        return list.find(c => c.id === last) || null;
    }
    function rememberLastCollection(id) { try { GM_setValue(COLL_LAST_KEY, id); } catch (e) {} }
    function quickCollect(anchor, c, p) {
        const all = getCollections();
        const col = all.find(x => x.id === c.id);
        if (!col) return;
        const has = col.posts.some(x => String(x.id) === String(p.id));
        if (has) {
            const at = col.posts.findIndex(x => String(x.id) === String(p.id));
            const [entry] = col.posts.splice(at, 1);
            saveCollections(all);
            showToast(`Removed from "${col.name}".`, 'Undo', () => {
                const again = getCollections();
                const cc = again.find(x => x.id === c.id);
                if (cc && !cc.posts.some(x => String(x.id) === String(p.id))) { cc.posts.splice(Math.min(at, cc.posts.length), 0, entry); saveCollections(again); }
            });
        } else {
            col.posts.unshift(Object.assign({ id: p.id, thumb: p.thumb || '', time: Date.now() }, p.tags ? { tags: String(p.tags).slice(0, 2000) } : {}));
            saveCollections(all);
            setTimeout(() => collectionsAdded([p.id]), 0);
            showToast(`Saved to "${col.name}".`, 'Other collection…', () => openCollectMenu(anchor, [p], { menu: true }));
        }
        rememberLastCollection(col.id);
        try { stylePopupExtras(); } catch (e) {}
    }

    function openCollectMenu(anchor, posts, opts = {}) {
        // (Beta 3.9.6) the same button again closes it
        const open = document.querySelector('.s34-cmenu');
        if (open && open._anchor === anchor) { open.remove(); return; }
        if (!opts.menu && posts.length === 1 && posts[0].id) {
            const target = oneClickCollection();
            if (target) { quickCollect(anchor, target, posts[0]); return; }
        }
        document.querySelectorAll('.s34-cmenu').forEach(m => m.remove());
        const single = posts.length === 1;
        const menu = document.createElement('div');
        menu.className = 's34-cmenu';
        menu._anchor = anchor;

        function render() {
            menu.replaceChildren();
            const head = document.createElement('div');
            head.className = 's34-cmenu-head';
            head.textContent = single ? 'Save to collection' : `Add ${posts.length} posts to…`;
            menu.appendChild(head);
            const list = getCollections();
            if (!list.length) {
                const e = document.createElement('div');
                e.className = 's34-cmenu-empty';
                e.textContent = 'No collections yet – make your first one:';
                menu.appendChild(e);
            }
            list.forEach(c => {
                const has = single && c.posts.some(p => p.id === posts[0].id);
                const b = document.createElement('button');
                b.type = 'button';
                b.className = 's34-cmenu-item' + (has ? ' s34-on' : '');
                b.innerHTML = `<span class="s34-cmenu-check">${has ? '✓' : ''}</span><span class="s34-cmenu-name"></span><span class="s34-cmenu-n">${c.posts.length}</span>`;
                b.querySelector('.s34-cmenu-name').textContent = c.name;
                b.addEventListener('click', () => {
                    const all = getCollections();
                    const col = all.find(x => x.id === c.id);
                    if (!col) return;
                    if (single && has) {
                        col.posts = col.posts.filter(p => p.id !== posts[0].id);
                        showToast(`Removed from "${col.name}".`);
                    } else {
                        let added = 0;
                        const addedIds = [];
                        posts.forEach(p => {
                            if (p.id && !col.posts.some(x => x.id === p.id)) {
                                col.posts.unshift(Object.assign({ id: p.id, thumb: p.thumb || '', time: Date.now() }, p.tags ? { tags: String(p.tags).slice(0, 2000) } : {}));
                                added++;
                                addedIds.push(p.id);
                            }
                        });
                        setTimeout(() => collectionsAdded(addedIds), 0); // (after saving below)
                        showToast(added ? `Saved ${added === 1 ? '' : added + ' posts '}to "${col.name}".` : `Already in "${col.name}".`);
                    }
                    saveCollections(all);
                    rememberLastCollection(col.id);
                    if (single) render(); else menu.remove();
                });
                menu.appendChild(b);
            });
            const add = document.createElement('div');
            add.className = 's34-cmenu-new';
            add.innerHTML = '<input type="text" placeholder="New collection…" maxlength="60"><button type="button">Create</button>';
            const input = add.querySelector('input');
            const create = () => {
                if (!input.value.trim()) { input.focus(); return; }
                const c = createCollection(input.value);
                const all = getCollections();
                const col = all.find(x => x.id === c.id);
                posts.forEach(p => { if (p.id) col.posts.unshift(Object.assign({ id: p.id, thumb: p.thumb || '', time: Date.now() }, p.tags ? { tags: String(p.tags).slice(0, 2000) } : {})); });
                saveCollections(all);
                collectionsAdded(posts.map(p => p.id).filter(Boolean));
                rememberLastCollection(col.id);
                showToast(`Made "${col.name}" and saved ${posts.length === 1 ? 'the post' : posts.length + ' posts'}.`);
                if (single) render(); else menu.remove();
            };
            add.querySelector('button').addEventListener('click', create);
            input.addEventListener('keydown', e => {
                e.stopPropagation(); // typing doesn't trigger hotkeys
                if (e.key === 'Enter') { e.preventDefault(); create(); }
                if (e.key === 'Escape') menu.remove();
            });
            menu.appendChild(add);
        }
        render();
        document.body.appendChild(menu);
        // Next to the button, kept on screen
        const r = anchor.getBoundingClientRect();
        const mw = menu.offsetWidth, mh = menu.offsetHeight;
        let left = Math.min(r.left, window.innerWidth - mw - 8);
        let top = r.bottom + 6;
        if (top + mh > window.innerHeight - 8) top = Math.max(8, r.top - mh - 6);
        menu.style.left = Math.max(8, left) + 'px';
        menu.style.top = top + 'px';
        const off = e => {
            if (!menu.isConnected) { document.removeEventListener('mousedown', off, true); return; }
            if (!menu.contains(e.target) && !anchor.contains(e.target)) {
                menu.remove();
                document.removeEventListener('mousedown', off, true);
            }
        };
        setTimeout(() => document.addEventListener('mousedown', off, true), 0);
    }

    // (Beta 3.9.1) A tile whose known tags are blacklisted: covered, "Show" uncovers it
    function coverBlockedTile(tile, link, hit, onShow) {
        tile.classList.add('s34-tile-bl');
        const box = link.querySelector('.s34-tile-img') || link;
        const cover = document.createElement('div');
        cover.className = 's34-tile-blcover';
        cover.innerHTML = '<span></span><button type="button">Show</button>';
        cover.querySelector('span').textContent = 'Blacklisted: ' + hit.slice(0, 3).map(t => t.replace(/_/g, ' ')).join(', ');
        cover.querySelector('button').addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); onShow(); });
        box.appendChild(cover);
        // a covered post doesn't open - except its own "Show" button works
        link.addEventListener('click', e => {
            if (!tile.classList.contains('s34-tile-bl') || (e.target.closest && e.target.closest('.s34-tile-blcover button'))) return;
            e.preventDefault(); e.stopImmediatePropagation();
        }, true);
    }
    function uncoverTile(tile) {
        tile.classList.remove('s34-tile-bl');
        const c = tile.querySelector('.s34-tile-blcover');
        if (c) c.remove();
    }
    // The "Show blacklisted (N)" switch in a window's tool bar
    function blacklistToggle(bar, count, on, onChange) {
        if (!count) return null;
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 's34-bl-toggle' + (on ? ' s34-on' : '');
        b.textContent = (on ? 'Hide' : 'Show') + ' blacklisted (' + count + ')';
        b.title = 'Posts with a blacklisted tag – you saved them yourself, so you decide';
        b.addEventListener('click', () => onChange(!on));
        const grow = bar.querySelector('.s34-grow');
        if (grow) grow.after(b); else bar.appendChild(b);
        return b;
    }

    function openCollectionsWindow(openId) {
        if (document.querySelector('.s34-coll-overlay')) return;
        const w = openWindow({ cls: 's34-coll-overlay', icon: FOLDER_SVG, title: 'Collections', width: 820 });
        let current = openId || null;
        let downloading = null; // { stop }
        let showBlocked = false;              // (Beta 3.9.1) "Show blacklisted (N)"
        const shownNow = new Set();           // single posts uncovered with "Show"
        checkFavouritesElsewhere(15 * 60000); // posts un-favourited on another device leave their collections

        function renderList() {
            current = null;
            w.setTitle('Collections');
            const list = getCollections();
            const where = CONFIG.collectionsSync ? 'on all your devices (as favourites)' : 'only on this device';
            w.setSub(list.length ? `${list.length} collection${list.length === 1 ? '' : 's'} · ${where}` : 'Your own folders for posts – ' + where);
            w.body.replaceChildren();
            if (!collSyncAsked()) w.body.appendChild(buildCollSyncCard(renderList));
            const grid = document.createElement('div');
            grid.className = 's34-coll-grid';
            list.forEach(c => {
                const card = document.createElement('button');
                card.type = 'button';
                card.className = 's34-coll-card';
                const cover = document.createElement('div');
                cover.className = 's34-coll-cover';
                const blSet = blockedTagSet();
                const clean = c.posts.filter(p => !(p.tags && blockedTagsOf(p.tags, blSet).length));
                // (Beta 3.10) a chosen cover fills the card; otherwise the first four
                const chosen = c.cover && clean.find(p => String(p.id) === String(c.cover) && p.thumb);
                (chosen ? [chosen] : clean.slice(0, 4)).forEach(p => { if (p.thumb) { const i = new Image(); i.src = p.thumb; i.alt = ''; i.loading = 'lazy'; cover.appendChild(i); } });
                if (!cover.childElementCount) { cover.innerHTML = (c.id === LATER_ID ? CLOCK_SVG : FOLDER_SVG) + '<span>Empty</span>'; cover.classList.add('s34-coll-cover-empty'); }
                cover.classList.toggle('s34-coll-cover-n' + Math.min(4, cover.querySelectorAll('img').length), true);
                const name = document.createElement('div');
                name.className = 's34-coll-name';
                name.textContent = c.name;
                const n = document.createElement('div');
                n.className = 's34-coll-n';
                n.textContent = c.posts.length + (c.posts.length === 1 ? ' post' : ' posts');
                card.append(cover, name, n);
                if (c.note) {
                    const note = document.createElement('div');
                    note.className = 's34-coll-notep';
                    note.textContent = c.note;
                    card.appendChild(note);
                }
                card.addEventListener('click', () => renderOne(c.id));
                grid.appendChild(card);
            });
            // New collection card
            const add = document.createElement('div');
            add.className = 's34-coll-card s34-coll-new';
            add.innerHTML = '<button type="button" class="s34-coll-newbtn"><span class="s34-coll-plus">+</span>New collection</button>'
                + '<div class="s34-coll-newform" hidden><input type="text" placeholder="Name…" maxlength="60"><button type="button" class="s34-coll-create">Create</button></div>';
            const input = add.querySelector('input');
            add.querySelector('.s34-coll-newbtn').addEventListener('click', () => {
                add.querySelector('.s34-coll-newbtn').hidden = true;
                add.querySelector('.s34-coll-newform').hidden = false;
                input.focus();
            });
            const create = () => {
                if (!input.value.trim()) { input.focus(); return; }
                createCollection(input.value);
                renderList();
            };
            add.querySelector('.s34-coll-create').addEventListener('click', create);
            input.addEventListener('keydown', e => { e.stopPropagation(); if (e.key === 'Enter') create(); if (e.key === 'Escape') w.close(); });
            grid.appendChild(add);
            w.body.appendChild(grid);
            if (!list.length) {
                const hint = document.createElement('div');
                hint.className = 's34-win-note';
                hint.textContent = 'Save posts with the Collection button in the popup or on a post page – or tick several with Batch download and use "Add to collection".';
                w.body.appendChild(hint);
            }
        }

        function renderOne(id) {
            const c = getCollections().find(x => x.id === id);
            if (!c) { renderList(); return; }
            current = id;
            w.setTitle(c.name);
            w.setSub(`${c.posts.length} post${c.posts.length === 1 ? '' : 's'} · collection`);
            w.body.replaceChildren();
            const bar = document.createElement('div');
            bar.className = 's34-win-tools';
            bar.classList.add('s34-coll-bar');
            bar.innerHTML = `
                <button type="button" data-a="back" class="s34-coll-back" title="All collections">←</button>
                <select class="s34-coll-sort" title="Order of the posts">
                    <option value="mine">${thumbButtonsHidden() ? 'My order (hold a post, then drag)' : 'My order (drag to arrange)'}</option>
                    <option value="new">Newest added first</option>
                    <option value="old">Oldest added first</option>
                    <option value="idhi">Post number, high → low</option>
                    <option value="idlo">Post number, low → high</option>
                </select>
                <label class="s34-coll-dropdl" title="Posts leave this collection as soon as you download them (or mark them as downloaded) – e.g. for a &quot;Download later&quot; list"><input type="checkbox"> Out once downloaded</label>
                <span class="s34-grow"></span>
                <div class="s34-coll-morewrap">
                    <button type="button" data-a="more" class="s34-coll-more" title="Rename, tidy up, delete" aria-haspopup="true">⋯</button>
                    <div class="s34-coll-menu" hidden>
                        <button type="button" data-a="rename">Rename</button>
                        <button type="button" data-a="dropdone" hidden></button>
                        <button type="button" data-a="delete" class="s34-coll-danger">Delete collection</button>
                    </div>
                </div>
                <button type="button" data-a="dl" class="s34-win-primary">⬇ Download all</button>`;
            bar.addEventListener('click', async e => {
                const a = e.target.closest('[data-a]');
                if (!a) return;
                const act = a.dataset.a;
                const menu = bar.querySelector('.s34-coll-menu');
                if (act === 'more') { menu.hidden = !menu.hidden; return; }
                if (menu) menu.hidden = true;
                if (act === 'back') { if (downloading) downloading.stop = true; renderList(); }
                else if (act === 'dropdone') {
                    const all = getCollections();
                    const col = all.find(x => x.id === id);
                    const before = col.posts.slice();
                    col.posts = col.posts.filter(p => !isDownloaded(p.id));
                    const n = before.length - col.posts.length;
                    saveCollections(all);
                    renderOne(id);
                    showToast(`Took ${n} downloaded post${n === 1 ? '' : 's'} out of "${col.name}".`, 'Undo', () => {
                        const again = getCollections();
                        const cc = again.find(x => x.id === id);
                        if (cc) { cc.posts = before; saveCollections(again); if (current === id) renderOne(id); }
                    }, 9000);
                }
                else if (act === 'rename') {
                    const name = prompt('New name for this collection:', c.name);
                    if (name === null || !name.trim()) return;
                    const all = getCollections();
                    all.find(x => x.id === id).name = name.trim().slice(0, 60);
                    saveCollections(all);
                    renderOne(id);
                } else if (act === 'delete') {
                    if (!confirm(`Delete the collection "${c.name}"? The posts themselves stay on rule34 – only this list is removed.`)) return;
                    saveCollections(getCollections().filter(x => x.id !== id));
                    renderList();
                } else if (act === 'dl') {
                    if (downloading) { downloading.stop = true; return; }
                    const posts = getCollections().find(x => x.id === id).posts.slice();
                    if (!posts.length) return;
                    downloading = { stop: false };
                    const status = w.body.querySelector('.s34-win-status');
                    a.textContent = '■ Stop';
                    let ok = 0, failed = 0;
                    const job = downloading;
                    const panel = openDownloadPanel(posts.length, 'Collection "' + c.name + '"', () => { job.stop = true; });
                    for (let i = 0; i < posts.length && !job.stop; i++) {
                        await panel.waitWhilePaused();
                        if (job.stop) break;
                        status.hidden = false;
                        status.textContent = `Downloading ${i + 1} / ${posts.length}…`;
                        panel.status(`Post ${i + 1} of ${posts.length}…`);
                        while (cloudflarePaused() && !job.stop) {
                            status.textContent = 'Paused – solve the Cloudflare check to continue';
                            panel.status(status.textContent);
                            await pause(2000);
                        }
                        if (job.stop) break;
                        const done = await downloadPostById(posts[i].id, posts[i].thumb);
                        if (done) ok++; else failed++;
                        panel.item(done);
                        if (i < posts.length - 1 && !job.stop) await pause(CONFIG.batchDelay);
                    }
                    const stopped = job.stop;
                    const sum = panel.finish(stopped);
                    downloading = null;
                    if (!w.overlay.isConnected) return;
                    a.textContent = '⬇ Download all';
                    status.textContent = sum;
                }
            });
            bar.addEventListener('focusout', e => { if (!bar.contains(e.relatedTarget)) { const m = bar.querySelector('.s34-coll-menu'); if (m) m.hidden = true; } });
            // (Beta 3.13) "Out once downloaded" + "Remove the N downloaded"
            const dropCb = bar.querySelector('.s34-coll-dropdl input');
            dropCb.checked = !!c.dropOnDownload;
            dropCb.addEventListener('change', () => {
                const all = getCollections();
                all.find(x => x.id === id).dropOnDownload = dropCb.checked || undefined;
                saveCollections(all);
                showToast(dropCb.checked ? `Posts leave "${c.name}" once they're downloaded.` : `Posts stay in "${c.name}" after downloading.`);
            });
            const doneN = CONFIG.trackDownloads ? c.posts.filter(p => isDownloaded(p.id)).length : 0;
            const dropBtn = bar.querySelector('[data-a="dropdone"]');
            if (doneN) { dropBtn.hidden = false; dropBtn.textContent = `Remove the ${doneN} downloaded`; dropBtn.title = 'Take every post you already downloaded out of this collection'; }
            // (Beta 3.10) order: your own (drag), by date added or by post number
            const sort = c.sort || 'mine';
            const sortSel = bar.querySelector('.s34-coll-sort');
            sortSel.value = sort;
            sortSel.addEventListener('change', () => {
                const all = getCollections();
                all.find(x => x.id === id).sort = sortSel.value;
                saveCollections(all);
                renderOne(id);
            });
            const shown = c.posts.slice();
            if (sort === 'new') shown.sort((a, b) => (b.time || 0) - (a.time || 0));
            else if (sort === 'old') shown.sort((a, b) => (a.time || 0) - (b.time || 0));
            else if (sort === 'idhi') shown.sort((a, b) => b.id - a.id);
            else if (sort === 'idlo') shown.sort((a, b) => a.id - b.id);
            // a note for the collection (saved as you type)
            const note = document.createElement('textarea');
            note.className = 's34-coll-note';
            note.rows = 1;
            note.maxLength = 500;
            note.placeholder = '✎ Add a note…';
            note.value = c.note || '';
            let noteTimer = null;
            const fitNote = () => { note.style.height = 'auto'; note.style.height = Math.min(140, note.scrollHeight + 2) + 'px'; };
            note.addEventListener('input', () => {
                fitNote();
                clearTimeout(noteTimer);
                noteTimer = setTimeout(() => {
                    const all = getCollections();
                    const col = all.find(x => x.id === id);
                    if (!col) return;
                    col.note = note.value.trim().slice(0, 500);
                    if (!col.note) delete col.note;
                    saveCollections(all);
                }, 400);
            });
            note.addEventListener('keydown', e => { e.stopPropagation(); if (e.key === 'Escape') note.blur(); });
            setTimeout(fitNote, 0);
            const status = document.createElement('div');
            status.className = 's34-win-status';
            status.hidden = true;
            const tiles = document.createElement('div');
            tiles.className = 's34-tiles' + (sort === 'mine' && shown.length > 1 ? ' s34-tiles-drag' : '');
            if (!c.posts.length) {
                const e = document.createElement('div');
                e.className = 's34-win-empty';
                e.textContent = 'Empty – save posts here with the Collection button.';
                tiles.appendChild(e);
            }
            // A post opens in the popup viewer on top, ← / → go through this
            // collection (Beta 3.6 - before, the post page in a new tab; Ctrl /
            // middle click still does that). The popup gets a small stand-in
            // thumbnail per post; picture or video is learned from the post page
            // the first time and kept with the post.
            const proxies = shown.map(p => {
                const s = document.createElement('span');
                s.className = 'thumb';
                s.innerHTML = '<a></a>';
                s.firstChild.href = postPageUrl(p.id);
                const im = new Image();
                im.alt = '';
                if (p.thumb) im.src = p.thumb;
                if (typeof p.video === 'boolean') { if (p.video) im.className = 'webm-thumb'; }
                else s.dataset.s34TypeUnknown = '1';
                s.firstChild.appendChild(im);
                s._s34OnType = isVideo => {
                    const all = getCollections();
                    const col = all.find(x => x.id === id);
                    const item = col && col.posts.find(x => x.id === p.id);
                    if (item && item.video !== isVideo) { item.video = isVideo; saveCollections(all); }
                };
                return s;
            });
            const list = { thumbs: () => proxies, state: () => 'done', more: () => {} };
            const blSet = blockedTagSet();
            const hitOf = p => (p.tags ? blockedTagsOf(p.tags, blSet) : []);
            const blCount = c.posts.filter(p => hitOf(p).length).length;
            blacklistToggle(bar, blCount, showBlocked, v => { showBlocked = v; renderOne(id); });
            let dragFrom = null;
            // move a post (in "My order") to a place in front of index "to"
            const movePost = (from, to) => {
                if (from < to) to--;
                if (to === from) { renderOne(id); return; }
                const all = getCollections();
                const col = all.find(x => x.id === id);
                const [moved] = col.posts.splice(from, 1);
                col.posts.splice(to, 0, moved);
                saveCollections(all);
                renderOne(id);
            };
            // (Beta 3.10.1) phones: hold a post for a moment, then drag it with the finger
            if (sort === 'mine' && shown.length > 1) {
                let hold = null, drag = null, start = null;
                const tileList = () => Array.from(tiles.querySelectorAll('.s34-tile'));
                const clearMarks = () => tiles.querySelectorAll('.s34-drop-before, .s34-drop-after').forEach(x => x.classList.remove('s34-drop-before', 's34-drop-after'));
                tiles.addEventListener('touchstart', e => {
                    const tile = e.target.closest('.s34-tile');
                    if (!tile || e.touches.length !== 1 || e.target.closest('.s34-tile-acts, .s34-tile-blcover')) return;
                    start = { x: e.touches[0].clientX, y: e.touches[0].clientY };
                    clearTimeout(hold);
                    hold = setTimeout(() => {
                        hold = null;
                        drag = { from: tileList().indexOf(tile), tile, over: null, after: false };
                        tile.classList.add('s34-dragging');
                        try { navigator.vibrate && navigator.vibrate(12); } catch (err) {}
                    }, 380);
                }, { passive: true });
                tiles.addEventListener('touchmove', e => {
                    const t = e.touches[0];
                    if (!drag) {
                        if (hold && start && Math.abs(t.clientX - start.x) + Math.abs(t.clientY - start.y) > 10) { clearTimeout(hold); hold = null; }
                        return;
                    }
                    e.preventDefault(); // (the finger moves the post, not the page)
                    const el = document.elementFromPoint(t.clientX, t.clientY);
                    const over = el && el.closest && el.closest('.s34-tile');
                    clearMarks();
                    drag.over = over && over !== drag.tile && tiles.contains(over) ? over : null;
                    if (drag.over) {
                        const r = drag.over.getBoundingClientRect();
                        drag.after = t.clientX > r.left + r.width / 2;
                        drag.over.classList.add(drag.after ? 's34-drop-after' : 's34-drop-before');
                    }
                    // near the top / bottom edge: the list scrolls along
                    const sc = w.body;
                    const br = sc.getBoundingClientRect();
                    if (t.clientY < br.top + 60) sc.scrollTop -= 14;
                    else if (t.clientY > br.bottom - 60) sc.scrollTop += 14;
                }, { passive: false });
                const end = e => {
                    clearTimeout(hold); hold = null;
                    if (!drag) return;
                    const d = drag; drag = null;
                    d.tile.classList.remove('s34-dragging');
                    clearMarks();
                    if (e.cancelable) e.preventDefault(); // (no tap on the post afterwards)
                    tiles._s34NoClick = Date.now();
                    if (e.type === 'touchend' && d.over) movePost(d.from, tileList().indexOf(d.over) + (d.after ? 1 : 0));
                };
                tiles.addEventListener('touchend', end);
                tiles.addEventListener('touchcancel', end);
                tiles.addEventListener('click', e => { if (Date.now() - (tiles._s34NoClick || 0) < 600) { e.preventDefault(); e.stopPropagation(); } }, true);
                tiles.addEventListener('contextmenu', e => { if (e.target.closest('.s34-tile')) e.preventDefault(); });
            }
            shown.forEach((p, n) => {
                const tile = document.createElement('div');
                tile.className = 's34-tile' + (String(c.cover) === String(p.id) ? ' s34-tile-iscover' : '');
                // (Beta 3.10) drag to arrange (in "My order")
                if (sort === 'mine' && shown.length > 1) {
                    tile.draggable = true;
                    tile.addEventListener('dragstart', e => { dragFrom = n; tile.classList.add('s34-dragging'); try { e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', String(p.id)); } catch (err) {} });
                    tile.addEventListener('dragend', () => { tile.classList.remove('s34-dragging'); tiles.querySelectorAll('.s34-drop-before, .s34-drop-after').forEach(x => x.classList.remove('s34-drop-before', 's34-drop-after')); });
                    tile.addEventListener('dragover', e => {
                        if (dragFrom === null) return;
                        e.preventDefault();
                        const r = tile.getBoundingClientRect();
                        const after = e.clientX > r.left + r.width / 2;
                        tiles.querySelectorAll('.s34-drop-before, .s34-drop-after').forEach(x => { if (x !== tile) x.classList.remove('s34-drop-before', 's34-drop-after'); });
                        tile.classList.toggle('s34-drop-after', after);
                        tile.classList.toggle('s34-drop-before', !after);
                    });
                    tile.addEventListener('drop', e => {
                        if (dragFrom === null) return;
                        e.preventDefault();
                        const after = tile.classList.contains('s34-drop-after');
                        const from = dragFrom;
                        dragFrom = null;
                        movePost(from, n + (after ? 1 : 0));
                    });
                }
                const link = document.createElement('a');
                link.href = postPageUrl(p.id);
                link.target = '_blank';
                link.rel = 'noopener';
                link.title = 'Open the post (Ctrl + click: the post page in a new tab)';
                link.addEventListener('click', e => {
                    if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
                    e.preventDefault();
                    w.overlay.classList.add('s34-under-popup'); // steps aside until the popup closes
                    openPopup(proxies[n], list);
                });
                link.appendChild(thumbOrPlaceholder(p.thumb, p.id));
                link.draggable = false;
                link.querySelectorAll('img').forEach(i => { i.draggable = false; });
                const cap = document.createElement('div');
                cap.className = 's34-tile-cap';
                cap.innerHTML = '<div class="s34-tile-title"></div><div class="s34-tile-sub"></div>';
                cap.firstChild.textContent = '#' + p.id;
                cap.lastChild.textContent = 'added ' + timeAgo(p.time);
                const acts = document.createElement('div');
                acts.className = 's34-tile-acts';
                const rm = document.createElement('button');
                rm.type = 'button';
                rm.textContent = '×';
                rm.title = 'Remove from this collection';
                rm.addEventListener('click', () => {
                    const all = getCollections();
                    const col = all.find(x => x.id === id);
                    col.posts = col.posts.filter(x => x.id !== p.id);
                    saveCollections(all);
                    renderOne(id);
                });
                // (Beta 3.10) this post as the collection's cover
                const cv = document.createElement('button');
                cv.type = 'button';
                cv.className = 's34-tile-cover' + (String(c.cover) === String(p.id) ? ' s34-on' : '');
                cv.textContent = '★';
                cv.title = String(c.cover) === String(p.id) ? 'The cover – click to go back to the first four posts' : 'Use as the collection\'s cover';
                cv.addEventListener('click', () => {
                    const all = getCollections();
                    const col = all.find(x => x.id === id);
                    if (String(col.cover) === String(p.id)) delete col.cover; else col.cover = p.id;
                    saveCollections(all);
                    renderOne(id);
                });
                acts.append(cv, rm);
                tile.append(link, cap, acts);
                const hit = hitOf(p);
                if (hit.length && !showBlocked && !shownNow.has(p.id)) coverBlockedTile(tile, link, hit, () => { shownNow.add(p.id); uncoverTile(tile); });
                tiles.appendChild(tile);
            });
            w.body.append(bar, note, status, tiles);
        }

        w.onClose = () => { if (downloading) downloading.stop = true; };
        if (current) renderOne(current); else renderList();
    }

    // ---- Sidebar: Collections · Stats ----
    function updateHubCounts() {
        const hub = document.querySelector('.s34-hub');
        if (!hub) return;
        const n = getCollections().length;
        hub.querySelector('[data-hub="coll"] small').textContent = n ? n + (n === 1 ? ' folder' : ' folders') : 'none yet';
        updateDownloadsCount();
    }

    function addHub() {
        if (document.querySelector('.s34-hub')) return;
        const anchor = document.querySelector('.s34-blbtn') || document.querySelector('.s34-gear.s34-inline');
        if (!anchor) return;
        const hub = document.createElement('div');
        hub.className = 's34-hub';
        hub.innerHTML = `
            <button type="button" data-hub="coll" title="Your own collections of posts">${FOLDER_SVG}<b>Collections</b><small></small></button>
            <button type="button" data-hub="stats" title="Your stats">${STATS_SVG}<b>Stats</b><small>overview</small></button>
            <button type="button" data-hub="dl" title="Every post you downloaded">${DL_ICON_SVG}<b>Downloads</b><small></small></button>`;
        hub.addEventListener('click', e => {
            const b = e.target.closest('[data-hub]');
            if (!b) return;
            if (b.dataset.hub === 'coll') openCollectionsWindow();
            else if (b.dataset.hub === 'dl') openDownloadsWindow();
            else openStatsWindow();
        });
        anchor.before(hub);
        updateHubCounts();
    }

    // ---- Sidebar order (Beta 3.3): calmer, four groups ----
    //   Search card (Recent · Tags · 🔔)  →  Following  →  View  →
    //   [Collections | Stats] [Blacklist | Settings]  →  tips · version
    // The pieces are built elsewhere (each placed next to the Settings
    // button); this only moves the last four into one 2×2 block and puts
    // Following above View. Runs after everything is built.
    function arrangeSidebarTools() {
        const gear = document.querySelector('.s34-gear.s34-inline');
        if (!gear || document.querySelector('.s34-dock')) return;
        const dock = document.createElement('div');
        dock.className = 's34-dock';
        gear.before(dock);
        const hub = document.querySelector('.s34-hub');
        const bl = document.querySelector('.s34-blbtn');
        if (hub) dock.appendChild(hub);   // its two buttons become two tiles
        if (bl) dock.appendChild(bl);
        // (Beta 3.8) Settings is in the top menu - its tile here only on phones
        if (!gear.classList.contains('s34-gear-in-nav')) dock.appendChild(gear);
        const follow = document.querySelector('.s34-follow-box');
        const view = document.querySelector('.s34-quick');
        if (follow && view && follow.parentElement === view.parentElement) view.before(follow);
        const saved = document.querySelector('.s34-saved-box'); // saved searches right under Following
        if (saved && follow) follow.after(saved);
    }

    // Single post page: "📁 Collection" button under Download
    function addPostCollectButton() {
        if (!isPostView || document.querySelector('.s34-post-collect')) return;
        const slot = getPostSidebarSlot();
        const id = params.get('id');
        if (!slot || !id) return;
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 's34-post-collect';
        btn.innerHTML = FOLDER_SVG + '<span>Save to collection</span>';
        const postOf = () => {
            const img = document.querySelector('#image');
            const tags = Array.from(document.querySelectorAll('#tag-sidebar li[class*="tag-type-"]')).map(getTagFromRow).filter(Boolean).join(' ');
            return [{ id, thumb: img ? img.src : '', tags }];
        };
        btn.addEventListener('click', e => openCollectMenu(btn, postOf(), { menu: e.shiftKey }));
        btn.addEventListener('contextmenu', e => { e.preventDefault(); openCollectMenu(btn, postOf(), { menu: true }); });
        const dl = slot.querySelector('.s34-dl-btn');
        if (dl) dl.after(btn); else slot.prepend(btn);
    }

    // ---- Popup: the next post in advance ----
    // Since Beta 3.5 only the next one (not next AND previous), and gently:
    // its picture comes straight from the image server (guessed from the
    // thumbnail like the popup does - no rule34 page needed), its post page
    // (tags, info) only once you've stayed on a post for a moment - flipping
    // fast loads nothing extra. Fewer page loads = fewer Cloudflare checks.
    const preloadedPosts = new Set();
    const PRELOAD_DWELL_MS = 1500;

    function preloadPicture(img) {
        const urls = mediaCandidates(img, false);
        let i = 0;
        const pre = new Image();
        pre.decoding = 'async';
        pre.onerror = () => { if (++i < urls.length) pre.src = urls[i]; };
        if (urls.length) pre.src = urls[0];
    }

    function preloadThumb(thumb, stillThere) {
        const a = thumb && thumb.querySelector('a[href]');
        const img = thumb && thumb.querySelector('img');
        if (!a || !img || preloadedPosts.has(a.href)) return;
        preloadedPosts.add(a.href);
        if (!isVideoThumb(img)) preloadPicture(img);
        fetchPostDoc(a.href, 'preload', { wanted: stillThere }); // waits in line behind what you asked for
    }

    function preloadNeighbours(thumb) {
        if (!CONFIG.popupPreload) return;
        const list = visibleThumbs();
        const i = list.indexOf(thumb);
        if (i < 0 || !list[i + 1]) return;
        const stillThere = () => !!popupState && popupState.thumb === thumb;
        setTimeout(() => { if (stillThere()) preloadThumb(list[i + 1], () => !!popupState); }, PRELOAD_DWELL_MS);
    }

    // ---- Popup: click an image to see it at full size, drag to move ----
    function resetZoom(stage) {
        stage.classList.remove('s34-pv-zoomed', 's34-pv-dragging', 's34-pv-strip');
        stage.querySelectorAll('img.s34-pv-media').forEach(i => { i.style.width = ''; i.style.height = ''; });
    }

    function toggleZoom(img, e) {
        const stage = img.closest('.s34-pv-stage');
        if (!stage) return;
        if (stage.classList.contains('s34-pv-zoomed')) { resetZoom(stage); return; }
        const nw = img.naturalWidth, nh = img.naturalHeight;
        if (!nw || !nh) return;
        // Where in the picture was clicked (the picture sits inside the box)
        const r = img.getBoundingClientRect();
        const scale = Math.min(r.width / nw, r.height / nh);
        const dw = nw * scale, dh = nh * scale;
        const ox = r.left + (r.width - dw) / 2, oy = r.top + (r.height - dh) / 2;
        const fx = Math.min(Math.max((e.clientX - ox) / dw, 0), 1);
        const fy = Math.min(Math.max((e.clientY - oy) / dh, 0), 1);
        // Full size, or twice the fitted size for small pictures
        const W = nw > dw * 1.2 ? nw : dw * 2;
        const H = W * nh / nw;
        stage.classList.add('s34-pv-zoomed');
        img.style.width = W + 'px';
        img.style.height = H + 'px';
        stage.scrollLeft = fx * W - stage.clientWidth / 2;
        stage.scrollTop = fy * H - stage.clientHeight / 2;
    }

    // Long strips (comics) open fitted to the width, scrolled to the top.
    // A click shows the whole strip, another one full size - like any picture.
    function fitLongStrip(img) {
        const stage = img.closest('.s34-pv-stage');
        const nw = img.naturalWidth, nh = img.naturalHeight;
        if (!stage || !isLongStrip(nw, nh)) return false;
        const fittedW = Math.min(stage.clientWidth / nw, stage.clientHeight / nh) * nw;
        stage.classList.add('s34-pv-zoomed', 's34-pv-strip');
        const size = () => {
            let W = stage.clientWidth; // (without the scrollbar, once there is one)
            if (!CONFIG.allowUpscale) W = Math.min(W, nw);
            img.style.width = W + 'px';
            img.style.height = (W * nh / nw) + 'px';
            return W;
        };
        size();
        if (size() < fittedW * 1.3) { resetZoom(stage); return false; } // fitted is wide enough already
        stage.scrollTop = 0;
        stage.scrollLeft = 0;
        return true;
    }

    function setupPopupZoom(overlay) {
        const stage = overlay.querySelector('.s34-pv-stage');
        let drag = null;
        stage.addEventListener('mousedown', e => {
            if (e.button !== 0) return;
            const img = e.target.closest('img.s34-pv-media:not(.s34-pv-placeholder)');
            if (!img) return;
            e.preventDefault(); // no "drag the picture away" ghost
            drag = { x: e.clientX, y: e.clientY, sl: stage.scrollLeft, st: stage.scrollTop, moved: false, img };
        });
        overlay.addEventListener('mousemove', e => {
            if (!drag) return;
            const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
            if (Math.abs(dx) + Math.abs(dy) > 5) drag.moved = true;
            if (drag.moved && stage.classList.contains('s34-pv-zoomed')) {
                stage.classList.add('s34-pv-dragging');
                stage.scrollLeft = drag.sl - dx;
                stage.scrollTop = drag.st - dy;
            }
        });
        const end = e => {
            if (!drag) return;
            const d = drag;
            drag = null;
            stage.classList.remove('s34-pv-dragging');
            if (!d.moved && e.type === 'mouseup') toggleZoom(d.img, e);
        };
        overlay.addEventListener('mouseup', end);
        overlay.addEventListener('mouseleave', end);
    }

