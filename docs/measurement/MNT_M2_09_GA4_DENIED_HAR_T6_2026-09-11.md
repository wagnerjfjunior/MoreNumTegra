# MNT-M2-09 — GA4 denied-state HAR evidence T6 — 2026-09-11

- Project: `MoreNumTegra`
- Task: `MNT-M2-09 — Implement authorized tracking configuration`
- Environment: production host `https://moretegra.com.br` under GTM Preview / Tag Assistant
- GTM container: `GTM-PGCR4R47`
- GA4 destination: `G-57M2XR0CY2`
- Consent state under test: all four signals `DENIED`
- GTM publication: `NOT_PERFORMED`

## HAR evidence

Uploaded HAR:

`TAG Teste moretegra.com.br.har`

SHA-256:

`60f0da30648c75e8e364070dc3e1a5f33e955604572aa8b00908990dea6b3b71`

The HAR contains three GA4 `POST https://www.google-analytics.com/g/collect` requests with HTTP `204` responses.

Observed destination and consent-related parameters include:

```text
tid=G-57M2XR0CY2
gcs=G100
pscdl=denied
npa=1
en=page_view
```

Observed source-event IDs:

```text
qa-pageview-denied-001
qa-pageview-denied-002
qa-pageview-denied-002
```

The two `qa-pageview-denied-002` requests occurred at different times, so this HAR alone does not prove duplicate dispatch from one source occurrence. The same manually chosen test event id was reused across multiple test pushes.

For all three GA4 collect requests:

```text
request Cookie header / HAR request cookies = none observed
response Set-Cookie / HAR response cookies = none observed
origin = https://moretegra.com.br
referer = https://moretegra.com.br/
```

The project parameters were present in the network payload, including `mnt_event_id`, `mnt_event_version`, `route`, `funnel_stage`, `placement`, `page_identity`, and `product_identity`.

## Adjudication

Supported by the combined Tag Assistant screenshots + HAR:

```text
CONSENT_DEFAULT_DENIED = PROVEN
CONSENT_UPDATE_DENIED = PROVEN
ANALYTICS_STORAGE_DENIED_AT_TEST = PROVEN
GA4_EVENT_TAG_EXECUTES_WHILE_DENIED = PROVEN
GA4_NETWORK_COLLECT_WHILE_DENIED = PROVEN
GA4_DESTINATION_ID = G-57M2XR0CY2 = PROVEN
NETWORK_REQUEST_COOKIES_TO_GOOGLE_ANALYTICS = NONE_OBSERVED
NETWORK_RESPONSE_SET_COOKIE_FROM_GOOGLE_ANALYTICS = NONE_OBSERVED
```

This behavior is consistent with Advanced Consent Mode cookieless measurement pings.

However this HAR does **not** by itself prove that first-party `_ga` / `_ga_*` cookies are absent from the `moretegra.com.br` browser cookie jar, because those browser cookies are not established by a Google Analytics response `Set-Cookie` header and may be script-managed first-party cookies.

Therefore:

```text
DENIED_STATE_GA4_NETWORK_PING = PASS
ADVANCED_CONSENT_MODE_NETWORK_BEHAVIOR = CONSISTENT / STRONGLY_SUPPORTED
FIRST_PARTY_GA_COOKIE_ABSENCE = STILL_REQUIRES APPLICATION/COOKIES INSPECTION
GTM_PUBLISH = NOT_AUTHORIZED / NOT_PERFORMED
```

## Next evidence required

1. Inspect `Application -> Cookies -> https://moretegra.com.br` while current consent remains denied.
2. Prove whether `_ga` or `_ga_*` exists in that denied session.
3. Continue bounded synthetic tests for `mnt_section_click`, `mnt_catalog_filter`, `mnt_catalog_search`, and `mnt_intent`, each proving one intended GA4 firing and no cross-fire.
4. Consolidate branch-only source instrumentation into canonical `src-greenn/moretegra.js` before any Green publication gate.
