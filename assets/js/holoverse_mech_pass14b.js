(() => {
  'use strict';

  const scripts = [
    {
      src: './assets/js/matrixcore_story_fix_pass42e.js?v=20260529-pass42e-story-panel',
      marker: 'data-matrixcore-story-fix-pass42e'
    },
    {
      src: './assets/js/site_refresh_july2026.js?v=20260731-site-refresh',
      marker: 'data-site-refresh-july2026'
    },
    {
      src: './assets/js/itch_game_grid.js?v=20260804-itch-game-grid',
      marker: 'data-itch-game-grid'
    }
  ];

  function loadScript(entry) {
    if (document.querySelector(`script[${entry.marker}="true"]`)) return;
    const script = document.createElement('script');
    script.src = entry.src;
    script.async = false;
    script.setAttribute(entry.marker, 'true');
    document.head.appendChild(script);
  }

  function mount() {
    scripts.forEach(loadScript);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount, { once: true });
  } else {
    mount();
  }
})();
