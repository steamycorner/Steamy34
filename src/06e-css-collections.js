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

