# SFJM — Handoff integral e auditável — Complexo Lapa–Pirituba — 05/11/2026

> **Estado do projeto e histórico de releases, não apenas o próximo passo.** Este registro prevalece, para a frente Complexo, sobre instruções antigas de homologação não mais aplicáveis. Não substitui as fontes canônicas nem autoriza alterações sem consulta live.

## 1. Identificação e política
- Repositório canônico: `wagnerjfjunior/MoreNumTegra`; branch de produção: `main`.
- Página pública: `https://www.moretegra.com.br/complexo-lapa-pirituba/`.
- Fonte de verdade: conteúdo atual da `main` no GitHub. Vercel Production é o deploy operacional; evitar confundir com branch de desenvolvimento ou LVR.
- Prioridade deste módulo: visualização intuitiva e agradável dos trajetos do Complexo Lapa–Pirituba para **visitantes comuns**, mobile-first.
- **NÃO** apresentar ao visitante engenharia, SFJM, LVR, SVG, JSON, viewBox, nomes de arquivos, etapas de calibração, quantidade de veículos, justificativas e descrições internas de animações.
- Exibir somente: destino/percurso, mapa, controles reais de sentidos, zoom e botões relevantes; mensagens curtas e claras.
- **Não inventar** localização ou condição de vias, trajetos/pontos, quantidade de veículos, características da obra, data de entrega ou liberação. Manter informações históricas e fontes verificáveis fora dos controles dos cenários (página informativa/FAQ/fonte), com linguagem simples.
- Não realizar intervenção de geometrias/carrinhos/velocidades aprovadas durante melhorias de UX; preservar layout dark, identidade visual, mapa, badges e as cores por origem.

## 2. Estado LIVE verificado nesta sessão
Consulta GitHub PRs #542–#550 e Vercel feita em 05/11/2026:
- **Main de produção funcional antes deste handoff documental:** `0f5a059d1c42b1ad4b33c96e5a542a18e8d6181c` (merge PR #550).
- **Deployment Vercel:** `dpl_7BY6Jjk6Vq3vdh9WBAtspJtCSX7q`, `production`, **READY**, `meta.githubCommitSha` coincide com a main acima, `aliasError=null`.
- Aliases observados: `www.moretegra.com.br`, `moretegra.com.br`, `morenumtegra.vercel.app` e outros aliases do projeto.
- **Deployment READY imediatamente anterior / rollback candidato:** `dpl_NNXvsx7EyThGjhiuyERzvrnkLFSW`; commit `fcebc6ccc62ebb2e5e0e8ebebaba8f9e87c12ca4` (PR #549). Em caso de bug, validar live a disponibilidade deste deployment; preferir promoção/rollback na Vercel se disponível, ou revert **só** da PR problemática. Nunca forçar reset da main.
- **Status de QA:** compilação estática e READY confirmados; **não há confirmação visual iPhone após PR #550**. A foto do espaço branco C3 que motivou a PR #550 era da versão *anterior* e não comprova que a correção tenha falhado depois do merge.
- **LVR indisponível para o usuário nesta sequência**. Usuário autorizou explicitamente publicar para conferir em produção, com rollback pré-identificado. Isso não transforma publicação em aceite visual.

## 3. Histórico rastreável — preservação de baselines
| PR | Mudança principal | Merge SHA | Situação |
|---|---|---|---|
| #533 | Capa única editorial dos simuladores no lugar de cards anteriores | `60b8bdb839e3a34f987f80558595188e7c683305` | Histórico aprovado/publicado |
| #538 | Cenário 4 com traçados calibrados e remoção de controles de edição | `c4c37f5d4c5a3b94089ece6cccbafcff7f3e6e1a` | Preservar |
| #542 | Cenário 7 — player isolado, 3 trajetos e controles no estilo dark | `2aa6b8c268e8a112c9d74fe1c293c3cec9358db2` | MERGED |
| #543 | Cenários 5 e 6 — trajetos calibrados e legendas | `be685ba8ae28c04fa93f9a3c50db00962ccd1a5f` | MERGED |
| #544 | UX mobile, seletor no topo, remoção dos 3 botões fixos, limpeza C1 | `34ecc57ebb25408a88c2e008c883ebac58e4abcd` | MERGED |
| #545 | Corrigida duplicação legenda C6/C7, 2 vidros, removido hint sobre o mapa, corrigidos checkboxes C1 | `218b0628a51560418041febbc20a914fabd43ed2` | MERGED |
| #546 | Limpeza integral de referências/controles internos do cenário 2; iframe responsivo | `5b6668fb6b771e101d678fa33a0761f620b1e77f` | MERGED |
| #547 | Remoção dos blocos pós-simulador "Como interpretar o mapa" e "O que o projeto viário propôs?" | `b2a8296ad6af1b1c1ff7f3d00b4c45c770aa9e7a` | MERGED |
| #548 | Mover bloco completo Experiência interativa + simuladores **antes** de Perspectivas do projeto | `65d2d3b8a05cacdc5f1b8c03829fada32c30cc10` | MERGED |
| #549 | Revisão global de linguagem amigável — retiradas notas SVG/carros/protótipo/LVR dos 8 HTMLs da frente | `fcebc6ccc62ebb2e5e0e8ebebaba8f9e87c12ca4` | MERGED |
| #550 | Ajuste de espaço branco no iframe C3: remove min-height 920px, ResizeObserver + postMessage | `0f5a059d1c42b1ad4b33c96e5a542a18e8d6181c` | MERGED, READY, teste iPhone pendente |

Todos os números e SHAs #542–#550 acima foram conferidos nos PRs GitHub nesta sessão; PRs anteriores aparecem em documentação histórica. Não realizar novo merge de branches amplas apenas porque foram citadas neste histórico.

## 4. Arquitetura e arquivos essenciais
- HTML de entrada: `src-greenn/complexo-lapa-pirituba/index.html`.
- Primeiro player: `src-greenn/complexo-lapa-pirituba/duplo/index.html`.
- Segundo player: `src-greenn/complexo-lapa-pirituba/duplo-ayrton/index.html`.
- Terceiro player: `src-greenn/complexo-lapa-pirituba/marginal-duplo/index.html`.
- Quarto cenário, C5 e C6 são tratados no HTML principal (preservar traçados, animações e frota).
- Player cenário 7: `src-greenn/complexo-lapa-pirituba/cenario7-trajetos/index.html`.
- Módulo compartilhado do zoom: `src-greenn/complexo-lapa-pirituba/ux-map-v2.js`.
- Páginas auxiliares: `acessos-trajetos/index.html`, `lapa-marginal/index.html`, `pirituba-marginal/index.html`.
- Documentação específica: `docs/sfjm/MNT_COMPLEXO_C3_ALTURA_IFRAME_MOBILE_2026-11-05.md`, `MNT_COMPLEXO_LINGUAGEM_VISITANTE_2026-11-05.md`, `MNT_COMPLEXO_LIMPEZA_GLOBAL_CONTROLES_REDUNDANTES_2026-11-05.md`, `MNT_COMPLEXO_C5_C6_RELEASE_2026-11-05.md` e este handoff.
- Desacoplar mídia de geometria e componentes; não copiar imagens pesadas para GitHub sem necessidade.

## 5. Experiência atual e decisões de UX
1. Três botões fixos do topo foram removidos; usar **um seletor `#route`** antes do mapa. A main atual preserva **12 opções textuais**, não afirmar que todas possuem animação concluída.
2. Seção interativa está **antes** de "Perspectivas do projeto" e depois dos benefícios. Títulos e CTA do simulador orientados a pessoas comuns.
3. Controle de sentidos na página principal para C1–C6 quando aplicável. **C7 usa sua legenda interna própria**; não exibir controles herdados de C6.
4. Zoom em mobile por gesto e botões +/−/centralizar; sem a faixa "1 dedo/2 dedos" sobre o conteúdo geográfico.
5. Não mostrar páginas PDF, versões de JPG/WebP, status "LVR", SVG e diagnóstico técnico aos visitantes. Estados de erro devem ser amigáveis; manter detalhes técnicos no console/doc.
6. Removidos chips de bairros/ruas, "Referências da região", painéis internos duplicados "Controle da circulação", camada de paradas redundante e descrição de carros nos cenários afetados.
7. Retirados blocos narrativos repetitivos após os mapas, mas FAQ e fonte/transparência preservados para informação factual e SEO.
8. Área publicitária continua abaixo do mapa, não antes dele; não descartar infraestrutura de anúncios por mero ajuste de UX.

## 6. Cenários — delimitação
- **C1 Lapa ↔ Pirituba:** dois sentidos laranja/azul, 8 carros por sentido mais 16 veículos de ambiente no Tietê como baseline histórica. Controles externos devem agir nos grupos SVG `orangeRoute`/`blueRoute`; limpeza de iframe e auto-height publicada.
- **C2 Ayrton Senna → Pirituba / Lapa:** dois sentidos, legenda externa; removidos chips, notas, paradas e controles duplicados. Auto-height com `ResizeObserver`.
- **C3 Lapa / Pirituba → Marginal Pinheiros:** iframe `marginalDualEmbed`, mapa editorial, 2 sentidos. No CSS anterior havia `min-height:970px` (mobile `920px`), gerando enorme área branca após a imagem. **PR #550** adiciona CSS final `min-height:0` com altura inicial desktop `650px` / mobile `365px`; filho observa altura de `main` via `ResizeObserver` e envia `postMessage` same-origin, pai valida `origin`, `source` e `height in [160,2400]`. Corrigido em produção **em nível de código/deploy**, resultado visual mobile ainda não confirmado.
- **C4 Pirituba → Piqueri / Ayrton Senna:** usar a Figura 2 aprovada e as rotas/veículos calibrados; não mexer em geometrias.
- **C5 Marginal Pinheiros → Pirituba:** linha/carros roxos `#8B5CF6`, 33 pontos SVG e 8 carros reportados na release de C5/C6. Preservar.
- **C6 Saída dos Condomínios (Marginal Pinheiros / Ayrton Senna / Lapa):** 3 rotas, cores `#007985`, `#00B8C7`, `#B9EDCF`, 8 carros por rota em baseline C5/C6, badges/legenda dark. Preservar.
- **C7 Lapa → Ayrton Senna / Condomínio Anastácio:** player próprio com 3 rotas aprovadas: Lapa→Ayrton Senna (35 pontos, 8 laranjas); Saída Parques da Lapa (37 pontos, 5 dourados); Lapa→Quintas da Lapa (33 pontos, 5 laranjas). Bosques e Praças não publicados; o player possui controles separados. Não reativar editor na produção.
- **C8/C9:** **não estão publicados nem calibrados**; ver seção 7.

## 7. C8/C9 — branch isolada que NÃO deve ser mergeada diretamente
- Branch: `feat/complexo-cenarios8-9-editor-prancha7-20261105`.
- Estado live ao consultar `main...branch`: **diverged**, `ahead=11`, `behind=7`; inclui modificações antigas de UI sobre HTML principal que foram superadas na main.
- Doc presente **somente nessa branch**: `docs/sfjm/MNT_COMPLEXO_CENARIOS8_9_EDITOR_PRANCHA7_2026-11-05.md`.
- Editor: `src-greenn/complexo-lapa-pirituba/cenarios8-9-editor/index.html?cenario=8` / `?cenario=9`; usa imagem existente de C7 `Complexo-Lapa-Tietê-Percurso-Completo-v1.png` 1448×1086; guarda/exporta/importa pontos em JSON.
- C8, duas rotas independentes: Av. Raimundo → Av. Mercedes; Av. Raimundo → Rua Diogo Ortiz / Estação Domingo de Moraes.
- C9, duas rotas independentes: Av. Mercedes → Av. Raimundo; Rua Diogo Ortiz / Estação Domingo de Moraes → Av. Raimundo.
- **Zero coordenadas homologadas** em C8/C9; cores do editor provisórias; **sem animação/carros**. O usuário deve coletar e aprovar os pontos antes da publicação.
- Caso retomar: obter JSONs/traçados reais, reconciliar com `main` atual, criar branch de integração limpa baseada na main, portar apenas editor isolado se houver autorização, sem copiar `index.html` antigo inteiro. Não inventar pontos/velocidades, não reabrir mudanças C1–C7 e não confundir as 12 opções atuais da main com C8/C9 concluídos.

## 8. Bloqueios e riscos atuais
- **Pendente: QA visual iPhone pós-PR #550**, especialmente espaço branco no C3, corte do mapa, rolagem, gesto de zoom, eventuais áreas brancas nos C1/C2, alternância dos cenários, legenda de C7 e controle de sentidos C1.
- Evitar alterações novas sem evidência/relato ou conferência do estado live. Não declarar bug corrigido visualmente só porque JS compilou e deploy ficou READY.
- Não realizar merge dos editores C8/C9, de branches antigas grandes ou das pranchas antigas divergentes.
- Não alterar produção Greenn, SEO global, formulários, C1–C7 geometrias, carros, intensidade e cores sem pedido específico.
- Não criar backend, framework ou scripts pesados; V1 HTML/CSS/JS vanilla.
- Fluxo de publicação quando LVR indisponível: branch curta → diff restrito → testes sintáticos/contratos → PR → aprovação expressa → merge com SHA esperado → Vercel READY SHA exato/alias sem erro → QA visual do usuário → rollback pré-identificado.

## 9. Procedimento de rollback
1. Identificar LIVE a versão falha da main, PR e deployment; guardar screenshots e logs de regressão quando fornecidos.
2. Para regressão de UX após PR #550, candidato anterior `dpl_NNXvsx7EyThGjhiuyERzvrnkLFSW`, SHA `fcebc6ccc62ebb2e5e0e8ebebaba8f9e87c12ca4` (PR #549). Reconfirmar disponibilidade e aliases antes de usá-lo.
3. Preferir rollback de deployment Vercel se ação disponível e autorizada; alternativa: PR revertendo **apenas o commit de merge afetado**, sem force-push/reset.
4. Após rollback, confirmar `READY`, SHA e alias `www.moretegra.com.br` e validar o cenário afetado; registrar novo estado SFJM.
5. **Este commit/documentação não faz rollback**. Não prometer que um deployment foi restaurado sem confirmação live.

## 10. Próxima ação segura e estratégia
A prioridade é obter a **captura pós-PR #550** do C3 em produção no celular, comparando com a foto anterior. Se persistir área branca, investigar separadamente: `getBoundingClientRect` medido pelo filho, CSS vigente no pai, altura CSS efetiva do iframe, comportamento de `ResizeObserver` e conteúdo do iframe. Corrigir somente se confirmado. Usuário pode continuar validando direto em produção se LVR não estiver disponível, com rollback pronto.
Depois, se o usuário pedir, retomar C8/C9 via coletor separado e JSON real, respeitando os bloqueios.

## 11. Documentação relacionada e continuidade
- `docs/sfjm/MNT_COMPLEXO_C8_C9_UX_MOBILE_SELETOR_TOPO_2026-11-05.md` — branch isolada C8/C9.
- `docs/sfjm/MNT_COMPLEXO_CENARIOS8_9_EDITOR_PRANCHA7_2026-11-05.md` — branch isolada C8/C9.
- `docs/sfjm/MNT_COMPLEXO_UX_MOBILE_RELEASE_2026-11-05.md`
- `docs/sfjm/MNT_COMPLEXO_REGRESSOES_CONTROLES_MOBILE_2026-11-05.md`
- `docs/sfjm/MNT_COMPLEXO_LIMPEZA_GLOBAL_CONTROLES_REDUNDANTES_2026-11-05.md`
- `docs/sfjm/MNT_COMPLEXO_LIMPEZA_EDITORIAL_2026-11-05.md`
- `docs/sfjm/MNT_COMPLEXO_SIMULADORES_ANTES_PERSPECTIVAS_2026-11-05.md`
- `docs/sfjm/MNT_COMPLEXO_LINGUAGEM_VISITANTE_2026-11-05.md`
- `docs/sfjm/MNT_COMPLEXO_C3_ALTURA_IFRAME_MOBILE_2026-11-05.md`

**Atualização SFJM desta sessão é documentação somente**; validar qualquer deployment que GitHub/Vercel dispare por atualização de documentos. O SHA de produção funcional acima é o baseline da funcionalidade antes da atualização documental.
