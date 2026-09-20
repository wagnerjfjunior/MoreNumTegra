# MNT-M5-01 — Runtime / Device Verification Matrix

Status: `READY_FOR_EXECUTION`  
Date: `2026-09-19`  
Task: `MNT-M5-01 — Mobile UX and accessibility audit`

## 1. Purpose

Turn the remaining `NOT_OBSERVED` accessibility residuals into deterministic PASS/FAIL checks that can be executed on localhost and repeated in production after each queued runtime release.

This matrix does not authorize runtime mutation.

## 2. Surfaces

Canonical production routes:

- `/`
- `/empreendimentos/capiitolo-piero-lissoni/`
- `/empreendimentos/caminhos-da-lapa-elo-duo/`
- `/empreendimentos/aria-higienopolis/`

Local equivalents are served from the repository root by the current static server workflow.

## 3. Representative viewports

Minimum test widths:

```text
320 x 568
360 x 800
390 x 844
430 x 932
768 x 1024
1440 x 900
```

PASS criteria:
- no page-level horizontal scrollbar;
- no clipped primary CTA/form control;
- fixed consent/actions do not cover required interaction targets;
- navigation remains usable at each relevant breakpoint.

## 4. Keyboard / focus

### K01 — skip link

Applies after PR #133.

Procedure:
1. load Home from the top;
2. press Tab once;
3. activate `Ir para o conteúdo`.

PASS:
- skip link is visibly focused;
- activation moves the browser focus target to `#conteudo`;
- next Tab continues inside the main journey rather than restarting at the header.

### K02 — visible focus

For each route, Tab through:
- header/back links;
- primary CTAs;
- filters/selects;
- gallery controls;
- Form 46;
- consent buttons;
- floating actions.

PASS:
- every keyboard-operable control has a visible focus indicator;
- focus is not visually hidden behind fixed overlays.

Home local candidate status: `PASS / 2026-09-20`.
Product Authority traversed the Home from header navigation through CTAs/filters and onward to footer contact links, with visible focus retained.

Elo Duo local candidate status: `PASS / 2026-09-20`.
Product Authority traversed Elo Duo from the page header through Form 46 and onward to footer/WhatsApp controls, with visible focus retained.

Ária local candidate status: `PASS / 2026-09-20`.
Product Authority traversed Ária from the page header through Form 46 and onward to footer/WhatsApp controls, with visible focus retained.

CAPIITOLO local candidate status: `PASS / 2026-09-20`.
Product Authority traversed the refreshed CAPIITOLO candidate through Form 46 and onward to footer/WhatsApp controls, with visible focus retained.

### K03 — logical focus order

PASS:
- order broadly follows visual/document order;
- no unexpected focus jump into hidden content;
- hidden map/video iframes with `tabindex="-1"` are not keyboard stops;
- honeypot remains outside the user focus sequence.

Home local candidate status: `PASS / 2026-09-20`.
Observed sequence progressed from the header navigation through primary Home actions and continued to the footer/Tegra Vendas contact link with no unexpected jump or focus trap.

Elo Duo local candidate status: `PASS / 2026-09-20`.
Observed sequence progressed through Form 46 and continued to footer/WhatsApp controls with no unexpected jump or focus trap.

Ária local candidate status: `PASS / 2026-09-20`.
Observed sequence progressed through Form 46 and continued to footer/WhatsApp controls with no unexpected jump or focus trap.

CAPIITOLO local candidate status: `PASS / 2026-09-20`.
Observed sequence progressed through Form 46 and continued to footer/WhatsApp controls with no unexpected jump or focus trap.

## 5. CAPIITOLO tabs

Applies after PR #137.

Test both:
- scene gallery;
- typology selector.

### T01 — roving tab stop

PASS:
- exactly one tab in each tablist has `tabindex="0"`;
- inactive tabs have `tabindex="-1"`.

### T02 — keyboard navigation

PASS:
- ArrowRight selects/focuses next tab;
- ArrowLeft selects/focuses previous tab;
- Home goes to first;
- End goes to last;
- navigation wraps where implemented.

### T03 — ARIA relationship

PASS:
- active tab has `aria-selected="true"`;
- tab `aria-controls` points to the correct `role="tabpanel"`;
- panel `aria-labelledby` points to the active tab;
- visible panel content corresponds to selected tab.

## 6. Ária gallery

### G01 — keyboard operation

Local candidate status: `PASS / 2026-09-20`.

Observed locally:
- previous/next and focused gallery controls work with Enter/Space;
- Left/Right arrows change the image;
- active thumbnail state is maintained through the existing `aria-current="true"` implementation;
- Tab traverses the gallery controls and continues outside the gallery;
- no focus trap observed.

Production and screen-reader validation remain pending.

## 7. Zoom / text resize

### Z01 — 200% browser zoom

Run Home + three exact-project pages at 200%.

PASS:
- content is readable without loss of information;
- no text overlaps;
- Form 46 fields/buttons remain usable;
- fixed actions do not obscure form submission or consent;
- no horizontal scrolling is required for ordinary reading at a desktop viewport unless a component intentionally scrolls horizontally.

## 8. Touch-target / spacing

Inspect primary controls at mobile widths.

PASS baseline:
- Home major links/buttons/inputs/selects remain at least the governed 46px interaction baseline where that shared rule applies;
- project primary CTA/form/consent/floating controls remain comfortably touchable;
- adjacent controls are not so close that activation is ambiguous.

Any control that relies on a WCAG spacing exception rather than target size must be recorded explicitly, not silently passed.

Home filter-surface local/source-level status: `PASS / 2026-09-20`.
- zone quick buttons, stage select, search and value select inherit the governed `min-height:46px` interaction baseline;
- zone quick buttons retain an 8px gap;
- at 393x852 no overlap or ambiguous adjacent activation area was observed;
- production/physical-device confirmation remains pending.

## 9. Consent versus fixed actions

### C01 — initial consent visible

Local visual simulation status: `PASS / 2026-09-20`.

Observed on Ária at 393x852 by manually exposing the banner and recomputing the governed consent offset:
- consent panel remains readable;
- floating lead/WhatsApp controls are offset above it;
- neither surface blocks the other.

This is visual-geometry evidence only because localhost intentionally disables consent runtime behavior.

### C02 — accept / reject

PASS:
- after either choice, the consent panel leaves the viewport;
- floating actions return to their normal bottom position;
- keyboard focus is not lost into an inaccessible state.

Current status: `NOT_OBSERVED_LOCAL / PRODUCTION_REQUIRED`, because localhost intentionally returns before registering Accept/Reject handlers.

## 10. Form 46

Do not send a real lead unless separately authorized.

PASS without submission:
- labels correspond to controls;
- required fields are understandable;
- country/phone controls remain visible at mobile widths;
- invalid submission attempt focuses the first invalid field;
- error/status messages are exposed visibly and through their ARIA live regions;
- submit button state is readable.

Local candidate evidence on Ária:
- empty required identity/contact fields -> visible `Informe seu nome.` and focus on `#mt-lead-name`;
- Name filled / e-mail empty -> visible `Informe um e-mail válido.` and focus on `#mt-lead-email`;
- valid Name/E-mail + invalid BR phone `11` -> visible `Informe um telefone brasileiro válido com DDD.` and focus on `#mt-lead-phone`;
- all locally valid fields -> visible localhost guard status: `Formulário validado. O envio real fica habilitado somente em www.moretegra.com.br após merge em main.`;
- no Form 46 POST observed during invalid or valid-data localhost checks.

```text
FORM46_LOCAL_INVALID_VALIDATION = PASS
FORM46_LOCAL_VALID_DATA_GUARD = PASS
LOCAL_REAL_POST = NOT_SENT
```

Production validation remains pending.

Production E2E lead receipt remains a separate already-proven contract and should not be replayed casually.

## 11. Horizontal overflow triage

At every mobile width:

```text
document.documentElement.scrollWidth <= document.documentElement.clientWidth
```

If false:
- identify the exact element exceeding the viewport;
- do not hide the problem with global `overflow-x:hidden` unless the overflowing element is independently proven decorative/non-interactive.

Intentional horizontal component scrolling, such as the proposed mobile Home navigation, is allowed only inside that component and must not create page-level overflow.

## 12. Screen-reader pass

Representative minimum:
- Windows: NVDA + Chrome or Firefox; or
- macOS/iOS: VoiceOver + Safari.

PASS:
- headings/landmarks identify the page structure;
- buttons and links have useful accessible names;
- Form 46 labels and validation messages are announced;
- selected state is understandable for tabs/filters;
- decorative images/icons do not produce noise;
- no critical visible text is inaccessible to the accessibility tree.

## 13. Recording format

Each row must be recorded as:

```text
TEST_ID =
ROUTE =
ENVIRONMENT = LOCAL | PRODUCTION
RUNTIME_SHA =
BROWSER / DEVICE =
RESULT = PASS | FAIL | NOT_OBSERVED
EVIDENCE =
FINDING_ID = NONE | Fxx
```

A PASS without route/environment/runtime identity is not acceptance evidence.

## 14. Release mapping

Execute in this order when Vercel recovers:

1. PR #132 runtime `353f4a5d...` — baseline smoke;
2. PR #133 — K01/K02/mobile navigation/overflow;
3. PR #135 — contrast + visual hierarchy;
4. PR #137 — T01/T02/T03;
5. full representative matrix;
6. M5-01 acceptance decision.

## 15. Exit rule

M5-01 may become `COMPLETE_CANDIDATE` only when:

- queued source-level findings are either resolved with matching runtime evidence or explicitly retained as accepted residuals by authority;
- the representative matrix has no unresolved P0/P1;
- remaining P2/P3 and `NOT_OBSERVED` items are explicitly adjudicated;
- no WBS progress is inferred solely from preparing this matrix.
