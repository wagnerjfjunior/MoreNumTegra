#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const read=p=>readFile(p,'utf8');
const [de,dx,ce,cx]=await Promise.all([
 read('src-greenn/empreendimentos/dsg-itaim/index.html'),
 read('experiments/dsg-itaim-editorial-v3/index.html'),
 read('src-greenn/empreendimentos/capiitolo-piero-lissoni/index.html'),
 read('experiments/capiitolo-editorial-v3/index.html')
]);
const desk='https://s3-gdigital.s3.amazonaws.com/gdigital/313/More-Tegra-Foto-DSG-Itaim-Rua-Joaquim-Floriano-Vista-area-da-Fachada-e-Avenida.webp';
const mob='https://s3-gdigital.s3.amazonaws.com/gdigital/313/MoreTegra-Torre-Fechada-DSG-Itaim-9x16.webp';
const cap='https://s3-gdigital.s3.amazonaws.com/gdigital/313/Fachada_Capitolo.webp';
for(const [s,u,n] of [[de,desk,'DSG entry'],[dx,desk,'DSG experiment'],[ce,cap,'Cap entry'],[cx,cap,'Cap experiment']]){
 assert(s.includes('property="og:image" content="'+u+'"'),n+' OG mismatch');
 assert(s.includes('name="twitter:image" content="'+u+'"'),n+' Twitter mismatch');
}
assert(dx.includes('<picture class="hero-picture">'));
assert(dx.includes('media="(max-width:719px)" type="image/webp" srcset="'+mob+'"'));
assert(dx.includes('<img class="hero-poster" src="'+desk+'"'));
assert(cx.includes('<img class="hero-poster" src="'+cap+'"'));
assert(cx.includes('data-video-src="https://www.youtube-nocookie.com/embed/iq50ei83B8U'));
assert(cx.includes('requestIdleCallback(loadVideo,{timeout:1800})'));
assert(cx.includes('matchMedia("(max-width: 700px)").matches'));
assert(cx.includes('matchMedia("(prefers-reduced-motion: reduce)").matches'));
for(const [s,u,n] of [[de,desk,'DSG'],[ce,cap,'Cap']]){
 const raw=s.match(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/)?.[1];
 assert(raw,n+' JSON-LD absent');assert(JSON.stringify(JSON.parse(raw)).includes(u),n+' schema mismatch');
}
assert(de.includes('formulario')&&ce.includes('formulario'));
console.log('PASS: approved hero/mobile/social/schema and CAPIITOLO deferred-video safeguards');
