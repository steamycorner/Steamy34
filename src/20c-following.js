    // =====================================================================
    //  FOLLOWING: artists and searches
    //  The bell next to an artist (popup, post pages) follows them; the bell
    //  under the search box follows a whole search (this replaced the old
    //  "saved searches" in Beta 3.1). The sidebar lists everything you
    //  follow, each with its own "N new" - click one for its posts, with NEW
    //  on the ones since your last visit. "All artists" mixes every artist.
    //  Counting is cheap for artists: one either/or search "( a ~ b ~ … )"
    //  per 20 artists; each new post is matched to its artists by its tags.
    //  Searches are checked one by one.
    //  Feed pages are marked in the part of the address the site never sees:
    //  #s34-following (all artists), #s34-following-2 (group 2),
    //  #s34-following=artist_name (one artist), #s34-search=query (a search).
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
    const SEARCH_ICON = '<svg class="s34-bell" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5 5"/></svg>';

    function getFollowing() {
        let v = {};
        try { v = GM_getValue(FOLLOW_KEY, {}) || {}; } catch (e) {}
        let artists = Array.isArray(v.artists) ? v.artists : null;
        // Beta 2.9 stored { tags: [{ tag, type }] } - keep the artists
        if (!artists && Array.isArray(v.tags)) artists = v.tags.filter(t => t && t.tag && (!t.type || t.type === 'artist')).map(t => ({ tag: t.tag, added: t.added || Date.now() }));
        return {
            // filter: '' = the shared filter, 'all' = everything, '50' = only score ≥ 50 (per artist, Beta 3.4)
            artists: (artists || []).filter(a => a && a.tag).map(a => Object.assign({ seen: 0, latest: 0, count: 0, more: false, filter: '' }, a)),
            searches: (Array.isArray(v.searches) ? v.searches : []).filter(s => s && s.query)
                .map(s => Object.assign({ name: s.query, added: 0, seen: 0, latest: 0, count: 0, more: false }, s)),
            checkedAt: v.checkedAt || 0,
            filter: Object.assign({ score: '', type: '', rating: '' }, v.filter || {})
        };
    }
    function saveFollowing(d) { GM_setValue(FOLLOW_KEY, d); }

    // Saved searches from before Beta 3.1 (steamy34_saved) move in here once,
    // with their "newest post seen" and "N new" kept
    function migrateSavedSearches() {
        let old;
        try { old = GM_getValue(SAVED_KEY, null); } catch (e) { return; }
        if (!Array.isArray(old)) return;
        const d = getFollowing();
        old.forEach(s => {
            if (!s || !s.query || findSearch(s.query, d)) return;
            d.searches.push({ query: s.query, name: s.name || s.query, added: Date.now(),
                seen: s.seenId || 0, latest: s.seenId || 0, count: s.newCount || 0, more: !!s.newMore });
        });
        saveFollowing(d);
        try { GM_deleteValue(SAVED_KEY); } catch (e) {} // only after the copy is saved
    }

    // ---- Searches ----
    function findSearch(q, d) {
        const key = normalizeQuery(q || '');
        return key ? (d || getFollowing()).searches.find(s => normalizeQuery(s.query) === key) || null : null;
    }
    // "panam_palmer score:>=50 height:>=1080 width:>=1080" -> "panam palmer
    // score ≥ 50 1080p+" (a name you gave it stays as it is)
    const searchLabel = s => (s.name && s.name !== s.query ? s.name : s.query
        .replace(/\bheight:>=(\d+)\s+width:>=\1\b|\bwidth:>=(\d+)\s+height:>=\2\b/g, (m, a, b) => (a || b) + 'p+')
        .replace(/\b(width|height):>=(\d+)/g, '$1 ≥ $2')
        .replace(/\bscore:>=(\d+)/g, 'score ≥ $1').replace(/\bscore:>(\d+)/g, 'score > $1').replace(/\brating:(\w+)/g, '$1'))
        .replace(/_/g, ' ');
    function searchFeedUrl(q) {
        return 'index.php?page=post&s=list&tags=' + encodeURIComponent(q) + '#s34-search=' + encodeURIComponent(q);
    }
    // A search with one word that is a followed artist counts as that artist
    function soleArtistOf(q, d) {
        const t = parseQuery(q || '').terms.map(x => x.toLowerCase());
        return t.length === 1 && normalizeQuery(q) === normalizeQuery(t[0]) && isFollowed(t[0], d) ? t[0] : '';
    }
    function isQueryFollowed(q, d) { return !!findSearch(q, d) || !!soleArtistOf(q, d); }

    // Follow / unfollow a search (seen: the newest post already on screen)
    function toggleFollowSearch(q, seen) {
        q = String(q || '').trim().replace(/\s+/g, ' ');
        if (!q) return false;
        const artist = soleArtistOf(q);
        if (artist) return toggleFollow(artist);
        const d = getFollowing();
        const s = findSearch(q, d);
        if (s) {
            const i = d.searches.indexOf(s);
            d.searches.splice(i, 1);
            saveFollowing(d);
            showToast('Stopped following "' + searchLabel(s) + '".', 'Undo', () => {
                const again = getFollowing();
                if (!findSearch(q, again)) { again.searches.splice(Math.min(i, again.searches.length), 0, s); saveFollowing(again); }
                refreshFollowUi();
            });
            refreshFollowUi();
            return false;
        }
        d.searches.push({ query: q, name: q, added: Date.now(), seen: seen || 0, latest: seen || 0, count: 0, more: false });
        if (!seen) d.checkedAt = 0; // the next check sets where "new" begins
        saveFollowing(d);
        showToast('Following "' + q.replace(/_/g, ' ') + '" – new posts show up in the sidebar.');
        refreshFollowUi();
        return true;
    }

    function findArtist(tag, d) {
        tag = String(tag).toLowerCase();
        return (d || getFollowing()).artists.find(a => a.tag === tag) || null;
    }
    const isFollowed = (tag, d) => !!findArtist(tag, d);

    // Artists in groups of 20 for the either/or searches. Artists with their
    // own filter are grouped separately (one search can only have one
    // filter); each group carries its filter words as .words
    function followGroups(d) {
        d = d || getFollowing();
        const byFilter = new Map();
        d.artists.forEach(a => {
            const words = artistFilterWords(a, d);
            const key = words.join(' ');
            if (!byFilter.has(key)) byFilter.set(key, { words, tags: [] });
            byFilter.get(key).tags.push(a.tag);
        });
        const groups = [];
        byFilter.forEach(({ words, tags }) => {
            for (let i = 0; i < tags.length; i += FEED_GROUP_SIZE) {
                const g = tags.slice(i, i + FEED_GROUP_SIZE);
                g.words = words;
                groups.push(g);
            }
        });
        return groups;
    }

    function filterWords(d) {
        const f = (d || getFollowing()).filter, out = [];
        if (f.score) out.push('score:>=' + f.score);
        if (f.type && TYPE_FILTER_TERMS[f.type]) out.push(...TYPE_FILTER_TERMS[f.type]);
        if (f.rating) out.push(f.rating);
        return out;
    }
    // One artist's filter: the shared one, everything, or its own minimum score
    function artistFilterWords(a, d) {
        if (!a || !a.filter) return filterWords(d);
        if (a.filter === 'all') return [];
        return /^\d+$/.test(a.filter) ? ['score:>=' + a.filter] : filterWords(d);
    }
    function groupQuery(tags, d) {
        if (!tags || !tags.length) return '';
        return [tags.length === 1 ? tags[0] : '( ' + tags.join(' ~ ') + ' )'].concat(tags.words || filterWords(d)).join(' ');
    }

    // Feed addresses: one artist, or all of them (group i)
    function artistFeedUrl(tag, d) {
        d = d || getFollowing();
        return 'index.php?page=post&s=list&tags=' + encodeURIComponent([tag].concat(artistFilterWords(findArtist(tag, d), d)).join(' ')) +
               '#s34-following=' + encodeURIComponent(tag);
    }
    function allFeedUrl(i = 0, d) {
        d = d || getFollowing();
        return 'index.php?page=post&s=list&tags=' + encodeURIComponent(groupQuery(followGroups(d)[i], d)) +
               '#s34-following' + (i ? '-' + i : '');
    }

    // Which feed an address is (null = none). A function, so the search
    // code can use it while the page is still loading.
    function feedFromHash(hash) {
        let m = /^#s34-following=(.+)$/.exec(hash || '');
        if (m) { try { return { kind: 'artist', tag: decodeURIComponent(m[1]).toLowerCase() }; } catch (e) { return null; } }
        m = /^#s34-search=(.+)$/.exec(hash || '');
        if (m) { try { return { kind: 'search', query: decodeURIComponent(m[1]) }; } catch (e) { return null; } }
        m = /^#s34-following(?:-(\d+))?$/.exec(hash || '');
        return m ? { kind: 'all', group: parseInt(m[1], 10) || 0 } : null;
    }
    function feedIndexFromHash(hash) { return feedFromHash(hash) ? 0 : -1; } // >= 0: some feed
    function onFeedPage() { return !isPostView && !!feedFromHash(location.hash); }
    // A followed search's page: a normal search otherwise (its words show in the box)
    function onSearchFeed() { const f = !isPostView && feedFromHash(location.hash); return !!f && f.kind === 'search'; }

    // includeSearches: everything (Manage window) - otherwise artists only ("All artists")
    function followTotals(d, includeSearches) {
        d = d || getFollowing();
        const list = includeSearches ? d.artists.concat(d.searches) : d.artists;
        const n = list.reduce((s, a) => s + (a.count || 0), 0);
        return { n, text: n ? n + (list.some(a => a.more) ? '+' : '') + ' new' : '' };
    }
    const newText = a => (a.count ? a.count + (a.more ? '+' : '') + ' new' : '');

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
            showToast('Following ' + prettyTag(tag) + ' – their new posts show up in the sidebar.', 'Open', () => { location.href = artistFeedUrl(tag); });
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
        const win = document.querySelector('.s34-follow-win');
        if (win && win._s34Render) win._s34Render();
        const sb = document.querySelector('.s34-sb-follow'); // bell under the search box
        if (sb && sb._s34Refresh) sb._s34Refresh();
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
        box.addEventListener('click', e => {
            const s = e.target.closest('[data-fs]');
            if (s) { e.preventDefault(); location.href = searchFeedUrl(s.dataset.fs); return; }
            const t = e.target.closest('[data-fb]');
            if (!t) return;
            e.preventDefault();
            const what = t.dataset.fb;
            if (what === 'manage') openFollowingWindow();
            else if (what === 'more') { followBoxAll = !followBoxAll; renderFollowBox(); }
            else if (what === 'all') location.href = allFeedUrl(0);
            else location.href = artistFeedUrl(what);
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
                n = t.n;
                more = /\+/.test(t.text);
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
        const feed = onFeedPage() ? feedFromHash(location.hash) : null;
        const head = `<div class="s34-follow-head">${BELL_SVG}<b>Following</b><a href="#" data-fb="manage">Manage</a></div>`;
        if (!d.artists.length && !d.searches.length) {
            box.innerHTML = head + `<div class="s34-follow-none">Follow an artist with the ${BELL_TEXT} next to their name in a post – or a whole search with the ${BELL_TEXT} under the search box. Their new posts show up here.</div>`;
            return;
        }
        // Everything with something new first, then the rest in the order you
        // followed it (artists, then searches)
        const items = d.artists.map(a => ({ a, artist: true })).concat(d.searches.map(s => ({ a: s, artist: false })));
        const order = items.map((x, i) => [x, i]).sort((x, y) => (y[0].a.count || 0) - (x[0].a.count || 0) || x[1] - y[1]).map(x => x[0]);
        const shown = followBoxAll ? order : order.slice(0, FOLLOW_BOX_ROWS);
        const tot = followTotals(d);
        const badgeHtml = badge => badge ? `<small class="s34-has-new">${badge}</small>` : '';
        const row = (key, label, badge, cls, on) =>
            `<a href="#" class="s34-follow-row ${cls}${on ? ' s34-on' : ''}" data-fb="${escapeHtml(key)}"><span>${label}</span>${badgeHtml(badge)}</a>`;
        const searchRow = (s, on) =>
            `<a href="#" class="s34-follow-row s34-follow-srow${on ? ' s34-on' : ''}" data-fs="${escapeHtml(s.query)}" title="Search: ${escapeHtml(s.query)}">${SEARCH_ICON}<span>${escapeHtml(searchLabel(s))}</span>${badgeHtml(newText(s))}</a>`;
        const onSearch = s => feed && feed.kind === 'search' && normalizeQuery(feed.query) === normalizeQuery(s.query);
        box.innerHTML = head +
            (d.artists.length > 1 ? row('all', 'All artists', tot.text, 's34-follow-allrow', feed && feed.kind === 'all') : '') +
            shown.map(x => x.artist
                ? row(x.a.tag, escapeHtml(prettyTag(x.a.tag)), newText(x.a), '', feed && feed.kind === 'artist' && feed.tag === x.a.tag)
                : searchRow(x.a, onSearch(x.a))).join('') +
            (order.length > FOLLOW_BOX_ROWS ? `<a href="#" class="s34-follow-more" data-fb="more">${followBoxAll ? 'Show less' : 'Show all ' + order.length}</a>` : '');
    }

    // ---- Feed pages: NEW marks + "seen" ----
    let feedSeenBefore = null;   // { artist: seen } before this visit (NEW on later pages too)
    let feedSearchSeen = null;   // a followed search: the newest post seen before this visit

    function thumbArtists(thumb, tags) {
        const words = new Set((thumbTags(thumb.querySelector('img') || thumb) || '').trim().split(' '));
        return tags.filter(t => words.has(t));
    }

    function isFeedNew(thumb) {
        const id = parseInt(thumbPostId(thumb), 10);
        if (feedSearchSeen !== null) return !!feedSearchSeen && id > feedSearchSeen;
        if (!feedSeenBefore) return false;
        return thumbArtists(thumb, Object.keys(feedSeenBefore)).some(t => feedSeenBefore[t] && id > feedSeenBefore[t]);
    }

    function markFeedNew(thumbs) {
        if (!feedSeenBefore && feedSearchSeen === null) return;
        (thumbs || allThumbs()).forEach(t => {
            if (isFeedNew(t) && !t.querySelector('.s34-new-badge')) {
                const b = document.createElement('span');
                b.className = 's34-new-badge';
                b.textContent = 'NEW';
                t.appendChild(b);
            }
        });
    }

    // A feed page - or a normal search for a followed search / exactly one
    // followed artist, which counts as a visit too
    function currentFeed() {
        if (isPostView) return null;
        const f = feedFromHash(location.hash);
        if (f) return f;
        if (!onFirstResultsPage()) return null;
        const q = tagsFromUrl(location.href);
        if (findSearch(q)) return { kind: 'search', query: q, plain: true };
        const terms = parseQuery(q).terms.map(t => t.toLowerCase());
        return terms.length === 1 && isFollowed(terms[0]) ? { kind: 'artist', tag: terms[0], plain: true } : null;
    }

    // A followed search's page: NEW on what came out since last time,
    // then remember the newest post
    function setupSearchFeed(feed, d, thumbs) {
        const s = findSearch(feed.query, d);
        if (!s) return;
        feedSearchSeen = s.seen || 0;
        const newCount = thumbs.filter(isFeedNew).length;
        markFeedNew(thumbs);
        if (onFirstResultsPage()) {
            const max = pageMaxPostId();
            if (max) { s.seen = Math.max(s.seen || 0, max); s.latest = Math.max(s.latest || 0, max); }
            s.count = 0; s.more = false;
            saveFollowing(d);
        }
        renderFollowBox(d);
        if (newCount) showToast(`${newCount} new post${newCount === 1 ? '' : 's'} since your last visit (marked NEW).`);
        if (feed.plain) return; // a normal search: no extra bar
        document.documentElement.classList.add('s34-feed');
        const list = document.querySelector('.image-list');
        const where = (list && list.parentElement) || document.querySelector('.content, #content');
        if (!where) return;
        const bar = document.createElement('div');
        bar.className = 's34-feed-bar';
        where.prepend(bar);
        bar.innerHTML = `<div class="s34-feed-head">${SEARCH_ICON}<b class="s34-feed-q"></b><span class="s34-feed-sub"></span></div>
            <button type="button" class="s34-feed-btn" data-f="unfollow">${BELL_ON_SVG} Following</button>
            <button type="button" class="s34-feed-btn" data-f="manage">Manage</button>`;
        bar.querySelector('b').textContent = searchLabel(s);
        bar.querySelector('.s34-feed-sub').textContent = '· ' + (newCount ? `${newCount} new since your last visit` : 'nothing new since your last visit');
        bar.addEventListener('click', e => {
            const b = e.target.closest('[data-f]');
            if (!b) return;
            if (b.dataset.f === 'manage') openFollowingWindow();
            else {
                const on = toggleFollowSearch(s.query);
                b.innerHTML = on ? BELL_ON_SVG + ' Following' : BELL_SVG + ' Follow';
            }
        });
    }

    function setupFeedPage() {
        const feed = currentFeed();
        if (!feed) return;
        const d = getFollowing();
        const thumbs = allThumbs();
        if (feed.kind === 'search') { setupSearchFeed(feed, d, thumbs); return; }
        let tags = [];
        if (feed.kind === 'artist') {
            if (!isFollowed(feed.tag, d)) return;
            tags = [feed.tag];
        } else {
            tags = followGroups(d)[feed.group] || [];
        }
        feedSeenBefore = {};
        tags.forEach(t => { feedSeenBefore[t] = (findArtist(t, d) || {}).seen || 0; });
        const newCount = thumbs.filter(isFeedNew).length;
        markFeedNew(thumbs);

        // Everyone on this page is now "seen" up to their newest post here
        tags.forEach(t => {
            const a = findArtist(t, d);
            if (!a) return;
            const ids = thumbs.filter(th => thumbArtists(th, [t]).length || feed.kind === 'artist')
                .map(th => parseInt(thumbPostId(th), 10) || 0);
            const max = ids.length ? Math.max(...ids) : 0;
            if (max) { a.seen = Math.max(a.seen || 0, max); a.latest = Math.max(a.latest || 0, max); }
            if (max || feed.kind === 'artist') { a.count = 0; a.more = false; }
        });
        saveFollowing(d);
        renderFollowBox(d);
        if (feed.plain) {
            if (newCount) showToast(`${newCount} new post${newCount === 1 ? '' : 's'} from ${prettyTag(feed.tag)} since your last visit (marked NEW).`);
            return; // a normal search: no extra bar
        }

        document.documentElement.classList.add('s34-feed');
        document.title = '🔔 ' +(feed.kind === 'artist' ? prettyTag(feed.tag) : 'Followed artists') + ' – ' + document.title;
        const list = document.querySelector('.image-list');
        const where = (list && list.parentElement) || document.querySelector('.content, #content');
        if (!where) return;
        const bar = document.createElement('div');
        bar.className = 's34-feed-bar';
        where.prepend(bar); // very top of the posts column (above "Page 1" and the ad space)

        const sub = newCount ? `${newCount} new since your last visit` : 'nothing new since your last visit';
        if (feed.kind === 'artist') {
            bar.innerHTML = `<div class="s34-feed-head">${BELL_SVG}<b class="s34-feed-artist"></b><span class="s34-feed-sub"></span></div>
                <button type="button" class="s34-feed-btn" data-f="unfollow">${BELL_ON_SVG} Following</button>
                <button type="button" class="s34-feed-btn" data-f="manage">Manage</button>`;
            bar.querySelector('b').textContent = prettyTag(feed.tag);
        } else {
            const groups = followGroups(d);
            let from = 0; // groups can be shorter than 20 (artists with their own filter are separate)
            const pills = groups.length > 1 ? `<div class="s34-feed-groups">${groups.map((g, i) => {
                const a = from + 1;
                from += g.length;
                return `<a href="${allFeedUrl(i, d)}" class="${i === feed.group ? 's34-on' : ''}" title="${escapeHtml(g.join(', '))}">${a}–${from}</a>`;
            }).join('')}</div>` : '';
            bar.innerHTML = `<div class="s34-feed-head">${BELL_SVG}<b>All followed artists</b><span class="s34-feed-sub"></span></div>
                ${pills}<div class="s34-feed-tags"></div>
                <button type="button" class="s34-feed-btn" data-f="manage">Manage</button>`;
            const box = bar.querySelector('.s34-feed-tags');
            tags.forEach(t => {
                const a = document.createElement('a');
                a.className = 's34-feed-tag s34-feed-artist';
                a.href = artistFeedUrl(t, d);
                a.textContent = prettyTag(t);
                box.appendChild(a);
            });
        }
        bar.querySelector('.s34-feed-sub').textContent = '· ' + sub;
        bar.addEventListener('click', e => {
            const b = e.target.closest('[data-f]');
            if (!b) return;
            if (b.dataset.f === 'manage') openFollowingWindow();
            else if (b.dataset.f === 'unfollow') {
                const on = toggleFollow(feed.tag);
                b.innerHTML = on ? BELL_ON_SVG + ' Following' : BELL_SVG + ' Follow';
            }
        });
        if (newCount) showToast(`${newCount} new post${newCount === 1 ? '' : 's'} since your last visit (marked NEW).`);
        setTimeout(() => showHint('feed', `Posts since your last visit are marked <b>NEW</b>. Your followed artists are in the sidebar, each with its own count – follow more with the ${BELL_TEXT} next to an artist in any post.`), 1500);
    }

    // ---- Background: count new posts per artist ----
    let followCheckRunning = false;
    async function checkFollowing(force) {
        if (!CONFIG.checkFollowing || followCheckRunning) return;
        let d = getFollowing();
        const groups = followGroups(d);
        const searches = d.searches.map(s => s.query);
        if ((!groups.length && !searches.length) || (!force && Date.now() - d.checkedAt < FOLLOW_CHECK_EVERY)) return;
        followCheckRunning = true;
        try {
            let stopped = false;
            for (let i = 0; i < groups.length; i++) {
                if (cloudflarePaused()) { stopped = true; break; }
                let html, status;
                try {
                    const r = await fetchWithTimeout('index.php?page=post&s=list&tags=' + encodeURIComponent(groupQuery(groups[i], d)));
                    status = r.status;
                    html = await r.text();
                } catch (e) { continue; }
                if (isCloudflareCheck(status, html)) { pauseForCloudflare(location.href); stopped = true; break; }
                if (status < 200 || status >= 300) continue;
                const doc = new DOMParser().parseFromString(html, 'text/html');
                const posts = Array.from(doc.querySelectorAll('span.thumb')).map(t => ({ id: parseInt(thumbPostId(t), 10) || 0, thumb: t }));
                const pageMax = posts.reduce((m, p) => Math.max(m, p.id), 0);
                d = getFollowing(); // fresh: something may have changed meanwhile
                groups[i].forEach(tag => {
                    const a = findArtist(tag, d);
                    if (!a) return;
                    const theirs = posts.filter(p => thumbArtists(p.thumb, [tag]).length).map(p => p.id);
                    const max = theirs.length ? Math.max(...theirs) : 0;
                    if (!a.seen) {
                        // First look: "new" starts after what's there now
                        a.seen = max || pageMax;
                        a.count = 0;
                    } else {
                        a.count = theirs.filter(id => id > a.seen).length;
                    }
                    a.more = a.count > 0 && a.count === theirs.length && posts.length >= 40;
                    a.latest = Math.max(a.latest || 0, max);
                });
                saveFollowing(d);
                renderFollowBox(d);
                if (i < groups.length - 1 || searches.length) await pause(1500);
            }
            // Followed searches: one request each
            for (let i = 0; i < searches.length && !stopped; i++) {
                if (cloudflarePaused()) break;
                let html, status;
                try {
                    const r = await fetchWithTimeout('index.php?page=post&s=list&tags=' + encodeURIComponent(searches[i]));
                    status = r.status;
                    html = await r.text();
                } catch (e) { continue; }
                if (isCloudflareCheck(status, html)) { pauseForCloudflare(location.href); break; }
                if (status < 200 || status >= 300) continue;
                const doc = new DOMParser().parseFromString(html, 'text/html');
                const ids = Array.from(doc.querySelectorAll('span.thumb')).map(t => parseInt(thumbPostId(t), 10) || 0);
                const pageMax = ids.reduce((m, x) => Math.max(m, x), 0);
                d = getFollowing();
                const s = findSearch(searches[i], d);
                if (!s) continue;
                if (!s.seen) { s.seen = pageMax; s.count = 0; }  // first look: "new" starts after what's there now
                else s.count = ids.filter(id => id > s.seen).length;
                s.more = s.count > 0 && s.count === ids.length && ids.length >= 40;
                s.latest = Math.max(s.latest || 0, pageMax);
                saveFollowing(d);
                renderFollowBox(d);
                if (i < searches.length - 1) await pause(1500);
            }
            d = getFollowing();
            d.checkedAt = Date.now();
            saveFollowing(d);
        } finally {
            followCheckRunning = false;
        }
    }

    function markAllFollowingSeen() {
        const d = getFollowing();
        d.artists.concat(d.searches).forEach(a => { a.seen = Math.max(a.seen || 0, a.latest || 0); a.count = 0; a.more = false; });
        saveFollowing(d);
        refreshFollowUi();
    }

    // ---- Manage window ----
    function openFollowingWindow() {
        if (document.querySelector('.s34-follow-win')) return;
        const w = openWindow({ cls: 's34-follow-win', icon: BELL_SVG, title: 'Following', width: 540 });
        const FILTERS = [
            ['score', 'Score', [['', 'Any'], ['10', '≥ 10'], ['50', '≥ 50'], ['100', '≥ 100'], ['500', '≥ 500']]],
            ['type', 'Type', [['', 'All'], ['image', 'Pictures'], ['animated', 'GIFs'], ['video', 'Videos']]],
            ['rating', 'Rating', [['', 'Any'], ['rating:safe', 'Safe'], ['rating:questionable', 'Questionable'], ['rating:explicit', 'Explicit'], ['-rating:explicit', 'Not explicit']]]
        ];
        w.body.innerHTML = `
            <div class="s34-follow-addrow">
                <input type="text" class="s34-follow-input" placeholder="Follow an artist by name, e.g. someartist" autocomplete="off" spellcheck="false">
                <button type="button" class="s34-follow-addbtn">${BELL_SVG} Follow</button>
            </div>
            <div class="s34-follow-list"></div>
            <div class="s34-follow-filter">
                <div class="s34-follow-label">Shared artist filter <span>– for every followed artist set to "Shared filter" (each artist above can also have its own); followed searches and normal searches stay as they are</span></div>
                <div class="s34-follow-filters">${FILTERS.map(([k, label, opts]) => `<label><span>${label}</span><select data-k="${k}">${opts.map(([v, t]) => `<option value="${v}">${t}</option>`).join('')}</select></label>`).join('')}</div>
            </div>
            <div class="s34-follow-foot">
                <button type="button" class="s34-follow-act" data-a="seen" title="Removes the &quot;N new&quot; counts in the sidebar without opening every artist">Clear new counts</button>
                <button type="button" class="s34-follow-act" data-a="check">Check now</button>
                <button type="button" class="s34-follow-act s34-follow-primary" data-a="open">${BELL_SVG} All artists</button>
            </div>`;

        const listEl = w.body.querySelector('.s34-follow-list');
        const input = w.body.querySelector('.s34-follow-input');
        function render() {
            const d = getFollowing();
            const tot = followTotals(d, true);
            const nA = d.artists.length, nS = d.searches.length;
            const parts = [];
            if (nA) parts.push(`${nA} artist${nA === 1 ? '' : 's'}`);
            if (nS) parts.push(`${nS} search${nS === 1 ? '' : 'es'}`);
            w.setSub(parts.length ? parts.join(' · ') + (tot.n ? ` · ${tot.text}` : '') +
                (d.checkedAt ? ` · checked ${timeAgo(d.checkedAt)}` : '') : 'Nothing followed yet');
            listEl.replaceChildren();
            if (!nA && !nS) {
                const empty = document.createElement('div');
                empty.className = 's34-follow-empty';
                empty.innerHTML = `Follow an artist with the ${BELL_TEXT} next to their name in a post (popup or post page) – or type their name above. To follow a whole search (e.g. a character with a score filter), search for it and click the ${BELL_TEXT} under the search box. Everything you follow shows up in the sidebar, with a count of its new posts.`;
                listEl.appendChild(empty);
            }
            const chip = (cls, label, href, title, item, onRemove) => {
                const c = document.createElement('span');
                c.className = 's34-follow-chip ' + cls;
                const link = document.createElement('a');
                link.href = href;
                link.textContent = label;
                link.title = title;
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
            const group = (title, chips) => {
                if (!chips.length) return;
                if (nA && nS) {
                    const h = document.createElement('div');
                    h.className = 's34-follow-group';
                    h.textContent = title;
                    listEl.appendChild(h);
                }
                const wrap = document.createElement('div');
                wrap.className = 's34-follow-chips';
                chips.forEach(c => wrap.appendChild(c));
                listEl.appendChild(wrap);
            };
            group('Artists', d.artists.map(a => {
                const c = chip('s34-feed-artist', prettyTag(a.tag), artistFeedUrl(a.tag, d), 'Show ' + prettyTag(a.tag), a, () => toggleFollow(a.tag));
                // This artist's own filter (or the shared one)
                const sel = document.createElement('select');
                sel.className = 's34-follow-afilter';
                sel.title = 'Filter for ' + prettyTag(a.tag);
                [['', 'Shared filter'], ['all', 'Everything'], ['10', 'Score ≥ 10'], ['50', 'Score ≥ 50'], ['100', 'Score ≥ 100'], ['500', 'Score ≥ 500']]
                    .forEach(([v, t]) => sel.add(new Option(t, v)));
                sel.value = a.filter || '';
                sel.addEventListener('change', () => {
                    const fresh = getFollowing();
                    const art = findArtist(a.tag, fresh);
                    if (!art) return;
                    art.filter = sel.value;
                    fresh.checkedAt = 0; // counts follow the new filter at the next check
                    saveFollowing(fresh);
                    showToast(prettyTag(a.tag) + ': ' + sel.selectedOptions[0].textContent.toLowerCase() + '.');
                    refreshFollowUi();
                });
                c.insertBefore(sel, c.querySelector('button'));
                return c;
            }));
            group('Searches', d.searches.map(s => chip('s34-follow-schip', searchLabel(s), searchFeedUrl(s.query), 'Search: ' + s.query, s, () => toggleFollowSearch(s.query))));
            w.body.querySelectorAll('.s34-follow-filters select').forEach(s => { s.value = d.filter[s.dataset.k] || ''; });
            w.body.querySelectorAll('.s34-follow-act').forEach(b => { b.disabled = !nA && !nS; });
            w.body.querySelector('.s34-follow-filter').hidden = !nA; // the filter is for artists
            w.body.querySelector('[data-a="open"]').hidden = nA < 2;
            w.body.querySelector('[data-a="seen"]').hidden = !tot.n; // only when there is something new
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
        w.body.querySelectorAll('.s34-follow-filters select').forEach(s => s.addEventListener('change', () => {
            const d = getFollowing();
            d.filter[s.dataset.k] = s.value;
            d.checkedAt = 0; // counts follow the new filter at the next check
            saveFollowing(d);
            showToast('Filter saved – it applies to your followed artists.');
        }));
        w.body.querySelector('.s34-follow-foot').addEventListener('click', async e => {
            const b = e.target.closest('[data-a]');
            if (!b || b.disabled) return;
            if (b.dataset.a === 'open') { w.close(); location.href = allFeedUrl(0); }
            else if (b.dataset.a === 'seen') { markAllFollowingSeen(); showToast('New counts cleared – only posts from now on count as new.'); }
            else if (b.dataset.a === 'check') {
                b.disabled = true;
                b.textContent = 'Checking…';
                await checkFollowing(true);
                b.textContent = 'Check now';
                b.disabled = false;
                refreshFollowUi();
                const t = followTotals(null, true);
                showToast(t.n ? `${t.text} in what you follow.` : 'Nothing new right now.');
            }
        });
        render();
        const d0 = getFollowing();
        if (!d0.artists.length && !d0.searches.length) input.focus({ preventScroll: true });
    }
