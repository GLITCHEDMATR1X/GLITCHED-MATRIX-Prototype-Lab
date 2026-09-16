(()=>{
  const trigger=document.getElementById('soundtrackButton');
  if(!trigger)return;

  const PLAYLIST_ID='PLRj8r8sVGuOE';
  const API_SRC='https://www.youtube.com/iframe_api';
  let player=null;
  let apiPromise=null;
  let pendingRandomStart=false;

  const style=document.createElement('style');
  style.textContent=`
    .gm-soundtrack-panel[hidden]{display:none}
    .gm-soundtrack-panel{position:fixed;right:18px;bottom:18px;z-index:1200;width:min(440px,calc(100vw - 36px));padding:12px;border:1px solid #351b1f;border-radius:14px;background:rgba(5,6,8,.98);box-shadow:0 18px 60px rgba(0,0,0,.6)}
    .gm-soundtrack-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px}
    .gm-soundtrack-head strong{font-size:.96rem;letter-spacing:.04em}
    .gm-soundtrack-close{min-height:34px;padding:6px 10px;border:1px solid #2a2b31;border-radius:8px;background:#0b0c0f;color:#fff;font:inherit;font-size:.86rem;font-weight:800;cursor:pointer}
    .gm-soundtrack-close:hover{filter:brightness(1.13)}
    .gm-soundtrack-frame{overflow:hidden;aspect-ratio:16/9;border:1px solid #24252b;border-radius:10px;background:#020203}
    .gm-soundtrack-frame iframe{display:block;width:100%;height:100%;border:0}
    .gm-soundtrack-status{margin-top:9px;color:#aaa3a6;font-size:.82rem;line-height:1.35}
    .gm-soundtrack-footer{display:inline-flex;align-items:center;justify-content:center;min-height:42px;padding:9px 14px;border:1px solid var(--line,#351b1f);border-radius:10px;background:rgba(12,7,7,.94);color:var(--text,#fff);font:inherit;font-weight:700;cursor:pointer}
    .gm-soundtrack-footer:hover{filter:brightness(1.13)}
    @media(max-width:560px){.gm-soundtrack-panel{right:10px;bottom:10px;width:calc(100vw - 20px)}}
  `;
  document.head.appendChild(style);

  const panel=document.createElement('aside');
  panel.id='soundtrackPanel';
  panel.className='gm-soundtrack-panel';
  panel.hidden=true;
  panel.setAttribute('aria-label','Soundtrack player');
  panel.innerHTML=`
    <div class="gm-soundtrack-head">
      <strong>Soundtrack</strong>
      <button class="gm-soundtrack-close" type="button" aria-label="Close soundtrack player">Close</button>
    </div>
    <div class="gm-soundtrack-frame"><div id="soundtrackYouTubePlayer"></div></div>
    <div class="gm-soundtrack-status" id="soundtrackStatus" aria-live="polite">YouTube playlist · shuffle + loop</div>
  `;
  document.body.appendChild(panel);

  const closeButton=panel.querySelector('.gm-soundtrack-close');
  const status=panel.querySelector('#soundtrackStatus');
  function setStatus(text){status.textContent=text}

  function loadApi(){
    if(window.YT&&window.YT.Player)return Promise.resolve();
    if(apiPromise)return apiPromise;
    apiPromise=new Promise((resolve,reject)=>{
      const previousReady=window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady=()=>{
        if(typeof previousReady==='function')previousReady();
        resolve();
      };
      if([...document.scripts].some(script=>script.src===API_SRC))return;
      const script=document.createElement('script');
      script.src=API_SRC;
      script.async=true;
      script.onerror=()=>reject(new Error('YouTube API failed to load'));
      document.head.appendChild(script);
    });
    return apiPromise;
  }

  function chooseRandomVideo(){
    if(!player||typeof player.getPlaylist!=='function')return false;
    player.setLoop(true);
    player.setShuffle(true);
    const playlist=player.getPlaylist()||[];
    if(!playlist.length)return false;
    let current='';
    try{current=player.getVideoData().video_id||''}catch{}
    const candidates=playlist.map((id,index)=>({id,index})).filter(item=>playlist.length<2||item.id!==current);
    const pool=candidates.length?candidates:playlist.map((id,index)=>({id,index}));
    const pick=pool[Math.floor(Math.random()*pool.length)];
    player.playVideoAt(pick.index);
    return true;
  }

  function cuePlaylist(){
    pendingRandomStart=true;
    player.cuePlaylist({listType:'playlist',list:PLAYLIST_ID,index:0,startSeconds:0});
  }

  function ensurePlayer(){
    return loadApi().then(()=>{
      if(player)return player;
      player=new YT.Player('soundtrackYouTubePlayer',{
        width:'100%',
        height:'100%',
        playerVars:{controls:1,playsinline:1,rel:0},
        events:{
          onReady:()=>cuePlaylist(),
          onStateChange:event=>{
            if(event.data===YT.PlayerState.CUED&&pendingRandomStart){
              pendingRandomStart=false;
              if(!chooseRandomVideo())setStatus('Playlist loaded, but no playable videos were returned.');
            }else if(event.data===YT.PlayerState.PLAYING){
              let title='';
              try{title=player.getVideoData().title||''}catch{}
              setStatus(title?`Now playing · ${title} · shuffle loop active`:'Shuffle loop active');
            }
          },
          onAutoplayBlocked:()=>setStatus('Your browser blocked automatic playback. Press Play in the YouTube player.'),
          onError:()=>setStatus('YouTube could not play this playlist item. Click Soundtrack again to reshuffle.')
        }
      });
      return player;
    });
  }

  function playRandom(){
    panel.hidden=false;
    trigger.setAttribute('aria-expanded','true');
    setStatus('Loading playlist…');
    ensurePlayer().then(()=>{
      if(player&&typeof player.getPlaylist==='function'&&(player.getPlaylist()||[]).length){
        if(!chooseRandomVideo())cuePlaylist();
      }
    }).catch(()=>setStatus('YouTube soundtrack is unavailable right now.'));
  }

  trigger.addEventListener('click',playRandom);

  const footerLinks=document.querySelector('.footer-links');
  let footerButton=document.getElementById('soundtrackButtonBottom');
  if(footerLinks&&!footerButton){
    footerButton=document.createElement('button');
    footerButton.id='soundtrackButtonBottom';
    footerButton.className='gm-soundtrack-footer';
    footerButton.type='button';
    footerButton.textContent='Soundtrack';
    footerButton.setAttribute('aria-controls','soundtrackPanel');
    footerLinks.appendChild(footerButton);
  }
  if(footerButton)footerButton.addEventListener('click',playRandom);

  closeButton.addEventListener('click',()=>{
    panel.hidden=true;
    trigger.setAttribute('aria-expanded','false');
    if(player&&typeof player.pauseVideo==='function')player.pauseVideo();
    (footerButton||trigger).focus();
  });
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&!panel.hidden)closeButton.click();
  });
})();

(()=>{
  const img=document.querySelector('.lab-showcase-image');
  if(!img)return;
  const base='assets/images/gallery/collage_hq/';
  const parts=['part01.txt','part02.txt','part03.txt','part04.txt','part05.txt','part06.txt'];
  Promise.all(parts.map(name=>fetch(base+name+'?v=20260916-hq2').then(r=>{if(!r.ok)throw new Error(name);return r.text();})))
    .then(chunks=>{
      const b64=chunks.join('').replace(/\s+/g,'');
      const raw=atob(b64);
      const bytes=new Uint8Array(raw.length);
      for(let i=0;i<raw.length;i++)bytes[i]=raw.charCodeAt(i);
      const url=URL.createObjectURL(new Blob([bytes],{type:'image/avif'}));
      img.src=url;
      img.removeAttribute('srcset');
      img.style.imageRendering='auto';
      img.style.filter='none';
    })
    .catch(err=>console.error('HQ collage load failed',err));
})();
