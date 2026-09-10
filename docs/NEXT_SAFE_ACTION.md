# Próxima Ação Segura — MoreNumTegra

> Registro autoritativo da única próxima ação segura.

- Definida em: `2026-09-10`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra` / `main` após lifecycle aplicável
- Release comercial atual: `18cfab98e01be29c86d78d08f2f5035a8da70444`
- Programa: `MNT-RESF — MoreNumTegra Search-to-Lead 2026`
- Estado candidato: `MNT-M2-01_COMPLETE_CANDIDATE / MNT-M2-02_PLANNED_NOT_AUTHORIZED`
- Base canônica observada no início de MNT-M2-01: `347b62298d30ba3567a76d3f48a815e9f0f5b26c`

## 1. Estado de entrada

O V1 continua operacional em produção comercial Green e Search/indexability P0-B permanece `PASS_WITH_RESIDUAL_RISK`.

MNT-M1 está concluído. A Product Authority autorizou MNT-M2-01 em `READ_ONLY / DESIGN`; a tarefa foi executada sem mutação e seu exit criteria de evidência foi satisfeito com inspeção project-owned + DevTools/HAR do runtime comercial.

Evidência:
`docs/measurement/MNT_M2_01_TRACKING_RUNTIME_INVENTORY_2026-09-10.md`.

Principais fatos observados:

```text
Green/GDigital POST /page/view = OBSERVED / PLATFORM_INJECTED
GTM = NOT_OBSERVED IN CAPTURED SESSION
GA4 / gtag / dataLayer = NOT_OBSERVED IN CAPTURED SESSION
Meta Pixel / fbq = NOT_OBSERVED IN CAPTURED SESSION
Clarity / Hotjar / DoubleClick = NOT_OBSERVED IN CAPTURED SESSION
YouTube embedded-player telemetry = OBSERVED / THIRD_PARTY_MEDIA
Consent enforcement = NOT_PROVEN
```

## 2. Única próxima ação segura

A única próxima ação segura é concluir o lifecycle da **PR #41** que registra MNT-M2-01.

Enquanto a PR #41 não estiver integrada em `main`:

```text
MNT-M2-01 = COMPLETE_CANDIDATE / PENDING_PR_LIFECYCLE
MNT-M2-02 = PLANNED_NOT_AUTHORIZED
CURRENT_ACTIVE_TASK = NONE
NEXT_TASK_CANDIDATE = MNT-M2-02
```

Depois de MNT-M2-01 ser aceita canonicamente, `MNT-M2-02 — Define transport architecture and duplicate-event prevention` continua dependente de autorização explícita da Product Authority.

## 3. Carry-forward obrigatório para MNT-M2-02

A futura arquitetura de transporte/deduplicação deve considerar, no mínimo:

1. Green/GDigital já registra `POST https://back.gdigital.com.br/page/view`;
2. a captura observada gerou um page-view para `www.moretegra.com.br` com `page_id=293` e outro para `moretegra.com.br` com `page_id=292` durante a mesma sequência de navegação;
3. isso cria risco concreto de dupla contagem quando eventos project-owned forem adicionados;
4. YouTube em `youtube-nocookie.com` produz telemetria própria de playback/QoE/watchtime/log_event e não deve ser confundido com conversão do MoreNumTegra;
5. GTM/GA4/Meta não foram observados no runtime capturado, portanto uma futura arquitetura não deve presumir containers/IDs existentes.

## 4. Progresso programático pretendido após merge da PR #41

```text
forecast total                = 1240h
accepted scope-equivalent     = 264h
remaining forecast            = 976h
program progress              = 21.29%
```

As 8h de MNT-M2-01 só passam a ser aceitas canonicamente após integração da PR #41 em `main`.

## 5. Gates externos preservados

MNT-M2-01 concluída **não** autoriza:

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

## 6. Condições de parada

Parar diante de:

- tentativa de iniciar MNT-M2-02 sem autorização explícita;
- tentativa de tratar `NOT_OBSERVED` como impossibilidade de existência futura;
- tentativa de classificar a telemetria YouTube como GA4/Ads sem evidência;
- tentativa de tratar os dois Green page views como defeito confirmado antes da análise de transporte/dedup;
- mutação externa implícita;
- dado externo não verificado.

`MNT-M2-01 COMPLETE != MNT-M2-02 AUTHORIZED`.
