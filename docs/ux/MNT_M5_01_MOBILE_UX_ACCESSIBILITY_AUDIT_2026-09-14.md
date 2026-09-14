# MNT-M5-01 — Mobile UX and Accessibility Audit

Status: `IN_PROGRESS / AUTHORIZED`  
Date: `2026-09-14`  
Canonical production target: `https://www.moretegra.com.br/`  
Planning effort: `16h`  
Source task: `MNT-M5-01 — Mobile UX and accessibility audit`

## 1. Objective

Audit the current MoreNumTegra commercial runtime for mobile usability and accessibility before any performance/conversion remediation is authorized.

This task is **audit-only**. A finding does not authorize a runtime fix.

## 2. Evidence boundary

Primary evidence sources:
- canonical `main` HTML/CSS/JS;
- current Vercel `www` production behavior where observable;
- Product Authority visual QA supplied during the current session;
- existing functional/technical baselines.

Classification:
- `OBSERVED` = directly supported by source/runtime/user QA;
- `INFERRED` = plausible consequence requiring runtime/device verification;
- `PROPOSED_REMEDIATION` = recommendation only, separately gated.

## 3. Audit matrix

Mobile acceptance areas:
1. navigation and discoverability;
2. touch targets and fixed/floating controls;
3. consent interaction and viewport obstruction;
4. catalog filters/search/selectors;
5. keyboard/focus semantics;
6. accessible names/labels/states;
7. content hierarchy and landmarks;
8. form validation/status feedback;
9. media/video accessibility;
10. responsive layout/overflow/zoom;
11. reduced-motion behavior;
12. regression risk across mobile and desktop.

## 4. Initial evidence already established

### M5-01-F01 — Floating CTA / consent collision

- Classification: `OBSERVED`
- Severity: `HIGH UX` before mitigation
- Surface: mobile and desktop fixed controls
- Evidence: Product Authority reported that `WhatsApp` and `Receber condições` overlapped the consent modal on `www`; the isolated PR #84 Preview demonstrated a consent-aware offset behavior that removes the overlap.
- Current production disposition: **not yet treated as remediated**, because PR #84 remains unmerged.
- Boundary: PR #84 is a separate UX remediation candidate and is not merged by M5-01 authorization alone.

### M5-01-F02 — Floating CTA visual height

- Classification: `OBSERVED`
- Severity: `MEDIUM UX`
- Evidence: Product Authority validated the collision fix but reported that the fixed badges remain visually too tall and consume reading area. A later PR #84 CSS adjustment targets vertical height, but the latest commit could not receive a fresh Preview because the Vercel Hobby daily deployment limit was reached.
- Current disposition: open; requires fresh Preview/device validation before acceptance.

### M5-01-F03 — Mobile primary navigation hidden below desktop breakpoint

- Classification: `OBSERVED_CODE / REQUIRES_UX_ADJUDICATION`
- Severity: `MEDIUM`
- Evidence: canonical CSS hides `.mt-header nav` by default and only exposes it at `min-width:760px`.
- Risk: mobile users do not receive the header navigation links available on desktop; section discovery depends on page flow/CTAs.
- Disposition: verify whether this is intentional mobile simplification or a discoverability regression before proposing remediation.

### M5-01-F04 — Catalog stage button state semantics

- Classification: `OBSERVED_CODE / REQUIRES_RUNTIME_VERIFICATION`
- Severity: `MEDIUM ACCESSIBILITY`
- Evidence: zone quick-filter buttons expose `aria-pressed`, while stage filter buttons use `.is-active` visually and do not expose an equivalent pressed state in source HTML.
- Risk: assistive technology may not receive the current selected stage state.
- Disposition: verify runtime JS does not add/update an accessible state dynamically.

## 5. Existing positive controls observed in source

- semantic `<main>`, `<header>`, `<nav>`, sections and heading associations are present;
- principal navigation has an accessible label;
- brand image has alt text;
- catalog search/select controls have labels, including screen-reader-only text;
- result count uses `aria-live="polite"`;
- empty state is explicit;
- global `:focus-visible` treatment exists;
- reduced-motion CSS is present;
- Form 46 exposes explicit labels, required state, validation messaging and live regions;
- no primary function is intentionally hover-only in the baseline contract.

These positive controls are not a blanket accessibility PASS; runtime/device verification remains required.

## 6. Remaining audit work

Before M5-01 can become `COMPLETE_CANDIDATE`, verify and record:
- mobile navigation reachability and section discovery;
- touch-target dimensions for all fixed CTAs and filter controls;
- focus order and keyboard operation;
- dynamic `aria-pressed`/selected-state behavior;
- modal/consent focus behavior and obstruction across viewport sizes;
- form error focus and announcement behavior;
- video iframe title/control/autoplay behavior;
- horizontal overflow at representative mobile widths;
- zoom/text-resize behavior;
- color/contrast issues requiring measurement;
- final P0/P1/P2/P3 finding table.

## 7. Gate

M5-01 may inspect and document. It does **not** by itself authorize:
- merging PR #84;
- changing production runtime;
- starting M5-02;
- changing Measurement, Form 46, DNS, Search or external platforms.
