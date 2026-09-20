# MNT-M5-01 — Shared Exact-project Form 46 Touch-target Validation

Date: `2026-09-20`  
Environment: local Chrome device emulation  
Routes:

- `/empreendimentos/caminhos-da-lapa-elo-duo/`
- `/empreendimentos/aria-higienopolis/`

Viewport: `393 x 852`

## Source-level contract

Shared Form 46 styles apply:

```css
.mt-field input,
.mt-field select {
  min-height: 50px;
}

.mt-lead-submit {
  min-height: 52px;
}

.mt-form-grid {
  gap: 14px;
}
```

## Local visual observation

On both Elo Duo and Ária:

- intent select, Name, E-mail, Country and Phone controls remain individually separated;
- submit control remains comfortably touchable;
- no adjacent form controls overlap;
- fixed `Receber condições` / WhatsApp actions do not cover required Form 46 controls or the submit button in the observed viewport.

```text
ELO_DUO_FORM46_TOUCH_TARGET = PASS
ARIA_FORM46_TOUCH_TARGET = PASS
FIELD_MIN_HEIGHT = 50px
SUBMIT_MIN_HEIGHT = 52px
FORM_VERTICAL_GAP = 14px
FIXED_DOCK_FORM_OBSTRUCTION = NONE_OBSERVED
PRODUCTION_PHYSICAL_DEVICE_VALIDATION = PENDING
```

## Boundary

Local Chrome + source-level shared-style evidence only. Physical-device and production confirmation remain pending.
