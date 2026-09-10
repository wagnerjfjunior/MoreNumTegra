# Status do Projeto — MoreNumTegra

- Data de referência: `2026-09-10`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra`
- Referência: `main` — resolver SHA live antes de agir
- Produto V1: `GREEN_COMMERCIAL_V1_SEARCH_INDEXED / OPERATIONAL`
- Programa: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Fase atual: `MNT-M2 — Measurement Foundation & Consent / ACTIVE`
- Candidate atual: `MNT-M2-02 — COMPLETE_CANDIDATE / PENDING_PR_LIFECYCLE`
- Saúde operacional do V1: `verde`

## 1. Produção atual

MoreNumTegra V1 permanece operacional em Green Sales. A configuração Vercel permanece `MANUAL_GATE_DRIVEN`.

Preservar:

```text
LIVE_V1_OPERATIONAL != MNT_RESF_COMPLETE
DESIGN_COMPLETE != RUNTIME_IMPLEMENTED
COMPLETE_CANDIDATE != CANONICAL_COMPLETE_UNTIL_MERGE
```

## 2. Measurement / Consent já aceito

```text
MNT-M2-01 = COMPLETE
MNT-M2-07 = COMPLETE
MNT-M2-08 = COMPLETE
MNT-M2-09 = PARTIAL_IMPLEMENTED
```

Evidence:

- `docs/measurement/MNT_M2_01_TRACKING_RUNTIME_INVENTORY_2026-09-10.md`;
- `docs/measurement/MNT_M2_GTM_CONSENT_T1_2026-09-10.md`.

Current proven GTM baseline:

```text
GTM = GTM-PGCR4R47
Published Version = 4
Consent Mode = IMPLEMENTED / PUBLISHED / VALIDATED
Default = denied all four
Continuar = granted all four
Cancelar = denied all four
Persistence = PROVEN
```

## 3. MNT-M2-02 — transport/dedup candidate

Product Authority explicitly authorized MNT-M2-02 start on 2026-09-10.

Design evidence:

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

This design specifically addresses the T0 observation that the `www -> non-www` sequence produced two Green `/page/view` writes. It does not attempt to alter Green platform telemetry. Instead it prevents future project-owned Measurement from firing on the noncanonical `www` alias.

Runtime enforcement of these controls remains for authorized implementation and MNT-M2-10 QA.

## 4. Candidate WBS state

```text
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
```

Canonical progress remains the last merged value until this candidate is merged. Intended post-merge progress:

```text
forecast total = 1240h
accepted = 312h
remaining = 928h
progress = 25.16%
```

MNT-M2-09 partial still contributes `0 accepted hours`.

## 5. Remaining Measurement work

Still unresolved:

- canonical event taxonomy — MNT-M2-03;
- primary/secondary conversions — MNT-M2-04;
- GA4 ownership/property/Measurement ID — MNT-M2-05;
- Meta ownership — MNT-M2-06;
- remaining authorized tracking implementation — MNT-M2-09;
- end-to-end Measurement QA — MNT-M2-10.

No GA4, Google Ads or Meta implementation is authorized by MNT-M2-02 alone.

## 6. Search / other residuals

Search/indexability P0-B remains `PASS_WITH_RESIDUAL_RISK`. Existing canonical/sitemap/www HTTP redirect residuals remain separate from MNT-M2-02.

## 7. SFJM consumer boundary

Current lifecycle/progress authority: `docs/sfjm/CURRENT_PROGRAM_STATE.json`.
Hierarchy/planning-hours authority: `docs/sfjm/PROGRAM_TASK_GRAPH.json`.
Execution authority: `docs/NEXT_SAFE_ACTION.md`.

SFJM Workspace must consume the next canonical MoreNumTegra main after this candidate lifecycle; it must not infer candidate acceptance before merge.
