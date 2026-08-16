import type { APIRoute } from 'astro';
import { db } from '../../../../lib/firebase-admin';

// Borra la actividad (deja de aceptar respuestas y su QR deja de servir). Las respuestas ya
// registradas NO se borran acá — si hace falta purgarlas también, se hace desde el
// Observatorio, a propósito y por separado.
export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();
  const id = String(form.get('id') ?? '');
  const cursoId = String(form.get('cursoId') ?? '');
  if (!id || !cursoId) {
    return new Response(null, { status: 303, headers: { Location: '/admin/cursos' } });
  }

  await db().collection('actividades').doc(id).delete();

  return new Response(null, { status: 303, headers: { Location: `/admin/cursos/${cursoId}?ok=eliminada` } });
};
