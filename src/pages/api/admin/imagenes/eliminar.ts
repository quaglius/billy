import type { APIRoute } from 'astro';
import { db, storage } from '../../../../lib/firebase-admin';

// Borra la ficha del banco. Si es una imagen subida (Storage), intenta borrar también el
// archivo — si falla (por ejemplo, Storage ya no disponible), igual se saca del banco.
export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();
  const id = String(form.get('id') ?? '');
  if (!id) return new Response(null, { status: 303, headers: { Location: '/admin/imagenes' } });

  const doc = await db().collection('imagenes').doc(id).get();
  if (doc.exists) {
    const data = doc.data()!;
    if (data.origen === 'subida' && typeof data.url === 'string') {
      try {
        const bucket = storage().bucket();
        const ruta = data.url.split(`${bucket.name}/`)[1];
        if (ruta) await bucket.file(ruta).delete({ ignoreNotFound: true });
      } catch {
        // Si Storage no está disponible o el archivo ya no existe, seguimos igual.
      }
    }
  }

  await db().collection('imagenes').doc(id).delete();
  return new Response(null, { status: 303, headers: { Location: '/admin/imagenes?ok=eliminada' } });
};
