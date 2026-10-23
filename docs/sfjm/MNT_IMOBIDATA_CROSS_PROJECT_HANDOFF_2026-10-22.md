# SFJM — Retomada cruzada MoreNumTegra + sfjm-imobidata (22/10/2026)

## Não perder o contexto ImobData
**Outro repositório canônico:** `wagnerjfjunior/sfjm-imobidata` (`main@f4b7db5a5317d58728157033b7cafddc2bce83f4` verificado). ImobData V1 anteriormente declarada operacional e validada em produção, PR #7 incorporada. Escopo: cadastro GitHub, inventário de páginas/ativos, robots/sitemaps, redirects, auditoria SEO/GEO/IA, CSV. V2: sitemaps filhos, SEO on-page, comparativos e sincronização. CSVs `sfjm-imobidata-buenobrandao257.com-inventario.csv`, `sfjm-imobidata-buenobrandao257.com-seo-geo-ia.csv` e v2 fazem parte do histórico de auditoria. Ver handoff no repositório ImobData, branch `sfjm/handoff-multiprojeto-20261022`, arquivo `handoffs/SFJM_CROSS_PROJECT_HANDOFF_2026-10-22.md`. Não reduzir o estado do projeto a alterações de cards.

## MoreNumTegra — decisão comercial e tarefas
- PR #470 Draft: `sfjm/ampere-hero-facts-mobile-20261022`, hero+FACTS Ampère, sem merge confirmado.
- PR #471 Draft: `sfjm/capiitolo-ampere-home-price-cards-20261022`, cards e páginas individuais. Valores aprovados: CAPIITOLO unidade 33 R$ 3.350.000 (promocional) e R$ 3.135.000 (à vista); Ampère unidade 62 R$ 3.990.700 (promocional) e R$ 3.791.165 (à vista).
- Redação RESF pública mandatória: sem fonte interna, cálculos, justificativas, metadiscurso ou atributos técnicos não solicitados. Normal: “Preço a partir de”, valor, “Unidade XX · condição promocional de referência R$ XX. Consulte a Tegra Vendas para confirmar a vigência, valores promocionais e disponibilidade.” À vista: “À vista”, “R$ XX à vista*”, “*Unidade XX · condição à vista de R$ XX. Consulte a Tegra Vendas para confirmar a vigência, valores promocionais e disponibilidade.” Mesmo destaque visual para os cards à vista dos dois projetos.
- **Próxima implementação pendente:** tal como Órbita Tatuapé, permitir que os cards normal/à vista abram a página individual com a **condição correspondente já selecionada**; preservar query param, alternância de condições, copy objetiva, integração de formulário, JSON-LD/FAQ e acesso mobile. A intenção foi solicitada pelo usuário e ainda não foi implementada.
- Handoff baseado em trabalho anterior, não é confirmação de estado live. Antes de mudar/release, verificar `main`, PRs, CI, deployment, rotas, SEO, fontes e baselines.
- Usuário quer encerrar rapidamente a correção de preços, publicar após validação e então solicitar reindexação de Home, CAPIITOLO e Ampère. Não afirmar merge/deploy/indexação antes da evidência.

## Orientação SFJM
Ler bootstrap/BOOTSTRAP_CANONICO.md, handoffs/CURRENT.md, docs/PROJECT_STATUS.md, docs/NEXT_SAFE_ACTION.md, docs/BLOCKED_ACTIONS.md, RESF, baselines aplicáveis. Recuperar também estado canônico do repo sfjm-imobidata e suas entregas e pendências. Não executar mudança em produção nesta etapa documental.
