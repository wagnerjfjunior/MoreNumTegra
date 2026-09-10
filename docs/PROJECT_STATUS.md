# Status do Projeto — MoreNumTegra

- Data de referência: `2026-09-10`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra`
- Referência: `main` — resolver SHA live antes de agir
- Release comercial publicada: `18cfab98e01be29c86d78d08f2f5035a8da70444`
- Produto V1: `GREEN_COMMERCIAL_V1_SEARCH_INDEXED / OPERATIONAL`
- Programa atual: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Fase do programa: `MNT-M1 — RESF Adoption & Existing-State Reconciliation / ACTIVE`
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

Fonte humana:
`docs/roadmap/MNT_RESF_SEARCH_TO_LEAD_WBS.md`

Contrato machine-readable para SFJM Workspace/read-only consumers:
`docs/sfjm/PROGRAM_TASK_GRAPH.json`

Contrato de consumo:
`docs/sfjm/PROGRAM_TASK_GRAPH.md`

Fases:

```text
MNT-M0  V1 Foundation & Commercial Production                    COMPLETE
MNT-M1  RESF Adoption & Existing-State Reconciliation             ACTIVE
MNT-M2  Measurement Foundation & Consent                          PLANNED
MNT-M3  Intelligence, Product Truth & Search Contract              PLANNED
MNT-M4  IA, Content, Schema, GEO/AEO & Linking                    PLANNED
MNT-M5  UX, Performance, Conversion, Lead & CRM                    PLANNED
MNT-M6  Attribution & Paid Media Readiness                         PLANNED
MNT-M7  QA, Release, Observability & Learning Loop                 PLANNED
```

Initial planning forecast:

```text
forecast total                = 1240h
accepted scope-equivalent     = 160h
remaining forecast            = 1080h
pre-reconciliation progress   = 12.90%
```

Effort warning: these are project planning estimates. M0 hours are retrospective scope-equivalent estimates, not actual historical timesheets. Future hours are planning forecasts. Later project-published canonical task hours supersede estimates.

## 3. RESF v1 adoption

Consumer manifest:
`docs/frameworks/resf/ADOPTION.yaml`

Existing-state reconciliation:
`docs/frameworks/resf/ADOPTION_BASELINE.md`

Provider pinned at adoption:
`wagnerjfjunior/Blogs-sites-portais-seo@7a61aa036d677015ee4540ca8c5dc9a41f0165d4`

Adoption mode:
`SELECTIVE`

Wave 1 adopted modules:

- `RESF-INTELLIGENCE`;
- `RESF-PRODUCT-TRUTH`;
- `RESF-IA`;
- `RESF-UX`;
- `RESF-CONVERSION`;
- `RESF-TRACKING`;
- `RESF-LEAD`;
- `RESF-CRM`;
- `RESF-CONSENT`.

Other RESF v1 modules remain deferred, not rejected, until later explicit adoption/reconciliation.

## 4. Search / indexability

P0-B remains:
`PASS_WITH_RESIDUAL_RISK`.

Previously confirmed in project evidence:

- title/meta description present;
- canonical JS to `https://moretegra.com.br/`;
- Google selected the same canonical;
- home indexed;
- Googlebot Smartphone crawl/index allowed;
- observed HTTP `200 OK` and HTTPS PASS;
- Vercel homologation remains `noindex,nofollow` and canonical to production.

Residuals remain:

- canonical is client-side rather than static/SSR;
- sitemap unavailable;
- `www` lacks proven HTTP 301/308 semantics;
- non-blocking `web-share` warning previously observed.

Evidence:
`docs/evidence/search/P0_B_SEARCH_INDEXABILITY_EVIDENCE_2026-08-30.md`

### GSC T0 — 2026-09-10

User-supplied Search Console screenshot was textualized at:
`docs/evidence/search/GSC_BASELINE_2026-09-10.md`

Visible aggregate metrics:

- clicks: `0`;
- impressions: `17`;
- CTR: `0%`;
- average position: `26.1`.

Classification:
`EARLY_DISCOVERY / INSUFFICIENT_VOLUME_FOR_TREND_OR_CAUSALITY_CLAIMS`.

## 5. Measurement / consent

Current consumer state remains:

```text
MEASUREMENT = NOT_CONFIGURED_OR_NOT_PROVEN_FOR_MORENUMTEGRA
LGPD MODAL = ACTIVE
CONSENT ENFORCEMENT = NOT_PROVEN
```

The RESF program does not activate tracking by adoption alone.

External mutation gates remain separate for:

- GTM;
- GA4;
- Meta Pixel/Dataset/CAPI;
- Green Pixel configuration;
- consent runtime behavior;
- Google Ads;
- campaign/spend;
- DNS;
- Search Console mutation;
- Green/Vercel publication.

## 6. Current program action

Current bounded work:

`MNT-M1 — RESF Adoption & Existing-State Reconciliation`.

This phase publishes the adoption manifest, reconciliation baseline, GSC T0, full program WBS and machine-readable task graph. It does not authorize runtime mutation.

Authoritative next-safe-action record:
`docs/NEXT_SAFE_ACTION.md`.

## 7. SFJM Workspace boundary

MoreNumTegra is authoritative for program/task truth.

SFJM Workspace may consume:

- identity/objective;
- phases/milestones;
- tasks and recursive subtasks;
- hours and effort class;
- accepted/remaining effort and percentage;
- current phase/task;
- next safe action;
- blockers/risks;
- evidence/provenance.

It may not invent or overwrite those fields.

A Workspace snapshot whose observed MoreNumTegra `main` SHA differs from live `main` is stale and must not be presented as current.
