# SFJM — Release da capa dos simuladores Complexo Lapa–Pirituba

**Data:** 02/11/2026  
**Repo canônico:** `wagnerjfjunior/MoreNumTegra` · **Branch:** `main`  
**Autorização do usuário:** “vamos preparar a capa para estes simuladores, e na sequencia vamos colocar em producao”.

## Objetivo e escopo

Transformar a página de entrada `https://www.moretegra.com.br/complexo-lapa-pirituba/` em capa editorial mobile-first dos **três simuladores**, com informações verificáveis e conteúdo rastreável; **não** redesenhar os caminhos SVG e não modificar o número, forma ou sentido de circulação de veículos.

- PR [#532](https://github.com/wagnerjfjunior/MoreNumTegra/pull/532) — **MERGED**.
- Head de código revisado `b37af07b9bfcb013c343ba9f038521935ce6141f`; merge `96703353b0bc6b6bffbc5ca2bb0c6eb3602a2022`.
- Deployment Vercel **READY** `dpl_4vAHBB7UXbyYX3JofdaojFnwXoYK`, commit `96703353b0bc6b6bffbc5ca2bb0c6eb3602a2022`, alias `www.moretegra.com.br` sem erro.
- Rollback operacional: Vercel deployment anterior `dpl_HoxB9Yg3AsomPZJD24hpPLAY1Yx9` (commit `64a88671175f7cf405c9f83b388cc0aac44ec23f`); alternativamente reverter exclusivamente PR #532. Rollback **não executado**.

## Arquivos alterados

1. `src-greenn/complexo-lapa-pirituba/index.html` — capa editorial de três cards ilustrados, botões `data-open-sim=0/1/2` conectados ao seletor existente, conteúdo contextual, três perguntas frequentes visíveis, metadados SEO/compartilhamento e JSON-LD. Os iframes `dualEmbed`, `ayrtonEmbed` e `marginalDualEmbed` permanecem idênticos quanto às fontes e à lógica.
2. `sitemap.xml` — inclui `https://www.moretegra.com.br/complexo-lapa-pirituba/`; total publicado 74 URLs.
3. `scripts/validate-two-images-39-pages.mjs` — mantém intacto o contrato RESF de imagens das páginas comerciais e adiciona uma validação independente para a página informativa do Complexo, não comercial.

## SEO e limites editoriais

- Página principal agora declara `index,follow,max-image-preview:large` e `canonical=https://www.moretegra.com.br/complexo-lapa-pirituba/`.
- Título e descrição específicos; Open Graph e Twitter Cards referenciam mapa editorial existente no GitHub.
- JSON-LD sintaticamente válido com `WebPage`, `BreadcrumbList` e `FAQPage`; FAQ tem 3 perguntas/respostas visíveis correspondentes.
- **Não** declarar obra concluída, tráfego real, percurso operacional ou dados atuais: os simuladores se baseiam em mapas e na apresentação SPObras de **agosto de 2019**. O portal não é uma comunicação oficial da Prefeitura.
- Simuladores embarcados continuam `noindex,nofollow` individualmente; somente **a página de entrada** foi liberada para indexação.
- JSON-LD válido e indexabilidade **não garantem** resultados aprimorados, indexação ou ranking Google/Bing. Validação em ferramentas públicas e solicitação de indexação ainda podem ser feitas.

## Evidências de QA

- GitHub CI (PR #532, head `b37af07`): **quatro workflows SUCCESS** — SEO two distinct images, Blog Bairros, Jerivás Commercial SEO/Form46 e Favicon standard validation.
- Verificação estática no GitHub: único H1; 3 cards; 3 botões com `data-open-sim`; 3 detalhes FAQ; JSON-LD JSON sintaticamente válido; canonical e index,follow; todos os três iframes mantidos; tags de seção/main balanceadas.
- Confirmação de assets dos três cards no GitHub: `Mapa_Trajeto_Lapa_Pirituba-7.webp`, `Mapa_Ayrton_Senna_Pirituba_Badge2.webp` e `Mapa_Lapa_Pirituba_Marginal_Badge3.webp`.
- HTTP produção: `/complexo-lapa-pirituba/` **200**, 25.995 caracteres com 3 cards, JSON-LD, FAQ, indexabilidade, canonical, 3 iframes; `/sitemap.xml` **200**, com 74 URLs incluindo Complexo.
- Os três caminhos `/src-greenn/complexo-lapa-pirituba/{duplo,duplo-ayrton,marginal-duplo}/index.html?embed=1` retornaram **HTTP 200**, mantendo `noindex,nofollow` intencional.
- **Ainda não testado com browser real:** toque/click do usuário, animação GPU/mobile, Core Web Vitals, Rich Results Test oficial, indexação efetiva. Não alegar que esses testes passaram.

## Governança pós-release

Os três simuladores e as curvas dos carros aprovados anteriormente são baseline protegida. Atualizações futuras de geometria exigem diff restrito e novo aceite LVR; não misturar com trabalho SEO. Release em **Vercel** confirmado; nenhuma publicação adicional na Greenn ou integração CRM foi realizada.
