# MNT-M5-10 — Elo Duo Late GTM Bootstrap Slice 07

Date: `2026-09-22`

Status: `COMPLETE / RETAINED / PRODUCTION_VALIDATED`

## Authorization and scope

Product Authority explicitly authorized this bounded Measurement performance slice.

Scope remained limited to the Elo Duo exact-project page. No GTM admin publication, GA4 property/stream mutation, Form 46 mutation, taxonomy change, conversion-role change, Ads/Meta change, PII collection or direct project `gtag()` path was introduced.

## Runtime anchors

```text
BASELINE_RUNTIME_SHA = 41118167a806b9566c19faf336b1ca9cdb8032e9
BASELINE_DEPLOYMENT = dpl_kjZAfKp1VnnVppTYWoDgPfd38GuL / READY

SLICE_07_PR = #217
SLICE_07_HEAD = 12f17d8f87eec9913fa76e8a1165b24bc09731ba
SLICE_07_MERGE_SHA = 8d99996edddd66a59835992da161edbbb3579ad0
SLICE_07_PRODUCTION = dpl_6BP6WssMhisgJMdy91TbFSLyFVXX / READY
CANONICAL_HOST = https://www.moretegra.com.br/
```

## Preserved Measurement contract

```text
GTM = GTM-PGCR4R47
GA4 property = 553742649
GA4 stream = 15759638334
GA4 measurement_id = G-57M2XR0CY2
primary source = mnt_lead_success
primary GA4 mapping = generate_lead
single browser dispatcher = GTM
direct project gtag() = NONE
Consent default = denied x4
Consent accept = granted x4
Consent reject = denied x4
Form 46 = tenant 313 / form_id 46 / MoreEmUmTegra
```

## Change retained

The standard GTM bootstrap was split into two phases:

1. at parse time, initialize `dataLayer` and push the canonical `gtm.start / event: gtm.js` marker immediately;
2. load the same `GTM-PGCR4R47` network script idempotently on:
   - `window.load`; or
   - first `pointerdown`; or
   - first `keydown`.

This preserves the bootstrap marker as the first queued event while moving GTM/GA4 execution out of the pre-load critical path when there is no early interaction.

The existing `noscript` fallback remains unchanged.

## Exact-head repository gates

PR #217 exact head `12f17d8f87eec9913fa76e8a1165b24bc09731ba` closed 7/7 required gates as `SUCCESS`:

- M4-05R metadata validation;
- Commercial page standard validation;
- Favicon standard validation;
- M5-10 Elo Green media slice 01;
- M5-10 Elo late GTM bootstrap slice 07;
- M5-06 CTA/Form journey;
- M5-07 Lead semantics.

The Slice 07 browser gate additionally proved:

```text
load-trigger + accept-after-load:
  GTM requests = 1
  first events = gtm.js, mnt_page_view, mnt_consent_accept

accept-before-load:
  GTM requests = 1
  first events = gtm.js, mnt_page_view, mnt_consent_accept

reject-before-load:
  GTM requests = 1
  first events = gtm.js, mnt_page_view, mnt_consent_reject
```

## Production browser proof

Production QA run:

```text
RUN = 35736764272
JOB = 106775884305
RESULT = SUCCESS
CHROME = 152.0.7977.82
```

Granted path:

```text
window loadEventStart = 1229.5 ms
GTM startTime = 1230.1 ms
GTM delta from load = +0.6 ms
GTM requests = 1
same GA4 tag G-57M2XR0CY2 = observed
Form 46 lead POSTs = 0
```

Denied path:

```text
window loadEventStart = 774.2 ms
GTM startTime = 774.7 ms
GTM delta from load = +0.5 ms
GTM requests = 1
same GA4 tag G-57M2XR0CY2 = observed
Form 46 lead POSTs = 0
```

## Consent proof

Final transport-aware consent proof:

```text
RUN = 35737706576
JOB = 106779118494
RESULT = SUCCESS
```

Observed internal Consent Mode state for all four governed signals:

```text
default:
  ad_storage = false
  analytics_storage = false
  ad_user_data = false
  ad_personalization = false

after accept:
  update = true for all four

after reject:
  update = false for all four
```

The same run observed:

- `mnt_page_view` preserved in `dataLayer`;
- `mnt_consent_accept` preserved;
- `mnt_consent_reject` preserved;
- `mnt_intent` preserved after both choices;
- one GA transport request observed in each scenario;
- zero Form 46 lead submissions.

Two earlier diagnostic attempts (`35737269756` and `35737462693`) failed because the test itself assumed URL-visible GA4 event transport and pre-consent page-view delivery. Those assumptions were not part of the canonical contract. No Production defect was established by those diagnostic failures; the corrected transport-aware proof above supersedes them.

## Production performance result

Lighthouse methodology:

```text
Lighthouse = 13.5.0
Chrome = 152.0.7977.82
form factor = mobile
viewport = 393x852
DPR = 2.75
throttling = simulated
runs = 5
```

Results:

| Run | Score | FCP | LCP | CLS | TBT | Transfer |
|---|---:|---:|---:|---:|---:|---:|
| 1 | 79 | 1,763 ms | 3,067 ms | 0.0325 | 563 ms | 1,062,013 B |
| 2 | 84 | 915 ms | 3,279 ms | 0.0313 | 374 ms | 1,062,024 B |
| 3 | 84 | 1,743 ms | 3,871 ms | 0.0295 | 216 ms | 1,062,703 B |
| 4 | 84 | 1,695 ms | 3,817 ms | 0.0307 | 216 ms | 1,062,608 B |
| 5 | 87 | 1,726 ms | 3,266 ms | 0.0302 | 237 ms | 1,062,615 B |

Medians:

```text
Performance score = 84
FCP = 1,726 ms
LCP = 3,279 ms
CLS = 0.0307
TBT = 237 ms
Transfer = 1,062,608 B
GTM requests = 1
gtag requests = 1
```

Nearest restored clean control:

```text
LCP = 3,676 ms
score = 74
transfer = 1,061,852 B
```

Delta vs clean control:

```text
LCP = -397 ms / -10.80%
score = +10
transfer = +756 B / effectively unchanged
```

Delta vs Slice 01 compact baseline:

```text
LCP = -668 ms / -16.92%
score = +14
```

## Decision

```text
SLICE_07 = RETAINED
FUNCTIONAL_REGRESSION = NOT_OBSERVED
MEASUREMENT_DESTINATION_CHANGED = NO
FORM46_MUTATION = NO
REAL_LEAD_CREATED_BY_QA = NO
TARGET_LCP_2500_MS = NOT_MET
MNT_M5_10 = ACTIVE
TASK_HOURS_ACCEPTED_FROM_SLICE_07 = 0
```

The 10.8% LCP reduction is material relative to the nearest clean same-method control and is achieved without removing GTM/GA4 or changing the Measurement contract.

## Remaining performance signal

Representative run 2 still showed:

- GTM CPU about 221 ms after load;
- GA4 `gtag/js` CPU about 282 ms after load;
- `runtime.js` about 325 ms;
- hero LCP resource-load duration about 419 ms;
- hero element render delay about 85 ms.

Because GTM/GA4 are now shifted outside the critical pre-load path, the hero resource path is again a primary candidate for any future Elo-specific bounded optimization.

No next runtime slice is authorized by this result. Product Authority decision is required.
