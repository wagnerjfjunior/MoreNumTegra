# MNT-M2-09 — Fast finalization runbook

Date: 2026-09-12
Status: `EXECUTION RUNBOOK / PR #50 DRAFT`

## Goal

Close the remaining Form 46 measurement path with the simplest V1 architecture approved by Product Authority.

## Target flow

```text
Form 46 native submit
-> mnt_form_submit_attempt
-> sessionStorage timestamp only
-> Green registers lead
-> Green redirects to /obrigado
-> fresh timestamp consumed
-> mnt_lead_success
-> GTM maps to GA4 generate_lead
```

No webhook, backend, Stape dependency, n8n/Make, custom form POST, lead token or persisted lead event identity.

## Step 1 — Green page 294

Target public route:

`https://moretegra.com.br/obrigado`

Replace cloned-home content for page 294 with the branch artifacts:

- HTML: `src-greenn/thank-you/obrigado.html`
- CSS: `src-greenn/thank-you/obrigado.css`
- JavaScript: `src-greenn/thank-you/obrigado.js`

Expected direct-access state:

- title/copy is neutral: `Obrigado pelo seu interesse.`
- no claim that a form submission was received;
- no `mnt_lead_success` without a fresh pending Form 46 timestamp;
- robots = `noindex,nofollow`;
- cloned home canonical removed by page JavaScript.

## Step 2 — Green Form 46 success destination

In the native Form 46 configuration, set the successful submission destination to page 294 / `/obrigado` using Green's native success-navigation setting.

Do not replace or intercept native submission.

If Green appends query parameters such as `l_` or `p_id`, leave them untouched. MoreNumTegra does not use them as the lead gate.

## Step 3 — Main-page JavaScript

The release candidate must contain, in order:

```text
accepted UI runtime
+ src-greenn/modules/moretegra.measurement.js
+ src-greenn/modules/moretegra.lead-journey.js
```

Generate and verify with:

```bash
node scripts/build-moretegra-release.mjs
node scripts/verify-moretegra-release.mjs
node --check src-greenn/moretegra.js
```

Only the resulting `src-greenn/moretegra.js` is copied to the Green main-page JavaScript field.

## Step 4 — Runtime QA before GA4 Lead tag

Use Tag Assistant on one real Form 46 submission.

Required order:

```text
mnt_form_start
mnt_form_submit_attempt
navigation to /obrigado
mnt_lead_success
```

Required lead payload:

```text
event = mnt_lead_success
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

`mnt_event_id` is the standard per-occurrence MNT envelope field. It is generated at emission and is not stored as lead state.

Must not appear:

- visitor name;
- email;
- phone;
- raw form values;
- `lead_token`.

Negative tests:

1. open `/obrigado` directly -> no `mnt_lead_success`;
2. refresh `/obrigado` after successful flow -> no second `mnt_lead_success`;
3. back/forward without a new submit -> no second lead;
4. stale timestamp older than 10 minutes -> no lead.

## Step 5 — GTM destination

Only after Step 4 passes, create/configure one GA4 Event tag:

```text
Trigger custom event: mnt_lead_success
GA4 event name: generate_lead
Destination: G-57M2XR0CY2
```

Do not send visitor PII, property price or conversion value.

Use the same Google consent behavior already validated in GTM Version 6: Google built-in consent checks, with no additional GTM consent condition.

Preview first. Confirm exactly one GA4 `generate_lead` hit for one valid Form 46 lead.

## Step 6 — Publication gate

After runtime QA passes:

1. publish the GTM version containing only the approved `generate_lead` delta;
2. record published GTM version/evidence in PR #50;
3. run one production smoke;
4. review exact PR head;
5. request explicit Product Authority `Ready + merge` authorization.

Do not merge PR #50 merely because this runbook exists.
