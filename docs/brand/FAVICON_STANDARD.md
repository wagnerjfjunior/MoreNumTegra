# MoreNumTegra — Favicon Standard

Status: `CANONICAL` after production validation  
Date: `2026-09-23`

## Canonical favicon

All standalone MoreNumTegra HTML pages must declare exactly one favicon:

```html
<link rel="icon" href="/favicon.ico" sizes="any">
```

Canonical file:

```text
/favicon.ico
```

The file is a square ICO using one validated 48×48 embedded PNG frame of the approved Tegra favicon identity and is served from the canonical MoreNumTegra origin.

## Why the WebP favicon was superseded

The previous browser favicon used:

```text
https://s3-gdigital.s3.amazonaws.com/gdigital/313/Favicon_Tegra_500x500_nobg.webp
```

That asset worked in browsers, but Google Search favicon documentation does not list WebP among its supported Search favicon formats.

Therefore the Search-facing canonical favicon is now ICO.

The approved horizontal Tegra logo remains forbidden as `rel="icon"`.

## Scope

The rule applies to every standalone HTML document under:

- `src-greenn/**`;
- `experiments/**`.

HTML fragments without a `<head>` inherit the containing document favicon.

## CI enforcement

`scripts/validate-favicon-standard.mjs` verifies:

- root `favicon.ico` exists;
- ICO directory and embedded frame boundaries are valid;
- every embedded frame is a valid PNG frame;
- at least one square frame is 48×48 or larger;
- each standalone HTML page has exactly one favicon declaration;
- each standalone page points to `/favicon.ico`;
- former WebP favicon is not still used;
- horizontal Tegra logo is not misused as favicon.

Workflow:

`.github/workflows/favicon-standard.yml`

## Search-result expectation

This change fixes the site-side technical eligibility problem:

```text
/favicon.ico = PRESENT
supported Search favicon format = ICO
square validated 48x48 asset = YES
canonical page favicon declaration = /favicon.ico
```

Google Search controls recrawl and SERP refresh timing. Merge/deploy therefore does not guarantee immediate visual replacement in search results.

Do not claim the SERP favicon has updated until it is observed live.


## Corrupt multi-frame regression — 2026-09-23

A prior 6-frame ICO passed the directory-level validator but contained broken larger embedded frames. Chrome could select a broken frame and render a blank square.

The replacement deliberately uses one validated 48×48 frame. The CI validator now checks every embedded frame boundary and PNG signature so the same defect cannot silently pass again.
