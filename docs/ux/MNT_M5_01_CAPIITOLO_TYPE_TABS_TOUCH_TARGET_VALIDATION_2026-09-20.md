# MNT-M5-01 — CAPIITOLO Type Tabs Touch-target Validation

Date: `2026-09-20`  
Environment: local Chrome device emulation  
Route: `/empreendimentos/capiitolo-piero-lissoni/`  
Viewport: `393 x 852`

## Surface

CAPIITOLO typology tabs:

- `210 m² · Apartamento tipo`
- `281 m² · Giardino (Garden)`
- `363 m² · Duplex`

## Source-level contract

CAPIITOLO type tabs use:

```css
.tabs button {
  padding: 18px 0;
  font: 400 clamp(1.5rem,3vw,2.4rem) Georgia,serif;
}
```

The 36px vertical padding contribution plus the one-line text box keeps each target comfortably above the minimum touch-target baseline.

## Local visual observation

- each typology remains visually separated;
- active selection is visually distinguishable;
- changing between Giardino (Garden) and Duplex updates the associated plan/content without shifting the tab rail out of view;
- no page-level horizontal overflow was observed;
- the fixed `Receber condições` / WhatsApp dock does not obstruct the type tabs.

```text
CAPIITOLO_TYPE_TABS_TOUCH_TARGET = PASS
TAB_VERTICAL_PADDING = 18px + 18px
ACTIVE_STATE_VISIBLE = PASS
PAGE_LEVEL_HORIZONTAL_OVERFLOW = NONE_OBSERVED
FIXED_DOCK_TYPE_TAB_OBSTRUCTION = NONE_OBSERVED
PRODUCTION_PHYSICAL_DEVICE_VALIDATION = PENDING
```

## Boundary

Local Chrome + source-level evidence only. Physical-device and production confirmation remain pending.
