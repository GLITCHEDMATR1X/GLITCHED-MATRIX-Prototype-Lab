(()=>{
  const img=document.querySelector('.lab-showcase-image');
  if(!img)return;
  const base='assets/images/gallery/collage_hq/';
  const parts=['part01.txt','part02.txt','part03.txt','part04.txt','part05.txt','part06.txt'];
  Promise.all(parts.map(name=>fetch(base+name+'?v=20260916-hq').then(r=>{if(!r.ok)throw new Error(name);return r.text();})))
    .then(chunks=>{
      const b64=chunks.join('').replace(/\s+/g,'');
      const raw=atob(b64);
      const bytes=new Uint8Array(raw.length);
      for(let i=0;i<raw.length;i++)bytes[i]=raw.charCodeAt(i);
      const url=URL.createObjectURL(new Blob([bytes],{type:'image/avif'}));
      const old=img.dataset.objectUrl;
      img.dataset.objectUrl=url;
      img.src=url;
      img.removeAttribute('srcset');
      img.style.imageRendering='auto';
      img.style.filter='none';
      img.addEventListener('load',()=>{if(old)URL.revokeObjectURL(old);},{once:true});
    })
    .catch(err=>console.error('HQ collage load failed',err));
})();
