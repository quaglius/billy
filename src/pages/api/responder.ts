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
  if (!act.exists) {
    return new Response(JSON.stringify({ estado: 'cerrada' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // El código anti-doble-voto incluye la "sesión" actual de la actividad (ver Renovar): si
  // Guillermo renueva la pantalla para un grupo nuevo, la misma persona puede volver a
  // responder — cada renovación abre una ventana de voto nueva, aunque el QR sea el mismo de
  // siempre.
  const sesionDesde = act.data()!.sesionDesde ?? act.data()!.creadoEn;
  const sesionMs = sesionDesde && typeof sesionDesde.toMillis === 'function' ? sesionDesde.toMillis() : 0;
  const id = `${actividadId}_${sesionMs}_${tokenNavegador}`;
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
