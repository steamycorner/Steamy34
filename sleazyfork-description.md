# Steamy34 · Beta

An all-in-one upgrade for rule34.xxx: a cleaner look, a popup viewer, a much easier search and downloads with tag-named files – on your computer and on your Android phone.

> **A fan-made hobby project.** Steamy34 is made for fun. It's free and will never be monetized: no ads, no paid features, no data collection. It isn't made by or connected to rule34.xxx.

> **About the code.** Steamy34 is designed by steamycorner, a designer (web design, corporate identity, 3D) rather than a programmer. The code is written with AI (Claude), and bug fixes are made the same way, so mistakes are possible. Each version is tested before release. Problems can be reported on Discord or in the Feedback tab.

> **New in Beta 3.7: blacklists as long as you like.** rule34 keeps your blacklist in one browser cookie of about 4,000 characters – longer lists quietly get lost. Steamy34 now keeps the whole list and hides the rest itself. The Blacklist panel is the same in the sidebar and on rule34's Options page, and Save puts your list on your account. Also new: saved searches with filters (the disk button next to Search), an optional API key for fewer Cloudflare checks, ♥ removes favourites too, My Account as tiles, Options in tidy groups, the video server in Steamy34's settings, and no more white flash while pages load.

> **Since Beta 3.6: the Following window.** Your followed artists in one window on top of the page you're on: a row of circles (a coloured ring = new posts), their newest posts in a grid below – NEW on the ones since your last visit. Open it with G or the sidebar's Following box. And rule34's start page is a small home: search, "Continue", your recent searches and the newest posts from who you follow.

## Features

**Look**
- White, Dark and OLED (true black) colour modes, each with depth (cards, panels, shadows) – rule34's own theme follows along, so pages don't flash white while they load
- A calm sidebar: search, what you follow, view switches and your tools – in four tidy groups; recent searches and favourite tags open as small menus next to it (on phones: a sheet from the bottom)
- Modern thumbnail layout (original ratios or square tiles), with a size slider
- VID / GIF labels, plus artist and character tags right on the thumbnails – or keep the pictures clean: tags and buttons in a strip below, or only on hover
- Rounded or square corners – your choice
- A start page that's a small home: your search, "Continue" where you left off, recent searches, favourite tags and the newest posts from who you follow
- My Account as tiles and Options in tidy groups, with the API field folded away

**Viewing posts**
- Popup viewer: open posts without leaving the page, browse with ← / → or WASD (at the end of the list the next page loads by itself), F / C / T for favourite, collection and theater mode, L to follow the artist, close with Esc or a middle click
- Comments (all of them, with "More comments"), votes, favourites, post info and parent / child / pool links inside the popup
- ♥ favourites both ways: ♥ again removes a favourite (with Undo) – on thumbnails, in the popup and right on your favourites page
- Slideshow (auto next post) with a timer, theater mode, zoom and video options
- Hover previews: videos play and score / resolution show when you hover a thumbnail
- Videos stall? Pick another video server in the settings

**Search, following & saved searches**
- Tags as bubbles you can add, remove or exclude with one click
- Filter menus for score, size, sort, type and rating
- Pinned filters that carry over to every new search
- Recent searches and favourite tags, one click away
- **Follow artists:** one click on the bell next to an artist – the sidebar lists everyone you follow, each with a count of their new posts
- **The Following window** (G): your artists as circles, their newest posts in a grid – always newest first, posts since your last visit marked NEW, "Open as a search" for every filter and sort
- **Saved searches:** the disk button next to Search saves a search with all its filters – listed under Following with its new posts; a click opens that search, with NEW on what's new

**Blacklist**
- One Blacklist panel – in the sidebar and on rule34's Options page – with tag types, sorting, a filter and your recent tags
- ⊘ next to any tag blacklists it; posts already on screen are greyed out, with Undo
- **As long as you like:** Steamy34 keeps the whole list and hides what doesn't fit into rule34's cookie itself
- Your account keeps a copy: tags not on it yet are marked, and Save on Options puts the list there

**Organising**
- Remembers viewed and downloaded posts (small icons on the thumbnails), and can hide them
- Local collections: save posts in your own folders
- Your stats: top artists, characters and series you've downloaded

**Downloads**
- Press **B** on a post to download it (the key can be changed in the settings)
- Downloads at maximum resolution, named `[character] [series] [artist] #post` (e.g. `[amelie lacroix] [overwatch] [someartist] #101.jpg`) – or the classic `Character_Series_Artist_Resolution` style
- Optional own download folder – pick any folder once, e.g. Eagle's watch folder (Chrome, Edge and Brave on computers)
- Batch download ticked posts or whole collections, with a progress panel (Pause / Cancel)
- Asks before downloading a post a second time (can be switched off)
- If the server doesn't answer, you get a message with a Retry button instead of a hanging download

**On your phone (Android)**
- Phone layout: in the popup the picture is on top, with info, tags and comments below
- Swipe left / right to browse, swipe down or press Back to close
- One ☰ Menu with Steamy34's tools (switches, Collections, Stats, Blacklist, Settings, tips) and all of rule34's pages
- Their own thumbnail size (the Size slider in the menu); tag buttons and ♥ always visible, no data-hungry preloading
- Quick tips with a Phone tab that lists all gestures
- The Following window fills the screen; Back closes it

**More**
- Infinite scrolling with "Page N" dividers – and "Continue at page N" when you come back to a search
- New posts from what you follow show in the browser tab: "(12) rule34"
- With an ad blocker on, no empty ad spaces next to or above the posts (without one, every ad stays as rule34 shows it)
- Gentle on the site: page loads are spaced out, so Cloudflare checks come much less often. When one does come, a clear notice at the bottom of the screen shows it with a *Solve* button (and a *?* that explains why it matters) – without the check, rule34 loads nothing new
- A short welcome tour on first start, quick tips with all the shortcuts, and a short "What's new" after notable updates
- Censored mode: press X and every picture, video and comment is blurred – share a screenshot safely
- Settings with a search box: type a word and jump straight to the right option
- Works with the keyboard (Tab, Enter) as well
- Backup and restore of all your settings and data – e.g. to move everything to your phone
- **Optional: your rule34 API key** (Settings → API key) for new-post counts and hover previews – fewer Cloudflare checks. The key only goes to rule34's own API, stays in your browser and is never in a backup. Steamy34 works just the same without it

## Privacy

Steamy34 collects **nothing**. It only talks to rule34.xxx itself, and everything it remembers (settings, searches, collections, viewed / downloaded posts, your blacklist, your chosen download folder) stays in your browser's script storage. *Settings → Privacy & data* shows exactly what's stored and how to delete it.

## Requirements

- A userscript manager: **Tampermonkey** or **Violentmonkey** (Chrome, Firefox, Edge, Waterfox and others).
- **Chrome, Edge, Brave:** Tampermonkey needs permission to run scripts – on the extensions page open its **Details** and turn on **Allow User Scripts** (older versions: turn on **Developer mode**).
- **Android:** install **Firefox** from the Play Store, add **Tampermonkey** (Firefox ⋮ → Extensions), then install Steamy34 from this page. Steamy34 switches to its phone layout by itself.
- **Own download folder:** works in Chrome and Edge. In Brave, first turn on `brave://flags/#file-system-access-api`. Firefox and phones save to the normal Downloads folder.
- Some features (favourites, voting, comments, saving the blacklist to your account) need a rule34.xxx login. Everything else works without one.

## Feedback

Questions, bugs or ideas? Join the **Steamy34 channels (#feedback, #new-ideas) on the [steamycorner Discord](https://discord.gg/Udg9sNTBHb)** – or leave feedback here. Every report helps: Steamy34 is in beta, and the beta is about polish and fixes. More from steamycorner: https://linktr.ee/steamycorner

## License

CC BY-NC-SA 4.0: share and change it as you like – as long as you credit steamycorner, don't use it commercially, and share changed versions under the same license. (Versions up to Beta 3.4 were CC0 1.0.)
