# MNT-M2-09 — GA4 Asset Creation Evidence — 2026-09-11

- Project: `MoreNumTegra`
- Program: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Task: `MNT-M2-09 — Implement authorized tracking configuration`
- Evidence source: Product Authority screenshots from Google Analytics Admin / Web Stream details
- Branch: `feat/mnt-m2-09-tracking-implementation`
- External mutation recorded: GA4 property + production web stream created by Product Authority
- GTM publication: `NONE`
- Runtime tracking publication: `NONE`

## 1. Property

Observed in Google Analytics Admin:

```text
GA4_PROPERTY_NAME = MoreNumTegra
GA4_PROPERTY_ID = 553742649
REPORTING_TIMEZONE = Brazil / (GMT-03:00) Horário São Paulo
DISPLAY_CURRENCY = BRL / Real brasileiro (R$)
INDUSTRY = Serviços imobiliários
```

## 2. Production web stream

Observed in Web Stream details:

```text
WEB_STREAM_NAME = MoreNumTegra
WEB_STREAM_URL = https://moretegra.com.br
GA4_STREAM_ID = 15759638334
GA4_MEASUREMENT_ID = G-57M2XR0CY2
```

## 3. Enhanced Measurement state

Observed immediately after stream creation:

```text
ENHANCED_MEASUREMENT = OFF
```

The stream UI showed no data received yet. This is expected because no Google tag / GTM GA4 destination was published by this evidence step.

## 4. Canonical classification update

The earlier M2-09 read-only state can now be refined for GA4:

```text
GA4_PROPERTY_EXISTS = PROVEN
GA4_PROPERTY_ID = 553742649
GA4_STREAM_EXISTS = PROVEN
GA4_STREAM_ID = 15759638334
GA4_MEASUREMENT_ID = G-57M2XR0CY2
GA4_PRODUCTION_HOST = moretegra.com.br
GA4_DEDICATED_TO_MORENUMTEGRA = PROVEN BY PROPERTY/STREAM CREATION CONTEXT
GA4_RUNTIME_COLLECTION = NOT_YET_IMPLEMENTED / NOT_YET_PROVEN
```

Preserve:

```text
PROPERTY CREATED != TAG PUBLISHED
STREAM CREATED != DATA COLLECTION ACTIVE
MEASUREMENT ID KNOWN != RUNTIME CONFIGURED
GA4 ASSET CREATION != GA4 KEY EVENT CONFIGURATION
GA4 ASSET CREATION != GOOGLE ADS LINK OR CONVERSION ACTION
```

## 5. Next implementation gate

The next material mutation is no longer GA4 asset creation. It is the bounded implementation of the GA4 destination through the already accepted project dispatcher:

```text
canonical mnt_* source events
-> GTM-PGCR4R47
-> canonical-host + consent controls
-> G-57M2XR0CY2
```

Before publishing any new GTM version, Product Authority must explicitly authorize the exact GTM/source-code mutation scope. No direct `gtag()` path is authorized.

Meta Dataset/Pixel/browser-source identifiers remain separately unresolved.
