    // My Account (tiles) and Options (groups) - see 26d-account.js.
    // Written dark-first like everything else; White and OLED are converted.
    const ACCOUNT_CSS = `
        /* The site's own list / table stay in the page, hidden */
        #user-index.s34-acc-on > :not(.s34-acc) { display: none !important; }
        #user-edit.s34-opt-on > p, #user-edit.s34-opt-on form > table { display: none !important; }

        .s34-acc, .s34-opt {
            --acc-line: #2a2a31;
            --acc-card: #121216;
            --acc-card-2: #18181d;
            --acc-fg: #ececf1;
            --acc-muted: #9a9aa6;
            box-sizing: border-box;
            max-width: 1080px;
            margin: 8px auto 40px;
            padding: 0 4px;
            color: var(--acc-fg) !important;
            font: 13.5px/1.45 system-ui, -apple-system, Segoe UI, sans-serif;
            text-align: left;
        }
        .s34-acc *, .s34-opt * { box-sizing: border-box; }

        /* ---- My Account ---- */
        .s34-acc-head { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; margin-bottom: 22px; }
        .s34-acc-avatar {
            width: 52px; height: 52px; border-radius: 50%; flex: none;
            display: grid; place-items: center;
            background: linear-gradient(135deg, #ff5f8f, #8b3dff) !important; color: #fff !important;
        }
        .s34-acc-avatar svg { width: 26px; height: 26px; }
        .s34-acc-name { flex: 1; min-width: 150px; display: flex; flex-direction: column; }
        .s34-acc-name b { font-size: 20px; font-weight: 800; color: var(--acc-fg) !important; }
        .s34-acc-name small { color: var(--acc-muted) !important; font-size: 12.5px; }
        .s34-acc-headbtns { display: flex; gap: 8px; flex-wrap: wrap; }
        .s34-acc .s34-acc-btn, .s34-opt .s34-opt-btn {
            display: inline-flex; align-items: center; gap: 7px;
            height: 34px; padding: 0 14px !important; border-radius: 9px;
            border: 1px solid #3a3a44 !important; background: #222228 !important; color: #e8e8ee !important;
            font: 600 13px system-ui, -apple-system, Segoe UI, sans-serif; text-decoration: none !important;
            cursor: pointer; white-space: nowrap;
        }
        .s34-acc .s34-acc-btn:hover, .s34-opt .s34-opt-btn:hover { border-color: #ff5f8f !important; background: #26262d !important; color: #fff !important; }
        .s34-acc-btn svg { width: 16px; height: 16px; }

        .s34-acc-label { display: flex; align-items: center; gap: 8px; margin: 18px 0 8px; }
        .s34-acc-label span { font: 800 11px system-ui, -apple-system, Segoe UI, sans-serif; letter-spacing: .8px; text-transform: uppercase; color: var(--acc-muted) !important; }
        .s34-acc-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 10px; }
        .s34-acc .s34-acc-tile {
            display: flex; align-items: flex-start; gap: 12px;
            padding: 13px 14px !important; margin: 0; border-radius: 12px;
            border: 1px solid var(--acc-line) !important; background: var(--acc-card) !important;
            color: var(--acc-fg) !important; text-decoration: none !important; text-align: left;
            font: inherit; cursor: pointer; min-width: 0; width: 100%;
            transition: border-color .15s ease, background-color .15s ease, transform .15s ease;
        }
        .s34-acc .s34-acc-tile:hover { border-color: #4a4a55 !important; background: var(--acc-card-2) !important; transform: translateY(-1px); }
        .s34-acc .s34-acc-tile:focus-visible { outline: 2px solid #ff5f8f; outline-offset: 2px; }
        .s34-acc-ico {
            width: 36px; height: 36px; border-radius: 10px; flex: none; display: grid; place-items: center;
            border: 1px solid var(--acc-line) !important; background: #1c1c22 !important; color: #c9c9d3 !important;
        }
        .s34-acc-txt { display: flex; flex-direction: column; min-width: 0; }
        .s34-acc-txt b { color: #f2f2f5 !important; font-size: 14px; font-weight: 700; }
        .s34-acc-txt small { color: var(--acc-muted) !important; font-size: 12.5px; line-height: 1.4; }
        .s34-acc-quiet .s34-acc-tile { background: transparent !important; }
        .s34-acc-quiet .s34-acc-ico { background: transparent !important; }

        /* ---- Options ---- */
        .s34-opt { display: grid; grid-template-columns: 190px minmax(0, 1fr); gap: 18px; align-items: start; }
        .s34-opt-nav { position: sticky; top: 12px; display: flex; flex-direction: column; gap: 2px; }
        .s34-opt-nav button {
            all: unset; border: none !important; box-sizing: border-box; display: block; padding: 8px 12px; border-radius: 9px; cursor: pointer;
            color: #b9b9c3 !important; font: 600 13.5px system-ui, -apple-system, Segoe UI, sans-serif;
            background: transparent !important;
        }
        .s34-opt-nav button:hover { color: #fff !important; background: #17171c !important; }
        .s34-opt-nav button.s34-on { color: #fff !important; background: #1d1d23 !important; box-shadow: inset 3px 0 0 #ff5f8f; }
        .s34-opt-nav button:focus-visible { outline: 2px solid #ff5f8f; }
        .s34-opt-main { display: flex; flex-direction: column; gap: 14px; min-width: 0; }
        .s34-opt-card {
            padding: 6px 18px 8px; border-radius: 14px; scroll-margin-top: 12px;
            border: 1px solid var(--acc-line) !important; background: var(--acc-card) !important;
        }
        .s34-opt .s34-opt-h {
            margin: 10px 0 2px !important; padding: 0 !important; border: none !important;
            font: 800 11px system-ui, -apple-system, Segoe UI, sans-serif !important; letter-spacing: .8px; text-transform: uppercase;
            color: var(--acc-muted) !important; background: none !important;
        }
        .s34-opt-row {
            display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 8px 20px; align-items: center;
            padding: 13px 0; border-top: 1px solid #1f1f25;
        }
        .s34-opt-h + .s34-opt-row { border-top: none; }
        .s34-opt-row.s34-opt-wide { grid-template-columns: minmax(0, 1fr); }
        .s34-opt-txt { display: flex; flex-direction: column; min-width: 0; }
        .s34-opt-txt b { color: #f2f2f5 !important; font-size: 14px; font-weight: 700; }
        .s34-opt-txt small { color: var(--acc-muted) !important; font-size: 12.5px; line-height: 1.45; }
        .s34-opt-ctl { min-width: 0; }
        .s34-opt-wide .s34-opt-ctl { display: flex; flex-direction: column; gap: 10px; }
        .s34-opt-auto .s34-opt-seg { opacity: .55; }
        .s34-opt-locked .s34-opt-txt { padding-left: 30px; position: relative; }
        .s34-opt-lock { position: absolute; left: 0; top: 1px; color: #9a9aa6 !important; }

        /* inputs the site's fields became */
        .s34-opt input.s34-opt-num, .s34-opt input[type="text"], .s34-opt textarea, .s34-opt select {
            box-sizing: border-box; border-radius: 8px !important;
            border: 1px solid #3a3a44 !important; background: #0d0d10 !important; color: #e8e8ee !important;
            font: 13.5px system-ui, -apple-system, Segoe UI, sans-serif; padding: 6px 10px !important;
        }
        .s34-opt input.s34-opt-num { width: 84px; height: 34px; text-align: center; }
        .s34-opt textarea { width: 100% !important; min-height: 64px; resize: vertical; }
        .s34-opt input:focus, .s34-opt textarea:focus, .s34-opt select:focus { outline: none; border-color: #ff5f8f !important; }
        .s34-opt .awesomplete { display: block; width: 100%; }

        /* a row of choices (it clicks the site's own radio buttons) */
        .s34-opt-seg { display: inline-flex; flex-wrap: wrap; padding: 3px; gap: 2px; border-radius: 10px; border: 1px solid #33333c !important; background: #0d0d10 !important; }
        .s34-opt-seg button {
            all: unset; box-sizing: border-box; padding: 6px 12px; border-radius: 7px; cursor: pointer; white-space: nowrap;
            color: #a9a9b3 !important; font: 600 12.5px system-ui, -apple-system, Segoe UI, sans-serif; background: transparent !important;
            border: none !important;
        }
        .s34-opt-wide .s34-opt-ctl > .s34-opt-seg { align-self: flex-start; }
        .s34-opt-seg button:hover:not(:disabled) { color: #fff !important; }
        .s34-opt-seg button.s34-on { color: #fff !important; background: linear-gradient(135deg, #ff5f8f, #8b3dff) !important; }
        .s34-opt-seg button:disabled { cursor: default; }
        .s34-opt-seg button:focus-visible { outline: 2px solid #ff5f8f; }

        /* the blacklist: Steamy34's Blacklist panel, inline (styles in 06b) */
        .s34-opt-bl { display: flex; flex-direction: column; gap: 10px; padding-top: 8px; }
        .s34-opt-picked[hidden] { display: none; }
        .s34-opt-picked {
            margin: 0 !important; padding: 9px 12px; border-radius: 10px; font-size: 13px;
            border: 1px solid rgba(95,208,138,0.35) !important; background: rgba(95,208,138,0.08) !important; color: #9fe3b8 !important;
        }
        .s34-opt .s34-opt-btn:disabled { opacity: .6; cursor: default; }

        .s34-opt-fold { padding: 4px 0 8px; }
        .s34-opt-fold[hidden] { display: none; }
        .s34-opt-fold ul { margin: 6px 0 0 18px; color: var(--acc-muted) !important; }
        .s34-opt-api textarea { width: 100% !important; }

        /* Save: the site's own button, kept in reach at the bottom */
        .s34-opt-save {
            position: sticky; bottom: 0; z-index: 5;
            display: flex; align-items: center; justify-content: flex-end; gap: 10px;
            padding: 12px 64px 12px 14px; /* (room for the Steamy34 button in the corner) */
            /* (Beta 3.17) solid, in the page colour, with a thin line - the fade into black laid a heavy band over the settings */
            background: var(--s34-bg) !important;
            border-top: 1px solid rgba(255,255,255,0.08) !important;
            box-shadow: 0 -6px 14px -10px rgba(0,0,0,0.6);
        }
        .s34-opt-dirty { margin-right: auto; color: #ffb347 !important; font-weight: 700; font-size: 12.5px; }
        .s34-opt input.s34-opt-submit {
            height: 36px; padding: 0 26px !important; border-radius: 9px !important; border: none !important; cursor: pointer;
            background: linear-gradient(135deg, #ff5f8f, #8b3dff) !important; color: #fff !important; font: 700 14px system-ui, -apple-system, Segoe UI, sans-serif;
        }
        .s34-opt input.s34-opt-submit:hover { filter: brightness(1.1); }

        @media (max-width: 760px) {
            .s34-acc, .s34-opt { padding: 0; margin-top: 4px; }
            .s34-acc-grid { grid-template-columns: minmax(0, 1fr); gap: 8px; }
            .s34-acc-headbtns { width: 100%; }
            .s34-acc-headbtns > * { flex: 1; justify-content: center; }
            .s34-opt { grid-template-columns: minmax(0, 1fr); gap: 10px; }
            .s34-opt-nav { flex-direction: row; overflow-x: auto; top: 0; z-index: 6; padding: 6px 0; scrollbar-width: none; background: #000 !important; }
            .s34-opt-nav::-webkit-scrollbar { display: none; }
            .s34-opt-nav button { white-space: nowrap; }
            .s34-opt-nav button.s34-on { box-shadow: inset 0 -2px 0 #ff5f8f; }
            .s34-opt-card { padding: 4px 14px 6px; }
            .s34-opt-row { grid-template-columns: minmax(0, 1fr); }
        }
        @media (prefers-reduced-motion: reduce) {
            .s34-acc .s34-acc-tile { transition: none; }
        }
    `;
