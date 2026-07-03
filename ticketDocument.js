registerDocumentRenderer("ticket", renderTicketDocument);

function renderTicketDocument(document) {
    const options = document.options || {};
    const values = document.values || {};

    const title =
        options.title && options.title.trim()
            ? options.title.trim()
            : document.title || "Ticket";

    const rows = [];

    if (options.showAssociation !== false && values.association) {
        rows.push(`<div class="module-ticket-association">${escapeHtml(values.association)}</div>`);
    }

    if (options.showEvent !== false && values.event) {
        rows.push(`<div class="module-ticket-event">${escapeHtml(values.event)}</div>`);
    }

    rows.push(`<div class="module-ticket-separator">--------------------------------</div>`);

    rows.push(`<div class="module-ticket-title">${escapeHtml(title)}</div>`);

    if (options.subtitle) {
        rows.push(`<div class="module-ticket-subtitle">${escapeHtml(options.subtitle)}</div>`);
    }

    rows.push(`<div class="module-ticket-separator">--------------------------------</div>`);

    if (options.showProductName !== false && values.productName) {
        rows.push(`<div class="module-ticket-line"><strong>Produit :</strong> ${escapeHtml(values.productName)}</div>`);
    }

    if (options.showOrderNumber !== false && values.orderNumber) {
        rows.push(`<div class="module-ticket-line"><strong>Commande :</strong> ${escapeHtml(values.orderNumber)}</div>`);
    }

    if (options.showDate !== false && values.date) {
        rows.push(`<div class="module-ticket-line"><strong>Date :</strong> ${escapeHtml(values.date)}</div>`);
    }

    if (options.showTime !== false && values.time) {
        rows.push(`<div class="module-ticket-line"><strong>Heure :</strong> ${escapeHtml(values.time)}</div>`);
    }

    if (options.showPrice === true) {
        rows.push(`<div class="module-ticket-line"><strong>Prix :</strong> ${fmt(values.price || 0)}</div>`);
    }

    if (options.showPaymentMethod === true && values.paymentMethod) {
        rows.push(`<div class="module-ticket-line"><strong>Paiement :</strong> ${escapeHtml(values.paymentMethod)}</div>`);
    }

    if (options.showUsedCheckbox !== false) {
        rows.push(`<div class="module-ticket-checkbox">☐ Utilisé</div>`);
    }

    if (options.footer) {
        rows.push(`<div class="module-ticket-footer">${escapeHtml(options.footer)}</div>`);
    }

    return `
  <div class="module-ticket">
    ${rows.join("")}
  </div>
`;
}