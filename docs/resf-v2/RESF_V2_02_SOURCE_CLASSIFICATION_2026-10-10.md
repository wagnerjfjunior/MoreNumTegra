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

## Investigation of the two flagged routes (2026-10-10, main source read)
**CAPIITOLO**
- `src-greenn/empreendimentos/capiitolo-piero-lissoni/index.html` uses bootstrap `<main class="mnt-bootstrap">` and browser `fetch("/experiments/capiitolo-editorial-v3/index.html")`; a DOMParser flow replaces/adapts fetched markup.
- Initial HTML includes title, canonical and some factual text, but full hero/facts/form presentation is client-dependent. The static selector alerts therefore do **not** demonstrate the final runtime lacks these sections.
- SEO risk to examine: Google can render JS but depends on successful fetch/render; verify Google-selected canonical, actual rendered DOM, request dependency, network failure fallback, and source-vs-rendered structured data. Do not claim deindexing without GSC evidence.

**DSG Itaim**
- `src-greenn/empreendimentos/dsg-itaim/index.html` similarly fetches `/experiments/dsg-itaim-editorial-v3/index.html` and replaces/adapts the document.
- Bootstrap preface says `PIERO LISSONI · SÃO PAULO · EM CONSTRUÇÃO`, while the **same initial HTML** describes DSG as `empreendimento entregue`. This is an internally inconsistent source statement and appears to include copy inherited from CAPIITOLO. Mark `P0_FACTUAL_COPY_REVIEW`; commercial authority must validate the correction before publication.
- The initial DOM is a fallback, not a full equivalence to a static commercial page. Assess loss of images, Form46 and copy if the fetch fails.
- These pages are potential **pilots for removing unnecessary runtime-fetch coupling**, but only after determining their existing production contracts and alternative static source. Do not rebuild wholesale or merge without tests.

**Implication for RESF architecture**
- Static build-time composition can eventually remove this client-fetch dependency while retaining identical output content, but it is only a proposed migration after a bounded proof.
- Add classification `CLIENT_FETCH_COMPOSITION_REVIEW` to the audit contract (candidate future enhancement), never silently treating client-only content as absent or present.

## Product Authority scope decision — 2026-10-10
- **CAPIITOLO** (`/empreendimentos/capiitolo-piero-lissoni/`) and **DSG Itaim** (`/empreendimentos/dsg-itaim/`) are explicitly **EXCLUDED_FROM_RESF_V2**.
- Preserve existing published pages as-is; no hero, facts, form, CSS, copy, SEO/schema, image or architecture migration under this program.
- Read-only inventory may count them to preserve traceability, but they must not be counted in the migration backlog, pilot selection, or noncompliance totals.
- Existing observations about dynamic composition remain historical evidence only; they do not authorize changes.
- Reintroduction requires a separate explicit Product Authority decision and new bounded scope.
- Expected migration scope from the current source inventory: **36 candidate pages** (23 exact-project + 13 region), subject to sitemap/publication verification. Total 44 HTML source files remains unchanged.
