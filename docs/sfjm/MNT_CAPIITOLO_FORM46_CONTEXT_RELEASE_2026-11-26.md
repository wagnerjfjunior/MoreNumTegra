# SFJM — MoreNumTegra CAPIITOLO Form46: contexto comercial e release (26/11/2026)

## Escopo e fontes de verdade

- Repositório canônico: `wagnerjfjunior/MoreNumTegra`. Execução exclusivamente da contextualização comercial do CAPIITOLO; PR de performance #641 e posterior #643 não foram alteradas.
- Evidência real de produção, 26/11/2026: HAR de CAPIITOLO e captura do contato Greenn. POST `https://back.gdigital.com.br/form/register`, `tenant_id=313`, `form_id=46`, `title=MoreEmUmTegra`, HTTP 200 e contato registrado. `texto-livre` recebido antes do fix: `CAPIITOLO by Piero Lissoni | Condições e disponibilidade`.
- **A captação do lead funcionava**: defeito era a perda da unidade e condição de pagamento. Dados pessoais dos HARs/screenshot não foram inseridos no repositório.
- Evidência de CI anterior: #640 commit `ff9f62e8e2e4433a5200b954f44be7385892fb42`, job `139853901771`; PR #641 job `139862596841`. Esperado `Condições e disponibilidade — CAPIITOLO, unidade 33, promocional`, obtido `Condições e disponibilidade`. Problema anterior ao piloto de performance.

## Causa raiz demonstrada

O adaptador `src-greenn/empreendimentos/capiitolo-piero-lissoni/index.html` busca `experiments/capiitolo-editorial-v3/index.html`, insere a seção de condições e reescreve todo o documento com `document.open(); document.write(); document.close();`. O controlador legado `chooseCondition()` e a vinculação dos eventos ocorriam **após** essa substituição, fora da inicialização confiável do documento efetivo. O runtime compartilhado `src-greenn/preview/runtime.js` utiliza uma tabela de intenção com valor exato genérico: `conditions → Condições e disponibilidade`. Como a opção detalhada não era inicializada no documento efetivo, o click do CTA preservava a intenção genérica no `select#mt-lead-intent`; `composeLeadContext` enviava o mesmo contexto genérico à Greenn.

## Solução implementada

1. `experiments/capiitolo-editorial-v3/index.html`: controlador comercial inicializado no HTML que realmente é escrito/renderizado, **antes** do runtime compartilhado diferido. Seleciona por padrão `promocional`; reconhece `?condicao=avista` e `?condicao=promocional`, alterna botões/valores/descrições e preserva a opção específica após CTA de condições, inclusive se o usuário havia escolhido manualmente outro interesse.
2. `src-greenn/preview/runtime.js`: sanitização **restrita à identidade exata** `CAPIITOLO by Piero Lissoni`, removendo o nome abreviado `CAPIITOLO` redundante do interesse detalhado antes do prefixo de projeto no payload. Não modifica Form46, Form47, outros empreendimentos, contratos de endpoint ou mensuração.
3. `scripts/validate-m5-06-cta-form-journey.mjs` e `.github/diagnostics/m5-06-cta-form-smoke.mjs`: asserções de inicialização no documento efetivo, CTAs hero/preços, alternâncias, URL, visita, intenção manual, payload multipart interceptado, nome sem duplicação; mocks impedem POST real na Greenn.

**Contrato comercial conservado:** unidade 33, referência promocional R$ 3.350.000, referência à vista R$ 3.135.000; essas referências são do código auditado, não afirmam preço vigente, estoque ou disponibilidade. Nenhuma alteração de preço, campanha, player/hero da homepage, robots, WebMCP, consentimento, GTM/GA4/Clarity, formulário, API ou dados comerciais DSG.

**Texto final testado (exato):**

```text
CAPIITOLO by Piero Lissoni | Condições e disponibilidade — unidade 33, promocional
CAPIITOLO by Piero Lissoni | Condições e disponibilidade — unidade 33, à vista
CAPIITOLO by Piero Lissoni | Agendar visita
```

O `select` mostra `Condições e disponibilidade — CAPIITOLO, unidade 33, promocional/à vista`; o runtime elimina o segundo nome de empreendimento **somente** no payload final.

## Testes e gates

- **PASS — M5-06 CTA/Form46**: GitHub Actions job [139877689640](https://github.com/wagnerjfjunior/MoreNumTegra/actions/runs/45810757182/job/139877689640), head `9bd4aedcae72eca1562a670c51d88063f2cd7a4e`. Validação estática e smoke de todos os CTAs suportados, incluindo **33 cenários específicos de payload CAPIITOLO em Chromium, Firefox e WebKit, mobile/desktop**; POST `multipart/form-data` capturado com interceptação de rede e dados sintéticos, sem criar leads reais.
- **PASS — gate Consent V3** (`bootstrap` job `139877688958`): o arquivo adaptador protegido permanece idêntico à baseline. Não houve exceção ou relaxamento de `verifiedPreV3`.
- **PASS — sitemap lastmod** `139877689081`, **commercial page standard** `139877689288`, **FGTS E2E** `139877689109`, imagens, metadata, favicon, reciprocidade regional, demais verificações verdes.
- **FAIL preexistente, fora do escopo #1**: [job 139877689795](https://github.com/wagnerjfjunior/MoreNumTegra/actions/runs/45810757125/job/139877689795) — validador legado `scripts/validate-m5-10-elo-late-gtm-bootstrap-slice07.mjs` reclama da idempotência/caminho da tag GTM. A mesma falha foi observada na primeira execução da correção, job `139875938734`, anterior à solução final. Nenhum arquivo de GTM/consentimento ou ELO sofreu diff nesta PR.
- **FAIL preexistente, fora do escopo #2**: [job 139877688769](https://github.com/wagnerjfjunior/MoreNumTegra/actions/runs/45810756978/job/139877688769) — M5-07 semântica de eventos: `#visita a[href^="https://wa.me/"]` esperado `placement=content`, recebido `negotiation`. Os quatro cenários CAPIITOLO de `mnt_intent` executados no mesmo job passaram; `measurement-core.js` e regras de placement ficaram fora da PR.
- **Decisão de gate:** a `main` estava `protected=false` sem checks exigidos pelo branch protection; os dois FAILs acima não constituem regressão nem privacidade/CRM alterada pela frente. M5-06 e consentimento foram aprovados sem remover/enfraquecer qualquer validador. A autorização específica do proprietário abrangia merge/produção. Dívida de CI dessas duas frentes continua aberta para tratamento independente.

## Rastreabilidade da release

- PR funcional: [#642](https://github.com/wagnerjfjunior/MoreNumTegra/pull/642) — **MERGED**.
- Head testado: `9bd4aedcae72eca1562a670c51d88063f2cd7a4e`.
- Merge `main`: `a029b8c066d42e03bd7bc4af9dfc6e9b8cb927d0`.
- Vercel production: `dpl_9VT6rYAkHKv8xLaPKvPc4VSBVL5w` — **READY**, `source=git`, SHA GitHub igual ao merge, `aliasError=null`.
- Projeto Vercel: `morenumtegra`; aliases verificados: `www.moretegra.com.br`, `moretegra.com.br` e `lp.moretegra.com.br`.
- Inspeção: https://vercel.com/wagnerjfjunior-3025s-projects/morenumtegra/9VT6rYAkHKv8xLaPKvPc4VSBVL5w
- Página: https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/
- À vista: https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/?condicao=avista
- Promocional: https://www.moretegra.com.br/empreendimentos/capiitolo-piero-lissoni/?condicao=promocional
- Release é do **código**, não valida oferta comercial vigente.

## Auditoria complementar DSG Itaim

HAR real do DSG: POST Greenn Form46 HTTP 200, contexto `DSG Itaim | Condições e disponibilidade`. O adaptador DSG também reescreve documento, mas não apresenta seletor de condições comerciais equivalente. O HAR não prova perda de condição vinculada ao clique específico nem autoriza transportar unidade/valor do CAPIITOLO para DSG. **Nenhum arquivo DSG alterado.**

## Pendências e próxima ação segura

A homologação final na interface real Greenn depende de novo lead comercial **autorizado e enviado pelo proprietário**, conferindo o `texto-livre` de promo/à vista e visita. Testes CI foram **interceptados**, portanto não são comprovação de nova gravação real na Greenn. Verificar em produção, sem alterar preço ou estoque, se os contextos esperados aparecem nos registros, guardar evidência sem PII no GitHub e manter separados os débitos de M5-10 GTM e M5-07 placement. Rollback somente por release governada, nunca reset/force push em main.
