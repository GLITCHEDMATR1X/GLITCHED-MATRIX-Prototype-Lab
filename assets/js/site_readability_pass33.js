(() => {
  'use strict';

  const VERSION = 'pass36-vector-holocore-copy';
  const STYLE_ID = 'site-readability-pass36-runtime-style';
  const STRIP_ID = 'siteReadabilityStrip';

  const runtimeStyle = `
    body.site-readability-pass33 .single-holoverse-section.demo-featured-top .demo-player-layout,
    body.site-readability-pass33 .demo-player-layout {
      grid-template-columns: minmax(0, 1.35fr) minmax(340px, 0.5fr) !important;
      grid-template-areas:
        "canvas left"
        "canvas right"
        "goals goals" !important;
      gap: clamp(14px, 1.4vw, 22px) !important;
      align-items: stretch !important;
    }
    body.site-readability-pass33 .demo-info-left { grid-area: left !important; }
    body.site-readability-pass33 .demo-info-right { grid-area: right !important; }
    body.site-readability-pass33 .demo-canvas-shell {
      grid-area: canvas !important;
      min-height: clamp(430px, 38vw, 660px) !important;
      aspect-ratio: 16 / 9 !important;
    }
    body.site-readability-pass33 .demo-canvas {
      height: 100% !important;
      min-height: clamp(410px, 36vw, 630px) !important;
      max-height: 660px !important;
    }
    body.site-readability-pass33 #holoverseGoalAlignmentPanel,
    body.site-readability-pass33 .holo-goal-panel { grid-area: goals !important; }
    body.site-readability-pass33 .demo-info-panel {
      max-height: none !important;
      overflow: visible !important;
    }
    body.site-readability-pass33 .holo-card p,
    body.site-readability-pass33 .demo-info-panel p,
    body.site-readability-pass33 .demo-help-list dd {
      font-size: clamp(0.96rem, 0.82vw, 1.06rem) !important;
      line-height: 1.62 !important;
      color: #d5e1e7 !important;
    }
    @media (max-width: 1280px) {
      body.site-readability-pass33 .single-holoverse-section.demo-featured-top .demo-player-layout,
      body.site-readability-pass33 .demo-player-layout {
        grid-template-columns: 1fr !important;
        grid-template-areas:
          "left"
          "canvas"
          "right"
          "goals" !important;
      }
    }
  `;

  const cards = [
    ['Vector Wars preview', 'Urban is now framed as the public action hook: Sable, machines, capture pressure, and battlefield identity.'],
    ['Readable world map', 'The HoloVerse command map stays prominent without forcing a massive browser workload.'],
    ['HoloCore mystery', 'HoloCore is presented as the hidden mind beneath HoloVerse, not as a normal game mode.'],
    ['Controls', 'Click a region, drag to pan, use the wheel to zoom, F to fit, and H to return home.']
  ];

  function installRuntimeStyle() {
    let style = document.getElementById(STYLE_ID);
    if (!style) {
      style = document.createElement('style');
      style.id = STYLE_ID;
      document.head.appendChild(style);
    }
    if (style.textContent !== runtimeStyle) style.textContent = runtimeStyle;
  }

  function setText(id, text) {
    const element = document.getElementById(id);
    if (element && element.textContent !== text) element.textContent = text;
  }

  function ensureReadabilityStrip() {
    const demo = document.getElementById('demos');
    const head = demo ? demo.querySelector('.demo-head') : null;
    if (!demo || !head) return;

    let strip = document.getElementById(STRIP_ID);
    if (!strip) {
      strip = document.createElement('div');
      strip.id = STRIP_ID;
      strip.className = 'site-readability-strip';
      head.insertAdjacentElement('afterend', strip);
    }

    if (strip.dataset.version === VERSION) return;
    strip.innerHTML = cards.map(([title, body]) =>
      `<div class="site-readability-card"><strong>${title}</strong><span>${body}</span></div>`
    ).join('');
    strip.dataset.version = VERSION;
  }

  function tuneCanvasResolution() {
    const canvas = document.getElementById('demoCanvas');
    if (!canvas) return;
    if ((canvas.getAttribute('width') || '') !== '1280') canvas.setAttribute('width', '1280');
    if ((canvas.getAttribute('height') || '') !== '720') canvas.setAttribute('height', '720');
  }

  function simplifyPublicCopy() {
    setText('demoSectionTitle', 'Vector Wars — Urban Warzone Preview');
    setText(
      'demoSectionIntro',
      'A command-map preview of Sable’s Urban region: the machine-war layer inside HoloVerse where combat, drones, mechs, capture pressure, and score-driven action will take focus.'
    );
    setText(
      'demoSectionNote',
      'Site pass 36: Vector Wars is now the public playable hook, HoloCore is treated as the hidden mind beneath HoloVerse, and public copy avoids deeper archive-system naming.'
    );
    setText(
      'demoControls',
      'Click a region. Drag to pan. Wheel zooms. F fits the world. H returns home.'
    );
  }

  function removeTinyPanelScroll() {
    document.querySelectorAll('.demo-info-panel').forEach((panel) => {
      if (panel.style.maxHeight !== 'none') panel.style.maxHeight = 'none';
      if (panel.style.overflow !== 'visible') panel.style.overflow = 'visible';
    });
  }

  function run() {
    document.body.classList.add('site-readability-pass33');
    document.documentElement.dataset.siteReadabilityPass = VERSION;
    installRuntimeStyle();
    ensureReadabilityStrip();
    tuneCanvasResolution();
    simplifyPublicCopy();
    removeTinyPanelScroll();
  }

  function schedule() {
    run();
    [120, 420, 1000, 2200].forEach((delay) => window.setTimeout(run, delay));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', schedule, { once: true });
  } else {
    schedule();
  }
})();