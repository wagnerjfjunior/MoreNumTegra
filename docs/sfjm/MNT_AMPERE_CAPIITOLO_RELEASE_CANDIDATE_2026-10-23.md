# MNT — Release candidate Ampère + CAPIITOLO — aceite congelado e integração RESF
Data: 2026-10-23
Status: CANDIDATE / NO_MERGE / NO_PRODUCTION

## Evidência e origem
- GitHub main live antes desta candidata: `9610f237a6c2d9e8c1588c51026c2b858f467dfd`.
- PR #471, branch `sfjm/capiitolo-ampere-home-price-cards-20261022`, HEAD funcional aprovado `ec0fe0a3a7925e712932589c0cbeeb94315af08b` = baseline imutável do aceite USER_REPORTED em LVR Live Sync.
- PR #470, branch `sfjm/ampere-hero-facts-mobile-20261022`: a integração pontual do hero e CSS responsivo foi feita na candidata em `ffe7dd2183e51360c8ecf6a217f61605b8ca652a`.
- Candidate branch `sfjm/ampere-capiitolo-release-candidate-20261023` nasceu exatamente da baseline aprovada `ec0fe0a3...`; as branches PR #470/#471 originais não foram reescritas.
- Sem merge, publicação, submissão real de lead ou pedido de indexação.

## Escopo aprovado pelo proprietário, que DEVE permanecer intacto
1. Home apresenta dois cards para cada empreendimento e deep links `?condicao=promocional#valores` e `?condicao=avista#valores`.
2. Ampère unidade 62: promocional R$ 3.990.700; à vista R$ 3.791.165.
3. CAPIITOLO unidade 33: promocional R$ 3.350.000; à vista R$ 3.135.000.
4. Seletor mantém estado inicial por URL, valor/nota/CTA e contexto da intenção do Form 46; ao clicar, URL atualizada preservando parâmetros e hash.
5. WhatsApp flutuante do Ampère no padrão RESF (ícone GDigital `whatsapp-removebg.webp`, círculo verde #25d366, 54px, imagem 32px), TESTADO e aprovado no Live Sync pelo proprietário.
6. Sem copy interna Match Point na página pública, sem novos preços, sem mudança no consentimento/GA4/GTM/CRM.

## Alteração em cima da baseline
- Integrado exclusivamente ao HTML Ampère: hero/editorial/CTA e source responsiva vindos da PR #470, com CSS hero/FACTS 2×2 mobile.
- Critérios estáticos conferidos antes do commit: preços, roteamento, seletor, badge WhatsApp, formulário, FAQ e bloco FACTS mantidos no código.
- Esta verificação ESTÁTICA não substitui teste real de renderização no LVR, HTTP da imagem 1920x1080, performance, accessibility ou CI.

## CI e bloqueios conhecidos
Em `ec0fe0a3...`, 13 workflows observados: 3 PASS e 10 FAIL. Classificação de origem ainda NÃO demonstrada por job idêntico na main.
- Ampère SEO commercial copy: teste cobra unidade antiga 0121.
- Ampère JSON-LD offer: teste cobra 4770000.00, página atual 3990700.00.
- Metadata M4-05R: teste cobra CAPIITOLO 3539900.
- CTA/Form: erro no CTA flutuante Reserva Caminhos da Lapa.
- Structured data coverage: Studios Berrini requer ApartmentComplex — avaliar tipo factual apropriado.
- RealEstateAgent postal: Studios Berrini não satisfaz exigência de endereço postal.
- Commercial page standard: Studios Berrini possui divergência de ressalva, contato e exposição de Rua Arandu, 150.
- SEO two distinct images: inventário com contagem esperada de 41 URLs.
- RESF V2 postal: invariant HTML não editorial do Ampère.
- Favicon: duas páginas investimento/Studios Berrini sem tags esperadas.
É proibido suprimir testes, atualizar preços por suposição ou inventar dados para obter CI verde.

## Gates do release candidato
- [x] Branch congelada de baseline aprovada.
- [x] Hero + CSS FACTS trazidos da #470 de forma delimitada.
- [ ] Comparar checks do HEAD desta candidata e classificar falhas contra main no mesmo conjunto de validators.
- [x] USER_CONFIRMED no LVR Live Sync: hero Ampère corrigido e FACTS 2×2 aprovados em 2026-10-23. Aceite visual do usuário; não equivale a medição independente em todas as larguras.
- [x] USER_CONFIRMED anteriormente no LVR Live Sync: condições comerciais, seletores e badge oficial WhatsApp RESF.
- [ ] QA técnico independente nos tamanhos mobile 320/360/390/430 + desktop; testes de Form 46 sem submissão real e regressões restantes.
- [ ] Conferir imagem hero 1920x1080 HTTP e fallback; FAQ/schema, GTM consent, canonical e CTA.
- [ ] Resolver bloqueios CI introduzidos ou testes obsoletos com provas, sem diminuir as garantias do validador.
- [ ] Aprovação específica de merge, confirmação Production READY no SHA aprovado e smoke HTTP/SEO antes da indexação.

## Próxima ação segura
Executar testes e corrigir os validadores de forma isolada, documentando falhas já presentes na main. Não fazer merge da PR candidata até que gates estejam atendidos e que o proprietário aprove o release consolidado.

## Atualização de aceite — 2026-10-23
- O proprietário confirmou literalmente “Hero corrigido!!!” e depois “facts ok” no Live Sync da candidata. Marcar HERO e FACTS 2×2 como USER_ACCEPTED; não reabrir nem alterar essas áreas durante o saneamento de CI sem regressão comprovada.
- HEAD de CI anterior à atualização documental: 13 workflows concluídos, 2 SUCCESS (social sharing metadata; Home video intent-load) e 11 FAILURE. Não declarar release liberado; a correção de hero/FACTS foi aprovada visualmente, não certificada pelo conjunto do CI.

## Saneamento de CI — lote 1, 2026-10-23
- `b6fd98aedf363490b2a781d2d0fffd15765528de`: validador SEO do Ampère passou a exigir H1/lead realmente homologados e referência à unidade 62, preservando demais invariantes SEO/FAQ/galeria.
- `96c68e8c0f14989ec6a44a264d3b70fa0e9d57e3`: validador da paridade visual/formulário Ampère passou a exigir o hero homologado (H1, lead, Living Double View) sem remover gates Form46, FACTS, footer ou responsive.
- `1358ac87c6bfe3490d47369afe7badae956478d6`: validador JSON-LD exige Offer R$ 3.990.700 e IDs Product/Offer da unidade 62, paridade com conteúdo visível e disponibilidade do seletor à vista R$ 3.791.165.
- Somente arquivos `scripts/validate-ampere-*.mjs` alterados neste lote. Nenhuma alteração no HTML/JS ou baseline comercial aprovada.
- O último HEAD acima ainda não retornou workflows no endpoint de runs no momento da leitura. STATUS = NOT_VERIFIED; não declarar 3 PASS até CI efetivamente executar.
- Demais falhas (M4-05R CAPIITOLO, Studios Berrini, favicon, inventários, postal, Reserva CTA) continuam abertas, com separação da origem em relação à main ainda pendente.

## Saneamento de CI — lote 2 (2026-10-23), candidato ainda em homologação
- M4-05R: alinhado o texto visível aprovado do CAPIITOLO unidade 33; workflow confirmado SUCCESS.
- Favicons: adicionadas declarações canônicas nas páginas Studios Berrini NR e coleção de investimentos; workflow confirmado SUCCESS.
- M5-06 CTA/Form: validador reconciliado com o comportamento aprovado do Reserva (CTA "Consulte disponibilidade" e WhatsApp da Sabrina). Teste Playwright estava IN_PROGRESS na consulta de 2026-10-23; não promover para PASS sem resultado final.
- Studios Berrini NR: `ApartmentComplex` residencial não é aplicado a empreendimento NR; os validadores agora exigem `Place`, endereço Rua Arandu, 150, cidade/estado e contato de consulta remota Sabrina, sem inventar postal code ou endereço presencial no `RealEstateAgent`. Workflows de coverage/onsite confirmados SUCCESS.
- Imagens e sitemap: colecao `/investimentos/studios-e-salas-comerciais/` ganhou verificação específica de duas imagens distintas, CollectionPage/ItemList e Open Graph; contrato rígido RESF das 41 rotas restantes foi mantido. Workflow confirmado SUCCESS.
- Studios Berrini: rodapé atualizado para o disclaimer canônico e identificação Sabrina Tegra Vendas; validador mantém a proibição de endereço fora do footer para todos os demais empreendimentos e exige paridade com Place/footer no caso público documentado deste NR. Workflow confirmado SUCCESS no HEAD `16903b27dc5adf4d442db12b30b60157eca5ba7a`.
- Ampère: invariantes históricos de endereço/JSON-LD preservados; comparação estrita do HTML completo passou a usar o snapshot USER_ACCEPTED `ffe7dd2183e51360c8ecf6a217f61605b8ca652a`. Workflow postal confirmado SUCCESS.
- HEAD pré-recibo `16903b27dc5adf4d442db12b30b60157eca5ba7a`: 12 SUCCESS / 0 FAILURE / 1 IN_PROGRESS (M5-06 Playwright). NUNCA registrar esse estado como aprovação integral.
- Não reabrir o hero, os FACTS, quatro condições comerciais, seletor e badge WhatsApp aceitos pelo proprietário. A autorização antecipada para Ready/merge/pós-merge existe, **condicionada** à conclusão positiva dos gates técnicos, comparação de SHAs e confirmação de Vercel Production READY no merge.
- Rollback: manter commit `ec0fe0a3a7925e712932589c0cbeeb94315af08b` de baseline comercial e `ffe7dd2183e51360c8ecf6a217f61605b8ca652a` de HTML Ampère integrado, além do SHA de squash a registrar após merge. Reversão apenas por PR; não force-push da main.
