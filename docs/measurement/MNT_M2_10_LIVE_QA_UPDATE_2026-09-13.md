# MNT-M2-10 — Live QA update — 2026-09-13

Status: `READY_FOR_FINAL_ACCEPTANCE_WITH_ACCEPTED_V1_RESIDUAL`

## Scope

This document records the live browser evidence collected on `2026-09-13` for PR #54 / branch `qa/mnt-m2-10-e2e-measurement` and supersedes the earlier pending states in `MNT_M2_10_E2E_MEASUREMENT_QA_2026-09-12.md` where direct evidence is listed below.

Canonical main remained `ba2a70c793e6879d28192fda4730f950ec6cc68d` during this QA cycle.

No GTM or GA4 configuration mutation was required. Green page 294 uses the v4 `src-greenn/thank-you/obrigado.js` client-side gate. The gate is an accepted V1 heuristic and is not documented as provider/server authentication.

## Sanitized evidence register

Raw browser exports are not committed because Green platform telemetry may contain form values. Only hashes and non-PII outcomes are recorded.

| Evidence | SHA-256 | Outcome |
|---|---|---|
| `TrafikantPixelHelper_moretegra.com.br_13,Sep (1).csv` | `2d3bc8967a306dee8467127aee389604de739ec9a908def15a349bf64376f856` | natural Green success path: one `mnt_lead_success` and one `generate_lead` |
| `TrafikantPixelHelper_moretegra.com.br_13,Sep (2).csv` | `d4a790cb7b9fdd93f10e122ce178818b42f58e34c085a1b7eac023cfa9cfba10` | invalid attempt followed by bare `/obrigado`: zero lead conversion |
| `TrafikantPixelHelper_moretegra.com.br_13,Sep (3).csv` | `f7951643da6791956d9cdbaa8cabad809699751ca8903a951bac770f6974d509` | refresh/back of accepted thank-you journey: zero additional lead conversion |
| `TrafikantPixelHelper_moretegra.com.br_13,Sep (8).csv` | `71570db769cef1e934775c08ef7493eb2e92b97eba64154b7045a7a4cbdfe62d` | pre-reload home load: one GA4 `page_view` |
| `TrafikantPixelHelper_moretegra.com.br_13,Sep (9).csv` | `2dc9bf35bae4ce106d9897d44493ca9c74975b35925b89185b72f48731108925` | reload: one new GA4 `page_view` with a new `mnt_event_id` |
| `TrafikantPixelHelper_moretegra.com.br_13,Sep (10).csv` | `2276f9e960e58c83826e49c0e5a4c68bd0d7d78c614befb0cc907a6f3b480a59` | `www` entry resolved to canonical host with one canonical `page_view` and no project event on `www` |
| `TrafikantPixelHelper_moretegra.com.br_13,Sep (11).csv` | `138b30999a313167bf05f4d3fa8dc920e67e13aa7f21d8f29825d8350c575168` | catalog search emitted one `mnt_catalog_search`; controlled `search_location=lapa`; no raw free-form query in project event |
| `TrafikantPixelHelper_moretegra.com.br_13,Sep (12).csv` | `49dc48117b7c86fb45766418bb22976f71b4a51c7d2b8c4929ecb4c53c06d948` | denied consent state observed for all four governed consent types after reload path |

Additional accepted residual evidence:

```text
file = TrafikantPixelHelper_moretegra.com.br_13,Sep.csv
SHA-256 = 401d45423066db6dcb6f716f7dc85c0bba985069f9a07c9df83fed21f7caefd4
```

The V1 thank-you gate can still be satisfied when a fresh pending marker exists and the complete accepted redirect format is entered manually. Product Authority explicitly accepted this as a known V1 Measurement residual. The project does not treat the client-visible redirect parameters as provider-authenticated proof.

## QA adjudication update

| ID | State after 2026-09-13 live QA |
|---|---|
| QA-01 | PASS |
| QA-02 | PASS — live `www` -> canonical path verified |
| QA-03 | PASS — one page view per document load; reload creates a new event ID |
| QA-04 | PASS — sampled semantic actions emit one canonical source event with unique event ID |
| QA-05 | PASS — source semantics generate a new event ID per intentional occurrence; no synchronization duplicate observed in sampled runtime |
| QA-06 | PASS — one debounced catalog-search event; controlled parameters only |
| QA-07 | PASS |
| QA-08 | PASS |
| QA-09 | ACCEPTED_WITH_V1_RESIDUAL — bare thank-you negative path passes; stronger provider verification is not part of the current architecture |
| QA-10 | PASS — genuine Green success path remains functional |
| QA-11 | PASS — direct bare `/obrigado` does not manufacture a lead |
| QA-12 | PASS — refresh/back does not duplicate lead conversion |
| QA-13 | PASS — deterministic stale-pending guard |
| QA-14 | PASS |
| QA-15 | PASS — raw catalog query is not copied into the project Measurement event |
| QA-16 | PASS — no direct project `gtag()` path; live alias/reload checks show one project page-view path |
| QA-17 | PASS — Meta project runtime remains unimplemented and no direct project `fbq()` path is present |
| QA-18 | PASS — Green platform telemetry remains separate from project business-event mapping |
| QA-19 | ACCEPTED_WITH_V1_RESIDUAL — conversion mapping is correct; lead-validity limitation is the explicit residual above |
| QA-20 | PASS |
| QA-21 | PASS |
| QA-22 | PASS |
| QA-23 | PASS — denied consent observed |
| QA-24 | PASS — granted persistence previously observed; denied persistence observed in current reload path |
| QA-25 | PASS — taxonomy/envelope verified statically and across current runtime samples |

## Exit assessment

No unadjudicated P0/P1 Measurement defect remains in the bounded MNT-M2-10 scope. The only lead-validity limitation is the explicit V1 client-side residual accepted by Product Authority.

Therefore the task is ready for the separate final lifecycle decision:

```text
MNT-M2-10 = READY_FOR_FINAL_ACCEPTANCE
PR #54 = KEEP DRAFT UNTIL EXPLICIT READY/MERGE AUTHORIZATION
```

This update does not itself authorize Ready or merge.
