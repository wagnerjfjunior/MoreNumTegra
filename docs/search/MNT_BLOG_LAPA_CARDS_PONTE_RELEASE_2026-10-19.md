# MoreTegra Blog — Lapa / Cards e mobilidade Pirituba–Lapa (2026-10-19)

**Modo:** artigo único / SEO MOFU / mobile-first / rollback por revert da PR.

## Escopo implementado

- Mantido o H1 `Valorização imobiliária na Lapa: o que analisar antes de comprar?`, a URL canônica, as seções comerciais/SEO e `index,follow`.
- Navegação por toque para fatores de mercado, ponte, guias e empreendimentos.
- Hero visual com imagem que já consta do hub Lapa; dimensões no HTML para reservar espaço.
- Quatro cards curtos: localização, infraestrutura, perfil do imóvel, mercado e liquidez.
- Infraestrutura: Complexo Viário Pirituba–Lapa, com ligação prevista entre Avenida Raimundo Pereira de Magalhães e Rua Campos Vergueiro, ciclovia e ônibus; obra identificada **como não entregue**. Fonte oficial de 07/08/2026: https://prefeitura.sp.gov.br/web/obras/w/prefeitura-presente-obras-do-complexo-vi%C3%A1rio-que-ligar%C3%A1-pirituba-%C3%A0-lapa-seguem-em-ritmo-acelerado
- Dois cards editoriais: guia regional Lapa e artigo Lapa versus Vila Anastácio.
- Quatro cards com imagem e CTA para as páginas canônicas Elo Duo, Nova Vivere, Garden Design e Reserva Caminhos da Lapa. URLs e imagens reutilizadas do hub regional; **nenhuma promessa de disponibilidade/valorização/preço/obra pronta**.
- CSS isolado em `src-greenn/blog/lapa-artigo.css`. Breakpoints 900px e 600px; projeto sem JS adicional e com lazy loading abaixo do hero.
- CTA de contato preexistente para Sabrina preservado, formulário apontado ao hub `/regioes/#formulario`; sem backend novo ou testes de lead real.

## QA e limites

- Conferência HTML estática: 1 H1, 6 H2, 4 cards fatores, 2 cards de guia, 4 cards de empreendimento e BlogPosting/BreadcrumbList parseável.
- As 4 rotas de projeto e 2 conteúdos relacionados já constam do site; não alterar as landings RESF.
- **Ainda não verificado:** inspeção real visual/touch mobile, HTTP independente de todas as imagens, envio do Form 46/CRM e posição GSC.
- Merge exige CI PASS + HEAD certo + publicação Vercel READY no SHA do squash. Rollback: revert do squash da PR.
