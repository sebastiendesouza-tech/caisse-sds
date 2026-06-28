// =====================================================
// SDS Dashboard Service
// =====================================================

let selectedPrinterName = localStorage.getItem("sds_selected_printer") || "";

// -----------------------------------------------------
// Vues Caisse / Tableau de bord
// -----------------------------------------------------

function showCashierView() {
    const cashierView = document.getElementById("cashierView");
    const dashboardView = document.getElementById("dashboardView");
    const btnCashier = document.getElementById("btnCashierView");
    const btnDashboard = document.getElementById("btnDashboardView");

    if (cashierView) cashierView.style.display = "grid";
    if (dashboardView) dashboardView.style.display = "none";

    if (btnCashier) btnCashier.classList.add("active");
    if (btnDashboard) btnDashboard.classList.remove("active");
}

function showDashboardView() {
    if (getDeviceCode() !== "A") {
        showCashierView();
        return;
    }

    const cashierView = document.getElementById("cashierView");
    const dashboardView = document.getElementById("dashboardView");
    const btnCashier = document.getElementById("btnCashierView");
    const btnDashboard = document.getElementById("btnDashboardView");

    if (cashierView) cashierView.style.display = "none";
    if (dashboardView) dashboardView.style.display = "block";

    if (btnCashier) btnCashier.classList.remove("active");
    if (btnDashboard) btnDashboard.classList.add("active");

    updateCentralDashboard();
    refreshCentralDashboard();
}

function initDashboardViewSwitcher() {
    const btnCashier = document.getElementById("btnCashierView");
    const btnDashboard = document.getElementById("btnDashboardView");

    if (getDeviceCode() === "A") {
        if (btnCashier) btnCashier.style.display = "inline-block";
        if (btnDashboard) btnDashboard.style.display = "inline-block";
    } else {
        if (btnCashier) btnCashier.style.display = "none";
        if (btnDashboard) btnDashboard.style.display = "none";
        showCashierView();
    }

    if (btnCashier) btnCashier.onclick = showCashierView;
    if (btnDashboard) btnDashboard.onclick = showDashboardView;
}

// -----------------------------------------------------
// Structure du tableau de bord
// -----------------------------------------------------

function updateCentralDashboard() {
    const panel = document.getElementById("centralDashboard");

    if (!panel) return;

    if (getDeviceCode() !== "A") {
        panel.style.display = "none";
        panel.innerHTML = "";
        return;
    }

    panel.style.display = "block";

    panel.innerHTML = `
        <div class="dashboard-grid">

            <section class="dashboard-card">
                <h2>Connexions</h2>
                <div id="dashboardConnections"></div>
            </section>

            <section class="dashboard-card">
                <h2>Impression</h2>
                <div id="dashboardTickets"></div>
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
}

// -----------------------------------------------------
// Rafraîchissement global
// -----------------------------------------------------

async function refreshCentralDashboard() {
    if (getDeviceCode() !== "A") return;

    await refreshDashboardConnections();
    await checkPendingPrints();
    updateDashboardPrinterConfig();
    await refreshDashboardSales();
    await refreshDashboardStats();
}

// -----------------------------------------------------
// Connexions
// -----------------------------------------------------

async function refreshDashboardConnections() {
    const el = document.getElementById("dashboardConnections");
    if (!el) return;

    let printerText = "🔴 SDS Printer";
    let versionText = "";

    try {
        const response = await fetch("http://127.0.0.1:17890/health");
        const data = await response.json();

        printerText = "🟢 SDS Printer";
        versionText = data.version ? `v${data.version}` : "";
    } catch (e) {
        printerText = "🔴 SDS Printer";
        versionText = "";
    }

    let devicesHtml = "Aucune caisse";

    if (supabaseClient) {
        const { data, error } = await supabaseClient
            .from("devices")
            .select("device_code, device_status")
            .order("device_code");

        if (!error && data) {
            devicesHtml = data
                .map(device => {
                    const icon = device.device_status === "busy" ? "🟢" : "⚪";
                    return `${icon} ${device.device_code}`;
                })
                .join(" &nbsp; ");
        }
    }

    el.innerHTML = `
        <div class="dashboard-compact-line">
            <span>Supabase</span>
            <strong>🟢 Connecté</strong>
        </div>

        <div class="dashboard-compact-line">
            <span>${printerText}</span>
            <strong>${versionText}</strong>
        </div>

        <div class="dashboard-compact-block">
            <span>Caisses</span>
            <strong>${devicesHtml}</strong>
        </div>

        <button type="button" class="secondary dashboard-small-button" onclick="releaseOtherDevices()">
            🔓 Libérer caisses inactives
        </button>
    `;
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
            <span>Tickets</span>
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

async function refreshPrinterList() {
    const el = document.getElementById("dashboardPrinterConfig");

    if (!el) return;

    try {
        const response = await fetch("http://127.0.0.1:17890/printers");
        const data = await response.json();

        if (!data.ok) {
            throw new Error(data.error);
        }

        if (!selectedPrinterName && data.printers.length > 0) {
            setSelectedPrinter(data.printers[0].name);
        }

        const options = data.printers
            .map(printer => {
                const selected = printer.name === selectedPrinterName ? "selected" : "";

                return `
                    <option value="${printer.name}" ${selected}>
                        ${printer.name}
                    </option>
                `;
            })
            .join("");

        el.innerHTML = `
            <div class="dashboard-printer-block">
                <label>Imprimante</label>

                <select id="printerSelect" class="printer-select">
                    ${options}
                </select>

                <label class="checkline">
                    <input
                        type="checkbox"
                        id="dashboardPrintTicketsEnabled"
                        ${config.printTicketsEnabled !== false ? "checked" : ""}
                    >
                    Imprimer les tickets
                </label>

                <div class="dashboard-button-row">
                    <button type="button" class="secondary" onclick="refreshPrinterList()">
                        Actualiser
                    </button>

                    <button type="button" class="secondary" onclick="printTestPage()">
                        Test
                    </button>
                </div>
            </div>
        `;

        const select = document.getElementById("printerSelect");

        if (select) {
            select.addEventListener("change", () => {
                setSelectedPrinter(select.value);
            });
        }

        const printTicketsCheckbox = document.getElementById("dashboardPrintTicketsEnabled");

        if (printTicketsCheckbox) {
            printTicketsCheckbox.addEventListener("change", () => {
                setDashboardPrintTicketsEnabled(printTicketsCheckbox.checked);
            });
        }

    } catch (e) {
        console.error("Erreur refreshPrinterList :", e);

        el.innerHTML = `
            <div class="dashboard-printer-block">
                <strong>🔴 Imprimantes indisponibles</strong><br>
                <small>${e.message}</small><br><br>

                <label class="checkline">
                    <input
                        type="checkbox"
                        id="dashboardPrintTicketsEnabled"
                        ${config.printTicketsEnabled !== false ? "checked" : ""}
                    >
                    Imprimer les tickets
                </label>

                <button type="button" class="secondary" onclick="refreshPrinterList()">
                    Réessayer
                </button>
            </div>
        `;

        const printTicketsCheckbox = document.getElementById("dashboardPrintTicketsEnabled");

        if (printTicketsCheckbox) {
            printTicketsCheckbox.addEventListener("change", () => {
                setDashboardPrintTicketsEnabled(printTicketsCheckbox.checked);
            });
        }
    }
}

async function printTestPage() {
    console.log("Bouton Test impression cliqué");

    const printer =
        document.getElementById("printerSelect")?.value ||
        selectedPrinterName;

    if (!printer) {
        alert("Aucune imprimante sélectionnée.");
        return;
    }

    try {
        const response = await fetch(
            "http://127.0.0.1:17890/print-test",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    printer
                })
            }
        );

        const data = await response.json();

        console.log("Réponse /print-test :", data);

        if (!data.ok) {
            throw new Error(data.error);
        }

        alert("Ticket de test envoyé.");

    } catch (e) {
        console.error(e);
        alert("Erreur d'impression : " + e.message);
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
        .select("payment_method,total")
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
        const amount = Number(sale.total || 0);
        total += amount;

        if (sale.payment_method === "CB") {
            card += amount;
        } else if (sale.payment_method === "Espèces") {
            cash += amount;
        }
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
            <strong>${(data || []).length}</strong>
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
        .select("order_number,total,created_at")
        .eq("event_id", currentEventId)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Erreur refreshDashboardStats :", error);
        el.innerHTML = "🔴 Ventes indisponibles";
        return;
    }

    const sales = data || [];
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
    if (getDeviceCode() !== "A") return;

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

    await refreshDashboardConnections();

    showMessage(
        "Caisses inactives libérées",
        "Seules les caisses sans activité depuis plus de 2 minutes ont été libérées."
    );
}

// -----------------------------------------------------
// Initialisation
// -----------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    initDashboardViewSwitcher();
});