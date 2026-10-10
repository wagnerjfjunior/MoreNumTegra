# RESF-V2-02 — Matriz de classificação do código-fonte
Data: 2026-10-10
Status: READ_ONLY_SOURCE_AUDIT / PR_CANDIDATE / NO_RUNTIME_CHANGE

## Execução verificável
- GitHub Actions run: https://github.com/wagnerjfjunior/MoreNumTegra/actions/runs/38067823955
- Validated source commit: 8f58c322d717d8d0da85efd0651975b7fc512ad0
- CI conclusion: SUCCESS
- JSON + Markdown artifact: resf-v2-inventory, run 38067823955
- Auditor: scripts/audit-resf-v2-pages.mjs

## Matriz por tipo de arquivo
| Tipo | Arquivos | Interpretação |
|---|---:|---|
| Empreendimento / exact-project | 25 | Fonte candidata a página comercial |
| Região | 13 | Fonte candidata a página regional |
| Fragmento, preview ou rota especial | 6 | Excluído de auditoria comercial genérica |
| TOTAL | 44 | Arquivos HTML examinados, **não** URLs indexadas |

## Resultado dos sinais estáticos
- 36 das 38 fontes comerciais não sinalizaram divergências segundo **os seletores atuais do auditor**; isso **não constitui validação funcional, visual, de SEO ou mídia**.
- 2 fontes comerciais exigem revisão:
  - empreendimentos/capiitolo-piero-lissoni/index.html → HERO_VARIANT_REVIEW, FACTS_VARIANT_REVIEW, FORM_JOURNEY_REVIEW.
  - empreendimentos/dsg-itaim/index.html → HERO_VARIANT_REVIEW, FACTS_VARIANT_REVIEW, FORM_JOURNEY_REVIEW.
- Os sinais podem ser falso positivo de CSS, DOM ou semântica. Não classificar como erro sem inspeção específica.
- Nenhum JSON-LD sintaticamente inválido detectado no inventário agregado anterior, sem equivaler a validação Rich Results.

## Backlog priorizado
1. P0 READ_ONLY: comparar CAPIITOLO e DSG com contratos já aprovados. Registrar variante legítima vs necessidade de ajuste, sem tocar conteúdo factual.
2. P0 READ_ONLY: concluir ownership de imagens em todas as 38 fontes comerciais: hero visível, OG, Twitter, JSON-LD, alt, tipologia, conflitos com Person/Sabrina; **não trocar mídias sem origem e aprovação**.
3. P1 READ_ONLY: confrontar as 38 fontes com sitemap, redirects, Vercel rewrites, canonical live, GSC; classificação de arquivo ≠ rota indexável.
4. P1 DESIGN: definir contrato de quatro quadros de facts **somente** para exact-project quando aprovado. Não exigir facts em todas as páginas regionais.
5. P1 DESIGN: definir Form46 compartilhado preservando tenant 313, form 46, source/context, consentimento, analytics e sem API nova.
6. P1 PILOT gated: escolher implementação estrutural representativa com baseline visual/performance e QA; somente depois decidir gerador estático ou extração do CSS/JS.

## Pendências que não podem ser tratadas como concluídas
- MNT-SEARCH-IMAGE-AUDIT-01 completo por rota ainda pendente.
- URLs publicadas versus arquivos de fonte não reconciliadas com GSC.
- Nenhuma aprovação para universalizar Higienópolis regional.
- Nenhuma execução de migração, mudança de formulário, publicação ou merge nesta etapa.
- Testes físicos mobile, Form46 E2E, LCP/INP/CLS e validação de negócio continuam necessários antes de qualquer release.
