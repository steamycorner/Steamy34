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
        }
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

    // ---- Right-hand ad column, emptied by an ad blocker ----
    // The site keeps a ~195px column right of the posts for ads. With an ad
    // blocker the ads are gone but the column keeps its width - a blank strip.
    // RULE (user's wish): the ad blocker always acts first - Steamy34 never
    // hides an ad. So the column is only folded away when an ad blocker IS
    // detected AND the column is still empty once the page has fully loaded;
    // if anything shows up in it later, it comes straight back. Without an
    // ad blocker nothing is looked at or changed.

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

    function showsNothing(col) {
        if (col.textContent.trim()) return false;
        return !Array.from(col.querySelectorAll('iframe, img, video, canvas, object, embed, ins')).some(m => {
            const r = m.getBoundingClientRect();
            return r.width >= 20 && r.height >= 20;
        });
    }

    // Only remembered for the record now (Beta 3.1.1 dropped hiding the
    // column early - an ad loading late would have been hidden)
    const ADBLOCK_SEEN_KEY = 'steamy34_adblock_seen';

    // The page and its ads have loaded (or 6 s passed), plus a moment
    function afterPageLoad(extraMs) {
        return new Promise(resolve => {
            const go = () => setTimeout(resolve, extraMs);
            if (document.readyState === 'complete') go();
            else {
                const t = setTimeout(go, 6000);
                window.addEventListener('load', () => { clearTimeout(t); go(); }, { once: true });
            }
        });
    }

    async function foldEmptyAdColumn() {
        const root = document.documentElement;
        root.classList.remove('s34-adcol-early'); // old early hiding: never again
        const content = (document.querySelector('.image-list') || {}).parentElement;
        const cols = [];
        if (content) {
            for (let s = content.nextElementSibling; s; s = s.nextElementSibling) {
                if (s.matches('.postListSidebarRight') || s.querySelector('.postListSidebarRight, ins, iframe')) cols.push(s);
            }
        }
        if (!cols.length) return;
        // Quick check first; blockers that act a bit later get a second look
        let blocked = await adBlockerActive(150);
        if (!blocked) blocked = await adBlockerActive(1200);
        try { GM_setValue(ADBLOCK_SEEN_KEY, blocked); } catch (e) {}
        if (!blocked) return;
        // Give any ad the blocker let through every chance to appear first
        await afterPageLoad(1500);
        cols.filter(showsNothing).forEach(col => {
            col.classList.add('s34-empty-col');
            console.log('[Steamy34] Ad blocker detected and the ad column stayed empty – folded away.');
            // Something appears in it after all? Then it's back at once.
            const obs = new MutationObserver(() => {
                if (col.querySelector('iframe, img, video, canvas, object, embed') || col.textContent.trim() ||
                    Array.from(col.querySelectorAll('ins')).some(i => i.children.length || i.attributes.length > 2)) {
                    col.classList.remove('s34-empty-col');
                    obs.disconnect();
                    console.log('[Steamy34] Something loaded in the ad column – it is shown again.');
                }
            });
            obs.observe(col, { childList: true, subtree: true, attributes: true });
        });
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

