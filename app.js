const PALETTE = {
  bleu: { label: 'Bleu', bg: '#dbeafe', fg: '#1e3a8a' },
  rouge: { label: 'Rouge', bg: '#fee2e2', fg: '#991b1b' },
  vert: { label: 'Vert', bg: '#dcfce7', fg: '#14532d' },
  orange: { label: 'Orange', bg: '#ffedd5', fg: '#9a3412' },
  jaune: { label: 'Jaune', bg: '#fef3c7', fg: '#78350f' },
  violet: { label: 'Violet', bg: '#ede9fe', fg: '#4c1d95' },
  rose: { label: 'Rose', bg: '#fce7f3', fg: '#831843' },
  cyan: { label: 'Cyan', bg: '#cffafe', fg: '#155e75' },
  gris: { label: 'Gris', bg: '#f3f4f6', fg: '#374151' },
  noir: { label: 'Noir', bg: '#111827', fg: '#ffffff' }
};

const DEFAULT_CONFIG = {
  configVersion: 2026.11,
  eventName: 'Comité des Fêtes-Moroges',
  orderPrefix: 'A',
  ticketColor: 'black',
  volunteers: [
    { id: 'vol-daudey', name: 'Daudey', active: true },
    { id: 'vol-de-souza', name: 'De Souza', active: true },
    { id: 'vol-dufour', name: 'Dufour', active: true },
    { id: 'vol-griveaux', name: 'Griveaux', active: true },
    { id: 'vol-lessaque', name: 'Lessaque', active: true },
    { id: 'vol-lonjarret', name: 'Lonjarret', active: true },
    { id: 'vol-millot', name: 'Millot', active: true },
    { id: 'vol-renaud', name: 'Renaud', active: true },
    { id: 'vol-venot', name: 'Venot', active: true }
  ],
  categoryColors: {
    'Boissons sans alcool': 'bleu',
    'Boissons avec alcool': 'orange',
    'Boissons chaudes': 'jaune',
    'Boissons': 'bleu',
    'Entrée': 'vert',
    'Plat': 'vert',
    'Fromage': 'violet',
    'Dessert': 'rose',
    'Consigne': 'violet',
    'Retour consigne': 'gris'
  },
  baseFoods: [
    { id: 'food-saucisse', name: 'Saucisse', category: 'Viande', stock: '' },
    { id: 'food-merguez', name: 'Merguez', category: 'Viande', stock: '' },
    { id: 'food-frites', name: 'Frites', category: 'Accompagnement', stock: '' }
  ],
  products: [
    { id: 'p-eau-50', group: 'Boissons', category: 'Boissons sans alcool', name: 'Eau minérale 50 cl', price: 0.50, type: 'simple', components: [], refundable: true, stock: '' },
    { id: 'p-eau-150', group: 'Boissons', category: 'Boissons sans alcool', name: 'Eau minérale 1,5 L', price: 1.50, type: 'simple', components: [], refundable: true, stock: '' },
    { id: 'p-coca', group: 'Boissons', category: 'Boissons sans alcool', name: 'Coca', price: 2, type: 'simple', components: [], refundable: true, stock: '' },
    { id: 'p-oasis', group: 'Boissons', category: 'Boissons sans alcool', name: 'Oasis', price: 2, type: 'simple', components: [], refundable: true, stock: '' },
    { id: 'p-ice-tea', group: 'Boissons', category: 'Boissons sans alcool', name: 'Ice Tea', price: 2, type: 'simple', components: [], refundable: true, stock: '' },
    { id: 'p-biere-25', group: 'Boissons', category: 'Boissons avec alcool', name: 'Bière pression 25 cl', price: 2.50, type: 'simple', components: [], refundable: true, stock: '' },
    { id: 'p-pichet-biere', group: 'Boissons', category: 'Boissons avec alcool', name: 'Pichet bière', price: 10, type: 'simple', components: [], refundable: true, stock: '' },
    { id: 'p-verre-rose', group: 'Boissons', category: 'Boissons avec alcool', name: 'Verre rosé', price: 3, type: 'simple', components: [], refundable: true, stock: '' },
    { id: 'p-verre-blanc', group: 'Boissons', category: 'Boissons avec alcool', name: 'Verre blanc', price: 3, type: 'simple', components: [], refundable: true, stock: '' },
    { id: 'p-verre-rouge', group: 'Boissons', category: 'Boissons avec alcool', name: 'Verre rouge', price: 3, type: 'simple', components: [], refundable: true, stock: '' },
    { id: 'p-bouteille-blanc', group: 'Boissons', category: 'Boissons avec alcool', name: 'Bouteille blanc', price: 11, type: 'simple', components: [], refundable: true, stock: '' },
    { id: 'p-bouteille-rose', group: 'Boissons', category: 'Boissons avec alcool', name: 'Bouteille rosé', price: 11, type: 'simple', components: [], refundable: true, stock: '' },
    { id: 'p-bouteille-rouge', group: 'Boissons', category: 'Boissons avec alcool', name: 'Bouteille rouge', price: 11, type: 'simple', components: [], refundable: true, stock: '' },
    { id: 'p-cremant', group: 'Boissons', category: 'Boissons avec alcool', name: 'Bouteille crémant', price: 13, type: 'simple', components: [], refundable: true, stock: '' },
    { id: 'p-verre-cremant', group: 'Boissons', category: 'Boissons avec alcool', name: 'Verre de crémant', price: 3, type: 'simple', components: [], refundable: true, stock: '' },
    { id: 'p-cafe', group: 'Boissons', category: 'Boissons chaudes', name: 'Café', price: 1, type: 'simple', components: [], refundable: true, stock: '' },
    { id: 'p-boisson-libre', group: 'Boissons', category: 'Boissons sans alcool', name: '', price: 0, type: 'simple', components: [], refundable: true, stock: '' },

    { id: 'p-frites', group: 'Restauration', category: 'Plat', name: 'Barquette de frites', price: 2.50, type: 'simple', components: [], refundable: true, stock: '' },
    { id: 'p-assiette-gourmande', group: 'Restauration', category: 'Plat', name: 'Assiette gourmande', price: 7, type: 'compose', components: [], choices: [
      { category: 'Viande', min: 2, max: 2, clientChoice: true, options: [{ foodId: 'food-saucisse', supplement: 0 }, { foodId: 'food-merguez', supplement: 0 }] },
      { category: 'Accompagnement', min: 1, max: 1, clientChoice: false, options: [{ foodId: 'food-frites', supplement: 0 }] }
    ], refundable: true, stock: '' },
    { id: 'p-menu', group: 'Restauration', category: 'Plat', name: 'Menu', price: 10, type: 'menu', components: [], refundable: true, stock: '', menuSections: [
      { section: 'Boissons', clientChoice: true, max: 1, options: [
        { productId: 'p-eau-50', supplement: -0.50 },
        { productId: 'p-coca', supplement: 0 }, { productId: 'p-oasis', supplement: 0 }, { productId: 'p-ice-tea', supplement: 0 }, { productId: 'p-biere-25', supplement: 0 },
        { productId: 'p-verre-rose', supplement: 0.50 }, { productId: 'p-verre-blanc', supplement: 0.50 }, { productId: 'p-verre-rouge', supplement: 0.50 }
      ]},
      { section: 'Plat', clientChoice: false, max: 1, options: [{ productId: 'p-assiette-gourmande', supplement: 0 }] },
      { section: 'Dessert', clientChoice: true, max: 1, options: [{ productId: 'p-glace-vanille', supplement: 0 }] }
    ] },
    { id: 'p-glace-vanille', group: 'Restauration', category: 'Dessert', name: 'Glace vanille', price: 2, type: 'simple', components: [], refundable: true, stock: '' },
    { id: 'p-popcorn', group: 'Restauration', category: 'Dessert', name: 'Popcorn', price: 1, type: 'simple', components: [], refundable: true, stock: '' },
    { id: 'p-glace-eau', group: 'Restauration', category: 'Dessert', name: '', price: 0, type: 'simple', components: [], refundable: true, stock: '' },
    { id: 'p-restau-libre-1', group: 'Restauration', category: 'Plat', name: '', price: 0, type: 'simple', components: [], refundable: true, stock: '' },
    { id: 'p-restau-libre-2', group: 'Restauration', category: 'Dessert', name: '', price: 0, type: 'simple', components: [], refundable: true, stock: '' },

    { id: 'p-consigne', group: 'Consignes', category: 'Consigne', name: 'Consigne gobelet', price: 2, type: 'simple', components: [], refundable: true, stock: '' },
    { id: 'p-retour-consigne', group: 'Consignes', category: 'Retour consigne', name: 'Retour gobelet', price: -2, type: 'simple', components: [], refundable: false, stock: '' }
  ]
};

const GROUP_ORDER = ['Boissons', 'Restauration', 'Consignes'];
const CATEGORIES = ['Boissons sans alcool', 'Boissons avec alcool', 'Boissons chaudes', 'Boissons', 'Entrée', 'Plat', 'Fromage', 'Dessert', 'Consigne', 'Retour consigne'];
let storedConfig = JSON.parse(localStorage.getItem('caisse_config') || 'null');
let config = normalizeConfig((!storedConfig || Number(storedConfig.configVersion || 0) < 12) ? DEFAULT_CONFIG : storedConfig);
let draftConfig = null;
let cart = [];
let paymentMethod = 'Espèces';
let paidCents = 0;
let orderNumber = Number(localStorage.getItem('caisse_order_number') || '1');
let sales = JSON.parse(localStorage.getItem('caisse_sales') || '[]');
let reportArchive = JSON.parse(localStorage.getItem('caisse_report_archive') || 'null');
let reportResetAt = localStorage.getItem('caisse_report_reset_at') || '';
let lastTicketHtml = localStorage.getItem('caisse_last_ticket_html') || '';
let pendingChoiceProduct = null;

const fmt = n => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n || 0);
const total = () => cart.reduce((sum, item) => sum + item.price * item.qty, 0);
const paidAmount = () => paidCents / 100;
function uid(prefix) { return prefix + '-' + Math.random().toString(36).slice(2, 8); }
function saveConfig() { localStorage.setItem('caisse_config', JSON.stringify(config)); }
function saveSales() { localStorage.setItem('caisse_sales', JSON.stringify(sales)); }
function saveReportState() {
  if (reportArchive) localStorage.setItem('caisse_report_archive', JSON.stringify(reportArchive));
  else localStorage.removeItem('caisse_report_archive');
  if (reportResetAt) localStorage.setItem('caisse_report_reset_at', reportResetAt);
  else localStorage.removeItem('caisse_report_reset_at');
}
function saveOrderNumber() { localStorage.setItem('caisse_order_number', String(orderNumber)); }
function saveLastTicket() { localStorage.setItem('caisse_last_ticket_html', lastTicketHtml || ''); }
function clone(obj) { return JSON.parse(JSON.stringify(obj)); }
function showMessage(title, text) {
  const dlg = document.getElementById('messageDialog');
  if (!dlg) { window.alert((title ? title + '\n' : '') + (text || '')); return; }
  document.getElementById('messageTitle').textContent = title || 'Information';
  document.getElementById('messageText').textContent = text || '';
  document.getElementById('messageCancel').style.display = 'none';
  const ok = document.getElementById('messageOk');
  ok.textContent = 'OK';
  ok.onclick = () => dlg.close();
  dlg.showModal();
}
function showConfirm(title, text, onConfirm) {
  const dlg = document.getElementById('messageDialog');
  if (!dlg) { if (window.confirm((title ? title + '\n' : '') + (text || ''))) { if (typeof onConfirm === 'function') onConfirm(); } return; }
  document.getElementById('messageTitle').textContent = title || 'Confirmation';
  document.getElementById('messageText').textContent = text || '';
  const cancel = document.getElementById('messageCancel');
  const ok = document.getElementById('messageOk');
  cancel.style.display = '';
  cancel.textContent = 'Non';
  ok.textContent = 'Oui';
  cancel.onclick = () => dlg.close();
  ok.onclick = () => { dlg.close(); if (typeof onConfirm === 'function') onConfirm(); };
  dlg.showModal();
}
function clearCurrentCart() { cart = []; paidCents = 0; renderCart(); }

function compactChoiceOptions(choice) {
  if (!choice || !Array.isArray(choice.options)) return;
  const byFood = new Map();
  choice.options.forEach(opt => {
    if (!opt || !opt.foodId) return;
    const prev = byFood.get(opt.foodId);
    if (!prev) byFood.set(opt.foodId, { ...opt, supplement: Number(opt.supplement || 0) });
    else prev.supplement = Number(prev.supplement || 0) || Number(opt.supplement || 0);
  });
  choice.options = Array.from(byFood.values());
}
function compactAllChoices(c) {
  (c.products || []).forEach(p => {
    (p.choices || []).forEach(compactChoiceOptions);
    (p.menuSections || []).forEach(section => (section.options || []).forEach(opt => {
      if (opt.nestedChoices) opt.nestedChoices.forEach(compactChoiceOptions);
    }));
  });
}

function limitEmptyRestorationSlots(c) {
  if (!Array.isArray(c.products)) return;
  let emptyKept = 0;
  c.products = c.products.filter(p => {
    const isRest = (p.group || displayGroup(p.category)) === 'Restauration';
    const isEmpty = isRest && !String(p.name || '').trim();
    if (!isEmpty) return true;
    emptyKept += 1;
    return emptyKept <= 2;
  });
}

function normalizeConfig(c) {
  const base = clone(DEFAULT_CONFIG);
  if (!c) return base;
  const previousVersion = Number(c.configVersion || 0);
  if (Array.isArray(c.products) && c.products[0] && !c.products[0].id) {
    c.products = c.products.map((p, i) => ({ id: 'p' + (i + 1), group: displayGroup(p.category), category: p.category || 'Plat', name: p.name || '', price: Number(p.price || 0), type: 'simple', components: [], refundable: true, stock: '' }));
  }
  c.configVersion = 2026.12;
  c.eventName = base.eventName;
  c.orderPrefix ||= 'A';
  c.ticketColor ||= 'black';
  c.baseFoods ||= base.baseFoods;
  c.volunteers ||= base.volunteers;
  if (previousVersion < 18.17) {
    c.eventName = base.eventName;
    c.volunteers = clone(base.volunteers);
  }
  c.categoryColors ||= base.categoryColors;
  c.products ||= base.products;
  c.products.forEach((p, i) => { p.id ||= 'p' + (i + 1); p.group ||= displayGroup(p.category); p.type ||= 'simple'; p.components ||= []; p.choices ||= []; p.menuSections ||= []; p.refundable = p.refundable !== false; p.stock ??= ''; });
  // v18.14 : correction forcée des prix et des boissons du menu même si une ancienne configuration est déjà enregistrée sur l'iPad.
  const forcedPriceUpdates = { 'p-assiette-gourmande': 7, 'p-pichet-biere': 10, 'p-consigne': 2, 'p-retour-consigne': -2 };
  c.products.forEach(p => {
    if (Object.prototype.hasOwnProperty.call(forcedPriceUpdates, p.id)) p.price = forcedPriceUpdates[p.id];
  });
  if (!c.products.some(p => p.id === 'p-verre-cremant')) {
    const cafeIndex = c.products.findIndex(p => p.id === 'p-cafe');
    const item = { id: 'p-verre-cremant', group: 'Boissons', category: 'Boissons avec alcool', name: 'Verre de crémant', price: 3, type: 'simple', components: [], refundable: true, stock: '' };
    c.products.splice(cafeIndex >= 0 ? cafeIndex : c.products.length, 0, item);
  }
  // v2026.04 : configuration distribuable, tout le suivi stock est désactivé par défaut.
  if (previousVersion < 2026.05) {
    (c.products || []).forEach(p => { p.stock = ''; });
    (c.baseFoods || []).forEach(f => { f.stock = ''; });
  }
  // v2026.03 : Glace à l'eau supprimée mais le bouton reste disponible en emplacement libre.
  const glaceEau = c.products.find(p => p.id === 'p-glace-eau');
  if (glaceEau) { glaceEau.name = ''; glaceEau.price = 0; glaceEau.stock = ''; glaceEau.type = 'simple'; glaceEau.components = []; glaceEau.choices = []; glaceEau.menuSections = []; }

  const productOrder = ['p-eau-50','p-eau-150','p-coca','p-oasis','p-ice-tea','p-biere-25','p-pichet-biere','p-verre-rose','p-verre-blanc','p-verre-rouge','p-bouteille-blanc','p-bouteille-rose','p-bouteille-rouge','p-cremant','p-verre-cremant','p-boisson-libre','p-cafe','p-frites','p-assiette-gourmande','p-menu','p-glace-vanille','p-popcorn','p-glace-eau','p-restau-libre-1','p-restau-libre-2','p-consigne','p-retour-consigne'];
  if (previousVersion < 2026.03) {
    c.products.sort((a,b) => {
      const ia = productOrder.indexOf(a.id), ib = productOrder.indexOf(b.id);
      return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
    });
  }

  // v2026.12 : le menu garde les suppléments modifiés dans les paramètres.
  // Avant, cette étape réécrivait toujours les boissons du menu avec les prix par défaut,
  // donc un supplément changé puis enregistré revenait à l'ancien prix.
  const menu = c.products.find(p => p.id === 'p-menu');
  if (menu) {
    menu.menuSections ||= [];
    let drinks = menu.menuSections.find(sec => sec.section === 'Boissons');
    if (!drinks) { drinks = { section: 'Boissons', clientChoice: true, max: 1, options: [] }; menu.menuSections.unshift(drinks); }
    drinks.clientChoice = true;
    drinks.max = 1;
    const defaultDrinkOptions = [
      { productId: 'p-eau-50', supplement: -0.50 },
      { productId: 'p-coca', supplement: 0 },
      { productId: 'p-oasis', supplement: 0 },
      { productId: 'p-ice-tea', supplement: 0 },
      { productId: 'p-biere-25', supplement: 0 },
      { productId: 'p-verre-rose', supplement: 0.50 },
      { productId: 'p-verre-blanc', supplement: 0.50 },
      { productId: 'p-verre-rouge', supplement: 0.50 }
    ];
    const savedDrinkOptions = new Map((drinks.options || []).map(opt => [opt.productId, opt]));
    drinks.options = defaultDrinkOptions.map(def => {
      const saved = savedDrinkOptions.get(def.productId);
      return { productId: def.productId, supplement: Number(saved?.supplement ?? def.supplement ?? 0) };
    });
    let dessert = menu.menuSections.find(sec => sec.section === 'Dessert');
    if (dessert) dessert.options = (dessert.options || []).filter(o => o.productId !== 'p-glace-eau');
  }
  c.baseFoods.forEach(f => { f.id ||= uid('food'); f.category ||= 'Viande'; f.stock ??= ''; });
  c.volunteers.forEach(v => { v.id ||= uid('vol'); v.name ||= 'Bénévole'; v.active = v.active !== false; });
  compactAllChoices(c);
  limitEmptyRestorationSlots(c);
  return c;
}

function displayGroup(cat) {
  if (String(cat).startsWith('Boissons') || String(cat) === 'Boisson') return 'Boissons';
  if (String(cat).includes('Consigne') || String(cat).includes('consigne')) return 'Consignes';
  return 'Restauration';
}
function groupClass(group) { return 'group-' + slug(group); }
function slug(s) { return String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
function escapeHtml(str) { return String(str).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
function summarizeNames(names) {
  const counts = {};
  (names || []).filter(Boolean).forEach(n => counts[n] = (counts[n] || 0) + 1);
  return Object.entries(counts).map(([name, qty]) => `${qty > 1 ? qty + ' ' : ''}${name}`).join(' + ');
}
function options(arr, selected) { return arr.map(x => `<option ${x === selected ? 'selected' : ''}>${escapeHtml(x)}</option>`).join(''); }
function paletteOptions(selected) { return Object.entries(PALETTE).map(([k, v]) => `<option value="${k}" ${k === selected ? 'selected' : ''}>${v.label}</option>`).join(''); }

function colorFor(category) { return PALETTE[config.categoryColors?.[category]] || PALETTE.gris; }
function isTracked(v) { return v !== '' && v !== null && v !== undefined && !Number.isNaN(Number(v)); }
function stockAvailable(product) {
  if (product.price < 0) return true;
  if (product.type === 'simple' && isTracked(product.stock) && Number(product.stock) <= 0) return false;
  for (const id of product.components || []) {
    const p = config.products.find(x => x.id === id);
    const f = config.baseFoods.find(x => x.id === id);
    if (p && !stockAvailable(p)) return false;
    if (f && isTracked(f.stock) && Number(f.stock) <= 0) return false;
  }
  return true;
}

function ticketCategoryGroup(category) {
  const c = String(category || '').toLowerCase();
  if (c.includes('boisson')) return 'Boissons';
  if (c.includes('entrée')) return 'Entrée';
  if (c.includes('plat')) return 'Plat';
  if (c.includes('fromage')) return 'Fromage';
  if (c.includes('dessert')) return 'Dessert';
  if (c.includes('consigne')) return 'Consigne';
  return 'Plat';
}
const TICKET_SORT_ORDER = ['Boissons', 'Entrée', 'Plat', 'Fromage', 'Dessert', 'Consigne'];
function ticketSortIndex(category) {
  const group = ticketCategoryGroup(category);
  const idx = TICKET_SORT_ORDER.indexOf(group);
  return idx === -1 ? 99 : idx;
}

function renderProducts() {
  const eventTitle = document.getElementById('eventTitle');
  if (eventTitle) eventTitle.textContent = config.eventName || 'Comité des Fêtes';
  document.documentElement.style.setProperty('--ticket-color', config.ticketColor);
  const wrap = document.getElementById('categories');
  const meat = document.getElementById('meatStock');
  const groups = {};
  config.products.forEach(p => (groups[p.group || displayGroup(p.category)] ||= []).push(p));
  wrap.innerHTML = GROUP_ORDER.map(group => {
    const products = groups[group] || [];
    return `<div class="category ${groupClass(group)}"><h3>${group}</h3><div class="product-grid">${products.map(productButtonHtml).join('')}</div></div>`;
  }).join('');
  if (meat) meat.innerHTML = renderMeatStockBox();
  document.querySelectorAll('.product-btn:not(.empty-product):not(.out-stock)').forEach(btn => btn.addEventListener('click', () => addProduct(btn.dataset.id)));
}
function renderMeatStockBox() {
  const meats = (config.baseFoods || []).filter(f => String(f.category).toLowerCase() === 'viande' && isTracked(f.stock));
  if (!meats.length) return '';
  return `<div class="meat-stock-box"><h3>Stocks viandes</h3><div class="meat-stock-grid">${meats.map(f => {
    const value = Number(f.stock);
    const level = value < 10 ? 'low' : (value <= 30 ? 'medium' : 'ok');
    return `<div class="meat-stock-item ${level}"><span>${escapeHtml(f.name)}</span><strong>${value}</strong></div>`;
  }).join('')}</div></div>`;
}
function productButtonHtml(p) {
  const col = colorFor(p.category);
  const style = `background:${col.bg};color:${col.fg}`;
  if (!p.name) return `<button class="product-btn empty-product" style="${style}" disabled><strong>Libre</strong></button>`;
  const out = !stockAvailable(p);
  const stockLabel = isTracked(p.stock) ? `<em class="btn-stock">Stock ${Number(p.stock)}</em>` : '';
  const sub = `${fmt(p.price)}${out ? ' - rupture' : ''}`;
  return `<button class="product-btn ${out ? 'out-stock' : ''}" style="${style}" data-id="${p.id}" ${out ? 'disabled' : ''}><strong>${escapeHtml(p.name)}</strong><span>${sub}</span>${stockLabel}</button>`;
}
function addProduct(id) {
  const p = config.products.find(x => x.id === id);
  if (!p || !p.name) return;
  if (p.type === 'compose' && (p.choices || []).length) return openChoiceDialog(p);
  if (p.type === 'menu' && (p.menuSections || []).length) return openMenuDialog(p);
  addCartLine({ id: p.id, name: p.name, category: p.category, price: p.price, qty: 1, refundable: p.refundable, selectedFoods: [] });
}
function addCartLine(lineData) {
  const foodKey = (lineData.selectedFoods || []).map(x => `${x.foodId}:${x.qty || 1}`).sort().join(',');
  const key = lineData.id + '|' + foodKey + '|' + (lineData.detail || '') + '|' + lineData.price;
  const line = cart.find(i => i.key === key);
  if (line) line.qty += 1;
  else cart.push({ key, ...lineData });
  if (paymentMethod === 'CB') paidCents = Math.round(total() * 100);
  renderCart();
}
function renderCart() {
  document.getElementById('orderNumber').textContent = `n° ${config.orderPrefix}${String(orderNumber).padStart(4, '0')}`;
  const list = document.getElementById('cartLines');
  if (!cart.length) { list.className = 'cart-lines empty'; list.textContent = 'Aucun produit'; }
  else {
    list.className = 'cart-lines';
    list.innerHTML = cart.map((item, index) => ({ item, index })).reverse().map(({ item, index }) => `<div class="cart-line"><div><div class="cart-name">${escapeHtml(item.name)}</div>${item.detail ? `<div class="cart-detail">${escapeHtml(item.detail)}</div>` : ''}<div class="cart-unit">${fmt(item.price)} / unité</div></div><div class="qty-actions"><button data-action="minus" data-index="${index}">-</button><span class="qty-value">${item.qty}</span><button data-action="plus" data-index="${index}">+</button><button data-action="delete" data-index="${index}">x</button></div><div class="cart-total">${fmt(item.qty * item.price)}</div></div>`).join('');
  }
  document.querySelectorAll('[data-action]').forEach(btn => btn.addEventListener('click', updateLine));
  updatePayment();
}
function updateLine(e) {
  const index = Number(e.currentTarget.dataset.index);
  const action = e.currentTarget.dataset.action;
  if (action === 'plus') cart[index].qty += 1;
  if (action === 'minus') cart[index].qty -= 1;
  if (action === 'delete' || cart[index].qty <= 0) cart.splice(index, 1);
  if (paymentMethod === 'CB') paidCents = Math.round(total() * 100);
  renderCart();
}
function updatePayment() {
  document.getElementById('cartTotalBottom').textContent = fmt(total());
  document.getElementById('amountPaidDisplay').textContent = fmt(paidAmount());
  document.getElementById('changeDue').textContent = fmt(Math.max(0, paidAmount() - total()));
}
function pressKey(key) { if (key === 'clear') paidCents = 0; else if (key === 'back') paidCents = Math.floor(paidCents / 10); else if (key === '00') paidCents = Math.min(999999, paidCents * 100); else paidCents = Math.min(999999, paidCents * 10 + Number(key)); updatePayment(); }
function setQuickAmount(amount) { paidCents = Math.round(amount * 100); updatePayment(); }
function payAndPrint(method) {
  if (!cart.length) return showMessage('Commande vide', 'Ajoute au moins un produit avant de valider.');
  if (method === 'CB' && total() < 0) return showMessage('Rendu impossible en CB', 'Un remboursement ou un retour consigne se fait uniquement en espèces.');
  paymentMethod = method;
  if (total() <= 0) paidCents = 0;
  else if (method === 'CB') paidCents = Math.round(total() * 100);
  if (method === 'Espèces' && total() > 0 && paidAmount() < total()) return showMessage('Montant insuffisant', 'La somme payée est inférieure au total dû. Ajoute le montant reçu ou utilise Exact.');
  updatePayment();
  validateSale();
}

function consumeStock() {
  const consumeProduct = (id, qty) => {
    const p = config.products.find(x => x.id === id);
    if (!p) return;
    if (p.type === 'simple' && isTracked(p.stock)) p.stock = Math.max(0, Number(p.stock) - qty);
    (p.components || []).forEach(cid => {
      const childProduct = config.products.find(x => x.id === cid);
      const food = config.baseFoods.find(x => x.id === cid);
      if (childProduct) consumeProduct(childProduct.id, qty);
      if (food && isTracked(food.stock)) food.stock = Math.max(0, Number(food.stock) - qty);
    });
  };
  cart.forEach(i => { if (i.price >= 0) { consumeProduct(i.id, i.qty); (i.selectedProducts || []).forEach(pid => consumeProduct(pid, i.qty)); (i.selectedFoods || []).forEach(sel => { const food = config.baseFoods.find(f => f.id === sel.foodId); if (food && isTracked(food.stock)) food.stock = Math.max(0, Number(food.stock) - i.qty * Number(sel.qty || 1)); }); } });
  saveConfig();
}
function checkMarker(qty) {
  return qty > 5 ? '<span class="reste-label">Reste : ________</span>' : Array.from({ length: Math.max(0, qty) }, () => '☐').join(' ');
}
function ticketLineHtml(name, qty, price, cls = '', withChecks = true) {
  return `<div class="ticket-line ${cls}"><div>${qty || ''}</div><div class="ticket-product">${escapeHtml(name)}</div><div class="checks">${withChecks ? checkMarker(qty || 1) : ''}</div><div class="ticket-price">${price === null ? '' : fmt(price)}</div></div>`;
}
function ticketLineBlock(line) {
  let html = ticketLineHtml(line.name, line.qty, line.price, line.cls || '', line.withChecks);
  if (line.composition) html += `<div class="ticket-subline no-check"><div></div><div class="ticket-composition">(${escapeHtml(line.composition)})</div><div></div><div></div></div>`;
  return html;
}
function ticketItemCompare(a, b) {
  return ticketSortIndex(a.category) - ticketSortIndex(b.category) || a.order - b.order;
}
function buildTicket() {
  const number = `${config.orderPrefix}${String(orderNumber).padStart(4, '0')}`;
  const regularLines = [];
  const menuBlocks = [];
  cart.forEach((item, cartIndex) => {
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
      withChecks: true,
      cls: 'ticket-main-line'
    });
  });
  regularLines.sort(ticketItemCompare);
  menuBlocks.sort(ticketItemCompare);
  const lines = [
    ...regularLines.map(ticketLineBlock),
    ...menuBlocks.map(block => ticketLineBlock(block.main) + block.children.map(ticketLineBlock).join(''))
  ].join('');
  const html = `<div class="ticket-title">Commande n° ${number}</div>${lines}<div class="ticket-bottom">${paymentMethod}</div><div class="ticket-bottom">Total : ${fmt(total())}</div>`;
  document.getElementById('printArea').innerHTML = html;
  lastTicketHtml = html;
  saveLastTicket();
}
function reprintLastTicket() {
  if (!lastTicketHtml) { showMessage('Aucun ticket', 'Aucun dernier ticket à réimprimer.'); return; }
  document.getElementById('printArea').innerHTML = lastTicketHtml;
  window.print();
}
function validateSale(extra = {}) {
  const shouldPrint = total() > 0 && extra.print !== false;
  if (shouldPrint) buildTicket();
  const kind = extra.kind || 'sale';
  sales.push({ kind, orderNumber: `${config.orderPrefix}${String(orderNumber).padStart(4, '0')}`, date: new Date().toISOString(), paymentMethod: extra.paymentMethod || paymentMethod, paid: extra.paid ?? paidAmount(), change: extra.change ?? Math.max(0, paidAmount() - total()), total: total(), items: clone(cart), volunteerId: extra.volunteerId || '', volunteerName: extra.volunteerName || '', settled: extra.settled ?? true, refunds: [] });
  consumeStock();
  saveSales();
  if (shouldPrint) window.print();
  orderNumber += 1; saveOrderNumber(); cart = []; paidCents = 0; renderProducts(); renderCart();
}
function exportCsv() {
  const settingsDialog = document.getElementById('settingsDialog');
  if (settingsDialog && settingsDialog.open) settingsDialog.close();
  const rows = [['type','commande','date','paiement','benevole','regle','paye','rendu','produit','quantite','prix_unitaire','total_ligne','total_commande','motif']];
  sales.forEach(s => (s.items || []).forEach(i => rows.push([s.kind || 'sale', s.orderNumber, s.date, s.paymentMethod, s.volunteerName || '', s.settled === false ? 'non' : 'oui', s.paid || '', s.change || '', i.name, i.qty, i.price, i.qty * i.price, s.total, s.reason || ''])));
  const csv = rows.map(r => r.map(v => `"${String(v).replaceAll('"','""')}"`).join(';')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'ventes-caisse.csv'; a.click();
}


function renderChoiceControls(choice, foods, mode, prefix) {
  const required = Number(choice.max || 0);
  if (!choice.clientChoice) {
    const html = foods.map(({ opt, food }) => `<label class="choice-option"><input type="checkbox" data-${mode}-fixed="${prefix}" data-food-id="${food.id}" checked disabled> <span>${escapeHtml(food.name)}</span> ${opt.supplement ? `<strong>${opt.supplement > 0 ? '+' : ''}${fmt(opt.supplement)}</strong>` : ''}</label>`).join('');
    return `<div class="choice-options-grid">${html}</div>`;
  }
  if (required <= 1) {
    const html = foods.map(({ opt, food }, idx) => `<label class="choice-option"><input type="radio" name="${mode}-${prefix}" data-${mode}-single="${prefix}" data-food-id="${food.id}" ${idx === 0 ? 'checked' : ''}> <span>${escapeHtml(food.name)}</span> ${opt.supplement ? `<strong>${opt.supplement > 0 ? '+' : ''}${fmt(opt.supplement)}</strong>` : ''}</label>`).join('');
    return `<div class="choice-options-grid">${html}</div>`;
  }
  const group = `${mode}-${prefix}`;
  return `<div class="counter-choice choice-options-grid" data-required="${required}" data-counter-group="${group}">${foods.map(({ opt, food }) => {
    const inputId = `${group}-${food.id}`;
    return `<div class="counter-row"><span>${escapeHtml(food.name)} ${opt.supplement ? `<strong>${opt.supplement > 0 ? '+' : ''}${fmt(opt.supplement)}</strong>` : ''}</span><button type="button" data-count-delta="-1" data-counter-target="${inputId}" data-counter-group-ref="${group}">-</button><input readonly data-${mode}-count="${prefix}" data-counter-member="${group}" data-food-id="${food.id}" id="${inputId}" value="0"><button type="button" data-count-delta="1" data-counter-target="${inputId}" data-counter-group-ref="${group}">+</button></div>`;
  }).join('')}<div class="choice-total">Total : <span data-counter-total="${group}">0</span> / ${required}</div></div>`;
}
function readChoiceSelection(choice, foods, mode, prefix, productName) {
  const required = Number(choice.max || 0);
  let selectedFoods = [], supplements = 0, details = [], totalChosen = 0;
  const addFood = (foodId, qty = 1) => {
    qty = Number(qty || 0);
    if (qty <= 0) return;
    const row = foods.find(x => x.food.id === foodId);
    if (!row) return;
    selectedFoods.push({ foodId, name: row.food.name, qty });
    details.push(qty > 1 ? `${qty} ${row.food.name}${row.food.name.endsWith('s') ? '' : 's'}` : row.food.name);
    supplements += Number(row.opt?.supplement || 0) * qty;
    totalChosen += qty;
  };
  if (!choice.clientChoice) {
    foods.forEach(({ food }) => addFood(food.id, 1));
    return { selectedFoods, supplements, details };
  }
  if (required <= 1) {
    const input = document.querySelector(`[data-${mode}-single="${prefix}"]:checked`);
    if (!input) throw new Error(`Il faut choisir ${choice.category.toLowerCase()} pour ${productName}.`);
    addFood(input.dataset.foodId, 1);
    return { selectedFoods, supplements, details };
  }
  Array.from(document.querySelectorAll(`[data-${mode}-count="${prefix}"]`)).forEach(input => addFood(input.dataset.foodId, Number(input.value || 0)));
  if (totalChosen !== required) throw new Error(`Il faut choisir ${required} ${choice.category.toLowerCase()} pour ${productName}.`);
  return { selectedFoods, supplements, details };
}
function openChoiceDialog(product) {
  pendingChoiceProduct = product;
  document.getElementById('choiceTitle').textContent = product.name;
  document.getElementById('choiceBody').innerHTML = (product.choices || []).map((choice, ci) => {
    if (!choice.clientChoice) return ''; // choix imposé : pas d'affichage, mais conservé dans la composition
    const foods = (choice.options || []).map(opt => ({ opt, food: config.baseFoods.find(f => f.id === opt.foodId) })).filter(x => x.food);
    const count = choice.max || 0;
    return `<div class="choice-block"><h3>${choice.category} ${choice.clientChoice ? `(choisir ${count})` : ''}</h3>${renderChoiceControls(choice, foods, 'choice', String(ci))}</div>`;
  }).join('');
  document.getElementById('choiceDialog').showModal();
}
function addChoiceProduct() {
  const p = pendingChoiceProduct; if (!p) return;
  if (p.type === 'menu') return addMenuProduct();
  let selectedFoods = [], supplements = 0, details = [];
  try {
    for (let ci = 0; ci < (p.choices || []).length; ci++) {
      const choice = p.choices[ci];
      const foods = (choice.options || []).map(opt => ({ opt, food: config.baseFoods.find(f => f.id === opt.foodId) })).filter(x => x.food);
      const result = readChoiceSelection(choice, foods, 'choice', String(ci), p.name);
      selectedFoods.push(...result.selectedFoods); supplements += result.supplements; details.push(...result.details);
    }
  } catch (err) { return showMessage('Choix incomplet', err.message); }
  addCartLine({ id: p.id, name: p.name, category: p.category, detail: summarizeNames(details), ticketChildren: [{ name: '', composition: summarizeNames(details), withCheck: false, category: p.category }], price: Number(p.price || 0) + supplements, qty: 1, refundable: p.refundable, selectedFoods });
  document.getElementById('choiceDialog').close();
  pendingChoiceProduct = null;
}
function renderComposeChoiceHtml(product, prefix) {
  return (product.choices || []).map((choice, ci) => {
    if (!choice.clientChoice) return ''; // choix imposé : pas d'affichage dans le menu
    const foods = (choice.options || []).map(opt => ({ opt, food: config.baseFoods.find(f => f.id === opt.foodId) })).filter(x => x.food);
    const count = choice.max || 0;
    const key = `${prefix}-${ci}`;
    return `<div class="nested-choice"><strong>${choice.category} ${choice.clientChoice ? `(choisir ${count})` : ''}</strong>${renderChoiceControls(choice, foods, 'compose', key)}</div>`;
  }).join('');
}
function collectComposeChoices(product, prefix) {
  let selectedFoods = [], supplements = 0, detailParts = [];
  for (let ci = 0; ci < (product.choices || []).length; ci++) {
    const choice = product.choices[ci];
    const foods = (choice.options || []).map(opt => ({ opt, food: config.baseFoods.find(f => f.id === opt.foodId) })).filter(x => x.food);
    const result = readChoiceSelection(choice, foods, 'compose', `${prefix}-${ci}`, product.name);
    selectedFoods.push(...result.selectedFoods); supplements += result.supplements; detailParts.push(...result.details);
  }
  return { selectedFoods, supplements, detail: summarizeNames(detailParts) };
}
function openMenuDialog(product) {
  pendingChoiceProduct = product;
  document.getElementById('choiceTitle').textContent = product.name;
  document.getElementById('choiceBody').innerHTML = (product.menuSections || []).map((section, si) => {
    const opts = (section.options || []).map(opt => ({ opt, product: config.products.find(p => p.id === opt.productId) })).filter(x => x.product);
    const required = Number(section.max || 1);
    const onlySimpleProducts = opts.every(({ product }) => product.type === 'simple');
    const optionsClass = onlySimpleProducts ? 'choice-options-grid menu-options-grid' : 'choice-options-list menu-options-list';
    return `<div class="choice-block"><h3>${section.section} ${section.clientChoice ? `(choisir ${required})` : ''}</h3><div class="${optionsClass}">${opts.map(({ opt, product }, oi) => {
      const inputType = section.clientChoice && required <= 1 ? 'radio' : 'checkbox';
      const inputName = inputType === 'radio' ? ` name="menu-section-${si}"` : '';
      const checked = !section.clientChoice ? 'checked disabled' : '';
      const defaultChecked = section.clientChoice && required <= 1 && oi === 0 ? 'checked' : '';
      const nested = product.type === 'compose' ? renderComposeChoiceHtml(product, `menu-${si}-${oi}`) : '';
      return `<div class="menu-option-cell"><label class="choice-option"><input type="${inputType}"${inputName} data-menu-select="${si}" data-product-id="${product.id}" data-menu-opt="${si}-${oi}" ${checked} ${defaultChecked}> <span>${escapeHtml(product.name)}</span> ${opt.supplement ? `<strong>${opt.supplement > 0 ? '+' : ''}${fmt(opt.supplement)}</strong>` : ''}</label>${nested}</div>`;
    }).join('')}</div></div>`;
  }).join('');
  document.getElementById('choiceDialog').showModal();
}
function addMenuProduct() {
  const p = pendingChoiceProduct; if (!p) return;
  let selectedFoods = [], selectedProducts = [], supplements = 0, details = [], ticketChildren = [];
  try {
    for (let si = 0; si < (p.menuSections || []).length; si++) {
      const section = p.menuSections[si], required = section.max || 1;
      const checkedInputs = Array.from(document.querySelectorAll(`[data-menu-select="${si}"]:checked`));
      if (section.clientChoice && checkedInputs.length !== required) return showMessage('Choix incomplet', `Il faut choisir ${required} produit(s) pour ${section.section}.`);
      checkedInputs.forEach(input => {
        const product = config.products.find(prod => prod.id === input.dataset.productId);
        const opt = (section.options || []).find(o => o.productId === input.dataset.productId);
        if (!product) return;
        selectedProducts.push(product.id);
        let detail = `${product.name}`;
        supplements += Number(opt?.supplement || 0);
        if (product.type === 'compose') {
          const oi = (section.options || []).findIndex(o => o.productId === input.dataset.productId);
          const nested = collectComposeChoices(product, `menu-${si}-${oi}`);
          selectedFoods.push(...nested.selectedFoods);
          supplements += nested.supplements;
          if (nested.detail) detail += ` (${nested.detail})`;
          ticketChildren.push({ qtyLabel: '1', name: `${product.name}`, composition: nested.detail, category: product.category });
        }
        details.push(detail);
        if (product.type !== 'compose') ticketChildren.push({ qtyLabel: '1', name: `${product.name}`, category: product.category });
      });
    }
  } catch (err) { return showMessage('Choix incomplet', err.message); }
  addCartLine({ id: p.id, name: p.name, type: 'menu', category: p.category, detail: details.join(' / '), ticketChildren, price: Number(p.price || 0) + supplements, qty: 1, refundable: p.refundable, selectedFoods, selectedProducts });
  document.getElementById('choiceDialog').close();
  pendingChoiceProduct = null;
}

function openSettings() { draftConfig = clone(config); renderSettings(); updateSettingsResetButton(); document.getElementById('settingsDialog').showModal(); }
function renderSettings() { renderProductEditor(); renderFoodEditor(); renderStockEditor(); renderGeneralEditor(); renderVolunteerEditor(); renderSettingsOrders(); renderSettingsReport(); }
function renderProductEditor() {
  const el = document.getElementById('productEditor');
  const zones = ['Boissons', 'Restauration', 'Consignes'];
  const byZone = Object.fromEntries(zones.map(z => [z, []]));
  (draftConfig.products || []).forEach((p, i) => {
    const zone = p.group || displayGroup(p.category);
    (byZone[zone] ||= []).push({ p, i });
  });

  function productCard(p, i) {
    const detail = p.type === 'compose' ? renderChoiceEditor(p, i) : (p.type === 'menu' ? renderMenuEditor(p, i) : '');
    return `<article class="product-edit-card clean-product-card">
      <div class="editor-row product-main clean-product-main">
        <div class="move-buttons"><button type="button" class="move-product" data-move-product="up" data-i="${i}">↑</button><button type="button" class="move-product" data-move-product="down" data-i="${i}">↓</button></div>
        <div class="field-name"><small>Nom</small><input data-product="name" data-i="${i}" value="${escapeHtml(p.name)}"></div>
        <div class="field-price"><small>Prix</small><input type="number" step="0.01" data-product="price" data-i="${i}" value="${p.price}"></div>
        <div class="field-type"><small>Structure</small><select data-product="type" data-i="${i}"><option value="simple" ${p.type === 'simple' ? 'selected' : ''}>Simple</option><option value="compose" ${p.type === 'compose' ? 'selected' : ''}>Composé</option><option value="menu" ${p.type === 'menu' ? 'selected' : ''}>Menu</option></select></div>
        <div><small>Catégorie</small><select data-product="category" data-i="${i}">${options(CATEGORIES, p.category)}</select></div>
        <label class="checkline refundable-line"><input type="checkbox" data-product="refundable" data-i="${i}" ${p.refundable ? 'checked' : ''}> Remboursable</label>
        <button type="button" class="danger small-action" data-delete-product="${i}" title="Supprimer">🗑</button>
      </div>${detail}
    </article>`;
  }

  el.innerHTML = zones.map(zone => {
    const rows = byZone[zone] || [];
    return `<section class="product-zone-editor ${groupClass(zone)}-editor">
      <div class="product-zone-title"><strong>${zone}</strong><span>${rows.length} bouton${rows.length > 1 ? 's' : ''}</span><button type="button" class="secondary add-zone-product" data-add-product-zone="${zone}">Ajouter un bouton</button></div>
      <div class="product-zone-list">${rows.map(({ p, i }) => productCard(p, i)).join('')}</div>
    </section>`;
  }).join('');
  el.querySelectorAll('[data-product]').forEach(x => x.addEventListener('change', updateProductDraft));
  el.querySelectorAll('[data-choice-field]').forEach(x => x.addEventListener('change', updateChoiceDraft));
  el.querySelectorAll('[data-menu-field]').forEach(x => x.addEventListener('change', updateMenuDraft));
  el.querySelectorAll('[data-move-product]').forEach(x => x.addEventListener('click', moveProductDraft));
  el.querySelectorAll('[data-add-product-zone]').forEach(x => x.addEventListener('click', addProductDraft));
  el.querySelectorAll('[data-delete-product]').forEach(x => x.addEventListener('click', deleteProductDraft));
}
function newProductForZone(zone) {
  const category = zone === 'Boissons' ? 'Boissons sans alcool' : (zone === 'Consignes' ? 'Consigne' : 'Plat');
  return { id: uid('p'), group: zone, category, name: 'Libre', price: 0, type: 'simple', components: [], choices: [], menuSections: [], refundable: true, stock: '' };
}
function addProductDraft(e) {
  const zone = e.currentTarget.dataset.addProductZone;
  draftConfig.products ||= [];
  draftConfig.products.push(newProductForZone(zone));
  renderProductEditor();
  renderStockEditor();
  renderGeneralEditor();
}
function deleteProductDraft(e) {
  const i = Number(e.currentTarget.dataset.deleteProduct);
  const p = draftConfig.products?.[i];
  if (!p) return;
  const remove = () => {
    const removedId = p.id;
    draftConfig.products.splice(i, 1);
    draftConfig.products.forEach(prod => {
      prod.components = (prod.components || []).filter(id => id !== removedId);
      prod.menuSections = (prod.menuSections || []).map(sec => ({ ...sec, options: (sec.options || []).filter(o => o.productId !== removedId) }));
    });
    renderSettings();
  };
  if (typeof showConfirm === 'function') showConfirm('Supprimer le bouton', `Supprimer ${p.name || 'ce bouton'} ?`, remove);
  else if (confirm(`Supprimer ${p.name || 'ce bouton'} ?`)) remove();
}
function moveProductDraft(e) {
  const i = Number(e.currentTarget.dataset.i);
  const dir = e.currentTarget.dataset.moveProduct === 'up' ? -1 : 1;
  const products = draftConfig.products || [];
  const product = products[i];
  if (!product) return;
  const zone = product.group || displayGroup(product.category);
  const zoneIndices = products.map((p, idx) => ({ p, idx })).filter(x => (x.p.group || displayGroup(x.p.category)) === zone).map(x => x.idx);
  const pos = zoneIndices.indexOf(i);
  const targetIndex = zoneIndices[pos + dir];
  if (targetIndex === undefined) return;
  const tmp = products[i];
  products[i] = products[targetIndex];
  products[targetIndex] = tmp;
  renderProductEditor();
}
function renderChoiceEditor(p, i) {
  const groups = ['Viande', 'Accompagnement'];
  return `<div class="choice-edit"><h4>Réglage produit composé</h4>${groups.map(cat => {
    let choice = (p.choices || []).find(c => c.category === cat) || { category: cat, min: 0, max: 0, clientChoice: false, options: [] };
    const foods = draftConfig.baseFoods.filter(f => f.category === cat);
    const gridClass = foods.length >= 4 ? 'settings-options-grid settings-options-grid-3' : 'settings-options-grid';
    return `<div class="settings-choice-section"><h4>${cat}</h4><div class="choice-rules"><label><input type="checkbox" data-choice-field="clientChoice" data-i="${i}" data-cat="${cat}" ${choice.clientChoice ? 'checked' : ''}> Choix laissé au client</label><label>Nombre à choisir <input type="number" min="0" data-choice-field="max" data-i="${i}" data-cat="${cat}" value="${choice.max || 0}"></label></div><div class="${gridClass}">${foods.map(f => { const opt = (choice.options || []).find(o => o.foodId === f.id); return `<div class="option-card"><label class="option-card-name"><input type="checkbox" data-choice-field="option" data-i="${i}" data-cat="${cat}" data-food-id="${f.id}" ${opt ? 'checked' : ''}> ${escapeHtml(f.name)}</label><label class="option-card-supp">Suppl. <input type="number" step="0.01" data-choice-field="supplement" data-i="${i}" data-cat="${cat}" data-food-id="${f.id}" value="${opt?.supplement || 0}"></label></div>`; }).join('')}</div></div>`;
  }).join('')}</div>`;
}
function renderMenuEditor(p, i) {
  const sections = ['Boissons', 'Entrée', 'Plat', 'Fromage', 'Dessert'];
  return `<div class="menu-edit"><h4>Réglage menu</h4><p class="hint">Chaque rubrique peut être fixe ou laissée au choix du client. Le plat peut être un produit simple ou composé déjà paramétré.</p>${sections.map(section => {
    let cfg = (p.menuSections || []).find(c => c.section === section) || { section, clientChoice: false, max: 1, options: [] };
    const candidates = draftConfig.products.filter(prod => prod.id !== p.id && prod.name && (prod.category === section || (section === 'Boissons' && displayGroup(prod.category) === 'Boissons')));
    const gridClass = candidates.length >= 5 ? 'settings-options-grid settings-options-grid-3' : 'settings-options-grid';
    return `<div class="menu-section"><h4>${section}</h4><div class="menu-rules"><label><input type="checkbox" data-menu-field="clientChoice" data-i="${i}" data-section="${section}" ${cfg.clientChoice ? 'checked' : ''}> Choix laissé au client</label><label>Nombre à choisir <input type="number" min="0" data-menu-field="max" data-i="${i}" data-section="${section}" value="${cfg.max || 1}"></label></div>${candidates.length ? `<div class="${gridClass}">${candidates.map(prod => { const opt = (cfg.options || []).find(o => o.productId === prod.id); return `<div class="option-card"><label class="option-card-name"><input type="checkbox" data-menu-field="option" data-i="${i}" data-section="${section}" data-product-id="${prod.id}" ${opt ? 'checked' : ''}> ${escapeHtml(prod.name)}</label><label class="option-card-supp">Suppl. <input type="number" step="0.01" data-menu-field="supplement" data-i="${i}" data-section="${section}" data-product-id="${prod.id}" value="${opt?.supplement || 0}"></label></div>`; }).join('')}</div>` : '<p class="hint">Aucun produit dans cette catégorie.</p>'}</div>`;
  }).join('')}</div>`;
}
function ensureChoice(p, cat) {
  p.choices ||= [];
  let choice = p.choices.find(c => c.category === cat);
  if (!choice) { choice = { category: cat, min: 0, max: 0, clientChoice: false, options: [] }; p.choices.push(choice); }
  return choice;
}
function updateChoiceDraft(e) {
  const i = Number(e.currentTarget.dataset.i), cat = e.currentTarget.dataset.cat, field = e.currentTarget.dataset.choiceField, foodId = e.currentTarget.dataset.foodId;
  const p = draftConfig.products[i]; const choice = ensureChoice(p, cat);
  if (field === 'clientChoice') choice.clientChoice = e.currentTarget.checked;
  if (field === 'max') { choice.max = Number(e.currentTarget.value || 0); choice.min = choice.max; }
  if (field === 'option') {
    if (e.currentTarget.checked && !choice.options.some(o => o.foodId === foodId)) choice.options.push({ foodId, supplement: 0 });
    if (!e.currentTarget.checked) choice.options = choice.options.filter(o => o.foodId !== foodId);
  }
  if (field === 'supplement') { const opt = choice.options.find(o => o.foodId === foodId) || (choice.options.push({ foodId, supplement: 0 }), choice.options.find(o => o.foodId === foodId)); opt.supplement = Number(e.currentTarget.value || 0); }
  p.choices = (p.choices || []).filter(c => (c.max || 0) > 0 || (c.options || []).length > 0);
}
function ensureMenuSection(p, section) {
  p.menuSections ||= [];
  let cfg = p.menuSections.find(c => c.section === section);
  if (!cfg) { cfg = { section, clientChoice: false, max: 1, options: [] }; p.menuSections.push(cfg); }
  return cfg;
}
function updateMenuDraft(e) {
  const i = Number(e.currentTarget.dataset.i), section = e.currentTarget.dataset.section, field = e.currentTarget.dataset.menuField, productId = e.currentTarget.dataset.productId;
  const p = draftConfig.products[i]; const cfg = ensureMenuSection(p, section);
  if (field === 'clientChoice') cfg.clientChoice = e.currentTarget.checked;
  if (field === 'max') cfg.max = Number(e.currentTarget.value || 0);
  if (field === 'option') {
    if (e.currentTarget.checked && !cfg.options.some(o => o.productId === productId)) cfg.options.push({ productId, supplement: 0 });
    if (!e.currentTarget.checked) cfg.options = cfg.options.filter(o => o.productId !== productId);
  }
  if (field === 'supplement') { const opt = cfg.options.find(o => o.productId === productId) || (cfg.options.push({ productId, supplement: 0 }), cfg.options.find(o => o.productId === productId)); opt.supplement = Number(e.currentTarget.value || 0); }
  p.menuSections = (p.menuSections || []).filter(c => (c.max || 0) > 0 || (c.options || []).length > 0);
}

function updateProductDraft(e) {
  const i = Number(e.currentTarget.dataset.i), field = e.currentTarget.dataset.product, p = draftConfig.products[i];
  if (field === 'refundable') p.refundable = e.currentTarget.checked;
  else if (field === 'price') p.price = Number(e.currentTarget.value || 0);
  else { p[field] = e.currentTarget.value; if (field === 'category') p.group = displayGroup(p.category); }
  if (field === 'type' && p.type === 'simple') { p.components = []; p.choices = []; p.menuSections = []; }
  if (field === 'type' && p.type === 'compose') { p.menuSections = []; p.choices ||= []; }
  if (field === 'type' && p.type === 'menu') { p.choices = []; p.menuSections ||= []; }
  renderProductEditor(); renderStockEditor(); renderGeneralEditor();
}

function renderFoodEditor() {
  const el = document.getElementById('foodEditor');
  el.innerHTML = draftConfig.baseFoods.map((f, i) => `<div class="editor-row food"><div><small>Nom</small><input data-food="name" data-i="${i}" value="${escapeHtml(f.name)}"></div><div><small>Catégorie</small><select data-food="category" data-i="${i}"><option ${f.category === 'Viande' ? 'selected' : ''}>Viande</option><option ${f.category === 'Accompagnement' ? 'selected' : ''}>Accompagnement</option></select></div><button class="danger" data-delete-food="${i}">Supprimer</button></div>`).join('');
  el.querySelectorAll('[data-food]').forEach(x => x.addEventListener('change', e => { const f = draftConfig.baseFoods[Number(e.currentTarget.dataset.i)]; f[e.currentTarget.dataset.food] = e.currentTarget.value; renderProductEditor(); renderStockEditor(); }));
  el.querySelectorAll('[data-delete-food]').forEach(b => b.addEventListener('click', e => { const i = Number(e.currentTarget.dataset.deleteFood); draftConfig.baseFoods.splice(i, 1); draftConfig.products.forEach(p => p.components = (p.components || []).filter(id => draftConfig.baseFoods.some(f => f.id === id) || draftConfig.products.some(pp => pp.id === id))); renderSettings(); }));
}

function renderVolunteerEditor() {
  const el = document.getElementById('volunteerEditor');
  if (!el) return;
  el.innerHTML = (draftConfig.volunteers || []).map((v, i) => `<div class="editor-row food"><div><small>Nom</small><input data-volunteer="name" data-i="${i}" value="${escapeHtml(v.name)}"></div><div class="checkline"><input type="checkbox" data-volunteer="active" data-i="${i}" ${v.active !== false ? 'checked' : ''}> Actif</div><button class="danger" data-delete-volunteer="${i}">Supprimer</button></div>`).join('') || '<p>Aucun bénévole.</p>';
  el.querySelectorAll('[data-volunteer]').forEach(x => x.addEventListener('change', e => { const v = draftConfig.volunteers[Number(e.currentTarget.dataset.i)]; if (e.currentTarget.dataset.volunteer === 'active') v.active = e.currentTarget.checked; else v.name = e.currentTarget.value; }));
  el.querySelectorAll('[data-delete-volunteer]').forEach(b => b.addEventListener('click', e => { draftConfig.volunteers.splice(Number(e.currentTarget.dataset.deleteVolunteer), 1); renderVolunteerEditor(); }));
}
function renderStockEditor() {
  const el = document.getElementById('stockEditor');
  const productRows = draftConfig.products
    .filter(p => p.name && p.type === 'simple')
    .map(p => ({ kind: 'product', id: p.id, label: p.name, value: p.stock }));
  const foodRows = draftConfig.baseFoods
    .filter(f => f.name)
    .map(f => ({ kind: 'food', id: f.id, label: f.name, value: f.stock }));
  const rows = [...productRows, ...foodRows];
  el.innerHTML = rows.map(r => `<div class="stock-card"><label>${escapeHtml(r.label)}</label><input inputmode="numeric" placeholder="vide = pas de suivi" data-stock-kind="${r.kind}" data-stock-id="${r.id}" value="${r.value ?? ''}"></div>`).join('');
  el.querySelectorAll('[data-stock-kind]').forEach(x => x.addEventListener('change', e => {
    const kind = e.currentTarget.dataset.stockKind, id = e.currentTarget.dataset.stockId;
    const obj = kind === 'product' ? draftConfig.products.find(p => p.id === id) : draftConfig.baseFoods.find(f => f.id === id);
    obj.stock = e.currentTarget.value.trim();
  }));
}
function renderGeneralEditor() {
  document.getElementById('setEventName').value = draftConfig.eventName;
  document.getElementById('setPrefix').value = draftConfig.orderPrefix;
  document.getElementById('setTicketColor').value = draftConfig.ticketColor;
  const cats = Array.from(new Set([...CATEGORIES, ...draftConfig.products.map(p => p.category).filter(Boolean)]));
  document.getElementById('categoryColorEditor').innerHTML = cats.map(c => `<div class="editor-row color"><div>${escapeHtml(c)}</div><select data-cat-color="${escapeHtml(c)}">${paletteOptions(draftConfig.categoryColors[c] || 'gris')}</select></div>`).join('');
  document.querySelectorAll('[data-cat-color]').forEach(x => x.addEventListener('change', e => { draftConfig.categoryColors[e.currentTarget.dataset.catColor] = e.currentTarget.value; }));
}
function saveSettings() {
  draftConfig.eventName = document.getElementById('setEventName').value.trim() || 'Comité des Fêtes-Moroges';
  if (Array.isArray(draftConfig.volunteers)) {
    draftConfig.volunteers.sort((a, b) => String(a.name || '').localeCompare(String(b.name || ''), 'fr', { sensitivity: 'base' }));
  }
  draftConfig.orderPrefix = document.getElementById('setPrefix').value;
  draftConfig.ticketColor = document.getElementById('setTicketColor').value;
  config = normalizeConfig(draftConfig);
  draftConfig = clone(config);
  saveConfig();
  renderProducts();
  renderCart();
  renderSettings();
  updateSettingsResetButton();
  showMessage('Paramètres enregistrés', 'Les modifications ont été enregistrées. La fenêtre reste ouverte.');
}



function sortedVolunteers() {
  return (config.volunteers || [])
    .filter(v => v.active !== false)
    .slice()
    .sort((a, b) => String(a.name || '').localeCompare(String(b.name || ''), 'fr', { sensitivity: 'base' }));
}
function openVolunteerDialog() {
  if (!cart.length) return showMessage('Commande vide', 'Ajoute au moins un produit avant de l’attribuer à un bénévole.');
  const active = sortedVolunteers();
  if (!active.length) return showMessage('Aucun bénévole', 'Ajoute au moins un bénévole dans Paramètres > Bénévoles.');
  const select = document.getElementById('volunteerSelect');
  if (select) select.innerHTML = active.map(v => `<option value="${escapeHtml(v.id)}">${escapeHtml(v.name)}</option>`).join('');
  const grid = document.getElementById('volunteerButtons');
  if (grid) {
    grid.innerHTML = active.map(v => `<button type="button" class="volunteer-choice-btn" data-volunteer-id="${escapeHtml(v.id)}">${escapeHtml(v.name)}</button>`).join('');
    grid.querySelectorAll('[data-volunteer-id]').forEach(btn => btn.addEventListener('click', e => validateVolunteerOrder(e.currentTarget.dataset.volunteerId)));
  }
  document.getElementById('volunteerDialog').showModal();
}
function validateVolunteerOrder(id) {
  const selectedId = id || (document.getElementById('volunteerSelect') || {}).value;
  const v = (config.volunteers || []).find(x => x.id === selectedId);
  if (!v) return showMessage('Bénévole introuvable', 'Sélectionne un bénévole valide.');
  paymentMethod = 'Bénévole';
  paidCents = 0;
  document.getElementById('volunteerDialog').close();
  validateSale({ kind: 'volunteer', paymentMethod: 'Bénévole - à régler', paid: 0, change: 0, volunteerId: v.id, volunteerName: v.name, settled: false, print: true });
}
let volunteerPayOrderNumber = null;
function volunteerPendingAmount(volunteerId) {
  return sales.filter(s => s.kind === 'volunteer' && s.volunteerId === volunteerId && s.settled === false).reduce((sum, s) => sum + Number(s.total || 0), 0);
}
function openVolunteerPayment(volunteerId) {
  const v = (config.volunteers || []).find(x => x.id === volunteerId) || { name: volunteerId };
  volunteerPayOrderNumber = volunteerId;
  document.getElementById('volunteerPayTitle').textContent = `Paiement bénévole - ${v.name}`;
  document.getElementById('volunteerPaySummary').textContent = fmt(volunteerPendingAmount(volunteerId));
  document.getElementById('volunteerPayDialog').showModal();
}
function validateVolunteerPayment() {
  const volunteerId = volunteerPayOrderNumber;
  const amount = volunteerPendingAmount(volunteerId);
  if (!amount) return showMessage('Rien à régler', 'Ce bénévole n’a pas de solde à payer.');
  const method = document.getElementById('volunteerPayMethod').value;
  sales.forEach(s => { if (s.kind === 'volunteer' && s.volunteerId === volunteerId && s.settled === false) { s.settled = true; s.paymentMethod = `Bénévole réglé ${method}`; } });
  sales.push({ kind: 'volunteer_payment', orderNumber: `BEN-${Date.now().toString().slice(-6)}`, date: new Date().toISOString(), paymentMethod: method, paid: amount, change: 0, total: amount, volunteerId, volunteerName: ((config.volunteers || []).find(v => v.id === volunteerId) || {}).name || '', items: [{ name: 'Règlement bénévole', qty: 1, price: amount, refundable: false }] });
  saveSales();
  document.getElementById('volunteerPayDialog').close();
  openReport();
}

let quickRefundFilter = '';
function quickRefundProducts() {
  const q = quickRefundFilter.trim().toLowerCase();
  return (config.products || []).filter(p => p.name && p.refundable !== false && Number(p.price || 0) > 0 && (!q || p.name.toLowerCase().includes(q) || String(p.category || '').toLowerCase().includes(q)));
}
function openQuickRefund() {
  quickRefundFilter = '';
  document.getElementById('quickRefundSearch').value = '';
  renderQuickRefundLines();
  document.getElementById('quickRefundDialog').showModal();
}
function renderQuickRefundLines() {
  const products = quickRefundProducts();
  document.getElementById('quickRefundLines').innerHTML = products.map((p, idx) => `<div class="editor-row refund-row quick-refund-row"><div><strong>${escapeHtml(p.name)}</strong><small>${fmt(p.price)} / unité</small></div><div class="quick-refund-controls"><button type="button" data-quick-refund-minus="${idx}">-</button><input type="number" min="0" value="0" data-quick-refund-qty="${idx}" data-product-id="${escapeHtml(p.id)}"><button type="button" data-quick-refund-plus="${idx}">+</button></div></div>`).join('') || '<p>Aucun produit remboursable.</p>';
  document.querySelectorAll('[data-quick-refund-qty]').forEach(x => x.addEventListener('input', updateQuickRefundTotal));
  document.querySelectorAll('[data-quick-refund-minus]').forEach(b => b.addEventListener('click', e => { const input = document.querySelector(`[data-quick-refund-qty="${e.currentTarget.dataset.quickRefundMinus}"]`); input.value = Math.max(0, Number(input.value || 0) - 1); updateQuickRefundTotal(); }));
  document.querySelectorAll('[data-quick-refund-plus]').forEach(b => b.addEventListener('click', e => { const input = document.querySelector(`[data-quick-refund-qty="${e.currentTarget.dataset.quickRefundPlus}"]`); input.value = Number(input.value || 0) + 1; updateQuickRefundTotal(); }));
  updateQuickRefundTotal();
}
function selectedQuickRefundItems() {
  return Array.from(document.querySelectorAll('[data-quick-refund-qty]')).map(input => {
    const qty = Math.max(0, Number(input.value || 0));
    const p = config.products.find(x => x.id === input.dataset.productId);
    return qty > 0 && p ? { id: p.id, name: p.name, qty: -qty, price: Number(p.price || 0), refundable: false } : null;
  }).filter(Boolean);
}
function updateQuickRefundTotal() {
  const totalRefund = Math.abs(selectedQuickRefundItems().reduce((sum, i) => sum + i.qty * i.price, 0));
  document.getElementById('quickRefundTotal').textContent = fmt(totalRefund);
}
function validateQuickRefund() {
  const items = selectedQuickRefundItems();
  if (!items.length) return showMessage('Remboursement vide', 'Choisis au moins un produit à rembourser.');
  const refundTotal = items.reduce((sum, i) => sum + i.qty * i.price, 0);
  sales.push({ kind: 'refund', orderNumber: `RAP-${Date.now().toString().slice(-6)}`, originalOrderNumber: '', date: new Date().toISOString(), paymentMethod: 'Espèces', paid: refundTotal, change: 0, total: refundTotal, reason: '', items });
  saveSales();
  document.getElementById('quickRefundDialog').close();
  renderSettingsReport();
  showMessage('Remboursement enregistré', 'Le remboursement a été enregistré en espèces.');
}

let refundSaleIndex = null;
function saleTotal(s) { return Number(s.total || 0); }
function refundAmountForSale(orderNumber) { return sales.filter(x => x.kind === 'refund' && x.originalOrderNumber === orderNumber).reduce((sum, r) => sum + Math.abs(Number(r.total || 0)), 0); }
function netSaleTotal(s) { return saleTotal(s) - refundAmountForSale(s.orderNumber); }
function formatDate(iso) { try { return new Date(iso).toLocaleString('fr-FR'); } catch { return iso || ''; } }
function salesForReport() {
  if (!reportResetAt) return sales;
  const limit = new Date(reportResetAt).getTime();
  return sales.filter(s => {
    const t = new Date(s.date || 0).getTime();
    return Number.isFinite(t) && t >= limit;
  });
}
function computeReportData(list = salesForReport()) {
  const totals = {};
  list.forEach(s => {
    const kind = s.kind || 'sale';
    if (kind === 'volunteer') return;
    const method = s.paymentMethod || 'Inconnu';
    totals[method] ||= 0;
    totals[method] += Number(s.total || 0);
  });
  const gross = list.filter(s => (s.kind || 'sale') === 'sale').reduce((a,s)=>a+Number(s.total||0),0);
  const refunds = list.filter(s => s.kind === 'refund').reduce((a,s)=>a+Math.abs(Number(s.total||0)),0);
  const volunteerPending = list.filter(s => s.kind === 'volunteer' && s.settled === false).reduce((a,s)=>a+Number(s.total||0),0);
  const productMap = {};
  list.forEach(s => (s.items || []).forEach(i => {
    productMap[i.name] ||= { qty: 0, total: 0 };
    productMap[i.name].qty += Number(i.qty || 0);
    productMap[i.name].total += Number(i.qty || 0) * Number(i.price || 0);
  }));
  return { totals, gross, refunds, volunteerPending, productMap, orderCount: list.filter(s => (s.kind || 'sale') === 'sale').length };
}
function mergeReportData(a, b) {
  const out = { totals: {}, gross: 0, refunds: 0, volunteerPending: 0, productMap: {}, orderCount: 0 };
  [a, b].filter(Boolean).forEach(src => {
    out.gross += Number(src.gross || 0);
    out.refunds += Number(src.refunds || 0);
    out.volunteerPending += Number(src.volunteerPending || 0);
    out.orderCount += Number(src.orderCount || 0);
    Object.entries(src.totals || {}).forEach(([k,v]) => { out.totals[k] ||= 0; out.totals[k] += Number(v || 0); });
    Object.entries(src.productMap || {}).forEach(([name,v]) => {
      out.productMap[name] ||= { qty: 0, total: 0 };
      out.productMap[name].qty += Number(v.qty || 0);
      out.productMap[name].total += Number(v.total || 0);
    });
  });
  return out;
}
function visibleReportData() {
  return mergeReportData(reportArchive, computeReportData());
}
function paymentTotals() {
  return visibleReportData().totals;
}
function reportHtml() {
  const data = visibleReportData();
  const totals = data.totals || {};
  const gross = Number(data.gross || 0);
  const refunds = Number(data.refunds || 0);
  const volunteerPending = Number(data.volunteerPending || 0);
  const net = gross - refunds;
  const productRows = Object.entries(data.productMap || {}).sort((a,b)=>Math.abs(b[1].total)-Math.abs(a[1].total)).map(([name,v]) => `<tr><td>${escapeHtml(name)}</td><td>${v.qty}</td><td>${fmt(v.total)}</td></tr>`).join('');
  const volunteerRows = (config.volunteers || []).map(v => ({ v, amount: volunteerPendingAmount(v.id) })).filter(x => x.amount > 0).map(x => `<tr><td>${escapeHtml(x.v.name)}</td><td>${fmt(x.amount)}</td><td><button class="validate" data-pay-volunteer="${escapeHtml(x.v.id)}">Régler</button></td></tr>`).join('');
  return `<div class="report-cards"><div><strong>Ventes brutes</strong><span>${fmt(gross)}</span></div><div><strong>Remboursements</strong><span>${fmt(refunds)}</span></div><div><strong>Total net encaissé</strong><span>${fmt(net)}</span></div><div><strong>Bénévoles à régler</strong><span>${fmt(volunteerPending)}</span></div><div><strong>Commandes</strong><span>${data.orderCount || 0}</span></div></div><h3>Par paiement</h3><table class="data-table"><tbody>${Object.entries(totals).map(([k,v])=>`<tr><td>${escapeHtml(k)}</td><td>${fmt(v)}</td></tr>`).join('')}</tbody></table><h3>Par produit</h3><table class="data-table"><thead><tr><th>Produit</th><th>Qté</th><th>Total</th></tr></thead><tbody>${productRows || '<tr><td colspan="3">Aucune vente</td></tr>'}</tbody></table><h3>Bénévoles à régler</h3><table class="data-table"><tbody>${volunteerRows || '<tr><td>Aucun montant en attente</td></tr>'}</tbody></table>`;
}
function bindVolunteerPayButtons(root = document) {
  root.querySelectorAll('[data-pay-volunteer]').forEach(b => b.addEventListener('click', e => openVolunteerPayment(e.currentTarget.dataset.payVolunteer)));
  root.querySelectorAll('[data-toggle-volunteer-order]').forEach(b => b.addEventListener('click', e => toggleVolunteerOrder(Number(e.currentTarget.dataset.toggleVolunteerOrder))));
}
function toggleVolunteerOrder(index) {
  const s = sales[index];
  if (!s || s.kind !== 'volunteer') return;
  s.settled = s.settled === false;
  s.paymentMethod = s.settled === false ? 'Bénévole - à régler' : 'Bénévole réglé';
  saveSales();
  renderSettingsOrders();
  renderSettingsReport();
}
function renderSettingsReport() {
  const el = document.getElementById('settingsReportContent');
  if (!el) return;
  el.innerHTML = reportHtml();
  bindVolunteerPayButtons(el);
}
function openReport() {
  document.getElementById('reportContent').innerHTML = reportHtml();
  bindVolunteerPayButtons(document.getElementById('reportContent'));
  document.getElementById('reportDialog').showModal();
}
function ordersHtml() {
  return sales.map((s, idx) => {
    const isRefund = s.kind === 'refund';
    const isVolunteer = s.kind === 'volunteer';
    const items = (s.items || []).map(i => `${i.qty} x ${escapeHtml(i.name)} (${fmt(i.qty * i.price)})`).join('<br>');
    const volunteerToggle = isVolunteer ? `<button class="secondary" data-toggle-volunteer-order="${idx}">${s.settled === false ? 'Marquer réglé' : 'Marquer à régler'}</button>` : '';
    const refundInfo = isVolunteer ? `<div class="hint">Bénévole : ${escapeHtml(s.volunteerName || '')} - ${s.settled === false ? 'à régler' : 'réglé'}</div>` : (!isRefund ? `<div class="hint">Déjà remboursé : ${fmt(refundAmountForSale(s.orderNumber))} / Net : ${fmt(netSaleTotal(s))}</div>` : `<div class="hint">Remboursement en espèces</div>`);
    const btn = (!isRefund && !isVolunteer && netSaleTotal(s) > 0) ? `<button class="danger" data-refund-sale="${idx}">Rembourser</button>` : volunteerToggle;
    return `<div class="order-card ${isRefund ? 'refund-card' : ''}"><div><strong>${isRefund ? 'Remboursement' : 'Commande'} n° ${escapeHtml(s.orderNumber)}</strong><span>${formatDate(s.date)}</span></div><div>${items}</div><div class="order-bottom"><b>${fmt(s.total)}</b><span>${escapeHtml(s.paymentMethod || '')}</span>${btn}</div>${refundInfo}</div>`;
  }).reverse().join('') || '<p>Aucune commande enregistrée.</p>';
}
function bindRefundButtons(root = document) {
  root.querySelectorAll('[data-refund-sale]').forEach(b => b.addEventListener('click', e => openRefund(Number(e.currentTarget.dataset.refundSale))));
}
function renderSettingsOrders() {
  const el = document.getElementById('settingsOrdersList');
  if (!el) return;
  el.innerHTML = ordersHtml();
  bindRefundButtons(el);
  bindVolunteerPayButtons(el);
}
function openOrders() {
  document.getElementById('ordersList').innerHTML = ordersHtml();
  bindRefundButtons(document.getElementById('ordersList'));
  bindVolunteerPayButtons(document.getElementById('ordersList'));
  document.getElementById('ordersDialog').showModal();
}
function openRefund(index) {
  refundSaleIndex = index;
  const s = sales[index];
  document.getElementById('refundTitle').textContent = `Remboursement commande n° ${s.orderNumber}`;
  document.getElementById('refundLines').innerHTML = (s.items || []).filter(i => i.refundable !== false && i.price > 0).map((i, lineIndex) => `<div class="editor-row refund-row"><div><strong>${escapeHtml(i.name)}</strong><small>${fmt(i.price)} / unité - acheté : ${i.qty}</small></div><input type="number" min="0" max="${i.qty}" value="0" data-refund-line="${lineIndex}"></div>`).join('') || '<p>Aucun produit remboursable dans cette commande.</p>';
  document.querySelectorAll('[data-refund-line]').forEach(x => x.addEventListener('input', updateRefundTotal));
  updateRefundTotal();
  document.getElementById('refundDialog').showModal();
}
function selectedRefundItems() {
  const s = sales[refundSaleIndex];
  const refundable = (s.items || []).filter(i => i.refundable !== false && i.price > 0);
  return Array.from(document.querySelectorAll('[data-refund-line]')).map(input => {
    const original = refundable[Number(input.dataset.refundLine)];
    const qty = Math.max(0, Math.min(Number(input.value || 0), Number(original.qty || 0)));
    return qty > 0 ? { ...clone(original), qty: -qty, price: Number(original.price || 0) } : null;
  }).filter(Boolean);
}
function updateRefundTotal() {
  const items = selectedRefundItems();
  const totalRefund = Math.abs(items.reduce((sum, i) => sum + i.qty * i.price, 0));
  document.getElementById('refundTotal').textContent = fmt(totalRefund);
}
function validateRefund() {
  if (refundSaleIndex === null) return;
  const original = sales[refundSaleIndex];
  const items = selectedRefundItems();
  if (!items.length) return showMessage('Remboursement vide', 'Choisis au moins un produit à rembourser.');
  const refundTotal = items.reduce((sum, i) => sum + i.qty * i.price, 0);
  const refundOrderNumber = `R-${original.orderNumber}-${Date.now().toString().slice(-4)}`;
  sales.push({ kind: 'refund', orderNumber: refundOrderNumber, originalOrderNumber: original.orderNumber, date: new Date().toISOString(), paymentMethod: 'Espèces', paid: refundTotal, change: 0, total: refundTotal, reason: '', items });
  saveSales();
  document.getElementById('refundDialog').close();
  renderSettingsOrders();
  renderSettingsReport();
  showMessage('Remboursement enregistré', 'Le remboursement a été enregistré en espèces.');
}

document.querySelectorAll('[data-key]').forEach(btn => btn.addEventListener('click', () => pressKey(btn.dataset.key)));
document.querySelectorAll('[data-quick]').forEach(btn => btn.addEventListener('click', () => setQuickAmount(Number(btn.dataset.quick))));
document.getElementById('btnExact').addEventListener('click', () => setQuickAmount(total()));
document.querySelectorAll('.pay[data-method]').forEach(btn => btn.addEventListener('click', () => payAndPrint(btn.dataset.method)));
const btnPrintTicket = document.getElementById('btnPrintTicket');
if (btnPrintTicket) btnPrintTicket.addEventListener('click', () => { if (cart.length) { buildTicket(); window.print(); } });
document.getElementById('btnClear').addEventListener('click', () => { if (!cart.length) return; showConfirm('Annuler la commande', 'Supprimer toute la commande en cours ?', clearCurrentCart); });
document.getElementById('btnReprintLast').addEventListener('click', reprintLastTicket);
const btnExport = document.getElementById('btnExport'); if (btnExport) btnExport.addEventListener('click', exportCsv);
document.getElementById('btnQuickRefund').addEventListener('click', openQuickRefund);
document.getElementById('btnCloseQuickRefund').addEventListener('click', () => document.getElementById('quickRefundDialog').close());
document.getElementById('btnValidateQuickRefund').addEventListener('click', validateQuickRefund);
document.getElementById('quickRefundSearch').addEventListener('input', e => { quickRefundFilter = e.currentTarget.value; renderQuickRefundLines(); });
document.getElementById('btnVolunteer').addEventListener('click', openVolunteerDialog);
document.getElementById('btnCloseVolunteer').addEventListener('click', () => document.getElementById('volunteerDialog').close());
document.getElementById('btnValidateVolunteer').addEventListener('click', validateVolunteerOrder);
document.getElementById('btnCloseVolunteerPay').addEventListener('click', () => document.getElementById('volunteerPayDialog').close());
document.getElementById('btnValidateVolunteerPayment').addEventListener('click', validateVolunteerPayment);
const btnOrders = document.getElementById('btnOrders'); if (btnOrders) btnOrders.addEventListener('click', openOrders);
const btnReport = document.getElementById('btnReport'); if (btnReport) btnReport.addEventListener('click', openReport);
document.getElementById('btnCloseOrders').addEventListener('click', () => document.getElementById('ordersDialog').close());
document.getElementById('btnCloseReport').addEventListener('click', () => document.getElementById('reportDialog').close());
document.getElementById('btnCloseRefund').addEventListener('click', () => document.getElementById('refundDialog').close());
document.getElementById('btnValidateRefund').addEventListener('click', validateRefund);
document.getElementById('btnSettings').addEventListener('click', openSettings);

document.addEventListener('click', e => {
  const btn = e.target.closest('[data-count-delta]');
  if (!btn) return;
  const input = document.getElementById(btn.dataset.counterTarget);
  if (!input) return;
  const group = btn.dataset.counterGroupRef;
  const wrapper = document.querySelector(`[data-counter-group="${group}"]`);
  const required = Number(wrapper?.dataset.required || 0);
  const inputs = Array.from(document.querySelectorAll(`[data-counter-member="${group}"]`));
  const currentTotal = inputs.reduce((sum, x) => sum + Number(x.value || 0), 0);
  const delta = Number(btn.dataset.countDelta || 0);
  if (delta > 0 && currentTotal >= required) return;
  input.value = Math.max(0, Number(input.value || 0) + delta);
  const newTotal = inputs.reduce((sum, x) => sum + Number(x.value || 0), 0);
  const totalEl = document.querySelector(`[data-counter-total="${group}"]`);
  if (totalEl) totalEl.textContent = String(newTotal);
});


function activeSettingsTab() {
  return document.querySelector('.settings-tabs .tab.active')?.dataset.tab || 'products';
}
function updateSettingsResetButton() {
  const btn = document.getElementById('btnReset');
  if (!btn) return;
  const tab = activeSettingsTab();
  const labels = {
    products: 'Vider les boutons produits',
    foods: 'Effacer les aliments',
    stocks: 'Réinitialiser les stocks',
    volunteers: 'Effacer les bénévoles',
    orders: 'Effacer les commandes',
    report: 'Réinitialiser le bilan',
    general: "Réinitialiser toute l'application"
  };
  if (tab === 'export') { btn.style.display = 'none'; return; }
  btn.textContent = labels[tab] || 'Réinitialiser';
  btn.style.display = '';
}

function blankProductForSameSlot(p) {
  const group = p.group || displayGroup(p.category);
  const category = p.category || (group === 'Boissons' ? 'Boissons sans alcool' : (group === 'Consignes' ? 'Consigne' : 'Plat'));
  return {
    id: p.id || uid('p'),
    group,
    category,
    name: '',
    price: 0,
    type: 'simple',
    components: [],
    choices: [],
    menuSections: [],
    refundable: true,
    stock: ''
  };
}
function resetDraftProducts() {
  draftConfig.products = (draftConfig.products || []).map(blankProductForSameSlot);
  renderSettings();
  updateSettingsResetButton();
  showMessage('Boutons produits vidés', 'Les boutons produits sont maintenant vierges. Clique sur Enregistrer pour appliquer.');
}
function resetDraftFoods() {
  draftConfig.baseFoods = [];
  (draftConfig.products || []).forEach(p => {
    p.components = [];
    p.choices = [];
    p.menuSections = (p.menuSections || []).map(sec => ({ ...sec, options: (sec.options || []).map(opt => ({ productId: opt.productId, supplement: opt.supplement || 0 })) }));
  });
  renderSettings();
  updateSettingsResetButton();
  showMessage('Aliments effacés', 'La liste des aliments est vide. Clique sur Enregistrer pour appliquer.');
}
function resetDraftStocks() {
  (draftConfig.products || []).forEach(p => { p.stock = ''; });
  (draftConfig.baseFoods || []).forEach(f => { f.stock = ''; });
  renderStockEditor();
  showMessage('Stocks réinitialisés', 'Tous les stocks sont en non suivi. Clique sur Enregistrer pour appliquer.');
}
function resetDraftVolunteers() {
  draftConfig.volunteers = [];
  renderVolunteerEditor();
  showMessage('Bénévoles effacés', 'La liste des bénévoles est vide. Clique sur Enregistrer pour appliquer.');
}
function clearAllOrdersAndTickets() {
  // On conserve le bilan visible avant suppression, puis on efface seulement l'historique des commandes.
  reportArchive = visibleReportData();
  sales = [];
  lastTicketHtml = '';
  orderNumber = 1;
  saveReportState();
  saveSales();
  saveLastTicket();
  saveOrderNumber();
  renderSettingsOrders();
  renderSettingsReport();
  renderCart();
  showMessage('Commandes effacées', 'Les commandes ont été supprimées. Le bilan est conservé.');
}
function resetReportData() {
  // Le bilan repart à zéro sans supprimer la liste des commandes.
  reportArchive = null;
  reportResetAt = new Date().toISOString();
  saveReportState();
  renderSettingsReport();
  renderSettingsOrders();
  showMessage('Bilan réinitialisé', 'Le bilan est revenu à zéro. Les commandes sont conservées.');
}
function resetWholeApplication() {
  config = clone(DEFAULT_CONFIG);
  draftConfig = clone(DEFAULT_CONFIG);
  sales = [];
  reportArchive = null;
  reportResetAt = '';
  cart = [];
  paidCents = 0;
  orderNumber = 1;
  lastTicketHtml = '';
  saveConfig();
  saveReportState();
  saveSales();
  saveOrderNumber();
  saveLastTicket();
  renderSettings();
  renderProducts();
  renderCart();
  updatePayment();
  showMessage('Application réinitialisée', "L'application est revenue aux réglages par défaut.");
}
function handleSettingsReset() {
  const tab = activeSettingsTab();
  if (tab === 'products') {
    return showConfirm('Vider les boutons produits', 'Effacer le nom, le prix et les réglages de tous les boutons produits ? Les emplacements restent en place.', resetDraftProducts);
  }
  if (tab === 'foods') {
    return showConfirm('Effacer les aliments', 'Effacer tous les aliments de base ?', resetDraftFoods);
  }
  if (tab === 'stocks') {
    return showConfirm('Réinitialiser les stocks', 'Mettre tous les stocks en non suivi ? Aucun bouton ne sera bloqué.', resetDraftStocks);
  }
  if (tab === 'volunteers') {
    return showConfirm('Effacer les bénévoles', 'Effacer toute la liste des bénévoles ?', resetDraftVolunteers);
  }
  if (tab === 'orders') {
    return showConfirm('Effacer les commandes', 'Effacer toutes les commandes ? Cette action supprimera aussi le dernier ticket et remettra la numérotation à 1.', clearAllOrdersAndTickets);
  }
  if (tab === 'report') {
    return showConfirm('Réinitialiser le bilan', 'Réinitialiser le bilan ? Les ventes et remboursements enregistrés seront remis à zéro.', resetReportData);
  }
  if (tab === 'general') {
    return showConfirm('Réinitialiser toute l’application', 'Tout effacer et revenir aux paramètres par défaut ? Produits, aliments, stocks, bénévoles, commandes et bilan seront réinitialisés.', resetWholeApplication);
  }
}

document.getElementById('btnCloseChoice').addEventListener('click', () => document.getElementById('choiceDialog').close());
document.getElementById('btnAddChoiceProduct').addEventListener('click', addChoiceProduct);
document.getElementById('btnCloseSettings').addEventListener('click', () => document.getElementById('settingsDialog').close());
document.getElementById('btnSaveSettings').addEventListener('click', saveSettings);
document.getElementById('btnAddFood').addEventListener('click', () => { draftConfig.baseFoods.push({ id: uid('food'), name: 'Nouvel aliment', category: 'Viande', stock: '' }); renderSettings(); });
document.getElementById('btnAddVolunteer').addEventListener('click', () => { draftConfig.volunteers ||= []; draftConfig.volunteers.push({ id: uid('vol'), name: 'Nouveau bénévole', active: true }); renderVolunteerEditor(); });
document.getElementById('btnReset').addEventListener('click', handleSettingsReset);
document.querySelectorAll('.tab').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
  if (btn.dataset.tab === 'orders') renderSettingsOrders();
  if (btn.dataset.tab === 'report') renderSettingsReport();
  if (btn.dataset.tab === 'export') exportCsv();
  updateSettingsResetButton();
}));
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js');
renderProducts();
renderCart();


document.addEventListener('DOMContentLoaded',()=>{const b=document.getElementById('btnCloseSettingsBottom'); if(b){b.addEventListener('click',()=>document.getElementById('settingsDialog')?.close());}});
