# Próxima Ação Segura — MoreNumTegra

> Registro autoritativo da única próxima ação segura quando esta revisão estiver em `main`.

- Definida em: `2026-09-10`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra` / `main`
- Release comercial atual: `18cfab98e01be29c86d78d08f2f5035a8da70444`
- Programa: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Estado desta revisão quando integrada: `MNT-M2-05_COMPLETE / MNT-M2-06_PLANNED_NOT_AUTHORIZED`

## 1. Estado de entrada

MNT-M2 possui a seguinte base aceita quando esta revisão estiver canônica:

```text
MNT-M2-01 COMPLETE
MNT-M2-02 COMPLETE
MNT-M2-03 COMPLETE
MNT-M2-04 COMPLETE
MNT-M2-05 COMPLETE
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
- `docs/measurement/MNT_M2_05_GTM_GA4_OWNERSHIP_CONTRACT_V1_2026-09-10.md`.

Google-side governance now defined:

```text
GTM container = GTM-PGCR4R47
GTM governance owner = MoreNumTegra / Product Authority
GA4 governance owner = MoreNumTegra / Product Authority
GA4 property scope = one dedicated MoreNumTegra property
GA4 production web stream target = one stream for moretegra.com.br
GA4 property/stream/Measurement IDs = NOT_PROVEN
Google admin/runtime mutation by MNT-M2-05 = NONE
```

Important boundaries:

```text
GOVERNANCE OWNERSHIP != GOOGLE ACCOUNT USER ROSTER
TARGET TOPOLOGY DEFINED != PROPERTY/STREAM CREATED
GTM PRESENT != GA4 PRESENT
PROJECT CONVERSION ROLE != GA4 KEY EVENT
MNT-M2-05 COMPLETE != MNT-M2-09 IMPLEMENTED
```

## 2. Única próxima ação segura

A próxima ação é uma **decisão explícita da Product Authority sobre o início de `MNT-M2-06 — Define ownership for Meta Pixel/Dataset`**.

Até essa autorização existir:

```text
CURRENT_ACTIVE_PHASE = MNT-M2
CURRENT_ACTIVE_TASK = NONE
MNT-M2-06 = PLANNED_NOT_AUTHORIZED
```

MNT-M2-06, se autorizada, poderá definir ownership e boundary para Meta Pixel/Dataset/CAPI sem criar ou configurar runtime Meta por inferência.

`NEXT != AUTHORIZED_TO_EXECUTE`.

## 3. Progresso programático

```text
forecast total = 1240h
accepted scope-equivalent = 344h
remaining forecast = 896h
program progress = 27.74%
```

Accepted M2 hours:

```text
MNT-M2-01 = 8h
MNT-M2-02 = 16h
MNT-M2-03 = 16h
MNT-M2-04 = 8h
MNT-M2-05 = 8h
MNT-M2-07 = 16h
MNT-M2-08 = 16h
```

MNT-M2-09 remains `PARTIAL_IMPLEMENTED` and contributes `0 accepted hours`.

## 4. Implementation obligations preserved

Before GA4 implementation may be claimed, later authorized work must prove the exact dedicated MoreNumTegra GA4 property ID, stream ID and Measurement ID actually adopted. `NOT_PROVEN` must not be converted into an invented identifier or an assumption that the property does not exist.

Later implementation and MNT-M2-10 QA must also prove:

- zero project business/page Measurement on `www.moretegra.com.br`;
- exactly one project page-view path on canonical load;
- one canonical source event per semantic occurrence;
- no duplicate direct `gtag()`/GA4 path outside `GTM-PGCR4R47`;
- no visitor PII or raw catalogue search text in Measurement parameters;
- no primary lead event without verified Green Form 46 success;
- existing Consent Mode behavior remains valid.

## 5. Mutation boundary

MNT-M2-05 completion does **not** authorize:

- publishing a new GTM version;
- creating/adopting/configuring a GA4 property or web stream without its applicable mutation gate;
- implementing Google tag/GA4 events or GA4 key events;
- linking GA4 to Google Ads or other products;
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

```text
PROGRAM_TASK_GRAPH = hierarchy/planning hours
CURRENT_PROGRAM_STATE = lifecycle/progress
NEXT_SAFE_ACTION = execution authority
MoreNumTegra main = project truth
```

Workspace refresh does not authorize MNT-M2-06 or any project mutation.

## 7. Condições de parada

Stop if any action attempts to:

- infer or invent GA4 property/stream/Measurement IDs;
- create GA4 merely because canonical evidence lacks an ID;
- publish/change GTM without a separate mutation gate;
- treat Product Authority governance ownership as proof of every Google account credential holder;
- infer Meta ownership from GTM/GA4 ownership;
- implement `mnt_lead_success` without a proven Green success signal;
- infer MNT-M2-06 authorization from task sequence.

`MNT-M2-05 COMPLETE != MNT-M2-06 AUTHORIZED != MNT-M2-09 IMPLEMENTED != MNT-M2-10 VALIDATED`.
