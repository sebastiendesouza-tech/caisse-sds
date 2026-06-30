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
  configVersion: 2026.13,
  eventName: 'Comité des Fêtes-Moroges',
  orderPrefix: 'A',
  ticketColor: 'black',
  printTicketsEnabled: true,
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
    {
      id: 'p-assiette-gourmande', group: 'Restauration', category: 'Plat', name: 'Assiette gourmande', price: 7, type: 'compose', components: [], choices: [
        { category: 'Viande', min: 2, max: 2, clientChoice: true, options: [{ foodId: 'food-saucisse', supplement: 0 }, { foodId: 'food-merguez', supplement: 0 }] },
        { category: 'Accompagnement', min: 1, max: 1, clientChoice: false, options: [{ foodId: 'food-frites', supplement: 0 }] }
      ], refundable: true, stock: ''
    },
    {
      id: 'p-menu', group: 'Restauration', category: 'Plat', name: 'Menu', price: 10, type: 'menu', components: [], refundable: true, stock: '', menuSections: [
        {
          section: 'Boissons', clientChoice: true, max: 1, options: [
            { productId: 'p-eau-50', supplement: -0.50 },
            { productId: 'p-coca', supplement: 0 }, { productId: 'p-oasis', supplement: 0 }, { productId: 'p-ice-tea', supplement: 0 }, { productId: 'p-biere-25', supplement: 0 },
            { productId: 'p-verre-rose', supplement: 0.50 }, { productId: 'p-verre-blanc', supplement: 0.50 }, { productId: 'p-verre-rouge', supplement: 0.50 }
          ]
        },
        { section: 'Plat', clientChoice: false, max: 1, options: [{ productId: 'p-assiette-gourmande', supplement: 0 }] },
        { section: 'Dessert', clientChoice: true, max: 1, options: [{ productId: 'p-glace-vanille', supplement: 0 }] }
      ]
    },
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

// === Connexion Supabase ===
const SUPABASE_URL = 'https://rounfqdogmrynvznqimv.supabase.co';
const SUPABASE_KEY = 'sb_publishable_Fq68zylBMnVFXrV7CvGMSg_qWNOKrZr';
const SUPABASE_CONFIG_TABLE = 'caisse_config';
const SUPABASE_CONFIG_ID = 1;

const supabaseClient = (window.supabase && SUPABASE_KEY)
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)
  : null;

let supabaseReady = false;
let supabaseSaving = false;
let supabaseReceiving = false;
let supabaseSales = [];
let storedConfig = JSON.parse(localStorage.getItem('caisse_config') || 'null');
let config = normalizeConfig((!storedConfig || Number(storedConfig.configVersion || 0) < 13) ? DEFAULT_CONFIG : storedConfig);
let draftConfig = null;
let cart = [];
let paymentMethod = 'Espèces';
let paidCents = 0;
let orderNumber = 1;
let sales = JSON.parse(localStorage.getItem('caisse_sales') || '[]');
let reportArchive = JSON.parse(localStorage.getItem('caisse_report_archive') || 'null');
let reportResetAt = localStorage.getItem('caisse_report_reset_at') || '';
let lastTicketHtml = localStorage.getItem('caisse_last_ticket_html') || '';
let pendingChoiceProduct = null;
let currentEventId = localStorage.getItem('caisse_event_id') || 'event-1';
let activePaymentField = 'cash';

const fmt = n => new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR'
}).format(n || 0);
const total = () => cart.reduce((sum, item) => sum + item.price * item.qty, 0);
const paidAmount = () => paidCents / 100;
function uid(prefix) { return prefix + '-' + Math.random().toString(36).slice(2, 8); }

function saveConfig() {
  localStorage.setItem('caisse_config', JSON.stringify(config));
  saveConfigToSupabase();
}
async function saveSaleToSupabase(sale) {
  if (!supabaseClient) return;

  console.log('Vente enregistrée avec event_id =', currentEventId);

  const { error } = await supabaseClient
    .from('sales')
    .insert({
      order_number: sale.orderNumber,
      date: sale.date,
      hour: sale.hour,
      payment_method: sale.paymentMethod,
      total: sale.total,
      card_amount: Number(sale.cardAmount ?? sale.sale_data?.cardAmount ?? 0),
      cash_amount: Number(sale.cashAmount ?? sale.sale_data?.cashAmount ?? 0),
      sale_data: sale,
      event_id: currentEventId,
      device_code: getDeviceCode(),
      printed: false
    });

  if (error) {
    console.error('Erreur sauvegarde vente Supabase', error);
  }
}

function getDisplayMode() {
  return localStorage.getItem('displayMode') || 'standard';
}

function setDisplayMode(mode) {
  localStorage.setItem('displayMode', mode);

  if (mode === 'compact') {
    document.body.classList.remove('show-payment');
  }

  applyDisplayMode();
  updateDisplayModeButton();
}

function applyDisplayMode() {
  document.body.classList.toggle(
    'compact-mode',
    getDisplayMode() === 'compact'
  );
}
async function loadSalesFromSupabase() {
  if (!supabaseClient) return;
  console.log('Manifestation active =', currentEventId);
  const { data, error } = await supabaseClient
    .from('sales')
    .select('*')
    .eq('event_id', currentEventId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Erreur chargement ventes Supabase', error);
    return;
  }

  supabaseSales = (data || [])
    .map(row => row.sale_data)
    .filter(Boolean);
  console.log('Ventes trouvées =', data);
}

async function syncOrderNumberFromSupabase() {
  if (!supabaseClient) return;

  const { data, error } = await supabaseClient
    .from('sales')
    .select('order_number')
    .eq('event_id', currentEventId)
    .order('created_at', { ascending: false })
    .limit(1);

  if (error) {
    console.error('Erreur lecture dernier ticket', error);
    return;
  }

  if (!data || !data.length) {
    orderNumber = 1;
    saveOrderNumber();
    return;
  }

  const match = (data[0].order_number || '').match(/(\d+)$/);
  orderNumber = match ? Number(match[1]) + 1 : 1;

  saveOrderNumber();
}
const DEVICE_CONFIG_KEY = 'sds_device_config';

function getDeviceConfig() {
  try {
    return JSON.parse(localStorage.getItem(DEVICE_CONFIG_KEY)) || null;
  } catch {
    return null;
  }
}

function getDevicePrintMode() {

  const config = getDeviceConfig();

  return config?.printMode || "central";

}
function mustPrintDirect() {

  return getDevicePrintMode() === "direct";

}

function mustPrintCentral() {

  return getDevicePrintMode() === "central";

}

function mustPrintNothing() {

  return getDevicePrintMode() === "none";

}

function getDeviceInstanceId() {
  let id = localStorage.getItem('sds_device_instance_id');

  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('sds_device_instance_id', id);
  }

  return id;
}
function saveDeviceConfig(deviceConfig) {
  localStorage.setItem(DEVICE_CONFIG_KEY, JSON.stringify(deviceConfig));
}

function getDeviceCode() {
  const deviceConfig = getDeviceConfig();
  return deviceConfig?.deviceCode || config?.orderPrefix || 'A';
}

function isCentralCashier() {
  return getDeviceCode() === "A";
}
async function recoverDeviceCode(deviceCode, deviceName, printMode) {
  if (!supabaseClient) return false;

  const { error } = await supabaseClient
    .from('devices')
    .update({
      device_name: deviceName,
      device_type: /iPad/i.test(navigator.userAgent) ? 'ipad' : 'windows',
      current_device: getDeviceInstanceId(),
      device_status: 'busy',
      print_mode: printMode,
      app_version: '2026.06.25',
      last_seen: new Date().toISOString()
    })
    .eq('device_code', deviceCode);

  if (error) {
    console.error('Erreur récupération caisse', error);
    return false;
  }

  return true;
}
async function isDeviceCodeAvailable(deviceCode) {
  if (!supabaseClient) return true;

  const { data, error } = await supabaseClient
    .from('devices')
    .select('device_name,current_device')
    .eq('device_code', deviceCode)
    .single();

  if (error || !data) return true;

  // Si le poste est libre
  if (!data.current_device) return true;

  // Si c'est déjà CE même appareil (redémarrage)
  if (data.current_device === getDeviceInstanceId()) return true;

  // Sinon il est occupé
  return false;
}

function getOrderNumberKey() {
  return `caisse_order_number_${getDeviceCode()}`;
}

function loadOrderNumber() {
  return Number(localStorage.getItem(getOrderNumberKey()) || '1');
}

function saveOrderNumber() {
  localStorage.setItem(getOrderNumberKey(), orderNumber);
}


function getDeviceName() {
  const deviceConfig = getDeviceConfig();
  return deviceConfig?.deviceName || 'Appareil inconnu';
}

function renderDeviceInfo() {
  const nameEl = document.getElementById("cashRegisterName");
  const modeEl = document.getElementById("printerMode");

  if (!nameEl || !modeEl) return;

  const device = getDeviceConfig();

  if (!device) {
    nameEl.textContent = "CAISSE A";
    modeEl.textContent = "Impression non configurée";
    return;
  }

  const deviceName = device.deviceName || "";
  const deviceCode = device.deviceCode || "A";

  nameEl.textContent = `CAISSE ${deviceCode}${deviceName ? " - " + deviceName : ""}`;

  if (device.printMode === "central") {
    modeEl.textContent = "Impression centralisée";
  } else if (device.printMode === "direct") {
    modeEl.textContent = "Impression directe";
  } else {
    modeEl.textContent = "Impression désactivée";
  }
}

function updateDashboardStatus() {
  if (typeof updateCentralDashboard === 'function') {
    updateCentralDashboard();
  }
}

async function heartbeatDevice() {
  if (!supabaseClient) return;

  const device = getDeviceConfig();
  if (!device) return;

  await supabaseClient
    .from('devices')
    .update({
      last_seen: new Date().toISOString(),
      device_status: 'busy'
    })
    .eq('device_code', device.deviceCode)
    .eq('current_device', getDeviceInstanceId());
  await checkDeviceOwnership();
}

async function registerDevice() {
  if (!supabaseClient) return;

  const device = getDeviceConfig();
  if (!device) return;

  const { error } = await supabaseClient
    .from('devices')
    .update({
      device_name: device.deviceName,
      device_type: /iPad/i.test(navigator.userAgent) ? 'ipad' : 'windows',
      current_device: getDeviceInstanceId(),
      device_status: 'busy',
      print_mode: device.printMode,
      app_version: '2026.06.25',
      last_seen: new Date().toISOString()
    })
    .eq('device_code', device.deviceCode);

  if (error) {
    console.error('Erreur registerDevice', error);
    return;
  }

  renderDeviceInfo();

  if (getDeviceCode() === 'A') {
    updateCentralDashboard();
    updateDashboardStatus();
    refreshCentralDashboard();
  }
}

function startCentralServices() {
  if (getDeviceCode() !== 'A') return;

  updateCentralDashboard();
  updateDashboardStatus();

  refreshCentralDashboard();

  setInterval(refreshCentralDashboard, 5000);
  setInterval(processPrintQueue, 5000);
}


async function loadConfigFromSupabase() {
  if (!supabaseClient) {
    console.warn('Supabase non configuré');
    return;
  }

  const previousEventId = currentEventId;

  const { data, error } = await supabaseClient
    .from(SUPABASE_CONFIG_TABLE)
    .select('data')
    .eq('id', SUPABASE_CONFIG_ID)
    .single();

  if (error) {
    console.error('Erreur chargement Supabase', error);
    return;
  }

  if (data && data.data) {
    config = normalizeConfig(data.data);

    if (config.currentEventId) {
      currentEventId = config.currentEventId;
      localStorage.setItem('caisse_event_id', currentEventId);
    }

    if (currentEventId !== previousEventId) {
      sales = [];
      supabaseSales = [];
      reportArchive = null;
      reportResetAt = '';
      lastTicketHtml = '';
      orderNumber = 1;

      saveReportState();
      saveSales();
      saveLastTicket();
      saveOrderNumber();
    }

    localStorage.setItem('caisse_config', JSON.stringify(config));

    renderEventTitle();

    if (draftConfig) draftConfig = clone(config);

    renderProducts();
    renderCart();

    const settingsDialog = document.getElementById('settingsDialog');
    if (settingsDialog && settingsDialog.open) renderSettings();
  }

  supabaseReady = true;
}


const devicesEl = document.getElementById("dashboardDevices");

if (devicesEl) {
  devicesEl.innerHTML =
    "<strong>📱 Caisses</strong><br><br>" +
    data.map(device =>
      `${device.device_status === "busy" ? "🟢" : "⚪"} ${device.device_code} - ${device.device_name || "Libre"}`
    ).join("<br>");
}




async function saveConfigToSupabase() {
  if (supabaseReceiving) return;
  if (!supabaseClient || supabaseSaving) return;

  supabaseSaving = true;

  const { error } = await supabaseClient
    .from(SUPABASE_CONFIG_TABLE)
    .upsert({
      id: SUPABASE_CONFIG_ID,
      data: config,
      updated_at: new Date().toISOString()
    });

  supabaseSaving = false;

  if (error) console.error('Erreur sauvegarde Supabase', error);
}

function startSupabaseRealtime() {
  if (!supabaseClient) return;

  supabaseClient
    .channel('caisse-config-sync')
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: SUPABASE_CONFIG_TABLE,
        filter: `id=eq.${SUPABASE_CONFIG_ID}`
      },
      payload => {
        if (supabaseSaving) return;

        const remoteConfig = payload.new && payload.new.data;
        if (!remoteConfig) return;

        console.log('Mise à jour Supabase reçue');

        const previousEventId = currentEventId;

        supabaseReceiving = true;

        console.log('remoteConfig eventName =', remoteConfig.eventName);
        console.log('remoteConfig currentEventId =', remoteConfig.currentEventId);

        config = normalizeConfig(remoteConfig);

        if (config.currentEventId) {
          currentEventId = config.currentEventId;
          localStorage.setItem('caisse_event_id', currentEventId);
        }

        if (currentEventId !== previousEventId) {
          sales = [];
          supabaseSales = [];
          reportArchive = null;
          reportResetAt = '';
          lastTicketHtml = '';
          orderNumber = 1;

          saveReportState();
          saveSales();
          saveLastTicket();
          saveOrderNumber();
        }

        localStorage.setItem('caisse_config', JSON.stringify(config));
        renderEventTitle();

        if (draftConfig) draftConfig = clone(config);

        renderProducts();
        renderCart();

        const settingsDialog = document.getElementById('settingsDialog');
        if (settingsDialog && settingsDialog.open) renderSettings();

        setTimeout(() => {
          supabaseReceiving = false;
        }, 500);
      }
    )
    .subscribe(status => {
      console.log('Realtime Supabase:', status);
    });
}

async function initSupabaseSync() {
  await loadConfigFromSupabase();
  await syncOrderNumberFromSupabase();
  await registerDevice();
  heartbeatDevice();
  setInterval(heartbeatDevice, 30000);
  startCentralServices();
  if (supabaseClient) {
    if (!supabaseReady) await saveConfigToSupabase();
    startSupabaseRealtime();

    setTimeout(() => {
      loadConfigFromSupabase();
      registerDevice();
    }, 1500);
  }
}

function saveSales() { localStorage.setItem('caisse_sales', JSON.stringify(sales)); }
function saveReportState() {
  if (reportArchive) localStorage.setItem('caisse_report_archive', JSON.stringify(reportArchive));
  else localStorage.removeItem('caisse_report_archive');
  if (reportResetAt) localStorage.setItem('caisse_report_reset_at', reportResetAt);
  else localStorage.removeItem('caisse_report_reset_at');
}
//function saveOrderNumber() { localStorage.setItem('caisse_order_number', String(orderNumber)); }
function saveLastTicket() { localStorage.setItem('caisse_last_ticket_html', lastTicketHtml || ''); }

function clone(obj) { return JSON.parse(JSON.stringify(obj)); }

function showToast(message, type = 'success', duration = 2600) {
  let container = document.getElementById('toastContainer');

  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container no-print';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    toast.style.transition = 'opacity .18s ease, transform .18s ease';

    setTimeout(() => toast.remove(), 220);
  }, duration);
}

function showSettingsStatus(message, type = "success") {
  const el = document.getElementById("settingsStatus");
  if (!el) return;

  const icons = {
    success: "✓",
    info: "ℹ",
    warning: "⚠",
    error: "✖"
  };

  el.textContent = `${icons[type] || ""} ${message}`;

  const colors = {
    success: "#16a34a",
    info: "#2563eb",
    warning: "#f59e0b",
    error: "#dc2626"
  };

  el.style.background = colors[type] || colors.success;
  el.style.display = "block";

  clearTimeout(el._timer);

  el._timer = setTimeout(() => {
    el.style.display = "none";
  }, 2500);
}

function showMessage(title, text) {
  const message = title || text || 'Information';
  const settingsDialog = document.getElementById('settingsDialog');

  if (settingsDialog && settingsDialog.open) {
    showSettingsStatus(message, 'info');
    return;
  }

  if (typeof showToast === 'function') {
    showToast(message, 'info');
  }
}

function showConfirm(title, text) {
  return new Promise(resolve => {
    const dlg = document.getElementById('messageDialog');
    if (!dlg) {
      resolve(false);
      return;
    }

    document.getElementById('messageTitle').textContent = title || 'Confirmation';
    document.getElementById('messageText').textContent = text || '';

    const cancel = document.getElementById('messageCancel');
    const ok = document.getElementById('messageOk');

    cancel.style.display = '';
    cancel.textContent = 'Non';
    ok.textContent = 'Oui';

    cancel.onclick = () => {
      dlg.close();
      resolve(false);
    };

    ok.onclick = () => {
      dlg.close();
      resolve(true);
    };

    dlg.showModal();
  });
}

function clearCurrentCart() {

  cart.forEach(line => {
    const p = config.products.find(x => x.id === line.id);
    if (p) {
      p.stock = Number(p.stock || 0) + Number(line.qty || 0);
    }
  });

  saveConfig();

  cart = [];
  paidCents = 0;

  renderProducts();
  renderCart();
}
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
    c.products = c.products.map((p, i) => ({
      id: 'p' + (i + 1),
      group: displayGroup(p.category),
      category: p.category || 'Plat',
      name: p.name || '',
      price: Number(p.price || 0),
      type: 'simple',
      components: [],
      refundable: true,
      stock: '',
      stockAlert: ''
    }));
  }

  c.configVersion = 2026.12;
  c.eventName ||= base.eventName;
  c.orderPrefix ||= 'A';
  c.ticketColor ||= 'black';
  c.printTicketsEnabled ??= true;
  c.baseFoods ||= base.baseFoods;
  c.volunteers ||= base.volunteers;

  if (previousVersion < 18.17) {
    c.eventName ||= base.eventName;
    c.volunteers ||= clone(base.volunteers);
  }

  c.categoryColors ||= base.categoryColors;
  c.products ||= base.products;

  c.products.forEach((p, i) => {
    p.id ||= 'p' + (i + 1);
    p.group ||= displayGroup(p.category);
    p.type ||= 'simple';
    p.components ||= [];
    p.choices ||= [];
    p.menuSections ||= [];
    p.refundable = p.refundable !== false;
    p.stock ??= '';
    p.stockAlert ??= '';
  });

  if (!c.products.some(p => p.id === 'p-verre-cremant')) {
    const cafeIndex = c.products.findIndex(p => p.id === 'p-cafe');
    const item = {
      id: 'p-verre-cremant',
      group: 'Boissons',
      category: 'Boissons avec alcool',
      name: 'Verre de crémant',
      price: 3,
      type: 'simple',
      components: [],
      refundable: true,
      stock: ''
    };
    c.products.splice(cafeIndex >= 0 ? cafeIndex : c.products.length, 0, item);
  }

  // v2026.04 : configuration distribuable, tout le suivi stock est désactivé par défaut.
  if (previousVersion < 2026.05) {
    (c.products || []).forEach(p => { p.stock = ''; });
    (c.baseFoods || []).forEach(f => { f.stock = ''; });
  }

  const productOrder = [
    'p-eau-50',
    'p-eau-150',
    'p-coca',
    'p-oasis',
    'p-ice-tea',
    'p-biere-25',
    'p-pichet-biere',
    'p-verre-rose',
    'p-verre-blanc',
    'p-verre-rouge',
    'p-bouteille-blanc',
    'p-bouteille-rose',
    'p-bouteille-rouge',
    'p-cremant',
    'p-verre-cremant',
    'p-boisson-libre',
    'p-cafe',
    'p-frites',
    'p-assiette-gourmande',
    'p-menu',
    'p-glace-vanille',
    'p-popcorn',
    'p-glace-eau',
    'p-restau-libre-1',
    'p-restau-libre-2',
    'p-consigne',
    'p-retour-consigne'
  ];

  if (previousVersion < 2026.03) {
    c.products.sort((a, b) => {
      const ia = productOrder.indexOf(a.id);
      const ib = productOrder.indexOf(b.id);
      return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
    });
  }

  // v2026.12 : le menu garde les suppléments modifiés dans les paramètres.
  const menu = c.products.find(p => p.id === 'p-menu');

  if (menu) {
    menu.menuSections ||= [];

    let drinks = menu.menuSections.find(sec => sec.section === 'Boissons');

    if (!drinks) {
      drinks = {
        section: 'Boissons',
        clientChoice: true,
        max: 1,
        options: []
      };
      menu.menuSections.unshift(drinks);
    }

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

    const savedDrinkOptions = new Map(
      (drinks.options || []).map(opt => [opt.productId, opt])
    );

    drinks.options = defaultDrinkOptions.map(def => {
      const saved = savedDrinkOptions.get(def.productId);
      return {
        productId: def.productId,
        supplement: Number(saved?.supplement ?? def.supplement ?? 0)
      };
    });

    let dessert = menu.menuSections.find(sec => sec.section === 'Dessert');

    if (dessert) {
      dessert.options = (dessert.options || []).filter(o => o.productId !== 'p-glace-eau');
    }
  }

  c.baseFoods.forEach(f => {
    f.id ||= uid('food');
    f.category ||= 'Viande';
    f.stock ??= '';
    f.stockAlert ??= '';
  });

  c.volunteers.forEach(v => {
    v.id ||= uid('vol');
    v.name ||= 'Bénévole';
    v.active = v.active !== false;
  });

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
  console.log('renderProducts eventName =', config.eventName);
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
  const meats = (config.baseFoods || []).filter(f =>
    String(f.category).toLowerCase() === 'viande' && isTracked(f.stock)
  );

  if (!meats.length) return '';

  return `<div class="meat-stock-box"><h3>Stocks viandes</h3><div class="meat-stock-grid">${meats.map(f => {
    const value = Number(f.stock);
    const alertLevel = Number(f.stockAlert || 0);

    const out = value <= 0;
    const warning = !out && alertLevel > 0 && value <= alertLevel;

    let level = 'ok';
    if (out) level = 'out-stock stock-warning';
    else if (warning) level = 'stock-warning';

    const label = out ? 'Rupture' : value;

    return `<div class="meat-stock-item ${level}"><span>${escapeHtml(f.name)}</span><strong>${label}</strong></div>`;
  }).join('')}</div></div>`;
}

function productButtonHtml(p) {
  const col = colorFor(p.category);
  const style = `background:${col.bg};color:${col.fg}`;

  if (!p.name) {
    return `<button class="product-btn empty-product" style="${style}" disabled><strong>Libre</strong></button>`;
  }

  const stock = Number(p.stock);
  const alertLevel = Number(p.stockAlert || 0);

  const tracked = isTracked(p.stock);
  const out = tracked && stock <= 0;
  const warning = tracked && !out && alertLevel > 0 && stock <= alertLevel;

  let classes = "product-btn";
  if (out) classes += " out-stock stock-warning";
  else if (warning) classes += " stock-warning";

  let stockLabel = "";
  if (tracked) {
    stockLabel = `<em class="btn-stock">Stock ${stock}</em>`;
  }

  let sub = fmt(p.price);

  if (out) {
    sub += " - Rupture";
  }

  return `
    <button
      class="${classes}"
      style="${style}"
      data-id="${p.id}">
      <strong>${escapeHtml(p.name)}</strong>
      <span>${sub}</span>
      ${stockLabel}
    </button>
  `;
}

function addProduct(id) {
  const p = config.products.find(x => x.id === id);
  if (!p || !p.name) return;

  if (isTracked(p.stock) && Number(p.stock) <= 0) {
    showToast('Stock insuffisant pour ' + p.name);
    renderProducts();
    return;
  }

  if (p.type === 'compose' && (p.choices || []).length) return openChoiceDialog(p);
  if (p.type === 'menu' && (p.menuSections || []).length) return openMenuDialog(p);

  if (isTracked(p.stock)) {
    p.stock = Math.max(0, Number(p.stock) - 1);
    saveConfig();
  }

  addCartLine({
    id: p.id,
    name: p.name,
    category: p.category,
    price: p.price,
    qty: 1,
    refundable: p.refundable,
    selectedFoods: []
  });

  renderProducts();
}
function addCartLine(lineData) {
  const foodKey = (lineData.selectedFoods || [])
    .map(x => `${x.foodId}:${x.qty || 1}`)
    .sort()
    .join(',');

  const key = lineData.id + '|' + foodKey + '|' + (lineData.detail || '') + '|' + lineData.price;
  const line = cart.find(i => i.key === key);

  if (line) line.qty += 1;
  else cart.push({ key, ...lineData });

  if (paymentMethod === 'CB') paidCents = Math.round(total() * 100);

  renderCart();
}
function renderCart() {
  document.getElementById('orderNumber').textContent = `n° ${getDeviceCode()}${String(orderNumber).padStart(4, '0')}`;
  const list = document.getElementById('cartLines');
  if (!cart.length) { list.className = 'cart-lines empty'; list.textContent = 'Aucun produit'; }
  else {
    list.className = 'cart-lines';
    list.innerHTML = cart.map((item, index) => ({ item, index })).reverse().map(({ item, index }) => `<div class="cart-line"><div><div class="cart-name">${escapeHtml(item.name)}</div>${item.detail ? `<div class="cart-detail">${escapeHtml(item.detail)}</div>` : ''}<div class="cart-unit">${fmt(item.price)} / unité</div></div><div class="qty-actions"><button data-action="minus" data-index="${index}">-</button><span class="qty-value">${item.qty}</span><button data-action="plus" data-index="${index}">+</button><button data-action="delete" data-index="${index}">x</button></div><div class="cart-total">${fmt(item.qty * item.price)}</div></div>`).join('');
  }
  document.querySelectorAll('[data-action]').forEach(btn => btn.addEventListener('click', updateLine));
  updatePayment();
}
function restoreStock(productId, qty) {
  const p = config.products.find(x => x.id === productId);
  if (!p) return;

  if (!isTracked(p.stock)) return;

  p.stock = Number(p.stock) + Number(qty || 0);
}

function reserveStock(productId, qty) {
  const p = config.products.find(x => x.id === productId);
  if (!p) return false;

  if (!isTracked(p.stock)) return true;

  if (Number(p.stock) < Number(qty || 0)) {
    showToast('Stock insuffisant pour ' + p.name);
    renderProducts();
    return false;
  }

  p.stock = Number(p.stock) - Number(qty || 0);
  return true;
}

function updateLine(e) {
  const index = Number(e.currentTarget.dataset.index);
  const action = e.currentTarget.dataset.action;
  const line = cart[index];
  if (!line) return;

  if (action === 'plus') {
    if (!reserveStock(line.id, 1)) return;
    line.qty += 1;
  }

  if (action === 'minus') {
    restoreStock(line.id, 1);
    line.qty -= 1;
  }

  if (action === 'delete') {
    restoreStock(line.id, line.qty);
    cart.splice(index, 1);
  } else if (line.qty <= 0) {
    cart.splice(index, 1);
  }

  saveConfig();

  if (paymentMethod === 'CB') paidCents = Math.round(total() * 100);

  renderProducts();
  renderCart();
}

function updatePayment() {

  const totalCents = Math.round(total() * 100);

  let cardCents = getCardAmountCents();

  if (cardCents > totalCents) {
    cardCents = totalCents;

    const input = document.getElementById('cardAmountInput');
    if (input) {
      input.value = (cardCents / 100).toFixed(2);
    }
  }

  const cashPartCents = totalCents - cardCents;

  document.getElementById('cartTotalBottom').textContent = fmt(total());
  document.getElementById('amountPaidDisplay').textContent = fmt(paidAmount());
  document.getElementById('changeDue').textContent = fmt(Math.max(0, (paidCents - cashPartCents) / 100));
  const remainingBlock = document.getElementById('cashRemainingBlock');
  const remaining = document.getElementById('cashRemaining');

  if (remainingBlock && remaining) {
    if (cardCents > 0) {
      remainingBlock.style.display = '';
      remaining.textContent = fmt(cashPartCents / 100);
    } else {
      remainingBlock.style.display = 'none';
    }
  }
}
function pressKey(key) {
  if (activePaymentField === 'card') {
    const input = document.getElementById('cardAmountInput');
    if (!input) return;

    let cardCents = getCardAmountCents();

    if (key === 'clear') {
      cardCents = 0;
    } else if (key === 'back') {
      cardCents = Math.floor(cardCents / 10);
    } else if (key === '00') {
      cardCents = Math.min(999999, cardCents * 100);
    } else {
      cardCents = Math.min(999999, cardCents * 10 + Number(key));
    }

    input.value = (cardCents / 100).toFixed(2);
    updatePayment();
    return;
  }

  if (key === 'clear') {
    paidCents = 0;
  } else if (key === 'back') {
    paidCents = Math.floor(paidCents / 10);
  } else if (key === '00') {
    paidCents = Math.min(999999, paidCents * 100);
  } else {
    paidCents = Math.min(999999, paidCents * 10 + Number(key));
  }

  updatePayment();
}

function setQuickAmount(amount) {

  if (activePaymentField === 'card') {

    const total = Math.round(total() * 100);
    const value = Math.min(Math.round(amount * 100), total);

    const input = document.getElementById('cardAmountInput');
    if (input) {
      input.value = (value / 100).toFixed(2);
    }

    updatePayment();
    return;
  }

  paidCents = Math.round(amount * 100);
  updatePayment();
}
function setActivePaymentField(field) {
  activePaymentField = field;

  const cardInput = document.getElementById('cardAmountInput');
  const cashDisplay = document.getElementById('amountPaidDisplay');
  const btnExact = document.getElementById('btnExact');

  cardInput?.classList.toggle(
    'active-payment-field',
    field === 'card'
  );

  cashDisplay?.classList.toggle(
    'active-payment-field',
    field === 'cash'
  );

  if (btnExact) {
    btnExact.disabled = (field === 'card');
  }
}

function showCashPaymentPanel() {
  if (!cart.length) {
    showMessage('Commande vide', 'Ajoute au moins un produit avant de valider.');
    return;
  }

  paymentMethod = 'Espèces';
  paidCents = 0;
  document.body.classList.add('show-payment');

  const cardInput = document.getElementById('cardAmountInput');

  if (cardInput && !cardInput.dataset.listener) {
    cardInput.addEventListener('input', updatePayment);
    cardInput.addEventListener('change', updatePayment);

    cardInput.addEventListener('focus', () => setActivePaymentField('card'));
    cardInput.addEventListener('click', () => setActivePaymentField('card'));

    cardInput.dataset.listener = '1';
  }

  const cashDisplay = document.getElementById('amountPaidDisplay');

  if (cashDisplay && !cashDisplay.dataset.listener) {
    cashDisplay.addEventListener('click', () => setActivePaymentField('cash'));
    cashDisplay.dataset.listener = '1';
  }

  setActivePaymentField('cash');
  updatePayment();
}

function validateCashPayment() {
  const cardCents = getCardAmountCents();

  if (cardCents > 0) {
    payAndPrint('CB + Espèces');
  } else {
    payAndPrint('Espèces');
  }

  const cardInput = document.getElementById('cardAmountInput');
  if (cardInput) {
    cardInput.value = '0.00';
  }

  paidCents = 0;
  setActivePaymentField('cash');
  document.body.classList.remove('show-payment');
  updatePayment();
  applyDisplayMode();
}

function payAndPrint(method) {
  if (!cart.length) {
    showMessage('Commande vide', 'Ajoute au moins un produit avant de valider.');
    return;
  }

  paymentMethod = method;

  if (total() <= 0) {
    paidCents = 0;
  } else if (method === 'CB') {
    paidCents = Math.round(total() * 100);
  }

  updatePayment();
  validateSale({ paymentMethod: method });

  if (method !== 'Espèces') {
    document.body.classList.remove('show-payment');
  }
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
async function printTicketForSale(sale) {
  const html = ticketHtmlFromData(
    sale.orderNumber,
    sale.items || [],
    sale.paymentMethod || paymentMethod,
    Number(sale.total || 0),
    Number(sale.paid || 0),
    Number(sale.change || 0)
  );

  document.getElementById('printArea').innerHTML = html;
  lastTicketHtml = html;
  saveLastTicket();

  const content = document.getElementById('printArea').innerText;

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
}

function buildTicket() {
  const number = `${getDeviceCode()}${String(orderNumber).padStart(4, '0')}`;
  const html = ticketHtmlFromData(number, cart, paymentMethod, total(), paidAmount(), Math.max(0, paidAmount() - total()));
  document.getElementById('printArea').innerHTML = html;
  lastTicketHtml = html;
  saveLastTicket();
}


function reprintLastTicket() {
  if (!lastTicketHtml) { showMessage('Aucun ticket', 'Aucun dernier ticket à réimprimer.'); return; }
  document.getElementById('printArea').innerHTML = lastTicketHtml;
  window.print();
}
function saleTimestampParts(date = new Date()) {
  return { date: date.toISOString(), hour: date.getHours(), hourLabel: `${String(date.getHours()).padStart(2, '0')}h-${String(date.getHours() + 1).padStart(2, '0')}h` };
}

function getCardAmountCents() {
  const input = document.getElementById('cardAmountInput');
  if (!input) return 0;

  const value = Number(String(input.value || '0').replace(',', '.'));
  if (!Number.isFinite(value) || value <= 0) return 0;

  return Math.round(value * 100);
}

function getCashPartCents() {
  const totalCents = Math.round(total() * 100);
  const cardCents = Math.min(getCardAmountCents(), totalCents);

  return Math.max(0, totalCents - cardCents);
}


function validateSale(extra = {}) {
  const deviceConfig = getDeviceConfig();
  const printMode = getDevicePrintMode();
  const shouldPrint = config.printTicketsEnabled !== false && extra.print !== false && mustPrintDirect();

  if (shouldPrint) buildTicket();

  const kind = extra.kind || 'sale';
  const stamp = saleTimestampParts();
  const salePaymentMethod = extra.paymentMethod || paymentMethod;
  const totalSaleCents = Math.round(total() * 100);
  let cardAmountCents = 0;
  let cashAmountCents = 0;

  if (salePaymentMethod === 'CB') {
    cardAmountCents = totalSaleCents;
  }

  if (salePaymentMethod === 'Espèces') {
    cashAmountCents = totalSaleCents;
  }

  if (salePaymentMethod === 'CB + Espèces') {
    cardAmountCents = Math.min(getCardAmountCents(), totalSaleCents);
    cashAmountCents = Math.max(0, totalSaleCents - cardAmountCents);
  }
  const sale = {
    kind,
    orderNumber: `${getDeviceCode()}${String(orderNumber).padStart(4, '0')}`,
    date: stamp.date,
    hour: stamp.hour,
    hourLabel: stamp.hourLabel,
    paymentMethod: salePaymentMethod,
    cardAmount: cardAmountCents / 100,
    cashAmount: cashAmountCents / 100,
    paid: extra.paid ?? paidAmount(),
    change: extra.change ?? Math.max(0, paidAmount() - (cashAmountCents / 100)),
    total: total(),
    items: clone(cart),
    volunteerId: extra.volunteerId || '',
    volunteerName: extra.volunteerName || '',
    settled: extra.settled ?? true,
    refunds: []
  };

  sales.push(sale);
  saveSaleToSupabase(sale).then(() => {
    if (getDeviceCode() === 'A' && mustPrintCentral()) {
      processPrintQueue();
    }
  });
  saveSales();

  if (shouldPrint) window.print();

  orderNumber += 1;
  saveOrderNumber();

  cart = [];
  paidCents = 0;

  renderProducts();
  renderCart();
}

function exportCsv() {
  const settingsDialog = document.getElementById('settingsDialog');
  if (settingsDialog && settingsDialog.open) settingsDialog.close();
  const rows = [['type', 'commande', 'date', 'heure', 'paiement', 'benevole', 'regle', 'paye', 'rendu', 'produit', 'quantite', 'prix_unitaire', 'total_ligne', 'total_commande', 'motif']];
  sales.forEach(s => (s.items || []).forEach(i => rows.push([s.kind || 'sale', s.orderNumber, s.date, s.hourLabel || orderHourLabel(s), s.paymentMethod, s.volunteerName || '', s.settled === false ? 'non' : 'oui', s.paid || '', s.change || '', i.name, i.qty, i.price, i.qty * i.price, s.total, s.reason || ''])));
  const csv = rows.map(r => r.map(v => `"${String(v).replaceAll('"', '""')}"`).join(';')).join('\n');
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

let settingsMode = "admin";
let settingsOrdersScope = "device";

function openSettings(mode = "admin") { settingsMode = mode; draftConfig = clone(config); renderSettings(); updateSettingsButtons(); document.getElementById('settingsDialog').showModal(); }

function renderSettingsOrders() {
  const el = document.getElementById('settingsOrdersList');
  if (!el) return;

  el.innerHTML = '<p>Chargement des commandes...</p>';

  loadSalesFromSupabase().then(() => {
    const previousSales = sales;

    let list = supabaseSales.length ? supabaseSales : sales;

    if (settingsOrdersScope === "device") {
      const code = getDeviceCode();
      list = list.filter(s => String(s.orderNumber || '').startsWith(code));
    }

    sales = list;

    el.innerHTML = ordersHtml();
    bindRefundButtons(el);
    bindVolunteerPayButtons(el);

    sales = previousSales;
  });
}

function renderSettings() {
  renderProductEditor(); renderFoodEditor(); renderStockEditor(); renderGeneralEditor(); renderVolunteerEditor(); renderSettingsOrders(); renderSettingsReport(); const tabs = document.querySelector('.settings-tabs');

  if (tabs) {
    tabs.style.display = settingsMode === "cashier" ? "none" : "";
  }
}
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
  return {
    id: uid('p'),
    group: zone,
    category,
    name: 'Libre',
    price: 0,
    type: 'simple',
    components: [],
    choices: [],
    menuSections: [],
    refundable: true,
    stock: '',
    stockAlert: ''
  };
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
  if (!el) return;

  const productRows = draftConfig.products
    .filter(p => p.name && p.type === 'simple')
    .map(p => ({
      kind: 'product',
      id: p.id,
      label: p.name,
      value: p.stock,
      alert: p.stockAlert
    }));

  const foodRows = draftConfig.baseFoods
    .filter(f => f.name)
    .map(f => ({
      kind: 'food',
      id: f.id,
      label: f.name,
      value: f.stock,
      alert: f.stockAlert
    }));

  const rows = [...productRows, ...foodRows];

  el.innerHTML = rows.map(r => `
    <div class="stock-card">
      <label>${escapeHtml(r.label)}</label>

      <div class="stock-fields">
        <input
          inputmode="numeric"
          placeholder="Stock"
          data-stock-kind="${r.kind}"
          data-stock-id="${r.id}"
          value="${r.value ?? ''}"
        >

        <input
          inputmode="numeric"
          placeholder="Seuil"
          data-stock-alert-kind="${r.kind}"
          data-stock-alert-id="${r.id}"
          value="${r.alert ?? ''}"
        >
      </div>
    </div>
  `).join('');

  el.querySelectorAll('[data-stock-kind]').forEach(x => x.addEventListener('change', e => {
    const kind = e.currentTarget.dataset.stockKind;
    const id = e.currentTarget.dataset.stockId;

    const obj = kind === 'product'
      ? draftConfig.products.find(p => p.id === id)
      : draftConfig.baseFoods.find(f => f.id === id);

    if (!obj) return;

    obj.stock = e.currentTarget.value.trim();
  }));

  el.querySelectorAll('[data-stock-alert-kind]').forEach(x => x.addEventListener('change', e => {
    const kind = e.currentTarget.dataset.stockAlertKind;
    const id = e.currentTarget.dataset.stockAlertId;

    const obj = kind === 'product'
      ? draftConfig.products.find(p => p.id === id)
      : draftConfig.baseFoods.find(f => f.id === id);

    if (!obj) return;

    obj.stockAlert = e.currentTarget.value.trim();
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
  updateSettingsButtons();
  showSettingsStatus("Paramètres enregistrés");
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
  const stamp = saleTimestampParts();
  const paymentSale = { kind: 'volunteer_payment', orderNumber: `BEN-${Date.now().toString().slice(-6)}`, date: stamp.date, hour: stamp.hour, hourLabel: stamp.hourLabel, paymentMethod: method, paid: amount, change: 0, total: amount, volunteerId, volunteerName: ((config.volunteers || []).find(v => v.id === volunteerId) || {}).name || '', items: [{ name: 'Règlement bénévole', qty: 1, price: amount, refundable: true }] };
  sales.push(paymentSale);
  saveSales();
  printTicketForSale(paymentSale);
  document.getElementById('volunteerPayDialog').close();
  openReport();
}

let quickRefundFilter = '';
function quickRefundProducts() {
  const q = quickRefundFilter.trim().toLowerCase();
  return (config.products || []).filter(p => p.name && Number(p.price || 0) !== 0 && (!q || p.name.toLowerCase().includes(q) || String(p.category || '').toLowerCase().includes(q)));
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
  const stamp = saleTimestampParts();
  const refundSale = { kind: 'refund', orderNumber: `RAP-${Date.now().toString().slice(-6)}`, originalOrderNumber: '', date: stamp.date, hour: stamp.hour, hourLabel: stamp.hourLabel, paymentMethod: 'Espèces', paid: refundTotal, change: 0, total: refundTotal, reason: '', items };
  sales.push(refundSale);
  saveSales();
  printTicketForSale(refundSale);
  document.getElementById('quickRefundDialog').close();
  renderSettingsReport();
  showMessage('Remboursement enregistré', 'Le remboursement a été enregistré en espèces.');
}

let refundSaleIndex = null;
function saleTotal(s) { return Number(s.total || 0); }
function refundAmountForSale(orderNumber) { return sales.filter(x => x.kind === 'refund' && x.originalOrderNumber === orderNumber).reduce((sum, r) => sum + Math.abs(Number(r.total || 0)), 0); }
function netSaleTotal(s) { return saleTotal(s) - refundAmountForSale(s.orderNumber); }
function formatDate(iso) { try { return new Date(iso).toLocaleString('fr-FR'); } catch { return iso || ''; } }
function orderHourLabel(s) { const d = new Date(s.date || 0); return Number.isFinite(d.getTime()) ? `${String(d.getHours()).padStart(2, '0')}h-${String(d.getHours() + 1).padStart(2, '0')}h` : ''; }
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
  const productMap = {};
  const foodMap = {};
  const hourMap = {};
  (config.products || []).filter(p => p.name).forEach(p => { productMap[p.name] ||= { qty: 0, total: 0 }; });
  (config.baseFoods || []).filter(f => f.name).forEach(f => { foodMap[f.name] ||= { qty: 0 }; });
  list.forEach(s => {
    const kind = s.kind || 'sale';
    if (kind !== 'volunteer') {
      totals['Espèces'] ||= 0;
      totals['CB'] ||= 0;

      totals['Espèces'] += Number(s.cashAmount || 0);
      totals['CB'] += Number(s.cardAmount || 0);
    }
    if (kind === 'sale' || kind === 'volunteer') {
      const h = s.hourLabel || orderHourLabel(s) || 'Heure inconnue';
      hourMap[h] ||= { orders: 0, total: 0 };
      hourMap[h].orders += 1;
      hourMap[h].total += Number(s.total || 0);
    }
    (s.items || []).forEach(i => {
      const name = i.name || 'Produit sans nom';
      productMap[name] ||= { qty: 0, total: 0 };
      productMap[name].qty += Number(i.qty || 0);
      productMap[name].total += Number(i.qty || 0) * Number(i.price || 0);
      (i.selectedFoods || []).forEach(f => {
        const fname = f.name || ((config.baseFoods || []).find(x => x.id === f.foodId) || {}).name || f.foodId || 'Aliment';
        foodMap[fname] ||= { qty: 0 };
        foodMap[fname].qty += Number(i.qty || 0) * Number(f.qty || 1);
      });
    });
  });
  const gross = list.filter(s => (s.kind || 'sale') === 'sale').reduce((a, s) => a + Number(s.total || 0), 0);
  const refunds = list.filter(s => s.kind === 'refund').reduce((a, s) => a + Math.abs(Number(s.total || 0)), 0);
  const volunteerPending = list.filter(s => s.kind === 'volunteer' && s.settled === false).reduce((a, s) => a + Number(s.total || 0), 0);
  return { totals, gross, refunds, volunteerPending, productMap, foodMap, hourMap, orderCount: list.filter(s => (s.kind || 'sale') === 'sale').length };
}
function mergeReportData(a, b) {
  const out = { totals: {}, gross: 0, refunds: 0, volunteerPending: 0, productMap: {}, foodMap: {}, hourMap: {}, orderCount: 0 };
  [a, b].filter(Boolean).forEach(src => {
    out.gross += Number(src.gross || 0);
    out.refunds += Number(src.refunds || 0);
    out.volunteerPending += Number(src.volunteerPending || 0);
    out.orderCount += Number(src.orderCount || 0);
    Object.entries(src.totals || {}).forEach(([k, v]) => { out.totals[k] ||= 0; out.totals[k] += Number(v || 0); });
    Object.entries(src.productMap || {}).forEach(([name, v]) => {
      out.productMap[name] ||= { qty: 0, total: 0 };
      out.productMap[name].qty += Number(v.qty || 0);
      out.productMap[name].total += Number(v.total || 0);
    });
    Object.entries(src.foodMap || {}).forEach(([name, v]) => {
      out.foodMap[name] ||= { qty: 0 };
      out.foodMap[name].qty += Number(v.qty || 0);
    });
    Object.entries(src.hourMap || {}).forEach(([name, v]) => {
      out.hourMap[name] ||= { orders: 0, total: 0 };
      out.hourMap[name].orders += Number(v.orders || 0);
      out.hourMap[name].total += Number(v.total || 0);
    });
  });
  (config.products || []).filter(p => p.name).forEach(p => { out.productMap[p.name] ||= { qty: 0, total: 0 }; });
  (config.baseFoods || []).filter(f => f.name).forEach(f => { out.foodMap[f.name] ||= { qty: 0 }; });
  return out;
}
function visibleReportData() {
  const activeSales = sales.filter(s => s.cancelled !== true);
  return mergeReportData(reportArchive, computeReportData(activeSales));
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

  const productRows = Object.entries(data.productMap || {})
    .sort((a, b) => a[0].localeCompare(b[0], 'fr'))
    .map(([name, v]) => `<tr><td>${escapeHtml(name)}</td><td>${v.qty}</td><td>${fmt(v.total)}</td></tr>`)
    .join('');

  const foodRows = Object.entries(data.foodMap || {})
    .sort((a, b) => a[0].localeCompare(b[0], 'fr'))
    .map(([name, v]) => `<tr><td>${escapeHtml(name)}</td><td>${v.qty}</td></tr>`)
    .join('');

  const hourRows = Object.entries(data.hourMap || {})
    .sort((a, b) => a[0].localeCompare(b[0], 'fr'))
    .map(([hour, v]) => `<tr><td>${escapeHtml(hour)}</td><td>${v.orders}</td><td>${fmt(v.total)}</td></tr>`)
    .join('');

  const volunteerRows = (config.volunteers || [])
    .map(v => ({ v, amount: volunteerPendingAmount(v.id) }))
    .filter(x => x.amount > 0)
    .map(x => `<tr><td>${escapeHtml(x.v.name)}</td><td>${fmt(x.amount)}</td><td><button class="validate" data-pay-volunteer="${escapeHtml(x.v.id)}">Régler</button></td></tr>`)
    .join('');

  const paymentRows = [
    ['Espèces', totals['Espèces'] || 0],
    ['CB', totals['CB'] || 0]
  ].map(([k, v]) => `<tr><td>${escapeHtml(k)}</td><td>${fmt(v)}</td></tr>`).join('');

  return `
    <div class="dashboard-cards">
      <div class="dashboard-card">
        <strong>💶 Chiffre d'affaires</strong>
        <span>${fmt(net)}</span>
      </div>
      <div class="dashboard-card">
        <strong>💳 CB</strong>
        <span>${fmt(totals['CB'] || 0)}</span>
      </div>
      <div class="dashboard-card">
        <strong>💵 Espèces</strong>
        <span>${fmt(totals['Espèces'] || 0)}</span>
      </div>
      <div class="dashboard-card">
        <strong>🧾 Tickets</strong>
        <span>${data.orderCount || 0}</span>
      </div>
    </div>

    <div>
      <strong>Ventes brutes</strong>
      <span>${fmt(gross)}</span>
    </div>

    <div>
      <strong>Remboursements</strong>
      <span>${fmt(refunds)}</span>
    </div>

    <div>
      <strong>Total net encaissé</strong>
      <span>${fmt(net)}</span>
    </div>

    <div>
      <strong>Bénévoles à régler</strong>
      <span>${fmt(volunteerPending)}</span>
    </div>

    <div>
      <strong>Commandes</strong>
      <span>${data.orderCount || 0}</span>
    </div>

    <h3>Par paiement</h3>
    <table class="data-table">
      <tbody>${paymentRows}</tbody>
    </table>

    <h3>Statistiques horaires des commandes</h3>
    <table class="data-table">
      <thead>
        <tr><th>Heure</th><th>Commandes</th><th>Total</th></tr>
      </thead>
      <tbody>${hourRows || '<tr><td colspan="3">Aucune commande</td></tr>'}</tbody>
    </table>

    <h3>Tous les produits</h3>
    <table class="data-table">
      <thead>
        <tr><th>Produit</th><th>Qté</th><th>Total</th></tr>
      </thead>
      <tbody>${productRows || '<tr><td colspan="3">Aucun produit</td></tr>'}</tbody>
    </table>

    <h3>Tous les aliments</h3>
    <table class="data-table">
      <thead>
        <tr><th>Aliment</th><th>Qté utilisée</th></tr>
      </thead>
      <tbody>${foodRows || '<tr><td colspan="2">Aucun aliment</td></tr>'}</tbody>
    </table>

    <h3>Bénévoles à régler</h3>
    <table class="data-table">
      <tbody>${volunteerRows || '<tr><td>Aucun montant en attente</td></tr>'}</tbody>
    </table>
  `;
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
async function openReport() {
  await loadSalesFromSupabase();

  const previousSales = sales;

  if (supabaseSales.length) {
    sales = supabaseSales;
  }

  document.getElementById('reportContent').innerHTML = reportHtml();
  bindVolunteerPayButtons(document.getElementById('reportContent'));
  document.getElementById('reportDialog').showModal();

  sales = previousSales;
}

async function resetAllSupabaseData() {
  if (getDeviceCode() !== 'A') {
    showMessage(
      'Action non autorisée',
      'Cette action est réservée à la caisse centrale.'
    );
    return;
  }

  const ok = confirm(
    'Tout effacer ?\n\nCette action supprimera toutes les ventes et toutes les manifestations dans Supabase.\n\nElle est irréversible.'
  );

  if (!ok) return;

  const ok2 = confirm(
    'Confirmation finale\n\nSupprimer définitivement toutes les données de ventes et manifestations ?'
  );

  if (!ok2) return;

  if (!supabaseClient) {
    showMessage('Supabase indisponible', 'Impossible de se connecter à Supabase.');
    return;
  }

  const { error: salesError } = await supabaseClient
    .from('sales')
    .delete()
    .neq('id', 0);

  if (salesError) {
    console.error('Erreur suppression ventes', salesError);
    showMessage('Erreur', 'Impossible de supprimer les ventes Supabase.');
    return;
  }

  const { error: eventsError } = await supabaseClient
    .from('events')
    .delete()
    .neq('id', '');

  if (eventsError) {
    console.error('Erreur suppression manifestations', eventsError);
    showMessage('Erreur', 'Les ventes ont été supprimées, mais pas les manifestations.');
    return;
  }

  sales = [];
  supabaseSales = [];
  reportArchive = null;
  reportResetAt = '';
  lastTicketHtml = '';
  orderNumber = 1;
  currentEventId = '';

  localStorage.removeItem('caisse_sales');
  localStorage.removeItem('caisse_report_archive');
  localStorage.removeItem('caisse_report_reset_at');
  localStorage.removeItem('caisse_last_ticket_html');
  localStorage.removeItem('caisse_event_id');
  localStorage.removeItem(getOrderNumberKey());

  config.currentEventId = '';
  config.eventName = '';

  saveConfig();

  renderEventTitle();
  renderCart();
  renderProducts();

  showMessage(
    'Base remise à zéro',
    'Toutes les ventes et manifestations ont été supprimées. Recharge l’application pour créer la première manifestation.'
  );
}

async function ensureCurrentEvent() {
  if (currentEventId && config.eventName) return;

  await startNewEvent();
}


async function startNewEvent() {
  const name = prompt('Nom de la manifestation ?', '');

  if (!name || !name.trim()) {
    showMessage('Nom obligatoire', 'Indique un nom de manifestation pour continuer.');
    return;
  }

  currentEventId = 'event-' + Date.now();
  localStorage.setItem('caisse_event_id', currentEventId);

  config.currentEventId = currentEventId;
  config.eventName = name.trim();

  sales = [];
  supabaseSales = [];
  reportArchive = null;
  reportResetAt = '';
  lastTicketHtml = '';
  orderNumber = 1;

  saveReportState();
  saveSales();
  saveLastTicket();
  saveOrderNumber();

  if (supabaseClient) {
    const { error } = await supabaseClient
      .from('events')
      .insert({
        id: currentEventId,
        name: config.eventName
      });

    if (error) {
      console.error('Erreur création manifestation', error);
      showMessage('Erreur Supabase', 'La manifestation a été créée localement, mais pas dans Supabase.');
    }
  }

  saveConfig();

  renderEventTitle();
  renderProducts();
  renderCart();

  showMessage(
    'Nouvelle manifestation créée',
    config.eventName
  );
}

function renderEventTitle() {
  const el = document.getElementById('eventTitle');
  if (el) el.textContent = config.eventName || 'Caisse';
}

function ordersHtml() {
  return sales
    .map((s, idx) => ({ s, idx }))
    .reverse()
    .map(({ s, idx }) => {
      const isRefund = s.kind === 'refund';
      const isVolunteer = s.kind === 'volunteer';
      const isCancelled = s.cancelled === true;

      const items = (s.items || [])
        .map(i => `${i.qty} x ${escapeHtml(i.name)} (${fmt(i.qty * i.price)})`)
        .join('<br>');

      const volunteerToggle = isVolunteer
        ? `<button class="secondary" data-toggle-volunteer-order="${idx}">
            ${s.settled === false ? 'Marquer réglé' : 'Marquer à régler'}
          </button>`
        : '';

      const refundInfo = isCancelled
        ? `<div class="hint">Commande annulée${s.cancelReason ? ' - ' + escapeHtml(s.cancelReason) : ''}</div>`
        : isVolunteer
          ? `<div class="hint">Bénévole : ${escapeHtml(s.volunteerName || '')} - ${s.settled === false ? 'à régler' : 'réglé'}</div>`
          : isRefund
            ? `<div class="hint">Remboursement en espèces</div>`
            : `<div class="hint">Déjà remboursé : ${fmt(refundAmountForSale(s.orderNumber))} / Net : ${fmt(netSaleTotal(s))}</div>`;

      const btn = (!isRefund && !isVolunteer && !isCancelled)
        ? `<button class="danger" data-cancel-order="${escapeHtml(s.orderNumber)}">Annuler</button>`
        : volunteerToggle;

      return `
        <div class="order-card ${isRefund || isCancelled ? 'refund-card' : ''}">
          <div>
            <strong>${isRefund ? 'Remboursement' : isCancelled ? 'Commande annulée' : 'Commande'} n° ${escapeHtml(s.orderNumber)}</strong>
            <span>${formatDate(s.date)} - ${escapeHtml(s.hourLabel || orderHourLabel(s))}</span>
          </div>

          <div>${items}</div>

          <div class="order-bottom">
            <b>${fmt(s.total)}</b>
            <span>${escapeHtml(s.paymentMethod || '')}</span>
            ${btn}
          </div>

          ${refundInfo}
        </div>
      `;
    })
    .join('') || '<p>Aucune commande enregistrée.</p>';
}

function bindRefundButtons(root = document) {
  root.querySelectorAll('[data-refund-sale]').forEach(b =>
    b.addEventListener('click', e => openRefund(Number(e.currentTarget.dataset.refundSale)))
  );

  root.querySelectorAll('[data-cancel-order]').forEach(b =>
    b.addEventListener('click', e => openCancelSale(e.currentTarget.dataset.cancelOrder))
  );
}
function restoreStockFromSale(sale) {
  if (!sale || !Array.isArray(sale.items)) return;

  sale.items.forEach(item => {
    if (Number(item.price || 0) < 0) return;

    const productId = item.id;
    const qty = Number(item.qty || 0);

    restoreStock(productId, qty);

    (item.selectedProducts || []).forEach(productId => {
      restoreStock(productId, qty);
    });

    (item.selectedFoods || []).forEach(selectedFood => {
      const food = config.baseFoods.find(f => f.id === selectedFood.foodId);
      if (!food || !isTracked(food.stock)) return;

      food.stock =
        Number(food.stock || 0) +
        qty * Number(selectedFood.qty || 1);
    });
  });

  saveConfig();
  renderProducts();
  renderSettings();
}

async function openCancelSale(orderNumber) {

  const sale = sales.find(s => s.orderNumber === orderNumber);

  if (!sale) {
    showMessage('Commande introuvable', `Impossible de retrouver la commande n°${orderNumber}.`);
    return;
  }

  const reason = prompt(
    `Motif d'annulation de la commande n°${sale.orderNumber} ?`,
    'Erreur de saisie'
  );

  if (reason === null) return;

  sale.cancelled = true;
  sale.cancelDate = new Date().toISOString();
  sale.cancelReason = reason.trim() || 'Annulation';
  console.log('Annulation - vente trouvée :', sale);
  console.log('Annulation - items :', sale.items);

  restoreStockFromSale(sale);
  saveSales();

  if (supabaseClient) {
    const { error } = await supabaseClient
      .from('sales')
      .update({
        cancelled: true,
        cancel_date: sale.cancelDate,
        cancel_reason: sale.cancelReason,
        sale_data: sale
      })
      .eq('order_number', sale.orderNumber)
      .eq('event_id', currentEventId);

    if (error) {
      console.error('Erreur annulation commande Supabase', error);
      showMessage('Erreur', 'La commande a été annulée localement, mais pas dans Supabase.');
      return;
    }
  }

  renderSettingsOrders();
  renderSettingsReport();

  if (typeof refreshCentralDashboard === 'function') {
    refreshCentralDashboard();
  }

  showMessage(
    'Commande annulée',
    `La commande n°${sale.orderNumber} a été annulée.`
  );
}

async function renderSettingsReport() {
  const el = document.getElementById('settingsReportContent');
  if (!el) return;

  await loadSalesFromSupabase();

  const previousSales = sales;

  if (supabaseSales.length) {
    sales = supabaseSales;
  }

  el.innerHTML = reportHtml();
  bindVolunteerPayButtons(el);

  sales = previousSales;
}
async function openOrders() {

  await loadSalesFromSupabase();

  console.log('Ventes Supabase chargées', supabaseSales);

  const previousSales = sales;

  if (supabaseSales.length) {
    sales = supabaseSales;
  }

  document.getElementById('ordersList').innerHTML = ordersHtml();
  bindRefundButtons(document.getElementById('ordersList'));
  bindVolunteerPayButtons(document.getElementById('ordersList'));
  document.getElementById('ordersDialog').showModal();

  sales = previousSales;
}
function openRefund(index) {
  refundSaleIndex = index;
  const s = sales[index];
  document.getElementById('refundTitle').textContent = `Remboursement commande n° ${s.orderNumber}`;
  document.getElementById('refundLines').innerHTML = (s.items || []).filter(i => Number(i.price || 0) !== 0).map((i, lineIndex) => `<div class="editor-row refund-row"><div><strong>${escapeHtml(i.name)}</strong><small>${fmt(i.price)} / unité - acheté : ${i.qty}</small></div><input type="number" min="0" max="${i.qty}" value="0" data-refund-line="${lineIndex}"></div>`).join('') || '<p>Aucun produit remboursable dans cette commande.</p>';
  document.querySelectorAll('[data-refund-line]').forEach(x => x.addEventListener('input', updateRefundTotal));
  updateRefundTotal();
  document.getElementById('refundDialog').showModal();
}
function selectedRefundItems() {
  const s = sales[refundSaleIndex];
  const refundable = (s.items || []).filter(i => Number(i.price || 0) !== 0);
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
  const stamp = saleTimestampParts();
  const refundSale = { kind: 'refund', orderNumber: refundOrderNumber, originalOrderNumber: original.orderNumber, date: stamp.date, hour: stamp.hour, hourLabel: stamp.hourLabel, paymentMethod: 'Espèces', paid: refundTotal, change: 0, total: refundTotal, reason: '', items };
  sales.push(refundSale);
  saveSales();
  printTicketForSale(refundSale);
  document.getElementById('refundDialog').close();
  renderSettingsOrders();
  renderSettingsReport();
  showMessage('Remboursement enregistré', 'Le remboursement a été enregistré en espèces.');
}

document.querySelectorAll('[data-key]').forEach(btn => btn.addEventListener('click', () => pressKey(btn.dataset.key)));
document.querySelectorAll('[data-quick]').forEach(btn => btn.addEventListener('click', () => setQuickAmount(Number(btn.dataset.quick))));
document.getElementById('btnExact').addEventListener('click', () => {
  paidCents = getCashPartCents();
  updatePayment();
});

document.querySelectorAll('.pay[data-method]').forEach(btn => {
  btn.addEventListener('click', () => {
    const method = btn.dataset.method;

    if (method === 'Espèces') {
      showCashPaymentPanel();
      return;
    }

    payAndPrint(method);
  });
});

const btnValidateCashPayment = document.getElementById('btnValidateCashPayment');
if (btnValidateCashPayment) {
  btnValidateCashPayment.addEventListener('click', validateCashPayment);
}
const btnPrintTicket = document.getElementById('btnPrintTicket');
if (btnPrintTicket) btnPrintTicket.addEventListener('click', () => { if (cart.length) { buildTicket(); window.print(); } });
document.getElementById('btnClear').addEventListener('click', () => {
  cart = [];
  paidCents = 0;

  const cardAmountInput = document.getElementById('cardAmountInput');
  if (cardAmountInput) cardAmountInput.value = '0.00';

  document.body.classList.remove('show-payment');

  renderCart();
  updatePayment();
});
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
document.getElementById('btnSettings').addEventListener('click', () => {
  document.getElementById('gestionDialog')?.showModal();
});

document.getElementById('btnCloseGestion')?.addEventListener('click', () => {
  document.getElementById('gestionDialog')?.close();
});
document.getElementById('btnGestionLive')?.addEventListener('click', () => {
  document.getElementById('gestionDialog')?.close();
  showDashboardView();
});
document.getElementById('btnGestionStocks')?.addEventListener('click', () => {
  document.getElementById('gestionDialog')?.close();
  openSettings("cashier");
  showSettingsTab('stocks');
});

document.getElementById('btnGestionVolunteers')?.addEventListener('click', () => {
  document.getElementById('gestionDialog')?.close();
  openSettings("cashier");
  showSettingsTab('volunteers');
});

document.getElementById('btnGestionOrders')?.addEventListener('click', () => {
  document.getElementById('gestionDialog')?.close();
  settingsOrdersScope = "device";
  openSettings("cashier");
  showSettingsTab('orders');
});

document.getElementById('btnGestionAdmin')?.addEventListener('click', () => {
  if (getDeviceCode() !== 'A') {
    showSettingsStatus(
      'Administration réservée à la caisse centrale.',
      'warning'
    );
    return;
  }

  document.getElementById('gestionDialog')?.close();
  settingsOrdersScope = "all";
  openSettings("admin");
  showSettingsTab('products');
});



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

function showSettingsTab(tabName) {
  document.querySelectorAll('.settings-tabs .tab, .tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.tab === tabName);
  });

  document.querySelectorAll('.tab-panel').forEach(panel => {
    panel.classList.remove('active');
  });

  document.getElementById('tab-' + tabName)?.classList.add('active');

  if (tabName === 'orders') renderSettingsOrders();
  if (tabName === 'report') renderSettingsReport();
  if (tabName === 'export') exportCsv();

  updateSettingsButtons();
}

function updateSettingsButtons() {
  const btnReset = document.getElementById('btnReset');
  const btnSave = document.getElementById('btnSaveSettings');
  const tab = activeSettingsTab();

  if (btnReset) {
    const labels = {
      products: 'Vider les boutons produits',
      foods: 'Effacer les aliments',
      stocks: 'Réinitialiser les stocks',
      volunteers: 'Effacer les bénévoles',
      general: "Réinitialiser toute l'application"
    };

    if (
      getDeviceCode() !== 'A' ||
      tab === 'orders' ||
      tab === 'report' ||
      tab === 'export' ||
      tab === 'new-event'
    ) {
      btnReset.style.display = 'none';
    } else {
      btnReset.textContent = labels[tab] || 'Réinitialiser';
      btnReset.style.display = '';
    }
  }

  if (btnSave) {
    if (
      tab === 'orders' ||
      tab === 'report' ||
      tab === 'export' ||
      tab === 'new-event'
    ) {
      btnSave.style.display = 'none';
    } else {
      btnSave.style.display = '';
    }
  }
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
async function resetDraftProducts() {
  const ok = await showConfirm(
    "Vider les boutons produits",
    "Les boutons produits seront vidés.\n\nCette action ne sera réellement appliquée qu'après avoir cliqué sur Enregistrer."
  );

  if (!ok) return;

  draftConfig.products = (draftConfig.products || []).map(blankProductForSameSlot);

  renderSettings();
  updateSettingsButtons();

  showSettingsStatus(
    "Boutons produits vidés. Cliquez sur Enregistrer pour valider."
  );
}

async function resetDraftFoods() {
  const ok = await showConfirm(
    "Effacer les aliments",
    "La liste des aliments sera vidée.\n\nCette action ne sera réellement appliquée qu'après avoir cliqué sur Enregistrer."
  );

  if (!ok) return;

  draftConfig.baseFoods = [];

  (draftConfig.products || []).forEach(p => {
    p.components = [];
    p.choices = [];
    p.menuSections = (p.menuSections || []).map(sec => ({
      ...sec,
      options: (sec.options || []).map(opt => ({
        productId: opt.productId,
        supplement: opt.supplement || 0
      }))
    }));
  });

  renderSettings();
  updateSettingsButtons();

  showSettingsStatus(
    "Aliments effacés. Cliquez sur Enregistrer pour valider."
  );
}

async function resetDraftStocks() {
  const ok = await showConfirm(
    "Réinitialiser les stocks",
    "Tous les stocks seront mis en non suivi.\n\nCette action ne sera réellement appliquée qu'après avoir cliqué sur Enregistrer."
  );

  if (!ok) return;

  (draftConfig.products || []).forEach(p => {
    p.stock = '';
  });

  (draftConfig.baseFoods || []).forEach(f => {
    f.stock = '';
  });

  renderStockEditor();

  showSettingsStatus(
    "Stocks réinitialisés. Cliquez sur Enregistrer pour valider."
  );
}

async function resetDraftVolunteers() {

  const ok = await showConfirm(
    "Effacer les bénévoles",
    "La liste des bénévoles sera vidée.\n\nCette action ne sera réellement appliquée qu'après avoir cliqué sur Enregistrer."
  );

  if (!ok) return;

  draftConfig.volunteers = [];

  renderVolunteerEditor();

  showSettingsStatus(
    "Liste des bénévoles effacée. Cliquez sur Enregistrer pour valider."
  );
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
  renderEventTitle();
  renderCart();
  updatePayment();
  showMessage('Application réinitialisée', "L'application est revenue aux réglages par défaut.");
}
function handleSettingsReset() {
  const tab = activeSettingsTab();

  if (tab === 'products') {
    return resetDraftProducts();
  }

  if (tab === 'foods') {
    return resetDraftFoods();
  }

  if (tab === 'stocks') {
    return resetDraftStocks();
  }

  if (tab === 'volunteers') {
    return resetDraftVolunteers();
  }

  if (tab === 'orders') {
    return clearAllOrdersAndTickets();
  }

  if (tab === 'report') {
    return resetReportData();
  }

  if (tab === 'general') {
    return resetWholeApplication();
  }
}
document.getElementById('btnCloseChoice').addEventListener('click', () => document.getElementById('choiceDialog').close());
document.getElementById('btnAddChoiceProduct').addEventListener('click', addChoiceProduct);
document.getElementById('btnCloseSettings').addEventListener('click', () => document.getElementById('settingsDialog').close());
document.getElementById('btnCloseSettingsBottom')?.addEventListener('click', () => {
  document.getElementById('settingsDialog')?.close();
});
document.getElementById('btnSaveSettings').addEventListener('click', saveSettings);
document.getElementById('btnAddFood').addEventListener('click', () => { draftConfig.baseFoods.push({ id: uid('food'), name: 'Nouvel aliment', category: 'Viande', stock: '' }); renderSettings(); });
document.getElementById('btnAddVolunteer').addEventListener('click', () => { draftConfig.volunteers ||= []; draftConfig.volunteers.push({ id: uid('vol'), name: 'Nouveau bénévole', active: true }); renderVolunteerEditor(); });
document.getElementById('btnReset').addEventListener('click', handleSettingsReset);
const btnNewEvent = document.getElementById('btnNewEvent');
const btnResetAllSupabaseData = document.getElementById('btnResetAllSupabaseData');

if (btnResetAllSupabaseData) {
  btnResetAllSupabaseData.addEventListener('click', resetAllSupabaseData);
}

if (btnNewEvent) {
  btnNewEvent.addEventListener('click', startNewEvent);
}
document.querySelectorAll('.tab').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
  if (btn.dataset.tab === 'orders') renderSettingsOrders();
  if (btn.dataset.tab === 'report') renderSettingsReport();
  if (btn.dataset.tab === 'export') exportCsv();
  updateSettingsButtons();
}));
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js');


async function recoverDeviceCode(deviceCode, deviceName, printMode) {
  if (!supabaseClient) return false;

  const { error } = await supabaseClient
    .from('devices')
    .update({
      device_name: deviceName,
      device_type: /iPad/i.test(navigator.userAgent) ? 'ipad' : 'windows',
      current_device: getDeviceInstanceId(),
      device_status: 'busy',
      print_mode: printMode,
      app_version: '2026.13',
      last_seen: new Date().toISOString()
    })
    .eq('device_code', deviceCode);

  if (error) {
    console.error('Erreur récupération caisse', error);
    return false;
  }

  return true;
}

function initDeviceSetupDialog() {
  const dialog = document.getElementById('deviceSetupDialog');
  const btnSave = document.getElementById('btnSaveDeviceConfig');

  if (!dialog || !btnSave) return;

  btnSave.addEventListener('click', async () => {
    const deviceName = document.getElementById('deviceName').value.trim();
    const deviceCode = document.getElementById('deviceCode').value;
    const printMode = document.getElementById('devicePrintMode').value;

    if (!deviceName) {
      showMessage('Configuration incomplète', 'Indique un nom pour cet appareil.');
      return;
    }

    if (!(await isDeviceCodeAvailable(deviceCode))) {
      showConfirm(
        'Poste déjà utilisé',
        `Le poste ${deviceCode} est déjà utilisé par une autre caisse.\n\nVoulez-vous récupérer cette caisse sur cet appareil ?`,
        async () => {
          const recovered = await recoverDeviceCode(deviceCode, deviceName, printMode);

          if (!recovered) {
            showMessage('Erreur', `Impossible de récupérer la caisse ${deviceCode}.`);
            return;
          }

          saveDeviceConfig({ deviceName, deviceCode, printMode });

          orderNumber = loadOrderNumber();

          await loadConfigFromSupabase();
          await syncOrderNumberFromSupabase();
          await registerDevice();

          renderCart();
          renderDeviceInfo();

          dialog.close();

          if (getDeviceCode() === 'A') {
            updateCentralDashboard();
            startCentralServices();
          }

          showMessage('Caisse récupérée', `Cet appareil utilise maintenant la caisse ${deviceCode}.`);
        }
      );

      return;
    }

    saveDeviceConfig({ deviceName, deviceCode, printMode });

    orderNumber = loadOrderNumber();

    await loadConfigFromSupabase();
    await syncOrderNumberFromSupabase();
    await registerDevice();

    renderCart();
    renderDeviceInfo();

    dialog.close();

    if (getDeviceCode() === 'A') {
      updateCentralDashboard();
      startCentralServices();
    }

    showMessage('Appareil configuré', `Cet appareil est configuré comme caisse ${deviceCode}.`);
  });

  if (!getDeviceConfig()) {
    dialog.showModal();
  } else {
    orderNumber = loadOrderNumber();
    renderCart();
    renderDeviceInfo();

    if (getDeviceCode() === 'A') {
      startCentralServices();
    }
  }
}

async function checkDeviceOwnership() {
  if (!supabaseClient) return;

  const { data, error } = await supabaseClient
    .from('devices')
    .select('current_device')
    .eq('device_code', getDeviceCode())
    .single();

  if (error || !data) return;

  if (data.current_device !== getDeviceInstanceId()) {
    showMessage(
      'Caisse transférée',
      'Cette caisse a été reprise par un autre appareil.'
    );

    localStorage.removeItem(DEVICE_CONFIG_KEY);

    setTimeout(() => location.reload(), 1500);
  }
}


const btnToggleDisplayMode = document.getElementById('btnToggleDisplayMode');

function updateDisplayModeButton() {
  if (!btnToggleDisplayMode) return;

  btnToggleDisplayMode.textContent =
    getDisplayMode() === 'compact'
      ? '▤ Standard'
      : '▣ Compact';
}

if (btnToggleDisplayMode) {
  updateDisplayModeButton();

  btnToggleDisplayMode.addEventListener('click', () => {
    setDisplayMode(
      getDisplayMode() === 'compact'
        ? 'standard'
        : 'compact'
    );

    updateDisplayModeButton();
  });
}
applyDisplayMode();
renderProducts();
renderCart();
initSupabaseSync();
initDeviceSetupDialog();
setTimeout(() => {
  ensureCurrentEvent();
}, 800);

document.addEventListener('DOMContentLoaded', () => { const b = document.getElementById('btnCloseSettingsBottom'); if (b) { b.addEventListener('click', () => document.getElementById('settingsDialog')?.close()); } });
