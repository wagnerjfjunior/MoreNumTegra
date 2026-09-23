# M7-08 — Controlled Green Publication Re-adjudication

Date: 2026-09-23

Status: COMPLETE / ACCEPTED_BY_SUPERSESSION / NO_GREEN_WEB_PUBLICATION_REQUIRED

## Original task intent

The historical WBS retained a task named:

~~~text
MNT-M7-08 — Controlled Green publication
~~~

That name reflects the earlier V1 deployment model.

## Current canonical architecture

ADR-006 is ACCEPTED / CUTOVER_CERTIFIED and states:

~~~text
Vercel = MoreNumTegra commercial web production runtime
www.moretegra.com.br = canonical commercial host
Green Sales / GDigital = lead provider / CRM through Form 46
lp.moretegra.com.br = legacy/fallback surface
~~~

Therefore publishing the current website into Green would contradict the accepted production topology rather than complete it.

## Adjudication

M7-08 is satisfied by architecture supersession:

~~~text
GREEN_WEB_PUBLICATION = NOT_APPLICABLE
VERCEL_PRODUCTION = CANONICAL
GREEN_FORM46_BACKEND = PRESERVED
LEGACY_GREEN_FALLBACK = PRESERVED
ARTIFICIAL_GREEN_PUBLICATION = FORBIDDEN
~~~

No Green page/runtime mutation was executed.

This is analogous to a controlled release task being fulfilled by proving that its historical target is no longer the canonical publication target.

## Acceptance

~~~text
MNT-M7-08 = COMPLETE / ACCEPTED_BY_SUPERSESSION
accepted hours = 8
Green web publication performed = NO
Form 46 provider changed = NO
runtime mutation = 0
~~~
