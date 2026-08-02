TRACY'S GARDEN — FINAL BIRTHDAY EDITION
=======================================

IMPORTANT: Upload every item in this folder directly to the ROOT of the GitHub repository.
Do not upload the enclosing folder as a single nested folder.

The repository root should visibly contain:
  index.html
  style.css
  script.js
  manifest.webmanifest
  sw.js
  icons/  (folder)

GITHUB PAGES
------------
1. Create or open the GitHub repository.
2. Delete/replace the older Garden files so there is only one current copy.
3. Upload ALL files and the icons folder from this package to the repository root.
4. Commit the upload.
5. Open Settings > Pages.
6. Choose Deploy from a branch.
7. Select branch: main and folder: /(root), then Save.
8. Open the published HTTPS GitHub Pages address.

INSTALL ON TRACY'S GALAXY
-------------------------
1. Remove any older Tracy's Garden shortcut/app from the home screen.
2. Open the published HTTPS address in Chrome.
3. Wait several seconds for the Garden and service worker to finish loading.
4. If "Install Tracy's Garden" appears on the welcome card, tap it.
5. Otherwise open Chrome's three-dot menu and choose "Install app" or "Add to Home screen".
   A valid PWA should be offered as an app installation rather than only a basic bookmark shortcut.
6. Open the installed Garden from its floral gate icon.

If Chrome still offers only a shortcut:
- Confirm the site address begins with https://
- Confirm the icons folder exists beside index.html on GitHub
- Open these URLs in Chrome and make sure none show 404:
    .../manifest.webmanifest
    .../sw.js
    .../icons/icon-192.png
- Refresh the published page twice, then try installation again.

FINAL FIRST-VISIT RESET
-----------------------
Before Tracy's first visit, open the published site in Chrome, press F12 on a computer,
open Console, and run:

  localStorage.removeItem("tracysGardenKeeper");
  location.reload();

On the phone, using Chrome Settings > Site settings > All sites > the GitHub Pages site >
Clear & reset will also clear the remembered test names. Do this only before her first visit.

NEW IN THIS EDITION
-------------------
- Full PWA icon set and explicit installation button
- Planter sees the word while typing, then must conceal it before planting
- Gardener's personal welcome remains on screen longer
- Planter and Gardener automatically exchange roles after each completed round
- Next-round role message appears in Reflection
- Full-screen Garden entrance celebration on a completed word
- Offline caching and standalone display

Happy Birthday, Tracy. We're so glad you're here.
