# Handoff da branch — Rio: endereços, estandes e páginas de venda

> Arquivo de caminho fixo: reescrito por inteiro a cada checkpoint (commit da branch). No merge, o conteúdo vai para o `NEXT_SAFE_ACTION` do projeto e este arquivo sai. Histórico: `git log -- docs/sfjm/HANDOFF.md`.
>
> Última atualização: 2026-11-10 (Commit B).

- Repositório: `wagnerjfjunior/MoreNumTegra`
- Branch: `feat/rio-enderecos-estandes-20261109`
- PR: #561 (aberta, base `main`). Merge só pelo Wagner.
- Este handoff vai no próprio Commit B (formulário e mensuração). Commit A: `1acb100`.
- Teste local: LVR com live sync pelo nome da branch (sem preview Vercel).

> **Pronta para QA do Wagner.** Commits A e B concluídos. A captação do Rio só é considerada validada depois dos gates de produção (P3, P6, P8, P9).

## Documento de referência

`docs/sfjm/MNT_RJ_SP_CANAIS_ANALYTICS_2026-11-10.md` — por que existem dois canais, quem recebe o lead do Rio e como ele é encaminhado, contrato de canais e analytics, diagnóstico, auditoria do GTM, validação do ChatGPT (seção 9), decisões finais e execução (seção 10).

Evidências: `docs/attribution/gtm/GTM-PGCR4R47_workspace14_export_2026-11-10.json` (contêiner auditado) e `docs/runtime/green-form47/Formulario_47_-_Tegra_RJ_embed_2026-11-10.md` (form 47).

## Dois canais comerciais (decisão do Wagner, 2026-11-10)

| | São Paulo | Rio de Janeiro |
|---|---|---|
| Quem atende | Sabrina da Tegra (CRECI-SP 209.905-F) | Central de atendimento RJ, que encaminha ao corretor local autorizado a vender Tegra no RJ |
| WhatsApp | `5511960779328` | `5511951667227` (provisório; será trocado por um DDD do RJ) |
| Formulário Green (tenant 313) | 46 | 47 — campos iguais: `nome`, `email`, `telefone`, `texto-livre` |
| GTM / GA4 / obrigado | `GTM-PGCR4R47` / `G-57M2XR0CY2` / `/obrigado/` | os mesmos |
| Como se separam no GA4 | `form_id` 46 no `generate_lead`; rota e identidade da página | `form_id` 47; rota e identidade `<slug>_project` |

Motivo: a questão do CRECI no RJ. O canal RJ não é da incorporadora. Fonte única para os validadores: `scripts/lib/commercial-channels.mjs`. Regras R1 e R7: `docs/frameworks/resf/v1/RESF_CONVERSION_GUARDRAILS_2026-11-09.md`.

## Commit A (`1acb100`) — canais

Só as 8 páginas RJ: número da central RJ em todos os pontos de contato (144 ocorrências + 8 telefones visíveis), copy aprovada, JSON-LD do canal fora da Tegra Vendas, guardrails R1/R7, contrato central, validador `validate-commercial-channels-rj-sp.mjs` e validadores do Rio atualizados. Nenhuma página de SP alterada.

## Commit B (este) — formulário 47 e mensuração

Arquivos:
- Páginas RJ (hub + 7): bootstrap GTM igual ao de SP (`default_consent` antes do `gtm.js`, carga tardia, `noscript`), `<body data-moretegra>`, identidade (`data-mnt-page-identity`, `data-mnt-product-identity`, `data-moretegra-interest`), `measurement-core.js`, formulário 47 (`data-form-id` e `form_id`).
- `src-greenn/preview/runtime.js`: `form_id` do `data-form-id` com lista permitida 46/47 e padrão 46; marcador da conversão com `form_id`; aviso sem empreendimento neutro no form 47.
- `src-greenn/preview/measurement-form.js`: reconhece o form 47; só nele `form_id: 47` e `placement: form_47`.
- `src-greenn/preview/thank-you-measurement.js`: só o valor exato `"47"` no marcador vira lead RJ (`form_id: 47`, `lead_method: green_form_47`, mensagem da central RJ e WhatsApp RJ em `/obrigado/`); qualquer outro valor mantém o 46.
- `docs/editorial/mercado-2026-10-28/riio-componentes-aprovados.json`: rebaseline autorizado do bloco `form46` do RIIO (só 46 → 47), hash anterior em `history`.
- Validadores: novo `validate-measurement-region-rj.mjs` (um GTM por página RJ, ordem do consentimento, identidade, scripts, form 47 só no Rio, padrão 46 em SP, módulos de mensuração sem dados pessoais); `validate-resf-rio`, `validate-rio-home` e `validate-commercial-channels-rj-sp` ajustados ao form 47.
- Smoke novo: `.github/diagnostics/rj-sp-form-measurement-smoke.mjs` (Chromium, GTM e Green interceptados, nenhum lead real).

Efeito no texto enviado à Green nas 7 páginas de empreendimento: "<Projeto> | <intenção>" (mesmo formato de SP); antes era "Rio de Janeiro | <Projeto> | MoreTegra | <intenção>". O hub mantém o contexto "Rio de Janeiro | Hub de empreendimentos | MoreTegra".

Verificação do Commit B:
- Validadores: 34 PASS (os 32 da linha de base + os 2 novos) e as mesmas 6 FAIL anteriores, fora do Rio.
- `test-thank-you-lead-guard.mjs` e `test-vercel-thank-you-consent.mjs`: PASS.
- Smoke novo, desktop e mobile: 8 páginas RJ com GTM pedido, `default_consent` antes do `gtm.js`, um `mnt_page_view` com a identidade certa, `mnt_form_start` com form 47, payload Green form 47 / tenant 313 com o empreendimento, uma única conversão form 47 com `project_name`, WhatsApp RJ e mensagem da central em `/obrigado/`, nenhuma conversão extra ao recarregar, "Sabrina" ausente do texto visível, nenhum dado pessoal no `dataLayer`. Tièl e Château continuam no form 46, com WhatsApp SP e mensagem atual.
- Comparação SP antes/depois (Tièl, Château, Ária, Mozae): eventos, payload Green, `/obrigado/`, recarregamento e ausência de dados pessoais idênticos.
- Smokes `rio-home-visual-smoke` e `resf-rio-visual-smoke`: PASS em desktop e mobile.
- Provas negativas: validador de canais reprova número SP numa página RJ; validador de mensuração reprova GTM duplicado. Páginas restauradas byte a byte.

Não verificável aqui (vai para produção): disparo real das tags no GA4, versão publicada do GTM, recebimento real do form 47 pela Green.

## Commits da branch (mais antigo primeiro)

| Commit | O que muda |
|---|---|
| `e853c93` | Endereço, CEP e estande Tegra no JSON-LD e no rodapé das 7 páginas RJ |
| `9d83f56` | Páginas RJ como página de venda: mapa estilo Mozae, plantas com WhatsApp, guardrails R1–R6 |
| `ef2aad9` | Mídia e plantas oficiais Tegra no Gran Thai e no Singular |
| `67693da` | Seletor de plantas e foto oficial em todo card de planta |
| `f3a2903` | RIIO: sem quadros por edifício e sem seção da Sabrina |
| `9577d9f` | Galeria cabe na tela; Kronos com 12 ambientes |
| `f30285e` | Galeria no padrão Ampère Brooklin |
| `9335daa` | Galeria sem linha repetida, header do RIIO, card do hub abre no hero, bloco de atendimento no hub |
| `9c15d48` | Primeiro handoff de caminho fixo |
| `dbda76a` | Rio sem Sabrina; metragens oficiais |
| `444a698` | Handoff |
| `07e91ab` | Home de SP: metragem oficial nos cards do Gran Thai e do Gaea |
| `6194e4b` | Handoff |
| `79031f8` | Documento de canais e analytics RJ/SP e export do GTM |
| `10e5024` | Validação do ChatGPT reconciliada e evidência do form 47 |
| `1acb100` | Commit A — canal da central de atendimento RJ |
| (este) | Commit B — formulário 47 e mensuração no Rio |

## Decisões do Wagner (com data)

- 2026-11-09: atendimento presencial no estande de cada empreendimento; rodapé com o endereço do próprio empreendimento; nunca mandar cliente para fora do funil; sem texto de justificativa; toda planta com foto oficial; peninsulacollection.com.br é site oficial da Tegra.
- 2026-11-10: galeria sem linha repetida; header do RIIO padronizado; card do hub abre no hero.
- 2026-11-10: metragens oficiais sem decimais — Gran Thai 125–405 m², Gaea 123–365 m² (também nos 2 cards da home de SP).
- 2026-11-10: páginas do Rio sem nada relacionado à Sabrina (questão do CRECI no RJ).
- 2026-11-10: canais separados RJ/SP; blog fora do escopo; form 47 criado com os campos do 46; rebaseline do bloco `form46` do RIIO autorizado.
- 2026-11-10: copy RJ aprovada; commits A e B autorizados, sem merge.
- 2026-11-10: **homepage exclusiva de São Paulo — USER_APPROVED, PENDING_IMPLEMENTATION**, entrega separada.

## Pendências

| # | Item | Dono |
|---|---|---|
| P6 | QA no LVR das 8 páginas RJ; merge da #561 | Wagner |
| P3 | Gate: confirmar que o workspace 14 é a versão publicada do GTM; dimensão `form_id` no GA4 | Wagner |
| P6b | Gate, depois do merge: GTM Preview e GA4 DebugView; 1 lead controlado RJ (Green: form 47 com "Empreendimento" preenchido) e 1 SP | Wagner |
| P8 | Gate: no lead controlado, registrar o corpo da resposta da Green (sucesso × erro de negócio) | Wagner + Claude |
| P9 | Gate: consentimento em `/obrigado/` em produção, incluindo o caminho de recusa (localmente: conversão única e restaurações coerentes no aceite) | Claude |
| P4 | Decidir se corrige os 2 defeitos do GTM (leitura de `mnt.consent.v2`; gatilhos de clique mortos) | Wagner |
| P7 | Depois do merge: IndexNow/Search Console das URLs RJ | Wagner |
| P11 | Homepage exclusiva de SP (entrega separada, depois da #561) | Claude |

## Próxima ação (única)

Wagner faz o QA no LVR da branch nas 8 páginas RJ (canal RJ, copy, formulário) e, se aprovar, faz o merge da #561.

## Prompt de retomada

```
Retomada MoreNumTegra, frente Imobiliário. Leia ao vivo a branch feat/rio-enderecos-estandes-20261109, o arquivo docs/sfjm/HANDOFF.md e docs/sfjm/MNT_RJ_SP_CANAIS_ANALYTICS_2026-11-10.md. Confira se o head atual é o commit que trouxe este handoff (Commit B, filho de 1acb100). Se for, siga a próxima ação do handoff. Se divergir, pare e me diga.
```
