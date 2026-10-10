# RESF V2 — Gate 01: classificação de CI M4/M5 e Elo Duo

Data: 2026-10-10
Estado: READ-ONLY AUDIT / DRAFT PR #368
Baseline main: `9c8bdc74cb83dc9c9566f87d9288daf25f10c051`
PR #368 audit HEAD before this documentation: `54f6b18f0a52c630b4093b121bd85ba411e5a2c8`

## Regra de governança
**Falha preexistente não equivale a autorização para ignorá-la no release.** Registrar a causa e confirmar que não há regressão nova; os contratos de tracking e conversão não serão afrouxados apenas para fazer o CI ficar verde.

## Evidência objetiva

| Gate | Observação PR #368 | Evidência main / origem | Diagnóstico | Próxima ação |
|---|---|---|---|---|
| RESF V2 approved project postal addresses | PASS | [PR #368 run 38080469629](https://github.com/wagnerjfjunior/MoreNumTegra/actions/runs/38080469629) | Sem regressão nos 23 PostalAddress, com geo Elo Duo expressamente permitido | Manter bloqueio da estrutura JSON-LD |
| M4-05R metadata validation | FAIL: Home portal-links observer scoped/idempotent, text mutation guard e static moretegra.js include | `src-greenn/preview/index.html`, `src-greenn/portal-links.js`, `src-greenn/moretegra.js`, `scripts/validate-m4-05r.mjs` possuem **blob SHA idêntico** entre `main` e PR #368; [run 38080469661](https://github.com/wagnerjfjunior/MoreNumTegra/actions/runs/38080469661) | **Preexistente demonstrado por identidade de arquivos**; sem mudança nesses requisitos pela PR | Investigar se a Home tem comportamento divergente ou contrato estático obsoleto, em PR própria |
| M5-06 CTA/Form journey | FAIL em Bem Moema (form/CTA), Reserva/Garden (CTA) e mapas de 11 páginas | [Main run 37639032034](https://github.com/wagnerjfjunior/MoreNumTegra/actions/runs/37639032034) de 2026-10-07 falha com o mesmo conjunto; [PR #368 run 38080469753](https://github.com/wagnerjfjunior/MoreNumTegra/actions/runs/38080469753) | **Preexistente demonstrado por histórico de CI main** | Auditar código/DOM dos CTAs e mapas; preservar as jornadas reais antes de mudar validador |
| Elo late GTM bootstrap slice 07 | Static checks PASS; browser consent test FAIL: a primeira entrada é `default_consent` quando esperava `gtm.js` | [Main run 36778073090](https://github.com/wagnerjfjunior/MoreNumTegra/actions/runs/36778073090), 2026-09-30, mesmo `AssertionError` e valores actual/expected; [PR run 38080469655](https://github.com/wagnerjfjunior/MoreNumTegra/actions/runs/38080469655) | **Preexistente demonstrado por histórico main** | Auditar Consent Mode/GTM e validar ordem exigida pelo contrato; não trocar sequência sem impacto mensurado |
| Elo responsive hero slice 08 | **Teste estático de hero PASS**; **browser smoke PASS** em 393×852 DPR 2.75 e 360×800 DPR 2; workflow falha no passo posterior `Preserve CTA/Form journey contract` | [PR run 38080469619](https://github.com/wagnerjfjunior/MoreNumTegra/actions/runs/38080469619) | **Hero responsivo aprovado dentro do workflow**; vermelho herdado do M5-06 de escopo geral | Extrair status separado dos testes do Elo; não reescrever hero |
| Commercial page standard / Social sharing / Favicon | PASS | [PR #368 Actions](https://github.com/wagnerjfjunior/MoreNumTegra/pull/368/checks) | Sem falha identificada nas verificações enumeradas | Preservar baseline |

## Identidade de arquivos entre main e PR #368

- `src-greenn/preview/index.html`: `a55eddf3b5a9d5448a66f7db5c9e60b032be1d4d`
- `src-greenn/portal-links.js`: `6b47f7b29c07927af550765119f06fea47159658`
- `src-greenn/moretegra.js`: `1f7368472c789988bdafd85b10e92b649ab86db6`
- `scripts/validate-m4-05r.mjs`: `877c45dc6ec14fc17dd86fac7457ee3ac9682ec5`
- `scripts/validate-m5-10-elo-late-gtm-bootstrap-slice07.mjs`: `6b7f877b686b3e587fa6111c0bf7aec62bd55ab4`
- `scripts/validate-m5-10-elo-responsive-hero-slice08.mjs`: `f4645994059fdbe80882e3580af33015017d65e7`

## Próximo gate

1. Catalogar para cada falha se o teste está desatualizado ou o comportamento real difere do contrato; auditar browser e eventos GTM em ambiente isolado.
2. Preparar correções isoladas, **sem alterações fora do escopo na PR de PostalAddress**.
3. Integrar PRs #364, #366, #367, #368 em **branch candidata única**, preservando simultaneamente imagem principal, geolocalização Elo Duo, endereços e contratos JSON-LD.
4. Homologar Preview Vercel (mobile e formulários), conferir regressões com fonte canônica, só depois solicitar autorização de merge/release.
5. Nenhuma reindexação antes do release consolidado.
