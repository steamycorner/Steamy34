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
        /* Settings → API key (optional, Beta 3.7) */
        .s34-api-hero { display: flex; align-items: center; gap: 12px; padding: 12px 14px; margin-bottom: 6px; border-radius: 12px; border: 1px solid rgba(95,208,138,0.35) !important; background: rgba(95,208,138,0.08) !important; color: #cfeedd !important; }
        .s34-api-hero b { color: #9fe3b8 !important; }
        .s34-api-icon { flex: none; width: 36px; height: 36px; border-radius: 10px; display: grid; place-items: center; background: linear-gradient(135deg, #ff5f8f, #8b3dff) !important; color: #fff !important; }
        .s34-api-icon svg * { color: inherit !important; }
        .s34-api ul { margin: 4px 0 10px; padding-left: 20px; }
        .s34-api li { margin: 3px 0; line-height: 1.45; }
        .s34-api-promises { list-style: none; padding-left: 0 !important; }
        .s34-api-promises li { position: relative; padding-left: 24px; }
        .s34-api-promises li::before { content: '✓'; position: absolute; left: 4px; top: 0; font-weight: 800; color: #5fd08a !important; }
        .s34-api code { padding: 1px 5px; border-radius: 4px; background: #24242a !important; font-size: 12px; }
        .s34-api-row { display: flex; gap: 8px; margin: 6px 0 8px; }
        .s34-api .s34-api-input { flex: 1; min-width: 0; height: 34px; box-sizing: border-box; padding: 0 10px !important; border-radius: 8px; border: 1px solid #3a3a44 !important; background: #0d0d10 !important; color: #e8e8ee !important; font: 13px ui-monospace, SFMono-Regular, Consolas, monospace; }
        .s34-api .s34-api-input:focus { outline: none; border-color: #8b3dff !important; }
        .s34-api-status { min-height: 18px; margin: 2px 0 8px; font-size: 12.5px; color: #a9a9b3 !important; }
        .s34-api-status.s34-api-ok { color: #5fd08a !important; }
        .s34-api-status.s34-api-bad { color: #ff8a8a !important; }
        .s34-api-ask { color: #b9b9c3 !important; }
        .s34-api-terms { margin-top: 10px !important; font-size: 11.5px; color: #8e8e9a !important; }
        /* Pages without the sidebar (favourites, My Account, Options…): an item
           at the end of rule34's own menu at the top, instead of the corner */
        #navbar li.s34-nav-steamy { display: inline-block; }
        .s34-gear.s34-gear-nav {
            position: static; z-index: auto; opacity: 1; filter: none;
            display: inline-flex; align-items: center; gap: 7px;
            padding: 5px 14px 5px 10px; border-radius: 999px;
            border: 1px solid transparent !important; background-color: transparent !important; /* (beats the general box look) */
            font-weight: 600; color: var(--s34-fg) !important;
            transition: background-color .15s ease, border-color .15s ease;
        }
        .s34-gear.s34-gear-nav img { height: 20px; border-radius: 5px; }
        .s34-gear.s34-gear-nav span { color: inherit !important; }
        .s34-gear.s34-gear-nav:hover { transform: none; background-color: var(--s34-panel-2) !important; border-color: var(--s34-border) !important; color: #fff !important; }

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
        /* (Beta 3.8) The label floated over the ♥ next to it - the browser's own
           tooltip (title) says it now, so nothing covers anything */
        .s34-dl-mark::after { display: none !important; }
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
