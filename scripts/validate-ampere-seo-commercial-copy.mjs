import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync('src-greenn/empreendimentos/ampere-brooklin/index.html','utf8');
const hero=html.match(/<section class="hero"[\s\S]*?<\/section>/)?.[0];
assert(hero,'missing hero');
assert.equal((html.match(/<h1\b/g)||[]).length,1,'one H1 only');
assert(hero.includes('<h1 id="title" class="display">Ampère Brooklin</h1>'),'H1 unique project name');
assert(hero.includes('<h2 class="hero-lead">Apartamento no Brooklin com 262 m² privativos, 4 suítes e 4 vagas em torre única.</h2>'),'search-oriented H2');
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
console.log('AMPERE_SEO_COMMERCIAL_COPY_PASS');