import type { APIRoute } from 'astro';
import { db } from '../../../lib/firebase-admin';

export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();
  const instanciaId = String(form.get('instanciaId') ?? '');
  const titulo = String(form.get('titulo') ?? '').trim();
  const fechaHoraRaw = String(form.get('fechaHora') ?? '');
  if (!instanciaId || !titulo || !fechaHoraRaw) {
    return new Response(null, {
      status: 303,
      headers: { Location: `/admin/instancias/${instanciaId || ''}` },
    });
  }

  const inst = await db().collection('instancias').doc(instanciaId).get();
  if (!inst.exists) {
    return new Response(null, { status: 303, headers: { Location: '/admin/instancias' } });
  }

  const duracionRaw = String(form.get('duracionMinutos') ?? '');
  await db().collection('encuentros').add({
    instanciaId,
    orden: Number(form.get('orden') ?? 1),
    titulo,
    fechaHora: new Date(fechaHoraRaw),
    duracionMinutos: duracionRaw ? Number(duracionRaw) : null,
    descripcion: null,
  });

  return new Response(null, {
    status: 303,
    headers: { Location: `/admin/instancias/${instanciaId}` },
  });
};
