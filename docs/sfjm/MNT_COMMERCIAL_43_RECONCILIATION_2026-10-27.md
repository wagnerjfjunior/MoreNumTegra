# Matriz comercial MoreTegra — 27/10/2026

Escopo exclusivo: 43 URLs comerciais (27 empreendimentos, 14 regiões, home e investimentos). Blog fora do escopo.

- Fonte canônica: `wagnerjfjunior/MoreNumTegra`, sitemap.xml e vercel.json.
- Auditoria OpenSEO: `1d8ee177-e5dc-4511-9880-83fba4b96124` (27/10), 43 páginas comerciais HTTP 200 e tecnicamente indexáveis.
- GSC via OpenSEO: relatório de **desempenho** (24/07–24/10/2026), não inspeção de cobertura. 42 URLs comerciais registraram impressões; Jerivás sem linha. Sem impressões NÃO equivale a não indexada.
- Bing Webmaster: painel conectado Site Explorer mostra 37 URLs no nó sem www, com 3 indexed, 33 warning, 1 excluded; NÃO representa cobertura individual das 43 URLs com www nem total global do domínio.
- Sitemap antes: 57 total, 42 comerciais. Esta proposta inclui Studios Berrini: 58 total, 43 comerciais. Blog preservado.
- GSC: **Jerivás indexada, USER_CONFIRMED em 27/10/2026**; as outras 42 URLs comerciais aparecem na lista de exemplos indexados do GSC compartilhada pelo usuário em 27/10/2026; identificadas como INDEXED_USER_SUPPLIED_GSC_EXAMPLES_2026-10-27. O relatório histórico de desempenho não muda retroativamente. Bing Indexed individual não disponível, status preservados como NOT_VERIFIED_PER_URL.
- Canonical: **43/43 self-canonical www PASS na leitura do HTML-fonte do GitHub** (primeiras 130 linhas das 43 rotas Vercel). Redirecionamento não-www permanece sem teste HTTP individual: padronização esperada `https://www.moretegra.com.br/`, mas não declarar 43 testes por URL nem resposta HTTP de rede até obter evidência. Rotas presentes no vercel.json não provam canonical HTML. Evidência anterior SFJM: amostras 308/301 e alguns dois saltos.
- GSC Jerivás: confirmação do usuário encerra a dúvida sobre indexação atual; sem captura de detalhes (data de rastreamento/canonical Google). Exportar Bing Site Explorer por URL e inspecionar cobertura de outras páginas permanecem abertos.

Arquivo estruturado: `docs/sfjm/MNT_COMMERCIAL_43_RECONCILIATION_2026-10-27.csv`.

Gates: PR, CI exact-head, merge, deployment READY, releitura de sitemap publicado e matriz SFJM. Não alterar blog, meta robots, canonical, DNS ou redirects neste escopo.

## Adendo 27/10/2026 — Jerivás

- URL: `https://www.moretegra.com.br/empreendimentos/jerivas-caminhos-da-lapa/`.
- Google Search Console: **INDEXED / USER_CONFIRMED** nesta conversa, em 27/10/2026. Evidência: declaração do proprietário, não captura da API URL Inspection.
- OpenSEO Performance 24/07–24/10/2026: zero linhas/impressões registradas para a URL no retorno; não contradiz a indexação atual.
- HTTP 200 / indexável técnico / sitemap / canonical www: confirmados pela auditoria anterior.
- Bing: status individual desconhecido; não inferir indexação.
- Essa confirmação não comprova `43/43` indexadas no Google; comprova uma página adicional **individualmente verificada pelo usuário**.

## Adendo — relatório GSC de 47 URLs indexadas (USER_SUPPLIED 27/10/2026)

- A lista textual enviada pelo proprietário contém 47 URLs: **42 comerciais canônicas** (26 empreendimentos, 14 regiões incluindo hub, home e investimentos), **4 URLs de blog**, **1 URL da subpropriedade `https://lp.moretegra.com.br/`**.
- Das 43 URLs comerciais atuais, **42 constam da lista compartilhada**. Jerivás não consta dessa lista histórica, mas foi **indexada USER_CONFIRMED em 27/10/2026** separadamente e permanece assim na matriz.
- Portanto há evidência documental fornecida pelo usuário de indexação das 43 URLs comerciais, combinando 42 exemplos e 1 confirmação individual. **Não equivale a uma leitura única e sincronizada da Google URL Inspection API em 43 URLs.**
- A lista de 47 inclui URL antiga do blog `/blog/mercado/lapa-o-novo-polo-de-valorizacao-na-zona-oeste-de-sao-paulo/`, além de `/blog/mercado/valorizacao-imobiliaria-lapa-sao-paulo/`. Não inferir que o redirect antigo ainda retorna 200; confirmar via HTTP e cobertura atual à parte.
- O subdomínio `lp.moretegra.com.br` não pertence às 43 URLs comerciais canônicas nem ao sitemap principal; mantê-lo separado.
- Valores `gsc_impressions_20260724_20261024` e `gsc_clicks_20260724_20261024` permanecem históricos do OpenSEO; dados de cobertura do GSC não alteram essas métricas.
- Total indexado GSC informado: **47 na captura original**; não somar 1 automaticamente após a confirmação de Jerivás por poder existir defasagem ou mudança no índice.
- Bing e redirecionamentos não-www individuais continuam pendentes.
