# SFJM — Time Tegra Vendas, DSG Itaim e limpeza dos checks da base (14–15/11/2026)

Estado: registro da sessão. Autoria das decisões: Wagner. Execução: Claude.

## O que foi para a `main`

| PR | Conteúdo | Merge | `main` antes |
|---|---|---|---|
| #573 | Links internos no HTML da home; títulos de bairro sem nome de empreendimento; âncoras com o nome do empreendimento | `f7b99f2` | `1182b53` |
| #574 | Seção/botões da "Sabrina da Tegra" viram "Time Tegra Vendas" nas páginas de SP (63 páginas) | `830b39e` | `f7b99f2` |
| #575 | DSG Itaim: título e descrições por produto e local, sem "últimas unidades"; corrige linha "EM CONSTRUÇÃO" copiada do Capiitolo | `f026ddd` | `830b39e` |

Rollback: `git revert -m 1 <merge>` na ordem inversa (#575, #574, #573). A tag de rollback não pôde ser criada (escrita de tags bloqueada na sessão); o marco é o SHA `1182b53`.

## Regras do Wagner confirmadas (valem daqui para frente)

1. **Nunca publicar disponibilidade nem unidades vivas.** O espelho de vendas é informação interna. Nenhuma página recebe "últimas unidades", unidade específica ou lista de disponíveis. A unidade de referência da seção de preço do DSG e o FAQ por tipologia ficam como estão (decisão explícita de 15/11).
2. **Leitura do espelho de vendas (PDF Tegra Vendas): azul = já vendida; branca = disponível.**
3. **Endereço exato só no rodapé.** `validate-commercial-page-standard` barra endereço fora do rodapé; por isso buscas por endereço (ex.: "joaquim floriano 152") não são atendidas no corpo.
4. Capiitolo e DSG: manter o formato de UX atual; ajustar palavras-chave e texto.
5. Decisões de SEO com dados reais: Search Console + OpenSEO, não palpite.

## Páginas travadas por validador (não editar sem autorização)

Comparadas byte a byte com versões aprovadas, ou com paridade FAQ/JSON-LD:
- Congeladas por `validate-resf-html-regression`: aria-higienopolis, chateau-jardin, garden-design, ledge-brooklin, mozae-higienopolis, nova-vivere, reserva-caminhos-da-lapa.
- Travadas por `validate-resf-v2-postal-address-contract` / `validate-bem-moema-orbita-graph-parity`: ampere-brooklin (snapshot `ffe7dd2`), bem-moema, bem-moema-studios-offices, ypy-alto-do-ipiranga.
- Paridade FAQ/JSON-LD: bueno-brandao-257 (resposta do FAQ) e universo-tatuape-orbita (pergunta do FAQ).
- Jerivás Caminhos da Lapa (exceção E2) não foi tocada.
Essas páginas ainda citam "Sabrina da Tegra" onde o #574 não pôde alterar.

## Lições técnicas

- Clone raso engana: validadores que usam `git show <SHA>` falham ou passam por motivo errado. Buscar os SHAs fixados (`git fetch --depth=1 origin <sha>`) antes de validar. Só o CI roda tudo de verdade.
- `postal`, `schema-parity` e `draft-quality` só rodam quando o PR toca `empreendimentos/**` ou blog; por isso aparecem como "novos" em PRs grandes mesmo quando a causa vem da `main`.
- A página de empreendimento publicada é um shell estático (bootstrap) que carrega `experiments/<slug>-editorial-v3/index.html` em runtime. Mudança de metadados vai nos dois arquivos.
- `vercel.json` na `main` já difere do baseline `bbe59c7` em redirecionamentos; `validate-mercado-editorial-20261028` depende disso (ver abaixo).

## Checks vermelhos da base e o que foi feito

| Check | Causa | Estado |
|---|---|---|
| favicon | 6 páginas internas do Complexo Lapa–Pirituba (noindex) sem os 5 ícones | **Corrigido** neste PR de limpeza |
| postal | Key Moema: `WebPage.description` do JSON-LD mudou editorialmente após o baseline | **Corrigido** com exceção exata no validador (autorizado) |
| images | Sitemap tem 2 URLs do Rio (`/rio-de-janeiro/regioes/`, `.../oeste/barra-da-tijuca/`) fora da lista de exceções | Lista de exceções atualizada (autorizado). **Continua vermelho** por asserções mais profundas desatualizadas (ver pendências) |
| draft-quality | `validate-mercado-editorial-20261028` compara `vercel.json.redirects` com o baseline `bbe59c7`, que já divergia na `main` | **Pendente** |

## Pendências abertas

1. `validate-two-images-39-pages`: depois do contrato de URLs, ainda falha em (a) "Complexo requires 3 scenario controls" — a capa do Complexo não tem mais `data-open-sim="N"` estático no HTML (o script ainda os referencia; confirmar se os botões existem de verdade na capa única); (b) `releasedDecor` inclui o post do Rio `casa-condominio-layout-claris-barra` sem `Person` no JSON-LD. Pedem decisão do Wagner sobre o contrato do Rio/Complexo.
2. `validate-mercado-editorial-20261028` ("Do not add migrations before individual publication approval"): decidir se o baseline passa a ser o `vercel.json` atual.
3. Trocar a Sabrina nas páginas travadas (lista acima) depende de autorização para atualizar as versões de referência.
4. Lote de SEO: bloco "Outros Tegra no bairro" nas 34 páginas de empreendimento; âncoras do Rio (gerador `build-rj-regioes-pages.py`); post "Lapa e Vila Anastácio" (gate editorial).
5. Medição: planilha "Medição SEO — Time Tegra Vendas e links internos (base 14/11/2026)" no Claude; comparar Search Console 28 dias antes/depois.
6. Reenviar o sitemap no Search Console e conferir as páginas no celular (home, `/regioes/moema/`, studios e salas, uma página de empreendimento e um artigo do blog).
