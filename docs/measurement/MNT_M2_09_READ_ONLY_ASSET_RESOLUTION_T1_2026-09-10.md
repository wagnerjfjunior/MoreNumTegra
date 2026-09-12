# MNT-M2-09 — Read-only Asset Resolution T1 — 2026-09-10

- Project: `MoreNumTegra`
- Program: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Task: `MNT-M2-09 — Implement authorized tracking configuration`
- Source: Windsor.ai read-only connectors configured by Product Authority
- Canonical main at task start: `98f92ea3e80770a0e735ee9b105a29b18a706255`
- Branch: `feat/mnt-m2-09-tracking-implementation`
- External mutation at original T1 capture: `NONE`
- Runtime mutation at original T1 capture: `NONE`

## 1. Purpose

Record the first live read-only resolution of GA4 and Meta assets after Product Authority connected Windsor.ai, then preserve the later provider-native GA4 creation evidence without rewriting the original absence finding.

Preserve:

```text
NOT_FOUND_IN_CONNECTED_SCOPE != DOES_NOT_EXIST
READ_ONLY CONNECTOR RESULT != ADMIN INVENTORY OF EVERY PROVIDER RESOURCE
SEARCH CONSOLE PROPERTY != GA4 PROPERTY
META AD ACCOUNT != META DATASET/PIXEL OWNERSHIP PROOF
T1 ORIGINAL FINDING != LATER T2 ASSET CREATION
```

## 2. Windsor.ai connected scope observed at T1

Relevant connected connectors visible at the initial capture:

### Google Analytics 4

```text
512237190 | jordanacyrela.com.br
476547353 | corretormelhoresimoveis.com.br
304437285 | Caminhos_da_Lapa
```

### Search Console

The connected Search Console scope included:

```text
sc-domain:moretegra.com.br
```

This proved Search Console access for the MoreNumTegra domain in the connected Windsor scope. It did **not** prove a dedicated GA4 property/stream existed at T1.

### Meta Ads

Six Meta Ads accounts were visible in the connector scope. These are ad-account surfaces and must not be treated as Dataset/Pixel ownership evidence.

## 3. GA4 T1 read-only observations

The initial read-only query across connected GA4 properties returned existing property/stream combinations for other sites, including:

```text
Connected GA4 scope: 512237190
Name: jordanacyrela.com.br
Observed stream ID: 12955413603
Observed Measurement ID: G-BBPP95P2PW

Connected GA4 scope: 304437285
Name: Caminhos_da_Lapa
Observed stream ID: 3258121149
Observed Measurement ID: G-3LN8SFKYGW
Observed hostname: caminhosdalapategra.com.br
```

A separate read-only query across all then-connected GA4 scopes, using a one-year window and exact filter:

```text
hostname = moretegra.com.br
```

returned:

```text
NO ROWS
```

Original T1 classification:

```text
MORETEGRA_GA4_PROPERTY_STREAM_IN_T1_WINDSOR_SCOPE = NOT_FOUND
DEDICATED_MORENUMTEGRA_GA4_PROPERTY_AT_T1 = NOT_PROVEN
```

This did not authorize repurposing `Caminhos_da_Lapa` or any other existing property.

## 4. Later GA4 T2 creation superseding the unresolved destination state

After the Product Authority confirmed that a dedicated MoreNumTegra GA4 property did not exist, the Product Authority manually created and evidenced the dedicated destination.

Current proven destination:

```text
Property name: MoreNumTegra
Property ID: 553742649
Production host: https://moretegra.com.br
Stream ID: 15759638334
Measurement ID: G-57M2XR0CY2
Timezone: São Paulo / GMT-03:00
Currency: BRL
Enhanced Measurement: OFF
```

Windsor.ai subsequently exposed the GA4 account/property entry:

```text
553742649 | MoreNumTegra
```

A data query against the new property returned no rows before the GA4 tag had been configured/published, which is consistent with collection not yet being active and is not treated as an error.

Authoritative creation evidence is recorded separately in:

- `docs/measurement/MNT_M2_09_GA4_ASSET_CREATION_EVIDENCE_2026-09-11.md`
- `docs/measurement/MNT_M2_09_GA4_ASSET_CREATION_T2_2026-09-11.md`

Current GA4 classification:

```text
GA4_PROPERTY_ID = PROVEN / 553742649
GA4_STREAM_ID = PROVEN / 15759638334
GA4_MEASUREMENT_ID = PROVEN / G-57M2XR0CY2
GA4_COLLECTION = NOT_YET_ACTIVE / EXPECTED BEFORE GTM DESTINATION PUBLICATION
```

## 5. Meta read-only observations

The Windsor.ai `facebook` connector exposes Meta Ads reporting/account surfaces.

A field-discovery check did not expose generic admin fields named:

```text
pixel_id
dataset_id
event_source_url
```

The connector does expose custom-conversion definition fields, including:

```text
custom_conversion_pixel_id
custom_conversion_data_sources
custom_conversion_event_source_type
custom_conversion_business_id
custom_conversion_business_name
```

A read-only query for those custom-conversion definitions across the six connected Meta Ads accounts returned:

```text
NO ROWS
```

Therefore this connector capture cannot prove any MoreNumTegra Dataset/Pixel/browser-source asset.

Current Meta classification:

```text
META_DATASET_ID = NOT_PROVEN
META_PIXEL_OR_BROWSER_SOURCE_ID = NOT_PROVEN
META_PIXEL_DATASET_RELATIONSHIP = NOT_PROVEN
WINDSOR_FACEBOOK_CONNECTOR_SUFFICIENT_FOR_EVENTS_MANAGER_ASSET_INVENTORY = NOT_PROVEN / CURRENTLY_INSUFFICIENT
```

A provider-native read-only check in Meta Events Manager, or another connector that explicitly exposes Dataset/Pixel administration, remains required before Meta implementation.

## 6. Current decision supported by this evidence chain

GA4 now has a proven dedicated destination, so M2-09 may prepare the bounded GA4 implementation against:

```text
G-57M2XR0CY2
```

subject to Product Authority mutation gates and the single-dispatcher / Consent / deduplication contracts.

Meta remains unresolved and must not be guessed or created without its own applicable authorization.

No credential, password, token or recovery material is recorded in this evidence.