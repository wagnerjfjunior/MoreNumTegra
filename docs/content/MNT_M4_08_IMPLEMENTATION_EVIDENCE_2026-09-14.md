# MNT-M4-08 — Prioritized Content / Architecture Implementation Evidence

Status: `IN_PROGRESS / AUTHORIZED`

Execution base: merged MNT-M4-07 main SHA `0df3e4e116bca19a843feae4c0416ecab68dda98`.

## Implemented scope

M4-08 implements the highest-confidence runtime surface that actually exists in the V1 architecture: the portfolio root `/` represented by `src-greenn/blocks/01-html-inicial.html` and consumed by both the Green modular composition and the Vercel Preview compositor.

The implementation makes the portfolio root directly answerable for:
- what More em um Tegra is and what it helps compare;
- how launch / construction / ready stages should be interpreted;
- that stage does not prove unit availability;
- how displayed values should be interpreted;
- that current stock, unit and commercial conditions require confirmation;
- how region filters are discovery paths rather than availability claims;
- how the user continues to catalog, decision guidance, negotiation and Form 46.

## Runtime changes

`src-greenn/blocks/01-html-inicial.html` was updated without introducing a new framework, dependency, CSS file or JavaScript dependency. Existing semantic section structure, single H1, catalog controls, CTA/Form 46 journey and visible FAQ were preserved.

No master, exact-project, stage or location URL was fabricated. The current V1 has no governed runtime implementation for those routes, so M4-08 records them as `NOT_IMPLEMENTED` rather than publishing dead or doorway links.

## M4-06 answerability evidence

Machine-readable evidence: `docs/content/data/MNT_M4_08_ANSWERABILITY_EVIDENCE.csv`.

Portfolio-root required families pass:
- `portfolio_purpose` — visible direct answer in `.mt-hero-lead`;
- `buying_stage_discovery` — visible answer and no-availability boundary in `.mt-moments`;
- `value_interpretation` — visible direct qualification in `#negociacao`;
- regional discovery context is visible in `.mt-seo` without creating a location-owner claim.

Other page types are explicitly `NOT_IMPLEMENTED` because their real routes do not exist in the current V1 runtime. This is not treated as a PASS for those page types.

## M4-07 link evidence

Machine-readable audit: `docs/linking/data/MNT_M4_08_LINK_AUDIT.csv`.

The portfolio root currently uses governed same-document anchors for catalog discovery, decision guidance, negotiation and the Form 46 position. No internal link targets master/exact/stage/location routes that do not yet exist. Therefore M4-08 creates no new orphan, dead route, modifier doorway or JS-filter-as-indexable-route condition.

When future governed routes are implemented, M4-07 requires a new crawl/link audit before those surfaces can be accepted.

## Executable verification

`node scripts/verify-m4-08-content.mjs` verifies:
- required portfolio-root answer passages exist;
- exactly one H1 remains;
- required governed anchors exist;
- no premature master/exact/stage/location href is published in the root block;
- the four visible FAQ items remain present.

## Factual boundary and known residual

New M4-08 copy does not publish project-level price, metragem, address or availability claims.

A pre-existing runtime dataset residual remains outside the new copy: the Mozae catalog source in `src-greenn/moretegra.js` still contains the historical `45m²` lower bound, while M3-04 governs `46m²` and `73m²` and explicitly marks runtime metragem correction required. M4-08 does not use that stale value as evidence and does not broaden it into semantic answer passages. This residual must be corrected/revalidated before integrated M4 factual closure; its existence is not silently treated as PASS.

## Boundaries preserved

M4-08 does not mutate:
- sitemap;
- redirects;
- DNS/domain routing;
- Search Console;
- GTM/GA4;
- Green Form 46 lifecycle;
- Ads/spend;
- FECH.AI/n8n/Make;
- Green commercial production.

M4-09 remains the separately gated technical SEO residual task. Green publication remains separately gated.
