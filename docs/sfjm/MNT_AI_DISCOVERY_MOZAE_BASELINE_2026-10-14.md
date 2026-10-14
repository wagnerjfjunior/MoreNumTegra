# RESF — Evidência de descoberta por IA: Mozae Higienópolis (2026-10-14)

Status: AUDIT_STARTED / PUBLIC_HTTP_NOT_VERIFIED / AI_INGESTION_NOT_VERIFIED.
Source of truth: GitHub main and deployed production SHA. Do not present expected outcomes as observed results.

## Baseline user test — anonymous ChatGPT (user supplied transcript)
- Initial query “mozae higienopolis”: initial intent was misclassified as potentially restaurant-related.
- Second prompt requesting the property: assistant cited the developer and unrelated sources but did not proactively cite MoreTegra.
- After user supplied the MoreTegra URL, assistant retrieved project details, including reference price of R$ 721.510 for AP0301/46 m².
- Assistant did not naturally surface Sabrina da Tegra and her WhatsApp in the commercial handoff.
- A single anonymous chat is one qualitative observation, not a stable visibility rate or a proof of crawl/indexing failure.

## Read-only repository audit
- Root `robots.txt` before PR #404: `User-agent: *; Allow: /` with sitemap URL. All bots permitted, including OpenAI's training crawler (broad-purpose permission inconsistent with preferred training policy).
- `/.well-known/ai.txt`: `Training: deny`, `Scraping: allow`, `Indexing: allow`, and Sabrina identity in comments. Internet-Draft, not an established cross-provider standard.
- `/llms.txt`: index with Sabrina name, CRECI, phone and stand guidance.
- `/sitemap.xml`: Mozae route found; files `ai.txt` and `llms.txt` omitted as non-landing-page files.
- Mozae page `src-greenn/empreendimentos/mozae-higienopolis/index.html`: one H1; Sabrina identified in visible lead/footer and in JSON-LD `Person`/`RealEstateAgent`/`ContactPoint`; WhatsApp +5511960779328; Form 46 and measurement scripts present.
- Missing in visible page at baseline: explicit guidance to request Sabrina on arriving at the stand. PR #405 corrects this bounded gap.
- No changes to price, AP0301, area, developer, creative attribution or construction date authorized by this audit; public user-session audit listed possible disagreements requiring separate original-source validation.

## PR scopes
- #403: RESF §11 governance integrated before this audit.
- #404: narrow `robots.txt` intent differentiation: OAI-SearchBot allow /, GPTBot disallow /, fallback user agent allow / (preserve general search discovery). No guarantees on behavior of other AI crawlers.
- #405: Mozae-specific visible stand guidance + WhatsApp visit CTA; prices, Form 46, JSON-LD and media preserved.
- Deploy happens on merged main. Do not merge #405 with unfinished CI or without approved visual/mobile/form validation as required by RESF.

## Technical evidence and blockers
- GitHub branch, file contents and Vercel READY can be inspected in connected tools.
- An external HTTP probe of https://www.moretegra.com.br/ returned DNS resolution failure from this execution environment for robots, llms, ai and Mozae. This does NOT establish that the public site is down. `AI_FILES_PUBLIC_HTTP = NOT_VERIFIED`.
- No real GA/GSC/Bing crawl logs, public headers, IndexNow receipts, indexing status, AI citation rate or production HTTP body integrity were confirmed.
- Robots changes may require crawler reprocessing; do not claim immediate citations.

## Acceptance checklist (separate evidence)
1. HTTP 200 for canonical `/robots.txt`, `/llms.txt`, `/.well-known/ai.txt` and Mozae URL; text/plain UTF-8 for text files, no unexpected HTML fallbacks.
2. Confirm OpenAI search crawler permitted and GPTBot disallowed based on the live `robots.txt`; check CDN/WAF separately where possible.
3. Confirm crawl/indexation in Google Search Console and Bing Webmaster Tools for Mozae, not via submission of txt files as HTML landing pages.
4. Confirm Mozae CTA WhatsApp works on mobile, link opens correct number, Form 46 functional, content visible, JSON-LD remains consistent.
5. Anonymous test in separate clean sessions using same literal baseline query and queries for Mozae price and agent. Capture timestamp, model/product, source URLs and actual returned facts.
6. Record pass/unknown/fail and rollback sha per release; do not convert UNKNOWN into PASS.

## Next safe action
Review PR #404, #405 checks and mobile visual gate; merge only with appropriate approval. Then verify production SHA, HTTP headers and crawl access. Any new commercial contradiction must be validated by source before modification.

## PR #405 CI evidence (observed after first execution)

- PASS: Validate commercial page standard, onsite-address, coverage, images, canonical favicon, Open Graph/Twitter metadata.
- FAIL: `postal` at `scripts/validate-resf-v2-postal-address-contract.mjs:436` with `mozae-higienopolis: previously complete page visible/runtime HTML changed`; intentional edited lead paragraph is detected by immutable-page comparison. Do not bypass test or silently refresh baseline; requires governed targeted exception or snapshot update.
- FAIL: `validate` emitted errors for multiple other routes including Bem Moema CTA and regional maps, plus Mozae real map; cannot attribute all to the appended Sabrina paragraph. Determine whether pre-existing on main before accepting as waiver.
- PR #405 remains unmerged pending required CI resolution and visual/form acceptance. PR #404 must not be used to conceal this block.

## Operator HTTP smoke evidence — 2026-10-14 (PowerShell, USER_REPORTED)

Source: user-provided Windows PowerShell output, following `Invoke-WebRequest -Method Get` with final URL and Content-Type displayed. These are externally observed by the user, not independently executed by the assistant.

| URL | HTTP | Content-Type | Final URL |
| --- | --- | --- | --- |
| `https://www.moretegra.com.br/` | 200 | `text/html; charset=utf-8` | Same |
| `https://www.moretegra.com.br/robots.txt` | 200 | `text/plain; charset=utf-8` | Same |
| `https://www.moretegra.com.br/llms.txt` | 200 | `text/plain; charset=utf-8` | Same |
| `https://www.moretegra.com.br/.well-known/ai.txt` | 200 | `text/plain; charset=utf-8` | Same |
| `https://www.moretegra.com.br/sitemap.xml` | 200 | `application/xml` | Same |
| `https://www.moretegra.com.br/empreendimentos/mozae-higienopolis/` | 200 | `text/html; charset=utf-8` | Same |

Disposition: `PUBLIC_HTTP_STATUS_AND_MIME = USER_CONFIRMED_PASS_6_OF_6`. DNS connectivity works from the user's machine; assistant-side DNS failure must not be reported as evidence of site outage. Exact body comparison, AI file contents, bot crawling, 200 vs soft-404 body, and indexing **not yet certified**. Published `robots.txt` is the pre-PR #404 version unless a subsequent merge/deploy is observed; this test does not validate #404 bot rules. `PR #405` still requires CI and visual/mobile/form gates.
