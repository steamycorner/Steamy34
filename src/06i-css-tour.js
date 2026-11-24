    const TOUR_CSS = `
        /* Welcome tour (first start, or Settings → Help → Welcome tour) */
        .s34-wel-overlay .s34-win-body { gap: 14px; }
        .s34-wel-stage { position: relative; display: flex; flex-direction: column; gap: 14px; animation: s34-wel-in .35s ease-out; }
        .s34-wel-stage.s34-wel-back { animation-name: s34-wel-in-back; }
        @keyframes s34-wel-in { from { opacity: 0; transform: translateX(26px); } to { opacity: 1; transform: none; } }
        @keyframes s34-wel-in-back { from { opacity: 0; transform: translateX(-26px); } to { opacity: 1; transform: none; } }
        .s34-wel-hero {
            position: relative;
            display: flex;
            align-items: center;
            gap: 18px;
            padding: 22px 24px;
            border-radius: 18px;
            overflow: hidden;
            background: linear-gradient(135deg, #ff5f8f 0%, #b04bff 55%, #6a3dff 100%) !important;
            color: #fff !important;
            box-shadow: 0 14px 34px rgba(139,61,255,0.35);
        }
        .s34-wel-hero::after {
            content: '';
            position: absolute;
            right: -50px; top: -70px;
            width: 240px; height: 240px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255,255,255,0.3), transparent 65%) !important;
            pointer-events: none;
        }
        .s34-wel-art {
            flex: none;
            width: 64px; height: 64px;
            border-radius: 18px;
            display: flex; align-items: center; justify-content: center;
            background-color: rgba(255,255,255,0.18) !important;
            box-shadow: inset 0 0 0 1px rgba(255,255,255,0.25);
        }
        .s34-wel-art svg { width: 34px; height: 34px; color: #fff !important; }
        .s34-wel-art img { width: 64px; height: 64px; border-radius: 18px; display: block; }
        .s34-wel-hero-text { position: relative; z-index: 1; min-width: 0; }
        .s34-wel-step {
            display: inline-block;
            margin-bottom: 5px;
            padding: 1px 8px;
            border-radius: 999px;
            font: 800 10px/18px system-ui, -apple-system, Segoe UI, sans-serif;
            letter-spacing: .8px;
            text-transform: uppercase;
            background-color: rgba(255,255,255,0.22) !important;
            color: #fff !important;
        }
        .s34-wel-hero h3 { margin: 0 0 4px !important; font-size: 22px !important; font-weight: 800; line-height: 1.2; color: #fff !important; }
        .s34-wel-hero p { margin: 0 !important; font-size: 13.5px; line-height: 1.5; color: rgba(255,255,255,0.92) !important; }
        .s34-wel-cards { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 9px; }
        .s34-wel-card {
            display: flex;
            gap: 11px;
            padding: 12px 13px;
            border-radius: 13px;
            background-color: rgba(255,255,255,0.04) !important;
            border: 1px solid rgba(255,255,255,0.07) !important;
        }
        .s34-wel-ico {
            flex: none;
            width: 30px; height: 30px;
            border-radius: 9px;
            display: flex; align-items: center; justify-content: center;
            font-size: 15px;
            background: linear-gradient(135deg, rgba(255,95,143,0.22), rgba(139,61,255,0.22)) !important;
            color: #ff8fb0 !important;
        }
        .s34-wel-ico svg { width: 16px; height: 16px; color: inherit !important; }
        .s34-wel-card b { display: block; font-size: 13px; margin-bottom: 2px; }
        .s34-wel-card span { display: block; font-size: 12px; line-height: 1.5; color: #b9b9c3 !important; }
        .s34-wel-card kbd {
            display: inline-block;
            min-width: 18px;
            padding: 0 5px;
            border-radius: 5px;
            font: 700 11px/18px system-ui, -apple-system, Segoe UI, sans-serif;
            text-align: center;
            background-color: #2a2a31 !important;
            border: 1px solid #3c3c46 !important;
            border-bottom-width: 2px !important;
            color: #f0f0f4 !important;
        }
        .s34-wel-promise { display: flex; flex-wrap: wrap; gap: 6px; }
        .s34-wel-promise span {
            padding: 4px 10px;
            border-radius: 999px;
            font-size: 12px;
            font-weight: 600;
            background-color: rgba(255,255,255,0.05) !important;
            border: 1px solid rgba(255,255,255,0.09) !important;
        }
        .s34-wel-themes { display: flex; gap: 8px; }
        .s34-win .s34-wel-themes button {
            flex: 1;
            display: flex; flex-direction: column; align-items: center; gap: 6px;
            padding: 10px 8px !important;
            border-radius: 12px;
            cursor: pointer;
            font: 700 12px system-ui, -apple-system, Segoe UI, sans-serif;
            background-color: rgba(255,255,255,0.04) !important;
            border: 1px solid rgba(255,255,255,0.1) !important;
            color: inherit !important;
        }
        .s34-win .s34-wel-themes button.s34-on { border-color: #ff5f8f !important; box-shadow: 0 0 0 1px #ff5f8f inset; }
        .s34-wel-themes i { display: block; width: 100%; height: 28px; border-radius: 7px; border: 1px solid rgba(128,128,128,0.35); }
        .s34-wel-themes svg { display: block; width: 64px; height: 44px; }
        .s34-wel-picklabel { margin: 2px 2px -4px; font-size: 11px; font-weight: 700; letter-spacing: .6px; text-transform: uppercase; opacity: .55; }
        .s34-wel-foot { display: flex; align-items: center; gap: 10px; }
        .s34-wel-dots { display: flex; gap: 6px; margin-right: auto; }
        .s34-win .s34-wel-dots button {
            width: 8px; height: 8px; padding: 0 !important;
            border-radius: 999px; border: none !important; cursor: pointer;
            background-color: rgba(255,255,255,0.2) !important;
            transition: width .25s, background-color .25s;
        }
        .s34-win .s34-wel-dots button.s34-on { width: 22px; background: linear-gradient(90deg, #ff5f8f, #8b3dff) !important; }
        .s34-win .s34-wel-btn {
            height: 34px; padding: 0 16px !important; border-radius: 10px; cursor: pointer;
            background-color: rgba(255,255,255,0.06) !important; border: 1px solid rgba(255,255,255,0.12) !important;
            color: #e8e8ee !important; font: 600 12.5px system-ui, -apple-system, Segoe UI, sans-serif;
        }
        .s34-win .s34-wel-btn:hover { border-color: #ff5f8f !important; }
        .s34-win .s34-wel-btn[hidden] { display: none; }
        .s34-win .s34-wel-next {
            height: 34px; padding: 0 22px !important; border-radius: 10px; border: none !important; cursor: pointer;
            background: linear-gradient(135deg, #ff5f8f, #8b3dff) !important; color: #fff !important;
            font: 700 13px system-ui, -apple-system, Segoe UI, sans-serif;
        }
        .s34-wel-skip { font-size: 12px; opacity: .55; cursor: pointer; background: none !important; border: none !important; color: inherit !important; padding: 0 4px !important; }
        .s34-wel-skip:hover { opacity: .9; }
        @media (max-width: 560px) {
            .s34-wel-cards { grid-template-columns: minmax(0, 1fr); }
            .s34-wel-hero { padding: 18px; gap: 14px; }
            .s34-wel-hero h3 { font-size: 19px !important; }
            .s34-wel-art { width: 52px; height: 52px; }
            .s34-wel-art img { width: 52px; height: 52px; }
            .s34-wel-foot { flex-wrap: wrap; }
            .s34-wel-dots { flex-basis: 100%; justify-content: center; margin: 0 0 4px; }
            .s34-wel-foot .s34-wel-next { margin-left: auto; }
        }

        /* (Beta 3.11) The big welcome guide: chapters on the left, Computer / Phone on top */
        .s34-wel-big .s34-win { width: min(1120px, calc(100vw - 32px)) !important; height: min(860px, calc(100vh - 40px)); max-height: none; }
        .s34-wel-big .s34-win-body { flex: 1; min-height: 0; overflow: hidden; padding: 0; gap: 0; }
        .s34-wel-shell { flex: 1; min-height: 0; display: grid; grid-template-columns: 220px minmax(0, 1fr); border-top: 1px solid rgba(255,255,255,0.07); }
        .s34-wel-nav { overflow-y: auto; padding: 14px 10px; display: flex; flex-direction: column; gap: 2px; border-right: 1px solid rgba(255,255,255,0.07); scrollbar-width: thin; }
        .s34-win .s34-wel-nav button { display: flex; align-items: center; gap: 10px; min-height: 40px; padding: 0 10px !important; border-radius: 10px; border: none !important;
            background: transparent !important; color: #b9b9c3 !important; font: 600 13.5px system-ui, -apple-system, Segoe UI, sans-serif; text-align: left; cursor: pointer; flex: none; }
        .s34-win .s34-wel-nav button:hover { background-color: rgba(255,255,255,0.05) !important; color: #fff !important; }
        .s34-win .s34-wel-nav button.s34-on { background: linear-gradient(90deg, rgba(255,95,143,0.2), rgba(139,61,255,0.12)) !important; color: #fff !important; }
        .s34-wel-navico { flex: none; width: 28px; height: 28px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 14px;
            background-color: rgba(255,255,255,0.05) !important; color: #ff8fb0 !important; }
        .s34-wel-nav button.s34-on .s34-wel-navico { background: linear-gradient(135deg, #ff5f8f, #8b3dff) !important; color: #fff !important; }
        .s34-wel-navico svg { width: 16px; height: 16px; color: inherit !important; }
        .s34-wel-main { display: flex; flex-direction: column; min-width: 0; min-height: 0; }
        .s34-wel-topbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 14px 26px 0; }
        .s34-wel-devices { display: inline-flex; padding: 3px; border-radius: 12px; background-color: rgba(255,255,255,0.05) !important; border: 1px solid rgba(255,255,255,0.08) !important; }
        .s34-win .s34-wel-devices button { display: inline-flex; align-items: center; gap: 7px; height: 34px; padding: 0 16px !important; border-radius: 9px; border: none !important; cursor: pointer;
            background: transparent !important; color: #b9b9c3 !important; font: 700 13px system-ui, -apple-system, Segoe UI, sans-serif; }
        .s34-win .s34-wel-devices button.s34-on { background: linear-gradient(135deg, #ff5f8f, #8b3dff) !important; color: #fff !important; }
        .s34-wel-count { font-size: 12px; font-weight: 700; opacity: .5; }
        .s34-wel-scroll { flex: 1; min-height: 0; overflow-y: auto; overflow-x: hidden; padding: 16px 26px 26px; scrollbar-width: thin; }
        .s34-wel-big .s34-wel-stage { gap: 18px; }
        .s34-wel-big .s34-wel-hero { padding: 28px 30px; gap: 22px; }
        .s34-wel-big .s34-wel-art { width: 78px; height: 78px; border-radius: 22px; }
        .s34-wel-big .s34-wel-art svg { width: 40px; height: 40px; }
        .s34-wel-big .s34-wel-art img { width: 78px; height: 78px; border-radius: 22px; }
        .s34-wel-big .s34-wel-hero h3 { font-size: 28px !important; }
        .s34-wel-big .s34-wel-hero p { font-size: 15px; max-width: 680px; }
        .s34-wel-big .s34-wel-cards { grid-template-columns: repeat(auto-fill, minmax(270px, 1fr)); gap: 10px; }
        .s34-wel-big .s34-wel-card { padding: 14px 16px; }
        .s34-wel-big .s34-wel-ico { width: 36px; height: 36px; border-radius: 11px; font-size: 17px; }
        .s34-wel-big .s34-wel-ico svg { width: 19px; height: 19px; }
        .s34-wel-big .s34-wel-card b { font-size: 14px; }
        .s34-wel-big .s34-wel-card span { font-size: 13px; }
        .s34-wel-big .s34-wel-promise span { font-size: 13px; padding: 6px 12px; }
        .s34-wel-note { margin: 0 !important; font-size: 12px; opacity: .6; }
        /* Welcome: everything at a glance, each tile opens its chapter */
        .s34-wel-overview { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 10px; }
        .s34-win .s34-wel-otile { display: flex; flex-direction: column; align-items: flex-start; gap: 6px; padding: 14px !important; border-radius: 14px; cursor: pointer; text-align: left;
            background-color: rgba(255,255,255,0.04) !important; border: 1px solid rgba(255,255,255,0.08) !important; color: inherit !important; font: inherit; transition: border-color .15s, transform .15s; }
        .s34-win .s34-wel-otile:hover { border-color: #ff5f8f !important; transform: translateY(-2px); }
        .s34-wel-otile b { font-size: 14px; }
        .s34-wel-otile > span:last-child { font-size: 12px; line-height: 1.45; color: #b9b9c3 !important; }
        /* Controls: the keyboard */
        .s34-kb { display: flex; gap: 22px; justify-content: center; align-items: flex-end; padding: 20px; border-radius: 18px; overflow-x: auto;
            background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015)) !important; border: 1px solid rgba(255,255,255,0.08) !important; }
        .s34-kb-row { display: flex; gap: 6px; margin-bottom: 6px; }
        .s34-kb-pad { flex: none; width: 18px; }
        .s34-kb-key { position: relative; flex: none; width: 50px; height: 50px; box-sizing: border-box; border-radius: 10px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1px;
            background-color: #24232c !important; border: 1px solid #33313d !important; box-shadow: 0 3px 0 #121117; color: #6f6e80 !important; transition: transform .1s, box-shadow .1s; }
        .s34-kb-key b { font: 700 14px/1 system-ui, -apple-system, Segoe UI, sans-serif; }
        .s34-kb-key i { font: 700 8.5px/1.1 system-ui, -apple-system, Segoe UI, sans-serif; font-style: normal; max-width: 46px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--kc) !important; }
        .s34-kb-key.s34-kb-lit { background-color: color-mix(in srgb, var(--kc) 20%, #24232c) !important; border-color: var(--kc) !important; color: #fff !important; cursor: help; }
        .s34-kb-key.s34-kb-lit i { color: #fff !important; opacity: .85; }
        .s34-kb-key.s34-kb-hot, .s34-kb-key.s34-kb-press { transform: translateY(2px); box-shadow: 0 1px 0 #121117, 0 0 0 3px var(--kc, #8a8a99); }
        .s34-kb-key.s34-kb-press:not(.s34-kb-lit) { --kc: #6f6e80; }
        .s34-kb-wide { width: 76px; }
        .s34-kb-wider { width: 92px; }
        .s34-kb-space { width: 330px; }
        .s34-kb-arrows .s34-kb-row { justify-content: center; }
        .s34-kb-try { display: flex; align-items: center; justify-content: center; gap: 10px; min-height: 30px; font-size: 14px; font-weight: 600; text-align: center; }
        .s34-kb-try > span:only-child { opacity: .45; font-weight: 500; }
        .s34-kb-try .s34-kb-none { opacity: .55; font-weight: 500; }
        .s34-kb-try kbd, .s34-wel-ckeys kbd {
            display: inline-block; min-width: 20px; padding: 0 6px; border-radius: 6px; text-align: center;
            font: 700 12px/22px system-ui, -apple-system, Segoe UI, sans-serif;
            background-color: #2a2a31 !important; border: 1px solid #3c3c46 !important; border-bottom-width: 2px !important; color: #f0f0f4 !important;
        }
        .s34-wel-ckeys kbd svg { width: 13px; height: 13px; vertical-align: -2px; }
        .s34-wel-legend { display: grid; grid-template-columns: repeat(auto-fit, minmax(330px, 1fr)); gap: 12px; }
        .s34-wel-cgroup { padding: 12px 16px; border-radius: 14px; background-color: rgba(255,255,255,0.03) !important; border: 1px solid rgba(255,255,255,0.07) !important; border-left: 3px solid var(--gc) !important; }
        .s34-wel-cgtitle { margin-bottom: 6px; font-size: 11px; font-weight: 800; letter-spacing: .8px; text-transform: uppercase; color: var(--gc) !important; }
        .s34-wel-crow { display: flex; align-items: center; gap: 12px; padding: 7px 0; border-top: 1px solid rgba(255,255,255,0.05); }
        .s34-wel-cgtitle + .s34-wel-crow { border-top: none; }
        .s34-wel-ckeys { flex: none; width: 150px; font-size: 12px; color: #b9b9c3 !important; }
        .s34-wel-cwhat { font-size: 13px; line-height: 1.45; }
        /* Controls: the phone gestures */
        .s34-wel-gestures { display: flex; flex-direction: column; gap: 14px; }
        .s34-wel-gcards { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 10px; }
        .s34-wel-gcard { display: flex; align-items: center; gap: 14px; padding: 10px 14px 10px 10px; border-radius: 14px; background-color: rgba(255,255,255,0.04) !important; border: 1px solid rgba(255,255,255,0.07) !important; }
        .s34-wel-gcard svg { flex: none; width: 72px; height: 72px; }
        .s34-wel-gcard b { display: block; font-size: 14px; margin-bottom: 3px; }
        .s34-wel-gcard span { display: block; font-size: 13px; line-height: 1.45; color: #b9b9c3 !important; }
        .s34-wel-big .s34-wel-themes { flex-wrap: wrap; }
        .s34-wel-big .s34-wel-themes button { min-width: 120px; }
        .s34-wel-big .s34-wel-foot { padding: 12px 20px; border-top: 1px solid rgba(255,255,255,0.07); }
        .s34-wel-progress { flex: 1; height: 4px; margin: 0 6px; border-radius: 4px; overflow: hidden; background-color: rgba(255,255,255,0.08) !important; }
        .s34-wel-progress i { display: block; height: 100%; width: 0; background: linear-gradient(90deg, #ff5f8f, #8b3dff) !important; transition: width .3s; }
        @media (max-width: 900px) {
            .s34-kb-key { width: 38px; height: 40px; border-radius: 8px; }
            .s34-kb-key i { display: none; }
            .s34-kb-wide { width: 58px; } .s34-kb-wider { width: 70px; } .s34-kb-space { width: 220px; }
            .s34-kb { justify-content: flex-start; padding: 14px; gap: 14px; }
        }
        /* Phones: the window fills the screen, chapters become a row of chips */
        @media (max-width: 760px) {
            .s34-wel-big .s34-win { width: 100vw !important; height: 100vh; height: 100dvh; border-radius: 0; }
            .s34-wel-shell { grid-template-columns: minmax(0, 1fr); grid-template-rows: auto minmax(0, 1fr); }
            .s34-wel-nav { flex-direction: row; overflow-x: auto; overflow-y: hidden; padding: 8px 12px; gap: 6px; scrollbar-width: none; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.07); }
            .s34-win .s34-wel-nav button { min-height: 36px; padding: 0 12px 0 6px !important; border-radius: 99px; white-space: nowrap; font-size: 13px; background-color: rgba(255,255,255,0.04) !important; }
            .s34-wel-navico { width: 24px; height: 24px; border-radius: 99px; }
            .s34-wel-topbar { padding: 10px 14px 0; }
            .s34-wel-scroll { padding: 12px 14px 18px; }
            .s34-wel-big .s34-wel-hero { padding: 18px; gap: 14px; }
            .s34-wel-big .s34-wel-hero h3 { font-size: 21px !important; }
            .s34-wel-big .s34-wel-hero p { font-size: 14px; }
            .s34-wel-big .s34-wel-art, .s34-wel-big .s34-wel-art img { width: 54px; height: 54px; border-radius: 16px; }
            .s34-wel-big .s34-wel-art svg { width: 28px; height: 28px; }
            .s34-wel-big .s34-wel-cards, .s34-wel-gcards, .s34-wel-legend { grid-template-columns: minmax(0, 1fr); }
            .s34-wel-overview { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .s34-wel-big .s34-wel-foot { padding: 10px 14px calc(10px + env(safe-area-inset-bottom)); }
            .s34-wel-ckeys { width: 118px; }
        }
    `;

    // Modern search box (chips, filters, recent & saved)
