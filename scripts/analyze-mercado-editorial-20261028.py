"""Reproducible keyword evidence. Standard library only; no runtime code."""
from pathlib import Path
from html.parser import HTMLParser
from collections import defaultdict
import csv, json, re, unicodedata, hashlib, subprocess

ROOT=Path('docs/editorial/mercado-2026-10-28')
BASE='bbe59c7a0b7b8a597826d56f6bc01d5291d9dfa5'
def norm(s):
    return ' '.join(''.join(c for c in unicodedata.normalize('NFD',s.lower()) if unicodedata.category(c)!='Mn').split())
class Text(HTMLParser):
    def __init__(self):super().__init__();self.parts=[];self.hidden=0
    def handle_starttag(self,t,a):
        if t in ('script','style'):self.hidden+=1
    def handle_endtag(self,t):
        if t in ('script','style'):self.hidden=max(0,self.hidden-1)
    def handle_data(self,s):
        if not self.hidden:self.parts.append(s)
def plain(s):
    p=Text();p.feed(s);return ' '.join(p.parts)
def editorial(s):
    match=re.search(r'<article\b[^>]*>([\s\S]*?)</article>',s)
    if not match:match=re.search(r'<main\b[^>]*>([\s\S]*?)</main>',s)
    t=match[1] if match else ''
    t=re.split(r'<section class="mnt-sabrina-card"|<section[^>]*id="sabrina|<section class="mnt-nextsteps"',t)[0]
    return norm(plain(t))
def canonical(s):
    for tag in re.findall(r'<link\b[^>]*>',s):
        attrs=dict(re.findall(r'([\w:-]+)="([^"]*)"',tag))
        if attrs.get('rel')=='canonical':return attrs.get('href')
def noindex(s):
    for tag in re.findall(r'<meta\b[^>]*>',s):
        attrs=dict(re.findall(r'([\w:-]+)="([^"]*)"',tag))
        if attrs.get('name')=='robots' and 'noindex' in attrs.get('content',''):return True
    return False

articles=json.loads((ROOT/'mapa-artigos.json').read_text())
v=json.loads(Path('vercel.json').read_text());rew={r['source']:r['destination'] for r in v['rewrites']}
existing=[]
for path in sorted(Path('src-greenn/blog/dicasedecor').glob('*/index.html')):
    s=subprocess.check_output(['git','show',BASE+':'+str(path)],text=True)
    if canonical(s) and not noindex(s):existing.append((str(path),s))
p='src-greenn/blog/mercado/valorizacao-imobiliaria-lapa-sao-paulo/index.html'
existing.append((p,subprocess.check_output(['git','show',BASE+':'+p],text=True)))
corpus=[]
for path,s in existing:
    title=re.search(r'<h1[^>]*>([\s\S]*?)</h1>',s)
    corpus.append({'file':path,'url':canonical(s),'h1':plain(title[1]),'text':editorial(s)})
assert len(corpus)==13, 'Expected 12 Dicas + Lapa'

planner=defaultdict(list);raw_rows=0
for path in sorted(Path('docs/search/data/search-intelligence/raw/google-keyword-planner').rglob('*.csv')):
    lines=path.read_text(encoding='utf-8-sig').splitlines()
    for row in csv.DictReader(lines[2:],delimiter='\t'):
        raw_rows+=1
        if row.get('Keyword'):planner[norm(row['Keyword'])].append({'keyword':row['Keyword'],'volume':row['Avg. monthly searches'],'competition':row['Competition'],'competition_index':row['Competition (indexed value)'],'file':str(path),'period':lines[1]})
m3=list(csv.DictReader(Path('docs/search/data/MNT_M3_01_PLANNER_UNIVERSE_2026-09-13.csv').open()))
gsc=json.loads((ROOT/'evidencias/gsc.json').read_text())
studies=[p for p in Path('docs/search').rglob('*') if p.suffix in ['.md','.csv'] and 'mercado-2026' not in str(p)]
study_texts={str(p):norm(p.read_text(errors='replace')) for p in studies}
decor=[('cozinha de apartamento','cozinha-apartamento-layout-uso-diario'),('iluminação natural','iluminacao-natural-apartamento-orientacao-solar'),('iluminação de apartamento','iluminacao-apartamento-camadas-circuitos'),('piso de apartamento','piso-apartamento-materiais-acustica-umidade'),('apartamento com pets','apartamento-com-pets-layout-materiais'),('brinquedoteca','brinquedoteca-condominio-uso-seguranca'),('quadras','quadras-condominio-tenis-beach-tennis'),('recarga de carro elétrico','recarga-carro-eletrico-condominio-infraestrutura'),('salão de festas','salao-festas-espaco-gourmet-como-avaliar'),('vaga de garagem','vaga-garagem-apartamento-acesso-manobra'),('cores para decoração','cores-decoracao-2026-paleta-apartamento'),('casa em condomínio','casa-condominio-layout-claris-barra')]
terms={}
for a in articles:
    for term in [a['keyword']]+a['secondary']:terms.setdefault(norm(term),(term,a))
for term,slug in decor:
    owner='/blog/dicasedecor/'+slug+'/'
    terms.setdefault(norm(term),(term,{'id':'EXISTING','url':owner,'priority':'P2','intent':'Guia específico Dicas & Decoração; preservar proprietário existente.','cannibalization':'Menção em Mercado não substitui cobertura específica.','h1':next(x['h1'] for x in corpus if x['url'].endswith(owner))}))
term='valorização imobiliária na Lapa'
terms[norm(term)]=(term,{'id':'EXISTING','url':'/blog/mercado/valorizacao-imobiliaria-lapa-sao-paulo/','priority':'P2','intent':'Preço e potencial imobiliário na Lapa; preservar URL existente.','cannibalization':'Não criar segunda URL sobre a mesma intenção.','h1':'Valorização na Lapa'})
for term,url,title in [('dsg itaim','/empreendimentos/dsg-itaim/','DSG Itaim'),('universo tatuapé órbita','/empreendimentos/universo-tatuape-orbita/','Universo Tatuapé Órbita'),('tegra tatuape','/regioes/tatuape/','Regional Tatuapé'),('lançamento itaim','/regioes/itaim-bibi/','Regional Itaim Bibi')]:
    terms[norm(term)]=(term,{'id':'EXISTING','url':url,'priority':'P1','intent':'Proprietário comercial existente; evidência relacionada às pautas de bairro, não prova demanda pela consulta editorial.','cannibalization':'Artigo informativo apoia, sem assumir marca, oferta ou consulta transacional.','h1':title})
out=[]
for k,(term,a) in terms.items():
    pattern=re.compile(r'(?<!\w)'+re.escape(k)+r'(?!\w)')
    counts=[(x['url'],len(pattern.findall(x['text']))) for x in corpus]
    kp=planner.get(k,[])
    live=[r for r in gsc['rows'] if norm(r['keys'][0])==k]
    impr=sum(r['impressions'] for r in live);click=sum(r['clicks'] for r in live)
    pos=sum(r['position']*r['impressions'] for r in live)/impr if impr else None
    freq=sum(c for _,c in counts)
    row={'termo':term,'variantes_do_cluster':'; '.join(a.get('secondary',[])),'ocorrencias_existentes':freq,'artigos_que_mencionam':sum(c>0 for _,c in counts),'urls_com_ocorrencias':'; '.join(u+' ['+str(c)+']' for u,c in counts if c),'presenca_estudos':'; '.join(p for p,s in study_texts.items() if pattern.search(s)),'planner_volume':kp[0]['volume'] if kp else 'NOT_AVAILABLE_EXACT_ROW','planner_concorrencia_ads':kp[0]['competition'] if kp else 'NOT_AVAILABLE_EXACT_ROW','planner_index_ads':kp[0]['competition_index'] if kp else 'NOT_AVAILABLE_EXACT_ROW','planner_fontes':'; '.join(x['file'] for x in kp),'planner_periodo':kp[0]['period'] if kp else 'NOT_AVAILABLE','gsc_impressions':impr if live else 'NO_EXPOSED_EXACT_ROW','gsc_clicks':click if live else 'NO_EXPOSED_EXACT_ROW','gsc_ctr':round(click/impr,6) if impr else 'NOT_AVAILABLE','gsc_position':round(pos,2) if pos else 'NOT_AVAILABLE','gsc_periodo':gsc['startDate']+' / '+gsc['endDate'],'url_proprietaria':'https://www.moretegra.com.br'+a['url'],'prioridade':a['priority'],'artigo_responsavel':a['h1'],'intencao_e_gap':a['intent'],'cobertura':('Artigo específico existente; revisar qualidade separadamente' if a['id']=='EXISTING' else 'Novo artigo proposto; '+('menção existente não prova intenção atendida' if freq else 'sem ocorrência literal neste corpus')),'risco_canibalizacao':a['cannibalization']}
    historical=[r for r in m3 if norm(r['query'])==k]
    row['m3_resumo_volume_historico']=historical[0]['avg_monthly_searches'] if historical else 'NOT_AVAILABLE_EXACT_ROW'
    row['m3_resumo_ads_index_historico']=historical[0]['ads_competition_index'] if historical else 'NOT_AVAILABLE_EXACT_ROW'
    row['m3_resumo_fonte']='docs/search/data/MNT_M3_01_PLANNER_UNIVERSE_2026-09-13.csv' if historical else ''
    row['planner_linhas_observadas']=json.dumps(kp,ensure_ascii=False)
    if kp and len({(r['volume'],r['competition'],r['competition_index']) for r in kp})>1:
        row['planner_volume']='MULTIPLE_VALUES_SEE_RAW_ROWS'
        row['planner_concorrencia_ads']='MULTIPLE_VALUES_SEE_RAW_ROWS'
        row['planner_index_ads']='MULTIPLE_VALUES_SEE_RAW_ROWS'
    out.append(row)
with (ROOT/'matriz-seo-unificada.csv').open('w',newline='') as f:
    writer=csv.DictWriter(f,fieldnames=list(out[0]));writer.writeheader();writer.writerows(out)
(ROOT/'matriz-seo-unificada.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
(ROOT/'inventario-existentes.json').write_text(json.dumps([{k:v for k,v in x.items() if k!='text'} for x in corpus],ensure_ascii=False,indent=2)+'\n')
# Query split is an observation, not proof of harmful cannibalization.
byq=defaultdict(list)
for r in gsc['rows']:byq[r['keys'][0]].append(r)
overlap=[{'query':q,'rows':rs,'interpretation':'MULTI_URL_OBSERVED_NOT_PROOF_OF_HARM'} for q,rs in byq.items() if len(rs)>1]
(ROOT/'evidencias/gsc-sobreposicoes.json').write_text(json.dumps(overlap,ensure_ascii=False,indent=2)+'\n')
summary={'baseline':BASE,'existing_articles':len(corpus),'matrix_terms':len(out),'planner_raw_rows_read':raw_rows,'planner_unique_normalized':len(planner),'planner_m3_summary_rows':len(m3),'original_3859_rows_available':False,'gsc_rows':len(gsc['rows']),'matrix_rows_with_gsc':sum(isinstance(r['gsc_impressions'],int) for r in out),'editorial_primary_terms_with_gsc':sum(isinstance(r['gsc_impressions'],int) for r in out if r['termo'] in [a['keyword'] for a in articles]),'multi_url_queries':len(overlap),'method':'Case/accent/whitespace normalized phrase boundaries; H1 + editorial text, no metadata or Sabrina/cards. Frequency is not intent coverage. No suppressed GSC query is inferred.'}
(ROOT/'evidencias/analise-resumo.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(summary,ensure_ascii=False))
