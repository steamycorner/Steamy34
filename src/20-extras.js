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

    async function addFavourite(id) {
        if (!id) return false;
        try {
            const r = await fetchWithTimeout('public/addfav.php?id=' + encodeURIComponent(id));
            const text = (await r.text()).trim();
            if (isCloudflareCheck(r.status, text)) {
                pauseForCloudflare(location.href);
                return false;
            }
            if (!r.ok) throw new Error('HTTP ' + r.status);
            if (text === '2') {
                showToast('Log in to rule34.xxx to use favourites.');
                return false;
            }
            rememberFav(id);
            showToast(text === '1' ? 'Already in your favourites ♥' : 'Added to your favourites ♥');
            return true;
        } catch (e) {
            showToast('Could not add to favourites (' + (e.message || e) + ').');
            return false;
        }
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
        btn.title = faved ? 'In your favourites' : 'Add to your favourites';
    }

    function addFavButtons(thumbs) {
        if (!CONFIG.favButtons) return;
        const favs = getFavs();
        (thumbs || allThumbs()).forEach(thumb => {
            if (thumb.querySelector('.s34-fav-btn')) return;
            const id = thumbPostId(thumb);
            if (!id) return;
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 's34-fav-btn';
            styleFavButton(btn, !!favs[id], false);
            btn.addEventListener('click', async e => {
                e.preventDefault();
                e.stopPropagation();
                if (btn.classList.contains('s34-faved')) {
                    showToast('Already in your favourites ♥');
                    return;
                }
                if (btn.classList.contains('s34-busy')) return;
                setBusy(btn, true);
                const ok = await addFavourite(id);
                setBusy(btn, false);
                if (ok) styleFavButton(btn, true, false);
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
        setTimeout(() => {
            if (!thumb.matches(':hover') || thumb.dataset.s34Size) return;
            const a = thumb.querySelector('a[href]');
            if (!a) return;
            pill.classList.add('s34-info-loading');
            fetchPostDoc(a.href).then(doc => {
                pill.classList.remove('s34-info-loading');
                if (!doc) return;
                const text = (doc.querySelector('#stats') || doc.body || doc.documentElement).textContent;
                const s = text.match(/Size:\s*(\d+)\s*[x×]\s*(\d+)/i);
                const sc = text.match(/Score:\s*(-?\d+)/i);
                if (s) thumb.dataset.s34Size = s[1] + '×' + s[2];
                if (sc) thumb.dataset.s34Score = sc[1];
                renderHoverInfo(pill, thumb.dataset.s34Score || score, thumb.dataset.s34Size || '');
            });
        }, 400);
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

    // ---- Helpers for followed searches (20c-following.js) ----
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

    // Saving a search while looking at its results: start counting from here
    function seenIdForQuery(q) {
        if (!onFirstResultsPage()) return 0;
        return normalizeQuery(tagsFromUrl(location.href)) === normalizeQuery(q) ? pageMaxPostId() : 0;
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
        const sizeKey = justified ? 'thumbRowHeight' : 'thumbMinWidth';
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

