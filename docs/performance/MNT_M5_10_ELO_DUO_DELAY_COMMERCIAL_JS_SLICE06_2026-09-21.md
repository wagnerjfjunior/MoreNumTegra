# MNT-M5-10 — Elo Duo Delayed Commercial JS Slice 06

Date: `2026-09-21`

Status: `ACTIVE / SLICE_06_AUTHORIZED / COMMERCIAL_RUNTIME_SCHEDULING_EXPERIMENT`

## Scope

This bounded experiment does **not** change Measurement, GTM, GA4, Form 46, commercial data, media, CSS or event semantics.

It tests only when Elo Duo loads the already-governed commercial synchronization runtime `/src-greenn/project-page.js`.

## Evidence

Production control before Slice 06:

```text
RUNTIME_SHA = c4e0ef29449e4efce0ec1be3df64b6d9d1e9c427
DEPLOYMENT = dpl_4o7syJcZWbse6G3h13fDaXgijNyZ
STATE = READY
```

The GTM-block laboratory established that third-party Measurement is the largest remaining CPU cost:

```text
normal median LCP = 5,080 ms
GTM/gtag-blocked median LCP = 3,166 ms
delta = -1,914 ms / -37.68%
normal median TBT = 496 ms
blocked median TBT = 33 ms
```

This is diagnostic evidence only and does not authorize a Measurement mutation.

A separate owned-JavaScript ceiling matrix showed directional improvement when `project-page.js` was blocked in lab:

```text
normal median LCP = 7,183 ms
project-page.js blocked median = 6,494 ms
directional delta = -689 ms / -9.59%
```

That matrix ran in a slower lab window, so the absolute values are not compared to earlier Production controls. Its purpose is only to identify candidate work.

## Commercial safety precondition

The Elo HTML already contains the governed current commercial reference before JavaScript executes:

```text
price = R$ 658.000
reference = Ref. 68 m² (unidade 109) - Ago/26 | pagamento à vista
inventory fallback = Consulte disponibilidade
```

The canonical `commercial-values.json` contains the same price/reference and a more specific inventory state. Therefore delaying synchronization does not invent or expose an unsupported commercial value. Before sync, the page remains conservative on inventory.

## Slice 06 single runtime variable

Replace the parser-time deferred load:

```html
<script src="/src-greenn/project-page.js" defer></script>
```

with a loader that injects the same canonical script only after `window.load`.

No change is made to `project-page.js` itself.

## Preservation contract

Preserve:

- governed `commercial-values.json`;
- same initial price/reference in HTML;
- conservative inventory fallback before sync;
- same eventual commercial synchronization runtime;
- selected Green hero and complex media;
- hero `fetchpriority=high`, dimensions and `decoding=async`;
- external canonical CSS;
- Azure + S3 preconnects;
- no hero preload;
- GTM/GA4/Consent/Measurement;
- Form 46;
- CTA/WhatsApp;
- schema/accessibility/commercial copy.

## Validation

1. exact-head repository gates;
2. browser regression gates already triggered by the Elo HTML change;
3. Production READY on exact merge SHA;
4. public HTML confirms delayed loader and preserved initial commercial values;
5. same five-run Lighthouse mobile battery;
6. retain only if non-regressive and materially useful.

M5-10 remains active. Target LCP remains `<=2,500 ms`.
