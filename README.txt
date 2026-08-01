TRACY'S GARDEN — BIRTHDAY EDITION
=================================

FILES TO UPLOAD TO GITHUB
-------------------------
Upload everything in this folder, preserving the icons folder:

index.html
style.css
script.js
manifest.webmanifest
sw.js
icons/

GITHUB PAGES
------------
1. Create a new GitHub repository, for example: tracys-garden
2. Upload all files and the icons folder to the repository root.
3. Open the repository's Settings.
4. Select Pages.
5. Under Build and deployment, select:
   Source: Deploy from a branch
   Branch: main
   Folder: /(root)
6. Save and wait for GitHub to publish the site.

The address will normally look like:
https://YOUR-GITHUB-USERNAME.github.io/tracys-garden/

INSTALL ON TRACY'S GALAXY
-------------------------
1. Open the published GitHub Pages address in Chrome.
2. Open Chrome's menu (three dots).
3. Choose Install app or Add to Home screen.
4. Confirm the installation.

The app should launch in a standalone window and will cache its core files for offline opening after the first successful online visit.

FINAL FIRST-VISIT RESET
-----------------------
Before giving the phone to Tracy, clear any test names from the deployed Garden:

1. Open the Garden in Chrome.
2. Press F12 on a computer, or clear the site's stored data in Chrome settings on the phone.
3. On a computer, this console command clears only the Garden's saved identity:

localStorage.removeItem("tracysGardenKeeper");
location.reload();

You can also use the Garden's “Welcome Someone New” button once names have been saved.

IMPORTANT UPDATE NOTE
---------------------
The service worker caches the Birthday Edition. After uploading a later update, change this line in sw.js:

const CACHE_NAME = "tracys-garden-birthday-v1";

to a new value such as:

const CACHE_NAME = "tracys-garden-birthday-v2";

This prompts installed copies to refresh their cached files.

HAPPY BIRTHDAY, TRACY
---------------------
This Garden was lovingly cultivated to offer welcome, smiles, and a peaceful place to stay awhile.
