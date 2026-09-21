# MNT-M5-10 — Elo Duo Hero Decode Slice 04

Date: `2026-09-21`

Status: `COMPLETE / REJECTED_AS_NEUTRAL / ROLLED_BACK`

## Candidate

The bounded experiment changed only the visible Elo hero from `decoding="async"` to `decoding="sync"`, preserving the exact image URL, bytes, dimensions, `fetchpriority="high"`, both preconnects, no explicit hero preload, all below-fold behavior and all accepted Search/Form46/Measurement/Consent/CTA/accessibility contracts.

Candidate runtime:

```text
PR = #211
MERGE_SHA = c116d2d2239932a8526a2b3b2f7ce33e160686f4
PRODUCTION_DEPLOYMENT = dpl_8ZWk3WWKgfUUgt9CzZ8C9qKkhfuo
STATE = READY
```

## Five-run Production evidence

```text
RUN = 35659129972
JOB = 106529891452
CHROME = 152.0.7977.82
LIGHTHOUSE = 13.5.0

run 1 = LCP 2,892 ms / score 74
run 2 = LCP 3,700 ms / score 79
run 3 = LCP 3,717 ms / score 74
run 4 = LCP 3,045 ms / score 74
run 5 = LCP 3,898 ms / score 75

median LCP = 3,700 ms
median score = 74
median transfer = 1,061,902 B
```

Clean adjacent control:

```text
median LCP = 3,676 ms
median score = 74
median transfer = 1,061,852 B
```

Delta:

```text
LCP = +24 ms / +0.65%
score = 0
transfer = +50 B / effectively unchanged
target <=2,500 ms = FAIL
```

## LCP-path finding

Representative run 2 recorded:

```text
TTFB ~= 51.9 ms
resource load delay ~= 28.6 ms
resource load duration ~= 174.6 ms
element render delay ~= 225.8 ms
```

Lighthouse confirmed:

- the LCP request is discoverable in the initial document;
- `fetchpriority=high` is applied;
- the LCP image is eagerly loaded;
- the image-delivery audit did not identify the hero as a material remaining image-waste item.

The page still shows more meaningful optimization signals in render-blocking CSS and JavaScript/main-thread work than in hero decode policy.

## Decision

Synchronous decode is rejected as neutral/non-useful under the governed A/B method. Restore `decoding="async"`.

The Slice 01 media validator remains decoupled from decode policy because its proper invariant is the selected source, intrinsic dimensions, non-lazy behavior and high fetch priority—not a specific experimental decode strategy.

M5-10 remains active. The `<=2,500 ms` LCP target remains unmet.
