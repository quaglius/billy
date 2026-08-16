import type { APIRoute } from 'astro';
import { db } from '../../../../lib/firebase-admin';
import { agregarRespuestas } from '../../../../lib/resultados';

export const GET: APIRoute = async ({ params }) => {
  const id = params.id;
  if (!id) return new Response(JSON.stringify({ total: 0 }), { status: 200 });

  const act = await db().collection('actividades').doc(id).get();
  if (!act.exists) {
    return new Response(JSON.stringify({ total: 0 }), { status: 200 });
  }

  // La pantalla en vivo solo cuenta lo que pasó desde la última "Renovada" (ver
  // /api/admin/actividades/renovar) — el Observatorio, en cambio, ignora este corte y suma
  // absolutamente todo el historial.
  const sesionDesde = act.data()!.sesionDesde ?? act.data()!.creadoEn;
  const snap = await db()
    .collection('respuestas')
    .where('actividadId', '==', id)
    .where('creadoEn', '>=', sesionDesde)
    .orderBy('creadoEn')
    .get();

  const agregado = agregarRespuestas(
    String(act.data()!.tipo),
    snap.docs.map((d) => ({ valor: d.data().valor })),
  );

  return new Response(JSON.stringify(agregado), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
