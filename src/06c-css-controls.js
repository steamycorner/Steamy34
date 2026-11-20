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
            .s34-set-nav nav { flex-direction: row; }
            .s34-set-nav nav button span { white-space: nowrap; }
        }

        /* Cloudflare check: a calm notice at the top (noticeable, not alarming) */
        .s34-cf-banner {
            position: fixed;
            top: 12px;
            left: 50%;
            z-index: 100003;
            width: min(560px, calc(100vw - 24px));
            box-sizing: border-box;
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 10px 10px 10px 12px;
            border-radius: 14px;
            background-color: rgba(28,27,34,0.96) !important;
            border: 1px solid rgba(255,255,255,0.10) !important;
            border-left: 3px solid #ffb347 !important;
            backdrop-filter: blur(8px);
            color: #e8e8ee !important;
            font: 13px/1.4 system-ui, -apple-system, Segoe UI, sans-serif;
            text-align: left;
            box-shadow: 0 12px 30px rgba(0,0,0,0.45);
            transform: translate(-50%, -140%);
            transition: transform .3s ease;
        }
        .s34-cf-banner.s34-show { transform: translate(-50%, 0); }
        /* Not needed while the check window itself is open */
        body:has(.s34-cf-overlay) .s34-cf-banner { opacity: 0; pointer-events: none; }
        .s34-cf-banner-icon {
            flex: none;
            width: 34px;
            height: 34px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgba(255,179,71,0.14) !important;
            color: #ffb347 !important;
        }
        .s34-cf-banner-icon svg { display: block; }
        .s34-cf-banner-text { flex: 1; min-width: 0; display: flex; flex-direction: column; }
        .s34-cf-banner-text b { font-size: 13.5px; color: #f2f2f6 !important; }
        .s34-cf-banner-text span { font-size: 12px; color: #a9a9b3 !important; }
        .s34-cf-banner .s34-cf-banner-solve {
            flex: none;
            height: 32px;
            padding: 0 14px !important;
            border-radius: 9px;
            border: none !important;
            background-color: #ffb347 !important;
            color: #2a1a05 !important;
            font: 700 12.5px system-ui, -apple-system, Segoe UI, sans-serif;
            cursor: pointer;
        }
        .s34-cf-banner .s34-cf-banner-solve:hover { background-color: #ffc46e !important; }
        .s34-cf-banner .s34-cf-banner-x {
            flex: none;
            width: 28px;
            height: 28px;
            padding: 0 !important;
            border-radius: 8px;
            border: none !important;
            background: transparent !important;
            color: #8a8a94 !important;
            cursor: pointer;
        }
        .s34-cf-banner .s34-cf-banner-x:hover { color: #e8e8ee !important; background-color: rgba(255,255,255,0.06) !important; }
        @media (max-width: 560px) {
            .s34-cf-banner { flex-wrap: wrap; }
            .s34-cf-banner-text { flex-basis: calc(100% - 50px); }
        }

        /* Search: 5th filter (Rating) uses the whole row */
        .s34-sb-filters .s34-sb-filter:last-child:nth-child(odd) { grid-column: 1 / -1; }

    `;

