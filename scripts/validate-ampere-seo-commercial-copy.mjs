import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync('src-greenn/empreendimentos/ampere-brooklin/index.html','utf8');
const hero=html.match(/<section class="hero"[\s\S]*?<\/section>/)?.[0];
assert(hero,'missing hero');
assert.equal((html.match(/<h1\b/g)||[]).length,1,'one H1 only');
assert(hero.includes('<h1 id="title" class="display">Tegra Ampère Brooklin — apartamentos em construção</h1>'),'H1 unique project name');
assert(hero.includes('<h2 class="hero-lead">Apartamentos no Brooklin de 262 m² privativos, com 4 suítes, 4 vagas e dois terraços em torre única.</h2>'),'search-oriented H2');
assert(!html.includes('class="pilot" href="/regioes/brooklin/"'),'regional outbound navigation not at hero top');
const locality=html.match(/<section class="section residences" id="localizacao">[\s\S]*?<\/section>/)?.[0];
assert(locality?.includes('href="/regioes/brooklin/"'),'regional link relocated into locality context');
for(const bad of [
  'A página regional concentra a descoberta por bairro',
  'Galeria ampliada com imagens oficiais do empreendimento',
  'O material oficial destaca o living',
  'a página exibe',
  'A condição comercial permanece vinculada',
]) {
  // The SEO rewrite is bounded to commercial copy; pre-existing FAQ is guarded
  // separately and can retain its exact approved legal phrasing.
  const withoutFaq=html.slice(html.indexOf("<body")).replace(/<section class="section residences" id="faq">[\s\S]*?<\/section>/,"FAQ");
  assert(!withoutFaq.toLowerCase().includes(bad.toLowerCase()),'self-referential sales copy: '+bad);
}
for(const phrase of ['Living Double View','dois terraços','piscinas','262 m²','4 vagas','4 suítes','unidade 0121','Tegra Vendas'])assert(html.includes(phrase),'factual content lost: '+phrase);
assert(html.includes('id="moretegra-lead-form"'),'Form46 must remain');
assert(html.includes('data-mnt-commercial-footer'),'footer must remain');
assert(html.includes('<section class="facts" aria-label="Resumo do Ampère Brooklin">'),'facts pattern must remain');
assert(html.includes('<meta property="og:image"'),'OG image must remain');
assert(html.includes('<meta name="twitter:image"'),'Twitter image must remain');
const ld=JSON.parse(html.match(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/)?.[1]||'null');
assert.equal(ld['@graph'].length,18,'approved graph must not change');
assert.equal((html.match(/<details><summary>/g)||[]).length,12,'12 visible FAQ questions');
const node=ld['@graph'].find(x=>x['@type']==='FAQPage');
const fqSection=html.match(/<section class="section residences" id="faq">([\s\S]*?)<\/section>/)?.[1];
const visible=[...fqSection.matchAll(/<details><summary>(.*?)<\/summary><p>(.*?)<\/p><\/details>/g)].map(x=>[x[1],x[2]]);
assert.deepEqual(node.mainEntity.map(x=>[x.name,x.acceptedAnswer?.text]),visible,'visible/JSON-LD FAQ parity');
for(const term of ['Tegra Ampère Brooklin','Apartamento de 262 m² no Brooklin','Apartamentos no Brooklin','id="visita"','id="negociacao"'])assert(html.includes(term),'Missing editorial or conversion coverage: '+term);

const gallery=html.match(/<div class="ampere-neighborhood"[\s\S]*?<div class="local-grid">/)?.[0];
assert(gallery,'Brooklin neighborhood block must remain in locality');
assert.equal((gallery.match(/<figure class="ampere-neighborhood-card">/g)||[]).length,3,'three verified Tegra neighborhood images');
for(const filename of [
 'Tegra-Incorporadora-Localizacao-Ponte-Estaiada-Apartamentos-Ampere-Brooklin-Sao-Paulo-SP-1400x1400-1722438997006.jpg',
 'Tegra-Incorporadora-Localizacao-Bairro-Brooklin-Apartamentos-Ampere-Brooklin-Sao-Paulo-SP-1400x1400-1722438997006.jpg',
 'Tegra-Incorporadora-Localizacao-Bairro-Brooklin-Marginal-Pinheiros-Apartamentos-Ampere-Brooklin-Sao-Paulo-SP-1400x1400-1722438997006.jpg'
])assert(gallery.includes('https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/351/Imagem/'+filename),'Missing approved asset');
assert.equal((gallery.match(/loading="lazy"/g)||[]).length,3,'noncritical neighborhood images must be lazy-loaded');
assert.equal((gallery.match(/width="1400" height="1400"/g)||[]).length,3,'media dimensions prevent CLS');
assert.equal((gallery.match(/alt="[^"]+"/g)||[]).length,3,'all neighborhood images require meaningful alt');
assert(gallery.includes('href="/regioes/brooklin/"'),'region link must be contextual');
assert(!gallery.includes('tegraincorporadora.com.br/_next/image'),'no corporate optimizer proxy dependency');
assert(html.includes('.ampere-neighborhood-grid{display:grid;grid-template-columns:1fr;gap:12px}'),'mobile gallery one column');
assert(html.includes('.ampere-neighborhood-grid{grid-template-columns:repeat(3,minmax(0,1fr))}'),'desktop three image grid');

console.log('AMPERE_SEO_COMMERCIAL_COPY_PASS');