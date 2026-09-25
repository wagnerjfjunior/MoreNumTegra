# MoreNumTegra — GA4 Generic Project Audience Creation Evidence — 2026-09-25

Status: `CREATED / SCREENSHOT_OBSERVED / ACCUMULATION_PENDING`

## Property

```text
GA4 property = MoreNumTegra
property_id = 553742649
```

## Created audience

```text
name = MNT | All project visitors | 180d
created_at = 2026-09-25
membership_duration = 180 days
```

The audience is visibly present in the GA4 audience table after save.

## Observed creation configuration

The pre-save builder evidence showed:

```text
event_name = page_view
AND
page_location contains /empreendimentos/
membership = 180 days
```

No exclusion group and no audience trigger were configured.

The builder displayed an estimated audience of 133 users / 67.2% before save. This estimate is not treated as post-creation membership proof.

## Post-save observation

The GA4 audience table visibly shows:

`MNT | All project visitors | 180d`

as created on 2026-09-25.

The current user-count cell is not fully readable in the supplied screenshot and is therefore recorded as:

`CURRENT_SIZE = NOT_RELIABLY_OBSERVED`

## Semantic validation

The classifier remains governed by:

`/empreendimentos/<project-slug>/`

Positive current routes:

- /empreendimentos/capiitolo-piero-lissoni/
- /empreendimentos/caminhos-da-lapa-elo-duo/
- /empreendimentos/aria-higienopolis/
- /empreendimentos/dsg-itaim/

Negative current routes:

- /
- /caminhos-da-lapa/
- /obrigado/

This semantic validation is based on the canonical route namespace and current sitemap, not on per-user GA4 membership inspection.

## Legacy audience

The legacy audience:

`MNT | Project visitors | 180d`

must remain unarchived until:
1. the replacement audience has been observed accumulating;
2. any downstream dependency/export usage is checked;
3. archival is separately authorized.

## Boundaries

No GTM, runtime, Consent Mode, Form 46, Google Ads, spend, Customer Match, PII/CRM upload or Meta mutation was performed.

Paid media remains frozen.

## Current gate

```text
2C CREATE AUDIENCE = COMPLETE
2D CLASSIFIER SEMANTIC VALIDATION = COMPLETE
2E ACCUMULATION OBSERVATION = PENDING
2F LEGACY DEPENDENCY CHECK = PENDING
2G LEGACY ARCHIVAL = NOT_AUTHORIZED
```
