# MNT-M2-10 — End-to-End Measurement QA — 2026-09-12

Status: `ACTIVE / REMEDIATION_LIVE_VALIDATION_PENDING`. This document does not claim completion until every mandatory scenario is adjudicated from evidence.

## 1. Authorization and canonical anchor

- Project: `MoreNumTegra`
- Program: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Task: `MNT-M2-10 — Execute end-to-end Measurement QA`
- Product Authority authorization: explicit start authorization in project conversation on `2026-09-12`
- Product Authority corrective authorization: explicit authorization to remediate the lead-validity P1 candidate on `2026-09-12`
- Canonical `main` resolved before execution: `ba2a70c793e6879d28192fda4730f950ec6cc68d`
- Execution branch: `qa/mnt-m2-10-e2e-measurement`
- Execution PR: `#54`
- Execution mode: `QA / EVIDENCE + BOUNDED AUTHORIZED REMEDIATION`
- Mutation boundary: no GTM/GA4/Meta/Ads/DNS/Search Console/Vercel automatic mutation is authorized merely to make a QA check pass. The only currently authorized runtime correction is the bounded page-294 lead-validity guard described below.

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

## 3. Evidence inspected in this QA

### 3.1 Canonical source inspection at task start

Resolved source blobs from canonical `main` at task start:

```text
src-greenn/modules/moretegra.measurement.js = 4b451b0c4e05fb37009ca50ebd608d99707c0f78
src-greenn/modules/moretegra.lead-journey.js = 6b525f48393c70c4250df42429e73c646cf3ba61
src-greenn/thank-you/obrigado.js = bf5864429e43465058823a19b100a35bc4754f75
src-greenn/moretegra.js = aa0f2b51a222be92061d0c40dc322a46ad74ac97
```

Static controls observed in the accepted baseline:

- project source events are gated by `window.location.hostname === "moretegra.com.br"`;
- `mnt_page_view` uses a per-document `Symbol.for(...)` marker and emits only once from the project source path;
- catalogue free-form search uses a 600 ms debounce and emits only controlled `search_state`, controlled `search_location`, `result_count` and `placement`, not raw typed text;
- Form 46 start uses a `WeakSet` to fire at most once per form instance;
- Form 46 submit attempt is bound to the verified Green submit button and does not intercept the native submit;
- accepted page-292 lead pending state stores only `Date.now()` in session storage;
- repository search found no direct project `gtag(` or `fbq(` call;
- the consolidated page-292 artifact contains Measurement v6 + Form 46 lead guard v4.

### 3.2 Accepted Version 7 Tag Assistant export reused as current-runtime evidence

Evidence file already supplied during MNT-M2-09 and re-inspected for MNT-M2-10:

```text
file = tag_assistant_moretegra_com_br_2026_09_12 (12).json
SHA-256 = 7f5625dd8b3d80129c9935d5749793d67c038a51762bd246506fe7f3afec8deb
size = 1,605,135 bytes
```

Observed in that Version 7 successful Form 46 journey:

```text
GTM source-event occurrences:
mnt_page_view = 1
mnt_intent = 1
mnt_form_start = 1
mnt_form_submit_attempt = 1
mnt_lead_success = 1

tag firings:
GA4 page_view from mnt_page_view = 1
GA4 mnt_intent = 1
GA4 mnt_form_start = 1
GA4 mnt_form_submit_attempt = 1
GA4 generate_lead from mnt_lead_success = 1
```

The Google Tag configuration in the export has `send_page_view = false`; the project page-view is therefore the explicit `mnt_page_view -> GA4 page_view` path rather than automatic + manual coexistence for the tested load.

The Green `gtm.formSubmit` event is present in the export but no project GA4 tag executes on that event. Visitor form fields therefore remain platform telemetry and are not forwarded by the project mapping.

The `generate_lead` tag executed successfully and its configured event parameters are limited to governed non-PII fields:

```text
mnt_event_id
mnt_event_version
page_identity
product_identity
route
funnel_stage
placement
form_provider
form_id
form_name
lead_method
```

No `value`, `currency`, visitor name, visitor email or visitor phone parameter is configured for `generate_lead`; ecommerce sending is disabled.

Consent evidence in the same Version 7 export shows:

```text
default: ad_storage = denied
         analytics_storage = denied
         ad_user_data = denied
         ad_personalization = denied

accepted update: all four = granted
wasSetLate = false
```

The home -> `/obrigado` flow also shows granted consent available on the subsequent thank-you page load, supporting granted-state persistence for that tested path. Current Version 7 denied-choice persistence still requires dedicated evidence.

## 4. QA finding and authorized remediation

MNT-M2-10 discovered a lead-validity defect in the accepted thank-you guard: a fresh submit-button timestamp plus manual `/obrigado` navigation could manufacture the primary conversion without verified Green success.

Finding:

`docs/measurement/MNT_M2_10_FINDING_LEAD_GUARD_2026-09-12.md`

Product Authority authorized bounded remediation.

PR #54 candidate changes page 294 only:

```text
src-greenn/thank-you/obrigado.js
lifecycle v2 -> v3
```

Candidate v3 requires both:

```text
fresh pending submit-attempt timestamp <= 10 minutes
AND
observed Green success redirect signature:
  p_id = 292
  l_ = positive integer opaque redirect reference
```

The redirect parameters are not persisted or sent to GA4. Pending state is consumed fail-closed on canonical `/obrigado` evaluation so a failed/manual visit cannot preserve the marker for later URL manipulation.

PR #54 also adds deterministic, dependency-free guard coverage:

`scripts/test-thank-you-lead-guard.mjs`

The exact candidate logic passed syntax/runtime simulation for:

- direct `/obrigado` -> no lead;
- fresh pending without Green redirect signature -> no lead and pending consumed;
- fresh pending + observed signature -> exactly one lead;
- invalid/zero `l_` -> no lead;
- wrong `p_id` -> no lead;
- stale pending -> no lead;
- wrong route/host -> no lead;
- refresh without a new pending marker -> no duplicate lead.

This deterministic test supports the remediation design but does not replace Green live validation.

## 5. QA contract and current adjudication

| ID | Scenario / control | Expected result | Current state |
|---|---|---|---|
| QA-01 | direct canonical home load | exactly one project-owned page-view path per document load | PASS — Version 7 tested load: 1 `mnt_page_view`, 1 GA4 `page_view`, `send_page_view=false` |
| QA-02 | `www.moretegra.com.br` alias path | zero project business/page Measurement on `www`; at most one canonical page view after arrival on non-www | STATIC_CONTROL_PASS / LIVE_ALIAS_EVIDENCE_PENDING |
| QA-03 | canonical reload | one new project page view for the new document load, never automatic + manual duplicate | PENDING_LIVE |
| QA-04 | one semantic UI action | one canonical source event and one new `mnt_event_id` | PARTIAL_PASS — tested `mnt_intent` occurrence unique; broader sampling pending |
| QA-05 | repeated intentional UI action | new semantic occurrence with new `mnt_event_id`; no synchronization duplicate | PENDING_LIVE |
| QA-06 | catalogue free-form search | debounced/committed event only; no event per keystroke; no raw query text | STATIC_PASS / CURRENT_V7_RUNTIME_REVALIDATION_PENDING |
| QA-07 | Form 46 first interaction | `mnt_form_start` at most once per document/form instance | PASS — source guard + Version 7 occurrence count = 1 |
| QA-08 | Form 46 submit initiation | exactly one `mnt_form_submit_attempt`; remains non-conversion | PASS — Version 7 occurrence/tag count = 1; no conversion semantics |
| QA-09 | submit attempt without verified success | no `mnt_lead_success` / no `generate_lead` | ORIGINAL_BASELINE_FAILING_PATH FOUND; REMEDIATION_STATIC/UNIT PASS; LIVE_NEGATIVE_PATH_PENDING |
| QA-10 | verified Form 46 success | exactly one `mnt_lead_success` and one GA4 `generate_lead` | BASELINE PASS — Version 7 + GA4 DebugView; MUST_REVALIDATE_AFTER_PAGE294_V3 |
| QA-11 | direct `/obrigado` | no manufactured `mnt_lead_success` / `generate_lead` | REMEDIATION_STATIC/UNIT PASS; LIVE_NEGATIVE_PATH_PENDING |
| QA-12 | refresh/back on `/obrigado` after accepted lead | no duplicate lead conversion without a new valid Form 46 submission | REMEDIATION_UNIT PASS; LIVE_REFRESH/BACK_PENDING |
| QA-13 | stale pending lead state (>10 min) | no manufactured lead | REMEDIATION_UNIT PASS; LIVE_OR_CONTROLLED_RUNTIME_OPTIONAL_CONFIRMATION_PENDING |
| QA-14 | privacy — Form 46 | no visitor name/email/phone/raw field values in project MNT/GA4 payloads | PASS for accepted Version 7 project payload; remediation adds no PII |
| QA-15 | privacy — catalogue search | no raw free-form search text in project MNT/GA4 payloads | STATIC_PASS / CURRENT_V7_RUNTIME_REVALIDATION_PENDING |
| QA-16 | source/destination architecture | no direct project `gtag()` / second GA4 path outside `GTM-PGCR4R47` | STATIC_PASS + tested explicit page-view path; broader runtime duplicate proof pending QA-02/03 |
| QA-17 | Meta boundary | no direct project `fbq()` / second Meta project-owned path while Meta remains unimplemented | STATIC_PASS; runtime Meta remains not implemented by accepted scope |
| QA-18 | Green platform telemetry | Green `/page/view` and `gtm.formSubmit` are not forwarded as project business events | PASS for `gtm.formSubmit`; `/page/view` separation supported statically / broader network proof pending if required |
| QA-19 | conversion semantics | form start/submit attempt remain non-conversions; only verified lead maps to `generate_lead` | PASS — Version 7 mapping; remediation tightens lead validity without GTM change |
| QA-20 | conversion value | no property/listing price or inferred monetary value attached to `generate_lead` | PASS — no value/currency; ecommerce disabled |
| QA-21 | consent default | all four governed consent types start denied before affirmative choice | PASS — Version 7 export |
| QA-22 | consent granted | Continue/accept updates all four to granted; timing not late | PASS — Version 7 export, `wasSetLate=false` |
| QA-23 | consent denied | Cancel/deny leaves all four governed consent types denied | PENDING_CURRENT_V7_NEGATIVE_PATH |
| QA-24 | consent persistence | granted and denied decisions persist after reload | PARTIAL_PASS — granted persistence observed across tested flow; denied persistence pending current Version 7 evidence |
| QA-25 | taxonomy envelope | semantic events preserve taxonomy v1 names, required envelope and controlled parameters | STATIC_PASS + sampled Version 7 runtime PASS; full scenario coverage pending |

## 6. Remaining live evidence required before closure

After the authorized page-294 correction is published for validation, the remaining targeted evidence includes:

1. direct `/obrigado` with no valid submission -> zero `mnt_lead_success` / zero `generate_lead`;
2. one genuine successful Form 46 registration -> exactly one `mnt_lead_success` + one `generate_lead` under v3;
3. refresh/back on the successful thank-you URL -> no second lead;
4. submit attempt without verified success followed by direct `/obrigado` -> no lead;
5. `www.moretegra.com.br` alias behavior;
6. canonical reload page-view uniqueness;
7. repeated intentional event identity / no UI-sync duplicates;
8. current Version 7 catalogue search cardinality/privacy;
9. current Version 7 denied consent path and denied persistence.

Stale-pending behavior is already deterministic-unit covered and may be additionally observed live/controlled if practical without delaying closure unnecessarily.

No GTM/GA4 mutation is required for the currently authorized remediation or its validation.

## 7. Pass/fail rules

- `PASS` requires direct evidence for the scenario in the current accepted runtime or an explicitly reusable accepted evidence package whose scope still matches Version 7.
- `FAIL` records the observed contract violation; QA does not silently mutate unrelated production configuration to force a pass.
- `NOT_PROVEN` / `OPEN` is required when evidence is insufficient.
- Historical evidence remains historical; it cannot be silently promoted to current proof if the relevant runtime changed.
- Platform telemetry may be observed but must remain separated from project-owned Measurement semantics.

## 8. Evidence handling

Expected evidence classes include Tag Assistant/GTM Preview exports, GA4 DebugView confirmation where destination proof is material, current GitHub source inspection and user-supplied screenshots/exports when a browser/Google UI session is required.

No visitor PII should be persisted into repository evidence. If a raw platform export contains visitor form values, repository documentation records only sanitized findings/hashes, not the raw PII payload.

## 9. Exit criteria

MNT-M2-10 may be accepted complete only when:

1. every mandatory QA row is adjudicated `PASS`, or an explicit residual is documented and accepted without inventing PASS;
2. no P0/P1 Measurement defect remains unadjudicated;
3. canonical-host, duplicate-path, privacy, lead-validity, consent and conversion semantics are supported by evidence;
4. findings are canonicalized in project documentation;
5. Product Authority explicitly authorizes the final acceptance/merge lifecycle.

Until then:

`MNT-M2-10 = ACTIVE / REMEDIATION_LIVE_VALIDATION_PENDING / NOT_COMPLETE`.
