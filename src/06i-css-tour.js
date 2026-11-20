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
    `;

    // Modern search box (chips, filters, recent & saved)
