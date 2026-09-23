# M7-09 — Production Smoke

Date: 2026-09-23

Status: COMPLETE / ACCEPTED / PRODUCTION_SMOKE_PASS

## Runtime

~~~text
canonical host = https://www.moretegra.com.br/
runtime SHA = 124b620855175a583c528733462d6d0f4f44cd41
deployment = dpl_9xYzKZnnVM8qAKDEgnBNXCUvPv7C
state = READY
~~~

## Live route smoke

Observed:

~~~text
https://www.moretegra.com.br/ = 200
https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/ = 200
https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/ = 200
https://www.moretegra.com.br/empreendimentos/aria-higienopolis/ = 200
~~~

All four expose the expected self-canonical URL.

Home, Elo Duo and Ária expose the expected lead/WhatsApp commercial surfaces in the initial document.

CAPIITOLO editorial source:

~~~text
https://www.moretegra.com.br/experiments/capiitolo-editorial-v3/index.html
~~~

returns 200 and contains the expected Form 46, WhatsApp, H1 and FAQ content.

The CAPIITOLO initial-wrapper composition remains the known P2 residual.

## Runtime errors

Vercel runtime-error query over the latest 24h:

~~~text
No runtime errors found in the selected time range.
~~~

## Acceptance

~~~text
MNT-M7-09 = COMPLETE / ACCEPTED
accepted hours = 8
P0 = 0
P1 = 0
runtime mutation = 0
real lead submitted = NO
~~~
