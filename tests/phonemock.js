// Fake rule34 page (phone header when the window is narrow) + run Steamy34.
// window.__phone(theme, opts) ; window.__log collects GM_download / xhr / errors
window.__phone = async function (theme, opts = {}) {
    // Test downloads must never reach the browser (it would open a real "Save as"
    // window): links with a download name are only logged as "SAVE <name>".
    if (!HTMLAnchorElement.prototype.__s34NoSave) {
        const realClick = HTMLAnchorElement.prototype.click;
        HTMLAnchorElement.prototype.click = function () {
            if (this.hasAttribute('download')) { (window.__log || []).push('SAVE ' + this.download); return; }
            return realClick.call(this);
        };
        HTMLAnchorElement.prototype.__s34NoSave = true;
    }
    document.documentElement.className = '';
    document.querySelectorAll('style').forEach(s => s.remove());
    document.querySelectorAll('.s34-overlay, .s34-pv-overlay, .s34-menu-overlay, .s34-toasts').forEach(e => e.remove());
    if (!document.querySelector('meta[name=viewport]')) {
        const m = document.createElement('meta'); m.name = 'viewport'; m.content = 'width=device-width, initial-scale=1'; document.head.appendChild(m);
    }
    const siteCss = document.createElement('style');
    siteCss.textContent = `#header{height:70px;background:linear-gradient(90deg,#3a6,#9cf)}.tradio{position:absolute;left:-1px;top:-9px;width:26px;height:50px;opacity:0}
.tlabel{position:absolute;top:17px;width:30px;height:30px}.tfirst{left:238px}.tsecond{left:273px}.tlabel span{display:block;height:4px;margin:4px 3px;background:#222;border-radius:2px}
#navbar,#subnavbar{display:none}.logo{font:bold 22px sans-serif;color:#5af;padding:20px}
@media (min-width: 761px){.tlabel,.tradio{display:none}#navbar{display:flex;gap:6px;list-style:none}#post-list{display:flex}.sidebar{width:220px;flex:none}}
.sidebar{position:sticky;top:0}.tag-search{position:relative}#displayOptsLink{position:absolute;left:188px;top:13px;width:35px;height:36px}`;
    document.head.appendChild(siteCss);
    // Structure copied from a saved rule34.xxx posts page (2026-11-19), with
    // harmless placeholder tags: 4 menu labels, search box inside the site's
    // suggestion box, AI filter switch, empty ad slots, tag sidebar with
    // ? + - links, thumbs with "score:N rating:x" titles, "Go to page" box.
    const nav = ['My Account', 'Posts', 'Comments', 'Wiki', 'Aliases', 'Artists', 'Tags', 'Pools', 'Forum', 'Help']
        .map((t, i) => `<li${i === 1 ? ' class="current-page"' : ''}><a href="index.php?page=x${i}">${t}</a></li>`).join('')
        + '<li><a href="https://discord.example/" target="_blank" rel="noopener noreferrer">Discord</a></li>';
    const sub = ['Video', 'Upload', 'Random', 'About', 'Help'].map(t => `<li><a href="index.php?page=post&s=${t.toLowerCase()}">${t}</a></li>`).join('')
        + '<li><a href="mailto:staff@example.org">Contact Us</a></li>';
    // 102: video with the video tag, 105: video WITHOUT it (only the site's webm-thumb class)
    const thumbs = Array.from({ length: 8 }, (_, i) => {
        const id = 101 + i, vid = i === 1 || i === 4;
        const tags = ` 1girl someartist tag${i}${i === 1 ? ' animated sound video' : ''}${i === 4 ? ' animated' : ''} score:${40 + i} rating:explicit`;
        return `\n<span id="s${id}" class="thumb"><a id="p${id}" href="index.php?page=post&s=view&id=${id}&tags=test"><img src="/thumbnails/1/thumbnail_abc${i}.jpg" style="" alt="${tags}" border="0" title="${tags}" class="preview ${vid ? 'webm-thumb' : ''}"></a></span>`;
    }).join('');
    const tagLi = (type, tag, n) => `<li class="tag-type-${type}"><a href="index.php?page=wiki&s=list&search=${tag}">?</a> <a href="#" rel="nofollow">+</a> <a href="#" rel="nofollow">-</a> <a href="index.php?page=post&s=list&tags=${tag}">${tag.replace(/_/g, ' ')}</a> <span class="tag-count">${n}</span></li>`;
    const ad = z => `<span data-nosnippet=""><ins class="eas6a97888e38" data-zoneid="${z}"></ins></span>`;
    document.body.innerHTML = `<div id="header">
<input type="radio" class="tradio" id="rmainmenu" name="navtrigs"><input type="radio" class="tradio" id="rnomenu1" name="navtrigs" checked=""><input type="radio" class="tradio" id="rsubmenu" name="navtrigs"><input type="radio" class="tradio" id="rnomenu2" name="navtrigs">
<label for="rmainmenu" class="tlabel tfirst" id="rlmainmenu"><span></span><span></span><span></span></label><label for="rnomenu1" class="tlabel tnomenu tfirst" id="rlnomenu1"></label><label for="rsubmenu" class="tlabel tsecond" id="rlsubmenu"><span></span><span></span><span></span></label><label for="rnomenu2" class="tlabel tnomenu tsecond" id="rlnomenu2"></label>
<h2 id="site-title" class="logo"><a href="/">Rule 34</a></h2><ul class="flat-list" id="navbar">${nav}</ul><ul class="flat-list" id="subnavbar">${sub}</ul></div>
<div id="long-notice"></div><div id="notice" class="notice" style="display: none;"></div><div class="has-mail" id="has-mail-notice" style="display: none;"><a href="index.php?page=gmail">You have mail</a></div>
<div id="content"><div id="post-list"><div class="sidebar">
<div class="tag-search"><h5>Search</h5><form action="index.php?page=search" method="post"><div class="awesomplete"><input name="tags" type="text" value="test" autocomplete="off" aria-autocomplete="list"><ul hidden=""></ul><span class="visually-hidden" role="status" aria-live="assertive" aria-relevant="additions"></span></div><span id="displayOptsLink">⚙</span><br><input name="commit" type="submit" value="Search"></form><small>(Supports wildcard *)</small></div>
<ul id="displayOptions"><li><label>Filter AI posts <span class="switch"><input type="checkbox" class="toggleSwitch" id="chkFilterAI" checked=""><span class="slider"></span></span></label></li></ul>
${ad(1)}
<div id="blacklisted-sidebar" style="display: none;"><h5><a href="#">Hidden</a> <span id="blacklist-count" class="post-count"></span></h5></div>
<div><h5>Tags</h5><ul id="tag-sidebar"><li><h6>Copyright</h6></li>${tagLi('copyright', 'some_series', 900)}<li><h6>Character</h6></li>${tagLi('character', 'some_character', 300)}<li><h6>Artist</h6></li>${tagLi('artist', 'someartist', 12)}<li><h6>General</h6></li>${tagLi('general', '1girl', 5000)}${tagLi('general', 'tag0', 80)}</ul></div>
</div><div class="content">
<span data-nosnippet=""><div style="min-height: 135px; box-sizing: border-box;"><ins class="eas6a97888e38" data-zoneid="2"></ins><br><br></div></span>
<div class="image-list">${thumbs}
</div><div id="paginator"><div class="pagination"><b>1</b> <a href="?page=post&s=list&tags=test&pid=42">2</a><a href="?page=post&s=list&tags=test&pid=84">3</a><a href="?page=post&s=list&tags=test&pid=42" alt="next">&gt;</a><a href="?page=post&s=list&tags=test&pid=84" alt="last page">&gt;&gt;</a> <form id="manualpage" onsubmit="return false" style="display:inline;" class="manual-page-chooser"><input type="text" id="pageid" placeholder="page"> <input type="submit" value="Go"></form></div></div>
<br><div class="horizontalFlexWithMargins" style="justify-content: center" data-nosnippet="">${ad(3)}</div>
</div>${opts.adCol ? '<span style="display:block;width:195px;flex:none"><div class="postListSidebarRight" style="width:170px;height:602px"><ins class="eas6a97888e20"></ins></div></span>' : ''}</div></div>`;
    if (opts.blocker) { const b = document.createElement('style'); b.textContent = '.adsbox{display:none!important}'; document.head.appendChild(b); }
    // "seen" values far in the future, so the tips / What's new / phone guide windows don't open by themselves
    // (the little one-time tips are held back too - "one just showed" - unless a test sets steamy34_hints_seen)
    const store = Object.assign({ steamy34_tips_seen: 999, steamy34_changelog_seen: 'Release 999', steamy34_mobile_seen: 999, steamy34_hints_seen: { _last: Date.now() }, steamy34_settings: theme ? { theme } : {} }, opts.store || {});
    window.__store = store;
    window.__log = [];
    window.alert = t => __log.push('ALERT ' + t);
    window.onerror = (m) => { __log.push('ERROR ' + m); };
    const xhr = d => {
        __log.push('XHR ' + d.url);
        setTimeout(() => (opts.xhrFail ? (d.onerror || (() => {}))({}) : d.onload && d.onload({ status: 200, response: new Blob(['x']), responseText: '[]' })), 30);
    };
    const download = d => {
        __log.push('GM_download ' + d.name.slice(-30));
        setTimeout(() => (opts.dlError ? d.onerror({ error: opts.dlError }) : d.onload()), 30);
        return { abort() {} };
    };
    const src = await fetch('/s.js?' + Date.now()).then(r => r.text());
    try {
        new Function('GM_getValue', 'GM_setValue', 'GM_deleteValue', 'GM_listValues', 'GM_xmlhttpRequest', 'GM_download', src)(
            // window.__failRead = ['key']: reading that key fails (a hiccup in the storage)
            (k, d) => { if ((window.__failRead || []).includes(k)) throw new Error('read failed'); return k in store ? store[k] : d; }, (k, v) => { store[k] = v; }, k => { delete store[k]; }, () => Object.keys(store), xhr, download);
    } catch (e) { __log.push('THROW ' + e.message); }
    await new Promise(r => setTimeout(r, 700));
};

// One full check: settings switch, popup buttons, a download, messages
window.__check = async function (theme, opts = {}) {
    const wait = ms => new Promise(r => setTimeout(r, ms));
    await __phone(theme, opts);
    const r = { theme, width: innerWidth };
    r.recentFolded = document.querySelector('.s34-sb-menu').hidden;
    r.menuBtn = !!document.querySelector('.s34-menu-btn');
    r.siteBurgersVisible = Array.from(document.querySelectorAll('label.tlabel')).filter(l => getComputedStyle(l).display !== 'none').length;
    r.gearTab = document.querySelector('.s34-gear').tabIndex;
    document.querySelector('.s34-gear').click(); await wait(200);
    document.querySelector('.s34-set-nav [data-sec="viewing"]').click(); await wait(100);
    r.preloadOn = document.getElementById('s34-set-popupPreload').checked;
    document.querySelector('.s34-set [data-act="cancel"]').click(); await wait(100);
    document.querySelector('#s101 a').click(); await wait(600);
    const ov = document.querySelector('.s34-pv-overlay');
    const close = ov.querySelector('.s34-pv-top .s34-pv-close');
    const cs = getComputedStyle(close);
    r.popupLayout = getComputedStyle(ov).display;
    r.topClose = close.tagName + (cs.display === 'none' ? ' (hidden - floating ✕ instead)' : ' color ' + cs.color + ', bg ' + cs.backgroundColor + ', border ' + cs.borderTopStyle);
    r.floatingBar = getComputedStyle(ov.querySelector('.s34-pv-tbar')).display;
    __log.length = 0;
    ov.querySelector('.s34-dl-btn').click(); await wait(1500);
    r.download = __log.filter(l => /GM_download|XHR https:\/\/wimg/.test(l)).join(' | ') || '(none)';
    r.messages = Array.from(document.querySelectorAll('.s34-toast')).map(t => t.querySelector('span').textContent.slice(0, 45) + (t.querySelector('button:not(.s34-toast-close)') ? ' [' + t.querySelector('button:not(.s34-toast-close)').textContent + ']' : ''));
    const tc = document.querySelector('.s34-toast .s34-toast-close');
    r.toastClose = tc ? tc.tagName + ' bg ' + getComputedStyle(tc).backgroundColor : '-';
    r.problems = __log.filter(l => /ERROR|THROW|ALERT/.test(l));
    return r;
};

// Extra checks for the cleanup: popup look with grid off, backup, changelog, privacy list
window.__extra = async function (theme, opts = {}) {
    const wait = ms => new Promise(r => setTimeout(r, ms));
    const orig = HTMLAnchorElement.prototype.click;
    let backup = null;
    HTMLAnchorElement.prototype.click = function () {
        if (this.download && /backup/.test(this.download)) { const h = this.href; fetch(h).then(r => r.text()).then(t => { backup = JSON.parse(t); }); }
        else if (!this.download) orig.call(this);
    };
    await __phone(theme, opts);
    const r = { theme, width: innerWidth };
    document.querySelector('#s101 a').click(); await wait(600);
    const ov = document.querySelector('.s34-pv-overlay');
    r.popup = getComputedStyle(ov).display + ', bg ' + getComputedStyle(ov).backgroundColor + ', position ' + getComputedStyle(ov).position;
    r.fullLink = !!ov.querySelector('a.s34-pv-full') && getComputedStyle(ov.querySelector('a.s34-pv-full')).color;
    ov.querySelector('.s34-dl-btn').click(); await wait(900);
    const t = document.querySelector('.s34-toast');
    r.message = t ? getComputedStyle(t).position + ', bg ' + getComputedStyle(t).backgroundColor : 'none';
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })); await wait(200);
    if (ov.isConnected) ov.querySelector('[data-act="close"]').click();
    await wait(200);
    // backup
    const gear = document.querySelector('.s34-gear'); gear.click(); await wait(200);
    document.querySelector('.s34-set-nav [data-sec="privacy"]').click(); await wait(150);
    r.smallPrefsRow = Array.from(document.querySelectorAll('.s34-privacy-name')).some(n => n.textContent === 'Small preferences');
    document.querySelector('.s34-set [data-act="export"]').click(); await wait(500);
    r.backupKeys = backup ? ['votes', 'autoNext', 'theater'].map(k => k + ':' + (k in backup)).join(' ') : 'no backup';
    document.querySelector('.s34-set-nav [data-sec="help"]').click(); await wait(150);
    r.aboutCard = !!Array.from(document.querySelectorAll('.s34-set-cardhead')).find(h => h.textContent === 'About Steamy34');
    document.querySelector('.s34-set [data-act="changelog"]').click(); await wait(300);
    r.changelog = document.querySelectorAll('.s34-cl-entry').length + ' entries, newest ' + (document.querySelector('.s34-cl-head b') || {}).textContent;
    HTMLAnchorElement.prototype.click = orig;
    r.problems = __log.filter(l => /ERROR|THROW|ALERT/.test(l));
    return r;
};
