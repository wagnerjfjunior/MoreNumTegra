# Handoff — M5-10 Elo Duo media A/B — Session Transition

Date: `2026-09-21`

## 1. Canonical anchors resolved live

```text
CANONICAL_REPOSITORY = wagnerjfjunior/MoreNumTegra
CANONICAL_BRANCH = main
MAIN_AT_TRANSITION = 5b60e5862fd8581996b92ca8e1e40ce93285b4e4
LATEST_RUNTIME_PR = #205
PRODUCTION_DEPLOYMENT = dpl_2FsJfM4L8o95vUzHTiV2Cp4ePrr8
PRODUCTION_SOURCE_SHA = 5b60e5862fd8581996b92ca8e1e40ce93285b4e4
PRODUCTION_STATE = READY
CANONICAL_HOST = https://www.moretegra.com.br/
```

SFJM protocol anchor resolved live:

`wagnerjfjunior/StopJuniorMode@c014b743bd0312d9f260369334cdd06bfde49f56`

Applicable transition rule:

`docs/SESSION_TRANSITION_PROTOCOL.md`

## 2. Program state

```text
MNT-M5 = ACTIVE
MNT-M5-01..09 = COMPLETE under their recorded acceptance states
MNT-M5-10 = ACTIVE / SLICE_01_COMPLETE / NEXT_SLICE_DECISION_REQUIRED

FORECAST_TOTAL_HOURS = 1240
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 896
REMAINING_FORECAST_HOURS = 344
ACCEPTED_PERCENT = 72.26
```

M5-10 remains a 24h planned task with zero accepted hours until its task-level acceptance criteria are met. Completion of this bounded experiment does not automatically accept all M5-10 hours.

## 3. Elo Duo Slice 01 — chronology

### Initial media migration — PR #200

Two Elo Duo assets moved to Green/GDigital-hosted WebP:

- hero facade;
- Rua Jardim / complex image.

Initial observed asset sizes:

```text
legacy Azure hero JPEG = 236,596 B
initial Green hero WebP = 175,392 B

legacy complex WebP = 62,606 B
raw-source Green complex WebP = 83,076 B
```

The initial post-migration Lighthouse median observed a material LCP reduction versus the M5-02 baseline, but later repeated runs showed material lab variance. Do not treat a single 3-run batch as causal proof of repository/origin effect.

### Complex pre-compression experiment — PR #201 / rollback PR #202

User manually compressed the source PNG before Green upload.

Observed result:

```text
raw uploaded Complexo PNG = 1,318,029 B
Green output from raw source = 83,076 B

manually compressed source PNG = 328,029 B
Green output from compressed source = 106,720 B
```

The manually compressed source produced a **larger** Green WebP (+28.5%).

The trial was rolled back. Current Production keeps:

`https://s3-gdigital.s3.amazonaws.com/gdigital/313/Caminhos%20da%20lapa%20-%20Elo%20Duo%20-%20630x1126%20-%20Complexo.webp`

Conclusion for this tested image:

**manual pre-compression before Green is not the default workflow.**

Upload the original/high-quality source to Green and validate the generated WebP. Crop/dimensions still require deliberate governance.

### Hero A/B — PRs #203, #204, #205

Two Green hero variants were compared in Production with the same five-run Lighthouse methodology.

Candidate URLs:

Compact-source winner:

`https://s3-gdigital.s3.amazonaws.com/gdigital/313/Compac%20-%20Caminhos%20da%20lapa%20-%20Elo%20Duo%20-%201350x1090%20-%20Fachada.webp`

Original-source alternative:

`https://s3-gdigital.s3.amazonaws.com/gdigital/313/Caminhos%20da%20Lapa%20Elo%20Duo-Perspectiva%20da%20fachada.webp`

Observed Green outputs:

```text
compact-source hero = 160,918 B
original-source hero = 185,446 B
original-source delta = +24,528 B / +15.2%
```

Five-run Production Lighthouse medians:

```text
COMPACT
LCP = 3,947 ms
performance score = 70
transfer = 1,062,054 B

ORIGINAL
LCP = 4,037 ms
performance score = 65
transfer = 1,086,450 B

ORIGINAL vs COMPACT
LCP = +90 ms / +2.3%
score = -5
transfer = +24,396 B / +2.3%
```

The LCP difference is small enough to contain laboratory noise. The compact-source variant still wins on deterministic payload size and on the observed median.

PR #205 therefore selected the compact-source Green hero as the current Production winner.

## 4. Current Elo Duo Production media

Hero:

`https://s3-gdigital.s3.amazonaws.com/gdigital/313/Compac%20-%20Caminhos%20da%20lapa%20-%20Elo%20Duo%20-%201350x1090%20-%20Fachada.webp`

Complex / Rua Jardim:

`https://s3-gdigital.s3.amazonaws.com/gdigital/313/Caminhos%20da%20lapa%20-%20Elo%20Duo%20-%20630x1126%20-%20Complexo.webp`

Both are hosted on the intended Green/GDigital S3 media origin.

## 5. Performance interpretation

M5-02 baseline for Elo Duo:

`LCP median = 8,234 ms`

Current selected compact hero five-run median:

`LCP median = 3,947 ms`

This is substantially better than the historical M5-02 baseline, but the project target remains:

`LCP <= 2,500 ms`

Therefore:

```text
ELO_DUO_MEDIA_MIGRATION = BENEFICIAL
ELO_DUO_HERO_AB = COMPLETE
ELO_DUO_LCP_TARGET = NOT_YET_MET
FIELD_CWV = NOT_ESTABLISHED
```

Do not attribute the full historical LCP delta to origin migration alone. Asset format/bytes, runtime drift and Lighthouse variability are confounders.

## 6. Preserved decisions

- Green/GDigital S3 is the preferred heavy-media repository for this V1 workflow.
- Large media binaries do not belong in GitHub.
- Green-generated WebP should be measured after upload.
- Manual source compression is not required by default and can be counterproductive.
- Hero images require stricter QA than lazy below-fold media.
- Search/Form46/Measurement/CTA/WhatsApp behavior must remain unchanged by media work.
- M5-03 responsive-image strategy remains valid.
- No additional M5-10 slice is authorized merely because Slice 01 completed.

## 7. Open decision for the next conversation

The next Product Authority decision is the next bounded M5-10 slice.

Two technically plausible continuations remain:

1. continue Elo Duo hero optimization toward the <=2.5s target using responsive/mobile derivatives, `srcset/sizes`, and origin/preconnect cleanup; or
2. advance to the next M5-03 remediation target (Ária hero + first gallery asset), accepting Elo Duo as improved but above target for now.

No runtime mutation for either path is authorized by this transition handoff.

## 8. New-conversation bootstrap

The receiving conversation must:

1. resolve MoreNumTegra `main` live;
2. run the canonical bootstrap;
3. read this handoff through `handoffs/CURRENT.md`;
4. resolve Vercel Production live;
5. preserve M5-10 Slice 01 evidence;
6. state the current decision gate before any mutation;
7. not infer authorization for the next performance slice.

Open PR #141 is a stale historical QA draft and is not the current M5-10 execution path.
