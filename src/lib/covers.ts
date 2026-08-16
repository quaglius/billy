export type CoverMeta = { src: string; position: string };

/** Encuadre vertical centrado: el recorte ancho no se queda en la coronilla. */
const CENTRO: CoverMeta['position'] = 'center';

export const BLOG_COVERS = [
  '/fotos/campo/piso-operativos.jpg',
  '/fotos/campo/reunion-mesa.jpg',
  '/fotos/campo/oficina-reunion.jpg',
] as const;

export const POST_COVERS: Record<string, CoverMeta> = {
  'salud-mental-laboral-desde-el-piso': {
    src: '/fotos/campo/piso-operativos.jpg',
    position: CENTRO,
  },
  'delegado-sindical-salud-mental': {
    src: '/fotos/campo/delegado-ate.jpg',
    position: CENTRO,
  },
  'ludopatia-en-el-trabajo': {
    src: '/fotos/campo/oficina-reunion.jpg',
    position: CENTRO,
  },
  'consumo-de-alcohol-en-el-trabajo': {
    src: '/fotos/campo/reunion-mesa.jpg',
    position: CENTRO,
  },
  'presentismo-laboral': {
    src: '/fotos/campo/equipo-arba.jpg',
    position: CENTRO,
  },
  'protocolo-salud-mental-laboral-srt-2026': {
    src: '/fotos/campo/charla-isrpi.jpg',
    position: 'center 22%',
  },
  'condiciones-y-medio-ambiente-de-trabajo-cymat': {
    src: '/fotos/campo/capacitacion-sala.jpg',
    position: CENTRO,
  },
  'inteligencia-artificial-salud-mental-trabajo': {
    src: '/fotos/campo/centro-monitores.jpg',
    position: CENTRO,
  },
  'generacion-z-salud-mental-trabajo': {
    src: '/fotos/campo/juventud-ferroviaria.jpg',
    position: CENTRO,
  },
  '25-anos-escuchando-al-mundo-del-trabajo': {
    src: '/fotos/campo/guille-exponiendo.jpg',
    position: 'center 22%',
  },
};

export const CURSO_COVERS = {
  encuentro: { src: '/fotos/campo/encuentro-planta.jpg', position: 'center 22%' },
  taller: { src: '/fotos/campo/taller-delegados.jpg', position: 'center 28%' },
  programa: { src: '/fotos/campo/programa-cierre.jpg', position: 'center 32%' },
} as const;

export function coverForFormato(formato: string): string {
  if (formato in CURSO_COVERS) {
    return CURSO_COVERS[formato as keyof typeof CURSO_COVERS].src;
  }
  return BLOG_COVERS[0];
}

export function coverPositionForFormato(formato: string): string {
  if (formato in CURSO_COVERS) {
    return CURSO_COVERS[formato as keyof typeof CURSO_COVERS].position;
  }
  return CENTRO;
}

/** La imagen propia del curso gana siempre; si no tiene, cae al genérico por formato. */
export function coverForCurso(formato: string, imagenPortadaUrl?: string | null): string {
  return imagenPortadaUrl || coverForFormato(formato);
}

export function coverPositionForCurso(formato: string, imagenPortadaUrl?: string | null): string {
  return imagenPortadaUrl ? CENTRO : coverPositionForFormato(formato);
}

/** La imagen elegida en el admin gana siempre; el mapa por slug es solo un default para posts sin elegir. */
export function coverMeta(slug: string, imagenPortadaUrl?: string | null): CoverMeta {
  if (imagenPortadaUrl) return { src: imagenPortadaUrl, position: CENTRO };
  const mapped = POST_COVERS[slug];
  if (mapped) return mapped;
  let n = 0;
  for (let i = 0; i < slug.length; i += 1) n += slug.charCodeAt(i);
  return { src: BLOG_COVERS[n % BLOG_COVERS.length]!, position: CENTRO };
}

export function coverForSlug(slug: string, imagenPortadaUrl?: string | null): string {
  return coverMeta(slug, imagenPortadaUrl).src;
}
