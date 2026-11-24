# Steamy34 · Beta

An all-in-one upgrade for rule34.xxx: a cleaner look, a popup viewer, a much easier search and downloads with tag-named files – on your computer and on your Android phone.

> **A fan-made hobby project.** Steamy34 is made for fun. It's free and will never be monetized: no ads, no paid features, no data collection. It isn't made by or connected to rule34.xxx.

> **About the code.** Steamy34 is designed by steamycorner, a designer (web design, corporate identity, 3D) rather than a programmer. The code is written with AI (Claude), and bug fixes are made the same way, so mistakes are possible. Each version is tested before release. Problems can be reported on Discord or in the Feedback tab.

> **New in Beta 3.10: blur instead of hide, and better collections.** Any blacklisted tag can now **blur** its posts instead of hiding them: the tag is named and a **Show** button uncovers the post. A post with any other blacklisted tag still stays hidden. Collections get a **cover**, **sorting**, **drag to arrange** and a **note**. Plus: a **Similar** strip in the popup (more from the same artist and character, Shift + ← / → to go through it), buttons on phones by **holding a thumbnail**, and versions of the same picture grouped into one (with your API key).

> **Since Beta 3.9:** blocked stays blocked everywhere (lists, popup, comments, Collections, Downloads), tags **muted** for 24 hours or 7 days, backups that **combine**, Watch later, iCame in the popup, Find source / Upscale / Report, download subfolders per artist, calmer Artists, Wiki, Aliases and iCame pages. **Since 3.8:** collections on all your devices (optional), download and viewed buttons on the thumbnails, a Downloads window. **Since 3.7:** blacklists as long as you like, saved searches, an optional API key for fewer Cloudflare checks.

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
- **Similar** strip in the popup: more posts from the same artist and character, Shift + ← / → to go through it while ← / → stay on the page
- Slideshow (auto next post) with a timer, theater mode, zoom and video options
- Hover previews: videos play and score / resolution show when you hover a thumbnail
- Post pages: a click on the picture shows it at its real size; long comic strips fit the width and read from the top
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
- **Blocked stays blocked:** Steamy34 checks every post against your whole blacklist itself – on every list, while scrolling, in the popup and the Following window. A blacklisted post you open anyway is covered ("Show anyway" if you really want to)
- **Mute for a while:** hide a tag for 24 hours or 7 days – it comes back by itself
- **Blur instead of hide**, per tag: its posts show blurred with the tag named and a Show button (any other blacklisted tag still hides the post)

**Organising**
- Download and viewed buttons on the thumbnails: green = downloaded, blue = viewed. Hover the eye to mark a post as viewed – or as downloaded without downloading it. Every thumbnail item has its own switch
- Hides viewed or downloaded posts if you like
- Collections: your own folders of posts – optionally on all your devices (their posts are favourited too, so they're on your phone)
- Collection tools: pick a cover, sort the posts or drag them into your own order, add a note
- Your favourites page: mark all as viewed or downloaded, or select posts to download, put into a collection or unfavourite in one go
- A Downloads window with every post you downloaded, newest first
- Your stats: top artists, characters and series you've downloaded

**Downloads**
- Press **B** on a post to download it (the key can be changed in the settings) – or the ⬇ on a thumbnail, without opening it
- Downloads at maximum resolution, named `[character] [series] [artist] #post` (e.g. `[amelie lacroix] [overwatch] [someartist] #101.jpg`) – or the classic `Character_Series_Artist_Resolution` style
- Optional own download folder – pick any folder once, e.g. Eagle's watch folder (Chrome, Edge and Brave on computers)
- Batch download ticked posts or whole collections, with a progress panel (Pause / Cancel)
- Asks before downloading a post a second time (can be switched off)
- If the server doesn't answer, you get a message with a Retry button instead of a hanging download

**On your phone (Android)**
- Phone layout: in the popup the picture is on top, with info, tags and comments below
- Swipe left / right to browse, swipe down or press Back to close
- One ☰ Menu with Steamy34's tools (switches, Collections, Stats, Blacklist, Downloads, Settings, tips) and all of rule34's pages
- Their own thumbnail size (the Size slider in the menu); tag buttons and ♥ always visible, no data-hungry preloading
- Quick tips with a Phone tab that lists all gestures
- The Following window fills the screen; Back closes it

**More**
- Infinite scrolling with "Page N" dividers – and "Continue at page N" when you come back to a search
- New posts from what you follow show in the browser tab: "(12) rule34"
- With an ad blocker on, no empty ad spaces next to or above the posts (without one, every ad stays as rule34 shows it)
- Gentle on the site: page loads are spaced out, so Cloudflare checks come much less often. When one does come, a clear notice at the bottom of the screen shows it with a *Solve* button (and a *?* that explains why it matters) – without the check, rule34 loads nothing new. The check window also points to the optional API key, which makes checks rarer
- Steamy34 Settings sits in rule34's top menu, on every page
- A welcome guide on first start – every feature in chapters, a keyboard map of all keys and every touch gesture – quick tips with all the shortcuts, and a short "What's new" after notable updates
- Censored mode: press X and every picture, video and comment is blurred – share a screenshot safely
- Settings with a search box: type a word and jump straight to the right option
- Works with the keyboard (Tab, Enter) as well
- Backup and restore of all your settings and data – e.g. to move everything to your phone
- **Optional: your rule34 API key** (Settings → API key) for new-post counts and hover previews – fewer Cloudflare checks. The key only goes to rule34's own API, stays in your browser and is never in a backup. Steamy34 works just the same without it

## Good to know: the Cloudflare check

Now and then rule34 asks for a quick Cloudflare check. Steamy34 shows it as a **pulsing notice at the bottom** – click **Solve**, tick the box, done. Until it's solved, rule34 loads nothing new, so do it right away. (Steamy34 keeps checks rare by spacing out its page loads; an optional API key makes them rarer still.)

## Is it safe?

Things you can check yourself:
- **It can only talk to rule34.xxx** – the script header allows no other site, Tampermonkey enforces that and shows it before you install.
- **It only runs on rule34.xxx**, nowhere else in your browser.
- **Readable code** – under "Code" here and on GitHub, nothing scrambled.
- **Nothing collected, no server** – everything stays in your browser.
- **Written with AI help**, said openly; every version is tested before release.

## One device works best

Each browser keeps its own Steamy34 data (viewed / downloaded marks, follows, saved searches, collections, settings, the full blacklist). Favourites live on your rule34 account anyway; the blacklist travels with *Options → Save to account*. For the rest: *Settings → Privacy & data → Export backup*, then *Import backup* on the other device – importing **combines** (nothing is removed, each device keeps its own settings), so going back and forth keeps both in step.

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
