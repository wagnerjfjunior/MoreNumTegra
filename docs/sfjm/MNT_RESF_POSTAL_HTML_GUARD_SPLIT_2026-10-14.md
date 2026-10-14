# SFJM — separação dos gates PostalAddress e HTML regression (2026-10-14)

## Decisão e escopo
Solicitação expressa da Product Authority: retirar a proteção rígida de HTML do validador postal e colocá-la em validador de regressões próprio, **sem reduzir proteção**. Branch `refactor/resf-postal-html-regression-separation-20261014` independente da PR #405.

## Contratos
- `scripts/validate-resf-v2-postal-address-contract.mjs`: preserva 23 projetos, 16 alterações históricas, sete endereços historicamente completos, contrato de `PostalAddress`, CEP, coerência com os dados estruturados, integridade de entidades e geo do Elo Duo. Não aplica comparação do HTML visível.
- `scripts/validate-resf-html-regression.mjs`: protege as sete páginas com `PostalAddress` previamente completo, usando o mesmo commit baseline `9c8bdc74cb83dc9c9566f87d9288daf25f10c051`. Normaliza **somente** o script JSON-LD para comparação, tal como a proteção legada.
- Exceção Bem Moema Studios & Offices: preserva exatamente os checks específicos do validador anterior (Form46 intacto, três fotos de bairro distintas com origem e créditos controlados, estilos do formulário, mídia original, scripts, facts mobile, ausência de CSS hero-meta e link regional).
- Exceção Mozae Higienópolis: permite nenhuma ou **exatamente uma** inserção literal da orientação aprovada para solicitar Sabrina da Tegra no estande, com URL `wa.me/5511960779328`; remove somente esse fragmento para comparar integralmente o HTML restante ao baseline. Isso comporta tanto a main anterior quanto a PR #405, sem desproteger texto, mídia, scripts ou formulário.
- Workflow `.github/workflows/resf-v2-postal-address-contract.yml`: jobs **postal** e **regression** independentes, com `fetch-depth: 0`, Node 22 e hard fail em alteração indevida.

## Não escopado
- Não afrouxar validações comerciais/SEO/FAQ/Form46.
- Não aprovar ajustes editoriais adicionais da página Mozae com base na exceção Sabrina; alterações novas exigem autorização delimitada e novo gate.
- Não alterar produção, DNS, formulários, tracking, preço, localização ou mídia.
- A PR #405 segue independente, com CI `validate` apresentando débito histórico comprovado em `main`.

## Critérios de conclusão
- `postal` e `regression` passaram no head exato.
- Teste negativo: troca arbitrária de HTML e duplicação da frase Sabrina devem ser recusadas pelo guard.
- SFJM registra merge SHA e Vercel apenas quando comprovados.
- Produto segue pelo fluxo GitHub → Vercel Preview/local Live Sync → aprovação → release → Greenn quando aplicável.
