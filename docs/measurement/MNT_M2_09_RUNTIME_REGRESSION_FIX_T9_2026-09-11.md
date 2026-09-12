# MNT-M2-09 — Runtime regression containment / delegated measurement T9

Date: 2026-09-11
Task: `MNT-M2-09`
PR: `#50`
Status: `ACTIVE / PARTIAL_IMPLEMENTED`

## Observed regression

During real Green runtime QA, the root-bound Measurement v1 continued to produce generic GTM `gtm.click` observations after the Green runtime replaced/recreated the current `[data-moretegra]` root. The replacement root did not carry `data-mnt-measurement-bound="true"`, so the original root-bound measurement listeners were no longer attached to the live root.

A first delegated-v2 correction accidentally removed the `INTEREST_GALLERIES` UI data block while replacing the measurement tail. That caused the interest-context flow to fail at gallery rendering. The branch was rolled back to the last functional artifact before the correction was rebuilt.

## Corrected construction

Functional UI baseline used for the correction:

`0ab0de22e2d69bff4b127c2db7f24a1744ea5187`

The corrected `src-greenn/moretegra.js` preserves the UI/runtime prefix byte-for-byte through the end of the application IIFE and changes only the Measurement section beginning at the MNT-M2-09 marker. GitHub commit diff for the corrected artifact starts at line 823, after the UI runtime.

Measurement v2 uses delegated listeners on `document` for click/change/input so Green DOM replacement does not require per-root rebinding. It remains:

- exact-host guarded to `moretegra.com.br`;
- dataLayer-only;
- allowlisted parameters only;
- no raw catalogue search text;
- no visitor PII;
- no direct `gtag()` or `fbq()`;
- no form/lead events in this slice.

## Structural prevention

Measurement source is isolated in:

`src-greenn/modules/moretegra.measurement.js`

The single Green release artifact remains:

`src-greenn/moretegra.js`

Deterministic build and verification gates:

```bash
node scripts/build-moretegra-release.mjs
node scripts/verify-moretegra-release.mjs
node --check src-greenn/moretegra.js
```

The verifier fails a measurement-only release if:

- the UI/runtime prefix drifts from the accepted UI baseline;
- the release measurement tail differs from the source measurement module;
- the interest gallery / interest-context markers disappear;
- forbidden form/lead events or direct vendor calls appear;
- JavaScript syntax does not parse.

This preserves ADR-001's one Green page-level JavaScript payload while separating Measurement source from the UI/runtime change surface.

## Runtime boundary

This commit does not itself prove Green production behavior. The corrected artifact still requires owner publication into Green and a fresh Tag Assistant real-source test before MNT-M2-09 can be considered ready for a later publication/acceptance gate.

No GTM Submit/Publish, form/lead instrumentation, Meta, Ads, Vercel Production, DNS or Search Console mutation is included here.
