# MNT-M5-01 — CAPIITOLO Gallery Touch-target Validation

Date: `2026-09-20`  
Environment: local Chrome device emulation  
Route: `/empreendimentos/capiitolo-piero-lissoni/`  
Viewport: `393 x 852`

## Source-level contract

Gallery scene buttons use:

```css
.scene-nav {
  display: flex;
  gap: 5px;
  overflow: auto;
}

.scene-nav button {
  padding: 13px 16px;
}
```

They inherit the page typography `16px/1.55`, yielding an approximate button target height of `24.8px + 26px = 50.8px` before border contribution.

## Local visual observation

- gallery navigation remains in its own horizontal scroll surface;
- no page-level horizontal overflow was observed;
- adjacent scene controls remain visually distinct;
- the fixed lead/WhatsApp dock does not cover the gallery navigation;
- active scene state remains visibly differentiated.

```text
CAPIITOLO_GALLERY_TOUCH_TARGET = PASS
APPROX_TARGET_HEIGHT = 50.8px
SCENE_NAV_GAP = 5px
PAGE_LEVEL_HORIZONTAL_OVERFLOW = NONE_OBSERVED
FIXED_DOCK_GALLERY_OBSTRUCTION = NONE_OBSERVED
PRODUCTION_PHYSICAL_DEVICE_VALIDATION = PENDING
```

## Boundary

Local Chrome + source-level evidence only. Physical-device and production confirmation remain pending.
