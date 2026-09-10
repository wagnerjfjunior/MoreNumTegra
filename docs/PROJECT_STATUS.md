# Status do Projeto — MoreNumTegra

- Data de referência: `2026-09-10`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra`
- Referência: `main` — resolver SHA live antes de agir
- Reconciliation base main: `34ddd9684608a0fe1e02edc5071fd6e40b5f2121`
- Release comercial publicada: `18cfab98e01be29c86d78d08f2f5035a8da70444`
- Produto V1: `GREEN_COMMERCIAL_V1_SEARCH_INDEXED / OPERATIONAL`
- Programa: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Fase atual após integração desta reconciliação: `MNT-M2 — Measurement Foundation & Consent / ACTIVE_WAITING_NEXT_TASK_AUTHORIZATION`
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
MNT-RESF PROGRAM PROGRESS != V1 PRODUCT READINESS
FIELD EVIDENCE != FULL PHASE COMPLETE
PARTIAL IMPLEMENTATION != TASK COMPLETE
```

## 2. Programa MNT-RESF

Fontes:

- WBS humana: `docs/roadmap/MNT_RESF_SEARCH_TO_LEAD_WBS.md`;
- task graph estrutural: `docs/sfjm/PROGRAM_TASK_GRAPH.json`;
- current-state overlay: `docs/sfjm/CURRENT_PROGRAM_STATE.json`;
- read model para consumers: `docs/sfjm/PROJECT_READ_MODEL.json`;
- contrato de consumo: `docs/sfjm/PROGRAM_TASK_GRAPH.md`.

Estado reconciliado quando esta revisão for integrada:

```text
MNT-M0  COMPLETE
MNT-M1  COMPLETE
MNT-M2  ACTIVE_WAITING_NEXT_TASK_AUTHORIZATION
  MNT-M2-01  COMPLETE
  MNT-M2-02  PLANNED_NOT_AUTHORIZED
  MNT-M2-03  PLANNED
  MNT-M2-04  PLANNED
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
accepted scope-equivalent     = 296h
remaining forecast            = 944h
program progress              = 23.87%
```

Accepted M2 scope-equivalent in this reconciliation is limited to:

- `MNT-M2-01 = 8h`;
- `MNT-M2-07 = 16h`;
- `MNT-M2-08 = 16h`.

`MNT-M2-09` remains partial and contributes `0h accepted` until its full exit criteria are accepted.

Horas são planning/scope-equivalent, não timesheet real.

## 3. MNT-M2-01 — T0 histórico preservado

Evidence:
`docs/measurement/MNT_M2_01_TRACKING_RUNTIME_INVENTORY_2026-09-10.md`.

The pre-GTM runtime capture remains valid historical evidence:

```text
HAR SHA-256 = c59f3a3c0c075412595bfda2dd1155a48fa0d0689f5f27264010076348bb7446
Green /page/view = OBSERVED / PLATFORM_INJECTED
GTM/GA4/Meta = NOT_OBSERVED_AT_T0
YouTube telemetry = OBSERVED / THIRD_PARTY_MEDIA
www -> non-www Green double page-view risk = OPEN INPUT FOR MNT-M2-02
```

The T0 statement `GTM NOT_OBSERVED` is no longer current runtime truth. It is bounded to the historical capture before the later GTM publication.

## 4. GTM / Consent T1 — published and validated

Evidence:
`docs/measurement/MNT_M2_GTM_CONSENT_T1_2026-09-10.md`.

Current supported claims:

```text
GTM_CONTAINER = GTM-PGCR4R47
PUBLISHED_GTM_VERSION = 4
GTM_CONSENT_MODE_STATE_HANDLING = IMPLEMENTED / PUBLISHED / VALIDATED
```

Validated behavior:

```text
DEFAULT:
ad_storage = denied
analytics_storage = denied
ad_user_data = denied
ad_personalization = denied

GREEN "Continuar":
all four -> granted

GREEN "Cancelar":
all four -> denied

Persistence after reload:
granted = PROVEN
denied = PROVEN
```

Therefore:

```text
MNT-M2-07 = COMPLETE
MNT-M2-08 = COMPLETE
MNT-M2-09 = PARTIAL_IMPLEMENTED
```

This does not prove GA4, Google Ads, Meta Pixel/CAPI, canonical event taxonomy, conversion definitions or end-to-end Measurement QA.

## 5. Measurement remaining work

The obsolete state:

`MEASUREMENT = NOT_CONFIGURED_OR_NOT_PROVEN_FOR_MORENUMTEGRA`

must not be used after this reconciliation.

The correct state is:

```text
GTM / CONSENT FOUNDATION = IMPLEMENTED / PUBLISHED / VALIDATED
FULL MEASUREMENT STACK = INCOMPLETE
GA4 = NOT_YET_PROVEN
GOOGLE ADS CONVERSIONS = NOT_YET_PROVEN
META PIXEL / DATASET / CAPI = NOT_YET_PROVEN
EVENT TAXONOMY = OPEN
PRIMARY / SECONDARY CONVERSIONS = OPEN
END-TO-END MEASUREMENT QA = OPEN
```

The next unresolved task in sequence is `MNT-M2-02 — Define transport architecture and duplicate-event prevention`.

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

MoreNumTegra publishes project truth. SFJM Workspace only consumes/renders it.

Workspace refresh remains blocked until this reconciliation is canonical in MoreNumTegra `main` and a new exact `main` SHA is resolved.

Consumer precedence remains:

1. `PROJECT_READ_MODEL.json` — entrypoint/summary;
2. `CURRENT_PROGRAM_STATE.json` — current lifecycle/progress;
3. `PROGRAM_TASK_GRAPH.json` — hierarchy/planning hours;
4. `NEXT_SAFE_ACTION.md` — execution authority.

## 8. External gates

Additional GTM changes, GA4, Meta/CAPI, Green Pixel, Google Ads/spend, DNS, Search Console mutation, Vercel Production and Green publication remain separate gated mutations.

Authority for continuity: `docs/NEXT_SAFE_ACTION.md`.
