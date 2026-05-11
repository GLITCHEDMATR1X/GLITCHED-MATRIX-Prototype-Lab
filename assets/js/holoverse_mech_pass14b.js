(()=>{
'use strict';
const LIVE_SCRIPT='./assets/js/holoverse_dashboard_pass35.js?v=20260511-pass36-vector-holocore-copy';
const STYLE_ID='holoverse-pass36-loader-style';
const publicUpdates=[
  {group:'HoloVerse',title:'Living World Direction',meta:'2026-05-11',bullets:[
    'HoloVerse remains the visible world of the Prototype Lab: regions, bots, dimensions, hidden systems, and playable fragments connected inside one digital shell.',
    'The public site now presents the world more cleanly: a readable HoloVerse command map first, with stronger emphasis on what players can enter and discover.',
    'Current direction focuses on region identity, clearer player routes, stronger hub presentation, and mystery around the systems operating beneath the world.'
  ]},
  {group:'Vector Wars',title:'Urban Warzone Preview',meta:'2026-05-11',bullets:[
    'Vector Wars is the public action hook for the site: Sable’s Urban region as a machine-war combat layer inside HoloVerse.',
    'The browser view is framed as a command-map preview while the full combat systems remain part of the desktop HoloVerse build.',
    'Future passes can make the preview more interactive with capture posts, waves, drones, mechs, score pressure, and clearer Urban battlefield identity.'
  ]},
  {group:'HoloCore',title:'Hidden System',meta:'2026-05-11',bullets:[
    'HoloCore is being framed as the mind beneath HoloVerse, not as a normal game mode.',
    'Some worlds are built, some are recovered, and some only appear after HoloCore decides the player is ready.',
    'The site will keep HoloCore mysterious while letting HoloVerse and Vector Wars carry the visible player-facing presentation.'
  ]}
];
const publicCopy={roadmap:[
  'Build HoloVerse into a richer explorable hub with clearer regions, stronger characters, and more memorable discoveries.',
  'Use Vector Wars as the most direct playable hook: Urban combat, Sable, machines, capture pressure, and visible score-driven action.',
  'Keep HoloCore mysterious: the hidden mind beneath HoloVerse that observes, remembers, and unlocks deeper systems over time.',
  'Polish the strongest prototypes into experiences that players can understand quickly and remember afterward.'
]};
function installLayoutStyle(){if(document.getElementById(STYLE_ID))return;const s=document.createElement('style');s.id=STYLE_ID;s.textContent='body.holoverse-dashboard-layout .stats-grid.below-featured-demo{display:none!important}.single-holoverse-section.demo-featured-top{overflow:hidden!important}';document.head.appendChild(s)}
function promoteDemo(){const hero=document.querySelector('.hero'),demo=document.getElementById('demos'),stats=document.querySelector('.stats-grid');if(!hero||!demo)return;if(hero.nextElementSibling!==demo)hero.insertAdjacentElement('afterend',demo);demo.classList.add('demo-featured-top');document.body.classList.add('holoverse-demo-featured-top','holoverse-dashboard-layout','site-pass36-vector-holocore');if(stats)stats.classList.add('below-featured-demo')}
function setKey(k,v){document.querySelectorAll(`.editable[data-key="${k}"]`).forEach(e=>e.textContent=v)}
function setText(id,v){const e=document.getElementById(id);if(e)e.textContent=v}
function list(id,items){const h=document.getElementById(id);if(!h)return;h.innerHTML='';items.forEach(t=>{const li=document.createElement('li');li.textContent=t;h.appendChild(li)})}
function updates(){const h=document.getElementById('updatesList');if(!h||h.dataset.publicUpdatesVersion==='pass36')return;h.innerHTML='';publicUpdates.forEach(e=>{const a=document.createElement('article');a.className='update-card public-update-card';a.innerHTML=`<span class="update-group">${e.group}</span><h3 class="update-heading">${e.title}</h3><div class="update-meta">${e.meta}</div><ul class="update-bullets">${e.bullets.map(b=>`<li>${b}</li>`).join('')}</ul>`;h.appendChild(a)});h.dataset.publicUpdatesVersion='pass36'}
function copy(){
  const meta=document.querySelector('meta[name="description"]');
  if(meta)meta.content='A dark connected arcade where HoloVerse, Vector Wars, HoloCore, Gleebs, playable prototypes, bots, creator tools, and mod-friendly experiments keep evolving inside one digital lab.';
  document.querySelectorAll('.nav a[href="#demos"], .footer-links a[href="#demos"]').forEach(a=>a.textContent='Vector Wars');
  setKey('heroEyebrow','> HoloVerse + Vector Wars <');
  setKey('heroLead','Explore HoloVerse, a living digital world built from recovered systems, prototype games, hidden archives, and the strange mind beneath it all: HoloCore.');
  setKey('stat3Value','HoloVerse + Vector Wars');
  setKey('aboutTitle','A connected digital world with something watching underneath');
  setKey('aboutBody1','GLITCHED MATRIX Prototype Lab is a dark sci-fi hub where HoloVerse, Vector Wars, bots, standalone prototypes, and creation tools all live inside one evolving system.');
  setKey('aboutBody2','The current build focuses on turning separate experiments into connected places: a walkable HoloVerse, in-world region runtimes, site-replaceable media, and stronger playable previews.');
  setKey('fictionLabel','HoloCore');
  setKey('fictionTitle','The hidden mind beneath HoloVerse');
  setKey('fictionBody1','HoloCore is not simply another place to enter. It is the buried intelligence under HoloVerse: watching, remembering, and deciding when deeper systems should surface.');
  setKey('fictionBody2','Gleebs, IO, Sable, Archivist, and the other region bots guide players through fragments of the digital wreckage while HoloCore remains mostly unseen. Some regions are built. Some are recovered. Some only appear when HoloCore allows it.');
  setKey('roadmapLabel','Future');
  setKey('roadmapTitle','Where the lab is going');
  setKey('directionLabel','Now');
  setKey('directionTitle','What the current release is about');
  setKey('directionBody1','GLITCHED MATRIX Prototype Lab is a dark sci-fi collection of connected experiments: HoloVerse, Vector Wars, HoloCore, Gleebs, bots, playable prototypes, and creation tools inside one evolving lab.');
  setKey('directionBody2','The current public focus is clarity: stronger presentation, cleaner information, a clearer playable hook, and mystery around the hidden system beneath HoloVerse.');
  setKey('updatesLabel','Updates');
  setKey('updatesTitle','Public Update Notes');
  setKey('updatesNote','Player-facing progress, world direction, Vector Wars, HoloCore mystery, and major Prototype Lab updates.');
  setKey('metaTitle','Core identity');
  setKey('communityTitle','Players, tinkerers, and creators');
  setText('demoSectionTitle','Vector Wars — Urban Warzone Preview');
  setText('demoSectionIntro','A command-map preview of Sable’s Urban region: the machine-war layer inside HoloVerse where combat, drones, mechs, capture pressure, and score-driven action will take focus.');
  setText('demoSectionNote','Site pass 36: Vector Wars is now the public playable hook, HoloCore is treated as the hidden mind beneath HoloVerse, and public copy avoids deeper archive-system naming.');
  setText('demoObjective','Survey the HoloVerse command map, focus Urban, and preview the battlefield layer that will become Vector Wars.');
  setText('demoControls','Click a region. Drag to pan. Wheel zooms. F fits the world. H returns home.');
  setText('demoDetails','This browser preview is a lightweight command-map presentation. The full Urban Warzone runtime remains part of the desktop HoloVerse build.');
  list('roadmapList',publicCopy.roadmap);updates();
  const secondary=document.getElementById('secondaryCta');if(secondary){secondary.textContent='Vector Wars Preview';secondary.href='#demos'}
}
function loadScript(src){if(document.querySelector('script[data-holoverse-pass35-loader="true"]'))return;const s=document.createElement('script');s.src=src;s.async=false;s.dataset.holoversePass35Loader='true';document.head.appendChild(s)}
function mount(){installLayoutStyle();promoteDemo();copy();setTimeout(copy,120);setTimeout(copy,480);setTimeout(copy,1200);loadScript(LIVE_SCRIPT)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();