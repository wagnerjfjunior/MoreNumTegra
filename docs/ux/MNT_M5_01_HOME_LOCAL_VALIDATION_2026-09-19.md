# MNT-M5-01 — Home Local Candidate Validation Evidence

Date: `2026-09-19`  
Candidate branch: `qa/m5-01-integrated-candidate-20260919`  
Candidate head observed for final skip-link retest: `dc6e69adb30427a0afa3995fef86d890fc221378`

## F01 — mobile primary navigation

Local Chrome device-emulation screenshots were supplied for approximately:

```text
360 px
393 px
400 px
```

Observed result:

- primary mobile navigation is visible;
- `Empreendimentos`, `Como escolher` and `Receber contato` are exposed in the mobile header;
- no page-level horizontal displacement is apparent in the unobstructed 400 px screenshot;
- the mobile header remains inside the viewport.

```text
F01_LOCAL_CANDIDATE_VISUAL_VALIDATION = PASS
HOME_FLOATING_DOCK_CONTENT_OVERLAP = NOT_OBSERVED
PRODUCTION_VALIDATION = PENDING
```

Additional supplied local screenshot at ~400 px width and the lower-page/footer area showed the floating lead/WhatsApp actions without obscuring required footer content or links. This is treated as a local visual PASS for the no-covering criterion.

## F02 — skip-to-content

Local Chrome validation on the rebuilt integrated candidate proved both required behaviors:

1. after reload, the first Tab exposes the visible `Ir para o conteúdo` skip link with a clear focus indicator;
2. after Enter, DevTools `document.activeElement.id` returned exactly `"conteudo"`.

The earlier build exposed the skip link but did not transfer DOM focus. PR #133 was revised with an explicit vanilla-JS focus transfer and the rebuilt QA candidate was re-tested successfully.

```text
SKIP_LINK_VISIBLE_ON_FIRST_TAB = PASS
SKIP_LINK_FOCUS_INDICATOR = PASS
SKIP_LINK_ACTIVATION_TARGET = #conteudo
DOCUMENT_ACTIVE_ELEMENT_ID_AFTER_ENTER = conteudo
F02_LOCAL_CANDIDATE_VALIDATION = PASS
PRODUCTION_VALIDATION = PENDING
```

## F15 — fixed dock overlap under high zoom / short reflow viewport

Initial 200% browser-zoom validation exposed a real overlap: the fixed lead/WhatsApp dock covered required Form 46 controls.

A first remediation using `max-height:520px` hid the dock too early at 125% zoom and was rejected by local evidence.

The final PR #145 candidate narrows the guard to `max-height:400px`.

Local validation on the rebuilt integrated candidate proved:

- 125% zoom: floating dock remains visible;
- 200% zoom: floating dock is hidden;
- 200% zoom: Form 46 country, phone and submit controls remain fully visible and unobstructed.

```text
F15_LOCAL_CANDIDATE_VALIDATION = PASS
125_PERCENT_DOCK = VISIBLE
200_PERCENT_DOCK = HIDDEN
200_PERCENT_FORM46_OBSTRUCTION = NONE
PRODUCTION_VALIDATION = PENDING
```

## Contrast findings

F10/F11/F13 have static source-level contrast remediation in PR #135, but the supplied screenshots do not yet cover stage badges and the light footer closely enough for visual candidate evidence.

```text
F10_F11_F13_STATIC_VALIDATION = PASS_BY_SOURCE_CALCULATION
VISUAL_CANDIDATE_VALIDATION = PENDING
```

## Evidence boundary

This is local candidate evidence only. Production remains pre-PR #132 and all release validation is pending the Vercel recovery queue.
