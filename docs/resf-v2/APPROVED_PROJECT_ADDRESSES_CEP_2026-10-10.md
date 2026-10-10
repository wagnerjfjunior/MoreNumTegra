# RESF V2 — Address + CEP approved CSV implementation (draft)

Date: 2026-10-10
Approval source: user-uploaded `Tabela Endereço Empreeendimentos.csv` (23 rows, `Publicável no JSON-LD? = OK`).
Baseline: canonical main `9c8bdc74cb83dc9c9566f87d9288daf25f10c051`.
Status: CANDIDATE ONLY / NOT DEPLOYED / DRAFT PR.

## Exact scope

Only update `ApartmentComplex.address.streetAddress` and `ApartmentComplex.address.postalCode`, adding `PostalAddress` to an existing `ApartmentComplex` where it was previously absent. Preserve all existing graph entity types, count, IDs, other commercial data, old `geo` values, and image signals. Never create `geo`, never use centroid coordinates or infer an entrance location. Never change `RealEstateAgent` / `Place` addresses as side effects.

Of 23 approved routes, 7 already have exactly matching address+CEP in main and remain unchanged; the other 16 are changed on this candidate branch. DSG Itaim/CAPIITOLO excluded from RESF V2 scope. Region pages excluded.

## Approved project addresses (CSV values)

| Route | ApartmentComplex streetAddress | postalCode |
|---|---|---|
| ampere-brooklin | Rua André Ampére, 136 | 04562-080 |
| aria-higienopolis | Rua Coronel José Eusébio, 145 | 01239-030 |
| ayla-moema-studio-office | Avenida Chibarás, 75 | 04076-000 |
| bem-moema-studios-offices | Alameda dos Arapanés, 1241 | 04524-002 |
| bem-moema | Avenida Bem-te-vi, 221 | 04524-030 |
| bueno-brandao-257 | Rua Bueno Brandão, 257 | 04509-021 |
| caminhos-da-lapa-elo-duo | Rua Fortunato Ferraz, 851 | 05093-000 |
| chateau-jardin | Rua Ministro Nelson Hungria, 400 | 05690-050 |
| chez-vous-moema | Avenida Rouxinol, 1017 | 04516-001 |
| garden-design | Rua Fortunato Ferraz, 625 | 05093-000 |
| key-moema | Avenida dos Imarés, 160 | 04085-000 |
| ledge-brooklin | Avenida Nova Independência, 110 | 04570-000 |
| mozae-higienopolis | Rua Conselheiro Brotero, 832 | 01232-010 |
| nova-vivere | Rua Fortunato Ferraz, 625 | 05093-000 |
| ode-perdizes | Rua Bartira, 856 | 05009-000 |
| reserva-caminhos-da-lapa | Rua Fortunato Ferraz, 280 | 05093-000 |
| soma-perdizes | Avenida Sumaré, 179 | 05016-090 |
| teg-sacoma | Rua Malvina Ferrara Samarone, 195 | 04279-035 |
| tiel-vila-nova-conceicao | Rua Jacques Félix, 309 | 04509-001 |
| universo-tatuape-orbita | Avenida Celso Garcia, 5040 | 03064-000 |
| viso-moema | Avenida Lavandisca, 627 | 04515-011 |
| ypy-alto-do-ipiranga | Rua Marquês de Olinda, 336 | 04277-000 |
| zahle-jardins | Rua Osório Duque Estrada, 40 | 04001-120 |

## Documented qualifications from approved CSV

- **Bem Moema Studios & Offices:** catalog uses Arapanés 1241, some records contain 1214; approval explicitly chooses 1241 while original discrepancy should be retained as evidence, not silently erased.
- **Elo Duo:** project `ApartmentComplex` uses Fortunato Ferraz **851** (from Helbor), whereas sales stand at **625** has a distinct `Place` identity and must remain unchanged. Former project field **365** was replaced.
- **Garden Design:** 625 is explicitly accepted in the CSV as marketing/showroom reference for the project, **not a certified physical entrance**.
- **Nova Vivere:** 625 is a showroom address. Its use in `ApartmentComplex.address` is per approved CSV, but should not be represented as a geocoded tower entrance.
- **Reserva Caminhos da Lapa:** 280 remains the user-approved site reference; portaria identity still requires physical verification.
- **Viso Moema:** use approved 04515-011 from condominium business record; public realty advert 04515-010 remains a documented disagreement.
- Coordinates and lat/long are NOT part of this authorization. `GeoCoordinates` already present for some pages remain byte-equivalent in graph data; no newly inferred coordinates are introduced.

## Validation, release and Google

1. Run static diff-invariance test against the above canonical main SHA: same JSON-LD entity types/count, same non-address fields in entire graph, and exactly the approved project address/CEP per route.
2. Check every applicable page still has a coherent visible address; check Elo Duo footer as stand, which intentionally differs.
3. Audit social/search images, commercial schema, Form 46, CTA and responsive performance unchanged.
4. The PR is separately reviewable from #364/#366/#367; integration will require resolving overlapping JSON-LD edits in 5 exact-project pages.
5. Draft does not authorize merge, Vercel production or Google Search Console submission. Aggregate GSC recrawl planned only after complete release.
