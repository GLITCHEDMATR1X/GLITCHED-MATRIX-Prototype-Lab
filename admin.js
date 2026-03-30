const defaultConfig = {
  microLabel: 'GLITCHED MATRIX',
  heroEyebrow: 'Arcade Hub • Virtual Desktop • Creator Sandbox',
  heroTitle: 'Matrix OS: Arcade Evolution',
  heroLead: 'A dark operating surface for playable prototypes, creator tools, modular apps, and an expanding arcade ecosystem.',
  heroTags: ['Early Access', 'Single-player', 'Workshop', 'Level Editor', 'LAN / Split-Screen Modes'],
  stat1Label: 'Status',
  stat1Value: 'Early Access',
  stat2Label: 'Library Size',
  stat2Value: '50+ Games & Apps',
  stat3Label: 'Core Identity',
  stat3Value: 'Creator Desktop + Arcade',
  stat4Label: 'Focus',
  stat4Value: 'Tools, Workflows, Modularity',
  aboutLabel: 'About This Project',
  aboutTitle: 'More than a game page',
  aboutBody1: 'Matrix OS is positioned as a virtual desktop environment where games, tools, experiments, and creator workflows live inside one system-like world.',
  aboutBody2: 'The site mirrors that identity with a dark control-surface look, teal neon accents, industrial silhouettes, and a media-first layout inspired by your Steam presentation.',
  fictionLabel: 'Project Fiction',
  fictionTitle: 'Rebuild the archive',
  fictionBody1: 'The world framing should preserve the sense of a damaged hub, preserved systems, and a surviving archive trying to keep projects alive.',
  fictionBody2: 'That gives the brand a stronger identity than a generic storefront and helps future services feel like part of the same platform.',
  featuresLabel: 'Current Build',
  featuresTitle: 'What the Steam page is communicating',
  features: [
    { title: 'Large prototype library', body: 'An expanding collection of games and apps already framed as a major part of the platform.' },
    { title: 'Desktop UI systems', body: 'Start menu organization, wallpapers, volume controls, pinning, and window modes reinforce the operating-system identity.' },
    { title: 'Python launch workflow', body: 'Projects can be launched from folders through main.py, with descriptions and thumbnails fitting the arcade-desktop concept.' },
    { title: 'Modular tools', body: 'Drop-in tools and separate entry points support the idea of Matrix OS as a creator platform rather than a single product.' },
    { title: 'ChatSpace and agents', body: 'Multi-agent chat, DMs, logging, and creative interaction make the platform feel more alive and system-like.' },
    { title: 'Crash reporting focus', body: 'Logs and debugging surfaces fit the workstation angle and communicate an ongoing push toward stability.' }
  ],
  roadmapLabel: 'Toward 1.0',
  roadmapTitle: 'Planned expansion',
  roadmap: [
    'More built-in OS apps and creator utilities',
    'Better setup, packaging, and asset organization helpers',
    'Stronger Panda3D-oriented workflows and templates',
    'More customization, themes, and desktop controls',
    'Clearer onboarding, guidance, and user-facing polish',
    'More stability and performance tuning across hardware'
  ],
  directionLabel: 'Development Direction',
  directionTitle: 'How the project should mature',
  directionBody1: 'Stability, UI readability, creator workflow, and performance should stay at the center of the presentation.',
  directionBody2: 'This page is structured so you can evolve it from a Steam-adjacent landing page into a broader site for future services and custom tools.',
  mediaLabel: 'Media',
  mediaTitle: 'Screenshots and brand visuals',
  metaLabel: 'Modes, Tags, and Features',
  metaTitle: 'Store identity',
  metaTags: [
    'Simulation', 'God Game', 'Pixel Graphics', 'Retro', 'Artificial Intelligence',
    'Single-player', 'Early Access', 'Racing', 'Sports', 'Strategy', 'Action',
    'Adventure', 'RPG', 'Indie', 'Casual', 'Arcade', 'Steam Workshop',
    'Includes level editor', 'Remote Play Together', 'Family Sharing'
  ],
  communityLabel: 'Community Direction',
  communityTitle: 'What feedback should shape',
  community: [
    { title: 'Stability', body: 'Crash reports, logs, and real testing feedback should drive fixes quickly.' },
    { title: 'Creator workflow', body: 'How users discover, launch, patch, and organize projects should keep improving.' },
    { title: 'UI and readability', body: 'Desktop clarity, window behavior, navigation, and accessibility should stay polished.' },
    { title: 'Requested tools', body: 'The platform can grow through utility requests, templates, and integrated helpers.' }
  ],
  footerCopy: '© GLITCHED MATRIX — Matrix OS: Arcade Evolution',
  links: {
    primaryText: 'View on Steam',
    primaryHref: 'https://store.steampowered.com/app/4386390/Matrix_OS_Arcade_Evolution/',
    secondaryText: 'Explore Project',
    secondaryHref: '#about'
  },
  images: {
    heroLogo: 'assets/images/logo.png',
    heroHeader: 'assets/images/library_hero.png',
    navLogo: 'assets/images/logo.png',
    footerLogo: 'assets/images/library_header.png',
    mediaMain: 'assets/images/SCREENSHOT.png',
    mediaAlt1: 'assets/images/screenshot2.png',
    mediaAlt2: 'assets/images/c1.png',
    mediaAlt3: 'assets/images/c2.png',
    mediaAlt4: 'assets/images/bg.png'
  },
  theme: {
    accent: '#67ba9a',
    bg: '#040505',
    panel: '#101614'
  }
};

const STORAGE_KEY = 'mxos-site-config-v1';
let config = loadConfig();
let adminOpen = false;
let audioPlaying = false;

function loadConfig() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return structuredClone(defaultConfig);
    return deepMerge(structuredClone(defaultConfig), JSON.parse(stored));
  } catch {
    return structuredClone(defaultConfig);
  }
}

function deepMerge(base, extra) {
  for (const key in extra) {
    if (extra[key] && typeof extra[key] === 'object' && !Array.isArray(extra[key]) && base[key]) {
      base[key] = deepMerge(base[key], extra[key]);
    } else {
      base[key] = extra[key];
    }
  }
  return base;
}

function saveConfig() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

function setRootTheme() {
  document.documentElement.style.setProperty('--accent', config.theme.accent);
  document.documentElement.style.setProperty('--accent-bright', lighten(config.theme.accent, 26));
  document.documentElement.style.setProperty('--bg-0', config.theme.bg);
  document.documentElement.style.setProperty('--bg-1', darken(config.theme.bg, 10));
  document.documentElement.style.setProperty('--bg-2', config.theme.panel);
  document.documentElement.style.setProperty('--panel-rgb', hexToRgb(config.theme.panel));
}

function hexToRgb(hex) {
  const cleaned = hex.replace('#', '');
  const bigint = parseInt(cleaned, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
}

function lighten(hex, amount) {
  return alterHex(hex, amount);
}

function darken(hex, amount) {
  return alterHex(hex, -amount);
}

function alterHex(hex, amt) {
  const clean = hex.replace('#', '');
  const num = parseInt(clean, 16);
  let r = Math.min(255, Math.max(0, (num >> 16) + amt));
  let g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amt));
  let b = Math.min(255, Math.max(0, (num & 0x0000ff) + amt));
  return `#${[r, g, b].map(v => v.toString(16).padStart(2, '0')).join('')}`;
}

function renderList(targetId, items, formatter) {
  const node = document.getElementById(targetId);
  node.innerHTML = '';
  items.forEach((item) => node.appendChild(formatter(item)));
}

function makeFeatureCard(item) {
  const div = document.createElement('article');
  div.className = 'feature-box';
  div.innerHTML = `<h3>${escapeHtml(item.title)}</h3><p class="feature-body">${escapeHtml(item.body)}</p>`;
  return div;
}

function makeTag(item) {
  const span = document.createElement('span');
  span.textContent = item;
  return span;
}

function makeRoadmapItem(item) {
  const li = document.createElement('li');
  li.textContent = item;
  return li;
}

function applyText() {
  document.querySelectorAll('.editable[data-key]').forEach((el) => {
    const key = el.dataset.key;
    if (config[key] != null) el.innerText = config[key];
  });
}

function applyLinks() {
  const primary = document.getElementById('primaryCta');
  const secondary = document.getElementById('secondaryCta');
  primary.textContent = config.links.primaryText;
  primary.href = config.links.primaryHref;
  secondary.textContent = config.links.secondaryText;
  secondary.href = config.links.secondaryHref;
}

function applyImages() {
  document.getElementById('heroLogo').src = config.images.heroLogo;
  document.getElementById('heroHeaderImage').src = config.images.heroHeader;
  document.getElementById('navLogo').src = config.images.navLogo;
  document.getElementById('footerLogo').src = config.images.footerLogo;
  document.getElementById('mediaMain').src = config.images.mediaMain;
  document.getElementById('mediaAlt1').src = config.images.mediaAlt1;
  document.getElementById('mediaAlt2').src = config.images.mediaAlt2;
  document.getElementById('mediaAlt3').src = config.images.mediaAlt3;
  document.getElementById('mediaAlt4').src = config.images.mediaAlt4;
}

function applyConfig() {
  setRootTheme();
  applyText();
  applyLinks();
  applyImages();
  renderList('heroTags', config.heroTags, makeTag);
  renderList('metaTags', config.metaTags, makeTag);
  renderList('featuresGrid', config.features, makeFeatureCard);
  renderList('roadmapList', config.roadmap, makeRoadmapItem);
  renderList('communityGrid', config.community, makeFeatureCard);
  syncAdminInputs();
}

function syncAdminInputs() {
  const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
  setVal('accentColor', config.theme.accent);
  setVal('bgColor', config.theme.bg);
  setVal('panelColor', config.theme.panel);
  setVal('primaryCtaText', config.links.primaryText);
  setVal('primaryCtaLink', config.links.primaryHref);
  setVal('secondaryCtaText', config.links.secondaryText);
  setVal('secondaryCtaLink', config.links.secondaryHref);
  setVal('heroLogoInput', config.images.heroLogo);
  setVal('heroHeaderInput', config.images.heroHeader);
  setVal('navLogoInput', config.images.navLogo);
  setVal('footerLogoInput', config.images.footerLogo);
  setVal('heroTagsInput', config.heroTags.join('\n'));
  setVal('metaTagsInput', config.metaTags.join('\n'));
  setVal('featuresInput', config.features.map(f => `${f.title} | ${f.body}`).join('\n'));
  setVal('roadmapInput', config.roadmap.join('\n'));
  setVal('communityInput', config.community.map(c => `${c.title} | ${c.body}`).join('\n'));
  setVal('mediaMainInput', config.images.mediaMain);
  setVal('mediaAlt1Input', config.images.mediaAlt1);
  setVal('mediaAlt2Input', config.images.mediaAlt2);
  setVal('mediaAlt3Input', config.images.mediaAlt3);
  setVal('mediaAlt4Input', config.images.mediaAlt4);
}

function readEditableTextFromPage() {
  document.querySelectorAll('.editable[data-key]').forEach((el) => {
    const key = el.dataset.key;
    config[key] = el.innerText.trim();
  });
}

function parseLineItems(text) {
  return text.split('\n').map(v => v.trim()).filter(Boolean);
}

function parseCardLines(text) {
  return parseLineItems(text).map((line) => {
    const [title, ...rest] = line.split('|');
    return { title: (title || '').trim(), body: rest.join('|').trim() };
  }).filter(item => item.title && item.body);
}

function pullAdminValues() {
  readEditableTextFromPage();
  config.theme.accent = document.getElementById('accentColor').value;
  config.theme.bg = document.getElementById('bgColor').value;
  config.theme.panel = document.getElementById('panelColor').value;
  config.links.primaryText = document.getElementById('primaryCtaText').value.trim() || defaultConfig.links.primaryText;
  config.links.primaryHref = document.getElementById('primaryCtaLink').value.trim() || defaultConfig.links.primaryHref;
  config.links.secondaryText = document.getElementById('secondaryCtaText').value.trim() || defaultConfig.links.secondaryText;
  config.links.secondaryHref = document.getElementById('secondaryCtaLink').value.trim() || defaultConfig.links.secondaryHref;
  config.images.heroLogo = document.getElementById('heroLogoInput').value.trim() || defaultConfig.images.heroLogo;
  config.images.heroHeader = document.getElementById('heroHeaderInput').value.trim() || defaultConfig.images.heroHeader;
  config.images.navLogo = document.getElementById('navLogoInput').value.trim() || defaultConfig.images.navLogo;
  config.images.footerLogo = document.getElementById('footerLogoInput').value.trim() || defaultConfig.images.footerLogo;
  config.heroTags = parseLineItems(document.getElementById('heroTagsInput').value);
  config.metaTags = parseLineItems(document.getElementById('metaTagsInput').value);
  config.features = parseCardLines(document.getElementById('featuresInput').value);
  config.roadmap = parseLineItems(document.getElementById('roadmapInput').value);
  config.community = parseCardLines(document.getElementById('communityInput').value);
  config.images.mediaMain = document.getElementById('mediaMainInput').value.trim() || defaultConfig.images.mediaMain;
  config.images.mediaAlt1 = document.getElementById('mediaAlt1Input').value.trim() || defaultConfig.images.mediaAlt1;
  config.images.mediaAlt2 = document.getElementById('mediaAlt2Input').value.trim() || defaultConfig.images.mediaAlt2;
  config.images.mediaAlt3 = document.getElementById('mediaAlt3Input').value.trim() || defaultConfig.images.mediaAlt3;
  config.images.mediaAlt4 = document.getElementById('mediaAlt4Input').value.trim() || defaultConfig.images.mediaAlt4;
}

function toggleAdmin(force = null) {
  adminOpen = force == null ? !adminOpen : force;
  const panel = document.getElementById('adminPanel');
  panel.classList.toggle('open', adminOpen);
  panel.setAttribute('aria-hidden', String(!adminOpen));
  document.querySelectorAll('.editable').forEach((el) => {
    el.contentEditable = adminOpen ? 'true' : 'false';
    el.classList.toggle('admin-editing', adminOpen);
  });
}

function exportJson() {
  const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'mxos-site-config.json';
  a.click();
  URL.revokeObjectURL(url);
}

function importJson(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      config = deepMerge(structuredClone(defaultConfig), parsed);
      saveConfig();
      applyConfig();
    } catch (err) {
      alert('Invalid JSON file.');
    }
  };
  reader.readAsText(file);
}

function bindFileInput(id, onLoad) {
  const input = document.getElementById(id);
  if (!input) return;
  input.addEventListener('change', (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      onLoad(reader.result);
      saveConfig();
      applyConfig();
    };
    reader.readAsDataURL(file);
  });
}

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function setupAudio() {
  const audio = document.getElementById('trailerAudio');
  const button = document.getElementById('soundToggle');
  button.addEventListener('click', async () => {
    if (!audioPlaying) {
      try {
        await audio.play();
        audioPlaying = true;
        button.textContent = 'Pause trailer audio';
      } catch {
        button.textContent = 'Audio blocked — click again';
      }
    } else {
      audio.pause();
      audioPlaying = false;
      button.textContent = 'Play trailer audio';
    }
  });

  audio.addEventListener('ended', () => {
    audioPlaying = false;
    button.textContent = 'Play trailer audio';
  });
}

function setupAdmin() {
  document.getElementById('adminToggle').addEventListener('click', () => toggleAdmin());
  document.getElementById('closeAdmin').addEventListener('click', () => toggleAdmin(false));
  document.getElementById('saveAdmin').addEventListener('click', () => {
    pullAdminValues();
    saveConfig();
    applyConfig();
  });
  document.getElementById('resetAdmin').addEventListener('click', () => {
    if (!confirm('Reset the page to default content?')) return;
    config = structuredClone(defaultConfig);
    saveConfig();
    applyConfig();
  });
  document.getElementById('exportAdmin').addEventListener('click', exportJson);
  document.getElementById('importAdmin').addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (file) importJson(file);
  });

  bindFileInput('uploadHeroLogo', (data) => { config.images.heroLogo = data; config.images.navLogo = data; document.getElementById('heroLogoInput').value = data; document.getElementById('navLogoInput').value = data; });
  bindFileInput('uploadHeroHeader', (data) => { config.images.heroHeader = data; document.getElementById('heroHeaderInput').value = data; });
  bindFileInput('uploadMediaMain', (data) => { config.images.mediaMain = data; document.getElementById('mediaMainInput').value = data; });
  bindFileInput('uploadMediaAlt1', (data) => { config.images.mediaAlt1 = data; document.getElementById('mediaAlt1Input').value = data; });
  bindFileInput('uploadMediaAlt2', (data) => { config.images.mediaAlt2 = data; document.getElementById('mediaAlt2Input').value = data; });
  bindFileInput('uploadMediaAlt3', (data) => { config.images.mediaAlt3 = data; document.getElementById('mediaAlt3Input').value = data; });
  bindFileInput('uploadMediaAlt4', (data) => { config.images.mediaAlt4 = data; document.getElementById('mediaAlt4Input').value = data; });

  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'a') {
      event.preventDefault();
      toggleAdmin();
    }
  });

  if (new URLSearchParams(window.location.search).get('admin') === '1') {
    toggleAdmin(true);
  }
}

applyConfig();
setupAudio();
setupAdmin();
