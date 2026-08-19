/* ==========================================================================
   MATRIXX ELECTRONICS — Catálogo de productos (demo)
   Fuente única de datos que usan: index.html, productos.html, producto.html,
   carrito.html y checkout.html. En producción, reemplaza este arreglo por
   una llamada a tu API / base de datos real.
   ========================================================================== */

const MATRIXX_CATEGORIES = [
  { id: 'mouse',     label: 'Mouse' },
  { id: 'teclados',  label: 'Teclados' },
  { id: 'mandos',    label: 'Mandos' },
  { id: 'audifonos', label: 'Audífonos' },
  { id: 'parlantes', label: 'Parlantes' },
  { id: 'coolers',   label: 'Coolers' },
];

const MATRIXX_PRODUCTS = [
  {
    id: 'p1', name: 'Mouse gamer óptico RGB', category: 'mouse',
    price: 79.90, oldPrice: 99.90, badge: '-20%', media: 'grad-1',
    short: 'Sensor óptico de alta precisión con iluminación RGB configurable.',
    description: 'Mouse gamer con sensor óptico de alta precisión, hasta 7 botones programables e iluminación RGB de 16.8 millones de colores. Diseño ergonómico pensado para sesiones largas de juego.',
    specs: ['Sensor óptico de hasta 7200 DPI', '7 botones programables', 'Iluminación RGB 16.8M de colores', 'Cable trenzado de 1.8 m', 'Compatible con Windows y macOS'],
  },
  {
    id: 'p2', name: 'Mouse inalámbrico silencioso', category: 'mouse',
    price: 69.90, oldPrice: null, badge: null, media: 'grad-2',
    short: 'Clic silencioso y batería de larga duración para el día a día.',
    description: 'Mouse inalámbrico con clics silenciosos, conexión estable de 2.4 GHz y hasta 12 meses de autonomía con una sola pila AA. Ideal para oficina o estudio.',
    specs: ['Conexión inalámbrica 2.4 GHz', 'Clic silencioso', 'Hasta 12 meses de batería', 'Sensor óptico de 1600 DPI', 'Diseño ambidiestro'],
  },
  {
    id: 'p3', name: 'Teclado mecánico TKL', category: 'teclados',
    price: 189.90, oldPrice: null, badge: 'Nuevo', media: 'grad-2',
    short: 'Switches intercambiables, RGB por tecla y estructura de aluminio.',
    description: 'Teclado mecánico formato TKL con switches intercambiables en caliente, retroiluminación RGB individual por tecla y placa superior de aluminio para mayor durabilidad.',
    specs: ['Switches mecánicos hot-swap', 'RGB por tecla', 'Estructura superior de aluminio', 'Formato TKL (sin numpad)', 'Cable USB-C desmontable'],
  },
  {
    id: 'p4', name: 'Teclado membrana retroiluminado', category: 'teclados',
    price: 89.90, oldPrice: null, badge: null, media: 'grad-3',
    short: 'Retroiluminación de un color y teclas de acceso rápido multimedia.',
    description: 'Teclado de membrana con retroiluminación, resistente a salpicaduras y teclas multimedia de acceso rápido. Una opción silenciosa y económica para trabajo o juego casual.',
    specs: ['Retroiluminación LED', 'Resistente a salpicaduras', 'Teclas multimedia', 'Conexión USB', 'Patas ajustables'],
  },
  {
    id: 'p5', name: 'Mando inalámbrico compatible PC', category: 'mandos',
    price: 129.90, oldPrice: null, badge: null, media: 'grad-4',
    short: 'Vibración dual y compatibilidad con PC, consola y móvil.',
    description: 'Mando inalámbrico con vibración dual, joysticks de alta precisión y compatibilidad multiplataforma vía Bluetooth y cable USB-C.',
    specs: ['Conexión Bluetooth y USB-C', 'Vibración dual', 'Batería recargable de 20h', 'Compatible con PC, Android y consolas', 'Gatillos con recorrido ajustable'],
  },
  {
    id: 'p6', name: 'Mando con cable, vibración dual', category: 'mandos',
    price: 99.90, oldPrice: null, badge: null, media: 'grad-1',
    short: 'Opción económica con cable y respuesta de vibración dual.',
    description: 'Mando alámbrico con vibración dual y plug-and-play inmediato. Sin configuraciones complicadas: lo conectas y juegas.',
    specs: ['Conexión USB alámbrica', 'Vibración dual', 'Plug and play', 'Compatible con PC', 'Cable de 1.8 m'],
  },
  {
    id: 'p7', name: 'Audífonos gamer 7.1', category: 'audifonos',
    price: 119.90, oldPrice: 139.90, badge: '-15%', media: 'grad-3',
    short: 'Sonido envolvente 7.1 y micrófono con cancelación de ruido.',
    description: 'Audífonos gamer con sonido envolvente virtual 7.1, micrófono desmontable con cancelación de ruido y diadema acolchada para máxima comodidad.',
    specs: ['Sonido envolvente virtual 7.1', 'Micrófono desmontable', 'Diadema acolchada ajustable', 'Iluminación RGB', 'Conector USB / 3.5mm'],
  },
  {
    id: 'p8', name: 'Audífonos inalámbricos Bluetooth', category: 'audifonos',
    price: 149.90, oldPrice: null, badge: null, media: 'grad-2',
    short: 'Bluetooth 5.0, batería de 30h y estuche de carga.',
    description: 'Audífonos inalámbricos con Bluetooth 5.0, hasta 30 horas de batería combinada con el estuche y resistencia al agua IPX5.',
    specs: ['Bluetooth 5.0', 'Hasta 30h con estuche', 'Resistencia al agua IPX5', 'Controles táctiles', 'Carga rápida USB-C'],
  },
  {
    id: 'p9', name: 'Parlante Bluetooth portátil', category: 'parlantes',
    price: 159.90, oldPrice: null, badge: 'Top', media: 'grad-4',
    short: 'Graves profundos, resistente al agua y batería de larga duración.',
    description: 'Parlante Bluetooth portátil con graves profundos, resistencia al agua IPX7 y hasta 12 horas de reproducción continua.',
    specs: ['Bluetooth 5.0', 'Resistencia al agua IPX7', 'Hasta 12h de batería', 'Función manos libres', 'Diseño compacto'],
  },
  {
    id: 'p10', name: 'Barra de sonido compacta', category: 'parlantes',
    price: 199.90, oldPrice: null, badge: null, media: 'grad-1',
    short: 'Sonido envolvente para tu escritorio o TV en formato compacto.',
    description: 'Barra de sonido compacta con conexión Bluetooth, entrada AUX y HDMI ARC. Ideal para mejorar el audio de tu monitor o televisor.',
    specs: ['Bluetooth y entrada AUX', 'Salida HDMI ARC', 'Control remoto incluido', 'Modo noche', 'Montaje en pared opcional'],
  },
  {
    id: 'p11', name: 'Cooler RGB 120mm (pack x3)', category: 'coolers',
    price: 99.90, oldPrice: null, badge: 'Top', media: 'grad-4',
    short: 'Pack de 3 ventiladores RGB sincronizables para tu gabinete.',
    description: 'Pack de 3 ventiladores de 120mm con iluminación RGB sincronizable, controlador incluido y rodamiento de larga duración.',
    specs: ['3 ventiladores de 120mm', 'RGB sincronizable', 'Controlador incluido', 'Rodamiento hidráulico', 'Bajo nivel de ruido (18 dBA)'],
  },
  {
    id: 'p12', name: 'Cooler tower para CPU', category: 'coolers',
    price: 79.90, oldPrice: null, badge: null, media: 'grad-3',
    short: 'Disipador tipo tower con 4 heatpipes de cobre.',
    description: 'Disipador de CPU tipo tower con 4 heatpipes de cobre y ventilador de 120mm de alto flujo, compatible con los sockets más comunes de Intel y AMD.',
    specs: ['4 heatpipes de cobre', 'Ventilador de 120mm', 'Compatible Intel/AMD', 'Altura 154mm', 'Incluye pasta térmica'],
  },
];

function matrixxFindProduct(id){
  return MATRIXX_PRODUCTS.find((p) => p.id === id) || null;
}

function matrixxFormatPrice(value){
  return 'S/ ' + value.toFixed(2);
}
