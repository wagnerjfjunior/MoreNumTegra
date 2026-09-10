# Handoff Atual — MoreNumTegra

- Status: `candidate MNT-M2-02 / pending PR lifecycle`
- Atualizado em: `2026-09-10`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra`
- Branch canônica: `main`
- Main resolved at MNT-M2-02 start: `f0e89bfc159e7638347997b46290c919f2e5efc7`
- Programa: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Fase atual: `MNT-M2 / ACTIVE`
- Candidate: `MNT-M2-02 / COMPLETE_CANDIDATE`
- Next after acceptance: `MNT-M2-03 / PLANNED_NOT_AUTHORIZED`
- Vercel mode: `MANUAL_GATE_DRIVEN`

## 1. Estado aceito antes deste candidate

```text
MNT-M2-01 = COMPLETE
MNT-M2-07 = COMPLETE
MNT-M2-08 = COMPLETE
MNT-M2-09 = PARTIAL_IMPLEMENTED
accepted = 296h / 1240h
progress = 23.87%
```

GTM/Consent baseline:

```text
GTM-PGCR4R47
Version 4 published
Default denied all four
Continuar granted all four
Cancelar denied all four
Persistence proven
```

## 2. MNT-M2-02 autorizado e executado em design

Product Authority explicitly authorized MNT-M2-02 start on `2026-09-10`.

Evidence/design:

`docs/measurement/MNT_M2_02_TRANSPORT_DEDUP_ARCHITECTURE_2026-09-10.md`

Core decisions:

1. GTM `GTM-PGCR4R47` is the sole project-owned browser Measurement dispatcher.
2. Project business Measurement is eligible only on `moretegra.com.br`.
3. `www.moretegra.com.br` is a noncanonical alias for project Measurement; future business/page tags must not fire there.
4. Green `/page/view` remains platform telemetry and must not be forwarded as a MoreNumTegra business event.
5. Exactly one project-owned page-view path is allowed per canonical document load.
6. Future semantic instrumentation emits one `dataLayer` event per occurrence.
7. Reserved cross-destination dedup identity: `mnt_event_id`.
8. Native Green Form 46 submission must not be intercepted/duplicated.
9. Only verified Form 46 success may become a lead conversion; click/submit attempt is not lead.
10. YouTube operational telemetry is not a MoreNumTegra business conversion.

## 3. Duplicate-risk interpretation

Historical T0 remains valid:

```text
www page_id=293 -> Green /page/view
non-www page_id=292 -> Green /page/view
```

MNT-M2-02 does not claim to fix Green's platform telemetry. It defines the project-owned prevention control:

```text
PROJECT_MEASUREMENT_HOST = moretegra.com.br only
```

Thus future GA4/Ads/Meta business measurement must not count the `www` alias before arrival on the canonical host.

Runtime enforcement remains pending MNT-M2-09 and QA in MNT-M2-10.

## 4. Candidate lifecycle/progress

```text
MNT-M2-02 = COMPLETE_CANDIDATE / PENDING_PR_LIFECYCLE
```

If accepted and merged:

```text
accepted = 312h / 1240h
remaining = 928h
progress = 25.16%
```

No MNT-M2-09 partial hours are accepted.

## 5. Next task boundary

After canonical acceptance only:

`MNT-M2-03 — Define canonical event taxonomy`

MNT-M2-03 is not authorized by MNT-M2-02 completion.

No additional GTM, GA4, Meta, Green Pixel, Ads, DNS, Search Console, Vercel or Green production mutation is authorized by this design task.

## 6. SFJM Workspace

Workspace remains a consumer. It must refresh from a new exact MoreNumTegra `main` only after the MNT-M2-02 candidate lifecycle becomes canonical.

```text
PROGRAM_TASK_GRAPH = hierarchy/planning hours
CURRENT_PROGRAM_STATE = lifecycle/progress
NEXT_SAFE_ACTION = execution authority
MoreNumTegra main = project truth
```
