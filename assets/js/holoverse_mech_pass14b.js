(()=>{
  'use strict';

  const LIVE_SCRIPT = './assets/js/holoverse_mini_ringworld_pass27.js?v=20260502-pass29-public-copy';
  const TOP_LAYOUT_STYLE_ID = 'holoverse-featured-simulator-layout-pass28';

  const publicUpdates = [
    {
      group: 'HoloVerse / MatrixCore',
      title: 'Current Focus',
      meta: '2026-05-02',
      bullets: [
        'HoloVerse remains the main digital hub for the Prototype Lab: a connected place for regions, bots, dimensions, and MatrixCore lore.',
        'The public demo is presented as an experimental world-view prototype, not a finished living-world simulation.',
        'Current direction focuses on clearer region identity, stronger hub presentation, visible world objects, and cleaner side-panel information.',
        'MatrixCore and Gleebs remain the story/archive layer that connects recovered worlds, bots, and prototype fragments.'
      ]
    },
    {
      group: 'Prototype Lab',
      title: 'Player-Facing Direction',
      meta: '2026-05-02',
      bullets: [
        'The lab is being shaped around a dark sci-fi prototype arcade: explore strange experiments, follow the HoloVerse/MatrixCore thread, and discover connected playable fragments.',
        'Future public updates will focus on visible gameplay, worlds, characters, controls, and polished player-facing features instead of internal site maintenance.',
        'The strongest prototypes should be presented as clear experiences: what they are, what you do, and why they matter.'
      ]
    },
    {
      group: 'HoloVerse Regions',
      title: 'World Identity',
      meta: '2026-05-02',
      bullets: [
        'Flat is the central hub space for gatherings, events, and portal-style handoffs.',
        'Forest, Green Hills, Mushroom, Desert, Ice, Urban, Metropolis, and Space each keep a distinct purpose for future world growth.',
        'The long-term goal is a stronger visual world first, then deeper bot behavior once the regions are readable.'
      ]
    },
    {
      group: 'Build / Launcher',
      title: 'Player Benefit',
      meta: '2026-05-02',
      bullets: [
        'Packaging and launcher work only belongs in public notes when it directly helps players install, launch, or understand the project.',
        'Internal cache keys, script loaders, media-slot cleanup, and route-debug notes are being moved away from the public update feed.'
      ]
    }
  ];

  const publicCopy = {
    roadmapLabel: 'Future',
    roadmapTitle: 'Where the lab is going',
    roadmap: [
      'Build HoloVerse into a richer explorable hub with clearer regions, stronger characters, and more memorable discoveries.',
      'Expand MatrixCore into the central story/archive layer that connects lore, bots, prototypes, and recovered worlds.',
      'Focus each region around a clear identity so Forest, Hills, Mushroom, Desert, Ice, Urban, Metropolis, and Space feel different at a glance.',
      'Polish the strongest prototypes into experiences that players can understand quickly and remember afterward.',
      'Improve the launcher and setup flow only where it directly helps players get into the lab faster.'
    ],
    directionLabel: 'Now',
    directionTitle: 'What the current release is about',
    directionBody1: 'GLITCHED MATRIX Prototype Lab is a dark sci-fi collection of connected experiments: HoloVerse, MatrixCore, Gleebs, bots, playable prototypes, and creation tools inside one evolving lab.',
    directionBody2: 'The current public focus is clarity: stronger presentation, cleaner information, more honest demo framing, and better separation between player-facing updates and internal development notes.',
    updatesLabel: 'Updates',
    updatesTitle: 'Public Update Notes',
    updatesNote: 'Player-facing progress, world direction, and major Prototype Lab updates. Internal site maintenance is kept out of this feed.',
    secondaryText: 'See Features',
    secondaryHref: '#features'
  };

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

  function setTextByKey(key, value) {
    document.querySelectorAll(`.editable[data-key="${key}"]`).forEach((el) => {
      el.textContent = value;
    });
  }

  function renderList(id, items) {
    const host = document.getElementById(id);
    if (!host) return;
    host.innerHTML = '';
    items.forEach((text) => {
      const li = document.createElement('li');
      li.textContent = text;
      host.appendChild(li);
    });
  }

  function renderPublicUpdates() {
    const host = document.getElementById('updatesList');
    if (!host) return;
    host.innerHTML = '';
    publicUpdates.forEach((entry) => {
      const card = document.createElement('article');
      card.className = 'update-card public-update-card';
      card.innerHTML = `<span class="update-group">${entry.group}</span><h3 class="update-heading">${entry.title}</h3><div class="update-meta">${entry.meta}</div><ul class="update-bullets">${entry.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>`;
      host.appendChild(card);
    });
  }

  function applyPublicCopy() {
    setTextByKey('roadmapLabel', publicCopy.roadmapLabel);
    setTextByKey('roadmapTitle', publicCopy.roadmapTitle);
    setTextByKey('directionLabel', publicCopy.directionLabel);
    setTextByKey('directionTitle', publicCopy.directionTitle);
    setTextByKey('directionBody1', publicCopy.directionBody1);
    setTextByKey('directionBody2', publicCopy.directionBody2);
    setTextByKey('updatesLabel', publicCopy.updatesLabel);
    setTextByKey('updatesTitle', publicCopy.updatesTitle);
    setTextByKey('updatesNote', publicCopy.updatesNote);
    renderList('roadmapList', publicCopy.roadmap);
    const secondary = document.getElementById('secondaryCta');
    if (secondary) {
      secondary.textContent = publicCopy.secondaryText;
      secondary.href = publicCopy.secondaryHref;
    }
    renderPublicUpdates();
  }

  function keepPublicCopyApplied() {
    applyPublicCopy();
    setTimeout(applyPublicCopy, 250);
    setTimeout(applyPublicCopy, 1000);
    const host = document.getElementById('updatesList');
    if (host && !host.dataset.publicUpdatesObserver) {
      host.dataset.publicUpdatesObserver = 'true';
      const observer = new MutationObserver(() => {
        if (!host.querySelector('.public-update-card')) renderPublicUpdates();
      });
      observer.observe(host, { childList: true, subtree: false });
    }
  }

  function mount() {
    installTopLayoutStyle();
    promoteDemoUnderHero();
    keepPublicCopyApplied();
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
