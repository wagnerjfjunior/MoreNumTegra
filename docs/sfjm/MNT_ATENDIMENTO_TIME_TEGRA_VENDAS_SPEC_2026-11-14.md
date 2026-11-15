# Especificação — atendimento institucional "Time Tegra Vendas" (São Paulo)

Data: 14/11/2026 · Estado: **especificação aprovada para execução; nenhuma página alterada ainda.**
Branch de trabalho: `seo/atendimento-time-tegra-vendas-20261114` (criada sobre a branch do PR #573).

Este arquivo é a instrução completa para quem for executar. Leia inteiro antes de editar qualquer página.

## 1. O que o Wagner pediu (chat, 14/11/2026)

Substituir, em todas as páginas e artigos de São Paulo, a seção da Sabrina da Tegra e os botões "Fale com Sabrina da Tegra" por um atendimento institucional e padronizado, ligado ao **Time Tegra Vendas**, com chamada do tipo "fale com especialista agora mesmo". A copy deve ser persuasiva e humanizada.

Motivo do cuidado: as páginas **não podem perder volume de texto**. A seção sai, outra do mesmo tamanho ou maior entra no lugar.

## 2. Decisões já tomadas pelo Wagner (não reabrir)

| # | Decisão | Fonte |
| --- | --- | --- |
| D1 | **Rodapé não muda.** Continua com Sabrina da Tegra, CRECI-SP 209.905-F, telefone, endereço do empreendimento e link do perfil oficial. | Resposta do Wagner, 14/11 |
| D2 | **JSON-LD não muda.** Nenhum `<script type="application/ld+json">` é editado. | Resposta do Wagner, 14/11 |
| D3 | **Nome e CRECI ficam só na linha legal do rodapé.** No corpo da página a identidade passa a ser Time Tegra Vendas. | Resposta do Wagner, 14/11 |
| D4 | **Mesmo WhatsApp (11) 96077-9328 e mesmo formulário 46.** Só o texto muda. Nada em CRM, medição, consentimento ou destino do lead. | Resposta do Wagner, 14/11 |
| D5 | **A frase do estande fica com o nome.** Toda frase que orienta o visitante a pedir a Sabrina ao chegar ao estande é preservada como está. É o que garante a atribuição da visita. | Resposta do Wagner, 14/11 |

## 3. O que nunca tocar

1. Qualquer conteúdo dentro de `<footer>…</footer>` ou de elemento com `data-mnt-commercial-footer`.
2. Qualquer `<script>` (JSON-LD, medição, GTM, formulário) e qualquer `<style>`.
3. Páginas e posts do Rio: `src-greenn/rio-de-janeiro/**`, os 7 empreendimentos de `RJ_PROJECT_SLUGS` e os posts listados em `scripts/lib/rj-blog-posts.mjs`. Eles já usam a central RJ e são proibidos de citar Sabrina, CRECI ou "equipe Tegra Vendas" (regra R7, `RJ_FORBIDDEN` em `scripts/lib/commercial-channels.mjs`).
4. Números, links `wa.me`, `tel:`, `action`/campos do formulário 46, `value` de `<option>`, atributos `data-*` de medição.
5. Nomes de classe e `id` existentes (`mnt-sabrina-card`, `id="sabrina-da-tegra"`, `mnt-sabrina-cta`, `sabrina-grid` etc.). Eles são usados por CSS, por âncoras internas (`href="#sabrina-da-tegra"`) e por validadores (`validate-mercado-editorial-20261028.mjs` procura `<section class="mnt-(?:sabrina|rj)-card"`). **Muda o conteúdo, não o nome da classe.**
6. Arquivos `.js` e `.css` (inclusive `src-greenn/moretegra.js`, `preview/runtime.js`, `blog/blog-home.css`). Se algum texto visível com o nome vier de JS, registrar no relatório final e não alterar.
7. Preço, metragem, endereço, datas e qualquer fato comercial.

## 4. Regra de honestidade da copy

O canal continua sendo o atendimento de uma corretora do Time Tegra Vendas. Por isso:

- Usar **"um especialista do Time Tegra Vendas"** ou **"o Time Tegra Vendas"**.
- Não afirmar que vários corretores atendem, não inventar tamanho de equipe, horário, tempo de resposta, prêmio ou "canal oficial da incorporadora".
- Não prometer retorno imediato. "Agora mesmo" pode aparecer no botão como convite, não como garantia de prazo.
- Sem clichês: nada de "imagine viver", "mergulhe", "sinfonia de", "realize o sonho", "oportunidade única".

## 5. Copy padrão

### 5.1 Cartão dos artigos do blog (`section.mnt-sabrina-card`, 21 posts)

Estrutura atual: foto + eyebrow + H2 + linha de identidade + parágrafo + botão + nota.

| Elemento | Texto novo |
| --- | --- |
| Foto (`div.mnt-sabrina-photo img`) | Trocar `src` por `/assets/brand/tegra-vendas-256.webp`, `alt="Tegra Vendas"`, `width="256" height="256"`. Manter `loading="lazy" decoding="async"`. |
| Eyebrow | `Time Tegra Vendas` |
| H2 (`#mnt-sabrina-title`) | `Fale com um especialista em imóveis Tegra` |
| Linha de identidade (`<p><strong>Sabrina da Tegra</strong> · Corretora de imóveis · CRECI…</p>`) | `<p><strong>Time Tegra Vendas</strong> · Atendimento especializado em empreendimentos Tegra em São Paulo</p>` |
| Parágrafo | `Um especialista do Time Tegra Vendas compara com você plantas, localização e estágio de obra dos empreendimentos Tegra em São Paulo e confirma o que está disponível hoje, de acordo com o que você procura para morar ou investir.` |
| Botão (`a.mnt-sabrina-cta`) | `Falar com especialista agora <span aria-hidden="true">↗</span>` |
| `aria-label` do botão | Trocar "Conversar com Sabrina da Tegra" por "Falar com um especialista do Time Tegra Vendas pelo WhatsApp", preservando o complemento ("sobre apartamentos em São Paulo" etc.). |
| Nota (`p.mnt-sabrina-subtle`) | Manter como está. |

Onde o parágrafo atual tem uma frase própria do artigo antes de citar a Sabrina (por exemplo, o post de cozinha e o de iluminação natural), **manter a frase própria** e trocar só o sujeito: "A Sabrina pode ajudar você a…" → "Um especialista do Time Tegra Vendas pode ajudar você a…".

A foto retrato tem proporção 3/4 e a logo é quadrada. Conferir no navegador se `.mnt-sabrina-photo` (aspect-ratio e `object-fit`) não corta a logo. Se cortar, **não editar o CSS**: registrar no relatório e propor a correção em diff.

### 5.2 Bloco de atendimento das páginas de bairro (11 páginas de `/regioes/`)

| Texto atual | Texto novo |
| --- | --- |
| `Atendimento com Sabrina da Tegra` (eyebrow) | `Atendimento Time Tegra Vendas` |
| `Sabrina da Tegra: atendimento focado em imóveis Tegra.` (H2) | `Time Tegra Vendas: fale com um especialista em imóveis Tegra.` |
| `Sabrina da Tegra é corretora Tegra Vendas e especialista em produtos Tegra. O atendimento pode orientar a busca e confirmar disponibilidade e condições vigentes.` | `O Time Tegra Vendas é especialista em produtos Tegra. Um especialista orienta a sua busca, compara os empreendimentos do bairro e confirma disponibilidade e condições vigentes.` |
| `Use o formulário ou o WhatsApp. Sabrina da Tegra confirmará as informações vigentes no atendimento comercial.` | `Use o formulário ou o WhatsApp. Um especialista do Time Tegra Vendas confirma as informações vigentes no atendimento comercial.` |

### 5.3 Formulário e botões das páginas de empreendimento

| Texto atual | Texto novo |
| --- | --- |
| `Falar com Sabrina da Tegra` (rótulo de `<option>` e `span[data-submit-label]`) | `Falar com especialista` (o `value` do option já é "Falar com especialista"; não mexer no `value`) |
| `disponibilidade com Sabrina da Tegra` (`<small>`) | `disponibilidade com o Time Tegra Vendas` |
| `Fale com Sabrina da Tegra para …` | `Fale com um especialista do Time Tegra Vendas para …` |
| `Consulte Sabrina da Tegra para …` | `Consulte o Time Tegra Vendas para …` |
| `Sabrina da Tegra pode verificar …` | `O Time Tegra Vendas pode verificar …` |
| `Conversar com Sabrina pelo WhatsApp` / `Falar com Sabrina no WhatsApp` / `Conversar com Sabrina` | `Falar com especialista no WhatsApp` |
| `Consultar com Sabrina` | `Consultar com especialista` |
| `Comparar apartamentos com Sabrina` / `Comparar imóveis com Sabrina` / `Comparar com Sabrina` | `Comparar com um especialista` |
| `Falar com Sabrina ↓` (âncora para a seção) | `Falar com especialista ↓` |
| `aria-label` com "Sabrina" (WhatsApp flutuante, telefone, mensagem) | Mesmo rótulo com "especialista do Time Tegra Vendas" no lugar do nome |

### 5.4 Mensagem pré-preenchida do WhatsApp

No parâmetro `text=` dos links `wa.me`, trocar apenas a saudação: `Ol%C3%A1%2C%20Sabrina!` → `Ol%C3%A1!`. O restante da mensagem e o número ficam idênticos. Atenção: `validate-m5-06-cta-form-journey.mjs` confere que o destino começa com `https://wa.me/5511960779328?text=` e contém o nome do projeto.

### 5.5 Frases em prosa (regra de gramática)

| Padrão | Vira |
| --- | --- |
| "A Sabrina pode…" / "Sabrina pode…" / "Sabrina da Tegra pode…" | "O Time Tegra Vendas pode…" ou "Um especialista do Time Tegra Vendas pode…" |
| "com Sabrina da Tegra" / "com Sabrina" / "com a Sabrina" | "com o Time Tegra Vendas" |
| "Conte a Sabrina o que procura" | "Conte ao Time Tegra Vendas o que procura" |
| "Sabrina da Tegra, corretora de imóveis CRECI-SP 209.905-F, pode…" | "O Time Tegra Vendas pode…" (o CRECI sai do corpo, D3) |
| "Sabrina da Tegra, corretora Tegra Vendas, CRECI-SP 209.905-F, fará o atendimento." | "Um especialista do Time Tegra Vendas fará o atendimento." |
| Primeira pessoa ("Sou Sabrina da Tegra, corretora Tegra Vendas. Posso ajudar…", "Estou à disposição para…") | Reescrever em terceira pessoa institucional, mesma informação e mesmo tamanho: "O Time Tegra Vendas pode ajudar você a…", "O Time Tegra Vendas está à disposição para…" |
| Títulos de seção só com o nome (`<h2 id="sabrina-title">Sabrina da Tegra</h2>`) | `Time Tegra Vendas` |
| "Da pesquisa à visita: converse com Sabrina da Tegra." | "Da pesquisa à visita: fale com um especialista do Time Tegra Vendas." |
| Concordância | "corretora", "ela", "a Sabrina" → ajustar para o masculino/neutro de "o Time" ou "um especialista". Reler cada frase alterada. |

## 6. Exceções obrigatórias

**E1 — Frase do estande (D5).** Preservar, com o nome, toda frase que orienta a pedir a Sabrina no estande. Ocorrências conhecidas (confira no inventário, palavra "solicite"):

- `Ao chegar ao estande de vendas, solicite expressamente atendimento por Sabrina da Tegra.`
- `Ao visitar um estande, solicite expressamente atendimento por Sabrina da Tegra.`
- `Em visitas ao estande, solicite atendimento por Sabrina da Tegra.`
- `Ao chegar a um estande, solicite atendimento por Sabrina da Tegra.`
- `Para atendimento no estande, solicite expressamente Sabrina da Tegra, corretora Tegra Vendas, CRECI-SP 209.905-F.`
- `Agende antes de visitar o estande e, ao chegar, solicite expressamente Sabrina da Tegra.`
- Mozae: `Ao chegar ao estande de vendas do Mozae Higienópolis, solicite atendimento por <strong>Sabrina da Tegra</strong>…` — este parágrafo é **travado byte a byte** por `validate-resf-html-regression.mjs`. Não alterar um caractere.

Quando a frase do estande divide o parágrafo com outra menção, alterar só a outra menção. Exemplo: "Fale com Sabrina da Tegra para verificar opções de visita… Ao visitar um estande, solicite expressamente atendimento por Sabrina da Tegra." → a primeira vira "Fale com um especialista do Time Tegra Vendas…", a segunda fica.

**E2 — Jerivás.** `validate-jerivas-commercial.mjs` exige `id="sabrina"`, `id="jerivas-sabrina-title"`, `class="sabrina-photo"` e o CRECI no corpo. **Não alterar a página do Jerivás neste lote.** Listar no relatório como pendência que depende de o Wagner autorizar a mudança do validador.

**E3 — Home.** `validate-home-sp-exclusiva.mjs` e `validate-m4-05r.mjs` exigem "Sabrina da Tegra", o CRECI e o telefone visíveis na home, no CAPIITOLO e no Elo Duo. O rodapé preservado deve bastar. Confirmar rodando os dois validadores depois de editar essas três páginas; se falharem, **reverter a página e registrar**, sem editar o validador.

**E4 — Post Lapa e Vila Anastácio.** `validate-blog-lapa-vila-anastacio.mjs` exige "Sabrina da Tegra" dentro de `<main>`. A frase do estande (E1) existe nesse post e deve satisfazer o check. Confirmar.

**E5 — Validadores não são editados.** Alterar validador é mudança de regra do repositório e precisa de autorização explícita do Wagner. Se um check falhar por causa desta troca e não houver como atender os dois lados, reverter aquela página e registrar a pendência.

## 7. Procedimento

1. `git fetch` e confirmar que está na branch `seo/atendimento-time-tegra-vendas-20261114`. Ler `bootstrap/BOOTSTRAP_CANONICO.md`, `docs/BLOCKED_ACTIONS.md` e `docs/NEXT_SAFE_ACTION.md`.
2. **Linha de base.** Rodar todos os `scripts/validate-*.mjs` e `scripts/test-*.mjs` e guardar o código de saída e a saída de cada um. Em 14/11, na main, 35 passavam e 11 falhavam neste tipo de ambiente (as 11 já falhavam antes).
3. **Contagem de palavras antes.** Para cada HTML de `src-greenn/` fora do Rio, contar as palavras do texto visível (sem `script`/`style`) e guardar.
4. Aplicar por família, um commit por família, nesta ordem: blog (cartão padrão) → bairros → empreendimentos → investimentos e Complexo Lapa–Pirituba → home → hubs do blog.
5. Depois de cada família: rodar o inventário (item 8), rodar todos os validadores e comparar com a linha de base. Nenhum validador que passava pode passar a falhar.
6. **Contagem de palavras depois.** Nenhuma página pode terminar com menos palavras do que tinha. Se alguma ficar menor, ampliar o parágrafo do bloco de atendimento com informação verdadeira e já presente na página.
7. Atualizar o `<lastmod>` no `sitemap.xml` das páginas alteradas para a data do commit (fuso America/Sao_Paulo). O check `Sitemap lastmod` exige isso.
8. Abrir PR **em rascunho**, base = branch do PR #573 se ele ainda não tiver sido mesclado, senão `main`. Sem merge. No corpo: o que mudou, o que ficou de fora (E2 e qualquer página revertida), resultado dos validadores antes/depois, tabela de palavras antes/depois, e o aviso de que a aparência no celular precisa ser conferida no Preview.

## 8. Inventário e critério de aceite

O inventário de partida está em `docs/sfjm/data/MNT_ATENDIMENTO_INVENTARIO_2026-11-14.txt` (286 trechos distintos em 71 páginas, fora rodapé, scripts e estilos). Para refazer:

```
python3 docs/sfjm/data/MNT_ATENDIMENTO_INVENTARIO_2026-11-14.py "$PWD"
```

A execução está pronta quando o inventário, refeito, só listar:

1. frases do estande (E1);
2. a página do Jerivás (E2);
3. nomes de classe e `id` preservados de propósito (item 5 da seção 3), sem o nome "Sabrina" em texto visível nem em `aria-label`/`alt`;
4. links `href="https://corretor.tegravendas.com.br/sabrina/sp"` que estejam dentro do rodapé comercial. Se houver esse link **fora** do rodapé (o inventário de 14/11 aponta 6 arquivos), verificar um a um: se fizer parte do bloco de rodapé padrão, fica; se estiver em seção de corpo, trocar o texto âncora para "Perfil no Tegra Vendas" e manter o `href`.

Qualquer outra ocorrência é pendência e precisa estar justificada no relatório do PR.

## 9. Riscos conhecidos

- **Regra do CRECI.** A Resolução COFECI 1.065/2007 pede, em qualquer divulgação, o nome seguido de "corretor de imóveis" e do número do CRECI. O rodapé preservado (D1, D3) é o que mantém as páginas dentro da regra. Não remover.
- **Atribuição da visita.** Coberta pela E1.
- **Posicionamento.** As páginas do Rio proíbem atribuir o canal à "equipe Tegra Vendas" (R7). Esta mudança vale só para São Paulo. Não propagar para o Rio nem alterar `RJ_FORBIDDEN`.
- **Conflito com o PR #573.** As páginas de bairro e o hub de investimentos têm linhas longas editadas pelo #573. Por isso esta branch nasce em cima dele.
