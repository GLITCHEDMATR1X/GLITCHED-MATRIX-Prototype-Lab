(() => {
  'use strict';

  const ITCH_PROFILE = 'https://glitched-matrix.itch.io/';

  const releases = [
    { title: 'Apocalypse Run', slug: 'apocalypse-run' },
    { title: 'Block Busters', slug: 'block-busters' },
    { title: 'Doomsday Battle', slug: 'doomsday-battle' },
    { title: 'Duck n Cover', slug: 'duck-n-cover' },
    { title: 'Entropy', slug: 'entropy' },
    { title: 'Ghost Signal', slug: 'ghost-signal' },
    { title: 'Glitch TV', slug: 'glitch-tv' },
    { title: 'GLITCHED MATRIX: Prototype Lab', slug: 'glitched-matrix-prototype-lab' },
    { title: 'Greebles', slug: 'greebles' },
    { title: 'HEX Contract', slug: 'hex-contract' },
    { title: 'Isometric World Machine', slug: 'isometric-world-machine' },
    { title: 'Journey of 2', slug: 'journey-of-2' },
    { title: 'Journey of 4', slug: 'journey-of-4' },
    { title: 'Lost Forests', slug: 'lost-forests' },
    { title: 'Mewtants', slug: 'mewtants' },
    { title: 'MonkeyStranded', slug: 'monkeystranded' },
    { title: 'Radar Hell', slug: 'radar-hell' },
    { title: 'Sky and Ground', slug: 'sky-and-ground' },
    { title: 'Vector Wars', slug: 'vector-wars' },
    { title: "Where's Renaldo?", slug: 'wheres-renaldo' }
  ];

  function projectUrl(release) {
    return `${ITCH_PROFILE}${release.slug}`;
  }

  function installStyles() {
    if (document.getElementById('itch-game-grid-styles')) return;

    const style = document.createElement('style');
    style.id = 'itch-game-grid-styles';
    style.textContent = `
      .itch-games-section{position:relative;max-width:100%;overflow:hidden}
      .itch-games-head{display:flex;gap:16px;align-items:flex-end;justify-content:space-between;margin-bottom:18px}
      .itch-games-head-copy{min-width:0}
      .itch-games-head h2{margin-bottom:.35rem}
      .itch-games-head p{max-width:760px;margin:0;opacity:.8;line-height:1.55}
      .itch-games-count{display:inline-flex;align-items:center;min-height:24px;margin-left:7px;padding:2px 7px;border:1px solid rgba(239,66,66,.42);border-radius:999px;background:rgba(204,20,20,.09);color:#ffb2b2;font-size:.64rem;letter-spacing:.06em;vertical-align:middle}
      .itch-games-head .btn{flex:0 0 auto!important;width:auto!important;min-width:0!important;white-space:nowrap!important}
      .itch-games-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;max-width:100%}
      .itch-game-link{display:flex;align-items:center;justify-content:space-between;gap:12px;min-width:0;min-height:58px;padding:12px 14px;border:1px solid rgba(255,255,255,.11);border-radius:9px;background:linear-gradient(145deg,rgba(19,8,10,.96),rgba(5,5,8,.96));text-decoration:none;transition:border-color .16s ease,box-shadow .16s ease,transform .16s ease}
      .itch-game-link:hover,.itch-game-link:focus-visible{border-color:rgba(235,48,48,.72);box-shadow:0 10px 22px rgba(0,0,0,.28);transform:translateY(-1px);outline:none}
      .itch-game-title{min-width:0;color:#f4eded;font-size:.84rem;font-weight:700;line-height:1.25;overflow-wrap:anywhere}
      .itch-game-action{flex:0 0 auto;color:#ff9a9a;font-size:.62rem;letter-spacing:.07em;text-transform:uppercase;white-space:nowrap}
      .itch-game-link:hover .itch-game-action,.itch-game-link:focus-visible .itch-game-action{color:#fff}
      @media(max-width:1500px){.itch-games-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
      @media(max-width:1050px){.itch-games-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
      @media(max-width:680px){.itch-games-head{align-items:flex-start;flex-direction:column}.itch-games-grid{grid-template-columns:1fr}.itch-game-link{min-height:54px}}
      @media(prefers-reduced-motion:reduce){.itch-game-link{transition:none}.itch-game-link:hover,.itch-game-link:focus-visible{transform:none}}
    `;
    document.head.appendChild(style);
  }

  function releaseLink(release) {
    const url = projectUrl(release);
    return `
      <a class="itch-game-link" href="${url}" target="_blank" rel="noopener noreferrer">
        <span class="itch-game-title">${release.title}</span>
        <span class="itch-game-action" aria-hidden="true">Open ↗</span>
      </a>`;
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
      secondary.textContent = 'Browse Games';
    }
  }

  function mountList() {
    installStyles();

    const oldDemo = document.getElementById('demos');
    let section = document.getElementById('itchGames');

    if (!section) {
      section = document.createElement('section');
      section.id = 'itchGames';
      section.className = 'panel content-card itch-games-section';

      const showcase = document.getElementById('prototypeShowcase');
      const anchor = oldDemo || showcase;
      if (anchor) anchor.insertAdjacentElement('beforebegin', section);
      else document.querySelector('.content-flow')?.appendChild(section);
    }

    if (section.dataset.linkListReady !== 'true') {
      section.dataset.linkListReady = 'true';
      section.innerHTML = `
        <div class="itch-games-head">
          <div class="itch-games-head-copy">
            <span class="section-label">Available on itch.io</span>
            <h2>Games from GLITCHED MATRIX <span class="itch-games-count">${releases.length} releases</span></h2>
            <p>Open any game directly on itch.io for screenshots, details, and downloads. No embedded game pages are loaded here.</p>
          </div>
          <a class="btn btn-secondary" href="${ITCH_PROFILE}" target="_blank" rel="noopener noreferrer">All releases</a>
        </div>
        <div class="itch-games-grid">${releases.map(releaseLink).join('')}</div>`;
    }

    if (oldDemo) oldDemo.remove();
    normalizeNavigation();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountList, { once: true });
  } else {
    mountList();
  }

  window.setTimeout(mountList, 500);
})();
