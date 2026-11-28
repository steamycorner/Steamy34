    // =====================================================================
    //  COLOUR MODES
    //  Everything is designed dark. White and OLED are made from it by
    //  converting every colour in the style sheet:
    //   - White: dark greys -> light greys/white, light text -> dark text,
    //            pale accent colours (tag colours, links) a bit deeper.
    //   - OLED:  dark greys -> true black (borders stay visible).
    //  Things that sit on top of pictures (labels, ♥, marks, tag bars on
    //  thumbnails, the theater buttons…) and floating dark bars keep their
    //  dark look in every mode.
    // =====================================================================
    const KEEP_DARK_RE = /s34-(sfw-label|badge|info|dl-mark|seen-mark|fav-btn|new-badge|bl-label|tagbar|chip|hover|loading|load|pv-tbar|cf-pill|cf-inline|cf-why|batch|fw-by)|span\.thumb\.s34-(selected|was)|s34-selecting/;

    function rgbToHsl(r, g, b) {
        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        const l = (max + min) / 2;
        if (max === min) return [0, 0, l];
        const d = max - min;
        const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        let h;
        if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
        else if (max === g) h = (b - r) / d + 2;
        else h = (r - g) / d + 4;
        return [h / 6, s, l];
    }

    function hslToRgb(h, s, l) {
        if (s === 0) { const v = Math.round(l * 255); return [v, v, v]; }
        const hue = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        return [hue(p, q, h + 1 / 3), hue(p, q, h), hue(p, q, h - 1 / 3)].map(v => Math.round(v * 255));
    }

    // One colour -> its White / OLED version (null = leave it as it is).
    // role (Beta 3.7) - what the colour is used for, from its CSS property:
    //  'surface' (backgrounds, shadows), 'line' (borders, outlines), 'text', 'other'
    // In Dark, raised things are lighter and lines lighter still. White and
    // OLED keep those layers (before, White came out flat and too white, and
    // OLED's panels all landed a hair from black):
    //  White: surfaces light, raised ones lighter (cards near white on a soft
    //         grey page); lines darker than the surfaces they frame
    //  OLED:  the page true black, panels a little above it, lines as in Dark
    // (Beta 3.12, toned down in 3.13) Steamy: clean and black - the greys go
    // nearly black with a breath of violet, text stays neutral; the logo's
    // magenta is the accent (the brand pink and the UI blue become it)
    const STEAMY_HUE = 0.765;
    const MINT_HUE = 0.428;   // (Beta 3.17) Classic Dark's mint
    function themeColor(r, g, b, hasAlpha, theme, role) {
        const [h, s, l] = rgbToHsl(r, g, b);
        const neutral = s < 0.2;
        let l2 = l;
        if (theme === 'steamy') {
            if (neutral) {
                if (l >= 0.5) return null;                                                                             // text: neutral, as in Dark
                if (role === 'line') return hslToRgb(STEAMY_HUE, 0.08, l);                                            // lines: neutral
                return hslToRgb(STEAMY_HUE, 0.2, l < 0.09 ? 0.018 : Math.max(0.022, l - 0.055));                     // surfaces: nearly black
            }
            if (h > 0.93 && h < 0.99 && s > 0.75 && l > 0.55) return hslToRgb(0.845, 1, 0.62);                         // brand pink -> magenta
            if (h > 0.53 && h < 0.7 && s > 0.35 && l < 0.68) return hslToRgb(0.81, Math.min(1, s + 0.15), Math.min(0.6, l + 0.03)); // UI blue (buttons, switches) -> the accent
            return null;
        }
        if (theme === 'classicdark') {
            // (Beta 3.17, asked for on Discord) rule34's older dark look: Dark's greys,
            // mint instead of the pink and the blue / purple accents. Buttons (white
            // text on them) get a deeper mint, lines, switches and text the bright one.
            if (neutral) return null;
            const mint = role === 'surface' ? hslToRgb(MINT_HUE, 0.62, Math.min(0.4, Math.max(0.3, l))) : hslToRgb(MINT_HUE, 0.62, 0.58);
            if (h > 0.93 && h < 0.99 && s > 0.75 && l > 0.55) return mint;               // brand pink
            if (h > 0.9 && h < 0.975 && s > 0.55 && l > 0.42 && l < 0.68) return mint;   // pink counters / badges (the light red artist names stay)
            if (h > 0.53 && h < 0.93 && s > 0.35 && l < 0.68) return mint;               // UI blue, purple (tag colours stay: they're lighter)
            return null;
        }
        if (theme === 'oled') {
            if (!neutral || l >= 0.4) return null;
            if (role === 'line') return null;                          // lines: as in Dark
            l2 = l < 0.09 ? 0 : Math.max(0, l - 0.05);                 // page black, panels above it
        } else {
            if (r === 255 && g === 255 && b === 255 && !hasAlpha) return null; // white text on coloured buttons
            if (neutral) {
                if (l >= 0.5) l2 = (1 - l) * 0.9;                       // light (text, icons) -> dark
                else if (role === 'surface' && l <= 0.2) l2 = 0.955 + (l - 0.05) * 0.18; // raised = lighter
                else if (role === 'surface' || role === 'line') l2 = 0.86 - Math.max(0, l - 0.15) * 0.6; // lines - and mid-grey backgrounds (switch tracks, rails): darker than the surfaces
                else l2 = 1 - l * 0.6;                                   // anything else: as before
            }
            else if (l > 0.65 && s > 0.3) l2 = l - 0.32;
            else return null;
        }
        return hslToRgb(h, neutral ? Math.min(s, 0.12) : s, Math.min(1, Math.max(0, l2)));
    }

    // What a CSS property's colour is for (custom properties: by their name)
    function colorRole(prop) {
        prop = prop.toLowerCase();
        if (prop.startsWith('--')) return /border|line/.test(prop) ? 'line' : /bg|panel|card|surface/.test(prop) ? 'surface' : /fg|text|muted|link/.test(prop) ? 'text' : 'other';
        if (/border|outline|column-rule/.test(prop)) return 'line';
        if (/^(color|fill|stroke|caret-color|text-decoration-color|-webkit-text-fill-color|accent-color)$/.test(prop)) return 'text';
        if (/background|box-shadow/.test(prop)) return 'surface';
        return 'other';
    }

    function recolorCss(css, theme) {
        const COLOR_RE = /#([0-9a-f]{6}|[0-9a-f]{3})\b|rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)/gi;
        const convert = role => (m, hex, r, g, b, a) => {
            let rgb;
            if (hex) {
                const x = hex.length === 3 ? hex.split('').map(c => c + c).join('') : hex;
                rgb = [0, 2, 4].map(i => parseInt(x.slice(i, i + 2), 16));
            } else {
                rgb = [+r, +g, +b];
            }
            // White (Beta 3.7): shadows and dimming stay dark - softer - instead
            // of turning white (white shadows were invisible: no depth at all)
            // (strong dimming behind windows - alpha 0.6 and up - stays as strong as in Dark)
            if (theme === 'white' && a != null && Math.max(rgb[0], rgb[1], rgb[2]) < 40) {
                return parseFloat(a) >= 0.6 ? m : `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${Math.round(parseFloat(a) * 50) / 100})`;
            }
            const out = themeColor(rgb[0], rgb[1], rgb[2], a != null, theme, role);
            if (!out) return m;
            return a != null ? `rgba(${out[0]},${out[1]},${out[2]},${a})`
                             : '#' + out.map(v => v.toString(16).padStart(2, '0')).join('');
        };
        // declaration by declaration, so each colour knows its role
        // (comments out first: one between two declarations hid the next one
        // from this, and its colour stayed as in Dark - e.g. a black bar in White)
        const fix = decls => decls.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|;)(\s*)([-\w]+)(\s*:)([^;]*)/g, (m, sep, sp, prop, colon, val) =>
            sep + sp + prop + colon + val.replace(COLOR_RE, convert(colorRole(prop))));
        // Each innermost "selector { … }" block; keep-dark ones are skipped
        return css.replace(/([^{}]*)\{([^{}]*)\}/g, (m, sel, decls) =>
            KEEP_DARK_RE.test(sel) || /^\s*(\d+%|from|to)\s*$/.test(sel) ? m : sel + '{' + fix(decls) + '}')
            .replace(/color-scheme:\s*dark/g, theme === 'white' ? 'color-scheme: light' : 'color-scheme: dark');
    }
    // Hand-tuned spots the converter can't judge
    const THEME_FIX_CSS = {
        white: `
            html.s34-theme-white #navbar li a:hover, html.s34-theme-white #subnavbar li a:hover { color: #1d1f24 !important; }
            html.s34-theme-white #subnavbar li.s34-sub-current a { color: #1d1f24 !important; }
            html.s34-theme-white .s34-cm-user, html.s34-theme-white .s34-cm-head h3,
            html.s34-theme-white .s34-auto-sec, html.s34-theme-white .s34-tipslink button:hover { color: #1d1f24 !important; }
            html.s34-theme-white .s34-set-head h2, html.s34-theme-white .s34-set-nav nav button:hover,
            html.s34-theme-white .s34-set .s34-set-advbtn:hover { color: #1d1f24 !important; }
            html.s34-theme-white .s34-tips kbd {
                color: #1d1f24 !important;
                background-color: #fff !important;
                border-color: #cfd3dc !important;
                box-shadow: 0 2px 0 rgba(0,0,0,0.12);
            }
            /* My Account / Options (Beta 3.7) */
            html.s34-theme-white .s34-opt-nav button.s34-on, html.s34-theme-white .s34-opt-nav button:hover,
            html.s34-theme-white .s34-opt-seg button:hover:not(:disabled):not(.s34-on),
            html.s34-theme-white .s34-acc .s34-acc-btn:hover, html.s34-theme-white .s34-opt .s34-opt-btn:hover:not(.s34-opt-primary) { color: #1d1f24 !important; }
            /* Tag bubbles in the popup sidebar (on thumbnails they stay dark) */
            html.s34-theme-white .s34-pv-chips .s34-chip { background-color: #fff !important; border-color: #d3d6de !important; }
            html.s34-theme-white .s34-pv-chips .s34-chip-artist    .s34-chip-name { color: #c62828 !important; }
            html.s34-theme-white .s34-pv-chips .s34-chip-character .s34-chip-name { color: #2e7d32 !important; }
            html.s34-theme-white .s34-pv-chips .s34-chip-copyright .s34-chip-name { color: #7b1fa2 !important; }
            html.s34-theme-white .s34-pv-chips .s34-chip-general   .s34-chip-name { color: #1a56c4 !important; }
            html.s34-theme-white .s34-pv-chips .s34-chip-metadata  .s34-chip-name { color: #b35c00 !important; }
            html.s34-theme-white .s34-pv-chips .s34-chip-count { color: #555a66 !important; }
            /* + / ⊘ / bell on the popup's white tag bubbles: deeper colours */
            html.s34-theme-white .s34-pv-chips .s34-chip-add { color: #2e7d32 !important; }
            html.s34-theme-white .s34-pv-chips .s34-chip-add[data-state="in"] { color: #b35c00 !important; }
            html.s34-theme-white .s34-pv-chips .s34-chip-add[data-state="out"] { color: #1a56c4 !important; }
            html.s34-theme-white .s34-pv-chips .s34-chip-block { color: #c62828 !important; }
            html.s34-theme-white .s34-pv-chips .s34-chip-follow { color: #6b6f7a !important; }
            html.s34-theme-white .s34-chip-follow.s34-following,
            html.s34-theme-white #tag-sidebar li a.r34-follow-btn.s34-following { color: #d97800 !important; }
            html.s34-theme-white .s34-fw-follow.s34-following { color: #a85d00 !important; border-color: rgba(168,93,0,0.45) !important; }
            html.s34-theme-white .s34-gear.s34-gear-nav:hover { color: #1d1f24 !important; }
            /* Saved searches (Beta 3.7) */
            html.s34-theme-white .s34-sb .s34-sb-save:hover { color: #1d1f24 !important; }
            html.s34-theme-white .s34-sb .s34-sb-save.s34-on, html.s34-theme-white .s34-saved-box .s34-follow-head svg { color: #2c5fcc !important; }
            html.s34-theme-white .s34-follow-box a.s34-follow-row.s34-follow-allrow:is(:link, :visited) { color: #b35c00 !important; }
            html.s34-theme-white .s34-follow-menu .s34-cmenu-item.s34-on .s34-cmenu-check { color: #d97800 !important; }
            html.s34-theme-white .s34-follow-menu .s34-cmenu-item.s34-on .s34-cmenu-name { color: #8a4a00 !important; }
            html.s34-theme-white .s34-sb .s34-pin.s34-on { color: #b35c00 !important; }
            /* Score and the "child posts" notice in the popup */
            html.s34-theme-white .s34-pv-score { color: #8a6100 !important; }
            html.s34-theme-white .s34-pv-notice { color: #7a4300 !important; }
            /* Light page behind pictures in the popup */
            html.s34-theme-white .s34-pv-overlay { background-color: rgba(238,240,244,0.97) !important; }
            html.s34-theme-white .s34-overlay { background-color: rgba(30,32,40,0.35) !important; }
            html.s34-theme-white .s34-stat-tile b { -webkit-text-fill-color: transparent; }
            html.s34-theme-white ::-webkit-scrollbar-thumb { background: #c5c8d0 !important; }
            /* (Beta 3.7) the page a soft grey, so the lighter cards and panels stand out on it */
            html.s34-theme-white { --s34-bg: #e2e4e9 !important; }
            /* (Beta 3.17) small spots the contrast scan found (Classic had these fixes, White didn't) */
            html.s34-theme-white .s34-pill-x { opacity: .85 !important; }
            html.s34-theme-white .s34-pv-chips .s34-chip-count { color: #3d424b !important; opacity: .85 !important; }
            html.s34-theme-white .s34-blm-account-save { color: #a35400 !important; }
            html.s34-theme-white .s34-opt-dirty { color: #a35400 !important; }
        `,
        // (Beta 3.12, toned down in 3.13) Steamy – Steamy Design Guide → Steamy:
        // clean and black, the logo's magenta only for the main action, what's
        // active and counts. No glows, glitch, scanlines or slanted type.
        steamy: `
            html.s34-theme-steamy { --s34-bg: #050407 !important; }
            html.s34-theme-steamy, html.s34-theme-steamy body { background: #050407 !important; }
            html.s34-theme-steamy ::-webkit-scrollbar-thumb { background: #2a2730 !important; }
            html.s34-theme-steamy ::selection { background: rgba(255,61,242,.35); color: #fff; }
            /* the posts page's sidebar: see-through (painted in the page colour it looked like a slab) */
            html.s34-theme-steamy body .sidebar, html.s34-theme-steamy body .sidebar .tag-search, html.s34-theme-steamy body .tag-search, html.s34-theme-steamy body #tag-sidebar { background-color: transparent !important; }
            /* page dividers: quiet - a thin line and grey text */
            html.s34-theme-steamy .s34-page-divider::before, html.s34-theme-steamy .s34-page-divider::after { height: 1px; background: rgba(255,255,255,.08) !important; }
            html.s34-theme-steamy .s34-page-divider span { border-radius: 0; border-color: rgba(255,255,255,.1) !important; background-color: transparent !important; color: #8f8b99 !important; font-size: 11px; }
            /* labels on thumbnails: neutral */
            html.s34-theme-steamy span.thumb .s34-badge.s34-video, html.s34-theme-steamy span.thumb .s34-badge.s34-gif { background: rgba(5,4,7,.8) !important; color: #fff !important; border: 1px solid rgba(255,255,255,.12); }
            /* thumbnails: a thin magenta line on hover, nothing else */
            html.s34-theme-steamy .image-list span.thumb:hover { box-shadow: 0 0 0 1px #ff3df2 !important; }
            /* the search box: a magenta line while you type */
            html.s34-theme-steamy .s34-sb-box:focus-within, html.s34-theme-steamy textarea.s34-search:focus { border-color: #ff3df2 !important; box-shadow: none !important; }
            /* windows and the popup: black */
            html.s34-theme-steamy .s34-pv-overlay { background-color: rgba(5,4,7,0.98) !important; }
            html.s34-theme-steamy .s34-end-card { background: #0b0a0e !important; }
            html.s34-theme-steamy :is(button, a, input, textarea, select):focus-visible { outline: 2px solid #ff3df2 !important; outline-offset: 2px; }
        `,
        // (Beta 3.17) Classic Dark - rule34's older dark look with mint (an idea from Discord)
        classicdark: `
            html.s34-theme-classicdark ::selection { background: rgba(69,211,150,.35); color: #fff; }
            html.s34-theme-classicdark .s34-sb-box:focus-within, html.s34-theme-classicdark textarea.s34-search:focus { border-color: #45d396 !important; }
            html.s34-theme-classicdark :is(button, a, input, textarea, select):focus-visible { outline: 2px solid #45d396 !important; outline-offset: 2px; }
            html.s34-theme-classicdark .image-list span.thumb:hover { box-shadow: 0 0 0 1px #45d396 !important; }
            html.s34-theme-classicdark ::-webkit-scrollbar-thumb { background: #34343c !important; }
            html.s34-theme-classicdark .s34-dl-btn .s34-dl-main { color: #fff !important; opacity: 1 !important; }
            html.s34-theme-classicdark .s34-dl-btn .s34-dl-sub { color: #fff !important; opacity: .95 !important; }
        `,
        oled: `
            html.s34-theme-oled, html.s34-theme-oled body { background: #000 !important; }
            html.s34-theme-oled .s34-pv-overlay { background-color: rgba(0,0,0,0.98) !important; }
            html.s34-theme-oled ::-webkit-scrollbar-thumb { background: #222 !important; }
        `,
        dark: ''
    };


    function injectStyles() {
        const style = document.createElement('style');
        style.id = 'steamy34-styles';
        let css =
            DARK_CSS +
            (CONFIG.thumbGrid ? GRID_CSS : '') + CORE_CSS +
            BUTTON_CSS + AC_CSS + (CONFIG.searchChips ? SEARCH_CSS : '') + SETTINGS_CSS +
            // the big extras block, in its original order (src\06a-06i)
            EXTRA_CSS + WINDOWS_CSS + CONTROLS_CSS + POPUP_SIDE_CSS + COLLECTIONS_CSS +
            POPUP_INFO_CSS + MISC_CSS + PHONE_CSS + TOUR_CSS + FOLLOW_CSS + ACCOUNT_CSS +
            (CONFIG.hideListTags && !isPostView ? HIDE_LIST_TAGS_CSS : '') +
            (!isPostView ? LIST_SIDEBAR_CSS : '') +
            (CONFIG.postTagChips && isPostView ? POST_TAGS_CSS : '');
        // (Beta 3.17) Classic Dark: the brand gradient becomes mint (deep enough for white text)
        if (CONFIG.theme === 'classicdark') css = css.replace(/#ff5f8f(\s*(?:\d+%)?\s*),\s*#8b3dff/gi, '#27a56f$1, #1d7c53').replace(/#8b3dff/gi, '#1d7c53');
        // (Beta 3.12) Steamy: the brand gradient's pink → purple becomes the logo's magenta → violet; labels quiet grey
        if (CONFIG.theme === 'steamy') css = css.replace(/#ff5f8f(\s*(?:\d+%)?\s*),\s*#8b3dff/gi, '#ff3df2$1, #9b3bff').replace(/#8b3dff/gi, '#9b3bff').replace(/#ff8fa3/gi, '#8f8b99');
        if (CONFIG.theme !== 'dark') css = recolorCss(css, CONFIG.theme) + THEME_FIX_CSS[CONFIG.theme];
        style.textContent = css;
        (document.head || document.documentElement).appendChild(style);
    }
    injectStyles();

    // Screenshot mode (20d) was on? Blur from the very first moment
    try {
        if (GM_getValue('steamy34_sfw', false) === true) {
            document.documentElement.classList.add('s34-sfw');
            if (CONFIG.censorComments) document.documentElement.classList.add('s34-sfw-text');
        }
    } catch (e) {}

    // An ad blocker was found last time? Then the right ad column steps aside
    // from the very first moment (checked again once the page is there - it
    // comes back if no ad blocker is found; see foldEmptyAdColumn)
    try {
        if (!isPostView && GM_getValue('steamy34_adblock_seen', false) === true) {
            document.documentElement.classList.add('s34-adcol-early');
        }
    } catch (e) {}

    // Give each thumbnail its aspect ratio (--r) for the justified layout
    // thumbs (here and below): only these - e.g. a freshly loaded page;
    // without it, every thumbnail on the page
    const pageThumbs = () => document.querySelectorAll('.image-list span.thumb');

    function setThumbRatios(thumbs) {
        (thumbs || pageThumbs()).forEach(thumb => {
            if (thumb.dataset.s34Ratio) return;
            const img = thumb.querySelector('img');
            if (!img) return;
            thumb.dataset.s34Ratio = '1';

            const apply = () => {
                const w = img.naturalWidth || parseInt(img.getAttribute('width'), 10);
                const h = img.naturalHeight || parseInt(img.getAttribute('height'), 10);
                if (w && h) {
                    // Clamp extreme panoramas / tall strips so rows stay sane
                    const r = Math.min(Math.max(w / h, 0.4), 3);
                    thumb.style.setProperty('--r', r.toFixed(4));
                }
            };

            if (img.complete && img.naturalWidth) apply();
            else img.addEventListener('load', apply, { once: true });
        });
    }

    function thumbTags(img) {
        const text = img.dataset.s34Tags || img.title || img.alt || '';
        // (Beta 3.8) rule34 writes ' as &#039; - "five_nights_at_freddy&#039;s"
        // never matched the blacklisted "five_nights_at_freddy's"
        return ' ' + unescapeHtml(text.toLowerCase()).replace(/\s+/g, ' ') + ' ';
    }

    // Remove the tag tooltip on hover: move the title into a data attribute
    // (so badge/video detection can still read it) and drop the title itself
    function removeTagTooltips(thumbs) {
        (thumbs || document.querySelectorAll('.image-list span.thumb, .thumb')).forEach(thumb => {
            thumb.querySelectorAll('[title]').forEach(el => {
                if (!el.dataset.s34Tags) el.dataset.s34Tags = el.getAttribute('title');
                el.removeAttribute('title');
            });
        });
        const main = document.querySelector('#image[title]');
        if (main) main.removeAttribute('title');
    }
    function isVideoThumb(img) {
        // the site marks video thumbnails with "webm-thumb" – also catches videos without a video tag
        return img.classList.contains('webm-thumb') || /\s(video|webm|mp4|animated_video)\s/.test(thumbTags(img));
    }

    // VIDEO / GIF labels on thumbnails, based on the tags in the image title
    function addThumbBadges(thumbs) {
        (thumbs || pageThumbs()).forEach(thumb => {
            if (thumb.querySelector('.s34-badge')) return;
            const img = thumb.querySelector('img');
            if (!img) return;

            const tags = thumbTags(img);
            let label = '';
            let cls = '';
            if (isVideoThumb(img)) { label = '▶ VID'; cls = 's34-video'; }
            else if (/\s(animated|gif|animated_gif)\s/.test(tags)) { label = 'GIF'; cls = 's34-gif'; }
            if (!label) return;

            const badge = document.createElement('span');
            badge.className = 's34-badge ' + cls;
            badge.textContent = label;
            thumb.appendChild(badge);
        });
    }

