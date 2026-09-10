# Próxima Ação Segura — MoreNumTegra

> Registro autoritativo da única próxima ação segura.

- Definida em: `2026-09-10`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra` / `main`
- Reconciliation base main: `34ddd9684608a0fe1e02edc5071fd6e40b5f2121`
- Release comercial atual: `18cfab98e01be29c86d78d08f2f5035a8da70444`
- Programa: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Estado pretendido após merge desta reconciliação: `MNT-M2_ACTIVE / M2-01_COMPLETE / M2-07_COMPLETE / M2-08_COMPLETE / M2-09_PARTIAL`

## 1. Estado de entrada

O V1 continua operacional em produção comercial Green.

A evidência de MNT-M2 agora possui duas janelas temporais distintas:

```text
T0 PRE-GTM
- MNT-M2-01 runtime inventory
- HAR c59f3a3c0c075412595bfda2dd1155a48fa0d0689f5f27264010076348bb7446
- Green /page/view observed
- GTM/GA4/Meta not observed in that captured session
- duplicate-measurement risk identified

T1 GTM CONSENT
- GTM-PGCR4R47
- Version 4 published
- default denied all four consent states
- Green Continuar -> granted all four
- Green Cancelar -> denied all four
- granted/denied persistence after reload proven
- validated in GTM Preview / Tag Assistant
```

Current-state overlay:
`docs/sfjm/CURRENT_PROGRAM_STATE.json`.

Evidence:

- `docs/measurement/MNT_M2_01_TRACKING_RUNTIME_INVENTORY_2026-09-10.md`;
- `docs/measurement/MNT_M2_GTM_CONSENT_T1_2026-09-10.md`.

## 2. Única próxima ação segura durante este candidate lifecycle

Until this reconciliation is accepted into canonical `main`, the only safe action is to complete its documentation PR lifecycle.

No additional runtime/external mutation is authorized merely by the reconciliation.

After canonical acceptance, the next task candidate is:

`MNT-M2-02 — Define transport architecture and duplicate-event prevention`.

MNT-M2-02 must explicitly account for:

1. Green/GDigital platform-injected `POST /page/view` already exists;
2. T0 observed a `www -> non-www` sequence with two Green page-view writes and distinct page IDs;
3. project-owned GA4/Ads events must not create duplicate page/business conversions;
4. YouTube player telemetry is operational third-party media telemetry, not a MoreNumTegra business conversion;
5. the GTM Consent Mode baseline is already published and must not be needlessly rebuilt.

## 3. Current task states after acceptance of this reconciliation

```text
MNT-M2-01 COMPLETE
MNT-M2-02 PLANNED_NOT_AUTHORIZED / NEXT
MNT-M2-03 PLANNED
MNT-M2-04 PLANNED
MNT-M2-05 PARTIAL_EVIDENCE
MNT-M2-06 PLANNED
MNT-M2-07 COMPLETE
MNT-M2-08 COMPLETE
MNT-M2-09 PARTIAL_IMPLEMENTED
MNT-M2-10 PLANNED
```

## 4. Progress after canonical acceptance

```text
forecast total                = 1240h
accepted scope-equivalent     = 296h
remaining forecast            = 944h
program progress              = 23.87%
```

Accepted M2 hours:

```text
MNT-M2-01 = 8h
MNT-M2-07 = 16h
MNT-M2-08 = 16h
```

MNT-M2-09 partial implementation contributes `0 accepted hours` until full task completion.

## 5. Mutation boundary

This reconciliation does not itself authorize:

- further GTM configuration;
- GA4 property/tag/event implementation;
- Meta Pixel/Dataset/CAPI;
- Green Pixel/integration changes;
- Google Ads conversions/campaign/spend;
- DNS;
- Search Console mutation;
- Vercel Production deployment;
- Green commercial publication;
- FECH.AI/n8n/Make.

Each material mutation keeps its applicable gate.

## 6. Workspace gate

SFJM Workspace PR #39 must not refresh from its stale MoreNumTegra snapshot until this project reconciliation is integrated and the new exact MoreNumTegra `main` SHA is resolved live.

Required order:

```text
MORENUMTEGRA RECONCILIATION PR
-> lifecycle acceptance/merge
-> resolve exact new MoreNumTegra main
-> refresh Workspace PR #39 snapshot
-> validate rendering/provenance
-> independent exact-head review
-> Workspace lifecycle gates
```

## 7. Conditions de parada

Stop if any action attempts to:

- reinterpret T0 `GTM NOT_OBSERVED` as current truth;
- inflate GTM Consent evidence into full Measurement completion;
- accept partial MNT-M2-09 hours as complete;
- mutate GA4/Meta/Ads/Green without a corresponding gate;
- refresh Workspace before MoreNumTegra reconciliation becomes canonical;
- infer task authority from planned WBS state.

`DOCUMENTED != IMPLEMENTED != DEPLOYED != VALIDATED != FULL_PHASE_COMPLETE`.
