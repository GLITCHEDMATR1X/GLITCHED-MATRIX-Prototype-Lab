(()=>{
  'use strict';

  const LIVE_SCRIPT = './assets/js/holoverse_mini_ringworld_pass19.js?v=20260501-pass20-live-civilians';

  function mount() {
    const demoCanvas = document.getElementById('demoCanvas');
    if (demoCanvas) {
      window.canvas = demoCanvas;
    }

    if (document.querySelector('script[data-holoverse-pass20-loader="true"]')) {
      return;
    }

    const script = document.createElement('script');
    script.src = LIVE_SCRIPT;
    script.async = false;
    script.dataset.holoversePass20Loader = 'true';
    document.head.appendChild(script);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount, { once: true });
  } else {
    mount();
  }
})();
