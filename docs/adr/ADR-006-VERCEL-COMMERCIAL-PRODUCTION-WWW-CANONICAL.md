# ADR-006 — Vercel commercial production with `www` canonical host

- Status: `CANDIDATE / CUTOVER_IN_PROGRESS`
- Date: `2026-09-14`
- Repository: `wagnerjfjunior/MoreNumTegra`
- Canonical execution base: `0df3e4e116bca19a843feae4c0416ecab68dda98`
- Product Authority: explicit authorization in project conversation on 2026-09-14 to complete, validate and certify the domain migration now.

## Decision

Promote Vercel from homologation to the MoreNumTegra commercial web production host, preserving Cloudflare only as authoritative DNS and Green Sales/GDigital as the Form 46 CRM/capture provider.

Final intended web topology:

```text
Registro.br
-> Cloudflare authoritative DNS / DNS only
   -> moretegra.com.br CNAME (apex flattening) -> Vercel -> HTTP 308 -> www.moretegra.com.br
   -> www.moretegra.com.br CNAME -> Vercel Production
   -> lp.moretegra.com.br A x4 -> Green/GDigital legacy/fallback surface
```

Cloudflare proxy remains OFF. CNAME flattening on the zone apex is automatic by Cloudflare and does not require a per-record toggle.

## Configured external state

The Product Authority supplied live UI evidence showing:

- Vercel `moretegra.com.br` configured as `308 Permanent Redirect` to `www.moretegra.com.br`;
- Vercel `www.moretegra.com.br` connected to `Production` and shown as `Valid Configuration`;
- Cloudflare apex `moretegra.com.br` CNAME -> `f5d81ddb66950472.vercel-dns-017.com`, DNS only;
- Cloudflare `www.moretegra.com.br` CNAME -> the same Vercel target, DNS only;
- Cloudflare `lp.moretegra.com.br` uses the prior Green/GDigital A records `52.7.141.145`, `50.17.107.228`, `3.226.196.25`, `3.209.18.127`, all DNS only;
- existing Google site-verification TXT on the apex remains preserved;
- Green domain management has `lp.moretegra.com.br` registered and certificate validation pending at the time of the screenshot.

These UI observations are configuration evidence. End-to-end HTTP, TLS, Form 46 and Measurement behavior must be separately validated before the cutover is declared closed.

## Runtime host migration

The prior Vercel parity runtime was intentionally hard-gated to `lp.moretegra.com.br`. Because `www.moretegra.com.br` is now the commercial Vercel Production host, this cutover changes the project-owned host gates to `www.moretegra.com.br` for:

- real Form 46 submission;
- first-party consent UI;
- `mnt_*` source measurement events;
- thank-you fresh-marker lead-success gate.

Arbitrary `*.vercel.app` preview deployments remain non-sending for Form 46 business submissions.

## SEO / indexing

Commercial canonical host:

```text
https://www.moretegra.com.br/
```

Required behavior:

- apex `https://moretegra.com.br/...` -> permanent 308 -> `https://www.moretegra.com.br/...` with path/query preserved;
- `www` homepage returns 200 over HTTPS;
- `www` homepage is indexable;
- `canonical`, Open Graph URL and JSON-LD URL identity resolve to `https://www.moretegra.com.br/`;
- Vercel preview / `*.vercel.app` surfaces retain `X-Robots-Tag: noindex, nofollow`;
- `/obrigado` remains `noindex,nofollow`.

## Form 46 boundary

This migration does not replace Green Sales as the lead provider.

Preserve:

```text
provider = Green Sales / GDigital
tenant_id = 313
form_id = 46
title = MoreEmUmTegra
POST = https://back.gdigital.com.br/form/register
```

The Vercel frontend owns the presentation, validation, E.164 normalization, request lifecycle and same-host thank-you flow. Green remains the backend CRM/capture destination.

## Measurement delta required

The currently documented GTM hostname allowlist from the old `lp` parity state is:

```regex
^(moretegra\.com\.br|lp\.moretegra\.com\.br)$
```

The commercial Vercel production host now requires the business-tag host gate to become:

```regex
^www\.moretegra\.com\.br$
```

Apply this host change to the Google Tag initialization trigger and all canonical `CE - mnt_*` triggers, while preserving event names, GA4 destination `G-57M2XR0CY2`, `send_page_view=false`, consent semantics, single dispatcher and the `^/obrigado/?$` lead-success route condition.

No Measurement parity claim is allowed until the published GTM configuration is observed on `www` and a real Form 46 lead produces exactly one `mnt_lead_success` -> one GA4 `generate_lead` without PII.

## Validation gate

Cutover closure requires observed evidence for all of the following:

```text
APEX_DNS_TO_VERCEL = PASS
WWW_DNS_TO_VERCEL = PASS
APEX_308_TO_WWW = PASS
PATH_QUERY_PRESERVATION = PASS
WWW_HTTPS_200 = PASS
WWW_CANONICAL = PASS
WWW_INDEXABLE = PASS
VERCEL_APP_NOINDEX = PASS
FORM46_REAL_SUBMISSION_ON_WWW = PASS
THANK_YOU_GATE_ON_WWW = PASS
GTM_WWW_HOST_ALLOWLIST = PASS
GA4_GENERATE_LEAD_EXACTLY_ONCE = PASS
PII_IN_MEASUREMENT = NO
LP_GREEN_FALLBACK = OBSERVED / NON_CANONICAL
```

Until those checks are evidenced:

```text
CUTOVER_CONFIGURED != CUTOVER_CERTIFIED
DNS_VALID != FORM46_VALID
FORM46_VALID != MEASUREMENT_VALID
WWW_LIVE != SEO_CERTIFIED
```

## Supersession

When this ADR is accepted after closure evidence, it supersedes the production-host semantics in Technical Baseline V2.2, ADR-003 and the `lp` host scope in ADR-005. ADR-004 remains the canonical Git-driven Vercel deployment policy.

This ADR does not authorize Cloudflare HTTP proxy/orange-cloud, Meta/CAPI, Ads/spend, FECH.AI/n8n/Make, unrelated Search Console mutation or changes to the Form 46 provider contract.
