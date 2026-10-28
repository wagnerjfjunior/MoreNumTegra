// Local essential derivative first; keep the authorized original as a media fallback.
document.querySelectorAll('img[data-fallback]').forEach(image=>{
 image.addEventListener('error',()=>{
  const fallback=image.dataset.fallback;
  if(fallback){delete image.dataset.fallback;image.removeAttribute('srcset');image.src=fallback;}
 },{once:true});
});
