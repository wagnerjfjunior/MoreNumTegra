"use strict";
const routeNames=[
"Lapa → Pirituba","Pirituba → Lapa","Ayrton Senna → Pirituba","Ayrton Senna → Lapa","Lapa → Marginal Pinheiros","Pirituba → Marginal Pinheiros","Pirituba → Piqueri","Pirituba → Ayrton Senna","Marginal Pinheiros → Pirituba","Retornos dos condomínios → Lapa","Lapa → Ayrton Senna","Lapa → condomínios Vila Anastácio","Av. Raimundo → Av. Mercedes","Av. Mercedes → Av. Raimundo","Av. Raimundo → Rua Diogo Ortiz","Rua Diogo Ortiz → Av. Raimundo","Acesso CPTM Estação Piqueri"];
// A geometria é um dado de engenharia: não substituir paths ausentes por linhas inventadas.
// assets/rota-<pagina>.jpg serão importados do PDF oficial no lote de mídias.
// routes-verified.json deve conter um objeto por página: { "19": {"viewBox":"0 0 850 850","d":"M ...","verified":true} }
// O campo verified é aplicado somente após inspeção do alinhamento e sentido no LVR.
const routeSelect=document.getElementById("route"),$=id=>document.getElementById(id);
let verified={},frame=0,start=0,paused=true,idx=0;
routeNames.forEach((n,i)=>{let o=document.createElement("option");o.value=i;o.textContent=(i+1)+". "+n;routeSelect.append(o);});
function halt(){cancelAnimationFrame(frame);paused=true;$("play").textContent="Reproduzir percurso";$("play").setAttribute("aria-pressed","false");}
function tick(t){if(paused)return;const p=$("progress"),m=$("marker"),path=$("flow"),len=path.getTotalLength();const ratio=((t-start)/8000)%1;const point=path.getPointAtLength(len*ratio);p.setAttribute("stroke-dasharray",(len*ratio)+" "+len);m.setAttribute("cx",point.x);m.setAttribute("cy",point.y);frame=requestAnimationFrame(tick);}
function toggle(){if($("play").disabled)return;if(!paused){halt();return;}paused=false;start=performance.now();$("play").textContent="Pausar animação";$("play").setAttribute("aria-pressed","true");frame=requestAnimationFrame(tick);}
function render(n){halt();idx=(n+17)%17;routeSelect.value=idx;const page=idx+19,route=routeNames[idx],entry=verified[String(page)];$("name").textContent=route;$("maptitle").textContent=route;$("counter").textContent="Percurso "+(idx+1)+" de 17";$("page").textContent="Página "+page+" do PDF";$("mapimg").src="assets/rota-"+page+".jpg";$("mapimg").alt="Mapa oficial do trajeto "+route+" (página "+page+")";const ok=Boolean(entry?.verified&&entry?.d&&entry?.viewBox);$("overlay").setAttribute("viewBox",ok?entry.viewBox:"0 0 850 850");for(const id of ["base","flow","progress"])$(id).setAttribute("d",ok?entry.d:"");$("marker").setAttribute("cx",-100);$("marker").setAttribute("cy",-100);$("play").disabled=!ok;$("status").textContent=ok?"Traçado validado. Toque em Reproduzir percurso para acompanhar a linha azul.":"Mapa original disponível no acervo; animação pendente da conferência vetorial deste trajeto.";}
routeSelect.addEventListener("change",()=>render(Number(routeSelect.value)));
$("prev").addEventListener("click",()=>render(idx-1));$("next").addEventListener("click",()=>render(idx+1));$("play").addEventListener("click",toggle);
$("mapimg").addEventListener("error",()=>{$("status").textContent="Imagem do percurso ainda não importada ao repositório; indisponível nesta branch.";});
fetch("./routes-verified.json").then(r=>{if(!r.ok)throw Error("sem arquivo");return r.json();}).then(data=>{verified=data;render(idx);}).catch(()=>render(idx));
