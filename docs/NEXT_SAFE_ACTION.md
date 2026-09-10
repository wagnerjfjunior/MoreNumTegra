# Próxima Ação Segura — MoreNumTegra

> Registro autoritativo da única próxima ação segura quando esta revisão estiver em `main`.

- Definida em: `2026-09-10`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra` / `main`
- Release comercial atual: `18cfab98e01be29c86d78d08f2f5035a8da70444`
- Programa: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Estado desta revisão quando integrada: `MNT-M2-04_COMPLETE / MNT-M2-05_PARTIAL_EVIDENCE_NOT_AUTHORIZED`

## 1. Estado de entrada

MNT-M2 possui a seguinte base aceita quando esta revisão estiver canônica:

```text
MNT-M2-01 COMPLETE
MNT-M2-02 COMPLETE
MNT-M2-03 COMPLETE
MNT-M2-04 COMPLETE
MNT-M2-07 COMPLETE
MNT-M2-08 COMPLETE
MNT-M2-09 PARTIAL_IMPLEMENTED
```

Evidence:

- `docs/measurement/MNT_M2_01_TRACKING_RUNTIME_INVENTORY_2026-09-10.md`;
- `docs/measurement/MNT_M2_GTM_CONSENT_T1_2026-09-10.md`;
- `docs/measurement/MNT_M2_02_TRANSPORT_DEDUP_ARCHITECTURE_2026-09-10.md`;
- `docs/measurement/MNT_M2_03_CANONICAL_EVENT_TAXONOMY_V1_2026-09-10.md`;
- `docs/measurement/MNT_M2_04_PRIMARY_SECONDARY_CONVERSIONS_V1_2026-09-10.md`.

Conversion roles v1:

```text
PRIMARY = mnt_lead_success only
SECONDARY = explicit mnt_intent contact/request types only
NONE = discovery/consideration/form-start/submit-attempt/project-interest diagnostics
```

Important boundaries:

```text
PRIMARY CONVERSION = verified Form 46 success only
stable Green success signal = NOT_YET_PROVEN
SECONDARY != VERIFIED LEAD
PROPERTY PRICE != CONVERSION VALUE
CONVERSION CLASSIFICATION != DESTINATION CONFIGURATION
```

## 2. Única próxima ação segura

A próxima ação é uma **decisão explícita da Product Authority sobre o início/completion work de `MNT-M2-05 — Define ownership for MoreNumTegra GTM and GA4`**.

Até essa autorização existir:

```text
CURRENT_ACTIVE_PHASE = MNT-M2
CURRENT_ACTIVE_TASK = NONE
MNT-M2-05 = PARTIAL_EVIDENCE / EXECUTION_NOT_AUTHORIZED
```

MNT-M2-05 possui evidência parcial porque o container `GTM-PGCR4R47` já foi observado/publicado no escopo de Consent. A tarefa ainda deve resolver explicitamente ownership do container, propriedade/stream GA4, limites administrativos e responsabilidade por configuração. A existência do GTM não prova nem autoriza GA4.

`PARTIAL_EVIDENCE != AUTHORIZED_TO_COMPLETE`.

## 3. Progresso programático

```text
forecast total = 1240h
accepted scope-equivalent = 336h
remaining forecast = 904h
program progress = 27.10%
```

Accepted M2 hours:

```text
MNT-M2-01 = 8h
MNT-M2-02 = 16h
MNT-M2-03 = 16h
MNT-M2-04 = 8h
MNT-M2-07 = 16h
MNT-M2-08 = 16h
```

MNT-M2-05 partial evidence and MNT-M2-09 partial implementation contribute `0 accepted hours`.

## 4. Implementation obligations preserved

Later implementation and MNT-M2-10 QA must prove:

- zero project business/page Measurement on `www.moretegra.com.br`;
- exactly one project page-view path on canonical load;
- one canonical source event per semantic occurrence;
- no visitor PII or raw catalogue search text in Measurement parameters;
- no lead event without a verified Green Form 46 success signal;
- only the five allowlisted explicit contact/request `mnt_intent` types may carry project-level secondary conversion semantics;
- `project_interest`, form start and submit attempt remain non-conversions;
- no property/offer price becomes conversion value;
- existing Consent Mode behavior remains valid.

## 5. Mutation boundary

MNT-M2-04 completion does **not** authorize:

- further GTM configuration;
- GA4 property/data-stream creation or tag/event implementation;
- GA4 key-event administrative configuration;
- Google Ads conversion implementation;
- Meta Pixel/Dataset/CAPI;
- Green Pixel/integration changes;
- DNS/Search Console mutation;
- Vercel Production deployment;
- Green commercial publication;
- campaign/spend;
- FECH.AI/n8n/Make.

Each material mutation keeps its applicable gate.

## 6. SFJM Workspace boundary

After this revision is merged, consumers must resolve the resulting exact MoreNumTegra `main` SHA before refreshing their snapshot.

Workspace consumption remains:

```text
PROGRAM_TASK_GRAPH = hierarchy/planning hours
CURRENT_PROGRAM_STATE = lifecycle/progress
NEXT_SAFE_ACTION = execution authority
MoreNumTegra main = project truth
```

Workspace refresh does not authorize MNT-M2-05 or any project mutation.

## 7. Condições de parada

Stop if any action attempts to:

- create/configure GA4 or change GTM from MNT-M2-04 alone;
- treat project conversion roles as already configured vendor conversions;
- classify CTA, form start or submit attempt as verified lead;
- implement `mnt_lead_success` without a proven Green success signal;
- use property/listing price as lead conversion value;
- infer MNT-M2-05 authorization from its partial-evidence state or task sequence;
- treat conversion classification as proof that runtime events exist.

`MNT-M2-04 COMPLETE != MNT-M2-05 AUTHORIZED != MNT-M2-09 IMPLEMENTED != MNT-M2-10 VALIDATED`.
