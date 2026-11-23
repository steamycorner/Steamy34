    // =====================================================================
    //  12. EXTRAS: favourites, hover info,
    //      sidebar switches (hide viewed/downloaded, size slider), batch
    //      download, video options, backup, popup preload & zoom
    // =====================================================================

    const pause = ms => new Promise(r => setTimeout(r, ms));

    function allThumbs() {
        return Array.from(document.querySelectorAll('.image-list span.thumb'));
    }

    // ---- Favourites (the site's own favourites list; needs a login) ----
    const FAVS_KEY = 'steamy34_favs';
    const HEART_SVG = '<svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M12 20.5s-7.5-4.6-9.4-9.3C1.2 7.6 3.6 4 7.1 4c2.1 0 3.6 1.1 4.9 2.8C13.3 5.1 14.8 4 16.9 4c3.5 0 5.9 3.6 4.5 7.2-1.9 4.7-9.4 9.3-9.4 9.3z"/></svg>';

    function getFavs() {
        try {
            const v = GM_getValue(FAVS_KEY, {});
            return v && typeof v === 'object' ? v : {};
        } catch (e) { return {}; }
    }

    function isFav(id) {
        return !!(id && getFavs()[id]);
    }

    function rememberFav(id) {
        const f = getFavs();
        f[id] = Date.now();
        GM_setValue(FAVS_KEY, f);
    }

    // opts: { quiet: no "Added" message, kind: page-queue kind (collections use 'batch') }
    async function addFavourite(id, opts = {}) {
        if (!id) return false;
        try {
            let r;
            try { r = await loadPage('public/addfav.php?id=' + encodeURIComponent(id), opts.kind || 'action'); }
            catch (e) { if (e.cloudflare) { showToast('Favourite not saved – solve the quick check first.', 'Solve check', openCloudflarePanel, 10000); return false; } throw e; }
            const text = r.html.trim();
            if (!r.ok) throw new Error('HTTP ' + r.status);
            if (text === '2') {
                showToast('Log in to rule34.xxx to use favourites.');
                return false;
            }
            rememberFav(id);
            if (!opts.quiet) showToast(text === '1' ? 'Already in your favourites ♥' : 'Added to your favourites ♥');
            return true;
        } catch (e) {
            showToast('Could not add to favourites (' + (e.message || e) + ').');
            return false;
        }
    }

    function forgetFav(id) {
        const f = getFavs();
        delete f[id];
        GM_setValue(FAVS_KEY, f);
    }

    // Beta 3.7: ♥ again = remove it (the site's own "Remove", from its
    // favourites page: a plain address that removes it and shows the list)
    async function removeFavourite(id, opts = {}) {
        if (!id) return false;
        try {
            let r;
            try { r = await loadPage('index.php?page=favorites&s=delete&id=' + encodeURIComponent(id) + '&return_pid=0', opts.kind || 'action'); }
            catch (e) { if (e.cloudflare) { showToast('Favourite not removed – solve the quick check first.', 'Solve check', openCloudflarePanel, 10000); return false; } throw e; }
            if (!r.ok) throw new Error('HTTP ' + r.status);
            if (/[?&]s=login\b/.test(r.url || '') || /name=["']?pass(word)?["']?/i.test(r.html)) {
                showToast('Log in to rule34.xxx to use favourites.');
                return false;
            }
            forgetFav(id);
            return true;
        } catch (e) {
            showToast('Could not remove the favourite (' + (e.message || e) + ').');
            return false;
        }
    }

    // Every ♥ for this post on the page (thumbnails, the popup) shows the state
    function showFavState(id, faved) {
        allThumbs().filter(t => String(thumbPostId(t)) === String(id)).forEach(t => {
            styleFavButton(t.querySelector('.s34-fav-btn'), faved, false);
            t.classList.toggle('s34-unfaved', !faved && t.classList.contains('s34-on-favpage'));
        });
        if (popupState && String(postIdFrom(popupState.postUrl)) === String(id)) {
            styleFavButton(popupState.overlay.querySelector('.s34-pv-fav'), faved, true);
        }
    }

    // One click on a ♥: favourite - or, when it already is one, remove it
    // (with Undo, so a slip costs nothing)
    async function toggleFavourite(id, btn) {
        if (!id || (btn && btn.classList.contains('s34-busy'))) return;
        const faved = isFav(id) || (btn && btn.classList.contains('s34-faved'));
        setBusy(btn, true);
        const ok = faved ? await removeFavourite(id) : await addFavourite(id);
        setBusy(btn, false);
        if (!ok) return;
        showFavState(id, !faved);
        if (faved) {
            const gone = unfavouritedHere(id); // collections on all devices: out of its collections too
            const names = Array.from(new Set(gone.map(g => g.name)));
            showCollectionChips();
            showToast(names.length ? `Removed from your favourites and from ${namesText(names)}` : 'Removed from your favourites', 'Undo', async () => {
                if (await addFavourite(id, { quiet: !!gone.length })) {
                    showFavState(id, true);
                    if (gone.length) { restoreToCollections(gone); showCollectionChips(); showToast('Back in your favourites and collections ♥'); }
                }
            });
        }
    }

    // Your own favourites page: every post there is a favourite (the site
    // shows "Remove" only on your own list) - the ♥ is filled and removes it
    // right there; the site's "Remove" links step aside (CSS in 06a, so
    // there's no flash of them)
    function setupFavouritesPage() {
        if (!CONFIG.favButtons || params.get('page') !== 'favorites') return;
        const removes = Array.from(document.querySelectorAll('.image-list a[onclick*="s=delete"]'));
        removes.forEach(a => {
            const m = (a.getAttribute('onclick') || '').match(/[?&;]id=(\d+)/);
            const cell = a.parentElement;
            const thumb = cell && cell.querySelector('span.thumb');
            if (!m || !thumb) return;
            if (!isFav(m[1])) rememberFav(m[1]);
            thumb.classList.add('s34-on-favpage');
            a.classList.add('s34-site-remove');
            const br = a.previousElementSibling;
            if (br && br.tagName === 'BR') br.classList.add('s34-site-remove');
            styleFavButton(thumb.querySelector('.s34-fav-btn'), true, false);
        });
    }

    // Loading circle on a button while the site answers (♥ favourite, ▲ vote)
    function setBusy(btn, busy) {
        if (!btn) return;
        btn.classList.toggle('s34-busy', busy);
        btn.disabled = busy;
        let spin = btn.querySelector('.s34-spin');
        if (busy && !spin) {
            spin = document.createElement('span');
            spin.className = 's34-spin';
            btn.appendChild(spin);
        } else if (!busy && spin) {
            spin.remove();
        }
    }

    function styleFavButton(btn, faved, withText) {
        if (!btn) return;
        btn.classList.toggle('s34-faved', faved);
        btn.innerHTML = HEART_SVG + (withText ? `<span>${faved ? 'In favourites' : 'Favourite'}</span>` : '');
        btn.title = faved ? 'In your favourites – click to remove' : 'Add to your favourites';
    }

    // ---- (Beta 3.7.4) Download and viewed buttons next to the ♥ on thumbnails ----
    const TB_DL_SVG = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M4 17v3h16v-3"/></svg>';
    const TB_EYE_SVG = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>';

    // On = blue and always there; off = only while hovering
    function styleSeenButton(btn, seen) {
        if (!btn || btn.dataset.seen === String(seen)) return;
        btn.dataset.seen = String(seen);
        btn.classList.toggle('s34-on', seen);
        if (!btn.firstChild) btn.innerHTML = TB_EYE_SVG;
        // (no tooltip: the strip next to it says it - a tooltip covered it)
        btn.setAttribute('aria-label', seen ? 'Viewed – click to mark as not viewed' : 'Mark as viewed');
    }

    // Collection button: lit (amber) and always there when the post is in a collection
    function styleCollThumbButton(btn, id) {
        if (!btn) return;
        const names = typeof collectionNamesOf === 'function' ? collectionNamesOf(id) : [];
        btn.classList.toggle('s34-on', names.length > 0);
        btn.title = names.length ? 'In ' + names.join(', ') + ' – click to change' : 'Save to a collection';
        btn.setAttribute('aria-label', btn.title);
    }
    function refreshCollThumbButtons() {
        document.querySelectorAll('.s34-tcoll').forEach(b => { const t = b.closest('span.thumb'); if (t) styleCollThumbButton(b, thumbPostId(t)); });
    }

    // On = green and always there
    function styleDlThumbButton(btn, done) {
        if (!btn || btn.dataset.done === String(done)) return;
        btn.dataset.done = String(done);
        btn.classList.toggle('s34-on', done);
        btn.title = done ? 'Downloaded – click to download it again' : 'Download';
        btn.setAttribute('aria-label', btn.title);
    }

    // The buttons need a mouse: phones (and very narrow windows) keep the corner marks
    const THUMB_NO_HOVER = '(hover: none), (max-width: 760px), (pointer: coarse) and (max-width: 1000px)';
    function thumbButtonsHidden() { try { return window.matchMedia(THUMB_NO_HOVER).matches; } catch (e) { return false; } }

    async function thumbDownload(thumb, btn) {
        if (btn.classList.contains('s34-busy')) return;
        const id = thumbPostId(thumb);
        if (CONFIG.confirmRedownload && CONFIG.trackDownloads && isDownloaded(id) && !(await confirmRedownload())) return;
        // Ask for the download folder now, while the click still counts
        const folder = await getFolderHandle().catch(() => null);
        if (folder) await folderAllowed(folder, true);
        setBusy(btn, true);
        let ok = false;
        try { ok = await downloadThumb(thumb, 'popup'); } catch (e) { console.warn('[Steamy34] Thumbnail download failed:', e); }
        setBusy(btn, false);
        showDownloadedState([thumb]);
        showToast(ok ? 'Downloaded' : 'The download didn\'t work – try it in the popup.');
    }

    // (Beta 3.9.4) Phones have no hover: hold a thumbnail for a moment and its
    // buttons come up as a sheet (favourite, download, viewed, collection, later)
    let longPressDone = 0;
    function setupThumbLongPress() {
        if (!thumbButtonsHidden()) return; // (computers: the hover buttons)
        let timer = null, start = null;
        document.addEventListener('touchstart', e => {
            const t = e.target.closest && e.target.closest('.image-list span.thumb');
            if (!t || e.touches.length !== 1) return;
            start = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            clearTimeout(timer);
            timer = setTimeout(() => { longPressDone = Date.now(); try { navigator.vibrate && navigator.vibrate(12); } catch (err) {} openThumbSheet(t); }, 480);
        }, { passive: true });
        document.addEventListener('touchmove', e => {
            if (!start || !e.touches[0]) return;
            if (Math.abs(e.touches[0].clientX - start.x) + Math.abs(e.touches[0].clientY - start.y) > 12) clearTimeout(timer);
        }, { passive: true });
        document.addEventListener('touchend', () => clearTimeout(timer), { passive: true });
        // the tap that ends a long press doesn't open the post; no browser menu either
        document.addEventListener('click', e => {
            if (Date.now() - longPressDone < 700 && e.target.closest && e.target.closest('.image-list span.thumb')) { e.preventDefault(); e.stopImmediatePropagation(); }
        }, true);
        document.addEventListener('contextmenu', e => { if (e.target.closest && e.target.closest('.image-list span.thumb')) e.preventDefault(); });
    }

    function openThumbSheet(thumb) {
        if (document.querySelector('.s34-tsheet-overlay')) return;
        const id = thumbPostId(thumb);
        const img = thumb.querySelector('img');
        const overlay = document.createElement('div');
        overlay.className = 's34-overlay s34-tsheet-overlay';
        const sheet = document.createElement('div');
        sheet.className = 's34-tsheet';
        const fav = isFav(id), seen = CONFIG.trackViewed && isSeen(id, CONFIG.trackDownloads && isDownloaded(id));
        const inLater = typeof inWatchLater === 'function' && inWatchLater(id);
        sheet.innerHTML = `<div class="s34-tsheet-head"><b>Post #${id}</b><button type="button" data-a="close">✕</button></div>
            <button type="button" data-a="fav">${fav ? '♥ Remove from favourites' : '♡ Add to favourites'}</button>
            <button type="button" data-a="dl">⬇ Download</button>
            ${CONFIG.trackViewed ? `<button type="button" data-a="seen">${seen ? '👁 Mark as not viewed' : '👁 Mark as viewed'}</button>` : ''}
            <button type="button" data-a="coll">📁 Save to collection</button>
            <button type="button" data-a="later">${inLater ? '🕒 Take off Watch later' : '🕒 Watch later'}</button>`;
        overlay.appendChild(sheet);
        const close = () => overlay.remove();
        overlay.addEventListener('click', e => {
            if (e.target === overlay) { close(); return; }
            const b = e.target.closest('[data-a]');
            if (!b) return;
            const a = b.dataset.a;
            if (a === 'close') close();
            else if (a === 'fav') { close(); toggleFavourite(id, thumb.querySelector('.s34-fav-btn')); }
            else if (a === 'dl') { close(); thumbDownload(thumb, thumb.querySelector('.s34-tdl') || document.createElement('button')); }
            else if (a === 'seen') { close(); setThumbViewed(id, !seen); showDownloadedState([thumb]); }
            else if (a === 'coll') { openCollectMenu(b, [{ id, thumb: img ? img.getAttribute('src') : '', tags: img ? thumbTags(img).trim() : '' }]); close(); }
            else if (a === 'later') { close(); toggleLaterFor(id, img ? img.getAttribute('src') : '', img ? thumbTags(img).trim() : ''); }
        });
        document.body.appendChild(overlay);
    }

    function addThumbButtons(thumbs) {
        const wantDl = CONFIG.thumbDlButton, wantSeen = CONFIG.thumbSeenButton && CONFIG.trackViewed, wantColl = CONFIG.thumbCollButton;
        if (!wantDl && !wantSeen && !wantColl) return;
        const made = [];
        thumbs.forEach(thumb => {
            if (thumb.querySelector('.s34-tbtns')) return;
            const id = thumbPostId(thumb);
            if (!id) return;
            const box = document.createElement('span');
            box.className = 's34-tbtns';
            const dl = document.createElement('button');
            dl.type = 'button';
            dl.className = 's34-tbtn s34-tdl';
            dl.innerHTML = TB_DL_SVG;
            styleDlThumbButton(dl, !!(CONFIG.trackDownloads && isDownloaded(id)));
            dl.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); thumbDownload(thumb, dl); });
            if (wantDl) box.appendChild(dl);
            if (wantColl) {
                // (Beta 3.9.2) Save to a collection right from the thumbnail
                const cb = document.createElement('button');
                cb.type = 'button';
                cb.className = 's34-tbtn s34-tcoll';
                cb.innerHTML = FOLDER_SVG.replace('width="15" height="15"', 'width="13" height="13"');
                styleCollThumbButton(cb, id);
                cb.addEventListener('click', e => {
                    e.preventDefault(); e.stopPropagation();
                    const img = thumb.querySelector('img');
                    openCollectMenu(cb, [{ id, thumb: img ? img.getAttribute('src') : '', tags: img ? thumbTags(img).trim() : '' }]);
                });
                box.appendChild(cb);
            }
            if (wantSeen) {
                // (Beta 3.8) The eye opens a small strip to its left while
                // hovering: "Viewed" and "Downloaded" - the second only marks
                // the post (nothing is downloaded). A click on the eye itself
                // switches "viewed" as before.
                const wrap = document.createElement('span');
                wrap.className = 's34-tseen-wrap';
                const fly = document.createElement('span');
                fly.className = 's34-tseen-fly';
                fly.innerHTML = `<button type="button" data-m="viewed">${TB_EYE_SVG}<span>Viewed</span></button>`
                    + (CONFIG.trackDownloads ? `<button type="button" data-m="dl" title="Only the mark – nothing is downloaded">${TB_DL_SVG}<span>Downloaded</span></button>` : '');
                fly.addEventListener('click', e => {
                    const b = e.target.closest('[data-m]');
                    e.preventDefault();
                    e.stopPropagation();
                    if (!b) return;
                    if (b.dataset.m === 'viewed') {
                        setThumbViewed(id, !b.classList.contains('s34-on'));
                    } else if (b.classList.contains('s34-on')) {
                        unmarkDownloaded([id]);
                        showToast('No longer marked as downloaded.');
                    } else {
                        markDownloadedOnly([id]);
                        showToast('Marked as downloaded – nothing was downloaded.');
                    }
                    showDownloadedState([thumb]);
                    if (typeof updateDownloadsCount === 'function') updateDownloadsCount();
                });
                const seen = document.createElement('button');
                seen.type = 'button';
                seen.className = 's34-tbtn s34-tseen';
                styleSeenButton(seen, !!(CONFIG.trackViewed && isSeen(id, CONFIG.trackDownloads && isDownloaded(id))));
                seen.addEventListener('click', e => {
                    e.preventDefault();
                    e.stopPropagation();
                    setThumbViewed(id, seen.dataset.seen !== 'true');
                    showDownloadedState([thumb]);
                });
                wrap.append(fly, seen);
                box.prepend(wrap);
            }
            thumb.appendChild(box);
            made.push(thumb);
        });
        // the marks were drawn before the buttons existed - the buttons show it now
        if (made.length) showDownloadedState(made);
    }

    function addFavButtons(thumbs) {
        addThumbButtons(thumbs || allThumbs());
        // (your own favourites page keeps the ♥ - it's how posts are removed there)
        if (!CONFIG.favButtons || (!CONFIG.thumbHeart && params.get('page') !== 'favorites')) return;
        const favs = getFavs();
        (thumbs || allThumbs()).forEach(thumb => {
            if (thumb.querySelector('.s34-fav-btn')) return;
            const id = thumbPostId(thumb);
            if (!id) return;
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 's34-fav-btn';
            styleFavButton(btn, !!favs[id], false);
            btn.addEventListener('click', e => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavourite(id, btn);
            });
            thumb.appendChild(btn);
        });
    }

    // ---- Score & resolution while hovering a thumbnail ----
    function renderHoverInfo(pill, score, size) {
        pill.textContent = [score !== '' && score != null ? '★ ' + score : '', size].filter(Boolean).join('  ·  ') || '…';
    }

    function showHoverInfo(thumb) {
        let pill = thumb.querySelector('.s34-info');
        if (!pill) {
            pill = document.createElement('span');
            pill.className = 's34-info';
            thumb.appendChild(pill);
        }
        const img = thumb.querySelector('img');
        const m = img && thumbTags(img).match(/ score:(-?\d+) /);
        const score = thumb.dataset.s34Score || (m ? m[1] : '');
        renderHoverInfo(pill, score, thumb.dataset.s34Size || '');
        if (thumb.dataset.s34Size) return;

        // Resolution is only on the post page: load it if you keep hovering
        // (a full second since Beta 3.5, and in line behind what you asked
        // for - sweeping the mouse over the list loads nothing)
        setTimeout(() => {
            if (!thumb.matches(':hover') || thumb.dataset.s34Size) return;
            const a = thumb.querySelector('a[href]');
            if (!a) return;
            pill.classList.add('s34-info-loading');
            fetchPostDoc(a.href, 'hover', { wanted: () => thumb.matches(':hover') }).then(doc => {
                pill.classList.remove('s34-info-loading');
                if (!doc) return;
                const text = (doc.querySelector('#stats') || doc.body || doc.documentElement).textContent;
                const s = text.match(/Size:\s*(\d+)\s*[x×]\s*(\d+)/i);
                const sc = text.match(/Score:\s*(-?\d+)/i);
                if (s) thumb.dataset.s34Size = s[1] + '×' + s[2];
                if (sc) thumb.dataset.s34Score = sc[1];
                renderHoverInfo(pill, thumb.dataset.s34Score || score, thumb.dataset.s34Size || '');
            });
        }, 1000);
    }

    function setupHoverInfo(thumbs) {
        if (!CONFIG.hoverInfo || NO_HOVER) return;
        (thumbs || allThumbs()).forEach(thumb => {
            if (thumb.dataset.s34Info) return;
            thumb.dataset.s34Info = '1';
            let timer = null;
            thumb.addEventListener('mouseenter', () => {
                clearTimeout(timer);
                timer = setTimeout(() => showHoverInfo(thumb), 300);
            });
            thumb.addEventListener('mouseleave', () => clearTimeout(timer));
        });
    }

    // ---- Helpers for searches (Recent, Continue, Following visits) ----
    function normalizeQuery(q) {
        return String(q || '').toLowerCase().split(/\s+/).filter(Boolean).sort().join(' ');
    }

    function pageMaxPostId(root = document) {
        let max = 0;
        root.querySelectorAll('span.thumb').forEach(t => {
            const n = parseInt(thumbPostId(t), 10);
            if (n > max) max = n;
        });
        return max;
    }

    function onFirstResultsPage() {
        return !isPostView && !(parseInt(params.get('pid') || '0', 10) > 0);
    }




    // ---- Sidebar switches: hide viewed / downloaded, thumbnail size ----
    function applyHideClasses() {
        document.documentElement.classList.toggle('s34-hide-viewed', !!CONFIG.hideViewed);
        document.documentElement.classList.toggle('s34-hide-downloaded', !!CONFIG.hideDownloaded);
        window.dispatchEvent(new CustomEvent('s34-layout-changed')); // infinite scroll may need more
    }
    applyHideClasses();

    function setupQuickPanel() {
        if (isPostView || !document.querySelector('.image-list')) return;
        if (document.querySelector('.s34-quick')) return;

        const panel = document.createElement('div');
        panel.className = 's34-quick';
        const justified = CONFIG.thumbLayout === 'justified';
        const sizeKey = thumbSizeKeys()[justified ? 0 : 1]; // (phones: their own size)
        const sizeVar = justified ? '--s34-row' : '--s34-tile';
        // (The White / Dark / OLED picker lived here until Beta 3.3 - it's in
        // Settings → Look and the welcome tour now: you set it once.)
        panel.innerHTML = `
            <div class="s34-q-head">View</div>
            <label class="s34-q-switch"><input type="checkbox" data-k="hideViewed"><span class="s34-q-track"></span>Hide viewed</label>
            <label class="s34-q-switch"><input type="checkbox" data-k="hideDownloaded"><span class="s34-q-track"></span>Hide downloaded</label>
            <label class="s34-q-size" title="Thumbnail size">
                <span>Size</span>
                <input type="range" min="100" max="500" step="10">
            </label>
            <button type="button" class="s34-q-select" title="Pick posts, then download them all at once">⬇ Batch download</button>`;

        panel.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            const k = cb.dataset.k;
            cb.checked = !!CONFIG[k];
            cb.addEventListener('change', () => {
                saveSettingsNow({ [k]: cb.checked });
                applyHideClasses();
            });
        });
        if (!CONFIG.trackViewed) panel.querySelector('[data-k="hideViewed"]').closest('label').remove();
        if (!CONFIG.trackDownloads) panel.querySelector('[data-k="hideDownloaded"]').closest('label').remove();

        const range = panel.querySelector('input[type="range"]');
        range.value = CONFIG[sizeKey];
        let saveTimer = null;
        range.addEventListener('input', () => {
            document.documentElement.style.setProperty(sizeVar, range.value + 'px');
            clearTimeout(saveTimer);
            saveTimer = setTimeout(() => saveSettingsNow({ [sizeKey]: parseInt(range.value, 10) }), 400);
        });

        panel.querySelector('.s34-q-select').addEventListener('click', () => setSelectMode(!selectMode));

        // Under the search, above the settings button
        const gear = document.querySelector('.s34-gear.s34-inline');
        const form = (document.querySelector('textarea.s34-search') || {}).form;
        if (gear) gear.before(panel);
        else if (form) form.after(panel);
        else {
            const sidebar = document.querySelector('.sidebar, #sidebar');
            if (sidebar) sidebar.appendChild(panel); else return;
        }
        adoptAiFilter(panel);
        addSfwSwitch(panel); // "Blur pictures" (screenshot mode, 20d)
    }

    // The site's own "Filter AI posts" switch, shown as a Steamy34 switch at
    // the top of the sidebar panel. The original stays in the page (hidden)
    // and is clicked for you, so the site handles it exactly as before.
    function findAiFilterBox() {
        const sidebar = document.querySelector('.sidebar, #sidebar') || document.body;
        const walker = document.createTreeWalker(sidebar, NodeFilter.SHOW_TEXT, {
            acceptNode: n => /filter\s+ai/i.test(n.textContent) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
        });
        const textNode = walker.nextNode();
        if (!textNode) return null;
        // Climb a few levels until the box holds the checkbox too
        let box = textNode.parentElement;
        for (let i = 0; i < 4 && box && !box.querySelector('input[type="checkbox"]'); i++) box = box.parentElement;
        const input = box && box.querySelector('input[type="checkbox"]');
        if (!input || box.contains(panelOrNull()) || box.querySelector('.s34-sb, #tag-sidebar, .image-list')) return null;
        return { box, input };
    }
    const panelOrNull = () => document.querySelector('.s34-quick');

    function adoptAiFilter(panel) {
        const found = findAiFilterBox();
        if (!found) return;
        const { box, input } = found;
        const row = document.createElement('label');
        row.className = 's34-q-switch s34-q-ai';
        row.title = 'The site\'s own AI filter: hides posts tagged as AI-generated';
        row.innerHTML = '<input type="checkbox"><span class="s34-q-track"></span>Filter AI posts';
        const mine = row.querySelector('input');
        const sync = () => { mine.checked = input.checked; };
        sync();
        mine.addEventListener('change', () => {
            if (input.checked !== mine.checked) input.click(); // the site does the rest
            setTimeout(sync, 50);
        });
        input.addEventListener('change', sync);
        // Hide the list around it too when the switch is all it holds
        // (the site's <ul id="displayOptions"><li> would leave an empty bullet)
        let hide = box;
        while (hide.parentElement && hide.parentElement.children.length === 1 && /^(LI|UL|OL)$/.test(hide.parentElement.tagName)) hide = hide.parentElement;
        hide.classList.add('s34-ai-original');
        const head = panel.querySelector('.s34-q-head');
        if (head) head.after(row); else panel.prepend(row);
    }

