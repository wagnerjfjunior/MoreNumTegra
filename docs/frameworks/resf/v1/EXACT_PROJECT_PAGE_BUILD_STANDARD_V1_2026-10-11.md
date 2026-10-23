# RESF — Exact Project Page Build Standard V1
Date: 2026-10-11
Repository: `wagnerjfjunior/MoreNumTegra`
Status: CANONICAL_FOR_NEW_EXACT_PROJECT_BUILDS; integrated via PR #390, merge SHA b9edb97d5a459e5773c8375678f692bd026d64d4. Existing pages require bounded adoption decisions; acceptance of this document does not certify Ampère post-release QA.
Scope: exact-project pages under `/empreendimentos/<slug>/`.
Runtime owner: MoreNumTegra main. This document does not supersede product facts, the functional/technical baselines, existing ADRs, the adopted RESF provider, or individual Product Authority gates.

## 1. Purpose and precedence
A reusable build/release contract, not a request to rewrite all published pages. Use the approved Reserva/Lapa editorial rhythm, the Ária-inspired form/footer treatment where suitable, and the bounded Ampère Brooklin release as reference implementations, without copying their project-specific facts. In a conflict, resolve live main, current product truth, lifecycle, technical baseline, ADRs, blocked actions and the applicable specialized standards. Do not treat a reference implementation as permission to transplant price, schema entity, address, campaign or image to another project.

## 2. Project intake gate (must be complete before code)
Record: route and exact-project owner; current lifecycle/stage; governed official name; exact location/address/CEP and whether address is project entrance or sales showroom; areas, bedrooms/suites, parking, features, plans, developer, commercial unit/price and price-validity where applicable; photography authorization, source URLs and attribution; professional claims; specific CTA/WhatsApp destination. Every commercial attribute must have a source and status VERIFIED / UNKNOWN / NEEDS_REVALIDATION. UNKNOWN facts remain absent, not inferred. Confirm region-page and master-development ownership. No unauthorized region, master or promotional doorway routes.

## 3. Visual and content architecture
A. Semantic header/navigation and resilient mobile controls; official Tegra identity, canonical yellow #EBB92E and approved logo, not a generic T.
B. Hero with single H1 identifying the project; clear buyer-oriented positioning, differentiated H2/lead, high-visibility consultation CTA, and image visible in initial HTML. Avoid robotic repetition of project/neighborhood and avoid technical facts duplicated needlessly between hero and facts.
C. CANONICAL FACTS CONTRACT (mandatory for exact-project pages): use a single `.facts` band immediately after the hero, with four ordered fact positions: (1) area + configuration (area and bedrooms/suites or verified typology), (2) parking spaces, (3) main verified project distinction + neighborhood/location, (4) verified project stage (Pronto para morar, Em construção, or Lançamento). The preferred structure is `<section class="facts"><div class="wrap facts-in"><div class="fact">…</div>×4</div></section>`; arrange 4 columns on desktop and 2×2 on mobile, without a one-column mobile override. Preserve readable text, responsive wrapping and labels. Never manufacture parking, typology, size, stage or amenity to fill a slot; if the required parking fact is not verified or applicable, record an explicit `FACTS_DATA_GAP` and request a project-specific approved exception before substituting an alternative fact. Do not silently replace parking with an unrelated attribute.
   HERO-META REMOVAL (mandatory): legacy `.hero-meta` / `#hero-meta` and equivalent duplicate four-fact summaries inside the hero are forbidden; the hero retains the H1, buyer-facing lead, approved media and primary CTA. Commercial unit identifier, individual unit price, price/m², payment flow and promotional conditions belong in the price/consultation sections, not the facts band. Avoid repeating the same measurement as two independent facts (e.g., an illustrative 19 m² plan and a distinct 21 m² commercial unit); describe such distinctions in the floorplan and commercial content instead.
   ACCEPTANCE: check the visible four-slot semantic order and sourced values, one and only one facts band, zero legacy hero-meta blocks/styles, desktop 4 columns, mobile 2 columns and no duplicated hero facts. Source code checks alone do not prove mobile visual QA. Deviations require a bounded Product Authority decision with factual evidence and validation; no undocumented exception.
D. Direct commercial proposition, project differentiators, genuine amenities and architectural signatures when substantiated; no self-referential statements about 'the page' or its SEO.
E. Gallery with useful variety, captions/alt by actual scene, controlled responsive sources, no near-identical repetition; interactive galleries accessible by touch and keyboard.
F. Plan/typology decision area, with governed floorplan labels and sizes; distinguish all available/illustrative variants from claimed unit availability.
G. Contextual neighborhood/location editorial block with genuine images when available, internal link to the published regional owner, and a factual map or consultation CTA. Do not infer exact travel time or street number. Do not put an outgoing regional link ahead of the commercial hero CTA merely for SEO.
H. FAQ based on questions buyers actually ask, including stage, units, differentiators, location, visits and commercial caveats. Aim for useful coverage; number is contingent on verified facts. Reserva 10 and Ampère 12 are page evidence, not mandatory quotas.
I. Conversion ending: visit/conditions, agent identity as approved, accessible Form 46 card and canonical legal footer. Residential/commercial lifecycle distinctions must be maintained; resale copy must not be inherited by active Tegra inventory.
Mobile must preserve readable copy, accessible focus, touch-friendly actions, balanced imagery and premium visual hierarchy. No important interaction may depend exclusively on hover.

## 4. Search and structured data
Mandatory review: title, useful description, self-canonical to the real published www.moretegra.com.br URL, robots, Open Graph/Twitter, one H1, coherent H2/H3, semantic visible copy, verifiable internal links, responsive alt, real footer identity and sitemap membership only for published indexable URLs.
JSON-LD is built from governed facts and visible content; use appropriate WebSite/WebPage/BreadcrumbList and project-specific entities only where supported. `ApartmentComplex`, `Product`, `Offer`, `FloorPlan`, `Organization`, `Person`, `RealEstateAgent`, `Service`, `ImageObject` are conditional, not universal quotas. Product/Offer values must match actual eligible governed offer; never fake availability, ratings, reviews, return policy or shipping data. Avoid incompatible schema properties such as ApartmentComplex.brand when contradicted by existing validators.
### 4.1 Commercial semantic completeness gate — proposed amendment from Tièl audit (2026-10-12)
JSON-LD parseable without a syntax error is **not** RESF acceptance. Each exact-project page must pass separately: (a) schema property compatibility with no unexplained warnings, (b) complete graph of **every governed commercial entity materially evidenced in visible content**, (c) exact visible/schema factual and FAQ parity, (d) stable relationships/IDs and image ownership, and (e) separately observed Google eligibility results. A failure in any required item is **NONCONFORMANT**, not an optional enhancement.
When a named verified agent and dedicated real-estate service are visibly presented, the appropriate verified `Organization`, `ContactPoint`, `Person`, `RealEstateAgent` and `Service` representation is required for that exact-project owner, provided the applicable facts and relationship are verified; do not invent an on-site street address. When a named unit and governed commercial reference price are shown, require appropriately linked `Product` and `Offer` with visible factual parity. When official plan images with verified sizes are published, require matching `FloorPlan` and project linkages, without associating an illustrative 19 m² plan with a different commercial 21 m² unit. Do not add unsupported `Offer.availability`, ratings, review, shipping, or return fields.
If a required fact has not been verified, register `BLOCKED_BY_PRODUCT_TRUTH`; do not silently lower the profile or create fictional data. Reference implementation node counts (e.g., Ampère 18 or Tièl 17) are **not** hardcoded quotas. Validation must identify the exact missing or incompatible entity and link, never approve from node counts alone. Google Rich Results Test covers only Google-supported result categories; record its detected categories, errors and evidence date separately from Schema.org graph coverage. An item count of 1 does not certify a commercially complete graph, nor do extra graph nodes guarantee more rich-result items. Editorial quality and mobile/form QA are independent mandatory acceptance facets for a finished page.

If FAQPage exists, visible question and answer texts match JSON-LD one-to-one. The hero/primary representative image must be owned correctly by WebPage/ImageObject; secondary image is a separate fact and may not be fabricated or copied from the gallery index. Avoid agent portrait replacing project hero in page-owner image metadata. Exact street number placement follows the current governed footer/address standard, subject to explicit, documented exceptions. Geo and CEP require independent exact-project evidence, not a showroom assumption.
Do not claim Google indexing, rich results, rank or AI visibility from static validation alone.

## 5. Conversion / measurement invariants
Preserve the verified Green Sales/GDigital contract: `tenant_id=313`, `form_id=46`, `title=MoreEmUmTegra`; the scoped `#moretegra-lead-form` / `data-moretegra-lead-form` selectors and the existing native form script. Keep validation for name/email/phone, loading state, prevention of duplicate submission, success/application/network-error handling and private user data out of analytics. Do not create backend or send real leads from Preview as part of routine QA.
Retain `measurement-core.js`, `measurement-form.js`, consent default denied and approved `mnt_*` taxonomy. Conversion `mnt_lead_success` only after actual success; do not count form attempt, CTA or direct /obrigado/ visit as success. Preserve WhatsApp and CTA intent semantics, approved CRECI/legal footer data and responsive accessibility. No new Meta, Google Ads, FECH.AI, Make or n8n integration without a separate decision.

## 6. Performance and media
Apply `docs/performance/RESPONSIVE_MEDIA_DELIVERY_STANDARD_V1.md`. Hero discoverable in initial HTML, eager/high-priority, no JavaScript-only URL, no hero lazy-load; use correctly sized mobile derivatives without upscale when applicable. Reserve intrinsic dimensions/aspect to minimize CLS; lazy-load below-the-fold gallery and contextual neighborhood images, with truthful alt and scene captions. Heavy media remains on governed external origins; remove provider image-optimizer proxies when a verified direct asset can safely be used. Use fallback for noncritical videos/media. Targets: mobile LCP <= 2.5 s, INP <= 200 ms, CLS <= 0.1; these are targets, not results. Five-run comparable mobile Lighthouse battery before claiming performance improvement, and never substitute TBT for field INP.

## 7. Per-page build and release checklist
1. Resolve live main SHA, pending PR/branch overlaps, Vercel production SHA and SFJM CURRENT/STATUS/NEXT_SAFE_ACTION/BLOCKED_ACTIONS.
2. Verify Product Authority scope, approved product-fact pack, imagery, lifecycle, price/offer and region/master ownership.
3. Freeze before-state source, screenshots, URL, tracking/form/schema contract, and rollback SHA.
4. Build a bounded branch against current main; share material commercial copy for review before approving its publication.
5. Run page-specific structural/SEO/facts/schema/FAQ/media/Form46/tracking/accessibility validators on exact head; distinguish newly introduced failures from pre-existing validator debt.
6. Review mobile and desktop Preview or approved local live sync, including touch controls, form error/validation states, image loading/crop, gallery and CTA.
7. Require approved exact head, CI/review and explicit merge/release authorization. Never interpret a draft PR as permission to merge.
8. Verify production deployment READY and exact Git SHA, then HTTP status/canonical/robots/sitemap, imagery, schema parsing, responsive UX and conversion wiring on the canonical host without generating live leads unless approved.
9. Record external Rich Results/GSC results separately when observed; cannot infer them from local JSON parse.
10. Update governance handoff, known residuals, rollback, and next safe action. One page release never authorizes the next.

## 8. Reference and variation matrix
- Reserva Caminhos da Lapa: accepted editorial and Lapa/Caminhos contextual reference; resale/secondary lifecycle language is NOT universal. Source `docs/search/MNT_LAPA_EXACT_PROJECT_PAGE_STANDARD_V1_2026-10-03.md`.
- Garden Design/Nova Vivere: Lapa adaptations, keep active commercial truth and own fact packs. Do not copy Reserva resale wording.
- Ária Higienópolis: precedent for softer form and footer styling, not for prices/address or media.
- Ampère Brooklin: PR #388 form/footer/facts and PR #389 buyer-first SEO copy, 12 visible/schema-parity FAQs and three lazy-loaded neighborhood images, contextual Brooklin regional link, 18-node approved project graph. These are Ampère-specific results, not universal numeric quotas. Release SHA `b6497954e45d77cf37dd639dbea3c18bd29a4040`.
- DSG Itaim/CAPIITOLO: art-directed premium/video exceptions remain scoped to their own accepted decisions and may not be overwritten by generic template mass migration.
- RESF V2 draft modularization, search-image changes and address batches remain separately gated. This V1 standard does not merge or rebase them.

## 9. Criteria to promote this document
Product Authority reviews the specification and residuals; documentation PR passes its relevant checks and is explicitly merged. Document version then becomes `CANONICAL_FOR_NEW_EXACT_PROJECT_BUILDS`. Existing published pages are grandfathered; deviations must be audited and prioritized, not overwritten en masse. Publishing this standard does not assert Ampère's post-release mobile, form or Google results without actual smoke evidence.

## 10. 2026-10-12 — Adendo operacional de escala, derivado de Tièl (aprovado para uso por página)

**Estado do padrão:** V1 permanece canônico para construção de páginas exatas. Este adendo fixa critérios de qualidade reutilizáveis para auditoria e adaptação de páginas existentes, sem autorizar um *bulk rewrite*. Não equivale a certificação retroativa das demais URLs. Referência documental da aplicação no Tièl: `docs/frameworks/resf/v1/RESF_TIEL_RELEASE_EVIDENCE_AND_SCALE_HANDOFF_2026-10-12.md`.

### 10.1 Copy de compra, SEO e hierarquia tipográfica
- Produto primeiro: H1 único com nome exato, proposta de compra, estágio e marca Tegra quando sustentados; H2/H3 devem responder intenções distintas (produto, tipologia, plantas, lazer, bairro, preço, visita). Não criar H2 genérico ou repetir o mesmo atributo em múltiplos títulos. Copy deve levar a consulta real, nunca declarar indisponibilidade sem fundamento comercial.
- Distribuir naturalmente termos singulares/plurais e sinônimos legítimos: apartamento/apartamentos; studio/studios apenas para tipologias verificadas ou como linguagem de busca explicitamente contextualizada. Demanda Planner observada não é ranking nem prova de tráfego; respeitar a matriz M3-05/M3-06 de propriedade de query. Página do empreendimento é proprietária da intenção exata e modificadores preço/planta/disponibilidade; a regional é dona da descoberta genérica do bairro.
- Adotar escala visual consistente por componente (hero H1; H2/H3; parágrafos, facts e CTAs), com família, peso, entrelinha e espaçamento coerentes em desktop/mobile. Usar Ampère/Tièl como referência visual e escolher valores adaptados à densidade real de cada página. Um teste de renderização é obrigatório: título não pode extrapolar a viewport, ocupar proporção desnecessária da dobra ou diminuir legibilidade.
- Não impor mínimo/máximo de palavras universal. Comparar páginas-irmãs por conteúdo **útil**, verificável e orientado à decisão; remover redundância e texto só para preencher densidade.

### 10.2 Facts, plantas e galeria com paridade factual
- Manter a faixa de quatro facts conforme §3.C e o gate de exceção do projeto. Quando forem publicadas plantas ilustrativas de 19 m² e referência comercial de unidade de 21 m², **não apresentar ambas como a mesma tipologia/unidade**: identificar precisamente os escopos e registrar exceção dos fatos no contrato, se necessário.
- Galeria deve mostrar também os ambientes internos/apartamentos quando houver fontes autorizadas, em vez de conter apenas amenities. Legendas distinguem foto real, perspectiva ilustrada e planta. Não inventar unidade decorada ou foto interna se apenas existirem perspectivas.
- Evitar imagens repetidas, URLs sem confirmação e mudança do hero sem gate. Preservar o catálogo de URLs de mídia e os ALT específicos por cena.

### 10.3 Bairro, navegação e crédito de imagens
- Link contextual para a página regional somente no bloco de localização/descoberta, sem competir no topo com CTA comercial. Bloco de bairro pode usar **três fotografias** como referência testada no Ampère e Tièl, mas três **não é quota universal**; usar a quantidade adequada de imagens genuínas, legalmente reutilizáveis, com relevância, dimensões e carregamento lazy. Não confundir fotografias do entorno com fotos do empreendimento.
- Créditos e licenças exigidos devem permanecer conformes à origem. Links externos em créditos não fazem parte da navegação comercial; preferir texto discreto quando os termos da licença permitirem, caso contrário cumprir o vínculo obrigatório ou substituir a imagem. Nunca suprimir atribuição legal exigida apenas para limpeza visual.

### 10.4 CTAs/WhatsApp/Form46
- No topo, usar navegação comercial que não desvie o comprador para a regional; CTA de condições/visita deve ter destino real. Fixos de conversão devem respeitar mobile, áreas seguras e compensação da barra de consentimento.
- WhatsApp é CTA identificável, em identidade visual consistente com o padrão aprovado para a página, adequado ao toque, sem cobrir conteúdo e sem competir indevidamente com "Receber condições"; checar `wa.me`, texto e acessibilidade. Preservar o fluxo Form 46 e instrumentação existentes.
- Não inferir sucesso do formulário de CI estático. Somente apontar `LEAD_RUNTIME_USER_CONFIRMED` mediante evidência do CRM e sem divulgar dados pessoais do lead.

### 10.5 Escala para aproximadamente 30 páginas
- Aplicar **inventário antes de mutação**: URL, estágio/comercial, hierarquia, facts (incluindo exceções), imagens, CTA, Form46, SEO, dados estruturados, FAQs, performance e cobertura no GSC. A contagem "30" é planejamento informado pelo usuário, **não número auditado de rotas pendentes**.
- Abrir lotes pequenos por família/risco, com PR e QA identificáveis por página; nenhuma página recebe preço, endereço, metragem, tipologia, fotos ou agentes de outra. Registrar aprovação comercial específica e evidência. Se o produto não possui fonte, classificar `BLOCKED_BY_PRODUCT_TRUTH`, nunca inventar.
- Critério operacional de página concluída: checks apropriados + aprovação visual mobile/desktop + validação de CTA/Form46 conforme escopo + merge aprovado + Vercel READY no SHA correto + smoke público e documentação dos UNKNOWNs. Indexação/posicionamento futuro permanece monitoramento externo, não evidência de release.
- Para controle de execução, usar a matriz e o recebimento de evidências em `docs/frameworks/resf/v1/RESF_TIEL_RELEASE_EVIDENCE_AND_SCALE_HANDOFF_2026-10-12.md`; não transformar o Tièl em template literal ou proclamar as ~30 páginas publicadas/conformes.

## 11. 2026-10-14 — Contrato RESF de descoberta por IA e identidade comercial (adendo documental)

**Escopo e precedência:** este adendo incorpora ao RESF V1 os dois arquivos site-wide publicados na raiz lógica do domínio, sem alterar a arquitetura de páginas exatas, o padrão §10, os bloqueios de release, o contrato Form 46 ou o `robots.txt`. Não obriga criar arquivos separados por empreendimento. A autoridade de fatos comerciais segue sendo a página exata e seu fact pack governado, não os índices.

### 11.1 Superfícies e finalidades distintas

- **`/llms.txt`** (fonte: `llms.txt` na raiz do repositório): índice editorial legível por IA para descoberta das regiões e dos empreendimentos; deve conter URL canônica e descrições autossuficientes que identifiquem natureza do empreendimento, sua vinculação à Tegra, bairro/cidade, tipologias, áreas e estágio apenas quando verificados. Identificar como portal de atendimento, e não como site institucional da incorporadora. Não colocar preços, ofertas, disponibilidade e características não confirmadas. Atualizar quando novas rotas públicas forem publicadas, removidas ou tiverem fatos materiais alterados.
- **`/.well-known/ai.txt`** (fonte: `.well-known/ai.txt`): declaração site-wide de preferências de uso do conteúdo por sistemas de IA, baseada no Internet-Draft `draft-car-ai-txt-wellknown-00`, ainda não adotado como norma. Preservar as diretivas versionadas `Training: allow`, `Scraping: allow`, `Indexing: allow`, `Caching: allow`, `Attribution: recommended`, `AI-Disclosure: recommended` enquanto não houver nova decisão sobre permissões/licenças. Comentários de contato neste arquivo são auxiliares, não equivalem a diretiva de descoberta ou autorização de direitos de terceiros. Não afirmar cumprimento pelos agentes nem efeitos de ranking.
- **`/robots.txt`, sitemap, metadata, JSON-LD e conteúdo visível:** continuam autoridades complementares com funções diferentes. Não inferir que `ai.txt` ou `llms.txt` substituam estes mecanismos, nem que a publicação garanta inclusão nos resultados de IA ou do Google.

### 11.2 Identidade obrigatória de atendimento MoreTegra

Em toda revisão RESF envolvendo descoberta, páginas de empreendimento, conversão e referência comercial, preservar a identificação **Sabrina da Tegra — corretora de imóveis, atendimento Tegra Vendas, CRECI-SP 209.905-F, telefone/WhatsApp +55 11 96077-9328**, com URL de contato `https://wa.me/5511960779328`. Na orientação de visitas aos estandes, explicitar: **ao chegar ao estande de vendas, solicitar atendimento por Sabrina da Tegra**. Nome, telefone e CTA devem coincidir onde exibidos em HTML, Form 46/WhatsApp quando aplicável, `llms.txt` e entidades `Person`, `RealEstateAgent` e `ContactPoint` justificadas em JSON-LD. Conferir também a referência profissional atual `https://corretor.tegravendas.com.br/sabrina/sp` antes de depender dela. Não chamar o MoreTegra de canal institucional da incorporadora, não afirmar exclusividade de atendimento comercial, nem inventar vínculo ou credenciamento.

**Atenção a propriedade de imagens:** identidade profissional nos dados estruturados não autoriza usar retrato da corretora como imagem principal de empreendimento ou região; manter a política de search-image ownership anterior.

### 11.3 Gates operacionais e evidência de aceite

1. **Antes de alterar página/índice:** resolver `main`, último deployment Vercel, PRs sobrepostos, SFJM e fonte exata dos fatos; confrontar sitemap e inventário de rotas com o `llms.txt` (rotas previstas não são evidência de indexação).
2. **Por mudança de empreendimento/região:** conferir se entrada correspondente do `llms.txt` precisa ser acrescentada, ajustada ou removida; não reescrever entradas de produtos não afetados. Identificar explicitamente empreendimento, Tegra, São Paulo/bairro, tipologia e dados verificados. Prevenir descrições genéricas como “comparação entre Ária e Mozae” que dependem de contexto externo para interpretar as entidades.
3. **Por mudança de identidade/atendimento:** conferir nome Sabrina da Tegra, CRECI, telefone/WhatsApp e orientação de estande nas superfícies afetadas. Desvio é `RESF_AGENT_IDENTITY_DRIFT`; impedir aceite até reconciliação factual e funcional. Não inserir telefone em campos de licença ou em diretivas desconhecidas de `ai.txt`.
4. **Por mudança de política de IA:** revisar conscientemente permissões do `ai.txt`, direitos de terceiros, compatibilidade com `robots.txt`, comentários vs diretivas, governança e Product Authority. Mudanças de `Training`, `Scraping`, `Indexing`, `Caching` ou licenças exigem aprovação específica; não assumir que a especificação esteja consolidada.
5. **QA técnico:** conferir existência e correspondência exata do commit para `/llms.txt` e `/.well-known/ai.txt`; resposta HTTP 200, corpo texto UTF-8, `Content-Type` apropriado, ausência de HTML fallback, autenticação ou redirecionamento incorreto, integridade de linhas/URLs e acesso no host www canônico. Se só Vercel READY foi observado, marcar `AI_FILES_PUBLIC_HTTP = NOT_VERIFIED`, não PASS. Não inventar resultado de busca/indexação.
6. **Release/rollback:** usar branch/PR, comparação dos arquivos, checks aplicáveis, autorização explícita de merge e confirmação do SHA Production READY; registrar evidências e rollback por revert ou deployment anterior. Nenhum desses testes substitui testes visuais, Form46 e conversão por página.

**Decisão posterior de 2026-10-14:** por autorização expressa do operador, `Training` foi alterado de `deny` para `allow`, em conjunto com permissão de rastreamento `GPTBot` em `robots.txt`, sem concessão de direitos sobre ativos de terceiros. O estado de cada release depende da PR e do deployment publicado. Não confundir permissão de rastreamento com licença legal para material de terceiros.

**Estado histórico de referência ao incorporar este adendo:** `llms.txt` integrado via PR #399 (merge `05cb781e7a775888d0cfafe8578816f699e15391`), `ai.txt` via PR #401 (merge `70eb190686598d3e099db5f84c599255aa309338`), identidade restaurada via PR #402 (merge `b23ccdb205b2956beeeb411adc82011de6c91425`). Deployment Production READY desse SHA foi observado; smoke HTTP individual não está certificado por essa evidência. Este adendo não certifica retroativamente páginas existentes.


## Adendo — 2026-10-22: redação comercial dos cards (decisão do proprietário)

**Regra obrigatória de conteúdo visível nos cards de preço:** comunicação objetiva e orientada ao comprador. Usar apenas rótulo comercial, valor, unidade e aviso curto de confirmação, conforme copy aprovada. **Não inserir** no texto público: nomes de documentos internos (Match Point), referências de validação, explicações de cálculo/desconto, preço por m² não solicitado, atribuições ao proprietário ou à coordenação, termos técnicos, justificativas sobre origem dos dados ou ressalvas improvisadas. Evidências e memória de decisão ficam exclusivamente no repositório/documentação de governança, não na UI.

**Padrão aprovado (card regular):**

- Preço a partir de
- R$ {preço}
- Unidade {número} · condição promocional de referência R$ {preço}. Consulte a Tegra Vendas para confirmar a vigência, valores promocionais e disponibilidade.

**Padrão aprovado (card à vista):**

- À vista
- R$ {preço} à vista*
- *Unidade {número} · condição à vista de R$ {preço}. Consulte a Tegra Vendas para confirmar a vigência, valores promocionais e disponibilidade.

Asterisco único na composição do preço; evitar rótulos duplicados de “à vista”. Preservar o componente de destaque `cashOffer` e `cashSuffixSmall`, acessibilidade e os dados estruturados consistentes. Revisões da redação comercial exigem alinhamento explícito prévio com o proprietário; **não enriquecer a copy por iniciativa própria**. A manutenção de evidências internas, confirmação de preço/disponibilidade e gates de QA/release permanece obrigatória, sem poluir o conteúdo comercial exibido ao comprador.
