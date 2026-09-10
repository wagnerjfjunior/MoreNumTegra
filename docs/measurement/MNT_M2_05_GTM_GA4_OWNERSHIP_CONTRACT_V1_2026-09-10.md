# MNT-M2-05 — GTM / GA4 Ownership Contract v1

- Project: `MoreNumTegra`
- Program: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Task: `MNT-M2-05 — Define ownership for MoreNumTegra GTM and GA4`
- Mode: `DESIGN / GOVERNANCE ONLY / NO RUNTIME OR ADMIN MUTATION`
- Product Authority authorization: explicit start authorization in project conversation on `2026-09-10`
- Canonical main resolved before execution: `d7090a4df966c5ad39b06e52fdcbb99e97ca158a`
- Existing GTM evidence: `docs/measurement/MNT_M2_GTM_CONSENT_T1_2026-09-10.md`
- Transport dependency: `docs/measurement/MNT_M2_02_TRANSPORT_DEDUP_ARCHITECTURE_2026-09-10.md`
- Taxonomy dependency: `docs/measurement/MNT_M2_03_CANONICAL_EVENT_TAXONOMY_V1_2026-09-10.md`
- Conversion dependency: `docs/measurement/MNT_M2_04_PRIMARY_SECONDARY_CONVERSIONS_V1_2026-09-10.md`
- RESF provider pin: `wagnerjfjunior/Blogs-sites-portais-seo@7a61aa036d677015ee4540ca8c5dc9a41f0165d4`
- RESF C11 template consulted: `docs/frameworks/resf/templates/TRACKING_CONTRACT.template.yaml`
- Runtime/admin mutation by this task: `NONE`
- Status when this revision is integrated into canonical `main`: `COMPLETE`

## 1. Purpose

Define who governs the MoreNumTegra browser Measurement container and GA4 destination, what Google-side topology is allowed, who may authorize administrative/configuration changes, and what evidence must exist before runtime implementation.

This task does not create a GA4 property, data stream, Google tag, key event, Ads link, user access, GTM version, tag or trigger.

Preserve:

```text
GOVERNANCE OWNERSHIP != PROOF OF GOOGLE ACCOUNT CREDENTIAL HOLDER
GTM CONTAINER PRESENT != GA4 PROPERTY PRESENT
GA4 TARGET TOPOLOGY DEFINED != GA4 CREATED
GA4 CREATED != EVENTS IMPLEMENTED
EVENT IMPLEMENTED != END-TO-END VALIDATED
PROJECT CONVERSION ROLE != GA4 KEY-EVENT CONFIGURATION
```

## 2. Ownership vocabulary

For this contract:

- `GOVERNANCE_OWNER` = project authority that decides purpose, allowed destinations, architecture and mutation gates;
- `ADMINISTRATIVE_OPERATOR` = person/account that performs an explicitly authorized Google-side change;
- `RUNTIME_DISPATCHER` = browser-side project transport component;
- `ANALYTICS_DESTINATION` = GA4 property/stream receiving authorized project events;
- `SERVICE_PROVIDER` = advisory/execution support without implicit project authority.

Credentials, personal Google account e-mails, recovery methods and secrets must not be committed to GitHub.

## 3. GTM ownership contract

### 3.1 Existing evidence-backed container

Canonical project browser dispatcher:

```text
GTM_CONTAINER_ID = GTM-PGCR4R47
GTM_GOVERNANCE_OWNER = MoreNumTegra / Product Authority
GTM_RUNTIME_ROLE = SOLE_PROJECT_OWNED_BROWSER_DISPATCHER
CURRENT_ACCEPTED_PUBLISHED_BASELINE = VERSION_4_CONSENT
```

Evidence proves the container ID and published Consent Mode Version 4. It does **not** prove the identity of every Google account user or credential holder.

Therefore:

```text
GTM_CONTAINER_ID = PROVEN
GTM_GOVERNANCE_OWNERSHIP = DEFINED_BY_PROJECT
GTM_GOOGLE_ACCOUNT_ID = NOT_RECORDED
GTM_USER_ACCESS_ROSTER = NOT_RECORDED
GTM_CREDENTIAL_HOLDERS = NOT_IN_SCOPE / DO_NOT_STORE_IN_REPO
```

### 3.2 Administrative boundary

Only a Product Authority-approved operator may perform material GTM changes for MoreNumTegra. Advisory providers do not gain mutation authority by supplying recommendations.

Without a new explicit implementation gate:

- do not publish a new GTM version;
- do not add a second MoreNumTegra GTM container;
- do not add GA4/Ads/Meta business tags;
- do not alter the accepted Version 4 Consent state machine;
- do not move event semantics outside the canonical `mnt_*` taxonomy.

A second browser container for the same MoreNumTegra surface is forbidden unless a later architecture decision explicitly supersedes the single-dispatcher contract.

## 4. GA4 ownership and target topology

### 4.1 Governance ownership

The required GA4 destination is project-owned at the governance level:

```text
GA4_GOVERNANCE_OWNER = MoreNumTegra / Product Authority
GA4_PROPERTY_SCOPE = MoreNumTegra only
GA4_CROSS_PROJECT_PROPERTY_REUSE = FORBIDDEN_BY_DEFAULT
GA4_CONFIGURATION_AUTHORITY = PRODUCT_AUTHORITY_GATE_REQUIRED
```

A service provider, Green Sales, Tegra corporate systems, another real-estate project or another site must not be treated as the MoreNumTegra GA4 owner merely because it can receive traffic, supply content, host a page or provide advice.

### 4.2 Property rule

MoreNumTegra Measurement must use **one dedicated GA4 property for this project surface**. The property may live inside an existing Product Authority-controlled Google Analytics account; a dedicated Google Analytics account is not required by this contract.

Before implementation, the operator must either:

1. prove an existing dedicated MoreNumTegra GA4 property and adopt its exact identifiers; or
2. obtain the applicable mutation authorization and create a dedicated MoreNumTegra GA4 property.

Do not create a duplicate property simply because the identifiers are absent from GitHub.

Current evidence state:

```text
GA4_PROPERTY_EXISTS = NOT_PROVEN_IN_CANONICAL_EVIDENCE
GA4_PROPERTY_ID = NOT_PROVEN
GA4_ACCOUNT_ID = NOT_PROVEN / NOT_REQUIRED_IN_REPOSITORY
```

`NOT_PROVEN` is not equivalent to `DOES_NOT_EXIST`.

### 4.3 Web data-stream rule

The production destination topology is:

```text
GA4_PRODUCTION_WEB_STREAM_COUNT_TARGET = 1
GA4_PRODUCTION_HOST = moretegra.com.br
www.moretegra.com.br = PROJECT_BUSINESS_MEASUREMENT_BLOCKED
morenumtegra.vercel.app = NOT_PRODUCTION_MEASUREMENT_HOST
```

The exact stream ID and Measurement ID must be captured as governed evidence before GA4 runtime implementation is accepted.

Current evidence state:

```text
GA4_STREAM_ID = NOT_PROVEN
GA4_MEASUREMENT_ID = NOT_PROVEN
GOOGLE_TAG_FOR_GA4 = NOT_PROVEN / NOT_CREATED_BY_THIS_TASK
```

No identifier may be invented from naming patterns.

## 5. Responsibility matrix

| Area | Accountable authority | Execution role | Boundary |
|---|---|---|---|
| GTM purpose/architecture | MoreNumTegra Product Authority | authorized Measurement operator | must preserve single dispatcher + Consent baseline |
| GTM material mutation/publish | MoreNumTegra Product Authority gate | authorized GTM operator | MNT-M2-09 or later explicit gate |
| GA4 property adoption/creation | MoreNumTegra Product Authority | authorized GA4 operator | exact existing ID must be proven or creation separately authorized |
| GA4 stream/configuration | MoreNumTegra Product Authority | authorized GA4/GTM operator | canonical host only; no invented IDs |
| Event semantics | MoreNumTegra canonical M2-03 contract | implementation operator | operator may map, not redefine semantics |
| Conversion semantics | MoreNumTegra canonical M2-04 contract | implementation operator | vendor settings must not redefine lead validity |
| Green Form 46 | Green platform + MoreNumTegra product contract | Green native lifecycle | not an analytics ownership surface |
| RESF provider | none over consumer runtime | advisory/service-provider role | guidance != mutation authority |
| End-to-end proof | MoreNumTegra program | MNT-M2-10 QA | implementation evidence required |

## 6. Administrative controls

The following rules apply to future Google-side administration:

1. least privilege: operators receive only the access needed for the authorized task;
2. no shared password or secret in repository/docs/client code;
3. exact property/stream/Measurement IDs are evidence, not secrets, but must only be recorded after observed/proven;
4. material GTM publish requires an explicit project gate and version evidence;
5. GA4 property/stream creation or destructive administration requires explicit mutation authorization;
6. deleting or repurposing the accepted GTM container is not authorized by this task;
7. linking GA4 to Google Ads, Search Console or other products is outside MNT-M2-05 unless separately authorized;
8. user-provided data, enhanced conversions, hashed PII or advertising-user-data features are not authorized by this contract;
9. project event/PII/consent rules from MNT-M2-02/03/04/07/08 remain binding.

## 7. GA4 collection boundary for later MNT-M2-09

If/when implementation is authorized, GA4 must remain a **destination** behind the project-owned GTM dispatcher.

Expected transport shape:

```text
verified user/runtime occurrence
-> one canonical mnt_* dataLayer event
-> GTM-PGCR4R47
-> canonical-host + consent + eligibility controls
-> dedicated MoreNumTegra GA4 property/web stream
```

No direct application `gtag()` path, duplicate GA4 bootstrap, Green-forwarded `/page/view`, or second dispatcher is authorized.

All canonical diagnostic events may be candidates for GA4 collection under later implementation, but this task does not activate them. `mnt_lead_success` remains blocked until the stable native Green Form 46 success signal is proven.

## 8. GA4 key events and vendor administrative semantics

MNT-M2-05 does not automatically mark any GA4 event as a key event.

The project-level roles remain:

```text
PRIMARY = mnt_lead_success
SECONDARY = allowlisted explicit mnt_intent contact/request types
NONE = page/section/filter/search/project_interest/form_start/form_submit_attempt
```

Any later GA4 key-event configuration must preserve these meanings and requires the applicable implementation gate. Google Ads primary/secondary action semantics remain MNT-M6 territory and must not be inferred from the project labels.

## 9. Evidence required before MNT-M2-09 may claim GA4 implementation

At minimum, later implementation evidence must capture:

- exact GTM container = `GTM-PGCR4R47`;
- exact GA4 property ID actually adopted;
- exact GA4 web data-stream ID actually adopted;
- exact GA4 Measurement ID actually adopted;
- canonical production host association;
- Google tag/GA4 configuration path through GTM;
- proof that no duplicate direct GA4 path exists;
- consent behavior for denied/granted states;
- event mapping from canonical `mnt_*` source events;
- exclusion of visitor PII and raw catalogue search text;
- proof that `mnt_lead_success` is not implemented from a weak/unverified signal.

If an existing property/stream is discovered, record it before deciding whether any creation is necessary.

## 10. Relationship to MNT-M2-06 / MNT-M2-09 / MNT-M2-10

After acceptance of this design:

```text
MNT-M2-05 = GTM/GA4 OWNERSHIP + TARGET TOPOLOGY DEFINED
MNT-M2-06 = META OWNERSHIP STILL SEPARATE
MNT-M2-09 = RUNTIME CONFIGURATION STILL PARTIAL / SEPARATE GATE
MNT-M2-10 = END-TO-END PROOF STILL OPEN
```

MNT-M2-05 completion does not authorize property creation, GTM publication or GA4 deployment.

## 11. RESF C11 relationship

The C11 tracking contract requires destination and validation semantics in addition to canonical page/product/funnel/event semantics.

MNT-M2-05 establishes the governance/ownership target for the Google destination but deliberately does not fabricate a destination identifier that has not been observed.

Therefore:

```text
GTM_DESTINATION_GOVERNANCE = DEFINED
GA4_DESTINATION_GOVERNANCE = DEFINED
GA4_EXACT_DESTINATION_IDENTIFIERS = NOT_YET_PROVEN
RESF_C11_FULL_RUNTIME_VALIDATION = STILL OPEN
```

## 12. Exit criteria

MNT-M2-05 may be accepted complete when all are true:

- the existing canonical GTM container is identified without inventing account/user ownership evidence;
- MoreNumTegra Product Authority is established as governance owner for GTM/GA4 decisions;
- GA4 is constrained to one dedicated MoreNumTegra property and one production web stream target for `moretegra.com.br`;
- `www` and Vercel remain outside project production Measurement;
- property/account/stream/Measurement IDs remain `NOT_PROVEN` until actually observed;
- administrative/operator responsibilities and mutation gates are explicit;
- no vendor key-event/Ads configuration is implied;
- no runtime or Google-admin mutation occurred;
- next task remains separately gated.

This document satisfies those design/governance criteria without overstating current Google-side implementation.