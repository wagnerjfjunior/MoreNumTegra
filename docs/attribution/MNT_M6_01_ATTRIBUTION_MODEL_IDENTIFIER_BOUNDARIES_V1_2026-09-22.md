# MNT-M6-01 — Attribution Model and Identifier Boundaries v1

Date: `2026-09-22`

Status: `COMPLETE / DESIGN_CANONICALIZED / NO_RUNTIME_OR_EXTERNAL_PLATFORM_MUTATION`

## 1. Scope

Define the project-owned attribution model and the identity boundaries that later M6 tasks must preserve.

This task does **not**:

- create or link a Google Ads account;
- create Google Ads conversion actions;
- create or publish campaigns;
- authorize spend/budget;
- implement Meta Pixel/Dataset/CAPI;
- publish a new GTM version;
- mutate GA4;
- change Form 46 payload;
- add a backend;
- add FECH.AI/n8n/Make;
- persist new attribution identifiers in Production.

M6-01 is architecture/governance only.

## 2. Canonical inputs

Project-owned inputs:

- `bootstrap/BOOTSTRAP_CANONICO.md`;
- `docs/baseline/TECHNICAL_BASELINE_V2_3.md`;
- ADR-004, ADR-005, ADR-006;
- `docs/measurement/MNT_M2_02_TRANSPORT_DEDUP_ARCHITECTURE_2026-09-10.md`;
- `docs/measurement/MNT_M2_03_CANONICAL_EVENT_TAXONOMY_V1_2026-09-10.md`;
- `docs/measurement/MNT_M2_04_PRIMARY_SECONDARY_CONVERSIONS_V1_2026-09-10.md`;
- `docs/measurement/MNT_M2_05_GTM_GA4_OWNERSHIP_CONTRACT_V1_2026-09-10.md`;
- `docs/measurement/MNT_M2_10_POST_MERGE_RECONCILIATION_2026-09-13.md`;
- `docs/conversion/MNT_M5_07_LEAD_SEMANTICS_DECISION_GATE_2026-09-20.md`;
- `docs/conversion/MNT_M5_08_GREEN_FORM46_CRM_HANDOFF_CONTRACT_2026-09-21.md`.

Current official Google Ads documentation was consulted for:

- GCLID auto-tagging semantics;
- ValueTrack campaign/click metadata;
- GBRAID/WBRAID presence and conversion-import roles.

No Meta click-identifier implementation is adopted from M6-01 because the current MoreNumTegra Meta runtime remains unimplemented and the project has no canonical Meta identifier contract.

## 3. Canonical-host precedence correction

Historical M2-02 text was written before ADR-006 and contains a point-in-time canonical-host rule using non-`www`.

That host rule is superseded by the current project baseline.

Current authority is:

```text
COMMERCIAL_CANONICAL_HOST = www.moretegra.com.br
APEX = moretegra.com.br
APEX_BEHAVIOR = 308 -> www.moretegra.com.br
VERCEL_APP_HOSTS = NON_CANONICAL / NOINDEX
```

For every M6 design and later paid-media implementation:

```text
CURRENT_BASELINE + ADR-006 > HISTORICAL M2-02 HOST CLAUSE
```

This correction changes no historical evidence; it only prevents reuse of a stale host boundary.

## 4. Attribution model v1

MoreNumTegra adopts a **dual acquisition snapshot** model at the project layer:

```text
FIRST_ELIGIBLE_TOUCH
LAST_ELIGIBLE_TOUCH
```

Purpose:

- `FIRST_ELIGIBLE_TOUCH` preserves the earliest eligible externally attributable acquisition context available inside the governed persistence scope;
- `LAST_ELIGIBLE_TOUCH` preserves the most recent eligible externally attributable acquisition context before the business outcome.

The project does **not** declare either snapshot to be the universal business truth for every vendor report.

Vendor destinations may apply their own attribution models. Project reporting must keep:

```text
PROJECT_ACQUISITION_EVIDENCE != VENDOR_NATIVE_ATTRIBUTION_MODEL
```

No cross-channel "winner" may be inferred merely because GA4, Google Ads, Meta or CRM counts differ.

### 4.1 Eligible external touch

An eligible external touch is a landing/navigation context carrying an authorized acquisition signal such as:

- governed UTM campaign metadata;
- an authorized platform click identifier;
- another future allowlisted campaign signal defined by a later M6 contract.

Direct/internal navigation is not a new eligible external acquisition touch.

### 4.2 Direct/internal behavior

A direct or internal navigation must not overwrite an already retained eligible acquisition touch merely because no campaign parameter is present on the new URL.

Exact persistence duration/lookback and storage mechanics are **not** defined by M6-01. They require the later UTM/implementation contracts and consent/privacy review.

## 5. Identifier namespace model

Identifiers and descriptors are deliberately separated.

### 5.1 Project semantic event identity

Canonical:

`mnt_event_id`

Meaning:

- one project-generated correlation identity per semantic occurrence;
- reused across authorized destination copies only where appropriate;
- never a person ID;
- never a CRM lead ID;
- never a campaign/click ID;
- never a session ID;
- never derived from visitor PII.

Preserve:

```text
MNT_EVENT_ID != USER_ID
MNT_EVENT_ID != LEAD_ID
MNT_EVENT_ID != GCLID
MNT_EVENT_ID != SESSION_ID
```

### 5.2 Controlled business context

Already governed non-PII content metadata:

- `project_name`;
- `offer_name`;
- canonical route/page identity;
- controlled intent enums.

These values identify the content/business context of an event. They do not identify the visitor.

### 5.3 Campaign descriptors

Reserved for M6-02 exact contract:

- `utm_source`;
- `utm_medium`;
- `utm_campaign`;
- optional future `utm_content`;
- optional future `utm_term`.

M6-01 establishes the class but does not yet define campaign naming vocabulary, normalization, required/optional combinations or retention duration.

Campaign descriptors:

- are not user IDs;
- are not event IDs;
- must not be placed in canonical URLs, sitemap entries, canonical tags or JSON-LD identities;
- must not be inferred from free-form visitor input.

### 5.4 Google Ads click identifiers

The project reserves the following Google-owned URL identifier classes for later Google Ads architecture:

- `gclid`;
- `wbraid`;
- `gbraid`.

Boundary:

```text
GOOGLE_CLICK_ID = OPAQUE PLATFORM ATTRIBUTION DATA
GOOGLE_CLICK_ID != PERSON ID
GOOGLE_CLICK_ID != MNT_EVENT_ID
GOOGLE_CLICK_ID != CRM LEAD ID
GOOGLE_CLICK_ID != PROJECT/PROPERTY ID
```

Rules:

- preserve the received value exactly when a later implementation is authorized;
- do not parse business meaning out of the value;
- do not lowercase/uppercase/normalize opaque identifiers;
- do not reflect them into visible page content;
- do not place them in canonical/schema/sitemap URLs;
- do not use them as database primary keys;
- do not expose them in public logs or repository evidence;
- do not transport them to Green/CRM until a separate CRM/provider attribution contract explicitly authorizes fields and semantics.

Google documentation confirms that GCLID is an auto-tagging click identifier and that BRAID parameters may participate in conversion measurement/import flows. This architectural reservation does not enable those flows.

### 5.5 Meta and other platform identifiers

Current MoreNumTegra Meta runtime remains:

```text
META_PIXEL_DATASET = NOT_IMPLEMENTED_BY_CURRENT_ACCEPTED_SCOPE
META_CAPI = NOT_IMPLEMENTED / NOT_AUTHORIZED
```

Therefore:

- no `fbclid`, `_fbc`, `_fbp` or Meta-specific identity becomes canonical through M6-01;
- no generic `platform_click_id` field is invented as a substitute;
- Meta identifier semantics require their own evidence-backed later contract before implementation.

### 5.6 Destination-native browser/session identifiers

Examples include GA4/client/session identifiers and equivalent vendor-native browser state.

Boundary:

```text
DESTINATION_NATIVE_ID = VENDOR RUNTIME STATE
NOT PROJECT CANONICAL IDENTITY
```

M6-01 does not authorize copying destination-native client/session identifiers into Green CRM, Form 46, public HTML or a future backend.

### 5.7 Green / CRM lead identity

Green is the current lead/CRM provider.

Current browser payload remains exactly:

- `tenant_id`;
- `form_id`;
- `title`;
- `nome`;
- `email`;
- `telefone`;
- controlled `texto-livre`.

No provider-stable lead ID is currently part of the proven frontend contract.

Green redirect/query values such as:

- `l_`;
- `p_id`

remain provider navigation/lifecycle data and **must not** be promoted to:

- canonical lead ID;
- attribution ID;
- CRM primary key;
- Ads order/transaction ID;
- user identity.

### 5.8 Visitor identity

M6-01 explicitly rejects a project-owned cross-session person identity for V1.

Forbidden without a new explicit privacy/security architecture:

- browser fingerprinting;
- deterministic user IDs derived from e-mail/phone/name;
- hashing PII merely to create an analytics identity;
- joining sessions across devices using visitor PII;
- exposing PII to dataLayer/GA4 ordinary event parameters;
- treating IP/device characteristics as project person identity.

```text
PROJECT_USER_ID = NOT_DEFINED
CROSS_DEVICE_IDENTITY = NOT_IMPLEMENTED
FINGERPRINTING = FORBIDDEN
```

## 6. Lead/conversion attribution boundary

The V1 primary business outcome remains:

`mnt_lead_success -> GA4 generate_lead`

Preserve:

```text
ONLY VERIFIED/ACCEPTED FORM46 SUCCESS PATH -> PRIMARY LEAD EVENT
CTA CLICK != LEAD
WHATSAPP CLICK != LEAD
FORM START != LEAD
SUBMIT ATTEMPT != LEAD
PROPERTY PRICE != CONVERSION VALUE
```

Attribution metadata may describe the acquisition context of a lead. It must not change the validity rule for whether a lead exists.

## 7. CRM boundary

M6-01 does not overload current `texto-livre` with raw attribution identifiers.

Current CRM text remains commercial context:

```text
<controlled project context> | <controlled intent>
```

Future CRM attribution handoff requires a separate explicit contract defining:

- provider-supported field(s);
- allowed campaign dimensions;
- click-ID handling;
- persistence/lookback;
- privacy/consent;
- encoding/length;
- downstream ownership;
- security/logging;
- rollback.

Until then:

```text
UTM/CLICK_ID -> CRM = NOT_AUTHORIZED
```

## 8. URL and SEO boundary

Attribution parameters are non-canonical query metadata.

Required later implementation behavior:

- canonical tag remains the clean `www.moretegra.com.br` route without attribution query parameters;
- sitemap remains clean;
- JSON-LD entity URLs remain clean;
- Open Graph canonical URL remains clean;
- attribution query parameters must not create indexable duplicate pages;
- redirects/canonicalization must preserve an authorized inbound attribution signal long enough for the permitted capture path, without converting the query-bearing URL into the canonical identity;
- internal links must not propagate campaign parameters indiscriminately.

Exact query allowlist and cleanup/persistence mechanics belong to M6-02/implementation QA.

## 9. Consent and privacy boundary

Current Consent Mode remains authoritative:

```text
default = denied
affirmative choice = granted
denied choice = denied
```

M6-01 does not invent a new lawful basis or second consent state machine.

Any later persistence/transmission of advertising identifiers must be reconciled with:

- the current consent model;
- destination-specific behavior;
- LGPD/privacy requirements;
- the authorized implementation scope.

The existence of a click parameter in a URL does not itself authorize arbitrary storage, CRM propagation or cross-platform sharing.

## 10. Security boundary

Attribution inputs are untrusted URL data.

Future implementation must:

- use an explicit allowlist;
- bound lengths;
- treat values as opaque text;
- never execute them as HTML/JS;
- never concatenate them into SQL;
- never treat client-supplied campaign/tenant/project values as authorization;
- never expose service-role credentials;
- never place secrets in URL parameters;
- fail closed on malformed attribution payloads where persistence/transport is optional.

No attribution identifier grants access to FECH.AI, Supabase, Green admin or any privileged API.

## 11. Reporting model

MoreNumTegra reporting must preserve three separate layers:

### Layer A — project acquisition evidence

Potential future fields:

```text
first_eligible_touch.*
last_eligible_touch.*
```

### Layer B — project business outcome

```text
mnt_event_id
mnt_lead_success
project_name / offer_name where controlled context exists
```

### Layer C — vendor-native attribution

Examples:

- GA4 attribution/reporting;
- Google Ads conversion attribution;
- future Meta attribution.

Do not flatten all three into a single universal attribution ID.

## 12. Dedupe boundary

`mnt_event_id` remains the project event correlation key.

Google/Meta/vendor click IDs are not dedupe keys for project semantic events.

If a later Ads/offline conversion architecture requires a transaction/order/event identifier, M6-03 must define it explicitly from an accepted conversion lifecycle. It must not be invented from:

- property price;
- visitor PII;
- `gclid`;
- `l_`;
- `p_id`;
- project name;
- offer name.

## 13. M6-01 canonical decisions

```text
D01 PROJECT_ATTRIBUTION_MODEL = FIRST_ELIGIBLE_TOUCH + LAST_ELIGIBLE_TOUCH
D02 UNIVERSAL_CROSS_CHANNEL_WINNER = REJECTED
D03 PROJECT_EVENT_ID = mnt_event_id
D04 PROJECT_USER_ID = NOT_DEFINED
D05 CROSS_DEVICE_IDENTITY = NOT_IMPLEMENTED
D06 FINGERPRINTING = FORBIDDEN
D07 UTM_CLASS = RESERVED / EXACT CONTRACT DEFERRED_TO_M6_02
D08 GOOGLE_CLICK_IDS = gclid/wbraid/gbraid / OPAQUE / RESERVED
D09 META_CLICK_IDENTIFIER_CONTRACT = NOT_DEFINED / DEFERRED
D10 CRM_ATTRIBUTION_FIELDS = NOT_AUTHORIZED / PROVIDER_CONTRACT_REQUIRED
D11 GREEN_l__AND_p_id = NOT LEAD/ATTRIBUTION IDs
D12 ENHANCED_CONVERSIONS_OR_HASHED_PII = NOT_AUTHORIZED
D13 CANONICAL_HOST = www.moretegra.com.br
D14 QUERY_ATTRIBUTION_PARAMS = NON_CANONICAL_METADATA
D15 VENDOR_NATIVE_ATTRIBUTION != PROJECT_ACQUISITION_EVIDENCE
D16 PAID_SPEND_OR_CAMPAIGN_MUTATION = NOT_AUTHORIZED
```

## 14. Deferred decisions

M6-02 must define:

- UTM names and controlled values;
- campaign naming grammar;
- required/optional combinations;
- first/last-touch capture mechanics;
- persistence storage and retention/lookback;
- direct/referral handling;
- query allowlist;
- redirect/query preservation;
- cleanup behavior;
- QA vectors.

M6-03 must define:

- Google Ads conversion architecture;
- auto-tagging assumptions;
- click-ID use;
- conversion action semantics;
- import vs browser conversion path if applicable;
- counting/dedup/order-ID semantics;
- GA4 import/link boundaries;
- consent requirements.

M6-04/M6-05 define SEM/query/landing ownership.

M6-06 gates budget/spend.

M6-07 gates external platform implementation.

M6-08 provides paid conversion QA.

## 15. Acceptance

M6-01 is complete because it defines:

- project attribution model;
- canonical host precedence;
- identity namespaces;
- campaign/click/event/lead/person boundaries;
- consent/privacy boundary;
- CRM boundary;
- URL/SEO boundary;
- dedupe boundary;
- security boundary;
- explicit deferred decisions.

No runtime or external platform was mutated.

```text
MNT-M6-01 = COMPLETE / DESIGN_CANONICALIZED / NO_RUNTIME_MUTATION
accepted_scope_equivalent = 16h
```

Program progress after acceptance:

```text
FORECAST_TOTAL_HOURS = 1240
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 936
REMAINING_FORECAST_HOURS = 304
ACCEPTED_PERCENT = 75.48
```

Next gate:

`MNT-M6-02 — UTM/source/medium/campaign contract — 8h / AUTHORIZATION_REQUIRED`.


## 16. External platform references observed

Observed on `2026-09-22` from official Google documentation:

- Google Ads Help — Google Click ID (GCLID): `https://support.google.com/google-ads/answer/9744275?hl=pt-BR`
- Google Ads Help — ValueTrack parameters: `https://support.google.com/google-ads/answer/2375447?hl=pt-BR`
- Google Ads Help — GBRAID URL parameter: `https://support.google.com/google-ads/answer/16297842?hl=pt-BR`
- Google Ads Help — iOS campaign measurement updates / WBRAID: `https://support.google.com/google-ads/answer/10417364?hl=pt-BR`

These references support the platform-owned identifier class only. They do not authorize MoreNumTegra implementation, Ads account mutation, offline conversion upload, enhanced conversions, user-data upload or spend.
