function ticketHtmlFromData(number, items, method, totalAmount, paidValue = 0, changeValue = 0) {
  const regularLines = [];
  const menuBlocks = [];

  (items || []).forEach((item, cartIndex) => {
    if (item.type === 'menu') {
      const children = (item.ticketChildren || []).map((child, childIndex) => ({
        order: childIndex,
        category: child.category || 'Plat',
        name: child.name,
        qty: child.qty || item.qty || 1,
        price: null,
        composition: child.composition || '',
        withChecks: true,
        cls: 'ticket-subline'
      })).sort(ticketItemCompare);

      menuBlocks.push({
        order: cartIndex,
        category: item.category || 'Plat',
        main: {
          order: cartIndex,
          category: item.category || 'Plat',
          name: item.name,
          qty: item.qty,
          price: item.qty * item.price,
          composition: '',
          withChecks: false,
          cls: 'ticket-main-line ticket-menu-line'
        },
        children
      });

      return;
    }

    regularLines.push({
      order: cartIndex,
      category: item.category || 'Plat',
      name: item.name,
      qty: item.qty,
      price: item.qty * item.price,
      composition: item.detail || '',
      withChecks: item.type !== 'advanced',
      cls: 'ticket-main-line'
    });
  });

  regularLines.sort(ticketItemCompare);
  menuBlocks.sort(ticketItemCompare);

  const lines = [
    ...regularLines.map(ticketLineBlock),
    ...menuBlocks.map(block => ticketLineBlock(block.main) + block.children.map(ticketLineBlock).join(''))
  ].join('');

  const cashDetails = method === 'Espèces'
    ? `<div class="ticket-bottom">Payé : ${fmt(paidValue)}</div><div class="ticket-bottom">À rendre : ${fmt(changeValue)}</div>`
    : '';

  return `
    <div class="ticket-title">Commande n° ${escapeHtml(number)}</div>
    ${lines}
    <div class="ticket-bottom">${escapeHtml(method || '')}</div>
    <div class="ticket-bottom">Total : ${fmt(totalAmount)}</div>
    ${cashDetails}
  `;
}

function moduleDocumentTicketsHtmlFromData(number, items, method = "") {
  const now = new Date();

  const context = {
    orderNumber: number,
    date: now.toLocaleDateString("fr-FR"),
    time: now.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit"
    }),
    paymentMethod: method
  };

  const documents = [];

  (items || []).forEach(item => {
    if (item.type !== "advanced") return;

    const saleModule = SALE_MODULES[item.moduleType];

    if (!saleModule || typeof saleModule.buildDocuments !== "function") return;

    documents.push(...(saleModule.buildDocuments(item, context) || []));
  });

  return renderPrintLayout(documents, {
    format: "a6",
    layoutMode: "sheetOptimized",
    usableHeightMm: 122,
    ticketGapMm: 7
  });
}
function getTicketLayoutMode() {
  return localStorage.getItem("ticket_layout_mode") || "onePerPage";
}