# MoreNumTegra — Technical Baseline V2.3

- Status: `CANONICAL_CANDIDATE` until merged to `main`; `CANONICAL_V2_3` when present in resolved `main`
- Date: `2026-09-14`
- Repository: `wagnerjfjunior/MoreNumTegra`
- Functional input: `docs/baseline/FUNCTIONAL_BASELINE_V2.md`
- Parent baseline: `docs/baseline/TECHNICAL_BASELINE_V2_2.md`
- Binding current decisions: ADR-004, ADR-005 and ADR-006
- Supersedes V2.2 for production-host, deployment, Form 46-on-Vercel, DNS and Search/indexability semantics.

## 1. Architecture

The V1 remains deliberately simple:

- semantic HTML5;
- mobile-first CSS;
- vanilla JavaScript;
- no framework/bundler requirement;
- no project-owned backend intermediary required for V1;
- GitHub `main` is the canonical source;
- Vercel is the web runtime and commercial production host;
- Green Sales/GDigital remains the lead capture/CRM provider through Form 46;
- Cloudflare is authoritative DNS only; HTTP proxy/orange-cloud remains off.

## 2. Canonical production topology

```text
Registro.br
-> Cloudflare authoritative DNS / DNS only
   -> moretegra.com.br CNAME apex flattening -> Vercel -> 308 -> www.moretegra.com.br
   -> www.moretegra.com.br CNAME -> Vercel Production
   -> lp.moretegra.com.br -> Green/GDigital legacy/fallback surface
```

Canonical commercial/indexable host:

`https://www.moretegra.com.br/`

`https://moretegra.com.br/...` is a permanent redirect surface and must preserve path/query when redirecting to `www`.

## 3. Vercel environments

### Preview

Branch/runtime changes produce automatic Vercel Preview deployments. Preview/`*.vercel.app` surfaces are not commercial canonical origins and remain protected with `X-Robots-Tag: noindex, nofollow`.

The Form 46 client is host-gated so arbitrary `*.vercel.app` previews do not transmit real lead submissions.

### Production

Merge to `main` with runtime/config changes produces automatic Vercel Production deployment. Documentation-only changes are skipped through the Vercel Ignored Build Step.

Canonical deployment policy is ADR-004:

```text
runtime branch change -> automatic Preview
merge runtime to main -> automatic Production
docs-only -> Ignored Build Step
manual Deploy Hook -> fallback only
```

## 4. Lead capture / Green Sales boundary

Green Sales remains the provider/backend for the V1 lead contract:

```text
provider = Green Sales / GDigital
tenant_id = 313
form_id = 46
title = MoreEmUmTegra
POST = https://back.gdigital.com.br/form/register
required = nome, email, telefone
optional = texto-livre
```

The Vercel frontend owns presentation, validation, country/DDI selection, E.164 normalization, loading state, duplicate-submit prevention, network/application error handling and the same-host `/obrigado` journey.

The implementation uses native `fetch` + `FormData`; no secret/token may be exposed client-side and no intermediary backend is required unless the provider contract later changes.

## 5. Measurement / consent

Project-owned browser dispatcher remains single-instance:

```text
GTM = GTM-PGCR4R47
GA4 property = 553742649
GA4 stream = 15759638334
GA4 Measurement ID = G-57M2XR0CY2
```

Canonical production business host gate is `www.moretegra.com.br`.

Canonical source taxonomy remains:

```text
mnt_page_view
mnt_section_click
mnt_catalog_filter
mnt_catalog_search
mnt_intent
mnt_form_start
mnt_form_submit_attempt
mnt_lead_success -> GA4 generate_lead
```

`mnt_lead_success` remains the sole primary lead source event. Form start and submit attempt remain non-conversions. Visitor PII and free-form text must never be copied into GA4/dataLayer.

Consent Mode baseline:

- default denied;
- accept -> `ad_storage`, `analytics_storage`, `ad_user_data`, `ad_personalization` granted;
- reject -> the same four signals denied.

The exact published GTM version number for the `www` cutover must not be invented when not recorded.

## 6. Thank-you / conversion gate

Canonical thank-you URL:

`https://www.moretegra.com.br/obrigado/`

It is one shared route for the portfolio and future project pages. Project attribution must travel through governed form/dataLayer context rather than separate thank-you URLs per project.

`/obrigado` remains `noindex,nofollow` and must emit `mnt_lead_success` only when a fresh client-side pending marker exists and is consumed once. Direct access/refresh must not create duplicate lead conversions.

## 7. Search / canonical / sitemap

Homepage requirements:

```text
https://www.moretegra.com.br/
robots = index,follow
canonical = https://www.moretegra.com.br/
HTTP = 200
```

Root discovery files:

- `/robots.txt` advertises `https://www.moretegra.com.br/sitemap.xml`;
- `/sitemap.xml` contains only real, live, indexable canonical URLs;
- `/obrigado/`, `*.vercel.app`, Green fallback and unpublished planned routes are excluded.

Google Search Console live evidence on 2026-09-14 showed the `www` homepage indexed, crawl/indexing allowed, declared canonical `https://www.moretegra.com.br/` and Google-selected canonical equal to the inspected `www` URL.

Rich Results eligibility/JSON-LD is a separate schema track; absence of a rich-result item does not invalidate indexation.

## 8. Route namespace

Governed Search architecture reserves:

```text
/                                           portfolio root
/caminhos-da-lapa/                          master development
/empreendimentos/<project-slug>/            exact project
/estagios/<stage>/                          stage discovery
/regioes/<verified-location>/               verified location discovery
```

Future `/blog/...` may be introduced only through its own content/ownership gate.

A reserved route is not automatically published. Add a URL to sitemap only after it exists, returns the intended successful response, is factually governed, is self-canonical/indexable and has passed its applicable release gate.

## 9. Performance / mobile

Mobile remains the primary acceptance path. Targets remain:

- LCP <= 2.5 s;
- INP <= 200 ms;
- CLS <= 0.1.

Optional video/media must not block catalog, filters, CTAs or Form 46.

## 10. Brand favicon standard

Canonical browser favicon asset:

`https://s3-gdigital.s3.amazonaws.com/gdigital/313/Favicon_Tegra_500x500_nobg.webp`

Every standalone HTML page with its own `<head>` under `src-greenn` or `experiments` must declare exactly one `rel="icon"` pointing to that asset. The horizontal Tegra logo is not a favicon and must never be reused as one.

This rule is enforced by:

- `docs/brand/FAVICON_STANDARD.md`;
- `scripts/validate-favicon-standard.mjs`;
- `.github/workflows/favicon-standard.yml`.

HTML fragments without their own `<head>` inherit the favicon from the containing page.

Google Search favicon eligibility remains a separate validation concern because the supplied canonical asset is WebP and WebP is not currently listed among Google Search's supported favicon formats. Do not mark the SERP favicon fixed without a supported-format derivative and Google recrawl evidence.

## 11. Current residuals and boundaries

Known residuals do not silently become PASS:

- browser favicon standard is canonicalized to the approved square Tegra WebP asset; Google Search favicon eligibility remains open because WebP is not listed as a supported Search favicon format;
- exact published GTM version number for the `www` host cutover is not recorded in project evidence;
- Search Console sitemap submission/processing status must be evidenced separately from sitemap deployment;
- project/content factual residuals such as the governed Mozae metragem correction remain under their Search/Product Truth gates.

Separate authorization remains required for:

- Cloudflare orange-cloud HTTP proxy;
- Meta/CAPI;
- Google Ads linkage/conversions/spend;
- FECH.AI/n8n/Make;
- new secrets/server architecture;
- CMS/database/backend expansion;
- material new route families beyond governed Search ownership.

## 12. Supersession

V2.3 supersedes V2.2 only where V2.2 says:

- Vercel is homologation-only;
- Green Builder is the commercial web production destination;
- Vercel must remain globally noindex;
- the Vercel form must be non-sending;
- controlled Green publication follows every accepted runtime merge.

Historical baselines/ADRs remain evidence of prior states. Current operational truth is resolved from live `main`, this baseline, ADR-004/005/006, `handoffs/CURRENT.md`, `docs/NEXT_SAFE_ACTION.md` and `docs/BLOCKED_ACTIONS.md`.


## Commercial footer/location standard — 2026-09-19

Canonical contract: `docs/content/COMMERCIAL_FOOTER_AND_LOCATION_STANDARD.md`.

```text
COMMERCIAL_FOOTER_STANDARD = REQUIRED_ON_HOME_AND_ALL_PUBLIC_PROJECT_PAGES
FOOTER_LOGO = https://s3-gdigital.s3.amazonaws.com/gdigital/313/dkRxNEw3OY1mr3apBCmTbFFGpzD4PZnbGLWpJq1q.webp
PAGE_SPECIFIC_ADDRESS = GOVERNED_FACT / REQUIRED
SABRINA_CONTACT = REQUIRED
CAPIITOLO_MAP = WHATSAPP_ONLY_CLICK_SURFACE
CAPIITOLO_DIRECT_MAPS_NAVIGATION = FORBIDDEN
FUTURE_PAGE_ENFORCEMENT = CI_REQUIRED
```
