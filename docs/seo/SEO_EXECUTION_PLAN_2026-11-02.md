# SEO / MoreTegra — 2026-11-02

Inventário integral da amostra rastreada pelo OpenSEO, **85 URLs**, não confundir com o conjunto integral do sitemap ou todas as URLs do domínio. Arquivo CSV contém cada página, status HTTP, indexabilidade, inclusão no sitemap, contagem Unicode de título e descrição e sinalizações do auditor.

## Contrato editorial e gate
- title: até **60 caracteres**, description: até **160 caracteres** (limites conservadores de QA; Google pode truncar por largura em pixels e gerar outros snippets).
- Para título / descrição de página indexável, exigir texto distinto, semanticamente correto, sem dados comerciais não comprovados.
- Verificar canonical www, robots, H1, OG/Twitter, JSON-LD, links internos, favicon e CTA; não mudar noindex de rascunhos.
- Retestar todos os 85 e todo o sitemap em auditoria subsequente, pois esta varredura não prova cobertura total.
- Executar validações RESF/SFJM do repositório, preview LVR ou validação em produção com rollback controlado.
- Não realizar merge automático.

## Correções apontadas nesta amostra
- title-too-long: **16**
- meta-description-too-long: **10**
- noindex-page: **11**; não remover indiscriminadamente. Os itens se sobrepõem.
- missing-meta-description: **0 nesta amostra**, apesar das 40 na auditoria de 27/10, que percorreu outro conjunto.

## Primeira intervenção
Ampère Brooklin: alinhar title, meta description e equivalentes sociais/estruturados, mantendo configuração comercial factual existente e endereço canônico. GSC (03/10 a 30/10) 145 impressões/0 cliques (posição média 10,17). Não atribuir causalidade nem prometer CTR. Validar após deploy com novo período GSC.

Novo title: Apartamentos no Brooklin | Ampère Tegra de 262 m² (49 caracteres)

Nova description: Ampère Brooklin Tegra: apartamentos de 262 m², 4 suítes e 4 vagas, com dois terraços. Veja plantas e consulte condições e disponibilidade. (138 caracteres)
