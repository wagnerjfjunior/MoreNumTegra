# MoreNumTegra — Hierarquia H1/H2/H3, links de bairro e bloco de fontes: handoff (2026-11-15)

Status: **ESTADO + DECISÕES + PENDÊNCIAS + PROMPT**. Nenhum código foi alterado por este documento.
Autoridade: Wagner (proprietário). Redação, código e auditoria: Claude. Volume de copy: ChatGPT (sempre auditado pelo Claude).
`main` verificada ao vivo (`git ls-remote`) no momento da escrita: `0867ba67786f90116b1274b337633425ce123b18`.

Leitura obrigatória antes de executar qualquer item: este documento, `docs/sfjm/HANDOFF.md`, `docs/frameworks/resf/v1/RESF_CONVERSION_GUARDRAILS_2026-11-09.md`.

---

## 1. Estado verificado

| Item | Estado |
|---|---|
| PR #578 — módulo `#mais-no-bairro` em 13 páginas de produto | **mesclado** |
| PR #579 — H1 estratégicos (DSG Itaim, Soma, ODE, Ayla, Chez Vous, Key, Viso, Studios Berrini, TEG Sacomã, Universo Tatuapé) | **mesclado** |
| PR #580 — H1 estático do shell do DSG Itaim | **mesclado** |
| PR #581 — módulo de links em Aria, Mozae, Ledge, Ampère, Ypy + novo H1 do Ampère + exceções exatas nos validadores | **aberto, rascunho, `mergeable_state: clean`**. Aguarda "pode mergear" explícito do Wagner. |
| Inventário de 83 URLs com 1.442 títulos | planilha "Mestre de títulos H1/H2/H3 — MoreTegra SP" (Sheets, no projeto Claude). Coluna "Título proposto" é a **primeira passada mecânica e está RETIRADA**; deve ser reescrita copy-first. |

Depois do merge do #581 (só com OK do Wagner): IndexNow para aria, mozae, ledge, ampere, ypy; no Search Console, priorizar Aria, Ledge e Ampère.

## 2. Evidência que governa as decisões

- O volume de busca está no **nome do projeto** e em "apartamentos <bairro>", não em "<nome> tegra" (10 a 110 buscas/mês). Não tratar "Nome Tegra" como centro da palavra-chave.
- Search Console: páginas em posições 6 a 20 com poucos cliques. O ganho está em título, resposta direta e links internos.
- Ilhas de links: páginas de produto tinham 1 a 3 links internos. Resolvido pelo módulo `#mais-no-bairro` (gerador idempotente `scripts/add-neighborhood-links-module.py`).

## 3. Padrão de títulos (decidido em 15/11/2026)

1. **H1** curto, 2 linhas no máximo: nome do projeto + um fato que decide (metragem, tipologia, bairro). Sem redundância ("ODE Perdizes / Perdizes" foi rejeitado).
2. **H2 responde a pergunta do comprador daquela seção**, com um fato publicado na própria página. Nome ou bairro entra só onde a frase pede; teto de 65% dos H2 com nome/bairro.
3. **Pergunta e resposta, para servir de referência a IA (decisão do Wagner):** onde a seção for naturalmente uma dúvida, o H2 é a pergunta ("Quais áreas de lazer o Soma Perdizes tem?") e o **primeiro parágrafo logo abaixo é a resposta direta**, em 1 a 3 frases, com o fato concreto. Onde o H2 afirmativo já é bom, não trocar. Toda pergunta/resposta que também estiver no FAQ precisa de paridade com o JSON-LD `FAQPage`.
4. **H3 de planta** traz tipo + metragem + fato de decisão ("Apartamento de 41 m² · 1 dormitório").
5. Nunca inventar preço, metragem, endereço, data ou métrica: só o que já está publicado na página ou na fonte oficial.
6. Sem clichês ("imagine viver", "mergulhe", "sinfonia de"). Posicionar por exclusividade e estilo de vida.

Exemplo aprovado em princípio, ainda **não aplicado**, Soma Perdizes: "Quem assina o Soma Perdizes." · "O Soma Perdizes em seis perspectivas oficiais." · "Plantas do Soma Perdizes: de 25 a 66 m²." · H3 "Apartamento de 41 m² · 1 dormitório" / "Apartamento de 45 m² · 1 dormitório" / "Studio de 25 m²" · "Compare o Soma com o ODE Perdizes." Os demais H2 permanecem.

## 4. Nova frente: referência de fontes e créditos no rodapé

Pedido do Wagner: hoje não há indicação de onde cada informação vem; avaliar um bloco de fontes e o crédito das imagens à Tegra Vendas.

**Estado atual do rodapé (Soma e ODE, lido no HTML):** há aviso genérico ("Imagens, perspectivas, preços e condições podem ser atualizados sem aviso prévio…" e "confirmadas com a equipe Tegra Vendas"). **Não há** bloco de fontes, não há crédito de imagem, não há data de última conferência.

**Recomendação do Claude: vale a pena, em duas camadas.**

- **Camada A, visível e curta, no rodapé (quase sem risco):** "Fontes e créditos" com (1) o que vem da incorporadora (memorial, plantas, metragens), (2) "Imagens e perspectivas: material de divulgação oficial do empreendimento, disponibilizado pela Tegra Vendas" **somente depois de o Wagner confirmar que é verdade**, (3) data de "última conferência de preços e condições", (4) link para a página oficial do empreendimento na Tegra. Ajuda o leitor, reforça E-E-A-T e dá a IAs uma origem citável.
- **Camada B, no JSON-LD:** `isBasedOn`/`citation`/`publisher` e `dateModified` coerentes com o texto visível. Altera JSON-LD, então exige o mesmo tratamento de exceção exata nos validadores postais.

**Riscos e verificações antes de escrever (nada disso foi verificado nesta conversa):**
1. **Autorização das imagens:** o Wagner precisa obter da Tegra Vendas/Tegra a confirmação por escrito de que o corretor pode usar o material e qual texto de crédito eles pedem. Sem isso, não afirmar "autorizadas por".
2. **Obrigações publicitárias do setor imobiliário:** confirmar com a incorporadora/jurídico se a peça precisa exibir número de registro da incorporação e CRECI. Sugestão: perguntar à Tegra Vendas qual é o rodapé legal padrão deles e replicar.
3. **Imagens sem origem comprovada:** fazer inventário por página; imagem de origem desconhecida sai ou ganha origem.
4. Páginas travadas (Garden Design, Nova Vivere, Reserva, Château Jardin, Jerivás, e as de exceção exata) exigem a mesma estratégia de desbloqueio já usada no #581.

Implementação sugerida: um componente de rodapé único, gerado por script idempotente (mesmo padrão do módulo de bairro), em PR separado do de títulos.

## 5. Pendências (ordem sugerida)

1. Wagner: "pode mergear" do #581 (rechecar CI antes). Depois IndexNow + Search Console.
2. Wagner: confirmar o padrão da seção 3 (incluindo H2 em pergunta + resposta direta).
3. Claude: reescrever a coluna "Título proposto" **copy-first**, página a página, do Lote 1 (livres), lendo o conteúdo real de cada página. Abrir PR em rascunho, com paridade HTML ↔ JSON-LD e `cmp3.sh` contra o baseline.
4. Decisão do Wagner: H2 que são só preço ("R$ 630.000", "R$ 2.090.000", "R$ 3.990.700") ficam como estão ou ganham o nome do projeto.
5. Lote 2 (exceção exata, ex.: par Bem Moema) e Lote 3 (congeladas, e troca Sabrina → Time Tegra Vendas nas travadas).
6. Frente "fontes e créditos" (seção 4), depois de o Wagner trazer a posição da Tegra Vendas.
7. Blog, hubs e home (fase 2: definir a palavra-chave de cada post). Rio fora do foco.
8. Medição: marco em 15/11/2026; comparar 28 dias de Search Console. Bing Webmaster por volta de 18/11.
9. Topo do funil (portal neutro por bairro com API Órulo, domínio próprio): não iniciado.
10. Opcional: aposentar validadores obsoletos (`test-riio-gallery` precisa de jsdom; `validate-home-consent-desktop-width` com guarda de PR antigo; `validate-mercado-editorial` com guarda de migrations). Três falhas locais pré-existentes, não causadas por esta frente.

## 6. Mecânica de validação (para não redescobrir)

- Travas: `validate-resf-html-regression.mjs` (snapshots completos por slug aprovado) e `validate-resf-v2-postal-address-contract.mjs` (grafo JSON-LD congelado + guardas de arquivo inteiro). Padrão de desbloqueio = **exceção exata**: o validador remove somente o bloco/CSS/H1 aprovado e exige igualdade com o snapshot. Teste negativo obrigatório depois de cada exceção.
- Ampère: dois validadores próprios afirmam o H1; trocar H1 exige atualizar os dois.
- DSG Itaim e Capiitolo são shells que buscam `experiments/<slug>-editorial-v3/index.html`: os títulos vivem no arquivo de experimento; o shell do DSG tem H1 estático que precisa coincidir.
- Ferramentas de inventário (`build.py`, `plan.py`, `extra.py`, `mkxlsx.py`) estavam no sandbox da conversa e **podem não existir** na próxima; a planilha é a fonte persistente. Se precisar, reconstruir a extração de títulos a partir do HTML.
- GitHub só via REST (`gh api`). Rascunho → pronto: `POST /pulls/{n}/ccr/ready_for_review`. Merge: `PUT /pulls/{n}/merge -f merge_method=merge`, só com ordem do Wagner. Main real: `git ls-remote origin refs/heads/main`.

---

## PROMPT PARA COLAR EM NOVA CONVERSA

Continuamos o projeto **Imobiliário — Sites Tegra e Cyrela**, repositório `wagnerjfjunior/MoreNumTegra` (site moretegra.com.br), sob governança **SFJM**. Eu sou o Wagner, corretor, não desenvolvedor: explique em linguagem simples, entregue passos executáveis, análise detalhada e baseada em fatos, nunca superficial. Não invente preço, metragem, endereço, data ou métrica.

**Primeiro, obrigatoriamente:**
1. Resolver a `main` ao vivo (`git ls-remote origin refs/heads/main`) e checar o estado dos PRs #581 e seguintes. Não afirmar estado sem consultar.
2. Ler `docs/sfjm/MNT_SEO_H1_H2H3_FONTES_HANDOFF_2026-11-15.md` inteiro, depois `docs/sfjm/HANDOFF.md` e `docs/frameworks/resf/v1/RESF_CONVERSION_GUARDRAILS_2026-11-09.md`.
3. Abrir a planilha "Mestre de títulos H1/H2/H3 — MoreTegra SP" (83 URLs, 1.442 títulos) no projeto. A coluna "Título proposto" é uma primeira passada mecânica **retirada**; precisa ser reescrita.

**Regras fixas:** mudanças só por branch e PR, nunca na `main`. Merge, deploy, publicação e gasto em mídia só com minha aprovação explícita. Copy humanizada, sem clichês de IA, posicionada em exclusividade e estilo de vida. Sem PBN nem compra de links. GPT faz volume, Claude audita antes de entrar no site.

**Onde paramos:** H1 estratégicos mesclados (#579, #580); módulo de links de bairro mesclado (#578); o PR #581 (Aria, Mozae, Ledge, Ampère, Ypy) está em rascunho e **aguarda meu OK de merge**. O padrão de títulos está na seção 3 do handoff: H2 que responde a pergunta do comprador com fato publicado, pergunta + resposta direta onde fizer sentido (para servir de referência a IA), H3 de planta com tipo, metragem e fato de decisão, teto de 65% de H2 com nome/bairro.

**Tarefas desta conversa, nesta ordem:**
1. Rechecar o CI do #581 e me pedir o OK de merge; depois IndexNow e prioridades do Search Console.
2. Reescrever os títulos H2/H3 do Lote 1 (páginas livres) **copy-first**, lendo o conteúdo real de cada página, mantendo paridade HTML ↔ JSON-LD, rodando os validadores contra o baseline; abrir PR em rascunho e me mostrar antes e depois.
3. Frente nova **"Fontes e créditos" no rodapé** (seção 4 do handoff): propor o texto e o componente, mas só afirmar que as imagens são da Tegra Vendas depois que eu confirmar a autorização. Perguntar-me o que for preciso para obter isso da Tegra Vendas, incluindo o rodapé legal padrão (registro de incorporação, CRECI).

Comece apresentando um diagnóstico executivo curto do estado verificado e execute a tarefa 1; depois siga para a 2.

## FIM DO PROMPT
