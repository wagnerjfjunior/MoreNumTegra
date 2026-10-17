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
