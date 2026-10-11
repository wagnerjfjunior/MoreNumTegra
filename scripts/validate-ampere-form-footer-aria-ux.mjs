import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const aria=readFileSync('src-greenn/empreendimentos/aria-higienopolis/index.html','utf8');
const amp=readFileSync('src-greenn/empreendimentos/ampere-brooklin/index.html','utf8');
const section=(s,re,label)=>{const v=s.match(re)?.[0];assert(v,label+' must exist');return v};
const af=section(aria,/<section id="formulario"[\s\S]*?<\/section>/,'Ária form');
const bf=section(amp,/<section class="lead mt-conversion-form" id="formulario"[\s\S]*?<\/section>/,'Ampère form');
const footer=section(amp,/<footer class="footer mt-footer" data-mnt-commercial-footer>[\s\S]*?<\/footer>/,'Ampère footer');
assert(amp.includes('Ária')===false || amp.includes('aria-'), 'do not rebrand Ampère as Ária in customer-facing text');
for(const cls of ['mt-shell','mt-section-head','mt-eyebrow','mt-local-form','mt-form-grid','mt-field','mt-lead-submit'])assert(af.includes(cls)&&bf.includes(cls),'form design must inherit Ária '+cls);
for(const id of ['moretegra-lead-form','mt-lead-intent','mt-lead-name','mt-lead-email','mt-phone-country','mt-lead-phone','mt-lead-error','mt-lead-status']){
 assert.equal((bf.match(new RegExp('id="'+id+'"','g'))||[]).length,1,id+' must appear once');
}
for(const name of ['tenant_id','form_id','title','texto-livre','nome','email','pais','telefone_display','company_website'])assert(bf.includes('name="'+name+'"'),'preserve Form46 payload '+name);
for(const v of ['name="tenant_id" value="313"','name="form_id" value="46"','name="title" value="MoreEmUmTegra"','data-moretegra-lead-form','data-form-id="46"','data-project-name="Ampère Brooklin"','data-moretegra-form-submit','data-submit-label'])assert(bf.includes(v),'missing governed form identifier '+v);
for(const v of ['mt-footer-standard','mt-footer-disclaimer','mt-footer-contact','data-mnt-footer-address','CRECI-SP 209.905-F','Rua André Ampére, 136'])assert(footer.includes(v),'missing legal footer '+v);
assert(!footer.includes('Rua Coronel José Eusébio'),'do not import Ária address');
assert(amp.includes('.mt-conversion-form .mt-field input:focus'),'accessible focus state required');
assert(amp.includes('@media(min-width:720px){.mt-conversion-form .mt-form-grid'),'responsive field grid required');
assert(amp.includes('.mt-conversion-form .mt-form-message[hidden]{display:none}'),'error/success status semantics');
assert(amp.includes('/src-greenn/preview/measurement-form.js'),'do not remove original form submit/runtime');
assert(amp.includes('/src-greenn/preview/measurement-core.js'),'do not remove original measurement contract');

// One canonical visible facts band: no duplicate hero-meta.
assert(!amp.includes('class="hero-meta"'),'hero-meta must be removed from Ampère hero');
const facts=section(amp,/<section class="facts" aria-label="Resumo do Ampère Brooklin">[\s\S]*?<\/section>/,'Ampère canonical facts');
assert.equal((facts.match(/class="fact"/g)||[]).length,4,'facts has exactly four cards');
for(const item of ['Área privativa','262 m²','Vagas','4 vagas','Região e diferencial','Brooklin','Living Double View','Estágio','Em construção'])assert(facts.includes(item),'missing verified fact '+item);
assert(amp.includes('.facts-in{display:grid;grid-template-columns:repeat(2,minmax(0,1fr))}'),'mobile facts must use 2 columns');
assert(amp.includes('@media(min-width:900px){.facts-in{grid-template-columns:repeat(4,minmax(0,1fr))}'),'wide-screen facts must use 4 columns');
assert(amp.includes('Apartamento no Brooklin com 262 m² privativos, 4 suítes e 4 vagas em torre única.'),'search-intent hero heading and suite details preserved');
console.log('AMPERE_FORM_FOOTER_ARIA_UX_PASS');
