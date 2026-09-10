# MNT-M2-02 — Transport Architecture & Duplicate-Event Prevention

- Project: `MoreNumTegra`
- Program: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Task: `MNT-M2-02 — Define transport architecture and duplicate-event prevention`
- Mode: `DESIGN_ONLY / NO_RUNTIME_MUTATION`
- Product Authority authorization: explicit start authorization in project conversation on `2026-09-10`
- Canonical main resolved before execution: `f0e89bfc159e7638347997b46290c919f2e5efc7`
- Subsequent main history-only cleanup commits do not change the project tree used by this design; branch was created from live `main` after cleanup.
- Inputs:
  - `docs/measurement/MNT_M2_01_TRACKING_RUNTIME_INVENTORY_2026-09-10.md`
  - `docs/measurement/MNT_M2_GTM_CONSENT_T1_2026-09-10.md`
  - `docs/adr/ADR-001-GREENN-BUILDER-MODULE-COMPOSITION.md`
  - `docs/BLOCKED_ACTIONS.md`
- Runtime mutation by this task: `NONE`
- Candidate state: `COMPLETE_CANDIDATE / PENDING_PR_LIFECYCLE`

## 1. Problem to solve

The platform already has two independent telemetry domains:

1. Green/GDigital platform telemetry, including `POST https://back.gdigital.com.br/page/view`;
2. project-owned Measurement, whose browser orchestration baseline is now GTM container `GTM-PGCR4R47`.

T0 captured a single navigation sequence that touched both `www.moretegra.com.br` and `moretegra.com.br` and produced two Green `/page/view` writes with distinct page IDs (`293` and `292`). This is a concrete duplicate-measurement risk for any future project-owned page/business event if project measurement is allowed to fire on both hostnames.

This task defines the transport boundary before GA4, Google Ads or Meta business measurement is expanded.

Preserve:

```text
GREEN_PLATFORM_TELEMETRY != PROJECT_BUSINESS_MEASUREMENT
GTM_CONTAINER_LOAD != BUSINESS_EVENT
CTA_CLICK != LEAD
FORM_POST != ANALYTICS_EVENT
YOUTUBE_TELEMETRY != MORENUMTEGRA_CONVERSION
WWW_ALIAS != CANONICAL_MEASUREMENT_HOST
```

## 2. Architecture decision

### 2.1 Project-owned browser dispatcher

`GTM-PGCR4R47` is the single project-owned browser dispatcher for future web Measurement destinations.

Do not add destination-specific browser SDKs directly into `src-greenn` unless a later architecture decision explicitly supersedes this contract.

Therefore, by default:

```text
NO direct gtag() calls from MoreNumTegra application code
NO direct GA4 script outside GTM
NO direct Google Ads conversion script outside GTM
NO direct fbq() / Meta Pixel bootstrap outside the later approved Meta path
NO duplicate destination tags in Green platform fields plus GTM
```

The existing GTM Consent Mode baseline is retained and must not be rebuilt merely to implement this architecture.

### 2.2 Platform telemetry boundary

Green/GDigital `/page/view` remains platform-owned telemetry.

Project Measurement must not:

- scrape Green `/page/view` requests and forward them to GA4/Ads/Meta;
- treat Green page IDs as canonical MoreNumTegra analytics page identifiers;
- treat Green `/page/view` as a lead/conversion;
- attempt to suppress or rewrite Green platform telemetry from MNT-M2-02.

Any future comparison between Green counts and GA4 counts is reconciliation/observability work, not transport coupling.

### 2.3 Canonical measurement host

The only project-owned Measurement-eligible production hostname is:

`moretegra.com.br`

`www.moretegra.com.br` is treated as an alias/noncanonical measurement host.

Future project-owned GA4/Ads/Meta business tags MUST include a canonical-host gate equivalent to:

```text
Page Hostname equals moretegra.com.br
```

On `www.moretegra.com.br`:

- project-owned business/page Measurement tags MUST NOT fire;
- consent-state infrastructure may initialize if technically required by the GTM baseline;
- the alias navigation may continue according to the existing platform/domain behavior;
- no project-owned page/business event is counted before canonical navigation.

This gate is the primary defense against the T0 `www -> non-www` double-count pattern without requiring an unauthorized DNS/platform redirect change.

## 3. Page-view ownership and dedup

### 3.1 One project page view per canonical document load

When GA4 is later implemented, MoreNumTegra will have exactly one project-owned `page_view` per eligible canonical document load.

The architecture requires controlled page-view ownership:

```text
CANONICAL_PAGE_VIEW_OWNER = GTM
CANONICAL_HOST = moretegra.com.br
MAX_PROJECT_PAGE_VIEW_PER_DOCUMENT_LOAD = 1
```

Recommended implementation contract for MNT-M2-09:

1. Google tag/GA4 configuration fires only on the canonical host;
2. automatic page-view behavior must be explicitly reviewed so it cannot coexist with a second manual page-view path;
3. if explicit `page_view` dispatch is chosen, automatic `send_page_view` must be disabled;
4. if automatic `page_view` is retained, no separate manual `page_view` tag may exist;
5. history/SPA page-view tracking stays disabled/not applicable until a real route model exists.

MNT-M2-02 does not choose a GA4 property or Measurement ID; that belongs to MNT-M2-05/MNT-M2-09.

### 3.2 Legitimate reload is not a duplicate

A new browser document load on the canonical host may legitimately generate a new page view.

Do not deduplicate separate reloads into one lifetime/session page view.

Duplicate prevention applies to multiple emissions for the same semantic action/document lifecycle, not to distinct user navigations.

## 4. Semantic event transport contract

Exact business event names are deferred to MNT-M2-03. Transport is fixed now.

Future MoreNumTegra interaction instrumentation must emit a single semantic event into the GTM data layer and let GTM route it to authorized destinations.

Conceptual flow:

```text
USER ACTION / VERIFIED APP STATE
-> one project-owned dataLayer event
-> GTM canonical-host + consent + event eligibility rules
-> authorized destination tags
```

Application code must not independently send the same semantic event to multiple vendor APIs.

This preserves one source event with multiple controlled destination adapters instead of multiple event origins.

## 5. Event identity / cross-destination correlation contract

Any event that may later feed more than one conversion destination must carry a project-generated event identifier created once for that semantic occurrence.

Reserved transport field:

`mnt_event_id`

Required semantics:

```text
ONE SEMANTIC OCCURRENCE -> ONE mnt_event_id
SAME OCCURRENCE ACROSS AUTHORIZED DESTINATION COPIES -> REUSE SAME mnt_event_id WHEN THE DESTINATION SUPPORTS SUCH CORRELATION/DEDUP
NEW USER OCCURRENCE -> NEW mnt_event_id
```

`mnt_event_id` is the project correlation identity. It does **not** imply that every vendor automatically deduplicates on that field. Destination-specific dedup semantics remain destination-specific.

This is especially important if a future Meta browser Pixel + CAPI path is authorized, because browser/server copies of the same Meta event can use the same event identity for Meta-native deduplication.

For GA4, this field must not be treated as a magic general-event dedup mechanism; GA4 page-view duplication is prevented by the single page-view ownership/path and canonical-host controls defined above, while destination-specific conversion dedup keys such as `transaction_id` apply only where semantically relevant.

MNT-M2-02 defines the project event identity/correlation contract only. It does not authorize Meta/CAPI, a backend or any vendor-specific server implementation.

## 6. Lead / Form 46 boundary

Production lead capture remains Green native Form 46.

Do not intercept or duplicate its native submission lifecycle.

Transport rules:

```text
CTA_CLICK != LEAD
FORM_FOCUS != LEAD
FORM_SUBMIT_ATTEMPT != LEAD
NETWORK_REQUEST_START != LEAD
ONLY VERIFIED SUCCESS MAY BECOME LEAD/CONVERSION
```

The native `POST /form/register` must not be duplicated by project code.

Before any `lead` conversion is implemented, MNT-M2-03/MNT-M2-04/MNT-M2-09 must identify a stable, observable Green success signal. If no stable success signal is proven, the project must not manufacture a lead conversion from a CTA or submit click.

## 7. YouTube / third-party telemetry boundary

Operational YouTube telemetry observed in T0 is not a source for MoreNumTegra business events.

Do not forward or reinterpret player `qoe`, `playback`, `watchtime`, `log_event` or similar third-party requests as project conversions.

If video-engagement measurement is later desired, it must be an explicit project-owned semantic event under the MNT-M2-03 taxonomy, not inferred from third-party network traffic.

## 8. Consent interaction with transport

The accepted GTM Consent Mode baseline remains authoritative:

```text
DEFAULT = denied all four
GREEN Continuar = granted all four
GREEN Cancelar = denied all four
PERSISTENCE = proven
```

MNT-M2-02 adds no new consent mutation.

Future destination tags must respect the canonical Consent Mode state and must not implement a second independent consent state machine.

Whether later Google tags operate in a basic or advanced consent transport posture must be explicitly documented during implementation/QA; it must not be inferred from the existence of Consent Mode alone.

## 9. Duplicate-prevention control matrix

| Risk | Control | Owner |
|---|---|---|
| `www -> non-www` counts two project page views | project Measurement tags only eligible on `moretegra.com.br` | GTM transport |
| automatic + manual GA4 page view | exactly one page-view owner/path; never both | MNT-M2-09 |
| direct vendor SDK + GTM sends same event | GTM is sole project-owned browser dispatcher | architecture |
| same UI handler emits twice | one dataLayer emission per semantic occurrence + project correlation identity | application instrumentation |
| click counted as lead before CRM acceptance | only verified Form 46 success can become lead | taxonomy/conversion implementation |
| Pixel + CAPI duplicate | reuse the same event identity across Meta browser/server copies if/when authorized | future Meta architecture |
| Green `/page/view` forwarded as business event | explicit platform/project telemetry separation | architecture |
| YouTube network telemetry counted as business event | explicit third-party media boundary | architecture |

## 10. Required QA scenarios before Measurement release

The implementation later produced from this architecture must prove at minimum:

1. direct `https://moretegra.com.br/` load -> exactly one project-owned page view;
2. `https://www.moretegra.com.br/` alias path -> zero project-owned page/business events on `www`, then at most one canonical page view after arrival on non-www;
3. canonical reload -> one new page view for the new document load, not two;
4. no duplicate automatic + manual GA4 page-view path;
5. one UI action -> one semantic dataLayer event / one `mnt_event_id`;
6. repeated intentional user action -> new semantic event / new `mnt_event_id`;
7. CTA/form submit attempt without verified success -> no lead conversion;
8. verified Form 46 success, once stable signal exists -> exactly one lead event;
9. YouTube telemetry -> no project business conversion;
10. denied/granted Consent Mode states remain intact while destination behavior is tested.

These are implementation/Measurement QA obligations. MNT-M2-02 itself performs no runtime mutation.

## 11. Explicit non-decisions / later tasks

MNT-M2-02 does not define:

- exact canonical event names/parameters -> MNT-M2-03;
- primary vs secondary conversions -> MNT-M2-04;
- GA4 property/Measurement ID and GTM/GA4 administrative ownership -> MNT-M2-05;
- Meta Pixel/Dataset ownership -> MNT-M2-06;
- additional GTM/GA4/Ads/Meta implementation -> MNT-M2-09;
- end-to-end release proof -> MNT-M2-10.

No DNS, Green, GTM, GA4, Meta, Ads, Vercel or Search Console mutation is authorized by this design document.

## 12. Exit criteria adjudication

MNT-M2-02 design exit criteria are satisfied at candidate level when this document is reviewed because it defines:

- telemetry ownership boundaries;
- canonical-host measurement eligibility;
- one-page-view ownership rule;
- vendor-dispatch ownership;
- semantic source-event transport;
- cross-destination correlation identity contract;
- Form 46 lead boundary;
- third-party media boundary;
- duplicate-prevention controls;
- implementation QA obligations;
- explicit deferred decisions.

Candidate lifecycle state:

`MNT-M2-02 = COMPLETE_CANDIDATE / PENDING_PR_LIFECYCLE`.

If accepted and merged, planned scope-equivalent progress becomes:

```text
accepted = 312h / 1240h
remaining = 928h
progress = 25.16%
```

After canonical acceptance, the next task candidate is:

`MNT-M2-03 — Define canonical event taxonomy`.

`MNT-M2-02 COMPLETE != MNT-M2-03 AUTHORIZED`.
