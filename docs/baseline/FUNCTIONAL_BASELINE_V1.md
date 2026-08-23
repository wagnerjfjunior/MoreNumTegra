# MoreNumTegra — Functional Baseline V1

- Status: `CANDIDATE_IN_PR` until integrated in `main`; `CANONICAL_V1` when present in resolved `main`
- Date: `2026-08-23`
- Repository: `wagnerjfjunior/MoreNumTegra`
- Baseline class: functional/product requirements only
- Implementation authority: **none granted by this document**

## 1. Purpose

This baseline converts the currently confirmed MoreNumTegra product intent into a versioned, auditable functional contract before architecture, code, deploy or external integrations are chosen.

It is intentionally solution-agnostic. Technology, framework, hosting, backend, CRM integration, analytics implementation and production deployment remain separate decisions.

## 2. Source model and confidence

### 2.1 Canonical repository evidence

The repository baseline preceding this document establishes only:

- project name: `MoreNumTegra`;
- short description in `README.md`: `More em um Tegra`;
- GitHub `main` as integrated canonical state through the SFJM onboarding documents.

### 2.2 User-provided product directives — 2026-08-23

The following requirements were explicitly provided by the project owner in the MoreNumTegra work context and are being canonicalized here:

- Tegra brand yellow must use `#EBB92E`;
- Tegra logo should use the transparent asset supplied by the owner: `https://s3-gdigital.s3.amazonaws.com/gdigital/313/Logo_Tegra_Amarelo%20666X375%20SemFundo.webp`;
- the existing favicon concept may be preserved, with its yellow aligned to `#EBB92E`;
- a lead form is required at the end of the page, while its submission/integration contract remains undecided;
- the owner reports that more than 90% of traffic is mobile; this is a user-reported operating fact, not an independently measured repository metric;
- mobile loading performance and LCP are explicit priorities;
- the current video/media behavior was reported as not working;
- zoning/location selectors, development-stage selectors and related upper-page buttons were reported as not functioning correctly on mobile;
- development cards expose stage labels such as `Pronto para Morar`, `Em construção` and `Lançamento`;
- stage indicators should become more visually salient while remaining compatible with a sober premium presentation;
- floating `WhatsApp` and `Receber condições` actions were reported as functioning well and should be preserved unless a later decision supersedes them.

These product-owner statements are authoritative as requirements once this baseline is integrated, but statements about current behavior remain **user-reported** until independently verified against an implementation snapshot.

## 3. Product objective

MoreNumTegra is a Tegra-branded real-estate discovery and conversion experience intended to help prospective customers:

1. discover available developments;
2. narrow the offer using meaningful selectors such as zoning/location and development stage;
3. quickly understand the stage of each development;
4. engage with a sales/contact channel through prominent conversion actions;
5. submit interest through an end-of-page lead form once the data/integration contract is authorized.

The baseline does not yet declare whether the long-term product is a single landing page, a multi-page portal or a broader catalog platform. The initial functional contract applies to the current experience without forcing that architecture decision.

## 4. Primary audience and usage posture

### 4.1 Primary audience

Prospective buyers or interested users evaluating Tegra developments through web/mobile access.

### 4.2 Mobile posture

The project owner reports `>90%` mobile traffic. Therefore:

- mobile is the primary interaction context for functional acceptance;
- desktop compatibility remains required but cannot be used to excuse broken mobile behavior;
- controls, cards, CTAs, forms and media must be usable without hover-only interaction;
- no functional requirement may be considered complete solely because it works on desktop.

The `>90%` value must not be presented externally as independently measured analytics until a measurement source is integrated.

## 5. Core user journeys

### J-01 — Discover developments

User lands on the experience and can understand that it presents Tegra developments and can browse the available offer without encountering broken primary content.

### J-02 — Filter the offer

User can interact with zoning/location and development-stage selectors on mobile and receive a coherent filtered result.

### J-03 — Understand development stage

User can identify the stage of a development from its card without opening another surface.

Canonical stage labels currently known:

- `Pronto para Morar`;
- `Em construção`;
- `Lançamento`.

Additional statuses require explicit future canonicalization.

### J-04 — Request contact/conditions

User can access persistent/high-visibility conversion actions, including:

- `WhatsApp`;
- `Receber condições`.

The exact destination, tracking and data contract remain implementation decisions and must be verified before production use.

### J-05 — Submit interest form

User reaches a lead form at the end of the page.

The form's fields, validation, destination, consent language, CRM routing, retention and privacy behavior are intentionally **not yet defined**. The form may not be connected to real data processing merely because its placement is now a functional requirement.

## 6. Functional requirements

| ID | Requirement | Priority | Current evidence/state |
|---|---|---:|---|
| `FR-001` | Present a Tegra-branded development discovery experience. | Must | owner directive + repository identity |
| `FR-002` | Render the official Tegra visual identity using yellow `#EBB92E`. | Must | owner directive |
| `FR-003` | Use the owner-supplied transparent Tegra logo asset unless superseded by a later approved asset. | Must | owner directive |
| `FR-004` | Preserve the favicon concept while aligning its yellow to `#EBB92E`. | Should | owner directive |
| `FR-005` | Provide zoning/location filtering usable on mobile. | Must | owner directive; current mobile behavior reported defective |
| `FR-006` | Provide development-stage filtering usable on mobile. | Must | owner directive; current mobile behavior reported defective |
| `FR-007` | Ensure upper-page navigation/filter buttons required for browsing are operable on mobile. | Must | current mobile behavior reported defective |
| `FR-008` | Show development-stage badges directly on development cards. | Must | current experience described by owner |
| `FR-009` | Stage badges must be more visually salient than the current reported presentation while remaining appropriate to a premium/sober brand. | Should | owner directive |
| `FR-010` | Preserve floating `WhatsApp` and `Receber condições` conversion actions unless superseded by a later decision. | Must | owner reports current behavior as good |
| `FR-011` | Provide an end-of-page lead form surface. | Must | owner directive |
| `FR-012` | Do not expose a visibly broken video/media experience. If the media asset cannot load reliably, the implementation must fail gracefully or use an approved fallback. | Must | owner reports current video as not working |
| `FR-013` | Mobile interaction must not depend on hover-only states. | Must | derived directly from mobile-primary requirement |
| `FR-014` | Filtering or CTA interactions must produce visible user feedback and must not appear inert. | Must | required to close the reported mobile failures |

## 7. Non-functional requirements

### NFR-01 — Mobile-first functional acceptance

Primary acceptance is performed on mobile viewport/device behavior before desktop polish is treated as sufficient.

### NFR-02 — Performance

Fast loading is a first-class requirement. LCP is explicitly identified by the owner as a priority.

No numeric LCP/performance budget is canonical yet. A later technical baseline must define measurable targets before production acceptance.

The owner also referred to `NCP`; because that metric name is not sufficiently defined in the current evidence, this baseline does **not** silently reinterpret it as another metric. The intended metric must be clarified or superseded in the technical baseline.

### NFR-03 — Resilience of primary media

A failed video/media asset must not block discovery, filtering or conversion journeys.

### NFR-04 — SEO readiness

The project is intended to support web discovery/SEO work, but this baseline does not invent keyword strategy, schema markup, canonical URLs, sitemap rules, content architecture or indexation policy. Those require a dedicated SEO/content decision or technical baseline.

### NFR-05 — Accessibility

No detailed accessibility conformance target has yet been authorized/canonicalized. The implementation must not deliberately introduce inaccessible interaction patterns, but a formal WCAG target remains pending.

### NFR-06 — Privacy and lead data

No lead-processing integration may go live until the form data contract, consent/privacy requirements, destination, retention and access boundaries are explicitly defined.

## 8. Brand baseline

| Element | Canonical requirement |
|---|---|
| Primary Tegra yellow | `#EBB92E` |
| Logo | owner-supplied transparent Tegra logo asset listed in section 2.2 |
| Favicon | preserve current concept; align yellow to `#EBB92E` |
| Stage badges | visually stronger than current reported state; exact palette remains a UI implementation decision |
| Overall visual posture | sober/premium; do not trade clarity for low-contrast status communication |

No broader design system, typography scale, spacing system or component library is canonicalized by this baseline.

## 9. Current known defects to be verified when implementation enters GitHub

These are **user-reported defects**, not independently reproduced in this repository because the repository did not contain an implementation snapshot when the baseline was created:

1. video/media did not work;
2. zoning/location selectors did not work correctly on mobile;
3. development-stage selector did not work correctly on mobile;
4. related top controls/buttons did not work correctly on mobile;
5. stage badges were considered insufficiently salient.

Positive behavior to preserve, also user-reported:

- floating `WhatsApp` badge/action works well;
- floating `Receber condições` badge/action works well.

When code is later introduced, each item must be reclassified from `USER_REPORTED` to a reproducible technical state before declaring it fixed.

## 10. Acceptance criteria for a future implementation

This section defines functional acceptance intent, not authorization to implement.

A candidate implementation cannot be considered functionally acceptable unless:

- Tegra yellow is `#EBB92E` in the brand elements governed by this baseline;
- the approved transparent logo renders without an unintended opaque background;
- mobile users can operate zoning/location and development-stage filtering;
- required upper-page controls are actionable on mobile;
- development-stage badges are visible and semantically understandable;
- `WhatsApp` and `Receber condições` CTAs remain accessible or are superseded by an explicit approved decision;
- an end-of-page form surface exists when the data-processing contract is ready for implementation;
- no broken video/player is exposed as required primary content;
- primary discovery and conversion remain usable if optional media fails;
- no real lead data is transmitted without an authorized privacy/integration contract;
- a technical performance gate including measurable LCP targets exists before production acceptance.

## 11. Explicitly unresolved decisions

The following are **not decided** by this baseline:

- application framework or runtime;
- static vs server-rendered vs hybrid architecture;
- hosting/Vercel project;
- domain/DNS;
- CMS or source of development inventory;
- backend/database;
- form fields and lead validation contract;
- WhatsApp destination/account ownership verification;
- CRM integration;
- analytics, pixels or tag manager;
- consent management and privacy text;
- SEO keyword map/content cluster/schema strategy;
- numeric Core Web Vitals/performance budgets;
- formal accessibility target;
- automated test stack;
- production release process.

Absence of a decision is not permission to choose by inference.

## 12. Out of scope for this baseline PR

- any application code;
- CSS/HTML/JavaScript implementation;
- migration of an existing site snapshot;
- Vercel/hosting setup;
- domain or DNS changes;
- real form submission;
- CRM/WhatsApp/analytics integration changes;
- campaigns or ads;
- credentials or secrets;
- production deployment.

## 13. Change control

When integrated in `main`, this is `FUNCTIONAL_BASELINE_V1`.

Future changes must distinguish:

- correction of an incorrectly recorded requirement;
- additive requirement;
- superseding product decision;
- implementation detail that does not alter the functional contract.

Do not rewrite this baseline merely because a PR merged, a SHA advanced or an implementation detail changed without modifying product meaning.
