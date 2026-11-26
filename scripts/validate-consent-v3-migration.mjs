import {readdirSync,readFileSync} from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import {verifiedPreV3} from "./lib/consent-v3-migration.mjs";
const all=[];
function walk(d){for(const x of readdirSync(d,{withFileTypes:true})){const p=path.join(d,x.name);if(x.isDirectory())walk(p);else if(p.endsWith(".html"))all.push(p);}}
walk("src-greenn");
const docs=all.filter(p=>/<head\b[^>]*>[\s\S]*?<\/head>/i.test(readFileSync(p,"utf8")));
assert.equal(docs.length,157,"Expected 157 full HTML documents");
for(const p of docs)verifiedPreV3(p);
console.log("PASS V3 exact migration and protected commercial/SEO content for "+docs.length+" full HTML documents");
