# Status do Projeto — MoreNumTegra

- Data de referência: `2026-09-10`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra`
- Referência: `main` — resolver SHA live antes de agir
- MNT-M2-03 start main: `df7ed839c6872644560775cbb5cfe1e0d5c76b5c`
- Release comercial publicada: `18cfab98e01be29c86d78d08f2f5035a8da70444`
- Produto V1: `GREEN_COMMERCIAL_V1_SEARCH_INDEXED / OPERATIONAL`
- Programa: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Fase atual quando esta revisão estiver em main: `MNT-M2 — ACTIVE_WAITING_NEXT_TASK_AUTHORIZATION`
- Próxima task: `MNT-M2-04 — PLANNED_NOT_AUTHORIZED`
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
  MNT-M2-04  PLANNED_NOT_AUTHORIZED / NEXT
  MNT-M2-05  PARTIAL_EVIDENCE
  MNT-M2-06  PLANNED
  MNT-M2-07  COMPLETE
  MNT-M2-08  COMPLETE
  MNT-M2-09  PARTIAL_IMPLEMENTED
  MNT-M2-10  PLANNED
MNT-M3..MNT-M7  PLANNED
```

Planning forecast:

```text
forecast total                = 1240h
accepted scope-equivalent     = 328h
remaining forecast            = 912h
program progress              = 26.45%
```

Accepted M2 scope-equivalent:

- `MNT-M2-01 = 8h`;
- `MNT-M2-02 = 16h`;
- `MNT-M2-03 = 16h`;
- `MNT-M2-07 = 16h`;
- `MNT-M2-08 = 16h`.

`MNT-M2-09` remains partial and contributes `0h accepted`.

## 3. Accepted Measurement foundation

### MNT-M2-01 — T0 historical inventory

Evidence: `docs/measurement/MNT_M2_01_TRACKING_RUNTIME_INVENTORY_2026-09-10.md`.

```text
HAR SHA-256 = c59f3a3c0c075412595bfda2dd1155a48fa0d0689f5f27264010076348bb7446
Green /page/view = OBSERVED / PLATFORM_INJECTED
GTM/GA4/Meta = NOT_OBSERVED_AT_T0
www -> non-www Green double page-view = historical risk input
```

The T0 `GTM NOT_OBSERVED` statement remains bounded to that pre-GTM capture.

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

### MNT-M2-02 — transport/dedup architecture

Evidence: `docs/measurement/MNT_M2_02_TRANSPORT_DEDUP_ARCHITECTURE_2026-09-10.md`.

Accepted design:

```text
PROJECT_BROWSER_DISPATCHER = GTM-PGCR4R47
PROJECT_MEASUREMENT_CANONICAL_HOST = moretegra.com.br
WWW_ALIAS_PROJECT_BUSINESS_MEASUREMENT = BLOCK
GREEN_/page/view = PLATFORM_TELEMETRY / NOT_PROJECT_BUSINESS_EVENT
PROJECT_PAGE_VIEW = EXACTLY_ONE_PATH_PER_CANONICAL_DOCUMENT_LOAD
SEMANTIC_EVENT_ORIGIN = ONE dataLayer EVENT
mnt_event_id = PROJECT_CORRELATION_IDENTITY / VENDOR DEDUP DESTINATION-SPECIFIC
CTA_CLICK / SUBMIT_ATTEMPT != LEAD
ONLY_VERIFIED_FORM46_SUCCESS_MAY_BECOME_LEAD
```

Runtime enforcement remains MNT-M2-09; end-to-end proof remains MNT-M2-10.

## 4. MNT-M2-03 — canonical event taxonomy

Evidence/design:

`docs/measurement/MNT_M2_03_CANONICAL_EVENT_TAXONOMY_V1_2026-09-10.md`.

Canonical source-event vocabulary v1:

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

Key semantics:

```text
source event names are vendor-neutral
one semantic event occurrence -> one mnt_event_id
raw catalogue search text is forbidden from Measurement
visitor name/email/telephone/form values are forbidden from event parameters
project_name = project.projectName || project.name when project context exists
offer_name = project.name
CTA/WhatsApp/form intent != lead
mnt_lead_success requires verified native Green Form 46 success
```

`mnt_lead_success` is defined but must not be implemented until a stable, non-invasive Green success signal is proven.

MNT-M2-03 does not decide primary/secondary conversion classification or destination mappings.

## 5. Measurement remaining work

```text
TRANSPORT / DEDUP ARCHITECTURE = COMPLETE
CANONICAL EVENT TAXONOMY = COMPLETE
PRIMARY / SECONDARY CONVERSIONS = OPEN / MNT-M2-04
GTM / GA4 OWNERSHIP = PARTIAL / MNT-M2-05
META OWNERSHIP = OPEN / MNT-M2-06
TRACKING IMPLEMENTATION = PARTIAL / MNT-M2-09
END-TO-END MEASUREMENT QA = OPEN / MNT-M2-10
```

No additional GTM, GA4, Google Ads or Meta implementation is authorized by MNT-M2-03 completion.

## 6. Search / GSC

P0-B remains `PASS_WITH_RESIDUAL_RISK`.

Residuals:

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

## 7. SFJM Workspace boundary

MoreNumTegra publishes project truth. Workspace consumes/renders it.

Consumer precedence:

1. `PROJECT_READ_MODEL.json` — entrypoint/summary;
2. `CURRENT_PROGRAM_STATE.json` — current lifecycle/progress;
3. `PROGRAM_TASK_GRAPH.json` — hierarchy/planning hours;
4. `NEXT_SAFE_ACTION.md` — execution authority.

After this revision is merged, Workspace must resolve the resulting exact MoreNumTegra main SHA before refreshing its snapshot.

## 8. External gates

MNT-M2-04 and later tasks retain their own Product Authority gates. Further GTM changes, GA4, Meta/CAPI, Green Pixel, Google Ads/spend, DNS, Search Console mutation, Vercel Production and Green publication remain separately gated.
