# RESF — modelo aplicado à página ODE Perdizes (23/11/2026)

- **Tipo:** registro de implementação e referência editorial/visual de uma página exata de empreendimento; **não** é nova versão do padrão RESF nem autorização para reescrever outras páginas.
- **Produto:** ODE Perdizes (São Paulo, SP).
- **URL canônica:** `https://www.moretegra.com.br/empreendimentos/ode-perdizes/`.
- **Fonte HTML/CSS/JS:** `src-greenn/empreendimentos/ode-perdizes/index.html`.
- **Sitemap:** `sitemap.xml` (`lastmod` do ODE atualizado para `2026-11-23`).
- **Integração:** PR [#590](https://github.com/wagnerjfjunior/MoreNumTegra/pull/590), branch `feat/ode-perdizes-perguntas-facts-sem-ticker-20261123`; merge expressamente autorizado pelo proprietário em 23/11/2026. O commit de integração e o status de produção devem ser consultados **ao vivo** no GitHub/Vercel; não são inferidos por este documento.
- **Precedência:** `bootstrap/BOOTSTRAP_CANONICO.md`, `handoffs/CURRENT.md`, `docs/PROJECT_STATUS.md`, `docs/NEXT_SAFE_ACTION.md`, `docs/BLOCKED_ACTIONS.md`, baselines funcional/técnica e `EXACT_PROJECT_PAGE_BUILD_STANDARD_V1_2026-10-11.md` continuam prevalecendo.
- **Referência de layout:** Soma Perdizes, **somente** para a composição do cabeçalho; Ária Higienópolis para o tratamento visual de formulário/rodapé. Não copiar fatos, mídias ou preços de outro projeto.

## 1. Objetivo da experiência

Página de venda mobile-first com leitura editorial premium, hierarquia de informação e CTA de captação sem ruído. O visitante identifica rapidamente o empreendimento, encontra características e condição comercial, explora lazer e plantas, conhece o bairro, lê respostas objetivas e solicita atendimento.

**Princípios aprovados na iteração:** um H1 dominante; H2/H3 descritivos ou em formato de pergunta e resposta; **uma** faixa de quatro facts após o hero; sem ticker animado nem segunda faixa de números no hero; nenhuma explicação técnica, crédito de origem ou nota operacional no corpo comercial. As ressalvas jurídicas permanecem no rodapé, quando exigidas.

## 2. Sequência real de componentes no HTML

1. `header.nav`: logo oficial Tegra com link `/`; badge estático `ODE Perdizes · MoreTegra` (elemento `span.pilot`); link `Todos os empreendimentos` para `/`, estilizado branco sem azul/sublinhado padrão. O texto central **não** é link de bairro. Três elementos permanecem legíveis em mobile.
2. `section.hero`: perspectiva de fachada no HTML inicial (`img.hero-poster`, `fetchpriority=high`, sem lazy), sombra para contraste, eyebrow contextual, H1 único, promessa do projeto e CTA `#formulario`.
3. `section.facts`: **quatro** fatos em banda escura: 156 m²/tipologia, vagas, bairro e estágio. São dados específicos do ODE, **não** valores fixos do modelo.
4. `section.price-section#valores`: bloco comercial com preço de referência e condições; não repetir a mesma informação em ticker ou meta-faixa.
5. `section.section.residences`: introdução de produto com H2 em pergunta, resposta indexável e contextualização.
6. `section.full`: fotografia/perspectiva imersiva com mensagem de lazer/convivência.
7. `section.signature`: atributos arquitetônicos, diferenciais e contexto do projeto.
8. `section.section`: lazer e comodidades em grupos (família, convivência, rotina), **antes** da galeria.
9. `section.gallery#galeria`: carrossel único de perspectivas com legenda, contador e navegação.
10. `section.section.residences#residencias`: plantas oficiais com seletor acessível; conteúdo da tipologia visível e indexável sem depender da interação.
11. `section.section.residences#localizacao`: contexto do bairro/localização, com tratamento de endereço e mapas sujeito à regra RESF.
12. `section.section.residences#faq`: perguntas e respostas visíveis, coerentes com `FAQPage` do JSON-LD.
13. `section.section.residences#mais-no-bairro`: links internos reais para projetos relacionados, sem concorrentes.
14. `section.lead#formulario`: argumento de conversão, formulário e confirmação de interesse.
15. `footer.footer`: informações comerciais, responsabilidade, contato e ressalvas.
16. `nav.quick`: CTA flutuante `Mais Informações` para `#formulario` + botão circular verde com **símbolo oficial do WhatsApp**, link `wa.me` preservado.

Esta ordem é a **implementação do ODE**, não um contrato que obriga outras páginas a terem as mesmas seções.

## 3. Contrato visual e responsivo

- Paleta: amarelo Tegra `#EBB92E`, tinta `#0a0a09`, papel `#f2efe8`, areia `#d9d1c5`, branco; uso alternado de blocos escuros e claros.
- Tipografia: H1 serifado de grande impacto; H2/H3 com escala inferior à do H1. Texto corrido em fonte de sistema/Inter fallback; sem dependência de fonte externa pesada.
- Conteúdo contido por `.wrap`, máximo de `1360px`; layout fluido. `@media(max-width:900px)` reorganiza grids e `@media(max-width:650px)` otimiza a composição mobile, inclusive o cabeçalho de três elementos.
- Cabeçalho: logo Tegra transparente amarelo canônico, **não** letra “T” substituta. `.nav .mt-back` tem cor branca e `text-decoration:none`, com foco visível e hover discreto.
- Facts: quatro colunas em desktop; duas colunas em largura reduzida, com bordas/espacamentos ajustados.
- Galeria: `aspect-ratio:16/10`, `object-fit:contain`, faixa de abas horizontal com rolagem, `scroll-snap` e alvo de toque mínimo de 44px; setas anteriores/próximas.
- CTAs fixos: `Mais Informações` + WhatsApp verde `#25d366` com ícone `https://s3-gdigital.s3.amazonaws.com/gdigital/313/whatsapp-removebg.webp`; 54px de alvo, `aria-label`, ajuste do deslocamento pelo consentimento. Preservar texto e links aprovados ao adaptar.
- Lead/rodapé: tratamento bege/branco inspirado em Ária, sem mudar contrato comercial nem dados do formulário.

## 4. Galeria: modelo de dados e comportamento

A implementação atual possui **14 perspectivas ilustradas distintas** da galeria oficial de ODE Perdizes, todas com URLs individuais `https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/313/Imagem/<arquivo>.jpg`. Os ambientes, nesta ordem:

1. Fachada;
2. Acesso à portaria;
3. Hall social;
4. Piscina descoberta;
5. Praça das águas;
6. Espaço de descanso;
7. Espaço gourmet;
8. Churrasqueira gourmet;
9. Salão de festas;
10. Fitness;
11. Sala funcional;
12. Playground;
13. Brinquedoteca;
14. Pet place.

Origem operacional: URLs extraídas pelo proprietário do site oficial `https://www.tegraincorporadora.com.br/sp/sao-paulo/oeste/perdizes/odeperdizes`; o inventário de 73 referências no DOM foi deduplicado em 18 imagens originais, das quais 14 foram selecionadas. Não inventar URLs ou completar a contagem com repetição; não chamar perspectiva de foto real nem de interior de apartamento.

**Contrato do JavaScript:** `const scenes = [[label, url, alt], ...]` é a fonte única para a galeria; `[data-scene-nav]` é a única faixa de abas (sem menu estático duplicado); `#scene-image`, `#scene-label` e `#scene-count` acompanham a cena. O contador inicia em `01 / 14`. Pré-carregamento da próxima imagem; controle de solicitações obsoletas em cliques rápidos; em erro, preserva-se a cena anterior; rolagem da aba ativa deve ocorrer **dentro** da faixa horizontal, sem mover a página inteira.

**Gate de mídia:** origem oficial e URL pública não comprovam licença de republicação. Validar autorização, HTTP/CDN, imagem correta, proporção, ALT e comportamento mobile. Hero e metadados OG/Twitter usam fonte própria e não devem ser trocados por efeito colateral da galeria.

## 5. Plantas e semântica de busca

- Plantas com `plant-viewer` e controles de abas: apresentar títulos/áreas exatas e não fundir tipologias diferentes.
- HTML semântico: um H1, H2/H3 coerentes, perguntas respondidas em texto visível; FAQ em HTML deve permanecer alinhado ao `FAQPage` em JSON-LD.
- `title`, description, canonical com barra final, robots, OG/Twitter, `WebSite`, `WebPage`, `BreadcrumbList`, `ApartmentComplex`, `ImageObject` e `FAQPage` são tratados como contrato SEO da página. **Não** replicar entidades/endereço/áreas para outros empreendimentos.
- `#mais-no-bairro` deve conter links internos existentes e relevantes; evitar links oficiais externos no corpo de venda conforme guardrails RESF.
- `sitemap.xml` com URL canônica e `lastmod` correspondente a alteração real; IndexNow/Search Console são atividades separadas e não podem ser marcadas como executadas por um merge.

## 6. Captação, mensuração e integridade

- Formulário: `#moretegra-lead-form`, `data-moretegra-lead-form`, `data-form-id="46"`; hidden `tenant_id=313`, `form_id=46`, `title=MoreEmUmTegra`; nome, e-mail e telefone. Não alterar sem autorização específica.
- O fluxo existente depende de `/src-greenn/preview/runtime.js`, `measurement-core.js` e `measurement-form.js`; preservar as dependências, consentimento e eventos. Não inventar endpoint intermediário, credencial ou sucesso de envio.
- CTA `Mais Informações` e demais CTAs apontam para `#formulario` com `data-form-intent="conditions"` quando aplicável.
- WhatsApp flutuante e contatos do rodapé permanecem os do contrato comercial vigente; não alterar números, nome, CRECI ou URL sem aprovação.
- Validação de formulário real em produção, GTM/GA4 e recebimento no CRM **não** são demonstrados pelos checks de GitHub.

## 7. Regras de reaproveitamento

**Pode reutilizar:** ordem narrativa geral, hierarquia H1/H2, faixa única de facts, carrossel com fonte de dados única e controles acessíveis, escala tipográfica, tratamento do lead, CTA/WhatsApp flutuante, cabeçalho com logo + identificação estática + retorno, otimizações mobile e princípios de SEO semântico.

**Deve substituir com fonte e aprovação do projeto de destino:** nome/slug, bairro, estágio, H1, copy, preço, estoque, área, tipologia, vagas, plantas, mídia/ALT, localização, endereço, FAQ/JSON-LD, links internos e texto pré-preenchido do WhatsApp.

**Não pode assumir:** que toda página tenha 14 fotos, última unidade, preço de R$ 2.090.000, área de 156 m², 2 vagas, mesmo número comercial, mesmos ambientes ou autorização automática de imagem. O padrão RESF V1 e as baselines prevalecem.

## 8. Gates de aceite e risco residual

- **Código:** PR #590; comparação com `main` antes da documentação: apenas HTML do ODE e `sitemap.xml`. Head de referência pré-documentação: `5fb821f82e9854a26866b657005f8627680841d5`; **10/10 workflows PR SUCCESS** nesse head.
- **Aceite visual:** não atestado por captura independente nesta execução. Confirmar no Live Sync `http://localhost:8080/empreendimentos/ode-perdizes/`, especialmente topo com três elementos, 14 fotos, abas, plantas, WhatsApp e formulário em 360–390px.
- **Risco comercial prioritário:** a página contém a afirmação de última unidade/unidade 22 e preço de R$ 2.090.000, **herdados da versão anterior em `main`**, enquanto o site oficial da incorporadora foi observado com indicação “100% Vendido”. Não inferir disponibilidade atual a partir do código. Antes de anunciar ou atualizar campanhas, confirmar formalmente estoque e condições com a autoridade comercial; corrigir título, descrição, H1, bloco de preço, FAQ e JSON-LD em conjunto se a oferta não existir.
- **Risco de mídia:** verificar autorização de uso e resposta das 14 URLs em produção; fonte oficial não equivale a autorização escrita.
- **CI não é QA:** checks automatizados não comprovam navegação mobile real, entrega CRM, indexação ou publicação Greenn.
- **Release e rollback:** a `main` antes da PR #590 era `aeefc2a470b9b0b645ce83a657648d4ed32aeafc`; o deployment Vercel de produção observado antes do merge era `dpl_4B4yBarLYCLFMjme2BnU9b34GcBn` (READY, commit correspondente). **Registrar o deployment pós-merge, alias e SHA reais no recibo da PR**. Reverter por procedimento autorizado, sem `force-push` da `main`.

## 9. Evidência e links

- [PR #590 — histórico, aprovação, commits e checks](https://github.com/wagnerjfjunior/MoreNumTegra/pull/590)
- [Página ODE Perdizes](https://www.moretegra.com.br/empreendimentos/ode-perdizes/)
- [Fonte de mídia Tegra](https://www.tegraincorporadora.com.br/sp/sao-paulo/oeste/perdizes/odeperdizes)
- `docs/frameworks/resf/v1/EXACT_PROJECT_PAGE_BUILD_STANDARD_V1_2026-10-11.md`
- `docs/frameworks/resf/v1/RESF_CONVERSION_GUARDRAILS_2026-11-09.md`
- `docs/baseline/FUNCTIONAL_BASELINE_V2.md`
- `docs/baseline/TECHNICAL_BASELINE_V2_3.md`
