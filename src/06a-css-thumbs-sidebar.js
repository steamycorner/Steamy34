    const EXTRA_CSS = `
        /* ♥ on thumbnails: top right, left of the viewed/downloaded mark */
        .s34-fav-btn {
            position: absolute;
            top: 6px;
            right: 6px;
            z-index: 4;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 !important;
            border-radius: 50% !important;
            border: none !important;
            background-color: rgba(20,20,24,0.8) !important;
            box-shadow: 0 1px 4px rgba(0,0,0,0.45);
            color: #fff !important;
            fill: none;
            cursor: pointer;
            opacity: 0;
            transition: opacity .15s, transform .15s;
        }
        span.thumb:has(.s34-dl-mark) .s34-fav-btn { right: 34px; }
        span.thumb:hover .s34-fav-btn { opacity: .9; }
        .s34-fav-btn:hover { opacity: 1 !important; transform: scale(1.12); color: #ff6b7a !important; }
        .s34-fav-btn.s34-faved { opacity: 1; color: #ff6b7a !important; }
        /* (Beta 3.7.4 / 3.8) Download and viewed buttons in a column under the ♥ -
           never under the score pill, fits narrow (tall) thumbnails. While
           hovering all of them; otherwise only the ones that are on (green =
           downloaded, blue = viewed), like a favourited ♥ */
        .s34-tbtns { position: absolute; top: 34px; right: 6px; z-index: 5; display: flex; flex-direction: column; gap: 4px; pointer-events: none; }
        span.thumb:not(:has(.s34-fav-btn)):not(:has(.s34-dl-mark)) .s34-tbtns { top: 6px; }
        html.s34-tx-below span.thumb .s34-tbtns { top: 6px; }
        /* not hovering and no ♥ showing: the green / blue ones move up into the corner */
        span.thumb:not(:hover):not(:has(.s34-fav-btn.s34-faved)):not(:has(.s34-dl-mark)) .s34-tbtns { top: 6px; }
        .s34-tbtn {
            width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;
            padding: 0 !important; border-radius: 50% !important; border: none !important;
            background-color: rgba(20,20,24,0.8) !important; box-shadow: 0 1px 4px rgba(0,0,0,0.45);
            color: #fff !important; cursor: pointer; pointer-events: auto; opacity: .9;
            transition: transform .15s;
        }
        .s34-tbtn:not(.s34-on):not(.s34-busy) { display: none; }
        span.thumb:hover .s34-tbtn { display: flex; }
        /* the eye and its strip: one item in the column (none while it's hidden) */
        .s34-tseen-wrap { position: relative; display: flex; pointer-events: auto; }
        span.thumb:not(:hover) .s34-tseen-wrap:not(:has(.s34-tseen.s34-on)) { display: none; }
        ${CONFIG.thumbMarks ? '' : 'span.thumb:not(:hover) .s34-tseen-wrap { display: none; }'}
        .s34-tseen-fly { position: absolute; right: 100%; top: 0; z-index: 6; display: none; gap: 4px; padding-right: 4px; white-space: nowrap; }
        .s34-tseen-wrap:hover .s34-tseen-fly { display: flex; }
        .s34-tseen-fly button {
            display: inline-flex; align-items: center; gap: 5px; height: 24px; padding: 0 9px 0 7px !important;
            border-radius: 12px !important; border: none !important; background-color: rgba(20,20,24,0.9) !important;
            box-shadow: 0 1px 4px rgba(0,0,0,0.45); color: #fff !important; font: 600 11px/1 system-ui, -apple-system, Segoe UI, sans-serif; cursor: pointer;
        }
        .s34-tseen-fly button svg { width: 12px; height: 12px; flex: none; pointer-events: none; }
        .s34-tseen-fly button span { pointer-events: none; }
        .s34-tseen-fly button:hover { filter: brightness(1.25); }
        .s34-tseen-fly button[data-m="viewed"].s34-on { background-color: rgba(52,98,196,0.95) !important; }
        .s34-tseen-fly button[data-m="dl"].s34-on { background-color: rgba(31,122,62,0.95) !important; }
        .s34-tseen-fly button.s34-on::after { content: '✓'; margin-left: 2px; }
        ${CONFIG.thumbMarks ? '' : 'span.thumb:not(:hover) .s34-tbtn.s34-on:not(.s34-busy) { display: none; }'}
        .s34-tbtn:hover { opacity: 1 !important; transform: scale(1.12); }
        .s34-tdl.s34-on { background-color: rgba(31,122,62,0.92) !important; }
        .s34-tseen.s34-on { background-color: rgba(52,98,196,0.92) !important; }
        .s34-tcoll.s34-on { background-color: rgba(201,138,26,0.92) !important; }
        .s34-tcoll:not(.s34-on):hover { color: #ffd27a !important; }
        .s34-tdl:not(.s34-on):hover { color: #6ee7a8 !important; }
        .s34-tseen:not(.s34-on):hover { color: #8ab4f8 !important; }
        .s34-tbtn svg { display: block; pointer-events: none; }
        .s34-tbtn.s34-busy { opacity: 1 !important; }
        .s34-tbtn.s34-busy svg { display: none; }
        .s34-tbtn .s34-spin { margin: 0; width: 12px; height: 12px; }
        @media (hover: none), (max-width: 760px), (pointer: coarse) and (max-width: 1000px) { .s34-tbtns { display: none !important; } }
        /* Favourites pages: rule34 wraps each thumbnail in an extra box (with
           "Remove" under it on your own list) - the box steps aside so the
           thumbnails join the normal grid, and the ♥ does the removing */
        ${CONFIG.favButtons ? `
        .image-list > span:has(> span.thumb) { display: contents !important; }
        .image-list > span:has(> span.thumb) > :is(br, a[onclick*="s=delete"]) { display: none !important; }` : ''}
        .image-list .s34-site-remove { display: none !important; }
        .image-list span.thumb.s34-unfaved { opacity: .35; filter: grayscale(1); transition: opacity .2s ease; }
        .image-list span.thumb.s34-unfaved:hover { opacity: .7; }

        /* Thumbnail extras only while hovering (the picture stays clean).
           visibility too, so hidden chips can't catch taps on phones.
           VID / GIF labels, NEW, viewed / downloaded marks and favourited
           hearts always stay (while hovering, the score pill takes the
           labels' place). */
        html.s34-tx-hover span.thumb :is(.s34-tagbar, .s34-fav-btn:not(.s34-faved)) {
            opacity: 0 !important;
            visibility: hidden;
            transition: opacity .15s, visibility 0s linear .15s;
        }
        html.s34-tx-hover span.thumb:hover :is(.s34-tagbar, .s34-fav-btn:not(.s34-faved)) {
            opacity: 1 !important;
            visibility: visible;
            transition: opacity .15s;
        }
        /* Phones (no hover, or the phone layout): nothing to hover, so the
           tags and ♥ are simply always there */
        @media (hover: none), (max-width: 760px), (pointer: coarse) and (max-width: 1000px) {
            html.s34-tx-hover span.thumb :is(.s34-tagbar, .s34-tagbar:not(.s34-x)) { opacity: 1 !important; visibility: visible; }
            html.s34-tx-hover span.thumb :is(.s34-fav-btn, .s34-fav-btn:not(.s34-faved)) { opacity: .85 !important; visibility: visible; }
        }
        .s34-fav-btn.s34-faved svg, .s34-pv-fav.s34-faved svg { fill: currentColor; }
        .s34-fav-btn svg, .s34-pv-fav svg { display: block; pointer-events: none; }

        /* Score & resolution while hovering (the labels step aside meanwhile) */
        .s34-info {
            position: absolute;
            top: 6px;
            left: 6px;
            z-index: 4;
            padding: 3px 8px;
            border-radius: 6px;
            background-color: rgba(20,20,24,0.85) !important;
            color: #fff !important;
            font: 600 11px/1.3 system-ui, -apple-system, Segoe UI, sans-serif;
            white-space: nowrap;
            pointer-events: none;
            opacity: 0;
            transition: opacity .15s;
        }
        span.thumb:hover .s34-info { opacity: 1; }
        /* narrow thumbnails: the pill stops before the ♥ / corner mark (cut off with …) */
        .s34-info { max-width: calc(100% - 12px); overflow: hidden; text-overflow: ellipsis; box-sizing: border-box; }
        span.thumb:has(.s34-fav-btn) .s34-info, span.thumb:has(.s34-dl-mark) .s34-info { max-width: calc(100% - 46px); }
        span.thumb:has(.s34-fav-btn):has(.s34-dl-mark) .s34-info { max-width: calc(100% - 74px); }
        /* The pill takes the labels' place while hovering, so nothing
           overlaps (a hovered video plays anyway). In "Below" the labels sit
           in the strip, out of the pill's way, and stay. */
        html:not(.s34-tx-below) body span.thumb:hover:has(.s34-info) .s34-badge,
        html body span.thumb:hover:has(.s34-info) .s34-new-badge { opacity: 0 !important; }
        .s34-info.s34-info-loading::after { content: '  ·  …'; opacity: .6; }

        /* NEW since the last visit of a saved search */
        .s34-new-badge {
            position: absolute;
            top: 6px;
            left: 6px;
            z-index: 3;
            padding: 2px 6px;
            border-radius: 4px;
            background-color: #e0457b !important;
            color: #fff !important;
            font: bold 10px/1.4 sans-serif;
            letter-spacing: .5px;
            pointer-events: none;
        }
        span.thumb:has(.s34-new-badge) .s34-badge { left: 46px; }

        /* Hide viewed / downloaded (not the ones you opened just now) */
        html.s34-hide-coll .image-list span.thumb.s34-in-coll:not(.s34-touched-now):not(.s34-coll-new),
        html.s34-hide-viewed .image-list span.thumb.s34-was-viewed:not(.s34-touched-now),
        html.s34-hide-downloaded .image-list span.thumb.s34-was-downloaded:not(.s34-touched-now) {
            display: none !important;
        }

        /* Sidebar quick controls */
        .s34-quick {
            display: flex;
            flex-direction: column;
            gap: 7px;
            margin: 12px 0;
            padding: 10px;
            border-radius: 10px;
            box-sizing: border-box;
            width: 100%;
            font: 12px/1.3 system-ui, -apple-system, Segoe UI, sans-serif;
            background-color: #18181c !important;
            border: 1px solid #2e2e36 !important;
        }
        .s34-q-switch {
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            user-select: none;
        }
        .s34-q-switch input { display: none; }
        /* The site's own AI switch: replaced by the matching one in the panel */
        .s34-ai-original, .s34-site-hidden { display: none !important; }
        .s34-q-track {
            position: relative;
            flex: none;
            width: 30px;
            height: 16px;
            border-radius: 999px;
            background-color: #3a3a44 !important;
            transition: background-color .15s;
        }
        .s34-q-track::after {
            content: '';
            position: absolute;
            top: 2px;
            left: 2px;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: #fff;
            transition: transform .15s;
        }
        .s34-q-switch input:checked + .s34-q-track { background-color: #2c5fcc !important; }
        .s34-q-switch input:checked + .s34-q-track::after { transform: translateX(14px); }
        .s34-q-theme {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            padding: 3px;
            border-radius: 8px;
            background-color: rgba(0,0,0,0.3) !important;
            border: 1px solid #2e2e36 !important;
        }
        .s34-quick .s34-q-theme button {
            height: 24px;
            padding: 0 !important;
            border-radius: 6px;
            border: none !important;
            background: transparent !important;
            color: #9a9aa3 !important;
            font: 600 11.5px system-ui, -apple-system, Segoe UI, sans-serif;
            cursor: pointer;
        }
        .s34-quick .s34-q-theme button:hover { color: #e8e8ee !important; }
        .s34-quick .s34-q-theme button.s34-on { background-color: #2c5fcc !important; color: #fff !important; }
        .s34-q-size { display: flex; align-items: center; gap: 8px; }
        .s34-q-size span { opacity: .7; }
        .s34-quick .s34-q-size input[type="range"] {
            flex: 1;
            min-width: 0;
            padding: 0 !important;
            border: none !important;
            background: transparent !important;
            accent-color: #2c5fcc;
            cursor: pointer;
        }
        .s34-quick .s34-q-select {
            display: block;
            width: 100%;
            height: 30px;
            box-sizing: border-box;
            margin: 2px 0 0 !important;
            padding: 0 10px !important;
            border-radius: 7px;
            cursor: pointer;
            font: 600 12.5px/28px system-ui, -apple-system, Segoe UI, sans-serif;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            background-color: #222228 !important;
            border: 1px solid #3a3a44 !important;
        }
        .s34-quick .s34-q-select:hover,
        .s34-quick .s34-q-select.s34-on { border-color: #3a6fd4 !important; }

        /* Select mode */
        html.s34-selecting .image-list span.thumb { cursor: pointer; }
        html.s34-selecting .image-list span.thumb::after {
            content: '';
            position: absolute;
            top: 8px;
            left: 8px;
            z-index: 6;
            width: 18px;
            height: 18px;
            border-radius: 5px;
            border: 2px solid #fff;
            background-color: rgba(0,0,0,0.45);
            box-shadow: 0 1px 4px rgba(0,0,0,0.6);
            pointer-events: none;
        }
        html.s34-selecting .image-list span.thumb.s34-selected { outline: 3px solid #2c5fcc; outline-offset: -3px; }
        html.s34-selecting .image-list span.thumb.s34-selected::after {
            content: '✓';
            color: #fff;
            font: 700 13px/18px system-ui, sans-serif;
            text-align: center;
            background-color: #2c5fcc;
            border-color: #2c5fcc;
        }
        .s34-batch {
            position: fixed;
            left: 50%;
            bottom: 22px;
            transform: translateX(-50%);
            z-index: 99995;
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 10px 8px 16px;
            border-radius: 12px;
            background-color: #1c1c22 !important;
            border: 1px solid #3a3a44 !important;
            color: #e8e8ec !important;
            box-shadow: 0 10px 30px rgba(0,0,0,0.6);
            font: 13px/1.3 system-ui, -apple-system, Segoe UI, sans-serif;
        }
        .s34-batch-status { margin-right: 6px; white-space: nowrap; }
        .s34-batch button {
            height: 30px;
            padding: 0 12px !important;
            border-radius: 8px;
            cursor: pointer;
            font-size: 12.5px;
            background-color: #26262d !important;
            border: 1px solid #3a3a44 !important;
            color: #e8e8ec !important;
        }
        .s34-batch button:hover { border-color: #3a6fd4 !important; }
        .s34-batch button.s34-batch-go { background-color: #2c5fcc !important; border-color: #2c5fcc !important; font-weight: 600; }
        .s34-batch button:disabled { opacity: .45; cursor: default; }

        /* Video options (popup and single post) */
        .s34-vopts { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
        .s34-vopts[hidden], .s34-pv-vopts[hidden] { display: none !important; }
        .s34-vopts button, .s34-vopts select {
            height: 28px;
            border-radius: 7px;
            cursor: pointer;
            font-size: 12px;
            background-color: #222228 !important;
            border: 1px solid #3a3a44 !important;
            color: #e8e8ec !important;
        }
        .s34-vopts button { flex: 1; padding: 0 8px !important; white-space: nowrap; }
        .s34-vopts button.s34-on { border-color: #3a6fd4 !important; }
        .s34-vopt-speed { display: flex; align-items: center; gap: 5px; font-size: 12px; white-space: nowrap; }
        .s34-vopt-speed select { padding: 0 4px !important; }

        /* Popup: favourite button */
        .s34-pv-fav {
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
            color: #e8e8ec !important;
            fill: none;
        }
        .s34-pv-fav:hover { border-color: #ff5c8a !important; }
        .s34-pv-fav.s34-faved { color: #ff6b7a !important; border-color: rgba(255,107,122,0.6) !important; }

    `;

