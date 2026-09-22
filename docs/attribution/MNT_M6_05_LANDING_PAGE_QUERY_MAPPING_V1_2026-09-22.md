# MNT-M6-05 — Landing-page / query mapping v1

Date: `2026-09-22`

Status: `COMPLETE / 29_READY / 1_BLOCKED / NO_EXTERNAL_ADS_MUTATION`

## 1. Purpose

Map every M6-04 planned Search keyword seed to its intended landing page and decide whether the landing is currently fit to receive that query.

M6-05 owns:

- campaign -> query -> final URL mapping;
- factual coverage verification;
- CTA/Form 46 readiness;
- landing mismatch adjudication;
- query-ownership conflict resolution;
- Home/portfolio journey readiness;
- SEO-card semantic correction relevant to landing quality.

M6-05 does not:

- create Google Ads campaigns;
- upload keywords or ads;
- authorize spend;
- create conversion actions;
- change bids;
- enable Broad/AI Max;
- link Google Ads and GA4.

## 2. Runtime anchor

The authorized M6-05 work uncovered and corrected a real Home journey regression before declaring the portfolio landing ready.

```text
regression source = static Home consolidation on 2026-09-17
historical behavior = post-interest context with curated 2/3-image gallery
regression = data-form-anchor lost from Vercel Home while JS implementation remained
fix PR = #231
runtime SHA = 124b620855175a583c528733462d6d0f4f44cd41
production deployment = dpl_9xYzKZnnVM8qAKDEgnBNXCUvPv7C
production state = READY
```

The correction restored one mount without reusing `#formulario`, so Form 46 remains the unique form anchor.

Browser smoke proved on Chromium, Firefox and WebKit:

- Soma Perdizes card visible;
- semantic search copy visible;
- `Preço a partir de` visible;
- post-interest context visible;
- curated gallery with two images visible;
- Form 46 `data-selected-project = Soma Perdizes`.

No GTM/GA4/Green endpoint change occurred.

## 3. Home card semantic enrichment

M6-05 also adopted a bounded visible-card copy improvement based on the already accepted M3 search-demand research.

The project data remains unchanged. The rendering layer now exposes natural, factual phrases such as:

```text
Soma Perdizes
Studios e apartamentos Tegra em Perdizes.
Studios de 25m² · apartamentos de 41m² e 45m² · salas comerciais
Preço a partir de R$ 630.000
```

The same pattern applies to every project card:

```text
canonical project H3
+
natural residential/location phrase
+
expanded factual typology text
+
governed commercial price block
```

This is not a keyword-stuffing strategy.

Rules:

- no hidden keyword text;
- no invented product facts;
- no artificial repetition of "preço" in all prose;
- project name remains the H3;
- location and residential semantics are visible to the user;
- regular priced cards use the natural label `Preço a partir de`;
- project commercial state remains governed by existing source data.

Google Search can render JavaScript-generated page content. These cards render on the initial page execution and do not require a user click.

However, the restored interest gallery requires explicit user interaction. Google Search does not click the page to reveal interaction-gated content, therefore the post-interest gallery is treated as conversion UX and not as primary SEO evidence.

Primary paid landing relevance must be supported by the landing's normal visible content, title/H1 and commercial journey.

## 4. Search-demand rationale

Existing canonical M3 Keyword Planner evidence includes material demand for project and location families, for example:

```text
ária higienópolis ≈ 1,900 avg monthly searches
soma perdizes ≈ 1,300
apartamentos perdizes ≈ 1,300
lapa apartamentos ≈ 1,000
apartamentos higienopolis sao paulo ≈ 170
```

These values are historical research evidence from the governed M3 study and are not new current forecasts.

The card improvement therefore reinforces legitimate entity/location/product semantics already present in the catalogue rather than introducing unrelated terms.

## 5. Final landing pages

### mnt-cmp-000001 — Ária Higienópolis

Final URL:

`https://www.moretegra.com.br/empreendimentos/aria-higienopolis/`

Landing state: `READY`

Verified coverage includes:

- Ária / Tegra / Higienópolis;
- apartments;
- studios;
- price/value;
- visit;
- ready-to-move;
- Form 46;
- conditions/disponibility CTA.

Seeds:

```text
aria-001 READY
aria-002 READY
aria-003 READY
aria-004 READY
aria-005 READY
aria-006 READY
aria-007 READY
aria-008 READY
```

## 6. mnt-cmp-000002 — Elo Duo

Final URL:

`https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/`

Landing state: `READY`

Verified coverage includes:

- Elo Duo / Tegra;
- Caminhos da Lapa / Lapa;
- apartment;
- price/value;
- visit;
- ready-to-move;
- Form 46;
- conditions/disponibility CTA.

Seeds:

```text
elo-001 READY
elo-002 READY
elo-003 READY
elo-004 READY
elo-005 READY
elo-006 READY
elo-007 READY
elo-008 READY
```

## 7. mnt-cmp-000003 — CAPIITOLO by Piero Lissoni

Final URL:

`https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/`

Landing state: `READY`

Verified rendered/runtime coverage includes:

- CAPIITOLO and natural Capitolo variants;
- Tegra;
- Piero Lissoni;
- Chácara Klabin;
- apartments;
- 210 m²;
- price/value;
- visit;
- Form 46;
- conditions CTA.

Existing M5-06 browser tests already validate the CAPIITOLO conditions and visit journeys.

Seeds:

```text
cap-001 READY
cap-002 READY
cap-003 READY
cap-004 READY
cap-005 READY
cap-006 READY
cap-007 READY
cap-008 READY
```

## 8. mnt-cmp-000004 — Portfolio Tegra / Home

Final URL:

`https://www.moretegra.com.br/`

Landing state: `READY`

Static/normal visible support includes:

- H1 `Apartamentos Tegra em São Paulo`;
- Tegra portfolio/development discovery;
- São Paulo;
- stage/location filters;
- commercial values;
- visit/conditions journey;
- Form 46.

The PR #231 card enrichment is additive support, not the sole landing proof.

Ready seeds:

```text
prt-001 apartamentos tegra             READY
prt-002 apartamentos tegra             READY
prt-003 apartamentos tegra são paulo   READY
prt-004 empreendimentos tegra são paulo READY
prt-005 tegra apartamentos             READY
```

## 9. Blocked seed — tegra vendas

`prt-006 | tegra vendas`

Decision:

`BLOCKED_DO_NOT_TARGET`

Reason:

M3-06 already classifies the `brand_sales_house` family represented by `tegra vendas` as:

```text
intent = corporate_partner_recruitment_navigation
service_decision = DO_NOT_TARGET
primary_owner = NO_OWNER
```

The later Search Console appearance of `tegra vendas` does not supersede that intent contract.

Important rule:

```text
SEARCH_VOLUME_OR_IMPRESSION != PAID_BUYER_INTENT
```

The phrase may naturally appear on the site because the commercial team is Tegra Vendas, but it must not be purchased as a V1 buyer keyword under the current evidence.

## 10. Result

```text
TOTAL_PLANNED_SEEDS = 30
READY = 29
BLOCKED_DO_NOT_TARGET = 1
HOLD = 0
EXTERNAL_KEYWORDS_UPLOADED = 0
ADS_SPEND = 0
```

All four landing families are technically ready for the admitted seed set.

## 11. Final URL rules

Paid implementation must use the clean canonical final URLs above.

M6-05 does not place UTMs directly into canonical page identity.

Later M6-07 must implement the accepted M6-02 campaign metadata while preserving:

- clean canonical URL;
- `utm_id`;
- `utm_source=google`;
- `utm_medium=cpc`;
- governed `utm_campaign`;
- `gclid/wbraid/gbraid`;
- no internal UTM propagation.

## 12. Landing mismatch stop conditions

A keyword must stop before activation if any later change causes:

- project-name mismatch;
- unsupported typology;
- unsupported stage;
- stale or unavailable price claim;
- CTA/Form 46 failure;
- incorrect final URL;
- sold/historical state presented as active inventory;
- query ownership conflict.

Search volume never overrides a factual mismatch.

## 13. Machine-readable authority

Companion contract:

`docs/attribution/MNT_PAID_LANDING_QUERY_MAP_V1.json`

It contains every one of the 30 seed records and its final URL/decision.

## 14. External Search guidance observed

Current Google Search documentation used for the Home SEO treatment:

- JavaScript SEO basics:
  `https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics`
- Lazy-loaded / interaction-gated content:
  `https://developers.google.com/search/docs/crawling-indexing/javascript/lazy-loading`
- Spam policies / keyword stuffing:
  `https://developers.google.com/search/docs/essentials/spam-policies?hl=pt-br`

Google can render JavaScript-generated DOM, while interaction-gated content should not be relied upon for indexing because Google Search does not click the page.

## 15. Acceptance

```text
MNT-M6-05 = COMPLETE / LANDING_QUERY_MAP_ACCEPTED / RUNTIME_REGRESSION_FIXED
accepted_scope_equivalent = 16h
```

Program progress:

```text
FORECAST_TOTAL_HOURS = 1240
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 1000
REMAINING_FORECAST_HOURS = 240
ACCEPTED_PERCENT = 80.65
```

Next gate:

`MNT-M6-06 — Budget/spend authorization gate — 8h / AUTHORIZATION_REQUIRED`

M6-05 does not authorize Ads spend, campaign creation or external platform mutation.
