# Steamy34 – a free userscript for rule34.xxx

**Steamy34 is a free, all-in-one userscript for rule34.xxx.** It adds a dark mode (White, Dark and OLED), a popup viewer, a much easier tag search, downloads named after the post's tags, and artist following with new-post counts. It also has a touch-friendly phone layout for Android. It runs in Tampermonkey or Violentmonkey.

By **steamycorner** · written with AI · License: CC BY-NC-SA 4.0 · Beta

> ### ⬇ Install from Sleazy Fork: [sleazyfork.org/scripts/606445-steamy34](https://sleazyfork.org/en/scripts/606445-steamy34)
> One click on **Install this script**, and Tampermonkey **keeps Steamy34 up to date by itself** from there – nothing else to do.
> This GitHub page is the **source code**, the README and the FAQ. Please install from Sleazy Fork, not from the files here.

> **A fan-made hobby project.** Steamy34 is free and will never be monetized: no ads, no paid features, no data collection. It isn't made by or connected to rule34.xxx.

> **About the code.** Steamy34 is designed by steamycorner, a designer (web design, corporate identity, 3D) rather than a programmer. The code is written with AI (Claude), and bug fixes are made the same way, so mistakes are possible. Each version is tested before release. Problems can be reported on Discord or in the Feedback tab.

Questions, bugs or ideas: join the **Steamy34 channels (#feedback, #new-ideas) on the [steamycorner Discord](https://discord.gg/Udg9sNTBHb)**, or write in the [Feedback tab on Sleazy Fork](https://sleazyfork.org/en/scripts/606445-steamy34/feedback).

---

## Screenshots

*All pictures are blurred with Steamy34's own Censored mode (press X).*

| | |
|---|---|
| ![Posts page with the Steamy34 sidebar: tag search, Following, View switches](images/posts.png) | ![Popup viewer with download, auto next, post info and tags](images/popup.png) |
| **Posts page** – tag search with filters, Following, view switches | **Popup viewer** – download, auto next, post info and tags |
| ![Recent searches, infinite scroll with page dividers and the Cloudflare notice](images/search.png) | ![Your stats: downloads, views, top artists, characters and series](images/stats.png) |
| **Recent searches** and infinite scroll | **Your stats** – kept only on your computer |

---

## Features

**Look**
- White, Dark and OLED (true black) colour modes for rule34.xxx
- Modern thumbnail layout (original ratios or square tiles) with a size slider
- VID / GIF labels and artist / character tags on the thumbnails – or clean thumbnails, with tags only on hover or in a strip below
- Square or rounded corners
- A start page that's a small home: your search, "Continue" where you left off, recent searches, favourite tags and the newest posts from who you follow (Settings → Look & feel turns it off)

**Viewing posts**
- Popup viewer: posts open on top of the list, no new tabs
- Browse with ← / → or A / D, close with Esc or a middle click – at the end of the list the next page loads by itself
- Comments (all of them – "More comments" loads the rest), votes, favourites, post info and parent / child / pool links inside the popup
- Slideshow ("Auto next") with a timer, theater mode, click-to-zoom
- Hover previews: videos play and score / resolution show when you hover a thumbnail

**Search**
- Tags as bubbles: add, remove or exclude a tag with one click
- Filter menus for score, size, sort, type and rating
- Pinned filters that stay on for every new search
- Recent searches and favourite tags, one click away – small menus next to the sidebar (on phones: a sheet from the bottom)

**Follow artists**
- Click the bell next to an artist in a post to follow them
- The sidebar lists everyone you follow, each with a count of their new posts
- **Following window** (click one, or press G): your artists as a row of circles – a coloured ring means new posts – and their newest posts in a grid, with NEW on the ones since your last visit, each post in its own shape. It opens on top of the page you're on – "Bigger" makes it nearly full screen
- Click a post to open it in the popup: ← / → go through that artist's posts and load more at the end. "All" mixes every followed artist
- Always newest first – "Open as a search" takes you to the normal search with every filter and sort
- The browser tab shows "(12) rule34" while there are new posts; L in the popup follows the artist

**Downloads**
- Press **B** on a post to download the original in full resolution (the key can be changed)
- Files are named after the tags: `[character] [series] [artist] #post.jpg` – or the classic `Character_Series_Artist_Resolution` style
- Optional own download folder (Chrome, Edge, Brave)
- Batch downloads of ticked posts or whole collections, with Pause / Cancel
- Asks before downloading a post a second time

**Organising**
- Marks posts you viewed or downloaded, and can hide them
- Local collections (your own folders of posts)
- Stats: your top artists, characters and series
- Blacklist manager

**Phone (Android)**
- Picture on top in the popup, info and comments below
- Swipe left / right to browse, swipe down or press Back to close
- One ☰ Menu with all of Steamy34's tools
- The Following window fills the screen; Back closes it

**More**
- Infinite scrolling with "Page N" dividers – and "Continue at page N" when you come back to a search
- "Copy info for a bug report" in Settings → Help
- With an ad blocker on, no empty ad spaces next to or above the posts – without one, every ad stays exactly as rule34 shows it
- Gentle on the site: background page loads wait in one line and are spaced out, so Cloudflare checks come much less often. When one does come, a clear, pulsing notice at the bottom of the screen asks you to solve it (the *?* explains why: without it rule34 loads nothing new)
- A short welcome tour and a quick tips window with all shortcuts
- Censored mode (X): blurs every picture, video and comment – safe for screenshots or in public
- Settings with a search box
- Backup and restore of all settings and data

---

## Install

1. Install a userscript manager: **Tampermonkey** or **Violentmonkey** (Chrome, Firefox, Edge, Brave and others).
2. Open the [Steamy34 page on Sleazy Fork](https://sleazyfork.org/en/scripts/606445-steamy34) and click **Install this script**.
3. Open rule34.xxx. A short welcome tour shows the best features.

**Updates:** automatic. Tampermonkey checks Sleazy Fork for new versions and installs them for you – your settings, history and followed artists always stay. (`Steamy34.user.js` in this repository is the file Sleazy Fork takes its updates from; you don't need to download it.)

**On Android:** install **Firefox** from the Play Store, add **Tampermonkey** (Firefox ⋮ → Extensions), then install Steamy34. It switches to its phone layout by itself.

---

## Keyboard shortcuts (in the popup viewer)

| Key | What it does |
|---|---|
| ← / → (or A / D) | Previous / next post |
| B | Download the original, named after its tags |
| F | Add to your rule34 favourites |
| C | Add to one of your collections |
| T | Theater mode (only the picture) |
| W / S | Scroll to the comments and back (when A / D browsing is on) |
| Esc or middle click | Close the post |
| L | Follow (or unfollow) the post's artist |
| X | Censored mode: blur every picture, video and comment (anywhere, not just the popup) |
| G | Open / close the Following window (anywhere; ← / → switch artists there) |

All keys can be changed in *Settings → Viewing posts*, *Settings → Following* and *Settings → Downloads*.

---

## FAQ

### What is Steamy34?
A free userscript that upgrades rule34.xxx: dark mode, popup viewer, easier tag search, tag-named downloads, artist following and a phone layout. It runs in your browser through Tampermonkey or Violentmonkey.

### Is there a dark mode for rule34.xxx?
Yes. Steamy34 has three colour modes: White, Dark and OLED (true black). Pick one in the sidebar, in the welcome tour or in Settings → Look.

### How do I download from rule34.xxx with the tags in the file name?
Install Steamy34 and press **B** on any post (or click Download in the popup). The file is saved in full resolution and named like `[character] [series] [artist] #12345.jpg`. You can switch to the classic `Character_Series_Artist_Resolution` style in Settings → Downloads.

### Can I download many rule34 posts at once?
Yes. Use "Batch download" in the sidebar, tick the posts you want (or "Select all new") and start. A panel shows the progress with Pause and Cancel. You can also download a whole collection.

### Can I save rule34 downloads to a specific folder?
Yes, in Chrome, Edge and Brave: Settings → Downloads → *Choose folder…*. In Brave, first turn on `brave://flags/#file-system-access-api`. Firefox and phones save to the normal Downloads folder.

### How do I follow an artist on rule34.xxx and see their new posts?
Open a post and click the bell next to the artist's name. The artist then appears in the sidebar under "Following", with a count of their new posts. Click the artist (or press G) to see their newest posts in the Following window – the ones since your last visit are marked NEW.

### Is there a popup viewer for rule34.xxx?
Yes. With Steamy34, every post opens in a large viewer on top of the list, with tags, comments, votes and favourites. Browse with the arrow keys (or A / D), close with Esc or a middle click.

### Does Steamy34 work on phones?
Yes, on Android with Firefox and Tampermonkey. It uses a touch-friendly layout: swipe to browse, swipe down or press Back to close a post, and one ☰ Menu for all tools. Steamy34 is made and tested for Android; iPhones and iPads aren't tested.

### Does Steamy34 collect any data?
No. It only talks to rule34.xxx itself. Everything it remembers (settings, searches, collections, viewed and downloaded posts, followed artists) stays in your browser. Settings → Privacy & data shows all of it and lets you delete it.

### Do I need a rule34.xxx account?
No. Only favourites, voting and comments need a rule34.xxx login. Everything else works without one.

### Is Steamy34 free? Is it official?
It's free and will never be monetized. It's a fan-made hobby project by steamycorner, not made by or connected to rule34.xxx.

### Can I move my settings to another browser or my phone?
Yes. Settings → Backup saves everything to a file; restore it on the other device.

### Which browsers are supported?
Any browser with Tampermonkey or Violentmonkey: Chrome, Firefox, Edge, Brave, Waterfox, Opera and others. On Android: Firefox.

### How do I install and update Steamy34?
Install it from its [Sleazy Fork page](https://sleazyfork.org/en/scripts/606445-steamy34) with one click. Updates come automatically: Tampermonkey checks Sleazy Fork regularly (or right away via Tampermonkey → Utilities → "Check for userscript updates"). Your settings and data are kept with every update.

### Something doesn't work. Where do I report it?
Post it in #feedback on the [steamycorner Discord](https://discord.gg/Udg9sNTBHb) or in the Feedback tab on the Sleazy Fork page. A short description of what you did and what happened helps most.

---

## License

[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/): you may share and change Steamy34 – as long as you **credit steamycorner** (with a link to the original), **don't use it commercially** (no selling, no paywalls, no ads) and **share changed versions under the same license**. See [LICENSE](LICENSE).

*(Versions up to Beta 3.4 were released under CC0 1.0.)*
