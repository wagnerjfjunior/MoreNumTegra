# Artigo 07 — Recarga elétrica — proposta editorial

Base: `28e3a25be1d2b629b073705f8484145ae8cb3f46` (main observada).
Autorização: prompt mestre anexado em 26/10/2026 autoriza publicar individualmente após gates; não elimina gates de qualidade.

## Leitura integral da pesquisa
- Arquivo: `Carro elétrico e condomínio prédios com infraestrutura de recarga.txt`
- SHA-256: `edec81a6d4b1d4d97f6d7b91355dec802083bc8230bf9fcfe04fd3a62e123c36`
- Bytes: 16238; linhas lidas: 1–261.
- Leitura completa do conteúdo, incluindo avisos iniciais, publicidade, apêndices e referências.
- Identificações presentes: Tegra: Carro elétrico (18/03/2026); Agência SP (19/02/2026); Redomo; Fantástico (17/08/2026).
- Revisão: Aproveitados: escopo de infraestrutura, capacidade, medição e responsabilidades. Lei 18.403/2026 conferida no texto oficial Alesp. Rejeitados: vaga verde implica medição individual automática, todos híbridos recarregam, custos coletivos obrigatoriamente de todos, valorização/economia garantidas. Sem atribuir capacidade elétrica específica a YPY ou outro projeto.

## DE/PARA e SEO propostos
- Antiga: `/blog/dicasedecor/carro-eletrico-e-condominio-predios-com-infraestrutura-de-recarga/` — HTTP 200, noindex,follow verificados nesta sessão.
- Nova: `https://www.moretegra.com.br/blog/dicasedecor/recarga-carro-eletrico-condominio-infraestrutura/` — proposta; não é URL publicada.
- Title: Recarga no condomínio: o que verificar | MoreTegra
- Description: Diferencie infraestrutura, ponto elétrico e carregador instalado. Confira capacidade, medição, custos e documentação antes de comprar o apartamento.
- H1: Recarga no condomínio: o que a infraestrutura precisa esclarecer
- Keyword principal: recarga carro elétrico condomínio
- Intenção: Informacional: comparar critérios de uso antes da compra
- Secundários: recarga elétrica, planta, uso, manutenção
- Cluster: Dicas & Decoração.
- Entrada proposta: /blog/dicasedecor/; saídas HTML conferidas: /regioes/, /, /investimentos/studios-e-salas-comerciais/, /blog/dicasedecor/
- Canibalização: Intenção informacional distinta das páginas de empreendimento; sobreposição com placeholders preservada sem indexação. Claris e esportes também têm pautas Lifestyle noindex: manter separação de foco ao revisá-las.
- 301: previsto para release; não implementado neste rascunho, rota antiga preservada.
- Canonical proposto: https://www.moretegra.com.br/blog/dicasedecor/recarga-carro-eletrico-condominio-infraestrutura/; robots do rascunho: `noindex,follow`.
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

## Continuidade — imagem editorial adicionada
Hero conceitual criado com imagegen e integrado como WebP, sem fotografia ou atributo fictício de projeto. Legenda explícita de imagem gerada por IA. Prompt: cena arquitetônica genérica de recarga, sem identificação de empreendimento; não representa Claris nem projetos Tegra. Arquivo `assets/blog/decor/recarga-conceitual.webp`, 1200×800, 42500 bytes. OG/Twitter/BlogPosting alinhados à imagem. Parse/H1/noindex estáticos conferidos após inserção. Testes oficiais seguem NÃO EXECUTADOS: após autorização, navegador isolado alcançou CAPTCHA por tráfego incomum; handoff falhou para o usuário; única recarga manteve o bloqueio. Sem tentativa de contorno. QA mobile/desktop e publicação ainda pendentes.
