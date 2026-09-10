# Próxima Ação Segura — MoreNumTegra

> Registro autoritativo da única próxima ação segura.

- Definida em: `2026-09-10`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra` / `main`
- Programa: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Candidate atual: `MNT-M2-02_COMPLETE_CANDIDATE / PENDING_PR_LIFECYCLE`

## 1. Estado de entrada

Accepted before this candidate:

```text
MNT-M2-01 COMPLETE
MNT-M2-07 COMPLETE
MNT-M2-08 COMPLETE
MNT-M2-09 PARTIAL_IMPLEMENTED
accepted = 296h / 1240h
```

Product Authority explicitly authorized MNT-M2-02 start on 2026-09-10.

MNT-M2-02 design evidence:

`docs/measurement/MNT_M2_02_TRANSPORT_DEDUP_ARCHITECTURE_2026-09-10.md`

The design defines:

```text
GTM-PGCR4R47 = sole project-owned browser dispatcher
moretegra.com.br = only project business Measurement host
www.moretegra.com.br = no project business/page Measurement
Green /page/view = platform telemetry, not business event source
one page-view path per canonical document load
one semantic dataLayer event per occurrence
mnt_event_id = cross-destination dedup identity
CTA/submit attempt != lead
verified Form 46 success required for lead
YouTube telemetry != project conversion
```

## 2. Única próxima ação segura agora

Complete the MNT-M2-02 documentation PR lifecycle.

Until the candidate is accepted into canonical `main`:

```text
MNT-M2-02 = COMPLETE_CANDIDATE / PENDING_PR_LIFECYCLE
MNT-M2-03 = PLANNED_NOT_AUTHORIZED
CURRENT_ACTIVE_TASK = NONE
```

No additional GTM/GA4/Meta/Green/Ads runtime mutation is authorized by MNT-M2-02 design.

## 3. Next task after canonical acceptance

After MNT-M2-02 is accepted and merged, the next task candidate is:

`MNT-M2-03 — Define canonical event taxonomy`.

MNT-M2-03 must define exact project event names and parameters without violating the transport contract established by MNT-M2-02.

It remains a separate Product Authority gate.

## 4. Intended progress after merge

```text
forecast total = 1240h
accepted = 312h
remaining = 928h
progress = 25.16%
```

Accepted M2 hours after merge would be:

```text
M2-01 = 8h
M2-02 = 16h
M2-07 = 16h
M2-08 = 16h
```

M2-09 remains partial and contributes 0 accepted hours.

## 5. Implementation obligations preserved

MNT-M2-02 is design, not runtime implementation.

Later implementation/QA must prove:

- zero project business/page Measurement on `www.moretegra.com.br`;
- exactly one project page-view path on canonical load;
- no automatic + manual GA4 page-view duplication;
- one semantic event / one `mnt_event_id` per occurrence;
- no lead conversion without verified Form 46 success;
- no reinterpretation of Green or YouTube telemetry as business conversion;
- existing Consent Mode behavior remains valid.

## 6. Mutation boundary

Still requires separate gate:

- further GTM configuration;
- GA4 property/tag/event implementation;
- Google Ads conversion implementation;
- Meta Pixel/Dataset/CAPI;
- Green Pixel/integration changes;
- DNS/Search Console;
- Vercel Production;
- Green production publication;
- campaign/spend;
- FECH.AI/n8n/Make.

## 7. Conditions de parada

Stop if any action attempts to:

- implement GA4 before taxonomy/conversion/ownership gates;
- fire business Measurement on both `www` and non-www;
- treat Green `/page/view` as GA4/business conversion;
- count CTA or submit attempt as a lead;
- implement a second vendor SDK path outside the GTM dispatcher without a superseding decision;
- accept MNT-M2-02 hours before PR lifecycle acceptance;
- infer MNT-M2-03 authorization from task sequence.

`MNT-M2-02 COMPLETE_CANDIDATE != CANONICAL COMPLETE UNTIL MERGE`.
