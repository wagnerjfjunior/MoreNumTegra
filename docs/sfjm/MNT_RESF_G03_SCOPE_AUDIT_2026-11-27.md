# RESF — Grupo 03 | escopo e auditoria estática inicial

Data: 27/11/2026. Repositório canônico: `wagnerjfjunior/MoreNumTegra`.
Base verificada: `main` em `33f46b3f1403cc49237da745907f986f3b711d90` (merge PR #673).
Estado: **G03_SCOPE_PROPOSED / STATIC_AUDIT_INITIAL / NO_RUNTIME_CHANGE / NO_RELEASE**.

## Premissas

- Continuidade do programa G01/G02 RESF; este documento não reabre páginas já tratadas.
- Sitemap do `main` consultado em 27/11/2026: seleção de 10 URLs canônicas em `/empreendimentos/` (São Paulo), fora dos dez itens G01 e dos dez itens G02.
- A seleção é operacional, **não é uma medição GSC nem comprovação de indexação**.
- A existência da PR #673 MERGED comprova apenas a revisão nela descrita. Em 27/11, PRs G02 #674 (perfil comercial Product/Offer) e #664 (Kronos RJ) ainda estavam **OPEN**. Não declarar fechamento integral G02.
- Produção/alias Vercel, CRM e teste externo das dez URLs G03 não foram verificados por esta auditoria. O SHA é do GitHub `main`, não uma confirmação do deploy.
- Preservar governança de `bootstrap/BOOTSTRAP_CANONICO.md`, `handoffs/CURRENT.md`, `docs/PROJECT_STATUS.md`, `docs/NEXT_SAFE_ACTION.md`, `docs/BLOCKED_ACTIONS.md` e `docs/baseline/TECHNICAL_BASELINE_V2_3.md`.

## Dez URLs candidatas do Grupo 03 — evidência apenas de HTML no main

| # | URL | JSON-LD script | Product | Offer | Ref. WebMCP direta no arquivo | `hero-meta` identificado |
|---:|---|---:|---:|---:|---|---|
| 1 | https://www.moretegra.com.br/empreendimentos/ledge-brooklin/ | 1 | 0 | 0 | não | sim |
| 2 | https://www.moretegra.com.br/empreendimentos/studios-berrini/ | 1 | 0 | 0 | não | não |
| 3 | https://www.moretegra.com.br/empreendimentos/soma-perdizes/ | 1 | 1 | 1 | não | não |
| 4 | https://www.moretegra.com.br/empreendimentos/zahle-jardins/ | 1 | 0 | 0 | não | sim |
| 5 | https://www.moretegra.com.br/empreendimentos/bueno-brandao-257/ | 1 | 2 | 2 | não | não |
| 6 | https://www.moretegra.com.br/empreendimentos/chateau-jardin/ | 1 | 0 | 0 | não | sim |
| 7 | https://www.moretegra.com.br/empreendimentos/jerivas-caminhos-da-lapa/ | 1 | 0 | 0 | não | não |
| 8 | https://www.moretegra.com.br/empreendimentos/chez-vous-moema/ | 1 | 0 | 0 | não | sim |
| 9 | https://www.moretegra.com.br/empreendimentos/key-moema/ | 1 | 0 | 0 | não | sim |
| 10 | https://www.moretegra.com.br/empreendimentos/ayla-moema-studio-office/ | 1 | 0 | 0 | não | sim |

`Product`, `Offer` e `hero-meta` indicam correspondência textual direta no HTML-fonte, não o grafo resultante após runtime. `JSON-LD script` é contagem de tags, não contagem de entidades Schema.org. A ausência de referência WebMCP direta no HTML **não prova** ausência das ferramentas no navegador (scripts externos ou runtime podem registrar ferramentas). A verificação estática de `form_id`/identidade comercial não comprova postagem real nem 29 opções no seletor internacional.

## Matriz de execução proposta — não autorizada para merge por esta documentação

**Sublote G03-A — comercial/atribuição (4 URLs):** Soma Perdizes, Bueno Brandão 257, Jerivás Caminhos da Lapa, Ledge Brooklin.

**Sublote G03-B — ficha e apresentação (3 URLs):** Studios Berrini, Zahle Jardins, Château Jardin.

**Sublote G03-C — Moema (3 URLs):** Chez Vous Moema, Key Moema, Ayla Moema Studio & Office.

## Contratos para qualquer alteração posterior

1. Confirmar o `main` e a PR G02 #674 mais recente antes de editar, evitando concorrência com código compartilhado.
2. Capturar baseline da URL efetivamente renderizada (HTTP, canonical, robots, Schema.org, Rich Results, PSI mobile, WebMCP, formulário, galeria, facts, WhatsApp, consentimento) e registrar **não testado** quando não houver evidência.
3. Reutilizar V7 (performance), Ampère (facts e perfil comercial), Órbita (galeria e WebMCP), Mozae (formulário e Phone 29 opções), G01/G02 (JSON-LD), sem transplantar dados comerciais.
4. Todos os SP mantêm Form46; não alterar `tenant_id`, `form_id`, endpoint, consentimento, eventos/PII, identidade comercial ou atribuição sem autorização exata.
5. **Não adicionar Product/Offer** a páginas que não possuam preço/unidade/condição comercial vigentes comprovados. Não inventar preço, metragem, estoque, endereço, vagas nem LocalBusiness. Não apagar ofertas válidas sem verificação.
6. Proteger páginas congeladas e validadores: verificar snapshots e testes negativos por sublote. `hero-meta` pode exigir reconciliação com facts, mas não deve ser removido mecanicamente.
7. Aplicar HTML/CSS/JS portáveis, performance/mobile primeiro, sem reconstrução/framework, alteração global de infraestrutura ou upload pesado no GitHub.
8. Cada alteração: branch e PR própria; CI e Preview; teste funcional CRM sem leads reais acidentais, LGPD e Search; homologação/merge somente com a autorização aplicável; depois verificar Production READY, alias, indexabilidade e medições. IndexNow/GSC apenas após release e sem confundir submissão com indexação.
9. Grupo 04 pode avaliar separadamente cinco projetos RJ ainda fora G01/G02 e os hubs, se o sitemap e negócio justificarem; **não** misturar Form47 RJ neste lote de páginas SP.

## Próximo passo seguro

Antes de código: refinar por URL as lacunas com evidência do DOM final e comportamento mobile, confirmar contratos de oferta/consulta com fonte e separar patches mínimos por sublote. Esta PR cria somente este diagnóstico documental; **nenhum HTML/JS/CSS, validador, formulário, SEO, CRM, deploy ou indexação foi modificado ou executado**.
