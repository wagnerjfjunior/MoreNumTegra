# MNT-M5-01 — Shared Exact-Project Reflow Validation Evidence

Date: `2026-09-20`  
Candidate branch: `qa/m5-01-integrated-candidate-20260919`  
Candidate head observed: `bb53e0d0ee17ae1a5aa908173e5e5e40feb91456`

## Scope

Local browser zoom/reflow validation for exact-project pages that share `.mt-quick-actions` through `src-greenn/project-page.css`.

Affected routes:

- `/empreendimentos/caminhos-da-lapa-elo-duo/`
- `/empreendimentos/aria-higienopolis/`

## F17 — shared exact-project fixed dock overlap under high zoom

Initial 200% validation showed:

- Elo Duo: fixed dock obscured required footer/form content;
- Ária: fixed dock obscured lower Form 46 note/content.

PR #148 applies one shared CSS rule:

```css
@media(max-height:400px){
  body .mt-quick-actions{display:none}
}
```

Final local validation:

### Elo Duo

```text
150_PERCENT_DOCK = VISIBLE
200_PERCENT_DOCK = HIDDEN
200_PERCENT_FORM46_OBSTRUCTION = NONE
200_PERCENT_FOOTER_OBSTRUCTION = NONE
RESULT = PASS
```

### Ária

```text
150_PERCENT_DOCK = VISIBLE
200_PERCENT_DOCK = HIDDEN
200_PERCENT_FORM46_OBSTRUCTION = NONE
RESULT = PASS
```

## Repository validation

Integrated QA head containing the shared CSS change:

```text
Commercial page standard validation = SUCCESS
Favicon standard validation = SUCCESS
M4-05R metadata validation = SUCCESS
```

PR #148 itself is a one-file CSS PR and did not receive direct workflow runs.

## Boundary

```text
F17_LOCAL_CANDIDATE_VALIDATION = PASS
PRODUCTION_VALIDATION = PENDING
```

This evidence does not authorize merge while the pending PR #132 runtime remains provider-blocked.
