# MNT-M5-01 — Source Semantics Revalidation

Date: `2026-09-20`  
Canonical repository: `wagnerjfjunior/MoreNumTegra`  
Canonical main observed: `50cc466e778feb2de38a5241b4b2820c6b1ea016`

## Scope

Source-level accessibility revalidation for:

- Home;
- Elo Duo;
- Ária Higienópolis;
- CAPIITOLO candidate PR #137 head `d8ad43e1c4cd16933576785fab2ecf01d70195e7`;
- shared Form 46 runtime;
- Home reduced-motion video behavior.

This review does not substitute screen-reader/device runtime evidence.

## Positive source controls

Static inspection confirms:

- one `h1`, one `main`, one `header` and one `footer` on each representative route;
- no duplicate element IDs detected on the inspected route sources;
- Form 46 identity/contact controls on Home, Elo Duo, Ária and CAPIITOLO have explicit label associations;
- Form 46 error/status regions use `role="alert"` / `role="status"` with live regions;
- shared validation marks the first invalid control with `aria-invalid="true"` and moves focus to that control;
- Ária gallery uses native buttons and maintains `aria-current`;
- CAPIITOLO PR #137 includes the expected tab model: `role="tablist"`, `role="tab"`, roving `tabindex`, `aria-selected`, `aria-controls`, `role="tabpanel"`, synchronized `aria-labelledby`, and ArrowLeft/ArrowRight/Home/End handling.

## F03 regression — Home stage-filter accessible state

The current Home status buttons have visual active state but no assistive-technology selected state:

- HTML buttons under `[data-filter-status]` do not expose `aria-pressed`;
- `setStatus()` toggles only `.is-active` and does not update `aria-pressed`.

Therefore the previous F03 closure statement is not supported by current source and F03 is reopened.

```text
M5_01_F03 = REGRESSION_REOPENED
SEVERITY = P2 / FILTER_STATE_ACCESSIBILITY
SOURCE = src-greenn/preview/index.html + src-greenn/moretegra.js
RUNTIME_CANDIDATE = NONE_YET
```

## F19 — Home reduced-motion video leaves stale button semantics after activation

When `prefers-reduced-motion: reduce` is active, Home converts the video frame into a keyboard-operable synthetic button:

```js
frame.setAttribute("role", "button");
frame.setAttribute("tabindex", "0");
```

Activation calls `mount(true)`, which replaces the button contents with the YouTube iframe, but current source does not remove the synthetic `role="button"` / `tabindex="0"`.

The resulting container remains a focusable button after its one-time activation handlers are consumed and contains a focusable iframe. This creates stale control semantics / nested interactive behavior for reduced-motion keyboard and assistive-technology users.

```text
M5_01_F19 = OPEN
SEVERITY = P2 / KEYBOARD + ARIA SEMANTICS
SOURCE = src-greenn/moretegra.js
RUNTIME_CANDIDATE = NONE_YET
```

## Production/deployment reconciliation

Live Vercel inspection on 2026-09-20 confirms:

```text
CURRENT_PRODUCTION_DEPLOYMENT = dpl_H6KtyTDQHHAaWxx4FXHSUJBk97HK
CURRENT_PRODUCTION_SOURCE_SHA = 82fd666596b283d1ff5645776ba892abe27885a6
CURRENT_PRODUCTION_STATE = READY
CANONICAL_ALIAS = www.moretegra.com.br
```

Direct authenticated fetches of Home, CAPIITOLO, Elo Duo and Ária return HTTP 200 and still expose pre-PR #132 title/content markers.

The historical Git status for runtime SHA `353f4a5dba058f2fb60fd4001128f8c857cd6fce` remains `failure / build-rate-limit`, but a new MoreNumTegra build was not created during the controlled retry. Therefore:

```text
HISTORICAL_RATE_LIMIT = PROVEN
CURRENT_MORENUMTEGRA_RATE_LIMIT = NOT_REPROVEN
APPROVED_PENDING_RUNTIME_SHA = 353f4a5dba058f2fb60fd4001128f8c857cd6fce
```

No Preview, runtime mutation, artificial commit or production change was made by this revalidation.
