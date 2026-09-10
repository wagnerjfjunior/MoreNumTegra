# MoreNumTegra — GTM / Consent Mode T1 Evidence — 2026-09-10

- Project: `MoreNumTegra`
- Program: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Evidence class: `T1 / POST-T0 GTM CONSENT IMPLEMENTATION`
- Date: `2026-09-10`
- Commercial property: `moretegra.com.br`
- GTM container: `GTM-PGCR4R47`
- Published GTM version: `4`
- Version title observed: `MNT - Consent Mode v1 - 2026-09-10`
- Publication observed in GTM UI: `2026-09-10 17:52` local time
- Validation surfaces: `GTM Preview / Tag Assistant` plus published-version UI
- Product Authority supplied screenshot SHA-256: `e97ec394fc572bbecba72d64a569ef02cbcf60496ef5cd05453b2225970ab204`

## 1. Purpose

Canonicalize the field evidence produced after the MNT-M2-01 T0 inventory. This document proves the current GTM Consent Mode implementation state without rewriting or deleting the earlier pre-GTM evidence.

Preserve:

```text
T0_PRE_GTM_EVIDENCE != CURRENT_GTM_STATE
T1_PUBLISHED_GTM_VERSION = CURRENT GTM/CONSENT EVIDENCE FOR THIS RECONCILIATION
PUBLISHED != FULL_MEASUREMENT_STACK_COMPLETE
CONSENT_STATE_HANDLING_PROVEN != EVERY_THIRD_PARTY_NETWORK_REQUEST_GATED
```

## 2. Published GTM version evidence

The supplied GTM Versions screen shows Version 4 as published for the MoreNumTegra web container.

Version Summary observed:

```text
Published version = 4
Version items = 3 Tags / 2 Triggers / 6 Variables
```

The published-version description records Consent Mode v2 behavior configured with default denied for:

- `ad_storage`;
- `analytics_storage`;
- `ad_user_data`;
- `ad_personalization`.

It also records integration with the Green LGPD modal:

```text
Continuar -> Granted
Cancelar -> Denied
Persistence validated after reload for both states
Validated in GTM Preview / Tag Assistant
```

Version Changes visible in the supplied publication screen include:

```text
CLICK - LGPD - Cancelar                    Trigger       Added
CLICK - LGPD - Continuar                   Trigger       Added
CONSENT - Default Denied - All Pages       Tag           Added
CONSENT - Deny - Cancelar                  Tag           Added
CONSENT - Grant - Continuar                Tag           Added
MT - Consent Deny All                      Custom Template Added
MT - Consent Grant All                     Custom Template Added
MT - Consent Mode Default Denied           Custom Template Added
```

## 3. Functional consent-state proof

The Product Authority validated the following behavior in GTM Preview / Tag Assistant before/around publication.

### 3.1 Default state

On initial load before affirmative consent:

```text
ad_storage = denied
analytics_storage = denied
ad_user_data = denied
ad_personalization = denied
```

Classification:

`DEFAULT_CONSENT_STATE = PROVEN / DENIED_ALL_FOUR`.

### 3.2 Green LGPD — Continuar

After the Green LGPD button `Continuar`:

```text
ad_storage = granted
analytics_storage = granted
ad_user_data = granted
ad_personalization = granted
```

Classification:

`GREEN_CONTINUAR_CONSENT_UPDATE = PROVEN / GRANTED_ALL_FOUR`.

### 3.3 Green LGPD — Cancelar

After the Green LGPD button `Cancelar`:

```text
ad_storage = denied
analytics_storage = denied
ad_user_data = denied
ad_personalization = denied
```

Classification:

`GREEN_CANCELAR_CONSENT_UPDATE = PROVEN / DENIED_ALL_FOUR`.

### 3.4 Persistence

Reload tests were executed for both paths:

```text
GRANTED state persists after reload = PROVEN
DENIED state persists after reload = PROVEN
```

Classification:

`CONSENT_STATE_PERSISTENCE = PROVEN`.

## 4. What this evidence proves

This T1 package supports all of the following current claims:

```text
MORENUMTEGRA_GTM_CONTAINER = PRESENT
GTM_CONTAINER_ID = GTM-PGCR4R47
GTM_VERSION_4 = PUBLISHED
GTM_CONSENT_MODE_STATE_HANDLING = IMPLEMENTED / PUBLISHED / VALIDATED
DEFAULT_DENIED_ALL_FOUR = PROVEN
CONTINUAR_GRANTED_ALL_FOUR = PROVEN
CANCELAR_DENIED_ALL_FOUR = PROVEN
GRANTED_PERSISTENCE_AFTER_RELOAD = PROVEN
DENIED_PERSISTENCE_AFTER_RELOAD = PROVEN
```

## 5. What this evidence does NOT prove

This package must not be inflated into claims that were not tested.

It does NOT by itself prove:

- GA4 property/configuration exists or sends correct events;
- Google Ads conversion tags exist or fire correctly;
- Meta Pixel/Dataset/CAPI exists or is gated correctly;
- primary/secondary conversion definitions exist;
- canonical event taxonomy exists;
- Green `/page/view` duplicate-risk is resolved;
- all YouTube/Green/platform network telemetry is blocked by the project-owned consent state;
- end-to-end Measurement QA is complete.

Therefore:

```text
GTM_CONSENT_IMPLEMENTATION_COMPLETE != MNT-M2_COMPLETE
GTM_CONSENT_IMPLEMENTATION_COMPLETE != MNT-M2-09_FULL_COMPLETE
GTM_CONSENT_QA_COMPLETE != MNT-M2-10_COMPLETE
```

## 6. WBS adjudication supported by this evidence

When this reconciliation package is integrated into canonical `main`:

```text
MNT-M2-07 = COMPLETE
MNT-M2-08 = COMPLETE
MNT-M2-09 = PARTIAL_IMPLEMENTED
```

Rationale:

- MNT-M2-07's consent model/LGPD gating objective is satisfied for the GTM Consent Mode state model and Green Continue/Cancel integration;
- MNT-M2-08's denied/granted QA contract is satisfied by tested default, update and persistence paths;
- MNT-M2-09 is only partially implemented because the broader tracking configuration still lacks canonical taxonomy/conversions and subsequent GA4/Ads/Meta decisions/implementation where applicable.

## 7. T0 / T1 evidence chain

```text
T0 — MNT-M2-01 PRE-GTM CAPTURE
HAR c59f3a3c0c075412595bfda2dd1155a48fa0d0689f5f27264010076348bb7446
GTM = NOT_OBSERVED_AT_T0
Green /page/view = OBSERVED
Duplicate-measurement risk = OPEN INPUT

T1 — GTM CONSENT IMPLEMENTATION
Container = GTM-PGCR4R47
Published version = 4
Default denied = PROVEN
Continuar granted = PROVEN
Cancelar denied = PROVEN
Persistence = PROVEN
```

Both evidence packages remain valid within their respective time/scope boundaries.