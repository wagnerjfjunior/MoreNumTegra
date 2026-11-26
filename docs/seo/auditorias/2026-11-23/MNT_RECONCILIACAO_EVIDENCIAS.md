# Reconciliação de fontes e divergências — SEO links/funis

Data: 23/11/2026. Estado desta nota: documentação proposta em PR; não altera o status canônico da main.

## Divergências live verificadas nesta preparação

- PR #595 **merged** na main, merge commit **0cd8dc8c0d187f9602f69acf3b5ab46e0a0cd037**, conforme metadados atuais GitHub.
- PR #596 **merged** na main, merge commit **05e016913c54b4704373b716577db189df39244d**, conforme metadados atuais GitHub.
- O topo de **handoffs/CURRENT.md**, **docs/PROJECT_STATUS.md**, **docs/NEXT_SAFE_ACTION.md** e **docs/BLOCKED_ACTIONS.md** ainda narra a frente FGTS #595 como DRAFT/sem merge. São registros históricos de antes dos merges; há divergência material para continuidade. **Não resolver esta divergência por conjectura nem sobrescrever os arquivos na PR da auditoria**. Fazer reconciliação autônoma na main antes de execução.

## Leituras obrigatórias na retomada

- CLAUDE.md e AGENTS.md (ponto de entrada SFJM).
- .sfjm/project.json, bootstrap/BOOTSTRAP_CANONICO.md.
- handoffs/CURRENT.md, docs/PROJECT_STATUS.md, docs/NEXT_SAFE_ACTION.md, docs/BLOCKED_ACTIONS.md.
- docs/frameworks/resf/v1/EXACT_PROJECT_PAGE_BUILD_STANDARD_V1_2026-10-11.md e RESF_ORBITA_PAGE_MODEL_2026-11-23.md.
- Baselines aplicáveis e dossiê docs/seo/MNT_FGTS_ORBITA_CLUSTER_2026-11-23.md.
- Documentos e datasets desta pasta, com cruzamento do código atual.
- Alterações relacionadas a GA4, formulário e proteção da frente RJ; não inferir dados não observados.

## Evidências e não evidências

| Afirmação | Estado | Fonte |
|---|---|---|
| Sitemap auditado possui 84 URLs | CONFIRMADO 23/11 no arquivo | sitemap.xml |
| 89 linhas de inventário = 84 + 5 extras | CONFIRMADO no relatório, extras necessitam verificação | CSV/relatório |
| OpenSEO 14/11 rastreou 87 URLs HTTP 200 | HISTÓRICO CONFIRMADO | auditoria e541d749-de85-431a-ae15-a4020cbe01fe |
| GSC 20/08–20/11 possui dados por página/consulta | CONFIRMADO via OpenSEO | CSVs selecionados |
| Páginas do RJ apontam para #projeto-N, ausentes no HTML do hub | CONFIRMADO no GitHub 23/11 | arquivos src-greenn/empreendimentos e src-greenn/rio-de-janeiro/index.html |
| Todos os links são válidos na produção atual | NÃO COMPROVADO | exige crawl HTTP pós-merge + DOM |
| Uso do FGTS garantido em todos os imóveis prontos | NÃO — afirmação proibida sem enquadramento | contrato FGTS |
| Posições/CTR demonstram aumento após linkagem | NÃO COMPROVADO | medição posterior |
| Form46/47 e eventos GA4 funcionam ponta a ponta | NÃO COMPROVADO na auditoria | QA/CRM pendentes |
| Estimativas DataForSEO são rankings reais do domínio | FALSO | natureza do fornecedor |

## Restrições

Esta PR é somente documentação e preparação de revisão. **Não contém implementação de SEO**, alteração de código do site, validador, credencial, formulário, esquema, campanha, robots ou sitemap. Não mesclar, publicar ou realizar IndexNow por consequência desta PR. Revisão Claude não substitui autorização específica do proprietário.
