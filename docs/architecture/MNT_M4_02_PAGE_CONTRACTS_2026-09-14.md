# MNT-M4-02 — Page Contracts and Page Types

Status: `COMPLETE_CANDIDATE / AUTHORIZED`

Execution base: merged MNT-M4-01 main SHA `e683143af003be74eeb986fe5ffd3e38971407b3`.

## Purpose
Define reusable contracts for each governed page type before content/runtime implementation.

## Global contract
Every indexable page type must have one canonical owner state inherited from M3-06/M4-01, one H1 aligned to the owned intent, unique title/meta description, indexable text content, factual claims sourced from M3-04 or release-time revalidation, and links that preserve exact-project precedence. No page type may manufacture a route merely to absorb unsupported demand.

## Page types
### Portfolio root `/`
Owns Tegra/portfolio exploration. Must not steal exact-project, master, stage or verified-location intent. Required blocks: brand/portfolio proposition, governed project discovery, stage/location entry points only when their contracts are satisfied, visible lead CTA and native Form 46 journey.

### Master development `/caminhos-da-lapa/`
Owns Caminhos da Lapa master-development intent. Must enumerate factual child projects without replacing their exact-project owners. Required blocks: master context, verified child-project set, lifecycle/stage explanation, project links and lead CTA.

### Exact project `/empreendimentos/<project>/`
Primary owner for resolved project intent and its governed modifiers. Required blocks when facts exist: project identity, location, stage, typologies/metragens, differentiators, commercial-state disclosure, decision-useful FAQ where factual, related master/stage/location links and lead CTA. Price, availability, address, planta and metragem remain sections of the project owner when M3-06 says so.

### Stage `/estagios/<stage>/`
Conditional discovery page. It may exist/index only after factual membership is proven. Must list only projects currently verified for that stage and must not imply availability from stage alone. Exact-project links are mandatory.

### Verified location `/regioes/<location>/`
Conditional discovery page. It may exist/index only after a verified project set exists. It must explain the geography with factual, decision-useful content and route users to exact project owners. No Campo Belo page is admitted until its fact gate is satisfied.

### Historical/sold project
Entity page may preserve historical navigation where M3-06 assigns a historical owner. It must clearly separate historical/sold baseline from any current exception inventory. No general availability implication. Exceptions such as returned units or units under consultation require current release-time revalidation.

## SEO contract
One H1 per page. Titles and meta descriptions must be unique and accurately describe the owner intent. Canonical target is the page itself only after the runtime route is valid. FAQPage schema is allowed only when a visible factual FAQ exists. ItemList is allowed only when the visible list and item membership are factual. Structured data implementation itself remains outside M4-02.

## Lead/CTA contract
M4-02 does not replace the Green native Form 46 lifecycle. Commercial pages may expose the existing governed CTA/Form 46 journey. `mnt_form_start` and `mnt_form_submit_attempt` remain non-lead events; accepted lead semantics remain governed by M3-07/M2.

## Internal-link expectations
Portfolio may link to master, valid stage/location surfaces and projects. Master links to child projects. Stage/location pages link to exact-project owners. Project pages may link back to factual parent/master/stage/location surfaces where useful. No support-only or excluded family gets a dedicated doorway page.

## Boundary
No HTML/CSS/JS implementation, schema implementation, sitemap/canonical/redirect mutation, Green/Vercel/Search Console mutation, Ads or spend is authorized by M4-02.