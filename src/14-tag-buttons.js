    // =====================================================================
    //  4. BLOCKLIST BUTTON NEXT TO EVERY TAG
    //  Uses the site's own blacklist (cookie "tag_blacklist", the same list
    //  as "My Account > Options > Tag Blacklist").
    // =====================================================================

    const BL_COOKIE = 'tag_blacklist';

    // The site stores the blacklist like PHP does: tags HTML-escaped
    // (' -> &#039;), joined with "%20", and the whole thing URL-encoded
    // again ("%2520" between tags). So: decode until no %xx is left, split
    // on spaces, and turn &#039; etc. back into normal characters.
    function unescapeHtml(s) {
        return s.replace(/&#0*39;|&#x0*27;/gi, "'").replace(/&quot;/g, '"')
                .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
    }

    function escapeHtml(s) {
        return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
    }

    // Parsed once per cookie value (it's read very often while rendering)
    let blCacheRaw = null;
    let blCacheList = [];

    function readBlocklist() {
        const m = document.cookie.match(new RegExp('(?:^|;\\s*)' + BL_COOKIE + '=([^;]*)'));
        if (!m) return [];
        if (m[1] === blCacheRaw) return blCacheList.slice();
        blCacheRaw = m[1];
        blCacheList = parseBlocklist(m[1]);
        return blCacheList.slice();
    }

    function parseBlocklist(cookieValue) {
        let raw = cookieValue.replace(/\+/g, ' ');
        for (let i = 0; i < 4 && /%[0-9a-f]{2}/i.test(raw); i++) {
            try { raw = decodeURIComponent(raw); } catch (e) { break; }
        }
        const seen = new Set();
        return raw.split(/\s+/).map(unescapeHtml).filter(t => {
            const k = t.toLowerCase();
            if (!t || seen.has(k)) return false;
            seen.add(k);
            return true;
        });
    }

    // When each tag was blacklisted (the site's cookie has no dates), for
    // "Recently blacklisted" and sorting in the blacklist window
    const BL_TIMES_KEY = 'steamy34_bltimes';

    function getBlTimes() {
        try {
            const v = GM_getValue(BL_TIMES_KEY, {});
            return v && typeof v === 'object' ? v : {};
        } catch (e) { return {}; }
    }

    function writeBlocklist(list) {
        const before = new Set(readBlocklist().map(t => t.toLowerCase()));
        // Same format the site itself writes (see readBlocklist)
        const value = encodeURIComponent(list.map(escapeHtml).join('%20'));
        const maxAge = 60 * 60 * 24 * 365 * 5; // 5 years
        document.cookie = `${BL_COOKIE}=${value}; path=/; max-age=${maxAge}; SameSite=Lax`;
        try {
            const times = getBlTimes();
            const now = Date.now();
            const lower = new Set(list.map(t => t.toLowerCase()));
            lower.forEach(k => { if (!before.has(k) && !times[k]) times[k] = now; });
            Object.keys(times).forEach(k => { if (!lower.has(k)) delete times[k]; });
            GM_setValue(BL_TIMES_KEY, times);
        } catch (e) {}
        // Keep the sidebar "Blacklist · N tags" button up to date
        const count = document.querySelector('.s34-blbtn-count');
        if (count) count.textContent = list.length === 1 ? '1 tag' : list.length + ' tags';
    }

    function isBlocked(tag) {
        return readBlocklist().some(t => t.toLowerCase() === tag.toLowerCase());
    }

    function toggleBlock(tag) {
        let list = readBlocklist();
        const lower = tag.toLowerCase();
        const blocked = list.some(t => t.toLowerCase() === lower);

        if (blocked) {
            list = list.filter(t => t.toLowerCase() !== lower);
        } else {
            list.push(tag);
        }
        writeBlocklist(list);
        console.log(`[Steamy34] ${blocked ? 'Removed from the blacklist' : 'Blacklisted'}: ${tag}`);
        return !blocked;
    }

    function styleButton(btn, blocked) {
        btn.textContent = blocked ? '↺' : '⊘'; // ↺ unblock / ⊘ block
        btn.title = blocked ? 'Blacklisted - click to remove from the blacklist'
                            : 'Add to blacklist';
        btn.classList.toggle('blocked', blocked);
        const row = btn.closest('li');
        if (row) row.classList.toggle('s34-li-blocked', blocked); // crossed-out tag
    }

    function addBlocklistButtons() {
        document.querySelectorAll('#tag-sidebar li[class*="tag-type-"]').forEach(row => {
            if (row.querySelector('.r34-block-btn')) return;

            const tag = getTagFromRow(row);
            if (!tag) return;

            const btn = document.createElement('a');
            btn.href = '#';
            btn.className = 'r34-block-btn';
            styleButton(btn, isBlocked(tag));

            btn.addEventListener('click', e => {
                e.preventDefault();
                e.stopPropagation();
                const nowBlocked = toggleBlock(tag);
                styleButton(btn, nowBlocked);
                if (CONFIG.reloadAfterBlock) location.reload();
            });

            // At the end of the tag, like on the thumbnail chips
            row.appendChild(btn);
            styleButton(btn, isBlocked(tag)); // again, now that it's in the row
        });
    }

    // =====================================================================
    //  4b. ADD TAG TO THE CURRENT SEARCH
    //  "+" next to every tag on a post (full page and popup) adds it to the
    //  search you came from. Shift+click adds it as an exclusion (-tag).
    // =====================================================================

    const LAST_SEARCH_KEY = 'steamy34_lastsearch';

    function searchBox() {
        return document.querySelector('textarea.s34-search, .sidebar input[name="tags"], input[name="tags"]');
    }

    function tagsFromUrl(url) {
        try {
            const u = new URL(url, location.href);
            if (u.hostname.replace(/^www\./, '') !== location.hostname.replace(/^www\./, '')) return '';
            if (u.searchParams.get('page') !== 'post') return '';
            const feed = feedFromHash(u.hash);
            if (feed && feed.kind !== 'search') return ''; // an artist feed isn't a search to add to (a followed search is)
            const t = (u.searchParams.get('tags') || '').trim();
            return t === 'all' ? '' : t;
        } catch (e) { return ''; }
    }

    // The search the post was found with: what's in the search box, else the
    // address, else the page you came from, else the last search you ran.
    function currentSearch() {
        const box = searchBox();
        const fromBox = box && box.value.trim();
        if (fromBox) return fromBox;
        if (onSearchFeed()) return tagsFromUrl(location.href);
        if (onFeedPage()) return ''; // an artist feed: only what you type, not the page you came from
        return tagsFromUrl(location.href) || tagsFromUrl(document.referrer) ||
               (GM_getValue(LAST_SEARCH_KEY, '') || '');
    }

    function rememberSearch() {
        if (isPostView || onFeedPage()) return; // the feed isn't a "recent search"
        const t = tagsFromUrl(location.href);
        if (t) {
            GM_setValue(LAST_SEARCH_KEY, t);
            addToHistory(t); // for "Recent" in the search box
        }
    }

    function setSearchBox(query) {
        const box = searchBox();
        if (!box) return;
        box.value = query;
        box.dispatchEvent(new Event('input', { bubbles: true })); // grow + sync
    }

    function runSearch(query) {
        GM_setValue(LAST_SEARCH_KEY, query);
        location.href = 'index.php?page=post&s=list&tags=' + encodeURIComponent(withPins(query));
    }

    function searchWords() {
        return currentSearch().split(/\s+/).filter(Boolean);
    }

    // 'in' = tag is in the search, 'out' = excluded (-tag), '' = not there
    function searchState(tag, words = searchWords()) {
        const lower = words.map(w => w.toLowerCase());
        tag = tag.toLowerCase();
        if (lower.includes(tag)) return 'in';
        if (lower.includes('-' + tag)) return 'out';
        return '';
    }

    function applySearch(next) {
        setSearchBox(next);
        GM_setValue(LAST_SEARCH_KEY, next);
        refreshSearchButtons();
        showToast(next ? `Search: ${next.replace(/_/g, ' ')}` : 'Search is now empty.',
                  'Search now', () => runSearch(next), 8000);
    }

    // +  : add the tag            Shift+click: add it as -tag
    // −  : tag already in search -> take it out of the search
    // ↺  : tag is excluded (-tag) -> remove the exclusion
    function toggleTagInSearch(tag, exclude) {
        const words = searchWords();
        const lowerTag = tag.toLowerCase();
        const state = searchState(tag, words);
        let next;
        if (state) {
            const drop = (state === 'in' ? '' : '-') + lowerTag;
            next = words.filter(w => w.toLowerCase() !== drop);
        } else {
            next = words.concat((exclude ? '-' : '') + tag);
        }
        applySearch(next.join(' '));
    }

    function styleAddButton(btn, state) {
        const t = prettyTag(btn.dataset.tag);
        btn.dataset.state = state;
        btn.textContent = state === 'in' ? '−' : state === 'out' ? '↺' : '+';
        btn.title = state === 'in' ? `"${t}" is in the search - click to take it out`
                  : state === 'out' ? `"${t}" is excluded from the search - click to stop excluding it`
                  : `Add "${t}" to the current search (Shift+click: exclude it)`;
    }

    function refreshSearchButtons() {
        const words = searchWords();
        document.querySelectorAll('.r34-add-btn, .s34-chip-add').forEach(btn =>
            styleAddButton(btn, searchState(btn.dataset.tag, words)));
    }

    // Keep the buttons in step when you type in the search box yourself
    let searchBoxWatched = null;
    function watchSearchBox() {
        if (searchBoxWatched && searchBoxWatched.isConnected) return; // already watching (cheap check)
        const box = searchBox();
        if (!box || box === searchBoxWatched) return;
        searchBoxWatched = box;
        let t = null;
        box.addEventListener('input', () => {
            clearTimeout(t);
            t = setTimeout(refreshSearchButtons, 150);
        });
    }

    function makeAddButton(tag, className, words) {
        const btn = document.createElement(className === 'r34-add-btn' ? 'a' : 'button');
        if (btn.tagName === 'A') btn.href = '#';
        else btn.type = 'button';
        btn.className = className;
        btn.dataset.tag = tag;
        styleAddButton(btn, searchState(tag, words || searchWords()));
        btn.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();
            toggleTagInSearch(tag, e.shiftKey);
        });
        watchSearchBox();
        return btn;
    }

    // Full post page: "+" in every tag row, before the block button
    function addSearchButtons() {
        document.querySelectorAll('#tag-sidebar li[class*="tag-type-"]').forEach(row => {
            if (row.querySelector('.r34-add-btn')) return;
            const tag = getTagFromRow(row);
            if (!tag) return;
            const btn = makeAddButton(tag, 'r34-add-btn');
            const block = row.querySelector('.r34-block-btn');
            if (block) block.before(btn); else row.appendChild(btn);
        });
        // Show the search the post came from, so you see what you add to
        const box = searchBox();
        if (box && !box.value.trim()) {
            const q = currentSearch();
            if (q) setSearchBox(q);
        }
        refreshSearchButtons();
    }

