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
