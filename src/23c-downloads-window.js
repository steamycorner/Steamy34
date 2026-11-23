    // =====================================================================
    //  DOWNLOADS WINDOW (Beta 3.8) - every post you downloaded, newest first
    // =====================================================================
    // The sidebar tile where Settings used to be (Settings moved into the top
    // menu: "Steamy34 Settings", on every page). Pictures: kept with each new
    // download (DLTHUMBS_KEY); older downloads didn't keep one - with an API
    // key the picture is looked up through the API (only for tiles you can
    // see), without one they show their number.
    const DLTHUMBS_KEY = 'steamy34_dlthumbs';
    const DLTHUMBS_LIMIT = 6000;
    const DL_ICON_SVG = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M4 17v3h16v-3"/></svg>';
    const DLW_PAGE = 120;

    function getDlThumbs() {
        try { const v = GM_getValue(DLTHUMBS_KEY, {}); return v && typeof v === 'object' ? v : {}; } catch (e) { return {}; }
    }

    function rememberDlThumb(id, src) {
        if (!id || !src || /^data:/.test(src)) return;
        const all = getDlThumbs();
        all[id] = src;
        const ids = Object.keys(all);
        if (ids.length > DLTHUMBS_LIMIT) ids.slice(0, ids.length - DLTHUMBS_LIMIT).forEach(k => delete all[k]);
        GM_setValue(DLTHUMBS_KEY, all);
    }

    // A picture we already know from somewhere: kept, a collection, this page
    function knownThumb(id, thumbs) {
        if (thumbs[id]) return thumbs[id];
        for (const c of getCollections()) { const p = c.posts.find(x => String(x.id) === String(id)); if (p && p.thumb) return p.thumb; }
        const t = allThumbs().find(x => String(thumbPostId(x)) === String(id));
        const img = t && t.querySelector('img');
        return img ? img.getAttribute('src') : '';
    }

    function downloadedList() {
        loadDownloaded();
        return Object.keys(downloaded).map(id => ({ id, time: downloaded[id] })).sort((a, b) => b.time - a.time);
    }

    function updateDownloadsCount() {
        const b = document.querySelector('.s34-hub [data-hub="dl"] small');
        if (!b) return;
        const n = CONFIG.trackDownloads ? downloadedList().length : 0;
        b.textContent = n ? n + (n === 1 ? ' post' : ' posts') : 'none yet';
    }

    function openDownloadsWindow() {
        if (document.querySelector('.s34-dlw-overlay')) return;
        const w = openWindow({ cls: 's34-dlw-overlay s34-coll-overlay', icon: DL_ICON_SVG, title: 'Downloads', width: 820 });
        let shown = DLW_PAGE;
        let lookups = 0;
        let showBlocked = false;      // (Beta 3.9.1) "Show blacklisted (N)"
        let filterText = '';          // (Beta 3.9.2) filter by artist / character / series / #number
        const shownNow = new Set();
        // What's known about each download's tags: the download history (artist /
        // character / series) and collections that hold the post
        function knownTags() {
            const map = {};
            getDlHistory().forEach(h => { map[h.id] = [].concat(h.artist || [], h.character || [], h.copyright || []).join(' '); });
            getCollections().forEach(c => c.posts.forEach(p => { if (p.tags) map[p.id] = (map[p.id] ? map[p.id] + ' ' : '') + p.tags; }));
            return map;
        }

        function render() {
            const list = CONFIG.trackDownloads ? downloadedList() : [];
            const thumbs = getDlThumbs();
            w.setSub(list.length ? `${list.length} post${list.length === 1 ? '' : 's'} you downloaded · newest first` : 'Posts you download show up here');
            w.body.replaceChildren();
            if (!CONFIG.trackDownloads) {
                const e = document.createElement('div');
                e.className = 's34-win-empty';
                e.textContent = '"Remember downloaded posts" is off (Settings → Downloads) – turn it on and your downloads collect here.';
                w.body.appendChild(e);
                return;
            }
            const tagsOf = knownTags();
            const blSet = blockedTagSet();
            const hitOf = id => (tagsOf[id] ? blockedTagsOf(tagsOf[id], blSet) : []);
            const blCount = list.filter(p => hitOf(p.id).length).length;
            if (list.length) {
                const bar = document.createElement('div');
                bar.className = 's34-win-tools';
                bar.innerHTML = '<input type="search" class="s34-dlw-filter" placeholder="Filter: artist, character, series or #number" autocomplete="off" spellcheck="false"><span class="s34-grow"></span>';
                const fi = bar.querySelector('input');
                fi.value = filterText;
                fi.addEventListener('keydown', e => e.stopPropagation());
                fi.addEventListener('input', () => {
                    filterText = fi.value;
                    clearTimeout(fi._t);
                    fi._t = setTimeout(() => { render(); const again = w.body.querySelector('.s34-dlw-filter'); if (again) { again.focus(); again.setSelectionRange(again.value.length, again.value.length); } }, 250);
                });
                blacklistToggle(bar, blCount, showBlocked, v => { showBlocked = v; render(); });
                w.body.appendChild(bar);
            }
            // the filter: words in the known tags, or a post number
            const q = filterText.trim().toLowerCase().replace(/^#/, '');
            if (q) {
                const words = q.split(/\s+/).map(x => x.replace(/ /g, '_'));
                const keep = p => /^\d+$/.test(q) ? String(p.id).startsWith(q)
                    : words.every(wd => (tagsOf[p.id] || '').toLowerCase().replace(/_/g, ' ').includes(wd.replace(/_/g, ' ')));
                list.splice(0, list.length, ...list.filter(keep));
                if (!list.length) {
                    const e = document.createElement('div');
                    e.className = 's34-win-empty';
                    e.textContent = 'Nothing matches "' + filterText.trim() + '". (Older downloads only know their artist, characters and series.)';
                    w.body.appendChild(e);
                }
            }
            const tiles = document.createElement('div');
            tiles.className = 's34-tiles';
            if (!list.length && !q) {
                const e = document.createElement('div');
                e.className = 's34-win-empty';
                e.textContent = 'Nothing yet – download a post (popup, post page, or the ⬇ on a thumbnail) and it shows up here.';
                tiles.appendChild(e);
            }
            const part = list.slice(0, shown);
            // The popup gets small stand-in thumbnails, ← / → go through your downloads
            const proxies = part.map(p => {
                const s = document.createElement('span');
                s.className = 'thumb';
                s.innerHTML = '<a></a>';
                s.firstChild.href = postPageUrl(p.id);
                const im = new Image();
                im.alt = '';
                const src = knownThumb(p.id, thumbs);
                if (src) im.src = src;
                s.dataset.s34TypeUnknown = '1';
                s.firstChild.appendChild(im);
                return s;
            });
            const popupList = { thumbs: () => proxies, state: () => 'done', more: () => {} };
            part.forEach((p, n) => {
                const tile = document.createElement('div');
                tile.className = 's34-tile';
                tile.dataset.id = p.id;
                const link = document.createElement('a');
                link.href = postPageUrl(p.id);
                link.target = '_blank';
                link.rel = 'noopener';
                link.title = 'Open the post (Ctrl + click: the post page in a new tab)';
                link.addEventListener('click', e => {
                    if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
                    e.preventDefault();
                    w.overlay.classList.add('s34-under-popup');
                    openPopup(proxies[n], popupList);
                });
                const src = knownThumb(p.id, thumbs);
                link.appendChild(thumbOrPlaceholder(src, p.id));
                if (!src) tile.classList.add('s34-tile-nopic');
                const cap = document.createElement('div');
                cap.className = 's34-tile-cap';
                cap.innerHTML = '<div class="s34-tile-title"></div><div class="s34-tile-sub"></div>';
                cap.firstChild.textContent = '#' + p.id;
                cap.lastChild.textContent = 'downloaded ' + timeAgo(p.time);
                const acts = document.createElement('div');
                acts.className = 's34-tile-acts';
                const rm = document.createElement('button');
                rm.type = 'button';
                rm.textContent = '×';
                rm.title = 'Forget this download (the file stays on your computer)';
                rm.addEventListener('click', () => {
                    unmarkDownloaded([p.id]);
                    showDownloadedState();
                    updateDownloadsCount();
                    render();
                    showToast('Forgotten – the file itself stays where it is.', 'Undo', () => {
                        markDownloadedOnly([p.id]);
                        loadDownloaded(); downloaded[p.id] = p.time; GM_setValue(DOWNLOADED_KEY, downloaded);
                        showDownloadedState(); updateDownloadsCount(); if (w.overlay.isConnected) render();
                    });
                });
                acts.appendChild(rm);
                tile.append(link, cap, acts);
                const hit = hitOf(p.id);
                if (hit.length && !showBlocked && !shownNow.has(p.id)) coverBlockedTile(tile, link, hit, () => { shownNow.add(p.id); uncoverTile(tile); });
                tiles.appendChild(tile);
            });
            w.body.appendChild(tiles);
            if (list.length > shown) {
                const more = document.createElement('button');
                more.type = 'button';
                more.className = 's34-win-more';
                more.textContent = `Show more (${list.length - shown} older)`;
                more.addEventListener('click', () => { shown += DLW_PAGE; render(); });
                w.body.appendChild(more);
            }
            findMissingPictures(tiles);
        }

        // Older downloads without a picture: with an API key, look them up
        // (only the tiles you can see, one at a time, within the API's limit)
        function findMissingPictures(tiles) {
            if (!hasApiKey()) return;
            const io = new IntersectionObserver(entries => entries.forEach(async en => {
                if (!en.isIntersecting) return;
                io.unobserve(en.target);
                if (lookups > 60 || !w.overlay.isConnected) return;
                lookups++;
                const id = en.target.dataset.id;
                try {
                    const data = await apiGet({ s: 'post', id });
                    const raw = (Array.isArray(data) ? data : data && Array.isArray(data.post) ? data.post : [])[0];
                    const src = raw && String(raw.preview_url || '');
                    if (!src) return;
                    rememberDlThumb(id, src);
                    const box = en.target.querySelector('.s34-tile-img');
                    if (box) { box.textContent = ''; const im = new Image(); im.alt = ''; im.src = src; box.appendChild(im); }
                    en.target.classList.remove('s34-tile-nopic');
                } catch (e) {}
            }), { root: w.body });
            tiles.querySelectorAll('.s34-tile-nopic').forEach(t => io.observe(t));
        }

        render();
    }

    // Settings in rule34's top menu ("Steamy34 Settings"), on every page with
    // that menu (computers - on phones it folds into ☰, which has Settings).
    // Resolves true when it's there.
    function addNavSettings() {
        if (isPhoneLayout()) return false;
        const nav = document.querySelector('#navbar');
        if (!nav) return false;
        if (nav.querySelector('.s34-nav-steamy')) return true;
        const gear = document.createElement('div');
        gear.className = 's34-gear s34-gear-nav';
        gear.title = 'Steamy34 Settings · ' + CURRENT_VERSION;
        makeKeyClickable(gear, 'Steamy34 Settings');
        const icon = new Image();
        icon.src = logoData();
        icon.alt = '';
        const label = document.createElement('span');
        label.textContent = 'Steamy34 Settings';
        gear.append(icon, label);
        gear.addEventListener('click', openSettings);
        const li = document.createElement('li');
        li.className = 's34-nav-steamy';
        li.appendChild(gear);
        nav.appendChild(li);
        return true;
    }
