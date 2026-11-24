    const POPUP_INFO_CSS = `
        /* Popup: auto next (slideshow) */
        .s34-auto {
            display: flex;
            flex-direction: column;
            gap: 7px;
            padding: 9px 10px;
            border-radius: 10px;
            background-color: #1c1c21 !important;
            border: 1px solid #2a2a31 !important;
            color: #dcdce0 !important;
            font-size: 12px;
        }
        .s34-auto.s34-auto-running { border-color: rgba(255,95,143,0.5) !important; }
        .s34-auto .s34-auto-toggle {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 7px;
            height: 32px;
            border-radius: 8px;
            cursor: pointer;
            font: 600 13px system-ui, -apple-system, Segoe UI, sans-serif;
            background-color: #24242a !important;
            border: 1px solid #3a3a44 !important;
            color: #e8e8ee !important;
        }
        .s34-auto .s34-auto-toggle:hover { border-color: #ff5f8f !important; }
        .s34-auto .s34-auto-toggle.s34-on {
            background: linear-gradient(135deg, #ff5f8f, #8b3dff) !important;
            border-color: transparent !important;
            color: #fff !important;
        }
        .s34-auto-icon { font-size: 11px; letter-spacing: -1px; }
        .s34-auto-row { display: flex; align-items: center; gap: 8px; }
        .s34-auto-row span { opacity: .65; }
        .s34-auto .s34-auto-row input[type="range"] {
            flex: 1;
            min-width: 0;
            padding: 0 !important;
            border: none !important;
            background: transparent !important;
            accent-color: #ff5f8f;
            cursor: pointer;
        }
        .s34-auto-sec { min-width: 30px; text-align: right; font-size: 12px; color: #fff !important; }
        .s34-auto-bar {
            display: none;
            height: 4px;
            border-radius: 999px;
            overflow: hidden;
            background-color: rgba(255,255,255,0.08) !important;
        }
        .s34-auto.s34-auto-running .s34-auto-bar { display: block; }
        .s34-auto-bar i {
            display: block;
            height: 100%;
            width: 0%;
            border-radius: 999px;
            background: linear-gradient(90deg, #ff5f8f, #8b3dff) !important;
            transition: width .1s linear;
        }
        .s34-auto-note { font-size: 10.5px; opacity: .5; }

        /* Popup: post info */
        .s34-pv-info {
            display: flex;
            flex-direction: column;
            gap: 6px;
            padding: 10px;
            border-radius: 8px;
            background-color: #1c1c21 !important;
            border: 1px solid #2a2a31 !important;
            font-size: 12px;
            color: #c8c8ce !important;
        }
        .s34-pv-info:empty { display: none; }
        .s34-pv-stats { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; }
        .s34-pv-score { font-weight: 700; color: #ffd36b !important; font-size: 13px; }
        .s34-pv-vote {
            height: 22px;
            padding: 0 7px !important;
            border-radius: 6px;
            cursor: pointer;
            font-size: 11px;
            background-color: #26262d !important;
            border: 1px solid #3a3a44 !important;
            color: #e8e8ec !important;
        }
        .s34-pv-vote:hover { border-color: #7ee07e !important; color: #7ee07e !important; }
        .s34-pv-vote.s34-on { background-color: rgba(126,224,126,0.15) !important; border-color: #7ee07e !important; color: #7ee07e !important; }
        .s34-pv-pill {
            padding: 1px 7px;
            border-radius: 999px;
            background-color: #26262d !important;
            border: 1px solid #33333a !important;
            font-size: 11px;
        }
        .s34-pv-line { overflow-wrap: anywhere; }
        .s34-pv-info a { color: #8ab4f8 !important; text-decoration: none !important; }
        .s34-pv-info a:hover { text-decoration: underline !important; }
        .s34-pv-notice {
            padding: 6px 8px;
            border-radius: 6px;
            background-color: rgba(255,184,107,0.10) !important;
            border: 1px solid rgba(255,184,107,0.35) !important;
            color: #ffd9ad !important;
            overflow-wrap: anywhere;
        }

        /* Popup: right side scrolls - media fills the first screen, comments below */
        .s34-pv-main {
            position: relative;
            min-width: 0;
            min-height: 0;
            overflow-y: auto;
            overflow-x: hidden;
            scrollbar-width: thin;
        }
        .s34-pv-main > .s34-pv-stage { height: 100%; box-sizing: border-box; }
        /* Comments */
        .s34-cm-section {
            max-width: 820px;
            margin: 0 auto;
            padding: 28px 24px 70px;
            box-sizing: border-box;
            color: #e4e4ea !important;
            font: 13.5px/1.55 system-ui, -apple-system, Segoe UI, sans-serif;
            text-align: left;
        }
        .s34-cm-head {
            display: flex;
            align-items: center;
            gap: 10px;
            padding-bottom: 14px;
            margin-bottom: 8px;
            border-bottom: 1px solid rgba(255,255,255,0.08) !important;
        }
        .s34-cm-head h3 { margin: 0 !important; font-size: 18px !important; font-weight: 800; color: #fff !important; }
        .s34-cm-count {
            padding: 1px 9px;
            border-radius: 999px;
            font-size: 12px;
            font-weight: 700;
            background-color: rgba(255,95,143,0.16) !important;
            color: #ff8fb0 !important;
        }
        .s34-cm-count[hidden] { display: none; }
        .s34-cm-write {
            margin-left: auto;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 1px;
            padding: 6px 12px;
            border-radius: 9px;
            text-decoration: none !important;
            background-color: rgba(255,255,255,0.06) !important;
            border: 1px solid rgba(255,255,255,0.12) !important;
            color: #e8e8ee !important;
        }
        .s34-cm-write-main { display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; font-weight: 600; }
        .s34-cm-write-main svg { display: block; opacity: .8; }
        .s34-cm-write-sub { font-size: 10.5px; font-weight: 500; opacity: .55; white-space: nowrap; }
        .s34-cm-write:hover { border-color: #ff5f8f !important; color: #fff !important; }
        .s34-cm-write:hover .s34-cm-write-sub { opacity: .8; }
        .s34-cm-list { display: flex; flex-direction: column; gap: 4px; }
        .s34-cm {
            display: flex;
            gap: 12px;
            padding: 12px 10px;
            border-radius: 12px;
            transition: background-color .12s;
        }
        .s34-cm:hover { background-color: rgba(255,255,255,0.035) !important; }
        .s34-cm-avatar {
            flex: none;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font: 800 15px system-ui, -apple-system, Segoe UI, sans-serif;
            color: #fff !important;
            box-shadow: inset 0 0 0 2px rgba(255,255,255,0.12);
        }
        .s34-cm-main { flex: 1; min-width: 0; }
        .s34-cm-meta { display: flex; flex-wrap: wrap; align-items: baseline; gap: 8px; margin-bottom: 3px; }
        .s34-cm-user { font-weight: 700; color: #fff !important; text-decoration: none !important; }
        a.s34-cm-user:hover { text-decoration: underline !important; }
        .s34-cm-date { font-size: 11.5px; opacity: .5; }
        .s34-cm-score {
            font-size: 11px;
            font-weight: 700;
            padding: 0 6px;
            border-radius: 6px;
            background-color: rgba(126,224,126,0.12) !important;
            color: #7ee07e !important;
        }
        .s34-cm-text { white-space: pre-wrap; overflow-wrap: anywhere; color: #d4d4dc !important; }
        .s34-cm-text a { color: #8ab4f8 !important; }
        .s34-cm-empty { padding: 26px 4px; opacity: .6; font-style: italic; display: flex; align-items: center; gap: 8px; }
        .s34-cm-more {
            display: block;
            width: 100%;
            margin: 8px 0 4px;
            height: 36px;
            border-radius: 10px;
            border: 1px solid rgba(255,255,255,0.12) !important;
            background-color: rgba(255,255,255,0.05) !important;
            color: #e8e8ee !important;
            font: 600 12.5px system-ui, -apple-system, Segoe UI, sans-serif;
            cursor: pointer;
        }
        .s34-cm-more:hover { border-color: #ff5f8f !important; }
        .s34-cm-more:disabled { opacity: .6; cursor: progress; }

        /* (Beta 3.9.2) Info as chips: when, who, where from */
        .s34-pv-chips2 { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
        .s34-pv-chip2 { display: inline-flex; align-items: center; gap: 4px; padding: 3px 9px; border-radius: 99px; border: 1px solid rgba(255,255,255,.12) !important;
            background: rgba(255,255,255,.05) !important; color: #dcdce4 !important; font: 500 12px/1.4 system-ui, sans-serif; text-decoration: none !important; max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        a.s34-pv-chip2:hover { border-color: #ff5f8f !important; color: #fff !important; }
        .s34-pv-source { font-weight: 700; }
        /* (Beta 3.9.2) Favourite · Collection / Later · iCame: two even rows */
        .s34-pv-row2 { display: grid !important; grid-template-columns: 1fr 1fr; gap: 6px; }
        .s34-pv-row2 > button { width: auto !important; min-width: 0; justify-content: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .s34-pv-row2 > button span { overflow: hidden; text-overflow: ellipsis; }
        /* (Beta 3.9.3) More: Find source · Similar · Upscale · Report */
        .s34-pv-more { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-top: 6px; }
        .s34-pv-morebtn { display: flex; align-items: center; justify-content: center; height: 30px; padding: 0 8px; border-radius: 8px; border: 1px solid rgba(255,255,255,.12) !important;
            background: rgba(255,255,255,.04) !important; color: #cfcfd8 !important; font: 600 12px/1 system-ui, sans-serif; text-decoration: none !important; cursor: pointer; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; box-sizing: border-box; }
        .s34-pv-morebtn:hover { border-color: #ff5f8f !important; color: #fff !important; }
        .s34-pv-report:hover { border-color: #ff6b6b !important; }
        .s34-report-why { width: 100%; box-sizing: border-box; margin: 4px 0 10px; padding: 8px 10px; border-radius: 8px; border: 1px solid #3a3a44 !important; background: #121216 !important; color: #eee !important; font: 14px system-ui, sans-serif; resize: vertical; }
        /* (Beta 3.9.4) Similar: a filmstrip along the bottom of the picture */
        .s34-pv-simstrip { position: sticky; bottom: 0; z-index: 6; margin-top: -132px; height: 132px; box-sizing: border-box; padding: 8px 10px; background: linear-gradient(to top, rgba(10,10,14,.96), rgba(10,10,14,.82)) !important; border-top: 1px solid rgba(255,255,255,.12); }
        .s34-pv-strip-head { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; font: 600 12px system-ui, sans-serif; color: #dcdce4; }
        .s34-pv-strip-head b { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .s34-pv-strip-keys { flex: none; font-weight: 500; font-size: 11px; color: #9a9aa6; }
        @media (max-width: 700px) { .s34-pv-strip-keys { display: none; } }
        .s34-pv-strip-head button { border: none !important; background: none !important; color: #ccc !important; cursor: pointer; font-size: 14px; }
        .s34-pv-strip-row { display: flex; gap: 8px; overflow-x: auto; overflow-y: hidden; height: 90px; align-items: center; scrollbar-width: thin; overscroll-behavior: contain; }
        .s34-pv-strip-item { flex: none; height: 86px; width: 86px; padding: 0 !important; border-radius: 8px; overflow: hidden; border: 2px solid transparent !important; background: #1b1b20 !important; cursor: pointer; }
        .s34-pv-strip-item img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .s34-pv-strip-item:hover, .s34-pv-strip-item.s34-on { border-color: #ff5f8f !important; }
        .s34-pv-strip-wait { color: #aaa; font-size: 12px; }
        /* Later / iCame next to Collection */
        .s34-pv-later.s34-on { border-color: #8ab4f8 !important; color: #cfe0ff !important; }
        .s34-pv-icame svg { width: 17px; height: 17px; }
        .s34-pv-icame.s34-on { color: #9fd8ff !important; border-color: rgba(159,216,255,.6) !important; }
        .s34-pv-icame.s34-pop svg { animation: s34-splash .6s ease-out; }
        @keyframes s34-splash { 0% { transform: scale(1); } 35% { transform: scale(1.45) rotate(-8deg); } 100% { transform: scale(1); } }

        /* Popup: zoom */
        .s34-pv-overlay { grid-template-rows: minmax(0, 1fr); }
        .s34-pv-stage img.s34-pv-media:not(.s34-pv-placeholder) { cursor: zoom-in; }
        .s34-pv-stage.s34-pv-zoomed {
            display: block;
            overflow: auto;
            padding: 0;
            cursor: default;
        }
        .s34-pv-stage.s34-pv-zoomed img.s34-pv-media {
            display: block;
            max-width: none !important;
            max-height: none !important;
            object-fit: fill;
            margin: 0 auto;
            cursor: grab;
        }
        .s34-pv-stage.s34-pv-dragging img.s34-pv-media { cursor: grabbing !important; }
        .s34-pv-stage.s34-pv-strip { overflow-x: hidden; overflow-y: auto; }
        .s34-pv-stage.s34-pv-strip img.s34-pv-media { cursor: zoom-out; }

    `;

