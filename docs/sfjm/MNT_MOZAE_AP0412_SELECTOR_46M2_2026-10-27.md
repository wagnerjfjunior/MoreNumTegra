# SFJM — Hotfix Mozae AP0412 / seletor 46 m² — 27/10/2026

## Escopo
User request: o botão seletor "44,85 m² · AP0412 à vista" deve exibir "46 m² · AP0412 à vista" conforme tipologia de projeto na inteligência de mercado. A área comercial exata **44,85 m²** permanece no texto dinâmico da oferta, nos nós Product/Offer JSON-LD e no preço de tabela. Oferta à vista **R$ 606.000** preservada. AP807 72 m² (área comercial), planta-tipo 73 m², e AP0301 46 m² preservados.

## Release / rollback
- Base GitHub main antes desta PR: `7253d36a3cb74f906f0a829e6b3da4f21c777fc1` (PR #505 documental). Runtime antes da PR: `6ed0b9a869d360a5b88405713e9676b81ad31536` no Vercel deployment `dpl_97jjhP9pznUVEQSYdsdxJqe3ozAe` READY.
- Mudanças restritas ao seletor do HTML Mozae e aos snapshots rígidos de CI (2 scripts). Nenhuma modificação no HTML regional, canonical, CRM, Form 46, preços ou JSON-LD.
- Se regressão, rollback Vercel ao `dpl_97jjhP9pznUVEQSYdsdxJqe3ozAe` (verificar elegibilidade live antes da ação). Depois restaurar os três arquivos exatos da base `7253d36...` via branch/PR rastreável, sem force push, evitando apagar a PR documental #505 e outros commits.
- Validar no deployment atualizado: status 200; rótulo `46 m² · AP0412 à vista`; nota dinâmica `44,85 m²`; preços R$ 686.754,45 / R$ 606.000; H1/canonical; JSON-LD parseável; Form 46 e WhatsApp; checagem do seletor em viewport mobile quando possível.
- Não alegar validação de formulário real, mobile, Lighthouse ou Rich Results sem efetuar.
