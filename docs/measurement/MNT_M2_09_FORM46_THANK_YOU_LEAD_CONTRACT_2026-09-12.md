# MNT-M2-09 — Form 46 / página de obrigado / Lead contract

Date: 2026-09-12
Status: `IMPLEMENTATION_CANDIDATE / PR #50 / NOT YET GREEN-PUBLISHED`

## Product Authority decision

The Form 46 success architecture uses a dedicated thank-you route instead of treating Green query parameters on the home page as the lead definition.

User-supplied Green page topology:

- page `292` = `https://moretegra.com.br/` — commercial home / Form 46;
- page `293` = `www.moretegra.com.br` redirect surface to page 292;
- page `294` = dedicated thank-you page, target route `https://moretegra.com.br/obrigado`.

The thank-you route may receive Green query parameters such as `l_` and `p_id`. Those values are not the MoreNumTegra business definition of a lead and are not required as analytics parameters.

## RESF / Capri evidence consumed

The recovered Capri/Cyrela tracking model documented the following lead controls:

- a real user action is required;
- direct thank-you access must not manufacture a lead;
- one logical lead has one `event_id`;
- a separate opaque `lead_token` can prove the armed lead journey;
- pending state + submit timestamp + freshness + anti-repeat state guard the thank-you route;
- historical GA4 mapping used event name `lead` with `event_id` and `lead_token`;
- browser/server deduplication, when enabled, must reuse the same `event_id` rather than generate a new one.

The RESF Form/CRM contract also states that a thank-you page alone does not define a lead.

This contract adopts those semantics, not the historical `jcy_*` names or Cyrela-specific implementation details.

## MoreNumTegra source lifecycle

```text
first genuine Form 46 interaction
-> mnt_form_start

native Form 46 submit initiation
-> mnt_form_submit_attempt
-> arm opaque journey state

Green successful navigation to /obrigado
+ fresh armed journey
+ not already consumed
-> mnt_lead_success
```

`mnt_form_start` and `mnt_form_submit_attempt` remain intent events, never conversions.

## Armed journey state

The main-page source stores only opaque technical state in same-tab `sessionStorage`:

```text
event_id
lead_token
submitted_at
```

No name, email, phone, form value or raw user-entered content is read or persisted by this project lead-state layer.

The thank-you gate accepts a journey only when:

```text
hostname = moretegra.com.br
pathname = /obrigado
armed journey exists
event_id is syntactically valid
lead_token is syntactically valid
submitted_at age <= 10 minutes
same event_id has not already been sent
```

Before the valid lead source event is pushed, the armed journey is atomically consumed as far as browser storage permits: the event_id is marked sent for the current session and the pending journey is removed. This favors duplicate prevention over manufacturing a second lead on refresh/back.

Therefore:

```text
DIRECT /obrigado ACCESS -> NOT LEAD
THANK-YOU REFRESH -> NOT SECOND LEAD
BACK/FORWARD WITHOUT NEW SUBMIT -> NOT SECOND LEAD
STALE ARMED STATE -> NOT LEAD
l_ OR p_id ALONE -> NOT LEAD
```

## Source event and destination mapping

Project-owned source event remains:

```text
mnt_lead_success
```

The source carries the normal MoreNumTegra semantic envelope and reuses the armed logical lead identity:

```text
mnt_event_id = armed event_id
mnt_event_version = 1
page_identity = moretegra_thank_you
product_identity = moretegra_portfolio
route = /obrigado
funnel_stage = lead
lead_token = opaque journey token
```

Controlled Form 46 context may remain in the source payload for project semantics, but ordinary visitor PII is forbidden.

GA4 destination mapping should follow the RESF/Capri lead convention rather than using the project source event name as the vendor event name:

```text
source event: mnt_lead_success
GA4 event_name: lead
GA4 event_id: {{mnt_event_id}}
GA4 lead_token: {{lead_token}}
```

`event_id` and `lead_token` are correlation/QA fields, not reporting dimensions to register as normal high-cardinality custom dimensions.

Meta / CAPI / Google Ads are outside this bounded implementation. If later authorized, the same logical lead `event_id` must be preserved where browser/server deduplication applies.

## Thank-you page sources

Green page 294 uses:

- `src-greenn/thank-you/obrigado.html`
- `src-greenn/thank-you/obrigado.css`
- `src-greenn/thank-you/obrigado.js`

The page is designed as mobile-first and `noindex,nofollow`. The JavaScript also replaces cloned-home metadata and removes a cloned canonical link if present.

## Required Green configuration before validation

The native Form 46 success destination must be configured by the Product Authority in Green to page 294 / `/obrigado` using Green's supported success-navigation mechanism. Do not replace the native form submission with project `fetch()` logic.

## Validation gate

Before any GA4 lead tag is published:

1. valid Form 46 submission creates a lead in Green;
2. successful flow lands on `/obrigado`;
3. Tag Assistant shows one `mnt_form_start` at most;
4. Tag Assistant shows `mnt_form_submit_attempt` before the outcome;
5. `/obrigado` emits exactly one `mnt_lead_success` for the armed successful journey;
6. direct `/obrigado` access emits no lead;
7. refresh/back emits no duplicate lead;
8. no MNT event payload contains visitor name, email or phone;
9. only after this proof, map `mnt_lead_success` to GA4 `lead` with the approved RESF-derived parameters.
