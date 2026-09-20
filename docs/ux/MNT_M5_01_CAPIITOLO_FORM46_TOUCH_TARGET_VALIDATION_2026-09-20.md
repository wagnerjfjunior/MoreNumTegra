# MNT-M5-01 — CAPIITOLO Form 46 Touch-target Validation

Date: `2026-09-20`  
Environment: local Chrome device emulation  
Route: `/empreendimentos/capiitolo-piero-lissoni/`  
Viewport: `440 x 956`

## Source-level contract

CAPIITOLO uses its editorial form styles:

```css
.field input,
.field textarea {
  padding: 12px 2px;
}

.field select {
  min-height: 54px;
}

.submit {
  padding: 16px 20px;
}
```

With the inherited 16px form font/line box, the text inputs and submit control remain comfortably above the minimum touch-target baseline; the country select has an explicit 54px minimum height.

## Local visual observation

At `440 x 956`:

- Country and Phone controls remain individually distinguishable;
- submit control remains comfortably touchable;
- no adjacent Form 46 controls overlap;
- fixed `Receber condições` / WhatsApp actions remain below the form controls and do not cover the observed Country, Phone or submit controls.

```text
CAPIITOLO_FORM46_TOUCH_TARGET = PASS
COUNTRY_SELECT_MIN_HEIGHT = 54px
INPUT_VERTICAL_PADDING = 12px
SUBMIT_VERTICAL_PADDING = 16px
FIXED_DOCK_FORM_OBSTRUCTION = NONE_OBSERVED
PRODUCTION_PHYSICAL_DEVICE_VALIDATION = PENDING
```

## Boundary

Local Chrome + source-level evidence only. Physical-device and production confirmation remain pending.
