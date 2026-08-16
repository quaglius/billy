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

  const snap = await db()
    .collection('respuestas')
    .where('actividadId', '==', id)
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
