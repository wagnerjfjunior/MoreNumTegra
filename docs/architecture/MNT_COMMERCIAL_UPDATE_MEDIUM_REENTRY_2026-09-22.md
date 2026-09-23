# MoreNumTegra — Commercial Update Medium Re-entry

Date: 2026-09-22

Status: ACTIVE / ARCHITECTURE_REENTRY / PROVIDER_NOT_SELECTED / NO_RUNTIME_MUTATION

## 1. Product direction

Product Authority requires:

~~~text
CURRENT HOME COMMERCIAL STATE = PRESERVE
ROUTINE COMMERCIAL UPDATE != EDIT HTML/CSS/JS
ROUTINE COMMERCIAL UPDATE != SITE DEPLOY
AUDITABILITY = REQUIRED
ROLLBACK = REQUIRED
PUBLIC READ != ADMIN WRITE
~~~

Current Home values are now recertified by:

docs/product/PA_MNT_HOME_COMMERCIAL_TRUTH_2026-09-22.md

## 2. Existing consumer-side architecture

The current canonical candidate architecture is Commercial Data Plane v3:

- `docs/architecture/MNT_COMMERCIAL_DATA_PLANE_V3.md`
- `docs/architecture/MNT_COMMERCIAL_DATA_SCHEMA_V3.schema.json`
- `docs/architecture/MNT_COMMERCIAL_HARDCODE_INVENTORY_2026-09-16.md`

Commercial Data Plane v2 remains historical architecture evidence only; its single-commercial-record-per-project shape is superseded.

The current repository-local `commercial-values.json` is useful as a legacy/reference consumer artifact but is not the final update medium because updating it still belongs to the MoreNumTegra deployment tree.

## 3. Live FECH.AI discovery

Read-only discovery on 2026-09-22 resolved FECH.AI main to:

~~~text
wagnerjfjunior/fecha.ai
main = 0e9573552cf96d4bad780f35d0517aefd6463d2c
~~~

Observed relevant capabilities include:

- empreendimentos / inventory domain;
- estoque_arquivos;
- estoque_snapshots;
- unidades_estoque;
- availability ingestion and snapshot concepts;
- composite tenant-graph hardening for inventory relations;
- authenticated/admin import paths and audit-oriented structures.

However:

~~~text
PROVEN_PUBLIC_PUBLICATION_CONTEXT_FOR_MORENUMTEGRA = NO
PROVEN_PUBLIC_READ_MODEL_FOR_MORENUMTEGRA = NO
SECURITY_GO = NOT_GRANTED
DIRECT_BROWSER_TO_FECHAI_INTERNAL_TABLES = FORBIDDEN
~~~

Therefore FECH.AI remains a candidate upstream system, not an authorized MoreNumTegra runtime dependency.

## 4. Target update medium

The medium should expose one small versioned public commercial snapshot.

Logical contract:

~~~text
AUTHORIZED INPUT
  -> NORMALIZE
  -> VALIDATE SCHEMA + BUSINESS RULES
  -> CANDIDATE SNAPSHOT
  -> APPROVE/PUBLISH
  -> VERSIONED PUBLIC READ SNAPSHOT
  -> CURRENT POINTER
  -> MoreNumTegra Home + exact-project consumers
~~~

Required public payload characteristics:

- JSON;
- schemaVersion;
- snapshot/version id;
- generated/published timestamp;
- projectId-keyed commercial records;
- only publishable fields;
- no PII;
- no secret;
- no internal evidence that is not meant for publication.

## 5. Update channels

Future operator inputs may include:

- structured admin UI;
- spreadsheet / CSV;
- JSON;
- TXT;
- GPT-assisted candidate transformation.

Current dashboard-visible task:

`MNT-CDP-03 — Planilha/CSV para atualização de valores: importar, normalizar, validar e gerar candidate snapshot`.

The spreadsheet/CSV is an operator input only. The browser never consumes the spreadsheet directly.

Every input channel must produce the same canonical candidate snapshot and pass the same validator.

GPT is never commercial authority and must not invent missing price/unit/availability.

## 6. Publication semantics

Required operations:

~~~text
CREATE_CANDIDATE
VALIDATE
APPROVE
PUBLISH
READ_CURRENT
READ_VERSION
ROLLBACK_TO_VERSION
AUDIT_HISTORY
~~~

Publication should be atomic or equivalent. A partially written snapshot must never become current.

## 7. Browser consumer semantics

MoreNumTegra browser behavior:

~~~text
page loads durable product/presentation content
-> fetch current commercial snapshot once
-> validate envelope/version
-> resolve by projectId
-> render commercial state
-> derive price/m² where applicable
-> structured Offer uses same record
~~~

Failure behavior:

~~~text
PUBLIC SNAPSHOT UNAVAILABLE/INVALID
-> no stale embedded price fallback
-> render consult-only commercial state
-> preserve product content, CTA and Form 46
~~~

## 8. Provider gate

Provider is deliberately not selected by this document.

Any provider must satisfy:

- public HTTPS read;
- authenticated/protected write;
- version history;
- rollback;
- atomic/current pointer semantics;
- browser-compatible CORS when cross-origin;
- predictable cache/freshness;
- no browser secret;
- audit trail;
- low operational complexity;
- ability to update commercial data without MoreNumTegra runtime deployment.

Candidates may include a future FECH.AI publication context, a securely designed Supabase publication surface, an object-store publication pattern, or another provider that passes the same contract.

## 9. Explicitly rejected as final medium

~~~text
src-greenn/data/commercial-values.json in MoreNumTegra repo
= NOT FINAL UPDATE MEDIUM
~~~

Reason: repository-local updates still participate in site deployment/runtime lifecycle.

Direct MoreNumTegra browser access to FECH.AI internal operational tables is also rejected.

## 10. Next gate

Before runtime migration:

1. select provider/publication owner;
2. define exact public read contract and URL/discovery mechanism;
3. define admin-write authentication/authorization;
4. prove versioning/rollback;
5. prove cache/CORS/fail-closed behavior;
6. use the already validated v3 candidate snapshot/binding baseline and preserve current Home values;
7. prove the spreadsheet/CSV operator path produces the same governed v3 candidate shape;
8. only then authorize and migrate consumers.

No Production change is authorized by this architecture re-entry document.


## 11. Dashboard-visible implementation decomposition

```text
MNT-CDP-01 = ACTIVE / select and prove provider/publication owner
MNT-CDP-02 = PLANNED / public read + protected admin write
MNT-CDP-03 = PLANNED / PENDING / spreadsheet-CSV operator update path
MNT-CDP-04 = PLANNED / approval-publish-version-rollback-audit
MNT-CDP-05 = PLANNED / NOT_AUTHORIZED / runtime consumer migration
MNT-CDP-06 = PLANNED / E2E value-only update without site deploy + rollback proof
```

These tasks are outside RESF accepted-hour accounting.
