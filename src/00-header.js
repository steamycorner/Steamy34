// ==UserScript==
// @name         Steamy34
// @namespace    https://linktr.ee/steamycorner
// @version      3.3.3-beta
// @license      CC0-1.0
// @author       steamycorner
// @homepageURL  https://sleazyfork.org/en/scripts/606445-steamy34
// @supportURL   https://sleazyfork.org/en/scripts/606445-steamy34/feedback
// @icon         data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCIgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZjVmOGYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM4YjNkZmYiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHJ4PSIxNSIgZmlsbD0idXJsKCNnKSIvPjxnIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIzLjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgb3BhY2l0eT0iLjk1Ij48cGF0aCBkPSJNMjIgMjZjLTMuMi0zIDMuMi01LjYgMC04LjZzMy4yLTUuNiAwLTguNCIvPjxwYXRoIGQ9Ik0zMSAyNmMtMy4yLTMgMy4yLTUuNiAwLTguNnMzLjItNS42IDAtOC40Ii8+PHBhdGggZD0iTTQwIDI2Yy0zLjItMyAzLjItNS42IDAtOC42czMuMi01LjYgMC04LjQiLz48L2c+PHBhdGggZD0iTTE0IDMxaDM0djdhMTMgMTMgMCAwIDEtMTMgMTNoLThhMTMgMTMgMCAwIDEtMTMtMTN6IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTQ3LjUgMzQuNWgyLjVhNS41IDUuNSAwIDAgMSAwIDExaC00IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMy40IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cmVjdCB4PSIxMSIgeT0iNTMiIHdpZHRoPSI0MCIgaGVpZ2h0PSIzLjQiIHJ4PSIxLjciIGZpbGw9IiNmZmYiIG9wYWNpdHk9Ii45Ii8+PC9zdmc+
// @description  [Vibecoded with AI] All-in-one rule34.xxx upgrade by steamycorner: dark / OLED mode, popup viewer, easy tag search with filters, follow artists & searches with new-post counts, downloads named after the tags (press B), batch downloads, collections, infinite scroll and a phone layout. A free fan-made hobby project, never monetized.
// @match        https://rule34.xxx/*
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_listValues
// @grant        GM_download
// @connect      rule34.xxx
// @connect      *.rule34.xxx
// @run-at       document-start
// @noframes
// ==/UserScript==

/*
 * ===========================================================================
 *  STEAMY34  -  by steamycorner
 * ===========================================================================
 *
 *  A FAN-MADE HOBBY PROJECT
 *  Steamy34 is made for fun by a fan. It is free and will never be
 *  monetized: no ads, no paid features, no data collection. It is not
 *  made by or connected to rule34.xxx.
 *
 *  CONTACT: https://linktr.ee/steamycorner
 *  Questions, bugs or ideas? Get in touch with steamycorner there.
 *
 *  FREE TO CHANGE AND SHARE
 *  You may change, copy and re-upload this code however you like.
 *  License: CC0 1.0 (public domain) -
 *  https://creativecommons.org/publicdomain/zero/1.0/
 *
 *  WHAT IT DOES (the quick tips - "?" - show the keys & gestures)
 *
 *  Posts page
 *  - Modern thumbnails (original ratios or square tiles), size slider,
 *    VID / GIF labels, artist & character tags on every thumbnail.
 *  - Hover: videos play, images load in full quality, score & size show.
 *  - Infinite scrolling with "Page N" dividers.
 *  - Marks for posts you viewed (eye) or downloaded (arrow); switches to
 *    hide them. ♥ adds a post to your rule34 favourites.
 *  - Batch download: tick posts, download them all, or add them to a
 *    collection. A small panel shows progress with Pause / Cancel.
 *
 *  Popup viewer (every post opens in it)
 *  - Large picture or video, tags with + / ⊘, post info with ▲ vote,
 *    parent / child / pool links, comments below.
 *  - ← / → (or A / D – Settings → Viewing posts) browse, Esc or middle
 *    click closes, click to zoom. F favourite, C collection, T theater
 *    (all changeable); with WASD, W / S scroll.
 *  - Settings have a search field.
 *  - First start: a welcome tour of the best features (again any time:
 *    Settings → Help → Welcome tour).
 *  - Auto next (slideshow), theater mode, video loop & speed,
 *    the next / previous post loaded in advance.
 *
 *  Search
 *  - Tags as bubbles (click to exclude), filter menus for score, size,
 *    sort, type and rating; pin a filter to keep it for every search.
 *  - Favourite tags, recent searches.
 *  - Tag suggestions while typing.
 *
 *  Following (artists and searches)
 *  - The bell next to an artist (popup, post pages) follows them; the
 *    bell under the search box follows a whole search. The sidebar lists
 *    everything with a count of its new posts; each has its own page with
 *    NEW on the posts since your last visit.
 *
 *  Downloads
 *  - B (changeable) or the Download button saves the original in
 *    maximum resolution as [character] [series] [artist] #post.ext,
 *    e.g. [amelie lacroix] [overwatch] [someartist] #1234567.jpg (classic
 *    style in the settings). Costume versions and company names are left out.
 *  - Optional own download folder – any folder, e.g. Eagle's watch folder
 *    (Settings → Downloads → Choose folder…; Chrome / Edge / Brave).
 *  - Asks before downloading a post a second time (can be switched off).
 *
 *  Tags & blacklist
 *  - + / − add a tag to the search or take it out, ⊘ blacklists it
 *    (with Undo). The Blacklist window lists, sorts and edits everything.
 *
 *  Your stuff
 *  - Collections (your own folders), Stats (top artists / characters /
 *    series, last 14 days), backup & restore.
 *
 *  Look
 *  - White, Dark and OLED colour modes.
 *
 *  Phones (Firefox for Android + Tampermonkey)
 *  - Picture on top in the popup, swipe to browse, swipe down / Back to
 *    close; one ☰ Menu with Steamy34's tools and the site's pages.
 *
 *  Privacy
 *  - Nothing is collected. Everything stays in your browser's
 *    Tampermonkey storage; Settings -> Privacy & data shows all of it and
 *    deletes it. Steamy34 only talks to rule34.xxx itself.
 *
 *  Changelog: the CHANGELOG list further down ("What's new" in the
 *  script shows it once after notable updates).
 * ===========================================================================
 */

(function () {
    'use strict';

