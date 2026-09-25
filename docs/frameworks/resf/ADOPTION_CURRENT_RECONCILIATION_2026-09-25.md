# MoreNumTegra — RESF Current Adoption Reconciliation — 2026-09-25

Status: `CURRENT-STATE_RECONCILIATION / DOCS_ONLY / NO_RUNTIME_MUTATION`

## Purpose

Reconcile the current MoreNumTegra RESF consumer manifest after the provider Audience Readiness capability was canonicalized and the consumer pin was advanced to:

`wagnerjfjunior/Blogs-sites-portais-seo@c78bdad37c884a94a57a5ee39b4ca22e3f530438`.

This document does not rewrite the historical adoption baseline at `docs/frameworks/resf/ADOPTION_BASELINE.md`.

## Current consumer state

- RESF v1 remains selectively adopted.
- `RESF-TRACKING` was already adopted before this reconciliation.
- `PAT-TRK-005` is therefore available through the pinned provider without adding a new module.
- Provider lifecycle remains `CANDIDATE`.
- Provider pattern lifecycle/qualification remains `CANDIDATE / UNVALIDATED`.

## Current Measurement facts

Canonical current project evidence supports:

```text
GTM = GTM-PGCR4R47
GA4 property = 553742649
GA4 stream = 15759638334
GA4 measurement_id = G-57M2XR0CY2
project source lead event = mnt_lead_success
GA4 destination lead event = generate_lead
```

MNT-M5-07 is complete with GTM Version 12 live. The accepted mapping preserves controlled `project_name` / `offer_name` business metadata and excludes visitor name, email, phone and raw/free-form `texto-livre` from Measurement.

## Audience Readiness delta

Manual GA4 audience setup was completed on 2026-09-22.

The existing `MNT | Project visitors | 180d` audience was created using an explicit three-route allowlist. After publication of DSG Itaim, that implementation no longer represents all governed exact-project pages.

The next consumer action is therefore not a tracking-runtime rewrite. It is a separate GA4 audience replacement/validation task using a stable exact-project classifier.

Preserve:

```text
AUDIENCE_READY != AUDIENCE_CREATED
AUDIENCE_CREATED != AUDIENCE_MEMBERSHIP
AUDIENCE_MEMBERSHIP != AUDIENCE_ACTIVATED
AUDIENCE_MEMBERSHIP != ACQUISITION_ATTRIBUTION
```

## Boundaries

This reconciliation does not:

- mutate HTML/CSS/JS;
- publish GTM;
- mutate GA4;
- create or archive a GA4 audience;
- change Consent Mode;
- change Form 46;
- activate Google Ads;
- authorize paid-media spend;
- activate any deferred RESF module;
- rewrite the 2026-09-10 adoption baseline.

## Next bounded consumer task

Prepare and execute the GA4 replacement audience:

`MNT | All project visitors | 180d`

with consumer-specific validation for intended exact-project coverage and negative exclusions before any archival of the legacy `MNT | Project visitors | 180d` audience.
