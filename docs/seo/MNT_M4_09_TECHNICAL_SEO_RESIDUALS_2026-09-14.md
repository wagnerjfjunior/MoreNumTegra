# MNT-M4-09 — Technical SEO residual closure

Status: `COMPLETE_CANDIDATE / PENDING_READY_MERGE`

Execution base: canonical main `0ebd47a9901b9670c6a975082d881181185c02ca` after the Vercel `www` production cutover closeout.

## Current production truth

Technical Baseline V2.3 and ADR-006 govern current production:

- canonical/indexable host: `https://www.moretegra.com.br/`;
- apex `https://moretegra.com.br/` -> permanent 308 -> `www`, with path/query preservation;
- Vercel Production = commercial web runtime;
- `*.vercel.app` remains `noindex,nofollow`;
- `lp.moretegra.com.br` = non-canonical Green/GDigital legacy/fallback;
- root `robots.txt` and `sitemap.xml` are deployed;
- Search Console evidence records the `www` home indexed with Google-selected canonical equal to `www`.

The Vercel compositor also enforces the production canonical after loading the legacy consolidated JS artifact, so the older apex value retained inside `src-greenn/moretegra.js` does not become the final canonical in the current `www` runtime.

## M4-09 adjudication

The technical SEO residuals originally expected for M4-09 were materially closed by PRs #80/#81 before this task was restacked. M4-09 therefore validates and preserves that integrated state rather than duplicating or regressing it.

### Closed

- commercial canonical host = `www`;
- apex redirect = 308 to `www`;
- production homepage indexability = index/follow;
- Vercel preview host protection = noindex/nofollow;
- `robots.txt` deployed;
- `sitemap.xml` deployed with only real canonical live URLs;
- `/obrigado/` excluded from organic indexation under the V2.3 contract.

### Residuals carried forward

- `/favicon.ico` 404 observed in post-cutover Pingdom HAR: minor asset residual, not an M4 Search blocker;
- GSC sitemap submission/processing state: separate evidence gate; deployment does not prove submission/processing;
- exact GTM published version number for the `www` cutover remains `NOT_RECORDED` and must not be invented.

## Mozae factual closure

Product Authority supplied exact Mozae unit areas spanning `44.85 m²` to `73.40 m²`. The current live Tegra product page presents commercial typologies as `46 m² e 73 m²`.

Governed interpretation:

- exact decimal values = unit-level truth;
- `46 m² e 73 m²` = current official commercial typology label;
- `45 m² a 73 m²` = valid rounded portfolio range.

Therefore the portfolio runtime wording `45m² a 73m²` is not a factual contradiction when used as a rounded range. The former `RUNTIME_METRAGE_CORRECTION_REQUIRED` registry disposition is superseded by the M3-04 reconciliation artifact.

## Closure

No known blocking technical-SEO or Product-Truth contradiction remains for integrated M4 closure. After this PR is accepted and merged, M4 may be declared `COMPLETE`; M5 remains separately gated.
