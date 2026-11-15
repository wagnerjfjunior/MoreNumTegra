# SEO — links internos no HTML e títulos de bairro (Frentes 1 e 2, lote 1)

Data: 14/11/2026 · Base: `main` `1182b53fc28f2d023f7c5f157a8d39aace6f8b73` · Estado: PR em rascunho, sem merge.

Autorização do Wagner (chat, 14/11/2026): "Autorizado" para abrir o primeiro PR das Frentes 1 e 2, em branch, sem merge. Escopo declarado: modelo da home, âncoras, títulos e H1 de bairros. Sem tocar em formulário nem em medição.

## Por quê

Diagnóstico de 14/11/2026 (Search Console 05/10–11/11, leitura do HTML das 83 URLs do sitemap, rastreador OpenSEO de 11/11):

- A home entregava 3 links internos no HTML (/regioes/, /regioes/lapa/, /regioes/higienopolis/). Os cartões de empreendimento são montados por `moretegra.js`.
- 22 de 34 páginas de empreendimento recebiam 2 links internos ou menos, quase sempre com a âncora "Conhecer empreendimento".
- Em 7 buscas o rastreador mostrou a URL errada. Exemplos: "ode perdizes" e "soma perdizes" → /regioes/perdizes/. Os títulos de bairro levavam o nome dos empreendimentos ("Apartamentos em Perdizes | Soma e ODE Tegra").

## O que mudou

1. `src-greenn/preview/index.html`: o bloco "Empreendimentos Tegra em São Paulo por região" passa a listar, em HTML, os 13 bairros e 26 empreendimentos de São Paulo já presentes no catálogo da home. Nenhum link, nome ou dado do Rio.
2. `src-greenn/moretegra.css`: estilo da lista (`.mt-zone-links`).
3. 11 páginas de `/regioes/`: título (title, og:title, twitter:title e `name` no JSON-LD) e H1 sem nome de empreendimento, com "Tegra" junto do bairro e preposição correta. Lapa e Itaim Bibi ficaram com o título atual.
4. 12 páginas de `/regioes/` e `/investimentos/studios-e-salas-comerciais/`: "Conhecer empreendimento" e "Ver empreendimento" passam a levar o nome do empreendimento (38 âncoras).

## Fora deste lote

- Rodapé global e bloco "Outros Tegra no bairro" nas 34 páginas de empreendimento: dependem do padrão de rodapé comercial e tocam todas as páginas; vão em PR próprio.
- Post "Lapa e Vila Anastácio": o título não foi alterado. O texto é sobre o Caminhos da Lapa; trocar só o título desalinharia título e conteúdo, e a redação está sob gate editorial.
- Páginas do Rio: geradas por `scripts/build-rj-regioes-pages.py`; âncoras ficam para um lote que altere o gerador.
- Título de /regioes/itaim-bibi/: aguarda confirmação do que está à venda no DSG Itaim.
- Meta descriptions, corpo dos textos, sitemap, formulário, medição, JSON-LD comercial: sem alteração.

## Validação local

46 scripts `validate-*`/`test-*` executados antes e depois na mesma máquina: 35 PASS e 11 FAIL nos dois casos, com saída idêntica (as 11 falhas já ocorrem na `main` neste ambiente). Nenhum validador novo falhou. Não houve teste visual em navegador nem em celular.

## Como medir depois do merge

No rastreador, a URL ranqueada para "ode perdizes", "soma perdizes" e "capitolo chacara klabin" deve passar a ser a página do empreendimento. Reavaliar 4 semanas após a publicação.
