function getPrintLayoutSettings(options = {}) {
  return {
    format: options.format || "a6",
    layoutMode: options.layoutMode || "onePerPage",
    usableHeightMm: Number(options.usableHeightMm || options.pageHeight || 118),
    ticketGapMm: Number(options.ticketGapMm || 5)
  };
}

function mmToPx(mm) {
  const el = document.createElement("div");
  el.style.position = "absolute";
  el.style.left = "-10000px";
  el.style.top = "0";
  el.style.height = `${mm}mm`;
  document.body.appendChild(el);

  const px = el.getBoundingClientRect().height;
  el.remove();

  return px;
}

function measureDocumentHeight(ticketDocument) {
  let area = document.getElementById("layoutMeasureArea");

  if (!area) {
    area = document.createElement("div");
    area.id = "layoutMeasureArea";
    document.body.appendChild(area);
  }

  area.innerHTML = `
    <div class="sheet-ticket">
      <div class="sheet-ticket-content">
        ${renderDocument(ticketDocument)}
      </div>
    </div>
  `;

  const el = area.firstElementChild;
  return Math.ceil(el.getBoundingClientRect().height);
}

function paginateDocuments(documents = [], options = {}) {
  const settings = getPrintLayoutSettings(options);
  const pageHeightPx = mmToPx(settings.usableHeightMm);
  const gapPx = mmToPx(settings.ticketGapMm);

  const pages = [];
  let page = {
    documents: [],
    usedHeight: 0
  };

  documents.forEach(ticketDocument => {
    const ticketHeight = measureDocumentHeight(ticketDocument);
    const requiredHeight = page.documents.length > 0
      ? gapPx + ticketHeight
      : ticketHeight;

    if (
      page.documents.length > 0 &&
      page.usedHeight + requiredHeight > pageHeightPx
    ) {
      pages.push(page);
      page = {
        documents: [],
        usedHeight: 0
      };
    }

    if (page.documents.length > 0) {
      page.usedHeight += gapPx;
    }

    page.documents.push({
      document: ticketDocument,
      height: ticketHeight
    });

    page.usedHeight += ticketHeight;
  });

  if (page.documents.length) {
    pages.push(page);
  }

  return pages;
}

function renderPrintLayout(documents = [], options = {}) {
  const settings = getPrintLayoutSettings(options);

  if (settings.layoutMode === "roll") {
    return renderRollLayout(documents, settings);
  }

  if (settings.layoutMode === "sheetOptimized") {
    return renderSheetOptimizedLayout(documents, settings);
  }

  return renderOnePerPageLayout(documents, settings);
}

function renderOnePerPageLayout(documents = [], settings = {}) {
  return documents
    .map(ticketDocument => `
      <section class="print-page print-page-${escapeHtml(settings.format || "a6")}">
        ${renderDocument(ticketDocument)}
      </section>
    `)
    .join("");
}

function renderRollLayout(documents = [], settings = {}) {
  return `
    <section class="print-roll print-roll-${escapeHtml(settings.format || "thermal80")}">
      ${documents.map(ticketDocument => `
        <div class="print-roll-ticket">
          ${renderDocument(ticketDocument)}
        </div>
      `).join("")}
    </section>
  `;
}

function renderSheetOptimizedLayout(documents = [], settings = {}) {
  const pages = paginateDocuments(documents, settings);

  return pages.map(page => `
    <section class="print-page sheet-page print-page-${escapeHtml(settings.format)}">
      ${page.documents.map(entry => `
        <div class="sheet-ticket">
          <div class="sheet-ticket-content">
            ${renderDocument(entry.document)}
          </div>
        </div>
      `).join("")}
    </section>
  `).join("");
}