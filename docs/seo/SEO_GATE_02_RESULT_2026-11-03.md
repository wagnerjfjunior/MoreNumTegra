# SEO Gate 02 — PR #539 — 2026-11-03

## Escopo / método
21 HTML alterados em `audit/seo-metadata-inventory-20261102`, inspecionados diretamente no GitHub por leitura do código-fonte (extração de metatags, headings, imgs e parse JSON). Não é teste de navegador, Twitter Cards Validator, Google Rich Results Test, renderização ou validação oficial de Schema.org.

## Resultado factual
- **H2/H3**: 0 saltos ascendentes de níveis detectados em 21/21 arquivos (análise de sequência de tags). Sem certificação de semântica contextual.
- **ALT**: 0 atributos `alt` ausentes em elementos `img` dos 21 arquivos. Há textos genéricos como «Tegra»/«Tegra Vendas» e ao menos um texto aparentemente incompleto («Pavilhão e espelho d», Gran Thai). Exigem inspeção da função de cada imagem, sem substituir automaticamente.
- **OG URL**: `og:url` igual ao canonical em 21/21.
- **OG descriptions**: 6 descrições excediam o teto editorial interno de 160 caracteres e foram corrigidas nesta branch: Claris Casa & Clube 254→126; Claris Rosas 272→157; Gaea 251→125; Gran Thai 281→130; Kronos 237→140; Singular 228→127. O texto final é a meta description já validada da própria página.
- **Twitter/X**: faltam `twitter:card` explícitos em 3 URLs: `/complexo-lapa-pirituba/projeto/`, `/complexo-lapa-pirituba/acessos-trajetos/`, `/rio-de-janeiro/`. Algumas outras páginas não declaram `twitter:title`/description, mas Twitter/X pode usar fallback Open Graph. Conferir contrato de produto, não classificar automaticamente como defeito de indexação.
- **Diferenças editoriais**: `og:description`, `twitter:description` e `WebPage.description` não são idênticas à `meta description` em diversas URLs. Divergência não é intrinsecamente inválida; requer avaliação para evitar informações comerciais contraditórias.
- **JSON-LD**: blocos com sintaxe parseável na inspeção estática anterior (Gate 01). Este teste identificou tipos de schema presentes, **não** certificou propriedades obrigatórias/recomendadas pelo Schema.org/Google nem correspondência FAQ com elementos efetivamente visíveis.
- **Governança Git**: comparação live `main` vs branch encontrou `diverged`, **63 commits à frente / 46 atrás** no momento da consulta. Rebase/merge via processo SFJM e reexecução de QA são exigidos antes do merge, sem sobrescrever alterações integradas.

## Matriz URL por URL
Marcação `R` = requer revisão; `C` = correção objetiva aplicada; `—` = nenhum achado relevante neste gate. Todas têm heading-order sem salto detectado e `og:url` coerente.

| URL (relativa à origem www.moretegra.com.br) | Resultado Gate 02 | Próxima verificação |
|---|---|---|
| `/blog/bairros-sao-paulo/lapa-vila-anastacio-como-escolher/` | R | Twitter tags ausentes; OG description editorial distinta; ALT |
| `/complexo-lapa-pirituba/acessos-trajetos/` | R | `twitter:card` ausente, ALT genérico |
| `/complexo-lapa-pirituba/` | R | OG description editorial distinta; ALT |
| `/complexo-lapa-pirituba/projeto/` | R | `twitter:card` ausente, ALT genérico |
| `/empreendimentos/ampere-brooklin/` | R | ALT «Tegra» e imagem decorativa; validação semântica schema |
| `/empreendimentos/ayla-moema-studio-office/` | R | Twitter específicos ausentes; WebPage.name/description históricos |
| `/empreendimentos/bem-moema-studios-offices/` | R | WebPage.name histórico difere de title; conferir semântica |
| `/empreendimentos/caminhos-da-lapa-elo-duo/` | R | OG description e WebPage.description diferentes; confirmar conteúdo |
| `/empreendimentos/claris-casa-e-clube/` | C + R | OG description 254→126; WebPage.name/description históricos |
| `/empreendimentos/claris-rosas/` | C + R | OG description 272→157; WebPage.name/description históricos |
| `/empreendimentos/dsg-itaim/` | R | OG e WebPage descriptions editoriais distintas; HTML contém apenas H1/H2 |
| `/empreendimentos/gaea-home-resort/` | C + R | OG description 251→125; WebPage.name/description históricos |
| `/empreendimentos/gran-thai-leisure-residence/` | C + R | OG description 281→130; verificar ALT aparentemente truncado |
| `/empreendimentos/jerivas-caminhos-da-lapa/` | R | OG description e WebPage.name históricos; ALT |
| `/empreendimentos/key-moema/` | R | Twitter específicos ausentes; ALT genérico |
| `/empreendimentos/kronos-by-tegra/` | C + R | OG description 237→140; WebPage.name/description históricos |
| `/empreendimentos/singular-private-residence/` | C + R | OG description 228→127; WebPage.name/description históricos |
| `/empreendimentos/tiel-vila-nova-conceicao/` | R | OG description distinta; ALT «Tegra» |
| `/investimentos/studios-e-salas-comerciais/` | R | Twitter específicos ausentes; OG e schema descriptions distintas |
| `/regioes/higienopolis/` | R | OG e schema descriptions distintas; ALT genérico |
| `/rio-de-janeiro/` | R | `twitter:card` ausente; OG/Schema titles e descriptions distintos; `noindex` preservar |

## Decisão
**Gate 02: NO GO para merge**. Seis problemas objetivos de comprimento de OG description corrigidos; permanecem verificações editoriais por URL, classificação de `noindex`, certificação de JSON-LD/FAQ, testes RESF e reconciliação Git com `main`. Nenhuma mudança em produção.
