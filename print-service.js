// === SDS Print Service ===
async function getNextTicket() {
    if (!supabaseClient) return null;

    const { data, error } = await supabaseClient
        .from('sales')
        .select('*')
        .eq('printed', false)
        .or('printing.is.null,printing.eq.false')
        .order('created_at', { ascending: true })
        .limit(1);

    if (error) {
        console.error(error);
        return null;
    }

    if (!data || data.length === 0) return null;

    return data[0];
}

async function lockTicketForPrinting(sale) {
    if (!supabaseClient || !sale?.id) return false;

    const { data, error } = await supabaseClient
        .from('sales')
        .update({
            printing: true
        })
        .eq('id', sale.id)
        .eq('printed', false)
        .select('id');

    if (error) {
        console.error("Erreur lockTicketForPrinting", error);
        return false;
    }

    if (!data || data.length === 0) {
        console.warn("Ticket déjà imprimé :", sale.order_number);
        return false;
    }

    return true;
}
async function markTicketAsPrinted(sale) {
    if (!supabaseClient || !sale?.id) return;

    const { error } = await supabaseClient
        .from('sales')
        .update({
            printed: true,
            printed_at: new Date().toISOString()
        })
        .eq('id', sale.id);

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
        return JSON.parse(sale.sale_data);
    }

    return sale.sale_data || sale;
}

function formatMoney(value) {
    return `${Number(value || 0).toFixed(2)} €`;
}

function normalizeText(value) {
    return String(value || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

function checkMarks(qty) {
    const n = Number(qty || 1);

    if (n > 5) {
        return ".................";
    }

    return Array.from({ length: n }, () => "[ ]").join(" ");
}

function ticketLine(qty, name, price, withCheck = true) {
    const left = `${qty} x ${name}`;
    const middle = withCheck ? checkMarks(qty) : "";
    const right = formatMoney(price);

    return `${left} ${middle}`.padEnd(34, " ") + right;
}

function childLine(child) {
    const qty = child.qtyLabel || child.qty || 1;
    const withCheck = child.withCheck === false ? "" : " [ ]";

    return `    ${qty} x ${child.name}${withCheck}`;
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

    if (c.includes("boisson") && !c.includes("chaude")) return "BOISSONS";
    if (c.includes("entree")) return "ENTRÉES";
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

    const orderNumber = sale.order_number || saleData.orderNumber || "";
    const paymentMethod = sale.payment_method || saleData.paymentMethod || "";
    const total = Number(sale.total || saleData.total || 0);
    const paid = Number(saleData.paid || total || 0);
    const change = Number(saleData.change || 0);

    const categoryOrder = [
        "BOISSONS",
        "ENTRÉES",
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
    lines.push("--------------------------------");
    lines.push("");

    categoryOrder.forEach(category => {
        const items = groupedItems[category] || [];

        if (items.length === 0) return;

        lines.push(sectionTitle(category));
        lines.push("");

        items.forEach(item => {
            const qty = Number(item.qty || 1);
            const totalPrice = Number(item.price || 0) * qty;
            const isReturnDeposit = normalizeText(item.category).includes("retour consigne");

            lines.push(ticketLine(qty, item.name, totalPrice, !isReturnDeposit));

            if (item.selectedFoods && item.selectedFoods.length > 0) {
                lines.push(...selectedFoodLines(item.selectedFoods));
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

            lines.push(ticketLine(qty, item.name, totalPrice, false));

            (item.ticketChildren || []).forEach(child => {
                lines.push(childLine(child));

                if (child.selectedFoods && child.selectedFoods.length > 0) {
                    lines.push(...selectedFoodLines(child.selectedFoods, "        "));
                } else if (child.composition) {
                    lines.push(...compositionLines(child.composition));
                }
            });

            lines.push("");
        });
    }

    lines.push("--------------------------------");
    lines.push(`TOTAL À PAYER`.padEnd(28, " ") + formatMoney(total));
    lines.push(`TOTAL PAYÉ`.padEnd(28, " ") + formatMoney(paid));
    lines.push(`RENDU`.padEnd(28, " ") + formatMoney(change));
    lines.push("--------------------------------");
    lines.push("");

    return lines.join("\n");
}

function buildTicketHtmlFromSale(sale) {
    const saleData = getSaleData(sale);

    return ticketHtmlFromData(
        sale.order_number || saleData.orderNumber,
        saleData.items || [],
        sale.payment_method || saleData.paymentMethod || '',
        Number(sale.total || saleData.total || 0),
        Number(saleData.paid || 0),
        Number(saleData.change || 0)
    );
}

function previewTicket(sale) {

    const html = buildTicketHtmlFromSale(sale);

    document.getElementById("printArea").innerHTML = html;

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

        const content = ticketTextFromSale(sale);

        const response = await fetch("http://127.0.0.1:17890/print", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                printer: selectedPrinterName,
                content
            })
        });

        const data = await response.json();

        if (!response.ok || data.ok === false) {
            throw new Error(data.error || "Erreur d'impression");
        }

        showToast("🖨️ Ticket envoyé à l'impression");

        return true;

    } catch (e) {

        console.error("Erreur printTicket", e);

        showSettingsStatus(
            "Erreur impression : " + e.message,
            "error"
        );

        return false;
    }
}

async function processPrintQueue() {
    console.log("processPrintQueue lancé, poste =", getDeviceCode());
    if (getDeviceCode() !== 'A') return;

    if (!supabaseClient) return;

    const sale = await getNextTicket();

    if (!sale) {
        updateDashboardPrinter("🟢 Aucun ticket en attente");
        return;
    }

    const locked = await lockTicketForPrinting(sale);

    if (!locked) {
        updateDashboardPrinter("🟡 Ticket déjà pris");
        return;
    }

    updateDashboardPrinter(
        `🟡 Impression du ticket <strong>${sale.order_number}</strong>`
    );

    const printed = await printTicket(sale);

    if (!printed) {
        updateDashboardPrinter("🔴 Impression annulée");
        return;
    }

    await markTicketAsPrinted(sale);

    updateDashboardPrinter(
        `🟢 Ticket ${sale.order_number} envoyé à l'impression`
    );

}