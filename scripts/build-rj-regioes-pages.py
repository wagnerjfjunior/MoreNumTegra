#!/usr/bin/env python3
"""Gera as páginas de bairro do Rio (Wagner, 2026-11-13):
  /rio-de-janeiro/regioes/                         -> src-greenn/rio-de-janeiro/regioes/index.html
  /rio-de-janeiro/regioes/oeste/barra-da-tijuca/   -> src-greenn/rio-de-janeiro/regioes/oeste/barra-da-tijuca/index.html
Reaproveita o visual e os blocos do hub /rio-de-janeiro/ (home.css, formulário 47, rodapé e canal RJ).
Os dados de projeto (nome, URL, imagem, tipologia, endereço) são lidos do próprio hub, que é a fonte.
Uso: python3 -I scripts/build-rj-regioes-pages.py   (rodar na raiz do repositório)
"""
import html
import json
import re
from pathlib import Path

ROOT = Path.cwd()
SITE = "https://www.moretegra.com.br"
HUB = ROOT / "src-greenn/rio-de-janeiro/index.html"
HERO = "https://stracctegra.blob.core.windows.net/assets/Bairro/GuiaBairro/29/Imagem/59a1c0b7-2f30-4f6e-a212-665f2683ecd3.jpg"
HERO_ALT = "Vista aérea da Barra da Tijuca, com o canal, os edifícios, a praia e a Pedra da Gávea ao fundo"
LOGO = "https://s3-gdigital.s3.amazonaws.com/gdigital/313/Logo_Tegra_Amarelo%20666X375%20SemFundo.webp"
WA = "5511951667227"

hub = HUB.read_text(encoding="utf-8")


def between(s, start, end):
    i = s.index(start)
    return s[i:s.index(end, i) + len(end)]


GTM = between(hub, '<script>window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:"default_consent"', "GTM-PGCR4R47');</script>")
NOSCRIPT = between(hub, "<noscript><iframe", "</noscript>")
FOOTER = between(hub, '<footer class="rio-footer">', "</footer>")
FORM = between(hub, '<form id="moretegra-lead-form"', "</form>")

# Projetos: lidos dos cards do hub (fonte única).
PROJECTS = []
for card in re.findall(r'<article class="rio-project".*?</article>', hub, re.S):
    PROJECTS.append({
        "name": html.unescape(re.search(r"<h3>(.*?)</h3>", card).group(1)),
        "url": re.search(r'class="rio-project-media" href="([^"]+)"', card).group(1),
        "img": re.search(r'<img src="([^"]+)"', card).group(1),
        "alt": re.search(r'<img src="[^"]+" alt="([^"]+)"', card).group(1),
        "stage": re.search(r'<span class="rio-stage">(.*?)</span>', card).group(1),
        "meta": re.search(r'<p class="rio-meta">(.*?)</p>', card).group(1),
    })
assert len(PROJECTS) == 7, len(PROJECTS)
BY = {p["url"].split("/")[-2]: p for p in PROJECTS}

# Onde cada projeto está dentro da Barra (endereços do rodapé do hub).
AREAS = [
    ("Península", "Condomínio fechado à beira da Lagoa da Tijuca, com ruas arborizadas e acesso controlado.",
     ["gran-thai-leisure-residence", "singular-private-residence"]),
    ("Parque das Rosas", "Casas em condomínio na Avenida Prefeito Dulcídio Cardoso.",
     ["claris-casa-e-clube", "claris-rosas"]),
    ("Orla da Avenida Lúcio Costa", "A frente para o mar da Barra, com a praia do outro lado da avenida.",
     ["riio-by-piero-lissoni"]),
    ("Outros endereços no bairro", "Apartamentos nas avenidas Afonso Arinos de Melo Franco e Evandro Lins e Silva.",
     ["kronos-by-tegra", "gaea-home-resort"]),
]
assert sorted(s for _, _, ss in AREAS for s in ss) == sorted(BY), "todos os 7 projetos precisam estar em uma área"


def wa(text):
    from urllib.parse import quote
    return f"https://wa.me/{WA}?text={quote(text, safe='')}"


def card(p):
    n = html.escape(p["name"])
    return (f'<article class="rio-project"><a class="rio-project-media" href="{p["url"]}" aria-label="Conhecer {n}">'
            f'<img src="{p["img"]}" alt="{p["alt"]}" width="800" height="535" loading="lazy" decoding="async">'
            f'<span class="rio-stage">{p["stage"]}</span></a><div class="rio-project-body">'
            f'<span class="rio-eyebrow">Barra da Tijuca · Rio de Janeiro</span><h3>{n}</h3><p class="rio-meta">{p["meta"]}</p>'
            f'<div class="rio-project-footer"><a class="rio-btn" href="{p["url"]}">Conhecer projeto</a>'
            f'<a href="#contato"><small>Receber condições</small></a></div></div></article>')


def header():
    return (f'<header class="rio-top"><div class="rio-wrap"><a class="rio-brand" href="/rio-de-janeiro/" aria-label="MoreTegra Rio de Janeiro">'
            f'<img src="{LOGO}" width="110" height="62" alt="Tegra">MoreTegra</a><nav aria-label="Navegação principal">'
            '<a href="/rio-de-janeiro/">Rio de Janeiro</a><a href="/rio-de-janeiro/regioes/">Bairros do Rio</a>'
            '<a href="/rio-de-janeiro/#empreendimentos">Empreendimentos</a>'
            '<a class="rio-nav-cta" href="#contato">Receber condições</a></nav></div></header>')


def dock(msg):
    return ('<nav class="rio-dock" aria-label="Atalhos de atendimento"><a class="rio-btn" href="#contato">Receber condições</a>'
            f'<a class="rio-wa" href="{wa(msg)}" target="_blank" rel="noopener noreferrer" aria-label="Conversar no WhatsApp com a central de atendimento RJ">'
            '<img src="https://s3-gdigital.s3.amazonaws.com/gdigital/313/whatsapp-removebg.webp" alt="" width="32" height="32"></a></nav>')


def form(context, eyebrow_title, msg):
    f = FORM.replace('data-region-context="Rio de Janeiro | Hub de empreendimentos | MoreTegra"', f'data-region-context="Rio de Janeiro | {context} | MoreTegra"')
    assert f != FORM
    f = f.replace("<p data-lead-context>Compare as opções do Rio ou selecione um empreendimento para receber informações.</p>",
                  "<p data-lead-context>Conte o que você procura na Barra e receba as opções que fazem sentido para você.</p>")
    return (f'<section class="rio-section rio-form-section" id="contato" aria-labelledby="rio-contact-title"><div class="rio-wrap rio-form-grid"><div>'
            f'<p class="rio-eyebrow" style="color:#EBB92E">Central de atendimento RJ</p><h2 id="rio-contact-title">{eyebrow_title}</h2>'
            '<p>Informe seu contato e o que você procura. A central de atendimento RJ encaminha sua consulta ao corretor local autorizado.</p>'
            f'<a class="rio-btn secondary" href="{wa(msg)}" target="_blank" rel="noopener noreferrer">Conversar no WhatsApp</a></div>\n{f}</div></section>')


def faq_html(items):
    return "".join(f"<details><summary>{html.escape(q)}</summary><p>{html.escape(a)}</p></details>\n" for q, a in items)


def faq_ld(url, items):
    return {"@type": "FAQPage", "@id": url + "#faq", "mainEntity": [
        {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in items]}


def head(route, title, desc, identity, product, graph):
    url = SITE + route
    ld = json.dumps({"@context": "https://schema.org", "@graph": graph}, ensure_ascii=False, separators=(",", ":"))
    t, d = html.escape(title), html.escape(desc)
    return f'''<!doctype html>
<html lang="pt-BR" data-mnt-page-identity="{identity}" data-mnt-product-identity="{product}" data-mnt-route="{route}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="robots" content="index,follow,max-image-preview:large">
<title>{t}</title>
<meta name="description" content="{d}">
<link rel="canonical" href="{url}">
<meta name="theme-color" content="#171813">
<link rel="shortcut icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="More em um Tegra">
<meta property="og:url" content="{url}">
<meta property="og:title" content="{t}">
<meta property="og:description" content="{d}">
<meta property="og:image" content="{HERO}">
<meta property="og:image:alt" content="{HERO_ALT}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{t}">
<meta name="twitter:description" content="{d}">
<meta name="twitter:image" content="{HERO}">
<link rel="preconnect" href="https://stracctegra.blob.core.windows.net">
<link rel="stylesheet" href="/src-greenn/rio-de-janeiro/home.css">
<script type="application/ld+json">{ld}</script>
<script src="/src-greenn/preview/runtime.js" defer></script><script src="/src-greenn/preview/measurement-core.js" defer></script>
<script src="/src-greenn/preview/measurement-form.js" defer></script>
{GTM}</head>
<body data-moretegra>{NOSCRIPT}
<a class="rio-skip" href="#conteudo">Ir para o conteúdo</a>
{header()}
'''


def base_graph(route, name, desc, crumbs):
    url = SITE + route
    return [
        {"@type": "WebSite", "@id": SITE + "/#website", "url": SITE + "/", "name": "More em um Tegra"},
        {"@type": "WebPage", "@id": url + "#webpage", "url": url, "name": name, "description": desc, "inLanguage": "pt-BR",
         "isPartOf": {"@id": SITE + "/#website"}, "primaryImageOfPage": {"@id": url + "#image"}, "breadcrumb": {"@id": url + "#breadcrumbs"},
         "about": {"@id": SITE + "/rio-de-janeiro/regioes/oeste/barra-da-tijuca/#place"}},
        {"@type": "ImageObject", "@id": url + "#image", "contentUrl": HERO, "url": HERO, "width": 1920, "height": 640,
         "caption": "Vista aérea da Barra da Tijuca, Rio de Janeiro"},
        {"@type": "BreadcrumbList", "@id": url + "#breadcrumbs", "itemListElement": [
            {"@type": "ListItem", "position": i + 1, "name": n, "item": SITE + r} for i, (n, r) in enumerate(crumbs)]},
        {"@type": "Place", "@id": SITE + "/rio-de-janeiro/regioes/oeste/barra-da-tijuca/#place", "name": "Barra da Tijuca",
         "containedInPlace": {"@type": "City", "name": "Rio de Janeiro", "containedInPlace": {"@type": "State", "name": "Rio de Janeiro"}}},
        {"@type": "ContactPoint", "@id": url + "#central-atendimento-rj", "name": "Central de atendimento RJ", "contactType": "Atendimento comercial",
         "telephone": "+5511951667227", "url": f"https://wa.me/{WA}", "availableLanguage": "pt-BR",
         "areaServed": {"@type": "City", "name": "Rio de Janeiro"}},
    ]


def crumb_nav(crumbs):
    parts = [f'<a href="{r}">{html.escape(n)}</a>' for n, r in crumbs[:-1]] + [f'<span aria-current="page">{html.escape(crumbs[-1][0])}</span>']
    return f'<nav class="rio-crumb" aria-label="Caminho da página"><div class="rio-wrap">{" › ".join(parts)}</div></nav>'


# ---------------------------------------------------------------- Barra da Tijuca
R_BARRA = "/rio-de-janeiro/regioes/oeste/barra-da-tijuca/"
T_BARRA = "Apartamentos e casas Tegra na Barra da Tijuca | MoreTegra"
D_BARRA = "Conheça a Barra da Tijuca, na Zona Oeste do Rio: praia, Península, Jardim Oceânico, metrô e os sete empreendimentos Tegra do bairro."
C_BARRA = [("Rio de Janeiro", "/rio-de-janeiro/"), ("Bairros do Rio", "/rio-de-janeiro/regioes/"), ("Barra da Tijuca", R_BARRA)]
MSG_BARRA = "Olá, quero conhecer os empreendimentos Tegra na Barra da Tijuca."
FAQ_BARRA = [
    ("Quais empreendimentos Tegra ficam na Barra da Tijuca?",
     "Kronos by Tegra, Gran Thai Leisure Residence, Singular Private Residence, Claris Casa & Clube, Claris Rosas, Gaea Home Resort e RIIO by Piero Lissoni. Cada um tem página própria com plantas, lazer e endereço."),
    ("Dá para chegar à Zona Sul de metrô a partir da Barra?",
     "Sim. A Linha 4 do metrô sai da estação Jardim Oceânico, na Barra, e chega a Ipanema em cerca de 13 minutos."),
    ("Qual é a diferença entre a Península e o restante da Barra?",
     "A Península é um condomínio fechado à beira da Lagoa da Tijuca, com ruas arborizadas e acesso controlado. Gran Thai e Singular ficam lá."),
    ("A Barra tem opções de casas, além de apartamentos?",
     "Tem. Claris Casa & Clube e Claris Rosas são casas em condomínio no Parque das Rosas."),
    ("Como recebo plantas e condições?",
     "Pelo formulário ou pelo WhatsApp. A central de atendimento RJ encaminha você ao corretor local autorizado, que envia as plantas e agenda a visita ao estande."),
]
g = base_graph(R_BARRA, T_BARRA, D_BARRA, C_BARRA)
g.append({"@type": "ItemList", "@id": SITE + R_BARRA + "#projects", "name": "Empreendimentos Tegra na Barra da Tijuca",
          "numberOfItems": 7, "itemListElement": [{"@type": "ListItem", "position": i + 1, "name": p["name"], "url": SITE + p["url"]} for i, p in enumerate(PROJECTS)]})
g.append(faq_ld(SITE + R_BARRA, FAQ_BARRA))

areas_html = "".join(
    f'<div class="rio-area"><h3>{html.escape(a)}</h3><p>{html.escape(t)}</p><div class="rio-project-grid">{"".join(card(BY[s]) for s in ss)}</div></div>'
    for a, t, ss in AREAS)

barra = head(R_BARRA, T_BARRA, D_BARRA, "rj_regiao_barra_da_tijuca", "barra-da-tijuca", g) + f'''<main id="conteudo">
<section class="rio-hero" aria-labelledby="rio-hero-title"><div class="rio-hero-media"><img src="{HERO}" alt="{HERO_ALT}" width="1920" height="640" decoding="async" fetchpriority="high"></div><div class="rio-wrap"><p class="rio-eyebrow">Bairros do Rio · Zona Oeste</p><h1 id="rio-hero-title">Barra da Tijuca: praia, lagoa e montanha no mesmo endereço.</h1><p>Um bairro planejado em avenidas largas, com a orla de um lado, as lagoas do outro e a Pedra da Gávea no horizonte. É aqui que estão os sete empreendimentos Tegra no Rio.</p><div class="rio-hero-actions"><a class="rio-btn" href="#empreendimentos">Ver empreendimentos no bairro</a><a class="rio-btn secondary" href="#bairro">Conhecer o bairro</a></div></div></section>
{crumb_nav(C_BARRA)}
<section class="rio-section rio-information" id="bairro" aria-labelledby="rio-bairro-title"><div class="rio-wrap rio-info-grid"><div><p class="rio-eyebrow">O bairro</p><h2 id="rio-bairro-title">Espaço para morar com mais área, verde e mar por perto.</h2><p>A Barra cresceu a partir do fim dos anos 1960 com outro desenho de cidade: avenidas amplas, condomínios com lazer completo e uma orla longa, menos adensada que a da Zona Sul. Quem se muda para cá costuma buscar justamente isso: apartamentos maiores, casas em condomínio e áreas comuns que funcionam como extensão da casa.</p><p>O bairro não é um bloco só. A Península, o Jardim Oceânico, o Parque das Rosas e a faixa da orla têm ritmos diferentes, e vale entender cada um antes de escolher o imóvel.</p></div><div class="rio-feature-grid"><div class="rio-feature"><strong>Praia e lagoas</strong><small>Orla da Avenida Lúcio Costa, Praia do Pepê e as lagoas da Tijuca e de Marapendi.</small></div><div class="rio-feature"><strong>Metrô até a Zona Sul</strong><small>Estação Jardim Oceânico da Linha 4: Ipanema em cerca de 13 minutos.</small></div><div class="rio-feature"><strong>Verde dentro do bairro</strong><small>Bosque da Barra: 50 hectares de restinga, lagos e alamedas na Avenida das Américas.</small></div><div class="rio-feature"><strong>Compras e gastronomia</strong><small>Village Mall, BarraShopping e Downtown, além dos bares do Jardim Oceânico.</small></div></div></div></section>
<section class="rio-section" aria-labelledby="rio-escolas-title"><div class="rio-wrap"><p class="rio-eyebrow">Rotina</p><h2 id="rio-escolas-title">O que pesa no dia a dia de quem mora na Barra</h2><div class="rio-feature-grid"><div class="rio-feature"><strong>Escolas</strong><small>Escolas bilíngues e internacionais, como a Escola Americana, e colégios tradicionais com unidade no bairro.</small></div><div class="rio-feature"><strong>Ensino superior</strong><small>Campi de instituições como IBMEC, Estácio e Veiga de Almeida.</small></div><div class="rio-feature"><strong>Deslocamento</strong><small>Carro e metrô convivem: a Avenida das Américas corta o bairro e o metrô parte do Jardim Oceânico.</small></div><div class="rio-feature"><strong>Lazer ao ar livre</strong><small>Ciclovia na orla, esportes na praia, ilhas e canais da lagoa e caminhadas no Bosque da Barra.</small></div></div></div></section>
<section class="rio-section" id="empreendimentos" aria-labelledby="rio-projects-title"><div class="rio-wrap"><p class="rio-eyebrow">Tegra na Barra</p><h2 id="rio-projects-title">Sete empreendimentos, quatro jeitos de morar no bairro</h2><p class="rio-lead">Primeiro escolha a parte da Barra que combina com a sua rotina. Depois compare os projetos que estão nela.</p>{areas_html}</div></section>
<section class="rio-section rio-faq" aria-labelledby="rio-faq-title"><div class="rio-wrap"><p class="rio-eyebrow">Perguntas frequentes</p><h2 id="rio-faq-title">Antes de escolher seu imóvel na Barra</h2>{faq_html(FAQ_BARRA)}</div></section>
<section class="rio-section rio-agent-section" id="atendimento" aria-labelledby="rio-agent-title"><div class="rio-wrap rio-agent-band"><div class="rio-agent-content"><h2 id="rio-agent-title">Atendimento exclusivo para seu próximo imóvel</h2><p>Conheça plantas, valores e condições dos empreendimentos Tegra no Rio de Janeiro.</p></div><a class="rio-btn" href="{wa(MSG_BARRA)}" target="_blank" rel="noopener noreferrer">Conversar no WhatsApp</a></div></section>
{form("Barra da Tijuca", "Receba plantas e condições dos empreendimentos na Barra", MSG_BARRA)}
</main>
{FOOTER}
{dock(MSG_BARRA)}
</body></html>
'''

# ---------------------------------------------------------------- Bairros do Rio
R_IDX = "/rio-de-janeiro/regioes/"
T_IDX = "Bairros do Rio de Janeiro com empreendimentos Tegra | MoreTegra"
D_IDX = "Guia dos bairros do Rio de Janeiro com empreendimentos Tegra. Comece pela Barra da Tijuca, na Zona Oeste."
C_IDX = [("Rio de Janeiro", "/rio-de-janeiro/"), ("Bairros do Rio", R_IDX)]
MSG_IDX = "Olá, quero conhecer os empreendimentos Tegra no Rio de Janeiro."
FAQ_IDX = [
    ("Em quais bairros do Rio há empreendimentos Tegra?",
     "Hoje, os sete empreendimentos Tegra no Rio ficam na Barra da Tijuca, na Zona Oeste."),
    ("Como escolher entre os empreendimentos da Barra?",
     "Comece pela parte do bairro: Península, Parque das Rosas, orla ou os demais endereços da Barra. Depois compare plantas, lazer e estágio de obra de cada projeto."),
]
g = base_graph(R_IDX, T_IDX, D_IDX, C_IDX)
g[1]["@type"] = "CollectionPage"
g.append({"@type": "ItemList", "@id": SITE + R_IDX + "#regioes", "name": "Bairros do Rio de Janeiro", "numberOfItems": 1,
          "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Barra da Tijuca", "url": SITE + R_BARRA}]})
g.append(faq_ld(SITE + R_IDX, FAQ_IDX))

idx = head(R_IDX, T_IDX, D_IDX, "rj_regioes_hub", "rj-regioes", g) + f'''<main id="conteudo">
<section class="rio-hero" aria-labelledby="rio-hero-title"><div class="rio-hero-media"><img src="{HERO}" alt="{HERO_ALT}" width="1920" height="640" decoding="async" fetchpriority="high"></div><div class="rio-wrap"><p class="rio-eyebrow">Bairros do Rio de Janeiro</p><h1 id="rio-hero-title">Escolha o bairro antes do apartamento.</h1><p>Rotina, deslocamento e estilo de vida mudam de um bairro para outro. Comece por aqui e depois compare os empreendimentos Tegra de cada região.</p><div class="rio-hero-actions"><a class="rio-btn" href="{R_BARRA}">Conhecer a Barra da Tijuca</a><a class="rio-btn secondary" href="/rio-de-janeiro/#empreendimentos">Ver todos os empreendimentos</a></div></div></section>
{crumb_nav(C_IDX)}
<section class="rio-section" id="regioes" aria-labelledby="rio-regioes-title"><div class="rio-wrap"><p class="rio-eyebrow">Zona Oeste</p><h2 id="rio-regioes-title">Bairros com empreendimentos Tegra</h2><div class="rio-reading-grid"><a href="{R_BARRA}"><strong>Barra da Tijuca</strong><br><small>Praia, Península, Jardim Oceânico e metrô até a Zona Sul. Sete empreendimentos Tegra.</small></a></div></div></section>
<section class="rio-section rio-faq" aria-labelledby="rio-faq-title"><div class="rio-wrap"><p class="rio-eyebrow">Perguntas frequentes</p><h2 id="rio-faq-title">Bairros do Rio</h2>{faq_html(FAQ_IDX)}</div></section>
<section class="rio-section rio-agent-section" id="atendimento" aria-labelledby="rio-agent-title"><div class="rio-wrap rio-agent-band"><div class="rio-agent-content"><h2 id="rio-agent-title">Atendimento exclusivo para seu próximo imóvel</h2><p>Conheça plantas, valores e condições dos empreendimentos Tegra no Rio de Janeiro.</p></div><a class="rio-btn" href="{wa(MSG_IDX)}" target="_blank" rel="noopener noreferrer">Conversar no WhatsApp</a></div></section>
{form("Bairros do Rio", "Receba plantas e condições dos empreendimentos no Rio", MSG_IDX)}
</main>
{FOOTER}
{dock(MSG_IDX)}
</body></html>
'''

for rel, content in (("src-greenn/rio-de-janeiro/regioes/oeste/barra-da-tijuca/index.html", barra), ("src-greenn/rio-de-janeiro/regioes/index.html", idx)):
    p = ROOT / rel
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(content, encoding="utf-8")
    print("ok", rel, len(content), "bytes")
