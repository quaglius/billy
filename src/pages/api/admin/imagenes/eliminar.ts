import type { APIRoute } from 'astro';
import { db } from '../../../../lib/firebase-admin';

// Las imágenes propias viven enteras adentro del documento (base64), así que borrar el
// documento alcanza — no hay ningún archivo aparte en otro lado que limpiar.
export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();
  const id = String(form.get('id') ?? '');
  if (!id) return new Response(null, { status: 303, headers: { Location: '/admin/imagenes' } });

  await db().collection('imagenes').doc(id).delete();
  return new Response(null, { status: 303, headers: { Location: '/admin/imagenes?ok=eliminada' } });
};
