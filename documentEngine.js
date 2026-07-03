const DOCUMENT_RENDERERS = {};

function registerDocumentRenderer(type, renderer) {
    DOCUMENT_RENDERERS[type] = renderer;
}

function renderDocument(document) {
    const renderer = DOCUMENT_RENDERERS[document.type];

    if (!renderer) {
        console.warn(`Aucun renderer pour le type "${document.type}"`);
        return "";
    }

    return renderer(document);
}

function renderDocuments(documents = []) {
    return documents
        .map(renderDocument)
        .join("");
}
