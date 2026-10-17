# Correção de consentimento no agradecimento — 17/10/2026

## Diagnóstico reconciliado

O bootstrap de src-greenn/preview/obrigado.html e o runtime compartilhado já restauram mnt.consent.v2. O adaptador thank-you-measurement.js ainda lia V1. Portanto a hipótese anterior de ausência total de restauração V2 era incompleta: o risco específico é reaplicar uma escolha antiga, inclusive um aceite V1 após recusa V2.

## Implementação

Adaptador passa a ler somente mnt.consent.v2, como o restante da página. Não migra aceite legado nem concede consentimento na ausência de V2 válido. Host canônico e marcador de lead permanecem inalterados. Não altera GTM/GA4, CRM ou páginas comerciais.

## Validação

node scripts/test-vercel-thank-you-consent.mjs PASS: combinações V1/V2, recusa atual contra aceite legado, V2 ausente/inválido, localhost, unicidade e consumo de marcador V2, timestamps expirado/futuro. Isolado, sem rede. node scripts/validate-m5-07-lead-semantics.mjs PASS; node --check e git diff --check PASS.

## GTM observado diretamente

Contêiner GTM-PGCR4R47; workspace Default Workspace, zero mudanças pendentes. Tag GA4 - Event - generate_lead - mnt_lead_success, ID 51: measurement ID G-57M2XR0CY2, event generate_lead, gatilho CE - mnt_lead_success. Parâmetros incluem contexto controlado project_name/offer_name e metadados, sem campos nome/e-mail/telefone no formulário de configuração observado. Consent checks nativos incluem analytics_storage e sinais de anúncios. Nenhuma configuração alterada. A inspeção do workspace não comprova recebimento de hit nem substitui conferência da versão publicada.

## CRM e gates

CRM OK: USER_CONFIRMED por Wagner nesta conversa em 17/10. Não reinterpretar como auditoria independente de todos os campos e roteamento. Nenhum novo lead enviado.

Correção testada e proposta por PR; produção inalterada até merge/deployment. Após autorização de publicação: resolver deployment e SHA, verificar script servido, validar consentimento e observar um sucesso real autorizado no Tag Assistant/GA4. Não fabricar mnt_lead_success em produção para simular conversão. Rollback: reverter o commit de correção por PR, mantendo rastreabilidade. Higienópolis PR #422 permanece separada. NEXT_SAFE_ACTION global Órbita preservada.
