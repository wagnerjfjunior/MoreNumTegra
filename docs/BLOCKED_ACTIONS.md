# Ações Bloqueadas — MoreNumTegra

- Atualizado em: `2026-09-14`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra` / `main`
- Functional baseline: `docs/baseline/FUNCTIONAL_BASELINE_V2.md`
- Technical baseline: `docs/baseline/TECHNICAL_BASELINE_V2_2.md`
- ADRs: `docs/adr/ADR-001-GREENN-BUILDER-MODULE-COMPOSITION.md`, `docs/adr/ADR-002-VERCEL-MANUAL-GATE-DRIVEN-DEPLOYMENT.md`, `docs/adr/ADR-003-CLOUDFLARE-AUTHORITATIVE-DNS-VERCEL-CUSTOM-DOMAINS.md`, `docs/adr/ADR-004-VERCEL-GIT-DRIVEN-AUTOMATIC-DEPLOYMENT.md`
- Runtime Measurement evidence: `docs/measurement/MNT_M2_10_LIVE_QA_UPDATE_2026-09-13.md`
- Regra: ausência nesta lista não constitui autorização.

## 1. Baseline runtime aceita após MNT-M2

```text
MNT-M2 = COMPLETE
MNT-M2-10 = COMPLETE / ACCEPTED_WITH_V1_RESIDUAL
GTM = GTM-PGCR4R47
GA4 property_id = 553742649
GA4 stream_id = 15759638334
GA4 measurement_id = G-57M2XR0CY2
primary source event = mnt_lead_success
GA4 primary mapping = generate_lead
```

Historical design documents preserve their point-in-time observations. Meta Dataset/Pixel identifiers remain `NOT_PROVEN`; Meta runtime/CAPI remain not implemented/not authorized.

## 2. Bloqueios ativos — código / Green / Vercel

| Ação bloqueada | Motivo | Condição de liberação |
|---|---|---|
| correção manual somente na Green sem atualizar GitHub | cria drift da fonte canônica | alterar via branch/PR e manter artefato consolidado sincronizado |
| usar formulário customizado `fetch` como produção | Form 46 nativo está validado | necessidade comprovada + nova decisão arquitetural |
| interceptar/bloquear submit nativo do Form 46 | risco de quebrar lifecycle Green | preservar lifecycle nativo |
| usar seletor global `form` para mutação/interceptação | risco de colisão com builder | usar seletor específico verificado |
| colar módulos JS separados na página 292 | Green possui um único slot JS e a unidade de release é consolidada | usar `src-greenn/moretegra.js` completo |
| declarar Git-driven Vercel end-to-end validado sem evidência live | ADR-004 muda a política, mas configuração != validação | provar Preview automático e Production automático correspondente ao Git |
| declarar Vercel atualizado sem deployment/evidência | runtime pode estar em drift | observar deployment correspondente ao SHA esperado e executar smoke test |
| promover/deployar Vercel diferente do `main` aprovado | drift de homologação/produção | alinhar ao SHA aprovado |
| indexar superfície Vercel como origem comercial antes do gate SEO/hosting | apex Green ainda é produção comercial atual | decisão Search/hosting específica |
| segredo/token no HTML/JS | risco de segurança | arquitetura segura aprovada |

ADR-004, quando integrado, supersede o bloqueio histórico de restaurar deployments automáticos por Git. O Deploy Hook manual deixa de ser o caminho canônico normal, mas a nova política só pode ser declarada operacionalmente validada após evidência live.

## 3. Bloqueios ativos — Measurement / GA4 / consent / lead validity

| Ação bloqueada | Motivo | Condição de liberação |
|---|---|---|
| publicar nova versão GTM ou alterar configuração aceita sem novo gate | MNT-M2 está fechado | autorização corretiva/evolutiva explícita + QA |
| adicionar segundo container GTM para a mesma superfície | viola single-dispatcher | decisão arquitetural superseding explícita |
| adicionar `gtag()` direto project-owned fora do GTM | pode duplicar dispatch | decisão arquitetural superseding explícita |
| criar property/stream GA4 duplicados | assets aceitos já estão provados | necessidade comprovada + autorização específica |
| substituir IDs GA4 por inferência | IDs aceitos são observados e canônicos | nova evidência/governança explícita |
| encaminhar Green `gtm.formSubmit` como evento de negócio GA4 | pode carregar PII e não é source event canônico | proibido salvo nova arquitetura privacy/taxonomy explícita |
| criar `form_submit` redundante como conversão | duplicaria semântica de `mnt_form_submit_attempt`/`generate_lead` | revisão explícita da taxonomy/conversion contract |
| marcar `mnt_form_start` ou `mnt_form_submit_attempt` como conversão | M2-04 os classifica como `NONE` | revisão explícita do contrato |
| emitir `mnt_lead_success` por CTA/foco/submit attempt | não representa lead aceito | somente lifecycle governado de lead |
| declarar o gate client-side da página 294 como autenticação server/provider | residual aceito não fornece prova criptográfica/provider | arquitetura futura de handoff/callback autenticado + novo gate |
| usar preço de imóvel/oferta como conversion value | preço de imóvel não é valor de lead | modelo governado de lead value futuro |
| definir valor monetário default para `generate_lead` por inferência | nenhuma monetização do lead foi aprovada | modelo de valor aprovado |
| enviar nome/email/telefone/valores digitados em Measurement | visitor PII fora do contrato v1 | nova arquitetura privacy/security explícita |
| enviar texto bruto da busca do catálogo | campo livre pode conter dado pessoal inesperado | manter somente estado/classificação/result_count |
| habilitar user-provided data / enhanced conversions / advanced matching / hashed PII | advertising-user-data features não foram autorizadas | arquitetura privacy + gate específico |

## 4. Bloqueios ativos — Search / research

- converter evidência de demanda em intenção/page owner sem os respectivos gates;
- inventar volume, posição, tendência, concorrente, intenção ou demanda;
- alterar Search Console para produzir evidência sem gate;
- transformar recomendação de Search em implementação sem autorização;
- publicar claim comercial sem fonte governada.

## 5. Bloqueios ativos — Meta / Ads

| Ação bloqueada | Motivo | Condição de liberação |
|---|---|---|
| inventar Meta Dataset ID, Pixel ID, Business ID ou relacionamento | assets não estão provados | observar/provar antes de registrar/usar |
| criar Dataset/Pixel só porque IDs não constam no GitHub | `NOT_PROVEN != DOES_NOT_EXIST` | resolver asset existente ou obter autorização de criação |
| adicionar `fbq()` direto project-owned | viola single browser dispatcher | decisão arquitetural superseding explícita |
| configurar Meta Standard Events/Custom Conversions por inferência | vendor mapping/optimization não está definido | gate específico + contrato explícito |
| habilitar Meta CAPI/partner gateway/server transport | exige consent, identidade e dedup específicos | arquitetura + autorização + QA |
| inferir website Pixel/Dataset ownership de Facebook Page/Lead Ads/Green CRM/ad account | superfícies distintas | evidência específica do asset |
| instalar/configurar Google Ads conversion tags | Ads attribution pertence a fase/gate futuro | autorização aplicável |
| vincular GA4 a Google Ads/outro produto | gate futuro separado | autorização específica |
| campaign/spend | fora do escopo atual | autorização específica |

## 6. Bloqueios ativos — Search / DNS / conteúdo

- novos ajustes DNS/domínio sem gate;
- tratar o `www` 308 temporário para `lp` como arquitetura SEO final sem evidência e decisão específica;
- declarar canonical Green static/SSR implementado sem evidência correspondente;
- inserir canonical/body ou expandir JSON-LD/OG/Twitter fora dos contratos aprovados;
- novas mutações Search Console sem gate;
- publicar dado comercial não verificado;
- copiar conteúdo/design de referência externa;
- keyword stuffing ou schema sem conteúdo visível/factual correspondente.

## 7. Baselines Measurement aceitas

### Consent

```text
GTM = GTM-PGCR4R47
default = denied all four
Green Continuar = granted all four
Green Cancelar = denied all four
persistence after reload = validated in accepted M2 evidence
```

### Transport / dedup

```text
moretegra.com.br = project Measurement production host
GTM-PGCR4R47 = sole project-owned browser dispatcher
one project page-view path per canonical document load = validated for M2 accepted runtime
```

### Canonical event taxonomy / conversions

```text
PRIMARY source = mnt_lead_success
GA4 primary destination = generate_lead
SECONDARY project intents = request_conditions / request_project_conditions / negotiate_scenario / schedule_visit / whatsapp_contact
NONE = page/section/filter/search/project_interest/form_start/form_submit_attempt
LEAD_CONVERSION_VALUE = NOT_DEFINED
```

## 8. Green Sales — permitido

A produção comercial Green V1 permanece operacional enquanto o apex não for migrado por gate próprio.

Permitido após lifecycle/gate aplicável:

- manutenção dos mesmos artefatos derivados de `main`;
- atualização controlada de `src-greenn/moretegra.js` como unidade única da página 292;
- atualização controlada do artefato próprio da página 294;
- smoke test após publicação.

## 9. Regras de interpretação

- `main mergeada` != `Vercel deployment observado`.
- `Vercel deployment observado` != `smoke test aprovado`.
- `Git-driven policy configured` != `Git-driven policy validated`.
- `Green atualizada` != `future work authorized`.
- `tool capability` != `authorization`.
- `GA4 generate_lead Key event` != `Google Ads conversion configured`.
- `www Domínio OK` != `redirect SEO final aprovado`.
- `planned WBS` != `authorized execution`.
- `client-side lead gate` != `provider-authenticated success`.

## 10. Sequência operacional vigente após ADR-004 aceito

```text
PROJECT DESIGN / EVIDENCE
-> MORENUMTEGRA DECISION
-> CHANGE / BRANCH
-> VERCEL PREVIEW AUTOMÁTICO
-> OWNER VALIDATION
-> MERGE MAIN
-> VERCEL PRODUCTION AUTOMÁTICO
-> PRODUCTION/HOMOLOGATION SMOKE
-> GREEN SALES WHEN STILL APPLICABLE
```

O domínio principal comercial permanece `https://moretegra.com.br/` enquanto a migração do apex não for autorizada e validada separadamente.
