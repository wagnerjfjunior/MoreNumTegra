# Próxima Ação Segura — MoreNumTegra

> Registro autoritativo da única próxima ação segura.

- Definida em: `2026-08-28`
- Fonte canônica: `wagnerjfjunior/MoreNumTegra` / `main`
- Functional baseline: `docs/baseline/FUNCTIONAL_BASELINE_V2.md`
- Technical baseline: `docs/baseline/TECHNICAL_BASELINE_V2_2.md`
- ADR: `docs/adr/ADR-001-GREENN-BUILDER-MODULE-COMPOSITION.md`
- Estado: `GREEN_V1_OPERATIONAL_MAINTENANCE`

## 1. Ação imediata

Manter a produção Green estável e concluir somente a pendência operacional do domínio alternativo:

`www.moretegra.com.br`

No fechamento de 2026-08-28, a Green já mostrava o CNAME configurado e informava janela para validação de certificado.

Quando o status virar `Domínio OK`:

1. abrir `https://www.moretegra.com.br`;
2. confirmar certificado válido;
3. confirmar redirecionamento/canonicalidade desejada para o domínio principal;
4. não alterar DNS adicional sem necessidade comprovada.

## 2. Estado funcional já aprovado

Não repetir como gate bloqueante os itens já comprovados em produção:

- domínio raiz HTTPS;
- HTTP -> HTTPS;
- favicon;
- catálogo;
- filtros desktop/mobile;
- busca por bairro;
- ELO e ODE promocionais;
- WhatsApp;
- Form 46 submit real;
- persistência/origem/vendedor na Green;
- CTAs flutuantes atravessando módulos até o footer.

## 3. Mudanças futuras

Toda mudança material deve retornar ao fluxo canônico:

```text
GitHub branch/PR
-> Vercel Preview
-> validação
-> merge main
-> Vercel Production
-> Green Sales
-> smoke production
```

Não fazer remendo somente no builder Green.

## 4. Dados comerciais

Preço, unidade, promoção e disponibilidade são fatos mutáveis.

Ao alterar qualquer dado comercial:

- preservar fonte/evidência;
- identificar unidade;
- registrar DE/POR quando aplicável;
- confirmar disponibilidade;
- não inferir informação ausente.

## 5. Search / SEO / SEM

A retomada de SEO/SEM deve ocorrer via `blogs-sites-portais-seo` como Search Center of Expertise, preservando MoreNumTegra como Product Authority.

Implementação no MoreNumTegra só ocorre após handoff/recomendação e autorização correspondente.

## 6. Analytics

GA4, GTM, Meta Pixel, Speed Insights adicional e outras tags continuam sob gate específico.

Não habilitar por conveniência ou PR automática de plataforma.

## 7. Condições de parada

Parar se uma mudança:

- divergir entre GitHub, Vercel e Green;
- exigir dado comercial não comprovado;
- alterar Form 46 de forma não conhecida;
- introduzir analytics/pixels sem gate;
- exigir backend/CMS/FECH.AI/n8n/Make sem autorização específica.
