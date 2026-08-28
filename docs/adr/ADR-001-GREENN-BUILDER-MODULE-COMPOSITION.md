# ADR-001 — Greenn Builder Module Composition

- Status: ACCEPTED_BY_OWNER / candidate until merged in `main`
- Date: 2026-08-24
- Project: MoreNumTegra
- Scope: V1 publication topology inside Green Sales

## Context

Green Sales is the V1 production page builder. The MoreNumTegra page is not published there as one standalone HTML document. The builder composes independent modules and exposes page-level CSS and JavaScript fields.

The owner confirmed the production composition for MoreNumTegra as:

1. initial HTML block;
2. native Green Sales form block;
3. second HTML block containing continuation/conversion CTAs that can return to the form;
4. final HTML block/footer;
5. one page-level CSS payload;
6. one page-level JavaScript payload.

The native Green form must remain the production form because the builder/CRM integration is already available there. A custom browser `fetch` submission is no longer the preferred production path.

## Decision

### Canonical Green artifacts

```text
src-greenn/
  blocks/
    01-html-inicial.html
    02-html-pos-form.html
    03-footer.html
  moretegra.css
  moretegra.js
  preview/
    index.html
```

`preview/index.html` is laboratory-only. It composes the exact production HTML snippets and inserts a non-sending mock of the Green native form between blocks so the Vercel Preview reproduces the builder order without transmitting PII.

### Production order in Green Sales

```text
[HTML 01 — header + hero + catalog + conteúdo + âncora do formulário]
[FORM — bloco nativo Green Sales / Form 46]
[HTML 02 — CTA / continuação, com retorno ao formulário]
[HTML 03 — footer]

CSS global:  src-greenn/moretegra.css
JS global:   src-greenn/moretegra.js
```

The first HTML block must expose a stable form anchor (for example `#formulario`) immediately before the builder form so later CTAs can scroll back without depending on undocumented Green selectors.

Do not leave an unclosed HTML container in one builder module expecting another module to close it. Each HTML block must be structurally self-contained because the builder may normalize module markup independently.

## Metadata / head operational constraint

Owner-confirmed operational flow for MoreNumTegra:

- there is no MCP or automated Green publication path in this project;
- changes are validated in GitHub branch + Vercel Preview;
- after merge, the same state is validated on Vercel Production;
- the owner manually copies the approved Green artifacts into the builder;
- the owner validates/publishes in Green and reports the result.

For this page, do not assume a separately managed editable `<head>` is available to the artifact workflow. Search metadata that must travel with the release may be applied by the page-level JavaScript when technically approved.

For P0-A:

- Title: managed by `src-greenn/moretegra.js`;
- meta description: managed by `src-greenn/moretegra.js`;
- canonical: not introduced by this correction; separate Technical SEO gate.

## Form contract

Production uses the native Green Sales Form 46 associated with the page. Known contract remains:

- tenant_id: `313`
- form_id: `46`
- title: `MoreEmUmTegra`
- fields: `nome`, `email`, `telefone`

The page JavaScript may enhance presentation/scroll/focus only when it can do so with scoped, verified selectors. It must not replace the builder's submission lifecycle or attach generic handlers to `document.querySelector("form")`.

Vercel Preview must never submit real lead data.

## Video decision

A hero video must play inside the page rather than navigate the visitor to YouTube.

Preferred order:

1. authorized MP4/WebM on GDigital/S3 using `<video muted autoplay loop playsinline>` plus poster/fallback;
2. if only YouTube is available, use an in-page privacy-enhanced embed (`youtube-nocookie.com`) configured for muted autoplay, loop and `playsinline`.

Muted autoplay is required for reliable browser autoplay. The player must never block catalog, filters, CTA or form. A poster/static fallback is mandatory.

The current Capri reference demonstrates the intended in-page behavior with a YouTube embed using autoplay, mute, loop and `playsinline`; MoreNumTegra may use the same behavioral pattern without copying Capri content/design.

## Vercel laboratory contract

Vercel is a composition simulator, not the production runtime. The Preview shell may contain laboratory-only code necessary to assemble the snippets and mock the form, but production snippets/CSS/JS must remain the source artifacts under `src-greenn/`.

Preview must remain `noindex, nofollow` and must not be promoted to Vercel Production for V1.

## Portfolio

The prior Green package contains a 19-card portfolio and two hero variants (campaign video and Château Jardin). Those files are useful migration input, not automatically canonical inventory truth. Every project field that reaches the new release must be verified before publication. No property may be dropped merely because the first laboratory prototype only contained ELO Duo.

## Consequences

- The current monolithic `src-greenn/moretegra.html` becomes a laboratory prototype, not the final Green publication artifact.
- The custom form currently embedded in that prototype must be removed from the Green production snippets.
- The dark hero/white headline direction from the first Vercel prototype may be retained and evolved.
- The new implementation must recover the verified portfolio from the previous pages/package and preserve mobile filters, badges, WhatsApp and `Receber condições`.
- Green publication still requires the Preview/release gate.