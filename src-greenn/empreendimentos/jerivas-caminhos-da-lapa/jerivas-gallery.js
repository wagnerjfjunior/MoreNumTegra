(()=>{"use strict";
const gallery=[["https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/252/Imagem/bf8ec338-a24c-4235-908e-dac0c167e13b.jpg","Galeria Jerivás — vista do empreendimento"],["https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/252/Imagem/08ad77a1-4ca9-4b4b-b211-84e7187cd7c0.jpg","Galeria Jerivás — ambiente do empreendimento"],["https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/252/Imagem/21474d12-9bce-4e27-b918-4643f0008f01.jpg","Galeria Jerivás — espaço de convivência"],["https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/252/Imagem/c0880fa8-1842-4f9c-8445-47b8afb1806c.jpg","Galeria Jerivás — ambiente residencial"],["https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/252/Imagem/0f09ec63-ac53-49bc-9c12-9ab75ec38681.jpg","Galeria Jerivás — imagem do empreendimento"],["https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/252/Imagem/2b00d8a5-1996-419f-9fc5-b725bcba5aa2.jpg","Galeria Jerivás — imagem de lazer"]];
const plans=[["https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/252/Planta/202ea214-2bbe-411b-b821-bc6f1824360a.jpg","Implantação do condomínio Jerivás Caminhos da Lapa"],["https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/252/Planta/e3256c7d-f305-4e61-bf17-222d0d7a6c33.jpg","Planta padrão de 105 m² do Jerivás"],["https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/252/Planta/216cf6ad-0064-4b18-972f-09f1a4714b30.jpg","Planta padrão de 136 m² do Jerivás"]];
function get(id){return document.getElementById(id)}
const galleryBox=document.querySelector('[data-jerivas-gallery]');
const galleryImage=get('jerivas-gallery-image'),galleryCaption=get('jerivas-gallery-caption'),counter=get('jerivas-gallery-counter');
let activeGallery=0;
const galleryButtons=[...document.querySelectorAll('[data-gallery-index]')];
function showGallery(index){
 if(!galleryImage||!galleryCaption||!counter)return;
 activeGallery=(index+gallery.length)%gallery.length;
 const [src,alt]=gallery[activeGallery];
 galleryImage.src=src;galleryImage.alt=alt;galleryCaption.textContent=alt;
 counter.textContent=(activeGallery+1)+' de '+gallery.length;
 galleryButtons.forEach((btn,i)=>btn.setAttribute('aria-pressed',String(i===activeGallery)));
}
galleryButtons.forEach((btn,i)=>btn.addEventListener('click',()=>showGallery(i)));
document.querySelector('[data-gallery-prev]')?.addEventListener('click',()=>showGallery(activeGallery-1));
document.querySelector('[data-gallery-next]')?.addEventListener('click',()=>showGallery(activeGallery+1));
galleryBox?.addEventListener('keydown',(ev)=>{if(ev.key==='ArrowRight'||ev.key==='ArrowLeft'){ev.preventDefault();showGallery(activeGallery+(ev.key==='ArrowRight'?1:-1));galleryButtons[activeGallery]?.focus();}});
let touchStart=null;
galleryImage?.addEventListener('touchstart',ev=>{if(ev.touches.length===1)touchStart=ev.touches[0].clientX;},{passive:true});
galleryImage?.addEventListener('touchend',ev=>{if(touchStart===null)return;const dx=ev.changedTouches[0].clientX-touchStart;touchStart=null;if(Math.abs(dx)>45)showGallery(activeGallery+(dx<0?1:-1));},{passive:true});
const plantImage=get('jerivas-plan-image'),plantCaption=get('jerivas-plan-caption');
const plantButtons=[...document.querySelectorAll('[data-plan-index]')];
function showPlan(index){if(!plantImage||!plantCaption||index<0||index>=plans.length)return;const [src,alt]=plans[index];plantImage.src=src;plantImage.alt=alt;plantCaption.textContent=alt;plantButtons.forEach((btn,i)=>btn.setAttribute('aria-pressed',String(i===index)));}
plantButtons.forEach((btn,i)=>btn.addEventListener('click',()=>showPlan(i)));
})();