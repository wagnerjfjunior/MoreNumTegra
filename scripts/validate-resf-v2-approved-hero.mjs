#!/usr/bin/env node
// Read-only anti-regression gate for owner-approved HERO image URLs.
// Run after audit-resf-v2-media.mjs. Never change approved asset URLs automatically.
import { readFile } from 'node:fs/promises';
const [manifestPath, reportPath] = process.argv.slice(2);
if(!manifestPath || !reportPath) throw new Error('Usage: node validate-resf-v2-approved-hero.mjs <approved.json> <media-report.json>');
const approved = JSON.parse(await readFile(manifestPath,'utf8'));
const report = JSON.parse(await readFile(reportPath,'utf8'));
const rows = report.rows.filter(x => x.scope === 'IN_SCOPE');
if(approved.schema !== 'resf-v2-approved-hero-v1') throw new Error('Unexpected approved manifest schema');
const expected = new Map(approved.approved.map(x => [x.route,x.heroUrl]));
const actual = new Map(rows.map(x => [x.route,x.media.heroSrc]));
const errors = [];
if(approved.approved.length !== 36 || expected.size !== 36) errors.push('Expected 36 uniquely approved route entries');
if(rows.length !== 36 || actual.size !== 36) errors.push('Expected 36 uniquely audited active routes');
for(const [route,url] of expected) {
  if(!actual.has(route)) errors.push('APPROVED_ROUTE_NOT_AUDITED '+route);
  else if(actual.get(route) !== url) errors.push('HERO_MEDIA_REGRESSION '+route+' expected='+url+' actual='+actual.get(route));
}
for(const route of actual.keys()) if(!expected.has(route)) errors.push('UNAPPROVED_ROUTE '+route);
for(const route of approved.excludedRoutes ?? []) if(actual.has(route) || expected.has(route)) errors.push('EXCLUDED_ROUTE_INCLUDED '+route);
if(errors.length) {
  console.error('RESF HERO APPROVAL GATE FAIL ('+errors.length+')');
  errors.forEach(x=>console.error(x));
  process.exitCode=1;
} else console.log('RESF HERO APPROVAL GATE PASS: 36 approved page-to-hero URL mappings unchanged');
