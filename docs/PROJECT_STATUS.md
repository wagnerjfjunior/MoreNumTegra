# Status do Projeto — MoreNumTegra

- Data de referência: `2026-09-10`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra`
- Referência: `main` — resolver SHA live antes de agir
- Main resolved at MNT-M2-02 start: `f0e89bfc159e7638347997b46290c919f2e5efc7`
- Release comercial publicada: `18cfab98e01be29c86d78d08f2f5035a8da70444`
- Produto V1: `GREEN_COMMERCIAL_V1_SEARCH_INDEXED / OPERATIONAL`
- Programa: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Fase atual: `MNT-M2 — Measurement Foundation & Consent / ACTIVE`
- Candidate atual: `MNT-M2-02 — COMPLETE_CANDIDATE / PENDING_PR_LIFECYCLE`
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
DESIGN COMPLETE != RUNTIME IMPLEMENTED
COMPLETE_CANDIDATE != CANONICAL COMPLETE UNTIL MERGE
```

## 2. Programa MNT-RESF

Fontes:

- WBS humana: `docs/roadmap/MNT_RESF_SEARCH_TO_LEAD_WBS.md`;
- task graph estrutural: `docs/sfjm/PROGRAM_TASK_GRAPH.json`;
- current-state overlay: `docs/sfjm/CURRENT_PROGRAM_STATE.json`;
- read model para consumers: `docs/sfjm/PROJECT_READ_MODEL.json`;
- contrato de consumo: `docs/sfjm/PROGRAM_TASK_GRAPH.md`.

Candidate lifecycle:

```text
MNT-M0  COMPLETE
MNT-M1  COMPLETE
MNT-M2  ACTIVE
  MNT-M2-01  COMPLETE
  MNT-M2-02  COMPLETE_CANDIDATE / PENDING_PR_LIFECYCLE
  MNT-M2-03  PLANNED_NOT_AUTHORIZED / NEXT AFTER ACCEPTANCE
  MNT-M2-04  PLANNED
  MNT-M2-05  PARTIAL_EVIDENCE
  MNT-M2-06  PLANNED
  MNT-M2-07  COMPLETE
  MNT-M2-08  COMPLETE
  MNT-M2-09  PARTIAL_IMPLEMENTED
  MNT-M2-10  PLANNED
MNT-M3..MNT-M7  PLANNED
```

Canonical accepted progress remains `296h / 23.87%` until MNT-M2-02 is merged.

Intended post-merge planning forecast:

```text
forecast total                = 1240h
accepted scope-equivalent     = 312h
remaining forecast            = 928h
program progress              = 25.16%
```

Accepted M2 scope-equivalent after merge would be:

- `MNT-M2-01 = 8h`;
- `MNT-M2-02 = 16h`;
- `MNT-M2-07 = 16h`;
- `MNT-M2-08 = 16h`.

`MNT-M2-09` remains partial and contributes `0h accepted` until its full exit criteria are accepted.

Horas são planning/scope-equivalent, não timesheet real.

## 3. MNT-M2-01 — T0 histórico preservado

Evidence:
`docs/measurement/MNT_M2_01_TRACKING_RUNTIME_INVENTORY_2026-09-10.md`.

```text
HAR SHA-256 = c59f3a3c0c075412595bfda2dd1155a48fa0d0689f5f27264010076348bb7446
Green /page/view = OBSERVED / PLATFORM_INJECTED
GTM/GA4/Meta = NOT_OBSERVED_AT_T0
YouTube telemetry = OBSERVED / THIRD_PARTY_MEDIA
www -> non-www Green double page-view risk = INPUT FOR MNT-M2-02
```

The T0 statement `GTM NOT_OBSERVED` is bounded to the historical capture before the later GTM publication.

## 4. GTM / Consent T1 — published and validated

Evidence:
`docs/measurement/MNT_M2_GTM_CONSENT_T1_2026-09-10.md`.

```text
GTM_CONTAINER = GTM-PGCR4R47
PUBLISHED_GTM_VERSION = 4
GTM_CONSENT_MODE_STATE_HANDLING = IMPLEMENTED / PUBLISHED / VALIDATED
```

Validated behavior:

```text
DEFAULT = denied / denied / denied / denied
GREEN Continuar = granted / granted / granted / granted
GREEN Cancelar = denied / denied / denied / denied
Persistence after reload = PROVEN for granted and denied
```

Therefore already canonical:

```text
MNT-M2-07 = COMPLETE
MNT-M2-08 = COMPLETE
MNT-M2-09 = PARTIAL_IMPLEMENTED
```

This does not prove GA4, Google Ads, Meta Pixel/CAPI, canonical event taxonomy, conversion definitions or end-to-end Measurement QA.

## 5. MNT-M2-02 — transport/dedup architecture

Product Authority explicitly authorized MNT-M2-02 start on 2026-09-10.

Evidence/design:

`docs/measurement/MNT_M2_02_TRANSPORT_DEDUP_ARCHITECTURE_2026-09-10.md`.

Candidate decisions:

```text
PROJECT_BROWSER_DISPATCHER = GTM-PGCR4R47
PROJECT_MEASUREMENT_CANONICAL_HOST = moretegra.com.br
WWW_ALIAS_PROJECT_BUSINESS_MEASUREMENT = BLOCK
GREEN_/page/view = PLATFORM_TELEMETRY / DO_NOT_FORWARD_AS_BUSINESS_EVENT
PROJECT_PAGE_VIEW_OWNER = GTM / EXACTLY_ONE_PATH
SEMANTIC_EVENT_ORIGIN = ONE dataLayer EVENT
CROSS_DESTINATION_EVENT_ID = mnt_event_id
CTA_CLICK != LEAD
ONLY_VERIFIED_FORM46_SUCCESS_MAY_BECOME_LEAD
YOUTUBE_TELEMETRY != PROJECT_CONVERSION
```

MNT-M2-02 does not modify Green's platform telemetry. It defines project-owned prevention so future GA4/Ads/Meta business Measurement cannot fire on both `www` and canonical non-www.

The architecture also forbids simultaneous automatic and manual project page-view paths. Runtime enforcement remains pending authorized implementation in MNT-M2-09 and proof in MNT-M2-10.

Candidate state:

`MNT-M2-02 = COMPLETE_CANDIDATE / PENDING_PR_LIFECYCLE`.

## 6. Measurement remaining work

```text
TRANSPORT / DEDUP ARCHITECTURE = COMPLETE_CANDIDATE
EVENT TAXONOMY = OPEN / MNT-M2-03
PRIMARY / SECONDARY CONVERSIONS = OPEN / MNT-M2-04
GTM / GA4 OWNERSHIP = PARTIAL / MNT-M2-05
META OWNERSHIP = OPEN / MNT-M2-06
TRACKING IMPLEMENTATION = PARTIAL / MNT-M2-09
END-TO-END MEASUREMENT QA = OPEN / MNT-M2-10
```

No GA4, Google Ads or Meta implementation is authorized by MNT-M2-02 alone.

## 7. Search / GSC

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

## 8. SFJM Workspace boundary

MoreNumTegra publishes project truth. SFJM Workspace only consumes/renders it.

Consumer precedence:

1. `PROJECT_READ_MODEL.json` — entrypoint/summary;
2. `CURRENT_PROGRAM_STATE.json` — current lifecycle/progress;
3. `PROGRAM_TASK_GRAPH.json` — hierarchy/planning hours;
4. `NEXT_SAFE_ACTION.md` — execution authority.

The Workspace must not represent MNT-M2-02 as accepted until this candidate is merged and a new exact MoreNumTegra `main` is resolved.

## 9. External gates

Further GTM changes, GA4, Meta/CAPI, Green Pixel, Google Ads/spend, DNS, Search Console mutation, Vercel Production and Green publication remain separate gated mutations.

Authority for continuity: `docs/NEXT_SAFE_ACTION.md`.
