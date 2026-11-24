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

A matéria Lapa/Vila Anastácio **continua acessível** na editoria de bairros da própria capa; não é retirada do blog. Layout existente de três cards e classes `featured-story` são mantidos, sem imagens adicionais. O CSS recebe apenas uma regra escopada no mobile para permitir quebra de linha dos links longos de `.featured-heading .section-more`.

## Gates de validação
1. Conferir diff: somente um `<a>` alterado na vitrine editorial; preservar todos os outros links e conteúdo; uma regra CSS mobile é adicionada apenas à `.featured-heading .section-more` para corrigir o transbordamento preexistente.
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

## Regressão mobile detectada pelo teste estrito

A primeira versão do smoke comparava `document.documentElement.scrollWidth` com `window.innerWidth` e aprovou, mas em emulação 360/390 o navegador expandiu `innerWidth` para 405px. O teste foi corrigido para comparar contra a largura solicitada; falhou a 360px (`scrollWidth=405`, `clientWidth=360`, `visualViewport.width=360`) e identificou o `<a class=section-more>` da vitrine com borda direita em 404px. Esse link é anterior à A03 e não foi alterado. **Correção em escopo mínimo:** adicionar somente dentro de `@media(max-width:600px)` a regra `.featured-heading .section-more{white-space:normal;overflow-wrap:anywhere}` em `src-greenn/blog/blog-home.css`. Reexecutar e exigir `scrollWidth <= largura configurada + 10` para `/blog/` e guia nas cinco larguras. Não declarar aprovado sem log da CI final.


## Mídia FGTS responsiva fornecida pelo proprietário — 24/11/2026

- **Desktop (1535×1024):** `https://s3-gdigital.s3.amazonaws.com/gdigital/313/Utilize_seu_FGTS_1535x1024.webp`.
- **Mobile (941×1672, 9:16):** `https://s3-gdigital.s3.amazonaws.com/gdigital/313/Utilize_seu_FGTS_941x1672.webp`.
- Inseridas no **mesmo card** via `<picture>` com `<source media="(max-width: 600px)">` e `<img>` padrão desktop; no mobile, preservar todo o pôster vertical sem `object-fit:cover` e sem overlay sobre a chamada. O rodapé editorial do card continua HTML indexável e todo o card é um único link rastreável para o artigo.
- Mídia externa permanece no S3/GDigital, sem guardar WebP pesado no GitHub; `loading="lazy"`, `decoding="async"`, dimensões intrínsecas e `alt` descritivo. O teste estático/Chromium valida o `currentSrc` correto e dimensões visuais nas cinco larguras.
- **Limite da evidência:** os URLs foram fornecidos pelo proprietário. Os bytes e o HTTP 200 reais do S3 não foram conferidos neste ambiente; acesso externo/binary direto indisponível no momento. QA visual real no LVR deve verificar que as duas imagens carregam e que o texto que faz parte da arte é legível.
- **Conformidade comercial:** a imagem ilustra possibilidade de usar FGTS, não comprova elegibilidade do comprador ou imóvel; o guia mantém as condições de utilização conforme regras aplicáveis.
- **Escopo adicional restrito:** somente `src-greenn/blog/index.html`, regras especializadas da vitrine no `src-greenn/blog/blog-home.css` e verificação da mesma imagem no teste próprio. O artigo e demais CTAs, Form46, Form47, medição, JSON-LD e sitemap não foram alterados nesta etapa de mídia.
