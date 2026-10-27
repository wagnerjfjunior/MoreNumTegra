# Matriz comercial MoreTegra — 27/10/2026

Escopo exclusivo: 43 URLs comerciais (27 empreendimentos, 14 regiões, home e investimentos). Blog fora do escopo.

- Fonte canônica: `wagnerjfjunior/MoreNumTegra`, sitemap.xml e vercel.json.
- Auditoria OpenSEO: `1d8ee177-e5dc-4511-9880-83fba4b96124` (27/10), 43 páginas comerciais HTTP 200 e tecnicamente indexáveis.
- GSC via OpenSEO: relatório de **desempenho** (24/07–24/10/2026), não inspeção de cobertura. 42 URLs comerciais registraram impressões; Jerivás sem linha. Sem impressões NÃO equivale a não indexada.
- Bing Webmaster: painel conectado Site Explorer mostra 37 URLs no nó sem www, com 3 indexed, 33 warning, 1 excluded; NÃO representa cobertura individual das 43 URLs com www nem total global do domínio.
- Sitemap antes: 57 total, 42 comerciais. Esta proposta inclui Studios Berrini: 58 total, 43 comerciais. Blog preservado.
- Dados individualizados de GSC Coverage e Bing Indexed não foram disponibilizados pelos conectores; a matriz conserva NOT_VERIFIED_PER_URL sem inferir status.
- Canonical: **43/43 self-canonical www PASS na leitura do HTML-fonte do GitHub** (primeiras 130 linhas das 43 rotas Vercel). Redirecionamento não-www permanece sem teste HTTP individual: padronização esperada `https://www.moretegra.com.br/`, mas não declarar 43 testes por URL nem resposta HTTP de rede até obter evidência. Rotas presentes no vercel.json não provam canonical HTML. Evidência anterior SFJM: amostras 308/301 e alguns dois saltos.
- Falta testar GSC inspeção Jerivás e exportar Bing Site Explorer por URL; manter pendências abertas.

Arquivo estruturado: `docs/sfjm/MNT_COMMERCIAL_43_RECONCILIATION_2026-10-27.csv`.

Gates: PR, CI exact-head, merge, deployment READY, releitura de sitemap publicado e matriz SFJM. Não alterar blog, meta robots, canonical, DNS ou redirects neste escopo.
