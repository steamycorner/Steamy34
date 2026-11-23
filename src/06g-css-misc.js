    const MISC_CSS = `
        /* Saved search: "+N new" */
        .s34-sb-new {
            display: inline-block;
            margin-right: 5px;
            padding: 0 5px;
            border-radius: 4px;
            background-color: #e0457b !important;
            color: #fff !important;
            font-size: 10px;
            font-weight: 700;
            line-height: 16px;
        }

        /* Screenshot mode (X): every picture and video blurred - Steamy34's
           own little icons (data: pictures) stay sharp. clip-path keeps the
           blur inside each picture's box. */
        html.s34-sfw img:not([src^="data:"]),
        html.s34-sfw video,
        html.s34-sfw canvas {
            filter: blur(24px) saturate(.6) !important;
            clip-path: inset(0) !important;
        }
        /* ...and comments: text and names (setting censorComments) - in the
           popup and on the site's own post pages */
        html.s34-sfw-text :is(.s34-cm-text, .s34-cm-user, .s34-cm-avatar, #comment-list [id^="cbody"], #comment-list .col1 a) {
            filter: blur(5px) !important;
            user-select: none;
        }
        /* "Info for a bug report" window */
        .s34-debug-win .s34-win-body { display: flex; flex-direction: column; gap: 12px; }
        .s34-debug-text {
            margin: 0;
            padding: 10px 12px;
            max-height: 44vh;
            overflow: auto;
            white-space: pre-wrap;
            word-break: break-word;
            border-radius: 8px;
            border: 1px solid #2e2e36 !important;
            background-color: #121216 !important;
            color: #dcdce0 !important;
            font: 12px/1.5 ui-monospace, Consolas, monospace;
            user-select: text;
        }
        .s34-debug-how { margin: 0; font-size: 12.5px; line-height: 1.5; opacity: .85; }
        .s34-debug-foot { display: flex; justify-content: flex-end; }
        .s34-debug-foot button {
            height: 32px;
            padding: 0 18px !important;
            border-radius: 8px;
            border: none !important;
            background: linear-gradient(135deg, #ffb347, #ff5f8f) !important;
            color: #fff !important;
            font: 600 13px system-ui, -apple-system, Segoe UI, sans-serif;
            cursor: pointer;
        }
        .s34-sfw-label {
            position: fixed;
            right: 12px;
            bottom: 12px;
            z-index: 100000;
            display: inline-flex;
            align-items: center;
            gap: 7px;
            height: 28px;
            padding: 0 6px 0 11px !important;
            border-radius: 999px;
            border: 1px solid rgba(255,255,255,0.18) !important;
            background-color: rgba(18,18,22,0.9) !important;
            color: #e8e8ee !important;
            font: 600 12px system-ui, -apple-system, Segoe UI, sans-serif;
            cursor: pointer;
            box-shadow: 0 4px 14px rgba(0,0,0,0.35);
        }
        .s34-sfw-label span { color: inherit !important; }
        @media (max-width: 760px) { .s34-sfw-label { bottom: 76px; } } /* above the messages on phones */
        .s34-sfw-label kbd {
            padding: 1px 6px;
            border-radius: 4px;
            background-color: rgba(255,255,255,0.14) !important;
            color: #fff !important;
            font: 700 11px system-ui, sans-serif;
        }

        /* Ad spaces with an ad blocker on (right column, the box above the
           posts) - posts use the space */
        .s34-empty-col { display: none !important; }
        /* Until the check (ad blocker seen last time): out of the layout */
        html.s34-adcol-early .content ~ span:has(.postListSidebarRight),
        html.s34-adcol-early .content ~ .postListSidebarRight,
        html.s34-adcol-early :is(span, div):has(~ .image-list):has(ins):not([class*="s34-"]) {
            position: absolute !important;
            visibility: hidden !important;
            pointer-events: none !important;
        }

        /* Small icon buttons (popup ✕ ? Theater, message ✕, window ✕): real
           buttons for the keyboard, but without the page's button look */
        .s34-pv-top .s34-pv-iconbtn,
        .s34-pv-top .s34-pv-iconbtn:hover {
            background: transparent !important;
            margin: 0 !important;
            font: inherit;
            line-height: 1;
            cursor: pointer;
        }
        .s34-pv-top .s34-pv-close, .s34-pv-top .s34-pv-theaterbtn { border: none !important; padding: 0 6px !important; }
        .s34-pv-top .s34-pv-close { font-size: 18px; }
        .s34-pv-top .s34-pv-help { padding: 0 !important; font-size: 13px; font-weight: 800; }
        .s34-cf-panel .s34-close { border: none !important; }
        /* Keyboard focus: a clear ring (mouse clicks don't show it) */
        .s34-pv-iconbtn:focus-visible, .s34-toast-close:focus-visible, .s34-close:focus-visible,
        .s34-gear:focus-visible, .s34-blbtn:focus-visible, .s34-dl-btn:focus-visible,
        .s34-menu-btn:focus-visible, .s34-menu-list a:focus-visible {
            outline: 2px solid #b48cff !important;
            outline-offset: 2px;
        }

        /* Phones: one Menu button (on the banner) + side panel */
        html.s34-phone-menu label.tlabel { display: none !important; }
        html.s34-phone-menu #header { position: relative; }
        .s34-menu-btn {
            position: absolute;
            top: 15px;
            right: 12px;
            z-index: 60;
            width: 42px;
            height: 42px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 !important;
            border-radius: 13px !important;
            background-color: rgba(16,16,20,0.72) !important;
            border: 1px solid rgba(255,255,255,0.22) !important;
            color: #f4f4f6 !important; /* follows the colour mode (pure #fff wouldn't) */
            backdrop-filter: blur(8px);
            box-shadow: 0 4px 14px rgba(0,0,0,0.35);
            cursor: pointer;
        }
        .s34-menu-btn svg { display: block; color: inherit !important; }
        .s34-menu-btn.s34-menu-btn-fixed { position: fixed; top: 10px; right: 10px; z-index: 9990; }
        /* Steamy34's own tools: hidden, shown inside the menu panel */
        .s34-menu-tools { display: none; }
        .s34-menu .s34-menu-tools { display: flex; flex-direction: column; gap: 8px; }
        .s34-menu .s34-menu-tools > * { margin: 0 !important; }
        .s34-menu .s34-menu-tools .s34-tipslink { justify-content: space-around; }
        /* Icons on dark buttons keep the button's colour (White mode would
           otherwise paint them dark - dark on dark) */
        .s34-fav-btn svg, .s34-dl-mark svg, .s34-pv-tbar svg { color: inherit !important; }
        .s34-vopt-tools { display: grid; grid-template-columns: 1fr 1fr 2fr; gap: 6px; flex: 0 0 100%; margin-top: 0; }
        .s34-vopt-tools button { height: 28px; padding: 0 8px; border-radius: 8px; border: 1px solid rgba(255,255,255,.14) !important; background: rgba(255,255,255,.04) !important; color: inherit !important; font: 600 12px system-ui, sans-serif; cursor: pointer; white-space: nowrap; }
        .s34-vopt-tools button.s34-on { border-color: #8ab4f8 !important; color: #cfe0ff !important; }
        /* ...and the shapes inside them: the colour-mode rule paints every
           element grey, which turned favourited hearts grey instead of red */
        .s34-fav-btn svg *, .s34-pv-fav svg *, .s34-dl-mark svg *, .s34-pv-tbar svg * { color: inherit !important; }
        .s34-menu-overlay {
            position: fixed;
            inset: 0;
            z-index: 100002;
            background-color: rgba(0,0,0,0.5) !important;
            opacity: 0;
            transition: opacity .18s;
        }
        .s34-menu-overlay.s34-show { opacity: 1; }
        .s34-menu {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            width: min(320px, 86vw);
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            gap: 6px;
            padding: 14px 14px 28px;
            overflow-y: auto;
            background-color: #17161c !important;
            border-left: 1px solid rgba(255,255,255,0.08) !important;
            box-shadow: -20px 0 50px rgba(0,0,0,0.5);
            transform: translateX(100%);
            transition: transform .2s ease;
            font: 14px/1.3 system-ui, -apple-system, Segoe UI, sans-serif;
            text-align: left;
        }
        .s34-menu-overlay.s34-show .s34-menu { transform: none; }
        .s34-menu-head { display: flex; align-items: center; justify-content: space-between; padding: 2px 4px 6px; }
        .s34-menu-head b { font-size: 19px; font-weight: 800; color: #f2f2f6 !important; }
        .s34-menu .s34-menu-x {
            width: 38px; height: 38px; padding: 0 !important; border-radius: 11px;
            border: none !important; background-color: rgba(255,255,255,0.07) !important;
            color: #e8e8ee !important; font-size: 15px; cursor: pointer;
        }
        .s34-menu-label {
            margin: 12px 4px 4px;
            font-size: 10.5px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #ff8fa3 !important;
        }
        .s34-menu-list { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
        .s34-menu .s34-menu-list a {
            display: flex;
            align-items: center;
            min-height: 44px;
            padding: 0 12px;
            border-radius: 12px;
            text-decoration: none !important;
            font-weight: 600;
            overflow-wrap: anywhere;
            color: #e8e8ee !important;
            background-color: rgba(255,255,255,0.045) !important;
            border: 1px solid rgba(255,255,255,0.08) !important;
        }
        .s34-menu .s34-menu-list a:active { background-color: rgba(255,255,255,0.1) !important; }
        .s34-menu .s34-menu-list a.s34-on {
            background: linear-gradient(135deg, rgba(255,95,143,0.3), rgba(139,61,255,0.3)) !important;
            border-color: rgba(255,143,176,0.55) !important;
            color: #ffd6e6 !important;
        }

    `;

