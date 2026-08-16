import type { APIRoute } from 'astro';
import { FieldValue } from 'firebase-admin/firestore';
import { db } from '../../../../lib/firebase-admin';

// "Renovar" no borra nada. Solo mueve la marca de `sesionDesde` a este instante: la pantalla
// en vivo (que solo cuenta respuestas posteriores a esa marca) arranca de cero, pero el
// Observatorio sigue sumando absolutamente todo el historial, porque nunca mira este campo.
// Es lo que se usa entre un taller a la mañana y otro a la tarde con la misma pregunta/QR.
export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();
  const id = String(form.get('id') ?? '');
  const volverA = String(form.get('volverA') ?? '/admin');
  if (!id) {
    return new Response(null, { status: 303, headers: { Location: volverA } });
  }

  await db().collection('actividades').doc(id).update({
    sesionDesde: FieldValue.serverTimestamp(),
  });

  const sep = volverA.includes('?') ? '&' : '?';
  return new Response(null, { status: 303, headers: { Location: `${volverA}${sep}renovado=1` } });
};
