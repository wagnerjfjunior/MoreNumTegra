# Handoff Atual — MoreNumTegra

- Status: `atual`
- Atualizado em: `2026-09-10`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra`
- Referência: `main` — resolver SHA live antes de agir
- Release comercial publicada: `18cfab98e01be29c86d78d08f2f5035a8da70444`
- Produção comercial: `https://moretegra.com.br/`
- Homologação Vercel: `https://morenumtegra.vercel.app/`
- Programa: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Última fase concluída: `MNT-M1 / COMPLETE`
- Próxima fase: `MNT-M2 / PLANNED_NOT_AUTHORIZED`
- MNT-M1 merge anchor: `dba0de3bfefc7aec90c5a88588c54eae4317c61f`
- Baseline funcional: `docs/baseline/FUNCTIONAL_BASELINE_V2.md`
- Baseline técnica: `docs/baseline/TECHNICAL_BASELINE_V2_2.md`

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
- Measurement MoreNumTegra ainda não configurado/provado;
- LGPD modal ativo, enforcement técnico não provado.

## 2. Programa canônico / Workspace

Entrypoints publicados pelo projeto:

- `docs/sfjm/PROJECT_READ_MODEL.json` — resumo para consumer;
- `docs/sfjm/CURRENT_PROGRAM_STATE.json` — estado/progresso vigente;
- `docs/sfjm/PROGRAM_TASK_GRAPH.json` — hierarquia/planning hours;
- `docs/roadmap/MNT_RESF_SEARCH_TO_LEAD_WBS.md` — WBS humana;
- `docs/sfjm/PROGRAM_TASK_GRAPH.md` — contrato de consumo.

Estado atual:

```text
MNT-M0  COMPLETE
MNT-M1  COMPLETE
MNT-M2  PLANNED_NOT_AUTHORIZED / NEXT
MNT-M3  PLANNED
MNT-M4  PLANNED
MNT-M5  PLANNED
MNT-M6  PLANNED
MNT-M7  PLANNED
```

Planejamento:

```text
forecast total = 1240h
accepted scope-equivalent = 256h
remaining forecast = 984h
program progress = 20.65%
```

Horas são planning/scope-equivalent, não timesheet real.

## 3. RESF v1

Adoção seletiva foi consolidada pela PR #39, merge `dba0de3bfefc7aec90c5a88588c54eae4317c61f`.

Provider pin:
`wagnerjfjunior/Blogs-sites-portais-seo@7a61aa036d677015ee4540ca8c5dc9a41f0165d4`.

Wave 1:

- RESF-INTELLIGENCE
- RESF-PRODUCT-TRUTH
- RESF-IA
- RESF-UX
- RESF-CONVERSION
- RESF-TRACKING
- RESF-LEAD
- RESF-CRM
- RESF-CONSENT

Deferred modules permanecem disponíveis para adoção posterior explícita.

## 4. GSC T0

`docs/evidence/search/GSC_BASELINE_2026-09-10.md`:

```text
clicks = 0
impressions = 17
CTR = 0%
average position = 26.1
```

`EARLY_DISCOVERY / INSUFFICIENT_VOLUME_FOR_TREND_OR_CAUSALITY_CLAIMS`.

## 5. Continuidade atual

Não há fase técnica nova automaticamente ativa após MNT-M1.

```text
CURRENT_ACTIVE_PHASE = NONE
CURRENT_ACTIVE_TASK = NONE
NEXT_PHASE = MNT-M2
NEXT_TASK_CANDIDATE = MNT-M2-01
MNT-M2_START = NOT_AUTHORIZED
```

Única próxima ação segura: decisão explícita da Product Authority sobre o início bounded de MNT-M2 em `READ_ONLY / DESIGN`.

Autoridade: `docs/NEXT_SAFE_ACTION.md`.

## 6. SFJM Workspace consumption boundary

MoreNumTegra é autoridade para objetivo, WBS, tarefas, estados, horas publicadas, autorização, evidência e próxima ação.

SFJM Workspace pode consumir/renderizar, mas não pode criar ou alterar esses fatos.

Consumer atual deve:

1. resolver `wagnerjfjunior/MoreNumTegra@main` live;
2. registrar SHA e timestamp observados;
3. ler bootstrap/handoff/status/next-safe-action/blocked-actions;
4. ler `PROJECT_READ_MODEL.json`;
5. aplicar `CURRENT_PROGRAM_STATE.json` para estado/progresso vigente;
6. usar `PROGRAM_TASK_GRAPH.json` para hierarquia e planning hours;
7. marcar snapshot stale quando o SHA observado divergir do `main` live.

## 7. Gates externos preservados

MNT-M1 completo não autoriza GTM/GA4/Meta/CAPI, Green Pixel, consent runtime, Google Ads/campaign/spend, DNS, Search Console mutation, Vercel Production, Green publication, FECH.AI/n8n/Make ou segredo no cliente.

`COMPLETE != NEXT_PHASE_AUTHORIZED`.
