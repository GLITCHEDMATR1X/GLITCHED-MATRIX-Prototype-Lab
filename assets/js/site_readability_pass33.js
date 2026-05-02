(() => {
  'use strict';

  const VERSION = 'pass34-readable-site-freeze-fix';
  const STYLE_ID = 'site-readability-pass34-runtime-style';
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
    ['Readable layout', 'The page uses more of the screen instead of squeezing the lab into a tiny center column.'],
    ['Large demo view', 'The HoloVerse canvas stays prominent without forcing a massive browser workload.'],
    ['Cleaner panels', 'Side information has larger type, stronger contrast, and no trapped mini scroll boxes.'],
    ['Controls', 'Click the demo, then drag or use WASD. Shift pans faster, wheel zooms, F fits, H returns home.']
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
    setText('demoSectionTitle', 'HoloVerse Demo — Readable Living World');
    setText(
      'demoSectionIntro',
      'A wider, cleaner browser HoloVerse view with distinct regions, active bots, visible structures, readable side panels, and controls that are easy to understand.'
    );
    setText(
      'demoSectionNote',
      'Readable-site pass: the demo is now presented as the main feature with a larger canvas, stronger contrast, wider panels, less cramped text, and no page-freezing observer loop.'
    );
    setText(
      'demoControls',
      'Click the demo. Drag or WASD to pan. Shift moves faster. Wheel zooms. F fits the world. H returns home. Click objects or bots to inspect.'
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