(() => {
  'use strict';

  const ITCH_PROFILE = 'https://glitched-matrix.itch.io/';
  const ITCH_COLLECTION = 'https://glitched-matrix.itch.io/@GitHub';

  const releases = [
    { title: 'GLITCHED MATRIX: Prototype Lab', id: 4480673, slug: 'glitched-matrix-prototype-lab', featured: true },
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
      .itch-games-section{position:relative;overflow:hidden}
      .itch-games-head{display:flex;gap:22px;align-items:flex-end;justify-content:space-between;margin-bottom:22px}
      .itch-games-head-copy{min-width:0}
      .itch-games-head p{max-width:780px;margin:.5rem 0 0;opacity:.82;line-height:1.55}
      .itch-games-count{display:inline-flex;align-items:center;min-height:28px;margin-left:10px;padding:4px 9px;border:1px solid rgba(239,66,66,.45);border-radius:999px;background:rgba(204,20,20,.1);color:#ffb2b2;font-size:.72rem;letter-spacing:.08em;vertical-align:middle}
      .itch-games-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;align-items:stretch}
      .itch-release-card{display:flex;min-width:0;flex-direction:column;border:1px solid rgba(255,255,255,.12);border-radius:15px;overflow:hidden;background:linear-gradient(145deg,rgba(19,8,10,.96),rgba(5,5,8,.96));transition:transform .18s ease,border-color .18s ease,box-shadow .18s ease}
      .itch-release-card:hover,.itch-release-card:focus-within{transform:translateY(-3px);border-color:rgba(235,48,48,.72);box-shadow:0 18px 38px rgba(0,0,0,.36)}
      .itch-release-card--featured{grid-column:1/-1}
      .itch-widget-shell{display:grid;place-items:center;min-height:191px;padding:12px;background:linear-gradient(135deg,rgba(25,8,10,.98),rgba(5,5,8,.98))}
      .itch-widget-shell iframe{display:block;width:min(100%,552px);height:167px;border:0;border-radius:9px;background:#0a0505}
      .itch-release-card--featured .itch-widget-shell{min-height:211px}
      .itch-release-meta{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 16px 16px;border-top:1px solid rgba(255,255,255,.08)}
      .itch-release-title{min-width:0;margin:0;font-size:1rem;line-height:1.25;overflow-wrap:anywhere}
      .itch-release-link{flex:0 0 auto;font-size:.76rem;letter-spacing:.08em;text-transform:uppercase;color:#ff9a9a;text-decoration:none}
      .itch-release-link:hover,.itch-release-link:focus-visible{color:#fff;text-decoration:underline}
      .itch-games-note{margin:18px 0 0;font-size:.9rem;opacity:.7}
      @media(max-width:880px){.itch-games-grid{grid-template-columns:1fr}.itch-release-card--featured{grid-column:auto}}
      @media(max-width:650px){.itch-games-head{align-items:flex-start;flex-direction:column}.itch-games-head .btn{width:100%;text-align:center}.itch-widget-shell{min-height:183px;padding:8px}.itch-widget-shell iframe{height:167px}.itch-release-meta{align-items:flex-start;flex-direction:column}}
    `;
    document.head.appendChild(style);
  }

  function releaseCard(release) {
    const url = projectUrl(release);
    return `
      <article class="itch-release-card${release.featured ? ' itch-release-card--featured' : ''}">
        <div class="itch-widget-shell">
          <iframe
            src="${widgetUrl(release)}"
            width="552"
            height="167"
            title="${release.title} on itch.io"
            loading="lazy"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen>
            <a href="${url}">${release.title} by Glitched Matrix Prototypes</a>
          </iframe>
        </div>
        <div class="itch-release-meta">
          <h3 class="itch-release-title">${release.title}</h3>
          <a class="itch-release-link" href="${url}" target="_blank" rel="noopener noreferrer">Open page</a>
        </div>
      </article>`;
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
            <p>The retired browser simulation has been replaced by the complete official itch.io collection. Every card below uses its confirmed project widget and links directly to its release page.</p>
          </div>
          <a class="btn btn-secondary" href="${ITCH_COLLECTION}" target="_blank" rel="noopener noreferrer">View GitHub Collection</a>
        </div>
        <div class="itch-games-grid">${releases.map(releaseCard).join('')}</div>
        <p class="itch-games-note">Widgets are loaded lazily from itch.io so the rest of the Prototype Lab site remains responsive.</p>`;

      const showcase = document.getElementById('prototypeShowcase');
      const anchor = oldDemo || showcase;
      if (anchor) anchor.insertAdjacentElement('beforebegin', section);
      else document.querySelector('.content-flow')?.appendChild(section);
    }

    if (oldDemo) oldDemo.remove();
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
