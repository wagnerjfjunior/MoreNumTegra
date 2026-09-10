# Status do Projeto — MoreNumTegra

- Data de referência: `2026-09-10`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra`
- Referência: `main` — resolver SHA live antes de agir
- Release comercial publicada: `18cfab98e01be29c86d78d08f2f5035a8da70444`
- Produto V1: `GREEN_COMMERCIAL_V1_SEARCH_INDEXED / OPERATIONAL`
- Programa: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Última fase concluída: `MNT-M1 — RESF Adoption & Existing-State Reconciliation / COMPLETE`
- Fase atual autorizada: `MNT-M2 — Measurement Foundation & Consent / ACTIVE_READ_ONLY_DESIGN`
- Tarefa atual: `MNT-M2-01 — Inventory tracking already present in live runtime / ACTIVE_PARTIAL_EVIDENCE`
- Base canônica no início de MNT-M2-01: `347b62298d30ba3567a76d3f48a815e9f0f5b26c`
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
READ_ONLY INVENTORY != TRACKING IMPLEMENTATION
```

## 2. Programa MNT-RESF

Fontes:

- WBS humana: `docs/roadmap/MNT_RESF_SEARCH_TO_LEAD_WBS.md`;
- task graph estrutural: `docs/sfjm/PROGRAM_TASK_GRAPH.json`;
- current-state overlay: `docs/sfjm/CURRENT_PROGRAM_STATE.json`;
- read model para consumers: `docs/sfjm/PROJECT_READ_MODEL.json`;
- contrato de consumo: `docs/sfjm/PROGRAM_TASK_GRAPH.md`.

Estado candidato após autorização de início de MNT-M2-01:

```text
MNT-M0  V1 Foundation & Commercial Production                    COMPLETE
MNT-M1  RESF Adoption & Existing-State Reconciliation             COMPLETE
MNT-M2  Measurement Foundation & Consent                          ACTIVE_READ_ONLY_DESIGN
  MNT-M2-01 Inventory tracking already present in live runtime    ACTIVE_PARTIAL_EVIDENCE
MNT-M3  Intelligence, Product Truth & Search Contract              PLANNED
MNT-M4  IA, Content, Schema, GEO/AEO & Linking                    PLANNED
MNT-M5  UX, Performance, Conversion, Lead & CRM                    PLANNED
MNT-M6  Attribution & Paid Media Readiness                         PLANNED
MNT-M7  QA, Release, Observability & Learning Loop                 PLANNED
```

Planejamento enquanto MNT-M2-01 não estiver aceita:

```text
forecast total                = 1240h
accepted scope-equivalent     = 256h
remaining forecast            = 984h
program progress              = 20.65%
```

Horas são planning/scope-equivalent, não timesheet real. As 8h planejadas de MNT-M2-01 só entram como aceitas após seus exit criteria.

## 3. MNT-M2-01 — execução bounded

Evidência:
`docs/measurement/MNT_M2_01_TRACKING_RUNTIME_INVENTORY_2026-09-10.md`.

Levantamento project-owned já suporta:

```text
PROJECT_OWNED GTM bootstrap = NOT_OBSERVED
PROJECT_OWNED GA4/gtag/dataLayer = NOT_OBSERVED
PROJECT_OWNED Meta fbq/connect.facebook.net = NOT_OBSERVED
PROJECT_OWNED sendBeacon measurement = NOT_OBSERVED
VERCEL PREVIEW PROJECT-OWNED TRACKING = NOT_OBSERVED
GREEN FORM 46 LEAD CAPTURE = PRESENT
SEARCH CONSOLE = PRESENT AS SEARCH OBSERVABILITY
GREEN/PLATFORM-INJECTED TRACKING = NOT_PROVEN
CONSENT ENFORCEMENT = NOT_PROVEN
```

A ausência de markers nos artefatos project-owned não prova ausência na página comercial montada pelo builder Green.

Para fechar MNT-M2-01 falta captura `READ_ONLY` de DOM/Network do runtime comercial, sem envio de PII e sem mutação.

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
MNT-M2 = ACTIVE_READ_ONLY_DESIGN
MNT-M2-01 = ACTIVE_PARTIAL_EVIDENCE
MEASUREMENT = NOT_CONFIGURED_OR_NOT_PROVEN_FOR_MORENUMTEGRA
LGPD MODAL = ACTIVE
CONSENT ENFORCEMENT = NOT_PROVEN
TRACKING IMPLEMENTATION AUTHORITY = NONE
```

A autorização atual permite somente levantamento/design bounded. GTM, GA4, Meta, Green Pixel, consent runtime, Ads e outras mutações continuam separados.

## 7. SFJM Workspace boundary

MoreNumTegra publica a verdade do projeto. SFJM Workspace apenas consome/renderiza.

O consumer deve resolver `main` live, registrar SHA/data observados e combinar:

1. `PROJECT_READ_MODEL.json` para visão resumida;
2. `CURRENT_PROGRAM_STATE.json` para estado/progresso vigente;
3. `PROGRAM_TASK_GRAPH.json` para hierarquia e planning hours.

Current-state overlay posterior prevalece sobre estados de lifecycle capturados em um task-graph estrutural anterior; isso não autoriza o Workspace a inventar tarefas, horas, estados ou autorizações.

## 8. Próxima ação segura

Completar MNT-M2-01 através de inspeção read-only de DOM/Network do runtime comercial e registrar a provenance dos scripts/requests de measurement.

Autoridade: `docs/NEXT_SAFE_ACTION.md`.

## 9. Gates externos

Continuam separados e sem autorização implícita: GTM, GA4, Meta/CAPI, Green Pixel, consent runtime, Google Ads/spend, DNS, Search Console mutation, Vercel Production, Green publication, FECH.AI/n8n/Make e qualquer arquitetura com segredo.
