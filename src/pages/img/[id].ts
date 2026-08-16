import type { APIRoute } from 'astro';
import { db } from '../../lib/firebase-admin';

// Sirve las imágenes que se guardaron como base64 adentro de Firestore (ver
// /api/admin/imagenes/subir.ts). Caché larga e inmutable: cada documento es su propio
// archivo fijo — si se sube una versión nueva, se crea un documento nuevo, nunca se pisa
// este, así que cachear "para siempre" es seguro y evita pegarle a Firestore en cada visita.
export const GET: APIRoute = async ({ params }) => {
  const id = params.id;
  if (!id) return new Response('No encontrada', { status: 404 });

  const doc = await db().collection('imagenes').doc(id).get();
  if (!doc.exists) return new Response('No encontrada', { status: 404 });

  const data = doc.data()!;
  if (data.origen !== 'firestore' || typeof data.datosBase64 !== 'string') {
    return new Response('No encontrada', { status: 404 });
  }

  const buffer = Buffer.from(data.datosBase64, 'base64');
  return new Response(buffer, {
    status: 200,
    headers: {
      'Content-Type': typeof data.mime === 'string' ? data.mime : 'image/jpeg',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
