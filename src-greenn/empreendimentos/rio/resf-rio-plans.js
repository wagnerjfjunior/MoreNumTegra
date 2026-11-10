/* RESF Rio — seletor de plantas (padrão Chateau Jardin). Sem dependências.
   Marcação servida no HTML: [data-rio-plans] > grupos [data-plan-group], abas [data-plan-tab] com data-img/data-title/data-area/data-kicker/data-wa,
   palco [data-plan-image], [data-plan-title], [data-plan-area], [data-plan-kicker], [data-plan-cta], setas [data-plan-prev]/[data-plan-next]. */
(()=>{"use strict";
document.querySelectorAll("[data-rio-plans]").forEach(root=>{
 const tabs=[...root.querySelectorAll("[data-plan-tab]")],groups=[...root.querySelectorAll("[data-plan-group]")];
 const img=root.querySelector("[data-plan-image]"),title=root.querySelector("[data-plan-title]"),area=root.querySelector("[data-plan-area]"),kicker=root.querySelector("[data-plan-kicker]"),cta=root.querySelector("[data-plan-cta]"),count=root.querySelector("[data-plan-count]");
 if(!tabs.length||!img)return;
 let current=0;
 const visible=()=>tabs.filter(t=>!t.hidden);
 function show(i,focus){
  current=(i+tabs.length)%tabs.length;const t=tabs[current],d=t.dataset;
  tabs.forEach((b,n)=>{const on=n===current;b.setAttribute("aria-selected",String(on));b.tabIndex=on?0:-1;});
  const pre=new Image();pre.onload=()=>{img.src=d.img;img.width=+d.w||img.width;img.height=+d.h||img.height;};pre.src=d.img;
  img.alt=d.alt||d.title;title.textContent=d.title;area.textContent=d.area;if(kicker)kicker.textContent=d.kicker||"";if(cta)cta.href=d.wa;
  if(count){const v=visible();count.textContent=String(v.indexOf(t)+1).padStart(2,"0")+" / "+String(v.length).padStart(2,"0");}
  /* rola só a faixa de abas na horizontal; nunca a página (scrollIntoView puxava a página para o meio ao carregar) */
  const bar=t.parentElement;if(bar&&bar.scrollWidth>bar.clientWidth){const l=t.offsetLeft-bar.offsetLeft-(bar.clientWidth-t.clientWidth)/2;bar.scrollTo({left:Math.max(0,l)});}
  if(focus)t.focus({preventScroll:true});
 }
 function selectGroup(g){
  groups.forEach(b=>{const on=b.dataset.planGroup===g;b.setAttribute("aria-selected",String(on));b.tabIndex=on?0:-1;});
  tabs.forEach(t=>{t.hidden=!!g&&t.dataset.group!==g;});
  const first=tabs.findIndex(t=>!t.hidden);show(first<0?0:first);
 }
 function step(dir){const v=visible();const pos=v.indexOf(tabs[current]);show(tabs.indexOf(v[(pos+dir+v.length)%v.length]));}
 tabs.forEach((t,i)=>{t.addEventListener("click",()=>show(i));t.addEventListener("keydown",e=>{if(e.key==="ArrowRight"){e.preventDefault();step(1);tabs[current].focus();}if(e.key==="ArrowLeft"){e.preventDefault();step(-1);tabs[current].focus();}});});
 groups.forEach(b=>b.addEventListener("click",()=>selectGroup(b.dataset.planGroup)));
 root.querySelector("[data-plan-prev]")?.addEventListener("click",()=>step(-1));
 root.querySelector("[data-plan-next]")?.addEventListener("click",()=>step(1));
 let x0=null;img.addEventListener("touchstart",e=>{x0=e.touches[0].clientX},{passive:true});img.addEventListener("touchend",e=>{if(x0===null)return;const dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>40)step(dx<0?1:-1);x0=null;},{passive:true});
 selectGroup(groups[0]?.dataset.planGroup||"");
 root.classList.add("is-ready");
});
})();
