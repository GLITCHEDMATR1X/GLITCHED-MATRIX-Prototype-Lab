(()=>{
  'use strict';

  const LIVE_SCRIPT = './assets/js/holoverse_mini_ringworld_pass22.js?v=20260502-pass22-smart-bot-ecology';

  function mount() {
    const demoCanvas = document.getElementById('demoCanvas');
    if (demoCanvas) {
      window.canvas = demoCanvas;
    }

    if (document.querySelector('script[data-holoverse-pass22-loader="true"]')) {
      return;
    }

    const script = document.createElement('script');
    script.src = LIVE_SCRIPT;
    script.async = false;
    script.dataset.holoversePass22Loader = 'true';
    document.head.appendChild(script);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount, { once: true });
  } else {
    mount();
  }
})();
