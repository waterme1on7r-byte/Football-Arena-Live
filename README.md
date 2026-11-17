# Football Arena Web

A browser version of Football Arena built around the desktop app’s main screen and controls. It includes saved site chips, Quick access, the site options menu, add/edit/delete, drag-to-reorder, Auto/1–4 panel layouts, Close all, address editing, fullscreen, open-in-new-tab, and JSON import/export. The site list and current layout are saved in the browser.

Chat, GoodbyeDPI/SpoofDPI, ad blocking, and automatic ad skipping are intentionally omitted.

Browser security also prevents one origin from controlling another origin’s media volume or reliably checking the remote site’s health. Those desktop controls are omitted. Sites that block embedding must be opened in a separate browser tab.

## GitHub Pages deployment

1. Create a **public** GitHub repository named `football-arena` (or another name you prefer).
2. Upload the files in this folder to the repository root, including `.github/workflows/pages.yml`.
3. In **Settings → Pages**, set the source to **GitHub Actions**.
4. Push to `main` (or run the workflow from **Actions**) to publish. The deployment job will show the resulting URL.

The default address is `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`. A repository named `YOUR-USERNAME.github.io` uses the shorter `https://YOUR-USERNAME.github.io/` address. GitHub Pages supports custom domains if you later register one.

## Browser limitations

Some sites prevent being displayed inside another page. Use the open-in-new-tab button on a panel in that case. The website cannot bypass a site’s embedding restrictions. Hosting under GitHub Pages also cannot guarantee access from every Turkish ISP.
