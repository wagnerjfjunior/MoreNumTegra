# Correção estrutural RESF — seis empreendimentos do Rio — 03/11/2026

## Demanda e diagnóstico
O usuário rejeitou explicitamente o modelo simplificado das páginas RJ e exigiu o mesmo padrão visual, estrutural, comercial e de qualidade já aplicado em Bueno Brandão 257 e Tièl. A auditoria confirmou CSS e hero separados, títulos editoriais repetitivos, galeria estática e uma classificação de schema inadequada para o condomínio de casas Claris Casa & Clube.

## URLs corrigidas nesta PR #539
- `/empreendimentos/kronos-by-tegra/`
- `/empreendimentos/gran-thai-leisure-residence/`
- `/empreendimentos/claris-casa-e-clube/`
- `/empreendimentos/claris-rosas/`
- `/empreendimentos/gaea-home-resort/`
- `/empreendimentos/singular-private-residence/`

## Mudanças efetivas no código
1. Reescrita de `src-greenn/empreendimentos/rio/resf-rio.css` para usar a linguagem de Bueno Brandão/Tièl: #EBB92E, #0a0a09, #f2efe8, tipografia editorial Georgia, navegação sobreposta, hero imersivo full-bleed, overlay legível, CTA visível, blocos de conteúdo e módulo comercial, formulário premium, FAQ em accordions e dock flutuante. Mobile-first com toque e faixa de fatos 2×2; desktop 4 colunas.
2. Reconstrução do hero em **seis** HTML: imagem discoverable no HTML inicial, `fetchpriority=high`, único H1, CTA e WhatsApp, camada de contraste sem depender de JavaScript. Skip link e `<main id=conteudo>` semântico.
3. Faixa `.facts` única **imediatamente abaixo** do hero, com quatro blocos ordenados: metragem/tipologia, garagem, diferencial/localização e estágio. Sem inventar número de vagas; Claris Casa & Clube e Claris Rosas só têm descrição de garagem e seguem com `FACTS_DATA_GAP` para quantitativo exato até fonte oficial.
4. H2 genéricos substituídos por temas **específicos de cada produto**, com seção de plantas e preço de referência, localização, FAQ e CTA; textos, metragens e valores existentes foram preservados como afirmações sob suas fontes históricas, sem adicionar oferta confirmada.
5. Galerias agora apresentam **dois cenários já existentes no próprio empreendimento**, com scroll-snap por toque, botões de navegação, teclado (setas), foco e contagem acessível. Script vanilla `src-greenn/empreendimentos/rio/resf-rio-gallery.js`; imagens não críticas abaixo da dobra em lazy-load.
6. Formulário original `#moretegra-lead-form` preservado byte a byte na transformação, Form 46 (tenant 313), integração existente, WhatsApp, rodapé/CRECI-SP e restrição a atendimento inicial remoto.
7. Claris Casa & Clube: entidade do projeto em JSON-LD alterada de `ApartmentComplex` para `GatedResidenceCommunity` porque a tipologia descrita na página é condomínio de casas triplex. Validadores de cobertura de schema e endereço de agentes atualizados para aceitar **apenas essa URL** como exceção tipológica e preservar todas as restrições territoriais e profissionais existentes.
8. `noindex,follow` **preservado** nas seis páginas; nenhuma liberação para indexação, merge ou produção.

## Testes e evidências
- `scripts/validate-resf-rio.mjs`: gate estrutural específico das seis URLs (hero/facts 4 em ordem, SEO, galeria acessível, FAQ visível e Schema, Form46 e dock, marca e robots).
- `.github/workflows/seo-metadata-gates.yml`: inclui verificação RESF RJ junto dos testes SEO da PR.
- `.github/diagnostics/resf-rio-visual-smoke.mjs` + `.github/workflows/rio-resf-visual.yml`: teste com Chromium real em **390×844 mobile** e **1440×900 desktop**; exige ausência de overflow horizontal, hero e CTA visíveis, facts em 2×2/4 colunas, controles da galeria e gera screenshots como artefatos de GitHub Actions.
- As conclusões de workflows devem ser registradas por **commit SHA**; merge e indexação seguem bloqueados até conferência visual e factual.

## Lacunas que não podem ser preenchidas por suposição
- Endereço/portaria detalhados e CEP dos seis projetos, quando não aprovados pela Product Authority.
- Dados específicos de plantas/arquivos de planta e diferenciais adicionais não apresentados nos materiais desta PR.
- Claris Casa & Clube / Claris Rosas: quantidade exata de vagas no modelo de garagem; não inventar.
- Preço de referência por projeto não implica oferta `Offer` ativa nem disponibilidade de unidade; `Product/Offer/FloorPlan` dependem da evidência governada.
- Captura e visualização de screenshots não é homologação física em dispositivo; aprovação editorial/visual pelo usuário e teste oficial Rich Results permanecem distintos.
- `/rio-de-janeiro/` é HUB, não página exata, então tem padrão de catálogo, não molde de empreendimento. RIIO by Piero Lissoni tem página editorial integrada e já publicada e não deve ser reconstruída sem evidência de regressão.
- Branch da PR #539 diverge da `main`; a página do Complexo Lapa-Pirituba da `main` possui simuladores mais novos e não pode ser substituída pela antiga da PR. Reconciliação controlada necessária antes do merge.

## Estado de publicação
**NÃO PUBLICADO, NOINDEX PRESERVADO, PR #539 DRAFT.**


## QA visual em Chromium e correção de mídia — evidências de 03/11/2026

1. O smoke `Rio RESF visual mobile and desktop` com validação de decodificação de hero detectou **falha real nas duas resoluções do Kronos**: os arquivos anteriormente hospedados em `kronosbytegrario.com.br/assets/images/gallery/` não carregavam no navegador.
2. As duas imagens foram substituídas por mídias distintas da origem oficial Tegra `stracctegra.blob.core.windows.net/assets/BannerHome/5/Imagem/`, extraídas dos dois links de imagem da página institucional `https://www.tegraincorporadora.com.br/rj` e não de domínio de vendas não verificado. Hero, galeria, SEO OG e ImageObject tiveram os caminhos atualizados, com ALTs sem atribuição de cena não comprovada.
3. **PASS** no workflow visual do commit `630a3f301cb147a73b7fb9862c755d508dbbced0`, GitHub Actions run `41648696155`: seis páginas × mobile 390×844 e desktop 1440×900, imagem hero carregada, largura sem overflow, hero/CTA acessíveis, quatro fatos nas colunas esperadas e botão da galeria efetivo. Evidência: 12 screenshots em artefato `resf-rio-six-projects-mobile-desktop` (id `13234344929`).
4. A aprovação automática é **técnica**, não homologação estética manual ou verificação de todos os assets/estados de formulário em dispositivo real.
5. As seis páginas mantêm **noindex,follow**, sem merge/produção. O release depende de reconciliação com `main`, QA editorial/factual individual e decisão formal de liberação.
