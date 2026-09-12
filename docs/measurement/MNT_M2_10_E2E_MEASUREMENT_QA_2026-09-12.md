# MNT-M2-10 — End-to-End Measurement QA — 2026-09-12

Status: `ACTIVE / EVIDENCE_COLLECTION` while this branch/PR is under execution. This document does not claim completion until every mandatory scenario is adjudicated from evidence.

## 1. Authorization and canonical anchor

- Project: `MoreNumTegra`
- Program: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Task: `MNT-M2-10 — Execute end-to-end Measurement QA`
- Product Authority authorization: explicit start authorization in project conversation on `2026-09-12`
- Canonical `main` resolved before execution: `ba2a70c793e6879d28192fda4730f950ec6cc68d`
- Execution mode: `QA / READ-ONLY OBSERVATION / EVIDENCE`
- Mutation boundary: no GTM/GA4/Meta/Ads/DNS/Search Console/Green structural/Vercel automatic mutation is authorized merely to make a QA check pass.

## 2. Accepted runtime baseline under test

Evidence dependency:

`docs/measurement/MNT_M2_09_TRACKING_IMPLEMENTATION_EVIDENCE_2026-09-12.md`

```text
GTM = GTM-PGCR4R47
GTM accepted publication = Version 7
GA4 property_id = 553742649
GA4 stream_id = 15759638334
GA4 measurement_id = G-57M2XR0CY2
canonical host = moretegra.com.br
source primary event = mnt_lead_success
GA4 primary event = generate_lead
generate_lead = GA4 Key event / Evento principal
```

Green runtime topology:

```text
page 292 = https://moretegra.com.br/
page 294 = https://moretegra.com.br/obrigado
Form 46 = tenant 313 / form_id 46 / title MoreEmUmTegra
page 292 JS = src-greenn/moretegra.js
page 294 JS = src-greenn/thank-you/obrigado.js
```

## 3. QA contract

MNT-M2-10 must prove or explicitly leave `NOT_PROVEN` each mandatory control below.

| ID | Scenario / control | Expected result | State |
|---|---|---|---|
| QA-01 | direct canonical home load | exactly one project-owned page-view path per document load | PENDING |
| QA-02 | `www.moretegra.com.br` alias path | zero project business/page Measurement on `www`; at most one canonical page view after arrival on non-www | PENDING |
| QA-03 | canonical reload | one new project page view for the new document load, never automatic + manual duplicate | PENDING |
| QA-04 | one semantic UI action | one canonical source event and one new `mnt_event_id` | PENDING |
| QA-05 | repeated intentional UI action | a new semantic occurrence with a new `mnt_event_id`; no synchronization duplicate | PENDING |
| QA-06 | catalogue free-form search | debounced/committed event only; no event per keystroke; no raw query text | PENDING |
| QA-07 | Form 46 first interaction | `mnt_form_start` at most once per document/form instance | PENDING |
| QA-08 | Form 46 submit initiation | exactly one `mnt_form_submit_attempt`; remains non-conversion | PENDING |
| QA-09 | submit attempt without verified success | no `mnt_lead_success` / no `generate_lead` | PENDING |
| QA-10 | verified Form 46 success | exactly one `mnt_lead_success` and one GA4 `generate_lead` | PARTIALLY_PROVEN_BY_M2_09 / REVALIDATE |
| QA-11 | direct `/obrigado` | no manufactured `mnt_lead_success` / `generate_lead` | PENDING |
| QA-12 | refresh/back on `/obrigado` after accepted lead | no duplicate lead conversion without a new valid Form 46 submission | PENDING |
| QA-13 | stale pending lead state (>10 min) | no manufactured lead | PENDING |
| QA-14 | privacy — Form 46 | no visitor name/email/phone/raw field values in project MNT/GA4 payloads | PARTIALLY_PROVEN_BY_M2_09 / REVALIDATE |
| QA-15 | privacy — catalogue search | no raw free-form search text in project MNT/GA4 payloads | PENDING |
| QA-16 | source/destination architecture | no direct project `gtag()` / second GA4 path outside `GTM-PGCR4R47` | PENDING |
| QA-17 | Meta boundary | no direct project `fbq()` / second Meta project-owned path while Meta remains unimplemented | PENDING |
| QA-18 | Green platform telemetry | Green `/page/view` and `gtm.formSubmit` are not forwarded as project business events | PENDING |
| QA-19 | conversion semantics | `mnt_form_start` and `mnt_form_submit_attempt` remain non-conversions; only verified lead maps to `generate_lead` | PARTIALLY_PROVEN_BY_M2_09 / REVALIDATE |
| QA-20 | conversion value | no property/listing price or inferred monetary value attached to `generate_lead` | PARTIALLY_PROVEN_BY_M2_09 / REVALIDATE |
| QA-21 | consent default | all four governed consent types start denied before affirmative choice | PENDING_CURRENT_V7 |
| QA-22 | consent granted | Continue/accept updates all four governed consent types to granted; timing not late | PENDING_CURRENT_V7 |
| QA-23 | consent denied | Cancel/deny leaves all four governed consent types denied | PENDING_CURRENT_V7 |
| QA-24 | consent persistence | granted and denied decisions persist after reload as contracted | PENDING_CURRENT_V7 |
| QA-25 | taxonomy envelope | implemented semantic events preserve taxonomy v1 names, required envelope and controlled parameter enums | PENDING |

## 4. Pass/fail rules

- `PASS` requires direct evidence for the scenario in the current accepted runtime or an explicitly reusable accepted evidence package whose scope still matches Version 7.
- `FAIL` records the observed contract violation; QA does not silently mutate production to force a pass.
- `NOT_PROVEN` / `OPEN` is required when evidence is insufficient.
- Historical evidence remains historical; it cannot be silently promoted to current Version 7 proof if the relevant runtime changed.
- Platform telemetry may be observed but must remain separated from project-owned Measurement semantics.

## 5. Evidence sources

Expected evidence classes include:

- Tag Assistant / GTM Preview exports;
- GA4 DebugView / recent-event confirmation where destination proof is required;
- current GitHub source inspection at the accepted canonical SHA;
- direct non-invasive HTTP/browser observations for canonical-host/alias behavior where the tool can prove them;
- user-supplied screenshots/exports when the Google UI or browser session is required.

No visitor PII should be persisted into repository evidence. If a raw platform export contains visitor form values, repository documentation records only sanitized findings/hashes, not the raw PII payload.

## 6. Exit criteria

MNT-M2-10 may be accepted complete only when:

1. every mandatory QA row is adjudicated `PASS`, or an explicit residual is documented and accepted without inventing PASS;
2. no P0/P1 Measurement defect remains unadjudicated;
3. canonical-host, duplicate-path, privacy, lead-validity, consent and conversion semantics are supported by evidence;
4. findings are canonicalized in project documentation;
5. Product Authority explicitly authorizes the final acceptance/merge lifecycle.

Until then:

`MNT-M2-10 = ACTIVE / NOT_COMPLETE`.
