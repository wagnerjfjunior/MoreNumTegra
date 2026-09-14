# M3-04 supplement — Mozae Higienópolis metragem reconciliation

Date: 2026-09-14
Project: Mozae Higienópolis

## Governed evidence

Product Authority supplied exact observed unit areas spanning 44.85 m² to 73.40 m². Exact observed unit areas are recorded in `docs/product/data/MNT_M3_04_MOZAE_EXACT_UNIT_AREAS_2026-09-14.csv`.

The current live Tegra product page observed on 2026-09-14 presents the commercial typologies as `46 m² e 73 m²`.

## Governed interpretation

- `EXACT_UNIT_AREA`: use the decimal area associated with a specific unit.
- `COMMERCIAL_TYPOLOGY_LABEL`: use `46 m² e 73 m²` when reproducing the current official Tegra commercial typology presentation.
- `ROUNDED_PORTFOLIO_RANGE`: `45 m² a 73 m²` is a valid rounded portfolio envelope because the observed exact-unit range begins at 44.85 m² and extends to 73.40 m².

These representations are not interchangeable. A rounded range must not be described as the official typology label, and commercial typology labels must not be treated as exact areas for every unit.

## Adjudication

The prior disposition `RUNTIME_METRAGE_CORRECTION_REQUIRED / USE_46M2_AND_73M2` is superseded because it conflated a valid rounded portfolio range with the official commercial typology label.

Current state:

`METRAGE_RECONCILED / EXACT_UNIT_AREAS_GOVERNED / COMMERCIAL_LABEL_46M2_AND_73M2 / ROUNDED_RANGE_45M2_TO_73M2_ALLOWED / RELEASE_REVALIDATION_REQUIRED`

The runtime portfolio wording `45m² a 73m²` is therefore not a factual contradiction when used as a rounded range.
