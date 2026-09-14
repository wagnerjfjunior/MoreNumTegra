# MNT-M3-07 — KPI Baseline and Success Criteria — 2026-09-13

Status: `COMPLETE_CANDIDATE / PENDING_PRODUCT_AUTHORITY_ACCEPTANCE`

## Product Authority clarification — test traffic

Product Authority clarified on 2026-09-13 that all leads generated from `https://moretegra.com.br` during the current validation period were deliberately created to validate GTM/GA4 measurement.

Therefore the observed `generate_lead` events in the M3-07 GA4 window are **TEST_ONLY measurement evidence**. They MUST NOT be used as a commercial lead baseline, organic lead baseline, conversion-rate baseline, funnel-performance result or business-outcome KPI.

Governed states:

- total sessions remain telemetry observations;
- 7 observed `generate_lead` key events prove the measurement lifecycle fired;
- commercial accepted leads baseline = `NOT_YET_BASELINED`;
- organic accepted leads baseline = `NOT_YET_BASELINED`;
- organic Search-to-lead conversion rate = `NOT_COMPUTABLE`;
- no absent Organic Search row is converted into a 0% claim.

Authoritative supporting adjudication:

`docs/search/MNT_M3_07_GA4_TEST_TRAFFIC_ADJUDICATION_2026-09-13.md`

## Search baseline

Accepted M3-01 frozen Search Console snapshot for `2026-08-23..2026-09-13`:

- clicks = 0
- impressions = 26
- weighted average position ≈ 27.52

A later live reread of the same historical window returned:

- clicks = 0
- impressions = 23
- average position = 26.2609

These are distinct provenance states:

`FROZEN_SNAPSHOT != LATER_CONNECTOR_REREAD`

Named query rows sum to 13 impressions and are not silently equated to the 23-impression property total.

## Governed KPI rules

```text
NO OBSERVATION != ZERO
NO ORGANIC SESSION ROW != ZERO PERCENT CONVERSION
TEST LEAD != COMMERCIAL LEAD
GA4 LEAD != SEARCH-ATTRIBUTED LEAD WITHOUT CHANNEL EVIDENCE
TARGET DEFINED != IMPLEMENTATION AUTHORIZED
```

The machine-readable KPI matrix marks the 7 all-channel `generate_lead` events as `TEST_ONLY / MEASUREMENT_VALIDATION_ONLY`.

M3-05 governs 41 query families. M3-06 preserves one explicit ownership state per family. M3-04 volatile commercial claims remain subject to release-time revalidation.

Future organic Search-to-lead rate is defined only as:

`production organic accepted leads / governed organic sessions`

using one frozen reporting window and consistent GA4 channel semantics.

## Current lifecycle

```text
MNT-M3-04 = COMPLETE / ACCEPTED / MERGED
MNT-M3-05 = COMPLETE / ACCEPTED / MERGED
MNT-M3-06 = COMPLETE / ACCEPTED / MERGED
MNT-M3-07 = COMPLETE_CANDIDATE / PENDING_PRODUCT_AUTHORITY_ACCEPTANCE
MNT-M4 = PRE_AUTHORIZED_BY_PRODUCT_AUTHORITY / NOT_STARTED
```

The focal `seo_analytics_growth` gate must verify that GTM validation leads are excluded from all business-performance baselines before Product Authority acceptance.
