# Próxima Ação Segura — MoreNumTegra

> Registro autoritativo da única próxima ação segura quando esta revisão estiver em `main`.

- Definida em: `2026-09-10`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra` / `main`
- Release comercial atual: `18cfab98e01be29c86d78d08f2f5035a8da70444`
- Programa: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Estado desta revisão quando integrada: `MNT-M2-06_COMPLETE / MNT-M2-09_PARTIAL_IMPLEMENTED_NOT_AUTHORIZED`

## 1. Estado de entrada

MNT-M2 possui a seguinte base aceita quando esta revisão estiver canônica:

```text
MNT-M2-01 COMPLETE
MNT-M2-02 COMPLETE
MNT-M2-03 COMPLETE
MNT-M2-04 COMPLETE
MNT-M2-05 COMPLETE
MNT-M2-06 COMPLETE
MNT-M2-07 COMPLETE
MNT-M2-08 COMPLETE
MNT-M2-09 PARTIAL_IMPLEMENTED
```

Evidence:

- `docs/measurement/MNT_M2_01_TRACKING_RUNTIME_INVENTORY_2026-09-10.md`;
- `docs/measurement/MNT_M2_GTM_CONSENT_T1_2026-09-10.md`;
- `docs/measurement/MNT_M2_02_TRANSPORT_DEDUP_ARCHITECTURE_2026-09-10.md`;
- `docs/measurement/MNT_M2_03_CANONICAL_EVENT_TAXONOMY_V1_2026-09-10.md`;
- `docs/measurement/MNT_M2_04_PRIMARY_SECONDARY_CONVERSIONS_V1_2026-09-10.md`;
- `docs/measurement/MNT_M2_05_GTM_GA4_OWNERSHIP_CONTRACT_V1_2026-09-10.md`;
- `docs/measurement/MNT_M2_06_META_PIXEL_DATASET_OWNERSHIP_CONTRACT_V1_2026-09-10.md`.

Destination governance now defined:

```text
GTM container = GTM-PGCR4R47
GTM governance owner = MoreNumTegra / Product Authority
GA4 governance owner = MoreNumTegra / Product Authority
GA4 property target = one dedicated MoreNumTegra property
GA4 production web stream target = one stream for moretegra.com.br
Meta Measurement governance owner = MoreNumTegra / Product Authority
Meta Dataset target = one dedicated MoreNumTegra Dataset
Meta browser source target = one project browser source relationship if implemented
Browser dispatcher for project-owned destinations = GTM-PGCR4R47
CAPI = optional future / not authorized by M2-06
```

Unproven identifiers remain intentionally unresolved:

```text
GA4 property / stream / Measurement IDs = NOT_PROVEN
Meta Dataset / Pixel IDs and relationship = NOT_PROVEN
NOT_PROVEN != DOES_NOT_EXIST
```

## 2. Única próxima ação segura

A próxima ação é uma **decisão explícita da Product Authority sobre a continuação de `MNT-M2-09 — Implement authorized tracking configuration`**.

Até essa autorização existir:

```text
CURRENT_ACTIVE_PHASE = MNT-M2
CURRENT_ACTIVE_TASK = NONE
MNT-M2-09 = PARTIAL_IMPLEMENTED / EXECUTION_NOT_AUTHORIZED
```

O primeiro passo seguro dentro de uma MNT-M2-09 autorizada deve ser **read-only asset resolution + bounded implementation plan**:

1. verificar se já existe uma property/stream GA4 dedicada ao MoreNumTegra e registrar os IDs reais;
2. verificar se já existe Dataset/Pixel/browser source Meta dedicado e registrar os IDs/relacionamento reais;
3. definir o delta exato de implementação necessário contra os contratos M2-02/03/04/05/06/07/08;
4. somente então executar mutações que estejam explicitamente cobertas pelo gate aplicável.

A autorização de início de M2-09 não deve ser interpretada automaticamente como autorização ilimitada para criar assets, publicar GTM, habilitar CAPI, alterar Green ou promover produção.

## 3. Progresso programático

```text
forecast total = 1240h
accepted scope-equivalent = 352h
remaining forecast = 888h
program progress = 28.39%
```

Accepted M2 hours:

```text
MNT-M2-01 = 8h
MNT-M2-02 = 16h
MNT-M2-03 = 16h
MNT-M2-04 = 8h
MNT-M2-05 = 8h
MNT-M2-06 = 8h
MNT-M2-07 = 16h
MNT-M2-08 = 16h
```

MNT-M2-09 remains `PARTIAL_IMPLEMENTED` and contributes `0 accepted hours` until accepted complete.

## 4. Implementation obligations preserved

Before GA4 implementation may be claimed, later authorized work must prove the exact dedicated MoreNumTegra GA4 property ID, stream ID and Measurement ID actually adopted.

Before Meta implementation may be claimed, later authorized work must prove the exact dedicated MoreNumTegra Dataset ID, Pixel/browser-source ID if separately applicable, and their observed relationship.

Later implementation and MNT-M2-10 QA must prove:

- zero project business/page Measurement on `www.moretegra.com.br`;
- exactly one project page-view path on canonical load;
- one canonical source event per semantic occurrence;
- no duplicate direct `gtag()`/GA4 path outside `GTM-PGCR4R47`;
- no duplicate direct `fbq()`/second Meta browser path outside the governed GTM path;
- no visitor PII or raw catalogue search text in ordinary Measurement parameters;
- no primary lead event without verified Green Form 46 success;
- only the five allowlisted explicit contact/request `mnt_intent` types may carry project-level secondary conversion semantics;
- `project_interest`, form start and submit attempt remain non-conversions;
- no property/offer price becomes conversion value;
- accepted Green consent decision is respected by any future destination collection;
- if both browser Pixel and CAPI are ever enabled for the same logical event, destination-native deduplication is explicitly designed and proven.

## 5. Mutation boundary

MNT-M2-06 completion does **not** authorize:

- publishing a new GTM version;
- creating/adopting/configuring a GA4 property or web stream without its applicable mutation scope;
- implementing Google tag/GA4 events or GA4 key events;
- creating/adopting/configuring a Meta Dataset/Pixel/browser source without its applicable mutation scope;
- enabling Meta CAPI, partner/server gateway or external automation;
- Meta domain verification, partner assignment or ad-account linking;
- linking GA4 to Google Ads or other products;
- Green Pixel/integration changes;
- DNS/Search Console mutation;
- Vercel Production deployment;
- Green commercial publication;
- campaign/spend;
- FECH.AI/n8n/Make.

Each material mutation keeps its applicable gate unless an explicit authorization names that mutation scope.

## 6. SFJM Workspace boundary

After this revision is merged, consumers must resolve the resulting exact MoreNumTegra `main` SHA before refreshing their snapshot.

```text
PROGRAM_TASK_GRAPH = hierarchy/planning hours
CURRENT_PROGRAM_STATE = lifecycle/progress
NEXT_SAFE_ACTION = execution authority
MoreNumTegra main = project truth
```

Workspace refresh does not authorize MNT-M2-09 or any project mutation.

## 7. Condições de parada

Stop if any action attempts to:

- infer or invent GA4 property/stream/Measurement IDs;
- infer or invent Meta Dataset/Pixel/Business identifiers;
- create a GA4 property or Meta Dataset/Pixel merely because canonical evidence lacks IDs;
- publish/change GTM without an applicable explicit mutation gate;
- add direct `gtag()` or direct `fbq()` as a parallel project-owned browser dispatcher;
- infer Meta ownership from a Facebook Page, ad account, Green Lead Ads integration or service-provider relationship;
- treat project conversion roles as already configured vendor conversions;
- classify CTA, WhatsApp, form start or submit attempt as verified lead;
- implement `mnt_lead_success` without a proven Green success signal;
- enable CAPI without an approved architecture and deduplication contract;
- send/hash visitor PII by inference;
- use property/listing price as lead conversion value;
- treat conversion classification as proof that runtime events exist;
- infer MNT-M2-09 authorization from task sequence or partial-implementation state.

`MNT-M2-06 COMPLETE != MNT-M2-09 AUTHORIZED != MNT-M2-09 COMPLETE != MNT-M2-10 VALIDATED`.
