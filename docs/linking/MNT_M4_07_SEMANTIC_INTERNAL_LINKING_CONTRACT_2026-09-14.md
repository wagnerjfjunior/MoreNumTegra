# MNT-M4-07 — Semantic Internal-Linking Contract

Status: `COMPLETE_CANDIDATE / AUTHORIZED`

Execution base: merged MNT-M4-06 main SHA `72ceeab91757ebec8edb0cec6c80c926e8bba43f`.

## Purpose
Define the internal-link graph that preserves M3-06 ownership, supports M4-06 answerability, and prepares deterministic implementation in M4-08 without creating doorway pages or transferring canonical intent.

## Governing rules
1. Exact-project ownership has precedence over master, stage, location and portfolio surfaces.
2. Links may distribute discovery and context; they do not transfer query ownership.
3. Every link destination must be a governed real route or an explicitly conditional future route whose fact gate is satisfied before publication.
4. No support-only, `NO_OWNER` or noise family receives a dedicated doorway merely to create links.
5. Project modifiers such as price, metragem, address, planta and availability remain sections of the resolved exact-project owner unless governance changes.
6. Stage/location pages may link only to verified current members and must not imply commercial availability from membership alone.
7. Historical/sold pages preserve entity truth and may link to active alternatives without implying that the historical project itself is active inventory.
8. Anchor text must describe the destination naturally; avoid exact-match repetition, keyword stuffing and misleading commercial language.

## Link directions by surface
### Portfolio root
May link to:
- Caminhos da Lapa master;
- verified stage discovery pages;
- verified location discovery pages;
- governed exact-project pages.

Must not absorb exact-project modifiers into standalone doorway URLs.

### Caminhos da Lapa master
Must link to its verified child-project exact owners. Child-project links are primary navigation to exact intent; the master must not replace them.

### Exact project
May link to:
- factual master parent when applicable;
- verified stage/location discovery surfaces;
- related exact projects only when the relationship is user-useful and factually supportable;
- lead CTA/Form 46 journey.

Links back to discovery surfaces are secondary context, not ownership delegation.

### Stage
Must link to every visible verified member's exact-project owner. It must not use stage membership as proof of available stock.

### Verified location
Must link to every visible verified project member's exact-project owner. Location routes remain conditional until their factual project-set gate is satisfied.

### Historical/sold project
May link to current active alternatives or its factual master context, but must preserve sold/historical disclosure and must not imply general active inventory.

## Anchor contract
Preferred anchors are entity/descriptive anchors such as project name, project + factual context, or user-intent phrasing that matches the visible destination. Prohibited patterns include repetitive exact-match stuffing, false price/availability anchors, hidden links and anchors that point to a different semantic owner than the label suggests.

## Graph integrity gates
A candidate implementation passes only when:
- every indexable exact-project page is reachable through at least one governed discovery path;
- no orphan exact-project page remains;
- master/stage/location links resolve to exact owners, not modifier doorways;
- no link targets `NO_OWNER`, support-only or unverified conditional pages;
- sold/historical and exception-state links preserve commercial-state truth;
- link labels and destination ownership do not contradict M3-06;
- no JS-only filter state is treated as an indexable link destination.

## Implementation evidence required in M4-08
M4-08 must produce a crawl/link audit showing, at minimum: source route, destination route, destination owner class, anchor text, HTTP result, indexability state, orphan count and any broken/redirecting internal link. The M4 integrated gate must reconcile that evidence with this contract before M4 closes.

## Boundary
M4-07 is design/documentation only. It does not modify runtime HTML/CSS/JS, routes, sitemap, canonical, redirects, Green, Vercel, Search Console, GTM/GA4, Ads or spend. Runtime linking changes remain M4-08 and technical residual changes remain M4-09, each separately gated.
