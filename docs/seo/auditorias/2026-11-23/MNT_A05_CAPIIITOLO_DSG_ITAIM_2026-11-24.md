# A05 — CAPIITOLO e DSG Itaim: auditoria SEO e links para hubs regionais

Data: 2026-11-24. Projeto MoreNumTegra. Status: **candidato de alteração isolada — SEM MERGE**, a partir de `main ed9978d75da3b3d7888b8bfd532c4f315b1f5052`.

## Objetivo e limites
Fechar o primeiro defeito verificável da A05: o hub de bairro já direciona para a página do empreendimento, mas a página comercial não possui `href` contextual de volta ao hub. Conservar design, copy aprovada, preços, tipologias, Form46, canal SP, WhatsApp, schema e medição. Sem mudar `Product`/`Offer`, status ou disponibilidade.

## Evidências de produção e Search Console
- URLs canônicas indexadas (inspeção GSC/Google Search Console executada via OpenSEO em 24/11/2026; canonical declarado e selecionado igual em ambos, Googlebot mobile, status `Submitted and indexed`).
- Janela GSC **2026-08-21 a 2026-11-21** (dados consolidados por `page`, não atribuir mudança de posição à presente PR):
  - `/empreendimentos/capiitolo-piero-lissoni/`: **64 impressões, 1 clique, CTR 1,56%, posição média 9,2**. Consultas observadas na dimensão query (amostragem incompleta/anônima): `capitolo tegra` (6 impressões, posição 9,5), `capítulo tegra` (6, posição 16,3), `capitolo by piero lissoni` (1, posição 27). Soma de queries não é igual ao agregado de página por anonimização do Google.
  - `/empreendimentos/dsg-itaim/`: **141 impressões, 7 cliques, CTR 4,96%, posição média 8,8**. Termos observados: `dsg itaim` (10 impressões, posição 19,8), `studio dsg` (1, posição 16), `dsg office` (1, posição 11). Amostra limitada e de baixa significância estatística.
- Inspeção de índice CAPIITOLO: último crawl registrado **2026-09-23**; DSG: **2026-11-15**. Não confundir com data de verificação ou afirmar que o Google já renderizou todas as alterações recentes.
- OpenSEO crawler anterior: **218 palavras / 0 links internos / HTTP200 / indexável** em CAPIITOLO; **213 palavras / 0 links internos / HTTP200 / indexável** em DSG; auditoria do DSG é uma fotografia histórica com title anterior (`Últimas unidades`), superada pelo HTML atual. O crawler captura o **HTML inicial**, não a experiência JS completa.

## Achado arquitetural
Ambas as URLs comerciais são documentos-shell em `src-greenn/empreendimentos/<slug>/index.html`, com H1, canonical, robots `index,follow`, copy comercial curta e JSON-LD inicial. O JS usa `fetch("/experiments/<slug>-editorial-v3/index.html")`, `DOMParser` e `document.write` para substituir o DOM pela página completa. Os templates `experiments/` têm `noindex,nofollow` **por projeto**, mas o bootstrap ajusta a cópia renderizada para `index,follow` e injeta o canonical. Indexação confirmada não é prova de que toda a experiência JS é usada como fonte de ranking ou de links para o Google. Falhas da requisição do template deixam o visitante na versão simplificada.

## Alteração da etapa 1
1. CAPIITOLO shell: uma frase curta após o atendimento SP, com link `/regioes/chacara-klabin/`.
2. CAPIITOLO template: mesma frase no bloco editorial de contexto geográfico (`klabin-title`).
3. DSG shell: uma frase curta após o atendimento SP, com link `/regioes/itaim-bibi/`.
4. DSG template: mesma frase no bloco editorial de contexto geográfico.
5. `sitemap.xml`: atualizar `lastmod` apenas das duas URLs de projeto para `2026-11-24`; 84 entradas preservadas.

Texto âncora inequívoco, útil para a pessoa e para crawl, sem criar outra URL indexável ou afirmar que haja outros empreendimentos no bairro. Nenhum novo H2, mídia, preço, benefício FGTS ou alegação de disponibilidade.

## Ressalvas importantes
- **DSG tem perfis distintos:** offices, studios e apartamentos. A referência monetária publicada na página corresponde explicitamente a **Office de 32 m², unidade 208, agosto/2026**; não utilizar este valor como promessa para residencial, FGTS ou estoque vigente. Revisão comercial factual da copy/preço/estado exige uma fonte atual da Tegra e PR distinta; fora deste patch.
- CAPIITOLO e DSG possuem páginas indexadas, mas a estrutura `fetch` + `document.write` mantém dependência de renderização e HTML inicial curto. Uma futura solução estrutural, se aprovada, pode gerar **HTML completo estático** a partir dos templates, preservando a experiência e o Form46; **não fazer essa reconstrução na A05 etapa 1**.
- Rich Results da inspeção do CAPIITOLO detectaram `Product snippets` e `Merchant listings` com avisos `review/aggregateRating` e `shippingDetails/returnPolicy`. **Não inventar avaliações ou política de frete para sanar avisos.** Schema comercial continua no escopo específico de governança.
- Não confundir a A05 (CAPIITOLO/DSG) com a PR #581 (Ária/Mozae/Ledge/Ampère/YPY). Hubs já possuem links de entrada; não editar hubs nem modificar validadores/snapshots.

## Gate de homologação
- Verificar diff exato dos quatro HTMLs e `lastmod`; preços, canonical/robots/JSON-LD, Form46, WhatsApp, medição, conteúdo principal e bloco de notas legadas inalterados.
- Playwright Chromium local: validar primeiro HTML com JavaScript desligado, depois `document.write` e links visíveis no DOM renderizado em 360/390/430/900/1440; navegar ao hub regional, canonical e formulário 46, ausência de POST; registrar overflow se ocorrer sem atribuir automaticamente culpa ao patch.
- Comparar conteúdo renderizado a `main`, sem inventar ganho de SEO.
- CI do head; LOCAL_LIVE_SYNC porta 8080 e revisão humana; solicitar ordem **específica** antes de merge, deploy, IndexNow ou Search Console.
- SFJM: topo da `main` ainda é registro antigo de Órbita/Rio (já publicados) e PR documental #598 segue não integrada. O pedido atual determina o foco A05, **não** autoriza mesclar PRs não relacionadas. Estado de SFJM permanece com drift documental até reconciliação posterior.

## Ajuste RESF solicitado após a etapa 1 — Facts, não hero-meta

**Decisão explícita do proprietário:** ambas as páginas apresentavam simultaneamente `.hero-meta` no hero e `.facts` logo depois. A faixa canônica do RESF é `.facts`; eliminar a duplicação, conservando os CTA do hero e a hierarquia de seções. Fonte contratual: `docs/frameworks/resf/v1/EXACT_PROJECT_PAGE_BUILD_STANDARD_V1_2026-10-11.md`, seção 3C: exatamente **1** faixa imediatamente após hero; **4** fatos ordenados (área/tipologia, vagas, diferencial+bairro, estágio), **4** colunas desktop e **2×2** mobile; `.hero-meta` e seus estilos proibidos.

**Implementação na mesma PR #611 (sem merge):**
- `experiments/capiitolo-editorial-v3/index.html`: removidos HTML e CSS de `.hero-meta`, inclusive sua regra mobile. Uma única faixa `.facts` passa a exibir, em ordem: (1) **210 m²**, apartamento tipo com 4 suítes; (2) **3 vagas**, apenas para a configuração tipo; (3) **torre única**, Chácara Klabin e Piero Lissoni; (4) **em construção**. Área Giardino 281 m² e Duplex 363 m² continuam explicadas no módulo próprio de tipologias, não foram eliminadas da página.
- `experiments/dsg-itaim-editorial-v3/index.html`: removidos HTML e CSS de `.hero-meta`; uma única `.facts` exibe (1) **27–61 m² offices**, comercial; (2) **Vagas por tipologia — sob consulta**, sem alegação de quantidade; (3) **uso misto**, studios e offices no Itaim Bibi; (4) **entregue**, estágio do empreendimento. Studios de 27/29 m² e apartamentos de 44 m² seguem na seção de tipologias, sem extrapolação de disponibilidade residencial.
- H1, imagem/iframe do hero, CTA `Receber condições`, bloco comercial, Form46, WhatsApp, medição, schema e URLs canônicas permanecem inalterados. A PR #611 etapa 1 (links de retorno de bairro em shell e template) também permanece intacta.
- `a05-regional-reciprocity-smoke.mjs` agora verifica **zero** `.hero-meta`, **1** `.facts` imediatamente após hero, **4** posições no contrato, dados visíveis/ordem, grid 2×2 de 360–430 px e 4 colunas 900/1440, preservando checks de links de bairro/SEO/Form46 e zero POST.

### FACTS_DATA_GAP DSG — vagas não verificadas

Em 24/11/2026, o HTML canônico e o template DSG não fornecem quantidade de vagas por tipologia. A página pública oficial Tegra `https://www.tegraincorporadora.com.br/sp/sao-paulo/sul/itaim-bibi/dsgitaim` informa escritórios, studios, apartamentos e estágio entregue, mas **não declara quantidade de vagas** no conteúdo textual consultado. As plantas residenciais no material oficial estão marcadas como vendidas, e não se pode inferir vaga/estoque de office, studio ou apartamento a partir de terceiros. Foi preservado o **slot** obrigatório da segunda posição sem declarar um número: `Sob consulta | Vagas por tipologia`, com marcador `data-fact-gap="parking"`. **Isso é uma solução provisória, não aprovação plena do contrato RESF**. Gate comercial para merge: o proprietário deve confirmar valor e tipologia das vagas em material oficial ou aprovar **exceção específica** para o texto deste slot. Nenhum alegado `0 vagas`, `1 vaga` ou `2 vagas` foi inventado.

### Achado comercial independente, fora da mudança

Na página oficial Tegra consultada em 24/11, o preço publicizado de referência para **Office 32 m² unidade 208, Nov/26** é **R$ 355.000**. O shell DSG nesta PR conserva a referência anterior **R$ 412.500, Ago/26**; esses valores e respectivas datas são discrepantes. Esta PR não atualiza preços porque a solicitação foi sobre apresentação do RESF, e a reconciliação comercial exige autorização distinta com registro da origem, vigência e unidade. Não afirmar que o valor antigo seja preço atual; esse é um `COMMERCIAL_DATA_REVALIDATION` pendente.

**Status de aceite:** a etapa RESF está preparada em branch, e CI precisa ser validado no head exato após este adendo. Não houve merge, publicação, contato com CRM ou atualização de preço.

### Regressão E2E identificada: runtime CAPIITOLO sobrescrevia os facts

O smoke de navegador, após a correção da leitura de texto afetada pelo `text-transform` CSS, detectou que o quarto fact do CAPIITOLO renderizado era `Chácara Klabin / São Paulo`, apesar de o template correto declarar `Em construção / Estágio do empreendimento`. Causa encontrada na `main` original: dentro de `initCapiitoloExperience()` em `src-greenn/preview/runtime.js`, um bloco legado selecionava indiscriminadamente `.facts .fact[3]` e substituía seus textos, desacoplando conteúdo renderizado e template. Removido **somente esse bloco mutador** no candidato A05, mantendo intactos mapa, badge, lead, outros fatos e demais funções do runtime. O bootstrap do CAPIITOLO continua a utilizar seu schema e preço definidos na página comercial. O teste regressivo do quarto fact impede que o erro retorne sem detecção.

Este ajuste toca `runtime.js` (módulo compartilhado) com modificação localizada ao código CAPIITOLO. Exige suíte CI completa + smoke e inspeção de diff antes do merge. Nenhuma autorização de merge/publicação foi inferida.
