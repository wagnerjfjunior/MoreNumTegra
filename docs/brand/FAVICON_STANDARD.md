# MoreNumTegra — Favicon Standard

Status: `CANDIDATE / GENERATED_FROM_PRODUCT_AUTHORITY_SOURCE`  
Date: `2026-09-23`

## Source asset

Product Authority supplied one transparent square PNG:

```text
dimensions = 500x500
format = PNG / RGBA / transparent background
SHA-256 = 0fd8e12cc711543f44a6b34581bdb09981e7e30570b783cb8b29057ff408caf8
visual = Tegra yellow T mark
```

This source is the basis for the favicon package below.

## Canonical browser/Search favicon

All standalone MoreNumTegra HTML pages declare:

```html
<link rel="icon" type="image/x-icon" href="/favicon.ico" sizes="any">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
```

Canonical Search/browser URL remains stable:

```text
https://www.moretegra.com.br/favicon.ico
```

## Generated package

```text
/favicon.ico             = ICO with validated 48x48, 96x96 and 192x192 PNG frames
/favicon-48x48.png       = 48x48 PNG
/favicon-96x96.png       = 96x96 PNG
/favicon-192x192.png     = 192x192 PNG
/apple-touch-icon.png    = 180x180 PNG
```

All derivatives preserve transparency and the same Tegra mark.

The final ICO uses only three validated PNG frames: 48×48, 96×96 and 192×192. The validator checks every frame boundary and PNG signature, preventing a repeat of the corrupt-frame regression.

## Google Search eligibility

Google Search requires a square favicon and recommends a size larger than 48x48. ICO and PNG are supported formats.

The site keeps one stable Search favicon URL at `/favicon.ico`. Google controls recrawl/processing timing, so successful deployment does not imply immediate SERP visual refresh.

Do not claim the Google result favicon has changed until observed live.

## Scope

The rule applies to every standalone HTML document under:

- `src-greenn/**`;
- `experiments/**`.

HTML fragments without a `<head>` inherit the containing document favicon.

## CI enforcement

`scripts/validate-favicon-standard.mjs` verifies:

- `favicon.ico` exists and has a valid ICO directory;
- every embedded ICO frame stays inside file bounds;
- every embedded ICO frame is a PNG frame;
- at least one ICO frame is square and 48x48 or larger;
- PNG derivative signatures and exact dimensions are valid;
- every standalone page declares exactly one `rel="icon"`;
- every standalone page declares exactly one `rel="apple-touch-icon"`;
- the canonical paths are used;
- the former WebP favicon is absent;
- the horizontal Tegra logo is not misused as favicon.

Workflow:

`.github/workflows/favicon-standard.yml`

## Historical regressions

The former remote WebP favicon was replaced because Google Search documentation does not list WebP among supported Search favicon formats.

A later hand-built multi-frame ICO contained broken larger frames and could render as a blank square. That package is superseded by this source-derived package.


## Browser cache busting

Public asset URL remains:

`https://www.moretegra.com.br/favicon.ico`

HTML references the stable canonical URL `/favicon.ico`. Vercel sends `Cache-Control: public, max-age=0, must-revalidate` for this asset so browsers revalidate the file instead of retaining the former favicon indefinitely.
