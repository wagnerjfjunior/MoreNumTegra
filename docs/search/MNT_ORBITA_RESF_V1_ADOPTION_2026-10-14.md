# Universo Tatuapé Órbita — adoção RESF V1 (2026-10-14)

Route: `/empreendimentos/universo-tatuape-orbita/`
Scope: bounded existing-page audit and correction; no merge/release authorization.
Contract: `docs/frameworks/resf/v1/EXACT_PROJECT_PAGE_BUILD_STANDARD_V1_2026-10-11.md`.

## Observed baseline in GitHub main

- Existing route, project-specific source HTML and linked Tatuapé region.
- Canonical www, indexable metadata, OG/Twitter, initial HTML hero image and mobile derivative.
- Project graph already includes WebPage, ApartmentComplex, named agent, contact, service, Product, Offer, FloorPlan, images and six FAQ pairs.
- Commercial example in schema: AP0609, 69 m², R$ 611.685. This is a snapshot, NOT proof of availability/validity today.
- Form 46 and measurement scripts already wired. Live lead success was not retested.
- Duplicate hero-meta repeated all four facts; RESF V1 explicitly forbids it.
- Existing four facts: 38–43 m² / 1 dorm; 51–69 m² / 2–3 dorms; 28–39 m² / commercial rooms; Tatuapé / SP. Does NOT satisfy RESF required four-position ordering.
- Parking information missing in visible HTML: `FACTS_DATA_GAP`, `BLOCKED_BY_PRODUCT_TRUTH`.
- Stage claim in hero: pronto para morar / últimas unidades. Revalidate current commercial status before modifying pricing, copy or stage.
- A project-specific schema validator currently uses a frozen HTML baseline; bounded adaptation preserves its commercial invariant and verifies removal of duplicate hero-meta.

## Candidate patch

Remove only hero-meta visible duplication and its unused CSS. Preserve all facts, structured data, media, form, WhatsApp and conversion instrumentation. Adjust project-specific frozen-source validator only for this exact deletion; no commercial truth relaxation.

## Outstanding RESF acceptance gates

1. Verify actual parking configurations by residential typology and eligibility of office typology; register verified source. Do NOT infer from other Tatuapé projects.
2. Rebuild single four-slot facts band: (1) residential area/configuration; (2) sourced parking; (3) verified distinction + Tatuapé; (4) stage. Commercial rooms belong in separate typology area rather than replacing parking.
3. Evaluate hero and navigation intent: region link is currently in the header; contract prioritizes conversion and contextual region link in location block.
4. Audit region imagery rights, useful neighborhood copy, mobile nav, gallery, plans, FAQ true parity, accurate alt and performance.
5. Confirm Product/Offer price reference validity and project address vs showroom with current Product Authority.
6. Verify validator locally and CI exact branch head; mobile/desktop Live Sync, Form46 no-send test, schema external validation, and runtime rollout only after separate approval.

## Release

NOT APPROVED FOR MERGE / PRODUCTION. No preview or QA PASS claimed. Rollback is restoration of the main version before merge.
