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
        .s34-win .s34-coll-card:hover { border-color: rgba(255,255,255,0.25) !important; }
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
        /* (Beta 3.16) Collections, tidied: calm cards, an "Empty" placeholder, a dashed "+ New collection",
           one toolbar row (back · order · out once downloaded … ⋯ · Download all), a quiet note */
        .s34-coll-cover.s34-coll-cover-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; background-color: rgba(255,255,255,0.03) !important; color: #5e5c66 !important; }
        .s34-coll-cover.s34-coll-cover-empty svg { width: 26px; height: 26px; grid-column: auto; grid-row: auto; }
        .s34-coll-cover.s34-coll-cover-empty span { font-size: 11px; letter-spacing: .4px; }
        .s34-win .s34-coll-card.s34-coll-new { padding: 0 !important; border-style: dashed !important; background: transparent !important; justify-content: center; min-height: 140px; }
        .s34-win .s34-coll-newbtn { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; width: 100%; border: none !important; background: transparent !important; color: #9a98a3 !important; font: 600 12.5px system-ui, sans-serif; cursor: pointer; }
        .s34-win .s34-coll-newbtn:hover { color: #fff !important; }
        .s34-coll-newform { display: flex; flex-direction: column; gap: 8px; padding: 12px; }
        .s34-coll-newform[hidden] { display: none; }
        .s34-win .s34-coll-newform input { height: 32px; padding: 0 10px; border: 1px solid rgba(255,255,255,0.14) !important; background: rgba(0,0,0,.3) !important; color: inherit !important; font: 13px system-ui, sans-serif; }
        .s34-win .s34-coll-newform .s34-coll-create { height: 32px; border: none !important; background: linear-gradient(135deg, #ff5f8f, #8b3dff) !important; color: #fff !important; font: 700 12.5px system-ui, sans-serif; cursor: pointer; }
        .s34-win-tools.s34-coll-bar { flex-wrap: nowrap; gap: 8px; }
        .s34-win .s34-win-tools .s34-coll-back { width: 34px; padding: 0 !important; font-size: 16px; }
        .s34-coll-morewrap { position: relative; }
        .s34-win .s34-win-tools .s34-coll-more { width: 34px; padding: 0 !important; font-size: 16px; letter-spacing: 1px; }
        .s34-coll-menu { position: absolute; right: 0; top: calc(100% + 4px); z-index: 5; display: flex; flex-direction: column; min-width: 200px; padding: 4px; background: #17161c !important; border: 1px solid rgba(255,255,255,0.12) !important; box-shadow: 0 14px 34px rgba(0,0,0,.6); }
        .s34-coll-menu[hidden] { display: none; }
        .s34-win .s34-coll-menu button { justify-content: flex-start; height: 32px; width: 100%; padding: 0 10px !important; border: none !important; background: transparent !important; text-align: left; font: 600 12.5px system-ui, sans-serif; }
        .s34-win .s34-coll-menu button:hover { background: rgba(255,255,255,0.06) !important; }
        .s34-win .s34-coll-menu button[hidden] { display: none; }
        .s34-win .s34-coll-menu .s34-coll-danger { color: #ff7a8a !important; }
        .s34-win .s34-win-tools.s34-coll-bar button.s34-win-primary { background: linear-gradient(135deg, #ff5f8f, #8b3dff) !important; border-color: transparent !important; white-space: nowrap; }
        @media (max-width: 640px) { .s34-win-tools.s34-coll-bar { flex-wrap: wrap; } }
        /* (Beta 3.10) collection tools: note, sort, cover, drag to arrange */
        .s34-coll-notep { font-size: 11px; opacity: .7; padding: 0 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-style: italic; }
        .s34-win textarea.s34-coll-note { display: block; width: 100%; box-sizing: border-box; margin: 0 0 10px; padding: 6px 2px; min-height: 30px; resize: none; border-radius: 0;
            border: none !important; border-bottom: 1px solid transparent !important; background: transparent !important; color: inherit !important; font: 13px/1.45 system-ui, sans-serif; opacity: .85; }
        .s34-win textarea.s34-coll-note:hover { border-bottom-color: rgba(255,255,255,0.12) !important; }
        .s34-win textarea.s34-coll-note:focus { outline: none; opacity: 1; border-bottom-color: #ff5f8f !important; }
        .s34-win select.s34-coll-sort { height: 32px; padding: 0 8px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.12) !important; background: rgba(255,255,255,0.04) !important; color: inherit !important; font: 600 12px system-ui, sans-serif; }
        .s34-win select.s34-coll-sort option { background: #1c1c22; color: #e8e8ee; }
        .s34-tiles-drag .s34-tile { cursor: grab; }
        .s34-win .s34-coll-dropdl { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; opacity: .85; cursor: pointer; white-space: nowrap; }
        .s34-win .s34-coll-dropdl input { accent-color: #ff5f8f; }
        .s34-tile.s34-dragging { opacity: .35; }
        .s34-tile.s34-drop-before { box-shadow: -4px 0 0 #ff5f8f; }
        .s34-tile.s34-drop-after { box-shadow: 4px 0 0 #ff5f8f; }
        .s34-win .s34-tile-acts button.s34-tile-cover.s34-on { background-color: #f5b301 !important; color: #111 !important; }
        .s34-tile.s34-tile-iscover .s34-tile-acts { opacity: 1; }
        .s34-tile.s34-tile-iscover .s34-tile-acts button:not(.s34-on) { opacity: 0; }
        .s34-tile.s34-tile-iscover:hover .s34-tile-acts button { opacity: 1; }
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

        /* (Beta 3.8) Collections on all devices: the one-time choice, the
           favourites page bar and the folder chips on its thumbnails */
        .s34-collsync-card { margin: 0 0 16px; padding: 14px 16px; border-radius: 12px; background: rgba(255,95,143,.08); border: 1px solid rgba(255,95,143,.35); }
        .s34-collsync-card b { display: block; font-size: 15px; margin-bottom: 4px; }
        .s34-collsync-card p { margin: 0 0 8px; font-size: 13px; line-height: 1.5; opacity: .9; }
        .s34-collsync-card .s34-collsync-small { font-size: 12px; opacity: .65; }
        .s34-collsync-btns { display: flex; gap: 8px; justify-content: flex-end; flex-wrap: wrap; }
        .s34-favcoll-bar { margin: 0 0 16px; padding: 14px 16px; border-radius: 12px; background: var(--s34-panel, rgba(255,255,255,.04)); border: 1px solid rgba(255,255,255,.08); }
        .s34-favcoll-bar h2 { margin: 0; font-size: 20px; }
        .s34-dlw-filter { flex: 1 1 240px; min-width: 0; padding: 7px 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,.14) !important; background: rgba(0,0,0,.25) !important; color: inherit !important; font: inherit; font-size: 13px; }
        .s34-shuffle { display: inline-flex; align-items: center; gap: 6px; margin: 0 0 10px; padding: 6px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,.14) !important; background: rgba(255,255,255,.05) !important; color: inherit !important; font: 600 13px system-ui, sans-serif; cursor: pointer; }
        .s34-shuffle:hover { border-color: #ff5f8f !important; }
        .s34-shuffle.s34-shuffle-sb { display: flex; width: 100%; justify-content: center; margin: 8px 0 0; box-sizing: border-box; }
        .s34-win-more { display: block; margin: 14px auto 4px; padding: 8px 16px; border-radius: 8px; border: 1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.05); color: inherit; font: inherit; font-weight: 600; cursor: pointer; }
        .s34-win-more:hover { border-color: #ff5f8f; }
        .s34-favcoll-top { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 6px; }
        .s34-favcoll-acts { margin-left: auto; display: flex; gap: 6px; flex-wrap: wrap; }
        .s34-favcoll-acts button { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.05); color: inherit; font: inherit; font-size: 13px; font-weight: 600; cursor: pointer; }
        .s34-favcoll-acts button:hover { border-color: #ff5f8f; }
        .s34-favcoll-acts button svg { width: 14px; height: 14px; }
        .s34-favcoll-acts .s34-favcoll-primary { background: #ff5f8f !important; border-color: #ff5f8f !important; color: #fff !important; }
        .s34-batch button.s34-armed { background: #c0392b !important; color: #fff !important; }
        .s34-favcoll-bar p { margin: 0 0 10px; opacity: .7; font-size: 13px; }
        .s34-favcoll-list { display: flex; flex-wrap: wrap; gap: 6px; }
        .s34-favcoll-list button { display: inline-flex; align-items: center; gap: 6px; padding: 5px 10px; border-radius: 99px; border: 1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.05); color: inherit; font: inherit; font-size: 13px; cursor: pointer; }
        .s34-favcoll-list button:hover { border-color: #ff5f8f; }
        .s34-favcoll-list small { opacity: .6; }
        .s34-cchip { position: absolute; left: 6px; top: 6px; z-index: 4; transition: opacity .15s; max-width: calc(100% - 12px); display: inline-flex; align-items: center; gap: 4px; padding: 2px 7px; border-radius: 6px; background-color: rgba(20,20,24,0.85) !important; color: #fff !important; font: 600 11px/1.4 system-ui, sans-serif; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; pointer-events: none; }
        .s34-cchip svg { flex: none; width: 12px; height: 12px; }
        /* top left like the VID / GIF label - under it when there is one; the
           score pill takes its place while hovering */
        span.thumb:has(.s34-badge, .s34-new-badge) .s34-cchip { top: 30px; }
        html.s34-tx-below span.thumb .s34-cchip { top: 6px; }
        span.thumb:hover:has(.s34-info) .s34-cchip { opacity: 0; }

    `;

