# SFJM / RESF — Hub de bairros: PR #440, release e handoff

Data: 2026-10-19
Repositório canônico: `wagnerjfjunior/MoreNumTegra`
Escopo: DOCUMENTATION_ONLY / RELEASE_RECORD / REGIONAL_HUB_ADDITION
Página: `https://www.moretegra.com.br/regioes/`
Autoridade: MoreNumTegra `main` (este documento não substitui o código nem a evidência HTTP).

## Evidência live confirmada
- PR comercial/SEO [#440](https://github.com/wagnerjfjunior/MoreNumTegra/pull/440): MERGED via squash após autorização do usuário.
- Commit canônico do release: `f9960079cd43aad3ee880b0ce17e71888a31d40f`.
- Head da PR: `35d56e2158e804d4cb6d9a7a97056d4f0c844ede`.
- Dois workflows consultados no head concluíram SUCCESS: Favicon standard validation e SEO two distinct images - 39 URLs. **Não** significam certificação de todo o CI, Lighthouse, SEO ou Form46.
- Vercel Production READY: `dpl_2J3Wz6khzVc8LzPQ5PYUNnvTviHF`, `githubCommitSha=f9960079cd43aad3ee880b0ce17e71888a31d40f`. Aliases incluem `www.moretegra.com.br`.
- PR #439: CLOSED sem merge; suas correções de Sabrina e footer foram incorporadas à #440. Não reabrir/mergear #439 isoladamente.
- USER_REPORTED/USER_ACCEPTED_VISUAL: usuário confirmou “ficou ótimo” após publicação; não confundir com smoke funcional completo em mobile, conversão real ou Google Search Console.

## Contrato aplicado ao hub regional (/regioes/)
- HTML semântico, CSS/JS portáveis e responsividade mobile-first; preservar fluxo GitHub → Vercel → Greenn quando aplicável ao produto V1, sem introduzir framework ou backend.
- Sequência editorial: catálogo e comparação → preço do m²/valorização/IDHM/mobilidade → apartamento na planta → financiamento imobiliário → Sabrina da Tegra → FAQ → Form 46.
- H1 único, H2 coerentes; FAQ visível (9 itens) e JSON-LD FAQ preexistente preservados. Metadados e canonical preservados.
- Conteúdo financeiro informativo e condicional: **não** inventar preço/m², IDHM de bairro, índices recentes, juros, taxas, regras bancárias, elegibilidade FGTS ou prometer aprovação ou valorização.
- Fontes exibidas por **nome**, sem URLs externas nos novos guias: FipeZAP, PNUD/Atlas, ObservaSampa/Prefeitura, CAIXA e Banco Central. Quando números vierem a ser publicados, exigir fonte, data, unidade geográfica e método.
- Sabrina da Tegra: narrativa consultiva em primeira pessoa, função além da venda, esclarecimento de dúvidas, contato por formulário, telefone ou mensagem, **agendamento prévio**; no estande solicitar expressamente **Sabrina da Tegra**.
- Na seção Sabrina, **não** inserir base/endereço Caminhos da Lapa ou mapa, nem link destacado de perfil; perfil oficial apenas no footer comercial RESF.
- No encerramento de cada guia, da seção Sabrina e do FAQ: CTAs **Formulário** (`#formulario`), **Ligar** (`tel:+5511960779328`, símbolo de telefone) e **Mensagem** (WhatsApp `wa.me/5511960779328`, logo WhatsApp canônico), com nomes acessíveis e mensagem predefinida, sem envio automático. Mobile: Formulário primeiro; Ligar e Mensagem lado a lado.
- **Form 46/tenant 313**, scripts de mensuração e footer comercial preservados na revisão HTML/PR; envio real de lead não foi certificado nesta entrega.

## Escopo RESF / limites
Adendo pontual para o **hub regional**, sem modificar o padrão canônico de páginas exatas `docs/frameworks/resf/v1/EXACT_PROJECT_PAGE_BUILD_STANDARD_V1_2026-10-11.md`, que se aplica a `/empreendimentos/<slug>/`. Não aplicar automaticamente os novos guias e CTAs a todas as páginas exatas; cada retrofit requer gate e aprovação por rota.

## Próximas validações
1. Smoke HTTP público da URL exata (status, HTML servido, âncoras, botões) e QA toque mobile/desktop; testar `tel:` e WhatsApp sem envio automático de lead.
2. Form46 de ponta a ponta somente com consentimento/autorização para lead real; preservação de código não comprova entrega CRM.
3. SEO: baseline por URL no GSC e acompanhamento em janelas de 30/60/90 dias de consultas, impressões, CTR e posições; não prometer ranking nem prazo de indexação.
4. GA4/GTM: validar eventos de formulário, telefone e WhatsApp e respectivo consentimento; implementação de eventos granulares novos não foi comprovada.
5. Preservar rollback via revert do squash `f9960079cd43aad3ee880b0ce17e71888a31d40f` por PR, nunca reset forçado da main.
6. O cluster Vila Nova Conceição permanece IN_PROGRESS (Tièl/região pendentes); #440 não encerra esse cluster.

Estado: MERGED / VERCEL_READY / VISUAL_USER_ACCEPTED / MOBILE_FORM46_GSC_NOT_INDEPENDENTLY_VERIFIED.
