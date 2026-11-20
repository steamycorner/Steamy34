# Steamy34 source parts

The installable script (one file – Tampermonkey and Sleazy Fork need one) is **built** from these parts. Edit the parts here, never the built file.

```powershell
powershell -ExecutionPolicy Bypass -File build.ps1
```

The build joins all `*.js` files in name order, checks the result with Node.js (if installed), and writes `Steamy34_v<version>.user.js`, named after `@version` in `00-header.js`. The previous version moves into `backups\` (the 10 newest are kept).

All parts share one scope (the script is one big function), so a part can use anything defined in another – the order only matters for code that runs right away (settings, styles, start-up).

| Part | What's inside |
|---|---|
| `00-header` | Tampermonkey header (@version!), overview comment, start of the main function |
| `01-settings` | Default settings, loading/saving them, what the settings window shows |
| `02` – `09` | Styles: dark site look, thumbnail grid, core, buttons & tags, the big extras block (`06a`–`06j`), search box, settings window, sidebar |
| `10-colour-modes` | White / OLED made from the dark design, `injectStyles` (joins all styles – order matters) |
| `11-helpers` | Small shared helpers |
| `12-downloads` | Download key, file names, downloaded/viewed memory, own download folder |
| `13-fit-autoplay` | Single post: fit to the window, autoplay |
| `14-tag-buttons` | Block / add-to-search buttons next to tags |
| `15-hover-cloudflare` | Cloudflare check handling, hover previews |
| `16-search` | Modern search box: tag bubbles, filters, pinned filters, Recent · Tags · follow-this-search, suggestions |
| `17-infinite-scroll` | Infinite scrolling, page dividers |
| `18-tag-bar` | Artist / character tags on thumbnails, tag types, blocking with Undo |
| `19-settings-window` | The settings window (incl. search, Help, Privacy) |
| `20-extras` | Favourites, hover info, sidebar "View" switches |
| `20b-hints` | Little one-time tips |
| `20c-following` | Following: artists and searches, their pages, new-post counts, Manage window |
| `20d-screenshot-mode` | Censored mode (X blurs every picture, video and comment) |
| `20e-support` | "Copy info for a bug report", the site check, the one-time rating nudge |
| `20f-resume` | Continue where you left off ("Continue at page N") |
| `21-batch-backup-privacy` | Batch download, download panel, video options, backup, privacy list |
| `22-popup-info` | Popup: post info, comments, auto next |
| `23-collections-stats` | Theater mode, windows, collections, stats, sidebar order, preloading, full-size view |
| `24-tips-tour` | Quick tips, **CHANGELOG**, phone guide, welcome tour |
| `25-blacklist-window` | Blacklist window and sidebar button |
| `26-popup` | The popup viewer itself |
| `27-phone-start` | Phone menu, start-up (`init`), the logo, end of the main function |

Version bump: `@version` in `00-header.js` + a new entry at the top of `CHANGELOG` in `24-tips-tour.js`, then build.

Every version is checked before release with a local test suite (a fake rule34.xxx page without pictures, every check in all three colour modes) – it isn't part of this repository.
