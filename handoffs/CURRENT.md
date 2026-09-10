# Handoff Atual — MoreNumTegra

- Status: `atual após integração desta reconciliação`
- Atualizado em: `2026-09-10`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra`
- Referência: `main` — resolver SHA live antes de agir
- Reconciliation base main: `34ddd9684608a0fe1e02edc5071fd6e40b5f2121`
- Release comercial publicada: `18cfab98e01be29c86d78d08f2f5035a8da70444`
- Produção comercial: `https://moretegra.com.br/`
- Homologação Vercel: `https://morenumtegra.vercel.app/`
- Programa: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Fase atual: `MNT-M2 / ACTIVE_WAITING_NEXT_TASK_AUTHORIZATION`
- Próxima task candidata: `MNT-M2-02 / PLANNED_NOT_AUTHORIZED`
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

## 2. Measurement / Consent — estado reconciliado

O snapshot anterior que dizia `Measurement not configured/proven` e `Consent enforcement not proven` ficou stale após execução em campo em 2026-09-10.

### T0 histórico — MNT-M2-01

`docs/measurement/MNT_M2_01_TRACKING_RUNTIME_INVENTORY_2026-09-10.md`

```text
HAR = c59f3a3c0c075412595bfda2dd1155a48fa0d0689f5f27264010076348bb7446
Green /page/view = OBSERVED / PLATFORM_INJECTED
GTM/GA4/Meta = NOT_OBSERVED_AT_T0
www -> non-www generated two Green page-view writes with distinct page IDs
```

Esse `GTM NOT_OBSERVED` permanece prova histórica pre-GTM e não é verdade atual.

### T1 atual — GTM Consent

`docs/measurement/MNT_M2_GTM_CONSENT_T1_2026-09-10.md`

```text
GTM container = GTM-PGCR4R47
Published version = 4
Consent Mode = IMPLEMENTED / PUBLISHED / VALIDATED
```

Validado em GTM Preview / Tag Assistant:

```text
DEFAULT = denied / denied / denied / denied
Continuar = granted / granted / granted / granted
Cancelar = denied / denied / denied / denied
Persistence after reload = PROVEN for granted and denied
```

Adjudicação após integração desta reconciliação:

```text
MNT-M2-01 = COMPLETE
MNT-M2-07 = COMPLETE
MNT-M2-08 = COMPLETE
MNT-M2-09 = PARTIAL_IMPLEMENTED
```

Não inferir GA4/Ads/Meta/full Measurement a partir dessa evidência.

## 3. Programa canônico / SFJM consumer

Entrypoints project-owned:

- `docs/sfjm/PROJECT_READ_MODEL.json`;
- `docs/sfjm/CURRENT_PROGRAM_STATE.json`;
- `docs/sfjm/PROGRAM_TASK_GRAPH.json`;
- `docs/roadmap/MNT_RESF_SEARCH_TO_LEAD_WBS.md`;
- `docs/NEXT_SAFE_ACTION.md`.

Estado reconciliado:

```text
MNT-M0  COMPLETE
MNT-M1  COMPLETE
MNT-M2  ACTIVE_WAITING_NEXT_TASK_AUTHORIZATION
MNT-M3  PLANNED
MNT-M4  PLANNED
MNT-M5  PLANNED
MNT-M6  PLANNED
MNT-M7  PLANNED
```

Planning progress após integração:

```text
forecast total = 1240h
accepted scope-equivalent = 296h
remaining = 944h
progress = 23.87%
```

Accepted M2 hours are only M2-01 (8h), M2-07 (16h), M2-08 (16h). Partial M2-09 contributes no accepted hours.

## 4. Próxima task

`MNT-M2-02 — Define transport architecture and duplicate-event prevention` é a próxima task candidata.

Input obrigatório preservado:

- Green already emits platform-injected `/page/view`;
- T0 observed two writes across `www -> non-www` with distinct Green page IDs;
- project-owned future measurement must avoid duplicate business/page events;
- YouTube operational telemetry must not be classified as business conversion.

A reconciliação documental não autoriza nova mutação GTM/GA4/Meta/Green/Ads.

## 5. SFJM Workspace consumption boundary

MoreNumTegra é autoridade para objetivo, WBS, tarefas, estados, horas publicadas, autorização, evidência e próxima ação.

O Workspace PR #39 continua stale enquanto consumir o snapshot MoreNumTegra `347b62298d30ba3567a76d3f48a815e9f0f5b26c`.

Required order:

```text
reconcile MoreNumTegra
-> complete MoreNumTegra PR lifecycle
-> resolve new exact MoreNumTegra main SHA
-> refresh Workspace PR #39 from that exact SHA
-> validate WBS/progress/issues/provenance
-> independent exact-head review
-> lifecycle gates
```

Workspace must consume, not invent:

```text
PROGRAM_TASK_GRAPH = hierarchy/planning hours
CURRENT_PROGRAM_STATE = lifecycle/progress
NEXT_SAFE_ACTION = execution authority
MoreNumTegra main = project truth
```

## 6. Gates externos preservados

Additional GTM/GA4/Meta/CAPI, Green Pixel, Google Ads/campaign/spend, DNS, Search Console mutation, Vercel Production, Green publication, FECH.AI/n8n/Make or secrets remain separate gates.
