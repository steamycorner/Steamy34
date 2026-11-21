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
    // After a check everything loads more slowly for a while (Beta 3.5)
    const CF_SLOW_MS = 10 * 60 * 1000;
    let cfSlowUntil = 0;

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

    // ---- One line for every page Steamy34 loads from rule34 (Beta 3.5) ----
    // Cloudflare asks for a check when one browser loads many pages in a
    // short time. Before 3.5 the popup, preloads, hover sizes, artist
    // lookups, scrolling and the Following check all loaded at once, in
    // bursts. Now they wait in one line: what you asked for first, a short
    // gap between loads, the extras at most BG_PER_MINUTE a minute, and the
    // Following check only while you're not clicking around.
    // (Pictures and videos come from the image servers - not part of this.)
    const PAGE_KINDS = {
        action:  { prio: 0, gap: 0,    label: 'vote / favourite' },
        popup:   { prio: 0, gap: 250,  label: 'popup' },
        scroll:  { prio: 1, gap: 400,  label: 'scrolling' },
        batch:   { prio: 2, gap: 900,  label: 'batch / collection download' },
        followNow: { prio: 2, gap: 900, label: 'Following "Check now"' },
        preload: { prio: 3, gap: 1000, label: 'next post in advance' },
        hover:   { prio: 3, gap: 1000, label: 'size on hover' },
        lookup:  { prio: 4, gap: 1200, label: 'artist lookup' },
        follow:  { prio: 5, gap: 1500, label: 'Following check' }
    };
    const pageKind = k => PAGE_KINDS[k] || PAGE_KINDS.lookup;
    const isUserKind = k => pageKind(k).prio <= 1; // you asked for it (popup, scrolling, a click)
    const BG_PER_MINUTE = 20;
    const FOLLOW_IDLE_MS = 15000;
    const pageQueue = [];
    const pageLog = []; // { at, kind } of the last 10 minutes - for the bug report info
    let pageJobN = 0, pagePumping = false, pageStartedAt = 0, pageDoneAt = 0, pagesInFlight = 0;
    let lastUserInputAt = 0;
    ['pointerdown', 'keydown', 'wheel', 'touchstart'].forEach(t =>
        window.addEventListener(t, () => { lastUserInputAt = Date.now(); }, { capture: true, passive: true }));

    const pageSleep = ms => new Promise(r => setTimeout(r, ms));
    const pageError = (msg, flags) => Object.assign(new Error(msg), flags);

    function logPage(kind) {
        const now = Date.now();
        pageLog.push({ at: now, kind });
        while (pageLog.length && now - pageLog[0].at > 600000) pageLog.shift();
    }
    function recentPages(ms) {
        const since = Date.now() - ms, out = {};
        pageLog.forEach(p => { if (p.at >= since) out[p.kind] = (out[p.kind] || 0) + 1; });
        return out;
    }

    // Loads a rule34 page through the line -> { status, ok, html }.
    // Fails with err.cloudflare (the page was a check), err.paused (an extra,
    // while a check waits) or err.cancelled (opts.wanted() said no longer needed).
    function loadPage(url, kind = 'popup', opts = {}) {
        const abs = new URL(url, location.href).href;
        if (pageQueue.some(j => j.url === abs)) { bumpPage(abs, kind, opts.wanted); return pageQueue.find(j => j.url === abs).promise; }
        let job;
        const promise = new Promise((resolve, reject) => {
            job = { url: abs, kind, prio: pageKind(kind).prio, n: ++pageJobN, wanted: opts.wanted || null, ms: opts.ms || 12000, resolve, reject };
        });
        job.promise = promise;
        pageQueue.push(job);
        pumpPages();
        return promise;
    }
    // Something more important needs a page that's already waiting
    function bumpPage(url, kind, wanted) {
        const abs = new URL(url, location.href).href;
        const j = pageQueue.find(x => x.url === abs);
        if (!j) return;
        if (pageKind(kind).prio < j.prio) { j.prio = pageKind(kind).prio; j.kind = kind; }
        if (!wanted) j.wanted = null; // needed for sure now
    }

    function pageGap(kind) {
        const g = pageKind(kind).gap;
        return Date.now() < cfSlowUntil ? g * 2.5 + 500 : g;
    }
    // Extras: at most BG_PER_MINUTE a minute (half after a check)
    function extrasWait(now) {
        const cap = now < cfSlowUntil ? BG_PER_MINUTE / 2 : BG_PER_MINUTE;
        const recent = pageLog.filter(p => pageKind(p.kind).prio >= 3 && now - p.at < 60000);
        return recent.length < cap ? 0 : recent[recent.length - cap].at + 60000 - now;
    }
    function stillWanted(j) {
        if (!j.wanted) return true;
        try { return !!j.wanted(); } catch (e) { return false; }
    }

    async function pumpPages() {
        if (pagePumping) return;
        pagePumping = true;
        try {
            while (pageQueue.length) {
                const now = Date.now();
                for (let i = pageQueue.length - 1; i >= 0; i--) {
                    const j = pageQueue[i];
                    // While a check waits, the extras give up (they come back
                    // later) - what you asked for still tries: maybe it's solved
                    if (cloudflarePaused() && !isUserKind(j.kind)) { pageQueue.splice(i, 1); j.reject(pageError('waiting for the Cloudflare check', { paused: true })); }
                    // Gone stale meanwhile (mouse left, popup closed, scrolled away)
                    else if (!stillWanted(j)) { pageQueue.splice(i, 1); j.reject(pageError('no longer needed', { cancelled: true })); }
                }
                if (!pageQueue.length) break;
                pageQueue.sort((a, b) => a.prio - b.prio || a.n - b.n);
                const job = pageQueue.find(j => j.kind !== 'follow' || now - lastUserInputAt > FOLLOW_IDLE_MS);
                if (!job) { await pageSleep(2000); continue; }
                // What you asked for may run next to one other load; extras one at a time
                if (pagesInFlight >= (isUserKind(job.kind) ? 2 : 1)) { await pageSleep(100); continue; }
                const from = isUserKind(job.kind) ? pageStartedAt : Math.max(pageStartedAt, pageDoneAt);
                const wait = Math.max(from + pageGap(job.kind) - now, pageKind(job.kind).prio >= 3 ? extrasWait(now) : 0);
                if (wait > 0) { await pageSleep(Math.min(wait, 300)); continue; } // look again: something more important may have come in
                pageQueue.splice(pageQueue.indexOf(job), 1);
                runPageJob(job);
            }
        } finally {
            pagePumping = false;
        }
    }

    async function runPageJob(job) {
        pagesInFlight++;
        pageStartedAt = Date.now();
        logPage(job.kind);
        try {
            const r = await fetchWithTimeout(job.url, job.ms);
            const html = await r.text();
            if (isCloudflareCheck(r.status, html)) {
                pauseForCloudflare(job.url, job.kind);
                job.reject(pageError('Cloudflare check (HTTP ' + r.status + ')', { cloudflare: true }));
            } else {
                job.resolve({ status: r.status, ok: r.ok, html });
            }
        } catch (e) {
            job.reject(e);
        } finally {
            pagesInFlight--;
            pageDoneAt = Date.now();
        }
    }

    // What set off the last check - shown in "Copy info for a bug report"
    const CF_LAST_KEY = 'steamy34_cf_last';
    function lastCheckInfo() {
        try { return GM_getValue(CF_LAST_KEY, null); } catch (e) { return null; }
    }

    // kind: what hit the check. Something you asked for (popup, scrolling, a
    // click) makes the notice pulse; for the extras it just sits in the corner.
    function pauseForCloudflare(url, kind) {
        kind = kind || 'action';
        const wasPaused = cloudflarePaused();
        cfPausedUntil = Date.now() + CF_PAUSE_MS;
        cfSlowUntil = Date.now() + CF_PAUSE_MS + CF_SLOW_MS;
        if (url) cfCheckUrl = url;
        if (!wasPaused) {
            try { GM_setValue(CF_LAST_KEY, { at: Date.now(), kind, before: recentPages(120000) }); } catch (e) {}
        }
        console.warn('[Steamy34] Cloudflare check (' + pageKind(kind).label + ') - background loading paused.');
        showCloudflarePill(isUserKind(kind));
    }

    // ---- The notice: a small glowing pill in the bottom-right corner ----
    // (before 3.5 a big banner across the top, for every check)
    const CF_SHIELD_SVG = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/></svg>';
    let cfTitleBefore = null;
    let cfPillHidden = false; // ✕ clicked: stays away until something you asked for is blocked

    // The pause ran out (check solved elsewhere, e.g. in another tab)? Drop
    // the notice; if the check is still there, the next request brings it back.
    // Only runs while the notice is up - no timer at all the rest of the time.
    let cfWatchTimer = null;
    function watchCloudflarePause() {
        if (cfWatchTimer) return;
        cfWatchTimer = setInterval(() => {
            if (cloudflarePaused()) return;
            clearInterval(cfWatchTimer);
            cfWatchTimer = null;
            hideCloudflarePill();
        }, 5000);
    }

    function showCloudflarePill(loud) {
        if (!document.body) { document.addEventListener('DOMContentLoaded', () => showCloudflarePill(loud), { once: true }); return; }
        if (loud) cfPillHidden = false;
        watchCloudflarePause();
        if (cfPillHidden) return;
        let pill = document.querySelector('.s34-cf-pill');
        if (!pill) {
            pill = document.createElement('div');
            pill.className = 's34-cf-pill';
            pill.setAttribute('role', 'status');
            pill.innerHTML = `<span class="s34-cf-pill-icon">${CF_SHIELD_SVG}</span>
                <span class="s34-cf-pill-text"><b>Quick check needed</b><small>Some loading is paused</small></span>
                <button type="button" class="s34-cf-pill-solve">Solve</button>
                <button type="button" class="s34-cf-pill-x" title="Hide – loading stays paused until the check is solved" aria-label="Hide">✕</button>`;
            pill.querySelector('.s34-cf-pill-solve').addEventListener('click', openCloudflarePanel);
            pill.querySelector('.s34-cf-pill-x').addEventListener('click', () => { cfPillHidden = true; hideCloudflarePill(); });
            document.body.appendChild(pill);
        }
        pill.title = 'rule34 (Cloudflare) wants to confirm you\'re human. Steamy34 pauses its extra loading until then.';
        // Something you asked for is blocked: a few pulses of the glow
        if (loud) {
            pill.classList.remove('s34-cf-pulse');
            void pill.offsetWidth; // restart the animation
            pill.classList.add('s34-cf-pulse');
            // A quiet note in the tab title, so it's seen from other tabs too
            if (cfTitleBefore === null) { cfTitleBefore = document.title; document.title = 'Check needed · ' + cfTitleBefore; }
        }
        setTimeout(() => pill.classList.add('s34-show'), 20); // (not requestAnimationFrame: background tabs skip those)
    }

    function hideCloudflarePill() {
        const pill = document.querySelector('.s34-cf-pill');
        if (pill) {
            pill.classList.remove('s34-show');
            setTimeout(() => { if (!pill.classList.contains('s34-show')) pill.remove(); }, 250);
        }
        if (cfTitleBefore !== null) document.title = document.title.replace('Check needed · ', '');
        cfTitleBefore = null;
    }

    // "Solve check" right where something stopped (end of the list, popup tags)
    function cloudflareInline(text) {
        const box = document.createElement('div');
        box.className = 's34-cf-inline';
        box.innerHTML = `<span class="s34-cf-pill-icon">${CF_SHIELD_SVG}</span><span class="s34-cf-inline-text"></span><button type="button" class="s34-cf-pill-solve">Solve check</button>`;
        box.querySelector('.s34-cf-inline-text').textContent = text;
        box.querySelector('button').addEventListener('click', e => { e.stopPropagation(); openCloudflarePanel(); });
        return box;
    }

    // Called once the check has been passed: everything resumes
    function cloudflarePassed() {
        cfPausedUntil = 0;
        cfPillHidden = false;
        console.log('[Steamy34] Cloudflare check passed - resuming.');
        hideCloudflarePill();
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

    // kind: who needs it (PAGE_KINDS) - decides its place in the line.
    // opts.wanted: () => false drops it if it hasn't started yet.
    function fetchPostDoc(postUrl, kind = 'popup', opts) {
        if (postDocCache.has(postUrl)) {
            bumpPage(postUrl, kind, opts && opts.wanted);
            return postDocCache.get(postUrl);
        }
        if (!isUserKind(kind) && cloudflarePaused()) return Promise.resolve(null);
        const p = loadPage(postUrl, kind, opts)
            .then(page => {
                if (!page.ok) throw new Error('HTTP ' + page.status);
                const doc = new DOMParser().parseFromString(page.html, 'text/html');
                learnTagTypes(doc);
                return doc;
            })
            .catch(err => {
                if (!err.cancelled && !err.paused) console.warn('[Steamy34] Could not read post', postUrl, err.message || err);
                postDocCache.delete(postUrl); // allow a retry later
                return null;
            });
        postDocCache.set(postUrl, p);
        return p;
    }

    // Read the post page once: video source, or the full-quality image
    function getPostMedia(postUrl, kind = 'popup', opts) {
        if (mediaCache.has(postUrl)) bumpPage(postUrl, kind, opts && opts.wanted);
        if (!mediaCache.has(postUrl)) {
            const p = fetchPostDoc(postUrl, kind, opts)
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
                        const media = await getPostMedia(link.href, 'hover', { wanted: () => overlay === el });
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
                }, isVideo ? CONFIG.hoverVideoDelay : CONFIG.hoverDelay); // videos wait a bit longer (they're big)
            });

            thumb.addEventListener('mouseleave', stop);
        });
    }

