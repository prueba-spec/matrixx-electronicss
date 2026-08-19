/* ==========================================================================
   MATRIXX ELECTRONICS — Carrito (carrito.html)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const body = document.getElementById('cart-body');
  const emptyState = document.getElementById('cart-empty');
  const cartTable = document.getElementById('cart-table');
  const summary = document.getElementById('cart-summary');
  if (!body) return;

  function render(){
    const lines = MatrixxCart.lines();

    if (!lines.length) {
      cartTable.style.display = 'none';
      summary.style.display = 'none';
      emptyState.style.display = 'block';
      return;
    }
    cartTable.style.display = 'table';
    summary.style.display = 'block';
    emptyState.style.display = 'none';

    body.innerHTML = lines.map((l) => `
      <tr data-id="${l.id}">
        <td class="cell-product">
          <a href="producto.html?id=${l.id}" class="mini-media ${l.product.media}"></a>
          <div>
            <a href="producto.html?id=${l.id}"><strong>${l.product.name}</strong></a>
            <p class="cell-unit">${matrixxFormatPrice(l.product.price)} c/u</p>
          </div>
        </td>
        <td>
          <span class="qty-stepper qty-stepper-sm">
            <button type="button" class="qty-minus" aria-label="Restar">−</button>
            <input type="number" class="qty-input" value="${l.qty}" min="1" max="20">
            <button type="button" class="qty-plus" aria-label="Sumar">+</button>
          </span>
        </td>
        <td class="cell-total">${matrixxFormatPrice(l.lineTotal)}</td>
        <td>
          <button type="button" class="remove-btn" aria-label="Quitar producto">
            <svg viewBox="0 0 24 24" width="18" height="18"><path d="M4 6h16M9 6V4h6v2m-8 0 1 14h8l1-14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </td>
      </tr>`).join('');

    document.getElementById('sum-subtotal').textContent = matrixxFormatPrice(MatrixxCart.subtotal());
    const ship = MatrixxCart.shipping();
    document.getElementById('sum-shipping').textContent = ship === 0 ? 'Gratis' : matrixxFormatPrice(ship);
    document.getElementById('sum-total').textContent = matrixxFormatPrice(MatrixxCart.total());

    const remaining = MatrixxCart.FREE_SHIPPING_FROM - MatrixxCart.subtotal();
    const shipNote = document.getElementById('ship-note');
    if (remaining > 0) {
      shipNote.style.display = 'block';
      shipNote.textContent = `Te faltan ${matrixxFormatPrice(remaining)} para envío gratis`;
    } else {
      shipNote.style.display = 'none';
    }
  }

  body.addEventListener('click', (e) => {
    const row = e.target.closest('tr[data-id]');
    if (!row) return;
    const id = row.dataset.id;

    if (e.target.closest('.qty-minus')) {
      const input = row.querySelector('.qty-input');
      MatrixxCart.setQty(id, Math.max(1, parseInt(input.value, 10) - 1));
      render();
    }
    if (e.target.closest('.qty-plus')) {
      const input = row.querySelector('.qty-input');
      MatrixxCart.setQty(id, parseInt(input.value, 10) + 1);
      render();
    }
    if (e.target.closest('.remove-btn')) {
      MatrixxCart.removeFromCart(id);
      MatrixxCart.toast('Producto eliminado del carrito');
      render();
    }
  });

  body.addEventListener('change', (e) => {
    if (!e.target.classList.contains('qty-input')) return;
    const row = e.target.closest('tr[data-id]');
    MatrixxCart.setQty(row.dataset.id, parseInt(e.target.value, 10) || 1);
    render();
  });

  const clearBtn = document.getElementById('clear-cart');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      MatrixxCart.clearCart();
      MatrixxCart.toast('Carrito vaciado');
      render();
    });
  }

  render();
});
