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

    // Beta 3.7: a blacklist as long as you like. rule34 keeps it in ONE
    // cookie, and browsers refuse cookies over about 4,000 characters - so
    // the full list lives in Steamy34's storage, the cookie gets as many
    // tags as fit (rule34 hides those itself), and Steamy34 hides the rest
    // (hideExtraBlocklisted - since 3.8 every blacklisted tag - on rule34's own pages, hideBlocklisted on every
    // page Steamy34 loads). readBlocklist = the full list + anything the
    // site put in the cookie on its own (e.g. after saving Options).
    const BL_FULL_KEY = 'steamy34_bl_full';
    const BL_COOKIE_MAX = 4000; // characters, name included (browsers allow 4096)
    let blFullCache = null;
    let blFullAt = 0;

    function readFullBlocklist() {
        if (blFullCache && Date.now() - blFullAt < 2000) return blFullCache;
        let v = null;
        try { v = GM_getValue(BL_FULL_KEY, null); } catch (e) {}
        blFullCache = Array.isArray(v) ? v.filter(t => typeof t === 'string' && t).map(unescapeHtml) : [];
        blFullAt = Date.now();
        return blFullCache;
    }

    function readCookieBlocklist() {
        const m = document.cookie.match(new RegExp('(?:^|;\\s*)' + BL_COOKIE + '=([^;]*)'));
        if (!m) { blCacheRaw = ''; blCacheList = []; return []; }
        if (m[1] === blCacheRaw) return blCacheList.slice();
        blCacheRaw = m[1];
        blCacheList = parseBlocklist(m[1]);
        return blCacheList.slice();
    }

    // (Beta 3.8.1) Blocked stays blocked: the blacklist as a set to compare
    // posts with - lower case, ' instead of &#039;, and rule34's short ratings
    // (rating:e / q / s) as the posts write them (rating:explicit …)
    const RATING_LONG = { e: 'explicit', q: 'questionable', s: 'safe', g: 'general' };
    function blockedTagSet() {
        const set = new Set();
        readBlocklist().forEach(t => {
            let k = unescapeHtml(String(t)).toLowerCase().trim();
            if (!k) return;
            const r = k.match(/^rating:([eqsg])$/);
            if (r) k = 'rating:' + RATING_LONG[r[1]];
            set.add(k);
        });
        return set;
    }
    // The blacklisted tags a post has (tags: a list, or the words of a thumbnail)
    function blockedTagsOf(tags, set) {
        const s = set || blockedTagSet();
        if (!s.size) return [];
        return Array.from(new Set((Array.isArray(tags) ? tags : String(tags).split(/\s+/))
            .map(t => unescapeHtml(String(t)).toLowerCase()).filter(t => t && s.has(t))));
    }

    // (read very often while rendering: the merged list is kept until the
    // cookie or the stored list changes)
    let blMergeKey = null, blMergeFull = null, blMergeList = [];
    function readBlocklist() {
        const cookie = readCookieBlocklist();
        const full = readFullBlocklist();
        if (!full.length) return cookie;
        if (blMergeFull === full && blMergeKey === blCacheRaw) return blMergeList.slice();
        const seen = new Set(full.map(t => t.toLowerCase()));
        blMergeList = full.concat(cookie.filter(t => looksLikeTag(t) && !seen.has(t.toLowerCase())));
        blMergeFull = full;
        blMergeKey = blCacheRaw;
        return blMergeList.slice();
    }

    // The tags that fit into rule34's cookie (the rest: Steamy34 hides them)
    const blCookieValue = list => encodeURIComponent(list.map(escapeHtml).join('%20'));
    function blCookieFit(list) {
        const fit = [];
        let len = BL_COOKIE.length + 1;
        list.forEach(t => {
            const add = encodeURIComponent(escapeHtml(t)).length + (fit.length ? 5 : 0); // ("%2520" between tags)
            if (len + add <= BL_COOKIE_MAX) { fit.push(t); len += add; }
        });
        return fit;
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

    // quiet: tags taken over from elsewhere (the account) - no "blacklisted now" date
    function writeBlocklist(list, quiet) {
        const before = new Set(readBlocklist().map(t => t.toLowerCase()));
        // The full list in Steamy34's storage, what fits into the cookie -
        // in the same format the site itself writes (see readBlocklist)
        const seen = new Set();
        list = list.map(t => unescapeHtml(String(t || ''))).filter(t => t && !seen.has(t.toLowerCase()) && seen.add(t.toLowerCase()));
        try { GM_setValue(BL_FULL_KEY, list); blFullCache = list.slice(); blFullAt = Date.now(); } catch (e) {}
        const maxAge = 60 * 60 * 24 * 365 * 5; // 5 years
        document.cookie = `${BL_COOKIE}=${blCookieValue(blCookieFit(list))}; path=/; max-age=${maxAge}; SameSite=Lax`;
        try {
            const times = getBlTimes();
            const now = Date.now();
            const lower = new Set(list.map(t => t.toLowerCase()));
            if (!quiet) lower.forEach(k => { if (!before.has(k) && !times[k]) times[k] = now; });
            Object.keys(times).forEach(k => { if (!lower.has(k)) delete times[k]; });
            GM_setValue(BL_TIMES_KEY, times);
        } catch (e) {}
        // Keep the sidebar "Blacklist · N tags" button up to date
        const count = document.querySelector('.s34-blbtn-count');
        if (count) count.textContent = list.length === 1 ? '1 tag' : list.length + ' tags';
    }

    // A real tag: no spaces, no leftover %-codes or HTML bits, not absurdly long
    function looksLikeTag(t) {
        return typeof t === 'string' && /^[^\s%<>"]{1,150}$/.test(t);
    }

    // (Beta 3.8.3) rule34 now uses the blacklist cookie on its server, inside
    // every search - a damaged cookie made searches come back empty ("Nobody
    // here but us chickens!"), seen on a phone after reloading during a
    // Cloudflare check. On every page Steamy34 compares the cookie with the
    // list and writes it fresh when it's damaged, missing or out of step.
    let blCookieRepaired = '';
    function repairBlacklistCookie() {
        let stored = null;
        try { stored = GM_getValue(BL_FULL_KEY, null); } catch (e) {}
        if (Array.isArray(stored) && stored.some(t => typeof t === 'string' && /&(#0*39|#x0*27|amp|quot|lt|gt);/i.test(t))) {
            console.log('[Steamy34] Blacklist: tag names with "&#039;" cleaned up.');
            writeBlocklist(stored, true); // (writeBlocklist stores the real names)
        }
        const full = readFullBlocklist();
        if (!full.length) return;
        const m = document.cookie.match(new RegExp('(?:^|;\\s*)' + BL_COOKIE + '=([^;]*)'));
        const raw = m ? m[1] : null;
        const cookieTags = raw === null ? [] : parseBlocklist(raw);
        const damaged = cookieTags.some(t => !looksLikeTag(t));
        const seen = new Set(full.map(t => t.toLowerCase()));
        const merged = full.concat(cookieTags.filter(t => looksLikeTag(t) && !seen.has(t.toLowerCase()) && seen.add(t.toLowerCase())));
        const want = blCookieValue(blCookieFit(merged));
        if (raw === want) return;
        blCookieRepaired = raw === null ? 'missing' : damaged ? 'damaged' : 'out of step';
        console.log('[Steamy34] rule34\'s blacklist cookie was ' + blCookieRepaired + ' – written fresh.');
        writeBlocklist(merged, true);
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
        return tagsFromUrl(location.href) || tagsFromUrl(document.referrer) ||
               (GM_getValue(LAST_SEARCH_KEY, '') || '');
    }

    function rememberSearch() {
        if (isPostView) return;
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

