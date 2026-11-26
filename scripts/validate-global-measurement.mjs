import fs from 'node:fs';
import assert from 'node:assert/strict';
const sitemap=fs.readFileSync('sitemap.xml','utf8'),v=JSON.parse(fs.readFileSync('vercel.json','utf8'));
const routes=[...sitemap.matchAll(/<loc>https:\/\/www\.moretegra\.com\.br([^<]*)<\/loc>/g)].map(m=>m[1]);
const manager='/src-greenn/preview/consent-v3.js?v=20261125-final';
function verify(h,route){
 assert.equal(h.split(manager).length-1,1,route+' consent manager must appear once');
 assert(h.indexOf(manager)<h.indexOf('</head>'),route+' Consent Manager must be loaded in HEAD');
 assert(!h.includes('googletagmanager.com/gtm.js') && !h.includes('googletagmanager.com/ns.html') && !/<script[^>]*>[^<]*(?:gtm\.start|default_consent)/i.test(h),route+' legacy GTM/consent bootstrap');
 if(route.startsWith('/blog/')&&h.includes('measurement-editorial.js')) assert.equal((h.match(/\/src-greenn\/blog\/measurement-editorial\.js\?v=20261125-v3/g)||[]).length,1,route+' dispatcher');
}
for(const route of routes){
 const rewrite=v.rewrites.find(x=>x.source===route);
 assert(rewrite,route+' rewrite');
 verify(fs.readFileSync(rewrite.destination.slice(1),'utf8'),route);
}
assert.throws(()=>verify('<html><head></head><body></body></html>','/negative/missing/'));
assert.throws(()=>verify('<head>'+manager+manager+'</head>','/negative/duplicate/'));
assert.throws(()=>verify('<head>'+manager+'</head><script>gtm.start</script>','/negative/legacy/'));
assert.throws(()=>verify('<body>'+manager+'</body>','/negative/late/'));
console.log('PASS V3 static coverage: '+routes.length+' sitemap routes; 4 negative tests.');
