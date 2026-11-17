# Football Arena Web

Static web adaptation of Football Arena. It keeps the multi-panel site launcher, editable/saved site list, drag-to-reorder, layout selection, local browser storage, and JSON import/export. It does not include desktop-only network tools, ad blocking/skipping, or chat.

## GitHub Pages deployment

1. Create a **public** GitHub repository named `football-arena` (or another name you prefer).
2. Upload the files in this folder to the repository root, including `.github/workflows/pages.yml`.
3. In **Settings → Pages**, set the source to **GitHub Actions**.
4. Push to `main` (or run the workflow from **Actions**) to publish. The deployment job will show the resulting URL.

The default address is `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`. A repository named `YOUR-USERNAME.github.io` uses the shorter `https://YOUR-USERNAME.github.io/` address. GitHub Pages supports custom domains if you later register one.

## Browser limitations

Some sites prevent being displayed inside another page. Those sites may need to open in a separate browser tab, and the app cannot bypass those sites' embedding restrictions. Site availability and access from Turkish networks can vary by provider.
