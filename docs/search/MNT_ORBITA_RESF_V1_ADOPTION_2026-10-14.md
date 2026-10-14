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

## Memorial source reconciliation (2026-10-14)

The repository already contains three independent source PDFs, all inventoried as `NATIVE_TEXT_OK` in `docs/product/data/MNT_MEMORIAL_SOURCE_INVENTORY_2026-09-14.csv`:

- `Tegra/Memoriais_Descritivos/Universo Tatuapé Órbita-Memorial Descritivo - Residencial.pdf` — SHA-256 `5de26eeeb56e23aa98f90abf28a3f8bbe82655a71d20869c3f59b7c9206f562c`
- `Tegra/Memoriais_Descritivos/Universo Tatuapé Órbita-Memorial Descritivo - lojas.pdf` — SHA-256 `1ac9564ba2696acaad0c44f329db74c271e30f5920a2a7ad50afff51e788ee34`
- `Tegra/Memoriais_Descritivos/Universo Tatuapé Órbita-Memorial Descritivo - offices.pdf` — SHA-256 `a40d421991ed8cfd4b381c562343475063f2a5de6f69e8c121d112f42aebc421`

Prior textual extraction evidence `docs/product/MNT_MEMORIAL_FACT_AUDIT_2026-09-14.md` records the residential technical site as **Av. Celso Garcia, 5000**, 25m adult pool lane + kids pool, coworking, fitness, barbecue/pool bar and generator. Those technical facts are CANDIDATE_ONLY pending confirmation of block/typology context in the original pages.

**ADDRESS_CONFLICT / STOP:** Current HTML footer/JSON-LD and separately approved postal registry use **Avenida Celso Garcia, 5040**, CEP **03064-000**. Do not silently change 5040 to 5000 based on a general memorial without confirming the correct address role (residential access vs offices/lojas vs administrative site or stand). Postal validator and commercial schema frozen contracts must be reconciled explicitly before runtime mutation.

**PARKING_FACT_OPEN:** The three PDFs are appropriate primary sources to research unit and visitor parking, but the historical fact extraction does NOT confirm the number of spaces for each advertised typology. The parking slot remains BLOCKED_BY_PRODUCT_TRUTH until an exact citation from the original memorial and applicability to the specific apartment configuration are recorded. Commercial availability/price are not determined by descriptive memorials.
