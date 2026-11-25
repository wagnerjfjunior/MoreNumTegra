/* AGENTIC-WEB-V1-PILOT: optional WebMCP, data from the actual visible home catalogue. */
(() => {
  "use strict";
  const SIGNATURE = Symbol.for("mnt.agentic.home.v1");
  const selector = "[data-moretegra] [data-project-grid] .mt-project-card";
  const normalize = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim();
  const content = (card, query) => card.querySelector(query)?.textContent?.trim() || "";
  const priceValue = (value) => {
    const match = String(value || "").match(/R\$\s*([\d.]+)(?:,(\d{1,2}))?/);
    return match ? Number(match[1].replace(/\./g,"")) + Number((match[2] || "0").padEnd(2,"0")) / 100 : null;
  };
  const areas = (value) => [...String(value || "").matchAll(/(\d+(?:[.,]\d+)?)\s*m\s*(?:²|2)/gi)]
    .map((hit) => Number(hit[1].replace(",","."))).filter(Number.isFinite);
  function canonical(card) {
    const href = card.querySelector('a.mt-interest[href^="/empreendimentos/"]')?.getAttribute("href");
    if (!href) return null;
    try {
      const url = new URL(href, location.origin);
      return url.origin === location.origin && /^\/empreendimentos\/[a-z0-9-]+\/$/.test(url.pathname)
        ? url.pathname : null;
    } catch {return null;}
  }
  function catalogue() {
    const cards = [...document.querySelectorAll(selector)];
    if (!cards.length) return null;
    return Object.freeze(cards.map((card) => {
      const path = canonical(card);
      const locationLabel = content(card,".mt-project-location");
      const priceLabel = content(card,".mt-price-current") || content(card,".mt-price-block strong");
      const note = content(card,".mt-price-urgency") || content(card,".mt-price-block small");
      return Object.freeze({
        name: content(card,"h3"),
        slug: path ? path.split("/")[2] : null,
        canonical_url: path ? location.origin + path : null,
        city: card.dataset.city || "São Paulo",
        neighborhood: locationLabel.split("·")[0].trim() || null,
        region: card.dataset.zone || null,
        stage: card.dataset.status || null,
        stage_label: content(card,".mt-status") || null,
        description: content(card,".mt-project-info") || null,
        feature: content(card,".mt-feature") || null,
        published_price: priceValue(priceLabel),
        price_label: content(card,".mt-price-label") || null,
        price_kind: card.querySelector(".mt-price-promo") ? "promotional"
          : card.querySelector(".mt-price-cash") ? "cash" : "reference",
        price_reference: note.match(/\b([0-3]?\d\/[01]?\d\/20\d{2})\b/)?.[1] || null,
        price_note: note || null
      });
    }));
  }
  const output = (item) => JSON.stringify(item);
  const errorResult = (error) => output({ok:false,error:String(error)});
  const searchSchema = {type:"object",additionalProperties:false,properties:{
    query:{type:"string",maxLength:120,description:"Texto do nome, bairro ou características no card."},
    region:{type:"string",enum:["Zona Oeste","Zona Sul","Zona Leste"]},
    neighborhood:{type:"string",maxLength:80},
    stage:{type:"string",enum:["entregue","construcao","lancamento","consulta"]},
    min_area:{type:"number",minimum:0,maximum:2000},
    max_area:{type:"number",minimum:0,maximum:2000},
    min_price:{type:"number",minimum:0,maximum:100000000},
    max_price:{type:"number",minimum:0,maximum:100000000},
    limit:{type:"integer",minimum:1,maximum:40}
  }};
  const slugSchema = {type:"object",additionalProperties:false,
    properties:{slug:{type:"string",minLength:1,maxLength:100,pattern:"^[a-z0-9-]+$"}},required:["slug"]};
  const compareSchema = {type:"object",additionalProperties:false,
    properties:{slugs:{type:"array",items:{type:"string",pattern:"^[a-z0-9-]{1,100}$"},minItems:2,maxItems:4,uniqueItems:true}},required:["slugs"]};
  const emptySchema = {type:"object",additionalProperties:false,properties:{}};
  const allowedSearch = Object.keys(searchSchema.properties);
  let items = [];
  function checkObject(value, allowed) {
    if (!value || typeof value !== "object" || Array.isArray(value)) throw Error("Parâmetros inválidos.");
    if (Object.keys(value).some((key) => !allowed.includes(key))) throw Error("Parâmetros desconhecidos.");
    return value;
  }
  function checkSlug(slug) {
    if (typeof slug !== "string" || !/^[a-z0-9-]{1,100}$/.test(slug)) throw Error("Slug inválido.");
    return slug;
  }
  function search(params) {
    checkObject(params,allowedSearch);
    for (const name of ["query","neighborhood","region","stage"]) {
      if (params[name] !== undefined && (typeof params[name] !== "string" || params[name].length > (searchSchema.properties[name].maxLength || 30))) throw Error("Texto inválido: "+name);
    }
    for (const name of ["min_area","max_area","min_price","max_price"]) {
      if (params[name] !== undefined && (typeof params[name] !== "number" || !Number.isFinite(params[name]) || params[name] < 0 || params[name] > searchSchema.properties[name].maximum)) throw Error("Número inválido: "+name);
    }
    if (params.limit !== undefined && (!Number.isInteger(params.limit) || params.limit < 1 || params.limit > 40)) throw Error("Limite inválido.");
    if (params.region && !searchSchema.properties.region.enum.includes(params.region)) throw Error("Região inválida.");
    if (params.stage && !searchSchema.properties.stage.enum.includes(params.stage)) throw Error("Estágio inválido.");
    const minArea = params.min_area ?? 0, maxArea = params.max_area ?? 2000;
    const minPrice = params.min_price ?? 0, maxPrice = params.max_price ?? 100000000;
    if (minArea > maxArea || minPrice > maxPrice) throw Error("Intervalo invertido.");
    const matches = items.filter((item) => {
      if (params.region && params.region !== item.region) return false;
      if (params.stage && params.stage !== item.stage) return false;
      if (params.neighborhood && !normalize(item.neighborhood).includes(normalize(params.neighborhood))) return false;
      if (params.query && !normalize([item.name,item.neighborhood,item.description,item.feature].join(" ")).includes(normalize(params.query))) return false;
      if ((params.min_area !== undefined || params.max_area !== undefined) &&
        !areas(item.description).some((area) => area >= minArea && area <= maxArea)) return false;
      if ((params.min_price !== undefined || params.max_price !== undefined) &&
        (item.published_price === null || item.published_price < minPrice || item.published_price > maxPrice)) return false;
      return true;
    });
    const limit = params.limit || 40;
    return {ok:true,total:matches.length,returned:Math.min(matches.length,limit),results:matches.slice(0,limit)};
  }
  function details(slug) {
    checkSlug(slug);
    const list = items.filter((item) => item.slug === slug);
    if (!list.length) return null;
    const first = list[0];
    return {slug,canonical_url:first.canonical_url,city:first.city,region:first.region,
      neighborhood:first.neighborhood,stage:first.stage,
      variants:list.map(({name,stage_label,description,feature,published_price,price_label,price_kind,price_reference,price_note}) =>
        ({name,stage_label,description,feature,published_price,price_label,price_kind,price_reference,price_note}))};
  }
  function readonly(name,description,inputSchema,execute) {
    return {name,description,inputSchema,annotations:{readOnlyHint:true},
      execute: async (params) => {
        try {return output(execute(params || {}));}
        catch (err) {return errorResult(err.message);}
      }};
  }
  function start() {
    if (location.hostname !== "www.moretegra.com.br" || location.pathname !== "/") return;
    const context = document.modelContext;
    if (!context || typeof context.registerTool !== "function" || context[SIGNATURE]) return;
    const snapshot = catalogue();
    if (!snapshot) return;
    items = snapshot;
    try {context[SIGNATURE] = true;} catch { /* Optional experimental API. */ }
    const tools = [
      readonly("search_properties","Consulte o catálogo Tegra de São Paulo exibido na homepage; dados de preço não são oferta vigente.",searchSchema,search),
      readonly("get_property_details","Consulte detalhes públicos por slug canônico, inclusive variantes de unidade.",slugSchema,({slug}) => {
        const value = details(slug);return value ? {ok:true,property:value} : {ok:false,error:"Empreendimento não encontrado."};
      }),
      readonly("compare_properties","Compare de dois a quatro projetos, sem preencher informações ausentes.",compareSchema,({slugs}) => {
        if (!Array.isArray(slugs) || slugs.length < 2 || slugs.length > 4 || new Set(slugs).size !== slugs.length) throw Error("Informe 2 a 4 slugs distintos.");
        return {ok:true,comparison:slugs.map((slug) => details(slug) || {slug,error:"Não encontrado."})};
      }),
      readonly("get_property_location","Retorna apenas bairro e zona publicados, sem inventar endereço, distâncias ou coordenadas.",slugSchema,({slug}) => {
        const value = details(slug);return value ? {ok:true,city:value.city,region:value.region,neighborhood:value.neighborhood,canonical_url:value.canonical_url} : {ok:false,error:"Não encontrado."};
      }),
      readonly("get_property_price","Retorna valores publicados e ressalvas, sem afirmar vigência ou disponibilidade.",slugSchema,({slug}) => {
        const value = details(slug);return value ? {ok:true,canonical_url:value.canonical_url,prices:value.variants.map(({name,published_price,price_label,price_kind,price_reference,price_note}) =>
          ({name,published_price,price_label,price_kind,price_reference,price_note}))} : {ok:false,error:"Não encontrado."};
      }),
      {name:"request_visit",description:"Prepara a opção de visita no Form 46 para revisão e envio manual. Não agenda automaticamente.",inputSchema:emptySchema,
        annotations:{readOnlyHint:false,consequentialHint:false},execute:async (params) => {
          try {
            checkObject(params || {},[]);
            const form = document.querySelector('#moretegra-lead-form[data-form-id="46"]');
            if (!form) return errorResult("Formulário indisponível.");
            const intent = form.elements["texto-livre"];
            if (!intent || ![...intent.options].some((o) => o.value === "Agendar visita")) return errorResult("Opção indisponível.");
            intent.value = "Agendar visita";
            form.scrollIntoView({behavior:"smooth",block:"center"});
            form.querySelector('[name="nome"]')?.focus({preventScroll:true});
            return output({ok:true,status:"prepared_only",message:"Formulário preparado. Revisão e envio humano obrigatórios; nenhuma visita agendada."});
          } catch (err) {return errorResult(err.message);}
        }}
    ];
    for (const tool of tools) {
      try {Promise.resolve(context.registerTool(tool)).catch(() => {});}
      catch { /* Graceful degradation. */ }
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded",start,{once:true});
  else start();
})();
