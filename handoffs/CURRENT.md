## 02/11/2026 — Capa única solicitada: candidato para LVR

Os três cards foram substituídos, na branch `ux/complexo-capa-unica-20261102`, pela capa fornecida pelo usuário, com três acessos funcionais e botões mobile. Detalhes e QA: `docs/sfjm/MNT_COMPLEXO_CAPA_UNICA_2026-11-02.md`. **Sem merge ou novo deploy de produção nesta etapa.** Produção permanece PR #532. Próximo: avaliação visual no LVR desta branch; preservar geometria e animação dos três simuladores.

---

## 02/11/2026 — RELEASE em Vercel Production: Complexo Lapa–Pirituba, PR #528

- Usuário autorizou merge/produção. PR #528 **MERGED**; commit integrado `6c49bdbca2eed63358ef6625e3c37ef2392fefe9`; Vercel `morenumtegra` deployment `dpl_6CEBRDtfEo11bBeqmREffq5rPNFd` **READY** com alias `www.moretegra.com.br` e `aliasError=null`.
- Três simuladores integrados, 32 carros por cenário. Correções de curvas Marginal, veículos e favicons. CI favicon + imagens **SUCCESS**.
- Registro canônico: `docs/sfjm/MNT_COMPLEXO_RELEASE_PR528_PRODUCAO_2026-11-02.md`. Rollback Vercel: `dpl_8dnBe9ATKvrbRpudd9mDNfsjpNVg` (commit `5bed3e058d67e29821af55c46b870c83e40e97f5`).
- Pendências: teste HTTP/browser público e QA mobile; páginas do Complexo mantêm `noindex,nofollow`; publicação Greenn não atestada. Histórico anterior de PR Draft ou bloqueio de merge desta PR foi **superado pela autorização de 02/11/2026**.

---

## 01/11/2026 — Simulador 1: curva oeste da Marginal efetivamente corrigida, pendente teste LVR

- A geometria anterior ignorava a grande curva diagonal no lado oeste do mapa; substituídas somente as duas strings `bands` de tráfego neutro no `duplo/index.html` por curvas Bézier que seguem ambos os lados do Rio Tietê. Comparação de código confirmou que nada além dessas duas guias mudou. SVG azul/laranja e 32 carros preservados.
- Auditoria visual local por overlay no mapa 1456×1088; detalhes em `docs/sfjm/MNT_COMPLEXO_MAPA_EDITORIAL_AYRTON_2026-11-01.md`.
- **Aceite ainda pendente no LVR**; PR #528 Draft, nenhum merge ou deploy.

---

## 01/11/2026 — Simulador 1: guias da Marginal agora fazem as curvas em ambos os sentidos

- Ajustadas apenas as duas guias SVG invisíveis (`bands`) de `src-greenn/complexo-lapa-pirituba/duplo/index.html`, geometria independente por margem na base 1452×1083. Rota azul, laranja, sentidos e os 32 carros não foram modificados.
- SFJM: `docs/sfjm/MNT_COMPLEXO_MAPA_EDITORIAL_AYRTON_2026-11-01.md`. QA visual no LVR ainda necessário para verificar aderência exata às pistas e ausência de carros no rio.
- PR #528 Draft; sem merge ou produção.

---

## 01/11/2026 — Simulador 1: 32 carros adicionados na PR #528

- `duplo/index.html`: 8 laranjas na rota Lapa→Pirituba, 8 azuis na Pirituba→Lapa, 16 carros neutros preto/vermelho/cinza nas duas pistas da Marginal Tietê, em 2 guias invisíveis específicas da base 1452×1083. SVG/JSON `duplo/routes-duplo.json` **inalterado**; rotas visíveis, autoplay sem botões, seletor de rotas/paradas preservado.
- Estado **candidato para teste LVR**: conferir geometrias das duas guias, carros fora do rio, sentidos, travessia da ponte, todos os veículos e mobile. Não declarar aprovado antes do aceite.
- SFJM: `docs/sfjm/MNT_COMPLEXO_MAPA_EDITORIAL_AYRTON_2026-11-01.md`. PR #528 Draft, sem merge/produção.

---

## 01/11/2026 — PR #528: simuladores 2 e 3, novo candidato LVR

- Simulador 3: carros azul/laranja restaurados ao formato maior de 20×36 px com 2 para-brisas brancos, preservadas integralmente as linhas e geometrias previamente aprovadas.
- Simulador 2: implementados 8 carros laranjas sobre rota 21, 8 azuis sobre rota 22 e 16 neutros (preto/vermelho/cinza) nas duas Marginais, com mesmo tamanho e caminhos invisíveis do tráfego do simulador 3. Autoloop, sem pausa/reinício; alternância de rotas e camada de paradas preservadas.
- Documentação: `docs/sfjm/MNT_COMPLEXO_MAPA_EDITORIAL_AYRTON_2026-11-01.md`. Código atualizado em `duplo-ayrton/index.html` e `marginal-duplo/index.html`. **Não alterar geometria aprovada do simulador 3 nem a rotatória.**
- Teste de integração em GitHub confirmado; **novo teste visual LVR pendente**. PR #528 Draft, sem merge ou produção.

---

## 01/11/2026 — ACEITE VISUAL LVR · Simulador 3 (PR #528 Draft)

- Usuário confirmou **"FICOU ótimo!!!!"** para o simulador **3. Lapa / Pirituba → Marginal Pinheiros**, na baseline de código `158e23a8c44057fe024986874f1b37542dbdb5d3`. **Aceite visual LVR reportado pelo usuário, não aceite técnico automatizado nem autorização de merge/produção.**
- Documento canônico de aceite e rollback: [MNT_COMPLEXO_SIMULADOR3_ACEITE_LVR_2026-11-01.md](../docs/sfjm/MNT_COMPLEXO_SIMULADOR3_ACEITE_LVR_2026-11-01.md). Leia antes de editar qualquer parte do simulador.
- Preservar **8 carros azuis seguindo o SVG azul, 8 laranjas seguindo SVG laranja (ambos visíveis), 16 carros pretos/vermelhos/cinzas nas guias invisíveis da Marginal Tietê**, autoplay sem controles/zoom. **Não alterar a rota azul nem o sentido da rotatória.** Curva laranja encurtada e faixa inferior corrigida, conforme aceite LVR.
- PR #528 segue **Draft e NÃO merged**. Próxima ação segura: conferência de diff/QA da PR em leitura; nenhuma alteração visual no simulador 3 sem pedido específico e novo aceite. O catálogo e simuladores 1/2 ficam preservados.

---

## 01/11/2026 — LVR: mapa editorial Ayrton Senna — PR #528 DRAFT

- Consolidação técnica e histórico completo: [docs/sfjm/MNT_COMPLEXO_MAPA_EDITORIAL_AYRTON_2026-11-01.md](../docs/sfjm/MNT_COMPLEXO_MAPA_EDITORIAL_AYRTON_2026-11-01.md).
- Visual aprovado pelo usuário: arte bege/verde/azul, shopping ilustrado no lote triangular e badge compacto Tietê Plaza Shopping; badges Ponte Lapa-Pirituba e Av. Raimundo Pereira de Magalhães indicados por marcações do usuário.
- WebP local `Mapa_Ayrton_Senna_Pirituba_SFJM_20261101.webp` (1500×1049, ~238KB) entregue por download; **não presente no GitHub** até upload binário. Nova referência de imagem preparada em `duplo-ayrton/index.html`, fallback automático `rota-21.jpg`.
- CRÍTICO: paths das páginas 21 e 22 aprovados visualmente somente na prancha 21. SVG/carrinhos ocultos quando arte nova carregar; recalibrar antes de reativá-los. `?mapa=original` mantém a experiência funcional de referência. Não aplicar escala direta.
- Sem merge, sem produção. Rota 1 dual intacta.

---
## 28/10/2026 — ESTADO VIGENTE: Mercado e RIIO em produção (PR #507)

**Supera os avisos históricos de preparação/noindex abaixo para estas 12 páginas.** PR #507 MERGED; head final `99ff6710b1d792468d43a8cca3f38c1fc1b7b3e8` com 10/10 checks SUCCESS; merge/runtime `0b1de5b1218fb1c4c83c2683366bdfe11ad60d44`; Vercel Production READY `dpl_8iiXm3RtVDbMhNSbHdpaJBq6KjjG`. Onze artigos Mercado + RIIO HTTP200, indexáveis, canonical www e JSON-LD sintaticamente válido; hub/Blog/catálogo/sitemap atualizados (73 URLs no sitemap). Isso não comprova indexação Google/Bing.

Ler integralmente `docs/sfjm/MNT_MERCADO_RIIO_PRODUCAO_CONTINUIDADE_2026-10-28.md` e JSON homônimo. Preservar cards/badges/rodapé RESF, IPTU atemporal, novo hero Inventário, ficha integral/galerias/bairro do RIIO e atendimento inicial remoto sem credencial RJ inventada. QA visual independente, testes oficiais schema/performance e entrega CRM do lote seguem pendentes. Não reabrir redação/publicação do lote. Próxima ação: resolver live e QA pós-release em leitura; prioridade de negócio continua cliques qualificados. Este pedido atualiza documentação, sem novo runtime/Core/CRM/campanhas. Prompt: `handoffs/PROMPT_RETOMADA_MERCADO_RIIO_2026-10-28.md`.

---

## 28/10/2026 — Revisão solicitada no LVR, PR507

Correções de cards/badges RESF, IPTU atemporal, hero de Inventário e primeira página RJ **RIIO by Piero Lissoni**, escolhida pelo usuário. Dossiê: `docs/editorial/mercado-2026-10-28/revisao-usuario-2026-10-28.md`. Mesma branch de preparação; noindex, sem merge/publicação. Após atualizar LVR, revisar novas telas e fluxo inicial RJ. A leitura da aba do usuário ainda mostrou o hero/dock anteriores; não confundir isso com QA dos novos arquivos.

---

## 28/10/2026 — Candidato Mercado: onze artigos preparados, sem publicação

Somente nesta branch de preparação: `editorial/mercado-11-preparacao-20261028`. Onze textos/HTML noindex e matriz de 61 termos preparados para avaliação; nenhuma publicação ou alteração da produção. Recibo: `docs/sfjm/MNT_MERCADO_11_PREPARACAO_2026-10-28.md`; pacote: `docs/editorial/mercado-2026-10-28/README.md`. Revisão editorial/visual e testes oficiais continuam pendentes; merge/indexação requerem autorização individual. Esta nota não promove o candidato a estado integrado nem substitui históricos de release abaixo.

---

## 27/10/2026 — GSC cobertura e Dicas & Decoração (PR de correção)

- GSC conectado: relatório atualizado 22/10 exibiu **47 indexadas e 6 não indexadas**: 3 com redirecionamento (home sem www em HTTP e HTTPS; Elo Duo sem barra final), 1 404 legado `https://moretegra.com.br/_next/image`, 2 descobertas sem indexação (hub `/blog/` e Jerivás). **Jerivás indexada em 27/10/2026 por confirmação do usuário, posterior ao snapshot; não alterar o dado histórico.**
- GSC URL Inspection Elo Duo `/empreendimentos/caminhos-da-lapa-elo-duo` sem barra: classificado redirect com último rastreamento 21/09. Teste ao vivo da URL canônica com barra em 27/10 mostrou **HTTP 200, indexação permitida e canonical self-www**. Não confundir a variante com a página indexada.
- Correção editorial específica: acrescentar **Cozinha de apartamento** e **Iluminação natural em apartamentos** ao sitemap (58→60 URLs, 43 comerciais preservadas); tornar permanentes (301) as antigas URLs de revisão `cozinhas-modernas-tendencias-de-layout-e-decoracao-para-2026` e `iluminacao-natural-faz-bem-para-a-saude-e-para-o-seu-projeto` para seus respectivos artigos autorais publicados. Não publicar as páginas de revisão nem tocar em outros artigos.
- O GSC não certificou os 12 artigos como indexados no snapshot; manter **12 indexados USER_CONFIRMED** de evidência anterior separada. Hub blog ainda precisa de recrawl/indexação.
- Validações restantes: CI PR exact-head, Vercel READY SHA, GET HTTP dos dois novos destinos e dos 301; testes de resultado aprimorado não certificados neste gate. Bing é frente distinta.

---

## 27/10/2026 — GSC: 47 URLs indexadas no relatório apresentado; cobertura comercial reconciliada

- Proprietário apresentou lista de 47 exemplos indexados no Google: 42 URLs comerciais canônicas, 4 URLs `/blog/` (inclui slug legado da Lapa) e `https://lp.moretegra.com.br/`.
- Jerivás ausente dessa lista, mas **USER_CONFIRMED INDEXED** no GSC nesta data; a combinação representa evidência de indexação para as **43 URLs comerciais**, não um snapshot sincronizado de inspeções individuais.
- Matriz CSV atualizada: 42 `INDEXED_USER_SUPPLIED_GSC_EXAMPLES_2026-10-27` e 1 `INDEXED_USER_CONFIRMED_2026-10-27`. Preserve 47 como contador observado, sem projetar 48.
- Bing por URL e redirects sem `www` ainda não certificados; `/blog` permanece cluster distinto.
- Evidência: `docs/sfjm/MNT_COMMERCIAL_43_RECONCILIATION_2026-10-27.md` e `.csv`.

---

## 27/10/2026 — Atualização pontual GSC: Jerivás indexada (USER_CONFIRMED)

- A URL `https://www.moretegra.com.br/empreendimentos/jerivas-caminhos-da-lapa/` foi confirmada **indexada no Google Search Console pelo usuário** em 27/10/2026.
- Não confundir com a linha ausente no relatório de performance GSC de 24/07–24/10; o histórico não foi reescrito.
- Matriz comercial de 43 URLs atualizada: `docs/sfjm/MNT_COMMERCIAL_43_RECONCILIATION_2026-10-27.csv`, relatório MD homônimo; Bing e redirects per URL ainda pendentes.
- PR #500 já merged, produção READY no commit `4cab1b3e3fb96cad364923ebc69647df9e6f4915`; esta atualização é documental e não altera runtime.

---

## 27/10/2026 — Continuidade integral: SEO, cliques, Blog e Bing

Leitura obrigatória, na íntegra: `docs/sfjm/MNT_SEO_BLOG_BING_CONTINUIDADE_INTEGRAL_2026-10-27.md` e seu JSON de evidências. O histórico abaixo foi preservado.

- Dicas: **12 artigos indexados no Google, USER_CONFIRMED em 27/10**. Dez releases #486–#495 já publicados; não reiniciar redação, publicação ou aprovação. IndexNow aceitou 13 URLs com www. Indexação do hub no Google não confirmada.
- Prioridade: cliques qualificados. GSC de 27/09 a 24/10: More 37 cliques/1.563 impressões (20 linhas diárias), Caminhos 5/370. Investigar Ampère/Mozae, preservar Ária, conferir mensuração Caminhos. Auditorias OpenSEO concluídas; links e dados no handoff.
- Bing: chamado de favicon aberto pelo usuário, sem protocolo; redirects 308/301 funcionam nas amostras, com alguns dois saltos; painel mostra 3 Indexed/33 Warning/0 Error/1 Excluded, total 37, no nó exibido sem www. Total global www não confirmado. Novo Quadras indexado conforme print.
- Nove CSVs de 26/10 lidos integralmente e preservados: 21 URLs únicas More/10 Caminhos, sem coluna de status de indexação. Não pedir reenvio. OpenSEO Key pages remove www automaticamente; canonical do site e IndexNow permanecem com www.
- Pendências: dois links legados, sitemap e migração de cozinha/iluminação natural; Mercado com 11 reservados e Lapa publicado, fichas insuficientes para 2.000 palavras; QA externo/mobile/performance não certificado.
- Live na base deste pacote: main `10682d1a0da22223a4997ee0a1dad2ecd812d229` (documental), runtime `35c157f03f2a7477dde9fae5f0fc35a304c29e3a`, deployment `dpl_EbqLXnC4bpz6YnVMD3m9rBPLDP25` READY. Resolver live novamente. Três JSONs correntes com drift de 06/10 foram reconciliados.
- Prompt: `handoffs/PROMPT_RETOMADA_SEO_BLOG_BING_2026-10-27.md`. Atualização DOCUMENTATION_ONLY.

---

## Atualização — 26/10/2026 — dez artigos Dicas & Decoração PUBLICADOS

PRs #486–#495 integrados individualmente. Produção Vercel READY, deploy `dpl_EbqLXnC4bpz6YnVMD3m9rBPLDP25`, source `35c157f03f2a7477dde9fae5f0fc35a304c29e3a`. Dez URLs HTTP 200, canonical/robots/source conferidos; dez URLs antigas HTTP 301; sitemap/catálogo atualizados. 40/40 workflows SUCCESS. 27 recursos/destinos HTTP 200. IndexNow aceitou 21 URLs. GSC ainda informa que não reconhece as dez URLs novas; sem indexação ou solicitação individual Google alegadas.

A reiteração expressa do usuário determinou a publicação já autorizada. Declarações históricas de “dez rascunhos bloqueados”, “cinco heroes faltantes” ou “não publicar” para estes artigos ficam superadas. Os cinco heroes conceituais estão publicados com legenda de IA. Schema.org/Google oficiais, render mobile e performance permanecem NÃO EXECUTADOS; não foram declarados PASS. Próxima ação: QA visual/testes oficiais quando o navegador estiver disponível e acompanhamento da cobertura de busca, sem repetir aprovação para o escopo autorizado.

Recibo: [MNT_DECOR_10_PUBLICACAO_2026-10-26.md](../docs/sfjm/MNT_DECOR_10_PUBLICACAO_2026-10-26.md); JSON HTTP e execução atualizados em docs/sfjm. Histórico anterior abaixo preservado.

---

## Continuidade após autorização e falha do handoff — 26/10/2026

O usuário autorizou o navegador isolado. O acesso chegou ao CAPTCHA de tráfego incomum; repasse de controle não funcionou para o usuário e uma recarga manteve o bloqueio. Não houve tentativa de resolver ou contornar o CAPTCHA. Schema.org e Google Rich Results permanecem NÃO EXECUTADOS. Sem nova solicitação de autorização para o mesmo acesso.

As cinco imagens de abertura antes pendentes foram substituídas por ilustrações editoriais conceituais geradas com IA, explicitamente identificadas, sem retratar/atribuir características a empreendimentos Tegra. WebP 1200px, de 38.020 a 139.316 bytes. PRs #487/#489/#491/#492/#493 atualizadas; 20/20 workflows SUCCESS nos novos heads. As demais PRs preservam os heads anteriores. As dez continuam Draft/noindex; nenhuma publicação ou submissão. QA visual mobile/desktop e performance continuam pendentes. Este adendo supera somente a pendência de mídia e os SHAs anteriores dessas cinco PRs; não transforma CI em teste visual.

## 2026-10-26 — Dez artigos Dicas & Decoração preparados; release bloqueado por QA

- Prompt mestre autoriza os dez releases individualmente após gates, sem novas aprovações editoriais repetidas. Dez pesquisas lidas integralmente e dez textos autorais implementados em PRs Draft **#486–#495**; quatro workflows por head, **40/40 SUCCESS**. JSON-LD/SEO estruturais verificados; isso não comprova render mobile, testes oficiais ou indexação.
- **0 novos artigos publicados/submetidos.** Robots noindex, sitemap e origens preservados. Schema.org/browser e instalação de navegador local bloqueados pela revisão automática; render mobile/performance não executados. Faltam heroes para garagem, brinquedoteca, quadras, recarga e Claris; demais mídias exigem revisão visual.
- Recibo e DE/PARA completos: `docs/sfjm/MNT_DECOR_10_EXECUCAO_2026-10-26.md` + JSON homônimo. Preservar arquivos de pesquisa/hashes e recibos individuais nas PRs. Retomar do código pronto, sem reiniciar a redação ou pedir reenvio das fontes já localizadas.
- Próximo: resolver bloqueio de validação/mídias, reconciliar cada branch com main (categoria/vercel compartilhados), validar e publicar sequencialmente conforme autorização. Nunca marcar CI como teste Google/mobile e nunca submeter noindex.

## 2026-10-26 — Adendo aprovado: cards contextuais nos artigos do Blog MoreTegra (DOCUMENTATION_ONLY)

- Padrão atualizado em `docs/sfjm/MNT_BLOG_PADRAO_EDITORIAL_V1_2026-10-26.md` §5A. Incluir cards horizontais de empreendimentos **quando houver correspondência comprovada entre tema, empreendimento, imagem autorizada e URL canônica**, seguindo o modelo do artigo de iluminação natural (PR #483) que referencia Nova Vivere e Garden Design. A seleção é editorial, não obrigatória; links internos descritivos, desempenho mobile e SEO devem ser verificados. Preservar narrativa original, Sabrina, FAQ útil e cards finais; não inventar atributos nem usar conteúdo provisório da Tegra. Prática aprovada após PR #484 (liberação de indexação do artigo 2). Mudança atual somente documental, sem alteração de produção.

## 2026-10-26 — Padrão editorial Blog MoreTegra V1 (USER_APPROVED / DOCUMENTATION_ONLY)

- O proprietário aprovou a experiência do artigo **Cozinha de apartamento** como padrão para os próximos artigos. Norma integral: `docs/sfjm/MNT_BLOG_PADRAO_EDITORIAL_V1_2026-10-26.md`; preservar a exigência de originalidade da PR #462 e handoff de 20/10, sem copiar textos nem liberar indexação em lote. O padrão abrange hero premium autorizado, imagens úteis, SEO/JSON-LD, FAQ contextual, Sabrina com foto/WhatsApp e três cards finais, com gates próprios por URL. Esta atualização só documenta a decisão; não publica outros artigos.

## 2026-10-26 — Handoff Bing / IndexNow / proteção de originalidade (DOCUMENTATION_ONLY)

- **LEITURA OBRIGATÓRIA antes de retomar SEO/Bing/IndexNow:** `docs/sfjm/MNT_BING_INDEXNOW_EDITORIAL_CONTINUITY_2026-10-26.md` em conjunto com `docs/sfjm/MNT_BLOG_ORIGINALIDADE_INTEGRAL_HANDOFF_2026-10-20.md`. Preservar decisões comerciais #472/#474, handoffs anteriores e proteção `EDITORIAL_PENDING/noindex`. Investigação do Bing confirmou `noindex,follow` **em um artigo específico**; não extrapolar para os outros 19 avisos. 46 URLs MoreTegra + 6 Caminhos enviadas ao IndexNow; submissão não é indexação. Nenhuma alteração runtime autorizada nesta atualização documental.

## 2026-10-23 — RELEASE COMERCIAL MATCH POINT #474

- USER_APPROVED. PR #474 MERGED, squash `89bf0182d4e190fcc47a09fa7e157c0856579894`. HEAD validado `f16a7af52432451454373fd8cc51bb774e369af4` com 17/17 PASS. Vercel Production `dpl_qcM2JvYTUF2TsFMsPiHMkUcQcyFe` READY no SHA do merge. Home, páginas exatas e coleção de studios reconciliadas para YPY (AP1507/AP906), Mozae (AP807/AP0412 à vista), Ária (AP1812/AP2102), Órbita, Bem Moema, Bem Moema Studios & Offices e Garden Design. HTTP/browser independente e CRM real NOT_VERIFIED. Recibo: `docs/sfjm/MNT_PR474_MATCHPOINT_PRODUCTION_RELEASE_RECEIPT_2026-10-23.md`.

## 2026-10-23 — RELEASE AMPÈRE + CAPIITOLO PR #472

- PR #472 MERGED, squash `6d20e9102659c3288f7da18ac20871138904b2a2`; 13/13 checks PASS no HEAD `d9c9ce3`; Vercel Production `dpl_AfKcdWavJxVEskWGSwUkMBpGZYH9` READY no mesmo SHA de release. Usuário aprovou via Live Sync os quatro cards/seletores, hero Ampère, FACTS 2×2 e badge WhatsApp RESF. HTTP/browser público pós-release, Form46 real/CRM, Lighthouse e indexação continuam NOT_VERIFIED. Recibo: `docs/sfjm/MNT_AMPERE_CAPIITOLO_PR472_PRODUCTION_RELEASE_RECEIPT_2026-10-23.md`. Este cabeçalho substitui o status antigo "#470/#471 sem merge" exclusivamente para o release consolidado; prioridades editoriais e clusters continuam independentes.

## 2026-10-22 — HANDOFF ATIVO: CAPIITOLO / AMPÈRE — PRs #470 e #471

Retomada comercial prioritária. **Documento obrigatório:** `docs/sfjm/MNT_AMPERE_CAPIITOLO_PR470_471_HANDOFF_2026-10-22.md` (branch `sfjm/capiitolo-ampere-home-price-cards-20261022`, PR #471). Quatro valores e copy concisa dos cards aprovados; falta fazer os dois cards de cada empreendimento abrirem a página individual com seletor de condição (`?condicao=promocional` / `?condicao=avista`) análogo ao Órbita. Não reescrever cards com justificativas; respeitar adendo RESF. PR #470 hero Ampère independente. **Sem merge nem publicação comprovada; resolver estado live, finalizar seletor, testar e só depois liberar produção e reindexação.**

## 2026-10-20 — PRIORIDADE EDITORIAL: ORIGINALIDADE INTEGRAL DO BLOG (DECISÃO DO PROPRIETÁRIO)

O proprietário determinou auditoria e reformulação de todos os artigos/slugs herdados das referências Tegra para entregar títulos, H1, URL quando justificado e conteúdo realmente autorais do MoreTegra, usando como paradigma a PR #462 (Lapa). **Primeiro fazer inventário live e matriz editorial, não migrar em massa sem aprovação.** O catálogo `src-greenn/blog/catalogo-tegra-referencia.json` contém **48 referências, 12 por categoria**, com status `EDITORIAL_PENDING/noindex`; a contagem não confirma 48 páginas públicas/indexadas. Handoff obrigatório: `docs/sfjm/MNT_BLOG_ORIGINALIDADE_INTEGRAL_HANDOFF_2026-10-20.md`. Esta atualização é apenas documental e não altera produção.

## 2026-10-19 — RELEASE REGIONAL HUB #440 (SFJM / RESF)

O hub `/regioes/` foi atualizado na `main` por squash PR #440: `f9960079cd43aad3ee880b0ce17e71888a31d40f`, Vercel Production READY `dpl_2J3Wz6khzVc8LzPQ5PYUNnvTviHF` no mesmo SHA. O usuário confirmou aceite visual («ficou ótimo»); QA de formulário real/mobile/SEO/GSC não foi independentemente certificado. PR #439 CLOSED sem merge, incorporada na #440. Novos guias SEO e CTAs (Formulário/Ligar/Mensagem), Sabrina consultiva antes do FAQ, seção sem base/endereço/mapa, footer RESF preservado. Fonte detalhada: `docs/sfjm/MNT_REGIOES_PR440_RELEASE_ACCEPTANCE_2026-10-19.md`. **Este release não altera a situação IN_PROGRESS do cluster Vila Nova Conceição.**

## 2026-10-18 — CURRENT OVERRIDE: Bueno concluído; cluster Vila Nova Conceição em auditoria

Bueno Brandão 257 **USER_APPROVED**: PR #428 merged `44e44c370d1c53a45a7f12d52c157cc12be4b4ef`, CI 8/8, Vercel READY `dpl_2iru2kNyo13qK2NQpSAjdDz4oMvR`. **Cluster NÃO fechado**: Tièl e `/regioes/vila-nova-conceicao/` requerem auditoria RESF/SEO/GEO, navegação/mobile/Form46 com evidência. Leia `docs/sfjm/MNT_VNC_CLUSTER_HANDOFF_2026-10-18.md` antes de alterar.

## 2026-10-16 — Órbita PR #418: merge e aceite visual de produção (handoff atual)

- PR [#418](https://github.com/wagnerjfjunior/MoreNumTegra/pull/418) **MERGED** na main, squash SHA `6bffd089ee3cf7b5da6ea5cee8013e2f26567fa8`; head validado `63d596a29f063a3c261a8af7e8e4ceb5e509d789`; **12/12 GitHub checks SUCCESS** no head da PR.
- Vercel Production deployment `dpl_33MEpNw9UHJ9xQCaG5nFuXR5eefx` **READY**, SHA do deployment igual ao merge. Host canônico: `https://www.moretegra.com.br/`.
- Alterações: dois cards comerciais do Universo Tatuapé Órbita na Home e seletor na página exata por `?unidade=2408#valores` e `?unidade=1305#valores`; schema Product/Offer de referência 2408 alinhado e validators `verify`/`postal` reconciliados.
- **USER_CONFIRMED**: usuário testou Home e ambas URLs públicas, inclusive com `utm_source=chatgpt.com`, e confirmou funcionamento; capturas mostram 2408 (51 m², 2 dormitórios, vaga, R$ 540.000) e 1305 (69 m², 3 dormitórios, vaga, R$ 655.000), seleção visual correta. Isso é aceite **visual/funcional do seletor em desktop**, não certificação de todos os fluxos.
- **OPEN/NOT_VERIFIED**: submissão real e contexto de unidade no Green Sales Form 46, mobile touch/responsividade, métricas Lighthouse/CWV, inspeção independente de HTTP/SEO e indexação. Não marcar esses gates PASS sem evidência.
- Rollback rastreável: reverter o squash commit `6bffd089ee3cf7b5da6ea5cee8013e2f26567fa8` por PR governada após análise de impacto, sem reset forçado da main.
- **Próxima ação segura deste slice:** QA mobile + Form 46 (preferir validação sem lead real; envio real apenas com consentimento/teste autorizado), e inspeção SEO/HTTP; registrar evidências e encerrar o slice. Outras páginas exigem gate próprio.
- Recibo detalhado: `docs/sfjm/MNT_ORBITA_PR418_PRODUCTION_ACCEPTANCE_2026-10-16.md`.

## 2026-10-14 — Política de treinamento por IA atualizada por autorização do usuário

- Pedido expresso: `Training: allow` em `/.well-known/ai.txt` e coerência com `GPTBot Allow: /` no `robots.txt`.
- Esta decisão substitui a política anterior `Training: deny` após merge/deploy; preservar o aviso de ausência de licenças para mídia, marcas e materiais de terceiros.
- PR #404 contém a mudança proposta e a evidência HTTP anterior à sua publicação; não considerar os novos valores ativos até confirmar deployment.

## 2026-10-14 — RESF adendo de descoberta por IA (documentação em homologação)

- O contrato RESF V1 passa a explicitar `/llms.txt` (índice editorial de regiões/empreendimentos) e `/.well-known/ai.txt` (preferências de uso de IA, draft não normativo) com ownership, gatilhos de atualização, validação HTTP e rollback.
- Identidade comercial protegida: Sabrina da Tegra, Tegra Vendas, CRECI-SP 209.905-F, WhatsApp +55 11 96077-9328; no estande, solicitar expressamente Sabrina da Tegra.
- Referência integrada pré-adendo: PRs #399/#401/#402, SHA `b23ccdb205b2956beeeb411adc82011de6c91425` e Vercel Production READY. HTTP 200 individual, ingestão por IA e rankings não certificados.
- A presente mudança é documental: não altera políticas de IA existentes, rotas, Form46 ou páginas. Não representa auditoria site-wide concluída.

## 2026-10-14 — Identidade comercial Sabrina da Tegra preservada em descobrimento por IA

- **Regra de continuidade do MoreTegra:** Sabrina da Tegra é a corretora de referência do portal para atendimento Tegra Vendas em São Paulo; CRECI-SP 209.905-F; telefone e WhatsApp **+55 11 96077-9328**, link `https://wa.me/5511960779328`.
- **Orientação de visita:** ao chegar ao estande, o visitante deve **solicitar expressamente atendimento por Sabrina da Tegra**.
- A Home e páginas de empreendimentos já contêm identidade/contato em dados estruturados; manter `Person`, `RealEstateAgent`, `ContactPoint` e demais entidades apenas onde sustentadas pelo conteúdo real e consistente.
- `llms.txt` deve nomear Sabrina, CRECI, WhatsApp e orientação para visitas explicitamente. `.well-known/ai.txt` pode incluir notas de identificação em comentários, mas é um arquivo de política de uso de IA, não um substituto para `llms.txt` ou o conteúdo visível.
- Não inferir que o MoreTegra seja o site institucional da incorporadora, nem declarar exclusividade de representação ou disponibilidade de unidades. Não apagar a referência comercial em futuras revisões sem decisão específica documentada.
- Alteração limitada aos arquivos de orientação e documentação; auditoria de consistência da identidade em todas as páginas permanece distinta e não certificada.

## 2026-10-12 — RESF V1 pronto para escala; Tièl entregue, próximas páginas ainda não auditadas

- **Fonte canônica:** GitHub main. O padrão RESF V1 foi complementado com o adendo operacional §10 em `docs/frameworks/resf/v1/EXACT_PROJECT_PAGE_BUILD_STANDARD_V1_2026-10-11.md`. `RESF_V1_STANDARD = CANONICAL_AND_SCALE_READY` não equivale a certificação das páginas existentes.
- **Recibo:** `docs/frameworks/resf/v1/RESF_TIEL_RELEASE_EVIDENCE_AND_SCALE_HANDOFF_2026-10-12.md` registra o caso Tièl, métricas observadas e processo de aplicação nas aproximadamente 30 páginas informadas pelo usuário (quantidade não auditada).
- Tièl PR #395 MERGED `57970a878b08b0dde577b3af00a323ab91684cae`; PR #396 MERGED `b2e02ace0d1391f6570f14fa7c056e9defb41b8b`. Vercel Production READY `dpl_HSMTSZnARCDKwDDVei6YDUGZT7EF` (SHA #396) com alias www.moretegra.com.br na checagem.
- QA visual e comportamento do lead Green Sales: **USER_CONFIRMED**; CI de PRs #395/#396 8/8 success. Teste HTTP autônomo, Lighthouse 5x, Core Web Vitals de campo e indexação efetiva: não comprovados neste fechamento. Schema.org e Rich Results tiveram evidência confirmada pelo usuário em etapa anterior; não inferir novo rastreamento após #396.
- **Próxima ação segura:** inventário real das páginas exatas com fatos comerciais, agrupamento por cluster/risco e correções por página com aprovação separada, sem rediscutir o RESF e sem reescrever genericamente as rotas.
- Este bloco substitui somente os ponteiros operacionais desatualizados abaixo; decisões e bloqueios históricos continuam válidos.

## 2026-10-11 — RESF V1 canonical handoff (latest documentary state)

- GitHub main at latest observed pre-reconciliation checkpoint: `40946fed2d7dcc3729361f391a9f9a80b997ae78`; PR #390 (build standard) and PR #391 (status correction) MERGED.
- Canonical new exact-project build contract: `docs/frameworks/resf/v1/EXACT_PROJECT_PAGE_BUILD_STANDARD_V1_2026-10-11.md`.
- Companion release evidence: `docs/frameworks/resf/v1/RESF_EXACT_PROJECT_RELEASE_CLOSURE_2026-10-11.md`.
- Latest verified READY web runtime: Ampère PR #389 `b6497954e45d77cf37dd639dbea3c18bd29a4040`, Vercel `dpl_6QQCpeSGVrpVJsFkap9o99Zbbw3M`. Docs-only #390/#391 Vercel deployments CANCELED; do not infer runtime breakage or redeploy necessity from that status.
- RESF STANDARD = CANONICAL_FOR_NEW_EXACT_PROJECT_BUILDS. AMPERE_POST_RELEASE_QA = OPEN (mobile, form behavior, public smoke, external rich results/performance remain unverified in this pass).
- Next safe action is read-only Ampère public/regression QA and governed existing-page conformance inventory. Do not select another page or mass migrate by sequence; retain separate gates for RESF V2, ads, CRM, commercial truth, and the documented M5-06/M4-05R validator debt.
- This dated section supersedes only stale current-state pointers below, not historical evidence.

# 2026-10-06 — SFJM current handoff reconciliation

**GitHub `main` remains canonical; resolve live before mutation.**

Current integrated runtime before this docs-only reconciliation:
```text
main/runtime = 1ec9cc1ad812d4e0b9f81b1713fe8d07560d502c
Production = dpl_6LJK4RRu41AGN8LwivL32det2rBN / READY
canonical host = https://www.moretegra.com.br/
```

Current detailed handoff:
`handoffs/HANDOFF-2026-10-06-SEARCH-IMAGE-FAVICON-HOME-GSC.md`

Latest material decisions:
- PR #352 favicon package = MERGED / production READY;
- PR #353 Mozae primary-image ownership = MERGED / production READY;
- PR #354 Mozae facts/gallery normalization = MERGED / production READY;
- PR #355 Home primary image + delayed muted autoplay + mobile content-flow change = MERGED / production READY;
- `lp.moretegra.com.br` is now a permanent redirect to `www`, not a Green fallback;
- GSC Change of Address `lp -> www` = USER_CONFIRMED active from 2026-10-06;
- Google thumbnail/AI behavior remains query-dependent and partially stale during recrawl.

NEXT SAFE ACTION:
read-only site-wide image-ownership audit and recrawl observation before any further Home/Mozae runtime mutation.

# Handoff Atual — MoreNumTegra

Atualizado em `2026-10-05`.

**GitHub `main` é a fonte canônica. Resolver live antes de qualquer conclusão ou mutação.**

Handoff detalhado vigente:

`handoffs/HANDOFF-2026-09-29-RESF-RESPONSIVE-MEDIA-SALES-COPY.md`

Estado de transição registrado no handoff:

```text
main observado = 4454c21ab663ea9f8e00417eb6f5fc4b8f69423b
branch ativa = fix/resf-responsive-media-20260929
branch head observado = 9f5e3b71ed36fe57b92494900e69ac8db028d3f4
PR = #306 / OPEN
```

Os SHAs acima são evidência de handoff, não substituem resolução live.

Traceability standard:

`docs/governance/MNT_CHANGE_TRACEABILITY_STANDARD_V1.md`

Local Live Sync standard:

`docs/governance/MNT_LOCAL_LIVE_SYNC_VALIDATION_STANDARD_V1.md`

## NEXT SAFE ACTION

Ler o handoff detalhado e `docs/NEXT_SAFE_ACTION.md`.

Prioridade desta transição:

1. concluir correção RESF de responsive media nas páginas recém-expandidas;
2. preservar copy de venda forte nas páginas Chez Vous / Key / Ayla / Viso;
3. resolver o `validate` vermelho da PR #306 sem mascarar dívida pré-existente;
4. validar no Local Live Sync;
5. somente após aceite explícito, considerar merge/Production;
6. medir performance pós-release antes de afirmar ganho de LCP.


## PR #306 — RESF responsive media + Moema sales copy — CLOSED 2026-09-30

```text
PR = #306 / MERGED
validated head = 247bc1b1b10dd837cb34f3f5a337abc113bca82f
merge/runtime SHA = 6c36cdc765d1bd6781ce099ff799bfa4db755f66
Production deployment = dpl_GC3V5BCPPWgo2cEK2VaiTWKKJkJf
Production state = READY
canonical host = https://www.moretegra.com.br/
public smoke = USER_CONFIRMED / pages published and functioning
runtime errors post-release = NONE OBSERVED in the checked 1h window
```

Scope retained:
- RESF responsive hero/media delivery on the bounded project/regional set;
- strong consultation-led commercial copy on Chez Vous, Key, Ayla and Viso;
- Moema regional copy no longer frames those projects as dead/archive pages;
- canonical multi-frame favicon retained because restoring the older main blob failed the current favicon validator.

Validation note:
- Favicon standard validation = PASS;
- Commercial page standard validation = PASS;
- Social sharing metadata validation = PASS;
- M5-06 CTA/Form journey = RED due to pre-existing validator debt observed on main, not introduced by PR #306.

Do not claim an LCP improvement from this release until a post-release performance battery is executed.


## 2026-09-30 — PR #315 Garden Design + Nova Vivere semantic enrichment — CLOSED

```text
PR = #315 / MERGED
validated head = 7aa2e6db6d191ccea0e8943ed57f35170de37872
merge/runtime SHA = 759a4bcf6d0b7220993c4d87918f85e1d4d5f5f1
Production deployment = dpl_5LLtx8L1XJys9JSrkpqbRUG9stWD
Production state = READY
canonical host = https://www.moretegra.com.br/
local visual validation = USER_APPROVED
```

Scope delivered:
- Garden Design and Nova Vivere second-layer semantic enrichment;
- Garden Design visible copy measured at approximately 1,083 words;
- Nova Vivere visible copy measured at approximately 1,130 words;
- stronger Caminhos da Lapa, Lapa/Zona Oeste, plant, leisure, mobility and decision semantics;
- visible FAQ expanded to seven questions on each page;
- FAQ visible content kept in parity with FAQPage JSON-LD;
- title, H1, canonical, Form 46 and GTM preserved;
- no unsupported Vila Anastácio claim introduced.

Checks on approved head:
- Favicon standard validation = PASS;
- Commercial page standard validation = PASS;
- Social sharing metadata validation = PASS;
- M5-06 CTA/Form journey = RED / PRE-EXISTING VALIDATOR DEBT, also red before this delta.

Search-gap reconciliation:
- Reserva commercial/entity lifecycle remediation = EXECUTED before #315;
- Elo Duo FAQ/answerability = EXECUTED / PR #314;
- Garden Design + Nova Vivere local entity/amenity semantic enrichment = EXECUTED / PR #315;
- Garden Design commercial-truth revalidation = separate factual-data gate if price/reference changes are contemplated;
- Nova Vivere commercial-truth revalidation = separate factual-data gate if price/reference changes are contemplated.

Next safe action is governed by `docs/NEXT_SAFE_ACTION.md`.


## 2026-09-30 — Search ownership handoff

Caminhos/Lapa hierarchy is now resolved:

```text
REGION → MASTER DEVELOPMENT → EXACT PROJECT
/regioes/lapa/ → dedicated Caminhos property → /empreendimentos/*
```

`/caminhos-da-lapa/` remains reserved and must not be created.

Next bounded task: `MNT-REGION-LAPA-01` — Lapa regional discovery page, with project membership and semantic-boundary validation before runtime implementation.


## 2026-09-30 — PR #318 Lapa regional discovery page — CLOSED

```text
PR = #318 / MERGED
validated head = 3108b8de3103f181dcd9f59e355850353086bc59
merge/runtime SHA = d6dbc451554ca579d80ff7f16fee8c39e5a41da3
Production deployment = dpl_9KTywaqRc5TL7PPsP8u5aq28hAiL
Production state = READY
local visual validation = USER_APPROVED
route = https://www.moretegra.com.br/regioes/lapa/
```

Delivered:
- regional owner page for Lapa / Zona Oeste;
- approximately 1,431 visible words;
- editorial balance measured at ~72% region / ~28% projects + decision;
- projects linked: Elo Duo, Garden Design, Nova Vivere and Reserva;
- JSON-LD valid with WebPage, BreadcrumbList, ItemList and FAQPage;
- visible FAQ 6 / JSON-LD FAQ 6 / parity PASS;
- Form 46 and GTM preserved;
- Home discovery link, Vercel rewrite and sitemap entry added;
- MoreNumTegra `/caminhos-da-lapa/` remains reserved / not created.

Validation residuals:
- M5-06 CTA/Form journey = RED / pre-existing validator debt;
- M4-05R metadata validation = RED because the validator still expects legacy guarded MutationObserver logic in `src-greenn/portal-links.js`; current canonical file is intentionally a compatibility shim and PR #318 did not modify it.


## 2026-10-01 — PR #323 Higienópolis cluster Search release — CLOSED

```text
PR = #323 / MERGED
validated head = 2f8c98e1c860e9da5437b9a0c1149e3e009e65e1
merge/runtime SHA = b954992039895f238a72dd917beebd7cafe919d6
Production deployment = dpl_CGZjq9iaznc7CYLJk8Ggq8NcgDeb
Production state = READY
canonical host = https://www.moretegra.com.br/
```

Delivered:
- Ária + Mozae + Higienópolis region standardized as one Search cluster;
- semantic vocabulary and internal ownership links aligned;
- exact-project and regional JSON-LD balanced by page type;
- FAQ visible/schema parity restored;
- Form 46 and GTM preserved;
- production smoke = HTTP 200 on all three routes;
- post-release runtime errors on the three checked routes = NONE OBSERVED.

Canonical release evidence:
`docs/governance/MNT_PR323_HIGIENOPOLIS_CLUSTER_PRODUCTION_RELEASE_2026-10-01.md`.

AI/Search follow-up is recorded but not automatically authorized as runtime mutation.


## 2026-10-01 — PR #325 Mozae Rich Results correction — CLOSED

```text
PR = #325 / MERGED
validated head = 0489a5f439ae6d89dc7215ef549b8e3fdae280b4
merge/runtime SHA = c96b5e0118414e579a4d89d4cf4e05b2468ea4e0
Production deployment = dpl_BRDUZmji53c86zET1DpZQKvvts5Q
Production state = READY
route = https://www.moretegra.com.br/empreendimentos/mozae-higienopolis/
```

Delivered:
- Product.image added for Mozae;
- postalCode 01232-010 added to exact-address structured data;
- CEP added to governed footer address;
- canonical, Form 46 and GTM preserved;
- runtime errors in checked post-release window = NONE OBSERVED.

Next: re-run Google Rich Results Test to verify Merchant Listings no longer reports missing Product.image.


## 2026-10-01 — Higienópolis Regional Search/AI Profile v1

The published Higienópolis regional graph is now canonicalized as a **pilot profile for Higienópolis only**:

`docs/search/MNT_HIGIENOPOLIS_REGIONAL_SEARCH_AI_PROFILE_V1_2026-10-01.md`

```text
PR #328 = MERGED
runtime SHA = fb7304cc79717ea5e53a74c0aa536fa5287544fa
Production = dpl_BXWj3PBkP1AKDa3BjDc7wQdar4Gj / READY
HIGIENOPOLIS_PROFILE_V1 = CANONICAL_FOR_HIGIENOPOLIS
REGIONAL_STANDARD_GENERAL = NOT_YET_APPROVED
```

Do not mechanically propagate this schema profile to other regional pages before observation and explicit promotion.


## 2026-10-01 — Higienópolis cluster CLOSED

Final Google validation is recorded in:
`docs/search/MNT_HIGIENOPOLIS_CLUSTER_FINAL_CLOSURE_2026-10-01.md`

```text
HIGIENOPOLIS_CLUSTER = CLOSED
HIGIENOPOLIS_PROFILE_V1 = VALIDATED_IN_GOOGLE
REGIONAL_STANDARD_GENERAL = NOT_YET_APPROVED
```

Next comparison candidate: Lapa.


## 2026-10-03 — Reserva Caminhos da Lapa page-pattern closure

```text
PR #333 = MERGED
runtime SHA = 87194553074db86f901a3c40352dbcced3dbff21
Production = dpl_G6kP56utSR1apBpQYBZK27mJpGP4 / READY
visual validation = USER_APPROVED
JSON-LD = PASS
visible FAQ = 10
FAQPage = 10
visible/schema parity = PASS
```

The Reserva page is the accepted reference implementation for the next Lapa exact-project content/layout adaptations.

Canonical pattern:
`docs/search/MNT_LAPA_EXACT_PROJECT_PAGE_STANDARD_V1_2026-10-03.md`

Important:
- reuse information architecture and visual rhythm, not lifecycle-specific copy;
- Reserva remains resale/secondary-opportunity oriented;
- Garden Design and Nova Vivere remain active commercial projects and must keep their own lifecycle truth;
- next bounded adaptation = Garden Design;
- following bounded adaptation = Nova Vivere;
- do not bulk-apply both pages in one mutation.


## 2026-10-04 — PR #339 Nova Vivere exact-project pattern — CLOSED

```text
PR = #339 / MERGED
validated head = 77127d2e836e494869c396d7577a1b79b9fd2b4c
merge/runtime SHA = b872b637915ed5a27045754cf0511f5739dea8b1
Production deployment = dpl_BKhmeeUfdoGTTPRwVdBcBaorEdfw
Production state = READY
local visual validation = USER_APPROVED
```

Delivered:
- Nova Vivere aligned to the canonical Lapa exact-project pattern;
- Caminhos da Lapa / Rua Jardim and Morar na Lapa sections;
- regional figures and softer visit/Sabrina/Form 46 closing;
- gallery led by Family Space with concise editorial captions;
- visible FAQ 10 / FAQPage 10 / parity PASS;
- canonical, Form 46, measurement and consent preserved.

Validation residual:
- the broad `validate` job remains red because of pre-existing M5-06 legacy/global assertions; the Nova map assertion expects `www.google.com/maps?q=`, while canonical `main` already used the current `maps.google.com/maps?hl=...` regional embed before PR #339.

Lapa exact-project bounded sequence:
- Reserva = reference / COMPLETE;
- Garden Design = COMPLETE;
- Nova Vivere = COMPLETE;
- Elo Duo = preserve unless a specific bounded delta is selected.


## 2026-10-05 — PR #342 Higienópolis Escolha Tegra decision layer — CLOSED

```text
PR = #342 / MERGED
validated head = 6753e72d626eb71a25f7585129f50cdbda331340
merge/runtime SHA = d67470fc14138f3079ef0e8f40b06a6ddb0d6387
Production deployment = dpl_3o2yx8rceC8iCLUtuknGK1VuAio8
Production state = READY
canonical alias = https://www.moretegra.com.br/
local visual validation = USER_APPROVED
```

Delivered:
- bounded Escolha Tegra · Higienópolis decision layer;
- Ária vs Mozae comparison by stage and typology, with exact-project links;
- concise O que fazer em Higienópolis section;
- one lazy-loaded Parque Buenos Aires visual with attribution;
- visible FAQ expanded to 9 and kept in exact FAQPage parity;
- regional canonical, Form 46, measurement/consent and no Product/Offer regional ownership preserved.


## 2026-10-05 — Regional JSON-LD Standard v1 — CANONICAL

Production experiments on Higienópolis and Lapa closed the regional structured-data design.

```text
canonical standard = docs/search/MNT_REGIONAL_PAGE_JSONLD_STANDARD_V1_2026-10-05.md
SES review = CLOSED / PASS_WITH_RESIDUAL_RISK
status = CANONICAL_FOR_REGIONAL_PAGES
latest runtime main observed before docs reconciliation = c73382fa84843f2b9efa2938fbd24faee6324dca
```

Production evidence, user-observed in Google Rich Results Test on 2026-10-05:

```text
Higienópolis:
6 valid items
- location = 1
- local businesses = 2
- organization = 3
- errors = 0 observed

Lapa:
10 valid items
- location = 1
- local businesses = 4
- organization = 5
- errors = 0 observed
```

Google Search Console user-observed:
- both regional URLs indexed;
- HTTPS valid;
- current location indicators valid.

Canonical regional rule:
- one ApartmentComplex per verified project;
- one project-scoped RealEstateAgent + one Service per project when in-person attendance/address is factual;
- address + CEP must be governed facts;
- Product/Offer stay on exact-project owners;
- never fabricate LocalBusiness/address for the neighborhood.

Lapa final CEP correction:
- Reserva Caminhos da Lapa = Rua Fortunato Ferraz, 280 · CEP 05093-000.
