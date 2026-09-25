# MNT-PERF-03A — Home YouTube Intent-Load Remediation

Date: 2026-09-25  
Task: `MNT-PERF-03A`  
Route: Home — `https://www.moretegra.com.br/`  
Authorization: Product Authority explicitly authorized the bounded Home performance slice after MNT-PERF-02 closure.

## 1. Baseline

Canonical MNT-PERF-02 evidence:

`docs/performance/MNT_PERF_02_CURRENT_RUNTIME_VERIFICATION_2026-09-25.md`

Home baseline medians:

```text
FCP = 6.5 s
LCP = 10.4 s
TBT = 120 ms
CLS = 0.001
transfer ~= 1529 KiB
```

The baseline identified repeated high-LCP runs with material YouTube third-party payload/CPU contribution.

## 2. Authorized scope

Bounded Home-only remediation:

- remove initial `youtube-nocookie.com` preconnect;
- stop automatic YouTube iframe mount from viewport intersection/timer;
- keep campaign poster visible on initial load;
- mount YouTube player only after explicit user click/tap/Enter/Space;
- preserve keyboard accessibility, player controls and fullscreen;
- preserve SEO/social/schema semantics;
- preserve Form 46, Measurement, commercial data and paid-media state.

No project-page remediation was authorized in this slice.

## 3. Traceability

```text
BASE MAIN = bd4b1e50e080444bd0a84ee2bfde9ddef99d336a
BRANCH = perf/home-youtube-intent-load-20260925
PR = #268
INITIAL FAILED HEAD = 896d13710134e40a42f0b54f7d428bba3bf62d11
FINAL EXACT HEAD = 22fc140823870f557bcbc8edcb779a916a8cca89
MERGE SHA = 02feb3804a4a87c6d07bc12a5b9c7b983816b6ed
PRODUCTION DEPLOYMENT = dpl_3HqSohk1Sq32vWm8cUMFpgqY8GfW
PRODUCTION STATE = READY
PRODUCTION SOURCE SHA = 02feb3804a4a87c6d07bc12a5b9c7b983816b6ed
```

## 4. Changed files

Runtime/source:

- `src-greenn/preview/index.html`
- `src-greenn/blocks/01-html-inicial.html`
- `src-greenn/moretegra.js`
- `src-greenn/moretegra.css`

Validation:

- `scripts/validate-mnt-perf-03a-home-video-intent-load.mjs`
- `.github/workflows/mnt-perf-03a-home-video-intent-load.yml`

## 5. Failed attempt preserved

Initial exact head `896d13710134e40a42f0b54f7d428bba3bf62d11` failed the slice-specific validator because the Home still contained an eager `youtube-nocookie.com` preconnect.

Automated review also found that the keyboard listener used `{once:true}`, which could be consumed by an unrelated key before Enter/Space activation.

Both findings were corrected before merge:

- the remaining YouTube preconnect was removed;
- the keyboard listener remains available until activation/replacement of the facade.

The failed initial attempt is part of the PR history and is not treated as a pass.

## 6. Exact-head validation

Final exact head:

`22fc140823870f557bcbc8edcb779a916a8cca89`

State before merge:

```text
behind_by = 0
mergeable = true
mergeable_state = clean
unresolved review threads = 0
```

Final-head workflows:

```text
MNT-PERF-03A Home video intent-load validation = SUCCESS
Social sharing metadata validation = SUCCESS
Favicon standard validation = SUCCESS
Commercial page standard validation = SUCCESS
M4-05R metadata validation = SUCCESS
M5-06 CTA/Form journey = SUCCESS
```

M5-06 included static contract validation plus Playwright browser smoke.

## 7. Production validation

Vercel resolved the merge as:

```text
deployment = dpl_3HqSohk1Sq32vWm8cUMFpgqY8GfW
target = production
state = READY
source SHA = 02feb3804a4a87c6d07bc12a5b9c7b983816b6ed
canonical alias = www.moretegra.com.br
```

Canonical Home returned HTTP 200.

Observed Production HTML:

- no `youtube-nocookie.com` preconnect;
- campaign poster remains present;
- visible activation copy = `Clique ou toque para reproduzir`;
- user-facing note states that the player is loaded only when the user starts the video;
- canonical, social metadata, VideoObject schema and GTM remain present.

The Production source SHA exactly matches the merged runtime commit.

## 8. Performance outcome gate

The deterministic implementation objective is complete:

```text
INITIAL YOUTUBE IFRAME AUTO-MOUNT = REMOVED
INITIAL YOUTUBE PRECONNECT = REMOVED
PLAYER LOAD = USER_INTENT_ONLY
RUNTIME DEPLOYMENT = READY
```

However:

```text
POST-CHANGE FIVE-RUN LIGHTHOUSE MOBILE BATTERY = PENDING
POST-CHANGE LCP MEDIAN = NOT PROVEN
PERFORMANCE IMPROVEMENT CLAIM = NOT YET AUTHORIZED BY EVIDENCE
FIELD CWV / INP = NOT PROVEN
```

Do not claim that Home LCP improved until the post-change five-run Mobile battery is collected and adjudicated.

## 9. Non-regression boundary

No change in this slice to:

- GTM/GA4 semantics;
- Consent Mode;
- Form 46 contract;
- commercial values/facts;
- project routes;
- paid-media state;
- canonical URL;
- Open Graph/Twitter image semantics;
- VideoObject identity.

## 10. Current state

```text
MNT-PERF-03A IMPLEMENTATION = MERGED
MNT-PERF-03A PRODUCTION = READY
MNT-PERF-03A STATIC/BROWSER VALIDATION = PASS
MNT-PERF-03A PERFORMANCE RE-MEASUREMENT = PENDING
NEXT SAFE ACTION FOR THIS SLICE = FIVE-RUN LIGHTHOUSE MOBILE HOME BATTERY
```
