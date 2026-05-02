(()=>{
  'use strict';

  const LIVE_SCRIPT = './assets/js/holoverse_mini_ringworld_pass27.js?v=20260502-pass27-visible-world-content';
  const TOP_LAYOUT_STYLE_ID = 'holoverse-featured-simulator-layout-pass25';

  function installTopLayoutStyle() {
    if (document.getElementById(TOP_LAYOUT_STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = TOP_LAYOUT_STYLE_ID;
    style.textContent = `
      body.holoverse-demo-featured-top .hero-visual {
        min-height: clamp(240px, 28vw, 340px);
        max-height: 380px;
      }
      body.holoverse-demo-featured-top .hero-header-art {
        min-height: clamp(240px, 28vw, 340px);
      }
      body.holoverse-demo-featured-top .hero-copy {
        margin-top: clamp(-96px, -8vw, -64px);
        padding: clamp(20px, 2.2vw, 28px);
      }
      .single-holoverse-section.demo-featured-top {
        margin-top: 18px;
        padding: clamp(18px, 2vw, 26px);
        border-color: color-mix(in srgb, var(--accent) 28%, transparent);
        background:
          radial-gradient(circle at 48% 12%, rgba(0, 245, 255, 0.10), transparent 38%),
          linear-gradient(180deg, rgba(var(--panel-rgb), 0.97), rgba(5, 8, 10, 0.97));
      }
      .single-holoverse-section.demo-featured-top .demo-head {
        margin-bottom: 14px;
      }
      .single-holoverse-section.demo-featured-top .demo-player-layout {
        grid-template-columns: minmax(210px, 0.68fr) minmax(520px, 1.82fr) minmax(230px, 0.72fr);
        gap: clamp(12px, 1.4vw, 18px);
      }
      .single-holoverse-section.demo-featured-top .demo-info-panel {
        min-height: 0;
      }
      .single-holoverse-section.demo-featured-top .demo-canvas-shell {
        min-height: clamp(360px, 43vw, 600px);
      }
      .single-holoverse-section.demo-featured-top .demo-canvas {
        height: min(62vh, 560px);
        min-height: 360px;
      }
      .single-holoverse-section.demo-featured-top + .stats-grid,
      body.holoverse-demo-featured-top .stats-grid.below-featured-demo {
        margin-top: 18px;
      }
      @media (max-width: 1180px) {
        .single-holoverse-section.demo-featured-top .demo-player-layout {
          grid-template-columns: 1fr;
        }
        .single-holoverse-section.demo-featured-top .demo-canvas-shell {
          min-height: 360px;
        }
        .single-holoverse-section.demo-featured-top .demo-canvas {
          height: min(58vh, 520px);
        }
      }
      @media (max-width: 760px) {
        body.holoverse-demo-featured-top .hero-copy {
          margin-top: -62px;
        }
        .single-holoverse-section.demo-featured-top {
          padding: 16px;
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
