GLITCHED MATRIX Prototype Lab GitHub Site Refresh
=================================================

Use this folder as the replacement GitHub Pages site bundle.

What changed:
- Homepage wording now reflects the latest HoloVerse, MatrixCore, Gleebs, Urban Warzone, Metropolis Robot Selector, and Prototype Lab inventory.
- Patch notes were refreshed at assets/data/combined_patch_notes.txt while preserving the older exported history below the new notes.
- New optimized images were added from the current Prototype Lab build, including at least one Gleebs image.
- The existing layout, navigation, trailer, admin panel, lightbox, Steam link, and page structure were preserved.

Easiest image replacement:
1. Open assets/images/site_current/.
2. Replace an image with a new image using the same filename.
3. Open assets/data/image_manifest.json and change assetVersion to a new value.
4. Upload/commit the site files.

Advanced image replacement:
- Edit assets/data/image_manifest.json and change the image paths.
- You can also open the live editor with ?admin=1 or Ctrl+Shift+A while viewing the page.

Main files:
- index.html
- style.css
- admin.js
- assets/data/combined_patch_notes.txt
- assets/data/image_manifest.json
- assets/images/site_current/


Playable demo gallery
=====================

This refresh adds a Play Demos section to the static GitHub Pages site. The first playable demos are generated browser/canvas slices for Sky and Ground, Block Busters, Duck n Cover, and Where's Renaldo. They do not load sprite, sound, or Python runtime assets.

To update the demo grid without changing the layout:

1. Edit assets/data/demo_manifest.json.
2. Replace thumbnails in assets/images/site_current/demo_thumbs using the same filenames, or change the thumbnail paths in the manifest.
3. Bump assetVersion in demo_manifest.json so browsers refresh cached thumbnails.

Future demo slots are already present for Mewtants, DreamCrawler2D, Helix Biogenics, Isometric World Machine, and Holo Campaign. HoloVerse is intentionally not embedded yet.
