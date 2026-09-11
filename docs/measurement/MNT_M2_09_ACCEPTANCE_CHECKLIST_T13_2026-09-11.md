# MNT-M2-09 — Acceptance checklist T13 — 2026-09-11

- Project: `MoreNumTegra`
- Task: `MNT-M2-09 — Implement authorized tracking configuration`
- Branch: `feat/mnt-m2-09-tracking-implementation`
- Acceptance status at creation: `PENDING FINAL GREEN V4 RUNTIME REVALIDATION`
- GTM container: `GTM-PGCR4R47`
- Published GTM version: `5 — MNT M2-09 - Measurement v3 - 2026-09-11`
- GA4 destination: `G-57M2XR0CY2`
- Measurement source candidate: `v4 parameter hygiene`
- Green source candidate at checklist creation: PR head `9c8580898fc692fcf06b53dc06fd36dd62ea9484`

## 1. Already proven before final acceptance

The following items are already supported by evidence in this PR:

- dedicated GA4 property / stream / Measurement ID resolved and used;
- GTM `GTM-PGCR4R47` remains the sole project-owned browser dispatcher;
- Google Tag uses `send_page_view=false`;
- source events implemented for `mnt_page_view`, `mnt_section_click`, `mnt_catalog_filter`, `mnt_catalog_search`, `mnt_intent`;
- no direct `gtag()` / `fbq()` path in MoreNumTegra Measurement source;
- no raw catalogue search text or visitor PII in ordinary Measurement parameters;
- FAQ controlled taxonomy validated in real-source Tag Assistant QA;
- `search_location` controlled classification validated for `lapa` and `other`;
- project / offer context validated for `Château Jardin`;
- GA4 Event-tag isolation validated for `mnt_section_click`, `mnt_catalog_search` and `mnt_intent`;
- Consent Mode default denied and owner choice update behavior validated;
- GTM Version 5 publication evidenced;
- post-publication workspace clean (`0` pending changes) evidenced;
- production GA4 network/debug evidence observed for `page_view` and `mnt_catalog_search`;
- separate `mnt_catalog_search` occurrences proven non-duplicate by distinct `mnt_event_id` values;
- stale Data Layer optional-parameter reuse identified as a distinct issue and corrected in Measurement v4 source;
- v4 source assembly passed release guard, syntax checks and bounded-delta validation;
- accepted UI/runtime prefix remains protected byte-for-byte against the known functional baseline.

## 2. Final Green v4 runtime gate — required

Do not mark MNT-M2-09 complete until the owner copies the exact current PR `src-greenn/moretegra.js` into the Green page-level JavaScript field and all checks below pass.

### 2.1 Search stale-value hygiene

Sequence:

```text
search `lapa`
-> wait for active mnt_catalog_search
-> clear the search field
-> wait for cleared mnt_catalog_search
```

Required cleared occurrence:

```text
search_state = cleared
search_location = not_applicable
result_count = full catalogue count observed at runtime
```

Fail if the cleared occurrence carries the prior location, including `lapa`.

### 2.2 FAQ stale-value hygiene

Sequence:

```text
open one FAQ
-> trigger an ordinary non-FAQ section navigation
```

Required ordinary section occurrence:

```text
faq_item = not_applicable
```

Fail if the later ordinary section event carries the previously opened FAQ item.

### 2.3 Project-context stale-value hygiene

Sequence:

```text
select Château Jardin
-> trigger a later project-independent mnt_intent
```

Required project-independent occurrence:

```text
project_name = not_applicable
offer_name = not_applicable
```

Fail if the later intent carries the previous `Château Jardin` context without a real project association.

### 2.4 GA4 production delivery after v4 source update

At least one of the three hygiene sequences above must be observed as a real GA4 hit to `G-57M2XR0CY2` outside the GTM Preview/debug URL path.

Required:

- one source occurrence -> one GA4 hit for the inspected semantic occurrence;
- same `mnt_event_id` must not appear as two GA4 hits for the same occurrence;
- controlled parameters must match the source event semantics;
- no raw free-form search term in the GA4 request.

### 2.5 Critical UI regression smoke

Owner must confirm no regression in:

- project galleries;
- project interest context;
- `Receber condições` flow;
- filters;
- reset;
- catalogue search;
- scroll / section navigation;
- floating WhatsApp / conditions CTAs;
- native Green Form 46 remains present and submit lifecycle untouched.

## 3. Acceptance decision rule

If every final Green v4 runtime check passes and no new material defect is found:

```text
MNT-M2-09 = ELIGIBLE_FOR_FINAL_EXACT_HEAD_REVIEW
```

Then perform, in order:

1. resolve exact PR head live;
2. run / verify final bounded diff and release guard evidence;
3. verify PR remains mergeable and has no unresolved material review finding;
4. publish final MNT-M2-09 acceptance evidence;
5. obtain explicit Product Authority acceptance / merge authorization;
6. only then mark Ready / merge according to the applicable gate;
7. reconcile canonical `main` project status, handoff, next-safe-action and SFJM state after merge;
8. only after MNT-M2-09 is accepted complete may MNT-M2-10 be started under its own authorization semantics.

If any final v4 runtime check fails:

```text
MNT-M2-09 = REMAINS PARTIAL_IMPLEMENTED
```

Correct only the proven defect; do not broaden scope into MNT-M2-10, Meta, Ads, form/lead lifecycle or unrelated UI refactoring.

## 4. Explicit non-goals / still blocked

This acceptance checklist does not authorize or require:

- `mnt_form_start`;
- `mnt_form_submit_attempt`;
- `mnt_lead_success` without a proven native Green success signal;
- GA4 Key Events;
- Google Ads linking / conversions;
- Meta Pixel / Dataset / CAPI;
- FECH.AI / n8n / Make;
- Vercel Production promotion;
- DNS / Search Console mutation;
- unrelated UI refactoring.

## 5. Relationship to MNT-M2-10

`MNT-M2-09` proves the authorized tracking implementation is correctly deployed and bounded.

`MNT-M2-10` is the subsequent end-to-end Measurement QA task and must remain separate:

```text
MNT-M2-09 IMPLEMENTED / ACCEPTED
!=
MNT-M2-10 END-TO-END VALIDATED
```

Do not use this checklist to claim MNT-M2-10 complete.
