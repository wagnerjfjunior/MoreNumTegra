# MoreNumTegra — Rio / mídias e plantas RESF — 04/11/2026

## Escopo e decisão
Ampliação de seis galerias no mesmo branch de homologação `audit/seo-metadata-inventory-20261102` / PR #539, sem alterar layout RESF, Form 46, noindex, robots ou produção. O usuário solicitou ao menos 8–10 fotografias por empreendimento, com uma seção exclusiva de plantas/implantação quando há mídia aprovada.

## Inventário efetivamente implementado
| URL exact-project | Cenas na galeria | Imagens de plantas/implantação | Origens / limitações |
|---|---:|---:|---|
| /empreendimentos/kronos-by-tegra/ | 9 | 0 | 7 novas imagens da galeria Tegra EmpreendimentoVitrine/365; uma imagem da academia removida por falhar na decodificação real Chromium; imagens anteriores do BannerHome/5 |
| /empreendimentos/gran-thai-leisure-residence/ | 10 | 0 | 8 imagens adicionais de galeria de terceiros específica do projeto; validar hotlink, procedência e cenas |
| /empreendimentos/claris-casa-e-clube/ | 10 | 2 | 8 novas cenas da Tegra EmpreendimentoVitrine/335; uma implantação oficial e uma planta ilustrativa de fonte externa |
| /empreendimentos/claris-rosas/ | **3** | **1** | 3 cenas individualizadas da Tegra EmpreendimentoVitrine/353 + planta Violeta Casa 2 da mesma linha oficial. **MEDIA_GAP: faltam ≥5 imagens de galeria distintas** para o mínimo de 8. Não completar com mídia do Claris Marapendi/Casa & Clube |
| /empreendimentos/gaea-home-resort/ | 10 | 4 | 8 novas cenas da Tegra EmpreendimentoVitrine/347; 4 plantas da landing oficial Tegra LandingPage/35 |
| /empreendimentos/singular-private-residence/ | 10 | 0 | 8 imagens adicionais de página comercial dedicada; mídias Península Collection exigem rechecagem de atribuição ao Singular antes de publicação |

Os seis exact-projects receberam seção `#plantas-oficiais` distinta de preço/tipologias. Para Kronos, Gran Thai e Singular, o documento visual exato não foi identificado no HTML disponível e a seção oferece consulta por Form 46. Não chamar essas seções de galerias oficiais com plantas incorporadas quando não há imagem.

## Alterações de UI e testes
- `src-greenn/empreendimentos/rio/resf-rio.css`: blocos responsivos para plantas/implantação com imagens `object-fit: contain`, sem recorte; largura 1 coluna no mobile.
- `src-greenn/empreendimentos/rio/resf-rio-gallery.js`: contagem derivada de slides reais; botões anterior/próxima, seta teclado e scroll-snap/toque.
- `scripts/validate-resf-rio.mjs`: 10 imagens por projeto, salvo Kronos (9 imagens válidas) e Claris Rosas (3 e warning MEDIA_GAP), exige seção `#plantas-oficiais`, preserva Form 46/noindex.
- `.github/diagnostics/resf-rio-visual-smoke.mjs`: browser Chromium mobile 390×844 e desktop 1440×900, contagem e navegação dos slides; agora verifica decodificação de cada imagem da galeria em desktop (não aceitar imagem quebrada).
- `.github/workflows/rio-resf-visual.yml`: screenshots via GitHub Actions; verificar resultado exato do commit de implementação antes de afirmar PASS.
- O validador `scripts/validate-commercial-page-standard.mjs` proíbe URL externa do site corporativo Tegra em páginas futuras; links de saída `www.tegraincorporadora.com.br` adicionados inicialmente foram removidos. Fotos da CDN Tegra e CTA local Form 46 preservados.

## Limites e aceite
1. **Não homologar como 6/6 com 10 imagens**: Claris Rosas não possui material suficiente certificado e permanece com 3 até material adicional legítimo.
2. Separar procedência, validade de direitos de uso, atribuição e carregamento real das mídias externas do Gran Thai e Singular. A passagem de contagem estática não comprova todos os endpoints HTTP/decodificação.
3. Sem publicação/merge/indexação; PR #539 ainda contém alterações SEO mais amplas, branch divergente da main. Antes do merge é necessária reconciliação SFJM, especialmente página do Complexo Lapa–Pirituba.
4. Para o LVR Local Live Sync, usar branch `audit/seo-metadata-inventory-20261102`, porta 8081, confirmar no terminal `[SYNC] OK branch=... head=...`; recarregar navegador após novo head.

## Registro de falha real e correção
A execução visual do commit `6aa72c474f9e294e7eb8773b71c97acfa68cc005` detectou falha de decodificação de `TEGRA_Ager-34---Academia-1_DET02-1787778599893.jpg` no Kronos, apesar de a URL ser da origem de mídia Tegra. A cena foi removida; a galeria Kronos ficou com 9 imagens distintas, acima do mínimo solicitado (8). CI deverá ser repetido no head posterior. Não afirmar sucesso de mídia sem novo PASS.
