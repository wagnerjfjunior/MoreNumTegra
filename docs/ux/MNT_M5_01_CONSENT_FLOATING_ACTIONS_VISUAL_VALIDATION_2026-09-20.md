# MNT-M5-01 — Consent / Floating Actions Local Visual Evidence

Date: `2026-09-20`  
Environment: local Chrome device emulation  
Route exercised: `/empreendimentos/aria-higienopolis/`  
Viewport: `393 x 852`

## C01 — initial consent visible

Because localhost intentionally suppresses the consent runtime, the banner was manually unhidden and the governed `--mt-consent-offset` was recomputed from the banner height to reproduce the production visual geometry.

Observed:

- consent panel is readable;
- `Receber condições` + WhatsApp remain visible;
- floating actions are offset above the consent panel;
- no overlap between consent panel and floating actions was observed.

```text
C01_LOCAL_VISUAL_SIMULATION = PASS
CONSENT_PANEL_READABLE = PASS
FLOATING_ACTION_OFFSET = PASS
SURFACE_OVERLAP = NONE_OBSERVED
```

## Boundary

This is a local visual-geometry simulation only. The localhost runtime intentionally returns before registering Accept/Reject handlers.

```text
C02_ACCEPT_REJECT = NOT_OBSERVED_LOCAL / PRODUCTION_REQUIRED
PRODUCTION_VALIDATION = PENDING
```
