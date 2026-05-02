(()=>{
  'use strict';

  const STYLE_ID = 'holoverse-goal-alignment-pass32-style';
  const PANEL_ID = 'holoverseGoalAlignmentPanel';
  const VERSION = 'pass32-goal-alignment';

  const copy = {
    demoSectionTitle: 'HoloVerse Demo — Visible Living World',
    demoSectionIntro: 'Survey a readable HoloVerse world-view prototype with distinct regions, active bots, visible structures, roads, resources, and Dyson construction panels.',
    demoTitle: 'Visible Living HoloVerse',
    demoSummary: 'Inspect the world as a connected HoloVerse/MatrixCore prototype: regions, bots, structures, roads, resources, and construction activity stay readable without cockpit or FPS framing.',
    demoObjective: 'Keep the world readable: inspect regions, bots, objects, routes, and activity while the HoloVerse grows toward a stronger public demo.',
    demoDetails: 'Current guardrail: visible-world presentation first, bot/object clarity second, deeper gameplay only after the regions are easy to understand.',
    demoSectionNote: 'Visible-world pass: readable regions, inspectable bots and objects, clean side panels, public-facing update notes, and no stale cockpit/FPS framing.'
  };

  const goals = [
    ['Readable regions', 'Every ring should have visible objects, not labels only.'],
    ['Living world', 'Bots, cargo, build activity, and Dyson panels should feel active.'],
    ['Player clarity', 'Side panels should explain what the user is seeing and doing.'],
    ['No stale framing', 'No cockpit, FPS, pointer-lock, mech-guard, or suit-assist copy.']
  ];

  function installStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .holo-goal-panel {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 8px;
        margin-top: 10px;
        padding: 10px;
        border: 1px solid rgba(0, 245, 255, 0.16);
        border-radius: 14px;
        background: rgba(0, 10, 14, 0.42);
        box-shadow: inset 0 0 24px rgba(0, 245, 255, 0.05);
      }
      .holo-goal-chip {
        min-width: 0;
        padding: 9px 10px;
        border: 1px solid rgba(0, 245, 255, 0.14);
        border-radius: 12px;
        background: linear-gradient(180deg, rgba(0, 245, 255, 0.07), rgba(0, 0, 0, 0.18));
      }
      .holo-goal-chip strong {
        display: block;
        color: #e8fcff;
        font: 700 11px/1.25 Consolas, monospace;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      .holo-goal-chip span {
        display: block;
        margin-top: 5px;
        color: var(--muted, rgba(221, 238, 242, 0.76));
        font-size: 0.76rem;
        line-height: 1.32;
      }
      .holo-goal-panel[data-version]::before {
        content: attr(data-version);
        grid-column: 1 / -1;
        color: rgba(0, 245, 255, 0.72);
        font: 700 10px/1 Consolas, monospace;
        letter-spacing: 0.16em;
        text-transform: uppercase;
      }
      @media (max-width: 1180px) {
        .holo-goal-panel { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      }
      @media (max-width: 620px) {
        .holo-goal-panel { grid-template-columns: 1fr; }
      }
    `;
    document.head.appendChild(style);
  }

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el && el.textContent !== text) el.textContent = text;
  }

  function applyCleanCopy() {
    Object.entries(copy).forEach(([id, value]) => setText(id, value));
  }

  function ensureTags() {
    const host = document.getElementById('demoTags');
    if (!host || host.dataset.goalAligned === 'true') return;
    host.dataset.goalAligned = 'true';
    host.innerHTML = '';
    ['World-view', 'Regions', 'Bots', 'MatrixCore', 'Dyson build'].forEach((label) => {
      const span = document.createElement('span');
      span.textContent = label;
      host.appendChild(span);
    });
  }

  function ensureGoalPanel() {
    const shell = document.querySelector('#demos .demo-canvas-shell');
    if (!shell) return;
    let panel = document.getElementById(PANEL_ID);
    if (!panel) {
      panel = document.createElement('div');
      panel.id = PANEL_ID;
      panel.className = 'holo-goal-panel';
      panel.setAttribute('aria-label', 'HoloVerse demo goal alignment');
      shell.insertAdjacentElement('afterend', panel);
    }
    panel.dataset.version = VERSION;
    if (panel.dataset.rendered === VERSION) return;
    panel.innerHTML = goals.map(([title, body]) => `<div class="holo-goal-chip"><strong>${title}</strong><span>${body}</span></div>`).join('');
    panel.dataset.rendered = VERSION;
  }

  function removeRoughRuntimeCopy() {
    const note = document.getElementById('demoSectionNote');
    if (note && /pretending labels are enough/i.test(note.textContent || '')) {
      note.textContent = copy.demoSectionNote;
    }
  }

  function run() {
    installStyle();
    applyCleanCopy();
    ensureTags();
    ensureGoalPanel();
    removeRoughRuntimeCopy();
    document.body.classList.add('holoverse-goal-aligned-pass32');
  }

  function schedule() {
    run();
    setTimeout(run, 250);
    setTimeout(run, 900);
    setTimeout(run, 1800);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', schedule, { once: true });
  } else {
    schedule();
  }

  const observer = new MutationObserver(() => run());
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
