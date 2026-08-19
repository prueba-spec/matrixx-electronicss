/* ==========================================================================
   MATRIXX ELECTRONICS — Checkout (checkout.html)
   DEMO frontend: no procesa pagos reales. Conecta este formulario a tu
   backend y pasarela de pago (Culqi, Niubiz, Mercado Pago, etc.) en producción.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const summaryBody = document.getElementById('checkout-summary-body');
  const form = document.getElementById('checkout-form');
  const confirmation = document.getElementById('checkout-confirmation');
  const formSection = document.getElementById('checkout-form-section');
  if (!form) return;

  function renderSummary(){
    const lines = MatrixxCart.lines();
    if (!lines.length) {
      window.location.href = 'productos.html';
      return;
    }
    summaryBody.innerHTML = lines.map((l) => `
      <li>
        <span class="summary-line-name">${l.qty} × ${l.product.name}</span>
        <span>${matrixxFormatPrice(l.lineTotal)}</span>
      </li>`).join('');
    document.getElementById('checkout-subtotal').textContent = matrixxFormatPrice(MatrixxCart.subtotal());
    const ship = MatrixxCart.shipping();
    document.getElementById('checkout-shipping').textContent = ship === 0 ? 'Gratis' : matrixxFormatPrice(ship);
    document.getElementById('checkout-total').textContent = matrixxFormatPrice(MatrixxCart.total());
  }

  renderSummary();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const orderNumber = 'MX-' + Math.floor(100000 + Math.random() * 900000);
    document.getElementById('order-number').textContent = orderNumber;
    document.getElementById('order-name').textContent = form.querySelector('#full-name').value;

    formSection.style.display = 'none';
    confirmation.style.display = 'block';
    MatrixxCart.clearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
