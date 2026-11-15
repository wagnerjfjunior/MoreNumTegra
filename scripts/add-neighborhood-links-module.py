#!/usr/bin/env python3
"""Módulo "Mais em <bairro>" nas páginas de empreendimento de SP (SFJM 2026-11-15).
Liga cada projeto ao guia do bairro e aos projetos irmãos, com o nome do projeto como texto do link.
Uso: python3 scripts/add-neighborhood-links-module.py [--check]   (idempotente; --check só relata)
Só usa fatos já publicados nas próprias páginas (metadescrição/tipologias). Sem preço, sem disponibilidade, sem endereço."""
import re, sys, html
ROOT = "src-greenn/empreendimentos/"
CSS_ADAPT = (".mnb{margin:26px 0 0;padding:0;list-style:none;border-top:1px solid rgba(128,128,128,.4)}"
       ".mnb li{border-bottom:1px solid rgba(128,128,128,.4);padding:16px 0}"
       ".mnb a{color:inherit;font-weight:800;text-decoration:underline;text-decoration-color:#EBB92E;text-underline-offset:4px}"
       ".mnb span{display:block;max-width:820px;opacity:.78;margin-top:4px}")
CSS = (".mnb{margin:26px 0 0;padding:0;list-style:none;border-top:1px solid var(--line)}"
       ".mnb li{border-bottom:1px solid var(--line);padding:16px 0}"
       ".mnb a{color:var(--ink);font-weight:800;text-decoration:underline;text-decoration-color:var(--yellow);text-underline-offset:4px}"
       ".mnb span{display:block;max-width:820px;color:var(--muted);margin-top:4px}")
BAIRROS = {
 "moema": ("Moema", ["ayla-moema-studio-office","bem-moema","bem-moema-studios-offices","chez-vous-moema","key-moema","viso-moema"]),
 "perdizes": ("Perdizes", ["ode-perdizes","soma-perdizes"]),
 "vila-nova-conceicao": ("Vila Nova Conceição", ["bueno-brandao-257","tiel-vila-nova-conceicao"]),
 "lapa": ("Lapa", ["caminhos-da-lapa-elo-duo","garden-design","nova-vivere","reserva-caminhos-da-lapa"]),
 "brooklin": ("Brooklin", ["ampere-brooklin","ledge-brooklin","studios-berrini"]),
 "tatuape": ("Tatuapé", ["universo-tatuape-orbita"]),
 "sacoma": ("Sacomã", ["teg-sacoma"]),
 "jardins": ("Jardins", ["zahle-jardins"]),
}
NOME = {
 "ayla-moema-studio-office":"Ayla Moema Studio & Office","bem-moema":"Bem Moema","bem-moema-studios-offices":"Bem Moema Studios & Offices",
 "chez-vous-moema":"Chez Vous Moema","key-moema":"Key Moema","viso-moema":"Viso Moema","ode-perdizes":"ODE Perdizes","soma-perdizes":"Soma Perdizes",
 "bueno-brandao-257":"Bueno Brandão 257","tiel-vila-nova-conceicao":"Tièl Vila Nova Conceição","caminhos-da-lapa-elo-duo":"Elo Duo Caminhos da Lapa",
 "garden-design":"Garden Design Caminhos da Lapa","nova-vivere":"Nova Vivere Caminhos da Lapa","reserva-caminhos-da-lapa":"Reserva Caminhos da Lapa",
 "ampere-brooklin":"Ampère Brooklin","ledge-brooklin":"Ledge Brooklin","studios-berrini":"Studios Berrini NR",
}
# descritores = fatos já publicados nas metadescrições/H1 de cada página
DESC = {
 "ayla-moema-studio-office":"Studios de 21 a 37 m² e salas comerciais de 24 a 64 m².",
 "bem-moema":"Apartamentos de 80, 123 e 148 m², de 2 a 4 dormitórios.",
 "bem-moema-studios-offices":"Studios de 26 a 29 m², apartamentos de 36 m² e offices de 26 a 36 m².",
 "chez-vous-moema":"Apartamentos de 71 m², com 2 dormitórios, 1 suíte e 1 vaga.",
 "key-moema":"Apartamentos de 62 a 74 m², com 2 dormitórios e 1 a 2 suítes.",
 "viso-moema":"Apartamentos de 74 e 115 m², com 2 ou 3 suítes.",
 "ode-perdizes":"Apartamento de 156 m², com 4 dormitórios, pronto para morar.",
 "soma-perdizes":"Apartamentos de 41 e 45 m², studios de 25 m² e salas comerciais.",
 "bueno-brandao-257":"Alto padrão com 5 suítes e plantas de 500 a 923 m².",
 "tiel-vila-nova-conceicao":"Studios e apartamentos prontos para morar.",
 "caminhos-da-lapa-elo-duo":"Apartamentos prontos para morar, com 2 ou 3 dormitórios.",
 "garden-design":"Apartamentos de 61 a 78 m², com 2 ou 3 dormitórios.",
 "nova-vivere":"Apartamentos de 72 e 105 m², com 2 ou 3 suítes.",
 "reserva-caminhos-da-lapa":"Projeto entregue, com plantas de 91, 127 e 157 m².",
 "ampere-brooklin":"Apartamentos de 262 m², com 4 suítes, em torre única.",
 "ledge-brooklin":"Apartamentos de 70, 80 e 122 m² e studios de 30 a 40 m².",
 "studios-berrini":"Studios e unidades de 29,63 a 56,16 m².",
}
# páginas editáveis (as demais estão travadas por validador ou fora do escopo)
EDIT = ["ayla-moema-studio-office","chez-vous-moema","key-moema","viso-moema","ode-perdizes","soma-perdizes","bueno-brandao-257",
        "tiel-vila-nova-conceicao","caminhos-da-lapa-elo-duo","studios-berrini","teg-sacoma","universo-tatuape-orbita","zahle-jardins"]

def module(bslug, slug):
    label, members = BAIRROS[bslug]
    irm = [m for m in members if m != slug and m in NOME]
    li = [f'<li><a href="/regioes/{bslug}/">Apartamentos e projetos Tegra em {label}</a><span>Guia do bairro com localização, rotina e os projetos Tegra da região.</span></li>']
    for m in irm:
        li.append(f'<li><a href="/empreendimentos/{m}/">{html.escape(NOME[m], quote=False)}</a><span>{DESC[m]}</span></li>')
    if irm:
        h2 = f"{label}: outros projetos Tegra para comparar."
        p = "Compare tipologias e localização no bairro antes de falar com o Time Tegra Vendas."
    else:
        h2 = f"Conheça {label} antes de escolher."
        p = "O guia do bairro reúne localização, rotina e o contexto do projeto."
    ul = f'<ul class="mnb">{"".join(li)}</ul>'
    if slug == "caminhos-da-lapa-elo-duo":  # sistema de design próprio (mt-*)
        return (f'<section id="mais-no-bairro" aria-labelledby="mnb-title"><div class="mt-shell"><div class="mt-section-head">'
                f'<p class="mt-eyebrow">MAIS EM {label.upper()}</p><h2 id="mnb-title">{h2}</h2><p>{p}</p></div>{ul}</div></section>')
    if slug == "studios-berrini":
        return (f'<section class="section berrini-faq" id="mais-no-bairro" aria-labelledby="mnb-title"><div class="wrap">'
                f'<p class="eyebrow">Mais em {label}</p><h2 id="mnb-title" class="display">{h2}</h2><p>{p}</p>{ul}</div></section>')
    return (f'<section class="section residences" id="mais-no-bairro" aria-labelledby="mnb-title"><div class="wrap">'
            f'<p class="eyebrow">Mais em {label}</p><h2 id="mnb-title" class="display">{h2}</h2><p>{p}</p>{ul}</div></section>')

def main():
    check = "--check" in sys.argv
    todo = {}
    for b, (label, members) in BAIRROS.items():
        for m in members:
            if m in EDIT: todo[m] = b
    assert set(todo) == set(EDIT), set(EDIT) ^ set(todo)
    for slug, b in todo.items():
        f = f"{ROOT}{slug}/index.html"
        s = open(f, encoding="utf-8").read()
        had = 'id="mais-no-bairro"' in s
        new = module(b, slug)
        if had:
            s2 = re.sub(r'<section [^>]*id="mais-no-bairro".*?</section>', lambda _: new, s, count=1, flags=re.S)
        else:
            m = re.search(r'<section (?:class="lead[^"]*" )?id="formulario"', s)
            assert m, slug + ": âncora do formulário não encontrada"
            s2 = s[:m.start()] + new + s[m.start():]
        css = CSS_ADAPT if slug in ("caminhos-da-lapa-elo-duo", "studios-berrini") else CSS
        if css not in s2:
            i = s2.find("</style>"); assert i > 0, slug + ": sem <style>"
            s2 = s2[:i] + css + s2[i:]
        print(("ok(já tinha)" if had else "novo"), slug, "->", b, f"+{len(s2)-len(s)}B")
        if not check: open(f, "w", encoding="utf-8").write(s2)
main()
