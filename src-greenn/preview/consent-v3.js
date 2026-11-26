/* MoreNumTegra Consent V3: single, consent-first, vanilla manager. */
(function(w,d){
"use strict";
if(w.MNTConsent)return;
var KEY="mnt.consent.v3",HOST="www.moretegra.com.br",DAYS=365,TTL=DAYS*86400000;
var GTM="GTM-PGCR4R47",CLARITY="yyop6wf72m",live=w.location.hostname===HOST;
var state=null,gtmStarted=false,clarityStarted=false,ui=null,manage=null,opened=false;
var zero={analytics_storage:"denied",ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied"};
w.dataLayer=w.dataLayer||[];
function gtag(){w.dataLayer.push(arguments);}
function flags(p){return{analytics_storage:p&&p.analytics?"granted":"denied",ad_storage:p&&p.marketing?"granted":"denied",ad_user_data:p&&p.marketing?"granted":"denied",ad_personalization:p&&p.marketing?"granted":"denied"};}
gtag("consent","default",zero);
w.dataLayer.push({event:"default_consent",analytics_storage:"denied",ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied"});
function parse(raw){
 try{var p=JSON.parse(raw);if(!p||p.version!==3||typeof p.analytics!=="boolean"||typeof p.marketing!=="boolean"||!Number.isSafeInteger(p.savedAt)||!Number.isSafeInteger(p.expiresAt))return null;
 if(p.savedAt>Date.now()||p.expiresAt!==p.savedAt+TTL||p.expiresAt<=Date.now())return null;
 return{version:3,analytics:p.analytics,marketing:p.marketing,savedAt:p.savedAt,expiresAt:p.expiresAt};
 }catch(e){return null;}
}
function read(){try{return parse(w.localStorage.getItem(KEY));}catch(e){return null;}}
function allowed(kind){return !!(live&&state&&state[kind]===true);}
function cleanupCookies(){
 try{
 var names=d.cookie.split(";").map(function(x){return x.split("=")[0].trim();}).filter(function(k){return /^(?:_ga(?:_|$)|_gid$|_gat(?:_|$)|_gcl_|_clck$|_clsk$|_fbp$|_fbc$)/.test(k);});
 var parts=w.location.hostname.split("."),domains=["",w.location.hostname,"."+w.location.hostname];
 if(parts.length>2)domains.push("."+parts.slice(-2).join("."));
 names.forEach(function(name){domains.forEach(function(domain){
 var suf=domain?"; domain="+domain:"";
 d.cookie=name+"=; Max-Age=0; path=/; SameSite=Lax"+suf;
 });});
 }catch(e){}
}
function clarityConsent(p){
 if(typeof w.clarity!=="function")return;
 var s=flags(p);
 try{w.clarity("consentv2",{ad_Storage:s.ad_storage,analytics_Storage:s.analytics_storage});}catch(e){}
 if(!p||!p.analytics){try{w.clarity("consent",false);}catch(e){}}
}
function loadClarityPartial(){
 if(!live||clarityStarted||!state||!state.analytics||state.marketing)return;
 clarityStarted=true;
 // The historic GTM export only starts Clarity on full acceptance. For analytics-only
 // load the same project directly once, with advertising storage explicitly denied.
 if(typeof w.clarity!=="function"){
  w.clarity=function(){(w.clarity.q=w.clarity.q||[]).push(arguments);};
 }
 clarityConsent(state);
 var j=d.createElement("script");j.async=true;j.src="https://www.clarity.ms/tag/"+CLARITY;
 j.setAttribute("data-mnt-clarity-partial","");d.head.appendChild(j);
}
function loadGTM(){
 if(!live||gtmStarted)return;
 gtmStarted=true;
 w.dataLayer.push({"gtm.start":Date.now(),event:"gtm.js"});
 var j=d.createElement("script");j.async=true;j.src="https://www.googletagmanager.com/gtm.js?id="+GTM;
 j.setAttribute("data-mnt-gtm-v3","");
 j.onload=function(){if(state)gtag("consent","update",flags(state));clarityConsent(state);};
 d.head.appendChild(j);
}
function same(a,b){return !!a===!!b&&(!a||a.analytics===b.analytics&&a.marketing===b.marketing);}
function announce(p){
 // Legacy custom GTM triggers receive full accept only; granular preferences never
 // fire the old grant-all event, preventing privilege escalation.
 if(!p)return;
 var f=flags(p),event=p.analytics&&p.marketing?"mnt_consent_accept":!p.analytics&&!p.marketing?"mnt_consent_reject":"mnt_consent_preferences";
 w.dataLayer.push({event:event,mnt_consent_version:3,mnt_consent_analytics:p.analytics,mnt_consent_marketing:p.marketing,analytics_storage:f.analytics_storage,ad_storage:f.ad_storage,ad_user_data:f.ad_user_data,ad_personalization:f.ad_personalization});
}
function apply(p,notify){
 var previous=state;
 state=p;
 if(!live)return;
 gtag("consent","update",flags(p));
 if(p&&(p.analytics||p.marketing))loadGTM();
 if(p&&p.analytics&&!p.marketing)loadClarityPartial();
 clarityConsent(p);
 if(notify||(p&&!previous&&gtmStarted))announce(p);
 if(notify&&!same(previous,p))d.dispatchEvent(new Event("mnt:consent-changed"));
}
function refreshUI(){
 if(!ui)return;
 ui.hidden=!!state&&!opened;
 if(manage)manage.hidden=!ui.hidden;
 var a=ui.querySelector("[data-mnt-analytics]"),m=ui.querySelector("[data-mnt-marketing]");
 if(a)a.checked=!!(state&&state.analytics);
 if(m)m.checked=!!(state&&state.marketing);
}
function reopen(){
 if(!ui)return;
 opened=true;refreshUI();ui.hidden=false;
 var options=ui.querySelector("[data-mnt-options]");if(options)options.hidden=true;
 ui.querySelector("[data-mnt-v3-custom]").setAttribute("aria-expanded","false");
 ui.querySelector("[data-mnt-v3-reject]").focus({preventScroll:true});
}
function save(analytics,marketing){
 if(!live)return false;
 var prior=state,now=Date.now(),p={version:3,analytics:analytics===true,marketing:marketing===true,savedAt:now,expiresAt:now+TTL};
 var persisted=false;
 try{w.localStorage.setItem(KEY,JSON.stringify(p));persisted=true;}catch(e){}
 // Revoke first; never send queued analytics events after consent is withdrawn.
 if(prior&&((prior.analytics&&!p.analytics)||(prior.marketing&&!p.marketing)))cleanupCookies();
 apply(p,!same(prior,p));
 opened=false;refreshUI();
 if(manage)manage.focus({preventScroll:true});
 if(!persisted&&ui){
  var note=ui.querySelector("[data-mnt-storage-warning]");
  if(note){note.hidden=false;ui.hidden=false;opened=true;if(manage)manage.hidden=true;}
 }
 if(prior&&((prior.analytics&&!p.analytics)||(prior.marketing&&!p.marketing))){
  // A loaded third-party script cannot be safely unloaded. Persist revocation then
  // reload so the Basic Consent Mode gate prevents its subsequent execution.
  w.location.reload();
 }
 return true;
}
function mount(){
 if(!live||ui||!d.body)return;
 var old=d.querySelector("[data-mnt-consent]");
 if(old)old.remove();
 var style=d.createElement("style");style.id="mnt-v3-style";
 style.textContent=".mnt-v3{box-sizing:border-box;position:fixed;z-index:2147480000;left:12px;right:12px;bottom:12px;max-height:min(88vh,700px);overflow:auto;margin:0 auto;padding:18px;max-width:620px;background:#1b1c18;color:#fff;border:1px solid #57574f;border-radius:16px;box-shadow:0 12px 45px #0008;font:400 14px/1.5 system-ui,-apple-system,sans-serif;text-align:left}.mnt-v3[hidden],.mnt-v3 [hidden]{display:none!important}.mnt-v3 strong{color:#fff;font-size:17px}.mnt-v3 p{margin:6px 0 14px;color:#e7e6e1}.mnt-v3-buttons{display:flex;gap:9px;flex-wrap:wrap}.mnt-v3 button{border:1px solid #c7c4b9;border-radius:9px;min-height:44px;padding:9px 13px;background:#2c2e2a;color:#fff;font:600 13px/1.3 system-ui;cursor:pointer}.mnt-v3 button.mnt-primary{background:#EBB92E;border-color:#EBB92E;color:#181913}.mnt-v3 button:focus-visible,.mnt-v3-manage:focus-visible{outline:3px solid #EBB92E;outline-offset:3px}.mnt-v3-options{margin-top:15px;border-top:1px solid #666;padding-top:12px}.mnt-v3-options label{display:flex;gap:10px;align-items:flex-start;margin:9px 0;color:#fff}.mnt-v3-options input{width:19px;height:19px;flex:none;accent-color:#EBB92E}.mnt-v3-note{font-size:12px!important}.mnt-v3-manage{display:inline-block;margin:12px 0;padding:9px 12px;min-height:44px;border-radius:8px;border:1px solid currentColor;background:transparent;color:inherit;font:600 13px system-ui;cursor:pointer}html:has(.mnt-v3:not([hidden])) :is(#mt-floating-dock,.mnt-floating-actions,.mnt-whatsapp-float,.mnt-contact-float){display:none!important}.mnt-v3{z-index:2147483647!important;bottom:max(12px,env(safe-area-inset-bottom));max-height:calc(100vh - 24px);max-height:calc(100dvh - 24px - env(safe-area-inset-bottom));width:auto;min-width:0;max-width:480px;padding:14px}.mnt-v3-buttons{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:8px}.mnt-v3-buttons button{white-space:normal;min-width:0;width:100%;box-sizing:border-box}.mnt-v3-buttons [data-mnt-v3-custom]{grid-column:1/-1}.mnt-v3-buttons [data-mnt-v3-accept],.mnt-v3-buttons [data-mnt-v3-reject]{background:#EBB92E;border-color:#EBB92E;color:#181913}.mnt-v3 p{margin:6px 0 12px}.mnt-v3-manage[hidden]{display:none!important}@media(min-width:700px){.mnt-v3{left:auto;right:20px;margin:0;width:min(480px,calc(100vw - 40px));max-width:480px}}@media(max-width:699px){.mnt-v3{font-size:13px;left:max(10px,env(safe-area-inset-left));right:max(10px,env(safe-area-inset-right));padding:12px;border-radius:12px}.mnt-v3 strong{font-size:16px}}";
 d.head.appendChild(style);
 ui=d.createElement("aside");ui.className="mnt-v3";ui.setAttribute("data-mnt-v3","");ui.setAttribute("role","region");ui.setAttribute("aria-label","Privacidade e cookies");
 ui.innerHTML='<strong>Privacidade e cookies</strong><p>Usamos cookies essenciais e, com sua autorização, cookies de análise e publicidade para medir a navegação, campanhas e personalizar anúncios. Escolha suas preferências.</p><div class="mnt-v3-buttons"><button type="button" class="mnt-primary" data-mnt-v3-accept>Aceitar todos</button><button type="button" data-mnt-v3-reject>Recusar todos</button><button type="button" data-mnt-v3-custom aria-expanded="false">Personalizar preferências</button></div><div class="mnt-v3-options" data-mnt-options hidden><label><input type="checkbox" id="mnt-v3-essential" name="mnt-v3-essential" checked disabled aria-label="Cookies essenciais sempre ativos"> Cookies essenciais: necessários ao funcionamento do site.</label><label><input type="checkbox" id="mnt-v3-analytics" name="mnt-v3-analytics" data-mnt-analytics> Análise e desempenho: Google Analytics 4 e Microsoft Clarity.</label><label><input type="checkbox" id="mnt-v3-marketing" name="mnt-v3-marketing" data-mnt-marketing> Publicidade e marketing: atribuição, medição publicitária, remarketing e personalização.</label><button type="button" class="mnt-primary" data-mnt-v3-save>Salvar preferências</button><p class="mnt-v3-note">Suas preferências serão conservadas neste navegador por até 365 dias, salvo revogação ou exclusão dos dados.</p><button type="button" data-mnt-info aria-expanded="false">Como usamos cookies</button><p data-mnt-info-text hidden>Cookies essenciais mantêm as funções do site. Cookies de análise medem a navegação; cookies publicitários medem e personalizam campanhas. O formulário comercial funciona mesmo sem cookies não essenciais.</p></div><p data-mnt-storage-warning hidden role="status">O navegador bloqueou o armazenamento. Esta preferência vale apenas até sair desta página.</p>';
 d.body.appendChild(ui);
 manage=d.createElement("button");manage.type="button";manage.className="mnt-v3-manage";manage.textContent="Gerenciar cookies";manage.setAttribute("data-mnt-v3-manage","");
 (d.querySelector("footer:last-of-type")||d.querySelector("footer")||d.body).appendChild(manage);
 ui.querySelector("[data-mnt-v3-accept]").addEventListener("click",function(){save(true,true);});
 ui.querySelector("[data-mnt-v3-reject]").addEventListener("click",function(){save(false,false);});
 ui.querySelector("[data-mnt-v3-custom]").addEventListener("click",function(){
  var o=ui.querySelector("[data-mnt-options]");o.hidden=!o.hidden;this.setAttribute("aria-expanded",String(!o.hidden));
 });
 ui.querySelector("[data-mnt-v3-save]").addEventListener("click",function(){
  save(ui.querySelector("[data-mnt-analytics]").checked,ui.querySelector("[data-mnt-marketing]").checked);
 });
 ui.querySelector("[data-mnt-info]").addEventListener("click",function(){
  var o=ui.querySelector("[data-mnt-info-text]");o.hidden=!o.hidden;this.setAttribute("aria-expanded",String(!o.hidden));
 });
 manage.addEventListener("click",reopen);
 refreshUI();
}
w.MNTConsent=Object.freeze({get:function(){return state?Object.assign({},state):null;},allowed:allowed,save:save,signals:function(){return flags(state);},open:reopen,version:3});
if(live)apply(read(),false);
if(d.readyState==="loading")d.addEventListener("DOMContentLoaded",mount,{once:true});else mount();
w.addEventListener("storage",function(e){
 if(!live||e.key!==KEY)return;
 var p=read(),previous=state;
 if(same(previous,p))return;
 if(previous&&((previous.analytics&&!p?.analytics)||(previous.marketing&&!p?.marketing)))cleanupCookies();
 apply(p,true);opened=false;refreshUI();
 if(previous&&((previous.analytics&&!p?.analytics)||(previous.marketing&&!p?.marketing)))w.location.reload();
});
})(window,document);
