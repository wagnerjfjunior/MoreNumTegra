# MNT-PERF-03B — Home Late GTM Bootstrap Production Evidence

Date: 2026-09-25  
Route: `https://www.moretegra.com.br/`

## Authorization

Product Authority said “Vamos seguir” after MNT-PERF-03A post-change validation. The bounded Home-only scope was canonicalized before implementation.

## Scope

Home only:

- preserve `GTM-PGCR4R47`;
- preserve the initial `gtm.js` dataLayer marker;
- preserve queued MNT source events and Consent events;
- defer GTM network download until `window.load` or first pointer/keyboard interaction;
- preserve noscript fallback;
- preserve MNT-PERF-03A YouTube intent-load behavior;
- no event schema, GA4 configuration, Form46, commercial, SEO or project-page mutation.

Pattern source:
accepted Elo Duo late-GTM bootstrap.

## Traceability

```text
BASE MAIN = e4984f4dce8e5c08803d5a0f24a59a74d34f119e
BRANCH = perf/home-late-gtm-bootstrap-20260925
PR = #271
EXACT HEAD = 9c04027652cf3c54ed3613e8c74883424ae41611
MERGE / RUNTIME SHA = 43ca5ba30b738b32ef482a4b9864d4bce4d97474
PRODUCTION DEPLOYMENT = dpl_JLfW5GLsE4xwTu1fVr88Pc1Ms2iU
PRODUCTION STATE = READY
```

## Exact-head validation

All final-head checks passed:

```text
MNT-PERF-03B Home late GTM validation = SUCCESS
MNT-PERF-03A Home video intent-load validation = SUCCESS
M5-06 CTA/Form journey = SUCCESS
Commercial page standard validation = SUCCESS
M4-05R metadata validation = SUCCESS
Favicon standard validation = SUCCESS
Social sharing metadata validation = SUCCESS
unresolved review threads = 0
behind_by = 0
mergeable_state = clean
```

M5-06 included Playwright browser smoke across supported routes/browsers.

## Production validation

Vercel deployment:

`dpl_JLfW5GLsE4xwTu1fVr88Pc1Ms2iU`

Resolved as:

```text
target = production
state = READY
source SHA = 43ca5ba30b738b32ef482a4b9864d4bce4d97474
```

Canonical Home returned HTTP 200.

Initial fetch briefly observed the prior HTML, while a cache-busted request returned the new runtime. A subsequent canonical fetch without query also returned the new runtime. Final observed canonical state:

```text
late GTM window.load trigger = PRESENT
late GTM pointer trigger = PRESENT
late GTM keyboard trigger = PRESENT
old immediate bootstrap = ABSENT
MNT-PERF-03A YouTube intent-load = RETAINED
```

This cache transition is retained as deployment evidence and is not treated as a runtime regression.

## Performance gate

No performance improvement is claimed yet.

Required next action:

- five PageSpeed/Lighthouse Mobile samples on Home;
- same MNT-PERF-02/MNT-PERF-03A method;
- record Performance/FCP/LCP/TBT/CLS/Speed Index and transfer where available;
- compare primarily against MNT-PERF-03A median LCP `4.2 s`;
- also retain original MNT-PERF-02 Home median `10.4 s` as historical baseline;
- do not treat TBT as field INP.

```text
MNT-PERF-03B IMPLEMENTATION = MERGED
MNT-PERF-03B PRODUCTION = READY
MNT-PERF-03B VALIDATION = PASS
POST_CHANGE FIVE_RUN_BATTERY = NEXT
PERFORMANCE OUTCOME = NOT_YET_PROVEN
```
