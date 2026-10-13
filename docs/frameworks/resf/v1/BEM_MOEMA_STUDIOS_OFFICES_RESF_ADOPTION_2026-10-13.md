# Bem Moema Studios & Offices — RESF V1 bounded adoption (2026-10-13)

Status: `DRAFT_FOR_PRODUCT_AUTHORITY_QA / NO_MERGE_AUTHORIZED`

## Scope
Route: `/empreendimentos/bem-moema-studios-offices/`. This is a distinct mixed-use project owner, **not** the residential `/empreendimentos/bem-moema/`.
Baseline: canonical GitHub main file `src-greenn/empreendimentos/bem-moema-studios-offices/index.html` before this PR, blob `b96572889014e3d4e3031813aeeea22dea090961`.
Standard: `docs/frameworks/resf/v1/EXACT_PROJECT_PAGE_BUILD_STANDARD_V1_2026-10-11.md` including §10.
User evidence 2026-10-13: GSC URL Inspection indicates URL indexed, HTTPS served; Rich Results Test detects one valid current-location-indicator result; Schema.org parser displays 2 items (WebPage + FAQPage), 0 errors and **1 warning on WebPage not expanded**, cause unknown. Do not assert full semantic coverage from Google count.

## Preserved factual and technical contracts
- Product: Bem Moema Studios & Offices, delivered; studios 26–29 m², apartments 36 m², office units 26–36 m².
- Governed commercial reference displayed prior: Studio 1702, 28 m², BRL 509600, BRL 18200/m². This is one referenced unit, not a generic floor plan or currently guaranteed stock.
- Official floor plans: decorated studio 26 m²; decorated office 26 m²; ground-floor implantation. Plans are illustrative and distinct from Studio 1702 of 28 m².
- Keep image URLs, gallery interactions, gallery media, project hero, FAQ visible questions/answers unchanged.
- Keep native Green Sales Form46 HTML, inputs, hidden tenant 313 / form 46 / title, measurement-core/form runtime, WhatsApp recipient and CTA destinations unchanged.
- No new Google tag, Google Ads/Meta integration, tracker, hidden lead or backend.

## Implemented in bounded PR
- Buyer-first H1 and lead for distinct studios, apartments and offices; richer project differentiation and buyer-decision text.
- Four canonical facts positions with area+typology; second Vagas explicitly UNKNOWN/sob consulta, neighborhood+mixed use; delivered stage. Legacy hero-meta CSS retired and 2x2 mobile facts kept.
- Move external Moema link from header to contextual location prose; header CTA now drives to consultation form.
- Locality editorial expanded, map remains context only, no inferred commute time or address claim.
- Gallery label and caption distinguish official perspectives/illustration, preserve scene sources; floor plan text explicitly distinguishes Studio 1702 from illustrative 26m² plans.
- Readable H1/H2 and mobile typography; accessible/consistent WhatsApp badge.
- JSON-LD expanded from 8 to 17 entities: add organization/contact/agent/service, Studio 1702 Product+Offer, two verified 26m² FloorPlans, with project links. No offer availability, shipping/ratings. Avoid invalid ApartmentComplex.brand.
- SEO description and WebPage.description synchronized. FAQs remain parity-stable.

## Open Product Authority gates
1. `FACTS_DATA_GAP`: parking count/availability not verified for this offer. Second fact displays explicitly "Sob consulta". Formal approval of this exception or verified project-specific source is required before declaring fully compliant.
2. `NEIGHBORHOOD_MEDIA_GAP`: no approved, verifiable street/neighborhood photo URLs identified in canonical sources. Do not insert Wikimedia links or unrelated project photos as "Moema". Product Authority may supply authorized media; three photographs are a reference precedent, not a hard quota.
3. `SCHEMA_WARNING_OPEN`: Schema.org screenshot shows one WebPage warning. Need expand warning details on branch/production; no blanket PASS claim. New schema must be tested in validator, Google Rich Results, and visible FAQ parity before release.
4. `QA_REQUIRED`: mobile/desktop SFJM Local Live Sync, gallery/touch/image crop, all four facts, CTA/WhatsApp, lead without duplicate submission; independent public smoke and Lighthouse when possible.
5. `NOT_PROVEN_STOCK`: reference price/unit is prior governed copy. Revalidate current commercial offer/stock at release if changed.

## Keyword Planner alignment
Google Ads Planner downloaded 2026-10-13 (period Sep 2025–Aug 2026) includes `tegra moema` ~50 searches/mo (Ads competition index 69), `apartamento moema` ~5000 (73), `apartamento a venda moema` ~500 (76), `empreendimentos moema` ~50 (100). These values are historical approximate buckets, not SEO difficulty, exact target traffic, or a mandate to target broad/generic demand.
Exact project intent stays on Studios & Offices; generic Moema demand stays on `/regioes/moema/`. Do not cannibalize residential `/empreendimentos/bem-moema/`, and do not call delivered project a new launch.
