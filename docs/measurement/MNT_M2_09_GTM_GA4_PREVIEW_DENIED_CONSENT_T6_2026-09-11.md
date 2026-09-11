# MNT-M2-09 — GTM / GA4 Preview Denied-Consent Evidence T6 — 2026-09-11

- Project: `MoreNumTegra`
- Task: `MNT-M2-09 — Implement authorized tracking configuration`
- Environment: GTM Preview / Tag Assistant connected to production host `moretegra.com.br`
- GTM container: `GTM-PGCR4R47`
- GA4 destination: `G-57M2XR0CY2`
- Test path: user selects `Cancelar`, then synthetic controlled `mnt_page_view`
- GTM publication: `NOT_PERFORMED`

## Evidence supplied by Product Authority

Four screenshots were supplied from the live GTM Preview session.

SHA-256:

```text
71475102-d5aa-47eb-86e6-a80e042c5155.png
7377a4f799762f368a9afa8a5aede758ecb4919c1f3fe560179fe21d58e4004b

b6212766-46a0-4ed6-8779-227f495c23ea.png
f052e0008e467766e3ee14dc926c32ff43348a172629dbf9fa67428d91c6c6fb

70feacf3-0618-43c8-82ef-f559861038f9.png
7c360b95d345ee01cf02cc49a4f1ee4bc65a5736c34d7b6daef9bc327b75d73f

aa9646b8-3713-45b0-b6a6-aacc8b977592.png
46a0ced228e678dcbe29acf0b738d92e19bdb3d8c260b4267402919992d1319f
```

## Observed consent behavior

The `Consent Update` event after selecting `Cancelar` shows all four consent signals denied both on-page default and on-page update:

```text
ad_storage           = denied -> denied
analytics_storage    = denied -> denied
ad_user_data         = denied -> denied
ad_personalization   = denied -> denied
```

For the subsequent synthetic `mnt_page_view`, the `Consent` tab shows the current state remains denied for all four signals.

## Observed GTM tag behavior under denied consent

For the synthetic `mnt_page_view` occurrence, GTM shows:

```text
GA4 - Event - page_view - mnt_page_view
Google Analytics: GA4 Event
Status: Succeeded
```

The screenshot proves tag execution inside GTM while `analytics_storage=denied`.

This evidence does **not** by itself prove whether a network request was emitted to Google, whether that request was a cookieless consent-mode ping, or whether any analytics cookies were created. Those require network/cookie inspection.

## Supported adjudication

```text
CANCEL_PATH_CONSENT_UPDATE = PROVEN
DEFAULT_DENIED_PRESERVED_AFTER_CANCEL = PROVEN
ALL_FOUR_CONSENT_SIGNALS_CURRENTLY_DENIED = PROVEN
GA4_EVENT_TAG_EXECUTES_IN_GTM_WHILE_ANALYTICS_STORAGE_DENIED = PROVEN
DENIED_NETWORK_REQUEST = NOT_YET_PROVEN
COOKIELESS_PING_CLASSIFICATION = NOT_YET_PROVEN
ANALYTICS_COOKIE_NON_CREATION = NOT_YET_PROVEN
```

The current configuration is therefore behaving at least at the GTM execution layer like an Advanced Consent Mode-capable setup: Google tags are not trigger-blocked merely because storage consent is denied. Final classification must wait for network/cookie evidence.

## Additional observation

One browser-console screenshot shows unrelated runtime errors in a hashed script during the Preview session. No attribution to MoreNumTegra measurement code is established by this evidence. Treat separately if reproduced outside Tag Assistant/extension context.

## Next evidence required

1. With all four consent signals denied, inspect browser Network for requests to Google measurement endpoints after a synthetic `mnt_page_view`.
2. Inspect cookies/storage before and after the denied event, especially `_ga` / `_ga_*`, to verify whether analytics cookies are created or remain absent.
3. If a Google request is present while denied, capture its consent-related request parameters sufficient to classify it as consent-mode/cookieless traffic without exposing user identifiers.
4. Repeat the bounded one-event/one-tag tests for `mnt_section_click`, `mnt_catalog_filter`, `mnt_catalog_search`, and `mnt_intent`.
5. Keep GTM unpublished until denied/granted behavior is adjudicated and accepted.
