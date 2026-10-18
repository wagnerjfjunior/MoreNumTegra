# SFJM — Fechamento Bueno Brandão 257 e handoff do cluster Vila Nova Conceição
Data: 2026-10-18
Repositório canônico: wagnerjfjunior/MoreNumTegra
Escopo: DOCUMENTATION_ONLY / NO_PRODUCT_CHANGE
Estado: BUENO_APPROVED / CLUSTER_VILA_NOVA_CONCEICAO_IN_PROGRESS

## 1. Estado verificado (GitHub/Vercel)
- PR #425: implementação editorial/comercial RESF Bueno Brandão, merged; squash 72773e01aae5415c522f35ddb69a7fcb23fb6cda.
- PR #426: paridade de grafo JSON-LD (Person, Service, Product, Offer) com abordagem Órbita, merged.
- PR #427: remoção de `ApartmentComplex.brand` incompatível, merged; produção anterior `7526807f74794d915cda8d1989ee7b23915a2181`.
- PR #428: identificadores AP0031 / AP0021 / AP0251, especificações do memorial e revisão de texto público, merged; **squash `44e44c370d1c53a45a7f12d52c157cc12be4b4ef`**; **8/8 GitHub workflows SUCCESS** no head `6b0d5e1d2dc997ef286f91efc7a416ae463fa993`.
- Vercel produção: `dpl_2iru2kNyo13qK2NQpSAjdDz4oMvR` READY, SHA `44e44c370d1c53a45a7f12d52c157cc12be4b4ef`; release anterior `dpl_GkAZYZY6S6p5sGHCvVCjjH8jNfF6` READY, SHA `7526807f74794d915cda8d1989ee7b23915a2181`, candidato de rollback. Rollback somente conforme gate/governança e PR rastreável.
- Aprovação do usuário em conversa de 18/10/2026 **USER_APPROVED** para Bueno após merge/deploy. Não converter aprovação verbal em comprovação independente de testes externos, mobile, Form46, Rich Results ou métricas CWV.

## 2. Escopo homologado do Bueno Brandão
- Página: `/empreendimentos/bueno-brandao-257/`; title/canonical mantidos. V1 HTML/CSS/JS, seletor comercial de duas opções, 4 facts sob hero, plantas, galeria, vídeos, WhatsApp, Form46 e FAQ visível 10/10 em paridade com JSON-LD.
- Apartamento tipo **AP0031**: 500 m², 5 suítes, 5 vagas, referência de outubro **R$ 21.750.000**.
- Jardim **AP0021**: 711,67 m², 5 suítes, 5 vagas, sem preço publicado.
- Cobertura duplex **AP0251**: 923,58 m² no espelho, 5 suítes, 7 vagas, referência de outubro **R$ 50.000.000**. Seletor conserva código `?unidade=923`. Não confundir esta unidade com `AP0031`, nem arredondar metragem de forma a contrariar o espelho.
- Fonte comercial: `Tegra/Outubro/Tabela_Outubro_2026.md` e espelho de vendas Tegra de 18/10/2026; valores, condições e estoque sujeitos à confirmação comercial. A tabela anterior tinha 'unidade 31' também na linha da cobertura; espelho esclarece AP0251.
- Fonte técnica: `Tegra/Memoriais_Descritivos/Bueno Brandão 257-Memorial Descritivo - Residencial.pdf` (nome Unicode verificar ao buscar) / R01 21/10/2022. Especificações aproveitadas: piscina coberta raia 25m + descoberta, segurança, fachada, aquecimento solar, previsão de automação e gerador conforme projeto; removida alegação 'gerador 100%'.
- **Política editorial aprovada:** NÃO expor justificativas de fontes, datas do espelho ou link ao memorial no corpo comercial; dúvidas de imóvel, acabamentos e condições devem ser encaminhadas à **Sabrina da Tegra**, WhatsApp `+55 11 96077-9328`. Evidências ficam na documentação interna, não na copy pública. Não ressuscitar os parágrafos eliminados.
- Não afirmar disponibilidade atual, número de unidade ou preços não confirmados; não reutilizar dados da torre Tièl/Studios como atributos da torre residencial.
- JSON-LD: 20 entidades no @graph com Product/Offer comerciais vinculados; **não interpretar contagem de 3 rich-results do Google como número total de entidades**. Google Rich Results e Schema.org externos foram encaminhados ao usuário para avaliação, mas não há registro capturado nesta sessão de relatório externo completo; aceite usuário não substitui evidência de varredura técnica.

## 3. Cluster Vila Nova Conceição — não encerrar ainda
URLs existentes em main conferidas em 18/10:
1. `/empreendimentos/bueno-brandao-257/` — **USER_APPROVED**, preservar.
2. `/empreendimentos/tiel-vila-nova-conceicao/` — existe; **AUDIT_PENDING**, não presumir RESF concluído.
3. `/regioes/vila-nova-conceicao/` — existe, title 'Apartamentos em Vila Nova Conceição | Tegra'; **AUDIT_PENDING**.
Também conferir descoberta via Home, navegação, breadcrumbs, catálogo, mapas, links internos e CTAs.
Atribuição semântica: regional = contexto de bairro e distribuição; Tièl = residências compactas/studios pertinentes; Bueno = residências amplas de alto padrão; não misturar unidades, preços ou públicos e evitar canibalização/cópia.
Higienópolis é prioridade posterior condicionada ao fechamento demonstrável deste cluster.

## 4. Próxima ação segura na nova conversa
1. Resolver live `main` + Vercel e ler bootstrap, CURRENT, PROJECT_STATUS, NEXT_SAFE_ACTION, BLOCKED_ACTIONS, este handoff e baselines RESF/SEO.
2. Fazer inventário por URL de títulos, H1-H3, canonical, robots, OG/Twitter, FAQ visível e schema, HTTP/status, sitemap/indexação quando houver acesso real, imagens/ALT, links bidirecionais, CTAs e Form46; testar mobile por toque e fluxo end-to-end.
3. Comparar Tièl, página regional e navegação com diretrizes SEO/GEO de 17/10; separar evidência PASS, USER_REPORTED, não testado e falha. Evitar inferir tráfego/citações sem GSC/analytics.
4. Corrigir somente lacunas demonstradas em branch isolada, com baseline/rollback; preview, checks CI, aprovação antes de merge.
5. Atualizar handoff e fechar cluster apenas com evidências por URL e aceite explícito.
## 5. Restrições
Nenhuma alteração de código de produto ou produção neste fechamento documental. GitHub main é canônico; SFJM Workspace deve apenas espelhar este recibo, jamais substituir fatos live.
