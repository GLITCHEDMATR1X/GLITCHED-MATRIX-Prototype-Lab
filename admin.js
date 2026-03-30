const ADMIN_PIN = '';
const STORAGE_KEY = 'mxos-site-config-v2';
const SESSION_KEY = 'mxos-site-admin-unlocked';

const defaultConfig = {
  assetVersion: '20260330c',
  heroEyebrow: 'Arcade Hub • Virtual Desktop • Creator Sandbox',
  heroTitle: 'Matrix OS: Arcade Evolution',
  heroLead: 'A dark operating surface for playable prototypes, creator tools, modular apps, and an expanding arcade ecosystem.',
  heroTags: [
    'Early Access',
    'Virtual Desktop',
    'Creator Sandbox',
    'VR Support In Progress',
    'Mod-Friendly Direction'
  ],
  stat1Label: 'Status',
  stat1Value: 'Early Access',
  stat2Label: 'Library Size',
  stat2Value: '50+ Games & Apps',
  stat3Label: 'Working On Now',
  stat3Value: 'VR Support + Platform Polish',
  stat4Label: 'Ultimate Goal',
  stat4Value: 'Immersive Platform For Creators And Players',
  aboutLabel: 'About Matrix OS',
  aboutTitle: 'A site for the evolving platform, not just one page',
  aboutBody1: 'Matrix OS is positioned as a virtual desktop environment where games, tools, experiments, and creator workflows live inside one system-like world.',
  aboutBody2: 'The long-term direction is bigger than a single release: an immersive platform for testers, modders, content creators of all types, publishers, and gamers to explore, build, evaluate, and share work.',
  fictionLabel: 'Lore',
  fictionTitle: 'Rebuild the archive',
  fictionBody1: 'The fiction should preserve the sense of a damaged hub, surviving systems, and an archive trying to keep projects alive after collapse.',
  fictionBody2: 'That gives the platform a stronger identity than a generic storefront and ties future tools and services back into the same world.',
  featuresLabel: 'Current Build',
  featuresTitle: 'What the platform is communicating right now',
  focusLabel: 'Current Focus',
  focusBody: 'VR support, platform stability, clearer workflows, stronger customization, and a more immersive presentation layer.',
  features: [
    { title: 'Large prototype library', body: 'The Steam presentation establishes Matrix OS as a desktop-like hub with 50+ games and apps already in the environment.' },
    { title: 'Desktop UI systems', body: 'Start menu categories, pinning, wallpaper control, music and volume handling, and windowed interaction reinforce the OS identity.' },
    { title: 'Python launch workflow', body: 'Projects can launch from folders through main.py, which fits the platform’s tool-and-arcade structure.' },
    { title: 'Modular tools', body: 'Drop-in tools and separate entry points support the idea of Matrix OS as a creator platform rather than a single product.' },
    { title: 'ChatSpace and agents', body: 'Multi-agent chat, DMs, logs, and creative interactions make the platform feel active and system-like.' },
    { title: 'Crash reporting focus', body: 'Logs and debugging surfaces fit the workstation angle and communicate an ongoing push toward stability.' }
  ],
  roadmapLabel: 'Near-Term Roadmap',
  roadmapTitle: 'What is being pushed next',
  roadmap: [
    'Continue integrating VR support and immersive interaction paths',
    'Improve platform stability, crash handling, and clearer diagnostics',
    'Refine creator workflow, packaging, and project organization tools',
    'Expand customization, themes, widgets, and desktop control surfaces',
    'Strengthen onboarding, UX readability, and presentational polish',
    'Keep growing the ecosystem of apps, games, and experimental modules'
  ],
  communityLabel: 'Ultimate Platform Vision',
  communityTitle: 'Who this is being built for',
  community: [
    { title: 'Testers', body: 'A place to explore builds, evaluate features, report issues, and move through experiments with better visibility.' },
    { title: 'Modders', body: 'A more immersive home for replaceable assets, extension points, custom content, and community iteration.' },
    { title: 'Content creators', body: 'A broader platform for creators of all types to present projects, tools, media, and worlds inside a shared environment.' },
    { title: 'Publishers and gamers', body: 'A system-like venue where finished releases, prototypes, communities, and discovery can coexist in one evolving platform.' }
  ],
  mediaLabel: 'Media',
  mediaTitle: 'Trailer, interface, and presentation materials',
  metaLabel: 'Modes, Tags, and Features',
  metaTitle: 'Store identity',
  visualLabel: 'Visual Identity',
  visualTitle: 'Presentable, dark, and system-like',
  visualBody: 'The site should feel like an industrial control surface with teal neon, matte black panels, restrained logo usage, and enough media to show the platform clearly without overwhelming the page.',
  metaTags: [
    'Simulation', 'God Game', 'Pixel Graphics', 'Retro', 'Artificial Intelligence',
    'Single-player', 'Early Access', 'Racing', 'Sports', 'Strategy', 'Action',
    'Adventure', 'RPG', 'Indie', 'Casual', 'Arcade', 'Steam Workshop',
    'Includes Level Editor', 'Remote Play Together', 'Family Sharing'
  ],
  footerCopy: '© GLITCHED MATRIX — Matrix OS: Arcade Evolution',
  links: {
    primaryText: 'View on Steam',
    primaryHref: 'https://store.steampowered.com/app/4386390/Matrix_OS_Arcade_Evolution/',
    secondaryText: 'Explore Project',
    secondaryHref: '#about',
    trailerHref: 'https://youtu.be/d78EOS1a1-8?si=JSakLn7A1Jhj1Gm0',
    trailerText: 'Watch on YouTube',
    loreText: 'Read More',
    loreHref: 'https://www.amazon.fr/-/en/GLITCHED-MATRIX-ebook/dp/B0CW1NMCK9?dib=eyJ2IjoiMSJ9.ShEoM8fvlVyl0lBCimWn7g.391iz7J7Q4lB5VWhg76Ejhc_X0fP6_H75N4bnJ76Wns&dib_tag=se&qid=1774876478&refinements=p_27%3AGLITCHED+MATRIX&s=digital-text&sr=1-1&text=GLITCHED+MATRIX'
  },
  images: {
    heroLogo: 'assets/images/logo.png',
    heroHeader: 'assets/images/library_hero.png',
    navLogo: 'assets/images/logo.png',
    footerLogo: 'assets/images/library_header.png',
    mediaMain: 'assets/images/SCREENSHOT.png',
    mediaAlt1: 'assets/images/screenshot2.png',
    mediaAlt2: 'assets/images/matrixos_window.png',
    mediaAlt3: 'assets/images/c1.png',
    mediaAlt4: 'assets/images/c2.png'
  },
  theme: {
    accent: '#5ec6a0',
    bg: '#050706',
    panel: '#101614'
  }
};

let config = loadConfig();
let adminOpen = false;

const IMAGE_FALLBACK_MAP = {
  heroLogo: ['logo.png', 'capsule_small.png', 'bg.png'],
  navLogo: ['logo.png', 'capsule_small.png', 'bg.png'],
  footerLogo: ['library_header.png', 'capsule_header.png', 'capsule_main.png'],
  heroHeader: ['library_hero.png', 'library_header.png', 'page_background.png'],
  mediaMain: ['SCREENSHOT.png', 'screenshot2.png', 'matrixos_window.png'],
  mediaAlt1: ['screenshot2.png', 'SCREENSHOT.png', 'matrixos_window.png'],
  mediaAlt2: ['matrixos_window.png', 'capsule_main.png', 'library_capsule.png'],
  mediaAlt3: ['c1.png', 'library_capsule.png', 'capsule_vertical.png'],
  mediaAlt4: ['c2.png', 'capsule_vertical.png', 'capsule_main.png']
};

function loadConfig() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(defaultConfig);
    return deepMerge(structuredClone(defaultConfig), JSON.parse(raw));
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

function $(id) {
  return document.getElementById(id);
}

function safeSetText(id, value) {
  const el = $(id);
  if (el && value != null) el.textContent = value;
}

function setThemeVars() {
  document.documentElement.style.setProperty('--accent', config.theme.accent);
  document.documentElement.style.setProperty('--accent-bright', alterHex(config.theme.accent, 38));
  document.documentElement.style.setProperty('--bg-0', config.theme.bg);
  document.documentElement.style.setProperty('--bg-1', alterHex(config.theme.bg, -8));
  document.documentElement.style.setProperty('--bg-2', config.theme.panel);
  document.documentElement.style.setProperty('--panel-rgb', hexToRgb(config.theme.panel));
}

function hexToRgb(hex) {
  const v = (hex || '#000000').replace('#', '');
  const n = parseInt(v, 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

function alterHex(hex, amt) {
  const clean = (hex || '#000000').replace('#', '');
  const num = parseInt(clean, 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amt));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 255) + amt));
  const b = Math.min(255, Math.max(0, (num & 255) + amt));
  return `#${[r, g, b].map(v => v.toString(16).padStart(2, '0')).join('')}`;
}

function applyEditableText() {
  document.querySelectorAll('.editable[data-key]').forEach((el) => {
    const key = el.dataset.key;
    if (config[key] != null) el.innerText = config[key];
  });
}

function renderList(targetId, items, factory) {
  const node = $(targetId);
  if (!node) return;
  node.innerHTML = '';
  items.forEach(item => node.appendChild(factory(item)));
}

function makeTag(text) {
  const span = document.createElement('span');
  span.textContent = text;
  return span;
}

function makeCard(item) {
  const article = document.createElement('article');
  article.className = 'feature-box';
  article.innerHTML = `<h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.body)}</p>`;
  return article;
}

function makeBullet(text) {
  const li = document.createElement('li');
  li.textContent = text;
  return li;
}

function applyLinks() {
  const primary = $('primaryCta');
  const secondary = $('secondaryCta');
  const trailer = $('trailerLink');
  const lore = $('loreLink');
  if (primary) {
    primary.textContent = config.links.primaryText;
    primary.href = config.links.primaryHref;
  }
  if (secondary) {
    secondary.textContent = config.links.secondaryText;
    secondary.href = config.links.secondaryHref;
  }
  if (trailer) {
    trailer.textContent = config.links.trailerText;
    trailer.href = config.links.trailerHref;
  }
  if (lore) {
    lore.textContent = config.links.loreText;
    lore.href = config.links.loreHref;
  }
  const iframe = $('trailerEmbed');
  if (iframe) iframe.src = toYouTubeEmbedUrl(config.links.trailerHref) || 'https://www.youtube.com/embed/d78EOS1a1-8?rel=0';
}

function fileNameOnly(path) {
  return String(path || '').split('/').pop();
}

function isAbsolutePath(path) {
  return /^(https?:|data:|blob:|\/)/i.test(String(path || '').trim());
}

function withVersion(url) {
  const version = String(config.assetVersion || '').trim();
  if (!version || isAbsolutePath(url) || url.includes('data:')) return url;
  return url.includes('?') ? `${url}&v=${encodeURIComponent(version)}` : `${url}?v=${encodeURIComponent(version)}`;
}

function makeImageCandidates(path, slot) {
  const input = String(path || '').trim();
  const names = IMAGE_FALLBACK_MAP[slot] || [];
  const pickedName = fileNameOnly(input);
  const set = new Set();

  const add = (value) => {
    if (!value) return;
    set.add(withVersion(value));
  };

  if (input) {
    add(input.replace(/^\.\//, ''));
    if (!isAbsolutePath(input)) {
      add(`assets/images/${pickedName}`);
      add(`./assets/images/${pickedName}`);
      add(`site_bundle/assets/images/${pickedName}`);
      add(`steamtemp/${pickedName}`);
    }
  }

  names.forEach((name) => {
    add(`assets/images/${name}`);
    add(`./assets/images/${name}`);
    add(`site_bundle/assets/images/${name}`);
    add(`steamtemp/${name}`);
  });

  return [...set];
}

function applyResolvedSource(el, candidates) {
  if (!el || !candidates.length) return;
  let index = 0;
  const tryNext = () => {
    if (index >= candidates.length) return;
    el.src = candidates[index++];
  };
  el.onerror = tryNext;
  tryNext();
}

function applyImages() {
  applyResolvedSource($('heroLogo'), makeImageCandidates(config.images.heroLogo, 'heroLogo'));
  applyResolvedSource($('heroHeaderImage'), makeImageCandidates(config.images.heroHeader, 'heroHeader'));
  applyResolvedSource($('navLogo'), makeImageCandidates(config.images.navLogo, 'navLogo'));
  applyResolvedSource($('footerLogo'), makeImageCandidates(config.images.footerLogo, 'footerLogo'));
  applyResolvedSource($('mediaMain'), makeImageCandidates(config.images.mediaMain, 'mediaMain'));
  applyResolvedSource($('mediaAlt1'), makeImageCandidates(config.images.mediaAlt1, 'mediaAlt1'));
  applyResolvedSource($('mediaAlt2'), makeImageCandidates(config.images.mediaAlt2, 'mediaAlt2'));
  applyResolvedSource($('mediaAlt3'), makeImageCandidates(config.images.mediaAlt3, 'mediaAlt3'));
  applyResolvedSource($('mediaAlt4'), makeImageCandidates(config.images.mediaAlt4, 'mediaAlt4'));
}

function applyConfig() {
  setThemeVars();
  applyEditableText();
  applyLinks();
  applyImages();
  renderList('heroTags', config.heroTags, makeTag);
  renderList('metaTags', config.metaTags, makeTag);
  renderList('featuresGrid', config.features, makeCard);
  renderList('roadmapList', config.roadmap, makeBullet);
  renderList('communityGrid', config.community, makeCard);
  syncAdminInputs();
}

function syncAdminInputs() {
  const set = (id, value) => { if ($(id)) $(id).value = value; };
  set('accentColor', config.theme.accent);
  set('bgColor', config.theme.bg);
  set('panelColor', config.theme.panel);
  set('assetVersionInput', config.assetVersion || '');
  set('primaryCtaText', config.links.primaryText);
  set('primaryCtaLink', config.links.primaryHref);
  set('secondaryCtaText', config.links.secondaryText);
  set('secondaryCtaLink', config.links.secondaryHref);
  set('trailerUrlInput', config.links.trailerHref);
  set('trailerLinkTextInput', config.links.trailerText);
  set('loreLinkTextInput', config.links.loreText);
  set('loreLinkInput', config.links.loreHref);
  set('heroLogoInput', config.images.heroLogo);
  set('heroHeaderInput', config.images.heroHeader);
  set('navLogoInput', config.images.navLogo);
  set('footerLogoInput', config.images.footerLogo);
  set('mediaMainInput', config.images.mediaMain);
  set('mediaAlt1Input', config.images.mediaAlt1);
  set('mediaAlt2Input', config.images.mediaAlt2);
  set('mediaAlt3Input', config.images.mediaAlt3);
  set('mediaAlt4Input', config.images.mediaAlt4);
  set('heroTagsInput', config.heroTags.join('\n'));
  set('metaTagsInput', config.metaTags.join('\n'));
  set('featuresInput', config.features.map(item => `${item.title} | ${item.body}`).join('\n'));
  set('roadmapInput', config.roadmap.join('\n'));
  set('communityInput', config.community.map(item => `${item.title} | ${item.body}`).join('\n'));
}

function readEditableText() {
  document.querySelectorAll('.editable[data-key]').forEach((el) => {
    config[el.dataset.key] = el.innerText.trim();
  });
}

function parseLines(text) {
  return String(text || '').split('\n').map(v => v.trim()).filter(Boolean);
}

function parseCards(text) {
  return parseLines(text).map((line) => {
    const [title, ...rest] = line.split('|');
    return { title: (title || '').trim(), body: rest.join('|').trim() };
  }).filter(item => item.title && item.body);
}

function pullAdminValues() {
  readEditableText();
  config.theme.accent = $('accentColor')?.value || defaultConfig.theme.accent;
  config.theme.bg = $('bgColor')?.value || defaultConfig.theme.bg;
  config.theme.panel = $('panelColor')?.value || defaultConfig.theme.panel;
  config.assetVersion = $('assetVersionInput')?.value.trim() || defaultConfig.assetVersion;
  config.links.primaryText = $('primaryCtaText')?.value.trim() || defaultConfig.links.primaryText;
  config.links.primaryHref = $('primaryCtaLink')?.value.trim() || defaultConfig.links.primaryHref;
  config.links.secondaryText = $('secondaryCtaText')?.value.trim() || defaultConfig.links.secondaryText;
  config.links.secondaryHref = $('secondaryCtaLink')?.value.trim() || defaultConfig.links.secondaryHref;
  config.links.trailerHref = $('trailerUrlInput')?.value.trim() || defaultConfig.links.trailerHref;
  config.links.trailerText = $('trailerLinkTextInput')?.value.trim() || defaultConfig.links.trailerText;
  config.links.loreText = $('loreLinkTextInput')?.value.trim() || defaultConfig.links.loreText;
  config.links.loreHref = $('loreLinkInput')?.value.trim() || defaultConfig.links.loreHref;
  config.images.heroLogo = $('heroLogoInput')?.value.trim() || defaultConfig.images.heroLogo;
  config.images.heroHeader = $('heroHeaderInput')?.value.trim() || defaultConfig.images.heroHeader;
  config.images.navLogo = $('navLogoInput')?.value.trim() || defaultConfig.images.navLogo;
  config.images.footerLogo = $('footerLogoInput')?.value.trim() || defaultConfig.images.footerLogo;
  config.images.mediaMain = $('mediaMainInput')?.value.trim() || defaultConfig.images.mediaMain;
  config.images.mediaAlt1 = $('mediaAlt1Input')?.value.trim() || defaultConfig.images.mediaAlt1;
  config.images.mediaAlt2 = $('mediaAlt2Input')?.value.trim() || defaultConfig.images.mediaAlt2;
  config.images.mediaAlt3 = $('mediaAlt3Input')?.value.trim() || defaultConfig.images.mediaAlt3;
  config.images.mediaAlt4 = $('mediaAlt4Input')?.value.trim() || defaultConfig.images.mediaAlt4;
  config.heroTags = parseLines($('heroTagsInput')?.value);
  config.metaTags = parseLines($('metaTagsInput')?.value);
  config.features = parseCards($('featuresInput')?.value);
  config.roadmap = parseLines($('roadmapInput')?.value);
  config.community = parseCards($('communityInput')?.value);
}

function setAdminEditableState(enabled) {
  document.querySelectorAll('.editable').forEach((el) => {
    el.contentEditable = enabled ? 'true' : 'false';
    el.classList.toggle('admin-editing', enabled);
  });
}

function ensureUnlocked() {
  if (!ADMIN_PIN) return true;
  if (sessionStorage.getItem(SESSION_KEY) === '1') return true;
  const typed = prompt('Enter admin PIN');
  if (typed === ADMIN_PIN) {
    sessionStorage.setItem(SESSION_KEY, '1');
    return true;
  }
  alert('Admin PIN incorrect.');
  return false;
}

function toggleAdmin(force) {
  const desired = force == null ? !adminOpen : !!force;
  if (desired && !ensureUnlocked()) return;
  adminOpen = desired;
  const panel = $('adminPanel');
  if (!panel) return;
  panel.classList.toggle('open', adminOpen);
  panel.setAttribute('aria-hidden', String(!adminOpen));
  setAdminEditableState(adminOpen);
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
      config = deepMerge(structuredClone(defaultConfig), JSON.parse(reader.result));
      saveConfig();
      applyConfig();
    } catch {
      alert('Invalid JSON file.');
    }
  };
  reader.readAsText(file);
}

function bindFileInput(id, onLoad) {
  const input = $(id);
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

function extractYouTubeId(input) {
  const value = String(input || '').trim();
  if (!value) return '';
  if (/^[A-Za-z0-9_-]{11}$/.test(value)) return value;
  const patterns = [
    /youtu\.be\/([A-Za-z0-9_-]{11})/i,
    /[?&]v=([A-Za-z0-9_-]{11})/i,
    /youtube\.com\/embed\/([A-Za-z0-9_-]{11})/i,
    /youtube\.com\/shorts\/([A-Za-z0-9_-]{11})/i
  ];
  for (const pattern of patterns) {
    const match = value.match(pattern);
    if (match) return match[1];
  }
  return '';
}

function toYouTubeEmbedUrl(input) {
  const id = extractYouTubeId(input);
  return id ? `https://www.youtube.com/embed/${id}?rel=0` : '';
}

function setupAdmin() {
  $('adminToggle')?.addEventListener('click', () => toggleAdmin());
  $('closeAdmin')?.addEventListener('click', () => toggleAdmin(false));
  $('saveAdmin')?.addEventListener('click', () => {
    pullAdminValues();
    saveConfig();
    applyConfig();
  });
  $('resetAdmin')?.addEventListener('click', () => {
    if (!confirm('Reset the page to default content?')) return;
    config = structuredClone(defaultConfig);
    saveConfig();
    applyConfig();
  });
  $('exportAdmin')?.addEventListener('click', exportJson);
  $('importAdmin')?.addEventListener('change', (event) => {
    const file = event.target.files?.[0];
    if (file) importJson(file);
  });

  bindFileInput('uploadHeroLogo', (data) => {
    config.images.heroLogo = data;
    config.images.navLogo = data;
    if ($('heroLogoInput')) $('heroLogoInput').value = data;
    if ($('navLogoInput')) $('navLogoInput').value = data;
  });
  bindFileInput('uploadHeroHeader', (data) => {
    config.images.heroHeader = data;
    if ($('heroHeaderInput')) $('heroHeaderInput').value = data;
  });
  bindFileInput('uploadMediaMain', (data) => {
    config.images.mediaMain = data;
    if ($('mediaMainInput')) $('mediaMainInput').value = data;
  });
  bindFileInput('uploadMediaAlt1', (data) => {
    config.images.mediaAlt1 = data;
    if ($('mediaAlt1Input')) $('mediaAlt1Input').value = data;
  });
  bindFileInput('uploadMediaAlt2', (data) => {
    config.images.mediaAlt2 = data;
    if ($('mediaAlt2Input')) $('mediaAlt2Input').value = data;
  });
  bindFileInput('uploadMediaAlt3', (data) => {
    config.images.mediaAlt3 = data;
    if ($('mediaAlt3Input')) $('mediaAlt3Input').value = data;
  });
  bindFileInput('uploadMediaAlt4', (data) => {
    config.images.mediaAlt4 = data;
    if ($('mediaAlt4Input')) $('mediaAlt4Input').value = data;
  });

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
setupAdmin();
