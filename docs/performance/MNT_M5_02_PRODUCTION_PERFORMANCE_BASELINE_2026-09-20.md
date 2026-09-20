# MNT-M5-02 — Production Performance Baseline

Status: `COMPLETE / LAB_BASELINE_ESTABLISHED / FIELD_CWV_NOT_OBSERVED`

Canonicalized: `2026-09-20`  
Repository: `wagnerjfjunior/MoreNumTegra`

## 1. Authority and scope

Product Authority explicitly authorized `MNT-M5-02 — Core Web Vitals/performance baseline` on 2026-09-20.

This task is a measurement/baseline task. It does **not** authorize performance remediation, asset replacement, media conversion, GTM changes, Form 46 changes, SEO/content changes, DNS changes or Vercel configuration changes.

The governed targets remain:

```text
LCP <= 2500 ms
INP <= 200 ms
CLS <= 0.1
```

## 2. Runtime identity

```text
CANONICAL_MAIN_AT_MEASUREMENT_START = d7b37bb3a510258d93850ffeae8eebb0be3856b6
EFFECTIVE_PRODUCTION_RUNTIME_SHA = 6aec388443410a2bff4d7c7a8ddff9d90224d8c9
PRODUCTION_DEPLOYMENT = dpl_HTzsFxSeTmpqFjyNRwMNrPXvcBLD
PRODUCTION_STATE = READY
CANONICAL_HOST = https://www.moretegra.com.br/
```

The newer `main` SHA is documentation-only. Its Vercel attempt was canceled by the configured Ignored Build Step and did not replace the effective runtime.

## 3. Methodology

Temporary diagnostic PR: `#180` — **never merge to runtime**.

GitHub Actions run:

```text
RUN = 35538473832
JOB = 106151679395
RESULT = SUCCESS
RUNNER = Ubuntu 24.04 / westus2
NODE = 22.23.2
CHROME = 152.0.7977.82
LIGHTHOUSE = 13.5.0
```

Lab methodology:

- Production canonical URLs only;
- Lighthouse mobile form factor;
- viewport emulation 393x852;
- simulated throttling;
- three runs per route;
- median values used as the baseline;
- four currently governed public surfaces;
- no Form 46 real submission;
- no runtime mutation.

Evidence artifact:

```text
ARTIFACT_ID = 10612579543
ARTIFACT_NAME = m5-02-performance-baseline
ARTIFACT_SHA256 = 53d502b7dc739f9b9f1584863d958523ee0b8bf40f10b8fbb63c8b1f7761fcdd
```

## 4. Lab baseline

| Route | Perf. score | FCP | LCP | LCP target | CLS | CLS target | TBT | Transfer |
|---|---:|---:|---:|---|---:|---|---:|---:|
| Home `/` | 97 | 953 ms | 1,346 ms | PASS | 0.0131 | PASS | 197 ms | 1,442,580 B |
| CAPIITOLO | 76 | 834 ms | 5,493 ms | **FAIL** | 0.0012 | PASS | 244 ms | 1,529,333 B |
| Elo Duo | 71 | 1,058 ms | 8,234 ms | **FAIL** | 0.0299 | PASS | 219 ms | 1,100,175 B |
| Ária Higienópolis | 80 | 918 ms | 5,357 ms | **FAIL** | 0.0281 | PASS | 100 ms | 869,157 B |

### Variability

Home had one materially slower sample:

```text
HOME_RUN_1 LCP = 2760 ms / TBT = 1048 ms / score = 73
HOME_RUN_2 LCP = 1308 ms / TBT = 86 ms / score = 100
HOME_RUN_3 LCP = 1346 ms / TBT = 197 ms / score = 97
MEDIAN LCP = 1346 ms
```

The project-page LCP failures were stable across the three runs rather than isolated spikes:

```text
CAPIITOLO LCP = 5603 / 5493 / 5263 ms
ELO DUO LCP = 8234 / 8022 / 8254 ms
ÁRIA LCP = 5357 / 5449 / 5248 ms
```

## 5. Field CWV / INP evidence boundary

The diagnostic attempted a PageSpeed Insights / CrUX field-data request for each route.

All requests returned:

```text
HTTP = 429
CAUSE = PageSpeed Online API daily query quota exceeded
CLASSIFICATION = PROVIDER_CONSTRAINT / API_UNAVAILABLE
```

Therefore:

```text
FIELD_LCP = NOT_OBSERVED
FIELD_INP = NOT_OBSERVED
FIELD_CLS = NOT_OBSERVED
```

The Lighthouse lab TBT value is **not** INP and must not be used as a substitute for INP.

The 429 response is not evidence of a site performance failure.

## 6. LCP element and delivery findings

### Home

The representative Home LCP element is text:

```text
ELEMENT = .mt-hero-lead
LCP = 1346 ms
```

The Home median meets the lab LCP/CLS targets, although the first-run variability remains recorded.

### CAPIITOLO

Representative LCP:

```text
ELEMENT = hero poster image
FORMAT = JPEG
TRANSFER = ~172 KB
LIGHTHOUSE LCP = 5493 ms
LCP discovery = discoverable / eager / fetchpriority=high
observed image resource load duration ~= 1257 ms
```

The image-delivery audit identifies approximately **1,042 KiB** of page-level potential image savings. The hero alone reports approximately 138 KiB estimated waste, and two gallery images are each around 500 KiB with large estimated savings.

### Elo Duo

Representative LCP:

```text
ELEMENT = hero image
FORMAT = JPEG
TRANSFER = ~237 KB
LIGHTHOUSE LCP = 8234 ms
LCP discovery = discoverable / eager / fetchpriority=high
observed image resource load duration ~= 1442 ms
```

The image-delivery audit identifies approximately **215 KiB** of page-level potential savings; the hero image accounts for approximately 207 KiB estimated waste.

The very high simulated LCP is materially larger than the observed hero resource-load interval. This baseline records that discrepancy but does not claim a single causal mechanism without a dedicated strategy/remediation analysis.

### Ária Higienópolis

Representative LCP:

```text
ELEMENT = hero facade image
FORMAT = JPEG
TRANSFER = ~222 KB
LIGHTHOUSE LCP = 5357 ms
LCP discovery = discoverable / eager / fetchpriority=high
observed image resource load duration ~= 1444 ms
```

The image-delivery audit identifies approximately **491 KiB** of page-level potential savings. The hero image reports approximately 202 KiB estimated waste; a below-the-fold gallery image reports approximately 288 KiB estimated waste.

## 7. Secondary diagnostics

Across the project pages:

- document/server response was low in the lab baseline (~14 ms median audit value), so the Vercel document response is not indicated as the dominant LCP bottleneck;
- LCP hero images were already discoverable in the initial document, eagerly loaded and high-priority;
- image delivery is a material optimization candidate;
- Lighthouse also reports roughly 130–220 KiB of unused third-party measurement JavaScript, primarily GTM/gtag;
- TBT remained materially smaller than the LCP failures (100–244 ms median on project pages), so this baseline does not classify JavaScript as the primary proven cause of the LCP failures;
- no Measurement mutation is authorized from this finding.

## 8. Findings

```text
M5-02-F01 = CAPIITOLO LAB LCP FAIL / 5493 ms median
M5-02-F02 = ELO DUO LAB LCP FAIL / 8234 ms median
M5-02-F03 = ÁRIA LAB LCP FAIL / 5357 ms median
M5-02-R01 = HOME LAB VARIABILITY / median PASS / one 2760 ms sample
M5-02-R02 = FIELD CWV / INP NOT_OBSERVED / PSI API PROVIDER QUOTA 429
M5-02-POSITIVE = CLS PASS on all four routes in lab
```

No finding is silently converted into remediation authority.

## 9. Completion decision

M5-02 is complete because the authorized baseline was executed, reproduced and recorded against an exact Production runtime.

```text
MNT-M5-02 = COMPLETE / LAB_BASELINE_ESTABLISHED / FIELD_CWV_NOT_OBSERVED
PERFORMANCE_TARGETS_ALL_MET = NO
RUNTIME_REMEDIATION = NOT_AUTHORIZED_BY_M5_02
```

This completion means “baseline established”, not “site performance accepted”.

## 10. Program consequence

```text
FORECAST_TOTAL_HOURS = 1240
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 784
REMAINING_FORECAST_HOURS = 456
ACCEPTED_PERCENT = 63.23
MNT-M5 = ACTIVE
MNT-M5-03 = PLANNED / AUTHORIZATION_REQUIRED / NOT_AUTHORIZED_BY_SEQUENCE
MNT-M5-10 = PLANNED_NOT_AUTHORIZED
```

The evidence points naturally to M5-03 — media/image/video performance strategy — as the next planned analysis task, but sequence does not authorize it.

