# MoreNumTegra — Commercial Footer and Location Interaction Standard

Status: `CANONICAL` when merged to `main`  
Date: `2026-09-19`

## 1. Scope

This standard is binding for:

- the MoreNumTegra portfolio/home page;
- every public/indexable exact-project page under `src-greenn/empreendimentos/**/index.html`;
- standalone source pages that are used to compose a public project page, including the CAPIITOLO editorial source.

Noindex utility pages such as `/obrigado/` are excluded from the commercial disclaimer requirement.

## 2. Canonical footer logo

Every commercial footer must use:

```text
https://s3-gdigital.s3.amazonaws.com/gdigital/313/dkRxNEw3OY1mr3apBCmTbFFGpzD4PZnbGLWpJq1q.webp
```

The footer logo is independent from the favicon standard.

## 3. Mandatory disclaimer copy

Every commercial footer must contain this paragraph verbatim:

> Página de atendimento comercial More em um Tegra. Informações de unidades, disponibilidade e condições devem ser confirmadas diretamente com a equipe Tegra Vendas. Imagens, perspectivas, preços e condições podem ser atualizados sem aviso prévio.

Every commercial footer must also contain this paragraph verbatim before the page-specific address:

> Os valores exibidos nesta página são referências comerciais vinculadas às unidades indicadas e podem sofrer alterações. Alguns empreendimentos podem apresentar condições promocionais específicas, sujeitas à disponibilidade da respectiva unidade. Preços, unidades, disponibilidade e condições comerciais devem ser confirmados com nossos corretores no atendimento.

The address appended to that paragraph must be the governed address applicable to the page and must remain consistent with the factual entity/address model used by the page.

Current governed footer addresses:

- portfolio/home: `Estande Tegra Caminhos da Lapa · Rua Fortunato Ferraz, 625 · São Paulo/SP · CEP 05093-000.`
- Elo Duo: `Estande Tegra Caminhos da Lapa · Rua Fortunato Ferraz, 625 · São Paulo/SP · CEP 05093-000.`
- Ária Higienópolis: `Ária Higienópolis · Rua Coronel José Eusébio, 145 · Higienópolis · São Paulo/SP · CEP 01239-030.`
- CAPIITOLO: `CAPIITOLO by Piero Lissoni · Rua Ibaragui Nissui, 166 · Chácara Klabin · São Paulo/SP · CEP 04116-200.`

A future page must not invent an address. The address must come from governed Product Truth / approved structured-data facts.

### Address exposure rule

Exact street address, street number and postal code are **forbidden in visible page content outside the canonical commercial footer**.

Allowed:
- the page-specific address inside `data-mnt-footer-address`;
- non-visible JSON-LD / structured data when required for factual entity consistency;
- internal governed evidence that is not rendered to the visitor.

Forbidden outside the footer:
- hero/facts cards;
- location copy;
- FAQ visible answers;
- map labels/buttons;
- standalone visit cards;
- external map links that reveal the exact address;
- exact-address map queries.

Visible location copy may use only neighborhood/region/city-level wording such as `Chácara Klabin · São Paulo`, `Higienópolis · São Paulo` or `Caminhos da Lapa · São Paulo`.

Structured-data addresses must remain consistent with the governed footer address but must not be copied into another visible section.

## 4. Mandatory commercial contact

Every commercial footer must contain:

```text
Sabrina da Tegra · Corretora Tegra Vendas · CRECI-SP 209.905-F.
(11) 96077-9328 · perfil oficial Tegra Vendas
```

Links:

- `tel:+5511960779328`
- `https://corretor.tegravendas.com.br/sabrina/sp`

## 5. Required markup hooks

Commercial pages must expose:

- `data-mnt-commercial-footer` on the footer;
- `data-mnt-footer-address` on the page-specific address.

These hooks are governance/validation hooks and must not be repurposed.

## 6. Tegra corporate-site isolation

Public MoreNumTegra commercial HTML and browser-delivered JavaScript must not expose or depend on Tegra corporate website URLs.

Forbidden in public commercial runtime:
- `tegraincorporadora.com.br`;
- subdomains such as `arquivos.tegraincorporadora.com.br`;
- visible "Fonte Tegra" links to the corporate site;
- project `sameAs` links to the Tegra corporate website;
- Tegra corporate website URL/logo/image references in JSON-LD;
- catalogue `official` URL fields;
- image proxy URLs routed through the Tegra corporate website.

Project media may use the already-authorized direct asset origins such as Azure Blob or GDigital/S3.

The only Tegra-related profile link authorized in the canonical commercial disclaimer is:

`https://corretor.tegravendas.com.br/sabrina/sp`

This rule does not prohibit functional links such as WhatsApp, telephone, MoreNumTegra internal navigation, consent/analytics infrastructure or separately approved media providers.

## 7. Location-map interaction

Project location maps are WhatsApp conversion surfaces, not exact-address disclosure or interactive Maps navigation surfaces.

CAPIITOLO, Elo Duo and Ária must follow the same interaction rule.

Required behavior:

- clicking anywhere on the map visual opens the governed WhatsApp location request;
- the embedded map itself has pointer interaction disabled;
- no external `Abrir no Maps` button/link is exposed;
- no direct `google.com/maps/search` navigation link is exposed;
- map queries are neighborhood/region level, never exact street/number or exact project coordinates;
- the current yellow `Solicitar localização` WhatsApp button remains;
- the map iframe may remain as a visual background only.

This rule prevents zoom/pan/Maps navigation from competing with the intended lead action.

## 8. CI enforcement

Guard:

- `scripts/validate-commercial-page-standard.mjs`
- `.github/workflows/commercial-page-standard.yml`

The guard must fail when a current commercial page loses the canonical footer text/logo/contact/address hooks, exposes an exact address outside the footer/structured data, reintroduces any Tegra corporate-site URL into public commercial runtime, or regresses a project map to an interactive/direct Maps navigation surface.
