# Product Authority Decision — Home Commercial State

Decision ID: PA-MNT-HOME-COMMERCIAL-TRUTH-2026-09-22

Date: 2026-09-22

Status: ACTIVE / DIRECT_PRODUCT_AUTHORITY_ASSERTION / INTERIM_COMMERCIAL_TRUTH

## 1. Authority decision

Product Authority explicitly authorizes the current commercial state of the MoreNumTegra Home to remain unchanged and to be treated as the current commercial truth of the Home until a governed update mechanism supersedes it.

Authoritative runtime surface:

~~~text
URL = https://www.moretegra.com.br/
effective runtime SHA = 124b620855175a583c528733462d6d0f4f44cd41
Home commercial source = src-greenn/moretegra.js
source blob SHA at current main = 772944f040f5b27fad836b95d3547589fd796524
decision timestamp = 2026-09-22
~~~

This is a direct Product Authority assertion. It is not inferred from Tegra/Setembro/Endomarket-Setembro.md.

## 2. Scope

The decision recertifies, for the MoreNumTegra Home surface, the commercial state already published at the effective runtime, including where present:

- price;
- old/comparative price;
- unit;
- area tied to the commercial object;
- price-per-square-meter narrative;
- price label;
- promotional label;
- inventory/availability wording;
- consult-only state;
- cash-condition wording;
- commercial disclaimers.

No current Home commercial value is changed by this decision.

## 3. ODE explicit disposition

The current Home card for ODE Perdizes is explicitly included in this recertification.

Therefore the currently published Home commercial object:

~~~text
unit = 22 / 2º andar
current price = R$ 2.090.000
comparative price = R$ 2.200.000
visible comparison = De R$ 2.200.000 por R$ 2.090.000
~~~

is recertified for the Home by this Product Authority decision.

This supersedes, prospectively for the Home surface, the earlier M3-04 restriction that treated the R$ 2.200.000 comparative as not recertified.

Historical M3-04 evidence is not rewritten; this decision is the newer authority record.

## 4. Cross-surface rule

Different MoreNumTegra surfaces may legitimately display different commercial objects for the same project when they refer to different units, payment conditions or governed offers.

Therefore:

~~~text
HOME UNIT/PRICE != EXACT-PROJECT UNIT/PRICE
~~~

does not by itself prove drift or error.

The Home state is authoritative for Home cards under this decision.

Existing exact-project commercial records remain authoritative for their own exact-project surfaces unless separately superseded.

## 5. Duration / supersession

This authority is intentionally transitional.

It remains in effect until one of these occurs:

1. Product Authority explicitly changes a Home commercial object;
2. a governed Commercial Data Plane snapshot is published and adopted by the Home consumer;
3. Product Authority revokes this decision.

There is no invented TTL.

## 6. Commercial update architecture objective

The current Home may remain visually/functionally unchanged while commercial ownership is migrated away from presentation code.

Target invariant:

~~~text
CURRENT HOME VALUES = PRESERVED
COMMERCIAL TRUTH OWNERSHIP != moretegra.js
SITE PRESENTATION != COMMERCIAL DATA STATE
PUBLIC READ != ADMIN WRITE
~~~

The next architecture work must create an auditable update mechanism capable of changing commercial values without editing Home HTML/CSS/JS for routine updates.

## 7. Boundaries

This decision:

- does not authorize inventing new prices;
- does not assert that the Home values are Tegra-wide evergreen truth outside MoreNumTegra;
- does not authorize FECH.AI integration;
- does not authorize a new backend/provider by itself;
- does not authorize paid media;
- does not mutate Production;
- does not change Form 46, Measurement, SEO ownership or canonical URLs.

## 8. M7-02 effect

The two P1 Product Truth findings recorded in docs/qa/MNT_M7_02_TECHNICAL_CONTENT_QA_2026-09-22.md are resolved by direct Product Authority authority:

~~~text
F01 = CLOSED_BY_PRODUCT_AUTHORITY_RECERTIFICATION
F02 = CLOSED_BY_PRODUCT_AUTHORITY_RECERTIFICATION
P0 = 0
P1 = 0
P2 = 2
P3 = 0
~~~

P2 residuals remain independently tracked.
