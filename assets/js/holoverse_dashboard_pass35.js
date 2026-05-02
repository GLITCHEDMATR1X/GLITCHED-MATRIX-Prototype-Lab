(() => {
  'use strict';

  const regions = [
    ['FLAT', 0.06, 0.13, '#dfe5ee', 'Event courts, pedestals, and safe hub space.'],
    ['FORESTS', 0.13, 0.28, '#1fc56e', 'Dense groves, harvest trees, and caretaker bots.'],
    ['GREEN HILLS', 0.28, 0.42, '#b9dc43', 'Animal fields, burrows, and ranch paths.'],
    ['MUSHROOM', 0.42, 0.55, '#d851c7', 'Wetland vegetation, glowing caps, roots, and spores.'],
    ['DESERT', 0.55, 0.67, '#d7963e', 'Pyramids, caravans, cacti, and slow cargo lanes.'],
    ['ICE', 0.67, 0.78, '#76d9ff', 'Crystal roads, fast relays, and hover routes.'],
    ['URBAN', 0.78, 0.89, '#9aa0aa', 'Block structures, cover lanes, and city growth.'],
    ['METROPOLIS', 0.89, 1.00, '#8661db', 'Towers, labs, robot sorting, and advanced systems.']
  ];

  const state = { panX: 0, panY: 0, zoom: 0.86, drag: null, selected: null };
  let canvas, ctx, shell;

  function q(id) { return document.getElementById(id); }
  function set(id, text) { const el = q(id); if (el) el.textContent = text; }
  function hexToRgb(hex) {
    const value = hex.replace('#', '');
    return [parseInt(value.slice(0, 2), 16), parseInt(value.slice(2, 4), 16), parseInt(value.slice(4, 6), 16)];
  }
  function alpha(hex, a) { const c = hexToRgb(hex); return `rgba(${c[0]},${c[1]},${c[2]},${a})`; }
  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
  function seeded(i, j) { return (Math.sin(i * 127.1 + j * 311.7 + 19.87) * 43758.5453) % 1; }
  function rand(i, j) { return Math.abs(seeded(i, j)); }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.35);
    const w = Math.max(900, Math.floor(rect.width * dpr));
    const h = Math.max(520, Math.floor(rect.height * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
  }

  function center() { return [canvas.width / 2 + state.panX, canvas.height / 2 + state.panY]; }
  function maxRadius() { return Math.min(canvas.width, canvas.height) * 0.46 * state.zoom; }

  function drawGrid() {
    ctx.fillStyle = '#020608';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(0, 245, 255, 0.055)';
    ctx.lineWidth = 1;
    const step = Math.max(34, Math.min(canvas.width, canvas.height) / 18);
    for (let x = (state.panX % step); x < canvas.width; x += step) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let y = (state.panY % step); y < canvas.height; y += step) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }
    const grd = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 40, canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) * 0.7);
    grd.addColorStop(0, 'rgba(0, 245, 255, 0.05)');
    grd.addColorStop(1, 'rgba(0, 0, 0, 0.55)');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function ringPath(cx, cy, inner, outer) {
    ctx.beginPath();
    ctx.arc(cx, cy, outer, 0, Math.PI * 2);
    ctx.arc(cx, cy, inner, Math.PI * 2, 0, true);
    ctx.closePath();
  }

  function drawWorld() {
    resize();
    drawGrid();
    const [cx, cy] = center();
    const rMax = maxRadius();

    regions.slice().reverse().forEach(([name, from, to, color]) => {
      ringPath(cx, cy, rMax * from, rMax * to);
      ctx.fillStyle = alpha(color, name === 'FLAT' ? 0.42 : 0.28);
      ctx.fill();
      ctx.strokeStyle = alpha(color, 0.55);
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255,255,255,.08)';
    for (let i = 0; i < 32; i++) {
      const a = i * Math.PI * 2 / 32;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a) * rMax * 0.06, cy + Math.sin(a) * rMax * 0.06);
      ctx.lineTo(cx + Math.cos(a) * rMax, cy + Math.sin(a) * rMax);
      ctx.stroke();
    }

    regions.forEach(([name, from, to, color], ri) => {
      const count = ri === 0 ? 22 : 42;
      for (let i = 0; i < count; i++) {
        const a = rand(ri + 4, i) * Math.PI * 2;
        const rr = rMax * (from + (to - from) * (0.18 + rand(i, ri + 8) * 0.68));
        const x = cx + Math.cos(a) * rr;
        const y = cy + Math.sin(a) * rr;
        const size = Math.max(2.4, rMax * 0.0048 * (0.8 + rand(i, ri) * 1.5));
        ctx.fillStyle = alpha(color, 0.82);
        ctx.strokeStyle = alpha(color, 0.45);
        if (ri % 3 === 0) {
          ctx.fillRect(x - size, y - size, size * 2, size * 2);
        } else {
          ctx.beginPath(); ctx.arc(x, y, size, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        }
      }
    });

    ctx.fillStyle = 'rgba(240, 252, 255, .92)';
    ctx.strokeStyle = 'rgba(0, 245, 255, .4)';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(cx, cy, rMax * 0.05, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    regions.forEach(([name, from, to, color], ri) => {
      const a = -Math.PI / 2 + (ri - 3.5) * 0.045;
      const rr = rMax * ((from + to) / 2);
      const x = cx + Math.cos(a) * rr;
      const y = cy + Math.sin(a) * rr;
      ctx.font = `700 ${Math.max(13, Math.min(24, rMax * 0.032))}px Inter, Arial, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const m = ctx.measureText(name);
      ctx.fillStyle = 'rgba(0, 6, 10, .72)';
      ctx.fillRect(x - m.width / 2 - 9, y - 15, m.width + 18, 30);
      ctx.strokeStyle = alpha(color, .42);
      ctx.strokeRect(x - m.width / 2 - 9, y - 15, m.width + 18, 30);
      ctx.fillStyle = alpha(color, .98);
      ctx.fillText(name, x, y);
    });
  }

  function selectedRegionAt(px, py) {
    const [cx, cy] = center();
    const d = Math.hypot(px - cx, py - cy) / maxRadius();
    return regions.find((r) => d >= r[1] && d <= r[2]) || null;
  }

  function updatePanels(region) {
    const left = document.querySelector('.demo-info-left');
    const right = document.querySelector('.demo-info-right');
    const active = region || regions[1];
    if (left) {
      left.innerHTML = `<span class="demo-status">Readable Survey</span><h3 class="holo-title">${active[0]}</h3><div class="holo-card"><span class="holo-k">Selected Region</span><p>${active[4]}</p></div><div class="holo-card"><span class="holo-k">View Mode</span><p>Calm full-world map. The demo starts fitted to the whole HoloVerse instead of zooming into one giant ring.</p></div><div class="demo-tags"><span>Full world</span><span>Low motion</span><span>Readable map</span><span>Click regions</span></div>`;
    }
    if (right) {
      right.innerHTML = `<h3 class="holo-title">World Guide</h3><div class="holo-card"><span class="holo-k">Controls</span><div class="holo-controls"><span><b>Click</b> select a region</span><span><b>Drag</b> pan map</span><span><b>Wheel</b> zoom in/out</span><span><b>F</b> fit world</span><span><b>H</b> home</span></div></div><div class="holo-card"><span class="holo-k">Regions</span>${regions.map(r => `<span class="holo-region-row"><i class="holo-dot" style="color:${r[3]}"></i><span><b>${r[0]}</b> — ${r[4]}</span></span>`).join('')}</div>`;
    }
  }

  function fit() { state.panX = 0; state.panY = 0; state.zoom = 0.86; drawWorld(); }

  function bind() {
    canvas.addEventListener('pointerdown', (e) => {
      canvas.focus({ preventScroll: true });
      state.drag = { x: e.clientX, y: e.clientY, moved: false };
      e.preventDefault();
    });
    window.addEventListener('pointermove', (e) => {
      if (!state.drag) return;
      const dx = e.clientX - state.drag.x;
      const dy = e.clientY - state.drag.y;
      if (Math.abs(dx) + Math.abs(dy) > 3) state.drag.moved = true;
      state.panX += dx * (window.devicePixelRatio || 1);
      state.panY += dy * (window.devicePixelRatio || 1);
      state.drag.x = e.clientX; state.drag.y = e.clientY;
      drawWorld();
    });
    window.addEventListener('pointerup', (e) => {
      if (!state.drag) return;
      const wasClick = !state.drag.moved;
      state.drag = null;
      if (wasClick) {
        const rect = canvas.getBoundingClientRect();
        const sx = (e.clientX - rect.left) * (canvas.width / rect.width);
        const sy = (e.clientY - rect.top) * (canvas.height / rect.height);
        const region = selectedRegionAt(sx, sy);
        if (region) updatePanels(region);
      }
    });
    canvas.addEventListener('wheel', (e) => {
      state.zoom = clamp(state.zoom * (e.deltaY < 0 ? 1.08 : 0.92), 0.58, 2.2);
      drawWorld();
      e.preventDefault();
    }, { passive: false });
    window.addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() === 'f' || e.key.toLowerCase() === 'h') { fit(); e.preventDefault(); }
    });
    window.addEventListener('resize', () => drawWorld());
  }

  function boot() {
    canvas = q('demoCanvas');
    shell = document.querySelector('.demo-canvas-shell');
    if (!canvas || !shell) return;
    ctx = canvas.getContext('2d');
    canvas.tabIndex = 0;
    document.body.classList.add('demo-runtime-ready', 'single-demo-runtime', 'holoverse-dashboard-pass35');
    const overlay = q('demoLoadingOverlay');
    if (overlay) overlay.hidden = true;
    set('demoSectionTitle', 'HoloVerse Demo — Full World Dashboard');
    set('demoSectionIntro', 'A calm full-width HoloVerse map: the whole world is visible first, with readable side panels and no forced zoom into one giant ring.');
    set('demoSectionNote', 'Pass 35: full-world dashboard view, reduced motion, clearer panels, and lighter first-load behavior.');
    updatePanels(regions[1]);
    bind();
    drawWorld();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();