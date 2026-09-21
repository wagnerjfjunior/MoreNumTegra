# Handoff — M5-07 GTM Preview Pass / Publish Required

Date: `2026-09-21`

```text
REPOSITORY_MAIN_RUNTIME = 6dc362a63de8b797082fb1c7b4ac70a8a5aa2ae8
PRODUCTION_DEPLOYMENT = dpl_AWHaTzE4UrJQaZ3LnKqhEMd8wsBs
PRODUCTION_STATE = READY
M5_07_PRODUCTION_DIAGNOSTIC = 35596887663 / SUCCESS
M5_07_PRODUCTION_ARTIFACT = 10637092633
GTM_CONTAINER = GTM-PGCR4R47
GTM_PREVIEW = PASS / QUICK_PREVIEW
MNT-M5-07 = ACTIVE / SOURCE_PRODUCTION_PASS / GTM_PREVIEW_PASS / GTM_PUBLISH_REQUIRED
MNT-M5-08 = BLOCKED_BY_M5_07_PUBLISH_AND_PRODUCTION_VERIFICATION
MNT-M5-10 = PLANNED_NOT_AUTHORIZED
```

Tag Assistant evidence proves `mnt_lead_success` and GA4 `generate_lead` both carry controlled `project_name` / `offer_name` in Preview, including `Mozae Higienópolis`.

Next action: publish the tested GTM container version, then verify one production lead outside Preview. No additional product decision is required.
