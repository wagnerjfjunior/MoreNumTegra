# ADR-003 — Cloudflare authoritative DNS with Vercel custom-domain routing

- Status: `CANDIDATE_IN_PR` until integrated in `main`; `ACCEPTED` when present in resolved `main`
- Date: `2026-09-14`
- Project: `MoreNumTegra`
- Repository: `wagnerjfjunior/MoreNumTegra`
- Decision authority: Product Authority authorization in project conversation on `2026-09-14`
- Canonical base resolved before mutation: `bb4fd60ddd3571fce552da0fba02171d1aa4e983`
- Related baseline: `docs/baseline/TECHNICAL_BASELINE_V2_2.md`
- Related ADR: `docs/adr/ADR-002-VERCEL-MANUAL-GATE-DRIVEN-DEPLOYMENT.md`
- Evidence snapshot: `docs/infra/MNT_DNS_DOMAIN_TOPOLOGY_2026-09-14.md`

## Context

The project previously delegated DNS for `moretegra.com.br` to Registro.br authoritative nameservers and used Green Sales/GDigital as the commercial production host.

The Product Authority initiated a controlled DNS migration to Cloudflare so DNS becomes an independent control plane while the commercial apex remains on Green Sales during the transition. In parallel, Vercel custom domains are being introduced on subdomains so routing and redirect behavior can be validated before any future apex-hosting decision.

This decision does **not** migrate the commercial apex to Vercel.

## Decision

Adopt the following target control-plane topology:

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
    `-- www.moretegra.com.br --> Vercel domain redirect --> lp.moretegra.com.br
```

For Vercel-facing web records, Cloudflare is configured as **DNS only**, not as HTTP reverse proxy/CDN.

Preserve:

```text
CLOUDFLARE_AUTHORITATIVE_DNS != CLOUDFLARE_HTTP_PROXY
DNS_ONLY != TRAFFIC_HAIRPIN_THROUGH_CLOUDFLARE
VERCEL_CUSTOM_DOMAIN != APEX_PRODUCTION_MIGRATION
DNS_CONFIGURED != DNS_PROPAGATION_VALIDATED
VERCEL_INVALID_CONFIGURATION_DURING_PROPAGATION != ROUTING_DESIGN_FAILURE
```

## Authoritative nameserver transition

Configured Cloudflare nameservers:

```text
sue.ns.cloudflare.com
woz.ns.cloudflare.com
```

The prior Registro.br authoritative nameservers observed before completion of the transition were:

```text
e.sec.dns.br
f.sec.dns.br
```

At the time this ADR candidate was created, the nameserver transition was still propagating. External end-to-end validation is therefore explicitly pending.

## Cloudflare DNS records — configured state

### Commercial apex retained on Green/GDigital

The apex remains configured with the existing A records:

```text
moretegra.com.br A 3.209.18.127
moretegra.com.br A 3.226.196.25
moretegra.com.br A 50.17.107.228
moretegra.com.br A 52.7.141.145
```

All are `DNS only`.

### Vercel custom domains

Configured CNAME target supplied by the live Vercel project UI:

```text
f5d81ddb66950472.vercel-dns-017.com
```

Configured records:

```text
lp.moretegra.com.br  CNAME  f5d81ddb66950472.vercel-dns-017.com
www.moretegra.com.br CNAME  f5d81ddb66950472.vercel-dns-017.com
```

Both are `DNS only` with automatic TTL.

### Existing verification record

The existing Google site-verification TXT record on the apex is preserved. This ADR does not change its value or ownership semantics.

## Vercel routing state

Configured in the MoreNumTegra Vercel project:

```text
morenumtegra.vercel.app = Production / Valid Configuration
lp.moretegra.com.br      = Production custom domain / pending DNS validation
www.moretegra.com.br     = 308 redirect to lp.moretegra.com.br / pending DNS validation
```

The current `308` from `www` to `lp` is a bounded routing validation state. It is **not** the final SEO canonical-host decision for the commercial site.

Before any indexable/final canonical configuration, the project must separately decide the final `www` redirect destination and validate path/query preservation plus HTTP response evidence.

## Cloudflare proxy policy

Default policy for Vercel-hosted surfaces under this ADR:

```text
CLOUDFLARE_PROXY = OFF
DNS_MODE = DNS_ONLY
VERCEL = WEB EDGE / CDN / TLS / HOSTING / PROJECT FIREWALL LAYER
CLOUDFLARE = AUTHORITATIVE DNS CONTROL PLANE
```

Reasoning:

- avoids two HTTP/CDN proxy layers by default;
- preserves direct Vercel edge behavior and observability;
- keeps DNS provider independent from application hosting;
- allows later Cloudflare proxy/WAF adoption only if a measured or security requirement justifies it.

Enabling Cloudflare proxy for Vercel-facing records requires a separate decision and validation gate.

## Relationship to Technical Baseline V2.2

This ADR creates a narrow, explicit exception to the V2.2 statement that custom-domain/DNS changes were not authorized by that baseline.

It does **not** supersede the current production semantics:

```text
GREEN_SALES = CURRENT_COMMERCIAL_APEX_PRODUCTION
VERCEL_PRODUCTION = HOMOLOGATION / CUSTOM-DOMAIN VALIDATION SURFACE
GITHUB_MAIN = CANONICAL PROJECT SOURCE
```

No apex move to Vercel is authorized by this ADR.

## Explicitly not authorized

This ADR does not authorize:

- replacing the apex Green/GDigital A records with Vercel records;
- removing Green Sales as current commercial production host;
- enabling Cloudflare proxy/orange-cloud for Vercel-facing records;
- changing MX, SPF, DKIM or DMARC;
- changing the Google verification TXT record;
- changing Search Console property ownership or canonical settings;
- changing GA4/GTM configuration;
- changing Vercel automatic/manual deployment policy from ADR-002;
- treating `www -> lp` as the final SEO redirect architecture;
- publishing a new indexable host without Search/SEO validation.

## Validation gate

This DNS/domain transition is considered externally validated only when all applicable checks pass:

1. public NS resolution returns `sue.ns.cloudflare.com` and `woz.ns.cloudflare.com`;
2. public DNS resolves both Vercel CNAMEs to the Vercel-supplied target;
3. Vercel reports `Valid Configuration` for `lp.moretegra.com.br`;
4. Vercel reports `Valid Configuration` for `www.moretegra.com.br`;
5. HTTPS works on `lp.moretegra.com.br`;
6. `www.moretegra.com.br` returns the configured `308` with the expected `Location`;
7. path/query behavior is tested before the redirect is relied on for SEO;
8. `moretegra.com.br` continues serving the current Green commercial production during this bounded transition.

Until these checks are evidenced:

```text
CONFIGURED = YES
PROPAGATION = PENDING
END_TO_END_VALIDATED = NO
```

## Future decision boundary

A future apex migration may evaluate:

```text
Registro.br
-> Cloudflare authoritative DNS
-> DNS-only
-> Vercel
```

Keeping Cloudflare as authoritative DNS while Vercel provides web edge/security/hosting is the preferred evaluation baseline, but the apex migration itself remains separately gated.
