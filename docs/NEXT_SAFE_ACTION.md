# Próxima Ação Segura — MoreNumTegra

> Registro autoritativo da única próxima ação segura quando esta revisão estiver em `main`.

- Definida em: `2026-09-10`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra` / `main`
- Release comercial atual: `18cfab98e01be29c86d78d08f2f5035a8da70444`
- Programa: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Estado desta revisão quando integrada: `MNT-M2-02_COMPLETE / MNT-M2-03_PLANNED_NOT_AUTHORIZED`

## 1. Estado de entrada

MNT-M2 possui a seguinte base aceita quando esta revisão estiver canônica:

```text
MNT-M2-01 COMPLETE
MNT-M2-02 COMPLETE
MNT-M2-07 COMPLETE
MNT-M2-08 COMPLETE
MNT-M2-09 PARTIAL_IMPLEMENTED
```

Evidence:

- `docs/measurement/MNT_M2_01_TRACKING_RUNTIME_INVENTORY_2026-09-10.md`;
- `docs/measurement/MNT_M2_GTM_CONSENT_T1_2026-09-10.md`;
- `docs/measurement/MNT_M2_02_TRANSPORT_DEDUP_ARCHITECTURE_2026-09-10.md`.

MNT-M2-02 establishes:

```text
GTM-PGCR4R47 = sole project-owned browser dispatcher
moretegra.com.br = only project business Measurement production host
www.moretegra.com.br = no project business/page Measurement
Green /page/view = platform telemetry, not business-event origin
one project page-view path per canonical document load
one semantic dataLayer event per occurrence
mnt_event_id = project correlation identity; vendor-native dedup remains destination-specific
CTA / submit attempt != lead
verified Form 46 success required for lead conversion
YouTube telemetry != project conversion
```

## 2. Única próxima ação segura

A próxima ação é uma **decisão explícita da Product Authority sobre o início de `MNT-M2-03 — Define canonical event taxonomy`**.

Até essa autorização existir:

```text
CURRENT_ACTIVE_PHASE = MNT-M2
CURRENT_ACTIVE_TASK = NONE
MNT-M2-03 = PLANNED_NOT_AUTHORIZED
```

A tarefa MNT-M2-03, se autorizada, poderá definir os nomes e parâmetros canônicos dos eventos de negócio respeitando integralmente a arquitetura de transporte/deduplicação já aceita.

`NEXT != AUTHORIZED_TO_EXECUTE`.

## 3. Progresso programático

```text
forecast total = 1240h
accepted scope-equivalent = 312h
remaining forecast = 928h
program progress = 25.16%
```

Accepted M2 hours:

```text
MNT-M2-01 = 8h
MNT-M2-02 = 16h
MNT-M2-07 = 16h
MNT-M2-08 = 16h
```

MNT-M2-09 remains `PARTIAL_IMPLEMENTED` and contributes `0 accepted hours`.

## 4. Implementation obligations preserved

MNT-M2-02 is an accepted architecture/design contract, not runtime implementation.

Later implementation and MNT-M2-10 QA must prove:

- zero project business/page Measurement on `www.moretegra.com.br`;
- exactly one project page-view path on canonical load;
- no automatic + manual GA4 page-view duplication;
- one semantic source event per occurrence;
- project correlation identity where required without assuming universal vendor dedup;
- no lead conversion without verified Form 46 success;
- no reinterpretation of Green/YouTube telemetry as MoreNumTegra conversion;
- existing Consent Mode behavior remains valid.

## 5. Mutation boundary

MNT-M2-02 completion does **not** authorize:

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

Workspace refresh does not authorize MNT-M2-03 or any project mutation.

## 7. Condições de parada

Stop if any action attempts to:

- implement GA4 before the applicable taxonomy/conversion/ownership gates;
- fire project business Measurement on both `www` and non-www;
- treat Green `/page/view` as GA4/business conversion;
- count CTA or submit attempt as lead;
- implement a second vendor SDK path outside the GTM dispatcher without superseding architecture authority;
- infer MNT-M2-03 authorization from task sequence;
- treat accepted transport design as proof that runtime dedup controls are already implemented.

`MNT-M2-02 COMPLETE != MNT-M2-09 IMPLEMENTED != MNT-M2-10 VALIDATED`.
