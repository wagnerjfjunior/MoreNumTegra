# MNT-M5-01 — Ária Gallery Keyboard Validation Evidence

Date: `2026-09-20`  
Environment: local Chrome device emulation  
Candidate context: integrated M5-01 QA candidate

## G01 — Ária gallery keyboard operation

Observed by Product Authority in local runtime:

- Tab traverses the gallery controls and continues through other clickable controls on the site;
- focus is not trapped inside the gallery;
- Space / Enter activate focused gallery controls and change the image;
- ArrowLeft / ArrowRight change the active gallery image;
- active thumbnail state is reflected by the existing `aria-current="true"` implementation.

```text
G01_LOCAL_CANDIDATE_VALIDATION = PASS
FOCUS_TRAP = NONE_OBSERVED
PRODUCTION_VALIDATION = PENDING
```

## Boundary

This is local keyboard-operation evidence. It does not by itself prove screen-reader announcement quality or full cross-browser keyboard behavior.
