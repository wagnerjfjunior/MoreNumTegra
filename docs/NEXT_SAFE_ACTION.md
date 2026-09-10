# Próxima Ação Segura — MoreNumTegra

> Registro autoritativo da única próxima ação segura.

- Definida em: `2026-09-10`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra` / `main` após lifecycle aplicável
- Release comercial atual: `18cfab98e01be29c86d78d08f2f5035a8da70444`
- Programa: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Estado candidato: `MNT-M2_ACTIVE_READ_ONLY_DESIGN / MNT-M2-01_ACTIVE_PARTIAL_EVIDENCE`
- Base canônica observada no início: `347b62298d30ba3567a76d3f48a815e9f0f5b26c`

## 1. Estado de entrada

O V1 continua operacional em produção comercial Green e Search/indexability P0-B permanece `PASS_WITH_RESIDUAL_RISK`.

MNT-M1 está concluído. A Product Authority autorizou explicitamente seguir para a próxima task planejada do MoreNumTegra. A autorização é interpretada de forma bounded como início de `MNT-M2-01 — Inventory tracking already present in live runtime` em `READ_ONLY / DESIGN`.

Isso **não** autoriza implementação de tracking.

Current-state overlay:
`docs/sfjm/CURRENT_PROGRAM_STATE.json`.

Inventário em execução:
`docs/measurement/MNT_M2_01_TRACKING_RUNTIME_INVENTORY_2026-09-10.md`.

## 2. Única próxima ação segura

Completar **MNT-M2-01** com uma captura `READ_ONLY` do runtime comercial:

1. inspecionar DOM/scripts carregados em `https://moretegra.com.br/`;
2. inspecionar Network sem enviar formulário/PII;
3. classificar chamadas/bootstrap de GTM, GA4, Meta, Google Ads e scripts de measurement da plataforma Green, se existirem;
4. separar `PROJECT_OWNED` de `PLATFORM_INJECTED`;
5. registrar unknowns como `NOT_PROVEN`;
6. não instalar, alterar, publicar ou disparar configuração de tracking.

Estado atual da task:

```text
MNT-M2 = ACTIVE_READ_ONLY_DESIGN
MNT-M2-01 = ACTIVE_PARTIAL_EVIDENCE
CURRENT_ACTIVE_PHASE = MNT-M2
CURRENT_ACTIVE_TASK = MNT-M2-01
NEXT_WITHIN_TASK_ACTION = READ_ONLY_RUNTIME_NETWORK_DOM_CAPTURE
```

## 3. Evidência já obtida em MNT-M2-01

O levantamento project-owned já encontrou:

```text
PROJECT_OWNED GTM bootstrap = NOT_OBSERVED
PROJECT_OWNED GA4/gtag/dataLayer = NOT_OBSERVED
PROJECT_OWNED Meta fbq/connect.facebook.net = NOT_OBSERVED
PROJECT_OWNED sendBeacon measurement = NOT_OBSERVED
Vercel preview project-owned tracking = NOT_OBSERVED
Green Form 46 lead capture = PRESENT
Search Console = PRESENT AS SEARCH OBSERVABILITY
Green/platform-injected tracking = NOT_PROVEN
Consent enforcement = NOT_PROVEN
```

`NOT_OBSERVED_IN_PROJECT_SOURCE != ABSENT_FROM_LIVE_RUNTIME`.

## 4. Progresso programático

Enquanto MNT-M2-01 estiver ativa e não aceita:

```text
forecast total                = 1240h
accepted scope-equivalent     = 256h
remaining forecast            = 984h
program progress              = 20.65%
```

As 8h planejadas de MNT-M2-01 não entram como concluídas antes do exit criteria da task.

## 5. Gates externos preservados

A autorização de MNT-M2-01 **não** autoriza:

- criar/publicar container GTM;
- criar/configurar GA4;
- instalar Meta Pixel/Dataset/CAPI;
- configurar Pixel/integrações na Green;
- mudar consentimento runtime;
- configurar Google Ads/conversões/campanhas/spend;
- alterar DNS;
- mutar Search Console;
- publicar Vercel Production;
- publicar Green commercial production;
- FECH.AI/n8n/Make.

Cada mutação continua exigindo autorização específica depois do desenho/evidência aplicável.

## 6. Condições de saída de MNT-M2-01

MNT-M2-01 só pode ser encerrada quando:

- inventário project-owned estiver registrado;
- runtime comercial estiver inspecionado read-only;
- scripts/requests de measurement estiverem classificados por provenance;
- unknowns permanecerem explícitos;
- nenhuma mutação tiver sido realizada.

Depois disso, o próximo candidato será `MNT-M2-02 — Define transport architecture and duplicate-event prevention`, ainda sujeito ao lifecycle/autoridade aplicável.

## 7. Condições de parada

Parar diante de:

- necessidade de instalar/alterar qualquer tag para concluir o inventário;
- necessidade de enviar PII/formulário para obter evidência;
- tentativa de inferir ausência no runtime a partir de ausência no GitHub;
- divergência material entre current-state overlay, read model, handoff e status;
- mutação externa implícita;
- dado externo não verificado.

`READ_ONLY INVENTORY != TRACKING IMPLEMENTATION`.
