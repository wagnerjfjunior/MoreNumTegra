# MNT-M5-10 — Elo Duo Late GTM Bootstrap Slice 07

Date: `2026-09-22`

Status: `ACTIVE / PRODUCT_AUTHORITY_AUTHORIZED / MEASUREMENT_BOOTSTRAP_EXPERIMENT`

## Authorization

Product Authority explicitly authorized a bounded Measurement performance slice to design and test a late GTM bootstrap while preserving:

- Consent Mode;
- GA4 destination and semantics;
- Form 46;
- single GTM dispatcher architecture.

This authorization does **not** authorize a second GTM container, direct project `gtag()`, GA4 property/stream changes, taxonomy changes, conversion-role changes, PII collection or Ads/Meta mutations.

## Fresh execution anchor

```text
CANONICAL_MAIN_AT_START = 41118167a806b9566c19faf336b1ca9cdb8032e9
PRODUCTION_DEPLOYMENT_AT_START = dpl_kjZAfKp1VnnVppTYWoDgPfd38GuL
PRODUCTION_STATE = READY
CANONICAL_HOST = https://www.moretegra.com.br/
```

Current Measurement contract:

```text
GTM = GTM-PGCR4R47
GA4 property = 553742649
GA4 stream = 15759638334
GA4 measurement_id = G-57M2XR0CY2
primary source = mnt_lead_success
primary GA4 mapping = generate_lead
Consent default = denied
Consent accept = granted x4
Consent reject = denied x4
single browser dispatcher = GTM
direct project gtag() = forbidden
```

## Diagnostic basis

Paired Lighthouse laboratory on restored Production blocked only `googletagmanager.com` in the measurement browser:

```text
normal median LCP = 5,080 ms
GTM/gtag-blocked median LCP = 3,166 ms
delta = -1,914 ms / -37.68%

normal median TBT = 496 ms
blocked median TBT = 33 ms
delta = -463 ms

normal median score = 70
blocked median score = 93
```

Representative CPU attribution identified `gtm.js` and the GA4 `gtag/js` loaded by GTM as the dominant boot-up cost.

The laboratory did not mutate Production and did not itself authorize removal of Measurement.

## Candidate design

Scope is **Elo Duo only**.

The standard GTM head snippet currently both:

1. pushes the canonical `gtm.js` bootstrap event to `dataLayer`;
2. immediately starts the GTM network request.

Slice 07 separates those two operations.

At parse time, it still:

- initializes the same `dataLayer`;
- pushes the same `gtm.start` + `event: gtm.js` marker before project `mnt_*` source events.

The network request for the same `GTM-PGCR4R47` container becomes idempotently eligible at:

1. `window.load`; or
2. the first pointer interaction before load; or
3. the first keyboard interaction before load.

This keeps the GTM bootstrap marker first in the queue so Consent Initialization remains ahead of queued business events when the container begins processing.

## Preserved contracts

No change to:

- GTM container ID;
- GTM publication/configuration;
- GA4 property/stream/Measurement ID;
- `mnt_*` taxonomy;
- `mnt_lead_success -> generate_lead`;
- Consent accept/reject source events;
- project-owned Form 46 runtime;
- Form 46 endpoint/tenant/form/title;
- lead-validity guard;
- commercial data/runtime;
- hero/media/CSS;
- CTA/WhatsApp;
- canonical/schema/SEO;
- privacy boundary.

`noscript` GTM fallback remains unchanged.

## Candidate acceptance gates

Before Production promotion:

1. static contract proves same single container and no direct `gtag()`;
2. browser smoke proves no GTM network before load without interaction;
3. browser smoke proves `gtm.js` remains the first queued event;
4. `mnt_page_view` queues before delayed network load;
5. first accept/reject interaction can activate GTM before load;
6. load + interaction cannot duplicate the GTM request;
7. granted and denied project consent events still persist;
8. existing Form 46, CTA, lead semantics, commercial and media gates pass.

After exact-head Production deployment:

1. public HTML contract check;
2. real browser network/dataLayer smoke without lead submission;
3. five-run Lighthouse mobile battery;
4. retain only if Measurement remains functionally intact and performance gain is material/non-regressive.

Target remains `LCP <= 2,500 ms`.
