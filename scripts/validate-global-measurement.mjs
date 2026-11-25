import fs from 'node:fs';import assert from 'node:assert/strict';
const sitemap=fs.readFileSync('sitemap.xml','utf8'),v=JSON.parse(fs.readFileSync('vercel.json','utf8'));
const routes=[...sitemap.matchAll(/<loc>https:\/\/www\.moretegra\.com\.br([^<]*)<\/loc>/g)].map(m=>m[1]);
function verify(h,route){assert(h.includes('GTM-PGCR4R47'),route+' missing GTM');assert(h.includes('default_consent'),route+' missing consent');assert(h.indexOf('default_consent')<h.indexOf('GTM-PGCR4R47'),route+' consent order');if(route.startsWith('/blog/')){assert.equal((h.match(/src="\/src-greenn\/blog\/measurement-editorial\.js"/g)||[]).length,1,route+' dispatcher');assert.equal((h.match(/src="\/src-greenn\/preview\/runtime\.js"/g)||[]).length,1,route+' runtime');}}
for(const route of routes){const rewrite=v.rewrites.find(x=>x.source===route);assert(rewrite,route+' rewrite');verify(fs.readFileSync(rewrite.destination.slice(1),'utf8'),route)}
assert.throws(()=>verify('<html>GTM-PGCR4R47</html>','/negative/'));
assert.throws(()=>verify('default_consent GTM-PGCR4R47','/blog/negative/'));
console.log('PASS static GTM/consent coverage: '+routes.length+' sitemap routes; 2 negative tests. Runtime GTM/GA4 delivery requires separate QA.');
