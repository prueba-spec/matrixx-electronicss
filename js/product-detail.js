/* ==========================================================================
   MATRIXX ELECTRONICS — Ficha de producto (producto.html)
   Lee ?id= de la URL y renderiza los datos desde MATRIXX_PRODUCTS.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const wrap = document.getElementById('product-detail');
  if (!wrap) return;

  const params = new URLSearchParams(window.location.search);
  const product = matrixxFindProduct(params.get('id'));

  if (!product) {
    wrap.innerHTML = `
      <div class="empty-state">
        <h2>Producto no encontrado</h2>
        <p>El producto que buscas no existe o fue removido del catálogo.</p>
        <a href="productos.html" class="btn btn-primary">Volver al catálogo</a>
      </div>`;
    return;
  }

  document.title = `${product.name} | MATRIXX Electronics`;
  document.getElementById('breadcrumb-current').textContent = product.name;
  document.getElementById('breadcrumb-cat').textContent =
    MATRIXX_CATEGORIES.find((c) => c.id === product.category)?.label || product.category;
  document.getElementById('breadcrumb-cat').href = `productos.html?cat=${product.category}`;

  const oldPriceHTML = product.oldPrice
    ? `<span class="price-old">${matrixxFormatPrice(product.oldPrice)}</span>`
    : '';
  const badgeHTML = product.badge ? `<span class="badge">${product.badge}</span>` : '';

  wrap.innerHTML = `
    <div class="detail-gallery">
      <div class="detail-media ${product.media}">${badgeHTML}</div>
      <div class="detail-thumbs">
        <div class="thumb ${product.media} is-active"></div>
        <div class="thumb ${product.media}" style="filter:brightness(.8)"></div>
        <div class="thumb ${product.media}" style="filter:brightness(1.2)"></div>
      </div>
    </div>

    <div class="detail-info">
      <h1>${product.name}</h1>
      <p class="detail-short">${product.short}</p>
      <p class="price detail-price">
        <span class="price-now">${matrixxFormatPrice(product.price)}</span>${oldPriceHTML}
      </p>

      <div class="qty-row">
        <span class="qty-stepper">
          <button type="button" id="qty-minus" aria-label="Restar">−</button>
          <input type="number" id="qty-input" value="1" min="1" max="20">
          <button type="button" id="qty-plus" aria-label="Sumar">+</button>
        </span>
        <button class="btn btn-primary" data-add-to-cart="${product.id}" data-use-qty-input="true">
          Agregar al carrito
        </button>
      </div>

      <p class="detail-note">Envío a todo el Perú · Garantía incluida · Pago seguro</p>

      <h3>Descripción</h3>
      <p>${product.description}</p>

      <h3>Especificaciones</h3>
      <ul class="spec-list">
        ${product.specs.map((s) => `<li>${s}</li>`).join('')}
      </ul>
    </div>`;

  const qtyInput = document.getElementById('qty-input');
  document.getElementById('qty-minus').addEventListener('click', () => {
    qtyInput.value = Math.max(1, parseInt(qtyInput.value, 10) - 1);
  });
  document.getElementById('qty-plus').addEventListener('click', () => {
    qtyInput.value = Math.min(20, parseInt(qtyInput.value, 10) + 1);
  });

  /* Productos relacionados: misma categoría, excluyendo el actual */
  const related = MATRIXX_PRODUCTS
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  const relatedGrid = document.getElementById('related-grid');
  if (relatedGrid) {
    relatedGrid.innerHTML = related.map((p) => {
      const oldPrice = p.oldPrice ? `<span class="price-old">${matrixxFormatPrice(p.oldPrice)}</span>` : '';
      const badge = p.badge ? `<span class="badge">${p.badge}</span>` : '';
      return `
        <article class="product-card">
          <a href="producto.html?id=${p.id}" class="product-media ${p.media}">${badge}</a>
          <a href="producto.html?id=${p.id}"><h3>${p.name}</h3></a>
          <p class="price"><span class="price-now">${matrixxFormatPrice(p.price)}</span>${oldPrice}</p>
          <button class="btn btn-primary btn-sm" data-add-to-cart="${p.id}">Agregar</button>
        </article>`;
    }).join('');
    document.getElementById('related-section').style.display = related.length ? 'block' : 'none';
  }
});
