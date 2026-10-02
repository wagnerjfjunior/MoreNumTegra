$ErrorActionPreference = 'Stop'

$repo = (git rev-parse --show-toplevel).Trim()
if (-not $repo) { throw 'Execute dentro do clone MoreNumTegra.' }
$path = Join-Path $repo 'src-greenn/empreendimentos/nova-vivere/index.html'
if (-not (Test-Path $path)) { throw "Arquivo nao encontrado: $path" }

$branch = (git branch --show-current).Trim()
if ($branch -ne 'feat/nova-vivere-commercial-copy-search-v2-20261002') {
  throw "Branch incorreta: $branch"
}

$status = git status --porcelain
if ($status) { throw 'Worktree deve estar CLEAN antes do patch.' }

$html = [IO.File]::ReadAllText($path, [Text.Encoding]::UTF8)
$original = $html

function Replace-Exact([string]$old, [string]$new, [string]$label) {
  if (-not $script:html.Contains($old)) { throw "Trecho nao encontrado: $label" }
  $script:html = $script:html.Replace($old, $new)
  Write-Host "[OK] $label"
}

# Hero / mensagem principal
Replace-Exact 'Nova Vivere Tegra — apartamentos de 72 e 105 m² no Caminhos da Lapa' 'Tegra Nova Vivere Caminhos da Lapa — apartamentos de 72 e 105 m²' 'H1 produto + marca + localizacao'
Replace-Exact 'Apartamentos de 72 e 105 m², com 2 ou 3 suítes e 1 ou 2 vagas, em um projeto Tegra, Helbor e Toledo Ferrari.' 'Apartamentos de 72 m² com 2 suítes e 1 vaga e de 105 m² com 3 suítes e 2 vagas determinadas, sem sorteio. Um projeto Tegra, Helbor e Toledo Ferrari no Caminhos da Lapa.' 'hero lead'
Replace-Exact '<div><strong>1–2 vagas</strong><span>conforme planta</span></div>' '<div><strong>1–2 vagas</strong><span>105 m²: 2 determinadas</span></div>' 'hero vagas'

# Introducao comercial: elimina texto escrito para buscador, preserva termos relevantes de forma natural
Replace-Exact '<p class="eyebrow">Nova Vivere Tegra · Caminhos da Lapa</p>' '<p class="eyebrow">Tegra Nova Vivere · Caminhos da Lapa</p>' 'eyebrow Tegra Nova Vivere'
Replace-Exact '<p class="intro-copy">O Nova Vivere integra o Caminhos da Lapa com lazer para diferentes idades, áreas de convivência e conexão com a Rua Jardim, eixo arborizado com comércio, serviços e espaços para o dia a dia.</p><p>Para quem pesquisa Nova Vivere Tegra, Nova Vivere Caminhos da Lapa ou apartamento na Lapa, o projeto apresenta duas referências principais de planta: 72 m² com 2 suítes e 1 vaga e 105 m² com 3 suítes e 2 vagas, conforme configuração.</p><p>Na Zona Oeste de São Paulo, a proposta combina as tipologias residenciais com espaços de lazer e a mobilidade do entorno, incluindo conexão com a Estação Domingos de Moraes e acessos às marginais Tietê e Pinheiros.</p>' '<p class="intro-copy">O Tegra Nova Vivere Caminhos da Lapa reúne apartamentos de 72 m² com 2 suítes e 1 vaga e apartamentos de 105 m² com 3 suítes e 2 vagas determinadas, sem sorteio.</p><p>Na Lapa, Zona Oeste de São Paulo, o empreendimento combina plantas residenciais bem distribuídas, lazer para diferentes idades e áreas de convivência em um projeto conectado às principais vias de acesso da região.</p><p>A localização no Caminhos da Lapa aproxima o Nova Vivere da Rua Jardim, da Estação Domingos de Moraes e dos acessos às marginais Tietê e Pinheiros, com comércio e serviços no entorno.</p>' 'introducao comercial'

# Galeria: remove nota tecnica de implementacao
Replace-Exact '<p class="eyebrow">Galeria Nova Vivere</p><h2 id="gallery-title" class="display">Ambientes sem corte de enquadramento.</h2></div><p>As imagens são exibidas preservando o enquadramento original para que arquitetura, rooftop e áreas de lazer não sejam recortados.</p>' '<p class="eyebrow">Galeria Nova Vivere</p><h2 id="gallery-title" class="display">Conheça os ambientes e áreas de lazer.</h2></div><p>Veja perspectivas da arquitetura, espaços de convivência e áreas de lazer do Nova Vivere Caminhos da Lapa.</p>' 'galeria comercial'

# Tipologias / diferenciais
Replace-Exact '<article class="decision-item"><h3>72 m²</h3><p>2 suítes e 1 vaga, conforme configuração.</p></article><article class="decision-item"><h3>105 m²</h3><p>3 suítes e 2 vagas, conforme configuração.</p></article>' '<article class="decision-item"><h3>72 m²</h3><p>2 suítes, quartos e banheiros amplos e 1 vaga.</p></article><article class="decision-item"><h3>105 m²</h3><p>3 suítes e 2 vagas determinadas, sem sorteio.</p></article>' 'cards tipologias'
Replace-Exact '<article class="decision-item"><h3>72 m² · 2 suítes</h3><p>A planta de 72 m² favorece quem busca apartamento de 2 dormitórios na Lapa, com os dois dormitórios configurados como suítes e uma proposta mais compacta para a rotina. É uma alternativa a avaliar para casais, famílias menores ou compradores que priorizam praticidade sem abrir mão de áreas comuns de lazer.</p></article>' '<article class="decision-item"><h3>72 m² · 2 suítes · 1 vaga</h3><p>A planta de 72 m² oferece 2 dormitórios, ambos suítes, com quartos e banheiros amplos. A distribuição valoriza o conforto dos ambientes íntimos e mantém integração entre sala e áreas de convivência, com 1 vaga de garagem.</p></article>' 'copy 72 m2'
Replace-Exact '<article class="decision-item"><h3>105 m² · 3 suítes</h3><p>A opção de 105 m² amplia a área interna e atende quem busca apartamento de 3 dormitórios na Lapa, com três suítes e duas vagas conforme configuração. Pode atender melhor famílias que precisam de mais dormitórios, maior separação entre ambientes ou espaço adicional para trabalho e uso cotidiano.</p></article>' '<article class="decision-item"><h3>105 m² · 3 suítes · 2 vagas determinadas</h3><p>A planta de 105 m² amplia a área interna com 3 suítes e ambientes mais generosos. Nesta tipologia, as 2 vagas de garagem são determinadas, sem sorteio, um diferencial objetivo para quem valoriza previsibilidade e praticidade no uso diário.</p></article>' 'copy 105 m2'
Replace-Exact '<p class="mnt-plant-note">Antes de escolher, compare a unidade disponível, posição, planta, número de vagas, condições comerciais e aderência ao seu uso real dos ambientes e do entorno.</p>' '<p class="mnt-plant-note">Compare as plantas de 72 e 105 m², a posição da unidade, vagas e condições comerciais. A equipe Tegra Vendas pode confirmar as unidades disponíveis e orientar a escolha.</p>' 'nota comparacao'

# FAQ visivel
Replace-Exact '<details><summary>Quais são as metragens e plantas do Nova Vivere?</summary><p>O Nova Vivere possui apartamentos de 72 e 105 m². A configuração de 72 m² possui 2 suítes e 1 vaga; a de 105 m² possui 3 suítes e 2 vagas, conforme planta e unidade.</p></details>' '<details><summary>Quais são as metragens e plantas do Nova Vivere?</summary><p>O Nova Vivere possui apartamentos de 72 e 105 m². A planta de 72 m² tem 2 suítes, quartos e banheiros amplos e 1 vaga. A planta de 105 m² tem 3 suítes e 2 vagas determinadas, sem sorteio.</p></details>' 'FAQ metragens'
Replace-Exact '<details><summary>Quantos dormitórios e suítes tem o Nova Vivere?</summary><p>Para quem pesquisa apartamento de 2 dormitórios na Lapa, a planta de 72 m² possui 2 suítes. Para quem busca apartamento de 3 dormitórios, a planta de 105 m² possui 3 suítes.</p></details>' '<details><summary>Quantos dormitórios e suítes tem o Nova Vivere?</summary><p>O Nova Vivere oferece apartamento de 2 dormitórios na Lapa na planta de 72 m², com os 2 dormitórios configurados como suítes. A planta de 105 m² oferece 3 dormitórios, todos suítes.</p></details>' 'FAQ dormitorios'
Replace-Exact '<details><summary>Qual é a diferença entre os apartamentos de 72 e 105 m²?</summary><p>A planta de 72 m² é mais compacta, com 2 suítes e 1 vaga. A de 105 m² amplia a área privativa, com 3 suítes e 2 vagas conforme configuração. A escolha deve considerar espaço, rotina, posição da unidade, vagas e condição comercial.</p></details>' '<details><summary>Qual é a diferença entre os apartamentos de 72 e 105 m²?</summary><p>A planta de 72 m² tem 2 suítes, quartos e banheiros amplos e 1 vaga. A planta de 105 m² oferece mais área interna, 3 suítes e 2 vagas determinadas, sem sorteio. A escolha pode considerar espaço, posição da unidade e condição comercial.</p></details>' 'FAQ comparacao'
Replace-Exact '<details><summary>Onde fica o Nova Vivere Caminhos da Lapa?</summary><p>O Nova Vivere integra o Caminhos da Lapa, na Zona Oeste de São Paulo, conectado à Rua Jardim, à Estação Domingos de Moraes e aos acessos das marginais Tietê e Pinheiros. O endereço completo consta no rodapé comercial.</p></details>' '<details><summary>Onde fica o Nova Vivere Caminhos da Lapa?</summary><p>O Nova Vivere integra o Caminhos da Lapa, na Zona Oeste de São Paulo, conectado às principais vias de acesso da região e próximo à Rua Jardim e à Estação Domingos de Moraes. O endereço completo consta no rodapé comercial.</p></details>' 'FAQ localizacao'

# JSON-LD: disponibilidade real e alinhamento semantico com a pagina visivel
Replace-Exact '"description":"Nova Vivere no Caminhos da Lapa, empreendimento ativo na planta/em construção, com apartamentos de 72 e 105 m², 2 ou 3 suítes e 1 ou 2 vagas."' '"description":"Tegra Nova Vivere Caminhos da Lapa, empreendimento em construção com apartamentos de 72 m², 2 suítes e 1 vaga, e 105 m², 3 suítes e 2 vagas determinadas."' 'schema ApartmentComplex description'
Replace-Exact '"description":"Apartamento unidade 701 de 72,82 m² no Nova Vivere, empreendimento ativo na planta/em construção no Caminhos da Lapa."' '"description":"Apartamento unidade 701 de 72,82 m² no Tegra Nova Vivere Caminhos da Lapa, empreendimento em construção na Zona Oeste de São Paulo."' 'schema Product description'
Replace-Exact '"price":"852586.08","description":"Unidade 701 · 72,82 m² · referência de R$ 852.586,08. Disponibilidade e condições sujeitas à confirmação.","itemOffered"' '"price":"852586.08","availability":"https://schema.org/InStock","description":"Unidade 701 · 72,82 m² · referência de R$ 852.586,08. Disponibilidade e condições sujeitas à confirmação.","itemOffered"' 'schema Offer InStock'
Replace-Exact '"text":"O Nova Vivere possui apartamentos de 72 e 105 m². A configuração de 72 m² possui 2 suítes e 1 vaga; a de 105 m² possui 3 suítes e 2 vagas, conforme planta e unidade."' '"text":"O Nova Vivere possui apartamentos de 72 e 105 m². A planta de 72 m² tem 2 suítes, quartos e banheiros amplos e 1 vaga. A planta de 105 m² tem 3 suítes e 2 vagas determinadas, sem sorteio."' 'schema FAQ metragens'
Replace-Exact '"text":"Para quem pesquisa apartamento de 2 dormitórios na Lapa, a planta de 72 m² possui 2 suítes. Para quem busca apartamento de 3 dormitórios, a planta de 105 m² possui 3 suítes."' '"text":"O Nova Vivere oferece apartamento de 2 dormitórios na Lapa na planta de 72 m², com os 2 dormitórios configurados como suítes. A planta de 105 m² oferece 3 dormitórios, todos suítes."' 'schema FAQ dormitorios'
Replace-Exact '"text":"A planta de 72 m² é mais compacta, com 2 suítes e 1 vaga. A de 105 m² amplia a área privativa, com 3 suítes e 2 vagas conforme configuração. A escolha deve considerar espaço, rotina, posição da unidade, vagas e condição comercial."' '"text":"A planta de 72 m² tem 2 suítes, quartos e banheiros amplos e 1 vaga. A planta de 105 m² oferece mais área interna, 3 suítes e 2 vagas determinadas, sem sorteio. A escolha pode considerar espaço, posição da unidade e condição comercial."' 'schema FAQ comparacao'
Replace-Exact '"text":"O Nova Vivere integra o Caminhos da Lapa, na Zona Oeste de São Paulo, conectado à Rua Jardim, à Estação Domingos de Moraes e aos acessos das marginais Tietê e Pinheiros. O endereço completo consta no rodapé comercial."' '"text":"O Nova Vivere integra o Caminhos da Lapa, na Zona Oeste de São Paulo, conectado às principais vias de acesso da região e próximo à Rua Jardim e à Estação Domingos de Moraes. O endereço completo consta no rodapé comercial."' 'schema FAQ localizacao'

if ($html -eq $original) { throw 'Nenhuma alteracao aplicada.' }
[IO.File]::WriteAllText($path, $html, (New-Object Text.UTF8Encoding($false)))

# Validacoes de regressao simples
$checks = @(
  @{ Name='H1 novo'; Pattern='Tegra Nova Vivere Caminhos da Lapa — apartamentos de 72 e 105 m²' },
  @{ Name='InStock'; Pattern='"availability":"https://schema.org/InStock"' },
  @{ Name='2 vagas determinadas'; Pattern='2 vagas determinadas, sem sorteio' },
  @{ Name='quartos e banheiros amplos'; Pattern='quartos e banheiros amplos' }
)
foreach ($c in $checks) {
  if (-not $html.Contains($c.Pattern)) { throw "Validacao falhou: $($c.Name)" }
  Write-Host "[PASS] $($c.Name)"
}

$forbidden = @('Para quem pesquisa Nova Vivere Tegra','Ambientes sem corte de enquadramento.','As imagens são exibidas preservando o enquadramento original','Pode atender melhor famílias')
foreach ($f in $forbidden) {
  if ($html.Contains($f)) { throw "Residuo editorial ainda presente: $f" }
}

Write-Host ''
Write-Host '[DONE] Patch Nova Vivere aplicado localmente.'
Write-Host 'Valide em: http://localhost:8080/empreendimentos/nova-vivere/'
Write-Host 'Nenhum push, merge ou deploy foi executado.'
