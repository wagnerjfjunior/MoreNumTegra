# SFJM — Órbita post-release QA — 2026-10-16

## Authority and live state
User requested resumption from SFJM and pending mobile, Form 46 and SEO/HTTP tests. This slice is QA/documentation only; no runtime changes, real lead, merge or release.

- Observed GitHub main: `577c87641c71765d43d501da1944ba77444cc948` (PR #419 documentation).
- PR #418 merged runtime: `6bffd089ee3cf7b5da6ea5cee8013e2f26567fa8`.
- Production resolved via Vercel get_deployment on `www.moretegra.com.br`: `dpl_33MEpNw9UHJ9xQCaG5nFuXR5eefx`, target production, READY, source SHA equal to #418, canonical alias present.
- Main and production differ legitimately because #419 is docs-only.
- Existing acceptance: `docs/sfjm/MNT_ORBITA_PR418_PRODUCTION_ACCEPTANCE_2026-10-16.md`.

## Executed evidence
| Check | Result | Method / limits |
|---|---|---|
| Home, exact page, 2408 + UTM, 1305 + UTM | PASS | Independent HTTP GET, 200, HTML UTF-8 |
| Served exact-project HTML vs main | PASS | Byte equality for base and both query variants |
| Canonical / robots / H1 | PASS | Query-free canonical, index,follow,max-image-preview:large; one H1; no X-Robots-Tag noindex observed |
| JSON-LD / FAQ | PASS | JSON parsed; 12 visible FAQ and 12 schema questions/answers identical; Offer reference 2408 / 540000.00 preserved by design |
| robots.txt / sitemap.xml | PASS | GET 200; robots allows crawling and advertises canonical sitemap; sitemap includes exact Órbita URL |
| Apex query preservation | PASS (final destination) | GET followed redirect to www with unit=1305 preserved; redirect status not captured by this GET harness |
| Responsive selector | PASS (bounded) | Connected Chrome at 390x844 and 360x800; no document horizontal overflow observed; selector targets approximately 347x50.8 CSS px at 390 |
| 1305 direct link and alternating 2408/1305 | PASS | Visible unit/price and aria-pressed updated; default intent value tracked selected unit |
| 2408 direct link | PASS | At 360x800, selected 2408 / R$ 540.000 |
| CTA to form | PASS (bounded) | Conditions link targets #formulario and was operable |
| Empty form validation | PASS | Visible “Informe seu nome.”; focus mt-lead-name; name/email/phone aria-invalid=true |
| Other intent retains unit | FAIL | With 1305 selected, selecting Agendar atendimento changed texto-livre to Agendar visita, without unit |
| WhatsApp destination | PASS (DOM only) | Approved wa.me/5511960779328; location and project messages inspected, no message sent; unit not included in generic message |
| Commercial schema validator | PASS | node scripts/validate-orbita-commercial-schema-parity.mjs after fetching required historical baseline |

## Confirmed finding — unit lost outside default intent
The inline selector updates only the first “Condições e disponibilidade” option. Other choices retain values such as “Agendar visita”. Shared runtime composeLeadContext concatenates project + selected intent; payload texto-livre is derived from that context. Thus the selected unit is absent when choosing another intent. Reproduced in production DOM; CRM delivery was not attempted.

Recommended bounded correction: retain unit independently of the intent and compose both into the Form46 context for every intent, without adding PII to measurement, changing prices, replacing layout, or reconstructing the selector. Validate both units x all five intents and selector changes after choosing an intent, using no real lead. Any runtime patch remains a separate governed PR and release gate.

## SFJM drift
PR #419 review identified stale structured pointers. Live reads confirmed CURRENT_PROGRAM_STATE.current_execution, PROJECT_READ_MODEL.current and PROGRAM_TASK_GRAPH.current still referred to 2026-10-06 / search-image work, while textual pointers identify Órbita QA. This documentary slice reconciles those current fields and priority workstreams. Historical metrics, RESF accepted/deferred hours and paid-media restrictions remain historical; they do not certify this slice.

## Not verified
Physical-device touch, cross-browser matrix, complete Home mobile card/filter journey, successful Form46 POST/CRM persistence, loading/duplicate submit/network/server error behavior, conversion delivery, Lighthouse, field CWV/INP, Google Rich Results and indexation remain NOT_VERIFIED. No real lead was sent. Responsive browser clicks are not physical-touch proof. The first empty-form click produced no error; a subsequent click produced the expected validation; no conclusion about its cause is asserted.

## Next safe action and rollback
Prepare the bounded unit-context correction, validate non-submitting behavior, then obtain the existing release gates before merge. Continue remaining mobile Home/WhatsApp/form states separately. Do not mark RESF fully certified. Production remains #418. Existing rollback is a PR reverting `6bffd089ee3cf7b5da6ea5cee8013e2f26567fa8` after impact analysis, never force-reset main. This docs-only change has no runtime effect and may be reverted independently.
