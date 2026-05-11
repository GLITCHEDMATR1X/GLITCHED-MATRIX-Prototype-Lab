(() => {
  'use strict';
  let canvas, ctx, frame = 0;
  const posts = [
    { label: 'A', x: 0.22, y: 0.36, color: '#61f0ff', text: 'SABLE' },
    { label: 'B', x: 0.50, y: 0.48, color: '#ffd76a', text: 'CONTEST' },
    { label: 'C', x: 0.76, y: 0.38, color: '#ff355f', text: 'MACHINE' }
  ];
  const blocks = [
    [0.12,0.18,0.22,0.08,'North Cover'], [0.48,0.18,0.30,0.10,'Factory Cut'],
    [0.10,0.62,0.28,0.11,'Drone Yard'], [0.58,0.64,0.28,0.12,'Mech Gate'],
    [0.38,0.34,0.10,0.20,'Core Lane'], [0.43,0.70,0.12,0.07,'Relay']
  ];
  const actors = [
    ['Sable',0.27,0.52,'#61f0ff',13,0.7], ['Ally Bot',0.34,0.57,'#8ef7ff',9,0.8], ['Scout',0.41,0.42,'#80ffd0',8,1.0],
    ['Drone',0.66,0.32,'#ff355f',8,1.2], ['Mech',0.74,0.59,'#ff355f',17,0.45], ['Unit',0.84,0.50,'#ff5575',10,0.95], ['Crawler',0.62,0.70,'#ff7a55',11,0.75]
  ];
  const beams = [[0.29,0.52,0.50,0.48,'#61f0ff'],[0.40,0.42,0.66,0.32,'#80ffd0'],[0.76,0.38,0.34,0.57,'#ff355f'],[0.74,0.59,0.50,0.48,'#ff355f']];
  function $(id){return document.getElementById(id)}
  function set(id, text){const el=$(id); if(el) el.textContent=text}
  function installStyle(){
    if(document.getElementById('vector-wars-direct-style'))return;
    const s=document.createElement('style');
    s.id='vector-wars-direct-style';
    s.textContent='.demo-canvas-shell{min-height:clamp(540px,49vw,780px)!important}.vector-wars-preview-canvas{background:#02090d!important}.holo-title{margin:10px 0 12px}.holo-card{margin-top:14px}.holo-k{display:block;color:#61f0ff;font-size:.74rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;margin-bottom:6px}.holo-list{display:grid;gap:9px;margin-top:8px}.holo-list span{display:flex;gap:8px;line-height:1.45}.holo-list b{min-width:88px;color:#fff}.demo-tags span{white-space:nowrap}';
    document.head.appendChild(s);
  }
  function cleanOld(){
    const overlay=$('demoLoadingOverlay'); if(overlay) overlay.remove();
    document.querySelectorAll('.block-busters-shell,.block-busters-canvas,.demo-noscript-note').forEach(el=>{el.classList.remove('block-busters-shell','block-busters-canvas'); if(el.classList.contains('demo-noscript-note'))el.remove();});
  }
  function resize(){
    const r=canvas.getBoundingClientRect(), d=Math.min(window.devicePixelRatio||1,1.5);
    const w=Math.max(900,Math.floor(r.width*d)), h=Math.max(560,Math.floor(r.height*d));
    if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;}
  }
  function rect(x,y,w,h,stroke,fill,lw=2){ctx.fillStyle=fill;ctx.strokeStyle=stroke;ctx.lineWidth=lw;ctx.fillRect(x,y,w,h);ctx.strokeRect(x,y,w,h)}
  function field(){const w=canvas.width,h=canvas.height,m=Math.min(w,h)*0.055;return{x:m,y:m,w:w-m*2,h:h-m*2}}
  function point(f,x,y){return [f.x+f.w*x,f.y+f.h*y]}
  function drawBeams(f){
    beams.forEach((b,i)=>{const a=point(f,b[0],b[1]),c=point(f,b[2],b[3]),life=(Math.sin(frame*.08+i)+1)/2;ctx.strokeStyle=b[4].replace(')',`,${.18+life*.35})`).replace('#61f0ff','rgba(97,240,255').replace('#80ffd0','rgba(128,255,208').replace('#ff355f','rgba(255,53,95');ctx.lineWidth=2+life*2;ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(c[0],c[1]);ctx.stroke();ctx.fillStyle=ctx.strokeStyle;const t=(frame*.018+i*.25)%1;ctx.beginPath();ctx.arc(a[0]+(c[0]-a[0])*t,a[1]+(c[1]-a[1])*t,3+life*3,0,Math.PI*2);ctx.fill();});
  }
  function drawWaveBars(f){
    const x=f.x+18,y=f.y+f.h-72,w=Math.min(460,f.w*.42),h=44;
    rect(x,y,w,h,'rgba(255,53,95,.35)','rgba(0,0,0,.50)',2);
    const wave=(Math.sin(frame*.018)+1)/2;
    ctx.fillStyle='rgba(255,53,95,.72)';ctx.fillRect(x+14,y+24,(w-28)*wave,8);
    ctx.strokeStyle='rgba(255,255,255,.16)';ctx.strokeRect(x+14,y+24,w-28,8);
    ctx.fillStyle='#fff';ctx.font=`800 ${Math.max(11,f.h*.022)}px Inter,Arial`;ctx.textAlign='left';ctx.fillText('MACHINE WAVE PRESSURE',x+14,y+18);
  }
  function draw(){
    resize(); frame++;
    const w=canvas.width,h=canvas.height,f=field();
    ctx.fillStyle='#02070b'; ctx.fillRect(0,0,w,h);
    const grad=ctx.createLinearGradient(0,0,0,h); grad.addColorStop(0,'rgba(0,245,255,.06)'); grad.addColorStop(1,'rgba(255,45,80,.08)'); ctx.fillStyle=grad; ctx.fillRect(0,0,w,h);
    ctx.strokeStyle='rgba(0,245,255,.08)'; ctx.lineWidth=1;
    const step=Math.max(34,Math.min(w,h)/18);
    for(let x=(frame*.15)%step;x<w;x+=step){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke()}
    for(let y=(frame*.08)%step;y<h;y+=step){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke()}
    rect(f.x,f.y,f.w,f.h,'rgba(0,245,255,.50)','rgba(0,18,24,.45)',3);
    ctx.strokeStyle='rgba(255,255,255,.08)'; ctx.lineWidth=2;
    for(let i=1;i<6;i++){const x=f.x+f.w*i/6;ctx.beginPath();ctx.moveTo(x,f.y);ctx.lineTo(x,f.y+f.h);ctx.stroke()}
    for(let i=1;i<4;i++){const y=f.y+f.h*i/4;ctx.beginPath();ctx.moveTo(f.x,y);ctx.lineTo(f.x+f.w,y);ctx.stroke()}
    blocks.forEach(b=>{const x=f.x+f.w*b[0],y=f.y+f.h*b[1],ww=f.w*b[2],hh=f.h*b[3];rect(x,y,ww,hh,'rgba(150,180,190,.45)','rgba(120,135,145,.24)',2);ctx.fillStyle='rgba(225,245,250,.86)';ctx.font=`700 ${Math.max(10,h*.018)}px Inter,Arial`;ctx.fillText(b[4].toUpperCase(),x+10,y+hh/2+4)});
    drawBeams(f);
    posts.forEach(p=>{const x=f.x+f.w*p.x,y=f.y+f.h*p.y,pulse=1+Math.sin(frame*.06+p.x*5)*.10;ctx.fillStyle='rgba(0,0,0,.68)';ctx.strokeStyle=p.color;ctx.lineWidth=3;ctx.beginPath();ctx.rect(x-30*pulse,y-30*pulse,60*pulse,60*pulse);ctx.fill();ctx.stroke();ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle=p.color;ctx.font=`900 ${Math.max(18,h*.036)}px Inter,Arial`;ctx.fillText(p.label,x,y-5);ctx.font=`700 ${Math.max(8,h*.014)}px Inter,Arial`;ctx.fillText(p.text,x,y+23)});
    actors.forEach((a,i)=>{const drift=Math.sin(frame*.018*a[5]+i)*.018,x=f.x+f.w*(a[1]+drift),y=f.y+f.h*(a[2]+Math.cos(frame*.016*a[5]+i)*.014),r=a[4]*(w/1280+.55);ctx.strokeStyle=a[3];ctx.fillStyle=a[3]==='#61f0ff'||a[3]==='#8ef7ff'||a[3]==='#80ffd0'?'rgba(0,245,255,.24)':'rgba(255,40,80,.24)';ctx.lineWidth=3;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.beginPath();ctx.moveTo(x-16,y);ctx.lineTo(x+16,y);ctx.moveTo(x,y-16);ctx.lineTo(x,y+16);ctx.stroke();ctx.fillStyle=a[3];ctx.font=`800 ${Math.max(10,h*.018)}px Inter,Arial`;ctx.textAlign='center';ctx.fillText(a[0].toUpperCase(),x,y-r-14)});
    rect(f.x+18,f.y+18,Math.min(480,f.w*.44),106,'rgba(97,240,255,.40)','rgba(0,0,0,.60)',2);
    ctx.textAlign='left';ctx.fillStyle='#fff';ctx.font=`900 ${Math.max(18,h*.034)}px Inter,Arial`;ctx.fillText('VECTOR WARS // URBAN',f.x+34,f.y+52);
    ctx.fillStyle='rgba(210,235,242,.92)';ctx.font=`700 ${Math.max(11,h*.018)}px Inter,Arial`;ctx.fillText('SABLE COMMAND: POSTS  A / B / C',f.x+34,f.y+80);ctx.fillText('WAVE 03  •  DRONES ACTIVE  •  MECH GATE CHARGING',f.x+34,f.y+104);
    drawWaveBars(f);
    requestAnimationFrame(draw);
  }
  function panels(){
    const left=document.querySelector('.demo-info-left'),right=document.querySelector('.demo-info-right');
    if(left)left.innerHTML='<span class="demo-status">Playable Preview</span><h3 class="holo-title">Vector Wars</h3><div class="holo-card"><span class="holo-k">Urban Arena</span><p>Sable’s Vector Wars layer: capture posts, cover lanes, drones, mechs, machines, and score pressure inside HoloVerse.</p></div><div class="holo-card"><span class="holo-k">HoloCore Signal</span><p>HoloCore stays hidden beneath the system. It should feel like something watching, not another visible arcade mode.</p></div><div class="demo-tags"><span>Vector Wars</span><span>Sable</span><span>Urban</span><span>Capture Posts</span></div>';
    if(right)right.innerHTML='<h3 class="holo-title">Battle Guide</h3><div class="holo-card"><span class="holo-k">Preview Readout</span><div class="holo-list"><span><b>Goal</b>Hold posts A, B, and C.</span><span><b>Pressure</b>Wave meter, beams, drones, and mechs.</span><span><b>Allies</b>Sable, scout, and support bots hold lanes with you.</span><span><b>Next pass</b>Make this preview playable.</span></div></div><div class="holo-card"><span class="holo-k">Status</span><p>The Vector Wars slot now uses a direct Urban arena preview instead of a world map.</p></div>';
  }
  function boot(){
    canvas=$('demoCanvas'); if(!canvas)return; ctx=canvas.getContext('2d'); installStyle(); cleanOld();
    canvas.classList.remove('block-busters-canvas'); canvas.classList.add('vector-wars-preview-canvas');
    document.body.classList.add('vector-wars-direct-pass39');
    set('demoSectionTitle','Vector Wars — Urban Arena Preview');
    set('demoSectionIntro','A direct Urban Vector Wars preview: posts, cover lanes, Sable, drones, mechs, machine pressure, and arena fire inside HoloVerse.');
    set('demoSectionNote','Site pass 39: enhanced the Vector Wars arena preview with wave pressure, fire lines, and stronger Urban battlefield identity.');
    set('demoObjective','Preview Sable’s Urban Vector Wars arena.');
    set('demoControls','Preview only for now. Future pass: move, fire, capture posts, survive waves.');
    set('demoDetails','This browser preview now represents Vector Wars directly instead of showing the HoloVerse ring map.');
    panels(); draw(); setTimeout(cleanOld,250);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();