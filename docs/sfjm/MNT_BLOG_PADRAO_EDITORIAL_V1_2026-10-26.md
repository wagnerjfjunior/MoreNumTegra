# SFJM — Padrão editorial Blog MoreTegra V1 (USER_APPROVED)
**Data:** 2026-10-26  
**Escopo:** artigos autorais de `www.moretegra.com.br/blog/`, respeitando suas editorias e intenção de busca.  
**Decisão:** usuário aprovou adotar como padrão a experiência validada no artigo `/blog/dicasedecor/cozinha-apartamento-layout-uso-diario/`, publicado nas PRs #478 (conteúdo), #479 (RealEstateAgent), #480 (PostalAddress) e #481 (indexação).  
**Tipo de mudança deste documento:** DOCUMENTATION_ONLY. Nenhum outro artigo recebe autorização automática para indexação, migração, alteração de preço ou publicação.

## 1. Fontes canônicas e compatibilidade
- Repositório: `wagnerjfjunior/MoreNumTegra`; `main` é canônica; Vercel é publicação/homologação conforme configuração live; Greenn continua captação V1.
- Implementação de referência **visual e funcional**, não texto a copiar: `src-greenn/blog/dicasedecor/cozinha-apartamento-layout-uso-diario/index.html`.
- Exemplo público: `https://www.moretegra.com.br/blog/dicasedecor/cozinha-apartamento-layout-uso-diario/`.
- Padrão **complementa**, não substitui `docs/sfjm/MNT_BLOG_ORIGINALIDADE_INTEGRAL_HANDOFF_2026-10-20.md`: a originalidade substantiva aprovada na Lapa (PR #462) permanece obrigatória.
- Ler os gates SFJM `bootstrap/BOOTSTRAP_CANONICO.md`, `handoffs/CURRENT.md`, `docs/PROJECT_STATUS.md`, `docs/NEXT_SAFE_ACTION.md`, `docs/BLOCKED_ACTIONS.md` antes de cada implementação relevante.

## 2. Padrão editorial obrigatório por artigo
1. **Brief editorial original**: tema, persona, problema real, intenção de busca, fatos verificáveis, fontes/permissões, diferencial MoreTegra, URL alvo; revisar conflito/canibalização com slugs, hubs e páginas existentes. Não copiar títulos, H1, estrutura ou conteúdo da Tegra ou terceiros.
2. **Cabeçalho SEO**: `<title>` conciso e único, meta description, canonical HTTPS absoluto `www.moretegra.com.br`, OG/Twitter com imagem real publicada, favicon padrão; um H1 único e hierarquia H2/H3 lógica, HTML semântico e conteúdo indexável.
3. **Experiência mobile-first**: texto claro e escaneável, parágrafos de tamanho equilibrado, listas/tabelas úteis, navegação por toque, performance LCP/INP/CLS; HTML/CSS/JS portáveis sem framework obrigatório. Tabelas precisam ser legíveis no celular.
4. **Hero visual premium**: fotografia editorial de qualidade, adequada ao assunto e autorizada, armazenada preferencialmente em GDigital/S3 ou mídia autorizada; dimensões proporcionais, `alt` descritivo, `fetchpriority="high"` quando for o LCP e sem `loading="lazy"` acima da dobra. Conferir URL HTTP e largura/altura efetivas — não copiar números da foto de cozinhas para outra imagem. **Não adicionar legendas justificativas ou avisos promocionais ao hero sem solicitação ou necessidade legal.**
5. **Apoio visual**: imagens/diagramas relevantes para explicar pontos difíceis, não imagens genéricas apenas para preencher espaço; responsivos, width/height ou aspect ratio, lazy loading abaixo da dobra, `alt` útil; mídia autorizada, sem criar características fictícias de empreendimentos.
6. **Conteúdo útil e distinto**: resposta direta à dúvida principal, subtítulos e exemplos originais, comparações somente quando agregam valor, orientações verificáveis, conclusão alinhada à busca; nenhum preço, planta, metragem, tipologia, estágio, endereço ou disponibilidade sem fonte aprovada.
7. **FAQ editorial real**: perguntas pertinentes e respostas visíveis; evitar repetição do corpo. `FAQPage` apenas se necessário, visível e conforme regras de elegibilidade; não inserir schema para inflar contagem.
8. **Seção Sabrina da Tegra**: perto do fechamento, em posição contextual após o conteúdo/FAQ e antes dos cards. Reutilizar a foto **já autorizada** `https://s3-gdigital.s3.amazonaws.com/gdigital/313/sNzJJWhmmsjkZjUV7gCKTgrlzRINCD6yDIAvkZOJ.webp`, nome, CRECI-SP **209.905-F**, CTA real de WhatsApp **+55 11 96077-9328** com mensagem vinculada ao tema. Não transformar essa seção em autoria editorial falsa.
9. **Três cards visuais finais** — Guia de bairros `/regioes/`, Catálogo geral `/`, Studios e salas comerciais `/investimentos/studios-e-salas-comerciais/`. Usar imagens já aprovadas e relevantes, textos adequados ao artigo, navegação acessível e responsiva. Verificar se esses três destinos continuam relevantes à editoria; mudar excepcionalmente com justificativa editorial, sem repetir os mesmos links numa seção textual redundante.
10. **Integração de conversão leve**: CTA comercial só quando contextual; preservar link WhatsApp e, onde fizer sentido, Form 46 já existente, sem novo backend/segredos.

## 3. Dados estruturados e qualidade
- Base: `BlogPosting` (autor editorial verdadeiro, editor, imagem e URL), `BreadcrumbList` consistente com o caminho visível.
- `Person` e `RealEstateAgent` para Sabrina **quando sua seção de atendimento estiver efetivamente visível**, com IDs consistentes e informações verificadas; citar em `mentions`, não substituir o autor do artigo.
- O artigo de cozinhas utiliza as quatro entidades: `BlogPosting`, `BreadcrumbList`, `Person`, `RealEstateAgent`.
- `PostalAddress`: utilizar apenas propriedades aceitas; **não** acrescentar `addressNeighborhood`. Não preencher `priceRange` com faixa de preços de imóveis ou valores inventados para silenciar aviso opcional de empresa local. Aviso opcional pode ser aceito se não houver dado correto.
- Validar sintaxe do JSON-LD, Schema.org e Google Rich Results na URL realmente publicada; **Google não garante rich results para todos os tipos do Schema.org**. Erro x aviso opcional devem ser distinguidos.
- Metadados e marcação correspondem ao conteúdo visível; evitar `FAQPage` invisível, atributos falsos e dados comerciais inferidos.

## 4. Gates de release (cada URL separadamente)
1. Inventariar URL anterior e nova, estado HTTP/indexabilidade, título/H1/conteúdo, canonical, sitemap e linkagem; classificar `EXISTENTE_INDEXAVEL`, `EDITORIAL_PENDING_NOINDEX`, `INEXISTENTE` ou `REDIRECT`. Não presumir que 48 cartões sejam 48 artigos publicados.
2. Redigir e homologar artigo original em branch com PR rastreável; não afetar páginas comerciais, RESF, Greenn, consentimento, GTM, Clarity ou home.
3. Passar CI (incluindo favicon); conferir imagem/HTTP, acessibilidade, layout móvel, links dos cards, WhatsApp, performance e JSON-LD. Registrar honestamente verificações não realizadas.
4. Aprovação explícita do usuário por página para merge de conteúdo. Vercel Production READY no SHA do merge não substitui conferência HTTP da URL.
5. **Indexação é gate separado**: `noindex,follow` enquanto editorialmente pendente; retirar somente quando o usuário liberar **aquela URL**, como ocorreu na PR #481. Então incluir na descoberta/sitemap quando aplicável, validar robots/canonical/indexabilidade, enviar ao GSC/Bing/IndexNow se autorizado e verificar cobertura posteriormente. Submissão não garante indexação.
6. Manter recibo SFJM: URL, PRs, SHAs, screenshots/validações, decisões, avisos aceitos, status GSC/Bing e rollback por revert rastreável.

## 5. Template de sequência visual (referência, adaptar por pauta)
Breadcrumbs/categoria → H1 + lead informativo → hero premium → desenvolvimento original com H2/H3, imagens e comparativos relevantes → FAQ visível → seção Sabrina com foto e WhatsApp → três cards de continuidade → rodapé.

**Evitar**: repetição da seção "Da inspiração à escolha do apartamento" antes dos cards, ilustrativos simplistas quando há imagem melhor, legendas defensivas não solicitadas, múltiplos CTAs iguais e informações sem lastro.

## 6. Estado e próximos passos
- **Concluído**: modelo editorial V1 aprovado com a primeira página publicada; última liberação indexável PR #481, merge `2b5d8b39691846869ef14e2a9bd25369ed1be428`. Posteriores alterações que ocorram em `main` devem ser verificadas live.
- **Não inferir**: indexação efetiva pelo Google/Bing, Core Web Vitals reais, disponibilidade comercial, ou publicação dos artigos restantes.
- **Próxima ação segura**: escolher segundo artigo do inventário, montar brief e DE/PARA, preparar branch individual seguindo este padrão e solicitar aceite de release e indexação separadamente.
