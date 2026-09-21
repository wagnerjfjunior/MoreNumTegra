# Handoff Atual — MoreNumTegra

Atualizado em `2026-09-21`.

Handoff detalhado vigente:
`handoffs/HANDOFF-2026-09-21-M5-10-ELO-GREEN-SLICE01.md`

```text
CANONICAL_REPOSITORY = wagnerjfjunior/MoreNumTegra
CANONICAL_BRANCH = main

MAIN_RUNTIME = a43431ce65468a70a06844452fc17589fb49c68d
PRODUCTION_DEPLOYMENT = dpl_5nz8h9AzHNqYAwM9aaw12xorVrUX
PRODUCTION_STATE = READY

MNT-M5-09 = COMPLETE / CONVERSION_QA_PASS / NO_RUNTIME_MUTATION
MNT-M5-10 = ACTIVE / SLICE_01_COMPLETE / NEXT_SLICE_DECISION_REQUIRED

MEDIA_PROBE_RUN = 35606609562 / SUCCESS
PERFORMANCE_RUN = 35608067789 / SUCCESS
PERFORMANCE_ARTIFACT = 10643068494

ELO_HISTORICAL_LCP = 8234 ms
ELO_SLICE01_LCP = 7486 ms
ELO_CLS = 0.0357 / PASS

FORECAST_TOTAL_HOURS = 1240
ACCEPTED_SCOPE_EQUIVALENT_HOURS = 896
REMAINING_FORECAST_HOURS = 344
ACCEPTED_PERCENT = 72.26
```

Green workflow conclusion:
- upload original directly;
- Green handles WebP compression effectively;
- verify bytes/dimensions after upload;
- manually govern dimensions/crop;
- do not manually pre-compress by default.

Stop before any additional M5-10 slice.
