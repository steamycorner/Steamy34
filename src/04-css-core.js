    const CORE_CSS = `
        /* Square corners (setting "Rounded corners" off): everything Steamy34
           draws and styles - except loading circles, the round pictures in
           the Following window and the video player */
        html.s34-square body *:not(.s34-spin, .s34-fw-av, .fluid_video_wrapper *),
        html.s34-square body *:not(.s34-spin, .s34-fw-av, .fluid_video_wrapper *)::before,
        html.s34-square body *:not(.s34-spin, .s34-fw-av, .fluid_video_wrapper *)::after { border-radius: 0 !important; }
        /* Download panel (batch downloads / collections): progress, pause, cancel */
        .s34-dlp {
            position: fixed;
            left: 16px;
            bottom: 16px;
            z-index: 2147483600;
            width: 300px;
            max-width: calc(100vw - 32px);
            box-sizing: border-box;
            padding: 12px 14px;
            border-radius: 12px;
            background-color: #1c1c21 !important;
            border: 1px solid #34343c !important;
            box-shadow: 0 10px 30px rgba(0,0,0,0.45);
            color: #e8e8ec !important;
            font: 13px/1.4 system-ui, -apple-system, Segoe UI, sans-serif;
        }
        .s34-dlp-head { display: flex; align-items: baseline; gap: 8px; }
        .s34-dlp-head b { font-size: 13px; }
        .s34-dlp-count { margin-left: auto; font-variant-numeric: tabular-nums; opacity: .8; }
        .s34-dlp-bar { height: 6px; margin: 9px 0 7px; border-radius: 3px; background-color: #2c2c33 !important; overflow: hidden; }
        .s34-dlp-bar i { display: block; height: 100%; width: 0; border-radius: 3px; background: linear-gradient(90deg, #ff5f8f, #8f5bff); transition: width .3s; }
        .s34-dlp.s34-dlp-paused .s34-dlp-bar i { background: #8a8a95; }
        .s34-dlp-text { font-size: 12px; opacity: .7; min-height: 17px; overflow-wrap: anywhere; }
        .s34-dlp-btns { display: flex; gap: 6px; margin-top: 9px; }
        .s34-dlp .s34-dlp-btns button {
            flex: 1;
            height: 28px;
            border-radius: 7px;
            border: 1px solid #3a3a44 !important;
            background-color: #26262c !important;
            color: inherit !important;
            font: 600 12px system-ui, -apple-system, Segoe UI, sans-serif;
            cursor: pointer;
        }
        .s34-dlp .s34-dlp-btns button:hover { background-color: #303038 !important; }
        @media (max-width: 760px) { .s34-dlp { left: 10px; right: 10px; width: auto; max-width: none; bottom: 10px; } }

        /* Tag bars and marks sit on top of the thumbnail */
        .image-list span.thumb { position: relative; }

        .s34-hover-video {
            position: absolute;
            inset: 0;
            width: 100% !important;
            height: 100% !important;
            object-fit: cover;
            z-index: 1;
            pointer-events: none;   /* clicks still open the post */
            background: transparent !important; /* (black made a not-yet-drawn video look like a dark box) */
            opacity: 0;
            transition: opacity .15s ease;
        }
        .s34-hover-video.s34-playing { opacity: 1; }
        .s34-loading::before {
            content: '';
            position: absolute;
            z-index: 3;
            bottom: 0; left: 0;
            height: 3px; width: 100%;
            background: linear-gradient(90deg, transparent, #8ab4f8, transparent) !important;
            animation: s34-load 1s linear infinite;
        }
        @keyframes s34-load { from { transform: translateX(-100%); } to { transform: translateX(100%); } }

        /* Artist / character bar at the bottom of each thumbnail */
        .image-list span.thumb.s34-bl-hidden { display: none !important; }
        .s34-tagbar {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 3;
            display: flex;
            flex-direction: column;
            gap: 3px;
            padding: 16px 5px 5px;
            background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.82)) !important;
            pointer-events: none; /* the image underneath stays clickable */
        }
        .s34-chiprow {
            display: flex;
            gap: 3px;
            overflow: hidden;
            min-width: 0;
        }
        .s34-chip {
            pointer-events: auto;
            display: inline-flex;
            align-items: center;
            min-width: 0;
            max-width: 100%;
            border-radius: 999px;
            background-color: rgba(18,18,22,0.85) !important;
            border: 1px solid rgba(255,255,255,0.14) !important;
            font: 600 10.5px/1.6 system-ui, -apple-system, Segoe UI, sans-serif;
            overflow: hidden;
        }
        .s34-chip .s34-chip-name {
            padding: 0 7px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            text-decoration: none !important;
        }
        .s34-chip-artist    .s34-chip-name { color: #ff8a80 !important; }
        .s34-chip-character .s34-chip-name { color: #7ee07e !important; }
        .s34-chip .s34-chip-name:hover { text-decoration: underline !important; }
        /* Block icon: appears while the thumbnail is hovered and lingers
           ~1.5s after the mouse leaves, so it's easy to reach */
        .s34-chip .s34-chip-block {
            display: inline-block;
            flex: none;
            max-width: 0;
            opacity: 0;
            overflow: hidden;
            margin: 0 !important;
            padding: 0 !important;
            border: 0 !important;
            background: transparent !important;
            color: #ff6b6b !important;
            font-size: 12px;
            line-height: 1;
            cursor: pointer;
            transition: max-width .15s ease 1.5s, opacity .15s ease 1.5s, padding .15s ease 1.5s;
        }
        span.thumb:hover .s34-chip .s34-chip-block {
            max-width: 20px;
            opacity: .6;
            padding: 0 6px 0 0 !important;
            transition-delay: 0s;
        }
        span.thumb .s34-chip:hover .s34-chip-block { opacity: 1; }

        /* "+" (add to search) on thumbnail chips: shows up with the block icon */
        span.thumb .s34-chip .s34-chip-add {
            display: inline-block;
            flex: none;
            max-width: 0;
            opacity: 0;
            overflow: hidden;
            padding: 0 !important;
            font-size: 12px;
            transition: max-width .15s ease 1.5s, opacity .15s ease 1.5s, padding .15s ease 1.5s;
        }
        span.thumb:hover .s34-chip .s34-chip-add {
            max-width: 20px;
            opacity: .7;
            padding: 0 4px 0 0 !important;
            transition-delay: 0s;
        }
        span.thumb .s34-chip .s34-chip-add:hover { opacity: 1; }
        /* Already in the search (− / ↺): always shown */
        span.thumb .s34-chip .s34-chip-add[data-state="in"],
        span.thumb .s34-chip .s34-chip-add[data-state="out"] {
            max-width: 20px;
            opacity: 1;
            padding: 0 4px 0 0 !important;
            transition: none;
        }

        /* Blacklisted tag chip: crossed out, unblock (↺) button always shown */
        .s34-chip.s34-chip-blocked { border-color: rgba(255,80,80,0.6) !important; }
        .s34-chip.s34-chip-blocked .s34-chip-name { text-decoration: line-through !important; opacity: .7; }
        span.thumb .s34-chip.s34-chip-blocked .s34-chip-block {
            max-width: 20px;
            opacity: 1;
            padding: 0 6px 0 0 !important;
            color: #8ab4f8 !important;
            transition: none;
        }

        /* Post blacklisted while on screen: greyed out and labelled, still usable */
        span.thumb.s34-bl-marked img:not(.s34-hover-video) {
            filter: grayscale(1) brightness(.35) blur(2px);
        }
        span.thumb.s34-bl-marked .s34-badge { display: none; }
        .s34-bl-label {
            position: absolute;
            top: 6px;
            left: 6px;
            right: 6px;
            z-index: 4;
            padding: 4px 8px;
            border-radius: 6px;
            background-color: rgba(190,30,30,0.88) !important;
            color: #fff !important;
            font: 700 11px/1.35 system-ui, -apple-system, Segoe UI, sans-serif;
            pointer-events: none;
            overflow-wrap: anywhere;
        }
        .s34-chip .s34-chip-block:hover { color: #ff2d2d !important; }
        .s34-chip-more {
            pointer-events: auto;
            flex: none;
            padding: 0 6px;
            border-radius: 999px;
            background-color: rgba(18,18,22,0.85) !important;
            color: #c8c8d0 !important;
            font: 600 10.5px/1.6 system-ui, sans-serif;
            cursor: default;
        }

        .s34-chip-wait {
            align-self: flex-start;
            opacity: .65;
            font-style: italic;
            animation: s34-pulse 1.2s ease-in-out infinite;
        }
        @keyframes s34-pulse { 50% { opacity: .3; } }

        /* ---- Messages: a stack at the bottom (newest at the bottom, max 3) ---- */
        .s34-toasts {
            position: fixed;
            left: 50%;
            bottom: 24px;
            z-index: 100000;
            transform: translateX(-50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            pointer-events: none;
            width: max-content;
            max-width: calc(100vw - 24px);
        }
        .s34-toast {
            position: relative;
            display: flex;
            align-items: center;
            gap: 14px;
            max-width: 100%;
            box-sizing: border-box;
            padding: 10px 16px;
            border-radius: 10px;
            background-color: #1c1c20 !important;
            border: 1px solid #33333a !important;
            color: #dcdce0 !important;
            font: 13px/1.3 system-ui, -apple-system, Segoe UI, sans-serif;
            box-shadow: 0 8px 24px rgba(0,0,0,0.55);
            transform: translateY(16px);
            opacity: 0;
            pointer-events: none;
            transition: opacity .2s, transform .2s;
        }
        .s34-toast.s34-show { opacity: 1; transform: none; pointer-events: auto; }
        /* long file names wrap instead of running off the edge */
        .s34-toast > span:first-child { min-width: 0; flex: 1 1 auto; overflow-wrap: anywhere; text-align: left; }
        .s34-toast .s34-toast-close,
        .s34-toast .s34-toast-close:hover {
            background: transparent !important;
            border: none !important;
            padding: 0 2px !important;
            color: inherit !important;
            font: inherit;
            font-weight: 400;
            cursor: pointer;
            opacity: .6;
        }
        .s34-toast .s34-toast-close:hover { opacity: 1; }
        @media (max-width: 760px) {
            .s34-toasts { width: calc(100vw - 24px); bottom: 14px; }
            .s34-toast { width: 100%; }
        }

        /* ---- Popup viewer ---- */
        html.s34-pv-open { overflow: hidden !important; }
        /* Keep room for the scrollbar even while it's hidden by the popup,
           so the thumbnail rows don't get wider and shift around */
        html { scrollbar-gutter: stable; }
        .s34-pv-overlay {
            position: fixed;
            inset: 0;
            z-index: 99990;
            display: grid;
            grid-template-columns: 290px 1fr;
            background-color: rgba(8,8,10,0.94) !important;
            font: 13px/1.4 system-ui, -apple-system, Segoe UI, sans-serif;
        }
        .s34-pv-side {
            display: flex;
            flex-direction: column;
            gap: 12px;
            min-height: 0;
            overflow-y: auto;
            padding: 14px;
            background-color: #16161a !important;
            border-right: 1px solid #2a2a31 !important;
        }
        .s34-pv-top { display: flex; align-items: center; gap: 6px; }
        .s34-pv-nav {
            width: 34px;
            height: 30px;
            padding: 0 !important;
            border-radius: 8px;
            border: 1px solid #33333a !important;
            background-color: #24242a !important;
            color: #dcdce0 !important;
            font-size: 20px;
            line-height: 1;
            cursor: pointer;
        }
        .s34-pv-nav:hover { background-color: #2f2f37 !important; }
        .s34-pv-full {
            flex: 1;
            text-align: center;
            font-size: 12px;
            color: #8ab4f8 !important;
            text-decoration: none !important;
        }
        .s34-pv-full:hover { text-decoration: underline !important; }
        .s34-pv-close {
            font-size: 18px;
            padding: 0 6px;
            cursor: pointer;
            color: #dcdce0 !important;
            opacity: .7;
        }
        .s34-pv-close:hover { opacity: 1; }
        .s34-pv-tags h4 {
            margin: 12px 0 6px !important;
            font-size: 11px !important;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #9a9aa3 !important;
        }
        .s34-pv-chips { display: flex; flex-wrap: wrap; gap: 5px; }
        .s34-pv-chips .s34-chip { font-size: 12px; }
        /* No hover needed in the popup: block buttons always visible */
        .s34-pv-chips .s34-chip .s34-chip-block {
            max-width: 20px;
            opacity: .75;
            padding: 0 7px 0 0 !important;
            transition: none;
        }
        .s34-pv-chips .s34-chip .s34-chip-block:hover { opacity: 1; }
        .s34-chip .s34-chip-add {
            all: unset;
            cursor: pointer;
            padding: 0 4px 0 1px;
            font: 700 13px/1 system-ui, sans-serif;
            color: #7ee07e !important;
            opacity: .75;
        }
        .s34-chip .s34-chip-add:hover { opacity: 1; color: #a6ffa6 !important; }
        .s34-chip .s34-chip-add, .s34-chip .s34-chip-block { background: transparent !important; border: none !important; }
        .s34-chip .s34-chip-add[data-state="in"],
        #tag-sidebar li a.r34-add-btn[data-state="in"] { color: #ffb86b !important; opacity: 1; }
        .s34-chip .s34-chip-add[data-state="out"],
        #tag-sidebar li a.r34-add-btn[data-state="out"] { color: #8ab4f8 !important; opacity: 1; }
        .s34-chip-count { font-size: 10.5px; opacity: .55; padding-right: 5px; color: #dcdce0 !important; }
        .s34-chip-copyright .s34-chip-name { color: #d68cff !important; }
        .s34-chip-general   .s34-chip-name { color: #8ab4f8 !important; }
        .s34-chip-metadata  .s34-chip-name { color: #ffb86b !important; }
        .s34-pv-note { margin-top: 8px; font-size: 11px; font-style: italic; opacity: .6; color: #dcdce0 !important; }

        .s34-pv-stage {
            position: relative;
            min-width: 0;
            min-height: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 16px;
            cursor: zoom-out;
        }
        .s34-pv-media {
            width: 100%;
            height: 100%;
            object-fit: contain;
            cursor: default;
            background: transparent !important;
        }
        .s34-pv-placeholder { position: absolute; inset: 16px; width: calc(100% - 32px); height: calc(100% - 32px); filter: blur(6px); opacity: .6; }
        .s34-pv-media.s34-pv-loading { opacity: 0; position: absolute; }

        /* Cloudflare check window - same look as the other Steamy34 windows */
        .s34-panel.s34-cf-panel {
            width: min(860px, calc(100vw - 32px));
            border-radius: 18px;
            overflow: hidden;
            /* our window around the check gets the pink-to-purple glow
               (the check page inside stays exactly as Cloudflare sends it) */
            border: 1.5px solid transparent !important;
            background: linear-gradient(#17161c, #17161c) padding-box,
                        linear-gradient(135deg, rgba(255,95,143,0.9), rgba(139,61,255,0.9)) border-box !important;
            box-shadow: 0 30px 80px rgba(0,0,0,0.7), 0 0 28px rgba(255,95,143,0.28), 0 0 60px rgba(139,61,255,0.22);
            animation: s34-blm-in .16s ease-out;
        }
        .s34-cf-panel .s34-panel-head { padding: 18px 20px 6px; border-bottom: none !important; }
        .s34-cf-panel .s34-panel-head h2 { font-size: 18px !important; font-weight: 800; }
        .s34-cf-panel .s34-close {
            width: 32px; height: 32px; padding: 0; border-radius: 10px; font-size: 14px; line-height: 32px; text-align: center;
            background-color: rgba(255,255,255,0.06) !important; opacity: 1;
        }
        .s34-cf-panel .s34-close:hover { background-color: rgba(255,255,255,0.12) !important; }
        .s34-cf-note { padding: 0 20px 12px; font-size: 13px; opacity: .75; }
        .s34-cf-panel .s34-cf-frame { margin: 0 20px; width: calc(100% - 40px); border-radius: 12px; }
        .s34-cf-panel .s34-panel-foot { padding: 14px 20px 18px; border-top: none !important; gap: 8px; }
        .s34-cf-panel .s34-btn {
            height: 34px; padding: 0 14px; border-radius: 10px; font: 600 12.5px system-ui, -apple-system, Segoe UI, sans-serif;
            background-color: rgba(255,255,255,0.06) !important; border: 1px solid rgba(255,255,255,0.12) !important;
        }
        .s34-cf-panel .s34-btn:hover { border-color: #ff5f8f !important; }
        .s34-cf-panel .s34-btn.s34-primary { background: linear-gradient(135deg, #ff5f8f, #8b3dff) !important; border: none !important; color: #fff !important; }
        .s34-cf-panel .s34-btn.s34-link { background: transparent !important; border-color: transparent !important; margin-right: auto; }
        .s34-batch button svg, .s34-vopts button svg { display: inline-block; vertical-align: -2px; }
        .s34-cf-frame {
            display: block;
            width: 100%;
            /* As tall as the screen allows (title, note and buttons need
               about 200px), so the tick box further down is always in view */
            height: min(820px, calc(100vh - 210px));
            min-height: 300px;
            border: 0 !important;
            border-top: 1px solid #2c2c33 !important;
            background-color: #fff !important;
        }
        .s34-toast button:not(.s34-toast-close) {
            padding: 4px 12px !important;
            border-radius: 6px;
            border: 1px solid #2f5fbf !important;
            background-color: #2f5fbf !important;
            color: #fff !important;
            font-weight: 600;
            cursor: pointer;
        }

        .s34-badge {
            z-index: 2;
            position: absolute;
            top: 6px;
            left: 6px;
            padding: 2px 6px;
            border-radius: 4px;
            font: bold 10px/1.4 sans-serif;
            letter-spacing: .5px;
            color: #fff !important;
            background: rgba(0,0,0,0.7) !important;
            pointer-events: none;
        }
        .s34-badge.s34-video { background: rgba(30,90,220,0.85) !important; }

        #paginator { text-align: center; margin: 16px 0; }
        /* Only one page (e.g. a short favourites list): no lone "1" */
        #paginator:not(:has(a)) { display: none !important; }

        /* Page divider: a line across with a "PAGE N" pill in the middle */
        .s34-page-divider {
            display: flex;
            align-items: center;
            gap: 14px;
            margin: 28px 0 14px;
        }
        .s34-page-divider::before,
        .s34-page-divider::after {
            content: '';
            flex: 1;
            height: 2px;
            border-radius: 2px;
            background: linear-gradient(90deg, transparent, #2f5fbf) !important;
        }
        .s34-page-divider::after {
            background: linear-gradient(90deg, #2f5fbf, transparent) !important;
        }
        .s34-page-divider span {
            padding: 5px 16px;
            border-radius: 999px;
            border: 1px solid #2f5fbf !important;
            background-color: rgba(47,95,191,0.18) !important;
            color: #cfe0ff !important;
            font: 700 13px/1 system-ui, -apple-system, Segoe UI, sans-serif;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            white-space: nowrap;
        }
        .s34-page-divider.s34-first { margin-top: 6px; }
        .s34-scroll-status {
            text-align: center;
            padding: 20px 0 40px;
            min-height: 1px;
            opacity: .7;
            cursor: default;
        }
    `;

