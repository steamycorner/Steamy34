    const SEARCH_CSS = `
        .s34-sb { width: 100%; box-sizing: border-box; font: 12px/1.4 system-ui, -apple-system, Segoe UI, sans-serif; }
        .s34-sb-box {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 4px;
            min-height: 32px;
            padding: 4px 26px 4px 4px;
            position: relative;
            box-sizing: border-box;
            border-radius: 8px;
            cursor: text;
            background-color: #18181c !important;
            border: 1px solid #3a3a44 !important;
        }
        .s34-sb-box:focus-within { border-color: #3a6fd4 !important; }
        .s34-sb-pills { display: contents; }
        .s34-sb-box .s34-ac-wrap { flex: 1 1 70px; width: auto; min-width: 70px; }
        .s34-sb .s34-sb-input {
            width: 100%;
            min-width: 0;
            box-sizing: border-box;
            border: none !important;
            outline: none !important;
            background: transparent !important;
            padding: 3px 4px !important;
            font: inherit;
            font-size: 13px;
            color: #e8e8ec !important;
        }
        .s34-sb .s34-ac-list { min-width: 200px; }
        .s34-sb .s34-sb-clear {
            position: absolute;
            top: 6px;
            right: 4px;
            border: none !important;
            background: transparent !important;
            padding: 0 4px !important;
            cursor: pointer;
            font-size: 12px;
            opacity: .5;
            color: inherit !important;
        }
        .s34-sb .s34-sb-clear:hover { opacity: 1; color: #ff6b6b !important; }

        /* Tag chips inside the box */
        .s34-pill {
            display: inline-flex;
            align-items: center;
            max-width: 100%;
            box-sizing: border-box;
            border-radius: 999px;
            padding: 1px 2px 1px 8px;
            font-weight: 600;
            background-color: rgba(255,255,255,0.06) !important;
            border: 1px solid rgba(138,180,248,0.45) !important;
            color: #8ab4f8 !important;
        }
        .s34-pill-artist    { color: #ff8a80 !important; border-color: rgba(255,138,128,0.5) !important; }
        .s34-pill-character { color: #7ee07e !important; border-color: rgba(126,224,126,0.5) !important; }
        .s34-pill-copyright { color: #d68cff !important; border-color: rgba(214,140,255,0.5) !important; }
        .s34-pill-metadata  { color: #ffb86b !important; border-color: rgba(255,184,107,0.5) !important; }
        .s34-pill.s34-pill-ex {
            border-style: dashed !important;
            border-color: rgba(255,80,80,0.75) !important;
            background-color: rgba(255,60,60,0.10) !important;
        }
        .s34-pill.s34-pill-ex .s34-pill-text { text-decoration: line-through; }
        .s34-pill-text { cursor: pointer; overflow-wrap: anywhere; }
        .s34-sb .s34-pill-x {
            border: none !important;
            background: transparent !important;
            padding: 0 5px 0 4px !important;
            margin: 0;
            cursor: pointer;
            font-size: 13px;
            line-height: 1;
            opacity: .55;
            color: inherit !important;
        }
        .s34-sb .s34-pill-x:hover { opacity: 1; color: #ff6b6b !important; }

        /* Everything stacked with even spacing, never wider than the sidebar */
        .s34-sb { display: flex; flex-direction: column; gap: 8px; max-width: 100%; }
        .s34-sb > * { min-width: 0; }

        /* Filters: tidy 2 x 2 grid */
        .s34-sb-filters {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 6px;
        }
        .s34-sb-filter { display: flex; flex-direction: column; gap: 2px; min-width: 0; margin: 0 !important; }
        .s34-sb-filter-top { display: flex; align-items: center; justify-content: space-between; min-height: 16px; }
        .s34-sb-filter-top > span {
            font-size: 9.5px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: .8px;
            opacity: .5;
            padding-left: 2px;
        }
        /* Pin: keep this filter for every new search */
        .s34-sb .s34-pin {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 18px;
            height: 16px;
            padding: 0 !important;
            border: none !important;
            border-radius: 4px;
            background: transparent !important;
            color: #9a9aa3 !important;
            cursor: pointer;
            opacity: .45;
            transition: opacity .12s;
        }
        .s34-sb .s34-pin svg { display: block; transform: rotate(35deg); }
        .s34-sb-filter:hover .s34-pin { opacity: .8; }
        .s34-sb .s34-pin:hover { opacity: 1; color: #8ab4f8 !important; }
        .s34-sb .s34-pin.s34-on { opacity: 1; color: #ffb347 !important; }
        .s34-sb .s34-pin.s34-on svg { fill: currentColor; transform: none; }
        .s34-sb-filter.s34-pinned .s34-sb-filter-top > span { opacity: .9; color: #ffb347 !important; }
        /* "pinned" / "paused" sits right next to the pin it belongs to */
        .s34-sb .s34-pin.s34-on { width: auto; gap: 3px; padding: 0 1px 0 3px !important; }
        .s34-sb .s34-pin.s34-on::before { content: 'pinned'; font: 500 10px/1 system-ui, -apple-system, Segoe UI, sans-serif; color: inherit; white-space: nowrap; }
        .s34-sb .s34-sb-filter.s34-pinned select,
        .s34-sb .s34-sb-filter.s34-pinned select.s34-sb-set { border-color: #c98a2e !important; color: #ffcf8a !important; }
        /* Following pages: pins are paused - quiet, with a short note why */
        .s34-sb.s34-pins-paused .s34-sb-filter.s34-pinned .s34-sb-filter-top > span { color: #9a9aa6 !important; opacity: .9; }
        .s34-sb.s34-pins-paused .s34-pin.s34-on::before { content: 'paused'; }
        .s34-sb.s34-pins-paused .s34-sb-filter.s34-pinned select { border-color: #3a3a44 !important; color: inherit !important; }
        .s34-sb.s34-pins-paused .s34-pin.s34-on { opacity: .7; color: #9a9aa6 !important; }
        .s34-pins-note {
            display: flex;
            gap: 7px;
            align-items: flex-start;
            margin: 2px 0 8px;
            padding: 7px 9px;
            border-radius: 7px;
            border: 1px solid rgba(255,179,71,0.3) !important;
            background-color: rgba(255,179,71,0.08) !important;
            color: #ffd9ad !important;
            font-size: 11.5px;
            line-height: 1.4;
        }
        .s34-pins-note svg { flex: none; margin-top: 2px; color: #ffb347 !important; }
        .s34-pins-note svg * { color: inherit !important; }
        .s34-pins-note span { color: inherit !important; }
        .s34-pins-note > svg { width: 12px; height: 12px; }
        .s34-pins-note a.s34-pins-out { color: inherit !important; text-decoration: underline !important; font-weight: 600; white-space: nowrap; }
        .s34-pins-note a.s34-pins-out:hover { color: #ffb347 !important; }
        .s34-sb .s34-sb-filter select {
            width: 100%;
            min-width: 0;
            height: 26px;
            box-sizing: border-box;
            padding: 0 4px !important;
            margin: 0 !important;
            border-radius: 6px;
            font-size: 12px;
            cursor: pointer;
            background-color: #18181c !important;
            border: 1px solid #3a3a44 !important;
        }
        .s34-sb .s34-sb-filter select.s34-sb-set {
            border-color: #3a6fd4 !important;
            color: #8ab4f8 !important;
        }

        /* Favourite tags */
        .s34-ft {
            display: flex;
            flex-direction: column;
            gap: 6px;
            padding: 8px;
            border-radius: 8px;
            background-color: #18181c !important;
            border: 1px solid #2e2e36 !important;
        }
        .s34-ft-head { display: flex; align-items: center; justify-content: space-between; }
        .s34-ft-head > span {
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: .8px;
            opacity: .6;
        }
        .s34-sb .s34-ft-edit {
            padding: 0 6px !important;
            border: none !important;
            background: transparent !important;
            color: #8ab4f8 !important;
            font-size: 11px;
            cursor: pointer;
        }
        .s34-sb .s34-ft-edit[hidden] { display: none; }
        .s34-ft-chips { display: flex; flex-wrap: wrap; gap: 4px; }
        .s34-ft-hint { font-size: 11px; font-style: italic; opacity: .55; }
        .s34-ft-chip {
            display: inline-flex;
            align-items: center;
            max-width: 100%;
            border-radius: 999px;
            font-weight: 600;
            font-size: 11.5px;
            line-height: 20px;
            background-color: rgba(255,255,255,0.04) !important;
            border: 1px solid rgba(138,180,248,0.4) !important;
            color: #8ab4f8 !important;
        }
        .s34-ft-name { padding: 0 8px; cursor: pointer; overflow-wrap: anywhere; }
        .s34-ft-chip:hover { background-color: rgba(255,255,255,0.09) !important; }
        /* Already in the search: filled */
        .s34-ft-chip.s34-ft-in {
            background-color: rgba(44,95,204,0.35) !important;
            border-color: #3a6fd4 !important;
        }
        .s34-ft-chip.s34-ft-in .s34-ft-name::before { content: '✓ '; }
        /* Excluded: red, crossed out */
        .s34-ft-chip.s34-ft-out { border: 1px dashed rgba(255,80,80,0.75) !important; background-color: rgba(255,60,60,0.10) !important; }
        .s34-ft-chip.s34-ft-out .s34-ft-name { text-decoration: line-through; }
        .s34-sb .s34-ft-x {
            border: none !important;
            background: transparent !important;
            padding: 0 6px 0 0 !important;
            cursor: pointer;
            font-size: 13px;
            line-height: 1;
            opacity: .6;
            color: inherit !important;
        }
        .s34-sb .s34-ft-x:hover { opacity: 1; color: #ff6b6b !important; }
        .s34-ft-add { display: none; }
        .s34-ft.s34-ft-editing .s34-ft-add { display: block; }
        .s34-sb .s34-ft-input {
            width: 100%;
            height: 26px;
            box-sizing: border-box;
            padding: 0 7px !important;
            border-radius: 6px;
            font-size: 12px;
            background-color: #111114 !important;
            border: 1px solid #3a3a44 !important;
        }

        /* Search button (the site's own, moved under the filters) */
        .s34-sb .s34-sb-submit {
            display: block !important;            /* the site's phone layout hides its own */
            visibility: visible !important;
            position: static !important;
            opacity: 1 !important;
            width: 100% !important;
            height: 30px;
            box-sizing: border-box;
            margin: 0 !important;
            border-radius: 8px;
            border: 1px solid #2f5fbf !important;
            background-color: #2c5fcc !important;
            color: #fff !important;
            font: 600 13px system-ui, -apple-system, Segoe UI, sans-serif;
            cursor: pointer;
        }
        .s34-sb .s34-sb-submit:hover { background-color: #3a6fd4 !important; }

        /* 🕘 Recent · ★ Tags · 🔔 (follow this search) - one list opens below */
        .s34-sb-tools {
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) 30px;
            gap: 6px;
        }
        .s34-sb .s34-sb-tools .s34-sb-btn { display: inline-flex; align-items: center; justify-content: center; gap: 5px; padding: 0 6px !important; }
        .s34-sb .s34-sb-tools .s34-sb-btn > span { min-width: 0; overflow: hidden; text-overflow: ellipsis; }
        .s34-sb .s34-sb-tools .s34-sb-btn svg { flex: none; opacity: .75; }
        .s34-sb .s34-sb-tools .s34-sb-btn svg * { color: inherit !important; }
        .s34-sb .s34-sb-tools .s34-sb-btn.s34-sb-open svg { opacity: 1; color: #8ab4f8 !important; }
        .s34-sb .s34-ft[hidden], .s34-sb .s34-sb-menu[hidden] { display: none !important; }
        /* Narrow sidebar (the real site's is ~165px): words only, no icons */
        .s34-sb-tools { container-type: inline-size; }
        @container (max-width: 215px) {
            .s34-sb .s34-sb-tools .s34-sb-btn:not(.s34-sb-follow) svg { display: none; }
            .s34-sb .s34-sb-tools .s34-sb-btn { padding: 0 4px !important; }
        }
        .s34-sr { position: absolute !important; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
        .s34-sb .s34-sb-btn {
            min-width: 0;
            height: 26px;
            box-sizing: border-box;
            padding: 0 8px !important;
            margin: 0 !important;
            border-radius: 6px;
            cursor: pointer;
            font-size: 12px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: left;
            background-color: #18181c !important;
            border: 1px solid #3a3a44 !important;
        }
        .s34-sb .s34-sb-follow svg { width: 14px; height: 14px; flex: none; opacity: 1 !important; color: #b9b9c3 !important; }
        .s34-sb .s34-sb-follow.s34-following { border-color: rgba(255,179,71,0.55) !important; }
        .s34-sb .s34-sb-follow.s34-following svg { color: #ffb347 !important; }
        /* The site's "search options" gear (phone layout): hidden - it
           covered the Steamy34 search box and only unfolded a heading */
        #displayOptsLink { display: none !important; }
        .s34-sb .s34-sb-btn:hover { border-color: #3a6fd4 !important; }
        .s34-sb-caret { display: inline-block; width: 11px; opacity: .7; }
        .s34-sb .s34-sb-btn.s34-sb-open { border-color: #3a6fd4 !important; }
        .s34-sb-menu {
            margin-top: -2px;
            padding: 6px;
            max-height: 50vh;
            overflow-y: auto;
            border-radius: 8px;
            background-color: #1c1c20 !important;
            border: 1px solid #33333a !important;
        }
        .s34-sb-menu[hidden] { display: none !important; }
        .s34-sb-menu h5 {
            margin: 4px 2px 3px !important;
            font-size: 10px !important;
            text-transform: uppercase;
            letter-spacing: 1px;
            opacity: .6;
        }
        .s34-sb-item { display: flex; align-items: center; border-radius: 5px; }
        .s34-sb-item:hover { background-color: #2e2e36 !important; }
        .s34-sb-item-main { flex: 1; min-width: 0; padding: 3px 5px; cursor: pointer; }
        .s34-sb-item-label, .s34-sb-item-sub { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .s34-sb-item-sub { font-size: 10.5px; opacity: .55; }
        .s34-sb .s34-sb-item-del {
            border: none !important;
            background: transparent !important;
            cursor: pointer;
            opacity: .4;
            padding: 0 5px !important;
            color: inherit !important;
        }
        .s34-sb .s34-sb-item-del:hover { opacity: 1; color: #ff6b6b !important; }
        .s34-sb-empty { padding: 2px 5px 4px; opacity: .5; font-style: italic; }
        .s34-sb .s34-sb-clear-recent { display: block; width: 100%; margin-top: 5px; }
        .s34-sb .s34-sb-hide {
            display: block;
            width: 100%;
            margin-top: 6px;
            padding: 2px 0 !important;
            border: none !important;
            background: transparent !important;
            cursor: pointer;
            font-size: 11px;
            opacity: .6;
            color: inherit !important;
        }
        .s34-sb .s34-sb-hide:hover { opacity: 1; }
    `;

