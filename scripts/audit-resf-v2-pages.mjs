#!/usr/bin/env node
// RESF-V2-01: read-only, zero-dependency static inventory.
// This audit does not assert production status, SEO rank, Form46 success or schema eligibility.
import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('src-greenn');
const output = process.argv[2] ? path.resolve(process.argv[2]) : null;
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(p));
    else if (entry.isFile() && /\.html$/i.test(entry.name)) files.push(p);
  }
  return files;
}
const allMatches = (s, regex) => [...s.matchAll(regex)].map(x => x[1] ?? x[0]);
const attr = (s, name) => new RegExp('\\b' + name + '=["\\\']([^"\\\']*)', 'i').exec(s)?.[1] ?? null;
const meta = (s, name, key = 'name') => {
  const tags = allMatches(s, /<meta\b[^>]*>/gi);
  const node = tags.find(t => attr(t, key)?.toLowerCase() === name.toLowerCase());
  return node ? attr(node, 'content') : null;
};
const strip = html => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ')
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ')
  .replace(/<!--([\s\S]*?)-->/g,' ')
  .replace(/<[^>]+>/g,' ')
  .replace(/&[a-z]+;|&#\d+;/gi,' ').replace(/\s+/g,' ').trim();
const records = [];
for (const file of (await walk(root)).sort()) {
  const html = await readFile(file, 'utf8');
  const rel = path.relative(root, file).split(path.sep).join('/');
  const title = /<title\b[^>]*>([\s\S]*?)<\/title>/i.exec(html)?.[1]?.trim() ?? null;
  const canonical = /<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/i.exec(html)?.[0];
  const jsonBlocks = allMatches(html, /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
  const schema = jsonBlocks.map(raw => { try { return { valid:true, value:JSON.parse(raw) }; } catch { return {valid:false}; } });
  const images = allMatches(html, /<img\b[^>]*>/gi);
  const forms = allMatches(html, /<form\b[^>]*>/gi);
  const text = strip(/<body\b[^>]*>([\s\S]*?)<\/body>/i.exec(html)?.[1] ?? html);
  records.push({
    source: rel, estimatedRoute: rel.endsWith('/index.html') ? '/' + rel.slice(0,-10) : '/' + rel,
    pageType: rel.startsWith('empreendimentos/') ? 'exact-project' : rel.startsWith('regioes/') ? 'region' : rel === 'moretegra.html' || rel === 'index.html' ? 'home-candidate' : 'other',
    metadata: {title, description:meta(html,'description'), robots:meta(html,'robots'), canonical:canonical ? attr(canonical,'href') : null,
      ogImage:meta(html,'og:image','property'), twitterImage:meta(html,'twitter:image')},
    layout: {h1Count:allMatches(html,/<h1\b[^>]*>/gi).length,
      heroClassMention:/class=["'][^"']*\b(?:hero|mt-hero)\b/i.test(html),
      factsClassMention:/class=["'][^"']*\b(?:facts|mt-facts)\b/i.test(html)},
    conversion: {formCount:forms.length, hasFormId46Marker:/\bform_id\b|\bformId\b|form[_-]?46/i.test(html),
      hasFormContext:/data-moretegra-interest|data-mnt-page-identity/i.test(html),
      hasFormAnchor:/id=["']formulario["']/i.test(html)},
    media: {imageTagCount:images.length, missingAltAttribute:images.filter(img=>attr(img,'alt')===null).length,
      primaryImageReferences:allMatches(html, /"primaryImageOfPage"\s*:\s*(\{[^}]*\}|"[^"]*")/g).length},
    schema: {blockCount:schema.length, invalidJsonBlocks:schema.filter(s=>!s.valid).length},
    editorial: {approximateVisibleWords: text ? text.split(/\s+/).length : 0},
    auditScope: 'SOURCE_ONLY_NOT_LIVE'
  });
}
const count = (name, predicate) => [name, records.filter(predicate).length];
const totals = Object.fromEntries([
  ['htmlFiles', records.length], count('withoutTitle', x=>!x.metadata.title),count('withoutDescription',x=>!x.metadata.description),
  count('withoutCanonical',x=>!x.metadata.canonical),count('withoutOgImage',x=>!x.metadata.ogImage),
  count('withoutTwitterImage',x=>!x.metadata.twitterImage),count('withoutSingleH1',x=>x.layout.h1Count!==1),
  count('withoutHeroClass',x=>!x.layout.heroClassMention),count('withoutFactsClass',x=>!x.layout.factsClassMention),
  count('withoutFormAnchor',x=>!x.conversion.hasFormAnchor),count('withInvalidJsonLd',x=>x.schema.invalidJsonBlocks>0)
]);
// Explicitly distinguish commercial source candidates from template/preview/support files.
const groups = {
  exactProject: records.filter(x=>x.pageType==='exact-project'),
  region: records.filter(x=>x.pageType==='region'),
  other: records.filter(x=>!['exact-project','region'].includes(x.pageType))
};
const findings = records.map(x=>{
  const commercialCandidate = ['exact-project','region'].includes(x.pageType);
  const review = [];
  if (!commercialCandidate) return {source:x.source,estimatedRoute:x.estimatedRoute,pageType:x.pageType,classification:'SUPPORT_OR_SPECIAL_REVIEW',signals:[],notes:'Not assumed to be a public commercial route'};
  if (!x.metadata.title) review.push('TITLE_MISSING_SOURCE');
  if (!x.metadata.description) review.push('DESCRIPTION_MISSING_SOURCE');
  if (!x.metadata.canonical) review.push('CANONICAL_MISSING_SOURCE');
  if (!x.metadata.ogImage) review.push('OG_IMAGE_MISSING_SOURCE');
  if (!x.metadata.twitterImage) review.push('TWITTER_IMAGE_MISSING_SOURCE');
  if (x.layout.h1Count!==1) review.push('H1_COUNT_REVIEW');
  if (!x.layout.heroClassMention) review.push('HERO_VARIANT_REVIEW');
  if (x.pageType==='exact-project' && !x.layout.factsClassMention) review.push('FACTS_VARIANT_REVIEW');
  if (!x.conversion.hasFormAnchor) review.push('FORM_JOURNEY_REVIEW');
  if (x.schema.invalidJsonBlocks) review.push('JSON_LD_PARSE_ERROR');
  if (x.media.missingAltAttribute) review.push('IMG_ALT_ATTRIBUTE_REVIEW');
  if (x.metadata.ogImage && x.metadata.twitterImage && x.metadata.ogImage!==x.metadata.twitterImage) review.push('OG_TWITTER_IMAGE_DIFFERENT_REVIEW');
  return {source:x.source,estimatedRoute:x.estimatedRoute,pageType:x.pageType,
    classification:review.length?'CANDIDATE_REVIEW':'STATIC_BASELINE_PRESENT',
    signals:review,notes:'Source-only heuristics; compare live route, contracts and approved exceptions before defect classification'};
});
const metrics={commercialCandidates:groups.exactProject.length+groups.region.length,
  exactProjects:groups.exactProject.length,regions:groups.region.length,supportOrSpecial:groups.other.length,
  commercialWithReview:findings.filter(x=>x.classification==='CANDIDATE_REVIEW').length,
  commercialStaticPresent:findings.filter(x=>x.classification==='STATIC_BASELINE_PRESENT').length};
const report = {schema:'resf-v2-source-inventory-v2', generatedAt:new Date().toISOString(), sourceRoot:'src-greenn', totals, metrics, findings, records};
if (output) { await mkdir(path.dirname(output), {recursive:true}); await writeFile(output, JSON.stringify(report,null,2)+'\n'); }
else process.stdout.write(JSON.stringify(report,null,2)+'\n');

const markdownOutput = process.argv[3] ? path.resolve(process.argv[3]) : null;
if (markdownOutput) {
  const lines=['# RESF V2 — Source conformity matrix','','Generated from HTML source only. Not a live SEO or functional validation.','',
    '| Metric | Value |','|---|---:|',
    ...Object.entries(metrics).map(([k,v])=>'| '+k+' | '+v+' |'),'',
    '| Source | Type | Classification | Review signals |','|---|---|---|---|',
    ...findings.map(f=>'| '+f.source+' | '+f.pageType+' | '+f.classification+' | '+f.signals.join(', ')+' |'),
    '', '## Interpretation', '',
    '- STATIC_BASELINE_PRESENT is not a production PASS.',
    '- Review signals are not proven defects; styles/markup and exceptions may be approved.',
    '- Support/preview/thank-you pages are not automatically indexable commercial pages.',
    '- Full media ownership (hero, OG, Twitter, JSON-LD, Person) and live canonical verification remain separate gates.',
    '- Approximate word counts are descriptive, never an SEO minimum.',''];
  await mkdir(path.dirname(markdownOutput), {recursive:true});
  await writeFile(markdownOutput, lines.join('\n')+'\n');
}
