# Status do Projeto — MoreNumTegra

- Data de referência: `2026-09-10`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra`
- Referência: `main` — resolver SHA live antes de agir
- Release comercial publicada: `18cfab98e01be29c86d78d08f2f5035a8da70444`
- Produto V1: `GREEN_COMMERCIAL_V1_SEARCH_INDEXED / OPERATIONAL`
- Programa: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Última fase concluída: `MNT-M1 — RESF Adoption & Existing-State Reconciliation / COMPLETE`
- Fase atual: `MNT-M2 — Measurement Foundation & Consent / ACTIVE_WAITING_NEXT_TASK_AUTHORIZATION`
- Última task executada: `MNT-M2-01 — Inventory tracking already present in live runtime / COMPLETE_CANDIDATE`
- Próxima task candidata: `MNT-M2-02 — Define transport architecture and duplicate-event prevention / PLANNED_NOT_AUTHORIZED`
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
TASK COMPLETE CANDIDATE != CANONICAL ACCEPTED UNTIL PR MERGE
```

## 2. Programa MNT-RESF

Fontes:

- WBS humana: `docs/roadmap/MNT_RESF_SEARCH_TO_LEAD_WBS.md`;
- task graph estrutural: `docs/sfjm/PROGRAM_TASK_GRAPH.json`;
- current-state overlay: `docs/sfjm/CURRENT_PROGRAM_STATE.json`;
- read model para consumers: `docs/sfjm/PROJECT_READ_MODEL.json`;
- contrato de consumo: `docs/sfjm/PROGRAM_TASK_GRAPH.md`.

Estado candidato após conclusão da evidência MNT-M2-01:

```text
MNT-M0  V1 Foundation & Commercial Production                    COMPLETE
MNT-M1  RESF Adoption & Existing-State Reconciliation             COMPLETE
MNT-M2  Measurement Foundation & Consent                          ACTIVE_WAITING_NEXT_TASK_AUTHORIZATION
  MNT-M2-01 Inventory tracking already present in live runtime    COMPLETE_CANDIDATE / PENDING_PR_LIFECYCLE
  MNT-M2-02 Transport architecture and duplicate prevention       PLANNED_NOT_AUTHORIZED
MNT-M3  Intelligence, Product Truth & Search Contract              PLANNED
MNT-M4  IA, Content, Schema, GEO/AEO & Linking                    PLANNED
MNT-M5  UX, Performance, Conversion, Lead & CRM                    PLANNED
MNT-M6  Attribution & Paid Media Readiness                         PLANNED
MNT-M7  QA, Release, Observability & Learning Loop                 PLANNED
```

Estado de progresso pretendido após merge da PR #41:

```text
forecast total                = 1240h
accepted scope-equivalent     = 264h
remaining forecast            = 976h
program progress              = 21.29%
```

Horas são planning/scope-equivalent, não timesheet real. As 8h de MNT-M2-01 tornam-se canônicas apenas com integração da PR #41 em `main`.

## 3. MNT-M2-01 — evidência concluída

Evidência:
`docs/measurement/MNT_M2_01_TRACKING_RUNTIME_INVENTORY_2026-09-10.md`.

A inspeção project-owned + DevTools/HAR do runtime comercial suporta:

```text
PROJECT_OWNED GTM bootstrap = NOT_OBSERVED
PROJECT_OWNED GA4/gtag/dataLayer = NOT_OBSERVED
PROJECT_OWNED Meta fbq/connect.facebook.net = NOT_OBSERVED
VERCEL PREVIEW PROJECT-OWNED TRACKING = NOT_OBSERVED
GREEN FORM 46 LEAD CAPTURE = PRESENT
GREEN/GDIGITAL POST /page/view = OBSERVED / PLATFORM_INJECTED
YOUTUBE EMBED TELEMETRY = OBSERVED / THIRD_PARTY_MEDIA
GTM RUNTIME = NOT_OBSERVED IN CAPTURED SESSION
GA4 RUNTIME = NOT_OBSERVED IN CAPTURED SESSION
META PIXEL RUNTIME = NOT_OBSERVED IN CAPTURED SESSION
CLARITY/HOTJAR/DOUBLECLICK = NOT_OBSERVED IN CAPTURED SESSION
CONSENT ENFORCEMENT = NOT_PROVEN
```

HAR fingerprint:
`c59f3a3c0c075412595bfda2dd1155a48fa0d0689f5f27264010076348bb7446`.

A navegação observada carregou `www.moretegra.com.br` e depois `moretegra.com.br`, e cada página gerou um `POST https://back.gdigital.com.br/page/view` com page IDs Green distintos (`293` e `292`). Isso é registrado como `DUPLICATE_MEASUREMENT_RISK` para MNT-M2-02, sem adjudicar ainda se é defeito da plataforma.

O embed `youtube-nocookie.com` também produziu telemetria de playback/QoE/watchtime/log_event. Isso não prova GA4 ou Google Ads, mas deve entrar no desenho futuro de consentimento.

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
MNT-M2 = ACTIVE_WAITING_NEXT_TASK_AUTHORIZATION
MNT-M2-01 = COMPLETE_CANDIDATE / PENDING_PR_LIFECYCLE
MNT-M2-02 = PLANNED_NOT_AUTHORIZED
MORENUMTEGRA PROJECT-OWNED MEASUREMENT = NOT_CONFIGURED
GREEN/GDIGITAL PAGE-VIEW TELEMETRY = OBSERVED
YOUTUBE MEDIA TELEMETRY = OBSERVED
LGPD MODAL = ACTIVE
CONSENT ENFORCEMENT = NOT_PROVEN
TRACKING IMPLEMENTATION AUTHORITY = NONE
```

## 7. SFJM Workspace boundary

MoreNumTegra publica a verdade do projeto. SFJM Workspace apenas consome/renderiza.

O consumer deve resolver `main` live, registrar SHA/data observados e combinar:

1. `PROJECT_READ_MODEL.json` para visão resumida;
2. `CURRENT_PROGRAM_STATE.json` para estado/progresso vigente;
3. `PROGRAM_TASK_GRAPH.json` para hierarquia e planning hours.

Current-state overlay posterior prevalece sobre estados de lifecycle capturados em um task-graph estrutural anterior; isso não autoriza o Workspace a inventar tarefas, horas, estados ou autorizações.

## 8. Próxima ação segura

Completar o lifecycle da PR #41 que registra MNT-M2-01. Após aceitação canônica, o próximo candidato é `MNT-M2-02 — Define transport architecture and duplicate-event prevention`, ainda `PLANNED_NOT_AUTHORIZED` até decisão explícita da Product Authority.

Autoridade: `docs/NEXT_SAFE_ACTION.md`.

## 9. Gates externos

Continuam separados e sem autorização implícita: GTM, GA4, Meta/CAPI, Green Pixel, consent runtime, Google Ads/spend, DNS, Search Console mutation, Vercel Production, Green publication, FECH.AI/n8n/Make e qualquer arquitetura com segredo.
