    // =====================================================================
    //  1. DOWNLOAD WITH TAGS (press B)
    // =====================================================================

    function clean(text) {
        return String(text)
            .replace(/\s+/g, '_')
            .replace(/[<>:"/\\|?*\x00-\x1F]/g, '')
            .replace(/_+/g, '_')
            .replace(/^[._]+|[. _]+$/g, '');
    }

    function formatGroup(tags, fallback) {
        if (!tags.length) return fallback;
        const shown = tags.slice(0, CONFIG.maxTagsPerGroup).map(clean).filter(Boolean);
        if (tags.length > CONFIG.maxTagsPerGroup) shown.push('etc');
        const joined = shown.join(CONFIG.tagJoiner);
        return CONFIG.wrapInBrackets ? `[${joined}]` : joined;
    }

    function getOriginalFilename(url) {
        try {
            const name = decodeURIComponent(new URL(url).pathname.split('/').pop());
            if (name && name.includes('.')) return clean(name);
        } catch (e) {}
        return 'original_file.jpg';
    }

    // "Size: 1920x1080" from a post page's info list -> "1920x1080" ('' if not there)
    function readPostSize(doc) {
        const li = Array.from(doc.querySelectorAll('#stats li')).find(l => /^\s*Size\s*:/i.test(l.textContent));
        const text = li ? li.textContent : ((doc.querySelector('#stats') || {}).textContent || '');
        const m = text.match(/Size:?\s*(\d+)\s*[x×]\s*(\d+)/i);
        return m ? m[1] + 'x' + m[2] : '';
    }

    // File name: Character_Copyright_Artist_Resolution.ext
    //   e.g. amelie_lacroix_overwatch_someartist_1920x1080.jpg
    // tagsByType: optional { copyright: [], character: [], artist: [] }
    // (the popup viewer passes the post's tags; otherwise the page's sidebar is read)
    // size: "1920x1080" (left out if unknown)
    // postId: the post number (bracket style adds it as " #1234567" if fileNamePostId is on)
    function buildFilename(url, tagsByType, size, postId) {
        const tagsOf = type => tagsByType ? (tagsByType[type] || []) : getTags(type);
        if (CONFIG.fileNameStyle === 'custom') return buildPatternFilename(url, tagsOf, size, postId);
        if (CONFIG.fileNameStyle !== 'classic') return buildBracketFilename(url, tagsOf, postId);
        const sep = CONFIG.groupSeparator;
        const prefixParts = [
            formatGroup(tagsOf('character'), 'Unknown_Character'),
            formatGroup(tagsOf('copyright'), 'Unknown_Copyright'),
            formatGroup(tagsOf('artist'), 'Unknown_Artist')
        ];
        const ext = ((getOriginalFilename(url).match(/\.[a-z0-9]{2,5}$/i) || ['.jpg'])[0]).toLowerCase();
        const res = clean(String(size || '').replace(/\s*[×x]\s*/i, 'x'));
        const tail = (res ? sep + res : '') + ext;

        let prefix = prefixParts.join(sep);
        const budget = CONFIG.maxFilenameLength - tail.length;
        if (prefix.length > budget) {
            prefix = prefix.slice(0, Math.max(0, budget)).replace(/[_+\[\]]+$/, '');
        }
        return (prefix || 'rule34') + tail;
    }

    // Bracket style (default): [character, character] [series] [artist].ext
    //   e.g. [judy alvarez, panam palmer] [cyberpunk 2077] [someartist].jpg
    // Spaces instead of _, no resolution. A missing group stays as [] so the
    // order is always clear (only empty groups at the end are left out).
    // Other tools may read these names - keep the format.
    function bracketTag(t) {
        return String(t)
            .replace(/_/g, ' ')
            .replace(/[<>:"/\\|?*\x00-\x1F,]/g, ' ')   // not allowed in file names, comma = separator
            .replace(/\[/g, '(').replace(/\]/g, ')')
            .replace(/\s+/g, ' ')
            .trim()
            .replace(/[. ]+$/, '');
    }

    // Tidier names (Beta 1.7): rule34 lists costume and fan versions as extra characters
    // ("nyl widowmaker", "lifeguard pharah" next to "widowmaker", "pharah") and companies
    // as series ("blizzard entertainment"). Those are left out of the name.
    const NAME_SKIP_SERIES = new Set([
        'blizzard entertainment', 'cd projekt red', 'riot games', 'nintendo', 'capcom', 'square enix', 'bioware',
        'ubisoft', 'naughty dog', 'sega', 'konami', 'bandai namco', 'koei tecmo', 'team ninja', 'respawn entertainment',
        'larian studios', 'activision', 'electronic arts', 'sony', 'playstation', 'xbox', 'microsoft', 'netflix',
        'disney', 'lucasfilm', 'shift up', 'sandfall interactive', 'quantic dream', 'square enix', 'warner bros', 'dc comics'
    ]);

    // "Lara Croft (Survivor)" -> "lara croft", "Baldur's Gate 3" -> "baldurs gate 3"
    function nameKey(t) {
        return String(t).toLowerCase().replace(/\([^)]*\)/g, ' ').replace(/['’`´]/g, '').replace(/&/g, ' and ')
            .replace(/[^a-z0-9]+/g, ' ').trim().replace(/^the (?=\S)/, '');
    }

    function tidyNameGroup(list, type) {
        let keys = list.map(nameKey);
        let out = list.filter((t, i) => keys[i] && keys.indexOf(keys[i]) === i);   // "lara croft (survivor)" after "lara croft"
        if (type === 'copyright') {
            const series = out.filter(t => !NAME_SKIP_SERIES.has(nameKey(t)));
            if (series.length) out = series;                                      // keep a company if it's all there is
        }
        keys = out.map(nameKey);
        if (type === 'character')   // "nyl widowmaker" when "widowmaker" is there
            out = out.filter((t, i) => !keys.some((o, j) => j !== i && keys[i].endsWith(' ' + o)));
        if (type === 'copyright')   // "call of duty warzone" when "call of duty" is there
            out = out.filter((t, i) => !keys.some((o, j) => j !== i && keys[i].startsWith(o + ' ')));
        return out;
    }

    function buildBracketFilename(url, tagsOf, postId) {
        const ext = ((getOriginalFilename(url).match(/\.[a-z0-9]{2,5}$/i) || ['.jpg'])[0]).toLowerCase();
        const idPart = CONFIG.fileNamePostId && /^\d+$/.test(String(postId || '')) ? ' #' + postId : '';
        const groups = ['character', 'copyright', 'artist'].map(type =>
            tidyNameGroup(Array.from(new Set(tagsOf(type).map(bracketTag).filter(Boolean))), type).slice(0, CONFIG.maxTagsPerGroup));
        const make = () => {
            let last = groups.length;
            while (last > 0 && !groups[last - 1].length) last--;
            return groups.slice(0, last).map(g => '[' + g.join(', ') + ']').join(' ');
        };
        let name = make();
        // Too long: drop tags from the end of the biggest group (never cut a name in half)
        while (name.length + idPart.length + ext.length > CONFIG.maxFilenameLength) {
            const big = groups.reduce((a, b) => (b.length > a.length ? b : a));
            if (big.length > 1) big.pop();
            else { name = name.slice(0, CONFIG.maxFilenameLength - idPart.length - ext.length); break; }
            name = make();
        }
        return (name || 'rule34') + idPart + ext;
    }

    // (Beta 3.14) Your own pattern, e.g. "rule34_{id}", "rule34.xxx-{id}", "{id}" or
    // "{artist} - {character} #{id}" - for tools that read the post number from
    // the name (and fetch the tags themselves). The file type is added by itself.
    const FILE_NAME_FIELDS = [
        ['id', 'the post number', '1234567'],
        ['artist', 'artist(s)', 'artist name'],
        ['character', 'character(s)', 'lara croft'],
        ['series', 'series', 'tomb raider'],
        ['tags', 'Steamy34\'s usual name', '[lara croft] [tomb raider] [artist name]'],
        ['size', 'resolution', '1920x1080'],
        ['date', 'today', '2026-11-28'],
        ['hash', 'rule34\'s own file name', 'a1b2c3d4e5f6']
    ];
    function patternName(pattern, values, ext) {
        let name = String(pattern || '').replace(/\{(\w+)\}/g, (m, k) => (k in values ? values[k] : m));
        name = name.replace(/[<>:"/\\|?*\x00-\x1F]/g, ' ').replace(/\s+/g, ' ').trim().replace(/^[. ]+|[. ]+$/g, '');
        const room = Math.max(10, CONFIG.maxFilenameLength - ext.length);
        if (name.length > room) name = name.slice(0, room).replace(/[ ._-]+$/, '');
        return (name || ('rule34_' + (values.id || 'post'))) + ext;
    }
    function buildPatternFilename(url, tagsOf, size, postId) {
        const ext = ((getOriginalFilename(url).match(/\.[a-z0-9]{2,5}$/i) || ['.jpg'])[0]).toLowerCase();
        const group = type => tidyNameGroup(Array.from(new Set(tagsOf(type).map(bracketTag).filter(Boolean))), type).slice(0, CONFIG.maxTagsPerGroup).join(', ');
        const bracket = buildBracketFilename(url, tagsOf, '').replace(/\.[a-z0-9]{2,5}$/i, '');
        const d = new Date();
        const values = {
            id: /^\d+$/.test(String(postId || '')) ? String(postId) : '',
            artist: group('artist'), character: group('character'), series: group('copyright'),
            tags: bracket === 'rule34' ? '' : bracket,
            size: String(size || '').replace(/\s*[×x]\s*/i, 'x'),
            date: d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'),
            hash: getOriginalFilename(url).replace(/\.[a-z0-9]{2,5}$/i, '')
        };
        return patternName(CONFIG.fileNamePattern || 'rule34_{id}', values, ext);
    }
    // What a pattern gives, with example values (Settings shows it live)
    function patternPreview(pattern) {
        return patternName(pattern, Object.fromEntries(FILE_NAME_FIELDS.map(f => [f[0], f[2]])), '.jpg');
    }

    function saveBlob(blob, filename) {
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = filename;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(blobUrl), 60000);
    }

    // ---- Downloaded posts are remembered (post id -> time) ----
    const DOWNLOADED_KEY = 'steamy34_downloaded';
    const DOWNLOADED_LIMIT = 50000;
    let downloaded = null;
    // If reading the stored list ever fails, nothing is saved over it
    // (saving would replace your whole history with an almost empty list)
    let downloadedUnreadable = false;

    function loadDownloaded() {
        try {
            const v = GM_getValue(DOWNLOADED_KEY, {});
            downloadedUnreadable = false;
            downloaded = v && typeof v === 'object' ? v : {};
        } catch (e) { downloaded = {}; downloadedUnreadable = true; }
        return downloaded;
    }

    function isDownloaded(id) {
        if (!id) return false;
        return !!(downloaded || loadDownloaded())[id];
    }

    function postIdFrom(url) {
        try { return new URL(url, location.href).searchParams.get('id') || ''; } catch (e) { return ''; }
    }

    function thumbPostId(thumb) {
        const a = thumb.querySelector('a[href*="id="]');
        return (a && postIdFrom(a.getAttribute('href'))) || (thumb.id || '').replace(/^s/, '');
    }

    // info (optional): { thumb, tags: { artist, character, copyright } } for the history
    function rememberDownload(id, info) {
        if (id) touchedNow.add(id);
        if (!id || !CONFIG.trackDownloads) return;
        addDlHistory(id, info);
        if (info && info.thumb) rememberDlThumb(id, info.thumb); // (the Downloads window shows it)
        loadDownloaded(); // fresh copy (another tab may have added some)
        downloaded[id] = Date.now();
        const ids = Object.keys(downloaded);
        if (ids.length > DOWNLOADED_LIMIT) {
            ids.sort((a, b) => downloaded[a] - downloaded[b])
               .slice(0, ids.length - DOWNLOADED_LIMIT)
               .forEach(k => delete downloaded[k]);
        }
        if (!downloadedUnreadable) GM_setValue(DOWNLOADED_KEY, downloaded);
        bumpMarksRev();
        showDownloadedState();
        dropDownloadedFromCollections([id]);
        // (Beta 3.16) the popup's Download / Downloaded buttons follow at once
        if (popupState && String(postIdFrom(popupState.postUrl)) === String(id)) {
            styleDownloadButton(popupState.overlay.querySelector('.s34-dl-btn'), true);
            try { stylePopupExtras(); } catch (e) {}
        }
    }

    // Change counter for the downloaded / viewed lists (see the focus handler)
    const MARKS_REV_KEY = 'steamy34_marks_rev';
    let marksRevSeen = (() => { try { return GM_getValue(MARKS_REV_KEY, 0); } catch (e) { return 0; } })();
    function bumpMarksRev() {
        marksRevSeen = Date.now();
        GM_setValue(MARKS_REV_KEY, marksRevSeen);
    }

    // Download buttons: "⬇ Download" or "✓ Downloaded"
    // Download button: "⬇ Download [B]" with "Original · maximum resolution"
    // underneath (or "✓ Downloaded" once you have it)
    function downloadButtonHtml() {
        return '<span class="s34-dl-main">⬇ Download</span><kbd></kbd>' +
               '<span class="s34-dl-sub">Original file · maximum resolution</span>';
    }

    function styleDownloadButton(btn, done) {
        if (!btn) return;
        btn.classList.toggle('s34-dl-done', done);
        const main = btn.querySelector('.s34-dl-main');
        const sub = btn.querySelector('.s34-dl-sub');
        if (main) main.textContent = done ? '✓ Downloaded' : '⬇ Download';
        if (sub) sub.textContent = done ? 'Click to download the original again' : 'Original file · maximum resolution';
        btn.title = done ? 'Already downloaded – click to download it again'
                         : 'Download the original file in maximum resolution, with tags in the filename';
    }

    // ---- Viewed posts are remembered too (opened as page or popup) ----
    const VIEWED_KEY = 'steamy34_viewed';
    const VIEWED_LIMIT = 30000;
    let viewed = null;
    let viewedUnreadable = false; // same protection as for downloads

    function loadViewed() {
        try {
            const v = GM_getValue(VIEWED_KEY, {});
            viewedUnreadable = false;
            viewed = v && typeof v === 'object' ? v : {};
        } catch (e) { viewed = {}; viewedUnreadable = true; }
        return viewed;
    }

    function isViewed(id) {
        if (!id) return false;
        return !!(viewed || loadViewed())[id];
    }

    // Posts opened/downloaded since this page loaded: never hidden by the
    // "Hide viewed / downloaded" switches (they'd vanish under your cursor)
    const touchedNow = new Set();

    // Viewed posts are noted in memory right away and saved a moment later
    // in one go (saving the whole list on every click was slow)
    const viewedPending = {};
    let viewedSaveTimer = null;

    // (Beta 3.8) "Mark all as downloaded" on the favourites page: only the
    // mark, no file and no Stats entry. Resolves the ids that were new.
    function markDownloadedOnly(ids) {
        if (!CONFIG.trackDownloads) return [];
        loadDownloaded();
        const fresh = ids.filter(id => id && !downloaded[id]);
        fresh.forEach(id => { downloaded[id] = Date.now(); touchedNow.add(id); });
        if (fresh.length && !downloadedUnreadable) { GM_setValue(DOWNLOADED_KEY, downloaded); bumpMarksRev(); }
        if (fresh.length) dropDownloadedFromCollections(fresh);
        return fresh;
    }
    function unmarkDownloaded(ids) {
        loadDownloaded();
        ids.forEach(id => delete downloaded[id]);
        if (!downloadedUnreadable) { GM_setValue(DOWNLOADED_KEY, downloaded); bumpMarksRev(); }
    }

    // Downloaded posts count as viewed - unless you switch their eye off
    // (Beta 3.8): those few are kept here
    const UNSEEN_KEY = 'steamy34_unseen';
    function getUnseen() { try { const v = GM_getValue(UNSEEN_KEY, {}); return v && typeof v === 'object' ? v : {}; } catch (e) { return {}; } }
    function setUnseen(id, on) {
        const u = getUnseen();
        if (!!u[id] === on) return;
        if (on) u[id] = Date.now(); else delete u[id];
        GM_setValue(UNSEEN_KEY, u);
    }
    function isSeen(id, done) { return isViewed(id) || (done && !getUnseen()[id]); }

    // The eye on thumbnails: viewed on / off (also for downloaded posts)
    function setThumbViewed(id, on) {
        if (!id) return;
        if (on) { setUnseen(id, false); rememberView(id); saveViewed(); }
        else { forgetView(id); if (isDownloaded(id)) setUnseen(id, true); }
    }

    function rememberView(id) {
        if (id) touchedNow.add(id);
        if (!id || !CONFIG.trackViewed) return;
        if (getUnseen()[id]) setUnseen(id, false);
        if (!viewed) loadViewed();
        viewed[id] = viewedPending[id] = Date.now();
        clearTimeout(viewedSaveTimer);
        viewedSaveTimer = setTimeout(saveViewed, 1500);
    }

    function saveViewed() {
        viewedSaveTimer = null;
        if (!Object.keys(viewedPending).length) return;
        loadViewed(); // fresh copy: another tab may have added some
        Object.assign(viewed, viewedPending);
        Object.keys(viewedPending).forEach(k => delete viewedPending[k]);
        const ids = Object.keys(viewed);
        if (ids.length > VIEWED_LIMIT) {
            ids.sort((a, b) => viewed[a] - viewed[b])
               .slice(0, ids.length - VIEWED_LIMIT)
               .forEach(k => delete viewed[k]);
        }
        if (!viewedUnreadable) GM_setValue(VIEWED_KEY, viewed);
        bumpMarksRev();
    }
    // (Beta 3.7.4) The eye button on thumbnails: "not viewed after all"
    function forgetView(id) {
        if (!id) return;
        delete viewedPending[id];
        loadViewed();
        Object.assign(viewed, viewedPending);
        delete viewed[id];
        if (!viewedUnreadable) GM_setValue(VIEWED_KEY, viewed);
        bumpMarksRev();
    }

    // Don't lose the last few when the page is left
    window.addEventListener('pagehide', () => { if (viewedSaveTimer) { clearTimeout(viewedSaveTimer); saveViewed(); } });

    // Marks every place that shows a post: thumbnails, popup, post page.
    // Thumbnails: green ✓ = downloaded, eye = viewed (and slightly faded).
    // thumbs: only these (e.g. the one just opened); default: all on the page
    function showDownloadedState(thumbs) {
        if (!CONFIG.trackDownloads && !CONFIG.trackViewed) return;
        (thumbs || document.querySelectorAll('.image-list span.thumb')).forEach(thumb => {
            if (!thumb) return;
            const id = thumb._s34Id || (thumb._s34Id = thumbPostId(thumb));
            const done = CONFIG.trackDownloads && isDownloaded(id);
            const seen = CONFIG.trackViewed && isSeen(id, done);
            thumb.classList.toggle('s34-was-downloaded', done);
            thumb.classList.toggle('s34-was-viewed', seen);
            thumb.classList.toggle('s34-touched-now', touchedNow.has(id));
            // (Beta 3.8) The ⬇ and 👁 buttons show the state themselves (green /
            // blue, and they stay while not hovering) - the corner mark is only
            // drawn for what has no button (switched off, or phones: no hover)
            const dlBtn = thumb.querySelector('.s34-tdl'), eyeBtn = thumb.querySelector('.s34-tseen');
            styleSeenButton(eyeBtn, seen);
            styleDlThumbButton(dlBtn, done);
            const fly = thumb.querySelector('.s34-tseen-fly');
            if (fly) {
                fly.querySelector('[data-m="viewed"]').classList.toggle('s34-on', seen);
                const fd = fly.querySelector('[data-m="dl"]');
                if (fd) fd.classList.toggle('s34-on', done);
            }
            const usable = b => !!b && !thumbButtonsHidden();
            let want = done ? 'dl' : seen ? 'seen' : '';
            if (want === 'dl' && usable(dlBtn)) want = '';
            if (want === 'seen' && usable(eyeBtn)) want = '';
            let mark = thumb.querySelector('.s34-dl-mark');
            if (!want || !CONFIG.thumbMarks) { if (mark) mark.remove(); return; }
            if (!mark) {
                mark = document.createElement('span');
                // Clicking the icon opens the post like the thumbnail does -
                // the "viewed" eye undoes "viewed" instead (Beta 3.7.4: people
                // clicked it to un-see a post, which opened it = viewed again)
                mark.addEventListener('click', e => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (mark.dataset.kind === 'seen') {
                        const pid = thumbPostId(thumb);
                        setThumbViewed(pid, false);
                        showDownloadedState([thumb]);
                        showToast('Marked as not viewed', 'Undo', () => { setThumbViewed(pid, true); showDownloadedState([thumb]); });
                        return;
                    }
                    const a = thumb.querySelector('a[href]');
                    if (a) a.click();
                });
                thumb.appendChild(mark);
            }
            if (mark.dataset.kind !== want) {
                mark.dataset.kind = want;
                mark.className = 's34-dl-mark' + (want === 'seen' ? ' s34-seen-mark' : '');
                // Download icon (arrow into a tray) / eye icon
                mark.innerHTML = want === 'dl'
                    ? '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M4 17v3h16v-3"/></svg>'
                    : '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>';
                mark.dataset.label = want === 'dl' ? 'Downloaded' : 'Viewed – click to undo';
                mark.title = want === 'dl' ? 'Downloaded – click to open' : 'Viewed – click to mark as not viewed';
            }
        });
        if (!CONFIG.trackDownloads) return;
        if (isPostView) {
            styleDownloadButton(document.querySelector('.s34-dl-btn:not([data-act])'), isDownloaded(params.get('id')));
        }
        if (popupState) {
            styleDownloadButton(popupState.overlay.querySelector('.s34-dl-btn'), isDownloaded(postIdFrom(popupState.postUrl)));
        }
    }

    // Downloads in another tab show up here when you come back
    // ...but only if another tab actually changed something: a tiny "change
    // counter" is compared first, the big lists are only read when it moved.
    window.addEventListener('focus', () => {
        if (!CONFIG.trackDownloads && !CONFIG.trackViewed) return;
        let rev = 0;
        try { rev = GM_getValue(MARKS_REV_KEY, 0); } catch (e) {}
        if (rev === marksRevSeen) return;
        marksRevSeen = rev;
        loadDownloaded();
        loadViewed();
        showDownloadedState();
    });

    // Save a file under the given name. Resolves true/false.
    // First the proven way: load the file, then save it under the tag name
    // (works everywhere, incl. private windows and phones). Only if that
    // fails, Tampermonkey's own downloader gets a try - it can't always
    // keep our file name, so it's just the backup. Both give up after a
    // while instead of hanging forever.
    const DL_TIMEOUT_MS = 2 * 60000;       // pictures
    const DL_BIG_TIMEOUT_MS = 10 * 60000;  // videos (big files take a while)

    // ---- Own download folder (Settings → Downloads → "Choose folder…") ----
    // The browser's folder picker (File System Access) lets Steamy34 write
    // straight into any folder you pick – e.g. Eagle's watch folder. Works in
    // Chrome / Edge / Brave on computers (Brave: brave://flags/#file-system-access-api).
    // The folder itself is kept in this site's IndexedDB (the browser can't
    // store it anywhere else); its name in Tampermonkey (FOLDER_NAME_KEY).
    // The browser asks once per session whether Steamy34 may write there.
    const FOLDER_NAME_KEY = 'steamy34_dlfolder';
    let folderHandle;   // undefined = not loaded yet, null = none

    function folderPickerAvailable() {
        return typeof window.showDirectoryPicker === 'function' && !isPhoneLayout();
    }

    function folderDb() {
        return new Promise((resolve, reject) => {
            const req = indexedDB.open('steamy34', 1);
            req.onupgradeneeded = () => req.result.createObjectStore('handles');
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });
    }

    async function folderDbDo(mode, fn) {
        const db = await folderDb();
        return new Promise((resolve, reject) => {
            const req = fn(db.transaction('handles', mode).objectStore('handles'));
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });
    }

    async function getFolderHandle() {
        if (!folderPickerAvailable() || !GM_getValue(FOLDER_NAME_KEY, '')) return null;
        if (folderHandle === undefined) {
            try { folderHandle = (await folderDbDo('readonly', s => s.get('dlFolder'))) || null; } catch (e) { folderHandle = null; }
        }
        return folderHandle;
    }

    // Opens the browser's folder picker. Resolves the folder name (throws if cancelled).
    async function chooseDownloadFolder() {
        const h = await window.showDirectoryPicker({ id: 'steamy34-downloads', mode: 'readwrite' });
        await folderDbDo('readwrite', s => s.put(h, 'dlFolder'));
        folderHandle = h;
        GM_setValue(FOLDER_NAME_KEY, h.name);
        return h.name;
    }

    function clearDownloadFolder() {
        folderHandle = null;
        try { GM_deleteValue(FOLDER_NAME_KEY); } catch (e) {}
        folderDbDo('readwrite', s => s.delete('dlFolder')).catch(() => {});
    }

    // (Beta 3.16.4) Right at the click / key press: the browser only shows its
    // "allow editing?" question within a few seconds of it - the popup used to
    // load the post page first, the question was refused silently and the file
    // went to Downloads. saveUrlAs waits for this answer.
    let folderAsk = null;
    function primeDownloadFolder() {
        const go = h => (h ? folderAllowed(h, true) : false);
        folderAsk = (folderHandle !== undefined ? Promise.resolve(go(folderHandle)) : getFolderHandle().then(go)).catch(() => false);
        return folderAsk;
    }
    setTimeout(() => { getFolderHandle().catch(() => {}); }, 0);   // (loaded early, so the question can come at once)

    // ask: show the browser's "allow editing?" question if needed (only works
    // right after a key press / click – which a download always starts with)
    async function folderAllowed(h, ask) {
        const opts = { mode: 'readwrite' };
        let state = 'denied';
        try { state = await h.queryPermission(opts); } catch (e) {}
        if (state === 'prompt' && ask) {
            try { state = await h.requestPermission(opts); } catch (e) {}
        }
        return state === 'granted';
    }

    // Writes the file; an existing name gets " (1)", " (2)" … Resolves the name used.
    async function writeToFolder(h, filename, blob) {
        const dot = filename.lastIndexOf('.');
        const base = dot > 0 ? filename.slice(0, dot) : filename;
        const ext = dot > 0 ? filename.slice(dot) : '';
        let name = filename;
        for (let i = 1; i < 500; i++) {
            try {
                await h.getFileHandle(name);              // exists -> try the next number
            } catch (e) {
                if (e && e.name === 'NotFoundError') break;
                if (!e || e.name !== 'TypeMismatchError') throw e;   // a folder with that name: next number
            }
            name = base + ' (' + i + ')' + ext;
        }
        const file = await h.getFileHandle(name, { create: true });
        const out = await file.createWritable();
        await out.write(blob);
        await out.close();
        return name;
    }

    // The "Download folder" row in Settings → Downloads
    function buildFolderControl(ctl, id) {
        ctl.textContent = '';
        if (!folderPickerAvailable()) {
            const note = document.createElement('small');
            note.className = 's34-folder-note';
            note.textContent = isPhoneLayout() ? 'Not on phones – downloads go to Downloads.'
                : navigator.brave ? 'Brave: turn on brave://flags/#file-system-access-api, restart Brave and reload this page.'
                : 'Not available in this browser (works in Chrome, Edge and Brave) – downloads go to Downloads.';
            ctl.appendChild(note);
            return;
        }
        const name = GM_getValue(FOLDER_NAME_KEY, '');
        const label = document.createElement('span');
        label.className = 's34-folder-name';
        label.textContent = name ? '📁 ' + name : 'Downloads (normal)';
        label.title = name ? 'Downloads are written into this folder' : 'No own folder – files go to your browser\'s download folder';
        const pick = document.createElement('button');
        pick.type = 'button';
        pick.id = id;
        pick.className = 's34-set-btn';
        pick.textContent = name ? 'Change…' : 'Choose folder…';
        pick.addEventListener('click', () => {
            chooseDownloadFolder()
                .then(n => { showToast('Downloads now go into "' + n + '".'); buildFolderControl(ctl, id); })
                .catch(e => { if (!e || e.name !== 'AbortError') showToast('Couldn\'t use that folder: ' + (e && e.message || e)); });
        });
        ctl.append(label, pick);
        if (name) {
            const clear = document.createElement('button');
            clear.type = 'button';
            clear.className = 's34-set-btn';
            clear.textContent = 'Remove';
            clear.title = 'Back to the normal Downloads folder';
            clear.addEventListener('click', () => { clearDownloadFolder(); showToast('Downloads go to Downloads again.'); buildFolderControl(ctl, id); });
            ctl.appendChild(clear);
        }
    }

    let folderAskShown = false;

    // (Beta 3.9.2) opts.artist: with "A subfolder per artist", files go into folder / artist /
    async function saveUrlAs(url, filename, referer, opts = {}) {
        const video = /\.(mp4|webm|mkv|mov)(\?|$)/i.test(url);
        const timeout = video ? DL_BIG_TIMEOUT_MS : DL_TIMEOUT_MS;
        if (folderAsk) await folderAsk;   // (the question asked at the click)
        const folder = await getFolderHandle().catch(() => null);
        if (folder) {
            // Ask now, while the key press still counts
            if (await folderAllowed(folder, true)) {
                const blob = await fetchBlob(url, referer, timeout);
                if (!blob) return false;
                try {
                    let dir = folder;
                    if (CONFIG.dlArtistFolders) {
                        const sub = String(opts.artist || 'unknown artist').replace(/_/g, ' ').replace(/[\\/:*?"<>|]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 80) || 'unknown artist';
                        dir = await folder.getDirectoryHandle(sub, { create: true });
                    }
                    const name = await writeToFolder(dir, filename, blob);
                    console.log('[Steamy34] Saved into folder "' + folder.name + '":', name);
                    return true;
                } catch (e) {
                    console.error('[Steamy34] Writing into the folder failed:', e);
                    showToast('Couldn\'t write into the folder "' + folder.name + '" (' + (e && e.message || e) + ') – saved to Downloads instead.');
                    try { saveBlob(blob, filename); return true; } catch (e2) { return false; }
                }
            }
            if (!folderAskShown || Date.now() - folderAskShown > 60000) {   // (3.16.4: not just once per page)
                folderAskShown = Date.now();
                showToast('Steamy34 may not write into "' + folder.name + '" yet – this one went to Downloads.', 'Allow folder', () => {
                    folderAllowed(folder, true).then(ok => showToast(ok ? 'Folder allowed – the next downloads go into "' + folder.name + '".' : 'Not allowed – downloads keep going to Downloads.'));
                }, 15000);
            }
        }
        return saveViaBlob(url, filename, referer, timeout).then(ok => {
            if (ok || typeof GM_download !== 'function') return ok;
            console.log('[Steamy34] Trying Tampermonkey\'s downloader instead…');
            return saveViaDownloader(url, filename, referer);
        });
    }

    // Tampermonkey's downloader (the backup)
    function saveViaDownloader(url, filename, referer) {
        return new Promise(resolve => {
            let done = false;
            let task = null;
            const finish = (ok, why) => {
                if (done) return;
                done = true;
                clearTimeout(timer);
                if (!ok) console.error('[Steamy34] Tampermonkey\'s downloader failed (' + why + '):', filename, url);
                resolve(ok);
            };
            const timer = setTimeout(() => {
                try { if (task && task.abort) task.abort(); } catch (e) {}
                finish(false, 'took too long');
            }, DL_BIG_TIMEOUT_MS);
            try {
                const opts = {
                    url,
                    name: filename,
                    saveAs: false,
                    onload: () => finish(true),
                    onerror: e => {
                        const err = e && e.error ? String(e.error) : '';
                        const det = e && e.details ? (typeof e.details === 'string' ? e.details : JSON.stringify(e.details)) : '';
                        finish(false, [err, det].filter(Boolean).join(': ') || 'error');
                        if (/not_whitelisted/i.test(err + det)) explainBlockedDownload('ext');
                        else if (/not_permitted|not permitted|refused|blacklist/i.test(err + det)) explainBlockedDownload('connect');
                    },
                    ontimeout: () => finish(false, 'timeout'),
                    headers: { Referer: referer || location.href }
                };
                task = GM_download(opts);
            } catch (e) {
                finish(false, 'not available: ' + e.message);
            }
        });
    }

    // (Beta 3.13) Tampermonkey said no – tell exactly what to change (once per page).
    // Before, only "Download failed" showed and it took people long to find out.
    let blockedExplained = false;
    function explainBlockedDownload(kind) {
        if (blockedExplained) return;
        blockedExplained = true;
        showToast(kind === 'ext' ? 'Tampermonkey blocked this file type – it needs one setting.' : 'Tampermonkey blocked the download – Steamy34 needs your OK for rule34\'s picture server.', 'How to fix', () => {
            const steps = kind === 'ext'
                ? ['Open the Tampermonkey menu → Dashboard → the Settings tab.', 'Set "Config mode" (at the top) to Advanced.', 'Find "Downloads BETA" → "Whitelisted File Extensions" and add the type (e.g. .jpg .jpeg .png .gif .webp .mp4 .webm), one per line.', 'Save, reload rule34 – done.']
                : ['Next time Tampermonkey asks "A userscript wants to access a cross-origin resource", choose "Always allow domain" (or "Always allow all domains").', 'Said no before? Tampermonkey menu → Dashboard → Steamy34 → its Settings tab → "XHR Security": take rule34.xxx out of the blacklist, or add *.rule34.xxx to "User domain whitelist".', 'Save, reload rule34 – downloads work again.'];
            const overlay = document.createElement('div');
            overlay.className = 's34-overlay s34-confirm-overlay';
            overlay.innerHTML = `<div class="s34-confirm" role="dialog" aria-modal="true"><div class="s34-confirm-icon">⬇</div>
                <div class="s34-confirm-title">Let Tampermonkey download</div>
                <ol class="s34-confirm-text" style="text-align:left;margin:0;padding-left:20px">${steps.map(s => '<li></li>').join('')}</ol>
                <div class="s34-confirm-foot"><button type="button" class="s34-btn s34-primary" data-act="ok">Got it</button></div></div>`;
            overlay.querySelectorAll('li').forEach((li, i) => { li.textContent = steps[i]; });
            const close = () => overlay.remove();
            overlay.addEventListener('click', e => { if (e.target === overlay || e.target.closest('[data-act="ok"]')) close(); });
            document.body.appendChild(overlay);
        }, 20000);
    }

    // Load the whole file (resolves the Blob, or null)
    function fetchBlob(url, referer, timeout) {
        return new Promise(resolve => {
            GM_xmlhttpRequest({
                method: 'GET',
                url,
                responseType: 'blob',
                headers: { Referer: referer || location.href },
                timeout: timeout || DL_TIMEOUT_MS,
                onload: res => {
                    if (res.status < 200 || res.status >= 300 || !res.response) {
                        console.error('[Steamy34] Download failed: HTTP ' + res.status, url);
                        resolve(null);
                        return;
                    }
                    resolve(res.response);
                },
                onerror: res => {
                    const why = String((res && (res.error || res.statusText || res.responseText)) || '');
                    console.error('[Steamy34] Download failed: no answer', url, why);
                    if (/refused|blacklist|not a part of the @connect|not permitted|forbidden|not allowed/i.test(why)) explainBlockedDownload('connect');
                    resolve(null);
                },
                ontimeout: () => { console.error('[Steamy34] Download failed: took too long', url); resolve(null); }
            });
        });
    }

    // Load the whole file, then save it under our name (into Downloads)
    function saveViaBlob(url, filename, referer, timeout) {
        return fetchBlob(url, referer, timeout).then(blob => {
            if (!blob) return false;
            try {
                saveBlob(blob, filename);
                return true;
            } catch (e) {
                console.error('[Steamy34] Saving the file failed:', e);
                return false;
            }
        });
    }

    // Without arguments: downloads the post shown on this page.
    // With (url, tagsByType, postId): downloads that file (used by the popup viewer).
    // "You already downloaded this" - asks before downloading a post again.
    // Resolves true (download) or false (cancel).
    function confirmRedownload() {
        return new Promise(resolve => {
            const overlay = document.createElement('div');
            overlay.className = 's34-overlay s34-confirm-overlay';
            overlay.innerHTML = `
                <div class="s34-confirm" role="dialog" aria-modal="true">
                    <div class="s34-confirm-icon">⬇</div>
                    <div class="s34-confirm-title">Already downloaded</div>
                    <div class="s34-confirm-text">You already downloaded this post. Are you sure you want to download it again?</div>
                    <label class="s34-confirm-check"><input type="checkbox"> Don't show this again</label>
                    <div class="s34-confirm-foot">
                        <button type="button" class="s34-btn" data-act="no">Cancel</button>
                        <button type="button" class="s34-btn s34-primary" data-act="yes">Download again</button>
                    </div>
                </div>`;
            const check = overlay.querySelector('input[type="checkbox"]');

            let done = false;
            function finish(ok) {
                if (done) return;
                done = true;
                document.removeEventListener('keydown', onKey, true);
                overlay.remove();
                if (check.checked) {
                    saveSettingsNow({ confirmRedownload: false });
                    showToast('Won\'t ask again – turn it back on in Settings → Download.');
                }
                resolve(ok);
            }
            function onKey(e) {
                if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); finish(false); }
                else if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); finish(true); }
                else if (e.code === CONFIG.downloadKey) { e.preventDefault(); e.stopPropagation(); } // no double trigger
            }
            overlay.addEventListener('click', e => {
                const act = e.target.closest('[data-act]');
                if (act) finish(act.dataset.act === 'yes');
                else if (e.target === overlay) finish(false);
            });
            document.addEventListener('keydown', onKey, true);
            document.body.appendChild(overlay);
            overlay.querySelector('[data-act="yes"]').focus();
        });
    }

    // size: the post's resolution ("1920x1080") when called from the popup
    // thumbSrc: its thumbnail for the Downloads window (taken when the key was
    // pressed - the popup may be on another post by the time the file arrives)
    async function downloadOriginal(givenUrl, tagsByType, postId, confirmed, size, thumbSrc) {
        if (typeof givenUrl !== 'string') givenUrl = null; // called as a click handler
        primeDownloadFolder();
        const url = givenUrl || getOriginalUrl();
        if (!url) {
            showToast('Couldn\'t find the original file on this page – try again once it has loaded.', null, null, 8000);
            return;
        }

        const id = givenUrl ? postId : params.get('id');
        if (!confirmed && CONFIG.confirmRedownload && CONFIG.trackDownloads && isDownloaded(id)) {
            if (document.querySelector('.s34-confirm-overlay')) return; // already asking
            if (!(await confirmRedownload())) return;
        }
        if (!givenUrl) size = readPostSize(document); // post page: from its own info list
        const filename = buildFilename(url, givenUrl ? tagsByType : undefined, size, id);
        // Tags of the download (for Stats)
        const historyInfo = {
            tags: givenUrl ? (tagsByType || {}) : {
                artist: getTags('artist'), character: getTags('character'), copyright: getTags('copyright')
            },
            thumb: thumbSrc != null ? thumbSrc : givenUrl ? popupThumbSrc(popupState) : ((document.querySelector('#image') || {}).src || '')
        };
        showToast('Downloading ' + filename.slice(0, 80) + (filename.length > 80 ? '…' : ''));
        console.log('[Steamy34] Downloading:', url, '→', filename);

        // Same saving as batch downloads: time limit, big files via the downloader
        const ok = await saveUrlAs(url, filename, location.href, { artist: ((historyInfo.tags || {}).artist || [])[0] });
        if (ok) {
            rememberDownload(id, historyInfo);
            console.log('[Steamy34] Download complete:', filename);
        } else {
            showToast('Download failed – the server didn\'t answer in time or refused it. Try again in a moment.',
                      'Retry', () => downloadOriginal(url, historyInfo.tags, id, true, size, historyInfo.thumb), 12000);
        }
    }

    // "KeyB" -> "B", "Digit5" -> "5", "F2" -> "F2"
    function keyLabel(code) {
        return String(code || '').replace(/^Key/, '').replace(/^Digit/, '').replace(/^Numpad/, 'Num ');
    }

    // Download hotkey: on a post page, or while the popup viewer is open
    document.addEventListener('keydown', function (event) {
        if (event.code !== CONFIG.downloadKey || event.ctrlKey || event.altKey ||
            event.metaKey || event.shiftKey || event.repeat) return;

        const t = event.target;
        if (t.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName)) return;
        if (document.querySelector('.s34-overlay:not(.s34-pv-overlay):not(.s34-under-popup)')) return; // settings etc. open

        if (popupState) {
            event.preventDefault();
            popupDownload();
        } else if (isPostView) {
            event.preventDefault();
            downloadOriginal();
        }
    }, true);

