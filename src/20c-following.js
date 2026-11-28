    // =====================================================================
    //  FOLLOWING: artists (only artists since Beta 3.6)
    //  The bell next to an artist (popup, post pages) follows them. The
    //  sidebar lists everyone you follow, each with its own "N new" - click
    //  one and their newest posts open in the Following window
    //  (26b-following-popup.js), with NEW on the ones since your last visit.
    //  Always newest first: the per-artist and shared filters of Beta 3.4 are gone.
    //  Counting is cheap: one either/or search "( a ~ b ~ … )" per 20
    //  artists; each new post is matched to its artists by its tags.
    //  Followed searches (Beta 3.1 - 3.5) are gone too - the ones you had
    //  move into your Recent searches once (moveFollowedSearchesToRecent).
    //  The old feed pages (#s34-following, #s34-following=artist - before
    //  3.6) open the Following window instead.
    //  Everything is stored on this device (steamy34_following).
    // =====================================================================
    const FOLLOW_KEY = 'steamy34_following';
    const FEED_GROUP_SIZE = 20;            // artists per either/or search
    const FOLLOW_CHECK_EVERY = 20 * 60 * 1000;
    const FOLLOW_BOX_ROWS = 8;             // sidebar rows before "Show all"
    // A bell (not a star - ★ is already "favourite tags" and "saved searches"):
    // outline = not followed, filled = following
    const BELL_SVG = '<svg class="s34-bell" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8.5a6 6 0 0 0-12 0c0 6.5-3 8.5-3 8.5h18s-3-2-3-8.5"/><path d="M13.7 20.5a2 2 0 0 1-3.4 0"/></svg>';
    const BELL_ON_SVG = BELL_SVG.replace('<path d="M18', '<path fill="currentColor" d="M18');
    const BELL_TEXT = `<span class="s34-bell-i">${BELL_SVG}</span>`; // inside a sentence
    // The Following window (26b-following-popup.js): what it shows, as a key
    let fwState = null;
    const FW_ALL = 'all';
    const fwKeyArtist = tag => 'a:' + String(tag).toLowerCase();

    function getFollowing() {
        let v = {};
        try { v = GM_getValue(FOLLOW_KEY, {}) || {}; } catch (e) {}
        let artists = Array.isArray(v.artists) ? v.artists : null;
        // Beta 2.9 stored { tags: [{ tag, type }] } - keep the artists
        if (!artists && Array.isArray(v.tags)) artists = v.tags.filter(t => t && t.tag && (!t.type || t.type === 'artist')).map(t => ({ tag: t.tag, added: t.added || Date.now() }));
        // pic: the newest post's thumbnail (the circle in the Following window).
        // The filters of Beta 3.4 (a.filter, v.filter) and the followed
        // searches (v.searches) are left out - the next save drops them.
        const noFilter = a => { const x = Object.assign({ seen: 0, latest: 0, count: 0, more: false, pic: '' }, a); delete x.filter; return x; };
        return {
            artists: (artists || []).filter(a => a && a.tag).map(noFilter),
            checkedAt: v.checkedAt || 0
        };
    }
    function saveFollowing(d) { GM_setValue(FOLLOW_KEY, d); }

    // Followed searches (Beta 3.1 - 3.5) and the saved searches before them
    // (steamy34_saved): moved once into your Recent searches, so none is lost
    function moveFollowedSearchesToRecent() {
        let v = null, old = null;
        try { v = GM_getValue(FOLLOW_KEY, null); } catch (e) { return; }
        try { old = GM_getValue(SAVED_KEY, null); } catch (e) {}
        const queries = [].concat(v && Array.isArray(v.searches) ? v.searches : [], Array.isArray(old) ? old : [])
            .map(s => s && typeof s.query === 'string' ? s.query.trim() : '').filter(Boolean);
        if (!queries.length && !(v && 'searches' in v) && old === null) return;
        queries.reverse().forEach(addToHistory); // (the first one ends up on top)
        if (v && 'searches' in v) saveFollowing(getFollowing());
        try { GM_deleteValue(SAVED_KEY); } catch (e) {}
        if (queries.length) console.log('[Steamy34] Following is for artists only now - ' + queries.length + ' followed search(es) moved to Recent.');
    }

    // "panam_palmer score:>=50 height:>=1080 width:>=1080" -> "panam palmer
    // score ≥ 50 1080p+" (Recent searches, Continue on the start page)
    const searchLabel = s => (s.name && s.name !== s.query ? s.name : s.query
        .replace(/\bheight:>=(\d+)\s+width:>=\1\b|\bwidth:>=(\d+)\s+height:>=\2\b/g, (m, a, b) => (a || b) + 'p+')
        .replace(/\b(width|height):>=(\d+)/g, '$1 ≥ $2')
        .replace(/\bscore:>=(\d+)/g, 'score ≥ $1').replace(/\bscore:>(\d+)/g, 'score > $1').replace(/\brating:(\w+)/g, '$1'))
        .replace(/_/g, ' ');
    // The normal search for an artist ("Open as a search")
    function plainSearchUrl(q) {
        return 'index.php?page=post&s=list&tags=' + encodeURIComponent(q);
    }

    function findArtist(tag, d) {
        tag = String(tag).toLowerCase();
        return (d || getFollowing()).artists.find(a => a.tag === tag) || null;
    }
    const isFollowed = (tag, d) => !!findArtist(tag, d);

    // Artists in groups of 20 for the either/or searches
    function followGroups(d) {
        d = d || getFollowing();
        const groups = [];
        for (let i = 0; i < d.artists.length; i += FEED_GROUP_SIZE) groups.push(d.artists.slice(i, i + FEED_GROUP_SIZE).map(a => a.tag));
        return groups;
    }
    function groupQuery(tags) {
        if (!tags || !tags.length) return '';
        return tags.length === 1 ? tags[0] : '( ' + tags.join(' ~ ') + ' )';
    }

    // The feed pages before Beta 3.6 (bookmarks, old links): which one an
    // address is (null = none). An artist / all artists opens the Following
    // window now; a followed search's page is simply that search.
    // A function, so the search code can use it while the page is still loading.
    function feedFromHash(hash) {
        let m = /^#s34-following=(.+)$/.exec(hash || '');
        if (m) { try { return { kind: 'artist', tag: decodeURIComponent(m[1]).toLowerCase() }; } catch (e) { return null; } }
        m = /^#s34-search=(.+)$/.exec(hash || '');
        if (m) { try { return { kind: 'search', query: decodeURIComponent(m[1]) }; } catch (e) { return null; } }
        m = /^#s34-following(?:-(\d+))?$/.exec(hash || '');
        return m ? { kind: 'all', group: parseInt(m[1], 10) || 0 } : null;
    }

    // "11+ new" over all followed artists
    function followTotals(d) {
        d = d || getFollowing();
        const list = d.artists;
        const n = list.reduce((s, a) => s + (a.count || 0), 0);
        return { n, text: n ? n + (list.some(a => a.more) ? '+' : '') + ' new' : '' };
    }
    const newText = a => (a.count ? a.count + (a.more ? '+' : '') + ' new' : '');

    // ---- Popup key L: follow the artist - or, with several, choose ----
    // A small menu next to the artist tags: 1-9 (or a click) follows /
    // unfollows that artist, the menu stays open for more; Esc or L closes.
    function followArtistByKey(artists, anchor) {
        if (artists.length === 1) { toggleFollow(artists[0]); return; }
        document.querySelectorAll('.s34-cmenu').forEach(m => m.remove());
        const menu = document.createElement('div');
        menu.className = 's34-cmenu s34-follow-menu';
        function render() {
            const d = getFollowing();
            menu.replaceChildren();
            const head = document.createElement('div');
            head.className = 's34-cmenu-head';
            head.textContent = 'Follow which artist?';
            menu.appendChild(head);
            artists.slice(0, 9).forEach((tag, i) => {
                const on = isFollowed(tag, d);
                const b = document.createElement('button');
                b.type = 'button';
                b.className = 's34-cmenu-item' + (on ? ' s34-on' : '');
                b.innerHTML = `<span class="s34-cmenu-check">${on ? BELL_ON_SVG : BELL_SVG}</span><span class="s34-cmenu-name"></span><kbd class="s34-cmenu-n">${i + 1}</kbd>`;
                b.querySelector('.s34-cmenu-name').textContent = prettyTag(tag) + (on ? ' · following' : '');
                b.title = (on ? 'Unfollow ' : 'Follow ') + prettyTag(tag) + ' (' + (i + 1) + ')';
                b.addEventListener('click', () => { toggleFollow(tag); render(); });
                menu.appendChild(b);
            });
            const foot = document.createElement('div');
            foot.className = 's34-cmenu-empty';
            foot.textContent = 'Press a number – Esc closes';
            menu.appendChild(foot);
        }
        function close() {
            menu.remove();
            document.removeEventListener('keydown', onKey, true);
            document.removeEventListener('mousedown', off, true);
        }
        function onKey(e) {
            if (!menu.isConnected) { close(); return; }
            const n = /^Digit([1-9])$|^Numpad([1-9])$/.exec(e.code);
            if (n) {
                const tag = artists[parseInt(n[1] || n[2], 10) - 1];
                if (tag) { e.preventDefault(); e.stopImmediatePropagation(); toggleFollow(tag); render(); }
            } else if (e.key === 'Escape' || e.code === CONFIG.followKey) {
                e.preventDefault(); e.stopImmediatePropagation(); close();
            }
        }
        function off(e) { if (!menu.contains(e.target)) close(); }
        render();
        document.body.appendChild(menu);
        // Next to the artist tags (or the top of the popup's side), kept on screen
        const r = anchor && anchor.getBoundingClientRect();
        const visible = r && r.bottom > 0 && r.top < innerHeight;
        const mw = menu.offsetWidth, mh = menu.offsetHeight;
        let left = visible ? r.left : 16, top = visible ? r.bottom + 6 : 80;
        left = Math.max(8, Math.min(left, innerWidth - mw - 8));
        if (top + mh > innerHeight - 8) top = Math.max(8, (visible ? r.top : innerHeight) - mh - 6);
        menu.style.left = left + 'px';
        menu.style.top = top + 'px';
        document.addEventListener('keydown', onKey, true);
        setTimeout(() => document.addEventListener('mousedown', off, true), 0);
    }

    // ---- Follow / unfollow ----
    function toggleFollow(tag) {
        tag = String(tag).toLowerCase().trim().replace(/\s+/g, '_');
        if (!tag) return false;
        const d = getFollowing();
        const was = d.artists.findIndex(a => a.tag === tag);
        if (was >= 0) {
            const removed = d.artists.splice(was, 1)[0];
            saveFollowing(d);
            showToast('Unfollowed ' + prettyTag(tag) + '.', 'Undo', () => {
                const again = getFollowing();
                if (!isFollowed(tag, again)) { again.artists.splice(Math.min(was, again.artists.length), 0, removed); saveFollowing(again); }
                refreshFollowUi();
            });
        } else {
            // Counting starts from now: the next check sets where "new" begins
            d.artists.push({ tag, added: Date.now(), seen: 0, latest: 0, count: 0, more: false });
            d.checkedAt = 0;
            saveFollowing(d);
            showToast('Following ' + prettyTag(tag) + ' – their new posts show up in the sidebar.', 'Show posts', () => openFollowPopup(fwKeyArtist(tag)));
        }
        refreshFollowUi();
        return was < 0;
    }

    function styleFollowButton(btn, on) {
        const t = prettyTag(btn.dataset.followTag);
        btn.classList.toggle('s34-following', on);
        btn.innerHTML = on ? BELL_ON_SVG : BELL_SVG;
        const k = btn.classList.contains('s34-chip-follow') ? ` (${keyLabel(CONFIG.followKey)})` : ''; // the popup's follow key
        btn.title = on ? `Following ${t} – click to unfollow${k}` : `Follow ${t} – their new posts show up in the sidebar${k}`;
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    }

    function makeFollowButton(tag, className, d) {
        const btn = document.createElement(className === 'r34-follow-btn' ? 'a' : 'button');
        if (btn.tagName === 'A') btn.href = '#'; else btn.type = 'button';
        btn.className = className;
        btn.dataset.followTag = String(tag).toLowerCase();
        styleFollowButton(btn, isFollowed(tag, d));
        btn.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();
            toggleFollow(tag);
        });
        return btn;
    }

    // Everything that shows the follow state, after a change
    function refreshFollowUi() {
        const d = getFollowing();
        document.querySelectorAll('[data-follow-tag]').forEach(b => styleFollowButton(b, isFollowed(b.dataset.followTag, d)));
        renderFollowBox(d);
        renderSavedBox();
        const win = document.querySelector('.s34-follow-win');
        if (win && win._s34Render) win._s34Render();
        fwRefresh(); // the Following window, if open
    }

    // (Beta 3.17.2, #15) An artist's search (just the artist, filters allowed): a
    // small bar above the posts with the name and the bell - follow right there
    function addArtistSearchFollow() {
        if (isPostView || !CONFIG.followButtons || params.get('page') !== 'post' || params.get('s') !== 'list') return;
        if (document.querySelector('.s34-artist-bar')) return;
        const words = (tagsFromUrl(location.href) || '').split(/\s+/).filter(w => w && !w.includes(':') && !/^[-~]/.test(w));
        if (words.length !== 1) return;
        const tag = words[0].toLowerCase();
        let isArtist = false;
        try { isArtist = tagTypes.get(tag) === 'artist'; } catch (e) {}
        if (!isArtist) isArtist = Array.from(document.querySelectorAll('#tag-sidebar li[class*="tag-type-artist"]')).some(li => getTagFromRow(li).toLowerCase() === tag);
        const list = document.querySelector('.image-list');
        if (!isArtist || !list) return;
        const bar = document.createElement('div');
        bar.className = 's34-artist-bar';
        bar.innerHTML = '<span class="s34-ab-name"></span><span class="s34-ab-hint" role="button" tabindex="-1"></span>';
        bar.querySelector('.s34-ab-name').textContent = prettyTag(tag);
        const btn = makeFollowButton(tag, 's34-ab-follow', getFollowing());
        bar.insertBefore(btn, bar.querySelector('.s34-ab-hint'));
        bar.querySelector('.s34-ab-hint').addEventListener('click', () => btn.click());
        list.parentNode.insertBefore(bar, list);
    }

    // Single post page: the bell in the artist rows
    function addFollowButtonsToRows() {
        if (!CONFIG.followButtons) return;
        const d = getFollowing();
        document.querySelectorAll('#tag-sidebar li.tag-type-artist, #tag-sidebar li[class*="tag-type-artist"]').forEach(row => {
            if (row.querySelector('.r34-follow-btn')) return;
            const tag = getTagFromRow(row);
            if (!tag) return;
            const btn = makeFollowButton(tag, 'r34-follow-btn', d);
            const before = row.querySelector('.r34-add-btn, .r34-block-btn');
            if (before) before.before(btn); else row.appendChild(btn);
        });
    }

    // ---- Sidebar: "Followed artists" with a "N new" per artist ----
    let followBoxAll = false; // "Show all" opened

    function addFollowBox() {
        if (document.querySelector('.s34-follow-box')) return;
        const anchor = document.querySelector('.s34-hub') || document.querySelector('.s34-blbtn') || document.querySelector('.s34-gear.s34-inline');
        if (!anchor) return;
        const box = document.createElement('div');
        box.className = 's34-follow-box';
        // A row opens the Following window there (Ctrl / middle click: the
        // normal search in a new tab - the rows are real links to it)
        box.addEventListener('click', e => {
            if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey) return;
            const t = e.target.closest('[data-fb]');
            if (!t) return;
            e.preventDefault();
            const what = t.dataset.fb;
            if (what === 'manage') openFollowingWindow();
            else if (what === 'more') { followBoxAll = !followBoxAll; renderFollowBox(); }
            else if (what === 'all') openFollowPopup(FW_ALL);
            else openFollowPopup(fwKeyArtist(what));
        });
        anchor.before(box);
        renderFollowBox();
    }

    // ---- "(12) rule34" in the browser tab while there are new posts ----
    // (and a small pink dot on the tab icon) - setting tabBadge
    let tabIconOriginal = null;
    function updateTabBadge(d) {
        let n = 0, more = false;
        if (CONFIG.tabBadge) {
            try {
                d = d || getFollowing();
                const t = followTotals(d, true);
                const s = savedTotals();
                n = t.n + s.n;
                more = /\+/.test(t.text) || s.more;
            } catch (e) {}
        }
        const base = document.title.replace(/^(\(\d+\+?\)\s*)+/, ''); // our own count, however often it got there
        const want = n ? `(${n}${more ? '+' : ''}) ${base}` : base;
        if (document.title !== want) document.title = want;
        // Tab icon: the site's own icon with a dot (same site, so it can be drawn)
        try {
            let link = document.querySelector('link[rel~="icon"]');
            if (!link) {
                link = document.createElement('link');
                link.rel = 'icon';
                link.href = '/favicon.ico';
                document.head.appendChild(link);
            }
            if (tabIconOriginal === null) tabIconOriginal = link.href;
            if (!n) { if (link.href !== tabIconOriginal) { link.href = tabIconOriginal; delete link.dataset.s34Dot; } return; }
            if (link.dataset.s34Dot === '1') return; // already dotted
            const img = new Image();
            img.onload = () => {
                try {
                    const c = document.createElement('canvas');
                    c.width = c.height = 32;
                    const g = c.getContext('2d');
                    g.drawImage(img, 0, 0, 32, 32);
                    g.fillStyle = '#e0457b';
                    g.beginPath(); g.arc(24, 8, 7.5, 0, Math.PI * 2); g.fill();
                    link.href = c.toDataURL('image/png');
                    link.dataset.s34Dot = '1';
                } catch (e) {}
            };
            img.src = tabIconOriginal;
        } catch (e) {}
    }

    function renderFollowBox(d) {
        d = d || getFollowing();
        updateTabBadge(d);
        const box = document.querySelector('.s34-follow-box');
        if (!box) return;
        const open = fwState ? fwState.key : ''; // what the Following window shows
        const head = `<div class="s34-follow-head">${BELL_SVG}<b>Following</b><a href="#" data-fb="manage">Manage</a></div>`;
        if (!d.artists.length) {
            box.innerHTML = head + `<div class="s34-follow-none">Follow an artist with the ${BELL_TEXT} next to their name in a post. Their new posts show up here.</div>`;
            return;
        }
        // Artists with something new first, then the rest in the order you followed them
        const items = d.artists.map(a => ({ a }));
        const order = items.map((x, i) => [x, i]).sort((x, y) => (y[0].a.count || 0) - (x[0].a.count || 0) || x[1] - y[1]).map(x => x[0]);
        const shown = followBoxAll ? order : order.slice(0, FOLLOW_BOX_ROWS);
        const tot = followTotals(d);
        const badgeHtml = badge => badge ? `<small class="s34-has-new">${badge}</small>` : '';
        const row = (key, label, badge, cls, href) =>
            `<a href="${escapeHtml(href)}" class="s34-follow-row ${cls}${open === (key === 'all' ? FW_ALL : fwKeyArtist(key)) ? ' s34-on' : ''}" data-fb="${escapeHtml(key)}"><span>${label}</span>${badgeHtml(badge)}</a>`;
        box.innerHTML = head +
            (d.artists.length > 1 ? row('all', 'All artists', tot.text, 's34-follow-allrow', plainSearchUrl(groupQuery(followGroups(d)[0]))) : '') +
            shown.map(x => row(x.a.tag, escapeHtml(prettyTag(x.a.tag)), newText(x.a), '', plainSearchUrl(x.a.tag))).join('') +
            (order.length > FOLLOW_BOX_ROWS ? `<a href="#" class="s34-follow-more" data-fb="more">${followBoxAll ? 'Show less' : 'Show all ' + order.length}</a>` : '');
    }

    // ---- A normal search for a followed artist: NEW marks + "seen" ----
    let feedSeenBefore = null;   // { artist: seen } before this visit (NEW on later pages too)

    function thumbArtists(thumb, tags) {
        const words = new Set((thumbTags(thumb.querySelector('img') || thumb) || '').trim().split(' '));
        return tags.filter(t => words.has(t));
    }

    function isFeedNew(thumb) {
        const id = parseInt(thumbPostId(thumb), 10);
        if (!feedSeenBefore) return false;
        return thumbArtists(thumb, Object.keys(feedSeenBefore)).some(t => feedSeenBefore[t] && id > feedSeenBefore[t]);
    }

    function markFeedNew(thumbs) {
        if (!feedSeenBefore) return;
        (thumbs || allThumbs()).forEach(t => {
            if (isFeedNew(t) && !t.querySelector('.s34-new-badge')) {
                const b = document.createElement('span');
                b.className = 's34-new-badge';
                b.textContent = 'NEW';
                t.appendChild(b);
            }
        });
    }

    // A normal search for exactly one followed artist counts as a visit: NEW on what came out since last time, then the
    // newest post there is "seen" (the Following window does the same)
    function currentFeed() {
        if (isPostView || !onFirstResultsPage()) return null;
        const q = tagsFromUrl(location.href);
        const terms = parseQuery(q).terms.map(t => t.toLowerCase());
        return terms.length === 1 && isFollowed(terms[0]) ? { kind: 'artist', tag: terms[0] } : null;
    }

    function setupFeedPage() {
        const feed = currentFeed();
        if (!feed) return;
        const d = getFollowing();
        const thumbs = allThumbs();
        const max = pageMaxPostId();
        const it = findArtist(feed.tag, d);
        if (!it) return;
        feedSeenBefore = { [feed.tag]: it.seen || 0 };
        const newCount = thumbs.filter(isFeedNew).length;
        markFeedNew(thumbs);
        if (max) { it.seen = Math.max(it.seen || 0, max); it.latest = Math.max(it.latest || 0, max); }
        it.count = 0; it.more = false;
        saveFollowing(d);
        renderFollowBox(d);
        if (newCount) showToast(`${newCount} new post${newCount === 1 ? '' : 's'} from ${prettyTag(feed.tag)} since your last visit (marked NEW).`);
    }

    // ---- Background: count new posts per artist ----
    // A post's thumbnail address, for the circles in the Following window
    function thumbPicOf(thumb) {
        const img = thumb && thumb.querySelector('img');
        const src = img && (img.getAttribute('src') || img.dataset.s34Src || '');
        try { return src ? new URL(src, location.href).href : ''; } catch (e) { return ''; }
    }
    // The newest posts of a search, for counting: [{ id, words, pic }] -
    // through rule34's API when there's a key (20h; plain data, up to 100),
    // else the normal page (42). null: skip this one; throws when Cloudflare
    // wants a check (then the whole round stops)
    // Posts with a blacklisted tag don't count: the pages and the Following
    // window hide them, so a count with them would promise posts nobody sees
    // (Beta 3.7 - "7 new", but 3 NEW marks)
    async function postsForCounting(query, force) {
        const blocked = new Set(readBlocklist().map(t => t.toLowerCase()));
        const shown = got => Object.assign(got, { posts: got.posts.filter(p => ![...p.words].some(w => blocked.has(w))) });
        if (hasApiKey()) {
            try {
                const list = await apiPosts(query, 100);
                return shown({ posts: list.map(p => ({ id: p.id, words: new Set(p.tags.split(/\s+/).concat(p.rating ? ['rating:' + p.rating] : [])), pic: p.preview })), full: list.length >= 100 });
            } catch (e) { /* the normal page instead */ }
        }
        let r;
        try { r = await loadPage(plainSearchUrl(query), force ? 'followNow' : 'follow'); }
        catch (e) { if (e.cloudflare || e.paused) throw e; return null; }
        if (r.status < 200 || r.status >= 300) return null;
        const doc = new DOMParser().parseFromString(r.html, 'text/html');
        const thumbs = Array.from(doc.querySelectorAll('span.thumb'));
        return shown({
            posts: thumbs.map(t => ({ id: parseInt(thumbPostId(t), 10) || 0, words: new Set(thumbTags(t.querySelector('img') || t).trim().split(' ')), pic: thumbPicOf(t) })),
            full: thumbs.length >= 40
        });
    }

    let followCheckRunning = false;
    async function checkFollowing(force) {
        if (!CONFIG.checkFollowing || followCheckRunning) return;
        let d = getFollowing();
        const groups = followGroups(d);
        const searches = getSavedSearches().filter(s => searchCountable(s.query)).length; // (saved searches: 20g)
        if ((!groups.length && !searches) || (!force && Date.now() - d.checkedAt < FOLLOW_CHECK_EVERY)) return;
        followCheckRunning = true;
        try {
            for (let i = 0; i < groups.length; i++) {
                if (cloudflarePaused()) break;
                // (pages go through the shared line; on its own it waits until you're not clicking around)
                let got;
                try { got = await postsForCounting(groupQuery(groups[i]), force); }
                catch (e) { break; } // a Cloudflare check: the rest waits
                if (!got) continue;
                const posts = got.posts;
                const pageMax = posts.reduce((m, p) => Math.max(m, p.id), 0);
                d = getFollowing(); // fresh: something may have changed meanwhile
                groups[i].forEach(tag => {
                    const a = findArtist(tag, d);
                    if (!a) return;
                    const theirs = posts.filter(p => p.words.has(tag));
                    const ids = theirs.map(p => p.id);
                    const max = ids.length ? Math.max(...ids) : 0;
                    if (!a.seen) {
                        // First look: "new" starts after what's there now
                        a.seen = max || pageMax;
                        a.count = 0;
                    } else {
                        a.count = ids.filter(id => id > a.seen).length;
                    }
                    a.more = a.count > 0 && a.count === ids.length && got.full;
                    a.latest = Math.max(a.latest || 0, max);
                    if (theirs.length) a.pic = theirs[0].pic || a.pic; // newest first
                });
                saveFollowing(d);
                renderFollowBox(d);
                fwRefresh();
                if (i < groups.length - 1) await pause(1500);
            }
            if (searches && !cloudflarePaused()) await checkSavedSearches(force);
            d = getFollowing();
            d.checkedAt = Date.now();
            saveFollowing(d);
        } finally {
            followCheckRunning = false;
        }
    }

    function markAllFollowingSeen() {
        const d = getFollowing();
        d.artists.forEach(a => { a.seen = Math.max(a.seen || 0, a.latest || 0); a.count = 0; a.more = false; });
        saveFollowing(d);
        const saved = getSavedSearches();
        saved.forEach(s => { s.seen = Math.max(s.seen || 0, s.latest || 0); s.count = 0; s.more = false; });
        saveSavedSearches(saved);
        refreshFollowUi();
    }

    // ---- Manage window: follow by name, unfollow, check, clear counts ----
    // (the filters of Beta 3.4 are gone: followed artists are always newest first)
    function openFollowingWindow() {
        if (document.querySelector('.s34-follow-win')) return;
        const w = openWindow({ cls: 's34-follow-win', icon: BELL_SVG, title: 'Following', width: 540 });
        w.body.innerHTML = `
            <div class="s34-follow-addrow">
                <input type="text" class="s34-follow-input" placeholder="Follow an artist by name, e.g. someartist" autocomplete="off" spellcheck="false">
                <button type="button" class="s34-follow-addbtn">${BELL_SVG} Follow</button>
            </div>
            <div class="s34-follow-list"></div>
            <div class="s34-follow-foot">
                <button type="button" class="s34-follow-act" data-a="seen" title="Removes the &quot;N new&quot; counts in the sidebar without opening every artist">Clear new counts</button>
                <button type="button" class="s34-follow-act" data-a="check">Check now</button>
                <button type="button" class="s34-follow-act s34-follow-primary" data-a="open">${BELL_SVG} Show posts</button>
            </div>`;

        const listEl = w.body.querySelector('.s34-follow-list');
        const input = w.body.querySelector('.s34-follow-input');
        function render() {
            const d = getFollowing();
            const tot = followTotals(d, true);
            const nA = d.artists.length;
            const parts = [];
            if (nA) parts.push(`${nA} artist${nA === 1 ? '' : 's'}`);
            w.setSub(parts.length ? parts.join(' · ') + (tot.n ? ` · ${tot.text}` : '') +
                (d.checkedAt ? ` · checked ${timeAgo(d.checkedAt)}` : '') : 'Nothing followed yet');
            listEl.replaceChildren();
            if (!nA) {
                const empty = document.createElement('div');
                empty.className = 's34-follow-empty';
                empty.innerHTML = `Follow an artist with the ${BELL_TEXT} next to their name in a post (popup or post page) – or type their name above. Everyone you follow shows up in the sidebar, with a count of their new posts.`;
                listEl.appendChild(empty);
            }
            // A chip: the name opens its posts in the Following window
            const chip = (cls, label, key, href, title, item, onRemove) => {
                const c = document.createElement('span');
                c.className = 's34-follow-chip ' + cls;
                const link = document.createElement('a');
                link.href = href;
                link.textContent = label;
                link.title = title;
                link.addEventListener('click', e => {
                    if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey) return; // new tab: the normal search
                    e.preventDefault();
                    w.close();
                    openFollowPopup(key);
                });
                c.appendChild(link);
                if (item.count) {
                    const n = document.createElement('small');
                    n.className = 's34-has-new';
                    n.textContent = newText(item);
                    c.appendChild(n);
                }
                const x = document.createElement('button');
                x.type = 'button';
                x.textContent = '✕';
                x.title = 'Stop following ' + label;
                x.addEventListener('click', onRemove);
                c.appendChild(x);
                return c;
            };
            const group = chips => {
                if (!chips.length) return;
                const wrap = document.createElement('div');
                wrap.className = 's34-follow-chips';
                chips.forEach(c => wrap.appendChild(c));
                listEl.appendChild(wrap);
            };
            group(d.artists.map(a => chip('s34-feed-artist', prettyTag(a.tag), fwKeyArtist(a.tag), plainSearchUrl(a.tag), 'Show ' + prettyTag(a.tag) + '\'s newest posts', a, () => toggleFollow(a.tag))));
            const saved = getSavedSearches(); // (not listed here - the sidebar has them; Check now and the counts include them)
            w.body.querySelectorAll('.s34-follow-act').forEach(b => { b.disabled = !nA && !saved.length; });
            w.body.querySelector('[data-a="open"]').hidden = !nA; // (the Following window: artists)
            w.body.querySelector('[data-a="seen"]').hidden = !tot.n && !savedTotals(saved).n; // only when there is something new
        }
        w.overlay._s34Render = render;

        function addTyped() {
            const tag = input.value.trim().toLowerCase().replace(/\s+/g, '_');
            if (!tag) return;
            if (!isFollowed(tag)) toggleFollow(tag);
            input.value = '';
            input.focus();
        }
        w.body.querySelector('.s34-follow-addbtn').addEventListener('click', addTyped);
        input.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); addTyped(); } });
        w.body.querySelector('.s34-follow-foot').addEventListener('click', async e => {
            const b = e.target.closest('[data-a]');
            if (!b || b.disabled) return;
            if (b.dataset.a === 'open') { w.close(); openFollowPopup(); }
            else if (b.dataset.a === 'seen') { markAllFollowingSeen(); showToast('New counts cleared – only posts from now on count as new.'); }
            else if (b.dataset.a === 'check') {
                b.disabled = true;
                b.textContent = 'Checking…';
                await checkFollowing(true);
                b.textContent = 'Check now';
                b.disabled = false;
                refreshFollowUi();
                const t = followTotals(null, true), st = savedTotals();
                const all = t.n + st.n;
                showToast(all ? `${all}${/\+/.test(t.text) || st.more ? '+' : ''} new in what you follow and save.` : 'Nothing new right now.');
            }
        });
        render();
        const d0 = getFollowing();
        if (!d0.artists.length) input.focus({ preventScroll: true });
    }
