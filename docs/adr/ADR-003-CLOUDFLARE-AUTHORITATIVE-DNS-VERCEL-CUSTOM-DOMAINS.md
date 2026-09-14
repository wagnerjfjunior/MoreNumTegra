# ADR-003 — Cloudflare authoritative DNS with Vercel custom-domain routing

- Status: `ACCEPTED / END_TO_END_VALIDATED`
- Date: `2026-09-14`
- Project: `MoreNumTegra`
- Repository: `wagnerjfjunior/MoreNumTegra`
- Decision authority: Product Authority authorization in project conversation on `2026-09-14`
- Canonical base before final validation reconciliation: `7272d032e8583209da1c547e2efc142e22688b85`
- Related baseline: `docs/baseline/TECHNICAL_BASELINE_V2_2.md`
- Related ADRs: `docs/adr/ADR-002-VERCEL-MANUAL-GATE-DRIVEN-DEPLOYMENT.md`, `docs/adr/ADR-004-VERCEL-GIT-DRIVEN-AUTOMATIC-DEPLOYMENT.md`
- Evidence snapshot: `docs/infra/MNT_DNS_DOMAIN_TOPOLOGY_2026-09-14.md`

## Context

The project moved authoritative DNS for `moretegra.com.br` from Registro.br nameservers to Cloudflare while preserving Green Sales/GDigital as the commercial apex host. Vercel custom domains were introduced on subdomains to validate routing before any future apex-hosting decision.

This decision does **not** migrate the commercial apex to Vercel.

## Accepted topology

```text
REGISTRAR
Registro.br
    |
    v
AUTHORITATIVE DNS
Cloudflare
    |
    +-- moretegra.com.br ------> Green Sales / GDigital (current commercial production)
    +-- lp.moretegra.com.br ---> Vercel custom domain / Production environment
    `-- www.moretegra.com.br --> Vercel 308 redirect --> lp.moretegra.com.br
```

For Vercel-facing records, Cloudflare is configured as **DNS only**. Cloudflare is the authoritative DNS control plane; Vercel remains the web edge/CDN/TLS/hosting layer.

## Authoritative DNS

Validated public nameservers:

```text
sue.ns.cloudflare.com
woz.ns.cloudflare.com
```

The previous Registro.br nameservers were:

```text
e.sec.dns.br
f.sec.dns.br
```

Public ICANN lookup on `2026-09-14` showed the Cloudflare nameservers, closing the nameserver-transition gate.

## Cloudflare records

Commercial apex retained on Green/GDigital:

```text
moretegra.com.br A 3.209.18.127
moretegra.com.br A 3.226.196.25
moretegra.com.br A 50.17.107.228
moretegra.com.br A 52.7.141.145
```

Vercel custom-domain target supplied by the live Vercel project:

```text
f5d81ddb66950472.vercel-dns-017.com
```

Configured records:

```text
lp.moretegra.com.br  CNAME  f5d81ddb66950472.vercel-dns-017.com
www.moretegra.com.br CNAME  f5d81ddb66950472.vercel-dns-017.com
```

The web records are `DNS only` with automatic TTL. The existing Google site-verification TXT record on the apex is preserved.

## Vercel routing — validated

Observed in the live Vercel project UI after DNS propagation:

```text
morenumtegra.vercel.app = Production / Valid Configuration
lp.moretegra.com.br      = Production / Valid Configuration
www.moretegra.com.br     = Valid Configuration / 308 -> lp.moretegra.com.br
```

Observed HTTP behavior from the supplied browser/HAR evidence:

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

A path/query preservation test also succeeded:

```text
https://www.moretegra.com.br/teste-redirect?utm_source=teste
-> 308
-> https://lp.moretegra.com.br/teste-redirect?utm_source=teste
```

The destination returned `404 NOT_FOUND` because `/teste-redirect` is not an application route. That 404 occurs **after** the redirect and therefore confirms that the path and query string were preserved rather than collapsed to `/`.

The current `www -> lp` route remains a bounded validation configuration. It is **not** the final SEO canonical-host decision.

## Apex preservation — validated

`https://moretegra.com.br/` continued returning `200 OK` from the existing Green/GDigital stack during the validation. Therefore:

```text
DNS_PROVIDER_CHANGE != HOSTING_MIGRATION
GREEN_SALES = CURRENT_COMMERCIAL_APEX_PRODUCTION
VERCEL = CUSTOM-DOMAIN VALIDATION / FUTURE HOSTING SURFACE
```

## Cloudflare proxy policy

Current policy for Vercel-hosted surfaces:

```text
CLOUDFLARE_PROXY = OFF
DNS_MODE = DNS_ONLY
VERCEL = WEB EDGE / CDN / TLS / HOSTING / PROJECT FIREWALL LAYER
CLOUDFLARE = AUTHORITATIVE DNS CONTROL PLANE
```

Enabling Cloudflare proxy/orange-cloud remains separately gated.

## Deployment policy relationship

ADR-002 remains historical evidence for the earlier manual deployment mode. ADR-004 supersedes it for current deployment triggering:

```text
RUNTIME CHANGE -> GIT -> VERCEL PREVIEW / PRODUCTION AUTOMATIC
DOCS-ONLY CHANGE -> VERCEL IGNORED BUILD STEP
```

This DNS ADR does not itself authorize future apex migration.

## Final validation adjudication

The following checks are now evidenced:

1. public NS resolution returns the Cloudflare nameservers;
2. Cloudflare contains the Vercel CNAMEs supplied by Vercel;
3. Vercel reports `Valid Configuration` for `lp.moretegra.com.br`;
4. Vercel reports `Valid Configuration` for `www.moretegra.com.br`;
5. HTTPS works on `lp.moretegra.com.br`;
6. `www.moretegra.com.br` returns the configured `308` to `lp.moretegra.com.br`;
7. path/query preservation is validated;
8. `moretegra.com.br` remains on Green during this bounded transition.

```text
CONFIGURED = YES
PROPAGATION = COMPLETE_FOR_ACCEPTANCE
END_TO_END_VALIDATED = YES
WWW_308_REDIRECT = VALIDATED
PATH_PRESERVATION = VALIDATED
QUERY_STRING_PRESERVATION = VALIDATED
APEX_MIGRATION_TO_VERCEL = NOT_AUTHORIZED_BY_THIS_ADR
```

## Explicitly not authorized

This ADR does not authorize:

- replacing the apex Green/GDigital A records with Vercel records;
- removing Green Sales as current commercial production host;
- enabling Cloudflare proxy/orange-cloud for Vercel-facing records;
- changing MX, SPF, DKIM or DMARC;
- changing Search Console property ownership or canonical settings;
- changing GA4/GTM configuration;
- treating `www -> lp` as the final SEO redirect architecture;
- publishing a new indexable host without Search/SEO validation.

## Future decision boundary

A future apex migration may evaluate:

```text
Registro.br
-> Cloudflare authoritative DNS
-> DNS-only
-> Vercel
```

Keeping Cloudflare as authoritative DNS while Vercel provides web edge/security/hosting remains the preferred evaluation baseline. The apex migration itself requires its own gate, including Form 46, `/obrigado`, Measurement, canonical/robots/sitemap and production smoke validation.
