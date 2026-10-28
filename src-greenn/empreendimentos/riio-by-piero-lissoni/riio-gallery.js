/* Progressive, independent RIIO viewers. No carousel library or autoplay. */
(()=>{
  'use strict';
  const dialog=document.querySelector('#riio-image-dialog');
  const dialogImage=dialog?.querySelector('[data-dialog-image]');
  let activeViewer=null,opener=null,zoom=1;
  const resetZoom=()=>{zoom=1;if(dialogImage)dialogImage.style.width='100%';};
  const updateDialog=item=>{
    if(!dialogImage||!dialog?.open)return;
    dialogImage.src=item.src;dialogImage.alt=item.alt;
    dialogImage.width=item.width;dialogImage.height=item.height;
    dialog.querySelector('#riio-dialog-title').textContent=item.title;
    dialog.querySelector('[data-dialog-caption]').textContent=item.description;
    resetZoom();
    const scroll=dialog.querySelector('.riio-lightbox-scroll');scroll.scrollTop=0;scroll.scrollLeft=0;
  };
  document.querySelectorAll('[data-riio-gallery]').forEach(root=>{
    const data=root.querySelector('[data-gallery-data]');
    let items;try{items=JSON.parse(data?.textContent||'[]');}catch{return;}
    if(!items.length)return;
    const image=root.querySelector('[data-main-image]');
    const links=[...root.querySelectorAll('[data-select]')];
    const filters=[...root.querySelectorAll('[data-filter]')];
    const stage=root.querySelector('.riio-stage');
    const openers=[...root.querySelectorAll('[data-open-image]')];
    let selected=0,visible=items.map((_,i)=>i),touch=null,suppressOpenUntil=0;
    const show=(index,focus=false)=>{
      if(!visible.includes(index))return;
      selected=index;const item=items[index];
      image.src=item.src;image.alt=item.alt;image.width=item.width;image.height=item.height;
      root.querySelector('[data-caption-title]').textContent=item.title;
      root.querySelector('[data-caption-detail]').textContent=item.description;
      root.querySelector('[data-category]').textContent=item.category;
      root.querySelector('[data-configuration]').textContent=item.configuration||'';
      root.querySelector('[data-counter]').textContent=(visible.indexOf(index)+1)+' / '+visible.length;
      root.querySelector('.riio-media-error').hidden=true;
      openers.forEach(a=>{a.href=item.src;if(a.classList.contains('riio-main-link'))a.setAttribute('aria-label','Ampliar '+item.title);});
      links.forEach((a,n)=>{if(n===index)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current');});
      if(focus)links[index].focus({preventScroll:true});
      if(root.contains(document.activeElement))root.querySelector('.riio-thumbs').scrollLeft=links[index].offsetLeft-12;
      if(activeViewer?.root===root)updateDialog(item);
    };
    const move=delta=>show(visible[(visible.indexOf(selected)+delta+visible.length)%visible.length]);
    const viewer={root,move,current:()=>items[selected]};
    links.forEach((a,index)=>a.addEventListener('click',event=>{event.preventDefault();show(index);}));
    filters.forEach(button=>button.addEventListener('click',()=>{
      const category=button.dataset.filter;
      visible=items.map((item,i)=>category==='Todos'||item.category===category?i:-1).filter(i=>i!==-1);
      links.forEach((a,i)=>{a.hidden=!visible.includes(i);});
      filters.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
      show(visible.includes(selected)?selected:visible[0]);
    }));
    root.querySelector('[data-prev]').addEventListener('click',()=>move(-1));
    root.querySelector('[data-next]').addEventListener('click',()=>move(1));
    root.addEventListener('keydown',event=>{
      if(event.altKey||event.ctrlKey||event.metaKey||event.target.matches('input,textarea,select'))return;
      let next;
      if(event.key==='ArrowRight')next=visible[(visible.indexOf(selected)+1)%visible.length];
      else if(event.key==='ArrowLeft')next=visible[(visible.indexOf(selected)-1+visible.length)%visible.length];
      else if(event.key==='Home')next=visible[0];
      else if(event.key==='End')next=visible.at(-1);
      else return;
      event.preventDefault();show(next,!!event.target.closest('[data-select]'));
    });
    stage.addEventListener('pointerdown',event=>{if(event.pointerType==='touch')touch={x:event.clientX,y:event.clientY,id:event.pointerId};});
    stage.addEventListener('pointerup',event=>{
      if(!touch||touch.id!==event.pointerId)return;
      const dx=event.clientX-touch.x,dy=event.clientY-touch.y;touch=null;
      if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.8){suppressOpenUntil=Date.now()+350;move(dx<0?1:-1);}
    });
    stage.addEventListener('pointercancel',()=>{touch=null;});
    image.addEventListener('error',()=>{root.querySelector('.riio-media-error').hidden=false;});
    image.addEventListener('load',()=>{root.querySelector('.riio-media-error').hidden=true;});
    openers.forEach(a=>a.addEventListener('click',event=>{
      if(Date.now()<suppressOpenUntil){event.preventDefault();return;}
      if(!dialog||typeof dialog.showModal!=='function')return;
      event.preventDefault();opener=a;activeViewer=viewer;dialog.showModal();
      document.documentElement.classList.add('riio-modal-open');updateDialog(items[selected]);
    }));
    root.querySelector('.riio-filters').hidden=false;
    root.querySelector('.riio-gallery-controls').hidden=false;
    root.dataset.ready='true';
  });
  if(!dialog)return;
  dialog.querySelector('[data-close-dialog]').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>{document.documentElement.classList.remove('riio-modal-open');resetZoom();opener?.focus({preventScroll:true});activeViewer=null;});
  dialog.querySelector('[data-dialog-prev]').addEventListener('click',()=>activeViewer?.move(-1));
  dialog.querySelector('[data-dialog-next]').addEventListener('click',()=>activeViewer?.move(1));
  const changeZoom=delta=>{zoom=Math.max(1,Math.min(3,zoom+delta));dialogImage.style.width=(zoom*100)+'%';};
  dialog.querySelector('[data-zoom-in]').addEventListener('click',()=>changeZoom(.5));
  dialog.querySelector('[data-zoom-out]').addEventListener('click',()=>changeZoom(-.5));
  dialog.querySelector('[data-zoom-reset]').addEventListener('click',resetZoom);
  dialog.addEventListener('keydown',event=>{
    if(event.key==='ArrowLeft'||event.key==='ArrowRight'){
      // At enlarged scale arrows retain native scrolling; at fit they change scenes.
      if(zoom>1)return;event.preventDefault();activeViewer?.move(event.key==='ArrowLeft'?-1:1);
    }else if(event.key==='+'||event.key==='='){event.preventDefault();changeZoom(.5);}
    else if(event.key==='-'){event.preventDefault();changeZoom(-.5);}
  });
})();
