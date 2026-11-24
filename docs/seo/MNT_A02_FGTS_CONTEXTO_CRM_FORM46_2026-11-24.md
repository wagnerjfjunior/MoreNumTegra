# A02 — Preservação da origem FGTS no Form46 (PR isolada)

Data: 24/11/2026
Escopo autorizado: "preservar o interesse FGTS junto com o empreendimento e a intenção no campo texto-livre do Form46. Prepare uma PR isolada, sem merge."
Repo: `wagnerjfjunior/MoreNumTegra`
Main de partida: `2f2d5b5dba204d78064df6ac94d43c95c4835178`
Estado: PREPARADO EM BRANCH — CI E QA DE RUNTIME A CONFERIR — SEM MERGE/DEPLOY.

## Defeito que esta PR resolve

O guia FGTS da área Mercado tinha links para `/?estagio=pronto#oportunidades` e três páginas comerciais, mas não carregava o atributo de origem ao sair do artigo. A homepage preservava a intenção FGTS apenas para o atalho direto `/?interesse=FGTS%20para%20comprar%20apartamento#formulario`. Ao navegar pelo catálogo para páginas de empreendimentos, o CRM recebia `<empreendimento> | <intenção>` sem indicação de que o visitante iniciou a jornada pelo guia.

## Contrato exato proposto

Somente para `data-form-id="46"` e quando a URL tiver **um** dos valores exatos:
- `origem=fgts` (quando vem do guia ou do catálogo); ou
- `interesse=FGTS para comprar apartamento` (atalho legado do guia ao Form46 da homepage).

O campo `texto-livre` passa a ser:
- Com empreendimento: `<empreendimento> | <intenção selecionada> | Interesse: FGTS`.
- Sem empreendimento: `Orientação FGTS na compra de apartamento | Simular forma de pagamento | Interesse: FGTS` quando utilizado o atalho do guia.
- Em outras jornadas: **inalterado**, sem sufixo.
- No `form_id=47` RJ: **inalterado**, mesmo se um visitante inserir `origem=fgts` manualmente.

**Não afirmar que algum comprador, unidade ou projeto seja elegível ao FGTS**. O marcador indica interesse comercial, não pré-aprovação de crédito.

## Mudanças delimitadas

1. `src-greenn/blog/mercado/usar-fgts-comprar-apartamento/index.html`: 9 links editoriais existentes passam a incluir `origem=fgts`; três atalhos diretos `?interesse=FGTS...` permanecem válidos. Conteúdo, layout, JSON-LD, title e canonical inalterados.
2. `src-greenn/moretegra.js`: apenas `detailUrlFor()` adiciona `origem=fgts` aos links **internos para /empreendimentos/** gerados no catálogo quando a visita chegou com um marcador FGTS válido. Preserva parâmetros já existentes (`unidade`, `condicao`) e o fragmento (`#valores`). Não cria nova rota indexável.
3. `src-greenn/preview/runtime.js`: `composeLeadContext(form)` acrescenta ` | Interesse: FGTS` somente no Form46 com parâmetro autorizado. Se o visitante ainda não escolheu um empreendimento, usa **somente no texto de CRM** o rótulo `Orientação FGTS na compra de apartamento`, sem inventar projeto ou alterar o contexto Measurement; no atalho direto com `?interesse=FGTS...`, reutiliza a pré-seleção **já existente** em `src-greenn/moretegra.js` de `Simular forma de pagamento`, opção que o visitante pode modificar. Nenhum novo manipulador de seleção foi adicionado ao runtime. Mantém assinatura, validação, `fetch`, endpoint, payload de campos, `FormData`, privacidade/consentimento e fluxo de sucesso/erro.
4. `src-greenn/preview/index.html`: atualização restrita ao query versionador de `moretegra.js` para evitar reutilização do JS anterior na homepage.
5. `sitemap.xml`: `lastmod=2026-11-24` apenas na homepage e artigo FGTS; todas as outras URLs mantêm seu estado.

## Matriz de testes obrigatórios antes de merge

| ID | Percurso/entrada | Esperado |
|---|---|---|
| T01 | Artigo -> `/?estagio=pronto&origem=fgts#oportunidades` | filtro `entregue`, badge/contagem coerentes, catálogo móvel funcional |
| T02 | Catálogo FGTS -> card do Elo Duo -> Conhecer empreendimento | URL `/empreendimentos/caminhos-da-lapa-elo-duo/?origem=fgts` |
| T03 | Catálogo FGTS -> card do Órbita/unidade -> Conhecer empreendimento | preservar `?unidade=...&origem=fgts#valores`; nenhum parâmetro substituído |
| T04 | Guia -> Órbita, Elo Duo ou Soma diretamente | URL `?origem=fgts`; formulário local com `data-form-id=46` |
| T05 | Guia -> `/?interesse=FGTS%20para%20comprar%20apartamento#formulario` | prefill de "Simular forma de pagamento" e contexto FGTS sem projeto |
| T06 | Página de projeto FGTS -> intenção "Simular forma de pagamento" -> Form46 | `texto-livre = <nome do projeto> | Simular forma de pagamento | Interesse: FGTS` |
| T07 | Página de projeto normal sem marcador -> Form46 | `texto-livre` exatamente igual ao contrato vigente, sem `Interesse: FGTS` |
| T08 | Form47/RJ com `?origem=fgts` | `texto-livre` sem qualquer sufixo FGTS |
| T09 | Tentativa de envio inválido | mantém validações sem POST; não inventa lead |
| T10 | Envio real Form46 / endpoint /obrigado / CRM | **somente com teste de atendimento autorizado**; comprovar campo no CRM, não inferir pela resposta HTTP |
| T11 | Mobile 360/390/430 e desktop 900/1440 | links, filtro, CTA, teclado/foco, canal e formulário sem regressão |
| T12 | Google canonical e robots | canonicals originais mantidos; `?origem=fgts` é parâmetro de jornada, não página independente indexável |

## Regressões bloqueadoras

- Nenhuma mudança no Form47/RJ, WhatsApp, CRM downstream, nome/contato da corretora, CTA comercial, preços, fotos, CSS, schema, GTM/GA4 ou consentimento.
- Não converter visita, clique ou submit attempt em `generate_lead`; os eventos permanecem como estão.
- Não modificar validadores históricos para fazer passar o CI.
- Não introduzir cookies persistentes, nova sessão de rastreamento, tokens, PII em URLs ou campos novos no Form46.
- Não afirmar que o uso FGTS é aprovado para unidade ou salas comerciais.
- Preservar SEO e os padrões SFJM/RESF para HTML/CSS/JS.

## Testes determinísticos de funções — execução 24/11/2026

Executados sobre as funções **extraídas do código da branch**, em ambiente isolado com implementações mínimas de `URL` e `URLSearchParams`; não correspondem a Playwright nem a interação com o CRM:

- **7/7** cenários de composição do `texto-livre` passaram: atalho direto, catálogo sem projeto, Órbita com projeto, tráfego não-FGTS, Form47/RJ, origem diferente e origem visualmente semelhante porém inválida;
- **5/5** cenários de links de catálogo passaram: preservação de `unidade` e `#valores`, ausência de origem, URL canônica sem parâmetro inicial, origem inválida e destino externo não modificado;
- **1/1** checagem de preseleção direta: existe opção `Simular forma de pagamento` e a função `prefillInterestFromUrl()` existente em `src-greenn/moretegra.js` a ativa somente no atalho exato de orientação.

**Total: 13/13 verificações funcionais isoladas.** É proibido interpretar esse teste como validação do DOM real no LVR, sucesso de POST ou recebimento do lead no Green.

A workflow `Mercado editorial 11 draft gates` falhava no head inicial por comparar `vercel.json.redirects` com uma baseline imutável de outubro, devido ao redirecionamento `/src-greenn/complexo-lapa-pirituba/index.html`. A PR FGTS não edita `vercel.json` nem o validador; registrar como **falha herdada**, sem alterar contratos ou relaxar testes. O conjunto final de checks da PR deve ser novamente avaliado após a última atualização.

## Limites e próxima validação

- Esta alteração preserva a origem até o **primeiro empreendimento escolhido pela navegação explícita** a partir do artigo ou do catálogo. Se o usuário partir para uma segunda página de projeto por links relacionados que não carregam `origem=fgts`, o contexto não segue automaticamente; isso permanece fora do escopo desta PR. Evitar um marcador permanente na sessão que atribua erroneamente outras visitas a FGTS.
- Teste de envio real deve usar credenciais de teste/lead autorizado e conferir o `texto-livre` na Green; não criar lead real sem autorização específica.
- A `main` contém divergência documental: handoffs e NEXT_SAFE_ACTION ainda descrevem #595 como não mesclada, embora GitHub registre #595/#596 integradas. Resolver governança em fluxo distinto (#598), sem sobrescrever a hierarquia aqui.
- Ferramentas desta preparação não executarão merge, deploy, produção ou IndexNow. QA runtime/LVR e confirmação CRM continuam gates independentes.
