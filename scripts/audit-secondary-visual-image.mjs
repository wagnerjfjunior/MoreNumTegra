#!/usr/bin/env node
// Source-only audit of the second visible-content image candidate.
// Does not mutate HTML, JSON-LD, production metadata, or third-party assets.
import {readFileSync,readdirSync} from 'node:fs';
import assert from 'node:assert/strict';
const roots=['src-greenn/empreendimentos','src-greenn/regioes'];
const excluded=new Set(['/empreendimentos/dsg-itaim/','/empreendimentos/capiitolo-piero-lissoni/']);
const entities=s=>Object.fromEntries([...s.matchAll(/([:\w-]+)\s*=\s*["']([^"']*)["']/g)].map(m=>[m[1].toLowerCase(),m[2]]));
const rows=[];
for(const root of roots){
  for(const entry of readdirSync(root,{withFileTypes:true}).filter(x=>x.isDirectory()).sort((a,b)=>a.name.localeCompare(b.name))){
    const path=`${root}/${entry.name}/index.html`;
    let html;
    try{html=readFileSync(path,'utf8')}catch{continue}
    const route='/'+root.replace(/^src-greenn\//,'')+'/'+entry.name+'/';
    const mainStart=html.indexOf('<main');
    const mainEnd=html.indexOf('</main>',mainStart);
    const section=mainStart>=0&&mainEnd>mainStart?html.slice(mainStart,mainEnd):'';
    const imgs=[...section.matchAll(/<img\b[^>]*>/gi)].map(x=>entities(x[0])).filter(x=>x.src);
    const first=imgs[0]||null, second=imgs[1]||null;
    const reasons=[];
    if(excluded.has(route))reasons.push('EXCLUDED_FROM_RESF_V2');
    if(!first||!second)reasons.push('INSUFFICIENT_STATIC_MAIN_IMAGES');
    if(first&&second&&first.src===second.src)reasons.push('SECOND_REPEATS_HERO');
    if(second&&/\/Planta\//i.test(second.src))reasons.push('SECOND_IS_FLOORPLAN');
    if(second&&/Rua.Jardim|Complexo\.webp/i.test(second.alt+' '+second.src))reasons.push('SECOND_IS_URBAN_CONTEXT');
    const status=reasons.includes('EXCLUDED_FROM_RESF_V2')?'EXCLUDED':reasons.length?'REVIEW':'CANDIDATE_ONLY';
    rows.push({route,file:path,status,hero:first?{url:first.src,alt:first.alt||''}:null,secondaryCandidate:second?{url:second.src,alt:second.alt||''}:null,reasons});
  }
}
assert(rows.length>=36,'Unexpected source inventory shrink');
const counts=Object.fromEntries(['CANDIDATE_ONLY','REVIEW','EXCLUDED'].map(v=>[v,rows.filter(r=>r.status===v).length]));
console.log(JSON.stringify({schema:'mnt-secondary-image-source-audit-v1',scope:'source-only; DOM ordering not independently verified',total:rows.length,counts,rows},null,2));
