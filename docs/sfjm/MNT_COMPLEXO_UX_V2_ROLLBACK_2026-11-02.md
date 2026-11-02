# SFJM — Complexo Lapa–Pirituba · UX V2 e rollback (02/11/2026)

## Fonte canônica e limite
Repositório `wagnerjfjunior/MoreNumTegra`; branch `ux/complexo-controles-zoom-mobile-20261102`. Solicitado pelo proprietário: UX escura real, mobile primeiro, sentidos por checkbox, um dedo para deslocar mapa ampliado, dois dedos para zoom, espaço publicitário independente, navegação entre cenários. Teste visual somente após merge na produção por indisponibilidade de branch/LVR.

## Snapshot anterior à alteração
- Último deployment de runtime READY identificado na Vercel em leitura: **`dpl_GaocVCL1UD8UMrTbLp7R3oP3Prg8`**, commit `60b8bdb839e3a34f987f80558595188e7c683305` (PR #533).
- Deployment mais recente listado `dpl_4p7Dcvh52co12dzHWQTQFaZk6bdg` estava CANCELED (docs-only).
- Projeto `prj_f8r2PwQ42f38CWUjOGpEStkjmaqt` em conta `team_WIH0gs3BUjcZdk59oPViSjEm`.
- Verificar associação real ao alias `www.moretegra.com.br` imediatamente antes do merge. Não considerar a listagem substituto de um teste HTTP do domínio.

## Mudança permitida
- `src-greenn/complexo-lapa-pirituba/index.html`: CSS escuro mobile, seleção dos três cenários, explicitação dos sentidos, painel de orientações, bloco de publicidade separado.
- `src-greenn/complexo-lapa-pirituba/ux-map-v2.js`: transformações visuais coordenadas mapa+SVG, pinch, pan ampliado, botões, recebimento controlado de mensagens same-origin.
- `duplo/index.html`, `duplo-ayrton/index.html`, `marginal-duplo/index.html`: somente inclusão do script UX. Geometrias, strings de paths e trajetos originais devem permanecer intactos.

## Gates antes de promover
1. Conferir diff exato e inexistência de mudança em JSON/SVG de rotas.
2. Sintaxe JS, tags HTML, ids, associação aos controles e CSS responsivo.
3. CI referente ao head final da PR.
4. HTTP em produção: página pública, script novo e iframes dos três cenários.
5. Homologação iPhone 11: pinch sobre mapa, pan 1 dedo quando ampliado, rolagem normal em zoom 1x, +/-/reset, seleção individual azul/laranja, regressão de veículos e pistas.
6. Verificar SEO canônico, FAQ visível, sitemap sem alterações.

## Critérios de abort/rollback
Erro de carregamento/mapa branco; carros ou linhas fora das pistas; bloqueio de rolagem no Safari; checkbox sem efeito; gestos incompatíveis; falha de qualquer um dos três cenários.

## Rollback operacional
1. Confirmar qual deployment atende `www.moretegra.com.br`, registrar ID, SHA e horário.
2. Pela Vercel, solicitar rollback de produção do projeto `prj_f8r2PwQ42f38CWUjOGpEStkjmaqt` para **`dpl_GaocVCL1UD8UMrTbLp7R3oP3Prg8`** (se confirmado baseline vigente).
3. Verificar alias, HTTP 200, seleção, simuladores e assets em produção. Não declarar sucesso antes da verificação.
4. Reverter a PR UX V2 em `main` caso necessário para que o próximo deploy automático não reproponha o código problemático.
5. O rollback do tráfego e o revert do Git são ações distintas; nenhuma é automática aqui.

## Limites
Não é teste em dispositivo físico. HTML e gestos são candidatos até confirmação do proprietário em iPhone 11. Materiais SPObras 2019; não inferir circulação operacional atual.
