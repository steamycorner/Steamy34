    // ---- Quick tips: the most important keys & clicks at a glance ----
    // Shown once after installing (or updating to a version with new tips);
    // reopen it any time with the "?" in the popup or in the settings.
    const TIPS_KEY = 'steamy34_tips_seen';
    const TIPS_VERSION = 8; // raise this when the tips get new entries -> shown once more

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
            [`${k('Recent')}`, 'Run your earlier searches again'],
            [`${k(BELL_SVG.replace('width="16" height="16"', 'width="13" height="13"') + ' Follow')} under the search box`, `${nu}Follow the whole search – it shows up in the sidebar with a count of its new posts`]
        ]];
        const sidebarGroup = ['Sidebar', SLIDERS, [
            [`${k('White')} ${k('Dark')} ${k('OLED')}`, 'Colour mode – in Settings → Look (OLED is true black)'],
            [`${k('Hide viewed')} / ${k('Hide downloaded')}`, 'Only show posts you haven\'t seen / saved yet'],
            [`${k('Size')} slider`, 'Make the thumbnails bigger or smaller'],
            [`${k('⬇ Batch download')}`, 'Tick posts (or "Select all new"), then download them – a panel shows progress with Pause / Cancel – or add them to a collection'],
            [`${k('Collections')} · ${k('Stats')}`, 'Your own folders · your top artists, characters & series'],
            [`${k(BELL_SVG.replace('width="16" height="16"', 'width="13" height="13"') + ' Following')}`, `${nu}Everything you follow, each with a count of its new posts – the bell next to an artist in a post (or under the search box) follows it`],
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
                    [`${k(keyLabel(CONFIG.favKey))} ${k(keyLabel(CONFIG.collectKey))} ${k(keyLabel(CONFIG.theaterKey))}`, `${nu}Favourite · add to a collection · theater mode (keys changeable in Settings → Viewing posts)`],
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
                    [`${k('Hover')} a thumbnail`, 'Videos play, images load in full quality, score & size show up'],
                    [`${k('+')} / ${k('⊘')} on a tag`, 'Add the tag to your search / blacklist it'],
                    [`${k('Shift')} + ${k('+')}`, 'Exclude the tag from your search (-tag)'],
                    [`${k('⬇')} / ${k(EYE)} in a corner`, 'You already downloaded / viewed this post'],
                    [`${k('X')}`, `${nu}Screenshot mode: blurs every picture and video (also in the popup) – X again to turn it off`],
                    [`"Quick check needed" at the top`, 'Cloudflare wants a robot check – click "Solve check"; some loading waits until then']
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
                    [`${k('♥')} on a thumbnail`, 'Add the post to your favourites (needs a rule34 login)'],
                    [`${k('⬇')} / ${k(EYE)} in a corner`, 'You already downloaded / viewed this post'],
                    [`"Quick check needed" at the top`, 'Cloudflare wants a robot check – tap "Solve check"'],
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
                    <li>Something awkward or broken? Tell steamycorner: <a href="https://linktr.ee/steamycorner" target="_blank" rel="noopener noreferrer">linktr.ee/steamycorner</a> – it helps make the touch version better.</li>
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
                    ['🕘', 'Recent searches', 'Run your earlier searches again with one ' + (phone ? 'tap' : 'click') + '.'],
                    [BELL_SVG, 'Follow', (phone ? 'Tap' : 'Click') + ' the bell next to an artist in a post – or under the search box to follow a whole search. The sidebar lists them, each with a count of its new posts.']
                ]
            },
            {
                art: ic('downloads'), step: '3 · Downloads',
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
                art: FOLDER_SVG, step: '4 · Organise',
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
                art: ic('look'), step: '5 · Thumbnails',
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
                art: SPARKLE_SVG, step: '6 · Make it yours',
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
                    ['💌', 'Say hi', 'Ideas or bugs? <a href="https://linktr.ee/steamycorner" target="_blank" rel="noopener noreferrer">linktr.ee/steamycorner</a> – every report helps.']
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
        // Short tour first (welcome, popup, search, downloads); the rest
        // (organise, thumbnails, colours) only after "Show me more"
        const SHORT = 4;
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

