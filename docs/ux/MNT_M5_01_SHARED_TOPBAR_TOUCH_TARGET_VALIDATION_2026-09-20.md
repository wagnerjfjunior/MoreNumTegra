# MNT-M5-01 — Shared Exact-project Topbar Touch-target Validation

Date: `2026-09-20`  
Environment: local Chrome device emulation  
Viewport: `393 x 852`  
QA candidate: `445d9feafdc934369706bc837d194bfbd4102bd6`  
Runtime remediation PR: `#148` / head `508ebf55f4ea96261d8eeb4dc753158d7c0ec950`

## Finding

The shared exact-project topbar link `Todos os empreendimentos` originally had no explicit minimum interaction height. The shared CSS defined 13px typography but no vertical padding/min-height, leaving the hitbox below the governed 46px interaction baseline.

## Remediation

```css
.mt-back {
  display: inline-flex;
  align-items: center;
  min-height: 46px;
  padding-inline: 4px;
  font-size: 13px;
  font-weight: 750;
  color: #fff;
  text-decoration: none;
}
```

## Local measured validation

Chrome `getBoundingClientRect()` on `.mt-back`:

```text
ELO_DUO = 176.234375 x 46px
ARIA     = 176.234375 x 46px
```

Observed result:

- visual text treatment remains compact;
- clickable/touchable height is exactly 46px on both routes;
- no new topbar overflow was observed in the exercised viewport.

```text
M5_01_F18_SHARED_TOPBAR_TOUCH_TARGET = LOCAL_CANDIDATE_PASS
ELO_DUO_TOPBAR_BACK_TOUCH_TARGET = PASS
ARIA_TOPBAR_BACK_TOUCH_TARGET = PASS
PRODUCTION_PHYSICAL_DEVICE_VALIDATION = PENDING
```

## Boundary

This is local Chrome + source/runtime-candidate evidence. PR #148 remains unmerged while the governed runtime release queue is blocked; production validation remains pending.
