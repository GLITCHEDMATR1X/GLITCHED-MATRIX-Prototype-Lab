Matrix OS Site Bundle — Updated

What changed:
- Uses the newer uploaded art and screenshots more aggressively.
- Adds the YouTube trailer embed.
- Adds VR support / immersive platform messaging.
- Adds a Lore section with the requested Read More link.
- Adds a more robust local admin editor.
- Adds assetVersion cache-busting so replaced images appear sooner.

Important:
- This is still a static GitHub Pages site.
- The admin editor is local to the browser via localStorage.
- Pure GitHub Pages cannot securely restrict admin mode to “logged into GitHub only” without an external GitHub App or OAuth backend.
- If you want a local admin prompt, set ADMIN_PIN in admin.js.

If replaced images do not appear:
1. Change the assetVersion value in the admin panel.
2. Save.
3. Hard refresh with Ctrl+F5.
