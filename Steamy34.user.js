// ==UserScript==
// @name         Steamy34
// @namespace    https://linktr.ee/steamycorner
// @version      3.6.3-beta
// @license      CC-BY-NC-SA-4.0
// @author       steamycorner
// @homepageURL  https://sleazyfork.org/en/scripts/606445-steamy34
// @supportURL   https://sleazyfork.org/en/scripts/606445-steamy34/feedback
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCIgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZjVmOGYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM4YjNkZmYiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHJ4PSIxNSIgZmlsbD0idXJsKCNnKSIvPjxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIzLjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgb3BhY2l0eT0iLjk1Ij48cGF0aCBkPSJNMjIgMjZjLTMuMi0zIDMuMi01LjYgMC04LjZzMy4yLTUuNiAwLTguNCIvPjxwYXRoIGQ9Ik0zMSAyNmMtMy4yLTMgMy4yLTUuNiAwLTguNnMzLjItNS42IDAtOC40Ii8+PHBhdGggZD0iTTQwIDI2Yy0zLjItMyAzLjItNS42IDAtOC42czMuMi01LjYgMC04LjQiLz48L2c+PHBhdGggZD0iTTE0IDMxaDM0djdhMTMgMTMgMCAwIDEtMTMgMTNoLThhMTMgMTMgMCAwIDEtMTMtMTN6IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTQ3LjUgMzQuNWgyLjVhNS41IDUuNSAwIDAgMSAwIDExaC00IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMy40IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cmVjdCB4PSIxMSIgeT0iNTMiIHdpZHRoPSI0MCIgaGVpZ2h0PSIzLjQiIHJ4PSIxLjciIGZpbGw9IiNmZmYiIG9wYWNpdHk9Ii45Ii8+PC9zdmc+
// @description  All-in-one rule34.xxx upgrade: dark / OLED mode, popup viewer, easy tag search with filters, follow artists in their own grid window with new-post counts, downloads named after the tags (press B), batch downloads, collections, infinite scroll and a phone layout. Designed by steamycorner, written with AI. A free fan-made hobby project, never monetized.
// @match        https://rule34.xxx/*
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_listValues
// @grant        GM_download
// @connect      rule34.xxx
// @connect      *.rule34.xxx
// @run-at       document-start
// @noframes
// ==/UserScript==

/*
 * ===========================================================================
 *  STEAMY34  -  by steamycorner
 * ===========================================================================
 *
 *  A FAN-MADE HOBBY PROJECT
 *  Steamy34 is made for fun by a fan. It is free and will never be
 *  monetized: no ads, no paid features, no data collection. It is not
 *  made by or connected to rule34.xxx.
 *
 *  CONTACT: https://linktr.ee/steamycorner
 *  Questions, bugs or ideas? Get in touch with steamycorner there.
 *
 *  LICENSE: CC BY-NC-SA 4.0 (since Beta 3.4.1)
 *  You may share and change Steamy34 - as long as you
 *    - credit steamycorner (with a link to the original),
 *    - don't use it commercially (no selling, no paywalls, no ads),
 *    - share changed versions under the same license.
 *  https://creativecommons.org/licenses/by-nc-sa/4.0/
 *  (Versions up to Beta 3.4 were released under CC0 1.0.)
 *
 *  WHAT IT DOES (the quick tips - "?" - show the keys & gestures)
 *
 *  Posts page
 *  - Modern thumbnails (original ratios or square tiles), size slider,
 *    VID / GIF labels, artist & character tags on every thumbnail.
 *  - Hover: videos play, images load in full quality, score & size show.
 *  - Infinite scrolling with "Page N" dividers.
 *  - Marks for posts you viewed (eye) or downloaded (arrow); switches to
 *    hide them. ♥ adds a post to your rule34 favourites.
 *  - Batch download: tick posts, download them all, or add them to a
 *    collection. A small panel shows progress with Pause / Cancel.
 *
 *  Popup viewer (every post opens in it)
 *  - Large picture or video, tags with + / ⊘, post info with ▲ vote,
 *    parent / child / pool links, comments below.
 *  - ← / → (or A / D – Settings → Viewing posts) browse, Esc or middle
 *    click closes, click to zoom. F favourite, C collection, T theater
 *    (all changeable); with WASD, W / S scroll.
 *  - Settings have a search field.
 *  - First start: a welcome tour of the best features (again any time:
 *    Settings → Help → Welcome tour).
 *  - Auto next (slideshow), theater mode, video loop & speed,
 *    the next / previous post loaded in advance.
 *
 *  Search
 *  - Tags as bubbles (click to exclude), filter menus for score, size,
 *    sort, type and rating; pin a filter to keep it for every search.
 *  - Favourite tags, recent searches.
 *  - Tag suggestions while typing.
 *
 *  Following (artists)
 *  - The bell next to an artist (popup, post pages) follows them. The
 *    sidebar lists them with a count of their new posts; G (or a click)
 *    opens the Following window: circles, newest posts, NEW since your
 *    last visit.
 *
 *  Downloads
 *  - B (changeable) or the Download button saves the original in
 *    maximum resolution as [character] [series] [artist] #post.ext,
 *    e.g. [amelie lacroix] [overwatch] [someartist] #1234567.jpg (classic
 *    style in the settings). Costume versions and company names are left out.
 *  - Optional own download folder – any folder, e.g. Eagle's watch folder
 *    (Settings → Downloads → Choose folder…; Chrome / Edge / Brave).
 *  - Asks before downloading a post a second time (can be switched off).
 *
 *  Tags & blacklist
 *  - + / − add a tag to the search or take it out, ⊘ blacklists it
 *    (with Undo). The Blacklist window lists, sorts and edits everything.
 *
 *  Your stuff
 *  - Collections (your own folders), Stats (top artists / characters /
 *    series, last 14 days), backup & restore.
 *
 *  Look
 *  - White, Dark and OLED colour modes.
 *
 *  Phones (Firefox for Android + Tampermonkey)
 *  - Picture on top in the popup, swipe to browse, swipe down / Back to
 *    close; one ☰ Menu with Steamy34's tools and the site's pages.
 *
 *  Privacy
 *  - Nothing is collected. Everything stays in your browser's
 *    Tampermonkey storage; Settings -> Privacy & data shows all of it and
 *    deletes it. Steamy34 only talks to rule34.xxx itself.
 *
 *  Changelog: the CHANGELOG list further down ("What's new" in the
 *  script shows it once after notable updates).
 * ===========================================================================
 */

(function () {
    'use strict';

    // =====================================================================
    //  SETTINGS
    //  These are the DEFAULTS. Use the gear button on the site to change
    //  them - your choices are saved by Tampermonkey and survive updates.
    // =====================================================================
    const DEFAULTS = {
        // Download (B)
        fileNameStyle: 'brackets', // 'brackets' -> [character] [series] [artist].jpg
                                   // 'classic'  -> Character_Copyright_Artist_Resolution.jpg
        groupSeparator: '_',     // between copyright / character / artist / filename
        tagJoiner: '+',          // between multiple tags in the same group
        fileNamePostId: true,    // bracket style: add " #1234567" (the post number) - the post can be found again later
        maxTagsPerGroup: 3,      // e.g. 12 characters -> "a+b+c+etc"
        maxFilenameLength: 200,  // keep well below Windows' 255 limit
        wrapInBrackets: false,   // true -> [Copyright]_[Character]_[Artist]_file.jpg
        downloadKey: 'KeyB',     // hotkey (change it in the settings menu)
        browseKeys: 'arrows',    // popup: previous / next post with 'arrows' (← →), 'wasd' (A D) or 'both'
        favKey: 'KeyF',          // popup: favourite the post
        collectKey: 'KeyC',      // popup: add the post to a collection
        theaterKey: 'KeyT',      // popup: theater mode on / off
        followKey: 'KeyL',       // popup: follow / unfollow the post's artist
        showDownloadButton: true,// clickable "Download" button on single post pages
        trackDownloads: true,    // remember downloaded posts and mark them with ✓
        trackViewed: true,       // remember opened posts and mark them with 👁
        confirmRedownload: true, // ask before downloading a post you already downloaded
        batchDelay: 1200,        // ms between files when downloading several posts at once
        hideViewed: false,       // posts page: hide posts you already viewed (sidebar switch)
        hideDownloaded: false,   // posts page: hide posts you already downloaded (sidebar switch)
        hoverInfo: true,         // score and resolution on thumbnails while hovering
        favButtons: true,        // ♥ favourite button on thumbnails and in the popup
        popupPreload: true,      // popup: load the next post in advance (once you stay on a post for a moment)

        // Fit to viewport
        padding: 10,             // px gap kept to the window edges
        allowUpscale: true,      // false -> only shrink, never enlarge
        useOriginalImage: true,  // swap the resized "sample" for the full-res original
        scrollToMedia: true,     // scroll so the media sits at the top of the window

        // Autoplay
        autoplay: true,
        muteIfBlocked: true,     // if autoplay with sound is blocked, retry muted

        // Blocklist buttons
        blocklistButtons: true,
        postTagChips: true,      // single post page: tags shown as chips like on thumbnails
        addToSearchButtons: true, // "+" next to tags on posts adds them to the current search
        reloadAfterBlock: false, // true -> reload the page so the change applies at once


        // Look
        theme: 'dark',           // colour mode: 'white', 'dark' or 'oled' (true black)
        darkMode: true,          // (old setting - "off" becomes the White theme)
        thumbGrid: true,
        thumbLayout: 'justified',// 'justified' = rows of equal height, original ratios, no gaps
                                 // 'grid'      = uniform square tiles
        thumbRowHeight: 220,     // px - target row height for 'justified'
        thumbRowHeightPhone: 320, // the same on phones (Beta 3.6.3: own size - 220 made tiles too small there)
        thumbMinWidthPhone: 170, // square tiles on phones: two to a row
        thumbMinWidth: 200,      // px - minimum tile width for 'grid'
        thumbGap: 6,             // px between tiles
        thumbFit: 'cover',       // 'grid' only: 'cover' crops to squares, 'contain' shows whole image
        thumbBadges: true,       // show a VIDEO / GIF label on animated posts
        thumbExtras: 'hover',    // tags, labels and buttons on thumbnails: 'on' the picture,
                                 // only on 'hover', or in a strip 'below' the picture
        roundCorners: false,     // false -> square corners everywhere (thumbnails, sidebar, chips, windows)
        homePage: true,          // rule34's start page as Steamy34's home (Beta 3.6): search, continue, recent, following
        censorComments: true,    // Censored mode (X) also blurs comment texts and names

        // Following
        followingKey: 'KeyG',    // opens / closes the Following window (Beta 3.6)
        followButtons: true,     // bell (follow) next to artists (popup, post pages)
        checkFollowing: true,    // count new posts for followed artists & searches (in the background)
        tabBadge: true,          // "(12) rule34" in the browser tab while there are new posts

        // Hover preview on the posts page
        hoverPreview: true,      // play videos when hovering their thumbnail
        hoverDelay: 250,         // ms to hover before loading (avoids loading while just moving the mouse past)
        hoverVideoDelay: 500,    // ms for videos - they're bigger, so a quick mouse pass never starts one
        hoverMuted: true,        // browsers block sound until you click the page, so muted is most reliable
        hoverHighRes: true,      // show the full-quality image when hovering an image thumbnail
        thumbTagBar: true,       // artist & character tags at the bottom of each thumbnail
        tagBarLookup: true,      // load post pages in the background to find missing artist/character tags
        tagBarMax: 2,            // max tags shown per type (rest as "+N")

        // Search box
        searchChips: true,       // modern search: tags as chips, filter menus, recent searches
        searchMultiline: true,   // (only when searchChips is off) search box wraps and grows
        searchSuggestions: true, // tag suggestions while typing
        suggestionCount: 10,

        // Infinite scrolling on the posts page
        hideListTags: true,         // hide the tag list under the search on the posts page
        infiniteScroll: true,
        resumeOffer: true,          // back on a search you scrolled deep into: "Continue at page N"
        infiniteScrollMargin: 1200, // px before the bottom at which the next page starts loading
        pageDividers: true,         // show a small "Page N" line between loaded pages
        cleanupFarPages: true,      // unload pages you've scrolled far away from (saves memory)
        cleanupDistance: 4000       // px outside the window before a page is unloaded
    };

    const SETTINGS_KEY = 'steamy34_settings';

    function loadSaved() {
        try {
            const saved = GM_getValue(SETTINGS_KEY, {});
            // Only keep keys that still exist, with the right type
            const clean = {};
            for (const k in saved) {
                if (k in DEFAULTS && typeof saved[k] === typeof DEFAULTS[k]) clean[k] = saved[k];
            }
            return clean;
        } catch (e) {
            return {};
        }
    }

    const CONFIG = Object.assign({}, DEFAULTS, loadSaved());

    // Colour mode. All three are built from the dark design (White and OLED
    // are converted from it - see recolorCss). "darkMode" is only read to
    // move people over from the old on/off switch.
    {
        const saved = loadSaved();
        if (saved.darkMode === false && !saved.theme) CONFIG.theme = 'white'; // old "dark mode off"
        if (!['white', 'dark', 'oled'].includes(CONFIG.theme)) CONFIG.theme = 'dark';
        document.documentElement.classList.add('s34-theme-' + CONFIG.theme);
        // Thumbnail extras ("below" needs the modern layout - without it, they stay on the picture)
        if (!['on', 'hover', 'below'].includes(CONFIG.thumbExtras)) CONFIG.thumbExtras = 'hover';
        if (CONFIG.thumbExtras === 'below' && !CONFIG.thumbGrid) CONFIG.thumbExtras = 'on';
        document.documentElement.classList.add('s34-tx-' + CONFIG.thumbExtras);
        if (!CONFIG.roundCorners) document.documentElement.classList.add('s34-square');
    }

    // Save one or more settings right away (used by the quick controls in
    // the sidebar - the settings menu saves everything at once instead)
    function saveSettingsNow(changes) {
        Object.assign(CONFIG, changes);
        const saved = loadSaved();
        for (const k in changes) {
            if (changes[k] === DEFAULTS[k]) delete saved[k];
            else saved[k] = changes[k];
        }
        GM_setValue(SETTINGS_KEY, saved);
    }


    // What the settings window shows, section by section.
    // Row: [key, label, extra]; extra: options / min / max / unit / text /
    // hotkey, hint (small grey line under the label), adv (under "Show advanced").
    const SETTINGS_UI = [
        { id: 'look', title: 'Look & feel', icon: '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="8.5" cy="10" r="1.3" fill="currentColor"/><circle cx="12" cy="7.5" r="1.3" fill="currentColor"/><circle cx="15.5" cy="10" r="1.3" fill="currentColor"/><path d="M12 21a3 3 0 0 1 0-6h2"/></svg>', rows: [
            ['theme', 'Colour mode', { options: { white: 'White', dark: 'Dark', oled: 'OLED (true black)' } }],
            ['censorComments', 'Censored mode also blurs comments', { hint: 'Censored mode (X, or the switch in the sidebar) blurs every picture and video – with this on, comment texts and names too, so screenshots are safe to share' }],
            ['homePage', 'Steamy34 start page', { hint: 'rule34\'s start page with your search, where you left off, your recent searches and the newest posts from who you follow – off: the site\'s own start page' }],
            ['thumbGrid', 'Modern thumbnail layout', { hint: 'Clean rows of thumbnails without gaps' }],
            ['thumbLayout', 'Thumbnail shape', { options: { justified: 'Original ratios (rows)', grid: 'Square tiles' } }],
            ['thumbBadges', 'VID / GIF labels on thumbnails', { hint: 'Small labels in the corner of animated posts' }],
            ['roundCorners', 'Rounded corners', { hint: 'Off: square corners everywhere – thumbnails, sidebar, tag bubbles, buttons and windows' }],
            ['thumbExtras', 'Tags & buttons on thumbnails', { options: { on: 'On the picture', hover: 'Only on hover', below: 'Below the picture' }, hint: 'Keep the pictures free. "Only on hover" still shows VID / GIF, viewed / downloaded marks and favourited ♥ – and on phones, where you can\'t hover, everything stays visible. "Below" needs the modern thumbnail layout' }],
            ['thumbRowHeight', 'Row height (original ratios)', { min: 80, max: 600, unit: 'px', adv: true, hint: 'Also changed by the Size slider in the sidebar' }],
            ['thumbMinWidth', 'Tile size (square tiles)', { min: 80, max: 600, unit: 'px', adv: true }],
            ['thumbRowHeightPhone', 'Row height on phones', { min: 80, max: 600, unit: 'px', adv: true, hint: 'Phones have their own size – the Size slider in the ☰ Menu changes this one' }],
            ['thumbMinWidthPhone', 'Tile size on phones', { min: 80, max: 600, unit: 'px', adv: true }],
            ['thumbFit', 'Square tiles show', { options: { cover: 'Cropped to fill', contain: 'Whole image' }, adv: true }],
            ['thumbGap', 'Gap between thumbnails', { min: 0, max: 40, unit: 'px', adv: true }]
        ] },
        { id: 'posts', title: 'Posts page', icon: '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>', rows: [
            ['hoverPreview', 'Play videos on hover'],
            ['hoverHighRes', 'Full-quality image on hover'],
            ['hoverInfo', 'Score & resolution on hover'],
            ['thumbTagBar', 'Artist & character tags on thumbnails'],
            ['favButtons', '♥ Favourite buttons', { hint: 'On thumbnails and in the popup – needs a rule34 login' }],
            ['infiniteScroll', 'Infinite scrolling', { hint: 'The next page loads when you reach the bottom' }],
            ['resumeOffer', 'Offer to continue where you left off', { hint: 'Back on a search you had scrolled deep into? A small "Continue at page N" button takes you back there' }],
            ['pageDividers', '"Page N" dividers'],
            ['hideListTags', 'Hide the tag list under the search'],
            ['hoverDelay', 'Hover delay for pictures', { min: 0, max: 2000, unit: 'ms', adv: true }],
            ['hoverVideoDelay', 'Hover delay for videos', { min: 0, max: 3000, unit: 'ms', adv: true, hint: 'Videos are big – a short pause means passing the mouse over them never starts a download' }],
            ['hoverMuted', 'Hover previews muted', { adv: true }],
            ['tagBarLookup', 'Look up missing tags in the background', { adv: true }],
            ['tagBarMax', 'Tags shown per type', { min: 1, max: 6, adv: true }],
            ['infiniteScrollMargin', 'Start loading the next page', { min: 0, max: 5000, unit: 'px early', adv: true }],
            ['cleanupFarPages', 'Unload far-away pages', { adv: true, hint: 'Saves memory on very long scrolls' }],
            ['cleanupDistance', 'Unload distance', { min: 1000, max: 20000, unit: 'px', adv: true }]
        ] },
        { id: 'viewing', title: 'Viewing posts', icon: '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M3 16l5-5 4 4 3-3 6 6" stroke-linecap="round"/></svg>', rows: [
            ['browseKeys', 'Keys for previous / next post', { options: { arrows: 'Arrow keys  ← →', wasd: 'WASD  A D', both: 'Both' }, hint: 'With WASD, W / S also scroll to the comments and back' }],
            ['favKey', 'Favourite key', { hotkey: true, hint: 'In the popup – click the box, then press a key' }],
            ['collectKey', 'Add to collection key', { hotkey: true }],
            ['theaterKey', 'Theater mode key', { hotkey: true }],
            ['followKey', 'Follow key', { hotkey: true, hint: 'Follows (or unfollows) the post\'s artist' }],
            ['popupPreload', 'Load the next post in advance', { hint: 'Once you stay on a post for a moment, the next one is ready when you get there. Off on phones by default (saves mobile data)' }],
            ['autoplay', 'Autoplay videos'],
            ['allowUpscale', 'Enlarge small pictures to fit the screen'],
            ['useOriginalImage', 'Show the full-resolution picture', { hint: 'On single post pages, instead of the smaller sample' }],
            ['muteIfBlocked', 'Play muted if sound is blocked', { adv: true }],
            ['scrollToMedia', 'Scroll to the picture on post pages', { adv: true }],
            ['padding', 'Gap to the window edges', { min: 0, max: 100, unit: 'px', adv: true }]
        ] },
        { id: 'following', title: 'Following', icon: '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8.5a6 6 0 0 0-12 0c0 6.5-3 8.5-3 8.5h18s-3-2-3-8.5"/><path d="M13.7 20.5a2 2 0 0 1-3.4 0"/></svg>', rows: [
            ['followingKey', 'Following window key', { hotkey: true, hint: 'Opens and closes the Following window – your artists\' newest posts in a grid' }],
            ['followButtons', 'Follow buttons (bell) on artists', { hint: 'Next to artists in the popup and on post pages' }],
            ['checkFollowing', 'Count new posts', { hint: 'For your followed artists – checked quietly in the background, at most every 20 minutes' }],
            ['tabBadge', 'New posts in the browser tab', { hint: 'The tab shows "(12) rule34" while there are new posts – handy when rule34 sits in a background tab' }]
        ] },
        { id: 'search', title: 'Search', icon: '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg>', rows: [
            ['searchChips', 'Modern search box', { hint: 'Tag bubbles, filters, favourite tags, and recent searches' }],
            ['searchSuggestions', 'Tag suggestions while typing'],
            ['suggestionCount', 'Number of suggestions', { min: 3, max: 30, adv: true }],
            ['searchMultiline', 'Simple multi-line box (when the modern one is off)', { adv: true }]
        ] },
        { id: 'downloads', title: 'Downloads', icon: '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v11"/><path d="M7.5 10.5L12 15l4.5-4.5"/><path d="M5 20h14"/></svg>', rows: [
            ['downloadKey', 'Download hotkey', { hotkey: true, hint: 'Click the box, then press a key' }],
            ['dlFolder', 'Download folder', { folder: true, hint: 'Save straight into any folder – e.g. Eagle\'s watch folder. The browser asks once per session whether Steamy34 may write there' }],
            ['showDownloadButton', 'Show the Download button'],
            ['trackDownloads', 'Remember downloaded posts', { hint: 'Download mark on thumbnails, green Download button' }],
            ['trackViewed', 'Remember viewed posts', { hint: 'Small eye on thumbnails' }],
            ['confirmRedownload', 'Ask before downloading a post again'],
            ['fileNameStyle', 'File names', { options: { brackets: '[character] [series] [artist]', classic: 'Character_Series_Artist_Resolution' }, hint: 'Readable names with spaces – handy for sorting in picture libraries' }],
            ['fileNamePostId', 'Add the post number to file names', { hint: 'e.g. "[tracer] [overwatch] [someartist] #1234567.jpg" – so you can always find the post again. Bracket style only' }],
            ['batchDelay', 'Pause between batch downloads', { min: 300, max: 10000, unit: 'ms', adv: true }],
            ['maxTagsPerGroup', 'Max tags per group in file names', { min: 1, max: 20, adv: true }],
            ['wrapInBrackets', 'Wrap groups in [brackets]', { adv: true, hint: 'Classic style only' }],
            ['groupSeparator', 'Group separator', { text: true, adv: true, hint: 'Classic style only' }],
            ['tagJoiner', 'Tag joiner', { text: true, adv: true, hint: 'Classic style only' }],
            ['maxFilenameLength', 'Max file name length', { min: 60, max: 250, adv: true }]
        ] },
        { id: 'tags', title: 'Tags & blacklist', icon: '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.4" fill="currentColor"/></svg>', rows: [
            ['blocklistButtons', 'Blacklist buttons (⊘) next to tags'],
            ['addToSearchButtons', '+ / − next to tags', { hint: 'Add a tag to your search or take it out' }],
            ['postTagChips', 'Tags as bubbles on single posts'],
            ['reloadAfterBlock', 'Reload the page after blocking', { adv: true }]
        ] }
    ];

    const params = new URLSearchParams(location.search);
    const isPostView = params.get('page') === 'post' && params.get('s') === 'view';

    // Where people find Steamy34 and talk to steamycorner
    const SLEAZY_URL = 'https://sleazyfork.org/en/scripts/606445-steamy34';
    const DISCORD_URL = 'https://discord.gg/Udg9sNTBHb';
    // Discord's logo (for the invite button in Settings)
    const DISCORD_SVG = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M20.32 4.37a19.8 19.8 0 0 0-4.89-1.52.07.07 0 0 0-.08.04c-.21.38-.44.87-.61 1.25a18.3 18.3 0 0 0-5.49 0 12.6 12.6 0 0 0-.62-1.25.08.08 0 0 0-.08-.04 19.7 19.7 0 0 0-4.88 1.52.07.07 0 0 0-.03.03C.53 9.05-.32 13.58.1 18.06a.08.08 0 0 0 .03.06 19.9 19.9 0 0 0 5.99 3.03.08.08 0 0 0 .09-.03c.46-.63.87-1.3 1.22-1.99a.08.08 0 0 0-.04-.11 13.1 13.1 0 0 1-1.87-.89.08.08 0 0 1 0-.13l.37-.29a.07.07 0 0 1 .08-.01c3.93 1.79 8.18 1.79 12.06 0a.07.07 0 0 1 .08.01l.37.29a.08.08 0 0 1 0 .13c-.6.35-1.22.64-1.87.89a.08.08 0 0 0-.04.11c.36.7.77 1.36 1.22 1.99a.08.08 0 0 0 .09.03 19.8 19.8 0 0 0 6-3.03.08.08 0 0 0 .03-.06c.5-5.18-.84-9.67-3.55-13.66a.06.06 0 0 0-.03-.03zM8.02 15.33c-1.18 0-2.16-1.09-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.33-.96 2.42-2.16 2.42zm7.97 0c-1.18 0-2.15-1.09-2.15-2.42 0-1.33.95-2.42 2.15-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.33-.95 2.42-2.16 2.42z"/></svg>';

    // Phones: no mouse to hover with, and a narrow screen
    const NO_HOVER = (() => { try { return matchMedia('(hover: none)').matches; } catch (e) { return false; } })();
    const PHONE_MQ = '(max-width: 760px), (pointer: coarse) and (max-width: 1000px)';
    const isPhoneLayout = () => { try { return matchMedia(PHONE_MQ).matches; } catch (e) { return false; } };

    // Thumbnail size as CSS variables, so the sidebar slider can change it live.
    // Phones have their own sizes (the slider there changes those)
    const thumbSizeKeys = () => (isPhoneLayout() ? ['thumbRowHeightPhone', 'thumbMinWidthPhone'] : ['thumbRowHeight', 'thumbMinWidth']);
    function applyThumbSize() {
        const [row, tile] = thumbSizeKeys();
        document.documentElement.style.setProperty('--s34-row', CONFIG[row] + 'px');
        document.documentElement.style.setProperty('--s34-tile', CONFIG[tile] + 'px');
    }
    applyThumbSize();
    try { matchMedia(PHONE_MQ).addEventListener('change', applyThumbSize); } catch (e) {}

    // Phones: loading the next / previous post in advance costs mobile data,
    // so it's off there unless you switched it on yourself
    if (isPhoneLayout() && !('popupPreload' in loadSaved())) CONFIG.popupPreload = false;

    function onReady(fn) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', fn);
        } else {
            fn();
        }
    }

    // =====================================================================
    //  STYLES (injected immediately so there's no white flash)
    //  DARK_CSS        the site itself in Steamy34's dark look
    //  GRID_CSS        modern thumbnail layout (only when it's switched on)
    //  CORE_CSS        hover previews, tag bars, messages, popup, badges,
    //                  page dividers, Cloudflare window - always loaded
    //  BUTTON_CSS, POST_TAGS_CSS, AC_CSS   tag buttons, post tags, suggestions
    //  EXTRA_CSS       thumbnail extras (♥, hover info, NEW), sidebar panel
    //  WINDOWS_CSS     quick tips, changelog, blacklist window, privacy
    //  CONTROLS_CSS    spinners, settings search, switches, Cloudflare notice
    //  POPUP_SIDE_CSS  popup: theater mode, ♥ / collection buttons
    //  COLLECTIONS_CSS collections, stats and their sidebar buttons
    //  POPUP_INFO_CSS  popup: auto next, post info, comments, zoom
    //  MISC_CSS        "+N new", focus rings, phone menu button
    //  PHONE_CSS       phone layout
    //  TOUR_CSS        welcome tour
    //  (these nine are joined in this order in injectStyles - order matters)
    //  SEARCH_CSS      the modern search box
    //  SETTINGS_CSS    settings / download buttons, generic windows
    //  White and OLED are made from all of this by recolorCss().
    // =====================================================================

    const DARK_CSS = `
        :root {
            --s34-bg: #121214;
            --s34-panel: #1c1c20;
            --s34-panel-2: #26262c;
            --s34-border: #33333a;
            --s34-fg: #dcdce0;
            --s34-muted: #9a9aa3;
            --s34-link: #8ab4f8;
            --s34-link-hover: #b3cdfb;
            color-scheme: dark;
        }

        html, body {
            background: var(--s34-bg) !important;
            color: var(--s34-fg) !important;
        }

        /* Strip the site's light backgrounds everywhere (not inside the video player) */
        /* :where() keeps these at minimum specificity so the specific rules below win */
        /* Toggle switches (e.g. "Filter AI posts") are a checkbox + a styled
           span whose background IS the switch - keep the site's colours there */
        /* (.tlabel / .tradio: the site's ☰ menu buttons in the phone layout -
           they keep their own look) */
        body *:where(:not(input, textarea, select, button, img, video,
                          .tlabel, .tlabel *,
                          .fluid_video_wrapper, .fluid_video_wrapper *, .s34-badge,
                          .slider, .switch *, .toggle *, .toggle-switch *,
                          input[type="checkbox"] + *, input[type="checkbox"] ~ span)) {
            background-color: transparent !important;
            border-color: var(--s34-border) !important;
        }
        body *:where(:not(a, .tlabel, .tlabel *, .fluid_video_wrapper *, .s34-badge)) {
            color: var(--s34-fg) !important;
        }

        a, a:visited { color: var(--s34-link) !important; }
        a:hover { color: var(--s34-link-hover) !important; }

        /* Header / navigation */
        #header, #navbar, #subnavbar, .sidebar, #tag-sidebar, .tag-search {
            background-color: var(--s34-panel) !important;
        }
        /* Modern pill-style navigation */
        #navbar li, #subnavbar li {
            background: none !important;
            border: 0 !important;
            margin: 0 2px 4px 0 !important;
            padding: 0 !important;
            list-style: none !important;
        }
        #navbar li a, #subnavbar li a {
            display: inline-block;
            background: none !important;
            border: 1px solid transparent !important;
            border-radius: 999px;
            text-decoration: none !important;
            transition: background-color .15s ease, color .15s ease, border-color .15s ease;
        }
        #navbar li a {
            padding: 5px 14px !important;
            font-weight: 600;
            color: var(--s34-fg) !important;
        }
        #subnavbar li a {
            padding: 3px 11px !important;
            font-size: 0.9em;
            color: var(--s34-muted) !important;
        }
        #navbar li a:hover, #subnavbar li a:hover {
            background-color: var(--s34-panel-2) !important;
            border-color: var(--s34-border) !important;
            color: #fff !important;
        }
        /* Current section */
        #navbar li.current-page a, #navbar li.current a, #navbar li[class*="current"] a {
            background-color: #2f5fbf !important;
            border-color: #2f5fbf !important;
            color: #fff !important;
        }
        #navbar li.current-page a:hover, #navbar li[class*="current"] a:hover {
            background-color: #3a6fd4 !important;
        }

        /* Form fields (not the hidden radio buttons behind the site's ☰ menus) */
        input:not(.tradio), textarea, select, button {
            background-color: var(--s34-panel-2) !important;
            color: var(--s34-fg) !important;
            border: 1px solid var(--s34-border) !important;
            border-radius: 4px;
        }
        input[type="submit"]:hover, button:hover { background-color: #33333b !important; }

        /* Tables (comments, wiki, options) */
        th { background-color: var(--s34-panel-2) !important; }
        tr:nth-child(even) td { background-color: rgba(255,255,255,0.02) !important; }

        /* Tag colours, readable on dark */
        #tag-sidebar li.tag-type-copyright a { color: #d68cff !important; }
        #tag-sidebar li.tag-type-character a { color: #7ee07e !important; }
        #tag-sidebar li.tag-type-artist    a { color: #ff8a80 !important; }
        #tag-sidebar li.tag-type-general   a { color: #8ab4f8 !important; }
        #tag-sidebar li.tag-type-metadata  a { color: #ffb86b !important; }
        #tag-sidebar li .tag-count, #tag-sidebar li span { color: var(--s34-muted) !important; }

        ::-webkit-scrollbar { width: 10px; height: 10px; }
        ::-webkit-scrollbar-track { background: var(--s34-bg); }
        ::-webkit-scrollbar-thumb { background: #3a3a42; border-radius: 5px; }
    `;

    const GRID_CSS = `
        /* The content column shrinks to fit its contents by default, which
           squeezes the grid into ~2 columns. Make it take all the space to the
           right of the sidebar instead (the sidebar itself is not touched). */
        #post-list > .content,
        #post-list .content:has(> .image-list),
        .content:has(> .image-list) {
            float: none !important;
            display: flow-root !important;
            width: auto !important;
            max-width: none !important;
            /* #post-list is a flex row: let the content take all leftover space */
            flex: 1 1 0 !important;
            min-width: 0 !important;
        }
        ${CONFIG.thumbLayout === 'justified' ? `
        /* Justified rows: every tile's width is proportional to its aspect
           ratio (--r, set by script), so each row has one height and fills
           the full width - original ratios, no cropping, no gaps. */
        .image-list {
            display: flex !important;
            flex-wrap: wrap !important;
            align-items: flex-start;
        }
        .image-list span.thumb {
            flex-grow: calc(var(--r, 1) * 100) !important;
            /* --s34-row is the row height (the sidebar size slider changes it live) */
            flex-basis: calc(var(--r, 1) * var(--s34-row, ${CONFIG.thumbRowHeight}px)) !important;
            aspect-ratio: var(--r, 1);
            max-height: calc(var(--s34-row, ${CONFIG.thumbRowHeight}px) * 1.8);
        }
        /* Stops the last, half-full row from stretching huge */
        .image-list::after {
            content: '';
            flex-grow: 1000000000;
        }
        ` : `
        .image-list {
            display: grid !important;
            grid-template-columns: repeat(auto-fill, minmax(var(--s34-tile, ${CONFIG.thumbMinWidth}px), 1fr));
        }
        .image-list span.thumb { aspect-ratio: 1 / 1; }
        `}
        .image-list {
            gap: ${CONFIG.thumbGap}px;
            padding: ${CONFIG.thumbGap}px 0;
            width: 100% !important;
            box-sizing: border-box;
            text-align: left !important;
        }
        .image-list > br, .image-list > p:empty { display: none !important; }

        .image-list span.thumb {
            position: relative;
            display: block !important;
            width: auto !important;
            height: auto !important;
            min-width: 0;
            margin: 0 !important;
            padding: 0 !important;
            float: none !important;
            overflow: hidden;
            border-radius: 8px;
            background-color: #1c1c20 !important;
            box-shadow: 0 1px 3px rgba(0,0,0,0.35);
            transition: transform .15s ease, box-shadow .15s ease;
        }
        .image-list span.thumb:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(0,0,0,0.5);
        }
        .image-list span.thumb > a {
            display: block !important;
            width: 100%;
            height: 100%;
        }
        .image-list span.thumb img {
            display: block;
            width: 100% !important;
            height: 100% !important;
            max-width: none !important;
            max-height: none !important;
            object-fit: ${CONFIG.thumbLayout === 'justified' ? 'cover' : CONFIG.thumbFit};
            border: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
        }
        ${CONFIG.thumbExtras === 'below' ? `
        /* Thumbnail extras BELOW the picture: the picture keeps its shape in
           the link, the tile grows by a strip that holds the VIDEO / GIF label,
           the tag chips, ♥ and the viewed / downloaded mark. */
        html.s34-tx-below .image-list span.thumb {
            aspect-ratio: auto !important;
            max-height: none !important;
            padding-bottom: var(--s34-strip) !important;
        }
        html.s34-tx-below .image-list span.thumb > a {
            height: auto !important;
            aspect-ratio: ${CONFIG.thumbLayout === 'justified' ? 'var(--r, 1)' : '1 / 1'};
            ${CONFIG.thumbLayout === 'justified' ? `max-height: calc(var(--s34-row, ${CONFIG.thumbRowHeight}px) * 1.8);` : ''}
            overflow: hidden;
        }
        html.s34-tx-below .image-list span.thumb .s34-hover-video { bottom: var(--s34-strip); height: auto !important; }
        html.s34-tx-below .image-list span.thumb.s34-loading::before { bottom: var(--s34-strip); }
        html.s34-tx-below span.thumb .s34-tagbar {
            top: auto;
            bottom: 0;
            height: var(--s34-strip);
            box-sizing: border-box;
            flex-direction: row;
            align-items: center;
            padding: 0 36px 0 6px;
            background: none !important;
        }
        html.s34-tx-below span.thumb .s34-chiprow { flex: 0 1 auto; }
        html.s34-tx-below span.thumb:has(.s34-dl-mark) .s34-tagbar { padding-right: 64px; }
        /* room for the labels on the left (▶ VID is ~42px, GIF ~33px, NEW ~36px) */
        html.s34-tx-below span.thumb:has(.s34-badge) .s34-tagbar { padding-left: 44px; }
        html.s34-tx-below span.thumb:has(.s34-badge.s34-video) .s34-tagbar { padding-left: 54px; }
        html.s34-tx-below span.thumb:has(.s34-new-badge) .s34-tagbar { padding-left: 48px; }
        html.s34-tx-below span.thumb:has(.s34-new-badge):has(.s34-badge) .s34-tagbar { padding-left: 84px; }
        html.s34-tx-below span.thumb:has(.s34-new-badge):has(.s34-badge.s34-video) .s34-tagbar { padding-left: 94px; }
        html.s34-tx-below span.thumb .s34-badge { top: auto; bottom: calc((var(--s34-strip) - 18px) / 2); }
        html.s34-tx-below span.thumb .s34-new-badge { top: auto; bottom: calc((var(--s34-strip) - 18px) / 2); }
        html.s34-tx-below span.thumb .s34-fav-btn { top: auto; bottom: calc((var(--s34-strip) - 24px) / 2); opacity: .75; }
        html.s34-tx-below span.thumb .s34-dl-mark { top: auto; bottom: calc((var(--s34-strip) - 24px) / 2); }
        html.s34-tx-below { --s34-strip: 30px; }
        ` : ''}
    `;

    // Always loaded (not only with the modern thumbnail layout): hover
    // previews, tag bars, popup, messages, badges, page dividers, Cloudflare
    // window. (Before 15.6 these sat in GRID_CSS, so turning the modern
    // layout off broke the popup.)
    const CORE_CSS = `
        /* Square corners (setting "Rounded corners" off): everything Steamy34
           draws and styles - except loading circles, the round pictures in
           the Following window and the video player */
        html.s34-square body *:not(.s34-spin, .s34-fw-av, .fluid_video_wrapper *),
        html.s34-square body *:not(.s34-spin, .s34-fw-av, .fluid_video_wrapper *)::before,
        html.s34-square body *:not(.s34-spin, .s34-fw-av, .fluid_video_wrapper *)::after { border-radius: 0 !important; }
        /* Download panel (batch downloads / collections): progress, pause, cancel */
        .s34-dlp {
            position: fixed;
            left: 16px;
            bottom: 16px;
            z-index: 2147483600;
            width: 300px;
            max-width: calc(100vw - 32px);
            box-sizing: border-box;
            padding: 12px 14px;
            border-radius: 12px;
            background-color: #1c1c21 !important;
            border: 1px solid #34343c !important;
            box-shadow: 0 10px 30px rgba(0,0,0,0.45);
            color: #e8e8ec !important;
            font: 13px/1.4 system-ui, -apple-system, Segoe UI, sans-serif;
        }
        .s34-dlp-head { display: flex; align-items: baseline; gap: 8px; }
        .s34-dlp-head b { font-size: 13px; }
        .s34-dlp-count { margin-left: auto; font-variant-numeric: tabular-nums; opacity: .8; }
        .s34-dlp-bar { height: 6px; margin: 9px 0 7px; border-radius: 3px; background-color: #2c2c33 !important; overflow: hidden; }
        .s34-dlp-bar i { display: block; height: 100%; width: 0; border-radius: 3px; background: linear-gradient(90deg, #ff5f8f, #8f5bff); transition: width .3s; }
        .s34-dlp.s34-dlp-paused .s34-dlp-bar i { background: #8a8a95; }
        .s34-dlp-text { font-size: 12px; opacity: .7; min-height: 17px; overflow-wrap: anywhere; }
        .s34-dlp-btns { display: flex; gap: 6px; margin-top: 9px; }
        .s34-dlp .s34-dlp-btns button {
            flex: 1;
            height: 28px;
            border-radius: 7px;
            border: 1px solid #3a3a44 !important;
            background-color: #26262c !important;
            color: inherit !important;
            font: 600 12px system-ui, -apple-system, Segoe UI, sans-serif;
            cursor: pointer;
        }
        .s34-dlp .s34-dlp-btns button:hover { background-color: #303038 !important; }
        @media (max-width: 760px) { .s34-dlp { left: 10px; right: 10px; width: auto; max-width: none; bottom: 10px; } }

        /* Tag bars and marks sit on top of the thumbnail */
        .image-list span.thumb { position: relative; }

        .s34-hover-video {
            position: absolute;
            inset: 0;
            width: 100% !important;
            height: 100% !important;
            object-fit: cover;
            z-index: 1;
            pointer-events: none;   /* clicks still open the post */
            background: transparent !important; /* (black made a not-yet-drawn video look like a dark box) */
            opacity: 0;
            transition: opacity .15s ease;
        }
        .s34-hover-video.s34-playing { opacity: 1; }
        .s34-loading::before {
            content: '';
            position: absolute;
            z-index: 3;
            bottom: 0; left: 0;
            height: 3px; width: 100%;
            background: linear-gradient(90deg, transparent, #8ab4f8, transparent) !important;
            animation: s34-load 1s linear infinite;
        }
        @keyframes s34-load { from { transform: translateX(-100%); } to { transform: translateX(100%); } }

        /* Artist / character bar at the bottom of each thumbnail */
        .image-list span.thumb.s34-bl-hidden { display: none !important; }
        .s34-tagbar {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 3;
            display: flex;
            flex-direction: column;
            gap: 3px;
            padding: 16px 5px 5px;
            background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.82)) !important;
            pointer-events: none; /* the image underneath stays clickable */
        }
        .s34-chiprow {
            display: flex;
            gap: 3px;
            overflow: hidden;
            min-width: 0;
        }
        .s34-chip {
            pointer-events: auto;
            display: inline-flex;
            align-items: center;
            min-width: 0;
            max-width: 100%;
            border-radius: 999px;
            background-color: rgba(18,18,22,0.85) !important;
            border: 1px solid rgba(255,255,255,0.14) !important;
            font: 600 10.5px/1.6 system-ui, -apple-system, Segoe UI, sans-serif;
            overflow: hidden;
        }
        .s34-chip .s34-chip-name {
            padding: 0 7px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            text-decoration: none !important;
        }
        .s34-chip-artist    .s34-chip-name { color: #ff8a80 !important; }
        .s34-chip-character .s34-chip-name { color: #7ee07e !important; }
        .s34-chip .s34-chip-name:hover { text-decoration: underline !important; }
        /* Block icon: appears while the thumbnail is hovered and lingers
           ~1.5s after the mouse leaves, so it's easy to reach */
        .s34-chip .s34-chip-block {
            display: inline-block;
            flex: none;
            max-width: 0;
            opacity: 0;
            overflow: hidden;
            margin: 0 !important;
            padding: 0 !important;
            border: 0 !important;
            background: transparent !important;
            color: #ff6b6b !important;
            font-size: 12px;
            line-height: 1;
            cursor: pointer;
            transition: max-width .15s ease 1.5s, opacity .15s ease 1.5s, padding .15s ease 1.5s;
        }
        span.thumb:hover .s34-chip .s34-chip-block {
            max-width: 20px;
            opacity: .6;
            padding: 0 6px 0 0 !important;
            transition-delay: 0s;
        }
        span.thumb .s34-chip:hover .s34-chip-block { opacity: 1; }

        /* "+" (add to search) on thumbnail chips: shows up with the block icon */
        span.thumb .s34-chip .s34-chip-add {
            display: inline-block;
            flex: none;
            max-width: 0;
            opacity: 0;
            overflow: hidden;
            padding: 0 !important;
            font-size: 12px;
            transition: max-width .15s ease 1.5s, opacity .15s ease 1.5s, padding .15s ease 1.5s;
        }
        span.thumb:hover .s34-chip .s34-chip-add {
            max-width: 20px;
            opacity: .7;
            padding: 0 4px 0 0 !important;
            transition-delay: 0s;
        }
        span.thumb .s34-chip .s34-chip-add:hover { opacity: 1; }
        /* Already in the search (− / ↺): always shown */
        span.thumb .s34-chip .s34-chip-add[data-state="in"],
        span.thumb .s34-chip .s34-chip-add[data-state="out"] {
            max-width: 20px;
            opacity: 1;
            padding: 0 4px 0 0 !important;
            transition: none;
        }

        /* Blacklisted tag chip: crossed out, unblock (↺) button always shown */
        .s34-chip.s34-chip-blocked { border-color: rgba(255,80,80,0.6) !important; }
        .s34-chip.s34-chip-blocked .s34-chip-name { text-decoration: line-through !important; opacity: .7; }
        span.thumb .s34-chip.s34-chip-blocked .s34-chip-block {
            max-width: 20px;
            opacity: 1;
            padding: 0 6px 0 0 !important;
            color: #8ab4f8 !important;
            transition: none;
        }

        /* Post blacklisted while on screen: greyed out and labelled, still usable */
        span.thumb.s34-bl-marked img:not(.s34-hover-video) {
            filter: grayscale(1) brightness(.35) blur(2px);
        }
        span.thumb.s34-bl-marked .s34-badge { display: none; }
        .s34-bl-label {
            position: absolute;
            top: 6px;
            left: 6px;
            right: 6px;
            z-index: 4;
            padding: 4px 8px;
            border-radius: 6px;
            background-color: rgba(190,30,30,0.88) !important;
            color: #fff !important;
            font: 700 11px/1.35 system-ui, -apple-system, Segoe UI, sans-serif;
            pointer-events: none;
            overflow-wrap: anywhere;
        }
        .s34-chip .s34-chip-block:hover { color: #ff2d2d !important; }
        .s34-chip-more {
            pointer-events: auto;
            flex: none;
            padding: 0 6px;
            border-radius: 999px;
            background-color: rgba(18,18,22,0.85) !important;
            color: #c8c8d0 !important;
            font: 600 10.5px/1.6 system-ui, sans-serif;
            cursor: default;
        }

        .s34-chip-wait {
            align-self: flex-start;
            opacity: .65;
            font-style: italic;
            animation: s34-pulse 1.2s ease-in-out infinite;
        }
        @keyframes s34-pulse { 50% { opacity: .3; } }

        /* ---- Messages: a stack at the bottom (newest at the bottom, max 3) ---- */
        .s34-toasts {
            position: fixed;
            left: 50%;
            bottom: 24px;
            z-index: 100000;
            transform: translateX(-50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            pointer-events: none;
            width: max-content;
            max-width: calc(100vw - 24px);
        }
        .s34-toast {
            position: relative;
            display: flex;
            align-items: center;
            gap: 14px;
            max-width: 100%;
            box-sizing: border-box;
            padding: 10px 16px;
            border-radius: 10px;
            background-color: #1c1c20 !important;
            border: 1px solid #33333a !important;
            color: #dcdce0 !important;
            font: 13px/1.3 system-ui, -apple-system, Segoe UI, sans-serif;
            box-shadow: 0 8px 24px rgba(0,0,0,0.55);
            transform: translateY(16px);
            opacity: 0;
            pointer-events: none;
            transition: opacity .2s, transform .2s;
        }
        .s34-toast.s34-show { opacity: 1; transform: none; pointer-events: auto; }
        /* long file names wrap instead of running off the edge */
        .s34-toast > span:first-child { min-width: 0; flex: 1 1 auto; overflow-wrap: anywhere; text-align: left; }
        .s34-toast .s34-toast-close,
        .s34-toast .s34-toast-close:hover {
            background: transparent !important;
            border: none !important;
            padding: 0 2px !important;
            color: inherit !important;
            font: inherit;
            font-weight: 400;
            cursor: pointer;
            opacity: .6;
        }
        .s34-toast .s34-toast-close:hover { opacity: 1; }
        @media (max-width: 760px) {
            .s34-toasts { width: calc(100vw - 24px); bottom: 14px; }
            .s34-toast { width: 100%; }
        }

        /* ---- Popup viewer ---- */
        html.s34-pv-open { overflow: hidden !important; }
        /* Keep room for the scrollbar even while it's hidden by the popup,
           so the thumbnail rows don't get wider and shift around */
        html { scrollbar-gutter: stable; }
        .s34-pv-overlay {
            position: fixed;
            inset: 0;
            z-index: 99990;
            display: grid;
            grid-template-columns: 290px 1fr;
            background-color: rgba(8,8,10,0.94) !important;
            font: 13px/1.4 system-ui, -apple-system, Segoe UI, sans-serif;
        }
        .s34-pv-side {
            display: flex;
            flex-direction: column;
            gap: 12px;
            min-height: 0;
            overflow-y: auto;
            padding: 14px;
            background-color: #16161a !important;
            border-right: 1px solid #2a2a31 !important;
        }
        .s34-pv-top { display: flex; align-items: center; gap: 6px; }
        .s34-pv-nav {
            width: 34px;
            height: 30px;
            padding: 0 !important;
            border-radius: 8px;
            border: 1px solid #33333a !important;
            background-color: #24242a !important;
            color: #dcdce0 !important;
            font-size: 20px;
            line-height: 1;
            cursor: pointer;
        }
        .s34-pv-nav:hover { background-color: #2f2f37 !important; }
        .s34-pv-full {
            flex: 1;
            text-align: center;
            font-size: 12px;
            color: #8ab4f8 !important;
            text-decoration: none !important;
        }
        .s34-pv-full:hover { text-decoration: underline !important; }
        .s34-pv-close {
            font-size: 18px;
            padding: 0 6px;
            cursor: pointer;
            color: #dcdce0 !important;
            opacity: .7;
        }
        .s34-pv-close:hover { opacity: 1; }
        .s34-pv-tags h4 {
            margin: 12px 0 6px !important;
            font-size: 11px !important;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #9a9aa3 !important;
        }
        .s34-pv-chips { display: flex; flex-wrap: wrap; gap: 5px; }
        .s34-pv-chips .s34-chip { font-size: 12px; }
        /* No hover needed in the popup: block buttons always visible */
        .s34-pv-chips .s34-chip .s34-chip-block {
            max-width: 20px;
            opacity: .75;
            padding: 0 7px 0 0 !important;
            transition: none;
        }
        .s34-pv-chips .s34-chip .s34-chip-block:hover { opacity: 1; }
        .s34-chip .s34-chip-add {
            all: unset;
            cursor: pointer;
            padding: 0 4px 0 1px;
            font: 700 13px/1 system-ui, sans-serif;
            color: #7ee07e !important;
            opacity: .75;
        }
        .s34-chip .s34-chip-add:hover { opacity: 1; color: #a6ffa6 !important; }
        .s34-chip .s34-chip-add, .s34-chip .s34-chip-block { background: transparent !important; border: none !important; }
        .s34-chip .s34-chip-add[data-state="in"],
        #tag-sidebar li a.r34-add-btn[data-state="in"] { color: #ffb86b !important; opacity: 1; }
        .s34-chip .s34-chip-add[data-state="out"],
        #tag-sidebar li a.r34-add-btn[data-state="out"] { color: #8ab4f8 !important; opacity: 1; }
        .s34-chip-count { font-size: 10.5px; opacity: .55; padding-right: 5px; color: #dcdce0 !important; }
        .s34-chip-copyright .s34-chip-name { color: #d68cff !important; }
        .s34-chip-general   .s34-chip-name { color: #8ab4f8 !important; }
        .s34-chip-metadata  .s34-chip-name { color: #ffb86b !important; }
        .s34-pv-note { margin-top: 8px; font-size: 11px; font-style: italic; opacity: .6; color: #dcdce0 !important; }

        .s34-pv-stage {
            position: relative;
            min-width: 0;
            min-height: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 16px;
            cursor: zoom-out;
        }
        .s34-pv-media {
            width: 100%;
            height: 100%;
            object-fit: contain;
            cursor: default;
            background: transparent !important;
        }
        .s34-pv-placeholder { position: absolute; inset: 16px; width: calc(100% - 32px); height: calc(100% - 32px); filter: blur(6px); opacity: .6; }
        .s34-pv-media.s34-pv-loading { opacity: 0; position: absolute; }

        /* Cloudflare check window - same look as the other Steamy34 windows */
        .s34-panel.s34-cf-panel {
            width: min(860px, calc(100vw - 32px));
            border-radius: 18px;
            overflow: hidden;
            /* our window around the check gets the pink-to-purple glow
               (the check page inside stays exactly as Cloudflare sends it) */
            border: 1.5px solid transparent !important;
            background: linear-gradient(#17161c, #17161c) padding-box,
                        linear-gradient(135deg, rgba(255,95,143,0.9), rgba(139,61,255,0.9)) border-box !important;
            box-shadow: 0 30px 80px rgba(0,0,0,0.7), 0 0 28px rgba(255,95,143,0.28), 0 0 60px rgba(139,61,255,0.22);
            animation: s34-blm-in .16s ease-out;
        }
        .s34-cf-panel .s34-panel-head { padding: 18px 20px 6px; border-bottom: none !important; }
        .s34-cf-panel .s34-panel-head h2 { font-size: 18px !important; font-weight: 800; }
        .s34-cf-panel .s34-close {
            width: 32px; height: 32px; padding: 0; border-radius: 10px; font-size: 14px; line-height: 32px; text-align: center;
            background-color: rgba(255,255,255,0.06) !important; opacity: 1;
        }
        .s34-cf-panel .s34-close:hover { background-color: rgba(255,255,255,0.12) !important; }
        .s34-cf-note { padding: 0 20px 12px; font-size: 13px; opacity: .75; }
        .s34-cf-panel .s34-cf-frame { margin: 0 20px; width: calc(100% - 40px); border-radius: 12px; }
        .s34-cf-panel .s34-panel-foot { padding: 14px 20px 18px; border-top: none !important; gap: 8px; }
        .s34-cf-panel .s34-btn {
            height: 34px; padding: 0 14px; border-radius: 10px; font: 600 12.5px system-ui, -apple-system, Segoe UI, sans-serif;
            background-color: rgba(255,255,255,0.06) !important; border: 1px solid rgba(255,255,255,0.12) !important;
        }
        .s34-cf-panel .s34-btn:hover { border-color: #ff5f8f !important; }
        .s34-cf-panel .s34-btn.s34-primary { background: linear-gradient(135deg, #ff5f8f, #8b3dff) !important; border: none !important; color: #fff !important; }
        .s34-cf-panel .s34-btn.s34-link { background: transparent !important; border-color: transparent !important; margin-right: auto; }
        .s34-batch button svg, .s34-vopts button svg { display: inline-block; vertical-align: -2px; }
        .s34-cf-frame {
            display: block;
            width: 100%;
            /* As tall as the screen allows (title, note and buttons need
               about 200px), so the tick box further down is always in view */
            height: min(820px, calc(100vh - 210px));
            min-height: 300px;
            border: 0 !important;
            border-top: 1px solid #2c2c33 !important;
            background-color: #fff !important;
        }
        .s34-toast button:not(.s34-toast-close) {
            padding: 4px 12px !important;
            border-radius: 6px;
            border: 1px solid #2f5fbf !important;
            background-color: #2f5fbf !important;
            color: #fff !important;
            font-weight: 600;
            cursor: pointer;
        }

        .s34-badge {
            z-index: 2;
            position: absolute;
            top: 6px;
            left: 6px;
            padding: 2px 6px;
            border-radius: 4px;
            font: bold 10px/1.4 sans-serif;
            letter-spacing: .5px;
            color: #fff !important;
            background: rgba(0,0,0,0.7) !important;
            pointer-events: none;
        }
        .s34-badge.s34-video { background: rgba(30,90,220,0.85) !important; }

        #paginator { text-align: center; margin: 16px 0; }

        /* Page divider: a line across with a "PAGE N" pill in the middle */
        .s34-page-divider {
            display: flex;
            align-items: center;
            gap: 14px;
            margin: 28px 0 14px;
        }
        .s34-page-divider::before,
        .s34-page-divider::after {
            content: '';
            flex: 1;
            height: 2px;
            border-radius: 2px;
            background: linear-gradient(90deg, transparent, #2f5fbf) !important;
        }
        .s34-page-divider::after {
            background: linear-gradient(90deg, #2f5fbf, transparent) !important;
        }
        .s34-page-divider span {
            padding: 5px 16px;
            border-radius: 999px;
            border: 1px solid #2f5fbf !important;
            background-color: rgba(47,95,191,0.18) !important;
            color: #cfe0ff !important;
            font: 700 13px/1 system-ui, -apple-system, Segoe UI, sans-serif;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            white-space: nowrap;
        }
        .s34-page-divider.s34-first { margin-top: 6px; }
        .s34-scroll-status {
            text-align: center;
            padding: 20px 0 40px;
            min-height: 1px;
            opacity: .7;
            cursor: default;
        }
    `;

    const BUTTON_CSS = `
        #tag-sidebar li a.r34-block-btn {
            margin-right: 4px;
            text-decoration: none;
            cursor: pointer;
            font-size: 11px;
            color: #888 !important;
        }
        #tag-sidebar li a.r34-block-btn:hover { color: #ff6b6b !important; }
        #tag-sidebar li a.r34-block-btn.blocked { color: #8ab4f8 !important; font-weight: bold; }
        #tag-sidebar li a.r34-add-btn {
            margin: 0 2px 0 4px !important;
            text-decoration: none !important;
            cursor: pointer;
            font-weight: 700;
            font-size: 13px;
            opacity: .75;
            color: #7ee07e !important;
        }
        #tag-sidebar li a.r34-add-btn:hover { opacity: 1; color: #a6ffa6 !important; }
    `;

    // Single post page: tags as chips, like the thumbnail tag bar.
    // Everything is always visible (no hover needed).
    const POST_TAGS_CSS = `
        #tag-sidebar {
            display: flex !important;
            flex-wrap: wrap;
            align-items: center;
            gap: 5px;
            margin: 0 !important;
            padding: 0 !important;
            list-style: none !important;
        }
        #tag-sidebar > li {
            list-style: none !important;
            margin: 0 !important;
            padding: 0 !important;
        }
        /* Group titles (Copyright, Character, Artist, ...) take a full line */
        #tag-sidebar > li:not([class*="tag-type-"]) {
            flex-basis: 100%;
        }
        #tag-sidebar > li:not([class*="tag-type-"]) h6,
        #tag-sidebar > li:not([class*="tag-type-"]) b {
            display: block;
            margin: 10px 0 2px !important;
            font-size: 11px !important;
            text-transform: uppercase;
            letter-spacing: 1px;
            opacity: .7;
        }

        /* The tag chips */
        #tag-sidebar > li[class*="tag-type-"] {
            display: inline-flex !important;
            align-items: center;
            gap: 5px;
            max-width: 100%;
            box-sizing: border-box;
            padding: 2px 8px 2px 10px !important;
            border-radius: 999px;
            background-color: rgba(18,18,22,0.85) !important;
            border: 1px solid rgba(255,255,255,0.14) !important;
            font: 600 12px/1.6 system-ui, -apple-system, Segoe UI, sans-serif;
            overflow-wrap: anywhere;
        }
        #tag-sidebar > li.tag-type-artist    { border-color: rgba(255,138,128,0.45) !important; }
        #tag-sidebar > li.tag-type-character { border-color: rgba(126,224,126,0.45) !important; }
        #tag-sidebar > li.tag-type-copyright { border-color: rgba(214,140,255,0.45) !important; }
        #tag-sidebar > li.tag-type-metadata  { border-color: rgba(255,184,107,0.45) !important; }
        #tag-sidebar > li[class*="tag-type-"] a { text-decoration: none !important; }
        #tag-sidebar > li[class*="tag-type-"] a:hover { text-decoration: underline !important; }

        /* "?" wiki link: small and quiet */
        #tag-sidebar > li[class*="tag-type-"] a[href*="page=wiki"] {
            font-size: 10px;
            opacity: .45;
        }
        /* Post count: small and muted */
        #tag-sidebar > li[class*="tag-type-"] span:not(.s34-chip-x) {
            font-size: 10.5px;
            font-weight: 400;
            opacity: .6;
        }

        /* Block / unblock button: always visible, at the end of the chip */
        #tag-sidebar > li[class*="tag-type-"] a.r34-block-btn {
            margin: 0 0 0 2px !important;
            font-size: 12px;
            opacity: .75;
            color: #ff6b6b !important;
        }
        #tag-sidebar > li[class*="tag-type-"] a.r34-block-btn:hover {
            opacity: 1;
            color: #ff2d2d !important;
            text-decoration: none !important;
        }
        #tag-sidebar > li[class*="tag-type-"] a.r34-block-btn.blocked {
            opacity: 1;
            color: #8ab4f8 !important;
        }

        /* Blacklisted tag: crossed out with a red outline */
        #tag-sidebar > li.s34-li-blocked { border-color: rgba(255,80,80,0.7) !important; }
        #tag-sidebar > li.s34-li-blocked a:not(.r34-block-btn):not([href*="page=wiki"]) {
            text-decoration: line-through !important;
            opacity: .7;
        }
    `;

    const AC_CSS = `
        .s34-ac-wrap { position: relative; width: 100%; }
        /* Safety net: never show the site's own suggestion list next to ours */
        .s34-ac-wrap .awesomplete > ul:not(.s34-ac-list),
        .awesomplete:has(.s34-search) > ul:not(.s34-ac-list) { display: none !important; }
        ul.s34-ac-list {
            display: none;
            position: absolute;
            z-index: 1000;
            top: 100%;
            left: 0;
            width: 100%;
            box-sizing: border-box;
            max-height: 320px;
            overflow-y: auto;
            margin: 2px 0 0 !important;
            padding: 4px 0 !important;
            list-style: none !important;
            background-color: #1c1c20 !important;
            border: 1px solid #33333a !important;
            border-radius: 6px;
            box-shadow: 0 8px 20px rgba(0,0,0,0.45);
        }
        ul.s34-ac-list li {
            padding: 4px 8px !important;
            margin: 0 !important;
            font-size: 12px;
            cursor: pointer;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        ul.s34-ac-list li.s34-ac-active {
            background-color: #2e2e36 !important;
        }
        ul.s34-ac-list li.s34-ac-copyright { color: #d68cff !important; }
        ul.s34-ac-list li.s34-ac-character { color: #7ee07e !important; }
        ul.s34-ac-list li.s34-ac-artist    { color: #ff8a80 !important; }
        ul.s34-ac-list li.s34-ac-metadata,
        ul.s34-ac-list li.s34-ac-meta      { color: #ffb86b !important; }
    `;

    // Extras: favourites, hover info, NEW, sidebar switches, batch bar,
    // video options, popup zoom, backup
    const EXTRA_CSS = `
        /* ♥ on thumbnails: top right, left of the viewed/downloaded mark */
        .s34-fav-btn {
            position: absolute;
            top: 6px;
            right: 6px;
            z-index: 4;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 !important;
            border-radius: 50% !important;
            border: none !important;
            background-color: rgba(20,20,24,0.8) !important;
            box-shadow: 0 1px 4px rgba(0,0,0,0.45);
            color: #fff !important;
            fill: none;
            cursor: pointer;
            opacity: 0;
            transition: opacity .15s, transform .15s;
        }
        span.thumb:has(.s34-dl-mark) .s34-fav-btn { right: 34px; }
        span.thumb:hover .s34-fav-btn { opacity: .9; }
        .s34-fav-btn:hover { opacity: 1 !important; transform: scale(1.12); color: #ff6b7a !important; }
        .s34-fav-btn.s34-faved { opacity: 1; color: #ff6b7a !important; }

        /* Thumbnail extras only while hovering (the picture stays clean).
           visibility too, so hidden chips can't catch taps on phones.
           VID / GIF labels, NEW, viewed / downloaded marks and favourited
           hearts always stay (while hovering, the score pill takes the
           labels' place). */
        html.s34-tx-hover span.thumb :is(.s34-tagbar, .s34-fav-btn:not(.s34-faved)) {
            opacity: 0 !important;
            visibility: hidden;
            transition: opacity .15s, visibility 0s linear .15s;
        }
        html.s34-tx-hover span.thumb:hover :is(.s34-tagbar, .s34-fav-btn:not(.s34-faved)) {
            opacity: 1 !important;
            visibility: visible;
            transition: opacity .15s;
        }
        /* Phones (no hover, or the phone layout): nothing to hover, so the
           tags and ♥ are simply always there */
        @media (hover: none), (max-width: 760px), (pointer: coarse) and (max-width: 1000px) {
            html.s34-tx-hover span.thumb :is(.s34-tagbar, .s34-tagbar:not(.s34-x)) { opacity: 1 !important; visibility: visible; }
            html.s34-tx-hover span.thumb :is(.s34-fav-btn, .s34-fav-btn:not(.s34-faved)) { opacity: .85 !important; visibility: visible; }
        }
        .s34-fav-btn.s34-faved svg, .s34-pv-fav.s34-faved svg { fill: currentColor; }
        .s34-fav-btn svg, .s34-pv-fav svg { display: block; pointer-events: none; }

        /* Score & resolution while hovering (the labels step aside meanwhile) */
        .s34-info {
            position: absolute;
            top: 6px;
            left: 6px;
            z-index: 4;
            padding: 3px 8px;
            border-radius: 6px;
            background-color: rgba(20,20,24,0.85) !important;
            color: #fff !important;
            font: 600 11px/1.3 system-ui, -apple-system, Segoe UI, sans-serif;
            white-space: nowrap;
            pointer-events: none;
            opacity: 0;
            transition: opacity .15s;
        }
        span.thumb:hover .s34-info { opacity: 1; }
        /* The pill takes the labels' place while hovering, so nothing
           overlaps (a hovered video plays anyway). In "Below" the labels sit
           in the strip, out of the pill's way, and stay. */
        html:not(.s34-tx-below) body span.thumb:hover:has(.s34-info) .s34-badge,
        html body span.thumb:hover:has(.s34-info) .s34-new-badge { opacity: 0 !important; }
        .s34-info.s34-info-loading::after { content: '  ·  …'; opacity: .6; }

        /* NEW since the last visit of a saved search */
        .s34-new-badge {
            position: absolute;
            top: 6px;
            left: 6px;
            z-index: 3;
            padding: 2px 6px;
            border-radius: 4px;
            background-color: #e0457b !important;
            color: #fff !important;
            font: bold 10px/1.4 sans-serif;
            letter-spacing: .5px;
            pointer-events: none;
        }
        span.thumb:has(.s34-new-badge) .s34-badge { left: 46px; }

        /* Hide viewed / downloaded (not the ones you opened just now) */
        html.s34-hide-viewed .image-list span.thumb.s34-was-viewed:not(.s34-touched-now),
        html.s34-hide-downloaded .image-list span.thumb.s34-was-downloaded:not(.s34-touched-now) {
            display: none !important;
        }

        /* Sidebar quick controls */
        .s34-quick {
            display: flex;
            flex-direction: column;
            gap: 7px;
            margin: 12px 0;
            padding: 10px;
            border-radius: 10px;
            box-sizing: border-box;
            width: 100%;
            font: 12px/1.3 system-ui, -apple-system, Segoe UI, sans-serif;
            background-color: #18181c !important;
            border: 1px solid #2e2e36 !important;
        }
        .s34-q-switch {
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            user-select: none;
        }
        .s34-q-switch input { display: none; }
        /* The site's own AI switch: replaced by the matching one in the panel */
        .s34-ai-original, .s34-site-hidden { display: none !important; }
        .s34-q-track {
            position: relative;
            flex: none;
            width: 30px;
            height: 16px;
            border-radius: 999px;
            background-color: #3a3a44 !important;
            transition: background-color .15s;
        }
        .s34-q-track::after {
            content: '';
            position: absolute;
            top: 2px;
            left: 2px;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: #fff;
            transition: transform .15s;
        }
        .s34-q-switch input:checked + .s34-q-track { background-color: #2c5fcc !important; }
        .s34-q-switch input:checked + .s34-q-track::after { transform: translateX(14px); }
        .s34-q-theme {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            padding: 3px;
            border-radius: 8px;
            background-color: rgba(0,0,0,0.3) !important;
            border: 1px solid #2e2e36 !important;
        }
        .s34-quick .s34-q-theme button {
            height: 24px;
            padding: 0 !important;
            border-radius: 6px;
            border: none !important;
            background: transparent !important;
            color: #9a9aa3 !important;
            font: 600 11.5px system-ui, -apple-system, Segoe UI, sans-serif;
            cursor: pointer;
        }
        .s34-quick .s34-q-theme button:hover { color: #e8e8ee !important; }
        .s34-quick .s34-q-theme button.s34-on { background-color: #2c5fcc !important; color: #fff !important; }
        .s34-q-size { display: flex; align-items: center; gap: 8px; }
        .s34-q-size span { opacity: .7; }
        .s34-quick .s34-q-size input[type="range"] {
            flex: 1;
            min-width: 0;
            padding: 0 !important;
            border: none !important;
            background: transparent !important;
            accent-color: #2c5fcc;
            cursor: pointer;
        }
        .s34-quick .s34-q-select {
            display: block;
            width: 100%;
            height: 30px;
            box-sizing: border-box;
            margin: 2px 0 0 !important;
            padding: 0 10px !important;
            border-radius: 7px;
            cursor: pointer;
            font: 600 12.5px/28px system-ui, -apple-system, Segoe UI, sans-serif;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            background-color: #222228 !important;
            border: 1px solid #3a3a44 !important;
        }
        .s34-quick .s34-q-select:hover,
        .s34-quick .s34-q-select.s34-on { border-color: #3a6fd4 !important; }

        /* Select mode */
        html.s34-selecting .image-list span.thumb { cursor: pointer; }
        html.s34-selecting .image-list span.thumb::after {
            content: '';
            position: absolute;
            top: 8px;
            left: 8px;
            z-index: 6;
            width: 18px;
            height: 18px;
            border-radius: 5px;
            border: 2px solid #fff;
            background-color: rgba(0,0,0,0.45);
            box-shadow: 0 1px 4px rgba(0,0,0,0.6);
            pointer-events: none;
        }
        html.s34-selecting .image-list span.thumb.s34-selected { outline: 3px solid #2c5fcc; outline-offset: -3px; }
        html.s34-selecting .image-list span.thumb.s34-selected::after {
            content: '✓';
            color: #fff;
            font: 700 13px/18px system-ui, sans-serif;
            text-align: center;
            background-color: #2c5fcc;
            border-color: #2c5fcc;
        }
        .s34-batch {
            position: fixed;
            left: 50%;
            bottom: 22px;
            transform: translateX(-50%);
            z-index: 99995;
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 10px 8px 16px;
            border-radius: 12px;
            background-color: #1c1c22 !important;
            border: 1px solid #3a3a44 !important;
            color: #e8e8ec !important;
            box-shadow: 0 10px 30px rgba(0,0,0,0.6);
            font: 13px/1.3 system-ui, -apple-system, Segoe UI, sans-serif;
        }
        .s34-batch-status { margin-right: 6px; white-space: nowrap; }
        .s34-batch button {
            height: 30px;
            padding: 0 12px !important;
            border-radius: 8px;
            cursor: pointer;
            font-size: 12.5px;
            background-color: #26262d !important;
            border: 1px solid #3a3a44 !important;
            color: #e8e8ec !important;
        }
        .s34-batch button:hover { border-color: #3a6fd4 !important; }
        .s34-batch button.s34-batch-go { background-color: #2c5fcc !important; border-color: #2c5fcc !important; font-weight: 600; }
        .s34-batch button:disabled { opacity: .45; cursor: default; }

        /* Video options (popup and single post) */
        .s34-vopts { display: flex; gap: 6px; align-items: center; }
        .s34-vopts[hidden], .s34-pv-vopts[hidden] { display: none !important; }
        .s34-vopts button, .s34-vopts select {
            height: 28px;
            border-radius: 7px;
            cursor: pointer;
            font-size: 12px;
            background-color: #222228 !important;
            border: 1px solid #3a3a44 !important;
            color: #e8e8ec !important;
        }
        .s34-vopts button { flex: 1; padding: 0 8px !important; }
        .s34-vopts button.s34-on { border-color: #3a6fd4 !important; }
        .s34-vopt-speed { display: flex; align-items: center; gap: 5px; font-size: 12px; white-space: nowrap; }
        .s34-vopt-speed select { padding: 0 4px !important; }

        /* Popup: favourite button */
        .s34-pv-fav {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 7px;
            height: 34px;
            border-radius: 8px;
            cursor: pointer;
            font: 600 13px system-ui, -apple-system, Segoe UI, sans-serif;
            background-color: #24242a !important;
            border: 1px solid #3a3a44 !important;
            color: #e8e8ec !important;
            fill: none;
        }
        .s34-pv-fav:hover { border-color: #ff5c8a !important; }
        .s34-pv-fav.s34-faved { color: #ff6b7a !important; border-color: rgba(255,107,122,0.6) !important; }

    `;

    const WINDOWS_CSS = `
        /* Quick tips window */
        .s34-tips {
            width: min(600px, calc(100vw - 24px));
            max-height: min(88vh, 820px);
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
            border-radius: 18px;
            overflow: hidden;
            background: linear-gradient(180deg, #1f1d26 0%, #17161c 100%) !important;
            border: 1px solid rgba(255,255,255,0.08) !important;
            box-shadow: 0 30px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05);
            color: #e8e8ee !important;
            font: 13px/1.4 system-ui, -apple-system, Segoe UI, sans-serif;
            animation: s34-blm-in .16s ease-out;
        }
        .s34-tips-head { display: flex; align-items: center; gap: 12px; padding: 18px 20px 12px; }
        .s34-tips-head img { width: 40px; height: 40px; border-radius: 11px; flex: none; }
        .s34-tips-head > div { flex: 1; min-width: 0; }
        .s34-tips-title { font-size: 18px; font-weight: 800; }
        .s34-tips-sub { font-size: 12px; opacity: .6; }
        .s34-tips .s34-tips-close {
            width: 32px; height: 32px; padding: 0 !important;
            border-radius: 10px; border: none !important;
            background-color: rgba(255,255,255,0.06) !important;
            color: #e8e8ee !important; cursor: pointer; font-size: 14px;
        }
        .s34-tips .s34-tips-close:hover { background-color: rgba(255,255,255,0.12) !important; }
        /* Computer / Phone switch */
        .s34-tips-modes {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4px;
            margin: 0 20px 14px;
            padding: 4px;
            border-radius: 12px;
            background-color: rgba(0,0,0,0.35) !important;
            border: 1px solid rgba(255,255,255,0.08) !important;
        }
        .s34-tips .s34-tips-modes button {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 7px;
            height: 34px;
            padding: 0 !important;
            border-radius: 9px;
            border: none !important;
            background: transparent !important;
            color: #a9a9b3 !important;
            font: 700 13px system-ui, -apple-system, Segoe UI, sans-serif;
            cursor: pointer;
        }
        .s34-tips .s34-tips-modes button svg { display: block; }
        .s34-tips .s34-tips-modes button:hover { color: #fff !important; }
        .s34-tips .s34-tips-modes button.s34-on {
            background: linear-gradient(135deg, rgba(255,95,143,0.28), rgba(139,61,255,0.28)) !important;
            color: #fff !important;
            box-shadow: inset 0 0 0 1px rgba(255,143,176,0.45);
        }
        /* Groups as cards, one row per key / gesture */
        .s34-tips-body { overflow-y: auto; padding: 0 20px 8px; }
        .s34-tips-group { margin-bottom: 16px; }
        .s34-tips-label {
            display: flex;
            align-items: center;
            gap: 7px;
            margin: 2px 2px 8px;
            font-size: 11.5px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1.1px;
            color: #ff8fa3 !important;
        }
        .s34-tips-label svg { display: block; width: 15px; height: 15px; }
        .s34-tips-card {
            border-radius: 14px;
            overflow: hidden;
            background-color: rgba(255,255,255,0.035) !important;
            border: 1px solid rgba(255,255,255,0.07) !important;
        }
        .s34-tips-row {
            display: grid;
            grid-template-columns: minmax(150px, 42%) 1fr;
            gap: 14px;
            align-items: center;
            padding: 11px 14px;
            border-top: 1px solid rgba(255,255,255,0.06) !important;
        }
        .s34-tips-row:first-child { border-top: none !important; }
        .s34-tips-keys { font-size: 12.5px; line-height: 1.9; color: #b8b8c2 !important; }
        .s34-tips-what { font-size: 13.5px; line-height: 1.5; color: #ececf1 !important; }
        @media (max-width: 520px) {
            .s34-tips-row { grid-template-columns: 1fr; gap: 4px; }
            .s34-tips-head, .s34-tips-body, .s34-tips-foot { padding-left: 14px; padding-right: 14px; }
            .s34-tips-modes { margin: 0 14px 12px; }
        }
        .s34-tips kbd {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            min-width: 18px;
            justify-content: center;
            padding: 3px 8px;
            border-radius: 6px;
            font: 700 12px/1.3 system-ui, -apple-system, Segoe UI, sans-serif;
            color: #fff !important;
            background-color: #2b2933 !important;
            border: 1px solid rgba(255,255,255,0.16) !important;
            box-shadow: 0 2px 0 rgba(0,0,0,0.5);
        }
        .s34-tips kbd svg { display: block; }
        .s34-tips-new {
            display: inline-block;
            margin-right: 6px;
            padding: 0 5px;
            border-radius: 4px;
            vertical-align: 1px;
            font: 800 9.5px/15px system-ui, -apple-system, Segoe UI, sans-serif;
            letter-spacing: .5px;
            color: #fff !important;
            background: linear-gradient(135deg, #ff5f8f, #8b3dff) !important;
        }
        /* Example tag bubble (looks like the ones in the search box) */
        .s34-tips-pill {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            margin: 1px 0;
            padding: 0 6px 0 8px;
            border-radius: 999px;
            font: 600 11.5px/18px system-ui, -apple-system, Segoe UI, sans-serif;
            white-space: nowrap;
            color: #7ee07e !important;
            background-color: rgba(255,255,255,0.06) !important;
            border: 1px solid rgba(126,224,126,0.5) !important;
        }
        .s34-tips-pill i { font-style: normal; opacity: .55; }
        .s34-tips-pill.s34-tips-pill-ex {
            text-decoration: line-through;
            border: 1px dashed rgba(255,80,80,0.75) !important;
            background-color: rgba(255,60,60,0.10) !important;
        }
        .s34-tips-foot {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 20px 16px;
            border-top: 1px solid rgba(255,255,255,0.07) !important;
            font-size: 11.5px;
        }
        .s34-tips-foot > span { flex: 1; opacity: .7; line-height: 1.5; }
        .s34-tips-hobby { display: block; margin-top: 3px; font-size: 11px; color: #ff9fbf !important; }
        .s34-tips-foot .s34-qmark { opacity: 1; flex: none; }
        .s34-tips .s34-tips-ok {
            height: 34px;
            padding: 0 22px !important;
            border-radius: 10px;
            border: none !important;
            background: linear-gradient(135deg, #ff5f8f, #8b3dff) !important;
            color: #fff !important;
            font-weight: 700;
            cursor: pointer;
        }
        .s34-tips .s34-tips-ok:hover { filter: brightness(1.12); }
        /* Our windows never inherit the page's centred text */
        .s34-tips, .s34-blm, .s34-panel, .s34-pv-side { text-align: left !important; }

        /* Round "?" badge: opens the quick tips */
        .s34-qmark {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 17px;
            height: 17px;
            box-sizing: border-box;
            border-radius: 50%;
            border: 1.5px solid currentColor !important;
            font: 800 11px/1 system-ui, -apple-system, Segoe UI, sans-serif;
            vertical-align: -3px;
            margin: 0 2px;
        }
        .s34-pv-help {
            width: 22px;
            height: 22px;
            font-size: 13px;
            cursor: pointer;
            color: #dcdce0 !important;
            opacity: .65;
        }
        .s34-pv-help:hover { opacity: 1; }
        .s34-panel-foot { flex-wrap: wrap; row-gap: 8px; }
        .s34-panel-foot .s34-btn { white-space: nowrap; }
        /* "? Shortcuts & tips" under the sidebar settings button */
        .s34-tipslink {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap; /* the real site's sidebar is only 180px: two lines then */
            gap: 0 4px;
            width: 100%;
            box-sizing: border-box;
            margin: -6px 0 14px !important;
        }
        .s34-tools .s34-tipslink { margin: -2px 0 0 !important; }
        .s34-tipslink button {
            display: flex;
            align-items: center;
            gap: 5px;
            padding: 5px 6px !important;
            border: none !important;
            background: transparent !important;
            color: #b8b8c2 !important;
            font: 600 11.5px system-ui, -apple-system, Segoe UI, sans-serif;
            white-space: nowrap;
            cursor: pointer;
            opacity: .75;
        }
        .s34-tipslink button svg { display: block; width: 13px; height: 13px; color: #ffb347; }
        .s34-tipslink button:hover { opacity: 1; color: #fff !important; }

        /* Changelog window */
        .s34-cl-list { display: flex; flex-direction: column; gap: 10px; }
        .s34-cl-list[hidden] { display: none; }
        .s34-win .s34-cl-more { align-self: flex-start; }
        .s34-cl-entry {
            padding: 10px 14px;
            border-radius: 12px;
            background-color: rgba(255,255,255,0.03) !important;
            border: 1px solid rgba(255,255,255,0.06) !important;
        }
        .s34-cl-entry.s34-cl-new {
            background-color: rgba(255,179,71,0.07) !important;
            border-color: rgba(255,179,71,0.4) !important;
        }
        .s34-cl-head { display: flex; align-items: baseline; gap: 10px; margin-bottom: 4px; }
        .s34-cl-head b { font-size: 14px; }
        .s34-cl-head span { font-size: 11.5px; opacity: .5; }
        .s34-cl-head em {
            margin-left: auto;
            padding: 0 6px;
            border-radius: 4px;
            font: 800 9.5px/16px system-ui, -apple-system, Segoe UI, sans-serif;
            font-style: normal;
            letter-spacing: .5px;
            color: #fff !important;
            background: linear-gradient(135deg, #ff5f8f, #8b3dff) !important;
        }
        .s34-cl-entry ul { margin: 0 !important; padding: 0 0 0 18px !important; }
        .s34-cl-entry li { margin: 3px 0; font-size: 12.5px; line-height: 1.45; color: #d4d4dc !important; list-style: disc !important; }
        .s34-cl-foot { display: flex; justify-content: space-between; align-items: center; gap: 10px; padding-top: 4px; }
        .s34-win .s34-cl-tips {
            display: flex; align-items: center; gap: 6px;
            height: 34px; padding: 0 12px !important; border-radius: 10px; cursor: pointer;
            background-color: rgba(255,255,255,0.06) !important; border: 1px solid rgba(255,255,255,0.12) !important;
            color: #e8e8ee !important; font: 600 12.5px system-ui, -apple-system, Segoe UI, sans-serif;
        }
        .s34-win .s34-cl-ok {
            height: 34px; padding: 0 22px !important; border-radius: 10px; border: none !important; cursor: pointer;
            background: linear-gradient(135deg, #ff5f8f, #8b3dff) !important; color: #fff !important; font-weight: 700;
        }

        /* Sidebar "Blacklist" button: slim, like the Settings button
           (line icon + name, the number of tags small and quiet) */
        .s34-blbtn {
            box-sizing: border-box;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 7px;
            margin: 14px 0 -6px;
            padding: 7px 10px;
            border-radius: 8px;
            border: 1px solid #33333a !important;
            background-color: #1c1c20 !important;
            color: #dcdce0 !important;
            cursor: pointer;
            user-select: none;
            opacity: .85;
            transition: opacity .15s, background-color .15s;
        }
        .s34-tools .s34-blbtn { margin: 0; }
        .s34-blbtn:hover { opacity: 1; background-color: #24242a !important; }
        .s34-blbtn-icon { flex: none; display: flex; color: inherit !important; }
        .s34-blbtn-icon svg { display: block; width: 16px; height: 16px; color: inherit !important; }
        .s34-blbtn-icon svg * { color: inherit !important; stroke-width: 2; }
        .s34-blbtn-text { display: flex; align-items: baseline; gap: 6px; min-width: 0; white-space: nowrap; }
        .s34-blbtn-text b { font-size: 13px; font-weight: 600; color: #dcdce0 !important; }
        .s34-blbtn-count { font-size: 11px; opacity: .55; color: #dcdce0 !important; }

        /* Blacklist window */
        .s34-blm {
            width: min(560px, calc(100vw - 32px));
            max-height: min(84vh, 760px);
            display: flex;
            flex-direction: column;
            gap: 14px;
            box-sizing: border-box;
            padding: 20px;
            border-radius: 18px;
            background: linear-gradient(180deg, #1f1d26 0%, #17161c 100%) !important;
            border: 1px solid rgba(255,255,255,0.08) !important;
            box-shadow: 0 30px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05);
            color: #e8e8ee !important;
            font: 13px/1.4 system-ui, -apple-system, Segoe UI, sans-serif;
            animation: s34-blm-in .16s ease-out;
        }
        @keyframes s34-blm-in { from { transform: translateY(8px) scale(.98); opacity: 0; } to { transform: none; opacity: 1; } }
        .s34-blm-head { display: flex; align-items: center; gap: 12px; }
        .s34-blm-icon {
            flex: none;
            width: 42px;
            height: 42px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #ff4d6d, #b5179e) !important;
            color: #fff !important;
            box-shadow: 0 6px 18px rgba(255,77,109,0.35);
        }
        .s34-blm-icon svg { width: 22px; height: 22px; }
        .s34-blm-heading { flex: 1; min-width: 0; }
        .s34-blm-title { font-size: 18px; font-weight: 800; letter-spacing: .2px; }
        .s34-blm-sub { font-size: 12px; opacity: .6; }
        .s34-blm .s34-blm-close {
            width: 32px;
            height: 32px;
            padding: 0 !important;
            border-radius: 10px;
            border: none !important;
            background-color: rgba(255,255,255,0.06) !important;
            color: #e8e8ee !important;
            cursor: pointer;
            font-size: 14px;
        }
        .s34-blm .s34-blm-close:hover { background-color: rgba(255,255,255,0.12) !important; }

        .s34-blm-add { display: flex; gap: 8px; }
        .s34-blm-add .s34-ac-wrap { flex: 1; }
        .s34-blm .s34-blm-input, .s34-blm .s34-blm-filter {
            width: 100%;
            height: 36px;
            box-sizing: border-box;
            padding: 0 12px !important;
            border-radius: 10px;
            font-size: 13px;
            background-color: rgba(0,0,0,0.35) !important;
            border: 1px solid rgba(255,255,255,0.10) !important;
            color: #e8e8ee !important;
            outline: none;
        }
        .s34-blm .s34-blm-input:focus, .s34-blm .s34-blm-filter:focus { border-color: #ff4d6d !important; }
        .s34-blm .s34-blm-addbtn {
            flex: none;
            height: 36px;
            padding: 0 18px !important;
            border-radius: 10px;
            border: none !important;
            background: linear-gradient(135deg, #ff4d6d, #b5179e) !important;
            color: #fff !important;
            font-weight: 700;
            cursor: pointer;
        }
        .s34-blm .s34-blm-addbtn:hover { filter: brightness(1.12); }

        .s34-blm-recent-box[hidden] { display: none; }
        .s34-blm-label, .s34-blm-group {
            margin-bottom: 7px;
            font-size: 10.5px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            opacity: .55;
        }
        .s34-blm-recent { display: flex; flex-wrap: wrap; gap: 8px; }
        .s34-blm-recent-item { display: flex; flex-direction: column; align-items: flex-start; gap: 2px; }
        .s34-blm-ago { font-size: 10px; opacity: .5; padding-left: 8px; }

        .s34-blm-chip {
            display: inline-flex;
            align-items: center;
            max-width: 100%;
            padding: 2px 10px;
            border-radius: 999px;
            font-weight: 600;
            font-size: 12px;
            background-color: rgba(255,255,255,0.05) !important;
            border: 1px solid rgba(255,255,255,0.14) !important;
            color: #c9c9d1 !important;
            overflow-wrap: anywhere;
        }
        .s34-blm-artist    { color: #ff8a80 !important; border-color: rgba(255,138,128,0.45) !important; }
        .s34-blm-character { color: #7ee07e !important; border-color: rgba(126,224,126,0.45) !important; }
        .s34-blm-copyright { color: #d68cff !important; border-color: rgba(214,140,255,0.45) !important; }
        .s34-blm-general   { color: #8ab4f8 !important; border-color: rgba(138,180,248,0.45) !important; }
        .s34-blm-metadata  { color: #ffb86b !important; border-color: rgba(255,184,107,0.45) !important; }
        .s34-blm .s34-blm-x {
            margin: 0 -4px 0 6px;
            padding: 0 !important;
            border: none !important;
            background: transparent !important;
            color: inherit !important;
            opacity: .55;
            cursor: pointer;
            font-size: 14px;
            line-height: 1;
        }
        .s34-blm .s34-blm-x:hover { opacity: 1; color: #ff6b6b !important; }

        .s34-blm-tools { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
        .s34-blm-tools .s34-blm-filter { flex: 1 1 140px; width: auto; }
        .s34-blm-sort {
            display: flex;
            padding: 3px;
            border-radius: 10px;
            background-color: rgba(0,0,0,0.35) !important;
            border: 1px solid rgba(255,255,255,0.08) !important;
        }
        .s34-blm .s34-blm-sort button {
            height: 28px;
            padding: 0 10px !important;
            border-radius: 8px;
            border: none !important;
            background: transparent !important;
            color: #b8b8c2 !important;
            font-size: 12px;
            font-weight: 600;
            cursor: pointer;
            white-space: nowrap;
        }
        .s34-blm .s34-blm-sort button:hover { color: #fff !important; }
        .s34-blm .s34-blm-sort button.s34-on {
            background-color: rgba(255,77,109,0.18) !important;
            color: #ff8fa3 !important;
            box-shadow: inset 0 0 0 1px rgba(255,77,109,0.45);
        }

        .s34-blm-list {
            flex: 1;
            min-height: 120px;
            overflow-y: auto;
            margin: 0 -6px;
            padding: 0 6px;
        }
        .s34-blm-chips { display: flex; flex-wrap: wrap; gap: 6px; padding: 2px 0 4px; }
        .s34-blm-item { padding: 3px 10px 3px 11px; cursor: default; transition: background-color .12s, border-color .12s; }
        .s34-blm-item:hover { background-color: rgba(255,255,255,0.10) !important; }
        .s34-blm-name { max-width: 220px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .s34-blm-group { margin: 12px 0 6px; }
        .s34-blm-group:first-child { margin-top: 2px; }
        .s34-blm-empty { padding: 26px 8px; text-align: center; opacity: .55; font-style: italic; }
        .s34-blm-foot { display: flex; flex-direction: column; gap: 6px; font-size: 11px; text-align: center; }
        .s34-blm-foot > div:last-child { opacity: .45; }
        .s34-blm-dates[hidden], .s34-blm-status[hidden] { display: none; }
        .s34-blm-dates {
            padding: 7px 10px;
            border-radius: 8px;
            text-align: left;
            line-height: 1.45;
            background-color: rgba(255,255,255,0.04) !important;
            color: #b8b8c2 !important;
        }
        .s34-blm-status {
            margin: -4px 0;
            font-size: 11.5px;
            color: #8ab4f8 !important;
        }
        .s34-blm-why {
            margin: -2px 0 8px;
            padding: 7px 10px;
            border-radius: 8px;
            font-size: 11.5px;
            line-height: 1.45;
            background-color: rgba(255,184,107,0.08) !important;
            border: 1px dashed rgba(255,184,107,0.35) !important;
            color: #e8cfa8 !important;
        }
        .s34-blm { position: relative; }
        .s34-blm-name { cursor: pointer; }
        .s34-blm-typemenu {
            position: absolute;
            z-index: 5;
            display: flex;
            flex-direction: column;
            gap: 3px;
            min-width: 160px;
            padding: 8px;
            border-radius: 12px;
            background-color: #24222c !important;
            border: 1px solid rgba(255,255,255,0.12) !important;
            box-shadow: 0 14px 34px rgba(0,0,0,0.6);
        }
        .s34-blm-typemenu-head { font-size: 11px; opacity: .6; padding: 0 4px 4px; overflow-wrap: anywhere; }
        .s34-blm .s34-blm-typemenu button {
            text-align: left;
            height: 28px;
            padding: 0 10px !important;
            border-radius: 8px;
            border: 1px solid transparent !important;
            background: transparent !important;
            font-size: 12.5px;
            font-weight: 600;
            cursor: pointer;
        }
        .s34-blm .s34-blm-typemenu button:hover { background-color: rgba(255,255,255,0.07) !important; }
        .s34-blm .s34-blm-typemenu button.s34-on { border-color: currentColor !important; }

        /* Settings: privacy & your data */
        .s34-privacy { display: flex; flex-direction: column; gap: 10px; margin-bottom: 6px; font-size: 12.5px; }
        .s34-privacy-hero {
            display: flex;
            gap: 12px;
            align-items: flex-start;
            padding: 12px;
            border-radius: 10px;
            line-height: 1.5;
            background-color: rgba(46,160,90,0.10) !important;
            border: 1px solid rgba(46,160,90,0.45) !important;
            color: #d8f2e0 !important;
        }
        .s34-privacy-icon { font-size: 20px; line-height: 1; }
        .s34-privacy-note { font-size: 11.5px; line-height: 1.5; opacity: .7; }
        .s34-privacy-head {
            display: flex;
            justify-content: space-between;
            font-size: 10.5px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            opacity: .6;
            margin-top: 4px;
        }
        .s34-privacy-list {
            display: flex;
            flex-direction: column;
            border-radius: 10px;
            overflow: hidden;
            border: 1px solid #2c2c33 !important;
        }
        .s34-privacy-row {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 7px 10px;
            border-top: 1px solid #2c2c33 !important;
        }
        .s34-privacy-row:first-child { border-top: none !important; }
        .s34-privacy-row.s34-privacy-empty { opacity: .45; }
        .s34-privacy-info { flex: 1; min-width: 0; }
        .s34-privacy-name { font-weight: 600; }
        .s34-privacy-what { font-size: 11px; opacity: .6; }
        .s34-privacy-amount { font-size: 11px; opacity: .7; white-space: nowrap; }
        .s34-privacy-actions { display: flex; flex-wrap: wrap; gap: 8px; }

        /* "Already downloaded" question */
        .s34-confirm {
            width: min(380px, calc(100vw - 32px));
            box-sizing: border-box;
            padding: 22px 22px 16px;
            border-radius: 14px;
            text-align: center;
            background-color: #1c1c21 !important;
            border: 1px solid #33333a !important;
            box-shadow: 0 20px 60px rgba(0,0,0,0.7);
            color: #e8e8ec !important;
            font: 13px/1.45 system-ui, -apple-system, Segoe UI, sans-serif;
        }
        .s34-confirm-icon {
            width: 44px;
            height: 44px;
            margin: 0 auto 10px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #1f7a3e !important;
            color: #fff !important;
            font-size: 20px;
        }
        .s34-confirm-title { font-size: 16px; font-weight: 700; margin-bottom: 6px; }
        .s34-confirm-text { opacity: .85; margin-bottom: 14px; }
        .s34-confirm-check {
            display: inline-flex;
            align-items: center;
            gap: 7px;
            margin-bottom: 16px;
            font-size: 12px;
            opacity: .8;
            cursor: pointer;
            user-select: none;
        }
        .s34-confirm-check input { margin: 0; cursor: pointer; accent-color: #2c5fcc; }
        .s34-confirm-foot { display: flex; gap: 8px; justify-content: center; }
        .s34-confirm-foot .s34-btn { min-width: 120px; }

    `;

    const CONTROLS_CSS = `
        /* Loading circle while ♥ / ▲ wait for the site */
        .s34-spin {
            display: inline-block;
            flex: none;
            width: 11px;
            height: 11px;
            margin-left: 6px;
            box-sizing: border-box;
            border: 2px solid currentColor;
            border-right-color: transparent;
            border-radius: 50%;
            vertical-align: -1px;
            animation: s34-spin .7s linear infinite;
        }
        @keyframes s34-spin { to { transform: rotate(360deg); } }
        .s34-busy { cursor: progress !important; }
        /* Thumbnail heart: the circle replaces the heart */
        .s34-fav-btn.s34-busy { opacity: 1 !important; }
        .s34-fav-btn.s34-busy svg { display: none; }
        .s34-fav-btn .s34-spin { margin: 0; width: 12px; height: 12px; }

        /* ---- Settings window: sections left, one section at a time ---- */
        .s34-set {
            width: min(860px, calc(100vw - 32px));
            height: min(640px, calc(100vh - 48px));
            display: grid;
            grid-template-columns: 220px minmax(0, 1fr);
            border-radius: 18px;
            overflow: hidden;
            background-color: #17161c !important;
            border: 1px solid rgba(255,255,255,0.08) !important;
            box-shadow: 0 30px 80px rgba(0,0,0,0.7);
            color: #e8e8ee !important;
            font: 13px/1.45 system-ui, -apple-system, Segoe UI, sans-serif;
            text-align: left !important;
            animation: s34-blm-in .16s ease-out;
        }
        .s34-set-nav {
            display: flex;
            flex-direction: column;
            gap: 4px;
            padding: 18px 12px;
            background-color: #121116 !important;
            border-right: 1px solid rgba(255,255,255,0.06) !important;
            min-height: 0;
            overflow-y: auto;
        }
        .s34-set-brand { display: flex; align-items: center; gap: 10px; padding: 0 6px 14px; }
        .s34-set-brand img { width: 36px; height: 36px; border-radius: 10px; }
        .s34-set-brand b { display: block; font-size: 15px; }
        .s34-set-brand span { font-size: 11px; opacity: .5; }
        .s34-set-nav nav { display: flex; flex-direction: column; gap: 2px; }
        /* Search settings (in the header) and its results */
        .s34-set .s34-set-search {
            margin-left: auto;
            width: 210px;
            max-width: 45%;
            height: 30px;
            box-sizing: border-box;
            padding: 0 10px !important;
            border-radius: 8px;
            font-size: 12.5px;
            background-color: #1a1a1f !important;
            border: 1px solid #34343c !important;
            color: #e6e6ea !important;
        }
        .s34-set-results { padding: 4px !important; }
        .s34-set .s34-set-hit-btn {
            display: grid;
            grid-template-columns: minmax(0, 1fr) auto;
            gap: 1px 12px;
            width: 100%;
            text-align: left;
            padding: 9px 12px !important;
            border: none !important;
            border-radius: 8px;
            background: none !important;
            color: inherit !important;
            cursor: pointer;
            font: inherit;
        }
        .s34-set .s34-set-hit-btn:hover, .s34-set .s34-set-hit-btn:focus-visible { background-color: rgba(255,255,255,0.05) !important; }
        .s34-set-hit-btn span { font-weight: 600; font-size: 13px; }
        .s34-set-hit-btn small { grid-column: 1; font-size: 11.5px; opacity: .55; white-space: normal !important; }
        .s34-set-hit-btn em { grid-column: 2; grid-row: 1 / span 2; align-self: center; font-style: normal; font-size: 11px; opacity: .6; white-space: nowrap; }
        .s34-set-nohit { padding: 14px; opacity: .6; }
        @keyframes s34-set-flash { 0%, 40% { background-color: rgba(255,95,143,0.18); } 100% { background-color: transparent; } }
        .s34-set-row.s34-set-flash { animation: s34-set-flash 1.8s ease-out; }
        .s34-set-nav nav button {
            display: flex;
            align-items: center;
            gap: 10px;
            width: 100%;
            height: 36px;
            padding: 0 10px !important;
            border-radius: 9px;
            border: none !important;
            background: transparent !important;
            color: #b8b8c2 !important;
            font: 600 13px system-ui, -apple-system, Segoe UI, sans-serif;
            text-align: left;
            cursor: pointer;
        }
        .s34-set-nav nav button svg { flex: none; display: block; opacity: .8; }
        .s34-set-nav nav button:hover { background-color: rgba(255,255,255,0.05) !important; color: #fff !important; }
        .s34-set-nav nav button.s34-on { background-color: rgba(255,95,143,0.14) !important; color: #ff8fb0 !important; }
        .s34-set-nav nav button.s34-on svg { opacity: 1; }
        .s34-set-safe {
            margin-top: auto;
            display: flex;
            gap: 8px;
            align-items: flex-start;
            padding: 10px;
            border-radius: 10px;
            font-size: 11px;
            line-height: 1.4;
            color: #9fd9b4 !important;
            background-color: rgba(46,160,90,0.08) !important;
        }
        .s34-set-safe svg { flex: none; width: 15px; height: 15px; margin-top: 1px; }
        /* Discord invite (Beta 3.6): always in reach, under the menu */
        a.s34-set-discord:is(:link, :visited) {
            margin-top: 8px;
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 9px 11px;
            border-radius: 10px;
            background-color: #5865f2 !important;
            color: #fff !important;
            text-decoration: none !important;
        }
        a.s34-set-discord:hover { background-color: #4752c4 !important; color: #fff !important; }
        .s34-set-discord svg { flex: none; width: 20px; height: 20px; color: #fff !important; }
        .s34-set-discord svg * { color: inherit !important; }
        .s34-set-discord span { display: flex; flex-direction: column; min-width: 0; line-height: 1.25; color: #fff !important; }
        .s34-set-discord b { font-size: 12.5px; color: #fff !important; }
        .s34-set-discord small { font-size: 11px; opacity: .85; color: #fff !important; }
        .s34-set-main { display: flex; flex-direction: column; min-width: 0; min-height: 0; }
        .s34-set-head { display: flex; align-items: center; padding: 18px 22px 10px; }
        .s34-set-head h2 { margin: 0 !important; font-size: 19px !important; font-weight: 800; color: #fff !important; flex: 1; }
        .s34-set .s34-set-x {
            width: 32px; height: 32px; padding: 0 !important; border-radius: 10px; border: none !important;
            background-color: rgba(255,255,255,0.06) !important; color: #e8e8ee !important; cursor: pointer; font-size: 14px;
        }
        .s34-set .s34-set-x:hover { background-color: rgba(255,255,255,0.12) !important; }
        .s34-set-body { flex: 1; min-height: 0; overflow-y: auto; padding: 4px 22px 18px; }
        .s34-set-page { display: flex; flex-direction: column; gap: 12px; }
        .s34-set-card {
            border-radius: 14px;
            background-color: rgba(255,255,255,0.03) !important;
            border: 1px solid rgba(255,255,255,0.07) !important;
        }
        .s34-set-card[hidden] { display: none; }
        .s34-set-row {
            display: flex;
            align-items: center;
            gap: 14px;
            min-height: 52px;
            padding: 8px 14px;
            border-top: 1px solid rgba(255,255,255,0.06) !important;
        }
        .s34-set-row:first-child { border-top: none !important; }
        .s34-set-label { flex: 1; min-width: 0; display: flex; flex-direction: column; cursor: pointer; }
        /* always wrap (the site's own label styles would keep them on one line) */
        .s34-set-label span, .s34-set-label small { white-space: normal !important; overflow-wrap: anywhere; }
        .s34-set-label span { font-weight: 600; font-size: 13px; }
        .s34-set-label small { font-size: 11.5px; opacity: .55; margin-top: 1px; line-height: 1.4; }
        .s34-set-plain p, .s34-set-row { white-space: normal !important; }
        .s34-set-ctl { flex: none; display: flex; align-items: center; gap: 6px; }
        .s34-set-ctl.s34-folder-ctl { flex: 0 1 auto; flex-wrap: wrap; justify-content: flex-end; max-width: 60%; }
        .s34-folder-name { font-size: 12.5px; font-weight: 600; overflow-wrap: anywhere; }
        .s34-folder-note { font-size: 11.5px; opacity: .7; text-align: right; white-space: normal !important; overflow-wrap: anywhere; max-width: 260px; }
        .s34-set .s34-set-ctl select, .s34-set .s34-set-ctl input[type="number"], .s34-set .s34-set-ctl input[type="text"] {
            height: 32px;
            box-sizing: border-box;
            padding: 0 10px !important;
            border-radius: 9px;
            font-size: 12.5px;
            background-color: #24232b !important;
            border: 1px solid rgba(255,255,255,0.12) !important;
            color: #e8e8ee !important;
        }
        .s34-set .s34-set-ctl select { min-width: 170px; cursor: pointer; }
        .s34-set .s34-set-ctl input[type="number"] { width: 84px; }
        .s34-set .s34-set-ctl input[type="text"] { width: 84px; text-align: center; }
        .s34-set .s34-set-ctl .s34-hotkey { width: 110px !important; font-weight: 700; cursor: pointer; }
        .s34-set .s34-unit { font-size: 11.5px; opacity: .55; }
        /* Switch */
        .s34-sw { position: relative; display: inline-block; width: 40px; height: 22px; cursor: pointer; }
        .s34-sw input { position: absolute; opacity: 0; width: 0; height: 0; }
        .s34-sw-track {
            position: absolute;
            inset: 0;
            border-radius: 999px;
            background-color: #3a3a44 !important;
            transition: background-color .15s;
        }
        .s34-sw-track::after {
            content: '';
            position: absolute;
            top: 3px;
            left: 3px;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background-color: #fff;
            box-shadow: 0 1px 3px rgba(0,0,0,0.4);
            transition: transform .15s;
        }
        .s34-sw input:checked + .s34-sw-track { background: linear-gradient(135deg, #ff5f8f, #8b3dff) !important; }
        .s34-sw input:checked + .s34-sw-track::after { transform: translateX(18px); }
        .s34-sw input:focus-visible + .s34-sw-track { outline: 2px solid #8b3dff; outline-offset: 2px; }
        .s34-set .s34-set-advbtn {
            align-self: flex-start;
            padding: 4px 6px !important;
            border: none !important;
            background: transparent !important;
            color: #9a9aa3 !important;
            font: 600 12px system-ui, -apple-system, Segoe UI, sans-serif;
            cursor: pointer;
        }
        .s34-set .s34-set-advbtn:hover { color: #fff !important; }
        .s34-set-plain { padding: 4px 16px 14px; }
        .s34-set-cardhead { margin: 14px 0 4px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #ff8fa3 !important; }
        .s34-set-plain p { margin: 0 0 10px !important; font-size: 12.5px; opacity: .8; }
        .s34-set-plain a { color: #8ab4f8 !important; }
        .s34-set-ver { opacity: .45 !important; font-size: 11.5px !important; }
        .s34-set-actions { display: flex; flex-wrap: wrap; gap: 8px; }
        .s34-set .s34-set-btn, .s34-set .s34-btn {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            height: 34px;
            padding: 0 14px !important;
            border-radius: 10px;
            border: 1px solid rgba(255,255,255,0.12) !important;
            background-color: rgba(255,255,255,0.06) !important;
            color: #e8e8ee !important;
            font: 600 12.5px system-ui, -apple-system, Segoe UI, sans-serif;
            white-space: nowrap;
            cursor: pointer;
        }
        .s34-set .s34-set-btn:hover, .s34-set .s34-btn:hover { border-color: #ff5f8f !important; }
        .s34-set .s34-set-btn.s34-set-primary {
            border: none !important;
            background: linear-gradient(135deg, #ff5f8f, #8b3dff) !important;
            color: #fff !important;
            padding: 0 20px !important;
        }
        .s34-set .s34-set-btn.s34-set-danger, .s34-set .s34-btn.s34-danger { border-color: rgba(255,80,100,0.5) !important; color: #ff8a9a !important; }
        .s34-set .s34-set-tourbtn { margin-right: auto; }
        .s34-set-foot {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 8px;
            padding: 12px 22px;
            border-top: 1px solid rgba(255,255,255,0.07) !important;
        }
        .s34-set-dirty { margin-right: auto; font-size: 12px; color: #ffcf8a !important; }
        .s34-set-dirty[hidden] { display: none; }
        /* Privacy section inside the settings window */
        .s34-set .s34-privacy-clear {
            height: 26px; padding: 0 10px !important; border-radius: 7px; cursor: pointer; font-size: 11.5px;
            background: transparent !important; border: 1px solid rgba(255,255,255,0.14) !important; color: #dcdce0 !important;
        }
        .s34-set .s34-privacy-clear:hover:not(:disabled) { border-color: #ff4d6d !important; color: #ff8fa3 !important; }
        .s34-set .s34-privacy-clear:disabled { opacity: .35; cursor: default; }
        .s34-set .s34-privacy-list { border-color: rgba(255,255,255,0.07) !important; }
        .s34-set .s34-privacy-row { border-color: rgba(255,255,255,0.06) !important; }
        @media (max-width: 640px) {
            .s34-set { grid-template-columns: 1fr; grid-template-rows: auto minmax(0, 1fr); }
            .s34-set-nav { flex-direction: row; overflow-x: auto; padding: 10px; border-right: none !important; }
            .s34-set-brand, .s34-set-safe { display: none; }
            a.s34-set-discord:is(:link, :visited) { margin: 0 0 0 6px; padding: 6px 9px; flex: none; }
            .s34-set-discord span { display: none; } /* just the logo at the end of the row */
            .s34-set-nav nav { flex-direction: row; }
            .s34-set-nav nav button span { white-space: nowrap; }
        }

        /* Cloudflare check (Beta 3.6.3): big and centred at the bottom, with a
           pulse that keeps going - without the check nothing loads, so it must
           not be missed. (Beta 3.5 had a small pill in the corner.) */
        @keyframes s34-cf-glow {
            0%, 100% { box-shadow: 0 10px 30px rgba(0,0,0,0.55), 0 0 14px rgba(255,95,143,0.35), 0 0 30px rgba(139,61,255,0.22); }
            50%      { box-shadow: 0 10px 30px rgba(0,0,0,0.55), 0 0 26px rgba(255,95,143,0.75), 0 0 56px rgba(139,61,255,0.55); }
        }
        @keyframes s34-cf-ring {
            0%   { transform: scale(1, 1); opacity: .85; }
            100% { transform: scale(1.08, 1.45); opacity: 0; }
        }
        .s34-cf-pill {
            position: fixed;
            left: 50%;
            bottom: 22px;
            z-index: 100003;
            display: flex;
            align-items: center;
            gap: 14px;
            max-width: calc(100vw - 24px);
            box-sizing: border-box;
            padding: 10px 10px 10px 12px;
            border-radius: 999px;
            border: 2px solid transparent !important;
            background: linear-gradient(rgba(24,22,30,0.98), rgba(24,22,30,0.98)) padding-box,
                        linear-gradient(135deg, #ff5f8f, #8b3dff) border-box !important;
            color: #e8e8ee !important;
            font: 14px/1.3 system-ui, -apple-system, Segoe UI, sans-serif;
            text-align: left;
            box-shadow: 0 10px 30px rgba(0,0,0,0.55), 0 0 14px rgba(255,95,143,0.35), 0 0 30px rgba(139,61,255,0.22);
            opacity: 0;
            transform: translate(-50%, 16px);
            transition: opacity .25s ease, transform .25s ease;
            animation: s34-cf-glow 1.8s ease-in-out infinite;
        }
        /* a ring that keeps rippling outwards */
        .s34-cf-pill::after {
            content: '';
            position: absolute;
            inset: -2px;
            border-radius: inherit;
            border: 2px solid #ff5f8f;
            pointer-events: none;
            animation: s34-cf-ring 1.8s ease-out infinite;
        }
        .s34-cf-pill.s34-show { opacity: 1; transform: translate(-50%, 0); }
        /* Messages and the download bar move up above it */
        body:has(.s34-cf-pill.s34-show) .s34-toasts,
        body:has(.s34-cf-pill.s34-show) .s34-batch { bottom: 104px; }
        @media (max-width: 760px) {
            .s34-cf-pill {
                bottom: calc(12px + env(safe-area-inset-bottom, 0px));
                width: calc(100vw - 24px);
                gap: 12px;
            }
            .s34-cf-pill-text b, .s34-cf-pill-text small { white-space: normal !important; }
            .s34-cf-pill { padding-left: 16px; gap: 10px; }
            .s34-cf-pill .s34-cf-pill-icon { display: none; }
            .s34-cf-pill .s34-cf-pill-text b { font-size: 15px; }
            .s34-cf-pill.s34-cf-pill .s34-cf-pill-solve { padding: 0 18px !important; } /* (doubled: beats the rule further down) */
            html.s34-sfw .s34-cf-pill { bottom: calc(56px + env(safe-area-inset-bottom, 0px)); }
            body:has(.s34-cf-pill.s34-show) .s34-toasts,
            body:has(.s34-cf-pill.s34-show) .s34-batch { bottom: calc(96px + env(safe-area-inset-bottom, 0px)); }
        }
        /* Not needed while the check window itself is open */
        body:has(.s34-cf-overlay) .s34-cf-pill { opacity: 0; pointer-events: none; }
        .s34-cf-pill-icon {
            flex: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, rgba(255,95,143,0.22), rgba(139,61,255,0.22)) !important;
            color: #ff8fb0 !important;
        }
        .s34-cf-pill-icon svg { display: block; }
        .s34-cf-pill .s34-cf-pill-icon svg { width: 22px; height: 22px; }
        .s34-cf-inline .s34-cf-pill-icon { width: 28px; height: 28px; }
        /* ? with the explanation (hover, focus or tap) */
        .s34-cf-why {
            flex: none;
            width: 26px;
            height: 26px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1.5px solid rgba(255,255,255,0.28) !important;
            color: #d6d6de !important;
            font: 700 14px system-ui, -apple-system, Segoe UI, sans-serif;
            cursor: help;
            outline: none;
        }
        .s34-cf-why:hover, .s34-cf-why:focus-visible, .s34-cf-why.s34-on { border-color: #ff5f8f !important; color: #fff !important; }
        .s34-cf-why-pop {
            position: absolute;
            left: 50%;
            bottom: calc(100% + 14px);
            width: min(380px, calc(100vw - 24px));
            box-sizing: border-box;
            padding: 14px 16px;
            border-radius: 14px;
            border: 1px solid rgba(255,95,143,0.45) !important;
            background-color: #1c1a22 !important;
            color: #cfcfd8 !important;
            font: 400 13px/1.5 system-ui, -apple-system, Segoe UI, sans-serif;
            box-shadow: 0 12px 32px rgba(0,0,0,0.6);
            cursor: default;
            opacity: 0;
            visibility: hidden;
            transform: translate(-50%, 6px);
            transition: opacity .15s ease, transform .15s ease, visibility .15s;
        }
        .s34-cf-why-pop b { color: #fff !important; }
        .s34-cf-why-pop > b:first-child { display: block; margin-bottom: 4px; font-size: 14px; }
        .s34-cf-why:hover .s34-cf-why-pop, .s34-cf-why:focus-visible .s34-cf-why-pop, .s34-cf-why.s34-on .s34-cf-why-pop { opacity: 1; visibility: visible; transform: translate(-50%, 0); }
        .s34-cf-pill-text { display: flex; flex-direction: column; min-width: 0; }
        .s34-cf-pill-text { flex: 1; } .s34-cf-pill-text b { font-size: 16px; color: #f2f2f6 !important; white-space: nowrap; }
        .s34-cf-pill-text small { font-size: 13px; color: #a9a9b3 !important; white-space: nowrap; }
        .s34-cf-pill .s34-cf-pill-solve, .s34-cf-inline .s34-cf-pill-solve {
            flex: none;
            height: 28px;
            padding: 0 13px !important;
            border-radius: 999px;
            border: none !important;
            background: linear-gradient(135deg, #ff5f8f, #8b3dff) !important;
            color: #fff !important;
            font: 700 12px system-ui, -apple-system, Segoe UI, sans-serif;
            cursor: pointer;
            box-shadow: 0 0 12px rgba(255,95,143,0.35);
        }
        .s34-cf-pill .s34-cf-pill-solve { height: 42px; padding: 0 24px !important; font-size: 15px; }
        .s34-cf-pill .s34-cf-pill-solve:hover, .s34-cf-inline .s34-cf-pill-solve:hover { filter: brightness(1.12); box-shadow: 0 0 16px rgba(255,95,143,0.55); }
        .s34-cf-pill .s34-cf-pill-x {
            flex: none;
            width: 24px;
            height: 24px;
            padding: 0 !important;
            border-radius: 50%;
            border: none !important;
            background: transparent !important;
            color: #8a8a94 !important;
            font-size: 11px;
            cursor: pointer;
        }
        .s34-cf-pill .s34-cf-pill-x:hover { color: #e8e8ee !important; background-color: rgba(255,255,255,0.08) !important; }
        /* The same, right where something stopped (end of the list, popup tags) */
        .s34-cf-inline {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            margin: 6px auto;
            padding: 6px 6px 6px 8px;
            border-radius: 999px;
            border: 1.5px solid transparent !important;
            background: linear-gradient(rgba(24,22,30,0.97), rgba(24,22,30,0.97)) padding-box,
                        linear-gradient(135deg, #ff5f8f, #8b3dff) border-box !important;
            color: #e8e8ee !important;
            font: 12.5px/1.3 system-ui, -apple-system, Segoe UI, sans-serif;
            text-align: left;
            animation: s34-cf-glow 1.6s ease-in-out 3;
            box-shadow: 0 6px 18px rgba(0,0,0,0.35), 0 0 10px rgba(255,95,143,0.30), 0 0 22px rgba(139,61,255,0.18);
        }
        .s34-cf-inline-text { color: inherit !important; }
        .s34-pv-tags .s34-cf-inline { display: flex; margin: 10px 0; }
        @media (prefers-reduced-motion: reduce) {
            .s34-cf-pill, .s34-cf-pill::after, .s34-cf-inline { animation: none; }
            .s34-cf-pill { transition: none; }
        }

        /* Search: 5th filter (Rating) uses the whole row */
        .s34-sb-filters .s34-sb-filter:last-child:nth-child(odd) { grid-column: 1 / -1; }

    `;

    const POPUP_SIDE_CSS = `
        /* Popup: theater mode (no sidebar) */
        .s34-pv-theaterbtn {
            display: flex;
            align-items: center;
            padding: 0 3px;
            cursor: pointer;
            color: #dcdce0 !important;
            opacity: .65;
        }
        .s34-pv-theaterbtn:hover { opacity: 1; }
        .s34-pv-theaterbtn svg { display: block; }
        .s34-pv-overlay.s34-pv-theater { grid-template-columns: minmax(0, 1fr); }
        .s34-pv-overlay.s34-pv-theater .s34-pv-side { display: none; }
        .s34-pv-overlay.s34-pv-theater .s34-pv-stage { padding: 0; }
        .s34-pv-tbar {
            display: none;
            position: absolute;
            top: 12px;
            right: 18px;
            z-index: 6;
            gap: 6px;
            opacity: .4;
            transition: opacity .15s;
        }
        .s34-pv-theater .s34-pv-tbar { display: flex; }
        .s34-pv-tbar:hover { opacity: 1; }
        .s34-pv-tbar button {
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 !important;
            border-radius: 50%;
            border: 1px solid rgba(255,255,255,0.18) !important;
            background-color: rgba(16,16,20,0.75) !important;
            backdrop-filter: blur(6px);
            color: #fff !important;
            font-size: 18px;
            cursor: pointer;
        }
        .s34-pv-tbar button:hover { background-color: rgba(40,40,50,0.9) !important; }

        /* Popup: ♥ Favourite + 📁 Collection side by side */
        .s34-pv-row2 { display: flex; gap: 8px; }
        .s34-pv-row2 > * { flex: 1; min-width: 0; }
        .s34-pv-collect, .s34-post-collect {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 7px;
            height: 34px;
            border-radius: 8px;
            cursor: pointer;
            font: 600 13px system-ui, -apple-system, Segoe UI, sans-serif;
            background-color: #24242a !important;
            border: 1px solid #3a3a44 !important;
            color: #e8e8ee !important;
        }
        .s34-pv-collect:hover, .s34-post-collect:hover { border-color: #ffb347 !important; }
        .s34-pv-collect svg, .s34-post-collect svg { display: block; flex: none; }
        .s34-post-collect { width: 100%; }

        /* "Save to collection" menu */
        .s34-cmenu {
            position: fixed;
            z-index: 100001;
            width: 250px;
            max-height: 60vh;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 2px;
            padding: 8px;
            border-radius: 12px;
            background-color: #24222c !important;
            border: 1px solid rgba(255,255,255,0.12) !important;
            box-shadow: 0 14px 34px rgba(0,0,0,0.6);
            color: #e8e8ee !important;
            font: 13px/1.3 system-ui, -apple-system, Segoe UI, sans-serif;
            text-align: left;
        }
        .s34-cmenu-head { padding: 2px 6px 6px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .8px; opacity: .6; }
        .s34-cmenu-empty { padding: 2px 6px 6px; font-size: 12px; opacity: .7; }
        .s34-cmenu .s34-cmenu-item {
            display: flex;
            align-items: center;
            gap: 8px;
            width: 100%;
            padding: 7px 8px !important;
            border-radius: 8px;
            border: none !important;
            background: transparent !important;
            color: inherit !important;
            font: inherit;
            text-align: left;
            cursor: pointer;
        }
        .s34-cmenu .s34-cmenu-item:hover { background-color: rgba(255,255,255,0.07) !important; }
        .s34-cmenu-check {
            flex: none;
            width: 16px;
            height: 16px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 11px;
            font-weight: 800;
            border: 1.5px solid rgba(255,255,255,0.3) !important;
        }
        .s34-cmenu-item.s34-on .s34-cmenu-check { background-color: #ffb347 !important; border-color: #ffb347 !important; color: #1a1a1a !important; }
        .s34-cmenu-name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .s34-cmenu-n { font-size: 11px; opacity: .5; }
        .s34-cmenu-new { display: flex; gap: 6px; margin-top: 6px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.08) !important; }
        .s34-cmenu-new input, .s34-coll-new input {
            flex: 1;
            min-width: 0;
            height: 30px;
            box-sizing: border-box;
            padding: 0 8px !important;
            border-radius: 7px;
            font-size: 12.5px;
            background-color: rgba(0,0,0,0.35) !important;
            border: 1px solid rgba(255,255,255,0.12) !important;
            color: #e8e8ee !important;
        }
        .s34-cmenu-new button, .s34-coll-new button {
            height: 30px;
            padding: 0 12px !important;
            border-radius: 7px;
            border: none !important;
            background: linear-gradient(135deg, #ffb347, #ff5f8f) !important;
            color: #fff !important;
            font-weight: 700;
            cursor: pointer;
        }

    `;

    const COLLECTIONS_CSS = `
        /* Windows: Collections / Stats / What's new (same look as the blacklist) */
        .s34-win {
            width: min(720px, calc(100vw - 32px));
            max-height: min(86vh, 860px);
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
            border-radius: 18px;
            overflow: hidden;
            background: linear-gradient(180deg, #1f1d26 0%, #17161c 100%) !important;
            border: 1px solid rgba(255,255,255,0.08) !important;
            box-shadow: 0 30px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05);
            color: #e8e8ee !important;
            font: 13px/1.4 system-ui, -apple-system, Segoe UI, sans-serif;
            text-align: left !important;
            animation: s34-blm-in .16s ease-out;
        }
        .s34-win-head { display: flex; align-items: center; gap: 12px; padding: 18px 20px 12px; }
        .s34-win-icon {
            flex: none;
            width: 42px;
            height: 42px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #ffb347, #ff5f8f) !important;
            color: #fff !important;
        }
        .s34-win-icon svg { width: 22px; height: 22px; }
        .s34-win-heading { flex: 1; min-width: 0; }
        .s34-win-title { font-size: 18px; font-weight: 800; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .s34-win-sub { font-size: 12px; opacity: .6; }
        .s34-win .s34-win-close {
            width: 32px; height: 32px; padding: 0 !important; border-radius: 10px; border: none !important;
            background-color: rgba(255,255,255,0.06) !important; color: #e8e8ee !important; cursor: pointer; font-size: 14px;
        }
        .s34-win .s34-win-close:hover { background-color: rgba(255,255,255,0.12) !important; }
        .s34-win-body { overflow-y: auto; padding: 4px 20px 20px; display: flex; flex-direction: column; gap: 12px; }
        .s34-win-tools { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
        .s34-win-tools .s34-grow { flex: 1; }
        .s34-win .s34-win-tools button, .s34-win .s34-win-more {
            height: 32px;
            padding: 0 12px !important;
            border-radius: 9px;
            font-size: 12.5px;
            font-weight: 600;
            cursor: pointer;
            background-color: rgba(255,255,255,0.06) !important;
            border: 1px solid rgba(255,255,255,0.12) !important;
            color: #e8e8ee !important;
        }
        .s34-win .s34-win-tools button:hover, .s34-win .s34-win-more:hover { border-color: #ffb347 !important; }
        .s34-win .s34-win-tools button.s34-win-primary { background: linear-gradient(135deg, #ffb347, #ff5f8f) !important; border-color: transparent !important; color: #fff !important; }
        .s34-win-status { font-size: 12px; color: #ffcf8a !important; }
        .s34-win-status[hidden] { display: none; }
        .s34-win-empty { padding: 26px 4px; opacity: .55; font-style: italic; grid-column: 1 / -1; }
        .s34-win-note { font-size: 11.5px; opacity: .55; display: flex; flex-direction: column; gap: 8px; align-items: flex-start; }

        /* Picture tiles (inside a collection) */
        .s34-tiles { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 10px; }
        .s34-tile {
            position: relative;
            display: flex;
            flex-direction: column;
            border-radius: 12px;
            overflow: hidden;
            background-color: rgba(255,255,255,0.04) !important;
            border: 1px solid rgba(255,255,255,0.07) !important;
        }
        .s34-tile > a { display: block; text-decoration: none !important; }
        .s34-tile-img {
            aspect-ratio: 1 / 1;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            background-color: #121216 !important;
            color: #8a8a94 !important;
            font-size: 12px;
            font-weight: 600;
        }
        .s34-tile-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .s34-tile-cap { padding: 6px 8px 8px; min-width: 0; }
        .s34-tile-title { font-size: 12px; font-weight: 700; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .s34-tile-sub { font-size: 10.5px; opacity: .5; }
        .s34-tile-acts { position: absolute; top: 6px; right: 6px; display: flex; gap: 4px; opacity: 0; transition: opacity .12s; }
        .s34-tile:hover .s34-tile-acts { opacity: 1; }
        .s34-tile-acts a, .s34-win .s34-tile-acts button {
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 !important;
            border-radius: 50%;
            border: none !important;
            background-color: rgba(16,16,20,0.82) !important;
            color: #fff !important;
            font-size: 13px;
            text-decoration: none !important;
            cursor: pointer;
        }
        .s34-tile-acts a:hover, .s34-win .s34-tile-acts button:hover { background-color: #ff5f8f !important; }

        /* Collections overview */
        .s34-coll-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 12px; }
        .s34-win .s34-coll-card {
            display: flex;
            flex-direction: column;
            gap: 4px;
            padding: 8px !important;
            border-radius: 14px;
            text-align: left;
            cursor: pointer;
            background-color: rgba(255,255,255,0.04) !important;
            border: 1px solid rgba(255,255,255,0.08) !important;
            color: #e8e8ee !important;
            font: inherit;
        }
        .s34-win .s34-coll-card:hover { border-color: #ffb347 !important; }
        .s34-coll-cover {
            aspect-ratio: 4 / 3;
            border-radius: 10px;
            overflow: hidden;
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            grid-template-rows: repeat(2, minmax(0, 1fr));
            gap: 2px;
            place-items: stretch;
            background-color: #121216 !important;
            color: #6a6a74 !important;
        }
        .s34-coll-cover svg { width: 34px; height: 34px; grid-column: 1 / -1; grid-row: 1 / 3; place-self: center; }
        .s34-coll-cover img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .s34-coll-cover.s34-coll-cover-n1 img { grid-column: 1 / -1; grid-row: 1 / 3; }
        .s34-coll-cover.s34-coll-cover-n2 img { grid-row: 1 / 3; }
        .s34-coll-cover.s34-coll-cover-n3 img:first-child { grid-row: 1 / 3; }
        .s34-coll-name { font-weight: 700; font-size: 13.5px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; padding: 2px 2px 0; }
        .s34-coll-n { font-size: 11px; opacity: .55; padding: 0 2px; }
        .s34-coll-new { cursor: default; justify-content: center; gap: 8px !important; }
        .s34-coll-plus { font-size: 26px; font-weight: 300; text-align: center; opacity: .5; }
        .s34-coll-new input { flex: none; width: 100%; }

        /* Stats */
        .s34-stat-tiles { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .s34-stat-tile {
            display: flex;
            flex-direction: column;
            padding: 12px 14px;
            border-radius: 12px;
            background-color: rgba(255,255,255,0.04) !important;
            border: 1px solid rgba(255,255,255,0.07) !important;
        }
        .s34-stat-tile b {
            font-size: 22px;
            font-weight: 800;
            background: linear-gradient(135deg, #ffb347, #ff5f8f);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent !important;
        }
        .s34-stat-tile span { font-size: 11.5px; opacity: .6; }
        .s34-stat-label { margin: 6px 0 2px; font-size: 10.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #ff8fa3 !important; }
        .s34-stat-chart { display: flex; gap: 5px; align-items: flex-end; height: 120px; }
        .s34-stat-day { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; height: 100%; }
        .s34-stat-cols { flex: 1; width: 100%; display: flex; gap: 2px; align-items: flex-end; }
        .s34-stat-cols i { flex: 1; min-height: 2px; border-radius: 3px 3px 0 0; }
        .s34-stat-v { background-color: #8b7bff !important; }
        .s34-stat-d { background-color: #ff5f8f !important; }
        .s34-stat-day span { font-size: 10px; opacity: .5; }
        .s34-stat-legend { display: flex; align-items: center; gap: 6px; font-size: 11.5px; opacity: .7; }
        .s34-stat-legend span { width: 10px; height: 10px; border-radius: 3px; display: inline-block; }
        .s34-stat-legend span + span { margin-left: 10px; }
        .s34-stat-tops { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
        .s34-stat-bar { display: grid; grid-template-columns: minmax(0, 1fr) 60px 24px; align-items: center; gap: 6px; margin: 4px 0; font-size: 12px; }
        .s34-stat-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 600; color: inherit !important; }
        .s34-stat-track i { color: inherit !important; }
        .s34-stat-bar.s34-blm-artist    { color: #ff8a80 !important; }
        .s34-stat-bar.s34-blm-character { color: #7ee07e !important; }
        .s34-stat-bar.s34-blm-copyright { color: #d68cff !important; }
        .s34-stat-track { height: 6px; border-radius: 999px; background-color: rgba(255,255,255,0.07) !important; overflow: hidden; }
        .s34-stat-track i { display: block; height: 100%; border-radius: 999px; background-color: currentColor !important; }
        .s34-stat-bar b { font-size: 11px; text-align: right; color: #e8e8ee !important; }
        .s34-stat-bar.s34-blm-artist, .s34-stat-bar.s34-blm-character, .s34-stat-bar.s34-blm-copyright { border: none !important; background: none !important; }
        @media (max-width: 640px) {
            .s34-stat-tops, .s34-stat-tiles { grid-template-columns: 1fr 1fr; }
        }

        /* Sidebar: Collections · Stats */
        .s34-hub { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px; margin: 14px 0 -6px; }
        .s34-tools .s34-hub { margin: 0; }
        .s34-hub button {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2px;
            min-width: 0;
            padding: 8px 4px !important;
            border-radius: 9px;
            cursor: pointer;
            background-color: #1c1c20 !important;
            border: 1px solid #33333a !important;
            color: #dcdce0 !important;
            font: 12px system-ui, -apple-system, Segoe UI, sans-serif;
        }
        .s34-hub button:hover { background-color: #24242a !important; border-color: #ffb347 !important; }
        .s34-hub svg { display: block; color: #ffb347 !important; }
        .s34-hub button { overflow: hidden; }
        .s34-hub b, .s34-hub small {
            display: block;
            max-width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: center;
        }
        .s34-hub b { font-size: 10.5px; letter-spacing: -.1px; }
        .s34-hub small { font-size: 9.5px; opacity: .55; }

    `;

    const POPUP_INFO_CSS = `
        /* Popup: auto next (slideshow) */
        .s34-auto {
            display: flex;
            flex-direction: column;
            gap: 7px;
            padding: 9px 10px;
            border-radius: 10px;
            background-color: #1c1c21 !important;
            border: 1px solid #2a2a31 !important;
            color: #dcdce0 !important;
            font-size: 12px;
        }
        .s34-auto.s34-auto-running { border-color: rgba(255,95,143,0.5) !important; }
        .s34-auto .s34-auto-toggle {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 7px;
            height: 32px;
            border-radius: 8px;
            cursor: pointer;
            font: 600 13px system-ui, -apple-system, Segoe UI, sans-serif;
            background-color: #24242a !important;
            border: 1px solid #3a3a44 !important;
            color: #e8e8ee !important;
        }
        .s34-auto .s34-auto-toggle:hover { border-color: #ff5f8f !important; }
        .s34-auto .s34-auto-toggle.s34-on {
            background: linear-gradient(135deg, #ff5f8f, #8b3dff) !important;
            border-color: transparent !important;
            color: #fff !important;
        }
        .s34-auto-icon { font-size: 11px; letter-spacing: -1px; }
        .s34-auto-row { display: flex; align-items: center; gap: 8px; }
        .s34-auto-row span { opacity: .65; }
        .s34-auto .s34-auto-row input[type="range"] {
            flex: 1;
            min-width: 0;
            padding: 0 !important;
            border: none !important;
            background: transparent !important;
            accent-color: #ff5f8f;
            cursor: pointer;
        }
        .s34-auto-sec { min-width: 30px; text-align: right; font-size: 12px; color: #fff !important; }
        .s34-auto-bar {
            display: none;
            height: 4px;
            border-radius: 999px;
            overflow: hidden;
            background-color: rgba(255,255,255,0.08) !important;
        }
        .s34-auto.s34-auto-running .s34-auto-bar { display: block; }
        .s34-auto-bar i {
            display: block;
            height: 100%;
            width: 0%;
            border-radius: 999px;
            background: linear-gradient(90deg, #ff5f8f, #8b3dff) !important;
            transition: width .1s linear;
        }
        .s34-auto-note { font-size: 10.5px; opacity: .5; }

        /* Popup: post info */
        .s34-pv-info {
            display: flex;
            flex-direction: column;
            gap: 6px;
            padding: 10px;
            border-radius: 8px;
            background-color: #1c1c21 !important;
            border: 1px solid #2a2a31 !important;
            font-size: 12px;
            color: #c8c8ce !important;
        }
        .s34-pv-info:empty { display: none; }
        .s34-pv-stats { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; }
        .s34-pv-score { font-weight: 700; color: #ffd36b !important; font-size: 13px; }
        .s34-pv-vote {
            height: 22px;
            padding: 0 7px !important;
            border-radius: 6px;
            cursor: pointer;
            font-size: 11px;
            background-color: #26262d !important;
            border: 1px solid #3a3a44 !important;
            color: #e8e8ec !important;
        }
        .s34-pv-vote:hover { border-color: #7ee07e !important; color: #7ee07e !important; }
        .s34-pv-vote.s34-on { background-color: rgba(126,224,126,0.15) !important; border-color: #7ee07e !important; color: #7ee07e !important; }
        .s34-pv-pill {
            padding: 1px 7px;
            border-radius: 999px;
            background-color: #26262d !important;
            border: 1px solid #33333a !important;
            font-size: 11px;
        }
        .s34-pv-line { overflow-wrap: anywhere; }
        .s34-pv-info a { color: #8ab4f8 !important; text-decoration: none !important; }
        .s34-pv-info a:hover { text-decoration: underline !important; }
        .s34-pv-notice {
            padding: 6px 8px;
            border-radius: 6px;
            background-color: rgba(255,184,107,0.10) !important;
            border: 1px solid rgba(255,184,107,0.35) !important;
            color: #ffd9ad !important;
            overflow-wrap: anywhere;
        }

        /* Popup: right side scrolls - media fills the first screen, comments below */
        .s34-pv-main {
            position: relative;
            min-width: 0;
            min-height: 0;
            overflow-y: auto;
            overflow-x: hidden;
            scrollbar-width: thin;
        }
        .s34-pv-main > .s34-pv-stage { height: 100%; box-sizing: border-box; }
        /* Comments */
        .s34-cm-section {
            max-width: 820px;
            margin: 0 auto;
            padding: 28px 24px 70px;
            box-sizing: border-box;
            color: #e4e4ea !important;
            font: 13.5px/1.55 system-ui, -apple-system, Segoe UI, sans-serif;
            text-align: left;
        }
        .s34-cm-head {
            display: flex;
            align-items: center;
            gap: 10px;
            padding-bottom: 14px;
            margin-bottom: 8px;
            border-bottom: 1px solid rgba(255,255,255,0.08) !important;
        }
        .s34-cm-head h3 { margin: 0 !important; font-size: 18px !important; font-weight: 800; color: #fff !important; }
        .s34-cm-count {
            padding: 1px 9px;
            border-radius: 999px;
            font-size: 12px;
            font-weight: 700;
            background-color: rgba(255,95,143,0.16) !important;
            color: #ff8fb0 !important;
        }
        .s34-cm-count[hidden] { display: none; }
        .s34-cm-write {
            margin-left: auto;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 1px;
            padding: 6px 12px;
            border-radius: 9px;
            text-decoration: none !important;
            background-color: rgba(255,255,255,0.06) !important;
            border: 1px solid rgba(255,255,255,0.12) !important;
            color: #e8e8ee !important;
        }
        .s34-cm-write-main { display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; font-weight: 600; }
        .s34-cm-write-main svg { display: block; opacity: .8; }
        .s34-cm-write-sub { font-size: 10.5px; font-weight: 500; opacity: .55; white-space: nowrap; }
        .s34-cm-write:hover { border-color: #ff5f8f !important; color: #fff !important; }
        .s34-cm-write:hover .s34-cm-write-sub { opacity: .8; }
        .s34-cm-list { display: flex; flex-direction: column; gap: 4px; }
        .s34-cm {
            display: flex;
            gap: 12px;
            padding: 12px 10px;
            border-radius: 12px;
            transition: background-color .12s;
        }
        .s34-cm:hover { background-color: rgba(255,255,255,0.035) !important; }
        .s34-cm-avatar {
            flex: none;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font: 800 15px system-ui, -apple-system, Segoe UI, sans-serif;
            color: #fff !important;
            box-shadow: inset 0 0 0 2px rgba(255,255,255,0.12);
        }
        .s34-cm-main { flex: 1; min-width: 0; }
        .s34-cm-meta { display: flex; flex-wrap: wrap; align-items: baseline; gap: 8px; margin-bottom: 3px; }
        .s34-cm-user { font-weight: 700; color: #fff !important; text-decoration: none !important; }
        a.s34-cm-user:hover { text-decoration: underline !important; }
        .s34-cm-date { font-size: 11.5px; opacity: .5; }
        .s34-cm-score {
            font-size: 11px;
            font-weight: 700;
            padding: 0 6px;
            border-radius: 6px;
            background-color: rgba(126,224,126,0.12) !important;
            color: #7ee07e !important;
        }
        .s34-cm-text { white-space: pre-wrap; overflow-wrap: anywhere; color: #d4d4dc !important; }
        .s34-cm-text a { color: #8ab4f8 !important; }
        .s34-cm-empty { padding: 26px 4px; opacity: .6; font-style: italic; display: flex; align-items: center; gap: 8px; }
        .s34-cm-more {
            display: block;
            width: 100%;
            margin: 8px 0 4px;
            height: 36px;
            border-radius: 10px;
            border: 1px solid rgba(255,255,255,0.12) !important;
            background-color: rgba(255,255,255,0.05) !important;
            color: #e8e8ee !important;
            font: 600 12.5px system-ui, -apple-system, Segoe UI, sans-serif;
            cursor: pointer;
        }
        .s34-cm-more:hover { border-color: #ff5f8f !important; }
        .s34-cm-more:disabled { opacity: .6; cursor: progress; }

        /* Popup: zoom */
        .s34-pv-overlay { grid-template-rows: minmax(0, 1fr); }
        .s34-pv-stage img.s34-pv-media:not(.s34-pv-placeholder) { cursor: zoom-in; }
        .s34-pv-stage.s34-pv-zoomed {
            display: block;
            overflow: auto;
            padding: 0;
            cursor: default;
        }
        .s34-pv-stage.s34-pv-zoomed img.s34-pv-media {
            display: block;
            max-width: none !important;
            max-height: none !important;
            object-fit: fill;
            margin: 0 auto;
            cursor: grab;
        }
        .s34-pv-stage.s34-pv-dragging img.s34-pv-media { cursor: grabbing !important; }

    `;

    const MISC_CSS = `
        /* Saved search: "+N new" */
        .s34-sb-new {
            display: inline-block;
            margin-right: 5px;
            padding: 0 5px;
            border-radius: 4px;
            background-color: #e0457b !important;
            color: #fff !important;
            font-size: 10px;
            font-weight: 700;
            line-height: 16px;
        }

        /* Screenshot mode (X): every picture and video blurred - Steamy34's
           own little icons (data: pictures) stay sharp. clip-path keeps the
           blur inside each picture's box. */
        html.s34-sfw img:not([src^="data:"]),
        html.s34-sfw video,
        html.s34-sfw canvas {
            filter: blur(24px) saturate(.6) !important;
            clip-path: inset(0) !important;
        }
        /* ...and comments: text and names (setting censorComments) - in the
           popup and on the site's own post pages */
        html.s34-sfw-text :is(.s34-cm-text, .s34-cm-user, .s34-cm-avatar, #comment-list [id^="cbody"], #comment-list .col1 a) {
            filter: blur(5px) !important;
            user-select: none;
        }
        /* "Info for a bug report" window */
        .s34-debug-win .s34-win-body { display: flex; flex-direction: column; gap: 12px; }
        .s34-debug-text {
            margin: 0;
            padding: 10px 12px;
            max-height: 44vh;
            overflow: auto;
            white-space: pre-wrap;
            word-break: break-word;
            border-radius: 8px;
            border: 1px solid #2e2e36 !important;
            background-color: #121216 !important;
            color: #dcdce0 !important;
            font: 12px/1.5 ui-monospace, Consolas, monospace;
            user-select: text;
        }
        .s34-debug-how { margin: 0; font-size: 12.5px; line-height: 1.5; opacity: .85; }
        .s34-debug-foot { display: flex; justify-content: flex-end; }
        .s34-debug-foot button {
            height: 32px;
            padding: 0 18px !important;
            border-radius: 8px;
            border: none !important;
            background: linear-gradient(135deg, #ffb347, #ff5f8f) !important;
            color: #fff !important;
            font: 600 13px system-ui, -apple-system, Segoe UI, sans-serif;
            cursor: pointer;
        }
        .s34-sfw-label {
            position: fixed;
            right: 12px;
            bottom: 12px;
            z-index: 100000;
            display: inline-flex;
            align-items: center;
            gap: 7px;
            height: 28px;
            padding: 0 6px 0 11px !important;
            border-radius: 999px;
            border: 1px solid rgba(255,255,255,0.18) !important;
            background-color: rgba(18,18,22,0.9) !important;
            color: #e8e8ee !important;
            font: 600 12px system-ui, -apple-system, Segoe UI, sans-serif;
            cursor: pointer;
            box-shadow: 0 4px 14px rgba(0,0,0,0.35);
        }
        .s34-sfw-label span { color: inherit !important; }
        @media (max-width: 760px) { .s34-sfw-label { bottom: 76px; } } /* above the messages on phones */
        .s34-sfw-label kbd {
            padding: 1px 6px;
            border-radius: 4px;
            background-color: rgba(255,255,255,0.14) !important;
            color: #fff !important;
            font: 700 11px system-ui, sans-serif;
        }

        /* Ad spaces with an ad blocker on (right column, the box above the
           posts) - posts use the space */
        .s34-empty-col { display: none !important; }
        /* Until the check (ad blocker seen last time): out of the layout */
        html.s34-adcol-early .content ~ span:has(.postListSidebarRight),
        html.s34-adcol-early .content ~ .postListSidebarRight,
        html.s34-adcol-early :is(span, div):has(~ .image-list):has(ins):not([class*="s34-"]) {
            position: absolute !important;
            visibility: hidden !important;
            pointer-events: none !important;
        }

        /* Small icon buttons (popup ✕ ? Theater, message ✕, window ✕): real
           buttons for the keyboard, but without the page's button look */
        .s34-pv-top .s34-pv-iconbtn,
        .s34-pv-top .s34-pv-iconbtn:hover {
            background: transparent !important;
            margin: 0 !important;
            font: inherit;
            line-height: 1;
            cursor: pointer;
        }
        .s34-pv-top .s34-pv-close, .s34-pv-top .s34-pv-theaterbtn { border: none !important; padding: 0 6px !important; }
        .s34-pv-top .s34-pv-close { font-size: 18px; }
        .s34-pv-top .s34-pv-help { padding: 0 !important; font-size: 13px; font-weight: 800; }
        .s34-cf-panel .s34-close { border: none !important; }
        /* Keyboard focus: a clear ring (mouse clicks don't show it) */
        .s34-pv-iconbtn:focus-visible, .s34-toast-close:focus-visible, .s34-close:focus-visible,
        .s34-gear:focus-visible, .s34-blbtn:focus-visible, .s34-dl-btn:focus-visible,
        .s34-menu-btn:focus-visible, .s34-menu-list a:focus-visible {
            outline: 2px solid #b48cff !important;
            outline-offset: 2px;
        }

        /* Phones: one Menu button (on the banner) + side panel */
        html.s34-phone-menu label.tlabel { display: none !important; }
        html.s34-phone-menu #header { position: relative; }
        .s34-menu-btn {
            position: absolute;
            top: 15px;
            right: 12px;
            z-index: 60;
            width: 42px;
            height: 42px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 !important;
            border-radius: 13px !important;
            background-color: rgba(16,16,20,0.72) !important;
            border: 1px solid rgba(255,255,255,0.22) !important;
            color: #f4f4f6 !important; /* follows the colour mode (pure #fff wouldn't) */
            backdrop-filter: blur(8px);
            box-shadow: 0 4px 14px rgba(0,0,0,0.35);
            cursor: pointer;
        }
        .s34-menu-btn svg { display: block; color: inherit !important; }
        .s34-menu-btn.s34-menu-btn-fixed { position: fixed; top: 10px; right: 10px; z-index: 9990; }
        /* Steamy34's own tools: hidden, shown inside the menu panel */
        .s34-menu-tools { display: none; }
        .s34-menu .s34-menu-tools { display: flex; flex-direction: column; gap: 8px; }
        .s34-menu .s34-menu-tools > * { margin: 0 !important; }
        .s34-menu .s34-menu-tools .s34-tipslink { justify-content: space-around; }
        /* Icons on dark buttons keep the button's colour (White mode would
           otherwise paint them dark - dark on dark) */
        .s34-fav-btn svg, .s34-dl-mark svg, .s34-pv-tbar svg { color: inherit !important; }
        /* ...and the shapes inside them: the colour-mode rule paints every
           element grey, which turned favourited hearts grey instead of red */
        .s34-fav-btn svg *, .s34-pv-fav svg *, .s34-dl-mark svg *, .s34-pv-tbar svg * { color: inherit !important; }
        .s34-menu-overlay {
            position: fixed;
            inset: 0;
            z-index: 100002;
            background-color: rgba(0,0,0,0.5) !important;
            opacity: 0;
            transition: opacity .18s;
        }
        .s34-menu-overlay.s34-show { opacity: 1; }
        .s34-menu {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            width: min(320px, 86vw);
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            gap: 6px;
            padding: 14px 14px 28px;
            overflow-y: auto;
            background-color: #17161c !important;
            border-left: 1px solid rgba(255,255,255,0.08) !important;
            box-shadow: -20px 0 50px rgba(0,0,0,0.5);
            transform: translateX(100%);
            transition: transform .2s ease;
            font: 14px/1.3 system-ui, -apple-system, Segoe UI, sans-serif;
            text-align: left;
        }
        .s34-menu-overlay.s34-show .s34-menu { transform: none; }
        .s34-menu-head { display: flex; align-items: center; justify-content: space-between; padding: 2px 4px 6px; }
        .s34-menu-head b { font-size: 19px; font-weight: 800; color: #f2f2f6 !important; }
        .s34-menu .s34-menu-x {
            width: 38px; height: 38px; padding: 0 !important; border-radius: 11px;
            border: none !important; background-color: rgba(255,255,255,0.07) !important;
            color: #e8e8ee !important; font-size: 15px; cursor: pointer;
        }
        .s34-menu-label {
            margin: 12px 4px 4px;
            font-size: 10.5px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #ff8fa3 !important;
        }
        .s34-menu-list { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
        .s34-menu .s34-menu-list a {
            display: flex;
            align-items: center;
            min-height: 44px;
            padding: 0 12px;
            border-radius: 12px;
            text-decoration: none !important;
            font-weight: 600;
            overflow-wrap: anywhere;
            color: #e8e8ee !important;
            background-color: rgba(255,255,255,0.045) !important;
            border: 1px solid rgba(255,255,255,0.08) !important;
        }
        .s34-menu .s34-menu-list a:active { background-color: rgba(255,255,255,0.1) !important; }
        .s34-menu .s34-menu-list a.s34-on {
            background: linear-gradient(135deg, rgba(255,95,143,0.3), rgba(139,61,255,0.3)) !important;
            border-color: rgba(255,143,176,0.55) !important;
            color: #ffd6e6 !important;
        }

    `;

    const PHONE_CSS = `
        /* ================= PHONES ================= */
        /* No mouse: buttons that normally appear on hover are always there */
        @media (hover: none) {
            span.thumb .s34-chip .s34-chip-add,
            span.thumb .s34-chip .s34-chip-block {
                max-width: 22px; opacity: .85; padding: 0 5px 0 0 !important; transition: none;
            }
            span.thumb .s34-fav-btn { opacity: .85; }
            .s34-tile-acts { opacity: 1; }
            .image-list span.thumb:hover { transform: none; }
        }
        @media (max-width: 760px), (pointer: coarse) and (max-width: 1000px) {
            /* The sidebar doesn't stick on a small screen (it would cover the posts) */
            html body #post-list > .sidebar,
            html body .sidebar:has(+ .content .image-list),
            html body .sidebar:has(~ .content .image-list),
            html body .sidebar, html body #sidebar,
            html body .s34-sticky-top {
                position: static !important;
                top: auto !important;
            }

            /* Popup: picture on top, then buttons, info and tags, then comments -
               one page you scroll through */
            .s34-pv-overlay {
                display: flex !important;
                flex-direction: column;
                background-color: #0a0a0c !important;
                overflow-y: auto;
                overflow-x: hidden;
                overscroll-behavior: contain;
            }
            /* fully opaque in every colour mode (beats the White / OLED tints) */
            html[class] .s34-pv-overlay.s34-pv-overlay { background-color: #0a0a0c !important; }
            .s34-pv-main { display: contents; }
            .s34-pv-main > .s34-pv-stage, .s34-pv-overlay .s34-pv-stage {
                order: 1;
                flex: none;
                height: 72vh;
                height: 72svh;
                padding: 0;
                cursor: default;
                touch-action: pan-y pinch-zoom;
            }
            .s34-pv-overlay .s34-pv-stage.s34-pv-zoomed { touch-action: auto; }
            .s34-pv-overlay .s34-pv-side,
            .s34-pv-overlay.s34-pv-theater .s34-pv-side {
                order: 2;
                display: flex;
                flex: none;
                overflow: visible;
                min-height: 0;
                padding: 14px 14px 18px;
                border-right: none !important;
                border-top: 1px solid #2a2a31 !important;
            }
            .s34-pv-overlay .s34-cm-section { order: 3; flex: none; width: 100%; padding: 20px 14px 70px; }
            .s34-cm-head { flex-wrap: wrap; }
            .s34-cm-write { margin-left: 0; align-items: flex-start; }
            /* Floating buttons over the picture: previous, next, close */
            .s34-pv-overlay .s34-pv-tbar,
            .s34-pv-overlay.s34-pv-theater .s34-pv-tbar {
                display: flex;
                position: fixed;
                top: 10px;
                right: 10px;
                opacity: .92;
            }
            .s34-pv-tbar button { width: 42px; height: 42px; font-size: 20px; }
            .s34-pv-tbar [data-act="theater"], .s34-pv-theaterbtn { display: none !important; }
            .s34-pv-top .s34-pv-nav, .s34-pv-top .s34-pv-close { display: none; }
            /* Bigger tap targets */
            .s34-pv-side .s34-dl-btn.s34-inline { padding: 13px 12px; }
            .s34-pv-fav, .s34-pv-collect { height: 42px; }
            .s34-pv-chips .s34-chip { font-size: 13px; line-height: 1.9; }
            .s34-pv-chips .s34-chip .s34-chip-add, .s34-pv-chips .s34-chip .s34-chip-block { padding: 0 8px 0 4px !important; font-size: 15px; }
        }

        /* "Steamy34 on your phone" announcement + Android guide */
        .s34-mob-hero {
            position: relative;
            display: flex;
            align-items: center;
            gap: 18px;
            padding: 20px 22px;
            border-radius: 16px;
            overflow: hidden;
            background: linear-gradient(135deg, #ff5f8f 0%, #b04bff 55%, #6a3dff 100%) !important;
            color: #fff !important;
            box-shadow: 0 14px 34px rgba(139,61,255,0.35);
        }
        .s34-mob-hero::after {
            content: '';
            position: absolute;
            right: -40px; top: -60px;
            width: 220px; height: 220px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255,255,255,0.28), transparent 65%) !important;
            pointer-events: none;
        }
        .s34-mob-hero, .s34-mob-steps, .s34-mob-note, .s34-mob-foot { flex: none; }
        .s34-mob-phone { flex: none; width: 74px; height: auto; filter: drop-shadow(0 8px 14px rgba(0,0,0,0.35)); }
        .s34-mob-hero-text { position: relative; z-index: 1; min-width: 0; }
        .s34-mob-badge {
            display: inline-block;
            margin-bottom: 6px;
            padding: 1px 8px;
            border-radius: 999px;
            font: 800 10px/18px system-ui, -apple-system, Segoe UI, sans-serif;
            letter-spacing: .8px;
            text-transform: uppercase;
            background-color: rgba(255,255,255,0.22) !important;
            color: #fff !important;
        }
        .s34-mob-hero h3 { margin: 0 0 4px !important; font-size: 21px !important; font-weight: 800; line-height: 1.2; color: #fff !important; }
        .s34-mob-hero p { margin: 0 !important; font-size: 13px; line-height: 1.45; color: rgba(255,255,255,0.9) !important; }
        .s34-mob-steps { display: flex; flex-direction: column; gap: 8px; counter-reset: s34step; }
        .s34-mob-step {
            display: flex;
            gap: 12px;
            padding: 11px 13px;
            border-radius: 12px;
            background-color: rgba(255,255,255,0.04) !important;
            border: 1px solid rgba(255,255,255,0.07) !important;
        }
        .s34-mob-step::before {
            counter-increment: s34step;
            content: counter(s34step);
            flex: none;
            width: 26px; height: 26px;
            border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            font: 800 13px system-ui, -apple-system, Segoe UI, sans-serif;
            color: #fff;
            background: linear-gradient(135deg, #ff5f8f, #8b3dff);
        }
        .s34-mob-step b { display: block; font-size: 13.5px; margin-bottom: 2px; }
        .s34-mob-step span { font-size: 12.5px; line-height: 1.5; color: #c4c4cc !important; }
        .s34-mob-step em { font-style: normal; font-weight: 700; color: #e8e8ee !important; }
        .s34-mob-step.s34-mob-optional { border-style: dashed !important; }        .s34-mob-opt { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .6px; opacity: .55; margin-left: 6px; }
        .s34-mob-note {
            padding: 10px 13px;
            border-radius: 12px;
            font-size: 12px;
            line-height: 1.55;
            background-color: rgba(255,179,71,0.07) !important;
            border: 1px solid rgba(255,179,71,0.3) !important;
            color: #e8d4b4 !important;
        }
        .s34-mob-note b { color: #ffcf8a !important; }
        .s34-mob-note ul { margin: 4px 0 0 !important; padding-left: 18px !important; }
        .s34-mob-note li { list-style: disc !important; margin: 2px 0; }
        .s34-mob-note a { color: #ffcf8a !important; }
        .s34-mob-foot { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 10px; }
        .s34-win .s34-mob-backup {
            display: flex; align-items: center; gap: 6px;
            height: 34px; padding: 0 14px !important; border-radius: 10px; cursor: pointer;
            background-color: rgba(255,255,255,0.06) !important; border: 1px solid rgba(255,255,255,0.12) !important;
            color: #e8e8ee !important; font: 600 12.5px system-ui, -apple-system, Segoe UI, sans-serif;
        }
        .s34-win .s34-mob-backup:hover { border-color: #ff5f8f !important; }
        .s34-win .s34-mob-ok {
            height: 34px; padding: 0 22px !important; border-radius: 10px; border: none !important; cursor: pointer;
            background: linear-gradient(135deg, #ff5f8f, #8b3dff) !important; color: #fff !important; font-weight: 700;
        }
        @media (max-width: 520px) {
            .s34-mob-hero { flex-direction: column; text-align: center; }
        }

    `;

    const TOUR_CSS = `
        /* Welcome tour (first start, or Settings → Help → Welcome tour) */
        .s34-wel-overlay .s34-win-body { gap: 14px; }
        .s34-wel-stage { position: relative; display: flex; flex-direction: column; gap: 14px; animation: s34-wel-in .35s ease-out; }
        .s34-wel-stage.s34-wel-back { animation-name: s34-wel-in-back; }
        @keyframes s34-wel-in { from { opacity: 0; transform: translateX(26px); } to { opacity: 1; transform: none; } }
        @keyframes s34-wel-in-back { from { opacity: 0; transform: translateX(-26px); } to { opacity: 1; transform: none; } }
        .s34-wel-hero {
            position: relative;
            display: flex;
            align-items: center;
            gap: 18px;
            padding: 22px 24px;
            border-radius: 18px;
            overflow: hidden;
            background: linear-gradient(135deg, #ff5f8f 0%, #b04bff 55%, #6a3dff 100%) !important;
            color: #fff !important;
            box-shadow: 0 14px 34px rgba(139,61,255,0.35);
        }
        .s34-wel-hero::after {
            content: '';
            position: absolute;
            right: -50px; top: -70px;
            width: 240px; height: 240px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255,255,255,0.3), transparent 65%) !important;
            pointer-events: none;
        }
        .s34-wel-art {
            flex: none;
            width: 64px; height: 64px;
            border-radius: 18px;
            display: flex; align-items: center; justify-content: center;
            background-color: rgba(255,255,255,0.18) !important;
            box-shadow: inset 0 0 0 1px rgba(255,255,255,0.25);
        }
        .s34-wel-art svg { width: 34px; height: 34px; color: #fff !important; }
        .s34-wel-art img { width: 64px; height: 64px; border-radius: 18px; display: block; }
        .s34-wel-hero-text { position: relative; z-index: 1; min-width: 0; }
        .s34-wel-step {
            display: inline-block;
            margin-bottom: 5px;
            padding: 1px 8px;
            border-radius: 999px;
            font: 800 10px/18px system-ui, -apple-system, Segoe UI, sans-serif;
            letter-spacing: .8px;
            text-transform: uppercase;
            background-color: rgba(255,255,255,0.22) !important;
            color: #fff !important;
        }
        .s34-wel-hero h3 { margin: 0 0 4px !important; font-size: 22px !important; font-weight: 800; line-height: 1.2; color: #fff !important; }
        .s34-wel-hero p { margin: 0 !important; font-size: 13.5px; line-height: 1.5; color: rgba(255,255,255,0.92) !important; }
        .s34-wel-cards { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 9px; }
        .s34-wel-card {
            display: flex;
            gap: 11px;
            padding: 12px 13px;
            border-radius: 13px;
            background-color: rgba(255,255,255,0.04) !important;
            border: 1px solid rgba(255,255,255,0.07) !important;
        }
        .s34-wel-ico {
            flex: none;
            width: 30px; height: 30px;
            border-radius: 9px;
            display: flex; align-items: center; justify-content: center;
            font-size: 15px;
            background: linear-gradient(135deg, rgba(255,95,143,0.22), rgba(139,61,255,0.22)) !important;
            color: #ff8fb0 !important;
        }
        .s34-wel-ico svg { width: 16px; height: 16px; color: inherit !important; }
        .s34-wel-card b { display: block; font-size: 13px; margin-bottom: 2px; }
        .s34-wel-card span { display: block; font-size: 12px; line-height: 1.5; color: #b9b9c3 !important; }
        .s34-wel-card kbd {
            display: inline-block;
            min-width: 18px;
            padding: 0 5px;
            border-radius: 5px;
            font: 700 11px/18px system-ui, -apple-system, Segoe UI, sans-serif;
            text-align: center;
            background-color: #2a2a31 !important;
            border: 1px solid #3c3c46 !important;
            border-bottom-width: 2px !important;
            color: #f0f0f4 !important;
        }
        .s34-wel-promise { display: flex; flex-wrap: wrap; gap: 6px; }
        .s34-wel-promise span {
            padding: 4px 10px;
            border-radius: 999px;
            font-size: 12px;
            font-weight: 600;
            background-color: rgba(255,255,255,0.05) !important;
            border: 1px solid rgba(255,255,255,0.09) !important;
        }
        .s34-wel-themes { display: flex; gap: 8px; }
        .s34-win .s34-wel-themes button {
            flex: 1;
            display: flex; flex-direction: column; align-items: center; gap: 6px;
            padding: 10px 8px !important;
            border-radius: 12px;
            cursor: pointer;
            font: 700 12px system-ui, -apple-system, Segoe UI, sans-serif;
            background-color: rgba(255,255,255,0.04) !important;
            border: 1px solid rgba(255,255,255,0.1) !important;
            color: inherit !important;
        }
        .s34-win .s34-wel-themes button.s34-on { border-color: #ff5f8f !important; box-shadow: 0 0 0 1px #ff5f8f inset; }
        .s34-wel-themes i { display: block; width: 100%; height: 28px; border-radius: 7px; border: 1px solid rgba(128,128,128,0.35); }
        .s34-wel-themes svg { display: block; width: 64px; height: 44px; }
        .s34-wel-picklabel { margin: 2px 2px -4px; font-size: 11px; font-weight: 700; letter-spacing: .6px; text-transform: uppercase; opacity: .55; }
        .s34-wel-foot { display: flex; align-items: center; gap: 10px; }
        .s34-wel-dots { display: flex; gap: 6px; margin-right: auto; }
        .s34-win .s34-wel-dots button {
            width: 8px; height: 8px; padding: 0 !important;
            border-radius: 999px; border: none !important; cursor: pointer;
            background-color: rgba(255,255,255,0.2) !important;
            transition: width .25s, background-color .25s;
        }
        .s34-win .s34-wel-dots button.s34-on { width: 22px; background: linear-gradient(90deg, #ff5f8f, #8b3dff) !important; }
        .s34-win .s34-wel-btn {
            height: 34px; padding: 0 16px !important; border-radius: 10px; cursor: pointer;
            background-color: rgba(255,255,255,0.06) !important; border: 1px solid rgba(255,255,255,0.12) !important;
            color: #e8e8ee !important; font: 600 12.5px system-ui, -apple-system, Segoe UI, sans-serif;
        }
        .s34-win .s34-wel-btn:hover { border-color: #ff5f8f !important; }
        .s34-win .s34-wel-btn[hidden] { display: none; }
        .s34-win .s34-wel-next {
            height: 34px; padding: 0 22px !important; border-radius: 10px; border: none !important; cursor: pointer;
            background: linear-gradient(135deg, #ff5f8f, #8b3dff) !important; color: #fff !important;
            font: 700 13px system-ui, -apple-system, Segoe UI, sans-serif;
        }
        .s34-wel-skip { font-size: 12px; opacity: .55; cursor: pointer; background: none !important; border: none !important; color: inherit !important; padding: 0 4px !important; }
        .s34-wel-skip:hover { opacity: .9; }
        @media (max-width: 560px) {
            .s34-wel-cards { grid-template-columns: minmax(0, 1fr); }
            .s34-wel-hero { padding: 18px; gap: 14px; }
            .s34-wel-hero h3 { font-size: 19px !important; }
            .s34-wel-art { width: 52px; height: 52px; }
            .s34-wel-art img { width: 52px; height: 52px; }
            .s34-wel-foot { flex-wrap: wrap; }
            .s34-wel-dots { flex-basis: 100%; justify-content: center; margin: 0 0 4px; }
            .s34-wel-foot .s34-wel-next { margin-left: auto; }
        }
    `;

    // Modern search box (chips, filters, recent & saved)
    // Following: bell buttons, sidebar box, Manage window, the Following window
    const FOLLOW_CSS = `
        /* The bell next to artist tags (outline = follow, filled = following) */
        svg.s34-bell, svg.s34-bell * { color: inherit !important; }
        .s34-chip .s34-chip-follow {
            all: unset;
            background: transparent !important; /* beats the general button look */
            border: none !important;
            display: inline-flex;
            align-items: center;
            cursor: pointer;
            padding: 0 7px 0 1px;
            color: #b9b9c3 !important;
            opacity: .7;
        }
        .s34-chip .s34-chip-follow svg { width: 13px; height: 13px; }
        #tag-sidebar li a.r34-follow-btn svg { width: 13px; height: 13px; vertical-align: -2px; }
        .s34-bell-i svg { width: 1.05em; height: 1.05em; vertical-align: -.16em; color: #ffb347 !important; }
        .s34-follow-win .s34-follow-addbtn { display: inline-flex; align-items: center; gap: 6px; }
        .s34-follow-addbtn svg { width: 14px; height: 14px; color: #ffb347 !important; }
        .s34-chip .s34-chip-follow:hover { opacity: 1; color: #ffcf6b !important; }
        .s34-chip .s34-chip-follow.s34-following { opacity: 1; color: #ffb347 !important; }
        #tag-sidebar li a.r34-follow-btn {
            margin: 0 1px 0 4px !important;
            text-decoration: none !important;
            cursor: pointer;
            font-size: 13px;
            opacity: .7;
            color: #b9b9c3 !important;
        }
        #tag-sidebar li a.r34-follow-btn:hover { opacity: 1; color: #ffcf6b !important; }
        #tag-sidebar li a.r34-follow-btn.s34-following { opacity: 1; color: #ffb347 !important; }

        /* Sidebar: "Followed artists", one row per artist with "N new" */
        .s34-follow-box {
            box-sizing: border-box;
            width: 100%;
            margin: 14px 0 -6px;
            padding: 8px 6px 6px;
            border-radius: 8px;
            border: 1px solid #33333a !important;
            background-color: #1c1c20 !important;
            color: #dcdce0 !important;
            font: 12.5px/1.35 system-ui, -apple-system, Segoe UI, sans-serif;
        }
        .s34-tools .s34-follow-box, .s34-menu-tools .s34-follow-box { margin: 0; }
        .s34-follow-head { display: flex; align-items: center; gap: 6px; padding: 0 4px 5px; }
        .s34-follow-head svg { flex: none; width: 14px; height: 14px; color: #ffb347 !important; }
        .s34-follow-head svg * { color: inherit !important; }
        .s34-follow-head b {
            font-size: 10.5px;
            font-weight: 800;
            letter-spacing: .8px;
            text-transform: uppercase;
            color: #dcdce0 !important;
            opacity: .75;
        }
        .s34-follow-head a { margin-left: auto; font-size: 11px; color: #9a9aa6 !important; text-decoration: none !important; }
        .s34-follow-head a:hover { color: #ffb347 !important; }
        /* (the rows are real links since 3.6: :link / :visited keeps the general
           "visited link" blue from colouring artists you once searched) */
        .s34-follow-box a.s34-follow-row:is(:link, :visited) { color: #ff8a80 !important; }
        .s34-follow-box a.s34-follow-row.s34-follow-allrow:is(:link, :visited) { color: #ffcf8a !important; }
        .s34-follow-row {
            display: flex;
            align-items: center;
            gap: 6px;
            min-width: 0;
            padding: 4px 6px;
            border-radius: 5px;
            color: #ff8a80 !important;
            font-weight: 600;
            text-decoration: none !important;
        }
        .s34-follow-row span { color: inherit !important; flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .s34-follow-row:hover { background-color: #2a2a31 !important; }
        .s34-follow-row.s34-on { background-color: rgba(255,179,71,0.12) !important; }
        .s34-follow-row.s34-follow-allrow { color: #ffcf8a !important; }
        .s34-follow-chip a { text-decoration: none !important; font-weight: 600; }
        .s34-follow-chip a:hover { text-decoration: underline !important; }
        .s34-follow-chip.s34-feed-artist a { color: #ff8a80 !important; }
        .s34-follow-box small.s34-has-new, .s34-follow-chip small.s34-has-new {
            flex: none;
            padding: 0 6px;
            border-radius: 4px;
            font-size: 10.5px;
            font-weight: 700;
            line-height: 17px;
            background-color: #e0457b !important;
            color: #fff !important;
            white-space: nowrap;
        }
        .s34-follow-chip small.s34-has-new { margin-left: 4px; }
        .s34-follow-more { display: block; padding: 4px 6px 1px; font-size: 11px; color: #9a9aa6 !important; text-decoration: none !important; }
        .s34-follow-more:hover { color: #ffb347 !important; }
        .s34-follow-none { padding: 0 4px 2px; font-size: 11.5px; opacity: .6; }

        /* ---- Sidebar layout (Beta 3.3) ---- */
        /* "View" header: same small caps as "Following" */
        .s34-q-head {
            font: 800 10.5px/1.2 system-ui, -apple-system, Segoe UI, sans-serif;
            letter-spacing: .8px;
            text-transform: uppercase;
            color: #dcdce0 !important;
            opacity: .75;
            margin-bottom: 1px;
        }
        .s34-follow-box { margin: 12px 0 0; }
        /* Collections · Stats · Blacklist · Settings: one calm 2×2 block */
        .s34-dock { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px; margin: 12px 0; }
        .s34-tools .s34-dock, .s34-menu-tools .s34-dock { margin: 0; }
        .s34-dock .s34-hub { display: contents; }
        .s34-dock .s34-hub button, .s34-dock .s34-blbtn, .s34-dock .s34-gear.s34-inline {
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            justify-content: flex-start !important;
            gap: 7px !important;
            width: auto !important;
            height: 32px;
            min-width: 0;
            margin: 0 !important;
            padding: 0 9px !important;
            box-sizing: border-box;
            border-radius: 8px;
            border: 1px solid #33333a !important;
            background-color: #1c1c20 !important;
            color: #dcdce0 !important;
            font: 600 12.5px system-ui, -apple-system, Segoe UI, sans-serif !important;
            opacity: .9;
            cursor: pointer;
        }
        .s34-dock .s34-hub button:hover, .s34-dock .s34-blbtn:hover, .s34-dock .s34-gear.s34-inline:hover {
            opacity: 1; background-color: #24242a !important; border-color: #4a4a56 !important;
        }
        .s34-dock svg { flex: none; width: 15px !important; height: 15px !important; color: #b9b9c3 !important; }
        .s34-dock svg * { color: inherit !important; }
        .s34-dock .s34-hub b, .s34-dock .s34-blbtn-text b, .s34-dock .s34-gear-text {
            min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
            font: inherit !important; color: inherit !important; text-align: left;
        }
        .s34-dock .s34-hub small, .s34-dock .s34-blbtn-count { display: none !important; }
        .s34-dock .s34-blbtn-icon, .s34-dock .s34-blbtn-text { display: flex; min-width: 0; }
        /* Narrow sidebar (the real site's is ~165px): icon above the word,
           so "Collections" etc. are never cut off */
        .s34-dock { container-type: inline-size; }
        @container (max-width: 250px) {
            .s34-dock .s34-hub button, .s34-dock .s34-blbtn, .s34-dock .s34-gear.s34-inline {
                flex-direction: column !important;
                justify-content: center !important;
                gap: 3px !important;
                height: 46px;
                padding: 0 3px !important;
                font-size: 11.5px !important;
            }
            .s34-dock .s34-hub b, .s34-dock .s34-blbtn-text b, .s34-dock .s34-gear-text { text-align: center; max-width: 100%; }
        }

        /* Manage window */
        .s34-follow-win .s34-win-body { display: flex; flex-direction: column; gap: 14px; }
        .s34-follow-addrow { display: flex; gap: 8px; }
        .s34-follow-win .s34-follow-input {
            flex: 1;
            min-width: 0;
            height: 34px;
            box-sizing: border-box;
            padding: 0 12px !important;
            border-radius: 9px;
            background-color: rgba(0,0,0,0.35) !important;
            border: 1px solid rgba(255,255,255,0.12) !important;
            color: #e8e8ee !important;
            font-size: 13px;
        }
        .s34-follow-win .s34-follow-addbtn { height: 34px; }
        .s34-follow-list { display: flex; flex-direction: column; gap: 6px; max-height: 42vh; overflow-y: auto; }
        .s34-follow-chips { display: flex; flex-wrap: wrap; gap: 6px; }
        .s34-follow-chip {
            display: inline-flex;
            align-items: center;
            gap: 2px;
            padding: 2px 4px 2px 10px;
            border-radius: 999px;
            border: 1px solid rgba(255,255,255,0.14) !important;
            background-color: rgba(18,18,22,0.85) !important;
            font-size: 12.5px;
        }
        .s34-follow-chip button {
            all: unset;
            cursor: pointer;
            padding: 0 6px;
            font-size: 11px;
            opacity: .5;
            color: #dcdce0 !important;
        }
        .s34-follow-chip button:hover { opacity: 1; color: #ff6b6b !important; }
        /* "Follow which artist?" (L in the popup with several artists):
           a bell instead of the checkbox, the number key on the right */
        .s34-follow-menu .s34-cmenu-check,
        .s34-follow-menu .s34-cmenu-item.s34-on .s34-cmenu-check { border: none !important; background: transparent !important; color: #b9b9c3 !important; }
        .s34-follow-menu .s34-cmenu-item.s34-on .s34-cmenu-check { color: #ffb347 !important; }
        .s34-follow-menu .s34-cmenu-check svg { width: 15px; height: 15px; }
        .s34-follow-menu .s34-cmenu-item.s34-on .s34-cmenu-name { color: #ffcf8a !important; }
        .s34-follow-menu kbd.s34-cmenu-n {
            opacity: 1;
            min-width: 18px;
            padding: 1px 5px;
            border-radius: 4px;
            text-align: center;
            background-color: rgba(255,255,255,0.1) !important;
            color: #dcdce0 !important;
            font: 700 11px system-ui, sans-serif;
        }
        .s34-follow-empty { padding: 14px 4px; font-size: 13px; line-height: 1.55; opacity: .75; }
        .s34-follow-win .s34-follow-act, .s34-follow-win .s34-follow-addbtn {
            height: 30px;
            padding: 0 14px !important;
            border-radius: 8px;
            border: 1px solid #3a3a44 !important;
            background-color: #26262c !important;
            color: #e8e8ee !important;
            font: 600 12.5px system-ui, -apple-system, Segoe UI, sans-serif;
            cursor: pointer;
            white-space: nowrap;
        }
        .s34-follow-win .s34-follow-act:hover, .s34-follow-win .s34-follow-addbtn:hover { border-color: #ffb347 !important; }
        .s34-follow-foot { display: flex; flex-wrap: wrap; gap: 8px; justify-content: flex-end; }
        .s34-follow-win .s34-follow-act[disabled] { opacity: .4; cursor: default; }
        .s34-follow-win .s34-follow-act[hidden] { display: none !important; }
        .s34-follow-win .s34-follow-primary {
            display: inline-flex; align-items: center; gap: 6px;
            border: none !important;
            background: linear-gradient(135deg, #ffb347, #ff5f8f) !important;
            color: #fff !important;
        }
        .s34-follow-primary svg, .s34-follow-primary svg * { color: inherit !important; }
        @media (max-width: 760px) {
            .s34-chip .s34-chip-follow { padding: 0 8px 0 4px; }
            .s34-chip .s34-chip-follow svg { width: 15px; height: 15px; }
        }

        /* ---- The Following window (Beta 3.6): circles, header, grid ---- */
        html.s34-fw-open { overflow: hidden !important; }
        .s34-fw-overlay {
            position: fixed;
            inset: 0;
            z-index: 99985; /* under the popup viewer (a tile opens on top), over the page */
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
            box-sizing: border-box;
            /* nearly opaque: the page behind steps right back */
            background-color: rgba(3,3,6,0.94) !important;
        }
        .s34-fw {
            display: flex;
            flex-direction: column;
            width: min(1000px, 100%);
            height: min(920px, 100%);
            box-sizing: border-box;
            overflow: hidden;
            border-radius: 16px;
            border: 1.5px solid transparent !important;
            background: linear-gradient(#18181c, #18181c) padding-box, linear-gradient(135deg, rgba(255,95,143,0.7), rgba(139,61,255,0.7)) border-box !important;
            box-shadow: 0 30px 80px rgba(0,0,0,0.55), 0 0 30px rgba(255,95,143,0.12);
            color: #e8e8ee !important;
            font: 13px/1.4 system-ui, -apple-system, Segoe UI, sans-serif;
        }
        .s34-fw * { box-sizing: border-box; }
        /* "Bigger": nearly the whole window, with a margin of dimmed page around it */
        .s34-fw-overlay.s34-fw-large { padding: 18px 22px; }
        .s34-fw-overlay.s34-fw-large .s34-fw { width: 100%; height: 100%; }
        .s34-fw-foot .s34-fw-size { margin-left: auto; height: 26px; padding: 0 10px !important; font-size: 12px; }
        .s34-fw-top { display: flex; align-items: center; gap: 10px; padding: 10px 14px 10px 16px; border-bottom: 1px solid #2c2c33 !important; }
        .s34-fw-title { display: flex; align-items: center; gap: 8px; font-size: 15px; }
        .s34-fw-title b { color: #f2f2f5 !important; }
        .s34-fw-title svg { width: 16px; height: 16px; color: #ffb347 !important; }
        .s34-fw-checked { flex: 1; min-width: 0; font-size: 11.5px; color: #8e8e9a !important; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .s34-fw-btn {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            height: 30px;
            padding: 0 12px !important;
            border-radius: 8px;
            border: 1px solid #3a3a44 !important;
            background-color: #24242a !important;
            color: #e8e8ee !important;
            font: 600 12.5px system-ui, -apple-system, Segoe UI, sans-serif;
            text-decoration: none !important;
            white-space: nowrap;
            cursor: pointer;
        }
        .s34-fw-btn:hover { border-color: #ff5f8f !important; }
        .s34-fw-btn svg { width: 14px; height: 14px; color: inherit !important; }
        .s34-fw-btn svg * { color: inherit !important; }
        .s34-fw-x { width: 30px; justify-content: center; padding: 0 !important; }
        .s34-fw-follow.s34-following { border-color: rgba(255,179,71,0.5) !important; color: #ffb347 !important; }

        /* The row of circles (scrolls sideways) */
        .s34-fw-circles {
            display: flex;
            gap: 12px;
            flex: none;
            padding: 12px 16px 10px;
            overflow-x: auto;
            overflow-y: hidden;
            scrollbar-width: thin;
            border-bottom: 1px solid #2c2c33 !important;
        }
        .s34-fw-c {
            all: unset;
            flex: none;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 5px;
            width: 68px;
            cursor: pointer;
            text-align: center;
            background: transparent !important; /* beats the general button look */
            border: 0 !important;
        }
        .s34-fw-ring {
            display: grid;
            place-items: center;
            width: 62px;
            height: 62px;
            padding: 2.5px;
            border-radius: 50%;
            background: #3a3a44 !important;
        }
        .s34-fw-c.s34-new .s34-fw-ring { background: linear-gradient(135deg, #ffb347, #ff5f8f, #8b3dff) !important; }
        .s34-fw-c.s34-on .s34-fw-ring { outline: 2px solid #f2f2f5; outline-offset: 2px; }
        /* (the general button hover would paint a grey box behind the circle) */
        .s34-fw-c.s34-fw-c:hover, .s34-fw-c.s34-fw-c:focus, .s34-fw-c.s34-fw-c:active { background: transparent !important; border: 0 !important; }
        .s34-fw-c:focus-visible .s34-fw-ring { outline: 2px solid #ff5f8f; outline-offset: 2px; }
        .s34-fw-c.s34-gone { opacity: .45; }
        .s34-fw-pic {
            position: relative;
            display: grid;
            place-items: center;
            width: 100%;
            height: 100%;
            overflow: hidden;
            border-radius: 50%;
            border: 2.5px solid #18181c !important;
            background: linear-gradient(135deg, hsl(var(--h, 330) 62% 52%), hsl(calc(var(--h, 330) + 40) 58% 32%)) !important;
            color: #fff !important;
        }
        .s34-fw-pic img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; display: block; }
        .s34-fw-pic svg { width: 42%; height: 42%; color: #fff !important; }
        .s34-fw-pic svg * { color: inherit !important; }
        .s34-fw-allpic { background: conic-gradient(from 200deg, #ff5f8f, #8b3dff, #ffb347, #ff5f8f) !important; }
        .s34-fw-letter { font: 700 20px system-ui, -apple-system, Segoe UI, sans-serif; color: #fff !important; }
        .s34-fw-name { max-width: 68px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 11.5px; color: #a4a4b0 !important; }
        .s34-fw-c.s34-on .s34-fw-name { color: #f2f2f5 !important; font-weight: 700; }

        /* Header + grid scroll together (like a profile page) */
        .s34-fw-scroll { flex: 1; min-height: 0; overflow-y: auto; overscroll-behavior: contain; }
        .s34-fw-head { display: flex; align-items: center; gap: 18px; padding: 16px 18px; flex-wrap: wrap; }
        .s34-fw-big { flex: none; width: 76px; height: 76px; border-radius: 50%; }
        .s34-fw-big .s34-fw-pic { border-color: transparent !important; }
        .s34-fw-big .s34-fw-letter { font-size: 28px; }
        .s34-fw-info { flex: 1; min-width: 200px; display: flex; flex-direction: column; gap: 8px; }
        .s34-fw-row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .s34-fw-nm { font-size: 19px; color: #f2f2f5 !important; overflow-wrap: anywhere; }
        .s34-fw-nums { display: flex; flex-wrap: wrap; gap: 4px 18px; color: #a4a4b0 !important; font-size: 13px; font-variant-numeric: tabular-nums; }
        .s34-fw-nums b { color: #f2f2f5 !important; }
        .s34-fw-empty { padding: 30px 8px; max-width: 520px; margin: 0 auto; text-align: center; font-size: 13.5px; line-height: 1.6; color: #b9b9c3 !important; }

        /* Each post in its own shape, in rows of one height that fill the
           width (like the posts page) - newest first, left to right. --r is
           the picture's ratio (setThumbRatios); a tall guess until it's known */
        .s34-fw { --s34-fw-row: 230px; }
        .s34-fw-grid {
            display: flex;
            flex-wrap: wrap;
            align-items: flex-start;
            gap: 3px;
            padding: 0 3px 3px;
        }
        .s34-fw-grid::after { content: ''; flex-grow: 1000000000; } /* the last row doesn't stretch */
        .s34-fw-grid span.thumb {
            position: relative;
            display: block !important;
            flex-grow: calc(var(--r, 0.75) * 100);
            flex-basis: calc(var(--r, 0.75) * var(--s34-fw-row));
            aspect-ratio: var(--r, 0.75);
            max-height: calc(var(--s34-fw-row) * 1.8);
            min-width: 0;
            width: auto !important;
            height: auto !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden;
            background-color: #26262c !important;
            text-align: left;
        }
        .s34-fw-grid span.thumb > a { position: absolute; inset: 0; display: block; }
        .s34-fw-grid span.thumb img {
            display: block;
            width: 100% !important;
            height: 100% !important;
            max-width: none !important;
            max-height: none !important;
            margin: 0 !important;
            padding: 0 !important;
            border: 0 !important;
            object-fit: cover;
        }
        .s34-fw-grid span.thumb:hover img { filter: brightness(.85); }
        .s34-fw-by {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            padding: 14px 8px 5px;
            background: linear-gradient(transparent, rgba(0,0,0,0.75)) !important;
            color: #fff !important;
            font: 600 11px/1.3 system-ui, -apple-system, Segoe UI, sans-serif;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            pointer-events: none;
        }
        .s34-fw-status { display: flex; align-items: center; justify-content: center; gap: 8px; min-height: 56px; padding: 12px; color: #a4a4b0 !important; font-size: 12.5px; }
        .s34-fw-foot {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 6px 16px;
            padding: 8px 16px;
            border-top: 1px solid #2c2c33 !important;
            color: #8e8e9a !important;
            font-size: 12px;
        }
        .s34-fw-foot kbd {
            padding: 1px 6px;
            border-radius: 4px;
            border: 1px solid #3a3a44 !important;
            background-color: #24242a !important;
            color: #e8e8ee !important;
            font: 700 11px system-ui, sans-serif;
        }
        /* Phones: the whole screen, lower rows, no key hints */
        @media (max-width: 760px) {
            .s34-fw-overlay { padding: 0; }
            .s34-fw { --s34-fw-row: 140px; width: 100%; height: 100%; border-radius: 0; border: 0 !important; background: #18181c !important; }
            .s34-fw-grid { gap: 2px; padding: 0 0 2px; }
            .s34-fw-head { gap: 14px; padding: 14px; }
            .s34-fw-big { width: 64px; height: 64px; }
            .s34-fw-info { min-width: 0; }
            .s34-fw-nm { font-size: 17px; }
            .s34-fw-foot { display: none; }
            .s34-fw-top .s34-fw-btn { height: 34px; }
            .s34-fw-x { width: 34px; }
        }

        /* ---- Home: rule34's start page as a small home (Beta 3.6, 26c-home.js) ---- */
        html.s34-home-on div#static-index { display: block; text-align: left; align-items: stretch; }
        .s34-home-old { display: none !important; }
        .s34-home {
            max-width: 1180px;
            margin: 0 auto;
            padding: 18px 20px 48px;
            box-sizing: border-box;
            font: 13px/1.45 system-ui, -apple-system, Segoe UI, sans-serif;
            color: #dcdce0 !important;
        }
        .s34-home * { box-sizing: border-box; }
        .s34-home-head { display: flex; align-items: center; gap: 10px 26px; flex-wrap: wrap; margin-bottom: 16px; }
        .s34-home-head .s34-home-logo { margin: 0; line-height: 0; }
        .s34-home-head .s34-home-logo img { width: auto !important; max-width: 260px !important; max-height: 96px; height: auto; }
        .s34-home-head #links { display: flex; flex-wrap: wrap; gap: 4px 18px; font-size: 14px; }
        .s34-home-main { display: grid; grid-template-columns: minmax(0, 340px) minmax(0, 1fr); gap: 16px; align-items: start; }
        .s34-home-left { display: flex; flex-direction: column; gap: 14px; min-width: 0; }
        .s34-home-card {
            display: flex;
            flex-direction: column;
            gap: 10px;
            min-width: 0;
            padding: 14px;
            border-radius: 12px;
            border: 1px solid #2c2c33 !important;
            background-color: #101014 !important;
        }
        .s34-home-card[hidden] { display: none !important; }
        .s34-home-label {
            font: 800 10.5px/1.2 system-ui, -apple-system, Segoe UI, sans-serif;
            letter-spacing: .8px;
            text-transform: uppercase;
            color: #9a9aa6 !important;
        }
        .s34-home-search .space, .s34-home-search form { margin: 0; }
        /* Recent and favourite tags have their own card here (the bell needs a search) */
        .s34-home .s34-sb-tools { display: none !important; }
        .s34-home-resume { flex-direction: row; align-items: center; gap: 12px; }
        .s34-home-resume-text { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 1px; }
        .s34-home-resume-text b { font-size: 14px; color: #f2f2f5 !important; overflow-wrap: anywhere; }
        .s34-home-resume-text small { font-size: 12px; color: #9a9aa6 !important; }
        .s34-home-btn {
            flex: none;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            height: 30px;
            padding: 0 12px !important;
            border-radius: 8px;
            border: 1px solid #3a3a44 !important;
            background-color: #24242a !important;
            color: #e8e8ee !important;
            font: 600 12.5px system-ui, -apple-system, Segoe UI, sans-serif;
            text-decoration: none !important;
            white-space: nowrap;
            cursor: pointer;
        }
        .s34-home-btn:hover { border-color: #ff5f8f !important; }
        .s34-home-btn[hidden] { display: none !important; }
        .s34-home-btn kbd { padding: 0 5px; border-radius: 4px; border: 1px solid #3a3a44 !important; background-color: #18181c !important; color: #e8e8ee !important; font: 700 11px system-ui, sans-serif; }
        .s34-home-chips { display: flex; flex-wrap: wrap; gap: 6px; }
        .s34-home a.s34-home-recent-item:is(:link, :visited) {
            max-width: 100%;
            padding: 4px 10px;
            border-radius: 8px;
            border: 1px solid #2c2c33 !important;
            background-color: #17171b !important;
            color: #c9c9d2 !important;
            font-size: 12px;
            text-decoration: none !important;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .s34-home a.s34-home-recent-item:hover { border-color: #3a6fd4 !important; color: #f2f2f5 !important; }
        .s34-home .s34-home-fav-chip {
            padding: 2px 10px !important;
            border-radius: 999px;
            border: 1px solid #34508c !important;
            background-color: #1f2a44 !important;
            color: #cfe0ff !important;
            font: 600 12px/20px system-ui, -apple-system, Segoe UI, sans-serif;
            cursor: pointer;
        }
        .s34-home .s34-home-fav-chip:hover { border-color: #3a6fd4 !important; }
        .s34-home .s34-home-fav-chip.s34-on { border-color: #3a6fd4 !important; background-color: rgba(44,95,204,0.45) !important; }
        /* The post count as text, Terms · Contact · DMCA below it */
        .s34-home-meta { display: flex; flex-direction: column; gap: 6px; padding: 0 4px; font-size: 11.5px; color: #8e8e9a !important; }
        .s34-home-meta p { margin: 0; }
        .s34-home-meta small { font-size: 11px; line-height: 1.6; }
        /* The site's own welcome line, under the following card */
        .s34-home-right { display: flex; flex-direction: column; gap: 12px; min-width: 0; }
        .s34-home-tagline:empty { display: none; }
        .s34-home-tagline > div {
            padding: 8px 10px;
            border-left: 2px solid #ff5f8f !important;
            border-radius: 0 8px 8px 0;
            background-color: rgba(255,95,143,0.07) !important;
            font-size: 13px;
            line-height: 1.5;
            font-weight: 500;
            color: #e8e8ee !important;
        }
        .s34-home-meta small a { margin-right: 10px; }
        .s34-home-follow-head { display: flex; align-items: center; gap: 10px; }
        .s34-home-follow-head .s34-home-label { flex: 1; min-width: 0; }
        .s34-home-new { flex: none; padding: 0 7px; border-radius: 4px; background-color: #e0457b !important; color: #fff !important; font: 700 11px/19px system-ui, sans-serif; }
        /* room for the selected circle's ring (the row scrolls sideways and
           would cut it off) */
        .s34-home .s34-home-circles { padding: 6px 6px 4px; margin: -6px -6px 0; border: 0 !important; }
        .s34-home .s34-fw-pic { border-color: #101014 !important; }
        .s34-home-grid { --s34-fw-row: 170px; padding: 0; border-radius: 10px; overflow: hidden; }
        .s34-home-status { display: flex; align-items: center; gap: 8px; font-size: 12.5px; line-height: 1.5; color: #a4a4b0 !important; }
        .s34-home-status:empty { display: none; }
        /* Brand new (nothing followed yet): three steps instead of the circles */
        .s34-home-start { gap: 12px; }
        .s34-home-start-title { margin: 0; font: 700 18px/1.3 system-ui, -apple-system, Segoe UI, sans-serif; color: #f2f2f5 !important; }
        .s34-home-steps { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
        .s34-home-steps li { display: flex; gap: 12px; align-items: flex-start; padding: 10px 12px; border-radius: 10px; border: 1px solid #24242b !important; background-color: #14141a !important; }
        .s34-home-steps b { display: block; font-size: 13.5px; color: #f2f2f5 !important; }
        .s34-home-steps small { display: block; font-size: 12.5px; line-height: 1.5; color: #a4a4b0 !important; }
        .s34-home-step-ico { flex: none; width: 32px; height: 32px; border-radius: 9px; display: grid; place-items: center; font-size: 15px; background: linear-gradient(135deg, rgba(255,95,143,0.22), rgba(139,61,255,0.22)) !important; color: #ffcf8a !important; }
        .s34-home-bell svg { width: 16px; height: 16px; color: #ffb347 !important; }
        .s34-home-start-btns { display: flex; flex-wrap: wrap; gap: 8px; }
        .s34-home .s34-home-primary { border: 0 !important; background: linear-gradient(135deg, #ff5f8f, #8b3dff) !important; color: #fff !important; }
        /* Phones: one column - search, following, continue, recent */
        @media (max-width: 760px) {
            .s34-home { padding: 12px 12px 36px; }
            .s34-home-head { justify-content: center; text-align: center; }
            .s34-home-head .s34-home-logo img { max-width: 220px !important; max-height: 80px; }
            .s34-home-head #links { justify-content: center; }
            .s34-home-main { display: flex; flex-direction: column; align-items: stretch; gap: 12px; }
            .s34-home-search .space, .s34-home-search form, .s34-home-search .s34-sb { width: 100% !important; max-width: none !important; }
            .s34-home-grid span.thumb:nth-child(n+9) { display: none !important; } /* 8 here - all of them in the window */
            .s34-home-left { display: contents; }
            .s34-home-search { order: 1; }
            .s34-home-follow { order: 2; }
            .s34-home-resume { order: 3; }
            .s34-home-recent { order: 4; }
            .s34-home-meta { order: 6; text-align: center; }
            .s34-home-right { display: contents; }
            .s34-home-tagline { order: 5; }
            .s34-home-grid { --s34-fw-row: 120px; }
        }
    `;
    const SEARCH_CSS = `
        .s34-sb { width: 100%; box-sizing: border-box; font: 12px/1.4 system-ui, -apple-system, Segoe UI, sans-serif; }
        .s34-sb-box {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 4px;
            min-height: 32px;
            padding: 4px 26px 4px 4px;
            position: relative;
            box-sizing: border-box;
            border-radius: 8px;
            cursor: text;
            background-color: #18181c !important;
            border: 1px solid #3a3a44 !important;
        }
        .s34-sb-box:focus-within { border-color: #3a6fd4 !important; }
        .s34-sb-pills { display: contents; }
        .s34-sb-box .s34-ac-wrap { flex: 1 1 70px; width: auto; min-width: 70px; }
        .s34-sb .s34-sb-input {
            width: 100%;
            min-width: 0;
            box-sizing: border-box;
            border: none !important;
            outline: none !important;
            background: transparent !important;
            padding: 3px 4px !important;
            font: inherit;
            font-size: 13px;
            color: #e8e8ec !important;
        }
        .s34-sb .s34-ac-list { min-width: 200px; }
        .s34-sb .s34-sb-clear {
            position: absolute;
            top: 6px;
            right: 4px;
            border: none !important;
            background: transparent !important;
            padding: 0 4px !important;
            cursor: pointer;
            font-size: 12px;
            opacity: .5;
            color: inherit !important;
        }
        .s34-sb .s34-sb-clear:hover { opacity: 1; color: #ff6b6b !important; }

        /* Tag chips inside the box */
        .s34-pill {
            display: inline-flex;
            align-items: center;
            max-width: 100%;
            box-sizing: border-box;
            border-radius: 999px;
            padding: 1px 2px 1px 8px;
            font-weight: 600;
            background-color: rgba(255,255,255,0.06) !important;
            border: 1px solid rgba(138,180,248,0.45) !important;
            color: #8ab4f8 !important;
        }
        .s34-pill-artist    { color: #ff8a80 !important; border-color: rgba(255,138,128,0.5) !important; }
        .s34-pill-character { color: #7ee07e !important; border-color: rgba(126,224,126,0.5) !important; }
        .s34-pill-copyright { color: #d68cff !important; border-color: rgba(214,140,255,0.5) !important; }
        .s34-pill-metadata  { color: #ffb86b !important; border-color: rgba(255,184,107,0.5) !important; }
        .s34-pill.s34-pill-ex {
            border-style: dashed !important;
            border-color: rgba(255,80,80,0.75) !important;
            background-color: rgba(255,60,60,0.10) !important;
        }
        .s34-pill.s34-pill-ex .s34-pill-text { text-decoration: line-through; }
        .s34-pill-text { cursor: pointer; overflow-wrap: anywhere; }
        .s34-sb .s34-pill-x {
            border: none !important;
            background: transparent !important;
            padding: 0 5px 0 4px !important;
            margin: 0;
            cursor: pointer;
            font-size: 13px;
            line-height: 1;
            opacity: .55;
            color: inherit !important;
        }
        .s34-sb .s34-pill-x:hover { opacity: 1; color: #ff6b6b !important; }

        /* Everything stacked with even spacing, never wider than the sidebar */
        .s34-sb { display: flex; flex-direction: column; gap: 8px; max-width: 100%; }
        .s34-sb > * { min-width: 0; }

        /* Filters: tidy 2 x 2 grid */
        .s34-sb-filters {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 6px;
        }
        .s34-sb-filter { display: flex; flex-direction: column; gap: 2px; min-width: 0; margin: 0 !important; }
        .s34-sb-filter-top { display: flex; align-items: center; justify-content: space-between; min-height: 16px; }
        .s34-sb-filter-top > span {
            font-size: 9.5px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: .8px;
            opacity: .5;
            padding-left: 2px;
        }
        /* Pin: keep this filter for every new search */
        .s34-sb .s34-pin {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 18px;
            height: 16px;
            padding: 0 !important;
            border: none !important;
            border-radius: 4px;
            background: transparent !important;
            color: #9a9aa3 !important;
            cursor: pointer;
            opacity: .45;
            transition: opacity .12s;
        }
        .s34-sb .s34-pin svg { display: block; transform: rotate(35deg); }
        .s34-sb-filter:hover .s34-pin { opacity: .8; }
        .s34-sb .s34-pin:hover { opacity: 1; color: #8ab4f8 !important; }
        .s34-sb .s34-pin.s34-on { opacity: 1; color: #ffb347 !important; }
        .s34-sb .s34-pin.s34-on svg { fill: currentColor; transform: none; }
        .s34-sb-filter.s34-pinned .s34-sb-filter-top > span { opacity: .9; color: #ffb347 !important; }
        /* "pinned" / "paused" sits right next to the pin it belongs to */
        .s34-sb .s34-pin.s34-on { width: auto; gap: 3px; padding: 0 1px 0 3px !important; }
        .s34-sb .s34-pin.s34-on::before { content: 'pinned'; font: 500 10px/1 system-ui, -apple-system, Segoe UI, sans-serif; color: inherit; white-space: nowrap; }
        .s34-sb .s34-sb-filter.s34-pinned select,
        .s34-sb .s34-sb-filter.s34-pinned select.s34-sb-set { border-color: #c98a2e !important; color: #ffcf8a !important; }
        .s34-sb .s34-sb-filter select {
            width: 100%;
            min-width: 0;
            height: 26px;
            box-sizing: border-box;
            padding: 0 4px !important;
            margin: 0 !important;
            border-radius: 6px;
            font-size: 12px;
            cursor: pointer;
            background-color: #18181c !important;
            border: 1px solid #3a3a44 !important;
        }
        .s34-sb .s34-sb-filter select.s34-sb-set {
            border-color: #3a6fd4 !important;
            color: #8ab4f8 !important;
        }

        /* Favourite tags */
        .s34-ft {
            display: flex;
            flex-direction: column;
            gap: 6px;
            padding: 8px;
            border-radius: 8px;
            background-color: #18181c !important;
            border: 1px solid #2e2e36 !important;
        }
        .s34-ft-head { display: flex; align-items: center; justify-content: space-between; }
        .s34-ft-head > span {
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: .8px;
            opacity: .6;
        }
        .s34-sb .s34-ft-edit {
            padding: 0 6px !important;
            border: none !important;
            background: transparent !important;
            color: #8ab4f8 !important;
            font-size: 11px;
            cursor: pointer;
        }
        .s34-sb .s34-ft-edit[hidden] { display: none; }
        .s34-ft-chips { display: flex; flex-wrap: wrap; gap: 4px; }
        .s34-ft-hint { font-size: 11px; font-style: italic; opacity: .55; }
        .s34-ft-chip {
            display: inline-flex;
            align-items: center;
            max-width: 100%;
            border-radius: 999px;
            font-weight: 600;
            font-size: 11.5px;
            line-height: 20px;
            background-color: rgba(255,255,255,0.04) !important;
            border: 1px solid rgba(138,180,248,0.4) !important;
            color: #8ab4f8 !important;
        }
        .s34-ft-name { padding: 0 8px; cursor: pointer; overflow-wrap: anywhere; }
        .s34-ft-chip:hover { background-color: rgba(255,255,255,0.09) !important; }
        /* Already in the search: filled */
        .s34-ft-chip.s34-ft-in {
            background-color: rgba(44,95,204,0.35) !important;
            border-color: #3a6fd4 !important;
        }
        .s34-ft-chip.s34-ft-in .s34-ft-name::before { content: '✓ '; }
        /* Excluded: red, crossed out */
        .s34-ft-chip.s34-ft-out { border: 1px dashed rgba(255,80,80,0.75) !important; background-color: rgba(255,60,60,0.10) !important; }
        .s34-ft-chip.s34-ft-out .s34-ft-name { text-decoration: line-through; }
        .s34-sb .s34-ft-x {
            border: none !important;
            background: transparent !important;
            padding: 0 6px 0 0 !important;
            cursor: pointer;
            font-size: 13px;
            line-height: 1;
            opacity: .6;
            color: inherit !important;
        }
        .s34-sb .s34-ft-x:hover { opacity: 1; color: #ff6b6b !important; }
        .s34-ft-add { display: none; }
        .s34-ft.s34-ft-editing .s34-ft-add { display: block; }
        .s34-sb .s34-ft-input {
            width: 100%;
            height: 26px;
            box-sizing: border-box;
            padding: 0 7px !important;
            border-radius: 6px;
            font-size: 12px;
            background-color: #111114 !important;
            border: 1px solid #3a3a44 !important;
        }

        /* Search button (the site's own, moved under the filters) */
        .s34-sb .s34-sb-submit {
            display: block !important;            /* the site's phone layout hides its own */
            visibility: visible !important;
            position: static !important;
            opacity: 1 !important;
            width: 100% !important;
            height: 30px;
            box-sizing: border-box;
            margin: 0 !important;
            border-radius: 8px;
            border: 1px solid #2f5fbf !important;
            background-color: #2c5fcc !important;
            color: #fff !important;
            font: 600 13px system-ui, -apple-system, Segoe UI, sans-serif;
            cursor: pointer;
        }
        .s34-sb .s34-sb-submit:hover { background-color: #3a6fd4 !important; }

        /* 🕘 Recent · ★ Tags · 🔔 (follow this search) - one list opens below */
        .s34-sb-tools {
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
            gap: 6px;
        }
        .s34-sb .s34-sb-tools .s34-sb-btn { display: inline-flex; align-items: center; justify-content: center; gap: 5px; padding: 0 6px !important; }
        .s34-sb .s34-sb-tools .s34-sb-btn > span { min-width: 0; overflow: hidden; text-overflow: ellipsis; }
        .s34-sb .s34-sb-tools .s34-sb-btn svg { flex: none; opacity: .75; }
        .s34-sb .s34-sb-tools .s34-sb-btn svg * { color: inherit !important; }
        .s34-sb .s34-sb-tools .s34-sb-btn.s34-sb-open svg { opacity: 1; color: #8ab4f8 !important; }
        .s34-sb .s34-ft[hidden], .s34-sb .s34-sb-menu[hidden] { display: none !important; }
        /* Narrow sidebar (the real site's is ~165px): words only, no icons */
        .s34-sb-tools { container-type: inline-size; }
        @container (max-width: 215px) {
            .s34-sb .s34-sb-tools .s34-sb-btn svg { display: none; }
            .s34-sb .s34-sb-tools .s34-sb-btn { padding: 0 4px !important; }
        }
        .s34-sr { position: absolute !important; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
        .s34-sb .s34-sb-btn {
            min-width: 0;
            height: 26px;
            box-sizing: border-box;
            padding: 0 8px !important;
            margin: 0 !important;
            border-radius: 6px;
            cursor: pointer;
            font-size: 12px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: left;
            background-color: #18181c !important;
            border: 1px solid #3a3a44 !important;
        }
        /* The site's "search options" gear (phone layout): hidden - it
           covered the Steamy34 search box and only unfolded a heading */
        #displayOptsLink { display: none !important; }
        .s34-sb .s34-sb-btn:hover { border-color: #3a6fd4 !important; }
        .s34-sb-caret { display: inline-block; width: 11px; opacity: .7; }
        .s34-sb .s34-sb-btn.s34-sb-open { border-color: #3a6fd4 !important; }
        .s34-sb-menu {
            margin-top: -2px;
            padding: 6px;
            max-height: 50vh;
            overflow-y: auto;
            border-radius: 8px;
            background-color: #1c1c20 !important;
            border: 1px solid #33333a !important;
        }
        .s34-sb-menu[hidden] { display: none !important; }
        /* Recent · Tags as small menus next to the sidebar (Beta 3.6), like
           "Follow which artist?" */
        .s34-sb .s34-sb-pop {
            position: fixed;
            z-index: 100004;
            margin: 0;
            max-height: min(60vh, 520px);
            overflow-y: auto;
            box-sizing: border-box;
            padding: 8px;
            border-radius: 10px;
            background-color: #1c1c20 !important;
            border: 1px solid #3a3a44 !important;
            box-shadow: 0 12px 32px rgba(0,0,0,0.55);
        }
        /* the add field right under the title (its suggestions then drop over the tags) */
        .s34-sb-pop .s34-ft-add { order: 1; }
        .s34-sb-pop .s34-ft-chips { order: 2; }
        /* Phones: a sheet from the bottom over the dimmed page - bigger to tap,
           swipe it down (or tap the page, or Back) to close */
        .s34-sb .s34-sb-pop.s34-sb-sheet {
            top: auto;
            left: 0;
            right: 0;
            bottom: 0;
            width: auto;
            max-height: 72vh;
            padding: 24px 14px calc(16px + env(safe-area-inset-bottom, 0px));
            border-radius: 16px 16px 0 0;
            border-bottom: 0 !important;
            overscroll-behavior: contain;
            box-shadow: 0 -10px 40px rgba(0,0,0,0.6);
            animation: s34-sheet-up .22s ease-out;
        }
        .s34-sb-pop.s34-sb-sheet::before {
            content: '';
            position: absolute;
            top: 8px;
            left: 50%;
            width: 40px;
            height: 4px;
            margin-left: -20px;
            border-radius: 2px;
            background-color: #4a4a56 !important;
        }
        @keyframes s34-sheet-up { from { transform: translateY(100%); } to { transform: none; } }
        .s34-sheet-backdrop {
            position: fixed;
            inset: 0;
            z-index: 100003;
            background-color: rgba(0,0,0,0.5) !important;
            animation: s34-sheet-fade .2s ease-out;
        }
        @keyframes s34-sheet-fade { from { opacity: 0; } }
        html.s34-sheet-open { overflow: hidden !important; }
        .s34-sb-sheet .s34-sb-item-main { padding: 9px 8px; font-size: 14px; }
        .s34-sb .s34-sb-sheet .s34-sb-item-del { padding: 0 12px !important; font-size: 15px; }
        .s34-sb-sheet .s34-sb-menu-head, .s34-sb-sheet .s34-ft-head > span { font-size: 11px; }
        .s34-sb .s34-sb-sheet .s34-sb-clear-recent { height: 36px; font-size: 13px; }
        .s34-sb-sheet .s34-ft-chips { gap: 7px; }
        .s34-sb-sheet .s34-ft-chip { font-size: 13.5px; line-height: 32px; }
        .s34-sb-sheet .s34-ft-name { padding: 0 13px; }
        .s34-sb .s34-sb-sheet .s34-ft-edit { font-size: 13px; padding: 4px 8px !important; }
        .s34-sb .s34-sb-sheet .s34-ft-input { height: 38px; font-size: 15px; }
        @media (prefers-reduced-motion: reduce) { .s34-sb-pop.s34-sb-sheet, .s34-sheet-backdrop { animation: none; } }
        .s34-sb-menu-head {
            padding: 2px 5px 6px;
            font-size: 10.5px;
            font-weight: 800;
            letter-spacing: .8px;
            text-transform: uppercase;
            opacity: .6;
        }
        .s34-sb-menu h5 {
            margin: 4px 2px 3px !important;
            font-size: 10px !important;
            text-transform: uppercase;
            letter-spacing: 1px;
            opacity: .6;
        }
        .s34-sb-item { display: flex; align-items: center; border-radius: 5px; }
        .s34-sb-item:hover { background-color: #2e2e36 !important; }
        .s34-sb-item-main { flex: 1; min-width: 0; padding: 3px 5px; cursor: pointer; }
        .s34-sb-item-label, .s34-sb-item-sub { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .s34-sb-item-sub { font-size: 10.5px; opacity: .55; }
        .s34-sb .s34-sb-item-del {
            border: none !important;
            background: transparent !important;
            cursor: pointer;
            opacity: .4;
            padding: 0 5px !important;
            color: inherit !important;
        }
        .s34-sb .s34-sb-item-del:hover { opacity: 1; color: #ff6b6b !important; }
        .s34-sb-empty { padding: 2px 5px 4px; opacity: .5; font-style: italic; }
        .s34-sb .s34-sb-clear-recent { display: block; width: 100%; margin-top: 5px; }
    `;

    const SETTINGS_CSS = `
        .s34-gear {
            position: fixed;
            right: 14px;
            bottom: 14px;
            z-index: 99998;
            cursor: pointer;
            opacity: .6;
            transition: opacity .15s, transform .2s;
            user-select: none;
            filter: drop-shadow(0 3px 8px rgba(0,0,0,0.6));
        }
        .s34-gear img {
            display: block;
            height: 44px;
            width: auto;
            pointer-events: none;
        }
        .s34-gear:hover { opacity: 1; transform: scale(1.08); }

        /* Download button (single post pages), sits above the logo button */
        .s34-dl-btn {
            position: fixed;
            right: 14px;
            bottom: 76px;
            z-index: 99998;
            padding: 8px 14px;
            border-radius: 999px;
            border: 1px solid #2f5fbf !important;
            background-color: #2f5fbf !important;
            color: #fff !important;
            font: 600 13px/1 system-ui, -apple-system, Segoe UI, sans-serif;
            cursor: pointer;
            user-select: none;
            box-shadow: 0 4px 14px rgba(0,0,0,0.5);
            opacity: .8;
            transition: opacity .15s, transform .15s;
        }
        .s34-dl-btn:hover { opacity: 1; transform: translateY(-1px); }

        /* Sidebar versions (single post pages) */
        .s34-tools {
            display: flex;
            flex-direction: column;
            gap: 8px;
            margin: 12px 0;
            width: 100%;
            box-sizing: border-box;
        }
        .s34-tools .s34-gear.s34-inline { margin: 0; }

        /* Single post page: search + Download + Settings stay at the top */
        .s34-sticky-top {
            position: sticky;
            top: 0;
            z-index: 60;
            padding: 8px 0 2px;
            background-color: #1c1c20 !important;
            box-shadow: 0 10px 12px -10px rgba(0,0,0,0.6);
        }
        .s34-sticky-top .s34-tools { margin: 10px 0 8px; }
        /* The sidebar must be as tall as the page for sticky to work
           (only its height changes, never its width) */
        .sidebar:has(.s34-sticky-top), #sidebar:has(.s34-sticky-top) {
            align-self: stretch !important;
        }
        .s34-dl-btn.s34-inline {
            position: static;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            box-sizing: border-box;
            padding: 10px 12px;
            border-radius: 8px;
            opacity: .9;
            box-shadow: none;
        }
        /* "⬇ Download [B]" with a small second line */
        .s34-dl-btn { flex-wrap: wrap; text-align: center; }
        .s34-dl-btn .s34-dl-main { font-weight: 700; }
        .s34-dl-btn .s34-dl-sub {
            flex-basis: 100%;
            margin-top: 4px;
            font-size: 10.5px;
            font-weight: 500;
            line-height: 1.2;
            opacity: .8;
            color: #fff !important; /* white on the coloured button in every mode */
        }
        .s34-dl-btn:not(.s34-inline) .s34-dl-sub { display: none; } /* floating button stays small */
        /* Already downloaded: green, still clickable to download again */
        .s34-dl-btn.s34-dl-done {
            background-color: #1f7a3e !important;
            border-color: #1f7a3e !important;
        }
        /* ✓ in the corner of thumbnails you already downloaded */
        .s34-dl-mark {
            position: absolute;
            top: 6px;
            right: 6px;
            z-index: 3;
            width: 24px;
            height: 24px;
            box-sizing: border-box;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgba(31,122,62,0.92) !important;
            color: #fff !important;
            font: 700 13px/1 system-ui, sans-serif;
            box-shadow: 0 1px 4px rgba(0,0,0,0.45);
            cursor: pointer; /* a click still opens the post */
        }
        /* Viewed (not downloaded): grey eye - same size as ♥ and the download mark */
        .s34-dl-mark.s34-seen-mark {
            background-color: rgba(20,20,24,0.8) !important;
        }
        /* Label on hover: "Viewed" / "Downloaded" */
        .s34-dl-mark svg { display: block; width: 14px; height: 14px; pointer-events: none; }
        .s34-dl-mark::after {
            content: attr(data-label);
            position: absolute;
            top: 50%;
            right: calc(100% + 5px);
            transform: translateY(-50%);
            padding: 3px 7px;
            border-radius: 5px;
            white-space: nowrap;
            background-color: rgba(20,20,24,0.92);
            color: #fff;
            font: 600 11px/1.2 system-ui, -apple-system, Segoe UI, sans-serif;
            opacity: 0;
            pointer-events: none;
            transition: opacity .12s;
        }
        .s34-dl-mark:hover::after { opacity: 1; }
        .s34-dl-btn kbd {
            display: inline-block;
            margin-left: 6px;
            padding: 2px 6px;
            border-radius: 4px;
            background-color: rgba(255,255,255,0.2) !important;
            color: #fff !important;
            font: bold 11px/1.2 monospace;
        }

        .s34-hotkey { cursor: pointer; text-align: center; font-weight: bold; width: 110px !important; }

        /* Slim "⚙ Settings" button in the sidebar (posts page, single posts) */
        .s34-gear.s34-inline {
            position: static;
            box-sizing: border-box;
            flex: none !important;
            align-self: flex-start;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 7px;
            margin: 12px 0;
            padding: 7px 10px;
            border-radius: 8px;
            border: 1px solid #33333a !important;
            background-color: #1c1c20 !important;
            color: #dcdce0 !important;
            opacity: .85;
            filter: none;
        }
        .s34-gear.s34-inline:hover { opacity: 1; transform: none; background-color: #24242a !important; }
        .s34-gear.s34-inline svg { display: block; flex: none; color: inherit !important; }
        .s34-gear.s34-inline svg * { color: inherit !important; }
        .s34-gear.s34-inline span { font-weight: 600; font-size: 13px; color: #dcdce0 !important; }
        /* Small line with the logo and the installed version (not a button) */
        .s34-brand {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            margin: -8px 0 14px;
            font: 600 11px/1.2 system-ui, -apple-system, Segoe UI, sans-serif;
            color: #dcdce0 !important;
            opacity: .5;
            user-select: none;
        }
        .s34-brand img { display: block; width: 16px; height: 16px; border-radius: 4px; }
        .s34-brand small { font-size: 11px; font-weight: 400; color: inherit !important; }
        .s34-tools .s34-brand, .s34-menu-tools .s34-brand { margin: 0; }
        .s34-overlay {
            position: fixed;
            inset: 0;
            z-index: 99999;
            background-color: rgba(0,0,0,0.55) !important;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        /* A window that opened the popup viewer (a collection) waits invisibly
           underneath, scroll position kept, until the popup closes */
        .s34-overlay.s34-under-popup { visibility: hidden !important; }
        .s34-panel {
            width: min(560px, calc(100vw - 32px));
            max-height: calc(100vh - 48px);
            display: flex;
            flex-direction: column;
            background-color: #18181c !important;
            color: #dcdce0 !important;
            border: 1px solid #33333a !important;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.6);
            font: 13px/1.4 system-ui, -apple-system, Segoe UI, sans-serif;
        }
        .s34-panel * { color: #dcdce0 !important; }
        .s34-panel input:not([type="checkbox"]), .s34-panel select {
            background-color: #26262c !important;
            border: 1px solid #3a3a42 !important;
            border-radius: 4px;
        }
        .s34-panel input[type="checkbox"] { accent-color: #2f5fbf; }
        .s34-panel-head, .s34-panel-foot {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 14px 18px;
            border-color: #2c2c33 !important;
        }
        .s34-panel-head { border-bottom: 1px solid #2c2c33; }
        .s34-panel-head h2 { margin: 0; font-size: 16px; flex: 1; }
        .s34-panel-head img { height: 40px; width: auto; display: block; }        .s34-panel-foot { border-top: 1px solid #2c2c33; justify-content: flex-end; }
        .s34-btn {
            padding: 6px 14px;
            border-radius: 6px;
            border: 1px solid #3a3a42 !important;
            background-color: #26262c !important;
            cursor: pointer;
        }
        .s34-btn:hover { background-color: #303038 !important; }
        .s34-btn.s34-primary { background-color: #2f5fbf !important; border-color: #2f5fbf !important; }
        .s34-btn.s34-primary:hover { background-color: #3a6fd4 !important; }
        .s34-btn.s34-link { background-color: transparent !important; border-color: transparent !important; opacity: .7; margin-right: auto; }
        .s34-close { font-size: 20px; cursor: pointer; opacity: .6; padding: 0 4px; }
        .s34-close:hover { opacity: 1; }
    `;

    // Posts page only - single posts keep their tags (needed for B and blocking)
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

    // =====================================================================
    //  COLOUR MODES
    //  Everything is designed dark. White and OLED are made from it by
    //  converting every colour in the style sheet:
    //   - White: dark greys -> light greys/white, light text -> dark text,
    //            pale accent colours (tag colours, links) a bit deeper.
    //   - OLED:  dark greys -> true black (borders stay visible).
    //  Things that sit on top of pictures (labels, ♥, marks, tag bars on
    //  thumbnails, the theater buttons…) and floating dark bars keep their
    //  dark look in every mode.
    // =====================================================================
    const KEEP_DARK_RE = /s34-(sfw-label|badge|info|dl-mark|seen-mark|fav-btn|new-badge|bl-label|tagbar|chip|hover|loading|load|pv-tbar|cf-pill|cf-inline|cf-why|batch|fw-by)|span\.thumb\.s34-(selected|was)|s34-selecting/;

    function rgbToHsl(r, g, b) {
        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        const l = (max + min) / 2;
        if (max === min) return [0, 0, l];
        const d = max - min;
        const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        let h;
        if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
        else if (max === g) h = (b - r) / d + 2;
        else h = (r - g) / d + 4;
        return [h / 6, s, l];
    }

    function hslToRgb(h, s, l) {
        if (s === 0) { const v = Math.round(l * 255); return [v, v, v]; }
        const hue = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        return [hue(p, q, h + 1 / 3), hue(p, q, h), hue(p, q, h - 1 / 3)].map(v => Math.round(v * 255));
    }

    // One colour -> its White / OLED version (null = leave it as it is)
    function themeColor(r, g, b, hasAlpha, theme) {
        const [h, s, l] = rgbToHsl(r, g, b);
        const neutral = s < 0.2;
        let l2 = l;
        if (theme === 'oled') {
            if (!neutral || l >= 0.4) return null;
            l2 = Math.max(0, l - 0.09);
        } else {
            if (r === 255 && g === 255 && b === 255 && !hasAlpha) return null; // white text on coloured buttons
            if (neutral) l2 = l >= 0.5 ? (1 - l) * 0.9 : 1 - l * 0.6;
            else if (l > 0.65 && s > 0.3) l2 = l - 0.32;
            else return null;
        }
        return hslToRgb(h, neutral ? Math.min(s, 0.12) : s, Math.min(1, Math.max(0, l2)));
    }

    function recolorCss(css, theme) {
        const COLOR_RE = /#([0-9a-f]{6}|[0-9a-f]{3})\b|rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)/gi;
        const fix = decls => decls.replace(COLOR_RE, (m, hex, r, g, b, a) => {
            let rgb;
            if (hex) {
                const x = hex.length === 3 ? hex.split('').map(c => c + c).join('') : hex;
                rgb = [0, 2, 4].map(i => parseInt(x.slice(i, i + 2), 16));
            } else {
                rgb = [+r, +g, +b];
            }
            const out = themeColor(rgb[0], rgb[1], rgb[2], a != null, theme);
            if (!out) return m;
            return a != null ? `rgba(${out[0]},${out[1]},${out[2]},${a})`
                             : '#' + out.map(v => v.toString(16).padStart(2, '0')).join('');
        });
        // Each innermost "selector { … }" block; keep-dark ones are skipped
        return css.replace(/([^{}]*)\{([^{}]*)\}/g, (m, sel, decls) =>
            KEEP_DARK_RE.test(sel) || /^\s*(\d+%|from|to)\s*$/.test(sel) ? m : sel + '{' + fix(decls) + '}')
            .replace(/color-scheme:\s*dark/g, theme === 'white' ? 'color-scheme: light' : 'color-scheme: dark');
    }

    // Hand-tuned spots the converter can't judge
    const THEME_FIX_CSS = {
        white: `
            html.s34-theme-white #navbar li a:hover, html.s34-theme-white #subnavbar li a:hover { color: #1d1f24 !important; }
            html.s34-theme-white .s34-cm-user, html.s34-theme-white .s34-cm-head h3,
            html.s34-theme-white .s34-auto-sec, html.s34-theme-white .s34-tipslink button:hover { color: #1d1f24 !important; }
            html.s34-theme-white .s34-set-head h2, html.s34-theme-white .s34-set-nav nav button:hover,
            html.s34-theme-white .s34-set .s34-set-advbtn:hover { color: #1d1f24 !important; }
            html.s34-theme-white .s34-tips kbd {
                color: #1d1f24 !important;
                background-color: #fff !important;
                border-color: #cfd3dc !important;
                box-shadow: 0 2px 0 rgba(0,0,0,0.12);
            }
            /* Tag bubbles in the popup sidebar (on thumbnails they stay dark) */
            html.s34-theme-white .s34-pv-chips .s34-chip { background-color: #fff !important; border-color: #d3d6de !important; }
            html.s34-theme-white .s34-pv-chips .s34-chip-artist    .s34-chip-name { color: #c62828 !important; }
            html.s34-theme-white .s34-pv-chips .s34-chip-character .s34-chip-name { color: #2e7d32 !important; }
            html.s34-theme-white .s34-pv-chips .s34-chip-copyright .s34-chip-name { color: #7b1fa2 !important; }
            html.s34-theme-white .s34-pv-chips .s34-chip-general   .s34-chip-name { color: #1a56c4 !important; }
            html.s34-theme-white .s34-pv-chips .s34-chip-metadata  .s34-chip-name { color: #b35c00 !important; }
            html.s34-theme-white .s34-pv-chips .s34-chip-count { color: #555a66 !important; }
            /* + / ⊘ / bell on the popup's white tag bubbles: deeper colours */
            html.s34-theme-white .s34-pv-chips .s34-chip-add { color: #2e7d32 !important; }
            html.s34-theme-white .s34-pv-chips .s34-chip-add[data-state="in"] { color: #b35c00 !important; }
            html.s34-theme-white .s34-pv-chips .s34-chip-add[data-state="out"] { color: #1a56c4 !important; }
            html.s34-theme-white .s34-pv-chips .s34-chip-block { color: #c62828 !important; }
            html.s34-theme-white .s34-pv-chips .s34-chip-follow { color: #6b6f7a !important; }
            html.s34-theme-white .s34-chip-follow.s34-following,
            html.s34-theme-white #tag-sidebar li a.r34-follow-btn.s34-following { color: #d97800 !important; }
            html.s34-theme-white .s34-follow-box a.s34-follow-row.s34-follow-allrow:is(:link, :visited) { color: #b35c00 !important; }
            html.s34-theme-white .s34-follow-menu .s34-cmenu-item.s34-on .s34-cmenu-check { color: #d97800 !important; }
            html.s34-theme-white .s34-follow-menu .s34-cmenu-item.s34-on .s34-cmenu-name { color: #8a4a00 !important; }
            html.s34-theme-white .s34-sb .s34-pin.s34-on { color: #b35c00 !important; }
            /* Score and the "child posts" notice in the popup */
            html.s34-theme-white .s34-pv-score { color: #8a6100 !important; }
            html.s34-theme-white .s34-pv-notice { color: #7a4300 !important; }
            /* Light page behind pictures in the popup */
            html.s34-theme-white .s34-pv-overlay { background-color: rgba(238,240,244,0.97) !important; }
            html.s34-theme-white .s34-overlay { background-color: rgba(30,32,40,0.35) !important; }
            html.s34-theme-white .s34-stat-tile b { -webkit-text-fill-color: transparent; }
            html.s34-theme-white ::-webkit-scrollbar-thumb { background: #c5c8d0 !important; }
        `,
        oled: `
            html.s34-theme-oled, html.s34-theme-oled body { background: #000 !important; }
            html.s34-theme-oled .s34-pv-overlay { background-color: rgba(0,0,0,0.98) !important; }
            html.s34-theme-oled ::-webkit-scrollbar-thumb { background: #222 !important; }
        `,
        dark: ''
    };

    function injectStyles() {
        const style = document.createElement('style');
        style.id = 'steamy34-styles';
        let css =
            DARK_CSS +
            (CONFIG.thumbGrid ? GRID_CSS : '') + CORE_CSS +
            BUTTON_CSS + AC_CSS + (CONFIG.searchChips ? SEARCH_CSS : '') + SETTINGS_CSS +
            // the big extras block, in its original order (src\06a-06i)
            EXTRA_CSS + WINDOWS_CSS + CONTROLS_CSS + POPUP_SIDE_CSS + COLLECTIONS_CSS +
            POPUP_INFO_CSS + MISC_CSS + PHONE_CSS + TOUR_CSS + FOLLOW_CSS +
            (CONFIG.hideListTags && !isPostView ? HIDE_LIST_TAGS_CSS : '') +
            (!isPostView ? LIST_SIDEBAR_CSS : '') +
            (CONFIG.postTagChips && isPostView ? POST_TAGS_CSS : '');
        if (CONFIG.theme !== 'dark') css = recolorCss(css, CONFIG.theme) + THEME_FIX_CSS[CONFIG.theme];
        style.textContent = css;
        (document.head || document.documentElement).appendChild(style);
    }
    injectStyles();

    // Screenshot mode (20d) was on? Blur from the very first moment
    try {
        if (GM_getValue('steamy34_sfw', false) === true) {
            document.documentElement.classList.add('s34-sfw');
            if (CONFIG.censorComments) document.documentElement.classList.add('s34-sfw-text');
        }
    } catch (e) {}

    // An ad blocker was found last time? Then the right ad column steps aside
    // from the very first moment (checked again once the page is there - it
    // comes back if no ad blocker is found; see foldEmptyAdColumn)
    try {
        if (!isPostView && GM_getValue('steamy34_adblock_seen', false) === true) {
            document.documentElement.classList.add('s34-adcol-early');
        }
    } catch (e) {}

    // Give each thumbnail its aspect ratio (--r) for the justified layout
    // thumbs (here and below): only these - e.g. a freshly loaded page;
    // without it, every thumbnail on the page
    const pageThumbs = () => document.querySelectorAll('.image-list span.thumb');

    function setThumbRatios(thumbs) {
        (thumbs || pageThumbs()).forEach(thumb => {
            if (thumb.dataset.s34Ratio) return;
            const img = thumb.querySelector('img');
            if (!img) return;
            thumb.dataset.s34Ratio = '1';

            const apply = () => {
                const w = img.naturalWidth || parseInt(img.getAttribute('width'), 10);
                const h = img.naturalHeight || parseInt(img.getAttribute('height'), 10);
                if (w && h) {
                    // Clamp extreme panoramas / tall strips so rows stay sane
                    const r = Math.min(Math.max(w / h, 0.4), 3);
                    thumb.style.setProperty('--r', r.toFixed(4));
                }
            };

            if (img.complete && img.naturalWidth) apply();
            else img.addEventListener('load', apply, { once: true });
        });
    }

    function thumbTags(img) {
        const text = img.dataset.s34Tags || img.title || img.alt || '';
        return ' ' + text.toLowerCase().replace(/\s+/g, ' ') + ' ';
    }

    // Remove the tag tooltip on hover: move the title into a data attribute
    // (so badge/video detection can still read it) and drop the title itself
    function removeTagTooltips(thumbs) {
        (thumbs || document.querySelectorAll('.image-list span.thumb, .thumb')).forEach(thumb => {
            thumb.querySelectorAll('[title]').forEach(el => {
                if (!el.dataset.s34Tags) el.dataset.s34Tags = el.getAttribute('title');
                el.removeAttribute('title');
            });
        });
        const main = document.querySelector('#image[title]');
        if (main) main.removeAttribute('title');
    }
    function isVideoThumb(img) {
        // the site marks video thumbnails with "webm-thumb" – also catches videos without a video tag
        return img.classList.contains('webm-thumb') || /\s(video|webm|mp4|animated_video)\s/.test(thumbTags(img));
    }

    // VIDEO / GIF labels on thumbnails, based on the tags in the image title
    function addThumbBadges(thumbs) {
        (thumbs || pageThumbs()).forEach(thumb => {
            if (thumb.querySelector('.s34-badge')) return;
            const img = thumb.querySelector('img');
            if (!img) return;

            const tags = thumbTags(img);
            let label = '';
            let cls = '';
            if (isVideoThumb(img)) { label = '▶ VID'; cls = 's34-video'; }
            else if (/\s(animated|gif|animated_gif)\s/.test(tags)) { label = 'GIF'; cls = 's34-gif'; }
            if (!label) return;

            const badge = document.createElement('span');
            badge.className = 's34-badge ' + cls;
            badge.textContent = label;
            thumb.appendChild(badge);
        });
    }

    // =====================================================================
    //  SHARED HELPERS
    // =====================================================================

    // Real tag name for one sidebar <li>
    function getTagFromRow(row) {
        let tag = '';

        // 1. Wiki link ("?") contains the real tag name
        const wikiLink = row.querySelector('a[href*="page=wiki"][href*="search="]');
        if (wikiLink) {
            try { tag = new URL(wikiLink.href).searchParams.get('search') || ''; } catch (e) {}
        }

        // 2. Post-search link
        if (!tag) {
            const tagLink = row.querySelector('a[href*="tags="]');
            if (tagLink) {
                try {
                    tag = (new URL(tagLink.href).searchParams.get('tags') || '')
                        .trim().split(/\s+/)[0];
                } catch (e) {}
            }
        }

        // 3. Visible text, excluding the ? + - controls
        if (!tag) {
            const link = Array.from(row.querySelectorAll('a')).find(a => {
                const t = a.textContent.trim();
                return t && !['?', '+', '-'].includes(t);
            });
            if (link) tag = link.textContent.trim().replace(/\s+/g, '_');
        }

        return tag.trim();
    }

    function getTags(type) {
        const result = [];
        document.querySelectorAll(`#tag-sidebar li.tag-type-${type}`).forEach(row => {
            const tag = getTagFromRow(row);
            if (tag && !result.includes(tag)) result.push(tag);
        });
        return result;
    }

    function getOriginalUrl() {
        const link = Array.from(document.querySelectorAll('a'))
            .find(a => /original\s*image/i.test(a.textContent));
        if (link && link.href) return link.href;

        const video = document.querySelector('#gelcomVideoPlayer source, video source');
        if (video && video.src) return video.src;

        return null;
    }

    // =====================================================================
    //  1. DOWNLOAD WITH TAGS (press B)
    // =====================================================================

    function clean(text) {
        return String(text)
            .replace(/\s+/g, '_')
            .replace(/[<>:"/\\|?*\x00-\x1F]/g, '')
            .replace(/_+/g, '_')
            .replace(/^[._]+|[. _]+$/g, '');
    }

    function formatGroup(tags, fallback) {
        if (!tags.length) return fallback;
        const shown = tags.slice(0, CONFIG.maxTagsPerGroup).map(clean).filter(Boolean);
        if (tags.length > CONFIG.maxTagsPerGroup) shown.push('etc');
        const joined = shown.join(CONFIG.tagJoiner);
        return CONFIG.wrapInBrackets ? `[${joined}]` : joined;
    }

    function getOriginalFilename(url) {
        try {
            const name = decodeURIComponent(new URL(url).pathname.split('/').pop());
            if (name && name.includes('.')) return clean(name);
        } catch (e) {}
        return 'original_file.jpg';
    }

    // "Size: 1920x1080" from a post page's info list -> "1920x1080" ('' if not there)
    function readPostSize(doc) {
        const li = Array.from(doc.querySelectorAll('#stats li')).find(l => /^\s*Size\s*:/i.test(l.textContent));
        const text = li ? li.textContent : ((doc.querySelector('#stats') || {}).textContent || '');
        const m = text.match(/Size:?\s*(\d+)\s*[x×]\s*(\d+)/i);
        return m ? m[1] + 'x' + m[2] : '';
    }

    // File name: Character_Copyright_Artist_Resolution.ext
    //   e.g. amelie_lacroix_overwatch_someartist_1920x1080.jpg
    // tagsByType: optional { copyright: [], character: [], artist: [] }
    // (the popup viewer passes the post's tags; otherwise the page's sidebar is read)
    // size: "1920x1080" (left out if unknown)
    // postId: the post number (bracket style adds it as " #1234567" if fileNamePostId is on)
    function buildFilename(url, tagsByType, size, postId) {
        const tagsOf = type => tagsByType ? (tagsByType[type] || []) : getTags(type);
        if (CONFIG.fileNameStyle !== 'classic') return buildBracketFilename(url, tagsOf, postId);
        const sep = CONFIG.groupSeparator;
        const prefixParts = [
            formatGroup(tagsOf('character'), 'Unknown_Character'),
            formatGroup(tagsOf('copyright'), 'Unknown_Copyright'),
            formatGroup(tagsOf('artist'), 'Unknown_Artist')
        ];
        const ext = ((getOriginalFilename(url).match(/\.[a-z0-9]{2,5}$/i) || ['.jpg'])[0]).toLowerCase();
        const res = clean(String(size || '').replace(/\s*[×x]\s*/i, 'x'));
        const tail = (res ? sep + res : '') + ext;

        let prefix = prefixParts.join(sep);
        const budget = CONFIG.maxFilenameLength - tail.length;
        if (prefix.length > budget) {
            prefix = prefix.slice(0, Math.max(0, budget)).replace(/[_+\[\]]+$/, '');
        }
        return (prefix || 'rule34') + tail;
    }

    // Bracket style (default): [character, character] [series] [artist].ext
    //   e.g. [judy alvarez, panam palmer] [cyberpunk 2077] [someartist].jpg
    // Spaces instead of _, no resolution. A missing group stays as [] so the
    // order is always clear (only empty groups at the end are left out).
    // Other tools may read these names - keep the format.
    function bracketTag(t) {
        return String(t)
            .replace(/_/g, ' ')
            .replace(/[<>:"/\\|?*\x00-\x1F,]/g, ' ')   // not allowed in file names, comma = separator
            .replace(/\[/g, '(').replace(/\]/g, ')')
            .replace(/\s+/g, ' ')
            .trim()
            .replace(/[. ]+$/, '');
    }

    // Tidier names (Beta 1.7): rule34 lists costume and fan versions as extra characters
    // ("nyl widowmaker", "lifeguard pharah" next to "widowmaker", "pharah") and companies
    // as series ("blizzard entertainment"). Those are left out of the name.
    const NAME_SKIP_SERIES = new Set([
        'blizzard entertainment', 'cd projekt red', 'riot games', 'nintendo', 'capcom', 'square enix', 'bioware',
        'ubisoft', 'naughty dog', 'sega', 'konami', 'bandai namco', 'koei tecmo', 'team ninja', 'respawn entertainment',
        'larian studios', 'activision', 'electronic arts', 'sony', 'playstation', 'xbox', 'microsoft', 'netflix',
        'disney', 'lucasfilm', 'shift up', 'sandfall interactive', 'quantic dream', 'square enix', 'warner bros', 'dc comics'
    ]);

    // "Lara Croft (Survivor)" -> "lara croft", "Baldur's Gate 3" -> "baldurs gate 3"
    function nameKey(t) {
        return String(t).toLowerCase().replace(/\([^)]*\)/g, ' ').replace(/['’`´]/g, '').replace(/&/g, ' and ')
            .replace(/[^a-z0-9]+/g, ' ').trim().replace(/^the (?=\S)/, '');
    }

    function tidyNameGroup(list, type) {
        let keys = list.map(nameKey);
        let out = list.filter((t, i) => keys[i] && keys.indexOf(keys[i]) === i);   // "lara croft (survivor)" after "lara croft"
        if (type === 'copyright') {
            const series = out.filter(t => !NAME_SKIP_SERIES.has(nameKey(t)));
            if (series.length) out = series;                                      // keep a company if it's all there is
        }
        keys = out.map(nameKey);
        if (type === 'character')   // "nyl widowmaker" when "widowmaker" is there
            out = out.filter((t, i) => !keys.some((o, j) => j !== i && keys[i].endsWith(' ' + o)));
        if (type === 'copyright')   // "call of duty warzone" when "call of duty" is there
            out = out.filter((t, i) => !keys.some((o, j) => j !== i && keys[i].startsWith(o + ' ')));
        return out;
    }

    function buildBracketFilename(url, tagsOf, postId) {
        const ext = ((getOriginalFilename(url).match(/\.[a-z0-9]{2,5}$/i) || ['.jpg'])[0]).toLowerCase();
        const idPart = CONFIG.fileNamePostId && /^\d+$/.test(String(postId || '')) ? ' #' + postId : '';
        const groups = ['character', 'copyright', 'artist'].map(type =>
            tidyNameGroup(Array.from(new Set(tagsOf(type).map(bracketTag).filter(Boolean))), type).slice(0, CONFIG.maxTagsPerGroup));
        const make = () => {
            let last = groups.length;
            while (last > 0 && !groups[last - 1].length) last--;
            return groups.slice(0, last).map(g => '[' + g.join(', ') + ']').join(' ');
        };
        let name = make();
        // Too long: drop tags from the end of the biggest group (never cut a name in half)
        while (name.length + idPart.length + ext.length > CONFIG.maxFilenameLength) {
            const big = groups.reduce((a, b) => (b.length > a.length ? b : a));
            if (big.length > 1) big.pop();
            else { name = name.slice(0, CONFIG.maxFilenameLength - idPart.length - ext.length); break; }
            name = make();
        }
        return (name || 'rule34') + idPart + ext;
    }

    function saveBlob(blob, filename) {
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = filename;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(blobUrl), 60000);
    }

    // ---- Downloaded posts are remembered (post id -> time) ----
    const DOWNLOADED_KEY = 'steamy34_downloaded';
    const DOWNLOADED_LIMIT = 50000;
    let downloaded = null;
    // If reading the stored list ever fails, nothing is saved over it
    // (saving would replace your whole history with an almost empty list)
    let downloadedUnreadable = false;

    function loadDownloaded() {
        try {
            const v = GM_getValue(DOWNLOADED_KEY, {});
            downloadedUnreadable = false;
            downloaded = v && typeof v === 'object' ? v : {};
        } catch (e) { downloaded = {}; downloadedUnreadable = true; }
        return downloaded;
    }

    function isDownloaded(id) {
        if (!id) return false;
        return !!(downloaded || loadDownloaded())[id];
    }

    function postIdFrom(url) {
        try { return new URL(url, location.href).searchParams.get('id') || ''; } catch (e) { return ''; }
    }

    function thumbPostId(thumb) {
        const a = thumb.querySelector('a[href*="id="]');
        return (a && postIdFrom(a.getAttribute('href'))) || (thumb.id || '').replace(/^s/, '');
    }

    // info (optional): { thumb, tags: { artist, character, copyright } } for the history
    function rememberDownload(id, info) {
        if (id) touchedNow.add(id);
        if (!id || !CONFIG.trackDownloads) return;
        addDlHistory(id, info);
        loadDownloaded(); // fresh copy (another tab may have added some)
        downloaded[id] = Date.now();
        const ids = Object.keys(downloaded);
        if (ids.length > DOWNLOADED_LIMIT) {
            ids.sort((a, b) => downloaded[a] - downloaded[b])
               .slice(0, ids.length - DOWNLOADED_LIMIT)
               .forEach(k => delete downloaded[k]);
        }
        if (!downloadedUnreadable) GM_setValue(DOWNLOADED_KEY, downloaded);
        bumpMarksRev();
        showDownloadedState();
    }

    // Change counter for the downloaded / viewed lists (see the focus handler)
    const MARKS_REV_KEY = 'steamy34_marks_rev';
    let marksRevSeen = (() => { try { return GM_getValue(MARKS_REV_KEY, 0); } catch (e) { return 0; } })();
    function bumpMarksRev() {
        marksRevSeen = Date.now();
        GM_setValue(MARKS_REV_KEY, marksRevSeen);
    }

    // Download buttons: "⬇ Download" or "✓ Downloaded"
    // Download button: "⬇ Download [B]" with "Original · maximum resolution"
    // underneath (or "✓ Downloaded" once you have it)
    function downloadButtonHtml() {
        return '<span class="s34-dl-main">⬇ Download</span><kbd></kbd>' +
               '<span class="s34-dl-sub">Original file · maximum resolution</span>';
    }

    function styleDownloadButton(btn, done) {
        if (!btn) return;
        btn.classList.toggle('s34-dl-done', done);
        const main = btn.querySelector('.s34-dl-main');
        const sub = btn.querySelector('.s34-dl-sub');
        if (main) main.textContent = done ? '✓ Downloaded' : '⬇ Download';
        if (sub) sub.textContent = done ? 'Click to download the original again' : 'Original file · maximum resolution';
        btn.title = done ? 'Already downloaded – click to download it again'
                         : 'Download the original file in maximum resolution, with tags in the filename';
    }

    // ---- Viewed posts are remembered too (opened as page or popup) ----
    const VIEWED_KEY = 'steamy34_viewed';
    const VIEWED_LIMIT = 30000;
    let viewed = null;
    let viewedUnreadable = false; // same protection as for downloads

    function loadViewed() {
        try {
            const v = GM_getValue(VIEWED_KEY, {});
            viewedUnreadable = false;
            viewed = v && typeof v === 'object' ? v : {};
        } catch (e) { viewed = {}; viewedUnreadable = true; }
        return viewed;
    }

    function isViewed(id) {
        if (!id) return false;
        return !!(viewed || loadViewed())[id];
    }

    // Posts opened/downloaded since this page loaded: never hidden by the
    // "Hide viewed / downloaded" switches (they'd vanish under your cursor)
    const touchedNow = new Set();

    // Viewed posts are noted in memory right away and saved a moment later
    // in one go (saving the whole list on every click was slow)
    const viewedPending = {};
    let viewedSaveTimer = null;

    function rememberView(id) {
        if (id) touchedNow.add(id);
        if (!id || !CONFIG.trackViewed) return;
        if (!viewed) loadViewed();
        viewed[id] = viewedPending[id] = Date.now();
        clearTimeout(viewedSaveTimer);
        viewedSaveTimer = setTimeout(saveViewed, 1500);
    }

    function saveViewed() {
        viewedSaveTimer = null;
        if (!Object.keys(viewedPending).length) return;
        loadViewed(); // fresh copy: another tab may have added some
        Object.assign(viewed, viewedPending);
        Object.keys(viewedPending).forEach(k => delete viewedPending[k]);
        const ids = Object.keys(viewed);
        if (ids.length > VIEWED_LIMIT) {
            ids.sort((a, b) => viewed[a] - viewed[b])
               .slice(0, ids.length - VIEWED_LIMIT)
               .forEach(k => delete viewed[k]);
        }
        if (!viewedUnreadable) GM_setValue(VIEWED_KEY, viewed);
        bumpMarksRev();
    }
    // Don't lose the last few when the page is left
    window.addEventListener('pagehide', () => { if (viewedSaveTimer) { clearTimeout(viewedSaveTimer); saveViewed(); } });

    // Marks every place that shows a post: thumbnails, popup, post page.
    // Thumbnails: green ✓ = downloaded, eye = viewed (and slightly faded).
    // thumbs: only these (e.g. the one just opened); default: all on the page
    function showDownloadedState(thumbs) {
        if (!CONFIG.trackDownloads && !CONFIG.trackViewed) return;
        (thumbs || document.querySelectorAll('.image-list span.thumb')).forEach(thumb => {
            if (!thumb) return;
            const id = thumb._s34Id || (thumb._s34Id = thumbPostId(thumb));
            const done = CONFIG.trackDownloads && isDownloaded(id);
            const seen = CONFIG.trackViewed && (done || isViewed(id));
            thumb.classList.toggle('s34-was-downloaded', done);
            thumb.classList.toggle('s34-was-viewed', seen);
            thumb.classList.toggle('s34-touched-now', touchedNow.has(id));
            const want = done ? 'dl' : seen ? 'seen' : '';
            let mark = thumb.querySelector('.s34-dl-mark');
            if (!want) { if (mark) mark.remove(); return; }
            if (!mark) {
                mark = document.createElement('span');
                // Clicking the icon opens the post like the thumbnail does
                mark.addEventListener('click', e => {
                    e.preventDefault();
                    e.stopPropagation();
                    const a = thumb.querySelector('a[href]');
                    if (a) a.click();
                });
                thumb.appendChild(mark);
            }
            if (mark.dataset.kind !== want) {
                mark.dataset.kind = want;
                mark.className = 's34-dl-mark' + (want === 'seen' ? ' s34-seen-mark' : '');
                // Download icon (arrow into a tray) / eye icon
                mark.innerHTML = want === 'dl'
                    ? '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M4 17v3h16v-3"/></svg>'
                    : '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>';
                mark.dataset.label = want === 'dl' ? 'Downloaded' : 'Viewed';
            }
        });
        if (!CONFIG.trackDownloads) return;
        if (isPostView) {
            styleDownloadButton(document.querySelector('.s34-dl-btn:not([data-act])'), isDownloaded(params.get('id')));
        }
        if (popupState) {
            styleDownloadButton(popupState.overlay.querySelector('.s34-dl-btn'), isDownloaded(postIdFrom(popupState.postUrl)));
        }
    }

    // Downloads in another tab show up here when you come back
    // ...but only if another tab actually changed something: a tiny "change
    // counter" is compared first, the big lists are only read when it moved.
    window.addEventListener('focus', () => {
        if (!CONFIG.trackDownloads && !CONFIG.trackViewed) return;
        let rev = 0;
        try { rev = GM_getValue(MARKS_REV_KEY, 0); } catch (e) {}
        if (rev === marksRevSeen) return;
        marksRevSeen = rev;
        loadDownloaded();
        loadViewed();
        showDownloadedState();
    });

    // Save a file under the given name. Resolves true/false.
    // First the proven way: load the file, then save it under the tag name
    // (works everywhere, incl. private windows and phones). Only if that
    // fails, Tampermonkey's own downloader gets a try - it can't always
    // keep our file name, so it's just the backup. Both give up after a
    // while instead of hanging forever.
    const DL_TIMEOUT_MS = 2 * 60000;       // pictures
    const DL_BIG_TIMEOUT_MS = 10 * 60000;  // videos (big files take a while)

    // ---- Own download folder (Settings → Downloads → "Choose folder…") ----
    // The browser's folder picker (File System Access) lets Steamy34 write
    // straight into any folder you pick – e.g. Eagle's watch folder. Works in
    // Chrome / Edge / Brave on computers (Brave: brave://flags/#file-system-access-api).
    // The folder itself is kept in this site's IndexedDB (the browser can't
    // store it anywhere else); its name in Tampermonkey (FOLDER_NAME_KEY).
    // The browser asks once per session whether Steamy34 may write there.
    const FOLDER_NAME_KEY = 'steamy34_dlfolder';
    let folderHandle;   // undefined = not loaded yet, null = none

    function folderPickerAvailable() {
        return typeof window.showDirectoryPicker === 'function' && !isPhoneLayout();
    }

    function folderDb() {
        return new Promise((resolve, reject) => {
            const req = indexedDB.open('steamy34', 1);
            req.onupgradeneeded = () => req.result.createObjectStore('handles');
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });
    }

    async function folderDbDo(mode, fn) {
        const db = await folderDb();
        return new Promise((resolve, reject) => {
            const req = fn(db.transaction('handles', mode).objectStore('handles'));
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });
    }

    async function getFolderHandle() {
        if (!folderPickerAvailable() || !GM_getValue(FOLDER_NAME_KEY, '')) return null;
        if (folderHandle === undefined) {
            try { folderHandle = (await folderDbDo('readonly', s => s.get('dlFolder'))) || null; } catch (e) { folderHandle = null; }
        }
        return folderHandle;
    }

    // Opens the browser's folder picker. Resolves the folder name (throws if cancelled).
    async function chooseDownloadFolder() {
        const h = await window.showDirectoryPicker({ id: 'steamy34-downloads', mode: 'readwrite' });
        await folderDbDo('readwrite', s => s.put(h, 'dlFolder'));
        folderHandle = h;
        GM_setValue(FOLDER_NAME_KEY, h.name);
        return h.name;
    }

    function clearDownloadFolder() {
        folderHandle = null;
        try { GM_deleteValue(FOLDER_NAME_KEY); } catch (e) {}
        folderDbDo('readwrite', s => s.delete('dlFolder')).catch(() => {});
    }

    // ask: show the browser's "allow editing?" question if needed (only works
    // right after a key press / click – which a download always starts with)
    async function folderAllowed(h, ask) {
        const opts = { mode: 'readwrite' };
        let state = 'denied';
        try { state = await h.queryPermission(opts); } catch (e) {}
        if (state === 'prompt' && ask) {
            try { state = await h.requestPermission(opts); } catch (e) {}
        }
        return state === 'granted';
    }

    // Writes the file; an existing name gets " (1)", " (2)" … Resolves the name used.
    async function writeToFolder(h, filename, blob) {
        const dot = filename.lastIndexOf('.');
        const base = dot > 0 ? filename.slice(0, dot) : filename;
        const ext = dot > 0 ? filename.slice(dot) : '';
        let name = filename;
        for (let i = 1; i < 500; i++) {
            try {
                await h.getFileHandle(name);              // exists -> try the next number
            } catch (e) {
                if (e && e.name === 'NotFoundError') break;
                if (!e || e.name !== 'TypeMismatchError') throw e;   // a folder with that name: next number
            }
            name = base + ' (' + i + ')' + ext;
        }
        const file = await h.getFileHandle(name, { create: true });
        const out = await file.createWritable();
        await out.write(blob);
        await out.close();
        return name;
    }

    // The "Download folder" row in Settings → Downloads
    function buildFolderControl(ctl, id) {
        ctl.textContent = '';
        if (!folderPickerAvailable()) {
            const note = document.createElement('small');
            note.className = 's34-folder-note';
            note.textContent = isPhoneLayout() ? 'Not on phones – downloads go to Downloads.'
                : navigator.brave ? 'Brave: turn on brave://flags/#file-system-access-api, restart Brave and reload this page.'
                : 'Not available in this browser (works in Chrome, Edge and Brave) – downloads go to Downloads.';
            ctl.appendChild(note);
            return;
        }
        const name = GM_getValue(FOLDER_NAME_KEY, '');
        const label = document.createElement('span');
        label.className = 's34-folder-name';
        label.textContent = name ? '📁 ' + name : 'Downloads (normal)';
        label.title = name ? 'Downloads are written into this folder' : 'No own folder – files go to your browser\'s download folder';
        const pick = document.createElement('button');
        pick.type = 'button';
        pick.id = id;
        pick.className = 's34-set-btn';
        pick.textContent = name ? 'Change…' : 'Choose folder…';
        pick.addEventListener('click', () => {
            chooseDownloadFolder()
                .then(n => { showToast('Downloads now go into "' + n + '".'); buildFolderControl(ctl, id); })
                .catch(e => { if (!e || e.name !== 'AbortError') showToast('Couldn\'t use that folder: ' + (e && e.message || e)); });
        });
        ctl.append(label, pick);
        if (name) {
            const clear = document.createElement('button');
            clear.type = 'button';
            clear.className = 's34-set-btn';
            clear.textContent = 'Remove';
            clear.title = 'Back to the normal Downloads folder';
            clear.addEventListener('click', () => { clearDownloadFolder(); showToast('Downloads go to Downloads again.'); buildFolderControl(ctl, id); });
            ctl.appendChild(clear);
        }
    }

    let folderAskShown = false;

    async function saveUrlAs(url, filename, referer) {
        const video = /\.(mp4|webm|mkv|mov)(\?|$)/i.test(url);
        const timeout = video ? DL_BIG_TIMEOUT_MS : DL_TIMEOUT_MS;
        const folder = await getFolderHandle().catch(() => null);
        if (folder) {
            // Ask now, while the key press still counts
            if (await folderAllowed(folder, true)) {
                const blob = await fetchBlob(url, referer, timeout);
                if (!blob) return false;
                try {
                    const name = await writeToFolder(folder, filename, blob);
                    console.log('[Steamy34] Saved into folder "' + folder.name + '":', name);
                    return true;
                } catch (e) {
                    console.error('[Steamy34] Writing into the folder failed:', e);
                    showToast('Couldn\'t write into the folder "' + folder.name + '" (' + (e && e.message || e) + ') – saved to Downloads instead.');
                    try { saveBlob(blob, filename); return true; } catch (e2) { return false; }
                }
            }
            if (!folderAskShown) {
                folderAskShown = true;
                showToast('Steamy34 may not write into "' + folder.name + '" yet – this one went to Downloads.', 'Allow folder', () => {
                    folderAllowed(folder, true).then(ok => showToast(ok ? 'Folder allowed – the next downloads go into "' + folder.name + '".' : 'Not allowed – downloads keep going to Downloads.'));
                }, 15000);
            }
        }
        return saveViaBlob(url, filename, referer, timeout).then(ok => {
            if (ok || typeof GM_download !== 'function') return ok;
            console.log('[Steamy34] Trying Tampermonkey\'s downloader instead…');
            return saveViaDownloader(url, filename, referer);
        });
    }

    // Tampermonkey's downloader (the backup)
    function saveViaDownloader(url, filename, referer) {
        return new Promise(resolve => {
            let done = false;
            let task = null;
            const finish = (ok, why) => {
                if (done) return;
                done = true;
                clearTimeout(timer);
                if (!ok) console.error('[Steamy34] Tampermonkey\'s downloader failed (' + why + '):', filename, url);
                resolve(ok);
            };
            const timer = setTimeout(() => {
                try { if (task && task.abort) task.abort(); } catch (e) {}
                finish(false, 'took too long');
            }, DL_BIG_TIMEOUT_MS);
            try {
                const opts = {
                    url,
                    name: filename,
                    saveAs: false,
                    onload: () => finish(true),
                    onerror: e => {
                        const err = e && e.error ? String(e.error) : '';
                        const det = e && e.details ? (typeof e.details === 'string' ? e.details : JSON.stringify(e.details)) : '';
                        finish(false, [err, det].filter(Boolean).join(': ') || 'error');
                    },
                    ontimeout: () => finish(false, 'timeout'),
                    headers: { Referer: referer || location.href }
                };
                task = GM_download(opts);
            } catch (e) {
                finish(false, 'not available: ' + e.message);
            }
        });
    }

    // Load the whole file (resolves the Blob, or null)
    function fetchBlob(url, referer, timeout) {
        return new Promise(resolve => {
            GM_xmlhttpRequest({
                method: 'GET',
                url,
                responseType: 'blob',
                headers: { Referer: referer || location.href },
                timeout: timeout || DL_TIMEOUT_MS,
                onload: res => {
                    if (res.status < 200 || res.status >= 300 || !res.response) {
                        console.error('[Steamy34] Download failed: HTTP ' + res.status, url);
                        resolve(null);
                        return;
                    }
                    resolve(res.response);
                },
                onerror: () => { console.error('[Steamy34] Download failed: no answer', url); resolve(null); },
                ontimeout: () => { console.error('[Steamy34] Download failed: took too long', url); resolve(null); }
            });
        });
    }

    // Load the whole file, then save it under our name (into Downloads)
    function saveViaBlob(url, filename, referer, timeout) {
        return fetchBlob(url, referer, timeout).then(blob => {
            if (!blob) return false;
            try {
                saveBlob(blob, filename);
                return true;
            } catch (e) {
                console.error('[Steamy34] Saving the file failed:', e);
                return false;
            }
        });
    }

    // Without arguments: downloads the post shown on this page.
    // With (url, tagsByType, postId): downloads that file (used by the popup viewer).
    // "You already downloaded this" - asks before downloading a post again.
    // Resolves true (download) or false (cancel).
    function confirmRedownload() {
        return new Promise(resolve => {
            const overlay = document.createElement('div');
            overlay.className = 's34-overlay s34-confirm-overlay';
            overlay.innerHTML = `
                <div class="s34-confirm" role="dialog" aria-modal="true">
                    <div class="s34-confirm-icon">⬇</div>
                    <div class="s34-confirm-title">Already downloaded</div>
                    <div class="s34-confirm-text">You already downloaded this post. Are you sure you want to download it again?</div>
                    <label class="s34-confirm-check"><input type="checkbox"> Don't show this again</label>
                    <div class="s34-confirm-foot">
                        <button type="button" class="s34-btn" data-act="no">Cancel</button>
                        <button type="button" class="s34-btn s34-primary" data-act="yes">Download again</button>
                    </div>
                </div>`;
            const check = overlay.querySelector('input[type="checkbox"]');

            let done = false;
            function finish(ok) {
                if (done) return;
                done = true;
                document.removeEventListener('keydown', onKey, true);
                overlay.remove();
                if (check.checked) {
                    saveSettingsNow({ confirmRedownload: false });
                    showToast('Won\'t ask again – turn it back on in Settings → Download.');
                }
                resolve(ok);
            }
            function onKey(e) {
                if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); finish(false); }
                else if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); finish(true); }
                else if (e.code === CONFIG.downloadKey) { e.preventDefault(); e.stopPropagation(); } // no double trigger
            }
            overlay.addEventListener('click', e => {
                const act = e.target.closest('[data-act]');
                if (act) finish(act.dataset.act === 'yes');
                else if (e.target === overlay) finish(false);
            });
            document.addEventListener('keydown', onKey, true);
            document.body.appendChild(overlay);
            overlay.querySelector('[data-act="yes"]').focus();
        });
    }

    // size: the post's resolution ("1920x1080") when called from the popup
    async function downloadOriginal(givenUrl, tagsByType, postId, confirmed, size) {
        if (typeof givenUrl !== 'string') givenUrl = null; // called as a click handler
        const url = givenUrl || getOriginalUrl();
        if (!url) {
            showToast('Couldn\'t find the original file on this page – try again once it has loaded.', null, null, 8000);
            return;
        }

        const id = givenUrl ? postId : params.get('id');
        if (!confirmed && CONFIG.confirmRedownload && CONFIG.trackDownloads && isDownloaded(id)) {
            if (document.querySelector('.s34-confirm-overlay')) return; // already asking
            if (!(await confirmRedownload())) return;
        }
        if (!givenUrl) size = readPostSize(document); // post page: from its own info list
        const filename = buildFilename(url, givenUrl ? tagsByType : undefined, size, id);
        // Tags of the download (for Stats)
        const historyInfo = {
            tags: givenUrl ? (tagsByType || {}) : {
                artist: getTags('artist'), character: getTags('character'), copyright: getTags('copyright')
            },
            thumb: givenUrl ? popupThumbSrc(popupState) : ((document.querySelector('#image') || {}).src || '')
        };
        showToast('Downloading ' + filename.slice(0, 80) + (filename.length > 80 ? '…' : ''));
        console.log('[Steamy34] Downloading:', url, '→', filename);

        // Same saving as batch downloads: time limit, big files via the downloader
        const ok = await saveUrlAs(url, filename, location.href);
        if (ok) {
            rememberDownload(id, historyInfo);
            console.log('[Steamy34] Download complete:', filename);
        } else {
            showToast('Download failed – the server didn\'t answer in time or refused it. Try again in a moment.',
                      'Retry', () => downloadOriginal(url, historyInfo.tags, id, true, size), 12000);
        }
    }

    // "KeyB" -> "B", "Digit5" -> "5", "F2" -> "F2"
    function keyLabel(code) {
        return String(code || '').replace(/^Key/, '').replace(/^Digit/, '').replace(/^Numpad/, 'Num ');
    }

    // Download hotkey: on a post page, or while the popup viewer is open
    document.addEventListener('keydown', function (event) {
        if (event.code !== CONFIG.downloadKey || event.ctrlKey || event.altKey ||
            event.metaKey || event.shiftKey || event.repeat) return;

        const t = event.target;
        if (t.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName)) return;
        if (document.querySelector('.s34-overlay:not(.s34-pv-overlay):not(.s34-under-popup)')) return; // settings etc. open

        if (popupState) {
            event.preventDefault();
            popupDownload();
        } else if (isPostView) {
            event.preventDefault();
            downloadOriginal();
        }
    }, true);

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

        function fit() {
            const { w, h } = getNaturalSize();
            if (!w || !h) return;

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
                <span class="s34-cf-pill-text"><b>Quick check needed</b><small>Nothing new loads until it's solved</small></span>
                <span class="s34-cf-why" tabindex="0" role="button" aria-label="Why is this needed?">?<span class="s34-cf-why-pop" role="tooltip"><b>Why is this needed?</b>rule34 is protected by Cloudflare, which now and then asks for a quick check that a real person is browsing. Until it's solved, rule34 turns down every request: no new pages, no post info in the popup, no hover previews, no Following updates. Steamy34 pauses its loading meanwhile, so it doesn't make things worse. <b>Solve</b> opens the check right here – afterwards everything carries on.</span></span>
                <button type="button" class="s34-cf-pill-solve">Solve</button>
                <button type="button" class="s34-cf-pill-x" title="Hide – loading stays paused until the check is solved" aria-label="Hide">✕</button>`;
            pill.querySelector('.s34-cf-pill-solve').addEventListener('click', openCloudflarePanel);
            // ? : the explanation on hover - and on a tap (phones can't hover)
            const why = pill.querySelector('.s34-cf-why');
            why.addEventListener('click', e => { e.stopPropagation(); why.classList.toggle('s34-on'); });
            why.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); why.classList.toggle('s34-on'); } });
            document.addEventListener('pointerdown', e => { if (!why.contains(e.target)) why.classList.remove('s34-on'); }, true);
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

                    const reveal = () => {
                        if (overlay !== el || el.classList.contains('s34-playing')) return;
                        thumb.classList.remove('s34-loading');
                        el.classList.add('s34-playing');
                        rememberMediaHost(isVideo ? 'video' : 'image', el.currentSrc || el.src);
                    };
                    if (!isVideo) el.addEventListener('load', reveal);
                    else {
                        // Videos (Beta 3.6): start a bit into the clip - many open
                        // on a dark intro or fade-in - and only show the video once a
                        // real frame is drawn (before, it showed on "playing", and a
                        // not yet drawn frame looked like a black box)
                        el.addEventListener('loadedmetadata', () => {
                            const d = el.duration;
                            if (isFinite(d) && d > 4) { try { el.currentTime = Math.min(d * 0.15, 8); } catch (e) {} }
                        }, { once: true });
                        el.addEventListener('playing', () => {
                            if (typeof el.requestVideoFrameCallback === 'function') el.requestVideoFrameCallback(() => reveal());
                            el.addEventListener('timeupdate', reveal, { once: true }); // (whichever comes first)
                        });
                    }
                    el.addEventListener('error', tryNext); // wrong guess -> next one

                    thumb.appendChild(el);
                    tryNext();
                }, isVideo ? CONFIG.hoverVideoDelay : CONFIG.hoverDelay); // videos wait a bit longer (they're big)
            });

            thumb.addEventListener('mouseleave', stop);
        });
    }

    // =====================================================================
    //  6. MULTI-LINE SEARCH BOX
    //  Swaps the one-line search field for a textarea that wraps and grows
    //  in height, so every tag stays visible. Width stays the same, so the
    //  sidebar is not affected. Enter still searches.
    // =====================================================================

    function setupMultilineSearch() {
        const input = document.querySelector(
            '.tag-search input[name="tags"], .sidebar input[name="tags"], input[name="tags"][type="text"], input[name="tags"]:not([type])'
        );
        if (!input || input.dataset.s34Multi) return;

        const ta = document.createElement('textarea');
        ta.name = input.name;
        // Deliberately NOT copying the site's id/class: the site attaches its
        // own suggestion list (awesomplete) by those, which would then show a
        // second, see-through list over ours.
        ta.id = 's34-search';
        ta.className = 's34-search';

        // Invisible stand-in that keeps the original id, so any site script
        // looking for the search field still finds it (it has no name, so it
        // isn't sent with the search).
        const mirror = document.createElement('input');
        mirror.type = 'hidden';
        if (input.id) mirror.id = input.id;
        mirror.value = input.value;
        ta.value = input.value;
        ta.placeholder = input.placeholder || 'Search tags';
        ta.rows = 1;
        ta.spellcheck = false;
        ta.autocomplete = 'off';
        ta.dataset.s34Multi = '1';

        Object.assign(ta.style, {
            display: 'block',
            width: '100%',
            boxSizing: 'border-box',
            resize: 'none',
            overflow: 'hidden',
            font: 'inherit',
            fontSize: '13px',
            lineHeight: '1.4',
            padding: '5px 7px',
            minHeight: '30px'
        });

        const grow = () => {
            ta.style.height = 'auto';
            ta.style.height = ta.scrollHeight + 'px';
        };

        ta.addEventListener('input', () => {
            // No line breaks in a search - turn them into spaces
            if (/\n/.test(ta.value)) {
                const pos = ta.selectionStart;
                ta.value = ta.value.replace(/\n/g, ' ');
                ta.setSelectionRange(pos, pos);
            }
            mirror.value = ta.value;
            grow();
        });

        if (CONFIG.searchSuggestions) attachSuggestions(ta);

        ta.addEventListener('keydown', e => {
            // Enter picks a suggestion when the list is open (handled there)
            if (e.defaultPrevented || ta.dataset.acOpen === '1') return;
            if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
                e.preventDefault();
                ta.value = ta.value.trim().replace(/\s+/g, ' ');
                const form = ta.form;
                if (form) {
                    if (form.requestSubmit) form.requestSubmit();
                    else form.submit();
                }
            }
        });

        input.replaceWith(ta);
        ta.after(mirror);
        grow();
        window.addEventListener('resize', grow);
    }

    // ---- Modern search: tag chips + filters + recent/saved ----------------
    // The real search field stays in the form (hidden), so the site's search
    // works exactly as before. What you see is built on top of it:
    //   [3d ×] [-ai_generated ×] [add tags…]          ✕
    //   Score [≥100]  Size [1080p+]  Sort [Newest]  Type [All]
    //   ▸ Recent searches · ★ Tags (small menus since Beta 3.6)

    const HISTORY_KEY = 'steamy34_history';
    const SAVED_KEY = 'steamy34_saved'; // old saved searches - moved into Following in Beta 3.1
    const FAVTAGS_KEY = 'steamy34_favtags';
    const HISTORY_MAX = 15;

    function getStoredList(key) {
        try {
            const v = GM_getValue(key, []);
            return Array.isArray(v) ? v : [];
        } catch (e) { return []; }
    }

    function addToHistory(q) {
        q = (q || '').trim().replace(/\s+/g, ' ');
        if (!q) return;
        // "3d lara_croft" and "lara_croft 3d" are the same search
        const same = x => normalizeQuery(x) === normalizeQuery(q);
        const list = getStoredList(HISTORY_KEY).filter(x => !same(x));
        list.unshift(q);
        GM_setValue(HISTORY_KEY, list.slice(0, HISTORY_MAX));
    }

    const SEARCH_FILTERS = [
        { key: 'score', label: 'Score', options: [
            ['', 'Any'], ['50', '≥ 50'], ['100', '≥ 100'], ['250', '≥ 250'],
            ['500', '≥ 500'], ['1000', '≥ 1000'], ['custom', 'Custom…']] },
        { key: 'res', label: 'Size', options: [
            ['', 'Any'], ['720', '720p+'], ['1080', '1080p+'], ['1440', '1440p+'],
            ['2160', '4K'], ['custom', 'Custom…']] },
        { key: 'sort', label: 'Sort', options: [
            ['', 'Newest'], ['sort:score:desc', 'Top score'], ['sort:id:asc', 'Oldest'],
            ['sort:random', 'Random']] },
        { key: 'type', label: 'Type', options: [
            ['', 'All'], ['video', 'Videos'], ['animated', 'Animated'], ['image', 'Images']] },
        { key: 'rating', label: 'Rating', options: [
            ['', 'Any'], ['rating:safe', 'Safe'], ['rating:questionable', 'Questionable'],
            ['rating:explicit', 'Explicit'], ['-rating:explicit', 'Not explicit']] }
    ];

    const TYPE_FILTER_TERMS = {
        video: ['video'],
        animated: ['animated', '-video'],
        image: ['-video', '-animated']
    };

    // Split a search into tag chips and filter settings
    function parseQuery(q) {
        const f = { score: '', scoreOp: '>=', res: '', sort: '', type: '', rating: '' };
        let rest = [];
        let h = null, w = null;
        for (const word of (q || '').split(/\s+/).filter(Boolean)) {
            const lw = word.toLowerCase();
            let m;
            if (!f.score && (m = lw.match(/^score:(>=?)(\d+)$/))) { f.scoreOp = m[1]; f.score = m[2]; continue; }
            if (!f.sort && lw.startsWith('sort:')) { f.sort = lw; continue; }
            if (!f.rating && /^-?rating:[a-z]+$/.test(lw)) { f.rating = lw; continue; }
            if (h === null && (m = lw.match(/^height:>=(\d+)$/))) { h = m[1]; continue; }
            if (w === null && (m = lw.match(/^width:>=(\d+)$/))) { w = m[1]; continue; }
            rest.push(word);
        }
        // Size = "both sides at least N" (works for portrait and landscape)
        if (h !== null && h === w) f.res = h;
        else {
            if (h !== null) rest.push('height:>=' + h);
            if (w !== null) rest.push('width:>=' + w);
        }
        for (const [type, terms] of [['image', TYPE_FILTER_TERMS.image],
                                     ['animated', TYPE_FILTER_TERMS.animated],
                                     ['video', TYPE_FILTER_TERMS.video]]) {
            const lower = rest.map(x => x.toLowerCase());
            if (terms.every(t => lower.includes(t))) {
                f.type = type;
                rest = rest.filter(x => !terms.includes(x.toLowerCase()));
                break;
            }
        }
        return { terms: rest, f };
    }

    function filterTerms(f) {
        const out = [];
        if (f.score) out.push('score:' + f.scoreOp + f.score);
        if (f.res) out.push('height:>=' + f.res, 'width:>=' + f.res);
        if (f.sort) out.push(f.sort);
        if (f.type) out.push(...TYPE_FILTER_TERMS[f.type]);
        if (f.rating) out.push(f.rating);
        return out;
    }

    // ---- Pinned filters: kept for every new search ----
    // { score: '100', scoreOp: '>=', res: '1080', sort: 'sort:score:desc', type: 'video' }
    const PINS_KEY = 'steamy34_pinned';

    function getPins() {
        try {
            const v = GM_getValue(PINS_KEY, {});
            return v && typeof v === 'object' ? v : {};
        } catch (e) { return {}; }
    }

    function setPins(p) { GM_setValue(PINS_KEY, p); }

    // Pinned filters fill in whatever a search doesn't set itself
    // (a search that has its own score / size / ... keeps it)
    function withPins(q) {
        const pins = getPins();
        const keys = SEARCH_FILTERS.map(d => d.key).filter(k => pins[k]);
        if (!keys.length) return q;
        const parsed = parseQuery(q || '');
        let changed = false;
        keys.forEach(k => {
            if (parsed.f[k]) return;
            parsed.f[k] = pins[k];
            if (k === 'score') parsed.f.scoreOp = pins.scoreOp || '>=';
            changed = true;
        });
        return changed ? parsed.terms.concat(filterTerms(parsed.f)).join(' ') : q;
    }

    // Links to a search (tags, favourite tags, the site's own links…) get the
    // pinned filters added right before they're followed
    function addPinsToLink(e) {
        const a = e.target && e.target.closest && e.target.closest('a[href]');
        if (!a) return;
        let u;
        try { u = new URL(a.href, location.href); } catch (err) { return; }
        if (u.origin !== location.origin || u.searchParams.get('page') !== 'post' ||
            u.searchParams.get('s') !== 'list' || u.searchParams.get('pid')) return; // page 2, 3… stay as they are
        const q = (u.searchParams.get('tags') || '').trim();
        const next = withPins(q === 'all' ? '' : q);
        if (next === q) return;
        u.searchParams.set('tags', next);
        a.href = u.href;
    }
    document.addEventListener('mousedown', addPinsToLink, true);
    document.addEventListener('click', addPinsToLink, true);

    // Arrived at a search some other way (bookmark, the site's menu…) without
    // the pinned filters? Add them right away - once, never in a loop.
    (function applyPinsOnArrival() {
        if (isPostView || params.get('page') !== 'post' || params.get('s') !== 'list' || params.get('pid')) return;
        if (feedFromHash(location.hash)) return; // an old Following page: opens the Following window instead
        const q = (params.get('tags') || '').trim();
        const next = withPins(q === 'all' ? '' : q);
        if (next === q) return;
        const target = location.pathname + '?page=post&s=list&tags=' + encodeURIComponent(next);
        try {
            if (sessionStorage.getItem('s34_pin_redirect') === target) return; // already tried
            sessionStorage.setItem('s34_pin_redirect', target);
        } catch (e) { return; }
        location.replace(target);
    })();

    function setupChipSearch() {
        const input = document.querySelector(
            '.tag-search input[name="tags"], .sidebar input[name="tags"], input[name="tags"][type="text"], input[name="tags"]:not([type])'
        );
        if (!input || input.dataset.s34Multi) return;

        // The site's "(Supports wildcard *)" note would hang under Steamy34's
        // search box on its own (* still works in a tag bubble)
        const searchArea = input.closest('.tag-search');
        const hint = searchArea && searchArea.querySelector(':scope > small');
        if (hint && /wildcard/i.test(hint.textContent)) hint.classList.add('s34-site-hidden');

        // Hidden real field (sent with the form) + stand-in with the old id
        const ta = document.createElement('textarea');
        ta.name = input.name;
        ta.id = 's34-search';
        ta.className = 's34-search';
        ta.dataset.s34Multi = '1';
        ta.style.display = 'none';
        const mirror = document.createElement('input');
        mirror.type = 'hidden';
        if (input.id) mirror.id = input.id;

        // Pinned filters show up straight away on the posts page (on a single
        // post they're added when the new search starts)
        let { terms, f } = parseQuery(isPostView ? input.value : withPins(input.value));

        const root = document.createElement('div');
        root.className = 's34-sb';
        root.innerHTML = `
            <div class="s34-sb-box">
                <span class="s34-sb-pills"></span>
                <input type="text" class="s34-sb-input" placeholder="Add tags…"
                       autocomplete="off" spellcheck="false">
                <button type="button" class="s34-sb-clear" title="Clear the whole search">✕</button>
            </div>
            <div class="s34-sb-filters"></div>
            <div class="s34-sb-tools">
                <button type="button" class="s34-sb-btn" data-act="menu"></button>
                <button type="button" class="s34-sb-btn" data-act="tags"></button>
            </div>
            <div class="s34-sb-menu" hidden></div>
            <div class="s34-ft" hidden>
                <div class="s34-ft-head">
                    <span>Favourite tags</span>
                    <button type="button" class="s34-ft-edit" title="Add or remove favourite tags">Edit</button>
                </div>
                <div class="s34-ft-chips"></div>
                <div class="s34-ft-add">
                    <input type="text" class="s34-ft-input" placeholder="Add a favourite tag…"
                           autocomplete="off" spellcheck="false">
                </div>
            </div>`;

        const box = root.querySelector('.s34-sb-box');
        const pills = root.querySelector('.s34-sb-pills');
        const field = root.querySelector('.s34-sb-input');
        const filtersEl = root.querySelector('.s34-sb-filters');
        const menu = root.querySelector('.s34-sb-menu');

        const query = () => terms.concat(filterTerms(f)).join(' ');

        // ---- filters ----
        const selects = {};
        const pinButtons = {};
        const PIN_SVG = '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6l-1 6 4 4v2H6v-2l4-4z"/><path d="M12 15v6"/></svg>';

        function filterValueText(key) {
            const sel = selects[key];
            const o = sel && sel.selectedOptions[0];
            return o ? o.textContent : '';
        }

        SEARCH_FILTERS.forEach(def => {
            const label = document.createElement('div');
            label.className = 's34-sb-filter';
            const top = document.createElement('div');
            top.className = 's34-sb-filter-top';
            const name = document.createElement('span');
            name.textContent = def.label;
            // Pin: keep this filter for every new search
            const pin = document.createElement('button');
            pin.type = 'button';
            pin.className = 's34-pin';
            pin.innerHTML = PIN_SVG;
            pin.addEventListener('click', () => {
                const pins = getPins();
                if (pins[def.key]) {
                    delete pins[def.key];
                    if (def.key === 'score') delete pins.scoreOp;
                    setPins(pins);
                    showToast(`${def.label} is no longer kept for new searches.`);
                } else {
                    if (!f[def.key]) { showToast(`Pick a ${def.label.toLowerCase()} first, then pin it.`); return; }
                    pins[def.key] = f[def.key];
                    if (def.key === 'score') pins.scoreOp = f.scoreOp;
                    setPins(pins);
                    showToast(`Pinned: ${def.label} "${filterValueText(def.key)}" is now kept for every new search.`);
                }
                showFilters();
            });
            top.append(name, pin);
            pinButtons[def.key] = pin;
            const sel = document.createElement('select');
            def.options.forEach(([v, t]) => sel.add(new Option(t, v)));
            sel.addEventListener('change', () => {
                let v = sel.value;
                if (v === 'custom') {
                    const ask = def.key === 'score' ? 'Minimum score:' : 'Minimum width and height in pixels:';
                    const n = parseInt(prompt(ask, f[def.key] || ''), 10);
                    v = n > 0 ? String(n) : f[def.key];
                }
                f[def.key] = v;
                if (def.key === 'score') f.scoreOp = '>=';
                // A pinned filter follows your choice; "Any" unpins it
                const pins = getPins();
                if (pins[def.key]) {
                    if (v) {
                        pins[def.key] = v;
                        if (def.key === 'score') pins.scoreOp = f.scoreOp;
                    } else {
                        delete pins[def.key];
                        if (def.key === 'score') delete pins.scoreOp;
                        showToast(`${def.label} is no longer kept for new searches.`);
                    }
                    setPins(pins);
                }
                sync();
            });
            label.append(top, sel);
            filtersEl.appendChild(label);
            selects[def.key] = sel;
        });

        function showFilters() {
            SEARCH_FILTERS.forEach(def => {
                const sel = selects[def.key];
                const v = f[def.key];
                // A value from the address that isn't in the list gets its own entry
                Array.from(sel.options).filter(o => o.dataset.extra).forEach(o => o.remove());
                if (v && !Array.from(sel.options).some(o => o.value === v)) {
                    const text = def.key === 'score' ? (f.scoreOp === '>' ? '> ' : '≥ ') + v
                               : def.key === 'res' ? '≥ ' + v + ' px'
                               : v.replace(/^sort:/, '');
                    const o = new Option(text, v);
                    o.dataset.extra = '1';
                    sel.add(o, sel.options[sel.options.length - (def.key === 'sort' || def.key === 'type' ? 0 : 1)] || null);
                }
                sel.value = v;
                sel.classList.toggle('s34-sb-set', !!v);
                const pinned = !!getPins()[def.key];
                const pin = pinButtons[def.key];
                pin.classList.toggle('s34-on', pinned);
                pin.closest('.s34-sb-filter').classList.toggle('s34-pinned', pinned);
                pin.title = pinned ? `Pinned: kept for every new search – click to unpin`
                                   : `Pin: keep this ${def.label.toLowerCase()} for every new search`;
            });
        }

        // ---- tag chips ----
        function termType(term) {
            const base = term.replace(/^[-~]+/, '').toLowerCase();
            return tagTypes.get(base) || (base.includes(':') ? 'metadata' : 'general');
        }

        function renderPills() {
            pills.replaceChildren();
            terms.forEach((term, i) => {
                const pill = document.createElement('span');
                const ex = term.startsWith('-');
                pill.className = 's34-pill s34-pill-' + termType(term) + (ex ? ' s34-pill-ex' : '');
                const text = document.createElement('span');
                text.className = 's34-pill-text';
                text.textContent = term.replace(/_/g, ' ');
                text.title = term.startsWith('~') ? term
                    : ex ? 'Excluded - click to include it again' : 'Click to exclude it (-tag)';
                text.addEventListener('click', () => {
                    if (term.startsWith('~')) return;
                    terms[i] = ex ? term.slice(1) : '-' + term;
                    sync();
                });
                const x = document.createElement('button');
                x.type = 'button';
                x.className = 's34-pill-x';
                x.textContent = '×';
                x.title = 'Remove';
                x.addEventListener('click', e => {
                    e.stopPropagation();
                    terms.splice(i, 1);
                    sync();
                    field.focus();
                });
                pill.append(text, x);
                pills.appendChild(pill);
            });
            field.placeholder = terms.length ? 'Add tags…' : 'Search tags…';
        }

        // ---- favourite tags: one click adds them to the search ----
        const ft = root.querySelector('.s34-ft');
        const ftChips = root.querySelector('.s34-ft-chips');
        const ftInput = root.querySelector('.s34-ft-input');
        let ftEditing = false;

        const getFavTags = () => getStoredList(FAVTAGS_KEY).filter(t => typeof t === 'string' && t);
        const setFavTags = list => GM_setValue(FAVTAGS_KEY, list);

        function renderFavTags() {
            const favTags = getFavTags();
            ftChips.replaceChildren();
            if (!favTags.length) ftEditing = true; // empty: show the add box until "Done"
            ft.classList.toggle('s34-ft-editing', ftEditing);
            ft.querySelector('.s34-ft-edit').textContent = ftEditing ? 'Done' : 'Edit';
            ft.querySelector('.s34-ft-edit').hidden = !favTags.length;
            if (!favTags.length) {
                const hint = document.createElement('div');
                hint.className = 's34-ft-hint';
                hint.textContent = 'Add tags you search often – then one click puts them in the search.';
                ftChips.appendChild(hint);
            }
            const lower = terms.map(t => t.toLowerCase());
            favTags.forEach(tag => {
                const lt = tag.toLowerCase();
                const state = lower.includes(lt) ? 'in' : lower.includes('-' + lt) ? 'out' : '';
                const chip = document.createElement('span');
                chip.className = 's34-ft-chip s34-pill-' + termType(tag) + (state ? ' s34-ft-' + state : '');
                const name = document.createElement('span');
                name.className = 's34-ft-name';
                name.textContent = tag.replace(/_/g, ' ');
                name.title = state === 'in' ? 'In the search – click to take it out'
                           : state === 'out' ? 'Excluded – click to remove the exclusion'
                           : 'Click to add to the search (Shift+click: exclude it)';
                name.addEventListener('click', e => {
                    const base = lt;
                    if (state) {
                        terms = terms.filter(t => t.toLowerCase().replace(/^-/, '') !== base);
                        sync();
                    } else {
                        addTerms([(e.shiftKey ? '-' : '') + tag]);
                    }
                });
                chip.appendChild(name);
                if (ftEditing) {
                    const x = document.createElement('button');
                    x.type = 'button';
                    x.className = 's34-ft-x';
                    x.textContent = '×';
                    x.title = 'Remove from favourite tags';
                    x.addEventListener('click', e => {
                        e.stopPropagation();
                        setFavTags(getFavTags().filter(t => t.toLowerCase() !== lt));
                        renderFavTags();
                    });
                    chip.appendChild(x);
                }
                ftChips.appendChild(chip);
            });
            // open as a menu next to the sidebar: keep it inside the window as it grows
            if (!ft.hidden && ft.classList.contains('s34-sb-pop') && !ft.classList.contains('s34-sb-sheet')) placePop();
        }

        function addFavTags(words) {
            const list = getFavTags();
            const have = new Set(list.map(t => t.toLowerCase()));
            words.map(w => w.replace(/^[-~]+/, '').trim()).filter(Boolean).forEach(w => {
                if (!have.has(w.toLowerCase())) { list.push(w); have.add(w.toLowerCase()); }
            });
            setFavTags(list);
            renderFavTags();
        }

        function commitFavInput(all) {
            const v = ftInput.value;
            const parts = v.split(/\s+/);
            const keep = all || /\s$/.test(v) ? '' : parts.pop();
            const done = parts.filter(Boolean);
            if (done.length) addFavTags(done);
            ftInput.value = keep;
        }

        ftInput.addEventListener('input', () => { if (/\s/.test(ftInput.value)) commitFavInput(false); });
        if (CONFIG.searchSuggestions) attachSuggestions(ftInput);
        ftInput.addEventListener('keydown', e => {
            if (e.defaultPrevented || ftInput.dataset.acOpen === '1' || e.isComposing) return;
            if (e.key === 'Enter') {
                e.preventDefault();
                commitFavInput(true);
            }
        });
        ft.querySelector('.s34-ft-edit').addEventListener('click', () => {
            commitFavInput(true);
            ftEditing = !ftEditing;
            renderFavTags();
            if (ftEditing) ftInput.focus();
        });

        function sync() {
            ta.value = query();
            mirror.value = ta.value;
            renderPills();
            showFilters();
            renderFavTags();
            if (typeof refreshSearchButtons === 'function') refreshSearchButtons();
        }

        function addTerms(words) {
            words.filter(Boolean).forEach(word => {
                const lw = word.toLowerCase();
                // Filter words typed by hand go to their filter instead
                const parsed = parseQuery(word);
                if (!parsed.terms.length) {
                    SEARCH_FILTERS.forEach(def => { if (parsed.f[def.key]) f[def.key] = parsed.f[def.key]; });
                    if (parsed.f.score) f.scoreOp = parsed.f.scoreOp;
                    return;
                }
                const base = lw.replace(/^-/, '');
                // Adding "tag" replaces "-tag" and the other way round; no duplicates
                terms = terms.filter(t => t.toLowerCase().replace(/^-/, '') !== base || t.startsWith('~'));
                terms.push(word);
            });
            sync();
        }

        // Turn finished words into chips
        function commitField(all) {
            const v = field.value;
            const parts = v.split(/\s+/);
            const keep = all || /\s$/.test(v) ? '' : parts.pop();
            const done = parts.filter(Boolean);
            if (done.length) addTerms(done);
            field.value = keep;
        }

        field.addEventListener('input', () => {
            if (/\s/.test(field.value)) commitField(false);
        });

        if (CONFIG.searchSuggestions) attachSuggestions(field);

        field.addEventListener('keydown', e => {
            if (e.defaultPrevented || field.dataset.acOpen === '1' || e.isComposing) return;
            if (e.key === 'Enter') {
                e.preventDefault();
                if (field.value.trim()) {
                    commitField(true);       // Enter adds the word...
                } else {
                    submit();                // ...Enter on an empty field searches
                }
            } else if (e.key === 'Backspace' && !field.value && terms.length) {
                e.preventDefault();
                terms.pop();
                sync();
            }
        });

        function submit() {
            commitField(true);
            ta.value = query();
            mirror.value = ta.value;
            const form = ta.form;
            if (!form) { runSearch(ta.value); return; }
            if (form.requestSubmit) form.requestSubmit(); else form.submit();
        }

        box.addEventListener('mousedown', e => {
            if (e.target === box || e.target === pills) { e.preventDefault(); field.focus(); }
        });

        root.querySelector('.s34-sb-clear').addEventListener('click', () => {
            terms = [];
            f = { score: '', scoreOp: '>=', res: '', sort: '', type: '', rating: '' };
            field.value = '';
            sync();
            field.focus();
        });

        // ---- recent & saved ----
        function menuItem(label, sub, onClick, onDelete, badge) {
            const row = document.createElement('div');
            row.className = 's34-sb-item';
            const main = document.createElement('div');
            main.className = 's34-sb-item-main';
            const l = document.createElement('div');
            l.className = 's34-sb-item-label';
            l.textContent = label;
            if (badge) {
                const b = document.createElement('span');
                b.className = 's34-sb-new';
                b.textContent = badge;
                b.title = 'New posts since you last opened this search';
                l.prepend(b);
            }
            main.appendChild(l);
            if (sub) {
                const s = document.createElement('div');
                s.className = 's34-sb-item-sub';
                s.textContent = sub;
                main.appendChild(s);
            }
            main.title = 'Search: ' + (sub || label);
            main.addEventListener('click', onClick);
            row.appendChild(main);
            if (onDelete) {
                const del = document.createElement('button');
                del.type = 'button';
                del.className = 's34-sb-item-del';
                del.textContent = '✕';
                del.title = 'Remove';
                del.addEventListener('click', e => { e.stopPropagation(); onDelete(); renderMenu(); });
                row.appendChild(del);
            }
            return row;
        }

        function renderMenu() {
            menu.replaceChildren();
            const head = document.createElement('div');
            head.className = 's34-sb-menu-head';
            head.textContent = 'Recent searches';
            menu.appendChild(head);
            const recent = getStoredList(HISTORY_KEY);
            if (!recent.length) {
                const n = document.createElement('div');
                n.className = 's34-sb-empty';
                n.textContent = 'No searches yet.';
                menu.appendChild(n);
            }
            recent.forEach(q => menu.appendChild(menuItem(q.replace(/_/g, ' '), '',
                () => runSearch(q),
                () => GM_setValue(HISTORY_KEY, getStoredList(HISTORY_KEY).filter(x => x !== q)))));
            if (recent.length) {
                const clear = document.createElement('button');
                clear.type = 'button';
                clear.className = 's34-sb-btn s34-sb-clear-recent';
                clear.textContent = 'Clear recent';
                clear.addEventListener('click', () => { GM_setValue(HISTORY_KEY, []); renderMenu(); });
                menu.appendChild(clear);
            }
            if (openPop === 'recent') placePop();
        }

        // 🕘 Recent · ★ Tags: small menus (Beta 3.6 - before, lists that
        // opened inside the sidebar and made it scroll). One at a time.
        //  - computer: right next to the sidebar (or below the button when
        //    there's no room); a click elsewhere, Esc or scrolling closes it
        //  - phone: a sheet that slides up from the bottom over the dimmed
        //    page; a tap on the page, swiping it down or Back closes it
        const CLOCK_SVG = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>';
        const STAR_SVG_S = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linejoin="round"><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/></svg>';
        const recentBtn = root.querySelector('[data-act="menu"]');
        const tagsBtn = root.querySelector('[data-act="tags"]');
        recentBtn.innerHTML = CLOCK_SVG + '<span>Recent</span>';
        tagsBtn.innerHTML = STAR_SVG_S + '<span>Tags</span>';
        const POPS = { recent: { el: menu, btn: recentBtn }, tags: { el: ft, btn: tagsBtn } };
        let openPop = '';
        let sheetBackdrop = null, sheetHistory = false;
        const asSheet = () => isPhoneLayout();

        function placePop() {
            const p = POPS[openPop];
            if (!p) return;
            const el = p.el;
            el.classList.add('s34-sb-pop');
            el.classList.toggle('s34-sb-sheet', asSheet());
            if (asSheet()) { el.style.cssText = ''; return; } // (the sheet is placed by its CSS)
            const b = p.btn.getBoundingClientRect();
            const side = (root.closest('.sidebar, #sidebar') || root).getBoundingClientRect();
            const w = Math.min(320, innerWidth - 16);
            el.style.width = w + 'px';
            let left = side.right + 8, top = b.top - 4;
            if (left + w > innerWidth - 8) { left = Math.max(8, Math.min(b.left, innerWidth - w - 8)); top = b.bottom + 6; }
            el.style.left = left + 'px';
            el.style.top = Math.max(8, Math.min(top, innerHeight - el.offsetHeight - 8)) + 'px';
        }
        function onPopKey(e) {
            if (e.key !== 'Escape' || !openPop) return;
            const a = document.activeElement;
            if (a && a.dataset && a.dataset.acOpen === '1') return; // Esc closes the suggestions first
            e.preventDefault();
            e.stopImmediatePropagation();
            showPanel('');
        }
        function offPop(e) {
            const p = POPS[openPop];
            if (e.target === sheetBackdrop) return; // (its own click closes - so the tap never reaches the page below)
            if (p && !p.el.contains(e.target) && !p.btn.contains(e.target) && !(e.target.closest && e.target.closest('.s34-ac-list'))) showPanel('');
        }
        // (computer: the page or sidebar scrolled away under the menu)
        function offPopScroll(e) {
            const p = POPS[openPop];
            if (p && !asSheet() && !p.el.contains(e.target)) showPanel('');
        }
        function onSheetBack() { if (openPop && asSheet()) { sheetHistory = false; showPanel(''); } }

        // Phones: drag the sheet down to close it (when its list is at the top)
        function setupSheetSwipe(el) {
            let start = null;
            el.addEventListener('touchstart', e => {
                start = null;
                if (!el.classList.contains('s34-sb-sheet') || e.touches.length !== 1 || el.scrollTop > 0) return;
                if (e.target.closest('input, textarea')) return;
                start = { y: e.touches[0].clientY, t: Date.now() };
            }, { passive: true });
            el.addEventListener('touchmove', e => {
                if (!start) return;
                const dy = e.touches[0].clientY - start.y;
                el.style.transform = dy > 0 ? `translateY(${dy}px)` : '';
            }, { passive: true });
            const end = e => {
                if (!start) return;
                const dy = ((e.changedTouches && e.changedTouches[0]) || {}).clientY - start.y;
                const fast = dy > 40 && Date.now() - start.t < 300;
                start = null;
                if (dy > 90 || fast) showPanel('');
                else { el.style.transition = 'transform .18s ease'; el.style.transform = ''; setTimeout(() => { el.style.transition = ''; }, 200); }
            };
            el.addEventListener('touchend', end, { passive: true });
            el.addEventListener('touchcancel', end, { passive: true });
        }
        setupSheetSwipe(menu);
        setupSheetSwipe(ft);

        function showPanel(which) {
            const was = openPop;
            openPop = which;
            Object.entries(POPS).forEach(([k, p]) => {
                const on = k === which;
                p.el.hidden = !on;
                p.btn.classList.toggle('s34-sb-open', on);
                p.btn.setAttribute('aria-expanded', on ? 'true' : 'false');
                if (!on) { p.el.classList.remove('s34-sb-pop', 's34-sb-sheet'); p.el.style.cssText = ''; }
            });
            recentBtn.title = which === 'recent' ? 'Close your recent searches' : 'Your recent searches';
            tagsBtn.title = which === 'tags' ? 'Close your favourite tags' : 'Your favourite tags – one click puts one in the search';
            document.removeEventListener('keydown', onPopKey, true);
            document.removeEventListener('pointerdown', offPop, true);
            window.removeEventListener('scroll', offPopScroll, true);
            if (sheetBackdrop) { sheetBackdrop.remove(); sheetBackdrop = null; }
            document.documentElement.classList.remove('s34-sheet-open');
            // Phones: the sheet took a Back step - give it back when closed another way
            if (!which && was && sheetHistory) {
                sheetHistory = false;
                try { if (history.state && history.state.s34sheet) history.back(); } catch (e) {}
            }
            if (!which) return;
            if (which === 'recent') renderMenu(); else renderFavTags();
            placePop();
            document.addEventListener('keydown', onPopKey, true);
            document.addEventListener('pointerdown', offPop, true);
            if (asSheet()) {
                sheetBackdrop = document.createElement('div');
                sheetBackdrop.className = 's34-sheet-backdrop';
                sheetBackdrop.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); showPanel(''); });
                document.body.appendChild(sheetBackdrop);
                document.documentElement.classList.add('s34-sheet-open');
                if (!sheetHistory) {
                    try { history.pushState({ s34sheet: true }, ''); sheetHistory = true; } catch (e) {}
                }
            } else {
                window.addEventListener('scroll', offPopScroll, true);
            }
        }
        window.addEventListener('popstate', () => { if (sheetHistory && !(history.state && history.state.s34sheet)) onSheetBack(); });
        recentBtn.addEventListener('click', () => showPanel(openPop === 'recent' ? '' : 'recent'));
        tagsBtn.addEventListener('click', () => showPanel(openPop === 'tags' ? '' : 'tags'));
        // (Recent and Tags only open when you click them - small menus since Beta 3.6)

        // ---- outside changes (the + / − buttons on posts) ----
        ta.addEventListener('input', () => {
            ({ terms, f } = parseQuery(ta.value));
            sync();
        });

        input.replaceWith(root);
        root.after(ta, mirror);

        // The site's phone layout has a "search options" gear next to its
        // small search field. With the Steamy34 search box it covered the
        // tags and only unfolded a heading, so it's hidden (see SEARCH_CSS).

        // Move the site's Search button right under the filters and style it.
        // The site's phone layout has none (or hides it) - then Steamy34 adds its own.
        let submitBtn = ta.form && ta.form.querySelector('input[type="submit"], button[type="submit"]');
        if (!submitBtn) {
            submitBtn = document.createElement('button');
            submitBtn.type = 'button';
            submitBtn.textContent = 'Search';
            submitBtn.addEventListener('click', e => { e.preventDefault(); submit(); });
        }
        if (!root.contains(submitBtn)) {
            submitBtn.classList.add('s34-sb-submit');
            filtersEl.after(submitBtn);
        }

        // The site's own Search button: take along what's still typed
        if (ta.form) ta.form.addEventListener('submit', e => {
            commitField(true);
            ta.value = query();
            mirror.value = ta.value;
        });
        sync();
    }

    // ---- Tag suggestions -------------------------------------------------

    // Candidate autocomplete endpoints. The one the site itself uses is
    // detected from the page scripts and tried first.
    function findAutocompleteEndpoints() {
        const found = [];
        for (const s of document.scripts) {
            const text = (s.src || '') + ' ' + (s.textContent || '');
            const m = text.match(/((?:https?:)?\/\/[^"'\s]*autocomplete\.php[^"'\s]*)/i);
            if (m) found.push(m[1]);
        }
        found.push('https://ac.rule34.xxx/autocomplete.php', 'https://api.rule34.xxx/autocomplete.php');
        return [...new Set(found.map(u => {
            let base = u.startsWith('//') ? 'https:' + u : u;
            base = base.replace(/([?&])q=[^&]*/, '$1').replace(/[?&]+$/, '');
            return base;
        }))];
    }

    let acEndpoints = null;
    let acWorking = null; // endpoint that answered correctly

    function acUrl(base, term) {
        return base + (base.includes('?') ? '&' : '?') + 'q=' + encodeURIComponent(term);
    }

    function gmGet(url) {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: 'GET',
                url,
                headers: { Referer: location.href },
                onload: r => (r.status >= 200 && r.status < 300) ? resolve(r.responseText) : reject(r.status),
                onerror: reject,
                ontimeout: reject,
                timeout: 8000
            });
        });
    }

    // Normalise whatever the endpoint returns into [{value, label, type}]
    function parseSuggestions(text) {
        const data = JSON.parse(text);
        const list = Array.isArray(data) ? data : (data.tags || data.results || []);
        return list.map(item => {
            if (typeof item === 'string') return { value: item, label: item, type: '' };
            const value = item.value || item.name || item.tag || '';
            return {
                value,
                label: item.label || (item.count != null ? `${value} (${item.count})` : value),
                type: String(item.type || item.category || '').toLowerCase()
            };
        }).filter(s => s.value);
    }

    // Throws if no suggestion server answers (so callers can tell
    // "no match" apart from "couldn't ask")
    async function acQuery(term) {
        if (!acEndpoints) acEndpoints = findAutocompleteEndpoints();
        const order = acWorking ? [acWorking] : acEndpoints;
        for (const base of order) {
            try {
                const list = parseSuggestions(await gmGet(acUrl(base, term)));
                if (!acWorking) {
                    acWorking = base;
                    console.log('[Steamy34] Using suggestions from', base);
                }
                return list;
            } catch (e) {
                if (acWorking) break;
            }
        }
        throw new Error('no tag-suggestion server answered');
    }

    async function fetchSuggestions(term) {
        try {
            return await acQuery(term);
        } catch (e) {
            console.warn('[Steamy34] No tag-suggestion endpoint answered.', acEndpoints);
            return [];
        }
    }

    function attachSuggestions(ta) {
        const wrap = document.createElement('div');
        wrap.className = 's34-ac-wrap';
        // (the textarea is moved into the wrapper once it's in the page - see below)
        const list = document.createElement('ul');
        list.className = 's34-ac-list';

        let items = [];
        let active = -1;
        let debounce = null;
        let reqId = 0;

        // Current word under the cursor, plus a leading - or ~ prefix
        function currentToken() {
            const v = ta.value;
            const pos = ta.selectionStart;
            const start = v.slice(0, pos).search(/\S*$/);
            const endMatch = v.slice(pos).match(/^\S*/);
            const end = pos + (endMatch ? endMatch[0].length : 0);
            const raw = v.slice(start, end);
            const prefix = (raw.match(/^[-~]+/) || [''])[0];
            return { start, end, prefix, term: raw.slice(prefix.length) };
        }

        function close() {
            list.style.display = 'none';
            list.innerHTML = '';
            items = [];
            active = -1;
            ta.dataset.acOpen = '0';
        }

        function highlight(i) {
            active = i;
            Array.from(list.children).forEach((li, n) => li.classList.toggle('s34-ac-active', n === i));
            if (list.children[i]) list.children[i].scrollIntoView({ block: 'nearest' });
        }

        function pick(i) {
            const s = items[i];
            if (!s) return;
            const t = currentToken();
            const before = ta.value.slice(0, t.start);
            const after = ta.value.slice(t.end).replace(/^\s*/, '');
            const insert = t.prefix + s.value + ' ';
            ta.value = before + insert + after;
            const caret = before.length + insert.length;
            ta.setSelectionRange(caret, caret);
            close();
            ta.dispatchEvent(new Event('input')); // regrow
            ta.focus();
        }

        function render(suggestions) {
            items = suggestions.slice(0, CONFIG.suggestionCount);
            list.innerHTML = '';
            if (!items.length) { close(); return; }
            items.forEach((s, i) => {
                const li = document.createElement('li');
                li.textContent = s.label;
                li.title = s.value;
                if (s.type) li.classList.add('s34-ac-' + s.type.replace(/[^a-z]/g, ''));
                li.addEventListener('mousedown', e => { e.preventDefault(); pick(i); });
                li.addEventListener('mouseenter', () => highlight(i));
                list.appendChild(li);
            });
            list.style.display = 'block';
            ta.dataset.acOpen = '1';
            highlight(0);
        }

        function update() {
            clearTimeout(debounce);
            const { term } = currentToken();
            if (!term) { close(); return; }
            const myId = ++reqId;
            debounce = setTimeout(async () => {
                const res = await fetchSuggestions(term);
                if (myId !== reqId || document.activeElement !== ta) return;
                render(res);
            }, 150);
        }

        ta.addEventListener('input', update);
        ta.addEventListener('click', update);
        ta.addEventListener('blur', () => setTimeout(close, 100));

        ta.addEventListener('keydown', e => {
            if (ta.dataset.acOpen !== '1') return;
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                highlight((active + 1) % items.length);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                highlight((active - 1 + items.length) % items.length);
            } else if (e.key === 'Enter' || e.key === 'Tab') {
                if (active >= 0) {
                    e.preventDefault();
                    pick(active);
                }
            } else if (e.key === 'Escape') {
                e.preventDefault();
                close();
            }
        });

        // Finish wiring once the textarea is in place
        queueMicrotask(() => {
            if (ta.parentNode && ta.parentNode !== wrap) {
                ta.parentNode.insertBefore(wrap, ta);
                wrap.appendChild(ta);
                wrap.appendChild(list);
            }
        });
        close();
    }

    // =====================================================================
    //  7. INFINITE SCROLLING (posts page)
    //  Loads the next page in the background when you near the bottom and
    //  appends its thumbnails to the current grid.
    // =====================================================================

    function getNextPageUrl(doc) {
        const pag = doc.querySelector('#paginator, .pagination');
        if (!pag) return null;
        let next = pag.querySelector('a[alt="next"], a[rel="next"]');
        if (!next) {
            next = Array.from(pag.querySelectorAll('a')).find(a => a.textContent.trim() === '>');
        }
        if (!next) {
            // The link right after the current page number (<b>)
            const cur = pag.querySelector('b');
            let el = cur && cur.nextElementSibling;
            while (el && el.tagName !== 'A') el = el.nextElementSibling;
            next = el;
        }
        const href = next && next.getAttribute('href');
        return href ? new URL(href, location.href).href : null;
    }

    // pid = number of posts skipped; the site normally shows 42 per page
    let pageStep = 42;

    function pidOf(url) {
        return parseInt(new URL(url, location.href).searchParams.get('pid') || '0', 10) || 0;
    }

    function pageNumberOf(url) {
        return Math.floor(pidOf(url) / pageStep) + 1;
    }

    // Posts per page and the last page, read from the page-number links
    function readPagination(doc, currentPid) {
        const pag = doc.querySelector('#paginator, .pagination');
        let step = null;
        let maxPid = null;
        if (pag) {
            pag.querySelectorAll('a[href*="pid="]').forEach(a => {
                const p = pidOf(a.getAttribute('href'));
                if (p > currentPid && (step === null || p - currentPid < step)) step = p - currentPid;
                if (maxPid === null || p > maxPid) maxPid = p;
            });
        }
        return { step, maxPid };
    }

    // The site hides blocklisted posts only on the first page it renders,
    // so new thumbnails are checked against the blocklist here.
    // Uses its own class, so posts can be shown again after an Undo.
    function hideBlocklisted(thumbs) {
        const blocked = readBlocklist().map(t => t.toLowerCase());
        thumbs.forEach(thumb => {
            const img = thumb.querySelector('img');
            if (!img) return;
            const tags = thumbTags(img).trim().split(' ');
            thumb.classList.toggle('s34-bl-hidden', blocked.some(b => tags.includes(b)));
        });
    }

    // A newly loaded page: set up only its thumbnails, not every one again
    function enhanceThumbs(thumbs) {
        removeTagTooltips(thumbs);
        if (CONFIG.thumbGrid && CONFIG.thumbLayout === 'justified') setThumbRatios(thumbs);
        if (CONFIG.thumbGrid && CONFIG.thumbBadges) addThumbBadges(thumbs);
        if (CONFIG.hoverPreview || CONFIG.hoverHighRes) setupHoverPreview(thumbs);
        if (CONFIG.thumbTagBar) setupTagBars(thumbs);
        showDownloadedState(thumbs);
        addFavButtons(thumbs);
        setupHoverInfo(thumbs);
        markFeedNew(thumbs); // Following feed: NEW on later pages too
    }

    // =====================================================================
    //  10. ARTIST / CHARACTER BAR ON THUMBNAILS (posts page)
    //  Thumbnails only carry plain tag names, not their type. Types are
    //  learned from every tag list the script sees (the posts page sidebar,
    //  every loaded page, every post page) and remembered between visits.
    //  Thumbnails still missing info quietly load their post page, one at a
    //  time, while they're on screen.
    // =====================================================================

    const TAGTYPE_KEY = 'steamy34_tagtypes';
    const TAGTYPE_LIMIT = 40000;
    const tagTypes = new Map(Object.entries((() => {
        try { return GM_getValue(TAGTYPE_KEY, {}) || {}; } catch (e) { return {}; }
    })()));
    let tagTypeSaveTimer = null;

    function learnTagTypes(doc) {
        let learned = 0;
        doc.querySelectorAll('#tag-sidebar li[class*="tag-type-"]').forEach(row => {
            const m = row.className.match(/tag-type-([a-z]+)/);
            const tag = getTagFromRow(row).toLowerCase();
            if (!m || !tag) return;
            if (tagTypes.get(tag) !== m[1]) {
                tagTypes.set(tag, m[1]);
                learned++;
            }
        });
        if (learned) {
            scheduleTagTypeSave();
            if (CONFIG.thumbTagBar && !isPostView) refreshTagBars();
        }
    }

    // The list can hold tens of thousands of tags, so it's saved at most
    // every 15 s while tags are being learned - and right away when you
    // leave or switch away from the page, so nothing gets lost.
    const TAGTYPE_SAVE_MS = 15000;
    function scheduleTagTypeSave() {
        if (tagTypeSaveTimer) return; // a save is already on its way
        tagTypeSaveTimer = setTimeout(saveTagTypes, TAGTYPE_SAVE_MS);
    }
    function flushTagTypes() {
        if (tagTypeSaveTimer) saveTagTypes();
    }
    window.addEventListener('pagehide', flushTagTypes);
    document.addEventListener('visibilitychange', () => { if (document.hidden) flushTagTypes(); });

    // ---- Tag types from the suggestion server ----
    // That server isn't behind the site's Cloudflare check, so this keeps
    // working when loading post pages doesn't. One tag per request.
    const acMissed = new Set(); // tags the server didn't know (this visit only)

    function normalizeType(t) {
        t = String(t || '').toLowerCase();
        if (t === 'meta') return 'metadata';
        if (t === 'char') return 'character';
        return t;
    }

    // Resolves the given tags; returns how many types were learned.
    // Throws if the suggestion server can't be reached at all.
    async function lookupTypesViaSuggestions(tags) {
        let learned = 0;
        for (const tag of tags) {
            if (tagTypes.has(tag) || acMissed.has(tag)) continue;
            const list = await acQuery(tag);
            const hit = list.find(s => s.value.toLowerCase() === tag && s.type);
            if (hit) {
                tagTypes.set(tag, normalizeType(hit.type));
                learned++;
            } else {
                acMissed.add(tag);
            }
            await new Promise(r => setTimeout(r, 120)); // small gap between requests
        }
        if (learned) scheduleTagTypeSave();
        return learned;
    }

    function saveTagTypes() {
        clearTimeout(tagTypeSaveTimer);
        tagTypeSaveTimer = null;
        // Keep the newest entries if the memory gets too big
        if (tagTypes.size > TAGTYPE_LIMIT) {
            const keep = Array.from(tagTypes.entries()).slice(-Math.floor(TAGTYPE_LIMIT * 0.75));
            tagTypes.clear();
            keep.forEach(([k, v]) => tagTypes.set(k, v));
        }
        try { GM_setValue(TAGTYPE_KEY, Object.fromEntries(tagTypes)); } catch (e) {}
    }

    function thumbTagList(thumb) {
        const img = thumb.querySelector('img');
        return img ? thumbTags(img).trim().split(' ').filter(Boolean) : [];
    }

    function prettyTag(tag) {
        return tag.replace(/_/g, ' ');
    }

    function makeChip(tag, type, blockedSet, words) {
        const isBl = blockedSet.has(tag);
        const chip = document.createElement('span');
        chip.className = 's34-chip s34-chip-' + type + (isBl ? ' s34-chip-blocked' : '');

        const name = document.createElement('a');
        name.className = 's34-chip-name';
        name.href = 'index.php?page=post&s=list&tags=' + encodeURIComponent(tag);
        name.textContent = prettyTag(tag);
        name.title = (isBl ? 'Blacklisted – ' : '') + 'Search ' + prettyTag(tag);

        const block = document.createElement('button');
        block.type = 'button';
        block.className = 's34-chip-block';
        block.textContent = isBl ? '↺' : '⊘'; // ↺ unblock / ⊘ block
        block.title = (isBl ? 'Remove from blacklist: ' : 'Blacklist ') + prettyTag(tag);
        block.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();
            toggleFromBar(tag);
        });

        chip.append(name);
        // "+" / "−" / "↺": add the tag to the search or take it out again
        if (CONFIG.addToSearchButtons) chip.append(makeAddButton(tag, 's34-chip-add', words));
        chip.append(block);
        return chip;
    }

    // Blacklist + search words, shared by all tag bars rendered in one go
    function tagBarContext() {
        return {
            blockedSet: new Set(readBlocklist().map(t => t.toLowerCase())),
            words: CONFIG.addToSearchButtons ? searchWords() : []
        };
    }

    function renderTagBar(thumb, ctx) {
        const tags = thumb._s34Tags || (thumb._s34Tags = thumbTagList(thumb));
        const groups = [
            ['artist', tags.filter(t => tagTypes.get(t) === 'artist')],
            ['character', tags.filter(t => tagTypes.get(t) === 'character')]
        ];
        const state = {
            hasArtist: groups[0][1].length > 0,
            hasUnknown: tags.some(t => !tagTypes.has(t))
        };
        ctx = ctx || tagBarContext();

        // Nothing changed since the last time? Then leave the DOM alone
        // (rebuilding hundreds of bars was what made long pages slow).
        const shown = groups.map(([type, list]) => [type, list.slice(0, CONFIG.tagBarMax), list.length]);
        const sig = JSON.stringify([
            shown,
            shown.map(([, list]) => list.map(t => (ctx.blockedSet.has(t) ? 'b' : '') + searchState(t, ctx.words))),
            thumb.dataset.s34Lookup || ''
        ]);
        let bar = thumb.querySelector('.s34-tagbar');
        if (bar && thumb._s34BarSig === sig) return state;
        thumb._s34BarSig = sig;

        if (!bar) {
            bar = document.createElement('div');
            bar.className = 's34-tagbar';
            thumb.appendChild(bar);
        }
        bar.replaceChildren();
        const blockedSet = ctx.blockedSet;

        groups.forEach(([type, list]) => {
            if (!list.length) return;
            const row = document.createElement('div');
            row.className = 's34-chiprow';
            list.slice(0, CONFIG.tagBarMax).forEach(t => row.appendChild(makeChip(t, type, blockedSet, ctx.words)));
            if (list.length > CONFIG.tagBarMax) {
                const more = document.createElement('span');
                more.className = 's34-chip-more';
                more.textContent = '+' + (list.length - CONFIG.tagBarMax);
                more.title = list.slice(CONFIG.tagBarMax).map(prettyTag).join(', ');
                row.appendChild(more);
            }
            bar.appendChild(row);
        });
        // Nothing known yet but a lookup is on its way -> small placeholder
        if (!bar.childElementCount && thumb.dataset.s34Lookup === 'queued') {
            const wait = document.createElement('span');
            wait.className = 's34-chip-more s34-chip-wait';
            wait.textContent = 'loading tags…';
            bar.appendChild(wait);
        }
        bar.style.display = bar.childElementCount ? '' : 'none';

        return state;
    }

    // Thumbnails on (or near) the screen, kept up to date by the observer
    const barsInView = new Set();

    // Update the tag bars after new tag types were learned. Only the ones you
    // can see are redrawn (others catch up when they scroll into view), and
    // many calls in a row are bundled into one.
    let refreshBarsTimer = null;
    function refreshTagBars() {
        if (refreshBarsTimer) return;
        refreshBarsTimer = setTimeout(() => {
            refreshBarsTimer = null;
            const ctx = tagBarContext();
            barsInView.forEach(thumb => {
                if (thumb.isConnected) renderTagBar(thumb, ctx);
                else barsInView.delete(thumb);
            });
        }, 250);
    }

    // ---- Looking up missing tag types: one post page at a time ----
    const lookupQueue = [];
    let lookupRunning = false;

    function queueLookup(thumb) {
        if (thumb.dataset.s34Lookup) return;
        thumb.dataset.s34Lookup = 'queued';
        lookupQueue.push(thumb);
        renderTagBar(thumb); // shows the "…" placeholder
        runLookups();
    }

    // Is the thumbnail on screen or close to it?
    function nearViewport(el, margin = 600) {
        const r = el.getBoundingClientRect();
        return r.bottom > -margin && r.top < window.innerHeight + margin;
    }

    // Drop a thumbnail from the queue; it is queued again when it scrolls into view
    function unqueue(thumb) {
        delete thumb.dataset.s34Lookup;
        if (thumb.isConnected) renderTagBar(thumb);
    }

    let lookupRunId = 0;          // a restarted queue makes an older, stuck run quit
    let lookupProgressAt = 0;     // last time the queue did something

    async function runLookups() {
        if (lookupRunning) return;
        lookupRunning = true;
        const myRun = ++lookupRunId;
        lookupProgressAt = Date.now();
        try {
            while (lookupQueue.length && myRun === lookupRunId) {
                lookupProgressAt = Date.now();

                // (No waiting for Cloudflare here: the suggestion server still
                // works during a check; only the post-page fallback is skipped.)

                // Newest first: what you're looking at right now beats what you
                // scrolled past. Anything far off screen is dropped for now.
                const thumb = lookupQueue.pop();
                try {
                    const link = thumb.querySelector('a[href]');
                    if (!thumb.isConnected || !link || !nearViewport(thumb)) { unqueue(thumb); continue; }

                    const state = renderTagBar(thumb);
                    if (state.hasArtist || !state.hasUnknown) { thumb.dataset.s34Lookup = 'done'; renderTagBar(thumb); continue; }

                    const postId = new URL(link.href, location.href).searchParams.get('id');
                    let usedPostPage = false;

                    // 1) Ask the suggestion server about the unknown tags
                    //    (not affected by the site's Cloudflare checks)
                    let acOk = true;
                    try {
                        const unknown = thumbTagList(thumb).filter(t => !tagTypes.has(t) && !acMissed.has(t));
                        await lookupTypesViaSuggestions(unknown.slice(0, 40));
                    } catch (e) {
                        acOk = false; // server unreachable -> fall back to the post page
                    }
                    lookupProgressAt = Date.now();
                    if (myRun !== lookupRunId) { lookupQueue.push(thumb); break; }

                    let result = renderTagBar(thumb);
                    if (CONFIG.thumbTagBar) refreshTagBars(); // other thumbnails share tags

                    // 2) Still no artist? Read the post page - unless Cloudflare is checking
                    if (!result.hasArtist && !cloudflarePaused() && (!acOk || result.hasUnknown)) {
                        usedPostPage = true;
                        const doc = await fetchPostDoc(link.href, 'lookup', { wanted: () => thumb.isConnected && nearViewport(thumb) });
                        lookupProgressAt = Date.now();
                        if (myRun !== lookupRunId) { lookupQueue.push(thumb); break; }
                        if (!doc && !cloudflarePaused() && !acOk) {
                            console.log('[Steamy34] Tags: post', postId, '→ could not load tags');
                            unqueue(thumb); // retried when it comes into view again
                            continue;
                        }
                    }

                    thumb.dataset.s34Lookup = 'done';
                    result = renderTagBar(thumb);
                    console.log('[Steamy34] Tags: post', postId, '→',
                        result.hasArtist ? 'artist found' : 'no artist tag found',
                        usedPostPage ? '(via post page)' : '(via suggestions)');

                    // Be gentle with the site; post pages need a longer gap
                    await new Promise(r => setTimeout(r, usedPostPage ? 1200 : 150));
                    continue;
                } catch (err) {
                    // One bad thumbnail must never stop the whole queue
                    console.warn('[Steamy34] Tag lookup error:', err);
                    unqueue(thumb);
                }
                await new Promise(r => setTimeout(r, 1200));
            }
        } finally {
            if (myRun === lookupRunId) lookupRunning = false;
        }
    }

    const tagBarObserver = new IntersectionObserver(entries => {
        let ctx = null;
        entries.forEach(e => {
            const thumb = e.target;
            if (!e.isIntersecting) { barsInView.delete(thumb); return; }
            barsInView.add(thumb);
            const state = renderTagBar(thumb, ctx || (ctx = tagBarContext()));
            if (CONFIG.tagBarLookup && !state.hasArtist && state.hasUnknown) queueLookup(thumb);
        });
    }, { rootMargin: '300px 0px' });

    // Safety net: every few seconds, queue visible thumbnails that still
    // have no artist (e.g. ones whose lookup failed or was dropped)
    setInterval(() => {
        if (!CONFIG.thumbTagBar || !CONFIG.tagBarLookup || isPostView || document.hidden) return;

        // Watchdog: queue has work but isn't running, or hasn't moved in 30s -> restart it
        if (lookupQueue.length && (!lookupRunning || Date.now() - lookupProgressAt > 30000)) {
            if (lookupRunning) console.warn('[Steamy34] Tag lookups were stuck - restarting.');
            lookupRunning = false;
            runLookups();
        }

        // Only the thumbnails on screen (not every loaded one)
        let ctx = null;
        barsInView.forEach(thumb => {
            if (!thumb.isConnected) { barsInView.delete(thumb); return; }
            if (thumb.dataset.s34Lookup || !nearViewport(thumb, 0)) return;
            const state = renderTagBar(thumb, ctx || (ctx = tagBarContext()));
            if (!state.hasArtist && state.hasUnknown) queueLookup(thumb);
        });
    }, 4000);

    function setupTagBars(thumbs) {
        (thumbs || pageThumbs()).forEach(thumb => {
            if (thumb.dataset.s34Tagbar) return;
            thumb.dataset.s34Tagbar = '1';
            renderTagBar(thumb);
            tagBarObserver.observe(thumb);
        });
    }

    // ---- Blocking from the bar, with Undo ----
    // Blocking from the bar does NOT make posts vanish: posts already on the
    // page are greyed out and labelled "Blacklisted", so you can keep
    // blocking more tags. Pages loaded later hide them as usual.
    function toggleFromBar(tag) {
        const nowBlocked = toggleBlock(tag);
        markBlocklisted();
        if (nowBlocked) {
            showToast(`Blacklisted "${prettyTag(tag)}"`, 'Undo', () => {
                if (isBlocked(tag)) toggleBlock(tag);
                markBlocklisted();
            });
        } else {
            showToast(`Removed "${prettyTag(tag)}" from the blacklist`);
        }
    }

    function markBlocklisted() {
        const blocked = new Set(readBlocklist().map(t => t.toLowerCase()));
        const ctx = tagBarContext();
        document.querySelectorAll('.image-list span.thumb').forEach(thumb => {
            const hits = (thumb._s34Tags || thumbTagList(thumb)).filter(t => blocked.has(t));
            let label = thumb.querySelector('.s34-bl-label');

            if (hits.length) {
                // Already hidden (came in on a later page)? Leave it hidden.
                if (thumb.classList.contains('s34-bl-hidden')) return;
                thumb.classList.add('s34-bl-marked');
                if (!label) {
                    label = document.createElement('div');
                    label.className = 's34-bl-label';
                    thumb.appendChild(label);
                }
                label.textContent = 'Blacklisted: ' + hits.map(prettyTag).join(', ');
            } else {
                thumb.classList.remove('s34-bl-marked', 's34-bl-hidden');
                if (label) label.remove();
            }
            if (thumb.dataset.s34Tagbar) renderTagBar(thumb, ctx); // update chip states (only if changed)
        });
        if (popupState) renderPopupTags(); // popup viewer shows the same states
    }

    // Messages at the bottom. Several can be on screen at once (newest at the
    // bottom, at most 3), each with its own timer - so an "Undo" doesn't
    // vanish just because another message came in. The same text twice
    // just refreshes the one that's there.
    // durationMs = 0 keeps the message until it's closed
    const TOAST_MAX = 3;

    function hideToast(toast) {
        if (!toast || !toast.isConnected) return;
        clearTimeout(toast._s34Timer);
        toast.classList.remove('s34-show');
        setTimeout(() => toast.remove(), 220);
    }

    function showToast(text, actionLabel, action, durationMs = 6000) {
        if (!document.body) return;
        let stack = document.querySelector('.s34-toasts');
        if (!stack) {
            stack = document.createElement('div');
            stack.className = 's34-toasts';
            document.body.appendChild(stack);
        }
        const live = Array.from(stack.querySelectorAll('.s34-toast.s34-show'));
        let toast = live.find(t => t._s34Text === text + '|' + (actionLabel || ''));
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 's34-toast';
            toast._s34Text = text + '|' + (actionLabel || '');
            const msg = document.createElement('span');
            msg.textContent = text;
            toast.appendChild(msg);
            if (actionLabel) {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.textContent = actionLabel;
                btn.addEventListener('click', () => {
                    action();
                    hideToast(toast);
                });
                toast.appendChild(btn);
            }
            const close = document.createElement('button');
            close.type = 'button';
            close.setAttribute('aria-label', 'Close');
            close.className = 's34-toast-close';
            close.textContent = '✕';
            close.title = 'Close';
            close.addEventListener('click', () => hideToast(toast));
            toast.appendChild(close);
            stack.appendChild(toast);
            // Too many? The oldest goes first
            live.slice(0, Math.max(0, live.length + 1 - TOAST_MAX)).forEach(hideToast);
            requestAnimationFrame(() => toast.classList.add('s34-show'));
        }
        clearTimeout(toast._s34Timer);
        if (durationMs > 0) toast._s34Timer = setTimeout(() => hideToast(toast), durationMs);
    }

    function makeDivider(pageNumber) {
        const div = document.createElement('div');
        div.className = 's34-page-divider';
        const label = document.createElement('span');
        label.textContent = 'Page ' + pageNumber;
        div.appendChild(label);
        return div;
    }

    // The popup asks for the next page when you browse to the end of what's
    // loaded (Beta 3.5.1): 'more' | 'loading' | 'done', null = no infinite
    // scroll on this page. Ask with the 's34-load-more' event.
    let infiniteState = null;

    function setupInfiniteScroll() {
        const list = document.querySelector('.image-list');
        const paginator = document.querySelector('#paginator');
        if (!list || !paginator) return;

        // Next pages are built by counting up "pid" ourselves rather than
        // trusting each fetched page's links - that was ending too early.
        const startPid = pidOf(location.href);
        const info = readPagination(document, startPid);
        if (info.step) pageStep = info.step;
        let maxPid = info.maxPid;               // last page, if the links show it
        if (maxPid === null && !getNextPageUrl(document)) return; // single page of results
        let nextPid = startPid + pageStep;
        let done = false;
        let failures = 0;

        function urlForPid(pid) {
            const u = new URL(location.href);
            u.searchParams.set('pid', String(pid));
            return u.href;
        }

        let loading = false;

        list.dataset.s34Pid = String(startPid); // which page each block is (for "continue where you left off")

        const status = document.createElement('div');
        status.className = 's34-scroll-status';
        list.after(status); // new pages are inserted right before this
        paginator.style.display = 'none';

        // Marker for the page you started on, so every page is labelled
        if (CONFIG.pageDividers) {
            const first = makeDivider(pageNumberOf(location.href));
            first.classList.add('s34-first');
            list.before(first);
        }

        // ---- Cleanup of far-away pages ----
        // A page block that is far outside the window is emptied: its height
        // is kept (so the scroll position doesn't jump), the thumbnails are
        // parked in memory without their images, and everything is put back
        // when you scroll near it again.
        const parked = new Map(); // block -> DocumentFragment

        function park(block) {
            if (parked.has(block)) return;
            const h = block.getBoundingClientRect().height;
            if (!h) return;
            block.style.height = h + 'px';
            block.querySelectorAll('img').forEach(img => {
                const src = img.getAttribute('src');
                if (src) {
                    img.dataset.s34Src = src;
                    img.removeAttribute('src'); // lets the browser free the decoded image
                }
            });
            const frag = document.createDocumentFragment();
            while (block.firstChild) frag.appendChild(block.firstChild);
            parked.set(block, frag);
        }

        function unpark(block) {
            const frag = parked.get(block);
            if (!frag) return;
            parked.delete(block);
            frag.querySelectorAll('img[data-s34-src]').forEach(img => {
                img.src = img.dataset.s34Src; // comes straight from the browser cache
                delete img.dataset.s34Src;
            });
            block.appendChild(frag);
            block.style.height = '';
        }

        const cleanupObserver = CONFIG.cleanupFarPages
            ? new IntersectionObserver(entries => {
                entries.forEach(e => e.isIntersecting ? unpark(e.target) : park(e.target));
            }, { rootMargin: `${CONFIG.cleanupDistance}px 0px ${CONFIG.cleanupDistance}px 0px` })
            : null;

        if (cleanupObserver) cleanupObserver.observe(list);

        function finish(reason) {
            done = true;
            status.textContent = 'End of results';
            console.log('[Steamy34] Infinite scroll finished:', reason);
        }

        const sleep = ms => new Promise(r => setTimeout(r, ms));

        async function loadNext() {
            if (loading || done) return;
            if (maxPid !== null && nextPid > maxPid) { finish('passed the last page (pid ' + maxPid + ')'); return; }
            loading = true;
            status.onclick = null;
            status.textContent = 'Loading more…';
            const nextUrl = urlForPid(nextPid);

            let ok = false;
            try {
                // (through the shared line - a check throws err.cloudflare)
                const res = await loadPage(nextUrl, 'scroll', { ms: 30000 });
                if (!res.ok) throw new Error('HTTP ' + res.status);
                const doc = new DOMParser().parseFromString(res.html, 'text/html');

                // No post list at all = rate limit / check page, not the end
                if (!doc.querySelector('.image-list')) throw new Error('page had no post list (rate limit or check page?)');

                learnTagTypes(doc); // its sidebar lists the types of that page's tags
                const newThumbs = Array.from(doc.querySelectorAll('.image-list span.thumb'))
                    .map(t => document.adoptNode(t));

                // The site may know about more pages now
                const more = readPagination(doc, nextPid);
                if (more.maxPid !== null && (maxPid === null || more.maxPid > maxPid)) maxPid = more.maxPid;

                if (!newThumbs.length) {
                    finish('page ' + pageNumberOf(nextUrl) + ' was empty');
                } else {
                    if (CONFIG.pageDividers) {
                        status.parentNode.insertBefore(makeDivider(pageNumberOf(nextUrl)), status);
                    }

                    // Each page gets its own block, so the half-full last row
                    // of a page isn't stretched by the justified layout
                    const block = document.createElement('div');
                    block.className = list.className;
                    block.dataset.s34Pid = String(nextPid);
                    hideBlocklisted(newThumbs); // before they're shown
                    newThumbs.forEach(t => block.appendChild(t));
                    status.parentNode.insertBefore(block, status);
                    if (cleanupObserver) cleanupObserver.observe(block);
                    enhanceThumbs(newThumbs);

                    nextPid += pageStep;
                    status.textContent = '';
                }
                failures = 0;
                ok = true;
            } catch (err) {
                if (err.cloudflare) {
                    // Can't continue until the check is solved: wait for it
                    // ("Solve check" right here, where loading stopped)
                    status.replaceChildren(cloudflareInline('Loading more waits for a quick Cloudflare check.'));
                    window.addEventListener('s34-cf-passed', () => {
                        status.textContent = '';
                        failures = 0;
                        loadNext();
                    }, { once: true });
                    loading = false;
                    return;
                }
                failures++;
                console.warn('[Steamy34] Could not load', nextUrl, '-', err.message || err, '(attempt ' + failures + ')');
                const reason = String(err.message || err).slice(0, 60);
                if (failures <= 3) {
                    // Wait a bit longer each time, then try again by itself
                    status.textContent = `Site is busy (${reason}) – retrying…`;
                    await sleep(2500 * failures);
                } else {
                    status.textContent = `Could not load more (${reason}) – click to retry`;
                    status.onclick = () => { failures = 0; loadNext(); };
                    loading = false;
                    return;
                }
            }

            loading = false;
            if (done) return;
            // Still near the bottom (e.g. lots of blocked posts, or a retry)? Keep going,
            // with a short pause so the site isn't flooded with requests.
            if (!ok || status.getBoundingClientRect().top < window.innerHeight + CONFIG.infiniteScrollMargin) {
                await sleep(ok ? 400 : 0);
                loadNext();
            }
        }

        new IntersectionObserver(entries => {
            if (entries.some(e => e.isIntersecting)) loadNext();
        }, { rootMargin: `0px 0px ${CONFIG.infiniteScrollMargin}px 0px` }).observe(status);

        // The popup reached the end of the loaded posts
        infiniteState = () => (done ? 'done' : loading ? 'loading' : 'more');
        window.addEventListener('s34-load-more', () => { if (!loading && !done) loadNext(); });

        // Posts were hidden (e.g. "Hide viewed" switched on) while the end of
        // the list was already on screen: the observer doesn't fire again in
        // that case, so check by hand and keep loading.
        window.addEventListener('s34-layout-changed', () => {
            requestAnimationFrame(() => {
                if (!loading && !done && status.getBoundingClientRect().top < window.innerHeight + CONFIG.infiniteScrollMargin) loadNext();
            });
        });
    }

    // =====================================================================
    //  8. SETTINGS MENU (steaming-cup button in the sidebar)
    // =====================================================================

    // Settings window: sections on the left, one section at a time on the
    // right, advanced options folded away, Save / Cancel at the bottom.
    const SETTINGS_TAB_KEY = 'steamy34_settings_tab';
    const LOCK_SVG = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';
    const HELP_SVG = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.4"/><circle cx="12" cy="17" r=".8" fill="currentColor"/></svg>';

    function openSettings() {
        if (document.querySelector('.s34-overlay')) return;

        const overlay = document.createElement('div');
        overlay.className = 's34-overlay s34-set-overlay';
        const panel = document.createElement('div');
        panel.className = 's34-set';
        panel.setAttribute('role', 'dialog');
        overlay.appendChild(panel);

        const sections = SETTINGS_UI.concat([
            { id: 'privacy', title: 'Privacy & data', icon: LOCK_SVG },
            { id: 'help', title: 'Help', icon: HELP_SVG }
        ]);

        panel.innerHTML = `
            <aside class="s34-set-nav">
                <div class="s34-set-brand">
                    <img src="${logoData()}" alt="">
                    <div><b>Steamy34</b><span>Settings · ${CURRENT_VERSION}</span></div>
                </div>
                <nav></nav>
                <div class="s34-set-safe">${LOCK_SVG}<span>Nothing is collected – everything stays on this computer.</span></div>
                <a class="s34-set-discord" href="${DISCORD_URL}" target="_blank" rel="noopener noreferrer" title="Join the steamycorner Discord – #feedback and #new-ideas for Steamy34">${DISCORD_SVG}<span><b>Join the Discord</b><small>Ideas, bugs, news</small></span></a>
            </aside>
            <section class="s34-set-main">
                <div class="s34-set-head">
                    <h2></h2>
                    <input type="search" class="s34-set-search" placeholder="Search settings…" aria-label="Search settings" autocomplete="off">
                    <button type="button" class="s34-set-x" data-act="cancel" title="Close (Esc)">✕</button>
                </div>
                <div class="s34-set-body"></div>
                <div class="s34-set-foot">
                    <button type="button" class="s34-set-btn s34-set-tourbtn" data-act="welcome" title="Watch the welcome tour again">✨ Welcome tour</button>
                    <span class="s34-set-dirty" hidden>Unsaved changes</span>
                    <button type="button" class="s34-set-btn" data-act="cancel">Cancel</button>
                    <button type="button" class="s34-set-btn s34-set-primary" data-act="save">Save &amp; reload</button>
                </div>
            </section>`;

        const nav = panel.querySelector('nav');
        const body = panel.querySelector('.s34-set-body');
        const fields = {}; // key -> element
        const pages = {};
        const markDirty = () => { panel.querySelector('.s34-set-dirty').hidden = false; };

        function makeControl(key, extra, value, id) {
            let el;
            if (extra.options) {
                el = document.createElement('select');
                Object.entries(extra.options).forEach(([v, text]) => {
                    const o = document.createElement('option');
                    o.value = v;
                    o.textContent = text;
                    if (v === value) o.selected = true;
                    el.appendChild(o);
                });
            } else if (extra.hotkey) {
                // Click the box, then press the key you want
                el = document.createElement('input');
                el.type = 'text';
                el.readOnly = true;
                el.className = 's34-hotkey';
                el.dataset.code = value;
                el.value = keyLabel(value);
                el.addEventListener('focus', () => { el.value = 'Press a key…'; });
                el.addEventListener('blur', () => { el.value = keyLabel(el.dataset.code); });
                el.addEventListener('keydown', e => {
                    if (['Escape', 'Tab'].includes(e.key)) return;
                    if (['Shift', 'Control', 'Alt', 'Meta'].includes(e.key)) return;
                    e.preventDefault();
                    e.stopPropagation();
                    el.dataset.code = e.code;
                    markDirty();
                    el.blur();
                });
            } else if (typeof DEFAULTS[key] === 'boolean') {
                el = document.createElement('input');
                el.type = 'checkbox';
                el.checked = value;
            } else if (typeof DEFAULTS[key] === 'number') {
                el = document.createElement('input');
                el.type = 'number';
                if (extra.min != null) el.min = extra.min;
                if (extra.max != null) el.max = extra.max;
                el.value = value;
            } else {
                el = document.createElement('input');
                el.type = 'text';
                el.value = value;
            }
            el.id = id;
            el.addEventListener('change', markDirty);
            return el;
        }

        function makeRow(key, label, extra) {
            const row = document.createElement('div');
            row.className = 's34-set-row' + (extra.adv ? ' s34-set-adv' : '');
            row.dataset.key = key;
            const id = 's34-set-' + key;
            const text = document.createElement('label');
            text.className = 's34-set-label';
            text.htmlFor = id;
            const b = document.createElement('span');
            b.textContent = label;
            text.appendChild(b);
            if (extra.hint) {
                const h = document.createElement('small');
                h.textContent = extra.hint;
                text.appendChild(h);
            }
            const ctl = document.createElement('div');
            ctl.className = 's34-set-ctl';
            if (extra.folder) {
                // Not a normal setting: the folder is picked / removed right away
                ctl.classList.add('s34-folder-ctl');
                buildFolderControl(ctl, id);
                row.append(text, ctl);
                return row;
            }
            const el = makeControl(key, extra, CONFIG[key], id);
            if (el.type === 'checkbox') {
                // A switch instead of a plain tick box
                const sw = document.createElement('label');
                sw.className = 's34-sw';
                sw.htmlFor = id;
                sw.append(el, Object.assign(document.createElement('span'), { className: 's34-sw-track' }));
                ctl.appendChild(sw);
            } else {
                ctl.appendChild(el);
                if (extra.unit) {
                    const u = document.createElement('span');
                    u.className = 's34-unit';
                    u.textContent = extra.unit;
                    ctl.appendChild(u);
                }
            }
            fields[key] = el;
            row.append(text, ctl);
            return row;
        }

        // ---- the setting sections ----
        const openAdvanced = {};   // section id -> unfolds its "advanced" card
        SETTINGS_UI.forEach(sec => {
            const page = document.createElement('div');
            page.className = 's34-set-page';
            const basic = document.createElement('div');
            basic.className = 's34-set-card';
            const adv = document.createElement('div');
            adv.className = 's34-set-card s34-set-advcard';
            sec.rows.forEach(([key, label, extra = {}]) => (extra.adv ? adv : basic).appendChild(makeRow(key, label, extra)));
            page.appendChild(basic);
            if (adv.childElementCount) {
                const toggle = document.createElement('button');
                toggle.type = 'button';
                toggle.className = 's34-set-advbtn';
                const n = adv.childElementCount;
                const show = open => {
                    adv.hidden = !open;
                    toggle.textContent = (open ? '▾ Hide advanced' : '▸ Show advanced') + ` (${n})`;
                };
                toggle.addEventListener('click', () => show(adv.hidden));
                show(false);
                page.append(toggle, adv);
                openAdvanced[sec.id] = () => show(true);
            }
            pages[sec.id] = page;
        });

        // ---- Privacy & data: what is stored, backup, reset ----
        {
            const page = document.createElement('div');
            page.className = 's34-set-page';
            page.appendChild(buildPrivacySection());
            const backup = document.createElement('div');
            backup.className = 's34-set-card s34-set-plain';
            backup.innerHTML = `
                <div class="s34-set-cardhead">Backup</div>
                <p>Settings, searches, favourite tags, collections, downloaded / viewed posts, favourites, votes and your blacklist in one file – e.g. to move to another browser or your phone.</p>
                <div class="s34-set-actions">
                    <button type="button" class="s34-set-btn" data-act="export">⬇ Export backup</button>
                    <button type="button" class="s34-set-btn" data-act="import">⬆ Import backup</button>
                </div>
                <div class="s34-set-cardhead">Reset</div>
                <p>Puts every setting back to how it was at the start. Your searches, collections and so on stay.</p>
                <div class="s34-set-actions">
                    <button type="button" class="s34-set-btn s34-set-danger" data-act="reset">Reset all settings</button>
                </div>`;
            page.appendChild(backup);
            pages.privacy = page;
        }

        // ---- Help ----
        {
            const page = document.createElement('div');
            page.className = 's34-set-page';
            page.innerHTML = `
                <div class="s34-set-card s34-set-plain">
                    <div class="s34-set-cardhead">About Steamy34</div>
                    <p><b>A fan-made hobby project.</b> Steamy34 is made for fun by steamycorner. It's free and will
                       never be monetized – no ads, no paid features, no data collection. It isn't made by or
                       connected to rule34.xxx.</p>
                    <div class="s34-set-cardhead">Getting around</div>
                    <p>The handiest keys and clicks – middle click closes a post, ${browseKeyText()} browse, ${keyLabel(CONFIG.downloadKey)} downloads – are all in the quick tips.</p>
                    <div class="s34-set-actions">
                        <button type="button" class="s34-set-btn" data-act="welcome">✨ Welcome tour</button>
                        <button type="button" class="s34-set-btn" data-act="tips"><span class="s34-qmark">?</span> Shortcuts &amp; tips</button>
                        <button type="button" class="s34-set-btn" data-act="changelog">What's new</button>
                        <button type="button" class="s34-set-btn" data-act="mobile">${PHONE_SVG.replace('width="22" height="22"', 'width="15" height="15"')} On your phone</button>
                    </div>
                    <div class="s34-set-cardhead">Questions, bugs or ideas?</div>
                    <div class="s34-set-actions"><button type="button" class="s34-set-btn" data-act="debug" title="Shows what would be shared, then copies it – no searches, tags or artists">🐞 Copy info for a bug report</button></div>
                    <p>Join the Steamy34 channels (#feedback, #new-ideas) on steamycorner's <a href="${DISCORD_URL}" target="_blank" rel="noopener noreferrer">Discord</a> – or write in the <a href="${SLEAZY_URL}/feedback" target="_blank" rel="noopener noreferrer">Feedback tab on Sleazy Fork</a>. More from steamycorner: <a href="https://linktr.ee/steamycorner" target="_blank" rel="noopener noreferrer">linktr.ee/steamycorner</a></p>
                    <p class="s34-set-ver">Steamy34 ${CURRENT_VERSION}</p>
                </div>`;
            pages.help = page;
        }

        // ---- section menu ----
        function showSection(id) {
            if (!pages[id]) id = 'look';
            nav.querySelectorAll('button').forEach(b => b.classList.toggle('s34-on', b.dataset.sec === id));
            body.replaceChildren(pages[id]);
            body.scrollTop = 0;
            panel.querySelector('.s34-set-head h2').textContent = sections.find(s => s.id === id).title;
            try { sessionStorage.setItem(SETTINGS_TAB_KEY, id); } catch (e) {}
        }
        sections.forEach(sec => {
            const b = document.createElement('button');
            b.type = 'button';
            b.dataset.sec = sec.id;
            b.innerHTML = sec.icon + '<span></span>';
            b.querySelector('span').textContent = sec.title;
            b.addEventListener('click', () => showSection(sec.id));
            nav.appendChild(b);
        });
        let startTab = 'look';
        try { startTab = sessionStorage.getItem(SETTINGS_TAB_KEY) || 'look'; } catch (e) {}
        showSection(startTab);

        // ---- Search settings: type a word, click a result to jump there ----
        // Searches labels, hints, choices and the section names, plus the
        // buttons on the Privacy and Help pages.
        const searchIndex = [];
        SETTINGS_UI.forEach(sec => sec.rows.forEach(([key, label, extra = {}]) => {
            searchIndex.push({
                sec: sec.id, key, label, hint: extra.hint || '', adv: !!extra.adv,
                text: [label, extra.hint, sec.title, key, extra.options && Object.values(extra.options).join(' ')].filter(Boolean).join(' ').toLowerCase()
            });
        }));
        [
            ['privacy', 'What is stored', 'See and delete everything Steamy34 keeps – privacy, data, storage'],
            ['privacy', 'Export / import backup', 'Move everything to another browser or your phone – backup, restore, save'],
            ['privacy', 'Reset all settings', 'Back to how it was at the start – default'],
            ['help', 'Welcome tour', 'The best features, slide by slide – intro, introduction, first start'],
            ['help', 'Shortcuts & quick tips', 'All keys and gestures – keyboard, hotkeys, help'],
            ['help', 'What\'s new', 'The changelog – updates, version'],
            ['help', 'On your phone', 'Android guide – mobile, install'],
            ['help', 'About Steamy34', 'Fan project, contact, feedback, bugs']
        ].forEach(([sec, label, hint]) => searchIndex.push({ sec, key: null, label, hint, adv: false, text: (label + ' ' + hint + ' ' + sec).toLowerCase() }));

        const searchBox = panel.querySelector('.s34-set-search');
        function showSearch(q) {
            const words = q.toLowerCase().split(/\s+/).filter(Boolean);
            if (!words.length) { showSection(nav.querySelector('button.s34-on') ? nav.querySelector('button.s34-on').dataset.sec : 'look'); return; }
            const hits = searchIndex.filter(it => words.every(w => it.text.includes(w)));
            const list = document.createElement('div');
            list.className = 's34-set-card s34-set-results';
            if (!hits.length) {
                list.innerHTML = '<p class="s34-set-nohit">Nothing found – try another word.</p>';
            }
            hits.forEach(it => {
                const b = document.createElement('button');
                b.type = 'button';
                b.className = 's34-set-hit-btn';
                const where = sections.find(s => s.id === it.sec).title + (it.adv ? ' · advanced' : '');
                b.innerHTML = '<span></span><small></small><em></em>';
                b.querySelector('span').textContent = it.label;
                b.querySelector('small').textContent = it.hint;
                b.querySelector('em').textContent = where;
                b.addEventListener('click', () => {
                    searchBox.value = '';
                    showSection(it.sec);
                    if (it.adv && openAdvanced[it.sec]) openAdvanced[it.sec]();
                    const row = it.key && pages[it.sec].querySelector('.s34-set-row[data-key="' + it.key + '"]');
                    if (row) {
                        row.scrollIntoView({ block: 'center' });
                        row.classList.remove('s34-set-flash');
                        void row.offsetWidth;
                        row.classList.add('s34-set-flash');
                        const ctl = row.querySelector('input, select, button');
                        if (ctl) ctl.focus({ preventScroll: true });
                    }
                });
                list.appendChild(b);
            });
            nav.querySelectorAll('button').forEach(b => b.classList.toggle('s34-on', false));
            panel.querySelector('.s34-set-head h2').textContent = hits.length + (hits.length === 1 ? ' result' : ' results');
            body.replaceChildren(list);
            body.scrollTop = 0;
        }
        searchBox.addEventListener('input', () => showSearch(searchBox.value));
        searchBox.addEventListener('keydown', e => {
            if (e.key === 'Enter') { e.preventDefault(); const first = body.querySelector('.s34-set-hit-btn'); if (first) first.click(); }
        });
        // Picking a section in the menu ends the search
        nav.addEventListener('click', () => { searchBox.value = ''; });

        function close() {
            overlay.remove();
            document.removeEventListener('keydown', onKey, true);
        }
        function onKey(e) {
            if (document.querySelector('.s34-tips-overlay, .s34-cl-overlay, .s34-mob-overlay, .s34-wel-overlay')) return; // Esc closes those first
            if (e.key !== 'Escape') return;
            e.stopPropagation();
            // Setting a new hotkey? Esc just cancels that, not the whole window
            const active = document.activeElement;
            if (active && active.classList && active.classList.contains('s34-hotkey')) {
                e.preventDefault();
                active.blur();
                return;
            }
            // Something typed in "Search settings"? Esc clears that first
            if (active && active.classList && active.classList.contains('s34-set-search') && active.value) {
                e.preventDefault();
                active.value = '';
                active.dispatchEvent(new Event('input'));
                return;
            }
            close();
        }

        function collect() {
            const out = {};
            for (const key in fields) {
                const el = fields[key];
                const def = DEFAULTS[key];
                let v;
                if (el.classList.contains('s34-hotkey')) v = el.dataset.code || def;
                else if (typeof def === 'boolean') v = el.checked;
                else if (typeof def === 'number') {
                    v = parseFloat(el.value);
                    if (isNaN(v)) v = def;
                    if (el.min !== '') v = Math.max(v, parseFloat(el.min));
                    if (el.max !== '') v = Math.min(v, parseFloat(el.max));
                } else v = el.value;
                // Only store what differs from the defaults
                if (v !== def) out[key] = v;
            }
            return out;
        }

        panel.addEventListener('click', e => {
            const btn = e.target.closest('[data-act]');
            const act = btn && btn.dataset.act;
            if (!act) return;
            if (act === 'cancel') close();
            else if (act === 'save') {
                // Keep settings that live outside this window (sidebar switches)
                const keep = loadSaved();
                for (const k in fields) delete keep[k];
                GM_setValue(SETTINGS_KEY, Object.assign(keep, collect()));
                location.reload();
            } else if (act === 'welcome') {
                openWelcome(0);
            } else if (act === 'debug') {
                openDebugInfo();
            } else if (act === 'tips') {
                openQuickTips();
            } else if (act === 'changelog') {
                openChangelog(null);
            } else if (act === 'mobile') {
                openMobileGuide();
            } else if (act === 'export') {
                exportBackup();
            } else if (act === 'import') {
                importBackup();
            } else if (act === 'reset') {
                if (confirm('Reset all Steamy34 settings to how they were at the start?')) {
                    GM_setValue(SETTINGS_KEY, {});
                    location.reload();
                }
            }
        });
        overlay.addEventListener('mousedown', e => { if (e.target === overlay) close(); });
        document.addEventListener('keydown', onKey, true);

        document.body.appendChild(overlay);
    }

    // A div that acts as a button: reachable with Tab, Enter / Space click it
    function makeKeyClickable(el, label) {
        el.setAttribute('role', 'button');
        el.tabIndex = 0;
        if (label) el.setAttribute('aria-label', label);
        el.addEventListener('keydown', e => {
            if ((e.key === 'Enter' || e.key === ' ') && e.target === el) {
                e.preventDefault();
                e.stopPropagation();
                el.click();
            }
        });
        return el;
    }

    const GEAR_SVG = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>';

    function addSettingsButton() {
        const gear = document.createElement('div');
        gear.className = 's34-gear';
        gear.title = 'Steamy34 Settings · ' + CURRENT_VERSION;
        makeKeyClickable(gear, 'Steamy34 Settings');
        const icon = new Image();
        icon.src = logoData();
        icon.alt = 'Steamy34 Settings';
        gear.appendChild(icon);
        gear.addEventListener('click', openSettings);

        // In the sidebar: a slim "⚙ Settings" button (the logo and version
        // sit in their own small line below - see addTipsLink)
        const makeInline = () => {
            gear.classList.add('s34-inline');
            icon.remove();
            gear.insertAdjacentHTML('beforeend', GEAR_SVG);
            const label = document.createElement('span');
            label.className = 's34-gear-text';
            label.textContent = 'Settings';
            gear.appendChild(label);
        };

        // Posts page: put it in the sidebar where the tag list used to be
        const tagList = document.querySelector('#tag-sidebar');
        const slot = isPostView ? getPostSidebarSlot() : null;
        if (!isPostView && CONFIG.hideListTags && tagList) {
            makeInline();
            tagList.after(gear); // sticks together with the sidebar
        } else if (slot) {
            // Single post: in the sidebar, under the Download button
            makeInline();
            slot.appendChild(gear);
        } else {
            document.body.appendChild(gear);
        }
    }

    // Single post pages: a box in the sidebar, right below the search,
    // that holds the Download and Settings buttons
    let postSidebarSlot;
    function getPostSidebarSlot() {
        if (postSidebarSlot !== undefined) return postSidebarSlot;
        postSidebarSlot = null;

        const sidebar = document.querySelector('.sidebar, #sidebar') ||
                        (document.querySelector('#tag-sidebar') || {}).parentElement;
        if (!sidebar) return null;

        const slot = document.createElement('div');
        slot.className = 's34-tools';

        // Find the search block. Climb up towards the sidebar, but never to an
        // element that also holds the tag list (that must not become sticky).
        const tagList = document.querySelector('#tag-sidebar');
        const searchField = sidebar.querySelector('input[name="tags"], textarea[name="tags"]');
        let anchor = searchField && (searchField.closest('.tag-search') || searchField.closest('form'));
        while (anchor && anchor.parentElement && anchor.parentElement !== sidebar &&
               sidebar.contains(anchor.parentElement) &&
               !(tagList && anchor.parentElement.contains(tagList))) {
            anchor = anchor.parentElement;
        }
        if (anchor && tagList && anchor.contains(tagList)) anchor = null;

        // Search + Download + Settings together in one box that stays at
        // the top while you scroll
        const box = document.createElement('div');
        box.className = 's34-sticky-top';
        if (anchor) {
            anchor.before(box);
            box.append(anchor, slot);
        } else {
            sidebar.prepend(box);
            box.append(slot);
        }

        postSidebarSlot = slot;
        return slot;
    }

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
        const win = document.querySelector('.s34-follow-win');
        if (win && win._s34Render) win._s34Render();
        fwRefresh(); // the Following window, if open
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
    let followCheckRunning = false;
    async function checkFollowing(force) {
        if (!CONFIG.checkFollowing || followCheckRunning) return;
        let d = getFollowing();
        const groups = followGroups(d);
        if (!groups.length || (!force && Date.now() - d.checkedAt < FOLLOW_CHECK_EVERY)) return;
        followCheckRunning = true;
        try {
            for (let i = 0; i < groups.length; i++) {
                if (cloudflarePaused()) break;
                let html, status;
                try {
                    // (in the shared line; on its own it waits until you're not clicking around)
                    const r = await loadPage(plainSearchUrl(groupQuery(groups[i])), force ? 'followNow' : 'follow');
                    status = r.status;
                    html = r.html;
                } catch (e) { if (e.cloudflare || e.paused) break; continue; }
                if (status < 200 || status >= 300) continue;
                const doc = new DOMParser().parseFromString(html, 'text/html');
                const posts = Array.from(doc.querySelectorAll('span.thumb')).map(t => ({ id: parseInt(thumbPostId(t), 10) || 0, thumb: t }));
                const pageMax = posts.reduce((m, p) => Math.max(m, p.id), 0);
                d = getFollowing(); // fresh: something may have changed meanwhile
                groups[i].forEach(tag => {
                    const a = findArtist(tag, d);
                    if (!a) return;
                    const theirs = posts.filter(p => thumbArtists(p.thumb, [tag]).length);
                    const ids = theirs.map(p => p.id);
                    const max = ids.length ? Math.max(...ids) : 0;
                    if (!a.seen) {
                        // First look: "new" starts after what's there now
                        a.seen = max || pageMax;
                        a.count = 0;
                    } else {
                        a.count = ids.filter(id => id > a.seen).length;
                    }
                    a.more = a.count > 0 && a.count === ids.length && posts.length >= 40;
                    a.latest = Math.max(a.latest || 0, max);
                    if (theirs.length) a.pic = thumbPicOf(theirs[0].thumb) || a.pic; // newest first
                });
                saveFollowing(d);
                renderFollowBox(d);
                fwRefresh();
                if (i < groups.length - 1) await pause(1500);
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
        d.artists.forEach(a => { a.seen = Math.max(a.seen || 0, a.latest || 0); a.count = 0; a.more = false; });
        saveFollowing(d);
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
            w.body.querySelectorAll('.s34-follow-act').forEach(b => { b.disabled = !nA; });
            w.body.querySelector('[data-a="open"]').hidden = !nA;
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
                const t = followTotals(null, true);
                showToast(t.n ? `${t.text} in what you follow.` : 'Nothing new right now.');
            }
        });
        render();
        const d0 = getFollowing();
        if (!d0.artists.length) input.focus({ preventScroll: true });
    }
    // =====================================================================
    //  CENSORED MODE (was "screenshot mode" until Beta 3.4)
    //  X (or the switch in the sidebar) blurs every picture and video:
    //  thumbnails, the popup, post pages, hover previews, collections - and
    //  (setting censorComments, on by default) comment texts and names.
    //  Only what you see changes - downloads stay exactly as they are.
    //  Stays on (also after a reload) until you turn it off; a small label
    //  at the bottom says it's on. The html classes are set right at the
    //  start (10-colour-modes.js), so nothing flashes unblurred.
    //  The name lives in CENSOR_NAME only - change it there.
    // =====================================================================
    const SFW_KEY = 'steamy34_sfw';
    const CENSOR_NAME = 'Censored mode';

    function sfwOn() { return document.documentElement.classList.contains('s34-sfw'); }

    function setScreenshotMode(on) {
        document.documentElement.classList.toggle('s34-sfw', on);
        document.documentElement.classList.toggle('s34-sfw-text', on && CONFIG.censorComments);
        try { GM_setValue(SFW_KEY, on); } catch (e) {}
        document.querySelectorAll('.s34-q-sfw input').forEach(cb => { cb.checked = on; });
        showSfwLabel();
        showToast(on ? `${CENSOR_NAME} on – pictures${CONFIG.censorComments ? ' and comments' : ''} are blurred, safe for screenshots. X turns it off.` : `${CENSOR_NAME} off.`);
    }

    // Small label at the bottom right while it's on (click = off)
    function showSfwLabel() {
        let label = document.querySelector('.s34-sfw-label');
        if (!sfwOn()) { if (label) label.remove(); return; }
        if (label || !document.body) return;
        label = document.createElement('button');
        label.type = 'button';
        label.className = 's34-sfw-label';
        label.title = 'Click (or press X) to show everything again';
        label.innerHTML = '<span></span><kbd>X</kbd>';
        label.querySelector('span').textContent = CENSOR_NAME;
        label.addEventListener('click', () => setScreenshotMode(false));
        document.body.appendChild(label);
    }

    function setupScreenshotMode() {
        showSfwLabel();
        document.addEventListener('keydown', e => {
            if (e.code !== 'KeyX' || e.ctrlKey || e.altKey || e.metaKey || e.shiftKey || e.repeat) return;
            const t = e.target;
            if (t.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName)) return;
            if (document.querySelector('.s34-overlay:not(.s34-pv-overlay):not(.s34-under-popup)')) return; // settings etc. open
            if ([CONFIG.downloadKey, CONFIG.favKey, CONFIG.collectKey, CONFIG.theaterKey, CONFIG.followKey, CONFIG.followingKey].includes('KeyX')) return; // your own key wins
            e.preventDefault();
            setScreenshotMode(!sfwOn());
        }, true);
    }

    // The switch in the sidebar's "View" group (under "Hide downloaded")
    function addSfwSwitch(panel) {
        if (!panel || panel.querySelector('.s34-q-sfw')) return;
        const row = document.createElement('label');
        row.className = 's34-q-switch s34-q-sfw';
        row.title = 'Blurs every picture and video' + (CONFIG.censorComments ? ' and the comments' : '') + ' – safe for screenshots or in public. X turns it on and off';
        row.innerHTML = '<input type="checkbox"><span class="s34-q-track"></span><span class="s34-q-sfw-name"></span>';
        row.querySelector('.s34-q-sfw-name').textContent = CENSOR_NAME;
        const cb = row.querySelector('input');
        cb.checked = sfwOn();
        cb.addEventListener('change', () => setScreenshotMode(cb.checked));
        const after = panel.querySelector('[data-k="hideDownloaded"]') || panel.querySelector('[data-k="hideViewed"]');
        const head = panel.querySelector('.s34-q-head');
        if (after) after.closest('label').after(row); else if (head) head.after(row); else panel.prepend(row);
    }
    // =====================================================================
    //  SUPPORT & HEALTH
    //  - "Copy info for a bug report" (Settings → Help): version, browser,
    //    layout, changed settings, counts and the last problems - no
    //    searches, tags, artists or post numbers, so it's safe to share.
    //  - Site check: if rule34's page doesn't look like Steamy34 expects
    //    (the site changed its layout), a calm one-time message instead of
    //    half-working features.
    //  - Rating nudge: once ever, after a week of use.
    // =====================================================================
    const PROBLEMS = [];            // the last problems on this page (for the bug report)
    function noteProblem(msg) {
        const line = new Date().toTimeString().slice(0, 8) + '  ' + String(msg).replace(/\s+/g, ' ').slice(0, 220);
        if (PROBLEMS[PROBLEMS.length - 1] === line) return;
        PROBLEMS.push(line);
        if (PROBLEMS.length > 12) PROBLEMS.shift();
    }
    // Errors that come from Steamy34's own code (or mention it)
    window.addEventListener('error', e => {
        const where = (e.filename || '') + ' ' + ((e.error && e.error.stack) || '');
        if (/steamy34|userscript|tampermonkey|violentmonkey|user\.js/i.test(where + ' ' + e.message)) noteProblem('Error: ' + e.message);
    });
    window.addEventListener('unhandledrejection', e => {
        const r = e.reason || {};
        const text = (r.stack || r.message || String(r));
        if (/steamy34|userscript|user\.js/i.test(text)) noteProblem('Unhandled: ' + (r.message || String(r)));
    });

    function browserName() {
        const ua = navigator.userAgent;
        let m;
        if (navigator.brave) return 'Brave' + ((m = /Chrome\/(\d+)/.exec(ua)) ? ' (Chromium ' + m[1] + ')' : '');
        if ((m = /Edg\/(\d+)/.exec(ua))) return 'Edge ' + m[1];
        if ((m = /OPR\/(\d+)/.exec(ua))) return 'Opera ' + m[1];
        if ((m = /Firefox\/(\d+)/.exec(ua))) return 'Firefox ' + m[1];
        if ((m = /Chrome\/(\d+)/.exec(ua))) return 'Chrome ' + m[1];
        if ((m = /Version\/(\d+).*Safari/.exec(ua))) return 'Safari ' + m[1];
        return 'unknown browser';
    }
    function systemName() {
        const ua = navigator.userAgent;
        if (/Android/i.test(ua)) return 'Android';
        if (/iPhone|iPad/i.test(ua)) return 'iOS';
        if (/Windows/i.test(ua)) return 'Windows';
        if (/Mac OS X/i.test(ua)) return 'macOS';
        if (/Linux/i.test(ua)) return 'Linux';
        return '?';
    }

    function debugInfoText() {
        const lines = [];
        let manager = '?';
        try { if (typeof GM_info !== 'undefined') manager = (GM_info.scriptHandler || 'userscript manager') + ' ' + (GM_info.version || ''); } catch (e) {}
        lines.push('Steamy34 ' + CURRENT_VERSION + ' · ' + browserName() + ' · ' + systemName() + ' · ' + manager.trim());
        const page = isPostView ? 'single post' : fwState ? 'Following window' : (params.get('page') === 'post' ? 'posts page' : (params.get('page') || 'start page'));
        lines.push('Page: ' + page + ' · ' + (isPhoneLayout() ? 'phone layout' : 'computer layout') + ' · window ' + innerWidth + '×' + innerHeight +
                   (NO_HOVER ? ' · touch' : '') + (sfwOn() ? ' · censored mode on' : ''));
        // Settings that differ from the defaults (no folder names or texts)
        const changed = Object.keys(DEFAULTS).filter(k => CONFIG[k] !== DEFAULTS[k] && !/Joiner|Separator|darkMode/.test(k))
            .map(k => k + '=' + CONFIG[k]);
        lines.push('Changed settings: ' + (changed.length ? changed.join(', ') : 'none'));
        let f = { artists: [], searches: [] };
        try { f = getFollowing(); } catch (e) {}
        const count = o => { try { return Object.keys(o || {}).length; } catch (e) { return '?'; } };
        lines.push('Data: following ' + f.artists.length + ' artists · viewed ' + count(loadViewed()) +
                   ' · downloaded ' + count(loadDownloaded()) + ' · blacklist ' + readBlocklist().length + ' tags · collections ' + getCollections().length);
        const site = siteShapeProblems();
        lines.push('Site check: ' + (site.length ? 'missing ' + site.join(', ') : 'OK'));
        // The last Cloudflare check: what hit it, and what loaded in the 2 minutes before
        const cf = lastCheckInfo();
        if (cf && cf.at) {
            const mins = Math.round((Date.now() - cf.at) / 60000);
            const ago = mins < 60 ? mins + ' min ago' : mins < 2880 ? Math.round(mins / 60) + ' h ago' : Math.round(mins / 1440) + ' days ago';
            const before = Object.keys(cf.before || {}).map(k => pageKind(k).label + ' ' + cf.before[k]).join(', ');
            lines.push('Last Cloudflare check: ' + ago + ', hit by ' + pageKind(cf.kind).label + ' · page loads in the 2 min before: ' + (before || 'none'));
        } else {
            lines.push('Last Cloudflare check: none');
        }
        const now = recentPages(600000);
        lines.push('Page loads, last 10 min: ' + (Object.keys(now).map(k => pageKind(k).label + ' ' + now[k]).join(', ') || 'none'));
        lines.push('Recent problems:' + (PROBLEMS.length ? '\n  ' + PROBLEMS.join('\n  ') : ' none'));
        return lines.join('\n');
    }

    async function copyText(text) {
        try { await navigator.clipboard.writeText(text); return true; } catch (e) {}
        try {
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.style.cssText = 'position:fixed;left:-9999px;top:0;';
            document.body.appendChild(ta);
            ta.select();
            const ok = document.execCommand('copy');
            ta.remove();
            return ok;
        } catch (e) { return false; }
    }

    // A small window that shows exactly what would be shared, with Copy
    function openDebugInfo() {
        if (document.querySelector('.s34-debug-win')) return;
        const text = debugInfoText();
        const w = openWindow({ cls: 's34-debug-win', icon: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h2"/></svg>', title: 'Info for a bug report', width: 600 });
        w.setSub('No searches, tags, artists or post numbers – only what helps find the problem');
        w.body.innerHTML = `
            <pre class="s34-debug-text"></pre>
            <p class="s34-debug-how">Copy it and paste it into <b>#feedback</b> on the <a href="${DISCORD_URL}" target="_blank" rel="noopener noreferrer">Discord</a> (or the Feedback tab on Sleazy Fork) – together with what you did and what happened.</p>
            <div class="s34-debug-foot"><button type="button" class="s34-follow-act s34-follow-primary" data-a="copy">Copy</button></div>`;
        w.body.querySelector('.s34-debug-text').textContent = text;
        w.body.querySelector('[data-a="copy"]').addEventListener('click', async e => {
            const ok = await copyText(text);
            e.target.textContent = ok ? 'Copied ✓' : 'Select the text and copy it';
        });
    }

    // ---- Site check ----
    // What Steamy34 relies on, per page type ([] = everything there)
    function siteShapeProblems() {
        if (params.get('page') !== 'post') return [];
        const missing = [];
        if (isPostView) {
            if (!document.querySelector('#image, video, .fluid_video_wrapper, #gelcomVideoPlayer, img#image')) missing.push('post picture / video');
            if (!document.querySelector('#tag-sidebar')) missing.push('tag list');
            if (!document.querySelector('#stats, .sidebar #stats')) missing.push('post info');
        } else if (params.get('s') === 'list') {
            if (!document.querySelector('.image-list')) missing.push('post list');
            if (!document.querySelector('input[name="tags"], textarea[name="tags"], .s34-sb')) missing.push('search box');
        }
        return missing;
    }
    const SITE_WARN_KEY = 'steamy34_sitecheck_warned';
    function checkSiteShape() {
        // a Cloudflare check page or an empty page isn't a layout change
        if (!document.body || /just a moment|attention required/i.test(document.title)) return;
        const missing = siteShapeProblems();
        if (!missing.length) return;
        noteProblem('Site check: missing ' + missing.join(', '));
        console.warn('[Steamy34] rule34 looks different than expected – missing:', missing.join(', '));
        let last = 0;
        try { last = GM_getValue(SITE_WARN_KEY, 0) || 0; } catch (e) {}
        if (Date.now() - last < 24 * 3600 * 1000) return; // at most once a day
        try { GM_setValue(SITE_WARN_KEY, Date.now()); } catch (e) {}
        showToast('rule34\'s page looks different than usual – some Steamy34 parts may not work right now. If it stays like this, please tell steamycorner.',
                  'Copy info', openDebugInfo, 15000);
    }

    // ---- Rating nudge: once ever, after a week of use ----
    const FIRST_SEEN_KEY = 'steamy34_first_seen';
    const RATE_ASKED_KEY = 'steamy34_rate_asked';
    function maybeAskForRating() {
        let first = 0, asked = false;
        try {
            first = GM_getValue(FIRST_SEEN_KEY, 0) || 0;
            if (!first) { GM_setValue(FIRST_SEEN_KEY, Date.now()); return; }
            asked = GM_getValue(RATE_ASKED_KEY, false) === true;
        } catch (e) { return; }
        if (asked || Date.now() - first < 7 * 24 * 3600 * 1000 || isPostView) return;
        setTimeout(() => {
            if (document.querySelector('.s34-overlay')) return; // try again another time
            try { GM_setValue(RATE_ASKED_KEY, true); } catch (e) {}
            showToast('Enjoying Steamy34? A rating on Sleazy Fork helps others find it – thank you! 💜', 'Rate it',
                      () => window.open(SLEAZY_URL + '/feedback', '_blank', 'noopener'), 15000);
        }, 8000);
    }
    // =====================================================================
    //  12. EXTRAS: favourites, hover info,
    //      sidebar switches (hide viewed/downloaded, size slider), batch
    //      download, video options, backup, popup preload & zoom
    // =====================================================================

    const pause = ms => new Promise(r => setTimeout(r, ms));

    function allThumbs() {
        return Array.from(document.querySelectorAll('.image-list span.thumb'));
    }

    // ---- Favourites (the site's own favourites list; needs a login) ----
    const FAVS_KEY = 'steamy34_favs';
    const HEART_SVG = '<svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M12 20.5s-7.5-4.6-9.4-9.3C1.2 7.6 3.6 4 7.1 4c2.1 0 3.6 1.1 4.9 2.8C13.3 5.1 14.8 4 16.9 4c3.5 0 5.9 3.6 4.5 7.2-1.9 4.7-9.4 9.3-9.4 9.3z"/></svg>';

    function getFavs() {
        try {
            const v = GM_getValue(FAVS_KEY, {});
            return v && typeof v === 'object' ? v : {};
        } catch (e) { return {}; }
    }

    function isFav(id) {
        return !!(id && getFavs()[id]);
    }

    function rememberFav(id) {
        const f = getFavs();
        f[id] = Date.now();
        GM_setValue(FAVS_KEY, f);
    }

    async function addFavourite(id) {
        if (!id) return false;
        try {
            let r;
            try { r = await loadPage('public/addfav.php?id=' + encodeURIComponent(id), 'action'); }
            catch (e) { if (e.cloudflare) { showToast('Favourite not saved – solve the quick check first.', 'Solve check', openCloudflarePanel, 10000); return false; } throw e; }
            const text = r.html.trim();
            if (!r.ok) throw new Error('HTTP ' + r.status);
            if (text === '2') {
                showToast('Log in to rule34.xxx to use favourites.');
                return false;
            }
            rememberFav(id);
            showToast(text === '1' ? 'Already in your favourites ♥' : 'Added to your favourites ♥');
            return true;
        } catch (e) {
            showToast('Could not add to favourites (' + (e.message || e) + ').');
            return false;
        }
    }

    // Loading circle on a button while the site answers (♥ favourite, ▲ vote)
    function setBusy(btn, busy) {
        if (!btn) return;
        btn.classList.toggle('s34-busy', busy);
        btn.disabled = busy;
        let spin = btn.querySelector('.s34-spin');
        if (busy && !spin) {
            spin = document.createElement('span');
            spin.className = 's34-spin';
            btn.appendChild(spin);
        } else if (!busy && spin) {
            spin.remove();
        }
    }

    function styleFavButton(btn, faved, withText) {
        if (!btn) return;
        btn.classList.toggle('s34-faved', faved);
        btn.innerHTML = HEART_SVG + (withText ? `<span>${faved ? 'In favourites' : 'Favourite'}</span>` : '');
        btn.title = faved ? 'In your favourites' : 'Add to your favourites';
    }

    function addFavButtons(thumbs) {
        if (!CONFIG.favButtons) return;
        const favs = getFavs();
        (thumbs || allThumbs()).forEach(thumb => {
            if (thumb.querySelector('.s34-fav-btn')) return;
            const id = thumbPostId(thumb);
            if (!id) return;
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 's34-fav-btn';
            styleFavButton(btn, !!favs[id], false);
            btn.addEventListener('click', async e => {
                e.preventDefault();
                e.stopPropagation();
                if (btn.classList.contains('s34-faved')) {
                    showToast('Already in your favourites ♥');
                    return;
                }
                if (btn.classList.contains('s34-busy')) return;
                setBusy(btn, true);
                const ok = await addFavourite(id);
                setBusy(btn, false);
                if (ok) styleFavButton(btn, true, false);
            });
            thumb.appendChild(btn);
        });
    }

    // ---- Score & resolution while hovering a thumbnail ----
    function renderHoverInfo(pill, score, size) {
        pill.textContent = [score !== '' && score != null ? '★ ' + score : '', size].filter(Boolean).join('  ·  ') || '…';
    }

    function showHoverInfo(thumb) {
        let pill = thumb.querySelector('.s34-info');
        if (!pill) {
            pill = document.createElement('span');
            pill.className = 's34-info';
            thumb.appendChild(pill);
        }
        const img = thumb.querySelector('img');
        const m = img && thumbTags(img).match(/ score:(-?\d+) /);
        const score = thumb.dataset.s34Score || (m ? m[1] : '');
        renderHoverInfo(pill, score, thumb.dataset.s34Size || '');
        if (thumb.dataset.s34Size) return;

        // Resolution is only on the post page: load it if you keep hovering
        // (a full second since Beta 3.5, and in line behind what you asked
        // for - sweeping the mouse over the list loads nothing)
        setTimeout(() => {
            if (!thumb.matches(':hover') || thumb.dataset.s34Size) return;
            const a = thumb.querySelector('a[href]');
            if (!a) return;
            pill.classList.add('s34-info-loading');
            fetchPostDoc(a.href, 'hover', { wanted: () => thumb.matches(':hover') }).then(doc => {
                pill.classList.remove('s34-info-loading');
                if (!doc) return;
                const text = (doc.querySelector('#stats') || doc.body || doc.documentElement).textContent;
                const s = text.match(/Size:\s*(\d+)\s*[x×]\s*(\d+)/i);
                const sc = text.match(/Score:\s*(-?\d+)/i);
                if (s) thumb.dataset.s34Size = s[1] + '×' + s[2];
                if (sc) thumb.dataset.s34Score = sc[1];
                renderHoverInfo(pill, thumb.dataset.s34Score || score, thumb.dataset.s34Size || '');
            });
        }, 1000);
    }

    function setupHoverInfo(thumbs) {
        if (!CONFIG.hoverInfo || NO_HOVER) return;
        (thumbs || allThumbs()).forEach(thumb => {
            if (thumb.dataset.s34Info) return;
            thumb.dataset.s34Info = '1';
            let timer = null;
            thumb.addEventListener('mouseenter', () => {
                clearTimeout(timer);
                timer = setTimeout(() => showHoverInfo(thumb), 300);
            });
            thumb.addEventListener('mouseleave', () => clearTimeout(timer));
        });
    }

    // ---- Helpers for searches (Recent, Continue, Following visits) ----
    function normalizeQuery(q) {
        return String(q || '').toLowerCase().split(/\s+/).filter(Boolean).sort().join(' ');
    }

    function pageMaxPostId(root = document) {
        let max = 0;
        root.querySelectorAll('span.thumb').forEach(t => {
            const n = parseInt(thumbPostId(t), 10);
            if (n > max) max = n;
        });
        return max;
    }

    function onFirstResultsPage() {
        return !isPostView && !(parseInt(params.get('pid') || '0', 10) > 0);
    }




    // ---- Sidebar switches: hide viewed / downloaded, thumbnail size ----
    function applyHideClasses() {
        document.documentElement.classList.toggle('s34-hide-viewed', !!CONFIG.hideViewed);
        document.documentElement.classList.toggle('s34-hide-downloaded', !!CONFIG.hideDownloaded);
        window.dispatchEvent(new CustomEvent('s34-layout-changed')); // infinite scroll may need more
    }
    applyHideClasses();

    function setupQuickPanel() {
        if (isPostView || !document.querySelector('.image-list')) return;
        if (document.querySelector('.s34-quick')) return;

        const panel = document.createElement('div');
        panel.className = 's34-quick';
        const justified = CONFIG.thumbLayout === 'justified';
        const sizeKey = thumbSizeKeys()[justified ? 0 : 1]; // (phones: their own size)
        const sizeVar = justified ? '--s34-row' : '--s34-tile';
        // (The White / Dark / OLED picker lived here until Beta 3.3 - it's in
        // Settings → Look and the welcome tour now: you set it once.)
        panel.innerHTML = `
            <div class="s34-q-head">View</div>
            <label class="s34-q-switch"><input type="checkbox" data-k="hideViewed"><span class="s34-q-track"></span>Hide viewed</label>
            <label class="s34-q-switch"><input type="checkbox" data-k="hideDownloaded"><span class="s34-q-track"></span>Hide downloaded</label>
            <label class="s34-q-size" title="Thumbnail size">
                <span>Size</span>
                <input type="range" min="100" max="500" step="10">
            </label>
            <button type="button" class="s34-q-select" title="Pick posts, then download them all at once">⬇ Batch download</button>`;

        panel.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            const k = cb.dataset.k;
            cb.checked = !!CONFIG[k];
            cb.addEventListener('change', () => {
                saveSettingsNow({ [k]: cb.checked });
                applyHideClasses();
            });
        });
        if (!CONFIG.trackViewed) panel.querySelector('[data-k="hideViewed"]').closest('label').remove();
        if (!CONFIG.trackDownloads) panel.querySelector('[data-k="hideDownloaded"]').closest('label').remove();

        const range = panel.querySelector('input[type="range"]');
        range.value = CONFIG[sizeKey];
        let saveTimer = null;
        range.addEventListener('input', () => {
            document.documentElement.style.setProperty(sizeVar, range.value + 'px');
            clearTimeout(saveTimer);
            saveTimer = setTimeout(() => saveSettingsNow({ [sizeKey]: parseInt(range.value, 10) }), 400);
        });

        panel.querySelector('.s34-q-select').addEventListener('click', () => setSelectMode(!selectMode));

        // Under the search, above the settings button
        const gear = document.querySelector('.s34-gear.s34-inline');
        const form = (document.querySelector('textarea.s34-search') || {}).form;
        if (gear) gear.before(panel);
        else if (form) form.after(panel);
        else {
            const sidebar = document.querySelector('.sidebar, #sidebar');
            if (sidebar) sidebar.appendChild(panel); else return;
        }
        adoptAiFilter(panel);
        addSfwSwitch(panel); // "Blur pictures" (screenshot mode, 20d)
    }

    // The site's own "Filter AI posts" switch, shown as a Steamy34 switch at
    // the top of the sidebar panel. The original stays in the page (hidden)
    // and is clicked for you, so the site handles it exactly as before.
    function findAiFilterBox() {
        const sidebar = document.querySelector('.sidebar, #sidebar') || document.body;
        const walker = document.createTreeWalker(sidebar, NodeFilter.SHOW_TEXT, {
            acceptNode: n => /filter\s+ai/i.test(n.textContent) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
        });
        const textNode = walker.nextNode();
        if (!textNode) return null;
        // Climb a few levels until the box holds the checkbox too
        let box = textNode.parentElement;
        for (let i = 0; i < 4 && box && !box.querySelector('input[type="checkbox"]'); i++) box = box.parentElement;
        const input = box && box.querySelector('input[type="checkbox"]');
        if (!input || box.contains(panelOrNull()) || box.querySelector('.s34-sb, #tag-sidebar, .image-list')) return null;
        return { box, input };
    }
    const panelOrNull = () => document.querySelector('.s34-quick');

    function adoptAiFilter(panel) {
        const found = findAiFilterBox();
        if (!found) return;
        const { box, input } = found;
        const row = document.createElement('label');
        row.className = 's34-q-switch s34-q-ai';
        row.title = 'The site\'s own AI filter: hides posts tagged as AI-generated';
        row.innerHTML = '<input type="checkbox"><span class="s34-q-track"></span>Filter AI posts';
        const mine = row.querySelector('input');
        const sync = () => { mine.checked = input.checked; };
        sync();
        mine.addEventListener('change', () => {
            if (input.checked !== mine.checked) input.click(); // the site does the rest
            setTimeout(sync, 50);
        });
        input.addEventListener('change', sync);
        // Hide the list around it too when the switch is all it holds
        // (the site's <ul id="displayOptions"><li> would leave an empty bullet)
        let hide = box;
        while (hide.parentElement && hide.parentElement.children.length === 1 && /^(LI|UL|OL)$/.test(hide.parentElement.tagName)) hide = hide.parentElement;
        hide.classList.add('s34-ai-original');
        const head = panel.querySelector('.s34-q-head');
        if (head) head.after(row); else panel.prepend(row);
    }

    // =====================================================================
    //  CONTINUE WHERE YOU LEFT OFF
    //  While you scroll a search, Steamy34 notes which page you're on (and
    //  the post at the top of the screen). Come back to the same search -
    //  reload, click it again, open it tomorrow - and a small message offers
    //  "Continue" at that page. Kept on this device for 24 hours, per search
    //  (the newest 30). Setting: resumeOffer.
    // =====================================================================
    const RESUME_KEY = 'steamy34_resume';
    const RESUME_MAX_AGE = 24 * 3600 * 1000;
    const RESUME_TARGET_KEY = 's34_resume_post'; // sessionStorage: post to scroll to after the jump

    function resumeKey() {
        if (isPostView || params.get('page') !== 'post' || params.get('s') !== 'list') return null;
        return normalizeQuery(tagsFromUrl(location.href) || '') || '(all posts)';
    }
    function readResume() {
        let v = {};
        try { v = GM_getValue(RESUME_KEY, {}) || {}; } catch (e) {}
        return v && typeof v === 'object' ? v : {};
    }

    // Where am I? The page block in the upper third of the window, and its
    // first post that's still on screen
    function currentSpot() {
        const blocks = Array.from(document.querySelectorAll('.image-list[data-s34-pid]'));
        if (!blocks.length) {
            const list = document.querySelector('.image-list');
            if (!list) return null;
            blocks.push(list);
        }
        let block = blocks[0];
        for (const b of blocks) { if (b.getBoundingClientRect().top < innerHeight / 3) block = b; }
        const pid = parseInt(block.dataset.s34Pid || String(pidOf(location.href)), 10) || 0;
        const onScreen = Array.from(block.querySelectorAll('span.thumb')).find(t => t.getBoundingClientRect().bottom > 60);
        return { pid, post: onScreen ? thumbPostId(onScreen) : '' };
    }

    function saveSpot() {
        const key = resumeKey();
        const spot = key && currentSpot();
        if (!spot) return;
        const all = readResume();
        if (!spot.pid && scrollY < 600) { if (all[key]) { delete all[key]; GM_setValue(RESUME_KEY, all); } return; } // back at the top
        all[key] = { pid: spot.pid, post: spot.post, at: Date.now() };
        // keep the newest 30, drop old ones
        const keys = Object.keys(all).filter(k => Date.now() - (all[k].at || 0) < RESUME_MAX_AGE)
            .sort((a, b) => all[b].at - all[a].at).slice(0, 30);
        const keep = {};
        keys.forEach(k => { keep[k] = all[k]; });
        GM_setValue(RESUME_KEY, keep);
    }

    function setupResume() {
        const key = resumeKey();
        if (!key) return;
        // Just jumped here with "Continue"? Scroll to the post you were at
        let target = null;
        try { target = sessionStorage.getItem(RESUME_TARGET_KEY); sessionStorage.removeItem(RESUME_TARGET_KEY); } catch (e) {}
        if (target) {
            const t = document.getElementById('s' + target) || document.getElementById('p' + target);
            if (t) setTimeout(() => t.scrollIntoView({ block: 'center' }), 300);
        }
        // Note the spot while scrolling (calmly - at most every 1.5 s). Only
        // real scrolling counts: just opening or leaving a page saves nothing.
        // (Steamy34's own jump to your post doesn't count - only your wheel,
        // finger, keys or scrollbar)
        let timer = null, scrolled = false, userActive = false;
        ['wheel', 'touchmove', 'keydown', 'mousedown'].forEach(ev => window.addEventListener(ev, () => { userActive = true; }, { passive: true, capture: true }));
        window.addEventListener('scroll', () => {
            if (!userActive) return;
            scrolled = true;
            if (timer) return;
            timer = setTimeout(() => { timer = null; saveSpot(); }, 1500);
        }, { passive: true });
        window.addEventListener('pagehide', () => { if (scrolled) saveSpot(); });

        // Offer to continue: only on the first page of a search, when you
        // were at page 2 or further within the last 24 hours
        if (!CONFIG.resumeOffer || target || pidOf(location.href) > 0) return;
        const all = readResume();
        const was = all[key];
        if (!was || !was.pid || was.offered || Date.now() - (was.at || 0) > RESUME_MAX_AGE) return;
        // Offered once - reloads and later visits start fresh, until you scroll
        // deep again (that saves a new spot without the "offered" mark)
        was.offered = true;
        try { GM_setValue(RESUME_KEY, all); } catch (e) {}
        const page = Math.floor(was.pid / pageStep) + 1;
        setTimeout(() => {
            if (scrollY > 400) return; // already scrolling on - no need
            showToast(`You were at page ${page} of this search.`, `Continue at page ${page}`, () => {
                try { sessionStorage.setItem(RESUME_TARGET_KEY, was.post || ''); } catch (e) {}
                const u = new URL(location.href);
                u.searchParams.set('pid', String(was.pid));
                location.href = u.pathname + u.search + u.hash;
            }, 12000);
        }, 1200);
    }
    // ---- Batch download: select posts, then download them one by one ----
    let selectMode = false;
    let batchRunning = false;
    let batchStop = false;
    let batchStatus = '';
    const selected = new Set();

    function setSelectMode(on) {
        selectMode = on;
        document.documentElement.classList.toggle('s34-selecting', on);
        const btn = document.querySelector('.s34-q-select');
        if (btn) {
            btn.textContent = on ? '✕ Stop selecting' : '⬇ Batch download';
            btn.classList.toggle('s34-on', on);
        }
        if (!on && !batchRunning) {
            selected.forEach(t => t.classList.remove('s34-selected'));
            selected.clear();
        }
        renderBatchBar();
    }

    function toggleSelected(thumb, force) {
        const on = force !== undefined ? force : !selected.has(thumb);
        if (on) selected.add(thumb); else selected.delete(thumb);
        thumb.classList.toggle('s34-selected', on);
        renderBatchBar();
    }

    // In select mode a click on a thumbnail selects it instead of opening it
    // (registered before the popup viewer's click handler)
    document.addEventListener('click', e => {
        if (!selectMode) return;
        const thumb = e.target.closest('.image-list span.thumb');
        if (!thumb) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        if (!batchRunning) toggleSelected(thumb);
    }, true);

    function renderBatchBar() {
        let bar = document.querySelector('.s34-batch');
        if (!selectMode && !batchRunning) {
            if (bar) bar.remove();
            return;
        }
        if (!bar) {
            bar = document.createElement('div');
            bar.className = 's34-batch';
            bar.addEventListener('click', e => {
                const act = e.target.closest('[data-act]');
                if (!act) return;
                const a = act.dataset.act;
                if (a === 'all') {
                    allThumbs().filter(t => t.offsetParent !== null && !t.classList.contains('s34-was-downloaded'))
                        .forEach(t => toggleSelected(t, true));
                } else if (a === 'none') {
                    Array.from(selected).forEach(t => toggleSelected(t, false));
                } else if (a === 'go') {
                    const list = allThumbs().filter(t => selected.has(t)); // page order
                    if (list.length) batchDownload(list);
                } else if (a === 'collect') {
                    const posts = allThumbs().filter(t => selected.has(t)).map(t => {
                        const img = t.querySelector('img');
                        return { id: thumbPostId(t), thumb: img ? img.getAttribute('src') : '' };
                    });
                    if (posts.length) openCollectMenu(act, posts);
                } else if (a === 'stop') {
                    batchStop = true;
                } else if (a === 'done') {
                    setSelectMode(false);
                }
            });
            document.body.appendChild(bar);
        }
        const n = selected.size;
        bar.innerHTML = batchRunning
            ? `<span class="s34-batch-status"></span>
               <button type="button" data-act="stop">Stop</button>`
            : `<span class="s34-batch-status"><b>${n}</b> selected</span>
               <button type="button" data-act="all" title="Select every loaded post you haven't downloaded yet">Select all new</button>
               <button type="button" data-act="none">Clear</button>
               <button type="button" data-act="collect" ${n ? '' : 'disabled'} title="Save the selected posts in a collection" class="s34-batch-icon">${FOLDER_SVG} Add to collection</button>
               <button type="button" data-act="go" class="s34-batch-go" ${n ? '' : 'disabled'}>⬇ Download ${n || ''}</button>
               <button type="button" data-act="done" title="Leave select mode">✕</button>`;
        if (batchRunning) bar.querySelector('.s34-batch-status').textContent = batchStatus;
    }

    async function downloadThumb(thumb) {
        const a = thumb.querySelector('a[href]');
        if (!a) return false;
        const doc = await fetchPostDoc(a.href, 'batch');
        if (!doc) return false;
        const media = await getPostMedia(a.href, 'batch');
        const url = media && (media.video || media.image);
        if (!url) return false;
        const g = readPostTags(doc);
        const names = k => (g[k] || []).map(x => x.tag);
        const tags = {
            copyright: names('copyright'),
            character: names('character'),
            artist: names('artist')
        };
        const filename = buildFilename(url, tags, readPostSize(doc), postIdFrom(a.href));
        const ok = await saveUrlAs(url, filename, a.href);
        const img = thumb.querySelector('img');
        if (ok) rememberDownload(thumbPostId(thumb), { thumb: img ? img.getAttribute('src') : '', tags });
        return ok;
    }

    // ---- Download panel: one floating card for batch & collection downloads ----
    // "12 / 40", a progress bar, Pause / Resume and Cancel. Pause waits for the
    // file that's loading right now, then holds. onCancel: also stop the caller.
    function openDownloadPanel(total, title, onCancel) {
        const old = document.querySelector('.s34-dlp');
        if (old) old.remove();
        const el = document.createElement('div');
        el.className = 's34-dlp';
        el.setAttribute('role', 'status');
        el.innerHTML = `
            <div class="s34-dlp-head"><b></b><span class="s34-dlp-count"></span></div>
            <div class="s34-dlp-bar"><i></i></div>
            <div class="s34-dlp-text"></div>
            <div class="s34-dlp-btns">
                <button type="button" data-a="pause">Pause</button>
                <button type="button" data-a="cancel">Cancel</button>
            </div>`;
        el.querySelector('b').textContent = title;
        const st = { paused: false, stopped: false, done: 0, ok: 0, failed: 0 };
        const pauseBtn = el.querySelector('[data-a="pause"]');
        const draw = text => {
            el.querySelector('.s34-dlp-count').textContent = st.done + ' / ' + total;
            el.querySelector('.s34-dlp-bar i').style.width = (total ? Math.round(st.done / total * 100) : 0) + '%';
            if (text != null) el.querySelector('.s34-dlp-text').textContent = text;
            el.classList.toggle('s34-dlp-paused', st.paused);
            pauseBtn.textContent = st.paused ? 'Resume' : 'Pause';
        };
        el.addEventListener('click', e => {
            const a = e.target.closest('[data-a]');
            if (!a) return;
            if (a.dataset.a === 'pause') { st.paused = !st.paused; draw(st.paused ? 'Paused – the current file still finishes.' : 'Going on…'); }
            else if (a.dataset.a === 'cancel') { st.stopped = true; st.paused = false; draw('Cancelling…'); if (onCancel) onCancel(); }
            else if (a.dataset.a === 'close') el.remove();
        });
        document.body.appendChild(el);
        draw('Starting…');
        return {
            get stopped() { return st.stopped; },
            stop() { st.stopped = true; },
            status(text) { draw(text); },
            item(ok) { st.done++; if (ok) st.ok++; else st.failed++; draw(); },
            async waitWhilePaused() { while (st.paused && !st.stopped) await pause(400); },
            finish(stopped) {
                st.paused = false;
                const sum = st.ok + ' saved' + (st.failed ? ', ' + st.failed + ' failed' : '') + (stopped ? ' – stopped.' : '.');
                draw(sum);
                el.querySelector('b').textContent = stopped ? 'Download stopped' : 'Download finished';
                el.querySelector('.s34-dlp-btns').innerHTML = '<button type="button" data-a="close">Close</button>';
                setTimeout(() => { if (el.isConnected) el.remove(); }, 12000);
                return sum;
            }
        };
    }

    async function batchDownload(list) {
        batchRunning = true;
        batchStop = false;
        let ok = 0, failed = 0;
        const panel = openDownloadPanel(list.length, 'Downloading ' + list.length + ' posts', () => { batchStop = true; renderBatchBar(); });
        for (let i = 0; i < list.length && !batchStop; i++) {
            const thumb = list[i];
            await panel.waitWhilePaused();
            if (batchStop) break;
            batchStatus = `Downloading ${i + 1} / ${list.length}…`;
            panel.status(`Post ${i + 1} of ${list.length}…`);
            renderBatchBar();
            // Cloudflare check open? Wait until it's solved.
            while (cloudflarePaused() && !batchStop) {
                batchStatus = 'Paused – solve the Cloudflare check to continue';
                panel.status(batchStatus);
                renderBatchBar();
                await pause(2000);
            }
            if (batchStop) break;
            let done = await downloadThumb(thumb);
            if (!done && cloudflarePaused()) {   // check came up mid-way: retry once after
                while (cloudflarePaused() && !batchStop) await pause(2000);
                if (!batchStop) done = await downloadThumb(thumb);
            }
            if (done) {
                ok++;
                selected.delete(thumb);
                thumb.classList.remove('s34-selected');
            } else {
                failed++;
            }
            panel.item(done);
            if (i < list.length - 1 && !batchStop) await pause(CONFIG.batchDelay);
        }
        batchRunning = false;
        renderBatchBar();
        panel.finish(batchStop);
        if (failed) showToast(`${failed} download${failed === 1 ? '' : 's'} failed – those posts are still ticked, so you can try again.`, null, null, 10000);
    }

    // ---- Video options: remembered volume, loop, speed ----
    const VIDEO_KEY = 'steamy34_video';

    function getVideoPrefs() {
        let v = {};
        try { v = GM_getValue(VIDEO_KEY, {}) || {}; } catch (e) {}
        return Object.assign({ volume: 1, muted: false, loop: true, rate: 1 }, v);
    }

    function setVideoPrefs(changes) {
        GM_setValue(VIDEO_KEY, Object.assign(getVideoPrefs(), changes));
    }

    // Muting done by the script (sound blocked) must not be remembered
    function autoMute(video) {
        video.dataset.s34AutoMuted = '1';
        video.muted = true;
        setTimeout(() => { delete video.dataset.s34AutoMuted; }, 300);
    }

    function applyVideoPrefs(video) {
        const p = getVideoPrefs();
        video.volume = Math.min(Math.max(p.volume, 0), 1);
        video.muted = !!p.muted;
        video.loop = !!p.loop;
        video.defaultPlaybackRate = p.rate;
        video.playbackRate = p.rate;
        if (video.dataset.s34Prefs) return;
        video.dataset.s34Prefs = '1';
        video.addEventListener('volumechange', () => {
            if (video.dataset.s34AutoMuted) return;
            setVideoPrefs({ volume: video.volume, muted: video.muted });
        });
        // Some players reset the speed when a new source loads
        video.addEventListener('loadedmetadata', () => {
            video.playbackRate = getVideoPrefs().rate;
        });
    }

    function makeVideoOptions(getVideo) {
        const box = document.createElement('div');
        box.className = 's34-vopts';
        box.innerHTML = `
            <button type="button" class="s34-vopt-loop"></button>
            <label class="s34-vopt-speed">Speed
                <select>${[0.25, 0.5, 0.75, 1, 1.25, 1.5, 2].map(r => `<option value="${r}">${r}×</option>`).join('')}</select>
            </label>`;
        const loopBtn = box.querySelector('.s34-vopt-loop');
        const sel = box.querySelector('select');
        const showLoop = () => {
            const on = getVideoPrefs().loop;
            loopBtn.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 2l3 3-3 3"/><path d="M4 11V9a4 4 0 0 1 4-4h12"/><path d="M7 22l-3-3 3-3"/><path d="M20 13v2a4 4 0 0 1-4 4H4"/></svg>' +
                (on ? ' Loop: on' : ' Loop: off');
            loopBtn.classList.toggle('s34-on', on);
        };
        loopBtn.addEventListener('click', () => {
            const on = !getVideoPrefs().loop;
            setVideoPrefs({ loop: on });
            const v = getVideo();
            if (v) v.loop = on;
            showLoop();
        });
        sel.value = String(getVideoPrefs().rate);
        sel.addEventListener('change', () => {
            const r = parseFloat(sel.value);
            setVideoPrefs({ rate: r });
            const v = getVideo();
            if (v) { v.defaultPlaybackRate = r; v.playbackRate = r; }
            sel.blur();
        });
        showLoop();
        return box;
    }

    function setupPostVideoOptions() {
        const video = document.querySelector('#gelcomVideoPlayer, #content video');
        if (!video || video.tagName !== 'VIDEO') return;
        applyVideoPrefs(video);
        const slot = getPostSidebarSlot();
        if (slot) slot.appendChild(makeVideoOptions(() => video));
    }

    // ---- Backup: everything Steamy34 remembers, in one file ----
    function exportBackup() {
        const data = {
            app: 'Steamy34',
            exported: new Date().toISOString(),
            settings: GM_getValue(SETTINGS_KEY, {}),
            history: getStoredList(HISTORY_KEY),
            favTags: getStoredList(FAVTAGS_KEY),
            pinnedFilters: getPins(),
            collections: getCollections(),
            downloadHistory: getDlHistory(),
            downloaded: loadDownloaded(),
            viewed: loadViewed(),
            favs: getFavs(),
            votes: GM_getValue(VOTES_KEY, {}) || {},
            video: getVideoPrefs(),
            autoNext: GM_getValue(AUTO_KEY, {}) || {},
            theater: GM_getValue(THEATER_KEY, false) === true,
            blacklist: readBlocklist(),
            blacklistDates: getBlTimes(),
            tagTypes: Object.fromEntries(tagTypes),
            following: getFollowing()
        };
        const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
        saveBlob(blob, 'Steamy34_backup_' + new Date().toISOString().slice(0, 10) + '.json');
        showToast('Backup saved to your downloads.');
    }

    // Reload the page and show a message once it's back (instead of a
    // blocking alert box right before the reload)
    const FLASH_KEY = 's34_flash';
    function reloadWithMessage(text) {
        try { sessionStorage.setItem(FLASH_KEY, text); } catch (e) {}
        location.reload();
    }
    function showFlashMessage() {
        let text = null;
        try { text = sessionStorage.getItem(FLASH_KEY); sessionStorage.removeItem(FLASH_KEY); } catch (e) {}
        if (text) showToast(text, null, null, 8000);
    }

    function importBackup() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json,application/json';
        input.addEventListener('change', async () => {
            const file = input.files && input.files[0];
            if (!file) return;
            let d;
            try { d = JSON.parse(await file.text()); } catch (e) { d = null; }
            if (!d || d.app !== 'Steamy34') {
                showToast('That file isn\'t a Steamy34 backup – pick the "Steamy34_backup_….json" file.', null, null, 9000);
                return;
            }
            if (!confirm('Import this backup?\n\nSettings are replaced. Recent searches, everything you follow, ' +
                         'downloaded / viewed posts, favourites and the blacklist are added to what you have now.')) return;

            const obj = x => (x && typeof x === 'object' && !Array.isArray(x)) ? x : {};
            const arr = x => Array.isArray(x) ? x : [];

            if (d.settings) GM_setValue(SETTINGS_KEY, obj(d.settings));

            const hist = getStoredList(HISTORY_KEY);
            arr(d.history).forEach(q => { if (typeof q === 'string' && !hist.includes(q)) hist.push(q); });
            GM_setValue(HISTORY_KEY, hist.slice(0, HISTORY_MAX));

            const favTags = getStoredList(FAVTAGS_KEY);
            const favLower = new Set(favTags.map(t => String(t).toLowerCase()));
            arr(d.favTags).forEach(t => {
                if (typeof t === 'string' && t && !favLower.has(t.toLowerCase())) { favTags.push(t); favLower.add(t.toLowerCase()); }
            });
            GM_setValue(FAVTAGS_KEY, favTags);
            if (d.pinnedFilters) setPins(obj(d.pinnedFilters));

            // Collections: add the ones you don't have; same name -> posts merged
            const colls = getCollections();
            arr(d.collections).forEach(c => {
                if (!c || !c.name || !Array.isArray(c.posts)) return;
                const same = colls.find(x => x.name === c.name);
                if (same) c.posts.forEach(p => { if (p && p.id && !same.posts.some(q => q.id === p.id)) same.posts.push(p); });
                else colls.push({ id: c.id || 'c' + Date.now().toString(36) + colls.length, name: c.name, created: c.created || Date.now(), posts: c.posts.filter(p => p && p.id) });
            });
            GM_setValue(COLL_KEY, colls);

            const dlHist = getDlHistory();
            const have = new Set(dlHist.map(h => h.id));
            arr(d.downloadHistory).forEach(h => { if (h && h.id && !have.has(h.id)) dlHist.push(h); });
            dlHist.sort((a, b) => (b.time || 0) - (a.time || 0));
            GM_setValue(DLHIST_KEY, dlHist.slice(0, DLHIST_LIMIT));

            GM_setValue(DOWNLOADED_KEY, Object.assign({}, obj(d.downloaded), loadDownloaded()));
            GM_setValue(VIEWED_KEY, Object.assign({}, obj(d.viewed), loadViewed()));
            GM_setValue(FAVS_KEY, Object.assign({}, obj(d.favs), getFavs()));
            GM_setValue(VOTES_KEY, Object.assign({}, obj(d.votes), GM_getValue(VOTES_KEY, {}) || {}));
            if (d.video) GM_setValue(VIDEO_KEY, obj(d.video));
            if (d.autoNext) GM_setValue(AUTO_KEY, obj(d.autoNext));
            if (typeof d.theater === 'boolean') GM_setValue(THEATER_KEY, d.theater);
            try {
                GM_setValue(TAGTYPE_KEY, Object.assign({}, obj(d.tagTypes), GM_getValue(TAGTYPE_KEY, {}) || {}));
            } catch (e) {}

            const bl = readBlocklist();
            const lower = new Set(bl.map(t => t.toLowerCase()));
            arr(d.blacklist).forEach(t => {
                if (typeof t === 'string' && t && !lower.has(t.toLowerCase())) { bl.push(t); lower.add(t.toLowerCase()); }
            });
            writeBlocklist(bl);
            // Restore the real "blacklisted on" dates (writeBlocklist just stamped them "now")
            GM_setValue(BL_TIMES_KEY, Object.assign(getBlTimes(), obj(d.blacklistDates)));

            // Following: add the artists you don't follow yet. Searches from older
            // backups (followed searches, "saved" searches) go into Recent - since
            // Beta 3.6 only artists are followed
            const inArtists = d.following && (Array.isArray(d.following.artists) ? d.following.artists
                : Array.isArray(d.following.tags) ? d.following.tags.filter(t => t && (!t.type || t.type === 'artist')) : null);
            if (inArtists) {
                const fol = getFollowing();
                inArtists.forEach(t => {
                    if (t && typeof t.tag === 'string' && t.tag && !isFollowed(t.tag, fol)) {
                        fol.artists.push({ tag: t.tag.toLowerCase(), added: t.added || Date.now(), seen: 0, latest: 0, count: 0, more: false });
                    }
                });
                saveFollowing(fol);
            }
            arr(d.following && d.following.searches).concat(arr(d.saved))
                .map(s => s && typeof s.query === 'string' ? s.query : '').filter(Boolean).reverse().forEach(addToHistory);
            reloadWithMessage('Backup imported – your settings, searches, collections and marks are back.');
        });
        input.click();
    }

    // ---- Settings: "Privacy & your data" - what is stored, and removing it ----
    // [key, label, what it is, empty value]
    const STORED_DATA = [
        ['steamy34_settings', 'Settings', 'Your choices in this menu and the sidebar switches', {}],
        ['steamy34_following', 'Following', 'Artists you follow, and the newest post you\'ve seen from each', {}],
        ['steamy34_history', 'Recent searches', 'Your last searches', []],
        ['steamy34_resume', 'Where you left off', 'The page you were on per search, for "Continue at page N" (kept 24 hours)', {}],
        ['steamy34_favtags', 'Favourite tags', 'Tags in the ★ Favourite tags area', []],
        ['steamy34_pinned', 'Pinned filters', 'Search filters kept for every new search', {}],
        ['steamy34_downloaded', 'Downloaded posts', 'Post numbers you downloaded (for the ⬇ mark)', {}],
        ['steamy34_dlhistory', 'Download tags', 'Artist / character / series of each download (for Stats)', []],
        ['steamy34_collections', 'Collections', 'Your own folders of saved posts', []],
        ['steamy34_viewed', 'Viewed posts', 'Post numbers you opened (for the eye mark)', {}],
        ['steamy34_favs', 'Favourite marks', 'Posts you added to favourites (the ♥ stays filled)', {}],
        ['steamy34_votes', 'Votes', 'Posts you voted for (the ▲ stays green)', {}],
        ['steamy34_bltimes', 'Blacklist dates', 'When you blacklisted each tag', {}],
        ['steamy34_video', 'Video options', 'Volume, mute, loop and speed', {}],
        ['steamy34_auto', 'Auto next timer', 'Seconds per post for "Auto next"', {}],
        ['steamy34_theater', 'Theater mode', 'Whether the popup opens without its sidebar', false],
        ['steamy34_tagtypes', 'Tag types', 'Which tags are artists / characters / … (makes tag bars faster)', {}],
        ['steamy34_mediahosts', 'Media servers', 'Which file servers worked (faster previews)', {}],
        ['steamy34_cf_last', 'Last Cloudflare check', 'When the last check came and what Steamy34 was loading just before (for bug reports)', {}],
        ['steamy34_lastsearch', 'Last search', 'The search you came from (for the + buttons)', ''],
        ['steamy34_dlfolder', 'Download folder', 'The name of the folder you picked for downloads (the browser keeps the access to it)', ''],
        ['steamy34_sbmenu_open', 'Small preferences', 'Whether lists are folded, sort order, which tips / news / guides you\'ve seen, whether an ad blocker was found', null],
        ['steamy34_blsort', null, null, null]
    ];
    // Everything that's shown together as "Small preferences"
    const SMALL_PREF_KEYS = ['steamy34_sbmenu_open', 'steamy34_sb_panel', 'steamy34_fw_big', 'steamy34_sfw', 'steamy34_first_seen', 'steamy34_rate_asked', 'steamy34_sitecheck_warned', 'steamy34_blsort', 'steamy34_adblock_seen',
        'steamy34_tips_seen', 'steamy34_changelog_seen', 'steamy34_mobile_seen', 'steamy34_marks_rev', 'steamy34_welcome_seen', 'steamy34_hints_seen'];

    function storedCount(v) {
        if (Array.isArray(v)) return v.length;
        if (v && typeof v === 'object') return Object.keys(v).length;
        return v === '' || v == null ? 0 : 1;
    }

    function storedSize(v) {
        try { return JSON.stringify(v === undefined ? null : v).length; } catch (e) { return 0; }
    }

    function formatSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        return (bytes / 1024).toFixed(bytes < 10240 ? 1 : 0) + ' KB';
    }

    function deleteStored(key, empty) {
        if (typeof GM_deleteValue === 'function') GM_deleteValue(key);
        else GM_setValue(key, empty);
    }

    function buildPrivacySection() {
        const wrap = document.createElement('div');
        wrap.className = 's34-privacy';
        wrap.innerHTML = `
            <div class="s34-privacy-hero">
                <div class="s34-privacy-icon">${LOCK_SVG}</div>
                <div>
                    <b>No data is collected.</b>
                    Steamy34 has no tracking, no analytics and no server of its own. Everything it
                    remembers is stored <b>only on this computer</b>, inside your browser's Tampermonkey
                    storage – nothing is uploaded or shared.
                </div>
            </div>
            <div class="s34-privacy-note">
                The script only talks to rule34.xxx itself (loading pages, pictures and tag
                suggestions – just like browsing), and only sends something to your account when you
                use ♥ Favourite or ▲ Vote. Your blacklist is the site's own list, kept in a rule34.xxx
                cookie – manage it with the Blacklist button.
            </div>
            <div class="s34-privacy-head">
                <span>Stored on this computer</span>
                <span class="s34-privacy-total"></span>
            </div>
            <div class="s34-privacy-list"></div>
            <div class="s34-privacy-actions">
                <button type="button" class="s34-btn" data-pv="export">⬇ Export a backup first</button>
                <button type="button" class="s34-btn s34-danger" data-pv="all">Delete all Steamy34 data</button>
            </div>
            <div class="s34-privacy-note">
                Other ways to remove everything: uninstalling Steamy34 in Tampermonkey deletes all of it,
                or open the Tampermonkey dashboard → Steamy34 → <i>Storage</i> tab.
                Downloaded files are normal files in your downloads folder – Steamy34 never touches them.
            </div>`;

        const list = wrap.querySelector('.s34-privacy-list');

        function render() {
            list.replaceChildren();
            let total = 0;
            STORED_DATA.forEach(([key, label, what, empty]) => {
                if (!label) return;
                let v;
                try { v = GM_getValue(key, undefined); } catch (e) { v = undefined; }
                // The small preferences row covers several keys
                const keys = key === 'steamy34_sbmenu_open' ? SMALL_PREF_KEYS : [key];
                const size = keys.reduce((s, k) => {
                    let x; try { x = GM_getValue(k, undefined); } catch (e) {}
                    return s + (x === undefined ? 0 : storedSize(x));
                }, 0);
                total += size;
                const count = ['steamy34_sbmenu_open', 'steamy34_video', 'steamy34_settings', 'steamy34_lastsearch'].includes(key)
                    ? null : storedCount(v);

                const row = document.createElement('div');
                row.className = 's34-privacy-row' + (size ? '' : ' s34-privacy-empty');
                const info = document.createElement('div');
                info.className = 's34-privacy-info';
                const name = document.createElement('div');
                name.className = 's34-privacy-name';
                name.textContent = label;
                const sub = document.createElement('div');
                sub.className = 's34-privacy-what';
                sub.textContent = what;
                info.append(name, sub);
                const amount = document.createElement('div');
                amount.className = 's34-privacy-amount';
                amount.textContent = !size ? 'empty' : (count != null ? count + ' · ' : '') + formatSize(size);
                const clear = document.createElement('button');
                clear.type = 'button';
                clear.className = 's34-privacy-clear';
                clear.textContent = 'Clear';
                clear.disabled = !size;
                clear.title = 'Delete this from your computer';
                clear.addEventListener('click', () => {
                    const extra = key === 'steamy34_settings' ? '\n\nAll settings go back to their defaults (after a reload).' : '';
                    if (!confirm(`Delete "${label}" from this computer? This can't be undone.${extra}`)) return;
                    keys.forEach(k => deleteStored(k, k === key ? empty : null));
                    // Forget the copies this page still holds in memory
                    if (key === 'steamy34_downloaded') downloaded = null;
                    if (key === 'steamy34_viewed') viewed = null;
                    if (key === 'steamy34_tagtypes') tagTypes.clear();
                    if (key === 'steamy34_downloaded' || key === 'steamy34_viewed') showDownloadedState();
                    render();
                    showToast(`Deleted: ${label}.`);
                });
                row.append(info, amount, clear);
                list.appendChild(row);
            });
            wrap.querySelector('.s34-privacy-total').textContent = 'Total ' + formatSize(total);
        }

        wrap.addEventListener('click', e => {
            const act = e.target.closest('[data-pv]');
            if (!act) return;
            if (act.dataset.pv === 'export') exportBackup();
            else if (act.dataset.pv === 'all') {
                if (!confirm('Delete ALL Steamy34 data from this computer?\n\nSettings, saved & recent searches, favourite tags, ' +
                             'downloaded / viewed marks and everything else listed here will be gone. This can\'t be undone.\n\n' +
                             'Your blacklist (kept by rule34.xxx) and your downloaded files are not touched.')) return;
                const keys = typeof GM_listValues === 'function'
                    ? GM_listValues()
                    : STORED_DATA.map(d => d[0]);
                keys.forEach(k => {
                    const def = STORED_DATA.find(d => d[0] === k);
                    deleteStored(k, def ? def[3] : null);
                });
                reloadWithMessage('All Steamy34 data was deleted from this device.');
            }
        });

        render();
        return wrap;
    }

    // ---- Popup: post info (score + vote, size, rating, date, uploader,
    //      source) and parent / child / pool notices from the post page ----
    function absUrl(u) {
        try { return new URL(u, location.href).href; } catch (e) { return ''; }
    }

    function readPostInfo(doc) {
        const info = {};
        const lis = Array.from(doc.querySelectorAll('#stats li'));
        const text = li => li.textContent.replace(/\s+/g, ' ').trim();
        const find = label => lis.find(li => new RegExp('^\\s*' + label + '\\s*:', 'i').test(li.textContent));
        let li;
        if ((li = find('Size'))) {
            const m = text(li).match(/(\d+)\s*[x×]\s*(\d+)/);
            if (m) info.size = m[1] + '×' + m[2];
        }
        if ((li = find('Rating'))) info.rating = text(li).replace(/^Rating:\s*/i, '');
        if ((li = find('Score'))) {
            const m = text(li).match(/Score:\s*(-?\d+)/i);
            if (m) info.score = m[1];
            const v = li.querySelector('a[onclick*="vote"]');
            const mm = v && (v.getAttribute('onclick') || '').match(/vote\(\s*'?(\d+)'?\s*,\s*'(\w+)'/);
            if (mm) info.voteType = mm[2];
        }
        if ((li = find('Posted'))) {
            const m = text(li).match(/Posted:\s*(.+?)\s*(?:by\s.*)?$/i);
            if (m) info.posted = m[1];
            const a = li.querySelector('a[href]');
            if (a) { info.by = a.textContent.trim(); info.byUrl = absUrl(a.getAttribute('href')); }
        }
        if ((li = find('Source'))) {
            const a = li.querySelector('a[href]');
            if (a && /^https?:/i.test(absUrl(a.getAttribute('href')))) info.source = absUrl(a.getAttribute('href'));
            else {
                const s = text(li).replace(/^Source:\s*/i, '');
                if (s) info.sourceText = s;
            }
        }

        // Parent / child / pool notices: keep only their text and links
        const seen = new Set();
        info.notices = Array.from(doc.querySelectorAll(
            '.status-notice, #pool-nav, #pool_nav, div[id^="pool"]'))
            .filter(el => {
                if (Array.from(seen).some(s => s.contains(el))) return false;
                seen.add(el);
                // "This image has been resized. Click here…" only works with
                // the site's own scripts - useless (and unclickable) here
                if (el.id === 'resized_notice' || el.closest('#resized_notice') ||
                    /has been resized/i.test(el.textContent)) return false;
                // "< previous · Tag search: … · next >" is the site's own
                // browsing bar (same class), not a notice about the post
                if (el.id === 'navlinksContainer' || el.closest('#navlinksContainer') ||
                    el.querySelector('#prev_search_link, #next_search_link')) return false;
                return el.textContent.trim().length > 0;
            })
            .map(cleanNotice)
            .filter(Boolean);
        return info;
    }

    // Copy a notice as plain text + links (links open in a new tab, so the
    // list you're browsing stays where it is)
    function cleanNotice(el) {
        const out = document.createElement('div');
        out.className = 's34-pv-notice';
        (function walk(node, into) {
            node.childNodes.forEach(n => {
                if (n.nodeType === 3) {
                    into.appendChild(document.createTextNode(n.textContent));
                } else if (n.nodeType === 1 && !/^(SCRIPT|STYLE|BUTTON|INPUT|FORM)$/.test(n.tagName)) {
                    if (n.tagName === 'A' && n.getAttribute('href') && !/^\s*(#|javascript:)/i.test(n.getAttribute('href'))) {
                        const a = document.createElement('a');
                        a.href = absUrl(n.getAttribute('href'));
                        a.target = '_blank';
                        a.rel = 'noopener';
                        a.textContent = n.textContent.trim() || a.href;
                        into.appendChild(a);
                    } else {
                        if (n.tagName === 'BR' || n.tagName === 'P' || n.tagName === 'DIV') into.appendChild(document.createTextNode(' '));
                        walk(n, into);
                    }
                }
            });
        })(el, out);
        out.normalize();
        return out.textContent.trim() ? out : null;
    }

    function shortUrl(u) {
        try {
            const x = new URL(u);
            const rest = (x.pathname + x.search).replace(/\/$/, '');
            return x.hostname.replace(/^www\./, '') + (rest.length > 24 ? rest.slice(0, 22) + '…' : rest);
        } catch (e) { return u; }
    }

    const VOTES_KEY = 'steamy34_votes';
    function hasVoted(id) {
        try { return !!(GM_getValue(VOTES_KEY, {}) || {})[id]; } catch (e) { return false; }
    }

    async function voteUp(id, type) {
        try {
            let r;
            try { r = await loadPage(`index.php?page=post&s=vote&id=${encodeURIComponent(id)}&type=${type || 'up'}`, 'action'); }
            catch (e) { if (e.cloudflare) { showToast('Vote not counted – solve the quick check first.', 'Solve check', openCloudflarePanel, 10000); return null; } throw e; }
            const body = r.html.trim();
            if (!r.ok) throw new Error('HTTP ' + r.status);
            const votes = GM_getValue(VOTES_KEY, {}) || {};
            votes[id] = Date.now();
            GM_setValue(VOTES_KEY, votes);
            // The site answers with the new score
            return /^-?\d+$/.test(body) ? body : '';
        } catch (e) {
            showToast('Vote failed (' + (e.message || e) + ').');
            return null;
        }
    }

    function renderPopupInfo(state, info) {
        const box = state.overlay.querySelector('.s34-pv-info');
        if (!box) return;
        box.replaceChildren();
        const id = postIdFrom(state.postUrl);

        // Row 1: score + vote, size, rating
        const row = document.createElement('div');
        row.className = 's34-pv-stats';
        const score = document.createElement('span');
        score.className = 's34-pv-score';
        score.textContent = '★ ' + (info.score != null ? info.score : '…');
        row.appendChild(score);
        const vote = document.createElement('button');
        vote.type = 'button';
        vote.className = 's34-pv-vote';
        vote.textContent = '▲';
        const voted = hasVoted(id);
        vote.classList.toggle('s34-on', voted);
        vote.title = voted ? 'You voted for this post' : 'Vote up';
        vote.addEventListener('click', async () => {
            if (vote.classList.contains('s34-on')) { showToast('You already voted for this post.'); return; }
            if (vote.classList.contains('s34-busy')) return;
            setBusy(vote, true);
            const res = await voteUp(id, info.voteType);
            setBusy(vote, false);
            if (res === null) return;
            vote.classList.add('s34-on');
            vote.title = 'You voted for this post';
            const n = res !== '' ? res : (info.score != null ? String(parseInt(info.score, 10) + 1) : '');
            if (n) {
                info.score = n;
                score.textContent = '★ ' + n;
                if (state.thumb) state.thumb.dataset.s34Score = n;
            }
            showToast('Voted ▲');
        });
        row.appendChild(vote);
        [info.size, info.rating].filter(Boolean).forEach(t => {
            const s = document.createElement('span');
            s.className = 's34-pv-pill';
            s.textContent = t;
            row.appendChild(s);
        });
        box.appendChild(row);

        // Row 2: posted date + uploader
        if (info.posted || info.by) {
            const p = document.createElement('div');
            p.className = 's34-pv-line';
            p.append('Posted ' + (info.posted || ''));
            if (info.by) {
                p.append(' by ');
                const a = document.createElement('a');
                a.textContent = info.by;
                if (info.byUrl) { a.href = info.byUrl; a.target = '_blank'; a.rel = 'noopener'; }
                p.appendChild(a);
            }
            box.appendChild(p);
        }

        // Row 3: source
        if (info.source || info.sourceText) {
            const s = document.createElement('div');
            s.className = 's34-pv-line';
            s.append('Source: ');
            if (info.source) {
                const a = document.createElement('a');
                a.href = info.source;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                a.textContent = shortUrl(info.source);
                a.title = info.source;
                s.appendChild(a);
            } else {
                s.append(info.sourceText);
            }
            box.appendChild(s);
        }

        // Parent / child / pool
        (info.notices || []).forEach(n => box.appendChild(n));
    }

    // ---- Popup: comments (scroll down below the media) ----
    // Text with line breaks, no HTML (comments are shown as plain text)
    function richText(el) {
        let out = '';
        (function walk(node) {
            node.childNodes.forEach(c => {
                if (c.nodeType === 3) { out += c.textContent; return; }
                if (c.nodeType !== 1 || /^(SCRIPT|STYLE|BUTTON|FORM|INPUT)$/.test(c.tagName)) return;
                if (c.tagName === 'BR') { out += '\n'; return; }
                const block = /^(P|DIV|LI|BLOCKQUOTE|H\d)$/.test(c.tagName);
                if (block && out && !out.endsWith('\n')) out += '\n';
                walk(c);
                if (block) out += '\n';
            });
        })(el);
        return out.replace(/[ \t]+\n/g, '\n').replace(/\n[ \t]+/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
    }

    // The comment layout isn't documented, so this reads it defensively:
    // each comment is an element with id "c<number>" (or a child of the
    // comment list with an account link), with author, date, score and text.
    function readComments(doc) {
        const root = doc.querySelector('#comment-list, #comments, .comment-list, #post-comments');
        let blocks = Array.from((root || doc).querySelectorAll('[id]')).filter(el => /^c\d+$/.test(el.id));
        blocks = blocks.filter(b => !blocks.some(o => o !== b && o.contains(b))); // outermost only
        if (!blocks.length && root) {
            blocks = Array.from(root.children).filter(el => el.querySelector('a[href*="page=account"], a[href*="s=profile"]'));
        }
        const comments = blocks.map(b => {
            const userA = b.querySelector('a[href*="page=account"], a[href*="s=profile"]') ||
                          (b.parentElement && b.parentElement.querySelector('a[href*="page=account"], a[href*="s=profile"]'));
            const flat = b.textContent.replace(/\s+/g, ' ');
            const date = (flat.match(/(\d{4}-\d{2}-\d{2}(?:\s+\d{1,2}:\d{2}(?::\d{2})?)?)/) || [])[1] || '';
            const score = (flat.match(/Score:\s*(-?\d+)/i) || [])[1];

            let body = '';
            const bodyEl = b.querySelector('.col2, [id^="cbody"], .comment-body, .body, .comment-text');
            if (bodyEl) {
                body = richText(bodyEl);
            } else {
                // No separate text box: take everything except the header bits
                const clone = b.cloneNode(true);
                clone.querySelectorAll('.col1, .info, .author, small, script').forEach(n => n.remove());
                if (userA) clone.querySelectorAll('a[href*="page=account"], a[href*="s=profile"]').forEach(n => n.remove());
                body = richText(clone).split('\n')
                    .filter(line => !/^\s*(Posted on|Score:|\(vote|vote |Report|Reply|Quote)/i.test(line))
                    .join('\n').replace(date, '').trim();
            }
            return {
                id: b.id || '',
                user: userA ? userA.textContent.trim() : 'Anonymous',
                userUrl: userA ? absUrl(userA.getAttribute('href')) : '',
                date, score, body
            };
        }).filter(c => c.body);
        // rule34 shows 10 comments a page: "17 comments" at the top, "Next »"
        // (with a cursor) at the bottom - for the popup's "More comments"
        const total = root ? parseInt((root.textContent.slice(0, 300).match(/^\s*(\d+)\s+comments?\b/i) || [])[1], 10) || 0 : 0;
        const nextA = Array.from(doc.querySelectorAll('#post-comments #paginator a, #comment-list #paginator a, #paginator a[href*="cursor="]'))
            .find(a => /cursor=/.test(a.getAttribute('href') || '') || /next/i.test(a.textContent));
        const next = nextA ? absUrl(nextA.getAttribute('href')) : '';
        console.log('[Steamy34] Comments:', comments.length + (total ? ' of ' + total : ''),
            root ? '(from #' + (root.id || root.className) + ')' : '(no comment list on the page)');
        return { comments, found: !!root || comments.length > 0, total, next };
    }

    // Plain text with clickable web links
    function linkifyInto(el, text) {
        const re = /\bhttps?:\/\/[^\s<>"']+/gi;
        let last = 0, m;
        while ((m = re.exec(text))) {
            if (m.index > last) el.appendChild(document.createTextNode(text.slice(last, m.index)));
            const a = document.createElement('a');
            a.href = m[0];
            a.textContent = m[0].length > 60 ? m[0].slice(0, 57) + '…' : m[0];
            a.target = '_blank';
            a.rel = 'noopener noreferrer nofollow';
            el.appendChild(a);
            last = m.index + m[0].length;
        }
        if (last < text.length) el.appendChild(document.createTextNode(text.slice(last)));
    }

    function avatarColor(name) {
        let h = 0;
        for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) % 360;
        return `hsl(${h}, 55%, 42%)`;
    }

    // result: null = still loading; { comments, found, failed }
    function renderComments(state, result) {
        const overlay = state.overlay;
        const sec = overlay.querySelector('.s34-cm-section');
        if (!sec) return;
        state.commentsDone = !!result;
        sec.replaceChildren();

        const head = document.createElement('div');
        head.className = 's34-cm-head';
        const h = document.createElement('h3');
        h.textContent = 'Comments';
        const count = document.createElement('span');
        count.className = 's34-cm-count';
        const write = document.createElement('a');
        write.className = 's34-cm-write';
        write.href = state.postUrl + '#comments';
        write.target = '_blank';
        write.rel = 'noopener';
        // Two lines, so it's clear this leaves the popup
        write.innerHTML =
            '<span class="s34-cm-write-main">✎ Write a comment ' +
            '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6"/><path d="M20 4l-9 9"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg></span>' +
            '<span class="s34-cm-write-sub">opens the original rule34 page in a new tab</span>';
        write.title = 'Commenting works on the site\'s own post page (old design) – it opens in a new tab, this popup stays open';
        head.append(h, count, write);
        sec.appendChild(head);

        const list = result ? result.comments : [];
        count.textContent = result ? String(Math.max(list.length, result.total || 0)) : '…';
        count.hidden = !result;

        if (!result) {
            const wait = document.createElement('div');
            wait.className = 's34-cm-empty';
            wait.innerHTML = '<span class="s34-spin"></span> Loading comments…';
            sec.appendChild(wait);
            return;
        }
        if (!list.length) {
            const empty = document.createElement('div');
            empty.className = 's34-cm-empty';
            empty.textContent = result.failed ? 'Couldn\'t load the comments – open the full post to see them.'
                : result.found ? 'No comments yet. Be the first – "Write a comment" opens the original post page in a new tab.'
                : 'No comments found for this post.';
            sec.appendChild(empty);
            return;
        }

        const wrap = document.createElement('div');
        wrap.className = 's34-cm-list';
        list.forEach(c => wrap.appendChild(commentElement(c)));
        sec.appendChild(wrap);
        addMoreCommentsButton(state, sec, wrap, result);
    }

    // "More comments (7 more)": the next 10 from the site, through the shared
    // page line (Beta 3.5.1 - before, the popup showed only the first 10)
    function addMoreCommentsButton(state, sec, wrap, result) {
        if (!result.next) return;
        const more = document.createElement('button');
        more.type = 'button';
        more.className = 's34-cm-more';
        const left = (result.total || 0) - wrap.children.length;
        const label = left > 0 ? `More comments (${left} more)` : 'More comments';
        more.textContent = label;
        more.addEventListener('click', async () => {
            more.disabled = true;
            more.textContent = 'Loading…';
            try {
                const page = await loadPage(result.next, 'popup');
                if (!popupState || popupState.id !== state.id) return;
                const r = readComments(new DOMParser().parseFromString(page.html, 'text/html'));
                const have = new Set(Array.from(wrap.children).map(el => el.dataset.cid).filter(Boolean));
                r.comments.filter(c => !c.id || !have.has(c.id)).forEach(c => wrap.appendChild(commentElement(c)));
                more.remove();
                addMoreCommentsButton(state, sec, wrap, { next: r.next, total: result.total });
            } catch (e) {
                more.disabled = false;
                more.textContent = e && e.cloudflare ? 'Solve the quick check, then try again' : 'Couldn\'t load – try again';
            }
        });
        sec.appendChild(more);
    }

    // One comment: round initial, name, "3 days ago", ▲ score, the text
    function commentElement(c) {
        const art = document.createElement('article');
        art.className = 's34-cm';
        if (c.id) art.dataset.cid = c.id;
        const av = document.createElement('div');
        av.className = 's34-cm-avatar';
        av.textContent = (c.user || '?').charAt(0).toUpperCase();
        av.style.setProperty('background-color', avatarColor(c.user || '?'), 'important');
        const main = document.createElement('div');
        main.className = 's34-cm-main';
        const meta = document.createElement('div');
        meta.className = 's34-cm-meta';
        const user = document.createElement(c.userUrl ? 'a' : 'span');
        user.className = 's34-cm-user';
        user.textContent = c.user;
        if (c.userUrl) { user.href = c.userUrl; user.target = '_blank'; user.rel = 'noopener'; }
        meta.appendChild(user);
        if (c.date) {
            const d = document.createElement('span');
            d.className = 's34-cm-date';
            const ms = Date.parse(c.date.replace(' ', 'T'));
            d.textContent = isNaN(ms) ? c.date : timeAgo(ms);
            d.title = c.date;
            meta.appendChild(d);
        }
        if (c.score != null && c.score !== '0') {
            const s = document.createElement('span');
            s.className = 's34-cm-score';
            s.textContent = '▲ ' + c.score;
            meta.appendChild(s);
        }
        const text = document.createElement('div');
        text.className = 's34-cm-text';
        linkifyInto(text, c.body);
        main.append(meta, text);
        art.append(av, main);
        return art;
    }

    // ---- Popup: auto next post (slideshow) ----
    // Images move on after the chosen time; videos play to the end first.
    // Pauses while you zoom, while another window is open or the tab is hidden.
    const AUTO_KEY = 'steamy34_auto';
    const autoNext = { on: false, elapsed: 0, timer: null, busy: false };

    function autoSeconds() {
        let s = 6;
        try { s = (GM_getValue(AUTO_KEY, {}) || {}).sec || 6; } catch (e) {}
        return Math.min(30, Math.max(2, s));
    }

    function autoPaused() {
        return !popupState || document.hidden || !!document.querySelector('.s34-overlay') ||
               !!popupState.overlay.querySelector('.s34-pv-zoomed') || !popupState.mediaReady;
    }

    function popupVideo() {
        return popupState && popupState.overlay.querySelector('video.s34-pv-media');
    }

    function startAutoNext() {
        autoNext.on = true;
        autoNext.elapsed = 0;
        const v = popupVideo();
        if (v) v.loop = false; // so it can end and move on
        clearInterval(autoNext.timer);
        autoNext.timer = setInterval(autoTick, 100);
        renderAutoNext();
    }

    function stopAutoNext() {
        autoNext.on = false;
        clearInterval(autoNext.timer);
        autoNext.timer = null;
        const v = popupVideo();
        if (v) v.loop = getVideoPrefs().loop;
        renderAutoNext();
    }

    function autoTick() {
        if (!popupState) { stopAutoNext(); return; }
        const bar = popupState.overlay.querySelector('.s34-auto-bar i');
        if (popupState.isVideo) {
            // Videos: the bar follows the video; "ended" moves on
            const v = popupVideo();
            if (bar && v && v.duration) bar.style.width = Math.min(100, v.currentTime / v.duration * 100) + '%';
            return;
        }
        if (autoPaused()) return;
        autoNext.elapsed += 100;
        const total = autoSeconds() * 1000;
        if (bar) bar.style.width = Math.min(100, autoNext.elapsed / total * 100) + '%';
        if (autoNext.elapsed >= total) autoAdvance();
    }

    async function autoAdvance() {
        if (autoNext.busy || !popupState) return;
        autoNext.busy = true;
        autoNext.elapsed = 0;
        try {
            let list = visibleThumbs();
            let i = list.indexOf(popupState.thumb);
            if (!list[i + 1]) {
                // End of what's loaded: let infinite scroll fetch the next page
                // (from the Following window: its grid loads more)
                if (popupState.list) popupState.list.more();
                else window.scrollTo(0, document.documentElement.scrollHeight);
                await pause(2500);
                if (!popupState || !autoNext.on) return;
                list = visibleThumbs();
                i = list.indexOf(popupState.thumb);
            }
            if (list[i + 1]) openPopup(list[i + 1]);
            else {
                stopAutoNext();
                showToast('Auto next stopped – no more posts.');
            }
        } finally {
            autoNext.busy = false;
        }
    }

    function renderAutoNext() {
        if (!popupState) return;
        const box = popupState.overlay.querySelector('.s34-auto');
        if (!box) return;
        const btn = box.querySelector('.s34-auto-toggle');
        btn.classList.toggle('s34-on', autoNext.on);
        btn.innerHTML = autoNext.on
            ? '<span class="s34-auto-icon">❚❚</span> Stop auto next'
            : '<span class="s34-auto-icon">▶</span> Auto next';
        btn.title = autoNext.on ? 'Stop the slideshow' : 'Go to the next post by itself (slideshow)';
        box.classList.toggle('s34-auto-running', autoNext.on);
        box.querySelector('.s34-auto-sec').textContent = autoSeconds() + ' s';
        box.querySelector('.s34-auto-note').textContent = popupState.isVideo
            ? 'Videos play to the end, then the next post opens'
            : 'Next post after ' + autoSeconds() + ' seconds';
        if (!autoNext.on) box.querySelector('.s34-auto-bar i').style.width = '0%';
    }

    function setupAutoNextControls(overlay) {
        const box = overlay.querySelector('.s34-auto');
        const range = box.querySelector('input[type="range"]');
        range.value = autoSeconds();
        range.addEventListener('input', () => {
            GM_setValue(AUTO_KEY, { sec: parseInt(range.value, 10) });
            box.querySelector('.s34-auto-sec').textContent = range.value + ' s';
            renderAutoNext();
        });
        range.addEventListener('change', () => range.blur()); // ← / → browse again
        box.querySelector('.s34-auto-toggle').addEventListener('click', () => {
            if (autoNext.on) stopAutoNext(); else startAutoNext();
        });
    }

    // =================================================================
    //  THEATER MODE, COLLECTIONS, DOWNLOAD TAGS, STATS
    // =================================================================

    const THEATER_KEY = 'steamy34_theater';
    const THEATER_SVG = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5"/><path d="M20 9V4h-5"/><path d="M4 15v5h5"/><path d="M20 15v5h-5"/></svg>';
    const THEATER_EXIT_SVG = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4v5H4"/><path d="M15 4v5h5"/><path d="M9 20v-5H4"/><path d="M15 20v-5h5"/></svg>';
    const FOLDER_SVG = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M3 6.5A1.5 1.5 0 0 1 4.5 5H9l2 2.5h8.5A1.5 1.5 0 0 1 21 9v9.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5z"/></svg>';
    const STATS_SVG = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M5 20V12"/><path d="M12 20V5"/><path d="M19 20v-9"/></svg>';

    // ---- Theater mode: the popup without its sidebar ----
    function setTheater(on, overlay) {
        overlay = overlay || (popupState && popupState.overlay);
        if (!overlay) return;
        overlay.classList.toggle('s34-pv-theater', on);
        GM_setValue(THEATER_KEY, on);
    }

    function popupThumbSrc(state) {
        const img = state && state.thumb && state.thumb.querySelector('img');
        return img ? (img.getAttribute('src') || img.dataset.s34Src || '') : '';
    }

    // ---- A window in the same style as the blacklist window ----
    function openWindow({ cls, icon, title, width }) {
        const overlay = document.createElement('div');
        overlay.className = 's34-overlay s34-win-overlay ' + (cls || '');
        overlay.innerHTML = `
            <div class="s34-win" role="dialog" aria-modal="true">
                <div class="s34-win-head">
                    <div class="s34-win-icon">${icon}</div>
                    <div class="s34-win-heading">
                        <div class="s34-win-title"></div>
                        <div class="s34-win-sub"></div>
                    </div>
                    <button type="button" class="s34-win-close" title="Close (Esc)">✕</button>
                </div>
                <div class="s34-win-body"></div>
            </div>`;
        const win = overlay.querySelector('.s34-win');
        if (width) win.style.width = `min(${width}px, calc(100vw - 32px))`;
        overlay.querySelector('.s34-win-title').textContent = title;
        const api = {
            overlay,
            body: overlay.querySelector('.s34-win-body'),
            setTitle: t => { overlay.querySelector('.s34-win-title').textContent = t; },
            setSub: t => { overlay.querySelector('.s34-win-sub').textContent = t; },
            onClose: null,
            close() {
                document.removeEventListener('keydown', onKey, true);
                overlay.remove();
                if (api.onClose) api.onClose();
            }
        };
        function onKey(e) {
            if (e.key !== 'Escape' || document.querySelector('.s34-tips-overlay, .s34-cmenu')) return;
            if (overlay.classList.contains('s34-under-popup') || e.defaultPrevented) return; // the popup on top closes first
            e.preventDefault();
            e.stopPropagation();
            api.close();
        }
        overlay.querySelector('.s34-win-close').addEventListener('click', () => api.close());
        overlay.addEventListener('mousedown', e => { if (e.target === overlay) api.close(); });
        document.addEventListener('keydown', onKey, true);
        document.body.appendChild(overlay);
        return api;
    }

    function postPageUrl(id) {
        return location.origin + '/index.php?page=post&s=view&id=' + encodeURIComponent(id);
    }

    // src: one picture or a list to try in order; onFail: called when none loads
    function thumbOrPlaceholder(src, id, fallback, onFail) {
        const box = document.createElement('div');
        box.className = 's34-tile-img';
        const tries = [].concat(src || [], fallback || []).filter(Boolean);
        if (tries.length) {
            const img = new Image();
            img.loading = 'lazy';
            img.alt = '';
            let n = 0;
            img.src = tries[n];
            img.addEventListener('error', () => {
                if (++n < tries.length) { img.src = tries[n]; return; }
                img.remove();
                box.textContent = '#' + id;
                if (onFail) onFail();
            });
            box.appendChild(img);
        } else {
            box.textContent = '#' + id;
        }
        return box;
    }

    // ---- Download any post by its id (collections) ----
    async function downloadPostById(id, thumb) {
        const url = postPageUrl(id);
        const doc = await fetchPostDoc(url, 'batch');
        if (!doc) return false;
        const media = await getPostMedia(url, 'batch');
        const file = media && (media.video || media.image);
        if (!file) return false;
        const g = readPostTags(doc);
        const names = k => (g[k] || []).map(x => x.tag);
        const tags = { copyright: names('copyright'), character: names('character'), artist: names('artist') };
        const ok = await saveUrlAs(file, buildFilename(file, tags, readPostSize(doc), id), url);
        if (ok) rememberDownload(id, { thumb, tags });
        return ok;
    }

    // ---- Download tags (newest first; post, tags, time) - for Stats ----
    const DLHIST_KEY = 'steamy34_dlhistory';
    const DLHIST_LIMIT = 3000;

    function getDlHistory() {
        try {
            const v = GM_getValue(DLHIST_KEY, []);
            return Array.isArray(v) ? v : [];
        } catch (e) { return []; }
    }

    // Only the tags of each download are kept - Stats builds its
    // "top artists / characters / series" from them
    function addDlHistory(id, info) {
        if (!id) return;
        const list = getDlHistory().filter(h => h.id !== id);
        const tags = (info && info.tags) || {};
        list.unshift({
            id,
            time: Date.now(),
            artist: (tags.artist || []).slice(0, 5),
            character: (tags.character || []).slice(0, 5),
            copyright: (tags.copyright || []).slice(0, 5)
        });
        GM_setValue(DLHIST_KEY, list.slice(0, DLHIST_LIMIT));
        updateHubCounts();
    }

    // Older versions also stored preview pictures here (for the removed
    // download history window) - drop them, keep only what Stats needs
    function trimDlHistory() {
        const list = getDlHistory();
        if (!list.some(h => h.thumb || h.fallback || h.checked)) return;
        GM_setValue(DLHIST_KEY, list.map(h => ({
            id: h.id, time: h.time, artist: h.artist || [], character: h.character || [], copyright: h.copyright || []
        })));
    }

    // ---- Your stats ----
    function countTop(lists, n) {
        const c = new Map();
        lists.forEach(list => (list || []).forEach(t => c.set(t, (c.get(t) || 0) + 1)));
        return Array.from(c.entries()).sort((a, b) => b[1] - a[1]).slice(0, n);
    }

    function openStatsWindow() {
        if (document.querySelector('.s34-stats-overlay')) return;
        const w = openWindow({ cls: 's34-stats-overlay', icon: STATS_SVG, title: 'Your stats', width: 700 });
        const hist = getDlHistory();
        const downloadedMap = loadDownloaded();
        const viewedMap = loadViewed();
        const favs = getFavs();
        const colls = getCollections();
        const times = [].concat(Object.values(downloadedMap), Object.values(viewedMap)).filter(Boolean);
        const since = times.length ? Math.min(...times) : 0;

        const tiles = [
            ['Downloaded', Object.keys(downloadedMap).length],
            ['Viewed', Object.keys(viewedMap).length],
            ['Favourites', Object.keys(favs).length],
            ['In collections', colls.reduce((s, c) => s + c.posts.length, 0)],
            ['Blacklisted tags', readBlocklist().length],
            ['Following', getFollowing().artists.length]
        ];
        w.setSub(since ? 'Since ' + new Date(since).toLocaleDateString() + ' · only on this computer' : 'Only on this computer');

        // Last 14 days: views and downloads per day
        const days = [];
        const dayStart = d => { const x = new Date(d); x.setHours(0, 0, 0, 0); return x.getTime(); };
        const today = dayStart(Date.now());
        for (let i = 13; i >= 0; i--) days.push({ t: today - i * 86400000, v: 0, d: 0 });
        const bump = (map, key) => Object.values(map).forEach(t => {
            const day = days.find(x => x.t === dayStart(t));
            if (day) day[key]++;
        });
        bump(viewedMap, 'v');
        bump(downloadedMap, 'd');
        const maxDay = Math.max(1, ...days.map(x => Math.max(x.v, x.d)));

        const top = (title, key) => {
            const list = countTop(hist.map(h => h[key]), 8);
            const max = list.length ? list[0][1] : 1;
            return `<div class="s34-stat-top">
                <div class="s34-stat-label">${title}</div>
                ${list.length ? list.map(([t, n]) => `
                    <div class="s34-stat-bar s34-blm-${key}">
                        <span class="s34-stat-name"></span>
                        <span class="s34-stat-track"><i style="width:${Math.round(n / max * 100)}%"></i></span>
                        <b>${n}</b>
                    </div>`).join('') : '<div class="s34-win-empty">Nothing yet</div>'}
            </div>`;
        };

        w.body.innerHTML = `
            <div class="s34-stat-tiles">
                ${tiles.map(([label, n]) => `<div class="s34-stat-tile"><b>${n.toLocaleString()}</b><span>${label}</span></div>`).join('')}
            </div>
            <div class="s34-stat-label">Last 14 days</div>
            <div class="s34-stat-chart">
                ${days.map(x => `
                    <div class="s34-stat-day" title="${new Date(x.t).toLocaleDateString()}: ${x.v} viewed, ${x.d} downloaded">
                        <div class="s34-stat-cols">
                            <i class="s34-stat-v" style="height:${Math.round(x.v / maxDay * 100)}%"></i>
                            <i class="s34-stat-d" style="height:${Math.round(x.d / maxDay * 100)}%"></i>
                        </div>
                        <span>${new Date(x.t).getDate()}</span>
                    </div>`).join('')}
            </div>
            <div class="s34-stat-legend"><span class="s34-stat-v"></span> viewed <span class="s34-stat-d"></span> downloaded</div>
            <div class="s34-stat-tops">
                ${top('Top artists', 'artist')}
                ${top('Top characters', 'character')}
                ${top('Top series', 'copyright')}
            </div>
            <div class="s34-win-note">Top lists count your downloads${hist.length ? '' : ' (they fill up as you download)'}.</div>`;
        // Tag names as text (never as HTML)
        ['artist', 'character', 'copyright'].forEach((key, i) => {
            const list = countTop(hist.map(h => h[key]), 8);
            w.body.querySelectorAll('.s34-stat-top')[i].querySelectorAll('.s34-stat-name')
                .forEach((el, j) => { el.textContent = prettyTag(list[j][0]); });
        });
    }

    // ---- Local collections (your own folders, only on this computer) ----
    const COLL_KEY = 'steamy34_collections';

    function getCollections() {
        try {
            const v = GM_getValue(COLL_KEY, []);
            return Array.isArray(v) ? v.filter(c => c && c.id && Array.isArray(c.posts)) : [];
        } catch (e) { return []; }
    }

    function saveCollections(list) {
        GM_setValue(COLL_KEY, list);
        updateHubCounts();
    }

    function createCollection(name) {
        const list = getCollections();
        const c = { id: 'c' + Date.now().toString(36), name: name.trim().slice(0, 60) || 'New collection', created: Date.now(), posts: [] };
        list.push(c);
        saveCollections(list);
        return c;
    }

    // Small menu: tick collections for one post, or add several posts at once
    function openCollectMenu(anchor, posts) {
        document.querySelectorAll('.s34-cmenu').forEach(m => m.remove());
        const single = posts.length === 1;
        const menu = document.createElement('div');
        menu.className = 's34-cmenu';

        function render() {
            menu.replaceChildren();
            const head = document.createElement('div');
            head.className = 's34-cmenu-head';
            head.textContent = single ? 'Save to collection' : `Add ${posts.length} posts to…`;
            menu.appendChild(head);
            const list = getCollections();
            if (!list.length) {
                const e = document.createElement('div');
                e.className = 's34-cmenu-empty';
                e.textContent = 'No collections yet – make your first one:';
                menu.appendChild(e);
            }
            list.forEach(c => {
                const has = single && c.posts.some(p => p.id === posts[0].id);
                const b = document.createElement('button');
                b.type = 'button';
                b.className = 's34-cmenu-item' + (has ? ' s34-on' : '');
                b.innerHTML = `<span class="s34-cmenu-check">${has ? '✓' : ''}</span><span class="s34-cmenu-name"></span><span class="s34-cmenu-n">${c.posts.length}</span>`;
                b.querySelector('.s34-cmenu-name').textContent = c.name;
                b.addEventListener('click', () => {
                    const all = getCollections();
                    const col = all.find(x => x.id === c.id);
                    if (!col) return;
                    if (single && has) {
                        col.posts = col.posts.filter(p => p.id !== posts[0].id);
                        showToast(`Removed from "${col.name}".`);
                    } else {
                        let added = 0;
                        posts.forEach(p => {
                            if (p.id && !col.posts.some(x => x.id === p.id)) {
                                col.posts.unshift({ id: p.id, thumb: p.thumb || '', time: Date.now() });
                                added++;
                            }
                        });
                        showToast(added ? `Saved ${added === 1 ? '' : added + ' posts '}to "${col.name}".` : `Already in "${col.name}".`);
                    }
                    saveCollections(all);
                    if (single) render(); else menu.remove();
                });
                menu.appendChild(b);
            });
            const add = document.createElement('div');
            add.className = 's34-cmenu-new';
            add.innerHTML = '<input type="text" placeholder="New collection…" maxlength="60"><button type="button">Create</button>';
            const input = add.querySelector('input');
            const create = () => {
                if (!input.value.trim()) { input.focus(); return; }
                const c = createCollection(input.value);
                const all = getCollections();
                const col = all.find(x => x.id === c.id);
                posts.forEach(p => { if (p.id) col.posts.unshift({ id: p.id, thumb: p.thumb || '', time: Date.now() }); });
                saveCollections(all);
                showToast(`Made "${col.name}" and saved ${posts.length === 1 ? 'the post' : posts.length + ' posts'}.`);
                if (single) render(); else menu.remove();
            };
            add.querySelector('button').addEventListener('click', create);
            input.addEventListener('keydown', e => {
                e.stopPropagation(); // typing doesn't trigger hotkeys
                if (e.key === 'Enter') { e.preventDefault(); create(); }
                if (e.key === 'Escape') menu.remove();
            });
            menu.appendChild(add);
        }
        render();
        document.body.appendChild(menu);
        // Next to the button, kept on screen
        const r = anchor.getBoundingClientRect();
        const mw = menu.offsetWidth, mh = menu.offsetHeight;
        let left = Math.min(r.left, window.innerWidth - mw - 8);
        let top = r.bottom + 6;
        if (top + mh > window.innerHeight - 8) top = Math.max(8, r.top - mh - 6);
        menu.style.left = Math.max(8, left) + 'px';
        menu.style.top = top + 'px';
        const off = e => {
            if (!menu.isConnected) { document.removeEventListener('mousedown', off, true); return; }
            if (!menu.contains(e.target) && !anchor.contains(e.target)) {
                menu.remove();
                document.removeEventListener('mousedown', off, true);
            }
        };
        setTimeout(() => document.addEventListener('mousedown', off, true), 0);
    }

    function openCollectionsWindow(openId) {
        if (document.querySelector('.s34-coll-overlay')) return;
        const w = openWindow({ cls: 's34-coll-overlay', icon: FOLDER_SVG, title: 'Collections', width: 820 });
        let current = openId || null;
        let downloading = null; // { stop }

        function renderList() {
            current = null;
            w.setTitle('Collections');
            const list = getCollections();
            w.setSub(list.length ? `${list.length} collection${list.length === 1 ? '' : 's'} · only on this computer` : 'Your own folders for posts – only on this computer');
            w.body.replaceChildren();
            const grid = document.createElement('div');
            grid.className = 's34-coll-grid';
            list.forEach(c => {
                const card = document.createElement('button');
                card.type = 'button';
                card.className = 's34-coll-card';
                const cover = document.createElement('div');
                cover.className = 's34-coll-cover';
                c.posts.slice(0, 4).forEach(p => { if (p.thumb) { const i = new Image(); i.src = p.thumb; i.alt = ''; i.loading = 'lazy'; cover.appendChild(i); } });
                if (!cover.childElementCount) cover.innerHTML = FOLDER_SVG;
                cover.classList.toggle('s34-coll-cover-n' + Math.min(4, cover.querySelectorAll('img').length), true);
                const name = document.createElement('div');
                name.className = 's34-coll-name';
                name.textContent = c.name;
                const n = document.createElement('div');
                n.className = 's34-coll-n';
                n.textContent = c.posts.length + (c.posts.length === 1 ? ' post' : ' posts');
                card.append(cover, name, n);
                card.addEventListener('click', () => renderOne(c.id));
                grid.appendChild(card);
            });
            // New collection card
            const add = document.createElement('div');
            add.className = 's34-coll-card s34-coll-new';
            add.innerHTML = '<div class="s34-coll-plus">+</div><input type="text" placeholder="New collection…" maxlength="60"><button type="button">Create</button>';
            const input = add.querySelector('input');
            const create = () => {
                if (!input.value.trim()) { input.focus(); return; }
                createCollection(input.value);
                renderList();
            };
            add.querySelector('button').addEventListener('click', create);
            input.addEventListener('keydown', e => { e.stopPropagation(); if (e.key === 'Enter') create(); if (e.key === 'Escape') w.close(); });
            grid.appendChild(add);
            w.body.appendChild(grid);
            if (!list.length) {
                const hint = document.createElement('div');
                hint.className = 's34-win-note';
                hint.textContent = 'Save posts with the Collection button in the popup or on a post page – or tick several with Batch download and use "Add to collection".';
                w.body.appendChild(hint);
            }
        }

        function renderOne(id) {
            const c = getCollections().find(x => x.id === id);
            if (!c) { renderList(); return; }
            current = id;
            w.setTitle(c.name);
            w.setSub(`${c.posts.length} post${c.posts.length === 1 ? '' : 's'} · collection`);
            w.body.replaceChildren();
            const bar = document.createElement('div');
            bar.className = 's34-win-tools';
            bar.innerHTML = `
                <button type="button" data-a="back">← All collections</button>
                <span class="s34-grow"></span>
                <button type="button" data-a="rename">✎ Rename</button>
                <button type="button" data-a="delete">Delete</button>
                <button type="button" data-a="dl" class="s34-win-primary">⬇ Download all</button>`;
            bar.addEventListener('click', async e => {
                const a = e.target.closest('[data-a]');
                if (!a) return;
                const act = a.dataset.a;
                if (act === 'back') { if (downloading) downloading.stop = true; renderList(); }
                else if (act === 'rename') {
                    const name = prompt('New name for this collection:', c.name);
                    if (name === null || !name.trim()) return;
                    const all = getCollections();
                    all.find(x => x.id === id).name = name.trim().slice(0, 60);
                    saveCollections(all);
                    renderOne(id);
                } else if (act === 'delete') {
                    if (!confirm(`Delete the collection "${c.name}"? The posts themselves stay on rule34 – only this list is removed.`)) return;
                    saveCollections(getCollections().filter(x => x.id !== id));
                    renderList();
                } else if (act === 'dl') {
                    if (downloading) { downloading.stop = true; return; }
                    const posts = getCollections().find(x => x.id === id).posts.slice();
                    if (!posts.length) return;
                    downloading = { stop: false };
                    const status = w.body.querySelector('.s34-win-status');
                    a.textContent = '■ Stop';
                    let ok = 0, failed = 0;
                    const job = downloading;
                    const panel = openDownloadPanel(posts.length, 'Collection "' + c.name + '"', () => { job.stop = true; });
                    for (let i = 0; i < posts.length && !job.stop; i++) {
                        await panel.waitWhilePaused();
                        if (job.stop) break;
                        status.hidden = false;
                        status.textContent = `Downloading ${i + 1} / ${posts.length}…`;
                        panel.status(`Post ${i + 1} of ${posts.length}…`);
                        while (cloudflarePaused() && !job.stop) {
                            status.textContent = 'Paused – solve the Cloudflare check to continue';
                            panel.status(status.textContent);
                            await pause(2000);
                        }
                        if (job.stop) break;
                        const done = await downloadPostById(posts[i].id, posts[i].thumb);
                        if (done) ok++; else failed++;
                        panel.item(done);
                        if (i < posts.length - 1 && !job.stop) await pause(CONFIG.batchDelay);
                    }
                    const stopped = job.stop;
                    const sum = panel.finish(stopped);
                    downloading = null;
                    if (!w.overlay.isConnected) return;
                    a.textContent = '⬇ Download all';
                    status.textContent = sum;
                }
            });
            const status = document.createElement('div');
            status.className = 's34-win-status';
            status.hidden = true;
            const tiles = document.createElement('div');
            tiles.className = 's34-tiles';
            if (!c.posts.length) {
                const e = document.createElement('div');
                e.className = 's34-win-empty';
                e.textContent = 'Empty – save posts here with the Collection button.';
                tiles.appendChild(e);
            }
            // A post opens in the popup viewer on top, ← / → go through this
            // collection (Beta 3.6 - before, the post page in a new tab; Ctrl /
            // middle click still does that). The popup gets a small stand-in
            // thumbnail per post; picture or video is learned from the post page
            // the first time and kept with the post.
            const proxies = c.posts.map(p => {
                const s = document.createElement('span');
                s.className = 'thumb';
                s.innerHTML = '<a></a>';
                s.firstChild.href = postPageUrl(p.id);
                const im = new Image();
                im.alt = '';
                if (p.thumb) im.src = p.thumb;
                if (typeof p.video === 'boolean') { if (p.video) im.className = 'webm-thumb'; }
                else s.dataset.s34TypeUnknown = '1';
                s.firstChild.appendChild(im);
                s._s34OnType = isVideo => {
                    const all = getCollections();
                    const col = all.find(x => x.id === id);
                    const item = col && col.posts.find(x => x.id === p.id);
                    if (item && item.video !== isVideo) { item.video = isVideo; saveCollections(all); }
                };
                return s;
            });
            const list = { thumbs: () => proxies, state: () => 'done', more: () => {} };
            c.posts.forEach((p, n) => {
                const tile = document.createElement('div');
                tile.className = 's34-tile';
                const link = document.createElement('a');
                link.href = postPageUrl(p.id);
                link.target = '_blank';
                link.rel = 'noopener';
                link.title = 'Open the post (Ctrl + click: the post page in a new tab)';
                link.addEventListener('click', e => {
                    if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
                    e.preventDefault();
                    w.overlay.classList.add('s34-under-popup'); // steps aside until the popup closes
                    openPopup(proxies[n], list);
                });
                link.appendChild(thumbOrPlaceholder(p.thumb, p.id));
                const cap = document.createElement('div');
                cap.className = 's34-tile-cap';
                cap.innerHTML = '<div class="s34-tile-title"></div><div class="s34-tile-sub"></div>';
                cap.firstChild.textContent = '#' + p.id;
                cap.lastChild.textContent = 'added ' + timeAgo(p.time);
                const acts = document.createElement('div');
                acts.className = 's34-tile-acts';
                const rm = document.createElement('button');
                rm.type = 'button';
                rm.textContent = '×';
                rm.title = 'Remove from this collection';
                rm.addEventListener('click', () => {
                    const all = getCollections();
                    const col = all.find(x => x.id === id);
                    col.posts = col.posts.filter(x => x.id !== p.id);
                    saveCollections(all);
                    renderOne(id);
                });
                acts.appendChild(rm);
                tile.append(link, cap, acts);
                tiles.appendChild(tile);
            });
            w.body.append(bar, status, tiles);
        }

        w.onClose = () => { if (downloading) downloading.stop = true; };
        if (current) renderOne(current); else renderList();
    }

    // ---- Sidebar: Collections · Stats ----
    function updateHubCounts() {
        const hub = document.querySelector('.s34-hub');
        if (!hub) return;
        const n = getCollections().length;
        hub.querySelector('[data-hub="coll"] small').textContent = n ? n + (n === 1 ? ' folder' : ' folders') : 'none yet';
    }

    function addHub() {
        if (document.querySelector('.s34-hub')) return;
        const anchor = document.querySelector('.s34-blbtn') || document.querySelector('.s34-gear.s34-inline');
        if (!anchor) return;
        const hub = document.createElement('div');
        hub.className = 's34-hub';
        hub.innerHTML = `
            <button type="button" data-hub="coll" title="Your own collections of posts">${FOLDER_SVG}<b>Collections</b><small></small></button>
            <button type="button" data-hub="stats" title="Your stats">${STATS_SVG}<b>Stats</b><small>overview</small></button>`;
        hub.addEventListener('click', e => {
            const b = e.target.closest('[data-hub]');
            if (!b) return;
            if (b.dataset.hub === 'coll') openCollectionsWindow();
            else openStatsWindow();
        });
        anchor.before(hub);
        updateHubCounts();
    }

    // ---- Sidebar order (Beta 3.3): calmer, four groups ----
    //   Search card (Recent · Tags · 🔔)  →  Following  →  View  →
    //   [Collections | Stats] [Blacklist | Settings]  →  tips · version
    // The pieces are built elsewhere (each placed next to the Settings
    // button); this only moves the last four into one 2×2 block and puts
    // Following above View. Runs after everything is built.
    function arrangeSidebarTools() {
        const gear = document.querySelector('.s34-gear.s34-inline');
        if (!gear || document.querySelector('.s34-dock')) return;
        const dock = document.createElement('div');
        dock.className = 's34-dock';
        gear.before(dock);
        const hub = document.querySelector('.s34-hub');
        const bl = document.querySelector('.s34-blbtn');
        if (hub) dock.appendChild(hub);   // its two buttons become two tiles
        if (bl) dock.appendChild(bl);
        dock.appendChild(gear);
        const follow = document.querySelector('.s34-follow-box');
        const view = document.querySelector('.s34-quick');
        if (follow && view && follow.parentElement === view.parentElement) view.before(follow);
    }

    // Single post page: "📁 Collection" button under Download
    function addPostCollectButton() {
        if (!isPostView || document.querySelector('.s34-post-collect')) return;
        const slot = getPostSidebarSlot();
        const id = params.get('id');
        if (!slot || !id) return;
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 's34-post-collect';
        btn.innerHTML = FOLDER_SVG + '<span>Save to collection</span>';
        btn.addEventListener('click', () => {
            const img = document.querySelector('#image');
            openCollectMenu(btn, [{ id, thumb: img ? img.src : '' }]);
        });
        const dl = slot.querySelector('.s34-dl-btn');
        if (dl) dl.after(btn); else slot.prepend(btn);
    }

    // ---- Popup: the next post in advance ----
    // Since Beta 3.5 only the next one (not next AND previous), and gently:
    // its picture comes straight from the image server (guessed from the
    // thumbnail like the popup does - no rule34 page needed), its post page
    // (tags, info) only once you've stayed on a post for a moment - flipping
    // fast loads nothing extra. Fewer page loads = fewer Cloudflare checks.
    const preloadedPosts = new Set();
    const PRELOAD_DWELL_MS = 1500;

    function preloadPicture(img) {
        const urls = mediaCandidates(img, false);
        let i = 0;
        const pre = new Image();
        pre.decoding = 'async';
        pre.onerror = () => { if (++i < urls.length) pre.src = urls[i]; };
        if (urls.length) pre.src = urls[0];
    }

    function preloadThumb(thumb, stillThere) {
        const a = thumb && thumb.querySelector('a[href]');
        const img = thumb && thumb.querySelector('img');
        if (!a || !img || preloadedPosts.has(a.href)) return;
        preloadedPosts.add(a.href);
        if (!isVideoThumb(img)) preloadPicture(img);
        fetchPostDoc(a.href, 'preload', { wanted: stillThere }); // waits in line behind what you asked for
    }

    function preloadNeighbours(thumb) {
        if (!CONFIG.popupPreload) return;
        const list = visibleThumbs();
        const i = list.indexOf(thumb);
        if (i < 0 || !list[i + 1]) return;
        const stillThere = () => !!popupState && popupState.thumb === thumb;
        setTimeout(() => { if (stillThere()) preloadThumb(list[i + 1], () => !!popupState); }, PRELOAD_DWELL_MS);
    }

    // ---- Popup: click an image to see it at full size, drag to move ----
    function resetZoom(stage) {
        stage.classList.remove('s34-pv-zoomed', 's34-pv-dragging');
        stage.querySelectorAll('img.s34-pv-media').forEach(i => { i.style.width = ''; i.style.height = ''; });
    }

    function toggleZoom(img, e) {
        const stage = img.closest('.s34-pv-stage');
        if (!stage) return;
        if (stage.classList.contains('s34-pv-zoomed')) { resetZoom(stage); return; }
        const nw = img.naturalWidth, nh = img.naturalHeight;
        if (!nw || !nh) return;
        // Where in the picture was clicked (the picture sits inside the box)
        const r = img.getBoundingClientRect();
        const scale = Math.min(r.width / nw, r.height / nh);
        const dw = nw * scale, dh = nh * scale;
        const ox = r.left + (r.width - dw) / 2, oy = r.top + (r.height - dh) / 2;
        const fx = Math.min(Math.max((e.clientX - ox) / dw, 0), 1);
        const fy = Math.min(Math.max((e.clientY - oy) / dh, 0), 1);
        // Full size, or twice the fitted size for small pictures
        const W = nw > dw * 1.2 ? nw : dw * 2;
        const H = W * nh / nw;
        stage.classList.add('s34-pv-zoomed');
        img.style.width = W + 'px';
        img.style.height = H + 'px';
        stage.scrollLeft = fx * W - stage.clientWidth / 2;
        stage.scrollTop = fy * H - stage.clientHeight / 2;
    }

    function setupPopupZoom(overlay) {
        const stage = overlay.querySelector('.s34-pv-stage');
        let drag = null;
        stage.addEventListener('mousedown', e => {
            if (e.button !== 0) return;
            const img = e.target.closest('img.s34-pv-media:not(.s34-pv-placeholder)');
            if (!img) return;
            e.preventDefault(); // no "drag the picture away" ghost
            drag = { x: e.clientX, y: e.clientY, sl: stage.scrollLeft, st: stage.scrollTop, moved: false, img };
        });
        overlay.addEventListener('mousemove', e => {
            if (!drag) return;
            const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
            if (Math.abs(dx) + Math.abs(dy) > 5) drag.moved = true;
            if (drag.moved && stage.classList.contains('s34-pv-zoomed')) {
                stage.classList.add('s34-pv-dragging');
                stage.scrollLeft = drag.sl - dx;
                stage.scrollTop = drag.st - dy;
            }
        });
        const end = e => {
            if (!drag) return;
            const d = drag;
            drag = null;
            stage.classList.remove('s34-pv-dragging');
            if (!d.moved && e.type === 'mouseup') toggleZoom(d.img, e);
        };
        overlay.addEventListener('mouseup', end);
        overlay.addEventListener('mouseleave', end);
    }

    // ---- Quick tips: the most important keys & clicks at a glance ----
    // Shown once after installing (or updating to a version with new tips);
    // reopen it any time with the "?" in the popup or in the settings.
    const TIPS_KEY = 'steamy34_tips_seen';
    const TIPS_VERSION = 9; // raise this when the tips get new entries -> shown once more

    const MOUSE_MIDDLE = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="6" y="3" width="12" height="18" rx="6"/><path d="M12 3v6" /><rect x="10.6" y="5.5" width="2.8" height="4.5" rx="1.4" fill="currentColor" stroke="none"/></svg>';

    function openQuickTips() {
        if (document.querySelector('.s34-tips-overlay')) return;
        const key = keyLabel(CONFIG.downloadKey);
        const k = t => `<kbd>${t}</kbd>`;
        // A small example of a tag in the search box (crossed out = excluded)
        const pill = (t, ex) => `<span class="s34-tips-pill${ex ? ' s34-tips-pill-ex' : ''}">${t}<i>×</i></span>`;
        // Small "NEW" label for the latest additions
        const nu = '<span class="s34-tips-new">NEW</span>';
        const EYE = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>';
        const MOUSE = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="3" width="12" height="18" rx="6"/><path d="M12 3v6"/></svg>';
        const PHONE = PHONE_SVG.replace('width="22" height="22"', 'width="15" height="15"');
        const icon = id => ((SETTINGS_UI.find(s => s.id === id) || {}).icon || '');
        const SLIDERS = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/></svg>';

        // Same on computer and phone
        const searchGroup = ['Search box', icon('search'), [
            [`${k('Space')} or ${k('Enter')}`, `Turn what you typed into a tag bubble: ${pill('lara croft')}`],
            [`${k('Enter')} on an empty box`, 'Search'],
            [`Tap / click a tag bubble`, `Exclude it ${pill('lara croft', true)} – again to include it`],
            [`${k('×')} on a tag bubble`, 'Remove it from the search'],
            [`${k('Pin')} next to a filter`, 'Keep that filter (Score, Size, Sort, Type, Rating) for every new search'],
            [`${k('★ Tags')}`, 'Your favourite tags – one tap puts one in the search'],
            [`${k('Recent')}`, 'Run your earlier searches again']
        ]];
        const sidebarGroup = ['Sidebar', SLIDERS, [
            [`${k('White')} ${k('Dark')} ${k('OLED')}`, 'Colour mode – in Settings → Look (OLED is true black)'],
            [`${k('Hide viewed')} / ${k('Hide downloaded')}`, 'Only show posts you haven\'t seen / saved yet'],
            [`${k('Size')} slider`, 'Make the thumbnails bigger or smaller'],
            [`${k('⬇ Batch download')}`, 'Tick posts (or "Select all new"), then download them – a panel shows progress with Pause / Cancel – or add them to a collection'],
            [`${k('Collections')} · ${k('Stats')}`, 'Your own folders · your top artists, characters & series'],
            [`${k(BELL_SVG.replace('width="16" height="16"', 'width="13" height="13"') + ' Following')}`, `${nu}Everything you follow, each with a count of its new posts – click one for their newest posts in the Following window. The bell next to an artist in a post follows them`],
            [`${k('Blacklist')}`, 'See, sort and edit everything you blacklisted'],
            [`${k('⚙ Settings')}`, 'Every option, plus backup and what is stored on your device'],
            [`${k('Choose folder…')}`, `${nu}Settings → Downloads: save straight into any folder, e.g. Eagle's watch folder (computer)`]
        ]];

        const MODES = {
            computer: [
                ['Popup viewer', icon('viewing'), [
                    [`${k(MOUSE_MIDDLE + ' Middle click')}`, 'Close the post – anywhere in the popup'],
                    [`${k('Esc')}`, 'Close the post (or any Steamy34 window)'],
                    [CONFIG.browseKeys === 'wasd' ? `${k('A')} ${k('D')}` : CONFIG.browseKeys === 'both' ? `${k('←')} ${k('→')} / ${k('A')} ${k('D')}` : `${k('←')} ${k('→')}`,
                        `${nu}Previous / next post – arrow keys or WASD in Settings → Viewing posts`],
                    [`${k(key)}`, 'Download the original in maximum resolution'],
                    [`${k(keyLabel(CONFIG.favKey))} ${k(keyLabel(CONFIG.collectKey))} ${k(keyLabel(CONFIG.theaterKey))}`, 'Favourite · add to a collection · theater mode (keys changeable in Settings → Viewing posts)'],
                    [`${k(keyLabel(CONFIG.followKey))}`, `${nu}Follow (or unfollow) the post's artist`],
                    ...(CONFIG.browseKeys !== 'arrows' ? [[`${k('W')} ${k('S')}`, `${nu}Scroll to the comments and back`]] : []),
                    [`${k('Click')} the picture`, 'Full size – drag to move around, click again to fit'],
                    [`${k('▶ Auto next')}`, 'Slideshow – the slider sets the seconds per post; videos play to the end first'],
                    [`${k('Scroll')} down`, 'Read the comments below the picture'],
                    [`${k(THEATER_SVG + ' Theater')}`, 'Hide the sidebar – the picture uses the whole screen'],
                    [`${k(FOLDER_SVG + ' Collection')}`, 'Save the post in one of your own folders'],
                    [`${k('♥')} / ${k('▲')}`, 'Add to your favourites / vote up (needs a rule34 login)'],
                    [`${k('Ctrl')} + ${k('Click')} a thumbnail`, 'Open the full post page instead (new tab)']
                ]],
                ['Browsing', icon('posts'), [
                    [`${k(keyLabel(CONFIG.followingKey))}`, `${nu}The Following window: your artists' newest posts in a grid – ← / → switch artists, Esc closes`],
                    [`${k('Hover')} a thumbnail`, 'Videos play, images load in full quality, score & size show up'],
                    [`${k('+')} / ${k('⊘')} on a tag`, 'Add the tag to your search / blacklist it'],
                    [`${k('Shift')} + ${k('+')}`, 'Exclude the tag from your search (-tag)'],
                    [`${k('⬇')} / ${k(EYE)} in a corner`, 'You already downloaded / viewed this post'],
                    [`${k('X')}`, `${nu}Censored mode: blurs every picture and video (and comments) – safe for screenshots; X again to turn it off`],
                    [`"Quick check needed" at the bottom`, `${nu}Cloudflare wants a robot check – click "Solve"; nothing new loads until then`]
                ]],
                searchGroup, sidebarGroup
            ],
            phone: [
                ['Popup viewer', icon('viewing'), [
                    [`${k('Tap')} a thumbnail`, 'Open the post – picture on top, everything else below'],
                    [`${k('Swipe ←')} ${k('Swipe →')}`, `${nu}Next / previous post – swipe on the picture`],
                    [`${k('Swipe ↓')} on the picture`, `${nu}Close the post (when you're at the top)`],
                    [`${k('Back')} or ${k('✕')}`, `${nu}Close the post – your phone's Back button works too`],
                    [`${k('Scroll')} down`, 'Download, ♥, info, tags – and the comments at the very bottom'],
                    [`${k('Tap')} the picture`, 'Full size – move around with your finger, tap again to fit'],
                    [`${k('▶ Auto next')}`, 'Slideshow – the slider sets the seconds per post; videos play to the end first'],
                    [`${k('Long-press')} a thumbnail`, 'Your browser\'s menu – e.g. open the full post in a new tab']
                ]],
                ['Browsing', icon('posts'), [
                    [`${k(MENU_SVG.replace('width="20" height="20"', 'width="13" height="13"') + ' Menu')} top right`, `${nu}Steamy34's tools (switches, Settings, Blacklist, tips) and all of rule34's pages`],
                    [`${k('+')} / ${k('⊘')} on a tag`, `${nu}Add the tag to your search / blacklist it – always shown on phones`],
                    [`Following in the ${k('Menu')}`, `${nu}Your artists' newest posts in a full-screen grid – tap a circle to switch, Back closes`],
                    [`${k('♥')} on a thumbnail`, 'Add the post to your favourites (needs a rule34 login)'],
                    [`${k('⬇')} / ${k(EYE)} in a corner`, 'You already downloaded / viewed this post'],
                    [`"Quick check needed" at the bottom`, `${nu}Cloudflare wants a robot check – tap "Solve"`],
                    [`Hover previews`, 'Need a mouse – on a phone, just open the post']
                ]],
                searchGroup, sidebarGroup
            ]
        };
        let mode = isPhoneLayout() || onTouchDevice() ? 'phone' : 'computer';

        const overlay = document.createElement('div');
        overlay.className = 's34-overlay s34-tips-overlay';
        overlay.innerHTML = `
            <div class="s34-tips" role="dialog" aria-modal="true">
                <div class="s34-tips-head">
                    <img src="${logoData()}" alt="">
                    <div>
                        <div class="s34-tips-title">Quick tips</div>
                        <div class="s34-tips-sub">The handiest keys, clicks &amp; gestures in Steamy34</div>
                    </div>
                    <button type="button" class="s34-tips-close" title="Close (Esc)">✕</button>
                </div>
                <div class="s34-tips-modes" role="tablist">
                    <button type="button" data-mode="computer" role="tab">${MOUSE} Computer</button>
                    <button type="button" data-mode="phone" role="tab">${PHONE} Phone</button>
                </div>
                <div class="s34-tips-body"></div>
                <div class="s34-tips-foot">
                    <span>Open this again with <span class="s34-qmark">?</span> in the popup or under the ⚙ Settings button – on phones in the ☰ Menu.
                        <small class="s34-tips-hobby">Steamy34 is a free fan-made hobby project by steamycorner – never monetized.</small></span>
                    <button type="button" class="s34-tips-ok">Got it</button>
                </div>
            </div>`;

        const body = overlay.querySelector('.s34-tips-body');
        function render() {
            overlay.querySelectorAll('.s34-tips-modes button').forEach(b => {
                const on = b.dataset.mode === mode;
                b.classList.toggle('s34-on', on);
                b.setAttribute('aria-selected', on ? 'true' : 'false');
            });
            body.innerHTML = MODES[mode].map(([title, ic, rows]) => `
                <section class="s34-tips-group">
                    <div class="s34-tips-label">${ic}<span>${title}</span></div>
                    <div class="s34-tips-card">
                        ${rows.map(([keys, what]) => `
                            <div class="s34-tips-row">
                                <div class="s34-tips-keys">${keys}</div>
                                <div class="s34-tips-what">${what}</div>
                            </div>`).join('')}
                    </div>
                </section>`).join('');
            body.scrollTop = 0;
        }
        overlay.querySelectorAll('.s34-tips-modes button').forEach(b =>
            b.addEventListener('click', () => { mode = b.dataset.mode; render(); }));
        render();

        function close() {
            GM_setValue(TIPS_KEY, TIPS_VERSION);
            document.removeEventListener('keydown', onKey, true);
            overlay.remove();
        }
        function onKey(e) {
            if (e.key === 'Escape' || e.key === 'Enter') {
                e.preventDefault();
                e.stopPropagation();
                close();
            }
        }
        overlay.querySelector('.s34-tips-close').addEventListener('click', close);
        overlay.querySelector('.s34-tips-ok').addEventListener('click', close);
        overlay.addEventListener('mousedown', e => { if (e.target === overlay) close(); });
        document.addEventListener('keydown', onKey, true);
        document.body.appendChild(overlay);
        overlay.querySelector('.s34-tips-ok').focus({ preventScroll: true });
    }

    // Small "? Shortcuts & tips" link right under the Steamy34 Settings button
    // (posts page and single posts)
    function addTipsLink() {
        if (document.querySelector('.s34-tipslink')) return;
        const gear = document.querySelector('.s34-gear.s34-inline');
        if (!gear) return;
        // "? Shortcuts & tips · ✨ What's new"
        const row = document.createElement('div');
        row.className = 's34-tipslink';
        const link = document.createElement('button');
        link.type = 'button';
        link.innerHTML = '<span class="s34-qmark">?</span> Shortcuts &amp; tips';
        link.title = 'The most important keys & clicks';
        link.addEventListener('click', openQuickTips);
        const news = document.createElement('button');
        news.type = 'button';
        news.innerHTML = SPARKLE_SVG + ' What\'s new';
        news.title = 'Changelog – what changed in each version';
        news.addEventListener('click', () => openChangelog(null));
        row.append(link, news);
        gear.after(row);
        // Logo + installed version, small and quiet under the links
        const brand = document.createElement('div');
        brand.className = 's34-brand';
        brand.title = 'Steamy34 ' + CURRENT_VERSION;
        brand.innerHTML = `<img src="${logoData()}" alt=""><span>Steamy34</span><small class="s34-brand-ver"></small>`;
        brand.querySelector('small').textContent = CURRENT_VERSION;
        row.after(brand);
    }

    // ---- Changelog ("What's new") ----
    // Newest first. notify: true = a notable update - the window opens once
    // after it. Small fixes (notify: false) are only listed, quietly.
    // ADDING A VERSION: put it on top here and update @version + the
    // console line at the end of the file.
    const CHANGELOG = [
        { v: 'Beta 3.6.3', date: '2026-11-21', items: [
            'The Cloudflare check can\'t be missed any more: a big notice at the bottom of the screen that keeps pulsing until it\'s solved. The ? on it explains why it matters – without the check, rule34 loads nothing new.',
            'Bigger thumbnails on phones: they have their own size now (about two posts to a row). The Size slider in the ☰ Menu changes it.',
            'Phone menu: tapping an artist under Following now closes the menu and opens the Following window.'
        ] },
        { v: 'Beta 3.6.1', date: '2026-11-21', items: [
            'The little tip bubbles are gone – the welcome tour and the quick tips (?) still explain everything when you want them.'
        ] },
        { v: 'Beta 3.6', date: '2026-11-21', notify: true, items: [
            'New Following window: everything you follow in one window on top of the page you\'re on. Your artists sit in a row of circles at the top (a coloured ring = new posts), their newest posts in a grid below, with NEW on the ones since your last visit.',
            'Click a post and it opens in the popup as usual – ← / → go through that artist\'s posts and load more at the end. Close it and you\'re back in the grid; close the window and you\'re back on your page.',
            'Open it with the sidebar\'s Following box or the G key (changeable in Settings → Following). ← / → switch between artists, Esc closes. "Bigger" in its bottom right corner makes it nearly as big as the screen. On phones it fills the screen and Back closes it.',
            'New start page: rule34\'s start page becomes a small home. Your search, "Continue" where you left off, your recent searches and favourite tags on the left (the post count as plain text), the newest posts from who you follow on the right – click a circle to see just that artist. New to Steamy34? It shows three first steps instead. Settings → Look & feel brings back the site\'s own.',
            'Collections: a post opens in the popup viewer on top of the collection – ← / → go through the collection, Esc brings you back. (Ctrl + click still opens the post page in a new tab.)',
            'Video previews on hover no longer turn the thumbnail dark: they start a little into the clip and only appear once the first picture is there.',
            'Settings has a Discord button – ideas, bugs and news in the steamycorner Discord.',
            'Following is for artists only now – "All artists" means exactly that. Searches you followed moved into your Recent searches, so none is lost.',
            'Followed artists are always newest first now: the score and type filters per artist are gone. "Open as a search" in the window takes you to the normal search, with every filter and sort.',
            'Sidebar: Recent and Tags open as small menus right next to the sidebar, instead of long lists inside it – on phones as a sheet that slides up from the bottom (swipe it down, tap the page or press Back to close). And when the sidebar is taller than the window, it scrolls on its own with the mouse wheel – Settings and the tips below it are always in reach.',
            'With an ad blocker on, the empty ad space above "Page 1" folds away too, like the right column. Without an ad blocker every ad stays exactly as rule34 shows it.'
        ] },
        { v: 'Beta 3.5.1', date: '2026-11-21', items: [
            'The popup no longer stops at the last loaded post: → loads the next page and goes on (it already starts loading 3 posts before the end).',
            'Popup comments: the count shows all of them (rule34 sends 10 at a time), and "More comments" loads the rest right in the popup.',
            'Popup: the site\'s own "< previous · Tag search · next >" bar no longer shows up as if it were a note about the post.',
            'Sidebar: "Shortcuts & tips" and "What\'s new" no longer stick out of the site\'s narrow sidebar.'
        ] },
        { v: 'Beta 3.5', date: '2026-11-21', notify: true, items: [
            'Far fewer Cloudflare checks: everything Steamy34 loads from rule34 now waits in one line and is spaced out – what you asked for (the popup, scrolling) goes first, the extras after it. After a check, it all runs slower for a while.',
            'Fewer page loads: the popup loads only the next post in advance (its picture straight from the image server), the size on hover waits a full second, and the Following check waits until you stop clicking around.',
            'When a check does come, it no longer covers the top of the page: a small glowing "Quick check needed" sits in the corner, and "Solve check" shows up right where something stopped – at the end of the list or in the popup\'s tags.',
            '"Copy info for a bug report" now says what set off the last check, so we can find out what causes them.'
        ] },
        { v: 'Beta 3.4.2', date: '2026-11-21', items: [
            'On a followed artist\'s page (and "All artists"), the search box now stays on that page: a filter like Size 1440p+ or an extra tag only narrows that artist\'s posts instead of starting a new search over everything. "✕ Remove filters" in the bar at the top brings the full page back, and "Search all posts instead" in the sidebar searches everything.'
        ] },
        { v: 'Beta 3.4.1', date: '2026-11-20', items: [
            'New license: CC BY-NC-SA 4.0 – Steamy34 stays free to share and change, with credit to steamycorner, never commercially, and changed versions under the same license.'
        ] },
        { v: 'Beta 3.4', date: '2026-11-20', notify: true, items: [
            'Continue where you left off: back on a search you had scrolled deep into, a small message offers "Continue at page N".',
            'The browser tab shows "(12) rule34" (and a dot on its icon) while the artists and searches you follow have new posts.',
            'L in the popup follows (or unfollows) the post\'s artist – with several artists, a small menu lets you pick with 1, 2, 3… Each followed artist can now have its own filter (Following → Manage), e.g. "Everything" for one and "Score ≥ 100" for another.',
            'Screenshot mode is now "Censored mode" (still X) – and it blurs comment texts and names too, so screenshots are safe to share.',
            'Settings → Help → "Copy info for a bug report": shows what would be shared, then copies it for #feedback on Discord. Video previews wait a moment longer before loading, and the settings are tidier (new "Following" section).'
        ] },
        { v: 'Beta 3.3.5', date: '2026-11-20', items: [
            'With an ad blocker on, the ad column on the right is now always folded away – also when an ad slipped through your blocker (that happened mostly on the first visit). Without an ad blocker nothing changes.'
        ] },
        { v: 'Beta 3.3.4', date: '2026-11-20', items: [
            'Steamy34 has its own channels on steamycorner\'s Discord: #feedback and #new-ideas – the link is in Settings → Help and in the welcome tour.'
        ] },
        { v: 'Beta 3.3.3', date: '2026-11-20', items: [
            'Steamy34 now has its own page on Sleazy Fork – the script\'s homepage and feedback links (Tampermonkey dashboard) point there.'
        ] },
        { v: 'Beta 3.3.2', date: '2026-11-20', items: [
            'Phones: with "Only on hover", the tags and ♥ on thumbnails are now always shown – there\'s no hovering on a touch screen.',
            '"pinned" / "paused" now sits right next to the pin icon of a filter.',
            'Followed searches read nicer: "height:>=1080 width:>=1080" shows as "1080p+", and the bar on top is tidier on phones.'
        ] },
        { v: 'Beta 3.3.1', date: '2026-11-20', items: [
            'The bar on top of an artist\'s (or a followed search\'s) page is calmer: one line, with "Following" and "Manage" side by side on the right.',
            'Sidebar labels are no longer cut off ("Collec…", "Rec…") – in rule34\'s narrow sidebar the four tools show their icon above the name.'
        ] },
        { v: 'Beta 3.3', date: '2026-11-20', notify: true, items: [
            'A calmer sidebar: four clear groups instead of nine boxes. Under the search box: Recent, ★ Tags (your favourite tags) and the bell to follow the search – one list opens at a time. Then Following, then "View" (switches, size, batch download), then Collections, Stats, Blacklist and Settings in one small block.',
            'The White / Dark / OLED picker moved to Settings → Look – you usually set it once.'
        ] },
        { v: 'Beta 3.2', date: '2026-11-20', notify: true, items: [
            'New: screenshot mode. Press X (or the "Blur pictures" switch in the sidebar) and every picture and video is blurred – thumbnails, the popup, post pages – so you can share a screenshot safely. X again shows everything; downloads are never affected.',
            'On the pages of your followed artists and searches, a short note now explains why your pinned filters show "Any": they are paused there so you see everything new. Your pins stay as they are for every other search.'
        ] },
        { v: 'Beta 3.1.1', date: '2026-11-20', items: [
            'Fairer to rule34.xxx: your ad blocker always acts first. Steamy34 no longer hides the right-hand ad column early – only once the page has loaded and the column stayed empty, and it comes back the moment anything loads in it. Ad spaces in the sidebar are never tidied away.'
        ] },
        { v: 'Beta 3.1', date: '2026-11-20', notify: true, items: [
            'Saved searches and followed artists are now one thing: "Following" in the sidebar. The bell under the search box follows any search (e.g. a character with a score filter) – it gets its own "N new" count and NEW on its new posts, just like an artist.',
            'Your saved searches moved over automatically, with their counts. "Recent & saved" is now simply "Recent".'
        ] },
        { v: 'Beta 3.0.2', date: '2026-11-20', items: [
            'Your viewed and downloaded posts are even safer: if the storage ever hiccups while reading them, Steamy34 no longer saves over your history.',
            'Followed artists → Manage: "Mark everything as seen" is now "Clear new counts", and only shows up when there is something new.'
        ] },
        { v: 'Beta 3.0.1', date: '2026-11-20', items: [
            'A cleaner Blacklist button in the sidebar: a slim line icon like the Settings button, with the number of tags small next to it.'
        ] },
        { v: 'Beta 3.0', date: '2026-11-20', notify: true, items: [
            'New: follow artists. Click the bell 🔔 next to an artist in a post (popup or post page). The sidebar lists your followed artists, each with a count of their new posts – click one to see their posts, with NEW on the ones since your last visit.',
            '"All artists" at the top mixes everyone. New posts are counted quietly in the background (at most every 20 minutes); "Manage" adds artists by name and has a filter (score, type, rating).',
            'White mode: clearer colours in the popup (the + / ⊘ on tags, the score, the "child posts" note and the line under Download).'
        ] },
        { v: 'Beta 2.5', date: '2026-11-20', notify: true, items: [
            'Calmer by default: clean thumbnails (tags and ♥ appear while you hover) and square corners. Prefer the old look? Settings → Look → "Tags & buttons on thumbnails" and "Rounded corners".',
            'A shorter welcome tour: the essentials in four slides – "Show me more" for the rest.',
            'Little tips at the right moment: a small bubble the first time you open a post, search, pick a filter or download. Each one only once – "No more tips" switches them off.'
        ] },
        { v: 'Beta 2.4', date: '2026-11-20', items: [
            'Behind the scenes: Steamy34 is now built from 36 tidy parts instead of one giant file – easier to fix and safer to change. Old leftover styles were removed. Nothing changes for you.',
            'Clearer hints for the file name settings.'
        ] },
        { v: 'Beta 2.3', date: '2026-11-20', notify: true, items: [
            'A tidier sidebar: a slim "⚙ Settings" button, and Steamy34\'s logo with the installed version in a small line below it.'
        ] },
        { v: 'Beta 2.2.5', date: '2026-11-19', items: [
            '♥, viewed and downloaded icons on the thumbnails are all the same size now.',
            'With "Only on hover", the VID / GIF labels always stay visible too.',
            'The score pill while hovering is shorter again – just score and size.',
            'With "Only on hover", the viewed / downloaded marks and favourited hearts now always stay visible.',
            'The labels on video / GIF thumbnails now say VID / GIF (switch them off in Settings → Look). While you hover, the score pill takes their place instead of covering them.'
        ] },
        { v: 'Beta 2.2', date: '2026-11-19', notify: true, items: [
            'Not a fan of round corners? Settings → Look → "Rounded corners" off makes everything square – thumbnails, sidebar, tag bubbles, buttons and windows.',
            'The welcome tour has a new Thumbnails slide where you can try the three thumbnail styles and the corners. Watch it again any time with the ✨ Welcome tour button at the bottom of Settings.'
        ] },
        { v: 'Beta 2.1', date: '2026-11-19', notify: true, items: [
            'Clean thumbnails: Settings → Look → "Tags & buttons on thumbnails" puts the tags, labels, ♥ and marks in a strip below the picture, or shows them only while you hover.',
            'Favourited hearts are a soft red now.'
        ] },
        { v: 'Beta 2.0.2', date: '2026-11-19', items: [
            'The "Steamy34 Settings" button shows which version is running.',
            'Tidier sidebar: no stray bullet left by the AI filter switch, no leftover "(Supports wildcard *)" note.',
            'Videos always get their ▶ VIDEO label, even when a post is missing the "video" tag.'
        ] },
        { v: 'Beta 2.0',date: '2026-11-19', notify: true, items: [
            'Welcome to Beta 2.0! 🎉 New: a welcome tour that shows the best of Steamy34 in under a minute – popup viewer, search, downloads, organising and your colour mode. It opens by itself the first time you use Steamy34; you can take it any time with the "Welcome tour" button below or in Settings → Help.',
            'Beta 2.0 is a calm, steady version – time to enjoy it for a while. Found something odd? Tell steamycorner (Settings → Help).'
        ] },
        { v: 'Beta 1.9', date: '2026-11-19', notify: true, items: [
            'Search the settings: type a word ("folder", "keys", "backup" …) at the top of Settings and jump straight to the option.',
            'More popup keys: F favourite, C add to a collection, T theater mode – each changeable in Settings → Viewing posts. With WASD, W / S scroll to the comments and back.',
            'Batch and collection downloads show a small panel with progress ("12 / 40") and Pause / Resume / Cancel.'
        ] },
        { v: 'Beta 1.8', date: '2026-11-19', items: [
            'Phones: the search box has a Search button again (the site\'s phone layout has none).'
        ] },
        { v: 'Beta 1.7', date: '2026-11-19', notify: true, items: [
            'Tidier file names: costume and fan versions ("lifeguard pharah" next to "pharah"), repeats like "lara croft (survivor)", company names ("blizzard entertainment") and overlapping series ("call of duty warzone" next to "call of duty") are left out.',
            'File names end with the post number, e.g. "[tracer] [overwatch] [someartist] #1234567.jpg" – so you can always find the post again. Switch it off under Settings → Downloads → "Add the post number to file names".'
        ] },
        { v: 'Beta 1.6', date: '2026-11-19', notify: true, items: [
            'Own download folder: Settings → Downloads → "Choose folder…" – pick any folder (e.g. Eagle\'s watch folder) and downloads are written straight into it, with their names. Works in Chrome, Edge and Brave on computers (Brave: turn on brave://flags/#file-system-access-api first). The browser asks once per session whether Steamy34 may write there.',
            'The download folder attempt of Beta 1.4 / 1.5 (via Tampermonkey\'s downloader) is gone – it lost the file names.'
        ] },
        { v: 'Beta 1.4', date: '2026-11-19', notify: true, items: [
            'Browse posts with WASD: Settings → Viewing posts → "Keys for previous / next post" – arrow keys, A / D, or both.'
        ] },
        { v: 'Beta 1.3', date: '2026-11-19', notify: true, items: [
            'New file names: [character] [series] [artist] – e.g. "[judy alvarez, panam palmer] [cyberpunk 2077] [someartist].jpg". Readable, with spaces, and ready for Eagle.',
            'Prefer the old names? Settings → Downloads → File names → Character_Series_Artist_Resolution.'
        ] },
        { v: 'Beta 1.2', date: '2026-11-18', items: [
            'The Android guide shows how to install Steamy34 on the phone: Tampermonkey dashboard → Utilities → Import from file.'
        ] },
        { v: 'Beta 1.0', date: '2026-11-18', notify: true, items: [
            'Steamy34 is now in beta! Everything before this was the alpha – thanks for testing. From here on it\'s about polish and fixes.',
            'Settings texts always wrap instead of running past the switches.',
            'Tidier under the hood: leftovers removed and styles sorted. Fixed: with "Modern thumbnail layout" switched off, the popup and messages lost their look.',
            'Backups now also include your votes, the auto-next timer and theater mode, and Settings → Privacy & data lists every stored item.'
        ] },
        { v: 'Alpha 15.5', date: '2026-11-18', notify: true, items: [
            'New file names: Character_Copyright_Artist_Resolution – e.g. "amelie_lacroix_overwatch_someartist_1920x1080.jpg". Works for single downloads, the popup, batch downloads and collections.',
            'White mode: messages at the bottom and the phone ☰ Menu button are light now too.'
        ] },
        { v: 'Alpha 15.4', date: '2026-11-18', notify: true, items: [
            'Steamy34 on your phone: the popup shows the picture on top – swipe left / right to browse, swipe down or press Back to close.',
            'One ☰ Menu on phones with Steamy34\'s tools (switches, Collections · Stats, Blacklist, Settings, tips) and all of rule34\'s pages, in your colour mode.',
            'Touch-friendly: tag buttons and ♥ are always visible, no hover previews, the sidebar doesn\'t stick, "Recent & saved" starts folded and the next post isn\'t preloaded (saves mobile data).',
            'Redesigned quick tips with a Computer / Phone switch.',
            'Downloads give up after a while and offer Retry instead of hanging; long file names wrap in messages.',
            'Popup buttons, Settings, Blacklist and Download work with the keyboard (Tab, Enter).',
            'Steamy34 is a free fan-made hobby project – it will never be monetized (Settings → Help → About).'
        ] },
        { v: 'Alpha 14.3', date: '2026-11-18', items: [
            'A step-by-step guide for Android (Settings → Help → "On your phone").',
            'With an ad blocker on, the empty ad column on the right is gone – the posts use the full width. Without one, nothing changes.'
        ] },
        { v: 'Alpha 13.9', date: '2026-11-18', items: [
            'Icons are drawn instead of emoji, so they never show up as empty boxes.',
            'Messages stack (up to 3), so an "Undo" no longer disappears too early.',
            'The same search in a different order is only listed once under Recent.',
            '"Hide viewed / downloaded" keeps infinite scroll loading; Esc while setting the download key only cancels that.',
            'The Cloudflare check window is bigger, so the tick box is in view; the popup no longer shows the site\'s unclickable "image has been resized" notice.',
            'Ready for publishing: own namespace and a CC0 license – free to change and share.'
        ] },
        { v: 'Alpha 12.9', date: '2026-11-18', notify: true, items: [
            'Colour modes: White, Dark and OLED (true black) – in the sidebar or Settings → Look.',
            'Cleaner settings: sections on the left, switches, technical options under "Show advanced".',
            'Collections (your own folders), theater mode in the popup, a rating filter and your stats.',
            'This "What\'s new" window – it only shows up after notable updates.',
            'A calm Cloudflare notice, the site\'s AI filter as a matching switch, and no page jump when closing a post.'
        ] },
        { v: 'Alpha 11.5', date: '2026-11-18', notify: true, items: [
            'Posts always open in the popup – scroll down for the comments.',
            '"▶ Auto next" slideshow with a timer; pinned search filters that stay for every new search.',
            'Quick tips window with the most important keys and clicks.'
        ] },
        { v: 'Alpha 10.4', date: '2026-11-17', items: [
            'Blacklist window: tag types are looked up automatically, or set them yourself.',
            'Loading circles on ♥ and ▲, and much faster long pages.'
        ] },
        { v: 'Alpha 9.7', date: '2026-11-17', items: [
            'Batch download, hide viewed / downloaded, size slider, "+N new" for saved searches, favourite tags, popup zoom, preload, video options and favourites.',
            'Blacklist window with recent tags and sorting, "Privacy & data" in the settings, backup & restore, and a question before downloading a post again.'
        ] }
    ];
    const CURRENT_VERSION = CHANGELOG[0].v;
    const CHANGELOG_SEEN_KEY = 'steamy34_changelog_seen';
    const SPARKLE_SVG = '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2l1.9 5.6L19.5 9.5l-5.6 1.9L12 17l-1.9-5.6L4.5 9.5l5.6-1.9z"/><path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z" opacity=".7"/></svg>';

    // Versions are "Alpha 15.5", "Beta 1.0", … - every Beta comes after every
    // Alpha (a plain number, as stored by older versions, counts as Alpha)
    const VERSION_STAGES = ['alpha', 'beta', 'release'];
    function parseVersion(v) {
        const m = String(v || '0').trim().match(/^(alpha|beta|release)?\s*v?([\d.]+)/i) || [];
        const stage = VERSION_STAGES.indexOf((m[1] || 'alpha').toLowerCase());
        return [stage].concat(String(m[2] || '0').split('.').map(n => parseInt(n, 10) || 0));
    }
    function compareVersions(a, b) {
        const pa = parseVersion(a), pb = parseVersion(b);
        for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
            const d = (pa[i] || 0) - (pb[i] || 0);
            if (d) return d;
        }
        return 0;
    }

    function openChangelog(sinceVersion) {
        if (document.querySelector('.s34-cl-overlay')) return;
        const w = openWindow({ cls: 's34-cl-overlay', icon: SPARKLE_SVG, title: 'What\'s new in Steamy34', width: 600 });
        w.setSub(CURRENT_VERSION);
        const list = document.createElement('div');
        list.className = 's34-cl-list';
        // What's new for you plus the latest few; older ones folded away
        const older = document.createElement('div');
        older.className = 's34-cl-list';
        older.hidden = true;
        const recentCount = Math.max(3, CHANGELOG.filter(e => sinceVersion && compareVersions(e.v, sinceVersion) > 0).length);
        CHANGELOG.forEach((entry, idx) => {
            const isNew = sinceVersion && compareVersions(entry.v, sinceVersion) > 0;
            const block = document.createElement('div');
            block.className = 's34-cl-entry' + (isNew ? ' s34-cl-new' : '');
            const head = document.createElement('div');
            head.className = 's34-cl-head';
            head.innerHTML = `<b></b><span></span>${isNew ? '<em>NEW</em>' : ''}`;
            head.querySelector('b').textContent = entry.v;
            head.querySelector('span').textContent = new Date(entry.date + 'T12:00:00').toLocaleDateString();
            const ul = document.createElement('ul');
            entry.items.forEach(t => {
                const li = document.createElement('li');
                li.textContent = t;
                ul.appendChild(li);
            });
            block.append(head, ul);
            (idx < recentCount ? list : older).appendChild(block);
        });
        const foot = document.createElement('div');
        foot.className = 's34-cl-foot';
        foot.innerHTML = '<button type="button" class="s34-cl-tips"><span class="s34-qmark">?</span> Quick tips</button><button type="button" class="s34-cl-tips s34-cl-tour">✨ Welcome tour</button><button type="button" class="s34-cl-ok">Got it</button>';
        foot.querySelector('.s34-cl-ok').addEventListener('click', () => w.close());
        foot.querySelector('.s34-cl-tips').addEventListener('click', () => { w.close(); openQuickTips(); });
        foot.querySelector('.s34-cl-tour').addEventListener('click', () => { w.close(); openWelcome(0); });
        w.body.append(list);
        if (older.childElementCount) {
            const more = document.createElement('button');
            more.type = 'button';
            more.className = 's34-win-more s34-cl-more';
            more.textContent = `▸ Earlier versions (${older.childElementCount})`;
            more.addEventListener('click', () => {
                older.hidden = !older.hidden;
                more.textContent = (older.hidden ? '▸' : '▾') + ` Earlier versions (${older.childElementCount})`;
            });
            w.body.append(more, older);
        }
        w.body.append(foot);
        w.onClose = () => GM_setValue(CHANGELOG_SEEN_KEY, CURRENT_VERSION);
        foot.querySelector('.s34-cl-ok').focus({ preventScroll: true }); // start at the newest version
        w.body.scrollTop = 0;
    }

    // ---- Announcement: "Steamy34 on your phone" + Android guide ----
    // Shown once to people using Steamy34 on a computer; reopen it from
    // Settings → Help. Raise MOBILE_ANNOUNCE_VERSION to show it once more.
    const MOBILE_ANNOUNCE_KEY = 'steamy34_mobile_seen';
    const MOBILE_ANNOUNCE_VERSION = 1;
    const PHONE_SVG = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M10.5 18.5h3"/></svg>';
    // Phone with the Steamy34 cup on its screen
    const PHONE_ART = '<svg class="s34-mob-phone" viewBox="0 0 80 140" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="74" height="134" rx="14" fill="#16151c" stroke="#fff" stroke-opacity=".85" stroke-width="3"/><rect x="9" y="14" width="62" height="108" rx="6" fill="#1f1d27"/><rect x="31" y="7" width="18" height="3" rx="1.5" fill="#fff" opacity=".5"/><g transform="translate(22 46) scale(.56)"><rect width="64" height="64" rx="15" fill="#ff5f8f"/><g fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round"><path d="M22 26c-3.2-3 3.2-5.6 0-8.6s3.2-5.6 0-8.4"/><path d="M31 26c-3.2-3 3.2-5.6 0-8.6s3.2-5.6 0-8.4"/><path d="M40 26c-3.2-3 3.2-5.6 0-8.6s3.2-5.6 0-8.4"/></g><path d="M14 31h34v7a13 13 0 0 1-13 13h-8a13 13 0 0 1-13-13z" fill="#fff"/><path d="M47.5 34.5h2.5a5.5 5.5 0 0 1 0 11h-4" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round"/></g><rect x="17" y="94" width="46" height="5" rx="2.5" fill="#fff" opacity=".22"/><rect x="23" y="104" width="34" height="5" rx="2.5" fill="#fff" opacity=".14"/><rect x="32" y="128" width="16" height="3" rx="1.5" fill="#fff" opacity=".5"/></svg>';

    const onTouchDevice = () => {
        try { return matchMedia('(pointer: coarse)').matches && !matchMedia('(any-pointer: fine)').matches; } catch (e) { return false; }
    };

    function openMobileGuide() {
        if (document.querySelector('.s34-mob-overlay')) return;
        const w = openWindow({ cls: 's34-mob-overlay', icon: PHONE_SVG, title: 'Steamy34 on Android', width: 600 });
        w.setSub('Take your setup with you – step by step');
        w.body.innerHTML = `
            <div class="s34-mob-hero">
                ${PHONE_ART}
                <div class="s34-mob-hero-text">
                    <span class="s34-mob-badge">New · Beta</span>
                    <h3>Steamy34, now in your pocket</h3>
                    <p>Popup viewer, smart search, collections and tag-named downloads – on your Android phone too.
                       Setup takes about two minutes.</p>
                </div>
            </div>
            <div class="s34-mob-steps">
                <div class="s34-mob-step"><div>
                    <b>Get Firefox</b>
                    <span>Install <em>Firefox</em> from the Play Store. (Chrome on Android can't run add-ons, so it won't work there.)</span>
                </div></div>
                <div class="s34-mob-step"><div>
                    <b>Add Tampermonkey</b>
                    <span>In Firefox tap <em>⋮</em> → <em>Extensions</em> (or <em>Add-ons</em>) → find <em>Tampermonkey</em>
                          → <em>Add</em>. Violentmonkey works too.</span>
                </div></div>
                <div class="s34-mob-step"><div>
                    <b>Install Steamy34</b>
                    <span>Put the Steamy34 file (<em>Steamy34_….user.js</em>) on your phone – e.g. send it to yourself
                          and download it. Then open the <em>Tampermonkey dashboard</em> → <em>Utilities</em> tab →
                          <em>Import from file</em> → <em>Browse…</em>, pick the file and confirm the install.</span>
                </div></div>
                <div class="s34-mob-step s34-mob-optional"><div>
                    <b>Bring your stuff along <span class="s34-mob-opt">optional</span></b>
                    <span>Here on the computer: <em>Export backup</em> (button below). Send the file to your phone
                          (e.g. e-mail it to yourself). On the phone: <em>☰ Menu</em> → <em>⚙ Settings</em> → <em>Privacy &amp; data</em>
                          → <em>Import backup</em>. Searches, favourite tags, collections and marks come along.</span>
                </div></div>
                <div class="s34-mob-step"><div>
                    <b>Open rule34.xxx in Firefox</b>
                    <span>That's it – Steamy34 starts by itself.</span>
                </div></div>
            </div>
            <div class="s34-mob-note">
                <b>Good to know – Steamy34 is in beta.</b> It was made for mouse and keyboard first, so on a phone:
                <ul>
                    <li>Tap a post to open it – swipe left / right on the picture to browse, swipe down or press <b>Back</b> to close.</li>
                    <li>Steamy34's switches, Settings, Blacklist and the quick tips (with a <b>Phone</b> tab for all gestures) are in the <b>☰ Menu</b> at the top right.</li>
                    <li>Hover previews need a mouse, so they're off on phones.</li>
                    <li>Something awkward or broken? Tell steamycorner in #feedback on the <a href="${DISCORD_URL}" target="_blank" rel="noopener noreferrer">Discord</a> – it helps make the touch version better.</li>
                </ul>
            </div>
            <div class="s34-mob-foot">
                <button type="button" class="s34-mob-backup">⬇ Export backup</button>
                <button type="button" class="s34-mob-ok">Got it</button>
            </div>`;
        w.body.querySelector('.s34-mob-backup').addEventListener('click', exportBackup);
        w.body.querySelector('.s34-mob-ok').addEventListener('click', () => w.close());
        w.onClose = () => GM_setValue(MOBILE_ANNOUNCE_KEY, MOBILE_ANNOUNCE_VERSION);
        w.body.querySelector('.s34-mob-ok').focus({ preventScroll: true });
        w.body.scrollTop = 0;
    }

    // ---- Welcome tour: the best bits, slide by slide ----
    // Opens by itself on the very first start (instead of the quick tips);
    // later from Settings → Help → Welcome tour or the "What's new" window.
    // Picking a colour mode reloads the page - the tour then comes back on
    // the same slide (TOUR_RESUME_KEY in sessionStorage).
    const WELCOME_KEY = 'steamy34_welcome_seen';
    const TOUR_RESUME_KEY = 's34_tour_resume';

    // Small drawings for the tour's thumbnail pickers (fixed colours, so they
    // look the same in every colour mode)
    function thumbStyleArt(style) {
        const pic = (h, r) => `<rect x="1" y="1" width="62" height="${h}" rx="${r}" fill="#7b8fb8"/><circle cx="20" cy="14" r="5" fill="#c7d3ee"/><path d="M1 ${h - 6} L22 ${h - 22} L36 ${h - 10} L46 ${h - 18} L63 ${h - 4} V${h - 1 + 2} H1 Z" fill="#5a6d96"/>`;
        const chips = y => `<rect x="5" y="${y}" width="17" height="6" rx="3" fill="#ff8a80"/><rect x="24" y="${y}" width="14" height="6" rx="3" fill="#7ee07e"/><circle cx="56" cy="${y + 3}" r="3.5" fill="#ff6b7a"/>`;
        let body;
        if (style === 'below') body = pic(30, 4) + `<rect x="1" y="33" width="62" height="10" rx="2" fill="#2a2a31"/>` + chips(35);
        else if (style === 'hover') body = pic(42, 4) + `<path d="M44 20 l0 13 l3.2-3 l2.4 5 l2.2-1 l-2.4-5 l4.4-.2 z" fill="#fff" stroke="#222" stroke-width="1"/>`;
        else body = pic(42, 4) + `<rect x="1" y="30" width="62" height="13" fill="rgba(0,0,0,0.35)"/>` + chips(34);
        return `<svg viewBox="0 0 64 44" width="64" height="44" aria-hidden="true">${body}</svg>`;
    }
    function cornerArt(round) {
        const r = round ? 7 : 0;
        return `<svg viewBox="0 0 64 44" width="64" height="44" aria-hidden="true"><rect x="2" y="2" width="28" height="40" rx="${r}" fill="#7b8fb8"/><rect x="34" y="2" width="28" height="18" rx="${r}" fill="#5a6d96"/><rect x="34" y="24" width="28" height="18" rx="${r}" fill="#9aa9c9"/></svg>`;
    }

    function welcomeSlides() {
        const phone = isPhoneLayout();
        const k = t => `<kbd>${t}</kbd>`;
        const dl = keyLabel(CONFIG.downloadKey);
        const prevNext = CONFIG.browseKeys === 'wasd' ? `${k('A')} ${k('D')}` : CONFIG.browseKeys === 'both' ? `${k('←')} ${k('→')} or ${k('A')} ${k('D')}` : `${k('←')} ${k('→')}`;
        const ic = id => (SETTINGS_UI.find(s => s.id === id) || {}).icon || '';
        return [
            {
                art: `<img src="${logoData()}" alt="">`, step: 'Welcome',
                title: 'Hi! This is Steamy34',
                text: 'rule34.xxx, upgraded – a cleaner look, a popup viewer, a much easier search and tidy downloads. Here are the best bits in under a minute.',
                promise: ['🎁 Free, always', '🚫 No ads, no tracking', '🔒 Everything stays on your device', '💜 A fan-made hobby project'],
                note: 'Steamy34 isn\'t made by or connected to rule34.xxx.'
            },
            {
                art: ic('viewing'), step: '1 · Popup viewer',
                title: 'Posts open right here',
                text: (phone ? 'Tap' : 'Click') + ' a post and it opens in a big viewer on top of the list – no new tabs, and you never lose your place.',
                cards: [
                    ['↔', 'Browse', phone ? 'Swipe left / right on the picture.' : `${prevNext} for the previous / next post.`],
                    ['✕', 'Close', phone ? 'Swipe down or press Back.' : `${k('Esc')} or a middle click anywhere.`],
                    ['▶', 'Auto next', 'A slideshow with your own timer – videos play to the end first.'],
                    [THEATER_SVG, 'Theater mode', 'Only the picture, using the whole screen' + (phone ? '.' : ` – ${k(keyLabel(CONFIG.theaterKey))}.`)],
                    ['💬', 'Everything inside', 'Tags, votes, favourites, pools and comments – right in the popup.'],
                    ['🔍', 'Full size', phone ? 'Tap the picture to see it in full size.' : 'Click the picture for full size, drag to look around.']
                ]
            },
            {
                art: ic('search'), step: '2 · Search',
                title: 'Search without typing tags_like_this',
                text: 'Tags become bubbles you can add, remove or exclude with one ' + (phone ? 'tap' : 'click') + '.',
                cards: [
                    ['🏷️', 'Tag bubbles', phone ? 'Type a tag and pick a suggestion.' : `${k('Space')} or ${k('Enter')} turns a word into a bubble – with suggestions while you type.`],
                    ['⊘', 'Exclude', (phone ? 'Tap' : 'Click') + ' a bubble to exclude it, again to bring it back.'],
                    ['🎚️', 'Filters', 'Score, size, sort, type and rating – pin one to keep it for every search.'],
                    ['★', 'Favourite tags', 'Your go-to tags, one ' + (phone ? 'tap' : 'click') + ' away.'],
                    ['🕘', 'Recent searches', (phone ? 'Tap' : 'Click') + ' Recent for a small list of your earlier searches – one ' + (phone ? 'tap' : 'click') + ' runs one again.']
                ]
            },
            {
                art: ic('following'), step: '3 · Following',
                title: 'Your artists, newest first',
                text: (phone ? 'Tap' : 'Click') + ' the bell next to an artist in a post to follow them. Their newest posts wait for you in the Following window.',
                cards: [
                    ['◎', 'A circle each', 'Everyone you follow sits in a row at the top – a coloured ring means new posts.'],
                    ['NEW', 'Since your last visit', 'Their newest posts in a grid, each in its own shape – NEW on the ones you haven\'t seen.'],
                    ['↔', 'Browse right there', (phone ? 'Tap' : 'Click') + ' a post and it opens in the popup – ' + (phone ? 'swipe' : prevNext) + ' through that artist, more load at the end.'],
                    [BELL_SVG, 'Open it', phone ? 'Following in the ☰ Menu – Back closes it.' : `${k(keyLabel(CONFIG.followingKey))} or a name in the sidebar's Following box – "Bigger" makes it nearly full screen.`]
                ]
            },
            {
                art: ic('downloads'), step: '4 · Downloads',
                title: 'One key, a perfectly named file',
                text: phone ? 'Tap Download for the original file in full resolution.' : `Press ${k(dl)} on any post for the original file in full resolution.`,
                cards: [
                    ['📄', 'Named for you', '[character] [series] [artist] – no more 8f3a9c…c2.jpg.'],
                    ['⬇', 'Batch download', 'Tick posts or take a whole collection – with progress, Pause and Cancel.'],
                    ...(phone ? [] : [['📁', 'Your own folder', 'Settings → Downloads → Choose folder… – straight into any folder, e.g. Eagle\'s watch folder.']]),
                    ['✓', 'Never twice', 'Downloaded posts get a mark, and Steamy34 asks before saving one again.']
                ]
            },
            {
                art: FOLDER_SVG, step: '5 · Organise',
                title: 'Keep track of everything',
                text: 'Your own little archive on top of rule34 – kept only on your device.',
                cards: [
                    ['👁', 'Viewed & downloaded', 'Small marks on the thumbnails – or hide those posts completely.'],
                    [FOLDER_SVG, 'Collections', 'Your own folders of posts' + (phone ? '.' : ` – ${k(keyLabel(CONFIG.collectKey))} in the popup.`)],
                    ['📊', 'Stats', 'Your top artists, characters and series.'],
                    [BLOCK_SVG, 'Blacklist', 'See, sort and edit everything you blacklisted.']
                ]
            },
            {
                art: ic('look'), step: '6 · Thumbnails',
                title: 'Thumbnails your way',
                text: 'Tags, VID / GIF labels, ♥ and the viewed / downloaded marks can sit on the picture, ' + (phone ? 'stay out of the way' : 'show up only while you hover') + ' – or move to a strip below, so nothing covers the picture.',
                picks: [
                    { key: 'thumbExtras', options: [
                        ['on', thumbStyleArt('on'), 'On the picture'],
                        ['hover', thumbStyleArt('hover'), phone ? 'Clean' : 'Only on hover'],
                        ['below', thumbStyleArt('below'), 'Below']
                    ] },
                    { key: 'roundCorners', label: 'Corners', options: [
                        [true, cornerArt(true), 'Rounded'],
                        [false, cornerArt(false), 'Square']
                    ] }
                ],
                note: 'Change both any time in Settings → Look.'
            },
            {
                art: SPARKLE_SVG, step: '7 · Make it yours',
                title: 'Pick your look',
                text: 'Choose a colour mode – you can switch any time' + (phone ? ' in the ☰ Menu.' : ' in the sidebar.'),
                picks: [
                    { key: 'theme', options: [
                        ['white', '<i style="background:linear-gradient(135deg,#ffffff 50%,#e9e9ee 50%) !important;border-color:#cfcfd6 !important"></i>', 'White'],
                        ['dark', '<i style="background:linear-gradient(135deg,#26262c 50%,#1b1b1f 50%) !important;border-color:#3a3a44 !important"></i>', 'Dark'],
                        ['oled', '<i style="background:#000 !important;border-color:#2a2a30 !important"></i>', 'OLED']
                    ] }
                ],
                cards: [
                    ['⚙', 'Settings', 'Every option in one place, with a search field. This tour is there too – the ✨ Welcome tour button.'],
                    phone ? ['☰', 'The Menu', 'Steamy34\'s switches, Settings and tips are in the ☰ Menu at the top right.']
                          : [PHONE_SVG, 'On your phone too', 'Works on Android with Firefox – Settings → Help → On your phone.'],
                    ['?', 'All shortcuts', 'The quick tips list every key and gesture – the ? in the popup.'],
                    ['💌', 'Say hi', `Ideas or bugs? Come to the <a href="${DISCORD_URL}" target="_blank" rel="noopener noreferrer">Steamy34 Discord channels</a> – every report helps.`]
                ]
            }
        ];
    }

    function openWelcome(startAt) {
        if (document.querySelector('.s34-wel-overlay')) return;
        const slides = welcomeSlides();
        const w = openWindow({ cls: 's34-wel-overlay', icon: SPARKLE_SVG, title: 'Welcome to Steamy34', width: 680 });
        w.setSub(CURRENT_VERSION);
        let idx = Math.min(Math.max(parseInt(startAt, 10) || 0, 0), slides.length - 1);
        // Short tour first (welcome, popup, search, following, downloads); the rest
        // (organise, thumbnails, colours) only after "Show me more"
        const SHORT = 5;
        let full = idx >= SHORT;
        const shown = () => (full ? slides.length : SHORT);

        const stageWrap = document.createElement('div');
        const foot = document.createElement('div');
        foot.className = 's34-wel-foot';
        foot.innerHTML = `
            <div class="s34-wel-dots"></div>
            <button type="button" class="s34-wel-skip">Skip</button>
            <button type="button" class="s34-wel-btn s34-wel-prev">Back</button>
            <button type="button" class="s34-wel-btn s34-wel-tips"><span class="s34-qmark">?</span> All shortcuts</button>
            <button type="button" class="s34-wel-btn s34-wel-more">Show me more</button>
            <button type="button" class="s34-wel-next">Next</button>`;
        w.body.append(stageWrap, foot);

        const ico = i => (/^\s*</.test(i) ? i : `<span>${i}</span>`);
        function render(dir) {
            const s = slides[idx];
            const last = idx === shown() - 1;
            const stage = document.createElement('div');
            stage.className = 's34-wel-stage' + (dir < 0 ? ' s34-wel-back' : '');
            stage.innerHTML = `
                <div class="s34-wel-hero">
                    <div class="s34-wel-art">${s.art}</div>
                    <div class="s34-wel-hero-text">
                        <span class="s34-wel-step">${s.step}</span>
                        <h3></h3>
                        <p>${s.text}</p>
                    </div>
                </div>
                ${s.promise ? `<div class="s34-wel-promise">${s.promise.map(p => `<span>${p}</span>`).join('')}</div>` : ''}
                ${(s.picks || []).map((p, pi) => `${p.label ? `<div class="s34-wel-picklabel">${p.label}</div>` : ''}<div class="s34-wel-themes" data-pick="${pi}">${p.options.map(([, art, label], oi) => `<button type="button" data-o="${oi}">${art}${label}</button>`).join('')}</div>`).join('')}
                ${s.cards ? `<div class="s34-wel-cards">${s.cards.map(([i, b, t]) => `
                    <div class="s34-wel-card"><div class="s34-wel-ico">${ico(i)}</div><div><b>${b}</b><span>${t}</span></div></div>`).join('')}</div>` : ''}
                ${s.note ? `<p class="s34-wel-note" style="margin:0;font-size:12px;opacity:.6">${s.note}</p>` : ''}`;
            stage.querySelector('h3').textContent = s.title;
            // Pickers (colour mode, thumbnail style, corners): saved at once,
            // then the page reloads (the look is set up while it loads) and
            // the tour comes back on this slide
            stage.querySelectorAll('.s34-wel-themes[data-pick]').forEach(row => {
                const p = s.picks[+row.dataset.pick];
                row.querySelectorAll('button').forEach(b => {
                    const v = p.options[+b.dataset.o][0];
                    b.classList.toggle('s34-on', CONFIG[p.key] === v);
                    b.addEventListener('click', () => {
                        if (CONFIG[p.key] === v) return;
                        saveSettingsNow({ [p.key]: v });
                        try { sessionStorage.setItem(TOUR_RESUME_KEY, String(idx)); } catch (e) {}
                        location.reload();
                    });
                });
            });
            stageWrap.replaceChildren(stage);
            foot.querySelector('.s34-wel-dots').innerHTML = slides.slice(0, shown())
                .map((x, i) => `<button type="button" data-i="${i}" aria-label="Slide ${i + 1}"${i === idx ? ' class="s34-on"' : ''}></button>`).join('');
            foot.querySelector('.s34-wel-prev').hidden = idx === 0;
            foot.querySelector('.s34-wel-skip').hidden = last;
            foot.querySelector('.s34-wel-tips').hidden = !last || !full;
            foot.querySelector('.s34-wel-more').hidden = !last || full;
            const next = foot.querySelector('.s34-wel-next');
            next.textContent = idx === 0 ? 'Show me' : last ? 'Let\'s go!' : 'Next';
            w.body.scrollTop = 0;
        }
        function go(to) {
            if (to < 0) return;
            if (to >= shown()) { w.close(); return; }
            const dir = to < idx ? -1 : 1;
            idx = to;
            render(dir);
        }
        foot.addEventListener('click', e => {
            const b = e.target.closest('button');
            if (!b) return;
            if (b.dataset.i != null) go(+b.dataset.i);
            else if (b.classList.contains('s34-wel-next')) go(idx + 1);
            else if (b.classList.contains('s34-wel-prev')) go(idx - 1);
            else if (b.classList.contains('s34-wel-more')) { full = true; go(SHORT); }
            else if (b.classList.contains('s34-wel-skip')) w.close();
            else if (b.classList.contains('s34-wel-tips')) { w.close(); openQuickTips(); }
        });
        // ← / → (and A / D) step through the slides
        function onKey(e) {
            if (e.ctrlKey || e.metaKey || e.altKey || !w.overlay.isConnected) return;
            if (document.querySelector('.s34-tips-overlay')) return;
            const t = e.target;
            if (t && (t.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName))) return;
            if (e.key === 'ArrowRight' || e.code === 'KeyD') { e.preventDefault(); e.stopPropagation(); go(idx + 1); }
            else if (e.key === 'ArrowLeft' || e.code === 'KeyA') { e.preventDefault(); e.stopPropagation(); go(idx - 1); }
        }
        document.addEventListener('keydown', onKey, true);
        // Phones: swipe through the slides
        let touchX = null;
        stageWrap.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
        stageWrap.addEventListener('touchend', e => {
            if (touchX == null) return;
            const dx = e.changedTouches[0].clientX - touchX;
            touchX = null;
            if (Math.abs(dx) > 50) go(idx + (dx < 0 ? 1 : -1));
        });
        w.onClose = () => {
            document.removeEventListener('keydown', onKey, true);
            try {
                GM_setValue(WELCOME_KEY, 1);
                // The tour covers these – no extra windows right after it
                if (GM_getValue(TIPS_KEY, 0) < TIPS_VERSION) GM_setValue(TIPS_KEY, TIPS_VERSION);
                GM_setValue(CHANGELOG_SEEN_KEY, CURRENT_VERSION);
                GM_setValue(MOBILE_ANNOUNCE_KEY, MOBILE_ANNOUNCE_VERSION);
            } catch (e) {}
        };
        render(0);
        foot.querySelector('.s34-wel-next').focus({ preventScroll: true });
    }

    // Once after installing or updating (posts page only, never two windows):
    // - first install: the quick tips
    // - after a notable update: the changelog (small fixes stay quiet)
    function maybeShowQuickTips() {
        if (isPostView || !document.querySelector('.image-list')) return;
        let tipsSeen = 0, clSeen = null;
        try {
            tipsSeen = GM_getValue(TIPS_KEY, 0);
            clSeen = GM_getValue(CHANGELOG_SEEN_KEY, null);
        } catch (e) {}

        // Coming back from picking a colour mode in the welcome tour
        let resume = null;
        try { resume = sessionStorage.getItem(TOUR_RESUME_KEY); sessionStorage.removeItem(TOUR_RESUME_KEY); } catch (e) {}
        if (resume !== null) {
            setTimeout(() => { if (!document.querySelector('.s34-overlay')) openWelcome(resume); }, 300);
            return;
        }

        let show = null;
        if (!tipsSeen) {
            show = () => openWelcome(0);               // brand new: the welcome tour
            GM_setValue(CHANGELOG_SEEN_KEY, CURRENT_VERSION);
        } else {
            const since = clSeen || '12.2';            // used Steamy34 before the changelog existed
            const unseen = CHANGELOG.filter(e => compareVersions(e.v, since) > 0);
            if (unseen.some(e => e.notify)) {
                show = () => openChangelog(since);
                GM_setValue(TIPS_KEY, TIPS_VERSION);   // the changelog covers it - no tips on top
            } else {
                if (compareVersions(CURRENT_VERSION, since) > 0) GM_setValue(CHANGELOG_SEEN_KEY, CURRENT_VERSION);
                if (tipsSeen < TIPS_VERSION) show = () => openQuickTips();
            }
        }
        // Nothing else to show: the "on your phone" announcement, once
        // (not on a phone itself - you're already there)
        if (!show && tipsSeen) {
            let seen = 0;
            try { seen = GM_getValue(MOBILE_ANNOUNCE_KEY, 0); } catch (e) {}
            if (seen < MOBILE_ANNOUNCE_VERSION) {
                if (onTouchDevice()) GM_setValue(MOBILE_ANNOUNCE_KEY, MOBILE_ANNOUNCE_VERSION);
                else show = () => openMobileGuide();
            }
        }
        if (!show) return;
        setTimeout(() => {
            if (!document.querySelector('.s34-overlay')) show();
        }, 1200);
    }

    // ---- Blacklist window: every blacklisted tag, recent ones, sorting ----
    const BL_SORT_KEY = 'steamy34_blsort';
    const BL_SORTS = [
        ['newest', 'Newest'],
        ['oldest', 'Oldest'],
        ['az', 'A–Z'],
        ['za', 'Z–A'],
        ['type', 'Type']
    ];
    const BL_TYPE_ORDER = ['artist', 'character', 'copyright', 'general', 'metadata', 'other'];
    const BL_TYPE_NAMES = {
        artist: 'Artists', character: 'Characters', copyright: 'Copyrights',
        general: 'General', metadata: 'Meta', other: 'Type not known yet'
    };
    const BLOCK_SVG = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><path d="M6 6l12 12"/></svg>';

    function timeAgo(ms) {
        if (!ms) return '';
        const s = Math.max(0, (Date.now() - ms) / 1000);
        if (s < 60) return 'just now';
        if (s < 3600) return Math.floor(s / 60) + ' min ago';
        if (s < 86400) return Math.floor(s / 3600) + ' h ago';
        if (s < 86400 * 30) return Math.floor(s / 86400) + ' d ago';
        return new Date(ms).toLocaleDateString();
    }

    function blType(tag) {
        const t = tagTypes.get(tag.toLowerCase());
        if (t) return BL_TYPE_ORDER.includes(t) ? t : 'other';
        // Search filters like rating:explicit (not "honkai:_star_rail", a real tag)
        return BL_FILTER_RE.test(tag) ? 'metadata' : 'other';
    }
    const BL_FILTER_RE = /^(rating|score|user|id|md5|width|height|sort|source|fav|pool|parent|status|ratio|filetype|date|order):/i;

    // Everything on screen that shows blacklist states
    function refreshBlockStates() {
        markBlocklisted();
        document.querySelectorAll('#tag-sidebar li[class*="tag-type-"]').forEach(row => {
            const btn = row.querySelector('.r34-block-btn');
            const tag = getTagFromRow(row);
            if (btn && tag) styleButton(btn, isBlocked(tag));
        });
        const count = document.querySelector('.s34-blbtn-count');
        if (count) count.textContent = blCountText();
    }

    function blCountText() {
        const n = readBlocklist().length;
        return n === 1 ? '1 tag' : n + ' tags';
    }

    function openBlacklistManager() {
        if (document.querySelector('.s34-blm-overlay')) return;
        let sort = GM_getValue(BL_SORT_KEY, 'newest');
        if (!BL_SORTS.some(s => s[0] === sort)) sort = 'newest';
        let filter = '';

        const overlay = document.createElement('div');
        overlay.className = 's34-overlay s34-blm-overlay';
        overlay.innerHTML = `
            <div class="s34-blm" role="dialog" aria-modal="true">
                <div class="s34-blm-head">
                    <div class="s34-blm-icon">${BLOCK_SVG}</div>
                    <div class="s34-blm-heading">
                        <div class="s34-blm-title">Blacklist</div>
                        <div class="s34-blm-sub"></div>
                    </div>
                    <button type="button" class="s34-blm-close" title="Close (Esc)">✕</button>
                </div>
                <div class="s34-blm-add">
                    <input type="text" class="s34-blm-input" placeholder="Blacklist a tag…" autocomplete="off" spellcheck="false">
                    <button type="button" class="s34-blm-addbtn">Add</button>
                </div>
                <div class="s34-blm-recent-box">
                    <div class="s34-blm-label">Recently blacklisted</div>
                    <div class="s34-blm-recent"></div>
                </div>
                <div class="s34-blm-tools">
                    <input type="search" class="s34-blm-filter" placeholder="Filter…" autocomplete="off" spellcheck="false">
                    <div class="s34-blm-sort" role="tablist"></div>
                </div>
                <div class="s34-blm-status" hidden></div>
                <div class="s34-blm-list"></div>
                <div class="s34-blm-foot">
                    <div class="s34-blm-dates" hidden></div>
                    <div>Uses rule34.xxx's own blacklist (the same list as My Account → Options).</div>
                </div>
            </div>`;

        const $ = sel => overlay.querySelector(sel);
        const listEl = $('.s34-blm-list');
        const recentEl = $('.s34-blm-recent');
        const sortEl = $('.s34-blm-sort');
        const addInput = $('.s34-blm-input');

        BL_SORTS.forEach(([key, label]) => {
            const b = document.createElement('button');
            b.type = 'button';
            b.dataset.sort = key;
            b.textContent = label;
            b.addEventListener('click', () => {
                sort = key;
                GM_setValue(BL_SORT_KEY, key);
                render();
            });
            sortEl.appendChild(b);
        });

        function removeTag(tag) {
            const times = getBlTimes();
            const when = times[tag.toLowerCase()];
            writeBlocklist(readBlocklist().filter(t => t.toLowerCase() !== tag.toLowerCase()));
            refreshBlockStates();
            render();
            showToast(`Removed "${prettyTag(tag)}" from the blacklist`, 'Undo', () => {
                writeBlocklist(readBlocklist().concat(tag));
                if (when) { const t = getBlTimes(); t[tag.toLowerCase()] = when; GM_setValue(BL_TIMES_KEY, t); }
                refreshBlockStates();
                if (overlay.isConnected) render();
            });
        }

        function addTags(words) {
            const list = readBlocklist();
            const have = new Set(list.map(t => t.toLowerCase()));
            const added = [];
            words.map(w => w.replace(/^[-~]+/, '').trim()).filter(Boolean).forEach(w => {
                if (!have.has(w.toLowerCase())) { list.push(w); have.add(w.toLowerCase()); added.push(w); }
            });
            if (!added.length) return;
            writeBlocklist(list);
            refreshBlockStates();
            render();
            showToast('Blacklisted ' + added.map(prettyTag).join(', '));
            if (!lookingUp) lookupUnknownTypes(); // find out what kind of tags they are
        }

        function chipFor(tag) {
            const chip = document.createElement('span');
            chip.className = 's34-blm-chip s34-blm-' + blType(tag);
            const name = document.createElement('span');
            name.className = 's34-blm-name';
            name.textContent = prettyTag(tag);
            chip.appendChild(name);
            return chip;
        }

        // Small menu to set a tag's type by hand
        function openTypeMenu(chip, tag) {
            closeTypeMenu();
            const menu = document.createElement('div');
            menu.className = 's34-blm-typemenu';
            const head = document.createElement('div');
            head.className = 's34-blm-typemenu-head';
            head.textContent = 'Type of "' + prettyTag(tag) + '"';
            menu.appendChild(head);
            ['artist', 'character', 'copyright', 'general', 'metadata'].forEach(type => {
                const b = document.createElement('button');
                b.type = 'button';
                b.className = 's34-blm-' + type + (blType(tag) === type ? ' s34-on' : '');
                b.textContent = type === 'metadata' ? 'Meta' : type.charAt(0).toUpperCase() + type.slice(1);
                b.addEventListener('click', () => {
                    tagTypes.set(tag.toLowerCase(), type);
                    scheduleTagTypeSave();
                    closeTypeMenu();
                    render();
                });
                menu.appendChild(b);
            });
            const box = overlay.querySelector('.s34-blm');
            box.appendChild(menu);
            const r = chip.getBoundingClientRect();
            const br = box.getBoundingClientRect();
            menu.style.left = Math.max(8, Math.min(r.left - br.left, br.width - menu.offsetWidth - 12)) + 'px';
            // Below the tag, or above it when there's no room at the bottom
            const below = r.bottom - br.top + 6;
            const above = r.top - br.top - menu.offsetHeight - 6;
            menu.style.top = (below + menu.offsetHeight > br.height - 8 && above > 8 ? above : below) + 'px';
        }
        function closeTypeMenu() {
            const m = overlay.querySelector('.s34-blm-typemenu');
            if (m) m.remove();
        }
        overlay.addEventListener('mousedown', e => {
            if (!e.target.closest('.s34-blm-typemenu, .s34-blm-name')) closeTypeMenu();
        });

        // One compact chip per tag: name + ×; type and date in the tooltip.
        // Clicking the name sets its type.
        function makeChip(tag, when) {
            const chip = chipFor(tag);
            chip.classList.add('s34-blm-item');
            const type = blType(tag);
            const typeName = type !== 'other' ? (type === 'metadata' ? 'Meta' : type.charAt(0).toUpperCase() + type.slice(1)) : 'Type not known yet';
            chip.title = [typeName, when ? 'blacklisted ' + timeAgo(when) : 'blacklisted before Steamy34 tracked dates']
                .join(' · ') + '\nClick to set its type';
            chip.querySelector('.s34-blm-name').addEventListener('click', () => openTypeMenu(chip, tag));
            const x = document.createElement('button');
            x.type = 'button';
            x.className = 's34-blm-x';
            x.textContent = '×';
            x.title = 'Remove from the blacklist';
            x.addEventListener('click', () => removeTag(tag));
            chip.appendChild(x);
            return chip;
        }

        function render() {
            const list = readBlocklist();
            const times = getBlTimes();
            const when = t => times[t.toLowerCase()] || 0;
            $('.s34-blm-sub').textContent = list.length
                ? `${blCountText()} · posts with these tags are hidden`
                : 'Nothing blacklisted yet';

            // Why some tags have no date
            const undated = list.filter(t => !when(t)).length;
            const datesEl = $('.s34-blm-dates');
            datesEl.hidden = !undated;
            datesEl.textContent = undated
                ? `${undated === list.length ? 'These tags were' : undated + (undated === 1 ? ' tag was' : ' tags were')} ` +
                  'blacklisted before Steamy34 started remembering dates (it only does that since it was installed), ' +
                  'so they don\'t show under "Recently blacklisted" and sort as oldest.'
                : '';

            // Recently blacklisted: the last 8 with a known date
            const recent = list.filter(when).sort((a, b) => when(b) - when(a)).slice(0, 8);
            $('.s34-blm-recent-box').hidden = !recent.length;
            recentEl.replaceChildren(...recent.map(tag => {
                const item = document.createElement('div');
                item.className = 's34-blm-recent-item';
                const chip = chipFor(tag);
                chip.title = 'Click to set its type';
                chip.querySelector('.s34-blm-name').addEventListener('click', () => openTypeMenu(chip, tag));
                const x = document.createElement('button');
                x.type = 'button';
                x.className = 's34-blm-x';
                x.textContent = '×';
                x.title = 'Remove from the blacklist';
                x.addEventListener('click', () => removeTag(tag));
                chip.appendChild(x);
                const ago = document.createElement('span');
                ago.className = 's34-blm-ago';
                ago.textContent = timeAgo(when(tag));
                item.append(chip, ago);
                return item;
            }));

            sortEl.querySelectorAll('button').forEach(b => b.classList.toggle('s34-on', b.dataset.sort === sort));

            const f = filter.toLowerCase().replace(/ /g, '_');
            let shown = list.filter(t => !f || t.toLowerCase().includes(f));
            const byName = (a, b) => a.toLowerCase().localeCompare(b.toLowerCase());
            if (sort === 'newest') shown.sort((a, b) => when(b) - when(a) || byName(a, b));
            else if (sort === 'oldest') shown.sort((a, b) => (when(a) || 0) - (when(b) || 0) || byName(a, b));
            else if (sort === 'az') shown.sort(byName);
            else if (sort === 'za') shown.sort((a, b) => byName(b, a));
            else if (sort === 'type') shown.sort((a, b) =>
                BL_TYPE_ORDER.indexOf(blType(a)) - BL_TYPE_ORDER.indexOf(blType(b)) || byName(a, b));

            listEl.replaceChildren();
            if (!shown.length) {
                const empty = document.createElement('div');
                empty.className = 's34-blm-empty';
                empty.textContent = list.length ? 'No tag matches the filter.' : 'Your blacklist is empty. Add a tag above, or use ⊘ next to any tag.';
                listEl.appendChild(empty);
                return;
            }
            // Chips flow in rows; "Type" adds a small heading per group
            let lastType = null;
            let wrap = null;
            shown.forEach(tag => {
                if (!wrap || (sort === 'type' && blType(tag) !== lastType)) {
                    if (sort === 'type') {
                        lastType = blType(tag);
                        const h = document.createElement('div');
                        h.className = 's34-blm-group';
                        h.textContent = BL_TYPE_NAMES[lastType] || lastType;
                        listEl.appendChild(h);
                        if (lastType === 'other') {
                            const note = document.createElement('div');
                            note.className = 's34-blm-why';
                            note.textContent = lookingUp
                                ? 'Looking these up on the tag server…'
                                : 'Steamy34 learns tag types from the pages and suggestions it sees, so tags you ' +
                                  'blacklisted before installing it can be missing here. It looks them up by itself; ' +
                                  'the server didn\'t know these – click a tag to set its type.';
                            listEl.appendChild(note);
                        }
                    }
                    wrap = document.createElement('div');
                    wrap.className = 's34-blm-chips';
                    listEl.appendChild(wrap);
                }
                wrap.appendChild(makeChip(tag, when(tag)));
            });
        }

        // Add box: Space / Enter / picking a suggestion adds the tag
        const commitAdd = all => {
            const v = addInput.value;
            const parts = v.split(/\s+/);
            const keep = all || /\s$/.test(v) ? '' : parts.pop();
            const done = parts.filter(Boolean);
            if (done.length) addTags(done);
            addInput.value = keep;
        };
        addInput.addEventListener('input', () => { if (/\s/.test(addInput.value)) commitAdd(false); });
        if (CONFIG.searchSuggestions) attachSuggestions(addInput);
        addInput.addEventListener('keydown', e => {
            if (e.defaultPrevented || addInput.dataset.acOpen === '1' || e.isComposing) return;
            if (e.key === 'Enter') { e.preventDefault(); commitAdd(true); }
        });
        $('.s34-blm-addbtn').addEventListener('click', () => { commitAdd(true); addInput.focus(); });

        $('.s34-blm-filter').addEventListener('input', e => { filter = e.target.value.trim(); render(); });

        function close() {
            document.removeEventListener('keydown', onKey, true);
            overlay.remove();
        }
        function onKey(e) {
            if (e.key !== 'Escape') return;
            if (addInput.dataset.acOpen === '1') return; // Esc closes the suggestions first
            e.preventDefault();
            e.stopPropagation();
            close();
        }
        $('.s34-blm-close').addEventListener('click', close);
        overlay.addEventListener('mousedown', e => { if (e.target === overlay) close(); });
        document.addEventListener('keydown', onKey, true);

        // Types of tags Steamy34 hasn't seen yet: ask the tag-suggestion server
        let lookingUp = false;
        function setStatus(text) {
            const s = $('.s34-blm-status');
            s.hidden = !text;
            s.textContent = text || '';
        }
        async function lookupUnknownTypes() {
            const unknown = readBlocklist().map(t => t.toLowerCase())
                .filter(t => !tagTypes.has(t) && !BL_FILTER_RE.test(t));
            if (!unknown.length) return;
            lookingUp = true;
            let done = 0;
            for (const t of unknown) {
                if (!overlay.isConnected) break;
                setStatus(`Looking up tag types… ${done} / ${unknown.length}`);
                try {
                    await lookupTypesViaSuggestions([t]);
                } catch (e) {
                    lookingUp = false;
                    setStatus('Couldn\'t reach the tag server right now – you can click a tag to set its type.');
                    render();
                    return;
                }
                done++;
                if (done % 5 === 0) render();
            }
            lookingUp = false;
            setStatus('');
            if (overlay.isConnected) render();
        }

        render();
        document.body.appendChild(overlay);
        addInput.focus();
        lookupUnknownTypes();
    }

    // Sidebar button that opens it (posts page and single posts),
    // right above the Steamy34 Settings button
    function addBlacklistButton() {
        if (document.querySelector('.s34-blbtn')) return;
        const gear = document.querySelector('.s34-gear.s34-inline');
        if (!gear) return;
        const btn = document.createElement('div');
        btn.className = 's34-blbtn';
        btn.title = 'See and manage your blacklist';
        btn.innerHTML = `
            <span class="s34-blbtn-icon">${BLOCK_SVG}</span>
            <span class="s34-blbtn-text"><b>Blacklist</b><span class="s34-blbtn-count"></span></span>`;
        btn.querySelector('.s34-blbtn-count').textContent = blCountText();
        btn.addEventListener('click', openBlacklistManager);
        makeKeyClickable(btn, 'Blacklist');
        gear.before(btn);
    }

    // =====================================================================
    //  FOLLOWING WINDOW (Beta 3.6)
    //  Everything you follow in one window on top of the page you're on -
    //  the page underneath, its search, pins and filters stay as they are.
    //   - a row of circles: All and your artists. A
    //     coloured ring = new posts. The order is set when the window opens
    //     (new ones first), so nothing jumps around while you browse.
    //   - a small header: picture, name, new / total, Following, "Open as a search"
    //   - a grid of the newest posts, each in its own shape (rows of one
    //     height, like the posts page), NEW on the ones since
    //     your last visit. Always newest first: no score, size or sort here
    //     (the normal search does that - "Open as a search" goes there).
    //  A tile opens the normal popup viewer on top; its ← / → move through
    //  this grid and load more at the end. Closing it brings you back here.
    //  G (changeable) opens / closes the window, ← / → switch circles, Esc
    //  closes. Phones: full screen, the Back button closes.
    //  Pages load through the shared line (15-hover-cloudflare.js): a circle's
    //  first page as 'popup', more while you scroll as 'scroll'. "All" merges
    //  the either/or searches (up to 20 artists each), newest first.
    //  fwState, FW_ALL and the keys ('all', 'a:artist') are in 20c.
    // =====================================================================
    const FW_PAGE = 42;          // posts added per step (one site page)
    const FW_NEAR_END = 900;     // px before the end of the grid at which more loads

    const FW_BIG_KEY = 'steamy34_fw_big'; // the window at nearly full size (remembered)
    const EXPAND_SVG = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6"/><path d="M20 4l-7 7"/><path d="M10 20H4v-6"/><path d="M4 20l7-7"/></svg>';
    const SHRINK_SVG = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 11h-6V5"/><path d="M13 11l7-7"/><path d="M5 13h6v6"/><path d="M11 13l-7 7"/></svg>';

    const fwEl = sel => fwState && fwState.overlay.querySelector(sel);

    // Bigger: nearly the whole window - a margin of the dimmed page stays
    // around it, so it still reads as a window on top of your page
    function fwSetBig(big, overlay) {
        overlay.classList.toggle('s34-fw-large', big);
        const b = overlay.querySelector('.s34-fw-size');
        if (!b) return;
        b.innerHTML = (big ? SHRINK_SVG + '<span>Smaller</span>' : EXPAND_SVG + '<span>Bigger</span>');
        b.title = big ? 'Back to the normal size' : 'Make the window nearly as big as the screen';
        b.setAttribute('aria-pressed', big ? 'true' : 'false');
    }
    const fwView = () => fwState && fwState.views.get(fwState.key);

    // Old feed pages (before 3.6, e.g. a bookmark of #s34-following=artist):
    // the address loses its # right away, and the window opens there (an old
    // followed search's page is just that search now)
    let fwFromAddress = null;
    (function () {
        if (isPostView) return;
        const f = feedFromHash(location.hash);
        if (!f) return;
        fwFromAddress = f.kind === 'all' ? FW_ALL : f.kind === 'artist' ? fwKeyArtist(f.tag) : null;
        try { history.replaceState(history.state, '', location.pathname + location.search); } catch (e) {}
    })();
    function openFollowFromAddress() {
        if (!fwFromAddress) return false;
        openFollowPopup(fwFromAddress);
        fwFromAddress = null;
        return true;
    }

    // What the circles show
    function fwItems(d) {
        d = d || getFollowing();
        const items = [];
        if (d.artists.length > 1) {
            const t = followTotals(d);
            items.push({ key: FW_ALL, kind: 'all', label: 'All', count: t.n, more: /\+/.test(t.text) });
        }
        d.artists.forEach(a => items.push({ key: fwKeyArtist(a.tag), kind: 'artist', tag: a.tag, label: prettyTag(a.tag), count: a.count || 0, more: !!a.more, pic: a.pic || '' }));
        return items;
    }

    // "Seen" as it was when the window opened (per artist): the
    // posts after it are NEW for as long as the window is open, even after
    // you looked at them once
    function fwSeen(k) {
        const st = fwState;
        if (!(k in st.seen)) {
            const d = getFollowing();
            const it = findArtist(k.slice(2), d);
            st.seen[k] = it ? it.seen || 0 : 0;
        }
        return st.seen[k];
    }

    // A circle's picture: the newest post's thumbnail, else a letter / icon
    const fwHue = s => { let h = 0; for (const c of String(s)) h = (h * 31 + c.charCodeAt(0)) % 360; return h; };
    function fwAvatarHtml(item, pic) {
        if (item.kind === 'all') return `<span class="s34-fw-pic s34-fw-av s34-fw-allpic">${BELL_ON_SVG}</span>`;
        const src = pic || item.pic;
        const inner = src ? `<img class="s34-fw-av" alt="" src="${escapeHtml(src)}">`
            : `<span class="s34-fw-letter">${escapeHtml((item.label || '?').trim().charAt(0).toUpperCase())}</span>`;
        return `<span class="s34-fw-pic s34-fw-av" style="--h:${fwHue(item.label)}">${inner}</span>`;
    }

    // ---- Open / close ----
    // key: what to show ('all', 'a:artist'); none = All (or the first circle)
    function openFollowPopup(key) {
        if (popupState) closePopup(); // the post viewer steps aside
        const d = getFollowing();
        if (!fwState) fwBuild();
        const items = fwItems(d);
        if (!key || (!items.some(i => i.key === key) && !fwState.views.has(key))) key = items.length ? items[0].key : '';
        fwShow(key);
    }

    function fwBuild() {
        const d = getFollowing();
        const overlay = document.createElement('div');
        overlay.className = 's34-fw-overlay';
        overlay.innerHTML = `
            <div class="s34-fw" role="dialog" aria-modal="true" aria-label="Following">
                <div class="s34-fw-top">
                    <span class="s34-fw-title">${BELL_SVG}<b>Following</b></span>
                    <span class="s34-fw-checked"></span>
                    <button type="button" class="s34-fw-btn" data-fw="manage" title="Follow by name, unfollow, check now">Manage</button>
                    <button type="button" class="s34-fw-btn s34-fw-x" data-fw="close" aria-label="Close" title="Close (Esc)">✕</button>
                </div>
                <div class="s34-fw-circles" role="tablist" aria-label="What you follow"></div>
                <div class="s34-fw-scroll">
                    <div class="s34-fw-head"></div>
                    <div class="s34-fw-grid"></div>
                    <div class="s34-fw-status"></div>
                </div>
                <div class="s34-fw-foot"></div>
            </div>`;
        // New posts first, then the rest as you followed them
        const items = fwItems(d);
        const rank = i => (i.kind === 'all' ? 0 : i.kind === 'artist' ? (i.count ? 1 : 2) : (i.count ? 3 : 4));
        const order = items.map((it, n) => [it, n]).sort((a, b) => rank(a[0]) - rank(b[0]) || a[1] - b[1]).map(x => x[0].key);
        fwState = { overlay, key: '', order, seen: {}, views: new Map(), items: new Map(), pushedHistory: false };
        const keys = CONFIG.browseKeys === 'wasd' ? '<kbd>A</kbd> <kbd>D</kbd>' : '<kbd>←</kbd> <kbd>→</kbd>';
        overlay.querySelector('.s34-fw-foot').innerHTML =
            `<span><kbd>${escapeHtml(keyLabel(CONFIG.followingKey))}</kbd> open / close</span><span>${keys} previous / next</span><span><kbd>Esc</kbd> close</span><span>Scroll down for older posts</span>` +
            `<button type="button" class="s34-fw-btn s34-fw-size" data-fw="size"></button>`;
        fwSetBig(GM_getValue(FW_BIG_KEY, false) === true, overlay);

        overlay.addEventListener('mousedown', e => { if (e.target === overlay) closeFollowPopup(); });
        overlay.addEventListener('click', e => {
            const b = e.target.closest('[data-fw]');
            if (b) {
                const what = b.dataset.fw;
                if (what === 'close') closeFollowPopup();
                else if (what === 'manage') openFollowingWindow();
                else if (what === 'size') {
                    const big = !overlay.classList.contains('s34-fw-large');
                    fwSetBig(big, overlay);
                    try { GM_setValue(FW_BIG_KEY, big); } catch (err) {}
                    setTimeout(fwMaybeMore, 50); // more room - maybe more posts fit
                }
                else if (what === 'retry') { const v = fwView(); if (v) fwLoadMore(v); }
                else if (what === 'follow') {
                    const k = fwState.key;
                    if (k.startsWith('a:')) toggleFollow(k.slice(2));
                }
                return;
            }
            const c = e.target.closest('.s34-fw-c');
            if (c) { fwShow(c.dataset.key); return; }
            // A tile: the normal popup viewer (Ctrl / middle click: the post page in a new tab)
            const a = e.target.closest('.s34-fw-grid span.thumb a[href]');
            if (!a || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
            e.preventDefault();
            const view = fwView();
            if (view) openPopup(a.closest('span.thumb'), fwListFor(view));
        });
        overlay.querySelector('.s34-fw-scroll').addEventListener('scroll', fwMaybeMore, { passive: true });

        document.body.appendChild(overlay);
        document.documentElement.classList.add('s34-fw-open');
        // Phones: the Back button closes the window instead of leaving the page
        if (isPhoneLayout()) {
            try { history.pushState({ s34fw: true }, ''); fwState.pushedHistory = true; } catch (e) {}
        }
    }

    function closeFollowPopup(byBack) {
        const st = fwState;
        if (!st) return;
        if (popupState) closePopup();
        const v = fwView();
        if (v) v.scrollTop = fwEl('.s34-fw-scroll').scrollTop;
        fwState = null;
        st.overlay.remove();
        document.documentElement.classList.remove('s34-fw-open');
        if (st.pushedHistory && byBack !== true) {
            try { if (history.state && history.state.s34fw) history.back(); } catch (e) {}
        }
        renderFollowBox();
    }

    // Phones: Back closes the window (Back from a post opened in it only closes the post)
    window.addEventListener('popstate', () => {
        if (!fwState || !fwState.pushedHistory) return;
        if (history.state && history.state.s34fw) return; // back from the post viewer: still in the window
        closeFollowPopup(true);
    });

    // ---- Keys: G opens / closes, ← / → switch circles, Esc closes ----
    document.addEventListener('keydown', e => {
        const t = e.target;
        if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey) return;
        if (t && (t.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName))) return;
        if (popupState) return; // the post viewer has the keys (Esc closes it first)
        if (document.querySelector('.s34-overlay, .s34-cmenu, .s34-menu-overlay')) return; // a window or menu on top
        const toggleKey = e.code === CONFIG.followingKey && !e.shiftKey && !e.repeat;
        if (!fwState) {
            if (toggleKey) { e.preventDefault(); openFollowPopup(); }
            return;
        }
        if (e.key === 'Escape' || toggleKey) { e.preventDefault(); closeFollowPopup(); return; }
        const dir = browseDirection(e);
        if (dir) { e.preventDefault(); fwStep(dir); }
    }, true);

    function fwStep(dir) {
        const keys = fwOrderedItems().map(i => i.key);
        const i = keys.indexOf(fwState.key);
        const next = keys[i + dir];
        if (next) fwShow(next);
    }

    // ---- Showing one circle ----
    function fwShow(key) {
        const st = fwState;
        if (!st) return;
        const before = fwView();
        if (before) before.scrollTop = fwEl('.s34-fw-scroll').scrollTop;
        st.key = key;
        let view = st.views.get(key);
        if (!view) {
            view = fwNewView(key);
            st.views.set(key, view);
        }
        // "seen before" for everyone this view shows - before anything loads
        if (key === FW_ALL) view.sources.forEach(s => s.tags.forEach(t => fwSeen(fwKeyArtist(t))));
        else if (key) fwSeen(key);
        fwRenderCircles();
        fwRenderHead(view);
        fwEl('.s34-fw-grid').replaceChildren(...view.tiles);
        fwEl('.s34-fw-scroll').scrollTop = view.scrollTop || 0;
        fwRenderStatus(view);
        renderFollowBox(); // the sidebar row of what's shown
        const on = fwEl('.s34-fw-c.s34-on');
        if (on) { try { on.scrollIntoView({ block: 'nearest', inline: 'nearest' }); } catch (e) {} }
        if (!key) return;
        if (!view.tiles.length && view.state === 'more') fwLoadMore(view);
        else setTimeout(fwMaybeMore, 50);
    }

    // A view: one circle's grid, kept while the window is open (switching back is instant)
    function fwNewView(key) {
        const d = getFollowing();
        let sources = [];
        if (key === FW_ALL) sources = followGroups(d).map(g => ({ query: groupQuery(g), tags: g }));
        else if (key.startsWith('a:')) sources = [{ query: key.slice(2), tags: [key.slice(2)] }];
        sources.forEach(s => Object.assign(s, { next: null, started: false, done: false, buf: [] }));
        const item = fwItems(d).find(i => i.key === key) || {};
        return {
            key, sources, tiles: [], ids: new Set(), state: key ? 'more' : 'done', busy: false,
            total: null, pic: '', scrollTop: 0, newN: 0, countAtOpen: item.count || 0, moreAtOpen: !!item.more
        };
    }

    // The circles, in the order the window opened with (new follows at the end)
    function fwOrderedItems() {
        const st = fwState;
        const items = fwItems();
        items.forEach(i => { st.items.set(i.key, i); if (!st.order.includes(i.key)) st.order.push(i.key); });
        // what's shown stays in the row, even right after you unfollowed it
        if (st.key && !items.some(i => i.key === st.key) && st.items.has(st.key)) items.push(Object.assign({}, st.items.get(st.key), { count: 0, gone: true }));
        const pos = k => st.order.indexOf(k);
        return items.sort((a, b) => pos(a.key) - pos(b.key));
    }

    function fwRenderCircles() {
        const st = fwState;
        const box = fwEl('.s34-fw-circles');
        const items = fwOrderedItems();
        box.hidden = !items.length;
        box.innerHTML = items.map(it => {
            const v = st.views.get(it.key);
            const on = it.key === st.key;
            const title = it.label + (it.count ? ' – ' + it.count + (it.more ? '+' : '') + ' new' : '');
            return `<button type="button" class="s34-fw-c${it.count ? ' s34-new' : ''}${on ? ' s34-on' : ''}${it.gone ? ' s34-gone' : ''}" data-key="${escapeHtml(it.key)}" role="tab" aria-selected="${on}" title="${escapeHtml(title)}">
                <span class="s34-fw-ring s34-fw-av">${fwAvatarHtml(it, v && v.pic)}</span>
                <span class="s34-fw-name">${escapeHtml(it.label)}</span></button>`;
        }).join('');
        const d = getFollowing();
        fwEl('.s34-fw-checked').textContent = d.checkedAt ? 'checked ' + timeAgo(d.checkedAt) : '';
    }

    function fwRenderHead(view) {
        const head = fwEl('.s34-fw-head');
        const d = getFollowing();
        const k = view.key;
        if (!k) {
            head.innerHTML = `<div class="s34-fw-empty">Nothing followed yet. Follow an artist with the ${BELL_TEXT} next to their name in a post. Their newest posts show up here, with NEW on the ones since your last visit.</div>`;
            return;
        }
        const isAll = k === FW_ALL;
        const word = k.slice(2);
        const item = fwState.items.get(k) || { kind: isAll ? 'all' : 'artist', label: isAll ? 'All' : prettyTag(word) };
        const on = isFollowed(word, d);
        const name = isAll ? 'All followed artists' : prettyTag(word);
        const n = Math.max(view.newN, view.countAtOpen);
        const nums = [`<span><b>${n}${view.moreAtOpen && n === view.countAtOpen && n ? '+' : ''}</b> new since your last visit</span>`];
        if (view.total) nums.push(`<span><b>${view.total.toLocaleString('en-US')}</b> posts</span>`);
        if (isAll) nums.push(`<span><b>${d.artists.length}</b> artists</span>`);
        head.innerHTML = `
            <span class="s34-fw-big s34-fw-av">${fwAvatarHtml(item, view.pic)}</span>
            <div class="s34-fw-info">
                <div class="s34-fw-row"><b class="s34-fw-nm"></b>
                    ${isAll ? '' : `<button type="button" class="s34-fw-btn s34-fw-follow${on ? ' s34-following' : ''}" data-fw="follow" aria-pressed="${on}">${on ? BELL_ON_SVG + ' Following' : BELL_SVG + ' Follow'}</button>
                    <a class="s34-fw-btn s34-fw-search" href="${escapeHtml(plainSearchUrl(word))}" title="The normal search – with every filter and sort">Open as a search ↗</a>`}
                </div>
                <div class="s34-fw-nums">${nums.join('')}</div>
            </div>`;
        head.querySelector('.s34-fw-nm').textContent = name;
    }

    function fwRenderStatus(view) {
        if (!fwState || fwState.key !== view.key) return;
        const el = fwEl('.s34-fw-status');
        el.replaceChildren();
        if (!view.key) return;
        if (view.busy) el.innerHTML = '<span class="s34-spin"></span> Loading posts…';
        else if (view.state === 'cloudflare') el.appendChild(cloudflareInline('The posts wait for a quick Cloudflare check.'));
        else if (view.state === 'error') el.innerHTML = 'The posts couldn\'t be loaded. <button type="button" class="s34-fw-btn" data-fw="retry">Try again</button>';
        else if (view.state === 'done') el.textContent = view.tiles.length ? 'That\'s all of them.' : 'No posts to show here.';
    }

    // The list the popup viewer browses when a tile is opened (see PAGE_LIST in 26-popup.js)
    function fwListFor(view) {
        return {
            thumbs: () => view.tiles.filter(t => t.isConnected),
            state: () => (view.busy ? 'loading' : view.state === 'done' ? 'done' : 'more'),
            more: () => fwLoadMore(view)
        };
    }

    // Near the end of the grid: the next page
    function fwMaybeMore() {
        const view = fwView();
        const sc = fwEl('.s34-fw-scroll');
        if (!view || !sc || view.busy || view.state !== 'more' || !view.key) return;
        if (sc.scrollTop + sc.clientHeight >= sc.scrollHeight - FW_NEAR_END) fwLoadMore(view);
    }

    // ---- Loading: up to FW_PAGE more posts, newest first ----
    // (several sources - "All" with more than 20 artists - are merged: a post
    // is only placed once every source has shown what comes before it)
    async function fwLoadMore(view) {
        if (!fwState || view.busy || view.state === 'done' || !view.key) return;
        view.busy = true;
        if (view.state !== 'more') view.state = 'more';
        fwRenderStatus(view);
        const added = [];
        try {
            while (added.length < FW_PAGE) {
                const live = view.sources.filter(s => s.buf.length || !s.done);
                if (!live.length) break;
                const empty = live.find(s => !s.buf.length);
                if (empty) { await fwFetch(view, empty); continue; }
                let best = live[0];
                live.forEach(s => { if (s.buf[0].id > best.buf[0].id) best = s; });
                const p = best.buf.shift();
                if (view.ids.has(p.id)) continue; // (in two groups, or moved to the next page meanwhile)
                view.ids.add(p.id);
                added.push(p.thumb);
            }
            if (!view.sources.some(s => s.buf.length || !s.done)) view.state = 'done';
        } catch (e) {
            view.state = e.cloudflare || e.paused ? 'cloudflare' : e.cancelled ? 'more' : 'error';
        } finally {
            view.busy = false;
        }
        if (!fwState || fwState.views.get(view.key) !== view) return; // closed meanwhile
        fwAddTiles(view, added);
        fwRenderStatus(view);
        if (view.state === 'cloudflare') {
            window.addEventListener('s34-cf-passed', () => {
                if (fwState && fwState.views.get(view.key) === view && view.state === 'cloudflare') { view.state = 'more'; fwLoadMore(view); }
            }, { once: true });
        }
        if (fwState.key === view.key) { fwRenderHead(view); fwRenderCircles(); setTimeout(fwMaybeMore, 50); }
    }

    async function fwFetch(view, src) {
        const first = !src.started;
        const url = src.next || plainSearchUrl(src.query);
        const r = await loadPage(url, first ? 'popup' : 'scroll', { wanted: () => !!fwState && fwState.views.get(view.key) === view, ms: 20000 });
        if (!r.ok) throw Object.assign(new Error('status ' + r.status), { status: r.status });
        const doc = new DOMParser().parseFromString(r.html, 'text/html');
        const thumbs = Array.from(doc.querySelectorAll('span.thumb')).filter(t => t.querySelector('a[href]') && t.querySelector('img'));
        src.started = true;
        src.next = thumbs.length ? getNextPageUrl(doc) : null;
        if (!src.next || src.next === new URL(url, location.href).href) { src.next = null; src.done = true; }
        if (first) fwLearn(view, src, doc, thumbs);
        // The site hides blacklisted posts only on pages it shows itself
        hideBlocklisted(thumbs);
        // (not lazy: a tile only gets its shape once its picture is there -
        // lazy pictures would make the rows jump while you scroll)
        thumbs.forEach(t => { t.querySelector('img').decoding = 'async'; });
        src.buf.push(...thumbs.filter(t => !t.classList.contains('s34-bl-hidden'))
            .map(t => ({ id: parseInt(thumbPostId(t), 10) || 0, thumb: document.adoptNode(t) })));
        src.buf.sort((a, b) => b.id - a.id);
    }

    // A source's first page: the total, the picture, and everyone on it is
    // now "seen" (like opening their page used to be - the NEW marks stay)
    function fwLearn(view, src, doc, thumbs) {
        const d = getFollowing();
        const ids = thumbs.map(t => parseInt(thumbPostId(t), 10) || 0);
        const seenUpTo = (it, mine) => {
            const max = mine.reduce((m, t) => Math.max(m, parseInt(thumbPostId(t), 10) || 0), 0);
            if (max) { it.seen = Math.max(it.seen || 0, max); it.latest = Math.max(it.latest || 0, max); }
            it.count = 0; it.more = false;
            if (mine.length) it.pic = thumbPicOf(mine[0]) || it.pic;
        };
        src.tags.forEach(tag => {
            const a = findArtist(tag, d);
            if (!a) return;
            const mine = view.key === FW_ALL ? thumbs.filter(t => thumbArtists(t, [tag]).length) : thumbs;
            if (mine.length || view.key !== FW_ALL) seenUpTo(a, mine);
        });
        if (view.key !== FW_ALL) view.total = fwTagCount(doc, src.tags[0]);
        if (ids.length) {
            saveFollowing(d);
            renderFollowBox(d);
        }
    }

    // "1,234 posts": the artist's count from the page's tag list
    function fwTagCount(doc, tag) {
        const li = Array.from(doc.querySelectorAll('#tag-sidebar li')).find(row =>
            Array.from(row.querySelectorAll('a[href*="tags="]')).some(a => {
                try { return (new URL(a.getAttribute('href'), location.href).searchParams.get('tags') || '').trim().toLowerCase() === tag; } catch (e) { return false; }
            }));
        const c = li && (li.querySelector('.tag-count') || Array.from(li.querySelectorAll('span')).find(s => /^\s*[\d,]+\s*$/.test(s.textContent)));
        const n = c ? parseInt(c.textContent.replace(/\D/g, ''), 10) : 0;
        return n > 0 ? n : null;
    }

    function fwIsNew(view, t) {
        const id = parseInt(thumbPostId(t), 10) || 0;
        const tags = view.key === FW_ALL ? thumbArtists(t, view.sources.reduce((all, s) => all.concat(s.tags), [])) : [view.key.slice(2)];
        return tags.some(tag => { const s = fwSeen(fwKeyArtist(tag)); return !!s && id > s; });
    }

    function fwAddTiles(view, tiles) {
        if (!tiles.length) return;
        tiles.forEach(t => {
            t.classList.add('s34-fw-tile');
            t.removeAttribute('style');
            t.querySelector('img').removeAttribute('style');
        });
        setThumbRatios(tiles); // each tile in its picture's shape (--r)
        removeTagTooltips(tiles);
        if (CONFIG.thumbBadges) addThumbBadges(tiles);
        tiles.forEach(t => {
            if (!fwIsNew(view, t)) return;
            view.newN++;
            const b = document.createElement('span');
            b.className = 's34-new-badge';
            b.textContent = 'NEW';
            t.appendChild(b);
        });
        showDownloadedState(tiles); // ⬇ / 👁 in the corner
        // All: whose post it is, at the bottom of the tile
        if (view.key === FW_ALL) {
            const tags = view.sources.reduce((all, s) => all.concat(s.tags), []);
            tiles.forEach(t => {
                const who = thumbArtists(t, tags);
                if (!who.length) return;
                const by = document.createElement('span');
                by.className = 's34-fw-by';
                by.textContent = who.map(prettyTag).join(', ');
                t.appendChild(by);
            });
        }
        view.tiles.push(...tiles);
        if (!view.pic) view.pic = thumbPicOf(tiles[0]);
        if (fwState && fwState.key === view.key) fwEl('.s34-fw-grid').append(...tiles);
    }

    // After a follow / unfollow / check: circles and header up to date
    function fwRefresh() {
        if (!fwState) return;
        fwRenderCircles();
        const v = fwView();
        if (v) fwRenderHead(v);
    }
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
                box.appendChild(a);
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
    // =====================================================================
    //  11. POPUP VIEWER (posts page)
    //  Clicking a thumbnail opens the post on top of the list: large media
    //  on the right, a compact sidebar with Download, info and tags on the
    //  left, comments below the media. ← / → browse, Esc / middle click
    //  closes. Phones: picture on top, swipe to browse, Back closes.
    // =====================================================================

    let popupState = null;  // the post currently shown in the popup
    let popupSeq = 0;       // ignores late answers for a post you already left

    const TYPE_ORDER = ['artist', 'character', 'copyright', 'general', 'metadata'];
    const TYPE_TITLES = {
        artist: 'Artist', character: 'Character', copyright: 'Copyright',
        general: 'General', metadata: 'Meta'
    };

    // Tags with types and counts from a loaded post page
    function readPostTags(doc) {
        const groups = {};
        doc.querySelectorAll('#tag-sidebar li[class*="tag-type-"]').forEach(row => {
            const m = row.className.match(/tag-type-([a-z]+)/);
            const tag = getTagFromRow(row).toLowerCase();
            if (!m || !tag) return;
            const countEl = Array.from(row.querySelectorAll('span'))
                .find(s => /^\s*\d+\s*$/.test(s.textContent));
            (groups[m[1]] = groups[m[1]] || []).push({ tag, count: countEl ? countEl.textContent.trim() : '' });
        });
        return groups;
    }

    // Instant first guess from the thumbnail (types we already know)
    function tagsFromThumb(thumb) {
        const groups = {};
        thumbTagList(thumb).forEach(tag => {
            const type = tagTypes.get(tag) || 'general';
            (groups[type] = groups[type] || []).push({ tag, count: '' });
        });
        return groups;
    }

    // The posts ← / → move through: the page's thumbnails - or, opened from
    // the Following window, that window's grid (popupState.list, Beta 3.6).
    // A list: { thumbs(), state() 'more' | 'loading' | 'done' | null, more() }
    const PAGE_LIST = {
        thumbs: () => Array.from(document.querySelectorAll('.image-list span.thumb'))
            .filter(t => t.isConnected && !t.classList.contains('s34-bl-hidden') && t.offsetParent !== null),
        state: () => (infiniteState ? infiniteState() : null),
        more: () => window.dispatchEvent(new CustomEvent('s34-load-more'))
    };
    const popupList = () => (popupState && popupState.list) || PAGE_LIST;
    function visibleThumbs() { return popupList().thumbs(); }

    function buildPopup() {
        const overlay = document.createElement('div');
        overlay.className = 's34-pv-overlay';
        overlay.innerHTML = `
            <aside class="s34-pv-side">
                <div class="s34-pv-top">
                    <button type="button" class="s34-pv-nav" data-act="prev" title="Previous post (${browseKeyText('prev')})">‹</button>
                    <button type="button" class="s34-pv-nav" data-act="next" title="Next post (${browseKeyText('next')})">›</button>
                    <a class="s34-pv-full" target="_blank" rel="noopener" title="Open the full post page in a new tab">Full post ↗</a>
                    <button type="button" class="s34-pv-iconbtn s34-pv-theaterbtn" data-act="theater" aria-label="Theater mode" title="Theater mode – hide this sidebar, picture uses the whole screen (${keyLabel(CONFIG.theaterKey)})">${THEATER_SVG}</button>
                    <button type="button" class="s34-pv-iconbtn s34-pv-help s34-qmark" data-act="tips" aria-label="Shortcuts and quick tips" title="Shortcuts &amp; quick tips">?</button>
                    <button type="button" class="s34-pv-iconbtn s34-pv-close" data-act="close" aria-label="Close" title="Close (Esc or middle mouse button)">✕</button>
                </div>
                <div class="s34-dl-btn s34-inline" data-act="download"
                     title="Download the original file in maximum resolution, with tags in the filename">${downloadButtonHtml()}</div>
                <div class="s34-pv-row2">
                    <button type="button" class="s34-pv-fav" data-act="fav"></button>
                    <button type="button" class="s34-pv-collect" data-act="collect" title="Save this post in one of your own collections (${keyLabel(CONFIG.collectKey)})">${FOLDER_SVG}<span>Collection</span></button>
                </div>
                <div class="s34-auto">
                    <button type="button" class="s34-auto-toggle"></button>
                    <div class="s34-auto-row">
                        <span>Every</span>
                        <input type="range" min="2" max="30" step="1" aria-label="Seconds per post">
                        <b class="s34-auto-sec"></b>
                    </div>
                    <div class="s34-auto-bar"><i></i></div>
                    <div class="s34-auto-note"></div>
                </div>
                <div class="s34-pv-vopts"></div>
                <div class="s34-pv-info"></div>
                <div class="s34-pv-tags"></div>
            </aside>
            <div class="s34-pv-main">
                <div class="s34-pv-stage" data-act="close"></div>
                <section class="s34-cm-section"></section>
            </div>
            <div class="s34-pv-tbar">
                <button type="button" data-act="prev" title="Previous post (${browseKeyText('prev')})">‹</button>
                <button type="button" data-act="next" title="Next post (${browseKeyText('next')})">›</button>
                <button type="button" data-act="theater" title="Leave theater mode">${THEATER_EXIT_SVG}</button>
                <button type="button" data-act="close" title="Close (Esc or middle mouse button)">✕</button>
            </div>`;
        overlay.querySelector('kbd').textContent = keyLabel(CONFIG.downloadKey);
        makeKeyClickable(overlay.querySelector('.s34-dl-btn'), 'Download the original file');

        overlay.addEventListener('click', e => {
            const actEl = e.target.closest('[data-act]');
            if (!actEl) return;
            const act = actEl.dataset.act;
            // Only a click on the empty stage area closes, not on the media
            if (act === 'close' && actEl.classList.contains('s34-pv-stage') && e.target !== actEl) return;
            if (act === 'close') closePopup();
            else if (act === 'prev') popupStep(-1);
            else if (act === 'next') popupStep(1);
            else if (act === 'download') popupDownload();
            else if (act === 'fav') popupFavourite();
            else if (act === 'tips') openQuickTips();
            else if (act === 'theater') setTheater(!overlay.classList.contains('s34-pv-theater'));
            else if (act === 'collect') {
                const s = popupState;
                if (s) openCollectMenu(actEl, [{ id: postIdFrom(s.postUrl), thumb: popupThumbSrc(s) }]);
            }
        });
        setTheater(GM_getValue(THEATER_KEY, false) === true, overlay);

        if (!CONFIG.favButtons) overlay.querySelector('.s34-pv-fav').remove();
        setupAutoNextControls(overlay);
        overlay.querySelector('.s34-pv-vopts').appendChild(
            makeVideoOptions(() => overlay.querySelector('video.s34-pv-media')));
        setupPopupZoom(overlay);

        // Middle mouse button anywhere in the popup closes it
        // (except on links, which still open in a new tab as usual)
        overlay.addEventListener('mousedown', e => {
            if (e.button === 1 && !e.target.closest('a[href]')) e.preventDefault(); // no auto-scroll icon
        });
        overlay.addEventListener('auxclick', e => {
            if (e.button !== 1 || e.target.closest('a[href]')) return;
            e.preventDefault();
            closePopup();
        });

        // Phones: swipe left / right on the picture = next / previous post,
        // swipe down (while at the top) = close. Not while zoomed in, and not
        // on a video's control bar (that's for seeking).
        const stageEl = overlay.querySelector('.s34-pv-stage');
        let touch = null;
        stageEl.addEventListener('touchstart', e => {
            touch = null;
            if (e.touches.length !== 1 || stageEl.classList.contains('s34-pv-zoomed')) return;
            const t = e.touches[0];
            if (e.target.tagName === 'VIDEO' && t.clientY > e.target.getBoundingClientRect().bottom - 70) return;
            touch = { x: t.clientX, y: t.clientY, time: Date.now(), top: overlay.scrollTop };
        }, { passive: true });
        stageEl.addEventListener('touchend', e => {
            const start = touch;
            touch = null;
            if (!start || e.changedTouches.length !== 1 || Date.now() - start.time > 800) return;
            const t = e.changedTouches[0];
            const dx = t.clientX - start.x, dy = t.clientY - start.y;
            if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
                popupStep(dx < 0 ? 1 : -1);
            } else if (dy > 90 && dy > Math.abs(dx) * 1.5 && start.top <= 0 && overlay.scrollTop <= 0) {
                closePopup();
            }
        }, { passive: true });
        stageEl.addEventListener('touchcancel', () => { touch = null; }, { passive: true });
        return overlay;
    }

    function renderPopupTags() {
        if (!popupState) return;
        const box = popupState.overlay.querySelector('.s34-pv-tags');
        const blockedSet = new Set(readBlocklist().map(t => t.toLowerCase()));
        const following = CONFIG.followButtons ? getFollowing() : null;
        box.replaceChildren();

        TYPE_ORDER.concat(Object.keys(popupState.tags).filter(t => !TYPE_ORDER.includes(t)))
            .forEach(type => {
                const list = popupState.tags[type];
                if (!list || !list.length) return;
                const h = document.createElement('h4');
                h.textContent = TYPE_TITLES[type] || type;
                box.appendChild(h);
                const wrap = document.createElement('div');
                wrap.className = 's34-pv-chips';
                list.forEach(({ tag, count }) => {
                    const chip = makeChip(tag, type, blockedSet);
                    if (count) {
                        const c = document.createElement('span');
                        c.className = 's34-chip-count';
                        c.textContent = count;
                        chip.insertBefore(c, chip.querySelector('.s34-chip-add, .s34-chip-block'));
                    }
                    // Bell (follow): artists only
                    if (following && type === 'artist') chip.append(makeFollowButton(tag, 's34-chip-follow', following));
                    wrap.appendChild(chip);
                });
                box.appendChild(wrap);
            });
        if (!popupState.tagsFromPost) {
            const note = document.createElement('div');
            note.className = 's34-pv-note';
            note.textContent = 'loading full tag list…';
            box.appendChild(note);
        }
    }

    // list: where ← / → go (see PAGE_LIST) - kept while browsing
    function openPopup(thumb, list) {
        const img = thumb.querySelector('img');
        const link = thumb.querySelector('a[href]');
        if (!img || !link) return;
        const myId = ++popupSeq;

        let overlay = popupState ? popupState.overlay : document.querySelector('.s34-pv-overlay');
        if (!overlay) {
            overlay = buildPopup();
            document.body.appendChild(overlay);
        }
        stopPopupMedia();
        document.documentElement.classList.add('s34-pv-open');

        // (a post from a collection: picture or video isn't known until its page is read)
        const typeUnknown = thumb.dataset.s34TypeUnknown === '1';
        let isVideo = isVideoThumb(img);
        // Where the page was when the popup first opened (restored on close)
        const browsing = !!popupState;
        const start = browsing
            ? { startThumb: popupState.startThumb, startScroll: popupState.startScroll, list: popupState.list,
                pushedHistory: popupState.pushedHistory, prevScrollRestoration: popupState.prevScrollRestoration }
            : { startThumb: thumb, startScroll: window.scrollY, list: list || null };
        popupState = Object.assign({
            id: myId, thumb, overlay,
            postUrl: link.href,
            isVideo,
            mediaUrl: null,
            tags: tagsFromThumb(thumb),
            tagsFromPost: false
        }, start);
        overlay.querySelector('.s34-pv-full').href = link.href;
        if (CONFIG.trackDownloads) {
            styleDownloadButton(overlay.querySelector('.s34-dl-btn'), isDownloaded(postIdFrom(link.href)));
        }
        // Opened in the popup = viewed (the list behind shows it at once)
        if (CONFIG.trackViewed) {
            rememberView(postIdFrom(link.href));
            showDownloadedState([thumb]); // just this one, not the whole page
        }
        renderPopupTags();

        // Browsing with ← / →: keep the list underneath in step (also lets
        // infinite scroll load more). The first post opened doesn't move the page.
        if (browsing) thumb.scrollIntoView({ block: 'center' });

        styleFavButton(overlay.querySelector('.s34-pv-fav'), isFav(postIdFrom(link.href)), true);
        // Post info: what the thumbnail knows now, the rest once the post page is read
        {
            const m = thumbTags(img).match(/ score:(-?\d+) /);
            renderPopupInfo(popupState, {
                score: thumb.dataset.s34Score || (m ? m[1] : null),
                size: thumb.dataset.s34Size || ''
            });
        }
        overlay.querySelector('.s34-pv-vopts').hidden = !isVideo;

        // Auto next: the timer starts over for every post
        autoNext.elapsed = 0;
        overlay.querySelector('.s34-auto-bar i').style.width = '0%';
        renderAutoNext();

        // Comments below the media: back to the top, "loading" until the post page is read
        overlay.querySelector('.s34-pv-main').scrollTop = 0;
        overlay.scrollTop = 0; // phone layout: the whole popup scrolls

        // Phones: the Back button closes the popup instead of leaving the page
        if (!browsing && isPhoneLayout()) {
            try {
                popupState.prevScrollRestoration = history.scrollRestoration;
                history.scrollRestoration = 'manual'; // closing must not jump the list
                history.pushState({ s34pv: true }, '');
                popupState.pushedHistory = true;
            } catch (e) {}
        }
        renderComments(popupState, null);

        // ---- media: thumbnail first (instant), then the original ----
        const stage = overlay.querySelector('.s34-pv-stage');
        resetZoom(stage);
        stage.replaceChildren();
        const placeholder = new Image();
        placeholder.className = 's34-pv-media s34-pv-placeholder';
        placeholder.src = img.getAttribute('src') || img.dataset.s34Src || '';
        stage.appendChild(placeholder);

        // The media itself - right away, or once the post page said what it is
        function startMedia(isVideo, directUrl) {
        const el = isVideo ? document.createElement('video') : new Image();
        el.className = 's34-pv-media s34-pv-loading';
        if (isVideo) {
            el.controls = true;
            el.playsInline = true;
            el.autoplay = true;
            applyVideoPrefs(el); // your volume, loop and speed
            if (autoNext.on) el.loop = false; // slideshow: play once, then next
            el.addEventListener('ended', () => {
                if (autoNext.on && popupState && popupState.id === myId) autoAdvance();
            });
        }
        const candidates = directUrl ? [directUrl] : mediaCandidates(img, isVideo);
        let next = 0;
        let triedPost = false;

        function play() {
            el.play().catch(err => {
                if (err.name === 'NotAllowedError' && !el.muted) {
                    autoMute(el); // sound blocked -> muted (not remembered)
                    el.play().catch(() => {});
                }
            });
        }

        async function tryNext() {
            if (!popupState || popupState.id !== myId) return;
            if (next < candidates.length) {
                el.src = candidates[next++];
                if (isVideo) play();
                return;
            }
            if (triedPost) return;
            triedPost = true;
            const media = await getPostMedia(link.href);
            const url = media && (isVideo ? media.video : media.image);
            if (url && popupState && popupState.id === myId) {
                el.src = url;
                if (isVideo) play();
            }
        }

        el.addEventListener(isVideo ? 'loadeddata' : 'load', () => {
            if (!popupState || popupState.id !== myId) return;
            popupState.mediaReady = true; // auto next counts from here
            popupState.mediaUrl = el.currentSrc || el.src;
            rememberMediaHost(isVideo ? 'video' : 'image', popupState.mediaUrl);
            el.classList.remove('s34-pv-loading');
            placeholder.remove();
            preloadNeighbours(thumb); // next / previous ready before you get there
        });
        el.addEventListener('error', tryNext);
        stage.appendChild(el);
        tryNext();
        }
        if (!typeUnknown) startMedia(isVideo);
        else getPostMedia(link.href, 'popup').then(m => {
            if (!popupState || popupState.id !== myId) return;
            isVideo = !!(m && m.video);
            popupState.isVideo = isVideo;
            overlay.querySelector('.s34-pv-vopts').hidden = !isVideo;
            startMedia(isVideo, m && (isVideo ? m.video : m.image));
            if (thumb._s34OnType) thumb._s34OnType(isVideo);
        });

        // ---- full tag list (with counts) from the post page ----
        const loadPostInfo = () => fetchPostDoc(link.href, 'popup').then(doc => {
            if (!popupState || popupState.id !== myId) return;
            if (!doc && cloudflarePaused()) {
                // A Cloudflare check: "Solve check" right in the tag area, and
                // the tags load by themselves once it's solved
                popupState.tagsFromPost = true;
                renderPopupTags();
                const box = popupState.overlay.querySelector('.s34-pv-tags');
                if (box) box.appendChild(cloudflareInline('Tags and info wait for a quick Cloudflare check.'));
                window.addEventListener('s34-cf-passed', () => { if (popupState && popupState.id === myId) loadPostInfo(); }, { once: true });
                return;
            }
            if (!doc) return;
            renderPopupInfo(popupState, readPostInfo(doc));
            renderComments(popupState, readComments(doc));
            const tags = readPostTags(doc);
            if (Object.keys(tags).length) {
                popupState.tags = tags;
                popupState.tagsFromPost = true;
            }
            renderPopupTags();
        });
        loadPostInfo();
        // If the post page can't be loaded, at least drop the "loading" note
        setTimeout(() => {
            if (popupState && popupState.id === myId && !popupState.tagsFromPost) {
                popupState.tagsFromPost = true;
                renderPopupTags();
                if (!popupState.commentsDone) renderComments(popupState, { comments: [], failed: true });
            }
        }, 15000);
    }

    function stopPopupMedia() {
        if (!popupState) return;
        popupState.overlay.querySelectorAll('video').forEach(v => {
            v.pause();
            v.removeAttribute('src');
            v.load();
        });
    }

    // byBack: closed by the phone's Back button (the history step is already taken)
    function closePopup(byBack) {
        if (!popupState) return;
        const s = popupState;
        if (autoNext.on) stopAutoNext();
        stopPopupMedia();
        s.overlay.remove();
        popupState = null;
        document.documentElement.classList.remove('s34-pv-open');
        // a window the popup was opened from (a collection) comes back
        // (a moment later: the Esc that closed the popup mustn't close the window too)
        setTimeout(() => document.querySelectorAll('.s34-under-popup').forEach(o => o.classList.remove('s34-under-popup')), 0);
        // Still on the post you opened? Back to exactly where you were.
        // (Browsed on with ← / →? Then the list stays at the last post.)
        if (s.thumb === s.startThumb) window.scrollTo(0, s.startScroll);
        if (s.pushedHistory) {
            // Take back the extra history step from opening (unless Back did that)
            try {
                if (byBack !== true && history.state && history.state.s34pv) history.back();
                setTimeout(() => { history.scrollRestoration = s.prevScrollRestoration || 'auto'; }, 600);
            } catch (e) {}
        }
    }

    // Phones: the Back button closes the popup
    window.addEventListener('popstate', () => { if (popupState) closePopup(true); });

    function popupStep(dir) {
        if (!popupState) return;
        const list = visibleThumbs();
        const i = list.indexOf(popupState.thumb);
        const target = list[i + dir];
        if (target) {
            openPopup(target);
            // 3 posts before the end: the next page starts loading already
            if (dir > 0 && list.length - (i + 2) <= 3) askForMorePosts();
        } else if (dir > 0) {
            stepWhenMoreArrive(popupState.thumb, list.length);
        }
    }

    // Browsing on past the last loaded post: load the next page and go on
    // (Beta 3.5.1 - before, the popup stopped with "scroll down to load more")
    function askForMorePosts() {
        const list = popupList(), st = list.state();
        if (!st || st === 'done') return false;
        list.more();
        return true;
    }
    let waitingForMore = false;
    async function stepWhenMoreArrive(fromThumb, hadCount) {
        if (waitingForMore) return;
        const list = popupList();
        if (!list.state()) { showToast('That was the last post on this page.'); return; }
        waitingForMore = true;
        // the list behind the popup goes to this post, so the new page lands
        // near the window (and isn't tidied away as "far off" right away)
        try { fromThumb.scrollIntoView({ block: 'center' }); } catch (e) {}
        try {
            for (let attempt = 0; attempt < 3; attempt++) {
                if (list.state() === 'done') { showToast('That was the last post.'); return; }
                if (cloudflarePaused()) { showToast('More posts wait for the quick Cloudflare check.', 'Solve check', openCloudflarePanel, 10000); return; }
                if (attempt === 0) showToast('Loading more posts…');
                askForMorePosts();
                // wait for the page to arrive (up to ~15 s)
                for (let t = 0; t < 60; t++) {
                    await new Promise(r => setTimeout(r, 250));
                    if (!popupState || popupState.thumb !== fromThumb) return; // closed or moved meanwhile
                    if (list.state() !== 'loading' && visibleThumbs().length > hadCount) break;
                }
                if (visibleThumbs().length > hadCount) { popupStep(1); return; }
                // (a page where every post was hidden - try the next one)
            }
            showToast('No more posts to show right now.');
        } finally {
            waitingForMore = false;
        }
    }

    async function popupFavourite() {
        if (!popupState) return;
        const state = popupState;
        const id = postIdFrom(state.postUrl);
        const btn = state.overlay.querySelector('.s34-pv-fav');
        if (isFav(id)) { showToast('Already in your favourites ♥'); return; }
        if (!btn || btn.classList.contains('s34-busy')) return;
        setBusy(btn, true);
        const ok = await addFavourite(id);
        setBusy(btn, false);
        if (ok) {
            styleFavButton(btn, true, true);
            const heart = state.thumb && state.thumb.querySelector('.s34-fav-btn');
            styleFavButton(heart, true, false);
        }
    }

    async function popupDownload() {
        if (!popupState) return;
        const state = popupState;
        let url = state.mediaUrl;
        if (!url) {
            // Media not shown yet: ask the post page for the original
            const media = await getPostMedia(state.postUrl);
            url = media && (state.isVideo ? media.video : media.image);
        }
        if (!url) {
            showToast('Original file not found yet – try again in a moment.');
            return;
        }
        const names = type => (state.tags[type] || []).map(t => t.tag);
        // Resolution for the file name: from the post page (already loaded
        // for the popup's info box), else what hovering the thumbnail found
        const doc = await fetchPostDoc(state.postUrl);
        const size = (doc && readPostSize(doc)) || ((state.thumb && state.thumb.dataset.s34Size) || '').replace('×', 'x');
        downloadOriginal(url, {
            copyright: names('copyright'),
            character: names('character'),
            artist: names('artist')
        }, postIdFrom(state.postUrl), false, size);
    }

    // Posts always open in the popup (Ctrl / middle click still opens the
    // full post page in a new tab)
    document.addEventListener('click', e => {
        if (isPostView) return;
        if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return; // ctrl/middle-click = normal
        if (e.target.closest('.s34-tagbar')) return; // tag chips keep their own clicks
        const a = e.target.closest('.image-list span.thumb a[href]');
        if (!a) return;
        e.preventDefault();
        e.stopPropagation();
        openPopup(a.closest('span.thumb'));
    }, true);

    document.addEventListener('keydown', e => {
        if (!popupState) return;
        const t = e.target;
        if (t.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName)) return;
        if (document.querySelector('.s34-overlay:not(.s34-under-popup)')) return; // settings / Cloudflare window on top
        if (document.querySelector('.s34-follow-menu')) return; // "Follow which artist?" handles its own keys
        if (e.key === 'Escape') { e.preventDefault(); closePopup(); return; }
        if (e.ctrlKey || e.metaKey || e.altKey) return;          // Ctrl+D etc. stay the browser's
        const dir = browseDirection(e);
        if (dir) { e.preventDefault(); popupStep(dir); return; }
        if (e.code === CONFIG.downloadKey || e.repeat) return;    // the download key wins
        const ov = document.querySelector('.s34-pv-overlay');
        if (!ov) return;
        // W / S scroll the picture & comments (when WASD is on)
        if (CONFIG.browseKeys !== 'arrows' && (e.code === 'KeyW' || e.code === 'KeyS')) {
            const main = ov.querySelector('.s34-pv-main');
            const scroller = main && main.scrollHeight > main.clientHeight + 4 ? main : ov;
            e.preventDefault();
            scroller.scrollBy({ top: (e.code === 'KeyS' ? 1 : -1) * Math.round(scroller.clientHeight * 0.7), behavior: 'smooth' });
            return;
        }
        // L (changeable): follow / unfollow the post's artist
        if (e.code === CONFIG.followKey) {
            e.preventDefault();
            const artists = ((popupState.tags && popupState.tags.artist) || []).map(a => (a && a.tag) || a).filter(a => typeof a === 'string' && a);
            if (!artists.length) { showToast('This post has no artist tag to follow.'); return; }
            // one artist: follow right away (with Undo); several: a small menu to choose
            followArtistByKey(artists, popupState.overlay.querySelector('.s34-chip-artist'));
            return;
        }
        // F / C / T (changeable): favourite, collection, theater mode
        const act = e.code === CONFIG.favKey ? 'fav' : e.code === CONFIG.collectKey ? 'collect' : e.code === CONFIG.theaterKey ? 'theater' : '';
        if (act) {
            const btn = ov.querySelector('.s34-pv-side [data-act="' + act + '"]') || ov.querySelector('[data-act="' + act + '"]');
            if (btn && !btn.disabled) { e.preventDefault(); btn.click(); }
        }
    }, true);

    // ← / → and / or A / D (Settings → Viewing posts). A / D by key position
    // (e.code), so it also fits AZERTY & co. The download key wins if it's A or D.
    function browseDirection(e) {
        const mode = CONFIG.browseKeys;
        if (mode !== 'wasd') {
            if (e.key === 'ArrowLeft') return -1;
            if (e.key === 'ArrowRight') return 1;
        }
        if (mode === 'wasd' || mode === 'both') {
            if (e.code === CONFIG.downloadKey || e.shiftKey) return 0;
            if (e.code === 'KeyA') return -1;
            if (e.code === 'KeyD') return 1;
        }
        return 0;
    }

    // "← / →", "A / D" or "← / → or A / D" for tips and tooltips
    function browseKeyText(which) {
        const arrows = which === 'prev' ? '←' : which === 'next' ? '→' : '← / →';
        const wasd = which === 'prev' ? 'A' : which === 'next' ? 'D' : 'A / D';
        if (CONFIG.browseKeys === 'wasd') return wasd;
        if (CONFIG.browseKeys === 'both') return arrows + ' or ' + wasd;
        return arrows;
    }

    // ---- Phones: one Menu button instead of the site's two ☰ ----
    // The site splits its phone menu in two (main pages / this section).
    // Steamy34 shows one clear button that opens a side panel with:
    //  - "Steamy34": its own tools (switches, Collections · Stats, Blacklist,
    //    Settings, tips) - on a phone they'd otherwise sit below the posts,
    //    out of reach because infinite scroll keeps loading more,
    //  - the site's pages, built from its own links.
    // If the site's links can't be found, its own ☰ buttons stay.
    const MENU_SVG = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';

    function setupPhoneMenu() {
        if (!isPhoneLayout() || document.querySelector('.s34-menu-btn')) return;
        const read = sel => {
            const seen = new Set();
            return Array.from(document.querySelectorAll(sel)).map(a => ({
                text: a.textContent.replace(/\s+/g, ' ').trim(),
                href: a.getAttribute('href') || '',
                current: !!a.closest('li.current-page, li[class*="current"]')
            })).filter(l => l.text && l.href && !/^\s*(#|javascript:)/i.test(l.href) && !seen.has(l.href) && seen.add(l.href));
        };
        const siteMenu = !!document.querySelector('label.tlabel');
        const main = siteMenu ? read('#navbar a') : [];
        const sub = siteMenu ? read('#subnavbar a') : [];
        if (siteMenu) console.log('[Steamy34] Phone menu:', main.length, 'site links,', sub.length, 'section links.');

        // Steamy34's own tools on the posts page (the gear is the anchor the
        // other tools are placed around, so they all end up in here)
        const gear = !isPostView && document.querySelector('.s34-gear.s34-inline');
        if (!main.length && !sub.length && !gear) return;

        let tools = null;
        if (gear) {
            tools = document.createElement('div');
            tools.className = 's34-menu-tools';
            document.body.appendChild(tools); // hidden until the menu opens
            tools.appendChild(gear);
        }

        const header = document.getElementById('header');
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 's34-menu-btn' + (header ? '' : ' s34-menu-btn-fixed');
        btn.title = 'Menu';
        btn.setAttribute('aria-label', 'Menu');
        btn.innerHTML = MENU_SVG;
        (header || document.body).appendChild(btn);
        if (main.length || sub.length) document.documentElement.classList.add('s34-phone-menu');

        btn.addEventListener('click', () => {
            if (document.querySelector('.s34-menu-overlay')) return;
            const overlay = document.createElement('div');
            overlay.className = 's34-menu-overlay';
            overlay.innerHTML = `
                <nav class="s34-menu" aria-label="Menu">
                    <div class="s34-menu-head"><b>Menu</b><button type="button" class="s34-menu-x" aria-label="Close">✕</button></div>
                </nav>`;
            const panel = overlay.querySelector('.s34-menu');
            const label = text => {
                const h = document.createElement('div');
                h.className = 's34-menu-label';
                h.textContent = text;
                panel.appendChild(h);
            };
            const section = (title, links) => {
                if (!links.length) return;
                label(title);
                const list = document.createElement('div');
                list.className = 's34-menu-list';
                links.forEach(l => {
                    const a = document.createElement('a');
                    a.href = l.href;
                    a.textContent = l.text;
                    if (l.current) a.classList.add('s34-on');
                    list.appendChild(a);
                });
                panel.appendChild(list);
            };
            if (tools) {
                label('Steamy34');
                panel.appendChild(tools); // moved in while the menu is open
            }
            const here = main.find(l => l.current);
            section('rule34', main);
            section(here ? here.text : 'This section', sub);

            function close() {
                document.removeEventListener('keydown', onKey, true);
                overlay.classList.remove('s34-show');
                setTimeout(() => {
                    if (tools) document.body.appendChild(tools); // back into hiding
                    overlay.remove();
                }, 200);
            }
            function onKey(e) {
                if (e.key !== 'Escape' || document.querySelector('.s34-overlay')) return;
                e.preventDefault();
                e.stopPropagation();
                close();
            }
            overlay.addEventListener('click', e => {
                if (e.target === overlay || e.target.closest('.s34-menu-x')) { close(); return; }
                // A tool that opens a window (or select mode): the menu steps
                // aside so the window is on top. Switches & sliders keep it open.
                if (e.target.closest('.s34-menu-tools .s34-gear, .s34-menu-tools .s34-blbtn, .s34-menu-tools .s34-follow-box a[data-fb]:not([data-fb="more"]), .s34-menu-tools .s34-follow-box a[data-fs], .s34-menu-tools .s34-hub button, .s34-menu-tools .s34-tipslink button, .s34-menu-tools .s34-q-select')) close();
            }, true); // (checked before the tool reacts: opening the Following window
                      // redraws the Following list, and the tapped row would be gone)
            document.addEventListener('keydown', onKey, true);
            document.body.appendChild(overlay);
            requestAnimationFrame(() => overlay.classList.add('s34-show'));
        });
    }

    // Clickable Download button on single post pages, showing the hotkey
    function addDownloadButton() {
        if (!getOriginalUrl()) return;
        const btn = document.createElement('div');
        btn.className = 's34-dl-btn';
        btn.title = 'Download the original file with tags in the filename';
        btn.innerHTML = downloadButtonHtml();
        btn.querySelector('kbd').textContent = keyLabel(CONFIG.downloadKey);
        btn.addEventListener('click', downloadOriginal);
        makeKeyClickable(btn, 'Download the original file');

        const slot = getPostSidebarSlot();
        if (slot) {
            btn.classList.add('s34-inline');
            slot.prepend(btn);
        } else {
            document.body.appendChild(btn);
        }
        if (CONFIG.trackDownloads) styleDownloadButton(btn, isDownloaded(params.get('id')));
    }

    onReady(() => {
        if (isPostView && CONFIG.showDownloadButton) addDownloadButton();
        if (CONFIG.hideListTags && !isPostView) {
            hideListTagsHeading();
            hideSidebarImagesBelowTags();
            // Banners are sometimes inserted late - check again
            window.addEventListener('load', hideSidebarImagesBelowTags);
            setTimeout(hideSidebarImagesBelowTags, 2000);
        }
        addSettingsButton();
        setupPhoneMenu();      // phones: one Menu button instead of the site's two ☰
        showFlashMessage();    // e.g. "Backup imported" after the reload
        if (!isPostView && CONFIG.infiniteScroll) setupInfiniteScroll();
        removeTagTooltips();
        moveFollowedSearchesToRecent(); // followed / saved searches -> Recent (once, Beta 3.6: Following is for artists)
        if (CONFIG.searchChips) setupChipSearch();
        else if (CONFIG.searchMultiline) setupMultilineSearch();
        setupQuickPanel();     // hide viewed / downloaded, size slider, select mode
        addBlacklistButton();  // opens the blacklist window
        addHub();              // Collections · Stats
        addFollowBox();        // "Following": artists + searches with "N new" each (above Collections · Stats)
        // an old Following page address opens the Following window; a normal
        // search for a followed artist / search counts as a visit (NEW marks)
        if (!openFollowFromAddress()) setupFeedPage();
        if (isPostView) addFollowButtonsToRows(); // bell next to artists
        setupHome();           // rule34's start page as a small home (search, continue, recent, following)
        setTimeout(() => checkFollowing(), 6000); // quiet "N new" count
        trimDlHistory();
        addPostCollectButton(); // single posts: "Save to collection"
        addTipsLink();         // "? Shortcuts & tips" under the settings button
        arrangeSidebarTools(); // Following above View; Collections · Stats · Blacklist · Settings as one 2×2 block
        maybeShowQuickTips();  // once: the most important keys & clicks
        setupScreenshotMode(); // Censored mode: X blurs every picture (safe screenshots)
        checkSiteShape();      // rule34 changed its layout? a calm note instead of half-working features
        maybeAskForRating();   // once ever, after a week of use
        setupResume();         // "Continue at page N" + remembers where you are
        updateTabBadge();      // "(12) rule34" while there are new posts
        if (isPostView) setupPostVideoOptions();
        if ((CONFIG.hoverPreview || CONFIG.hoverHighRes) && !isPostView) setupHoverPreview();
        if (CONFIG.blocklistButtons) addBlocklistButtons();
        rememberSearch();
        if (isPostView && CONFIG.addToSearchButtons) addSearchButtons();
        if (CONFIG.thumbGrid && CONFIG.thumbLayout === 'justified') setThumbRatios();
        if (CONFIG.thumbGrid && CONFIG.thumbBadges) addThumbBadges();
        if (isPostView) rememberView(params.get('id')); // opening a post = viewed
        showDownloadedState(); // ✓ / 👁 on posts you already downloaded / viewed
        addFavButtons();
        setupHoverInfo();
        learnTagTypes(document); // remember tag types from this page's tag list
        if (isPostView) {
            // Remember which server holds the media, for hover previews later
            const orig = getOriginalUrl();
            if (orig) rememberMediaHost(/\.(mp4|webm)(\?|$)/i.test(orig) ? 'video' : 'image', orig);
        }
        if (!isPostView && CONFIG.thumbTagBar) setupTagBars();
        if (!isPostView) foldEmptyAdColumn(); // empty ad column (ad blocker on) - checked right away
    });

    console.log('[Steamy34] ' + CURRENT_VERSION + ' loaded (steamycorner - https://linktr.ee/steamycorner).' +
        (isPostView ? ` Press ${keyLabel(CONFIG.downloadKey)} to download.` : ''));

    // Steamy34 icon: a steaming cup (drawn as SVG, embedded so no extra download is needed)
    function logoData() {
        const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff5f8f"/><stop offset="1" stop-color="#8b3dff"/></linearGradient></defs><rect width="64" height="64" rx="15" fill="url(#g)"/><g fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" opacity=".95"><path d="M22 26c-3.2-3 3.2-5.6 0-8.6s3.2-5.6 0-8.4"/><path d="M31 26c-3.2-3 3.2-5.6 0-8.6s3.2-5.6 0-8.4"/><path d="M40 26c-3.2-3 3.2-5.6 0-8.6s3.2-5.6 0-8.4"/></g><path d="M14 31h34v7a13 13 0 0 1-13 13h-8a13 13 0 0 1-13-13z" fill="#fff"/><path d="M47.5 34.5h2.5a5.5 5.5 0 0 1 0 11h-4" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round"/><rect x="11" y="53" width="40" height="3.4" rx="1.7" fill="#fff" opacity=".9"/></svg>';
        return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    }
})();
