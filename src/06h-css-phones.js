    const PHONE_CSS = `
        /* (Beta 3.9.4) Hold a thumbnail: its buttons as a sheet from the bottom */
        .s34-tsheet-overlay { align-items: flex-end !important; }
        .s34-tsheet { width: min(520px, 100vw); margin: 0 auto; box-sizing: border-box; padding: 10px 12px calc(12px + env(safe-area-inset-bottom)); border-radius: 16px 16px 0 0;
            background: var(--s34-panel, #1c1c20) !important; border: 1px solid var(--s34-border, #33333b); display: grid; gap: 8px; }
        .s34-tsheet-head { display: flex; align-items: center; justify-content: space-between; padding: 2px 2px 4px; font-size: 15px; }
        .s34-tsheet-head button { border: none !important; background: none !important; color: inherit !important; font-size: 18px; }
        .s34-tsheet > button { height: 48px; border-radius: 12px; border: 1px solid var(--s34-border, #33333b) !important; background: var(--s34-panel-2, #24242a) !important; color: inherit !important; font: 600 16px system-ui, sans-serif; text-align: left; padding: 0 16px !important; }
        .image-list span.thumb { -webkit-touch-callout: none; user-select: none; }
        /* ================= PHONES ================= */
        /* No mouse: buttons that normally appear on hover are always there */
        @media (hover: none) {
            span.thumb .s34-chip .s34-chip-add,
            span.thumb .s34-chip .s34-chip-block {
                max-width: 22px; opacity: .85; padding: 0 5px 0 0 !important; transition: none;
            }
            span.thumb .s34-fav-btn { opacity: .85; }
            .s34-tile-acts { opacity: 1; }
            .s34-tile.s34-tile-iscover .s34-tile-acts button { opacity: 1; }
            .image-list span.thumb:hover { transform: none; }
        }
        @media (max-width: 760px), (pointer: coarse) and (max-width: 1000px) {
            /* The sidebar doesn't stick on a small screen (it would cover the posts) */
            html body #post-list > .sidebar,
            html body .sidebar:has(+ .content .image-list),
            html body .sidebar:has(~ .content .image-list),
            html body .sidebar, html body #sidebar,
            html body .s34-sticky-top {
                position: static !important;
                top: auto !important;
            }

            /* Popup: picture on top, then buttons, info and tags, then comments -
               one page you scroll through */
            .s34-pv-overlay {
                display: flex !important;
                flex-direction: column;
                background-color: #0a0a0c !important;
                overflow-y: auto;
                overflow-x: hidden;
                overscroll-behavior: contain;
            }
            /* fully opaque in every colour mode (beats the White / OLED tints) */
            html[class] .s34-pv-overlay.s34-pv-overlay { background-color: #0a0a0c !important; }
            .s34-pv-main { display: contents; }
            .s34-pv-main > .s34-pv-stage, .s34-pv-overlay .s34-pv-stage {
                order: 1;
                flex: none;
                height: 72vh;
                height: 72svh;
                padding: 0;
                cursor: default;
                touch-action: pan-y pinch-zoom;
            }
            .s34-pv-overlay .s34-pv-stage.s34-pv-zoomed { touch-action: auto; }
            .s34-pv-overlay .s34-pv-side,
            .s34-pv-overlay.s34-pv-theater .s34-pv-side {
                order: 2;
                display: flex;
                flex: none;
                overflow: visible;
                min-height: 0;
                padding: 14px 14px 18px;
                border-right: none !important;
                border-top: 1px solid #2a2a31 !important;
            }
            .s34-pv-overlay .s34-cm-section { order: 3; flex: none; width: 100%; padding: 20px 14px 70px; }
            /* (Beta 3.10.1) Similar: a row right under the picture (not floating over it) */
            .s34-pv-overlay .s34-pv-simstrip { order: 1; flex: none; position: relative; margin: 0; height: auto; padding: 10px 12px 12px; border-top: 1px solid #2a2a31; }
            .s34-pv-overlay .s34-pv-strip-row { height: 80px; gap: 10px; -webkit-overflow-scrolling: touch; }
            .s34-pv-overlay .s34-pv-strip-item { width: 76px; height: 76px; }
            .s34-pv-overlay .s34-pv-strip-head button { font-size: 18px; padding: 4px 8px !important; }
            /* Collections: hold a post, then drag it (no mouse) */
            .s34-tiles-drag .s34-tile { -webkit-touch-callout: none; user-select: none; }
            .s34-tile.s34-dragging { transform: scale(1.04); }
            .s34-win textarea.s34-coll-note { font-size: 16px; } /* (smaller text makes phones zoom in) */
            .s34-cm-head { flex-wrap: wrap; }
            .s34-cm-write { margin-left: 0; align-items: flex-start; }
            /* Floating buttons over the picture: previous, next, close */
            .s34-pv-overlay .s34-pv-tbar,
            .s34-pv-overlay.s34-pv-theater .s34-pv-tbar {
                display: flex;
                position: fixed;
                top: 10px;
                right: 10px;
                opacity: .92;
            }
            .s34-pv-tbar button { width: 42px; height: 42px; font-size: 20px; }
            .s34-pv-tbar [data-act="theater"], .s34-pv-theaterbtn { display: none !important; }
            .s34-pv-top .s34-pv-nav, .s34-pv-top .s34-pv-close { display: none; }
            /* Bigger tap targets */
            .s34-pv-side .s34-dl-btn.s34-inline { padding: 13px 12px; }
            .s34-pv-fav, .s34-pv-collect, .s34-pv-later, .s34-pv-icame { height: 42px; }
            .s34-pv-chips .s34-chip { font-size: 13px; line-height: 1.9; }
            .s34-pv-chips .s34-chip .s34-chip-add, .s34-pv-chips .s34-chip .s34-chip-block { padding: 0 8px 0 4px !important; font-size: 15px; }
        }

        /* "Steamy34 on your phone" announcement + Android guide */
        .s34-mob-hero {
            position: relative;
            display: flex;
            align-items: center;
            gap: 18px;
            padding: 20px 22px;
            border-radius: 16px;
            overflow: hidden;
            background: linear-gradient(135deg, #ff5f8f 0%, #b04bff 55%, #6a3dff 100%) !important;
            color: #fff !important;
            box-shadow: 0 14px 34px rgba(139,61,255,0.35);
        }
        .s34-mob-hero::after {
            content: '';
            position: absolute;
            right: -40px; top: -60px;
            width: 220px; height: 220px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255,255,255,0.28), transparent 65%) !important;
            pointer-events: none;
        }
        .s34-mob-hero, .s34-mob-steps, .s34-mob-note, .s34-mob-foot { flex: none; }
        .s34-mob-phone { flex: none; width: 74px; height: auto; filter: drop-shadow(0 8px 14px rgba(0,0,0,0.35)); }
        .s34-mob-hero-text { position: relative; z-index: 1; min-width: 0; }
        .s34-mob-badge {
            display: inline-block;
            margin-bottom: 6px;
            padding: 1px 8px;
            border-radius: 999px;
            font: 800 10px/18px system-ui, -apple-system, Segoe UI, sans-serif;
            letter-spacing: .8px;
            text-transform: uppercase;
            background-color: rgba(255,255,255,0.22) !important;
            color: #fff !important;
        }
        .s34-mob-hero h3 { margin: 0 0 4px !important; font-size: 21px !important; font-weight: 800; line-height: 1.2; color: #fff !important; }
        .s34-mob-hero p { margin: 0 !important; font-size: 13px; line-height: 1.45; color: rgba(255,255,255,0.9) !important; }
        .s34-mob-steps { display: flex; flex-direction: column; gap: 8px; counter-reset: s34step; }
        .s34-mob-step {
            display: flex;
            gap: 12px;
            padding: 11px 13px;
            border-radius: 12px;
            background-color: rgba(255,255,255,0.04) !important;
            border: 1px solid rgba(255,255,255,0.07) !important;
        }
        .s34-mob-step::before {
            counter-increment: s34step;
            content: counter(s34step);
            flex: none;
            width: 26px; height: 26px;
            border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            font: 800 13px system-ui, -apple-system, Segoe UI, sans-serif;
            color: #fff;
            background: linear-gradient(135deg, #ff5f8f, #8b3dff);
        }
        .s34-mob-step b { display: block; font-size: 13.5px; margin-bottom: 2px; }
        .s34-mob-step span { font-size: 12.5px; line-height: 1.5; color: #c4c4cc !important; }
        .s34-mob-step em { font-style: normal; font-weight: 700; color: #e8e8ee !important; }
        .s34-mob-step.s34-mob-optional { border-style: dashed !important; }        .s34-mob-opt { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .6px; opacity: .55; margin-left: 6px; }
        .s34-mob-note {
            padding: 10px 13px;
            border-radius: 12px;
            font-size: 12px;
            line-height: 1.55;
            background-color: rgba(255,179,71,0.07) !important;
            border: 1px solid rgba(255,179,71,0.3) !important;
            color: #e8d4b4 !important;
        }
        .s34-mob-note b { color: #ffcf8a !important; }
        .s34-mob-note ul { margin: 4px 0 0 !important; padding-left: 18px !important; }
        .s34-mob-note li { list-style: disc !important; margin: 2px 0; }
        .s34-mob-note a { color: #ffcf8a !important; }
        .s34-mob-foot { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 10px; }
        .s34-win .s34-mob-backup {
            display: flex; align-items: center; gap: 6px;
            height: 34px; padding: 0 14px !important; border-radius: 10px; cursor: pointer;
            background-color: rgba(255,255,255,0.06) !important; border: 1px solid rgba(255,255,255,0.12) !important;
            color: #e8e8ee !important; font: 600 12.5px system-ui, -apple-system, Segoe UI, sans-serif;
        }
        .s34-win .s34-mob-backup:hover { border-color: #ff5f8f !important; }
        .s34-win .s34-mob-ok {
            height: 34px; padding: 0 22px !important; border-radius: 10px; border: none !important; cursor: pointer;
            background: linear-gradient(135deg, #ff5f8f, #8b3dff) !important; color: #fff !important; font-weight: 700;
        }
        @media (max-width: 520px) {
            .s34-mob-hero { flex-direction: column; text-align: center; }
        }

    `;

