    // =====================================================================
    //  11. POPUP VIEWER (posts page)
    //  Clicking a thumbnail opens the post on top of the list: large media
    //  on the right, a compact sidebar with Download, info and tags on the
    //  left, comments below the media. ← / → browse, Esc / middle click
    //  closes. Phones: picture on top, swipe to browse, Back closes.
    // =====================================================================

    let popupState = null;  // the post currently shown in the popup
    let popupSeq = 0;       // ignores late answers for a post you already left

    const TYPE_ORDER = ['artist', 'character', 'copyright', 'general', 'metadata'];
    const TYPE_TITLES = {
        artist: 'Artist', character: 'Character', copyright: 'Copyright',
        general: 'General', metadata: 'Meta'
    };

    // Tags with types and counts from a loaded post page
    function readPostTags(doc) {
        const groups = {};
        doc.querySelectorAll('#tag-sidebar li[class*="tag-type-"]').forEach(row => {
            const m = row.className.match(/tag-type-([a-z]+)/);
            const tag = getTagFromRow(row).toLowerCase();
            if (!m || !tag) return;
            const countEl = Array.from(row.querySelectorAll('span'))
                .find(s => /^\s*\d+\s*$/.test(s.textContent));
            (groups[m[1]] = groups[m[1]] || []).push({ tag, count: countEl ? countEl.textContent.trim() : '' });
        });
        return groups;
    }

    // Instant first guess from the thumbnail (types we already know)
    function tagsFromThumb(thumb) {
        const groups = {};
        thumbTagList(thumb).forEach(tag => {
            const type = tagTypes.get(tag) || 'general';
            (groups[type] = groups[type] || []).push({ tag, count: '' });
        });
        return groups;
    }

    function visibleThumbs() {
        return Array.from(document.querySelectorAll('.image-list span.thumb'))
            .filter(t => t.isConnected && !t.classList.contains('s34-bl-hidden') && t.offsetParent !== null);
    }

    function buildPopup() {
        const overlay = document.createElement('div');
        overlay.className = 's34-pv-overlay';
        overlay.innerHTML = `
            <aside class="s34-pv-side">
                <div class="s34-pv-top">
                    <button type="button" class="s34-pv-nav" data-act="prev" title="Previous post (${browseKeyText('prev')})">‹</button>
                    <button type="button" class="s34-pv-nav" data-act="next" title="Next post (${browseKeyText('next')})">›</button>
                    <a class="s34-pv-full" target="_blank" rel="noopener" title="Open the full post page in a new tab">Full post ↗</a>
                    <button type="button" class="s34-pv-iconbtn s34-pv-theaterbtn" data-act="theater" aria-label="Theater mode" title="Theater mode – hide this sidebar, picture uses the whole screen (${keyLabel(CONFIG.theaterKey)})">${THEATER_SVG}</button>
                    <button type="button" class="s34-pv-iconbtn s34-pv-help s34-qmark" data-act="tips" aria-label="Shortcuts and quick tips" title="Shortcuts &amp; quick tips">?</button>
                    <button type="button" class="s34-pv-iconbtn s34-pv-close" data-act="close" aria-label="Close" title="Close (Esc or middle mouse button)">✕</button>
                </div>
                <div class="s34-dl-btn s34-inline" data-act="download"
                     title="Download the original file in maximum resolution, with tags in the filename">${downloadButtonHtml()}</div>
                <div class="s34-pv-row2">
                    <button type="button" class="s34-pv-fav" data-act="fav"></button>
                    <button type="button" class="s34-pv-collect" data-act="collect" title="Save this post in one of your own collections (${keyLabel(CONFIG.collectKey)})">${FOLDER_SVG}<span>Collection</span></button>
                </div>
                <div class="s34-auto">
                    <button type="button" class="s34-auto-toggle"></button>
                    <div class="s34-auto-row">
                        <span>Every</span>
                        <input type="range" min="2" max="30" step="1" aria-label="Seconds per post">
                        <b class="s34-auto-sec"></b>
                    </div>
                    <div class="s34-auto-bar"><i></i></div>
                    <div class="s34-auto-note"></div>
                </div>
                <div class="s34-pv-vopts"></div>
                <div class="s34-pv-info"></div>
                <div class="s34-pv-tags"></div>
            </aside>
            <div class="s34-pv-main">
                <div class="s34-pv-stage" data-act="close"></div>
                <section class="s34-cm-section"></section>
            </div>
            <div class="s34-pv-tbar">
                <button type="button" data-act="prev" title="Previous post (${browseKeyText('prev')})">‹</button>
                <button type="button" data-act="next" title="Next post (${browseKeyText('next')})">›</button>
                <button type="button" data-act="theater" title="Leave theater mode">${THEATER_EXIT_SVG}</button>
                <button type="button" data-act="close" title="Close (Esc or middle mouse button)">✕</button>
            </div>`;
        overlay.querySelector('kbd').textContent = keyLabel(CONFIG.downloadKey);
        makeKeyClickable(overlay.querySelector('.s34-dl-btn'), 'Download the original file');

        overlay.addEventListener('click', e => {
            const actEl = e.target.closest('[data-act]');
            if (!actEl) return;
            const act = actEl.dataset.act;
            // Only a click on the empty stage area closes, not on the media
            if (act === 'close' && actEl.classList.contains('s34-pv-stage') && e.target !== actEl) return;
            if (act === 'close') closePopup();
            else if (act === 'prev') popupStep(-1);
            else if (act === 'next') popupStep(1);
            else if (act === 'download') popupDownload();
            else if (act === 'fav') popupFavourite();
            else if (act === 'tips') openQuickTips();
            else if (act === 'theater') setTheater(!overlay.classList.contains('s34-pv-theater'));
            else if (act === 'collect') {
                const s = popupState;
                if (s) openCollectMenu(actEl, [{ id: postIdFrom(s.postUrl), thumb: popupThumbSrc(s) }]);
            }
        });
        setTheater(GM_getValue(THEATER_KEY, false) === true, overlay);

        if (!CONFIG.favButtons) overlay.querySelector('.s34-pv-fav').remove();
        setupAutoNextControls(overlay);
        overlay.querySelector('.s34-pv-vopts').appendChild(
            makeVideoOptions(() => overlay.querySelector('video.s34-pv-media')));
        setupPopupZoom(overlay);

        // Middle mouse button anywhere in the popup closes it
        // (except on links, which still open in a new tab as usual)
        overlay.addEventListener('mousedown', e => {
            if (e.button === 1 && !e.target.closest('a[href]')) e.preventDefault(); // no auto-scroll icon
        });
        overlay.addEventListener('auxclick', e => {
            if (e.button !== 1 || e.target.closest('a[href]')) return;
            e.preventDefault();
            closePopup();
        });

        // Phones: swipe left / right on the picture = next / previous post,
        // swipe down (while at the top) = close. Not while zoomed in, and not
        // on a video's control bar (that's for seeking).
        const stageEl = overlay.querySelector('.s34-pv-stage');
        let touch = null;
        stageEl.addEventListener('touchstart', e => {
            touch = null;
            if (e.touches.length !== 1 || stageEl.classList.contains('s34-pv-zoomed')) return;
            const t = e.touches[0];
            if (e.target.tagName === 'VIDEO' && t.clientY > e.target.getBoundingClientRect().bottom - 70) return;
            touch = { x: t.clientX, y: t.clientY, time: Date.now(), top: overlay.scrollTop };
        }, { passive: true });
        stageEl.addEventListener('touchend', e => {
            const start = touch;
            touch = null;
            if (!start || e.changedTouches.length !== 1 || Date.now() - start.time > 800) return;
            const t = e.changedTouches[0];
            const dx = t.clientX - start.x, dy = t.clientY - start.y;
            if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
                popupStep(dx < 0 ? 1 : -1);
            } else if (dy > 90 && dy > Math.abs(dx) * 1.5 && start.top <= 0 && overlay.scrollTop <= 0) {
                closePopup();
            }
        }, { passive: true });
        stageEl.addEventListener('touchcancel', () => { touch = null; }, { passive: true });
        return overlay;
    }

    function renderPopupTags() {
        if (!popupState) return;
        const box = popupState.overlay.querySelector('.s34-pv-tags');
        const blockedSet = new Set(readBlocklist().map(t => t.toLowerCase()));
        const following = CONFIG.followButtons ? getFollowing() : null;
        box.replaceChildren();

        TYPE_ORDER.concat(Object.keys(popupState.tags).filter(t => !TYPE_ORDER.includes(t)))
            .forEach(type => {
                const list = popupState.tags[type];
                if (!list || !list.length) return;
                const h = document.createElement('h4');
                h.textContent = TYPE_TITLES[type] || type;
                box.appendChild(h);
                const wrap = document.createElement('div');
                wrap.className = 's34-pv-chips';
                list.forEach(({ tag, count }) => {
                    const chip = makeChip(tag, type, blockedSet);
                    if (count) {
                        const c = document.createElement('span');
                        c.className = 's34-chip-count';
                        c.textContent = count;
                        chip.insertBefore(c, chip.querySelector('.s34-chip-add, .s34-chip-block'));
                    }
                    // Bell (follow): artists only
                    if (following && type === 'artist') chip.append(makeFollowButton(tag, 's34-chip-follow', following));
                    wrap.appendChild(chip);
                });
                box.appendChild(wrap);
            });
        if (!popupState.tagsFromPost) {
            const note = document.createElement('div');
            note.className = 's34-pv-note';
            note.textContent = 'loading full tag list…';
            box.appendChild(note);
        }
    }

    function openPopup(thumb) {
        const img = thumb.querySelector('img');
        const link = thumb.querySelector('a[href]');
        if (!img || !link) return;
        const myId = ++popupSeq;

        let overlay = popupState ? popupState.overlay : document.querySelector('.s34-pv-overlay');
        if (!overlay) {
            overlay = buildPopup();
            document.body.appendChild(overlay);
        }
        stopPopupMedia();
        document.documentElement.classList.add('s34-pv-open');

        const isVideo = isVideoThumb(img);
        // Where the page was when the popup first opened (restored on close)
        const browsing = !!popupState;
        const start = browsing
            ? { startThumb: popupState.startThumb, startScroll: popupState.startScroll,
                pushedHistory: popupState.pushedHistory, prevScrollRestoration: popupState.prevScrollRestoration }
            : { startThumb: thumb, startScroll: window.scrollY };
        if (!browsing) hintAfterPopupOpen(); // the first time only: how to get around
        popupState = Object.assign({
            id: myId, thumb, overlay,
            postUrl: link.href,
            isVideo,
            mediaUrl: null,
            tags: tagsFromThumb(thumb),
            tagsFromPost: false
        }, start);
        overlay.querySelector('.s34-pv-full').href = link.href;
        if (CONFIG.trackDownloads) {
            styleDownloadButton(overlay.querySelector('.s34-dl-btn'), isDownloaded(postIdFrom(link.href)));
        }
        // Opened in the popup = viewed (the list behind shows it at once)
        if (CONFIG.trackViewed) {
            rememberView(postIdFrom(link.href));
            showDownloadedState([thumb]); // just this one, not the whole page
        }
        renderPopupTags();

        // Browsing with ← / →: keep the list underneath in step (also lets
        // infinite scroll load more). The first post opened doesn't move the page.
        if (browsing) thumb.scrollIntoView({ block: 'center' });

        styleFavButton(overlay.querySelector('.s34-pv-fav'), isFav(postIdFrom(link.href)), true);
        // Post info: what the thumbnail knows now, the rest once the post page is read
        {
            const m = thumbTags(img).match(/ score:(-?\d+) /);
            renderPopupInfo(popupState, {
                score: thumb.dataset.s34Score || (m ? m[1] : null),
                size: thumb.dataset.s34Size || ''
            });
        }
        overlay.querySelector('.s34-pv-vopts').hidden = !isVideo;

        // Auto next: the timer starts over for every post
        autoNext.elapsed = 0;
        overlay.querySelector('.s34-auto-bar i').style.width = '0%';
        renderAutoNext();

        // Comments below the media: back to the top, "loading" until the post page is read
        overlay.querySelector('.s34-pv-main').scrollTop = 0;
        overlay.scrollTop = 0; // phone layout: the whole popup scrolls

        // Phones: the Back button closes the popup instead of leaving the page
        if (!browsing && isPhoneLayout()) {
            try {
                popupState.prevScrollRestoration = history.scrollRestoration;
                history.scrollRestoration = 'manual'; // closing must not jump the list
                history.pushState({ s34pv: true }, '');
                popupState.pushedHistory = true;
            } catch (e) {}
        }
        renderComments(popupState, null);

        // ---- media: thumbnail first (instant), then the original ----
        const stage = overlay.querySelector('.s34-pv-stage');
        resetZoom(stage);
        stage.replaceChildren();
        const placeholder = new Image();
        placeholder.className = 's34-pv-media s34-pv-placeholder';
        placeholder.src = img.getAttribute('src') || img.dataset.s34Src || '';
        stage.appendChild(placeholder);

        const el = isVideo ? document.createElement('video') : new Image();
        el.className = 's34-pv-media s34-pv-loading';
        if (isVideo) {
            el.controls = true;
            el.playsInline = true;
            el.autoplay = true;
            applyVideoPrefs(el); // your volume, loop and speed
            if (autoNext.on) el.loop = false; // slideshow: play once, then next
            el.addEventListener('ended', () => {
                if (autoNext.on && popupState && popupState.id === myId) autoAdvance();
            });
        }
        const candidates = mediaCandidates(img, isVideo);
        let next = 0;
        let triedPost = false;

        function play() {
            el.play().catch(err => {
                if (err.name === 'NotAllowedError' && !el.muted) {
                    autoMute(el); // sound blocked -> muted (not remembered)
                    el.play().catch(() => {});
                }
            });
        }

        async function tryNext() {
            if (!popupState || popupState.id !== myId) return;
            if (next < candidates.length) {
                el.src = candidates[next++];
                if (isVideo) play();
                return;
            }
            if (triedPost) return;
            triedPost = true;
            const media = await getPostMedia(link.href);
            const url = media && (isVideo ? media.video : media.image);
            if (url && popupState && popupState.id === myId) {
                el.src = url;
                if (isVideo) play();
            }
        }

        el.addEventListener(isVideo ? 'loadeddata' : 'load', () => {
            if (!popupState || popupState.id !== myId) return;
            popupState.mediaReady = true; // auto next counts from here
            popupState.mediaUrl = el.currentSrc || el.src;
            rememberMediaHost(isVideo ? 'video' : 'image', popupState.mediaUrl);
            el.classList.remove('s34-pv-loading');
            placeholder.remove();
            preloadNeighbours(thumb); // next / previous ready before you get there
        });
        el.addEventListener('error', tryNext);
        stage.appendChild(el);
        tryNext();

        // ---- full tag list (with counts) from the post page ----
        fetchPostDoc(link.href).then(doc => {
            if (!doc || !popupState || popupState.id !== myId) return;
            renderPopupInfo(popupState, readPostInfo(doc));
            renderComments(popupState, readComments(doc));
            const tags = readPostTags(doc);
            if (Object.keys(tags).length) {
                popupState.tags = tags;
                popupState.tagsFromPost = true;
            }
            renderPopupTags();
        });
        // If the post page can't be loaded, at least drop the "loading" note
        setTimeout(() => {
            if (popupState && popupState.id === myId && !popupState.tagsFromPost) {
                popupState.tagsFromPost = true;
                renderPopupTags();
                if (!popupState.commentsDone) renderComments(popupState, { comments: [], failed: true });
            }
        }, 15000);
    }

    function stopPopupMedia() {
        if (!popupState) return;
        popupState.overlay.querySelectorAll('video').forEach(v => {
            v.pause();
            v.removeAttribute('src');
            v.load();
        });
    }

    // byBack: closed by the phone's Back button (the history step is already taken)
    function closePopup(byBack) {
        if (!popupState) return;
        const s = popupState;
        if (autoNext.on) stopAutoNext();
        stopPopupMedia();
        s.overlay.remove();
        popupState = null;
        document.documentElement.classList.remove('s34-pv-open');
        // Still on the post you opened? Back to exactly where you were.
        // (Browsed on with ← / →? Then the list stays at the last post.)
        if (s.thumb === s.startThumb) window.scrollTo(0, s.startScroll);
        if (s.pushedHistory) {
            // Take back the extra history step from opening (unless Back did that)
            try {
                if (byBack !== true && history.state && history.state.s34pv) history.back();
                setTimeout(() => { history.scrollRestoration = s.prevScrollRestoration || 'auto'; }, 600);
            } catch (e) {}
        }
    }

    // Phones: the Back button closes the popup
    window.addEventListener('popstate', () => { if (popupState) closePopup(true); });

    function popupStep(dir) {
        if (!popupState) return;
        const list = visibleThumbs();
        const i = list.indexOf(popupState.thumb);
        const target = list[i + dir];
        if (target) openPopup(target);
        else if (dir > 0) showToast('No more posts loaded yet – scroll down to load more.');
    }

    async function popupFavourite() {
        if (!popupState) return;
        const state = popupState;
        const id = postIdFrom(state.postUrl);
        const btn = state.overlay.querySelector('.s34-pv-fav');
        if (isFav(id)) { showToast('Already in your favourites ♥'); return; }
        if (!btn || btn.classList.contains('s34-busy')) return;
        setBusy(btn, true);
        const ok = await addFavourite(id);
        setBusy(btn, false);
        if (ok) {
            styleFavButton(btn, true, true);
            const heart = state.thumb && state.thumb.querySelector('.s34-fav-btn');
            styleFavButton(heart, true, false);
        }
    }

    async function popupDownload() {
        if (!popupState) return;
        const state = popupState;
        let url = state.mediaUrl;
        if (!url) {
            // Media not shown yet: ask the post page for the original
            const media = await getPostMedia(state.postUrl);
            url = media && (state.isVideo ? media.video : media.image);
        }
        if (!url) {
            showToast('Original file not found yet – try again in a moment.');
            return;
        }
        const names = type => (state.tags[type] || []).map(t => t.tag);
        // Resolution for the file name: from the post page (already loaded
        // for the popup's info box), else what hovering the thumbnail found
        const doc = await fetchPostDoc(state.postUrl);
        const size = (doc && readPostSize(doc)) || ((state.thumb && state.thumb.dataset.s34Size) || '').replace('×', 'x');
        downloadOriginal(url, {
            copyright: names('copyright'),
            character: names('character'),
            artist: names('artist')
        }, postIdFrom(state.postUrl), false, size);
    }

    // Posts always open in the popup (Ctrl / middle click still opens the
    // full post page in a new tab)
    document.addEventListener('click', e => {
        if (isPostView) return;
        if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return; // ctrl/middle-click = normal
        if (e.target.closest('.s34-tagbar')) return; // tag chips keep their own clicks
        const a = e.target.closest('.image-list span.thumb a[href]');
        if (!a) return;
        e.preventDefault();
        e.stopPropagation();
        openPopup(a.closest('span.thumb'));
    }, true);

    document.addEventListener('keydown', e => {
        if (!popupState) return;
        const t = e.target;
        if (t.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName)) return;
        if (document.querySelector('.s34-overlay')) return; // settings / Cloudflare window on top
        if (document.querySelector('.s34-follow-menu')) return; // "Follow which artist?" handles its own keys
        if (e.key === 'Escape') { e.preventDefault(); closePopup(); return; }
        if (e.ctrlKey || e.metaKey || e.altKey) return;          // Ctrl+D etc. stay the browser's
        const dir = browseDirection(e);
        if (dir) { e.preventDefault(); popupStep(dir); return; }
        if (e.code === CONFIG.downloadKey || e.repeat) return;    // the download key wins
        const ov = document.querySelector('.s34-pv-overlay');
        if (!ov) return;
        // W / S scroll the picture & comments (when WASD is on)
        if (CONFIG.browseKeys !== 'arrows' && (e.code === 'KeyW' || e.code === 'KeyS')) {
            const main = ov.querySelector('.s34-pv-main');
            const scroller = main && main.scrollHeight > main.clientHeight + 4 ? main : ov;
            e.preventDefault();
            scroller.scrollBy({ top: (e.code === 'KeyS' ? 1 : -1) * Math.round(scroller.clientHeight * 0.7), behavior: 'smooth' });
            return;
        }
        // L (changeable): follow / unfollow the post's artist
        if (e.code === CONFIG.followKey) {
            e.preventDefault();
            const artists = ((popupState.tags && popupState.tags.artist) || []).map(a => (a && a.tag) || a).filter(a => typeof a === 'string' && a);
            if (!artists.length) { showToast('This post has no artist tag to follow.'); return; }
            // one artist: follow right away (with Undo); several: a small menu to choose
            followArtistByKey(artists, popupState.overlay.querySelector('.s34-chip-artist'));
            return;
        }
        // F / C / T (changeable): favourite, collection, theater mode
        const act = e.code === CONFIG.favKey ? 'fav' : e.code === CONFIG.collectKey ? 'collect' : e.code === CONFIG.theaterKey ? 'theater' : '';
        if (act) {
            const btn = ov.querySelector('.s34-pv-side [data-act="' + act + '"]') || ov.querySelector('[data-act="' + act + '"]');
            if (btn && !btn.disabled) { e.preventDefault(); btn.click(); }
        }
    }, true);

    // ← / → and / or A / D (Settings → Viewing posts). A / D by key position
    // (e.code), so it also fits AZERTY & co. The download key wins if it's A or D.
    function browseDirection(e) {
        const mode = CONFIG.browseKeys;
        if (mode !== 'wasd') {
            if (e.key === 'ArrowLeft') return -1;
            if (e.key === 'ArrowRight') return 1;
        }
        if (mode === 'wasd' || mode === 'both') {
            if (e.code === CONFIG.downloadKey || e.shiftKey) return 0;
            if (e.code === 'KeyA') return -1;
            if (e.code === 'KeyD') return 1;
        }
        return 0;
    }

    // "← / →", "A / D" or "← / → or A / D" for tips and tooltips
    function browseKeyText(which) {
        const arrows = which === 'prev' ? '←' : which === 'next' ? '→' : '← / →';
        const wasd = which === 'prev' ? 'A' : which === 'next' ? 'D' : 'A / D';
        if (CONFIG.browseKeys === 'wasd') return wasd;
        if (CONFIG.browseKeys === 'both') return arrows + ' or ' + wasd;
        return arrows;
    }

