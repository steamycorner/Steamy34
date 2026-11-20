// Contrast scan: every visible Steamy34 text vs. the background behind it.
window.__contrast = async function (themes) {
    const wait = ms => new Promise(r => setTimeout(r, ms));
    const parse = c => { const m = (c || '').match(/[\d.]+/g); if (!m) return null; return { r: +m[0], g: +m[1], b: +m[2], a: m[3] === undefined ? 1 : +m[3] }; };
    const lum = c => { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b); };
    const mix = (fg, bg, a) => ({ r: fg.r * a + bg.r * (1 - a), g: fg.g * a + bg.g * (1 - a), b: fg.b * a + bg.b * (1 - a), a: 1 });
    const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
    async function frame(width, url) {
        const f = document.createElement('iframe');
        f.style.cssText = `position:fixed;left:-${width + 50}px;top:0;width:${width}px;height:900px;border:0;`;
        const u = url || '/index.php?page=post&s=list&tags=test';
        f.src = u.includes('#') ? u.replace('#', '&frame=' + Math.random() + '#') : u + '&frame=' + Math.random();
        document.body.appendChild(f);
        await new Promise(r => f.addEventListener('load', r, { once: true }));
        const w = f.contentWindow;
        await new Promise(r => { const s = w.document.createElement('script'); s.src = '/phonemock.js'; s.onload = r; w.document.head.appendChild(s); });
        return { f, w, d: w.document };
    }
    function scan(w, d, where) {
        const out = [];
        const all = d.querySelectorAll('[class*="s34-"], [class*="s34-"] *, .r34-follow-btn, #tag-sidebar *');
        all.forEach(el => {
            const own = Array.from(el.childNodes).filter(n => n.nodeType === 3 && n.textContent.trim()).map(n => n.textContent.trim()).join(' ');
            if (!own) return;
            const r = el.getBoundingClientRect();
            if (!r.width || !r.height) return;
            const cs = w.getComputedStyle(el);
            if (cs.visibility === 'hidden') return;
            let fg = parse(cs.color);
            if (!fg) return;
            // background behind: first ancestor with a solid-ish background
            let bg = null, opac = 1, gradient = false;
            for (let e = el; e && e.nodeType === 1; e = e.parentElement) {
                const s = w.getComputedStyle(e);
                opac *= parseFloat(s.opacity);
                if (s.backgroundImage && s.backgroundImage !== 'none' && /gradient/.test(s.backgroundImage)) { gradient = true; break; }
                const b = parse(s.backgroundColor);
                if (b && b.a > 0.6) { bg = b; break; }
            }
            if (gradient) return;
            if (!bg) bg = parse(w.getComputedStyle(d.body).backgroundColor) || { r: 255, g: 255, b: 255, a: 1 };
            if (opac === 0) return;
            const shown = mix(fg, bg, fg.a * opac);
            const cr = ratio(shown, bg);
            if (cr < 2.6) out.push({ where, cls: (el.className && el.className.baseVal === undefined ? el.className : el.tagName).toString().slice(0, 60), text: own.slice(0, 40), ratio: Math.round(cr * 100) / 100, color: cs.color, bg: `rgb(${bg.r},${bg.g},${bg.b})`, opacity: Math.round(opac * 100) / 100 });
        });
        return out;
    }
    const ART = (tag, extra) => Object.assign({ tag, added: 1, seen: 100, latest: 0, count: 0, more: false }, extra || {});
    const store = theme => ({ steamy34_settings: { theme }, steamy34_following: { artists: [ART('someartist', { count: 3 }), ART('feedtest'), ART('busy_artist', { count: 7, more: true })], checkedAt: Date.now() }, steamy34_viewed: { 101: 1 }, steamy34_downloaded: { 103: 1 }, steamy34_favs: { 102: 1 } });
    const res = [];
    for (const theme of themes || ['white', 'dark', 'oled']) {
        for (const width of [1280, 390]) {
            // posts page + sidebar
            let { f, w, d } = await frame(width);
            await w.__phone(theme, { store: store(theme) }); await wait(400);
            if (width === 390) { const m = d.querySelector('.s34-menu-btn'); if (m) { m.click(); await wait(300); } }
            res.push(...scan(w, d, theme + ' ' + width + ' posts page'));
            if (width === 390) { const m = d.querySelector('.s34-menu-btn'); if (m) { m.click(); await wait(300); } }
            // popup
            d.querySelector('#s101 a').click(); await wait(1200);
            res.push(...scan(w, d, theme + ' ' + width + ' popup'));
            d.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', bubbles: true })); await wait(300);
            // Manage window
            const man = d.querySelector('.s34-follow-box [data-fb="manage"]');
            if (man) { man.click(); await wait(300); res.push(...scan(w, d, theme + ' ' + width + ' manage window')); const x = d.querySelector('.s34-follow-win .s34-win-close, .s34-follow-win [data-act="close"]'); if (x) x.click(); else d.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', bubbles: true })); await wait(300); }
            // Settings
            const g = d.querySelector('.s34-gear'); if (g) { g.click(); await wait(300); res.push(...scan(w, d, theme + ' ' + width + ' settings')); }
            f.remove();
            // artist feed page
            ({ f, w, d } = await frame(width, '/index.php?page=post&s=list&tags=someartist#s34-following=someartist'));
            await w.__phone(theme, { store: store(theme) }); await wait(500);
            res.push(...scan(w, d, theme + ' ' + width + ' artist page'));
            f.remove();
        }
    }
    return res;
};
