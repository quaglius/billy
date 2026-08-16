import type { APIRoute } from 'astro';
import { db } from '../lib/firebase-admin';

// Sitemap generado en cada request (no en build): el sitio es SSR sobre Firestore, así que
// un sitemap estático quedaría desactualizado apenas se publique un post o una instancia
// nueva. Solo entran acá páginas indexables de verdad — nada de /admin, /a/, /empezar-aca,
// ni instancias privadas.
export const GET: APIRoute = async ({ site }) => {
  const base = (site?.toString() ?? 'https://guillenuesch.netlify.app').replace(/\/$/, '');
  const urls: { loc: string; changefreq: string; priority: string }[] = [
    { loc: '/', changefreq: 'weekly', priority: '1.0' },
    { loc: '/sobre-mi', changefreq: 'monthly', priority: '0.8' },
    { loc: '/cursos', changefreq: 'weekly', priority: '0.8' },
    { loc: '/blog', changefreq: 'daily', priority: '0.8' },
    { loc: '/ayuda', changefreq: 'monthly', priority: '0.6' },
  ];

  try {
    const [postsSnap, cursosSnap] = await Promise.all([
      db().collection('posts').where('estado', '==', 'publicado').get(),
      db().collection('cursos').where('publicado', '==', true).get(),
    ]);

    postsSnap.docs.forEach((d) => {
      const slug = String(d.data().slug ?? '');
      if (slug) urls.push({ loc: `/blog/${slug}`, changefreq: 'monthly', priority: '0.7' });
    });
    cursosSnap.docs.forEach((d) => {
      const slug = String(d.data().slug ?? '');
      if (slug) urls.push({ loc: `/cursos/${slug}`, changefreq: 'monthly', priority: '0.6' });
    });
  } catch {
    // Si Firestore falla, se sirve igual el sitemap con las páginas fijas — mejor eso que un 500.
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${base}${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

  return new Response(xml, {
    status: 200,
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
