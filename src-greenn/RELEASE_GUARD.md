# Green JavaScript release guard

`src-greenn/moretegra.js` remains the **single JavaScript payload copied to Green Sales**, as required by ADR-001.

To prevent tracking-only work from damaging the UI/runtime again, measurement source is isolated in:

`src-greenn/modules/moretegra.measurement.js`

The production artifact is assembled deterministically with:

```bash
node scripts/build-moretegra-release.mjs
node scripts/verify-moretegra-release.mjs
node --check src-greenn/moretegra.js
```

## Guard contract

For a measurement-only change:

1. the UI/runtime prefix of `src-greenn/moretegra.js` must remain byte-for-byte equal to the accepted UI baseline;
2. the measurement tail in the Green artifact must equal `src-greenn/modules/moretegra.measurement.js` exactly;
3. the interest-gallery contract and critical conversion UI markers must remain present;
4. `mnt_form_start`, `mnt_form_submit_attempt`, `mnt_lead_success`, direct `gtag(` and direct `fbq(` remain forbidden until separately authorized;
5. JavaScript syntax must parse before any Green publication;
6. Green receives only the assembled `src-greenn/moretegra.js`, never the module file separately.

Current measurement-only UI baseline ref used by the guard:

`0ab0de22e2d69bff4b127c2db7f24a1744ea5187`

An intentional UI/product change must establish a new accepted UI baseline under its own functional review; a measurement task must not silently update this baseline.
