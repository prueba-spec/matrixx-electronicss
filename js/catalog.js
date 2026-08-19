/* ==========================================================================
   MATRIXX ELECTRONICS — Catálogo (productos.html)
   Filtra, busca y ordena MATRIXX_PRODUCTS completamente en el navegador.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('catalog-grid');
  const catList = document.getElementById('category-filters');
  const sortSelect = document.getElementById('sort-select');
  const resultCount = document.getElementById('result-count');
  const emptyState = document.getElementById('empty-state');
  const activeSearchLabel = document.getElementById('active-search-label');
  const clearSearchBtn = document.getElementById('clear-search');
  const priceMin = document.getElementById('price-min');
  const priceMax = document.getElementById('price-max');
  if (!grid) return;

  const params = new URLSearchParams(window.location.search);
  let state = {
    categories: params.get('cat') ? [params.get('cat')] : [],
    q: params.get('q') || '',
    sort: 'relevancia',
  };

  /* Construir checkboxes de categoría dinámicamente */
  MATRIXX_CATEGORIES.forEach((cat) => {
    const count = MATRIXX_PRODUCTS.filter((p) => p.category === cat.id).length;
    const li = document.createElement('li');
    li.innerHTML = `
      <label class="filter-check">
        <input type="checkbox" value="${cat.id}" ${state.categories.includes(cat.id) ? 'checked' : ''}>
        <span>${cat.label}</span>
        <em>(${count})</em>
      </label>`;
    catList.appendChild(li);
  });

  function productCardHTML(p){
    const oldPrice = p.oldPrice ? `<span class="price-old">${matrixxFormatPrice(p.oldPrice)}</span>` : '';
    const badge = p.badge ? `<span class="badge">${p.badge}</span>` : '';
    return `
      <article class="product-card">
        <a href="producto.html?id=${p.id}" class="product-media ${p.media}">${badge}</a>
        <a href="producto.html?id=${p.id}"><h3>${p.name}</h3></a>
        <p class="price"><span class="price-now">${matrixxFormatPrice(p.price)}</span>${oldPrice}</p>
        <button class="btn btn-primary btn-sm" data-add-to-cart="${p.id}">Agregar</button>
      </article>`;
  }

  function applyFilters(){
    let list = MATRIXX_PRODUCTS.slice();

    if (state.categories.length) {
      list = list.filter((p) => state.categories.includes(p.category));
    }
    if (state.q) {
      const q = state.q.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    const min = parseFloat(priceMin.value);
    const max = parseFloat(priceMax.value);
    if (!isNaN(min)) list = list.filter((p) => p.price >= min);
    if (!isNaN(max)) list = list.filter((p) => p.price <= max);

    switch (state.sort) {
      case 'precio-asc': list.sort((a, b) => a.price - b.price); break;
      case 'precio-desc': list.sort((a, b) => b.price - a.price); break;
      case 'nombre': list.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: break; // relevancia = orden original
    }
    return list;
  }

  function render(){
    const list = applyFilters();
    grid.innerHTML = list.map(productCardHTML).join('');
    resultCount.textContent = `${list.length} producto${list.length === 1 ? '' : 's'}`;
    emptyState.style.display = list.length ? 'none' : 'block';

    if (state.q) {
      activeSearchLabel.style.display = 'inline-flex';
      activeSearchLabel.querySelector('span').textContent = `Resultados para "${state.q}"`;
    } else {
      activeSearchLabel.style.display = 'none';
    }
  }

  catList.addEventListener('change', (e) => {
    if (e.target.type !== 'checkbox') return;
    const checked = Array.from(catList.querySelectorAll('input:checked')).map((i) => i.value);
    state.categories = checked;
    render();
  });

  sortSelect.addEventListener('change', () => {
    state.sort = sortSelect.value;
    render();
  });

  [priceMin, priceMax].forEach((input) => input.addEventListener('input', render));

  clearSearchBtn.addEventListener('click', () => {
    state.q = '';
    render();
  });

  render();
});
