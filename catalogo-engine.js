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

// ── Compra individual ────────────────────────────────────
function buySolo(id) {
  const prod = CATALOGO.find(p => p.id === id);
  if (!prod) return;
  const msg =
    `🛒 *Pedido individual — ${CONFIG.nombre_negocio}*\n\n` +
    `${prod.emoji} *${prod.name}*\n` +
    `Precio: $${prod.price.toLocaleString('es-CO')} / ${prod.unit}\n\n` +
    `¡Hola! Quisiera comprar este producto 😊`;
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

function fmt(n) { return '$' + n.toLocaleString('es-CO'); }

// ── Render de una tarjeta de producto ───────────────────
function renderCard(prod, imgBg) {
  const hasImg = prod.image && prod.image.trim() !== '';
  const imgHTML   = hasImg ? `<img src="${prod.image}" alt="${prod.name}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='block'">` : '';
  const fallDisp  = hasImg ? 'style="display:none"' : '';
  const bgStyle   = hasImg ? 'background:#f0f0f0' : `background:${imgBg}`;

  const badgeMap  = { popular:'⭐ Popular', nuevo:'✨ Nuevo', fresco:'🌿 Fresco' };
  const badgeHTML = prod.badge && badgeMap[prod.badge]
    ? `<span class="card-badge badge-${prod.badge}">${badgeMap[prod.badge]}</span>` : '';

  const div = document.createElement('div');
  div.className = 'product-card';
  div.dataset.cat = prod.category;
  div.dataset.id  = prod.id;

  div.innerHTML = `
    <div class="card-img-wrap" ${bgStyle ? 'style="' + bgStyle + '"' : ''}>
      ${imgHTML}
      <span class="card-emoji-fallback" ${fallDisp}>${prod.emoji}</span>
      ${badgeHTML}
    </div>
    <div class="card-body">
      <h3>${prod.name}</h3>
      <p>${prod.description}</p>
      <div class="card-footer">
        <div class="price">${fmt(prod.price)} <small>/ ${prod.unit}</small></div>
        <div class="card-actions">
          <button class="btn-add-ancheta" id="btn-ancheta-${prod.id}" onclick="addToCart('${prod.id}')">
            🎁 + Ancheta
          </button>
          <div class="qty-control" id="qty-${prod.id}">
            <button class="qty-btn" onclick="changeQty('${prod.id}',-1)">−</button>
            <span class="qty-num" id="qnum-${prod.id}">1</span>
            <button class="qty-btn" onclick="changeQty('${prod.id}',1)">+</button>
          </div>
          <button class="btn-buy-solo" onclick="buySolo('${prod.id}')">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Comprar solo
          </button>
        </div>
      </div>
    </div>`;
  return div;
}

// ── Inicializar página de catálogo ───────────────────────
function initCatalogPage({ seccion, categoryLabels, imgBg }) {
  const productos  = CATALOGO.filter(p => p.seccion === seccion && p.active);
  const grid       = document.getElementById('grid');
  const filterBar  = document.getElementById('filterBar');

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