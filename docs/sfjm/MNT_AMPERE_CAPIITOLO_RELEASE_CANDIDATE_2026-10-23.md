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
- [ ] LVR Live Sync: mobile 320/360/390/430 + desktop, verificar hero/FACTS 2×2, badge WhatsApp, navegação, as 4 ofertas e Form 46 sem envio real.
- [ ] Conferir imagem hero 1920x1080 HTTP e fallback; FAQ/schema, GTM consent, canonical e CTA.
- [ ] Resolver bloqueios CI introduzidos ou testes obsoletos com provas, sem diminuir as garantias do validador.
- [ ] Aprovação específica de merge, confirmação Production READY no SHA aprovado e smoke HTTP/SEO antes da indexação.

## Próxima ação segura
Executar testes e corrigir os validadores de forma isolada, documentando falhas já presentes na main. Não fazer merge da PR candidata até que gates estejam atendidos e que o proprietário aprove o release consolidado.
