# Scenario 4 Figure 2 WebP recalibration — rollback checkpoint

Before recalibration, preserve **head of feature branch** as the rollback anchor; current HTML blob SHA: `2944a5376dcc96c9d308004978e7dc0d3fe70211`. Current committed routes from `routes-verified.json` are left unchanged. Only the index.html scenario 4 runtime paths should be replaced for the new fixed image plane (1500x1049).

Rollback procedure: restore `src-greenn/complexo-lapa-pirituba/index.html` from the feature branch state immediately before the recalibration commit, then rerun SFJM/LVR on the same branch. No merge or production deploy is authorized here. The preceding working WebP version can be tested separately.

Safety: Do not touch simulator 1, 2, 3, hero, catalog, route source data, or other site pages. Geometry on new WebP requires user LVR inspection. The environment cannot guarantee exact road alignment by code syntax alone.
