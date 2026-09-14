# MoreNumTegra — Vercel LP Runtime Parity Closure

Date: 2026-09-14

## Scope

This closure records the authorized, bounded intervention that made `https://lp.moretegra.com.br` a functional Vercel runtime parity surface while leaving Green production unchanged.

Authoritative implementation PR: #75 — `feat: Vercel Form 46 + Measurement runtime parity`

Merged commit: `d81ac7f4fbcca67ce83fb4dd03744947b7d8c7f5`

Governing ADR: `docs/adr/ADR-005-VERCEL-RUNTIME-PARITY-FORM46-MEASUREMENT.md`

## Implemented runtime

`lp.moretegra.com.br` now includes:

- project-owned Form 46 runtime using the proven Green contract;
- `tenant_id=313`;
- `form_id=46`;
- `POST https://back.gdigital.com.br/form/register`;
- country selector with flag/country code derived internally;
- E.164 phone normalization;
- validation, loading, anti-double-submit, timeout, retry and honeypot;
- submission enabled only on the stable `lp.moretegra.com.br` hostname;
- same-host `/obrigado` conversion flow;
- GTM container `GTM-PGCR4R47` installed on home and thank-you;
- GA4 Measurement ID `G-57M2XR0CY2` preserved;
- existing `mnt_*` taxonomy preserved;
- project-owned consent UI for the Vercel surface;
- no project PII in Measurement payloads.

Green production was not modified by this intervention. The native Green Form 46 remains the Green production capture mechanism.

## Measurement QA evidence

Tag Assistant exports reviewed on 2026-09-14 established the following:

- default Consent Mode: `denied` for `ad_storage`, `analytics_storage`, `ad_user_data`, `ad_personalization`;
- `mnt_consent_accept` fires the existing `CONSENT - Grant - Continuar` tag and produces explicit `gtag.consent.update` to `granted` for all four states;
- `mnt_consent_reject` fires the existing `CONSENT - Deny - Cancelar` tag and produces explicit `gtag.consent.update` to `denied` for all four states;
- hostname allowlist accepts `moretegra.com.br` and `lp.moretegra.com.br`;
- `CE - mnt_lead_success` uses `Page Path matches RegEx ^/obrigado/?$`;
- `mnt_lead_success` fires once after the governed successful-form marker and maps to GA4 `generate_lead`;
- Form 46 metadata remains `form_provider=green`, `form_id=46`, `form_name=MoreEmUmTegra`, `lead_method=green_form_46`;
- direct `/obrigado` navigation without the fresh success marker does not constitute the Vercel lead-success gate.

## GTM publication

The Product Authority confirmed in-chat on 2026-09-14 that the validated GTM changes were published after the accept/reject QA.

This publication confirmation is `USER_REPORTED` for repository evidence purposes because the exact resulting GTM version number was not provided or independently resolved through a GTM administrative connector. Do not invent a version number.

Preserve:

```text
GTM container = GTM-PGCR4R47
GA4 measurement ID = G-57M2XR0CY2
send_page_view = false
single browser dispatcher = GTM
no second GA4 property/stream for lp
no project-owned direct gtag() parallel path
```

## Closure result

```text
PR75_MERGED = PASS
LP_FORM46_RUNTIME = PASS
GREEN_PRODUCTION_MUTATION = NO
GTM_SNIPPET_INSTALLED = PASS
HOSTNAME_PARITY = PASS
CONSENT_DEFAULT_DENIED = PASS
CONSENT_ACCEPT_GRANT = PASS
CONSENT_REJECT_DENY = PASS
LEAD_SUCCESS_GATE = PASS
GENERATE_LEAD_MAPPING = PASS
PII_IN_MEASUREMENT = NO
GTM_PUBLICATION = PRODUCT_AUTHORITY_CONFIRMED / VERSION_NUMBER_NOT_RECORDED
RUNTIME_PARITY_INTERVENTION = CLOSED
```

This closure does not advance MNT-M4 program hours and does not authorize M4-06, apex migration, Search Console mutation, Ads, Meta/CAPI, FECH.AI/n8n/Make, or replacement of the native Green Form 46.
