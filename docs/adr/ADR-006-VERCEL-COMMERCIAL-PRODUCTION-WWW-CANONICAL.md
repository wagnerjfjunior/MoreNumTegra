# ADR-006 — Vercel commercial production with `www` canonical host

- Status: `ACCEPTED / CUTOVER_CERTIFIED`
- Date: `2026-09-14`
- Repository: `wagnerjfjunior/MoreNumTegra`
- Initial execution base: `0df3e4e116bca19a843feae4c0416ecab68dda98`
- Runtime cutover merge: PR #80 / `ce62354cc65069afd36b4fda561819d5d4a32bbc`
- Sitemap/robots merge: PR #81 / `6fdd26f100b60413fbdd85a4af44b78dfd371f76`
- Product Authority: explicit authorization on 2026-09-14 to execute, validate, certify and canonicalize the migration.

## Decision

Vercel is the MoreNumTegra commercial web production runtime. Cloudflare remains authoritative DNS only. Green Sales/GDigital remains the lead provider/CRM through Form 46.

Canonical topology:

```text
Registro.br
-> Cloudflare authoritative DNS / DNS only
   -> moretegra.com.br -> Vercel -> HTTP 308 -> www.moretegra.com.br
   -> www.moretegra.com.br -> Vercel Production
   -> lp.moretegra.com.br -> Vercel permanent 308 -> www.moretegra.com.br
```

Cloudflare proxy/orange-cloud remains OFF. Zone-apex CNAME flattening is automatic in Cloudflare and does not require a per-record toggle.

## Canonical commercial host

```text
https://www.moretegra.com.br/
```

The apex `https://moretegra.com.br/...` is a permanent redirect surface. It must preserve path/query when redirecting to the `www` canonical host.

## Runtime host scope

The project-owned production gates moved from the former Vercel parity host `lp.moretegra.com.br` to `www.moretegra.com.br` for:

- real Form 46 submission;
- first-party consent UI;
- canonical `mnt_*` source events;
- thank-you fresh-marker `mnt_lead_success` gate.

Arbitrary `*.vercel.app` previews remain non-sending for real Form 46 business submission and remain `noindex,nofollow`.

## Form 46 boundary

Green Sales remains the provider/backend:

```text
provider = Green Sales / GDigital
tenant_id = 313
form_id = 46
title = MoreEmUmTegra
POST = https://back.gdigital.com.br/form/register
```

Vercel owns presentation, validation, country/DDI, E.164 normalization, native `fetch` + `FormData`, loading/double-submit prevention, error handling and same-host `/obrigado` navigation. No intermediary backend or client-side secret is introduced.

## Measurement / consent

Preserved assets:

```text
GTM = GTM-PGCR4R47
GA4 property = 553742649
GA4 stream = 15759638334
GA4 Measurement ID = G-57M2XR0CY2
primary source event = mnt_lead_success
primary GA4 mapping = generate_lead
```

Business-tag hostname QA was changed to:

```regex
^www\.moretegra\.com\.br$
```

Observed Tag Assistant QA on `www` established:

```text
mnt_form_start -> PASS
mnt_form_submit_attempt -> PASS
/obrigado -> PASS
mnt_lead_success -> PASS
generate_lead -> PASS
consent accept -> four signals granted
consent reject -> four signals denied and persisted
```

Green Sales UI evidence separately confirmed persistence of the smoke-test lead with origin `MoreEmUmTegra`, seller association, tag and project/free-text context.

The exact published GTM version number for this `www` cutover was not captured in repository evidence and must not be invented. A supplied post-cutover Pingdom HAR confirms the live `www` page loads `GTM-PGCR4R47`; Tag Assistant proves the configured event/consent behavior.

## SEO / indexing

Accepted behavior:

- `https://www.moretegra.com.br/` -> HTTPS 200 from Vercel;
- static robots -> `index,follow`;
- declared canonical -> `https://www.moretegra.com.br/`;
- Google Search Console live inspection on 2026-09-14 -> URL indexed, crawl permitted, indexing permitted;
- Google-selected canonical -> inspected `www` URL;
- `*.vercel.app` -> `X-Robots-Tag: noindex, nofollow`;
- `/obrigado` -> `noindex,nofollow`;
- `/sitemap.xml` and `/robots.txt` deployed in PR #81;
- sitemap contains only the currently live/indexable canonical root until additional governed routes are actually published.

Rich Results / JSON-LD eligibility is a separate schema track and is not a cutover acceptance condition.

## Validation adjudication

```text
CLOUDFLARE_AUTHORITATIVE_DNS = PASS
CLOUDFLARE_PROXY = OFF / PASS
APEX_DNS_TO_VERCEL = PASS
WWW_DNS_TO_VERCEL = PASS
APEX_308_TO_WWW = PASS
PATH_QUERY_PRESERVATION = PASS
WWW_HTTPS_200 = PASS
WWW_CANONICAL_DECLARED = PASS
WWW_GOOGLE_INDEXED = PASS
GOOGLE_SELECTED_CANONICAL_WWW = PASS
VERCEL_APP_NOINDEX = PASS
FORM46_REAL_SUBMISSION_ON_WWW = PASS
GREEN_CRM_PERSISTENCE = PASS
THANK_YOU_GATE_ON_WWW = PASS
GTM_WWW_HOST_CONFIGURATION_QA = PASS
CONSENT_ACCEPT = PASS
CONSENT_REJECT = PASS
GA4_GENERATE_LEAD_QA = PASS
PII_IN_PROJECT_MEASUREMENT = NO
LP_REDIRECT_TO_WWW = PERMANENT_308 / NON_CANONICAL
SITEMAP_DEPLOYED = PASS
ROBOTS_SITEMAP_DISCOVERY = PASS
CUTOVER = CERTIFIED
```

## Residuals that do not reopen the cutover

- the historical `/favicon.ico` 404 residual is superseded by the later project-owned favicon package; current favicon state must be resolved from the current baseline/handoff.
- exact GTM published version number for the `www` host delta is `NOT_RECORDED`.
- Search Console sitemap submission/processing status is separate from the fact that the sitemap is deployed.
- any JSON-LD/rich-results gap belongs to the schema/Search implementation track.

## Supersession

## 2026-10-06 migration addendum

`lp.moretegra.com.br` no longer serves as a Green fallback. It is a permanent redirect surface to the canonical `www` host. Google Search Console Change of Address `lp -> www` was USER_CONFIRMED active with start date 2026-10-06. Do not revert `lp` to a content-serving fallback without a new migration decision.

This accepted ADR supersedes:

- Technical Baseline V2.2 production-host semantics;
- ADR-003 final-routing semantics after its transitional validation purpose;
- ADR-005 `lp.moretegra.com.br` host scope for commercial runtime.

ADR-004 remains the canonical Git-driven filtered automatic deployment policy. ADR-005 remains authoritative for the Form 46/Measurement implementation pattern where not superseded by the `www` host change.

This ADR does not authorize Cloudflare HTTP proxy, Meta/CAPI, Ads/spend, FECH.AI/n8n/Make, unrelated Search Console mutation, new backend/secrets, or ungoverned route creation.
