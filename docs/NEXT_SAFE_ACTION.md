# Próxima Ação Segura — MoreNumTegra

Atualizado em `2026-09-21`.

```text
MNT-M5-09 = COMPLETE / CONVERSION_QA_PASS / NO_RUNTIME_MUTATION
MNT-M5-10 = ACTIVE / SLICE_01_AUTHORIZED / ELO_DUO_TWO_IMAGE_TRIAL

MAIN = 02f1a5caf792ee5f527c125c8f3e52a1db05df5c
EFFECTIVE_PRODUCTION_RUNTIME_SHA = 6dc362a63de8b797082fb1c7b4ac70a8a5aa2ae8
PRODUCTION_DEPLOYMENT = dpl_AWHaTzE4UrJQaZ3LnKqhEMd8wsBs
PRODUCTION_STATE = READY
MEDIA_PROBE_RUN = 35606609562 / SUCCESS
```

## Única próxima ação segura

Implementar somente o slice 01 autorizado de M5-10 no Elo Duo:

- hero -> Green WebP da fachada;
- Rua Jardim/complexo -> Green WebP do complexo;
- atualizar dimensões intrínsecas para os arquivos reais;
- preservar lazy loading da imagem abaixo da dobra;
- preservar Search/Form46/Measurement/CTA/WhatsApp;
- rodar checks exact-head;
- merge;
- medir Production com 3 runs mobile e comparar a mediana ao baseline M5-02.

Parar antes de qualquer outro slice M5-10.
