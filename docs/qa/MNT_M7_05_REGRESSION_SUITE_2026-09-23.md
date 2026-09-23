# M7-05 — Regression Suite

Date: 2026-09-23

Status: COMPLETE / ACCEPTED / EXACT_TREE_AND_PRODUCTION_SMOKE

## Exact-tree workflow evidence

Production runtime tree:

~~~text
runtime merge = 124b620855175a583c528733462d6d0f4f44cd41
tree = b40b9afb5b834b0fc0abdd32d3486f82198d0e9e
~~~

PR #231 tested head:

~~~text
head = 91735d13c702a32c4d14e6825fea9489374c1051
tree = b40b9afb5b834b0fc0abdd32d3486f82198d0e9e
~~~

Successful workflows on that exact tree:

~~~text
35765733743 — M5-06 CTA/Form journey — SUCCESS
35765733800 — M4-05R metadata validation — SUCCESS
35765733660 — Favicon standard validation — SUCCESS
35765733757 — Commercial page standard validation — SUCCESS
~~~

The CTA/Form workflow includes mobile/touch Playwright coverage in Chromium, Firefox and WebKit.

## Live Production regression

Observed on 2026-09-23:

~~~text
/ = 200 / self-canonical
/empreendimentos/capiitolo-piero-lissoni/ = 200 / self-canonical
/empreendimentos/caminhos-da-lapa-elo-duo/ = 200 / self-canonical
/empreendimentos/aria-higienopolis/ = 200 / self-canonical
~~~

Home, Elo Duo and Ária initial HTML expose the expected lead/WhatsApp surfaces.

CAPIITOLO initial wrapper does not contain the complete body by design. Its editorial source:

~~~text
/experiments/capiitolo-editorial-v3/index.html
~~~

returns 200 and contains Form 46, WhatsApp, H1 and visible FAQ. This preserves the previously classified P2 client-side-composition residual; it is not a new P1 regression.

Vercel runtime error query for the last 24h returned:

~~~text
No runtime errors found in the selected time range.
~~~

## Result

~~~text
P0 = 0
new P1 = 0
known P2 = 2
MNT-M7-05 = COMPLETE / ACCEPTED
accepted hours = 16
runtime mutation = 0
~~~
