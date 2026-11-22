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
