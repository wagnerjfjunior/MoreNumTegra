#!/usr/bin/env node
// RESF conversion guardrails (Wagner, 2026-11-09): docs/frameworks/resf/v1/RESF_CONVERSION_GUARDRAILS_2026-11-09.md
import {readFileSync,readdirSync,existsSync} from 'node:fs';
import assert from 'node:assert/strict';
import {CHANNELS,RJ_PROJECT_SLUGS,RJ_FORBIDDEN} from './lib/commercial-channels.mjs';
const COMPETITOR=/(?:^|\.)(invexo\.com\.br|evandroimoveisrj\.com\.br|lancamentosrj\.com|myside\.com\.br|apto\.vc|zapimoveis\.com\.br|vivareal\.com\.br|imovelweb\.com\.br|novosimoveisrio\.com\.br|apetopia\.com\.br|imohoo\.com\.br|reallerimoveis\.com\.br|npiconsultoria\.com\.br|maptons\.com)$/i;
// Tegra official hotsites (Wagner 2026-11-10): not competitors, but still no outbound link (Tegra-site isolation keeps the lead in the funnel).
const TEGRA_HOTSITE=/(?:^|\.)(peninsulacollection\.com\.br|tegraincorporadora\.com\.br)$/i;
// R2 legacy debt: may only shrink. Empty since 2026-11-10 (Gran Thai/Singular galleries moved to Tegra media).
const MEDIA_DEBT={};
// Official Tegra media hosts for plan images/photos (Tegra blob, Green Sales, Tegra official hotsites).
const OFFICIAL_MEDIA=/(?:^|\.)(stracctegra\.blob\.core\.windows\.net|s3-gdigital\.s3\.amazonaws\.com|peninsulacollection\.com\.br|kronosbytegra\.com\.br)$/i;
// Strict pages = Rio (hub + 7). Their only commercial channel is the RJ service center (R1/R7, Wagner 2026-11-10).
const STRICT=[...RJ_PROJECT_SLUGS];
const RJ_WA=CHANNELS.rj.whatsapp;
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
 for(const u of hrefs)if(TEGRA_HOTSITE.test(host(u))&&!/tour360/.test(u))fails.push(`${slug}: R1 link to Tegra hotsite (lead leaves the funnel) ${u}`);
 const media=srcs.filter(u=>COMPETITOR.test(host(u))).length;
 if(media>(MEDIA_DEBT[slug]||0))fails.push(`${slug}: R2 competitor-hosted media ${media} > allowed ${MEDIA_DEBT[slug]||0}`);
 else if(media)console.warn(`COMPETITOR_MEDIA_DEBT ${slug}: ${media} (must shrink)`);
 if(!(STRICT.includes(slug)||slug==='__hub_rio'))continue;
 for(const u of hrefs)if(!(u.startsWith('https://www.moretegra.com.br/')||u.startsWith(`https://wa.me/${RJ_WA}`)))fails.push(`${slug}: R1 outbound link ${u}`);
 const visible=body.replace(/<style[\s\S]*?<\/style>/g,' ').replace(/<script(?![^>]*ld\+json)[\s\S]*?<\/script>/g,' ').replace(/<[^>]+>/g,' ');
 const ld=[...h.matchAll(/application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]).join(' ');
 const hit=(visible+' '+ld).match(BANNED);if(hit)fails.push(`${slug}: R3 justification copy "${hit[0]}"`);
 // R7 (Wagner 2026-11-10): Rio pages and hub carry no Sabrina reference (CRECI issue in RJ); contact is direct with Tegra.
 if(/sabrina/i.test(h))fails.push(`${slug}: R7 Sabrina reference on a Rio page`);
 if(RJ_FORBIDDEN.test(h.replace(/https?:\/\/[^"\s]+/g,'')))fails.push(`${slug}: R7 Sabrina/CRECI or Tegra attribution on a Rio page`);
 if(!h.includes('Central de atendimento RJ'))fails.push(`${slug}: R7 RJ service-center contact missing`);
 if(h.includes(CHANNELS.sp.whatsapp))fails.push(`${slug}: R1 São Paulo channel on a Rio page`);
 if(slug==='__hub_rio')continue;
 const map=h.match(/<a class="(?:mnt-)?map-hit"[^>]*>|<div class="riio-map-visual">[\s\S]*?<a href="[^"]+"/)?.[0]||'';
 if(!new RegExp(`wa\\.me\\/${RJ_WA}\\?text=[^"]*localiza`).test(map))fails.push(`${slug}: R4 map must open WhatsApp asking for the exact location`);
 if(CARDS.includes(slug)){
  const plans=h.match(/<section class="section rio-plans-section" id="plantas-oficiais"[\s\S]*?<\/section>/)?.[0]||'';
  const cards=[...plans.matchAll(/<article class="rio-plan-card">[\s\S]*?<\/article>/g)].map(m=>m[0]);
  const tabs=[...plans.matchAll(/<button[^>]*data-plan-tab[^>]*>/g)].map(m=>m[0]);
  if(cards.length<2&&tabs.length<2)fails.push(`${slug}: R5 plan cards or plan selector missing`);
  for(const c of cards){
   if(!/<a class="button rio-plan-cta" href="https:\/\/wa\.me\/5511951667227\?text=Por%20favor%20me%20envie[^"]*"[^>]*>Solicitar Planta<\/a>/.test(c))fails.push(`${slug}: R5 card without WhatsApp "Solicitar Planta"`);
   const src=c.match(/<img[^>]*src="([^"]+)"/)?.[1];
   if(!src)fails.push(`${slug}: R5 plan card without photo`);else if(!OFFICIAL_MEDIA.test(host(src)))fails.push(`${slug}: R5 plan card photo not official Tegra media ${src}`);
  }
  for(const t of tabs){
   const img=t.match(/data-img="([^"]+)"/)?.[1],wa=t.match(/data-wa="([^"]+)"/)?.[1];
   if(!img||!OFFICIAL_MEDIA.test(host(img)))fails.push(`${slug}: R5 selector plan without official image ${img}`);
   if(!wa||!wa.startsWith(`https://wa.me/${RJ_WA}?text=Por%20favor%20me%20envie%20a%20planta`))fails.push(`${slug}: R5 selector plan without WhatsApp request`);
  }
  if(tabs.length&&!new RegExp(`data-plan-cta href="https://wa\\.me/${RJ_WA}`).test(plans.replace(/class="button rio-plan-cta" /,'')))fails.push(`${slug}: R5 selector CTA must open WhatsApp`);
  if(tabs.length&&!h.includes('src="/src-greenn/empreendimentos/rio/resf-rio-plans.js"'))fails.push(`${slug}: R5 plan selector script missing`);
 }
}
for(const f of fails)console.error('FAIL',f);
assert.equal(fails.length,0,'RESF conversion guardrails violated');
console.log(`PASS: RESF conversion guardrails — ${pages.length} project pages scanned for competitor links/media; ${STRICT.length} Rio pages + hub strict (R1–R5, R7).`);
