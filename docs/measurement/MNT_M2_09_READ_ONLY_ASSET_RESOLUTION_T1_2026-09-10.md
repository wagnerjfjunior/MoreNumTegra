# MNT-M2-09 — Read-only Asset Resolution T1 — 2026-09-10

- Project: `MoreNumTegra`
- Program: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Task: `MNT-M2-09 — Implement authorized tracking configuration`
- Source: Windsor.ai read-only connectors configured by Product Authority
- Canonical main at task start: `98f92ea3e80770a0e735ee9b105a29b18a706255`
- Branch: `feat/mnt-m2-09-tracking-implementation`
- External mutation: `NONE`
- Runtime mutation: `NONE`

## 1. Purpose

Record the first live read-only resolution of GA4 and Meta assets after Product Authority connected Windsor.ai.

This evidence is intentionally narrow. It records only assets visible through the connected Windsor.ai scopes and does not claim that an asset absent from the connector does not exist in Google Analytics or Meta.

Preserve:

```text
NOT_FOUND_IN_CONNECTED_SCOPE != DOES_NOT_EXIST
READ_ONLY CONNECTOR RESULT != ADMIN INVENTORY OF EVERY PROVIDER RESOURCE
SEARCH CONSOLE PROPERTY != GA4 PROPERTY
META AD ACCOUNT != META DATASET/PIXEL OWNERSHIP PROOF
```

## 2. Windsor.ai connected scope observed

Relevant connected connectors visible at this capture:

### Google Analytics 4

```text
512237190 | jordanacyrela.com.br
476547353 | corretormelhoresimoveis.com.br
304437285 | Caminhos_da_Lapa
```

### Search Console

The connected Search Console scope includes:

```text
sc-domain:moretegra.com.br
```

This proves Search Console access for the MoreNumTegra domain in the connected Windsor scope. It does **not** prove a dedicated GA4 property/stream exists.

### Meta Ads

Six Meta Ads accounts are visible in the connector scope, including accounts named for Wagner Fernandes, Brenda Tatiane/SWL and Cyrela. These are ad-account surfaces and must not be treated as Dataset/Pixel ownership evidence.

## 3. GA4 live read-only observations

A read-only query across the connected GA4 properties returned the following observed property/stream combinations with recent data:

```text
Connected GA4 scope: 512237190
Name: jordanacyrela.com.br
Observed stream ID: 12955413603
Observed Measurement ID: G-BBPP95P2PW
Observed hostnames include:
- jordanacyrela.com.br
- www.jordanacyrela.com.br
- insights.jordanacyrela.com.br
- caminhosdalapa.greennsales.com.br

Connected GA4 scope: 304437285
Name: Caminhos_da_Lapa
Observed stream ID: 3258121149
Observed Measurement ID: G-3LN8SFKYGW
Observed hostname:
- caminhosdalapategra.com.br
```

The connected `corretormelhoresimoveis.com.br` GA4 scope was visible in the connector account list, but this capture did not produce a stream/Measurement-ID row for it in the queried active-data result. No ID is inferred from absence.

A separate read-only query across **all currently connected GA4 scopes**, using a one-year window and exact filter:

```text
hostname = moretegra.com.br
```

returned:

```text
NO ROWS
```

Classification:

```text
MORETEGRA_GA4_PROPERTY_STREAM_IN_CURRENT_WINDSOR_CONNECTED_SCOPE = NOT_FOUND
DEDICATED_MORENUMTEGRA_GA4_PROPERTY = STILL_NOT_PROVEN
GA4_PROPERTY_ID = STILL_NOT_PROVEN
GA4_STREAM_ID = STILL_NOT_PROVEN
GA4_MEASUREMENT_ID = STILL_NOT_PROVEN
```

This does **not** authorize repurposing `Caminhos_da_Lapa` or any other existing property. The observed `Caminhos_da_Lapa` stream is associated with `caminhosdalapategra.com.br`, so current evidence does not support treating it as the dedicated MoreNumTegra destination.

## 4. Meta live read-only observations

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

Classification:

```text
META_DATASET_ID = NOT_PROVEN
META_PIXEL_OR_BROWSER_SOURCE_ID = NOT_PROVEN
META_PIXEL_DATASET_RELATIONSHIP = NOT_PROVEN
WINDSOR_FACEBOOK_CONNECTOR_SUFFICIENT_FOR_EVENTS_MANAGER_ASSET_INVENTORY = NOT_PROVEN / CURRENTLY_INSUFFICIENT
```

A provider-native read-only check in Meta Events Manager, or another connector that explicitly exposes Dataset/Pixel administration, remains required before Meta implementation.

## 5. Immediate decision supported by this evidence

The M2-09 source/GTM implementation must not bind itself to any guessed GA4 or Meta identifier.

Current safe next step:

```text
GA4:
- verify in Google Analytics Admin whether a dedicated MoreNumTegra property/stream already exists but is not connected to Windsor;
- if it exists, record exact property/stream/Measurement IDs;
- if it does not exist, obtain explicit Product Authority mutation authorization before creating one.

META:
- inspect Meta Events Manager read-only for a dedicated MoreNumTegra Dataset/Pixel/browser source;
- if it exists, record exact non-secret IDs and relationship;
- if it does not exist, obtain explicit Product Authority mutation authorization before creating/configuring one.
```

No external creation, publication or configuration was performed by this T1 resolution.
