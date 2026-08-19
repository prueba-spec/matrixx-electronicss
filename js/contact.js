/* ==========================================================================
   MATRIXX ELECTRONICS — Formulario de contacto (contacto.html)
   DEMO frontend: valida y muestra confirmación en pantalla. Conéctalo a tu
   backend, servicio de email (ej. Formspree, EmailJS) o CRM en producción.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const confirmation = document.getElementById('contact-confirmation');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    confirmation.style.display = 'flex';
    form.reset();
    confirmation.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => { confirmation.style.display = 'none'; }, 6000);
  });
});
