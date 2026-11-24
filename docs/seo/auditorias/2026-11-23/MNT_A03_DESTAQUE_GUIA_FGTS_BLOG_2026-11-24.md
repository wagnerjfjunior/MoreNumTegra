# A03 — Destaque editorial do guia FGTS na capa do blog

Data: 2026-11-24. Escopo: etapa A03 da auditoria SEO A01–A15 (PR #597). Status: CANDIDATO EM PR — SEM MERGE.

## Autorização e premissas
- Wagner respondeu "ok, siga" após recomendação expressa de retomar a auditoria, reconciliar SFJM e iniciar A03 em PR isolada. **Não autoriza merge, deploy ou IndexNow.**
- Base inicial observada no GitHub: `main 5629c9035a6f60be002e9ebe03bfc225544f1d4b` (inclui PR #601).
- Guia existente: `/blog/mercado/usar-fgts-comprar-apartamento/`, canonical próprio e `index,follow` no HTML. Hub Mercado já o referencia.

## Alteração de escopo exato
Arquivo HTML único de runtime: `src-greenn/blog/index.html`; o `sitemap.xml` recebe apenas o `lastmod` atualizado de `/blog/` (2026-11-24) para atender ao validador existente.

No bloco editorial “Leituras que ajudam a decidir”, trocar **apenas a terceira chamada** (Lapa ou Vila Anastácio) por:
- Rótulo: **Mercado · Financiamento**.
- Título: **Como usar o FGTS para comprar apartamento?**
- Descrição: **Regras, entrada e o que conferir antes de escolher seu imóvel**.
- Destino HTML rastreável: `/blog/mercado/usar-fgts-comprar-apartamento/`.

A matéria Lapa/Vila Anastácio **continua acessível** na editoria de bairros da própria capa; não é retirada do blog. Layout existente de três cards e classes `featured-story` são mantidos, sem CSS novo nem imagens adicionais.

## Gates de validação
1. Conferir diff: somente um `<a>` alterado na vitrine editorial; preservar todos os outros links e conteúdo.
2. Conferir destino existente, canonical próprio, robots `index,follow`; manter title, description, H1 único, JSON-LD e canonical da capa idênticos à main. No sitemap, alterar apenas `/blog/` de `lastmod 2026-11-14` para `2026-11-24`, mantendo 84 entradas.
3. Confirmar Form46, canal SP, WhatsApp e consentimento inalterados.
4. LVR `localhost:8080/blog/` no head exato: 360 / 390 / 430 / 900 / 1440px; testar toque no card até o guia e a partir dele o CTA FGTS. Sem Preview remoto e sem lead real.
5. CI do commit exato, QA visual/legibilidade, ausência de overflow, teste no navegador conforme disponibilidade.
6. Somente após **nova autorização específica**: merge, Vercel Production READY, URL pública e rollback. Não atribuir aumento de CTR/ranking antes de GSC posterior.

## Cuidados editoriais
A chamada não afirma elegibilidade universal ao FGTS nem direciona automaticamente a qualquer imóvel como elegível. Não menciona preço, prazo ou valor não verificado. SEO não depende de repetir a mesma expressão em excesso: um link contextual é suficiente para o piloto A03.

## Fora do escopo
A01/A02 já integradas; A04–A15 não iniciadas neste candidato. PR #598 (documentação SFJM) e PR #597 (auditoria documental) não são mescladas por esta alteração. Nenhuma alteração adicional de sitemap além de `/blog/` `lastmod`, schema, campanhas, scripts de analytics ou validadores.

## Automação de regressão adicionada

- `.github/diagnostics/a03-blog-fgts-smoke.mjs` e workflow `.github/workflows/a03-blog-fgts-smoke.yml` executam Chromium local com media externa bloqueada; 360/390/430/900/1440, navegação `/blog/` → guia, H1/canonical, artigo Lapa preservado, overflow horizontal e zero POST. Ver resultado efetivo do GitHub Actions no head exato; inclusão do teste não é PASS por si só.
