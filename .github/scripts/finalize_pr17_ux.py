from pathlib import Path
import re

js_path = Path('src-greenn/moretegra.js')
post_path = Path('src-greenn/blocks/02-html-pos-form.html')

js = js_path.read_text(encoding='utf-8')
post = post_path.read_text(encoding='utf-8')

# 1) Remove repetição de microcopy no Elo Duo.
old_elo = 'return "Ótima escolha. O Elo Duo está pronto para morar na Lapa, com últimas unidades, plantas de 47 m², 55 m² e 67 m², lazer completo e mobilidade ligada à estação de trem.";'
new_elo = 'return "O Elo Duo está pronto para morar na Lapa, com últimas unidades, plantas de 47 m², 55 m² e 67 m², lazer completo e mobilidade ligada à estação de trem.";'
assert old_elo in js, 'pitch Elo esperado não encontrado'
js = js.replace(old_elo, new_elo, 1)

# 2) Quando o conteúdo da foto adicional não é conhecido de forma factual,
# trata a imagem como redundante/decorativa em vez de usar alt genérico.
js, generic_alt_count = re.subn(r'alt:"Imagem oficial adicional do [^"]+"', 'alt:""', js)
assert generic_alt_count > 0, 'nenhum alt genérico encontrado para ajustar'

# 3) Estrutura semântica explícita da galeria.
old_mount = '<div data-interest-gallery hidden aria-label="Galeria do empreendimento"></div>'
new_mount = '<div data-interest-gallery hidden role="group" aria-label="Galeria do empreendimento"></div>'
assert old_mount in js, 'mount da galeria esperado não encontrado'
js = js.replace(old_mount, new_mount, 1)

# 4) Identificador do grid para recomposição resiliente após falha de mídia.
old_grid = '<div style="display:grid;grid-template-columns:minmax(0,2fr) minmax(96px,1fr);grid-template-rows:1fr 1fr;gap:8px;aspect-ratio:4/3">'
new_grid = '<div data-interest-gallery-grid style="display:grid;grid-template-columns:minmax(0,2fr) minmax(96px,1fr);grid-template-rows:1fr 1fr;gap:8px;aspect-ratio:4/3">'
assert old_grid in js, 'grid da galeria esperado não encontrado'
js = js.replace(old_grid, new_grid, 1)

# 5) Legenda em piso legível no mobile.
old_caption = '<small style="display:block;margin-top:7px;color:#77736b;font-size:10.5px;line-height:1.35">Imagens oficiais do empreendimento; perspectivas ilustradas quando aplicável.</small>`;'
new_caption = '<small style="display:block;margin-top:7px;color:#77736b;font-size:12.5px;line-height:1.45">Imagens oficiais do empreendimento; perspectivas ilustradas quando aplicável.</small>`;'
assert old_caption in js, 'caption esperado não encontrado'
js = js.replace(old_caption, new_caption, 1)

# 6) Recompõe o bento quando uma mídia falha, evitando vazio/assimetria.
old_error = '''    mount.querySelectorAll("img").forEach((img) => {
      img.addEventListener("error", () => {
        const holder = img.closest("figure");
        if (holder) holder.style.display = "none";
      }, {once:true});
    });'''
new_error = '''    const rebalanceGallery = () => {
      const grid = mount.querySelector("[data-interest-gallery-grid]");
      if (!grid) return;
      const visible = [...grid.querySelectorAll("figure")].filter((figure) => figure.style.display !== "none");

      visible.forEach((figure) => {
        figure.style.gridRow = "auto";
      });

      if (visible.length >= 3) return;

      if (visible.length === 2) {
        grid.style.gridTemplateColumns = "1fr 1fr";
        grid.style.gridTemplateRows = "1fr";
        grid.style.aspectRatio = "16 / 7";
        return;
      }

      if (visible.length === 1) {
        grid.style.gridTemplateColumns = "1fr";
        grid.style.gridTemplateRows = "1fr";
        grid.style.aspectRatio = "4 / 3";
        return;
      }

      mount.hidden = true;
    };

    mount.querySelectorAll("img").forEach((img) => {
      img.addEventListener("error", () => {
        const holder = img.closest("figure");
        if (holder) holder.style.display = "none";
        rebalanceGallery();
      }, {once:true});
    });'''
assert old_error in js, 'handler de erro esperado não encontrado'
js = js.replace(old_error, new_error, 1)

# 7) Microcopy institucional aderente à formulação por extenso.
old_award = '<strong style="display:block;font-size:1.35rem;color:#171813">84x</strong><span style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.08em">premiada</span>'
new_award = '<strong style="display:block;font-size:1.35rem;color:#171813">84 vezes</strong><span style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.08em">premiada</span>'
assert old_award in post, 'microcopy 84x esperada não encontrada'
post = post.replace(old_award, new_award, 1)

js_path.write_text(js, encoding='utf-8')
post_path.write_text(post, encoding='utf-8')

print(f'generic_alt_adjusted={generic_alt_count}')
print('final UX patch applied')
