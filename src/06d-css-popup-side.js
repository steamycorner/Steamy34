    const POPUP_SIDE_CSS = `
        /* Popup: theater mode (no sidebar) */
        .s34-pv-theaterbtn {
            display: flex;
            align-items: center;
            padding: 0 3px;
            cursor: pointer;
            color: #dcdce0 !important;
            opacity: .65;
        }
        .s34-pv-theaterbtn:hover { opacity: 1; }
        .s34-pv-theaterbtn svg { display: block; }
        .s34-pv-overlay.s34-pv-theater { grid-template-columns: minmax(0, 1fr); }
        .s34-pv-overlay.s34-pv-theater .s34-pv-side { display: none; }
        .s34-pv-overlay.s34-pv-theater .s34-pv-stage { padding: 0; }
        .s34-pv-tbar {
            display: none;
            position: absolute;
            top: 12px;
            right: 18px;
            z-index: 6;
            gap: 6px;
            opacity: .4;
            transition: opacity .15s;
        }
        .s34-pv-theater .s34-pv-tbar { display: flex; }
        .s34-pv-tbar:hover { opacity: 1; }
        .s34-pv-tbar button {
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 !important;
            border-radius: 50%;
            border: 1px solid rgba(255,255,255,0.18) !important;
            background-color: rgba(16,16,20,0.75) !important;
            backdrop-filter: blur(6px);
            color: #fff !important;
            font-size: 18px;
            cursor: pointer;
        }
        .s34-pv-tbar button:hover { background-color: rgba(40,40,50,0.9) !important; }

        /* Popup: ♥ Favourite + 📁 Collection side by side */
        .s34-pv-row2 { display: flex; gap: 8px; }
        .s34-pv-row2 > * { flex: 1; min-width: 0; }
        .s34-pv-collect, .s34-post-collect {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 7px;
            height: 34px;
            border-radius: 8px;
            cursor: pointer;
            font: 600 13px system-ui, -apple-system, Segoe UI, sans-serif;
            background-color: #24242a !important;
            border: 1px solid #3a3a44 !important;
            color: #e8e8ee !important;
        }
        .s34-pv-collect:hover, .s34-post-collect:hover { border-color: #ffb347 !important; }
        .s34-pv-collect svg, .s34-post-collect svg { display: block; flex: none; }
        .s34-post-collect { width: 100%; }

        /* "Save to collection" menu */
        .s34-cmenu {
            position: fixed;
            z-index: 100001;
            width: 250px;
            max-height: 60vh;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 2px;
            padding: 8px;
            border-radius: 12px;
            background-color: #24222c !important;
            border: 1px solid rgba(255,255,255,0.12) !important;
            box-shadow: 0 14px 34px rgba(0,0,0,0.6);
            color: #e8e8ee !important;
            font: 13px/1.3 system-ui, -apple-system, Segoe UI, sans-serif;
            text-align: left;
        }
        .s34-cmenu-head { padding: 2px 6px 6px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .8px; opacity: .6; }
        .s34-cmenu-empty { padding: 2px 6px 6px; font-size: 12px; opacity: .7; }
        .s34-cmenu .s34-cmenu-item {
            display: flex;
            align-items: center;
            gap: 8px;
            width: 100%;
            padding: 7px 8px !important;
            border-radius: 8px;
            border: none !important;
            background: transparent !important;
            color: inherit !important;
            font: inherit;
            text-align: left;
            cursor: pointer;
        }
        .s34-cmenu .s34-cmenu-item:hover { background-color: rgba(255,255,255,0.07) !important; }
        .s34-cmenu-check {
            flex: none;
            width: 16px;
            height: 16px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 11px;
            font-weight: 800;
            border: 1.5px solid rgba(255,255,255,0.3) !important;
        }
        .s34-cmenu-item.s34-on .s34-cmenu-check { background-color: #ffb347 !important; border-color: #ffb347 !important; color: #1a1a1a !important; }
        .s34-cmenu-name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .s34-cmenu-n { font-size: 11px; opacity: .5; }
        .s34-cmenu-new { display: flex; gap: 6px; margin-top: 6px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.08) !important; }
        .s34-cmenu-new input, .s34-coll-new input {
            flex: 1;
            min-width: 0;
            height: 30px;
            box-sizing: border-box;
            padding: 0 8px !important;
            border-radius: 7px;
            font-size: 12.5px;
            background-color: rgba(0,0,0,0.35) !important;
            border: 1px solid rgba(255,255,255,0.12) !important;
            color: #e8e8ee !important;
        }
        .s34-cmenu-new button, .s34-coll-new button {
            height: 30px;
            padding: 0 12px !important;
            border-radius: 7px;
            border: none !important;
            background: linear-gradient(135deg, #ffb347, #ff5f8f) !important;
            color: #fff !important;
            font-weight: 700;
            cursor: pointer;
        }

    `;

