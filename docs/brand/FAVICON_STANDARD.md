# MoreNumTegra — Favicon Standard

Status: `CANONICAL` when merged to `main`  
Date: `2026-09-19`

## Canonical brand asset

All standalone MoreNumTegra HTML pages must declare exactly one favicon and use:

```text
https://s3-gdigital.s3.amazonaws.com/gdigital/313/Favicon_Tegra_500x500_nobg.webp
```

Required markup:

```html
<link rel="icon" type="image/webp" href="https://s3-gdigital.s3.amazonaws.com/gdigital/313/Favicon_Tegra_500x500_nobg.webp">
```

The previous horizontal Tegra logo asset is not a favicon and must not be used in `rel="icon"`:

```text
https://s3-gdigital.s3.amazonaws.com/gdigital/313/Logo_Tegra_Amarelo%20666X375%20SemFundo.webp
```

## Scope

The rule applies to:

- portfolio/home page;
- every exact-project page;
- thank-you/standalone utility pages with their own `<head>`;
- standalone experiment/source pages used to generate public pages;
- every future standalone HTML page added to `src-greenn` or `experiments`.

HTML fragments without a `<head>` do not declare favicon tags themselves; the containing document owns the favicon.

## CI enforcement

`scripts/validate-favicon-standard.mjs` scans standalone HTML under:

- `src-greenn/**`;
- `experiments/**`.

Any future standalone HTML page that lacks the canonical favicon, has multiple favicon declarations, or reuses the horizontal logo as favicon must fail CI.

Workflow:

`.github/workflows/favicon-standard.yml`

## Search-engine compatibility note

The supplied canonical asset is WebP. Current Google Search favicon documentation states that Search supports BMP, GIF, ICO, PNG, JPEG, PPM and TIFF for search-result favicons, and requires a square asset at least 8×8 (recommended larger than 48×48).

Therefore:

```text
BROWSER_SITE_FAVICON = CANONICAL_WEBP_ASSET
GOOGLE_SEARCH_FAVICON_FORMAT_ELIGIBILITY = NOT_PROVEN / WEBP_NOT_LISTED_AS_SUPPORTED
```

Do not claim the Google SERP favicon is fixed merely because the browser favicon is fixed. A PNG/ICO/JPEG derivative of the same approved Tegra favicon should be introduced through a separate evidence-backed change if Google Search favicon eligibility is required.

The canonical WebP URL must remain stable unless Product Authority explicitly approves a replacement.
