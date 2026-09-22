# MNT-M5-10 — Elo Duo Responsive Hero Slice 08

Date: `2026-09-22`

Status: `ACTIVE / PRODUCT_AUTHORITY_AUTHORIZED / RESPONSIVE_HERO_EXPERIMENT`

## Authorization

Product Authority explicitly selected the bounded Elo responsive-hero option after retained Slice 07.

Scope:

- Elo Duo exact-project hero only;
- preserve the existing Green/S3 hero as desktop/fallback;
- add small project-owned mobile derivatives only;
- preserve late GTM Slice 07, Consent Mode, GA4 and Form 46;
- measure in Production before retention.

## Start anchor

```text
CANONICAL_MAIN_AT_START = 8f15f15b4adca177f46c771f3a467ffbe2e34918
EFFECTIVE_RUNTIME_AT_START = 8d99996edddd66a59835992da161edbbb3579ad0
PRODUCTION_DEPLOYMENT_AT_START = dpl_6BP6WssMhisgJMdy91TbFSLyFVXX / READY
SLICE_07_LCP_MEDIAN = 3279 ms
TARGET_LCP = <=2500 ms
```

## Asset generation

Source:

```text
1080x1350
160,918 B
sha256 = b78a410c57a4f7c6dc27b15d2a5f8fec0b252ae4ebe80233f8736218f867809e
```

The current CSS already displays the mobile hero inside a `1.15/1` box with `object-fit:cover` and centered positioning.

The derivative crop therefore reproduces the already-visible center crop:

```text
derived crop = 1080x939 / ratio 1.15016
```

Generated WebP quality 82 / method 6:

```text
640x557 = 52,278 B
828x720 = 72,376 B
```

Both are below the M5-03 preferred mobile budget of 100 KiB.

## Candidate markup

Mobile below 720px receives a responsive `picture/source` family with 640w and 828w candidates and `sizes="calc(100vw - 32px)"`.

Desktop and fallback remain the existing immutable Green/S3 hero.

No preload is added. `fetchpriority=high` and direct initial-HTML discovery are preserved.

## Acceptance gate

Retain only if:

1. mobile loads a derivative, not the 160.9KB original;
2. desktop continues using the existing original;
3. hero box/framing remains unchanged;
4. existing regression gates pass;
5. Production five-run median is materially non-regressive versus retained Slice 07;
6. CLS remains <=0.1;
7. Measurement/Consent/Form46 remain unchanged.

No M5-10 task hours are accepted automatically.
