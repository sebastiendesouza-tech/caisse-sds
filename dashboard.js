// =====================================================
// SDS Dashboard Service
// =====================================================

// Initialisation

// Fonctions publiques
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
    <div id="dashboardStatus"></div>

    <hr>

    <div id="dashboardTickets"></div>

    <hr>

    <div id="dashboardDevices"></div>

    <hr>

    <div id="dashboardPrinter"></div>
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

    const el = document.getElementById("dashboardPrinter");

    if (!el) return;

    el.innerHTML = `
    <strong>🖨 Impression</strong><br>
    ${message}
  `;
}
function refreshCentralDashboard() {

    checkPendingPrints();

    checkConnectedDevices();

}
// Fonctions privées
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
            ).join("<br>");
    }
}
// Utilitaires