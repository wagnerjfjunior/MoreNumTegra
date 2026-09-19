import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const FOOTER_LOGO = "https://s3-gdigital.s3.amazonaws.com/gdigital/313/dkRxNEw3OY1mr3apBCmTbFFGpzD4PZnbGLWpJq1q.webp";
const P1 = "Página de atendimento comercial More em um Tegra. Informações de unidades, disponibilidade e condições devem ser confirmadas diretamente com a equipe Tegra Vendas. Imagens, perspectivas, preços e condições podem ser atualizados sem aviso prévio.";
const P2 = "Os valores exibidos nesta página são referências comerciais vinculadas às unidades indicadas e podem sofrer alterações. Alguns empreendimentos podem apresentar condições promocionais específicas, sujeitas à disponibilidade da respectiva unidade. Preços, unidades, disponibilidade e condições comerciais devem ser confirmados com nossos corretores no atendimento.";
const CONTACT = "Sabrina da Tegra · Corretora Tegra Vendas · CRECI-SP 209.905-F.";
const PROFILE = "https://corretor.tegravendas.com.br/sabrina/sp";
const TEGRA_CORPORATE_HOST = /(?:^|\.)tegraincorporadora\.com\.br/i;
const EXACT_STREET_TOKENS = [
  "Rua Fortunato Ferraz",
  "Rua Coronel José Eusébio",
  "Rua Ibaragui Nissui",
  "Av. das Nações Unidas"
];

function stripNonVisibleAddressZones(html) {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<footer\b[\s\S]*?<\/footer>/gi, " ")
    .replace(/<!--([\s\S]*?)-->/g, " ");
}

const governed = new Map([
  ["src-greenn/preview/index.html","Estande Tegra Caminhos da Lapa · Rua Fortunato Ferraz, 625 · São Paulo/SP · CEP 05093-000."],
  ["src-greenn/empreendimentos/caminhos-da-lapa-elo-duo/index.html","Estande Tegra Caminhos da Lapa · Rua Fortunato Ferraz, 625 · São Paulo/SP · CEP 05093-000."],
  ["src-greenn/empreendimentos/aria-higienopolis/index.html","Ária Higienópolis · Rua Coronel José Eusébio, 145 · Higienópolis · São Paulo/SP · CEP 01239-030."],
  ["src-greenn/empreendimentos/capiitolo-piero-lissoni/index.html","CAPIITOLO by Piero Lissoni · Rua Ibaragui Nissui, 166 · Chácara Klabin · São Paulo/SP · CEP 04116-200."],
  ["experiments/capiitolo-editorial-v3/index.html","CAPIITOLO by Piero Lissoni · Rua Ibaragui Nissui, 166 · Chácara Klabin · São Paulo/SP · CEP 04116-200."]
]);

let failed=false;
const fail=(msg)=>{console.error("FAIL:",msg);failed=true;};

for(const [file,address] of governed){
  const full=path.join(ROOT,file);
  if(!fs.existsSync(full)){fail(`${file}: missing`);continue;}
  const html=fs.readFileSync(full,"utf8");
  if(!html.includes("data-mnt-commercial-footer")) fail(`${file}: missing data-mnt-commercial-footer`);
  if(!html.includes("data-mnt-footer-address")) fail(`${file}: missing data-mnt-footer-address`);
  if(!html.includes(FOOTER_LOGO)) fail(`${file}: wrong/missing footer logo`);
  if(!html.includes(P1)) fail(`${file}: missing canonical disclaimer paragraph 1`);
  if(!html.includes(P2)) fail(`${file}: missing canonical disclaimer paragraph 2`);
  if(!html.includes(CONTACT)) fail(`${file}: missing canonical Sabrina contact`);
  if(!html.includes('href="tel:+5511960779328"')) fail(`${file}: missing canonical phone link`);
  if(!html.includes(PROFILE)) fail(`${file}: missing official Tegra Vendas profile`);
  if(!html.includes(address)) fail(`${file}: governed footer address drift`);
  if(TEGRA_CORPORATE_HOST.test(html)) fail(`${file}: Tegra corporate-site URL is forbidden in public commercial HTML`);
  const visibleOutsideFooter = stripNonVisibleAddressZones(html);
  for (const street of EXACT_STREET_TOKENS) {
    if (visibleOutsideFooter.includes(street)) fail(`${file}: exact street address leaked outside the commercial footer: ${street}`);
  }
}

// Future exact-project pages must inherit the same contract.
const projectsDir=path.join(ROOT,"src-greenn/empreendimentos");
if(fs.existsSync(projectsDir)){
  for(const dir of fs.readdirSync(projectsDir,{withFileTypes:true}).filter(x=>x.isDirectory())){
    const rel=`src-greenn/empreendimentos/${dir.name}/index.html`;
    const full=path.join(ROOT,rel);
    if(!fs.existsSync(full)) continue;
    const html=fs.readFileSync(full,"utf8");
    if(!html.includes("data-mnt-commercial-footer")) fail(`${rel}: future-page footer contract missing`);
    if(!html.includes("data-mnt-footer-address")) fail(`${rel}: future-page governed address hook missing`);
    if(!html.includes(FOOTER_LOGO)) fail(`${rel}: future-page canonical footer logo missing`);
    if(!html.includes(P1)||!html.includes(P2)) fail(`${rel}: future-page disclaimer copy drift`);
    if(TEGRA_CORPORATE_HOST.test(html)) fail(`${rel}: future-page Tegra corporate-site URL is forbidden`);
    const visibleOutsideFooter = stripNonVisibleAddressZones(html);
    for (const street of EXACT_STREET_TOKENS) {
      if (visibleOutsideFooter.includes(street)) fail(`${rel}: future-page exact street address leaked outside footer: ${street}`);
    }
  }
}

const runtime=fs.readFileSync(path.join(ROOT,"src-greenn/preview/runtime.js"),"utf8");
const homeJs=fs.readFileSync(path.join(ROOT,"src-greenn/moretegra.js"),"utf8");
for (const [name, source] of [["runtime.js", runtime], ["moretegra.js", homeJs]]) {
  if(TEGRA_CORPORATE_HOST.test(source)) fail(`${name}: Tegra corporate-site URL/dependency is forbidden`);
}
if(runtime.includes("Abrir no Maps")) fail("CAPIITOLO runtime still exposes Abrir no Maps");
if(runtime.includes("google.com/maps/search")) fail("CAPIITOLO runtime still exposes direct Maps search navigation");
if(!runtime.includes('class="mnt-map-hit"')) fail("CAPIITOLO map-wide WhatsApp hit area missing");
if(!runtime.includes("pointer-events:none")) fail("CAPIITOLO embedded map interaction is not disabled");
if(!runtime.includes(">Solicitar localização</a>")) fail("CAPIITOLO yellow location button missing");
if(runtime.includes("-23.58341615763821,-46.62704356167254&z=")) fail("CAPIITOLO exact coordinates leaked into visible map source");

for (const file of [
  "src-greenn/empreendimentos/caminhos-da-lapa-elo-duo/index.html",
  "src-greenn/empreendimentos/aria-higienopolis/index.html"
]) {
  const html=fs.readFileSync(path.join(ROOT,file),"utf8");
  if(html.includes("Abrir no Maps")) fail(`${file}: external Maps CTA is forbidden`);
  if(html.includes("google.com/maps/search")) fail(`${file}: direct Maps search navigation is forbidden`);
  if(!html.includes('class="mt-map-hit"')) fail(`${file}: map-wide WhatsApp hit area missing`);
  if(!html.includes("pointer-events:none")) fail(`${file}: embedded map interaction must be disabled`);
}

if(failed) process.exit(1);
console.log("PASS: canonical footer, off-footer address isolation, Tegra-site isolation and WhatsApp-only maps");
