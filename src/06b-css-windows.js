    const WINDOWS_CSS = `
        /* Quick tips window */
        .s34-tips {
            width: min(600px, calc(100vw - 24px));
            max-height: min(88vh, 820px);
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
            animation: s34-blm-in .16s ease-out;
        }
        .s34-tips-head { display: flex; align-items: center; gap: 12px; padding: 18px 20px 12px; }
        .s34-tips-head img { width: 40px; height: 40px; border-radius: 11px; flex: none; }
        .s34-tips-head > div { flex: 1; min-width: 0; }
        .s34-tips-title { font-size: 18px; font-weight: 800; }
        .s34-tips-sub { font-size: 12px; opacity: .6; }
        .s34-tips .s34-tips-close {
            width: 32px; height: 32px; padding: 0 !important;
            border-radius: 10px; border: none !important;
            background-color: rgba(255,255,255,0.06) !important;
            color: #e8e8ee !important; cursor: pointer; font-size: 14px;
        }
        .s34-tips .s34-tips-close:hover { background-color: rgba(255,255,255,0.12) !important; }
        /* Computer / Phone switch */
        .s34-tips-modes {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4px;
            margin: 0 20px 14px;
            padding: 4px;
            border-radius: 12px;
            background-color: rgba(0,0,0,0.35) !important;
            border: 1px solid rgba(255,255,255,0.08) !important;
        }
        .s34-tips .s34-tips-modes button {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 7px;
            height: 34px;
            padding: 0 !important;
            border-radius: 9px;
            border: none !important;
            background: transparent !important;
            color: #a9a9b3 !important;
            font: 700 13px system-ui, -apple-system, Segoe UI, sans-serif;
            cursor: pointer;
        }
        .s34-tips .s34-tips-modes button svg { display: block; }
        .s34-tips .s34-tips-modes button:hover { color: #fff !important; }
        .s34-tips .s34-tips-modes button.s34-on {
            background: linear-gradient(135deg, rgba(255,95,143,0.28), rgba(139,61,255,0.28)) !important;
            color: #fff !important;
            box-shadow: inset 0 0 0 1px rgba(255,143,176,0.45);
        }
        /* Groups as cards, one row per key / gesture */
        .s34-tips-body { overflow-y: auto; padding: 0 20px 8px; }
        .s34-tips-group { margin-bottom: 16px; }
        .s34-tips-label {
            display: flex;
            align-items: center;
            gap: 7px;
            margin: 2px 2px 8px;
            font-size: 11.5px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1.1px;
            color: #ff8fa3 !important;
        }
        .s34-tips-label svg { display: block; width: 15px; height: 15px; }
        .s34-tips-card {
            border-radius: 14px;
            overflow: hidden;
            background-color: rgba(255,255,255,0.035) !important;
            border: 1px solid rgba(255,255,255,0.07) !important;
        }
        .s34-tips-row {
            display: grid;
            grid-template-columns: minmax(150px, 42%) 1fr;
            gap: 14px;
            align-items: center;
            padding: 11px 14px;
            border-top: 1px solid rgba(255,255,255,0.06) !important;
        }
        .s34-tips-row:first-child { border-top: none !important; }
        .s34-tips-keys { font-size: 12.5px; line-height: 1.9; color: #b8b8c2 !important; }
        .s34-tips-what { font-size: 13.5px; line-height: 1.5; color: #ececf1 !important; }
        @media (max-width: 520px) {
            .s34-tips-row { grid-template-columns: 1fr; gap: 4px; }
            .s34-tips-head, .s34-tips-body, .s34-tips-foot { padding-left: 14px; padding-right: 14px; }
            .s34-tips-modes { margin: 0 14px 12px; }
        }
        .s34-tips kbd {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            min-width: 18px;
            justify-content: center;
            padding: 3px 8px;
            border-radius: 6px;
            font: 700 12px/1.3 system-ui, -apple-system, Segoe UI, sans-serif;
            color: #fff !important;
            background-color: #2b2933 !important;
            border: 1px solid rgba(255,255,255,0.16) !important;
            box-shadow: 0 2px 0 rgba(0,0,0,0.5);
        }
        .s34-tips kbd svg { display: block; }
        .s34-tips-new {
            display: inline-block;
            margin-right: 6px;
            padding: 0 5px;
            border-radius: 4px;
            vertical-align: 1px;
            font: 800 9.5px/15px system-ui, -apple-system, Segoe UI, sans-serif;
            letter-spacing: .5px;
            color: #fff !important;
            background: linear-gradient(135deg, #ff5f8f, #8b3dff) !important;
        }
        /* Example tag bubble (looks like the ones in the search box) */
        .s34-tips-pill {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            margin: 1px 0;
            padding: 0 6px 0 8px;
            border-radius: 999px;
            font: 600 11.5px/18px system-ui, -apple-system, Segoe UI, sans-serif;
            white-space: nowrap;
            color: #7ee07e !important;
            background-color: rgba(255,255,255,0.06) !important;
            border: 1px solid rgba(126,224,126,0.5) !important;
        }
        .s34-tips-pill i { font-style: normal; opacity: .55; }
        .s34-tips-pill.s34-tips-pill-ex {
            text-decoration: line-through;
            border: 1px dashed rgba(255,80,80,0.75) !important;
            background-color: rgba(255,60,60,0.10) !important;
        }
        .s34-tips-foot {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 20px 16px;
            border-top: 1px solid rgba(255,255,255,0.07) !important;
            font-size: 11.5px;
        }
        .s34-tips-foot > span { flex: 1; opacity: .7; line-height: 1.5; }
        .s34-tips-hobby { display: block; margin-top: 3px; font-size: 11px; color: #ff9fbf !important; }
        .s34-tips-foot .s34-qmark { opacity: 1; flex: none; }
        .s34-tips .s34-tips-ok {
            height: 34px;
            padding: 0 22px !important;
            border-radius: 10px;
            border: none !important;
            background: linear-gradient(135deg, #ff5f8f, #8b3dff) !important;
            color: #fff !important;
            font-weight: 700;
            cursor: pointer;
        }
        .s34-tips .s34-tips-ok:hover { filter: brightness(1.12); }
        /* Our windows never inherit the page's centred text */
        .s34-tips, .s34-blm, .s34-panel, .s34-pv-side { text-align: left !important; }

        /* Round "?" badge: opens the quick tips */
        .s34-qmark {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 17px;
            height: 17px;
            box-sizing: border-box;
            border-radius: 50%;
            border: 1.5px solid currentColor !important;
            font: 800 11px/1 system-ui, -apple-system, Segoe UI, sans-serif;
            vertical-align: -3px;
            margin: 0 2px;
        }
        .s34-pv-help {
            width: 22px;
            height: 22px;
            font-size: 13px;
            cursor: pointer;
            color: #dcdce0 !important;
            opacity: .65;
        }
        .s34-pv-help:hover { opacity: 1; }
        .s34-panel-foot { flex-wrap: wrap; row-gap: 8px; }
        .s34-panel-foot .s34-btn { white-space: nowrap; }
        /* "? Shortcuts & tips" under the sidebar settings button */
        .s34-tipslink {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap; /* the real site's sidebar is only 180px: two lines then */
            gap: 0 4px;
            width: 100%;
            box-sizing: border-box;
            margin: -6px 0 14px !important;
        }
        .s34-tools .s34-tipslink { margin: -2px 0 0 !important; }
        .s34-tipslink button {
            display: flex;
            align-items: center;
            gap: 5px;
            padding: 5px 6px !important;
            border: none !important;
            background: transparent !important;
            color: #b8b8c2 !important;
            font: 600 11.5px system-ui, -apple-system, Segoe UI, sans-serif;
            white-space: nowrap;
            cursor: pointer;
            opacity: .75;
        }
        .s34-tipslink button svg { display: block; width: 13px; height: 13px; color: #ffb347; }
        .s34-tipslink button:hover { opacity: 1; color: #fff !important; }

        /* Changelog window */
        .s34-cl-list { display: flex; flex-direction: column; gap: 10px; }
        .s34-cl-list[hidden] { display: none; }
        .s34-win .s34-cl-more { align-self: flex-start; }
        .s34-cl-entry {
            padding: 10px 14px;
            border-radius: 12px;
            background-color: rgba(255,255,255,0.03) !important;
            border: 1px solid rgba(255,255,255,0.06) !important;
        }
        .s34-cl-entry.s34-cl-new {
            background-color: rgba(255,179,71,0.07) !important;
            border-color: rgba(255,179,71,0.4) !important;
        }
        .s34-cl-head { display: flex; align-items: baseline; gap: 10px; margin-bottom: 4px; }
        .s34-cl-head b { font-size: 14px; }
        .s34-cl-head span { font-size: 11.5px; opacity: .5; }
        .s34-cl-head em {
            margin-left: auto;
            padding: 0 6px;
            border-radius: 4px;
            font: 800 9.5px/16px system-ui, -apple-system, Segoe UI, sans-serif;
            font-style: normal;
            letter-spacing: .5px;
            color: #fff !important;
            background: linear-gradient(135deg, #ff5f8f, #8b3dff) !important;
        }
        .s34-cl-entry ul { margin: 0 !important; padding: 0 0 0 18px !important; }
        .s34-cl-entry li { margin: 3px 0; font-size: 12.5px; line-height: 1.45; color: #d4d4dc !important; list-style: disc !important; }
        .s34-cl-foot { display: flex; justify-content: space-between; align-items: center; gap: 10px; padding-top: 4px; }
        .s34-win .s34-cl-tips {
            display: flex; align-items: center; gap: 6px;
            height: 34px; padding: 0 12px !important; border-radius: 10px; cursor: pointer;
            background-color: rgba(255,255,255,0.06) !important; border: 1px solid rgba(255,255,255,0.12) !important;
            color: #e8e8ee !important; font: 600 12.5px system-ui, -apple-system, Segoe UI, sans-serif;
        }
        .s34-win .s34-cl-ok {
            height: 34px; padding: 0 22px !important; border-radius: 10px; border: none !important; cursor: pointer;
            background: linear-gradient(135deg, #ff5f8f, #8b3dff) !important; color: #fff !important; font-weight: 700;
        }

        /* Sidebar "Blacklist" button: slim, like the Settings button
           (line icon + name, the number of tags small and quiet) */
        .s34-blbtn {
            box-sizing: border-box;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 7px;
            margin: 14px 0 -6px;
            padding: 7px 10px;
            border-radius: 8px;
            border: 1px solid #33333a !important;
            background-color: #1c1c20 !important;
            color: #dcdce0 !important;
            cursor: pointer;
            user-select: none;
            opacity: .85;
            transition: opacity .15s, background-color .15s;
        }
        .s34-tools .s34-blbtn { margin: 0; }
        .s34-blbtn:hover { opacity: 1; background-color: #24242a !important; }
        .s34-blbtn-icon { flex: none; display: flex; color: inherit !important; }
        .s34-blbtn-icon svg { display: block; width: 16px; height: 16px; color: inherit !important; }
        .s34-blbtn-icon svg * { color: inherit !important; stroke-width: 2; }
        .s34-blbtn-text { display: flex; align-items: baseline; gap: 6px; min-width: 0; white-space: nowrap; }
        .s34-blbtn-text b { font-size: 13px; font-weight: 600; color: #dcdce0 !important; }
        .s34-blbtn-count { font-size: 11px; opacity: .55; color: #dcdce0 !important; }

        /* Blacklist window */
        .s34-blm {
            width: min(560px, calc(100vw - 32px));
            max-height: min(84vh, 760px);
            display: flex;
            flex-direction: column;
            gap: 14px;
            box-sizing: border-box;
            padding: 20px;
            border-radius: 18px;
            background: linear-gradient(180deg, #1f1d26 0%, #17161c 100%) !important;
            border: 1px solid rgba(255,255,255,0.08) !important;
            box-shadow: 0 30px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05);
            color: #e8e8ee !important;
            font: 13px/1.4 system-ui, -apple-system, Segoe UI, sans-serif;
            animation: s34-blm-in .16s ease-out;
        }
        @keyframes s34-blm-in { from { transform: translateY(8px) scale(.98); opacity: 0; } to { transform: none; opacity: 1; } }
        .s34-blm-head { display: flex; align-items: center; gap: 12px; }
        .s34-blm-icon {
            flex: none;
            width: 42px;
            height: 42px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #ff4d6d, #b5179e) !important;
            color: #fff !important;
            box-shadow: 0 6px 18px rgba(255,77,109,0.35);
        }
        .s34-blm-icon svg { width: 22px; height: 22px; }
        .s34-blm-heading { flex: 1; min-width: 0; }
        .s34-blm-title { font-size: 18px; font-weight: 800; letter-spacing: .2px; }
        .s34-blm-sub { font-size: 12px; opacity: .6; }
        .s34-blm .s34-blm-close {
            width: 32px;
            height: 32px;
            padding: 0 !important;
            border-radius: 10px;
            border: none !important;
            background-color: rgba(255,255,255,0.06) !important;
            color: #e8e8ee !important;
            cursor: pointer;
            font-size: 14px;
        }
        .s34-blm .s34-blm-close:hover { background-color: rgba(255,255,255,0.12) !important; }

        .s34-blm-add { display: flex; gap: 8px; }
        .s34-blm-add .s34-ac-wrap { flex: 1; }
        .s34-blm .s34-blm-input, .s34-blm .s34-blm-filter {
            width: 100%;
            height: 36px;
            box-sizing: border-box;
            padding: 0 12px !important;
            border-radius: 10px;
            font-size: 13px;
            background-color: rgba(0,0,0,0.35) !important;
            border: 1px solid rgba(255,255,255,0.10) !important;
            color: #e8e8ee !important;
            outline: none;
        }
        .s34-blm .s34-blm-input:focus, .s34-blm .s34-blm-filter:focus { border-color: #ff4d6d !important; }
        .s34-blm .s34-blm-addbtn {
            flex: none;
            height: 36px;
            padding: 0 18px !important;
            border-radius: 10px;
            border: none !important;
            background: linear-gradient(135deg, #ff4d6d, #b5179e) !important;
            color: #fff !important;
            font-weight: 700;
            cursor: pointer;
        }
        .s34-blm .s34-blm-addbtn:hover { filter: brightness(1.12); }

        .s34-blm-recent-box[hidden] { display: none; }
        .s34-blm-label, .s34-blm-group {
            margin-bottom: 7px;
            font-size: 10.5px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            opacity: .55;
        }
        .s34-blm-recent { display: flex; flex-wrap: wrap; gap: 8px; }
        .s34-blm-recent-item { display: flex; flex-direction: column; align-items: flex-start; gap: 2px; }
        .s34-blm-ago { font-size: 10px; opacity: .5; padding-left: 8px; }

        .s34-blm-chip {
            display: inline-flex;
            align-items: center;
            max-width: 100%;
            padding: 2px 10px;
            border-radius: 999px;
            font-weight: 600;
            font-size: 12px;
            background-color: rgba(255,255,255,0.05) !important;
            border: 1px solid rgba(255,255,255,0.14) !important;
            color: #c9c9d1 !important;
            overflow-wrap: anywhere;
        }
        .s34-blm-artist    { color: #ff8a80 !important; border-color: rgba(255,138,128,0.45) !important; }
        .s34-blm-character { color: #7ee07e !important; border-color: rgba(126,224,126,0.45) !important; }
        .s34-blm-copyright { color: #d68cff !important; border-color: rgba(214,140,255,0.45) !important; }
        .s34-blm-general   { color: #8ab4f8 !important; border-color: rgba(138,180,248,0.45) !important; }
        .s34-blm-metadata  { color: #ffb86b !important; border-color: rgba(255,184,107,0.45) !important; }
        .s34-blm .s34-blm-x {
            margin: 0 -4px 0 6px;
            padding: 0 !important;
            border: none !important;
            background: transparent !important;
            color: inherit !important;
            opacity: .55;
            cursor: pointer;
            font-size: 14px;
            line-height: 1;
        }
        .s34-blm .s34-blm-x:hover { opacity: 1; color: #ff6b6b !important; }

        .s34-blm-tools { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
        .s34-blm-tools .s34-blm-filter { flex: 1 1 140px; width: auto; }
        .s34-blm-sort {
            display: flex;
            padding: 3px;
            border-radius: 10px;
            background-color: rgba(0,0,0,0.35) !important;
            border: 1px solid rgba(255,255,255,0.08) !important;
        }
        .s34-blm .s34-blm-sort button {
            height: 28px;
            padding: 0 10px !important;
            border-radius: 8px;
            border: none !important;
            background: transparent !important;
            color: #b8b8c2 !important;
            font-size: 12px;
            font-weight: 600;
            cursor: pointer;
            white-space: nowrap;
        }
        .s34-blm .s34-blm-sort button:hover { color: #fff !important; }
        .s34-blm .s34-blm-sort button.s34-on {
            background-color: rgba(255,77,109,0.18) !important;
            color: #ff8fa3 !important;
            box-shadow: inset 0 0 0 1px rgba(255,77,109,0.45);
        }

        .s34-blm-list {
            flex: 1;
            min-height: 120px;
            overflow-y: auto;
            margin: 0 -6px;
            padding: 0 6px;
        }
        .s34-blm-chips { display: flex; flex-wrap: wrap; gap: 6px; padding: 2px 0 4px; }
        .s34-blm-item { padding: 3px 10px 3px 11px; cursor: default; transition: background-color .12s, border-color .12s; }
        .s34-blm-item:hover { background-color: rgba(255,255,255,0.10) !important; }
        .s34-blm-name { max-width: 220px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .s34-blm-group { margin: 12px 0 6px; }
        .s34-blm-group:first-child { margin-top: 2px; }
        .s34-blm-empty { padding: 26px 8px; text-align: center; opacity: .55; font-style: italic; }
        .s34-blm-foot { display: flex; flex-direction: column; gap: 6px; font-size: 11px; text-align: center; }
        .s34-blm-foot > div:last-child { opacity: .45; }
        .s34-blm-dates[hidden], .s34-blm-status[hidden] { display: none; }
        .s34-blm-dates {
            padding: 7px 10px;
            border-radius: 8px;
            text-align: left;
            line-height: 1.45;
            background-color: rgba(255,255,255,0.04) !important;
            color: #b8b8c2 !important;
        }
        .s34-blm-status {
            margin: -4px 0;
            font-size: 11.5px;
            color: #8ab4f8 !important;
        }
        .s34-blm-why {
            margin: -2px 0 8px;
            padding: 7px 10px;
            border-radius: 8px;
            font-size: 11.5px;
            line-height: 1.45;
            background-color: rgba(255,184,107,0.08) !important;
            border: 1px dashed rgba(255,184,107,0.35) !important;
            color: #e8cfa8 !important;
        }
        .s34-blm { position: relative; }
        .s34-blm-name { cursor: pointer; }
        .s34-blm-typemenu {
            position: absolute;
            z-index: 5;
            display: flex;
            flex-direction: column;
            gap: 3px;
            min-width: 160px;
            padding: 8px;
            border-radius: 12px;
            background-color: #24222c !important;
            border: 1px solid rgba(255,255,255,0.12) !important;
            box-shadow: 0 14px 34px rgba(0,0,0,0.6);
        }
        .s34-blm-typemenu-head { font-size: 11px; opacity: .6; padding: 0 4px 4px; overflow-wrap: anywhere; }
        .s34-blm .s34-blm-typemenu button {
            text-align: left;
            height: 28px;
            padding: 0 10px !important;
            border-radius: 8px;
            border: 1px solid transparent !important;
            background: transparent !important;
            font-size: 12.5px;
            font-weight: 600;
            cursor: pointer;
        }
        .s34-blm .s34-blm-typemenu button:hover { background-color: rgba(255,255,255,0.07) !important; }
        .s34-blm .s34-blm-typemenu button.s34-on { border-color: currentColor !important; }

        /* Settings: privacy & your data */
        .s34-privacy { display: flex; flex-direction: column; gap: 10px; margin-bottom: 6px; font-size: 12.5px; }
        .s34-privacy-hero {
            display: flex;
            gap: 12px;
            align-items: flex-start;
            padding: 12px;
            border-radius: 10px;
            line-height: 1.5;
            background-color: rgba(46,160,90,0.10) !important;
            border: 1px solid rgba(46,160,90,0.45) !important;
            color: #d8f2e0 !important;
        }
        .s34-privacy-icon { font-size: 20px; line-height: 1; }
        .s34-privacy-note { font-size: 11.5px; line-height: 1.5; opacity: .7; }
        .s34-privacy-head {
            display: flex;
            justify-content: space-between;
            font-size: 10.5px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            opacity: .6;
            margin-top: 4px;
        }
        .s34-privacy-list {
            display: flex;
            flex-direction: column;
            border-radius: 10px;
            overflow: hidden;
            border: 1px solid #2c2c33 !important;
        }
        .s34-privacy-row {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 7px 10px;
            border-top: 1px solid #2c2c33 !important;
        }
        .s34-privacy-row:first-child { border-top: none !important; }
        .s34-privacy-row.s34-privacy-empty { opacity: .45; }
        .s34-privacy-info { flex: 1; min-width: 0; }
        .s34-privacy-name { font-weight: 600; }
        .s34-privacy-what { font-size: 11px; opacity: .6; }
        .s34-privacy-amount { font-size: 11px; opacity: .7; white-space: nowrap; }
        .s34-privacy-actions { display: flex; flex-wrap: wrap; gap: 8px; }

        /* "Already downloaded" question */
        .s34-confirm {
            width: min(380px, calc(100vw - 32px));
            box-sizing: border-box;
            padding: 22px 22px 16px;
            border-radius: 14px;
            text-align: center;
            background-color: #1c1c21 !important;
            border: 1px solid #33333a !important;
            box-shadow: 0 20px 60px rgba(0,0,0,0.7);
            color: #e8e8ec !important;
            font: 13px/1.45 system-ui, -apple-system, Segoe UI, sans-serif;
        }
        .s34-confirm-icon {
            width: 44px;
            height: 44px;
            margin: 0 auto 10px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #1f7a3e !important;
            color: #fff !important;
            font-size: 20px;
        }
        .s34-confirm-title { font-size: 16px; font-weight: 700; margin-bottom: 6px; }
        .s34-confirm-text { opacity: .85; margin-bottom: 14px; }
        .s34-confirm-check {
            display: inline-flex;
            align-items: center;
            gap: 7px;
            margin-bottom: 16px;
            font-size: 12px;
            opacity: .8;
            cursor: pointer;
            user-select: none;
        }
        .s34-confirm-check input { margin: 0; cursor: pointer; accent-color: #2c5fcc; }
        .s34-confirm-foot { display: flex; gap: 8px; justify-content: center; }
        .s34-confirm-foot .s34-btn { min-width: 120px; }

    `;

