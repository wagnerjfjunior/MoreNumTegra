# RESF — Bueno Brandão 257 · gate inicial · 17/10/2026

Status: CANDIDATE / NOT RELEASED. Escopo desta PR: somente `src-greenn/empreendimentos/bueno-brandao-257/index.html` e este recibo. Não declarar RESF completo, homologação mobile, CRM, CWV nem produção.

## Estado e fonte
- Projeto `wagnerjfjunior/MoreNumTegra`, base `main`, branch `feat/resf-bueno-brandao-257-20261017`.
- Padrão: `docs/frameworks/resf/v1/EXACT_PROJECT_PAGE_BUILD_STANDARD_V1_2026-10-11.md`, incluindo §10 e §11.
- Parecer: `docs/search/MNT_SES_SEO_GEO_OPINION_AND_VALIDATION_2026-10-17.md`.
- Evidências prévias fornecidas pelo usuário: Google Rich Results Test de 17/10/2026 com 3 itens válidos na URL do Bueno; não equivale a aceite RESF.
- Estado de produção anterior a este candidato: Vercel READY no commit da PR #422 de Higienópolis, `6b0dad011ba8562e51ee8511311724f06953ad19`. A PR desta branch não altera produção.

## Inventário preservado
- Hero com fachada; galeria interativa de 6 cenas (fachada, lobby, festas, fitness, piscina coberta, living 500 m²). Não se deve interpretar contagem de seis tags IMG estáticas como ausência de seis cenas de galeria.
- Plantas/tipologias informadas em texto: tipo 500 m², Garden 711 m², cobertura 923 m²; nenhuma planta nova publicada nesta PR.
- Localização: mapa regional embutido e CTA WhatsApp que pede a localização exata; não inferir coordenadas.
- Canonical, OG/Twitter, favicons, FAQ 5/5, contato Sabrina, Form46 e WhatsApp preexistentes: mantidos.
- Preço de referência da unidade 31 (500 m²): R$ 21.750.000, com divergência pública apontada no conteúdo preexistente. **Não revalidado nesta execução.** Não atualizar sem fonte comercial e validade.

## Alterações específicas deste candidato
1. Caminho de navegação do hero para a regional Vila Nova Conceição, coerente com ownership editorial.
2. Link interno contextual na seção localização; remove referência genérica ao microsite oficial no texto visível, sem alterar fatos de proximidade.
3. Dimensões intrínsecas da imagem principal da galeria para reduzir risco de layout shift antes do carregamento.
4. Anúncio acessível da posição da galeria (aria-live) e nome acessível do botão flutuante WhatsApp.
5. Nenhuma alteração de valores, estágio, tags comerciais, Form46, GTM ou rotas.

## Gates abertos antes de merge/release
- **Mídia:** validar URL HTTP e licença/crédito de cada uma das 6 cenas; decidir se hero/OG representam adequadamente o projeto. Não substituir por imagens arbitrárias ou presumir direitos.
- **Plantas:** levantar URLs oficiais de imagens para 500/711/923 m², associar legenda e área corretas; não criar sem fonte.
- **Bairro:** selecionar fotografias da Vila Nova Conceição com procedência/licença e crédito; não duplicar galerias do Tièl por conveniência.
- **SEO/GEO:** validar HTTP 200, canonical, robots, JSON-LD, H1, FAQ visível/schema, link regional, OG e favicons em Preview e produção após merge.
- **Mobile:** screenshots e interação em 390 px / touch da galeria, mapa e CTA; CWV/LCP/CLS sem inferir resultados.
- **CRM/medição:** verificar contexto do empreendimento no Form46, consentimento V2, GA4 e destino Green sem submissão real não autorizada.
- **Comercial:** confirmar tabela, validade, unidade 31, preço, disponibilidade e discrepância com referência pública.
- **Rollback:** PR de revert do squash após análise de impacto; nunca reset/force push em main.

## Critério
A PR permanece Draft, sem merge automático. Aceite do operador e evidências dos gates são necessários para certificar o RESF da página.

## Correção após revisão do operador — 17/10
- Removido integralmente o link regional adicionado dentro do hero; §10.4 RESF não admite desviar a jornada comercial no topo. Permanece somente o link contextual na seção de localização (§10.3).
- Removida a segunda faixa de características `hero-meta` no hero; o conjunto de quatro facts existente fora do hero é preservado.
- Formulário ajustado ao padrão visual claro do Tièl, com CSS escopado a `.mt-conversion-form`, campos em branco, borda, raio, contraste, foco e botão amarelo. Form 46 e atributos de campos permanecem intactos.
- Texto da área de conversão contextualizado ao Bueno Brandão 257, preservando a ressalva sobre referência comercial e confirmação de unidade.
- Status do candidato: **ainda Draft / não publicado**. CSS copiado do padrão aprovado exige QA visual em mobile e desktop antes do merge.

## Correção canônica dos fatos — 17/10/2026
- Contrato RESF §3.C: posições fixas 1) área/configuração, 2) vagas, 3) diferenciais + bairro, 4) estágio. A faixa anterior (500, 711, 923, bairro) não atendia à ordem obrigatória.
- Candidato agora apresenta: 500 m² e 5 suítes (tipo, com 711 m² Garden e 923 m² cobertura contextualizados); 5 a 7 vagas conforme tipologia (5 tipo/Garden, 7 cobertura); Vila Nova Conceição + arquitetura/paisagismo; pronto para morar.
- Referências públicas verificadas em 17/10: https://buenobrandao257.com/ (microsite de apresentação do produto: 500/711/923, 5 suítes, 5 ou 7 vagas), https://www.tabhouse.com.br/empreendimentos/bueno-brandao-257 (mesmas vagas/tipologias) e https://www.npiconsultoria.com.br/imovel-106092/bueno-brandao-257 (estágio pronto, 500 m², 5 vagas). Fontes não substituem a confirmação comercial de estoque, preço e tabela com a autoridade do produto. Há divergências em outros sites, portanto a verificação da fonte oficial vigente continua gate aberto.
- Removidas regras CSS residuais `.hero-meta`, inclusive mobile; somente uma faixa `.facts` no HTML. Desktop com 4 colunas e mobile 2×2 continuam previstos pelo CSS existente. Sem screenshot mobile verificado, não declarar QA visual PASS.

## Seletor comercial tipo/cobertura — solicitação do operador (17/10)
- Referências comerciais **USER_PROVIDED**, ainda não validadas contra tabela assinada/estoque: tipo **500 m²**, **5 vagas**, **R$ 21.750.000** (unidade 31 já presente); cobertura **923 m²**, **7 vagas**, **R$ 40.150.500** (número de unidade não fornecido). A tipologia Garden 711 m² segue descrita na página, mas não foi cadastrada como oferta no seletor.
- O seletor no bloco `#valores` usa `?unidade=500` ou `?unidade=923`; atualiza visualmente valor, tipologia e os facts 1 e 2, com contexto da opção de condições do Form 46. Sem alteração de preço no schema Offer/Product (inexistente para estas referências na página).
- FAQ visível e JSON-LD sincronizados para as duas referências. Oferta/estoque/preço precisam de validação comercial antes do release; não inventar ID de unidade, data de tabela ou disponibilidade da cobertura.
- QA restante: testar seleção nos dois parâmetros, retorno ao padrão, toque mobile, foco e leitura dinâmica, coleta real de contexto CRM com consentimento, e verificar que o runtime Form 46 recebe a opção escolhida. Rollback pela PR.

## Auditoria de mídia, plantas e bairro — 17/10/2026

**Método:** leitura do HTML candidato na branch e consulta ao material de apresentação em `https://buenobrandao257.com.br/`. Acesso via web ao arquivo individual foi bem-sucedido apenas para algumas cenas; tentativas de acesso a outras URLs foram inconclusivas. Não há medição Lighthouse, licença de redistribuição comprovada nem validação de todas as imagens HTTP em browser real.

### Galeria dinâmica existente
A página tem seis `scenes` em JavaScript e apenas uma imagem de palco no DOM estático (não confundir com ausência das cenas):

| Cena | Origem existente | Evidência da auditoria |
|---|---|---|
| Detalhe da fachada | `BUEN_07_RESID_EXT_Detalhe%20Fachada%202_EF-opt-1920.WEBP` | presente no código; HTTP isolado não certificado |
| Lobby | `BUEN_21_RESID_INT_Lobby_EF-opt-1920.WEBP` | imagem recuperada e visualizada |
| Salão de festas | `BUEN_25_RESID_INT_Festas_EF-opt-1920.WEBP` | imagem recuperada e visualizada |
| Fitness | `BUEN_29_RESID_INT_Fitness_EF-opt-1920.WEBP` | presente no código; leitura externa inconclusiva |
| Piscina coberta | `BUEN_31_RESID_INT_Piscina%20Coberta_EF-opt-1920.WEBP` | presente no código; leitura externa inconclusiva |
| Living decorado 500 m² | `BUEN_44_RESID_APT_Living%20Decorado%20500_EF_v1-opt-1920.WEBP` | imagem recuperada e visualizada |

Material de origem também enumera cenas de suíte, banho master, Garden e outras; não significa que haja autorização comercial ou necessidade de replicação total. As perspectivas ilustrativas devem ser descritas como tal, sem tratá-las como fotografias de imóvel entregue.

### Plantas — lacuna funcional confirmada
Seção `#residencias` do MoreTegra descreve 500 m² (tipo), 711 m² (Garden) e 923 m² (cobertura), mas **não apresenta imagem de planta**. O material de apresentação oferece quatro estados de seleção: planta tipo 500 m²; Garden 711 m²; cobertura 923 m² pavimento inferior; cobertura 923 m² pavimento superior. **Gate aberto: resolver as quatro URLs exatas dos arquivos, origem/licença e título/ALT por cena antes de implementar visualizador**; não supor URL por padrão de nomes.

### Entorno e localização
Há mapa regional e CTA WhatsApp que solicita localização exata. O material de origem exibe Praça Pereira Coutinho e Parque Ibirapuera como contexto do bairro e informa Rua Bueno Brandão, 257. Preservar mapa/CTA e introduzir somente imagens de entorno com URL direta testada, crédito e licenciamento; não duplicar o mapa. Link para regional permanece apenas no bloco de localização.

### Prioridades e impedimentos
1. Resolver URLs exatas e direito de uso das quatro plantas; em seguida implementar visualizador agrupado com duas vistas de cobertura, sem confundir com duas unidades.
2. Verificar HTTP, dimensões, MIME, origem e créditos de todas as seis cenas; aplicar fallback não crítico quando necessário, sem quebrar galeria.
3. Avaliar hero e OG existentes por enquadramento mobile, adequação visual e direitos; **não substituir sem aceite**.
4. Selecionar contexto do bairro com procedência, créditos e ALT verdadeiros.
5. QA em 390 px e desktop da galeria/plantas, touch, foco, CLS/LCP; Form46 e seletor 500/923 aprovados pelo usuário não devem ser alterados por auditoria de mídia.

**Conclusão:** RESF mídia/plantas = **PARCIAL, NOT ACCEPTED**. Mudanças da auditoria são somente documentação; a página candidata não foi publicada.

## Plantas integradas a partir do site de apresentação — 17/10/2026
- O usuário indicou `https://buenobrandao257.com.br/` como fonte oficial. O navegador conectado identificou os nomes reais, e as quatro URLs diretas de `/images/plantas/optimized/` foram abertas por leitura web externa, cada uma exibindo a planta correspondente.
- Tipo 500 m²: `BUEN_07_RESID_PLA_Tipo_P3-opt-1920.WEBP`.
- Garden 711 m²: `BUEN_08_RESID_PLA_Garden_P3-opt-1920.WEBP`.
- Cobertura 923 m²: `BUEN_09_RESID_PLA_Duplex%20Inferior_P3-opt-1920.WEBP` e `BUEN_10_RESID_PLA_Duplex%20Superior_P4-opt-1920.WEBP`.
- Implementação: visualizador de quatro escolhas com conteúdo inicial em HTML, ALT específicos, legenda, carregamento lazy, preload na troca, falha de imagem e grade mobile; a cobertura tem dois pavimentos da mesma unidade/tipologia.
- Sem alteração do seletor comercial 500/923, preços, facts homologados, Form 46 ou schema comercial. A planta do Garden tem finalidade informativa; não há preço/estoque presumido.
- **Validação pendente:** evidência visual real no SFJM Live Sync desktop e mobile, verificação de direitos/uso comercial de imagens do site de apresentação e checks do head exato. Não mergear sem aceite.

## Vídeos — implementação na PR #425 (17/10/2026)
- Cinco vídeos publicados na seção de vídeos do site de apresentação `https://buenobrandao257.com.br/` foram associados pelos identificadores das respectivas miniaturas do YouTube: `hq6MTFhsArE` (fachada), `M0Zx3H-c5Po` (paisagismo), `gksJjyBbyvo` (wellness), `hwHzlKsqxKE` (interiores Roberto Migotto), `UnH_--4h6Gk` (curadoria de arte).
- Seção `#videos` depois da galeria e antes das plantas. Cinco cards com título editorial, breve resumo, thumbnail lazy, link externo direto para o vídeo, botão que insere iframe `youtube-nocookie.com` somente por toque/clique; sem player ou scripts de terceiros no carregamento inicial.
- Players/thumbnail são externos e ainda demandam smoke visual, disponibilidade pública de reprodução, aprovação de uso das miniaturas e revisão do comportamento de consentimento de mídia com a política aplicável. Player pode definir cookies/contatos de terceiro após clique; isso deve constar do gate de privacidade.
- Facts e seletor comercial homologados, formulário Form46, mapa, referências comerciais e hero foram preservados. Não publicar sem QA e aceite do operador.
