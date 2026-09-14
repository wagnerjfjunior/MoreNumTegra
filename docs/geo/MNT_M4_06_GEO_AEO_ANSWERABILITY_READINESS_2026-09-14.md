# MNT-M4-06 — GEO/AEO, Answerability & AI Discoverability Readiness

Status: `IN_PROGRESS / AUTHORIZED`

Execution base: merged MNT-M4-05 main SHA `8098997eef2eacfb74854f888bfaee2b6225b980`.

## Purpose
Define a testable answerability contract for governed MoreNumTegra page types so M4-08 implementation can improve human decision utility, search answer extraction and AI-assisted discovery without inventing facts, duplicating page ownership or publishing hidden machine-only content.

## Governing sources
- M3-04 governs factual and commercial claims and release-time revalidation.
- M3-06 governs query-family/page ownership.
- M4-01/M4-02 govern surface and page-type ownership.
- M4-03 governs decision-useful content requirements.
- M4-04/M4-05 govern entity/schema truth.

## Core answerability rules
1. **Owner-first answerability.** A page answers only questions that belong to its governed owner scope. Exact-project intent must not be answered primarily by a master, stage, location or portfolio page.
2. **Visible answer parity.** Any answer intended for search/AI extraction must be visible to users in indexable HTML. Hidden copy, schema-only claims or content available only after interaction do not satisfy this contract.
3. **Direct answer before elaboration.** For a material question, the first answer block should state the factual answer or governed uncertainty before marketing explanation, supporting detail or CTA.
4. **Evidence-bound specificity.** Price, availability, address, metragem, stage, delivery, amenities and differentiators may appear only when supported by governed evidence; volatile commercial facts require release-time revalidation.
5. **Entity clarity.** Each answer must make clear which project, master development, stage, location or portfolio it refers to. Do not rely on pronouns or surrounding UI when ambiguity would remain in an extracted passage.
6. **Commercial-state clarity.** Sold/historical, exception inventory and `sob consulta` states must be explicit. Absence of evidence must not be converted into availability.
7. **Semantic extractability.** Use real headings, paragraphs, lists, definition lists or tables where they improve comprehension. Essential facts must not depend on hover, client-side filters or decorative text embedded only in images.
8. **No AEO doorway content.** Do not create thin question pages, duplicate FAQs or keyword variants solely to target answer engines. One intent keeps one governed owner.
9. **Schema follows visible truth.** Structured data may reinforce a visible answer but never create a new factual answer or ownership state.
10. **Human utility is the acceptance gate.** A passage that is easy for a model to quote but does not help a buyer decide is not sufficient.

## Page-type answer contracts

### Portfolio root `/`
Must answer, at minimum, when supported by current portfolio truth:
- what MoreNumTegra is and what it helps the visitor compare;
- which buying stages are represented;
- which governed regions/project discovery paths are available;
- how values shown should be interpreted;
- how to request current conditions.

Must not answer exact-project price, availability, address or typology as the authoritative owner when an exact-project surface owns that intent.

### Caminhos da Lapa master `/caminhos-da-lapa/`
Must answer:
- what Caminhos da Lapa is;
- which verified child projects belong to it;
- how those child projects differ by stage/positioning when factual;
- which child page owns detailed project questions;
- how a buyer should continue to the appropriate exact-project owner.

Must not collapse child-project availability or commercial state into a single master-level claim.

### Exact-project `/empreendimentos/<project>/`
This is the richest answer surface. When governed facts exist, it should answer:
- what the project is;
- where it is;
- current governed stage/commercial state;
- typologies/metragens;
- differentiators that are actually evidenced;
- whether price or availability is known, conditional, historical or `sob consulta`;
- how the project relates to a master development/location/stage when relevant;
- what the buyer should verify before deciding;
- the next action to obtain current conditions.

Questions about price, address, metragem, planta and availability remain sections of this owner where M3-06 assigns them here; they do not justify separate doorway pages.

### Stage `/estagios/<stage>/`
Must answer:
- what the stage means for the buyer;
- which projects are currently verified members of that stage;
- that stage alone does not prove unit availability;
- where to find exact project details.

### Verified location `/regioes/<location>/`
Must answer:
- what geographic scope is being described;
- which Tegra projects are factually verified in that scope;
- useful factual context that helps compare those projects;
- where exact project facts live.

No location page may be made answerable before the verified-project-set fact gate passes.

### Historical/sold project
Must answer:
- what the project/entity is;
- that the governed baseline is historical/sold when applicable;
- whether any current exception inventory is actually verified;
- that historical price/availability must not be interpreted as general current inventory.

## Passage-level readiness test
A material answer block passes only when all applicable checks are `PASS`:

- `OWNER_MATCH`: the question belongs to this page owner;
- `VISIBLE`: the answer exists in visible/indexable content;
- `DIRECT`: the answer or governed uncertainty is stated before promotional expansion;
- `ENTITY_CLEAR`: the subject can be identified if the passage is extracted alone;
- `FACT_BOUND`: material claims trace to governed evidence;
- `COMMERCIAL_STATE_CLEAR`: volatile/current-state limitations are explicit where relevant;
- `NO_CONTRADICTION`: visible copy, metadata and schema do not conflict;
- `NEXT_STEP_CLEAR`: where useful, the visitor can reach the exact owner or current-condition CTA.

A page is not `ANSWERABILITY_READY` if any required material question fails `OWNER_MATCH`, `VISIBLE`, `FACT_BOUND` or `NO_CONTRADICTION`.

## M4-08 implementation gate
For each implemented page type, M4-08 must provide evidence that:
- required question families from `docs/geo/data/MNT_M4_06_ANSWERABILITY_MATRIX.csv` are represented or explicitly `NOT_APPLICABLE`;
- required answers are present in visible HTML;
- exact-project precedence remains intact;
- factual claims resolve to M3-04 or newer governed evidence;
- FAQ/schema parity rules remain satisfied where used;
- no answer is manufactured solely for schema or an AI crawler.

## Integrated validation timing
M4-06 defines readiness criteria; it does not claim production success. The first integrated answerability test is required after M4-08 implementation and before M4 closes. M4-09 then verifies technical discoverability residuals. M5 performs the broader mobile UX, accessibility, performance and conversion validation. Production smoke/evidence remains required after controlled release.

## Boundary
M4-06 does not create runtime pages, change HTML/CSS/JS, publish content, mutate schema, canonical, sitemap, redirects, Green, Vercel, Search Console, GTM/GA4, Ads or spend. It defines the acceptance contract that later implementation must satisfy.
