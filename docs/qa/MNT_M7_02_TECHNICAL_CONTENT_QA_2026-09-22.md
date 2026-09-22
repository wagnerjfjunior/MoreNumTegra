# MoreNumTegra — M7-02 Technical / Content QA

Date: `2026-09-22`

Status: `ACTIVE / QA_EXECUTED / P1_PRODUCT_TRUTH_BLOCKERS_OPEN / NO_RUNTIME_MUTATION`

Effective runtime:

```text
SHA = 124b620855175a583c528733462d6d0f4f44cd41
Production deployment = dpl_9xYzKZnnVM8qAKDEgnBNXCUvPv7C
Production state = READY
Canonical host = https://www.moretegra.com.br/
```

## 1. Contract

M7-02 validates the effective release runtime against the adopted RESF C15 release contract and current MoreNumTegra functional/technical baselines.

This task is QA-first. It does not authorize Product Truth changes, new commercial values, publication, paid media, Looker Studio, Meta/CAPI or new routes.

RESF C15 reference posture:

```text
technical/content/schema/mobile/tracking/lead/regression QA required
reference release threshold = P0 0 / P1 0
publication = separate consumer authority
```

## 2. Production technical matrix

The production sitemap currently exposes four canonical/indexable URLs.

| Route | HTTP | Canonical | Robots | H1 | Meta description | Favicon | Form/lead surface |
|---|---:|---|---|---|---|---|---|
| Home | 200 | PASS | index,follow | 1 | PASS | canonical Tegra WebP | PASS |
| CAPIITOLO | 200 | PASS | index,follow | 1 | PASS | canonical Tegra WebP | JS-composed editorial source contains Form 46 |
| Elo Duo | 200 | PASS | index,follow | 1 | PASS | canonical Tegra WebP | PASS |
| Ária | 200 | PASS | index,follow | 1 | PASS | canonical Tegra WebP | PASS |

Root discovery:

```text
/robots.txt = 200 / Allow / / sitemap advertised
/sitemap.xml = 200 / 4 canonical indexable URLs
```

No Tegra corporate-site URL leak was observed in the inspected commercial HTML surfaces.

## 3. Structured data / visible content

### Home

Observed:

- visible FAQ exists;
- FAQPage schema exists;
- one H1;
- CollectionPage / ItemList / RealEstateAgent graph present;
- Form 46 present;
- commercial footer present.

### Ária

Observed:

- visible FAQ exists as HTML `details`;
- FAQPage schema exists and corresponds to visible questions;
- Form 46 exists;
- WhatsApp commercial action exists;
- one H1.

### Elo Duo

Observed:

- Form 46 exists;
- WhatsApp commercial action exists;
- one H1;
- no FAQPage was required/observed in the inspected page.

### CAPIITOLO

The production bootstrap initial HTML contains canonical/schema/commercial shell and then loads:

```text
/experiments/capiitolo-editorial-v3/index.html
```

through client-side `fetch(..., {cache:"no-store"})`, parses the fetched document with `DOMParser`, then replaces the document with `document.write`.

The editorial source contains:

- visible FAQ;
- Form 46;
- WhatsApp;
- H1;
- descriptive project content.

This closes the initial false positive that FAQ/Form were missing. However, the architecture remains a technical residual because critical body content depends on client-side fetch/composition.

## 4. Exact-project commercial parity

Observed production visible price vs structured Offer:

| Project | Visible reference | Structured Offer | Result |
|---|---:|---:|---|
| CAPIITOLO | R$ 3.539.900 | 3539900 | PASS |
| Elo Duo | R$ 658.000 | 658000 | PASS |
| Ária | R$ 501.000 | 501000 | PASS |

The three values also match the governed repository-local commercial snapshot in `src-greenn/data/commercial-values.json` for those exact-project consumers.

## 5. Findings

### M7-02-F01 — P1 — Home volatile commercial state is not release-time revalidated / cross-surface drift exists

Canonical Product Truth rules require volatile price/unit/availability claims to receive release-time revalidation for the same commercial object.

The Home runtime still owns commercial values directly inside `src-greenn/moretegra.js`.

Production-served examples include:

```text
Elo Duo Home:
  AP2408 / R$ 663.000 / August promotional evidence

Elo Duo exact page:
  unit 109 / R$ 658.000 / governed snapshot observed 2026-09-17

CAPIITOLO Home:
  unit 24 / R$ 3.647.490

CAPIITOLO exact page:
  unit 33 / R$ 3.539.900 / governed snapshot observed 2026-09-17
```

Different units can legitimately have different prices. The blocker is not the numeric difference alone. The blocker is that the Home still presents volatile "current" commercial objects outside the newer governed commercial snapshot and no release-time verification receipt exists for those Home objects.

This is also the known Commercial Data Plane residual:

```text
Home PROJECTS monolith = MIGRATION_REQUIRED
volatile price/unit/promotion state duplicated in presentation source
```

Disposition:

```text
P1
RELEASE_BLOCKING_FOR_C15
DO_NOT_INVENT_REPLACEMENT_VALUES
PRODUCT_AUTHORITY / CURRENT_COMMERCIAL_EVIDENCE_REQUIRED
```

### M7-02-F02 — P1 — ODE unrecertified comparative promotion remains in Production Home runtime

Canonical Product Fact & Claim Registry states:

```text
ODE unit 22 / R$ 2.090.000 = governed exception subject to release revalidation
older comparative "De R$ 2.200.000" = not recertified / prohibited
```

Current production-served `moretegra.js` still contains:

```text
De R$ 2.200.000 por R$ 2.090.000
oldPrice: 2200000
price: 2090000
```

This is a direct conflict between current runtime copy and the canonical Product Truth disposition.

Disposition:

```text
P1
RELEASE_BLOCKING_FOR_C15
UNSUPPORTED_COMPARATIVE_CLAIM
RUNTIME_REMEDIATION_OR_EXPLICIT_RECERTIFICATION_REQUIRED
```

No remediation is performed by M7-02 because removing/replacing commercial claims is a Product Authority-controlled runtime decision.

### M7-02-F03 — P2 — CAPIITOLO critical body depends on client-side editorial fetch/document replacement

Current wrapper loads the editorial source at runtime and replaces the document.

Impact:

- extra failure mode for visible FAQ/Form/content;
- body content is not wholly present in the initial production response;
- implementation is more complex than the project's preferred portable static HTML posture.

Observed fallback exists and the page has prior indexing/runtime evidence; therefore this finding is not classified P1 in the current QA.

Disposition:

```text
P2
TECHNICAL_DEBT
REMEDIATE_IN_BOUNDED_FUTURE_RUNTIME_SLICE
```

### M7-02-F04 — P2 — Search favicon eligibility residual remains

The canonical runtime favicon is the approved Tegra WebP asset.

The technical baseline already records that Google Search favicon eligibility remains unresolved because the current Search-supported-format posture is not proven for that WebP asset.

Disposition:

```text
P2 / KNOWN_RESIDUAL
DO_NOT_CLAIM_SERP_FAVICON_FIXED
```

## 6. Severity receipt

```text
P0 = 0
P1 = 2
P2 = 2
P3 = 0
```

Therefore the RESF C15 reference release posture `P0=0 / P1=0` is not met.

## 7. M7-02 adjudication

```text
MNT-M7-02 = ACTIVE / QA_EXECUTED / P1_PRODUCT_TRUTH_BLOCKERS_OPEN
ACCEPTED_HOURS = 0
RUNTIME_MUTATION = 0
PRODUCTION_MUTATION = 0
PAID_MEDIA = FROZEN
```

The correct next action is not to invent new prices.

Product Authority must choose one bounded path:

1. provide/revalidate the current Home commercial objects and authorize reconciliation; or
2. authorize fail-closed remediation that removes unsupported/uncertified volatile claims from the affected Home cards until current evidence is supplied.

At minimum, the ODE unrecertified `R$ 2.200.000` comparative must not survive a C15 release gate unless explicitly recertified.

M7-03 and later release progression should not be used to bypass these open P1 findings.
