(() => {
  'use strict';

  const STEAM_URL = 'https://store.steampowered.com/app/4386390/Matrix_OS_Arcade_Evolution/';

  const prototypes = [
    {
      name: 'GHOST SIGNAL: UTOPIA',
      tags: ['Cyberpunk', 'Hacking', 'Strategy'],
      body: 'Possess cameras, drones, terminals, and city infrastructure as Andrew expands through Utopia while Gleebs counters dangerous intrusions.'
    },
    {
      name: 'Swords & Sorcery: World of Mythologies',
      tags: ['Fantasy', 'Adventure', 'Exploration'],
      body: 'Build an expedition, cross connected regions, complete contracts, and recover artifacts from a mythological world.'
    },
    {
      name: 'Alien Geographic',
      tags: ['Ecology', 'Observation', 'Discovery'],
      body: 'Study living food webs, environmental cycles, strange creatures, and complete ecological chapters from remote camera sites.'
    },
    {
      name: 'Operation: StarFall',
      tags: ['Space', 'Exploration', 'Drones'],
      body: 'Explore specialized worlds across the outer solar system with drones, sampling tools, missions, and connected vessel systems.'
    },
    {
      name: 'Utopia Conflict',
      tags: ['Hardlight', 'Combat', 'Capture'],
      body: 'Fight through a procedural vector city with capture zones, civilians, patrol drones, specialized weapons, and reactive armor.'
    },
    {
      name: 'Depths: Layer Descent',
      tags: ['Voxel', 'Descent', 'Survival'],
      body: 'Dig through distinct underground layers, follow shifting objectives, collect rare materials, survive hazards, and travel with changing companions.'
    },
    {
      name: 'HEX CONTRACT',
      tags: ['Strategy', 'Heroes', 'Contracts'],
      body: 'Prepare a roster of heroes for dangerous contracts where equipment, relationships, strain, death, recovery, and sovereign encounters persist.'
    },
    {
      name: 'Fatebound',
      tags: ['Cards', 'Elements', 'Duels'],
      body: 'Build an elemental collection, summon cards through tribute and convergence, and fight across changing battlefield weather.'
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
    link.href = './assets/css/site_refresh_july2026.css?v=20260804-public';
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
          <span class="refresh-kicker">Featured worlds</span>
          <h2>Explore the worlds inside the Prototype Lab.</h2>
          <p>Cyberpunk cities, alien ecosystems, fantasy expeditions, space missions, card battles, survival journeys, and creative tools all share one growing arcade.</p>
        </div>
      </div>
      <div class="prototype-grid">${prototypes.map(cardMarkup).join('')}</div>`;
    target.insertAdjacentElement('beforebegin', section);
  }

  function removeInternalSections() {
    document.getElementById('latestLabUpdate')?.remove();
    document.getElementById('roadmap')?.remove();
    document.querySelectorAll('.nav a[href="#roadmap"], .footer-links a[href="#roadmap"]').forEach((link) => link.remove());
  }

  function refreshNavigation() {
    const nav = document.querySelector('.nav');
    if (nav && !nav.querySelector('a[href="#prototypeShowcase"]')) {
      const link = document.createElement('a');
      link.href = '#prototypeShowcase';
      link.textContent = 'Projects';
      const mediaLink = nav.querySelector('a[href="#media"]');
      nav.insertBefore(link, mediaLink || null);
    }

    document.querySelectorAll('.nav a[href="#prototypeShowcase"], .footer-links a[href="#prototypeShowcase"]').forEach((link) => {
      link.textContent = 'Projects';
    });
  }

  function repairBrandImages() {
    ['navLogo', 'footerLogo'].forEach((id) => {
      const image = document.getElementById(id);
      if (!image || image.dataset.publicFallbackReady === 'true') return;
      image.dataset.publicFallbackReady = 'true';
      image.alt = '';
      const hideBrokenImage = () => {
        image.hidden = true;
        image.style.display = 'none';
      };
      image.addEventListener('error', hideBrokenImage, { once: true });
      if (image.complete && image.naturalWidth === 0) hideBrokenImage();
    });
  }

  function refreshCopy() {
    document.body.classList.add('site-refresh-july2026');

    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.content = 'GLITCHED MATRIX Prototype Lab is a connected arcade of games, creative tools, music, lore, and strange playable worlds.';
    }

    setKey('heroEyebrow', '> PLAY • EXPLORE • CREATE <');
    setKey('heroTitle', 'GLITCHED MATRIX Prototype Lab');
    setKey('heroLead', 'A connected arcade of games, creative tools, MatrixCore music, hidden archives, and strange playable worlds.');

    setKey('stat1Label', 'Collection');
    setKey('stat1Value', '19 releases on itch.io');
    setKey('stat2Label', 'Experience');
    setKey('stat2Value', 'Play • Explore • Create');
    setKey('stat3Label', 'Worlds');
    setKey('stat3Value', 'Sci-fi • Fantasy • Survival');
    setKey('stat4Label', 'Made For');
    setKey('stat4Value', 'Players and creators');

    setKey('aboutTitle', 'A connected arcade of games, tools, music, and strange worlds');
    setKey('aboutBody1', 'GLITCHED MATRIX Prototype Lab brings together playable releases, original music, stories, creator tools, and unusual interactive worlds inside the MXOS interface.');
    setKey('aboutBody2', 'Travel from cyberpunk cities and alien ecosystems to fantasy expeditions, planetary exploration, card battles, survival journeys, and world-building tools.');

    setKey('fictionLabel', 'MatrixCore');
    setKey('fictionTitle', 'Music, memory, and the archive beneath the lab');
    setKey('fictionBody1', 'MatrixCore connects original Sound Fragments, recovered Utopia records, HoloCore systems, and the wider fiction surrounding the Prototype Lab.');
    setKey('fictionBody2', 'Follow the lore archive to uncover connected characters, lost systems, hidden histories, and the worlds preserved inside the lab.');

    setKey('featuresLabel', 'Inside MXOS');
    setKey('featuresTitle', 'A launcher, music system, archive, and growing game library');
    setKey('mediaTitle', 'Games, worlds, music, and the archive');
    setKey('galleryNote', 'Scenes and artwork from across the GLITCHED MATRIX collection.');
    setKey('metaTitle', 'What you will find inside');
    setKey('communityTitle', 'For players, builders, tinkerers, and curious people');
    setKey('updatesTitle', 'Latest from the Lab');

    setText('#demoSectionTitle', 'GLITCHED MATRIX Game Collection');
    setText('#demoSectionIntro', 'Browse the available games and open each release for screenshots, details, and downloads.');
    setText('#demoSectionNote', '');
    setText('#demoDetails', 'Choose a release to visit its full itch.io page.');

    const primary = document.getElementById('primaryCta');
    if (primary) {
      primary.href = STEAM_URL;
      primary.textContent = 'View on Steam';
    }

    const secondary = document.getElementById('secondaryCta');
    if (secondary) {
      secondary.href = '#itchGames';
      secondary.textContent = 'Explore the Games';
    }
  }

  function mount() {
    ensureStylesheet();
    installPrototypeShowcase();
    removeInternalSections();
    refreshNavigation();
    repairBrandImages();
    refreshCopy();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount, { once: true });
  } else {
    mount();
  }

  [150, 600, 1400, 3200, 6500, 10000].forEach((delay) => window.setTimeout(mount, delay));
})();
