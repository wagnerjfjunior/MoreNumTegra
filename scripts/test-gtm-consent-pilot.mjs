import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const path='src-greenn/blog/dicasedecor/iluminacao-apartamento-camadas-circuitos/index.html';
const html=fs.readFileSync(path,'utf8');
const script=html.match(/<script id="mnt-gtm-pilot">([\s\S]*?)<\/script>/)?.[1];
assert(script,'pilot missing');
assert.equal((html.match(/GTM-PGCR4R47/g)||[]).length,1);
assert(html.indexOf('mnt-gtm-pilot')<html.indexOf('measurement-editorial.js'));
function run(saved='',host='www.moretegra.com.br'){
 const requests=[],listeners={};const window={location:{hostname:host},localStorage:{getItem:()=>saved}};
 const document={head:{appendChild:j=>requests.push(j)},createElement:()=>({}),addEventListener:(n,cb)=>listeners[n]=cb};
 const context=vm.createContext({window,document,Date});
 vm.runInContext(script,context);
 const commands=()=>window.dataLayer.filter(x=>x[0]==='consent').map(x=>JSON.parse(JSON.stringify(Array.from(x))));
 const click=choice=>listeners.click({target:{closest:s=>s===('[data-consent-'+choice+']')}});
 return {window,requests,commands,click,context};
}
const a=run();assert.equal(a.requests.length,0);assert.deepEqual(a.commands()[0],['consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'}]);
a.click('reject');assert.equal(a.requests.length,0);
a.click('accept');assert.equal(a.requests.length,1);assert.equal(a.requests[0].async,true);assert.equal(a.requests[0].src,'https://www.googletagmanager.com/gtm.js?id=GTM-PGCR4R47');
assert.equal(a.commands().at(-1)[2].analytics_storage,'granted');assert.equal(a.commands().at(-1)[2].ad_storage,'denied');
a.click('accept');vm.runInContext(script,a.context);assert.equal(a.requests.length,1);
a.click('reject');assert.equal(a.commands().at(-1)[2].analytics_storage,'denied');
assert.equal(run('granted').requests.length,1);assert.equal(run('denied').requests.length,0);assert.equal(run('granted','localhost').requests.length,0);
console.log('PASS pilot bootstrap VM: default, reject, accept, duplicate, revoke command, persistence, host gate. Not a browser/GA4 test.');
