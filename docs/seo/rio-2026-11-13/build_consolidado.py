#!/usr/bin/env python3
"""Consolida o estudo de palavras-chave do Rio (Keyword Planner, 2026-11-13).

Uso (na raiz do repositório): python3 -I docs/seo/rio-2026-11-13/build_consolidado.py
Saída: docs/seo/rio-2026-11-13/rio-keywords-consolidado.csv (UTF-8).

Regras:
- Base principal: 08-barra_google_RJ (só rede Google, estado do RJ). É a fonte limpa para SEO.
- Colunas de comparação: 07 (Google, Brasil) e 06 (Google + parceiros, Brasil).
- Termos do Rio que só existem nos arquivos 04/05 (Google + parceiros) entram com fonte marcada:
  o volume pode estar inflado em uma faixa (10x).
- 09-empreendimentos-rj: nomes dos empreendimentos (Brasil; rede não registrada no arquivo).
- Volume do Planner vem em faixas: 50 = 10-100, 500 = 100-1 mil, 5000 = 1-10 mil, 50000 = 10-100 mil.
"""
import csv, io, re
from pathlib import Path

BASE = Path(__file__).resolve().parent
RAW = BASE / "raw" / "keyword-planner"
FAIXA = {0: "0-10", 50: "10-100", 500: "100-1 mil", 5000: "1-10 mil", 50000: "10-100 mil"}
RIO = re.compile(r"\brio\b|\brj\b|barra da tijuca|barra tijuca|pen[ií]nsula|oce[aâ]nico|recreio|tegra|kronos|gran thai|claris|gaea|singular|riio|lissoni", re.I)
NOT_RIO = re.compile(r"barra funda|rio grande|rio preto|rio claro|rio verde|rio branco|rio do sul|ribeir", re.I)


def load(name):
    raw = (RAW / name).read_bytes()
    text = raw.decode("utf-16" if raw[:2] in (b"\xff\xfe", b"\xfe\xff") else "utf-8")
    rows = list(csv.DictReader(io.StringIO(text.split("\n", 2)[2]), delimiter="\t"))
    out = {}
    for r in rows:
        k = (r.get("Keyword") or "").strip()
        if not k:
            continue
        try:
            v = int(float(r["Avg. monthly searches"]))
        except (TypeError, ValueError):
            v = None
        out[k] = {"vol": v, "comp": r.get("Competition", ""), "cpc_max": r.get("Top of page bid (high range)", ""), "tri": r.get("Mudança em três meses", "")}
    return out


def intent(k):
    k = k.lower()
    if re.search(r"alug|loca[cç]|kitnet|mobiliad|temporada", k):
        return "aluguel"
    if re.search(r"tegra|kronos|gran thai|claris|gaea|singular|riio|lissoni", k):
        return "marca/empreendimento"
    if re.search(r"na planta|planta |lan[cç]amento|construtora|incorporadora|empreendimento", k):
        return "na planta/lancamento"
    if re.search(r"condom", k):
        return "condominio"
    if re.search(r"venda|comprar|compra|apartament|apto|cobertura|im[oó]v|casa|mans", k):
        return "compra"
    return "informacional/outro"


def faixa(v):
    return FAIXA.get(v, "") if v is not None else ""


rj, brg, brp = load("08-barra_google_RJ.csv"), load("07-barra_google_BR.csv"), load("06-barra_google-parceiros_BR.csv")
emp = load("09-empreendimentos-rj_BR.csv")
parceiros = {}
for f in ("05-apartamento-cyrela_google-parceiros_BR.csv", "04-site-tegra_google-parceiros_BR.csv"):
    for k, v in load(f).items():
        if RIO.search(k) and not NOT_RIO.search(k) and k not in rj and k not in emp:
            parceiros.setdefault(k, v)

rows = []
for k, v in rj.items():
    rows.append([k, intent(k), faixa(v["vol"]), faixa(brg.get(k, {}).get("vol")), faixa(brp.get(k, {}).get("vol")), v["comp"], v["cpc_max"], "08 Google RJ"])
for k, v in emp.items():
    rows.append([k, intent(k), "", faixa(v["vol"]), "", v["comp"], v["cpc_max"], "09 empreendimentos BR (rede não registrada)"])
for k, v in parceiros.items():
    rows.append([k, intent(k), "", "", faixa(v["vol"]), v["comp"], v["cpc_max"], "04/05 Google+parceiros BR (pode estar inflado)"])

order = {"1-10 mil": 0, "10-100 mil": 0, "100-1 mil": 1, "10-100": 2, "0-10": 3, "": 4}
rows.sort(key=lambda r: (order[r[2] or r[3] or r[4]], r[1], r[0]))
with (BASE / "rio-keywords-consolidado.csv").open("w", newline="", encoding="utf-8") as fh:
    w = csv.writer(fh)
    w.writerow(["keyword", "intencao", "faixa_google_rj", "faixa_google_br", "faixa_google_parceiros_br", "concorrencia", "cpc_topo_max_brl", "fonte"])
    w.writerows(rows)
print(len(rows), "termos;", sum(r[7].startswith("08") for r in rows), "da base RJ;", len(parceiros), "só nos arquivos com parceiros;", len(emp), "empreendimentos")
