# UX / Form / Structured Data Standardization — 2026-09-18

Status: `IMPLEMENTED_IN_BRANCH / STATIC_QA_PASS / NOT_MERGED`

Repository: `wagnerjfjunior/MoreNumTegra`  
Canonical base resolved before implementation: `2a30a4fa4080b58d4fa571915f05809c634ba929`  
Implementation branch: `fix/ux-form-schema-standardization-20260918`

## Product Authority decision

The Product Authority explicitly authorized this correction set in the active project session after reviewing the intended scope.

The change is corrective/additive and does not authorize a change of provider, DNS, framework, canonical host, deployment policy or lead backend.

## Scope

### Home

- add explicit CTA affordance to the "Uma busca mais simples" cards;
- reinforce direct Tegra Vendas service and "Não aceite intermediações de terceiros";
- surface Sabrina da Tegra and telephone `(11) 96077-9328`;
- reinforce "Na recepção, solicite Sabrina da Tegra";
- standardize the lead form so the first field is `O que você deseja?`;
- derive project context from the project card selected in the current page;
- when no card was selected, identify the lead as `Página principal | Nenhum empreendimento selecionado | <intenção>`.

### Form 46 standardization

Project pages and the home use the same intent vocabulary:

- `Condições e disponibilidade`;
- `Agendar visita`;
- `Simular forma de pagamento`;
- `Falar com especialista`.

The Green/GDigital payload remains:

```text
tenant_id = 313
form_id = 46
title = MoreEmUmTegra
POST = https://back.gdigital.com.br/form/register
```

`texto-livre` is composed client-side as `<empreendimento/contexto> | <intenção>`.

No visitor name, e-mail, telephone or `texto-livre` value is added to GA4/dataLayer.

### CAPIITOLO

- correct the oversized desktop commercial typography without changing the editorial hero typography;
- normalize the visible commercial reference to `Ref. 210 m² · unidade 33 · Ago/26 · pagamento à vista`;
- show the exact geographic point in the map through coordinates, without displaying street/number in the map or location/FAQ copy;
- map click opens WhatsApp to request the exact location and arrange the visit;
- keep the exact address visible only in the page footer:
  `AGENDE SEU ATENDIMENTO no CAPIITOLO · Rua Ibaragui Nissui, 166 — Chácara Klabin · São Paulo/SP · CEP 04116-200`;
- keep the exact address in factual JSON-LD and add `postalCode = 04116-200` to the in-loco project/address entities;
- record Product Authority confirmation that unit 33 is available and add `availability = https://schema.org/InStock` to the exact commercial Offer;
- do not add `hasMerchantReturnPolicy`: the existing Merchant Listing warning remains optional and exchanging a real-estate purchase for another development is not modeled as a merchandise return policy;
- replace the legacy free-text lead message with the standardized intent selector;
- use the supplied WhatsApp image in the floating action with `#25d366`, preserving a separate text CTA for conditions;
- keep the visible FAQ and FAQPage schema aligned.

### Ária Higienópolis

- preserve the existing exact-project entity graph;
- add a Product entity for the governed Studio 1510 commercial reference and connect it to the existing Offer;
- standardize form intent values;
- standardize floating WhatsApp/icon and conditions CTA behavior.

### Caminhos da Lapa Elo Duo

- preserve the existing structured-data model;
- add the Ária-style location/WhatsApp map interaction;
- standardize form intent values and default ordering;
- standardize floating WhatsApp/icon and conditions CTA behavior.

## Invariants

- canonical routes remain unchanged;
- robots/indexability remain unchanged;
- sitemap remains unchanged;
- Form 46 provider/contract remains unchanged;
- GTM/GA4 IDs and conversion semantics remain unchanged;
- no new framework, backend or dependency;
- no artificial commit is created to trigger deployment;
- non-main automatic deployment remains disabled;
- no `hasMerchantReturnPolicy` is fabricated.

## Release gate

This document does not authorize merge or production promotion.

Before merge, the branch must pass static checks for:

- JSON-LD parseability and internal `@id` integrity;
- one H1 per exact-project page;
- one real lead form per rendered source page;
- standardized intent composition;
- Form 46 contract preservation;
- CAPIITOLO address visibility rules;
- CAPIITOLO availability/postal code;
- Ária Product -> Offer linkage;
- no regression to canonical/index/follow.


## Static QA result

Validated on the exact branch state before PR creation:

```text
BASE_MAIN = 2a30a4fa4080b58d4fa571915f05809c634ba929
BRANCH = fix/ux-form-schema-standardization-20260918
STATIC_QA = PASS
JSON_LD_PARSE = PASS
CANONICALS = PRESERVED
INDEX_FOLLOW = PRESERVED
H1 = 1 per home/exact-project source
FORM46_CONTRACT = PRESERVED
HOME_FORM = 1
CAPIITOLO_RENDER_SOURCE_FORM = 1
ARIA_FORM = 1
ELO_DUO_FORM = 1
HOME_MANUAL_PROJECT_INPUT = REMOVED
LEAD_CONTEXT_COMPOSITION = PASS
CAPIITOLO_POSTAL_CODE = 04116-200
CAPIITOLO_UNIT_33_AVAILABILITY = InStock
CAPIITOLO_HAS_MERCHANT_RETURN_POLICY = ABSENT_BY_DESIGN
CAPIITOLO_MAP_STREET_QUERY = ABSENT
CAPIITOLO_MAP_COORDINATE_POINT = PRESENT
CAPIITOLO_VISIBLE_FAQ_SCHEMA_PARITY = 6/6
ARIA_VISIBLE_FAQ_SCHEMA_PARITY = 11/11
ARIA_PRODUCT_OFFER_LINK = PASS
ARIA_INTERNAL_SCHEMA_REFERENCES = PASS
FLOATING_WHATSAPP_ASSET = STANDARDIZED
CONSENT_BANNER_OFFSET = SHARED_RUNTIME
```

The CAPIITOLO exact address remains present in factual structured data and the footer, while the map/location/FAQ conversion path does not expose street/number and routes location requests through WhatsApp.

This is branch/static evidence only. It is not evidence of Vercel deployment, production HTTP behavior, Search Console processing or Google recrawl.
