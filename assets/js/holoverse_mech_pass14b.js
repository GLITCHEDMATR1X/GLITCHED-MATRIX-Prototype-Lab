(()=>{
  'use strict';

  const LIVE_SCRIPT = './assets/js/holoverse_mini_ringworld_pass27.js?v=20260502-pass28-fit-layout';
  const TOP_LAYOUT_STYLE_ID = 'holoverse-featured-simulator-layout-pass28';

  function installTopLayoutStyle() {
    if (document.getElementById(TOP_LAYOUT_STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = TOP_LAYOUT_STYLE_ID;
    style.textContent = `
      body.holoverse-demo-featured-top .hero {
        overflow: visible;
      }
      body.holoverse-demo-featured-top .hero-visual {
        min-height: clamp(210px, 24vw, 300px);
        max-height: 320px;
      }
      body.holoverse-demo-featured-top .hero-header-art {
        min-height: clamp(210px, 24vw, 300px);
      }
      body.holoverse-demo-featured-top .hero-copy {
        margin-top: 14px;
        padding: clamp(18px, 2vw, 26px);
        position: relative;
        z-index: 2;
      }
      .single-holoverse-section.demo-featured-top {
        margin-top: 18px;
        padding: clamp(16px, 1.7vw, 24px);
        border-color: color-mix(in srgb, var(--accent) 28%, transparent);
        background:
          radial-gradient(circle at 48% 12%, rgba(0, 245, 255, 0.10), transparent 38%),
          linear-gradient(180deg, rgba(var(--panel-rgb), 0.97), rgba(5, 8, 10, 0.97));
        overflow: hidden;
      }
      .single-holoverse-section.demo-featured-top .demo-head {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 12px;
        margin-bottom: 14px;
      }
      .single-holoverse-section.demo-featured-top .demo-head h2,
      .single-holoverse-section.demo-featured-top .demo-head p {
        max-width: 100%;
      }
      .single-holoverse-section.demo-featured-top .demo-player-layout {
        display: grid;
        grid-template-columns: minmax(180px, 0.62fr) minmax(0, 1.72fr) minmax(205px, 0.72fr);
        gap: clamp(10px, 1.2vw, 16px);
        align-items: stretch;
        min-width: 0;
      }
      .single-holoverse-section.demo-featured-top .demo-info-panel {
        min-width: 0;
        min-height: 0;
        max-height: min(62vh, 560px);
        overflow: auto;
        overflow-wrap: anywhere;
        word-break: normal;
      }
      .single-holoverse-section.demo-featured-top .demo-info-panel * {
        max-width: 100%;
      }
      .single-holoverse-section.demo-featured-top .demo-canvas-shell {
        width: 100%;
        min-width: 0;
        min-height: clamp(330px, 39vw, 560px);
        overflow: hidden;
      }
      .single-holoverse-section.demo-featured-top .demo-canvas {
        width: 100% !important;
        height: min(60vh, 540px);
        min-height: 330px;
        max-height: 560px;
      }
      .single-holoverse-section.demo-featured-top + .stats-grid,
      body.holoverse-demo-featured-top .stats-grid.below-featured-demo {
        margin-top: 18px;
      }
      @media (max-width: 1320px) {
        .single-holoverse-section.demo-featured-top .demo-player-layout {
          grid-template-columns: minmax(170px, 0.58fr) minmax(0, 1.52fr) minmax(190px, 0.66fr);
        }
        .single-holoverse-section.demo-featured-top .demo-info-panel {
          max-height: min(56vh, 500px);
        }
      }
      @media (max-width: 1080px) {
        .single-holoverse-section.demo-featured-top .demo-player-layout {
          grid-template-columns: 1fr;
        }
        .single-holoverse-section.demo-featured-top .demo-info-panel {
          max-height: none;
        }
        .single-holoverse-section.demo-featured-top .demo-canvas-shell {
          min-height: 340px;
        }
        .single-holoverse-section.demo-featured-top .demo-canvas {
          height: min(58vh, 500px);
          min-height: 340px;
        }
      }
      @media (max-width: 760px) {
        body.holoverse-demo-featured-top .hero-copy {
          margin-top: 10px;
          padding: 16px;
        }
        .single-holoverse-section.demo-featured-top {
          padding: 14px;
        }
        .single-holoverse-section.demo-featured-top .demo-head {
          gap: 8px;
        }
        .single-holoverse-section.demo-featured-top .demo-canvas-shell {
          min-height: 300px;
        }
        .single-holoverse-section.demo-featured-top .demo-canvas {
          min-height: 300px;
          height: 320px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function promoteDemoUnderHero() {
    const hero = document.querySelector('.hero');
    const demo = document.getElementById('demos');
    const stats = document.querySelector('.stats-grid');
    if (!hero || !demo) return;
    if (hero.nextElementSibling !== demo) {
      hero.insertAdjacentElement('afterend', demo);
    }
    demo.classList.add('demo-featured-top');
    document.body.classList.add('holoverse-demo-featured-top');
    if (stats) stats.classList.add('below-featured-demo');
  }

  function mount() {
    installTopLayoutStyle();
    promoteDemoUnderHero();
    const demoCanvas = document.getElementById('demoCanvas');
    if (demoCanvas) window.canvas = demoCanvas;
    if (document.querySelector('script[data-holoverse-pass27-loader="true"]')) return;
    const script = document.createElement('script');
    script.src = LIVE_SCRIPT;
    script.async = false;
    script.dataset.holoversePass27Loader = 'true';
    document.head.appendChild(script);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, { once: true });
  else mount();
})();
