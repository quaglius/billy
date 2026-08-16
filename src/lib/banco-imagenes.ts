// Semilla del banco de imágenes: registra como filas de la colección `imagenes` las fotos
// que ya viven en /public/fotos (estáticas, sin costo, sirven ya). El upload a Firebase
// Storage se suma como otro origen dentro de la misma colección — mismo picker para las dos.
export const IMAGENES_SEED: { url: string; nombre: string; categoria: 'guille' | 'campo' }[] = [
  { url: '/fotos/guille/hero-brazos-cruzados.png', nombre: 'Guillermo — brazos cruzados (retrato)', categoria: 'guille' },
  { url: '/fotos/guille/hero-hires-sonrisa.png', nombre: 'Guillermo — sonrisa (retrato)', categoria: 'guille' },
  { url: '/fotos/guille/about-gesticulando.png', nombre: 'Guillermo — gesticulando (sweater)', categoria: 'guille' },
  { url: '/fotos/guille/avatar-sonrisa.png', nombre: 'Guillermo — avatar / perfil', categoria: 'guille' },
  { url: '/fotos/guille/blog-laptop.png', nombre: 'Guillermo — con notebook', categoria: 'guille' },
  { url: '/fotos/guille/blog-camisa-blanca-escritorio.png', nombre: 'Guillermo — escritorio', categoria: 'guille' },
  { url: '/fotos/guille/blog-cuerpo-entero-oficina.png', nombre: 'Guillermo — cuerpo entero, oficina', categoria: 'guille' },
  { url: '/fotos/campo/capacitacion-sala.jpg', nombre: 'Capacitación en sala', categoria: 'campo' },
  { url: '/fotos/campo/centro-monitores.jpg', nombre: 'Centro de monitores', categoria: 'campo' },
  { url: '/fotos/campo/charla-isrpi.jpg', nombre: 'Charla en ISRPI', categoria: 'campo' },
  { url: '/fotos/campo/delegado-ate.jpg', nombre: 'Delegados ATE', categoria: 'campo' },
  { url: '/fotos/campo/encuentro-planta.jpg', nombre: 'Encuentro en planta', categoria: 'campo' },
  { url: '/fotos/campo/equipo-arba.jpg', nombre: 'Equipo ARBA', categoria: 'campo' },
  { url: '/fotos/campo/guille-exponiendo.jpg', nombre: 'Guillermo exponiendo', categoria: 'campo' },
  { url: '/fotos/campo/juventud-ferroviaria.jpg', nombre: 'Juventud ferroviaria', categoria: 'campo' },
  { url: '/fotos/campo/oficina-reunion.jpg', nombre: 'Reunión de oficina', categoria: 'campo' },
  { url: '/fotos/campo/piso-operativos.jpg', nombre: 'Trabajadores operativos', categoria: 'campo' },
  { url: '/fotos/campo/programa-cierre.jpg', nombre: 'Cierre de programa', categoria: 'campo' },
  { url: '/fotos/campo/reunion-mesa.jpg', nombre: 'Reunión de mesa', categoria: 'campo' },
  { url: '/fotos/campo/taller-delegados.jpg', nombre: 'Taller de delegados', categoria: 'campo' },
];
