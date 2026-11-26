(() => {
  "use strict";

  const LIVE_HOST = "www.moretegra.com.br";
  const FORM_SELECTOR = "[data-moretegra-lead-form]";
  const FORM_ENDPOINT = "https://back.gdigital.com.br/form/register";
  const TENANT_ID = "313";
  const FORM_ID = "46";
  // RESF G01: canal explícito SP/46 ou RJ/47; configuração inválida bloqueia envio.
  const FORM_IDS = Object.freeze(["46", "47"]);
  function formIdOf(form) {
    const declared = String(form?.dataset?.formId || "");
    const expected = form?.dataset?.resfRegion === "RJ" ? "47" : form?.dataset?.resfRegion === "SP" ? "46" : "";
    const hidden = form?.querySelector('input[name="form_id"]')?.value;
    return FORM_IDS.includes(declared) && declared === expected && hidden === declared ? declared : "";
  }
  const FORM_TITLE = "MoreEmUmTegra";
  const LEAD_PENDING_KEY = "mnt.lead.pending.v2";
  const LEGACY_LEAD_PENDING_KEY = "mnt.lead.pending.v1";
  const CONSENT_KEY = "mnt.consent.v2";
  const REQUEST_TIMEOUT_MS = 15000;
  const CAPIITOLO_WHATSAPP = "5511960779328";
  const WHATSAPP_ICON = "https://s3-gdigital.s3.amazonaws.com/gdigital/313/whatsapp-removebg.webp";
  const LOCATION_MESSAGE = "Por favor me envie a localização exata do Tegra CAPIITOLO by Piero Lissoni.";
  const CAPIITOLO_ROUTE = "/empreendimentos/capiitolo-piero-lissoni/";
  const FORM_INTENT_VALUES = Object.freeze({
    conditions: "Condições e disponibilidade",
    schedule_visit: "Agendar visita",
    payment_simulation: "Simular forma de pagamento",
    specialist: "Falar com especialista",
    negotiate_scenario: "Negociar meu cenário"
  });
  const PROJECT_NAME_OVERRIDES = Object.freeze({
    "Nova Vivere | 72 m²": "Nova Vivere",
    "Nova Vivere | 105 m²": "Nova Vivere",
    "CAPIITOLO by Piero Lissoni | à vista": "CAPIITOLO by Piero Lissoni"
  });
  const NO_PROJECT_CONTEXT = "Página principal | Nenhum empreendimento selecionado";

  function isLiveHost() {
    return window.location.hostname === LIVE_HOST;
  }

  function digits(value) {
    return String(value || "").replace(/\D/g, "");
  }

  // RESF_PHONE_V1_BEGIN
  // Derived from Google libphonenumber metadata (Apache-2.0), blob 3136b0c2c76b4d974102d22ab018e4d97b7f50e4.
  const RESF_PHONE_DATA = {"AC":["247","(?:[01589]\\d|[2-467])\\d{4}","",""],"AD":["376","(?:1|6\\d)\\d{7}|[135-9]\\d{5}","",""],"AE":["971","(?:[4-7]\\d|9[0-689])\\d{7}|800\\d{2,9}|[2-4679]\\d{7}","0",""],"AF":["93","[2-7]\\d{8}","0",""],"AG":["1","(?:268|[58]\\d\\d|900)\\d{7}","([457]\\d{6})$|1","268$1"],"AI":["1","(?:264|[58]\\d\\d|900)\\d{7}","([2457]\\d{6})$|1","264$1"],"AL":["355","(?:700\\d\\d|900)\\d{3}|8\\d{5,7}|(?:[2-5]|6\\d)\\d{7}","0",""],"AM":["374","(?:[1-489]\\d|55|60|77)\\d{6}","0",""],"AO":["244","[29]\\d{8}","",""],"AR":["54","(?:11|[89]\\d\\d)\\d{8}|[2368]\\d{9}","0?(?:(11|2(?:2(?:02?|[13]|2[13-79]|4[1-6]|5[2457]|6[124-8]|7[1-4]|8[13-6]|9[1267])|3(?:02?|1[467]|2[03-6]|3[13-8]|[49][2-6]|5[2-8]|[67])|4(?:7[3-578]|9)|6(?:[0136]|2[24-6]|4[6-8]?|5[15-8])|80|9(?:0[1-3]|[19]|2\\d|3[1-6]|4[02568]?|5[2-4]|6[2-46]|72?|8[23]?))|3(?:3(?:2[79]|6|8[2578])|4(?:0[0-24-9]|[12]|3[5-8]?|4[24-7]|5[4-68]?|6[02-9]|7[126]|8[2379]?|9[1-36-8])|5(?:1|2[1245]|3[237]?|4[1-46-9]|6[2-4]|7[1-6]|8[2-5]?)|6[24]|7(?:[069]|1[1568]|2[15]|3[145]|4[13]|5[14-8]|7[2-57]|8[126])|8(?:[01]|2[15-7]|3[2578]?|4[13-6]|5[4-8]?|6[1-357-9]|7[36-8]?|8[5-8]?|9[124])))15)?","9$1"],"AS":["1","(?:[58]\\d\\d|684|900)\\d{7}","([267]\\d{6})$|1","684$1"],"AT":["43","1\\d{3,12}|2\\d{6,12}|43(?:(?:0\\d|5[02-9])\\d{3,9}|2\\d{4,5}|[3467]\\d{4}|8\\d{4,6}|9\\d{4,7})|5\\d{4,12}|8\\d{7,12}|9\\d{8,12}|(?:[367]\\d|4[0-24-9])\\d{4,11}","0",""],"AU":["61","1(?:[0-79]\\d{7}(?:\\d(?:\\d{2})?)?|8[0-24-9]\\d{7})|[2-478]\\d{8}|1\\d{4,7}","(183[12])|0",""],"AW":["297","(?:[25-79]\\d\\d|800)\\d{4}","",""],"AX":["358","2\\d{4,9}|35\\d{4,5}|(?:60\\d\\d|800)\\d{4,6}|7\\d{5,11}|(?:[14]\\d|3[0-46-9]|50)\\d{4,8}","0",""],"AZ":["994","365\\d{6}|(?:[124579]\\d|60|88)\\d{7}","0",""],"BA":["387","6\\d{8}|(?:[35689]\\d|49|70)\\d{6}","0",""],"BB":["1","(?:246|[58]\\d\\d|900)\\d{7}","([2-9]\\d{6})$|1","246$1"],"BD":["880","[1-469]\\d{9}|8[0-79]\\d{7,8}|[2-79]\\d{8}|[2-9]\\d{7}|[3-9]\\d{6}|[57-9]\\d{5}","0",""],"BE":["32","4\\d{8}|[1-9]\\d{7}","0",""],"BF":["226","[024-7]\\d{7}","",""],"BG":["359","00800\\d{7}|[2-7]\\d{6,7}|[89]\\d{6,8}|2\\d{5}","0",""],"BH":["973","[136-9]\\d{7}","",""],"BI":["257","(?:[267]\\d|31)\\d{6}","",""],"BJ":["229","01\\d{8}","",""],"BL":["590","7090\\d{5}|(?:[56]9|[89]\\d)\\d{7}","0",""],"BM":["1","(?:441|[58]\\d\\d|900)\\d{7}","([2-9]\\d{6})$|1","441$1"],"BN":["673","[2-578]\\d{6}","",""],"BO":["591","(?:[2-7]\\d\\d|8001)\\d{5}","0(1\\d)?",""],"BQ":["599","(?:[34]1|7\\d)\\d{5}","",""],"BR":["55","[1-467]\\d{9,10}|55[0-46-9]\\d{8}|[34]\\d{7}|55\\d{7,8}|(?:5[0-46-9]|[89]\\d)\\d{7,9}","(?:0|90)(?:(1[245]|2[1-35]|31|4[13]|[56]5|99)(\\d{10,11}))?","$2"],"BS":["1","(?:242|[58]\\d\\d|900)\\d{7}","([3-8]\\d{6})$|1","242$1"],"BT":["975","[178]\\d{7}|[2-8]\\d{6}","",""],"BW":["267","90\\d{5}|(?:0800|[2-6]|(?:7|800)\\d)\\d{6}","",""],"BY":["375","(?:[12]\\d|33|44|902)\\d{7}|8(?:0[0-79]\\d{5,7}|[1-7]\\d{9})|8(?:1[0-489]|[5-79]\\d)\\d{7}|8[1-79]\\d{6,7}|8[0-79]\\d{5}|8\\d{5}","0|80?",""],"BZ":["501","(?:0800\\d|[2-8])\\d{6}","",""],"CA":["1","[2-9]\\d{9}|3\\d{6}","1",""],"CC":["61","1(?:[0-79]\\d{8}(?:\\d{2})?|8[0-24-9]\\d{7})|[148]\\d{8}|1\\d{5,7}","([59]\\d{7})$|0","8$1"],"CD":["243","(?:(?:[189]|5\\d)\\d|2)\\d{7}|[1-68]\\d{6}","0",""],"CF":["236","8776\\d{4}|(?:[27]\\d|61)\\d{6}","",""],"CG":["242","222\\d{6}|(?:0\\d|80)\\d{7}","",""],"CH":["41","8\\d{11}|[2-9]\\d{8}","0",""],"CI":["225","[02]\\d{9}","",""],"CK":["682","[2-578]\\d{4}","",""],"CL":["56","12300\\d{6}|6\\d{9,10}|[2-9]\\d{8}","",""],"CM":["237","[26]\\d{8}|88\\d{6,7}","",""],"CN":["86","(?:(?:1[03-689]|2\\d)\\d\\d|6)\\d{8}|1\\d{10}|[126]\\d{6}(?:\\d(?:\\d{2})?)?|86\\d{5,6}|(?:[3-579]\\d|8[0-57-9])\\d{5,9}","(1(?:[12]\\d|79)\\d\\d)|0",""],"CO":["57","(?:46|60\\d\\d)\\d{6}|(?:1\\d|[39])\\d{9}","0([3579]|4(?:[14]4|56))?",""],"CR":["506","(?:8\\d|90)\\d{8}|(?:[24-8]\\d{3}|3005)\\d{4}","(19(?:0[0-2468]|1[09]|20|66|77|99))",""],"CU":["53","(?:[2-7]|8\\d\\d)\\d{7}|[2-47]\\d{6}|[34]\\d{5}","0",""],"CV":["238","(?:[2-59]\\d\\d|800)\\d{4}","",""],"CW":["599","(?:[34]1|60|(?:7|9\\d)\\d)\\d{5}","",""],"CX":["61","1(?:[0-79]\\d{8}(?:\\d{2})?|8[0-24-9]\\d{7})|[148]\\d{8}|1\\d{5,7}","([59]\\d{7})$|0","8$1"],"CY":["357","(?:[279]\\d|[58]0)\\d{6}","",""],"CZ":["420","(?:[2-578]\\d|60)\\d{7}|9\\d{8,11}","",""],"DE":["49","[2579]\\d{5,14}|49(?:[34]0|69|8\\d)\\d\\d?|49(?:37|49|60|7[089]|9\\d)\\d{1,3}|49(?:2[024-9]|3[2-689]|7[1-7])\\d{1,8}|(?:1|[368]\\d|4[0-8])\\d{3,13}|49(?:[015]\\d|2[13]|31|[46][1-8])\\d{1,9}","0",""],"DJ":["253","(?:2\\d|77)\\d{6}","",""],"DK":["45","[2-9]\\d{7}","",""],"DM":["1","(?:[58]\\d\\d|767|900)\\d{7}","([2-7]\\d{6})$|1","767$1"],"DO":["1","(?:[58]\\d\\d|900)\\d{7}","1",""],"DZ":["213","(?:[1-4]|[5-79]\\d|80)\\d{7}","0",""],"EC":["593","1\\d{9,10}|(?:[2-7]|9\\d)\\d{7}","0",""],"EE":["372","8\\d{9}|[4578]\\d{7}|(?:[3-8]\\d|90)\\d{5}","",""],"EG":["20","[189]\\d{8,9}|[24-6]\\d{8}|[135]\\d{7}","0",""],"EH":["212","[5-8]\\d{8}","0",""],"ER":["291","[178]\\d{6}","0",""],"ES":["34","400\\d{6}|(?:51|[6-9]\\d)\\d{7}","",""],"ET":["251","(?:11|[2-57-9]\\d)\\d{7}","0",""],"FI":["358","[1-35689]\\d{4}|7\\d{10,11}|(?:[124-7]\\d|3[0-46-9])\\d{8}|[1-9]\\d{5,8}","0",""],"FJ":["679","45\\d{5}|(?:0800\\d|[235-9])\\d{6}","",""],"FK":["500","[2-7]\\d{4}","",""],"FM":["691","(?:[39]\\d\\d|820)\\d{4}","",""],"FO":["298","[2-9]\\d{5}","(10(?:01|[12]0|88))",""],"FR":["33","[1-9]\\d{8}","0",""],"GA":["241","(?:[067]\\d|11)\\d{6}|[2-7]\\d{6}","0(11\\d{6}|60\\d{6}|61\\d{6}|6[256]\\d{6}|7[467]\\d{6})","$1"],"GB":["44","[1-357-9]\\d{9}|[18]\\d{8}|8\\d{6}","0|180020",""],"GD":["1","(?:473|[58]\\d\\d|900)\\d{7}","([2-9]\\d{6})$|1","473$1"],"GE":["995","(?:[3-57]\\d\\d|800)\\d{6}","0",""],"GF":["594","(?:694\\d|7093)\\d{5}|(?:59|[89]\\d)\\d{7}","0",""],"GG":["44","(?:1481|[357-9]\\d{3})\\d{6}|8\\d{6}(?:\\d{2})?","([25-9]\\d{5})$|0|180020","1481$1"],"GH":["233","[235]\\d{8}|800\\d{5,6}","0",""],"GI":["350","(?:[25]\\d|60)\\d{6}","",""],"GL":["299","(?:19|[2-689]\\d|70)\\d{4}","",""],"GM":["220","[48]\\d{8}|[2-9]\\d{6}","",""],"GN":["224","722\\d{6}|(?:3|6\\d)\\d{7}","",""],"GP":["590","7090\\d{5}|(?:[56]9|[89]\\d)\\d{7}","0",""],"GQ":["240","222\\d{6}|(?:3\\d|55|[89]0)\\d{7}","",""],"GR":["30","5005000\\d{3}|8\\d{9,11}|(?:[269]\\d|70)\\d{8}","",""],"GT":["502","80\\d{6}|(?:1\\d{3}|[2-7])\\d{7}","",""],"GU":["1","(?:[58]\\d\\d|671|900)\\d{7}","([2-9]\\d{6})$|1","671$1"],"GW":["245","[49]\\d{8}|4\\d{6}","",""],"GY":["592","(?:[2-8]\\d{3}|9008)\\d{3}","",""],"HK":["852","8[0-46-9]\\d{6,7}|9\\d{4,7}|(?:[2-7]|9\\d{3})\\d{7}","",""],"HN":["504","8\\d{10}|[237-9]\\d{7}","",""],"HR":["385","[2-69]\\d{8}|80\\d{5,7}|[1-79]\\d{7}|6\\d{6}","0",""],"HT":["509","[2-589]\\d{7}","",""],"HU":["36","[235-7]\\d{8}|[1-9]\\d{7}","06",""],"ID":["62","00[1-9]\\d{9,14}|(?:[1-36]|8\\d{5})\\d{6}|00\\d{9}|[1-9]\\d{8,10}|[2-9]\\d{7}","0",""],"IE":["353","(?:1\\d|[2569])\\d{6,8}|4\\d{6,9}|7\\d{8}|8\\d{8,9}","0",""],"IL":["972","1\\d{6}(?:\\d{3,5})?|[57]\\d{8}|[1-489]\\d{7}","0",""],"IM":["44","1624\\d{6}|(?:[3578]\\d|90)\\d{8}","([25-8]\\d{5})$|0|180020","1624$1"],"IN":["91","(?:000800|[2-9]\\d\\d)\\d{7}|1\\d{7,12}","0",""],"IO":["246","3\\d{6}","",""],"IQ":["964","(?:1|7\\d\\d)\\d{7}|[2-6]\\d{7,8}","0",""],"IR":["98","[1-9]\\d{9}|(?:[1-8]\\d\\d|9)\\d{3,4}","0",""],"IS":["354","(?:38\\d|[4-9])\\d{6}","",""],"IT":["39","0\\d{5,11}|1\\d{8,10}|3(?:[0-8]\\d{7,10}|9\\d{7,8})|(?:43|55|70)\\d{8}|8\\d{5}(?:\\d{2,4})?","",""],"JE":["44","1534\\d{6}|(?:[3578]\\d|90)\\d{8}","([0-24-8]\\d{5})$|0|180020","1534$1"],"JM":["1","(?:[58]\\d\\d|658|900)\\d{7}","1",""],"JO":["962","(?:(?:[2689]|7\\d)\\d|32|427|53)\\d{6}","0",""],"JP":["81","00[1-9]\\d{6,14}|[25-9]\\d{9}|(?:00|[1-9]\\d\\d)\\d{6}","(000[2569]\\d{4,6})$|(?:(?:003768)0?)|0","$1"],"KE":["254","(?:[17]\\d\\d|900)\\d{6}|(?:2|80)0\\d{6,7}|[4-6]\\d{6,8}","0",""],"KG":["996","8\\d{9}|[235-9]\\d{8}","0",""],"KH":["855","1\\d{9}|[1-9]\\d{7,8}","0",""],"KI":["686","(?:[37]\\d|6[0-79])\\d{6}|(?:[2-48]\\d|50)\\d{3}","0",""],"KM":["269","[3478]\\d{6}","",""],"KN":["1","(?:[58]\\d\\d|900)\\d{7}","([2-7]\\d{6})$|1","869$1"],"KP":["850","85\\d{6}|(?:19\\d|[2-7])\\d{7}","0",""],"KR":["82","00[1-9]\\d{8,11}|(?:[12]|5\\d{3})\\d{7}|[13-6]\\d{9}|(?:[1-6]\\d|80)\\d{7}|[3-6]\\d{4,5}|(?:00|7)0\\d{8}","0(8(?:[1-46-8]|5\\d\\d))?",""],"KW":["965","18\\d{5}|(?:[2569]\\d|41)\\d{6}","",""],"KY":["1","(?:345|[58]\\d\\d|900)\\d{7}","([2-9]\\d{6})$|1","345$1"],"KZ":["7","8\\d{13}|[78]\\d{9}","8",""],"LA":["856","(?:2\\d|3)\\d{8}|(?:[235-8]\\d|41)\\d{6}","0",""],"LB":["961","[27-9]\\d{7}|[13-9]\\d{6}","0",""],"LC":["1","(?:[58]\\d\\d|758|900)\\d{7}","([2-8]\\d{6})$|1","758$1"],"LI":["423","[68]\\d{8}|(?:[2378]\\d|90)\\d{5}","(1001)|0",""],"LK":["94","[1-9]\\d{8}","0",""],"LR":["231","(?:[2457]\\d|33|88)\\d{7}|(?:2\\d|[4-6])\\d{6}","0",""],"LS":["266","(?:[256]\\d\\d|800)\\d{5}","",""],"LT":["370","(?:[3469]\\d|52|[78]0)\\d{6}","[08]",""],"LU":["352","35[013-9]\\d{4,8}|6\\d{8}|35\\d{2,4}|(?:[2457-9]\\d|3[0-46-9])\\d{2,9}","(15(?:0[06]|1[12]|[35]5|4[04]|6[26]|77|88|99)\\d)",""],"LV":["371","(?:[268]\\d|78|90)\\d{6}","",""],"LY":["218","[2-9]\\d{8}","0",""],"MA":["212","[5-8]\\d{8}","0",""],"MC":["377","(?:[3489]|[67]\\d)\\d{7}","0",""],"MD":["373","(?:[235-7]\\d|[89]0)\\d{6}","0",""],"ME":["382","(?:20|[3-79]\\d)\\d{6}|80\\d{6,7}","0",""],"MF":["590","7090\\d{5}|(?:[56]9|[89]\\d)\\d{7}","0",""],"MG":["261","[23]\\d{8}","([24-9]\\d{6})$|0","20$1"],"MH":["692","329\\d{4}|(?:[256]\\d|45)\\d{5}","1",""],"MK":["389","[2-578]\\d{7}","0",""],"ML":["223","[24-9]\\d{7}","",""],"MM":["95","1\\d{5,7}|95\\d{6}|(?:[4-7]|9[0-46-9])\\d{6,8}|(?:2|8\\d)\\d{5,8}","0",""],"MN":["976","[12]\\d{7,9}|[5-9]\\d{7}","0",""],"MO":["853","0800\\d{3}|(?:28|[68]\\d)\\d{6}","",""],"MP":["1","[58]\\d{9}|(?:67|90)0\\d{7}","([2-9]\\d{6})$|1","670$1"],"MQ":["596","7091\\d{5}|(?:[56]9|[89]\\d)\\d{7}","0",""],"MR":["222","(?:[2-4]\\d\\d|800)\\d{5}","",""],"MS":["1","(?:[58]\\d\\d|664|900)\\d{7}","([34]\\d{6})$|1","664$1"],"MT":["356","3550\\d{4}|(?:[2579]\\d\\d|800)\\d{5}","",""],"MU":["230","(?:[57]|8\\d\\d)\\d{7}|[2-468]\\d{6}","",""],"MV":["960","(?:800|9[0-57-9]\\d)\\d{7}|[34679]\\d{6}","",""],"MW":["265","(?:[1289]\\d|31|77)\\d{7}|1\\d{6}","0",""],"MX":["52","[2-9]\\d{9}","",""],"MY":["60","1\\d{8,9}|(?:3\\d|[4-9])\\d{7}","0",""],"MZ":["258","(?:2|8\\d)\\d{7}","",""],"NA":["264","[68]\\d{7,8}","0",""],"NC":["687","(?:050|[2-57-9]\\d\\d)\\d{3}","",""],"NE":["227","[027-9]\\d{7}","",""],"NF":["672","[13]\\d{5}","([0-258]\\d{4})$","3$1"],"NG":["234","(?:20|9\\d)\\d{8}|[78]\\d{9,13}","0",""],"NI":["505","(?:1800|[25-8]\\d{3})\\d{4}","",""],"NL":["31","(?:[124-7]\\d\\d|3(?:[02-9]\\d|1[0-8]))\\d{6}|8\\d{6,9}|9\\d{6,10}|1\\d{4,5}","0",""],"NO":["47","(?:0|[2-9]\\d{3})\\d{4}","",""],"NP":["977","(?:1\\d|9)\\d{9}|[1-9]\\d{7}","0",""],"NR":["674","(?:222|444|(?:55|8\\d)\\d|666|777|999)\\d{4}","",""],"NU":["683","(?:[4-7]|888\\d)\\d{3}","",""],"NZ":["64","11\\d{8,12}|[29]\\d{7,9}|(?:[34]\\d|6[0-35-9])\\d{6}|50\\d{5}(?:\\d{2,3})?|7\\d{7,8}|8\\d{4,9}","0",""],"OM":["968","(?:1505|[279]\\d{3}|500)\\d{4}|800\\d{5,6}","",""],"PA":["507","(?:00800|8\\d{3})\\d{6}|[68]\\d{7}|[1-57-9]\\d{6}","",""],"PE":["51","(?:[14-8]|9\\d)\\d{7}","0",""],"PF":["689","4\\d{5}(?:\\d{2})?|8\\d{7,8}","",""],"PG":["675","(?:180|[78]\\d{3})\\d{4}|(?:[2-589]\\d|64)\\d{5}","",""],"PH":["63","(?:[2-7]|9\\d)\\d{8}|2\\d{5}|(?:1800|8)\\d{7,9}","0",""],"PK":["92","122\\d{6}|[24-8]\\d{10,11}|9(?:[013-9]\\d{8,10}|2(?:[01]\\d\\d|2(?:[06-8]\\d|1[01]))\\d{7})|(?:[2-8]\\d{3}|92(?:[0-7]\\d|8[1-9]))\\d{6}|[24-9]\\d{8}|[89]\\d{7}","0",""],"PL":["48","(?:6|8\\d\\d)\\d{7}|[1-9]\\d{6}(?:\\d{2})?|[26]\\d{5}","",""],"PM":["508","[78]\\d{8}|[2-9]\\d{5}","0",""],"PR":["1","(?:[589]\\d\\d|787)\\d{7}","1",""],"PS":["970","[2489]2\\d{6}|(?:1\\d|5)\\d{8}","0",""],"PT":["351","1693\\d{5}|(?:[26-9]\\d|30)\\d{7}","",""],"PW":["680","(?:[24-8]\\d\\d|345|900)\\d{4}","",""],"PY":["595","[36-8]\\d{5,8}|4\\d{6,8}|59\\d{6}|9\\d{5,10}|(?:2\\d|5[0-8])\\d{6,7}","0",""],"QA":["974","800\\d{4}|(?:2|800)\\d{6}|(?:0080|[3-7])\\d{7}","",""],"RE":["262","709\\d{6}|(?:26|[689]\\d)\\d{7}","0",""],"RO":["40","(?:[2378]\\d|90)\\d{7}|[23]\\d{5}","0",""],"RS":["381","38[02-9]\\d{6,9}|6\\d{7,9}|90\\d{4,8}|38\\d{5,6}|(?:7\\d\\d|800)\\d{3,9}|(?:[12]\\d|3[0-79])\\d{5,10}","0",""],"RU":["7","8\\d{13}|[347-9]\\d{9}","8",""],"RW":["250","(?:06|[27]\\d\\d|[89]00)\\d{6}","0",""],"SA":["966","(?:[15]\\d|800|92)\\d{7}","0",""],"SB":["677","[6-9]\\d{6}|[1-6]\\d{4}","",""],"SC":["248","(?:[2489]\\d|64)\\d{5}","",""],"SD":["249","[19]\\d{8}","0",""],"SE":["46","(?:[26]\\d\\d|9)\\d{9}|[1-9]\\d{8}|[1-689]\\d{7}|[1-4689]\\d{6}|2\\d{5}","0",""],"SG":["65","(?:(?:1\\d|8)\\d\\d|7000)\\d{7}|[3689]\\d{7}","",""],"SH":["290","(?:[2569]\\d|8)\\d{3}","",""],"SI":["386","[1-7]\\d{7}|8\\d{4,7}|90\\d{4,6}","0",""],"SJ":["47","0\\d{4}|(?:[489]\\d|79)\\d{6}","",""],"SK":["421","[2-689]\\d{8}|[2-59]\\d{6}|[2-5]\\d{5}","0",""],"SL":["232","(?:[237-9]\\d|66)\\d{6}","0",""],"SM":["378","(?:0549|[5-7]\\d)\\d{6}","([89]\\d{5})$","0549$1"],"SN":["221","(?:[378]\\d|93)\\d{7}","",""],"SO":["252","[346-9]\\d{8}|[12679]\\d{7}|[1-5]\\d{6}|[1348]\\d{5}","0",""],"SR":["597","(?:[2-5]|[6-9]\\d)\\d{5}","",""],"SS":["211","[19]\\d{8}","0",""],"ST":["239","(?:22|9\\d)\\d{5}","",""],"SV":["503","[25-7]\\d{7}|(?:80\\d|900)\\d{4}(?:\\d{4})?","",""],"SX":["1","7215\\d{6}|(?:[58]\\d\\d|900)\\d{7}","(5\\d{6})$|1","721$1"],"SY":["963","[1-359]\\d{8}|[1-5]\\d{7}","0",""],"SZ":["268","0800\\d{4}|(?:[237]\\d|900)\\d{6}","",""],"TA":["290","8\\d{3}","",""],"TC":["1","(?:[58]\\d\\d|649|900)\\d{7}","([2-479]\\d{6})$|1","649$1"],"TD":["235","(?:22|[3689]\\d|77)\\d{6}","",""],"TG":["228","[279]\\d{7}","",""],"TH":["66","(?:001800|[2-57]|[689]\\d)\\d{7}|1\\d{7,9}","0",""],"TJ":["992","(?:[0-57-9]\\d|66)\\d{7}","",""],"TK":["690","[2-47]\\d{3,6}","",""],"TL":["670","7\\d{7}|(?:[2-47]\\d|[89]0)\\d{5}","",""],"TM":["993","[1-7]\\d{7}","8",""],"TN":["216","[2-57-9]\\d{7}","",""],"TO":["676","(?:0800|(?:[5-8]\\d\\d|999)\\d)\\d{3}|[2-8]\\d{4}","",""],"TR":["90","4\\d{6}|8\\d{11,12}|(?:[2-58]\\d\\d|900)\\d{7}","0",""],"TT":["1","(?:[58]\\d\\d|900)\\d{7}","([2-46-8]\\d{6})$|1","868$1"],"TV":["688","(?:2|7\\d\\d|90)\\d{4}","",""],"TW":["886","[2-689]\\d{8}|7\\d{9,10}|[2-8]\\d{7}|2\\d{6}","0",""],"TZ":["255","(?:[25-8]\\d|41|90)\\d{7}","0",""],"UA":["380","[89]\\d{9}|[3-9]\\d{8}","0",""],"UG":["256","800\\d{6}|(?:[29]0|[347]\\d)\\d{7}","0",""],"US":["1","[2-9]\\d{9}|3\\d{6}","1",""],"UY":["598","0004\\d{2,9}|[1249]\\d{7}|2\\d{3,4}|(?:[49]\\d|80)\\d{5}","0",""],"UZ":["998","(?:20|33|[5-9]\\d)\\d{7}","",""],"VA":["39","0\\d{5,10}|3[0-8]\\d{7,10}|55\\d{8}|8\\d{5}(?:\\d{2,4})?|(?:1\\d|39)\\d{7,8}","",""],"VC":["1","(?:[58]\\d\\d|784|900)\\d{7}","([2-7]\\d{6})$|1","784$1"],"VE":["58","[68]00\\d{7}|(?:[24]\\d|[59]0)\\d{8}","0",""],"VG":["1","(?:284|[58]\\d\\d|900)\\d{7}","([2-578]\\d{6})$|1","284$1"],"VI":["1","[58]\\d{9}|(?:34|90)0\\d{7}","([2-9]\\d{6})$|1","340$1"],"VN":["84","[12]\\d{9}|[135-9]\\d{8}|[16]\\d{6,7}|7\\d{6}","0",""],"VU":["678","[57-9]\\d{6}|(?:[238]\\d|48)\\d{3}","",""],"WF":["681","(?:40|72|8\\d{4})\\d{4}|[89]\\d{5}","",""],"WS":["685","(?:[2-6]|8\\d{5})\\d{4}|[78]\\d{6}|[68]\\d{5}","",""],"XK":["383","2\\d{7,8}|3\\d{7,11}|(?:4\\d\\d|[89]00)\\d{5}","0",""],"YE":["967","(?:1|7\\d)\\d{7}|[1-7]\\d{6}","0",""],"YT":["262","(?:639\\d|7093)\\d{5}|(?:26|80|9\\d)\\d{7}","0",""],"ZA":["27","[1-79]\\d{8}|8\\d{4,9}","0",""],"ZM":["260","800\\d{6}|(?:21|[579]\\d|63)\\d{7}","0",""],"ZW":["263","8\\d{6}(?:\\d{3})?|[235-8]\\d{8}","0",""],"001-800":["800","(?:00|[1-9]\\d)\\d{6}","",""],"001-808":["808","[1-9]\\d{7}","",""],"001-870":["870","7\\d{11}|[235-7]\\d{8}","",""],"001-878":["878","10\\d{10}","",""],"001-881":["881","6\\d{9}|[0-36-9]\\d{8}","",""],"001-882":["882","[13]\\d{6}(?:\\d{2,5})?|[19]\\d{7}|(?:[25]\\d\\d|4)\\d{7}(?:\\d{2})?","",""],"001-883":["883","(?:[1-4]\\d|51)\\d{6,10}","",""],"001-888":["888","\\d{11}","",""],"001-979":["979","[1359]\\d{8}","",""]};
  function normalizePhone(rawValue,iso,data){
 const raw=String(rawValue||"").trim();
 if(!raw||!/^\+?[\d\s().-]+$/.test(raw))return "";
 const digits=raw.replace(/\D/g,"");
 const explicit=raw.startsWith("+")||raw.startsWith("00");
 const full=raw.startsWith("00")?digits.slice(2):digits;
 const valid=(n,region,record)=>!!n&&n.length+record[0].length<=15&&n.length+record[0].length>=7&&(!(region==="BR")||[10,11].includes(n.length))&&(!["US","CA"].includes(region)||n.length===10)&&new RegExp("^(?:"+record[1]+")$").test(n);
 if(explicit){
  if(!/^[1-9]\d{6,14}$/.test(full))return "";
  if(iso==="OTHER")return Object.entries(data).some(([key,rec])=>full.startsWith(rec[0])&&valid(full.slice(rec[0].length),key,rec))?"+"+full:"";
  const rec=data[iso];return rec&&full.startsWith(rec[0])&&valid(full.slice(rec[0].length),iso,rec)?"+"+full:"";
 }
 if(iso==="OTHER"||!data[iso])return "";
 const rec=data[iso];if(valid(digits,iso,rec))return "+"+rec[0]+digits;
 if(rec[2]){
  const re=new RegExp("^(?:"+rec[2]+")"),match=digits.match(re);
  if(match&&match[0].length){
   const transformed=rec[3]&&match.slice(1).some(Boolean)?digits.replace(re,rec[3]):digits.slice(match[0].length);
   if(valid(transformed,iso,rec))return "+"+rec[0]+transformed;
  }
 }
 return "";
}
  function normalizeE164(rawValue, iso) { return normalizePhone(rawValue, iso, RESF_PHONE_DATA); }
  // RESF_PHONE_V1_END

  function formatBrazilPhone(rawValue) {
    const value = digits(rawValue);
    if (value.length > 11) return rawValue;
    if (value.length <= 2) return value;
    if (value.length <= 6) return `(${value.slice(0, 2)}) ${value.slice(2)}`;
    if (value.length <= 10) return `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
    return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
  }

  function safeProviderQuery(rawQuery) {
    if (!rawQuery || typeof rawQuery !== "string") return "";
    const source = new URLSearchParams(rawQuery.startsWith("?") ? rawQuery.slice(1) : rawQuery);
    const safe = new URLSearchParams();
    ["l_", "p_id"].forEach((key) => {
      const value = source.get(key);
      if (value && /^\d+$/.test(value)) safe.set(key, value);
    });
    const serialized = safe.toString();
    return serialized ? `?${serialized}` : "";
  }

  function setPendingLead(form) {
    try {
      const marker = {
        version: 2,
        submitted_at: Date.now(),
        form_id: formIdOf(form),
        ...measurementProjectContext(form)
      };
      window.sessionStorage.setItem(LEAD_PENDING_KEY, JSON.stringify(marker));
      window.sessionStorage.removeItem(LEGACY_LEAD_PENDING_KEY);
    } catch {
      // Lead conversion may be undercounted if storage is unavailable; PII is never stored.
    }
  }

  function selectedInterest() {
    return String(document.documentElement.dataset.moretegraInterest || "").trim();
  }

  function showMessage(node, text) {
    if (!node) return;
    node.textContent = text;
    node.hidden = !text;
  }

  function leadProjectContext(form) {
    return String(
      form.dataset.selectedProject ||
      form.dataset.projectName ||
      selectedInterest() ||
      form.dataset.regionContext ||
      NO_PROJECT_CONTEXT
    ).trim();
  }

  function measurementProjectContext(form) {
    if (form.dataset.regionContext && !form.dataset.selectedProject && !selectedInterest()) return {};
    const offerName = leadProjectContext(form);
    if (!offerName || offerName === NO_PROJECT_CONTEXT) return {};
    return {
      project_name: PROJECT_NAME_OVERRIDES[offerName] || offerName,
      offer_name: offerName
    };
  }

  // Form46/SP: preserva o interesse FGTS explicitado na navegação sem alterar o vocabulário
  // de intenção, o contrato Green, o Form47/RJ ou os eventos de Measurement.
  function isFgtsJourney(form) {
    if (formIdOf(form) !== "46") return false;
    const params = new URLSearchParams(window.location.search);
    return params.get("origem") === "fgts" || params.get("interesse") === "FGTS para comprar apartamento";
  }

  function composeLeadContext(form) {
    const selectedProject = leadProjectContext(form);
    // Sem projeto escolhido, registra a finalidade da consulta sem inventar um empreendimento.
    // Esta etiqueta pertence só ao payload Green e não substitui project_name no Measurement.
    const project = isFgtsJourney(form) && selectedProject === NO_PROJECT_CONTEXT
      ? "Orientação FGTS na compra de apartamento"
      : selectedProject;
    const intent = String(form.elements["texto-livre"]?.value || "").trim();
    // The CAPIITOLO selector names the project for the visitor, but the CRM context
    // already prefixes the full project name. Keep unit/payment detail without duplication.
    const crmIntent = project === "CAPIITOLO by Piero Lissoni"
      ? intent.replace(/^Condições e disponibilidade — CAPIITOLO, unidade 33, (promocional|à vista)$/, "Condições e disponibilidade — unidade 33, $1")
      : intent;
    const context = crmIntent ? `${project} | ${crmIntent}` : project;
    return isFgtsJourney(form) ? `${context} | Interesse: FGTS` : context;
  }

  function validate(form, countrySelect) {
    const name = form.elements.nome;
    const email = form.elements.email;
    const phone = form.elements.telefone_display;
    const intent = form.elements["texto-livre"];
    const code = String(countrySelect.value || "");
    const normalizedPhone = normalizeE164(phone.value, code);
    const errors = [];
    if (!formIdOf(form)) errors.push("Configuração de atendimento indisponível. Atualize a página e tente novamente.");
    [name, email, phone, countrySelect, intent].forEach((field) => field?.removeAttribute("aria-invalid"));
    if (!String(intent?.value || "").trim()) {
      errors.push("Selecione o que você deseja.");
      intent?.setAttribute("aria-invalid", "true");
    }
    if (!String(name.value || "").trim()) {
      errors.push("Informe seu nome.");
      name.setAttribute("aria-invalid", "true");
    }
    if (!email.validity.valid || !String(email.value || "").trim()) {
      errors.push("Informe um e-mail válido.");
      email.setAttribute("aria-invalid", "true");
    }
    if (!code) {
      errors.push("Selecione o país do telefone.");
      countrySelect.setAttribute("aria-invalid", "true");
    }
    if (!normalizedPhone) {
      errors.push(code === "BR" ? "Informe um telefone brasileiro válido com DDD ou selecione o país correto." : code === "OTHER" ? "Informe o número internacional completo com + ou 00 e DDI." : "Informe um telefone válido para o país selecionado.");
      phone.setAttribute("aria-invalid", "true");
    }
    return {
      valid: errors.length === 0,
      message: errors[0] || "",
      phone: normalizedPhone,
      name: String(name.value || "").trim(),
      email: String(email.value || "").trim(),
      leadContext: composeLeadContext(form)
    };
  }

  function ensureConsentStyle() {
    if (document.getElementById("mnt-runtime-consent-style")) return;
    const style = document.createElement("style");
    style.id = "mnt-runtime-consent-style";
    style.textContent = `
      .mnt-runtime-consent{position:fixed;z-index:9999;left:14px;right:14px;bottom:14px;max-width:780px;margin:0 auto;padding:16px;border:1px solid rgba(255,255,255,.12);border-radius:16px;background:#1b1c18;color:#fff;box-shadow:0 16px 50px rgba(0,0,0,.34);font-family:system-ui,sans-serif;display:grid;gap:14px}
      .mnt-runtime-consent[hidden]{display:none!important}
      .mnt-runtime-consent strong{color:#fff}.mnt-runtime-consent p{margin:4px 0 0;color:#ccc8bd;font-size:12px}
      .mnt-runtime-consent-actions{display:flex;flex-wrap:wrap;gap:8px}
      .mnt-runtime-consent button{min-height:46px;border-radius:999px;border:1px solid #777267;background:transparent;color:#fff;padding:9px 14px;font-weight:800;cursor:pointer}
      .mnt-runtime-consent button.is-primary{background:#EBB92E;color:#171813;border-color:#EBB92E}
      .mnt-runtime-consent button:focus-visible{outline:3px solid #EBB92E;outline-offset:3px}
      .mnt-consent-manage{display:inline-flex;align-items:center;justify-content:center;min-height:40px;margin-top:10px;padding:8px 12px;border:1px solid currentColor;border-radius:999px;background:transparent;color:inherit;font:700 12px/1 system-ui,sans-serif;cursor:pointer}
      .mnt-consent-manage[hidden]{display:none!important}
      .mnt-consent-manage:focus-visible{outline:3px solid #EBB92E;outline-offset:3px}
      @media(min-width:720px){.mnt-runtime-consent{left:auto;right:20px;max-width:520px;grid-template-columns:1fr auto;align-items:center}}
    `;
    document.head.append(style);
  }

  function ensureConsentBanner() {
    ensureConsentStyle();
    const existing = document.querySelector("[data-mnt-consent]");
    if (existing) return existing;

    const banner = document.createElement("aside");
    banner.className = "mnt-runtime-consent";
    banner.dataset.mntConsent = "";
    banner.hidden = true;
    banner.setAttribute("aria-label", "Preferências de privacidade");
    banner.innerHTML = `<div><strong>Privacidade</strong><p>Você pode aceitar ou recusar cookies de medição.</p></div><div class="mnt-runtime-consent-actions"><button type="button" data-consent-reject>Recusar</button><button type="button" class="is-primary" data-consent-accept>Aceitar</button></div>`;
    document.body.append(banner);
    return banner;
  }

  function ensureConsentManageControl() {
    ensureConsentStyle();
    const existing = document.querySelector("[data-consent-manage]");
    if (existing) return existing;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "mnt-consent-manage";
    button.dataset.consentManage = "";
    button.textContent = "Preferências de privacidade";
    button.hidden = true;
    button.setAttribute("aria-haspopup", "dialog");
    const footer = document.querySelector("[data-mnt-commercial-footer] .mt-footer-standard, [data-mnt-commercial-footer] .footer-standard, [data-mnt-commercial-footer]");
    (footer || document.body).append(button);
    return button;
  }

  function releaseConsentFocus(banner) {
    if (!banner.contains(document.activeElement)) return;

    const candidates = [
      ".mnt-contact-float",
      ".mt-quick-lead",
      "#mt-floating-dock .mt-floating-lead",
      "[data-consent-manage]",
      "main a[href='#formulario']"
    ];
    const target = candidates
      .map((selector) => document.querySelector(selector))
      .find((node) => node instanceof HTMLElement && node.getClientRects().length > 0);

    if (!target) return;

    const transferFocus = () => {
      target.focus({preventScroll: true});
    };

    transferFocus();
    window.requestAnimationFrame(() => {
      if (banner.contains(document.activeElement)) transferFocus();
    });
  }

  function initConsent() {
    if (window.MNTConsent) return; // V3 is the one source of truth on the canonical origin.
    const banner = ensureConsentBanner();
    const manage = ensureConsentManageControl();
    const syncOffset = () => {
      const open = !banner.hidden;
      const offset = open ? Math.ceil(banner.getBoundingClientRect().height + 28) : 14;
      document.documentElement.style.setProperty("--mt-consent-offset", `${offset}px`);
      manage.setAttribute("aria-expanded", String(open));
    };
    const showBanner = () => {
      banner.hidden = false;
      syncOffset();
      banner.querySelector("[data-consent-accept]")?.focus({preventScroll:true});
    };
    const hideBanner = () => {
      banner.hidden = true;
      syncOffset();
    };
    new MutationObserver(syncOffset).observe(banner, {attributes:true, attributeFilter:["hidden"]});
    if ("ResizeObserver" in window) new ResizeObserver(syncOffset).observe(banner);
    window.addEventListener("resize", syncOffset, {passive:true});
    if (!isLiveHost()) {
      banner.hidden = true;
      manage.hidden = true;
      syncOffset();
      return;
    }
    manage.hidden = false;
    if (window.MNTConsent) {
      banner.innerHTML = '<div><strong>Privacidade e cookies</strong><p>Cookies essenciais mantêm o site funcionando. Com sua autorização, usamos Google Analytics e Clarity para análise de navegação e Google Ads para medição e personalização de anúncios. Escolha ou altere suas preferências.</p></div><div class="mnt-runtime-consent-actions"><button type="button" data-v3-reject>Recusar todos</button><button type="button" data-v3-accept>Aceitar todos</button><button type="button" data-v3-custom>Personalizar preferências</button></div><div data-v3-options hidden><label><input type="checkbox" data-v3-analytics> Análise e desempenho</label><br><label><input type="checkbox" data-v3-marketing> Publicidade e marketing</label><br><button type="button" data-v3-save>Salvar preferências</button></div>';
      const q = (s) => banner.querySelector(s);
      const options = q("[data-v3-options]");
      const open = () => { const p=window.MNTConsent.get(); q("[data-v3-analytics]").checked=!!p?.analytics; q("[data-v3-marketing]").checked=!!p?.marketing; options.hidden=true; showBanner(); };
      const save = (a,m) => { if(window.MNTConsent.save(a,m)){hideBanner();releaseConsentFocus(banner);} };
      q("[data-v3-accept]").addEventListener("click",()=>save(true,true));
      q("[data-v3-reject]").addEventListener("click",()=>save(false,false));
      q("[data-v3-custom]").addEventListener("click",()=>{options.hidden=!options.hidden;syncOffset();});
      q("[data-v3-save]").addEventListener("click",()=>save(q("[data-v3-analytics]").checked,q("[data-v3-marketing]").checked));
      manage.textContent="Gerenciar cookies";
      manage.addEventListener("click",open);
      if(window.MNTConsent.get())hideBanner();else open();
      return;
    }
    const emitChoice = (choice) => {
      window.dataLayer = window.dataLayer || [];
      if (window.__mntGtmPilot) {
        window.dataLayer.push({event: choice === "granted" ? "mnt_pilot_analytics_accept" : "mnt_consent_reject"});
        document.dispatchEvent(new Event("mnt:consent-changed"));
      } else {
        window.dataLayer.push({event: choice === "granted" ? "mnt_consent_accept" : "mnt_consent_reject"});
      }
    };
    if (banner.dataset.consentBound !== "true") {
      banner.dataset.consentBound = "true";
      banner.querySelector("[data-consent-accept]")?.addEventListener("click", () => {
        try { window.localStorage.setItem(CONSENT_KEY, "granted"); } catch {}
        emitChoice("granted");
        hideBanner();
        releaseConsentFocus(banner);
      });
      banner.querySelector("[data-consent-reject]")?.addEventListener("click", () => {
        try { window.localStorage.setItem(CONSENT_KEY, "denied"); } catch {}
        emitChoice("denied");
        hideBanner();
        releaseConsentFocus(banner);
      });
    }
    if (manage.dataset.consentBound !== "true") {
      manage.dataset.consentBound = "true";
      manage.addEventListener("click", showBanner);
    }
    let saved = "";
    try {
      saved = window.localStorage.getItem(CONSENT_KEY) || "";
    } catch {
      saved = "";
    }
    if (saved === "granted" || saved === "denied") {
      hideBanner();
      emitChoice(saved);
      return;
    }
    showBanner();
  }

  function whatsappUrl(message = "") {
    const base = `https://wa.me/${CAPIITOLO_WHATSAPP}`;
    return message ? `${base}?text=${encodeURIComponent(message)}` : base;
  }

  function injectCapiitoloStyles() {
    if (document.querySelector("#mnt-capiitolo-runtime-style")) return;
    const style = document.createElement("style");
    style.id = "mnt-capiitolo-runtime-style";
    style.textContent = `
      .mnt-price-section{background:#0a0a09;color:#fff;padding:clamp(56px,7vw,82px) 0}
      .mnt-price-grid{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:clamp(28px,5vw,72px);align-items:end}
      .mnt-price-grid>*{min-width:0}
      .mnt-price-label{margin:0 0 12px;font-size:.68rem;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:#EBB92E}
      .mnt-price-amount,.mnt-price-value{font:400 clamp(2.35rem,4.4vw,4.8rem)/1 Georgia,serif;letter-spacing:-.04em;margin:0;overflow-wrap:anywhere}
      .mnt-price-reference{margin:0;font-size:clamp(1rem,1.55vw,1.3rem);line-height:1.45;font-weight:750;letter-spacing:-.01em;overflow-wrap:anywhere}
      .mnt-price-note{max-width:620px;color:#bdb8af;margin:18px 0 0;line-height:1.6}
      .mnt-map-card{overflow:hidden;margin-top:26px;border:1px solid rgba(10,10,9,.18);border-radius:20px;background:#fff}
      .mnt-map-visual{position:relative;height:310px;background:#ddd}
      .mnt-map-frame{display:block;width:100%;height:100%;border:0;pointer-events:none}
      .mnt-map-hit{position:absolute;inset:0;z-index:2;display:block;cursor:pointer}
      .mnt-map-hit:focus-visible{outline:4px solid #EBB92E;outline-offset:-4px}
      .mnt-map-actions{display:grid;gap:10px;padding:14px;background:#171813;color:#fff}
      .mnt-map-copy strong{display:block}.mnt-map-copy small{display:block;margin-top:3px;color:#aaa69b}
      .mnt-map-buttons{display:grid;grid-template-columns:1fr;gap:8px}
      .mnt-map-buttons a{display:flex;align-items:center;justify-content:center;min-height:48px;border-radius:999px;padding:0 16px;text-decoration:none;font-size:13px;font-weight:900;text-align:center}
      .mnt-map-whatsapp{background:#EBB92E;color:#171813}
      @media(min-width:620px){.mnt-map-actions{grid-template-columns:minmax(0,1fr) auto;align-items:center}.mnt-map-buttons{grid-template-columns:auto}}
      .mnt-whatsapp-float{position:fixed;right:18px;bottom:var(--mt-consent-offset,18px);z-index:60;width:56px;height:56px;display:flex;align-items:center;justify-content:center;border-radius:50%;background:#25d366;text-decoration:none;box-shadow:0 12px 34px rgba(0,0,0,.25)}
      .mnt-whatsapp-float img{width:32px;height:32px;object-fit:contain}
      .mnt-contact-float{position:fixed;right:86px;bottom:var(--mt-consent-offset,18px);z-index:60;min-height:56px;display:flex;align-items:center;justify-content:center;padding:0 18px;border-radius:999px;background:#EBB92E;color:#171813;text-decoration:none;font-size:.8rem;font-weight:850;line-height:1.15;box-shadow:0 12px 34px rgba(0,0,0,.22)}
      .mnt-location-link{font-weight:800;color:inherit;text-decoration:underline;text-underline-offset:3px}
      @media(max-width:900px){.mnt-price-grid{grid-template-columns:1fr;gap:28px}.mnt-map-visual{height:280px}.mnt-whatsapp-float{right:12px;width:54px;height:54px}.mnt-contact-float{left:12px;right:76px;min-height:54px}}
      @media(max-height:400px){.mnt-whatsapp-float,.mnt-contact-float{display:none}}
    `;
    document.head.append(style);
  }

  function initCapiitoloExperience() {
    if (document.documentElement.dataset.mntPageIdentity !== "capiitolo_piero_lissoni") return;

    injectCapiitoloStyles();
    const locationWhatsapp = whatsappUrl(LOCATION_MESSAGE);

    const pilot = document.querySelector(".pilot");
    if (pilot) pilot.textContent = "CAPIITOLO · Chácara Klabin";
    const locationImage = document.querySelector(".location > img");
    if (locationImage instanceof HTMLImageElement) {
      locationImage.src = "https://s3-gdigital.s3.amazonaws.com/gdigital/313/Chacara_Klabin.webp";
      locationImage.alt = "Chácara Klabin em São Paulo";
      locationImage.removeAttribute("srcset");
    }

    const locationCard = document.querySelector(".location-card");
    if (locationCard instanceof HTMLElement) {
      locationCard.innerHTML = `
        <p class="eyebrow">Apartamento na Chácara Klabin · localização</p>
        <h2 id="location-title">Viver na Chácara Klabin faz parte do projeto.</h2>
        <p>Veja o ponto do CAPIITOLO na Chácara Klabin. Para receber a localização e organizar a visita, solicite o atendimento pelo WhatsApp.</p>
        <div class="mnt-map-card">
          <div class="mnt-map-visual">
            <iframe class="mnt-map-frame" title="Mapa do CAPIITOLO na Chácara Klabin" loading="lazy" referrerpolicy="no-referrer-when-downgrade" tabindex="-1" aria-hidden="true" src="https://www.google.com/maps?q=Ch%C3%A1cara%20Klabin%2C%20S%C3%A3o%20Paulo%2C%20SP&z=15&output=embed"></iframe>
            <a class="mnt-map-hit" href="${locationWhatsapp}" target="_blank" rel="noopener" aria-label="Solicitar a localização do CAPIITOLO pelo WhatsApp"></a>
          </div>
          <div class="mnt-map-actions">
            <span class="mnt-map-copy"><strong>Localização do CAPIITOLO</strong><small>Clique no mapa ou use o botão para solicitar a localização e organizar a visita pelo WhatsApp.</small></span>
            <span class="mnt-map-buttons">
              <a class="mnt-map-whatsapp" href="${locationWhatsapp}" target="_blank" rel="noopener">Solicitar localização</a>
            </span>
          </div>
        </div>`;
    }

    const faqFirst = document.querySelector("#faq details:first-of-type p");
    if (faqFirst instanceof HTMLElement) {
      faqFirst.innerHTML = `O CAPIITOLO fica na Chácara Klabin, em São Paulo. <a class="mnt-location-link" href="${locationWhatsapp}" target="_blank" rel="noopener">Solicitar localização e agendar visita</a>.`;
    }

    if (!document.querySelector(".mnt-price-section")) {
      const media = document.querySelector(".media-row");
      if (media) {
        const section = document.createElement("section");
        section.className = "mnt-price-section";
        section.setAttribute("aria-labelledby", "mnt-price-title");
        section.innerHTML = `
          <div class="wrap mnt-price-grid">
            <div>
              <p class="mnt-price-label">A partir de</p>
              <h2 id="mnt-price-title" class="mnt-price-amount" data-commercial-value aria-live="polite">R$ 3.539.900</h2>
            </div>
            <div data-commercial-key="capiitolo">
              <p class="mnt-price-label">Referência comercial</p>
              <p class="mnt-price-reference">Ref. 210 m² · unidade 33 · Ago/26 · pagamento à vista</p>
              <p class="mnt-price-note">Unidade disponível na data de referência. Valor e condições podem mudar; confirme as condições vigentes antes da proposta.</p>
              <a class="btn yellow" href="#formulario">Receber condições <span>↓</span></a>
            </div>
          </div>`;
        media.before(section);
      }
    }

    if (!document.querySelector(".mnt-whatsapp-float")) {
      const badge = document.createElement("a");
      badge.className = "mnt-whatsapp-float";
      badge.href = whatsappUrl();
      badge.target = "_blank";
      badge.rel = "noopener";
      badge.setAttribute("aria-label", "Falar pelo WhatsApp sobre o CAPIITOLO");
      badge.innerHTML = `<img src="${WHATSAPP_ICON}" alt="" width="32" height="32" aria-hidden="true">`;
      document.body.append(badge);
    }

    if (!document.querySelector(".mnt-contact-float")) {
      const contact = document.createElement("a");
      contact.className = "mnt-contact-float";
      contact.href = "#formulario";
      contact.dataset.formIntent = "conditions";
      contact.textContent = "Receber condições";
      contact.setAttribute("aria-label", "Receber condições do CAPIITOLO");
      document.body.append(contact);
    }

    const filmLink = document.querySelector('.film-card a[href*="youtube.com/watch?v=iq50ei83B8U"]');
    if (filmLink instanceof HTMLAnchorElement) {
      filmLink.removeAttribute("target");
      filmLink.removeAttribute("rel");
      filmLink.innerHTML = "Assistir aqui <span>▶</span>";
      filmLink.addEventListener("click", (event) => {
        event.preventDefault();
        const card = filmLink.closest(".film-card");
        if (!(card instanceof HTMLElement) || card.querySelector("iframe[data-capiitolo-film]")) return;
        const poster = card.querySelector("img");
        const copy = card.querySelector(".media-copy");
        if (poster instanceof HTMLElement) poster.hidden = true;
        if (copy instanceof HTMLElement) copy.hidden = true;
        const frame = document.createElement("iframe");
        frame.dataset.capiitoloFilm = "true";
        frame.title = "Filme oficial CAPIITOLO by Piero Lissoni";
        frame.src = "https://www.youtube-nocookie.com/embed/iq50ei83B8U?autoplay=1&playsinline=1&rel=0&modestbranding=1";
        frame.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
        frame.allowFullscreen = true;
        frame.referrerPolicy = "strict-origin-when-cross-origin";
        Object.assign(frame.style, {position:"absolute",inset:"0",width:"100%",height:"100%",border:"0",zIndex:"4",background:"#000"});
        card.append(frame);
      }, {once:true});
    }
  }

  function initForm() {
    const form = document.querySelector(FORM_SELECTOR);
    if (!(form instanceof HTMLFormElement)) return;
    const country = form.querySelector("#mt-phone-country");
    const phone = form.querySelector("#mt-lead-phone");
    const contextNode = form.querySelector("[data-lead-context]");
    const honeypot = form.querySelector("#mt-company-website");
    const submit = form.querySelector("[data-moretegra-form-submit]");
    const submitLabel = form.querySelector("[data-submit-label]");
    const idleSubmitLabel = submitLabel?.textContent || "Receber condições";
    const error = form.querySelector("#mt-lead-error");
    const status = form.querySelector("#mt-lead-status");
    let sending = false;

    const syncCountry = () => {
      phone.placeholder = country.value === "BR" ? "(11) 99999-9999" : country.value === "OTHER" ? "+351 912 345 678" : "Telefone com código local";
      phone.autocomplete = country.value === "OTHER" ? "tel" : "tel-national";
    };
    country.addEventListener("change", syncCountry);
    phone.addEventListener("input", () => {
      const raw = String(phone.value || "").trim();
      if (raw.startsWith("+") || raw.startsWith("00")) {
        const full = raw.replace(/\D/g, "").slice(raw.startsWith("00") ? 2 : 0);
        const selected = RESF_PHONE_DATA[country.value];
        if (country.value !== "OTHER" && (!selected || !full.startsWith(selected[0]))) {
          const matches = Object.entries(RESF_PHONE_DATA).filter(([key, rec]) => /^[A-Z]{2}$/.test(key) && full.startsWith(rec[0]) && normalizeE164(raw,key));
          if (matches.length === 1) country.value = matches[0][0];
          else if (normalizeE164(raw,"OTHER")) country.value = "OTHER";
          syncCountry();
        }
        return;
      }
      if (country.value === "BR" && /^[\d\s().-]+$/.test(raw) && !raw.startsWith("0") && digits(raw).length <= 11) phone.value = formatBrazilPhone(raw);
    });

    const syncLeadContext = () => {
      if (!contextNode) return;
      const project = leadProjectContext(form);
      const noProject = project === "Página principal | Nenhum empreendimento selecionado";
      contextNode.hidden = !noProject;
      contextNode.textContent = noProject
        ? (formIdOf(form) === "47"
          ? "Nenhum empreendimento selecionado. A central de atendimento RJ ajuda você a comparar as opções."
          : "Nenhum empreendimento selecionado. Sabrina pode ajudar você a comparar as opções.")
        : "";
    };

    const applyFormIntent = (intentKey) => {
      const key = String(intentKey || "").trim();
      const value = FORM_INTENT_VALUES[key];
      const intent = form.elements["texto-livre"];
      if (!value || !(intent instanceof HTMLSelectElement)) return false;
      if (![...intent.options].some((option) => option.value === value)) return false;
      intent.value = value;
      return true;
    };

    document.addEventListener("click", (event) => {
      const element = event.target instanceof Element ? event.target : null;
      if (!element) return;

      const formIntentTarget = element.closest("[data-form-intent]");
      if (formIntentTarget) applyFormIntent(formIntentTarget.dataset.formIntent);

      const interestTarget = element.closest("[data-interest]");
      if (interestTarget) {
        const project = String(interestTarget.dataset.interest || "").trim();
        if (project) {
          form.dataset.selectedProject = project;
          document.documentElement.dataset.moretegraInterest = project;
        }
        window.setTimeout(syncLeadContext, 0);
        return;
      }

      const changeTarget = element.closest("[data-change-interest]");
      if (changeTarget) {
        delete form.dataset.selectedProject;
        document.documentElement.removeAttribute("data-moretegra-interest");
        window.setTimeout(syncLeadContext, 0);
      }
    }, true);

    form.addEventListener("focusin", syncLeadContext, {once:true});

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (sending) return;
      showMessage(error, "");
      showMessage(status, "");
      if (honeypot?.value) {
        showMessage(error, "Não foi possível enviar. Atualize a página e tente novamente.");
        return;
      }
      const result = validate(form, country);
      if (!result.valid) {
        showMessage(error, result.message);
        form.querySelector('[aria-invalid="true"]')?.focus();
        return;
      }
      if (!isLiveHost()) {
        showMessage(status, "Formulário validado. O envio real fica habilitado somente em www.moretegra.com.br após merge em main.");
        return;
      }

      sending = true;
      submit.disabled = true;
      submitLabel.textContent = "Enviando...";
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
      const payload = new FormData();
      payload.append("tenant_id", TENANT_ID);
      payload.append("form_id", formIdOf(form));
      payload.append("title", FORM_TITLE);
      payload.append("nome", result.name);
      payload.append("email", result.email);
      payload.append("telefone", result.phone);
      if (result.leadContext) payload.append("texto-livre", result.leadContext);

      try {
        const response = await fetch(FORM_ENDPOINT, {method:"POST",body:payload,mode:"cors",credentials:"omit",signal:controller.signal});
        if (!response.ok) throw new Error(`Green Form respondeu HTTP ${response.status}`);
        let body = {};
        try { body = await response.json(); } catch { body = {}; }
        setPendingLead(form);
        showMessage(status, "Solicitação recebida. Redirecionando...");
        const query = safeProviderQuery(body?.query_params || "");
        window.location.assign(`/obrigado/${query}`);
      } catch (cause) {
        const timedOut = cause?.name === "AbortError";
        showMessage(error, timedOut ? "O envio demorou além do esperado. Tente novamente." : "Não foi possível enviar agora. Verifique sua conexão e tente novamente.");
      } finally {
        window.clearTimeout(timeout);
        sending = false;
        submit.disabled = false;
        submitLabel.textContent = idleSubmitLabel;
      }
    });

    syncCountry();
    syncLeadContext();
  }

  function start() {
    initConsent();
    initCapiitoloExperience();
    initForm();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, {once:true});
  else start();
})();