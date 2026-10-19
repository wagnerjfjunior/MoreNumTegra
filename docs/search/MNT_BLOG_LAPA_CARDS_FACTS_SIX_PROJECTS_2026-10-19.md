# MoreTegra Blog — fichas compactas em seis cards Caminhos da Lapa (2026-10-19)

## Fonte factual por empreendimento

| Empreendimento | Área | Dormitórios e suítes | Vagas | Fonte versionada |
|---|---|---|---|---|
| Garden Design | 61–78 m² | 2 ou 3 dormitórios com suíte | 1 vaga | `MoreNumTegra/src-greenn/empreendimentos/garden-design/index.html` |
| Nova Vivere | 72 ou 105 m² | 2 ou 3 suítes | 1 ou 2 vagas | `MoreNumTegra/src-greenn/empreendimentos/nova-vivere/index.html` |
| Elo Duo | 47, 55 ou 67 m² | 2 ou 3 dormitórios, 1 suíte | Até 1 vaga | `MoreNumTegra/src-greenn/empreendimentos/caminhos-da-lapa-elo-duo/index.html` |
| Reserva | 91, 127 ou 157 m² | 3 ou 4 dormitórios, 1–3 suítes | 2–3 vagas | `MoreNumTegra/src-greenn/empreendimentos/reserva-caminhos-da-lapa/index.html` |
| Jerivás | 105 ou 136 m² | 3 ou 4 dormitórios, 1–2 suítes | 2–3 vagas | `CaminhosdaLapaTegra/jerivas/index.html` |
| Home Club | 62 ou 79 m² | 2 ou 3 dormitórios, 1 suíte | 1–2 vagas | `CaminhosdaLapaTegra/home-club/index.html` |

Os números representam **tipologias de projeto**, não as características de uma unidade específica em estoque. Preservadas as diferenças entre ELO e Elo Duo, e entre os sete condomínios do complexo. Nenhuma oferta, preço ou unidade é anunciada como disponível por inferência.

## Mudanças

- Seis cards existentes ganham listas de três itens com rótulos: Área, Dormitórios, Vagas. Em Nova Vivere, a linha indica 2 ou 3 suítes, pois são os dois dormitórios ou três dormitórios todos suíte conforme landing.
- CSS encapsulado ao blog Lapa; sem JS externo, troca de imagens ou mudança comercial em páginas RESF.
- Mantidos links de quatro projetos ao MoreTegra e links de contato de Jerivás/Home Club à Sabrina.
- H1, title, canonical, JSON-LD e sitemap preservados.

## Gate e rollback

Static QA: exatamente seis listas com três linhas; conferência com as seis fontes acima, H1 único, JSON-LD válido. CI GitHub a aguardar. QA mobile/browser real ainda não é equivalência a CI. Rollback pelo revert do squash desta PR.