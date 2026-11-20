    // =====================================================================
    //  SHARED HELPERS
    // =====================================================================

    // Real tag name for one sidebar <li>
    function getTagFromRow(row) {
        let tag = '';

        // 1. Wiki link ("?") contains the real tag name
        const wikiLink = row.querySelector('a[href*="page=wiki"][href*="search="]');
        if (wikiLink) {
            try { tag = new URL(wikiLink.href).searchParams.get('search') || ''; } catch (e) {}
        }

        // 2. Post-search link
        if (!tag) {
            const tagLink = row.querySelector('a[href*="tags="]');
            if (tagLink) {
                try {
                    tag = (new URL(tagLink.href).searchParams.get('tags') || '')
                        .trim().split(/\s+/)[0];
                } catch (e) {}
            }
        }

        // 3. Visible text, excluding the ? + - controls
        if (!tag) {
            const link = Array.from(row.querySelectorAll('a')).find(a => {
                const t = a.textContent.trim();
                return t && !['?', '+', '-'].includes(t);
            });
            if (link) tag = link.textContent.trim().replace(/\s+/g, '_');
        }

        return tag.trim();
    }

    function getTags(type) {
        const result = [];
        document.querySelectorAll(`#tag-sidebar li.tag-type-${type}`).forEach(row => {
            const tag = getTagFromRow(row);
            if (tag && !result.includes(tag)) result.push(tag);
        });
        return result;
    }

    function getOriginalUrl() {
        const link = Array.from(document.querySelectorAll('a'))
            .find(a => /original\s*image/i.test(a.textContent));
        if (link && link.href) return link.href;

        const video = document.querySelector('#gelcomVideoPlayer source, video source');
        if (video && video.src) return video.src;

        return null;
    }

