# MoreNumTegra — Vercel `www` Commercial Cutover Closeout — 2026-09-14

- Status: `CLOSED / CERTIFIED`
- Canonical repository: `wagnerjfjunior/MoreNumTegra`
- Cutover runtime PR: #80
- Sitemap/robots PR: #81
- Decision: `docs/adr/ADR-006-VERCEL-COMMERCIAL-PRODUCTION-WWW-CANONICAL.md`
- Current technical baseline after merge: `docs/baseline/TECHNICAL_BASELINE_V2_3.md`

## Purpose

Record the evidence used to close the migration from Green-hosted commercial web production to Vercel Production with `www.moretegra.com.br` as canonical host, while retaining Green Sales/GDigital as the Form 46 lead provider/CRM.

## Final topology

```text
Registro.br
-> Cloudflare authoritative DNS / DNS only
   -> moretegra.com.br -> Vercel -> 308 -> www.moretegra.com.br
   -> www.moretegra.com.br -> Vercel Production
   -> lp.moretegra.com.br -> Green/GDigital fallback/legacy surface
```

Cloudflare HTTP proxy is not enabled.

## Evidence summary

### DNS / domain

User-supplied live Cloudflare and Vercel UI evidence established:

- apex CNAME to the exact Vercel target shown by Vercel;
- `www` CNAME to Vercel;
- both DNS only;
- apex flattening handled automatically by Cloudflare;
- Vercel apex configured as `308 Permanent Redirect` to `www`;
- `www` connected to Production with valid configuration;
- `lp` moved back to Green/GDigital as non-canonical fallback.

### HTTP / runtime

Supplied browser/HAR evidence established the redirect architecture and path/query preservation during transition testing. Post-cutover Pingdom HAR on `https://www.moretegra.com.br/` established:

- `200` homepage;
- `Server: Vercel`;
- GTM container request `GTM-PGCR4R47` returned `200`;
- document load completed successfully;
- `/favicon.ico` returned `404` as a minor residual.

### Form 46 / CRM

Real production-form smoke test on `www` established:

```text
mnt_form_start
-> mnt_form_submit_attempt
-> Green Form 46 HTTP success
-> /obrigado
-> mnt_lead_success
-> generate_lead
```

Green Sales UI separately showed the persisted smoke-test lead with:

- origin `MoreEmUmTegra`;
- contact fields persisted;
- seller association;
- `MORETEGRA` tag;
- `texto-livre` project context persisted.

This closes the distinction between frontend success and provider-side CRM persistence.

### Consent

Tag Assistant QA established both paths:

```text
ACCEPT:
ad_storage = granted
analytics_storage = granted
ad_user_data = granted
ad_personalization = granted

REJECT:
ad_storage = denied
analytics_storage = denied
ad_user_data = denied
ad_personalization = denied
```

Rejected state remained denied in subsequent events.

### Search / canonical / indexation

Google Search Console live inspection on 2026-09-14 established for `https://www.moretegra.com.br/`:

- URL is in Google;
- page is indexed;
- crawl allowed;
- indexing allowed;
- declared canonical = `https://www.moretegra.com.br/`;
- Google-selected canonical = inspected URL.

PR #81 deployed:

- `/sitemap.xml` with only the live/indexable canonical homepage;
- `/robots.txt` advertising the canonical sitemap.

The sitemap must grow only with real, published, governed, indexable routes.

## Route growth policy

Current Search architecture reserves:

```text
/empreendimentos/<project-slug>/
/caminhos-da-lapa/
/estagios/<stage>/
/regioes/<verified-location>/
```

Future `/blog/...` is allowed only after its own content/ownership gate. Reservation does not equal publication; unpublished routes must not be inserted into the sitemap.

## Final adjudication

```text
DNS_AUTHORITY = CLOUDFLARE / PASS
CLOUDFLARE_PROXY = OFF / PASS
VERCEL_COMMERCIAL_PRODUCTION = PASS
CANONICAL_HOST = www.moretegra.com.br / PASS
APEX_PERMANENT_REDIRECT = PASS
FORM46_REAL_CAPTURE = PASS
GREEN_CRM_PERSISTENCE = PASS
CONSENT_ACCEPT = PASS
CONSENT_REJECT = PASS
MNT_LEAD_SUCCESS_QA = PASS
GA4_GENERATE_LEAD_QA = PASS
GSC_WWW_INDEXED = PASS
GOOGLE_CANONICAL_WWW = PASS
SITEMAP_DEPLOYED = PASS
ROBOTS_DEPLOYED = PASS
CUTOVER_CLOSED = YES
```

## Explicit residuals

Residuals preserved without blocking cutover closure:

1. exact published GTM version number for the `www` host delta was not captured in repository evidence;
2. Search Console sitemap submission/processing status is separate from sitemap deployment and was not used to prove indexation;
3. `/favicon.ico` returned 404 in the supplied Pingdom HAR;
4. Rich Results/JSON-LD eligibility remains a separate Search/schema track;
5. known project-fact residuals remain governed by Product Truth/Search gates and are not waived by this infrastructure closeout.

## Closure rule

This closeout certifies the web-host migration only. It does not authorize new DNS changes, Cloudflare proxying, Meta/CAPI, Ads, FECH.AI/n8n/Make, new backend/secrets, ungoverned route publication or factual claim relaxation.
