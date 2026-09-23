# MoreNumTegra — Favicon Standard

Status: `CANONICAL / PRODUCTION_VALIDATED`  
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
<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="shortcut icon" href="/favicon.ico">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
```

Canonical Search/browser URL remains stable:

```text
https://www.moretegra.com.br/favicon.ico
```

## Generated package

```text
/favicon.ico             = ICO with validated 16x16, 32x32, 48x48, 96x96 and 192x192 PNG frames
/favicon-16x16.png       = 16x16 PNG
/favicon-32x32.png       = 32x32 PNG
/favicon-48x48.png       = 48x48 PNG
/favicon-96x96.png       = 96x96 PNG
/favicon-192x192.png     = 192x192 PNG
/apple-touch-icon.png    = 180x180 PNG
```

All derivatives preserve transparency and the same Tegra mark.

The final ICO includes browser-tab frames 16×16 and 32×32 plus Search/high-density frames 48×48, 96×96 and 192×192. The HTML also declares explicit 16/32/48 PNG icons so Chrome does not depend on its cached ICO selection.

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
- ICO includes valid 16×16, 32×32, 48×48, 96×96 and 192×192 frames;
- PNG derivative signatures and exact dimensions are valid;
- every standalone page declares explicit 48×48, 32×32 and 16×16 PNG icons;
- every standalone page declares the canonical `/favicon.ico` as `shortcut icon`;
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


## Production validation

```text
PR = #244
runtime SHA = 847a2f4460894e1f0fdcc30501f6b6396ec67b75
deployment = dpl_AeLHW8cj3w7kDgUdueLL56ezCeS7
state = READY
/favicon.ico = HTTP 200 / image/x-icon
favicon-48x48.png = HTTP 200
apple-touch-icon.png = HTTP 200
```

The visible source-derived mark is the Tegra yellow `T`.


## Browser-tab remediation — 2026-09-23

Production feedback showed that the site favicon still failed to appear in the browser tab even though the Search-facing 48/96/192 package was valid.

Concrete gap:

```text
tab-oriented 16x16 frame = MISSING
tab-oriented 32x32 frame = MISSING
explicit 16/32 PNG declarations = MISSING
```

Final browser strategy:

```text
Chrome/browser tab = explicit 32x32 and 16x16 PNGs
Google/Search = explicit 48x48 PNG + stable /favicon.ico
ICO fallback = 16/32/48/96/192
Apple = 180x180 PNG
```

All assets derive from the same Product Authority 500×500 transparent Tegra “T” source.
