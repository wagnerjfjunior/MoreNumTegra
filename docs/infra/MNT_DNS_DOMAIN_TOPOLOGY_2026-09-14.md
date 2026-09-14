# MoreNumTegra — DNS / Domain Topology Evidence — 2026-09-14

- Status: `CONFIGURED / PROPAGATION_PENDING / NOT_YET_END_TO_END_VALIDATED`
- Project: `MoreNumTegra`
- Repository: `wagnerjfjunior/MoreNumTegra`
- Canonical base resolved before this documentation change: `bb4fd60ddd3571fce552da0fba02171d1aa4e983`
- Decision record: `docs/adr/ADR-003-CLOUDFLARE-AUTHORITATIVE-DNS-VERCEL-CUSTOM-DOMAINS.md`

## Purpose

Record the externally configured DNS/domain state observed during the controlled transition from Registro.br authoritative DNS to Cloudflare, while preserving Green Sales as the current commercial apex host and introducing Vercel custom-domain routing on subdomains.

This document is evidence/state, not authorization for additional platform changes.

## Observed registrar / nameserver state

Registro.br was configured to transition authoritative DNS to:

```text
sue.ns.cloudflare.com
woz.ns.cloudflare.com
```

During the same transition window, ICANN/RDAP still exposed the prior nameservers:

```text
e.sec.dns.br
f.sec.dns.br
```

Interpretation:

```text
NAMESERVER_CHANGE_CONFIGURED = YES
GLOBAL_PROPAGATION_COMPLETE = NOT_YET_PROVEN
```

DNSSEC was observed as unsigned during this transition.

## Cloudflare zone state

Cloudflare imported the previously existing zone records and the web records were explicitly normalized to `DNS only`.

Observed/configured records relevant to this transition:

| Name | Type | Value | Proxy |
|---|---|---|---|
| `moretegra.com.br` | A | `3.209.18.127` | DNS only |
| `moretegra.com.br` | A | `3.226.196.25` | DNS only |
| `moretegra.com.br` | A | `50.17.107.228` | DNS only |
| `moretegra.com.br` | A | `52.7.141.145` | DNS only |
| `lp.moretegra.com.br` | CNAME | `f5d81ddb66950472.vercel-dns-017.com` | DNS only |
| `www.moretegra.com.br` | CNAME | `f5d81ddb66950472.vercel-dns-017.com` | DNS only |
| `moretegra.com.br` | TXT | existing Google site-verification value | DNS only |

The exact Google verification token is intentionally not duplicated here because its continued presence, not its token value, is the relevant state for this transition record.

## Vercel project state

Observed in the live MoreNumTegra Vercel project UI:

| Domain | Routing | State at observation |
|---|---|---|
| `morenumtegra.vercel.app` | Production | `Valid Configuration` |
| `lp.moretegra.com.br` | Production | `Invalid Configuration` while DNS propagation is pending |
| `www.moretegra.com.br` | `308` redirect to `lp.moretegra.com.br` | `Invalid Configuration` while DNS propagation is pending |

Vercel supplied this current custom-domain CNAME target:

```text
f5d81ddb66950472.vercel-dns-017.com
```

The Vercel UI also states that legacy targets such as `cname.vercel-dns.com` / `76.76.21.21` continue to work, but this project uses the exact current target supplied for the custom domains above.

## Current routing model

Configured transition model:

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
-> Vercel HTTP 308
-> lp.moretegra.com.br
```

The `www -> lp` redirect is a controlled validation configuration, not the final canonical-host policy.

## What has been deliberately preserved

- apex Green/GDigital A records;
- Green Sales as current commercial production destination;
- existing Google verification TXT;
- Cloudflare proxy disabled for Vercel-facing records;
- Vercel manual gate-driven deployment policy from ADR-002;
- GitHub `main` as canonical project source.

## What remains unproven

At this evidence point, do not claim:

- Cloudflare nameserver propagation complete globally;
- `lp.moretegra.com.br` validated by Vercel;
- `www.moretegra.com.br` validated by Vercel;
- TLS/HTTPS final on either custom Vercel domain;
- observed public HTTP `308` response from `www`;
- path/query preservation on the redirect;
- apex migration to Vercel;
- final SEO canonical-host design.

## Required follow-up evidence

When propagation completes, append or supersede this snapshot with observed evidence for:

```text
NS moretegra.com.br -> sue.ns.cloudflare.com / woz.ns.cloudflare.com
CNAME lp.moretegra.com.br -> f5d81ddb66950472.vercel-dns-017.com
CNAME www.moretegra.com.br -> f5d81ddb66950472.vercel-dns-017.com
Vercel lp -> Valid Configuration
Vercel www -> Valid Configuration
HTTPS lp -> success
HTTP www -> 308 + expected Location
path/query preservation -> verified
apex moretegra.com.br -> still Green during transition
```

Until then:

```text
CONFIGURED != VALIDATED
DNS_PROVIDER_CHANGE != HOSTING_MIGRATION
WWW_TEST_REDIRECT != FINAL_SEO_CANONICAL_REDIRECT
```
