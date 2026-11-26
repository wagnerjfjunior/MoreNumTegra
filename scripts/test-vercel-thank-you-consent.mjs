
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source=fs.readFileSync('src-greenn/preview/thank-you-measurement.js','utf8');
const now=2_000_000;
function run({consent=false,marker,host='www.moretegra.com.br',path='/obrigado/'}={}){
 const storage=new Map(marker===undefined?[]:[['mnt.lead.pending.v2',JSON.stringify(marker)]]);
 const root={dataset:{},querySelector:()=>null};
 const w={location:{hostname:host,pathname:path},MNTConsent:{allowed:kind=>kind==='analytics'&&consent},
  sessionStorage:{getItem:k=>storage.get(k)??null,removeItem:k=>storage.delete(k)},
  crypto:{randomUUID:()=> 'event-uuid'},dataLayer:[]};
 class Clock extends Date{static now(){return now;}}
 const ctx=vm.createContext({window:w,document:{readyState:'complete',querySelector:()=>root},Date:Clock,Symbol,Uint8Array});
 vm.runInContext(source,ctx);vm.runInContext(source,ctx);
 return{root,events:w.dataLayer,storage};
}
const marker={version:2,submitted_at:now,form_id:'46',project_name:'Nova Vivere',offer_name:'Nova Vivere'};
assert.equal(run().events.length,0,'no marker means no conversion');
const noConsent=run({marker});
assert.equal(noConsent.root.dataset.leadState,'accepted','lead UI works after analytics rejection');
assert.equal(noConsent.events.length,0,'no GA4 without analytics consent');
assert.equal(noConsent.storage.size,0,'marker consumed without consent');
const accepted=run({marker,consent:true});
assert.equal(accepted.events.filter(e=>e.event==='mnt_lead_success').length,1,'unique conversion');
assert.equal(accepted.events[0].form_id,46);
assert.equal(accepted.root.dataset.leadState,'accepted');
assert(!JSON.stringify(accepted.events).includes('@'),'no PII');
assert.equal(run({marker:{...marker,form_id:'47'},consent:true}).events[0].form_id,47,'RJ Form47 preserved');
assert.equal(run({marker,consent:true,host:'localhost'}).events.length,0,'preview gated');
assert.equal(run({marker,consent:true,path:'/wrong/'}).events.length,0,'route gated');
assert.equal(run({marker:{...marker,submitted_at:now-900000},consent:true}).events.length,0,'stale marker denied');
console.log('PASS thank-you V3: 9 conversion, consent, CRM, SP/RJ, preview and PII invariants.');
