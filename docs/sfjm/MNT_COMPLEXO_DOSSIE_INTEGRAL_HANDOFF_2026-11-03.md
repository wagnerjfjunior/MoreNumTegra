# SFJM — DOSSIÊ HISTÓRICO INTEGRAL E HANDOFF: Complexo Viário Pirituba–Lapa
**Data de corte:** 03/11/2026. **Projeto:** MoreNumTegra. **Fonte canônica:** \`wagnerjfjunior/MoreNumTegra\` (GitHub).
**Branch ativa DESTE LOTE:** \`feat/complexo-unificacao-pranchas-2-3-4-5-20261103\`.
**Objetivo:** preservar TODO o contexto do ciclo de desenvolvimento dos simuladores, da capa, das pranchas e das animações para continuidade sem perguntas repetidas, sem reinvenção de geometrias, sem confundir homologação LVR e produção. Este dossiê não substitui os handoffs das outras frentes imobiliárias, SEO, CRM e Greenn.

> ORDEM DE PRECEDÊNCIA: estado GitHub live \`main\`/branch > documentos SFJM mais recentes > históricos antigos > recordações. Ao retomar, ler este dossiê, o documento incremental da prancha 5 e os cinco documentos canônicos, e só então modificar código. O documento registra fatos conferidos e também as incertezas. Não confundir commit de documentação com commit funcional nem com release. Não executar merge/deploy sem autorização explícita.

## 1. Resumo do estado presente
- **Branch remota real para LVR:** \`feat/complexo-unificacao-pranchas-2-3-4-5-20261103\`. Sua criação foi confirmada diretamente por \`create_branch\` e \`fetch_file\`; antes disso ela havia sido anunciada sem existir, ocasionando erro local \`fatal: ambiguous argument origin/feat/complexo-unificacao-pranchas-2-3-4-5-20261103\`. Falha era a referência remota inexistente, NÃO defeito no SFJM local do usuário. Em sequência a branch foi criada e o usuário confirmou "funcionou!!!".
- **Último commit funcional à data deste dossiê:** \`957bf61a838411b5be9ec46f8ddf80722453a6b5\`, ajuste de contraste das três rotas do simulador 6; **ainda NÃO validado pelo usuário no LVR**. Resolver HEAD live ao retomar; haverá commit documental posterior.
- **Comparação GitHub imediatamente antes da documentação:** branch 47 commits à frente de \`main\` e 0 atrás, base SHA apresentado \`d4f7d93b27cb2c4342df61386414012b9ef0de55\`; comparação temporal, não valor imutável.
- **Arte única dos cenários 2–6:** \`src-greenn/complexo-lapa-pirituba/assets/Prancha5_Mapa_Aprovado_Tiete_Escola_Mercado_Drogaria.webp\`, resolução **1500×1049**, SVG \`viewBox="0 0 1500 1049"\`; blob WebP verificado previamente \`d9e384983af54d8ad0d5bd001e67e59f765a61fe\`. No mapa, Tietê Plaza Shopping, Escola Alexandre Von Humboldt, Pão de Açúcar, Drogasil. Imagem fornecida/aprovada pelo usuário.
- **Cenário 1 NÃO usa essa arte compartilhada.** Mantém imagem e SVG próprios; recebeu apenas limpeza visual de rodapé nesta branch.
- **C2:** duas rotas desde Ayrton Senna, carros e linhas em dois verdes; 16 carros ambientes de Marginal; dois trens vermelhos com oito composições cada.
- **C3:** Lapa/Pirituba → Marginal Pinheiros, 16 carros principais, 16 ambientes e dois trens. A correção solicitada para cores por ORIGEM deve ser auditada: há registros/código legados com "Lapa azul/Pirituba laranja" (contrários à regra).
- **C4:** Pirituba → Piqueri e Pirituba → Ayrton Senna; rotas azuis; 16 carros principais, 16 ambientes, dois trens vermelhos com oito composições cada; segmento recalibrado do caminho Ayrton Senna aprovado pelo usuário.
- **C5:** Marginal Pinheiros → Pirituba, **roxo #8B5CF6**, oito carros roxos, mais 16 ambientes e dois trens; geometria de 33 pontos fornecida pelo usuário.
- **C6:** origem Condomínios com 3 rotas independentes A/B/C, pontos 26/44/41, 8 carros por rota, 16 ambientes e dois trens. Três tons atuais **A #007985**, **B #00B8C7**, **C #B9EDCF**. Aprovado visualmente APENAS A ("A ficou bom"); B/C tinham contraste insuficiente e **acabam de ser ajustados**; novo aceite pendente. O destino exato de A/B/C (Lapa, Ayrton Senna, Marginal Pinheiros) não foi mapeado/autorizado: NÃO inventar correspondência.
- **Estado de produção:** este lote de unificação está exclusivamente na BRANCH, sem merge/deploy em produção. A produção anterior do quarto cenário está documentada pela PR #538. Nunca afirmar que a versão C6/caminhos/trens novos está publicada.
- **Verificações:** validação estática de 5/5 scripts embutidos no HTML principal e 3/3 nos HTMLs filhos nas etapas relevantes; não equivale a QA visual/browser, responsividade completa, Web Vitals ou liberação operacional de vias.

## 2. Governança, disciplina de implementação e fluxo
1. Repositório \`wagnerjfjunior/MoreNumTegra\` é fonte canônica; \`main\` representa linha integrada, branch de feature = área de trabalho/teste LVR. Vercel e domínio publicado são observados separadamente.
2. Ler ANTES de mudanças materiais: \`bootstrap/BOOTSTRAP_CANONICO.md\`; \`handoffs/CURRENT.md\`; \`docs/PROJECT_STATUS.md\`; \`docs/NEXT_SAFE_ACTION.md\`; \`docs/BLOCKED_ACTIONS.md\`; baselines SFJM aplicáveis e documentação incremental.
3. LVR local seleciona branch remota EXATA, normalmente \`http://localhost:8080/complexo-lapa-pirituba/\` conforme registros prévios. Pode requerer refresh e reinicialização porque branch de uma sessão fica retida. Nunca anunciar uma branch sem criá-la e verificar \`fetch_file(ref=branch)\`.
4. Não fazer merge, PR ready, Vercel production, Greenn, alteração de CRM/SEO/campanhas, índice robots, webhook ou serviço externo sem novo pedido e autorização aplicável. Reversão por arquivo/commit isolado, sem force-push/reset de main.
5. HTML5/CSS/JS vanilla; SVG inline por sobreposição do WebP; foco mobile, toque, carregamento leve, LVR para validação. A base documental de 2019 não autoriza tratar animação como rota operável/trânsito atual.
6. Coordenadas traçadas pelo usuário prevalecem; não fabricar segmentos, não estender pistas à força e não reverter curvas/rotatórias já aprovadas.
7. O editor SVG é ferramenta **temporária de homologação**, não componente final para usuários do site. Arquivar/reter capacidade de recuperação antes da release.

## 3. Histórico cronológico e registros de release ANTERIORES (não confundir com branch atual)
### 31/10 a 01/11 — origens e simuladores
- Usuário forneceu apresentação PDF e mapas, pediu animações de trajetos pontilhados e carros movendo-se sobre pistas do Complexo Pirituba–Lapa; construção de múltiplos cenários com sentidos diferentes, legenda intuitiva e experiência mobile.
- Problemas encontrados e corrigidos em rodadas LVR: tráfego ambiente sobre rio/shopping, curvas da Marginal, rotatória azul, faixas principal/ambiente sobrepostas, orientação e dimensões de veículos. C1/C2/C3 foram mantidos como implementações separadas com mapas técnicos, JSONs de rotas próprios.
- Simulador 3 teve aceite visual LVR no baseline \`158e23a8c44057fe024986874f1b37542dbdb5d3\`; documento \`docs/sfjm/MNT_COMPLEXO_SIMULADOR3_ACEITE_LVR_2026-11-01.md\`. Esse baseline antigo precede mudanças posteriores de mapa/cor. A rota azul e sentido da rotatória tinham proteção explícita de não redesenhar arbitrariamente.
### 02/11 — produção dos primeiros cenários e capa
- **PR #528**, autorização literal para merge/produção; merge \`6c49bdbca2eed63358ef6625e3c37ef2392fefe9\`, Vercel READY \`dpl_6CEBRDtfEo11bBeqmREffq5rPNFd\`. Escopo eram simuladores 1–3, favicon e ajustes de animação. Histórico/rollback em \`docs/sfjm/MNT_COMPLEXO_RELEASE_PR528_PRODUCAO_2026-11-02.md\`.
- **PR #533**, substituição de 3 cards rejeitados por capa única; autorização "Vou testar em produção mas cuide do rollback"; merge \`60b8bdb839e3a34f987f80558595188e7c683305\`, Vercel READY \`dpl_GaocVCL1UD8UMrTbLp7R3oP3Prg8\`, alias www. Rollback anterior \`dpl_4vAHBB7UXbyYX3JofdaojFnwXoYK\` (estado histórico; verificar antes de usar), documentação \`docs/sfjm/MNT_COMPLEXO_CAPA_UNICA_RELEASE_PR533_2026-11-02.md\`. Capa com controles mobile e links para cenários, sem recriar 3 cards.
- **PR #535:** UX V2 entrou em produção conforme \`handoffs/CURRENT.md\`; validar o registro específico antes de citar SHA/runtime.
### 03/11 — quarto cenário e início do lote da prancha compartilhada
- **PR #538** foi aprovada e mergeada: \`c4c37f5d4c5a3b94089ece6cccbafcff7f3e6e1a\`. Vercel production READY \`dpl_2eYYe3WxdhZeMMNgrZZg3XMA4n7w\`. C4 tinha quatro caminhos (duas rotas principais e duas do ambiente), total de 110 pontos calibração, 8+8+8+8 carros, ajuste da imagem Figura 2. Rollback de produção pré-PR538 \`247bef9a0635768e952d75b512760ffe5adc6dae\` (preferir revert seletivo; não reset). Documento em \`handoffs/CURRENT.md\`, calibrador arquivado em \`docs/sfjm/MNT_CALIBRADOR_REUSO_PRANCHA5_2026-11-03.md\`.
- Na branch \`feat/complexo-prancha5-marginal-pirituba-20261103\` começou construção de cenário 5 e adoção de nova prancha editorial. Depois foi criada \`feat/complexo-unificacao-pranchas-2-3-4-5-20261103\`.
- **Incidente importante:** foi anunciado ao usuário nome da branch de unificação antes de sua criação. SFJM local deu \`fatal: ambiguous argument origin/feat/complexo-unificacao-pranchas-2-3-4-5-20261103\`. Confirmou-se causa; branch criada via GitHub e validada por \`fetch_file\`; o usuário testou e afirmou "funcionou!!!". Não repetir falha.

## 4. Arquivos e árvore de dependências
| Caminho | Responsabilidade |
|---|---|
| \`src-greenn/complexo-lapa-pirituba/index.html\` | Seletor de 13 cenários; iframes dos primeiros três; overlays SVG nativos de C4/C5/C6; guias de Marginal, trem, calibradores C4/C5/C6, legendas, carrinhos e animações. |
| \`src-greenn/complexo-lapa-pirituba/duplo/index.html\` | C1 com própria imagem/viewBox/JSON; legenda inferior simplificada, sem alteração das geometrias. |
| \`src-greenn/complexo-lapa-pirituba/duplo-ayrton/index.html\` | C2 com duas rotas verdes, imagem compartilhada, Marginal comum, trens replicados e JSONs originais/editoriais. |
| \`src-greenn/complexo-lapa-pirituba/marginal-duplo/index.html\` | C3 com duas rotas e JSONs \`routes-marginal.json\`, \`routes-marginal-editorial.json\`, Marginal comum e trens replicados. |
| \`src-greenn/complexo-lapa-pirituba/assets/Prancha5_Mapa_Aprovado_Tiete_Escola_Mercado_Drogaria.webp\` | Imagem comum C2–C6 (1500×1049). |
| \`src-greenn/complexo-lapa-pirituba/routes-verified.json\` | Dados SVG existentes dos cenários individuais; não fabricar paths que não estejam lá. |
| \`docs/sfjm/MNT_PRANCHA5_REUSO_FIGURA2_2026-11-03.md\` | Registro incremental (commits/rollback/testes) deste lote. |
| \`docs/sfjm/MNT_COMPLEXO_DOSSIE_INTEGRAL_HANDOFF_2026-11-03.md\` | ESTE DOCUMENTO, leitura obrigatória. |
| \`docs/sfjm/MNT_CALIBRADOR_REUSO_PRANCHA5_2026-11-03.md\` | Editor original arquivado para reuso. |

\`routePages=[19,21,23,25,27,28,29,30,31,32,33,34,35]\`. Índices zero-based no HTML:
- **0=C1**, página 19/20, Lapa ↔ Pirituba, \`dualEmbed\`.
- **1=C2**, página 21/22, Ayrton Senna → Lapa/Pirituba, \`ayrtonEmbed\`.
- **2=C3**, página 23/24, Lapa/Pirituba → Marginal Pinheiros, \`marginalDualEmbed\`.
- **3=C4**, página 25 (ref. 26), Pirituba → Piqueri/Ayrton Senna, nativo.
- **4=C5**, página 27, Marginal Pinheiros → Pirituba, nativo.
- **5=C6**, página 28, Condomínios → três acessos (destinos ainda em confirmação), nativo.
- **6–12=C7–C13** páginas 29–35, outros acessos. NÃO modificar sem pedido.

## 5. Regras de design visual, interface e origem
### Capa e navegação
- Três cards de capa rejeitados e substituídos por uma capa única (PR #533). Não restaurar cards por impulso.
- Navegação superior duplicada contendo apenas opções 1,2,3 foi removida na branch; seletor \`#route\` de todos os 13 percursos **deve permanecer**, além de anterior/próximo e gestos.
- Blocos inferiores extensos "Referências da região", rua John Harrison/Gago Coutinho/Martin Tenório/Carlos Bertini, justificativas técnicas, "Controle da circulação", controles de paradas e longos resumos de 32 carros foram removidos dos sub-simuladores. O HTML pai retém contexto histórico e FAQ para SEO: não interpretá-lo como "baboseira" a apagar sem novo pedido.
- Padrão: \`Sentidos do trajeto\` + desenhos de carro da cor correta + rótulo curto. Alguns inputs antigos \`showOrange/showBlue/showStops\` ficaram ocultos no DOM para preservar handlers JS.
### Matriz por origem (e não por destino!)
| Origem | Regra visual |
|---|---|
| Pirituba | Azul \`#137CF1\`, possível variante clara \`#4BA3FA\` para diferentes trajetos dessa mesma origem |
| Lapa | Laranja \`#FF5F00\` |
| Ayrton Senna | VERDE, não azul/laranja. C2 para Pirituba \`#16834A\` (verde escuro), C2 para Lapa \`#36B86B\` (verde claro). |
| Marginal Pinheiros | Roxo \`#8B5CF6\` |
| Condomínios | Família turquesa, três percursos: A \`#007985\`; B \`#00B8C7\`; C \`#B9EDCF\`. Contraste atualizado porque B/C eram parecidos demais. |

**DÍVIDA TÉCNICA C3 — COR INVERTIDA:** usuário afirmou explicitamente: origem Pirituba AZUL, origem Lapa LARANJA. Uma resposta anterior reconheceu, mas não executou corretamente o patch. Na revisão do pai permaneceu status "Lapa (azul) e Pirituba (laranja)" e pode haver CSS/carrinhos assim no C3. Auditar live \`marginal-duplo/index.html\`, IDs, linhas, legenda, origem de cada rota (páginas 23 e 24), \`postMessage\` e painel pai. Corrigir somente cores, não geometria. NÃO afirmar resolvido ainda.

## 6. A prancha comum e os dois sentidos da Marginal Tietê
- WebP \`Prancha5_Mapa_Aprovado_Tiete_Escola_Mercado_Drogaria.webp\`, 1500×1049, para C2–C6, com fallback para mapa técnico original nas páginas C2/C3 e para rota JPG quando cabível no pai. Conferir \`naturalWidth\` e \`viewBox\` para não calibrar em fallback de resolução divergente.
- Marginal Tietê: referência geométrica é C4. Guia superior **14 pontos**, inicia \`(1469,544)\` e termina \`(12,740)\`; guia inferior **17 pontos**, inicia \`(27,908)\` e termina \`(1481,667)\`. Trajetos exatos \`guides\` em \`index.html\` de C4, copiados para C2,C3,C5,C6.
- **16 veículos neutros**, 8 por sentido, carro 10×20 com janela \`#cde4ed\`. Cores somente \`#24272c\`, \`#c73434\`, \`#777f87\`, \`#3d4247\`, \`#b92f2e\`, \`#90969c\`. Periodicidade 19.000ms / 22.200ms. Guias dos carros ambientes são invisíveis.
- Não misturar caminho principal ciano/azul/laranja/verde/roxo com as guias da Marginal; manter posicionamentos aprovados, mesmo após troca de imagem.

## 7. Trilhos e trens — geometria e aceite
- O usuário enviou dois JSONs consecutivos da ferrovia, sendo o segundo completo com **28 coordenadas**. O primeiro é parcial, não é o caminho inteiro. Dividido em 2 paths independentes:
  - Sul/descida: 15 pontos, \`(669,2)\` → \`(976,1043)\`.
  - Norte/subida: 13 pontos, \`(976,1043)\` → \`(683,5)\`.
- Repositório: no pai \`C4_TRAIN_RAILS\` dentro de \`index.html\`, grupo SVG \`c4Trains\`. Nos sub-simuladores C2/C3 \`SHARED_TRAIN_RAILS\`, grupo \`railTrains\`, ciclo de animação integrado ao loop existente.
- Primeira versão: 2 trens vermelhos com 3 módulos cada. Depois o usuário solicitou **8 módulos cada**, independentes para seguir curvatura. Commit funcional \`e6b556cce47940767ae773e65f46d60ad23193a9\` e aceite explícito do usuário no LVR: **"ficou ótimo!!!!"**. Registrado em \`7c6baeb0f7ccead48571285974c873d077e475d4\`.
- Modelo atual: **2 trens vermelhos × 8 composições** (16 vagões desenhados), corpo \`#D8333C\`, borda \`#791C27\`, janelas e faróis, espaçamento ~31 unidades SVG e velocidade 60 unidades SVG/s; vagões separados amostram o path para orientar-se nas curvas.
- Replicação concluída nos C2, C3 e C5, depois C6. C4 é fonte aprovada; C2/3/5/6 foram implementados e scripts compilaram, mas **não há aceite visual individual de cada réplica registrado**.
- Respeitar \`prefers-reduced-motion\` e limpar loops ao trocar de cenário. Atenção ao "teleporte" no começo/fim de caminhos sem fechamento físico; não inventar continuidade de ferrovia.

## 8. Simulador 4 — curvas, quantidades e correção aprovada
- C4 em \`idx===3\` contém dois trajetos principais de origem Pirituba (Piqueri / Ayrton Senna), mais dois movimentos ambientes da Marginal. 8 carros por trajeto principal + 8 por sentido da Marginal = 32 carros, antes de acrescentar trem.
- Houve 110 pontos originais de calibração abrangendo as 4 rotas do quadro 4, e calibração parcial posterior do Ayrton Senna usando **23 novos pontos**. Começo do segmento recalibrado \`(685,689)\` e fim \`(487,619)\`; commit \`b63a39b8b70b8124ad96bfcf2abe918acef493f6\`. Usuário testou e disse **"ok funcionou!!!"**. Não trocar esse miolo nem fundir com trilho de trem.
- Tráfego C4 da Marginal virou modelo dos demais cenários; trens foram aprovados depois. Outros caminhos/C1 não devem ser recalibrados automaticamente.

## 9. Simulador 5 — roxo
- C5 índice 4, pág.27, Marginal Pinheiros → Pirituba.
- **33 pontos SVG** fornecidos pelo usuário; \`(228,688)\` início; \`(301,57)\` fim. Path literal em \`renderD\` no HTML pai.
- Linha tracejada e 8 carrinhos principais ROXOS \`#8B5CF6\`, carro principal 20×36 com duas janelas, ciclo ~18.500ms. Havia bug de cor laranja por heurística de DESTINO Pirituba; corrigido e modelo alinhado ao C4, commit \`dc0920a9544423735f5905d0498e8d7765ce7b74\`.
- C5 passou a reutilizar o mesmo tráfego de Marginal 8+8 e os mesmos 2 trens 8 vagões do C4.
- Não atribuir aceite completo de produção ou QA visual amplo só pela existência do código.

## 10. Simulador 6 — 111 coordenadas, segmentos e origem Condomínios
- C6 índice 5, página 28, nome histórico "Retornos dos condomínios → Lapa". Usuário explicou explicitamente que as origens são **Condomínios**, e possíveis destinos **Lapa, Ayrton Senna, Marginal Pinheiros**. Sem correspondência A/B/C confirmada.
- Editor foi habilitado no cenário 6 sobre a prancha comum; grupo \`c6CalPoints\`, painel \`c6CalPanel\`, botões marcar/pausar/desfazer/limpar/copiar, viewBox correto, chave JSON exportada \`retornos_condominios_lapa\`. Commit \`0db7795cbb56bc09bad57b0bca829495fa975448\`.
- Usuário capturou **111 coordenadas** em um JSON sem delimitação interna, pausando ao final de cada rota e retomando a marcação ao início da próxima. O registro contém dois saltos grandes: \`(10,680)\`→\`(541,123)\` e \`(1485,542)\`→\`(593,269)\`. Não se devem unir esses pontos.
- Segmentação comprovada por ordem do JSON:
  - **A:** pontos 1–26 (26 pontos), começa \`(323,6)\`, termina \`(10,680)\`.
  - **B:** pontos 27–70 (44 pontos), começa \`(541,123)\`, termina \`(1485,542)\`.
  - **C:** pontos 71–111 (41 pontos), começa \`(593,269)\`, termina \`(792,1022)\`.
- OS 111 PONTOS COMPLETOS, SEM INVENTAR PONTOS, ESTÃO NO CÓDIGO \`const C6_PATHS=[...]\` EM \`src-greenn/complexo-lapa-pirituba/index.html\` NA BRANCH ATIVA. Isso é mais confiável que tentar reconstruir o JSON do histórico no próximo chat. NÃO substituir por paráfrase da lista.
- Três paths separados, cada um com 8 carros (24 no total) e animação própria, commit \`945b9a008da9c95c9ebac5e929bdd878a117e120\`. Tráfego ambiente 16 carros (8+8) e os 2 trens vermelhos de 8 vagões integrados. Editor mantido para correções.
- Primeira versão, três rotas na MESMA cor ciano \`#00B8C7\`; usuário: "não deu certo uma única cor". Patch \`a842a5db559ae7396d3f8d07468ac76e778bb0b5\` criou A \`#007985\`, B \`#00B8C7\`, C \`#55D9DE\`. Usuário aprovou **somente A** e rejeitou B/C por serem visualmente quase iguais.
- **Patch MAIS RECENTE:** \`957bf61a838411b5be9ec46f8ddf80722453a6b5\`; preserva **A \`#007985\`** e **B \`#00B8C7\`**, altera **C para \`#B9EDCF\`**, verde-água muito claro, e corrige a legenda. No código \`C6_COLORS=["#007985","#00B8C7","#B9EDCF"]\`, mesma paleta para paths e carros. **Não há aceite LVR deste último patch; testar contraste sobre a arte real, especialmente legibilidade de C clara no mapa**.
- A/B/C são nomes temporários; não atribuir destino específico até o usuário indicar. A legenda explica as três tonalidades e os possíveis destinos. Não mudar as velocidades/geometrias sem solicitação.
- Ponto de atenção: \`c6CalPanel\` ainda exporta uma lista contínua de pontos sem seletores A/B/C. Se o usuário iniciar nova calibração, deverá exportar e declarar cortes, ou implementar editor segmentado mediante pedido. Distinguir edição do traçado e animação.

## 11. Registro de decisões sobre clareza e funcionalidade
1. Usuário não quer respostas em formato de plano quando pede execução; implementar em branch, conferir GitHub, entregar somente branch para LVR e registrar SFJM.
2. Os **3 atalhos superiores redundantes** foram removidos. **O seletor dos 13 trajetos permanece necessário**.
3. Removidos dos filhos 1/2: listagem de ruas/referências e "Controle da circulação", informações repetitivas de paradas e descrições extensas dos 32 carros; removida nota técnica longa do filho 3. Legendas compactas com pequenos carros e nome do trajeto.
4. O painel principal originalmente comporta 2 opções/cores; C6 recebe legenda específica para 3 caminhos. Na manutenção, não trazer de volta os checkboxes de 2 sentidos como controle falso para a opção 6.
5. Cores por **origem**; destinos não alteram identidade cromática. Nos percursos de mesma origem, tonificar (tons distintos) sem reutilizar cores de outra origem se possível.
6. A correção C3 solicitada continua dívida a verificar tecnicamente, mesmo que a branch como um todo tenha recebido um "funcionou!!!" antes de outras mudanças.
7. Não apagar os textos históricos indexáveis da página mãe por causa da retirada de notas redundantes dos sub-simuladores.

## 12. Commits marcantes, verificações, reversões
| Etapa | Commit registrado | Evidência / rollback |
|---|---|---|
| C4 Ayrton Senna, miolo recalibrado | \`b63a39b8b70b8124ad96bfcf2abe918acef493f6\` | Usuário "ok funcionou!!!"; blob antigo \`928c287aacd9c80533681f2d6c668f598d5c6a0f\` |
| C5 roxo e carros padrão | \`dc0920a9544423735f5905d0498e8d7765ce7b74\` | blob anterior \`4cb28100cdd471fb8738641301bd063813d8a6ee\` |
| Imagem comum C2 | \`1cd1a908fcf75391e7d5b0a24ea3b6ee654fa51a\` | original \`db01ac9e374245db3197ef2b5a6430e06bc54d1c\` |
| Imagem comum C3 | \`73ad5231c61730a33d0c5b7d2264ed1967cb3a7f\` | original \`c8fd0091ad7b52b2831406390445591ed58c6d94\` |
| Branch unificada criada e rodapés/ambientes | múltiplos commits; ver incremental | após criação, usuário "funcionou!!!"; sem deploy |
| Trens 2×3 composições C4 | \`b22377356e2827fd1e8ec8caa483dea77a15b17b\` | trilhos 15+13 pontos |
| Trens 2×8 composições C4 | \`e6b556cce47940767ae773e65f46d60ad23193a9\` | usuário "ficou ótimo!!!!"; HTML blob antigo \`c75cd6e335fa719dbf406d8d05f21155f98d82f3\` |
| Verde Ayrton C2 | \`67583da2c29d6bf04e997dadac41931568b2858a\`, \`4ceb7f93391630060afc9f85bca06889f7a2873c\` | blobs antigos \`e3b8790a38508bc43cdf493136696e9a74d2b311\` e \`638ee237c54a28d4136023fcf2a6939e09518272\` |
| Trens C5 | \`839a02f6afdab3c4ffb003a2bf9c1ea70da8aa4c\` | mesmos rails C4 |
| Trens C2 e C3 | \`e2ed38abed4cce2c9b0945fa10721e4f3747475f\`, \`fa01f9d007845ec19aa3d5805bd5407337cc46af\` | blobs antes \`6d70d29392d190b3a0500659cec768f38c053fa0\`, \`de063ad55112c9b57cc10e0a7cb9095bd7be2c6d\` |
| Editor C6 + mapa comum | \`0db7795cbb56bc09bad57b0bca829495fa975448\` | blob antes \`f31d6f272fb68260af45586a252a11c029186d46\` |
| 3 rotas C6, 111 pontos | \`945b9a008da9c95c9ebac5e929bdd878a117e120\` | blob antes \`8edf980707ddb7870de078ef3a938c309837b978\` |
| Primeiros 3 tons C6 | \`a842a5db559ae7396d3f8d07468ac76e778bb0b5\` | A aprovado, B/C rejeitados; blob antes \`f056615cdf09131da48ffc19357e9a7479e4b1e2\` |
| Nova diferenciação B/C | \`957bf61a838411b5be9ec46f8ddf80722453a6b5\` | **LVR pendente**; blob anterior \`9d9c5c18dff38312f5210b3be1708618e5df7456\` |

Rollback geral deste lote: reverter arquivo alvo à revisão ou commit indicado, NUNCA voltar \`main\` inteiro. Antes de propor merge: revisar diff atual, checks, browser mobile e aceitar layout. As PRs #528/#533/#538 já estavam em produção em momentos anteriores; os rollbacks de produção dessas PRs são distintos dos blobs desta branch.

## 13. Pendências factuais e decisões de próxima etapa (não confundir com autorização)
- **P0:** usuário validar visualmente no LVR o novo tom C \`#B9EDCF\` (A e B mantidos), distinguir A/B/C sem conflito com verde Ayrton. Se C for claro demais sobre ruas/imagem, alterar cor/contorno, não geometria.
- **P0:** usuário confirmar correspondência dos segmentos A/B/C aos destinos Lapa, Ayrton Senna, Marginal Pinheiros. Atualmente só há pontos e nomes provisórios.
- **P1:** auditar o **C3 invertido**: origem Pirituba azul, origem Lapa laranja. Alterar trajetos/carrinhos/legendas SEM regravar os paths.
- **P1:** QA visual para todos C2–C6 após replicação de Marginal/trens, inclusive responsividade, trem sobre trilho, sentido do fluxo, zoom, pausa, desempenho mobile e ausência de flicker no loop.
- **P1:** testar C6 overlays com o editor ativo/inativo, seleção de percurso, posterior retorno a C4/C5, lixo de \`requestAnimationFrame\`, segurança ao alternar.
- **P2:** estratégia de diferenciação de 3 origens/destinos nas legendas e eventual editor independente por rota A/B/C para evitar JSON sem segmentação.
- **Pré-release, somente quando autorizado:** retirar editores visíveis ou ocultá-los de modo apropriado, consolidar dados/versões, rodar checks e QA, preparar PR/rollback, merge e publicação rastreável. Nada disso foi autorizado pela solicitação atual de documentação/cores.

## 14. Como retomar EXATAMENTE no novo chat
1. Ler este arquivo completo e \`docs/sfjm/MNT_PRANCHA5_REUSO_FIGURA2_2026-11-03.md\`, assim como os cinco documentos de governança, antes de executar qualquer alteração; não depender de resumo superficial.
2. Consultar GitHub em tempo real: \`main\` e \`feat/complexo-unificacao-pranchas-2-3-4-5-20261103\`; \`fetch_file\` do HTML principal e filhos, diff \`compare_commits\`; identificar HEAD e não usar SHAs antigos por suposição.
3. Para LVR, selecionar branch exata acima, refresh explicit e reiniciar sessão se necessário. Não dizer "testado" antes de observar resultado ou do usuário relatar.
4. C6 no seletor **opção 6**, \`idx=5\`, página 28, mapa WebP comum. Verificar 3 linhas e 24 carros cianos/verde-água, 2×8 trens e 16 carros ambientes. Paleta A \`#007985\`, B \`#00B8C7\`, C \`#B9EDCF\`.
5. Caso o usuário envie ajustes, preservar 111 coordenadas e os cortes 26/44/41, mexendo APENAS no que ele pedir.
6. Manter SFJM atualizado com commit funcional, rollback anterior e novo aceite LVR. Só propor produção depois de finalizada homologação e mediante autorização.
7. Não reconstruir imagens/trajetos por imagem gerada ou palpite se já há WebP e paths no GitHub. O mapa original da SPObras é dado de referência histórica, não instrução rodoviária em tempo real.

## 15. Documentos SFJM complementares e notas sobre historicidade
- \`docs/sfjm/MNT_PRANCHA5_REUSO_FIGURA2_2026-11-03.md\` — diário incremental original de mudanças do lote, com commits e rollbacks.
- \`docs/sfjm/MNT_CALIBRADOR_REUSO_PRANCHA5_2026-11-03.md\` — código do editor arquivado antes da PR #538.
- \`docs/sfjm/MNT_COMPLEXO_SIMULADOR3_ACEITE_LVR_2026-11-01.md\` — baseline antigo do C3.
- \`docs/sfjm/MNT_COMPLEXO_RELEASE_PR528_PRODUCAO_2026-11-02.md\` — release C1–C3 e rollback.
- \`docs/sfjm/MNT_COMPLEXO_CAPA_UNICA_RELEASE_PR533_2026-11-02.md\` — release da capa e rollback.
- \`bootstrap/BOOTSTRAP_CANONICO.md\`, \`handoffs/CURRENT.md\`, \`docs/PROJECT_STATUS.md\`, \`docs/NEXT_SAFE_ACTION.md\`, \`docs/BLOCKED_ACTIONS.md\` — governança geral; podem conter avisos antigos e fatos de outras frentes. Reconciliar estados por commit mais recente, sem apagar histórico.
- A documentação não afirma ter reproduzido todas as mensagens históricas do Projeto MoreNumTegra; este é um dossiê de continuidade técnica **integral do ciclo do Complexo abordado nesta conversa e dos baselines consultados**, não um inventário de todas as iniciativas do repositório.

## 16. 03/11/2026 — ACEITE DE CORES C6 E CONTROLES POR DESTINO, BADGE AZUL
**Interação posterior à elaboração inicial deste dossiê, portanto esta seção prevalece sobre as ressalvas anteriores de cores e destinos.**
- O usuário testou e confirmou sobre a versão contrastada A/B/C: **“ficou ótimo”**. Aceite visual reportado pelo usuário para os três tons existentes, sem autorização de merge/deploy.
- Em seguida pediu explicitamente **três controles de percurso**: `Condomínios → Marginal Pinheiros`, `Condomínios → Ayrton Senna`, `Condomínios → Lapa`, além de substituir o nome no badge azul do canto superior direito por **“Saída dos Condomínios”**. A atribuição dos destinos segue a ordem A/B/C que o usuário enunciou; essa correspondência nominal ainda requer conferência com a representação sobre o mapa.
- Implementação HTML em `src-greenn/complexo-lapa-pirituba/index.html`, commit funcional `8b0dafc365c2af704ff5f097fbd5a00911eeb299`; rollback blob anterior `331669efc9e22278250adb29b42dd5c7653d0aeb`.
- Três inputs reais (`c6ToggleA/B/C`) na legenda `c6Legend`. Cada checkbox governa seu grupo SVG `[data-c6-route="0|1|2"]`, que agrupa path e oito carrinhos e assim oculta/exibe SOMENTE o trajeto correspondente. Não confundir com inputs legados `uxBlue/uxOrange`, que seguem ocultos no C6.
- Mapeamento exato agora exposto na UI: A (26 pontos, `#007985`) → **Marginal Pinheiros**; B (44 pontos, `#00B8C7`) → **Ayrton Senna**; C (41 pontos, `#B9EDCF`) → **Lapa**. Todos têm origem Condomínios; matrizes de cor de outras origens intocadas.
- Badge `#c6Badge` é um elemento HTML azul `#145D91` sobreposto no canto superior direito do canvas, com texto **“Saída dos Condomínios”**, visível só no cenário 6. Nota de QA: verificar que a arte WebP não contém badge textual antigo aparente sob o overlay, e que o badge não obscurece uma rua importante em telas pequenas.
- Título do seletor do cenário 6 alterado para `Saída dos Condomínios: Marginal Pinheiros / Ayrton Senna / Lapa`. O título do editor foi atualizado preservando a chave técnica JSON histórica `retornos_condominios_lapa` para compatibilidade.
- Teste sintático após o patch: **5/5 scripts OK**. **Controles, identificação dos destinos e badge dependem de teste LVR**. Não alterar pontos ou paths aprovados por simples renomeação dos controles.
- Arquivos do dossiê e handoffs são atualizados na branch experimental, nunca confundidos com o estado de produção.

## 17. 03/11/2026 — Correção da regressão de legenda branca no C6 após teste LVR
**Relato visual do usuário (capturas LVR):** "você fugiu do padrão ... na legenda era somente alterar a cor dos carrinhos, a legenda e inserir o terceiro carrinho nao criar tudo de novo branco". A versão do commit `8b0dafc365c2af704ff5f097fbd5a00911eeb299` havia CRIADO um novo painel branco `c6Legend` ao lado/abaixo da legenda escura antiga, deixando os dois controles azuis/laranjas originais duplicados. O HTML mostrava dois painéis de controles, quebrando o visual padronizado.
**Correção executada:** `dc556a1936facad039508ee37b2e54de6dcc13c7` em `src-greenn/complexo-lapa-pirituba/index.html`, anterior blob rollback `412620f39f1352f63712c47128dfd672004543ad`. Removido integralmente o painel branco `c6Legend`, seus botões `c6ToggleA/B/C` e CSS relacionado. Reutilizada a legenda original ESCURA `#uxDirections`: inputs existentes `#uxBlue` e `#uxOrange`, agora com rótulos/ícones C6 em `#007985` e `#00B8C7`, mais uma terceira `label.ux-dir.ux-third` com input `#uxThird`, carrinho no mesmo SVG visual com `#B9EDCF`, oculta nos demais cenários. Rótulos por ordem A/B/C: Condomínios → Marginal Pinheiros / Ayrton Senna / Lapa. Checkboxes ligam/desligam seus grupos SVG independentes `#c6Routes [data-c6-route]`; em C1–C5 continuam usando os antigos comandos de direção, terceiro oculto.
Badge `#c6Badge` azul "Saída dos Condomínios" no mapa preservado. Paths de 111 pontos, 24 carros C6, tráfego Marginal e dois trens de 8 vagões preservados. **Verificação sintática 5/5 scripts OK; nova avaliação visual LVR pendente**. Esta seção PREVALECE sobre o registro anterior que descrevia a duplicação do painel `c6Legend` como uma implementação aceitável. Não voltar a criar caixa branca nova; usar sempre o padrão da legenda original.
