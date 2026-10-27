> ATUALIZAÇÃO DE RELEASE — 26/10/2026: publicação expressamente reiterada pelo usuário. Rascunho liberado para indexação, sitemap e redirecionamento HTTP 301. Os bloqueios e pendências abaixo descrevem o histórico anterior e ficam superados como condição de release. Testes oficiais Schema.org/Google, render mobile e performance não executados permanecem registrados sem alegação de aprovação. Static QA e CI devem passar no head de release; confirmação de deploy/HTTP será registrada no recibo consolidado.

# Artigo 10 — Cores e paletas — proposta editorial

Base: `28e3a25be1d2b629b073705f8484145ae8cb3f46` (main observada).
Autorização: prompt mestre anexado em 26/10/2026 autoriza publicar individualmente após gates; não elimina gates de qualidade.

## Leitura integral da pesquisa
- Arquivo: `Cor do Ano 2026 tendência para o seu Tegra(1).txt`
- SHA-256: `7b07f1412b172cda65b78c58fdbddebaea167417113f7e9bf21262dc3b19d972`
- Bytes: 23001; linhas lidas: 1–325.
- Leitura completa do conteúdo, incluindo avisos iniciais, publicidade, apêndices e referências.
- Identificações presentes: Tegra: Cor do Ano (10/03/2026); Equipe de Marketing Finger; Larissa Santiago/Meio & Mensagem (05/01/2026), com Bianca Dramali, Taise Kodama e Amanda Oliveira.
- Revisão: Aproveitados: pluralidade das referências, amostras, luz e materialidade. Pantone 11-4201 Cloud Dancer e escolhas Suvinil confirmados em fontes oficiais. Corrigida descrição divergente de Tempestade para rosa acinzentado. Sem inventar equivalência de tinta ou atribuir Pantone ao living usado; sem efeitos de saúde garantidos. Erro interno Finger ao trocar terroso/neutro por rosa/verde na passagem Eucatex não aproveitado.

## DE/PARA e SEO propostos
- Antiga: `/blog/dicasedecor/cor-do-ano-2026-tendencia-para-o-seu-tegra/` — HTTP 200, noindex,follow verificados nesta sessão.
- Nova: `https://www.moretegra.com.br/blog/dicasedecor/cores-decoracao-2026-paleta-apartamento/` — proposta; não é URL publicada.
- Title: Cores para decoração em 2026 | MoreTegra
- Description: Conheça referências de cores para 2026 e aprenda a testar paletas com a luz, os revestimentos e os móveis do seu apartamento antes de pintar.
- H1: Cores na decoração em 2026: transforme referências em uma paleta sua
- Keyword principal: cores decoração 2026
- Intenção: Informacional: comparar critérios de uso antes da compra
- Secundários: cores e paletas, planta, uso, manutenção
- Cluster: Dicas & Decoração.
- Entrada proposta: /blog/dicasedecor/; saídas HTML conferidas: /blog/dicasedecor/iluminacao-natural-apartamento-orientacao-solar/, /regioes/, /, /investimentos/studios-e-salas-comerciais/, /blog/dicasedecor/
- Canibalização: Intenção informacional distinta das páginas de empreendimento; sobreposição com placeholders preservada sem indexação. Claris e esportes também têm pautas Lifestyle noindex: manter separação de foco ao revisá-las.
- 301: previsto para release; não implementado neste rascunho, rota antiga preservada.
- Canonical proposto: https://www.moretegra.com.br/blog/dicasedecor/cores-decoracao-2026-paleta-apartamento/; robots do rascunho: `noindex,follow`.
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
