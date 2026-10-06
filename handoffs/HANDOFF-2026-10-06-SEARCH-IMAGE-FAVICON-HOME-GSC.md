# Handoff — Search image, favicon, Home e GSC — 2026-10-06

Registro canônico da sequência PR #352–#355 e do estado de migração lp -> www.

## Release chain

### PR #352 — favicon
- merged: `a513ac2875e95a3321e8a6fabf73c932259c8f6f`
- Production: `dpl_HZhNfGaXoMRWRde7rsdzghnbBAqC / READY`
- package rebuilt from the approved transparent Tegra yellow T;
- audit on 2026-10-06 found 40 HTML files under `src-greenn` referencing `/favicon-48x48.png`;
- browser-tab favicon uses the same package via 48/32/16 PNG + `shortcut icon=/favicon.ico`;
- Google SERP refresh remains external recrawl state.

Anti-regression: do not restore the old favicon package or replace the Tegra T with a generic lettermark.

### PR #353 — Mozae primary image ownership
- merged: `c7c0c6c3db323b98ceb7e6ea8a2a4df40d4cc043`
- Production: `dpl_7cjhwSVyiX1LFVoBBj5PRWcnRffL / READY`
- primary image:
  `https://s3-gdigital.s3.amazonaws.com/gdigital/313/Tegra-Incorporadora-Perspectiva-Ilustrada-Area-de-Lazer-Lounge-Festas-Externo-Rooftop-Apartamento-Mozae-Higienopolis-Sao-Paulo-SP-1400x1400-1731541249479.webp`
- aligned signals: OG, Twitter, ImageObject, Product.image, visible hero, primaryImageOfPage and explicit WebPage.image;
- Sabrina remains a factual commercial entity; no robots image block was added.

USER_REPORTED Google evidence on 2026-10-06: Mozae can show a project image for product-specific queries and Sabrina for broader queries. Thumbnail choice is query-dependent and is not a fixed per-URL contract.

### PR #354 — Mozae facts/gallery normalization
- merged: `9d40dbc6af88c3174d660616d3e88dc9dab55ab7`
- Production: `dpl_FQd1SFj3RX4rBnh6koD5BVF42q2H / READY`
- local visual validation: USER_APPROVED.

Canonical facts role selected by Product Authority for future exact-project normalization:
1. metragem + configuração;
2. vagas;
3. diferencial + localização;
4. estágio;
5. no duplicated `.hero-meta`;
6. price/unit data stays outside `.facts`;
7. never invent data to fill a quadrant.

Current implementation boundary: Mozae is normalized; do not claim all exact-project pages already use this pattern.

Mozae gallery order retained:
1. Living 73 m²;
2. Living 46 m²;
3. Rooftop;
4. Piscina;
5. Fitness;
6. Coworking;
7. Fachada e acesso.

### PR #355 — Home image, delayed video autoplay and mobile flow
- merged: `1ec9cc1ad812d4e0b9f81b1713fe8d07560d502c`
- Production: `dpl_6LJK4RRu41AGN8LwivL32det2rBN / READY`
- local visual validation: USER_APPROVED.

Selected Home primary image:
`https://s3-gdigital.s3.amazonaws.com/gdigital/313/Tegra-Incorporadora-Perspectiva-Ilustrada-Caminhos-da-Lapa-Rua-Fortunato-Ferraz-1200x630.webp`

Home image ownership:
- og:image -> selected 1200x630 image;
- twitter:image -> same;
- CollectionPage.image -> #home-image;
- CollectionPage.primaryImageOfPage -> #home-image;
- ImageObject.contentUrl -> same;
- visible initial poster -> same;
- CollectionPage.mentions no longer directly points to Sabrina;
- Sabrina remains factual as Person, RealEstateAgent and Service;
- YouTube thumbnail remains scoped to VideoObject.thumbnailUrl.

Video runtime contract:
```text
initial HTML = static institutional poster / no YouTube iframe
window.load
+ 2000 ms
-> youtube-nocookie iframe
autoplay=1
mute=1
playsinline=1
controls=1
```

Do not claim measured LCP improvement without a comparable post-release battery.

Mobile flow decision:
- the long NEGOCIAÇÃO IMOBILIÁRIA section was moved below regional discovery and before FAQ;
- the project catalog now appears earlier in the mobile scroll path;
- the negotiation copy itself was preserved.

Anti-regression:
- do not move the long negotiation block back above the catalog without new Product Authority approval;
- do not restore the YouTube thumbnail as the Home primary image;
- do not restore direct Sabrina CollectionPage.mentions;
- do not eager-load the YouTube iframe in initial HTML.

## Domain / GSC migration state

Current observed topology on 2026-10-06:
```text
www.moretegra.com.br = Vercel Production / canonical
moretegra.com.br = permanent 308 -> www.moretegra.com.br
lp.moretegra.com.br = permanent 308 -> www.moretegra.com.br
```

Google Search Console state is USER_CONFIRMED from the product-owner screenshots:
- Domain property `moretegra.com.br`;
- URL-prefix `https://www.moretegra.com.br/`;
- URL-prefix `https://lp.moretegra.com.br/`;
- Change of Address `lp -> www` validated and confirmed;
- migration start shown as 2026-10-06.

Historical docs that still describe `lp` as a Green fallback are stale and must not be used as current topology.

## Current Google / AI observations

USER_REPORTED screenshots on 2026-10-06 show:
- AI Mode can cite MoreTegra and show Mozae with a project image;
- Home and Soma can still show Sabrina;
- Mozae image can vary by query;
- `lp.moretegra.com.br` can still appear in AI citations while Google reprocesses the migration.

These are external-index observations, not runtime truth. Do not churn Home/Mozae image signals merely because Google has not fully refreshed them.

## Next safe action

Search-image work is READ_ONLY first:
1. observe/request recrawl of Home and affected URLs;
2. audit all public pages for primary-image ownership and Sabrina competition;
3. classify each page as project/region image dominant, Sabrina competing, or primary image inadequate/missing;
4. propose bounded fixes only where evidence exists;
5. do not apply a global image-suppression rule to Sabrina;
6. preserve factual Person/RealEstateAgent/Service entities.

No additional Home runtime mutation is authorized merely because Google still shows stale/query-dependent thumbnails.
