/* RESF Rio — galeria (padrão Ampère Brooklin): foto em tela cheia, nome do ambiente e contador sobre a foto,
   setas sobre a imagem, abas de ambientes. Vanilla JS; scroll-snap + toque/teclado; todas as fotos ficam no HTML. */
(()=>{"use strict";
for(const gallery of document.querySelectorAll("[data-rio-gallery]")){
 const track=gallery.querySelector(".rio-gallery-track"),slides=[...track.querySelectorAll(".rio-gallery-slide")];
 const status=gallery.querySelector("[data-gallery-status]"),nav=gallery.querySelector("[data-scene-nav]");
 const prev=gallery.querySelector("[data-gallery-prev]"),next=gallery.querySelector("[data-gallery-next]");
 const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
 let active=0;const tabs=[];
 if(nav)slides.forEach((slide,i)=>{const b=document.createElement("button");b.type="button";b.setAttribute("role","tab");b.textContent=slide.dataset.label||String(i+1);b.addEventListener("click",()=>go(i));nav.append(b);tabs.push(b);});
 function paint(){
  if(status)status.textContent=(active+1)+" / "+slides.length;
  tabs.forEach((b,n)=>{const on=n===active;b.setAttribute("aria-selected",String(on));b.tabIndex=on?0:-1;if(on&&nav){const l=b.offsetLeft-nav.clientWidth/2+b.clientWidth/2;nav.scrollTo({left:Math.max(0,l),behavior:reduce?"auto":"smooth"});}});
 }
 function go(i){active=(i+slides.length)%slides.length;track.scrollTo({left:slides[active].offsetLeft,behavior:reduce?"auto":"smooth"});paint();}
 function update(){const c=track.scrollLeft+track.clientWidth/2;let best=0,d=Infinity;slides.forEach((s,i)=>{const x=Math.abs(c-(s.offsetLeft+s.offsetWidth/2));if(x<d){d=x;best=i}});if(best!==active){active=best;paint();}}
 prev?.addEventListener("click",()=>go(active-1));next?.addEventListener("click",()=>go(active+1));
 track.addEventListener("keydown",e=>{if(e.key==="ArrowRight"||e.key==="ArrowLeft"){e.preventDefault();go(active+(e.key==="ArrowRight"?1:-1));}});
 let pending=false,settle;
 track.addEventListener("scroll",()=>{clearTimeout(settle);settle=setTimeout(update,90);if(!pending){pending=true;requestAnimationFrame(()=>{pending=false;})}},{passive:true});
 addEventListener("resize",()=>track.scrollTo({left:slides[active].offsetLeft}),{passive:true});
 gallery.classList.add("is-ready");paint();
}
})();
