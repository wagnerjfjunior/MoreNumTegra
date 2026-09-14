# MoreNumTegra — DNS / Domain Topology Evidence — 2026-09-14

- Status: `FINAL_TOPOLOGY_VALIDATED / CLOSED`
- Project: `MoreNumTegra`
- Repository: `wagnerjfjunior/MoreNumTegra`
- Final production decision: `docs/adr/ADR-006-VERCEL-COMMERCIAL-PRODUCTION-WWW-CANONICAL.md`
- Closeout evidence: `docs/infra/MNT_VERCEL_WWW_COMMERCIAL_CUTOVER_CLOSEOUT_2026-09-14.md`

## 1. Authoritative DNS

Public ICANN evidence established:

```text
moretegra.com.br
status = active
nameservers:
sue.ns.cloudflare.com
woz.ns.cloudflare.com
```

Cloudflare remains the authoritative DNS provider. HTTP proxy/orange-cloud is not part of the accepted architecture; relevant web records remain DNS only.

## 2. Final accepted routing

```text
Registro.br
-> Cloudflare authoritative DNS / DNS only
   -> moretegra.com.br -> Vercel -> HTTP 308 -> www.moretegra.com.br
   -> www.moretegra.com.br -> Vercel Production
   -> lp.moretegra.com.br -> Green/GDigital legacy/fallback
```

The apex uses a CNAME to the exact Vercel target shown by Vercel. Cloudflare performs CNAME flattening automatically at the zone apex; there is no separate per-record flattening switch for the apex.

The existing Google site-verification TXT is preserved.

## 3. Vercel state

Observed production intent/state:

| Domain | Accepted role |
|---|---|
| `www.moretegra.com.br` | canonical commercial Vercel Production host |
| `moretegra.com.br` | permanent 308 redirect to `www.moretegra.com.br` |
| `morenumtegra.vercel.app` / previews | non-canonical Vercel surfaces, `noindex,nofollow` |

Exact Vercel DNS target used during the cutover:

```text
f5d81ddb66950472.vercel-dns-017.com
```

## 4. Green fallback

`lp.moretegra.com.br` is no longer the Vercel canonical/production host. It was moved back to Green/GDigital as a legacy/fallback surface.

Green remains operationally relevant as the Form 46 provider/CRM even though the commercial web frontend is now Vercel.

## 5. HTTP / canonical validation

The transition validation first proved Vercel redirect/path/query behavior on `www -> lp`. The final cutover then inverted the roles and established the production policy:

```text
https://moretegra.com.br/<path>?<query>
-> 308
-> https://www.moretegra.com.br/<path>?<query>
```

`https://www.moretegra.com.br/` subsequently returned `200` from Vercel in supplied Pingdom HAR evidence.

Google Search Console live inspection on 2026-09-14 established:

```text
www URL indexed = YES
crawl allowed = YES
indexing allowed = YES
declared canonical = https://www.moretegra.com.br/
Google-selected canonical = inspected www URL
```

## 6. Search discovery files

PR #81 deployed:

- `https://www.moretegra.com.br/sitemap.xml`;
- `https://www.moretegra.com.br/robots.txt`.

The sitemap starts with only the live canonical homepage. Planned project/stage/location/blog routes are excluded until actually published and indexable.

## 7. Deployment policy

Vercel deployment remains governed by ADR-004:

```text
AUTO_GIT_PREVIEW = VALIDATED
DOCS_ONLY_FILTER = VALIDATED
AUTO_GIT_PRODUCTION_AFTER_MAIN_MERGE = VALIDATED
GIT_DRIVEN_END_TO_END = VALIDATED
MANUAL_DEPLOY_HOOK = FALLBACK_ONLY
```

## 8. Final adjudication

```text
CLOUDFLARE_NS_DELEGATION = VALIDATED
CLOUDFLARE_DNS_ONLY = VALIDATED
APEX_CNAME_FLATTENING = ACTIVE_BY_CLOUDFLARE_APEX_RULE
APEX_TO_VERCEL = VALIDATED
WWW_TO_VERCEL = VALIDATED
APEX_308_TO_WWW = VALIDATED
PATH_QUERY_PRESERVATION = VALIDATED
WWW_HTTPS_200 = VALIDATED
WWW_GOOGLE_INDEXED = VALIDATED
GOOGLE_CANONICAL_WWW = VALIDATED
LP_GREEN_FALLBACK = VALIDATED_AS_NON_CANONICAL_ROLE
DNS_DOMAIN_CUTOVER = CLOSED
```

## 9. Boundaries

This closure does not authorize:

- Cloudflare HTTP proxy/orange-cloud;
- new DNS/domain changes without gate;
- MX/SPF/DKIM/DMARC mutation;
- Meta/CAPI or Ads/spend;
- FECH.AI/n8n/Make;
- replacement of Green Form 46;
- ungoverned route publication;
- treating Rich Results/JSON-LD as part of this DNS cutover acceptance.
