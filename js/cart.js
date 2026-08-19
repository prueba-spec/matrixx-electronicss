/* ==========================================================================
   MATRIXX ELECTRONICS — Carrito de compras (demo con localStorage)
   En producción, reemplaza localStorage por llamadas a tu backend/API para
   persistir el carrito por usuario.
   ========================================================================== */

const MatrixxCart = (() => {
  const KEY = 'matrixx_cart';
  const SHIPPING_FLAT = 12.90;
  const FREE_SHIPPING_FROM = 200;

  function getCart(){
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(cart){
    localStorage.setItem(KEY, JSON.stringify(cart));
    updateBadge();
  }

  function addToCart(id, qty = 1){
    const cart = getCart();
    const existing = cart.find((item) => item.id === id);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ id, qty });
    }
    saveCart(cart);
  }

  function removeFromCart(id){
    saveCart(getCart().filter((item) => item.id !== id));
  }

  function setQty(id, qty){
    const cart = getCart();
    const item = cart.find((i) => i.id === id);
    if (!item) return;
    item.qty = Math.max(1, qty);
    saveCart(cart);
  }

  function clearCart(){
    saveCart([]);
  }

  function count(){
    return getCart().reduce((sum, item) => sum + item.qty, 0);
  }

  function lines(){
    return getCart()
      .map((item) => {
        const product = typeof matrixxFindProduct === 'function' ? matrixxFindProduct(item.id) : null;
        if (!product) return null;
        return { ...item, product, lineTotal: product.price * item.qty };
      })
      .filter(Boolean);
  }

  function subtotal(){
    return lines().reduce((sum, l) => sum + l.lineTotal, 0);
  }

  function shipping(){
    const sub = subtotal();
    if (sub === 0) return 0;
    return sub >= FREE_SHIPPING_FROM ? 0 : SHIPPING_FLAT;
  }

  function total(){
    return subtotal() + shipping();
  }

  function updateBadge(){
    const n = count();
    document.querySelectorAll('.cart-count').forEach((el) => { el.textContent = n; });
  }

  function toast(message){
    let holder = document.querySelector('.toast-holder');
    if (!holder) {
      holder = document.createElement('div');
      holder.className = 'toast-holder';
      document.body.appendChild(holder);
    }
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = message;
    holder.appendChild(el);
    requestAnimationFrame(() => el.classList.add('is-visible'));
    setTimeout(() => {
      el.classList.remove('is-visible');
      setTimeout(() => el.remove(), 300);
    }, 2600);
  }

  return {
    getCart, addToCart, removeFromCart, setQty, clearCart,
    count, lines, subtotal, shipping, total, updateBadge, toast,
    SHIPPING_FLAT, FREE_SHIPPING_FROM,
  };
})();
