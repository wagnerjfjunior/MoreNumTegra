#!/usr/bin/env node
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
const base='f191a0b70a0fbd3a9a2632fd98418489646120cd';
const html=readFileSync('src-greenn/preview/index.html','utf8');
const oldHtml=execFileSync('git',['show',base+':src-greenn/preview/index.html'],{encoding:'utf8'});
const before='<div class="mt-moment-grid" style="grid-template-columns:repeat(auto-fit,minmax(170px,1fr))">';
const after='<div class="mt-moment-grid">';
assert(oldHtml.includes(before)&&html.includes(after));
assert.equal(html,oldHtml.replace(before,after),'Home HTML outside moments grid mutated');
const css=readFileSync('src-greenn/moretegra.css','utf8');
const oldCss=execFileSync('git',['show',base+':src-greenn/moretegra.css'],{encoding:'utf8'});
const changes=[
 ['.mt-moment-grid{display:grid;gap:12px}', '.mt-moment-grid{display:grid;grid-template-columns:minmax(0,1fr);gap:12px}'],
 ['.mt-moment-grid a{padding:20px;border:1px solid #cfc9bb;border-radius:18px;background:rgba(255,255,255,.44);display:grid;grid-template-columns:auto 1fr;column-gap:14px;align-items:center}', '.mt-moment-grid a{min-width:0;padding:20px;border:1px solid #cfc9bb;border-radius:18px;background:rgba(255,255,255,.44);display:flex;flex-direction:column;align-items:flex-start;gap:8px;justify-content:flex-start}'],
 ['.mt-moment-grid a>span{grid-row:1/3;color:#8a6a10;font-size:12px;font-weight:850}', '.mt-moment-grid a>span{color:#8a6a10;font-size:12px;font-weight:850}'],
 ['.mt-moment-grid strong{font-size:17px}.mt-moment-grid small{color:var(--mt-muted)}', '.mt-moment-grid strong{font-size:17px;line-height:1.2;overflow-wrap:break-word}.mt-moment-grid small{color:var(--mt-muted);line-height:1.4}.mt-moment-grid .mt-moment-cta{margin-top:auto;padding-top:8px;max-width:100%;line-height:1.3;overflow-wrap:break-word}'],
 ['@media(min-width:760px){.mt-video-frame','@media(min-width:600px){.mt-moment-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}\n@media(min-width:760px){.mt-video-frame'],
 ['@media(min-width:980px){.mt-hero','@media(min-width:980px){.mt-moment-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.mt-moment-grid a{min-height:190px}.mt-seo{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}.mt-seo h2{font-size:clamp(2.3rem,3.15vw,3.1rem);overflow-wrap:break-word}.mt-hero']
];
let expected=oldCss;
for(const [from,to] of changes){assert(expected.includes(from));expected=expected.replace(from,to)}
assert.equal(css,expected,'CSS outside approved layout rules changed');
assert.equal((html.match(/class="mt-moment-grid"/g)||[]).length,1);
assert.equal((html.match(/data-set-status=/g)||[]).length,(oldHtml.match(/data-set-status=/g)||[]).length);
assert.equal((html.match(/data-focus-price/g)||[]).length,(oldHtml.match(/data-focus-price/g)||[]).length);
console.log('PASS: Home mobile and desktop cards/region layout scope only; all SEO, form, consent markup unchanged');
