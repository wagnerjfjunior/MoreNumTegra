# MNT — `lp.moretegra.com.br` GTM Delta Runbook — 2026-09-14

- Container: `GTM-PGCR4R47`
- Accepted published baseline before this delta: `Version 7`
- GA4 destination: `G-57M2XR0CY2`
- Code-side GTM bootstrap: installed by the Vercel runtime parity PR
- Google-side mutation: must be performed/published by Product Authority or an authorized GTM operator
- Goal: add `lp.moretegra.com.br` without changing event semantics, GA4 destination or conversion roles

## 1. Host allowlist

Use this exact host regex anywhere the current Version 7 configuration says `Page Hostname equals moretegra.com.br`:

```regex
^(moretegra\.com\.br|lp\.moretegra\.com\.br)$
```

Do **not** add `www.moretegra.com.br`, `morenumtegra.vercel.app` or wildcard `*.vercel.app`.

### Google Tag initialization trigger

Current logical trigger:

```text
INIT - MoreNumTegra - Canonical Host
Type: Initialization
Page Hostname equals moretegra.com.br
```

Change to:

```text
Name recommendation: INIT - MoreNumTegra - Eligible Hosts
Type: Initialization
Page Hostname matches RegEx ^(moretegra\.com\.br|lp\.moretegra\.com\.br)$
```

Keep the Google Tag unchanged:

```text
GA4 - Google Tag - MoreNumTegra
Tag ID = G-57M2XR0CY2
send_page_view = false
```

## 2. Existing canonical event triggers

For every existing Version 7 trigger below, replace only the hostname condition with the same exact regex. Do not change Custom Event names or GA4 mappings.

```text
CE - mnt_page_view
CE - mnt_section_click
CE - mnt_catalog_filter
CE - mnt_catalog_search
CE - mnt_intent
CE - mnt_form_start
CE - mnt_form_submit_attempt
CE - mnt_lead_success
```

For `CE - mnt_lead_success`, preserve the thank-you route condition:

```text
Custom Event equals mnt_lead_success
Page Hostname matches RegEx ^(moretegra\.com\.br|lp\.moretegra\.com\.br)$
Page Path equals /obrigado
```

## 3. Consent Mode for Vercel

Keep the accepted default-denied tag unchanged:

```text
CONSENT - Default Denied - All Pages
```

Create two Custom Event triggers:

```text
CE - mnt_consent_accept
Custom Event equals mnt_consent_accept

CE - mnt_consent_reject
Custom Event equals mnt_consent_reject
```

Reuse the existing consent-update tags rather than creating duplicate consent logic:

```text
CONSENT - Grant - Continuar
+ add firing trigger: CE - mnt_consent_accept

CONSENT - Deny - Cancelar
+ add firing trigger: CE - mnt_consent_reject
```

Keep the existing Green click triggers on those tags. This preserves Green behavior while adding the Vercel project-owned consent UI.

The Vercel home and thank-you pages re-emit the stored accepted/denied choice on each document load so the default-denied state can be updated consistently after navigation.

## 4. Tags that do not change

Do not create duplicates and do not alter event names/parameters for:

```text
GA4 - Event - page_view <- mnt_page_view
GA4 - Event - mnt_section_click
GA4 - Event - mnt_catalog_filter
GA4 - Event - mnt_catalog_search
GA4 - Event - mnt_intent
GA4 - Event - mnt_form_start
GA4 - Event - mnt_form_submit_attempt
GA4 - Event - generate_lead - mnt_lead_success
```

`generate_lead` remains the only primary lead destination event. `mnt_form_start` and `mnt_form_submit_attempt` remain non-conversions.

No new Data Layer Variable is required for hostname differentiation because GA4 already receives normal page context and the project does not need a new business-event parameter to distinguish the host.

## 5. Configuration that must remain unchanged

```text
GTM container = GTM-PGCR4R47
GA4 Measurement ID = G-57M2XR0CY2
send_page_view = false
Enhanced Measurement = OFF
single project-owned page_view path = preserved
no direct project gtag()
no second GTM container
no second GA4 property/stream
no visitor PII in Data Layer/GA4
no raw catalog search text
no Google Ads/Meta change in this delta
```

## 6. Preview / publish QA

Before Submit/Publish in GTM Preview / Tag Assistant on `https://lp.moretegra.com.br/`, verify:

1. container `GTM-PGCR4R47` connects;
2. default consent is denied for `ad_storage`, `analytics_storage`, `ad_user_data`, `ad_personalization` before choice;
3. Vercel `Aceitar` imits `mnt_consent_accept` and all four become granted;
4. Vercel `Recusar` emits `mnt_consent_reject` and all four remain/become denied;
5. reload preserves the chosen state and re-applies it;
6. one source `mnt_page_view` produces one GA4 `page_view` when eligible under the accepted consent behavior;
7. filters/search/section/intents produce only their matching GA4 event tag;
8. Form 46 focus produces one `mnt_form_start` per document/form;
9. submit click produces one `mnt_form_submit_attempt`;
10. successful Green Form 46 response -> `/obrigado` -> exactly one `mnt_lead_success` -> exactly one `generate_lead`;
11. refresh/back on `/obrigado` does not create another lead conversion;
12. no `mnt_*` business events fire on arbitrary `*.vercel.app` branch previews;
13. no visitor name/e-mail/telephone/free text appears in `dataLayer` or GA4 event parameters.

After those checks, publish a new GTM version with a name similar to:

```text
MNT - Vercel lp runtime parity - 2026-09-14
```

Record the actual published version number and timestamp as evidence; do not predict the version number before publication.
