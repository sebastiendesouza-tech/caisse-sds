const PRODUCTS = [
  { id: "eau50", name: "Eau 50 cl", price: 50, cat: "Boissons" },
  { id: "eau150", name: "Eau 1,5 L", price: 150, cat: "Boissons" },
  { id: "soft", name: "Soft canette", price: 200, cat: "Boissons" },
  { id: "biere25", name: "Bière 25 cl", price: 250, cat: "Boissons" },
  { id: "pichet", name: "Pichet bière 1 L", price: 900, cat: "Boissons" },
  { id: "vin", name: "Verre de vin", price: 300, cat: "Boissons" },
  { id: "btvin", name: "Bouteille vin", price: 1100, cat: "Boissons" },
  { id: "cremant", name: "Bouteille crémant", price: 1300, cat: "Boissons" },
  { id: "assiette", name: "Assiette gourmande", price: 700, cat: "Restauration" },
  { id: "frites", name: "Barquette frites", price: 250, cat: "Restauration" },
  { id: "glace", name: "Glace", price: 200, cat: "Restauration" },
  { id: "popcorn", name: "Popcorn", price: 100, cat: "Restauration" },
  { id: "menu", name: "Menu", price: 1000, cat: "Restauration" },
  { id: "supvin", name: "Supplément vin", price: 50, cat: "Restauration" },
  { id: "consigne", name: "Consigne gobelet", price: 200, cat: "Consignes" },
  { id: "retour", name: "Retour consigne", price: -200, cat: "Consignes" }
];

let cart = [];
let receivedDigits = "";
let orders = JSON.parse(localStorage.getItem("moroges_orders") || "[]");
let stock = JSON.parse(localStorage.getItem("moroges_stock") || "{}");
for (const product of PRODUCTS) {
  if (!(product.id in stock)) stock[product.id] = "";
}

const euro = cents => `${(cents / 100).toFixed(2).replace(".", ",")} €`;
const byId = id => document.getElementById(id);

function saveOrders() {
  localStorage.setItem("moroges_orders", JSON.stringify(orders));
}
function saveStock() {
  localStorage.setItem("moroges_stock", JSON.stringify(stock));
}
function stockValue(productId) {
  const value = stock[productId];
  return value === "" || value === null || value === undefined ? null : Number(value);
}
function cartQty(productId) {
  const line = cart.find(item => item.id === productId);
  return line ? line.qty : 0;
}
function availableStock(productId) {
  const current = stockValue(productId);
  return current === null ? null : current - cartQty(productId);
}
function canAddProduct(product) {
  const available = availableStock(product.id);
  return available === null || available > 0 || product.price < 0;
}

function getTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getReceived() {
  return Number(receivedDigits || "0");
}

function renderProducts() {
  const root = byId("products");
  root.innerHTML = "";
  const categories = ["Boissons", "Restauration", "Consignes"];

  for (const cat of categories) {
    const section = document.createElement("section");
    section.className = "category";
    section.innerHTML = `<h3>${cat}</h3><div class="product-grid"></div>`;
    const grid = section.querySelector(".product-grid");

    PRODUCTS.filter(p => p.cat === cat).forEach(product => {
      const btn = document.createElement("button");
      const available = availableStock(product.id);
      const isOut = available !== null && available <= 0 && product.price >= 0;
      btn.className = `product-btn ${product.price < 0 ? "negative" : ""} ${isOut ? "out" : ""}`;
      btn.disabled = isOut;
      const stockLabel = available === null ? "" : `<span class="stock-badge">Stock ${Math.max(0, available)}</span>`;
      btn.innerHTML = `<span class="name">${product.name}</span><span class="price">${euro(product.price)}</span>${stockLabel}`;
      btn.addEventListener("click", () => addProduct(product));
      grid.appendChild(btn);
    });
    root.appendChild(section);
  }
}

function addProduct(product) {
  if (!canAddProduct(product)) {
    alert("Stock insuffisant pour ce produit.");
    return;
  }
  const line = cart.find(item => item.id === product.id);
  if (line) line.qty += 1;
  else cart.push({ ...product, qty: 1 });
  renderAll();
}

function setQty(productId, qty) {
  qty = Math.max(0, Math.min(999, Number(qty) || 0));
  const line = cart.find(item => item.id === productId);
  if (!line) return;
  const currentStock = stockValue(productId);
  if (currentStock !== null && line.price >= 0 && qty > currentStock) {
    alert(`Stock disponible : ${currentStock}`);
    qty = currentStock;
  }
  if (qty === 0) cart = cart.filter(item => item.id !== productId);
  else line.qty = qty;
  renderAll();
}

function changeQty(productId, delta) {
  const line = cart.find(item => item.id === productId);
  if (!line) return;
  setQty(productId, line.qty + delta);
}

function renderCart() {
  const root = byId("cart");
  root.innerHTML = "";
  root.className = cart.length ? "cart" : "cart empty";
  if (!cart.length) {
    root.textContent = "Aucun article";
    return;
  }

  cart.forEach(item => {
    const line = document.createElement("div");
    line.className = "cart-line";
    line.innerHTML = `
      <div>
        <div class="line-name">${item.name}</div>
        <div class="line-sub">${euro(item.price)} / unité</div>
      </div>
      <div class="qty-box">
        <button aria-label="moins">−</button>
        <input inputmode="numeric" pattern="[0-9]*" value="${item.qty}" aria-label="quantité">
        <button aria-label="plus">+</button>
      </div>
      <div class="line-total">${euro(item.price * item.qty)}</div>
    `;
    const [minusBtn, plusBtn] = line.querySelectorAll("button");
    const input = line.querySelector("input");
    minusBtn.addEventListener("click", () => changeQty(item.id, -1));
    plusBtn.addEventListener("click", () => changeQty(item.id, 1));
    input.addEventListener("change", () => setQty(item.id, input.value));
    input.addEventListener("focus", () => input.select());
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

function renderStats() {
  const cashTotal = orders.filter(o => o.payment === "cash").reduce((s, o) => s + o.total, 0);
  const cardTotal = orders.filter(o => o.payment === "card").reduce((s, o) => s + o.total, 0);
  byId("ordersCount").textContent = orders.length;
  byId("cashTotal").textContent = euro(cashTotal);
  byId("cardTotal").textContent = euro(cardTotal);
  byId("globalTotal").textContent = euro(cashTotal + cardTotal);
}

function renderStockList() {
  const root = byId("stockList");
  root.innerHTML = "";
  PRODUCTS.forEach(product => {
    const row = document.createElement("div");
    row.className = "stock-row";
    row.innerHTML = `
      <div><strong>${product.name}</strong><span>${product.cat} · ${euro(product.price)}</span></div>
      <input inputmode="numeric" pattern="[0-9]*" placeholder="Non suivi" value="${stock[product.id] ?? ""}" aria-label="stock ${product.name}">
    `;
    const input = row.querySelector("input");
    input.addEventListener("change", () => {
      const raw = input.value.trim();
      stock[product.id] = raw === "" ? "" : String(Math.max(0, Math.min(99999, Number(raw) || 0)));
      saveStock();
      renderProducts();
      renderStockList();
    });
    input.addEventListener("focus", () => input.select());
    root.appendChild(row);
  });
}
function renderAll() {
  renderProducts();
  renderCart();
  renderPayment();
  renderStats();
}

function finishOrder(payment) {
  const total = getTotal();
  if (!cart.length || total <= 0) {
    alert("Commande vide ou total invalide.");
    return;
  }

  if (payment === "cash" && getReceived() < total) {
    alert("Montant reçu insuffisant.");
    return;
  }

  const order = {
    number: orders.length + 1,
    date: new Date().toISOString(),
    payment,
    total,
    received: payment === "cash" ? getReceived() : total,
    change: payment === "cash" ? Math.max(0, getReceived() - total) : 0,
    lines: cart.map(item => ({ id: item.id, name: item.name, price: item.price, qty: item.qty }))
  };

  orders.push(order);
  order.lines.forEach(line => {
    const current = stockValue(line.id);
    if (current !== null && line.price >= 0) {
      stock[line.id] = String(Math.max(0, current - line.qty));
    }
  });
  saveOrders();
  saveStock();
  cart = [];
  receivedDigits = "";
  renderAll();
  alert(`Commande n°${order.number} enregistrée`);
}

function exportCSV() {
  const rows = [["numero", "date", "paiement", "total_centimes", "recu_centimes", "monnaie_centimes", "produit", "quantite", "prix_unitaire_centimes", "stock_restant"]];
  orders.forEach(order => {
    order.lines.forEach(line => {
      rows.push([order.number, order.date, order.payment, order.total, order.received, order.change, line.name, line.qty, line.price, stock[line.id] ?? ""]);
    });
  });
  const csv = rows.map(row => row.map(value => `"${String(value).replaceAll('"', '""')}"`).join(";")).join("\n");
  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `bilan-caisse-moroges-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function bindEvents() {
  byId("clearCartBtn").addEventListener("click", () => { cart = []; renderAll(); });
  byId("stockBtn").addEventListener("click", () => { renderStockList(); byId("stockDialog").showModal(); });
  byId("resetStockBtn").addEventListener("click", () => {
    if (!confirm("Réinitialiser tous les stocks ?")) return;
    PRODUCTS.forEach(product => stock[product.id] = "");
    saveStock();
    renderProducts();
    renderStockList();
  });
  byId("exportBtn").addEventListener("click", exportCSV);
  byId("cashPayBtn").addEventListener("click", () => finishOrder("cash"));
  byId("cardPayBtn").addEventListener("click", () => finishOrder("card"));
  byId("exactBtn").addEventListener("click", () => { receivedDigits = String(Math.max(0, getTotal())); renderPayment(); });
  byId("clearReceivedBtn").addEventListener("click", () => { receivedDigits = ""; renderPayment(); });
  byId("backBtn").addEventListener("click", () => { receivedDigits = receivedDigits.slice(0, -1); renderPayment(); });
  byId("fullscreenBtn").addEventListener("click", () => document.documentElement.requestFullscreen?.());

  document.querySelectorAll("[data-cash]").forEach(btn => {
    btn.addEventListener("click", () => { receivedDigits = btn.dataset.cash; renderPayment(); });
  });

  byId("keypad").addEventListener("click", event => {
    const key = event.target.dataset.key;
    if (!key) return;
    receivedDigits = (receivedDigits + key).replace(/^0+/, "").slice(0, 6);
    renderPayment();
  });

  document.addEventListener("gesturestart", event => event.preventDefault());
  document.addEventListener("dblclick", event => event.preventDefault(), { passive: false });
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("service-worker.js"));
}

renderProducts();
bindEvents();
renderAll();
