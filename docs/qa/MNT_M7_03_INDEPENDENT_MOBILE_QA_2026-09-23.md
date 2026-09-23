# M7-03 — Independent Mobile QA

Date: 2026-09-23

Status: COMPLETE / ACCEPTED / EXACT_RUNTIME_TREE / EMULATED_TOUCH_MULTI_BROWSER

## Runtime identity

Production runtime:

~~~text
merge SHA = 124b620855175a583c528733462d6d0f4f44cd41
tree SHA = b40b9afb5b834b0fc0abdd32d3486f82198d0e9e
deployment = dpl_9xYzKZnnVM8qAKDEgnBNXCUvPv7C
state = READY
~~~

PR #231 exact tested head:

~~~text
head SHA = 91735d13c702a32c4d14e6825fea9489374c1051
tree SHA = b40b9afb5b834b0fc0abdd32d3486f82198d0e9e
~~~

The tested PR head and Production merge have the exact same Git tree.

## Mobile browser evidence

Workflow:

~~~text
M5-06 CTA/Form journey
run = 35765733743
job = 106874662809
conclusion = SUCCESS
~~~

The diagnostic uses:

~~~text
viewport = 393 x 852
hasTouch = true
locale = pt-BR
browsers = Chromium + Firefox + WebKit
~~~

Nine mobile/touch cases run in each browser:

1. Home -> Negociar meu cenário;
2. Home -> Receber condições;
3. Elo Duo -> Negociar condições;
4. Ária -> Agendar visita;
5. Ária -> Simular possibilidades de pagamento;
6. CAPIITOLO -> Receber condições;
7. CAPIITOLO -> Agendar visita;
8. Home Soma card -> interest context/gallery/form project context;
9. CAPIITOLO title/H1/canonical/search-variant rendering.

Observed result:

~~~text
Chromium = 9 PASS
Firefox = 9 PASS
WebKit = 9 PASS
total = 27 PASS / 0 FAIL
~~~

All interaction cases use Playwright tap semantics.

## Scope interpretation

This is browser-emulated mobile/touch QA, not a claim of physical-device testing.

The prior physical-device residual remains explicit:

~~~text
PHYSICAL_DEVICE = NOT_OBSERVED / RESIDUAL
~~~

No new P0/P1 finding was produced.

## Acceptance

~~~text
MNT-M7-03 = COMPLETE / ACCEPTED
accepted hours = 16
P0 = 0
P1 = 0
physical-device proof = NOT_OBSERVED
runtime mutation = 0
~~~
