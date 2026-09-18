# SEO / Search Console / Rich Results — Post-Release Validation

Status: `PASS / VALIDATION RESIDUALS CLOSED`

Observed: `2026-09-18`  
Canonical web runtime release SHA: `782c25b7229af99d0f1839bbfc6af412a5cb31e7`  
Repository state before this docs-only canonicalization: `9d96c1a6d654a8282f5f49815a6c05ca116decf7`

## Evidence classes

This record combines:

1. Product Authority screenshots from Google Search Console / Rich Results Test;
2. read-only Search Console data from the connected `sc-domain:moretegra.com.br` property;
3. repository-static canonical/indexability/JSON-LD validation already completed after PRs #117–#119.

No runtime mutation is authorized or required by this record.

## Sitemap

After Product Authority resubmitted `sitemap.xml`, Search Console returned:

```text
SITEMAP = https://www.moretegra.com.br/sitemap.xml
LAST_SUBMITTED = 2026-09-18T19:21:25.246Z
LAST_DOWNLOADED = 2026-09-18T19:21:25.821Z
SUBMITTED_URLS = 4
ERRORS = 0
WARNINGS = 0
```

The four canonical URLs are:

1. `https://www.moretegra.com.br/`
2. `https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/`
3. `https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/`
4. `https://www.moretegra.com.br/empreendimentos/aria-higienopolis/`

Therefore:

```text
GSC_SITEMAP = ACCEPTED
SITEMAP_URLS = 4
SITEMAP_ERRORS = 0
SITEMAP_WARNINGS = 0
SITEMAP_REFRESH = CONFIRMED
```

## Indexation evidence

Product Authority supplied URL Inspection evidence showing:

### Home

```text
URL = https://moretegra.com.br/
URL_IS_ON_GOOGLE = YES
PAGE_INDEXED = YES
HTTPS = PASS
VIDEO_INDEXATION = NO_VIDEO_INDEXED
```

The absence of a video-indexing result does not invalidate the indexed page or the valid VideoObject structured data.

### CAPIITOLO

```text
URL = https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/
URL_IS_ON_GOOGLE = YES
PAGE_INDEXED = YES
HTTPS = PASS
PRODUCT_SNIPPET = VALID
MERCHANT_LISTING = VALID
BREADCRUMB = VALID
```

### Caminhos da Lapa Elo Duo

```text
URL = https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/
URL_IS_ON_GOOGLE = YES
PAGE_INDEXED = YES
HTTPS = PASS
PRODUCT_SNIPPET = VALID
MERCHANT_LISTING = VALID
BREADCRUMB = VALID
```

### Ária Higienópolis

The URL Inspection detail was expanded and showed:

```text
URL = https://www.moretegra.com.br/empreendimentos/aria-higienopolis/
PAGE_INDEXED = YES
SITEMAP = https://www.moretegra.com.br/sitemap.xml
LAST_CRAWL = 2026-09-18 12:43:47
CRAWLED_AS = Googlebot Smartphone
CRAWL_ALLOWED = YES
PAGE_FETCH = SUCCESS
INDEXING_ALLOWED = YES
DECLARED_CANONICAL = https://www.moretegra.com.br/empreendimentos/aria-higienopolis/
GOOGLE_SELECTED_CANONICAL = INSPECTED_URL
```

Therefore:

```text
HOME_INDEXATION = INDEXED
CAPIITOLO_INDEXATION = INDEXED
ELO_DUO_INDEXATION = INDEXED
ARIA_INDEXATION = INDEXED
ARIA_GOOGLE_CANONICAL = ACCEPTED
ARIA_MOBILE_GOOGLEBOT_FETCH = PASS
```

CAPIITOLO and Elo Duo were shown as indexed at their inspected URLs; their expanded Google-selected-canonical detail was not included in the submitted screenshots, so this record does not invent that sub-field.

## Rich Results parity

Product Authority reran the Google Rich Results Test after PR #118.

Each exact-project page returned:

```text
TOTAL_VALID_ITEMS = 7

Product Snippet       = 1
Merchant Listing      = 1
Breadcrumb            = 1
Local Business        = 2
Organization          = 2
```

Therefore:

```text
CAPIITOLO_RICH_RESULTS = 7_VALID
ELO_DUO_RICH_RESULTS = 7_VALID
ARIA_RICH_RESULTS = 7_VALID
STRUCTURED_DATA_PARITY = PASS
```

The home returned:

```text
TOTAL_VALID_ITEMS = 5

Local Business = 2
Organization   = 2
Video          = 1
```

This is valid for the home/collection role and is not expected to mirror the product-page topology.

## Non-critical warnings

The Product and Merchant Listing results still expose non-critical optional warnings.

They do not authorize fabricated data. In particular, do not invent or add unsupported:

- `aggregateRating`;
- `review`;
- `shippingDetails`;
- `hasMerchantReturnPolicy`;
- other optional commercial properties solely to remove warnings.

## Closure classification

```text
HOME_INDEXATION = INDEXED
CAPIITOLO_INDEXATION = INDEXED
ELO_DUO_INDEXATION = INDEXED
ARIA_INDEXATION = INDEXED

GSC_SITEMAP = ACCEPTED
SITEMAP_URLS = 4
SITEMAP_ERRORS = 0
SITEMAP_WARNINGS = 0

CAPIITOLO_STRUCTURED_DATA = VALID
ELO_DUO_STRUCTURED_DATA = VALID
ARIA_STRUCTURED_DATA = VALID
PROJECT_RICH_RESULTS_PARITY = PASS_7_7_7
HOME_RICH_RESULTS = VALID_5

ARIA_GOOGLE_CANONICAL = ACCEPTED
CODE_CHANGE_REQUIRED = NO
```

## Governance consequence

The following prior residuals are closed:

- `ARIA_GSC_INDEXATION = NOT_PROVEN`;
- `CAPIITOLO_POST_115_GSC_RECRAWL = NOT_PROVEN`;
- `GSC_SITEMAP_PROCESSING = NOT_PROVEN`;
- `RICH_RESULTS_PARITY = NOT_PROVEN`.

No WBS progress is changed by this validation record.

The next safe action is to resolve the next canonical WBS/product task from repository governance. Do not infer or invent the next task, and do not mutate runtime merely because the post-release validation gate is now closed.
