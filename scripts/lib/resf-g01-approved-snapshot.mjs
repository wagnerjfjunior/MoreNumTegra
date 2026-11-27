// Exact owner-approved G01 integrated release (#659, #660, #661).
// No moving main reference and no wildcard. A later edit requires an explicit
// per-route contract update; historical validators remain for all other routes.
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
export const G01_RELEASE='da69974eb1a959401cad92406eff458a1e2649fd';
const G01_PATHS=new Set([
 'src-greenn/preview/index.html',
 'src-greenn/empreendimentos/ampere-brooklin/index.html',
 'src-greenn/empreendimentos/aria-higienopolis/index.html',
 'src-greenn/empreendimentos/bem-moema/index.html',
 'src-greenn/empreendimentos/caminhos-da-lapa-elo-duo/index.html',
 'src-greenn/empreendimentos/mozae-higienopolis/index.html',
 'src-greenn/empreendimentos/ode-perdizes/index.html',
 'src-greenn/empreendimentos/tiel-vila-nova-conceicao/index.html',
 'src-greenn/empreendimentos/universo-tatuape-orbita/index.html',
 'src-greenn/empreendimentos/riio-by-piero-lissoni/index.html'
]);
export function isG01ApprovedPath(path){return G01_PATHS.has(path);}
export function assertG01ApprovedSnapshot(path,current){
 assert(isG01ApprovedPath(path),'Not an approved G01 path: '+path);
 const approved=execFileSync('git',['show',G01_RELEASE+':'+path],{encoding:'utf8'});
 const equal=value=>assert.equal(value,approved,path+': differs from exact approved G01 runtime snapshot');
 equal(current);
 // Negative checks must reject both content drift and consent removal.
 assert.throws(()=>equal(current+'\n<!-- unauthorized drift -->'),/differs from exact approved G01/);
 const manager=/<script\b[^>]*src="\/src-greenn\/preview\/consent-v3\.js\?v=20261125-final"[^>]*><\/script>/g;
 assert.equal([...current.matchAll(manager)].length,1,path+': expected exactly one V3 manager');
 assert.throws(()=>equal(current.replace(manager,'')),/differs from exact approved G01/);
 return current;
}
