(() => {
  'use strict';

  const ITCH_PROFILE = 'https://glitched-matrix.itch.io/';

  const games = [
    {
      title: 'Apocalypse Run',
      type: 'Wasteland Driving Survival',
      description: 'Keep the engine alive, search for fuel, survive roadside scenarios, and push toward Sanctuary.',
      url: 'https://glitched-matrix.itch.io/apocalypse-run',
      accent: 'AR'
    },
    {
      title: 'Doomsday Battle',
      type: 'Apocalyptic Combat',
      description: 'A hardened GLITCHED MATRIX combat release prepared for portable Windows play.',
      url: ITCH_PROFILE,
      accent: 'DB'
    },
    {
      title: 'Radar Hell',
      type: 'Supernatural Containment Shooter',
      description: 'Enter hostile realms, disrupt demons, seal breach nodes, and contain supernatural escapes.',
      url: ITCH_PROFILE,
      accent: 'RH'
    },
    {
      title: 'Vector Wars',
      type: 'Hardlight Arena Combat',
      description: 'Fight through vector battlefields with specialized weapons, drones, capture pressure, and reactive systems.',
      url: ITCH_PROFILE,
      accent: 'VW'
    },
    {
      title: 'GLITCH TV',
      type: 'Procedural Broadcast Lab',
      description: 'Tune into corrupted stations, changing television eras, strange archives, and procedural broadcasts.',
      url: ITCH_PROFILE,
      accent: 'GT'
    },
    {
      title: 'Duck n Cover',
      type: 'Arcade Prototype',
      description: 'A compact GLITCHED MATRIX arcade experiment packaged for straightforward portable play.',
      url: ITCH_PROFILE,
      accent: 'DC'
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
      .itch-games-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
      .itch-game-card{display:flex;min-width:0;flex-direction:column;border:1px solid rgba(255,255,255,.12);border-radius:15px;overflow:hidden;background:linear-gradient(145deg,rgba(19,8,10,.96),rgba(5,5,8,.96));transition:transform .18s ease,border-color .18s ease,box-shadow .18s ease}
      .itch-game-card:hover,.itch-game-card:focus-within{transform:translateY(-3px);border-color:rgba(235,48,48,.72);box-shadow:0 18px 38px rgba(0,0,0,.36)}
      .itch-game-art{position:relative;display:grid;place-items:center;aspect-ratio:16/9;background:radial-gradient(circle at 72% 22%,rgba(238,40,40,.3),transparent 34%),linear-gradient(135deg,#1d0b0e 0%,#09090d 52%,#21070a 100%);overflow:hidden}
      .itch-game-art::before{content:"";position:absolute;inset:0;background:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px);background-size:22px 22px;mask-image:linear-gradient(to bottom,black,transparent)}
      .itch-game-monogram{position:relative;font-size:clamp(2.4rem,5vw,4.6rem);font-weight:800;letter-spacing:.08em;color:#f2e8e8;text-shadow:0 0 28px rgba(255,35,35,.55)}
      .itch-game-copy{display:flex;flex:1;flex-direction:column;padding:18px}
      .itch-game-type{font-size:.72rem;letter-spacing:.12em;text-transform:uppercase;color:#ef6262}
      .itch-game-copy h3{margin:.42rem 0 .55rem;font-size:1.2rem}
      .itch-game-copy p{margin:0 0 18px;line-height:1.55;opacity:.82}
      .itch-game-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:auto}
      .itch-game-actions .btn{flex:1;min-width:135px;text-align:center}
      .itch-profile-note{margin:18px 0 0;font-size:.9rem;opacity:.7}
      @media(max-width:980px){.itch-games-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
      @media(max-width:650px){.itch-games-head{align-items:flex-start;flex-direction:column}.itch-games-grid{grid-template-columns:1fr}.itch-games-head .btn{width:100%;text-align:center}}
    `;
    document.head.appendChild(style);
  }

  function card(game) {
    const projectSpecific = game.url !== ITCH_PROFILE;
    return `
      <article class="itch-game-card">
        <div class="itch-game-art" aria-hidden="true"><span class="itch-game-monogram">${game.accent}</span></div>
        <div class="itch-game-copy">
          <span class="itch-game-type">${game.type}</span>
          <h3>${game.title}</h3>
          <p>${game.description}</p>
          <div class="itch-game-actions">
            <a class="btn btn-primary" href="${game.url}" target="_blank" rel="noopener noreferrer">${projectSpecific ? 'View Game' : 'Find on itch.io'}</a>
          </div>
        </div>
      </article>`;
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
            <p>The old browser simulation has been removed. This space now presents the actual downloadable games in a clean responsive grid.</p>
          </div>
          <a class="btn btn-secondary" href="${ITCH_PROFILE}" target="_blank" rel="noopener noreferrer">View Full itch.io Page</a>
        </div>
        <div class="itch-games-grid">${games.map(card).join('')}</div>
        <p class="itch-profile-note">Project-specific links can be added to each card as new itch.io pages are published.</p>`;

      const showcase = document.getElementById('prototypeShowcase');
      const anchor = oldDemo || showcase;
      if (anchor) anchor.insertAdjacentElement('beforebegin', section);
      else document.querySelector('.content-flow')?.appendChild(section);
    }

    if (oldDemo) oldDemo.remove();

    document.querySelectorAll('a[href="#demos"]').forEach((link) => {
      link.href = '#itchGames';
      link.textContent = 'Games';
    });

    const nav = document.querySelector('.nav');
    if (nav && !nav.querySelector('a[href="#itchGames"]')) {
      const link = document.createElement('a');
      link.href = '#itchGames';
      link.textContent = 'Games';
      nav.appendChild(link);
    }

    const secondary = document.getElementById('secondaryCta');
    if (secondary) {
      secondary.href = '#itchGames';
      secondary.textContent = 'Browse the Games';
    }
  }

  function mount() {
    mountGrid();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount, { once: true });
  } else {
    mount();
  }

  [250, 900, 1800, 4000].forEach((delay) => window.setTimeout(mount, delay));
})();
