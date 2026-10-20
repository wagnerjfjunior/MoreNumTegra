# SFJM — Correção do inventário editorial Tegra / MoreTegra

Data: 2026-10-20. Repositório canônico: `wagnerjfjunior/MoreNumTegra`. Referência inicial de main: `bb0e7d6ba301c4e4eb06a62ac0aa43c48069b62e`.

## Achado
A Home do Blog e quatro índices de categoria exibem 48 pautas derivadas de metadados da Tegra, com títulos e slugs coincidentes. Entretanto, **47 URLs são scaffolds de 2–3 KB** que anunciam revisão editorial e usam `noindex,follow`: não são 47 reproduções do corpo de artigos corporativos. A 48ª pauta — valorização da Lapa — foi substituída por artigo original indexável, novo slug `/blog/mercado/valorizacao-imobiliaria-lapa-sao-paulo/` e redirecionamento 301 de seu caminho anterior na PR #462.

## Risco de conteúdo
Mesmo bloqueadas de indexação, as 47 pautas permanecem publicamente navegáveis, conservando H1 e slug da Tegra e prejudicando a identidade do site. **Não gerar artigo genérico alterando só os sinônimos nem remover noindex antes de texto autoral e revisão factual.**

## Plano consolidado
A matriz [JSON](MNT_BLOG_48_PAUTAS_REARQUITETURA_ORIGINAL_2026-10-20.json) lista cada uma das 48 referências, categoria, slug legado, H1/título original, **novo slug proposto**, **H1 autoral proposto**, ângulo editorial e prioridade.

* **Etapa 1, planejamento:** separar as 47 pautas `BRIEF_ONLY_NO_ARTICLE`, nunca tratá-las como prontas. Validar intenção de busca e fatos a partir de fontes autorizadas. Não reproduzir conteúdo ou estrutura dos artigos da Tegra. A pessoa/empreendimento Tegra pode ser citado com atribuição factual legítima, não como autoria presumida.
* **Etapa 2, conversão:** em lotes coerentes, escrever artigos originais substantivos, organizar o hub `/blog/`, incorporar links ao cluster de bairro/região/empreendimento, adicionar fotos legítimas e dados estruturados compatíveis. Revisar título/H1/slug antes de liberar `index,follow`.
* **Etapa 3, migração:** confirmar quais slugs legados receberam tráfego/indexação apesar do noindex; implementar 301 do endereço antigo para a página original equivalente apenas quando destino final publicar conteúdo útil. Não apontar dezenas de temas distintos à Home; não acrescentar páginas de espera ao sitemap.
* **Etapa 4, QA e aceite:** mobile, metadados, OG, canonical, JSON-LD, breadcrumb, sitemap, links internos, 301, HTTP e fonte factual. Registrar rollback por PR/commit; obter autorização específica para merge quando houver material revisável.

### Regra de SEO
Não se presume punição automática por slug ou H1 semelhante. O problema é falta de diferenciação e experiência editorial incompleta. O Google não precisa de uma migração de 47 URLs `noindex` imediatamente. Nenhuma métrica de valorização ou características comerciais deve ser inventada.

### Publicação e prioridades
Prioridades propostas P2: temas com relação clara a leads/mercado de São Paulo e páginas já desenvolvidas. P3: lifestyle e decoração; P4: temas fora da geografia central ou dependentes de relatórios externos. A matriz inclui uma linha `DONE` da Lapa para rastreabilidade e 47 `BRIEF_ONLY_NO_ARTICLE`.

**Escopo deste PR:** apenas documentação e gate CI. `main` e produção permanecem inalteradas até aprovação de um plano executável de migração/publicação em lotes.
