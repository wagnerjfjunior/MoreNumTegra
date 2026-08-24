# MoreNumTegra — Functional Baseline V2

- Status: `CANDIDATE_IN_PR` until integrated in `main`; `CANONICAL_V2` when present in resolved `main`
- Date: `2026-08-23`
- Repository: `wagnerjfjunior/MoreNumTegra`
- Supersedes: `docs/baseline/FUNCTIONAL_BASELINE_V1.md`
- Baseline class: functional/product requirements

## 1. Purpose

Preserve the V1 discovery/conversion requirements and canonicalize the subsequent project-owner decisions required for the Greenn production flow, lead form and SEO posture.

## 2. Product objective

MoreNumTegra is a Tegra-branded, mobile-first real-estate discovery and conversion experience intended to:

1. present verified Tegra developments;
2. allow filtering by location/zone and development stage;
3. make development stage immediately understandable;
4. preserve high-visibility conversion actions;
5. capture lead interest through the verified Greenn Form 46;
6. support organic discovery through technically sound, factual SEO content;
7. remain fast and usable on mobile.

The owner-reported `>90% mobile traffic` remains USER_REPORTED until analytics independently verifies it.

## 3. Brand requirements

- primary Tegra yellow: `#EBB92E`;
- transparent yellow Tegra logo: `https://s3-gdigital.s3.amazonaws.com/gdigital/313/Logo_Tegra_Amarelo%20666X375%20SemFundo.webp`;
- gray logo: `https://s3-gdigital.s3.amazonaws.com/gdigital/313/Logo_Tegra_Cinza.webp`;
- do not replace the official logo with a generic `T`;
- favicon concept may be preserved with yellow aligned to `#EBB92E`;
- overall presentation: sober/premium with adequate contrast and clear status communication.

## 4. Core journeys

### J-01 — Discover developments

The user can understand the page purpose and browse verified developments without broken primary content.

### J-02 — Filter offer

The user can filter by location/zone and development stage on mobile, including combined filtering and visible empty-result feedback.

### J-03 — Understand stage

Known stage labels:

- `Pronto para Morar`;
- `Em construção`;
- `Lançamento`.

Badges must be visible on mobile and more salient than the previously reported version while preserving premium visual posture.

### J-04 — Convert through CTA

Preserve:

- floating `WhatsApp`;
- `Receber condições`.

The final WhatsApp destination must not be invented and remains subject to verification.

### J-05 — Submit lead

The user can submit interest through the Greenn V1 form with:

- `nome`;
- `email`;
- `telefone`.

Verified form contract:

- tenant_id: `313`
- form_id: `46`
- title: `MoreEmUmTegra`
- endpoint observed from embed: `POST https://back.gdigital.com.br/form/register`

The form must provide validation, loading, duplicate-submit prevention, success, application error and network error feedback.

No secret/token may be exposed in client-delivered code. If the live contract later requires a secret, the current integration must stop until architecture is revised.

## 5. Functional requirements

| ID | Requirement | Priority |
|---|---|---:|
| FR-001 | Present a Tegra-branded development discovery experience. | Must |
| FR-002 | Use `#EBB92E` in governed Tegra brand elements. | Must |
| FR-003 | Use the approved official Tegra logo asset; no generic `T`. | Must |
| FR-004 | Keep the favicon concept aligned to `#EBB92E`. | Should |
| FR-005 | Provide location/zone filtering usable by touch on mobile. | Must |
| FR-006 | Provide development-stage filtering usable by touch on mobile. | Must |
| FR-007 | Required top controls/buttons must work on mobile without hover dependency. | Must |
| FR-008 | Show stage badges directly on cards. | Must |
| FR-009 | Make stage badges visually salient and textually understandable. | Must |
| FR-010 | Preserve floating WhatsApp and `Receber condições` actions unless superseded. | Must |
| FR-011 | Provide the end-of-page Greenn Form 46 lead form. | Must |
| FR-012 | Validate `nome`, `email` and `telefone` before submit. | Must |
| FR-013 | Show `Enviando...`/loading feedback and prevent duplicate submissions. | Must |
| FR-014 | Show success, server/application error and network failure states. | Must |
| FR-015 | Optional video/media failure must not break catalog/filter/CTA journeys. | Must |
| FR-016 | Filtering/CTA interactions must show visible state/feedback and never appear inert. | Must |
| FR-017 | Only verified inventory/commercial facts may be shown. | Must |
| FR-018 | SEO-visible content must be factual, indexable and structurally semantic. | Must |

## 6. SEO product requirements

SEO is a V1 structural requirement.

Where content exists and is verified, support:

- descriptive title/meta description;
- semantic H1/H2/H3 hierarchy;
- textual content about verified locations/bairros, stages and differentiators;
- real internal links only;
- meaningful image alt text;
- visible factual FAQ when used;
- structured data only when the corresponding visible facts are verified.

`jordanacyrela.com.br/capri` may be used only as strategic reference. Do not copy its content.

Do not invent price, address, metragem, availability or features and do not use keyword stuffing.

## 7. Mobile/performance acceptance

Mobile is the first functional acceptance path.

Targets defined by the technical baseline:

- LCP <= 2.5 s;
- INP <= 200 ms;
- CLS <= 0.1.

Primary controls must not depend on hover.

## 8. Media resilience

- video is non-critical;
- a failed video/player cannot block browsing/filtering/conversion;
- use approved fallback/poster when appropriate;
- below-the-fold media should not penalize first load unnecessarily.

## 9. Data/inventory integrity

Do not invent missing development facts.

Typical data fields may include only when verified:

- name/slug;
- bairro/location;
- region/zone;
- stage;
- metragem;
- image/media reference;
- approved URL;
- highlights.

## 10. Deferred/out-of-scope product integrations

Require separate authorization/decision:

- FECH.AI integration;
- n8n/Make automation;
- Meta/Google Ads integration;
- analytics/pixels/tags;
- CMS/database expansion;
- unverified WhatsApp destination;
- custom domain/DNS changes;
- material new routes/product areas.

## 11. Acceptance summary

A V1 candidate is not functionally acceptable unless:

- official Tegra identity is correct;
- mobile filters work and can be combined/reset;
- badges are readable;
- CTAs are operable;
- Form 46 validates and exposes all required states without secrets in the client;
- optional media failure is graceful;
- primary SEO content is semantic and factual;
- unverified commercial claims are absent;
- mobile performance targets are evaluated before production publication.

## 12. Change control

FUNCTIONAL_BASELINE_V2 supersedes V1 because the form/lead and SEO requirements became materially more specific after V1 integration.

Future changes must distinguish correction, additive requirement, superseding product decision and implementation detail.
