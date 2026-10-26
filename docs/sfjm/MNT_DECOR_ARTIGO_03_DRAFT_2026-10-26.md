# Artigo 03 — Iluminação artificial — proposta editorial

Base: `28e3a25be1d2b629b073705f8484145ae8cb3f46` (main observada).
Autorização: prompt mestre anexado em 26/10/2026 autoriza publicar individualmente após gates; não elimina gates de qualidade.

## Leitura integral da pesquisa
- Arquivo: `Projeto luminotécnico como a iluminação transforma os ambientes.txt`
- SHA-256: `720eae9c30ff15990096145349c69c422f3f54f484a7b475b99afab0971ababd`
- Bytes: 50846; linhas lidas: 1–793.
- Leitura completa do conteúdo, incluindo avisos iniciais, publicidade, apêndices e referências.
- Identificações presentes: Tegra: Projeto luminotécnico (08/04/2026); 4ED/Redação (09/07/2026); Sandra Solda/Spuma (02/07/2026); apêndices sobre brinquedotecas Tegra/Afetto.
- Revisão: Aproveitados: briefing, camadas, ofuscamento, especificações e comandos. Corrigidos: kelvin não mede intensidade; luz fria não é requisito universal para cozinha/concentração; LED não implica qualquer compatibilidade com dimmer. Apêndices infantis reconhecidos e separados da pauta. Sem prometer personalização de todos os projetos.

## DE/PARA e SEO propostos
- Antiga: `/blog/dicasedecor/projeto-luminotecnico-como-a-iluminacao-transforma-os-ambientes/` — HTTP 200, noindex,follow verificados nesta sessão.
- Nova: `https://www.moretegra.com.br/blog/dicasedecor/iluminacao-apartamento-camadas-circuitos/` — proposta; não é URL publicada.
- Title: Iluminação de apartamento: como planejar | MoreTegra
- Description: Entenda camadas de luz, temperatura de cor, ofuscamento e circuitos para conversar com o projetista e planejar a iluminação do apartamento.
- H1: Iluminação de apartamento: planeje a luz a partir da rotina
- Keyword principal: iluminação de apartamento
- Intenção: Informacional: comparar critérios de uso antes da compra
- Secundários: iluminação artificial, planta, uso, manutenção
- Cluster: Dicas & Decoração.
- Entrada proposta: /blog/dicasedecor/; saídas HTML conferidas: /blog/dicasedecor/iluminacao-natural-apartamento-orientacao-solar/, /regioes/, /, /investimentos/studios-e-salas-comerciais/, /blog/dicasedecor/
- Canibalização: Intenção informacional distinta das páginas de empreendimento; sobreposição com placeholders preservada sem indexação. Claris e esportes também têm pautas Lifestyle noindex: manter separação de foco ao revisá-las.
- 301: previsto para release; não implementado neste rascunho, rota antiga preservada.
- Canonical proposto: https://www.moretegra.com.br/blog/dicasedecor/iluminacao-apartamento-camadas-circuitos/; robots do rascunho: `noindex,follow`.
- Sem sitemap/submissão enquanto gates pendentes.

## Visual e cards
- Layout reaproveita o padrão de iluminação natural, sem copiar seu corpo editorial.
- Cards: Nenhum: ausência de relação comercial suficientemente comprovada.
- Hero: https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/361/Imagem/Tegra-Incorporadora-Living-62-Metros-Empreendimento-Garden-Design-Private-Park-Residence-Apartamentos-Lapa-Sao-Paulo-SP-1400x1400-1758230055670.jpg.
- Mídias reutilizadas exclusivamente do acervo já presente na main; dimensões de hero/cards medidas nos arquivos remotos.
- Living Garden usado para interiores não comprova tipo de piso, cor Pantone ou recursos pet; texto não atribui esses fatos à fotografia.
- Foto, CRECI, WhatsApp e três cards finais Sabrina preservados. Sem alteração CRM, páginas comerciais, tracking ou consentimento.

## Verificações
- JSON parse, quatro entidades (BlogPosting, BreadcrumbList, Person, RealEstateAgent), IDs únicos, H1, canonical, breadcrumb, papéis de autoria, robots noindex, destinos internos por rewrite, imagens com alt/dimensões, três cards finais e ausência de links aninhados: PASS estático.
- Os validadores canônicos de favicon, social e duas imagens comerciais passaram na sessão; não são prova de mobile, indexação ou qualidade das dez páginas.
- Artigo 1: 13 recursos/destinos HTTP 200; esta bateria não foi repetida para as demais páginas e não comprova a URL nova.
- Schema.org oficial: NÃO EXECUTADO — acesso ao navegador bloqueado pela revisão automática.
- Google Rich Results: NÃO EXECUTADO — ferramenta de navegação indisponível nesta execução.
- Render mobile, overflow/toque/teclado e performance: NÃO EXECUTADOS; tentativa de instalar navegador de teste bloqueada pela revisão automática como alternativa à navegação bloqueada.
- Avisos opcionais do schema: não aferidos oficialmente; sem dados inventados para eliminá-los.
- CI do head, PR e commit: consultar o head desta PR ao retomar; não inferir PASS daqui.

## Release, indexação e rollback
**BLOQUEADO_PARA_RELEASE**. Rascunho em branch, sem merge e sem deploy. Google/Bing: NÃO SUBMETIDO; indexação nova não consultada porque a URL não foi publicada.
Após sanar mídias e validar mobile, executar gates restantes, liberar robots da URL individual, acrescentar sitemap/301 e confirmar CI/merge/Vercel/HTTP antes de IndexNow ou inspeção Google. OpenSEO dispõe de inspeção GSC somente leitura e IndexNow; não há ferramenta exposta de solicitação individual de indexação Google.
Rollback antes de merge: encerrar a PR; produção permanece intacta. Após eventual release: revert governado do merge, sem reset/force-push.
