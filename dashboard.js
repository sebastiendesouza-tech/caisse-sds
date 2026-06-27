// =====================================================
// SDS Dashboard Service
// =====================================================
let selectedPrinterName = "EPSON_XP_2200_Series";

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

    if (btnCashier) {
        btnCashier.onclick = showCashierView;
    }

    if (btnDashboard) {
        btnDashboard.onclick = showDashboardView;
    }
}

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

        <div id="dashboardStatus"></div>

        <hr>

        <div id="dashboardPrinterServer"></div>

        <hr>

        <div id="dashboardDevices"></div>
    </section>

    <section class="dashboard-card">
        <h2>Impression</h2>

        <div id="dashboardTickets"></div>

        <hr>

        <div id="dashboardPrinterStatus"></div>

        <hr>

        <div id="dashboardPrinterConfig"></div>
    </section>

</div>
`;

}

function updateDashboardStatus() {
    const el = document.getElementById("dashboardStatus");
    if (!el) return;

    el.innerHTML = `
        <strong>🖥 Poste central</strong><br>
        🟢 Supabase connecté
    `;
}

function updateDashboardPrinter(message) {
    const el = document.getElementById("dashboardPrinterStatus");

    if (!el) return;

    el.innerHTML = `
        <strong>🖨 Impression</strong><br>
        ${message}
    `;
}

function updateDashboardPrinterConfig() {

    const el = document.getElementById("dashboardPrinterConfig");

    if (!el) return;

    if (document.getElementById("printerSelect")) return;

    refreshPrinterList();

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

        alert(
            "Erreur d'impression : " + e.message
        );

    }

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
            selectedPrinterName = data.printers[0].name;
        }

        const options = data.printers
            .map(printer => {

                const selected =
                    printer.name === selectedPrinterName
                        ? "selected"
                        : "";

                return `
                    <option value="${printer.name}" ${selected}>
                        ${printer.name}
                    </option>
                `;

            })
            .join("");

        el.innerHTML = `
            <strong>🖨 Imprimante</strong><br><br>

            <select
                id="printerSelect"
                class="printer-select"
                onchange="selectedPrinterName=this.value">

                ${options}

            </select>

            <br><br>

            <button
                type="button"
                class="secondary"
                onclick="refreshPrinterList()">

                Actualiser

            </button>

            <button
                type="button"
                class="secondary"
                onclick="printTestPage()">

                Test impression

            </button>
        `;

    } catch (e) {

        el.innerHTML = `
            <strong>🖨 Imprimante</strong><br><br>

            🔴 Impossible de récupérer les imprimantes.

            <br><br>

            <button
                type="button"
                class="secondary"
                onclick="refreshPrinterList()">

                Réessayer

            </button>
        `;

    }

}

async function checkPrinterServer() {
    const panel = document.getElementById("dashboardPrinterServer");

    try {

        const response = await fetch("http://127.0.0.1:17890/health");
        const data = await response.json();

        panel.innerHTML = `
            <strong>🖨 SDS Printer</strong><br>
            🟢 Connecté<br>
            Version : ${data.version}
        `;

    } catch (e) {

        panel.innerHTML = `
            <strong>🖨 SDS Printer</strong><br>
            🔴 Hors ligne
        `;

    }
}

async function refreshCentralDashboard() {
    if (getDeviceCode() !== "A") return;

    updateDashboardStatus();
    await checkPrinterServer();
    checkPendingPrints();
    checkConnectedDevices();
    updateDashboardPrinterConfig();
}

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

    await checkConnectedDevices();

    showMessage(
        "Caisses inactives libérées",
        "Seules les caisses sans activité depuis plus de 2 minutes ont été libérées."
    );
}

async function checkPendingPrints() {
    if (!supabaseClient) return;

    const { data, error } = await supabaseClient
        .from('sales')
        .select('id, order_number, total, device_code')
        .eq('printed', false)
        .order('created_at', { ascending: true });

    if (error) {
        console.error(error);
        return;
    }

    const ticketList = data
        .map(sale => `${sale.order_number} — ${fmt(sale.total)} — Caisse ${sale.device_code || '?'}`)
        .join("<br>");

    const ticketsEl = document.getElementById("dashboardTickets");

    if (ticketsEl) {
        ticketsEl.innerHTML = `
            🧾 Tickets en attente : <strong>${data.length}</strong><br><br>
            ${ticketList || "Aucun ticket en attente"}
        `;
    }
}

async function checkConnectedDevices() {
    if (!supabaseClient) return;

    const { data, error } = await supabaseClient
        .from('devices')
        .select('device_code, device_name, device_status')
        .order('device_code');

    if (error) {
        console.error(error);
        return;
    }

    const devicesEl = document.getElementById("dashboardDevices");

    if (devicesEl) {
        devicesEl.innerHTML =
            "<strong>📱 Caisses</strong><br><br>" +
            data.map(device =>
                `${device.device_status === "busy" ? "🟢" : "⚪"} ${device.device_code} - ${device.device_name || "Libre"}`
            ).join("<br>") +
            `<br><br>
            <button type="button" class="secondary" onclick="releaseOtherDevices()">
                🔓 Libérer les autres caisses
            </button>`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    initDashboardViewSwitcher();
});