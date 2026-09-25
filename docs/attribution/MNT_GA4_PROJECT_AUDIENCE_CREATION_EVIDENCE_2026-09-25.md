# MoreNumTegra — GA4 Generic Project Audience Creation Evidence — 2026-09-25

Status: `PATH_SAFE_CREATED / SCREENSHOT_OBSERVED / ACCUMULATION_PENDING`

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

and the later long-window variant:

`MNT | All project visitors | 540d`

as created on 2026-09-25.

The current user-count cell is not fully readable in the supplied screenshot and is therefore recorded as:

`CURRENT_SIZE = NOT_RELIABLY_OBSERVED`

## Additional 540-day audience evidence

A second audience was created manually with the same classifier and maximum configured membership window:

```text
name = MNT | All project visitors | 540d
created_at = 2026-09-25
membership_duration = 540 days
operator = Wagner / Product Authority
condition = page_view AND page_location contains /empreendimentos/
exclusions = none
audience_trigger = none
```

The post-save GA4 audience table visibly shows both `MNT | All project visitors | 540d` and `MNT | All project visitors | 180d`.

The current user-count cells are truncated in the supplied screenshot and are not treated as reliable post-creation membership counts.

## Semantic validation — reopened

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

This path-level semantic validation is based on the canonical route namespace and current sitemap, not on per-user GA4 membership inspection.

However, the configured predicate uses `page_location`, which Google defines as the complete page URL. Therefore a query-bearing non-project URL can contain `/empreendimentos/` inside its query string and still satisfy the current `contains` predicate. Example negative case to reject:

`https://www.moretegra.com.br/?return=/empreendimentos/foo/`

Because this negative case is not yet proven safe in the live builder, classifier semantic validation is reopened. Neither the 180d nor the 540d audience is eligible to become the sole canonical replacement until a path-safe condition is proven and created.

## Path-safe replacement evidence

Product Authority then created two path-safe audiences using the live GA4 builder dimension:

```text
dimension = Caminho da página e classe da tela
operator = começa com
value = /empreendimentos/
```

Observed builder estimate for the path-safe rule:

```text
estimated users = 128
estimated share = 64.6%
```

This estimate is builder preview only and is not post-creation membership proof.

Created audiences:

```text
MNT | All project visitors path-safe | 180d
membership = 180 days

MNT | All project visitors path-safe | 540d
membership = 540 days
```

Both are visibly present in the GA4 audience table with creation date 2026-09-25.

The path-safe predicate resolves the previously identified query-string false-positive class because the selected dimension is the page path/screen-class dimension rather than full `page_location`.

The live value suggestions also exposed noncanonical internal paths such as `/src-greenn/empreendimentos/...`; these do not satisfy `begins with /empreendimentos/` and therefore are excluded by construction.

Current post-creation audience-size cells are truncated and remain `NOT_RELIABLY_OBSERVED`.

## Legacy audience

The legacy audience:

`MNT | Project visitors | 180d`

must remain unarchived until:
1. the replacement audience has been observed accumulating;
2. any downstream dependency/export usage is checked;
3. archival is separately authorized.

## Boundaries

No GTM, runtime, Consent Mode, Form 46, spend, Customer Match, PII/CRM upload or Meta mutation was directly performed by the operator. No direct Google Ads action was performed. Indirect GA4-to-Google-Ads audience export state remains NOT_OBSERVED pending the downstream dependency/export check.

Paid media remains frozen.

## Current gate

```text
2C CREATE 180D AUDIENCE = COMPLETE
2C-540 CREATE 540D AUDIENCE = COMPLETE
2D CLASSIFIER SEMANTIC VALIDATION = COMPLETE / PATH_SAFE RULE OBSERVED IN LIVE BUILDER
2E ACCUMULATION OBSERVATION = PENDING
2F LEGACY / ADS EXPORT DEPENDENCY CHECK = PENDING
2G CANONICAL WINDOW POLICY = PENDING (180D vs 540D)
2H LEGACY / UNSAFE-CANDIDATE ARCHIVAL = NOT_AUTHORIZED
```
