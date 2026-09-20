# MNT-M5-01 — Home Touch-target / Filter Spacing Validation

Date: `2026-09-20`  
Environment: local Chrome device emulation  
Route: `/`  
Viewport: `393 x 852`

## Scope

Home catalog filter surface:

- zone quick buttons;
- stage select;
- project search;
- value select.

## Source-level contract

Current Home CSS applies:

```css
button, a, input, select {
  min-height: 46px;
}
```

The filter quick-action container uses an 8px gap between adjacent buttons.

## Local visual observation

At `393 x 852`:

- zone buttons remain individually distinguishable;
- no adjacent touch controls overlap;
- select/search controls remain full-width and visually separated;
- fixed conversion actions do not cover the filter controls.

```text
HOME_FILTER_TOUCH_TARGET_BASELINE = PASS
HOME_FILTER_ADJACENT_SPACING = PASS
MIN_HEIGHT_CONTRACT = 46px
PRODUCTION_VALIDATION = PENDING
```

## Boundary

This closes the local/source-level Home filter-surface check only. It does not certify every touch target on every route or physical-device behavior.
