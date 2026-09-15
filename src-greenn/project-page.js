(() => {
  "use strict";

  const projectId = document.body?.dataset.projectId;
  if (!projectId) return;

  const priceNode = document.querySelector("[data-commercial-price]");
  const labelNode = document.querySelector("[data-commercial-label]");
  const referenceNode = document.querySelector("[data-commercial-reference]");
  const disclaimerNode = document.querySelector("[data-commercial-disclaimer]");
  const inventoryNodes = document.querySelectorAll("[data-inventory-label]");
  const schemaNode = document.getElementById("mt-project-schema");

  const brl = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0
  });

  function failClosed(message) {
    if (labelNode) labelNode.textContent = "Condições comerciais";
    if (priceNode) priceNode.textContent = "Consulte valores atuais";
    if (referenceNode) referenceNode.textContent = "Disponibilidade, unidade e condição comercial precisam ser confirmadas no atendimento.";
    if (disclaimerNode) disclaimerNode.textContent = message || "Condição comercial não carregada.";
    inventoryNodes.forEach((node) => { node.textContent = "Consulte disponibilidade"; });
    document.querySelectorAll("[data-typology-status]").forEach((node) => {
      node.textContent = "Consultar";
      node.classList.remove("is-sold", "is-last");
    });
  }

  function upsertOffer(commercial) {
    if (!schemaNode?.textContent || !Number.isFinite(Number(commercial.price))) return;
    let schema;
    try {
      schema = JSON.parse(schemaNode.textContent);
    } catch {
      return;
    }

    const graph = Array.isArray(schema["@graph"]) ? schema["@graph"] : [];
    const canonical = "https://www.moretegra.com.br/empreendimentos/caminhos-da-lapa-elo-duo/";
    const withoutOffer = graph.filter((item) => item?.["@id"] !== `${canonical}#offer`);
    withoutOffer.push({
      "@type": "Offer",
      "@id": `${canonical}#offer`,
      "url": canonical,
      "priceCurrency": commercial.currency || "BRL",
      "price": String(commercial.price),
      "description": commercial.reference || "Condição comercial sujeita à confirmação.",
      "itemOffered": {"@id": `${canonical}#project`}
    });
    schema["@graph"] = withoutOffer;
    schemaNode.textContent = JSON.stringify(schema);
  }

  function syncTypologyAvailability(commercial) {
    const typologies = commercial?.typologyAvailability || {};
    document.querySelectorAll("[data-typology-status]").forEach((node) => {
      const key = String(node.dataset.typologyStatus || "");
      const state = typologies[key];
      node.classList.remove("is-sold", "is-last");
      if (state === "sold_out") {
        node.textContent = "Vendido";
        node.classList.add("is-sold");
      } else if (state === "last_units") {
        node.textContent = "Últimas unidades";
        node.classList.add("is-last");
      } else {
        node.textContent = "Consultar";
      }
    });
  }

  async function loadCommercialState() {
    try {
      const response = await fetch("/src-greenn/data/commercial-values.json", {cache: "no-store"});
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const payload = await response.json();
      const commercial = payload?.projects?.[projectId];
      if (!commercial || commercial.state !== "active_reference" || !Number.isFinite(Number(commercial.price))) {
        failClosed("Sem referência comercial vigente no arquivo governado.");
        return;
      }

      if (labelNode) labelNode.textContent = commercial.priceLabel || "A partir de";
      if (priceNode) priceNode.textContent = brl.format(Number(commercial.price));
      if (referenceNode) referenceNode.textContent = commercial.reference || "";
      if (disclaimerNode) disclaimerNode.textContent = commercial.disclaimer || "";
      inventoryNodes.forEach((node) => { node.textContent = commercial.inventoryLabel || "Consulte disponibilidade"; });
      syncTypologyAvailability(commercial);
      commercial.currency = payload.currency || "BRL";
      upsertOffer(commercial);
    } catch (error) {
      failClosed("Não foi possível carregar a referência comercial. Consulte as condições vigentes.");
      console.warn("MoreNumTegra commercial data unavailable", error);
    }
  }

  loadCommercialState();
})();
