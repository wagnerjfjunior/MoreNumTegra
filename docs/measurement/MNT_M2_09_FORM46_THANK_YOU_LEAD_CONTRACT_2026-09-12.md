# MNT-M2-09 — Form 46 / página de obrigado / Lead contract

Date: 2026-09-12
Status: `IMPLEMENTATION_CANDIDATE / PR #50 / NOT YET GREEN-PUBLISHED`

## Product Authority decision

The Product Authority selected the simplest safe V1 implementation:

```text
native Form 46 submit initiation
-> sessionStorage timestamp only
-> Green native success redirect to /obrigado
-> fresh pending timestamp is consumed
-> mnt_lead_success once
-> GTM maps source event to GA4 generate_lead
```

No webhook, backend, Stape dependency, n8n/Make, custom `fetch`, persisted event identity or lead token is required for this V1 flow.

## Green topology supplied by Product Authority

- page `292` = `https://moretegra.com.br/` — commercial home / Form 46;
- page `293` = `www.moretegra.com.br` redirect surface to page 292;
- page `294` = dedicated thank-you page, target route `https://moretegra.com.br/obrigado`.

Green may append query parameters such as `l_` and `p_id`. They are not used to define a MoreNumTegra lead.

## RESF principles preserved

This simplified implementation keeps the important RESF/Capri invariants while removing unnecessary historical mechanics:

- a real native Form 46 submit initiation must occur before a browser lead can be accepted;
- direct thank-you access must not manufacture a lead;
- refresh/back must not create another lead;
- stale state must not create a lead;
- visitor PII must not enter ordinary project Measurement;
- source-event semantics remain separate from vendor destination event names.

Historical `lead_token`, persisted logical-lead `event_id`, server deduplication and server-side dispatch are deliberately not implemented in this V1 slice because no current destination requires them.

## Source lifecycle

```text
first genuine Form 46 interaction
-> mnt_form_start

native Form 46 submit initiation
-> mnt_form_submit_attempt
-> sessionStorage["mnt.lead.pending.v1"] = Date.now()

Green successful navigation to /obrigado
+ timestamp exists
+ timestamp age <= 10 minutes
-> delete pending timestamp
-> mnt_lead_success
```

`mnt_form_start` and `mnt_form_submit_attempt` remain intent/non-conversion events.

## Lead-state contract

The entire browser lead state is:

```text
key   = mnt.lead.pending.v1
value = submit timestamp in milliseconds
scope = sessionStorage / same browser tab session
TTL   = 10 minutes
```

No JSON object is stored. No `lead_token`, visitor identifier, email, phone, name, project value or form content is stored by the guard.

The thank-you page consumes the pending timestamp before pushing `mnt_lead_success`. Therefore:

```text
DIRECT /obrigado ACCESS -> NOT LEAD
THANK-YOU REFRESH -> NOT SECOND LEAD
BACK/FORWARD WITHOUT NEW SUBMIT -> NOT SECOND LEAD
STALE PENDING TIMESTAMP -> NOT LEAD
l_ OR p_id ALONE -> NOT LEAD
```

## Canonical source-event envelope

MNT-M2-03 requires every project semantic event to carry `mnt_event_id`. That requirement is preserved, but it is **not part of the lead-state mechanism**.

For `mnt_lead_success`, the thank-you runtime generates a normal per-occurrence `mnt_event_id` only at event emission time.

```text
event = mnt_lead_success
mnt_event_id = generated at emission
mnt_event_version = 1
page_identity = moretegra_thank_you
product_identity = moretegra_portfolio
route = /obrigado
funnel_stage = lead
form_provider = green
form_id = 46
form_name = MoreEmUmTegra
lead_method = green_form_46
placement = form_46
```

No `lead_token` exists in this V1 implementation.

The `/obrigado` route and `moretegra_thank_you` page identity are an additive route-specific implementation detail authorized by the Product Authority decision to create page 294.

## GA4 destination mapping

The vendor destination should use Google's recommended lead-generation semantic event rather than reusing the project source-event name:

```text
source event = mnt_lead_success
GA4 event_name = generate_lead
```

The V1 destination does not need `lead_token`, PII or a persisted cross-platform deduplication identifier.

`mnt_event_id` may remain available in the source data layer for project correlation/QA because it is part of the canonical MNT envelope; it does not need to be registered as a GA4 custom dimension.

## Thank-you page sources

Green page 294 uses:

- `src-greenn/thank-you/obrigado.html`
- `src-greenn/thank-you/obrigado.css`
- `src-greenn/thank-you/obrigado.js`

The page is mobile-first, uses the governed Tegra identity and applies `noindex,nofollow`. The JavaScript replaces cloned-home metadata and removes cloned canonical links if present.

Direct `/obrigado` access uses neutral UX text and does not claim that Green received a submission. A valid fresh pending timestamp changes the visible state to `SOLICITAÇÃO RECEBIDA`.

## Required Green configuration before final validation

The native Form 46 success destination must be configured in Green to page 294 / `/obrigado` using Green's supported native success-navigation mechanism.

Do not:

- intercept or replace the native Green submit;
- create a second custom POST/fetch;
- use `l_` or `p_id` as the conversion gate;
- send visitor PII to ordinary Measurement.

## Final validation gate

Before publishing the GA4 `generate_lead` tag:

1. valid Form 46 submission creates a lead in Green;
2. successful flow lands on `/obrigado`;
3. `mnt_form_start` occurs at most once per form/document instance;
4. `mnt_form_submit_attempt` occurs on native submit initiation;
5. `/obrigado` emits exactly one `mnt_lead_success` for the fresh pending journey;
6. direct `/obrigado` emits no `mnt_lead_success`;
7. refresh/back emits no duplicate `mnt_lead_success`;
8. an expired pending timestamp emits no lead;
9. no MNT payload contains visitor name, email or phone;
10. after that proof, configure GTM `mnt_lead_success -> GA4 generate_lead` and validate one real GA4 hit.
