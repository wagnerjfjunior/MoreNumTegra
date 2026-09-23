# M7-11 — GSC / GA4 / Ads Observation Window

Date: 2026-09-23

Status: COMPLETE / ACCEPTED / CURRENT_AVAILABLE_WINDOW / PAID_MEDIA_FROZEN

## Principle

This task records the data window actually available. It does not rename pre-release observations as post-release observations and does not infer causality.

## GA4 — current available window

Property:

~~~text
553742649 / MoreNumTegra
window = last 7 days including current-day availability
~~~

Selected observed events:

~~~text
2026-09-18:
mnt_form_start = 7
mnt_form_submit_attempt = 3
generate_lead = 3

2026-09-21:
mnt_form_start = 4
mnt_form_submit_attempt = 4
generate_lead = 4

2026-09-22:
page_view = 10
mnt_intent = 1
~~~

Current exact-runtime post-release traffic is separately proven in M7-10 using 18h/19h observations after the 15:16 BRT deployment-ready timestamp.

Matching event counts are not treated as a joined funnel or per-user causal proof.

## Search Console — current available window

Property:

~~~text
sc-domain:moretegra.com.br
window requested = last 7 days including current day
latest returned rows = 2026-09-20
~~~

Observed query/page rows include:

~~~text
2026-09-19
query = tegra
page = https://moretegra.com.br/
clicks = 1
impressions = 1
position = 43

2026-09-20
query = tegra
page = https://www.moretegra.com.br/
impressions = 1
position = 7

2026-09-20
query = aria higienopolis
page = https://www.moretegra.com.br/empreendimentos/aria-higienopolis/
impressions = 2
position = 86.5

2026-09-20
query = caminhos da lapa elo
page = https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/
impressions = 1
position = 71

2026-09-19/20
query = capítulo tegra
page = https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/
impressions observed
positions = 30 / 25
~~~

The apex row on 2026-09-19 is retained as observed Search Console reporting. It is not treated as proof of a canonical regression; ADR-006 and prior live inspection establish `www` as the canonical host and the apex as a redirect surface.

The Search Console dataset is sparse and must not be used to infer stable ranking movement or tactic causality.

## Google Ads — frozen state

Target account queried read-only:

~~~text
560-869-4042 / SWL Consultoria de imoveis
window = last 7 days including current day
fields = date / campaign / status / spend / impressions / clicks / conversions
result rows = 0
~~~

Interpretation:

- M6-07 has not been implemented;
- paid media remains frozen;
- no Ads result is manufactured for RESF closure;
- M6-08 remains deferred because the external paid implementation to QA does not exist.

## Acceptance

~~~text
MNT-M7-11 = COMPLETE / ACCEPTED
accepted hours = 24
GSC observation = CAPTURED
GA4 observation = CAPTURED
Ads observation = ZERO-ROW / PAID_MEDIA_FROZEN
causal claim = NONE
runtime mutation = 0
Ads mutation = 0
~~~
