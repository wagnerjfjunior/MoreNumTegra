# MNT-M2-10 Finding — Lead guard can be satisfied without verified Green success

Status: `OPEN / P1_CANDIDATE / STATICALLY_PROVEN_CODE_PATH`

## 1. Scope

This finding was discovered during Product Authority-authorized `MNT-M2-10 — Execute end-to-end Measurement QA` against canonical main `ba2a70c793e6879d28192fda4730f950ec6cc68d`.

It is a QA finding only. No remediation is performed by this document.

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

## 3. Observed implementation logic

Current page-292 guard (`src-greenn/modules/moretegra.lead-journey.js`, blob `6b525f48393c70c4250df42429e73c646cf3ba61`) writes:

```text
sessionStorage["mnt.lead.pending.v1"] = Date.now()
```

on a click of the verified Green submit button when the expected form structure is present.

It deliberately does not wait for a native `submit`, form validity result, Green response, or Green success signal.

Current thank-you logic (`src-greenn/thank-you/obrigado.js`, blob `bf5864429e43465058823a19b100a35bc4754f75`) emits `mnt_lead_success` when all are true:

```text
hostname = moretegra.com.br
path = /obrigado
pending timestamp exists
pending age <= 10 minutes
```

The pending key is then removed before event emission.

## 4. Failing path

The following path satisfies the current browser guard without verified Green lead registration:

```text
1. user clicks the Green Form 46 submit button
2. pending timestamp is armed
3. Green registration does not complete / no verified success exists
4. within 10 minutes, browser is navigated directly to https://moretegra.com.br/obrigado
5. thank-you script consumes the fresh pending timestamp
6. mnt_lead_success is emitted
7. GTM Version 7 maps it to GA4 generate_lead
```

The thank-you code cannot distinguish an actual Green success redirect from a manual/direct navigation when a fresh pending timestamp exists.

Therefore the stronger contract:

`NO VERIFIED GREEN SUCCESS -> NO PRIMARY LEAD`

is not fully enforced by the current two-factor browser guard.

## 5. Impact

Potential impact is false-positive primary conversion counting in an edge path involving a submit-button click followed by direct/manual `/obrigado` navigation within the 10-minute pending window.

Normal successful Green submissions remain correctly counted in the already accepted Version 7 evidence, and refresh after a valid lead remains protected because the pending key is consumed before emission.

This finding does not imply that ordinary successful production leads are currently duplicated. It means the hard validity invariant is bypassable in a bounded negative path.

## 6. Severity / QA adjudication

Provisional classification:

```text
severity = P1_CANDIDATE
class = MEASUREMENT_INTEGRITY / FALSE_PRIMARY_CONVERSION
MNT-M2-10 = BLOCKED_FROM_PASS until adjudicated
```

Reason: the only V1 primary conversion can be produced without independently verified Green success under the described path.

## 7. Remediation boundary

MNT-M2-10 is QA/evidence bounded. It does not itself authorize a runtime correction.

Possible remediation approaches must be separately authorized and then tested. Any chosen correction must preserve:

- native Green Form 46 lifecycle;
- no custom duplicate POST;
- no visitor PII in Measurement;
- one consolidated page-292 JavaScript artifact;
- no direct `gtag()`/`fbq()`;
- exactly one primary conversion per verified lead.

No specific remediation is accepted by this finding document.

## 8. Required next decision

Product Authority must adjudicate whether to authorize a bounded corrective change before MNT-M2-10 can be accepted complete.

Until adjudication:

`MNT-M2-10 = ACTIVE / P1_CANDIDATE_OPEN / NOT_COMPLETE`.
