// Steamy34 test suite – runs on the fake site from server.ps1.
// In the browser (http://localhost:8735/index.php?page=post&s=list):
//   load this file, then:   await __suite()            -> every check, all colour modes
//                           await __suite('popup')     -> only checks whose name contains "popup"
// Every check runs in a fresh, hidden-away frame (a new copy of the script each
// time), so checks can't disturb each other. Result: { passed, failed, results: [...] }.
(function () {
    'use strict';
    const wait = ms => new Promise(r => setTimeout(r, ms));

    // Opens a fresh frame of the fake site with phonemock.js loaded.
    // width: 1280 (computer) or 390 (phone).
    // url (optional): another address, e.g. the Following feed ("…#s34-following")
    async function frame(width, url) {
        const f = document.createElement('iframe');
        f.style.cssText = `position:fixed;left:-${width + 50}px;top:0;width:${width}px;height:900px;border:0;`;
        const tag = '&frame=' + Math.random();
        f.src = url ? (url.includes('#') ? url.replace('#', tag + '#') : url + tag) : '/index.php?page=post&s=list&tags=test' + tag;
        document.body.appendChild(f);
        await new Promise(r => f.addEventListener('load', r, { once: true }));
        // Under load the first "load" can be the empty about:blank page - wait
        // for the real one, or the fake page gets built in the wrong document
        for (let i = 0; i < 80; i++) {
            let href = '';
            try { href = f.contentWindow.location.href; } catch (e) {}
            if (/frame=/.test(href) && f.contentWindow.document.readyState === 'complete') break;
            await wait(100);
        }
        const w = f.contentWindow;
        await new Promise(r => { const s = w.document.createElement('script'); s.src = '/phonemock.js'; s.onload = r; w.document.head.appendChild(s); });
        return { f, w, d: w.document };
    }

    // The checks. Each gets (w, d) of its frame, after __phone ran, and returns
    // an object of results; throw or return { fail: '…' } to fail.
    const CHECKS = [];
    const check = (name, opts, fn) => CHECKS.push({ name, opts, fn });
    const key = (d, k, c, extra) => d.dispatchEvent(new KeyboardEvent('keydown', Object.assign({ key: k, code: c, bubbles: true }, extra || {})));
    const curPost = d => { const a = d.querySelector('.s34-pv-full'); return a ? a.getAttribute('href').replace(/.*[?&]id=(\d+).*/, '$1') : '-'; };
    const toasts = d => Array.from(d.querySelectorAll('.s34-toast span')).map(s => s.textContent);
    const problems = w => w.__log.filter(l => /ERROR|THROW|ALERT/.test(l));

    check('syntax + version', {}, async (w) => {
        const src = await fetch('/s.js').then(r => r.text());
        new Function(src);   // throws on a syntax error
        const ver = src.match(/@version\s+(\S+)/)[1];
        const top = src.match(/v: '([^']+)'/)[1];
        if (top.toLowerCase().replace(/^(alpha|beta) /, '') !== ver.replace(/-(alpha|beta)$/, '')) return { fail: 'changelog top ' + top + ' ≠ @version ' + ver };
        if (/â€|Ã/.test(src)) return { fail: 'broken special characters (encoding)' };
        return { version: ver, changelog: top };
    });

    check('video labels (tag or site class)', {}, async (w, d) => {
        const badge = id => { const b = d.querySelector('#s' + id + ' .s34-badge'); return b ? b.textContent : '-'; };
        const got = { '102 (video tag)': badge(102), '105 (only webm-thumb)': badge(105), '101 (picture)': badge(101) };
        if (got['102 (video tag)'] !== '▶ VID' || got['105 (only webm-thumb)'] !== '▶ VID' || got['101 (picture)'] !== '-') return { fail: JSON.stringify(got) };
        return got;
    });

    check('phone menu: Settings button + logo/version line', { width: 390 }, async (w, d) => {
        const tools = d.querySelector('.s34-menu-tools');
        if (!tools) return { fail: 'no menu tools' };
        const order = Array.from(tools.children).map(c => c.className.split(' ')[0]);
        // Settings sits in the 2×2 block (Collections · Stats · Blacklist · Settings)
        const g = order.indexOf('s34-dock'), t = order.indexOf('s34-tipslink'), b = order.indexOf('s34-brand');
        const inDock = !!tools.querySelector('.s34-dock .s34-gear');
        return g >= 0 && inDock && t > g && b > t ? { order: order.join(' > ') } : { fail: order.join(' > ') };
    });

    check('slim Settings button + logo/version line', {}, async (w, d) => {
        const src = await fetch('/s.js').then(r => r.text());
        const top = src.match(/v: '([^']+)'/)[1];
        const gear = d.querySelector('.s34-gear.s34-inline');
        if (!gear) return { fail: 'no sidebar Settings button' };
        const gh = gear.getBoundingClientRect().height;
        if (gh > 36 || gear.textContent.trim() !== 'Settings' || gear.querySelector('img')) return { fail: 'button: ' + Math.round(gh) + 'px, "' + gear.textContent.trim() + '"' };
        const brand = d.querySelector('.s34-brand');
        if (!brand || !brand.getClientRects().length) return { fail: 'logo/version line missing or hidden' };
        const v = d.querySelector('.s34-brand .s34-brand-ver');
        if (!v) return { fail: 'no version label' };
        const cs = getComputedStyle(v);
        if (v.textContent !== top) return { fail: 'shows ' + v.textContent + ', expected ' + top };
        if (cs.display === 'none' || parseFloat(cs.fontSize) > 12) return { fail: 'looks wrong: ' + cs.display + ' ' + cs.fontSize };
        return { shows: v.textContent, colour: cs.color };
    });

    check('sidebar: calm order (search, Following, View, 2×2 block)', { store: { steamy34_following: { artists: [{ tag: 'someartist', added: 1, seen: 0, latest: 0, count: 0, more: false }] } } }, async (w, d) => {
        const top = sel => { const el = d.querySelector(sel); return el && el.getClientRects().length ? el.getBoundingClientRect().top : -1; };
        const t = { search: top('.s34-sb'), following: top('.s34-follow-box'), view: top('.s34-quick'), block: top('.s34-dock') };
        const tiles = Array.from(d.querySelectorAll('.s34-dock .s34-hub button, .s34-dock .s34-blbtn, .s34-dock .s34-gear')).map(b => b.innerText.trim().replace(/\s+/g, ' '));
        const heights = Array.from(d.querySelectorAll('.s34-dock .s34-hub button, .s34-dock .s34-blbtn, .s34-dock .s34-gear')).map(b => Math.round(b.getBoundingClientRect().height));
        const noTheme = !d.querySelector('.s34-quick .s34-q-theme');
        const row = Array.from(d.querySelectorAll('.s34-sb-tools .s34-sb-btn')).map(b => b.textContent.trim()).join(' | ');
        const ok = t.search >= 0 && t.search < t.following && t.following < t.view && t.view < t.block && tiles.join() === 'Collections,Stats,Blacklist,Settings'
            && heights.every(h => h === heights[0]) && noTheme && row === 'Recent | Tags | Follow';
        return ok ? { tiles: tiles.join(' · '), row } : { fail: JSON.stringify({ t, tiles, heights, noTheme, row }) };
    });
    check('sidebar: nothing cut off at the real site\'s 180px', {}, async (w, d) => {
        const sb = d.querySelector('.sidebar');
        sb.style.cssText += ';min-width:180px!important;max-width:180px!important;width:180px!important;box-sizing:border-box;';
        await wait(200);
        const labels = Array.from(d.querySelectorAll('.s34-sb-tools .s34-sb-btn > span:not(.s34-sr), .s34-dock .s34-hub b, .s34-dock .s34-blbtn-text b, .s34-dock .s34-gear-text'));
        const cut = labels.filter(el => el.getClientRects().length && el.scrollWidth > el.clientWidth + 1).map(el => el.textContent);
        const widths = labels.map(el => Math.round(el.getBoundingClientRect().width));
        return labels.length >= 6 && !cut.length ? { labels: labels.map(l => l.textContent).join(' · ') } : { fail: JSON.stringify({ cut, n: labels.length, widths, sidebar: Math.round(sb.getBoundingClientRect().width) }) };
    });
    check('feed bar: buttons together on the right', {
        url: '/index.php?page=post&s=list&tags=someartist#s34-following=someartist',
        store: { steamy34_following: { artists: [{ tag: 'someartist', added: 1, seen: 105, latest: 0, count: 0, more: false }], checkedAt: Date.now() } }
    }, async (w, d) => {
        const bar = d.querySelector('.s34-feed-bar');
        const [a, b] = Array.from(bar.querySelectorAll('.s34-feed-btn')).map(x => x.getBoundingClientRect());
        const gap = Math.round(b.left - a.right), right = Math.round(bar.getBoundingClientRect().right - b.right);
        return gap >= 0 && gap <= 16 && right <= 14 ? { gap, right } : { fail: JSON.stringify({ gap, right }) };
    });
    check('sidebar: Recent and Tags open one at a time', {}, async (w, d) => {
        const recent = d.querySelector('[data-act="menu"]'), tags = d.querySelector('[data-act="tags"]');
        const open = () => ({ recent: !d.querySelector('.s34-sb-menu').hidden, tags: !d.querySelector('.s34-ft').hidden });
        tags.click(); await wait(100); const a = open();
        recent.click(); await wait(100); const b = open();
        recent.click(); await wait(100); const c = open();
        const ok = a.tags && !a.recent && b.recent && !b.tags && !c.recent && !c.tags && w.__store.steamy34_sb_panel === '';
        return ok ? {} : { fail: JSON.stringify({ a, b, c, saved: w.__store.steamy34_sb_panel }) };
    });

    check('sidebar: no site leftovers', {}, async (w, d) => {
        const shown = el => !!el && getComputedStyle(el).display !== 'none' && el.getClientRects().length > 0;
        const left = [];
        if (shown(d.querySelector('#displayOptions'))) left.push('#displayOptions (empty bullet)');
        if (shown(d.querySelector('.tag-search > small'))) left.push('"(Supports wildcard *)"');
        if (!d.querySelector('.s34-q-ai')) left.push('AI switch not moved into the panel');
        return left.length ? { fail: left.join(', ') } : { ok: 'clean' };
    });

    // Thumbnail extras: where the tag bar, ♥ and VIDEO label sit compared to the picture
    const extrasLayout = (w, d) => {
        const r = el => el.getBoundingClientRect();
        const t = d.querySelector('#s102'), img = r(t.querySelector('a img'));
        const parts = { tags: t.querySelector('.s34-tagbar'), heart: t.querySelector('.s34-fav-btn'), video: t.querySelector('.s34-badge') };
        const out = {};
        for (const k in parts) {
            const el = parts[k];
            if (!el) { out[k] = 'missing'; continue; }
            const b = r(el), cs = w.getComputedStyle(el);
            out[k] = (cs.visibility === 'hidden' || cs.opacity === '0') ? 'hidden'
                : b.top >= img.bottom - 1 ? 'below' : 'on picture';
        }
        const chip = t.querySelector('.s34-chip');
        if (parts.video && chip && out.video !== 'hidden' && out.tags !== 'hidden') out.labelGap = Math.round(r(chip).left - r(parts.video).right);
        if (out.labelGap !== undefined && out.labelGap < 2 && out.video === 'below' && out.tags === 'below') out.overlap = true;
        out.tileOk = !out.overlap && Math.abs(r(t).bottom - Math.max(img.bottom, r(parts.tags || t).bottom)) < 2;
        return out;
    };
    const extrasCheck = (want, phone) => async (w, d) => {
        const got = extrasLayout(w, d);
        const bad = Object.keys(want).filter(k => got[k] !== want[k]);
        return bad.length || !got.tileOk ? { fail: JSON.stringify(got) } : got;
    };
    check('thumb extras: on the picture', { store: { steamy34_settings: { thumbExtras: 'on' } } }, extrasCheck({ tags: 'on picture', heart: 'hidden', video: 'on picture' }));
    check('thumb extras: only on hover', { store: { steamy34_settings: { thumbExtras: 'hover' } } }, extrasCheck({ tags: 'hidden', heart: 'hidden', video: 'on picture' }));
    check('thumb extras: hover keeps marks and favourited hearts', { store: { steamy34_settings: { thumbExtras: 'hover' }, steamy34_favs: { 102: 1 }, steamy34_downloaded: { 102: 1 } } }, async (w, d) => {
        const vis = el => !!el && w.getComputedStyle(el).visibility !== 'hidden' && w.getComputedStyle(el).opacity !== '0';
        const t = d.querySelector('#s102');
        const got = { favHeart: vis(t.querySelector('.s34-fav-btn.s34-faved')), mark: vis(t.querySelector('.s34-dl-mark')), tags: vis(t.querySelector('.s34-tagbar')), video: vis(t.querySelector('.s34-badge')), plainHeart: vis(d.querySelector('#s101 .s34-fav-btn')) };
        return got.favHeart && got.mark && got.video && !got.tags && !got.plainHeart ? got : { fail: JSON.stringify(got) };
    });
    check('thumb icons: same size, in one line', { store: { steamy34_viewed: { 101: 1 }, steamy34_downloaded: { 103: 1 } } }, async (w, d) => {
        const box = sel => { const el = d.querySelector(sel); if (!el) return null; const b = el.getBoundingClientRect(); return { w: Math.round(b.width), h: Math.round(b.height), top: Math.round(b.top - el.closest('span.thumb').getBoundingClientRect().top) }; };
        const got = { heart: box('#s101 .s34-fav-btn'), eye: box('#s101 .s34-seen-mark'), download: box('#s103 .s34-dl-mark:not(.s34-seen-mark)') };
        const all = Object.values(got);
        if (all.some(b => !b)) return { fail: 'missing: ' + JSON.stringify(got) };
        const same = all.every(b => b.w === all[0].w && b.h === all[0].h && b.top === all[0].top);
        return same ? { size: all[0].w + '×' + all[0].h } : { fail: JSON.stringify(got) };
    });
    check('VID label: normal size', {}, async (w, d) => {
        const b = d.querySelector('#s102 .s34-badge').getBoundingClientRect();
        const size = Math.round(b.width) + '×' + Math.round(b.height);
        return b.height >= 16 && b.height <= 20 && b.width <= 50 ? { size } : { fail: size };
    });
    check('thumb extras: below the picture', { store: { steamy34_settings: { thumbExtras: 'below' } } }, extrasCheck({ tags: 'below', heart: 'below', video: 'below' }));
    check('thumb extras: below, square tiles', { store: { steamy34_settings: { thumbExtras: 'below', thumbLayout: 'grid' } } }, extrasCheck({ tags: 'below', heart: 'below', video: 'below' }));
    check('thumb extras: below on a phone', { width: 390, store: { steamy34_settings: { thumbExtras: 'below' } } }, extrasCheck({ tags: 'below', heart: 'below', video: 'below' }));
    check('thumb extras: "only on hover" shows everything on a phone', { width: 390, store: { steamy34_settings: { thumbExtras: 'hover' } } }, async (w, d) => {
        const got = extrasLayout(w, d);
        // nothing to hover on a phone: tags and ♥ stay visible without hovering
        return got.tags === 'on picture' && got.heart !== 'hidden' && got.video === 'on picture' ? got : { fail: JSON.stringify(got) };
    });
    check('pins: "pinned" / "paused" sits next to the pin', {
        url: '/index.php?page=post&s=list&tags=test%20score%3A%3E%3D100',
        store: { steamy34_pinned: { score: '100', scoreOp: '>=' } }
    }, async (w, d) => {
        const pin = d.querySelector('.s34-sb-filter.s34-pinned .s34-pin.s34-on');
        if (!pin) return { fail: 'no pinned filter' };
        const text = w.getComputedStyle(pin, '::before').content;
        const name = pin.closest('.s34-sb-filter-top').querySelector('span');
        const nameAfter = w.getComputedStyle(name, '::after').content;
        return text === '"pinned"' && (nameAfter === 'none' || nameAfter === 'normal') ? { label: text } : { fail: JSON.stringify({ text, nameAfter }) };
    });

    check('favourited heart is red (the drawn shape, not just the button)', { store: { steamy34_favs: { 101: 1 } } }, async (w, d) => {
        const path = d.querySelector('#s101 .s34-fav-btn.s34-faved svg path');
        const plain = d.querySelector('#s102 .s34-fav-btn svg path');
        if (!path || !plain) return { fail: 'no heart' };
        const fav = w.getComputedStyle(path), p = w.getComputedStyle(plain);
        const red = c => { const m = c.match(/\d+/g).map(Number); return m[0] > 200 && m[1] < 140 && m[2] < 150; };
        if (!red(fav.fill) || !red(fav.stroke)) return { fail: 'favourited heart drawn ' + fav.fill + ' / ' + fav.stroke };
        if (p.fill !== 'none') return { fail: 'normal heart is filled: ' + p.fill };
        return { faved: fav.fill, normal: 'outline ' + p.stroke };
    });

    check('popup opens, browse with arrows', { store: { steamy34_settings: { browseKeys: 'arrows' } } }, async (w, d) => {
        d.querySelector('#s103 a').click(); await wait(700);
        const seq = [curPost(d)];
        key(d, 'ArrowRight', 'ArrowRight'); await wait(600); seq.push(curPost(d));
        key(d, 'd', 'KeyD'); await wait(600); seq.push(curPost(d));
        key(d, 'ArrowLeft', 'ArrowLeft'); await wait(600); seq.push(curPost(d));
        const s = seq.join('→');
        return s === '103→104→104→103' ? { seq: s } : { fail: 'got ' + s };
    });

    check('popup WASD + W/S scroll', { store: { steamy34_settings: { browseKeys: 'wasd' } } }, async (w, d) => {
        d.querySelector('#s103 a').click(); await wait(700);
        const seq = [curPost(d)];
        key(d, 'd', 'KeyD'); await wait(600); seq.push(curPost(d));
        key(d, 'ArrowRight', 'ArrowRight'); await wait(600); seq.push(curPost(d));
        key(d, 'a', 'KeyA'); await wait(600); seq.push(curPost(d));
        key(d, 'd', 'KeyD', { ctrlKey: true }); await wait(400); seq.push(curPost(d));
        const s = seq.join('→');
        // W / S: must not throw and must not browse
        key(d, 's', 'KeyS'); await wait(300); key(d, 'w', 'KeyW'); await wait(300);
        if (curPost(d) !== '103') return { fail: 'W/S changed the post' };
        return s === '103→104→104→103→103' ? { seq: s } : { fail: 'got ' + s };
    });

    check('popup F / C / T keys', {}, async (w, d) => {
        d.querySelector('#s101 a').click(); await wait(700);
        const ov = d.querySelector('.s34-pv-overlay');
        const before = ov.classList.contains('s34-pv-theater');
        key(d, 't', 'KeyT'); await wait(300);
        const theater = ov.classList.contains('s34-pv-theater') !== before;
        key(d, 'c', 'KeyC'); await wait(300);
        const menu = !!d.querySelector('.s34-cmenu');
        const titleHasKey = /\(T\)/.test(ov.querySelector('[data-act="theater"]').title);
        return theater && menu && titleHasKey ? { theater, collectMenu: menu } : { fail: `theater ${theater}, collect menu ${menu}, tooltip ${titleHasKey}` };
    });

    // ---- Keyboard: every key in the popup ----
    const saves = w => w.__log.filter(l => /^SAVE /.test(l)).length;
    const openPost = async (d, id) => { d.querySelector('#s' + (id || 101) + ' a').click(); await wait(800); };
    check('keys: B downloads in the popup', {}, async (w, d) => {
        await openPost(d);
        w.__log.length = 0;
        key(d, 'b', 'KeyB'); await wait(1500);
        key(d, 'b', 'KeyB', { repeat: true }); await wait(300);       // held key: no second file
        key(d, 'b', 'KeyB', { ctrlKey: true }); await wait(300);      // Ctrl+B stays the browser's
        return saves(w) === 1 ? { saved: 1 } : { fail: 'files saved: ' + saves(w) };
    });
    check('keys: a changed download key', { store: { steamy34_settings: { downloadKey: 'KeyK' } } }, async (w, d) => {
        await openPost(d);
        w.__log.length = 0;
        key(d, 'b', 'KeyB'); await wait(800);
        const withB = saves(w);
        key(d, 'k', 'KeyK'); await wait(1500);
        return withB === 0 && saves(w) === 1 ? { key: 'K' } : { fail: `B saved ${withB}, K saved ${saves(w) - withB}` };
    });
    check('keys: download key D wins over WASD', { store: { steamy34_settings: { downloadKey: 'KeyD', browseKeys: 'wasd' } } }, async (w, d) => {
        await openPost(d, 103);
        w.__log.length = 0;
        key(d, 'd', 'KeyD'); await wait(1500);
        return saves(w) === 1 && curPost(d) === '103' ? {} : { fail: `saved ${saves(w)}, post ${curPost(d)}` };
    });
    check('keys: F favourites', {}, async (w, d) => {
        await openPost(d);
        key(d, 'f', 'KeyF'); await wait(800);
        const favs = w.__store.steamy34_favs || {};
        const red = d.querySelector('#s101 .s34-fav-btn.s34-faved');
        return favs[101] && red ? { toast: toasts(d).pop() } : { fail: JSON.stringify({ favs, heartOnThumb: !!red, toasts: toasts(d) }) };
    });
    check('keys: changed F / C / T keys', { store: { steamy34_settings: { favKey: 'KeyQ', collectKey: 'KeyE', theaterKey: 'KeyR' } } }, async (w, d) => {
        await openPost(d);
        const ov = d.querySelector('.s34-pv-overlay');
        key(d, 'f', 'KeyF'); key(d, 't', 'KeyT'); key(d, 'c', 'KeyC'); await wait(500);
        const oldKeysDid = !!(w.__store.steamy34_favs || {})[101] || ov.classList.contains('s34-pv-theater') || !!d.querySelector('.s34-cmenu');
        key(d, 'r', 'KeyR'); await wait(300);
        const theater = ov.classList.contains('s34-pv-theater');
        key(d, 'q', 'KeyQ'); await wait(800);
        const fav = !!(w.__store.steamy34_favs || {})[101];
        key(d, 'e', 'KeyE'); await wait(300);
        const menu = !!d.querySelector('.s34-cmenu');
        return !oldKeysDid && theater && fav && menu ? { keys: 'Q fav · E collection · R theater' } : { fail: JSON.stringify({ oldKeysDid, theater, fav, menu }) };
    });
    check('keys: Esc and middle click close the popup', {}, async (w, d) => {
        await openPost(d);
        key(d, 'Escape', 'Escape'); await wait(400);
        const esc = !d.querySelector('.s34-pv-overlay');
        await openPost(d);
        const ov = d.querySelector('.s34-pv-overlay');
        ov.querySelector('.s34-pv-side').dispatchEvent(new w.MouseEvent('auxclick', { button: 1, bubbles: true, cancelable: true })); await wait(400);
        const middle = !d.querySelector('.s34-pv-overlay');
        return esc && middle ? {} : { fail: JSON.stringify({ esc, middle }) };
    });
    check('keys: typing in a text box triggers nothing', {}, async (w, d) => {
        await openPost(d, 103);
        w.__log.length = 0;
        const box = d.querySelector('.s34-sb-input');
        ['KeyB', 'KeyF', 'KeyT', 'ArrowRight'].forEach(c => box.dispatchEvent(new KeyboardEvent('keydown', { key: c.replace('Key', '').toLowerCase(), code: c, bubbles: true })));
        await wait(1000);
        const ov = d.querySelector('.s34-pv-overlay');
        const bad = { saved: saves(w), fav: !!(w.__store.steamy34_favs || {})[103], theater: ov.classList.contains('s34-pv-theater'), post: curPost(d) };
        return !bad.saved && !bad.fav && !bad.theater && bad.post === '103' ? {} : { fail: JSON.stringify(bad) };
    });
    check('keys: keys wait while Settings are open', {}, async (w, d) => {
        await openPost(d, 103);
        w.__log.length = 0;
        d.querySelector('.s34-gear').click(); await wait(300);
        key(d, 'b', 'KeyB'); key(d, 'ArrowRight', 'ArrowRight'); await wait(900);
        const settingsOpen = !!d.querySelector('.s34-set');
        return settingsOpen && !saves(w) && curPost(d) === '103' ? {} : { fail: JSON.stringify({ settingsOpen, saved: saves(w), post: curPost(d) }) };
    });

    // ---- Your history survives updates ----
    const OLD_VIEWED = { 11: 1700000000000, 12: 1700000001000, 13: 1700000002000 };
    const OLD_DLS = { 21: 1700000000000, 22: 1700000003000 };
    check('update keeps viewed + downloaded posts', {
        store: { steamy34_viewed: OLD_VIEWED, steamy34_downloaded: OLD_DLS, steamy34_changelog_seen: 'Beta 2.5', steamy34_tips_seen: 8,
                 steamy34_settings: { thumbExtras: 'on' } }
    }, async (w, d) => {
        await wait(1700);
        if (!d.querySelector('.s34-cl-overlay')) return { fail: 'no "What\'s new" - the update was not noticed' };
        key(d, 'Escape', 'Escape'); await wait(300);
        if (d.querySelector('.s34-cl-overlay')) return { fail: '"What\'s new" did not close with Esc' };
        await openPost(d, 103);
        key(d, 'b', 'KeyB'); await wait(1500);
        key(d, 'Escape', 'Escape'); await wait(2000);               // viewed list is saved 1.5 s later
        const v = w.__store.steamy34_viewed || {}, dl = w.__store.steamy34_downloaded || {};
        const keptV = Object.keys(OLD_VIEWED).every(k => v[k] === OLD_VIEWED[k]), keptD = Object.keys(OLD_DLS).every(k => dl[k] === OLD_DLS[k]);
        return keptV && keptD && v[103] && dl[103] ? { viewed: Object.keys(v).length, downloaded: Object.keys(dl).length } : { fail: JSON.stringify({ keptV, keptD, v, dl }) };
    });
    check('a storage hiccup never wipes the history', { store: { steamy34_viewed: OLD_VIEWED, steamy34_downloaded: OLD_DLS } }, async (w, d) => {
        w.__failRead = ['steamy34_viewed', 'steamy34_downloaded'];
        await openPost(d, 103);
        key(d, 'b', 'KeyB'); await wait(1500);
        key(d, 'Escape', 'Escape'); await wait(2000);
        w.__failRead = [];
        const v = w.__store.steamy34_viewed || {}, dl = w.__store.steamy34_downloaded || {};
        // nothing old may be lost (new entries saved after the hiccup are fine)
        const keptV = Object.keys(OLD_VIEWED).every(k => v[k] === OLD_VIEWED[k]), keptD = Object.keys(OLD_DLS).every(k => dl[k] === OLD_DLS[k]);
        return keptV && keptD ? { viewed: Object.keys(v).length, downloaded: Object.keys(dl).length } : { fail: JSON.stringify({ v, dl }) };
    });

    // ---- Screenshot mode: X blurs every picture ----
    const blurred = (w, el) => !!el && /blur/.test(w.getComputedStyle(el).filter);
    check('screenshot mode: X blurs thumbnails and the popup', {}, async (w, d) => {
        key(d, 'x', 'KeyX'); await wait(200);
        const thumb = blurred(w, d.querySelector('#s101 img'));
        const label = !!d.querySelector('.s34-sfw-label'), stored = w.__store.steamy34_sfw === true;
        const swEl = d.querySelector('.s34-q-sfw input'), sw = { checked: !!swEl && swEl.checked };
        await openPost(d, 101);
        const media = d.querySelector('.s34-pv-stage img, .s34-pv-stage video');
        const popup = blurred(w, media);
        const logoSharp = !blurred(w, d.querySelector('.s34-brand img'));
        key(d, 'x', 'KeyX'); await wait(200);                        // works in the popup too
        const off = !d.documentElement.classList.contains('s34-sfw') && !blurred(w, d.querySelector('#s101 img')) && !d.querySelector('.s34-sfw-label');
        const ok = thumb && label && stored && sw && sw.checked && popup && logoSharp && off;
        return ok ? {} : { fail: JSON.stringify({ thumb, label, stored, switchOn: sw && sw.checked, popup, media: media && media.tagName, logoSharp, off }) };
    });
    check('screenshot mode: stays on after a reload, switch works', { store: { steamy34_sfw: true } }, async (w, d) => {
        const on = d.documentElement.classList.contains('s34-sfw') && blurred(w, d.querySelector('#s102 img')) && !!d.querySelector('.s34-sfw-label');
        const sw = d.querySelector('.s34-q-sfw input');
        if (!on || !sw || !sw.checked) return { fail: JSON.stringify({ on, switchChecked: sw && sw.checked }) };
        sw.click(); await wait(200);
        return !d.documentElement.classList.contains('s34-sfw') && w.__store.steamy34_sfw === false ? {} : { fail: 'switch did not turn it off' };
    });
    check('screenshot mode: typing an x in the search box does nothing', {}, async (w, d) => {
        d.querySelector('.s34-sb-input').dispatchEvent(new KeyboardEvent('keydown', { key: 'x', code: 'KeyX', bubbles: true })); await wait(200);
        return !d.documentElement.classList.contains('s34-sfw') ? {} : { fail: 'turned on while typing' };
    });

    // ---- Following pages: pinned filters are paused, and that's explained ----
    check('feed page: paused pins are explained and kept', {
        url: '/index.php?page=post&s=list&tags=someartist#s34-following=someartist',
        store: { steamy34_pinned: { score: '100', scoreOp: '>=' }, steamy34_following: { artists: [{ tag: 'someartist', added: 1, seen: 105, latest: 0, count: 0, more: false }], checkedAt: Date.now() } }
    }, async (w, d) => {
        const note = d.querySelector('.s34-pins-note');
        const paused = !!d.querySelector('.s34-sb.s34-pins-paused');
        const sel = d.querySelector('.s34-sb-filter.s34-pinned select');
        if (sel) { sel.value = ''; sel.dispatchEvent(new w.Event('change', { bubbles: true })); await wait(100); }
        const kept = (w.__store.steamy34_pinned || {}).score === '100';
        return note && /paused/.test(note.textContent) && paused && kept ? { note: note.textContent.slice(0, 60) + '…' } : { fail: JSON.stringify({ note: !!note, paused, kept }) };
    });
    // (the address already has the pin - otherwise the page reloads itself to add it)
    check('normal page: no paused note', { url: '/index.php?page=post&s=list&tags=test%20score%3A%3E%3D100', store: { steamy34_pinned: { score: '100', scoreOp: '>=' } } }, async (w, d) => {
        return !d.querySelector('.s34-pins-note') && !d.querySelector('.s34-pins-paused') ? {} : { fail: 'note shown on a normal search' };
    });

    // ---- Ads: the ad blocker always acts first, Steamy34 never hides an ad ----
    const adCol = d => d.querySelector('.postListSidebarRight').parentElement;
    const fakeAd = (d, el) => { const f = d.createElement('iframe'); f.style.cssText = 'width:160px;height:600px;border:0'; el.appendChild(f); };
    check('ads: empty column folds only after the page has loaded', { adCol: true, blocker: true }, async (w, d) => {
        const early = d.documentElement.classList.contains('s34-adcol-early') || adCol(d).classList.contains('s34-empty-col');
        await wait(4000);
        const folded = adCol(d).classList.contains('s34-empty-col');
        return !early && folded ? {} : { fail: JSON.stringify({ hiddenEarly: early, foldedLater: folded }) };
    });
    check('ads: an ad the blocker missed is never hidden', { adCol: true, blocker: true, store: { steamy34_adblock_seen: true } }, async (w, d) => {
        fakeAd(d, d.querySelector('.postListSidebarRight ins'));     // loads a bit late
        await wait(4000);
        const col = adCol(d), shown = !col.classList.contains('s34-empty-col') && col.getBoundingClientRect().width > 100 && !d.documentElement.classList.contains('s34-adcol-early');
        return shown ? {} : { fail: 'the ad column was hidden' };
    });
    check('ads: an ad arriving after the fold brings the column back', { adCol: true, blocker: true }, async (w, d) => {
        await wait(4000);
        if (!adCol(d).classList.contains('s34-empty-col')) return { fail: 'not folded first' };
        fakeAd(d, d.querySelector('.postListSidebarRight ins')); await wait(300);
        return !adCol(d).classList.contains('s34-empty-col') ? {} : { fail: 'still hidden with an ad in it' };
    });
    check('ads: no ad blocker = column untouched', { adCol: true, store: { steamy34_adblock_seen: true } }, async (w, d) => {
        await wait(4000);
        const touched = adCol(d).classList.contains('s34-empty-col') || d.documentElement.classList.contains('s34-adcol-early');
        return !touched ? {} : { fail: 'the column was hidden without an ad blocker' };
    });
    check('ads: sidebar ad slots below the tags stay', {}, async (w, d) => {
        const list = d.querySelector('#tag-sidebar');
        const slot = d.createElement('span'); slot.innerHTML = '<ins class="eas6a97888e38" data-zoneid="1"></ins>';
        const banner = d.createElement('div'); banner.innerHTML = '<a href="https://ads.example/x"><img src="/thumbnails/1/banner.jpg" width="160" height="60"></a>';
        const mascot = d.createElement('img'); mascot.src = '/thumbnails/1/mascot.png';
        list.after(slot, banner, mascot);
        await wait(2600); // the tidy-up runs again 2 s after start
        const hidden = el => el.classList.contains('s34-hidden');
        return !hidden(slot) && !hidden(banner) && hidden(mascot) ? { kept: 'ad slot + outside banner', tidied: 'site mascot' } : { fail: JSON.stringify({ slot: hidden(slot), banner: hidden(banner), mascot: hidden(mascot) }) };
    });

    // ---- Phone: popup gestures ----
    const swipe = (w, el, dx, dy) => {
        const r = el.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + Math.min(120, r.height / 2);
        const t = (cx, cy) => new w.Touch({ identifier: 1, target: el, clientX: cx, clientY: cy });
        el.dispatchEvent(new w.TouchEvent('touchstart', { touches: [t(x, y)], changedTouches: [t(x, y)], bubbles: true }));
        el.dispatchEvent(new w.TouchEvent('touchend', { touches: [], changedTouches: [t(x + dx, y + dy)], bubbles: true }));
    };
    check('phone: swipe to browse, swipe down closes', { width: 390 }, async (w, d) => {
        await openPost(d, 103);
        const stage = () => d.querySelector('.s34-pv-stage');
        const seq = [curPost(d)];
        swipe(w, stage(), -150, 0); await wait(700); seq.push(curPost(d));
        swipe(w, stage(), 150, 0); await wait(700); seq.push(curPost(d));
        swipe(w, stage(), 0, 200); await wait(500);
        const closed = !d.querySelector('.s34-pv-overlay');
        const s = seq.join('→');
        return s === '103→104→103' && closed ? { seq: s } : { fail: JSON.stringify({ seq: s, closed }) };
    });
    check('phone: Back closes the popup', { width: 390 }, async (w, d) => {
        await openPost(d);
        w.history.back(); await wait(700);
        return !d.querySelector('.s34-pv-overlay') ? {} : { fail: 'still open after Back' };
    });
    check('phone: popup fits the screen, bell on the artist', { width: 390 }, async (w, d) => {
        await openPost(d);
        const ov = d.querySelector('.s34-pv-overlay');
        const tooWide = Array.from(ov.querySelectorAll('*')).filter(el => el.getBoundingClientRect().right > w.innerWidth + 2 && el.getClientRects().length && !el.closest('.s34-pv-stage')).map(el => el.className).slice(0, 4);
        const bell = ov.querySelector('.s34-chip-artist .s34-chip-follow svg.s34-bell');
        const bb = bell && bell.getBoundingClientRect();
        return !tooWide.length && bell && bb.width >= 12 ? { bell: Math.round(bb.width) + 'px' } : { fail: JSON.stringify({ tooWide, bell: !!bell }) };
    });

    check('download name + no Tampermonkey downloader', {}, async (w, d) => {
        d.querySelector('#s101 a').click(); await wait(700);
        w.__log.length = 0;
        d.querySelector('.s34-pv-overlay .s34-dl-btn').click(); await wait(1500);
        const xhr = w.__log.filter(l => /XHR https:\/\/wimg/.test(l)).length;
        const gm = w.__log.filter(l => /GM_download/.test(l)).length;
        const saved = w.__log.filter(l => /^SAVE /.test(l)).map(l => l.slice(5));
        const name = toasts(d).find(t => /^Downloading/.test(t)) || '';
        return xhr === 1 && gm === 0 && saved.length === 1 && /\[.*\]/.test(saved[0]) ? { file: saved[0] } : { fail: `xhr ${xhr}, GM_download ${gm}, saved ${JSON.stringify(saved)}, toast "${name}"` };
    });

    check('download folder (fake picker)', {}, async (w, d) => {
        class FakeDir {
            constructor() { this.name = 'SteamyArchive'; this.files = {}; }
            async queryPermission() { return 'granted'; }
            async requestPermission() { return 'granted'; }
            async getFileHandle(n, o) {
                if (n in this.files) return {};
                if (!o || !o.create) { const e = new Error('nf'); e.name = 'NotFoundError'; throw e; }
                const self = this;
                return { async createWritable() { return { async write(b) { self.files[n] = b.size; }, async close() {} }; } };
            }
        }
        const fake = new FakeDir();
        w.showDirectoryPicker = async () => fake;
        d.querySelector('.s34-gear').click(); await wait(300);
        d.querySelector('.s34-set-nav [data-sec="downloads"]').click(); await wait(150);
        const btn = d.getElementById('s34-set-dlFolder');
        if (!btn) return { fail: 'no Choose folder button (picker treated as unavailable – phonemock ran before the fake? re-run)' };
        btn.click(); await wait(400);
        d.querySelector('.s34-set [data-act="cancel"]').click(); await wait(200);
        d.querySelector('#s101 a').click(); await wait(700);
        d.querySelector('.s34-pv-overlay .s34-dl-btn').click(); await wait(1500);
        const files = Object.keys(fake.files);
        return files.length === 1 ? { file: files[0] } : { fail: 'files written: ' + files.length };
    });

    check('settings search', {}, async (w, d) => {
        d.querySelector('.s34-gear').click(); await wait(300);
        const box = d.querySelector('.s34-set-search');
        box.value = 'theater key'; box.dispatchEvent(new Event('input')); await wait(100);
        const hits = Array.from(d.querySelectorAll('.s34-set-hit-btn span')).map(s => s.textContent);
        box.value = 'zzzz nothing'; box.dispatchEvent(new Event('input')); await wait(100);
        const none = !!d.querySelector('.s34-set-nohit');
        box.value = 'unload'; box.dispatchEvent(new Event('input')); await wait(100);
        d.querySelector('.s34-set-hit-btn').click(); await wait(200);
        const row = d.querySelector('.s34-set-row[data-key="cleanupFarPages"]');
        const jumped = row && row.offsetParent !== null && row.classList.contains('s34-set-flash');
        box.focus();
        box.value = 'backup'; box.dispatchEvent(new Event('input')); await wait(100);
        const backup = Array.from(d.querySelectorAll('.s34-set-hit-btn span')).some(s => /backup/i.test(s.textContent));
        key(d, 'Escape', 'Escape'); await wait(100);   // first Esc only clears the search
        const stillOpen = !!d.querySelector('.s34-set') && box.value === '';
        const ok = hits.includes('Theater mode key') && none && jumped && backup && stillOpen;
        return ok ? { hits } : { fail: JSON.stringify({ hits, none, jumped, backup, stillOpen }) };
    });

    check('batch download panel: progress, pause, cancel', {}, async (w, d) => {
        d.querySelector('.s34-q-select').click(); await wait(200);
        ['#s101', '#s102', '#s103', '#s104'].forEach(s => d.querySelector(s + ' a').click());
        await wait(100);
        const go = d.querySelector('[data-act="go"]');
        if (!go) return { fail: 'no batch bar' };
        go.click(); await wait(400);
        const panel = d.querySelector('.s34-dlp');
        if (!panel) return { fail: 'no panel' };
        await wait(1200);
        panel.querySelector('[data-a="pause"]').click();
        const pausedText = panel.querySelector('[data-a="pause"]').textContent;
        const c1 = panel.querySelector('.s34-dlp-count').textContent;
        await wait(3500);
        const c2 = panel.querySelector('.s34-dlp-count').textContent;
        panel.querySelector('[data-a="cancel"]').click();
        await wait(2500);
        const head = panel.querySelector('b').textContent;
        const ok = pausedText === 'Resume' && /stopped/i.test(head) && c2.split('/')[0] - c1.split('/')[0] <= 1;
        return ok ? { counts: c1 + ' → ' + c2, head } : { fail: JSON.stringify({ pausedText, c1, c2, head }) };
    });

    check('phone: search button + menu', { width: 390 }, async (w, d) => {
        const btn = d.querySelector('.s34-sb-submit');
        const visible = btn && w.getComputedStyle(btn).display !== 'none' && btn.getBoundingClientRect().height > 0;
        const menu = !!d.querySelector('.s34-menu-btn');
        return visible && menu ? { button: btn.tagName } : { fail: `search button ${!!visible}, menu ${menu}` };
    });

    check('phone without the site\'s search button', { width: 390, removeSubmit: true }, async (w, d) => {
        const btn = d.querySelector('.s34-sb-submit');
        if (!btn) return { fail: 'no button' };
        let submitted = null;
        const form = d.querySelector('.tag-search form');
        form.addEventListener('submit', e => { e.preventDefault(); submitted = new w.FormData(form).get('tags'); });
        btn.click(); await wait(200);
        return submitted === 'test' ? { submitted } : { fail: 'searched for ' + submitted };
    });

    check('welcome tour on first start', { store: { steamy34_tips_seen: 0, steamy34_changelog_seen: null, steamy34_welcome_seen: 0 } }, async (w, d) => {
        await wait(1700);
        const ov = d.querySelector('.s34-wel-overlay');
        if (!ov) return { fail: 'tour did not open' + (d.querySelector('.s34-overlay') ? ' (another window: ' + d.querySelector('.s34-overlay').className + ')' : '') };
        const titles = [];
        const title = () => ov.querySelector('.s34-wel-hero h3').textContent;
        titles.push(title());
        key(d, 'ArrowRight', 'ArrowRight'); await wait(150); titles.push(title());
        key(d, 'ArrowLeft', 'ArrowLeft'); await wait(150); titles.push(title());
        // Short tour: 4 dots, the 4th slide ends it ("Let's go!") or goes on with "Show me more"
        const shortDots = ov.querySelectorAll('.s34-wel-dots button').length;
        ov.querySelectorAll('.s34-wel-dots button')[3].click(); await wait(150);
        const shortEnd = ov.querySelector('.s34-wel-next').textContent;
        const more = ov.querySelector('.s34-wel-more');
        if (shortDots !== 4 || shortEnd !== 'Let\'s go!' || !more || more.hidden) return { fail: 'short tour: ' + JSON.stringify({ shortDots, shortEnd, more: more && !more.hidden }) };
        more.click(); await wait(150);
        if (ov.querySelectorAll('.s34-wel-dots button').length !== 7) return { fail: 'after "Show me more": ' + ov.querySelectorAll('.s34-wel-dots button').length + ' dots' };
        // Thumbnails slide: two pickers (style 3, corners 2), current ones marked
        ov.querySelectorAll('.s34-wel-dots button')[5].click(); await wait(150);
        const thumbSlide = ov.querySelector('.s34-wel-hero h3').textContent;
        const rows = Array.from(ov.querySelectorAll('.s34-wel-themes')).map(r => r.querySelectorAll('button').length + (r.querySelector('.s34-on') ? '*' : '')).join(',');
        if (thumbSlide !== 'Thumbnails your way' || rows !== '3*,2*') return { fail: 'thumbnails slide: ' + thumbSlide + ' ' + rows };
        ov.querySelectorAll('.s34-wel-dots button')[6].click(); await wait(150);
        const last = title();
        const themes = ov.querySelectorAll('.s34-wel-themes button').length;
        const nextText = ov.querySelector('.s34-wel-next').textContent;
        const overflow = ov.querySelector('.s34-win').scrollWidth > ov.querySelector('.s34-win').clientWidth + 2;
        ov.querySelector('.s34-wel-next').click(); await wait(150);
        const closed = !d.querySelector('.s34-wel-overlay');
        const st = w.__store;
        const marked = st.steamy34_welcome_seen === 1 && st.steamy34_tips_seen >= 1 && !!st.steamy34_changelog_seen;
        await wait(1500);
        const extra = d.querySelector('.s34-overlay');
        const ok = titles[0] === 'Hi! This is Steamy34' && titles[1] !== titles[0] && titles[2] === titles[0] && last === 'Pick your look'
            && themes === 3 && nextText === 'Let\'s go!' && !overflow && closed && marked && !extra;
        return ok ? { slides: titles.slice(0, 2).concat(last).join(' | ') } : { fail: JSON.stringify({ titles, last, themes, nextText, overflow, closed, marked, extra: extra && extra.className }) };
    });

    check('welcome tour on a phone', { width: 390, store: { steamy34_tips_seen: 0, steamy34_changelog_seen: null } }, async (w, d) => {
        await wait(1700);
        const ov = d.querySelector('.s34-wel-overlay');
        if (!ov) return { fail: 'tour did not open' };
        ov.querySelector('.s34-wel-next').click(); await wait(150);
        const card = ov.querySelector('.s34-wel-card > div:last-child span').textContent;
        const cols = w.getComputedStyle(ov.querySelector('.s34-wel-cards')).gridTemplateColumns.split(' ').length;
        const win = ov.querySelector('.s34-win');
        const fits = win.getBoundingClientRect().right <= w.innerWidth + 1 && win.scrollWidth <= win.clientWidth + 2;
        return /Swipe/.test(card) && cols === 1 && fits ? { card } : { fail: JSON.stringify({ card, cols, fits }) };
    });

    check('update shows What\'s new with a tour button', { store: { steamy34_tips_seen: 8, steamy34_changelog_seen: 'Beta 1.9' } }, async (w, d) => {
        await wait(1700);
        const cl = d.querySelector('.s34-cl-overlay');
        if (!cl) return { fail: 'no What\'s new window' };
        const top = cl.querySelector('.s34-cl-head b').textContent;
        cl.querySelector('.s34-cl-tour').click(); await wait(200);
        const tour = !!d.querySelector('.s34-wel-overlay') && !d.querySelector('.s34-cl-overlay');
        return tour ? { top } : { fail: 'tour button did not open the tour' };
    });

    check('settings footer: Welcome tour button', {}, async (w, d) => {
        d.querySelector('.s34-gear').click(); await wait(300);
        const b = d.querySelector('.s34-set-foot [data-act="welcome"]');
        if (!b || !b.getClientRects().length) return { fail: 'no visible button in the settings footer' };
        b.click(); await wait(200);
        return d.querySelector('.s34-wel-overlay') ? {} : { fail: 'tour did not open' };
    });

    check('square corners', { store: { steamy34_settings: { roundCorners: false, thumbExtras: 'below' } } }, async (w, d) => {
        const rad = el => el ? w.getComputedStyle(el).borderTopLeftRadius : 'missing';
        const round = {
            thumb: rad(d.querySelector('span.thumb')), chip: rad(d.querySelector('.s34-chip')), heart: rad(d.querySelector('.s34-fav-btn')),
            searchBox: rad(d.querySelector('.s34-sb-box')), settingsBtn: rad(d.querySelector('.s34-gear'))
        };
        d.querySelector('.s34-gear').click(); await wait(300);
        round.settingsWindow = rad(d.querySelector('.s34-set'));
        const bad = Object.keys(round).filter(k => round[k] !== '0px');
        return bad.length ? { fail: JSON.stringify(round) } : { ok: 'all square' };
    });

    check('defaults: square corners + clean thumbnails', {}, async (w, d) => {
        const r = w.getComputedStyle(d.querySelector('span.thumb')).borderTopLeftRadius;
        const html = d.documentElement.className;
        return r === '0px' && /s34-tx-hover/.test(html) && /s34-square/.test(html) ? { ok: html } : { fail: r + ' / ' + html };
    });

    check('rounded corners when switched on', { store: { steamy34_settings: { roundCorners: true } } }, async (w, d) => {
        const r = w.getComputedStyle(d.querySelector('span.thumb')).borderTopLeftRadius;
        return r !== '0px' ? { thumb: r } : { fail: 'thumb is square' };
    });

    // ---- Little one-time tips ----
    const hintText = d => { const h = d.querySelector('.s34-hint'); return h ? h.textContent : null; };
    check('tips: first popup shows one, only once', { store: { steamy34_hints_seen: {} } }, async (w, d) => {
        d.querySelector('#s101 a').click(); await wait(1400);
        const first = hintText(d);
        if (!first || !/next \/ previous post/.test(first)) return { fail: 'no popup tip: ' + first };
        const seen = w.__store.steamy34_hints_seen || {};
        if (!seen.popup) return { fail: 'not remembered as seen' };
        d.querySelector('.s34-hint .s34-hint-ok').click(); await wait(300);
        key(d, 'Escape', 'Escape'); await wait(300);
        d.querySelector('#s103 a').click(); await wait(1400);
        return hintText(d) ? { fail: 'a second tip on the same page: ' + hintText(d) } : { tip: first.slice(0, 60) };
    });
    check('tips: one already seen is never shown again', { store: { steamy34_hints_seen: { popup: 1 } } }, async (w, d) => {
        d.querySelector('#s101 a').click(); await wait(1400);
        return hintText(d) ? { fail: 'shown again: ' + hintText(d) } : {};
    });
    check('tips: a few minutes between tips', { store: { steamy34_hints_seen: {} } }, async (w, d) => {
        w.__store.steamy34_hints_seen = { _last: Date.now() - 60000 }; // a tip showed 1 minute ago
        d.querySelector('#s101 a').click(); await wait(1400);
        return hintText(d) ? { fail: 'shown within the gap' } : {};
    });
    check('tips: "No more tips" switches them off', { store: { steamy34_hints_seen: {} } }, async (w, d) => {
        d.querySelector('#s101 a').click(); await wait(1400);
        const off = d.querySelector('.s34-hint .s34-hint-off');
        if (!off) return { fail: 'no tip' };
        off.click(); await wait(300);
        const s = w.__store.steamy34_settings || {};
        return s.contextHints === false && !d.querySelector('.s34-hint') ? {} : { fail: JSON.stringify(s) };
    });
    check('tips: search box tip points at the box', { store: { steamy34_hints_seen: {} } }, async (w, d) => {
        const field = d.querySelector('.s34-sb-input');
        field.value = 'pan'; field.dispatchEvent(new w.Event('input', { bubbles: true })); await wait(300);
        const h = d.querySelector('.s34-hint');
        if (!h || !/bubble/.test(h.textContent)) return { fail: 'no search tip' };
        const hb = h.getBoundingClientRect(), fb = d.querySelector('.s34-sb-box').getBoundingClientRect();
        return hb.top >= fb.bottom - 1 || hb.bottom <= fb.top + 1 ? { at: Math.round(hb.top) + 'px' } : { fail: 'covers the search box' };
    });

    // ---- Followed artists ----
    const ART = (tag, extra) => Object.assign({ tag, added: 1, seen: 0, latest: 0, count: 0, more: false }, extra || {});
    const boxRows = d => Array.from(d.querySelectorAll('.s34-follow-box .s34-follow-row')).map(r => r.querySelector('span').textContent + (r.querySelector('small') ? ' [' + r.querySelector('small').textContent + ']' : ''));
    check('follow: bell only on artists in the popup', {}, async (w, d) => {
        d.querySelector('#s101 a').click(); await wait(1200);
        const star = d.querySelector('.s34-pv-chips .s34-chip-artist .s34-chip-follow');
        if (!star) return { fail: 'no bell on the artist tag in the popup' };
        if (d.querySelector('.s34-pv-chips .s34-chip:not(.s34-chip-artist) .s34-chip-follow')) return { fail: 'bell on a non-artist tag' };
        const outline = w.getComputedStyle(star.querySelector('svg path')).fill;
        star.click(); await wait(200);
        const tags = ((w.__store.steamy34_following || {}).artists || []).map(a => a.tag);
        const rows = boxRows(d);
        const filled = w.getComputedStyle(star.querySelector('svg path')).fill;
        const amber = /^rgb\((\d+), (\d+), (\d+)\)$/.exec(filled), box = w.getComputedStyle(star).backgroundColor;
        const looksRight = amber && +amber[1] > 200 && +amber[3] < 100 && /rgba\(0, 0, 0, 0\)|transparent/.test(box);
        if (tags.join() !== 'someartist' || !star.classList.contains('s34-following') || outline !== 'none' || !looksRight || rows.join() !== 'someartist') return { fail: JSON.stringify({ tags, outline, filled, box, rows }) };
        star.click(); await wait(200);
        const after = ((w.__store.steamy34_following || {}).artists || []).length;
        return after === 0 ? { followed: tags.join(), sidebar: rows.join(), thenUnfollowed: true } : { fail: 'unfollow left ' + after };
    });
    check('follow: sidebar lists artists with "N new", new first', {
        store: { steamy34_following: { artists: [ART('quiet_artist'), ART('someartist', { count: 4 }), ART('busy_artist', { count: 7, more: true })], checkedAt: Date.now() } }
    }, async (w, d) => {
        const rows = boxRows(d).join(' | ');
        const want = 'All artists [11+ new] | busy artist [7+ new] | someartist [4 new] | quiet artist';
        if (rows !== want) return { fail: rows };
        Array.from(d.querySelectorAll('.s34-follow-row')).find(r => r.dataset.fb === 'someartist').click(); await wait(1200);
        const href = decodeURIComponent(w.location.href);
        w.__log = w.__log || []; // the frame is a new page now
        return /tags=someartist#s34-following=someartist$/.test(href) ? { rows, opens: href.replace(/.*tags=/, '') } : { fail: 'went to ' + href };
    });
    check('artist page: bar, NEW marks, seen, no pins', {
        url: '/index.php?page=post&s=list&tags=someartist#s34-following=someartist',
        store: { steamy34_pinned: { score: '100' }, steamy34_following: { artists: [ART('someartist', { seen: 105, count: 3 })], checkedAt: Date.now() } }
    }, async (w, d) => {
        const bar = d.querySelector('.s34-feed-bar');
        if (!bar) return { fail: 'no bar' + (w.location.hash ? '' : ' (address lost its # - pins rewrote it?)') };
        const news = Array.from(d.querySelectorAll('span.thumb')).filter(t => t.querySelector('.s34-new-badge')).map(t => t.id).join(',');
        const a = w.__store.steamy34_following.artists[0];
        const rowOn = !!d.querySelector('.s34-follow-row.s34-on');
        const ok = news === 's106,s107,s108' && a.seen === 108 && a.count === 0 && rowOn && bar.querySelector('b').textContent === 'someartist';
        return ok ? { news, sub: bar.querySelector('.s34-feed-sub').textContent } : { fail: JSON.stringify({ news, seen: a.seen, count: a.count, rowOn, hash: w.location.hash }) };
    });
    check('artist page: a normal search for the artist counts as a visit', {
        url: '/index.php?page=post&s=list&tags=someartist#plain',
        store: { steamy34_following: { artists: [ART('someartist', { seen: 106, count: 2 })], checkedAt: Date.now() } }
    }, async (w, d) => {
        const news = Array.from(d.querySelectorAll('span.thumb')).filter(t => t.querySelector('.s34-new-badge')).map(t => t.id).join(',');
        const a = w.__store.steamy34_following.artists[0];
        return news === 's107,s108' && a.seen === 108 && a.count === 0 && !d.querySelector('.s34-feed-bar') ? { news } : { fail: JSON.stringify({ news, seen: a.seen, count: a.count, bar: !!d.querySelector('.s34-feed-bar') }) };
    });
    check('follow: Check now counts per artist', {
        store: { steamy34_following: { artists: [ART('someartist', { seen: 302 }), ART('feedtest', { seen: 305 })], checkedAt: Date.now() } }
    }, async (w, d) => {
        d.querySelector('.s34-follow-box [data-fb="manage"]').click(); await wait(300);
        const win = d.querySelector('.s34-follow-win');
        if (!win) return { fail: 'no Manage window' };
        const clear = win.querySelector('[data-a="seen"]');
        const shownBefore = !!clear.getClientRects().length;          // nothing new yet: hidden
        win.querySelector('[data-a="check"]').click(); await wait(2500);
        const st = w.__store.steamy34_following.artists.map(a => a.tag + ':' + a.count).join(' ');
        const rows = boxRows(d).join(' | ');
        const shownAfter = !!clear.getClientRects().length && clear.textContent === 'Clear new counts';
        if (st !== 'someartist:2 feedtest:1' || rows !== 'All artists [3 new] | someartist [2 new] | feedtest [1 new]' || shownBefore || !shownAfter) return { fail: JSON.stringify({ st, rows, shownBefore, shownAfter }) };
        clear.click(); await wait(300);
        const cleared = w.__store.steamy34_following.artists.every(a => !a.count) && !clear.getClientRects().length && !d.querySelector('.s34-follow-box small.s34-has-new');
        return cleared ? { counts: st, rows, thenCleared: true } : { fail: 'Clear new counts did not clear' };
    });
    check('follow: first check starts counting from now', {
        store: { steamy34_following: { artists: [ART('someartist'), ART('nobody_here')], checkedAt: 0 } }
    }, async (w, d) => {
        d.querySelector('.s34-follow-box [data-fb="manage"]').click(); await wait(300);
        d.querySelector('.s34-follow-win [data-a="check"]').click(); await wait(2500);
        const st = w.__store.steamy34_following.artists.map(a => a.tag + ':' + a.seen + '/' + a.count).join(' ');
        return st === 'someartist:304/0 nobody_here:306/0' ? { st } : { fail: st };
    });
    check('follow: Manage adds by name, filter, unfollow', {
        store: { steamy34_following: { artists: [ART('someartist')], checkedAt: Date.now() } }
    }, async (w, d) => {
        d.querySelector('.s34-follow-box [data-fb="manage"]').click(); await wait(300);
        const win = d.querySelector('.s34-follow-win');
        win.querySelector('.s34-follow-input').value = 'Some Other Artist';
        win.querySelector('.s34-follow-addbtn').click(); await wait(200);
        const sel = win.querySelector('select[data-k="score"]'); sel.value = '50'; sel.dispatchEvent(new w.Event('change', { bubbles: true })); await wait(100);
        let st = w.__store.steamy34_following;
        const added = st.artists.map(a => a.tag).join(',');
        win.querySelector('.s34-follow-chip button').click(); await wait(200);
        st = w.__store.steamy34_following;
        const left = st.artists.map(a => a.tag).join(',');
        return added === 'someartist,some_other_artist' && st.filter.score === '50' && left === 'some_other_artist'
            ? { added, filter: 'score ≥ 50', left } : { fail: JSON.stringify({ added, filter: st.filter, left }) };
    });
    check('follow: Beta 2.9 follows keep only the artists', {
        store: { steamy34_following: { tags: [{ tag: 'someartist', type: 'artist' }, { tag: 'panam_palmer', type: 'character' }] } }
    }, async (w, d) => {
        const rows = boxRows(d).join(' | ');
        return rows === 'someartist' ? { rows } : { fail: rows };
    });
    check('follow: phone menu has the artists', { width: 390, store: { steamy34_following: { artists: [ART('someartist', { count: 1 })] } } }, async (w, d) => {
        const rows = Array.from(d.querySelectorAll('.s34-menu-tools .s34-follow-box .s34-follow-row')).length;
        return rows === 1 ? {} : { fail: 'rows in the ☰ menu: ' + rows };
    });
    check('follow: in Privacy & data', { store: { steamy34_following: { artists: [ART('someartist')] } } }, async (w, d) => {
        d.querySelector('.s34-gear').click(); await wait(300);
        d.querySelector('.s34-set-nav [data-sec="privacy"]').click(); await wait(150);
        const names = Array.from(d.querySelectorAll('.s34-privacy-name')).map(n => n.textContent);
        return names.includes('Following') && !names.includes('Saved searches') ? {} : { fail: 'Privacy & data shows: ' + names.join(', ') };
    });

    // ---- Followed searches (were "saved searches" until Beta 3.1) ----
    const SRC = (query, extra) => Object.assign({ query, name: query, added: 1, seen: 0, latest: 0, count: 0, more: false }, extra || {});
    const srows = d => Array.from(d.querySelectorAll('.s34-follow-box .s34-follow-srow')).map(r => r.querySelector('span').textContent + (r.querySelector('small') ? ' [' + r.querySelector('small').textContent + ']' : ''));
    check('follow search: the bell under the search box', {}, async (w, d) => {
        const b = d.querySelector('.s34-sb-follow');
        if (!b) return { fail: 'no bell under the search box' };
        const before = b.textContent.trim();
        b.click(); await wait(300);
        const s = ((w.__store.steamy34_following || {}).searches || [])[0];
        const after = b.textContent.trim(), rows = srows(d);
        if (before !== 'Follow' || after !== 'Following' || !s || s.query !== 'test' || s.seen !== 108 || rows.join() !== 'test') return { fail: JSON.stringify({ before, after, s, rows }) };
        b.click(); await wait(300);
        const left = ((w.__store.steamy34_following || {}).searches || []).length;
        return left === 0 && b.textContent.trim() === 'Follow' ? { followed: 'test (counting from post 108)', thenUnfollowed: true } : { fail: 'unfollow left ' + left };
    });
    check('follow search: old saved searches move over', {
        store: { steamy34_saved: [{ name: 'My test', query: 'foo bar', seenId: 103, newCount: 2, newMore: false }, { name: 'other', query: 'a b', seenId: 50 }] }
    }, async (w, d) => {
        const st = w.__store;
        const s = (st.steamy34_following || {}).searches || [];
        const rows = srows(d).join(' | ');
        const menuSaved = Array.from(d.querySelectorAll('.s34-sb-menu h5')).some(h => /saved/i.test(h.textContent));
        const btn = d.querySelector('[data-act="menu"]').textContent.trim();
        const ok = s.length === 2 && s[0].seen === 103 && s[0].count === 2 && !('steamy34_saved' in st) && rows === 'My test [2 new] | other' && !menuSaved && /Recent$/.test(btn);
        return ok ? { rows, menu: btn } : { fail: JSON.stringify({ s, oldKey: 'steamy34_saved' in st, rows, menuSaved, btn }) };
    });
    check('follow search: its page marks NEW and clears the count', {
        url: '/index.php?page=post&s=list&tags=test#s34-search=test',
        store: { steamy34_pinned: { score: '100' }, steamy34_following: { artists: [], searches: [SRC('test', { seen: 105, count: 3 })], checkedAt: Date.now() } }
    }, async (w, d) => {
        const bar = d.querySelector('.s34-feed-bar');
        const news = Array.from(d.querySelectorAll('span.thumb')).filter(t => t.querySelector('.s34-new-badge')).map(t => t.id).join(',');
        const s = w.__store.steamy34_following.searches[0];
        const pills = Array.from(d.querySelectorAll('.s34-sb-pills .s34-pill, .s34-sb-pills > *')).map(p => p.textContent.replace('×', '').trim()).filter(Boolean).join(' ');
        const rowOn = !!d.querySelector('.s34-follow-srow.s34-on');
        const ok = bar && bar.querySelector('.s34-feed-q').textContent === 'test' && news === 's106,s107,s108' && s.seen === 108 && s.count === 0 && rowOn && pills === 'test' && /#s34-search=test$/.test(w.location.href);
        return ok ? { news, box: pills } : { fail: JSON.stringify({ bar: !!bar, news, seen: s.seen, count: s.count, rowOn, pills, href: w.location.href }) };
    });
    check('follow search: a normal search for it counts as a visit', {
        url: '/index.php?page=post&s=list&tags=test#plain',
        store: { steamy34_following: { artists: [], searches: [SRC('test', { seen: 106, count: 2 })], checkedAt: Date.now() } }
    }, async (w, d) => {
        const news = Array.from(d.querySelectorAll('span.thumb')).filter(t => t.querySelector('.s34-new-badge')).map(t => t.id).join(',');
        const s = w.__store.steamy34_following.searches[0];
        return news === 's107,s108' && s.seen === 108 && s.count === 0 && !d.querySelector('.s34-feed-bar') ? { news } : { fail: JSON.stringify({ news, seen: s.seen, count: s.count }) };
    });
    check('follow search: Check now counts searches too', {
        // two artists -> one either/or search; the followed search is its own request
        store: { steamy34_following: { artists: [ART('someartist', { seen: 302 }), ART('nobody_here', { seen: 400 })], searches: [SRC('feedtest rating:explicit', { name: 'feedtest', seen: 305 })], checkedAt: Date.now() } }
    }, async (w, d) => {
        d.querySelector('.s34-follow-box [data-fb="manage"]').click(); await wait(300);
        const win = d.querySelector('.s34-follow-win');
        win.querySelector('[data-a="check"]').click(); await wait(4500);
        const f = w.__store.steamy34_following;
        const groups = Array.from(win.querySelectorAll('.s34-follow-group')).map(g => g.textContent).join(',');
        const sub = win.querySelector('.s34-win-sub, .s34-win-head small') ? win.querySelector('.s34-win-sub, .s34-win-head small').textContent : '';
        const ok = f.artists[0].count === 2 && f.searches[0].count === 1 && srows(d).join() === 'feedtest [1 new]' && groups === 'Artists,Searches';
        return ok ? { artist: 2, search: 1, sub } : { fail: JSON.stringify({ a: f.artists[0].count, s: f.searches[0].count, rows: srows(d), groups }) };
    });
    check('follow search: a one-word artist search is the artist', { store: { steamy34_following: { artists: [ART('someartist')], checkedAt: Date.now() } } }, async (w, d) => {
        d.querySelector('.s34-sb-clear').click(); await wait(100);
        const field = d.querySelector('.s34-sb-input');
        field.value = 'someartist '; field.dispatchEvent(new w.Event('input', { bubbles: true })); await wait(200);
        const b = d.querySelector('.s34-sb-follow');
        if (b.textContent.trim() !== 'Following') return { fail: 'bell says ' + b.textContent.trim() };
        b.click(); await wait(300);                                    // = unfollow the artist, no extra search
        const f = w.__store.steamy34_following;
        return !f.artists.length && !f.searches.length ? {} : { fail: JSON.stringify(f) };
    });

    check('settings: Help → Welcome tour', {}, async (w, d) => {
        d.querySelector('.s34-gear').click(); await wait(300);
        d.querySelector('.s34-set-nav [data-sec="help"]').click(); await wait(150);
        d.querySelector('.s34-set [data-act="welcome"]').click(); await wait(200);
        const open = !!d.querySelector('.s34-wel-overlay');
        key(d, 'Escape', 'Escape'); await wait(150);
        const tourClosed = !d.querySelector('.s34-wel-overlay');
        const settingsStill = !!d.querySelector('.s34-set');
        return open && tourClosed && settingsStill ? {} : { fail: JSON.stringify({ open, tourClosed, settingsStill }) };
    });

    window.__suite = async function (filter) {
        const themes = ['white', 'dark', 'oled'];
        const results = [];
        for (const c of CHECKS) {
            if (filter && !c.name.includes(filter)) continue;
            for (const theme of (c.name.startsWith('syntax') ? ['dark'] : themes)) {
                const { f, w, d } = await frame(c.opts.width || 1280, c.opts.url);
                let res;
                try {
                    const store = JSON.parse(JSON.stringify(c.opts.store || {}));
                    store.steamy34_settings = Object.assign({ theme }, store.steamy34_settings || {});
                    const run = w.__phone(theme, Object.assign({}, c.opts, { store })); // adCol, blocker… pass through
                    // __phone builds the page right away and runs the script after a fetch:
                    // remove the site's button in between (no waiting, or the script is faster)
                    if (c.opts.removeSubmit) d.querySelectorAll('input[type=submit]').forEach(i => i.remove());
                    await run;
                    res = await c.fn(w, d);
                    const p = problems(w);
                    if (!res || !res.fail) res = p.length ? { fail: 'errors: ' + p.join(' | ') } : res;
                } catch (e) {
                    res = { fail: 'threw: ' + e.message };
                }
                results.push(Object.assign({ check: c.name, theme, ok: !(res && res.fail) }, res));
                f.remove();
            }
        }
        const failed = results.filter(r => !r.ok);
        return { passed: results.length - failed.length, failed: failed.length, results: failed.length ? failed.concat(results.filter(r => r.ok).map(r => r.check + ' / ' + r.theme)) : results.map(r => r.check + ' / ' + r.theme + ' ✓') };
    };
})();
