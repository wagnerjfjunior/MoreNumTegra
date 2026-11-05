# SFJM — Cenários 8 e 9: abertura dos editores SVG na prancha 7 — 05/11/2026

## Demanda e interpretação
Usuário pediu reutilizar a **prancha do cenário 7** para criar os cenários 8 e 9, com editor SVG habilitado em ambos e **dois trajetos independentes em cada cenário**. Nesta etapa é apenas coleta de coordenadas: não desenhar trajetos, não gerar carros e não publicar antes do aceite.

## Estado canônico
- Repo: `wagnerjfjunior/MoreNumTegra`.
- Base: `main` após as PRs #542 (C7) e #543 (C5–C6); estas releases devem permanecer intactas.
- Branch dedicada: `feat/complexo-cenarios8-9-editor-prancha7-20261105`. **Sem merge/deploy**.
- Prancha reutilizada sem duplicação: `src-greenn/complexo-lapa-pirituba/assets/Complexo-Lapa-Tietê-Percurso-Completo-v1.png` (1448×1086; `viewBox 0 0 1448 1086`).
- Editor parametrizado por cenário: `src-greenn/complexo-lapa-pirituba/cenarios8-9-editor/index.html?cenario=8` e `?cenario=9`.
- Integração: `src-greenn/complexo-lapa-pirituba/index.html`; opções consecutivas 8 e 9 no seletor principal abrem iframes exclusivos.
- As opções antigas de sentidos isolados Mercedes/Raimundo/Diogo Ortiz foram consolidadas em C8 e C9, preservando o acesso posterior à Estação Piqueri (agora opção 10).

## Cenário 8
Nome: **Av. Raimundo → Av. Mercedes / Rua Diogo Ortiz / Estação Domingo de Moraes**.
Trajetos:
1. `raimundo_mercedes`: **Av. Raimundo → Av. Mercedes**.
2. `raimundo_diogo_domingo`: **Av. Raimundo → Rua Diogo Ortiz / Estação Domingo de Moraes**.
Coordenadas iniciais: **zero em ambos**, aguardando mapeamento do usuário.

## Cenário 9
Nome: **Av. Mercedes / Rua Diogo Ortiz / Estação Domingo de Moraes → Av. Raimundo**.
Trajetos:
1. `mercedes_raimundo`: **Av. Mercedes → Av. Raimundo**.
2. `diogo_domingo_raimundo`: **Rua Diogo Ortiz / Estação Domingo de Moraes → Av. Raimundo**.
Coordenadas iniciais: **zero em ambos**, aguardando mapeamento do usuário.

## Editor e contrato de coleta
- Controles `Iniciar marcação`/`Pausar marcação`, desfazer último ponto, limpar apenas o trajeto selecionado, alternar entre dois trajetos, copiar JSON, baixar JSON e importar JSON correspondente ao mesmo cenário e prancha.
- SVG em coordenadas intrínsecas, clique/toque por `getScreenCTM().inverse()`; linhas e pontos com cores auxiliares **provisórias**, sem definir cor definitiva dos veículos antes da aprovação.
- `schema=sfjm-cenarios8-9-trajetos-v1`, campos `scenario`, `scenarioName`, `base`, `viewBox`, `dimensions` e `routes[id].points`; nomes dos arquivos: `sfjm-cenario8-trajetos.json` e `sfjm-cenario9-trajetos.json`.
- Os dados ficam apenas na sessão do editor; importação fornece caminho de retomada com JSON salvo. Sem enviar dados para endpoint/CRM.
- Validação de dimensões e limites X=1448/Y=1086 antes da marcação; não animar ou inserir carros antes da coleta validada.
- O editor é ferramenta de homologação — remover controles da versão pública quando o usuário aprovar os trajetos.

## QA e bloqueios
- Verificar LVR na branch: `http://localhost:8080/complexo-lapa-pirituba/` → selecionar C8 e C9; conferir a imagem idêntica em ambos, 2 rótulos por cenário, marcação/toque, exportação e importação; trocar de cenário não mistura coordenadas.
- Confirmar que C1–C7 continuam funcionando e C7 não voltou a exibir editor.
- Verificação estática JS: PASS nos scripts principais e no editor, mas **nenhum teste visual LVR executado** nesta sessão.
- Não publicar na Vercel/GRENN; não incluir caminhos imaginados nem carros, não modificar C1–C7, identidade aprovada, Form 46 ou SEO.
- Rollback na branch: reverter commits do novo editor e da integração no seletor; `main` permanece sem alterações.
