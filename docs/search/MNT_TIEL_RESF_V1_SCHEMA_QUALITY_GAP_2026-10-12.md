# Tièl Vila Nova Conceição — RESF V1 semantic completeness test and Google evidence
Date: 2026-10-12
Status: CANDIDATE_IN_DRAFT_PR / NO_MERGE / NO_RELEASE
Main source baseline: aecff094bccd17ea5c2998934fbe0e1629277fe7
Route: /empreendimentos/tiel-vila-nova-conceicao/

## 1. Observed initial failure
User-reported Google Rich Results Test (12 Oct 2026 at 10:19:01): **one valid detected item, BreadcrumbList**. This is independently supplied Google output, not inferred from schema node count; report reference https://search.google.com/test/rich-results/result?id=JxDzBGw_kenuurTodOXvmg. The live Google tool could not be opened in the assistant's environment. User-reported Schema.org Validator: **2 items, 0 errors, 1 warning**, warning about brand. The current initial source indeed contains unsupported `ApartmentComplex.brand`.
Before fix: valid JSON parse with eight @graph nodes (WebSite, WebPage, BreadcrumbList, Brand, ApartmentComplex, FAQPage, 2 ImageObject); FAQ visual 6 question/answer pairs versus JSON-LD 4 with different wording, demonstrably failing strict source parity.
The earlier review wrongly treated optional schema type classes as evidence of acceptable commercial completeness. For this page, existing verified inline factual claims are sufficient to model the currently visible unit 914, reference price R$598500 and two published 19 m² illustration floorplans separately; their absence is a consumer RESF quality failure.

## 2. Candidate bounded correction
- JSON-LD only: existing entity and image URLs preserved; remove incompatible `ApartmentComplex.brand`.
- Six visible FAQs copied exactly to FAQPage in DOM order.
- Add governed entities Organization, ContactPoint, Person, RealEstateAgent, Service, Product (unit 914), Offer (BRL 598500.00), two FloorPlan (the two published illustrated 19 m² plans). Graph totals 17 entities; count is *page-specific outcome*, not a global quota.
- Represent 19 m² published decoration plans as distinct from 21 m² commercial unit. No `Product.availability`, unsupported reviews, ratings, return or shipping data, or new official unit inventory is invented.
- Project address/CEP, hero, approved primary/secondary image links and the Form 46/GTM/measurement/consent/copy/CTAs untouched. Agent address is São Paulo only; no unverified office/showroom location claim.
- Added Node test protects exact source HTML outside JSON-LD, checks unique IDs, referential integrity, product/offer/floorplan semantic relationships, FAQs, agent identity and baseline.
- Workflow runs test in PR with historical baseline checkout. This does not substitute actual Schema.org Validator or Google Rich Results Test evidence.

## 3. Correct RESF gate interpretation for exact-project pages
A) SYNTAX — graph parses. Necessary, not sufficient.
B) CONSISTENCY — correct schema properties; no warning sourced from invalid field placement; no ID collision or dangling links; visible claims aligned.
C) COMPLETENESS — require every commercially material entity for which governed **visible evidence exists**. For Tièl, project + professional service + unit/offer + two actual floorplan assets require modeling. Missing graph types are a conformance FAIL when corresponding verified data exists. For pages without a verified unit price or offer, do not manufacture Product/Offer merely to satisfy a count. Record a blocking data-quality gap instead.
D) ELIGIBILITY/GOOGLE — report Google-recognized rich result categories separately from Schema.org nodes and from commercial graph completeness; unsupported FAQ rich-result display is not evidence of invalid FAQPage. Rich result counts are not guaranteed by 17 JSON-LD nodes. External Google must be retested after publication, not marked PASS from source.
E) QUALITATIVE — buyer-first hero and copy, visual context of neighborhood, non-self-referential content, strong touch/mobile CTA, media/performance and lead funnel must pass separate gates.
F) STATUS — every facet PASS / FAIL / NEEDS_REVALIDATION / NOT_TESTED; no single overall green status from JSON parse or checks only.

## 4. Other Tièl RESF findings, not changed in this slice
- Editorial copy refers to 'a página', 'a página regional', 'galeria ampliada', and 'material oficial'; needs buyer-oriented revision with Product Authority review.
- Tièl includes a regional link in header, but not contextualized in location; locality section focuses on project amenities rather than neighborhood imagery/facts. No new unapproved neighborhood photos may be added.
- Four facts list 19m² and 21m² as neighboring cards; desktop/mobile choice and difference in actual product context require UX validation.
- Responsive hero uses WebP mobile source and high priority; below-fold images without inline dimensions need actual CLS/lazy/network review, not assumed poor CWV.
- Form 46 and measurement scripts exist, but no real submission, analytics events or mobile browser behavior verified in this slice.
- Commercial price/stage/unit inventory freshness is not independently reverified outside visible source; Product Authority must reconfirm before a copy/price release.

## 5. Release gate
Candidate PR only. No merge and no production publish until: exact-head tests/CI, reconciliation against PRs #364/#366/#368/#376 overlaps, factual review, mobile Preview/local acceptance as appropriate, and separate Product Authority merge authorization. Google Rich Results/Schema.org 0 errors/warnings and detected-category outcomes are to be observed and recorded only after actual external test. Do not promise Google eligibility, indexation, six enhancements or visibility.
