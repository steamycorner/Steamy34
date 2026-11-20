// Sets up the fake page for looking at it (screenshots):
//   await __show('white', { popup: 101, manage: false, menu: false })
// Run on a fresh page (reload between calls). Placeholder pictures only.
window.__show = async function (theme, o) {
    o = o || {};
    const wait = ms => new Promise(r => setTimeout(r, ms));
    if (!window.__phone) await new Promise(r => { const s = document.createElement('script'); s.src = '/phonemock.js'; s.onload = r; document.head.appendChild(s); });
    const ART = (tag, extra) => Object.assign({ tag, added: 1, seen: 105, latest: 0, count: 0, more: false }, extra || {});
    await window.__phone(theme, { store: {
        steamy34_settings: Object.assign({ theme }, o.settings || {}),
        steamy34_following: { artists: [ART('someartist', { count: 3 }), ART('feedtest', { count: 2 }), ART('busy_artist', { count: 7, more: true })],
            searches: [{ query: 'panam_palmer score:>=50', name: 'panam_palmer score:>=50', added: 1, seen: 100, latest: 0, count: 4, more: false }, { query: 'test', name: 'test', added: 1, seen: 100, latest: 0, count: 0, more: false }],
            checkedAt: Date.now() },
        steamy34_viewed: { 101: 1 }, steamy34_downloaded: { 103: 1 }, steamy34_favs: { 102: 1 }
    } });
    await wait(600);
    document.querySelectorAll('.s34-toast').forEach(t => t.remove());
    if (o.menu) { document.querySelector('.s34-menu-btn').click(); await wait(300); }
    if (o.popup) { document.querySelector('#s' + o.popup + ' a').click(); await wait(1300); }
    if (o.manage) { document.querySelector('.s34-follow-box [data-fb="manage"]').click(); await wait(300); }
    document.querySelectorAll('.s34-toast, .s34-hint').forEach(t => t.remove());
    return 'ok';
};
