# Handoff Atual — MoreNumTegra

- Status quando esta revisão estiver em `main`: `MNT-M2-06 COMPLETE / WAITING MNT-M2-09 AUTHORIZATION`
- Atualizado em: `2026-09-10`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra`
- Referência: `main` — resolver SHA live antes de agir
- MNT-M2-06 start main: `19570db1ee2853946e45451c0ff5afaceb894002`
- Release comercial publicada: `18cfab98e01be29c86d78d08f2f5035a8da70444`
- Produção comercial: `https://moretegra.com.br/`
- Homologação Vercel: `https://morenumtegra.vercel.app/`
- Programa: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Fase atual: `MNT-M2 / ACTIVE_WAITING_NEXT_TASK_AUTHORIZATION`
- Próxima task: `MNT-M2-09 / PARTIAL_IMPLEMENTED / EXECUTION_NOT_AUTHORIZED`
- Baseline funcional: `docs/baseline/FUNCTIONAL_BASELINE_V2.md`
- Baseline técnica: `docs/baseline/TECHNICAL_BASELINE_V2_2.md`
- Vercel mode: `MANUAL_GATE_DRIVEN`

## 1. Estado operacional

MoreNumTegra V1 permanece operacional na Green Sales.

```text
HTML 01
-> Form 46 nativo
-> HTML 02
-> Footer
+ CSS global
+ JavaScript global
```

Preservado:

- Form 46 como captação V1;
- catálogo/jornadas principais documentados como funcionais;
- Vercel como homologação pública e Green como produção comercial;
- Search/indexability P0-B = `PASS_WITH_RESIDUAL_RISK`;
- Vercel auto Git deployment desabilitado e fluxo manual gate-driven validado.

## 2. Measurement / Consent aceito

Evidence chain:

- `docs/measurement/MNT_M2_01_TRACKING_RUNTIME_INVENTORY_2026-09-10.md`;
- `docs/measurement/MNT_M2_GTM_CONSENT_T1_2026-09-10.md`;
- `docs/measurement/MNT_M2_02_TRANSPORT_DEDUP_ARCHITECTURE_2026-09-10.md`;
- `docs/measurement/MNT_M2_03_CANONICAL_EVENT_TAXONOMY_V1_2026-09-10.md`;
- `docs/measurement/MNT_M2_04_PRIMARY_SECONDARY_CONVERSIONS_V1_2026-09-10.md`;
- `docs/measurement/MNT_M2_05_GTM_GA4_OWNERSHIP_CONTRACT_V1_2026-09-10.md`;
- `docs/measurement/MNT_M2_06_META_PIXEL_DATASET_OWNERSHIP_CONTRACT_V1_2026-09-10.md`.

Accepted foundations:

```text
GTM = GTM-PGCR4R47
Consent Mode Version 4 = PUBLISHED / VALIDATED
DEFAULT = denied all four
Continuar = granted all four
Cancelar = denied all four
Persistence = PROVEN

PROJECT_MEASUREMENT_HOST = moretegra.com.br
www project business Measurement = BLOCK
Green /page/view = platform telemetry
one project page-view path per canonical document load
one semantic dataLayer event per occurrence
mnt_event_id = project correlation identity
```

## 3. Event taxonomy + conversion roles

Canonical source events v1:

```text
mnt_page_view
mnt_section_click
mnt_catalog_filter
mnt_catalog_search
mnt_intent
mnt_form_start
mnt_form_submit_attempt
mnt_lead_success
```

Project conversion roles v1:

```text
PRIMARY = mnt_lead_success only
SECONDARY = request_conditions / request_project_conditions / negotiate_scenario / schedule_visit / whatsapp_contact
NONE = page/section/filter/search/project_interest/form_start/form_submit_attempt
```

Core rules:

```text
visitor name/email/phone/form values = FORBIDDEN IN EVENT PARAMETERS
raw catalogue search text = FORBIDDEN IN MEASUREMENT
CTA/WhatsApp/form submit attempt != verified lead
only verified Form 46 success may emit mnt_lead_success
property/offer price != conversion value
monetary conversion value = NOT_DEFINED
```

## 4. Google Measurement ownership

```text
GTM container = GTM-PGCR4R47
GTM governance owner = MoreNumTegra / Product Authority
GTM accepted published baseline = Version 4 Consent
GA4 governance owner = MoreNumTegra / Product Authority
GA4 property = one dedicated MoreNumTegra property
GA4 production stream = one web stream for moretegra.com.br
www = no project production Measurement
Vercel = no project production Measurement
```

Unproven and deliberately not invented:

```text
GA4 property ID = NOT_PROVEN
GA4 stream ID = NOT_PROVEN
GA4 Measurement ID = NOT_PROVEN
GTM Google account ID/user roster = NOT_RECORDED
```

## 5. Meta Measurement ownership

Canonical governance target:

```text
Meta Measurement governance owner = MoreNumTegra / Product Authority
Meta Dataset = one dedicated MoreNumTegra Dataset
Meta browser source = one project browser source relationship if implemented
Browser dispatcher = GTM-PGCR4R47
www = no project production Measurement
Vercel = no project production Measurement
CAPI = optional future capability / not authorized by M2-06
```

Unproven and deliberately not invented:

```text
Meta Dataset ID = NOT_PROVEN
Meta Pixel/browser-source ID = NOT_PROVEN
Pixel/Dataset relationship = NOT_PROVEN
Meta Business Portfolio ID = NOT_PROVEN / NOT_REQUIRED_IN_REPOSITORY
```

`NOT_PROVEN != DOES_NOT_EXIST`.

MNT-M2-06 performed no Meta-side or runtime mutation. Any existing suitable dedicated asset must be discovered/adopted before a duplicate is created. Website Measurement is distinct from any Lead Ads/CRM integration.

## 6. Programa / SFJM consumer

State when this revision is canonical:

```text
MNT-M0  COMPLETE
MNT-M1  COMPLETE
MNT-M2  ACTIVE_WAITING_NEXT_TASK_AUTHORIZATION
  M2-01 COMPLETE
  M2-02 COMPLETE
  M2-03 COMPLETE
  M2-04 COMPLETE
  M2-05 COMPLETE
  M2-06 COMPLETE
  M2-07 COMPLETE
  M2-08 COMPLETE
  M2-09 PARTIAL_IMPLEMENTED / NEXT / EXECUTION_NOT_AUTHORIZED
  M2-10 PLANNED
MNT-M3..M7 PLANNED
```

Planning progress:

```text
forecast total = 1240h
accepted = 352h
remaining = 888h
progress = 28.39%
```

`PROGRAM_TASK_GRAPH` owns hierarchy/planning hours; `CURRENT_PROGRAM_STATE` owns lifecycle/progress; `NEXT_SAFE_ACTION` owns execution authority.

## 7. Próxima task

`MNT-M2-09 — Implement authorized tracking configuration`

MNT-M2-09 remains `PARTIAL_IMPLEMENTED` because the accepted GTM Consent Mode work already exists, but further implementation is not authorized by sequence alone. A separate Product Authority gate is required.

The safe start for M2-09 is read-only resolution of existing GA4/Meta assets and a bounded implementation plan before any new publish/create/configure mutation.

## 8. Residuals preservados

Measurement:

- exact GA4 property ID / stream ID / Measurement ID = `NOT_PROVEN`;
- exact Meta Dataset/Pixel identifiers and relationship = `NOT_PROVEN`;
- stable native Green Form 46 success signal for primary `mnt_lead_success` = `NOT_YET_PROVEN`;
- runtime canonical-host/dedup enforcement = pending MNT-M2-09;
- Meta consent gating = must be implemented/proven before Meta production collection;
- end-to-end Measurement QA = open.

Search:

- canonical client-side;
- sitemap unavailable;
- `www` without proven HTTP 301/308 semantics;
- historical `web-share` warning.

## 9. SFJM Workspace boundary

Workspace is read-only derived representation. After this revision is merged, it must resolve the resulting exact MoreNumTegra `main` SHA before refreshing its snapshot.

## 10. External gates preserved

No further GTM publication, GA4 creation/configuration, Meta Dataset/Pixel/CAPI creation/deployment, Green Pixel, Google Ads/campaign/spend, DNS, Search Console mutation, Vercel Production, Green publication, FECH.AI/n8n/Make or secrets are authorized by MNT-M2-06 completion.
