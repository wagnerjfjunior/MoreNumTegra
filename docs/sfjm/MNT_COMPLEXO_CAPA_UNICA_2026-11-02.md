# SFJM — Capa única do Complexo Lapa–Pirituba

## Autoridade e base

Pedido do usuário em 02/11/2026: retirar os três cards e trabalhar com a capa anexada.
Base main: `1376e5e14123b3ef75b005d82badbc51f5c16294`.
Branch: `ux/complexo-capa-unica-20261102`.
Estado: candidato de revisão; sem merge ou novo deploy de produção nesta etapa.

## Implementação

- Três cards substituídos pela arte fornecida `Capa Complexo Lapa-Pirituba(1).png`.
- Original 1672×941 preservado visualmente, convertido em WebP (417708 bytes); derivado mobile 840×473 (140578 bytes).
- Três botões HTML acessíveis sobre a faixa inferior no desktop; os mesmos controles aparecem abaixo da imagem em telas até 800px, com altura mínima 48px.
- Acessos chamam o seletor/render existente e levam ao simulador correspondente.
- H1 preservado para leitores de tela; removida a duplicação visual do cabeçalho sobre a capa.
- OG/Twitter passam a usar a capa. Canonical, robots, FAQ, sitemap e JSON-LD preservados.
- Código e assets internos de todos os simuladores intactos.

## Validação

- `node scripts/validate-two-images-39-pages.mjs`: PASS.
- `git diff --check`: PASS.
- Browser local: imagem inteira renderizada; três cliques selecionaram respectivamente os iframes dualEmbed, ayrtonEmbed e marginalDualEmbed.
- Browser em iframe de 390px: capa inteira, três botões legíveis e layout de uma coluna. Verificação responsiva em browser desktop; não é teste em aparelho físico ou emulação touch.
- Console: erros observados originam-se da extensão do navegador, não do código da página.
- Produção, CWV e aceite visual do proprietário para esta nova capa: ainda não verificados.

## Rollback e continuidade

Reverter somente o commit/PR desta capa; não tocar em rotas, curvas ou carros. Baseline de produção segue PR #532, deployment `dpl_4vAHBB7UXbyYX3JofdaojFnwXoYK`.
Revisar no LVR a branch indicada e registrar o SHA servido. Não afirmar que o navegador do usuário está sincronizado sem essa evidência.
