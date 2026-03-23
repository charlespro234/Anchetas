// =====================================================
//  catalogo-engine.js
//  Motor compartido para postres.html y comida-fria.html
// =====================================================

// ═══════════════════════════════════════════════════
//  CARRITO 1 — ANCHETA (localStorage: ancheta_cart)
// ═══════════════════════════════════════════════════
function getCart() {
  try { return JSON.parse(localStorage.getItem('ancheta_cart')) || []; }
  catch { return []; }
}
function saveCart(c) {
  localStorage.setItem('ancheta_cart', JSON.stringify(c));
  renderCartDrawer();
  syncFloatingBadge('ancheta');
}

function addToCart(id) {
  const prod = CATALOGO.find(p => p.id === id);
  if (!prod) return;
  let cart = getCart();
  const ex = cart.find(i => i.id === id);
  if (ex) ex.qty += 1;
  else cart.push({ id: prod.id, name: prod.name, emoji: prod.emoji, image: prod.image || '', price: prod.price, qty: 1, seccion: prod.seccion });
  saveCart(cart);
  syncCardAncheta(id);
  showToast('🎁 ' + prod.name + ' agregado a la ancheta');
  openCartDrawer();
}

function changeQty(id, delta) {
  let cart = getCart();
  const idx = cart.findIndex(i => i.id === id);
  if (idx === -1) return;
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) cart.splice(idx, 1);
  saveCart(cart);
  syncCardAncheta(id);
}

function syncCardAncheta(id) {
  const item = getCart().find(i => i.id === id);
  const qty  = item ? item.qty : 0;
  const btn  = document.getElementById('btn-ancheta-' + id);
  const ctrl = document.getElementById('qty-' + id);
  const num  = document.getElementById('qnum-' + id);
  if (!btn) return;
  if (qty > 0) {
    btn.style.display = 'none';
    ctrl?.classList.add('visible');
    if (num) num.textContent = qty;
  } else {
    btn.style.display = '';
    ctrl?.classList.remove('visible');
  }
}

// ═══════════════════════════════════════════════════
//  CARRITO 2 — PEDIDO RÁPIDO (localStorage: rapido_cart)
// ═══════════════════════════════════════════════════
function getRapido() {
  try { return JSON.parse(localStorage.getItem('rapido_cart')) || []; }
  catch { return []; }
}
function saveRapido(c) {
  localStorage.setItem('rapido_cart', JSON.stringify(c));
  renderRapidoDrawer();
  syncFloatingBadge('rapido');
}

function addToRapido(id) {
  const prod = CATALOGO.find(p => p.id === id);
  if (!prod) return;
  let cart = getRapido();
  const ex = cart.find(i => i.id === id);
  if (ex) ex.qty += 1;
  else cart.push({ id: prod.id, name: prod.name, emoji: prod.emoji, image: prod.image || '', price: prod.price, qty: 1, seccion: prod.seccion });
  saveRapido(cart);
  syncCardRapido(id);
  showToast('🛒 ' + prod.name + ' agregado al carrito');
  openRapidoDrawer();
}

function changeRapidoQty(id, delta) {
  let cart = getRapido();
  const idx = cart.findIndex(i => i.id === id);
  if (idx === -1) return;
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) cart.splice(idx, 1);
  saveRapido(cart);
  syncCardRapido(id);
}

function removeFromRapido(id) {
  saveRapido(getRapido().filter(i => i.id !== id));
  syncCardRapido(id);
}

function syncCardRapido(id) {
  const item = getRapido().find(i => i.id === id);
  const qty  = item ? item.qty : 0;
  const btn  = document.getElementById('btn-rapido-' + id);
  const ctrl = document.getElementById('rqty-' + id);
  const num  = document.getElementById('rqnum-' + id);
  if (!btn) return;
  if (qty > 0) {
    btn.style.display = 'none';
    ctrl?.classList.add('visible');
    if (num) num.textContent = qty;
  } else {
    btn.style.display = '';
    ctrl?.classList.remove('visible');
  }
}

// ═══════════════════════════════════════════════════
//  BADGES FLOTANTES
// ═══════════════════════════════════════════════════
function syncFloatingBadge(which) {
  if (which === 'ancheta') {
    const total = getCart().reduce((s, i) => s + i.qty, 0);
    const badge = document.getElementById('anchetaBadge');
    const count = document.getElementById('badgeCount');
    const dbadge = document.getElementById('drawerBadge');
    if (badge) badge.style.display = total > 0 ? 'flex' : 'none';
    if (count) count.textContent = total;
    if (dbadge) dbadge.textContent = total;
  }
  if (which === 'rapido') {
    const total = getRapido().reduce((s, i) => s + i.qty, 0);
    const badge = document.getElementById('rapidoBadge');
    const count = document.getElementById('rapidoBadgeCount');
    const dbadge = document.getElementById('rapidoDrawerBadge');
    if (badge) badge.style.display = total > 0 ? 'flex' : 'none';
    if (count) count.textContent = total;
    if (dbadge) dbadge.textContent = total;
  }
}

// ═══════════════════════════════════════════════════
//  DRAWER — ANCHETA
// ═══════════════════════════════════════════════════
function openCartDrawer()  {
  closeRapidoDrawer();
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
  syncCardAncheta(id);
}
function removeFromCart(id) {
  saveCart(getCart().filter(i => i.id !== id));
  syncCardAncheta(id);
}

function renderCartDrawer() {
  const drawerEl = document.getElementById('cartDrawer');
  if (!drawerEl) return;
  const cart     = getCart();
  const subtotal = cart.reduce((s, i) => s + i.qty * i.price, 0);
  const empaque  = CONFIG.empaque;
  const grand    = subtotal + empaque;
  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  const dbadge   = document.getElementById('drawerBadge');
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
        '<div class="di-info"><div class="di-name">' + item.name + '</div>' +
        '<div class="di-price">' + fmt(item.price) + ' <small>c/u</small> · <strong>' + fmt(item.price * item.qty) + '</strong></div></div>' +
        '<div class="di-controls">' +
        '<button class="di-btn" onclick="changeDrawerQty(\'' + item.id + '\',-1)">−</button>' +
        '<span class="di-qty">' + item.qty + '</span>' +
        '<button class="di-btn" onclick="changeDrawerQty(\'' + item.id + '\',1)">+</button>' +
        '<button class="di-remove" onclick="removeFromCart(\'' + item.id + '\')" title="Quitar">✕</button></div>';
      itemsEl.appendChild(div);
    });
  }
  const subEl = document.getElementById('drawerSubtotal');
  const empEl = document.getElementById('drawerEmpaque');
  const grandEl = document.getElementById('drawerGrand');
  if (subEl)   subEl.textContent   = fmt(subtotal);
  if (empEl)   empEl.textContent   = fmt(empaque);
  if (grandEl) grandEl.textContent = fmt(grand);
  const btnOrder = document.getElementById('drawerBtnOrder');
  if (btnOrder) {
    let text = '🎁 *Pedido de Ancheta — ' + CONFIG.nombre_negocio + '*\n\n*Productos:*\n';
    cart.forEach(i => { text += '• ' + i.emoji + ' ' + i.name + ' x' + i.qty + ' = ' + fmt(i.price * i.qty) + '\n'; });
    text += '\n📦 Empaque & Decoración: ' + fmt(empaque) + '\n💰 *Total estimado: ' + fmt(grand) + '*\n\n¡Hola! Quisiera hacer este pedido 😊';
    btnOrder.href = 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(text);
  }
}

// ═══════════════════════════════════════════════════
//  DRAWER — PEDIDO RÁPIDO
// ═══════════════════════════════════════════════════
function openRapidoDrawer()  {
  closeCartDrawer();
  document.getElementById('rapidoDrawer')?.classList.add('open');
  document.getElementById('rapidoOverlay')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeRapidoDrawer() {
  document.getElementById('rapidoDrawer')?.classList.remove('open');
  document.getElementById('rapidoOverlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

function renderRapidoDrawer() {
  const drawerEl = document.getElementById('rapidoDrawer');
  if (!drawerEl) return;
  const cart     = getRapido();
  const subtotal = cart.reduce((s, i) => s + i.qty * i.price, 0);
  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  const dbadge   = document.getElementById('rapidoDrawerBadge');
  if (dbadge) dbadge.textContent = totalQty;
  const itemsEl = document.getElementById('rapidoItems');
  const emptyEl = document.getElementById('rapidoEmpty');
  const footEl  = document.getElementById('rapidoFooter');
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
        '<div class="di-info"><div class="di-name">' + item.name + '</div>' +
        '<div class="di-price">' + fmt(item.price) + ' <small>c/u</small> · <strong>' + fmt(item.price * item.qty) + '</strong></div></div>' +
        '<div class="di-controls">' +
        '<button class="di-btn" onclick="changeRapidoQty(\'' + item.id + '\',-1)">−</button>' +
        '<span class="di-qty">' + item.qty + '</span>' +
        '<button class="di-btn" onclick="changeRapidoQty(\'' + item.id + '\',1)">+</button>' +
        '<button class="di-remove" onclick="removeFromRapido(\'' + item.id + '\')" title="Quitar">✕</button></div>';
      itemsEl.appendChild(div);
    });
  }
  const grandEl = document.getElementById('rapidoGrand');
  if (grandEl) grandEl.textContent = fmt(subtotal);
  const btnOrder = document.getElementById('rapidoBtnOrder');
  if (btnOrder) {
    let text = '🛒 *Pedido directo — ' + CONFIG.nombre_negocio + '*\n\n*Productos:*\n';
    cart.forEach(i => { text += '• ' + i.emoji + ' ' + i.name + ' x' + i.qty + ' = ' + fmt(i.price * i.qty) + '\n'; });
    text += '\n💰 *Total: ' + fmt(subtotal) + '*\n\n¡Hola! Quisiera hacer este pedido 😊';
    btnOrder.href = 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(text);
  }
}

// ═══════════════════════════════════════════════════
//  INYECTAR DRAWERS EN EL DOM
// ═══════════════════════════════════════════════════
function injectDrawers(accentColor) {
  const aColor = accentColor || 'var(--rose)';
  const rColor = '#2C6E49'; // verde oscuro para el carrito rápido

  // ── Overlay ancheta ──
  const ov1 = document.createElement('div');
  ov1.id = 'cartOverlay'; ov1.onclick = closeCartDrawer;
  document.body.appendChild(ov1);

  // ── Drawer ancheta ──
  const d1 = document.createElement('div');
  d1.id = 'cartDrawer';
  d1.innerHTML =
    '<div class="drawer-header">' +
      '<div class="drawer-title">🎁 Mi Ancheta <span class="drawer-badge" id="drawerBadge">0</span></div>' +
      '<button class="drawer-close" onclick="closeCartDrawer()">✕</button>' +
    '</div>' +
    '<div class="drawer-body">' +
      '<div class="drawer-empty" id="drawerEmpty"><div class="de-emoji">🎁</div><p>Tu ancheta está vacía</p><small>Agrega productos con el botón "🎁 + Ancheta"</small></div>' +
      '<div class="drawer-items" id="drawerItems"></div>' +
    '</div>' +
    '<div class="drawer-footer" id="drawerFooter" style="display:none">' +
      '<div class="drawer-totals">' +
        '<div class="drawer-row"><span>Subtotal</span><span id="drawerSubtotal">$0</span></div>' +
        '<div class="drawer-row"><span>📦 Empaque & deco</span><span id="drawerEmpaque">$0</span></div>' +
        '<div class="drawer-divider"></div>' +
        '<div class="drawer-row grand"><span>Total estimado</span><span id="drawerGrand">$0</span></div>' +
      '</div>' +
      '<a href="crea-tu-ancheta.html" class="drawer-btn-secondary">✨ Personalizar ancheta</a>' +
      '<a href="#" id="drawerBtnOrder" target="_blank" rel="noopener" class="drawer-btn-primary">' +
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>' +
        'Pedir por WhatsApp' +
      '</a>' +
    '</div>';
  document.body.appendChild(d1);

  // ── Overlay rápido ──
  const ov2 = document.createElement('div');
  ov2.id = 'rapidoOverlay'; ov2.onclick = closeRapidoDrawer;
  document.body.appendChild(ov2);

  // ── Drawer rápido ──
  const d2 = document.createElement('div');
  d2.id = 'rapidoDrawer';
  d2.innerHTML =
    '<div class="drawer-header rapido-header">' +
      '<div class="drawer-title">🛒 Pedido Rápido <span class="drawer-badge rapido-badge" id="rapidoDrawerBadge">0</span></div>' +
      '<button class="drawer-close" onclick="closeRapidoDrawer()">✕</button>' +
    '</div>' +
    '<div class="rapido-note">Sin empaque decorativo · Pedido directo</div>' +
    '<div class="drawer-body">' +
      '<div class="drawer-empty" id="rapidoEmpty"><div class="de-emoji">🛒</div><p>Tu carrito está vacío</p><small>Agrega productos con el botón "🛒 + Carrito"</small></div>' +
      '<div class="drawer-items" id="rapidoItems"></div>' +
    '</div>' +
    '<div class="drawer-footer" id="rapidoFooter" style="display:none">' +
      '<div class="drawer-totals">' +
        '<div class="drawer-divider"></div>' +
        '<div class="drawer-row grand rapido-grand"><span>Total</span><span id="rapidoGrand">$0</span></div>' +
      '</div>' +
      '<a href="#" id="rapidoBtnOrder" target="_blank" rel="noopener" class="drawer-btn-primary rapido-btn-primary">' +
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>' +
        'Pedir por WhatsApp' +
      '</a>' +
    '</div>';
  document.body.appendChild(d2);

  // ── Estilos ──
  const style = document.createElement('style');
  style.textContent = `
    /* ── Overlay shared ── */
    #cartOverlay, #rapidoOverlay {
      display:none; position:fixed; inset:0; background:rgba(43,26,16,0.42);
      backdrop-filter:blur(3px); z-index:1100; opacity:0; transition:opacity 0.3s;
    }
    #cartOverlay.open, #rapidoOverlay.open { display:block; opacity:1; }

    /* ── Drawer base ── */
    #cartDrawer, #rapidoDrawer {
      position:fixed; top:0; right:0; bottom:0; width:min(400px,100vw);
      background:var(--warm-white); z-index:1200; display:flex; flex-direction:column;
      box-shadow:-8px 0 40px rgba(43,26,16,0.18);
      transform:translateX(102%); transition:transform 0.36s cubic-bezier(.22,.68,0,1.2);
    }
    #cartDrawer.open, #rapidoDrawer.open { transform:translateX(0); }

    /* ── Header ── */
    .drawer-header {
      display:flex; align-items:center; justify-content:space-between;
      padding:20px 22px 16px; border-bottom:1px solid var(--light-gold);
      background:var(--cream); flex-shrink:0;
    }
    .rapido-header { background:#f0faf4; border-bottom-color:#b2dfcc; }
    .drawer-title {
      display:flex; align-items:center; gap:10px;
      font-family:'Playfair Display',serif; font-size:1.1rem; color:var(--chocolate);
    }
    .drawer-badge {
      background:` + aColor + `; color:#fff; font-family:'Nunito',sans-serif;
      font-size:0.67rem; font-weight:800; padding:2px 8px; border-radius:50px;
    }
    .rapido-badge { background:` + rColor + `; }
    .drawer-close {
      width:30px; height:30px; border-radius:50%; border:1.5px solid var(--light-gold);
      background:none; color:var(--text-light); font-size:0.8rem; cursor:pointer;
      display:flex; align-items:center; justify-content:center; transition:all 0.2s;
      font-family:'Nunito',sans-serif;
    }
    .drawer-close:hover { background:#fee2e2; color:#dc2626; border-color:#fca5a5; }

    /* ── Rapido note ── */
    .rapido-note {
      background:#f0faf4; border-bottom:1px solid #b2dfcc;
      padding:7px 22px; font-size:0.74rem; color:#2C6E49;
      font-weight:700; font-family:'Nunito',sans-serif;
      letter-spacing:0.03em; flex-shrink:0;
    }

    /* ── Body ── */
    .drawer-body { flex:1; overflow-y:auto; padding:16px 20px; }
    .drawer-body::-webkit-scrollbar { width:4px; }
    .drawer-body::-webkit-scrollbar-thumb { background:var(--light-gold); border-radius:10px; }

    .drawer-empty { text-align:center; padding:40px 0 20px; }
    .de-emoji { font-size:2.8rem; margin-bottom:10px; }
    .drawer-empty p { font-family:'Playfair Display',serif; font-size:0.95rem; color:var(--chocolate); margin-bottom:4px; }
    .drawer-empty small { color:var(--text-light); font-size:0.76rem; }

    .drawer-items { display:flex; flex-direction:column; gap:9px; }
    .drawer-item {
      display:flex; align-items:center; gap:10px;
      background:var(--cream); border-radius:13px; padding:10px 11px;
      border:1px solid rgba(200,155,90,0.15); animation:fadeUp 0.22s ease both;
    }
    .di-thumb {
      width:40px; height:40px; border-radius:9px; overflow:hidden; flex-shrink:0;
      display:flex; align-items:center; justify-content:center;
      background:var(--light-gold); font-size:1.4rem;
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
    #cartDrawer .di-btn:hover   { background:` + aColor + `; color:#fff; border-color:` + aColor + `; }
    #rapidoDrawer .di-btn:hover { background:` + rColor + `; color:#fff; border-color:` + rColor + `; }
    .di-qty { font-size:0.83rem; font-weight:800; min-width:18px; text-align:center; color:var(--chocolate); }
    .di-remove {
      width:20px; height:20px; border-radius:50%; border:none;
      background:none; color:var(--text-light); font-size:0.65rem; font-weight:800;
      cursor:pointer; display:flex; align-items:center; justify-content:center;
      transition:all 0.18s; margin-left:2px; font-family:'Nunito',sans-serif;
    }
    .di-remove:hover { background:#fee2e2; color:#dc2626; }

    /* ── Footer ── */
    .drawer-footer { padding:16px 20px 22px; border-top:1px solid var(--light-gold); background:var(--cream); flex-shrink:0; }
    .drawer-totals { display:flex; flex-direction:column; gap:6px; margin-bottom:14px; }
    .drawer-row { display:flex; justify-content:space-between; font-size:0.82rem; color:var(--text-light); font-family:'Nunito',sans-serif; }
    .drawer-row.grand { font-family:'Playfair Display',serif; font-size:1rem; color:var(--chocolate); font-weight:700; margin-top:2px; }
    .drawer-row.grand span:last-child { color:` + aColor + `; }
    .rapido-grand span:last-child { color:` + rColor + ` !important; }
    .drawer-divider { height:1px; background:var(--light-gold); margin:4px 0; }

    .drawer-btn-secondary {
      display:block; text-align:center; padding:10px; border-radius:12px;
      background:var(--warm-white); border:2px solid ` + aColor + `; color:` + aColor + `;
      font-family:'Nunito',sans-serif; font-weight:800; font-size:0.84rem;
      text-decoration:none; margin-bottom:8px; transition:all 0.2s;
    }
    .drawer-btn-secondary:hover { background:` + aColor + `; color:#fff; }

    .drawer-btn-primary {
      display:flex; align-items:center; justify-content:center; gap:7px;
      padding:12px; border-radius:12px; background:var(--chocolate);
      color:#fff; font-family:'Nunito',sans-serif; font-weight:800; font-size:0.88rem;
      text-decoration:none; transition:all 0.2s;
    }
    .drawer-btn-primary:hover { background:var(--teal); transform:translateY(-1px); }
    .rapido-btn-primary { background:` + rColor + `; }
    .rapido-btn-primary:hover { background:#1a4a2e !important; }

    /* ── Badge flotante carrito rápido ── */
    #rapidoBadge {
      position:fixed; bottom:80px; right:26px; z-index:900;
      background:` + rColor + `; color:#fff;
      padding:12px 20px; border-radius:50px;
      font-weight:800; font-size:0.88rem; font-family:'Nunito',sans-serif;
      box-shadow:0 8px 28px rgba(44,110,73,0.45);
      display:none; align-items:center; gap:9px;
      cursor:pointer; transition:background 0.2s, transform 0.2s;
      animation:badgePop 0.4s cubic-bezier(.34,1.56,.64,1) both;
      border:none;
    }
    #rapidoBadge:hover { background:#1a4a2e; transform:translateY(-3px) scale(1.03); }
    #rapidoBadge .count {
      background:#fff; color:` + rColor + `; font-size:0.74rem; font-weight:800;
      width:21px; height:21px; border-radius:50%; display:flex; align-items:center; justify-content:center;
    }

    /* ── Botón carrito en tarjetas ── */
    .btn-add-rapido {
      background:var(--cream); border:2px solid #81c784; color:#2C6E49;
      font-family:'Nunito',sans-serif; font-weight:800; font-size:0.78rem;
      padding:7px 14px; border-radius:50px; cursor:pointer;
      transition:all 0.2s; white-space:nowrap;
    }
    .btn-add-rapido:hover { background:` + rColor + `; color:#fff; border-color:` + rColor + `; transform:scale(1.04); }

    .rqty-control { display:none; align-items:center; gap:5px; }
    .rqty-control.visible { display:flex; }
    .rqty-btn {
      width:27px; height:27px; border-radius:50%; border:2px solid #81c784;
      background:none; color:#2C6E49; font-size:1rem; font-weight:800;
      cursor:pointer; transition:all 0.2s; display:flex; align-items:center; justify-content:center;
      font-family:'Nunito',sans-serif;
    }
    .rqty-btn:hover { background:` + rColor + `; color:#fff; border-color:` + rColor + `; }
    .rqty-num { font-weight:800; font-size:0.93rem; min-width:20px; text-align:center; color:var(--chocolate); }

    @media(max-width:480px){ #cartDrawer, #rapidoDrawer { width:100vw; } }
    @media(max-width:768px){ #rapidoBadge { bottom:72px; right:16px; padding:10px 16px; font-size:0.82rem; } }
  `;
  document.head.appendChild(style);

  // ── Badge flotante rápido ──
  const rbadge = document.createElement('button');
  rbadge.id = 'rapidoBadge';
  rbadge.innerHTML = '🛒 Mi Pedido <span class="count" id="rapidoBadgeCount">0</span>';
  rbadge.onclick = openRapidoDrawer;
  document.body.appendChild(rbadge);
}

// ═══════════════════════════════════════════════════
//  COMPRA INDIVIDUAL (WhatsApp directo)
// ═══════════════════════════════════════════════════
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

// ── Toast ──────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2600);
}

function fmt(n) { return '$' + n.toLocaleString('es-CO'); }

// ═══════════════════════════════════════════════════
//  RENDER TARJETA
// ═══════════════════════════════════════════════════
function renderCard(prod, imgBg) {
  const hasImg  = prod.image && prod.image.trim() !== '';
  const imgHTML = hasImg ? '<img src="' + prod.image + '" alt="' + prod.name + '" loading="lazy" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\'">' : '';
  const fallDisp = hasImg ? 'style="display:none"' : '';
  const bgStyle  = 'background:' + (hasImg ? '#f0f0f0' : imgBg);
  const badgeMap = { popular:'⭐ Popular', nuevo:'✨ Nuevo', fresco:'🌿 Fresco' };
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
          // Ancheta
          '<button class="btn-add-ancheta" id="btn-ancheta-' + prod.id + '" onclick="addToCart(\'' + prod.id + '\')">🎁 + Ancheta</button>' +
          '<div class="qty-control" id="qty-' + prod.id + '">' +
            '<button class="qty-btn" onclick="changeQty(\'' + prod.id + '\',-1)">−</button>' +
            '<span class="qty-num" id="qnum-' + prod.id + '">1</span>' +
            '<button class="qty-btn" onclick="changeQty(\'' + prod.id + '\',1)">+</button>' +
          '</div>' +
          // Carrito rápido
          '<button class="btn-add-rapido" id="btn-rapido-' + prod.id + '" onclick="addToRapido(\'' + prod.id + '\')">🛒 + Carrito</button>' +
          '<div class="rqty-control" id="rqty-' + prod.id + '">' +
            '<button class="rqty-btn" onclick="changeRapidoQty(\'' + prod.id + '\',-1)">−</button>' +
            '<span class="rqty-num" id="rqnum-' + prod.id + '">1</span>' +
            '<button class="rqty-btn" onclick="changeRapidoQty(\'' + prod.id + '\',1)">+</button>' +
          '</div>' +
          // Comprar solo
          '<button class="btn-buy-solo" onclick="buySolo(\'' + prod.id + '\')">' +
            '<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>' +
            'Comprar solo' +
          '</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  return div;
}

// ═══════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════
function initCatalogPage({ seccion, categoryLabels, imgBg, accentColor }) {
  const productos = CATALOGO.filter(p => p.seccion === seccion && p.active);
  const grid      = document.getElementById('grid');
  const filterBar = document.getElementById('filterBar');

  injectDrawers(accentColor);

  // Filtros
  const btnAll = document.createElement('button');
  btnAll.className = 'filter-btn active'; btnAll.dataset.filter = 'all'; btnAll.textContent = '✨ Todos';
  filterBar.appendChild(btnAll);
  const cats = [...new Set(productos.map(p => p.category))];
  cats.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn'; btn.dataset.filter = cat;
    btn.textContent = categoryLabels[cat] || cat;
    filterBar.appendChild(btn);
  });

  // Tarjetas
  productos.forEach((prod, i) => {
    const card = renderCard(prod, imgBg);
    card.style.animationDelay = (i * 0.055) + 's';
    grid.appendChild(card);
  });

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

  // Sync estado inicial de ambos carritos
  getCart().forEach(item => syncCardAncheta(item.id));
  getRapido().forEach(item => syncCardRapido(item.id));
  syncFloatingBadge('ancheta');
  syncFloatingBadge('rapido');
  renderCartDrawer();
  renderRapidoDrawer();

  // Badge ancheta abre drawer
  const anchetaBadge = document.getElementById('anchetaBadge');
  if (anchetaBadge) {
    anchetaBadge.addEventListener('click', e => { e.preventDefault(); openCartDrawer(); });
  }

  // WhatsApp links
  const waBase = 'https://wa.me/' + CONFIG.whatsapp;
  const navWA  = document.getElementById('navWA');
  const footWA = document.getElementById('footerWA');
  if (navWA)  navWA.href  = waBase + '?text=' + encodeURIComponent('Hola! Me interesa su catálogo 🎁');
  if (footWA) footWA.href = waBase;

  window.addEventListener('scroll', () =>
    document.getElementById('navbar')?.classList.toggle('scrolled', scrollY > 20));
  document.getElementById('hamburger')?.addEventListener('click', () =>
    document.getElementById('navLinks')?.classList.toggle('open'));
}