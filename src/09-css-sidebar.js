    const HIDE_LIST_TAGS_CSS = `
        #tag-sidebar, .s34-tags-heading, .s34-hidden { display: none !important; }

        /* With the tag list gone the sidebar is short (search, AI filter,
           settings), so the whole sidebar sticks to the top left while you
           scroll. Its width is untouched. */
        #post-list > .sidebar,
        .sidebar:has(+ .content .image-list),
        .sidebar:has(~ .content .image-list) {
            position: sticky !important;
            top: 10px !important;
            align-self: flex-start !important;
            z-index: 50;
            /* Taller than the window (a long Following list)? Then it scrolls
               on its own with the mouse wheel - infinite scroll never reaches
               the page's end, so its bottom (Settings, tips) was out of reach
               before Beta 3.6. No scrollbar: it looked out of place */
            max-height: calc(100vh - 20px);
            overflow-y: auto;
            overflow-x: hidden;
            scrollbar-width: none;
        }
        #post-list > .sidebar::-webkit-scrollbar,
        .sidebar:has(+ .content .image-list)::-webkit-scrollbar,
        .sidebar:has(~ .content .image-list)::-webkit-scrollbar { display: none; }
    `;

    // Hide images/banners that sit below the tag list in the sidebar
    // (anything after #tag-sidebar that contains an image/iframe and no form fields)
    function hideSidebarImagesBelowTags() {
        const list = document.querySelector('#tag-sidebar');
        if (!list) return;
        const sidebar = list.closest('.sidebar, #sidebar, aside') || list.parentElement;

        // Only look INSIDE the sidebar - never at its siblings (the thumbnails!)
        let node = list;
        while (node && node !== sidebar) {
            let sib = node.nextElementSibling;
            while (sib) {
                const isMedia = sib.matches('img, picture, video') || sib.querySelector('img, picture, video');
                const hasForm = sib.matches('form, input, textarea, select') ||
                                sib.querySelector('form, input, textarea, select');
                const isContent = sib.matches('.content, .image-list') || sib.querySelector('.image-list');
                const ours = /(^|\s)s34-/.test(sib.className || ''); // Steamy34's own (e.g. the logo line)
                // Never an ad: ad slots (ins / iframe / embed) and pictures that
                // link to another site stay exactly as the site shows them
                const adSlot = sib.matches('ins, iframe, object, embed') || sib.querySelector('ins, iframe, object, embed');
                const linksOut = Array.from(sib.matches('a[href]') ? [sib] : sib.querySelectorAll('a[href]'))
                    .some(a => { try { return new URL(a.href, location.href).hostname.replace(/^www\./, '') !== location.hostname.replace(/^www\./, ''); } catch (e) { return true; } });
                if (isMedia && !hasForm && !isContent && !ours && !adSlot && !linksOut) {
                    sib.classList.add('s34-hidden');
                }
                sib = sib.nextElementSibling;
            }
            node = node.parentElement;
        }
    }

    // ---- Right-hand ad column, when you use an ad blocker ----
    // The site keeps a ~195px column right of the posts for ads.
    // RULE (steamycorner, Beta 3.3.5): only people who use an ad blocker
    // are affected - they've chosen not to see ads. When an ad blocker is
    // detected, the right column is folded away, even if an ad slipped
    // through the blocker (that happened most on the first page load).
    // Without an ad blocker NOTHING is looked at or changed - every ad
    // stays exactly as the site shows it. Since Beta 3.6 the same goes for
    // the ad box above the posts (topAdSlots); every other ad space (the
    // sidebar, post pages) is never touched.

    // A hidden "bait" box with typical ad names: ad blockers hide or remove it
    function adBlockerActive(waitMs = 900) {
        return new Promise(resolve => {
            const bait = document.createElement('div');
            bait.className = 'adsbox ad-banner ad-placement textads banner-ads pub_300x250';
            bait.setAttribute('aria-hidden', 'true');
            // no !important - the blocker's rules have to be able to win
            bait.style.cssText = 'position:absolute;left:-9999px;top:0;width:10px;height:10px;';
            bait.innerHTML = '&nbsp;';
            document.body.appendChild(bait);
            setTimeout(() => {
                const cs = getComputedStyle(bait);
                const blocked = !bait.isConnected || bait.offsetHeight === 0 ||
                    cs.display === 'none' || cs.visibility === 'hidden';
                bait.remove();
                resolve(blocked);
            }, waitMs);
        });
    }

    // An ad blocker was found last time? Then the column steps aside from
    // the very first moment (html class set in 10-colour-modes.js) - and
    // comes back if no ad blocker is found this time.
    const ADBLOCK_SEEN_KEY = 'steamy34_adblock_seen';

    function rightAdColumns() {
        const content = (document.querySelector('.image-list') || {}).parentElement;
        const cols = [];
        if (content) {
            for (let s = content.nextElementSibling; s; s = s.nextElementSibling) {
                if (s.matches('.postListSidebarRight') || s.querySelector('.postListSidebarRight')) cols.push(s);
            }
        }
        return cols;
    }

    // The ad space above the posts ("Page 1"): a box the site keeps ~135px
    // high for an ad (span > div[min-height] > ins). With an ad blocker it
    // stays as an empty gap - folded the same way as the right column
    // (steamycorner's decision, Beta 3.6). Found by what it is, not by
    // name: before the posts, not ours, no text, no pictures, links or
    // fields - only an ad frame (or nothing, when the blocker removed it).
    function topAdSlots() {
        const list = document.querySelector('.image-list');
        const slots = [];
        if (!list || !list.parentElement) return slots;
        for (let s = list.parentElement.firstElementChild; s && s !== list; s = s.nextElementSibling) {
            if (/(^|\s)s34-/.test(s.className || '') || s.matches('script, style, #paginator, .pagination')) continue;
            if (s.textContent.trim()) continue;
            if (s.querySelector('img, a[href], input, textarea, select, button, form, span.thumb, video')) continue;
            const adFrame = s.matches('ins, iframe') || !!s.querySelector('ins, iframe');
            const reserved = s.getBoundingClientRect().height > 40 || !!s.querySelector('[style*="min-height"]');
            if (adFrame || reserved) slots.push(s);
        }
        return slots;
    }

    async function foldEmptyAdColumn() {
        const root = document.documentElement;
        const cols = rightAdColumns().concat(topAdSlots());
        if (!cols.length) { root.classList.remove('s34-adcol-early'); return; }
        // Quick check first; blockers that act a bit later get a second look
        let blocked = await adBlockerActive(150);
        if (!blocked) blocked = await adBlockerActive(1200);
        try { GM_setValue(ADBLOCK_SEEN_KEY, blocked); } catch (e) {}
        if (blocked) {
            cols.forEach(col => col.classList.add('s34-empty-col'));
            console.log('[Steamy34] Ad blocker detected – the ad spaces (right column, above the posts) were folded away.');
        }
        root.classList.remove('s34-adcol-early'); // no ad blocker: everything is back as the site shows it
    }

    // Posts page only: sidebar blends into the page background
    const LIST_SIDEBAR_CSS = `
        html body .sidebar,
        html body .sidebar .tag-search,
        html body .tag-search,
        html body #tag-sidebar {
            background-color: var(--s34-bg) !important;
            box-shadow: none !important;
        }
    `;

    function hideListTagsHeading() {
        const list = document.querySelector('#tag-sidebar');
        if (!list) return;
        // The "Tags" title right above the list
        let prev = list.previousElementSibling;
        while (prev && !prev.textContent.trim()) prev = prev.previousElementSibling;
        if (prev && /^tags$/i.test(prev.textContent.trim()) && !prev.querySelector('input, form')) {
            prev.classList.add('s34-tags-heading');
        }
    }

