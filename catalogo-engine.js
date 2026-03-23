// =====================================================
//  catalogo-engine.js
//  Motor compartido para postres.html y comida-fria.html
// =====================================================

// ── Carrito ──────────────────────────────────────────────
function getCart() {
  try { return JSON.parse(localStorage.getItem('ancheta_cart')) || []; }
  catch { return []; }
}
function saveCart(c) {
  localStorage.setItem('ancheta_cart', JSON.stringify(c));
  updateBadge();
  renderCartDrawer();
}
function updateBadge() {
  const total = getCart().reduce((s, i) => s + i.qty, 0);
  const badge = document.getElementById('anchetaBadge');
  const count = document.getElementById('badgeCount');
  if (badge) badge.style.display = total > 0 ? 'flex' : 'none';
  if (count) count.textContent = total;
}

function addToCart(id) {
  const prod = CATALOGO.find(p => p.id === id);
  if (!prod) return;
  let cart = getCart();
  const ex = cart.find(i => i.id === id);
  if (ex) { ex.qty += 1; }
  else { cart.push({ id: prod.id, name: prod.name, emoji: prod.emoji, image: prod.image || '', price: prod.price, qty: 1, seccion: prod.seccion }); }
  saveCart(cart);
  syncCardState(id);
  showToast('🎁 ' + prod.name + ' agregado a tu ancheta');
  openCartDrawer();
}

function changeQty(id, delta) {
  let cart = getCart();
  const idx = cart.findIndex(i => i.id === id);
  if (idx === -1) return;
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) cart.splice(idx, 1);
  saveCart(cart);
  syncCardState(id);
}

function syncCardState(id) {
  const item = getCart().find(i => i.id === id);
  const qty = item ? item.qty : 0;
  const btnAncheta = document.getElementById('btn-ancheta-' + id);
  const qtyCtrl    = document.getElementById('qty-' + id);
  const qnum       = document.getElementById('qnum-' + id);
  if (!btnAncheta) return;
  if (qty > 0) {
    btnAncheta.style.display = 'none';
    if (qtyCtrl) qtyCtrl.classList.add('visible');
    if (qnum)    qnum.textContent = qty;
  } else {
    btnAncheta.style.display = '';
    if (qtyCtrl) qtyCtrl.classList.remove('visible');
  }
}

// ── Carrito Drawer ───────────────────────────────────────
function fmt(n) { return '$' + n.toLocaleString('es-CO'); }

function openCartDrawer() {
  document.getElementById('cartDrawer')?.classList.add('open');
  document.getElementById('cartOverlay')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCartDrawer() {
  document.getElementById('cartDrawer')?.classList.remove('open');
  document.getElementById('cartOverlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

function changeDrawerQty(id, delta) {
  let cart = getCart();
  const idx = cart.findIndex(i => i.id === id);
  if (idx === -1) return;
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) cart.splice(idx, 1);
  saveCart(cart);
  syncCardState(id);
}

function removeFromCart(id) {
  let cart = getCart().filter(i => i.id !== id);
  saveCart(cart);
  syncCardState(id);
}

function renderCartDrawer() {
  const cart    = getCart();
  const drawerEl = document.getElementById('cartDrawer');
  if (!drawerEl) return;

  const subtotal = cart.reduce((s, i) => s + i.qty * i.price, 0);
  const empaque  = CONFIG.empaque;
  const grand    = subtotal + empaque;
  const totalQty = cart.reduce((s, i) => s + i.qty, 0);

  // sync floating badge
  const count = document.getElementById('badgeCount');
  const badge = document.getElementById('anchetaBadge');
  if (count) count.textContent = totalQty;
  if (badge) badge.style.display = totalQty > 0 ? 'flex' : 'none';

  const dbadge = document.getElementById('drawerBadge');
  if (dbadge) dbadge.textContent = totalQty;

  const itemsEl = document.getElementById('drawerItems');
  const emptyEl = document.getElementById('drawerEmpty');
  const footEl  = document.getElementById('drawerFooter');

  if (cart.length === 0) {
    if (itemsEl) itemsEl.innerHTML = '';
    if (emptyEl) emptyEl.style.display = 'block';
    if (footEl)  footEl.style.display  = 'none';
    return;
  }

  if (emptyEl) emptyEl.style.display = 'none';
  if (footEl)  footEl.style.display  = 'block';

  if (itemsEl) {
    itemsEl.innerHTML = '';
    cart.forEach(item => {
      const div = document.createElement('div');
      div.className = 'drawer-item';
      const thumb = item.image
        ? '<img src="' + item.image + '" alt="' + item.name + '" onerror="this.style.display=\'none\'"><span style="display:none">' + item.emoji + '</span>'
        : '<span>' + item.emoji + '</span>';
      div.innerHTML =
        '<div class="di-thumb">' + thumb + '</div>' +
        '<div class="di-info">' +
          '<div class="di-name">' + item.name + '</div>' +
          '<div class="di-price">' + fmt(item.price) + ' <small>c/u</small> · <strong>' + fmt(item.price * item.qty) + '</strong></div>' +
        '</div>' +
        '<div class="di-controls">' +
          '<button class="di-btn" onclick="changeDrawerQty(\'' + item.id + '\',-1)">−</button>' +
          '<span class="di-qty">' + item.qty + '</span>' +
          '<button class="di-btn" onclick="changeDrawerQty(\'' + item.id + '\',1)">+</button>' +
          '<button class="di-remove" onclick="removeFromCart(\'' + item.id + '\')" title="Quitar">✕</button>' +
        '</div>';
      itemsEl.appendChild(div);
    });
  }

  const subEl   = document.getElementById('drawerSubtotal');
  const empEl   = document.getElementById('drawerEmpaque');
  const grandEl = document.getElementById('drawerGrand');
  if (subEl)   subEl.textContent   = fmt(subtotal);
  if (empEl)   empEl.textContent   = fmt(empaque);
  if (grandEl) grandEl.textContent = fmt(grand);

  const btnOrder = document.getElementById('drawerBtnOrder');
  if (btnOrder) {
    let text = '🎁 *Pedido de Ancheta — ' + CONFIG.nombre_negocio + '*\n\n*Productos:*\n';
    cart.forEach(i => { text += '• ' + i.emoji + ' ' + i.name + ' x' + i.qty + ' = ' + fmt(i.price * i.qty) + '\n'; });
    text += '\n📦 Empaque & Decoración: ' + fmt(empaque);
    text += '\n💰 *Total estimado: ' + fmt(grand) + '*';
    text += '\n\n¡Hola! Quisiera hacer este pedido 😊';
    btnOrder.href = 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(text);
  }
}

function injectCartDrawer(accentColor) {
  const color = accentColor || 'var(--rose)';

  const overlay = document.createElement('div');
  overlay.id = 'cartOverlay';
  overlay.onclick = closeCartDrawer;
  document.body.appendChild(overlay);

  const drawer = document.createElement('div');
  drawer.id = 'cartDrawer';
  drawer.innerHTML =
    '<div class="drawer-header">' +
      '<div class="drawer-title">' +
        '<span>🎁 Mi Ancheta</span>' +
        '<span class="drawer-badge" id="drawerBadge">0</span>' +
      '</div>' +
      '<button class="drawer-close" onclick="closeCartDrawer()">✕</button>' +
    '</div>' +
    '<div class="drawer-body">' +
      '<div class="drawer-empty" id="drawerEmpty">' +
        '<div class="de-emoji">🛍️</div>' +
        '<p>Tu ancheta está vacía</p>' +
        '<small>Agrega productos desde el catálogo</small>' +
      '</div>' +
      '<div class="drawer-items" id="drawerItems"></div>' +
    '</div>' +
    '<div class="drawer-footer" id="drawerFooter" style="display:none">' +
      '<div class="drawer-totals">' +
        '<div class="drawer-row"><span>Subtotal</span><span id="drawerSubtotal">$0</span></div>' +
        '<div class="drawer-row"><span>📦 Empaque & deco</span><span id="drawerEmpaque">$0</span></div>' +
        '<div class="drawer-divider"></div>' +
        '<div class="drawer-row grand"><span>Total estimado</span><span id="drawerGrand">$0</span></div>' +
      '</div>' +
      '<a href="crea-tu-ancheta.html" class="drawer-btn-ancheta">✨ Personalizar ancheta</a>' +
      '<a href="#" id="drawerBtnOrder" target="_blank" rel="noopener" class="drawer-btn-order">' +
        '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>' +
        'Pedir por WhatsApp' +
      '</a>' +
    '</div>';
  document.body.appendChild(drawer);

  const style = document.createElement('style');
  style.textContent = `
    #cartOverlay {
      display:none; position:fixed; inset:0; background:rgba(43,26,16,0.42);
      backdrop-filter:blur(3px); z-index:1100; opacity:0; transition:opacity 0.3s;
    }
    #cartOverlay.open { display:block; opacity:1; }

    #cartDrawer {
      position:fixed; top:0; right:0; bottom:0; width:min(400px,100vw);
      background:var(--warm-white); z-index:1200; display:flex; flex-direction:column;
      box-shadow:-8px 0 40px rgba(43,26,16,0.18);
      transform:translateX(102%); transition:transform 0.36s cubic-bezier(.22,.68,0,1.2);
    }
    #cartDrawer.open { transform:translateX(0); }

    .drawer-header {
      display:flex; align-items:center; justify-content:space-between;
      padding:20px 22px 16px; border-bottom:1px solid var(--light-gold); background:var(--cream);
      flex-shrink:0;
    }
    .drawer-title {
      display:flex; align-items:center; gap:10px;
      font-family:'Playfair Display',serif; font-size:1.15rem; color:var(--chocolate);
    }
    .drawer-badge {
      background:` + color + `; color:#fff; font-family:'Nunito',sans-serif;
      font-size:0.68rem; font-weight:800; padding:2px 8px; border-radius:50px;
    }
    .drawer-close {
      width:30px; height:30px; border-radius:50%; border:1.5px solid var(--light-gold);
      background:none; color:var(--text-light); font-size:0.8rem; cursor:pointer;
      display:flex; align-items:center; justify-content:center; transition:all 0.2s;
      font-family:'Nunito',sans-serif;
    }
    .drawer-close:hover { background:var(--blush); color:var(--chocolate); border-color:var(--blush); }

    .drawer-body { flex:1; overflow-y:auto; padding:16px 20px; }
    .drawer-body::-webkit-scrollbar { width:4px; }
    .drawer-body::-webkit-scrollbar-thumb { background:var(--light-gold); border-radius:10px; }

    .drawer-empty { text-align:center; padding:45px 0 20px; }
    .de-emoji { font-size:2.8rem; margin-bottom:10px; }
    .drawer-empty p { font-family:'Playfair Display',serif; font-size:0.95rem; color:var(--chocolate); margin-bottom:4px; }
    .drawer-empty small { color:var(--text-light); font-size:0.78rem; }

    .drawer-items { display:flex; flex-direction:column; gap:9px; }

    .drawer-item {
      display:flex; align-items:center; gap:10px;
      background:var(--cream); border-radius:13px; padding:10px 11px;
      border:1px solid rgba(200,155,90,0.15); animation:fadeUp 0.22s ease both;
    }
    .di-thumb {
      width:40px; height:40px; border-radius:9px; overflow:hidden; flex-shrink:0;
      display:flex; align-items:center; justify-content:center;
      background:var(--light-gold); font-size:1.45rem;
    }
    .di-thumb img { width:100%; height:100%; object-fit:cover; }
    .di-info { flex:1; min-width:0; }
    .di-name { font-size:0.8rem; font-weight:700; color:var(--chocolate); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .di-price { font-size:0.7rem; color:var(--text-light); margin-top:2px; }
    .di-price strong { color:var(--chocolate); }
    .di-controls { display:flex; align-items:center; gap:3px; flex-shrink:0; }
    .di-btn {
      width:25px; height:25px; border-radius:50%;
      border:1.5px solid var(--light-gold); background:var(--warm-white);
      color:var(--text-light); font-size:0.95rem; font-weight:800;
      cursor:pointer; display:flex; align-items:center; justify-content:center;
      transition:all 0.18s; font-family:'Nunito',sans-serif;
    }
    .di-btn:hover { background:` + color + `; color:#fff; border-color:` + color + `; }
    .di-qty { font-size:0.83rem; font-weight:800; min-width:18px; text-align:center; color:var(--chocolate); }
    .di-remove {
      width:20px; height:20px; border-radius:50%; border:none;
      background:none; color:var(--text-light); font-size:0.65rem; font-weight:800;
      cursor:pointer; display:flex; align-items:center; justify-content:center;
      transition:all 0.18s; margin-left:2px; font-family:'Nunito',sans-serif;
    }
    .di-remove:hover { background:#fee2e2; color:#dc2626; }

    .drawer-footer { padding:16px 20px 22px; border-top:1px solid var(--light-gold); background:var(--cream); flex-shrink:0; }
    .drawer-totals { display:flex; flex-direction:column; gap:6px; margin-bottom:14px; }
    .drawer-row { display:flex; justify-content:space-between; font-size:0.82rem; color:var(--text-light); font-family:'Nunito',sans-serif; }
    .drawer-row.grand { font-family:'Playfair Display',serif; font-size:1rem; color:var(--chocolate); font-weight:700; margin-top:2px; }
    .drawer-row.grand span:last-child { color:` + color + `; }
    .drawer-divider { height:1px; background:var(--light-gold); margin:4px 0; }

    .drawer-btn-ancheta {
      display:block; text-align:center; padding:10px; border-radius:12px;
      background:var(--warm-white); border:2px solid ` + color + `; color:` + color + `;
      font-family:'Nunito',sans-serif; font-weight:800; font-size:0.85rem;
      text-decoration:none; margin-bottom:8px; transition:all 0.2s;
    }
    .drawer-btn-ancheta:hover { background:` + color + `; color:#fff; }

    .drawer-btn-order {
      display:flex; align-items:center; justify-content:center; gap:7px;
      padding:12px; border-radius:12px; background:var(--chocolate);
      color:#fff; font-family:'Nunito',sans-serif; font-weight:800; font-size:0.88rem;
      text-decoration:none; transition:all 0.2s;
    }
    .drawer-btn-order:hover { background:var(--teal); transform:translateY(-1px); }

    @media(max-width:480px){ #cartDrawer { width:100vw; } }
  `;
  document.head.appendChild(style);
}

// ── Compra individual ────────────────────────────────────
function buySolo(id) {
  const prod = CATALOGO.find(p => p.id === id);
  if (!prod) return;
  const msg =
    '🛒 *Pedido individual — ' + CONFIG.nombre_negocio + '*\n\n' +
    prod.emoji + ' *' + prod.name + '*\n' +
    'Precio: $' + prod.price.toLocaleString('es-CO') + ' / ' + prod.unit + '\n\n' +
    '¡Hola! Quisiera comprar este producto 😊';
  window.open('https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(msg), '_blank');
}

// ── Toast ────────────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2600);
}

// ── Render de una tarjeta de producto ───────────────────
function renderCard(prod, imgBg) {
  const hasImg = prod.image && prod.image.trim() !== '';
  const imgHTML   = hasImg ? '<img src="' + prod.image + '" alt="' + prod.name + '" loading="lazy" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\'">' : '';
  const fallDisp  = hasImg ? 'style="display:none"' : '';
  const bgStyle   = hasImg ? 'background:#f0f0f0' : 'background:' + imgBg;

  const badgeMap  = { popular:'⭐ Popular', nuevo:'✨ Nuevo', fresco:'🌿 Fresco' };
  const badgeHTML = prod.badge && badgeMap[prod.badge]
    ? '<span class="card-badge badge-' + prod.badge + '">' + badgeMap[prod.badge] + '</span>' : '';

  const div = document.createElement('div');
  div.className = 'product-card';
  div.dataset.cat = prod.category;
  div.dataset.id  = prod.id;

  div.innerHTML =
    '<div class="card-img-wrap" style="' + bgStyle + '">' +
      imgHTML +
      '<span class="card-emoji-fallback" ' + fallDisp + '>' + prod.emoji + '</span>' +
      badgeHTML +
    '</div>' +
    '<div class="card-body">' +
      '<h3>' + prod.name + '</h3>' +
      '<p>' + prod.description + '</p>' +
      '<div class="card-footer">' +
        '<div class="price">' + fmt(prod.price) + ' <small>/ ' + prod.unit + '</small></div>' +
        '<div class="card-actions">' +
          '<button class="btn-add-ancheta" id="btn-ancheta-' + prod.id + '" onclick="addToCart(\'' + prod.id + '\')">' +
            '🎁 + Ancheta' +
          '</button>' +
          '<div class="qty-control" id="qty-' + prod.id + '">' +
            '<button class="qty-btn" onclick="changeQty(\'' + prod.id + '\',-1)">−</button>' +
            '<span class="qty-num" id="qnum-' + prod.id + '">1</span>' +
            '<button class="qty-btn" onclick="changeQty(\'' + prod.id + '\',1)">+</button>' +
          '</div>' +
          '<button class="btn-buy-solo" onclick="buySolo(\'' + prod.id + '\')">' +
            '<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>' +
            'Comprar solo' +
          '</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  return div;
}

// ── Inicializar página de catálogo ───────────────────────
function initCatalogPage({ seccion, categoryLabels, imgBg, accentColor }) {
  const productos  = CATALOGO.filter(p => p.seccion === seccion && p.active);
  const grid       = document.getElementById('grid');
  const filterBar  = document.getElementById('filterBar');

  // Inject cart drawer
  injectCartDrawer(accentColor);

  // Botón "Todos"
  const btnAll = document.createElement('button');
  btnAll.className = 'filter-btn active';
  btnAll.dataset.filter = 'all';
  btnAll.textContent = '✨ Todos';
  filterBar.appendChild(btnAll);

  // Categorías únicas en el orden en que aparecen
  const cats = [...new Set(productos.map(p => p.category))];
  cats.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn';
    btn.dataset.filter = cat;
    btn.textContent = categoryLabels[cat] || cat;
    filterBar.appendChild(btn);
  });

  // Render tarjetas
  productos.forEach((prod, i) => {
    const card = renderCard(prod, imgBg);
    card.style.animationDelay = (i * 0.055) + 's';
    grid.appendChild(card);
  });

  // Filtros
  filterBar.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    let visible = 0;
    document.querySelectorAll('.product-card').forEach(card => {
      const match = cat === 'all' || card.dataset.cat === cat;
      card.classList.toggle('hidden', !match);
      if (match) visible++;
    });
    document.getElementById('emptyState').style.display = visible === 0 ? 'block' : 'none';
  });

  // Sync carrito al cargar
  getCart().forEach(item => syncCardState(item.id));
  updateBadge();
  renderCartDrawer();

  // Ancheta badge abre el drawer
  const anchetaBadge = document.getElementById('anchetaBadge');
  if (anchetaBadge) {
    anchetaBadge.addEventListener('click', e => {
      e.preventDefault();
      openCartDrawer();
    });
  }

  // WhatsApp links
  const waBase = 'https://wa.me/' + CONFIG.whatsapp;
  const navWA   = document.getElementById('navWA');
  const footWA  = document.getElementById('footerWA');
  if (navWA)  navWA.href  = waBase + '?text=' + encodeURIComponent('Hola! Me interesa su catálogo 🎁');
  if (footWA) footWA.href = waBase;

  // Nav scroll
  window.addEventListener('scroll', () =>
    document.getElementById('navbar')?.classList.toggle('scrolled', scrollY > 20));
  document.getElementById('hamburger')?.addEventListener('click', () =>
    document.getElementById('navLinks')?.classList.toggle('open'));
}