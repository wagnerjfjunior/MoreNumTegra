# MoreNumTegra — SFJM handoff — MNT-M3-06 — 2026-09-13

Canonical repo: `wagnerjfjunior/MoreNumTegra`.

Live integrated main resolved before reconciliation:

`5bd7ec7913e802589f6025a8bc98a1ef8378f84e`

## Program position

```text
MNT-M0 COMPLETE
MNT-M1 COMPLETE
MNT-M2 COMPLETE
MNT-M3 ACTIVE
MNT-M3-01 COMPLETE / ACCEPTED
MNT-M3-02 COMPLETE / ACCEPTED
MNT-M3-03 COMPLETE / ACCEPTED / PR #58 MERGED
MNT-M3-04 COMPLETE_CANDIDATE / PR #59 OPEN DRAFT
MNT-M3-05 COMPLETE_CANDIDATE / PR #60 OPEN DRAFT
MNT-M3-06 COMPLETE_CANDIDATE / PR #61 OPEN DRAFT
MNT-M3-07 PLANNED / NOT_AUTHORIZED
```

## Reconciled stack

The previously stacked candidate branches were reconciled onto the post-#58 live main without carrying the accidental placeholder history into the PR deltas:

```text
main 5bd7ec7913e802589f6025a8bc98a1ef8378f84e
-> PR #59 M3-04 head 649612a0bae8c90ccb1eee91fe1509df594abb16
-> PR #60 M3-05 head 33b11e216e94ea01c487bccee60e1cf886bd1baf
-> PR #61 M3-06 branch, resolve live head before any further mutation
```

PR #61 uses a reconciliation merge commit to preserve its existing history while adopting the new #60 ancestry. Its effective PR delta remains bounded to M3-06 files.

No Ready/merge authorization has been given for #59, #60 or #61.

## M3-06 result

M3-06 now defines:

- one primary/conditional/support/no-owner disposition for every material M3-05 query family;
- stable exact-project route ownership without treating route reservation as implementation;
- separation of `/caminhos-da-lapa/` master intent from exact child-project intent;
- project modifier handling on the exact project canonical rather than thin price/address/metragem doorway pages;
- conditional stage owners under `/estagios/`;
- conditional location-owner pattern under `/regioes/` only when a verified project set exists;
- canonical/indexability rules for planned vs existing routes;
- anti-overlap and internal-linking direction;
- explicit exclusions for corporate/tool/noise/rental/house families.

Artifacts:

- `docs/search/MNT_M3_06_QUERY_FAMILY_PAGE_OWNER_MAP_2026-09-13.md`
- `docs/search/data/MNT_M3_06_PAGE_OWNER_MAP_2026-09-13.csv`
- `docs/product/MNT_OFFICIAL_TEGRA_PROJECT_SURFACES_2026-09-13.md`

No runtime, Green, Vercel, Search Console, GTM/GA4, DNS or production route mutation was performed.

## Product/commercial truth to preserve

### ODE Perdizes

```text
public baseline = entregue / sold-out
commercial exception = returned unit 22
```

The exception does not reopen general inventory. Availability/price must be immediately revalidated before public release. Do not revive the older comparative `de R$ 2.200.000` without new evidence.

### Reserva Caminhos da Lapa

```text
public baseline = entregue / 100% vendido
commercial exception = exception units under consultation
quantity / units / price = not established
```

Do not invent quantity, unit number, price or normal availability. `Sob consulta` requires current revalidation and must not imply general reopened inventory.

## Official Tegra sources / permission

Product Authority supplied the current official Tegra project-surface list and confirmed permission to use Tegra content/images in MoreNumTegra downstream work. This is a source-use permission, not automatic publication authority. Volatile commercial facts remain governed by release-time revalidation.

## Next safe lifecycle action

Review the candidate stack in order:

`PR #59 -> PR #60 -> PR #61`

Any Ready transition or merge requires explicit Product Authority authorization for the relevant PR/lifecycle step.

`MNT-M3-07` is not authorized and must not start by sequence alone.

Before any future mutation, resolve live `main`, live PR #59/#60/#61 and read the canonical SFJM entrypoints again.
