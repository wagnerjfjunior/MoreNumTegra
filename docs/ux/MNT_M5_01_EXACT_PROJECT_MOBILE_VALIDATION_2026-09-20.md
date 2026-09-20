# MNT-M5-01 — Exact-project Mobile Width Validation Evidence

Date: `2026-09-20`  
Integrated QA candidate: `bb53e0d0ee17ae1a5aa908173e5e5e40feb91456`

## Scope

Local Chrome device-emulation validation for exact-project routes at representative portrait widths.

Routes:

- `/empreendimentos/caminhos-da-lapa-elo-duo/`
- `/empreendimentos/aria-higienopolis/`

Tested viewport sizes:

```text
360 x 800
393 x 852
```

## Elo Duo

Observed:

- H1 remains inside the viewport;
- descriptive copy reflows without lateral clipping;
- fact cards remain within the viewport;
- fixed `Receber condições` + WhatsApp controls remain visible and inside the viewport;
- no abnormal page-level horizontal scroll was observed.

```text
ELO_DUO_360x800 = PASS
ELO_DUO_393x852 = PASS
```

## Ária

Observed:

- H1 remains inside the viewport;
- descriptive copy reflows without lateral clipping;
- fact cards remain within the viewport;
- fixed `Receber condições` + WhatsApp controls remain visible and inside the viewport;
- no abnormal page-level horizontal scroll was observed.

```text
ARIA_360x800 = PASS
ARIA_393x852 = PASS
```

## Boundary

This is local Chrome emulation evidence, not cross-browser/device certification and not production validation.

```text
EXACT_PROJECT_MOBILE_HORIZONTAL_REFLOW_LOCAL = PASS
PRODUCTION_VALIDATION = PENDING
```
