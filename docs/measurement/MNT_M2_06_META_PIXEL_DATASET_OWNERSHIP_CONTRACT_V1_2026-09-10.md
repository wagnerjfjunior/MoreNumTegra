# MNT-M2-06 — Meta Pixel / Dataset Ownership Contract v1

- Project: `MoreNumTegra`
- Program: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Task: `MNT-M2-06 — Define ownership for Meta Pixel/Dataset`
- Mode: `DESIGN / GOVERNANCE ONLY / NO RUNTIME OR META-ADMIN MUTATION`
- Product Authority authorization: explicit start authorization in project conversation on `2026-09-10`
- Canonical main resolved before execution: `19570db1ee2853946e45451c0ff5afaceb894002`
- Historical runtime dependency: `docs/measurement/MNT_M2_01_TRACKING_RUNTIME_INVENTORY_2026-09-10.md`
- Transport dependency: `docs/measurement/MNT_M2_02_TRANSPORT_DEDUP_ARCHITECTURE_2026-09-10.md`
- Taxonomy dependency: `docs/measurement/MNT_M2_03_CANONICAL_EVENT_TAXONOMY_V1_2026-09-10.md`
- Conversion dependency: `docs/measurement/MNT_M2_04_PRIMARY_SECONDARY_CONVERSIONS_V1_2026-09-10.md`
- Google ownership dependency: `docs/measurement/MNT_M2_05_GTM_GA4_OWNERSHIP_CONTRACT_V1_2026-09-10.md`
- RESF provider pin: `wagnerjfjunior/Blogs-sites-portais-seo@7a61aa036d677015ee4540ca8c5dc9a41f0165d4`
- Runtime/admin mutation by this task: `NONE`
- Status when this revision is integrated into canonical `main`: `COMPLETE`

## 1. Purpose

Define who governs the MoreNumTegra Meta Measurement destination, what Pixel/Dataset topology is allowed, how a future browser and optional server-side path must relate to the canonical project event layer, and which identifiers/evidence must exist before implementation.

This task does **not** create or configure a Meta Dataset, Pixel, Conversions API integration, Business Portfolio, ad account, domain verification, partner integration, access token, event mapping, campaign or spend.

Preserve:

```text
META GOVERNANCE OWNERSHIP != PROOF OF META ACCOUNT CREDENTIAL HOLDER
META DATASET TARGET DEFINED != DATASET EXISTS
META PIXEL TARGET DEFINED != PIXEL EXISTS
PIXEL PRESENT != CAPI PRESENT
CAPI DESIGNED != CAPI IMPLEMENTED
PROJECT CONVERSION ROLE != META STANDARD EVENT MAPPING
SOURCE EVENT IDENTITY != META DEDUP CONFIGURATION
```

## 2. Evidence boundary at task start

The accepted T0 runtime inventory observed no project-owned or runtime Meta Pixel/`fbq` signal in the captured pre-GTM session.

That historical evidence is bounded to T0 and does not prove permanent absence. No later canonical project evidence currently proves a Meta Dataset ID, Pixel ID or Conversions API configuration.

Therefore the current state for MNT-M2-06 is:

```text
META_DATASET_EXISTS = NOT_PROVEN_IN_CANONICAL_EVIDENCE
META_DATASET_ID = NOT_PROVEN
META_PIXEL_EXISTS = NOT_PROVEN_IN_CANONICAL_EVIDENCE
META_PIXEL_ID = NOT_PROVEN
META_PIXEL_DATASET_RELATIONSHIP = NOT_PROVEN
META_BUSINESS_PORTFOLIO_ID = NOT_PROVEN / NOT_REQUIRED_IN_REPOSITORY
META_AD_ACCOUNT_ID = NOT_PROVEN / OUTSIDE_M2_06_MEASUREMENT_OWNERSHIP
META_CAPI = NOT_PROVEN / NOT_IMPLEMENTED_BY_THIS_TASK
```

`NOT_PROVEN` is not equivalent to `DOES_NOT_EXIST`.

Before creating any Meta asset, later authorized work must first verify whether a suitable dedicated MoreNumTegra asset already exists and record its exact non-secret identifiers.

## 3. Governance ownership

The MoreNumTegra Meta Measurement destination is project-owned at the governance level:

```text
META_MEASUREMENT_GOVERNANCE_OWNER = MoreNumTegra / Product Authority
META_CONFIGURATION_AUTHORITY = PRODUCT_AUTHORITY_GATE_REQUIRED
META_PROJECT_SCOPE = MoreNumTegra only
META_CROSS_PROJECT_DATASET_REUSE = FORBIDDEN_BY_DEFAULT
```

A Meta/Facebook Page, Green Sales integration, advertising account, service provider, Tegra corporate system or another real-estate project must not be treated as the owner of MoreNumTegra website Measurement merely because it can receive leads, host media, run campaigns or have platform access.

Credentials, personal account e-mails, recovery methods, tokens and secrets must not be committed to GitHub or client-delivered code.

## 4. Target Dataset / Pixel topology

### 4.1 Dataset rule

The target architecture is **one dedicated Meta Dataset for the MoreNumTegra project Measurement surface**.

```text
META_DATASET_SCOPE = DEDICATED_MORENUMTEGRA_DATASET
META_DATASET_COUNT_TARGET = 1
META_DATASET_ID = NOT_PROVEN
```

If a suitable dedicated dataset already exists, later authorized work must adopt and record it rather than create a duplicate.

### 4.2 Browser Pixel rule

If browser-side Meta collection is implemented, the project target is one browser Pixel/data-source relationship associated with the dedicated MoreNumTegra Dataset as applicable to the Meta account configuration actually observed at implementation time.

```text
META_BROWSER_SOURCE_COUNT_TARGET = 1
META_PIXEL_ID = NOT_PROVEN
META_PIXEL_DATASET_RELATIONSHIP = MUST_BE_OBSERVED_BEFORE_IMPLEMENTATION_CLAIM
```

This contract does not assert that Dataset ID and Pixel ID are identical or interchangeable. Their actual relationship must be captured from the Meta administration surface before implementation is accepted.

A second competing browser Pixel for the same MoreNumTegra business-event surface is forbidden unless a later architecture decision explicitly supersedes this contract.

## 5. Browser transport boundary

The accepted project source layer remains vendor-neutral. If Meta browser collection is later authorized, its transport path must be:

```text
verified user/runtime occurrence
-> one canonical mnt_* dataLayer event
-> GTM-PGCR4R47
-> canonical-host + consent + eligibility controls
-> dedicated MoreNumTegra Meta browser destination
```

Rules:

- `GTM-PGCR4R47` remains the sole project-owned browser dispatcher;
- do not add a direct project `fbq()` bootstrap outside the governed GTM path;
- do not forward Green `/page/view` as a MoreNumTegra business event;
- do not use YouTube telemetry as a Meta business event;
- no project production Meta Measurement on `www.moretegra.com.br`;
- no project production Meta Measurement on `morenumtegra.vercel.app`;
- source event semantics remain the canonical `mnt_*` taxonomy and may not be redefined by vendor naming.

## 6. Meta event mapping boundary

MNT-M2-06 defines ownership/topology, not vendor event-name mapping.

```text
META_STANDARD_EVENT_MAPPING = NOT_DEFINED_BY_M2_06
META_CUSTOM_EVENT_MAPPING = NOT_DEFINED_BY_M2_06
META_CUSTOM_CONVERSION_CONFIGURATION = NOT_AUTHORIZED_BY_M2_06
META_OPTIMIZATION_EVENT = NOT_AUTHORIZED_BY_M2_06
```

Any later mapping must preserve the project conversion contract:

```text
PRIMARY = mnt_lead_success only
SECONDARY = allowlisted explicit commercial/contact mnt_intent values
NONE = page/section/filter/search/project_interest/form_start/form_submit_attempt
```

A Meta platform name such as a lead-related standard event must never be used to reinterpret a CTA click, WhatsApp open, form start or submit attempt as a verified lead.

`mnt_lead_success` remains blocked from runtime implementation until a stable, non-invasive Green Form 46 success signal is canonically proven.

## 7. Conversions API boundary

Conversions API is a **future optional server-side transport**, not a requirement or implementation authorized by MNT-M2-06.

```text
META_CAPI_TARGET = OPTIONAL_FUTURE_CAPABILITY
META_CAPI_IMPLEMENTATION = NOT_AUTHORIZED_BY_M2_06
META_CAPI_ENDPOINT / TOKEN / SECRET = NOT_CREATED / NOT_STORED
CUSTOM_BACKEND = NOT_AUTHORIZED_BY_M2_06
FECH.AI / n8n / Make = NOT_AUTHORIZED_BY_M2_06
```

If a later architecture authorizes both browser Pixel and CAPI for the same logical event, it must define and prove destination-native deduplication before dual transport is enabled.

The canonical project `mnt_event_id` is a source correlation identity. It must not be assumed to be a valid Meta `event_id` implementation automatically. A later implementation may map/reuse an identity only after confirming the destination-specific dedup contract and preserving one logical event across browser/server paths.

## 8. Consent and privacy boundary

MNT-M2-06 does not create a second consent state machine and does not claim that Google Consent Mode fields are themselves Meta consent controls.

Any later Meta dispatch must be subordinate to the same authoritative Green user-consent decision already used by the project and must be explicitly validated under MNT-M2-09/MNT-M2-10 before production acceptance.

Until that gating is implemented and proven, Meta business-event collection remains disabled/not implemented by this task.

Project privacy rules remain binding:

- no visitor name in ordinary Measurement event parameters;
- no email;
- no visitor phone/WhatsApp number;
- no raw Form 46 values;
- no raw catalogue search text;
- no free-form message text;
- no token/secret;
- no hashed PII introduced by inference.

Any later customer-information parameters, advanced matching, user-data hashing or similar advertising-user-data feature requires an explicit privacy/security/attribution decision and applicable authorization. MNT-M2-06 does not authorize them.

## 9. Responsibility matrix

| Area | Accountable authority | Execution role | Boundary |
|---|---|---|---|
| Meta Measurement purpose/topology | MoreNumTegra Product Authority | authorized Measurement operator | dedicated project scope; no cross-project reuse by default |
| Dataset adoption/creation | MoreNumTegra Product Authority | authorized Meta operator | prove existing ID first or obtain explicit creation gate |
| Pixel/browser-source adoption/configuration | MoreNumTegra Product Authority | authorized Meta/GTM operator | one browser source, GTM dispatcher only |
| Browser event dispatch | MoreNumTegra Product Authority gate | authorized GTM operator | MNT-M2-09 or explicit equivalent mutation gate |
| CAPI architecture/implementation | separate Product Authority decision | future authorized server-side operator | not authorized by M2-06 |
| Event semantics | MoreNumTegra M2-03 contract | implementation operator | map, do not redefine |
| Conversion semantics | MoreNumTegra M2-04 contract | implementation operator | vendor names must not inflate lead validity |
| Consent | accepted project consent decision | implementation/QA operator | no second state machine; Meta gating must be proven |
| RESF provider | no consumer runtime authority | advisory/service-provider role | guidance != mutation authority |
| End-to-end proof | MoreNumTegra program | MNT-M2-10 QA | runtime evidence required |

## 10. Administrative controls

Future Meta administration must preserve:

1. least-privilege access for the authorized operator;
2. no shared credentials or access tokens in repository/docs/client code;
3. exact Dataset/Pixel IDs may be recorded only after observed/proven;
4. existing suitable dedicated assets must be identified before creating duplicates;
5. destructive asset changes require explicit authorization;
6. domain verification, partner assignment, ad-account linking and campaign/spend are outside MNT-M2-06 unless separately authorized;
7. browser tag deployment requires the applicable implementation/publish gate;
8. CAPI, partner/server gateways or external automation require their own architecture and mutation gates;
9. M2-02/M2-03/M2-04/M2-07/M2-08 controls remain binding.

## 11. Evidence required before MNT-M2-09 may claim Meta implementation

At minimum, later implementation evidence must capture, when Meta is in implementation scope:

- exact dedicated Meta Dataset ID adopted;
- exact Pixel/browser-source ID if a separate identifier exists in the observed account configuration;
- observed relationship between Dataset and Pixel/browser source;
- canonical production host association;
- browser configuration path through `GTM-PGCR4R47`;
- proof that no duplicate direct `fbq()`/second browser dispatcher exists;
- consent-gating behavior for the accepted user decision paths;
- exact mapping from canonical `mnt_*` source events to Meta destination events;
- no visitor PII/raw catalogue search text unless a later explicit user-data architecture authorizes a narrowly defined exception;
- no `mnt_lead_success`/lead mapping from an unverified Green signal;
- if CAPI is later used, explicit browser/server dedup proof for the same logical event.

If Meta is intentionally not implemented in MNT-M2-09, that must be stated explicitly rather than inferred from missing IDs.

## 12. Relationship to Lead Ads / CRM integrations

MNT-M2-06 governs **website Measurement ownership** for Meta Pixel/Dataset/CAPI.

Any separate Meta Lead Ads -> Green CRM integration, Facebook Page association or native lead-form routing is a distinct integration surface and does not by itself prove website Pixel/Dataset ownership, event implementation or consent behavior.

Such integrations must not be used as substitute evidence for this Measurement contract unless separately captured and adjudicated.

## 13. Relationship to MNT-M2-09 / MNT-M2-10 / MNT-M6

After acceptance of this design:

```text
MNT-M2-06 = META OWNERSHIP + TARGET TOPOLOGY DEFINED
MNT-M2-09 = TRACKING IMPLEMENTATION STILL PARTIAL / SEPARATE EXECUTION GATE
MNT-M2-10 = END-TO-END MEASUREMENT QA STILL OPEN
MNT-M6 = ATTRIBUTION / PAID-MEDIA OPTIMIZATION SEMANTICS STILL FUTURE
```

MNT-M2-06 completion does not authorize Meta asset creation, Pixel deployment, CAPI, domain verification, ad-account linking, campaigns or spend.

## 14. RESF C11 relationship

The C11 tracking contract requires destination and validation semantics in addition to the canonical source-event contract.

MNT-M2-06 establishes the governance/ownership target for the Meta destination while preserving unknown exact identifiers and runtime state.

Therefore:

```text
META_DESTINATION_GOVERNANCE = DEFINED
META_TARGET_TOPOLOGY = DEFINED
META_EXACT_DESTINATION_IDENTIFIERS = NOT_YET_PROVEN
META_RUNTIME_IMPLEMENTATION = NOT_CLAIMED
RESF_C11_FULL_RUNTIME_VALIDATION = STILL OPEN
```

## 15. Exit criteria

MNT-M2-06 may be accepted complete when all are true:

- MoreNumTegra Product Authority is established as governance owner for Meta Measurement decisions;
- target topology is one dedicated MoreNumTegra Dataset and one browser source relationship if browser collection is later implemented;
- exact Dataset/Pixel/Business identifiers remain `NOT_PROVEN` until actually observed;
- GTM remains the sole project-owned browser dispatcher;
- direct duplicate `fbq()` and duplicate project browser sources are prohibited by default;
- CAPI is explicitly optional/future and not silently introduced;
- destination-native dedup obligations are explicit before any future dual browser/server transport;
- consent/privacy boundaries remain intact without a second consent state machine;
- Lead Ads/CRM integration is not confused with website Measurement ownership;
- no Meta runtime/admin mutation occurred;
- the next implementation task remains separately gated.

This document satisfies those design/governance criteria without overstating current Meta-side implementation.
