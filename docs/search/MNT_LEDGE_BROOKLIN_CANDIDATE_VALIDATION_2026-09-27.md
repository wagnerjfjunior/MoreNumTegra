# Ledge Brooklin — Candidate Validation — 2026-09-27

Status: `PRE_MERGE_PARTIAL_PASS / PREVIEW_AND_PERFORMANCE_PENDING`

PR: `#273`
Branch: `feature/ledge-brooklin-resf-20260927`
Base resolved at implementation start: `8a334c2105f3728ed8f0abe1e81498b0a540ee6c`
Validated runtime/test head: `007365ac4916a4c00705e5a22313ad4197001d71`

## 1. Scope validated

Runtime:
- `src-greenn/empreendimentos/ledge-brooklin/index.html`
- `src-greenn/moretegra.js`
- `src-greenn/preview/index.html`
- `sitemap.xml`
- `vercel.json`

Test coverage:
- `scripts/validate-m5-06-cta-form-journey.mjs`
- `.github/diagnostics/m5-06-cta-form-smoke.mjs`
- `.github/workflows/m5-06-cta-form-journey.yml`

Fact authority:
- `docs/search/MNT_LEDGE_BROOKLIN_RESF_FACT_PACK_2026-09-27.md`

## 2. Exact-head static/search checks

At candidate head before the test-gate extension, the Ledge runtime passed:
- self canonical;
- index/follow/max-image-preview;
- exactly one H1;
- Form 46 + tenant 313 contract present;
- no project-page price claim;
- no Tegra corporate website URL in public runtime;
- exact street address absent from visible body before footer;
- exact address present in canonical commercial footer;
- Vercel route rewrite present;
- sitemap canonical URL present;
- Home catalogue detail link present;
- Home structured project ItemList entry present;
- visible FAQ + FAQPage present;
- hero high-priority initial HTML asset present;
- below-fold lazy media present.

## 3. Commercial page standard

Initial candidate failed once because the new footer paraphrased the canonical legal/commercial disclaimer.

Remediation:
- restored the exact canonical disclaimer paragraphs required by `scripts/validate-commercial-page-standard.mjs`.

Current result at runtime/test head:
- Commercial page standard validation run `#132` / workflow run `36367511992` = `SUCCESS`.

This failure is preserved as evidence; it was not bypassed.

## 4. Other repository gates

At runtime/test head:
- M4-05R metadata validation run `#163` = `SUCCESS`;
- Social sharing metadata validation run `#45` = `SUCCESS`;
- Favicon standard validation run `#128` = `SUCCESS`;
- MNT-PERF-03A Home video guard run `#11` = `SUCCESS`;
- MNT-PERF-03B Home late-GTM guard run `#6` = `SUCCESS`.

## 5. CTA / Form 46 cross-browser evidence

M5-06 CTA/Form journey run:
- workflow run: `36367512148`
- result: `SUCCESS`

The workflow was extended so Ledge is a first-class regression route.

Observed Ledge cases:
- Chromium: `ledge-conditions` PASS; selected `Condições e disponibilidade`;
- Chromium: `ledge-visit` PASS; selected `Agendar visita`;
- Firefox: `ledge-conditions` PASS;
- Firefox: `ledge-visit` PASS;
- WebKit: `ledge-conditions` PASS;
- WebKit: `ledge-visit` PASS.

No real Green lead is created by this smoke.

## 6. Preview state

`Vercel Preview = NOT_CREATED`.

Reason resolved from current canonical `vercel.json`:
- `git.deploymentEnabled["**"] = false`;
- only `main = true`.

Therefore branch pushes do not automatically create Vercel Preview in the current live configuration.

This validation does not reinterpret the missing Preview as PASS and does not change Vercel deployment policy under the Ledge page authorization.

## 7. Performance state

`Ledge numeric LCP/CLS battery = NOT_EXECUTED`.

Static performance posture is favorable:
- direct static project page;
- no DSG client-side composition bootstrap;
- hero URL present in initial HTML;
- hero high priority and non-lazy;
- no hero video;
- below-the-fold imagery lazy;
- GTM network bootstrap deferred until window load or first interaction.

However no numeric LCP claim is made without measurement.

## 8. Release verdict

`DO_NOT_MERGE_YET`.

Passed:
- factual/search contract;
- static SEO contract;
- commercial footer/address isolation;
- social metadata;
- favicon regression gate;
- Form 46 intent journey;
- Chromium/Firefox/WebKit CTA smoke;
- Home integration and route/sitemap wiring.

Pending:
- canonical Preview or separately authorized equivalent release exception;
- browser visual inspection of the actual deployment artifact;
- numeric mobile performance validation appropriate to the release gate.

Production was not mutated.
