# MNT-SEARCH-IMAGE-AUDIT-01 — Inventário e checagem de mídia
Date: 2026-10-10
Status: READ_ONLY / SOURCE_AND_HTTP_EVIDENCE / NO_RUNTIME_MUTATION
Repository: wagnerjfjunior/MoreNumTegra
PR: #364, draft
Validated head: fe6bedb8f702a212cb3501627be13736577e3ff2
GitHub Actions run: https://github.com/wagnerjfjunior/MoreNumTegra/actions/runs/38068581361
Artifact: https://github.com/wagnerjfjunior/MoreNumTegra/actions/runs/38068581361/artifacts/11676176180
Contains: resf-v2-inventory.json, resf-v2-matrix.md, resf-v2-media.json, resf-v2-media.md, resf-v2-image-http.json.

## Scope
- 44 HTML source files previously discovered.
- 38 commercial sources: 25 exact-project + 13 region.
- Product Authority excludes **DSG Itaim** and **CAPIITOLO** from RESF V2 migration and remediation. They may appear only for audit traceability.
- **36 in scope**: 23 exact-project + 13 region.
- This audit does **not** include Home because the prior migration inventory treats Home as a distinct non-`index.html` file; Home already has separate approved image ownership evidence from PR #355. Home remains subject to its existing gate, not silently included among 36.

## First source audit: exact numbers
- In-scope pages with hero found: **36/36**.
- In-scope pages with `og:image`: **36/36**.
- In-scope pages with `twitter:image`: **36/36**.
- In-scope pages with no explicit JSON-LD primary image URL resolved by audit heuristic: **30/36**. This is **NOT** equivalent to a defect; `primaryImageOfPage` is not universally required and valid `Product.image` /`ImageObject` relationships can exist without explicit `primaryImageOfPage`.
- 14 in-scope pages expose images within factual `Person`/`RealEstateAgent` schema nodes. Their presence does not prove the photo is selected by Google nor authorize removal.
- 1 observed hero/OG distinction: `/empreendimentos/aria-higienopolis/`. Do not force equal URLs; require only approved intended ownership.
- Explicit primary media is already approved for Mozae by PR #353 and Home by PR #355; do not override on the strength of static heuristics.

## Network check
- **28 distinct HTTPS image URLs** collected from in-scope hero, OG, Twitter and explicit JSON-LD primary fields.
- **28/28 returned successful image HTTP response** during GitHub Actions execution.
- **0 HTTP 404, 0 other errors/inconclusive** in that run.
- Probe uses HEAD then fallback GET Range. A success proves accessibility at check time only, not approved image ownership, browser crop, rich-result usage, original license, image size or end-user performance.
- Gallery, CSS background and image URLs in other JSON-LD image relationships are outside this HTTP probe. Extend scope only when the media audit contract specifically requires them.

## Preliminary editorial review targets (NOT confirmed defects)
1. `/regioes/lapa/`: media hosted on Helbor external site; verify rights, suitable representation of Lapa, and resiliency before considering transfer to authorized host.
2. `/regioes/higienopolis/`: photo hosted on Wikimedia; confirm rights/attribution, approved visual purpose and suitability. Existing regional graph is canonical only for Higienópolis.
3. `/empreendimentos/aria-higienopolis/`: hero and OG use different images; check whether the current deliberate art-direction/media selection is retained. Avoid unnecessary churn.
4. `/empreendimentos/mozae-higienopolis/`: preserve PR #353 approved rooftop as hero, OG, Twitter and search image owner; leave factual Person schema intact.
5. `/empreendimentos/soma-perdizes/`: observe Google thumbnail as an external phenomenon; schema Person image presence is not permission to globally suppress Sabrina.
6. Other regional pages frequently reuse a particular development's facade image. Decide whether regional coverage merits an actual region image; this is an editorial decision rather than syntax failure.

## Acceptance outstanding
- Source inventory and HTTP URL probe: EXECUTED.
- Full image ownership per page: inventory generated in attached JSON/Markdown, requires human review and approved media decisions.
- Visual correctness / crops / alt quality / project factual semantics: NOT COMPLETE.
- Resolution/bytes and responsive-source selection on mobile: NOT COMPLETE.
- Live Vercel rendered page and Google-selected thumbnails: NOT COMPLETE.
- Remediation proposals: NONE applied; maintain the existing no-bulk-image-swap gate.

## Next safe action
Create an approval matrix per project/region with status `PRESERVE_APPROVED`, `VISUAL_REVIEW`, `EXCEPTION` or `PROPOSE_REPLACEMENT`. Default to retain the current source when unapproved. Apply only bounded PRs after approval, preview and mobile QA.
