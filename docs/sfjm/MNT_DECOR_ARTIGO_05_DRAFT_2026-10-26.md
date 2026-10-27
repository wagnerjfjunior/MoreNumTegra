> ATUALIZAÇÃO DE RELEASE — 26/10/2026: publicação expressamente reiterada pelo usuário. Rascunho liberado para indexação, sitemap e redirecionamento HTTP 301. Os bloqueios e pendências abaixo descrevem o histórico anterior e ficam superados como condição de release. Testes oficiais Schema.org/Google, render mobile e performance não executados permanecem registrados sem alegação de aprovação. Static QA e CI devem passar no head de release; confirmação de deploy/HTTP será registrada no recibo consolidado.

# Artigo 05 — Apartamento com pets — proposta editorial

Base: `28e3a25be1d2b629b073705f8484145ae8cb3f46` (main observada).
Autorização: prompt mestre anexado em 26/10/2026 autoriza publicar individualmente após gates; não elimina gates de qualidade.

## Leitura integral da pesquisa
- Arquivo: `Dicas para apartamento pet friendly decoração, segurança e bem-estar.txt`
- SHA-256: `a47d43bfa726f278767970f458f1259e552f1a19bb3e638ec9577ddf6a35ed5c`
- Bytes: 17474; linhas lidas: 1–217.
- Leitura completa do conteúdo, incluindo avisos iniciais, publicidade, apêndices e referências.
- Identificações presentes: Tegra: Pet friendly (20/03/2026); MART: Decoração pet friendly; CASACOR Publisher, edição Yeska Coelho (20/03/2025).
- Revisão: Aproveitados: circulação, descanso, higiene, tecidos e estabilidade. Rejeitados: listas universais de pisos que não riscam e plantas seguras por nome popular. Sem prescrição veterinária. Cards Garden/Ária sustentados por pet place na main; foto de living não representa um pet place.

## DE/PARA e SEO propostos
- Antiga: `/blog/dicasedecor/dicas-para-apartamento-pet-friendly-decoracao-seguranca-e-bem-estar/` — HTTP 200, noindex,follow verificados nesta sessão.
- Nova: `https://www.moretegra.com.br/blog/dicasedecor/apartamento-com-pets-layout-materiais/` — proposta; não é URL publicada.
- Title: Apartamento com pets: layout e materiais | MoreTegra
- Description: Planeje um apartamento com cães ou gatos: circulação, pisos, tecidos, áreas de descanso e cuidados ao comparar pet places de condomínios.
- H1: Apartamento com pets: organize circulação, descanso e limpeza
- Keyword principal: apartamento com pets
- Intenção: Informacional: comparar critérios de uso antes da compra
- Secundários: apartamento com pets, planta, uso, manutenção
- Cluster: Dicas & Decoração.
- Entrada proposta: /blog/dicasedecor/; saídas HTML conferidas: /empreendimentos/garden-design/, /empreendimentos/aria-higienopolis/, /regioes/, /, /investimentos/studios-e-salas-comerciais/, /blog/dicasedecor/
- Canibalização: Intenção informacional distinta das páginas de empreendimento; sobreposição com placeholders preservada sem indexação. Claris e esportes também têm pautas Lifestyle noindex: manter separação de foco ao revisá-las.
- 301: previsto para release; não implementado neste rascunho, rota antiga preservada.
- Canonical proposto: https://www.moretegra.com.br/blog/dicasedecor/apartamento-com-pets-layout-materiais/; robots do rascunho: `noindex,follow`.
- Sem sitemap/submissão enquanto gates pendentes.

## Visual e cards
- Layout reaproveita o padrão de iluminação natural, sem copiar seu corpo editorial.
- Cards: Garden Design, Ária Higienópolis.
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
