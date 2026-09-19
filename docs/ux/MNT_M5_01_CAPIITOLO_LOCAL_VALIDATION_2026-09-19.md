# MNT-M5-01 — CAPIITOLO Local Candidate Validation Evidence

Date: `2026-09-19`  
Candidate branch: `qa/m5-01-integrated-candidate-20260919`  
Candidate head observed for final reflow retest: `01bba0b662923c57756cd7360b57f7babcc01ec8`

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

## F16 — fixed dock overlap under high zoom / short reflow viewport

Initial local 200% browser-zoom validation showed the fixed `Receber condições` and WhatsApp controls covering required CAPIITOLO content.

PR #137 was extended at the runtime injection source so that only the CAPIITOLO fixed controls are hidden when the effective viewport height is `<= 400px`.

Final local validation proved:

- 150% zoom: both fixed controls remain visible;
- 200% zoom: both fixed controls are hidden;
- 200% Form 46 view: country, phone and `Enviar solicitação` remain visible and unobstructed.

```text
F16_LOCAL_CANDIDATE_VALIDATION = PASS
150_PERCENT_DOCK = VISIBLE
200_PERCENT_DOCK = HIDDEN
200_PERCENT_FORM46_OBSTRUCTION = NONE
PRODUCTION_VALIDATION = PENDING
```

## Evidence boundary

This is local candidate evidence only.

It does not prove:

- production deployment;
- screen-reader behavior;
- full browser/device matrix completion.

Official release order remains governed by the Vercel recovery queue.
