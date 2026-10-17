# RESF 2.0 — Arquitetura e plano de adoção (proposta)
Data: 2026-10-10
Status: CANDIDATE_IN_PR / NO_RUNTIME_MUTATION
Base revisada: main 9c8bdc74cb83dc9c9566f87d9288daf25f10c051

## Decisão proposta
Manter monorepositório e HTML/CSS/JS vanilla, com **monólito modular em código-fonte e HTML completo pré-renderizado em deploy**. Não introduzir React, Next.js, backend, novos serviços ou mudança de provedor de lead. Um gerador estático é candidato futuro; **não está aprovado nem implementado nesta fase**.

## Restrição de canonicalidade
Prevalecem BOOTSTRAP_CANONICO, CURRENT, PROJECT_STATUS, NEXT_SAFE_ACTION, BLOCKED_ACTIONS, baselines V2/V2.3 e ADRs. A próxima ação segura documentada é MNT-SEARCH-IMAGE-AUDIT-01 READ_ONLY. Esta proposta não autoriza publicar alterações, nem declara promoção do piloto regional de Higienópolis a padrão geral.

## Matriz de responsabilidades
| Contrato | Centralizar | Permanecer específico |
|---|---|---|
| Identidade | favicon, logo, cores | estilo local aprovado |
| Hero | estrutura semântica, responsividade e requisitos LCP | URL, corte, alt, texto |
| Facts | quatro quadros para project pages quando aprovados | fatos verificados |
| Media SEO | auditoria de OG/Twitter/JSON-LD/hero e ownership | mídia aprovada por URL |
| Form 46 | contrato tenant 313/form 46, validação e eventos | contexto do interesse |
| SEO | obrigatoriedade de title, description, canonical, H1, robots | intenção, copy e FAQ |
| JSON-LD | parse, tipo adequado, paridade factual | entidade e oferta |
| Conteúdo | contabilizar palavras e detectar ausência | sem contagem rígida; revisão editorial |
| Conversion | mnt_lead_success apenas após sucesso real | CTA e jornada |

## Compatibilidade
O domínio www.moretegra.com.br está servido na Vercel Production; GDigital/Green Sales é o backend do Form 46. Não restaurar premissas antigas que colocam Greenn como web production. Preservar responsividade e entrega inicial do hero conforme RESPONSIVE_MEDIA_DELIVERY_STANDARD_V1. Higienópolis regional tem perfil válido **somente em Higienópolis** e Lapa é candidata para segunda região de comparação.

## Sequência de implementação
1. RESF-V2-01: inventário automatizado **somente leitura**, todas as páginas HTML em src-greenn; relatório por rota, sinais de SEO, mídia, form, hero e facts. Sem bloquear PRs existentes.
2. RESF-V2-02: confrontar inventário com sitemaps, rotas reais, GSC e mídia aprovada; classificar PASS/FAIL/EXCEPTION/REVIEW por tipo; nenhuma imagem substituída por inferência.
3. RESF-V2-03: definir schema machine-readable de contratos de página e registro de mídia, comparar Higienópolis e Lapa; aprovar exceções.
4. RESF-V2-04: piloto de extração de componentes em **uma página candidata** com testes e comparação visual mobile, sem gerar conteúdo dinamicamente no cliente. Reversão por PR/commit.
5. RESF-V2-05: lote homogêneo pequeno, QA por rota, validação de formulário e medição de LCP. Generalização somente após gate de produto.

## Critérios de aceite para o inventário
- Varredura sem dependências externas; nenhum arquivo de runtime modificado.
- Relatório JSON completo e agregado legíveis por máquina.
- Não inferir que a simples presença do termo Form 46 garante submit funcional.
- Não inferir que matching OG e hero aumenta ranking nem que imagem é escolhida pelo Google.
- O número de palavras é indicador descritivo, **não bloqueio**; conteúdo duplicado requer análise semântica.
- Não marcar PASS de Core Web Vitals sem teste de campo/laboratório específico.
- Não considerar uma rota publicada/indexável apenas por haver arquivo HTML.

## Gates antes de alterações materiais
Resolver novamente SHA de main e branches/PRs relevantes; confirmar contrato comercial e baseline aplicável; criar PR em branch; usar validações existentes + navegação/visual mobile + Form46 sem leads de QA em previews; não afetar GTM, GA4, Consent Mode; merge só depois de aceite do produto.

## Observações canônicas
Mozae/Nova Vivere usam um desenho de hero/facts, enquanto Ária emprega estrutura mt-hero e CSS compartilhado. A uniformização visual é alvo futuro, não permissão para substituir a experiência existente. FAQPage só se FAQ visível e em paridade; páginas regionais não recebem Product/Offer por convenção generalizada sem aprovação.

## Product Authority scope decision — 2026-10-10
- **CAPIITOLO** (`/empreendimentos/capiitolo-piero-lissoni/`) and **DSG Itaim** (`/empreendimentos/dsg-itaim/`) are explicitly **EXCLUDED_FROM_RESF_V2**.
- Preserve existing published pages as-is; no hero, facts, form, CSS, copy, SEO/schema, image or architecture migration under this program.
- Read-only inventory may count them to preserve traceability, but they must not be counted in the migration backlog, pilot selection, or noncompliance totals.
- Existing observations about dynamic composition remain historical evidence only; they do not authorize changes.
- Reintroduction requires a separate explicit Product Authority decision and new bounded scope.
- Expected migration scope from the current source inventory: **36 candidate pages** (23 exact-project + 13 region), subject to sitemap/publication verification. Total 44 HTML source files remains unchanged.
