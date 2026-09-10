# Handoff Atual — MoreNumTegra

- Status quando esta revisão estiver em `main`: `MNT-M2-03 COMPLETE / WAITING MNT-M2-04 AUTHORIZATION`
- Atualizado em: `2026-09-10`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra`
- Referência: `main` — resolver SHA live antes de agir
- MNT-M2-03 start main: `df7ed839c6872644560775cbb5cfe1e0d5c76b5c`
- Release comercial publicada: `18cfab98e01be29c86d78d08f2f5035a8da70444`
- Produção comercial: `https://moretegra.com.br/`
- Homologação Vercel: `https://morenumtegra.vercel.app/`
- Programa: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Fase atual: `MNT-M2 / ACTIVE_WAITING_NEXT_TASK_AUTHORIZATION`
- Próxima task: `MNT-M2-04 / PLANNED_NOT_AUTHORIZED`
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
- home indexada segundo evidência registrada;
- Vercel auto Git deployment desabilitado e fluxo manual gate-driven validado.

## 2. Measurement / Consent aceito

Evidence chain:

- `docs/measurement/MNT_M2_01_TRACKING_RUNTIME_INVENTORY_2026-09-10.md` — T0 pre-GTM inventory;
- `docs/measurement/MNT_M2_GTM_CONSENT_T1_2026-09-10.md` — GTM Consent Version 4 published/validated;
- `docs/measurement/MNT_M2_02_TRANSPORT_DEDUP_ARCHITECTURE_2026-09-10.md` — transport/dedup architecture;
- `docs/measurement/MNT_M2_03_CANONICAL_EVENT_TAXONOMY_V1_2026-09-10.md` — canonical event taxonomy v1.

Accepted foundations when this revision is in main:

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

## 3. MNT-M2-03 — event taxonomy accepted design

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

Core rules:

```text
lower_snake_case + mnt_ prefix
vendor-neutral source semantics
raw catalogue search text = FORBIDDEN IN MEASUREMENT
visitor name/email/phone/form values = FORBIDDEN IN EVENT PARAMETERS
programmatic filter synchronization != user event
CTA/WhatsApp/form submit attempt != lead
only verified Form 46 success may emit mnt_lead_success
```

`mnt_lead_success` is defined semantically, but runtime implementation remains blocked until a stable non-invasive Green success signal is proven.

Primary/secondary conversion role is deliberately not assigned here; that is MNT-M2-04.

## 4. Programa / SFJM consumer

State when this revision is canonical:

```text
MNT-M0  COMPLETE
MNT-M1  COMPLETE
MNT-M2  ACTIVE_WAITING_NEXT_TASK_AUTHORIZATION
  M2-01 COMPLETE
  M2-02 COMPLETE
  M2-03 COMPLETE
  M2-04 PLANNED_NOT_AUTHORIZED / NEXT
  M2-05 PARTIAL_EVIDENCE
  M2-06 PLANNED
  M2-07 COMPLETE
  M2-08 COMPLETE
  M2-09 PARTIAL_IMPLEMENTED
  M2-10 PLANNED
MNT-M3..M7 PLANNED
```

Planning progress:

```text
forecast total = 1240h
accepted = 328h
remaining = 912h
progress = 26.45%
```

`PROGRAM_TASK_GRAPH` owns hierarchy/planning hours; `CURRENT_PROGRAM_STATE` owns lifecycle/progress; `NEXT_SAFE_ACTION` owns execution authority.

## 5. Próxima task

`MNT-M2-04 — Define primary and secondary conversions`

MNT-M2-04 remains `PLANNED_NOT_AUTHORIZED`. It requires a separate explicit Product Authority start gate.

## 6. Residuals preserved

Measurement:

- stable native Green Form 46 success signal for `mnt_lead_success` = `NOT_YET_PROVEN`;
- runtime canonical-host/dedup enforcement = pending MNT-M2-09;
- GA4 ownership/property/config = not yet completed;
- Meta ownership = open;
- end-to-end Measurement QA = open.

Search:

- canonical client-side;
- sitemap unavailable;
- `www` without proven HTTP 301/308 semantics;
- historical `web-share` warning.

## 7. SFJM Workspace boundary

Workspace is read-only derived representation. After this revision is merged, it must resolve the resulting exact MoreNumTegra `main` SHA before refreshing its snapshot.

## 8. External gates preserved

No further GTM, GA4, Meta/CAPI, Green Pixel, Google Ads/campaign/spend, DNS, Search Console mutation, Vercel Production, Green publication, FECH.AI/n8n/Make or secrets are authorized by MNT-M2-03 completion.
