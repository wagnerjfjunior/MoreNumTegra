# MNT-M2-09 — GA4 denied clean-room cookie/network evidence T7 — 2026-09-11

- Project: `MoreNumTegra`
- Task: `MNT-M2-09 — Implement authorized tracking configuration`
- Environment: `https://moretegra.com.br` under GTM Preview / Tag Assistant
- GTM container: `GTM-PGCR4R47`
- GA4 destination: `G-57M2XR0CY2`
- Consent under test: all four signals `DENIED`
- GTM publication: `NOT_PERFORMED`

## Evidence supplied by Product Authority

Clean-session screenshots:

```text
32922c2b-77ba-4096-9055-d59f400984d2.png
SHA-256 54e72b801d6da6019c28e1123c841c4b881796b5ac45ae588881fee889785d4d

89615898-c04d-4a6d-a3fe-f9b17f0bfb23.png
SHA-256 a7842f8c2ca46e490bf7928f35d2975b73023c6bb8ea0190fa60ac8a0018ec91

9e2a7427-a184-42e1-b9a9-d7ef75acf08b.png
SHA-256 746a2e41dec815ccb833d57698d7da28ea5f25ee8a1ff288d714fb2af41d841b

06b6410e-96b4-487a-9711-99b5b0a489ef.png
SHA-256 446d7e97373a3602944ce9d2c1ea86d8d0e1fa30e003980f57058880c1eebd4f
```

Uploaded HAR:

`TAG Teste 2 moretegra.com.br.har`

SHA-256:

`bb8a91662a61927f69de7789f5faa578cb318b47b4239ab7612ac0b4853685f3`

## Observed clean-session sequence

1. `Application -> Cookies -> https://moretegra.com.br` was empty in the clean session before the synthetic project event.
2. Tag Assistant showed the project event under a current consent state where all four signals were denied:

```text
ad_storage = denied
analytics_storage = denied
ad_user_data = denied
ad_personalization = denied
```

3. A synthetic `mnt_page_view` was pushed with project parameters.
4. After the event, `Application -> Cookies -> https://moretegra.com.br` remained empty; no `_ga` or `_ga_*` cookie was shown.

## HAR adjudication

The second clean-session HAR contains exactly one GA4 network request matching the test:

```text
POST https://www.google-analytics.com/g/collect
HTTP 204
tid=G-57M2XR0CY2
gcs=G100
pscdl=denied
npa=1
en=page_view
ep.mnt_event_id=qa-pageview-denied-002
```

For this GA4 request:

```text
request Cookie header = none observed
HAR request cookies = none observed
response Set-Cookie = none observed
HAR response cookies = none observed
```

The HAR text contains no `_ga` / `_ga_*` cookie names.

## Supported adjudication

Combined clean-session screenshot + HAR evidence supports:

```text
CLEAN_SESSION_COOKIE_JAR_BEFORE_TEST = EMPTY
CONSENT_CURRENT_STATE_ALL_FOUR = DENIED
GA4_EVENT_NETWORK_PING_WHILE_DENIED = PROVEN
GA4_REQUEST_COUNT_FOR_CLEAN_TEST = 1
GA4_DESTINATION = G-57M2XR0CY2 = PROVEN
GA4_REQUEST_COOKIE_HEADER = NONE_OBSERVED
GA4_RESPONSE_SET_COOKIE = NONE_OBSERVED
FIRST_PARTY__GA_COOKIE_AFTER_DENIED_TEST = NONE_OBSERVED
```

Therefore the denied-state behavior is consistent with Advanced Consent Mode cookieless measurement and passes the bounded cookie-suppression test performed here.

```text
DENIED_STATE_COOKIE_SUPPRESSION = PASS
ADVANCED_CONSENT_MODE_CLEAN_ROOM_BEHAVIOR = PASS_FOR_THIS_TEST
```

## Limits

This does not by itself prove every future browser/session/user-agent case. It also does not close `MNT-M2-09` or `MNT-M2-10`.

Still open:

1. bounded synthetic tests for `mnt_section_click`, `mnt_catalog_filter`, `mnt_catalog_search`, and `mnt_intent`, proving one intended firing each and no cross-fire;
2. consolidation of branch-only source instrumentation into canonical `src-greenn/moretegra.js` and removal of the temporary staging file;
3. later real-source runtime proof after separately authorized Green artifact publication;
4. no GTM Submit/Publish until its own gate.
