// === SDS Print Service ===

async function getNextTicket() {
  if (!supabaseClient) return null;

  const { data, error } = await supabaseClient
    .from("sales")
    .select("*")
    .eq("printed", false)
    .or("printing.is.null,printing.eq.false")
    .order("created_at", { ascending: true })
    .limit(1);

  if (error) {
    console.error(error);
    return null;
  }

  return data && data.length ? data[0] : null;
}

async function lockTicketForPrinting(sale) {
  if (!supabaseClient || !sale?.id) return false;

  const { data, error } = await supabaseClient
    .from("sales")
    .update({ printing: true })
    .eq("id", sale.id)
    .eq("printed", false)
    .or("printing.is.null,printing.eq.false")
    .select("id");

  if (error) {
    console.error("Erreur lockTicketForPrinting", error);
    return false;
  }

  return Boolean(data && data.length);
}
async function markTicketAsPrinted(sale) {
  if (!supabaseClient || !sale?.id) return;

  const { error } = await supabaseClient
    .from("sales")
    .update({
      printed: true,
      printed_at: new Date().toISOString()
    })
    .eq("id", sale.id);

  if (error) {
    console.error("Erreur markTicketAsPrinted", error);
    updateDashboardPrinter("🔴 Erreur marquage ticket imprimé");
    return;
  }

  updateDashboardPrinter(
    `🟢 Ticket <strong>${sale.order_number}</strong> traité`
  );
}

function getSaleData(sale) {
  if (typeof sale.sale_data === "string") {
    try {
      return JSON.parse(sale.sale_data);
    } catch (error) {
      console.error("Erreur lecture sale_data", error);
      return sale;
    }
  }

  return sale.sale_data || sale;
}

function formatMoney(value) {
  return `${Number(value || 0).toFixed(2)}€`;
}

function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function ticketWidth(format = "thermal") {
  return format === "a6" ? 42 : 32;
}

function totalLine(label, amount, width = 32) {
  const right = formatMoney(amount);
  const leftWidth = Math.max(10, width - right.length);

  return label.padEnd(leftWidth, " ") + right;
}

function checkMarks(qty) {
  const n = Number(qty || 1);

  if (n <= 0) return "";

  // À partir de 6 produits, le serveur écrit
  // la quantité restante à la main.
  if (n > 5) {
    return ".................";
  }

  return Array.from({ length: n }, () => "[ ]").join(" ");
}

function ticketLine(
  qty,
  name,
  price,
  withCheck = true,
  width = 32,
  format = "thermal"
) {
  const right = formatMoney(price);
  const quantityText = `${qty} x `;
  const checks = withCheck ? checkMarks(qty) : "";

  const leftWidth = Math.max(10, width - right.length);

  // A6 : on conserve la présentation actuelle.
  if (format === "a6") {
    const checksInline = withCheck && checks ? ` ${checks}` : "";

    const left = `${quantityText}${name}${checksInline}`
      .substring(0, leftWidth)
      .padEnd(leftWidth, " ");

    return [left + right];
  }

  // Thermique : tentative sur une seule ligne.
  const inlineText = withCheck && checks
    ? `${quantityText}${name} ${checks}`
    : `${quantityText}${name}`;

  if (inlineText.length <= leftWidth) {
    return [
      inlineText.padEnd(leftWidth, " ") + right
    ];
  }

  // Si cela ne tient pas :
  // quantité + produit + prix sur la première ligne.
  const firstLineLeft = `${quantityText}${name}`
    .substring(0, leftWidth)
    .padEnd(leftWidth, " ");

  const lines = [
    firstLineLeft + right
  ];

  // Cases ou pointillés sur la ligne suivante.
  if (withCheck && checks) {
    lines.push(`    ${checks}`);
  }

  return lines;
}

function childLine(child) {
  const name = child.name || "";
  const withCheck = child.withCheck === false ? "" : " [ ]";

  return `    - ${name}${withCheck}`;
}

function selectedFoodLines(selectedFoods, indent = "    ") {
  if (!selectedFoods || selectedFoods.length === 0) return [];

  return selectedFoods.map(food => {
    return `${indent}- ${food.qty} x ${food.name}`;
  });
}

function compositionLines(composition) {
  if (!composition) return [];

  return composition
    .split("+")
    .map(part => part.trim())
    .filter(Boolean)
    .map(part => `        - ${part}`);
}

function categoryGroup(category) {
  const c = normalizeText(category);

  if (c.includes("boisson") && !c.includes("chaude")) {
    return "BOISSONS";
  }

  if (c.includes("entree")) return "ENTREES";
  if (c.includes("plat")) return "PLATS";
  if (c.includes("fromage")) return "FROMAGES";
  if (c.includes("dessert")) return "DESSERTS";
  if (c.includes("chaude")) return "BOISSONS CHAUDES";
  if (c.includes("consigne")) return "CONSIGNES";

  return "AUTRES";
}

function sectionTitle(title) {
  return `====== ${title} ======`;
}

function ticketTextFromSale(sale) {
  const saleData = getSaleData(sale);
  const lines = [];

  const format =
    config.printerProfile === "a6"
      ? "a6"
      : "thermal";

  const width = ticketWidth(format);

  const orderNumber =
    sale.order_number ||
    saleData.orderNumber ||
    "";

  const paymentMethod =
    sale.payment_method ||
    saleData.paymentMethod ||
    "";

  const total = Number(
    sale.total ||
    saleData.total ||
    0
  );

  const paid = Number(
    saleData.paid ||
    total ||
    0
  );

  const change = Number(
    saleData.change ||
    0
  );

  const categoryOrder = [
    "BOISSONS",
    "ENTREES",
    "PLATS",
    "FROMAGES",
    "DESSERTS",
    "BOISSONS CHAUDES",
    "CONSIGNES",
    "AUTRES"
  ];

  const groupedItems = {};
  const menuItems = [];

  categoryOrder.forEach(category => {
    groupedItems[category] = [];
  });

  (saleData.items || []).forEach(item => {
    if (item.type === "menu") {
      menuItems.push(item);
      return;
    }

    const group = categoryGroup(item.category);

    if (!groupedItems[group]) {
      groupedItems[group] = [];
    }

    groupedItems[group].push(item);
  });

  lines.push("SDS CAISSE");
  lines.push(`Commande ${orderNumber}`);
  lines.push(`Paiement : ${paymentMethod}`);
  lines.push("-".repeat(width));
  lines.push("");

  categoryOrder.forEach(category => {
    const items = groupedItems[category] || [];

    if (!items.length) return;

    lines.push(sectionTitle(category));
    lines.push("");

    items.forEach(item => {
      const qty = Number(item.qty || 1);
      const totalPrice = Number(item.price || 0) * qty;

      const isReturnDeposit = normalizeText(
        item.category
      ).includes("retour consigne");

      lines.push(
        ...ticketLine(
          qty,
          item.name || "",
          totalPrice,
          !isReturnDeposit,
          width,
          format
        )
      );

      if (
        item.selectedFoods &&
        item.selectedFoods.length > 0
      ) {
        lines.push(
          ...selectedFoodLines(item.selectedFoods)
        );
      }

      lines.push("");
    });
  });

  if (menuItems.length > 0) {
    lines.push(sectionTitle("MENUS"));
    lines.push("");

    menuItems.forEach(item => {
      const qty = Number(item.qty || 1);
      const totalPrice = Number(item.price || 0) * qty;

      lines.push(
        ...ticketLine(
          qty,
          item.name || "",
          totalPrice,
          false,
          width,
          format
        )
      );

      (item.ticketChildren || []).forEach(child => {
        lines.push(childLine(child));

        if (
          child.selectedFoods &&
          child.selectedFoods.length > 0
        ) {
          lines.push(
            ...selectedFoodLines(
              child.selectedFoods,
              "        "
            )
          );
        } else if (child.composition) {
          lines.push(
            ...compositionLines(child.composition)
          );
        }
      });

      lines.push("");
    });
  }

  lines.push("-".repeat(width));
  lines.push(
    totalLine("TOTAL A PAYER", total, width)
  );
  lines.push(
    totalLine("TOTAL PAYE", paid, width)
  );

  if (
    normalizeText(paymentMethod) === "especes"
  ) {
    lines.push(
      totalLine("RENDU", change, width)
    );
  }

  lines.push("-".repeat(width));
  lines.push("");

  return lines.join("\n");
}

function buildTicketHtmlFromSale(sale) {
  const saleData = getSaleData(sale);

  return ticketHtmlFromData(
    sale.order_number || saleData.orderNumber,
    saleData.items || [],
    sale.payment_method || saleData.paymentMethod || "",
    Number(sale.total || saleData.total || 0),
    Number(saleData.paid || 0),
    Number(saleData.change || 0)
  );
}

function previewTicket(sale) {
  const html = buildTicketHtmlFromSale(sale);
  const printArea = document.getElementById("printArea");

  if (printArea) {
    printArea.innerHTML = html;
  }
}

/**
 * Transforme les documents de billetterie en blocs texte.
 *
 * La fonction retourne un tableau :
 *
 * [
 *   "contenu billet 1",
 *   "contenu billet 2"
 * ]
 *
 * Les marqueurs [[CUT]] sont ajoutés ensuite dans printTicket(),
 * uniquement entre les blocs.
 */
function moduleDocumentTicketBlocksFromSale(sale) {
  const saleData = getSaleData(sale);
  const items = saleData.items || [];
  const ticketBlocks = [];

  const orderNumber =
    sale.order_number ||
    saleData.orderNumber ||
    "";

  const method =
    sale.payment_method ||
    saleData.paymentMethod ||
    "";

  const now = new Date();

  const context = {
    orderNumber,
    date: now.toLocaleDateString("fr-FR"),
    time: now.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit"
    }),
    paymentMethod: method
  };

  items.forEach(item => {
    if (item.type !== "advanced") return;

    const saleModule =
      typeof SALE_MODULES !== "undefined"
        ? SALE_MODULES[item.moduleType]
        : null;

    if (
      !saleModule ||
      typeof saleModule.buildDocuments !== "function"
    ) {
      console.warn(
        "Module de billetterie introuvable :",
        item.moduleType
      );
      return;
    }

    const documents =
      saleModule.buildDocuments(item, context) || [];

    documents.forEach(doc => {
      const lines = [];

      lines.push("==============================");

      if (doc.title) {
        lines.push(String(doc.title));
      } else {
        lines.push("BILLET");
      }

      if (doc.subtitle) {
        lines.push(String(doc.subtitle));
      }

      lines.push(`Commande ${orderNumber}`);

      if (item.name) {
        lines.push(`Produit : ${item.name}`);
      }

      if (doc.description) {
        lines.push(String(doc.description));
      }

      if (doc.text) {
        lines.push(String(doc.text));
      }

      if (doc.content) {
        lines.push(String(doc.content));
      }

      lines.push(`Paiement : ${method}`);
      lines.push(`Date : ${context.date}`);
      lines.push(`Heure : ${context.time}`);
      lines.push("[ ] Utilise");
      lines.push("==============================");

      ticketBlocks.push(lines.join("\n"));
    });
  });

  return ticketBlocks;
}

/**
 * Compatibilité avec l'ancien nom de fonction.
 * Elle retourne tous les billets séparés par [[CUT]].
 */
function moduleDocumentTicketsTextFromSale(sale) {
  return moduleDocumentTicketBlocksFromSale(sale)
    .join("\n[[CUT]]\n");
}

async function printTicket(sale) {
  if (config.printTicketsEnabled === false) {
    return true;
  }

  if (mustPrintNothing()) {
    return true;
  }

  previewTicket(sale);

  if (mustPrintDirect()) {
    window.print();
    return true;
  }

  if (!selectedPrinterName) {
    showSettingsStatus(
      "Aucune imprimante sélectionnée.",
      "error"
    );
    return false;
  }

  try {
    const receiptContent =
      ticketTextFromSale(sale);

    const ticketBlocks =
      moduleDocumentTicketBlocksFromSale(sale);

    /*
     * Exemple avec deux billets :
     *
     * ticket de caisse
     * [[CUT]]
     * billet 1
     * [[CUT]]
     * billet 2
     *
     * Aucun [[CUT]] après billet 2.
     */
    const printBlocks = [
      receiptContent,
      ...ticketBlocks
    ].filter(block => {
      return String(block || "").trim() !== "";
    });

    const content = printBlocks.join(
      "\n[[CUT]]\n"
    );

    const response = await fetch(
      "http://127.0.0.1:17890/print",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          printer: selectedPrinterName,
          content,
          format:
            config.printerProfile === "a6"
              ? "a6"
              : "thermal"
        })
      }
    );

    const data = await response.json();

    if (!response.ok || data.ok === false) {
      throw new Error(
        data.error ||
        "Erreur d'impression"
      );
    }

    if (ticketBlocks.length > 0) {
      showToast(
        `🖨️ Ticket et ${ticketBlocks.length} billet(s) envoyés à l'impression`
      );
    } else {
      showToast(
        "🖨️ Ticket envoyé à l'impression"
      );
    }

    return true;
  } catch (error) {
    console.error(
      "Erreur printTicket",
      error
    );

    showSettingsStatus(
      "Erreur impression : " + error.message,
      "error"
    );

    return false;
  }
}

async function processPrintQueue() {
  console.log(
    "processPrintQueue lancé, poste =",
    getDeviceCode()
  );

  if (getDeviceCode() !== "A") return;
  if (!supabaseClient) return;

  const sale = await getNextTicket();

  if (!sale) {
    updateDashboardPrinter(
      "🟢 Aucun ticket en attente"
    );
    return;
  }

  const locked =
    await lockTicketForPrinting(sale);

  if (!locked) {
    updateDashboardPrinter(
      "🟡 Ticket déjà pris"
    );
    return;
  }

  updateDashboardPrinter(
    `🟡 Impression du ticket <strong>${sale.order_number}</strong>`
  );

  const printed =
    await printTicket(sale);

  if (!printed) {
    updateDashboardPrinter(
      "🔴 Impression annulée"
    );
    return;
  }

  await markTicketAsPrinted(sale);

  updateDashboardPrinter(
    `🟢 Ticket ${sale.order_number} envoyé à l'impression`
  );
}