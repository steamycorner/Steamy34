    // ---- Popup: post info (score + vote, size, rating, date, uploader,
    //      source) and parent / child / pool notices from the post page ----
    function absUrl(u) {
        try { return new URL(u, location.href).href; } catch (e) { return ''; }
    }

    function readPostInfo(doc) {
        const info = {};
        const lis = Array.from(doc.querySelectorAll('#stats li'));
        const text = li => li.textContent.replace(/\s+/g, ' ').trim();
        const find = label => lis.find(li => new RegExp('^\\s*' + label + '\\s*:', 'i').test(li.textContent));
        let li;
        if ((li = find('Size'))) {
            const m = text(li).match(/(\d+)\s*[x×]\s*(\d+)/);
            if (m) info.size = m[1] + '×' + m[2];
        }
        if ((li = find('Rating'))) info.rating = text(li).replace(/^Rating:\s*/i, '');
        if ((li = find('Score'))) {
            const m = text(li).match(/Score:\s*(-?\d+)/i);
            if (m) info.score = m[1];
            const v = li.querySelector('a[onclick*="vote"]');
            const mm = v && (v.getAttribute('onclick') || '').match(/vote\(\s*'?(\d+)'?\s*,\s*'(\w+)'/);
            if (mm) info.voteType = mm[2];
        }
        if ((li = find('Posted'))) {
            const m = text(li).match(/Posted:\s*(.+?)\s*(?:by\s.*)?$/i);
            if (m) info.posted = m[1];
            const a = li.querySelector('a[href]');
            if (a) { info.by = a.textContent.trim(); info.byUrl = absUrl(a.getAttribute('href')); }
        }
        if ((li = find('Source'))) {
            const a = li.querySelector('a[href]');
            if (a && /^https?:/i.test(absUrl(a.getAttribute('href')))) info.source = absUrl(a.getAttribute('href'));
            else {
                const s = text(li).replace(/^Source:\s*/i, '');
                if (s) info.sourceText = s;
            }
        }

        // Parent / child / pool notices: keep only their text and links
        const seen = new Set();
        info.notices = Array.from(doc.querySelectorAll(
            '.status-notice, #pool-nav, #pool_nav, div[id^="pool"]'))
            .filter(el => {
                if (Array.from(seen).some(s => s.contains(el))) return false;
                seen.add(el);
                // "This image has been resized. Click here…" only works with
                // the site's own scripts - useless (and unclickable) here
                if (el.id === 'resized_notice' || el.closest('#resized_notice') ||
                    /has been resized/i.test(el.textContent)) return false;
                // "< previous · Tag search: … · next >" is the site's own
                // browsing bar (same class), not a notice about the post
                if (el.id === 'navlinksContainer' || el.closest('#navlinksContainer') ||
                    el.querySelector('#prev_search_link, #next_search_link')) return false;
                return el.textContent.trim().length > 0;
            })
            .map(cleanNotice)
            .filter(Boolean);
        return info;
    }

    // Copy a notice as plain text + links (links open in a new tab, so the
    // list you're browsing stays where it is)
    function cleanNotice(el) {
        const out = document.createElement('div');
        out.className = 's34-pv-notice';
        (function walk(node, into) {
            node.childNodes.forEach(n => {
                if (n.nodeType === 3) {
                    into.appendChild(document.createTextNode(n.textContent));
                } else if (n.nodeType === 1 && !/^(SCRIPT|STYLE|BUTTON|INPUT|FORM)$/.test(n.tagName)) {
                    if (n.tagName === 'A' && n.getAttribute('href') && !/^\s*(#|javascript:)/i.test(n.getAttribute('href'))) {
                        const a = document.createElement('a');
                        a.href = absUrl(n.getAttribute('href'));
                        a.target = '_blank';
                        a.rel = 'noopener';
                        a.textContent = n.textContent.trim() || a.href;
                        into.appendChild(a);
                    } else {
                        if (n.tagName === 'BR' || n.tagName === 'P' || n.tagName === 'DIV') into.appendChild(document.createTextNode(' '));
                        walk(n, into);
                    }
                }
            });
        })(el, out);
        out.normalize();
        return out.textContent.trim() ? out : null;
    }

    function shortUrl(u) {
        try {
            const x = new URL(u);
            const rest = (x.pathname + x.search).replace(/\/$/, '');
            return x.hostname.replace(/^www\./, '') + (rest.length > 24 ? rest.slice(0, 22) + '…' : rest);
        } catch (e) { return u; }
    }

    const VOTES_KEY = 'steamy34_votes';
    function hasVoted(id) {
        try { return !!(GM_getValue(VOTES_KEY, {}) || {})[id]; } catch (e) { return false; }
    }

    async function voteUp(id, type) {
        try {
            let r;
            try { r = await loadPage(`index.php?page=post&s=vote&id=${encodeURIComponent(id)}&type=${type || 'up'}`, 'action'); }
            catch (e) { if (e.cloudflare) { showToast('Vote not counted – solve the quick check first.', 'Solve check', openCloudflarePanel, 10000); return null; } throw e; }
            const body = r.html.trim();
            if (!r.ok) throw new Error('HTTP ' + r.status);
            const votes = GM_getValue(VOTES_KEY, {}) || {};
            votes[id] = Date.now();
            GM_setValue(VOTES_KEY, votes);
            // The site answers with the new score
            return /^-?\d+$/.test(body) ? body : '';
        } catch (e) {
            showToast('Vote failed (' + (e.message || e) + ').');
            return null;
        }
    }

    // "https://www.deviantart.com/…" -> "DeviantArt"; known names, else the domain
    function sourceName(url) {
        let host = '';
        try { host = new URL(url).hostname.replace(/^www\./, ''); } catch (e) { return 'Source'; }
        const known = { 'twitter.com': 'Twitter', 'x.com': 'X', 'deviantart.com': 'DeviantArt', 'pixiv.net': 'Pixiv', 'patreon.com': 'Patreon',
            'artstation.com': 'ArtStation', 'tumblr.com': 'Tumblr', 'reddit.com': 'Reddit', 'instagram.com': 'Instagram', 'newgrounds.com': 'Newgrounds',
            'fanbox.cc': 'Fanbox', 'furaffinity.net': 'FurAffinity', 'itaku.ee': 'Itaku', 'bsky.app': 'Bluesky', 'subscribestar.adult': 'SubscribeStar',
            'gumroad.com': 'Gumroad', 'youtube.com': 'YouTube', 'iwara.tv': 'Iwara', 'kemono.su': 'Kemono' };
        const key = Object.keys(known).find(k => host === k || host.endsWith('.' + k));
        return key ? known[key] : host;
    }

    function renderPopupInfo(state, info) {
        const box = state.overlay.querySelector('.s34-pv-info');
        if (!box) return;
        box.replaceChildren();
        const id = postIdFrom(state.postUrl);

        // Row 1: score + vote, size, rating
        const row = document.createElement('div');
        row.className = 's34-pv-stats';
        const score = document.createElement('span');
        score.className = 's34-pv-score';
        score.textContent = '★ ' + (info.score != null ? info.score : '…');
        row.appendChild(score);
        const vote = document.createElement('button');
        vote.type = 'button';
        vote.className = 's34-pv-vote';
        vote.textContent = '▲';
        const voted = hasVoted(id);
        vote.classList.toggle('s34-on', voted);
        vote.title = voted ? 'You voted for this post' : 'Vote up';
        vote.addEventListener('click', async () => {
            if (vote.classList.contains('s34-on')) { showToast('You already voted for this post.'); return; }
            if (vote.classList.contains('s34-busy')) return;
            setBusy(vote, true);
            const res = await voteUp(id, info.voteType);
            setBusy(vote, false);
            if (res === null) return;
            vote.classList.add('s34-on');
            vote.title = 'You voted for this post';
            const n = res !== '' ? res : (info.score != null ? String(parseInt(info.score, 10) + 1) : '');
            if (n) {
                info.score = n;
                score.textContent = '★ ' + n;
                if (state.thumb) state.thumb.dataset.s34Score = n;
            }
            showToast('Voted ▲');
        });
        row.appendChild(vote);
        [info.size, info.rating].filter(Boolean).forEach(t => {
            const s = document.createElement('span');
            s.className = 's34-pv-pill';
            s.textContent = t;
            row.appendChild(s);
        });
        box.appendChild(row);

        // (Beta 3.9.2) Row 2 as chips: when (relative, exact on hover), who, where from
        if (info.posted || info.by || info.source || info.sourceText) {
            const chips = document.createElement('div');
            chips.className = 's34-pv-chips2';
            if (info.posted) {
                const c = document.createElement('span');
                c.className = 's34-pv-chip2';
                const t = Date.parse(String(info.posted).replace(' ', 'T'));
                c.textContent = '🕒 ' + (isNaN(t) ? info.posted : timeAgo(t));
                c.title = 'Posted ' + info.posted;
                chips.appendChild(c);
            }
            if (info.by) {
                const a = document.createElement(info.byUrl ? 'a' : 'span');
                a.className = 's34-pv-chip2';
                a.textContent = '👤 ' + info.by;
                a.title = 'Uploaded by ' + info.by;
                if (info.byUrl) { a.href = info.byUrl; a.target = '_blank'; a.rel = 'noopener'; }
                chips.appendChild(a);
            }
            if (info.source) {
                const a = document.createElement('a');
                a.className = 's34-pv-chip2 s34-pv-source';
                a.href = info.source;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                a.textContent = sourceName(info.source) + ' ↗';
                a.title = 'Source: ' + info.source;
                chips.appendChild(a);
            } else if (info.sourceText) {
                const c = document.createElement('span');
                c.className = 's34-pv-chip2';
                c.textContent = 'Source: ' + info.sourceText;
                chips.appendChild(c);
            }
            box.appendChild(chips);
        }

        // Parent / child / pool
        (info.notices || []).forEach(n => box.appendChild(n));
    }

    // ---- Popup: comments (scroll down below the media) ----
    // Text with line breaks, no HTML (comments are shown as plain text)
    function richText(el) {
        let out = '';
        (function walk(node) {
            node.childNodes.forEach(c => {
                if (c.nodeType === 3) { out += c.textContent; return; }
                if (c.nodeType !== 1 || /^(SCRIPT|STYLE|BUTTON|FORM|INPUT)$/.test(c.tagName)) return;
                if (c.tagName === 'BR') { out += '\n'; return; }
                const block = /^(P|DIV|LI|BLOCKQUOTE|H\d)$/.test(c.tagName);
                if (block && out && !out.endsWith('\n')) out += '\n';
                walk(c);
                if (block) out += '\n';
            });
        })(el);
        return out.replace(/[ \t]+\n/g, '\n').replace(/\n[ \t]+/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
    }

    // The comment layout isn't documented, so this reads it defensively:
    // each comment is an element with id "c<number>" (or a child of the
    // comment list with an account link), with author, date, score and text.
    function readComments(doc) {
        const root = doc.querySelector('#comment-list, #comments, .comment-list, #post-comments');
        let blocks = Array.from((root || doc).querySelectorAll('[id]')).filter(el => /^c\d+$/.test(el.id));
        blocks = blocks.filter(b => !blocks.some(o => o !== b && o.contains(b))); // outermost only
        if (!blocks.length && root) {
            blocks = Array.from(root.children).filter(el => el.querySelector('a[href*="page=account"], a[href*="s=profile"]'));
        }
        const comments = blocks.map(b => {
            const userA = b.querySelector('a[href*="page=account"], a[href*="s=profile"]') ||
                          (b.parentElement && b.parentElement.querySelector('a[href*="page=account"], a[href*="s=profile"]'));
            const flat = b.textContent.replace(/\s+/g, ' ');
            const date = (flat.match(/(\d{4}-\d{2}-\d{2}(?:\s+\d{1,2}:\d{2}(?::\d{2})?)?)/) || [])[1] || '';
            const score = (flat.match(/Score:\s*(-?\d+)/i) || [])[1];

            let body = '';
            const bodyEl = b.querySelector('.col2, [id^="cbody"], .comment-body, .body, .comment-text');
            if (bodyEl) {
                body = richText(bodyEl);
            } else {
                // No separate text box: take everything except the header bits
                const clone = b.cloneNode(true);
                clone.querySelectorAll('.col1, .info, .author, small, script').forEach(n => n.remove());
                if (userA) clone.querySelectorAll('a[href*="page=account"], a[href*="s=profile"]').forEach(n => n.remove());
                body = richText(clone).split('\n')
                    .filter(line => !/^\s*(Posted on|Score:|\(vote|vote |Report|Reply|Quote)/i.test(line))
                    .join('\n').replace(date, '').trim();
            }
            return {
                id: b.id || '',
                user: userA ? userA.textContent.trim() : 'Anonymous',
                userUrl: userA ? absUrl(userA.getAttribute('href')) : '',
                date, score, body
            };
        }).filter(c => c.body);
        // rule34 shows 10 comments a page: "17 comments" at the top, "Next »"
        // (with a cursor) at the bottom - for the popup's "More comments"
        const total = root ? parseInt((root.textContent.slice(0, 300).match(/^\s*(\d+)\s+comments?\b/i) || [])[1], 10) || 0 : 0;
        const nextA = Array.from(doc.querySelectorAll('#post-comments #paginator a, #comment-list #paginator a, #paginator a[href*="cursor="]'))
            .find(a => /cursor=/.test(a.getAttribute('href') || '') || /next/i.test(a.textContent));
        const next = nextA ? absUrl(nextA.getAttribute('href')) : '';
        console.log('[Steamy34] Comments:', comments.length + (total ? ' of ' + total : ''),
            root ? '(from #' + (root.id || root.className) + ')' : '(no comment list on the page)');
        return { comments, found: !!root || comments.length > 0, total, next };
    }

    // Plain text with clickable web links
    function linkifyInto(el, text) {
        const re = /\bhttps?:\/\/[^\s<>"']+/gi;
        let last = 0, m;
        while ((m = re.exec(text))) {
            if (m.index > last) el.appendChild(document.createTextNode(text.slice(last, m.index)));
            const a = document.createElement('a');
            a.href = m[0];
            a.textContent = m[0].length > 60 ? m[0].slice(0, 57) + '…' : m[0];
            a.target = '_blank';
            a.rel = 'noopener noreferrer nofollow';
            el.appendChild(a);
            last = m.index + m[0].length;
        }
        if (last < text.length) el.appendChild(document.createTextNode(text.slice(last)));
    }

    function avatarColor(name) {
        let h = 0;
        for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) % 360;
        return `hsl(${h}, 55%, 42%)`;
    }

    // result: null = still loading; { comments, found, failed }
    function renderComments(state, result) {
        const overlay = state.overlay;
        const sec = overlay.querySelector('.s34-cm-section');
        if (!sec) return;
        state.commentsDone = !!result;
        sec.replaceChildren();

        const head = document.createElement('div');
        head.className = 's34-cm-head';
        const h = document.createElement('h3');
        h.textContent = 'Comments';
        const count = document.createElement('span');
        count.className = 's34-cm-count';
        const write = document.createElement('a');
        write.className = 's34-cm-write';
        write.href = state.postUrl + '#comments';
        write.target = '_blank';
        write.rel = 'noopener';
        // Two lines, so it's clear this leaves the popup
        write.innerHTML =
            '<span class="s34-cm-write-main">✎ Write a comment ' +
            '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6"/><path d="M20 4l-9 9"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg></span>' +
            '<span class="s34-cm-write-sub">opens the original rule34 page in a new tab</span>';
        write.title = 'Commenting works on the site\'s own post page (old design) – it opens in a new tab, this popup stays open';
        head.append(h, count, write);
        sec.appendChild(head);

        const list = result ? result.comments : [];
        count.textContent = result ? String(Math.max(list.length, result.total || 0)) : '…';
        count.hidden = !result;

        if (!result) {
            const wait = document.createElement('div');
            wait.className = 's34-cm-empty';
            wait.innerHTML = '<span class="s34-spin"></span> Loading comments…';
            sec.appendChild(wait);
            return;
        }
        if (!list.length) {
            const empty = document.createElement('div');
            empty.className = 's34-cm-empty';
            empty.textContent = result.failed ? 'Couldn\'t load the comments – open the full post to see them.'
                : result.found ? 'No comments yet. Be the first – "Write a comment" opens the original post page in a new tab.'
                : 'No comments found for this post.';
            sec.appendChild(empty);
            return;
        }

        const wrap = document.createElement('div');
        wrap.className = 's34-cm-list';
        list.forEach(c => wrap.appendChild(commentElement(c)));
        sec.appendChild(wrap);
        addMoreCommentsButton(state, sec, wrap, result);
    }

    // "More comments (7 more)": the next 10 from the site, through the shared
    // page line (Beta 3.5.1 - before, the popup showed only the first 10)
    function addMoreCommentsButton(state, sec, wrap, result) {
        if (!result.next) return;
        const more = document.createElement('button');
        more.type = 'button';
        more.className = 's34-cm-more';
        const left = (result.total || 0) - wrap.children.length;
        const label = left > 0 ? `More comments (${left} more)` : 'More comments';
        more.textContent = label;
        more.addEventListener('click', async () => {
            more.disabled = true;
            more.textContent = 'Loading…';
            try {
                const page = await loadPage(result.next, 'popup');
                if (!popupState || popupState.id !== state.id) return;
                const r = readComments(new DOMParser().parseFromString(page.html, 'text/html'));
                const have = new Set(Array.from(wrap.children).map(el => el.dataset.cid).filter(Boolean));
                r.comments.filter(c => !c.id || !have.has(c.id)).forEach(c => wrap.appendChild(commentElement(c)));
                more.remove();
                addMoreCommentsButton(state, sec, wrap, { next: r.next, total: result.total });
            } catch (e) {
                more.disabled = false;
                more.textContent = e && e.cloudflare ? 'Solve the quick check, then try again' : 'Couldn\'t load – try again';
            }
        });
        sec.appendChild(more);
    }

    // One comment: round initial, name, "3 days ago", ▲ score, the text
    function commentElement(c) {
        const art = document.createElement('article');
        art.className = 's34-cm';
        if (c.id) art.dataset.cid = c.id;
        const av = document.createElement('div');
        av.className = 's34-cm-avatar';
        av.textContent = (c.user || '?').charAt(0).toUpperCase();
        av.style.setProperty('background-color', avatarColor(c.user || '?'), 'important');
        const main = document.createElement('div');
        main.className = 's34-cm-main';
        const meta = document.createElement('div');
        meta.className = 's34-cm-meta';
        const user = document.createElement(c.userUrl ? 'a' : 'span');
        user.className = 's34-cm-user';
        user.textContent = c.user;
        if (c.userUrl) { user.href = c.userUrl; user.target = '_blank'; user.rel = 'noopener'; }
        meta.appendChild(user);
        if (c.date) {
            const d = document.createElement('span');
            d.className = 's34-cm-date';
            const ms = Date.parse(c.date.replace(' ', 'T'));
            d.textContent = isNaN(ms) ? c.date : timeAgo(ms);
            d.title = c.date;
            meta.appendChild(d);
        }
        if (c.score != null && c.score !== '0') {
            const s = document.createElement('span');
            s.className = 's34-cm-score';
            s.textContent = '▲ ' + c.score;
            meta.appendChild(s);
        }
        const text = document.createElement('div');
        text.className = 's34-cm-text';
        linkifyInto(text, c.body);
        main.append(meta, text);
        art.append(av, main);
        return art;
    }

    // ---- Popup: auto next post (slideshow) ----
    // Images move on after the chosen time; videos play to the end first.
    // Pauses while you zoom, while another window is open or the tab is hidden.
    const AUTO_KEY = 'steamy34_auto';
    const autoNext = { on: false, elapsed: 0, timer: null, busy: false };

    function autoSeconds() {
        let s = 6;
        try { s = (GM_getValue(AUTO_KEY, {}) || {}).sec || 6; } catch (e) {}
        return Math.min(30, Math.max(2, s));
    }

    function autoPaused() {
        return !popupState || document.hidden || !!document.querySelector('.s34-overlay') ||
               !!popupState.overlay.querySelector('.s34-pv-zoomed') || !popupState.mediaReady;
    }

    function popupVideo() {
        return popupState && popupState.overlay.querySelector('video.s34-pv-media');
    }

    function startAutoNext() {
        autoNext.on = true;
        autoNext.elapsed = 0;
        const v = popupVideo();
        if (v) v.loop = false; // so it can end and move on
        clearInterval(autoNext.timer);
        autoNext.timer = setInterval(autoTick, 100);
        renderAutoNext();
    }

    function stopAutoNext() {
        autoNext.on = false;
        clearInterval(autoNext.timer);
        autoNext.timer = null;
        const v = popupVideo();
        if (v) v.loop = getVideoPrefs().loop;
        renderAutoNext();
    }

    function autoTick() {
        if (!popupState) { stopAutoNext(); return; }
        const bar = popupState.overlay.querySelector('.s34-auto-bar i');
        if (popupState.isVideo) {
            // Videos: the bar follows the video; "ended" moves on
            const v = popupVideo();
            if (bar && v && v.duration) bar.style.width = Math.min(100, v.currentTime / v.duration * 100) + '%';
            return;
        }
        if (autoPaused()) return;
        autoNext.elapsed += 100;
        const total = autoSeconds() * 1000;
        if (bar) bar.style.width = Math.min(100, autoNext.elapsed / total * 100) + '%';
        if (autoNext.elapsed >= total) autoAdvance();
    }

    async function autoAdvance() {
        if (autoNext.busy || !popupState) return;
        autoNext.busy = true;
        autoNext.elapsed = 0;
        try {
            let list = visibleThumbs();
            let i = list.indexOf(popupState.thumb);
            if (!list[i + 1]) {
                // End of what's loaded: let infinite scroll fetch the next page
                // (from the Following window: its grid loads more)
                if (popupState.list) popupState.list.more();
                else window.scrollTo(0, document.documentElement.scrollHeight);
                await pause(2500);
                if (!popupState || !autoNext.on) return;
                list = visibleThumbs();
                i = list.indexOf(popupState.thumb);
            }
            if (list[i + 1]) openPopup(list[i + 1]);
            else {
                stopAutoNext();
                showToast('Auto next stopped – no more posts.');
            }
        } finally {
            autoNext.busy = false;
        }
    }

    function renderAutoNext() {
        if (!popupState) return;
        const box = popupState.overlay.querySelector('.s34-auto');
        if (!box) return;
        const btn = box.querySelector('.s34-auto-toggle');
        btn.classList.toggle('s34-on', autoNext.on);
        btn.innerHTML = autoNext.on
            ? '<span class="s34-auto-icon">❚❚</span> Stop auto next'
            : '<span class="s34-auto-icon">▶</span> Auto next';
        btn.title = autoNext.on ? 'Stop the slideshow' : 'Go to the next post by itself (slideshow)';
        box.classList.toggle('s34-auto-running', autoNext.on);
        box.querySelector('.s34-auto-sec').textContent = autoSeconds() + ' s';
        box.querySelector('.s34-auto-note').textContent = popupState.isVideo
            ? 'Videos play to the end, then the next post opens'
            : 'Next post after ' + autoSeconds() + ' seconds';
        if (!autoNext.on) box.querySelector('.s34-auto-bar i').style.width = '0%';
    }

    function setupAutoNextControls(overlay) {
        const box = overlay.querySelector('.s34-auto');
        const range = box.querySelector('input[type="range"]');
        range.value = autoSeconds();
        range.addEventListener('input', () => {
            GM_setValue(AUTO_KEY, { sec: parseInt(range.value, 10) });
            box.querySelector('.s34-auto-sec').textContent = range.value + ' s';
            renderAutoNext();
        });
        range.addEventListener('change', () => range.blur()); // ← / → browse again
        box.querySelector('.s34-auto-toggle').addEventListener('click', () => {
            if (autoNext.on) stopAutoNext(); else startAutoNext();
        });
    }

