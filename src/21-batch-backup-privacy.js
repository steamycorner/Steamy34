    // ---- Batch download: select posts, then download them one by one ----
    let selectMode = false;
    let batchRunning = false;
    let batchStop = false;
    let batchStatus = '';
    const selected = new Set();

    function setSelectMode(on) {
        selectMode = on;
        document.documentElement.classList.toggle('s34-selecting', on);
        const btn = document.querySelector('.s34-q-select');
        if (btn) {
            btn.textContent = on ? '✕ Stop selecting' : '⬇ Batch download';
            btn.classList.toggle('s34-on', on);
        }
        if (!on && !batchRunning) {
            selected.forEach(t => t.classList.remove('s34-selected'));
            selected.clear();
        }
        renderBatchBar();
    }

    function toggleSelected(thumb, force) {
        const on = force !== undefined ? force : !selected.has(thumb);
        if (on) selected.add(thumb); else selected.delete(thumb);
        thumb.classList.toggle('s34-selected', on);
        renderBatchBar();
    }

    // In select mode a click on a thumbnail selects it instead of opening it
    // (registered before the popup viewer's click handler)
    document.addEventListener('click', e => {
        if (!selectMode) return;
        const thumb = e.target.closest('.image-list span.thumb');
        if (!thumb) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        if (!batchRunning) toggleSelected(thumb);
    }, true);

    function renderBatchBar() {
        let bar = document.querySelector('.s34-batch');
        if (!selectMode && !batchRunning) {
            if (bar) bar.remove();
            return;
        }
        if (!bar) {
            bar = document.createElement('div');
            bar.className = 's34-batch';
            bar.addEventListener('click', e => {
                const act = e.target.closest('[data-act]');
                if (!act) return;
                const a = act.dataset.act;
                if (a === 'all') {
                    allThumbs().filter(t => t.offsetParent !== null && !t.classList.contains('s34-was-downloaded'))
                        .forEach(t => toggleSelected(t, true));
                } else if (a === 'none') {
                    Array.from(selected).forEach(t => toggleSelected(t, false));
                } else if (a === 'go') {
                    const list = allThumbs().filter(t => selected.has(t)); // page order
                    if (list.length) batchDownload(list);
                } else if (a === 'collect') {
                    const posts = allThumbs().filter(t => selected.has(t)).map(t => {
                        const img = t.querySelector('img');
                        return { id: thumbPostId(t), thumb: img ? img.getAttribute('src') : '' };
                    });
                    if (posts.length) openCollectMenu(act, posts);
                } else if (a === 'stop') {
                    batchStop = true;
                } else if (a === 'done') {
                    setSelectMode(false);
                }
            });
            document.body.appendChild(bar);
        }
        const n = selected.size;
        bar.innerHTML = batchRunning
            ? `<span class="s34-batch-status"></span>
               <button type="button" data-act="stop">Stop</button>`
            : `<span class="s34-batch-status"><b>${n}</b> selected</span>
               <button type="button" data-act="all" title="Select every loaded post you haven't downloaded yet">Select all new</button>
               <button type="button" data-act="none">Clear</button>
               <button type="button" data-act="collect" ${n ? '' : 'disabled'} title="Save the selected posts in a collection" class="s34-batch-icon">${FOLDER_SVG} Add to collection</button>
               <button type="button" data-act="go" class="s34-batch-go" ${n ? '' : 'disabled'}>⬇ Download ${n || ''}</button>
               <button type="button" data-act="done" title="Leave select mode">✕</button>`;
        if (batchRunning) bar.querySelector('.s34-batch-status').textContent = batchStatus;
    }

    async function downloadThumb(thumb) {
        const a = thumb.querySelector('a[href]');
        if (!a) return false;
        const doc = await fetchPostDoc(a.href);
        if (!doc) return false;
        const media = await getPostMedia(a.href);
        const url = media && (media.video || media.image);
        if (!url) return false;
        const g = readPostTags(doc);
        const names = k => (g[k] || []).map(x => x.tag);
        const tags = {
            copyright: names('copyright'),
            character: names('character'),
            artist: names('artist')
        };
        const filename = buildFilename(url, tags, readPostSize(doc), postIdFrom(a.href));
        const ok = await saveUrlAs(url, filename, a.href);
        const img = thumb.querySelector('img');
        if (ok) rememberDownload(thumbPostId(thumb), { thumb: img ? img.getAttribute('src') : '', tags });
        return ok;
    }

    // ---- Download panel: one floating card for batch & collection downloads ----
    // "12 / 40", a progress bar, Pause / Resume and Cancel. Pause waits for the
    // file that's loading right now, then holds. onCancel: also stop the caller.
    function openDownloadPanel(total, title, onCancel) {
        const old = document.querySelector('.s34-dlp');
        if (old) old.remove();
        const el = document.createElement('div');
        el.className = 's34-dlp';
        el.setAttribute('role', 'status');
        el.innerHTML = `
            <div class="s34-dlp-head"><b></b><span class="s34-dlp-count"></span></div>
            <div class="s34-dlp-bar"><i></i></div>
            <div class="s34-dlp-text"></div>
            <div class="s34-dlp-btns">
                <button type="button" data-a="pause">Pause</button>
                <button type="button" data-a="cancel">Cancel</button>
            </div>`;
        el.querySelector('b').textContent = title;
        const st = { paused: false, stopped: false, done: 0, ok: 0, failed: 0 };
        const pauseBtn = el.querySelector('[data-a="pause"]');
        const draw = text => {
            el.querySelector('.s34-dlp-count').textContent = st.done + ' / ' + total;
            el.querySelector('.s34-dlp-bar i').style.width = (total ? Math.round(st.done / total * 100) : 0) + '%';
            if (text != null) el.querySelector('.s34-dlp-text').textContent = text;
            el.classList.toggle('s34-dlp-paused', st.paused);
            pauseBtn.textContent = st.paused ? 'Resume' : 'Pause';
        };
        el.addEventListener('click', e => {
            const a = e.target.closest('[data-a]');
            if (!a) return;
            if (a.dataset.a === 'pause') { st.paused = !st.paused; draw(st.paused ? 'Paused – the current file still finishes.' : 'Going on…'); }
            else if (a.dataset.a === 'cancel') { st.stopped = true; st.paused = false; draw('Cancelling…'); if (onCancel) onCancel(); }
            else if (a.dataset.a === 'close') el.remove();
        });
        document.body.appendChild(el);
        draw('Starting…');
        return {
            get stopped() { return st.stopped; },
            stop() { st.stopped = true; },
            status(text) { draw(text); },
            item(ok) { st.done++; if (ok) st.ok++; else st.failed++; draw(); },
            async waitWhilePaused() { while (st.paused && !st.stopped) await pause(400); },
            finish(stopped) {
                st.paused = false;
                const sum = st.ok + ' saved' + (st.failed ? ', ' + st.failed + ' failed' : '') + (stopped ? ' – stopped.' : '.');
                draw(sum);
                el.querySelector('b').textContent = stopped ? 'Download stopped' : 'Download finished';
                el.querySelector('.s34-dlp-btns').innerHTML = '<button type="button" data-a="close">Close</button>';
                setTimeout(() => { if (el.isConnected) el.remove(); }, 12000);
                return sum;
            }
        };
    }

    async function batchDownload(list) {
        batchRunning = true;
        batchStop = false;
        let ok = 0, failed = 0;
        const panel = openDownloadPanel(list.length, 'Downloading ' + list.length + ' posts', () => { batchStop = true; renderBatchBar(); });
        for (let i = 0; i < list.length && !batchStop; i++) {
            const thumb = list[i];
            await panel.waitWhilePaused();
            if (batchStop) break;
            batchStatus = `Downloading ${i + 1} / ${list.length}…`;
            panel.status(`Post ${i + 1} of ${list.length}…`);
            renderBatchBar();
            // Cloudflare check open? Wait until it's solved.
            while (cloudflarePaused() && !batchStop) {
                batchStatus = 'Paused – solve the Cloudflare check to continue';
                panel.status(batchStatus);
                renderBatchBar();
                await pause(2000);
            }
            if (batchStop) break;
            let done = await downloadThumb(thumb);
            if (!done && cloudflarePaused()) {   // check came up mid-way: retry once after
                while (cloudflarePaused() && !batchStop) await pause(2000);
                if (!batchStop) done = await downloadThumb(thumb);
            }
            if (done) {
                ok++;
                selected.delete(thumb);
                thumb.classList.remove('s34-selected');
            } else {
                failed++;
            }
            panel.item(done);
            if (i < list.length - 1 && !batchStop) await pause(CONFIG.batchDelay);
        }
        batchRunning = false;
        renderBatchBar();
        panel.finish(batchStop);
        if (failed) showToast(`${failed} download${failed === 1 ? '' : 's'} failed – those posts are still ticked, so you can try again.`, null, null, 10000);
    }

    // ---- Video options: remembered volume, loop, speed ----
    const VIDEO_KEY = 'steamy34_video';

    function getVideoPrefs() {
        let v = {};
        try { v = GM_getValue(VIDEO_KEY, {}) || {}; } catch (e) {}
        return Object.assign({ volume: 1, muted: false, loop: true, rate: 1 }, v);
    }

    function setVideoPrefs(changes) {
        GM_setValue(VIDEO_KEY, Object.assign(getVideoPrefs(), changes));
    }

    // Muting done by the script (sound blocked) must not be remembered
    function autoMute(video) {
        video.dataset.s34AutoMuted = '1';
        video.muted = true;
        setTimeout(() => { delete video.dataset.s34AutoMuted; }, 300);
    }

    function applyVideoPrefs(video) {
        const p = getVideoPrefs();
        video.volume = Math.min(Math.max(p.volume, 0), 1);
        video.muted = !!p.muted;
        video.loop = !!p.loop;
        video.defaultPlaybackRate = p.rate;
        video.playbackRate = p.rate;
        if (video.dataset.s34Prefs) return;
        video.dataset.s34Prefs = '1';
        video.addEventListener('volumechange', () => {
            if (video.dataset.s34AutoMuted) return;
            setVideoPrefs({ volume: video.volume, muted: video.muted });
        });
        // Some players reset the speed when a new source loads
        video.addEventListener('loadedmetadata', () => {
            video.playbackRate = getVideoPrefs().rate;
        });
    }

    function makeVideoOptions(getVideo) {
        const box = document.createElement('div');
        box.className = 's34-vopts';
        box.innerHTML = `
            <button type="button" class="s34-vopt-loop"></button>
            <label class="s34-vopt-speed">Speed
                <select>${[0.25, 0.5, 0.75, 1, 1.25, 1.5, 2].map(r => `<option value="${r}">${r}×</option>`).join('')}</select>
            </label>`;
        const loopBtn = box.querySelector('.s34-vopt-loop');
        const sel = box.querySelector('select');
        const showLoop = () => {
            const on = getVideoPrefs().loop;
            loopBtn.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 2l3 3-3 3"/><path d="M4 11V9a4 4 0 0 1 4-4h12"/><path d="M7 22l-3-3 3-3"/><path d="M20 13v2a4 4 0 0 1-4 4H4"/></svg>' +
                (on ? ' Loop: on' : ' Loop: off');
            loopBtn.classList.toggle('s34-on', on);
        };
        loopBtn.addEventListener('click', () => {
            const on = !getVideoPrefs().loop;
            setVideoPrefs({ loop: on });
            const v = getVideo();
            if (v) v.loop = on;
            showLoop();
        });
        sel.value = String(getVideoPrefs().rate);
        sel.addEventListener('change', () => {
            const r = parseFloat(sel.value);
            setVideoPrefs({ rate: r });
            const v = getVideo();
            if (v) { v.defaultPlaybackRate = r; v.playbackRate = r; }
            sel.blur();
        });
        showLoop();
        return box;
    }

    function setupPostVideoOptions() {
        const video = document.querySelector('#gelcomVideoPlayer, #content video');
        if (!video || video.tagName !== 'VIDEO') return;
        applyVideoPrefs(video);
        const slot = getPostSidebarSlot();
        if (slot) slot.appendChild(makeVideoOptions(() => video));
    }

    // ---- Backup: everything Steamy34 remembers, in one file ----
    function exportBackup() {
        const data = {
            app: 'Steamy34',
            exported: new Date().toISOString(),
            settings: GM_getValue(SETTINGS_KEY, {}),
            history: getStoredList(HISTORY_KEY),
            favTags: getStoredList(FAVTAGS_KEY),
            pinnedFilters: getPins(),
            collections: getCollections(),
            downloadHistory: getDlHistory(),
            downloaded: loadDownloaded(),
            viewed: loadViewed(),
            favs: getFavs(),
            votes: GM_getValue(VOTES_KEY, {}) || {},
            video: getVideoPrefs(),
            autoNext: GM_getValue(AUTO_KEY, {}) || {},
            theater: GM_getValue(THEATER_KEY, false) === true,
            blacklist: readBlocklist(),
            blacklistDates: getBlTimes(),
            tagTypes: Object.fromEntries(tagTypes),
            following: getFollowing()
        };
        const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
        saveBlob(blob, 'Steamy34_backup_' + new Date().toISOString().slice(0, 10) + '.json');
        showToast('Backup saved to your downloads.');
    }

    // Reload the page and show a message once it's back (instead of a
    // blocking alert box right before the reload)
    const FLASH_KEY = 's34_flash';
    function reloadWithMessage(text) {
        try { sessionStorage.setItem(FLASH_KEY, text); } catch (e) {}
        location.reload();
    }
    function showFlashMessage() {
        let text = null;
        try { text = sessionStorage.getItem(FLASH_KEY); sessionStorage.removeItem(FLASH_KEY); } catch (e) {}
        if (text) showToast(text, null, null, 8000);
    }

    function importBackup() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json,application/json';
        input.addEventListener('change', async () => {
            const file = input.files && input.files[0];
            if (!file) return;
            let d;
            try { d = JSON.parse(await file.text()); } catch (e) { d = null; }
            if (!d || d.app !== 'Steamy34') {
                showToast('That file isn\'t a Steamy34 backup – pick the "Steamy34_backup_….json" file.', null, null, 9000);
                return;
            }
            if (!confirm('Import this backup?\n\nSettings are replaced. Recent searches, everything you follow, ' +
                         'downloaded / viewed posts, favourites and the blacklist are added to what you have now.')) return;

            const obj = x => (x && typeof x === 'object' && !Array.isArray(x)) ? x : {};
            const arr = x => Array.isArray(x) ? x : [];

            if (d.settings) GM_setValue(SETTINGS_KEY, obj(d.settings));

            const hist = getStoredList(HISTORY_KEY);
            arr(d.history).forEach(q => { if (typeof q === 'string' && !hist.includes(q)) hist.push(q); });
            GM_setValue(HISTORY_KEY, hist.slice(0, HISTORY_MAX));

            const favTags = getStoredList(FAVTAGS_KEY);
            const favLower = new Set(favTags.map(t => String(t).toLowerCase()));
            arr(d.favTags).forEach(t => {
                if (typeof t === 'string' && t && !favLower.has(t.toLowerCase())) { favTags.push(t); favLower.add(t.toLowerCase()); }
            });
            GM_setValue(FAVTAGS_KEY, favTags);
            if (d.pinnedFilters) setPins(obj(d.pinnedFilters));

            // Collections: add the ones you don't have; same name -> posts merged
            const colls = getCollections();
            arr(d.collections).forEach(c => {
                if (!c || !c.name || !Array.isArray(c.posts)) return;
                const same = colls.find(x => x.name === c.name);
                if (same) c.posts.forEach(p => { if (p && p.id && !same.posts.some(q => q.id === p.id)) same.posts.push(p); });
                else colls.push({ id: c.id || 'c' + Date.now().toString(36) + colls.length, name: c.name, created: c.created || Date.now(), posts: c.posts.filter(p => p && p.id) });
            });
            GM_setValue(COLL_KEY, colls);

            const dlHist = getDlHistory();
            const have = new Set(dlHist.map(h => h.id));
            arr(d.downloadHistory).forEach(h => { if (h && h.id && !have.has(h.id)) dlHist.push(h); });
            dlHist.sort((a, b) => (b.time || 0) - (a.time || 0));
            GM_setValue(DLHIST_KEY, dlHist.slice(0, DLHIST_LIMIT));

            GM_setValue(DOWNLOADED_KEY, Object.assign({}, obj(d.downloaded), loadDownloaded()));
            GM_setValue(VIEWED_KEY, Object.assign({}, obj(d.viewed), loadViewed()));
            GM_setValue(FAVS_KEY, Object.assign({}, obj(d.favs), getFavs()));
            GM_setValue(VOTES_KEY, Object.assign({}, obj(d.votes), GM_getValue(VOTES_KEY, {}) || {}));
            if (d.video) GM_setValue(VIDEO_KEY, obj(d.video));
            if (d.autoNext) GM_setValue(AUTO_KEY, obj(d.autoNext));
            if (typeof d.theater === 'boolean') GM_setValue(THEATER_KEY, d.theater);
            try {
                GM_setValue(TAGTYPE_KEY, Object.assign({}, obj(d.tagTypes), GM_getValue(TAGTYPE_KEY, {}) || {}));
            } catch (e) {}

            const bl = readBlocklist();
            const lower = new Set(bl.map(t => t.toLowerCase()));
            arr(d.blacklist).forEach(t => {
                if (typeof t === 'string' && t && !lower.has(t.toLowerCase())) { bl.push(t); lower.add(t.toLowerCase()); }
            });
            writeBlocklist(bl);
            // Restore the real "blacklisted on" dates (writeBlocklist just stamped them "now")
            GM_setValue(BL_TIMES_KEY, Object.assign(getBlTimes(), obj(d.blacklistDates)));

            // Following: add the artists and searches you don't follow yet (filter
            // only if you have none). Older backups: "saved" searches -> followed searches
            const inArtists = d.following && (Array.isArray(d.following.artists) ? d.following.artists
                : Array.isArray(d.following.tags) ? d.following.tags.filter(t => t && (!t.type || t.type === 'artist')) : null);
            const inSearches = arr(d.following && d.following.searches)
                .concat(arr(d.saved).map(s => s && { query: s.query, name: s.name, seen: s.seenId || 0 }));
            if (inArtists || inSearches.length) {
                const fol = getFollowing();
                (inArtists || []).forEach(t => {
                    if (t && typeof t.tag === 'string' && t.tag && !isFollowed(t.tag, fol)) {
                        fol.artists.push({ tag: t.tag.toLowerCase(), added: t.added || Date.now(), seen: 0, latest: 0, count: 0, more: false, filter: typeof t.filter === 'string' ? t.filter : '' });
                    }
                });
                inSearches.forEach(s => {
                    if (s && typeof s.query === 'string' && s.query && !findSearch(s.query, fol)) {
                        fol.searches.push({ query: s.query, name: s.name || s.query, added: s.added || Date.now(), seen: s.seen || 0, latest: s.seen || 0, count: 0, more: false });
                    }
                });
                if (d.following && !fol.filter.score && !fol.filter.type && !fol.filter.rating && d.following.filter) fol.filter = Object.assign(fol.filter, obj(d.following.filter));
                saveFollowing(fol);
            }

            reloadWithMessage('Backup imported – your settings, searches, collections and marks are back.');
        });
        input.click();
    }

    // ---- Settings: "Privacy & your data" - what is stored, and removing it ----
    // [key, label, what it is, empty value]
    const STORED_DATA = [
        ['steamy34_settings', 'Settings', 'Your choices in this menu and the sidebar switches', {}],
        ['steamy34_following', 'Following', 'Artists and searches you follow, the artist filter, and the newest post you\'ve seen from each', {}],
        ['steamy34_history', 'Recent searches', 'Your last searches', []],
        ['steamy34_resume', 'Where you left off', 'The page you were on per search, for "Continue at page N" (kept 24 hours)', {}],
        ['steamy34_favtags', 'Favourite tags', 'Tags in the ★ Favourite tags area', []],
        ['steamy34_pinned', 'Pinned filters', 'Search filters kept for every new search', {}],
        ['steamy34_downloaded', 'Downloaded posts', 'Post numbers you downloaded (for the ⬇ mark)', {}],
        ['steamy34_dlhistory', 'Download tags', 'Artist / character / series of each download (for Stats)', []],
        ['steamy34_collections', 'Collections', 'Your own folders of saved posts', []],
        ['steamy34_viewed', 'Viewed posts', 'Post numbers you opened (for the eye mark)', {}],
        ['steamy34_favs', 'Favourite marks', 'Posts you added to favourites (the ♥ stays filled)', {}],
        ['steamy34_votes', 'Votes', 'Posts you voted for (the ▲ stays green)', {}],
        ['steamy34_bltimes', 'Blacklist dates', 'When you blacklisted each tag', {}],
        ['steamy34_video', 'Video options', 'Volume, mute, loop and speed', {}],
        ['steamy34_auto', 'Auto next timer', 'Seconds per post for "Auto next"', {}],
        ['steamy34_theater', 'Theater mode', 'Whether the popup opens without its sidebar', false],
        ['steamy34_tagtypes', 'Tag types', 'Which tags are artists / characters / … (makes tag bars faster)', {}],
        ['steamy34_mediahosts', 'Media servers', 'Which file servers worked (faster previews)', {}],
        ['steamy34_lastsearch', 'Last search', 'The search you came from (for the + buttons)', ''],
        ['steamy34_dlfolder', 'Download folder', 'The name of the folder you picked for downloads (the browser keeps the access to it)', ''],
        ['steamy34_sbmenu_open', 'Small preferences', 'Whether lists are folded, sort order, which tips / news / guides you\'ve seen, whether an ad blocker was found', null],
        ['steamy34_blsort', null, null, null]
    ];
    // Everything that's shown together as "Small preferences"
    const SMALL_PREF_KEYS = ['steamy34_sbmenu_open', 'steamy34_sb_panel', 'steamy34_sfw', 'steamy34_first_seen', 'steamy34_rate_asked', 'steamy34_sitecheck_warned', 'steamy34_blsort', 'steamy34_adblock_seen',
        'steamy34_tips_seen', 'steamy34_changelog_seen', 'steamy34_mobile_seen', 'steamy34_marks_rev', 'steamy34_welcome_seen', 'steamy34_hints_seen'];

    function storedCount(v) {
        if (Array.isArray(v)) return v.length;
        if (v && typeof v === 'object') return Object.keys(v).length;
        return v === '' || v == null ? 0 : 1;
    }

    function storedSize(v) {
        try { return JSON.stringify(v === undefined ? null : v).length; } catch (e) { return 0; }
    }

    function formatSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        return (bytes / 1024).toFixed(bytes < 10240 ? 1 : 0) + ' KB';
    }

    function deleteStored(key, empty) {
        if (typeof GM_deleteValue === 'function') GM_deleteValue(key);
        else GM_setValue(key, empty);
    }

    function buildPrivacySection() {
        const wrap = document.createElement('div');
        wrap.className = 's34-privacy';
        wrap.innerHTML = `
            <div class="s34-privacy-hero">
                <div class="s34-privacy-icon">${LOCK_SVG}</div>
                <div>
                    <b>No data is collected.</b>
                    Steamy34 has no tracking, no analytics and no server of its own. Everything it
                    remembers is stored <b>only on this computer</b>, inside your browser's Tampermonkey
                    storage – nothing is uploaded or shared.
                </div>
            </div>
            <div class="s34-privacy-note">
                The script only talks to rule34.xxx itself (loading pages, pictures and tag
                suggestions – just like browsing), and only sends something to your account when you
                use ♥ Favourite or ▲ Vote. Your blacklist is the site's own list, kept in a rule34.xxx
                cookie – manage it with the Blacklist button.
            </div>
            <div class="s34-privacy-head">
                <span>Stored on this computer</span>
                <span class="s34-privacy-total"></span>
            </div>
            <div class="s34-privacy-list"></div>
            <div class="s34-privacy-actions">
                <button type="button" class="s34-btn" data-pv="export">⬇ Export a backup first</button>
                <button type="button" class="s34-btn s34-danger" data-pv="all">Delete all Steamy34 data</button>
            </div>
            <div class="s34-privacy-note">
                Other ways to remove everything: uninstalling Steamy34 in Tampermonkey deletes all of it,
                or open the Tampermonkey dashboard → Steamy34 → <i>Storage</i> tab.
                Downloaded files are normal files in your downloads folder – Steamy34 never touches them.
            </div>`;

        const list = wrap.querySelector('.s34-privacy-list');

        function render() {
            list.replaceChildren();
            let total = 0;
            STORED_DATA.forEach(([key, label, what, empty]) => {
                if (!label) return;
                let v;
                try { v = GM_getValue(key, undefined); } catch (e) { v = undefined; }
                // The small preferences row covers several keys
                const keys = key === 'steamy34_sbmenu_open' ? SMALL_PREF_KEYS : [key];
                const size = keys.reduce((s, k) => {
                    let x; try { x = GM_getValue(k, undefined); } catch (e) {}
                    return s + (x === undefined ? 0 : storedSize(x));
                }, 0);
                total += size;
                const count = ['steamy34_sbmenu_open', 'steamy34_video', 'steamy34_settings', 'steamy34_lastsearch'].includes(key)
                    ? null : storedCount(v);

                const row = document.createElement('div');
                row.className = 's34-privacy-row' + (size ? '' : ' s34-privacy-empty');
                const info = document.createElement('div');
                info.className = 's34-privacy-info';
                const name = document.createElement('div');
                name.className = 's34-privacy-name';
                name.textContent = label;
                const sub = document.createElement('div');
                sub.className = 's34-privacy-what';
                sub.textContent = what;
                info.append(name, sub);
                const amount = document.createElement('div');
                amount.className = 's34-privacy-amount';
                amount.textContent = !size ? 'empty' : (count != null ? count + ' · ' : '') + formatSize(size);
                const clear = document.createElement('button');
                clear.type = 'button';
                clear.className = 's34-privacy-clear';
                clear.textContent = 'Clear';
                clear.disabled = !size;
                clear.title = 'Delete this from your computer';
                clear.addEventListener('click', () => {
                    const extra = key === 'steamy34_settings' ? '\n\nAll settings go back to their defaults (after a reload).' : '';
                    if (!confirm(`Delete "${label}" from this computer? This can't be undone.${extra}`)) return;
                    keys.forEach(k => deleteStored(k, k === key ? empty : null));
                    // Forget the copies this page still holds in memory
                    if (key === 'steamy34_downloaded') downloaded = null;
                    if (key === 'steamy34_viewed') viewed = null;
                    if (key === 'steamy34_tagtypes') tagTypes.clear();
                    if (key === 'steamy34_downloaded' || key === 'steamy34_viewed') showDownloadedState();
                    render();
                    showToast(`Deleted: ${label}.`);
                });
                row.append(info, amount, clear);
                list.appendChild(row);
            });
            wrap.querySelector('.s34-privacy-total').textContent = 'Total ' + formatSize(total);
        }

        wrap.addEventListener('click', e => {
            const act = e.target.closest('[data-pv]');
            if (!act) return;
            if (act.dataset.pv === 'export') exportBackup();
            else if (act.dataset.pv === 'all') {
                if (!confirm('Delete ALL Steamy34 data from this computer?\n\nSettings, saved & recent searches, favourite tags, ' +
                             'downloaded / viewed marks and everything else listed here will be gone. This can\'t be undone.\n\n' +
                             'Your blacklist (kept by rule34.xxx) and your downloaded files are not touched.')) return;
                const keys = typeof GM_listValues === 'function'
                    ? GM_listValues()
                    : STORED_DATA.map(d => d[0]);
                keys.forEach(k => {
                    const def = STORED_DATA.find(d => d[0] === k);
                    deleteStored(k, def ? def[3] : null);
                });
                reloadWithMessage('All Steamy34 data was deleted from this device.');
            }
        });

        render();
        return wrap;
    }

