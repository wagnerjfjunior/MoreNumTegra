# RESF — adaptação Órbita pelo modelo ODE Perdizes (23/11/2026)

**Status:** proposta em branch, ainda sem merge nem QA visual; nenhuma alteração publicada em produção por este documento.

## 1. Fonte de verdade e escopo

- Projeto: `wagnerjfjunior/MoreNumTegra`; base live `main` = `8deb35630d7dd14f145a4f3e051ca489046e163d` em 23/11/2026.
- Página: `src-greenn/empreendimentos/universo-tatuape-orbita/index.html`; canônica `https://www.moretegra.com.br/empreendimentos/universo-tatuape-orbita/`.
- Referência visual/editorial **aprovada pelo usuário**: `docs/frameworks/resf/v1/RESF_ODE_PERDIZES_PAGE_MODEL_2026-11-23.md`, implementada nas PRs #590–#593. Não copiar dados factuais ou imagens do ODE.
- Solicitação: “ficou ótimo vamos salvar as informações e vamos repetir o processo na página do órbita”. Autoriza preparar a adaptação e documentar; **não é ordem específica de merge nem de alterar validadores**, sujeitos aos bloqueios canônicos.
- Governança prevalente: `bootstrap/BOOTSTRAP_CANONICO.md`, `handoffs/CURRENT.md`, `docs/PROJECT_STATUS.md`, `docs/NEXT_SAFE_ACTION.md`, `docs/BLOCKED_ACTIONS.md`, baselines, `EXACT_PROJECT_PAGE_BUILD_STANDARD_V1_2026-10-11.md` e `RESF_CONVERSION_GUARDRAILS_2026-11-09.md`.
- Rollback de referência anterior: `main` `8deb35630d7dd14f145a4f3e051ca489046e163d`, Vercel `dpl_7Pv6c74kJMupWwk31nfHDEfvVMjf` READY, observado antes da branch. Revalidar antes de release/rollback.

## 2. Fatos do Órbita preservados (não transplantar do ODE)

- Nome: Universo Tatuapé Órbita, Tatuapé, São Paulo; projeto Tegra entregue/pronto para morar.
- Residencial: apartamentos de 38–69 m²; 1, 2 e 3 dormitórios. Comercial: salas de 28–39 m². Não atribuir vaga a tipologia sem documentação.
- Galeria **seis** perspectivas já presentes no catálogo da página (fachada, voo do lazer, piscina, quadra, fitness, lobby). Não inventar 14 imagens ou duplicar fotos.
- Plantas: grupos **Residencial, Comercial e Implantação**; seletores, imagens e controles de navegação próprios. Não confundir planta com estoque disponível.
- Tour virtual oficial 360° já existente: `https://arquivos.tegraincorporadora.com.br/tour360/orbita/`, exceção específica permitida pelo RESF. Não inserir outros links externos de fuga.
- Localização governada: `Universo Tatuapé Órbita · Avenida Celso Garcia, 5040 · Tatuapé · São Paulo/SP.` somente no footer e no JSON-LD, sem endereço exato no corpo.
- Contato SP: Sabrina da Tegra, CRECI-SP 209.905-F, `tel:+5511960779328`, WhatsApp SP; Greenn Form 46 `tenant_id=313` e `form_id=46`; consentimento/analytics mantidos.

## 3. Adaptação preparada na branch

1. Header de três elementos: logo oficial Tegra, identificação estática `Órbita · MoreTegra`, link interno para todos os empreendimentos; comportamento mobile alinhado ao ODE.
2. Hero com H1 atual do empreendimento, copy própria e CTA ao formulário. Retirada a alegação “últimas unidades” sem comprovação de estoque.
3. Banda **única** com quatro facts (metragem residencial, dormitórios, Tatuapé, entregue), em duas colunas mobile. Ticker amarelo animado eliminado.
4. Bloco `#valores`: **Valor / Consultar Valor**, CTA “Consultar valor e condições” → `#formulario`. Eliminado o seletor de preços e unidades 1814/1305 e os valores promocionais de outubro/2026; não presumir oferta vigente.
5. Introdução, arquitetura e lazer em narrativa comercial; lazer colocado **antes** da galeria, com H2 de pergunta e resposta.
6. Galeria única com as seis perspectivas originais, contador, abas e setas. JavaScript com proteção contra respostas assíncronas obsoletas em troca rápida; sem faixa redundante de nomes.
7. Plantas agrupadas existentes mantidas (apartamentos, salas/lojas, implantação), com copy direta; tour 360° mantido.
8. Localização com contexto Tatuapé, mapa de bairro e WhatsApp. Removidas três imagens externas Wikimedia e créditos/links de saída, além de repetição de facts em grade local.
9. FAQ HTML e JSON-LD coerentes: resposta de estágio sem “últimas unidades”; pergunta de preço alterada para consulta de valor. Mantidas demais perguntas e tipologias verificáveis.
10. Footer **preto** compacto como no ODE: nome More em um Tegra, aviso curto, endereço, Sabrina/CRECI/telefone visíveis; dois avisos canônicos completos e link do perfil oficial preservados em `<details>` fechado por padrão. Sem alteração do padrão global.
11. CTA flutuante “Mais Informações” e WhatsApp preservados; formulário 46, runtime, consentimento e mensuração sem alterações.
12. SEO: remoção de `Product`/`Offer` com preço da unidade 1814 e `FloorPlan` específico AP0609, inclusive referência interna, para não deixar oferta desatualizada em dados estruturados. `FAQPage` mantém paridade com FAQ visível; `WebPage` e `ApartmentComplex` genéricos preservados. `sitemap.xml` com `lastmod=2026-11-23`.

## 4. Compatibilidade com links antigos

A página histórica tinha links `?unidade=2408#valores` e `?unidade=1305#valores` (recibo `docs/sfjm/MNT_ORBITA_PR418_PRODUCTION_ACCEPTANCE_2026-10-16.md`); o HTML mais recente também usava `1814`. A nova página **não afirma disponibilidade de nenhuma dessas unidades**. O parâmetro continua aceito apenas para transportar o **interesse de tipologia** ao Form46:
- `1814` → interesse em 1 dormitório;
- `2408` → interesse em 2 dormitórios;
- `1305` → interesse em 3 dormitórios.

**Pendência de escopo:** preços e links de cards da home/catálogo podem continuar com referências antigas; não foram alterados por esta branch. Precisam de auditoria e decisão específica para evitar desalinhamento entre home e landing.

## 5. Gates e riscos

- **Validador de snapshot JSON-LD:** `scripts/validate-resf-v2-postal-address-contract.mjs` compara o grafo atual com a referência congelada. A remoção de `Product`/`Offer` e a revisão de FAQ do Órbita podem exigir uma **exceção exata com testes negativos**, análoga à PR #593 do ODE. **Não alterar o validador sem autorização explícita e específica do proprietário.**
- Antes de publicar: diff restrito, CI do head final, QA mobile/desktop (hero, 2 colunas facts, galeria, plantas, tour, footer, CTAs, form), JSON-LD parseável, FAQ visível em paridade, testes de links antigos e consentimento, revisão de sitemap, Vercel READY/alias/SHA e rollback identificado.
- Verificação de recebimento real de lead/CRM, licença de mídia, disponibilidade, preço e métricas Core Web Vitals permanece pendente; CI não comprova esses pontos.
- A branch não autoriza publicar ofertas, preços, unidades ou mudar `main`/produção antes de decisão específica.

## 6. Novos materiais comerciais e seção de oportunidades (23/11/2026)

### 6.1 Origem, integridade e distinção temporal

O proprietário forneceu três imagens promocionais do Órbita na conversa em 23/11/2026. São **materiais comerciais fornecidos pelo usuário**, não tabelas vigentes verificadas na Tegra nem autorização de publicação de preços. Os anexos originais permanecem na conversa, **não** foram copiados para GitHub nem usados como imagens no site (peças visualmente carregadas e mídia pesada). Foram extraídos os seguintes fatos para futura validação comercial:

| Peça | Informação extraída | Limite da evidência |
| --- | --- | --- |
| 1 — Órbita / Tegra / Livelo / FGTS | 1, 2 e 3 dormitórios; pronto para morar; menção a conversão de entrada em pontos Livelo, uso do FGTS, endereço Av. Celso Garcia 5040 e “8 minutos a pé” do Metrô Carrão | Não apresenta regulamento completo nem vigência da campanha Livelo. Não transformar “100%” em promessa de equivalência monetária sem regras oficiais |
| 2 — promoção de apartamentos | Unidade 601: 43 m², 1 dorm, sem vaga, R$ 375 mil; 606: 51 m², 2 dorms, sem vaga, R$ 448 mil; 2607: 53 m², 2 dorms, com vaga, R$ 570 mil; 1805: 69 m², 3 dorms, com vaga, R$ 692 mil. Indica 500 m do Metrô Carrão | **Vigência e disponibilidade não confirmadas**. Não exibir como oferta atual; metragem/vagas associadas apenas à unidade citada |
| 3 — decorados à venda | Unidade 221: 1 dorm, R$ 540 mil; 247: 2 dorms com vaga, R$ 735 mil; 225: 3 dorms com vaga, R$ 895 mil. Indica 450 m do Metrô Carrão | **Validade expressa até 31/10/2026 — vencida em 23/11/2026**. Não publicar preços ou alegar estoque atual sem nova tabela |

As distâncias “8 minutos”, “500 m” e “450 m” divergem em apresentação/metodologia; a nova seção usa apenas **“próximo ao Metrô Carrão”**. O FGTS depende da elegibilidade do comprador e das regras de financiamento, não sendo benefício garantido a qualquer pessoa.

### 6.2 Decisão de conteúdo e arquitetura da seção

O pedido do proprietário é incluir próximo ao topo uma seção de conversão que destaque **Livelo, FGTS, condições promocionais e decorados**, com copy melhor que a peça de referência, sem reproduzir a poluição visual dos flyers.

- Implementação **apenas** na página do Órbita, branch `feat/orbita-resf-ode-premium-20261123`, na posição **Hero → Facts → Oportunidades → Consultar Valor**.
- Seção `#oportunidades`, título H2: **“Seu novo capítulo no Tatuapé já pode começar.”**; introdução sobre pronto para morar, 1–3 dormitórios, lazer e proximidade do Metrô Carrão.
- Quatro cards sem imagens pesadas, mobile-first, visual premium com Tegra amarelo, fundo claro e destaque azul escuro para Livelo: (1) condições especiais; (2) campanha Livelo; (3) possível uso do FGTS; (4) opções de decorados.
- CTAs dos três primeiros cards vão ao **Form46**, usando apenas intents já suportados pelo runtime: `conditions` e `payment_simulation`. CTA “Quero conhecer o decorado” abre WhatsApp SP da Sabrina com mensagem contextualizada. Não foram alterados endpoint, campos, medição, consentimento ou canal RJ.
- **Não publicado:** preços e unidades promocionais, prazo de oferta, promessa de pontos equivalentes a 100% do valor, garantia de elegibilidade FGTS ou disponibilidade de decorados. Essas informações exigem aprovação comercial atualizada antes de publicação.
- Aviso curto na seção: campanhas e condições dependem de vigência/regulamento/disponibilidade; FGTS depende de elegibilidade. Não usar parágrafos técnicos ou referências a fonte na página de vendas.
- Nenhuma mídia dos panfletos foi incorporada. HTML/CSS sem JS adicional e sem novas dependências.

### 6.3 Protocolo de teste: Live Sync obrigatório, Preview proibido

O proprietário corrigiu expressamente a execução anterior: **“o protocolo proíbe a utilização de preview, usamos sempre o live sync pois o preview pode comprometer a utilização por conta de limites da versão free”**. Esta decisão prevalece para o fluxo de teste da frente.

- Protocolo canônico: `docs/governance/MNT_LOCAL_LIVE_SYNC_VALIDATION_STANDARD_V1.md`; manifesto `.sfjm/project.json` (`local-first-remote-on-promotion`, `remoteIterationAllowed=false`, push/deploy com intenção explícita).
- Vercel `vercel.json` tem `git.deploymentEnabled["**"]=false`, `main=true`. **Não criar deployments Preview manuais, não habilitar preview para branches e não usar URL `*.vercel.app` para QA.**
- Para testar, iniciar sessão LVR travada em `feat/orbita-resf-ode-premium-20261123`, conferir `[SYNC] OK branch=<branch> head=<sha>`, abrir a rota `/empreendimentos/universo-tatuape-orbita/` no servidor local, validar desktop/mobile e os quatro CTAs; registrar `VALIDATION_SURFACE=LOCAL_LIVE_SYNC`.
- **A execução anterior criou um Preview manual**, contrário à preferência do proprietário; foi registrada como erro operacional. Nenhum novo Preview manual foi solicitado nesta etapa.
- Os três validadores antigos da PR #594 continuam bloqueando a adaptação anterior (schema de preço/Offer, cobertura Product, snapshot de FAQ). Não alterar validadores, não mesclar e não publicar sem autorização específica. Também não harmonizar os cards da home com preços antigos sem ordem expressa.

### 6.4 Aceite pendente

- QA visual do proprietário via LVR e conferência de hierarquia/CTA/mobile.
- Confirmação escrita de vigência Livelo, regulamento, elegibilidade FGTS e nova tabela de unidades promocionais/decorados antes de alegar ofertas ativas ou publicar valores.
- Se solicitado, exceções **exatas** nos três validadores do Órbita, com testes negativos e sem relaxar proteção de outras páginas.
- Autorização explícita de merge e validação Production READY/rollback; o trabalho em branch não altera a produção.

## 7. SEO/OpenSEO e perguntas comerciais com imagem (23/11/2026)

### 7.1 Evidência fornecida pelo proprietário (não revalidada via GSC/OpenSEO nesta execução)

Relatório **“Relatório SEO — Universo Tatuapé Órbita”**, OpenSEO + Google Search Console, datado de 23/11/2026, colado integralmente pelo proprietário. Link de registro interno (não inserir na página comercial): https://app.openseo.so/p/a071ab48-dda6-4b7c-bf71-2e3e3d40694d/reports/dbba67e3-5021-4295-a35f-a72ddd241299

- Janela GSC 20/08–20/11/2026, Web: **257 impressões, 8 cliques, CTR 3,11%, posição média 9,5**.
- Consultas: `orbita tegra` 60 impressões, 1 clique, posição média 6,3; `universo tatuapé órbita` 13 impressões, 0 cliques, posição média 30,8; `órbita tatuapé` 3 impressões, 1 clique, posição média 10,3; `universo orbita` 5 impressões, 0 cliques, posição 10,8; `orbita tatuape` 5 impressões, 0 cliques, posição 14; `tegra orbita` 3 impressões, 0 cliques, posição 8. Não somar as linhas como total do GSC.
- Últimos 28 dias 24/10–20/11: **175 impressões, 6 cliques, CTR 3,43%, posição média 9,2**.
- Auditoria OpenSEO 14/11/2026: HTTP 200, indexável, sitemap, title, description, H1=1, 1.080 palavras, 11 imagens, 0 sem ALT, 2 links internos; auditoria de 87 páginas sem problemas críticos específicos desta URL. **Não incluiu Lighthouse nem prova de Core Web Vitals.** É evidência anterior à branch atual.
- Diagnóstico: preservar `orbita tegra` enquanto se fortalece `universo tatuapé órbita`, melhorar intenção de compra, sem reconstrução integral. Amostra pequena: nenhuma melhoria de ranking/CTR/conversão pode ser declarada antes de nova medição.

### 7.2 Correção do desenho anterior da seção

O proprietário rejeitou a seção de quatro cards predominantemente orientados a formulário e determinou **H2 em perguntas com respostas úteis** sobre Livelo e FGTS, além de **uma imagem**. Esta seção **substitui** a solução §6.2 da mesma branch, sem apagar o histórico.

Novo `#oportunidades` (entre facts e valor) com:
1. H2: **“Quais oportunidades podem facilitar a compra do Universo Tatuapé Órbita?”**; introdução do projeto Tegra pronto para morar.
2. Figura fotográfica oficial já presente na galeria: perspectiva ilustrada **“Piscina”**, origem `stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/339/Imagem/…005-1715474686420.jpg`; `<figure><img loading=lazy decoding=async width height alt><figcaption>`. Sem novas mídias pesadas no repositório, sem URL de concorrente; possível reaproveitamento do cache do navegador. QA de enquadramento e tamanho real pendente no LVR.
3. H2: **“Como funcionam os pontos Livelo na compra do Órbita?”**; resposta visível explica vínculo da campanha com pagamento do ato, regras de vigência/quantidade/crédito/resgate e que pontos **não equivalem a desconto financeiro automático**. CTA ao Form46 somente **após** o conteúdo.
4. H2: **“Posso usar o FGTS para comprar um apartamento no Órbita?”**; resposta visível diferencia uso do saldo como recurso próprio para entrada/amortização/quitação, sujeito a regras do fundo, imóvel e financiamento; não promete aprovação. CTA ao Form46 após explicação.
5. H2: **“Existem apartamentos promocionais e decorados à venda no Órbita?”**; resposta distingue planta, metragem, vaga, mobiliário incluído e estoque vigente. CTAs: navegar às plantas na mesma página, consultar condições via Form46, falar de decorados pelo WhatsApp SP.
6. Mobile: duas respostas em uma coluna, imagem com proporção reservada, CTAs de toque, sem nova dependência JS. Seção editorial é HTML indexável, **não texto SEO oculto**.

**Não há valores promocionais ou promessa de campanha ativa**: unidades dos flyers de outubro não foram publicadas. A FAQ estruturada permanece limitada às perguntas da FAQ visível no final da página; H2 editoriais não foram injetados artificialmente em `FAQPage` nem alteraram o número de perguntas do grafo.

### 7.3 Outras melhorias da página na mesma branch

- **H1:** `Universo Tatuapé Órbita / Apartamentos Tegra prontos para morar`; preserva nome completo, Tegra e estágio no topo.
- **Title:** mantido `Universo Tatuapé Órbita Tegra | Apartamentos no Tatuapé`, considerado adequado pelo relatório; não sacrificar consulta abreviada por troca especulativa de title.
- **Description:** reforço de nome completo, Tegra, apartamentos prontos para morar, 1–3 dormitórios, Tatuapé, lazer, plantas e compra. Meta description, OG/Twitter e descrições correspondentes no JSON-LD foram sincronizadas.
- **Hero lead:** benefícios residenciais concretos e CTA preservado.
- **Localização:** adicionada referência genérica à proximidade do Metrô Carrão (sem alegar 450/500 m ou 8 min), link contextual para rota **existente** `/regioes/tatuape/`, convite a visita. Mapa regional/WhatsApp e footer mantidos.
- **Conflito deliberado com recomendação do relatório:** o relatório sugeriu exibir `Av. Celso Garcia, 5040` na seção de localização, mas `docs/content/COMMERCIAL_FOOTER_AND_LOCATION_STANDARD.md` e baseline técnica V2.3 impõem `VISIBLE_EXACT_ADDRESS=FOOTER_ONLY`, mapa regional sem link direto. **Não alterado** fora do footer, pois isso exigiria exceção expressa do proprietário ao padrão. Endereço permanece no footer e JSON-LD governados.
- **Redundância:** retirada uma enumeração duplicada de amenities na seção residencial/comercial, substituída por orientação para comparação de plantas.
- **FAQ:** quatro respostas antes excessivamente metatextuais simplificadas (localização, vagas, plantas, tour), com **paridade textual exata** no `FAQPage` do JSON-LD; 12 perguntas preservadas. Não criar FAQ para termos de campanha sem documentação vigente.
- **Medição:** não houve alterações em GA4, GTM, CRM, consentimento ou Form46. Relatório solicita medir Core Web Vitals mobile, cliques WhatsApp, início/envio/recebimento de formulário e tráfego orgânico; são gates posteriores, **não resultados**.

### 7.4 Estado e próximos gates

- Branch `feat/orbita-resf-ode-premium-20261123`, PR #594 DRAFT; **não mesclar nem publicar** sem autorização específica. Fluxo exclusivo `LOCAL_LIVE_SYNC`, sem Vercel Preview.
- Confirmar no LVR: branch/head imutável, imagem de lazer carregando, H2/perguntas legíveis no mobile, CTAs de Livelo/FGTS/plantas/decorados, localização sem endereço exato fora do footer, galeria/plantas/tour, Form46 e WhatsApp, SEO/FAQ.
- Três validadores legados já falhavam na PR #594 antes desta revisão: `Orbita commercial structured data parity`, `Project structured data coverage guard`, `RESF V2 approved project postal addresses`. Não alterar guardas sem autorização e testes negativos; verificar se surgiram falhas novas.
- Validação automática de DOM textual, H1 único, IDs únicos, JSON-LD parseável, FAQ 12/12, imagem oficial, formulário, CTA e restrição de endereço passou na edição; **não é QA visual/funcional LVR nem prova de produção**.

### 7.5 Ajuste de imagem para contrato SEO de duas imagens

O CI do primeiro head da revisão apontou falha **nova** em `SEO two distinct images - 39 URLs`: a primeira imagem editorial adicionada era `…004…`, mas o `ImageObject#secondary-image` governado aponta para `…005…`. Corrigido **sem editar validador nem metadata**: `#oportunidades` agora usa a foto da **piscina `…005…`**, e a seção visual `.full` usa o **voo do lazer `…004…`**, ambos assets oficiais já existentes. O objetivo é manter imagem secundária visível em HTML e reduzir repetição visual. Verificar CI do novo head; não declarar PASS antecipadamente.
