# MNT-M6-03 — Google Ads Conversion Architecture v1

Date: 2026-09-22

Status: COMPLETE / DESIGN_CANONICALIZED / NO_EXTERNAL_PLATFORM_MUTATION

## 1. Purpose

Define the Google Ads conversion architecture for MoreNumTegra before any Google Ads account mutation, conversion-action creation, campaign launch or spend.

This task defines:
- conversion source and semantic;
- Google Ads goal/category;
- primary/secondary lifecycle;
- counting method;
- attribution-model boundary;
- conversion windows;
- GA4/Ads linking prerequisites;
- auto-tagging and click-ID requirements;
- deduplication strategy;
- native-tag vs Analytics-derived boundary;
- offline-conversion boundary;
- enhanced-conversion boundary;
- rollout, rollback and QA gates.

This task does not link accounts, enable auto-tagging, create a conversion action, mark a GA4 event as a key event, publish GTM, mutate GA4, create campaigns, authorize spend, upload offline conversions, enable enhanced conversions or send CRM/PII data to Google.

## 2. Canonical dependencies

Project authority:
- docs/attribution/MNT_M6_01_ATTRIBUTION_MODEL_IDENTIFIER_BOUNDARIES_V1_2026-09-22.md
- docs/attribution/MNT_M6_02_UTM_SOURCE_MEDIUM_CAMPAIGN_CONTRACT_V1_2026-09-22.md
- docs/attribution/MNT_UTM_CONTRACT_V1.json
- docs/measurement/MNT_M2_03_CANONICAL_EVENT_TAXONOMY_V1_2026-09-10.md
- docs/measurement/MNT_M2_04_PRIMARY_SECONDARY_CONVERSIONS_V1_2026-09-10.md
- docs/conversion/MNT_M5_07_GTM_PREVIEW_VALIDATION_2026-09-21.md
- docs/conversion/MNT_M5_08_GREEN_FORM46_CRM_HANDOFF_CONTRACT_2026-09-21.md

Accepted runtime semantics:
- source semantic event = mnt_lead_success
- GA4 destination event = generate_lead
- GTM container = GTM-PGCR4R47
- GA4 destination = G-57M2XR0CY2
- provider = Green Form 46
- valid lead = accepted Form 46 success only
- property price/value = not a conversion value
- visitor PII in Measurement = forbidden

## 3. V1 conversion-source decision

V1 Google Ads conversion source:

GA4 generate_lead -> Google Ads web conversion

The V1 architecture deliberately does not create a parallel native Google Ads website lead-conversion tag.

Reasons:
- mnt_lead_success -> GA4 generate_lead is already Production-validated;
- one initial conversion source minimizes duplicate-conversion risk;
- lead validity does not need to be reimplemented in another tag;
- the accepted pipeline already excludes CTA clicks, submit attempts and visitor PII.

Preserve:
- one business lead semantic;
- one initial Google Ads conversion source;
- no parallel Primary lead tag.

Google permits Analytics-based and native Ads conversion measurement, but MoreNumTegra V1 intentionally chooses the Analytics-derived path only.

## 4. Planned conversion action

Logical external display name:

MoreNumTegra | Lead Form 46 | GA4 generate_lead

Architecture:
- source = Google Analytics
- GA4 event = generate_lead
- project source semantic = mnt_lead_success
- category = Submit lead form
- business goal = Leads

The external Google Ads conversion-action ID does not exist yet and must not be invented.

Do not create initial Ads conversion actions for WhatsApp click, request_conditions, request_project_conditions, negotiate_scenario, schedule_visit, form start, submit attempt, project_interest or page view.

## 5. GA4 key-event prerequisite

Repository evidence proves generate_lead receipt in GA4 and the live GTM mapping.

Repository evidence does not prove the current GA4 administrative state:

generate_lead key-event status = NOT_LIVE_VERIFIED_BY_M6_03

M6-07 implementation preflight must read the live GA4 property.

Case A — already key event:
- use the existing generate_lead key event.

Case B — event exists but is not a key event:
- do not silently assume state;
- current Google workflow can create an Ads conversion from a GA4 event and may mark the selected event as a key event;
- that is an external mutation and belongs only to authorized M6-07 implementation with exact evidence.

Case C — event missing:
- STOP;
- do not create a substitute URL-based conversion;
- investigate Measurement regression first.

## 6. Ads ↔ GA4 link and auto-tagging

Prerequisites before conversion creation:
- correct GA4 property linked to the correct Google Ads account;
- Google Ads auto-tagging enabled;
- GCLID/BRAID query preservation proven.

M6-07 must record:
- exact Ads account identity;
- exact GA4 property identity;
- link state;
- auto-tagging state;
- GCLID/WBRAID/GBRAID survival through apex -> www redirect;
- absence of query cleanup that destroys those identifiers.

No account/customer ID is invented by M6-03.

## 7. Primary / secondary lifecycle

Initial integration state:

Google Ads action optimization = SECONDARY / OBSERVE ONLY

Rationale:
- conversion created from Analytics should be observed and QA'd before bidding authority;
- Secondary does not act as the normal bidding signal while integration is unproven;
- M6-08 must prove end-to-end behavior.

Promotion gate:

SECONDARY -> PRIMARY requires all of:
- M6-08 paid conversion QA = PASS;
- M6-06 budget/spend authorization = PASS;
- explicit Product Authority activation.

Promotion is an external Google Ads mutation and must occur only through the authorized external-platform release path.

A Primary action only influences bidding when the relevant campaign uses the goal containing that action.

## 8. Goal category

Canonical category:

Submit lead form

Reason:
- the accepted business outcome is a completed/accepted Form 46 lead;
- Google exposes Submit lead form as a lead conversion category;
- it is more precise than generic Contact.

No Google-hosted lead-form asset is implied.

## 9. Counting method

Canonical counting method:

One

Reason:
- this is lead generation, not e-commerce;
- Google guidance distinguishes One for leads from Every for sales;
- repeated lead occurrences after the same ad interaction should not inflate optimization.

Destination counting does not replace the project source guard:
- one accepted Form 46 occurrence -> at most one mnt_lead_success source event.

## 10. Conversion value

V1:
- use value = NO;
- value = NOT_DEFINED;
- currency = NOT_REQUIRED.

Do not use property price, financing amount, projected commission, arbitrary lead value or ticket value.

A future qualified-lead value model requires separate business evidence.

## 11. Conversion windows

V1 click-through window:

30 days

This matches the current Google Ads default click-through window and independently matches the project attribution window adopted in M6-02.

Important:
PROJECT_30_DAY_WINDOW != GOOGLE_ADS_CONVERSION_WINDOW

They are separate systems that happen to share the same V1 duration.

For initial Search scope:
- click-through = 30 days;
- engaged-view/view-through settings are not project optimization requirements;
- do not widen view windows merely to increase conversion count;
- if M6-04 later authorizes Video/Display/Demand Gen, those windows require explicit review.

## 12. Attribution model

Preferred Google Ads action attribution:

Data-driven, where available/default for the selected conversion source.

Rules:
- do not implement project-side imitation of Google DDA;
- project FIRST_ELIGIBLE_TOUCH + LAST_ELIGIBLE_TOUCH remains separate evidence;
- Google Ads attribution remains vendor-native;
- if the imported Analytics conversion exposes different or locked attribution behavior, record actual live state instead of silently forcing a broad GA4 property change.

## 13. Channels eligible for credit

Architectural target for the Ads conversion path:

Google paid channels

Reason:
- this conversion exists to measure/optimize Google Ads;
- project cross-channel acquisition evidence is separately preserved by M6-01/M6-02.

Current Google documentation indicates that this setting can affect linked Ads accounts and reporting prospectively.

Therefore:
- if live GA4 setting = Google paid channels: retain;
- if live GA4 setting = Paid and organic: STOP FOR MATERIAL SETTINGS DECISION.

M6-07 may not silently change a property-wide attribution setting merely to complete Ads setup.

## 14. Deduplication architecture

V1 dedupe is primarily architectural:

Green accepted lead
-> one mnt_lead_success
-> one GA4 generate_lead
-> one GA4-derived Google Ads conversion action

Additional controls:
- one mnt_event_id exists at source occurrence;
- Ads counting = One;
- no second native Ads lead action;
- no duplicate offline upload path;
- no Google-hosted lead-form action mapped to the same business outcome;
- CTA/WhatsApp actions are not promoted to the same Primary lead goal.

V1 does not map mnt_event_id to a Google Ads order/transaction ID because the GA4-derived path does not require one.

A future native/offline architecture must define explicit idempotency before activation.

## 15. Native Google Ads tag boundary

V1:
NATIVE_GOOGLE_ADS_LEAD_TAG = NOT_IMPLEMENTED

Do not fire a native Ads lead conversion alongside the GA4-derived conversion for the same Form 46 success.

A future native path requires:
1. new conversion action design;
2. explicit dedupe/migration plan;
3. observation as Secondary;
4. side-by-side QA;
5. only one Primary business lead action after cutover;
6. rollback plan.

## 16. Enhanced conversions

V1:
- ENHANCED_CONVERSIONS = NOT_AUTHORIZED
- HASHED_PII_UPLOAD = NOT_AUTHORIZED
- USER_PROVIDED_DATA = NOT_AUTHORIZED

Current Google documentation states that Analytics-imported conversions are not compatible with enhanced conversions; enhanced conversions require a Google Ads conversion action through a supported Google tag/GTM or user-data path.

Enhanced conversions are therefore a different architecture, not a checkbox on the chosen V1 conversion.

They also conflict with the current project boundary that visitor PII must not enter Measurement without a new privacy/security design.

## 17. Offline / CRM conversion import

V1:
- OFFLINE_CONVERSION_IMPORT = NOT_IMPLEMENTED / NOT_AUTHORIZED
- CRM_QUALIFIED_LEAD_IMPORT = NOT_IMPLEMENTED

Current blockers:
- no canonical provider-stable lead ID is proven in the browser contract;
- CRM transport of GCLID/BRAIDs is not authorized;
- no governed join exists between click ID and later qualified/sold lead;
- no secure server-side importer exists in MoreNumTegra;
- Green l_ and p_id are explicitly not lead/attribution IDs.

Do not improvise offline import from phone, email, name, hashed PII, Green redirect IDs, project name or property price.

## 18. Goal/default-goal boundary

The conversion belongs to the standard lead goal corresponding to Submit lead form.

Initial Secondary state means observation only.

Before promotion to Primary, verify:
- intended campaign goal includes this action;
- no sibling lead action would create duplicate Primary optimization;
- no custom goal accidentally makes the Secondary action biddable;
- no account-default goal expands optimization to unrelated campaigns.

## 19. Time-zone/reporting boundary

M6-07 preflight must record:
- Google Ads account time zone;
- GA4 property time zone.

Reporting dates may differ when the time zones differ.

Do not interpret date-level discrepancies as conversion loss until this is checked.

No time-zone change is authorized by M6-03.

## 20. Modeled-conversion boundary

Google may report modeled conversions when direct observation is incomplete.

Therefore:
GOOGLE_ADS_REPORTED_CONVERSIONS != RAW_FORM46_LEAD_COUNT

Do not expect exact numerical equality among:
- Green accepted leads;
- GA4 generate_lead;
- Google Ads attributed conversions;
- future modeled/vendor reports.

Differences require provenance analysis, not automatic bug classification.

## 21. Implementation preflight for M6-07

Before any Google Ads conversion creation:
1. resolve canonical MoreNumTegra main/runtime;
2. identify exact Google Ads customer account live;
3. identify exact GA4 property live;
4. prove Ads↔GA4 link state;
5. prove auto-tagging state;
6. prove generate_lead exists live;
7. prove whether generate_lead is already a GA4 key event;
8. read live channels-eligible-for-credit setting;
9. read current Ads/GA4 attribution settings;
10. read Ads/GA4 time zones;
11. inventory existing conversion actions for semantic duplicates;
12. inventory current account-default/custom goals;
13. prove gclid/wbraid/gbraid query survival through canonical redirects;
14. STOP if an existing conversion already represents the same Form 46 lead semantic.

## 22. Intended M6-07 implementation target

If later gates authorize external implementation:
- source = Google Analytics generate_lead;
- category = Submit lead form;
- optimization = Secondary initially;
- count = One;
- value = none;
- click window = 30 days;
- attribution = Data-driven where available;
- credit-channel target = Google paid channels, subject to live-setting gate;
- auto-tagging = enabled;
- native duplicate lead tag = absent;
- enhanced conversions = absent;
- offline import = absent.

No campaign spend is authorized by this design.

## 23. M6-08 QA obligations

At minimum M6-08 must prove:
1. exact conversion action exists once;
2. source is intended GA4 generate_lead;
3. category = Submit lead form;
4. initial optimization = Secondary;
5. count = One;
6. no fabricated conversion value;
7. click window = 30 days;
8. observed attribution setting is recorded;
9. Ads↔GA4 link is correct;
10. auto-tagging is enabled;
11. tagged landing preserves Google click ID;
12. accepted Form 46 lead produces one project lead event;
13. GA4 receives generate_lead;
14. Google Ads conversion becomes observable within provider propagation constraints;
15. no duplicate native Ads lead action fires;
16. no CTA/WhatsApp/submit attempt counts as lead;
17. no visitor PII enters project Measurement;
18. no CRM attribution transport occurs unless separately authorized;
19. denied-consent behavior remains compliant with the accepted consent model;
20. no unrelated campaign is bidding on the action.

A real Form 46 lead, if necessary for end-to-end QA, requires a bounded explicit QA authorization and controlled downstream handling.

## 24. Primary promotion gate

Promotion to Primary is not part of M6-03.

Eligible only after:
- M6-06 budget/spend authorization PASS;
- controlled M6-07 external implementation;
- M6-08 paid conversion QA PASS;
- explicit Product Authority activation.

Before promotion:
- verify no duplicate Primary lead action;
- verify campaign goal selection;
- record exact conversion action ID;
- preserve rollback to Secondary;
- do not combine budget/bid-strategy changes in the same unbounded step.

## 25. Rollback

If later implementation fails QA:
1. keep campaign spend off;
2. keep/revert action to Secondary;
3. remove it from optimization goals if necessary;
4. do not delete canonical GA4 generate_lead;
5. do not disable the MoreNumTegra source semantic event;
6. do not change Form 46;
7. record provider propagation delay separately from defects.

## 26. M6-03 canonical decisions

D01 V1_CONVERSION_SOURCE = GA4 generate_lead
D02 PROJECT_SOURCE_SEMANTIC = mnt_lead_success
D03 CATEGORY = Submit lead form
D04 INITIAL_OPTIMIZATION = Secondary
D05 PRIMARY_PROMOTION = POST_M6_08 + EXPLICIT_ACTIVATION
D06 COUNTING = One
D07 VALUE = NONE
D08 CLICK_WINDOW = 30 days
D09 ATTRIBUTION_MODEL = Data-driven where available
D10 CREDIT_CHANNEL_TARGET = Google paid channels / LIVE_SETTING_GATE
D11 ADS_GA4_LINK = REQUIRED
D12 AUTO_TAGGING = REQUIRED
D13 CLICK_ID_SURVIVAL = REQUIRED
D14 PARALLEL_NATIVE_LEAD_TAG = FORBIDDEN_V1
D15 MNT_EVENT_ID_AS_ADS_ORDER_ID = NOT_USED_V1
D16 ENHANCED_CONVERSIONS = NOT_AUTHORIZED
D17 OFFLINE_IMPORT = NOT_AUTHORIZED
D18 CRM_CLICK_ID_TRANSPORT = NOT_AUTHORIZED
D19 PROPERTY_PRICE_AS_VALUE = FORBIDDEN
D20 SECONDARY_INTENTS_AS_PRIMARY_ADS_CONVERSIONS = FORBIDDEN
D21 DUPLICATE_EXISTING_CONVERSION = STOP_CONDITION
D22 EXTERNAL_PLATFORM_MUTATION = NONE_BY_M6_03

## 27. External references observed

Official Google documentation observed on 2026-09-22:
- Create Google Ads conversions from Analytics events:
  https://support.google.com/google-ads/answer/2375435?hl=pt-BR
- Create conversions from Analytics key events:
  https://support.google.com/analytics/answer/10632359?hl=pt-BR
- Primary vs secondary actions:
  https://support.google.com/google-ads/answer/11461796?hl=pt-BR
- Conversion goals:
  https://support.google.com/google-ads/answer/10995103?hl=pt-BR
- Conversion counting/bidding:
  https://support.google.com/google-ads/faq/10286469?hl=en
- Conversion windows:
  https://support.google.com/google-ads/answer/3123169?hl=en
- Attribution models:
  https://support.google.com/google-ads/answer/6259715?hl=pt-BR
- Data-driven attribution:
  https://support.google.com/google-ads/answer/6394265?hl=pt-BR
- Auto-tagging:
  https://support.google.com/google-ads/answer/3095550?hl=pt-BR
- Updated conversion categories:
  https://support.google.com/google-ads/answer/9791434?hl=pt-BR
- Analytics attribution settings:
  https://support.google.com/analytics/answer/10597962?hl=pt-BR
- Enhanced conversions:
  https://support.google.com/google-ads/answer/13258081?hl=pt-BR

These references define provider behavior only. They do not authorize external mutation.

## 28. Acceptance

M6-03 is complete when this architecture is integrated into canonical main.

MNT-M6-03 = COMPLETE / DESIGN_CANONICALIZED / NO_EXTERNAL_MUTATION
accepted_scope_equivalent = 16h

Program progress after acceptance:
- forecast total = 1240h
- accepted = 960h
- remaining = 280h
- accepted percent = 77.42%

Next gate:
MNT-M6-04 — SEM campaign/query contract — 24h / AUTHORIZATION_REQUIRED
