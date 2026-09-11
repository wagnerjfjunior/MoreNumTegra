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

## First-party cookie inspection

Product Authority supplied a DevTools `Application -> Cookies -> https://moretegra.com.br` screenshot while the denied-state test flow was active.

Screenshot SHA-256:

`fbf3f039e9fe6737d615c13f8eb8e5475487ac1b7dd73a09745964a02862e729`

Observed cookie name:

```text
_ga_57M2XR0CY2
```

Important evidentiary limitation: the screenshot proves that a GA4 first-party cookie was present in the browser cookie jar at the time of inspection. It does **not** prove when that cookie was created. Because the same browser had previously executed a granted-consent test, this cookie may have been created during the earlier granted session and persisted into the later denied test.

Therefore this screenshot cannot yet support either of these stronger claims:

```text
COOKIE_CREATED_WHILE_DENIED = NOT_PROVEN
COOKIE_NOT_CREATED_WHILE_DENIED = NOT_PROVEN
```

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

However the browser cookie jar contains `_ga_57M2XR0CY2` during inspection. Because the test browser previously had a granted-consent state, cookie provenance is unresolved.

Therefore:

```text
DENIED_STATE_GA4_NETWORK_PING = PASS
ADVANCED_CONSENT_MODE_NETWORK_BEHAVIOR = CONSISTENT / STRONGLY_SUPPORTED
FIRST_PARTY_GA_COOKIE_PRESENT_AT_INSPECTION = PROVEN
FIRST_PARTY_GA_COOKIE_PROVEN_CREATED_WHILE_DENIED = NO
FIRST_PARTY_GA_COOKIE_PROVEN_ABSENT_WHILE_DENIED = NO
COOKIE_PROVENANCE = OPEN / REQUIRES CLEAN-SESSION RETEST
GTM_PUBLISH = NOT_AUTHORIZED / NOT_PERFORMED
```

## Next evidence required

1. Start a clean browser context with no `moretegra.com.br` first-party cookies (incognito or delete site cookies before load).
2. Confirm the consent banner appears and the GTM default is denied before any acceptance.
3. Choose `Cancelar` and prove all four consent states remain `DENIED`.
4. Inspect `Application -> Cookies -> https://moretegra.com.br` **before** and **after** a synthetic `mnt_page_view` push.
5. If `_ga` / `_ga_*` remains absent, denied-state cookie suppression is proven. If `_ga` / `_ga_*` is newly created, the consent implementation requires correction before publish.
6. Continue bounded synthetic tests for `mnt_section_click`, `mnt_catalog_filter`, `mnt_catalog_search`, and `mnt_intent`, each proving one intended GA4 firing and no cross-fire.
7. Consolidate branch-only source instrumentation into canonical `src-greenn/moretegra.js` before any Green publication gate.
