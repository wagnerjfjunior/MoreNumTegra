# SFJM — Limpeza global de textos e controles redundantes do Complexo — 05/11/2026

## Solicitação
O usuário reiterou que **todos os cenários** devem estar livres dos painéis repetitivos:
- "Referências da região", chips de bairros/ruas e ressalvas sobre ruas;
- nota editorial "Base geográfica: SPObras (2019)...", resolução JPG e comentários de calibração;
- "Controle da circulação" duplicado dentro do iframe, pois os controles funcionais foram centralizados na página principal;
- checkbox e camada de "paradas previstas" sem marcação geográfica;
- contagem editorial de veículos no conteúdo visível ("32 carros em loop..." e "Na arte editorial...").

## Diagnóstico ao vivo
- Fonte canônica GitHub `main` após PR #545 (não copiar de branch antiga).
- `src-greenn/complexo-lapa-pirituba/duplo/index.html`: já limpo em release anterior.
- `src-greenn/complexo-lapa-pirituba/duplo-ayrton/index.html`: **ainda continha todas as seções**, originando a reclamação no cenário 2.
- `marginal-duplo/index.html`, `acessos-trajetos/index.html`, `lapa-marginal/index.html`, `pirituba-marginal/index.html`, `cenario7-trajetos/index.html`: verificados sem os trechos proibidos.
- `src-greenn/complexo-lapa-pirituba/index.html`: painel externo de sentidos preservado como fonte única de controle para C1–C6; player C7 mantém legenda interna própria.

## Mudanças
Branch `fix/complexo-limpeza-global-simuladores-20261105`, baseada na `main`:
1. No iframe do cenário 2, removidos completamente `#stopLayer`, `.map-legend`, `.map-keys`, texto `.source` e `aside.panel` redundante; mantido `#status` como elemento técnico oculto para erros/eventos.
2. Eventos JS associados a `#showOrange`, `#showBlue` e `#showStops` eliminados por não existirem mais esses inputs no iframe. O controlador `ux-map-v2.js` já aceita postMessage do pai e aciona diretamente os grupos SVG `#orangeRoute` e `#blueRoute`.
3. Título interno simplificado para **Ayrton Senna → Pirituba / Lapa**, sem nome de asset ou informação de calibração.
4. Status interno resumido para `Mapa carregado. Dois trajetos animados disponíveis.`, não exibido ao público.
5. Adicionado `ResizeObserver` no iframe C2 e mensagem segura de altura `mnt-complexo-iframe` para o mesmo domínio.
6. O pai amplia o listener de resize para C1 e C2, remove o `min-height` antigo do iframe C2 na regra final e permite reduzir espaço vazio no mobile.

## Auditoria estática
- Consultados oito arquivos HTML de navegação/simuladores, incluindo C1, C2, C3, outros players e C7.
- Nenhuma ocorrência de: "Referências da região", "Controle da circulação", "Exibir referências de paradas", "Exibir camada de paradas previstas", "Ruas citadas no projeto SPObras", "Base geográfica: SPObras", "32 carros em loop" ou "Na arte editorial:".
- Tags div balanceadas em todos os oito HTML; scripts inline compilados em JS, sem erro sintático.
- Não foram alterados SVGs de rotas, geometrias, sprites/carrinhos, cores, velocidades, contagem, mapas, overlays ou gestos.
- **Não houve QA visual no navegador**. Testar em iPhone a ausência de painéis, checkboxes de C2, ausência de espaços em branco e troca de cenários antes da publicação.

## Governança
- Trabalho restrito à branch dedicada. **Sem merge/deploy** nesta entrega.
- PR futura deve incluir somente HTML C2, HTML pai e esta documentação; rollback por revert da PR, preservando o restante da main.
