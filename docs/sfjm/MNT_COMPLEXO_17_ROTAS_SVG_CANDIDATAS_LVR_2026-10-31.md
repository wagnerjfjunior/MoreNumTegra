# SFJM / RESF — Complexo Lapa–Pirituba — lote de 17 animações candidatas

## Estado do lote
- Branch exclusiva de homologação LVR: `feat/complexo-lapa-pirituba-lvr-20261031`
- PR #527 DRAFT. Nenhum merge ou deployment de produção autorizado.
- 17 imagens do PDF (páginas 19–35) mantidas em JPG na branch, via upload do usuário; o usuário confirmou que os mapas carregaram no LVR.
- Páginas 19 e 20: animação experimental apresentada e visualmente aprovada pelo usuário em 31/10/2026, sem laudo geométrico independente.
- Páginas 21–35: caminhos SVG candidatos inseridos em `src-greenn/complexo-lapa-pirituba/routes-verified.json`, todos `verified:false`.
- O HTML lê candidatos mesmo com `verified:false` e exibe aviso de "ANIMAÇÃO EXPERIMENTAL". Nunca anunciar esses percursos como certificados.
- Geometrias em `viewBox="0 0 1200 849"`, compatível com os mapas originais extraídos; inspeção de direção e sobreposição continua necessária.
- Traçados compostos/ramificados, especialmente o percurso da página 28, requerem atenção especial: um SVG simples não representa necessariamente todas as origens possíveis.

## Gate no SFJM/LVR
1. Reiniciar launcher na branch exata e confirmar `[BRANCH]`, `[HEAD]`, `[SYNC] IN_SYNC` e `[WORKTREE] CLEAN`.
2. Abrir `http://localhost:8080/complexo-lapa-pirituba/`.
3. Percorrer páginas 21–35 em desktop e mobile; reproduzir marcador até o final.
4. Comparar trecho a trecho com linha pontilhada/cores, direção e seta do PDF oficial (agosto de 2019). Registrar divergências pontuais.
5. Ajustar vetores fora da linha; somente após aprovação individual marcar `verified:true` e considerar aceite.
6. Nada de alterar produção, gerar nova PR, substituir assets aprovados ou mexer em launcher.

## Restrição de conteúdo
As imagens representam um projeto histórico apresentado em 2019, não a malha viária operacional de 2026. Nenhum dado atual pode ser inferido do material.
