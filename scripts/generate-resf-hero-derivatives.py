#!/usr/bin/env python3
from pathlib import Path
from io import BytesIO
import hashlib, json, requests
from PIL import Image

SOURCES = {
  "ampere-brooklin":"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/351/ImagemPrincipal/Tegra-Incorporadora-Detalhe-da-Fachada-Empreendimento-Ampere-Brooklin-Apartamentos-Brooklin-Sao-Paulo-SP-714x640-1718890023834.jpg",
  "bem-moema":"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/336/ImagemPrincipal/Tegra-Incorporadora-Detalhe-da-Fachada-Apartamento-Bem-Moema-Sao-Paulo-SP-714x640-1715883122503.jpg",
  "bem-moema-studios-offices":"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/343/ImagemPrincipal/Tegra-Incorporadora-Perspectiva-Ilustrada-Piscina-Lazer-Apartamentos-Studios-Salas-Comerciais-Bem-Moema-Studios-Offices-Sao-Paulo-SP714x640-1715882591212.jpg",
  "tiel-vila-nova-conceicao":"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/352/ImagemPrincipal/Tegra-Incorporadora-Detalhe-da-Fachada-Studios-Vila-Nova-Conceicao-Sao-Paulo-SP-714x640-1718129172867.jpg",
  "universo-tatuape-orbita":"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/339/ImagemPrincipal/e56e585c-b5a8-44b5-95a6-c6227d8d18ea.jpg",
  "teg-sacoma":"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/281/ImagemPrincipal/Tegra-Incorporadora-Detalhe-da-Fachada-Area-Externa-Empreendimento-TEG-Sacoma-Apartamentos-Pronto-para-Morar-Zona-Sul-Sao-Paulo-SP-714x640-1716214964198.jpg",
  "chez-vous-moema":"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/255/Imagem/f94dfcdc-fd02-4275-b5c3-de5953378f31.jpg",
  "key-moema":"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/264/Imagem/f792b3c7-d80c-46b1-8625-dd9efaaac209.jpg",
  "ayla-moema-studio-office":"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/274/Imagem/Tegra-Incorporadora-Area-de-Lazer-Empreendimento-Ayla-Moema-Studio-Office-Salas-Comerciais-Moema-Sao-Paulo-SP%20001-1715447190661.jpg",
  "viso-moema":"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/267/Imagem/1e3238f2-6784-4c56-bdc3-8acfee126976.jpg",
  "region-brooklin":"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/341/ImagemPrincipal/6b04808c-fa4f-4bc9-bd24-e6052be1dda7.jpg",
  "region-perdizes":"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/314/ImagemPrincipal/Tegra-Incorporadora-Perspectiva-Ilustrada-Voo-Diurno-Fachada-Apartamentos-Studios-Salas-Comerciais-Soma-Perdizes-Sao-Paulo-SP-714x640-1715885527011.jpg",
  "region-vila-nova-conceicao":"https://stracctegra.blob.core.windows.net/assets/EmpreendimentoVitrine/337/ImagemPrincipal/8e85cddc-003b-4b7a-bfd2-2e38275cb1b8.jpg"
}
OUT=Path("assets/resf")
OUT.mkdir(parents=True,exist_ok=True)
manifest={}
for slug,url in SOURCES.items():
    r=requests.get(url,timeout=60)
    r.raise_for_status()
    im=Image.open(BytesIO(r.content)).convert("RGB")
    sw,sh=im.size
    rec={"source":url,"source_width":sw,"source_height":sh,"source_bytes":len(r.content),"variants":[]}
    d=OUT/slug
    d.mkdir(parents=True,exist_ok=True)
    for width in (640,828):
        if width>sw:
            continue
        height=round(sh*width/sw)
        resized=im.resize((width,height),Image.Resampling.LANCZOS)
        quality=78
        while True:
            buf=BytesIO()
            resized.save(buf,"WEBP",quality=quality,method=6)
            payload=buf.getvalue()
            if len(payload)<=100*1024 or quality<=60:
                break
            quality-=3
        name=f"hero-mobile-{width}.webp"
        (d/name).write_bytes(payload)
        rec["variants"].append({"path":str(d/name),"width":width,"height":height,"bytes":len(payload),"quality":quality,"sha256":hashlib.sha256(payload).hexdigest()})
    manifest[slug]=rec
(OUT/"manifest.json").write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
print(json.dumps(manifest,ensure_ascii=False,indent=2))
