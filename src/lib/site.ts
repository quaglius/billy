export const WHATSAPP_URL = 'https://wa.me/5491168313878';

export function whatsappConTexto(texto: string): string {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(texto)}`;
}

export const WHATSAPP_METODO = whatsappConTexto(
  'Hola Guillermo, te escribo para consultar el método de trabajo de cuatro pasos (escuchar, nombrar, equipar y sostener). ¿Podemos coordinar una charla?',
);
export const INSTAGRAM_URL = 'https://www.instagram.com/equilibrarprosalud';
export const INSTAGRAM_HANDLE = '@equilibrarprosalud';
export const FACEBOOK_URL = 'https://www.facebook.com/equilibrarprosalud';
export const SITE_URL = 'https://guillenuesch.netlify.app';
export const YOUTUBE_URL = 'https://www.youtube.com/@EquilibrarSaludMentalyAdicciones';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/guillermo-billy-nuesch-a9257b77/';
export const INSTAGRAM_BIO_SUGERIDA =
  'Guillermo Nuesch. Salud mental y prevención de consumos problemáticos en el trabajo. Equilibrar ProSalud.';

export const NAV = [
  { href: '/', label: 'Inicio' },
  { href: '/sobre-mi', label: 'Sobre mí' },
  { href: '/cursos', label: 'Cursos' },
  { href: '/blog', label: 'Blog' },
  { href: '/ayuda', label: 'Ayuda' },
] as const;
