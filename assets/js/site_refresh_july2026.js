(() => {
  'use strict';

  const STEAM_URL = 'https://store.steampowered.com/app/4386390/Matrix_OS_Arcade_Evolution/';

  const prototypes = [
    {
      name: 'GHOST SIGNAL: UTOPIA',
      tags: ['Cyberpunk', 'Pygame', 'Campaign'],
      body: 'Possess cameras, drones, terminals, and city infrastructure as Andrew expands through Utopia while Gleebs counters dangerous intrusions.'
    },
    {
      name: 'Swords & Sorcery: World of Mythologies',
      tags: ['Fantasy', 'Adventure', 'ModernGL'],
      body: 'Enter a preserved Utopia adventure simulation, build an expedition, cross connected regions, complete contracts, and recover artifacts.'
    },
    {
      name: 'Alien Geographic',
      tags: ['Ecology', 'Observation', 'Pygame'],
      body: 'A field-documentary simulation built around camera sites, living food webs, environmental cycles, research evidence, and complete ecological chapters.'
    },
    {
      name: 'Operation: StarFall',
      tags: ['Space', 'Exploration', 'Panda3D'],
      body: 'Explore specialized worlds across the outer solar system with drones, sampling tools, atmospheric identities, missions, and connected vessel systems.'
    },
    {
      name: 'Utopia Conflict',
      tags: ['Hardlight', 'Combat', 'Panda3D'],
      body: 'Fight through a procedural vector city with capture zones, civilians, patrol drones, district activity, specialized weapons, and reactive wireframe armor.'
    },
    {
      name: 'Depths: Layer Descent',
      tags: ['Voxel', 'Descent', 'Panda3D'],
      body: 'Dig through distinct underground layers, follow shifting objectives, collect rare materials, survive hazards, and travel with changing companions.'
    },
    {
      name: 'HEX CONTRACT',
      tags: ['Strategy', 'Heroes', 'Autonomous'],
      body: 'Prepare a roster of non-playable heroes for dangerous contracts where equipment, relationships, strain, death, recovery, and sovereign encounters persist.'
    },
    {
      name: 'Fatebound',
      tags: ['Cards', 'Elements', 'Duel'],
      body: 'A complete elemental duel prototype with generated cards, tribute, convergence, collection progression, battlefield weather, and readable live presentation.'
    }
  ];

  const latest = [
    {
      title: 'MXOS + MatrixCore',
      body: 'The launcher now supports an evolving prototype library, MatrixCore Sound Fragments, background playback, portable Windows staging, and cleaner game handoffs.'
    },
    {
      title: 'Cyberpunk Update',
      body: 'Recent work strengthens cyberpunk identity across GHOST SIGNAL: UTOPIA, Utopia Conflict, HoloVerse systems, music, lore, and the public Steam build.'
    },
    {
      title: 'Prototype Standards',
      body: 'Newer builds are developed around complete loops, real in-engine proof, 1080p presentation, regression checks, clean packaging, and honest release gates.'
    }
  ];

  function setText(selector, value) {
    const node = document.querySelector(selector);
    if (node) node.textContent = value;
  }

  function setKey(key, value) {
    document.querySelectorAll(`.editable[data-key="${key}"]`).forEach((node) => {
      node.textContent = value;
    });
  }

  function ensureStylesheet() {
    if (document.querySelector('link[data-site-refresh-july2026]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './assets/css/site_refresh_july2026.css?v=20260731';
    link.dataset.siteRefreshJuly2026 = 'true';
    document.head.appendChild(link);
  }

  function cardMarkup(item) {
    const tags = item.tags.map((tag) => `<span>${tag}</span>`).join('');
    return `<article class="prototype-card"><div class="prototype-meta">${tags}</div><h3>${item.name}</h3><p>${item.body}</p></article>`;
  }

  function installPrototypeShowcase() {
    if (document.getElementById('prototypeShowcase')) return;
    const target = document.getElementById('features') || document.getElementById('demos');
    if (!target) return;

    const section = document.createElement('section');
    section.id = 'prototypeShowcase';
    section.className = 'panel content-card refresh-section';
    section.innerHTML = `
      <div class="refresh-section-head">
        <div>
          <span class="refresh-kicker">Selected projects</span>
          <h2>One lab. Many playable directions.</h2>
          <p>The Prototype Lab is no longer represented by one arena. It is a growing collection of games, simulations, tools, stories, and experiments connected through MXOS.</p>
        </div>
      </div>
      <div class="prototype-grid">${prototypes.map(cardMarkup).join('')}</div>`;
    target.insertAdjacentElement('beforebegin', section);
  }

  function installLatestSection() {
    if (document.getElementById('latestLabUpdate')) return;
    const showcase = document.getElementById('prototypeShowcase');
    if (!showcase) return;

    const section = document.createElement('section');
    section.id = 'latestLabUpdate';
    section.className = 'panel content-card refresh-section';
    section.innerHTML = `
      <div class="refresh-section-head">
        <div>
          <span class="refresh-kicker">July 2026</span>
          <h2>The lab has expanded far beyond the original site.</h2>
          <p>Current work is focused on a stronger Steam-ready arcade, reliable prototype launching, clearer public presentation, and upgrading the most promising games into complete playable loops.</p>
        </div>
      </div>
      <div class="refresh-update-grid">
        ${latest.map((item) => `<article class="refresh-update-card"><strong>${item.title}</strong><p>${item.body}</p></article>`).join('')}
      </div>`;
    showcase.insertAdjacentElement('afterend', section);
  }

  function refreshNavigation() {
    const nav = document.querySelector('.nav');
    if (nav && !nav.querySelector('a[href="#prototypeShowcase"]')) {
      const link = document.createElement('a');
      link.href = '#prototypeShowcase';
      link.textContent = 'Games';
      const demoLink = nav.querySelector('a[href="#demos"]');
      nav.insertBefore(link, demoLink || null);
    }

    document.querySelectorAll('.nav a[href="#demos"], .footer-links a[href="#demos"]').forEach((link) => {
      link.textContent = 'Browser Experiment';
    });
  }

  function refreshCopy() {
    document.body.classList.add('site-refresh-july2026');

    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.content = 'GLITCHED MATRIX Prototype Lab is a playable operating-system arcade filled with evolving games, creative tools, music, lore, simulations, and experimental worlds.';
    }

    setKey('heroEyebrow', '> MXOS + ARCADE EVOLUTION <');
    setKey('heroTitle', 'GLITCHED MATRIX Prototype Lab');
    setKey('heroLead', 'A playable operating-system arcade filled with evolving games, creative tools, MatrixCore music, hidden archives, simulations, and experimental worlds.');
    setKey('stat1Value', 'Steam Update in Development');
    setKey('stat2Value', 'Play • Explore • Create');
    setKey('stat3Value', 'Games + Tools + Lore');
    setKey('stat4Value', 'Players and inventors');

    setKey('aboutTitle', 'A connected arcade for unfinished ideas that become playable');
    setKey('aboutBody1', 'GLITCHED MATRIX Prototype Lab collects games, simulations, stories, music, tools, bots, and experimental systems inside the MXOS interface.');
    setKey('aboutBody2', 'Projects range from cyberpunk infiltration and hardlight combat to ecology, fantasy expeditions, planetary exploration, strategy, cards, survival, and world-building tools.');

    setKey('fictionLabel', 'MatrixCore');
    setKey('fictionTitle', 'Music, memory, and the archive beneath the lab');
    setKey('fictionBody1', 'MatrixCore connects original Sound Fragments, recovered Utopia records, HoloCore systems, and the wider fiction surrounding the Prototype Lab.');
    setKey('fictionBody2', 'The lore reader remains available as a deeper archive, while the main page now gives the playable projects and MXOS systems equal weight.');

    setKey('featuresLabel', 'Inside MXOS');
    setKey('featuresTitle', 'A launcher, music system, archive, and growing game library');
    setKey('roadmapLabel', 'Development');
    setKey('roadmapTitle', 'Where the lab is going next');
    setKey('directionLabel', 'Current focus');
    setKey('directionTitle', 'The Steam-ready Prototype Lab');
    setKey('directionBody1', 'The current build focuses on dependable prototype launching, portable Windows packaging, MatrixCore audio, better game organization, and stronger presentation for the most complete projects.');
    setKey('directionBody2', 'The goal is not to make every experiment identical. Each project keeps its own identity while sharing cleaner controls, validation, packaging, and Prototype Lab progression.');

    setKey('mediaTitle', 'Prototype footage, screenshots, and the evolving archive');
    setKey('galleryNote', 'Media from games and experiments across the GLITCHED MATRIX Prototype Lab.');
    setKey('metaTitle', 'What defines the Prototype Lab');
    setKey('communityTitle', 'For players, builders, tinkerers, and curious people');
    setKey('updatesTitle', 'Archived Site Updates');

    setText('#demoSectionTitle', 'HoloMap RTS — Browser Experiment');
    setText('#demoSectionIntro', 'A lightweight tactical browser slice preserved as one experiment inside the much larger Prototype Lab.');
    setText('#demoSectionNote', 'The browser experiment remains playable while the main public presentation now reflects the wider Steam library.');
    setText('#demoDetails', 'This small web build is a teaser. The full Prototype Lab contains many separate native Pygame, Panda3D, and experimental projects.');

    const primary = document.getElementById('primaryCta');
    if (primary) {
      primary.href = STEAM_URL;
      primary.textContent = 'View on Steam';
    }

    const secondary = document.getElementById('secondaryCta');
    if (secondary) {
      secondary.href = '#prototypeShowcase';
      secondary.textContent = 'Explore the Games';
    }
  }

  function mount() {
    ensureStylesheet();
    installPrototypeShowcase();
    installLatestSection();
    refreshNavigation();
    refreshCopy();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount, { once: true });
  } else {
    mount();
  }

  // Older pass scripts can reapply legacy copy after load. Reassert only public copy,
  // without rebuilding or replacing their gameplay and lore systems.
  [150, 600, 1400, 3200, 6500, 10000].forEach((delay) => window.setTimeout(mount, delay));
})();
