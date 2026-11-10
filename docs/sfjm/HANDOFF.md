# Handoff da branch — Rio: endereços, estandes e páginas de venda

> Arquivo de caminho fixo: reescrito por inteiro a cada checkpoint (commit da branch). No merge, o conteúdo vai para o `NEXT_SAFE_ACTION` do projeto e este arquivo sai. Histórico: `git log -- docs/sfjm/HANDOFF.md`.
>
> Última atualização: 2026-11-10 (Commit A).

- Repositório: `wagnerjfjunior/MoreNumTegra`
- Branch: `feat/rio-enderecos-estandes-20261109`
- PR: #561 (aberta, base `main`). Merge só pelo Wagner.
- Este handoff vai no próprio Commit A (canais). O head anterior era `10e5024`.
- Teste local: LVR com live sync pelo nome da branch (sem preview Vercel).

> **Não fazer merge da #561 ainda.** Falta o Commit B (form 47 e mensuração no Rio). Sem ele, os leads do Rio pelo formulário ainda vão para o form 46 e o Rio não tem GTM.

## Documento de referência

`docs/sfjm/MNT_RJ_SP_CANAIS_ANALYTICS_2026-11-10.md` — por que existem dois canais (RJ/SP), quem recebe o lead do Rio e como ele é encaminhado, contrato de canais e analytics, diagnóstico, auditoria do GTM, validação do ChatGPT (seção 9) e decisões finais (seção 10).

Evidências versionadas: `docs/attribution/gtm/GTM-PGCR4R47_workspace14_export_2026-11-10.json` (contêiner auditado) e `docs/runtime/green-form47/Formulario_47_-_Tegra_RJ_embed_2026-11-10.md` (form 47).

## Dois canais comerciais (decisão do Wagner, 2026-11-10)

| | São Paulo | Rio de Janeiro |
|---|---|---|
| Quem atende | Sabrina da Tegra (CRECI-SP 209.905-F) | Central de atendimento RJ, que encaminha ao corretor local autorizado a vender Tegra no RJ |
| WhatsApp | `5511960779328` | `5511951667227` (provisório; será trocado por um DDD do RJ) |
| Formulário Green | 46 | 47 (Commit B) |
| GTM / GA4 / tenant / obrigado | `GTM-PGCR4R47` / `G-57M2XR0CY2` / 313 / `/obrigado/` | os mesmos |

Motivo: a questão do CRECI no RJ. O canal RJ não é da incorporadora; as páginas não dizem que o atendimento é da própria Tegra. Fonte única para os validadores: `scripts/lib/commercial-channels.mjs`. Regras: R1 (canal por região) e R7 (Rio sem Sabrina e sem atribuir o canal à Tegra) em `docs/frameworks/resf/v1/RESF_CONVERSION_GUARDRAILS_2026-11-09.md`.

## O que o Commit A fez

Escopo: as 8 páginas do Rio (hub + Kronos, Claris Rosas, Claris Casa & Clube, Gran Thai, Singular, Gaea, RIIO). Nenhuma página de São Paulo foi alterada.

1. **Número:** as 144 ocorrências do canal SP nas páginas RJ viraram o canal RJ — 127 WhatsApp (links e `data-wa` dos seletores de plantas), 14 `tel:`, 3 `telephone` no JSON-LD — e os 8 telefones visíveis viraram (11) 95166-7227.
2. **Copy aprovada:** bloco do hub "Atendimento exclusivo para seu próximo imóvel" + "Conheça plantas, valores e condições dos empreendimentos Tegra no Rio de Janeiro."; rodapé "Central de atendimento RJ · (11) 95166-7227 · Encaminhamento ao corretor local autorizado."; botões "Conversar no WhatsApp" e "Negociar condições"; eyebrow do formulário "Central de atendimento RJ". FAQs, meta da Claris Rosas, aviso do rodapé ("confirmadas com a central de atendimento RJ") e card de visita do RIIO sem "direto com a Tegra" / "Incorporadora Tegra" / "equipe Tegra Vendas". Os botões "Solicitar Planta" já existentes mantiveram a grafia exigida pela R5.
3. **JSON-LD:** o `ContactPoint` do hub virou `#central-atendimento-rj` ("Central de atendimento RJ", `areaServed` Rio de Janeiro) e saiu da organização Tegra Vendas; no RIIO, `#atendimento` virou "Central de atendimento RJ — RIIO by Piero Lissoni", sem `parentOrganization`. O estande físico `#estande-tegra` continua ligado à Tegra (é o estande da Tegra, não o canal).
4. **Guardrails:** R1 com o canal por região e R7 formalizada no documento.
5. **Contrato central:** `scripts/lib/commercial-channels.mjs` (canais, formulários, campos, páginas RJ, copy aprovada, frases proibidas no Rio).
6. **Validadores:** novo `validate-commercial-channels-rj-sp.mjs` (Rio só com o canal RJ, sem Sabrina/CRECI/atribuição à Tegra, rodapé e bloco aprovados; nenhum arquivo fora do Rio com o canal RJ; SP continua com o canal SP). Atualizados, só nas regras do Rio: `validate-resf-conversion-guard`, `validate-rio-home`, `validate-onsite-realtor-project-address`, `validate-commercial-page-standard` (aviso P1 e telefone por região; SP inalterado), `validate-resf-rio`, `validate-riio-editorial-review-20261028`; smoke `rio-home-visual-smoke`.

Verificação do Commit A:
- Validadores: 32 PASS + as mesmas 6 FAIL da linha de base (fora do Rio), mais o validador novo em PASS (8 páginas RJ só com o canal RJ; 128 arquivos fora do Rio só com o canal SP).
- Prova negativa do validador novo: com o número SP recolocado numa página RJ, ele reprova; a página foi restaurada byte a byte.
- Smokes `rio-home-visual-smoke` e `resf-rio-visual-smoke`: PASS em desktop e mobile.
- Blocos protegidos do RIIO (`hero`, `facts`, `form46`): intocados neste commit.

## Commits da branch (mais antigo primeiro)

| Commit | O que muda |
|---|---|
| `e853c93` | Endereço, CEP e estande Tegra no JSON-LD e no rodapé das 7 páginas RJ |
| `9d83f56` | Páginas RJ como página de venda: mapa estilo Mozae, plantas com WhatsApp, guardrails R1–R6 |
| `ef2aad9` | Mídia e plantas oficiais Tegra no Gran Thai e no Singular |
| `67693da` | Seletor de plantas (`resf-rio-plans.js`) e foto oficial em todo card de planta |
| `f3a2903` | RIIO: sem quadros por edifício e sem seção da Sabrina |
| `9577d9f` | Galeria cabe na tela; Kronos com 12 ambientes |
| `f30285e` | Galeria no padrão Ampère Brooklin |
| `9335daa` | Galeria sem linha repetida, header do RIIO, card do hub abre no hero, bloco de atendimento no hub |
| `9c15d48` | Primeiro handoff de caminho fixo |
| `dbda76a` | Rio sem Sabrina; copy "Direto com a Incorporadora Tegra" (substituída no Commit A); metragens oficiais |
| `444a698` | Handoff |
| `07e91ab` | Home de SP: metragem oficial nos cards do Gran Thai e do Gaea |
| `6194e4b` | Handoff |
| `79031f8` | Documento de canais e analytics RJ/SP e export do GTM |
| `10e5024` | Validação do ChatGPT reconciliada e evidência do form 47 |
| (este) | Commit A — canais RJ |

## Decisões do Wagner (com data)

- 2026-11-09: atendimento presencial no estande de cada empreendimento; rodapé com o endereço do próprio empreendimento; nunca mandar cliente para fora do funil; sem texto de justificativa; toda planta com foto oficial; peninsulacollection.com.br é site oficial da Tegra.
- 2026-11-10: galeria sem linha repetida; header do RIIO padronizado; card do hub abre no hero.
- 2026-11-10: metragens oficiais sem decimais — Gran Thai 125–405 m², Gaea 123–365 m² (também nos 2 cards da home de SP).
- 2026-11-10: páginas do Rio sem nada relacionado à Sabrina (questão do CRECI no RJ).
- 2026-11-10: canais separados RJ/SP (tabela acima); blog fora do escopo; form 47 criado com os campos do 46; rebaseline do bloco `form46` do RIIO autorizado.
- 2026-11-10: copy RJ aprovada (Commit A).
- 2026-11-10: **homepage exclusiva de São Paulo — USER_APPROVED, PENDING_IMPLEMENTATION**, entrega separada (seção 10 do documento de referência).

## Pendências

| # | Item | Dono |
|---|---|---|
| P5 | Commit B: GTM nas 8 páginas, identidade, form 47 (rebaseline do RIIO), `runtime`/`measurement-form`/`thank-you` com padrão 46, `/obrigado/` com canal RJ para o form 47, aviso neutro (V3), regra do marcador (V4), validador de dados pessoais (V6), `project_name` no GA4 (N1), validador e smoke de mensuração | Claude |
| P3 | Confirmar workspace 14 = versão publicada do GTM; dimensão `form_id` no GA4 | Wagner |
| P4 | Decidir se corrige os 2 defeitos do GTM (leitura de `mnt.consent.v2`; gatilhos de clique mortos) | Wagner |
| P6 | QA no LVR, merge, GTM Preview, DebugView, 1 lead controlado RJ e 1 SP | Wagner |
| P7 | Depois do merge: IndexNow/Search Console das URLs RJ | Wagner |
| P8 | Gate: no lead controlado, registrar o corpo da resposta da Green (sucesso × erro de negócio) | Wagner + Claude |
| P9 | Gate: consentimento em `/obrigado/` sem atualizações conflitantes e sem `generate_lead` duplicado | Claude (teste) |
| P11 | Homepage exclusiva de SP (entrega separada) | Claude, depois da #561 |

## Próxima ação (única)

Claude executa o Commit B (formulário 47 e mensuração no Rio) na mesma branch.

## Prompt de retomada

```
Retomada MoreNumTegra, frente Imobiliário. Leia ao vivo a branch feat/rio-enderecos-estandes-20261109, o arquivo docs/sfjm/HANDOFF.md e docs/sfjm/MNT_RJ_SP_CANAIS_ANALYTICS_2026-11-10.md. Confira se o head atual é o commit que trouxe este handoff (Commit A, filho de 10e5024). Se for, siga a próxima ação do handoff. Se divergir, pare e me diga.
```
