# Handoff Atual — MoreNumTegra

> Handoff SFJM de continuidade cognitiva para retomar o projeto em nova conversa sem regressão. Este arquivo está no working branch de `MNT-M2-09`; `main` continua canônico até merge.

## 0. Identidade e live state resolvido

- Projeto: `MoreNumTegra`
- Repositório: `wagnerjfjunior/MoreNumTegra`
- Branch canônica: `main`
- `main` observado em `2026-09-12`: `98f92ea3e80770a0e735ee9b105a29b18a706255`
- Working PR: `#50 — feat: start MNT-M2-09 tracking implementation`
- Working branch: `feat/mnt-m2-09-tracking-implementation`
- PR #50 antes deste handoff: `OPEN / DRAFT / NOT_MERGED / MERGEABLE`
- PR #50 previous exact head: `0874ee5ae2f31c4a2a5dc285695f9eb67e7282f3`
- Produção comercial: `https://moretegra.com.br/`
- Homologação Vercel: `https://morenumtegra.vercel.app/`

Preservar:

```text
MORENUMTEGRA MAIN = PROJECT TRUTH
PR BRANCH = ACTIVE WORKING STATE / PROPOSAL UNTIL MERGE
GREEN COMMERCIAL PRODUCTION != MAIN
MAIN MERGED != GREEN PUBLISHED
WBS PLANNED != AUTHORIZED
PROGRAM PROGRESS != V1 PRODUCT READINESS
```

## 1. Prioridade operacional vigente

Product-first.

```text
produto primeiro
→ evidência mínima suficiente
→ documentação somente do que precisa ficar rastreável
→ próximo incremento de produto
```

Não abrir nova frente documental/auditoria/WBS enquanto existir incremento de produto claramente executável, salvo exigência de segurança, autorização ou preservação de estado.

A PR #51 de decomposição WBS deve permanecer congelada/Draft até o Product Authority voltar explicitamente a essa frente.

## 2. MNT-M2-09 — estado real de trabalho

MNT-M2-09 está em implementação pela PR #50.

GA4 já provado/adotado:

```text
property = MoreNumTegra
property_id = 553742649
stream_id = 15759638334
measurement_id = G-57M2XR0CY2
production_host = moretegra.com.br
Enhanced Measurement = OFF
```

GTM:

```text
container = GTM-PGCR4R47
published version = 5 — MNT M2-09 - Measurement v3 - 2026-09-11
send_page_view = false
source mnt_page_view -> explicit GA4 page_view
workspace after publication = 0 pending changes
```

Source implementation currently covers:

```text
mnt_page_view
mnt_section_click
mnt_catalog_filter
mnt_catalog_search
mnt_intent
```

Not yet implemented:

```text
mnt_form_start
mnt_form_submit_attempt
mnt_lead_success
```

## 3. Green production — v4 runtime updated and validated

On `2026-09-12`, Product Authority manually updated the Green page-level JavaScript with the current PR `src-greenn/moretegra.js` v4 candidate.

Runtime hygiene checks supplied by Product Authority in Tag Assistant / GA4 evidence:

### Search/reset

Observed behavior after clear/reset:

```text
Clear filters -> mnt_catalog_filter
filter_dimension = reset
filter_value = all
result_count = full catalogue count
```

The previous planned assertion requiring `mnt_catalog_search(search_state=cleared)` was corrected because the actual implementation intentionally emits reset as `mnt_catalog_filter`, not a second search event.

Status: `PASS FOR IMPLEMENTED BEHAVIOR`.

### FAQ hygiene

Observed sequence:

```text
FAQ click
-> mnt_section_click
faq_item = site_institucional
section_target = faq
placement = faq

then ordinary navigation
-> mnt_section_click
section_target = opportunities
placement = hero
faq_item = not_applicable
```

Status: `PASS`.

### Project-context hygiene

Observed sequence:

```text
project-specific intent
project_name = Nova Vivere
offer_name = Nova Vivere | 72 m²
intent_type = project_interest

then global hero CTA "Receber condições"
-> mnt_intent
intent_type = request_conditions
placement = hero
project_name = not_applicable
offer_name = not_applicable
```

Status: `PASS`.

Conclusion:

```text
V4 PARAMETER HYGIENE = VALIDATED IN GREEN PRODUCTION
SEARCH/RESET = PASS FOR IMPLEMENTED BEHAVIOR
FAQ HYGIENE = PASS
PROJECT CONTEXT HYGIENE = PASS
```

Important evidence boundary: the detailed runtime HAR/Tag Assistant exports were supplied in the ChatGPT conversation on 2026-09-12 and are not yet repository-archived by this handoff.

## 4. Next product step — Form 46 measurement

The next practical increment is the native Green Form 46 tracking lifecycle.

Canonical form contract:

```text
tenant_id = 313
form_id = 46
title = MoreEmUmTegra
fields = nome, email, telefone
native Green submit lifecycle must be preserved
```

Target source events:

```text
mnt_form_start
mnt_form_submit_attempt
mnt_lead_success
```

Hard rules:

```text
mnt_form_start != conversion
mnt_form_submit_attempt != conversion
mnt_lead_success = PRIMARY only
CTA / form open / validation / submit attempt / request-sent != lead
only verified native Green success may emit mnt_lead_success
visitor PII must never be sent in analytics payloads
no direct gtag()
no generic document.querySelector("form") interception
no replacement of native Green submit with custom fetch unless a proven need and new authorization exists
```

Before implementing `mnt_lead_success`, inspect/prove the actual native Green Form 46 success signal/response. Do not invent response shape, HTTP semantics or DOM success marker.

## 5. Tracking V1 closure sequence

Current intended product sequence:

```text
v4 hygiene validated
→ inspect/prove Form 46 native lifecycle
→ implement mnt_form_start
→ implement mnt_form_submit_attempt
→ implement mnt_lead_success only from verified Green success
→ configure corresponding GTM/GA4 delivery under the accepted transport contract
→ run lean MNT-M2-10 end-to-end QA
→ close Tracking V1
→ enter M3 SEO/Search
→ then M4 GEO/AEO/content/schema/linking
```

MNT-M2-10 must prove the useful chain, not create documentation for its own sake:

```text
browser
→ dataLayer
→ GTM
→ consent
→ GA4
→ expected event/parameters
→ no unintended duplication
→ verified lead success only when Green actually created the lead
```

## 6. Form implementation guardrails from canonical main

Main currently still contains older documentation that says MNT-M2-09 is not authorized. That text is historically stale versus the explicit Product Authority authorizations and live PR #50 work. Do not regress to that state in a new conversation.

However, `main` remains the canonical integrated branch until PR #50 merges. Therefore the next conversation must resolve live state instead of blindly trusting stale main lifecycle prose.

Key architectural blockers still apply:

- do not intercept native submit in a way that risks Form 46;
- do not use global `form` selector;
- do not emit `mnt_lead_success` without a stable proven native Green success signal;
- do not send name/email/phone/form values to Measurement;
- do not add a second GTM, direct `gtag()` or direct `fbq()`;
- no Meta/Ads/CAPI work in this scope;
- no FECH.AI/n8n/Make work in this project without separate authorization.

## 7. PR #50 status and acceptance boundary

PR #50 must stay Draft until the Product Authority authorizes its final lifecycle transition.

The v4 runtime hygiene gate itself is now effectively satisfied by Product Authority-supplied production tests.

Do not silently:

- mark PR #50 Ready;
- merge PR #50;
- mutate `main`;
- publish another GTM version;
- configure GA4 Key Events;
- change Green beyond explicitly authorized scope;
- promote Vercel;
- reopen PR #51/WBS work.

The next conversation should focus on the Form 46 product increment unless Product Authority changes priority.

## 8. New-conversation bootstrap instructions

At the start of the next conversation:

1. resolve live `main` SHA;
2. resolve live PR #50 exact head/state;
3. read:
   - `bootstrap/BOOTSTRAP_CANONICO.md`;
   - this `handoffs/CURRENT.md` from the live PR #50 branch if not yet merged;
   - `docs/PROJECT_STATUS.md`;
   - `docs/NEXT_SAFE_ACTION.md`;
   - `docs/BLOCKED_ACTIONS.md`;
   - applicable Measurement contracts;
4. reconcile stale main lifecycle text against the explicit Product Authority authorizations and current PR #50 live state;
5. do not ask the user to repeat already proven v4 hygiene tests;
6. continue at Form 46 native-lifecycle inspection/measurement design and implementation only after the user authorizes that concrete mutation step.

## 9. Continuity checkpoint

```text
CURRENT PRODUCT STATE:
- site operational on Green
- v4 JS manually deployed to Green by Product Authority
- v4 parameter hygiene validated in production
- GTM Version 5 published
- GA4 G-57M2XR0CY2 receiving events
- M2-09 PR #50 still Draft / not merged
- Form 46 measurement events not implemented
- MNT-M2-10 end-to-end QA still open

NEXT PRODUCT OBJECTIVE:
Prove and instrument real Form 46 lifecycle without false-positive lead conversion.
```
