// ============================================================
//  Finca PataPalo — App Logic v2
//  Cart | Language | Featured Strip | Product Grid | Variants
// ============================================================

// ── State Variables ─────────────────────────────────────────
let currentLang = localStorage.getItem('pp_lang') || 'es';
let currentCategory = 'all';
const selectedVariants = {};

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('pp_lang', lang);
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-es]').forEach(el => {
    el.textContent = el.dataset[lang] || el.dataset.es;
  });
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  // Re-render dynamic content in correct language
  renderCategoryTabs();
  renderFeatured();
  renderProducts(currentCategory);
  renderCart();
}

// ── App Settings (Admin Configs) ──────────────────────────
async function applyAdminConfigs() {
  let cloudConfigs = [];
  
  if (window.db) {
     const { data, error } = await db.from('fincapatapalo_product_configs').select('*');
     if (!error && data) {
        cloudConfigs = data;
     } else {
        console.warn("No se pudo cargar desde Supabase, o esta vacía.", error);
     }
  }

  PRODUCTS.forEach(p => {
    // Buscar en la nube primero, hacer fallback a localStorage
    let cfg = cloudConfigs.find(c => c.id === p.id);
    let s = localStorage.getItem(`fp-config-${p.id}`);
    
    if (cfg) {
       // Adaptar formato base de datos a formato de la app
       cfg.unitType = cfg.unit_type; // remap from db
    } else if (s) {
       try { cfg = JSON.parse(s); } catch(e) {}
    }

    if (cfg) {
       p.price = cfg.price !== undefined ? cfg.price : p.price;
       p.featured = cfg.featured !== undefined ? cfg.featured : p.featured;
       p.available = cfg.available !== undefined ? cfg.available : true;
       if (cfg.unitType) {
         const units = cfg.unitType.split(',');
         
         let baseUnit = units.includes('70g') ? '70g' : 
                        units.includes('500g') ? '500g' : 
                        units.includes('kilo') ? 'kilo' : 'unit';

         let variants = [];
         units.forEach(u => {
            if (u === 'unit') {
               let val = (cfg.price_unit !== undefined && cfg.price_unit !== null) ? cfg.price_unit : p.price;
               variants.push({ label: "Por Unidad", labelEs: "Por Unidad", labelEn: "Per Unit", price: val });
            } else if (u === '70g') {
               let val = (cfg.price_70g !== undefined && cfg.price_70g !== null) ? cfg.price_70g : p.price;
               variants.push({ label: "70g", labelEs: "Bolsa 70g", labelEn: "70g bag", price: val });
            } else if (u === '500g') {
               let multiplier = (baseUnit === '70g') ? 5 : 1;
               let val = (cfg.price_500g !== undefined && cfg.price_500g !== null) ? cfg.price_500g : p.price * multiplier;
               variants.push({ label: "Medio Kilo", labelEs: "Medio Kilo", labelEn: "500g", price: val });
            } else if (u === 'kilo') {
               let multiplier = (baseUnit === '70g') ? 10 : (baseUnit === '500g') ? 2 : 1;
               let val = (cfg.price_kilo !== undefined && cfg.price_kilo !== null) ? cfg.price_kilo : p.price * multiplier;
               variants.push({ label: "1 kg", labelEs: "1 kg", labelEn: "1 kg", price: val });
            }
         });
         
         // Sort variants by price ascending
         variants.sort((a, b) => a.price - b.price);

         if (variants.length > 1) {
             p.variants = variants;
             p.price = variants[0].price; // UI displays "desde X c/u"
         } else if (variants.length === 1) {
             p.price = variants[0].price;
             delete p.variants;
         } else {
             delete p.variants;
         }
       }
    } else {
       p.available = true; 
    }
  });
}

function getProductPrice(product, variantIdx = null) {
  if (product.variants && variantIdx !== null) {
    const v = product.variants[variantIdx];
    return v ? v.price : product.price;
  }
  return product.price;
}
function formatPrice(p) {
  return '\u20A1' + p.toLocaleString('es-CR');
}

// ── Product image map ─────────────────────────────────────
const PRODUCT_IMGS = {
  carambola:          { img: 'images/carambola.png' },
  papaya:             { img: 'images/papaya.png' },
  jackfruit:          { img: 'images/jackfruit.png' },
  'limon-caviar':     { img: 'images/limon-caviar.png' },
  caimito:            { img: 'images/caimito.png' },
  zapote:             { img: 'images/zapote.png' },
  pitaya:             { img: 'images/pitaya.png' },
  'sacha-fresco':     { img: 'images/sacha-fresco.png' },
  jamaica:            { img: 'images/jamaica.png' },
  cacao:              { img: 'images/cacao.png' },
  acai:               { img: 'images/acai.png' },
  yuca:               { img: 'images/yuca.png' },
  malanga:            { img: 'images/malanga.png' },
  camote:             { img: 'images/camote.png' },
  platano:            { img: 'images/platano.png' },
  'banano-manzana':   { img: 'images/banano-manzana.png' },
  'manzana-agua-roja': { img: 'images/manzana-agua-roja.png' },
  'manzana-agua-blanca': { img: 'images/manzana-agua-blanca.png' },
  'camote-criollo':   { img: 'images/camote-criollo.png' },
  castanas:           { img: 'images/castanas.png' },
  'jackfruit-emp':    { img: 'images/jackfruit-emp.png' },
  'jackfruit-desh':   { img: 'images/jackfruit-desh.png' },
  'chips-mixtos':     { img: 'images/chips-mixtos.png' },
  'sacha-polvo':      { img: 'images/sacha-polvo.png' },
  curcuma:            { img: 'images/curcuma.png' },
  jengibre:           { img: 'images/jengibre.png' },
  'pimienta-negra':   { img: 'images/pimienta-negra.png' },
  'pimienta-blanca':  { img: 'images/pimienta-blanca.png' },
  canela:             { img: 'images/canela.png' },
  'harina-yuca':      { img: 'images/harina-yuca.png' },
  'harina-platano':   { img: 'images/harina-platano.png' },
  'harina-camote':    { img: 'images/harina-camote.png' },
  'polvo-mezcla-3':   { img: 'images/polvo-mezcla-3.png' },
  'caps-curcuma-pim': { img: 'images/caps-curcuma-pim.png' },
  'caps-3':           { img: 'images/caps-3.png' },
  'caps-guanabana':   { img: 'images/caps-guanabana.png' },
  'dirty-dozen':      { img: 'images/dirty-dozen.png' },
  mimbro:             { img: 'images/mimbro.png' },
  ackee:              { img: 'images/ackee.png' },
  kumquat:            { img: 'images/kumquat.png' },
  pipian:             { img: 'images/pipian.png' },
  'carolina-reaper':  { img: 'images/carolina-reaper.png' },
  cayena:             { img: 'images/cayena.png' },
  jalapeno:           { img: 'images/jalapeno.png' },
  okra:               { img: 'images/okra.png' },
  katuk:              { img: 'images/katuk.png' },
  'limon-kaffir':     { img: 'images/limon-kaffir.png' },
  sagu:               { img: 'images/sagu.png' },
  guanabana:          { img: 'images/guanabana.png' },
  cas:                { img: 'images/cas.png' },
  'bitter-melon':     { img: 'images/bitter-melon.png' },
  galangal:           { img: 'images/galangal.png' },
};

function getMediaImg(id) {
  const m = PRODUCT_IMGS[id];
  return m && m.img ? m.img : null;
}
function getMediaEmoji(id) {
  const m = PRODUCT_IMGS[id];
  return m && m.emoji ? m.emoji : '🌿';
}

// ── Cart State ────────────────────────────────────────────
// cartItems: [{cartKey, id, name, variantLabel, price, img, emoji, qty}]
let cartItems = [];

function cartKey(id, variantIdx) {
  return variantIdx !== null && variantIdx !== undefined ? `${id}_v${variantIdx}` : id;
}

function addToCart(id, variantIdx = null) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  const price = getProductPrice(product, variantIdx);
  const name = currentLang === 'es' ? product.es : product.en;
  let variantLabel = '';
  if (product.variants && variantIdx !== null) {
    const v = product.variants[variantIdx];
    variantLabel = currentLang === 'es' ? v.labelEs : v.labelEn;
  }

  const key = cartKey(id, variantIdx);
  const existing = cartItems.find(i => i.cartKey === key);
  if (existing) {
    existing.qty++;
  } else {
    cartItems.push({
      cartKey: key,
      id,
      name,
      variantLabel,
      price,
      img: getMediaImg(id),
      emoji: getMediaEmoji(id),
      qty: 1,
    });
  }

  if (window.trackAddToCart) {
    window.trackAddToCart(id, variantLabel || '1 Kilo / Por Defecto');
  }

  renderCart();
  updateCartBadge();
  flashAddBtn(key);
}

function removeFromCart(key) {
  cartItems = cartItems.filter(i => i.cartKey !== key);
  renderCart();
  updateCartBadge();
  renderProducts(currentCategory); // refresh btn states
}

function changeQty(key, delta) {
  const item = cartItems.find(i => i.cartKey === key);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) { removeFromCart(key); return; }
  renderCart();
  updateCartBadge();
}

function updateCartBadge() {
  const total = cartItems.reduce((s, i) => s + i.qty, 0);
  const badge = document.getElementById('cart-badge');
  if (!badge) return;
  badge.textContent = total;
  badge.classList.toggle('visible', total > 0);
}

function flashAddBtn(key) {
  // Briefly mark all add buttons for this cartKey as in-cart
  document.querySelectorAll(`[data-cart-key="${key}"]`).forEach(btn => {
    btn.classList.add('in-cart');
    btn.textContent = '✓';
    setTimeout(() => {
      btn.classList.remove('in-cart');
      btn.textContent = currentLang === 'es' ? 'Agregar' : 'Add';
    }, 1400);
  });
}

function renderCart() {
  const container = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total-value');
  if (!container) return;

  if (cartItems.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <div class="empty-icon">🛒</div>
        <p data-es="Tu carrito está vacío" data-en="Your cart is empty">
          ${currentLang === 'es' ? 'Tu carrito está vacío' : 'Your cart is empty'}
        </p>
      </div>`;
    if (totalEl) totalEl.textContent = '₡0';
    return;
  }

  container.innerHTML = cartItems.map(item => `
    <div class="cart-item">
      <div class="cart-item-thumb">
        ${item.img
          ? `<img src="${item.img}" alt="${item.name}" loading="lazy" />`
          : `<div class="thumb-emoji">${item.emoji}</div>`}
      </div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        ${item.variantLabel ? `<div class="cart-item-variant">${item.variantLabel}</div>` : ''}
        <div class="cart-item-price">${formatPrice(item.price)} c/u</div>
      </div>
      <div class="qty-control">
        <button class="qty-btn" onclick="changeQty('${item.cartKey}', -1)">−</button>
        <span class="qty-num">${item.qty}</span>
        <button class="qty-btn" onclick="changeQty('${item.cartKey}', 1)">+</button>
      </div>
    </div>`).join('');

  const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  if (totalEl) totalEl.textContent = formatPrice(subtotal);
}

// ── WhatsApp Order ────────────────────────────────────────
function orderViaWhatsApp(e) {
  if (e) e.preventDefault();
  let text = '';
  if (cartItems.length > 0) {
    const lines = cartItems.map(item => {
      const suf = item.variantLabel ? ` (${item.variantLabel})` : '';
      return `${item.qty}x ${item.name}${suf} - ${formatPrice(item.price * item.qty)}`;
    });
    const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
    text = currentLang === 'es'
      ? `Hola! Quiero hacer el siguiente pedido:\n\n${lines.join('\n')}\n\nSubtotal: ${formatPrice(subtotal)}\n\n📌 Para entregas este sábado en La Feria Verde (Barrio Aranjuez, San José).\n*Deseo pagar mediante:*\n[ ] SINPE Móvil\n[ ] Efectivo en la feria`
      : `Hello! I'd like to place the following order:\n\n${lines.join('\n')}\n\nSubtotal: ${formatPrice(subtotal)}\n\n📌 For delivery this Saturday at La Feria Verde (Barrio Aranjuez, San José).\n*My payment method will be:*\n[ ] SINPE\n[ ] Cash at the market`;
  } else {
    text = currentLang === 'es'
      ? `Hola! Quiero hacer un pedido.`
      : `Hello! I'd like to place an order.`;
  }
  const waUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(text)}`;
  window.open(waUrl, '_blank');
}

// ── Featured Strip ────────────────────────────────────────
function renderFeatured() {
  const container = document.getElementById('featured-scroll');
  if (!container) return;

  const featured = PRODUCTS.filter(p => p.featured && p.available);
  container.innerHTML = featured.map(p => {
    const name = currentLang === 'es' ? p.es : p.en;
    const desc = currentLang === 'es' ? p.desc_es : p.desc_en;
    const img = getMediaImg(p.id);
    const emoji = getMediaEmoji(p.id);

    if (p.variants && selectedVariants[p.id] === undefined) {
      selectedVariants[p.id] = 0;
    }
    const variantIdx = p.variants ? selectedVariants[p.id] : null;

    const price = getProductPrice(p, variantIdx);
    const key = cartKey(p.id, variantIdx);
    const inCart = cartItems.some(i => i.cartKey === key);
    const freshLabel = currentLang === 'es' ? '⚡ Temporada' : '⚡ In Season';

    // Size selector pills
    const sizePills = p.variants ? `
      <div class="size-selector" style="margin-top:0.5rem; justify-content:flex-start;">
        ${p.variants.map((v, idx) => `
          <button class="size-pill ${idx === variantIdx ? 'selected' : ''}"
            onclick="selectVariant('${p.id}', ${idx})">
            ${currentLang === 'es' ? v.labelEs : v.labelEn}
          </button>`).join('')}
      </div>` : '';

    return `
    <div class="featured-card">
      <div class="featured-card-img-wrap">
        ${img
          ? `<img src="${img}" alt="${name}" loading="eager" />`
          : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:4rem;background:linear-gradient(135deg,#fdf3e3,#f0ece0)">${emoji}</div>`}
        <div class="featured-badge">${freshLabel}</div>
      </div>
      <div class="featured-card-body">
        <div class="featured-card-name">${name}</div>
        <div class="featured-card-desc">${desc || ''}</div>
        ${sizePills}
        <div class="featured-card-footer" style="margin-top: 1rem;">
          <div class="featured-price">${formatPrice(price)}</div>
          <button class="tactile-add-btn ${inCart ? 'in-cart' : ''}"
            data-cart-key="${key}"
            onclick="addToCart('${p.id}', ${variantIdx})">
            ${inCart ? (currentLang === 'es' ? '✓ Listo' : '✓ Added') : (currentLang === 'es' ? 'Agregar' : 'Add')}
          </button>
        </div>
      </div>
    </div>`;
  }).join('');
}

// ── Products Grid ─────────────────────────────────────────

function renderCategoryTabs() {
  const container = document.getElementById('category-tabs');
  if (!container) return;
  const allLabel = currentLang === 'es' ? 'Todo' : 'All';
  const tabs = [{ id: 'all', label: allLabel }];
  Object.entries(CATEGORIES).forEach(([id, labels]) => {
    tabs.push({ id, label: labels[currentLang] });
  });
  container.innerHTML = tabs.map(t => `
    <button class="tab-btn ${t.id === currentCategory ? 'active' : ''}"
      onclick="selectCategory('${t.id}')">
      ${t.label}
    </button>`).join('');
}

function selectCategory(cat) {
  currentCategory = cat;
  renderCategoryTabs();
  renderProducts(cat);
}

function renderProducts(cat = 'all') {
  const container = document.getElementById('products-grid');
  if (!container) return;

  let list = cat === 'all' ? [...PRODUCTS] : PRODUCTS.filter(p => p.category === cat);

  // Maintain section grouping, but internally sort alphabetically based on current language
  const categoryOrder = ['fresh', 'packed', 'chips', 'spices', 'flours', 'supplements', 'tea'];
  list.sort((a, b) => {
    if (cat === 'all') {
      const idxA = categoryOrder.indexOf(a.category);
      const idxB = categoryOrder.indexOf(b.category);
      if (idxA !== idxB) return idxA - idxB;
    }
    const nameA = currentLang === 'es' ? a.es : a.en;
    const nameB = currentLang === 'es' ? b.es : b.en;
    return nameA.localeCompare(nameB);
  });
  const catLabel = currentLang === 'es'
    ? { fresh:'Fresco', packed:'Empacado', chips:'Chips', spices:'Especia', flours:'Harina', supplements:'Suplemento', tea:'Té' }
    : { fresh:'Fresh', packed:'Packed', chips:'Chips', spices:'Spice', flours:'Flour', supplements:'Supplement', tea:'Tea' };

  container.innerHTML = list.map(p => {
    const name = currentLang === 'es' ? p.es : p.en;
    const desc = currentLang === 'es' ? p.desc_es : p.desc_en;
    const img = getMediaImg(p.id);
    const emoji = getMediaEmoji(p.id);

    // Determine selected variant
    if (p.variants && selectedVariants[p.id] === undefined) {
      selectedVariants[p.id] = 0; // default to first (70g)
    }
    const variantIdx = p.variants ? selectedVariants[p.id] : null;
    const price = getProductPrice(p, variantIdx);
    const key = cartKey(p.id, variantIdx);
    const inCart = cartItems.some(i => i.cartKey === key);
    const catBadge = catLabel[p.category] || p.category;
    const orgBadge = currentLang === 'es' ? '🌱 Orgánico' : '🌱 Organic';

    // Size selector pills
    const sizePills = p.variants ? `
      <div class="size-selector">
        ${p.variants.map((v, idx) => `
          <button class="size-pill ${idx === variantIdx ? 'selected' : ''}"
            onclick="selectVariant('${p.id}', ${idx})">
            ${currentLang === 'es' ? v.labelEs : v.labelEn}
          </button>`).join('')}
      </div>` : '';

    const priceHtml = p.available ? formatPrice(price) : `<span style="color:var(--c-muted);font-size:0.9rem">${currentLang === 'es' ? 'Agotado' : 'Out of Stock'}</span>`;
    const addBtnHtml = p.available
      ? `<button class="tactile-add-btn ${inCart ? 'in-cart' : ''}" data-cart-key="${key}" onclick="addToCart('${p.id}', ${variantIdx})">${inCart ? (currentLang === 'es' ? '✓ Listo' : '✓ Added') : (currentLang === 'es' ? 'Agregar' : 'Add')}</button>`
      : `<div class="tactile-add-btn" style="background:var(--c-border);color:var(--c-muted);pointer-events:none;">${currentLang === 'es' ? 'Agotado' : 'Out of Stock'}</div>`;

    return `
    <div class="product-card">
      <div class="product-img-wrap" style="${!p.available ? 'opacity:0.6; filter:grayscale(1)' : ''}">
        ${img
          ? `<img src="${img}" alt="${name}" loading="lazy" />`
          : `<div class="product-emoji-fallback">${emoji}</div>`}
        <div class="product-cat-badge">${catBadge}</div>
        <div class="product-org-badge">${orgBadge}</div>
      </div>
      <div class="product-body" style="${!p.available ? 'opacity:0.6; filter:grayscale(1)' : ''}">
        <div class="product-name">${name}</div>
        <div class="product-desc">${desc || ''}</div>
        ${sizePills}
        <div class="product-footer">
          <div class="product-price">${priceHtml}</div>
          ${addBtnHtml}
        </div>
      </div>
    </div>`;
  }).join('');
}

function selectVariant(productId, variantIdx) {
  selectedVariants[productId] = variantIdx;
  renderFeatured();
  renderProducts(currentCategory);
}

// ── Nav scroll ────────────────────────────────────────────
function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 50);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ── Cart UI ───────────────────────────────────────────────
function initCart() {
  const overlay = document.getElementById('cart-overlay');
  const cartBtns = document.querySelectorAll('.cart-btn');
  const closeBtn = document.getElementById('cart-close-btn');
  const orderBtn = document.getElementById('whatsapp-order-btn');

  const open = () => overlay && overlay.classList.add('open');
  const close = () => overlay && overlay.classList.remove('open');

  cartBtns.forEach(btn => btn.addEventListener('click', open));
  closeBtn && closeBtn.addEventListener('click', close);
  overlay && overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  orderBtn && orderBtn.addEventListener('click', orderViaWhatsApp);
}

// ── Language buttons ──────────────────────────────────────
function initLang() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });
}

// ── Scroll animations ─────────────────────────────────────
function initReveal() {
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ── Hero CTA scroll ───────────────────────────────────────
function initHeroCTA() {
  const btn = document.getElementById('hero-shop-btn');
  btn && btn.addEventListener('click', () => {
    document.getElementById('shop') &&
    document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
  });
}

// ── Init ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  await applyAdminConfigs();
  setLang(currentLang);
  initNav();
  initCart();
  initLang();
  initReveal();
  initHeroCTA();
  renderFeatured();
  renderCategoryTabs();
  renderProducts();
  renderCart();
  updateCartBadge();
});
