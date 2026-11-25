# MoreNumTegra — Retomada “Comparar Product e Offer” / GTM, GA4 e LGPD — 25/11/2026

**Natureza:** handoff de continuidade e reconciliação de fatos, sem mudança de runtime, configuração administrativa, campanha, preço, formulário ou schema.
**Repositório:** `wagnerjfjunior/MoreNumTegra`; fonte integrada: `main`.
**Pedido atual do proprietário (25/11):** transferir o contexto da conversa encerrada “Comparar Product e Offer” para uma nova conversa e atualizar a documentação. O proprietário não consegue executar comandos: nenhuma próxima etapa deve depender de CLI local.
**Escopo da evidência:** mensagens recuperáveis da conversa, decisões anteriores e consulta direta a GitHub/Vercel em 25/11/2026; **não** representa transcrição integral da conversa encerrada nem prova de recebimento de evento pelo Google.

## 1. Fotografia live verificada

| Campo | Valor observado |
|---|---|
| GitHub `main` | `d21d2bb06b90b2e2c52ad4d0f3f64b4058b1e258` (25/11/2026, antes da PR de documentação) |
| Entrega mais recente ligada a mensuração | [PR #628](https://github.com/wagnerjfjunior/MoreNumTegra/pull/628), `MERGED` em 2026-11-25 03:51:47 UTC |
| Commit de integração | `d21d2bb06b90b2e2c52ad4d0f3f64b4058b1e258` |
| Vercel deployment | `dpl_7gpZfxXyvqPjrtS7PxDqZQcgwwaQ`, `READY`, `production`; source SHA `d21d2bb` |
| Ready do deployment | 2026-11-25 03:51:57 UTC |
| Aliases observados | `www.moretegra.com.br`, `moretegra.com.br`, `lp.moretegra.com.br`, além de `*.vercel.app` |
| Vercel projeto | `morenumtegra`, `prj_f8r2PwQ42f38CWUjOGpEStkjmaqt` |
| Aceite E2E real | **PENDENTE**: tráfego de rede, sinais de consentimento, contagem, GA4 e conversão |

**Interpretação:** PR mesclada + Vercel READY + aliases comprovam entrega do código de mensuração ao projeto de produção; não comprovam por si só que Google Tag Assistant/GA4 receberam corretamente todos os eventos, nem que todos os navegadores executaram scripts ou que não existem duplicatas.

## 2. Contexto recuperado da conversa “Comparar Product e Offer”

1. A comparação SEO exige distinguir `Product`, `Offer`, `ApartmentComplex`, `RealEstateAgent` e outras entidades semanticamente adequadas; Rich Results não deve ser otimizado inventando disponibilidade/preço.
2. **Regra comercial:** preço estruturado deve ser coerente com o preço **visível** e vigente. Publicar `Offer` apenas com unidade, preço, disponibilidade e demais condições comprovadas; não reciclar preços antigos para satisfazer Rich Results.
3. **Universo Tatuapé Órbita:** a PR #594 publicou últimas unidades, conteúdo FGTS/Livelo e FAQ sincronizado (12 perguntas), mas removeu `Product`/`Offer` intencionalmente na ausência de preço atual comprovado. A [PR #604](https://github.com/wagnerjfjunior/MoreNumTegra/pull/604) reconciliou validadores específicos sem restabelecer preço. Fonte detalhada: `docs/seo/MNT_ORBITA_RECONCILIACAO_JSONLD_2026-11-24.md`. O validador `validate-orbita-commercial-schema-parity.mjs` ficou como pendência separada; não restaurar schema por obrigação de teste.
4. A frente FGTS foi ampliada de Órbita para um **cluster transversal** de imóveis residenciais prontos de SP; elegibilidade depende de comprador, imóvel e operação. Ações anteriores A01–A03 e A05 (CAPIITOLO/DSG Itaim) são distintas do incidente de mensuração. Não confundir “FGTS em página pronta” com condição automática.
5. A antiga conversa registrou a deficiência transversal de **GTM, GA4 e consentimento LGPD**; o proprietário solicitou solução completa e teste/homologação **diretamente em produção**, sem depender de Preview para aceite funcional.
6. O exemplo concreto de falha reportado pelo proprietário em 24/11 foi:
   `https://www.moretegra.com.br/blog/dicasedecor/iluminacao-apartamento-camadas-circuitos/?gtm_debug=1795578399491`.
   O screenshot/relato dizia que a tag não estava sendo carregada. Isso é evidência **USER_REPORTED de 24/11**, anterior ao merge da #628; não declarar que o mesmo erro persiste ou está definitivamente resolvido sem novo teste.
7. O proprietário pediu repetidamente publicação efetiva, não apenas preparar correção e dizer que está pronta. A PR #628 foi de fato incorporada e o deployment correspondente está READY na produção.
8. SEO dos produtos/RJ e expansão editorial continuaram no mesmo repositório. A PR #626 está em produção pelo deployment anterior `dpl_48bWwRkVfBm59SWF4sPLaXftUKut` (`3db1938`), que não deve ser confundido com o deployment posterior da #628.

## 3. Contrato de mensuração e consentimento

- GTM container: `GTM-PGCR4R47`.
- GA4 property: `553742649`; stream: `15759638334`; Measurement ID: `G-57M2XR0CY2`.
- Host de mensuração de negócio: `www.moretegra.com.br`.
- Funil de eventos: `mnt_page_view`, `mnt_section_click`, `mnt_catalog_filter`, `mnt_catalog_search`, `mnt_intent`, `mnt_form_start`, `mnt_form_submit_attempt`, `mnt_lead_success`.
- Evento principal de conversão: **somente** sucesso real de formulário `mnt_lead_success` → GA4 `generate_lead`. Não contar tentativa de envio, reload nem visita direta a `/obrigado/`.
- Captura SP: `Form 46`; RJ: `Form 47`. Green Sales/GDigital; preservar contrato, roteamento regional e isolamento de dados.
- Consentimento de medição: padrão negado nos sinais `ad_storage`, `analytics_storage`, `ad_user_data`, `ad_personalization`; aceitar/recusar deve atualizar os quatro estados. Não enviar PII (nome, email, telefone, texto livre) ao dataLayer/GA4.
- Diferenciar `dataLayer` como fila de eventos de negócio do efetivo **estado de Consent Mode** reconhecido pelas tags no GTM; verificar ambos no navegador, não só presença literal de `default_consent` no HTML.

## 4. O que a PR #628 efetivamente mudou

**Escopo declarado e verificável na PR:** restaurou inicialização de GTM/default consent em 37 rotas editoriais, Berrini e Complexo Lapa–Pirituba; adicionou runtime compartilhado de consentimento, eventos editoriais e da calculadora e fallback de medição em páginas comerciais; workflow e validador de cobertura global `scripts/validate-global-measurement.mjs`.

O validador estático exige em cada URL do sitemap:
- rewrite `vercel.json` correspondente;
- presença de `GTM-PGCR4R47` e `default_consent`, nesta ordem;
- nas rotas `/blog/`, exatamente um `measurement-editorial.js` e um `runtime.js`;
- dois testes negativos de cobertura.

**Limite:** valida texto de arquivos e rotas; não exerce rede, Google Tag, interação/consentimento real, `generate_lead`, ausência de duplicidade ou recebimento no GA4. Não transformar PASS estático em homologação end-to-end.

Arquivos verificáveis: `src-greenn/blog/measurement-editorial.js`, `src-greenn/preview/runtime.js`, `src-greenn/preview/measurement-core.js`, `scripts/validate-global-measurement.mjs` e HTML das rotas afetadas.

## 5. Diagnóstico específico: “Google Tag lenta / tag ausente”

No HTML integrado da rota `/blog/dicasedecor/iluminacao-apartamento-camadas-circuitos/`, a ordem é:

1. `dataLayer.push({event:"default_consent", ... "denied"})` inline.
2. Bootstrap do container `GTM-PGCR4R47`: já enfileira `gtm.js`, mas **adianta o download da biblioteca apenas após `window.load` ou na primeira interação `pointerdown`/`keydown`**; mantém proteção contra carga duplicada.
3. Scripts defer `/src-greenn/preview/runtime.js` e `/src-greenn/blog/measurement-editorial.js`.

Portanto, a tag pode não ser visível imediatamente no Tag Assistant antes do `load`, sobretudo se o carregamento de mídia ou outra dependência atrasar a conclusão da página. **É hipótese sustentada pelo código, não prova conclusiva do sintoma do screenshot.** Verificar se o container aparece em `Network` após a carga e se consentimento e GA4 disparam nas condições autorizadas.

O `measurement-editorial.js` lê `localStorage["mnt.consent.v2"]`, somente em `www.moretegra.com.br`; o `mnt_page_view` editorial é emitido uma vez quando o script observa `granted`. O armazenamento/atualização da escolha e as tags administrativas do GTM precisam ser conferidos em QA real. A mera presença do snippet não comprova `grant` em Consent Mode.

## 6. Pendências — não declarar resolvidas

**P0 — Homologação funcional em produção, sem comandos do usuário:**
1. Inspecionar por navegador real com `Network`/Tag Assistant o URL do artigo de iluminação, home, hub Blog/Mercado, mais um artigo RJ, Berrini, Complexo, e calculadora (amostra representativa); repetir em desktop/mobile.
2. Confirmar `gtm.js?id=GTM-PGCR4R47` solicitado uma vez (antes/depois da primeira interação e do `load`), status HTTP e ausência de bloqueio/extensão/CSP.
3. Confirmar default denied **antes de qualquer coleta não consentida**, aceite → quatro granted, recusa → quatro denied e persistência/alteração posterior de preferência.
4. Confirmar um `mnt_page_view` por view e eventos de CTA, links e calculadora; sem duplicidade entre `measurement-editorial.js`, `measurement-core.js` e GTM.
5. Confirmar GA4 Realtime/DebugView com `G-57M2XR0CY2` e eventos sem PII, segregando dados de teste; a presença do script não garante coleta efetiva.
6. Confirmar `generate_lead` só após sucesso real e **somente se houver autorização explícita para submissão de lead de teste** no Green Sales, sem criar lead falso em produção sem esse gate.
7. Se o comportamento de carregamento tardio prejudicar Tag Assistant ou coleta, preparar uma PR pequena e específica, com comparação de performance/consentimento e aprovação, em vez de remover o lazy bootstrap indiscriminadamente.

**Outros bloqueios persistentes:** validação do Órbita `validate-orbita-commercial-schema-parity.mjs`, preço atual necessário para eventual `Offer`, QA/GSC/IndexNow de SEO independentes e qualquer configuração administrativa de GTM/GA4 não verificada pelo conector. Não alegar tags publicadas dentro da interface administrativa do GTM sem acesso a ela.

## 7. Única próxima ação segura recomendada

**Executar QA real e não destrutivo do GTM/Consent/GA4 na produção já liberada (PR #628), começando pela rota de iluminação indicada no relato do proprietário.** Confrontar HTML, request `gtm.js`, estados de consentimento, dataLayer, eventos enviados/recebidos, horários e duplicidade; produzir evidência e somente então decidir se há correção adicional.

Essa recomendação não altera a autorização de outras frentes, nem autoriza novo merge/deploy de código. Documentação deste handoff deve entrar via branch + PR com gate SFJM. Não solicitar que o proprietário execute scripts ou CLI.

## 8. Histórico, precedência e lacunas

- `bootstrap/BOOTSTRAP_CANONICO.md`, `handoffs/CURRENT.md`, `docs/PROJECT_STATUS.md`, `docs/NEXT_SAFE_ACTION.md`, `docs/BLOCKED_ACTIONS.md` permanecem ponteiros; a seção de 24/11 é histórica em relação à #628 de 25/11.
- Baselines e contratos formais permanecem válidos exceto superação documental explícita; nenhum novo framework/back-end ou mudança Form46/47.
- Os arquivos derivados SFJM JSON não são implicitamente atualizados por este handoff; verificar necessidade em reconciliação própria.
- Não foi recuperada transcrição integral, nem evidência administrativa da interface GTM/GA4, nem resposta de navegador real após a PR #628. Relatos de problema e provas técnicas de resolução devem ter status distintos.
- **Rollback runtime:** antes de eventual correção, preservar `d21d2bb` / deployment `dpl_7gpZfxXyvqPjrtS7PxDqZQcgwwaQ` como baseline pós-#628, comparando com deployment anterior `dpl_48bWwRkVfBm59SWF4sPLaXftUKut` (`3db1938`). Não executar rollback sem constatar falha e receber autorização específica.
