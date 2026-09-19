# MNT-M5-01 — CAPIITOLO Local Candidate Validation Evidence

Date: `2026-09-19`  
Candidate branch: `qa/m5-01-integrated-candidate-20260919`  
Candidate head observed: `2477f7ccfd584b40ad5c77c7ee96516e45781f40`

## Scope

Local browser/device-emulation validation of CAPIITOLO candidate behavior while Vercel production remains pre-PR #132.

## F14 — mobile horizontal overflow

Representative widths visually exercised:

```text
360 px
375 px
393 px
440 px
```

Observed result:

- H1 remains inside the viewport;
- top pilot badge remains inside the viewport;
- no page-level horizontal displacement was observed in the supplied local screenshots;
- floating CTA/WhatsApp remain visible;
- no global `overflow-x:hidden` workaround was introduced.

```text
F14_LOCAL_CANDIDATE_VALIDATION = PASS
PRODUCTION_VALIDATION = PENDING
```

## F12 — CAPIITOLO tab interaction

Local candidate screenshots show active-state movement in:

- scene gallery (`Piscina coberta`);
- typology selector (`Giardino (Garden)`).

The Product Authority reported the instructed keyboard interaction as working in the local candidate.

```text
F12_LOCAL_CANDIDATE_KEYBOARD_VALIDATION = USER_REPORTED_PASS
F12_SOURCE_ARIA_CONTRACT = STATIC_VALIDATED
PRODUCTION_VALIDATION = PENDING
```

## Evidence boundary

This is local candidate evidence only.

It does not prove:

- production deployment;
- screen-reader behavior;
- full browser/device matrix completion.

Official release order remains governed by the Vercel recovery queue.
