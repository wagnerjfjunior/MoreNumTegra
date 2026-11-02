# SFJM — Aceite visual LVR · Simulador 3 · Lapa / Pirituba → Marginal Pinheiros

**Data:** 01/11/2026 · **Projeto:** MoreNumTegra · **Repositório canônico:** `wagnerjfjunior/MoreNumTegra`  
**Branch de homologação:** `feat/complexo-duplo-carrinhos-zoom-lvr-20261031` · **PR:** [#528](https://github.com/wagnerjfjunior/MoreNumTegra/pull/528) (Draft, não merged)  
**Baseline de código visualmente aceito pelo usuário:** `158e23a8c44057fe024986874f1b37542dbdb5d3`.  
**Natureza do aceite:** usuário testou no LVR e declarou **"FICOU ótimo!!!!"** após a última correção. **Não** implica merge, release, produção, aprovação de engenharia viária ou testes automáticos completos.

## 1. Escopo exato do aceite

Simulador **3. Lapa / Pirituba → Marginal Pinheiros**, no catálogo do Complexo Lapa–Pirituba. A imagem base é `assets/Mapa_Lapa_Pirituba_Marginal_Badge3.webp`, 1500×1049, com shopping Tietê Plaza ilustrado, badges de referência e Rio Tietê. **Imagem não é redesenhada pela movimentação:** trajetos e carros são elementos SVG sobrepostos.

Elementos aceitos:
- Linha **azul `#137CF1`**: Lapa → Marginal Pinheiros. **8 carrinhos azuis**, distribuídos ao longo do próprio SVG, movimento em loop.
- Linha **laranja `#FF5F00`**: Pirituba → Marginal Pinheiros. **8 carrinhos laranjas**, distribuídos ao longo do próprio SVG, movimento em loop.
- Tráfego ambiente da **Marginal Tietê**: **16 veículos** (8 em cada sentido) em **preto, vermelho e cinza**, sobre duas guias invisíveis. **Proibido** usar azul/laranja nos carros da Marginal.
- **32 carros ao todo** na versão editorial. As **linhas SVG azul e laranja permanecem visíveis**; somente as guias dos veículos ambiente não são desenhadas.
- Movimento automático contínuo/autoloop, sem botões de controle e sem zoom. Respeitar `prefers-reduced-motion` e pausa na aba oculta.
- **Sentido da rotatória e geometria da rota azul são protegidos**: não inverter, não redesenhar e não deslocar sem autorização expressa.

## 2. Correções que levaram ao aceite

1. Os primeiros testes exibiram carros neutros sobre o rio e trânsito atravessando o terreno do shopping. Também houve cruzamento de trajetórias azul/laranja na ligação junto à rotatória.
2. Usuário determinou faixa laranja junto ao shopping, faixa azul paralela mais externa e guia invisível dos carros da Marginal ainda mais externa; corrigir curvatura do tráfego de ambos os lados do Rio Tietê.
3. Houve intervenção indevida na linha azul/rotatória. **A rota azul foi restaurada integralmente** à string `23.d` do commit histórico `10935974b3b8e85718adf1b83f24d1f0c3513b37`; comparação textual confirmada no ajuste anterior. Inverter o sentido da rotatória é uma ação expressamente proibida.
4. Ajuste pontual final **somente no SVG laranja `24.d`**: encurtou a curva próxima à rotatória conforme marcação ciano do usuário, eliminando ida excessiva à região x608–617 e fazendo conexão Bézier curta em torno de x565–537. Nenhum outro segmento laranja ou SVG azul foi alterado nesta última correção.
5. Ajuste pontual final **somente na guia invisível da pista inferior**: nova curva que acompanha a via ao sul do Rio Tietê em vez de lançar veículos sobre a água. Guia superior, carros, cores e quantidades preservados.
6. Após atualizar e testar essa combinação no LVR, usuário confirmou **aceite visual expresso** ("FICOU ótimo!!!!"). Este aceite substitui as marcações de "pendente de aceite" dos registros históricos para **esta combinação específica** de arquivos/HEAD; os registros históricos continuam válidos como histórico das regressões.

## 3. Arquivos e parâmetros da baseline

| Arquivo | Responsabilidade | Proteção |
|---|---|---|
| `src-greenn/complexo-lapa-pirituba/marginal-duplo/index.html` | sobreposição SVG, 8+8 carros de rota, 16 ambientes, autoloop, guias invisíveis | não alterar sem teste LVR |
| `src-greenn/complexo-lapa-pirituba/marginal-duplo/routes-marginal-editorial.json` | `23.d` azul e `24.d` laranja; `viewBox 0 0 1500 1049` | azul e sentido rotatória congelados |
| `src-greenn/complexo-lapa-pirituba/assets/Mapa_Lapa_Pirituba_Marginal_Badge3.webp` | fundo editorial aprovado | não regenerar nem embutir carros/linhas na imagem |
| `src-greenn/complexo-lapa-pirituba/marginal-duplo/routes-marginal.json` | rotas de fallback na prancha 23, `viewBox 0 0 1200 849` | preservar integralmente |
| `src-greenn/complexo-lapa-pirituba/assets/rota-23.jpg` | prancha técnica original e rollback `?mapa=original` | preservar integralmente |

**Caminho laranja aceito** — trecho local de Bézier:  
`C 568 454 570 458 565 464 C 560 474 551 476 537 477 C 523 478 506 481 491 485`.

**Guia invisível inferior aceita** — coordenadas editoriais:  
`M 65 848 C 120 776 200 732 310 706 C 425 676 553 674 684 678 C 920 689 1170 709 1475 724`.

**Guia invisível superior preservada:**  
`M 1470 548 C 1200 542 993 534 808 529 C 686 527 612 530 545 535 C 459 542 364 552 287 579 C 204 609 149 631 94 666`.

Os caminhos invisíveis servem apenas à animação ilustrativa; **não retratam trânsito atual nem possuem homologação viária**.

## 4. Critérios de regressão e proibições

Qualquer alteração futura no simulador 3 deve garantir:
1. **Não modificar `23.d` azul** nem direção/circulação da rotatória sem autorização explícita.
2. Manter laranja próximo ao shopping, azul paralelo mais externo e carros ambientes em faixa distinta; nenhuma sobreposição indevida.
3. Nenhum carro atravessando rio, terreno do shopping ou badges; transições curvas, não vértices abruptos.
4. Manter **8 carros azuis no SVG azul, 8 laranjas no SVG laranja, 16 pretos/vermelhos/cinzas na Marginal**.
5. Não ocultar linhas dos trajetos principais; guias ambiente devem continuar invisíveis.
6. Manter autoplay, autoloop e comportamento responsivo mobile; nenhuma dependência de zoom/hover.
7. Não alterar simuladores 1/2 ou outros itens do catálogo ao revisar o simulador 3.
8. Comparar diff e repetir QA LVR. Registrar novo aceite se qualquer geometria for modificada.

## 5. Fluxo, rollback e pendências

- **Fonte canônica:** GitHub; **teste:** LVR local `http://localhost:8080/complexo-lapa-pirituba/`, opção 3; **PR #528:** Draft, sem merge.
- **Rollback da experiência aprovada:** recuperar os arquivos `marginal-duplo/index.html` e `marginal-duplo/routes-marginal-editorial.json` do commit `158e23a8c44057fe024986874f1b37542dbdb5d3`. Não reverter o repositório inteiro e não afetar demais simuladores.
- **Pendências:** QA automatizado/browser e desempenho mobile não foram comprovados nesta conversa; revisão agregada da PR #528 e eventual merge/release dependem de autorização separada. A aceitação é estritamente visual/funcional **reportada pelo usuário no LVR**, para o simulador 3.
- **Documentação histórica complementar:** `docs/sfjm/MNT_COMPLEXO_MAPA_EDITORIAL_AYRTON_2026-11-01.md`, que conserva decisões e regressões anteriores. Em caso de divergência sobre estado vigente do simulador 3, **este registro de aceite mais recente prevalece**, desde que o código corresponda ao baseline acima.

**Governança:** esta documentação não autoriza deploy, merge, modificação de rotas nem edição do mapa.
