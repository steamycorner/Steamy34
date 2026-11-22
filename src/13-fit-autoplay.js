    // =====================================================================
    //  2. FIT TO VIEWPORT + 3. AUTOPLAY
    // =====================================================================

    function setupMedia() {
        const img = document.querySelector('#image');
        const video = document.querySelector('#gelcomVideoPlayer, #content video');
        const media = video || img;
        if (!media) return;

        const notice = document.querySelector('#resized_notice');
        if (notice) notice.style.display = 'none';

        function getBox() {
            if (video) {
                return video.closest('.fluid_video_wrapper') ||
                       document.getElementById('fluid_video_wrapper_gelcomVideoPlayer') ||
                       video;
            }
            return img;
        }

        function getNaturalSize() {
            if (video) return { w: video.videoWidth, h: video.videoHeight };
            return { w: img.naturalWidth, h: img.naturalHeight };
        }

        // Left edge of the content column - the sidebar is only read, never changed
        function getLeftEdge() {
            const column = media.closest('.content') || getBox().parentElement;
            return column.getBoundingClientRect().left;
        }

        function setSize(el, w, h) {
            el.removeAttribute('width');
            el.removeAttribute('height');
            el.style.setProperty('width', w + 'px', 'important');
            el.style.setProperty('height', h + 'px', 'important');
            el.style.setProperty('max-width', 'none', 'important');
            el.style.setProperty('max-height', 'none', 'important');
            el.style.setProperty('object-fit', 'contain', 'important');
        }

        // (Beta 3.7.2) Pictures can also be shown at their real size - a click
        // on the picture switches. Videos are always fitted.
        let realSize = !!img && !video && !CONFIG.fitToScreen;

        function fit() {
            const { w, h } = getNaturalSize();
            if (!w || !h) return;
            if (realSize) {
                setSize(img, w, h);
                img.style.setProperty('cursor', 'zoom-out', 'important');
                return;
            }
            if (img && !video) img.style.setProperty('cursor', 'zoom-in', 'important');

            const availW = document.documentElement.clientWidth - getLeftEdge() - CONFIG.padding;
            const availH = window.innerHeight - CONFIG.padding * 2;

            let scale = Math.min(availW / w, availH / h);
            // long strips (comics): fit the width only, the page scrolls
            if (img && !video && isLongStrip(w, h)) scale = availW / w;
            if (!CONFIG.allowUpscale) scale = Math.min(scale, 1);

            const newW = Math.floor(w * scale);
            const newH = Math.floor(h * scale);

            const box = getBox();
            setSize(box, newW, newH);
            if (video && box !== video) setSize(video, newW, newH);
        }

        function scrollIntoPlace() {
            if (!CONFIG.scrollToMedia) return;
            const top = getBox().getBoundingClientRect().top + window.scrollY - CONFIG.padding;
            window.scrollTo({ top: Math.max(0, top) });
        }

        if (img && !video && CONFIG.useOriginalImage) {
            const original = getOriginalUrl();
            if (original && img.src !== original) img.src = original;
        }

        let scrolled = false;
        function fitAndScroll() {
            fit();
            if (!scrolled && getNaturalSize().w) {
                scrolled = true;
                scrollIntoPlace();
            }
        }

        if (img) img.addEventListener('load', fitAndScroll);
        if (img && !video) {
            img.addEventListener('click', () => {
                const { w, h } = getNaturalSize();
                if (!w || !h) return;
                const before = img.getBoundingClientRect();
                realSize = !realSize;
                fit();
                // keep the top of the picture where it was
                if (realSize && before.top < 0) window.scrollTo({ top: window.scrollY + img.getBoundingClientRect().top - before.top });
            });
        }
        if (video) {
            video.addEventListener('loadedmetadata', fitAndScroll);
            [300, 1000, 2500].forEach(t => setTimeout(fit, t));
        }
        window.addEventListener('resize', fit);
        fitAndScroll();

        // ---- Autoplay ----
        if (video && CONFIG.autoplay) {
            let userPaused = false;
            let started = false;

            video.addEventListener('pause', () => { if (started) userPaused = true; });
            video.addEventListener('playing', () => { started = true; userPaused = false; });

            function tryPlay() {
                if (started || userPaused || !video.paused) return;
                const p = video.play();
                if (p && p.catch) {
                    p.catch(err => {
                        if (err.name === 'NotAllowedError' && CONFIG.muteIfBlocked && !video.muted) {
                            console.log('[Steamy34] Autoplay with sound blocked, playing muted.');
                            autoMute(video);
                            video.play().catch(e => console.warn('[Steamy34] Autoplay failed:', e));
                        }
                    });
                }
            }

            video.autoplay = true;
            video.preload = 'auto';
            video.addEventListener('loadedmetadata', tryPlay);
            video.addEventListener('canplay', tryPlay);
            [0, 500, 1500, 3000].forEach(t => setTimeout(tryPlay, t));
        }
    }

    // (Beta 3.8.1) Blocked stays blocked: a post page with a blacklisted tag
    // is covered - the picture / video stays invisible from the start
    // (s34-post-pending, set at document-start) until the tags are checked.
    if (isPostView) {
        document.documentElement.classList.add('s34-post-pending');
        setTimeout(() => document.documentElement.classList.remove('s34-post-pending'), 5000); // (never stuck hidden)
    }
    function checkPostBlocked() {
        const root = document.documentElement;
        try {
            const tags = Array.from(document.querySelectorAll('#tag-sidebar li[class*="tag-type-"]')).map(getTagFromRow).filter(Boolean);
            const hit = blockedTagsOf(tags);
            if (!hit.length) return;
            root.classList.add('s34-post-blocked');
            const media = document.querySelector('#gelcomVideoPlayer, #content video');
            const holdVideo = () => { if (media && root.classList.contains('s34-post-blocked')) { media.pause(); media.muted = true; } };
            if (media) { media.autoplay = false; holdVideo(); media.addEventListener('play', holdVideo); }
            const spot = document.querySelector('.fluid_video_wrapper, #fluid_video_wrapper_gelcomVideoPlayer, #image, #gelcomVideoPlayer');
            const cover = makeBlockCover(hit, () => { root.classList.remove('s34-post-blocked'); cover.remove(); });
            cover.classList.add('s34-blcover-post');
            if (spot) spot.before(cover); else (document.querySelector('#content') || document.body).prepend(cover);
        } finally {
            root.classList.remove('s34-post-pending');
        }
    }
    function makeBlockCover(hit, onShow) {
        const cover = document.createElement('div');
        cover.className = 's34-blcover';
        cover.innerHTML = '<b>Hidden</b><span>This post has a tag you blacklisted:</span><span class="s34-blcover-tags"></span><button type="button">Show anyway</button>';
        cover.querySelector('.s34-blcover-tags').textContent = hit.map(t => t.replace(/_/g, ' ')).join(', ');
        cover.querySelector('button').addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); onShow(); });
        return cover;
    }
    if (isPostView) onReady(() => setTimeout(checkPostBlocked, 0)); // (after every part of the script is set up)
    if (isPostView) onReady(setupMedia);

