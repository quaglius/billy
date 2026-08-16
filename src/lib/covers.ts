export const BLOG_COVERS = [
  '/fotos/guille/blog-laptop.png',
  '/fotos/guille/blog-cuerpo-entero-oficina.png',
  '/fotos/guille/blog-camisa-blanca-escritorio.png',
] as const;

export function coverForSlug(slug: string, imagenPortadaUrl?: string | null): string {
  if (imagenPortadaUrl) return imagenPortadaUrl;
  let n = 0;
  for (let i = 0; i < slug.length; i += 1) n += slug.charCodeAt(i);
  return BLOG_COVERS[n % BLOG_COVERS.length]!;
}

export const CURSO_COVERS: Record<string, string> = {
  encuentro: '/fotos/guille/about-gesticulando.png',
  taller: '/fotos/guille/blog-laptop.png',
  programa: '/fotos/guille/blog-cuerpo-entero-oficina.png',
};

export function coverForFormato(formato: string): string {
  return CURSO_COVERS[formato] ?? BLOG_COVERS[0];
}
