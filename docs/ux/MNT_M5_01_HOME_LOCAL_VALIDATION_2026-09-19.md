# MNT-M5-01 — Home Local Candidate Validation Evidence

Date: `2026-09-19`  
Candidate branch: `qa/m5-01-integrated-candidate-20260919`  
Candidate head observed: `2477f7ccfd584b40ad5c77c7ee96516e45781f40`

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

The supplied screenshots do not show the skip link in its focused state.

```text
F02_LOCAL_CANDIDATE_VALIDATION = NOT_YET_OBSERVED
```

Required follow-up:

1. reload Home at the top;
2. press Tab once;
3. confirm `Ir para o conteúdo` becomes visibly focused;
4. press Enter;
5. confirm focus moves to `#conteudo`.

## Contrast findings

F10/F11/F13 have static source-level contrast remediation in PR #135, but the supplied screenshots do not yet cover stage badges and the light footer closely enough for visual candidate evidence.

```text
F10_F11_F13_STATIC_VALIDATION = PASS_BY_SOURCE_CALCULATION
VISUAL_CANDIDATE_VALIDATION = PENDING
```

## Evidence boundary

This is local candidate evidence only. Production remains pre-PR #132 and all release validation is pending the Vercel recovery queue.
