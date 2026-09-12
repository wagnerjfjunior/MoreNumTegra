# Green JavaScript release guard

Green Sales exposes one `JavaScript Customizado` slot per page. Therefore every Green page must have **one complete, paste-ready JavaScript artifact** in GitHub.

For the commercial home / page 292:

`src-greenn/moretegra.js` is the **single complete JavaScript payload copied to Green**, as required by ADR-001.

Development/runtime concerns may remain isolated in project-owned source modules:

- `src-greenn/modules/moretegra.measurement.js` — semantic measurement events, including Form 46 start/submit-attempt observation;
- `src-greenn/modules/moretegra.lead-journey.js` — timestamp-only Form 46 pending-lead guard with no visitor PII.

These modules are development sources only. **They are never pasted individually into Green.** Before any Green publication they must be assembled into the single `src-greenn/moretegra.js` artifact.

The production artifact is assembled deterministically with:

```bash
node scripts/build-moretegra-release.mjs
node scripts/verify-moretegra-release.mjs
node --check src-greenn/moretegra.js
```

For Green page 294, the separate page-owned paste-ready artifact is:

- HTML: `src-greenn/thank-you/obrigado.html`;
- CSS: `src-greenn/thank-you/obrigado.css`;
- JavaScript Customizado: `src-greenn/thank-you/obrigado.js`.

The existence of two JavaScript files across the repository does **not** mean two scripts are pasted into one Green page. Each Green page receives exactly one complete JavaScript payload in its own single slot.

## Guard contract

For the current MNT-M2-09 Form 46 increment:

1. the UI/runtime prefix of `src-greenn/moretegra.js` must remain byte-for-byte equal to the accepted UI baseline;
2. the release tail must equal `moretegra.measurement.js` + `moretegra.lead-journey.js` in that order;
3. the interest-gallery contract and critical conversion UI markers must remain present;
4. `mnt_form_start` and `mnt_form_submit_attempt` are authorized source events; neither is a conversion;
5. the main-page lead guard stores only `mnt.lead.pending.v1 = Date.now()` in `sessionStorage` after a verified click on the Green Form 46 submit button with a valid native form;
6. the lead guard must not prevent, replace or intercept Green's native submission lifecycle;
7. `mnt_lead_success` is emitted only on `/obrigado` when that pending timestamp exists and is no older than 10 minutes; the timestamp is consumed before the event is pushed;
8. direct thank-you access, refresh/back without a new submit and stale pending state must not manufacture a lead;
9. no project Measurement payload may contain visitor name, email, phone or raw form-field values;
10. direct `gtag(` and direct `fbq(` remain forbidden in project source;
11. JavaScript syntax must parse before any Green publication;
12. Green page 292 receives only the assembled `src-greenn/moretegra.js`, never the source modules separately;
13. Green page 294 receives only its dedicated `src-greenn/thank-you/obrigado.js` in that page's JavaScript slot.

`mnt_event_id` remains part of the canonical MNT semantic-event envelope required by MNT-M2-03. It is generated only when an event is emitted and is **not** persisted as lead state. No `lead_token` is used by this V1 implementation.

The vendor mapping target for the verified lead remains separate from the source taxonomy:

```text
mnt_lead_success -> GA4 generate_lead
```

Current measurement-only UI baseline ref used by the guard:

`0ab0de22e2d69bff4b127c2db7f24a1744ea5187`

An intentional main-page UI/product change must establish a new accepted UI baseline under its own functional review; a measurement task must not silently update this baseline.
