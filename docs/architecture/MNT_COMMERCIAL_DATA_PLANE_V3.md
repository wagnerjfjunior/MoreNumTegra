# MoreNumTegra — Commercial Data Plane v3

Date: 2026-09-22

Status: CANONICAL_CANDIDATE / MULTI_OFFER_MODEL / PROVIDER_NEUTRAL / NO_RUNTIME_MUTATION

## 1. Why v3 is required

Commercial Data Schema v2 allows only one commercial record per projectId.

The current Home proves that shape is insufficient because one project can legitimately expose more than one commercial object at the same time.

Current examples:

~~~text
Nova Vivere
- 72 m² commercial card
- 105 m² / cash-condition commercial card

CAPIITOLO by Piero Lissoni
- standard/current commercial card
- separate cash-condition commercial card
~~~

Flattening those objects into one project-level price would lose information or force duplicate fake project identities.

Therefore:

~~~text
PROJECT != OFFER
ONE PROJECT -> ZERO OR MORE OFFERS
~~~

## 2. Canonical identity

The Product Fact & Claim Registry project_id namespace remains the preferred canonical commercial identity.

Legacy/runtime identifiers may be accepted only through explicit aliases during migration.

Known example:

~~~text
canonical registry id = caminhos-lapa-elo-duo
legacy commercial-values key = caminhos-da-lapa-elo-duo
~~~

The public snapshot must not duplicate the same real project merely because legacy consumers use different keys.

## 3. v3 shape

Normative schema:

docs/architecture/MNT_COMMERCIAL_DATA_SCHEMA_V3.schema.json

Logical shape:

~~~text
snapshot
  schemaVersion = 3
  snapshotId
  snapshotState = candidate | published | retired
  generatedAt
  publishedAt
  authorityRef
  supersedesSnapshotId
  currency
  projects
    canonical projectId
      state
      inventoryLabel
      legacyAliases[]
      typologyAvailability{}
      offers
        offerId
          state
          offerKind
          priceLabel
          price
          oldPrice
          tablePrice
          unit
          areaSqm
          pricePerSqm
          reference
          urgency
          observedAt
          validUntil
          sourceClass
          sourceRef
          disclaimer
~~~

## 4. Offer identity

offerId is stable within the project and represents a distinct commercial object, not a page/card.

Examples of semantic offer identities:

~~~text
main-reference
cash-reference
promo-unit-2408
unit-22
studio-1510
~~~

Do not encode transient UI position such as card-1/card-2 into offerId.

## 5. Presentation remains separate

The Home static catalogue remains responsible for:

- project/card ordering;
- location;
- stage;
- descriptive typology;
- image/media;
- SEO copy;
- CTA wording where not commercial.

A card references:

~~~text
projectId
commercialOfferId
~~~

The commercial feed supplies the offer.

This allows two Home cards to point to two offers under the same project without duplicating project truth.

## 6. Derived commercial values

Where price and area are present:

~~~text
pricePerSqm = price / areaSqm
~~~

The consumer should derive it where possible rather than create an independent competing value. The v3 schema also supports `pricePerSqm` for legitimate reference-only/current Home cases where that rate is itself the governed commercial object. If both total price and rate are present, validation must check semantic consistency.

`tablePrice` is separate from `oldPrice`: table/base price is not automatically a promotional previous price.

## 7. Current Home bootstrap authority

Until the v3 publication path is live, current Home values remain governed by:

docs/product/PA_MNT_HOME_COMMERCIAL_TRUTH_2026-09-22.md

Migration must preserve those values exactly.

~~~text
MIGRATION != REPRICING
MIGRATION != INVENTORY CHANGE
~~~

## 8. v2 disposition

Commercial Data Plane v2 remains useful historical architecture evidence for:

- separation of presentation and commercial state;
- fail-closed behavior;
- deployment independence;
- public-read/admin-write separation.

Its single-commercial-record data shape is superseded by v3 for future implementation.

The existing repository-local commercial-values.json remains a legacy/reference consumer artifact until migration.

## 9. Update mechanism

The target publication path remains:

~~~text
AUTHORIZED INPUT
-> NORMALIZE
-> VALIDATE
-> CANDIDATE SNAPSHOT v3
-> APPROVE
-> PUBLISH ATOMIC VERSION
-> CURRENT POINTER
-> PUBLIC READ
-> CONSUMERS
~~~

Routine value changes must not require editing Home HTML/CSS/JS.

## 10. Provider boundary

Provider is not selected here.

FECH.AI live discovery confirms useful internal inventory/tenant capabilities but no proven MoreNumTegra public publication context, and Security Go is not granted.

Therefore:

~~~text
DIRECT BROWSER -> FECH.AI INTERNAL TABLES = FORBIDDEN
FECH.AI = FUTURE CANDIDATE PUBLICATION OWNER ONLY AFTER ITS OWN GATE
~~~

The selected provider must satisfy the requirements in MNT_COMMERCIAL_UPDATE_MEDIUM_REENTRY_2026-09-22.md.

## 11. Next implementation preparation

Before any runtime consumer migration:

1. build the canonical projectId/legacy-alias crosswalk;
2. map every current Home card to projectId + offerId;
3. generate a v3 snapshot candidate from the recertified Home with zero commercial changes;
4. validate all 23 current Home cards against that snapshot;
5. select the publication provider;
6. prove independent publish/version/rollback/read behavior;
7. only then alter runtime consumers.


## 12. Candidate snapshot receipt

A zero-change candidate snapshot was materialized from the recertified Home state:

docs/architecture/data/MNT_HOME_COMMERCIAL_SNAPSHOT_V3_CANDIDATE_2026-09-22.json

Card binding map:

docs/architecture/data/MNT_HOME_CARD_COMMERCIAL_BINDINGS_V1_2026-09-22.json

Validation receipt:

~~~text
canonical projects = 21
commercial offers = 25
Home cards = 23
multi-offer projects = 4
runtime primary-price parity = 23/23
runtime old/comparative-price parity = PASS
structural issues = 0
snapshot state = candidate
publishedAt = null
runtime mutation = 0
~~~

Multi-offer projects proven by the current Home:

- nova-vivere;
- aria-higienopolis;
- capiitolo-piero-lissoni;
- ledge-brooklin.

The snapshot is not published and is not consumed by Production.


## 13. Post-RESF task decomposition

Current operational decomposition:

| ID | Task | State |
|---|---|---|
| MNT-CDP-01 | Select/prove provider/publication owner | ACTIVE / PROVIDER_SELECTION |
| MNT-CDP-02 | Public read + protected admin write | PLANNED / BLOCKED_BY_CDP_01 |
| MNT-CDP-03 | Spreadsheet/CSV operator update path | PLANNED / PENDING |
| MNT-CDP-04 | Approval/publish/version/rollback/audit | PLANNED |
| MNT-CDP-05 | Runtime consumer migration | PLANNED / NOT_AUTHORIZED |
| MNT-CDP-06 | E2E value-only update without site deploy + rollback proof | PLANNED |

The spreadsheet/CSV task must output the same v3 candidate shape as any future admin UI or GPT-assisted transform. It is not a second source of truth.
