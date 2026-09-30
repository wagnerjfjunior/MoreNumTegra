# Search Intelligence Data Layer

Status: `REUSABLE_PROJECT_DATASET`
Created: `2026-09-30`

## Purpose

Preserve search-market evidence outside chat so future MoreNumTegra work can reuse the same factual base without restarting research.

## Structure

```text
docs/search/data/search-intelligence/
├── raw/
│   └── google-keyword-planner/
│       └── 2026-09-29/
│           └── 6 original Keyword Planner CSV exports
└── caminhos-lapa/
    ├── search_intelligence_2026-09-30.json
    └── search_intelligence_2026-09-30.csv
```

## Evidence layers

1. `GOOGLE_KEYWORD_PLANNER`
   - raw user-supplied exports dated 2026-09-29;
   - observation window in those exports: 2025-09-01 through 2026-08-31;
   - earlier canonical M3 Planner universe remains at:
     `docs/search/data/MNT_M3_01_PLANNER_UNIVERSE_2026-09-13.csv`.

2. `GSC_FIRST_PARTY`
   - property: `sc-domain:caminhosdalapategra.com.br`;
   - mature historical evidence already canonicalized under `docs/search/`;
   - 2026-09-30 live connector observations are normalized into the Caminhos dataset.

3. `PUBLIC_SERP_SURFACE`
   - official Tegra / Caminhos surfaces;
   - major marketplace/project surfaces observed live;
   - presence means a surfaced competitor/entity result, not an exact Google rank unless explicitly recorded.

4. `USER_OBSERVED_SERP`
   - allowed only when explicitly marked;
   - never silently promoted to measured Search Console position.

## Reuse rules

- Do not infer organic difficulty from Google Ads competition.
- Do not infer current MoreTegra ranking from the sibling Caminhos GSC property.
- Do not sum GSC page/query dimensional rows as if they were additive property totals.
- Do not destroy or redirect a URL based only on lifecycle state or one SERP observation.
- Search ownership is semantic governance, not an HTML canonical directive.
- Every future refresh should add a dated snapshot rather than overwrite the historical evidence.

## Current material governance issue

The Caminhos master entity currently has two material first-party/public surfaces:

- historical Search-equity surface: `https://caminhosdalapategra.com.br/`;
- current official master-development surface: `https://www.caminhosdalapaoficial.com.br/`.

Therefore master-domain ownership is `GOVERNANCE_RECONCILIATION_REQUIRED`.
No redirect, canonical-tag, DNS or destructive consolidation is authorized by this dataset.
