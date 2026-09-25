# MoreNumTegra — GA4 Generic Exact-Project Audience Migration — 2026-09-25

Status: `DESIGN_CANONICALIZATION / DOCS_ONLY / GA4_MUTATION_PENDING`

## 1. Purpose

Replace the legacy manually enumerated GA4 audience `MNT | Project visitors | 180d` with a generic exact-project audience that remains valid when a new governed project page is published.

Target replacement audience:

`MNT | All project visitors | 180d`

This is a MoreNumTegra consumer implementation of the adopted RESF Audience Readiness capability. It is not a provider-wide GA4 rule.

## 2. Current evidence

Current canonical sitemap at MoreNumTegra main includes:

- `https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/`
- `https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/`
- `https://www.moretegra.com.br/empreendimentos/aria-higienopolis/`
- `https://www.moretegra.com.br/empreendimentos/dsg-itaim/`

The legacy audience was created from only the first three governed exact-project routes and therefore drifted after DSG Itaim publication.

## 3. Consumer classifier

Governed exact-project namespace:

`/empreendimentos/<project-slug>/`

Candidate GA4 audience logic:

```text
event_name = page_view
AND
page_location contains /empreendimentos/
```

This syntax is consumer-specific GA4 configuration, not RESF doctrine.

The classifier is acceptable only while the `/empreendimentos/` namespace remains exclusively owned by exact-project pages. A future listing/index/utility page under that namespace must trigger revalidation before relying on the same broad condition.

## 4. Positive validation cases

The replacement audience must classify the four current governed exact-project pages:

```text
/empreendimentos/capiitolo-piero-lissoni/
/empreendimentos/caminhos-da-lapa-elo-duo/
/empreendimentos/aria-higienopolis/
/empreendimentos/dsg-itaim/
```

Expected result for each:

`MATCH`

## 5. Negative validation cases

The generic classifier must not classify:

```text
/
 /caminhos-da-lapa/
 /obrigado/
```

Expected result for each:

`NO_MATCH`

Additional negative requirement:

- non-canonical preview hosts must not be treated as business audience proof;
- an eventual `/empreendimentos/` listing/index page is not automatically eligible unless Product/Search ownership explicitly classifies it as an exact-project page;
- query parameters do not convert an ineligible route into an eligible project page.

## 6. GA4 configuration target

Property:

```text
MoreNumTegra
property_id = 553742649
measurement_id = G-57M2XR0CY2
```

Audience:

```text
name = MNT | All project visitors | 180d
include = event_name = page_view
          AND page_location contains /empreendimentos/
membership = 180 days
```

No visitor name, email, phone, Form 46 payload, CRM identity, hashed PII or fingerprint-derived identifier is required or permitted.

## 7. Migration order

```text
CREATE replacement audience
-> CONFIRM audience exists
-> VALIDATE positive/negative classifier semantics
-> OBSERVE initial accumulation when exposed
-> CHECK downstream dependency on legacy audience
-> ONLY THEN consider archiving legacy MNT | Project visitors | 180d
```

Do not archive the legacy audience before replacement evidence is captured.

## 8. Explicit boundaries

This design does not:

- modify HTML/CSS/JS;
- modify dataLayer;
- publish GTM;
- change Consent Mode;
- activate Google Ads;
- authorize remarketing spend;
- create Customer Match;
- upload PII/CRM data;
- modify Form 46;
- change project-specific audiences;
- archive any existing GA4 audience.

Paid media remains frozen. Audience accumulation remains allowed under the previously accepted Product Authority decision.

## 9. Acceptance evidence for GA4 execution

After manual creation, capture:

```text
property_id
audience_name
include_conditions
membership_duration_days
creation_state
visible audience table confirmation
estimated/current size if exposed
created_at
operator
```

Also record:

- positive route coverage for all four current exact-project pages;
- negative exclusion for Home, Caminhos da Lapa master route and /obrigado/;
- whether any downstream Google Ads/export dependency on the legacy audience is visible;
- no PII condition;
- consent/personalization state remains unchanged.

## 10. Gate

`DESIGN_READY_FOR_MANUAL_GA4_CREATION`

Manual GA4 creation is the next separate execution step. The current connected analytics path has previously been evidenced as read-only for admin mutations, so no automated GA4 write is assumed.
