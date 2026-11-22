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
        accountPages: true,      // My Account and Options in Steamy34's look (Beta 3.7)
        matchSiteTheme: true,    // keep rule34's own Light / Dark theme in step with the colour mode (no white flash)
        videoServer: 'default',  // rule34's 'Preferred CDN location': default, eu, cusa, eusa, wusa, api
        siteSuggestions: false,  // rule34's own tag suggestion list (Steamy34 has its own in the search box)
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
            ['accountPages', 'Steamy34 look for My Account and Options', { hint: 'Tiles instead of a list of links on My Account, and rule34\'s Options sorted into groups – with tag bubbles for the blacklist. Off: the site\'s own pages' }],
            ['matchSiteTheme', 'Match rule34\'s own theme', { adv: true, hint: 'Sets rule34\'s Light / Dark theme (in its Options) to fit your colour mode, so pages don\'t flash white while they load' }],
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
            ['videoServer', 'Video server', { options: { default: 'Default (rule34 picks)', eu: 'EU', cusa: 'Central USA', eusa: 'East USA', wusa: 'West USA', api: 'API-CDN' }, hint: 'Videos stall or won\'t start? Try another server. The same as \"Preferred CDN location\" in rule34\'s Options' }],
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
            ['siteSuggestions', 'rule34\'s own suggestion list', { adv: true, hint: 'The site\'s list under tag boxes, e.g. when you edit a post\'s tags. Off by default – Steamy34\'s suggestions in the search box don\'t need it' }],
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

