/* MoreNumTegra consent V3 — canonical origin only. */
(function(w,d){
"use strict";
if(w.MNTConsent)return;
const KEY="mnt.consent.v3",LEGACY="mnt.consent.v2",TTL=365*86400000,H="www.moretegra.com.br";
const live=w.location.hostname===H;
let current=null,started=false;
function read(){try{const p=JSON.parse(w.localStorage.getItem(KEY)||"null");if(p&&p.version===3&&typeof p.analytics==="boolean"&&typeof p.marketing==="boolean"&&Number.isFinite(p.savedAt)&&p.savedAt<=Date.now()&&p.expiresAt===p.savedAt+TTL&&p.expiresAt>Date.now())return p;}catch{}return null;}
function signals(p){return {analytics_storage:p?.analytics?"granted":"denied",ad_storage:p?.marketing?"granted":"denied",ad_user_data:p?.marketing?"granted":"denied",ad_personalization:p?.marketing?"granted":"denied"};}
w.dataLayer=w.dataLayer||[];
function consent(){w.dataLayer.push(arguments);}
consent("consent","default",signals(null));
w.dataLayer.push({event:"default_consent",...signals(null)});
function legacy(p){try{w.localStorage.setItem(LEGACY,p?.analytics?"granted":"denied");}catch{}}
function apply(p){current=p;legacy(p);if(!live)return;const s=signals(p);w["ga-disable-G-57M2XR0CY2"]=!p?.analytics;consent("consent","update",s);if(p&&(p.analytics||p.marketing)&&!started){started=true;w.dataLayer.push({"gtm.start":Date.now(),event:"gtm.js"});consent("consent","update",s);const j=d.createElement("script");j.async=true;j.src="https://www.googletagmanager.com/gtm.js?id=GTM-PGCR4R47";d.head.appendChild(j);}
if(p){w.dataLayer.push({event:p.analytics&&p.marketing?"mnt_consent_accept":!p.analytics&&!p.marketing?"mnt_consent_reject":"mnt_consent_preferences",...s,mnt_consent_analytics:p.analytics,mnt_consent_marketing:p.marketing});}}
function save(analytics,marketing){if(!live)return false;const prior=current;const now=Date.now(),p={version:3,analytics:analytics===true,marketing:marketing===true,savedAt:now,expiresAt:now+TTL};try{w.localStorage.setItem(KEY,JSON.stringify(p));}catch{}apply(p);d.dispatchEvent(new Event("mnt:consent-changed"));if(prior&&((prior.analytics&&!p.analytics)||(prior.marketing&&!p.marketing))){w.location.reload();}return true;}
w.MNTConsent=Object.freeze({get:()=>current?{...current}:null,save,signals:()=>signals(current)});
if(live)apply(read());
})(window,document);
