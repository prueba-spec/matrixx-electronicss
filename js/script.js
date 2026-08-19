document.addEventListener('DOMContentLoaded', () => {

  /* ============ AÑO EN FOOTER ============ */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ============ CONTADOR DE CARRITO (todas las páginas) ============ */
  if (typeof MatrixxCart !== 'undefined') {
    MatrixxCart.updateBadge();
  }

  /* ============ DESTACADOS EN INICIO (index.html) ============ */
  const featuredGrid = document.getElementById('featured-grid');
  if (featuredGrid && typeof MATRIXX_PRODUCTS !== 'undefined') {
    const featuredIds = ['p1', 'p3', 'p7', 'p11'];
    featuredGrid.innerHTML = featuredIds.map((id) => {
      const p = matrixxFindProduct(id);
      if (!p) return '';
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
  }

  /* ============ CARRUSEL (solo en index.html) ============ */
  const carousel = document.getElementById('carousel');
  if (carousel) {
    const slides = Array.from(carousel.querySelectorAll('.slide'));
    const dotsWrap = document.querySelector('.carousel-dots');
    const prevBtn = document.querySelector('.carousel-arrow.prev');
    const nextBtn = document.querySelector('.carousel-arrow.next');
    let current = 0;
    let timer = null;
    const AUTOPLAY_MS = 5500;

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Ir al destacado ${i + 1}`);
      if (i === 0) dot.classList.add('is-active');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
    const dots = Array.from(dotsWrap.children);

    function goTo(index) {
      slides[current].classList.remove('is-active');
      dots[current].classList.remove('is-active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('is-active');
      dots[current].classList.add('is-active');
      resetAutoplay();
    }
    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }
    function resetAutoplay() {
      if (timer) clearInterval(timer);
      timer = setInterval(next, AUTOPLAY_MS);
    }

    nextBtn && nextBtn.addEventListener('click', next);
    prevBtn && prevBtn.addEventListener('click', prev);
    carousel.addEventListener('mouseenter', () => timer && clearInterval(timer));
    carousel.addEventListener('mouseleave', resetAutoplay);
    resetAutoplay();
  }

  /* ============ DROPDOWNS DE FILTROS (Hardware / Periféricos) ============ */
  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.contains('is-open');
      dropdowns.forEach((d) => d.classList.remove('is-open'));
      if (!isOpen) dropdown.classList.add('is-open');
    });
  });
  document.addEventListener('click', () => {
    dropdowns.forEach((d) => d.classList.remove('is-open'));
  });

  /* ============ MENÚ MÓVIL (hamburguesa) ============ */
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.getElementById('main-nav');
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  /* ============ BÚSQUEDA: redirige al catálogo con ?q= ============ */
  const searchForm = document.querySelector('.search-bar');
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = searchForm.querySelector('input').value.trim();
      const base = document.body.dataset.base || '';
      window.location.href = `${base}productos.html${query ? '?q=' + encodeURIComponent(query) : ''}`;
    });
  }

  /* ============ BOTONES "AGREGAR AL CARRITO" ============ */
  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-add-to-cart]');
    if (!btn || typeof MatrixxCart === 'undefined') return;
    const id = btn.dataset.addToCart;
    const qtyInput = document.getElementById('qty-input');
    const qty = (btn.dataset.useQtyInput && qtyInput) ? parseInt(qtyInput.value, 10) || 1 : 1;
    MatrixxCart.addToCart(id, qty);
    MatrixxCart.toast('Producto agregado al carrito');
  });

});
