# SFJM — Release PR #474 / Match Point — 2026-10-23

## Estado LIVE verificado
- Repositório canônico: `wagnerjfjunior/MoreNumTegra`
- Pull request: https://github.com/wagnerjfjunior/MoreNumTegra/pull/474
- Branch candidata: `sfjm/mnt-matchpoint-lowest-unit-reconciliation-20261023`
- HEAD homologado: `f16a7af52432451454373fd8cc51bb774e369af4`
- GitHub Actions: **17/17 SUCCESS, 0 failure, 0 pending** no HEAD aprovado.
- Aprovação explícita do proprietário: “vamos mergear tudo isto!!!!! está aprovado”.
- PR #474 promovida de Draft para Ready e integrada via squash em `main`.
- SHA de merge: `89bf0182d4e190fcc47a09fa7e157c0856579894`
- Vercel Production: `dpl_qcM2JvYTUF2TsFMsPiHMkUcQcyFe`, estado READY, `meta.githubCommitSha` idêntico ao SHA do merge.
- Domínio canônico `https://www.moretegra.com.br/`.
- **Não afirmar** que READY/CI equivalem a smoke HTTP/visual independente ou envio real de Form 46 ao CRM.

## DE/PARA comercial publicado e escopo
- YPY Alto do Ipiranga: cards `AP1507` 65 m² tabela R$798.600 / promocional R$740.000 e `AP906` 80 m² tabela R$940.000 / promocional R$871.800. Página exata com `?unidade=1507|906#valores`, FAQ, Product/Offer e contexto de Form 46.
- Mozae Higienópolis: dois cards Home `AP807` 72 m² R$1.015.840 e `AP0412` 44,85 m² com condição à vista R$606.000 (tabela R$686.754,45); título Home do segundo “Mozae Higienópolis | 45 m²”. Removidos da Home os cards AP0301 e AP809 por solicitação. Página individual contém seleção de unidade e seus próprios dados estruturados.
- Ária Higienópolis: AP1812 (Studio 30 m² R$455.100) e AP2102 (apartamento 53 m² R$856.480), seletor por unidade, contextos no formulário.
- Órbita: AP1814 38 m² R$343.900 e AP1305 69 m² R$645.800, sem menção do documento interno na copy.
- Bem Moema residencial: AP202 80 m² R$1.550.000; identidade AP202 confirmada expressamente pelo proprietário.
- Bem Moema Studios & Offices: unidade AP1102 26 m² R$418.500 conforme decisão comercial expressa, com atualização Home, página individual e investimentos.
- Garden Design: unidade 101 de 61 m², R$695.600, referência de JPEG fornecido pelo proprietário; imagem não foi publicada em CDN nesta PR.
- Os produtos não listados no DE/PARA não devem sofrer alteração comercial sem evidência e aprovação.
- O portal `CaminhosdaLapaTegra` não apresentava valores correspondentes a essas ofertas nas páginas verificadas; links proprietários MoreTegra preservados; nenhum commit naquele repositório.
- Manter Form 46, WhatsApp, consentimento e SEO; os 17 checks de CI passaram após reconciliação estrita de expectativas de preços e snapshots comerciais.

## Pós-release / próximos gates
1. Em leitura, validar HTTP/browser em `www.moretegra.com.br` para Home e deep links de YPY AP1507/AP906; Mozae AP807/AP0412; Ária AP1812/AP2102; Órbita AP1814/AP1305; Form 46 sem envio real.
2. Verificar Mobile/LVR toque, acessibilidade e atualização do texto/unidade ao escolher cards.
3. Verificar atualização e consistência de FAQ/JSON-LD Product/Offer; não declarar indexação GSC/Bing automaticamente.
4. Confirmar estoque/vigência de promoções Match Point comercialmente com Tegra Vendas, sem inventar disponibilidade.
5. Qualquer reparo pós-release exige evidência de regressão e PR; rollback só por processo rastreável, sem force-push de main.

Fonte DE/PARA histórico: `docs/sfjm/MNT_MATCHPOINT_LOWEST_UNIT_RECONCILIATION_2026-10-23.md`.
