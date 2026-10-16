# Órbita — Form46 unit context correction — 2026-10-16

Authority: user “siga” following the bounded correction identified in post-release QA. Base main: 577c87641c71765d43d501da1944ba77444cc948. Production observed before change: 6bffd089ee3cf7b5da6ea5cee8013e2f26567fa8 / dpl_33MEpNw9UHJ9xQCaG5nFuXR5eefx / READY. QA/SFJM documentary PR #420 remains separate and unmerged at preflight.

## Change
The selector stores an allowlisted unit ID in form.dataset.leadUnit instead of rewriting an intent option. Shared composeLeadContext includes project, optional unit, then intent in texto-livre. Existing forms without a unit retain their prior context. Measurement project/offer classification does not consume leadUnit. No new PII or unit payload is added to dataLayer. Prices, approved design, schema, Form46 endpoint/IDs and thank-you semantics stay intact.

Example: Universo Tatuapé Órbita | Unidade 1305 | Agendar visita.

## Validation
- validate-orbita-unit-form-context.mjs: PASS, 30 unit/intent transitions across two deep links and invalid-query fallback; unit changes retain chosen intent; context for non-unit forms and measurement offer unchanged. Executes source functions and inline selector in a VM with DOM doubles; not a browser/CRM test. No network requests.
- validate-orbita-commercial-schema-parity.mjs: PASS.
- validate-m5-06-cta-form-journey.mjs: PASS (static).
- node --check shared runtime and git diff --check: PASS.
- Existing Órbita workflow now runs the unit-context regression check and also watches shared runtime changes.

Browser validation on the corrected exact head, actual Form46 POST/CRM, physical touch, first-click anomaly, field performance and indexation remain pending. No real lead was sent and no merge/release is claimed. PR #420 qualifies earlier empty-form evidence as PARTIAL and preserves queued search-image work.

## Next / rollback
Run exact-head CI and browser/Live Sync matrix (both units x all five intents, including changing unit after selecting intent). Authorize merge/release separately; then resolve production SHA and validate without lead before any authorized CRM test. If needed, revert this correction via its own PR; no forced reset. Original #418 rollback remains independent and preserved. This record does not certify full RESF acceptance.
