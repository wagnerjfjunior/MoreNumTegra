# RESF — Exact Project Page Build Standard V1
Date: 2026-10-11
Repository: `wagnerjfjunior/MoreNumTegra`
Status: PROPOSED_CANONICAL / DRAFT_PR; becomes consumer canonical only after review, approval and merge to main.
Scope: exact-project pages under `/empreendimentos/<slug>/`.
Runtime owner: MoreNumTegra main. This document does not supersede product facts, the functional/technical baselines, existing ADRs, the adopted RESF provider, or individual Product Authority gates.

## 1. Purpose and precedence
A reusable build/release contract, not a request to rewrite all published pages. Use the approved Reserva/Lapa editorial rhythm, the Ária-inspired form/footer treatment where suitable, and the bounded Ampère Brooklin release as reference implementations, without copying their project-specific facts. In a conflict, resolve live main, current product truth, lifecycle, technical baseline, ADRs, blocked actions and the applicable specialized standards. Do not treat a reference implementation as permission to transplant price, schema entity, address, campaign or image to another project.

## 2. Project intake gate (must be complete before code)
Record: route and exact-project owner; current lifecycle/stage; governed official name; exact location/address/CEP and whether address is project entrance or sales showroom; areas, bedrooms/suites, parking, features, plans, developer, commercial unit/price and price-validity where applicable; photography authorization, source URLs and attribution; professional claims; specific CTA/WhatsApp destination. Every commercial attribute must have a source and status VERIFIED / UNKNOWN / NEEDS_REVALIDATION. UNKNOWN facts remain absent, not inferred. Confirm region-page and master-development ownership. No unauthorized region, master or promotional doorway routes.

## 3. Visual and content architecture
A. Semantic header/navigation and resilient mobile controls; official Tegra identity, canonical yellow #EBB92E and approved logo, not a generic T.
B. Hero with single H1 identifying the project; clear buyer-oriented positioning, differentiated H2/lead, high-visibility consultation CTA, and image visible in initial HTML. Avoid robotic repetition of project/neighborhood and avoid technical facts duplicated needlessly between hero and facts.
C. Four-card facts band where verified data supports four meaningful facts: area/typology, parking, location plus distinction, and current stage. Never fill with invented data. Mobile two-column, desktop four-column is a proven reference, not a universal forced layout.
D. Direct commercial proposition, project differentiators, genuine amenities and architectural signatures when substantiated; no self-referential statements about 'the page' or its SEO.
E. Gallery with useful variety, captions/alt by actual scene, controlled responsive sources, no near-identical repetition; interactive galleries accessible by touch and keyboard.
F. Plan/typology decision area, with governed floorplan labels and sizes; distinguish all available/illustrative variants from claimed unit availability.
G. Contextual neighborhood/location editorial block with genuine images when available, internal link to the published regional owner, and a factual map or consultation CTA. Do not infer exact travel time or street number. Do not put an outgoing regional link ahead of the commercial hero CTA merely for SEO.
H. FAQ based on questions buyers actually ask, including stage, units, differentiators, location, visits and commercial caveats. Aim for useful coverage; number is contingent on verified facts. Reserva 10 and Ampère 12 are page evidence, not mandatory quotas.
I. Conversion ending: visit/conditions, agent identity as approved, accessible Form 46 card and canonical legal footer. Residential/commercial lifecycle distinctions must be maintained; resale copy must not be inherited by active Tegra inventory.
Mobile must preserve readable copy, accessible focus, touch-friendly actions, balanced imagery and premium visual hierarchy. No important interaction may depend exclusively on hover.

## 4. Search and structured data
Mandatory review: title, useful description, self-canonical to the real published www.moretegra.com.br URL, robots, Open Graph/Twitter, one H1, coherent H2/H3, semantic visible copy, verifiable internal links, responsive alt, real footer identity and sitemap membership only for published indexable URLs.
JSON-LD is built from governed facts and visible content; use appropriate WebSite/WebPage/BreadcrumbList and project-specific entities only where supported. `ApartmentComplex`, `Product`, `Offer`, `FloorPlan`, `Organization`, `Person`, `RealEstateAgent`, `Service`, `ImageObject` are conditional, not universal quotas. Product/Offer values must match actual eligible governed offer; never fake availability, ratings, reviews, return policy or shipping data. Avoid incompatible schema properties such as ApartmentComplex.brand when contradicted by existing validators.
If FAQPage exists, visible question and answer texts match JSON-LD one-to-one. The hero/primary representative image must be owned correctly by WebPage/ImageObject; secondary image is a separate fact and may not be fabricated or copied from the gallery index. Avoid agent portrait replacing project hero in page-owner image metadata. Exact street number placement follows the current governed footer/address standard, subject to explicit, documented exceptions. Geo and CEP require independent exact-project evidence, not a showroom assumption.
Do not claim Google indexing, rich results, rank or AI visibility from static validation alone.

## 5. Conversion / measurement invariants
Preserve the verified Green Sales/GDigital contract: `tenant_id=313`, `form_id=46`, `title=MoreEmUmTegra`; the scoped `#moretegra-lead-form` / `data-moretegra-lead-form` selectors and the existing native form script. Keep validation for name/email/phone, loading state, prevention of duplicate submission, success/application/network-error handling and private user data out of analytics. Do not create backend or send real leads from Preview as part of routine QA.
Retain `measurement-core.js`, `measurement-form.js`, consent default denied and approved `mnt_*` taxonomy. Conversion `mnt_lead_success` only after actual success; do not count form attempt, CTA or direct /obrigado/ visit as success. Preserve WhatsApp and CTA intent semantics, approved CRECI/legal footer data and responsive accessibility. No new Meta, Google Ads, FECH.AI, Make or n8n integration without a separate decision.

## 6. Performance and media
Apply `docs/performance/RESPONSIVE_MEDIA_DELIVERY_STANDARD_V1.md`. Hero discoverable in initial HTML, eager/high-priority, no JavaScript-only URL, no hero lazy-load; use correctly sized mobile derivatives without upscale when applicable. Reserve intrinsic dimensions/aspect to minimize CLS; lazy-load below-the-fold gallery and contextual neighborhood images, with truthful alt and scene captions. Heavy media remains on governed external origins; remove provider image-optimizer proxies when a verified direct asset can safely be used. Use fallback for noncritical videos/media. Targets: mobile LCP <= 2.5 s, INP <= 200 ms, CLS <= 0.1; these are targets, not results. Five-run comparable mobile Lighthouse battery before claiming performance improvement, and never substitute TBT for field INP.

## 7. Per-page build and release checklist
1. Resolve live main SHA, pending PR/branch overlaps, Vercel production SHA and SFJM CURRENT/STATUS/NEXT_SAFE_ACTION/BLOCKED_ACTIONS.
2. Verify Product Authority scope, approved product-fact pack, imagery, lifecycle, price/offer and region/master ownership.
3. Freeze before-state source, screenshots, URL, tracking/form/schema contract, and rollback SHA.
4. Build a bounded branch against current main; share material commercial copy for review before approving its publication.
5. Run page-specific structural/SEO/facts/schema/FAQ/media/Form46/tracking/accessibility validators on exact head; distinguish newly introduced failures from pre-existing validator debt.
6. Review mobile and desktop Preview or approved local live sync, including touch controls, form error/validation states, image loading/crop, gallery and CTA.
7. Require approved exact head, CI/review and explicit merge/release authorization. Never interpret a draft PR as permission to merge.
8. Verify production deployment READY and exact Git SHA, then HTTP status/canonical/robots/sitemap, imagery, schema parsing, responsive UX and conversion wiring on the canonical host without generating live leads unless approved.
9. Record external Rich Results/GSC results separately when observed; cannot infer them from local JSON parse.
10. Update governance handoff, known residuals, rollback, and next safe action. One page release never authorizes the next.

## 8. Reference and variation matrix
- Reserva Caminhos da Lapa: accepted editorial and Lapa/Caminhos contextual reference; resale/secondary lifecycle language is NOT universal. Source `docs/search/MNT_LAPA_EXACT_PROJECT_PAGE_STANDARD_V1_2026-10-03.md`.
- Garden Design/Nova Vivere: Lapa adaptations, keep active commercial truth and own fact packs. Do not copy Reserva resale wording.
- Ária Higienópolis: precedent for softer form and footer styling, not for prices/address or media.
- Ampère Brooklin: PR #388 form/footer/facts and PR #389 buyer-first SEO copy, 12 visible/schema-parity FAQs and three lazy-loaded neighborhood images, contextual Brooklin regional link, 18-node approved project graph. These are Ampère-specific results, not universal numeric quotas. Release SHA `b6497954e45d77cf37dd639dbea3c18bd29a4040`.
- DSG Itaim/CAPIITOLO: art-directed premium/video exceptions remain scoped to their own accepted decisions and may not be overwritten by generic template mass migration.
- RESF V2 draft modularization, search-image changes and address batches remain separately gated. This V1 standard does not merge or rebase them.

## 9. Criteria to promote this document
Product Authority reviews the specification and residuals; documentation PR passes its relevant checks and is explicitly merged. Document version then becomes `CANONICAL_FOR_NEW_EXACT_PROJECT_BUILDS`. Existing published pages are grandfathered; deviations must be audited and prioritized, not overwritten en masse. Publishing this standard does not assert Ampère's post-release mobile, form or Google results without actual smoke evidence.
