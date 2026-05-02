(()=>{
  'use strict';

  const LIVE_SCRIPT = './assets/js/holoverse_mini_ringworld_pass21.js?v=20260502-pass21-living-watch';

  function mount() {
    const demoCanvas = document.getElementById('demoCanvas');
    if (demoCanvas) {
      window.canvas = demoCanvas;
    }

    if (document.querySelector('script[data-holoverse-pass21-loader="true"]')) {
      return;
    }

    const script = document.createElement('script');
    script.src = LIVE_SCRIPT;
    script.async = false;
    script.dataset.holoversePass21Loader = 'true';
    document.head.appendChild(script);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount, { once: true });
  } else {
    mount();
  }
})();
