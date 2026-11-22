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
        const ok = await saveUrlAs(file, buildFilename(file, tags, readPostSize(doc), id), url);
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
    }

    function createCollection(name) {
        const list = getCollections();
        const c = { id: 'c' + Date.now().toString(36), name: name.trim().slice(0, 60) || 'New collection', created: Date.now(), posts: [] };
        list.push(c);
        saveCollections(list);
        return c;
    }

    // Small menu: tick collections for one post, or add several posts at once
    function openCollectMenu(anchor, posts) {
        document.querySelectorAll('.s34-cmenu').forEach(m => m.remove());
        const single = posts.length === 1;
        const menu = document.createElement('div');
        menu.className = 's34-cmenu';

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
                        posts.forEach(p => {
                            if (p.id && !col.posts.some(x => x.id === p.id)) {
                                col.posts.unshift({ id: p.id, thumb: p.thumb || '', time: Date.now() });
                                added++;
                            }
                        });
                        showToast(added ? `Saved ${added === 1 ? '' : added + ' posts '}to "${col.name}".` : `Already in "${col.name}".`);
                    }
                    saveCollections(all);
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
                posts.forEach(p => { if (p.id) col.posts.unshift({ id: p.id, thumb: p.thumb || '', time: Date.now() }); });
                saveCollections(all);
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

    function openCollectionsWindow(openId) {
        if (document.querySelector('.s34-coll-overlay')) return;
        const w = openWindow({ cls: 's34-coll-overlay', icon: FOLDER_SVG, title: 'Collections', width: 820 });
        let current = openId || null;
        let downloading = null; // { stop }

        function renderList() {
            current = null;
            w.setTitle('Collections');
            const list = getCollections();
            w.setSub(list.length ? `${list.length} collection${list.length === 1 ? '' : 's'} · only on this computer` : 'Your own folders for posts – only on this computer');
            w.body.replaceChildren();
            const grid = document.createElement('div');
            grid.className = 's34-coll-grid';
            list.forEach(c => {
                const card = document.createElement('button');
                card.type = 'button';
                card.className = 's34-coll-card';
                const cover = document.createElement('div');
                cover.className = 's34-coll-cover';
                c.posts.slice(0, 4).forEach(p => { if (p.thumb) { const i = new Image(); i.src = p.thumb; i.alt = ''; i.loading = 'lazy'; cover.appendChild(i); } });
                if (!cover.childElementCount) cover.innerHTML = FOLDER_SVG;
                cover.classList.toggle('s34-coll-cover-n' + Math.min(4, cover.querySelectorAll('img').length), true);
                const name = document.createElement('div');
                name.className = 's34-coll-name';
                name.textContent = c.name;
                const n = document.createElement('div');
                n.className = 's34-coll-n';
                n.textContent = c.posts.length + (c.posts.length === 1 ? ' post' : ' posts');
                card.append(cover, name, n);
                card.addEventListener('click', () => renderOne(c.id));
                grid.appendChild(card);
            });
            // New collection card
            const add = document.createElement('div');
            add.className = 's34-coll-card s34-coll-new';
            add.innerHTML = '<div class="s34-coll-plus">+</div><input type="text" placeholder="New collection…" maxlength="60"><button type="button">Create</button>';
            const input = add.querySelector('input');
            const create = () => {
                if (!input.value.trim()) { input.focus(); return; }
                createCollection(input.value);
                renderList();
            };
            add.querySelector('button').addEventListener('click', create);
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
            bar.innerHTML = `
                <button type="button" data-a="back">← All collections</button>
                <span class="s34-grow"></span>
                <button type="button" data-a="rename">✎ Rename</button>
                <button type="button" data-a="delete">Delete</button>
                <button type="button" data-a="dl" class="s34-win-primary">⬇ Download all</button>`;
            bar.addEventListener('click', async e => {
                const a = e.target.closest('[data-a]');
                if (!a) return;
                const act = a.dataset.a;
                if (act === 'back') { if (downloading) downloading.stop = true; renderList(); }
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
            const status = document.createElement('div');
            status.className = 's34-win-status';
            status.hidden = true;
            const tiles = document.createElement('div');
            tiles.className = 's34-tiles';
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
            const proxies = c.posts.map(p => {
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
            c.posts.forEach((p, n) => {
                const tile = document.createElement('div');
                tile.className = 's34-tile';
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
                acts.appendChild(rm);
                tile.append(link, cap, acts);
                tiles.appendChild(tile);
            });
            w.body.append(bar, status, tiles);
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
    }

    function addHub() {
        if (document.querySelector('.s34-hub')) return;
        const anchor = document.querySelector('.s34-blbtn') || document.querySelector('.s34-gear.s34-inline');
        if (!anchor) return;
        const hub = document.createElement('div');
        hub.className = 's34-hub';
        hub.innerHTML = `
            <button type="button" data-hub="coll" title="Your own collections of posts">${FOLDER_SVG}<b>Collections</b><small></small></button>
            <button type="button" data-hub="stats" title="Your stats">${STATS_SVG}<b>Stats</b><small>overview</small></button>`;
        hub.addEventListener('click', e => {
            const b = e.target.closest('[data-hub]');
            if (!b) return;
            if (b.dataset.hub === 'coll') openCollectionsWindow();
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
        dock.appendChild(gear);
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
        btn.addEventListener('click', () => {
            const img = document.querySelector('#image');
            openCollectMenu(btn, [{ id, thumb: img ? img.src : '' }]);
        });
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
        stage.classList.remove('s34-pv-zoomed', 's34-pv-dragging');
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

