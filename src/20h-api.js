    // =====================================================================
    //  YOUR rule34 API KEY - strictly optional (Beta 3.7)
    //  rule34's API answers searches with plain data instead of whole web
    //  pages. With a key the person pasted in Settings → API key themselves,
    //  Steamy34 uses it for background work: new-post counts (Following,
    //  saved searches) and hover previews (finding the file). Anything that
    //  fails falls back to the normal pages. (Batch downloads still read
    //  each post page - the file name needs its tag types.)
    //  The promises (each one is checked by the test suite):
    //   - the key only ever goes to rule34's own API (api.rule34.xxx), in
    //     that address - nowhere else (apiGet is the only place it's used);
    //     those requests carry no login cookies (anonymous)
    //   - it's stored on its own (steamy34_api), NOT in the settings - so it
    //     is never in a backup or in "Copy info for a bug report"
    //   - Steamy34 never reads it from rule34's Options page
    //   - "Remove key" deletes it at once
    //  Without a key nothing changes - everything works as it always did.
    //  rule34's API terms: one key per person, no ads / paywalls (none here).
    // =====================================================================
    const API_KEY_STORE = 'steamy34_api';
    const API_URL = 'https://api.rule34.xxx/index.php';
    const API_PER_MINUTE = 50; // (rule34 allows 60 a minute)

    function getApiKey() {
        let v = null;
        try { v = GM_getValue(API_KEY_STORE, null); } catch (e) {}
        return v && /^\d{1,12}$/.test(String(v.user_id)) && /^[A-Za-z0-9]{16,200}$/.test(String(v.api_key)) ? v : null;
    }
    const hasApiKey = () => !!getApiKey();

    // What rule34 shows under "API Access Credentials": "&api_key=…&user_id=…"
    function parseApiKeyText(text) {
        const s = String(text || '').trim();
        const k = s.match(/api_key=([A-Za-z0-9]{16,200})/i);
        const u = s.match(/user_id=(\d{1,12})/i);
        return k && u ? { api_key: k[1], user_id: u[1] } : null;
    }
    function setApiKey(v) { GM_setValue(API_KEY_STORE, { api_key: v.api_key, user_id: v.user_id, added: Date.now() }); }
    function removeApiKey() {
        try { GM_deleteValue(API_KEY_STORE); } catch (e) { GM_setValue(API_KEY_STORE, null); }
        apiStats.uses = 0;
    }

    // Kept under rule34's limit: at most API_PER_MINUTE requests a minute -
    // past that, the normal pages take over until the minute is through
    const apiTimes = [];
    const apiStats = { uses: 0, lastError: '' };
    function apiRoom() {
        const now = Date.now();
        while (apiTimes.length && now - apiTimes[0] > 60000) apiTimes.shift();
        return apiTimes.length < API_PER_MINUTE;
    }

    // One API request. The ONLY place the key is used: it goes into this
    // address on api.rule34.xxx and nowhere else.
    function apiGet(params) {
        const key = getApiKey();
        if (!key) return Promise.reject(Object.assign(new Error('no key'), { noKey: true }));
        if (!apiRoom()) return Promise.reject(Object.assign(new Error('a minute\'s worth of requests used - the normal pages take over for now'), { limit: true }));
        apiTimes.push(Date.now());
        const q = new URLSearchParams(Object.assign({ page: 'dapi', q: 'index' }, params, { json: '1', api_key: key.api_key, user_id: key.user_id }));
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: 'GET',
                url: API_URL + '?' + q.toString(),
                anonymous: true, // (no rule34 login cookies with it)
                timeout: 15000,
                onload: r => {
                    if (r.status < 200 || r.status >= 300) { apiStats.lastError = 'HTTP ' + r.status; reject(new Error('HTTP ' + r.status)); return; }
                    const text = (r.responseText || '').trim();
                    if (!text) { apiStats.uses++; resolve([]); return; } // (nothing found)
                    let data;
                    try { data = JSON.parse(text); } catch (e) {
                        apiStats.lastError = text.slice(0, 120);
                        reject(Object.assign(new Error('rule34 answered: ' + text.slice(0, 120)), { answer: text.slice(0, 120) }));
                        return;
                    }
                    // Only a list of posts (or { post: [...] }) is an answer - anything
                    // else (a message like "Missing authentication") counts as a no
                    if (!Array.isArray(data) && !(data && Array.isArray(data.post))) {
                        apiStats.lastError = String(data && typeof data === 'object' ? data.message || 'not accepted' : data).slice(0, 120);
                        reject(new Error('rule34 answered: ' + apiStats.lastError));
                        return;
                    }
                    apiStats.uses++;
                    resolve(data);
                },
                onerror: () => { apiStats.lastError = 'no connection'; reject(new Error('no connection')); },
                ontimeout: () => { apiStats.lastError = 'no answer'; reject(new Error('no answer')); }
            });
        });
    }

    // Posts for a search, newest first (as rule34 sorts them, filters included)
    async function apiPosts(tags, limit = 100, pid = 0) {
        const data = await apiGet({ s: 'post', tags: tags || '', limit: String(limit), pid: String(pid) });
        const list = Array.isArray(data) ? data : data && Array.isArray(data.post) ? data.post : [];
        return list.map(p => ({
            id: parseInt(p.id, 10) || 0,
            tags: unescapeHtml(String(p.tags || '')).toLowerCase().trim(),
            rating: String(p.rating || '').toLowerCase().trim(), // (a field of its own here - pages have it among the tags)
            preview: String(p.preview_url || ''),
            sample: String(p.sample_url || ''),
            file: String(p.file_url || ''),
            parent: parseInt(p.parent_id, 10) || 0
        })).filter(p => p.id);
    }

    // The file of one post (hover previews) - null: use the page
    async function apiPostMedia(postUrl) {
        if (!hasApiKey()) return null;
        let id = '';
        try { id = new URL(postUrl, location.href).searchParams.get('id') || ''; } catch (e) {}
        if (!/^\d+$/.test(id)) return null;
        try {
            const data = await apiGet({ s: 'post', id });
            const raw = (Array.isArray(data) ? data : data && Array.isArray(data.post) ? data.post : [])[0];
            const p = raw && { file: String(raw.file_url || '') };
            if (!p || !p.file) return null;
            const isVideo = /\.(mp4|webm)(\?|$)/i.test(p.file);
            return isVideo ? { video: p.file, image: null } : { video: null, image: p.file };
        } catch (e) { return null; }
    }

    // ---- Settings → API key: the page that explains it, and the box ----
    const KEY_SVG = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="15" r="4"/><path d="M11 12l8-8M16 7l2.5 2.5M14 9l2 2"/></svg>';
    function buildApiSection() {
        const wrap = document.createElement('div');
        wrap.className = 's34-set-card s34-set-plain s34-api';
        wrap.innerHTML = `
            <div class="s34-api-hero">
                <div class="s34-api-icon">${KEY_SVG}</div>
                <div><b>Optional.</b> Steamy34 works fully without it – nothing is missing if you leave this empty.</div>
            </div>
            <div class="s34-set-cardhead">What it's for</div>
            <p>rule34 offers an API: the same posts as plain data instead of whole web pages. With your key, Steamy34 uses it for the work it does in the background:</p>
            <ul class="s34-api-list">
                <li>counting new posts of the artists you follow and your saved searches</li>
                <li>finding the file for hover previews</li>
                <li>pictures for older downloads in your Downloads window</li>
            </ul>
            <p>That's far less for rule34 to send – so Cloudflare checks come less often, and these things get quicker. Anything that doesn't work through the API simply uses the normal pages.</p>
            <div class="s34-set-cardhead">What Steamy34 promises</div>
            <ul class="s34-api-promises">
                <li>Your key is only ever sent to rule34's own API (api.rule34.xxx) – nowhere else. Steamy34 has no server of its own.</li>
                <li>It stays in this browser: it isn't in backups and isn't in "Copy info for a bug report".</li>
                <li>Steamy34 never reads it from your Options page – it's only here if you paste it here yourself.</li>
                <li>"Remove key" deletes it right away, and everything works as before.</li>
            </ul>
            <p class="s34-api-ask">Not sure about it? Ask steamycorner on the <a href="${DISCORD_URL}" target="_blank" rel="noopener noreferrer">Discord</a> – happy to explain.</p>
            <div class="s34-set-cardhead">Your key</div>
            <p>On rule34: <b>My Account → Options → API access</b> (Steamy34 folds it away there – click "Unfold"). Copy the whole line – it starts with <code>&amp;api_key=</code> – and paste it here.</p>
            <div class="s34-api-row">
                <input type="password" class="s34-api-input" placeholder="&amp;api_key=…&amp;user_id=…" autocomplete="off" spellcheck="false" aria-label="Your rule34 API key line">
                <button type="button" class="s34-set-btn s34-set-primary" data-api="save">Save key</button>
            </div>
            <div class="s34-api-status" role="status"></div>
            <div class="s34-set-actions">
                <button type="button" class="s34-set-btn" data-api="test">Test the key</button>
                <button type="button" class="s34-set-btn s34-set-danger" data-api="remove">Remove key</button>
            </div>
            <p class="s34-api-terms">rule34's API rules: one key per person, and no ads or paywalls with its content – Steamy34 has neither.</p>`;
        const input = wrap.querySelector('.s34-api-input');
        const status = wrap.querySelector('.s34-api-status');
        const say = (text, kind) => { status.textContent = text; status.className = 's34-api-status' + (kind ? ' s34-api-' + kind : ''); };
        const draw = () => {
            const on = hasApiKey();
            wrap.classList.toggle('s34-api-on', on);
            wrap.querySelector('[data-api="test"]').disabled = !on;
            wrap.querySelector('[data-api="remove"]').disabled = !on;
            if (on) say('✓ A key is saved in this browser. In use for new-post counts and hover previews.', 'ok');
            else say('No key – Steamy34 uses the normal pages, as always.', '');
        };
        wrap.addEventListener('click', async e => {
            const b = e.target.closest('[data-api]');
            if (!b || b.disabled) return;
            const what = b.dataset.api;
            if (what === 'save') {
                const v = parseApiKeyText(input.value);
                if (!v) { say('That doesn\'t look like the API line – copy the whole line from Options (it has api_key= and user_id= in it).', 'bad'); return; }
                setApiKey(v);
                input.value = ''; // (not left in the box)
                draw();
                say('✓ Saved in this browser. "Test the key" checks it with rule34.', 'ok');
            } else if (what === 'remove') {
                removeApiKey();
                draw();
                say('Key removed. Steamy34 uses the normal pages again.', '');
            } else if (what === 'test') {
                b.disabled = true;
                say('Asking rule34…', '');
                try {
                    const posts = await apiPosts('', 1);
                    say(posts.length ? '✓ It works – rule34 answered.' : '✓ rule34 answered (with nothing – unusual, but the key was accepted).', 'ok');
                } catch (err) {
                    say(err.limit ? err.message : 'rule34 didn\'t accept it (' + (err.message || err) + '). Copy the line from Options again – or remove the key.', 'bad');
                }
                b.disabled = !hasApiKey();
            }
        });
        input.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); wrap.querySelector('[data-api="save"]').click(); } });
        draw();
        return wrap;
    }
