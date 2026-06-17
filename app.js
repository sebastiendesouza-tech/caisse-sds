// Outil de dépannage : ajoute ?resetConfig=1 à l'URL pour remettre uniquement les boutons à zéro
// ou ?resetAllSds=1 pour vider toute la caisse locale de cet appareil.
(function rescueLocalDataFromUrl(){
  try {
    const params = new URLSearchParams(window.location.search || "");
    if (params.has("resetConfig")) {
      localStorage.removeItem("moroges_product_config");
      localStorage.removeItem("moroges_choice_groups");
    }
    if (params.has("resetAllSds")) {
      ["moroges_product_config", "moroges_choice_groups", "moroges_general_settings", "moroges_orders", "moroges_stock", "moroges_volunteers"].forEach(key => localStorage.removeItem(key));
    }
  } catch (error) {
    console.warn("Recovery URL ignored", error);
  }
})();

window.addEventListener("error", event => {
  try {
    const toast = document.getElementById("toast");
    if (toast) {
      toast.textContent = "Erreur détectée : recharge l'application ou utilise ?resetConfig=1";
      toast.classList.add("show");
    }
  } catch {}
});

const DEFAULT_PRODUCT_CONFIG = [
  { id: "eau50", subCategory: "sans_alcool", slot: 1, cat: "Boissons", name: "Eau 50 cl", price: 50, type: "simple" },
  { id: "eau150", subCategory: "sans_alcool", slot: 2, cat: "Boissons", name: "Eau 1,5 L", price: 150, type: "simple" },
  { id: "coca", subCategory: "sans_alcool", slot: 3, cat: "Boissons", name: "Coca", price: 200, type: "simple" },
  { id: "oasis", subCategory: "sans_alcool", slot: 4, cat: "Boissons", name: "Oasis", price: 200, type: "simple" },
  { id: "icetea", subCategory: "sans_alcool", slot: 5, cat: "Boissons", name: "Ice Tea", price: 200, type: "simple" },
  { id: "biere25", subCategory: "alcool", slot: 6, cat: "Boissons", name: "Bière pression 25 cl", price: 250, type: "simple" },
  { id: "pichet", subCategory: "alcool", slot: 7, cat: "Boissons", name: "Pichet bière 1 L", price: 900, type: "simple" },
  { id: "vin_rouge", subCategory: "alcool", slot: 8, cat: "Boissons", name: "Verre rouge", price: 300, type: "simple" },
  { id: "vin_blanc", subCategory: "alcool", slot: 9, cat: "Boissons", name: "Verre blanc", price: 300, type: "simple" },
  { id: "vin_rose", subCategory: "alcool", slot: 10, cat: "Boissons", name: "Verre rosé", price: 300, type: "simple" },
  { id: "btvin_rouge", subCategory: "alcool", slot: 11, cat: "Boissons", name: "Bouteille rouge", price: 1100, type: "simple" },
  { id: "btvin_blanc", subCategory: "alcool", slot: 12, cat: "Boissons", name: "Bouteille blanc", price: 1100, type: "simple" },
  { id: "btvin_rose", subCategory: "alcool", slot: 13, cat: "Boissons", name: "Bouteille rosé", price: 1100, type: "simple" },
  { id: "cremant", subCategory: "alcool", slot: 14, cat: "Boissons", name: "Bouteille crémant", price: 1300, type: "simple" },
  { id: "cafe", subCategory: "chaud", slot: 15, cat: "Boissons", name: "Café", price: 100, type: "simple", stockable: true, refundable: true },
  { id: "boisson_16", slot: 16, cat: "Boissons", name: "", price: 0, type: "simple" },

  { id: "assiette", slot: 1, cat: "Restauration", name: "Assiette gourmande", price: 700, type: "composite", components: [], options: { groups: { meats: { enabled: true, count: 2, choiceRequired: true, defaults: {} }, sides: { enabled: true, count: 1, choiceRequired: false, defaults: { frites: 1 } } }, other: { enabled: false, ids: [], supplements: {} } } },
  { id: "frites", slot: 2, cat: "Restauration", name: "Barquette frites", price: 250, type: "simple", subCategory: "plat" },
  { id: "glace", slot: 3, cat: "Restauration", name: "Glace", price: 200, type: "simple", subCategory: "dessert" },
  { id: "popcorn", slot: 4, cat: "Restauration", name: "Popcorn", price: 100, type: "simple", subCategory: "dessert" },
  { id: "menu", slot: 5, cat: "Restauration", name: "Menu", price: 1000, type: "menu", components: [], options: { sections: { entree: { enabled: false, count: 0, choiceRequired: false, ids: [], defaults: {}, supplementsEnabled: false, supplements: {} }, plat: { enabled: true, count: 1, choiceRequired: false, ids: ["assiette"], defaults: { assiette: 1 }, supplementsEnabled: false, supplements: {} }, dessert: { enabled: true, count: 1, choiceRequired: false, ids: ["glace"], defaults: { glace: 1 }, supplementsEnabled: false, supplements: {} }, fromage: { enabled: false, count: 0, choiceRequired: false, ids: [], defaults: {}, supplementsEnabled: false, supplements: {} }, boisson: { enabled: true, count: 1, choiceRequired: true, ids: ["coca", "oasis", "icetea", "biere25", "vin_rouge", "vin_blanc", "vin_rose"], defaults: {}, supplementsEnabled: true, supplements: { vin_rouge: 50, vin_blanc: 50, vin_rose: 50 } } }, groups: { meats: { enabled: false, count: 0, choiceRequired: false, defaults: {} }, sides: { enabled: false, count: 0, choiceRequired: false, defaults: {} } }, other: { enabled: false, count: 0, ids: [], supplementsEnabled: false, supplements: {} } } },
  { id: "rest_6", slot: 6, cat: "Restauration", name: "", price: 0, type: "simple" },
  { id: "rest_7", slot: 7, cat: "Restauration", name: "", price: 0, type: "simple" },
  { id: "rest_8", slot: 8, cat: "Restauration", name: "", price: 0, type: "simple" },
  { id: "rest_9", slot: 9, cat: "Restauration", name: "", price: 0, type: "simple" },
  { id: "rest_10", slot: 10, cat: "Restauration", name: "", price: 0, type: "simple" },
  { id: "rest_11", slot: 11, cat: "Restauration", name: "", price: 0, type: "simple" },
  { id: "rest_12", slot: 12, cat: "Restauration", name: "", price: 0, type: "simple" },

  { id: "consigne", slot: 1, cat: "Consignes", name: "Consigne gobelet", price: 200, type: "simple" },
  { id: "retour", slot: 2, cat: "Consignes", name: "Retour consigne", price: -200, type: "simple" }
];

const TYPE_LABELS = {
  simple: "Produit simple",
  composite: "Produit composé / plat",
  menu: "Menu"
};

const PRODUCT_SUBCATEGORIES = [
  { id: "", label: "Autre" },
  { id: "entree", label: "Entrée" },
  { id: "plat", label: "Plat" },
  { id: "dessert", label: "Dessert" },
  { id: "fromage", label: "Fromage" },
  { id: "sans_alcool", label: "Boisson sans alcool" },
  { id: "alcool", label: "Boisson alcoolisée" },
  { id: "chaud", label: "Boisson chaude" }
];
const SUBCATEGORY_LABELS = Object.fromEntries(PRODUCT_SUBCATEGORIES.map(item => [item.id, item.label]));
const COLOR_CATEGORIES = [
  ...PRODUCT_SUBCATEGORIES,
  { id: "plat", label: "Produit composé / plat" },
  { id: "menu", label: "Menu" },
  { id: "consigne", label: "Consigne" }
];
const DEFAULT_CATEGORY_COLORS = {
  "": "white",
  entree: "green",
  dessert: "pink",
  fromage: "yellow",
  sans_alcool: "blue",
  alcool: "purple",
  chaud: "brown",
  plat: "orange",
  menu: "orange",
  consigne: "gray"
};
const MENU_SECTIONS = [
  { id: "entree", label: "Entrée", kind: "simple", sub: "entree" },
  { id: "plat", label: "Plat", kind: "composite" },
  { id: "dessert", label: "Dessert", kind: "simple", sub: "dessert" },
  { id: "fromage", label: "Fromage", kind: "simple", sub: "fromage" },
  { id: "boisson", label: "Boisson", kind: "simple", subs: ["sans_alcool", "alcool", "chaud"] }
];


const COLOR_PALETTE = [
  { id: "white", label: "Blanc" },
  { id: "blue", label: "Bleu" },
  { id: "green", label: "Vert" },
  { id: "orange", label: "Orange" },
  { id: "purple", label: "Violet" },
  { id: "pink", label: "Rose" },
  { id: "yellow", label: "Jaune" },
  { id: "gray", label: "Gris" },
  { id: "red", label: "Rouge" },
  { id: "brown", label: "Marron café" }
];
const VALID_COLORS = new Set(COLOR_PALETTE.map(c => c.id));
function normalizeColor(value) { return VALID_COLORS.has(String(value || "")) ? String(value) : "white"; }
function productColorCategory(item) {
  const type = normalizeType(item.type);
  if (item.cat === "Consignes") return "consigne";
  if (type === "menu") return "menu";
  if (type === "composite") return "plat";
  return String(item.subCategory || "");
}
function normalizedCategoryColors(value) {
  const source = value && typeof value === "object" ? value : {};
  const result = {};
  COLOR_CATEGORIES.forEach(cat => {
    result[cat.id] = normalizeColor(source[cat.id] || DEFAULT_CATEGORY_COLORS[cat.id] || "white");
  });
  return result;
}
function defaultColorForProduct(item) {
  const settings = typeof generalSettings !== "undefined" ? generalSettings : null;
  const colors = normalizedCategoryColors(settings?.categoryColors);
  return colors[productColorCategory(item)] || "white";
}

const DEFAULT_CHOICE_GROUPS = {
  meats: { label: "Viandes", items: [
    { id: "saucisse", name: "Saucisse" },
    { id: "merguez", name: "Merguez" }
  ] },
  sides: { label: "Accompagnements", items: [
    { id: "frites", name: "Frites" }
  ] }
};

function normalizeChoiceGroups(value) {
  const source = value && typeof value === "object" ? value : DEFAULT_CHOICE_GROUPS;
  const result = {};
  ["meats", "sides"].forEach(groupId => {
    const def = DEFAULT_CHOICE_GROUPS[groupId];
    const group = source[groupId] && typeof source[groupId] === "object" ? source[groupId] : def;
    const items = Array.isArray(group.items) ? group.items : def.items;
    const seen = new Set();
    result[groupId] = {
      label: String(group.label || def.label),
      items: items.map((item, index) => {
        const fallbackId = `${groupId}_${index + 1}`;
        return {
          id: String(item.id || fallbackId).trim().toLowerCase().replace(/[^a-z0-9_-]/g, "_") || fallbackId,
          name: String(item.name || "").trim()
        };
      }).filter(item => item.name && !seen.has(item.id) && seen.add(item.id)).slice(0, 12)
    };
  });
  return result;
}

function loadChoiceGroups() {
  try { return normalizeChoiceGroups(JSON.parse(localStorage.getItem("moroges_choice_groups") || "null")); }
  catch { return normalizeChoiceGroups(DEFAULT_CHOICE_GROUPS); }
}
function saveChoiceGroups() { localStorage.setItem("moroges_choice_groups", JSON.stringify(choiceGroups)); }

let choiceGroups = loadChoiceGroups();

function groupStockItems() {
  return Object.entries(choiceGroups).flatMap(([groupId, group]) =>
    group.items.map(item => ({ id: item.id, name: item.name, cat: group.label || groupId }))
  );
}

const SPECIAL_STOCK_ITEMS = groupStockItems();

function normalizeComponents(value) {
  if (!Array.isArray(value)) return [];
  const seen = new Set();
  return value
    .map(item => ({ id: String(item.id || "").trim(), qty: Math.max(1, Math.min(99, Number(item.qty) || 1)) }))
    .filter(item => item.id && !seen.has(item.id) && seen.add(item.id));
}

function normalizeDefaultQuantities(value) {
  const source = value && typeof value === "object" ? value : {};
  const out = {};
  Object.entries(source).forEach(([id, qty]) => {
    const cleanId = String(id || "").trim();
    const amount = Math.max(0, Math.min(99, Number(qty) || 0));
    if (cleanId && amount > 0) out[cleanId] = amount;
  });
  return out;
}

function normalizeGroupRule(rule, fallback = {}) {
  const source = rule && typeof rule === "object" ? rule : fallback;
  const enabled = Boolean(source.enabled);
  const legacyMin = Number(source.min ?? fallback.min ?? 0) || 0;
  const legacyMax = Number(source.max ?? fallback.max ?? legacyMin) || legacyMin;
  const rawCount = source.count ?? fallback.count ?? legacyMax ?? legacyMin ?? 0;
  const count = Math.max(0, Math.min(99, Number(rawCount) || 0));
  const choiceRequired = Boolean(source.choiceRequired ?? source.choose ?? source.requiredChoice ?? fallback.choiceRequired ?? enabled);
  const ids = Array.isArray(source.ids) ? source.ids.map(String) : null;
  const defaults = normalizeDefaultQuantities(source.defaults || source.defaultQuantities || {});
  const supplementsEnabled = Boolean(source.supplementsEnabled ?? source.useSupplements ?? fallback.supplementsEnabled ?? false);
  const supplements = normalizeSupplements(source.supplements || {});
  return { enabled, count, choiceRequired, ids, defaults, supplementsEnabled, supplements };
}

function normalizeSupplements(value) {
  const source = value && typeof value === "object" ? value : {};
  const out = {};
  Object.entries(source).forEach(([id, amount]) => {
    const cleanId = String(id || "").trim();
    if (cleanId) out[cleanId] = Number(amount) || 0;
  });
  return out;
}

function normalizeSectionRule(rule, fallback = {}) {
  const source = rule && typeof rule === "object" ? rule : fallback;
  const enabled = Boolean(source.enabled);
  const count = Math.max(0, Math.min(99, Number(source.count ?? fallback.count ?? (enabled ? 1 : 0)) || 0));
  const choiceRequired = Boolean(source.choiceRequired ?? source.choose ?? fallback.choiceRequired ?? enabled);
  const ids = Array.isArray(source.ids) ? source.ids.map(String) : [];
  const defaults = normalizeDefaultQuantities(source.defaults || source.defaultQuantities || {});
  const supplementsEnabled = Boolean(source.supplementsEnabled ?? source.useSupplements ?? fallback.supplementsEnabled ?? false);
  const supplements = normalizeSupplements(source.supplements || {});
  return { enabled, count, choiceRequired, ids, defaults, supplementsEnabled, supplements };
}

function normalizeOptions(value) {
  const options = value && typeof value === "object" ? value : {};

  // Migration anciennes versions : meatChoice/drinkChoice deviennent groupes paramétrables.
  const oldDrinkIds = Array.isArray(options.drinkIds) && options.drinkIds.length
    ? options.drinkIds.map(String)
    : ["coca", "oasis", "icetea", "biere25", "vin_rouge", "vin_blanc", "vin_rose"];

  const groups = options.groups && typeof options.groups === "object" ? options.groups : {};
  const other = options.other && typeof options.other === "object" ? options.other : {};

  const sections = options.sections && typeof options.sections === "object" ? options.sections : {};
  const normalizedSections = {};
  MENU_SECTIONS.forEach(section => {
    normalizedSections[section.id] = normalizeSectionRule(sections[section.id], { enabled: false, count: 0, choiceRequired: false, defaults: {}, supplementsEnabled: false, supplements: {} });
  });
  return {
    sections: normalizedSections,
    groups: {
      meats: normalizeGroupRule(groups.meats, { enabled: Boolean(options.meatChoice), count: Boolean(options.meatChoice) ? 2 : 0, choiceRequired: true, defaults: {} }),
      sides: normalizeGroupRule(groups.sides, { enabled: false, count: 0, choiceRequired: false, defaults: {} })
    },
    other: {
      enabled: Boolean(other.enabled ?? options.drinkChoice),
      count: Math.max(0, Math.min(99, Number(other.count ?? other.qty ?? other.quantity ?? (other.enabled ?? options.drinkChoice ? 1 : 0)) || 0)),
      ids: Array.isArray(other.ids) && other.ids.length ? other.ids.map(String) : (options.drinkChoice ? oldDrinkIds : []),
      supplementsEnabled: Boolean(other.supplementsEnabled ?? other.useSupplements ?? options.drinkChoice),
      supplements: normalizeSupplements(other.supplements || (options.drinkChoice ? { vin_rouge: 50, vin_blanc: 50, vin_rose: 50 } : {}))
    }
  };
}

function legacyOptions(options) {
  const normalized = normalizeOptions(options);
  return {
    meatChoice: normalized.groups.meats.enabled,
    drinkChoice: normalized.other.enabled,
    drinkIds: normalized.other.ids
  };
}

function normalizeType(type) {
  if (type === "menu") return "menu";
  if (type === "assiette" || type === "composite") return "composite";
  return "simple";
}

function cloneConfig(config) {
  return config.map(item => ({
    ...item,
    canDelayPickup: false,
    delayedPickup: false,
    color: defaultColorForProduct(item),
    components: normalizeComponents(item.components),
    options: normalizeOptions(item.options)
  }));
}

function loadProductConfig() {
  try {
    const saved = JSON.parse(localStorage.getItem("moroges_product_config") || "null");
    if (!Array.isArray(saved)) return cloneConfig(DEFAULT_PRODUCT_CONFIG);
    return DEFAULT_PRODUCT_CONFIG.map(defaultItem => {
      const savedItem = saved.find(item => item.id === defaultItem.id) || {};
      const migratedType = normalizeType(savedItem.type || defaultItem.type);
      let components = normalizeComponents(savedItem.components ?? defaultItem.components);
      let options = normalizeOptions(savedItem.options ?? defaultItem.options);

      // Migration douce des anciens types spéciaux.
      if (savedItem.type === "assiette") {
        options.groups.meats = { enabled: true, count: 2, choiceRequired: true, defaults: {} };
      }
      if (migratedType === "menu") {
        // Un menu ne compose plus directement les viandes/accompagnements :
        // il pointe vers un produit composé dans la section Plat.
        options.groups = Object.fromEntries(Object.entries(options.groups || {}).map(([id, rule]) => [id, { ...rule, enabled: false }]));
        // Migration des anciens menus : les anciennes boissons "other" deviennent la section Boisson.
        if (options.other?.enabled && !options.sections?.boisson?.enabled) {
          options.sections.boisson = {
            enabled: true,
            count: Math.max(1, Number(options.other.count) || 1),
            choiceRequired: true,
            ids: Array.isArray(options.other.ids) ? options.other.ids : [],
            defaults: {},
            supplementsEnabled: Boolean(options.other.supplementsEnabled),
            supplements: normalizeSupplements(options.other.supplements || {})
          };
        }
        options.other = { enabled: false, count: 0, ids: [], supplementsEnabled: false, supplements: {} };
      }

      return {
        ...defaultItem,
        ...savedItem,
        cat: defaultItem.cat,
        slot: defaultItem.slot,
        type: migratedType,
        canDelayPickup: false,
        delayedPickup: false,
        color: defaultColorForProduct({ ...defaultItem, ...savedItem, type: migratedType }),
        components,
        options
      };
    });
  } catch {
    return cloneConfig(DEFAULT_PRODUCT_CONFIG);
  }
}

function sanitizeProductConfig(config) {
  const source = Array.isArray(config) ? config : DEFAULT_PRODUCT_CONFIG;
  return source.map(raw => {
    const item = raw && typeof raw === "object" ? raw : {};
    const type = normalizeType(item.type);
    const normalized = {
      ...item,
      name: String(item.name || ""),
      price: Number(item.price) || 0,
      type,
      subCategory: type === "simple" ? String(item.subCategory || "") : "",
      canDelayPickup: false,
      delayedPickup: false,
      refundable: item.cat !== "Consignes" && Number(item.price) > 0 && item.refundable !== false,
      color: defaultColorForProduct({ ...item, type }),
      components: type === "composite" ? normalizeComponents(item.components) : [],
      options: normalizeOptions(item.options)
    };
    if (type === "menu") {
      normalized.components = [];
      normalized.options.groups = Object.fromEntries(Object.entries(normalized.options.groups || {}).map(([id, rule]) => [id, { ...rule, enabled: false }]));
      normalized.options.other = { enabled: false, count: 0, ids: [], supplementsEnabled: false, supplements: {} };
    }
    if (type === "simple") {
      normalized.components = [];
      normalized.options = normalizeOptions({});
    }
    return normalized;
  });
}

function saveProductConfig() {
  productConfig = sanitizeProductConfig(productConfig);
  localStorage.setItem("moroges_product_config", JSON.stringify(productConfig));
}

function buildProducts() {
  return productConfig.map(item => {
    const name = String(item.name || "").trim();
    const type = normalizeType(item.type);
    const product = {
      ...item,
      name,
      price: Number(item.price) || 0,
      color: defaultColorForProduct(item),
      subCategory: String(item.subCategory || ""),
      type,
      components: normalizeComponents(item.components),
      options: normalizeOptions(item.options),
      canDelayPickup: false,
      delayedPickup: false,
      refundable: item.cat !== "Consignes" && Number(item.price) > 0 && item.refundable !== false,
      empty: !name
    };
    if (type === "menu") {
      product.components = [];
      product.options.groups = Object.fromEntries(Object.entries(product.options.groups || {}).map(([id, rule]) => [id, { ...rule, enabled: false }]));
      if (product.options.other?.enabled && !product.options.sections?.boisson?.enabled) {
        product.options.sections.boisson = {
          enabled: true,
          count: Math.max(1, Number(product.options.other.count) || 1),
          choiceRequired: true,
          ids: Array.isArray(product.options.other.ids) ? product.options.other.ids : [],
          defaults: {},
          supplementsEnabled: Boolean(product.options.other.supplementsEnabled),
          supplements: normalizeSupplements(product.options.other.supplements || {})
        };
      }
      product.options.other = { enabled: false, count: 0, ids: [], supplementsEnabled: false, supplements: {} };
    }
    if (product.empty) return product;
    if (type === "composite" || type === "menu") product.composite = true;
    if (type === "simple") product.stockable = product.price >= 0;
    return product;
  });
}

function buildStockItems() {
  const simpleProducts = PRODUCTS
    .filter(p => !p.empty && p.stockable)
    .map(p => ({ id: p.id, name: p.name, cat: p.cat }));
  const merged = [...groupStockItems(), ...simpleProducts];
  const seen = new Set();
  return merged.filter(item => !seen.has(item.id) && seen.add(item.id));
}

function componentCandidates(currentId = "") {
  const productItems = productConfig
    .filter(item => item.id !== currentId && normalizeType(item.type) === "simple" && String(item.name || "").trim() && Number(item.price) >= 0 && item.cat !== "Consignes")
    .map(item => ({ id: item.id, name: item.name, group: item.cat }));
  const merged = [...groupStockItems().map(item => ({ ...item, group: item.cat })), ...productItems];
  const seen = new Set();
  return merged.filter(item => !seen.has(item.id) && seen.add(item.id));
}

const VALID_TICKET_COLORS = new Set(["black", "blue", "red"]);
function normalizeTicketColor(value) { return VALID_TICKET_COLORS.has(String(value || "")) ? String(value) : "black"; }
const VALID_ORDER_PREFIXES = new Set(["A", "B", "C", "D"]);
function normalizeOrderPrefix(value) {
  const prefix = String(value || "A").trim().toUpperCase();
  return VALID_ORDER_PREFIXES.has(prefix) ? prefix : "A";
}
function orderDisplayNumber(order) {
  const prefix = normalizeOrderPrefix(order?.prefix || generalSettings?.orderPrefix || "A");
  const number = Number(order?.number) || 0;
  return `${prefix}${String(number).padStart(2, "0")}`;
}
const DEFAULT_GENERAL_SETTINGS = { cashEnabled: true, cashFund: 0, categoryColors: DEFAULT_CATEGORY_COLORS, ticketColor: "black", orderPrefix: "A" };
function loadGeneralSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem("moroges_general_settings") || "null");
    const merged = { ...DEFAULT_GENERAL_SETTINGS, ...(saved && typeof saved === "object" ? saved : {}) };
    merged.categoryColors = normalizedCategoryColors(merged.categoryColors);
    merged.ticketColor = normalizeTicketColor(merged.ticketColor);
    merged.orderPrefix = normalizeOrderPrefix(merged.orderPrefix);
    return merged;
  } catch { return { ...DEFAULT_GENERAL_SETTINGS }; }
}
function saveGeneralSettings() { localStorage.setItem("moroges_general_settings", JSON.stringify(generalSettings)); }
let generalSettings = loadGeneralSettings();


let productConfig = loadProductConfig();
function applyV202611DefaultsOnce() {
  const key = "moroges_v2026_12_defaults_applied";
  if (localStorage.getItem(key) === "1") return;
  const defaultsById = Object.fromEntries(DEFAULT_PRODUCT_CONFIG.map(item => [item.id, item]));
  const forceIds = ["coca", "oasis", "icetea", "biere25", "pichet", "vin_rouge", "vin_blanc", "vin_rose", "btvin_rouge", "btvin_blanc", "btvin_rose", "cremant", "assiette", "glace", "menu"];
  const existingById = Object.fromEntries(productConfig.map(item => [item.id, item]));
  productConfig = DEFAULT_PRODUCT_CONFIG.map(defaultItem => {
    const existing = existingById[defaultItem.id] || {};
    if (forceIds.includes(defaultItem.id)) return cloneConfig([defaultItem])[0];
    return existing.id ? { ...existing, cat: defaultItem.cat, slot: defaultItem.slot, canDelayPickup: false, delayedPickup: false } : cloneConfig([defaultItem])[0];
  });
  choiceGroups = normalizeChoiceGroups(DEFAULT_CHOICE_GROUPS);
  saveProductConfig(productConfig);
  saveChoiceGroups();
  localStorage.setItem(key, "1");
}
applyV202611DefaultsOnce();
let PRODUCTS = buildProducts();
let STOCK_ITEMS = buildStockItems();
let cart = [];
let receivedDigits = "";
let orders = JSON.parse(localStorage.getItem("moroges_orders") || "[]");
let lastPrintedOrder = null;
let stock = JSON.parse(localStorage.getItem("moroges_stock") || "{}");
for (const item of STOCK_ITEMS) if (!(item.id in stock)) stock[item.id] = "";

const DEFAULT_VOLUNTEERS = [
  "Bénévole 1", "Bénévole 2", "Bénévole 3", "Bénévole 4", "Bénévole 5",
  "Bénévole 6", "Bénévole 7", "Bénévole 8", "Bénévole 9", "Bénévole 10"
];
function loadVolunteers() {
  try {
    const saved = JSON.parse(localStorage.getItem("moroges_volunteers") || "null");
    if (Array.isArray(saved)) {
      const clean = saved.map(v => String(v || "").trim()).filter(Boolean);
      return clean.length ? clean : [...DEFAULT_VOLUNTEERS];
    }
  } catch {}
  return [...DEFAULT_VOLUNTEERS];
}
function saveVolunteers() { localStorage.setItem("moroges_volunteers", JSON.stringify(volunteers)); }
let volunteers = loadVolunteers();

let currentChoiceProduct = null;
let pendingDelayedProduct = null;
let choice = { groups: {}, other: {} };

const euro = cents => `${(cents / 100).toFixed(2).replace(".", ",")} €`;
const byId = id => document.getElementById(id);
const productById = id => PRODUCTS.find(p => p.id === id);
const stockItemById = id => STOCK_ITEMS.find(p => p.id === id) || productById(id) || { id, name: id };
const isWineDrink = id => id === "vin_rouge" || id === "vin_blanc" || id === "vin_rose";
function drinkLabel(id) {
  const product = productById(id);
  const base = product && !product.empty ? product.name : ({ coca: "Coca", oasis: "Oasis", icetea: "Ice Tea", soft: "Coca", biere25: "Bière pression 25 cl", vin_rouge: "Verre rouge", vin_blanc: "Verre blanc", vin_rose: "Verre rosé" }[id] || id);
  return isWineDrink(id) ? `${base} +0,50 €` : base;
}
const stockClass = available => available === null ? "" : available <= 0 ? "empty" : available < 10 ? "low" : "ok";

function saveOrders() { localStorage.setItem("moroges_orders", JSON.stringify(orders)); }
function saveStock() { localStorage.setItem("moroges_stock", JSON.stringify(stock)); }
function stockValue(id) { const v = stock[id]; return v === "" || v === null || v === undefined ? null : Number(v); }
function getReceived() { return Number(receivedDigits || "0"); }
function getTotal() { return cart.reduce((sum, item) => sum + item.price * item.qty, 0); }


function isFixedCompositionItem(id) {
  const item = productConfig.find(product => product.id === id);
  return Boolean(item && normalizeType(item.type) === "simple" && String(item.name || "").trim() && Number(item.price) >= 0 && item.cat !== "Boissons" && item.cat !== "Consignes");
}

function getCompositeComponents(product, selectedChoice = choice) {
  const components = {};
  normalizeComponents(product.components).forEach(item => {
    if (!isFixedCompositionItem(item.id)) return;
    components[item.id] = (components[item.id] || 0) + item.qty;
  });
  const options = normalizeOptions(product.options);
  Object.entries(options.sections || {}).forEach(([sectionId, rule]) => {
    if (!rule.enabled) return;
    const source = rule.choiceRequired ? (selectedChoice.sections?.[sectionId] || {}) : (rule.defaults || {});
    Object.entries(source).forEach(([id, qty]) => {
      const amount = Math.max(0, Number(qty) || 0);
      if (amount <= 0) return;
      const linkedProduct = productById(id);
      if (sectionId === "plat" && linkedProduct && normalizeType(linkedProduct.type) === "composite") {
        const nested = nestedChoiceForLine(selectedChoice, linkedProduct.id);
        const nestedComponents = getCompositeComponents(linkedProduct, nested);
        Object.entries(nestedComponents).forEach(([nestedId, nestedQty]) => addToBucket(components, nestedId, nestedQty * amount));
      } else {
        addToBucket(components, id, amount);
      }
    });
  });


  Object.entries(options.groups).forEach(([groupId, rule]) => {
    if (!rule.enabled) return;
    const source = rule.choiceRequired ? (selectedChoice.groups?.[groupId] || {}) : (rule.defaults || {});
    Object.entries(source).forEach(([id, qty]) => {
      const amount = Math.max(0, Number(qty) || 0);
      if (amount > 0) components[id] = (components[id] || 0) + amount;
    });
  });
  if (options.other.enabled) {
    Object.entries(selectedChoice.other || {}).forEach(([id, qty]) => {
      const amount = Math.max(0, Number(qty) || 0);
      if (amount > 0) components[id] = (components[id] || 0) + amount;
    });
  }
  return components;
}

function selectedGroupTotal(groupId, selectedChoice = choice) {
  return Object.values(selectedChoice.groups?.[groupId] || {}).reduce((sum, qty) => sum + (Number(qty) || 0), 0);
}

function selectedOtherTotal(selectedChoice = choice) {
  return Object.values(selectedChoice.other || {}).reduce((sum, qty) => sum + (Number(qty) || 0), 0);
}

function selectedSectionTotal(sectionId, selectedChoice = choice) {
  return Object.values(selectedChoice.sections?.[sectionId] || {}).reduce((sum, qty) => sum + (Number(qty) || 0), 0);
}

function selectedOtherSupplement(product, selectedChoice = choice) {
  const options = normalizeOptions(product.options);
  let total = 0;
  Object.entries(options.sections || {}).forEach(([sectionId, rule]) => {
    if (!rule.enabled) return;
    const source = rule.choiceRequired ? (selectedChoice.sections?.[sectionId] || {}) : (rule.defaults || {});
    Object.entries(source).forEach(([id, qty]) => {
      const amount = Number(qty) || 0;
      if (rule.supplementsEnabled) total += (rule.supplements?.[id] || 0) * amount;
      const linkedProduct = productById(id);
      if (sectionId === "plat" && linkedProduct && normalizeType(linkedProduct.type) === "composite") {
        total += selectedOtherSupplement(linkedProduct, nestedChoiceForLine(selectedChoice, linkedProduct.id)) * amount;
      }
    });
  });
  Object.entries(options.groups || {}).forEach(([groupId, rule]) => {
    if (!rule.enabled || !rule.supplementsEnabled) return;
    const source = rule.choiceRequired ? (selectedChoice.groups?.[groupId] || {}) : (rule.defaults || {});
    Object.entries(source).forEach(([id, qty]) => total += (rule.supplements?.[id] || 0) * (Number(qty) || 0));
  });
  if (options.other.supplementsEnabled) {
    const supplements = options.other.supplements || {};
    total += Object.entries(selectedChoice.other || {}).reduce((sum, [id, qty]) => sum + (supplements[id] || 0) * (Number(qty) || 0), 0);
  }
  return total;
}

function getLineComponents(line) {
  if (line.type === "composite" || line.type === "menu") return line.components || {};
  // Compatibilité anciennes commandes.
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
  if (product.composite) {
    const options = normalizeOptions(product.options);
    if (Object.values(options.sections || {}).some(rule => rule.enabled && rule.choiceRequired) || Object.values(options.groups).some(rule => rule.enabled && rule.choiceRequired) || options.other.enabled) return openChoice(product);
    const line = makeCompositeLine(product, { saucisse: 0, merguez: 0, drink: "" });
    const error = checkComponents(getLineComponents(line));
    if (error) return alert(error);
    addLineToCart(line);
    renderAll();
    return;
  }
  if (!canAddProduct(product)) return alert("Stock insuffisant pour ce produit.");
  addSimpleProductToCart(product, false);
}

function addSimpleProductToCart(product, delayedPickup = false) {
  const line = cart.find(item => item.id === product.id && !item.type && Boolean(item.delayedPickup) === Boolean(delayedPickup));
  if (line) line.qty += 1;
  else cart.push({
    id: product.id,
    name: product.name,
    price: product.price,
    qty: 1,
    delayedPickup: Boolean(delayedPickup),
    sub: delayedPickup ? "À retirer plus tard" : ""
  });
  renderAll();
}

function openDelayedSimpleChoice(product) {
  pendingDelayedProduct = product;
  const title = byId("delayedSimpleTitle");
  if (title) title.textContent = product.name;
  byId("delayedSimpleDialog")?.showModal();
}

function finishDelayedSimpleChoice(delayedPickup) {
  if (!pendingDelayedProduct) return;
  addSimpleProductToCart(pendingDelayedProduct, Boolean(delayedPickup));
  pendingDelayedProduct = null;
  byId("delayedSimpleDialog")?.close();
}


function stableStringify(value) {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

function cartMergeKey(line) {
  if (!line) return "";
  if (!line.type && !line.productId) return `simple|${line.id}|${Boolean(line.delayedPickup)}|${Number(line.price) || 0}`;
  return stableStringify({
    productId: line.productId || line.id,
    type: line.type || "simple",
    name: line.name || "",
    price: Number(line.price) || 0,
    components: line.components || {},
    delayedComponents: line.delayedComponents || {},
    selections: line.selections || {},
    subImmediate: line.subImmediate || "",
    subDelayed: line.subDelayed || "",
    sub: line.sub || ""
  });
}

function addLineToCart(line) {
  const key = cartMergeKey(line);
  const existing = cart.find(item => cartMergeKey(item) === key);
  if (existing) existing.qty = (Number(existing.qty) || 0) + (Number(line.qty) || 1);
  else cart.push(line);
}

function componentText(components) {
  return Object.entries(components)
    .filter(([, qty]) => qty > 0)
    .map(([id, qty]) => `${qty} ${stockItemById(id).name}`)
    .join(" · ");
}

function productConfigById(id) {
  return productConfig.find(item => item.id === id) || PRODUCTS.find(item => item.id === id);
}

function canDelayPickup(id) { return false;
}

function isDelayedPickup(id) {
  // Anciennes commandes seulement : le retrait plus tard est maintenant choisi à la commande.
  return Boolean(productConfigById(id)?.delayedPickup);
}

function addToBucket(bucket, id, qty) {
  const amount = Math.max(0, Number(qty) || 0);
  if (id && amount > 0) bucket[id] = (bucket[id] || 0) + amount;
}

function selectedMenuSectionItems(product, selectedChoice, sectionId) {
  const options = normalizeOptions(product.options);
  const rule = options.sections?.[sectionId];
  if (!rule?.enabled) return {};
  return rule.choiceRequired ? (selectedChoice.sections?.[sectionId] || {}) : (rule.defaults || {});
}

function selectedPlatCompositeIds(product, selectedChoice = choice) {
  if (normalizeType(product.type) !== "menu") return [];
  return Object.entries(selectedMenuSectionItems(product, selectedChoice, "plat"))
    .filter(([, qty]) => (Number(qty) || 0) > 0)
    .map(([id]) => productById(id))
    .filter(p => p && normalizeType(p.type) === "composite");
}

function ensureNestedChoiceForProduct(compositeProduct) {
  if (!compositeProduct) return null;
  choice.nested = choice.nested || {};
  if (!choice.nested[compositeProduct.id]) choice.nested[compositeProduct.id] = initChoice(compositeProduct);
  return choice.nested[compositeProduct.id];
}

function nestedChoiceForLine(selectedChoice, compositeId) {
  return selectedChoice.nested?.[compositeId] || initChoice(productById(compositeId));
}

function makeCompositeLine(product, selectedChoice = choice) {
  const options = normalizeOptions(product.options);
  const components = getCompositeComponents(product, selectedChoice);
  const price = product.price + selectedOtherSupplement(product, selectedChoice);
  const immediateDetails = [];
  const delayedComponents = {};

  Object.entries(options.sections || {}).forEach(([sectionId, rule]) => {
    if (!rule.enabled) return;
    const section = MENU_SECTIONS.find(item => item.id === sectionId);
    const selected = rule.choiceRequired ? (selectedChoice.sections?.[sectionId] || {}) : (rule.defaults || {});
    const immediateSelected = [];
    Object.entries(selected).forEach(([id, qty]) => {
      const amount = Number(qty) || 0;
      if (amount <= 0) return;
      const supplement = rule.supplements?.[id] || 0;
      const linkedProduct = productById(id);
      let label = `${amount} ${stockItemById(id).name}${rule.supplementsEnabled && supplement ? ` (+${euro(supplement)})` : ""}`;
      if (sectionId === "plat" && linkedProduct && normalizeType(linkedProduct.type) === "composite") {
        const nestedLine = makeCompositeLine(linkedProduct, nestedChoiceForLine(selectedChoice, linkedProduct.id));
        if (nestedLine.subImmediate) label += ` (${nestedLine.subImmediate})`;
        Object.entries(nestedLine.delayedComponents || {}).forEach(([delayedId, delayedQty]) => addToBucket(delayedComponents, delayedId, delayedQty * amount));
      } else if (selectedChoice.delayed?.[id] && canDelayPickup(id)) {
        addToBucket(delayedComponents, id, amount);
        return;
      }
      immediateSelected.push(label);
    });
    if (immediateSelected.length) immediateDetails.push(`${section?.label || sectionId} : ${immediateSelected.join(" / ")}`);
  });

  Object.entries(options.groups).forEach(([groupId, rule]) => {
    if (!rule.enabled) return;
    const group = choiceGroups[groupId];
    const selected = rule.choiceRequired ? (selectedChoice.groups?.[groupId] || {}) : (rule.defaults || {});
    const immediateSelected = {};
    Object.entries(selected).forEach(([id, qty]) => {
      const amount = Number(qty) || 0;
      if (amount <= 0) return;
      if (selectedChoice.delayed?.[id] && canDelayPickup(id)) addToBucket(delayedComponents, id, amount);
      else immediateSelected[id] = amount;
    });
    const text = Object.entries(immediateSelected)
      .filter(([, qty]) => (Number(qty) || 0) > 0)
      .map(([id, qty]) => {
        const supplement = rule.supplements?.[id] || 0;
        return `${qty} ${stockItemById(id).name}${rule.supplementsEnabled && supplement ? ` (+${euro(supplement)})` : ""}`;
      })
      .join(" / ");
    if (text) immediateDetails.push(`${group?.label || groupId} : ${text}`);
  });

  if (options.other.enabled) {
    const immediateOther = [];
    Object.entries(selectedChoice.other || {}).forEach(([id, qty]) => {
      const amount = Number(qty) || 0;
      if (amount <= 0) return;
      const supplement = options.other.supplements?.[id] || 0;
      const label = `${amount} ${stockItemById(id).name}${options.other.supplementsEnabled && supplement ? ` (+${euro(supplement)})` : ""}`;
      if (selectedChoice.delayed?.[id] && canDelayPickup(id)) addToBucket(delayedComponents, id, amount);
      else immediateOther.push(label);
    });
    if (immediateOther.length) immediateDetails.push(`Autre : ${immediateOther.join(" / ")}`);
  }

  const fixedImmediate = {};
  normalizeComponents(product.components).forEach(component => {
    if (selectedChoice.delayed?.[component.id] && canDelayPickup(component.id)) addToBucket(delayedComponents, component.id, component.qty);
    else addToBucket(fixedImmediate, component.id, component.qty);
  });
  const fixed = componentText(fixedImmediate);
  if (fixed) immediateDetails.push(fixed);

  const delayedText = componentText(delayedComponents);
  const displayDetails = [...immediateDetails];
  if (delayedText) displayDetails.push(`À retirer plus tard : ${delayedText}`);

  return {
    id: `${product.id}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    productId: product.id,
    type: normalizeType(product.type),
    name: product.name,
    price,
    qty: 1,
    components,
    delayedComponents,
    selections: JSON.parse(JSON.stringify(selectedChoice)),
    subImmediate: immediateDetails.join(" · "),
    subDelayed: delayedText,
    sub: displayDetails.join(" · ")
  };
}

function allowedGroupItems(groupId, rule) {
  const group = choiceGroups[groupId];
  const items = group?.items || [];
  const ids = Array.isArray(rule?.ids) && rule.ids.length ? rule.ids.map(String) : items.map(item => item.id);
  return items.filter(item => ids.includes(item.id));
}

function initChoice(product) {
  const options = normalizeOptions(product.options);
  const next = { sections: {}, groups: {}, other: {}, delayed: {}, nested: {} };
  Object.entries(options.sections || {}).forEach(([sectionId, rule]) => {
    if (!rule.enabled || !rule.choiceRequired) return;
    next.sections[sectionId] = {};
    (rule.ids || []).forEach(id => {
      const p = productById(id);
      if (p && !p.empty && p.cat !== "Consignes") next.sections[sectionId][id] = 0;
    });
  });
  Object.entries(options.groups).forEach(([groupId, rule]) => {
    if (!rule.enabled || !rule.choiceRequired) return;
    next.groups[groupId] = {};
    allowedGroupItems(groupId, rule).forEach(item => { next.groups[groupId][item.id] = 0; });
  });
  if (options.other.enabled) {
    (options.other.ids || []).forEach(id => {
      const p = productById(id);
      if (p && !p.empty && p.cat !== "Consignes") next.other[id] = 0;
    });
  }
  return next;
}

function openChoice(product) {
  currentChoiceProduct = product;
  choice = initChoice(product);
  byId("choiceTitle").textContent = product.name;
  renderChoice();
  byId("choiceDialog").showModal();
}

function renderChoice() {
  const root = byId("choiceContent");
  if (!root || !currentChoiceProduct) return;
  const options = normalizeOptions(currentChoiceProduct.options);
  const sections = [];

  Object.entries(options.sections || {}).forEach(([sectionId, rule]) => {
    if (!rule.enabled || !rule.choiceRequired) return;
    const section = MENU_SECTIONS.find(item => item.id === sectionId);
    const selected = choice.sections?.[sectionId] || {};
    const total = selectedSectionTotal(sectionId);
    const rows = (rule.ids || []).map(id => productById(id)).filter(p => p && !p.empty && p.cat !== "Consignes").map(product => {
      const qty = Number(selected[product.id] || 0);
      const available = availableStock(product.id);
      const stockText = available === null ? "" : `<small>stock ${Math.max(0, available)}</small>`;
      const supplement = rule.supplements?.[product.id] || 0;
      return `<div class="choice-line">
        <strong>${escapeHtml(product.name)}</strong>
        <button type="button" data-choice-section="${escapeHtml(sectionId)}" data-choice-id="${escapeHtml(product.id)}" data-delta="-1">−</button>
        <span>${qty}</span>
        <button type="button" data-choice-section="${escapeHtml(sectionId)}" data-choice-id="${escapeHtml(product.id)}" data-delta="1">+</button>
        <small>${rule.supplementsEnabled && supplement ? `suppl. ${euro(supplement)}` : ""} ${stockText}</small>
      </div>`;
    }).join("");
    sections.push(`<section class="choice-section choice-section-${escapeHtml(sectionId)}"><h3>${escapeHtml(section?.label || sectionId)} <em>${total}/${rule.count}</em></h3>${rows || "<p>Aucun produit disponible.</p>"}</section>`);
  });

  Object.entries(options.groups).forEach(([groupId, rule]) => {
    if (!rule.enabled || !rule.choiceRequired) return;
    const group = choiceGroups[groupId];
    const selected = choice.groups[groupId] || {};
    const total = selectedGroupTotal(groupId);
    const rows = allowedGroupItems(groupId, rule).map(item => {
      const qty = Number(selected[item.id] || 0);
      const available = availableStock(item.id);
      const stockText = available === null ? "" : `<small>stock ${Math.max(0, available)}</small>`;
      return `<div class="choice-line">
        <strong>${escapeHtml(item.name)}</strong>
        <button type="button" data-choice-group="${escapeHtml(groupId)}" data-choice-id="${escapeHtml(item.id)}" data-delta="-1">−</button>
        <span>${qty}</span>
        <button type="button" data-choice-group="${escapeHtml(groupId)}" data-choice-id="${escapeHtml(item.id)}" data-delta="1">+</button>
        ${stockText}
      </div>`;
    }).join("");
    sections.push(`<section class="choice-section"><h3>${escapeHtml(group?.label || groupId)} <em>${total}/${rule.count}</em></h3>${rows}</section>`);
  });

  if (options.other.enabled) {
    const otherCount = Math.max(0, Number(options.other.count) || 0);
    const otherTotal = selectedOtherTotal();
    const rows = (options.other.ids || []).map(id => productById(id)).filter(p => p && !p.empty && p.cat !== "Consignes").map(product => {
      const qty = Number(choice.other[product.id] || 0);
      const available = availableStock(product.id);
      const stockText = available === null ? "" : `<small>stock ${Math.max(0, available)}</small>`;
      const supplement = options.other.supplements?.[product.id] || 0;
      return `<div class="choice-line">
        <strong>${escapeHtml(product.name)}</strong>
        <button type="button" data-choice-other="${escapeHtml(product.id)}" data-delta="-1">−</button>
        <span>${qty}</span>
        <button type="button" data-choice-other="${escapeHtml(product.id)}" data-delta="1">+</button>
        <small>${supplement ? `suppl. ${euro(supplement)}` : ""} ${stockText}</small>
      </div>`;
    }).join("");
    sections.push(`<section class="choice-section"><h3>Boisson / autre <em>${otherTotal}/${otherCount}</em></h3>${rows || "<p>Aucun produit simple disponible.</p>"}</section>`);
  }

  selectedPlatCompositeIds(currentChoiceProduct, choice).forEach(compositeProduct => {
    const nested = ensureNestedChoiceForProduct(compositeProduct);
    const nestedOptions = normalizeOptions(compositeProduct.options);
    Object.entries(nestedOptions.groups).forEach(([groupId, rule]) => {
      if (!rule.enabled || !rule.choiceRequired) return;
      const group = choiceGroups[groupId];
      const selected = nested.groups?.[groupId] || {};
      const total = Object.values(selected).reduce((sum, qty) => sum + (Number(qty) || 0), 0);
      const rows = allowedGroupItems(groupId, rule).map(item => {
        const qty = Number(selected[item.id] || 0);
        const available = availableStock(item.id);
        const stockText = available === null ? "" : `<small>stock ${Math.max(0, available)}</small>`;
        return `<div class="choice-line">
          <strong>${escapeHtml(item.name)}</strong>
          <button type="button" data-nested-product="${escapeHtml(compositeProduct.id)}" data-nested-group="${escapeHtml(groupId)}" data-choice-id="${escapeHtml(item.id)}" data-delta="-1">−</button>
          <span>${qty}</span>
          <button type="button" data-nested-product="${escapeHtml(compositeProduct.id)}" data-nested-group="${escapeHtml(groupId)}" data-choice-id="${escapeHtml(item.id)}" data-delta="1">+</button>
          ${stockText}
        </div>`;
      }).join("");
      sections.push(`<section class="choice-section"><h3>${escapeHtml(compositeProduct.name)} · ${escapeHtml(group?.label || groupId)} <em>${total}/${rule.count}</em></h3>${rows || "<p>Aucun choix disponible.</p>"}</section>`);
    });
  });


  const currentComponents = getCompositeComponents(currentChoiceProduct, choice);
  const delayedChoices = Object.entries(currentComponents)
    .filter(([id, qty]) => (Number(qty) || 0) > 0 && canDelayPickup(id))
    .map(([id, qty]) => {
      const selected = Boolean(choice.delayed?.[id]);
      return `<div class="delayed-choice-line">
        <div><strong>${escapeHtml(stockItemById(id).name)}</strong><small>${Number(qty) || 0} dans la commande</small></div>
        <div class="delayed-choice-buttons">
          <button type="button" data-choice-delayed="${escapeHtml(id)}" data-delayed-value="0" class="${!selected ? "selected" : ""}">Non</button>
          <button type="button" data-choice-delayed="${escapeHtml(id)}" data-delayed-value="1" class="${selected ? "selected" : ""}">Oui</button>
        </div>
      </div>`;
    }).join("");
  if (delayedChoices) {
    sections.push(`<section class="choice-section delayed-choice-section"><h3>Remis plus tard ?</h3>${delayedChoices}</section>`);
  }

  root.innerHTML = sections.join("");
  root.querySelectorAll("[data-choice-delayed]").forEach(btn => btn.addEventListener("click", () => {
    choice.delayed = choice.delayed || {};
    choice.delayed[btn.dataset.choiceDelayed] = btn.dataset.delayedValue === "1";
    renderChoice();
  }));
  root.querySelectorAll("[data-choice-section]").forEach(btn => btn.addEventListener("click", () => changeChoiceSection(btn.dataset.choiceSection, btn.dataset.choiceId, Number(btn.dataset.delta) || 0)));
  root.querySelectorAll("[data-nested-product][data-nested-group]").forEach(btn => btn.addEventListener("click", () => changeNestedChoiceGroup(btn.dataset.nestedProduct, btn.dataset.nestedGroup, btn.dataset.choiceId, Number(btn.dataset.delta) || 0)));
  root.querySelectorAll("[data-choice-group]").forEach(btn => btn.addEventListener("click", () => changeChoiceGroup(btn.dataset.choiceGroup, btn.dataset.choiceId, Number(btn.dataset.delta) || 0)));
  root.querySelectorAll("[data-choice-other]").forEach(btn => btn.addEventListener("click", () => changeChoiceOther(btn.dataset.choiceOther, Number(btn.dataset.delta) || 0)));

  let warning = "";
  Object.entries(options.sections || {}).forEach(([sectionId, rule]) => {
    if (warning || !rule.enabled || !rule.choiceRequired) return;
    const total = selectedSectionTotal(sectionId);
    const label = MENU_SECTIONS.find(item => item.id === sectionId)?.label || sectionId;
    if (total !== rule.count) warning = `${label} : choisir ${rule.count}.`;
  });
  Object.entries(options.groups).forEach(([groupId, rule]) => {
    if (warning || !rule.enabled || !rule.choiceRequired) return;
    const total = selectedGroupTotal(groupId);
    const label = choiceGroups[groupId]?.label || groupId;
    if (total !== rule.count) warning = `${label} : choisir ${rule.count}.`;
  });
  selectedPlatCompositeIds(currentChoiceProduct, choice).forEach(compositeProduct => {
    if (warning) return;
    const nested = ensureNestedChoiceForProduct(compositeProduct);
    const nestedOptions = normalizeOptions(compositeProduct.options);
    Object.entries(nestedOptions.groups).forEach(([groupId, rule]) => {
      if (warning || !rule.enabled || !rule.choiceRequired) return;
      const total = Object.values(nested.groups?.[groupId] || {}).reduce((sum, qty) => sum + (Number(qty) || 0), 0);
      const label = choiceGroups[groupId]?.label || groupId;
      if (total !== rule.count) warning = `${compositeProduct.name} · ${label} : choisir ${rule.count}.`;
    });
  });
  if (!warning && options.other.enabled) {
    const total = selectedOtherTotal();
    const count = Math.max(0, Number(options.other.count) || 0);
    if (total !== count) warning = `Boisson / autre : choisir ${count}.`;
  }
  if (!warning && currentChoiceProduct) warning = checkComponents(getLineComponents(makeCompositeLine(currentChoiceProduct)));
  byId("choiceWarning").textContent = warning;
}

function changeChoiceSection(sectionId, itemId, delta) {
  if (!currentChoiceProduct || !choice.sections?.[sectionId]) return;
  const options = normalizeOptions(currentChoiceProduct.options);
  const rule = options.sections?.[sectionId] || { count: 99 };
  const current = Number(choice.sections[sectionId][itemId] || 0);
  const total = selectedSectionTotal(sectionId);
  if (delta > 0 && total >= rule.count) return;
  choice.sections[sectionId][itemId] = Math.max(0, current + delta);
  renderChoice();
}

function changeNestedChoiceGroup(productId, groupId, itemId, delta) {
  const compositeProduct = productById(productId);
  const nested = ensureNestedChoiceForProduct(compositeProduct);
  if (!nested?.groups?.[groupId]) return;
  const rule = normalizeOptions(compositeProduct.options).groups[groupId] || { count: 99 };
  const current = Number(nested.groups[groupId][itemId] || 0);
  const total = Object.values(nested.groups[groupId] || {}).reduce((sum, qty) => sum + (Number(qty) || 0), 0);
  if (delta > 0 && total >= rule.count) return;
  nested.groups[groupId][itemId] = Math.max(0, current + delta);
  renderChoice();
}

function changeChoiceGroup(groupId, itemId, delta) {
  if (!currentChoiceProduct || !choice.groups[groupId]) return;
  const options = normalizeOptions(currentChoiceProduct.options);
  const rule = options.groups[groupId] || { count: 99 };
  const current = Number(choice.groups[groupId][itemId] || 0);
  const total = selectedGroupTotal(groupId);
  if (delta > 0 && total >= rule.count) return;
  choice.groups[groupId][itemId] = Math.max(0, current + delta);
  renderChoice();
}

function changeChoiceOther(itemId, delta) {
  if (!currentChoiceProduct) return;
  const options = normalizeOptions(currentChoiceProduct.options);
  const limit = Math.max(0, Number(options.other.count) || 0);
  const current = Number(choice.other[itemId] || 0);
  const total = selectedOtherTotal();
  if (delta > 0 && limit > 0 && total >= limit) return;
  choice.other[itemId] = Math.max(0, Math.min(99, current + delta));
  renderChoice();
}

function changeMeat() { /* conservé pour compatibilité anciennes versions */ }

function addChoiceToCart() {
  if (!currentChoiceProduct) return;
  const options = normalizeOptions(currentChoiceProduct.options);
  for (const [sectionId, rule] of Object.entries(options.sections || {})) {
    if (!rule.enabled || !rule.choiceRequired) continue;
    const total = selectedSectionTotal(sectionId);
    if (total !== rule.count) return renderChoice();
  }
  for (const [groupId, rule] of Object.entries(options.groups)) {
    if (!rule.enabled || !rule.choiceRequired) continue;
    const total = selectedGroupTotal(groupId);
    if (total !== rule.count) return renderChoice();
  }
  for (const compositeProduct of selectedPlatCompositeIds(currentChoiceProduct, choice)) {
    const nested = ensureNestedChoiceForProduct(compositeProduct);
    const nestedOptions = normalizeOptions(compositeProduct.options);
    for (const [groupId, rule] of Object.entries(nestedOptions.groups)) {
      if (!rule.enabled || !rule.choiceRequired) continue;
      const total = Object.values(nested.groups?.[groupId] || {}).reduce((sum, qty) => sum + (Number(qty) || 0), 0);
      if (total !== rule.count) return renderChoice();
    }
  }
  if (options.other.enabled) {
    const total = selectedOtherTotal();
    const count = Math.max(0, Number(options.other.count) || 0);
    if (total !== count) return renderChoice();
  }
  const line = makeCompositeLine(currentChoiceProduct);
  const error = checkComponents(getLineComponents(line));
  if (error) { byId("choiceWarning").textContent = error; return; }
  addLineToCart(line);
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
    PRODUCTS.filter(p => p.cat === cat).sort((a, b) => {
      const order = { sans_alcool: 1, alcool: 2, chaud: 3 };
      if (cat === "Boissons") {
        const oa = order[a.subCategory || ""] || 9;
        const ob = order[b.subCategory || ""] || 9;
        if (oa !== ob) return oa - ob;
      }
      return (Number(a.slot) || 0) - (Number(b.slot) || 0);
    }).forEach(product => {
      const btn = document.createElement("button");
      if (product.empty) {
        btn.className = "product-btn empty-slot";
        btn.type = "button";
        btn.disabled = true;
        btn.innerHTML = `<span class="name">&nbsp;</span><span class="price">&nbsp;</span>`;
        grid.appendChild(btn);
        return;
      }
      const out = !canAddProduct(product) && !product.composite;
      const available = product.stockable ? availableStock(product.id) : null;
      const level = stockClass(available);
      btn.className = `product-btn color-${normalizeColor(product.color)} ${product.price < 0 ? "negative" : ""} ${out ? "out" : ""} ${level === "low" ? "low" : ""}`;
      btn.disabled = out;
      const stockLabel = available === null ? "" : `<span class="stock-badge ${level}">Stock ${Math.max(0, available)}</span>`;
      btn.innerHTML = `<span class="name">${escapeHtml(product.name)}</span><span class="price">${euro(product.price)}</span>${stockLabel}`;
      btn.addEventListener("click", () => addProduct(product));
      grid.appendChild(btn);
    });
    if (cat === "Consignes") {
      const monitor = document.createElement("div");
      monitor.id = "meatStockMonitor";
      monitor.className = "meat-stock-monitor";
      monitor.setAttribute("aria-live", "polite");
      monitor.innerHTML = `
        <span class="meat-stock-item meat-stock-card"><span class="meat-icon">🌭</span> <strong id="liveStockSaucisse">—</strong></span>
        <span class="meat-stock-sep">|</span>
        <span class="meat-stock-item meat-stock-card"><span class="meat-icon">🌶️</span> <strong id="liveStockMerguez">—</strong></span>`;
      section.appendChild(monitor);
    }
    root.appendChild(section);
  });
}

function displaySubForLine(line) {
  if (!line) return "";
  const baseSub = line.sub || "";
  const type = normalizeType(line.type);
  if ((type === "composite" || type === "menu") && line.productId) {
    const product = productById(line.productId);
    if (product) {
      try {
        const rebuilt = makeCompositeLine(product, line.selections || initChoice(product));
        if (rebuilt?.sub && rebuilt.sub.length >= String(baseSub).length) return rebuilt.sub;
      } catch (err) {
        // En cas d'ancienne commande incomplète, on garde le texte enregistré.
      }
    }
  }
  return baseSub;
}

function immediateDisplaySubForLine(line) {
  if (!line) return "";
  const type = normalizeType(line.type);
  if (type === "composite" || type === "menu") {
    if (line.subImmediate) return line.subImmediate;
    const full = displaySubForLine(line);
    const delayed = delayedComponentsForLine(line);
    if (!Object.keys(delayed).length) return full || "";
    return String(full || "").replace(/\s*·?\s*À retirer plus tard\s*:\s*.*$/i, "").trim();
  }
  return line.delayedPickup ? "" : (line.sub || "");
}


function stripDetailCategoryLabels(text) {
  text = String(text || "");
  const labels = [
    "Entrée", "Plat", "Dessert", "Fromage", "Boisson",
    "Boisson sans alcool", "Boisson alcoolisée",
    "Viandes", "Viande", "Accompagnements", "Accompagnement", "Autre"
  ];
  labels.sort((a, b) => b.length - a.length).forEach(label => {
    const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    text = text.replace(new RegExp(`(^|[·/,(]\\s*)${escaped}\\s*:\\s*`, "gi"), "$1");
  });
  return text
    .replace(/\s*·\s*·\s*/g, " · ")
    .replace(/\(\s*/g, "(")
    .replace(/\s*\)/g, ")")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function compactOrderSubForLine(line) {
  return stripDetailCategoryLabels(displaySubForLine(line) || `${euro(line.price)} / unité`);
}

function compactTicketSubForLine(line) {
  return stripDetailCategoryLabels(immediateSubForLine(line));
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
      <div><div class="line-name">${escapeHtml(item.name)}</div><div class="line-sub">${escapeHtml(compactOrderSubForLine(item))}</div></div>
      <div class="qty-box"><button>−</button><div class="qty-num">${item.qty}</div><button>+</button></div>
      <div class="line-total">${euro(item.price * item.qty)}</div>`;
    const [minusBtn, plusBtn] = line.querySelectorAll("button");
    minusBtn.addEventListener("click", () => changeQty(item.id, -1));
    plusBtn.addEventListener("click", () => changeQty(item.id, 1));
    root.appendChild(line);
  });
}


function renderMeatStockMonitor() {
  const items = [
    ["saucisse", byId("liveStockSaucisse")],
    ["merguez", byId("liveStockMerguez")]
  ];
  items.forEach(([id, el]) => {
    if (!el) return;
    const card = el.closest(".meat-stock-card");
    const available = availableStock(id);
    card?.classList.remove("empty", "low", "untracked");
    if (available === null) {
      el.textContent = "—";
      card?.classList.add("untracked");
    } else {
      const value = Math.max(0, available);
      el.textContent = value;
      if (value <= 0) card?.classList.add("empty");
      else if (value < 10) card?.classList.add("low");
    }
  });
}

function renderPayment() {
  const total = getTotal();
  const received = getReceived();
  const isRefund = total < 0;
  byId("total").textContent = euro(total);
  const receivedEl = byId("received"); if (receivedEl) receivedEl.textContent = isRefund ? euro(0) : euro(received);
  const changeEl = byId("change"); if (changeEl) changeEl.textContent = isRefund ? euro(Math.abs(total)) : euro(Math.max(0, received - total));
  const cashBtn = byId("cashPayBtn");
  if (cashBtn) cashBtn.textContent = isRefund ? "Rembourser" : "Espèces";
  document.body.classList.toggle("cash-disabled", !generalSettings.cashEnabled);
  document.body.classList.toggle("negative-total", isRefund);
  const s = stats();
  const global = s.cashTotal + s.cardTotal;
  const oc = byId("ordersCount"); if (oc) oc.textContent = orders.length;
  const ct = byId("cashTotal"); if (ct) ct.textContent = euro(s.cashTotal);
  const cbt = byId("cardTotal"); if (cbt) cbt.textContent = euro(s.cardTotal);
  const gt = byId("globalTotal"); if (gt) gt.textContent = euro(global);
}
function renderAll() { renderProducts(); renderCart(); renderPayment(); renderMeatStockMonitor(); }

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
      saveStock(); renderProducts(); renderStockList(); renderMeatStockMonitor();
    });
    input.addEventListener("focus", () => input.select());
    root.appendChild(row);
  });
}


let printCleanupTimer = null;

function cleanupPrintMode() {
  document.body.classList.remove("print-ticket", "print-bilan");
  if (printCleanupTimer) {
    clearTimeout(printCleanupTimer);
    printCleanupTimer = null;
  }
}

function startPrintMode(mode) {
  if (printCleanupTimer) clearTimeout(printCleanupTimer);
  document.body.classList.remove("print-ticket", "print-bilan");
  document.body.classList.add(mode);
  // Sur iPad/AirPrint, l'aperçu peut se construire lentement. Ne pas enlever
  // le mode impression après 500 ms, sinon une page blanche peut être relancée.
  printCleanupTimer = setTimeout(cleanupPrintMode, 60000);
}

function buildStandalonePrintHtml(mode, contentHtml) {
  const isTicket = mode === "print-ticket";
  const css = isTicket ? `
    @page { size: 105mm 148mm; margin: 0; }
    html, body {
      margin:0;
      padding:0;
      background:#fff;
      color:#000;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      -webkit-text-size-adjust: 100%;
      text-size-adjust: 100%;
    }
    body {
      box-sizing:border-box;
      width:105mm;
      min-width:105mm;
      max-width:105mm;
      font-family: Arial, Helvetica, sans-serif;
      overflow:visible;
      min-height:148mm;
    }
    .ticket {
      box-sizing:border-box;
      width:105mm;
      min-width:105mm;
      max-width:105mm;
      padding:2mm 2.5mm;
      color:#000;
      font-size:15pt;
      font-weight:900;
      line-height:1.08;
    }
    .ticket h1 { text-align:center; font-size:15pt; margin:0 0 1mm; line-height:1; font-weight:900; }
    /* v26.18 : rendu iPad calé sur le ticket Mac : titre encadré + corps légèrement agrandi */
    .ticket-order {
      text-align:center;
      font-size:14pt;
      font-weight:900;
      border:1px solid currentColor;
      padding:.8mm 1mm .7mm;
      margin:0 0 1.2mm;
      line-height:1;
    }
    .ticket-date { text-align:center; font-size:10pt; font-weight:800; margin-bottom:1mm; }
    .ticket-section, .ticket-caisse { border-top:1px dashed currentColor; padding-top:.8mm; margin-top:1mm; }
    .ticket-line, .ticket-menu-line, .ticket-composite-line, .ticket-menu-item { break-inside:avoid; page-break-inside:avoid; margin-bottom:1.25mm; }
    .ticket-line strong, .ticket-menu-line > strong {
      display:grid;
      grid-template-columns:minmax(0,1fr) auto auto;
      column-gap:1.7mm;
      align-items:center;
      font-size:17.5pt;
      line-height:1.04;
      font-weight:900;
    }
    .ticket-main { min-width:0; }
    .ticket-line strong em, .ticket-menu-line > strong em { justify-self:end; font-size:10.5pt; font-style:normal; font-weight:900; white-space:nowrap; }
    .ticket-line-detail, .ticket-menu-detail, .ticket-line span:not(.ticket-checks):not(.ticket-box):not(.ticket-main):not(.ticket-rest) {
      display:block;
      margin-left:7mm;
      margin-top:.25mm;
      margin-bottom:.65mm;
      font-size:10.5pt;
      line-height:1.05;
      font-weight:800;
      font-style:italic;
    }
    .ticket-checks { display:inline-block; white-space:nowrap; font-family: Arial, Helvetica, sans-serif; font-size:18pt; line-height:1; letter-spacing:.35mm; min-width:7mm; text-align:right; }
    .ticket-checks.empty { min-width:7mm; }
    .ticket-box { display:inline !important; border:0 !important; width:auto !important; height:auto !important; font-size:18pt !important; line-height:1 !important; }
    .ticket-menu-items { margin-left:7mm; margin-top:.4mm; }
    .ticket-menu-item { display:grid; grid-template-columns:minmax(0,1fr) auto; gap:1.7mm; align-items:center; font-size:15.5pt; line-height:1.04; font-weight:900; }
    .ticket-rest, .ticket-rest-inline { font-size:13pt; font-weight:900; white-space:nowrap; font-style:normal; }
    .ticket-total, .ticket-pay, .ticket-change { display:flex; justify-content:space-between; gap:3mm; align-items:baseline; font-size:14pt; line-height:1.05; margin-top:.7mm; font-weight:900; }
    .ticket-total strong, .ticket-pay strong, .ticket-change strong { font-size:14.5pt; }
    .ticket-change { border-top:1px solid currentColor; padding-top:.8mm; }
    hr { border:0; border-top:1px dashed currentColor; margin:1mm 0; }
  ` : `
    @page { size: A4 portrait; margin: 10mm; }
    html, body { margin:0; padding:0; background:#fff; color:#000; font-family: Arial, Helvetica, sans-serif; }
    body { font-size:11px; }
  `;
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"><title>Impression</title><style>${css}</style></head><body class="${mode}">${contentHtml}</body></html>`;
}

function ensureDirectPrintStyle(mode) {
  let style = document.getElementById("directPrintStyle");
  if (!style) {
    style = document.createElement("style");
    style.id = "directPrintStyle";
    document.head.appendChild(style);
  }

  if (mode === "print-ticket") {
    style.textContent = `
@media print {
  /* v26.18 : contre-marges AirPrint iPad/Epson.
     L'iPad garde environ 15 mm de zone blanche même en A6. On imprime donc
     le ticket dans une couche plus grande, déplacée vers le haut/gauche,
     pour récupérer la zone utile sans toucher aux cases ni aux polices. */
  @page { size: A6 portrait; margin: 0; }

  html, body {
    margin: 0 !important;
    padding: 0 !important;
    width: 105mm !important;
    min-width: 105mm !important;
    max-width: 105mm !important;
    height: 148mm !important;
    background: #fff !important;
    overflow: visible !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    -webkit-text-size-adjust: 100% !important;
    text-size-adjust: 100% !important;
  }

  body.print-ticket > *:not(#printArea) { display: none !important; }
  body.print-ticket #printArea {
    display: block !important;
    position: relative !important;
    left: -11mm !important;
    top: -10mm !important;
    margin: 0 !important;
    padding: 0 !important;
    width: 127mm !important;
    min-width: 127mm !important;
    max-width: 127mm !important;
    min-height: 180mm !important;
    overflow: visible !important;
    transform: scale(1.18) !important;
    transform-origin: top left !important;
  }

  body.print-ticket #printArea .ticket {
    display: block !important;
    box-sizing: border-box !important;
    width: 105mm !important;
    min-width: 105mm !important;
    max-width: 105mm !important;
    min-height: auto !important;
    margin: 0 !important;
    padding: 2mm 2.5mm !important;
    border: 0 !important;
    box-shadow: none !important;
    color: #000 !important;
    font-family: Arial, Helvetica, sans-serif !important;
    font-size: 15pt !important;
    font-weight: 900 !important;
    line-height: 1.08 !important;
    transform: none !important;
  }

  body.print-ticket #printArea .ticket h1 { text-align:center !important; font-size:15pt !important; margin:0 0 1mm !important; line-height:1 !important; font-weight:900 !important; }
  body.print-ticket #printArea .ticket-order { text-align:center !important; font-size:14pt !important; font-weight:900 !important; border:1px solid currentColor !important; padding:.8mm 1mm .7mm !important; margin:0 0 1.2mm !important; line-height:1 !important; }
  body.print-ticket #printArea .ticket-date { text-align:center !important; font-size:10pt !important; font-weight:800 !important; margin-bottom:1mm !important; }
  body.print-ticket #printArea .ticket-section,
  body.print-ticket #printArea .ticket-caisse { border-top:1px dashed currentColor !important; padding-top:.8mm !important; margin-top:1mm !important; }

  body.print-ticket #printArea .ticket-line,
  body.print-ticket #printArea .ticket-menu-line,
  body.print-ticket #printArea .ticket-composite-line,
  body.print-ticket #printArea .ticket-menu-item { break-inside:avoid !important; page-break-inside:avoid !important; margin-bottom:1.25mm !important; }

  body.print-ticket #printArea .ticket-line strong,
  body.print-ticket #printArea .ticket-menu-line > strong {
    display:grid !important;
    grid-template-columns:minmax(0,1fr) auto auto !important;
    column-gap:1.7mm !important;
    align-items:center !important;
    font-size:17.5pt !important;
    line-height:1.04 !important;
    font-weight:900 !important;
  }
  body.print-ticket #printArea .ticket-main { min-width:0 !important; }
  body.print-ticket #printArea .ticket-line strong em,
  body.print-ticket #printArea .ticket-menu-line > strong em { justify-self:end !important; font-size:10.5pt !important; font-style:normal !important; font-weight:900 !important; white-space:nowrap !important; }

  body.print-ticket #printArea .ticket-line-detail,
  body.print-ticket #printArea .ticket-menu-detail,
  body.print-ticket #printArea .ticket-line span:not(.ticket-checks):not(.ticket-box):not(.ticket-main):not(.ticket-rest) {
    display:block !important;
    margin-left:7mm !important;
    margin-top:.25mm !important;
    margin-bottom:.65mm !important;
    font-size:10.5pt !important;
    line-height:1.05 !important;
    font-weight:800 !important;
    font-style:italic !important;
  }

  body.print-ticket #printArea .ticket-checks { display:inline-block !important; white-space:nowrap !important; font-family:Arial, Helvetica, sans-serif !important; font-size:21pt !important; line-height:1 !important; letter-spacing:.35mm !important; min-width:7mm !important; text-align:right !important; }
  body.print-ticket #printArea .ticket-checks.empty { min-width:7mm !important; }
  body.print-ticket #printArea .ticket-box { display:inline !important; border:0 !important; width:auto !important; height:auto !important; font-size:21pt !important; line-height:1 !important; font-weight:1000 !important; }

  body.print-ticket #printArea .ticket-menu-items { margin-left:7mm !important; margin-top:.4mm !important; }
  body.print-ticket #printArea .ticket-menu-item { display:grid !important; grid-template-columns:minmax(0,1fr) auto !important; gap:1.7mm !important; align-items:center !important; font-size:15.5pt !important; line-height:1.04 !important; font-weight:900 !important; }
  body.print-ticket #printArea .ticket-rest,
  body.print-ticket #printArea .ticket-rest-inline { font-size:13pt !important; font-weight:900 !important; white-space:nowrap !important; font-style:normal !important; }
  body.print-ticket #printArea .ticket-total,
  body.print-ticket #printArea .ticket-pay,
  body.print-ticket #printArea .ticket-change { display:flex !important; justify-content:space-between !important; gap:3mm !important; align-items:baseline !important; font-size:14pt !important; line-height:1.05 !important; margin-top:.7mm !important; font-weight:900 !important; }
  body.print-ticket #printArea .ticket-total strong,
  body.print-ticket #printArea .ticket-pay strong,
  body.print-ticket #printArea .ticket-change strong { font-size:14.5pt !important; }
  body.print-ticket #printArea .ticket-change { border-top:1px solid currentColor !important; padding-top:.8mm !important; }
}
`;
  } else {
    style.textContent = "";
  }
}

function printCurrentContent(mode) {
  // v26.18 : retour à l'impression directe de la page principale.
  // Les versions avec iframe/fenêtre temporaire provoquaient sur iPad le passage A4 -> A6
  // et un ticket visible à la place de l'interface. Ici, seul #printArea est rendu en mode impression.
  ensureDirectPrintStyle(mode);
  startPrintMode(mode);
  setTimeout(() => {
    try { window.print(); }
    finally {
      // On garde le mode assez longtemps pour laisser AirPrint finir son second rendu.
      if (printCleanupTimer) clearTimeout(printCleanupTimer);
      printCleanupTimer = setTimeout(cleanupPrintMode, 60000);
    }
  }, 250);
}

window.addEventListener("afterprint", cleanupPrintMode);
window.addEventListener("focus", () => {
  if (document.body.classList.contains("print-ticket") || document.body.classList.contains("print-bilan")) {
    setTimeout(cleanupPrintMode, 800);
  }
});

function finishOrder(payment, volunteerName = "") {
  const total = getTotal();
  if (!cart.length || total === 0) return alert("Commande vide ou total invalide.");
  if (total < 0 && payment !== "cash") return alert("Un retour de consigne se rembourse uniquement en espèces.");
  if (generalSettings.cashEnabled && payment === "cash" && total > 0 && getReceived() < total) return alert("Montant reçu insuffisant.");

  const used = componentsInCart();
  for (const [id, qty] of Object.entries(used)) {
    const current = stockValue(id);
    if (current !== null && current < qty) return alert(`${stockItemById(id).name} : stock insuffisant`);
  }

  const order = {
    number: orders.length + 1,
    prefix: normalizeOrderPrefix(generalSettings.orderPrefix),
    date: new Date().toISOString(),
    payment,
    volunteerName: payment === "volunteer" ? volunteerName : "",
    volunteerSettled: false,
    total,
    received: total < 0 ? 0 : (generalSettings.cashEnabled && payment === "cash" ? getReceived() : (payment === "card" ? total : 0)),
    change: total < 0 ? Math.abs(total) : (generalSettings.cashEnabled && payment === "cash" ? Math.max(0, getReceived() - total) : 0),
    lines: cart.map(item => ({ ...item })),
    components: used
  };

  orders.push(order);
  Object.entries(used).forEach(([id, qty]) => {
    const current = stockValue(id);
    if (current !== null) stock[id] = String(Math.max(0, current - qty));
  });
  saveOrders();
  saveStock();

  const isOnlyReturnConsigne = total < 0 && order.lines.every(line => line.id === "retour");
  if (payment !== "volunteer" && !isOnlyReturnConsigne) {
    lastPrintedOrder = order;
    byId("printArea").innerHTML = renderTicketHtml(order);
    printCurrentContent("print-ticket");
  }

  cart = [];
  receivedDigits = "";
  renderAll();
  showToast(payment === "volunteer" ? `Commande ${orderDisplayNumber(order)} enregistrée pour ${volunteerName}` : `Commande ${orderDisplayNumber(order)} enregistrée`);
}

function stats() {
  const cashTotal = orders.filter(o => o.payment === "cash").reduce((sum, o) => sum + o.total, 0);
  const cardTotal = orders.filter(o => o.payment === "card").reduce((sum, o) => sum + o.total, 0);
  const volunteerTotal = orders.filter(o => o.payment === "volunteer").reduce((sum, o) => sum + o.total, 0);
  const volunteerUnsettledTotal = orders.filter(o => o.payment === "volunteer" && !o.volunteerSettled).reduce((sum, o) => sum + o.total, 0);
  const refundTotal = orders.filter(o => o.kind === "refund").reduce((sum, o) => sum + Math.abs(Number(o.total) || 0), 0);
  const volunteerByName = {};
  orders.filter(o => o.payment === "volunteer").forEach(o => {
    const name = o.volunteerName || "Bénévole";
    if (!volunteerByName[name]) volunteerByName[name] = { total: 0, settled: 0, unsettled: 0, count: 0 };
    volunteerByName[name].total += o.total;
    volunteerByName[name].count += 1;
    if (o.volunteerSettled) volunteerByName[name].settled += o.total;
    else volunteerByName[name].unsettled += o.total;
  });
  const soldByProductId = {};
  const soldByName = {};
  const revenueByName = {};
  const comps = {};
  const drinkChoices = { coca: 0, oasis: 0, icetea: 0, soft: 0, biere25: 0, vin_rouge: 0, vin_blanc: 0, vin_rose: 0 };
  const meatChoices = { saucisse: 0, merguez: 0 };
  const choiceDetails = {};
  const addChoiceDetail = (id, qty) => {
    const amount = (Number(qty) || 0);
    if (!id || amount <= 0) return;
    choiceDetails[id] = (choiceDetails[id] || 0) + amount;
  };

  orders.forEach(order => {
    order.lines.forEach(line => {
      if (line.kind === "refund" || order.kind === "refund") return;
      const lineQty = Number(line.qty) || 0;
      const key = line.productId || line.id;
      soldByProductId[key] = (soldByProductId[key] || 0) + lineQty;
      soldByName[line.name] = (soldByName[line.name] || 0) + lineQty;
      revenueByName[line.name] = (revenueByName[line.name] || 0) + line.price * lineQty;

      if (line.selections) {
        Object.values(line.selections.sections || {}).forEach(sectionValues => {
          Object.entries(sectionValues || {}).forEach(([id, qty]) => addChoiceDetail(id, qty * lineQty));
        });
        Object.values(line.selections.groups || {}).forEach(groupValues => {
          Object.entries(groupValues || {}).forEach(([id, qty]) => addChoiceDetail(id, qty * lineQty));
        });
        Object.entries(line.selections.other || {}).forEach(([id, qty]) => {
          addChoiceDetail(id, qty * lineQty);
          if (id in drinkChoices) drinkChoices[id] += (Number(qty) || 0) * lineQty;
        });
      }

      // Compatibilité anciennes commandes.
      if (line.drink) {
        drinkChoices[line.drink] = (drinkChoices[line.drink] || 0) + lineQty;
        addChoiceDetail(line.drink, lineQty);
      }
      if (line.meats) {
        meatChoices.saucisse += (line.meats.saucisse || 0) * lineQty;
        meatChoices.merguez += (line.meats.merguez || 0) * lineQty;
        addChoiceDetail("saucisse", (line.meats.saucisse || 0) * lineQty);
        addChoiceDetail("merguez", (line.meats.merguez || 0) * lineQty);
      }
    });
    Object.entries(order.components || {}).forEach(([id, qty]) => comps[id] = (comps[id] || 0) + qty);
  });
  meatChoices.saucisse = choiceDetails.saucisse || meatChoices.saucisse;
  meatChoices.merguez = choiceDetails.merguez || meatChoices.merguez;
  return { cashTotal, cardTotal, volunteerTotal, volunteerUnsettledTotal, volunteerByName, refundTotal, soldByProductId, soldByName, revenueByName, comps, drinkChoices, meatChoices, choiceDetails };
}

function tableRows(rows, empty = "Aucune donnée") {
  return rows.length ? rows.join("") : `<tr><td>${empty}</td><td></td><td></td></tr>`;
}

function renderBilan() {
  const s = stats();
  const root = byId("bilanContent");
  const cashFund = Number(generalSettings.cashFund) || 0;
  const cashExpected = cashFund + s.cashTotal;
  const total = s.cashTotal + s.cardTotal;
  const volunteerRows = Object.entries(s.volunteerByName).map(([name, data]) =>
    `<tr><td>${escapeHtml(name)}</td><td>${data.count}</td><td>${euro(data.unsettled)}</td><td>${euro(data.settled)}</td><td>${euro(data.total)}</td></tr>`
  ).join("");
  const productRows = PRODUCTS.filter(product => !product.empty).map(product => {
    const qty = s.soldByProductId[product.id] || 0;
    const ca = Object.entries(s.revenueByName).filter(([name]) => name === product.name).reduce((sum, [, value]) => sum + value, 0);
    const stockRestant = product.stockable ? (stockValue(product.id) === null ? "Non suivi" : stockValue(product.id)) : "";
    return `<tr><td>${product.name}</td><td>${qty}</td><td>${euro(ca)}</td><td>${stockRestant}</td></tr>`;
  }).join("");

  const compRows = STOCK_ITEMS.map(item => {
    const used = s.comps[item.id] || 0;
    const remaining = stockValue(item.id) === null ? "Non suivi" : stockValue(item.id);
    return `<tr><td>${item.name}</td><td>${used}</td><td>${remaining}</td></tr>`;
  }).join("");

  const orderedChoiceIds = [];
  STOCK_ITEMS.forEach(item => { if (!orderedChoiceIds.includes(item.id)) orderedChoiceIds.push(item.id); });
  Object.keys(s.choiceDetails).forEach(id => { if (!orderedChoiceIds.includes(id)) orderedChoiceIds.push(id); });
  const choiceRows = orderedChoiceIds
    .filter(id => (s.choiceDetails[id] || 0) > 0)
    .map(id => `<tr><td>${escapeHtml(stockItemById(id).name)}</td><td>${s.choiceDetails[id] || 0}</td><td></td></tr>`)
    .join("") || '<tr><td>Aucun choix enregistré</td><td>0</td><td></td></tr>';

  root.innerHTML = `
    <div class="bilan-grid">
      <div class="mini-stat"><span>Commandes</span><strong>${orders.length}</strong></div>
      <div class="mini-stat"><span>Fond de caisse</span><strong>${euro(cashFund)}</strong></div>
      <div class="mini-stat"><span>Espèces encaissées</span><strong>${euro(s.cashTotal)}</strong></div>
      <div class="mini-stat"><span>Espèces attendues</span><strong>${euro(cashExpected)}</strong></div>
      <div class="mini-stat"><span>CB</span><strong>${euro(s.cardTotal)}</strong></div>
      <div class="mini-stat"><span>Total ventes</span><strong>${euro(total)}</strong></div>
      <div class="mini-stat"><span>Remboursements</span><strong>${euro(s.refundTotal || 0)}</strong></div>
      <div class="mini-stat"><span>Bénévoles à régler</span><strong>${euro(s.volunteerUnsettledTotal)}</strong></div>
      <div class="mini-stat"><span>Bénévoles total</span><strong>${euro(s.volunteerTotal)}</strong></div>
    </div>
    <h3>Bénévoles</h3>
    <div class="bilan-table compact"><table><thead><tr><th>Nom</th><th>Commandes</th><th>À régler</th><th>Réglé</th><th>Total</th></tr></thead><tbody>${volunteerRows || '<tr><td>Aucune commande bénévole</td><td></td><td></td><td></td><td></td></tr>'}</tbody></table></div>
    <h3 style="margin-top:10px">Ventes par produit</h3>
    <div class="bilan-table"><table><thead><tr><th>Produit</th><th>Vendu</th><th>CA</th><th>Stock restant</th></tr></thead><tbody>${productRows}</tbody></table></div>
    <h3 style="margin-top:10px">Détail menus / assiettes</h3>
    <div class="bilan-table compact"><table><thead><tr><th>Choix</th><th>Quantité</th><th></th></tr></thead><tbody>${choiceRows}</tbody></table></div>
    <h3 style="margin-top:10px">Consommation et stocks restants</h3>
    <div class="bilan-table"><table><thead><tr><th>Stock</th><th>Utilisé</th><th>Restant</th></tr></thead><tbody>${compRows}</tbody></table></div>`;
}

function renderBilanPrintableHtml() {
  renderBilan();
  return `<div class="bilan-print"><h1>Bilan caisse</h1><p>${formatDateTime(new Date().toISOString())}</p>${byId("bilanContent").innerHTML}</div>`;
}

function printBilan() {
  byId("printArea").innerHTML = renderBilanPrintableHtml();
  printCurrentContent("print-bilan");
}

function exportBilanCSV() {
  const s = stats();
  const rows = [
    ["section", "libelle", "quantite", "montant_centimes", "stock_restant"],
    ["resume", "commandes", orders.length, "", ""],
    ["resume", "fond_de_caisse", "", Number(generalSettings.cashFund) || 0, ""],
    ["resume", "ca_especes", "", s.cashTotal, ""],
    ["resume", "especes_attendues", "", (Number(generalSettings.cashFund) || 0) + s.cashTotal, ""],
    ["resume", "ca_cb", "", s.cardTotal, ""],
    ["resume", "ca_total", "", s.cashTotal + s.cardTotal, ""],
    ["resume", "benevoles_a_regler", "", s.volunteerUnsettledTotal, ""],
    ["resume", "benevoles_total", "", s.volunteerTotal, ""]
  ];
  Object.entries(s.volunteerByName).forEach(([name, data]) => rows.push(["benevole", name, data.count, data.unsettled, `réglé ${data.settled} / total ${data.total}`]));
  PRODUCTS.filter(product => !product.empty).forEach(product => rows.push(["produit", product.name, s.soldByProductId[product.id] || 0, "", product.stockable ? (stockValue(product.id) ?? "non suivi") : ""]));
  rows.push(["choix", "saucisse", s.meatChoices.saucisse, "", stockValue("saucisse") ?? "non suivi"]);
  rows.push(["choix", "merguez", s.meatChoices.merguez, "", stockValue("merguez") ?? "non suivi"]);
  rows.push(["choix", "menus avec coca", s.drinkChoices.coca || s.drinkChoices.soft || 0, "", ""]);
  rows.push(["choix", "menus avec oasis", s.drinkChoices.oasis || 0, "", ""]);
  rows.push(["choix", "menus avec ice tea", s.drinkChoices.icetea || 0, "", ""]);
  rows.push(["choix", "menus avec biere", s.drinkChoices.biere25 || 0, "", ""]);
  rows.push(["choix", "menus avec vin rouge", s.drinkChoices.vin_rouge || 0, "", ""]);
  rows.push(["choix", "menus avec vin blanc", s.drinkChoices.vin_blanc || 0, "", ""]);
  rows.push(["choix", "menus avec vin rose", s.drinkChoices.vin_rose || 0, "", ""]);
  STOCK_ITEMS.forEach(item => rows.push(["stock", item.name, s.comps[item.id] || 0, "", stockValue(item.id) ?? "non suivi"]));
  downloadCSV(rows, `bilan-detaille-moroges-${new Date().toISOString().slice(0, 10)}.csv`);
}

function renderHistory() {
  const root = byId("historyContent");
  const search = (byId("historySearch")?.value || "").trim();
  let list = orders.slice().reverse();
  if (search) {
    const q = search.toUpperCase();
    list = list.filter(order => String(order.number).includes(search) || orderDisplayNumber(order).includes(q));
  }
  if (!list.length) { root.innerHTML = `<div class="empty-history">${orders.length ? "Aucune commande trouvée" : "Aucune commande enregistrée"}</div>`; return; }
  root.innerHTML = list.map(order => {
    const lines = order.lines.map(line => {
      const sub = displaySubForLine(line);
      const lineTotal = (Number(line.price) || 0) * (Number(line.qty) || 0);
      return `<li><div class="history-line-main"><span class="history-line-title">${line.qty} x ${escapeHtml(line.name)}</span><strong>${euro(lineTotal)}</strong></div>${sub ? `<span class="history-line-sub">${escapeHtml(sub)}</span>` : ""}</li>`;
    }).join("");
    const paymentLabel = order.payment === "card" ? "CB" : order.payment === "volunteer" ? "Bénévole" : "Espèces";
    const paid = order.payment === "cash"
      ? `${euro(order.received || 0)} payé · ${euro(order.change || 0)} rendu`
      : order.payment === "volunteer"
        ? `${escapeHtml(order.volunteerName || "Bénévole")} · ${order.volunteerSettled ? "Réglé" : "À régler"}`
        : "Payé CB";
    const actions = order.payment === "volunteer"
      ? `<button type="button" class="small-btn" data-toggle-volunteer="${order.number}">${order.volunteerSettled ? "Remettre à régler" : "Marquer réglé"}</button>`
      : `<button type="button" class="small-btn" data-print-order="${order.number}">Réimprimer</button>`;
    return `<article class="history-card">
      <header><strong>Commande ${orderDisplayNumber(order)}</strong><span>${formatDateTime(order.date)}</span><span>${paymentLabel}</span><b>${euro(order.total)}</b></header>
      <div class="history-paid">${paid}</div>
      <ul>${lines}</ul>
      ${actions}
    </article>`;
  }).join("");
  root.querySelectorAll("[data-print-order]").forEach(btn => btn.addEventListener("click", () => {
    const order = orders.find(o => String(o.number) === btn.dataset.printOrder);
    if (order) {
      byId("printArea").innerHTML = renderTicketHtml(order);
      printCurrentContent("print-ticket");
    }
  }));
  root.querySelectorAll("[data-toggle-volunteer]").forEach(btn => btn.addEventListener("click", () => {
    const order = orders.find(o => String(o.number) === btn.dataset.toggleVolunteer);
    if (order) {
      order.volunteerSettled = !order.volunteerSettled;
      saveOrders();
      renderHistory();
      renderBilan();
    }
  }));
}

function downloadCSV(rows, filename) {
  const csv = rows.map(row => row.map(value => `"${String(value ?? "").replaceAll('"', '""')}"`).join(";")).join("\n");
  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"]/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));
}

function formatDateTime(iso) {
  return new Date(iso).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" });
}

function showToast(message) {
  const toast = byId("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function orderFromCurrentCart() {
  return {
    number: orders.length + 1,
    prefix: normalizeOrderPrefix(generalSettings.orderPrefix),
    date: new Date().toISOString(),
    payment: "non validé",
    total: getTotal(),
    lines: cart.map(item => ({ ...item }))
  };
}

function delayedComponentsForLine(line) {
  if (line.delayedComponents && typeof line.delayedComponents === "object") return line.delayedComponents;
  if (line.type === "composite") {
    const out = {};
    Object.entries(line.components || {}).forEach(([id, qty]) => { if (isDelayedPickup(id)) addToBucket(out, id, qty); });
    return out;
  }
  return line.delayedPickup ? { [line.id]: 1 } : {};
}

function immediateSubForLine(line) {
  return immediateDisplaySubForLine(line);
}

function delayedRowsForOrder(order) {
  return {};
}


function ticketDisplayGroup(line) {
  const product = productConfigById(line?.productId || line?.id) || productById(line?.productId || line?.id) || {};
  const cat = String(product.cat || line?.cat || "").toLowerCase();
  const sub = String(product.subCategory || line?.subCategory || "").toLowerCase();
  const type = normalizeType(line?.type || product.type || "simple");
  const name = String(line?.name || product.name || "").toLowerCase();
  // Tri interne du ticket, sans afficher les noms de rubriques :
  // Boissons, Menus, Entrées, Plats, Fromages, Autres, Desserts, Consignes.
  if (cat.includes("consigne") || name.includes("consigne") || Number(line?.price || 0) < 0) return 8;
  if (cat.includes("boisson") || sub === "sans_alcool" || sub === "alcool" || sub === "chaud") return 1;
  if (type === "menu") return 2;
  if (sub === "entree") return 3;
  if (type === "composite" || sub === "plat" || cat.includes("restauration") && !["dessert", "fromage"].includes(sub)) return 4;
  if (sub === "fromage") return 5;
  if (sub === "dessert") return 7;
  return 6;
}

function sortedTicketLines(lines) {
  return (lines || [])
    .map((line, index) => ({ line, index }))
    .sort((a, b) => ticketDisplayGroup(a.line) - ticketDisplayGroup(b.line) || a.index - b.index)
    .map(item => item.line);
}

function ticketNeedsRestField(qty) {
  return Math.max(1, Number(qty) || 1) > 6;
}

function ticketRestText(qty) {
  return ticketNeedsRestField(qty) ? '<span class="ticket-rest-inline">Reste : ___</span>' : '';
}

function ticketCheckboxes(qty) {
  const count = Math.max(1, Number(qty) || 1);
  if (count > 6) return '';
  return Array.from({ length: count }, () => '<span class="ticket-box">□</span>').join('');
}

function isTicketCheckable(line) {
  const product = productConfigById(line?.productId || line?.id) || productById(line?.productId || line?.id) || {};
  const cat = String(product.cat || line?.cat || "");
  const name = String(line?.name || product.name || "").toLowerCase();
  if (cat === "Consignes" || name.includes("consigne")) return false;
  if (Number(line?.price || 0) <= 0) return false;
  if (line?.kind === "refund") return false;
  return true;
}

function ticketCheckHtml(qty, enabled = true) {
  if (!enabled || ticketNeedsRestField(qty)) return `<span class="ticket-checks empty"></span>`;
  return `<span class="ticket-checks">${ticketCheckboxes(qty)}</span>`;
}

function selectedSectionForTicket(line, sectionId) {
  const product = productById(line?.productId || line?.id) || {};
  const options = normalizeOptions(product.options || {});
  const rule = options.sections?.[sectionId];
  if (!rule?.enabled) return {};
  const selected = line?.selections?.sections?.[sectionId];
  return selected && typeof selected === "object" ? selected : (rule.defaults || {});
}

function menuTicketItems(line) {
  if (normalizeType(line?.type) !== "menu") return [];
  const result = [];
  const lineQty = Math.max(1, Number(line.qty) || 1);
  ["plat", "boisson", "dessert", "entree", "fromage"].forEach(sectionId => {
    const selected = selectedSectionForTicket(line, sectionId);
    Object.entries(selected || {}).forEach(([id, qty]) => {
      const amount = (Number(qty) || 0) * lineQty;
      if (amount <= 0) return;
      const product = productById(id) || stockItemById(id);
      let detail = "";
      if (sectionId === "plat" && product && normalizeType(product.type) === "composite") {
        const nestedChoice = line.selections?.nested?.[id] || initChoice(product);
        const nestedLine = makeCompositeLine(product, nestedChoice);
        detail = stripDetailCategoryLabels(nestedLine.subImmediate || "");
      }
      result.push({ qty: amount, name: product?.name || stockItemById(id).name || id, detail, sectionId });
    });
  });
  return result;
}

function renderTicketLine(line) {
  const qty = Math.max(1, Number(line.qty) || 1);
  const lineTotal = (Number(line.price) || 0) * qty;
  const type = normalizeType(line?.type || "simple");
  const isMenu = type === "menu";
  const sub = compactTicketSubForLine(line);
  const checkable = isTicketCheckable(line);
  const menuItems = isMenu ? menuTicketItems(line) : [];
  if (isMenu && menuItems.length) {
    return `<div class="ticket-line ticket-menu-line">
      <strong><span class="ticket-main">${qty} ${escapeHtml(line.name)}</span><span class="ticket-checks empty"></span><em>${euro(lineTotal)}</em></strong>
      <div class="ticket-menu-items">
        ${menuItems.map(item => {
          const label = `${item.qty > 1 ? item.qty + " " : ""}${escapeHtml(item.name)}`;
          const rest = ticketRestText(item.qty);
          const detail = item.detail ? `<div class="ticket-menu-detail">(${escapeHtml(item.detail)})</div>` : "";
          return `<div class="ticket-menu-item"><span>${label}${rest}</span>${ticketCheckHtml(item.qty, true)}</div>${detail}`;
        }).join("")}
      </div>
    </div>`;
  }
  const detail = sub ? `<span class="ticket-line-detail">(${escapeHtml(sub)})</span>` : "";
  const lineClass = type === "composite" ? "ticket-line ticket-composite-line" : "ticket-line";
  return `<div class="${lineClass}">
    <strong><span class="ticket-main">${qty} ${escapeHtml(line.name)}${checkable ? ticketRestText(qty) : ''}</span>${ticketCheckHtml(qty, checkable)}<em>${euro(lineTotal)}</em></strong>
    ${detail}
  </div>`;
}

function renderTicketHtml(order) {
  const normalLines = sortedTicketLines(order.lines || []).map(renderTicketLine).filter(Boolean).join("");

  const isCash = order.payment === "cash";
  const isRefund = order.total < 0 || order.kind === "refund";
  const hasCashDetails = generalSettings.cashEnabled && isCash && !isRefund;
  const received = hasCashDetails ? (order.received ?? getReceived()) : null;
  const change = hasCashDetails ? (order.change ?? Math.max(0, received - order.total)) : null;
  const paymentLabel = order.payment === "card" ? "CB" : order.payment === "volunteer" ? `Bénévole${order.volunteerName ? " - " + order.volunteerName : ""}` : "Espèces";

  return `
    <div class="ticket compact-ticket ticket-color-${normalizeTicketColor(generalSettings.ticketColor)}">
      <div class="ticket-order">Commande ${orderDisplayNumber(order)}</div>

      <section class="ticket-section compact-list">
        ${normalLines || "<p>Aucun article</p>"}
      </section>

      <section class="ticket-caisse compact-caisse">
        <div class="ticket-total"><span>Total</span><strong>${euro(order.total)}</strong></div>
        ${isRefund ? `
          <div class="ticket-change"><span>Remboursé</span><strong>${euro(Math.abs(order.total))}</strong></div>
        ` : hasCashDetails ? `
          <div class="ticket-pay"><span>Payé</span><strong>${euro(received)}</strong></div>
          <div class="ticket-change"><span>Monnaie</span><strong>${euro(change)}</strong></div>
        ` : `<div class="ticket-pay"><span>Paiement</span><strong>${escapeHtml(paymentLabel)}</strong></div>`}
      </section>
    </div>
  `;
}

function printTicket() {
  const order = cart.length ? orderFromCurrentCart() : lastPrintedOrder || orders.at(-1);
  if (!order || !order.lines || !order.lines.length) return alert("Aucun ticket à imprimer.");
  byId("printArea").innerHTML = renderTicketHtml(order);
  printCurrentContent("print-ticket");
}

function updateFullscreenButton() {
  const btn = byId("fullscreenBtn");
  if (!btn) return;
  btn.textContent = document.fullscreenElement ? "Quitter le plein écran" : "Plein écran";
}

function toggleFullscreenMode() {
  if (document.fullscreenElement) {
    document.exitFullscreen?.();
    setTimeout(updateFullscreenButton, 100);
    return;
  }
  document.documentElement.requestFullscreen?.();
  setTimeout(updateFullscreenButton, 100);
}

function exportCSV() {
  const rows = [["numero", "date", "paiement", "benevole", "benevole_regle", "total_centimes", "recu_centimes", "monnaie_centimes", "produit", "details", "quantite", "prix_unitaire_centimes", "composants"]];
  orders.forEach(order => order.lines.forEach(line => {
    const comps = Object.entries(getLineComponents(line)).map(([id, qty]) => `${stockItemById(id).name}:${qty * line.qty}`).join(", ");
    rows.push([orderDisplayNumber(order), order.date, order.payment, order.volunteerName || "", order.volunteerSettled ? "oui" : "non", order.total, order.received, order.change, line.name, line.sub || "", line.qty, line.price, comps]);
  }));
  downloadCSV(rows, `commandes-caisse-sds-${new Date().toISOString().slice(0, 10)}.csv`);
}

function resetCashRegister() {
  const message = [
    "Réinitialiser la caisse ?",
    "",
    "Cela va effacer :",
    "- toutes les commandes",
    "- le bilan espèces / CB / bénévoles",
    "- le panier en cours",
    "- le dernier ticket",
    "",
    "Les stocks saisis sont conservés.",
    "",
    "Confirmer ?"
  ].join("\n");

  if (!confirm(message)) return;

  orders = [];
  cart = [];
  receivedDigits = "";
  lastPrintedOrder = null;
  saveOrders();
  byId("printArea").innerHTML = "";
  renderBilan();
  renderHistory();
  renderAll();
  showToast("Caisse réinitialisée");
}

function renderVolunteerButtons() {
  const root = byId("volunteerButtons");
  if (!root) return;
  root.innerHTML = volunteers.map(name => `<button type="button" data-volunteer-name="${escapeHtml(name)}">${escapeHtml(name)}</button>`).join("");
  root.querySelectorAll("[data-volunteer-name]").forEach(btn => btn.addEventListener("click", () => finishVolunteerOrder(btn.dataset.volunteerName)));
}

function openVolunteerDialog() {
  if (!cart.length || getTotal() <= 0) return alert("Commande vide ou total invalide.");
  renderVolunteerButtons();
  const input = byId("volunteerCustomName");
  if (input) input.value = "";
  byId("volunteerDialog").showModal();
}

function finishVolunteerOrder(name) {
  const clean = String(name || "").trim();
  if (!clean) return alert("Choisir ou saisir un nom de bénévole.");
  byId("volunteerDialog")?.close();
  finishOrder("volunteer", clean);
}

function centsFromInput(value) {
  const raw = String(value || "").trim().replace(",", ".");
  if (raw === "") return 0;
  return Math.round((Number(raw) || 0) * 100);
}

function eurosForInput(cents) {
  return (Number(cents || 0) / 100).toFixed(2).replace(".", ",");
}

function simpleChoiceCandidates(currentId = "") {
  return productConfig
    .filter(item => item.id !== currentId && normalizeType(item.type) === "simple" && String(item.name || "").trim() && Number(item.price) >= 0 && item.cat !== "Consignes")
    .map(item => ({ id: item.id, name: item.name, group: SUBCATEGORY_LABELS[item.subCategory || ""] || item.cat, subCategory: String(item.subCategory || "") }));
}

function fixedCompositionCandidates(currentId = "") {
  return simpleChoiceCandidates(currentId)
    .filter(item => item.subCategory !== "alcool" && item.subCategory !== "sans_alcool");
}

function sectionChoiceCandidates(sectionId, currentId = "") {
  const section = MENU_SECTIONS.find(item => item.id === sectionId) || {};
  return productConfig
    .filter(item => {
      if (item.id === currentId || !String(item.name || "").trim() || Number(item.price) < 0 || item.cat === "Consignes") return false;
      const type = normalizeType(item.type);
      if (section.kind === "composite") return type === "composite";
      if (type !== "simple") return false;
      const sub = String(item.subCategory || "");
      if (Array.isArray(section.subs)) return section.subs.includes(sub);
      return sub === String(section.sub || sectionId || "");
    })
    .map(item => ({ id: item.id, name: item.name, group: normalizeType(item.type) === "composite" ? "Plat composé" : (SUBCATEGORY_LABELS[item.subCategory || ""] || item.cat) }));
}

function simpleComponentCandidates(currentId = "") {
  return simpleChoiceCandidates(currentId);
}

function renderChoiceGroupManager() {
  const root = byId("choiceGroupsManagerContent");
  if (!root) return;
  root.innerHTML = Object.entries(choiceGroups).map(([groupId, group]) => {
    const rows = Array.from({ length: 12 }, (_, index) => {
      const item = group.items[index] || { id: `${groupId}_${index + 1}`, name: "" };
      const currentStock = stock[item.id] ?? "";
      return `<div class="group-item-row" data-group-id="${escapeHtml(groupId)}" data-item-index="${index}">
        <input class="group-item-name" value="${escapeHtml(item.name || "")}" placeholder="Nom">
        <input class="group-item-stock" inputmode="numeric" value="${escapeHtml(currentStock)}" placeholder="Stock">
      </div>`;
    }).join("");
    return `<section class="settings-category choice-group-settings" data-choice-group="${escapeHtml(groupId)}">
      <h3>${escapeHtml(group.label)}</h3>
      ${rows}
    </section>`;
  }).join("");
}

function applyChoiceGroupManager() {
  const nextGroups = normalizeChoiceGroups(choiceGroups);
  document.querySelectorAll("#choiceGroupsManagerContent .choice-group-settings[data-choice-group]").forEach(section => {
    const groupId = section.dataset.choiceGroup;
    const group = nextGroups[groupId];
    if (!group) return;
    const items = [];
    section.querySelectorAll(".group-item-row").forEach((row, index) => {
      const name = row.querySelector(".group-item-name")?.value.trim() || "";
      const oldId = group.items[index]?.id || `${groupId}_${index + 1}`;
      const stockValueRaw = row.querySelector(".group-item-stock")?.value.trim() || "";
      if (name) {
        items.push({ id: oldId, name });
        stock[oldId] = stockValueRaw === "" ? "" : String(Math.max(0, Math.min(99999, Number(stockValueRaw) || 0)));
      } else {
        stock[oldId] = "";
      }
    });
    group.items = items;
  });
  choiceGroups = normalizeChoiceGroups(nextGroups);
  saveChoiceGroups();
  STOCK_ITEMS = buildStockItems();
  for (const item of STOCK_ITEMS) if (!(item.id in stock)) stock[item.id] = "";
  saveStock();
  saveProductConfig();
  renderAll();
  renderStockList();
  renderSettings();
  showToast("Viandes / accompagnements enregistrés");
  byId("choiceGroupsDialog")?.close();
}


function renderSettings() {
  const root = byId("settingsContent");
  if (!root) return;
  const categories = ["Boissons", "Restauration", "Consignes"];
  root.innerHTML = categories.map(cat => {
    const categoryReset = cat === "Boissons" || cat === "Restauration"
      ? `<button class="danger small-btn reset-category-btn" type="button" data-reset-category="${cat}">↺ ${cat}</button>`
      : "";
    const rows = productConfig.filter(item => item.cat === cat).sort((a, b) => a.slot - b.slot).map(item => {
      const type = normalizeType(item.type);
      const typeOptions = Object.entries(TYPE_LABELS).map(([value, label]) => `<option value="${value}" ${type === value ? "selected" : ""}>${label}</option>`).join("");
      const components = normalizeComponents(item.components);
      const options = normalizeOptions(item.options);
      const fixedCandidates = fixedCompositionCandidates(item.id);
      const candidates = simpleChoiceCandidates(item.id);
      const subCategory = String(item.subCategory || "");
      const subCategoryOptions = PRODUCT_SUBCATEGORIES.map(sc => `<option value="${sc.id}" ${subCategory === sc.id ? "selected" : ""}>${sc.label}</option>`).join("");
      const sectionPanels = MENU_SECTIONS.map(section => {
        const rule = options.sections?.[section.id] || { enabled: false, count: 0, choiceRequired: false, ids: [], defaults: {}, supplementsEnabled: false, supplements: {} };
        const sectionCandidates = sectionChoiceCandidates(section.id, item.id);
        const allowed = Array.isArray(rule.ids) ? rule.ids : [];
        const supplementsEnabledSection = Boolean(rule.supplementsEnabled);
        const itemRows = sectionCandidates.map(candidate => {
          const checked = allowed.includes(candidate.id) ? "checked" : "";
          const defaultQty = Number(rule.defaults?.[candidate.id] || 0);
          const supplement = rule.supplements?.[candidate.id] || 0;
          return `<div class="group-default-row section-default-row">
            <label><input type="checkbox" data-section-choice="${escapeHtml(section.id)}" data-section-choice-id="${escapeHtml(candidate.id)}" ${checked}> ${escapeHtml(candidate.name)}</label>
            <input data-section-default="${escapeHtml(section.id)}" data-section-default-id="${escapeHtml(candidate.id)}" inputmode="numeric" value="${defaultQty}" placeholder="Défaut">
            <input class="section-supplement-input" data-section-supplement="${escapeHtml(section.id)}" data-section-supplement-id="${escapeHtml(candidate.id)}" inputmode="decimal" value="${eurosForInput(supplement)}" placeholder="Supplément" style="display:${supplementsEnabledSection ? "block" : "none"}">
          </div>`;
        }).join("");
        return `<div class="group-option-panel" data-section-option-panel="${escapeHtml(section.id)}">
          <div class="group-option-head"><label><input class="option-section" data-option-section="${escapeHtml(section.id)}" type="checkbox" ${rule.enabled ? "checked" : ""}> ${escapeHtml(section.label)}</label></div>
          <div class="group-rule-row compact"><label>Nombre <input class="option-section-count" data-option-section-count="${escapeHtml(section.id)}" inputmode="numeric" value="${Number(rule.count) || 0}"></label><label><input class="option-section-choice" data-option-section-choice="${escapeHtml(section.id)}" type="checkbox" ${rule.choiceRequired ? "checked" : ""}> Choix client</label><label><input type="checkbox" data-section-supplements="${escapeHtml(section.id)}" ${supplementsEnabledSection ? "checked" : ""}> Supplément</label></div>
          <p class="settings-note">Coche les articles disponibles. Si “Choix client” est décoché, les quantités “Défaut” sont ajoutées automatiquement.</p>
          <div class="mini-check-grid default-grid">${itemRows || `<p>Aucun produit simple avec la sous-rubrique ${escapeHtml(section.label)}.</p>`}</div>
        </div>`;
      }).join("");
      const groupPanels = Object.entries(choiceGroups).map(([groupId, group]) => {
        const rule = options.groups[groupId] || { enabled: false, count: 0, choiceRequired: false, ids: null, defaults: {} };
        const allowed = Array.isArray(rule.ids) ? rule.ids : (group.items || []).map(i => i.id);
        const groupSupplementsEnabled = Boolean(rule.supplementsEnabled);
        const itemRows = (group.items || []).map(groupItem => {
          const checked = allowed.includes(groupItem.id) ? "checked" : "";
          const defaultQty = Number(rule.defaults?.[groupItem.id] || 0);
          const supplement = rule.supplements?.[groupItem.id] || 0;
          return `<div class="group-default-row">
            <label><input type="checkbox" data-group-choice="${escapeHtml(groupId)}" data-group-choice-id="${escapeHtml(groupItem.id)}" ${checked}> ${escapeHtml(groupItem.name)}</label>
            <input data-group-default="${escapeHtml(groupId)}" data-group-default-id="${escapeHtml(groupItem.id)}" inputmode="numeric" value="${defaultQty}" placeholder="Défaut">
            <input class="group-supplement-input" data-group-supplement="${escapeHtml(groupId)}" data-group-supplement-id="${escapeHtml(groupItem.id)}" inputmode="decimal" value="${eurosForInput(supplement)}" placeholder="Supplément" style="display:${groupSupplementsEnabled ? "block" : "none"}">
          </div>`;
        }).join("");
        return `<div class="group-option-panel" data-group-option-panel="${escapeHtml(groupId)}">
          <div class="group-option-head"><label><input class="option-group" data-option-group="${escapeHtml(groupId)}" type="checkbox" ${rule.enabled ? "checked" : ""}> ${escapeHtml(group.label)}</label></div>
          <div class="group-rule-row compact"><label>Nombre <input class="option-group-count" data-option-group-count="${escapeHtml(groupId)}" inputmode="numeric" value="${Number(rule.count) || 0}"></label><label><input class="option-group-choice" data-option-group-choice="${escapeHtml(groupId)}" type="checkbox" ${rule.choiceRequired ? "checked" : ""}> Choix à faire</label><label><input type="checkbox" data-group-supplements="${escapeHtml(groupId)}" ${groupSupplementsEnabled ? "checked" : ""}> Supplément</label></div>
          <p class="settings-note">Si “Choix à faire” est décoché, les quantités “Défaut” sont utilisées automatiquement.</p>
          <div class="mini-check-grid default-grid">${itemRows || "<p>Aucun élément.</p>"}</div>
        </div>`;
      }).join("");
      const componentRows = fixedCandidates.map(candidate => {
        const found = components.find(component => component.id === candidate.id);
        const checked = found ? "checked" : "";
        const qty = found?.qty || 1;
        return `<label class="component-row">
          <input type="checkbox" data-component-id="${escapeHtml(candidate.id)}" ${checked}>
          <span>${escapeHtml(candidate.name)} <em>${escapeHtml(candidate.group || "")}</em></span>
          <input class="component-qty" data-component-qty="${escapeHtml(candidate.id)}" inputmode="numeric" value="${qty}" aria-label="Quantité ${escapeHtml(candidate.name)}">
        </label>`;
      }).join("");
      const supplementsEnabled = Boolean(options.other.supplementsEnabled);
      const otherRows = candidates.map(candidate => {
        const enabled = (options.other.ids || []).includes(candidate.id);
        const supplement = options.other.supplements?.[candidate.id] || 0;
        return `<label class="component-row other-row">
          <input type="checkbox" data-other-option="${escapeHtml(candidate.id)}" ${enabled ? "checked" : ""}>
          <span>${escapeHtml(candidate.name)} <em>${escapeHtml(candidate.group || "")}</em></span>
          <input class="supplement-input" data-supplement-for="${escapeHtml(candidate.id)}" inputmode="decimal" value="${eurosForInput(supplement)}" placeholder="Supplément" style="display:${supplementsEnabled ? "block" : "none"}">
        </label>`;
      }).join("");
      const otherCount = Math.max(0, Number(options.other.count) || 0);
      return `<div class="settings-row-wrap" data-config-id="${item.id}">
        <div class="settings-row">
          <div class="settings-slot">${item.slot}</div>
          <input class="settings-name" value="${escapeHtml(item.name || "")}" placeholder="Bouton vide">
          <input class="settings-price" value="${eurosForInput(item.price)}" inputmode="decimal" placeholder="0,00">
          <select class="settings-type">${typeOptions}</select>
          <select class="settings-subcategory" title="Famille" style="display:${type === "simple" && cat !== "Consignes" ? "block" : "none"}">${subCategoryOptions}</select>
          <label class="settings-refundable" title="Produit remboursable"><input type="checkbox" ${item.cat !== "Consignes" && Number(item.price) > 0 && item.refundable !== false ? "checked" : ""} ${item.cat === "Consignes" || Number(item.price) <= 0 ? "disabled" : ""}> Remb.</label>
          <button class="reset-slot-btn" type="button" data-reset-button="${escapeHtml(item.id)}" title="Réinitialiser ce bouton" aria-label="Réinitialiser ce bouton">↺</button>
        </div>
        
        <div class="settings-composite" style="display:${(type === "composite" || type === "menu") ? "block" : "none"}">
          <div class="settings-subtitle menu-only" style="display:${type === "menu" ? "block" : "none"}">Composition du menu</div>
          <p class="settings-note menu-only" style="display:${type === "menu" ? "block" : "none"}">Pour chaque partie du menu : coche les articles possibles. Si “Choix client” est décoché, les quantités “Défaut” sont ajoutées automatiquement. Les suppléments peuvent être activés par partie.</p>
          <div class="group-options-grid menu-only" style="display:${type === "menu" ? "grid" : "none"}">${sectionPanels}</div>
          <div class="settings-subtitle composite-only" style="display:${type === "composite" ? "block" : "none"}">Composition du plat : viandes / accompagnements</div>
          <p class="settings-note composite-only" style="display:${type === "composite" ? "block" : "none"}">Utilisé uniquement pour un produit composé de type plat. Dans un menu, le plat se choisit dans la rubrique “Plat”.</p>
          <div class="group-options-grid composite-only" style="display:${type === "composite" ? "grid" : "none"}">${groupPanels}</div>
          <div class="settings-subtitle legacy-composite-only" style="display:none">Composition fixe déduite du stock</div>
          <div class="components-grid" style="display:none">${componentRows || "<p>Aucun produit simple disponible hors boissons.</p>"}</div>
          <div class="settings-subtitle legacy-other-only" style="display:none">Produits simples au choix</div>
          <div class="group-rule-row compact other-count-row" style="display:none"><label>Nombre à choisir <input class="other-count-input" data-other-count inputmode="numeric" value="${otherCount}"></label><label><input type="checkbox" data-other-supplements ${supplementsEnabled ? "checked" : ""}> Activer les suppléments</label></div>
          <div class="components-grid other-options" style="display:none">${otherRows || "<p>Aucun produit simple disponible.</p>"}</div>
        </div>
      </div>`;
    }).join("");
    return `<section class="settings-category"><div class="settings-category-head"><h3>${cat}</h3>${categoryReset}</div>${rows}</section>`;
  }).join("");
  root.querySelectorAll(".settings-type").forEach(select => select.addEventListener("change", event => {
    const wrap = event.target.closest(".settings-row-wrap");
    const isComposite = event.target.value === "composite" || event.target.value === "menu";
    const isMenu = event.target.value === "menu";
    const panel = wrap?.querySelector(".settings-composite");
    const delayed = wrap?.querySelector(".settings-delayed");
    const subcat = wrap?.querySelector(".settings-subcategory");
    if (panel) panel.style.display = isComposite ? "block" : "none";
    if (delayed) delayed.style.display = "none";
    if (subcat) subcat.style.display = (!isComposite && wrap?.closest(".settings-category")?.querySelector("h3")?.textContent !== "Consignes") ? "block" : "none";
    wrap?.querySelectorAll(".menu-only").forEach(el => el.style.display = isMenu ? (el.classList.contains("group-options-grid") ? "grid" : "block") : "none");
    wrap?.querySelectorAll(".composite-only").forEach(el => el.style.display = event.target.value === "composite" ? (el.classList.contains("group-options-grid") ? "grid" : "block") : "none");
  }));
  root.querySelectorAll("[data-other-supplements]").forEach(check => check.addEventListener("change", event => {
    const wrap = event.target.closest(".settings-composite");
    wrap?.querySelectorAll(".supplement-input").forEach(input => input.style.display = event.target.checked ? "block" : "none");
  }));
  root.querySelectorAll("[data-section-supplements]").forEach(check => check.addEventListener("change", event => {
    const panel = event.target.closest("[data-section-option-panel]");
    panel?.querySelectorAll(".section-supplement-input").forEach(input => input.style.display = event.target.checked ? "block" : "none");
  }));
  root.querySelectorAll("[data-group-supplements]").forEach(check => check.addEventListener("change", event => {
    const panel = event.target.closest("[data-group-option-panel]");
    panel?.querySelectorAll(".group-supplement-input").forEach(input => input.style.display = event.target.checked ? "block" : "none");
  }));
  root.querySelectorAll("[data-reset-button]").forEach(btn => btn.addEventListener("click", () => resetSingleProductButton(btn.dataset.resetButton)));
  root.querySelectorAll("[data-reset-category]").forEach(btn => btn.addEventListener("click", () => resetProductCategory(btn.dataset.resetCategory)));
}


function emptyProductButton(base) {
  return {
    id: base.id,
    slot: base.slot,
    cat: base.cat,
    name: "",
    price: 0,
    type: "simple",
    color: "white",
    subCategory: "",
    canDelayPickup: false,
    delayedPickup: false,
    components: [],
    options: normalizeOptions({})
  };
}

function replaceProductConfigItem(id, nextItem) {
  productConfig = productConfig.map(item => item.id === id ? nextItem : item);
}

function refreshAfterSettingsReset(message) {
  saveProductConfig();
  PRODUCTS = buildProducts();
  STOCK_ITEMS = buildStockItems();
  for (const item of STOCK_ITEMS) if (!(item.id in stock)) stock[item.id] = "";
  saveStock();
  renderSettings();
  renderAll();
  renderStockList();
  showToast(message);
}

function resetSingleProductButton(id) {
  const item = productConfig.find(p => p.id === id);
  if (!item) return;
  const label = item.name ? `“${item.name}”` : `bouton ${item.slot}`;
  if (!confirm(`Réinitialiser ${label} ?

Le bouton redeviendra vide.`)) return;
  replaceProductConfigItem(item.id, emptyProductButton(item));
  refreshAfterSettingsReset("Bouton réinitialisé");
}

function resetProductCategory(cat) {
  if (cat !== "Boissons" && cat !== "Restauration") return;
  if (!confirm(`Réinitialiser tous les boutons ${cat} ?

Tous les boutons de cette rubrique redeviendront vides.`)) return;
  productConfig = productConfig.map(item => item.cat === cat ? emptyProductButton(item) : item);
  refreshAfterSettingsReset(`${cat} réinitialisés`);
}

function applySettingsFromDialog() {
  document.querySelectorAll(".settings-row-wrap[data-config-id]").forEach(wrap => {
    const item = productConfig.find(p => p.id === wrap.dataset.configId);
    if (!item) return;
    item.name = wrap.querySelector(".settings-name")?.value.trim() || "";
    item.price = centsFromInput(wrap.querySelector(".settings-price")?.value || "0");
    item.type = normalizeType(wrap.querySelector(".settings-type")?.value || "simple");
    item.color = defaultColorForProduct(item);
    item.subCategory = item.type === "simple" && item.cat !== "Consignes" ? String(wrap.querySelector(".settings-subcategory")?.value || "") : "";
    item.refundable = item.cat !== "Consignes" && Number(item.price) > 0 && Boolean(wrap.querySelector(".settings-refundable input")?.checked);
    item.canDelayPickup = item.cat !== "Consignes" && Boolean(wrap.querySelector(".settings-delayed input")?.checked);
    item.delayedPickup = false;
    if (item.type === "composite" || item.type === "menu") {
      const components = [];
      wrap.querySelectorAll("[data-component-id]").forEach(check => {
        if (!check.checked) return;
        const id = check.dataset.componentId;
        const qtyInput = Array.from(wrap.querySelectorAll("[data-component-qty]")).find(input => input.dataset.componentQty === id);
        components.push({ id, qty: Math.max(1, Math.min(99, Number(qtyInput?.value) || 1)) });
      });
      const otherIds = [];
      const supplements = {};
      wrap.querySelectorAll("[data-other-option]").forEach(check => {
        if (!check.checked) return;
        const id = check.dataset.otherOption;
        otherIds.push(id);
        const input = Array.from(wrap.querySelectorAll("[data-supplement-for]")).find(el => el.dataset.supplementFor === id);
        const supplement = centsFromInput(input?.value || "0");
        if (supplement) supplements[id] = supplement;
      });
      item.components = normalizeComponents(components);
      const sections = {};
      MENU_SECTIONS.forEach(section => {
        const enabled = Boolean(wrap.querySelector(`[data-option-section="${section.id}"]`)?.checked);
        const count = Math.max(0, Math.min(99, Number(wrap.querySelector(`[data-option-section-count="${section.id}"]`)?.value) || 0));
        const choiceRequired = Boolean(wrap.querySelector(`[data-option-section-choice="${section.id}"]`)?.checked);
        const ids = Array.from(wrap.querySelectorAll(`[data-section-choice="${section.id}"]`)).filter(check => check.checked).map(check => check.dataset.sectionChoiceId).filter(Boolean);
        const defaults = {};
        Array.from(wrap.querySelectorAll(`[data-section-default="${section.id}"]`)).forEach(input => {
          const qty = Math.max(0, Math.min(99, Number(input.value) || 0));
          if (qty > 0) defaults[input.dataset.sectionDefaultId] = qty;
        });
        const sectionSupplementsEnabled = Boolean(wrap.querySelector(`[data-section-supplements="${section.id}"]`)?.checked);
        const sectionSupplements = {};
        Array.from(wrap.querySelectorAll(`[data-section-supplement="${section.id}"]`)).forEach(input => {
          const supplement = centsFromInput(input.value || "0");
          if (supplement) sectionSupplements[input.dataset.sectionSupplementId] = supplement;
        });
        sections[section.id] = { enabled: item.type === "menu" && enabled, count, choiceRequired, ids, defaults, supplementsEnabled: sectionSupplementsEnabled, supplements: sectionSupplementsEnabled ? sectionSupplements : {} };
      });
      const groups = {};
      Object.entries(choiceGroups).forEach(([groupId, group]) => {
        const enabled = Boolean(wrap.querySelector(`[data-option-group="${groupId}"]`)?.checked);
        const count = Math.max(0, Math.min(99, Number(wrap.querySelector(`[data-option-group-count="${groupId}"]`)?.value) || 0));
        const choiceRequired = Boolean(wrap.querySelector(`[data-option-group-choice="${groupId}"]`)?.checked);
        const ids = Array.from(wrap.querySelectorAll(`[data-group-choice="${groupId}"]`)).filter(check => check.checked).map(check => check.dataset.groupChoiceId).filter(Boolean);
        const defaults = {};
        Array.from(wrap.querySelectorAll(`[data-group-default="${groupId}"]`)).forEach(input => {
          const qty = Math.max(0, Math.min(99, Number(input.value) || 0));
          if (qty > 0) defaults[input.dataset.groupDefaultId] = qty;
        });
        const groupSupplementsEnabled = Boolean(wrap.querySelector(`[data-group-supplements="${groupId}"]`)?.checked);
        const groupSupplements = {};
        Array.from(wrap.querySelectorAll(`[data-group-supplement="${groupId}"]`)).forEach(input => {
          const supplement = centsFromInput(input.value || "0");
          if (supplement) groupSupplements[input.dataset.groupSupplementId] = supplement;
        });
        groups[groupId] = { enabled: item.type === "composite" && enabled, count, choiceRequired, ids, defaults, supplementsEnabled: groupSupplementsEnabled, supplements: groupSupplementsEnabled ? groupSupplements : {} };
      });
      const otherCount = Math.max(0, Math.min(99, Number(wrap.querySelector("[data-other-count]")?.value) || (otherIds.length ? 1 : 0)));
      const supplementsEnabled = Boolean(wrap.querySelector("[data-other-supplements]")?.checked);
      item.options = {
        sections,
        groups,
        other: { enabled: false, count: 0, ids: [], supplementsEnabled: false, supplements: {} }
      };
    } else {
      item.components = [];
      item.options = normalizeOptions({});
    }
  });
  try {
    saveProductConfig();
    PRODUCTS = buildProducts();
    STOCK_ITEMS = buildStockItems();
    for (const item of STOCK_ITEMS) if (!(item.id in stock)) stock[item.id] = "";
    saveStock();
    closeSettingsDialogSafely();
    renderAll();
    renderStockList();
    renderSettings();
    showToast("Paramètres enregistrés");
  } catch (error) {
    console.error("Erreur lors de l'enregistrement des paramètres", error);
    alert("Les paramètres n'ont pas pu être enregistrés. La configuration a été sécurisée, recharge la page puis réessaie.");
    productConfig = sanitizeProductConfig(productConfig);
    saveProductConfig();
  }
}

function resetProductSettings() {
  if (!confirm("Réinitialiser tous les boutons Boissons et Restauration ?\n\nCette action va effacer uniquement les boutons Boissons et Restauration.\n\nLes boutons Consignes seront conservés.")) return;
  productConfig = productConfig.map(item => {
    if (item.cat === "Boissons" || item.cat === "Restauration") return emptyProductButton(item);
    return item;
  });
  saveProductConfig();
  PRODUCTS = buildProducts();
  STOCK_ITEMS = buildStockItems();
  for (const item of STOCK_ITEMS) if (!(item.id in stock)) stock[item.id] = "";
  saveStock();
  renderSettings();
  renderAll();
  renderStockList();
  showToast("Boutons Boissons et Restauration réinitialisés");
}

function renderGeneralSettings() {
  const cash = byId("generalCashEnabled");
  if (cash) cash.checked = Boolean(generalSettings.cashEnabled);
  const cashFund = byId("generalCashFund");
  if (cashFund) cashFund.value = eurosForInput(Number(generalSettings.cashFund) || 0);
  const ticketColor = byId("generalTicketColor");
  if (ticketColor) ticketColor.value = normalizeTicketColor(generalSettings.ticketColor);
  const orderPrefix = byId("generalOrderPrefix");
  if (orderPrefix) orderPrefix.value = normalizeOrderPrefix(generalSettings.orderPrefix);
  const colorRoot = byId("categoryColorsSettingsList");
  if (colorRoot) {
    const colors = normalizedCategoryColors(generalSettings.categoryColors);
    colorRoot.innerHTML = COLOR_CATEGORIES.map(cat => {
      const options = COLOR_PALETTE.map(c => `<option value="${c.id}" ${colors[cat.id] === c.id ? "selected" : ""}>${c.label}</option>`).join("");
      return `<label class="general-input-row category-color-row"><span>${escapeHtml(cat.label)}</span><select data-category-color="${escapeHtml(cat.id)}">${options}</select></label>`;
    }).join("");
  }
  const root = byId("volunteersSettingsList");
  if (!root) return;
  root.innerHTML = volunteers.map((name, index) => `
    <div class="volunteer-setting-row" data-volunteer-index="${index}">
      <input value="${escapeHtml(name)}" placeholder="Nom du bénévole">
      <button class="danger small-btn" type="button" data-remove-volunteer="${index}">Supprimer</button>
    </div>
  `).join("");
  root.querySelectorAll("[data-remove-volunteer]").forEach(btn => btn.addEventListener("click", () => {
    const index = Number(btn.dataset.removeVolunteer);
    volunteers.splice(index, 1);
    if (!volunteers.length) volunteers.push("Bénévole 1");
    renderGeneralSettings();
  }));
}

function applyGeneralSettings() {
  generalSettings.cashEnabled = Boolean(byId("generalCashEnabled")?.checked);
  generalSettings.cashFund = centsFromInput(byId("generalCashFund")?.value || "0");
  generalSettings.ticketColor = normalizeTicketColor(byId("generalTicketColor")?.value || "black");
  generalSettings.orderPrefix = normalizeOrderPrefix(byId("generalOrderPrefix")?.value || "A");
  const categoryColors = {};
  document.querySelectorAll("[data-category-color]").forEach(select => { categoryColors[select.dataset.categoryColor] = normalizeColor(select.value); });
  generalSettings.categoryColors = normalizedCategoryColors(categoryColors);
  const names = Array.from(document.querySelectorAll(".volunteer-setting-row input"))
    .map(input => String(input.value || "").trim())
    .filter(Boolean);
  volunteers = names.length ? names : [...DEFAULT_VOLUNTEERS];
  saveGeneralSettings();
  saveVolunteers();
  renderPayment();
  showToast("Paramètres généraux enregistrés");
  byId("generalSettingsDialog")?.close();
}

function addVolunteerSettingRow() {
  volunteers.push(`Bénévole ${volunteers.length + 1}`);
  renderGeneralSettings();
}


function closeSettingsDialogSafely() {
  const active = document.activeElement;
  if (active && typeof active.blur === "function") active.blur();
  const dialog = byId("settingsDialog");
  if (dialog?.open) dialog.close();
}

function bindSafeTap(button, handler) {
  if (!button) return;
  let lastTouch = 0;
  const run = event => {
    event.preventDefault();
    event.stopPropagation();
    const active = document.activeElement;
    if (active && typeof active.blur === "function") active.blur();
    handler(event);
  };
  button.addEventListener("touchend", event => {
    lastTouch = Date.now();
    run(event);
  }, { passive: false });
  button.addEventListener("click", event => {
    if (Date.now() - lastTouch < 700) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    run(event);
  });
}


let refundSelection = {};
function refundableProducts() {
  return PRODUCTS.filter(p => !p.empty && p.cat !== "Consignes" && Number(p.price) > 0 && p.refundable !== false);
}
function refundTotal() {
  return Object.entries(refundSelection).reduce((sum, [id, qty]) => {
    const p = productById(id);
    return sum + (p ? (Number(p.price) || 0) * (Number(qty) || 0) : 0);
  }, 0);
}
function renderRefundDialog() {
  const root = byId("refundContent");
  if (!root) return;
  const rows = refundableProducts().map(product => {
    const qty = Math.max(0, Number(refundSelection[product.id]) || 0);
    return `<div class="refund-row">
      <strong>${escapeHtml(product.name)}</strong>
      <button type="button" data-refund-id="${escapeHtml(product.id)}" data-delta="-1">−</button>
      <span>${qty}</span>
      <button type="button" data-refund-id="${escapeHtml(product.id)}" data-delta="1">+</button>
      <em>${euro(qty * (Number(product.price) || 0))}</em>
    </div>`;
  }).join("");
  root.innerHTML = rows || `<p>Aucun produit remboursable.</p>`;
  const totalEl = byId("refundTotal");
  if (totalEl) totalEl.textContent = euro(refundTotal());
  root.querySelectorAll("[data-refund-id]").forEach(btn => btn.addEventListener("click", () => {
    const id = btn.dataset.refundId;
    const delta = Number(btn.dataset.delta) || 0;
    refundSelection[id] = Math.max(0, Math.min(99, (Number(refundSelection[id]) || 0) + delta));
    if (!refundSelection[id]) delete refundSelection[id];
    renderRefundDialog();
  }));
}
function openRefundDialog() {
  refundSelection = {};
  renderRefundDialog();
  byId("refundDialog")?.showModal();
}
function validateRefund() {
  const total = refundTotal();
  if (total <= 0) return alert("Aucun produit sélectionné.");
  const lines = Object.entries(refundSelection).map(([id, qty]) => {
    const product = productById(id);
    return { id, productId: id, name: product?.name || id, price: -(Number(product?.price) || 0), qty: Number(qty) || 0, kind: "refund" };
  }).filter(line => line.qty > 0);
  const order = {
    number: orders.length + 1,
    prefix: normalizeOrderPrefix(generalSettings.orderPrefix),
    date: new Date().toISOString(),
    payment: "cash",
    kind: "refund",
    volunteerName: "",
    volunteerSettled: false,
    total: -total,
    received: 0,
    change: total,
    lines,
    components: {}
  };
  orders.push(order);
  saveOrders();
  byId("refundDialog")?.close();
  refundSelection = {};
  renderAll();
  showToast(`Remboursement ${orderDisplayNumber(order)} enregistré : ${euro(total)}`);
}

function bindEvents() {
  byId("clearCartBtn").addEventListener("click", () => { cart = []; renderAll(); });
  const closeSettingsMenu = () => { const dialog = byId("settingsMenuDialog"); if (dialog?.open) dialog.close(); };
  byId("stockBtn")?.addEventListener("click", () => { closeSettingsMenu(); renderStockList(); byId("stockDialog").showModal(); });
  byId("settingsMenuBtn")?.addEventListener("click", () => { byId("settingsMenuDialog")?.showModal(); });
  byId("settingsBtn")?.addEventListener("click", () => { closeSettingsMenu(); renderSettings(); byId("settingsDialog").showModal(); });
  byId("choiceGroupsBtn")?.addEventListener("click", () => { closeSettingsMenu(); renderChoiceGroupManager(); byId("choiceGroupsDialog")?.showModal(); });
  byId("generalSettingsBtn")?.addEventListener("click", () => { closeSettingsMenu(); renderGeneralSettings(); byId("generalSettingsDialog")?.showModal(); });
  byId("saveGeneralSettingsBtn")?.addEventListener("click", applyGeneralSettings);
  byId("addVolunteerSettingBtn")?.addEventListener("click", addVolunteerSettingRow);
  byId("saveChoiceGroupsBtn")?.addEventListener("click", applyChoiceGroupManager);
  bindSafeTap(byId("saveSettingsBtn"), applySettingsFromDialog);
  bindSafeTap(byId("saveSettingsBtnBottom"), applySettingsFromDialog);
  bindSafeTap(byId("settingsCloseBtn"), closeSettingsDialogSafely);
  bindSafeTap(byId("settingsCloseBtnBottom"), closeSettingsDialogSafely);
  byId("resetSettingsBtn")?.addEventListener("click", resetProductSettings);
  byId("bilanBtn").addEventListener("click", () => { renderBilan(); byId("bilanDialog").showModal(); });
  byId("historyBtn").addEventListener("click", () => { const hs = byId("historySearch"); if (hs) hs.value = ""; renderHistory(); byId("historyDialog").showModal(); });
  byId("refundBtn")?.addEventListener("click", openRefundDialog);
  byId("validateRefundBtn")?.addEventListener("click", validateRefund);
  byId("historySearch")?.addEventListener("input", renderHistory);
  byId("resetCashRegisterBtn").addEventListener("click", resetCashRegister);
  byId("resetStockBtn").addEventListener("click", () => { if (confirm("Réinitialiser tous les stocks ?")) { STOCK_ITEMS.forEach(i => stock[i.id] = ""); saveStock(); renderStockList(); renderAll(); } });
  byId("resetOrdersBtn").addEventListener("click", () => { if (confirm("Effacer toutes les commandes ?")) { orders = []; saveOrders(); renderBilan(); renderAll(); } });
  byId("exportBilanBtn").addEventListener("click", exportBilanCSV);
  byId("printBilanBtn").addEventListener("click", printBilan);
  byId("exportOrdersBtn").addEventListener("click", exportCSV);
  byId("printTicketBtn").addEventListener("click", printTicket);
  byId("exportBtn")?.addEventListener("click", exportCSV);
  byId("cashPayBtn").addEventListener("click", () => finishOrder("cash"));
  byId("cardPayBtn").addEventListener("click", () => finishOrder("card"));
  byId("volunteerPayBtn")?.addEventListener("click", openVolunteerDialog);
  byId("volunteerCustomBtn")?.addEventListener("click", () => finishVolunteerOrder(byId("volunteerCustomName")?.value || ""));
  byId("exactBtn").addEventListener("click", () => { receivedDigits = String(Math.max(0, getTotal())); renderPayment(); });
  byId("clearReceivedBtn").addEventListener("click", () => { receivedDigits = ""; renderPayment(); });
  byId("fullscreenBtn").addEventListener("click", toggleFullscreenMode);
  document.addEventListener("fullscreenchange", updateFullscreenButton);
  updateFullscreenButton();
  document.querySelectorAll("[data-cash]").forEach(btn => btn.addEventListener("click", () => { receivedDigits = btn.dataset.cash; renderPayment(); }));
  byId("keypad").addEventListener("click", event => { const key = event.target.dataset.key; if (key) { receivedDigits = (receivedDigits + key).replace(/^0+/, "").slice(0, 6); renderPayment(); } });

  byId("addChoiceBtn").addEventListener("click", addChoiceToCart);
  byId("delayedNowBtn")?.addEventListener("click", () => finishDelayedSimpleChoice(false));
  byId("delayedLaterBtn")?.addEventListener("click", () => finishDelayedSimpleChoice(true));

  document.addEventListener("gesturestart", event => event.preventDefault());
  document.addEventListener("dblclick", event => event.preventDefault(), { passive: false });
}

if ("serviceWorker" in navigator) window.addEventListener("load", () => navigator.serviceWorker.register("service-worker.js"));
renderProducts(); bindEvents(); renderAll();
