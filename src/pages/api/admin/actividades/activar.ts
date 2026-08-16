import type { APIRoute } from 'astro';
import { FieldValue } from 'firebase-admin/firestore';
import { db } from '../../../../lib/firebase-admin';

export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();
  const actividadId = String(form.get('actividadId') ?? '');
  const encuentroId = String(form.get('encuentroId') ?? '');
  const instanciaId = String(form.get('instanciaId') ?? '');
  if (!actividadId || !encuentroId) {
    return new Response(null, { status: 303, headers: { Location: '/admin' } });
  }

  const otras = await db().collection('actividades').where('encuentroId', '==', encuentroId).get();
  const batch = db().batch();
  otras.docs.forEach((doc) => {
    batch.update(doc.ref, {
      activa: doc.id === actividadId,
      cerradaEn: doc.id === actividadId ? null : doc.data().cerradaEn ?? FieldValue.serverTimestamp(),
    });
  });
  await batch.commit();

  return new Response(null, {
    status: 303,
    headers: { Location: `/admin/instancias/${instanciaId}/encuentros/${encuentroId}/vivo` },
  });
};
