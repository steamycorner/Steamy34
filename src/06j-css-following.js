    // Following feed: bell buttons, sidebar box, feed bar, Manage window
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
        .s34-feed-bar .s34-feed-btn, .s34-follow-win .s34-follow-addbtn { display: inline-flex; align-items: center; gap: 6px; }
        .s34-feed-btn svg, .s34-follow-addbtn svg { width: 14px; height: 14px; color: #ffb347 !important; }
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
        /* A followed search: magnifier + its words, in the search blue */
        .s34-follow-row.s34-follow-srow { color: #8ab4f8 !important; }
        .s34-follow-srow svg { flex: none; width: 12px; height: 12px; margin-right: -1px; opacity: .8; }
        .s34-follow-chip.s34-follow-schip a { color: #8ab4f8 !important; }
        .s34-feed-head b.s34-feed-q { color: #8ab4f8 !important; }
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

        /* The feed page: a bar above the posts */
        /* One calm line: [bell] name · what's new ........ [Following] [Manage] */
        .s34-feed-bar {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 8px 12px;
            margin: 6px 0 4px;
            padding: 8px 10px 8px 14px;
            border-radius: 10px;
            border: 1px solid #2e2e36 !important;
            border-left: 3px solid #ffb347 !important;
            background-color: #18181c !important;
            color: #dcdce0 !important;
            font: 13px/1.4 system-ui, -apple-system, Segoe UI, sans-serif;
        }
        .s34-feed-head { display: flex; align-items: baseline; flex-wrap: wrap; gap: 2px 8px; min-width: 0; flex: 1 1 auto; }
        .s34-feed-head svg { align-self: center; flex: none; color: #ffb347 !important; }
        .s34-feed-head svg * { color: inherit !important; }
        .s34-feed-head b { font-size: 15px; color: #fff !important; }
        .s34-feed-head b.s34-feed-artist { color: #ff8a80 !important; }
        .s34-feed-sub { font-size: 12px; opacity: .65; color: #dcdce0 !important; }
        .s34-feed-tags { display: flex; flex-wrap: wrap; gap: 5px; flex: 1 1 260px; min-width: 0; }
        .s34-feed-tag, .s34-follow-chip a {
            text-decoration: none !important;
            font-weight: 600;
        }
        .s34-feed-tag {
            padding: 1px 8px;
            border-radius: 999px;
            border: 1px solid rgba(255,255,255,0.14) !important;
            background-color: rgba(18,18,22,0.85) !important;
            font-size: 11.5px;
        }
        .s34-feed-tag:hover, .s34-follow-chip a:hover { text-decoration: underline !important; }
        .s34-feed-artist, .s34-feed-artist a { color: #ff8a80 !important; }
        .s34-feed-character, .s34-feed-character a { color: #7ee07e !important; }
        .s34-feed-copyright, .s34-feed-copyright a { color: #d68cff !important; }
        .s34-feed-general, .s34-feed-general a { color: #8ab4f8 !important; }
        .s34-feed-groups { display: flex; gap: 4px; }
        .s34-feed-groups a {
            padding: 1px 8px;
            border-radius: 6px;
            border: 1px solid #3a3a44 !important;
            font-size: 11.5px;
            color: #dcdce0 !important;
            text-decoration: none !important;
        }
        .s34-feed-groups a.s34-on { border-color: #ffb347 !important; color: #ffb347 !important; }
        .s34-feed-bar .s34-feed-btn, .s34-follow-win .s34-follow-act, .s34-follow-win .s34-follow-addbtn {
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
        /* The buttons stay together on the right */
        .s34-feed-bar .s34-feed-btn { margin-left: 0; height: 28px; padding: 0 12px !important; }
        .s34-feed-bar .s34-feed-btn[data-f="unfollow"] { border-color: rgba(255,179,71,0.45) !important; }
        .s34-feed-bar .s34-feed-btn:hover, .s34-follow-win .s34-follow-act:hover, .s34-follow-win .s34-follow-addbtn:hover { border-color: #ffb347 !important; }

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
        .s34-follow-group { margin-top: 4px; font-size: 10.5px; font-weight: 800; letter-spacing: .8px; text-transform: uppercase; opacity: .55; }
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
        /* Per-artist filter inside the artist's chip */
        .s34-follow-chip select.s34-follow-afilter {
            height: 20px;
            margin: 0 0 0 6px !important;
            padding: 0 2px !important;
            border-radius: 5px;
            border: 1px solid rgba(255,255,255,0.12) !important;
            background-color: rgba(0,0,0,0.25) !important;
            color: #b9b9c3 !important;
            font: 11px system-ui, sans-serif;
            cursor: pointer;
        }
        .s34-follow-empty { padding: 14px 4px; font-size: 13px; line-height: 1.55; opacity: .75; }
        .s34-follow-filter { padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.08) !important; }
        .s34-follow-label { font-size: 12.5px; font-weight: 700; margin-bottom: 8px; }
        .s34-follow-label span { font-weight: 400; opacity: .55; }
        .s34-follow-filters { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
        .s34-follow-filters label { display: flex; flex-direction: column; gap: 4px; font-size: 11px; opacity: .85; }
        .s34-follow-filters select { height: 30px; border-radius: 7px; font-size: 12.5px; }
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
            /* Phones: left-aligned, a bit smaller, buttons in one row below */
            .s34-feed-bar { text-align: left; padding: 8px 10px 8px 12px; }
            .s34-feed-head b { font-size: 14px; }
            .s34-feed-head { flex-basis: 100%; }
            .s34-follow-filters { grid-template-columns: 1fr; }
            .s34-feed-bar .s34-feed-btn { margin-left: 0; }
            .s34-chip .s34-chip-follow { padding: 0 8px 0 4px; }
            .s34-chip .s34-chip-follow svg { width: 15px; height: 15px; }
        }
    `;
