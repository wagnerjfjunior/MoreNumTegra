# MoreNumTegra — GA4 Audience Manual Completion Evidence

Date: `2026-09-22`

Status: `MANUAL_GA4_AUDIENCE_SETUP_COMPLETE / SCREENSHOT_OBSERVED / PAID_MEDIA_FROZEN`

Property:

```text
GA4 property = MoreNumTegra
property_id = 553742649
measurement_id = G-57M2XR0CY2
```

## Evidence source

Manual GA4 administration was performed by Product Authority in the GA4 audience builder and confirmed through screenshots in-session.

The following audiences were visibly present in the GA4 property audience list after creation:

```text
MNT | Google paid visitors | 90d
MNT | Lead success suppression | 540d
MNT | Form start no lead | 30d
MNT | WhatsApp intent | 90d
MNT | Commercial intent | 90d
MNT | CAPIITOLO visitors | 180d
MNT | Elo Duo visitors | 180d
MNT | Aria Higienopolis visitors | 180d
MNT | Home visitors | 540d
MNT | Home visitors | 180d
MNT | Project visitors | 180d
```

Existing GA4 audience retained:

```text
All Users
```

The existing `All Users` audience was intentionally not duplicated.

## GA4 lead semantic correction

The project source event remains:

```text
mnt_lead_success
```

The GA4 destination event is:

```text
generate_lead
```

Therefore GA4 audience rules that depend on accepted lead creation must use `generate_lead`, not `mnt_lead_success`.

Applied semantics:

```text
MNT | Form start no lead | 30d
  include = mnt_form_start
  exclude permanently = generate_lead

MNT | Lead success suppression | 540d
  include = generate_lead
```

This does not change the canonical runtime taxonomy; it only resolves the source-event vs GA4-destination distinction for GA4 audience administration.

## Google paid audience

Observed configured audience:

```text
MNT | Google paid visitors | 90d
dimension = Session source / medium
condition = exactly matches
value = google / cpc
membership = 90 days
current expected population while paid media is frozen = 0
```

Zero current users is expected while Google Ads traffic is frozen.

## Paid-media state

```text
PAID_MEDIA_STATE = FROZEN
SEARCH_SPEND = R$ 0
REMARKETING_SPEND = R$ 0
GOOGLE_ADS_EXTERNAL_MUTATIONS = 0
LOOKER_STUDIO = DEFERRED
```

Audience creation/population readiness does not reopen M6-07 and does not authorize remarketing activation.

## Closure

```text
GA4_AUDIENCE_MANUAL_SETUP = COMPLETE
LIVE_AUDIENCE_LIST = SCREENSHOT_OBSERVED
GA4_WRITE_CONNECTOR = NOT_AVAILABLE
MANUAL_ADMIN_PATH = USED_SUCCESSFULLY
NEXT_PAID_MEDIA_ACTION = DEFERRED
```
