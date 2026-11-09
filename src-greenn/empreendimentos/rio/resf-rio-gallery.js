/* RESF Rio — vanilla JS; verified project scenes, scroll-snap + touch/keyboard. */
(()=>{"use strict";
for(const gallery of document.querySelectorAll("[data-rio-gallery]")){
 const track=gallery.querySelector(".rio-gallery-track"),slides=[...track.querySelectorAll(".rio-gallery-slide")];
 const status=gallery.querySelector("[data-gallery-status]");
 const buttons=[gallery.querySelector("[data-gallery-prev]"),gallery.querySelector("[data-gallery-next]")];
 let active=0;
 function update(){
   const center=track.scrollLeft+track.clientWidth/2;
   let best=0,distance=Infinity;
   slides.forEach((slide,index)=>{const x=slide.offsetLeft+slide.offsetWidth/2;const d=Math.abs(center-x);if(d<distance){distance=d;best=index}});
   active=best;
   if(status)status.textContent=(active+1)+" / "+slides.length;
   buttons[0].disabled=active===0;buttons[1].disabled=active===slides.length-1;
 }
 function move(dir){
   const next=Math.max(0,Math.min(slides.length-1,active+dir));
   track.scrollTo({left:slides[next].offsetLeft,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});
   active=next;
   if(status)status.textContent=(active+1)+" / "+slides.length;
   buttons[0].disabled=active===0;buttons[1].disabled=active===slides.length-1;
 }
 buttons[0]?.addEventListener("click",()=>move(-1));buttons[1]?.addEventListener("click",()=>move(1));
 track.addEventListener("keydown",event=>{if(event.key==="ArrowRight"||event.key==="ArrowLeft"){event.preventDefault();move(event.key==="ArrowRight"?1:-1)}});
 let pending=false;
 track.addEventListener("scroll",()=>{if(!pending){pending=true;requestAnimationFrame(()=>{pending=false;update()})}},{passive:true});
 addEventListener("resize",update,{passive:true});update();
}
})();