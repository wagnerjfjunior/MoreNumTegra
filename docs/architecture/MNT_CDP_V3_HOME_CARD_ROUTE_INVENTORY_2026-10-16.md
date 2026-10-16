# CDP V3 — Inventário inicial de cards e rotas da Home

Data: 2026-10-16
Estado: READ_ONLY / SOURCE_CODE_OBSERVED / NÃO É HOMOLOGAÇÃO COMERCIAL
Origem: `src-greenn/moretegra.js` na main `d33e6d68eefe0ae32f0ea4693b8192281a6cc679`; árvore GitHub da mesma referência.

## Cobertura

- **23 objetos de card** observados no array `PROJECTS` da Home.
- **25 arquivos** `src-greenn/empreendimentos/*/index.html` observados na árvore, incluindo páginas que podem não estar representadas na Home.
- Resolução de destino: `detailUrl` explícito, senão `DETAIL_ROUTES[projectName || name]`; `NÃO RESOLVIDA` requer análise da lógica de fallback antes de inferir navegação.
- A coluna 'arquivo de destino' compara caminho com arquivo de página no repositório; **não** comprova status HTTP, canonical ou publicação.
- Valores monetários são **literais históricos do código**, não cotação vigente. `cashOffer` sinaliza condição à vista, não comprova desconto promocional.

## Inventário por card

| # | Card Home | Projeto apresentado | Marcador comercial | Preço literal (R$) | Destino resolvido no inventário | Arquivo de destino |
| --- | --- | --- | --- | ---: | --- | --- |
| 1 | Nova Vivere \| 72 m² | Nova Vivere | Outra/não indicada | 852586.08 | /empreendimentos/nova-vivere/ | SIM |
| 2 | Château Jardin | Château Jardin | Outra/não indicada | 3690361 | /empreendimentos/chateau-jardin/ | SIM |
| 3 | Caminhos da Lapa Elo Duo | Caminhos da Lapa Elo Duo | Outra/não indicada | 690000 | /empreendimentos/caminhos-da-lapa-elo-duo/ | SIM |
| 4 | Garden Design | Garden Design | Outra/não indicada | 673050 | /empreendimentos/garden-design/ | SIM |
| 5 | Ampère Brooklin | Ampère Brooklin | Outra/não indicada | 4770000 | /empreendimentos/ampere-brooklin/ | SIM |
| 6 | Mozae Higienópolis | Mozae Higienópolis | Outra/não indicada | 721510 | /empreendimentos/mozae-higienopolis/ | SIM |
| 7 | Universo Tatuapé Órbita | Universo Tatuapé Órbita | Outra/não indicada | 611685 | /empreendimentos/universo-tatuape-orbita/ | SIM |
| 8 | Ária Higienópolis | Ária Higienópolis | Outra/não indicada | 501000 | /empreendimentos/aria-higienopolis/ | SIM |
| 9 | Bem Moema | Bem Moema | Outra/não indicada | 1811200 | /empreendimentos/bem-moema/ | SIM |
| 10 | Bem Moema Studios & Offices | Bem Moema Studios & Offices | Outra/não indicada | 509600 | /empreendimentos/bem-moema-studios-offices/ | SIM |
| 11 | Nova Vivere \| 105 m² | Nova Vivere | À vista | 1129900 | /empreendimentos/nova-vivere/ | SIM |
| 12 | Soma Perdizes | Soma Perdizes | Outra/não indicada | 630000 | /empreendimentos/soma-perdizes/ | SIM |
| 13 | Zahle Jardins | Zahle Jardins | Outra/não indicada | sob consulta | /empreendimentos/zahle-jardins/ | SIM |
| 14 | Bueno Brandão 257 | Bueno Brandão 257 | Outra/não indicada | 21750000 | /empreendimentos/bueno-brandao-257/ | SIM |
| 15 | CAPIITOLO by Piero Lissoni | CAPIITOLO by Piero Lissoni | Outra/não indicada | 3647490 | /empreendimentos/capiitolo-piero-lissoni/ | SIM |
| 16 | DSG Itaim | DSG Itaim | Outra/não indicada | sob consulta | /empreendimentos/dsg-itaim/ | SIM |
| 17 | Ledge Brooklin | Ledge Brooklin | Outra/não indicada | 600000 | /empreendimentos/ledge-brooklin/ | SIM |
| 18 | TEG Sacomã | TEG Sacomã | Outra/não indicada | 390000 | /empreendimentos/teg-sacoma/ | SIM |
| 19 | CAPIITOLO by Piero Lissoni \| à vista | CAPIITOLO by Piero Lissoni | À vista | 3160000 | /empreendimentos/capiitolo-piero-lissoni/ | SIM |
| 20 | Tièl Vila Nova Conceição | Tièl Vila Nova Conceição | Outra/não indicada | 598500 | /empreendimentos/tiel-vila-nova-conceicao/ | SIM |
| 21 | YPY Alto do Ipiranga | YPY Alto do Ipiranga | Outra/não indicada | 727650 | /empreendimentos/ypy-alto-do-ipiranga/ | SIM |
| 22 | ODE Perdizes | ODE Perdizes | Outra/não indicada | 2090000 | /empreendimentos/ode-perdizes/ | SIM |
| 23 | Reserva Caminhos da Lapa | Reserva Caminhos da Lapa | Outra/não indicada | sob consulta | /empreendimentos/reserva-caminhos-da-lapa/ | SIM |

## Regras para a reconciliação

1. Não atribuir `projectId`, `offerId`, `cardId` ou `pageId` definitivos por heurística; consultar o registro canônico e os fact packs.
2. Reconciliar ofertas da mesma unidade com condições distintas (ex.: CAPIITOLO unidade 24 convencional/à vista) sem sobrescrever uma pela outra.
3. Permitir múltiplas páginas para um mesmo empreendimento, e múltiplas ofertas por página; cada card terá destino explícito após validação.
4. Inventariar páginas fora da Home e páginas compartilhadas antes de alterar roteamento.
5. Preservar preço, nota, `promo`, `cashOffer`, CTA, SEO e Form46 existentes; esta etapa é documental.

## Próximo gate

Auditar a lógica efetiva de clique e fallback, os 25 documentos de página e o registry de IDs; produzir matriz `cardId → projectId → offerId → pageId → canonical URL` com lacunas marcadas, sem publicar preços nem criar URLs fictícias.
