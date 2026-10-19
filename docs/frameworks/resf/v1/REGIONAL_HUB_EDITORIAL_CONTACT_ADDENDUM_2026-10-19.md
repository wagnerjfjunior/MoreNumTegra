# RESF — Adendo de hub regional: SEO informativo e contato consultivo

Data: 2026-10-19
Status: EVIDÊNCIA_APLICADA_A_UMA_ROTA / CANDIDATE_REUSE_WITH_PRODUCT_GATE
Aplicabilidade inicial: `/regioes/` (hub geral). **Não** estende automaticamente aos hubs específicos ou páginas de empreendimentos.
Fonte: `docs/sfjm/MNT_REGIOES_PR440_RELEASE_ACCEPTANCE_2026-10-19.md`.
Release: PR #440, `f9960079cd43aad3ee880b0ce17e71888a31d40f`, Vercel Production READY `dpl_2J3Wz6khzVc8LzPQ5PYUNnvTviHF`.
Aceite de usuário: VISUAL_CONFIRMED. Demais QA funcionais: pendentes.

## 1. Hierarquia editorial observada
O hub combina descoberta e orientação sem virar um blog genérico: filtros/catalogação → fatores para escolha do bairro (preço do m², valorização, IDHM e mobilidade) → apartamento na planta → financiamento imobiliário → seção consultiva Sabrina da Tegra → FAQ visível → formulário Green Sales 46.

O conteúdo editorial usa H2/H3 coerentes, H1 único, explicações indexáveis e links internos válidos. Sem duplicação massiva dos dados por bairro e sem prometer desempenho SEO, volume de consultas, indexação ou valorização financeira.

## 2. Padrão de dados e fontes
- Indicadores nomeiam FipeZAP, PNUD/Atlas do Desenvolvimento Humano e ObservaSampa/Prefeitura, sem links externos de saída nos módulos informativos.
- Financiamento nomeia CAIXA e Banco Central, sem prometer taxas ou condições.
- Não publicar preço do m², IDHM específico de bairro, valorização percentual, taxa bancária, valor de entrada, prazo ou dado geográfico sem evidência com data, recorte espacial, metodologia e autorização.
- Valor de mercado anunciado não equivale a preço de transação; valorização não equivale a rentabilidade garantida.

## 3. Padrão consultivo e conversão
- Sabrina da Tegra em primeira pessoa; atendimento como suporte à decisão, não somente fechamento comercial.
- Agendamento antes da visita e orientação para solicitar expressamente Sabrina no estande.
- Na seção da Sabrina não expor endereço/base Caminhos da Lapa nem mapa: estandes específicos exigem agendamento. Perfil profissional fica discreto no footer comercial com logo, CRECI, telefone e identificação Tegra Vendas.
- Ao final dos três guias, seção Sabrina e FAQ: **Formulário** é CTA destacado; **Ligar** usa `tel:+5511960779328` e ícone telefônico; **Mensagem** usa logo canônico WhatsApp e `https://wa.me/5511960779328` com texto predefinido. Mensagem não deve ser enviada automaticamente.
- No mobile, formulário em linha principal e Ligar/Mensagem lado a lado; botões com alvos de toque suficientes, rótulos acessíveis e sem dependência de hover.
- Preservar Form 46/tenant 313, consentimento, GTM e tags existentes; não criar API intermediária sem necessidade provada.

## 4. Não regressão e próximo gate
O padrão RESF exato de `docs/frameworks/resf/v1/EXACT_PROJECT_PAGE_BUILD_STANDARD_V1_2026-10-11.md` continua canônico para `/empreendimentos/<slug>/`. Este é **adendo separado**, sem autorização para retrofit em lote.
QA pendente: HTTP live independente, mobile touch, link de formulário, ligação/WhatsApp, envio real Form46 quando autorizado, GTM/GA4 e linha de base GSC. Nenhum workflow isolado equivale a PASS global.
Rollback: revert governado do merge `f9960079cd43aad3ee880b0ce17e71888a31d40f`, sem reset forçado.
