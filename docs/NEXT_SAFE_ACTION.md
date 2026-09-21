# Próxima Ação Segura — MoreNumTegra

Atualizado em `2026-09-21`.

```text
MNT-M5-07 = ACTIVE / SOURCE_PRODUCTION_PASS / GTM_PREVIEW_PASS / GTM_PUBLISH_REQUIRED
MNT-M5-08 = PLANNED / BLOCKED_BY_M5_07_PUBLISH_AND_PRODUCTION_VERIFICATION
MNT-M5-10 = PLANNED_NOT_AUTHORIZED

MAIN_RUNTIME = 6dc362a63de8b797082fb1c7b4ac70a8a5aa2ae8
PRODUCTION_DEPLOYMENT = dpl_AWHaTzE4UrJQaZ3LnKqhEMd8wsBs
PRODUCTION_STATE = READY
PRODUCTION_SEMANTIC_RUN = 35596887663 / SUCCESS
GTM_CONTAINER = GTM-PGCR4R47
GTM_PREVIEW = PASS / QUICK_PREVIEW
```

## Única próxima ação segura

Publicar a versão testada do container `GTM-PGCR4R47`.

Após a publicação:
1. registrar o identificador/nome da versão publicada;
2. executar um único lead real de validação fora do modo Preview;
3. confirmar no Tag Assistant/Pixel Helper que `generate_lead` envia `project_name` e `offer_name`;
4. confirmar ausência de PII;
5. só então encerrar M5-07 e liberar M5-08.

Não alterar value/currency, enhanced conversions, Form 46, DNS/canonical ou M5-10.
