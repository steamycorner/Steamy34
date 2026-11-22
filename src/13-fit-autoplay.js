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

    if (isPostView) onReady(setupMedia);

