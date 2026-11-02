# Contrato SEO e acessibilidade — MoreTegra

## Critérios verificáveis (QA interno, não limites do Google)

| Elemento | Gate bloqueante | Controle adicional |
|---|---|---|
| `title` | 1 por página; até 60 caracteres Unicode; não vazio | Principal entidade no início; distinto por URL; SERP usa pixels e pode reescrever |
| `meta name=description` | 1 por página; até 160 caracteres Unicode; não vazia | Diferencial factual e CTA contextual; Google pode gerar outro snippet |
| H1 | exatamente 1 no HTML | 12–90 caracteres como ALERTA editorial, sem limite de ranking do Google |
| H2/H3 | hierarquia lógica | Não impor limites rígidos arbitrários de caracteres |
| `img alt` | atributo alt obrigatório em imagens HTML | Alt descritivo conforme função; imagens decorativas: alt vazio; alerta se >150 caracteres, não é limite oficial |
| Open Graph | og:title e og:description presentes e dentro dos limites internos | og:url e imagem canônica verificáveis |
| Twitter/X | descrições e títulos presentes devem respeitar limites internos | Metadados sociais não substituem SEO |
| Canonical | host www obrigatório e URL válida | Verificar se corresponde à rota definitiva |
| JSON-LD | JSON sintaticamente válido | Schema.org e Rich Results exigem validação separada |
| Robots | não mudar `noindex` automaticamente | Classificar por status do projeto |
| CTA, formulário, consentimento | testar via RESF | Métrica convertida no GA4/CRM |

Script `scripts/validate-seo-content.mjs`: `node scripts/validate-seo-content.mjs --strict src-greenn/empreendimentos/ampere-brooklin/index.html`. Sem arquivo faz varredura recursiva de HTML em `src-greenn`. Os avisos de alt e H1 são não bloqueantes; `noindex` não é erro. Cada URL e arquivo devem ser reconciliados com o sitemap e roteamento Vercel antes de uma aprovação global.

Importante: o script é uma primeira barreira automática, não um parser HTML completo e não testa dimensão/peso de imagens, renderização JS, fontes, dados comerciais ou SERP real. Faz parte da revisão juntamente com os gates pré-existentes RESF/SFJM. Não publicar com erro em arquivo alterado.
