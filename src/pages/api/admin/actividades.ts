import type { APIRoute } from 'astro';
import { FieldValue } from 'firebase-admin/firestore';
import { db } from '../../../lib/firebase-admin';
import { generarCodigoActividad } from '../../../lib/codigo';

export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();
  const encuentroId = String(form.get('encuentroId') ?? '');
  const instanciaId = String(form.get('instanciaId') ?? '');
  const consigna = String(form.get('consigna') ?? '').trim();
  const tipo = String(form.get('tipo') ?? 'si_no');
  if (!encuentroId || !instanciaId || !consigna) {
    return new Response(null, {
      status: 303,
      headers: { Location: `/admin/instancias/${instanciaId}/encuentros/${encuentroId}?error=1` },
    });
  }

  const enc = await db().collection('encuentros').doc(encuentroId).get();
  const inst = await db().collection('instancias').doc(instanciaId).get();
  if (!enc.exists || !inst.exists) {
    return new Response(null, { status: 303, headers: { Location: '/admin/instancias' } });
  }

  const opcionesRaw = String(form.get('opciones') ?? '')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);

  const codigo = await generarCodigoActividad();
  await db().collection('actividades').add({
    encuentroId,
    instanciaId,
    cursoId: String(inst.data()!.cursoId),
    codigo,
    tipo,
    consigna,
    opciones: opcionesRaw.length ? opcionesRaw : null,
    orden: Number(form.get('orden') ?? 1),
    activa: false,
    cerradaEn: null,
    creadoEn: FieldValue.serverTimestamp(),
  });

  return new Response(null, {
    status: 303,
    headers: { Location: `/admin/instancias/${instanciaId}/encuentros/${encuentroId}?ok=1` },
  });
};
