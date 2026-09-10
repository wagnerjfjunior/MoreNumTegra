# MoreNumTegra — RESF v1 Adoption Baseline

Status: `ADOPTED_CANONICAL_MAIN` after PR #39 merge  
Adoption manifest: `docs/frameworks/resf/ADOPTION.yaml`  
Provider pin: `wagnerjfjunior/Blogs-sites-portais-seo@7a61aa036d677015ee4540ca8c5dc9a41f0165d4`  
Adoption merge anchor: `dba0de3bfefc7aec90c5a88588c54eae4317c61f`  
Baseline date: `2026-09-10`

## 1. Purpose

Reconcile the already-operational MoreNumTegra V1 against the selectively adopted RESF v1 modules without rebuilding functioning product behavior or upgrading unproven evidence.

The framework does not replace MoreNumTegra product authority, business facts, runtime authority, release gates or Green/Vercel topology.

Preserve:

```text
DOCUMENTED != IMPLEMENTED
IMPLEMENTED != DEPLOYED
DEPLOYED != VALIDATED
VALIDATED_AT_TIME_T != CURRENTLY_VALID
RESF_ADOPTED != RESF_MODULE_IMPLEMENTED
RESF_RECONCILED != RUNTIME_MUTATION_AUTHORIZED
```

## 2. Historical adoption-time state — T0

This section preserves the state observed at RESF adoption and must not be read as the current Measurement state after later MNT-M2 work.

Confirmed at adoption time:

- commercial V1 operational in Green Sales at `https://moretegra.com.br/`;
- GitHub `main` is canonical project source;
- Vercel Production is public homologation, not commercial production;
- native Green Form 46 remains V1 lead-capture path;
- catalogue, filters, CTAs, WhatsApp and mobile core journeys are documented as functioning in the accepted V1 release;
- Search/indexability P0-B = `PASS_WITH_RESIDUAL_RISK`;
- home indexed according to project-recorded Search Console evidence;
- Measurement for MoreNumTegra was not configured/proven at this adoption-time T0;
- LGPD modal presence was observed but consent enforcement was not proven at this adoption-time T0;
- GTM, GA4, Meta, Google Ads, DNS and other external mutations were separately gated.

Historical-state rule:

```text
ADOPTION_T0_MEASUREMENT_NOT_PROVEN = HISTORICAL FACT
ADOPTION_T0_CONSENT_NOT_PROVEN = HISTORICAL FACT
ADOPTION_T0 != CURRENT MNT-M2 STATE
```

Later current-state evidence is recorded under `docs/measurement/`, `docs/sfjm/CURRENT_PROGRAM_STATE.json`, `docs/PROJECT_STATUS.md` and `handoffs/CURRENT.md`.

## 3. Selective adoption — Wave 1

| Module | Initial consumer classification at adoption |
|---|---|
| RESF-INTELLIGENCE | ADOPTED / RECONCILIATION_REQUIRED |
| RESF-PRODUCT-TRUTH | ADOPTED / PREEXISTING_CONTROLS |
| RESF-IA | ADOPTED / RECONCILIATION_REQUIRED |
| RESF-UX | ADOPTED / PREEXISTING_IMPLEMENTATION |
| RESF-CONVERSION | ADOPTED / PREEXISTING_IMPLEMENTATION |
| RESF-TRACKING | ADOPTED / DESIGN_REQUIRED |
| RESF-LEAD | ADOPTED / PREEXISTING_RUNTIME + CONTRACT_REQUIRED |
| RESF-CRM | ADOPTED / PREEXISTING_RUNTIME + CONTRACT_REQUIRED |
| RESF-CONSENT | ADOPTED / ENFORCEMENT_NOT_PROVEN |

Deferred, not rejected:

`RESF-SEARCH-CONTRACT`, `RESF-SEO`, `RESF-CONTENT`, `RESF-SCHEMA`, `RESF-GEO-AEO`, `RESF-LINKING`, `RESF-PERFORMANCE`, `RESF-ATTRIBUTION`, `RESF-PAID`, `RESF-QA`, `RESF-OBSERVABILITY`.

These classifications describe the adoption baseline. Later task completions do not rewrite the historical initial classification; current state is overlaid below.

## 4. Historical adoption reconciliation map

| Area | Existing consumer evidence/state at adoption | RESF interpretation at T0 | Initial next obligation |
|---|---|---|---|
| Product facts | Canonical baselines and governed Tegra materials | PREEXISTING_CONTROLS | explicit fact/claim registry in MNT-M3 |
| Mobile UX | Mobile-first baseline, filters/CTAs documented functional | PREEXISTING_IMPLEMENTATION | revalidate under MNT-M5/MNT-M7 |
| Conversion | WhatsApp, Receber condições and Form 46 journeys | PREEXISTING_IMPLEMENTATION | formalize conversion semantics/event mapping |
| Lead capture | Green native Form 46 operational | PREEXISTING_RUNTIME | define valid-lead semantics/E2E proof |
| CRM handoff | Green V1 destination | PREEXISTING_RUNTIME | formalize handoff/success contract |
| Search/indexability | P0-B PASS_WITH_RESIDUAL_RISK | PARTIALLY_VALIDATED_PREEXISTING | later SEO/Search reconciliation |
| Tracking | MoreNumTegra measurement not configured/proven at T0 | DESIGN_REQUIRED | MNT-M2 after authorization |
| Consent | Green modal observed at T0 | DEPLOYED_UI / ENFORCEMENT_NOT_PROVEN | denied/granted proof obligations |
| Attribution | No accepted closed-loop model | DEFERRED | MNT-M6 after prerequisites |
| Paid media | No current execution authority | DEFERRED / NOT_AUTHORIZED | MNT-M6 after measurement/spend gates |
| Observability | GSC evidence available, low volume | EVIDENCE_AVAILABLE / MODULE_DEFERRED | preserve T0; adopt later |

## 5. Search Console T0

Canonical textual evidence:
`docs/evidence/search/GSC_BASELINE_2026-09-10.md`.

```text
clicks = 0
impressions = 17
CTR = 0%
average position = 26.1
```

Query rows are partial. Volume is insufficient for trend, causality or improvement claims.

## 6. Current delta after accepted MNT-M2 work

Current lifecycle authority is `docs/sfjm/CURRENT_PROGRAM_STATE.json`.

When the MNT-M2-04 revision is integrated into canonical `main`, the supported state is:

```text
MNT-M2-01 = COMPLETE
MNT-M2-02 = COMPLETE
MNT-M2-03 = COMPLETE
MNT-M2-04 = COMPLETE
MNT-M2-07 = COMPLETE
MNT-M2-08 = COMPLETE
MNT-M2-09 = PARTIAL_IMPLEMENTED
MNT-M2-05 = PARTIAL_EVIDENCE / NEXT / EXECUTION_NOT_AUTHORIZED
```

Evidence chain:

- `docs/measurement/MNT_M2_01_TRACKING_RUNTIME_INVENTORY_2026-09-10.md` — historical pre-GTM T0 inventory;
- `docs/measurement/MNT_M2_GTM_CONSENT_T1_2026-09-10.md` — GTM `GTM-PGCR4R47`, Version 4, Consent Mode published and validated;
- `docs/measurement/MNT_M2_02_TRANSPORT_DEDUP_ARCHITECTURE_2026-09-10.md` — accepted transport/dedup architecture;
- `docs/measurement/MNT_M2_03_CANONICAL_EVENT_TAXONOMY_V1_2026-09-10.md` — canonical event taxonomy v1;
- `docs/measurement/MNT_M2_04_PRIMARY_SECONDARY_CONVERSIONS_V1_2026-09-10.md` — project-level primary/secondary conversion classification v1.

Current Measurement interpretation:

| Area | Current state when MNT-M2-04 is canonical | Remaining obligation |
|---|---|---|
| GTM/Consent | PUBLISHED / VALIDATED | preserve baseline; destination behavior still needs later QA |
| Transport/dedup | ACCEPTED DESIGN | implement under MNT-M2-09; prove under MNT-M2-10 |
| Event taxonomy | ACCEPTED DESIGN | implement only after later gates |
| Conversion roles | ACCEPTED DESIGN | preserve primary/secondary/non-conversion semantics in destination mappings |
| GTM/GA4 ownership | PARTIAL_EVIDENCE / NEXT | MNT-M2-05 completion work after explicit authorization |
| Meta ownership | OPEN | MNT-M2-06 |
| Lead success signal | NOT_YET_PROVEN | stable non-invasive Green Form 46 success signal before primary conversion implementation |
| Full tracking implementation | PARTIAL | MNT-M2-09 |
| End-to-end Measurement QA | OPEN | MNT-M2-10 |

Canonical conversion-role contract:

```text
PRIMARY
  mnt_lead_success

SECONDARY
  mnt_intent:request_conditions
  mnt_intent:request_project_conditions
  mnt_intent:negotiate_scenario
  mnt_intent:schedule_visit
  mnt_intent:whatsapp_contact

NONE
  mnt_page_view
  mnt_section_click
  mnt_catalog_filter
  mnt_catalog_search
  mnt_intent:project_interest
  mnt_form_start
  mnt_form_submit_attempt
```

Key controls:

```text
only verified Form 46 success may become primary conversion
secondary conversion != verified lead
raw catalogue search text != Measurement parameter
visitor name/email/phone/form values != Measurement parameter
property/offer price != conversion value
monetary lead conversion value = NOT_DEFINED
Green /page/view != project business event
YouTube telemetry != project conversion
```

Project-level conversion roles do not automatically configure GA4 key events, Google Ads action optimization roles or Meta event mappings.

## 7. Program relationship — current overlay

- human WBS: `docs/roadmap/MNT_RESF_SEARCH_TO_LEAD_WBS.md`;
- structural task graph: `docs/sfjm/PROGRAM_TASK_GRAPH.json`;
- current-state overlay: `docs/sfjm/CURRENT_PROGRAM_STATE.json`;
- read model: `docs/sfjm/PROJECT_READ_MODEL.json`.

Planning progress when MNT-M2-04 is integrated:

```text
forecast total = 1240h
accepted scope-equivalent = 336h
remaining forecast = 904h
progress = 27.10%
```

Hours are planning/scope-equivalent, not an actual timesheet.

## 8. Current gaps and residuals

1. GA4 ownership/property/configuration remains incomplete under MNT-M2-05 despite existing GTM evidence.
2. Meta ownership remains open under MNT-M2-06.
3. Conversion roles are defined but no destination is thereby configured.
4. `mnt_lead_success` is the sole primary conversion and requires a stable, non-invasive Green Form 46 success signal before implementation.
5. Transport/dedup runtime controls remain to be implemented under MNT-M2-09 and proven under MNT-M2-10.
6. No monetary lead conversion value is defined; property/offer prices are not conversion value.
7. GTM Consent Mode state handling is proven, while site-wide third-party telemetry gating remains a separate residual.
8. Search technical residuals remain: canonical client-side, sitemap absent, `www` 301/308 not proven.
9. GSC T0 volume remains too low for trend inference.
10. Deferred RESF modules do not govern implementation until explicitly adopted.

## 9. Authorization boundary

MNT-M2-04 completion does not authorize MNT-M2-05 completion work or any runtime Measurement mutation.

Further GTM configuration, GA4, Meta Pixel/Dataset/CAPI, Green Pixel/integration changes, Google Ads, DNS, Search Console mutation, Vercel Production, Green publication, campaign/spend and external automation remain separately gated.

`MNT-M2-04 COMPLETE != MNT-M2-05 AUTHORIZED != MNT-M2-09 IMPLEMENTED != MNT-M2-10 VALIDATED`.
