const PRODUCTS = [
  { id: "eau50", name: "Eau 50 cl", price: 50, cat: "Boissons", stockable: true },
  { id: "eau150", name: "Eau 1,5 L", price: 150, cat: "Boissons", stockable: true },
  { id: "soft", name: "Soft canette", price: 200, cat: "Boissons", stockable: true },
  { id: "biere25", name: "Bière 25 cl", price: 250, cat: "Boissons", stockable: true },
  { id: "pichet", name: "Pichet bière 1 L", price: 900, cat: "Boissons", stockable: true },
  { id: "vin", name: "Verre de vin", price: 300, cat: "Boissons", stockable: true },
  { id: "btvin", name: "Bouteille vin", price: 1100, cat: "Boissons", stockable: true },
  { id: "cremant", name: "Bouteille crémant", price: 1300, cat: "Boissons", stockable: true },

  { id: "assiette", name: "Assiette gourmande", price: 700, cat: "Restauration", composite: "assiette" },
  { id: "frites", name: "Barquette frites", price: 250, cat: "Restauration", stockable: true },
  { id: "glace", name: "Glace", price: 200, cat: "Restauration", stockable: true },
  { id: "popcorn", name: "Popcorn", price: 100, cat: "Restauration", stockable: true },
  { id: "menu", name: "Menu", price: 1000, cat: "Restauration", composite: "menu" },

  { id: "consigne", name: "Consigne gobelet", price: 200, cat: "Consignes", stockable: true },
  { id: "retour", name: "Retour consigne", price: -200, cat: "Consignes" }
];

const STOCK_ITEMS = [
  { id: "saucisse", name: "Saucisse", cat: "Viandes" },
  { id: "merguez", name: "Merguez", cat: "Viandes" },
  ...PRODUCTS.filter(p => p.stockable).map(p => ({ id: p.id, name: p.name, cat: p.cat }))
];

let cart = [];
let receivedDigits = "";
let orders = JSON.parse(localStorage.getItem("moroges_orders") || "[]");
let stock = JSON.parse(localStorage.getItem("moroges_stock") || "{}");
for (const item of STOCK_ITEMS) if (!(item.id in stock)) stock[item.id] = "";

let currentChoiceProduct = null;
let choice = { saucisse: 0, merguez: 0, drink: "soft" };

const euro = cents => `${(cents / 100).toFixed(2).replace(".", ",")} €`;
const byId = id => document.getElementById(id);
const productById = id => PRODUCTS.find(p => p.id === id);
const stockItemById = id => STOCK_ITEMS.find(p => p.id === id) || productById(id) || { id, name: id };

function saveOrders() { localStorage.setItem("moroges_orders", JSON.stringify(orders)); }
function saveStock() { localStorage.setItem("moroges_stock", JSON.stringify(stock)); }
function stockValue(id) { const v = stock[id]; return v === "" || v === null || v === undefined ? null : Number(v); }
function getReceived() { return Number(receivedDigits || "0"); }
function getTotal() { return cart.reduce((sum, item) => sum + item.price * item.qty, 0); }

function getLineComponents(line) {
  if (line.type === "assiette") return { saucisse: line.meats.saucisse, merguez: line.meats.merguez };
  if (line.type === "menu") return { saucisse: line.meats.saucisse, merguez: line.meats.merguez, glace: 1, [line.drink]: 1 };
  return line.price >= 0 ? { [line.id]: 1 } : {};
}

function componentsInCart() {
  const used = {};
  cart.forEach(line => {
    const comps = getLineComponents(line);
    Object.entries(comps).forEach(([id, qty]) => used[id] = (used[id] || 0) + qty * line.qty);
  });
  return used;
}

function availableStock(id) {
  const current = stockValue(id);
  if (current === null) return null;
  return current - (componentsInCart()[id] || 0);
}

function checkComponents(components, multiplier = 1) {
  for (const [id, qty] of Object.entries(components)) {
    const available = availableStock(id);
    if (available !== null && available < qty * multiplier) return `${stockItemById(id).name} : stock insuffisant (${Math.max(0, available)} restant)`;
  }
  return "";
}

function canAddProduct(product) {
  if (product.composite) return true;
  if (product.price < 0) return true;
  const available = availableStock(product.id);
  return available === null || available > 0;
}

function addProduct(product) {
  if (product.composite) return openChoice(product);
  if (!canAddProduct(product)) return alert("Stock insuffisant pour ce produit.");
  const line = cart.find(item => item.id === product.id && !item.type);
  if (line) line.qty += 1;
  else cart.push({ id: product.id, name: product.name, price: product.price, qty: 1 });
  renderAll();
}

function makeCompositeLine(product) {
  const drinkName = choice.drink === "soft" ? "Soft" : choice.drink === "biere25" ? "Bière" : "Vin +0,50 €";
  const price = product.price + (product.composite === "menu" && choice.drink === "vin" ? 50 : 0);
  const meatText = `${choice.saucisse} saucisse / ${choice.merguez} merguez`;
  const sub = product.composite === "menu" ? `${meatText} · ${drinkName} · glace` : meatText;
  return {
    id: `${product.id}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    productId: product.id,
    type: product.composite,
    name: product.name,
    price,
    qty: 1,
    meats: { saucisse: choice.saucisse, merguez: choice.merguez },
    drink: product.composite === "menu" ? choice.drink : null,
    sub
  };
}

function openChoice(product) {
  currentChoiceProduct = product;
  choice = { saucisse: 0, merguez: 0, drink: "soft" };
  byId("choiceTitle").textContent = product.name;
  byId("drinkBlock").style.display = product.composite === "menu" ? "block" : "none";
  renderChoice();
  byId("choiceDialog").showModal();
}

function renderChoice() {
  byId("meatSaucisse").value = choice.saucisse;
  byId("meatMerguez").value = choice.merguez;
  document.querySelectorAll("[data-drink]").forEach(btn => btn.classList.toggle("selected", btn.dataset.drink === choice.drink));
  const totalMeats = choice.saucisse + choice.merguez;
  let warning = totalMeats === 2 ? "" : "Il faut choisir exactement 2 viandes.";
  if (!warning && currentChoiceProduct) warning = checkComponents(getLineComponents(makeCompositeLine(currentChoiceProduct)));
  byId("choiceWarning").textContent = warning;
}

function changeMeat(id, delta) {
  choice[id] = Math.max(0, Math.min(2, choice[id] + delta));
  if (choice.saucisse + choice.merguez > 2) {
    const other = id === "saucisse" ? "merguez" : "saucisse";
    choice[other] = Math.max(0, 2 - choice[id]);
  }
  renderChoice();
}

function addChoiceToCart() {
  if (!currentChoiceProduct) return;
  if (choice.saucisse + choice.merguez !== 2) return renderChoice();
  const line = makeCompositeLine(currentChoiceProduct);
  const error = checkComponents(getLineComponents(line));
  if (error) { byId("choiceWarning").textContent = error; return; }
  cart.push(line);
  byId("choiceDialog").close();
  renderAll();
}

function setQty(lineId, qty) {
  qty = Math.max(0, Math.min(999, Number(qty) || 0));
  const line = cart.find(item => item.id === lineId);
  if (!line) return;
  if (qty === 0) { cart = cart.filter(item => item.id !== lineId); renderAll(); return; }

  const oldQty = line.qty;
  line.qty = 0;
  const error = checkComponents(getLineComponents(line), qty);
  line.qty = oldQty;
  if (error) return alert(error);
  line.qty = qty;
  renderAll();
}
function changeQty(lineId, delta) { const line = cart.find(item => item.id === lineId); if (line) setQty(lineId, line.qty + delta); }

function renderProducts() {
  const root = byId("products");
  root.innerHTML = "";
  ["Boissons", "Restauration", "Consignes"].forEach(cat => {
    const section = document.createElement("section");
    section.className = "category";
    section.innerHTML = `<h3>${cat}</h3><div class="product-grid"></div>`;
    const grid = section.querySelector(".product-grid");
    PRODUCTS.filter(p => p.cat === cat).forEach(product => {
      const btn = document.createElement("button");
      const out = !canAddProduct(product) && !product.composite;
      btn.className = `product-btn ${product.price < 0 ? "negative" : ""} ${out ? "out" : ""}`;
      btn.disabled = out;
      const available = product.stockable ? availableStock(product.id) : null;
      const stockLabel = available === null ? "" : `<span class="stock-badge">Stock ${Math.max(0, available)}</span>`;
      btn.innerHTML = `<span class="name">${product.name}</span><span class="price">${euro(product.price)}${product.id === "menu" ? " + vin" : ""}</span>${stockLabel}`;
      btn.addEventListener("click", () => addProduct(product));
      grid.appendChild(btn);
    });
    root.appendChild(section);
  });
}

function renderCart() {
  const root = byId("cart");
  root.innerHTML = "";
  root.className = cart.length ? "cart" : "cart empty";
  if (!cart.length) { root.textContent = "Aucun article"; return; }
  cart.forEach(item => {
    const line = document.createElement("div");
    line.className = "cart-line";
    line.innerHTML = `
      <div><div class="line-name">${item.name}</div><div class="line-sub">${item.sub || `${euro(item.price)} / unité`}</div></div>
      <div class="qty-box"><button>−</button><div class="qty-num">${item.qty}</div><button>+</button></div>
      <div class="line-total">${euro(item.price * item.qty)}</div>`;
    const [minusBtn, plusBtn] = line.querySelectorAll("button");
    minusBtn.addEventListener("click", () => changeQty(item.id, -1));
    plusBtn.addEventListener("click", () => changeQty(item.id, 1));
    root.appendChild(line);
  });
}

function renderPayment() {
  const total = getTotal();
  const received = getReceived();
  byId("total").textContent = euro(total);
  byId("received").textContent = euro(received);
  byId("change").textContent = euro(Math.max(0, received - total));
}
function renderAll() { renderProducts(); renderCart(); renderPayment(); }

function renderStockList() {
  const root = byId("stockList");
  root.innerHTML = "";
  STOCK_ITEMS.forEach(item => {
    const row = document.createElement("div");
    row.className = "stock-row";
    const available = availableStock(item.id);
    row.innerHTML = `<div><strong>${item.name}</strong><span>${item.cat}${available === null ? "" : ` · dispo ${Math.max(0, available)}`}</span></div><input inputmode="numeric" pattern="[0-9]*" placeholder="Non suivi" value="${stock[item.id] ?? ""}">`;
    const input = row.querySelector("input");
    input.addEventListener("change", () => {
      const raw = input.value.trim();
      stock[item.id] = raw === "" ? "" : String(Math.max(0, Math.min(99999, Number(raw) || 0)));
      saveStock(); renderProducts(); renderStockList();
    });
    input.addEventListener("focus", () => input.select());
    root.appendChild(row);
  });
}

function finishOrder(payment) {
  const total = getTotal();
  if (!cart.length || total <= 0) return alert("Commande vide ou total invalide.");
  if (payment === "cash" && getReceived() < total) return alert("Montant reçu insuffisant.");

  const used = componentsInCart();
  for (const [id, qty] of Object.entries(used)) {
    const current = stockValue(id);
    if (current !== null && current < qty) return alert(`${stockItemById(id).name} : stock insuffisant`);
  }

  const order = {
    number: orders.length + 1,
    date: new Date().toISOString(),
    payment,
    total,
    received: payment === "cash" ? getReceived() : total,
    change: payment === "cash" ? Math.max(0, getReceived() - total) : 0,
    lines: cart.map(item => ({ ...item })),
    components: used
  };
  orders.push(order);
  Object.entries(used).forEach(([id, qty]) => {
    const current = stockValue(id);
    if (current !== null) stock[id] = String(Math.max(0, current - qty));
  });
  saveOrders(); saveStock();
  cart = []; receivedDigits = "";
  renderAll();
  alert(`Commande n°${order.number} enregistrée`);
}

function stats() {
  const cashTotal = orders.filter(o => o.payment === "cash").reduce((s, o) => s + o.total, 0);
  const cardTotal = orders.filter(o => o.payment === "card").reduce((s, o) => s + o.total, 0);
  const sold = {};
  const comps = {};
  orders.forEach(order => {
    order.lines.forEach(line => sold[line.name] = (sold[line.name] || 0) + line.qty);
    Object.entries(order.components || {}).forEach(([id, qty]) => comps[id] = (comps[id] || 0) + qty);
  });
  return { cashTotal, cardTotal, sold, comps };
}

function renderBilan() {
  const s = stats();
  const root = byId("bilanContent");
  const rows = Object.entries(s.sold).map(([name, qty]) => `<tr><td>${name}</td><td>${qty}</td><td></td></tr>`).join("");
  const compRows = Object.entries(s.comps).map(([id, qty]) => `<tr><td>${stockItemById(id).name}</td><td>${qty}</td><td>${stock[id] ?? ""}</td></tr>`).join("");
  root.innerHTML = `
    <div class="bilan-grid">
      <div class="mini-stat"><span>Commandes</span><strong>${orders.length}</strong></div>
      <div class="mini-stat"><span>Espèces</span><strong>${euro(s.cashTotal)}</strong></div>
      <div class="mini-stat"><span>CB</span><strong>${euro(s.cardTotal)}</strong></div>
      <div class="mini-stat"><span>Total</span><strong>${euro(s.cashTotal + s.cardTotal)}</strong></div>
    </div>
    <h3>Ventes par produit</h3><div class="bilan-table"><table><thead><tr><th>Produit</th><th>Vendu</th><th></th></tr></thead><tbody>${rows || "<tr><td>Aucune vente</td><td></td><td></td></tr>"}</tbody></table></div>
    <h3 style="margin-top:10px">Consommation stock</h3><div class="bilan-table"><table><thead><tr><th>Stock</th><th>Utilisé</th><th>Restant</th></tr></thead><tbody>${compRows || "<tr><td>Aucune consommation</td><td></td><td></td></tr>"}</tbody></table></div>`;
}

function exportCSV() {
  const rows = [["numero", "date", "paiement", "total_centimes", "recu_centimes", "monnaie_centimes", "produit", "details", "quantite", "prix_unitaire_centimes", "composants"]];
  orders.forEach(order => order.lines.forEach(line => {
    const comps = Object.entries(getLineComponents(line)).map(([id, qty]) => `${stockItemById(id).name}:${qty * line.qty}`).join(", ");
    rows.push([order.number, order.date, order.payment, order.total, order.received, order.change, line.name, line.sub || "", line.qty, line.price, comps]);
  }));
  const csv = rows.map(row => row.map(value => `"${String(value).replaceAll('"', '""')}"`).join(";")).join("\n");
  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `bilan-caisse-moroges-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click(); URL.revokeObjectURL(url);
}

function bindEvents() {
  byId("clearCartBtn").addEventListener("click", () => { cart = []; renderAll(); });
  byId("stockBtn").addEventListener("click", () => { renderStockList(); byId("stockDialog").showModal(); });
  byId("bilanBtn").addEventListener("click", () => { renderBilan(); byId("bilanDialog").showModal(); });
  byId("resetStockBtn").addEventListener("click", () => { if (confirm("Réinitialiser tous les stocks ?")) { STOCK_ITEMS.forEach(i => stock[i.id] = ""); saveStock(); renderStockList(); renderAll(); } });
  byId("resetOrdersBtn").addEventListener("click", () => { if (confirm("Effacer toutes les commandes ?")) { orders = []; saveOrders(); renderBilan(); } });
  byId("exportBtn").addEventListener("click", exportCSV);
  byId("cashPayBtn").addEventListener("click", () => finishOrder("cash"));
  byId("cardPayBtn").addEventListener("click", () => finishOrder("card"));
  byId("exactBtn").addEventListener("click", () => { receivedDigits = String(Math.max(0, getTotal())); renderPayment(); });
  byId("clearReceivedBtn").addEventListener("click", () => { receivedDigits = ""; renderPayment(); });
  byId("backBtn").addEventListener("click", () => { receivedDigits = receivedDigits.slice(0, -1); renderPayment(); });
  byId("fullscreenBtn").addEventListener("click", () => document.documentElement.requestFullscreen?.());
  document.querySelectorAll("[data-cash]").forEach(btn => btn.addEventListener("click", () => { receivedDigits = btn.dataset.cash; renderPayment(); }));
  byId("keypad").addEventListener("click", event => { const key = event.target.dataset.key; if (key) { receivedDigits = (receivedDigits + key).replace(/^0+/, "").slice(0, 6); renderPayment(); } });

  byId("meatSaucisseMinus").addEventListener("click", () => changeMeat("saucisse", -1));
  byId("meatSaucissePlus").addEventListener("click", () => changeMeat("saucisse", 1));
  byId("meatMerguezMinus").addEventListener("click", () => changeMeat("merguez", -1));
  byId("meatMerguezPlus").addEventListener("click", () => changeMeat("merguez", 1));
  byId("meatSaucisse").addEventListener("change", e => { choice.saucisse = Math.max(0, Math.min(2, Number(e.target.value) || 0)); renderChoice(); });
  byId("meatMerguez").addEventListener("change", e => { choice.merguez = Math.max(0, Math.min(2, Number(e.target.value) || 0)); renderChoice(); });
  document.querySelectorAll("[data-drink]").forEach(btn => btn.addEventListener("click", () => { choice.drink = btn.dataset.drink; renderChoice(); }));
  byId("addChoiceBtn").addEventListener("click", addChoiceToCart);

  document.addEventListener("gesturestart", event => event.preventDefault());
  document.addEventListener("dblclick", event => event.preventDefault(), { passive: false });
}

if ("serviceWorker" in navigator) window.addEventListener("load", () => navigator.serviceWorker.register("service-worker.js"));
renderProducts(); bindEvents(); renderAll();
