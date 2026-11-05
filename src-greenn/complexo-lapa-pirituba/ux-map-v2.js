/* Complexo UX V2 — mapa e SVG recebem a mesma transformação. Sem editar coordenadas. */
(() => {
  'use strict';
  const viewer = document.getElementById('viewer') || document.querySelector('.map');
  if (!viewer) return;
  let layer = document.getElementById('layer');
  const marginal = !layer;
  if (marginal) {
    layer = document.createElement('div');
    layer.className = 'ux-zoom-layer';
    const map = viewer;
    while (map.firstChild) layer.appendChild(map.firstChild);
    map.appendChild(layer);
  }
  viewer.classList.add('ux-map-viewport');
  layer.classList.add('ux-map-transform');
  const style = document.createElement('style');
  style.textContent = '.ux-map-viewport{touch-action:pan-y;overscroll-behavior:contain;position:relative;overflow:hidden}.ux-map-transform{transform-origin:0 0;will-change:transform}.ux-map-transform.ux-zoom-layer{position:absolute;inset:0}.ux-map-transform.ux-zoom-layer>img,.ux-map-transform.ux-zoom-layer>svg{position:absolute;inset:0;width:100%;height:100%}.ux-map-viewport .ux-zoom-tools{position:absolute;right:8px;top:8px;z-index:16;display:flex;gap:5px}.ux-map-viewport .ux-zoom-tools button{min-width:37px;height:39px;padding:0 7px;border:1px solid #aebdcc;border-radius:7px;background:#fff;color:#122334;font:bold 19px system-ui;touch-action:manipulation}.ux-map-viewport .zoombuttons{display:none!important}';
  document.head.appendChild(style);
  const buttons=document.createElement('div');buttons.className='ux-zoom-tools';
  buttons.innerHTML='<button type="button" data-uxzoom="in" aria-label="Aumentar zoom">+</button><button type="button" data-uxzoom="out" aria-label="Diminuir zoom">−</button><button type="button" data-uxzoom="reset" aria-label="Centralizar mapa">⌂</button>';
  viewer.append(buttons);
  let scale=1,x=0,y=0,previous=null;
  const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
  const bounds=()=>({w:viewer.clientWidth,h:viewer.clientHeight});
  function draw(){
    viewer.style.touchAction=scale>1?'none':'pan-y';
    const {w,h}=bounds();
    x=clamp(x,w*(1-scale),0);y=clamp(y,h*(1-scale),0);
    layer.style.transform='translate('+x+'px,'+y+'px) scale('+scale+')';
  }
  function setZoom(next,px,py){
    next=clamp(next,1,4);const factor=next/scale;
    x=px-(px-x)*factor;y=py-(py-y)*factor;scale=next;draw();
  }
  const point=(t)=>{const r=viewer.getBoundingClientRect();return {x:t.clientX-r.left,y:t.clientY-r.top}};
  function snapshot(touches){
    if(!touches.length)return null;
    const a=point(touches[0]);
    if(touches.length===1)return {cx:a.x,cy:a.y,d:0,n:1};
    const b=point(touches[1]);
    return {cx:(a.x+b.x)/2,cy:(a.y+b.y)/2,d:Math.hypot(a.x-b.x,a.y-b.y),n:2};
  }
  viewer.addEventListener('touchstart',e=>{
    if(e.target.closest('button,input,label,.stop-layer'))return;
    previous=snapshot(e.touches);
    if(e.touches.length>1)e.preventDefault();
  },{passive:false});
  viewer.addEventListener('touchmove',e=>{
    if(!previous||e.target.closest('button,input,label,.stop-layer'))return;
    const now=snapshot(e.touches);if(!now)return;
    if(now.n===2&&previous.n===2&&previous.d){
      const next=clamp(scale*now.d/previous.d,1,4);
      const ratio=next/scale;
      x=now.cx-(previous.cx-x)*ratio;
      y=now.cy-(previous.cy-y)*ratio;
      scale=next;draw();e.preventDefault();
    } else if(now.n===1&&previous.n===1&&scale>1){
      x+=now.cx-previous.cx;y+=now.cy-previous.cy;draw();e.preventDefault();
    }
    previous=now;
  },{passive:false});
  viewer.addEventListener('touchend',e=>{previous=snapshot(e.touches)}, {passive:true});
  viewer.addEventListener('touchcancel',()=>{previous=null},{passive:true});
  let dragging=null;
  viewer.addEventListener('pointerdown',e=>{
    if(e.pointerType==='touch'||e.target.closest('button,input,label,.stop-layer')||scale===1)return;
    dragging={x:e.clientX,y:e.clientY,id:e.pointerId};
    viewer.setPointerCapture(e.pointerId);
  });
  viewer.addEventListener('pointermove',e=>{
    if(!dragging||e.pointerId!==dragging.id)return;
    x+=e.clientX-dragging.x;y+=e.clientY-dragging.y;
    dragging.x=e.clientX;dragging.y=e.clientY;draw();
  });
  viewer.addEventListener('pointerup',()=>dragging=null);
  viewer.addEventListener('pointercancel',()=>dragging=null);
  viewer.addEventListener('wheel',e=>{
    if(!e.ctrlKey)return;
    e.preventDefault();const p=point(e);setZoom(scale*(e.deltaY<0?1.12:1/1.12),p.x,p.y);
  },{passive:false});
  buttons.addEventListener('click',e=>{
    const b=e.target.closest('[data-uxzoom]');if(!b)return;
    const op=b.dataset.uxzoom;
    if(op==='reset'){scale=1;x=0;y=0;draw();}
    else setZoom(scale*(op==='in'?1.4:1/1.4),viewer.clientWidth/2,viewer.clientHeight/2);
  });
  window.addEventListener('resize',draw,{passive:true});
  function showRoute(color,enabled){
    const input=document.getElementById(color==='blue'?'showBlue':'showOrange');
    if(input){if(input.checked!==enabled){input.checked=enabled;input.dispatchEvent(new Event('change',{bubbles:true}));}return;}
    // A UI do iframe foi simplificada: os controles externos agora devem agir diretamente nos grupos SVG.
    const duploGroup=document.getElementById(color==='blue'?'blueRoute':'orangeRoute');
    if(duploGroup){duploGroup.style.display=enabled?'':'none';return;}
    if(marginal){
      const id=color==='blue'?'lapa':'pirituba';
      const el=document.getElementById(id);
      if(el)el.style.display=enabled?'':'none';
    }
  }
  window.addEventListener('message',e=>{
    if(e.origin!==location.origin||e.source!==parent)return;
    const d=e.data;if(!d||d.namespace!=='mnt-complexo-ux-v2')return;
    if(d.type==='route'&&['blue','orange'].includes(d.color)&&typeof d.enabled==='boolean')showRoute(d.color,d.enabled);
    if(d.type==='reset-zoom'){scale=1;x=0;y=0;draw();}
  });
  if(window!==parent)parent.postMessage({namespace:'mnt-complexo-ux-v2',type:'ready'},location.origin);
  draw();
})();