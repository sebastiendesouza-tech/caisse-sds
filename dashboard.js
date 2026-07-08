// =====================================================
// SDS Dashboard Service
// =====================================================

let selectedPrinterName = localStorage.getItem("sds_selected_printer") || "";

// -----------------------------------------------------
// Vues Caisse / En direct
// -----------------------------------------------------

function showCashierView() {
    const cashierView = document.getElementById("cashierView");
    const dashboardView = document.getElementById("dashboardView");

    if (cashierView) cashierView.style.display = "grid";
    if (dashboardView) dashboardView.style.display = "none";
}

function showDashboardView() {
    const cashierView = document.getElementById("cashierView");
    const dashboardView = document.getElementById("dashboardView");

    if (cashierView) cashierView.style.display = "none";
    if (dashboardView) dashboardView.style.display = "block";

    updateCentralDashboard();
    refreshCentralDashboard();
}

// -----------------------------------------------------
// Structure du tableau de bord
// -----------------------------------------------------

function updateCentralDashboard() {
    const panel = document.getElementById("centralDashboard");
    if (!panel) return;

    panel.style.display = "block";

    panel.innerHTML = `
        <div class="dashboard-header">
            <button id="btnDashboardBack" type="button" class="secondary">
                ← Retour à la caisse
            </button>
            <h1>📊 En direct</h1>
        </div>

        <div class="dashboard-grid">
            <section class="dashboard-card">
                <h2>Connexions</h2>
                <div id="dashboardConnections">Chargement...</div>
            </section>

            <section class="dashboard-card">
                <h2>Impression</h2>
                <div id="dashboardTickets">Chargement...</div>
                <div id="dashboardPrinterStatus"></div>
                <div id="dashboardPrinterConfig"></div>
            </section>

            <section class="dashboard-card">
                <h2>💰 Recettes</h2>
                <div id="dashboardSales">Chargement...</div>
            </section>

            <section class="dashboard-card">
                <h2>📈 Ventes</h2>
                <div id="dashboardStats">Chargement...</div>
            </section>
        </div>
    `;

    document.getElementById("btnDashboardBack")?.addEventListener("click", showCashierView);
}

// -----------------------------------------------------
// Rafraîchissement global
// -----------------------------------------------------

async function refreshCentralDashboard() {

    await checkPendingPrints();
    updateDashboardPrinterConfig();
    await refreshDashboardSales();
    await refreshDashboardStats();
}

// -----------------------------------------------------
// Connexions
// -----------------------------------------------------

async function renderLiveStatus() {
    const el = document.getElementById("liveStatusContent");
    if (!el) return;

    let printer = "🔴 Non connecté";
    let version = "";

    try {
        const response = await fetch("http://127.0.0.1:17890/health");
        const data = await response.json();

        printer = "🟢 Connecté";
        version = data.version ? ` (${data.version})` : "";
    } catch (e) {
    }

    let devicesHtml = "";

    if (supabaseClient) {
        const { data } = await supabaseClient
            .from("devices")
            .select("device_code, device_status")
            .order("device_code");

        if (data) {
            devicesHtml = data
                .map(d =>
                    `${d.device_status === "busy" ? "🟢" : "⚪"} ${d.device_code}`
                )
                .join(" &nbsp;&nbsp; ");
        }
    }

    const device = getDeviceConfig?.();

    let pendingTickets = 0;
    let ticketCount = 0;
    let cashTotal = 0;
    let cardTotal = 0;
    let totalSales = 0;
    let averageBasket = 0;
    let lastOrderNumber = "-";

    if (supabaseClient) {
        const { data: pendingData } = await supabaseClient
            .from("sales")
            .select("id")
            .eq("event_id", currentEventId)
            .eq("printed", false);

        if (pendingData) {
            pendingTickets = pendingData.length;
        }

        const { data: salesData } = await supabaseClient
            .from("sales")
            .select("order_number, total, cash_amount, card_amount, sale_data, cancelled")
            .eq("event_id", currentEventId)
            .order("created_at", { ascending: false });

        if (salesData) {
            salesData.forEach(sale => {
                if (sale.cancelled) return;

                ticketCount += 1;
                cashTotal += Number(sale.cash_amount ?? sale.sale_data?.cashAmount ?? 0);
                cardTotal += Number(sale.card_amount ?? sale.sale_data?.cardAmount ?? 0);
                totalSales += Number(sale.total || 0);

                if (lastOrderNumber === "-") {
                    lastOrderNumber = sale.order_number || "-";
                }
            });

            if (ticketCount > 0) {
                averageBasket = totalSales / ticketCount;
            }
        }
    }

    el.innerHTML = `
        <div class="live-columns">
            <div>
                <h3>Connexions</h3>

                <p>Supabase : <strong>${supabaseClient ? "🟢 Connecté" : "🔴 Non connecté"}</strong></p>

                <p>Caisse Printer : <strong>${printer}${version}</strong></p>

                <h3>Caisses</h3>

                <p>${devicesHtml || "Aucune caisse détectée"}</p>

                <h3>Impression</h3>

                <label>Mode d'impression</label>
                <select id="livePrintMode">
                    <option value="central" ${device?.printMode === "central" ? "selected" : ""}>
                        Centralisée
                    </option>
                    <option value="direct" ${device?.printMode === "direct" ? "selected" : ""}>
                        Directe
                    </option>
                    <option value="none" ${device?.printMode === "none" ? "selected" : ""}>
                        Aucune
                    </option>
                </select>

                <p>Tickets en attente : <strong>${pendingTickets}</strong></p>

                <label>Couleur ticket</label>
                <select id="liveTicketColor">
                    <option value="black" ${config.ticketColor === "black" ? "selected" : ""}>Noir</option>
                    <option value="blue" ${config.ticketColor === "blue" ? "selected" : ""}>Bleu</option>
                    <option value="red" ${config.ticketColor === "red" ? "selected" : ""}>Rouge</option>
                </select>

                <div id="livePrinterSettings"></div>
            </div>

            <div>
                <h3>Ventes</h3>

                <p>Tickets : <strong>${ticketCount}</strong></p>

                <p>Dernier ticket : <strong>${lastOrderNumber}</strong></p>

                <p>Panier moyen : <strong>${fmt(averageBasket)}</strong></p>

                <p>CB : <strong>${fmt(cardTotal)}</strong></p>

                <p>Espèces : <strong>${fmt(cashTotal)}</strong></p>

                <p>Total : <strong>${fmt(cardTotal + cashTotal)}</strong></p>
            </div>
        </div>
    `;

    document.getElementById("livePrintMode")?.addEventListener("change", e => {
        const cfg = getDeviceConfig();

        if (!cfg) return;

        cfg.printMode = e.currentTarget.value;

        saveDeviceConfig(cfg);

        showSettingsStatus("Mode d'impression enregistré.", "success");

        renderDeviceInfo();
    });

    document.getElementById("liveTicketColor")?.addEventListener("change", e => {
        const color = e.currentTarget.value;

        config.ticketColor = color;

        if (draftConfig) {
            draftConfig.ticketColor = color;
        }

        saveConfig();

        document.documentElement.style.setProperty("--ticket-color", color);

        showSettingsStatus("Couleur du ticket enregistrée.", "success");
    });

    refreshPrinterList("livePrinterSettings");
}

async function renderLiveStatus() {
    const el = document.getElementById("liveStatusContent");
    if (!el) return;

    let printer = "🔴 Non connecté";
    let version = "";

    try {
        const response = await fetch("http://127.0.0.1:17890/health");
        const data = await response.json();

        printer = "🟢 Connecté";
        version = data.version ? ` (${data.version})` : "";
    } catch (e) {
    }

    let devicesHtml = "";

    if (supabaseClient) {
        const { data } = await supabaseClient
            .from("devices")
            .select("device_code, device_status")
            .order("device_code");

        if (data) {
            devicesHtml = data
                .map(d =>
                    `${d.device_status === "busy" ? "🟢" : "⚪"} ${d.device_code}`
                )
                .join(" &nbsp;&nbsp; ");
        }
    }

    const device = getDeviceConfig?.();

    let pendingTickets = 0;
    let ticketCount = 0;
    let cashTotal = 0;
    let cardTotal = 0;
    let totalSales = 0;
    let averageBasket = 0;
    let lastOrderNumber = "-";

    if (supabaseClient) {
        const { data: pendingData } = await supabaseClient
            .from("sales")
            .select("id")
            .eq("event_id", currentEventId)
            .eq("printed", false);

        if (pendingData) {
            pendingTickets = pendingData.length;
        }

        const { data: salesData } = await supabaseClient
            .from("sales")
            .select("order_number, total, cash_amount, card_amount, sale_data, cancelled")
            .eq("event_id", currentEventId)
            .order("created_at", { ascending: false });

        if (salesData) {
            salesData.forEach(sale => {
                if (sale.cancelled) return;

                ticketCount += 1;
                cashTotal += Number(sale.cash_amount ?? sale.sale_data?.cashAmount ?? 0);
                cardTotal += Number(sale.card_amount ?? sale.sale_data?.cardAmount ?? 0);
                totalSales += Number(sale.total || 0);

                if (lastOrderNumber === "-") {
                    lastOrderNumber = sale.order_number || "-";
                }
            });

            if (ticketCount > 0) {
                averageBasket = totalSales / ticketCount;
            }
        }
    }

    el.innerHTML = `
        <div class="live-columns">
            <div>
                <h3>Connexions</h3>

                <p>Supabase : <strong>${supabaseClient ? "🟢 Connecté" : "🔴 Non connecté"}</strong></p>

                <p>Caisse Printer : <strong>${printer}${version}</strong></p>

                <h3>Caisses</h3>

                <p>${devicesHtml || "Aucune caisse détectée"}</p>

                <h3>Impression</h3>

                <label>Mode d'impression</label>
                <select id="livePrintMode">
                    <option value="central" ${device?.printMode === "central" ? "selected" : ""}>
                        Centralisée
                    </option>
                    <option value="direct" ${device?.printMode === "direct" ? "selected" : ""}>
                        Directe
                    </option>
                    <option value="none" ${device?.printMode === "none" ? "selected" : ""}>
                        Aucune
                    </option>
                </select>

                <p>Tickets en attente : <strong>${pendingTickets}</strong></p>

                <label>Couleur ticket</label>
                <select id="liveTicketColor">
                    <option value="black" ${config.ticketColor === "black" ? "selected" : ""}>Noir</option>
                    <option value="blue" ${config.ticketColor === "blue" ? "selected" : ""}>Bleu</option>
                    <option value="red" ${config.ticketColor === "red" ? "selected" : ""}>Rouge</option>
                </select>

                <div id="livePrinterSettings"></div>
            </div>

            <div>
                <h3>Ventes</h3>

                <p>Tickets : <strong>${ticketCount}</strong></p>

                <p>Dernier ticket : <strong>${lastOrderNumber}</strong></p>

                <p>Panier moyen : <strong>${fmt(averageBasket)}</strong></p>

                <p>CB : <strong>${fmt(cardTotal)}</strong></p>

                <p>Espèces : <strong>${fmt(cashTotal)}</strong></p>

                <p>Total : <strong>${fmt(cardTotal + cashTotal)}</strong></p>
            </div>
        </div>
    `;

    document.getElementById("livePrintMode")?.addEventListener("change", e => {
        const cfg = getDeviceConfig();

        if (!cfg) return;

        cfg.printMode = e.currentTarget.value;

        saveDeviceConfig(cfg);

        showSettingsStatus("Mode d'impression enregistré.", "success");

        renderDeviceInfo();
    });

    document.getElementById("liveTicketColor")?.addEventListener("change", e => {
        const color = e.currentTarget.value;

        config.ticketColor = color;

        if (draftConfig) {
            draftConfig.ticketColor = color;
        }

        saveConfig();

        document.documentElement.style.setProperty("--ticket-color", color);

        showSettingsStatus("Couleur du ticket enregistrée.", "success");
    });

    refreshPrinterList("livePrinterSettings");
}
// -----------------------------------------------------
// Impression
// -----------------------------------------------------

function updateDashboardPrinter(message) {
    const el = document.getElementById("dashboardPrinterStatus");
    if (!el) return;

    el.innerHTML = `
        <div class="dashboard-compact-line">
            <span>État</span>
            <strong>${message || "🟢 OK"}</strong>
        </div>
    `;
}

async function checkPendingPrints() {
    if (!supabaseClient) return;

    const { data, error } = await supabaseClient
        .from("sales")
        .select("id, order_number, total, device_code")
        .eq("printed", false)
        .order("created_at", { ascending: true });

    if (error) {
        console.error(error);
        return;
    }

    const ticketsEl = document.getElementById("dashboardTickets");
    if (!ticketsEl) return;

    const count = data ? data.length : 0;

    ticketsEl.innerHTML = `
        <div class="dashboard-compact-line">
            <span>Tickets à imprimer</span>
            <strong>🎟 ${count}</strong>
        </div>
    `;
}

function updateDashboardPrinterConfig() {
    const el = document.getElementById("dashboardPrinterConfig");
    if (!el) return;

    if (document.getElementById("printerSelect")) return;

    refreshPrinterList();
}

function setSelectedPrinter(name) {
    selectedPrinterName = name || "";
    localStorage.setItem("sds_selected_printer", selectedPrinterName);
}

function setDashboardPrintTicketsEnabled(checked) {
    config.printTicketsEnabled = checked !== false;
    saveConfig();
}

async function refreshPrinterList(containerId = "dashboardPrinterConfig") {
    const el = document.getElementById(containerId);
    if (!el) return;

    try {
        const response = await fetch("http://127.0.0.1:17890/printers");
        const data = await response.json();

        if (!data.ok) throw new Error(data.error);

        if (!selectedPrinterName && data.printers.length > 0) {
            setSelectedPrinter(data.printers[0].name);
        }

        const options = data.printers
            .map(printer => {
                const selected = printer.name === selectedPrinterName ? "selected" : "";
                return `<option value="${printer.name}" ${selected}>${printer.name}</option>`;
            })
            .join("");

        el.innerHTML = `
            <div class="dashboard-printer-block">
                <label>Imprimante</label>

                <select class="printer-select" data-printer-select>
                    ${options}
                </select>

                <label class="checkline">
                    <input
                        type="checkbox"
                        data-print-tickets-enabled
                        ${config.printTicketsEnabled !== false ? "checked" : ""}
                    >
                    Imprimer les tickets
                </label>

                <div class="dashboard-button-row">
                    <button type="button" class="secondary" onclick="refreshPrinterList('${containerId}')">
                        Actualiser
                    </button>

                    <button type="button" class="secondary" onclick="printTestPage()">
                        Test
                    </button>
                </div>
            </div>
        `;

        el.querySelector("[data-printer-select]")?.addEventListener("change", e => {
            setSelectedPrinter(e.currentTarget.value);
            showSettingsStatus(`Imprimante sélectionnée : ${selectedPrinterName}`, "success");
        });

        el.querySelector("[data-print-tickets-enabled]")?.addEventListener("change", e => {
            setDashboardPrintTicketsEnabled(e.currentTarget.checked);
        });

    } catch (e) {
        console.error("Erreur refreshPrinterList :", e);

        el.innerHTML = `
            <div class="dashboard-printer-block">
                <strong>🔴 Imprimantes indisponibles</strong><br>
                <small>${e.message}</small><br><br>

                <label class="checkline">
                    <input
                        type="checkbox"
                        data-print-tickets-enabled
                        ${config.printTicketsEnabled !== false ? "checked" : ""}
                    >
                    Imprimer les tickets
                </label>

                <button type="button" class="secondary" onclick="refreshPrinterList('${containerId}')">
                    Réessayer
                </button>
            </div>
        `;

        el.querySelector("[data-print-tickets-enabled]")?.addEventListener("change", e => {
            setDashboardPrintTicketsEnabled(e.currentTarget.checked);
        });
    }
}
async function printTestPage() {
    const printer =
        document.getElementById("printerSelect")?.value ||
        selectedPrinterName;

    if (!printer) {
        showSettingsStatus("Aucune imprimante sélectionnée.", "error");
        return;
    }

    try {
        console.log("Imprimante utilisée :", printer);
        const response = await fetch("http://127.0.0.1:17890/print-test", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ printer })
        });

        const data = await response.json();

        if (!data.ok) throw new Error(data.error);

        showSettingsStatus("Ticket de test envoyé.", "success");
    } catch (e) {
        console.error(e);
        showSettingsStatus("Erreur d'impression : " + e.message, "error");
    }
}

// -----------------------------------------------------
// Recettes
// -----------------------------------------------------

async function refreshDashboardSales() {
    const el = document.getElementById("dashboardSales");
    if (!el || !supabaseClient) return;

    const { data, error } = await supabaseClient
        .from("sales")
        .select("payment_method,total,cash_amount,card_amount,sale_data,cancelled")
        .eq("event_id", currentEventId);

    if (error) {
        console.error("Erreur refreshDashboardSales :", error);
        el.innerHTML = "🔴 Recettes indisponibles";
        return;
    }

    let cash = 0;
    let card = 0;
    let total = 0;

    (data || []).forEach(sale => {
        if (sale.cancelled) return;

        total += Number(sale.total || 0);

        cash += Number(
            sale.cash_amount ??
            sale.sale_data?.cashAmount ??
            0
        );

        card += Number(
            sale.card_amount ??
            sale.sale_data?.cardAmount ??
            0
        );
    });

    el.innerHTML = `
        <div class="dashboard-money-line">
            <span>💵 Espèces</span>
            <strong>${fmt(cash)}</strong>
        </div>

        <div class="dashboard-money-line">
            <span>💳 CB</span>
            <strong>${fmt(card)}</strong>
        </div>

        <div class="dashboard-money-total">
            <span>💰 Total</span>
            <strong>${fmt(total)}</strong>
        </div>

        <div class="dashboard-money-line">
            <span>🎟 Tickets</span>
            <strong>${(data || []).filter(s => !s.cancelled).length}</strong>
        </div>
    `;
}

// -----------------------------------------------------
// Ventes
// -----------------------------------------------------

async function refreshDashboardStats() {
    const el = document.getElementById("dashboardStats");
    if (!el || !supabaseClient) return;

    const { data, error } = await supabaseClient
        .from("sales")
        .select("order_number,total,created_at,cancelled")
        .eq("event_id", currentEventId)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Erreur refreshDashboardStats :", error);
        el.innerHTML = "🔴 Ventes indisponibles";
        return;
    }

    const sales = (data || []).filter(s => !s.cancelled);
    const count = sales.length;
    const total = sales.reduce((sum, sale) => sum + Number(sale.total || 0), 0);
    const average = count ? total / count : 0;
    const last = sales[0];

    el.innerHTML = `
        <div class="dashboard-compact-line">
            <span>Dernier ticket</span>
            <strong>${last?.order_number || "-"}</strong>
        </div>

        <div class="dashboard-compact-line">
            <span>Panier moyen</span>
            <strong>${fmt(average)}</strong>
        </div>

        <div class="dashboard-compact-line">
            <span>Ventes</span>
            <strong>${count}</strong>
        </div>
    `;
}

// -----------------------------------------------------
// Libération caisses
// -----------------------------------------------------

async function releaseOtherDevices() {
    if (getDeviceCode() !== 'A') {
        showSettingsStatus(
            "Cette fonction est réservée à la caisse centrale.",
            "warning"
        );
        return;
    }

    if (!confirm("Libérer uniquement les caisses inactives depuis plus de 2 minutes ?")) return;

    const limit = new Date(Date.now() - 2 * 60 * 1000).toISOString();

    const { error } = await supabaseClient
        .from("devices")
        .update({
            current_device: null,
            device_status: "free",
            last_seen: null,
            device_name: null
        })
        .neq("device_code", "A")
        .lt("last_seen", limit);

    if (error) {
        console.error(error);
        showMessage("Erreur", "Impossible de libérer les caisses inactives.");
        return;
    }

    await renderLiveStatus();

    showMessage(
        "Caisses inactives libérées",
        "Seules les caisses sans activité depuis plus de 2 minutes ont été libérées."
    );
}