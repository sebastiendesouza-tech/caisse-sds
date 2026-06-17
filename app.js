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
  eventName: 'Manifestation',
  orderPrefix: 'A',
  ticketColor: 'black',
  categoryColors: {
    'Boissons sans alcool': 'bleu',
    'Boissons avec alcool': 'orange',
    'Boissons chaudes': 'jaune',
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
    { id: 'food-puree', name: 'Purée', category: 'Accompagnement', stock: '' }
  ],
  products: [
    { id: 'p1', group: 'Boissons', category: 'Boissons sans alcool', name: 'Eau', price: 1, type: 'simple', components: [], refundable: true, stock: '' },
    { id: 'p2', group: 'Boissons', category: 'Boissons sans alcool', name: 'Soda', price: 2, type: 'simple', components: [], refundable: true, stock: '' },
    { id: 'p3', group: 'Boissons', category: 'Boissons sans alcool', name: 'Jus de fruit', price: 2, type: 'simple', components: [], refundable: true, stock: '' },
    { id: 'p4', group: 'Boissons', category: 'Boissons sans alcool', name: '', price: 0, type: 'simple', components: [], refundable: true, stock: '' },
    { id: 'p5', group: 'Boissons', category: 'Boissons sans alcool', name: '', price: 0, type: 'simple', components: [], refundable: true, stock: '' },
    { id: 'p6', group: 'Boissons', category: 'Boissons sans alcool', name: '', price: 0, type: 'simple', components: [], refundable: true, stock: '' },
    { id: 'p7', group: 'Boissons', category: 'Boissons avec alcool', name: 'Bière', price: 3, type: 'simple', components: [], refundable: true, stock: '' },
    { id: 'p8', group: 'Boissons', category: 'Boissons avec alcool', name: 'Vin', price: 2.5, type: 'simple', components: [], refundable: true, stock: '' },
    { id: 'p9', group: 'Boissons', category: 'Boissons avec alcool', name: '', price: 0, type: 'simple', components: [], refundable: true, stock: '' },
    { id: 'p10', group: 'Boissons', category: 'Boissons avec alcool', name: '', price: 0, type: 'simple', components: [], refundable: true, stock: '' },
    { id: 'p11', group: 'Boissons', category: 'Boissons avec alcool', name: '', price: 0, type: 'simple', components: [], refundable: true, stock: '' },
    { id: 'p12', group: 'Boissons', category: 'Boissons chaudes', name: 'Café', price: 1, type: 'simple', components: [], refundable: true, stock: '' },
    { id: 'p13', group: 'Boissons', category: 'Boissons chaudes', name: 'Thé', price: 1, type: 'simple', components: [], refundable: true, stock: '' },
    { id: 'p14', group: 'Boissons', category: 'Boissons chaudes', name: '', price: 0, type: 'simple', components: [], refundable: true, stock: '' },
    { id: 'p15', group: 'Boissons', category: 'Boissons chaudes', name: '', price: 0, type: 'simple', components: [], refundable: true, stock: '' },
    { id: 'p16', group: 'Boissons', category: 'Boissons chaudes', name: '', price: 0, type: 'simple', components: [], refundable: true, stock: '' },
    { id: 'p17', group: 'Restauration', category: 'Entrée', name: 'Entrée', price: 5, type: 'simple', components: [], refundable: true, stock: '' },
    { id: 'p18', group: 'Restauration', category: 'Plat', name: 'Assiette 2 viandes frites', price: 8, type: 'compose', components: [], choices: [{ category: 'Viande', min: 2, max: 2, clientChoice: true, options: [{ foodId: 'food-saucisse', supplement: 0 }, { foodId: 'food-merguez', supplement: 0 }] }, { category: 'Accompagnement', min: 1, max: 1, clientChoice: false, options: [{ foodId: 'food-puree', supplement: 0 }] }], refundable: true, stock: '' },
    { id: 'p19', group: 'Restauration', category: 'Plat', name: '', price: 0, type: 'compose', components: [], choices: [], refundable: true, stock: '' },
    { id: 'p20', group: 'Restauration', category: 'Fromage', name: 'Fromage', price: 3, type: 'simple', components: [], refundable: true, stock: '' },
    { id: 'p21', group: 'Restauration', category: 'Dessert', name: 'Dessert', price: 3, type: 'simple', components: [], refundable: true, stock: '' },
    { id: 'p22', group: 'Restauration', category: 'Plat', name: '', price: 0, type: 'simple', components: [], refundable: true, stock: '' },
    { id: 'p23', group: 'Restauration', category: 'Plat', name: '', price: 0, type: 'simple', components: [], refundable: true, stock: '' },
    { id: 'p24', group: 'Restauration', category: 'Plat', name: '', price: 0, type: 'simple', components: [], refundable: true, stock: '' },
    { id: 'p25', group: 'Restauration', category: 'Plat', name: '', price: 0, type: 'simple', components: [], refundable: true, stock: '' },
    { id: 'p26', group: 'Restauration', category: 'Plat', name: '', price: 0, type: 'simple', components: [], refundable: true, stock: '' },
    { id: 'p27', group: 'Restauration', category: 'Dessert', name: '', price: 0, type: 'simple', components: [], refundable: true, stock: '' },
    { id: 'p28', group: 'Restauration', category: 'Dessert', name: '', price: 0, type: 'simple', components: [], refundable: true, stock: '' },
    { id: 'p29', group: 'Consignes', category: 'Consigne', name: 'Consigne gobelet', price: 1, type: 'simple', components: [], refundable: true, stock: '' },
    { id: 'p30', group: 'Consignes', category: 'Retour consigne', name: 'Retour gobelet', price: -1, type: 'simple', components: [], refundable: false, stock: '' }
  ]
};

const GROUP_ORDER = ['Boissons', 'Restauration', 'Consignes'];
const CATEGORIES = ['Boissons sans alcool', 'Boissons avec alcool', 'Boissons chaudes', 'Entrée', 'Plat', 'Fromage', 'Dessert', 'Consigne', 'Retour consigne'];
let config = normalizeConfig(JSON.parse(localStorage.getItem('caisse_config') || 'null') || DEFAULT_CONFIG);
let draftConfig = null;
let cart = [];
let paymentMethod = 'Espèces';
let paidCents = 0;
let orderNumber = Number(localStorage.getItem('caisse_order_number') || '1');
let sales = JSON.parse(localStorage.getItem('caisse_sales') || '[]');
let pendingChoiceProduct = null;

const fmt = n => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n || 0);
const total = () => cart.reduce((sum, item) => sum + item.price * item.qty, 0);
const paidAmount = () => paidCents / 100;
function uid(prefix) { return prefix + '-' + Math.random().toString(36).slice(2, 8); }
function saveConfig() { localStorage.setItem('caisse_config', JSON.stringify(config)); }
function saveSales() { localStorage.setItem('caisse_sales', JSON.stringify(sales)); }
function saveOrderNumber() { localStorage.setItem('caisse_order_number', String(orderNumber)); }
function clone(obj) { return JSON.parse(JSON.stringify(obj)); }

function normalizeConfig(c) {
  const base = clone(DEFAULT_CONFIG);
  if (!c) return base;
  if (Array.isArray(c.products) && c.products[0] && !c.products[0].id) {
    c.products = c.products.map((p, i) => ({ id: 'p' + (i + 1), group: displayGroup(p.category), category: p.category || 'Plat', name: p.name || '', price: Number(p.price || 0), type: 'simple', components: [], refundable: true, stock: '' }));
  }
  c.eventName ||= base.eventName;
  c.orderPrefix ||= 'A';
  c.ticketColor ||= 'black';
  c.baseFoods ||= base.baseFoods;
  c.categoryColors ||= base.categoryColors;
  c.products ||= base.products;
  c.products.forEach((p, i) => { p.id ||= 'p' + (i + 1); p.group ||= displayGroup(p.category); p.type ||= 'simple'; p.components ||= []; p.choices ||= []; p.menuSections ||= []; p.refundable = p.refundable !== false; p.stock ??= ''; });
  c.baseFoods.forEach(f => { f.id ||= uid('food'); f.category ||= 'Viande'; f.stock ??= ''; });
  return c;
}

function displayGroup(cat) {
  if (String(cat).startsWith('Boissons')) return 'Boissons';
  if (String(cat).includes('Consigne') || String(cat).includes('consigne')) return 'Consignes';
  return 'Restauration';
}
function groupClass(group) { return 'group-' + slug(group); }
function slug(s) { return String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
function escapeHtml(str) { return String(str).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
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

function renderProducts() {
  document.getElementById('eventName').textContent = config.eventName;
  document.documentElement.style.setProperty('--ticket-color', config.ticketColor);
  const wrap = document.getElementById('categories');
  const groups = {};
  config.products.forEach(p => (groups[p.group || displayGroup(p.category)] ||= []).push(p));
  wrap.innerHTML = GROUP_ORDER.map(group => {
    const products = groups[group] || [];
    return `<div class="category ${groupClass(group)}"><h3>${group}</h3><div class="product-grid">${products.map(productButtonHtml).join('')}</div></div>`;
  }).join('');
  document.querySelectorAll('.product-btn:not(.empty-product):not(.out-stock)').forEach(btn => btn.addEventListener('click', () => addProduct(btn.dataset.id)));
}
function productButtonHtml(p) {
  const col = colorFor(p.category);
  const style = `background:${col.bg};color:${col.fg}`;
  if (!p.name) return `<button class="product-btn empty-product" style="${style}" disabled><strong>Libre</strong><span>A paramétrer</span></button>`;
  const out = !stockAvailable(p);
  return `<button class="product-btn ${out ? 'out-stock' : ''}" style="${style}" data-id="${p.id}" ${out ? 'disabled' : ''}><strong>${escapeHtml(p.name)}</strong><span>${fmt(p.price)}${out ? ' - rupture' : ''}</span></button>`;
}
function addProduct(id) {
  const p = config.products.find(x => x.id === id);
  if (!p || !p.name) return;
  if (p.type === 'compose' && (p.choices || []).length) return openChoiceDialog(p);
  if (p.type === 'menu' && (p.menuSections || []).length) return openMenuDialog(p);
  addCartLine({ id: p.id, name: p.name, price: p.price, qty: 1, refundable: p.refundable, selectedFoods: [] });
}
function addCartLine(lineData) {
  const key = lineData.id + '|' + (lineData.selectedFoods || []).map(x => x.foodId).sort().join(',') + '|' + lineData.price;
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
    list.innerHTML = cart.map((item, index) => `<div class="cart-line"><div><div class="cart-name">${escapeHtml(item.name)}</div>${item.detail ? `<div class="cart-detail">${escapeHtml(item.detail)}</div>` : ''}<div class="cart-unit">${fmt(item.price)} / unité</div></div><div class="qty-actions"><button data-action="minus" data-index="${index}">-</button><span class="qty-value">${item.qty}</span><button data-action="plus" data-index="${index}">+</button><button data-action="delete" data-index="${index}">x</button></div><div class="cart-total">${fmt(item.qty * item.price)}</div></div>`).join('');
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
function pressKey(key) { if (key === 'clear') paidCents = 0; else if (key === 'back') paidCents = Math.floor(paidCents / 10); else paidCents = Math.min(999999, paidCents * 10 + Number(key)); updatePayment(); }
function setQuickAmount(amount) { paidCents = Math.round(amount * 100); updatePayment(); }
function payAndPrint(method) { if (!cart.length) return alert('Commande vide'); paymentMethod = method; if (method === 'CB') paidCents = Math.round(total() * 100); if (method === 'Espèces' && paidAmount() < total()) return alert('Le montant payé est inférieur au total dû.'); updatePayment(); validateSale(); }

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
  cart.forEach(i => { if (i.price >= 0) { consumeProduct(i.id, i.qty); (i.selectedProducts || []).forEach(pid => consumeProduct(pid, i.qty)); (i.selectedFoods || []).forEach(sel => { const food = config.baseFoods.find(f => f.id === sel.foodId); if (food && isTracked(food.stock)) food.stock = Math.max(0, Number(food.stock) - i.qty); }); } });
  saveConfig();
}
function buildTicket() {
  const number = `${config.orderPrefix}${String(orderNumber).padStart(4, '0')}`;
  const lines = cart.map(item => {
    const marker = item.qty > 5 ? '<span class="remaining-line"></span>' : Array.from({ length: Math.max(0, item.qty) }, () => '☐').join(' ');
    return `<div class="ticket-line"><div>${item.qty}</div><div class="ticket-product">${escapeHtml(item.name)}</div><div class="checks">${marker}</div><div class="ticket-price">${fmt(item.qty * item.price)}</div></div>`;
  }).join('');
  document.getElementById('printArea').innerHTML = `<div class="ticket-title">Commande n° ${number}</div>${lines}<div class="ticket-bottom">Paiement : ${paymentMethod}</div><div class="ticket-bottom">Total : ${fmt(total())}</div>`;
}
function validateSale() {
  buildTicket();
  sales.push({ kind: 'sale', orderNumber: `${config.orderPrefix}${String(orderNumber).padStart(4, '0')}`, date: new Date().toISOString(), paymentMethod, paid: paidAmount(), change: Math.max(0, paidAmount() - total()), total: total(), items: clone(cart), refunds: [] });
  consumeStock();
  saveSales();
  window.print();
  orderNumber += 1; saveOrderNumber(); cart = []; paidCents = 0; renderProducts(); renderCart();
}
function exportCsv() {
  const rows = [['type','commande','date','paiement','paye','rendu','produit','quantite','prix_unitaire','total_ligne','total_commande','motif']];
  sales.forEach(s => (s.items || []).forEach(i => rows.push([s.kind || 'sale', s.orderNumber, s.date, s.paymentMethod, s.paid || '', s.change || '', i.name, i.qty, i.price, i.qty * i.price, s.total, s.reason || ''])));
  const csv = rows.map(r => r.map(v => `"${String(v).replaceAll('"','""')}"`).join(';')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'ventes-caisse.csv'; a.click();
}


function openChoiceDialog(product) {
  pendingChoiceProduct = product;
  document.getElementById('choiceTitle').textContent = product.name;
  document.getElementById('choiceBody').innerHTML = (product.choices || []).map((choice, ci) => {
    const foods = (choice.options || []).map(opt => ({ opt, food: config.baseFoods.find(f => f.id === opt.foodId) })).filter(x => x.food);
    const count = choice.max || 0;
    return `<div class="choice-block"><h3>${choice.category} ${choice.clientChoice ? `(choisir ${count})` : ''}</h3>${foods.map(({ opt, food }) => `<label class="choice-option"><input type="checkbox" data-choice-select="${ci}" data-food-id="${food.id}" ${!choice.clientChoice ? 'checked disabled' : ''}> <span>${escapeHtml(food.name)}</span> ${opt.supplement ? `<strong>+${fmt(opt.supplement)}</strong>` : ''}</label>`).join('')}</div>`;
  }).join('');
  document.getElementById('choiceDialog').showModal();
}
function addChoiceProduct() {
  const p = pendingChoiceProduct; if (!p) return;
  if (p.type === 'menu') return addMenuProduct();
  let selectedFoods = [], supplements = 0, details = [];
  for (let ci = 0; ci < (p.choices || []).length; ci++) {
    const choice = p.choices[ci], required = choice.max || 0;
    const checked = Array.from(document.querySelectorAll(`[data-choice-select="${ci}"]:checked`)).map(x => x.dataset.foodId);
    if (choice.clientChoice && checked.length !== required) return alert(`Il faut choisir ${required} ${choice.category.toLowerCase()}.`);
    checked.forEach(foodId => { const opt = (choice.options || []).find(o => o.foodId === foodId); const food = config.baseFoods.find(f => f.id === foodId); if (food) { selectedFoods.push({ foodId, name: food.name }); details.push(food.name); supplements += Number(opt?.supplement || 0); } });
  }
  addCartLine({ id: p.id, name: p.name, detail: details.join(' + '), price: Number(p.price || 0) + supplements, qty: 1, refundable: p.refundable, selectedFoods });
  document.getElementById('choiceDialog').close();
  pendingChoiceProduct = null;
}
function renderComposeChoiceHtml(product, prefix) {
  return (product.choices || []).map((choice, ci) => {
    const foods = (choice.options || []).map(opt => ({ opt, food: config.baseFoods.find(f => f.id === opt.foodId) })).filter(x => x.food);
    const count = choice.max || 0;
    return `<div class="nested-choice"><strong>${choice.category} ${choice.clientChoice ? `(choisir ${count})` : ''}</strong>${foods.map(({ opt, food }) => `<label class="choice-option"><input type="checkbox" data-compose-choice="${prefix}-${ci}" data-food-id="${food.id}" ${!choice.clientChoice ? 'checked disabled' : ''}> ${escapeHtml(food.name)} ${opt.supplement ? `<strong>+${fmt(opt.supplement)}</strong>` : ''}</label>`).join('')}</div>`;
  }).join('');
}
function collectComposeChoices(product, prefix) {
  let selectedFoods = [], supplements = 0, detailParts = [];
  for (let ci = 0; ci < (product.choices || []).length; ci++) {
    const choice = product.choices[ci], required = choice.max || 0;
    const checked = Array.from(document.querySelectorAll(`[data-compose-choice="${prefix}-${ci}"]:checked`)).map(x => x.dataset.foodId);
    if (choice.clientChoice && checked.length !== required) throw new Error(`Il faut choisir ${required} ${choice.category.toLowerCase()} pour ${product.name}.`);
    checked.forEach(foodId => {
      const opt = (choice.options || []).find(o => o.foodId === foodId);
      const food = config.baseFoods.find(f => f.id === foodId);
      if (food) { selectedFoods.push({ foodId, name: food.name }); detailParts.push(food.name); supplements += Number(opt?.supplement || 0); }
    });
  }
  return { selectedFoods, supplements, detail: detailParts.join(' + ') };
}
function openMenuDialog(product) {
  pendingChoiceProduct = product;
  document.getElementById('choiceTitle').textContent = product.name;
  document.getElementById('choiceBody').innerHTML = (product.menuSections || []).map((section, si) => {
    const opts = (section.options || []).map(opt => ({ opt, product: config.products.find(p => p.id === opt.productId) })).filter(x => x.product);
    const required = section.max || 1;
    return `<div class="choice-block"><h3>${section.section} ${section.clientChoice ? `(choisir ${required})` : ''}</h3>${opts.map(({ opt, product }, oi) => `<label class="choice-option"><input type="checkbox" data-menu-select="${si}" data-product-id="${product.id}" data-menu-opt="${si}-${oi}" ${!section.clientChoice ? 'checked disabled' : ''}> <span>${escapeHtml(product.name)}</span> ${opt.supplement ? `<strong>+${fmt(opt.supplement)}</strong>` : ''}</label>${product.type === 'compose' ? renderComposeChoiceHtml(product, `menu-${si}-${oi}`) : ''}`).join('')}</div>`;
  }).join('');
  document.getElementById('choiceDialog').showModal();
}
function addMenuProduct() {
  const p = pendingChoiceProduct; if (!p) return;
  let selectedFoods = [], selectedProducts = [], supplements = 0, details = [];
  try {
    for (let si = 0; si < (p.menuSections || []).length; si++) {
      const section = p.menuSections[si], required = section.max || 1;
      const checkedInputs = Array.from(document.querySelectorAll(`[data-menu-select="${si}"]:checked`));
      if (section.clientChoice && checkedInputs.length !== required) return alert(`Il faut choisir ${required} produit(s) pour ${section.section}.`);
      checkedInputs.forEach(input => {
        const product = config.products.find(prod => prod.id === input.dataset.productId);
        const opt = (section.options || []).find(o => o.productId === input.dataset.productId);
        if (!product) return;
        selectedProducts.push(product.id);
        let detail = `${section.section}: ${product.name}`;
        supplements += Number(opt?.supplement || 0);
        if (product.type === 'compose') {
          const oi = (section.options || []).findIndex(o => o.productId === input.dataset.productId);
          const nested = collectComposeChoices(product, `menu-${si}-${oi}`);
          selectedFoods.push(...nested.selectedFoods);
          supplements += nested.supplements;
          if (nested.detail) detail += ` (${nested.detail})`;
        }
        details.push(detail);
      });
    }
  } catch (err) { return alert(err.message); }
  addCartLine({ id: p.id, name: p.name, detail: details.join(' / '), price: Number(p.price || 0) + supplements, qty: 1, refundable: p.refundable, selectedFoods, selectedProducts });
  document.getElementById('choiceDialog').close();
  pendingChoiceProduct = null;
}

function openSettings() { draftConfig = clone(config); renderSettings(); document.getElementById('settingsDialog').showModal(); }
function renderSettings() { renderProductEditor(); renderFoodEditor(); renderStockEditor(); renderGeneralEditor(); }
function renderProductEditor() {
  const el = document.getElementById('productEditor');
  el.innerHTML = draftConfig.products.map((p, i) => {
    const detail = p.type === 'compose' ? renderChoiceEditor(p, i) : (p.type === 'menu' ? renderMenuEditor(p, i) : '');
    return `<div class="product-edit-card"><div class="editor-row product-main"><div><small>Nom</small><input data-product="name" data-i="${i}" value="${escapeHtml(p.name)}"></div><div><small>Prix de base</small><input type="number" step="0.01" data-product="price" data-i="${i}" value="${p.price}"></div><div><small>Type</small><select data-product="type" data-i="${i}"><option value="simple" ${p.type === 'simple' ? 'selected' : ''}>produit simple</option><option value="compose" ${p.type === 'compose' ? 'selected' : ''}>produit composé</option><option value="menu" ${p.type === 'menu' ? 'selected' : ''}>menu</option></select></div><div><small>Catégorie</small><select data-product="category" data-i="${i}">${options(CATEGORIES, p.category)}</select></div><div class="checkline"><input type="checkbox" data-product="refundable" data-i="${i}" ${p.refundable ? 'checked' : ''}> Remboursable</div></div>${detail}</div>`;
  }).join('');
  el.querySelectorAll('[data-product]').forEach(x => x.addEventListener('change', updateProductDraft));
  el.querySelectorAll('[data-choice-field]').forEach(x => x.addEventListener('change', updateChoiceDraft));
  el.querySelectorAll('[data-menu-field]').forEach(x => x.addEventListener('change', updateMenuDraft));
}
function renderChoiceEditor(p, i) {
  const groups = ['Viande', 'Accompagnement'];
  return `<div class="choice-edit"><h4>Réglage produit composé</h4>${groups.map(cat => {
    let choice = (p.choices || []).find(c => c.category === cat) || { category: cat, min: 0, max: 0, clientChoice: false, options: [] };
    const foods = draftConfig.baseFoods.filter(f => f.category === cat);
    return `<div><h4>${cat}</h4><div class="choice-rules"><label><input type="checkbox" data-choice-field="clientChoice" data-i="${i}" data-cat="${cat}" ${choice.clientChoice ? 'checked' : ''}> Choix laissé au client</label><label>Nombre à choisir <input type="number" min="0" data-choice-field="max" data-i="${i}" data-cat="${cat}" value="${choice.max || 0}"></label></div>${foods.map(f => { const opt = (choice.options || []).find(o => o.foodId === f.id); return `<div class="option-line"><label><input type="checkbox" data-choice-field="option" data-i="${i}" data-cat="${cat}" data-food-id="${f.id}" ${opt ? 'checked' : ''}> ${escapeHtml(f.name)}</label><label>Supplément <input type="number" step="0.01" data-choice-field="supplement" data-i="${i}" data-cat="${cat}" data-food-id="${f.id}" value="${opt?.supplement || 0}"></label></div>`; }).join('')}</div>`;
  }).join('')}</div>`;
}
function renderMenuEditor(p, i) {
  const sections = ['Entrée', 'Plat', 'Fromage', 'Dessert'];
  return `<div class="menu-edit"><h4>Réglage menu</h4><p class="hint">Chaque rubrique peut être fixe ou laissée au choix du client. Le plat peut être un produit simple ou un produit composé déjà paramétré.</p>${sections.map(section => {
    let cfg = (p.menuSections || []).find(c => c.section === section) || { section, clientChoice: false, max: 1, options: [] };
    const candidates = draftConfig.products.filter(prod => prod.id !== p.id && prod.name && prod.category === section);
    return `<div class="menu-section"><h4>${section}</h4><div class="menu-rules"><label><input type="checkbox" data-menu-field="clientChoice" data-i="${i}" data-section="${section}" ${cfg.clientChoice ? 'checked' : ''}> Choix laissé au client</label><label>Nombre à choisir <input type="number" min="0" data-menu-field="max" data-i="${i}" data-section="${section}" value="${cfg.max || 1}"></label></div>${candidates.length ? candidates.map(prod => { const opt = (cfg.options || []).find(o => o.productId === prod.id); return `<div class="option-line"><label><input type="checkbox" data-menu-field="option" data-i="${i}" data-section="${section}" data-product-id="${prod.id}" ${opt ? 'checked' : ''}> ${escapeHtml(prod.name)} <small>(${prod.type === 'compose' ? 'composé' : 'simple'})</small></label><label>Supplément <input type="number" step="0.01" data-menu-field="supplement" data-i="${i}" data-section="${section}" data-product-id="${prod.id}" value="${opt?.supplement || 0}"></label></div>`; }).join('') : '<p class="hint">Aucun produit dans cette catégorie.</p>'}</div>`;
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
function renderStockEditor() {
  const el = document.getElementById('stockEditor');
  const productRows = draftConfig.products.filter(p => p.name && p.type === 'simple').map(p => ({ kind: 'product', id: p.id, label: 'Produit simple - ' + p.name, value: p.stock }));
  const foodRows = draftConfig.baseFoods.map(f => ({ kind: 'food', id: f.id, label: 'Aliment - ' + f.name, value: f.stock }));
  el.innerHTML = [...productRows, ...foodRows].map(r => `<div class="editor-row stock"><div>${escapeHtml(r.label)}</div><input placeholder="vide = pas de suivi" data-stock-kind="${r.kind}" data-stock-id="${r.id}" value="${r.value ?? ''}"></div>`).join('');
  el.querySelectorAll('[data-stock-kind]').forEach(x => x.addEventListener('change', e => { const kind = e.currentTarget.dataset.stockKind, id = e.currentTarget.dataset.stockId; const obj = kind === 'product' ? draftConfig.products.find(p => p.id === id) : draftConfig.baseFoods.find(f => f.id === id); obj.stock = e.currentTarget.value.trim(); }));
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
  draftConfig.eventName = document.getElementById('setEventName').value.trim() || 'Manifestation';
  draftConfig.orderPrefix = document.getElementById('setPrefix').value;
  draftConfig.ticketColor = document.getElementById('setTicketColor').value;
  config = normalizeConfig(draftConfig); saveConfig(); renderProducts(); renderCart(); document.getElementById('settingsDialog').close();
}


let refundSaleIndex = null;
function saleTotal(s) { return Number(s.total || 0); }
function refundAmountForSale(orderNumber) { return sales.filter(x => x.kind === 'refund' && x.originalOrderNumber === orderNumber).reduce((sum, r) => sum + Math.abs(Number(r.total || 0)), 0); }
function netSaleTotal(s) { return saleTotal(s) - refundAmountForSale(s.orderNumber); }
function formatDate(iso) { try { return new Date(iso).toLocaleString('fr-FR'); } catch { return iso || ''; } }
function paymentTotals() {
  return sales.reduce((acc, s) => {
    const method = s.paymentMethod || 'Inconnu';
    acc[method] ||= 0;
    acc[method] += Number(s.total || 0);
    return acc;
  }, {});
}
function openReport() {
  const totals = paymentTotals();
  const gross = sales.filter(s => (s.kind || 'sale') === 'sale').reduce((a,s)=>a+Number(s.total||0),0);
  const refunds = sales.filter(s => s.kind === 'refund').reduce((a,s)=>a+Math.abs(Number(s.total||0)),0);
  const net = gross - refunds;
  const productMap = {};
  sales.forEach(s => (s.items || []).forEach(i => {
    productMap[i.name] ||= { qty: 0, total: 0 };
    productMap[i.name].qty += Number(i.qty || 0);
    productMap[i.name].total += Number(i.qty || 0) * Number(i.price || 0);
  }));
  const productRows = Object.entries(productMap).sort((a,b)=>Math.abs(b[1].total)-Math.abs(a[1].total)).map(([name,v]) => `<tr><td>${escapeHtml(name)}</td><td>${v.qty}</td><td>${fmt(v.total)}</td></tr>`).join('');
  document.getElementById('reportContent').innerHTML = `<div class="report-cards"><div><strong>Ventes brutes</strong><span>${fmt(gross)}</span></div><div><strong>Remboursements</strong><span>${fmt(refunds)}</span></div><div><strong>Total net</strong><span>${fmt(net)}</span></div><div><strong>Commandes</strong><span>${sales.filter(s => (s.kind || 'sale') === 'sale').length}</span></div></div><h3>Par paiement</h3><table class="data-table"><tbody>${Object.entries(totals).map(([k,v])=>`<tr><td>${escapeHtml(k)}</td><td>${fmt(v)}</td></tr>`).join('')}</tbody></table><h3>Par produit</h3><table class="data-table"><thead><tr><th>Produit</th><th>Qté</th><th>Total</th></tr></thead><tbody>${productRows || '<tr><td colspan="3">Aucune vente</td></tr>'}</tbody></table>`;
  document.getElementById('reportDialog').showModal();
}
function openOrders() {
  const saleRows = sales.map((s, idx) => {
    const isRefund = s.kind === 'refund';
    const items = (s.items || []).map(i => `${i.qty} x ${escapeHtml(i.name)} (${fmt(i.qty * i.price)})`).join('<br>');
    const refundInfo = !isRefund ? `<div class="hint">Déjà remboursé : ${fmt(refundAmountForSale(s.orderNumber))} / Net : ${fmt(netSaleTotal(s))}</div>` : `<div class="hint">Remboursement de ${escapeHtml(s.originalOrderNumber || '')} - ${escapeHtml(s.reason || '')}</div>`;
    const btn = (!isRefund && netSaleTotal(s) > 0) ? `<button class="danger" data-refund-sale="${idx}">Rembourser</button>` : '';
    return `<div class="order-card ${isRefund ? 'refund-card' : ''}"><div><strong>${isRefund ? 'Remboursement' : 'Commande'} n° ${escapeHtml(s.orderNumber)}</strong><span>${formatDate(s.date)}</span></div><div>${items}</div><div class="order-bottom"><b>${fmt(s.total)}</b><span>${escapeHtml(s.paymentMethod || '')}</span>${btn}</div>${refundInfo}</div>`;
  }).reverse().join('');
  document.getElementById('ordersList').innerHTML = saleRows || '<p>Aucune commande enregistrée.</p>';
  document.querySelectorAll('[data-refund-sale]').forEach(b => b.addEventListener('click', e => openRefund(Number(e.currentTarget.dataset.refundSale))));
  document.getElementById('ordersDialog').showModal();
}
function openRefund(index) {
  refundSaleIndex = index;
  const s = sales[index];
  document.getElementById('refundTitle').textContent = `Remboursement commande n° ${s.orderNumber}`;
  document.getElementById('refundLines').innerHTML = (s.items || []).filter(i => i.refundable !== false && i.price > 0).map((i, lineIndex) => `<div class="editor-row refund-row"><div><strong>${escapeHtml(i.name)}</strong><small>${fmt(i.price)} / unité - acheté : ${i.qty}</small></div><input type="number" min="0" max="${i.qty}" value="0" data-refund-line="${lineIndex}"></div>`).join('') || '<p>Aucun produit remboursable dans cette commande.</p>';
  document.querySelectorAll('[data-refund-line]').forEach(x => x.addEventListener('input', updateRefundTotal));
  document.getElementById('refundReason').value = '';
  document.getElementById('refundMethod').value = s.paymentMethod || 'Espèces';
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
  if (!items.length) return alert('Choisis au moins un produit à rembourser.');
  const refundTotal = items.reduce((sum, i) => sum + i.qty * i.price, 0);
  const refundOrderNumber = `R-${original.orderNumber}-${Date.now().toString().slice(-4)}`;
  sales.push({ kind: 'refund', orderNumber: refundOrderNumber, originalOrderNumber: original.orderNumber, date: new Date().toISOString(), paymentMethod: document.getElementById('refundMethod').value, paid: refundTotal, change: 0, total: refundTotal, reason: document.getElementById('refundReason').value.trim(), items });
  saveSales();
  document.getElementById('refundDialog').close();
  openOrders();
}

document.querySelectorAll('[data-key]').forEach(btn => btn.addEventListener('click', () => pressKey(btn.dataset.key)));
document.querySelectorAll('[data-quick]').forEach(btn => btn.addEventListener('click', () => setQuickAmount(Number(btn.dataset.quick))));
document.getElementById('btnExact').addEventListener('click', () => setQuickAmount(total()));
document.querySelectorAll('.pay').forEach(btn => btn.addEventListener('click', () => payAndPrint(btn.dataset.method)));
document.getElementById('btnPrintTicket').addEventListener('click', () => { if (cart.length) { buildTicket(); window.print(); } });
document.getElementById('btnClear').addEventListener('click', () => { cart = []; paidCents = 0; renderCart(); });
document.getElementById('btnExport').addEventListener('click', exportCsv);
document.getElementById('btnOrders').addEventListener('click', openOrders);
document.getElementById('btnReport').addEventListener('click', openReport);
document.getElementById('btnCloseOrders').addEventListener('click', () => document.getElementById('ordersDialog').close());
document.getElementById('btnCloseReport').addEventListener('click', () => document.getElementById('reportDialog').close());
document.getElementById('btnCloseRefund').addEventListener('click', () => document.getElementById('refundDialog').close());
document.getElementById('btnValidateRefund').addEventListener('click', validateRefund);
document.getElementById('btnSettings').addEventListener('click', openSettings);
document.getElementById('btnCloseChoice').addEventListener('click', () => document.getElementById('choiceDialog').close());
document.getElementById('btnAddChoiceProduct').addEventListener('click', addChoiceProduct);
document.getElementById('btnCloseSettings').addEventListener('click', () => document.getElementById('settingsDialog').close());
document.getElementById('btnSaveSettings').addEventListener('click', saveSettings);
document.getElementById('btnAddFood').addEventListener('click', () => { draftConfig.baseFoods.push({ id: uid('food'), name: 'Nouvel aliment', category: 'Viande', stock: '' }); renderSettings(); });
document.getElementById('btnReset').addEventListener('click', () => { if (confirm('Réinitialiser tous les paramètres ?')) { draftConfig = clone(DEFAULT_CONFIG); renderSettings(); } });
document.querySelectorAll('.tab').forEach(btn => btn.addEventListener('click', () => { document.querySelectorAll('.tab').forEach(b => b.classList.remove('active')); document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active')); btn.classList.add('active'); document.getElementById('tab-' + btn.dataset.tab).classList.add('active'); }));
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js');
renderProducts();
renderCart();
