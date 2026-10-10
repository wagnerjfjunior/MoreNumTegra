#!/usr/bin/env node
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
const BASE='9c8bdc74cb83dc9c9566f87d9288daf25f10c051';
const path='src-greenn/preview/runtime.css';
const old=execFileSync('git',['show',BASE+':'+path],{encoding:'utf8'});
const now=readFileSync(path,'utf8');
const from='  .mt-consent{grid-template-columns:1fr auto;align-items:center}';
const to='  .mt-consent{left:0;right:0;bottom:0;width:auto;max-width:none;margin:0;border-radius:0;padding:16px max(24px,env(safe-area-inset-right)) max(16px,env(safe-area-inset-bottom)) max(24px,env(safe-area-inset-left));grid-template-columns:minmax(0,1fr) auto;align-items:center}';
assert.equal(now,old.replace(from,to),'only intended desktop CSS consent override may change');
assert(old.includes(from),'baseline desktop selector missing');
assert(now.includes('@media(min-width:760px)'), 'desktop breakpoint must remain');
assert(now.includes('.mt-consent[hidden]{display:none!important}'),'hidden mechanism preserved');
assert(now.includes('.mt-consent button.is-primary{border-color:#EBB92E;background:#EBB92E;'),'accept CTA identity preserved');
for(const p of ['src-greenn/preview/index.html','src-greenn/preview/runtime.js','src-greenn/moretegra.css']){
 const previous=execFileSync('git',['show',BASE+':'+p],{encoding:'utf8'});
 assert.equal(readFileSync(p,'utf8'),previous,p+' cannot be changed by this isolated CSS PR');
}
console.log('PASS: desktop consent full-width override, mobile CSS and all consent JS unchanged');
