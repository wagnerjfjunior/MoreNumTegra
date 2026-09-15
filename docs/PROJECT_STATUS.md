# Status do Projeto

Estado reconciliado para revisão em `2026-09-14`.

Fonte canônica integrada: GitHub `main`. Esta branch/PR é proposta até merge.

## Produção atual

```text
WEB PRODUCTION = Vercel
CANONICAL HOST = https://www.moretegra.com.br/
APEX = 308 -> www
DNS = Cloudflare authoritative / DNS only
GREEN/GDIGITAL = Form 46 provider + CRM
LP = Green/GDigital fallback / non-canonical
```

Technical baseline vigente: `docs/baseline/TECHNICAL_BASELINE_V2_3.md`.

Decision record: `docs/adr/ADR-006-VERCEL-COMMERCIAL-PRODUCTION-WWW-CANONICAL.md`.

Cutover evidence: `docs/infra/MNT_VERCEL_WWW_COMMERCIAL_CUTOVER_CLOSEOUT_2026-09-14.md`.

MNT-M4-09 está `COMPLETE / MERGED` na PR #82, merge commit `a5c3766d93aa4b8ae76acfd6d544f03b204b9b20`. O fechamento técnico de `www`, canonical, robots e sitemap permanece válido.

## Programa MNT-RESF

Estado de adjudicação proposto após auditoria:

```text
M0 = COMPLETE
M1 = COMPLETE
M2 = COMPLETE conforme evidência canônica já aceita
M3 = ACCEPTED WORK / RESF WAVE-2 RECONCILIATION REQUIRED
M4 = CLOSURE UNDER RESF CONFORMANCE REVIEW
M5 = PAUSED FOR NEW EXECUTION
```

Motivo do re-review M3/M4:
- o manifesto RESF Wave 1 deixava Search Contract, SEO, Content, Schema, GEO/AEO, Linking e Performance como `deferred`;
- trabalho M3/M4 foi executado nesses domínios sem uma atualização canônica de adoção;
- M4-04 definiu um entity/schema contract amplo, mas M4-05 expandiu runtime apenas com `FAQPage`;
- Product Authority apresentou evidência atual de que a home MoreNumTegra não gera item detectável no Google Rich Results Test, enquanto o benchmark Capri expõe múltiplas classes válidas;
- o objetivo agora é corrigir a conformidade e a efetividade sem descartar pesquisa/contratos que continuam válidos.

Documentos desta reconciliação:
- `docs/reviews/MNT_RESF_M3_M4_CONFORMANCE_AUDIT_2026-09-14.md`;
- `docs/frameworks/resf/WAVE_2_ADOPTION_RECONCILIATION_2026-09-14.md`;
- `docs/frameworks/resf/ADOPTION.yaml` atualizado na proposta de Wave 2.

Ação segura: ver `docs/NEXT_SAFE_ACTION.md`.

Nenhuma mudança de produção, DNS, Measurement, Form 46 ou plataforma externa é autorizada por esta auditoria.
