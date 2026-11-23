    // =====================================================================
    //  COLLECTIONS ON ALL DEVICES (Beta 3.8, opt-in: CONFIG.collectionsSync)
    // =====================================================================
    // rule34 keeps your favourites on your account - so with this on, every
    // post you put into a collection is also favourited. On another device
    // (phone) the posts are then there, on the favourites page ("Favourites &
    // Collections"). The folder names stay on the device that made them.
    // Un-favourite a post - here or anywhere else - and it leaves its
    // collections too: here right away; from another device the next time
    // Steamy34 reads your favourites list (at most every few hours, gently).
    // Collection entries remember fav: true once they're known favourites -
    // only those can be taken out when they go missing from the list.
    const COLLSYNC_ASKED_KEY = 'steamy34_collsync_asked';
    const COLLSYNC_LAST_KEY = 'steamy34_collsync_last';
    const USER_ID_KEY = 'steamy34_user_id';
    const COLLSYNC_EVERY_MS = 4 * 3600000;
    const COLLSYNC_MAX_PAGES = 80;

    // Your rule34 user number: the login cookie, the API key, or a link to
    // "My Favorites" seen earlier (My Account, the favourites page)
    function myUserId() {
        const link = document.querySelector('a[href*="page=favorites"][href*="s=view"][href*="id="]');
        const fromLink = link && postIdFrom(link.getAttribute('href'));
        if (fromLink && /^\d{1,12}$/.test(fromLink)) { try { GM_setValue(USER_ID_KEY, fromLink); } catch (e) {} }
        const cookie = readSiteCookie('user_id');
        const api = typeof getApiKey === 'function' && getApiKey();
        let stored = '';
        try { stored = GM_getValue(USER_ID_KEY, ''); } catch (e) {}
        const id = [cookie, fromLink, api && api.user_id, stored].find(v => v && /^\d{1,12}$/.test(String(v)));
        return id ? String(id) : '';
    }

    function collectionNamesOf(id) {
        return getCollections().filter(c => c.posts.some(p => String(p.id) === String(id))).map(c => c.name);
    }

    function markCollectionFavs(ids, fav) {
        const want = new Set(ids.map(String));
        const all = getCollections();
        let changed = false;
        all.forEach(c => c.posts.forEach(p => {
            if (want.has(String(p.id)) && p.fav !== fav) { p.fav = fav; changed = true; }
        }));
        if (changed) saveCollections(all);
    }

    // Takes a post out of every collection; resolves what's needed to put it back
    function dropFromCollections(id) {
        const all = getCollections();
        const gone = [];
        all.forEach(c => {
            const i = c.posts.findIndex(p => String(p.id) === String(id));
            if (i >= 0) { gone.push({ col: c.id, name: c.name, index: i, entry: c.posts[i] }); c.posts.splice(i, 1); }
        });
        if (gone.length) saveCollections(all);
        return gone;
    }

    function restoreToCollections(gone) {
        const all = getCollections();
        gone.forEach(g => {
            const c = all.find(x => x.id === g.col);
            if (c && !c.posts.some(p => String(p.id) === String(g.entry.id))) c.posts.splice(Math.min(g.index, c.posts.length), 0, g.entry);
        });
        saveCollections(all);
    }

    const namesText = names => names.length === 1 ? `"${names[0]}"` : names.length + ' collections';

    // ---- (Beta 3.9.2) iCame and Watch later in the popup ----
    // iCame: rule34's own counter (public/icame.php, once every 24 hours) - the
    // site's answer is shown as it is; posts you did it on stay lit.
    const SPLASH_SVG = '<svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true"><g transform="rotate(38 12 12)">'
        + '<path d="M14.5 1.5c3.4 4 5.6 7.4 5.6 10.2a5.6 5.6 0 0 1-11.2 0c0-2.8 2.2-6.2 5.6-10.2z"/>'
        + '<path d="M5.6 9.5c2 2.4 3.3 4.4 3.3 6.1a3.3 3.3 0 0 1-6.6 0c0-1.7 1.3-3.7 3.3-6.1z"/>'
        + '<path d="M13 16.4c1.6 1.9 2.6 3.4 2.6 4.7a2.6 2.6 0 0 1-5.2 0c0-1.3 1-2.8 2.6-4.7z"/></g></svg>';
    const CLOCK_SVG = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
    const ICAME_KEY = 'steamy34_icame';
    function iCameDone(id) { try { return !!(GM_getValue(ICAME_KEY, {}) || {})[id]; } catch (e) { return false; } }
    async function sendICame(btn) {
        const id = popupState && postIdFrom(popupState.postUrl);
        if (!id || (btn && btn.classList.contains('s34-busy'))) return;
        // (Beta 3.9.2) rule34 allows one iCame every 24 hours - a second one isn't
        // even sent (rule34 answered it with a whole page, which ended up in the message)
        let m = {};
        try { m = GM_getValue(ICAME_KEY, {}) || {}; } catch (e) {}
        if (m[id]) { showToast('You already did iCame on this post.', 'Top list', () => window.open('index.php?page=icame', '_blank', 'noopener')); return; }
        const last = Math.max(0, ...Object.values(m).map(Number).filter(Boolean));
        const wait = last + 24 * 3600000 - Date.now();
        if (wait > 0) { showToast(`rule34 allows one iCame every 24 hours – the next one in about ${Math.max(1, Math.ceil(wait / 3600000))} h.`); return; }
        setBusy(btn, true);
        let text = '';
        try {
            const r = await loadPage('public/icame.php?postid=' + encodeURIComponent(id), 'action');
            const raw = String(r && r.html || '');
            // only a short, plain answer is shown - a whole page never is
            text = /<(html|head|body|style|script|!doctype)/i.test(raw) || raw.length > 300 ? '' : raw.replace(/<[^>]+>/g, '').trim();
        } catch (e) { text = e && e.cloudflare ? 'Not sent – solve the quick check first.' : 'Not sent (' + (e.message || e) + ').'; }
        setBusy(btn, false);
        if (/not sent/i.test(text)) { showToast(text); return; }
        try { m[id] = Date.now(); GM_setValue(ICAME_KEY, m); } catch (e) {}
        styleICame(btn, id);
        btn.classList.add('s34-pop');
        setTimeout(() => btn.classList.remove('s34-pop'), 700);
        showToast(text || 'iCame sent.', 'Top list', () => window.open('index.php?page=icame', '_blank', 'noopener'));
    }
    function styleICame(btn, id) {
        if (!btn) return;
        const on = iCameDone(id);
        btn.classList.toggle('s34-on', on);
        btn.title = on ? 'You did iCame on this post' : 'iCame – rule34\'s own counter (once every 24 hours)';
    }

    // Watch later: a collection of its own, made the first time it's used
    const LATER_ID = 'watchlater';
    function laterCollection(all) {
        let c = all.find(x => x.id === LATER_ID);
        if (!c) { c = { id: LATER_ID, name: 'Watch later', created: Date.now(), posts: [] }; all.unshift(c); }
        return c;
    }
    function toggleLaterFor(id, thumb, tags) {
        const all = getCollections();
        const c = laterCollection(all);
        const i = c.posts.findIndex(p => String(p.id) === String(id));
        if (i >= 0) { c.posts.splice(i, 1); showToast('Taken off Watch later.'); }
        else { c.posts.unshift({ id, thumb: thumb || '', time: Date.now(), tags: tags || '' }); showToast('On your Watch later list – it\'s in Collections.'); }
        saveCollections(all);
    }
    function inWatchLater(id) { const c = getCollections().find(x => x.id === LATER_ID); return !!c && c.posts.some(p => String(p.id) === String(id)); }
    function toggleWatchLater() {
        const st = popupState;
        if (!st) return;
        const id = postIdFrom(st.postUrl);
        const all = getCollections();
        const c = laterCollection(all);
        const i = c.posts.findIndex(p => String(p.id) === String(id));
        if (i >= 0) { c.posts.splice(i, 1); showToast('Taken off Watch later.'); }
        else {
            c.posts.unshift({ id, thumb: popupThumbSrc(st), time: Date.now(), tags: [].concat(...Object.values(st.tags || {}).map(l => (l || []).map(x => x.tag))).join(' ') });
            showToast('On your Watch later list – it\'s in Collections.');
        }
        saveCollections(all);
        stylePopupExtras();
    }
    // (Beta 3.9.3) A "More" row: Find source (SauceNAO), Similar (iqdb), Upscale
    // (Waifu2x) - rule34's own links from the post page, opened in a new tab
    // (Steamy34 itself only ever talks to rule34) - and Report.
    function renderPopupMore() {
        const st = popupState;
        if (!st) return;
        const side = st.overlay.querySelector('.s34-pv-row2');
        if (!side) return;
        let row = st.overlay.querySelector('.s34-pv-more');
        if (!row) {
            row = document.createElement('div');
            row.className = 's34-pv-more';
            side.after(row);
        }
        const abs = u => { try { return new URL(u, location.href).href; } catch (e) { return ''; } };
        const thumb = abs(popupThumbSrc(st));
        const media = abs(st.mediaUrl || '');
        const isPic = media && !/\.(mp4|webm|mkv|mov)(\?|$)/i.test(media);
        const links = [
            ['🔍', 'Find source', thumb && 'https://saucenao.com/search.php?db=999&url=' + encodeURIComponent(thumb), 'Who made it? Reverse image search on SauceNAO (opens in a new tab)'],

            ['⤢', 'Upscale', isPic && 'https://waifu2x.booru.pics/Home/fromlink?denoise=1&scale=2&url=' + encodeURIComponent(media), 'Twice the size with Waifu2x (opens in a new tab)']
        ];
        row.replaceChildren();
        links.forEach(([ic, label, href, title]) => {
            if (!href) return;
            const a = document.createElement('a');
            a.className = 's34-pv-morebtn';
            a.href = href; a.target = '_blank'; a.rel = 'noopener noreferrer'; a.title = title;
            a.textContent = ic + ' ' + label + ' ↗';
            row.appendChild(a);
        });
        // (Beta 3.9.4) Similar: a filmstrip of rule34's own posts - same artist and character
        const sim = document.createElement('button');
        sim.type = 'button';
        sim.className = 's34-pv-morebtn s34-pv-similar';
        sim.textContent = '◫ Similar';
        sim.title = 'Posts with the same artist and character, as a strip along the bottom';
        sim.addEventListener('click', () => openSimilarStrip());
        row.insertBefore(sim, row.firstChild ? row.children[1] || null : null);
        const rep = document.createElement('button');
        rep.type = 'button';
        rep.className = 's34-pv-morebtn s34-pv-report';
        rep.textContent = '⚑ Report';
        rep.title = 'Report this post to rule34\'s moderators';
        rep.addEventListener('click', () => reportPost(postIdFrom(st.postUrl)));
        row.appendChild(rep);
    }

    // (Beta 3.9.4 / 3.9.5) Similar: a strip of rule34's own posts - same artist
    // and character. It stays open while you browse: ← / → go on through the
    // page (also from a strip post - from where you left the page), Shift + ← / →
    // go through the strip, the wheel scrolls it sideways. A new page post
    // fills it again with that post's similar ones.
    async function openSimilarStrip(refresh) {
        const st = popupState;
        if (!st) return;
        const stage = st.overlay.querySelector('.s34-pv-stage');
        let strip = st.overlay.querySelector('.s34-pv-strip');
        if (strip && !refresh) { strip.remove(); return; } // (a second click closes it)
        if (!strip && refresh) return;
        const pick = type => ((st.tags || {})[type] || []).map(x => x.tag)[0];
        const words = [pick('artist'), pick('character') || pick('copyright')].filter(Boolean);
        if (!words.length) {
            if (!refresh) showToast('No artist or character on this post to look for.');
            else if (strip) { strip._from = st.thumb; strip.querySelectorAll('.s34-on').forEach(x => x.classList.remove('s34-on')); }
            return;
        }
        const q = words.join(' ');
        if (!strip) {
            strip = document.createElement('div');
            strip.className = 's34-pv-strip';
            strip.innerHTML = '<div class="s34-pv-strip-head"><b></b><span class="s34-pv-strip-keys"></span><button type="button" title="Close">✕</button></div><div class="s34-pv-strip-row"></div>';
            strip.querySelector('.s34-pv-strip-keys').textContent = 'Shift + ' + browseKeyText() + ' through the strip · ' + browseKeyText() + ' the page';
            strip.addEventListener('click', e => e.stopPropagation());
            strip.querySelector('.s34-pv-strip-head button').addEventListener('click', () => strip.remove());
            const rowEl = strip.querySelector('.s34-pv-strip-row');
            // the mouse wheel scrolls the strip sideways
            rowEl.addEventListener('wheel', e => {
                if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
                e.preventDefault();
                rowEl.scrollLeft += e.deltaY;
            }, { passive: false });
            stage.after(strip);
        }
        strip._from = st.thumb; // ← / → go on from this page post
        if (strip._q === q) { strip.querySelectorAll('.s34-on').forEach(x => x.classList.remove('s34-on')); return; } // same artist + character: same strip
        strip._q = q;
        const myQ = q;
        strip.querySelector('b').textContent = 'Similar: ' + words.map(w => w.replace(/_/g, ' ')).join(' + ');
        const rowEl = strip.querySelector('.s34-pv-strip-row');
        rowEl.innerHTML = '<span class="s34-pv-strip-wait">Looking for similar posts…</span>';
        rowEl.scrollLeft = 0;
        const here = postIdFrom(st.postUrl);
        let thumbs = [];
        try {
            const r = await loadPage('index.php?page=post&s=list&tags=' + encodeURIComponent(q + ' sort:score'), 'popup');
            const doc = new DOMParser().parseFromString(r.html, 'text/html');
            thumbs = Array.from(doc.querySelectorAll('.image-list span.thumb')).map(t => document.adoptNode(t));
        } catch (e) {
            if (strip._q === myQ) rowEl.querySelector('.s34-pv-strip-wait').textContent = e && e.cloudflare ? 'Waiting for the Cloudflare check.' : 'Couldn\'t load similar posts.';
            return;
        }
        if (strip._q !== myQ || !strip.isConnected) return; // (moved on meanwhile)
        hideBlocklisted(thumbs);
        thumbs = thumbs.filter(t => !t.classList.contains('s34-bl-hidden') && !t.classList.contains('s34-bl-soft') && thumbPostId(t) !== here).slice(0, 30);
        rowEl.replaceChildren();
        if (!thumbs.length) { rowEl.innerHTML = '<span class="s34-pv-strip-wait">Nothing similar found.</span>'; return; }
        thumbs.forEach(t => {
            const img = t.querySelector('img');
            if (!img) return;
            const b = document.createElement('button');
            b.type = 'button';
            b.className = 's34-pv-strip-item';
            b.title = 'Post #' + thumbPostId(t);
            const im = new Image();
            im.src = img.getAttribute('src');
            im.alt = '';
            im.loading = 'lazy';
            b.appendChild(im);
            b.addEventListener('click', () => {
                rowEl.querySelectorAll('.s34-on').forEach(x => x.classList.remove('s34-on'));
                b.classList.add('s34-on');
                try { b.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' }); } catch (e) {}
                openPopup(t);
                if (popupState) popupState.fromStrip = true; // (the strip stays as it is)
            });
            rowEl.appendChild(b);
        });
    }

    // Shift + ← / → (or Shift + A / D): the next / previous post in the strip
    function similarStripStep(e) {
        const strip = popupState && popupState.overlay.querySelector('.s34-pv-strip');
        if (!strip || !e.shiftKey || e.code === CONFIG.downloadKey) return false;
        const mode = CONFIG.browseKeys;
        let dir = 0;
        if (mode !== 'wasd') { if (e.key === 'ArrowLeft') dir = -1; if (e.key === 'ArrowRight') dir = 1; }
        if (mode !== 'arrows' && !dir) { if (e.code === 'KeyA') dir = -1; if (e.code === 'KeyD') dir = 1; }
        if (!dir) return false;
        const items = Array.from(strip.querySelectorAll('.s34-pv-strip-item'));
        if (!items.length) return true;
        const at = items.findIndex(x => x.classList.contains('s34-on'));
        const next = items[at < 0 ? (dir > 0 ? 0 : items.length - 1) : at + dir];
        if (next) next.click();
        return true;
    }

    // Report: rule34's own (public/report.php), with a calm question instead of a browser prompt
    function reportPost(id) {
        if (!id || document.querySelector('.s34-report-overlay')) return;
        const overlay = document.createElement('div');
        overlay.className = 's34-overlay s34-confirm-overlay s34-report-overlay';
        overlay.innerHTML = `
            <div class="s34-confirm" role="dialog" aria-modal="true">
                <div class="s34-confirm-icon">⚑</div>
                <div class="s34-confirm-title">Report this post?</div>
                <div class="s34-confirm-text">Why does it break rule34's rules? (Not for copyright takedowns – rule34 asks you to use its DMCA page for those.)</div>
                <textarea class="s34-report-why" rows="3" maxlength="500" placeholder="Reason…"></textarea>
                <div class="s34-confirm-foot">
                    <button type="button" class="s34-btn" data-act="no">Cancel</button>
                    <button type="button" class="s34-btn s34-primary" data-act="yes">Send report</button>
                </div>
            </div>`;
        const box = overlay.querySelector('textarea');
        box.addEventListener('keydown', e => e.stopPropagation());
        const done = () => overlay.remove();
        overlay.addEventListener('click', async e => {
            const act = e.target.closest('[data-act]');
            if (e.target === overlay || (act && act.dataset.act === 'no')) { done(); return; }
            if (!act) return;
            const why = box.value.trim();
            if (!why) { box.focus(); return; }
            act.disabled = true;
            let res = '';
            try {
                const r = await loadPage('public/report.php?type=post&rid=' + encodeURIComponent(id) + '&reason=' + encodeURIComponent(encodeURI(why)), 'action');
                res = String(r && r.html || '').trim();
            } catch (err) { res = err && err.cloudflare ? 'cf' : 'error'; }
            done();
            if (res === 'limit') showToast('Report limit reached – your report was NOT sent. Try again later.');
            else if (res === 'cf') showToast('Not sent – solve the quick check first.', 'Solve check', openCloudflarePanel);
            else if (res === 'error') showToast('The report couldn\'t be sent – try again in a moment.');
            else showToast('Report sent – thanks.');
        });
        document.body.appendChild(overlay);
        box.focus();
    }

    // The popup's Later / iCame buttons follow the post shown
    function stylePopupExtras() {
        const st = popupState;
        if (!st) return;
        try { renderPopupMore(); } catch (e) {}
        const id = postIdFrom(st.postUrl);
        const later = st.overlay.querySelector('.s34-pv-later');
        if (later) { const on = inWatchLater(id); later.classList.toggle('s34-on', on); later.title = on ? 'On your Watch later list – click to take it off' : 'Watch later – a list for posts to look at properly later'; }
        styleICame(st.overlay.querySelector('.s34-pv-icame'), id);
    }

    // ---- Posts put into a collection are favourited too ----
    let collFavRunning = false;
    async function favouriteCollectionPosts(ids, loud) {
        if (!CONFIG.collectionsSync || !ids.length) return;
        const favs = getFavs();
        const known = ids.filter(id => favs[id]);
        if (known.length) markCollectionFavs(known, true);
        const todo = ids.filter(id => !favs[id]);
        if (!todo.length) return;
        let done = 0;
        for (const id of todo) {
            if (!CONFIG.collectionsSync) break;
            const ok = await addFavourite(id, { quiet: true, kind: loud ? 'action' : 'batch' });
            if (!ok) break; // not logged in / Cloudflare check - try again later
            markCollectionFavs([id], true);
            done++;
        }
        if (loud && done) showToast(done === 1 ? 'Also added to your favourites ♥ – so it\'s on your other devices too.' : `Also added ${done} posts to your favourites ♥`);
        return done;
    }

    // Called by the collection menu after posts were added
    function collectionsAdded(ids) {
        if (!CONFIG.collectionsSync) return;
        favouriteCollectionPosts(ids.map(String), true);
    }

    // Posts that were in collections before this was turned on: favourited in
    // the background, gently (they wait behind anything you ask for)
    async function catchUpCollectionFavs() {
        if (!CONFIG.collectionsSync || collFavRunning) return;
        const favs = getFavs();
        const ids = [];
        getCollections().forEach(c => c.posts.forEach(p => { if (p.fav !== true && p.favTried !== true && !ids.includes(String(p.id))) ids.push(String(p.id)); }));
        const known = ids.filter(id => favs[id]);
        if (known.length) markCollectionFavs(known, true);
        const todo = ids.filter(id => !favs[id]);
        if (!todo.length) return;
        collFavRunning = true;
        showToast(`Adding ${todo.length} collection post${todo.length === 1 ? '' : 's'} to your favourites in the background…`);
        let done = 0;
        for (const id of todo) {
            if (!CONFIG.collectionsSync) break;
            const ok = await addFavourite(id, { quiet: true, kind: 'batch' });
            if (!ok) break;
            markCollectionFavs([id], true);
            done++;
        }
        collFavRunning = false;
        if (done) showToast(`${done} collection post${done === 1 ? ' is' : 's are'} in your favourites now – on all your devices.`);
    }

    // ---- Un-favourited here: out of its collections too ----
    // Resolves the removed entries (for Undo) - none when sync is off
    function unfavouritedHere(id) {
        if (!CONFIG.collectionsSync) return [];
        return dropFromCollections(id);
    }

    // ---- Un-favourited on another device: read the favourites list ----
    // Safety first: any page that fails = nothing is changed. An empty list,
    // or most of the collection posts missing at once, is never trusted
    // blindly - that asks first.
    async function readMyFavouriteIds(uid) {
        const ids = new Set();
        let pageSize = 0;
        for (let n = 0; n < COLLSYNC_MAX_PAGES; n++) {
            const pid = n * (pageSize || 50);
            const r = await loadPage(`index.php?page=favorites&s=view&id=${uid}&pid=${pid}`, 'follow');
            if (!r || !r.ok) throw new Error('favourites page ' + (n + 1) + ' did not load');
            if (/[?&]s=login\b/.test(r.url || '')) throw new Error('not logged in');
            const doc = new DOMParser().parseFromString(r.html, 'text/html');
            const found = Array.from(doc.querySelectorAll('.image-list span.thumb, span.thumb')).map(t => thumbPostId(t)).filter(Boolean);
            if (!n) pageSize = found.length;
            const fresh = found.filter(id => !ids.has(id));
            fresh.forEach(id => ids.add(id));
            if (!found.length || !fresh.length || found.length < pageSize) return ids; // the end
        }
        throw new Error('too many favourites to read in one go');
    }

    let collSyncChecking = false;
    async function checkFavouritesElsewhere(maxAgeMs = COLLSYNC_EVERY_MS) {
        if (!CONFIG.collectionsSync || collSyncChecking) return;
        let last = 0;
        try { last = GM_getValue(COLLSYNC_LAST_KEY, 0); } catch (e) {}
        if (Date.now() - last < maxAgeMs) return;
        const watched = [];
        getCollections().forEach(c => c.posts.forEach(p => { if (p.fav === true) watched.push(String(p.id)); }));
        const uid = myUserId();
        if (!uid || !watched.length) return;
        collSyncChecking = true;
        let ids;
        try { ids = await readMyFavouriteIds(uid); }
        catch (e) { console.log('[Steamy34] Favourites list not read (' + (e.message || e) + ') – collections unchanged.'); collSyncChecking = false; return; }
        collSyncChecking = false;
        try { GM_setValue(COLLSYNC_LAST_KEY, Date.now()); } catch (e) {}
        if (!ids.size) return; // never trust an empty list
        // Hearts everywhere follow the real list (favourited on your phone = ♥ here)
        const old = getFavs();
        const favs = {};
        ids.forEach(id => { favs[id] = old[id] || Date.now(); });
        GM_setValue(FAVS_KEY, favs);
        const missing = Array.from(new Set(watched.filter(id => !ids.has(id))));
        if (!missing.length) return;
        const apply = () => {
            const gone = [];
            missing.forEach(id => gone.push(...dropFromCollections(id)));
            const names = Array.from(new Set(gone.map(g => g.name)));
            showToast(`${missing.length === 1 ? 'A post was' : missing.length + ' posts were'} removed from your favourites on another device – taken out of ${namesText(names)} too.`, 'Undo', async () => {
                restoreToCollections(gone);
                for (const id of missing) { if (await addFavourite(id, { quiet: true })) markCollectionFavs([id], true); }
                showToast('Back in your collections and favourites.');
            }, 15000);
        };
        if (missing.length > 3 && missing.length > watched.length / 2) {
            showToast(`${missing.length} collection posts are no longer in your favourites. Take them out of your collections too?`, 'Take them out', apply, 30000);
        } else apply();
    }

    // ---- Your favourites page: "Favourites & Collections" ----

    // Your own favourites list (the site shows "Remove" only there)
    function onOwnFavourites() {
        return params.get('page') === 'favorites' && params.get('s') === 'view' && !!document.querySelector('.image-list a[onclick*="s=delete"], .image-list .s34-site-remove');
    }

    // (Beta 3.8) Every favourite - this page, and the other pages of the list
    // read gently when there are more. Resolves ids (null = cancelled / failed).
    async function allFavouriteIds() {
        const here = allThumbs().map(t => thumbPostId(t)).filter(Boolean);
        const more = !!document.querySelector('#paginator a');
        const uid = params.get('id') || myUserId();
        if (!more || !uid) return here;
        showToast('Reading your whole favourites list…');
        try { const all = await readMyFavouriteIds(uid); here.forEach(id => all.add(id)); return Array.from(all); }
        catch (e) { showToast('Couldn\'t read the whole list (' + (e.message || e) + ') – only this page.'); return here; }
    }

    async function markAllFavourites(kind) {
        const ids = await allFavouriteIds();
        if (!ids || !ids.length) return;
        if (kind === 'viewed') {
            const fresh = ids.filter(id => !isViewed(id));
            const unseen = getUnseen();
            fresh.forEach(id => { delete unseen[id]; rememberView(id); });
            GM_setValue(UNSEEN_KEY, unseen);
            saveViewed(); // (one save for all of them)
            showDownloadedState();
            showToast(fresh.length ? `${fresh.length} favourite${fresh.length === 1 ? '' : 's'} marked as viewed.` : 'All your favourites were viewed already.', fresh.length ? 'Undo' : null, () => {
                fresh.forEach(id => setThumbViewed(id, false)); showDownloadedState();
            }, 10000);
        } else {
            const fresh = markDownloadedOnly(ids);
            showDownloadedState();
            showToast(fresh.length ? `${fresh.length} favourite${fresh.length === 1 ? '' : 's'} marked as downloaded (nothing was downloaded).` : 'All your favourites were marked as downloaded already.', fresh.length ? 'Undo' : null, () => {
                unmarkDownloaded(fresh); showDownloadedState();
            }, 10000);
        }
    }

    function setupFavsAndCollections() {
        if (!onOwnFavourites()) return;
        myUserId(); // (remembers your number from this page)
        const list = document.querySelector('.image-list');
        if (!list || document.querySelector('.s34-favcoll-bar')) return;
        const sync = CONFIG.collectionsSync;
        if (sync) document.title = 'Favourites & Collections';
        const cols = sync ? getCollections() : [];
        const bar = document.createElement('div');
        bar.className = 's34-favcoll-bar';
        bar.innerHTML = `<div class="s34-favcoll-top"><h2>${sync ? 'Favourites &amp; Collections' : 'Your favourites'}</h2>
            <div class="s34-favcoll-acts">
                <button type="button" data-fa="viewed" title="Every favourite – also the ones on the other pages">${TB_EYE_SVG} Mark all as viewed</button>
                <button type="button" data-fa="downloaded" title="Only marks them – nothing is downloaded">${TB_DL_SVG} Mark all as downloaded</button>
                <button type="button" data-fa="select" class="s34-favcoll-primary" title="Tick posts, then download them, put them into a collection or unfavourite them">☐ Select…</button>
            </div></div>
            <p>${sync ? (cols.length
            ? '♥ = in your favourites · the folder shows which collection a post is in. Open a collection:'
            : 'Your favourites – and your collections, once you make some (on any device, they\'re favourited too).')
            : 'Select posts to download them, put them into a collection or unfavourite several at once.'}</p><div class="s34-favcoll-list"></div>`;
        bar.querySelector('.s34-favcoll-acts').addEventListener('click', e => {
            const b = e.target.closest('[data-fa]');
            if (!b) return;
            if (b.dataset.fa === 'select') setSelectMode(!selectMode);
            else markAllFavourites(b.dataset.fa);
        });
        const row = bar.querySelector('.s34-favcoll-list');
        cols.forEach(c => {
            const b = document.createElement('button');
            b.type = 'button';
            b.innerHTML = FOLDER_SVG + '<span></span><small></small>';
            b.querySelector('span').textContent = c.name;
            b.querySelector('small').textContent = c.posts.length;
            b.addEventListener('click', () => openCollectionsWindow(c.id));
            row.appendChild(b);
        });
        list.before(bar);
        showCollectionChips();
    }

    // Batch "Unfavourite" (favourites page): one after another, gently; Undo
    // puts them back (and into their collections)
    async function batchUnfavourite(list) {
        batchRunning = true;
        batchStop = false;
        const undone = [];
        for (let i = 0; i < list.length && !batchStop; i++) {
            const id = thumbPostId(list[i]);
            batchStatus = `Unfavouriting ${i + 1} / ${list.length}…`;
            renderBatchBar();
            if (!(await removeFavourite(id, { kind: 'batch' }))) break;
            showFavState(id, false);
            undone.push({ id, gone: unfavouritedHere(id) });
            selected.delete(list[i]);
            list[i].classList.remove('s34-selected');
        }
        batchRunning = false;
        batchStatus = '';
        setSelectMode(false);
        showCollectionChips();
        if (!undone.length) return;
        showToast(`Unfavourited ${undone.length} post${undone.length === 1 ? '' : 's'}.`, 'Undo', async () => {
            let back = 0;
            for (const u of undone) {
                if (!(await addFavourite(u.id, { quiet: true, kind: 'batch' }))) break;
                showFavState(u.id, true);
                if (u.gone.length) restoreToCollections(u.gone);
                back++;
            }
            showCollectionChips();
            showToast(`${back} post${back === 1 ? ' is' : 's are'} back in your favourites.`);
        }, 15000);
    }

    function showCollectionChips(thumbs) {
        if (!CONFIG.collectionsSync || params.get('page') !== 'favorites') return;
        (thumbs || allThumbs()).forEach(t => {
            const names = collectionNamesOf(thumbPostId(t));
            let chip = t.querySelector('.s34-cchip');
            if (!names.length) { if (chip) chip.remove(); return; }
            if (!chip) { chip = document.createElement('span'); chip.className = 's34-cchip'; t.appendChild(chip); }
            chip.innerHTML = FOLDER_SVG + '<span></span>';
            chip.querySelector('span').textContent = names[0] + (names.length > 1 ? ' +' + (names.length - 1) : '');
            chip.title = names.join(', ');
        });
    }

    // ---- The choice, once: shown when you open Collections after the update ----
    function collSyncAsked() { try { return !!GM_getValue(COLLSYNC_ASKED_KEY, false); } catch (e) { return true; } }

    function buildCollSyncCard(onDone) {
        const n = new Set();
        getCollections().forEach(c => c.posts.forEach(p => n.add(String(p.id))));
        const card = document.createElement('div');
        card.className = 's34-collsync-card';
        card.innerHTML = `
            <b>New: your collections on all your devices</b>
            <p>Steamy34 can also favourite every post you put into a collection – rule34 keeps favourites on your account, so they show up on your phone too, on your favourites page (then called "Favourites &amp; Collections"). Take a post out of your favourites anywhere, and it leaves its collections as well.</p>
            <p class="s34-collsync-small">Optional – collections work just like before without it. The folder names stay on this device. ${n.size ? `Turning it on favourites the ${n.size} post${n.size === 1 ? '' : 's'} already in your collections (in the background).` : ''} Needs a rule34 login. Change it any time in Settings → Downloads.</p>
            <div class="s34-collsync-btns">
                <button type="button" class="s34-btn" data-a="local">Keep them on this device</button>
                <button type="button" class="s34-btn s34-primary" data-a="sync">Use them on all devices</button>
            </div>`;
        card.addEventListener('click', e => {
            const a = e.target.closest('[data-a]');
            if (!a) return;
            try { GM_setValue(COLLSYNC_ASKED_KEY, true); } catch (err) {}
            if (a.dataset.a === 'sync') {
                saveSettingsNow({ collectionsSync: true });
                showToast('Collections are on all your devices now.');
                catchUpCollectionFavs();
            } else {
                showToast('Collections stay on this device – Settings → Downloads if you change your mind.');
            }
            card.remove();
            if (onDone) onDone();
        });
        return card;
    }

    // Runs once the page is ready
    function setupCollectionsSync() {
        setupFavsAndCollections();
        if (!CONFIG.collectionsSync) return;
        setTimeout(() => {
            if (document.hidden) return;
            catchUpCollectionFavs();
            checkFavouritesElsewhere();
        }, 6000);
    }
