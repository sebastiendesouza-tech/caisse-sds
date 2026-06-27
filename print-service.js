// === SDS Print Service ===
async function getNextTicket() {

    if (!supabaseClient) return null;

    const { data, error } = await supabaseClient
        .from('sales')
        .select('*')
        .eq('printed', false)
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

    const { error } = await supabaseClient
        .from('sales')
        .update({
            printing: true
        })
        .eq('id', sale.id)
        .eq('printing', false)
        .eq('printed', false);

    if (error) {
        console.error("Erreur lockTicketForPrinting", error);
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
function buildTicketHtmlFromSale(sale) {
    const saleData = sale.sale_data || sale;

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

    previewTicket(sale);

    const content = document.getElementById("printArea").innerText;

    await fetch("http://127.0.0.1:17890/print", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            printer: "EPSON_XP_2200_Series",
            content
        })
    });

    return true;

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

    // Pour l'instant on ne valide pas encore l'impression.
    await markTicketAsPrinted(sale);

    updateDashboardPrinter(
        `🟢 Ticket ${sale.order_number} envoyé à l'impression`
    );

}