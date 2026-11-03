# Calibrador de rotas — código arquivado para a futura prancha 5

Não incluir este script no HTML público. Para a próxima prancha, adaptar IDs, viewBox, proporção da imagem e seletores, reaproveitando captura de pontos, undo e exportação JSON. O código abaixo é a versão retirada da PR #538 antes da publicação em 03/11/2026.

O painel original está disponível no histórico Git de `src-greenn/complexo-lapa-pirituba/index.html`, blob `28157223ba97ec25a2d98b48b9a4269193c66733`. Para a prancha 5, implementar em branch específica e validar no LVR antes de publicar.

```html
<div id="c4CalPanel" hidden style="background:#10263b;color:white;padding:12px;display:none;gap:8px">
 <div style="font-weight:800">Calibração precisa — cenário 4 (somente LVR)</div>
 <div style="font-size:12px">Selecione uma rota e clique no CENTRO da pista, seguindo o sentido do trânsito. Os pontos são capturados no sistema 1500 × 1049. Não alteramos a animação até o aceite.</div>
 <label for="c4CalRoute">Trajeto: </label><select id="c4CalRoute"><option value="piqueri">Pirituba → Piqueri</option><option value="ayrton">Pirituba → Ayrton Senna</option><option value="superior">Marginal superior → Marginal Pinheiros</option><option value="inferior">Marginal inferior → Ayrton Senna</option></select>
 <div style="display:flex;gap:7px;flex-wrap:wrap"><button id="c4CalToggle" type="button">Iniciar marcação</button><button id="c4CalUndo" type="button">Desfazer ponto</button><button id="c4CalClear" type="button">Limpar esta rota</button><button id="c4CalCopy" type="button">Copiar coordenadas das 4 rotas</button></div>
 <output id="c4CalInfo" style="font-size:12px">Pronto para marcar.</output>
 </div>
```

```html
<script id="c4-geometry-calibrator">
(()=>{"use strict";
const panel=document.getElementById("c4CalPanel"),overlay=document.getElementById("overlay"),route=document.getElementById("route"),canvas=document.getElementById("canvas");
const toggle=document.getElementById("c4CalToggle"),sel=document.getElementById("c4CalRoute"),info=document.getElementById("c4CalInfo"),layer=document.getElementById("c4CalPoints");
const keys=["piqueri","ayrton","superior","inferior"], colors={piqueri:"#137CF1",ayrton:"#4BA3FA",superior:"#8B5CF6",inferior:"#06B6D4"};
const points=Object.fromEntries(keys.map(k=>[k,[]]));let active=false;
function enabled(){return Number(route.value)===3;}
function paint(){
 layer.replaceChildren();for(const k of keys){const ps=points[k];if(!ps.length)continue;
 const path=document.createElementNS("http://www.w3.org/2000/svg","polyline");path.setAttribute("points",ps.map(p=>p.join(",")).join(" "));path.setAttribute("stroke",colors[k]);path.setAttribute("stroke-width","6");path.setAttribute("fill","none");layer.append(path);
 ps.forEach((p,i)=>{const circle=document.createElementNS("http://www.w3.org/2000/svg","circle");circle.setAttribute("cx",p[0]);circle.setAttribute("cy",p[1]);circle.setAttribute("r",i===0?"9":"5");circle.setAttribute("fill",colors[k]);circle.setAttribute("stroke","white");circle.setAttribute("stroke-width","2");layer.append(circle);});
 }
 info.textContent=sel.value+": "+points[sel.value].length+" pontos | "+(active?"Marcação ativa":"Marcação pausada");
}
function refresh(){panel.hidden=!enabled();panel.style.display=enabled()?"grid":"none";if(!enabled())active=false;overlay.style.pointerEvents=active&&enabled()?"auto":"none";canvas.style.touchAction=active&&enabled()?"none":"";toggle.textContent=active?"Pausar marcação":"Iniciar marcação";paint();}
toggle.addEventListener("click",()=>{active=!active;refresh();});
sel.addEventListener("change",paint);
document.getElementById("c4CalUndo").addEventListener("click",()=>{points[sel.value].pop();paint();});
document.getElementById("c4CalClear").addEventListener("click",()=>{points[sel.value]=[];paint();});
document.getElementById("c4CalCopy").addEventListener("click",async()=>{const data=JSON.stringify({base:"Mapa_Figura2_Pirituba_Piqueri_Ayrton_Senna.webp",viewBox:"0 0 1500 1049",points},null,2);try{await navigator.clipboard.writeText(data);info.textContent="Coordenadas copiadas. Cole-as no ChatGPT.";}catch{info.textContent=data;}});
overlay.addEventListener("pointerdown",e=>{if(!active||!enabled())return;e.preventDefault();e.stopImmediatePropagation();const pt=overlay.createSVGPoint();pt.x=e.clientX;pt.y=e.clientY;const matrix=overlay.getScreenCTM();if(!matrix)return;const p=pt.matrixTransform(matrix.inverse());points[sel.value].push([Math.round(p.x),Math.round(p.y)]);paint();},true);
route.addEventListener("change",()=>requestAnimationFrame(refresh));document.getElementById("prev").addEventListener("click",()=>requestAnimationFrame(refresh));document.getElementById("next").addEventListener("click",()=>requestAnimationFrame(refresh));refresh();
})();
</script>
```
