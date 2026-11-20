    // =====================================================================
    //  5. HOVER VIDEO PREVIEW (posts page)
    //  The list page doesn't contain the video URL, so on hover we fetch
    //  the post page once, read its video source and cache it.
    // =====================================================================

    const mediaCache = new Map(); // post URL -> Promise<{ video, image } | null>
    const postDocCache = new Map(); // post URL -> Promise<Document | null>

    // Load and parse a post page once; everything that needs it shares the result.
    // Every loaded post page also teaches us the types of its tags.
    // ---- Cloudflare checks ----
    // When the site answers with a Cloudflare "checking your browser" page,
    // background loading pauses for a few minutes instead of hammering it
    // (which only makes the checks come more often).
    let cfPausedUntil = 0;
    const CF_PAUSE_MS = 3 * 60 * 1000;

    // NOTE: normal pages also contain Cloudflare's "challenge-platform" helper
    // script, so that alone must NOT count. A real check page has the
    // "Just a moment" title, or an error status plus Cloudflare check markers.
    function isCloudflareCheck(status, html) {
        html = html || '';
        if (/<title>\s*(Just a moment|Attention Required)/i.test(html)) return true;
        const errorStatus = status === 403 || status === 429 || status === 503;
        return errorStatus && /cf-chl-|cf_chl_|challenge-form|cf-browser-verification/i.test(html);
    }

    function cloudflarePaused() {
        return Date.now() < cfPausedUntil;
    }

    let cfCheckUrl = location.href; // a page that showed the check

    function pauseForCloudflare(url) {
        const wasPaused = cloudflarePaused();
        cfPausedUntil = Date.now() + CF_PAUSE_MS;
        if (url) cfCheckUrl = url;
        console.warn('[Steamy34] Cloudflare check detected - background loading paused.');
        // Background requests can't pass a Cloudflare check themselves -
        // you have to. A banner you can't miss stays until it's solved.
        if (!wasPaused || !document.querySelector('.s34-cf-banner')) showCloudflareBanner();
    }

    // ---- Big banner across the top + ⚠ in the tab title ----
    let cfTitleBefore = null;
    let cfTitleTimer = null;

    // The pause ran out (check solved elsewhere, e.g. in another tab)? Drop
    // the banner; if the check is still there, the next request brings it back.
    // Only runs while a banner is up - no timer at all the rest of the time.
    let cfWatchTimer = null;
    function watchCloudflarePause() {
        if (cfWatchTimer) return;
        cfWatchTimer = setInterval(() => {
            const b = document.querySelector('.s34-cf-banner');
            if (!b) { clearInterval(cfWatchTimer); cfWatchTimer = null; return; }
            if (cloudflarePaused() || !b.classList.contains('s34-show')) return;
            clearInterval(cfWatchTimer);
            cfWatchTimer = null;
            clearInterval(cfTitleTimer);
            cfTitleTimer = null;
            if (cfTitleBefore !== null) document.title = cfTitleBefore;
            cfTitleBefore = null;
            b.classList.remove('s34-show');
            setTimeout(() => b.remove(), 250);
        }, 5000);
    }

    function showCloudflareBanner() {
        if (!document.body) { document.addEventListener('DOMContentLoaded', showCloudflareBanner, { once: true }); return; }
        let banner = document.querySelector('.s34-cf-banner');
        if (!banner) {
            banner = document.createElement('div');
            banner.className = 's34-cf-banner';
            banner.setAttribute('role', 'alert');
            banner.innerHTML = `
                <div class="s34-cf-banner-icon"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/></svg></div>
                <div class="s34-cf-banner-text">
                    <b>Quick check needed</b>
                    <span>rule34 wants to confirm you're human. Some loading is paused meanwhile.</span>
                </div>
                <button type="button" class="s34-cf-banner-solve">Solve check</button>
                <button type="button" class="s34-cf-banner-x" title="Hide (loading stays paused until the check is solved)">✕</button>`;
            banner.querySelector('.s34-cf-banner-solve').addEventListener('click', openCloudflarePanel);
            banner.querySelector('.s34-cf-banner-x').addEventListener('click', () => hideCloudflareBanner(false));
            document.body.appendChild(banner);
        }
        requestAnimationFrame(() => banner.classList.add('s34-show'));
        watchCloudflarePause();

        // A quiet note in the tab title, so it's seen from other tabs too
        if (cfTitleBefore === null) cfTitleBefore = document.title;
        clearInterval(cfTitleTimer);
        cfTitleTimer = null;
        document.title = 'Check needed · ' + cfTitleBefore;
    }

    function hideCloudflareBanner(solved) {
        const banner = document.querySelector('.s34-cf-banner');
        if (banner) {
            banner.classList.remove('s34-show');
            setTimeout(() => banner.remove(), 250);
        }
        clearInterval(cfTitleTimer);
        cfTitleTimer = null;
        if (cfTitleBefore !== null) document.title = cfTitleBefore;
        cfTitleBefore = null;
        if (!solved) showToast('Loading stays paused until the check is solved.', 'Solve check', openCloudflarePanel, 10000);
    }

    // Called once the check has been passed: everything resumes
    function cloudflarePassed() {
        cfPausedUntil = 0;
        console.log('[Steamy34] Cloudflare check passed - resuming.');
        hideCloudflareBanner(true);
        // Drop "loading stays paused…" reminders
        document.querySelectorAll('.s34-toasts .s34-toast').forEach(t => {
            if (/paused|Cloudflare|check/i.test(t.textContent)) hideToast(t);
        });
        window.dispatchEvent(new CustomEvent('s34-cf-passed'));
        if (lookupQueue.length) { lookupRunning = false; runLookups(); }
    }

    // Shows the Cloudflare check page inside a window on top of the site, so
    // you can tick "I'm not a robot" without leaving. It closes by itself
    // once the check is passed.
    // NOTE: the check page in the frame must be left exactly as it is - no
    // restyling, hiding, scrolling or cropping. 13.3-13.6 tried that and
    // Cloudflare kept starting the check over.
    function openCloudflarePanel() {
        if (document.querySelector('.s34-cf-overlay')) return;

        const overlay = document.createElement('div');
        overlay.className = 's34-overlay s34-cf-overlay';
        const panel = document.createElement('div');
        panel.className = 's34-panel s34-cf-panel';
        panel.innerHTML = `
            <div class="s34-panel-head">
                <h2>Cloudflare check</h2>
                <button type="button" class="s34-close" title="Close" aria-label="Close">✕</button>
            </div>
            <div class="s34-cf-note">
                Confirm below that you're not a robot. This window closes by itself
                once the check is passed, and Steamy34 continues where it stopped.
            </div>
            <iframe class="s34-cf-frame" referrerpolicy="same-origin"></iframe>
            <div class="s34-panel-foot">
                <button class="s34-btn s34-link" data-act="tab">Open in new tab instead</button>
                <button class="s34-btn" data-act="reload">Reload page</button>
                <button class="s34-btn s34-primary" data-act="done">I'm done</button>
            </div>`;
        overlay.appendChild(panel);

        const frame = panel.querySelector('.s34-cf-frame');

        function close() {
            clearInterval(poll);
            overlay.remove();
        }

        // The frame is on the same site, so we can see when it shows a normal
        // page again (= check passed)
        function frameShowsNormalPage() {
            try {
                const doc = frame.contentDocument;
                if (!doc || !doc.documentElement || doc.URL === 'about:blank') return false;
                const html = doc.documentElement.outerHTML;
                return html.length > 500 && !isCloudflareCheck(200, html);
            } catch (e) {
                return false; // not readable yet
            }
        }

        const poll = setInterval(() => {
            if (frameShowsNormalPage()) {
                close();
                cloudflarePassed();
                showToast('Cloudflare check passed – continuing.');
            }
        }, 1000);

        panel.addEventListener('click', e => {
            const act = e.target.dataset && e.target.dataset.act;
            if (e.target.classList.contains('s34-close')) close();
            else if (act === 'tab') window.open(cfCheckUrl, '_blank', 'noopener');
            else if (act === 'reload') location.reload();
            else if (act === 'done') { close(); cloudflarePassed(); }
        });

        document.body.appendChild(overlay);
        frame.src = cfCheckUrl;
    }

    // fetch() that gives up after a while instead of hanging forever
    // (the timer also covers reading the page body; aborting a finished
    // request does nothing, so it is simply left to run out)
    function fetchWithTimeout(url, ms = 12000) {
        const ctrl = new AbortController();
        setTimeout(() => ctrl.abort(), ms);
        return fetch(url, { credentials: 'include', signal: ctrl.signal });
    }

    function fetchPostDoc(postUrl) {
        if (cloudflarePaused()) return Promise.resolve(null);
        if (!postDocCache.has(postUrl)) {
            const p = fetchWithTimeout(postUrl)
                .then(async r => {
                    const html = await r.text();
                    if (isCloudflareCheck(r.status, html)) {
                        pauseForCloudflare(postUrl);
                        throw new Error('Cloudflare check (HTTP ' + r.status + ')');
                    }
                    if (!r.ok) throw new Error('HTTP ' + r.status);
                    return html;
                })
                .then(html => {
                    const doc = new DOMParser().parseFromString(html, 'text/html');
                    learnTagTypes(doc);
                    return doc;
                })
                .catch(err => {
                    console.warn('[Steamy34] Could not read post', postUrl, err.message || err);
                    postDocCache.delete(postUrl); // allow a retry later
                    return null;
                });
            postDocCache.set(postUrl, p);
        }
        return postDocCache.get(postUrl);
    }

    // Read the post page once: video source, or the full-quality image
    function getPostMedia(postUrl) {
        if (!mediaCache.has(postUrl)) {
            const p = fetchPostDoc(postUrl)
                .then(doc => {
                    if (!doc) throw new Error('post page not available');
                    const abs = u => u ? new URL(u, location.href).href : null;

                    const source = doc.querySelector('#gelcomVideoPlayer source, video source, video[src]');
                    let video = source && (source.getAttribute('src') || '');

                    const orig = Array.from(doc.querySelectorAll('a'))
                        .find(a => /original\s*image/i.test(a.textContent));
                    const origHref = orig && orig.getAttribute('href');

                    let image = null;
                    if (origHref && /\.(mp4|webm)(\?|$)/i.test(origHref)) {
                        if (!video) video = origHref;
                    } else if (origHref) {
                        image = origHref;
                    } else {
                        const main = doc.querySelector('#image');
                        image = main && main.getAttribute('src');
                    }
                    const result = { video: abs(video), image: abs(image) };
                    if (result.video) rememberMediaHost('video', result.video);
                    if (result.image) rememberMediaHost('image', result.image);
                    return result;
                })
                .catch(err => {
                    console.warn('[Steamy34] Could not read post', postUrl, err);
                    mediaCache.delete(postUrl); // allow a retry later
                    return null;
                });
            mediaCache.set(postUrl, p);
        }
        return mediaCache.get(postUrl);
    }

    // ---- Media addresses built from the thumbnail ----
    // Thumbnail: <host>/thumbnails/<dir>/thumbnail_<hash>.jpg
    // Original:  <media host>/images/<dir>/<hash>.<ext>
    // The media hosts that actually work are remembered.
    const MEDIA_HOSTS_KEY = 'steamy34_mediahosts';
    const DEFAULT_MEDIA_HOSTS = {
        video: ['https://aws-mp4.rule34.xxx', 'https://wimg.rule34.xxx', 'https://api-cdn-mp4.rule34.xxx'],
        image: ['https://wimg.rule34.xxx', 'https://api-cdn.rule34.xxx']
    };
    const mediaHosts = (() => {
        try { return GM_getValue(MEDIA_HOSTS_KEY, null) || {}; } catch (e) { return {}; }
    })();

    function hostsFor(kind) {
        return [...new Set([...(mediaHosts[kind] || []), ...DEFAULT_MEDIA_HOSTS[kind]])];
    }

    function rememberMediaHost(kind, url) {
        try {
            const origin = new URL(url).origin;
            const list = mediaHosts[kind] || [];
            if (list[0] === origin) return;
            mediaHosts[kind] = [origin, ...list.filter(h => h !== origin)].slice(0, 4);
            GM_setValue(MEDIA_HOSTS_KEY, mediaHosts);
        } catch (e) {}
    }

    function mediaCandidates(img, isVideo) {
        const src = img.getAttribute('src') || img.dataset.s34Src || '';
        const m = src.match(/\/thumbnails\/+([^/]+)\/+thumbnail_([^./?]+)\./i);
        if (!m) return [];
        const [, dir, hash] = m;
        const isGif = /\s(animated|gif|animated_gif)\s/.test(thumbTags(img));
        const exts = isVideo ? ['mp4', 'webm']
                   : isGif   ? ['gif', 'jpeg', 'jpg', 'png']
                             : ['jpeg', 'jpg', 'png', 'gif'];
        const out = [];
        hostsFor(isVideo ? 'video' : 'image').forEach(host =>
            exts.forEach(ext => out.push(`${host}/images/${dir}/${hash}.${ext}`)));
        return out;
    }

    function setupHoverPreview(thumbs) {
        if (NO_HOVER) return; // touch screens: a tap opens the post instead
        (thumbs || document.querySelectorAll('.image-list span.thumb')).forEach(thumb => {
            if (thumb.dataset.s34Hover) return;
            const img = thumb.querySelector('img');
            const link = thumb.querySelector('a[href]');
            if (!img || !link) return;

            const isVideo = isVideoThumb(img);
            if (isVideo && !CONFIG.hoverPreview) return;
            if (!isVideo && !CONFIG.hoverHighRes) return;
            thumb.dataset.s34Hover = '1';

            let timer = null;
            let overlay = null;
            let hovering = false;
            let hoverId = 0;

            function stop() {
                hovering = false;
                clearTimeout(timer);
                thumb.classList.remove('s34-loading');
                if (overlay) {
                    if (overlay.tagName === 'VIDEO') {
                        overlay.pause();
                        overlay.removeAttribute('src');
                        overlay.load(); // abort the download
                    } else {
                        overlay.removeAttribute('src'); // cancel a half-loaded image
                    }
                    overlay.remove();
                    overlay = null;
                }
            }

            thumb.addEventListener('mouseenter', () => {
                hovering = true;
                const myId = ++hoverId;
                timer = setTimeout(() => {
                    if (!hovering || myId !== hoverId || overlay) return;
                    if (thumb.classList.contains('s34-bl-marked')) return; // blacklisted: no preview
                    thumb.classList.add('s34-loading');

                    // 1st choice: build the file address straight from the
                    // thumbnail (no post page needed, so Cloudflare checks on
                    // the site don't matter). 2nd choice: read the post page.
                    const candidates = mediaCandidates(img, isVideo);
                    let next = 0;
                    let triedPostPage = false;

                    const el = overlay = isVideo ? document.createElement('video') : new Image();
                    el.className = 's34-hover-video';
                    if (isVideo) {
                        el.muted = CONFIG.hoverMuted;
                        el.loop = true;
                        el.playsInline = true;
                        el.preload = 'auto';
                        el.autoplay = true;
                    } else {
                        el.decoding = 'async';
                    }

                    function play() {
                        el.play().catch(err => {
                            // Sound blocked -> fall back to muted
                            if (overlay === el && err.name === 'NotAllowedError' && !el.muted) {
                                el.muted = true;
                                el.play().catch(() => {});
                            }
                        });
                    }

                    async function tryNext() {
                        if (overlay !== el) return; // mouse already left
                        if (next < candidates.length) {
                            el.src = candidates[next++];
                            if (isVideo) play();
                            return;
                        }
                        if (triedPostPage) { thumb.classList.remove('s34-loading'); return; }
                        triedPostPage = true;
                        const media = await getPostMedia(link.href);
                        const url = media && (isVideo ? media.video : media.image);
                        if (overlay !== el) return;
                        if (url) {
                            el.src = url;
                            if (isVideo) play();
                        } else {
                            thumb.classList.remove('s34-loading');
                        }
                    }

                    el.addEventListener(isVideo ? 'playing' : 'load', () => {
                        if (overlay !== el) return;
                        thumb.classList.remove('s34-loading');
                        el.classList.add('s34-playing');
                        rememberMediaHost(isVideo ? 'video' : 'image', el.currentSrc || el.src);
                    });
                    el.addEventListener('error', tryNext); // wrong guess -> next one

                    thumb.appendChild(el);
                    tryNext();
                }, CONFIG.hoverDelay);
            });

            thumb.addEventListener('mouseleave', stop);
        });
    }

