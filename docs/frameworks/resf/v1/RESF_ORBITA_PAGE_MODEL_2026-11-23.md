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
