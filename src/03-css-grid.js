    const GRID_CSS = `
        /* The content column shrinks to fit its contents by default, which
           squeezes the grid into ~2 columns. Make it take all the space to the
           right of the sidebar instead (the sidebar itself is not touched). */
        #post-list > .content,
        #post-list .content:has(> .image-list),
        .content:has(> .image-list) {
            float: none !important;
            display: flow-root !important;
            width: auto !important;
            max-width: none !important;
            /* #post-list is a flex row: let the content take all leftover space */
            flex: 1 1 0 !important;
            min-width: 0 !important;
        }
        ${CONFIG.thumbLayout === 'justified' ? `
        /* Justified rows: every tile's width is proportional to its aspect
           ratio (--r, set by script), so each row has one height and fills
           the full width - original ratios, no cropping, no gaps. */
        .image-list {
            display: flex !important;
            flex-wrap: wrap !important;
            align-items: flex-start;
        }
        .image-list span.thumb {
            flex-grow: calc(var(--r, 1) * 100) !important;
            /* --s34-row is the row height (the sidebar size slider changes it live) */
            flex-basis: calc(var(--r, 1) * var(--s34-row, ${CONFIG.thumbRowHeight}px)) !important;
            aspect-ratio: var(--r, 1);
            max-height: calc(var(--s34-row, ${CONFIG.thumbRowHeight}px) * 1.8);
        }
        /* Stops the last, half-full row from stretching huge */
        .image-list::after {
            content: '';
            flex-grow: 1000000000;
        }
        ` : `
        .image-list {
            display: grid !important;
            grid-template-columns: repeat(auto-fill, minmax(var(--s34-tile, ${CONFIG.thumbMinWidth}px), 1fr));
        }
        .image-list span.thumb { aspect-ratio: 1 / 1; }
        `}
        .image-list {
            gap: ${CONFIG.thumbGap}px;
            padding: ${CONFIG.thumbGap}px 0;
            width: 100% !important;
            box-sizing: border-box;
            text-align: left !important;
        }
        .image-list > br, .image-list > p:empty { display: none !important; }

        .image-list span.thumb {
            position: relative;
            display: block !important;
            width: auto !important;
            height: auto !important;
            min-width: 0;
            margin: 0 !important;
            padding: 0 !important;
            float: none !important;
            overflow: hidden;
            border-radius: 8px;
            background-color: #1c1c20 !important;
            box-shadow: 0 1px 3px rgba(0,0,0,0.35);
            transition: transform .15s ease, box-shadow .15s ease;
        }
        .image-list span.thumb:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(0,0,0,0.5);
        }
        .image-list span.thumb > a {
            display: block !important;
            width: 100%;
            height: 100%;
        }
        .image-list span.thumb img {
            display: block;
            width: 100% !important;
            height: 100% !important;
            max-width: none !important;
            max-height: none !important;
            object-fit: ${CONFIG.thumbLayout === 'justified' ? 'cover' : CONFIG.thumbFit};
            border: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
        }
        ${CONFIG.thumbExtras === 'below' ? `
        /* Thumbnail extras BELOW the picture: the picture keeps its shape in
           the link, the tile grows by a strip that holds the VIDEO / GIF label,
           the tag chips, ♥ and the viewed / downloaded mark. */
        html.s34-tx-below .image-list span.thumb {
            aspect-ratio: auto !important;
            max-height: none !important;
            padding-bottom: var(--s34-strip) !important;
        }
        html.s34-tx-below .image-list span.thumb > a {
            height: auto !important;
            aspect-ratio: ${CONFIG.thumbLayout === 'justified' ? 'var(--r, 1)' : '1 / 1'};
            ${CONFIG.thumbLayout === 'justified' ? `max-height: calc(var(--s34-row, ${CONFIG.thumbRowHeight}px) * 1.8);` : ''}
            overflow: hidden;
        }
        html.s34-tx-below .image-list span.thumb .s34-hover-video { bottom: var(--s34-strip); height: auto !important; }
        html.s34-tx-below .image-list span.thumb.s34-loading::before { bottom: var(--s34-strip); }
        html.s34-tx-below span.thumb .s34-tagbar {
            top: auto;
            bottom: 0;
            height: var(--s34-strip);
            box-sizing: border-box;
            flex-direction: row;
            align-items: center;
            padding: 0 36px 0 6px;
            background: none !important;
        }
        html.s34-tx-below span.thumb .s34-chiprow { flex: 0 1 auto; }
        html.s34-tx-below span.thumb:has(.s34-dl-mark) .s34-tagbar { padding-right: 64px; }
        /* room for the labels on the left (▶ VID is ~42px, GIF ~33px, NEW ~36px) */
        html.s34-tx-below span.thumb:has(.s34-badge) .s34-tagbar { padding-left: 44px; }
        html.s34-tx-below span.thumb:has(.s34-badge.s34-video) .s34-tagbar { padding-left: 54px; }
        html.s34-tx-below span.thumb:has(.s34-new-badge) .s34-tagbar { padding-left: 48px; }
        html.s34-tx-below span.thumb:has(.s34-new-badge):has(.s34-badge) .s34-tagbar { padding-left: 84px; }
        html.s34-tx-below span.thumb:has(.s34-new-badge):has(.s34-badge.s34-video) .s34-tagbar { padding-left: 94px; }
        html.s34-tx-below span.thumb .s34-badge { top: auto; bottom: calc((var(--s34-strip) - 18px) / 2); }
        html.s34-tx-below span.thumb .s34-new-badge { top: auto; bottom: calc((var(--s34-strip) - 18px) / 2); }
        html.s34-tx-below span.thumb .s34-fav-btn { top: auto; bottom: calc((var(--s34-strip) - 24px) / 2); opacity: .75; }
        html.s34-tx-below span.thumb .s34-dl-mark { top: auto; bottom: calc((var(--s34-strip) - 24px) / 2); }
        html.s34-tx-below { --s34-strip: 30px; }
        ` : ''}
    `;

    // Always loaded (not only with the modern thumbnail layout): hover
    // previews, tag bars, popup, messages, badges, page dividers, Cloudflare
    // window. (Before 15.6 these sat in GRID_CSS, so turning the modern
    // layout off broke the popup.)
