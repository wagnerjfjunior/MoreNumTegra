# MNT-M3-07 — GA4 Test Traffic Adjudication

Status: `AUTHORITATIVE_PRODUCT_AUTHORITY_CLARIFICATION`

Product Authority clarified on 2026-09-13 that all leads generated from `https://moretegra.com.br` during the current validation period were deliberately created for GTM/measurement validation.

Therefore the seven `generate_lead` key events observed in GA4 for `2026-09-10..2026-09-13` are measurement/QA evidence only and MUST NOT be used as a commercial lead baseline, organic lead baseline, conversion-rate baseline, funnel-performance result, or business-outcome KPI.

Governed interpretation:

- Referral: 17 sessions / 6 `generate_lead` key events — observed telemetry, lead events = TEST_ONLY.
- Unassigned: 1 session / 1 `generate_lead` key event — observed telemetry, lead event = TEST_ONLY.
- Organic Search: no session row observed.
- commercial accepted leads baseline = `NOT_YET_BASELINED`.
- organic accepted leads baseline = `NOT_YET_BASELINED`.
- organic Search-to-lead conversion rate = `NOT_COMPUTABLE`.

The test events remain valid proof that the GTM/GA4 lead lifecycle fired during validation. They are excluded from commercial performance measurement.

Precedence rule for M3-07: this adjudication overrides any wording that could characterize the seven observed `generate_lead` events as accepted business leads. It does not alter the underlying raw GA4 observation counts.
