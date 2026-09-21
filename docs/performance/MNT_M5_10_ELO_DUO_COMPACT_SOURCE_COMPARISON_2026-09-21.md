# MNT-M5-10 — Elo Duo compact-source comparison

Date: 2026-09-21

Status: ACTIVE / SLICE_01_MEASURED / ROLLBACK_APPLIED / NEXT_DECISION_REQUIRED

## Result

Raw source PNG: 1,318,029 B / 1126x630
Raw-source Green WebP: 83,076 B / 1126x630

Manually compacted source PNG: 328,029 B / 1126x630
Compact-source Green WebP: 106,720 B / 1126x630

Manual pre-compression reduced the PNG source by about 75%, but the Green-delivered WebP became 23,644 B / 28.5% larger.

## Production comparison

Raw-source Green state:
- SHA a43431ce65468a70a06844452fc17589fb49c68d
- deployment dpl_5nz8h9AzHNqYAwM9aaw12xorVrUX
- run 35609184068
- artifact 10643810817
- median LCP 3112 ms
- median transfer 1,076,412 B

Compact-source Green trial:
- PR #201
- SHA 0c9a9d592417bc8739bdd73549d1ba9e38c0b630
- deployment dpl_Aj5DEzTL3sp2AnP6dYAQ5pLsk6YS
- run 35611930418
- artifact 10644417741
- median LCP 3861 ms
- median transfer 1,100,061 B

Rollback to raw-source Green asset:
- PR #202
- SHA f4bb33e42f746682578f3404011daaa64e485e90
- deployment dpl_jm8WcAjoVFxEydxdn2XiSsf222dP
- run 35612896700
- artifact 10644932648
- median LCP 3756 ms
- median transfer 1,076,388 B

## Interpretation

The byte result is robust: manual pre-compression did not help and produced a larger Green WebP.

The LCP result is not causally attributable to the below-fold image. The same raw-source Green asset measured 3112 ms in one three-run battery and 3756 ms after rollback, showing material lab variability. The compact trial at 3861 ms is only 105 ms / 2.7% slower than the rollback battery.

Because the complex image is below the fold and lazy-loaded, the operational conclusion is to keep the objectively smaller 83,076 B Green WebP and not spend manual effort pre-compressing ordinary source images by default.

Dimension/crop governance remains required. Hero/LCP media remains a separate critical-path optimization problem.

No additional M5-10 slice is authorized by this evidence.