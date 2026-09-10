# Handoff Atual — MoreNumTegra

- Status: `candidate MNT-M2-02 / pending PR lifecycle`
- Atualizado em: `2026-09-10`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra`
- Referência: `main` — resolver SHA live antes de agir
- Main resolved at MNT-M2-02 start: `f0e89bfc159e7638347997b46290c919f2e5efc7`
- Release comercial publicada: `18cfab98e01be29c86d78d08f2f5035a8da70444`
- Produção comercial: `https://moretegra.com.br/`
- Homologação Vercel: `https://morenumtegra.vercel.app/`
- Programa: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Fase atual: `MNT-M2 / ACTIVE`
- Candidate atual: `MNT-M2-02 / COMPLETE_CANDIDATE`
- Próxima task após aceite: `MNT-M2-03 / PLANNED_NOT_AUTHORIZED`
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

### T0 histórico — MNT-M2-01

`docs/measurement/MNT_M2_01_TRACKING_RUNTIME_INVENTORY_2026-09-10.md`

```text
HAR = c59f3a3c0c075412595bfda2dd1155a48fa0d0689f5f27264010076348bb7446
Green /page/view = OBSERVED / PLATFORM_INJECTED
GTM/GA4/Meta = NOT_OBSERVED_AT_T0
www -> non-www generated two Green page-view writes with distinct page IDs
```

Esse `GTM NOT_OBSERVED` permanece prova histórica pre-GTM e não é verdade atual.

### T1 — GTM Consent

`docs/measurement/MNT_M2_GTM_CONSENT_T1_2026-09-10.md`

```text
GTM container = GTM-PGCR4R47
Published version = 4
Consent Mode = IMPLEMENTED / PUBLISHED / VALIDATED
DEFAULT = denied / denied / denied / denied
Continuar = granted / granted / granted / granted
Cancelar = denied / denied / denied / denied
Persistence after reload = PROVEN
```

Canonical adjudication before MNT-M2-02:

```text
MNT-M2-01 = COMPLETE
MNT-M2-07 = COMPLETE
MNT-M2-08 = COMPLETE
MNT-M2-09 = PARTIAL_IMPLEMENTED
accepted = 296h / 1240h
progress = 23.87%
```

## 3. MNT-M2-02 — transport/dedup candidate

Product Authority explicitly authorized MNT-M2-02 start on `2026-09-10`.

Evidence/design:

`docs/measurement/MNT_M2_02_TRANSPORT_DEDUP_ARCHITECTURE_2026-09-10.md`

Core architecture:

```text
GTM-PGCR4R47 = sole project-owned browser dispatcher
moretegra.com.br = only eligible project Measurement production hostname
www.moretegra.com.br = no project-owned business/page Measurement
Green /page/view = platform telemetry / never forwarded as MoreNumTegra business event
one project page-view path per canonical document load
one semantic dataLayer origin per event occurrence
mnt_event_id = reserved cross-destination dedup identity
CTA_CLICK / SUBMIT_ATTEMPT != LEAD
verified Green Form 46 success required for lead conversion
YouTube operational telemetry != project conversion
```

The historical Green double `/page/view` remains platform behavior. MNT-M2-02 controls future project-owned Measurement instead of claiming to alter Green telemetry.

Runtime enforcement remains pending MNT-M2-09 and end-to-end proof remains MNT-M2-10.

Candidate lifecycle:

```text
MNT-M2-02 = COMPLETE_CANDIDATE / PENDING_PR_LIFECYCLE
```

If accepted:

```text
accepted = 312h / 1240h
remaining = 928h
progress = 25.16%
```

## 4. Programa / SFJM consumer

Entrypoints project-owned:

- `docs/sfjm/PROJECT_READ_MODEL.json`;
- `docs/sfjm/CURRENT_PROGRAM_STATE.json`;
- `docs/sfjm/PROGRAM_TASK_GRAPH.json`;
- `docs/roadmap/MNT_RESF_SEARCH_TO_LEAD_WBS.md`;
- `docs/NEXT_SAFE_ACTION.md`.

Candidate state:

```text
MNT-M0  COMPLETE
MNT-M1  COMPLETE
MNT-M2  ACTIVE
  M2-01 COMPLETE
  M2-02 COMPLETE_CANDIDATE
  M2-03 PLANNED_NOT_AUTHORIZED / NEXT AFTER ACCEPTANCE
  M2-07 COMPLETE
  M2-08 COMPLETE
  M2-09 PARTIAL_IMPLEMENTED
MNT-M3..M7 PLANNED
```

`PROGRAM_TASK_GRAPH` owns hierarchy/planning hours; `CURRENT_PROGRAM_STATE` owns lifecycle/progress; `NEXT_SAFE_ACTION` owns execution authority.

## 5. Próxima task

After MNT-M2-02 canonical acceptance only:

`MNT-M2-03 — Define canonical event taxonomy`

MNT-M2-03 is not authorized by the MNT-M2-02 start/completion authority.

## 6. Search residuals preserved

Unchanged:

- canonical client-side;
- sitemap unavailable;
- `www` without proven HTTP 301/308 semantics;
- historical `web-share` warning.

These Search/DNS residuals are not silently solved by the Measurement canonical-host gate.

## 7. SFJM Workspace boundary

Workspace is read-only derived representation. It must refresh only from a newly resolved exact MoreNumTegra `main` after this candidate lifecycle is canonical.

## 8. External gates preserved

No further GTM, GA4, Meta/CAPI, Green Pixel, Google Ads/campaign/spend, DNS, Search Console mutation, Vercel Production, Green publication, FECH.AI/n8n/Make or secrets are authorized by this design task.
