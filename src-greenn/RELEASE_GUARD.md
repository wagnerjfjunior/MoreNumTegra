# Green JavaScript release guard

`src-greenn/moretegra.js` remains the **single JavaScript payload copied to the Green Sales main page**, as required by ADR-001.

The runtime tail is isolated into project-owned modules:

- `src-greenn/modules/moretegra.measurement.js` — semantic measurement events, including Form 46 start/submit-attempt observation;
- `src-greenn/modules/moretegra.lead-journey.js` — opaque Form 46 lead-journey state (`event_id`, `lead_token`, timestamp) with no visitor PII.

The production artifact is assembled deterministically with:

```bash
node scripts/build-moretegra-release.mjs
node scripts/verify-moretegra-release.mjs
node --check src-greenn/moretegra.js
```

The dedicated Green thank-you page uses separate page-owned sources:

- `src-greenn/thank-you/obrigado.html`;
- `src-greenn/thank-you/obrigado.css`;
- `src-greenn/thank-you/obrigado.js`.

## Guard contract

For the current MNT-M2-09 Form 46 increment:

1. the UI/runtime prefix of `src-greenn/moretegra.js` must remain byte-for-byte equal to the accepted UI baseline;
2. the release tail must equal `moretegra.measurement.js` + `moretegra.lead-journey.js` in that order;
3. the interest-gallery contract and critical conversion UI markers must remain present;
4. `mnt_form_start` and `mnt_form_submit_attempt` are authorized source events; neither is a conversion;
5. `mnt_lead_success` is emitted only by the dedicated `/obrigado` page after a fresh armed Form 46 journey; direct thank-you access, refresh/back and stale state must not manufacture a lead;
6. no ordinary analytics payload may contain name, email, phone or raw form-field values;
7. direct `gtag(` and direct `fbq(` remain forbidden in project source;
8. JavaScript syntax must parse before any Green publication;
9. Green main page receives only the assembled `src-greenn/moretegra.js`, never the source modules separately;
10. Green page 294 receives the dedicated thank-you HTML/CSS/JS, not the main-page runtime.

Current measurement-only UI baseline ref used by the guard:

`0ab0de22e2d69bff4b127c2db7f24a1744ea5187`

An intentional main-page UI/product change must establish a new accepted UI baseline under its own functional review; a measurement task must not silently update this baseline.
