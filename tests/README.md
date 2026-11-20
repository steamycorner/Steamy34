# Steamy34 tests

A fake rule34.xxx that runs the newest `Steamy34_v*.user.js` from the folder above, with fake Tampermonkey functions. No real site, no NSFW content.

| File | What it is |
|---|---|
| `server.ps1` | Small web server on `http://localhost:8735/`. Always serves the **newest** script, so it needs no change after a version bump. |
| `phonemock.js` | `__phone(theme, opts)` builds a fake posts page (incl. the site's phone header when the window is narrow) and runs the script. `window.__log` collects downloads, requests and errors. |
| `checks.js` | `await __suite()` runs every check in all three colour modes. Each check uses its own fresh frame. Includes every popup key (B, F, C, T, ← →, A D, W S, Esc, middle click, changed keys) and phone gestures (swipe, Back). |
| `contrast.js` | `await __contrast()` scans every Steamy34 text against the background behind it (White / Dark / OLED, computer and phone; posts page, popup, Manage window, Settings, artist page) and lists anything below a contrast of 2.6. Faint "×" and tag counts are faint on purpose. |
| `show.js` | `await __show('white', { popup: 101, manage: true, menu: true })` sets up the fake page for a screenshot (followed artists, viewed / downloaded / favourite marks). Reload between calls. |

## Run

1. Start the server:
   ```powershell
   powershell -ExecutionPolicy Bypass -File tests\server.ps1
   ```
2. Open `http://localhost:8735/index.php?page=post&s=list` in a browser.
3. In the console:
   ```js
   await new Promise(r => { const s = document.createElement('script'); s.src = '/checks.js'; s.onload = r; document.head.appendChild(s); });
   await __suite();            // everything
   await __suite('popup');     // only checks with "popup" in the name
   ```
   The result lists failures first, with what went wrong.

## Options for `__phone(theme, opts)`

- `store`: Tampermonkey storage to start with, e.g. `{ steamy34_settings: { browseKeys: 'wasd' } }`.
- `xhrFail`: downloads fail.
- `dlError`: Tampermonkey's downloader fails with this error.
- `adCol` / `blocker`: right ad column / pretend an ad blocker is on.

Tips:
- Reload the page between hand-made runs, because old script copies keep listening. `__suite` does this for you.
- The fake page never does real downloads. Saving a file is only logged as `SAVE <name>` in `__log`, so no "Save as" window ever opens.
