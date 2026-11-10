#!/usr/bin/env node
// RESF conversion guardrails (Wagner, 2026-11-09): docs/frameworks/resf/v1/RESF_CONVERSION_GUARDRAILS_2026-11-09.md
import {readFileSync,readdirSync,existsSync} from 'node:fs';
import assert from 'node:assert/strict';
const COMPETITOR=/(?:^|\.)(invexo\.com\.br|evandroimoveisrj\.com\.br|lancamentosrj\.com|myside\.com\.br|apto\.vc|zapimoveis\.com\.br|vivareal\.com\.br|imovelweb\.com\.br|novosimoveisrio\.com\.br|apetopia\.com\.br|imohoo\.com\.br|reallerimoveis\.com\.br|npiconsultoria\.com\.br|maptons\.com)$/i;
// Tegra official hotsites (Wagner 2026-11-10): not competitors, but still no outbound link (Tegra-site isolation keeps the lead with Sabrina).
const TEGRA_HOTSITE=/(?:^|\.)(peninsulacollection\.com\.br|tegraincorporadora\.com\.br)$/i;
// R2 legacy debt: may only shrink. Empty since 2026-11-10 (Gran Thai/Singular galleries moved to Tegra media).
const MEDIA_DEBT={};
const STRICT=['kronos-by-tegra','claris-casa-e-clube','claris-rosas','gran-thai-leisure-residence','singular-private-residence','gaea-home-resort','riio-by-piero-lissoni'];
const CARDS=STRICT.filter(s=>s!=='riio-by-piero-lissoni');
const BANNED=/divulgad|o catálogo (?:oficial |da Tegra |Tegra )?informa|incorporadora informa|ficha oficial informa|não usamos plantas|precisam corresponder|sem reutilizar|confirme (?:o endereço|na documentação)|sob confirmação|origem oficial|anteriormente foi|esta página não anuncia|informado pela Tegra/i;
const host=u=>{try{return new URL(u).hostname}catch{return ''}};
const pages=readdirSync('src-greenn/empreendimentos',{withFileTypes:true}).filter(d=>d.isDirectory()).map(d=>d.name).filter(s=>existsSync(`src-greenn/empreendimentos/${s}/index.html`));
let fails=[];
for(const slug of [...pages,'__hub_rio']){
 const path=slug==='__hub_rio'?'src-greenn/rio-de-janeiro/index.html':`src-greenn/empreendimentos/${slug}/index.html`;
 const h=readFileSync(path,'utf8'),body=h.slice(h.indexOf('<body'));
 const hrefs=[...body.matchAll(/href="(https?:\/\/[^"]+)"/g)].map(m=>m[1]);
 const srcs=[...h.matchAll(/\b(?:src|content)="(https?:\/\/[^"]+)"/g)].map(m=>m[1]);
 for(const u of hrefs)if(COMPETITOR.test(host(u)))fails.push(`${slug}: R1 link to competitor ${u}`);
 for(const u of hrefs)if(TEGRA_HOTSITE.test(host(u))&&!/tour360/.test(u))fails.push(`${slug}: R1 link to Tegra hotsite (lead leaves Sabrina) ${u}`);
 const media=srcs.filter(u=>COMPETITOR.test(host(u))).length;
 if(media>(MEDIA_DEBT[slug]||0))fails.push(`${slug}: R2 competitor-hosted media ${media} > allowed ${MEDIA_DEBT[slug]||0}`);
 else if(media)console.warn(`COMPETITOR_MEDIA_DEBT ${slug}: ${media} (must shrink)`);
 if(!(STRICT.includes(slug)||slug==='__hub_rio'))continue;
 for(const u of hrefs)if(!/^https:\/\/(www\.moretegra\.com\.br\/|wa\.me\/5511960779328|corretor\.tegravendas\.com\.br\/sabrina\/sp)/.test(u))fails.push(`${slug}: R1 outbound link ${u}`);
 const visible=body.replace(/<style[\s\S]*?<\/style>/g,' ').replace(/<script(?![^>]*ld\+json)[\s\S]*?<\/script>/g,' ').replace(/<[^>]+>/g,' ');
 const ld=[...h.matchAll(/application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]).join(' ');
 const hit=(visible+' '+ld).match(BANNED);if(hit)fails.push(`${slug}: R3 justification copy "${hit[0]}"`);
 if(slug==='__hub_rio')continue;
 const map=h.match(/<a class="(?:mnt-)?map-hit"[^>]*>|<div class="riio-map-visual">[\s\S]*?<a href="[^"]+"/)?.[0]||'';
 if(!/wa\.me\/5511960779328\?text=[^"]*localiza/.test(map))fails.push(`${slug}: R4 map must open WhatsApp asking for the exact location`);
 if(CARDS.includes(slug)){
  const plans=h.match(/<section class="section rio-plans-section" id="plantas-oficiais"[\s\S]*?<\/section>/)?.[0]||'';
  const cards=[...plans.matchAll(/<article class="rio-plan-card">[\s\S]*?<\/article>/g)].map(m=>m[0]);
  if(cards.length<2)fails.push(`${slug}: R5 plan cards missing`);
  for(const c of cards)if(!/<a class="button rio-plan-cta" href="https:\/\/wa\.me\/5511960779328\?text=Por%20favor%20me%20envie[^"]*"[^>]*>Solicitar Planta<\/a>/.test(c))fails.push(`${slug}: R5 card without WhatsApp "Solicitar Planta"`);
 }
}
for(const f of fails)console.error('FAIL',f);
assert.equal(fails.length,0,'RESF conversion guardrails violated');
console.log(`PASS: RESF conversion guardrails — ${pages.length} project pages scanned for competitor links/media; ${STRICT.length} Rio pages + hub strict (R1–R5).`);
