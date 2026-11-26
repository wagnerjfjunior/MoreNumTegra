# MNT-PERF-V7 — responsive homepage assets

Owner authorized V7 and merge. Base 8d9f7d0df8a9367096ff3bf7904e6e4334994301 includes owner-uploaded WebP files. Verified Git blob IDs: hero e780b1723ab374a272eca5427143b209f9f667d6 (39950 bytes, 960x504), rua 9b9c7572980049458824e5c81e927ded4fabed30 (44626 bytes, 768x432), logo 1beab36fe174f00759155fa418461d676e7cf220 (4608 bytes, 288x162). Source originals unchanged in metadata and src fallback (logo uses local fallback). Responsive selection based on viewport and DPR; browser may select original at higher DPR. Hero responsive preload exactly matches srcset/sizes and retains direct child img for CSS/player. Rua original intrinsic dimensions corrected to 1920x1080 from source inspection. Existing /assets cache 604800 seconds; no Vercel config change. No consent, JS, CSS, CTA, SEO metadata, Greenn fragment or other route edits. Greenn fragment remains original until separately validated portable asset hosting. Baseline eight distinct owner PSI reports after #645: 99,96,96,99,99,99,99,98; median 99, SI median .9s, LCP median 2.1s, CLS0, other categories100 and agentic6/6. Target no regression and repeated measurements. Not CrUX. Browser-level functional acceptance and new PSI pending.

## Production receipt and owner acceptance — 2026-11-26

- PR #646 merged; head `2230f2d6184d9f6879c9c42eb45683969dacdf85`, 13 applicable checks SUCCESS, one unrelated Mermaid SKIPPED.
- Runtime SHA `14c5b2536eff26ed3a2aaa7d998ded7dd8326e58`, deployment `dpl_AauxUVtEYxmzx8gS3VBNFuU8WHAd`, READY, alias www.moretegra.com.br observed. Previous runtime #645 `892666b060c1b5771270249c740b734614e3db9a`, deployment `dpl_HmoyjgP8iHf7NFf6BPyKUBFDZPV7` (rollback reference, not instruction to roll back entire project).
- Owner approved consolidation after three reported PSI mobile runs on 26 Nov, BRT, Moto G Power, Lighthouse 13.6.0, HeadlessChromium 157.0.8103.38, slow 4G, initial navigation. Evidence is USER_REPORTED, not independently measured or CrUX. No field data reported.

| Time BRT | Score | FCP s | LCP s | TBT ms | CLS | SI s |
|---|---:|---:|---:|---:|---:|---:|
| 10:14:48 |98|1.0|1.4|10|0|4.0|
| 10:16:40 |100|0.8|1.4|0|0|0.8|
| 10:18:24 |100|0.8|1.4|0|0|2.3|
| Median |100|0.8|1.4|0|0|2.3|

All three: SEO/accessibility/best practices 100, agentic 6/6. LCP median 2.1 -> 1.4 s (-33.3%); PSI estimated image savings 252 -> 16 KiB; estimated cache opportunity 341 -> 6 KiB (not measured transfer savings). Candidate asset total 89184 bytes (~87.1 KiB); actual selected bytes depend on DPR/slot. SI median 0.9 -> 2.3 s, range 0.8–4.0 s: unresolved variability, not a proven improvement. CSS render-blocking opportunity 300–390 ms, JS minification ~3 KiB, one long task per V7 run, forced reflow flagged only in 10:16 report, DOM size remains diagnostic. No causal claim for SI/reflow. V7 is OWNER_APPROVED_REFERENCE / LAB_BATTERY_INCOMPLETE (3/5); two additional comparable runs and functional/visual QA pending, no field INP or CrUX certification. Do not reopen runtime solely to chase a score. See docs/performance/MNT_RESF_PERFORMANCE_SCALE_RUNBOOK_2026-11-26.md.
