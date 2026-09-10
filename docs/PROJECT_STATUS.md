# Status do Projeto — MoreNumTegra

- Data de referência: `2026-09-10`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra`
- Referência: `main` — resolver SHA live antes de agir
- MNT-M2-06 start main: `19570db1ee2853946e45451c0ff5afaceb894002`
- Release comercial publicada: `18cfab98e01be29c86d78d08f2f5035a8da70444`
- Produto V1: `GREEN_COMMERCIAL_V1_SEARCH_INDEXED / OPERATIONAL`
- Programa: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Fase atual quando esta revisão estiver em main: `MNT-M2 — ACTIVE_WAITING_NEXT_TASK_AUTHORIZATION`
- Próxima task: `MNT-M2-09 — PARTIAL_IMPLEMENTED / EXECUTION_NOT_AUTHORIZED`
- Saúde operacional do V1: `verde`

## 1. Produção atual

- Green Sales: `https://moretegra.com.br/`
- Vercel homologation: `https://morenumtegra.vercel.app/`
- release Green registrada: `18cfab98e01be29c86d78d08f2f5035a8da70444`
- smoke Green: `PASS` por confirmação do owner
- Form 46, filtros, CTA, WhatsApp e mobile: documentados como funcionais na release aceita
- Vercel deployment mode: `MANUAL_GATE_DRIVEN` conforme ADR-002

Preservar:

```text
LIVE V1 OPERATIONAL != MNT-RESF PROGRAM COMPLETE
PROGRAM PROGRESS != V1 PRODUCT READINESS
DESIGN COMPLETE != RUNTIME IMPLEMENTED
EVENT DEFINED != CONVERSION
CONVERSION CLASSIFIED != DESTINATION CONFIGURED
OWNERSHIP DEFINED != DESTINATION RESOURCE CREATED
PARTIAL IMPLEMENTATION != TASK COMPLETE
```

## 2. Programa MNT-RESF

Fontes:

- WBS humana: `docs/roadmap/MNT_RESF_SEARCH_TO_LEAD_WBS.md`;
- task graph estrutural: `docs/sfjm/PROGRAM_TASK_GRAPH.json`;
- current-state overlay: `docs/sfjm/CURRENT_PROGRAM_STATE.json`;
- read model: `docs/sfjm/PROJECT_READ_MODEL.json`;
- next authority: `docs/NEXT_SAFE_ACTION.md`.

Estado quando esta revisão estiver canônica:

```text
MNT-M0  COMPLETE
MNT-M1  COMPLETE
MNT-M2  ACTIVE_WAITING_NEXT_TASK_AUTHORIZATION
  MNT-M2-01  COMPLETE
  MNT-M2-02  COMPLETE
  MNT-M2-03  COMPLETE
  MNT-M2-04  COMPLETE
  MNT-M2-05  COMPLETE
  MNT-M2-06  COMPLETE
  MNT-M2-07  COMPLETE
  MNT-M2-08  COMPLETE
  MNT-M2-09  PARTIAL_IMPLEMENTED / NEXT / EXECUTION_NOT_AUTHORIZED
  MNT-M2-10  PLANNED
MNT-M3..MNT-M7  PLANNED
```

Planning forecast:

```text
forecast total                = 1240h
accepted scope-equivalent     = 352h
remaining forecast            = 888h
program progress              = 28.39%
```

Accepted M2 scope-equivalent:

- `MNT-M2-01 = 8h`;
- `MNT-M2-02 = 16h`;
- `MNT-M2-03 = 16h`;
- `MNT-M2-04 = 8h`;
- `MNT-M2-05 = 8h`;
- `MNT-M2-06 = 8h`;
- `MNT-M2-07 = 16h`;
- `MNT-M2-08 = 16h`.

`MNT-M2-09` remains partial and contributes `0h accepted` until accepted complete.

## 3. Accepted Measurement foundation

### MNT-M2-01 — T0 historical inventory

Evidence: `docs/measurement/MNT_M2_01_TRACKING_RUNTIME_INVENTORY_2026-09-10.md`.

```text
HAR SHA-256 = c59f3a3c0c075412595bfda2dd1155a48fa0d0689f5f27264010076348bb7446
Green /page/view = OBSERVED / PLATFORM_INJECTED
GTM/GA4/Meta = NOT_OBSERVED_AT_T0
www -> non-www Green double page-view = historical risk input
```

The T0 `GTM NOT_OBSERVED` and `Meta NOT_OBSERVED` statements remain bounded to that pre-GTM capture.

### MNT-M2-07 / MNT-M2-08 — GTM Consent T1

Evidence: `docs/measurement/MNT_M2_GTM_CONSENT_T1_2026-09-10.md`.

```text
GTM_CONTAINER = GTM-PGCR4R47
PUBLISHED_GTM_VERSION = 4
DEFAULT = denied all four
GREEN Continuar = granted all four
GREEN Cancelar = denied all four
Persistence after reload = PROVEN
```

This proves the accepted Google Consent Mode state handling. It does not by itself prove Meta destination gating.

### MNT-M2-02 — transport/dedup architecture

Evidence: `docs/measurement/MNT_M2_02_TRANSPORT_DEDUP_ARCHITECTURE_2026-09-10.md`.

```text
PROJECT_BROWSER_DISPATCHER = GTM-PGCR4R47
PROJECT_MEASUREMENT_CANONICAL_HOST = moretegra.com.br
WWW_ALIAS_PROJECT_BUSINESS_MEASUREMENT = BLOCK
GREEN_/page/view = PLATFORM_TELEMETRY / NOT_PROJECT_BUSINESS_EVENT
PROJECT_PAGE_VIEW = EXACTLY_ONE_PATH_PER_CANONICAL_DOCUMENT_LOAD
SEMANTIC_EVENT_ORIGIN = ONE dataLayer EVENT
mnt_event_id = PROJECT_CORRELATION_IDENTITY / VENDOR DEDUP DESTINATION-SPECIFIC
```

Runtime enforcement remains MNT-M2-09; end-to-end proof remains MNT-M2-10.

### MNT-M2-03 — canonical event taxonomy

Evidence: `docs/measurement/MNT_M2_03_CANONICAL_EVENT_TAXONOMY_V1_2026-09-10.md`.

Canonical source events:

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

Visitor PII and raw free-form catalogue search text remain excluded from Measurement.

## 4. MNT-M2-04 — conversion classification

Evidence/design:

`docs/measurement/MNT_M2_04_PRIMARY_SECONDARY_CONVERSIONS_V1_2026-09-10.md`.

Project-level classification:

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

Hard boundaries:

```text
PRIMARY = verified Green Form 46 success only
stable Green success signal = NOT_YET_PROVEN
property/offer price != conversion value
monetary conversion value = NOT_DEFINED
project PRIMARY/SECONDARY != automatic Google Ads, GA4 or Meta administrative setting
```

MNT-M2-04 is classification only. It activates no destination.

## 5. MNT-M2-05 — GTM / GA4 ownership

Evidence/design:

`docs/measurement/MNT_M2_05_GTM_GA4_OWNERSHIP_CONTRACT_V1_2026-09-10.md`.

Governance contract:

```text
GTM governance owner = MoreNumTegra / Product Authority
GTM canonical container = GTM-PGCR4R47
GA4 governance owner = MoreNumTegra / Product Authority
GA4 property target = one dedicated MoreNumTegra property
GA4 production web-stream target = one stream for moretegra.com.br
www + morenumtegra.vercel.app = outside project production Measurement
```

Evidence boundaries:

```text
GA4_PROPERTY_ID = NOT_PROVEN
GA4_STREAM_ID = NOT_PROVEN
GA4_MEASUREMENT_ID = NOT_PROVEN
GTM_GOOGLE_ACCOUNT_ID / USER ROSTER = NOT_RECORDED
M2-05 GOOGLE-SIDE / RUNTIME MUTATION = NONE
```

`NOT_PROVEN` does not mean `DOES_NOT_EXIST`.

## 6. MNT-M2-06 — Meta Pixel / Dataset ownership

Evidence/design:

`docs/measurement/MNT_M2_06_META_PIXEL_DATASET_OWNERSHIP_CONTRACT_V1_2026-09-10.md`.

Governance contract:

```text
Meta Measurement governance owner = MoreNumTegra / Product Authority
Meta Dataset target = one dedicated MoreNumTegra Dataset
Meta browser source target = one project browser source relationship if browser collection is implemented
Browser dispatcher = GTM-PGCR4R47
www + morenumtegra.vercel.app = outside project production Measurement
CAPI = optional future capability / not authorized by M2-06
```

Evidence boundaries:

```text
META_DATASET_ID = NOT_PROVEN
META_PIXEL_ID = NOT_PROVEN
META_PIXEL_DATASET_RELATIONSHIP = NOT_PROVEN
META_BUSINESS_PORTFOLIO_ID = NOT_PROVEN / NOT_REQUIRED_IN_REPOSITORY
META_CAPI = NOT_PROVEN / NOT_IMPLEMENTED_BY_M2_06
M2-06 META-SIDE / RUNTIME MUTATION = NONE
```

`NOT_PROVEN` does not mean `DOES_NOT_EXIST`. A suitable existing dedicated asset must be verified before any duplicate is created.

M2-06 also separates website Measurement from any independent Lead Ads/CRM integration: one does not prove ownership or implementation of the other.

## 7. Measurement remaining work

```text
TRANSPORT / DEDUP ARCHITECTURE = COMPLETE
CANONICAL EVENT TAXONOMY = COMPLETE
PRIMARY / SECONDARY CONVERSIONS = COMPLETE
GTM / GA4 OWNERSHIP = COMPLETE DESIGN / EXACT GA4 IDS NOT YET PROVEN
META OWNERSHIP = COMPLETE DESIGN / EXACT META IDS NOT YET PROVEN
TRACKING IMPLEMENTATION = PARTIAL / MNT-M2-09 NEXT / EXECUTION_NOT_AUTHORIZED
END-TO-END MEASUREMENT QA = OPEN / MNT-M2-10
```

No GTM publication, GA4 creation/configuration, Meta Dataset/Pixel/CAPI creation/deployment, Google Ads or production mutation is authorized by MNT-M2-06 completion.

## 8. Search / GSC

P0-B remains `PASS_WITH_RESIDUAL_RISK`.

Residuals remain:

- canonical client-side;
- sitemap unavailable;
- `www` without proven HTTP 301/308 semantics;
- historical `web-share` warning.

GSC T0 remains:

```text
clicks = 0
impressions = 17
CTR = 0%
average position = 26.1
```

Classification: `EARLY_DISCOVERY / INSUFFICIENT_VOLUME_FOR_TREND_OR_CAUSALITY_CLAIMS`.

## 9. SFJM Workspace boundary

MoreNumTegra publishes project truth. Workspace consumes/renders it.

Consumer precedence:

1. `PROJECT_READ_MODEL.json` — entrypoint/summary;
2. `CURRENT_PROGRAM_STATE.json` — current lifecycle/progress;
3. `PROGRAM_TASK_GRAPH.json` — hierarchy/planning hours;
4. `NEXT_SAFE_ACTION.md` — execution authority.

After this revision is merged, Workspace must resolve the resulting exact MoreNumTegra main SHA before refreshing its snapshot.

## 10. External gates

MNT-M2-09 and later work retain their own Product Authority gates. Further GTM changes, GA4 property/stream creation or event implementation, Meta Dataset/Pixel/CAPI creation or deployment, Green Pixel, Google Ads/spend, DNS, Search Console mutation, Vercel Production and Green publication remain separately gated unless an explicit authorized scope says otherwise.
