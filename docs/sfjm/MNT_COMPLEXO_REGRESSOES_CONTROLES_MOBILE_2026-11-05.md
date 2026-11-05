# SFJM — Correção de regressões mobile após PR #544 — 05/11/2026

## Solicitação e evidência
Usuário apresentou três capturas do iPhone em produção:
- Cenário 7 exibia controles externos herdados do cenário 6 ("Condomínios → Marginal Pinheiros/Ayrton Senna") **e** a legenda própria do C7: duplicação e labels incorretos.
- Cenário 1 tinha a orientação "1 dedo ... 2 dedos ..." sobreposta aos dados da imagem, repetida em bloco externo.
- Cenário 1 ainda mostrava espaço vazio na parte inferior do iframe; ícones dos sentidos nos controles externos destoavam dos carros do C7.

## Diagnóstico
- `index.html`: `activeIndex()` do controlador UX tem `n<6`, mas estilos `.ux-directions{display:grid}` e `.ux-dir{display:flex!important}` anulavam visualmente parte do atributo `hidden`. A legenda externa continuava visível em C7; o controlador interno de C7 já tinha três checkboxes corretos.
- `ux-map-v2.js`: cria dinamicamente `.ux-map-help` sobre o viewport, apesar de haver `.ux-instructions` no painel externo.
- Os checkboxes duplicados do iframe C1 foram removidos na PR anterior; `showRoute` só tratava a existência desses inputs ou a versão marginal, deixando de alterar os grupos SVG `#blueRoute` e `#orangeRoute`.
- `duplo/index.html`: uso de `document.documentElement.scrollHeight` no iframe podia refletir a altura mínima do viewport, mesmo com documento menor, impedindo diminuir o espaço branco.

## Implementação — branch de correção
Branch `fix/complexo-controles-instrucoes-mobile-20261105`, **baseada na main após PR #544**, sem merge/deploy neste momento.

1. `src-greenn/complexo-lapa-pirituba/index.html`
   - Para cenário 7 e opções que utilizam player independente ou ainda não possuem controles, ocultar o painel de sentidos externo completo; manter controles **dentro do player C7**.
   - Classe `ux-map-only` amplia a coluna do mapa para a largura total em desktop e mobile quando o painel externo é ocultado.
   - Regras CSS explícitas para `[hidden]` vencerem estilos antigos que forçavam `display:flex!important`.
   - Converter três SVGs de carrinhos da legenda externa para o modelo vertical de **dois vidros**, com contorno branco e cor dinâmica, equivalente ao player C7. Preservar nomes e callbacks de cada sentido.
2. `src-greenn/complexo-lapa-pirituba/ux-map-v2.js`
   - Retirar somente texto e elemento visual `.ux-map-help` sobre a imagem. Manter zoom por toque e botões +/−/reset.
   - `showRoute` passa a agir diretamente em `#blueRoute` e `#orangeRoute` quando não houver inputs locais no iframe C1. Restaura os checkboxes externos como fonte única de controle.
3. `src-greenn/complexo-lapa-pirituba/duplo/index.html`
   - Calcular altura real usando `main.getBoundingClientRect().bottom`, observando `main` via `ResizeObserver`; enviar mensagem de resize same-origin ao pai para reduzir eventual espaço branco inferior.
   - SVG, geometria e frota preservados.

## Restrições e QA
- Não alterar pontos, velocidades, 8+8+16 carros do C1, nem 8/5/5 do C7.
- Não publicar os editores dos cenários 8 e 9; continuam na branch `feat/complexo-cenarios8-9-editor-prancha7-20261105`.
- Validação estática: JS compilável e integração de seletores / classes conferida. **QA visual iPhone e desktop ainda pendente**.
- Testes manuais obrigatórios em LVR: selecionar C1 e desligar cada sentido; verificar mapa livre de instruções sobrepostas, sem faixa branca; C5/C6 com cores corretas; selecionar C7 e verificar somente sua legenda própria e três trajetos com dois vidros; troca de cena não deixa controles antigos.
- Nenhum merge, publicação Vercel/Greenn ou rollback aplicado na correção.
- Em publicação posterior, isolar PR contendo apenas os três arquivos + esta documentação, manter rollback por revert da PR e deployment anterior READY.
