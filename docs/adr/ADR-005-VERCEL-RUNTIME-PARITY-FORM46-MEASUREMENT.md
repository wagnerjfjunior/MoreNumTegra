# ADR-005 — Vercel Runtime Parity: Form 46 + Measurement

- Status: ACCEPTED_FOR_SCOPED_IMPLEMENTATION
- Date: 2026-09-14
- Repository: `wagnerjfjunior/MoreNumTegra`
- Authorized scope: `lp.moretegra.com.br`
- Green mutation: NONE

## Decision

Product Authority explicitly authorizes the stable Vercel homologation host `lp.moretegra.com.br` to reproduce the MoreNumTegra lead and Measurement runtime without changing Green production.

Green remains unchanged and continues to use its native Form 46. The Vercel surface uses a project-owned Form 46 client that submits to the observed Green contract:

```text
provider = Green Sales / GDigital
tenant_id = 313
form_id = 46
title = MoreEmUmTegra
POST = https://back.gdigital.com.br/form/register
required = nome, email, telefone
optional = texto-livre
```

Vercel uses native `fetch` + `FormData`, scopes all selectors to its own form, normalizes the submitted telephone to E.164, defaults country/DDI to Brazil +55, and provides validation, loading, double-submit prevention, success/error handling and same-host `/obrigado` redirect.

Real submission is enabled only on `lp.moretegra.com.br`. Arbitrary `*.vercel.app` branch previews keep the form visible but non-sending.

## Measurement

Vercel installs the same sole project browser dispatcher:

```text
GTM = GTM-PGCR4R47
GA4 property = 553742649
GA4 stream = 15759638334
GA4 Measurement ID = G-57M2XR0CY2
```

No second GTM container, GA4 property/stream, or direct project `gtag()` path is authorized.

The Vercel adapter preserves the accepted source taxonomy:

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

`mnt_lead_success` remains the only primary lead source event. Form start and submit attempt remain non-conversions. Visitor name, e-mail, telephone and free-form text must never be copied into `dataLayer` or GA4.

Because Green's LGPD modal is absent on Vercel, `lp` owns a small first-party consent UI that emits only `mnt_consent_accept` and `mnt_consent_reject`. GTM remains responsible for applying Consent Mode updates; default denied behavior remains the baseline.

## Lead-success gate

On Vercel, `mnt.lead.pending.v1` is written only after an HTTP-successful Form 46 response. `/obrigado` consumes the fresh marker once (max age 10 minutes) before emitting `mnt_lead_success`. This remains a client-side V1 heuristic, not provider-authenticated proof.

## Supersession boundary

This ADR supersedes ADR-001 and older baseline statements only where they say Vercel must use a non-sending Form 46 mock, must never transmit Form 46 PII, or cannot be an eligible project Measurement surface.

It does **not** supersede Green native Form 46 production, the no-PII Measurement rule, single-dispatcher architecture, Green modular publication contract, or separate gates for apex migration, Meta/CAPI, Ads, Search Console, FECH.AI/n8n/Make.

## GTM owner action

The repository installs `GTM-PGCR4R47`, but the accepted published GTM Version 7 gates business tags to `moretegra.com.br`. Product Authority must apply the exact delta in `docs/measurement/MNT_VERCEL_LP_GTM_DELTA_RUNBOOK_2026-09-14.md` before claiming GA4 parity complete.
