import type { APIRoute } from 'astro';
import { FieldValue } from 'firebase-admin/firestore';
import { db } from '../../../../lib/firebase-admin';
import { generarCodigoActividad } from '../../../../lib/codigo';

// Clona una o más preguntas del banco del curso a un encuentro concreto de una instancia.
// Cada clon es un documento nuevo en `actividades`, con su propio código y QR — así las
// respuestas de una instancia nunca se mezclan con las de otra, aunque usen la misma pregunta.
export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();
  const encuentroId = String(form.get('encuentroId') ?? '');
  const instanciaId = String(form.get('instanciaId') ?? '');
  const bancoIds = form.getAll('banco').map(String).filter(Boolean);
  const destino = `/admin/instancias/${instanciaId}/encuentros/${encuentroId}/actividades`;

  if (!encuentroId || !instanciaId || bancoIds.length === 0) {
    return new Response(null, { status: 303, headers: { Location: `${destino}?error=banco` } });
  }

  const [enc, actualesSnap] = await Promise.all([
    db().collection('encuentros').doc(encuentroId).get(),
    db().collection('actividades').where('encuentroId', '==', encuentroId).get(),
  ]);
  if (!enc.exists) return new Response(null, { status: 303, headers: { Location: '/admin/instancias' } });

  let orden = actualesSnap.size;

  for (const bancoId of bancoIds) {
    const item = await db().collection('actividades_curso').doc(bancoId).get();
    if (!item.exists) continue;
    const b = item.data()!;
    orden += 1;
    const codigo = await generarCodigoActividad();
    await db().collection('actividades').add({
      encuentroId,
      instanciaId,
      cursoId: String(b.cursoId ?? ''),
      codigo,
      tipo: String(b.tipo ?? 'si_no'),
      consigna: String(b.consigna ?? ''),
      opciones: b.opciones ?? null,
      orden,
      activa: false,
      cerradaEn: null,
      creadoEn: FieldValue.serverTimestamp(),
    });
  }

  return new Response(null, { status: 303, headers: { Location: `${destino}?ok=importadas` } });
};
