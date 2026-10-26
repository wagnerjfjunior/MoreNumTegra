# Artigo 04 — Brinquedoteca — proposta editorial

Base: `28e3a25be1d2b629b073705f8484145ae8cb3f46` (main observada).
Autorização: prompt mestre anexado em 26/10/2026 autoriza publicar individualmente após gates; não elimina gates de qualidade.

## Leitura integral da pesquisa
- Arquivo: `Espaço kids e brinquedotecas design lúdico que estimula crianças.txt`
- SHA-256: `4a6e5d0d0e069e70063fc532ccc4aa9cadc817d58d52da723883dc1f8c4e156a`
- Bytes: 21388; linhas lidas: 1–208.
- Leitura completa do conteúdo, incluindo avisos iniciais, publicidade, apêndices e referências.
- Identificações presentes: Tegra: Espaço kids (07/04/2026); Giovanna Jarandilha/CASACOR (31/10/2019), com autores e fotógrafos dos sete ambientes; Afetto (20/10/2025).
- Revisão: Aproveitados: zonas de atividades, materiais acessíveis, evolução etária e convivência. Corrigidos: piso emborrachado não comprova proteção para qualquer queda; madeira não é automaticamente sustentável; brinquedoteca não inclui monitoria nem garante desenvolvimento individual. Cards YPY/Garden comprovados na main.

## DE/PARA e SEO propostos
- Antiga: `/blog/dicasedecor/espaco-kids-e-brinquedotecas-design-ludico-que-estimula-criancas/` — HTTP 200, noindex,follow verificados nesta sessão.
- Nova: `https://www.moretegra.com.br/blog/dicasedecor/brinquedoteca-condominio-uso-seguranca/` — proposta; não é URL publicada.
- Title: Brinquedoteca no condomínio: como avaliar | MoreTegra
- Description: Veja o que observar em brinquedotecas: atividades por idade, circulação, supervisão, conservação e relação com o playground na escolha do apartamento.
- H1: Brinquedoteca no condomínio: como avaliar o espaço para sua família
- Keyword principal: brinquedoteca no condomínio
- Intenção: Informacional: comparar critérios de uso antes da compra
- Secundários: brinquedoteca, planta, uso, manutenção
- Cluster: Dicas & Decoração.
- Entrada proposta: /blog/dicasedecor/; saídas HTML conferidas: /empreendimentos/ypy-alto-do-ipiranga/, /empreendimentos/garden-design/, /regioes/, /, /investimentos/studios-e-salas-comerciais/, /blog/dicasedecor/
- Canibalização: Intenção informacional distinta das páginas de empreendimento; sobreposição com placeholders preservada sem indexação. Claris e esportes também têm pautas Lifestyle noindex: manter separação de foco ao revisá-las.
- 301: previsto para release; não implementado neste rascunho, rota antiga preservada.
- Canonical proposto: https://www.moretegra.com.br/blog/dicasedecor/brinquedoteca-condominio-uso-seguranca/; robots do rascunho: `noindex,follow`.
- Sem sitemap/submissão enquanto gates pendentes.

## Visual e cards
- Layout reaproveita o padrão de iluminação natural, sem copiar seu corpo editorial.
- Cards: YPY Alto do Ipiranga, Garden Design.
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
