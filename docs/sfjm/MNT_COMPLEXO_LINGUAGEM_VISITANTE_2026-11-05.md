# SFJM — Experiência de visitante: retirar textos técnicos dos cenários — 05/11/2026

## Decisão do responsável
Solicitação: nenhum cenário do Complexo Lapa–Pirituba deve exibir textos de engenharia e justificativas de implementação. O público é geral, não uma equipe técnica. Remover explicitamente o parágrafo "Rotas SVG azul e laranja visíveis, com 8 carros..." e as mensagens similares em todos os simuladores.

## Governança / baseline
- Repositório canônico: `wagnerjfjunior/MoreNumTegra`.
- Branch `ux/complexo-linguagem-visitante-20261105`, criada da `main` atual após PR #548.
- **Esta entrega não foi mergeada nem publicada.** Teste visual LVR pendente, conforme limitação informada anteriormente pelo usuário.
- Os dados de rota, quantidades de veículos, arquivos de mídia, geometria, JavaScript e mecanismos de controle são preservados, exceto textos de estado necessários para UX.
- Não incluir editores C8/C9 nesta branch.

## Auditoria e alterações
1. `marginal-duplo/index.html`: removido por completo o bloco de nota sobre SVG, 8+8+16 carros, linhas auxiliares e tráfego; chamada reduzida a "Compare os caminhos saindo da Lapa e de Pirituba"; removido metadado técnico da barra do mapa; status acessível simplificado.
2. `duplo/index.html` e `duplo-ayrton/index.html`: removidos rótulos "SFJM/LVR", "experimento", "Protótipo — não publicado", notas sobre arquivos, calibração e homologação. Legendas claras, sem alterações dos grupos SVG/carros.
3. `cenario7-trajetos/index.html`: removidos parágrafos de fundamentação em pontos coletados e avisos técnicos abaixo do mapa; mensagens de carregamento e falha tornam-se claras, sem contagem de carros.
4. `lapa-marginal/index.html` e `pirituba-marginal/index.html`: removidos textos sobre prancha e cores, rótulos de teste e legendas técnicas. Estados mostram "Percurso disponível" ou "Não foi possível carregar este percurso". Controle de reprodução preservado.
5. `src-greenn/complexo-lapa-pirituba/index.html`: introdução interativa curta; texto do seletor sem número incorreto de cenários; painel de status interno e página do PDF ocultos da interface; mensagem de percurso indisponível amigável; nota técnica abaixo dos mapas removida. Outras seções do projeto, FAQ e crédito de origem preservados para fornecer contexto factual sem poluir os simuladores.
6. `acessos-trajetos/index.html`: removida seção redundante "Como usar a ferramenta" com explicação de veículos; CTA reduzido a explorar percursos.
7. Alternativas textuais/aria dos mapas revisadas para acessibilidade em linguagem comum.

## Regras editoriais
- Visível ao usuário: título/destino, mapa, legenda de sentidos por cor, interações necessárias, mensagens simples de sucesso/erro.
- Internamente: estrutura SVG, calibração, quantidades de veículos, viewBox, paths, nome de arquivos, registros técnicos, informações de engenharia e auditoria SFJM.
- Manter transparência factual geral sobre projeto histórico em FAQ e seção de fontes; **não afirmar que vias estão abertas ou que o mapa corresponde a trânsito real**.
- Manter controles realmente funcionais. A solicitação não autoriza alterar geometria, quantidade de carros, origem/destino ou estado dos lançamentos.

## QA / homologação pendente
- Inspecionar visualmente todos os cenários no iPhone, incluindo iframe e páginas auxiliares.
- Testar seletor, estados vazio/erro, legenda de C1, C2, C5, C6 e C7, botões zoom e caminhos.
- Verificar ausência em conteúdo visível de "Rotas SVG", "LVR", "Protótipo", "prancha original", notas de calibração, cores hexadecimais, contagem de veículos e justificativas técnicas.
- Compilação JavaScript dos scripts inline é gate estático, não substitui QA real.
- Não criar release em produção sem solicitação de merge; rollback futuro por revert de PR isolada e deployment READY anterior resolvido live.
