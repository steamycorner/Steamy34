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
        /* Saved searches (Beta 3.7): the same box, a disk instead of a bell, plain-coloured rows */
        .s34-saved-box[hidden] { display: none !important; }
        .s34-saved-box .s34-follow-head svg { color: #8ab4f8 !important; }
        .s34-saved-box .s34-follow-head a:hover { color: #8ab4f8 !important; }
        .s34-follow-box.s34-saved-box a.s34-follow-row:is(:link, :visited) { color: #d6d6de !important; }
        .s34-saved-box .s34-follow-row.s34-on { background-color: rgba(138,180,248,0.12) !important; }
        .s34-saved-item { display: flex; align-items: center; gap: 2px; }
        .s34-saved-item .s34-follow-row { flex: 1; min-width: 0; }
        .s34-follow-box .s34-saved-x {
            all: unset; box-sizing: border-box; flex: none; width: 22px; height: 22px; border-radius: 6px;
            display: grid; place-items: center; cursor: pointer; font-size: 10px; line-height: 1;
            color: #9a9aa6 !important; background: transparent !important; opacity: .55;
        }
        .s34-follow-box .s34-saved-x:hover, .s34-follow-box .s34-saved-x:focus-visible { opacity: 1; color: #ff6b6b !important; background-color: rgba(255,255,255,0.08) !important; }
        .s34-follow-box .s34-saved-x:focus-visible { outline: 2px solid #8ab4f8; }
        @media (max-width: 760px) { .s34-follow-box .s34-saved-x { width: 34px; height: 34px; font-size: 12px; opacity: .8; } }
        .s34-follow-grouphead { display: flex; align-items: center; gap: 6px; margin: 14px 0 6px; font: 800 10.5px system-ui, -apple-system, Segoe UI, sans-serif; letter-spacing: .8px; text-transform: uppercase; color: #9a9aa6 !important; }
        .s34-follow-grouphead svg { width: 13px; height: 13px; color: #8ab4f8 !important; }
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
