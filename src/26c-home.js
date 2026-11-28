    // =====================================================================
    //  HOME: rule34's start page as a small home (Beta 3.6, "Home" mockup)
    //  The site's own pieces stay - its logo, the Posts · Comments · Forum ·
    //  My Account links, the search form (with Steamy34's search box in it),
    //  "Serving N posts" and Terms / Contact / DMCA - they're only moved
    //  into a two-column layout:
    //   left:  Search · Continue where you left off · Recent and favourite
    //          tags · the post count as text (the counter pictures are hidden)
    //   right: New from who you follow - the circles and their newest posts
    //  Phones: one column - search, following, continue, recent.
    //  The newest posts are one page load (each group of 20 artists), kept
    //  for 10 minutes in this tab (sessionStorage), so going back and forth
    //  doesn't load them again. Looking at them here doesn't count as a
    //  visit - the "N new" counts stay until you open the Following window.
    //  Setting homePage (Look & feel); off = the site's own start page.
    // =====================================================================
    const HOME_CACHE_KEY = 's34_home_posts';
    const HOME_CACHE_MS = 10 * 60 * 1000;
    const HOME_POSTS = 12;

    const isStartPage = () => !!document.getElementById('static-index') && !document.querySelector('.image-list, #post-view');

    function setupHome() {
        if (!CONFIG.homePage || !isStartPage() || document.querySelector('.s34-home')) return;
        const page = document.getElementById('static-index');
        const logo = page.querySelector('.index-header');
        const links = page.querySelector('#links');
        const form = page.querySelector('form[action*="page=search"]');
        if (!form) return; // the site changed - leave its page alone
        const count = Array.from(page.querySelectorAll('p')).find(p => /serving\s+[\d,.]+\s+posts/i.test(p.textContent));
        const foot = page.querySelector('small');

        const home = document.createElement('div');
        home.className = 's34-home';
        home.innerHTML = `
            <div class="s34-home-head"></div>
            <div class="s34-home-main">
                <div class="s34-home-left">
                    <section class="s34-home-card s34-home-search"><div class="s34-home-label">Search</div></section>
                    <section class="s34-home-card s34-home-resume" hidden></section>
                    <section class="s34-home-card s34-home-recent" hidden></section>
                    <div class="s34-home-meta"></div>
                </div>
                <div class="s34-home-right">
                    <section class="s34-home-card s34-home-follow"></section>
                    <div class="s34-home-tagline"></div>
                </div>
            </div>`;
        const head = home.querySelector('.s34-home-head');
        if (logo) { logo.classList.add('s34-home-logo'); head.appendChild(logo); }
        if (links) head.appendChild(links);
        home.querySelector('.s34-home-search').appendChild(form.closest('.space') || form);
        const meta = home.querySelector('.s34-home-meta');
        if (count) { count.classList.add('s34-home-count'); meta.appendChild(count); }
        if (foot) meta.appendChild(foot);
        // The site's welcome line ("At Rule 34 its easy to find…") under the following card
        const welcome = foot && Array.from(foot.children).find(el => el.tagName === 'DIV' && el.textContent.trim());
        if (welcome) home.querySelector('.s34-home-tagline').appendChild(welcome);
        page.prepend(home);
        document.documentElement.classList.add('s34-home-on');
        // What's left of the old page (the tagline, the counter pictures) steps aside
        Array.from(page.children).forEach(el => { if (el !== home) el.classList.add('s34-home-old'); });

        renderHomeResume(home.querySelector('.s34-home-resume'));
        renderHomeRecent(home.querySelector('.s34-home-recent'));
        renderHomeFollow(home.querySelector('.s34-home-follow'));
    }

    // ---- Continue where you left off (the newest spot from 20f-resume.js) ----
    function renderHomeResume(card) {
        if (!CONFIG.resumeOffer) return;
        const all = readResume();
        const best = Object.keys(all).map(k => Object.assign({ key: k }, all[k]))
            .filter(x => x.pid > 0 && Date.now() - (x.at || 0) < RESUME_MAX_AGE)
            .sort((a, b) => b.at - a.at)[0];
        if (!best) return;
        const tags = best.key === '(all posts)' ? 'all' : best.key;
        const page = Math.floor(best.pid / pageStep) + 1;
        card.hidden = false;
        card.innerHTML = `<div class="s34-home-resume-text"><b></b><small></small></div><a class="s34-home-btn">Go on →</a>`;
        card.querySelector('b').textContent = 'Continue: ' + (tags === 'all' ? 'all posts' : searchLabel({ query: tags }));
        if (tags !== 'all') sfwMark(card.querySelector('b'), tags);
        card.querySelector('small').textContent = `Page ${page} · ${timeAgo(best.at)}`;
        const a = card.querySelector('a');
        a.href = 'index.php?page=post&s=list&tags=' + encodeURIComponent(tags) + '&pid=' + best.pid;
        a.title = 'Back to page ' + page + ' of this search, at the post you were looking at';
        a.addEventListener('click', () => { try { sessionStorage.setItem(RESUME_TARGET_KEY, best.post || ''); } catch (e) {} });
    }

    // ---- Recent searches and favourite tags, right there ----
    function renderHomeRecent(card) {
        const recent = getStoredList(HISTORY_KEY).filter(q => typeof q === 'string' && q).slice(0, 8);
        const fav = getStoredList(FAVTAGS_KEY).filter(t => typeof t === 'string' && t);
        card.hidden = !recent.length && !fav.length;
        if (card.hidden) return;
        card.replaceChildren();
        if (recent.length) {
            const h = document.createElement('div');
            h.className = 's34-home-label';
            h.textContent = 'Recent';
            const box = document.createElement('div');
            box.className = 's34-home-chips';
            recent.forEach(q => {
                const a = document.createElement('a');
                a.className = 's34-home-recent-item';
                a.href = 'index.php?page=post&s=list&tags=' + encodeURIComponent(q);
                a.textContent = searchLabel({ query: q });
                a.title = 'Search: ' + q.replace(/_/g, ' ');
                box.appendChild(sfwMark(a, q));
            });
            card.append(h, box);
        }
        if (fav.length) {
            const h = document.createElement('div');
            h.className = 's34-home-label';
            h.textContent = 'Favourite tags';
            const box = document.createElement('div');
            box.className = 's34-home-chips s34-home-fav';
            card.append(h, box);
            // one click puts the tag in the search box above (again: takes it out)
            const draw = () => {
                const words = (searchBox() ? searchBox().value : '').toLowerCase().split(/\s+/);
                box.replaceChildren();
                fav.forEach(tag => {
                    const on = words.includes(tag.toLowerCase());
                    const b = document.createElement('button');
                    b.type = 'button';
                    b.className = 's34-home-fav-chip' + (on ? ' s34-on' : '');
                    b.textContent = (on ? '✓ ' : '') + tag.replace(/_/g, ' ');
                    b.title = on ? 'In the search – click to take it out' : 'Add to the search';
                    sfwMark(b, tag);
                    b.addEventListener('click', () => {
                        const sb = searchBox();
                        if (!sb) return;
                        const cur = sb.value.trim().split(/\s+/).filter(Boolean);
                        const next = on ? cur.filter(w => w.toLowerCase() !== tag.toLowerCase()) : cur.concat(tag);
                        setSearchBox(next.join(' '));
                        draw();
                    });
                    box.appendChild(b);
                });
            };
            draw();
            const sb = searchBox();
            if (sb) sb.addEventListener('input', draw);
            // (bubbles removed in the box itself change the box without an input event)
            const sc = document.querySelector('.s34-home-search');
            if (sc) ['click', 'keyup'].forEach(ev => sc.addEventListener(ev, () => setTimeout(draw, 0)));
        }
    }

    // ---- New from who you follow ----
    // A circle shows that artist's newest posts right here (All: everyone);
    // "More" opens the Following window at the circle you're on
    function renderHomeFollow(card) {
        const d = getFollowing();
        const items = fwItems(d);
        if (!items.length) { renderHomeStart(card); return; }
        const tot = followTotals(d);
        card.innerHTML = `
            <div class="s34-home-follow-head">
                <div class="s34-home-label">New from who you follow</div>
                ${tot.n ? `<span class="s34-home-new">${escapeHtml(tot.text)}</span>` : ''}
                <button type="button" class="s34-home-btn" data-h="more" title="Open the Following window – more posts, older ones as you scroll (${escapeHtml(keyLabel(CONFIG.followingKey))})">More <kbd>${escapeHtml(keyLabel(CONFIG.followingKey))}</kbd></button>
            </div>
            <div class="s34-fw-circles s34-home-circles"></div>
            <div class="s34-fw-grid s34-home-grid"></div>
            <div class="s34-home-status"></div>`;
        // Circles: new ones first (like the Following window)
        const rank = i => (i.kind === 'all' ? 0 : i.count ? 1 : 2);
        const sorted = items.map((it, n) => [it, n]).sort((a, b) => rank(a[0]) - rank(b[0]) || a[1] - b[1]).map(x => x[0]);
        card.querySelector('.s34-home-circles').innerHTML = sorted.map(it =>
            `<button type="button" class="s34-fw-c${it.count ? ' s34-new' : ''}" data-key="${escapeHtml(it.key)}" aria-pressed="false" title="${escapeHtml(it.label + (it.count ? ' – ' + it.count + (it.more ? '+' : '') + ' new' : ''))}">
                <span class="s34-fw-ring s34-fw-av">${fwAvatarHtml(it)}</span><span class="s34-fw-name">${escapeHtml(it.label)}</span></button>`).join('');
        card._s34Key = sorted[0].key;
        card.addEventListener('click', e => {
            const c = e.target.closest('.s34-fw-c');
            if (c) { showHomeCircle(card, c.dataset.key); return; }
            if (e.target.closest('[data-h="more"]')) { openFollowPopup(card._s34Key); return; }
            const a = e.target.closest('.s34-home-grid span.thumb a[href]');
            if (!a || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
            e.preventDefault();
            const tiles = () => Array.from(card.querySelectorAll('.s34-home-grid span.thumb')).filter(t => t.isConnected);
            openPopup(a.closest('span.thumb'), { thumbs: tiles, state: () => 'done', more: () => {} });
        });
        showHomeCircle(card, card._s34Key);
    }

    function showHomeCircle(card, key) {
        card._s34Key = key;
        card.querySelectorAll('.s34-home-circles .s34-fw-c').forEach(c => {
            const on = c.dataset.key === key;
            c.classList.toggle('s34-on', on);
            c.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
        card.querySelector('.s34-home-label').textContent = key === FW_ALL ? 'New from who you follow' : 'Newest from ' + prettyTag(key.slice(2));
        loadHomePosts(card, getFollowing(), key);
    }

    // ---- Brand new: nothing followed yet - how to get going ----
    function renderHomeStart(card) {
        card.classList.add('s34-home-start');
        card.innerHTML = `
            <div class="s34-home-label">Welcome to Steamy34</div>
            <h3 class="s34-home-start-title">Make rule34 yours in three steps</h3>
            <ol class="s34-home-steps">
                <li><span class="s34-home-step-ico">🏷️</span><div><b>Search with bubbles</b><small>Type a tag – Space turns it into a bubble. Pin a filter (score, size…) to keep it for every search.</small></div></li>
                <li><span class="s34-home-step-ico s34-home-bell">${BELL_SVG}</span><div><b>Follow artists you like</b><small>The bell next to an artist in any post. Their newest posts then show up right here, with NEW on what you haven't seen.</small></div></li>
                <li><span class="s34-home-step-ico">★</span><div><b>Keep your favourite tags</b><small>"Tags" under the search box – one click puts one in the search. Your recent searches show up on this page too.</small></div></li>
            </ol>
            <div class="s34-home-start-btns">
                <button type="button" class="s34-home-btn s34-home-primary" data-h="tour">✨ Welcome tour</button>
                <a class="s34-home-btn" href="index.php?page=post&amp;s=list&amp;tags=all">Browse the newest posts →</a>
            </div>`;
        card.querySelector('[data-h="tour"]').addEventListener('click', () => openWelcome(0));
    }

    async function loadHomePosts(card, d, key) {
        const grid = card.querySelector('.s34-home-grid');
        const status = card.querySelector('.s34-home-status');
        key = key || FW_ALL;
        const groups = key === FW_ALL ? followGroups(d).slice(0, 3) : [[key.slice(2)]]; // (All, more than 60 artists: the first 60 here, all in the window)
        const sig = key + '|' + groups.map(g => g.join(' ')).join('|');
        const cacheKey = HOME_CACHE_KEY + ':' + key;
        const stale = () => !card.isConnected || card._s34Key !== key; // switched to another circle meanwhile
        let posts = null;
        try {
            const c = JSON.parse(sessionStorage.getItem(cacheKey) || 'null');
            if (c && c.sig === sig && Date.now() - c.at < HOME_CACHE_MS) posts = c.posts;
        } catch (e) {}
        if (!posts) {
            grid.replaceChildren();
            status.innerHTML = '<span class="s34-spin"></span> Loading their newest posts…';
            posts = [];
            try {
                for (const g of groups) {
                    const r = await loadPage(plainSearchUrl(groupQuery(g)), 'popup', { ms: 20000 });
                    if (stale()) return;
                    if (!r.ok) throw new Error('status ' + r.status);
                    const doc = new DOMParser().parseFromString(r.html, 'text/html');
                    const thumbs = Array.from(doc.querySelectorAll('span.thumb')).filter(t => t.querySelector('a[href]') && t.querySelector('img'));
                    hideBlocklisted(thumbs);
                    thumbs.filter(t => !t.classList.contains('s34-bl-hidden')).forEach(t => {
                        const a = t.querySelector('a[href]'), img = t.querySelector('img');
                        posts.push({
                            id: parseInt(thumbPostId(t), 10) || 0,
                            href: new URL(a.getAttribute('href'), location.href).href,
                            src: thumbPicOf(t),
                            tags: img.getAttribute('title') || img.getAttribute('alt') || '',
                            video: isVideoThumb(img)
                        });
                    });
                }
                const seen = new Set();
                posts = posts.sort((a, b) => b.id - a.id).filter(p => !seen.has(p.id) && seen.add(p.id)).slice(0, HOME_POSTS);
                try { sessionStorage.setItem(cacheKey, JSON.stringify({ sig, at: Date.now(), posts })); } catch (e) {}
            } catch (e) {
                if (stale()) return;
                status.replaceChildren();
                if (e.cloudflare || e.paused) {
                    status.appendChild(cloudflareInline('Their newest posts wait for a quick Cloudflare check.'));
                    window.addEventListener('s34-cf-passed', () => { if (!stale()) loadHomePosts(card, getFollowing(), key); }, { once: true });
                } else {
                    status.textContent = 'Their newest posts couldn\'t be loaded right now – "More" opens the Following window.';
                }
                return;
            }
        }
        if (stale()) return;
        status.textContent = posts.length ? '' : 'Nothing from them yet.';
        // NEW: after what you last saw of that artist (counts stay as they are)
        const seenOf = {};
        d.artists.forEach(a => { seenOf[a.tag] = a.seen || 0; });
        const tags = d.artists.map(a => a.tag);
        const tiles = posts.map(p => {
            const t = document.createElement('span');
            t.className = 'thumb s34-fw-tile';
            t.id = 's' + p.id;
            t.innerHTML = `<a href="${escapeHtml(p.href)}"><img alt="" decoding="async" class="preview${p.video ? ' webm-thumb' : ''}"></a>`;
            const img = t.querySelector('img');
            img.src = p.src;
            img.setAttribute('title', p.tags);
            return t;
        });
        grid.replaceChildren(...tiles);
        setThumbRatios(tiles);
        removeTagTooltips(tiles);
        if (CONFIG.hoverPreview || CONFIG.hoverHighRes) setupHoverPreview(tiles); // (as on the posts page)
        setupHoverInfo(tiles);
        if (CONFIG.thumbBadges) addThumbBadges(tiles);
        tiles.forEach((t, i) => {
            const who = thumbArtists(t, tags);
            if (who.some(tag => seenOf[tag] && posts[i].id > seenOf[tag])) {
                const b = document.createElement('span');
                b.className = 's34-new-badge';
                b.textContent = 'NEW';
                t.appendChild(b);
            }
            if (who.length) {
                const by = document.createElement('span');
                by.className = 's34-fw-by';
                by.textContent = who.map(prettyTag).join(', ');
                t.appendChild(by);
            }
        });
        showDownloadedState(tiles);
    }
