# MNT-M6-02 — UTM / Source / Medium / Campaign Contract v1

Date: `2026-09-22`

Status: `COMPLETE / DESIGN_CANONICALIZED / NO_RUNTIME_OR_EXTERNAL_PLATFORM_MUTATION`

## 1. Purpose

Define the exact MoreNumTegra campaign-tagging contract that implements the M6-01 acquisition boundary without yet mutating runtime, GTM, GA4, Google Ads, Meta, Green/Form 46 or any paid-media platform.

M6-02 owns:

- UTM field names;
- project-generated UTM normalization;
- initial source/medium vocabulary;
- stable campaign identity;
- campaign-name grammar;
- optional content/term semantics;
- inbound attribution query allowlist;
- first/last eligible-touch update rules;
- persistence design and bounded lookback;
- direct/referral behavior;
- query propagation/cleanup rules;
- validation and security limits;
- QA vectors for later implementation.

## 2. Dependencies

Canonical project dependencies:

- `docs/attribution/MNT_M6_01_ATTRIBUTION_MODEL_IDENTIFIER_BOUNDARIES_V1_2026-09-22.md`;
- `docs/measurement/MNT_M2_03_CANONICAL_EVENT_TAXONOMY_V1_2026-09-10.md`;
- `docs/measurement/MNT_M2_04_PRIMARY_SECONDARY_CONVERSIONS_V1_2026-09-10.md`;
- `docs/conversion/MNT_M5_08_GREEN_FORM46_CRM_HANDOFF_CONTRACT_2026-09-21.md`;
- ADR-006 / current `www.moretegra.com.br` canonical host;
- current Consent Mode contract.

External reference behavior observed from current official Google documentation:

- GA4 manual traffic-source dimensions use campaign source, medium, campaign name, content and term;
- GA4 supports campaign ID for manual campaign/cost-data alignment;
- default channel classification depends on source/medium combinations;
- Google Ads ValueTrack/final-URL mechanisms can add controlled landing-page parameters.

These external semantics inform interoperability only. They do not create or authorize a campaign.

## 3. Canonical host

All project-owned attribution capture design is scoped to:

`https://www.moretegra.com.br/`

Apex behavior remains:

`https://moretegra.com.br/* -> 308 -> https://www.moretegra.com.br/*`

Implementation QA must prove that authorized attribution query parameters survive the apex-to-`www` redirect when present.

Vercel preview and `*.vercel.app` hosts must never create persistent production attribution state.

## 4. Canonical parameter set

### 4.1 Governed manual campaign fields

V1 recognizes:

```text
utm_id
utm_source
utm_medium
utm_campaign
utm_content
utm_term
```

Roles:

- `utm_id` = stable MoreNumTegra campaign registry key;
- `utm_source` = origin/platform token;
- `utm_medium` = marketing transport/channel token;
- `utm_campaign` = human-readable campaign slug;
- `utm_content` = optional controlled creative/placement variant;
- `utm_term` = optional controlled keyword/term token.

### 4.2 Google click identifiers

M6-01 reserved:

```text
gclid
wbraid
gbraid
```

M6-02 includes them in the inbound attribution-query allowlist so later implementation can preserve a valid click context.

They remain opaque and are not UTMs.

### 4.3 Explicitly not attribution fields

The following are not project attribution identities:

- Green `l_`;
- Green `p_id`;
- `project_name`;
- `offer_name`;
- `mnt_event_id`;
- route slug;
- property price;
- visitor PII;
- arbitrary unknown query parameters.

## 5. Governed UTM tuple

For a manually tagged MoreNumTegra campaign to qualify as a **governed UTM touch**, the minimum complete tuple is:

```text
utm_source + utm_medium + utm_campaign
```

For future **paid-media launch** through M6-07, the required tuple is stricter:

```text
utm_id + utm_source + utm_medium + utm_campaign
```

`utm_content` and `utm_term` remain optional.

A partial manual tuple such as only `utm_source` or only `utm_campaign` is not a governed UTM touch and must not populate project first/last UTM attribution.

A separately valid allowlisted Google click ID may still make the arrival an eligible click-attribution touch, but missing UTM fields must remain null; do not invent descriptors from the opaque click ID.

## 6. Stable campaign ID

M6-02 adopts a project-owned stable campaign key:

`utm_id`

Pattern:

```text
^mnt-cmp-[0-9]{6}$
```

Examples of **format only**, not active campaigns:

```text
mnt-cmp-000001
mnt-cmp-000002
```

Rules:

- allocated only through the canonical campaign registry/process;
- immutable after allocation;
- never recycled;
- not derived from Google/Meta campaign IDs;
- not derived from a project slug;
- not a user/session/lead/event ID;
- safe to use as a join key between future project campaign metadata and reporting/cost datasets;
- must not be interpreted as proof that an external campaign exists.

M6-04 owns creation of actual campaign records and allocation of real IDs.

## 7. Source vocabulary v1

Initial **project-generated paid-media** source tokens:

```text
google
facebook
instagram
youtube
```

No active campaign is implied by this allowlist.

Rules:

- lowercase ASCII only;
- platform/source name, not agency, seller, campaign goal or project name;
- do not use generic `meta` while the project needs GA4-compatible social-source classification;
- do not use `ads`, `paid`, `social_paid` or other ambiguous source tokens;
- source vocabulary extension requires contract revision or a governed registry extension.

Current v1 does not manually tag organic search/referral traffic into these values.

## 8. Medium vocabulary v1

Initial paid-media medium tokens:

```text
cpc
paid_social
paid_video
```

Approved v1 source/medium pairs:

```text
google / cpc
facebook / paid_social
instagram / paid_social
youtube / paid_video
```

Purpose:

- `google/cpc` aligns with paid-search semantics;
- recognized social sources + `paid_social` align with GA4 Paid Social channel rules;
- recognized video source + `paid_video` aligns with GA4 Paid Video channel rules.

Do not use `ppc`, `paidsearch`, `social-paid`, `meta_ads`, `cpa` or arbitrary synonyms in project-generated URLs.

New media such as display, email, messaging, QR/offline, affiliates or future platforms require explicit extension because they can affect GA4 default-channel classification and reporting consistency.

## 9. Google Ads interoperability

Google Ads auto-tagging/vendor-native attribution and project UTMs are separate layers.

For future Google Search campaigns:

```text
vendor click identity = gclid/wbraid/gbraid when provided
project source/medium = google/cpc when manually tagged under this contract
project campaign identity = utm_id
project campaign label = utm_campaign
```

Rules:

- do not copy GCLID/BRAID values into any `utm_*` field;
- do not derive `utm_campaign` from a click ID;
- do not assume a Google click ID alone identifies Search vs Video vs other campaign type;
- later M6-03/M6-04 must define the exact Google Ads final-URL-suffix/ValueTrack implementation;
- auto-tagging is not disabled by this contract.

## 10. Campaign-name grammar

`utm_campaign` is a controlled human-readable slug, not the stable technical key.

Required syntax:

```text
lowercase ASCII
letters/digits/hyphen only
length: 3..96
regex: ^[a-z0-9]+(?:-[a-z0-9]+)*$
```

Recommended semantic shape for future M6-04 campaign records:

```text
<target>-<objective>-<geo>-<period>
```

Format-only examples:

```text
aria-higienopolis-leads-sp-202609
portfolio-tegra-leads-sp-202609
```

These examples are not active/approved campaigns.

Business logic must not parse critical semantics from the string. The stable `utm_id` maps to a governed campaign registry record containing the authoritative metadata.

## 11. Content and term

### 11.1 utm_content

Optional.

Purpose:

- distinguish controlled creative;
- distinguish controlled placement/ad variant when useful.

Rules:

- lowercase ASCII slug;
- 1..96 characters;
- same slug character policy as campaign;
- no PII;
- no full ad copy;
- no free-form user input;
- no URL.

### 11.2 utm_term

Optional and primarily reserved for later Search/SEM contract.

Rules:

- may represent a controlled keyword/token approved in M6-04;
- must not contain the visitor's raw search query;
- must not copy free-form site-search input;
- must not contain PII;
- lowercase ASCII slug;
- 1..128 characters.

If M6-04 chooses Google Ads ValueTrack `{keyword}` or another mechanism, it must prove that the captured value complies with this controlled-term boundary.

## 12. Inbound attribution query allowlist

Only these query parameters may participate in project attribution v1:

```text
utm_id
utm_source
utm_medium
utm_campaign
utm_content
utm_term
gclid
wbraid
gbraid
```

Unknown parameters:

- remain ordinary URL inputs;
- are ignored by project attribution;
- are never copied wholesale into attribution storage/dataLayer/CRM;
- do not become trusted because they came from an ad or referral.

Green `l_` and `p_id` may remain part of the provider thank-you/navigation lifecycle but stay outside attribution.

## 13. Validation and length boundaries

Project-generated UTM values must already be canonical; runtime should not try to "repair" a malformed campaign.

Caps:

```text
utm_id       <= 32 chars
utm_source   <= 64 chars
utm_medium   <= 64 chars
utm_campaign <= 96 chars
utm_content  <= 96 chars
utm_term     <= 128 chars

gclid/wbraid/gbraid <= 512 chars each
```

UTM accepted character class:

`[a-z0-9-]`

`utm_id` additionally follows its exact `mnt-cmp-NNNNNN` pattern.

Click identifiers:

- decoded once through standards-based URL parsing;
- preserved exactly after URL parsing;
- not lowercased;
- not regex-parsed for meaning;
- rejected from persistence if empty or over the project cap.

Malformed/over-limit attribution fields must be ignored for attribution without breaking page rendering, CTA, Form 46 or navigation.

## 14. Eligible-touch rules

A page arrival is an M6 project **eligible touch** when at least one is true:

1. it contains a complete governed UTM tuple;
2. it contains at least one valid allowlisted Google click identifier.

If only click ID is valid:

- the click identifier may be retained in the touch record after consent;
- UTM descriptors remain null unless actually present and valid.

If both are present:

- preserve both layers;
- never merge/collapse them into one identifier.

## 15. Direct, internal and untagged-referral behavior

### 15.1 Direct

Direct navigation does not create a new project eligible touch.

It must not overwrite an existing first or last eligible touch.

### 15.2 Internal navigation

Navigation between MoreNumTegra pages is not a new acquisition touch.

Internal links must not mechanically propagate attribution query parameters.

### 15.3 Untagged external referral / organic

V1 project-level first/last touch does **not** build a second referral/search-engine classifier.

Therefore, an external arrival without governed UTMs or an allowlisted click ID does not create a project eligible touch.

GA4/vendor-native source/referrer processing remains the authority for untagged organic/referral classification.

This is intentional:

```text
PROJECT_CAMPAIGN_ATTRIBUTION != REIMPLEMENT_GA4_TRAFFIC_CLASSIFIER
```

A future CRM/referral-attribution requirement needs a separate extension.

## 16. First/last touch update algorithm

After a valid eligible touch is observed:

### 16.1 Before affirmative consent

- parse only the allowlisted fields required to evaluate the current page;
- keep any candidate touch in page-memory only;
- do not persist project attribution in localStorage/sessionStorage/cookies;
- do not transmit the project attribution snapshot to CRM;
- do not create a second consent state machine.

### 16.2 On affirmative consent

Future implementation may persist the pending valid touch into:

`localStorage["mnt_attribution_v1"]`

No implementation is authorized by M6-02 itself.

State shape:

```json
{
  "version": 1,
  "window_started_at": "<ISO-8601>",
  "expires_at": "<ISO-8601>",
  "first_eligible_touch": {},
  "last_eligible_touch": {}
}
```

Touch shape:

```text
captured_at
landing_path
utm_id?
utm_source?
utm_medium?
utm_campaign?
utm_content?
utm_term?
gclid?
wbraid?
gbraid?
```

Do not store:

- full landing URL;
- arbitrary query string;
- document.referrer full URL;
- name/e-mail/phone;
- IP;
- user agent;
- Green l_/p_id;
- Form 46 free text.

### 16.3 Update rules

For a new valid touch inside the active window:

- if no first touch exists -> set first and last to the touch;
- otherwise first remains immutable;
- last becomes the new eligible touch;
- direct/internal/untagged arrivals do not change either snapshot.

Repeated reload of the same tagged landing does not create a project business event. Storage implementation should avoid unnecessary writes when the normalized touch is identical.

## 17. Persistence window

V1 project attribution window:

`30 days`

Semantics:

- fixed window starts when the first eligible touch is persistently accepted after consent;
- `expires_at = window_started_at + 30 days`;
- later touches update `last_eligible_touch` but do not extend the window;
- after expiry, the stored state is invalid and must be cleared;
- the next eligible consented touch starts a new 30-day window.

Rationale:

- bounded data minimization;
- avoids silently inheriting a vendor-specific Ads/GA4 attribution window;
- easy to reason about and QA;
- may be revised only by an explicit later attribution decision.

This 30-day project window does not change Google Ads/GA4 native attribution windows.

## 18. Consent reversal / denial

Future implementation contract:

- explicit denied state -> no persistent project attribution capture;
- transition from granted to denied -> clear `mnt_attribution_v1`;
- lead submission must continue to work even if attribution persistence is unavailable;
- denied state must never be "worked around" by moving campaign IDs into Form 46 free text.

Vendor Consent Mode behavior remains separate from this project storage rule.

## 19. URL/canonical/query behavior

M6-02 chooses a conservative V1 query policy:

```text
NO_DESTRUCTIVE_QUERY_CLEANUP_BY_DEFAULT
NO_INTERNAL_UTM_PROPAGATION
CANONICAL_URL_REMAINS_CLEAN
```

Therefore:

- an inbound tagged URL may remain visible in the address bar for the current page;
- do not call `history.replaceState` merely to remove UTMs/click IDs until an implementation slice proves no attribution/provider regression;
- canonical/OG/JSON-LD/sitemap URLs remain query-free;
- internal navigation uses clean route URLs and does not append the current attribution query;
- apex -> www redirect must preserve the authorized inbound query for the landing request;
- thank-you/provider query handling remains governed by the existing Form 46 contract, not by UTM propagation.

## 20. Campaign registry boundary

M6-02 defines the registry concept but creates **no active campaign**.

Future campaign registry record must include at minimum:

```text
utm_id
utm_campaign
source
medium
objective
target_scope
landing_route
geo_scope
status
valid_from
valid_to?
external_platform?
external_campaign_id?
provenance
```

Rules:

- `external_campaign_id` is optional platform metadata, not the project key;
- one `utm_id` maps to one governed project campaign identity;
- campaign rename must not change `utm_id`;
- campaign records are not proof of spend;
- only authorized active records may be used to generate paid-media landing URLs.

M6-04 owns actual SEM campaign/query records.

## 21. QA vectors for implementation

Before a runtime attribution implementation can be accepted, minimum tests include:

1. canonical `www` tagged landing with valid UTM tuple;
2. apex tagged landing preserves query through 308 to `www`;
3. direct landing with no existing state creates no touch;
4. direct landing with existing state does not overwrite;
5. internal navigation does not propagate UTMs;
6. unknown query params are ignored;
7. partial UTM tuple does not become governed UTM attribution;
8. over-limit/malformed UTM value is ignored without page/form failure;
9. valid GCLID-only landing remains click-ID-only, with no invented campaign name;
10. UTMs + GCLID preserve both layers;
11. consent denied -> no persistent project attribution state;
12. consent granted on same page -> valid pending touch becomes eligible for persistence;
13. granted -> later denied clears project attribution state;
14. first touch remains immutable within 30-day window;
15. second eligible campaign updates only last touch;
16. expiry invalidates state and next valid touch starts a new window;
17. preview/`vercel.app` creates no production attribution state;
18. Form 46 payload remains unchanged unless a later CRM contract explicitly changes it;
19. no PII appears in attribution state/dataLayer;
20. canonical/robots/schema remain query-free.

## 22. Machine-readable contract

Canonical companion:

`docs/attribution/MNT_UTM_CONTRACT_V1.json`

Consumers may use that file for validators/generators, but the Markdown contract remains the semantic authority where JSON cannot express rationale.

## 23. M6-02 decisions

```text
D01 UTM_MIN_GOVERNED_TUPLE = source + medium + campaign
D02 PAID_LAUNCH_REQUIRED_TUPLE = id + source + medium + campaign
D03 STABLE_CAMPAIGN_KEY = utm_id / mnt-cmp-NNNNNN
D04 PAID_SOURCE_V1 = google/facebook/instagram/youtube
D05 PAID_MEDIUM_V1 = cpc/paid_social/paid_video
D06 GOOGLE_SEARCH_PAIR = google/cpc
D07 FACEBOOK_PAIR = facebook/paid_social
D08 INSTAGRAM_PAIR = instagram/paid_social
D09 YOUTUBE_PAIR = youtube/paid_video
D10 CAMPAIGN_NAME = CONTROLLED HUMAN-READABLE SLUG / NOT TECHNICAL KEY
D11 UTM_CONTENT = OPTIONAL CONTROLLED CREATIVE VARIANT
D12 UTM_TERM = OPTIONAL CONTROLLED TERM / NEVER RAW USER QUERY
D13 INBOUND_ATTRIBUTION_ALLOWLIST = UTMS + gclid/wbraid/gbraid
D14 DIRECT_INTERNAL = NEVER OVERWRITE ELIGIBLE TOUCH
D15 UNTAGGED_REFERRAL_ORGANIC = VENDOR-NATIVE ONLY IN V1
D16 PRE_CONSENT = MEMORY_ONLY / NO PERSISTENCE
D17 PERSISTENCE_AFTER_GRANTED = localStorage mnt_attribution_v1 / FUTURE IMPLEMENTATION
D18 PROJECT_WINDOW = FIXED 30 DAYS
D19 CONSENT_DENIED = NO PERSISTENCE / CLEAR PROJECT STORE
D20 QUERY_CLEANUP = NO DESTRUCTIVE CLEANUP BY DEFAULT
D21 INTERNAL_UTM_PROPAGATION = FORBIDDEN
D22 CRM_ATTRIBUTION_TRANSPORT = STILL NOT AUTHORIZED
D23 ACTIVE_CAMPAIGNS_CREATED = ZERO
D24 RUNTIME_MUTATION = NONE
```

## 24. External references observed

Official Google documentation observed on `2026-09-22`:

- GA4 traffic-source dimensions: `https://support.google.com/analytics/answer/15612152?hl=pt-BR`
- GA4 campaign/traffic-source collection: `https://support.google.com/analytics/answer/11242841?hl=pt-BR`
- GA4 manual vs automatic tagging: `https://support.google.com/analytics/answer/11242870?hl=pt-BR`
- GA4 default channel groups: `https://support.google.com/analytics/answer/9756891?hl=pt-BR`
- Google Ads ValueTrack: `https://support.google.com/google-ads/answer/6305348?hl=pt-BR`

These references support interoperability choices only.

## 25. Acceptance

M6-02 is complete when this contract and its machine-readable companion are integrated into canonical `main`.

```text
MNT-M6-02 = COMPLETE / DESIGN_CANONICALIZED / NO_RUNTIME_MUTATION
accepted_scope_equivalent = 8h
```

Program progress:

```text
FORECAST_TOTAL_HOURS = 1240
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 944
REMAINING_FORECAST_HOURS = 296
ACCEPTED_PERCENT = 76.13
```

Next gate:

`MNT-M6-03 — Google Ads conversion architecture — 16h / AUTHORIZATION_REQUIRED`.
