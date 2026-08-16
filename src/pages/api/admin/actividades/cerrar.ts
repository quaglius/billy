import type { APIRoute } from 'astro';
import { FieldValue } from 'firebase-admin/firestore';
import { db } from '../../../../lib/firebase-admin';

export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();
  const actividadId = String(form.get('actividadId') ?? '');
  const encuentroId = String(form.get('encuentroId') ?? '');
  const instanciaId = String(form.get('instanciaId') ?? '');
  if (!actividadId) {
    return new Response(null, { status: 303, headers: { Location: '/admin' } });
  }

  await db().collection('actividades').doc(actividadId).update({
    activa: false,
    cerradaEn: FieldValue.serverTimestamp(),
  });

  return new Response(null, {
    status: 303,
    headers: { Location: `/admin/instancias/${instanciaId}/encuentros/${encuentroId}/vivo` },
  });
};
