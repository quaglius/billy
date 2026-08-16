import type { APIRoute } from 'astro';
import { db } from '../../../../lib/firebase-admin';

// Borra del Observatorio (y de la base) todas las respuestas de un grupo consigna+curso.
// Es la única vía para borrar datos históricos: es una acción deliberada desde acá, nunca
// algo que pase como efecto secundario de mirar la pantalla en vivo de una charla.
export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();
  const actividadIds = String(form.get('actividadIds') ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const redirectQS = String(form.get('volverA') ?? '/admin/observatorio');

  if (actividadIds.length === 0) {
    return new Response(null, { status: 303, headers: { Location: redirectQS } });
  }

  // Firestore permite hasta 10 valores en un 'in'; se agrupa por si el bloque junta varias instancias.
  const CHUNK_IN = 10;
  const idsAActividad = new Set<string>();
  for (let i = 0; i < actividadIds.length; i += CHUNK_IN) {
    const grupo = actividadIds.slice(i, i + CHUNK_IN);
    const snap = await db().collection('respuestas').where('actividadId', 'in', grupo).get();
    snap.docs.forEach((d) => idsAActividad.add(d.id));
  }

  const refs = [...idsAActividad].map((docId) => db().collection('respuestas').doc(docId));
  const CHUNK_BATCH = 400;
  for (let i = 0; i < refs.length; i += CHUNK_BATCH) {
    const batch = db().batch();
    refs.slice(i, i + CHUNK_BATCH).forEach((ref) => batch.delete(ref));
    await batch.commit();
  }

  const sep = redirectQS.includes('?') ? '&' : '?';
  return new Response(null, {
    status: 303,
    headers: { Location: `${redirectQS}${sep}borrado=${refs.length}` },
  });
};
