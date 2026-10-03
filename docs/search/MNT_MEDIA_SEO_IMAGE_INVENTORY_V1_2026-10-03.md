# MNT Media SEO Image Inventory V1 — 2026-10-03

Status: CANONICAL_AUDIT_SNAPSHOT_ON_FEATURE_BRANCH

Repository: wagnerjfjunior/MoreNumTegra

Branch at snapshot creation:
```text
feat/media-seo-image-semantics-v1-20261002
```

Source implementation head before this documentation commit:
```text
7ae5053b969a47036ffdb87e8da32f3394c13cb4
```

## 1. Purpose

Freeze the image/media audit so subsequent content work cannot erase, re-interpret or silently regress already-reviewed image semantics.

This document is the working source of truth for the 2026-10-02/03 MoreNumTegra image audit until superseded by an approved later version.

Do not infer missing facts. If an image scene cannot be proven, use a safe factual description rather than a guessed scene.

## 2. Acceptance taxonomy

- FORTE — informative image with specific, factual alt text.
- OK_BRAND — logo/brand image with appropriate brand semantics.
- OK_DECORATIVE — decorative image intentionally uses alt="" and accessibility treatment.
- MEDIA_SOURCE_OK — public/stable origin accepted for the current slice.
- MEDIA_TECH_PENDING — semantics accepted but width/height, responsive derivatives or delivery hardening remains.
- HOLD_FACT_CHECK — exact visual identity still not proven.
- STRUCTURAL_GAP — project image exists in metadata/schema but equivalent static HTML image exposure is missing or inconsistent.

Global targets:

```text
informative images = FORTE whenever factual evidence exists
brand images = OK_BRAND
decorative icons = OK_DECORATIVE
ALT_GENERIC = 0 on targeted public pages
ALT_INCOMPLETE = 0 on targeted public pages
ALT_FACT_MISMATCH = 0
HOLD_FACT_CHECK = 0 before final release
STRUCTURAL_GAP = 0 before declaring media layer complete
```

## 3. Technical rules

### Informative images
- alt must describe the actual visible scene or plant.
- project identity should be present where it adds disambiguation.
- do not keyword-stuff.
- do not call a city/context image a project facade unless proven.
- the same exact image URL must not receive mutually incompatible scene descriptions.

### Decorative images
For floating WhatsApp and equivalent decorative icons:

```html
<img alt="" aria-hidden="true" ...>
```

The parent link/button must provide the accessible name.

### Main images
For principal project images:
- use a real HTML `<img>` or `<picture>`;
- hero must be statically discoverable in initial HTML;
- hero should not be lazy-loaded;
- align visible image semantics with `og:image`, Twitter image and JSON-LD when they represent the same primary media;
- do not add ImageObject merely to increase schema count.

### Dimensions
Do not invent width/height. Add explicit dimensions only when source geometry is known/proven.

## 4. Audit universe

Static public image elements counted in the audit:

| Cluster | Static <img> count |
|---|---:|
| Lapa | 48 |
| Higienópolis | 30 |
| Moema | 46 |
| Brooklin | 24 |
| Perdizes | 21 |
| Jardins | 15 |
| Vila Nova Conceição | 18 |
| Tatuapé | 11 |
| Sacomã | 11 |
| Alto do Ipiranga | 14 |
| Chácara Klabin | 6* |
| Cidade Jardim | 12 |
| Itaim Bibi | 6* |
| **Total** | **262** |

`*` CAPIITOLO and DSG counts under-represent their effective media because their principal project images are primarily exposed through metadata/schema rather than static body HTML. This is a STRUCTURAL_GAP, not a counting omission.

## 5. Lapa cluster

### /regioes/lapa/

Reviewed images:
1. Tegra logo — OK_BRAND.
2. Rua Jardim aerial — FORTE.
   - canonical media candidate:
     `https://s3-gdigital.s3.amazonaws.com/gdigital/313/Vista_aerea_Rua_Jardim_Vivas_a39ff60521.webp`
   - approved alt:
     `Vista aérea da Rua Jardim no Caminhos da Lapa`
   - old Helbor origin must not be reintroduced.
3. Elo Duo project image — target alt:
   `Fachada do Elo Duo Caminhos da Lapa`
   only where the file is actually the Elo facade.
4. Garden Design pool/lazer card image — target alt:
   `Piscina e área de lazer do Garden Design Caminhos da Lapa`
5. Nova Vivere pool/lazer card image — target alt:
   `Piscina e área de lazer do Nova Vivere Caminhos da Lapa`
6. Reserva hashed image — remain factual; do not invent a scene without visual proof.
7. Footer logo — OK_BRAND.

Important correction:
The old Helbor file `Vista_aerea_Rua_Jardim_Vivas...` is a Rua Jardim aerial/context image and must not be described as “Fachada do Elo Duo”.

### /empreendimentos/nova-vivere/

Reviewed images:
- hero — `Perspectiva ilustrada do Nova Vivere Caminhos da Lapa`
- living/terrace — `Living e terraço do Nova Vivere`
- Rua Jardim aerial — `Vista aérea da Rua Jardim no Caminhos da Lapa`
- plants:
  - `Planta oficial do apartamento de 72 m², padrão decorado, do Nova Vivere`
  - `Planta oficial do apartamento de 105 m² do Nova Vivere`
- footer logo — OK_BRAND
- WhatsApp — OK_DECORATIVE

Gallery JS:
- same exact media URL must keep one factual semantic label.
- Rua Jardim image uses the GDigital/S3 origin above.

### /empreendimentos/garden-design/

Reviewed image targets:
- hero — already factual
- gourmet — already factual
- initial gallery scene — `Pool bar do Garden Design Caminhos da Lapa`
- plants:
  - `Planta oficial do apartamento de 62 m² do Garden Design`
  - `Planta oficial do apartamento de 76 m² do Garden Design`
- WhatsApp — OK_DECORATIVE with aria-hidden=true

### /empreendimentos/caminhos-da-lapa-elo-duo/

Important: this page is part of the Lapa cluster and must never be omitted from cluster validation.

Image status:
- 15 static images audited.
- hero/facade/streetscape/plants/fitness/festas/gourmet/pool/context were already mostly specific and factual.
- plants 47/55/67 m² are acceptable when project identity remains clear.
- WhatsApp decorative treatment already correct.

No bulk alt rewrite was required in the first media patch because this page was already materially stronger than the rest of the cluster.

### /empreendimentos/reserva-caminhos-da-lapa/

Reviewed image targets:
- hero — hashed source; exact scene must not be guessed if not visually verified.
- beach tennis — already factual.
- `Varanda gourmet do apartamento de 127 m² do Reserva Caminhos da Lapa`
- plants:
  - `Planta oficial do apartamento de 91 m² com 3 dormitórios e 1 suíte do Reserva Caminhos da Lapa`
  - `Planta oficial do apartamento de 127 m² com 3 suítes do Reserva Caminhos da Lapa`
  - `Planta oficial do apartamento de 157 m² com 4 dormitórios e 2 suítes do Reserva Caminhos da Lapa`
- WhatsApp — OK_DECORATIVE with aria-hidden=true

## 6. Higienópolis cluster

### /regioes/higienopolis/
Regional image semantics were already materially strong:
- Parque Buenos Aires
- Edifício Louveira
- Ária facade
- Mozae facade
- logos

### /empreendimentos/aria-higienopolis/
- hero access perspective — FORTE
- plant alts — FORTE
- main gallery `Bar da piscina do Ária Higienópolis` — FORTE
- thumbnail images intentionally use empty alt while their buttons carry descriptive aria-label/data-alt. Do not mechanically duplicate alt text without accessibility review.
- WhatsApp — OK_DECORATIVE

### /empreendimentos/mozae-higienopolis/
Approved/target image semantics:
- hero:
  `Perspectiva ilustrada da fachada e pórtico do Mozae Higienópolis`
- rooftop images — factual/strong
- plants:
  - `Planta oficial do apartamento de 46 m² com 1 suíte do Mozae Higienópolis`
  - `Planta oficial do apartamento de 73 m² com 2 suítes do Mozae Higienópolis`
- WhatsApp — OK_DECORATIVE

Historical Google Merchant missing-image error is SITE_SIDE_FIXED / external validation state, not a reason to add unverified review/availability/shipping fields.

## 7. Moema cluster

### /regioes/moema/
Target semantics:
- Bem Moema principal — facade-specific, not generic project text.
- Bem Moema editorial — area externa/lazer when that is the actual scene.
- Bem Moema card — facade-specific.
- Bem Moema Studios & Offices card — piscina/lazer-specific.
- Chez/Key/Ayla/Viso cards — project + scene where proven.

### Bem Moema
- hero: facade-specific.
- plant:
  `Planta do apartamento de 80 m² do Bem Moema`

### Bem Moema Studios & Offices
- hero: `Piscina e área de lazer do Bem Moema Studios & Offices em Moema`
- plant:
  `Planta do studio de 26 m² do Bem Moema Studios & Offices`

### Ayla Moema Studio & Office
Official Tegra nomenclature used for factual closure includes:
- Fachada
- Detalhe da fachada e acessibilidade
- Praça coliving e descompressão

Safe target:
- hero/project image: facade-specific only when exact URL/file correspondence supports it.
- plant:
  `Planta da sala comercial de 28 m² do Ayla Moema Studio & Office`

### Chez Vous Moema
- pool/piscina media may use `Piscinas do Chez Vous Moema` where exact image supports it.
- plant:
  `Planta de 71 m² com sala ampliada do Chez Vous Moema`

### Key Moema
Official nomenclature includes:
- Foto da Fachada
- Foto da Portaria
- Foto da Piscina

Rule:
the same exact file must use one consistent scene description.

Plant:
`Planta padrão do apartamento de 74 m² do Key Moema`

### Viso Moema
Official nomenclature includes:
- Foto da portaria
- Foto da fachada
- Foto da piscina
- Foto da vista da piscina

Rule:
the same exact file must use one consistent scene description.

Plant:
`Planta do apartamento de 115 m², opção 1, do Viso Moema`

## 8. Brooklin cluster

### Regional Brooklin
- Ledge hero/card should use specific project perspective.
- Ledge pool image should be pool-specific.
- Ampère card should be facade-specific.

### Ampère Brooklin
Targets:
- facade-specific hero
- `Piscina e área de lazer do Ampère Brooklin`
- `Vista aérea da piscina do Ampère Brooklin`
- `Planta padrão do apartamento de 262 m² do Ampère Brooklin`

### Ledge Brooklin
Plants:
- 70 m² / 2 dormitórios / 1 suíte
- 80 m² / 2 suítes
- 122 m² / 3 suítes
all with project identity.

Residual:
some media comes from external `cdn.prod.website-files.com` / `exto.com.br`; treat source stability separately from alt semantics.

## 9. Perdizes cluster

### Regional Perdizes
- Soma facade and pool should be scene-specific.
- ODE card should be facade-specific.

### Soma Perdizes
Plants:
- studio 25 m²
- apartment 45 m²
- commercial 50.5 m²
with project identity.

### ODE Perdizes
- hero: facade-specific.
- secondary unknown/weak scene: safe factual fallback is
  `Área de lazer do ODE Perdizes`
  unless exact visual evidence supports a more specific label.
- plant:
  `Planta padrão do apartamento de 156 m² do ODE Perdizes`

## 10. Jardins cluster

### Regional Jardins
- Zahle principal perspective — specific.
- Zahle pool scene — specific.

### Zahle Jardins
Plants:
- apartment 44 m²
- studio 28 m²
- office 43 m²
- office 53 m²
all with project identity.

## 11. Vila Nova Conceição cluster

### Regional
Targets:
- Bueno Brandão 257 principal:
  `Perspectiva ilustrada do Bueno Brandão 257 na Vila Nova Conceição`
- external facade-detail image:
  `Detalhe da fachada do Bueno Brandão 257`
- Tièl card:
  `Fachada do Tièl Vila Nova Conceição`

### Tièl
- facade — FORTE
- rooftop pool — FORTE
- `Vista aérea do rooftop do Tièl Vila Nova Conceição`
- Boutique Apartment plant — already strong

### Bueno Brandão 257
- hero: `Perspectiva ilustrada do Bueno Brandão 257`
- repeated external facade images:
  `Detalhe da fachada do Bueno Brandão 257`
- WhatsApp — OK_DECORATIVE
- external `buenobrandao257.com.br` source stability remains a separate concern.

## 12. Tatuapé cluster

Official Tegra nomenclature available:
- Fotomontagem aérea do local
- Perspectiva ilustrada diurna da fachada residencial
- voo do lazer
- piscina
- pool bar
- portaria residencial

Rule:
do not assign these labels to a hashed file unless exact media-to-label correspondence is proven. If not, use a safe project-level perspective description.

Plant:
`Planta do apartamento de 1 dormitório do Universo Tatuapé Órbita`

## 13. Sacomã cluster

TEG Sacomã official gallery nomenclature includes:
- Piscina
- Portaria
- Fachada
- Hall social
- Churrasqueira
- Academia
- Brinquedoteca
- Quadra

Known file name evidence:
principal source name contains `Detalhe-da-Fachada-Area-Externa`.

Approved strong description:
`Detalhe da fachada e área externa do TEG Sacomã`

Secondary scene:
only use `Piscina do TEG Sacomã` when exact image correspondence is proven. Otherwise safe fallback:
`Área de lazer do TEG Sacomã`.

Plant:
`Planta do apartamento de 45 m² do TEG Sacomã`

## 14. Alto do Ipiranga cluster

YPY official nomenclature includes:
- Perspectiva ilustrada da piscina
- voo da piscina
- detalhe da fachada
- churrasqueira e forno de pizza
- horta e espaço bricolagem
- quadra recreativa

Rule:
exact file mapping must remain factual.

Plants:
- `Planta oficial do apartamento de 65 m² com 2 dormitórios do YPY Alto do Ipiranga`
- `Planta oficial do apartamento de 80 m² com 3 dormitórios do YPY Alto do Ipiranga`
- `Planta oficial do apartamento de 80 m², opção de planta, do YPY Alto do Ipiranga`

## 15. Chácara Klabin / CAPIITOLO

Regional image semantics:
`Detalhe da fachada do CAPIITOLO by Piero Lissoni na Chácara Klabin`
where that scene matches the file.

Exact CAPIITOLO page:
- static body audit found only footer logo as static `<img>`.
- metadata has project `og:image` and strong alt/caption.
- project image is not equivalently exposed as a principal static body image.

Status:
```text
STRUCTURAL_GAP
```

Required future remediation:
```text
visible/static principal image
↔ factual alt
↔ og:image
↔ twitter image
↔ ImageObject / primary media semantics
```

This is a separately gated media/runtime remediation. Do not silently bundle it into generic alt cleanup.

## 16. Cidade Jardim / Château Jardin

Regional:
- main facade:
  `Perspectiva ilustrada da fachada do Château Jardin`
- Exto tennis image:
  `Quadra de tênis de saibro do Château Jardin`

Exact:
- hero facade — strong
- tennis court — strong
- facade — strong
- plant:
  `Planta Harmonie de 185 m² com 3 suítes e 2 vagas do Château Jardin`
- WhatsApp — OK_DECORATIVE

External `exto.com.br` media stability remains a separate source-hardening concern.

## 17. Itaim Bibi / DSG

Regional image semantics:
`Fachada do DSG Itaim no Itaim Bibi`

Exact DSG:
- static body audit found only footer logo as static `<img>`.
- JSON-LD already exposes an `ImageObject` / `primaryImageOfPage` project image.
- current source audit indicated `og:image` may still resolve to a Tegra logo rather than the DSG primary project image.

Status:
```text
STRUCTURAL_GAP
```

Required future remediation:
```text
visible/static DSG principal image
↔ factual alt
↔ og:image
↔ twitter image
↔ ImageObject / primaryImageOfPage
```

Handle as a separately gated media/runtime slice.

## 18. YouTube / future video relation

Known user-provided channel:
`https://www.youtube.com/@sabrinategraimoveis`

Known relation:
the channel links to `https://www.moretegra.com.br`.

Retain as future entity/media input.

Do not add `VideoObject` globally merely because the channel exists.

Eligibility rule:
- exact factual video exists;
- video is visibly embedded/present on the corresponding page;
- thumbnail/contentUrl/embedUrl are factual and stable;
- visible page content and schema refer to the same video.

## 19. Current implementation candidate scope

Existing feature branch:
`feat/media-seo-image-semantics-v1-20261002`

Pre-documentation implementation head:
`7ae5053b969a47036ffdb87e8da32f3394c13cb4`

That candidate contains:
- selected alt strengthening;
- selected plant alt strengthening;
- Rua Jardim Helbor → GDigital/S3 migration;
- selected WhatsApp decorative accessibility fixes;
- audit documentation.

Important:
the candidate is NOT approved for merge merely because this document exists.

## 20. Content gate discovered on 2026-10-03

Before media work is merged, exact-project content parity must be reconciled against the Mozae reference.

Measured visible-word baseline on the same candidate head:

| Page | Approx. visible words | H2 | FAQ visible/schema |
|---|---:|---:|---:|
| Mozae | 1,149 | 11 | 10 / 10 |
| Nova Vivere | 1,340 | 9 | 10 / 10 |
| Garden Design | 1,054 | 9 | 7 / 7 |
| Elo Duo | 1,450 | 11 | 5 / 5 |
| Reserva | 625 | 8 | 4 / 4 |
| Lapa regional | 1,403 | 9 | 6 / 6 |

Interpretation:
- Nova Vivere: strong content volume.
- Garden Design: near reference volume, still needs structure/answerability comparison.
- Elo Duo: strong volume, FAQ/answerability needs comparison.
- Reserva: materially underdeveloped vs reference.
- Lapa regional: strong regional volume.

Do not treat word count alone as quality. Final comparison must include:
- page ownership;
- H1/H2/H3 structure;
- project facts;
- location;
- decision/comparison content;
- plants;
- amenities;
- FAQ answerability;
- visible FAQ ↔ FAQPage parity;
- JSON-LD graph;
- conversion/form;
- media semantics.

## 21. Freeze rule

Until the Lapa structural/content comparison is closed:

```text
NO_MERGE of media candidate
NO_PRODUCTION_DEPLOY
NO_BULK_MEDIA_REWRITE
NO_LOSS_OF_THIS_INVENTORY
```

Any future media implementation must reconcile against this inventory before changing image semantics.
