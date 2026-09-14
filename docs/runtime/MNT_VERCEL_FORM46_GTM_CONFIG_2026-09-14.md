# MoreNumTegra — Vercel Form 46 + GTM Canonical Runtime Config

- Date: `2026-09-14`
- Source class: Product Authority-supplied Green embed + GTM snippet
- Scope: `lp.moretegra.com.br`
- Green mutation by this package: `NONE`

## Form 46

```text
provider = Green Sales / GDigital
tenant_id = 313
form_id = 46
title = MoreEmUmTegra
endpoint = https://back.gdigital.com.br/form/register
method = POST
payload = multipart/form-data / FormData
```

Required lead fields:

```text
nome
email
telefone
```

Optional lead field:

```text
texto-livre
```

Vercel runtime rule:

```text
country selector displays flag + country + dial code
Brazil selected by default = +55
visitor does not type DDI separately
visible telephone = user-friendly national formatting
submitted telephone = selected country dial code + national number normalized to E.164
real submit host = lp.moretegra.com.br only
```

Example:

```text
selected country = 🇧🇷 Brasil (+55)
visible phone = (11) 98585-8585
submitted telefone = +5511985858585
```

No Axios dependency is required in the Vercel implementation. The Product Authority-supplied Green embed uses Axios, but the actual transport contract is a normal FormData POST and the Vercel implementation uses native `fetch`.

## GTM

```text
container_id = GTM-PGCR4R47
sole_project_browser_dispatcher = YES
```

The official container bootstrap is installed in the Vercel home and `/obrigado` documents, including the `<noscript>` iframe.

## GA4

```text
property_name = MoreNumTegra
property_id = 553742649
stream_id = 15759638334
measurement_id = G-57M2XR0CY2
Enhanced Measurement = OFF
```

No second property, stream or Measurement ID is created by the Vercel parity work.

## Canonical source events retained

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

Consent control events added for Vercel UI:

```text
mnt_consent_accept
mnt_consent_reject
```

These two events are control signals for GTM Consent Mode and are not GA4 business events.

## Privacy boundary

Forbidden in `dataLayer` / GA4:

```text
visitor name
visitor email
visitor phone
raw optional/free-form lead text
raw catalog search text
```

The only session marker used for lead-success gating is a short-lived timestamp; it contains no PII.
