# Próxima Ação Segura — MoreNumTegra

> Registro autoritativo da única próxima ação segura quando esta revisão estiver em `main`.

- Definida em: `2026-09-10`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra` / `main`
- Release comercial atual: `18cfab98e01be29c86d78d08f2f5035a8da70444`
- Programa: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Estado desta revisão quando integrada: `MNT-M2-03_COMPLETE / MNT-M2-04_PLANNED_NOT_AUTHORIZED`

## 1. Estado de entrada

MNT-M2 possui a seguinte base aceita quando esta revisão estiver canônica:

```text
MNT-M2-01 COMPLETE
MNT-M2-02 COMPLETE
MNT-M2-03 COMPLETE
MNT-M2-07 COMPLETE
MNT-M2-08 COMPLETE
MNT-M2-09 PARTIAL_IMPLEMENTED
```

Evidence:

- `docs/measurement/MNT_M2_01_TRACKING_RUNTIME_INVENTORY_2026-09-10.md`;
- `docs/measurement/MNT_M2_GTM_CONSENT_T1_2026-09-10.md`;
- `docs/measurement/MNT_M2_02_TRANSPORT_DEDUP_ARCHITECTURE_2026-09-10.md`;
- `docs/measurement/MNT_M2_03_CANONICAL_EVENT_TAXONOMY_V1_2026-09-10.md`.

Canonical source events v1:

```text
mnt_page_view
mnt_section_click
mnt_catalog_filter
mnt_catalog_search
mnt_intent
mnt_form_start
mnt_form_submit_attempt
mnt_lead_success
```

Important boundaries:

```text
EVENT DEFINED != CONVERSION
mnt_catalog_search carries no raw search text
visitor Form 46 PII is excluded from Measurement parameters
CTA / WhatsApp / submit attempt != lead
only verified Green Form 46 success may become mnt_lead_success
```

## 2. Única próxima ação segura

A próxima ação é uma **decisão explícita da Product Authority sobre o início de `MNT-M2-04 — Define primary and secondary conversions`**.

Até essa autorização existir:

```text
CURRENT_ACTIVE_PHASE = MNT-M2
CURRENT_ACTIVE_TASK = NONE
MNT-M2-04 = PLANNED_NOT_AUTHORIZED
```

MNT-M2-04, se autorizada, poderá classificar quais eventos/ações são conversões primárias, secundárias ou somente diagnósticas/engagement, sem alterar os significados canônicos definidos por MNT-M2-03.

`NEXT != AUTHORIZED_TO_EXECUTE`.

## 3. Progresso programático

```text
forecast total = 1240h
accepted scope-equivalent = 328h
remaining forecast = 912h
program progress = 26.45%
```

Accepted M2 hours:

```text
MNT-M2-01 = 8h
MNT-M2-02 = 16h
MNT-M2-03 = 16h
MNT-M2-07 = 16h
MNT-M2-08 = 16h
```

MNT-M2-09 remains `PARTIAL_IMPLEMENTED` and contributes `0 accepted hours`.

## 4. Implementation obligations preserved

MNT-M2-03 is a taxonomy/design contract, not runtime implementation.

Later implementation and MNT-M2-10 QA must prove:

- zero project business/page Measurement on `www.moretegra.com.br`;
- exactly one project page-view path on canonical load;
- no automatic + manual GA4 page-view duplication;
- one canonical source event per semantic occurrence;
- no raw catalogue search text or visitor form PII in Measurement parameters;
- no duplicate events from programmatic filter-control synchronization;
- no lead event without a verified Green Form 46 success signal;
- existing Consent Mode behavior remains valid.

## 5. Mutation boundary

MNT-M2-03 completion does **not** authorize:

- further GTM configuration;
- GA4 property/tag/event implementation;
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

Workspace refresh does not authorize MNT-M2-04 or any project mutation.

## 7. Condições de parada

Stop if any action attempts to:

- implement GA4/Ads/Meta from event definitions alone;
- classify intent/form events as conversions before MNT-M2-04 authority;
- send visitor name/email/phone or raw free-form search text into Measurement;
- count CTA, WhatsApp open or submit attempt as verified lead;
- implement `mnt_lead_success` without a proven Green success signal;
- infer MNT-M2-04 authorization from task sequence;
- treat accepted taxonomy as proof that runtime events already exist.

`MNT-M2-03 COMPLETE != MNT-M2-04 CONVERSIONS_DEFINED != MNT-M2-09 IMPLEMENTED != MNT-M2-10 VALIDATED`.
