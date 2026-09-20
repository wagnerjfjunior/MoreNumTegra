# MNT-M5-01 — CAPIITOLO Floating Actions Touch-target Validation

Date: `2026-09-20`  
Environment: local Chrome device emulation  
Route: `/empreendimentos/capiitolo-piero-lissoni/`  
Viewport: `393 x 852`

## Source-level contract

Mobile floating actions use:

```css
.mnt-whatsapp-float {
  width: 54px;
  height: 54px;
}

.mnt-contact-float {
  min-height: 54px;
}
```

## Local visual observation

- no page-level horizontal overflow observed;
- fixed dock remains visually separated from page content;
- no underlying interactive/content control was observed blocked by the dock in the exercised state;
- both floating controls remain visible and independently operable.

```text
CAPIITOLO_FLOATING_ACTION_TOUCH_TARGET = PASS
WHATSAPP_TARGET = 54x54px
CONTACT_TARGET_MIN_HEIGHT = 54px
PAGE_LEVEL_HORIZONTAL_OVERFLOW = NONE_OBSERVED
FIXED_DOCK_OBSTRUCTION = NONE_OBSERVED
PRODUCTION_PHYSICAL_DEVICE_VALIDATION = PENDING
```

## Boundary

Local Chrome + source-level evidence only. Physical-device and production confirmation remain pending.
