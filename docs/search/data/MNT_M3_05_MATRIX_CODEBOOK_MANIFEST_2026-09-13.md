# MNT-M3-05 matrix codebook manifest — 2026-09-13

Status: `MACHINE_READABLE_VOCABULARY_CONTRACT`.

The query-ownership matrix keeps one row per query family and uses compact deterministic codes for repeated governed values. The codebooks are vocabulary expansion, not narrative overrides; joining each code by domain reconstructs the full governed labels.

Matrix: `MNT_M3_05_QUERY_OWNERSHIP_MATRIX_2026-09-13.csv`.

Column → codebook domain:

- `representative_query_status` → `qs` / `Q*`
- `evidence_classes` → `ec` / `E*`
- `evidence_refs` → `er` / `R*`
- `observed_search_intent` → `oi` / `O*`
- `strategy_service_intent` → `si` / `T*`
- `service_decision` → `sd` / `D*`
- `logical_owner_class` → `oc` / `W*`
- `commercial_state_policy` → `cs` / `C*`
- `fact_gate` → `fg` / `F*`
- `intent_confidence` → `ic` / `I*`
- `decision_confidence` → `dc` / `J*`
- `m3_06_requirement` → `r` / `M*`

Authoritative codebooks:

- `MNT_M3_05_MATRIX_CODEBOOK_LINEAGE_2026-09-13.csv`
- `MNT_M3_05_MATRIX_CODEBOOK_INTENT_2026-09-13.csv`
- `MNT_M3_05_MATRIX_CODEBOOK_STRATEGY_2026-09-13.csv`

Evidence aliases decoded by the lineage codebook retain the source semantics defined in the M3-05 contract. A codebook join must not upgrade a family-level inference into a direct query observation.

The 2026-09-13 focal SES correction specifically removes unsupported direct-observation claims for CAPIITOLO, Elo Duo, YPY, generic Lapa, Benedito Abbud, raw `lapa`, rental and house examples, and corrects the `tegrq` GSC source binding. The serve/exclude strategy and logical ownership taxonomy are unchanged.