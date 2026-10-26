# Artigo 06 — Quadras esportivas — proposta editorial

Base: `28e3a25be1d2b629b073705f8484145ae8cb3f46` (main observada).
Autorização: prompt mestre anexado em 26/10/2026 autoriza publicar individualmente após gates; não elimina gates de qualidade.

## Leitura integral da pesquisa
- Arquivo: `Do tênis ao beach tennis quadras valorizam condomínios.txt`
- SHA-256: `b1f94eb1c3ee92efd8c2758bbc9c12c53f012ad48fc49b472aea938b5f0fe499`
- Bytes: 24694; linhas lidas: 1–502.
- Leitura completa do conteúdo, incluindo avisos iniciais, publicidade, apêndices e referências.
- Identificações presentes: Tegra: Do tênis ao beach tennis (19/03/2026); Imóveis de Valor/Valor, trecho de identificação (25/03/2022); Vivali (30/09/2026).
- Revisão: Aproveitados: modalidade, conservação, reserva, iluminação e entorno. Medidas checadas nas regras oficiais ITF 2026. Não reproduzido conteúdo Valor. Rejeitadas valorização automática e atribuição de tênis/beach tennis a quadra recreativa de SP. Pauta Lifestyle sobre esporte continua noindex e deve ter foco distinto na revisão futura.

## DE/PARA e SEO propostos
- Antiga: `/blog/dicasedecor/do-tenis-ao-beach-tennis-quadras-valorizam-condominios/` — HTTP 200, noindex,follow verificados nesta sessão.
- Nova: `https://www.moretegra.com.br/blog/dicasedecor/quadras-condominio-tenis-beach-tennis/` — proposta; não é URL publicada.
- Title: Quadras no condomínio: tênis e beach tennis | MoreTegra
- Description: Compare quadras de tênis e beach tennis no condomínio: área de jogo, superfície, iluminação, reservas, manutenção e distância dos apartamentos.
- H1: Tênis e beach tennis no condomínio: avalie a quadra e seu uso
- Keyword principal: quadras no condomínio
- Intenção: Informacional: comparar critérios de uso antes da compra
- Secundários: quadras esportivas, planta, uso, manutenção
- Cluster: Dicas & Decoração.
- Entrada proposta: /blog/dicasedecor/; saídas HTML conferidas: /regioes/, /, /investimentos/studios-e-salas-comerciais/, /blog/dicasedecor/
- Canibalização: Intenção informacional distinta das páginas de empreendimento; sobreposição com placeholders preservada sem indexação. Claris e esportes também têm pautas Lifestyle noindex: manter separação de foco ao revisá-las.
- 301: previsto para release; não implementado neste rascunho, rota antiga preservada.
- Canonical proposto: https://www.moretegra.com.br/blog/dicasedecor/quadras-condominio-tenis-beach-tennis/; robots do rascunho: `noindex,follow`.
- Sem sitemap/submissão enquanto gates pendentes.

## Visual e cards
- Layout reaproveita o padrão de iluminação natural, sem copiar seu corpo editorial.
- Cards: Nenhum: ausência de relação comercial suficientemente comprovada.
- Hero: PENDENTE — selecionar imagem pertinente e autorizada; não usar fotografia sem relação comprovada.
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
