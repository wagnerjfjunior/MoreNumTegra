# Status do Projeto — MoreNumTegra

- Data de referência: `2026-09-10`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra`
- Referência: `main` — resolver SHA live antes de agir
- Release comercial publicada: `18cfab98e01be29c86d78d08f2f5035a8da70444`
- Produto V1: `GREEN_COMMERCIAL_V1_SEARCH_INDEXED / OPERATIONAL`
- Programa: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Última fase concluída: `MNT-M1 — RESF Adoption & Existing-State Reconciliation / COMPLETE`
- Próxima fase: `MNT-M2 — Measurement Foundation & Consent / PLANNED_NOT_AUTHORIZED`
- MNT-M1 closure anchor: PR `#39` / merge `dba0de3bfefc7aec90c5a88588c54eae4317c61f`
- Saúde operacional do V1: `verde`

## 1. Produção atual

- Green Sales: `https://moretegra.com.br/`
- Vercel homologation: `https://morenumtegra.vercel.app/`
- release Green registrada: `18cfab98e01be29c86d78d08f2f5035a8da70444`
- smoke Green: `PASS` por confirmação do owner
- Form 46, filtros, CTA, WhatsApp e mobile: documentados como funcionais na release aceita

Preservar:

```text
LIVE V1 OPERATIONAL != MNT-RESF PROGRAM COMPLETE
MNT-RESF PROGRAM PROGRESS != V1 PRODUCT READINESS
```

## 2. Programa MNT-RESF

Fontes:

- WBS humana: `docs/roadmap/MNT_RESF_SEARCH_TO_LEAD_WBS.md`;
- task graph estrutural: `docs/sfjm/PROGRAM_TASK_GRAPH.json`;
- current-state overlay: `docs/sfjm/CURRENT_PROGRAM_STATE.json`;
- read model para consumers: `docs/sfjm/PROJECT_READ_MODEL.json`;
- contrato de consumo: `docs/sfjm/PROGRAM_TASK_GRAPH.md`.

Estado vigente:

```text
MNT-M0  V1 Foundation & Commercial Production                    COMPLETE
MNT-M1  RESF Adoption & Existing-State Reconciliation             COMPLETE
MNT-M2  Measurement Foundation & Consent                          PLANNED_NOT_AUTHORIZED
MNT-M3  Intelligence, Product Truth & Search Contract              PLANNED
MNT-M4  IA, Content, Schema, GEO/AEO & Linking                    PLANNED
MNT-M5  UX, Performance, Conversion, Lead & CRM                    PLANNED
MNT-M6  Attribution & Paid Media Readiness                         PLANNED
MNT-M7  QA, Release, Observability & Learning Loop                 PLANNED
```

Planning forecast após fechamento de MNT-M1:

```text
forecast total                = 1240h
accepted scope-equivalent     = 256h
remaining forecast            = 984h
program progress              = 20.65%
```

M0 representa estimativa retrospectiva de escopo equivalente. M1 usa o forecast de planejamento aceito como scope-equivalent após conclusão do lifecycle. Nenhum desses números é timesheet real.

## 3. MNT-M1 — encerrado

PR #39 publicou e consolidou:

- adoção seletiva do RESF v1 pinada no provider imutável `7a61aa036d677015ee4540ca8c5dc9a41f0165d4`;
- existing-state reconciliation;
- WBS M0–M7;
- task graph/read model para SFJM Workspace;
- GSC T0 de 2026-09-10;
- regras de provenance, staleness e não invenção pelo consumer.

MNT-M1 não alterou runtime, tracking, DNS, Search Console, Ads ou produção comercial.

## 4. RESF v1 adoption

Manifest:
`docs/frameworks/resf/ADOPTION.yaml`.

Baseline:
`docs/frameworks/resf/ADOPTION_BASELINE.md`.

Provider pin:
`wagnerjfjunior/Blogs-sites-portais-seo@7a61aa036d677015ee4540ca8c5dc9a41f0165d4`.

Mode: `SELECTIVE`.

Wave 1:
`RESF-INTELLIGENCE`, `RESF-PRODUCT-TRUTH`, `RESF-IA`, `RESF-UX`, `RESF-CONVERSION`, `RESF-TRACKING`, `RESF-LEAD`, `RESF-CRM`, `RESF-CONSENT`.

Módulos restantes continuam deferred, não rejeitados.

## 5. Search / GSC

P0-B permanece `PASS_WITH_RESIDUAL_RISK`.

Residuals:

- canonical client-side;
- sitemap indisponível;
- `www` sem 301/308 HTTP comprovado;
- warning `web-share` histórico.

GSC T0 em `docs/evidence/search/GSC_BASELINE_2026-09-10.md`:

```text
clicks = 0
impressions = 17
CTR = 0%
average position = 26.1
```

Classificação: `EARLY_DISCOVERY / INSUFFICIENT_VOLUME_FOR_TREND_OR_CAUSALITY_CLAIMS`.

## 6. Measurement / consent

```text
MEASUREMENT = NOT_CONFIGURED_OR_NOT_PROVEN_FOR_MORENUMTEGRA
LGPD MODAL = ACTIVE
CONSENT ENFORCEMENT = NOT_PROVEN
MNT-M2 START = NOT_AUTHORIZED
```

A próxima decisão segura é autorizar ou não o início bounded de MNT-M2 em `READ_ONLY / DESIGN`. Isso não equivale a autorizar implementação de tracking.

## 7. SFJM Workspace boundary

MoreNumTegra publica a verdade do projeto. SFJM Workspace apenas consome/renderiza.

O consumer deve resolver `main` live, registrar SHA/data observados e combinar:

1. `PROJECT_READ_MODEL.json` para visão resumida;
2. `CURRENT_PROGRAM_STATE.json` para estado/progresso vigente;
3. `PROGRAM_TASK_GRAPH.json` para hierarquia e planning hours.

Current-state overlay posterior prevalece sobre estados de lifecycle capturados em um task-graph estrutural anterior; isso não autoriza o Workspace a inventar tarefas, horas, estados ou autorizações.

## 8. Gates externos

Continuam separados e sem autorização implícita: GTM, GA4, Meta/CAPI, Green Pixel, consent runtime, Google Ads/spend, DNS, Search Console mutation, Vercel Production, Green publication, FECH.AI/n8n/Make e qualquer arquitetura com segredo.

Autoridade para continuidade: `docs/NEXT_SAFE_ACTION.md`.
