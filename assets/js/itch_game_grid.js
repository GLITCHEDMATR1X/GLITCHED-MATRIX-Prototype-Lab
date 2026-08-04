(() => {
  'use strict';

  const ITCH_PROFILE = 'https://glitched-matrix.itch.io/';
  const ITCH_COLLECTION = 'https://glitched-matrix.itch.io/@GitHub';

  const games = [
    {
      title: 'Apocalypse Run',
      type: 'Wasteland Driving Survival',
      description: 'Keep the engine alive, search for fuel, survive roadside scenarios, and push toward Sanctuary.',
      url: 'https://glitched-matrix.itch.io/apocalypse-run',
      embedId: 4857214,
      accent: 'AR',
      status: 'Direct itch.io release'
    },
    {
      title: 'Doomsday Battle',
      type: 'Apocalyptic Combat',
      description: 'A hardened GLITCHED MATRIX combat release prepared for portable Windows play.',
      url: ITCH_COLLECTION,
      accent: 'DB',
      status: 'GitHub collection'
    },
    {
      title: 'Radar Hell',
      type: 'Supernatural Containment Shooter',
      description: 'Enter hostile realms, disrupt demons, seal breach nodes, and contain supernatural escapes.',
      url: ITCH_COLLECTION,
      accent: 'RH',
      status: 'GitHub collection'
    },
    {
      title: 'Vector Wars',
      type: 'Hardlight Arena Combat',
      description: 'Fight through vector battlefields with specialized weapons, drones, capture pressure, and reactive systems.',
      url: ITCH_COLLECTION,
      accent: 'VW',
      status: 'GitHub collection'
    },
    {
      title: 'GLITCH TV',
      type: 'Procedural Broadcast Lab',
      description: 'Tune into corrupted stations, changing television eras, strange archives, and procedural broadcasts.',
      url: ITCH_COLLECTION,
      accent: 'GT',
      status: 'GitHub collection'
    },
    {
      title: 'Duck n Cover',
      type: 'Arcade Prototype',
      description: 'A compact GLITCHED MATRIX arcade experiment packaged for straightforward portable play.',
      url: ITCH_COLLECTION,
      accent: 'DC',
      status: 'GitHub collection'
    }
  ];

  function installStyles() {
    if (document.getElementById('itch-game-grid-styles')) return;
    const style = document.createElement('style');
    style.id = 'itch-game-grid-styles';
    style.textContent = `
      .itch-games-section{position:relative;overflow:hidden}
      .itch-games-head{display:flex;gap:22px;align-items:flex-end;justify-content:space-between;margin-bottom:22px}
      .itch-games-head p{max-width:760px;margin:.5rem 0 0;opacity:.82}
      .itch-games-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;align-items:stretch}
      .itch-game-card{display:flex;min-width:0;flex-direction:column;border:1px solid rgba(255,255,255,.12);border-radius:15px;overflow:hidden;background:linear-gradient(145deg,rgba(19,8,10,.96),rgba(5,5,8,.96));transition:transform .18s ease,border-color .18s ease,box-shadow .18s ease}
      .itch-game-card:hover,.itch-game-card:focus-within{transform:translateY(-3px);border-color:rgba(235,48,48,.72);box-shadow:0 18px 38px rgba(0,0,0,.36)}
      .itch-game-card--featured{grid-column:span 2}
      .itch-game-art{position:relative;display:grid;place-items:center;aspect-ratio:16/9;background:radial-gradient(circle at 72% 22%,rgba(238,40,40,.3),transparent 34%),linear-gradient(135deg,#1d0b0e 0%,#09090d 52%,#21070a 100%);overflow:hidden}
      .itch-game-art::before{content:"";position:absolute;inset:0;background:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px);background-size:22px 22px;mask-image:linear-gradient(to bottom,black,transparent)}
      .itch-game-monogram{position:relative;font-size:clamp(2.4rem,5vw,4.6rem);font-weight:800;letter-spacing:.08em;color:#f2e8e8;text-shadow:0 0 28px rgba(255,35,35,.55)}
      .itch-game-widget{display:grid;place-items:center;min-height:191px;padding:12px;background:linear-gradient(135deg,rgba(25,8,10,.98),rgba(5,5,8,.98))}
      .itch-game-widget iframe{display:block;width:min(100%,552px);height:167px;border:0;border-radius:9px;background:#0a0505}
      .itch-game-copy{display:flex;flex:1;flex-direction:column;padding:18px}
      .itch-game-topline{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap}
      .itch-game-type{font-size:.72rem;letter-spacing:.12em;text-transform:uppercase;color:#ef6262}
      .itch-game-status{display:inline-flex;align-items:center;min-height:24px;padding:4px 8px;border:1px solid rgba(255,255,255,.12);border-radius:999px;font-size:.67rem;letter-spacing:.08em;text-transform:uppercase;opacity:.76}
      .itch-game-status--live{border-color:rgba(235,48,48,.55);color:#ffabab;background:rgba(204,20,20,.12)}
      .itch-game-copy h3{margin:.5rem 0 .55rem;font-size:1.2rem}
      .itch-game-copy p{margin:0 0 18px;line-height:1.55;opacity:.82}
      .itch-game-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:auto}
      .itch-game-actions .btn{flex:1;min-width:135px;text-align:center}
      .itch-profile-note{margin:18px 0 0;font-size:.9rem;opacity:.7}
      @media(max-width:980px){.itch-games-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.itch-game-card--featured{grid-column:1/-1}}
      @media(max-width:650px){.itch-games-head{align-items:flex-start;flex-direction:column}.itch-games-grid{grid-template-columns:1fr}.itch-game-card--featured{grid-column:auto}.itch-games-head .btn{width:100%;text-align:center}.itch-game-widget{min-height:183px;padding:8px}.itch-game-widget iframe{height:167px}}
    `;
    document.head.appendChild(style);
  }

  function artMarkup(game) {
    if (!game.embedId) {
      return `<div class="itch-game-art" aria-hidden="true"><span class="itch-game-monogram">${game.accent}</span></div>`;
    }

    const widgetUrl = `https://itch.io/embed/${game.embedId}?bg_color=0a0505&fg_color=f2e8e8&link_color=ef4242&border_color=3d171b`;
    return `
      <div class="itch-game-widget">
        <iframe
          src="${widgetUrl}"
          width="552"
          height="167"
          title="${game.title} on itch.io"
          loading="lazy"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen>
          <a href="${game.url}">${game.title} on itch.io</a>
        </iframe>
      </div>`;
  }

  function card(game) {
    const direct = Boolean(game.embedId);
    return `
      <article class="itch-game-card${direct ? ' itch-game-card--featured' : ''}">
        ${artMarkup(game)}
        <div class="itch-game-copy">
          <div class="itch-game-topline">
            <span class="itch-game-type">${game.type}</span>
            <span class="itch-game-status${direct ? ' itch-game-status--live' : ''}">${game.status}</span>
          </div>
          <h3>${game.title}</h3>
          <p>${game.description}</p>
          <div class="itch-game-actions">
            <a class="btn btn-primary" href="${game.url}" target="_blank" rel="noopener noreferrer">${direct ? 'Open Game Page' : 'Open Collection'}</a>
          </div>
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
      const gameLinks = Array.from(nav.querySelectorAll('a[href="#itchGames"]'));
      let gameLink = gameLinks.shift();
      gameLinks.forEach((link) => link.remove());

      if (!gameLink) {
        gameLink = document.createElement('a');
        gameLink.href = '#itchGames';
      }
      gameLink.textContent = 'Games';

      const projectsLink = nav.querySelector('a[href="#prototypeShowcase"]');
      if (projectsLink) nav.insertBefore(gameLink, projectsLink);
      else if (!gameLink.isConnected) nav.appendChild(gameLink);
    }

    const footer = document.querySelector('.footer-links');
    if (footer) {
      const footerGameLinks = Array.from(footer.querySelectorAll('a[href="#itchGames"]'));
      let footerGameLink = footerGameLinks.shift();
      footerGameLinks.forEach((link) => link.remove());
      if (!footerGameLink) {
        footerGameLink = document.createElement('a');
        footerGameLink.href = '#itchGames';
        footer.appendChild(footerGameLink);
      }
      footerGameLink.textContent = 'Games';
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
          <div>
            <span class="section-label">Games on itch.io</span>
            <h2>Downloadable GLITCHED MATRIX releases</h2>
            <p>The retired browser simulation has been replaced by the actual releases and the curated GitHub itch.io collection. Confirmed project IDs appear as live itch.io widgets.</p>
          </div>
          <a class="btn btn-secondary" href="${ITCH_COLLECTION}" target="_blank" rel="noopener noreferrer">View GitHub Collection</a>
        </div>
        <div class="itch-games-grid">${games.map(card).join('')}</div>
        <p class="itch-profile-note">More cards will switch to direct live widgets as their individual itch.io listings are confirmed.</p>`;

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
