# CDP V3 — editor comercial de valores (protótipo isolado)
Data: 2026-10-15
Status: PROTOTYPE_ONLY / NO_RUNTIME_MUTATION / NOT_AUTHORIZED_FOR_PRODUCTION

## Contratos preservados
- docs/architecture/MNT_COMMERCIAL_DATA_PLANE_V3.md
- docs/architecture/MNT_COMMERCIAL_DATA_SCHEMA_V3.schema.json
- docs/architecture/MNT_COMMERCIAL_UPDATE_MEDIUM_REENTRY_2026-09-22.md
- docs/product/PA_MNT_HOME_COMMERCIAL_TRUTH_2026-09-22.md

O frontend em `prototypes/cdp-v3-commercial-editor/index.html` é estático, local e isolado. Não lê/escreve snapshot publicado, não autentica, não integra FECH.AI, não modifica Home, página, Form46 ou Schema.org. Exporta apenas JSON de **proposta não aprovada**, sem assumir compatibilidade automática com o schema de publicação v3.

## Decisão comercial aprovada pelo operador
Duas opções mutuamente exclusivas, apresentadas como checkboxes:
1. `direct`: valor final já negociado, sem aplicar novo desconto;
2. `vpl`: valor nominal de tabela com percentual comercial de desconto (VPL comercial, **não** valor presente líquido).

Cálculo: `precoFinal = valorTabela * (1 - percentual/100)`; `precoM2 = precoFinal / areaM2`. Proibir valor final não positivo, área não positiva, VPL fora de 0..100 e campos essenciais ausentes. Fonte, justificativa e conferência explícita são obrigatórias para exportação. Exportar rascunho não equivale a aprovação/publicação.

Exemplo comercial **aprovado como referência da página**: Bueno Brandão 257, unidade 31, 500 m², R$ 21.750.000, R$ 43.500/m². O valor de tabela R$ 25.000.000 e VPL 13% são **exemplo aritmético**, não confirmação de tabela vigente. O Fact Pack C17 contém divergência histórica a preservar e reconciliar.

## Gate seguinte
- Revisar protótipo em desktop/mobile e validar cálculos e campos com operador.
- Reconciliar preço aprovado e conflito histórico no C17 e registrar no SFJM antes de alteração da página.
- Escolher provedor de publicação conforme gate CDP V3; definir autenticação/autorização, audit trail, snapshots versionados, rollback, read/write separados, CORS/cache/fail-closed.
- Somente depois mapear o editor para candidate snapshot v3 e consumidores, sem regressão de Home/SEO.
- Não publicar o protótipo como administração operacional nem mergear sem autorização.

## Rollback
Branch isolada `feat/cdp-v3-commercial-editor-ui-20261015`, base `dedd52efe5d39b48abfeda866a7da9e87eb3f690`. Sem alterações em runtime; descartar a branch/PR reverte integralmente o protótipo.

## 2026-10-15 — Hardening e testes propostos
- Entrada monetária: somente números sem separadores de milhar; vírgula ou ponto são decimais. `25.000.000` é rejeitado; utilizar `25000000`. Bloqueio de valor final acima de `Number.MAX_SAFE_INTEGER`.
- Arquivo de regressão: `prototypes/cdp-v3-commercial-editor/pricing.test.mjs`, execução prevista com `node --test prototypes/cdp-v3-commercial-editor/pricing.test.mjs`.
- Cenários: Bueno direto, VPL 13%, prevenção de desconto duplo, vírgula decimal, formatos ambíguos, desconto inválido, área/valor zero, limite numérico.
- Status dos testes: **NÃO EXECUTADOS / NÃO CERTIFICADOS** nesta etapa; script de teste é independente e não exercita DOM/browser. QA visual/mobile, acessibilidade, consistência de arredondamento e integração CDP V3 seguem pendentes.

## Testes executados em 2026-10-15

Node.js v22.16.0: 8 testes aritmeticos PASS, 0 FAIL. Os testes sao independentes do codigo da interface e nao certificam a integracao DOM. QA visual/mobile permanece pendente. A transferencia do HTML exato do GitHub ao navegador local foi impedida por indisponibilidade de DNS. Proximo gate: teste integrado usando a mesma logica do frontend, verificacao da exportacao JSON e aprovacao antes de merge.

## 2026-10-15 — Shared pricing module and local verification
- Frontend imports `./pricing.mjs` via native ES module; `pricing.test.mjs` imports the exact same API. This eliminates the previously duplicated arithmetic logic.
- Local Node v22.16.0 execution on a reconstructed copy of module/test source: **10 PASS / 0 FAIL**. This is not a GitHub CI receipt and does not certify exact deployed bytes or browser integration.
- Direct mode ignores VPL; VPL is a commercial percentage, not financial present value. Percentage 100% is rejected because resulting published price would be zero. Monetary inputs prohibit thousands separators. Price and price/m² are rounded to cents.
- Next gate: check PR head and CI, browser QA with mobile viewport, checkbox selection, input validation, JSON export, and schema-mapping of draft to canonical v3 candidate. No public consumer mutation, admin credentials or publication authorized.

## Browser QA reproducivel

O arquivo `prototypes/cdp-v3-commercial-editor/browser_qa.py` automatiza verificacao em Chromium nas larguras 390 e 1280 px, incluindo modo direto, VPL, exportacao JSON, rejeicao de desconto invalido, overflow e erros JS. Exige Playwright Python/Chromium no ambiente de QA. Status: SCRIPT CRIADO, EXECUCAO DO HTML EXATO DA PR NAO CERTIFICADA. Sem autorizacao para merge ou publicacao. O CDP V3 continua sem provedor de escrita/leitura selecionado e sem consumidores integrados.
