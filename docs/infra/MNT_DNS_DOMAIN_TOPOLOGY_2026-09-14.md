# MoreNumTegra — DNS / Domain Topology Evidence — 2026-09-14

- Status: `END_TO_END_VALIDATED / CLOSED`
- Project: `MoreNumTegra`
- Repository: `wagnerjfjunior/MoreNumTegra`
- Final validation reconciliation base: `7272d032e8583209da1c547e2efc142e22688b85`
- Decision record: `docs/adr/ADR-003-CLOUDFLARE-AUTHORITATIVE-DNS-VERCEL-CUSTOM-DOMAINS.md`

## Purpose

Record the completed DNS/domain transition validation from Registro.br authoritative DNS to Cloudflare, while preserving Green Sales as the commercial apex host and validating Vercel custom-domain routing on subdomains.

This document is evidence/state. It does not authorize future apex migration.

## Authoritative DNS — validated

Public ICANN lookup observed:

```text
moretegra.com.br
status = active
nameservers:
sue.ns.cloudflare.com
woz.ns.cloudflare.com
```

Therefore:

```text
NAMESERVER_CHANGE_CONFIGURED = YES
AUTHORITATIVE_DELEGATION_VALIDATED = YES
```

## Cloudflare zone state

Relevant configured records:

| Name | Type | Value | Proxy |
|---|---|---|---|
| `moretegra.com.br` | A | `3.209.18.127` | DNS only |
| `moretegra.com.br` | A | `3.226.196.25` | DNS only |
| `moretegra.com.br` | A | `50.17.107.228` | DNS only |
| `moretegra.com.br` | A | `52.7.141.145` | DNS only |
| `lp.moretegra.com.br` | CNAME | `f5d81ddb66950472.vercel-dns-017.com` | DNS only |
| `www.moretegra.com.br` | CNAME | `f5d81ddb66950472.vercel-dns-017.com` | DNS only |
| `moretegra.com.br` | TXT | existing Google site-verification value | DNS only |

The exact Google verification token is intentionally not duplicated here.

## Vercel domain state — validated

Observed in the live MoreNumTegra Vercel project UI:

| Domain | Routing | Final observed state |
|---|---|---|
| `morenumtegra.vercel.app` | Production | `Valid Configuration` |
| `lp.moretegra.com.br` | Production | `Valid Configuration` |
| `www.moretegra.com.br` | `308` redirect to `lp.moretegra.com.br` | `Valid Configuration` |

Vercel CNAME target in use:

```text
f5d81ddb66950472.vercel-dns-017.com
```

## HTTP evidence

Supplied HAR/browser evidence established:

```text
http://www.moretegra.com.br/
-> 307
-> https://www.moretegra.com.br/

https://www.moretegra.com.br/
-> 308
-> https://lp.moretegra.com.br/

https://lp.moretegra.com.br/
-> 200 OK
```

The `308` response is served by Vercel.

Path/query preservation was also tested:

```text
https://www.moretegra.com.br/teste-redirect?utm_source=teste
-> 308
-> https://lp.moretegra.com.br/teste-redirect?utm_source=teste
```

The final destination returned Vercel `404 NOT_FOUND` because `/teste-redirect` is not a real route. This is expected and confirms that both path and query were preserved through the redirect.

## Apex preservation

`https://moretegra.com.br/` continued to return `200 OK` from the existing Green/GDigital application stack.

Current accepted routing model:

```text
moretegra.com.br
-> Cloudflare authoritative DNS
-> existing Green/GDigital A records
-> current commercial production

lp.moretegra.com.br
-> Cloudflare authoritative DNS / DNS only
-> Vercel CNAME
-> MoreNumTegra Vercel Production

www.moretegra.com.br
-> Cloudflare authoritative DNS / DNS only
-> Vercel CNAME
-> HTTP 308
-> lp.moretegra.com.br
```

The `www -> lp` redirect is a validation configuration, not the final SEO canonical-host policy.

## Deployment state related to this topology

Vercel deployment mode is governed by ADR-004 and has been independently validated:

```text
AUTO_GIT_PREVIEW = VALIDATED
DOCS_ONLY_FILTER = VALIDATED
AUTO_GIT_PRODUCTION_AFTER_MAIN_MERGE = VALIDATED
GIT_DRIVEN_END_TO_END = VALIDATED
```

Documentation-only changes are skipped by the Vercel Ignored Build Step. Runtime changes continue to deploy automatically from Git.

## Final adjudication

```text
CLOUDFLARE_NS_DELEGATION = VALIDATED
LP_DNS_TO_VERCEL = VALIDATED
LP_TLS_HTTPS = VALIDATED
LP_VERCEL_RUNTIME = VALIDATED
WWW_DNS_TO_VERCEL = VALIDATED
WWW_HTTPS_308 = VALIDATED
PATH_PRESERVATION = VALIDATED
QUERY_STRING_PRESERVATION = VALIDATED
APEX_REMAINS_GREEN = VALIDATED
DNS_DOMAIN_VALIDATION = CLOSED
```

## Boundaries preserved

Still not implied or authorized by this closure:

- apex migration from Green to Vercel;
- Cloudflare orange-cloud proxy on Vercel-facing records;
- final SEO canonical-host choice;
- Search Console mutation;
- GA4/GTM mutation;
- MX/SPF/DKIM/DMARC changes;
- Green Form 46 replacement.

A future apex migration must be separately gated and must prove real Form 46 capture, `/obrigado`, Measurement/conversion behavior, indexability/canonical/robots/sitemap, SSL and production smoke behavior on Vercel.
