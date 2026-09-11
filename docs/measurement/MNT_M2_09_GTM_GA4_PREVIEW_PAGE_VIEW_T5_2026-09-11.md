# MNT-M2-09 — GTM / GA4 Preview Page View Evidence T5 — 2026-09-11

- Project: `MoreNumTegra`
- Task: `MNT-M2-09 — Implement authorized tracking configuration`
- Environment: GTM Preview / Tag Assistant connected to production host `moretegra.com.br`
- GTM container: `GTM-PGCR4R47`
- GA4 destination: `G-57M2XR0CY2`
- Source event under test: synthetic controlled `mnt_page_view`
- GTM publication: `NOT_PERFORMED`

## Evidence supplied by Product Authority

Three screenshots were supplied from the live GTM Preview session.

SHA-256:

```text
055de5cf-9d58-48bd-8732-88d8726afd2a.png
a534eb4c13fc32bbe350dae96313b2b83c9a0c900e46eb6d2effe8e61b4864b3

07074410-0ede-41b6-ab91-6e77900c8d36.png
30ae3e29877a4a93575af48da1128f91e4864a02f6228fa5777c557e2d8ee8b7

a62851ca-8782-473b-bc0e-49e6a6f55ba7.png
5da9b27d411ddba8395e86b8ac77b7521145679a32cfa39b4d6ecbb263c4f626
```

## Observed behavior

The Tag Assistant event timeline contains a source event named `mnt_page_view` produced via `dataLayer.push`.

For that exact event, the GTM output shows:

```text
GA4 - Event - page_view - mnt_page_view
Google Analytics: GA4 Event
Status: Succeeded
Firing count for event: 1
```

No second project page-view event tag is shown firing for the same source occurrence.

The Google-tag destination view for `G-57M2XR0CY2` shows one `Page View` under `Hits Sent` after the synthetic source event.

The container summary after the source event shows:

```text
CONSENT - Default Denied - All Pages       Fired 1 time
GA4 - Google Tag - MoreNumTegra            Fired 1 time
GA4 - Event - page_view - mnt_page_view    Fired 1 time
```

The session also shows the other project GA4 event tags not firing on the `mnt_page_view` occurrence.

## Supported adjudication

This evidence supports:

```text
MNT_PAGE_VIEW_SOURCE_TRIGGER_MATCH = PROVEN
MNT_PAGE_VIEW_TO_GA4_PAGE_VIEW_TAG = PROVEN
GA4_PAGE_VIEW_EVENT_TAG_FIRING_COUNT_PER_TEST_OCCURRENCE = 1
GA4_DESTINATION_HIT_OBSERVED = PROVEN
NO_SECOND_PROJECT_GA4_PAGE_VIEW_TAG_FIRING_IN_THIS_TEST = PROVEN
```

It does **not** yet prove:

- the effective `analytics_storage` state at the moment of the hit;
- whether the observed hit was consented storage traffic or an Advanced Consent Mode cookieless ping;
- browser cookie creation/non-creation;
- full denied vs granted network behavior;
- real production-source `mnt_page_view` from the final `moretegra.js` artifact;
- the other four `mnt_*` event mappings;
- MNT-M2-09 completion or MNT-M2-10 end-to-end acceptance.

Therefore:

```text
PAGE_VIEW_MAPPING = PASS_FOR_SYNTHETIC_GTM_PREVIEW_TEST
CONSENT_NETWORK_ADJUDICATION = STILL_OPEN
REAL_SOURCE_RUNTIME_PROOF = STILL_OPEN
GTM_PUBLISH = NOT_AUTHORIZED / NOT_PERFORMED
```

## Next evidence required

1. Inspect the `Consent Update` event -> `Consent` tab and capture the effective `analytics_storage`, `ad_storage`, `ad_user_data`, and `ad_personalization` state.
2. Repeat bounded Preview tests for `mnt_section_click`, `mnt_catalog_filter`, `mnt_catalog_search`, and `mnt_intent`, proving one intended firing each and no cross-fire.
3. Consolidate branch-only source instrumentation into canonical `src-greenn/moretegra.js` before any Green production artifact publication.
4. Later prove real-source runtime behavior on Green after separately authorized artifact publication.
