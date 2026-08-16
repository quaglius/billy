import type { APIRoute } from 'astro';
import { FieldValue } from 'firebase-admin/firestore';
import { db } from '../../lib/firebase-admin';

export const POST: APIRoute = async ({ request }) => {
  let body: { actividadId?: string; tokenNavegador?: string; valor?: unknown };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ estado: 'cerrada' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const actividadId = String(body.actividadId ?? '');
  const tokenNavegador = String(body.tokenNavegador ?? '');
  if (!actividadId || !tokenNavegador) {
    return new Response(JSON.stringify({ estado: 'cerrada' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const act = await db().collection('actividades').doc(actividadId).get();
  if (!act.exists || !act.data()?.activa) {
    return new Response(JSON.stringify({ estado: 'cerrada' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const id = `${actividadId}_${tokenNavegador}`;
  const existente = await db().collection('respuestas').doc(id).get();
  if (existente.exists) {
    return new Response(JSON.stringify({ estado: 'ya_registrada' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  await db()
    .collection('respuestas')
    .doc(id)
    .set({
      actividadId,
      cursoId: String(act.data()!.cursoId),
      valor: body.valor ?? null,
      tokenNavegador,
      creadoEn: FieldValue.serverTimestamp(),
    });

  return new Response(JSON.stringify({ estado: 'ok' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
