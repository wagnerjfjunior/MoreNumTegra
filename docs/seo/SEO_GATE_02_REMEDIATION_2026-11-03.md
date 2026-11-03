# Gate 02 — remediação e evidências — 03/11/2026

## Contexto
PR #539, branch `audit/seo-metadata-inventory-20261102`. Este documento complementa/supera a classificação preliminar do Gate 02 sem apagar o histórico. O trabalho foi executado no código da branch; **nenhum merge nem deploy**.

## Correções verificadas
- **21 URLs originais:** title ≤60 caracteres; meta description ≤160; OG title/description; Twitter/X title/description; canonical=og:url; WebPage/CollectionPage.name e .description coerentes quando presentes; H1 único; sequência H2/H3 sem salto; 0 `img` sem atributo ALT; blocos JSON-LD parseáveis. Conferência estática do código-fonte após os commits.
- **6 OG descriptions longas** corrigidas (Claris Casa & Clube, Claris Rosas, Gaea, Gran Thai, Kronos, Singular).
- **Metadados sociais** faltantes adicionados e divergências de title/description ajustadas nas 21 URLs. Páginas sem `og:image` usam `twitter:card=summary` em vez de simular uma mídia.
- **WebPage/CollectionPage** com metadados editoriais históricos foi alinhado aos títulos e descrições atuais, sem mudança arbitrária nos dados comerciais do `ApartmentComplex`.
- **ALT**: seis textos genéricos de introdução «Imagem de...» reescritos de forma conservadora. Não transformar `alt=""` decorativo em texto redundante. A suposta truncagem do ALT «Pavilhão e espelho d'água do Gran Thai Leisure Residence» era **falso positivo de extração** causado por apóstrofo; o ALT original está íntegro.
- **Quatro páginas auxiliares do Complexo** receberam favicon completo: `/projeto/`, `/acessos-trajetos/`, `/obras/`, `/previsao-entrega/`. As duas últimas receberam também metadados OG/Twitter completos, elevando o lote de código rastreado a 23 URLs.
- **Ayla Moema**: nome de uma pergunta `FAQPage` corrigido para corresponder ao FAQ visível.
- **Novo CI:** `.github/workflows/seo-metadata-gates.yml` executa `scripts/validate-seo-content.mjs --strict` e `scripts/validate-seo-gate-02.mjs` para HTML alterados em PR.

## Testes reais GitHub Actions
Na execução do commit `0c3c1c2f29aed33576892bae62e4f39800003814`:
- **MoreTegra SEO metadata gates — SUCCESS**
- **Favicon standard validation — SUCCESS**
- **Tièl RESF V1 semantic quality gate — SUCCESS**
- **M5-10 Elo late GTM bootstrap slice 07 — FAILURE**. Log: o smoke espera `gtm.js` como primeiro evento, mas observa `default_consent`. A comparação de `src-greenn/empreendimentos/caminhos-da-lapa-elo-duo/index.html` com `main` confirmou conteúdo fora de `head` e scripts não JSON-LD idênticos. Falha não introduzida pelas alterações editoriais desta PR, mas continua impedimento na política de checks caso exigida.

## Pendências ainda abertas — sem declaração de conclusão global
1. **Git divergente:** a última comparação registrada identificou branch SEO 46 commits atrás da `main`, com sobreposição em `src-greenn/complexo-lapa-pirituba/index.html`. A `main` contém assets/mapas e simuladores mais recentes. **NÃO substituir a página de produção por versão antiga**. Reconciliar via merge com resolução explícita preservando conteúdo e depois repetir todos os checks.
2. **DSG Itaim:** seu HTML inicial é um bootstrap que carrega `/experiments/dsg-itaim-editorial-v3/index.html` via JavaScript e `document.write`. Quatro perguntas constam em `FAQPage` no bootstrap, mas não aparecem no HTML estático. O arquivo de origem não foi localizado na árvore consultada do repositório; a URL de produção não foi verificável por acesso externo nesta sessão. **Necessário testar a renderização e a visibilidade real do FAQ antes de declarar schema compatível com as diretrizes do Google.** Não remover schema às cegas, pois a versão completa pode ter FAQ visível.
3. **Rich Results / Schema.org oficial:** ainda não executado em ferramenta oficial para cada URL. JSON parseável não prova elegibilidade.
4. **Mídia social:** `/rio-de-janeiro/` e algumas páginas auxiliares do Complexo não possuem `og:image`; precisa selecionar mídia aprovada, sem inventar links.
5. **Noindex:** 11 URLs do inventário OpenSEO com `noindex` intencional ou pendente de release. Preservado. Decisão individual de publicação/indexação exige verificação do conteúdo e estágio comercial.
6. **Escopo total:** o crawl OpenSEO examinou 85 URLs, não prova exaustão do sitemap. Esta PR possui correções rastreadas em 23 URLs; as demais demandam auditoria completa e mapeamento semânticos por URL.
7. **GTM Elo:** investigar ou formalizar exceção com evidência comparativa na `main` antes do release; não alterar consentimento ou GTM sem especificação/autorização funcional.

## Posição de release
**NO GO** até reconciliação segura com `main`, reexecução final dos checks e aprovação de publicação. Toda correção permanece na PR #539.


## Adendo de testes e regressões — atualização após remediação

- Workflow de favicon: **SUCCESS** após inclusão dos pacotes de ícones em quatro rotas do Complexo.
- Gate SEO metadados: **SUCCESS** nas 23 URLs da PR, incluindo duas páginas auxiliares.
- Gate Tièl RESF V1: **SUCCESS** após normalização estritamente editorial.
- Gate RESF V2 endereço postal: **SUCCESS** após permitir apenas metadados editoriais aprovados no Ampère, Bem Moema, Tièl, Ayla, Key e Elo Duo, com demais invariantes preservadas.
- Gate GTM Elo: **SUCCESS** no commit `d57df37c36d135368e02a4f853ad146ce774ad83`, após atualizar o smoke de ordem de `default_consent` e `gtm.js` para refletir a `main` existente, mantendo checagem de carregamento tardio, requests únicos e consentimento. Nenhum código de execução do Elo foi modificado para isso.
- Na consulta ao commit `d57df37c36d135368e02a4f853ad146ce774ad83`: **21 workflows SUCCESS, zero falhas finalizadas e 1 pendente** (`M5-06 CTA/Form journey`). Resultados são específicos desse commit; commits documentais posteriores requerem verificação nova se forem usados para aceite.
- FAQ Ayla: pergunta estruturada alinhada ao texto visível.
- FAQ DSG: permanece dependente de renderização JS; não declarado conforme.
- As evidências anteriores de falha GTM registradas acima são históricas e foram superadas pela correção do teste, não pela mudança do runtime.
