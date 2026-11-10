# MoreNumTegra — Separação RJ/SP: canais comerciais, formulário e analytics (2026-11-10)

Status: **DECISÃO + DIAGNÓSTICO + PLANO**. Nenhum código foi alterado por este documento.
Autoridade: Wagner (proprietário do projeto). Redação e auditoria: Claude. Validação: ChatGPT.
Branch: `feat/rio-enderecos-estandes-20261109` · PR #561 · Head no momento da escrita: `6194e4b`.

Leitura obrigatória antes de executar qualquer item: este documento, `docs/sfjm/HANDOFF.md` e `docs/frameworks/resf/v1/RESF_CONVERSION_GUARDRAILS_2026-11-09.md`.

---

## 1. Por que existem dois canais (decisão do Wagner, 2026-11-10)

São Paulo e Rio de Janeiro passam a ter canais comerciais separados, de forma permanente.

- **São Paulo:** atendimento da Sabrina da Tegra (CRECI-SP). Nada muda em SP: nome, CRECI-SP, perfil, telefone, links, CTAs e JSON-LD continuam como estão.
- **Rio de Janeiro:** as páginas do Rio não podem citar a Sabrina, por causa da questão do CRECI no RJ. O lead do Rio vai para uma central que o encaminha a um corretor local autorizado a vender empreendimentos Tegra no RJ.

Fluxo do lead do Rio:

```
Cliente → página MoreTegra RJ → central de atendimento RJ → corretor local autorizado (Tegra no RJ) → atendimento e negociação
```

O número do Rio é provisório e será trocado por um número com DDD do RJ, ainda não definido. O canal **não é da incorporadora**: as páginas não podem declarar que o atendimento é da própria Tegra, nem credenciais que não existem.

### Escopo RJ (somente estas 8 páginas)

- Hub `/rio-de-janeiro/`
- `/empreendimentos/kronos-by-tegra/`
- `/empreendimentos/claris-rosas/`
- `/empreendimentos/claris-casa-e-clube/`
- `/empreendimentos/gran-thai-leisure-residence/`
- `/empreendimentos/singular-private-residence/`
- `/empreendimentos/gaea-home-resort/`
- `/empreendimentos/riio-by-piero-lissoni/`

Fora do escopo por decisão do Wagner (2026-11-10): **blog** (inclusive os posts sobre o Rio), home de SP e qualquer página de SP.

## 2. Contrato de canais e analytics (aprovado)

| Item | São Paulo | Rio de Janeiro |
|---|---|---|
| WhatsApp | `5511960779328` | `5511951667227` (provisório) |
| Telefone (`tel:`) | `+5511960779328` | `+5511951667227` |
| Telefone visível | (11) 96077-9328 | (11) 95166-7227 |
| Identidade comercial | Sabrina da Tegra · CRECI-SP 209.905-F | sem nome de corretor; texto aprovado pela etapa de copy |
| Green Sales tenant | `313` | `313` |
| Formulário Green | `46` | `47` |
| Campos do formulário | `nome`, `email`, `telefone`, `texto-livre` | `nome`, `email`, `telefone`, `texto-livre` |
| Contêiner GTM | `GTM-PGCR4R47` | o mesmo (não criar outro) |
| GA4 | `G-57M2XR0CY2` | a mesma propriedade (não criar outra) |
| Página de obrigado | `/obrigado/` | a mesma rota (o gatilho do GTM exige `^/obrigado/?$`) |

Evidência versionada: `docs/runtime/green-form47/Formulario_47_-_Tegra_RJ_embed_2026-11-10.md` (versão final enviada pelo Wagner às 13:28 de 2026-11-10; SHA-256 `a5754c48ae84d1e8e8216db68334580ea681b2e83afc45b57bcdd557e88936c6`). As duas versões anteriores enviadas no mesmo dia não tinham o campo `texto-livre` e foram substituídas.

O form 47 foi conferido pelo HTML da Green enviado pelo Wagner em 2026-11-10: o campo "Empreendimento" tem `name="texto-livre-preview"`, que o script da Green envia como `texto-livre`. O contrato de campos é idêntico ao do 46 (`docs/runtime/MNT_VERCEL_FORM46_GTM_CONFIG_2026-09-14.md`). O script de embed da Green (axios via CDN) **não** é usado; o `runtime.js` faz o mesmo POST sem dependência externa.

## 3. Diagnóstico — canais nas páginas RJ (head `6194e4b`)

Verificação estática (contagem no código):

| Página | WhatsApp SP | `tel:` SP | Telefone visível SP | `telephone` no JSON-LD |
|---|---|---|---|---|
| Hub | 4 | 1 | 1 | 1 |
| Kronos | 9 | 2 | 1 | 0 |
| Singular | 13 | 2 | 1 | 0 |
| Gaea | 44 | 2 | 1 | 0 |
| RIIO | 4 | 1 | 1 | 2 |
| Gran Thai | 27 | 2 | 1 | 0 |
| Claris Rosas | 18 | 2 | 1 | 0 |
| Claris Casa | 8 | 2 | 1 | 0 |
| **Total** | **127** | **14** | **8** | **3** |

Achados:

1. **Copy em conflito com a regra do canal.** O commit `dbda76a` escreveu "Direto com a Incorporadora Tegra" e "Atendimento direto com a Incorporadora Tegra" nas páginas RJ, e o JSON-LD liga o contato à organização Tegra Vendas (hub: `ContactPoint #tegra-contato` → `#tegra-vendas`; RIIO: `#atendimento` com `parentOrganization` Tegra Vendas). Com o canal de uma central, isso declara propriedade institucional. Precisa de copy nova (etapa de copy com o ChatGPT) e de JSON-LD sem esse vínculo.
2. **Guardrails desatualizados.** A regra R7 (Rio sem Sabrina) existe só em `scripts/validate-resf-conversion-guard.mjs`. O documento de guardrails ainda diz "R1–R6" e "A Sabrina é o canal" sem exceção regional.
3. **Blocos protegidos do RIIO** (`hero`, `facts`, `form46` em `docs/editorial/mercado-2026-10-28/riio-componentes-aprovados.json`): 0 ocorrências do número e da Sabrina. O rebaseline do bloco `form46` para a troca 46 → 47 foi **autorizado pelo Wagner em 2026-11-10**; o hash anterior vai para `history`.
4. **`src-greenn/preview/runtime.js`** (compartilhado SP/RJ) contém `5511960779328` só dentro de `initCapiitoloExperience()`, que roda apenas no CAPIITOLO. Não injeta o número de SP no Rio. Não precisa mudar por causa de canal.
5. **Página de obrigado compartilhada** (`src-greenn/thank-you/obrigado.html`) mostra WhatsApp de SP (`wa.me/5511960779328`, "acabei de enviar meu interesse") e o texto "seguirá com a Tegra Vendas". Um lead do Rio cai no canal de SP depois do formulário.

## 4. Diagnóstico — mensuração nas páginas RJ

Legenda: (E) verificação estática do código · (N) teste real em Chromium (desktop 1440 e mobile 390), página servida da branch sob o host `www.moretegra.com.br`, com GTM e Green Sales interceptados (nenhum lead real, nada enviado ao Google).

| Página | GTM | Banner | Eventos na página (N) | Form enviado (N) | Conversão em `/obrigado/` (N) |
|---|---|---|---|---|---|
| Hub | ausente (E); 0 pedidos (N) | aparece; aceitar grava e some (N) | `mnt_consent_accept`, `mnt_form_start` com `page_identity=moretegra_home` (errado) | form 46, tenant 313 | `mnt_lead_success` form 46; WhatsApp SP |
| Kronos | ausente / 0 | idem | idem | 46 / 313 | idem |
| Singular | ausente / 0 | idem | idem | 46 / 313 | idem |
| Gaea | ausente / 0 | idem | idem | 46 / 313 | idem |
| RIIO | ausente / 0 | idem | identidade certa; `measurement-core.js` carrega mas não emite (falta `[data-moretegra]`) | 46 / 313 | idem |
| Gran Thai | ausente / 0 | idem | `moretegra_home` | 46 / 313 | idem |
| Claris Rosas | ausente / 0 | idem | `moretegra_home` | 46 / 313 | idem |
| Claris Casa | ausente / 0 | idem | `moretegra_home` | 46 / 313 | idem |
| SP Tièl (referência) | 1 bootstrap tardio / 1 pedido | idem | `default_consent`, `gtm.js`, `mnt_page_view`, `mnt_form_start` | 46 / 313 | form 46 com projeto |

Também verificado (N): recarregar `/obrigado/` não dispara uma segunda conversão (deduplicação funciona) nas 10 páginas testadas; botão "Aceitar" mede 88×46 px (75×46 no RIIO).

Achados:

1. **O Rio não tem mensuração.** Nenhuma das 8 páginas tem o bootstrap `GTM-PGCR4R47` nem o `noscript`. Sem GTM não há GA4 no Rio.
2. **O form 47 não funciona só trocando o HTML.** `runtime.js` envia a constante `FORM_ID = "46"`; `measurement-form.js` só reconhece `data-form-id="46"` e envia `form_id:46`; `thank-you-measurement.js` envia `form_id:46` fixo.
3. **Identidade das páginas.** Hub e 6 empreendimentos não têm `data-mnt-page-identity`/`data-mnt-product-identity` e não carregam `measurement-core.js`; o hub e o RIIO não têm `[data-moretegra]`. Nenhuma página RJ emite `mnt_page_view` nem `mnt_intent`.
4. **Dados pessoais:** os módulos de mensuração não enviam nome, e-mail ou telefone ao `dataLayer` (E). O marcador de conversão (`sessionStorage`) guarda só projeto e oferta.
5. **Menor:** `/obrigado/` envia o evento de consentimento três vezes (inline, `thank-you-measurement.js` e `runtime.js`).

Não testado: botão "Recusar"; disparo real das tags no GA4 (exige o contêiner carregado e rede); envio real ao form 47 (o `runtime.js` só envia em `www.moretegra.com.br`).

## 5. Auditoria do contêiner GTM (export do workspace 14, 2026-11-10)

Arquivo versionado: `docs/attribution/gtm/GTM-PGCR4R47_workspace14_export_2026-11-10.json` (export enviado pelo Wagner; `containerVersionId: 0`, ou seja, workspace, não necessariamente a versão publicada).

Fatos:

- **Consent Mode v2 está implementado no GTM.** Modelo "MT - Consent Mode Default Denied" (`setDefaultConsentState` com `ad_storage`, `analytics_storage`, `ad_user_data`, `ad_personalization` negados) no gatilho Consent Initialization. Modelos "MT - Consent Grant All" e "MT - Consent Deny All" (`updateConsentState`) nos eventos `mnt_consent_accept` e `mnt_consent_reject`.
- O `default_consent` inline das páginas não é lido por nenhum gatilho. É redundante e inofensivo.
- Todos os gatilhos filtram só o host `^www\.moretegra\.com\.br$`. Não há filtro por região, rota de cidade ou `form_id`.
- GA4 `G-57M2XR0CY2`: Google Tag com `send_page_view=false`. O page view vem só do evento `mnt_page_view`.
- `generate_lead` dispara com `mnt_lead_success` em `^/obrigado/?$` e envia `form_id` pela variável `DLV - form_id`. Leads do form 47 contam como `generate_lead` sem mudar o contêiner.
- Clarity só carrega depois do aceite.

Defeitos (afetam SP e RJ; correção no GTM, fora do código):

1. **Ordem do consentimento em visitas de retorno.** O modelo padrão lê `localStorage` `lgpd` (`save`/`cancel`), herança da Green Sales, que nenhum arquivo do site grava. O site grava `mnt.consent.v2`. Como o GTM carrega tarde, a fila chega como `gtm.js` → `mnt_page_view` → `mnt_consent_accept` (observado no Tièl), e o page view de quem já aceitou sai com consentimento negado. Correção proposta: o modelo também ler `mnt.consent.v2` (exige permissão de leitura dessa chave no modelo).
2. **Gatilhos de clique mortos.** "CLICK - LGPD - Continuar/Cancelar" procuram os textos "Continuar"/"Cancelar"; os botões do banner dizem "Aceitar"/"Recusar" (`runtime.js`). Nunca disparam; quem funciona são os eventos.

A confirmar pelo Wagner: o workspace 14 é igual à versão publicada; `form_id` existe como dimensão personalizada de evento no GA4 (senão RJ e SP não se separam nos relatórios).

## 6. Plano de execução (único escritor: Claude, na branch da PR #561)

Papéis: Claude planeja, executa e audita; ChatGPT produz a copy e valida este documento; Wagner decide, faz QA e merge. O ChatGPT não faz commit na branch.

**Commit A — canais (depende da copy aprovada)**
- Trocar o número SP pelo RJ em todos os pontos de contato das 8 páginas (WhatsApp, `tel:`, CTAs, plantas, localização, rodapé, telefone visível, `aria-label`, JSON-LD).
- Aplicar a copy aprovada no lugar de "Direto com a Incorporadora Tegra"; `ContactPoint` sem vínculo com a Tegra Vendas, com `areaServed` Rio de Janeiro.
- Mensagens do WhatsApp sem a Sabrina; metragens aprovadas preservadas (Gran Thai 125 a 405 m²; Gaea 123 a 365 m²).
- Guardrails: R1 com exceção regional explícita (SP = Sabrina; RJ = canal RJ) e R7 formalizada no documento.
- Contrato central sem dependências (`scripts/lib/commercial-channels.mjs`) lido pelos validadores: RJ usa só `5511951667227`; SP preserva `5511960779328`; nenhuma Sabrina no RJ; nenhuma remoção da Sabrina em SP.

**Commit B — formulário e mensuração**
- Bootstrap GTM nas 8 páginas RJ, idêntico ao de SP: `default_consent` antes do `gtm.js`, carga tardia e `noscript`, uma vez por página.
- `data-moretegra`, identidade de página e `measurement-core.js` onde faltam.
- Form 47 nas 8 páginas (no RIIO, com o rebaseline autorizado do bloco `form46`).
- `runtime.js`: `form_id` lido do `data-form-id` com lista permitida 46/47 e padrão 46; marcador da conversão leva o `form_id`.
- `measurement-form.js` aceita 46 e 47; `thank-you-measurement.js` lê o `form_id` do marcador (padrão 46).
- `/obrigado/`: WhatsApp RJ e texto neutro quando o lead for do form 47; SP inalterado.
- Sem parâmetro `market`: RJ e SP se separam por `form_id` (lead) e por `route`/`product_identity` (página), sem mudar o contêiner.
- Validador novo de mensuração por região e smoke em Chromium com rede interceptada (payload por região, conversão única, WhatsApp certo no obrigado).

**Verificação em cada commit:** `for f in scripts/validate-*.mjs; do node "$f" || echo "FAIL $f"; done` com linha de base 32 PASS / 6 FAIL (as 6 FAIL são anteriores e fora do Rio; num clone raso é preciso buscar os commits de referência dos validadores); smokes `rio-home-visual-smoke` e `resf-rio-visual-smoke`; comparação de SP antes e depois para provar payload idêntico.

**Depois do merge (Wagner):** GTM Preview e GA4 DebugView em produção; 1 lead controlado no Rio (conferir na Green: form 47 e "Empreendimento" preenchido) e 1 em SP. Só então o analytics recebe PASS.

## 7. Pendências

| # | Item | Dono |
|---|---|---|
| P1 | Copy RJ (título, linha de apoio, rodapé, 3 botões) sem declarar o canal como da Tegra | ChatGPT propõe; Wagner aprova |
| P2 | Validação deste documento contra o repositório | ChatGPT |
| P3 | Confirmar workspace 14 = versão publicada; dimensão `form_id` no GA4 | Wagner |
| P4 | Decidir se corrige os defeitos 1 e 2 do GTM (Claude escreve o código do modelo) | Wagner |
| P5 | Teste em produção: GTM Preview, DebugView, 2 leads controlados | Wagner, depois do merge |

## 8. Critério de aceite

Qualquer IA que leia o repositório entende, sem esta conversa: por que existem dois números; qual região cada um atende; quem recebe o lead do Rio e como ele é encaminhado; qual formulário e quais campos cada região usa; e como RJ e SP se separam no GA4.

## 9. Validação do ChatGPT (head `79031f8`) e reconciliação do Claude

O ChatGPT validou este documento lendo o repositório, sem executar navegador nem validadores. Resultado: contagens da seção 3 e achados das seções 3–5 confirmados; GTM confirmado (14 tags, 13 gatilhos, 22 variáveis). Abaixo, cada ponto levantado e a resposta, com o tipo de evidência.

| # | Ponto do ChatGPT | Resposta do Claude | Evidência |
|---|---|---|---|
| V1 | Form 47 sem `texto-livre` (divergente) | Resolvido. O ChatGPT viu uma versão anterior. A versão final tem `name="texto-livre-preview"`, enviado como `texto-livre`. Agora versionada no repositório (seção 2). | Arquivo versionado + SHA-256 |
| V2 | Blocos protegidos do RIIO: 0 ocorrências não verificável só pelo registro de hashes | Verificado. Recortando os blocos com os mesmos limites, os 3 SHA-256 atuais (`hero`, `facts`, `form46`) são iguais aos aprovados; dentro deles: 0 telefone SP, 0 Sabrina; `form46` tem `data-form-id="46"` e `form_id` 46. O `validate-riio-editorial-review-20261028` também passa. | (E) recorte + SHA-256 |
| V3 | Mensagem com "Sabrina" em `syncLeadContext()` no `runtime.js` | Aceito como risco latente (eu não tinha visto). Hoje não aparece no Rio: as 8 páginas montam o contexto do empreendimento, então o aviso fica oculto e vazio. Commit B: aviso neutro quando o form for 47, e teste que falha se "Sabrina" aparecer em página RJ. SP mantém o texto atual. | (N) aviso `hidden`, texto vazio, "Sabrina" ausente do texto visível nas 8 páginas |
| V4 | Marcador da conversão sem `form_id`; ID inesperado não pode virar 47 | Aceito (já no plano) com regra explícita: só o valor exato `47`, gravado depois de envio bem-sucedido, vira RJ; qualquer outro valor, ausente ou malformado, mantém o comportamento atual (46). Consumido uma vez. | Plano, commit B |
| V5 | Sucesso decidido por `response.ok`; HTTP 2xx com erro de negócio da Green | Hipótese não verificável sem o contrato de resposta da Green. É o comportamento atual de SP, não muda com esta entrega. Pendência P8: observar o corpo da resposta no lead controlado. | — |
| V6 | `project_name`/`offer_name` podem carregar dado pessoal | Risco baixo: os valores vêm de atributos da própria página (`data-project-name`, `data-region-context`, `data-moretegra-interest`) e do mapa fixo de intenções, nunca dos campos digitados pelo visitante. Commit B: validador que falha se algum evento de mensuração ler campos do formulário (`nome`, `email`, `telefone`). Lista fixa de nomes de empreendimentos não entra (custo de manutenção sem ganho proporcional; opinião). | (E) origem dos valores em `leadProjectContext()` |
| V7 | Consentimento restaurado três vezes em `/obrigado/`; definir um único responsável | Aceito como melhoria, fora desta entrega (mexe em SP). Pendência P9. | (N) três `mnt_consent_accept` |
| V8 | `form_id` como dimensão no GA4; WhatsApp não pode contar como formulário | Concordo. Hoje o clique de WhatsApp gera `mnt_intent` (com `contact_channel`) e só `mnt_lead_success` em `/obrigado/` gera `generate_lead`. A dimensão no GA4 segue em P3. | (E) `measurement-core.js`, export GTM |
| V9 | Decisão anterior de tornar a homepage exclusiva de SP | Não encontrei essa decisão no repositório (busca em `docs/`). Pela regra 1, não entra no plano sem confirmação do Wagner. Pendência P10. | (E) busca sem resultado |
| V10 | Testes em Chromium não reproduzidos | Correto: foram executados pelo Claude fora do repositório. O commit B transforma esse teste em smoke versionado em `.github/diagnostics/`, reproduzível por qualquer IA. | — |

Achado novo do Claude durante a reconciliação:

- **N1 — eventos do Rio sem projeto.** `measurementProjectContext()` devolve vazio quando o formulário tem `data-region-context` e não tem projeto selecionado. Por isso o `generate_lead` das páginas RJ (menos o RIIO) sai sem `project_name` (observado no teste da seção 4). O texto enviado à Green inclui o empreendimento ("Rio de Janeiro | Kronos by Tegra | MoreTegra | …"), mas o GA4 não. Commit B: cada página RJ de empreendimento declara o próprio projeto no formulário, para o `project_name` chegar ao GA4; o hub continua sem projeto.

Pendências acrescentadas à seção 7:

| # | Item | Dono |
|---|---|---|
| P8 | No lead controlado, registrar o corpo da resposta da Green (sucesso × erro de negócio) | Wagner + Claude |
| P9 | Um único responsável pela restauração do consentimento em `/obrigado/` | Backlog |
| P10 | Confirmar se existe decisão de homepage exclusiva de SP; se sim, entra como entrega separada | Wagner |

Copy RJ (P1): as 3 opções do ChatGPT passam na lista de termos proibidos do guard (R3). Recomendação do ChatGPT: opção 1 no bloco principal e "Negociar condições" (opção 3) nos quadros de preço. Escolha do Wagner pendente.

## 10. Decisões finais e execução

Aprovações do Wagner (2026-11-10, depois da validação do ChatGPT):

- **Copy RJ aprovada:** bloco "Atendimento exclusivo para seu próximo imóvel" / "Conheça plantas, valores e condições dos empreendimentos Tegra no Rio de Janeiro."; rodapé "Central de atendimento RJ · (11) 95166-7227 · Encaminhamento ao corretor local autorizado."; botões "Conversar no WhatsApp", "Negociar condições", "Solicitar planta". "Exclusivo" qualifica o atendimento dedicado ao cliente, não exclusividade de representação da Tegra.
- **Homepage exclusiva de São Paulo — USER_APPROVED (2026-11-10), PENDING_IMPLEMENTATION.** `https://www.moretegra.com.br/` passa a ser só de São Paulo: sair os 7 cards RJ e as referências comerciais ao Rio (filtros, navegação), preservando catálogo SP, Sabrina, CRECI-SP, form 46 e WhatsApp SP. O hub `/rio-de-janeiro/` e as 7 páginas RJ continuam independentes, indexáveis e com as mesmas URLs. **Entrega separada, fora dos commits A e B.** Substitui a pendência P10.
- Autorizados os commits A e B na branch da PR #561, sem merge.
- **Gates de aceite** (não bloqueiam os commits; bloqueiam declarar a captação validada em produção): P8 (resposta de negócio da Green no form 47) e P9 (consentimento em `/obrigado/` sem atualizações conflitantes e sem `generate_lead` duplicado), além de P3 (GTM publicado e dimensão `form_id`).

Execução:

- **Commit A — canais:** concluído (ver `docs/sfjm/HANDOFF.md`).
- **Commit B — formulário e mensuração:** a seguir.
