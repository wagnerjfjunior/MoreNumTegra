# MNT-PERF-02 — Current Runtime Performance Verification

Date: 2026-09-25  
Task: `MNT-PERF-02`  
Class: measurement/evidence only  
Base repository state resolved before measurement: `d33f4bef691a5be2cf26a6b55519871e751740bb` (docs-only current `main`; effective runtime remained the already-published Production runtime documented in CURRENT)  
Runtime mutation in this task: **NONE**

## 1. Purpose

Canonicalize the current-runtime Lighthouse Mobile battery required by `docs/NEXT_SAFE_ACTION.md` after MNT-PERF-01 remediation and the later DSG publication chain.

This packet does not reuse historical performance values as current measurements.

## 2. Method

PageSpeed Insights / Lighthouse Mobile:

- device: Moto G Power emulated;
- Lighthouse: 13.5.0;
- network: slow 4G;
- initial page load;
- single-page session;
- HeadlessChromium 153.0.8010.36;
- five valid samples per route;
- invalid PageSpeed render-throttling attempts excluded;
- duplicate exports of the same captured run excluded;
- medians calculated from the five valid runs per route.

Routes:

- Home — `https://www.moretegra.com.br/`
- DSG Itaim — `https://www.moretegra.com.br/empreendimentos/dsg-itaim/`
- CAPIITOLO — `https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/`
- Elo Duo — `https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/`
- Ária Higienópolis — `https://www.moretegra.com.br/empreendimentos/aria-higienopolis/`

Targets remain:

```text
LCP <= 2.5 s
CLS <= 0.1
INP <= 200 ms
```

Lighthouse TBT is a lab metric and must **not** be treated as field INP.

## 3. Raw normalized samples

| Route | Run | Perf | FCP s | LCP s | TBT ms | CLS | Transfer KiB |
|---|---:|---:|---:|---:|---:|---:|---:|
| Home | 1 | 54 | 6.5 | 10.0 | 250 | 0.000 | 1464 |
| Home | 2 | 59 | 6.6 | 11.5 | 80 | 0.001 | 1530 |
| Home | 3 | 96 | 0.9 | 1.5 | 210 | 0.001 | 1564 |
| Home | 4 | 58 | 6.4 | 10.8 | 120 | 0.001 | 1529 |
| Home | 5 | 58 | 6.6 | 10.4 | 120 | 0.000 | 1465 |
| DSG Itaim | 1 | 76 | 0.8 | 5.3 | 230 | 0.000 | 1094 |
| DSG Itaim | 2 | 81 | 0.8 | 3.3 | 430 | 0.000 | 1095 |
| DSG Itaim | 3 | 78 | 0.8 | 5.2 | 200 | 0.000 | 1094 |
| DSG Itaim | 4 | 82 | 0.8 | 5.0 | 10 | 0.000 | 1094 |
| DSG Itaim | 5 | 81 | 0.8 | 5.1 | 70 | 0.000 | 1094 |
| CAPIITOLO | 1 | 60 | 0.8 | 4.8 | 990 | 0.001 | 1506 |
| CAPIITOLO | 2 | 82 | 0.8 | 5.0 | 30 | 0.001 | 1506 |
| CAPIITOLO | 3 | 80 | 0.8 | 5.2 | 120 | 0.001 | 1506 |
| CAPIITOLO | 4 | 80 | 0.8 | 5.1 | 130 | 0.001 | 1012 |
| CAPIITOLO | 5 | 80 | 0.8 | 5.3 | 40 | 0.001 | 1506 |
| Elo Duo | 1 | 99 | 0.9 | 1.8 | 90 | 0.030 | 489 |
| Elo Duo | 2 | 78 | 1.0 | 5.1 | 60 | 0.049 | 489 |
| Elo Duo | 3 | 100 | 0.9 | 1.8 | 50 | 0.030 | 489 |
| Elo Duo | 4 | 77 | 1.0 | 5.4 | 100 | 0.049 | 489 |
| Elo Duo | 5 | 70 | 1.0 | 5.5 | 310 | 0.049 | 489 |
| Ária Higienópolis | 1 | 95 | 0.9 | 2.0 | 60 | 0.049 | 6406 |
| Ária Higienópolis | 2 | 74 | 0.9 | 9.2 | 130 | 0.033 | 6406 |
| Ária Higienópolis | 3 | 100 | 0.9 | 1.4 | 20 | 0.030 | 6406 |
| Ária Higienópolis | 4 | 99 | 0.9 | 1.8 | 90 | 0.035 | 6406 |
| Ária Higienópolis | 5 | 74 | 1.0 | 5.5 | 80 | 0.049 | 6406 |

Machine-readable normalized samples are stored beside this packet in:
`docs/performance/MNT_PERF_02_CURRENT_RUNTIME_VERIFICATION_2026-09-25.csv`.

## 4. Medians

| Route | Perf median | FCP s | LCP s | TBT ms | CLS | Transfer KiB | LCP target |
|---|---:|---:|---:|---:|---:|---:|---|
| Home | 58 | 6.5 | **10.4** | 120 | 0.001 | 1529 | FAIL |
| DSG Itaim | 81 | 0.8 | **5.1** | 200 | 0.000 | 1094 | FAIL |
| CAPIITOLO | 80 | 0.8 | **5.1** | 120 | 0.001 | 1506 | FAIL |
| Elo Duo | 78 | 1.0 | **5.1** | 90 | 0.049 | 489 | FAIL |
| Ária Higienópolis | 95 | 0.9 | **2.0** | 80 | 0.035 | 6406 | PASS |

All five routes remain within the lab CLS target `<=0.1`.

No field INP conclusion is made.

## 5. Diagnostic findings

### Home

The route has extreme lab variance, but four of the five valid runs produced high LCP around 10–11.5 s; median LCP is 10.4 s.

The embedded YouTube path is a repeated deterministic third-party cost. In the observed reports it contributes approximately 1 MiB of transfer in representative high-LCP runs and material main-thread time. This is a bounded causal candidate, not proof that YouTube alone explains every LCP movement.

The LCP element in high-LCP runs can be hero text, so remediation must evaluate both third-party bootstrap and hero render path rather than replacing only one image asset.

### DSG Itaim

Median LCP is 5.1 s and is materially above target.

Azure photographic delivery is the largest deterministic transfer source, around 758 KiB in the measured page payload. The hero is already initial-document discoverable, high-priority and non-lazy, so the next remediation must preserve that contract while testing responsive/optimized delivery and render timing.

### CAPIITOLO

Median LCP is 5.1 s and is materially above target.

Azure photographic delivery is the dominant deterministic payload in the representative runs (~1.16 MiB of image transfer). The route is a special case under `RESPONSIVE_MEDIA_DELIVERY_STANDARD_V1.md`; its composition/bootstrap must not be replaced by a blind copy of Elo/Ária.

One sample had a lower total transfer (1012 KiB), but the median transfer remains 1506 KiB and the median LCP remains ~5.1 s.

### Elo Duo

Median payload is only 489 KiB, yet median LCP is 5.1 s.

The hero asset is already responsive and small. In high-LCP samples the dominant LCP subpart is render delay (for example ~2 s), while hero resource load duration is only a small fraction of the total. Therefore another asset rewrite is not justified by this packet alone.

Next bounded investigation should isolate render/runtime/GTM timing before any further Elo media mutation.

### Ária Higienópolis

Median LCP is 2.0 s and therefore passes the current lab target.

However, total transfer is deterministically ~6406 KiB. Approximately 5860 KiB comes from full-size Azure gallery images, including multi-megabyte source images downloaded into thumbnail-sized slots. This is a deterministic payload defect even though median LCP passes.

The responsive local hero and gallery-main assets are not the main transfer problem; the remaining waste is concentrated in external full-size gallery-thumbnail sources.

## 6. Interpretation

```text
LAB_VARIANCE != DETERMINISTIC_PAYLOAD
TBT != FIELD_INP
HISTORICAL_LCP != CURRENT_RUNTIME_LCP
SMALL_PAYLOAD != GUARANTEED_LOW_LCP
MEDIAN_LCP_PASS != PAYLOAD_HEALTH
```

The battery is sufficient to close the measurement-only task and open a separate remediation backlog.

## 7. Remediation backlog

Tracking issue:

https://github.com/wagnerjfjunior/MoreNumTegra/issues/266

The backlog is intentionally split by route/cause:

1. Home — YouTube/hero critical path.
2. DSG Itaim — hero/Azure media delivery.
3. CAPIITOLO — hero/Azure media delivery, preserving its special composition.
4. Elo Duo — render-delay/runtime/GTM investigation before asset changes.
5. Ária — responsive thumbnail/gallery source correction to remove multi-MiB waste.

This issue is **not runtime authorization**.

## 8. Authorization boundary

MNT-PERF-02 is closed as:

```text
MNT-PERF-02 = COMPLETE / EVIDENCE_CANONICALIZED / NO_RUNTIME_MUTATION
```

No runtime, GTM/GA4, Form 46, commercial-data, SEO/canonical/schema or paid-media mutation is authorized by this evidence packet.

Each retained remediation slice requires separate bounded Product Authority authorization, branch/PR, exact-head validation, runtime deployment resolution and post-production validation.

## 9. Outcome

```text
MEASUREMENT = COMPLETE
FIVE_RUNS_PER_ROUTE = COMPLETE
MEDIANS = CANONICALIZED
FIELD_CWV = NOT_PROVEN
FIELD_INP = NOT_PROVEN
RUNTIME_REMEDIATION = NOT_PERFORMED
REMEDIATION_BACKLOG = ISSUE_266_OPEN
```
