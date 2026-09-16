# MoreNumTegra — Commercial Data Plane v2

Status: `PROPOSED / DOCS-ONLY / NO_RUNTIME_MUTATION`
Date: 2026-09-16
Canonical repository: `wagnerjfjunior/MoreNumTegra`
Implementation base observed: `379233a7f5c6127f405eff10ba7513950b8e5723`

## 1. Purpose

Separate volatile commercial state from the MoreNumTegra presentation/runtime so that price, unit, availability and commercial-condition updates can be performed without editing page HTML/CSS/JS.

The target operating model is:

```text
SITE CODE / PRESENTATION
!=
COMMERCIAL DATA STATE
```

The site remains responsible for rendering, SEO structure, forms, measurement and safe fallback behavior. A governed commercial data source becomes responsible for volatile commercial values.

This contract does not authorize a production data endpoint, backend, database, new secret, or deployment. It defines the data boundary and migration rules only.

## 2. Current-state finding

The current repository contains three commercial-data patterns:

1. `src-greenn/moretegra.js` still embeds commercial values directly inside the monolithic `PROJECTS` collection, including fields such as `price`, `priceNote`, promotion/unit data and price-per-square-meter narrative.
2. `src-greenn/data/commercial-values.json` already provides an externalized governed commercial record for `caminhos-da-lapa-elo-duo`.
3. `src-greenn/empreendimentos/capiitolo-piero-lissoni/index.html` still embeds the current CAPIITOLO commercial reference directly in bootstrap HTML and generated price-section markup.

The Elo Duo project page already demonstrates the desired consumer behavior through `src-greenn/project-page.js`: load a governed commercial record, render it when valid, and fail closed to a consult-only message when commercial state is absent or invalid.

## 3. Architectural decision

Commercial values must have one governed source of truth per published snapshot.

All rendering surfaces consume the same commercial record by stable `projectId`.

```text
projectId
  -> commercial record
      -> homepage
      -> exact-project page
      -> schema Offer, when eligible
      -> future administrative editor
```

A presentation surface MUST NOT independently own a duplicate price, unit, promotion or availability value.

## 4. Data classes

### 4.1 Static / descriptive product truth

Examples:

- project name;
- canonical slug;
- address when governed;
- typologies and permanent areas;
- bedrooms/suites/parking where governed;
- amenities;
- project stage when treated as governed product state;
- media URLs;
- permanent descriptive content.

These remain outside the commercial-value feed unless a later contract explicitly changes the boundary.

### 4.2 Volatile commercial state

The commercial feed owns fields such as:

- current reference price;
- previous/reference promotional price;
- unit identifier;
- area of the priced unit;
- availability label;
- typology availability;
- commercial label (`A partir de`, `Valor promocional`, etc.);
- commercial-reference narrative;
- observed-at date;
- optional validity/expiry boundary;
- source/provenance class;
- disclaimer;
- state (`active_reference`, `consult_only`, `inactive`).

## 5. Canonical commercial schema — v2

The normative machine-readable schema is:

`docs/architecture/MNT_COMMERCIAL_DATA_SCHEMA_V2.schema.json`

Minimum target envelope:

```json
{
  "schemaVersion": 2,
  "generatedAt": "2026-09-16T00:00:00-03:00",
  "currency": "BRL",
  "projects": {
    "capiitolo-piero-lissoni": {
      "state": "active_reference",
      "priceLabel": "A partir de",
      "price": 3647490,
      "oldPrice": null,
      "unit": "24",
      "areaSqm": 210,
      "inventoryLabel": "Consulte disponibilidade",
      "typologyAvailability": {},
      "observedAt": "2026-09-15",
      "validUntil": null,
      "sourceClass": "PRODUCT_AUTHORITY",
      "sourceRef": null,
      "disclaimer": "Valor de referência comercial. Disponibilidade, unidade e condições podem mudar; confirme as condições vigentes no atendimento."
    }
  }
}
```

The example above illustrates field shape only. A value is publishable only when backed by the applicable project evidence/authority.

## 6. Derived values

Derived values SHOULD be calculated by the consumer or normalizer instead of being independently stored whenever the inputs are available.

Primary example:

```text
pricePerSqm = price / areaSqm
```

Do not maintain `price`, `areaSqm` and a separately typed `pricePerSqm` as three independent commercial truths unless a source explicitly governs the supplied square-meter value and a validation rule checks consistency.

Formatting is presentation logic:

```text
3647490 -> R$ 3.647.490
```

The feed stores numeric values, not preformatted currency strings, except where a source narrative must be preserved separately as evidence.

## 7. State semantics

### `active_reference`
A current governed commercial reference exists and passes validation.

### `consult_only`
The project may remain visible but no current price/reference may be published. Consumers render a consult-only message.

### `inactive`
The commercial record must not be treated as a current offer/reference. Site behavior for project visibility remains governed separately by product/runtime rules.

Unknown or invalid states MUST fail closed.

## 8. Fail-closed contract

If the commercial feed is unavailable, malformed, expired under an explicit validity rule, missing the requested project, or contains a non-publishable state, the consumer MUST NOT silently use an embedded stale price.

Preferred behavior:

```text
PRICE = "Consulte valores atuais"
AVAILABILITY = "Consulte disponibilidade"
COMMERCIAL_REFERENCE = "Disponibilidade, unidade e condição comercial precisam ser confirmadas no atendimento."
```

No hardcoded stale-value fallback is permitted after migration.

## 9. Consumer contract

Each commercial rendering surface must identify the project by stable `projectId`.

Example:

```html
<body data-project-id="capiitolo-piero-lissoni">
```

or an equivalent project key in the homepage catalog object.

Consumers render commercial state through semantic hooks rather than embedding the value:

```html
<span data-commercial-label></span>
<span data-commercial-price></span>
<span data-commercial-unit></span>
<span data-commercial-area></span>
<span data-commercial-price-per-sqm></span>
<span data-commercial-reference></span>
<span data-commercial-disclaimer></span>
```

The exact DOM contract may be implemented differently per page type, but the commercial source remains singular.

## 10. Update channels

All update mechanisms must normalize into the same schema before publication.

Supported target inputs:

```text
GPT instruction
TXT / CSV / JSON import
Administrative front-end
Manual governed fallback
```

No input channel is allowed to mutate page HTML/JS directly for routine commercial updates.

### 10.1 GPT

A GPT-assisted workflow may translate an authorized human instruction into a candidate commercial-data diff. It must not invent missing price, unit, area, availability, date or provenance.

### 10.2 TXT

A human-friendly TXT import may use a format such as:

```text
PROJETO: CAPIITOLO
VALOR: 3647490
UNIDADE: 24
METRAGEM: 210
DATA: 2026-09-15
```

The parser maps project identity to canonical `projectId`, validates fields, and emits the same v2 record.

### 10.3 Administrative front-end

A future editor may expose project selection and structured commercial fields. Browser code must not contain repository, database or provider secrets. Direct publish requires a separately authorized protected write path.

## 11. Validation gates

Before a commercial snapshot is publishable:

1. `schemaVersion` must be supported;
2. `projectId` must map to a governed known project;
3. `state` must be allowed;
4. `price`, when required by state, must be finite and positive;
5. `areaSqm`, when present, must be finite and positive;
6. `oldPrice`, when present, must be finite and positive;
7. a promotion with `oldPrice` must not silently invert old/current values;
8. `observedAt` must be present for active commercial references;
9. provenance/source class must be explicit;
10. project data must not contain visitor PII or secrets;
11. invalid input must fail the publication gate rather than degrade into an arbitrary value;
12. duplicate project records in one snapshot are forbidden.

Additional project-specific checks may be added without weakening these gates.

## 12. Deployment independence requirement

Moving data from `moretegra.js` into `src-greenn/data/commercial-values.json` improves maintainability but does NOT by itself achieve operational independence, because the file still belongs to the Vercel project tree and its mutation is currently deployment-relevant.

The target architecture therefore separates:

```text
CONTROL PLANE
- schema
- validator
- source rules
- consumer contract
- governance

DATA PLANE
- current publishable commercial snapshot
```

A later implementation gate must choose the externally consumable data-plane publication mechanism.

Requirements for that mechanism:

- no secret exposed to public browser code;
- public payload contains only publishable commercial data;
- HTTPS;
- predictable URL or discovery mechanism;
- atomic snapshot publication or equivalent consistency guarantee;
- version/audit history;
- rollback capability;
- CORS compatible with `www.moretegra.com.br` when cross-origin;
- cache semantics appropriate for commercial updates;
- fail-closed consumer behavior;
- update of commercial data must not require changing MoreNumTegra HTML/CSS/JS;
- update of commercial data should not require a MoreNumTegra Vercel deployment.

No provider is selected by this docs-only work package.

## 13. SEO and structured data

Static descriptive schema remains bound to governed product truth.

Commercial `Offer` markup, when present, must be generated only from a valid active commercial record. If the current commercial record is missing/non-publishable, the site must remove or omit the `Offer` rather than preserve a stale structured-data price.

Commercial-data externalization must not cause hidden discrepancies where visible price and structured-data price come from different sources.

## 14. Performance

Commercial data is small and must not become a material mobile performance dependency.

Implementation should prefer:

- one small commercial snapshot request per document or equivalent shared cache;
- no heavy client library;
- native `fetch` where applicable;
- bounded timeout/failure behavior;
- no blocking of primary static product content;
- safe skeleton/consult-only state while commercial data resolves.

## 15. Security and privacy

The public commercial feed MUST NOT contain:

- credentials;
- tokens;
- API keys;
- repository write credentials;
- customer/lead PII;
- internal-only commercial evidence not intended for publication.

The administrative update path is logically separate from the public read path.

```text
PUBLIC_READ != ADMIN_WRITE
```

## 16. Migration plan

### Stage A — contract and inventory

- canonicalize this data contract;
- inventory every runtime commercial hardcode;
- define forbidden duplicate fields and test patterns.

### Stage B — local consumer unification

- generalize the current Elo Duo consumer into a reusable commercial-data consumer;
- migrate homepage to `projectId`-based commercial rendering;
- migrate CAPIITOLO bootstrap/price section;
- migrate Elo Duo without regression;
- place all current governed commercial references in one v2 snapshot;
- validate local-first.

At this stage, the JSON may temporarily remain repository-local for controlled migration/testing.

### Stage C — anti-regression tests

Add checks that reject reintroduction of commercial hardcodes in presentation code, while allowing legitimate non-price numeric content such as addresses, areas, form IDs and analytics identifiers.

Tests must be scoped; naive blanket searches for every number are forbidden.

### Stage D — independent data plane

- select/authorize publication mechanism;
- publish the commercial snapshot independently of the site deploy;
- point consumers to the independent read surface;
- validate CORS/cache/fail-closed behavior;
- prove commercial update without site-code mutation/deployment.

### Stage E — operator workflows

- TXT/CSV/JSON importer;
- GPT-assisted candidate diff;
- optional administrative UI;
- protected publish gate;
- audit history and rollback.

## 17. Initial hardcode inventory

At the implementation base recorded above, material migration targets include at least:

- `src-greenn/moretegra.js`: homepage `PROJECTS` commercial fields (`price`, `priceState`, `priceLabel`, `priceNote`, `promo`, embedded unit/reference narratives);
- `src-greenn/empreendimentos/capiitolo-piero-lissoni/index.html`: bootstrap price/reference text and generated `priceSection` commercial markup;
- any structured-data `Offer` or commercial schema field that may duplicate a visible commercial value;
- existing project consumers that load `src-greenn/data/commercial-values.json`, to be unified under the v2 contract rather than duplicated.

A machine-assisted full inventory must be performed against the exact implementation base before Stage B mutation.

## 18. Non-goals of this work package

This contract does NOT:

- change current commercial values;
- authorize new price claims;
- redesign homepage or project pages;
- change Form 46;
- change GTM/GA4;
- change canonical URLs, sitemap, robots or DNS;
- create FECH.AI/n8n/Make integration;
- create Meta/CAPI integration;
- select Supabase, Vercel KV, GitHub Pages, Cloudflare, S3 or any other data-plane provider;
- expose secrets in browser code;
- authorize deployment while a provider constraint is active.

## 19. Acceptance criteria for architecture phase

Architecture phase is acceptable when:

```text
ONE_COMMERCIAL_SCHEMA = DEFINED
STATIC_VS_VOLATILE_BOUNDARY = DEFINED
FAIL_CLOSED = REQUIRED
MULTI_INPUT_NORMALIZATION = DEFINED
PUBLIC_READ_VS_ADMIN_WRITE = SEPARATED
DEPLOYMENT_INDEPENDENCE = REQUIRED
PROVIDER = NOT_YET_SELECTED
RUNTIME_MUTATION = NONE
```

The next implementation work package after acceptance is a local-first Stage B migration on the then-current canonical `main`.
