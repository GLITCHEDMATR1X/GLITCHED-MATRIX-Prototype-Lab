(() => {
  'use strict';

  const ITCH_PROFILE = 'https://glitched-matrix.itch.io/';
  const ITCH_COLLECTION = 'https://glitched-matrix.itch.io/@GitHub';
  const WIDGET_WIDTH = 552;
  const WIDGET_HEIGHT = 167;
  const LOAD_INTERVAL_MS = 1200;

  const releases = [
    { title: 'GLITCHED MATRIX: Prototype Lab', id: 4480673, slug: 'glitched-matrix-prototype-lab' },
    { title: 'Apocalypse Run', id: 4857214, slug: 'apocalypse-run' },
    { title: 'Block Busters', id: 4859561, slug: 'block-busters' },
    { title: 'Doomsday Battle', id: 4858100, slug: 'doomsday-battle' },
    { title: 'Duck n Cover', id: 4861852, slug: 'duck-n-cover' },
    { title: 'Ghost Signal', id: 4861877, slug: 'ghost-signal' },
    { title: 'Glitch TV', id: 4861310, slug: 'glitch-tv' },
    { title: 'Greebles', id: 4861925, slug: 'greebles' },
    { title: 'HEX Contract', id: 4861960, slug: 'hex-contract' },
    { title: 'Isometric World Machine', id: 4858222, slug: 'isometric-world-machine' },
    { title: 'Journey of 2', id: 4861983, slug: 'journey-of-2' },
    { title: 'Journey of 4', id: 4862006, slug: 'journey-of-4' },
    { title: 'Lost Forests', id: 4861908, slug: 'lost-forests' },
    { title: 'Mewtants', id: 4861896, slug: 'mewtants' },
    { title: 'MonkeyStranded', id: 4861683, slug: 'monkeystranded' },
    { title: 'Radar Hell', id: 4858241, slug: 'radar-hell' },
    { title: 'Sky and Ground', id: 4862043, slug: 'sky-and-ground' },
    { title: 'Vector Wars', id: 4858596, slug: 'vector-wars' },
    { title: "Where's Renaldo?", id: 4861943, slug: 'wheres-renaldo' }
  ];

  const loadQueue = [];
  let loadTimer = null;
  let widgetObserver = null;
  let resizeObserver = null;

  function projectUrl(release) {
    return `${ITCH_PROFILE}${release.slug}`;
  }

  function widgetUrl(release) {
    return `https://itch.io/embed/${release.id}?dark=true`;
  }

  function installStyles() {
    if (document.getElementById('itch-game-grid-styles')) return;

    const style = document.createElement('style');
    style.id = 'itch-game-grid-styles';
    style.textContent = `
      .itch-games-section{position:relative;max-width:100%;overflow:hidden}
      .itch-games-head{display:flex;gap:18px;align-items:flex-end;justify-content:space-between;margin-bottom:18px}
      .itch-games-head-copy{min-width:0}
      .itch-games-head h2{margin-bottom:.35rem}
      .itch-games-head p{max-width:760px;margin:0;opacity:.8;line-height:1.5}
      .itch-games-count{display:inline-flex;align-items:center;min-height:26px;margin-left:8px;padding:3px 8px;border:1px solid rgba(239,66,66,.45);border-radius:999px;background:rgba(204,20,20,.1);color:#ffb2b2;font-size:.68rem;letter-spacing:.07em;vertical-align:middle}
      .itch-games-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;align-items:start;max-width:100%;overflow:hidden}
      .itch-release-card{display:flex;width:100%;max-width:${WIDGET_WIDTH}px;min-width:0;box-sizing:border-box;justify-self:center;flex-direction:column;border:1px solid rgba(255,255,255,.12);border-radius:11px;overflow:hidden;background:linear-gradient(145deg,rgba(19,8,10,.96),rgba(5,5,8,.96));transition:border-color .18s ease,box-shadow .18s ease}
      .itch-release-card:hover,.itch-release-card:focus-within{border-color:rgba(235,48,48,.72);box-shadow:0 14px 30px rgba(0,0,0,.32)}
      .itch-widget-shell{width:100%;max-width:${WIDGET_WIDTH}px;min-width:0;box-sizing:border-box;background:#0a0505;overflow:hidden}
      .itch-widget-stage{position:relative;width:100%;aspect-ratio:${WIDGET_WIDTH}/${WIDGET_HEIGHT};overflow:hidden;background:radial-gradient(circle at 70% 20%,rgba(204,20,20,.13),transparent 38%),#0a0505}
      .itch-widget-stage iframe{position:absolute;top:0;display:block;width:${WIDGET_WIDTH}px;height:${WIDGET_HEIGHT}px;border:0;background:#0a0505;transform-origin:top left}
      .itch-widget-placeholder{position:absolute;inset:0;display:grid;place-items:center;padding:12px;text-align:center;color:rgba(255,255,255,.72);background:linear-gradient(135deg,rgba(28,9,12,.95),rgba(6,6,9,.98))}
      .itch-widget-placeholder-inner{display:grid;gap:8px;justify-items:center}
      .itch-widget-placeholder strong{font-size:.8rem;letter-spacing:.08em;text-transform:uppercase;color:#ffd0d0}
      .itch-widget-placeholder span{font-size:.75rem;opacity:.72}
      .itch-widget-load{border:1px solid rgba(239,66,66,.55);border-radius:7px;padding:6px 10px;background:rgba(204,20,20,.13);color:#fff;font:inherit;font-size:.72rem;cursor:pointer}
      .itch-release-meta{display:flex;align-items:center;justify-content:space-between;gap:8px;min-height:42px;padding:9px 10px;border-top:1px solid rgba(255,255,255,.08)}
      .itch-release-title{min-width:0;margin:0;font-size:.82rem;line-height:1.25;overflow-wrap:anywhere}
      .itch-release-actions{display:flex;align-items:center;gap:8px;flex:0 0 auto}
      .itch-release-link,.itch-widget-retry{border:0;background:none;padding:0;font:inherit;font-size:.65rem;letter-spacing:.07em;text-transform:uppercase;color:#ff9a9a;text-decoration:none;cursor:pointer}
      .itch-release-link:hover,.itch-release-link:focus-visible,.itch-widget-retry:hover,.itch-widget-retry:focus-visible{color:#fff;text-decoration:underline}
      .itch-games-note{margin:14px 0 0;font-size:.82rem;opacity:.68}
      @media(max-width:1260px){.itch-games-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
      @media(max-width:760px){.itch-games-head{align-items:flex-start;flex-direction:column}.itch-games-head .btn{width:100%;text-align:center}.itch-games-grid{grid-template-columns:1fr}.itch-release-card{max-width:${WIDGET_WIDTH}px}.itch-release-meta{min-height:40px}}
    `;
    document.head.appendChild(style);
  }

  function placeholderMarkup(title, message = 'Loads when this card approaches the screen') {
    return `
      <div class="itch-widget-placeholder">
        <div class="itch-widget-placeholder-inner">
          <strong>${title}</strong>
          <span>${message}</span>
          <button class="itch-widget-load" type="button">Load widget</button>
        </div>
      </div>`;
  }

  function releaseCard(release) {
    const url = projectUrl(release);
    return `
      <article class="itch-release-card">
        <div class="itch-widget-shell" data-widget-src="${widgetUrl(release)}" data-widget-title="${release.title}" data-widget-url="${url}" data-widget-state="idle">
          <div class="itch-widget-stage">${placeholderMarkup(release.title)}</div>
        </div>
        <div class="itch-release-meta">
          <h3 class="itch-release-title">${release.title}</h3>
          <div class="itch-release-actions">
            <button class="itch-widget-retry" type="button" title="Reload this itch.io widget">Reload</button>
            <a class="itch-release-link" href="${url}" target="_blank" rel="noopener noreferrer">Open page</a>
          </div>
        </div>
      </article>`;
  }

  function fitWidget(shell) {
    const stage = shell.querySelector('.itch-widget-stage');
    const iframe = stage?.querySelector('iframe');
    if (!stage || !iframe) return;

    const available = Math.max(1, stage.clientWidth);
    const scale = Math.min(1, available / WIDGET_WIDTH);
    const renderedWidth = WIDGET_WIDTH * scale;
    iframe.style.left = `${Math.max(0, (available - renderedWidth) / 2)}px`;
    iframe.style.transform = `scale(${scale})`;
  }

  function loadWidget(shell) {
    if (!shell || shell.dataset.widgetState === 'loaded') return;

    const stage = shell.querySelector('.itch-widget-stage');
    if (!stage) return;

    shell.dataset.widgetState = 'loaded';
    const iframe = document.createElement('iframe');
    iframe.src = shell.dataset.widgetSrc;
    iframe.width = String(WIDGET_WIDTH);
    iframe.height = String(WIDGET_HEIGHT);
    iframe.title = `${shell.dataset.widgetTitle} on itch.io`;
    iframe.loading = 'eager';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.setAttribute('allowfullscreen', '');

    const fallback = document.createElement('a');
    fallback.href = shell.dataset.widgetUrl;
    fallback.textContent = `${shell.dataset.widgetTitle} by Glitched Matrix Prototypes`;
    iframe.appendChild(fallback);

    stage.replaceChildren(iframe);
    fitWidget(shell);
    resizeObserver?.observe(stage);
  }

  function processQueue() {
    if (loadTimer || loadQueue.length === 0) return;

    const shell = loadQueue.shift();
    if (shell?.dataset.widgetState === 'queued') loadWidget(shell);

    loadTimer = window.setTimeout(() => {
      loadTimer = null;
      processQueue();
    }, LOAD_INTERVAL_MS);
  }

  function queueWidget(shell, priority = false) {
    if (!shell || shell.dataset.widgetState !== 'idle') return;
    shell.dataset.widgetState = 'queued';
    if (priority) loadQueue.unshift(shell);
    else loadQueue.push(shell);
    processQueue();
  }

  function resetWidget(shell) {
    if (!shell) return;
    const stage = shell.querySelector('.itch-widget-stage');
    if (!stage) return;

    resizeObserver?.unobserve(stage);
    shell.dataset.widgetState = 'idle';
    stage.innerHTML = placeholderMarkup(shell.dataset.widgetTitle, 'Reload queued to avoid another request burst');
    queueWidget(shell, true);
  }

  function installWidgetLoader(section) {
    if (section.dataset.widgetLoaderReady === 'true') return;
    section.dataset.widgetLoaderReady = 'true';

    resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const shell = entry.target.closest('.itch-widget-shell');
        if (shell) fitWidget(shell);
      });
    });

    widgetObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        queueWidget(entry.target);
        widgetObserver.unobserve(entry.target);
      });
    }, { rootMargin: '280px 0px', threshold: 0.01 });

    section.querySelectorAll('.itch-widget-shell').forEach((shell) => widgetObserver.observe(shell));

    section.addEventListener('click', (event) => {
      const loadButton = event.target.closest('.itch-widget-load');
      if (loadButton) {
        const shell = loadButton.closest('.itch-widget-shell');
        queueWidget(shell, true);
        return;
      }

      const retryButton = event.target.closest('.itch-widget-retry');
      if (retryButton) {
        const shell = retryButton.closest('.itch-release-card')?.querySelector('.itch-widget-shell');
        resetWidget(shell);
      }
    });
  }

  function normalizeNavigation() {
    document.querySelectorAll('a[href="#demos"]').forEach((link) => {
      link.href = '#itchGames';
      link.textContent = 'Games';
    });

    document.querySelectorAll('a[href="#prototypeShowcase"]').forEach((link) => {
      link.textContent = 'Projects';
    });

    const nav = document.querySelector('.nav');
    if (nav) {
      const matches = Array.from(nav.querySelectorAll('a[href="#itchGames"]'));
      let gamesLink = matches.shift();
      matches.forEach((link) => link.remove());

      if (!gamesLink) {
        gamesLink = document.createElement('a');
        gamesLink.href = '#itchGames';
      }
      gamesLink.textContent = 'Games';

      const projectsLink = nav.querySelector('a[href="#prototypeShowcase"]');
      if (projectsLink) nav.insertBefore(gamesLink, projectsLink);
      else if (!gamesLink.isConnected) nav.appendChild(gamesLink);
    }

    const footer = document.querySelector('.footer-links');
    if (footer) {
      const matches = Array.from(footer.querySelectorAll('a[href="#itchGames"]'));
      let gamesLink = matches.shift();
      matches.forEach((link) => link.remove());

      if (!gamesLink) {
        gamesLink = document.createElement('a');
        gamesLink.href = '#itchGames';
        footer.appendChild(gamesLink);
      }
      gamesLink.textContent = 'Games';
    }

    const secondary = document.getElementById('secondaryCta');
    if (secondary) {
      secondary.href = '#itchGames';
      secondary.textContent = 'Browse the Games';
    }
  }

  function mountGrid() {
    installStyles();

    const oldDemo = document.getElementById('demos');
    let section = document.getElementById('itchGames');

    if (!section) {
      section = document.createElement('section');
      section.id = 'itchGames';
      section.className = 'panel content-card itch-games-section';
      section.innerHTML = `
        <div class="itch-games-head">
          <div class="itch-games-head-copy">
            <span class="section-label">Games on itch.io</span>
            <h2>Downloadable GLITCHED MATRIX releases <span class="itch-games-count">${releases.length} projects</span></h2>
            <p>Official itch.io widgets in a compact grid. Widgets load one at a time as they approach the screen to prevent request-limit failures.</p>
          </div>
          <a class="btn btn-secondary" href="${ITCH_COLLECTION}" target="_blank" rel="noopener noreferrer">View GitHub Collection</a>
        </div>
        <div class="itch-games-grid">${releases.map(releaseCard).join('')}</div>
        <p class="itch-games-note">Three columns are used on wide screens, two on medium screens, and one on narrow screens. No horizontal scrolling is required.</p>`;

      const showcase = document.getElementById('prototypeShowcase');
      const anchor = oldDemo || showcase;
      if (anchor) anchor.insertAdjacentElement('beforebegin', section);
      else document.querySelector('.content-flow')?.appendChild(section);
    }

    if (oldDemo) oldDemo.remove();
    installWidgetLoader(section);
    normalizeNavigation();
  }

  function mount() {
    mountGrid();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount, { once: true });
  } else {
    mount();
  }

  [250, 900, 1800, 4000, 8000].forEach((delay) => window.setTimeout(mount, delay));
})();
