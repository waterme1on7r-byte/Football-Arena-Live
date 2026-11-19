<div align="center">

# ⚽ KICKOFF!

**A multi-panel web viewer for the sites you follow — arrange up to four side by side, in English or Türkçe.**

[![Deploy to GitHub Pages](https://github.com/waterme1on7r-byte/kickoff/actions/workflows/pages.yml/badge.svg)](https://github.com/waterme1on7r-byte/kickoff/actions/workflows/pages.yml)
![No build step](https://img.shields.io/badge/build-none-brightgreen)
![Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen)
![Vanilla JS](https://img.shields.io/badge/vanilla-HTML%20%7C%20CSS%20%7C%20JS-f5c451)
![Languages](https://img.shields.io/badge/languages-EN%20%7C%20TR-blue)

[**Open the app**](https://waterme1on7r-byte.github.io/kickoff/) · [Report a bug](https://github.com/waterme1on7r-byte/kickoff/issues) · [Request a feature](https://github.com/waterme1on7r-byte/kickoff/issues)

</div>

---

## Table of contents

- [About](#about)
- [Features](#features)
- [Quick start](#quick-start)
- [Usage](#usage)
  - [Managing sites](#managing-sites)
  - [Panel layouts](#panel-layouts)
  - [Quick access](#quick-access)
  - [Backup and restore](#backup-and-restore)
  - [Language](#language)
  - [Install on iPhone](#install-on-iphone)
- [Configuration and customization](#configuration-and-customization)
- [Project structure](#project-structure)
- [How it works](#how-it-works)
- [Deployment (GitHub Pages)](#deployment-github-pages)
- [Browser support](#browser-support)
- [Limitations and troubleshooting](#limitations-and-troubleshooting)
- [Privacy](#privacy)
- [Contributing](#contributing)
- [Disclaimer](#disclaimer)
- [License](#license)

## About

**KICKOFF!** is a lightweight, installable web app that puts all of your favorite sites in one screen. Save your sites as chips, click to open them as panels, and tile one to four of them side by side — ideal for following several matches, scoreboards, or pages at the same time.

It is a static site: plain HTML, CSS, and JavaScript with **no frameworks, no build step, and no dependencies**. Everything you save stays in your own browser.

The mobile layout is designed and tuned for iPhone (including the iPhone 15 Pro), with safe-area support, a pinned **Quick access** button, and Add-to-Home-Screen support.

## Features

- **Saved site chips** — one-tap open and close for every site in your list.
- **Multi-panel arena** — open several sites at once and arrange them with **Auto, 1, 2, 3, or 4** columns.
- **Quick access** — a separate shortlist for the sites you use most, one tap from anywhere.
- **Full site management** — add, edit, delete, and **drag to reorder** chips.
- **Per-panel controls** — editable address bar, reload, open in a new tab, and fullscreen.
- **English / Türkçe toggle** — switch instantly without reloading your open panels; your choice is remembered.
- **Backup and restore** — export your list to JSON and import it on another device or browser.
- **Installable** — web app manifest and Apple touch icon for a standalone, app-like experience.
- **Mobile-first details** — stacked panels, large touch targets, safe-area aware, and a Quick access button that stays within reach.
- **Private by design** — no accounts, no analytics, no server; panels load with `no-referrer`.

## Quick start

### Use it online

Open **<https://waterme1on7r-byte.github.io/kickoff/>** in any modern browser.

### Run it locally

No install is needed. Clone the repository and serve the folder with any static file server:

```bash
git clone https://github.com/waterme1on7r-byte/kickoff.git
cd kickoff

# Option A: Python
python3 -m http.server 8080

# Option B: Node
npx serve .
```

Then open <http://localhost:8080>.

> **Tip:** You can also open `index.html` directly from disk, but serving over HTTP(S) is recommended so the web manifest and embedded sites behave as they do in production.

## Usage

### Managing sites

| Action | How |
| --- | --- |
| **Add a site** | Tap **Add site**, enter a name and an `http(s)` address, and save. |
| **Open / close a panel** | Tap the site's chip. Highlighted chips are currently open. |
| **Edit, delete, or add to Quick access** | Tap the **⋮** button on a chip to open its options menu. |
| **Reorder** | Drag chips into place (desktop and other pointer devices). |
| **Change a panel's address** | Edit the address bar in the panel header and press **Enter**. Press **Esc** to revert. |
| **Reload / open in a new tab / fullscreen** | Use the **↻**, **↗**, and **⛶** buttons in the panel header. |
| **Close every panel** | Tap **Close all**. |

### Panel layouts

Use the layout selector to choose how many columns the open panels use:

- **Auto** — picks a sensible grid for the number of open panels.
- **1 – 4** — forces that number of columns.

On phones, panels always stack vertically for readability, and the layout selector is hidden.

### Quick access

Quick access is a shortlist for your most-used sites. Add a site to it from its **⋮** menu or by ticking **Add to Quick access** in the add/edit dialog. The button shows how many sites it holds. On mobile it stays pinned to the bottom of the screen while you scroll.

### Backup and restore

Open **Settings** to:

- **Export sites** — downloads `kickoff-sites.json`.
- **Import sites** — adds sites from a JSON file. Sites whose address already exists are skipped, so importing is safe to repeat.

The accepted format is a list of sites (or an object with a `sites` list):

```json
[
  { "name": "Example Scores", "url": "https://example.com/" },
  { "name": "Example Live", "url": "https://example.org/", "quick": true }
]
```

Rules: `name` is required (up to 40 characters), `url` must be `http` or `https`, and `quick` is optional.

### Language

Use the **EN | TR** toggle in the top bar. The app switches language immediately, including menus, dialogs, tooltips, and messages, and remembers your choice. Site names and addresses are never translated.

### Install on iPhone

1. Open the app in **Safari**.
2. Tap the **Share** button.
3. Choose **Add to Home Screen**.

KICKOFF! then launches full screen like a native app.

## Configuration and customization

| I want to… | Where |
| --- | --- |
| Change the default language | In `app.js`, change `let lang = "en";` to `"tr"`. To follow the visitor's browser instead, use `let lang = (navigator.language \|\| "").toLowerCase().startsWith("tr") ? "tr" : "en";` |
| Change the starter site list | Edit `DEFAULT_SITES` at the top of `app.js`. It only applies to visitors who have not saved a list yet. |
| Add another language | Add a new object to `I18N` in `app.js` (copy the `en` block), then add a button with a matching `data-lang` value inside `#lang` in `index.html`. |
| Change colors | Edit the CSS variables (`--bg`, `--panel`, `--gold`, …) at the top of `style.css`. |
| Adjust the mobile bottom spacing | Change `--qgap` in the mobile section of `style.css`. |
| Change app name or icons | Edit `kickoff.webmanifest` and replace the icon files (`kickoff-touch.png`, `kickoff-icon-192.png`, `kickoff-icon-512.png`, `favicon.ico`). Keep the `?v=` number in `index.html` and bump it so browsers fetch the new icons. iPhone caches Home Screen icons, so remove and re-add the app to see a change. |

## Project structure

```text
kickoff/
├── .github/
│   └── workflows/
│       └── pages.yml          # GitHub Pages deployment
├── index.html                 # Markup, dialogs, and static translatable text
├── app.js                     # App logic, translations, storage
├── style.css                  # Desktop and mobile styling
├── kickoff.webmanifest        # Installable web app manifest
├── kickoff-touch.png          # 180×180 Apple touch icon (iPhone Home Screen)
├── kickoff-icon-192.png       # Manifest icon
├── kickoff-icon-512.png       # Manifest icon
├── favicon.ico                # Browser tab icon (16–256 px)
├── favicon-32.png             # Browser tab icon (PNG)
└── README.md
```

## How it works

- **State** — your sites, layout, open panels, and language are stored in `localStorage` under the keys `fa.web.sites`, `fa.web.layout`, `fa.web.open`, and `fa.web.lang`.
- **Panels** — each panel is an `<iframe>` created on demand. Redrawing the interface (for example switching language) updates text in place, so open panels are **not** reloaded.
- **Translations** — translatable elements carry `data-i18n-*` attributes. A small `t()` helper looks up text in the `I18N` dictionary and applies it, so adding a language needs no changes to the rendering code.
- **Validation** — only `http` and `https` addresses are accepted, and all site text is inserted as plain text rather than HTML.

## Deployment (GitHub Pages)

The repository includes a ready-to-use workflow at `.github/workflows/pages.yml`.

1. In your repository, open **Settings → Pages**.
2. Set **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the **Actions** tab).
4. The deployment job prints the live URL when it finishes.

The default address is `https://<your-username>.github.io/<repository-name>/`. A repository named `<your-username>.github.io` is served from the shorter `https://<your-username>.github.io/`. GitHub Pages also supports custom domains.

## Browser support

KICKOFF! works in current versions of Safari, Chrome, Edge, and Firefox. It relies on the HTML `<dialog>` element and modern JavaScript, so on iOS you need **Safari 15.4 or later**.

## Limitations and troubleshooting

**A panel stays blank or shows "Can't display this site here."**
Many websites forbid being shown inside another page (via `X-Frame-Options` or a `frame-ancestors` policy). KICKOFF! cannot bypass this. Use the **↗** button to open that site in a new tab.

**A site doesn't load for me but loads for others.**
Access to individual websites can depend on your network or internet provider. Hosting on GitHub Pages cannot guarantee access from every network.

**I can't control another site's volume or see whether it is online.**
Browser security isolates sites from one another, so this page cannot change another site's media volume or reliably check whether its links are up.

**Drag-to-reorder doesn't work on my phone.**
Reordering uses the browser's drag-and-drop, which is not supported by most touch browsers. Reorder on a desktop browser, or export, edit, and re-import your JSON file.

**My list disappeared.**
The list is saved per browser and per address. Clearing site data, using private browsing, or opening the app from a different URL starts with a fresh list. Use **Export sites** regularly to keep a backup.

## Privacy

- There is no backend, account system, analytics, or tracking.
- Your settings and site list never leave your browser.
- Panels are loaded with `referrerPolicy="no-referrer"`.
- The page loads one web font (*Big Shoulders Display*) from Google Fonts. Everything else is local.
- Sites you open inside panels are third-party pages with their own cookies and privacy policies.

## Contributing

Contributions, bug reports, and ideas are welcome.

1. [Open an issue](https://github.com/waterme1on7r-byte/kickoff/issues) to discuss a change, or pick an existing one.
2. Fork the repository and create a branch: `git checkout -b feature/my-change`.
3. Keep to the project's spirit: vanilla JavaScript, no build tooling, no runtime dependencies.
4. If you add or change visible text, update **both** the `en` and `tr` entries in `I18N`.
5. Test on desktop and on a phone-sized viewport, then open a pull request describing what changed and why.

## Disclaimer

KICKOFF! is only a viewer. It does not host, stream, store, or distribute any content, and it is not affiliated with any website you add. You are responsible for the sites you open and for making sure your use complies with their terms and the laws that apply to you.

## License

No license has been specified for this project yet. Until one is added, all rights are reserved by the author. To make the project open source, add a `LICENSE` file (for example, [MIT](https://choosealicense.com/licenses/mit/)) and update this section.

---

<div align="center">

Made with ⚽ by **WTMLJR**

</div>
