# SFJM — Limpeza editorial pós-simuladores — 05/11/2026

## Demanda
O usuário solicitou remover, da página principal do Complexo Lapa–Pirituba, dois conjuntos de texto após os simuladores:
1. **Como interpretar o mapa** e o parágrafo sobre as linhas coloridas e a interpretação das animações.
2. **O que o projeto viário Lapa–Pirituba propôs?** e os três artigos: "Dois sentidos entre Lapa e Pirituba", "Acesso a partir da Ayrton Senna" e "Conexões com a Marginal Pinheiros".

## Implementação
- Branch `fix/complexo-limpeza-editorial-20261105`, derivada da `main`.
- Alterado apenas `src-greenn/complexo-lapa-pirituba/index.html` e este registro.
- Removido o intervalo HTML exato dos dois blocos, **1.681 caracteres**.
- Preservados integralmente: FAQ, fonte/transparência, seletor, cenários 1–7, iframe, animações, controles, SEO dos outros blocos e demais seções do projeto.
- Mantidas as informações essenciais de origem e natureza histórica do projeto em outras seções e no FAQ, para não distorcer o caráter ilustrativo.
- JavaScript dos scripts inline validado sintaticamente; não houve teste visual LVR.
- Não alterar `main` ou deploy até autorização expressa de merge/produção.

## QA
Conferir que o próximo bloco após `</section>` do simulador é `<section aria-labelledby="faq">`, que a remoção não muda o seletor, os cards, as animações ou o formulário e que o mobile não cria espaço vazio.

## Rollback
Antes de publicar, comparar diff com `main`. Após aprovação, usar PR isolada e rollback por revert da PR, nunca reset forçado de `main`. O deployment anterior de produção deve ser identificado live no momento da publicação.
