# MNT-M2-10 Finding — Lead guard could be satisfied without verified Green success

Status: `REMEDIATION_IMPLEMENTED_IN_PR / LIVE_VALIDATION_PENDING`

## 1. Scope

This finding was discovered during Product Authority-authorized `MNT-M2-10 — Execute end-to-end Measurement QA` against canonical main `ba2a70c793e6879d28192fda4730f950ec6cc68d`.

Product Authority explicitly authorized bounded remediation in the project conversation on `2026-09-12`.

The remediation is implemented only in PR #54 / branch `qa/mnt-m2-10-e2e-measurement` until live negative/positive-path validation and later lifecycle acceptance. No claim is made that canonical `main` or Green production already contains the correction.

## 2. Governing contract

Accepted Measurement contracts require:

```text
FORM_SUBMIT_ATTEMPT != LEAD
ONLY VERIFIED GREEN FORM 46 SUCCESS -> mnt_lead_success
DIRECT /obrigado MUST NOT MANUFACTURE A LEAD
```

Relevant sources:

- `docs/measurement/MNT_M2_02_TRANSPORT_DEDUP_ARCHITECTURE_2026-09-10.md`;
- `docs/measurement/MNT_M2_03_CANONICAL_EVENT_TAXONOMY_V1_2026-09-10.md`;
- `docs/measurement/MNT_M2_04_PRIMARY_SECONDARY_CONVERSIONS_V1_2026-09-10.md`;
- `docs/NEXT_SAFE_ACTION.md`.

## 3. Original failing implementation

The accepted page-292 guard writes:

```text
sessionStorage["mnt.lead.pending.v1"] = Date.now()
```

on a click of the verified Green submit button when the expected Form 46 structure is present.

The original thank-you page v2 emitted `mnt_lead_success` when all were true:

```text
hostname = moretegra.com.br
path = /obrigado
pending timestamp exists
pending age <= 10 minutes
```

That meant a submit-button click could arm the browser marker even if Green registration later failed. A manual `/obrigado` visit inside the 10-minute window could then consume that marker and manufacture the primary conversion.

## 4. Original failing path

```text
1. user clicks the Green Form 46 submit button
2. pending timestamp is armed
3. Green registration does not complete / no verified success exists
4. within 10 minutes, browser is navigated directly to https://moretegra.com.br/obrigado
5. thank-you script consumes the fresh pending timestamp
6. mnt_lead_success is emitted
7. GTM Version 7 maps it to GA4 generate_lead
```

This violated:

`NO VERIFIED GREEN SUCCESS -> NO PRIMARY LEAD`.

## 5. Authorized remediation

The correction keeps the native Green lifecycle unchanged and changes only the dedicated page-294 artifact:

`src-greenn/thank-you/obrigado.js`

Thank-you lifecycle version is bumped from v2 to v3.

A primary lead now requires **both**:

1. a fresh `sessionStorage["mnt.lead.pending.v1"]` submit-attempt marker, age <=10 minutes; and
2. the observed Green successful redirect signature on `/obrigado`:

```text
p_id = 292
l_ = positive integer / opaque Green redirect reference
```

Important boundaries:

- `l_` is treated only as an observed opaque Green redirect reference; this project does not claim or depend on undocumented business semantics for the value;
- `l_` and `p_id` are not copied into the `mnt_lead_success`/GA4 payload;
- no visitor PII is read or stored by this correction;
- no custom POST/fetch is added;
- no GTM/GA4 configuration change is required;
- page 292 remains the existing single consolidated `src-greenn/moretegra.js` artifact;
- page 294 remains one complete dedicated `src-greenn/thank-you/obrigado.js` artifact.

The pending marker is consumed on any canonical `/obrigado` evaluation with a valid timestamp, including when the success redirect signature is absent. This is deliberately fail-closed: a failed/manual thank-you visit cannot leave the pending marker available for later URL manipulation.

## 6. Deterministic guard test

PR #54 adds:

`scripts/test-thank-you-lead-guard.mjs`

The dependency-free Node test covers:

- direct `/obrigado` without pending -> no lead;
- fresh pending + direct `/obrigado` without Green redirect signature -> no lead and pending consumed;
- fresh pending + observed signature `?l_=<positive integer>&p_id=292` -> exactly one `mnt_lead_success`;
- zero/non-numeric `l_` -> no lead;
- wrong `p_id` -> no lead;
- stale pending >10 minutes -> no lead;
- wrong route -> no lead;
- noncanonical host -> no lead;
- refresh with the success URL but no new pending marker -> no duplicate lead.

Local deterministic execution of the exact candidate logic passed before repository publication.

Static/unit coverage is not a substitute for Green production validation. The successful native Form 46 redirect must still be revalidated after page-294 publication, and the original negative path must be exercised live.

## 7. Impact after remediation candidate

The original false-positive path is blocked by the candidate because a fresh button-click marker alone is insufficient.

The correction intentionally prefers false-negative behavior over manufacturing a primary conversion if Green changes its redirect signature.

Provisional QA state:

```text
severity = P1_CANDIDATE
class = MEASUREMENT_INTEGRITY / FALSE_PRIMARY_CONVERSION
static remediation = IMPLEMENTED
unit guard = PASS
live negative path = PENDING
live positive Form 46 path = PENDING_REVALIDATION
MNT-M2-10 = ACTIVE / NOT_COMPLETE
```

## 8. Required live validation

Before this finding may be closed:

1. publish the complete branch `src-greenn/thank-you/obrigado.js` to Green page 294;
2. direct `/obrigado` must emit no `mnt_lead_success` / `generate_lead`;
3. a submit-button attempt that does not reach Green success, followed by direct `/obrigado`, must emit no lead;
4. one genuine successful Form 46 registration must still redirect with the observed signature and emit exactly one `mnt_lead_success` -> one `generate_lead`;
5. refreshing the successful thank-you URL must not emit a second lead.

No GTM/GA4 mutation is required for this validation.

Until the live checks pass:

`MNT-M2-10 = ACTIVE / REMEDIATION_LIVE_VALIDATION_PENDING / NOT_COMPLETE`.
