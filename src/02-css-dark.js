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

