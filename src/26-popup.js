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

    // The post in the popup, as the collection menu wants it
    function popupCollectPosts(s) {
        return [{ id: postIdFrom(s.postUrl), thumb: popupThumbSrc(s), tags: popupTagList(s).join(' ') }];
    }

    // (Beta 3.13) Viewed / downloaded, right in the popup (before: only on thumbnails)
    function popupToggleMark(act) {
        const s = popupState;
        if (!s) return;
        const id = postIdFrom(s.postUrl);
        if (act === 'markseen') {
            const seen = isSeen(id, CONFIG.trackDownloads && isDownloaded(id));
            setThumbViewed(id, !seen);
            showToast(seen ? 'Marked as not viewed.' : 'Marked as viewed.');
        } else {
            if (isDownloaded(id)) { unmarkDownloaded([id]); showToast('Download mark taken off.'); }
            else { markDownloadedOnly([id]); showToast('Marked as downloaded (nothing was downloaded).'); }
            styleDownloadButton(s.overlay.querySelector('.s34-dl-btn'), isDownloaded(id));
        }
        showDownloadedState([s.thumb]);
        stylePopupExtras();
    }

    // Every tag of the post in the popup, as a plain list
    function popupTagList(st) {
        return [].concat(...Object.values((st && st.tags) || {}).map(l => (l || []).map(x => x.tag)));
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

    // The posts ← / → move through: the page's thumbnails - or, opened from
    // the Following window, that window's grid (popupState.list, Beta 3.6).
    // A list: { thumbs(), state() 'more' | 'loading' | 'done' | null, more() }
    const PAGE_LIST = {
        thumbs: () => Array.from(document.querySelectorAll('.image-list span.thumb'))
            .filter(t => t.isConnected && !t.classList.contains('s34-bl-hidden') && t.offsetParent !== null),
        state: () => (infiniteState ? infiniteState() : null),
        more: () => window.dispatchEvent(new CustomEvent('s34-load-more'))
    };
    const popupList = () => (popupState && popupState.list) || PAGE_LIST;
    function visibleThumbs() { return popupList().thumbs(); }

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
                    <button type="button" class="s34-pv-later" data-act="later" title="Watch later – a list for posts to look at properly later">${CLOCK_SVG}<span>Later</span></button>
                    <button type="button" class="s34-pv-icame" data-act="icame" title="iCame – rule34's own counter (once every 24 hours)">${SPLASH_SVG}<span>iCame</span></button>
                </div>
                <div class="s34-pv-marks">
                    <button type="button" data-act="markseen" title="Viewed – click to mark as not viewed (${keyLabel(CONFIG.markViewedKey)})">${TB_EYE_SVG}<span>Viewed</span></button>
                    <button type="button" data-act="markdl" title="Mark as downloaded without downloading – or take the mark off (${keyLabel(CONFIG.markDlKey)})">${TB_DL_SVG}<span>Downloaded</span></button>
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
            else if (act === 'later') toggleWatchLater();
            else if (act === 'icame') sendICame(actEl);
            else if (act === 'markseen' || act === 'markdl') popupToggleMark(act);
            else if (act === 'collect') {
                const s = popupState;
                if (s) openCollectMenu(actEl, popupCollectPosts(s), { menu: e.shiftKey });
            }
        });
        overlay.querySelector('.s34-pv-collect').addEventListener('contextmenu', e => {
            e.preventDefault();
            if (popupState) openCollectMenu(e.currentTarget, popupCollectPosts(popupState), { menu: true });
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

    // (Beta 3.8.1) Blocked stays blocked: a post with a blacklisted tag (its
    // thumbnail didn't list it, or you opened it some other way) is covered
    function coverIfBlocked(blockedSet) {
        const st = popupState;
        if (!st) return;
        const all = popupTagList(st);
        let hit = st.blockShown ? [] : blockedTagsOf(all);
        // (Beta 3.10) a soft-blocked thumbnail you already uncovered: only other tags cover it
        if (hit.length && st.thumb && st.thumb.classList.contains('s34-bl-unblur')) { const soft = getSoftTags(); hit = hit.filter(t => !soft.has(t)); }
        const stage = st.overlay.querySelector('.s34-pv-stage');
        const old = stage && stage.querySelector('.s34-blcover');
        if (!hit.length) {
            if (old) old.remove();
            st.overlay.classList.remove('s34-pv-blocked');
            return;
        }
        st.overlay.classList.add('s34-pv-blocked');
        stage.querySelectorAll('video').forEach(v => {
            v.pause(); v.muted = true;
            if (!v._s34BlHold) { v._s34BlHold = true; v.addEventListener('play', () => { if (st.overlay.classList.contains('s34-pv-blocked')) v.pause(); }); }
        });
        if (old) old.remove();
        stage.appendChild(makeBlockCover(hit, () => {
            st.blockShown = true;
            st.overlay.classList.remove('s34-pv-blocked');
            const c = stage.querySelector('.s34-blcover');
            if (c) c.remove();
        }));
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
        coverIfBlocked(blockedSet);
        try { stylePopupExtras(); } catch (e) {}
        if (!popupState.tagsFromPost) {
            const note = document.createElement('div');
            note.className = 's34-pv-note';
            note.textContent = 'loading full tag list…';
            box.appendChild(note);
        }
    }

    // list: where ← / → go (see PAGE_LIST) - kept while browsing
    function openPopup(thumb, list) {
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

        // (a post from a collection: picture or video isn't known until its page is read)
        const typeUnknown = thumb.dataset.s34TypeUnknown === '1';
        let isVideo = isVideoThumb(img);
        // Where the page was when the popup first opened (restored on close)
        const browsing = !!popupState;
        const start = browsing
            ? { startThumb: popupState.startThumb, startScroll: popupState.startScroll, list: popupState.list,
                pushedHistory: popupState.pushedHistory, prevScrollRestoration: popupState.prevScrollRestoration }
            : { startThumb: thumb, startScroll: window.scrollY, list: list || null };
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

        // The media itself - right away, or once the post page said what it is
        function startMedia(isVideo, directUrl) {
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
        const candidates = directUrl ? [directUrl] : mediaCandidates(img, isVideo);
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
            if (!isVideo) fitLongStrip(el);
            preloadNeighbours(thumb); // next / previous ready before you get there
        });
        el.addEventListener('error', tryNext);
        stage.appendChild(el);
        tryNext();
        }
        if (!typeUnknown) startMedia(isVideo);
        else getPostMedia(link.href, 'popup').then(m => {
            if (!popupState || popupState.id !== myId) return;
            isVideo = !!(m && m.video);
            popupState.isVideo = isVideo;
            overlay.querySelector('.s34-pv-vopts').hidden = !isVideo;
            startMedia(isVideo, m && (isVideo ? m.video : m.image));
            if (thumb._s34OnType) thumb._s34OnType(isVideo);
        });

        // ---- full tag list (with counts) from the post page ----
        const loadPostInfo = () => fetchPostDoc(link.href, 'popup').then(doc => {
            if (!popupState || popupState.id !== myId) return;
            if (!doc && cloudflarePaused()) {
                // A Cloudflare check: "Solve check" right in the tag area, and
                // the tags load by themselves once it's solved
                popupState.tagsFromPost = true;
                renderPopupTags();
                const box = popupState.overlay.querySelector('.s34-pv-tags');
                if (box) box.appendChild(cloudflareInline('Tags and info wait for a quick Cloudflare check.'));
                window.addEventListener('s34-cf-passed', () => { if (popupState && popupState.id === myId) loadPostInfo(); }, { once: true });
                return;
            }
            if (!doc) return;
            renderPopupInfo(popupState, readPostInfo(doc));
            renderComments(popupState, readComments(doc));
            const tags = readPostTags(doc);
            if (Object.keys(tags).length) {
                popupState.tags = tags;
                popupState.tagsFromPost = true;
                if (!popupState.fromStrip) openSimilarStrip(true); // Similar open: this post's similar ones
            }
            renderPopupTags();
        });
        loadPostInfo();
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
        // a window the popup was opened from (a collection) comes back
        // (a moment later: the Esc that closed the popup mustn't close the window too)
        setTimeout(() => document.querySelectorAll('.s34-under-popup').forEach(o => o.classList.remove('s34-under-popup')), 0);
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
        let i = list.indexOf(popupState.thumb);
        // a post from the Similar strip: go on from the page post you left
        if (i < 0) { const strip = popupState.overlay.querySelector('.s34-pv-simstrip'); if (strip && strip._from) i = list.indexOf(strip._from); }
        if (i < 0) return;
        const target = list[i + dir];
        if (target) {
            openPopup(target);
            // 3 posts before the end: the next page starts loading already
            if (dir > 0 && list.length - (i + 2) <= 3) askForMorePosts();
        } else if (dir > 0) {
            stepWhenMoreArrive(popupState.thumb, list.length);
        }
    }

    // Browsing on past the last loaded post: load the next page and go on
    // (Beta 3.5.1 - before, the popup stopped with "scroll down to load more")
    function askForMorePosts() {
        const list = popupList(), st = list.state();
        if (!st || st === 'done') return false;
        list.more();
        return true;
    }
    let waitingForMore = false;
    async function stepWhenMoreArrive(fromThumb, hadCount) {
        if (waitingForMore) return;
        const list = popupList();
        if (!list.state()) { showToast('That was the last post on this page.'); return; }
        waitingForMore = true;
        // the list behind the popup goes to this post, so the new page lands
        // near the window (and isn't tidied away as "far off" right away)
        try { fromThumb.scrollIntoView({ block: 'center' }); } catch (e) {}
        try {
            for (let attempt = 0; attempt < 3; attempt++) {
                if (list.state() === 'done') { showToast('That was the last post.'); return; }
                if (cloudflarePaused()) { showToast('More posts wait for the quick Cloudflare check.', 'Solve check', openCloudflarePanel, 10000); return; }
                if (attempt === 0) showToast('Loading more posts…');
                askForMorePosts();
                // wait for the page to arrive (up to ~15 s)
                for (let t = 0; t < 60; t++) {
                    await new Promise(r => setTimeout(r, 250));
                    if (!popupState || popupState.thumb !== fromThumb) return; // closed or moved meanwhile
                    if (list.state() !== 'loading' && visibleThumbs().length > hadCount) break;
                }
                if (visibleThumbs().length > hadCount) { popupStep(1); return; }
                // (a page where every post was hidden - try the next one)
            }
            showToast('No more posts to show right now.');
        } finally {
            waitingForMore = false;
        }
    }

    async function popupFavourite() {
        if (!popupState) return;
        const state = popupState;
        const id = postIdFrom(state.postUrl);
        const btn = state.overlay.querySelector('.s34-pv-fav');
        if (!btn) return;
        await toggleFavourite(id, btn); // (♥ again removes it, with Undo)
    }

    async function popupDownload() {
        if (!popupState) return;
        const state = popupState;
        const thumbSrc = popupThumbSrc(state);
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
        }, postIdFrom(state.postUrl), false, size, thumbSrc);
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
        if (document.querySelector('.s34-overlay:not(.s34-under-popup)')) return; // settings / Cloudflare window on top
        if (document.querySelector('.s34-follow-menu')) return; // "Follow which artist?" handles its own keys
        if (e.key === 'Escape') { e.preventDefault(); closePopup(); return; }
        if (e.ctrlKey || e.metaKey || e.altKey) return;          // Ctrl+D etc. stay the browser's
        if (similarStripStep(e)) { e.preventDefault(); return; } // Shift + ← / →: through the Similar strip
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
        // V / M (changeable, Beta 3.13): viewed, marked as downloaded
        if (e.code === CONFIG.markViewedKey || e.code === CONFIG.markDlKey) {
            e.preventDefault();
            popupToggleMark(e.code === CONFIG.markViewedKey ? 'markseen' : 'markdl');
            return;
        }
        // Shift + C: the list of all collections (C alone may add straight away)
        if (e.code === CONFIG.collectKey && e.shiftKey) {
            e.preventDefault();
            openCollectMenu(ov.querySelector('.s34-pv-collect'), popupCollectPosts(popupState), { menu: true });
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

