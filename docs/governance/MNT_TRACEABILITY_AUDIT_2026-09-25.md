# MoreNumTegra — Traceability Audit / State Reconciliation — 2026-09-25

Status: `COMPLETE_CANDIDATE / DOCS_ONLY / CURRENT_STATE_RECONCILIATION`

## 1. Live anchors

Observed live before this reconciliation:

~~~text
repository = wagnerjfjunior/MoreNumTegra
main = 95567db0d16e15d2c6971d8047ab7327d3171578
main message = Merge pull request #260 ... fix(dsg): compact typology selector and gallery labels

Production deployment = dpl_4r1JK6YPLsQC99dPumd8i7SCuwJW
Production source SHA = 95567db0d16e15d2c6971d8047ab7327d3171578
Production state = READY
~~~

Live public smoke:

~~~text
/ = HTTP 200
/empreendimentos/dsg-itaim/ = HTTP 200
/empreendimentos/capiitolo-piero-lissoni/ = HTTP 200
/empreendimentos/caminhos-da-lapa-elo-duo/ = HTTP 200
/empreendimentos/aria-higienopolis/ = HTTP 200
/favicon.ico = HTTP 200 / image/x-icon
runtime errors last 24h = NONE OBSERVED
~~~

## 2. Current-pointer drift found

Before this reconciliation, the following current-state documents still pointed to the older favicon-era runtime:

~~~text
runtime = c80a8e1d773d85af563d9630f6e460e7ad85ea02
deployment = dpl_4F8SF29FyNj7EcpyqM9zT57oYAoi
task = MNT-PERF-01
~~~

Affected current-entry surfaces included:

- `handoffs/CURRENT.md`;
- `docs/PROJECT_STATUS.md`;
- `docs/NEXT_SAFE_ACTION.md`;
- `docs/sfjm/CURRENT_PROGRAM_STATE.json`;
- `docs/sfjm/PROJECT_READ_MODEL.json`.

Classification:

`CURRENT_POINTER_DRIFT / PR_HISTORY_INTACT / RECONCILIATION_REQUIRED`

## 3. PR provenance — #239 through #260

| PR | Disposition | Merge SHA | Durable meaning |
|---|---|---|---|
| #239 | MERGED | `50f06ed22c296da62721a76afda5409d0a06e120` | M7-13 / RESF consumer closure with paid-media scope deferred |
| #240 | MERGED | `cf7f5eb2e10386ff9059a3616f3196f2ee979313` | WBS/dashboard reconciliation; frozen and post-RESF backlog exposed |
| #241 | MERGED | `1543bb2a16d2ecace4d697fa6f381f9353df7582` | favicon/social/CAPIITOLO search-variant remediation |
| #242 | MERGED | `a24a15dc97670c33eaf38381eb7f6d2f5e9f1614` | docs reconciliation for #241 live state |
| #243 | MERGED | `8b78e6c3d405b0383463e71f0059ad64cd9c1312` | corrupt favicon-frame correction |
| #244 | MERGED | `847a2f4460894e1f0fdcc30501f6b6396ec67b75` | favicon rebuilt from Product Authority 500x500 Tegra T source |
| #245 | MERGED | `1b3e77147db1a095a1ff79a34b1eab630eaa6d6b` | docs reconciliation for final Tegra T package |
| #246 | MERGED | `c80a8e1d773d85af563d9630f6e460e7ad85ea02` | explicit 16/32 browser-tab favicon package |
| #247 | MERGED | `4cdb1f743c1efee076643ed4679890e7de50059c` | browser-tab favicon live-state documentation |
| #248 | MERGED | `06edeff31bb31d81cf8786087de161a3bd7aeff9` | SFJM handoff for favicon-load/LCP recheck |
| #249 | MERGED | `a446cf75ade8000d8d8647fd79f4628e4e109a12` | MNT-PERF-01 remediation: localize supplied Tegra brand assets |
| #250 | CLOSED_UNMERGED | — | duplicate remediation path; explicitly superseded by #249 |
| #251 | MERGED | `f65e5b6eab2679c43ffdb94c49a1efda8bc26255` | finish remaining local brand-asset references |
| #252 | MERGED | `78c8f8d6760be6acc7f7de4f205f3e720e0e744c` | regression fix: restore working yellow Tegra logo; remove broken local yellow asset |
| #253 | MERGED | `57dc8531568900262a9cdfa3e4c408a24d99d39b` | bounded browser-cache baseline |
| #254 | MERGED | `18eefa206fc1bc044b52405c93e057d35540dc0e` | initial DSG Itaim exact-project publication |
| #255 | MERGED | `7e716b305e37249c58f08e6830677045a313f4ff` | DSG rebuilt from exact CAPIITOLO composition baseline |
| #256 | MERGED | `22a23bebf843b91e37bedc8d29bdf338b69162f4` | project-page performance transplant + CAPIITOLO schema correction |
| #257 | MERGED | `b1226c01bcdc6c3d230a7c755ffa1a75bb7e47e4` | DSG JSON-LD/canonical preservation fix |
| #258 | MERGED | `97c03ef1e32bc0128c299b5962597154090cbf5d` | DSG schema alignment + Home link/ItemList integration |
| #259 | MERGED | `eb70a668c170b6c9f4b0620a80bd93186685bc5a` | DSG RealEstateAgent image + geo completion |
| #260 | MERGED | `95567db0d16e15d2c6971d8047ab7327d3171578` | DSG typology/gallery-label visual correction |

The PR record preserves both successful and unsuccessful/superseded paths. #250 is intentionally retained as a closed, unmerged duplicate rather than erased.

## 4. Direct-to-main process exceptions found

Four commits were created directly on `main` between PR #256 and PR #257:

| SHA | Commit | Files | Classification |
|---|---|---|---|
| `61a758796efe92cfc05b204a53137c960590ffc3` | Create Tabelas.md | `Tegra/Setembro/Tabela/Tabelas.md` | PROCESS_EXCEPTION / DIRECT_MAIN |
| `cdda08c54b9ddc0ae5a56c9344dd7868eabe6055` | Create Espelhos.md | `Tegra/Setembro/Espelho/Espelhos.md` | PROCESS_EXCEPTION / DIRECT_MAIN |
| `606f0f892d6541e10402b95d4265d274fdbe7dcd` | Espelho DSG Itaim Setembro | `Tegra/Setembro/Espelho/[SET] - DSG Itaim - Espelho.pdf` | PROCESS_EXCEPTION / DIRECT_MAIN |
| `3b0538746629cb707cbe9c7ee93cf0338edaf5db` | Add [SET] DSG Itaim.md to Tabela directory | removes placeholder + adds `Tegra/Setembro/Tabela/[SET] DSG Itaim.md` | PROCESS_EXCEPTION / DIRECT_MAIN |

These commits remain fully identifiable in Git history, but they did not have PR review provenance.

Disposition:

`RETROACTIVELY_RECONCILED_BY_THIS_PR / FUTURE_DIRECT_MAIN_FORBIDDEN_AS_NORMAL_FLOW`

## 5. MNT-PERF-01 disposition

#248 made `MNT-PERF-01` the measurement-only next action.

Subsequent PR evidence shows that work progressed beyond that gate:

- #249 explicitly identifies itself as `MNT-PERF-01 remediation authorized by Product Authority after measurement`;
- #249/#251 localized brand assets;
- #252 fixed a resulting yellow-logo regression;
- #253 established bounded browser caching.

Therefore the old pointer:

`MNT-PERF-01 = ACTIVE / MEASUREMENT_ONLY`

is stale.

However, this audit did not find a single canonical post-remediation measurement packet containing the final current-runtime Lighthouse battery and adjudication.

Current truthful disposition:

`MNT-PERF-01 = EXECUTED / REMEDIATION_CHAIN_MERGED / FINAL_POST_REMEDIATION_MEASUREMENT_PACKET_NOT_CANONICALIZED`

Do not invent final LCP numbers.

## 6. Current product/runtime state

Latest integrated runtime is DSG-post-fix main:

`95567db0d16e15d2c6971d8047ab7327d3171578`

Observed current public surfaces:

- Home;
- DSG Itaim;
- CAPIITOLO;
- Elo Duo;
- Ária Higienópolis;
- favicon package.

DSG is now linked from Home and present in Home structured project discovery, with subsequent JSON-LD, agent geo/image and gallery/typology corrections merged through #260.

## 7. Remaining known work / evidence gaps

Do not silently close:

~~~text
MNT-PERF-EVIDENCE = final current-runtime post-remediation LCP packet not canonicalized
MNT-CDP-01 = provider/publication-owner selection remains pending
MNT-CDP-03 = spreadsheet/CSV value-update path remains pending
MNT-M6-07 = DEFERRED / PAID_MEDIA_FROZEN
MNT-M6-08 = DEFERRED / DEPENDS_ON_M6_07
CAPIITOLO client-side composition = known residual
DSG client-side composition = current implementation characteristic inherited from CAPIITOLO baseline
Google SERP favicon visual refresh = external observation, not guaranteed by site deploy
field CWV / INP = not established merely from lab tests
~~~

## 8. New-conversation reconstruction

A new conversation must resolve live `main` and Production first, then read:

1. `bootstrap/BOOTSTRAP_CANONICO.md`;
2. `docs/governance/MNT_CHANGE_TRACEABILITY_STANDARD_V1.md`;
3. `handoffs/CURRENT.md`;
4. `docs/PROJECT_STATUS.md`;
5. `docs/NEXT_SAFE_ACTION.md`;
6. `docs/BLOCKED_ACTIONS.md`;
7. SFJM structured state;
8. this audit when reconstructing the Sep-23/24 favicon/performance/DSG sequence.

## 9. Audit conclusion

~~~text
PR_HISTORY = STRONG / DURABLE
GIT_HISTORY = DURABLE
CURRENT_POINTERS_BEFORE_AUDIT = STALE
DIRECT_MAIN_EXCEPTIONS = 4
FAILED/SUPERSEDED_PATHS_PRESERVED = YES
SIX_MONTH_RECONSTRUCTION = POSSIBLE_AFTER_THIS_RECONCILIATION
~~~
