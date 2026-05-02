# HoloVerse AI Pass Guardrails

This file is for future AI/code passes. Read it before touching the website HoloVerse demo.

## Current goal

The public HoloVerse web demo is a clean visible-world / living-world survey prototype. It should show readable regions, bots, objects, roads, resources, structures, and MatrixCore/HoloVerse direction.

The active site flow is:

- `index.html` loads `assets/js/holoverse_mech_pass14b.js` as the stable shim.
- The shim promotes the demo under the hero, applies public-facing copy, and loads the current live runtime.
- The current live runtime is `assets/js/holoverse_mini_ringworld_pass27.js`.

## Do not regress these decisions

- Do not bring back cockpit, FPS, pointer-lock, mouse-look, weapon, mech-guard, suit-assist, or first-person framing for the public HoloVerse website demo unless explicitly requested.
- Do not overwrite the current live runtime with older Pass 14/15/16/17/18/19/20/21/22/23 branch code.
- Do not use public update cards for internal cache-key notes, media-slot cleanup, route-debug noise, or AI maintenance chatter.
- Do not replace visible world objects with labels only. Regions need readable content: trees, animals, mushrooms, roads, buildings, towers, traffic/cargo lanes, bots, and Dyson panels.
- Do not edit `index.html` casually. It is large and has older inline behavior; prefer small, targeted edits with a clear reason.

## What to improve next

- Add stronger visible region variety without cluttering the canvas.
- Make bots more readable and more tied to their region purpose.
- Improve click inspection for objects, bots, and regions.
- Improve public-facing copy only when it helps players understand the project.
- Preserve 16:9 canvas behavior and side-panel dashboard layout.

## Required review before a pass

Before changing files, compare the branch against `main` and check whether the branch is older than the current runtime. Many pass branches are behind `main` and should not be merged blindly.

Before committing, search for stale framing terms:

```text
cockpit
first-person
pointer-lock
mouse-look
mech guard
suit assist
FPS
pass15-gallery-holoverse
```

If those terms appear in active public copy or live runtime code, remove or rewrite them unless they are historical notes in documentation.

## Testing checklist

At minimum:

1. Confirm `index.html` still loads `assets/js/holoverse_mech_pass14b.js`.
2. Confirm the shim still loads `assets/js/holoverse_mini_ringworld_pass27.js` or the intentionally newer runtime.
3. Confirm there are no conflict markers.
4. Confirm the public demo title/copy matches visible-world HoloVerse, not old mech/FPS wording.
5. Confirm the public Updates panel shows curated public project direction, not old internal pass notes.
6. Run a JavaScript syntax check on changed `.js` files when possible.

## Tone for future AI passes

Be conservative. Do not chase flashy features while the public demo is still trying to become readable and trustworthy. Preserve what works, remove stale pass residue, and keep the visible HoloVerse world aligned with the MatrixCore/Prototype Lab direction.
