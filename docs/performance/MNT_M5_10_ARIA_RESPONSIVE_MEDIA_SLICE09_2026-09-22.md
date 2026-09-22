# MNT-M5-10 — Ária Responsive Media Slice 09

Date: `2026-09-22`

Status: `ACTIVE / PRODUCT_AUTHORITY_AUTHORIZED / CROSS-PROJECT_PATTERN_VALIDATION`

## Purpose

Validate whether the responsive-image pattern retained on Elo Duo produces a material, repeatable benefit on a second exact-project page before treating it as the canonical remediation pattern.

Scope:

- Ária hero;
- first gallery main image;
- first gallery thumbnail;
- no GTM/GA4/Consent/Form46 change;
- no SEO/canonical/commercial-data change;
- original Azure assets preserved as desktop/fallback.

## Start anchor

```text
CANONICAL_MAIN_AT_START = aba2672a7bbbcd28528d237eb206c064b77c8e6c
EFFECTIVE_PRODUCTION_RUNTIME = 90745255775129638b3d8f061ab067d8ecc1c425
PRODUCTION_DEPLOYMENT = dpl_6Dw473nRdfcCgAiEBQGAk5Uer6QL / READY
```

## Current Ária Production baseline

Run `35741908269`:

```text
hero source = 714x640 JPEG / 221,132 B
gallery1 source = 1920x873 JPEG / 314,816 B

five-run medians:
score = 74
FCP = 906 ms
LCP = 5,621 ms
CLS = 0.0285
TBT = 257 ms
transfer = 886,131 B
hero Lighthouse transfer = 221,539 B
gallery1 requested in all runs = YES
```

## Derivatives

Hero center crop reproduces the existing mobile `1.15/1` + `object-fit:cover` framing.

```text
source = 714x640
crop = 714x621

640x557 WebP = 70,822 B
714x621 WebP = 82,846 B
```

No hero derivative exceeds native source width.

First gallery mobile crop reproduces the existing mobile `4/3` + centered `object-fit:cover` framing.

```text
source = 1920x873
crop = 1164x873

640x480 WebP = 66,072 B
828x621 WebP = 102,838 B
thumbnail 240x180 WebP = 10,474 B
```

The generated 1080w candidate was `151,796 B`, above the M5-03 preferred gallery budget, and is intentionally excluded from the runtime candidate.

## Candidate contract

Mobile <720px:

- hero selects 640/714 responsive WebP;
- first gallery main selects 640/828 responsive WebP;
- first gallery thumbnail uses 240x180 WebP.

Desktop/fallback:

- original Azure hero remains;
- original Azure first gallery main remains.

Gallery navigation:

- returning to image 1 restores its responsive source on mobile;
- moving to other gallery scenes removes the first-image srcset and uses each governed original URL;
- existing captions, arrows, keyboard behavior and `aria-current` semantics remain.

## Retention rule

Retain only if:

1. exact-head regression gates pass;
2. mobile avoids original hero and original first-gallery payload;
3. desktop continues original governed media;
4. gallery navigation remains functional/accessibility-safe;
5. five-run Production median materially improves over `5,621 ms`;
6. CLS remains <=0.1;
7. no Form46/Measurement regression.

If the second project reproduces a material improvement, the pattern may be proposed as the canonical exact-project responsive-media remediation standard. That architectural adoption does not authorize automatic mutation of every project page.
