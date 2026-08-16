export type CoverMeta = { src: string; position: string };

export const BLOG_COVERS = [
  '/fotos/guille/blog-laptop.png',
  '/fotos/guille/blog-cuerpo-entero-oficina.png',
  '/fotos/guille/blog-camisa-blanca-escritorio.png',
] as const;

/** Retratos de estudio: la cabeza pega al borde. Anclar arriba. */
const ESTUDIO: CoverMeta['position'] = 'top';

export const POST_COVERS: Record<string, CoverMeta> = {
  'delegado-sindical-salud-mental': {
    src: '/fotos/campo/delegado-ate.jpg',
    position: 'center 18%',
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
  return ESTUDIO;
}

export function coverMeta(slug: string, imagenPortadaUrl?: string | null): CoverMeta {
  if (imagenPortadaUrl) return { src: imagenPortadaUrl, position: ESTUDIO };
  const mapped = POST_COVERS[slug];
  if (mapped) return mapped;
  let n = 0;
  for (let i = 0; i < slug.length; i += 1) n += slug.charCodeAt(i);
  return { src: BLOG_COVERS[n % BLOG_COVERS.length]!, position: ESTUDIO };
}

export function coverForSlug(slug: string, imagenPortadaUrl?: string | null): string {
  return coverMeta(slug, imagenPortadaUrl).src;
}
