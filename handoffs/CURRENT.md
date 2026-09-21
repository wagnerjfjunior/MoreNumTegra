# Handoff Atual — MoreNumTegra

Atualizado em 2026-09-21.

CANONICAL_REPOSITORY = wagnerjfjunior/MoreNumTegra
CANONICAL_BRANCH = main

EFFECTIVE_PRODUCTION_RUNTIME_SHA = f4bb33e42f746682578f3404011daaa64e485e90
PRODUCTION_DEPLOYMENT = dpl_jm8WcAjoVFxEydxdn2XiSsf222dP
PRODUCTION_STATE = READY

MNT-M5-09 = COMPLETE / CONVERSION_QA_PASS / NO_RUNTIME_MUTATION
MNT-M5-10 = ACTIVE / SLICE_01_MEASURED / ROLLBACK_APPLIED / NEXT_DECISION_REQUIRED

Canonical evidence:
docs/performance/MNT_M5_10_ELO_DUO_COMPACT_SOURCE_COMPARISON_2026-09-21.md

Result:
- raw-source Green complex asset = 83,076 B;
- compact-source Green complex asset = 106,720 B;
- manual pre-compression did not improve the delivered asset;
- rollback to the smaller asset is live;
- LCP lab runs show material variability, so no causal LCP claim is assigned to this below-fold image.

Next safe action: stop before any additional M5-10 slice and obtain Product Authority decision for the next remediation.