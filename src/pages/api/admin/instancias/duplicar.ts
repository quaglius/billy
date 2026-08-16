import type { APIRoute } from 'astro';
import { FieldValue } from 'firebase-admin/firestore';
import { db } from '../../../../lib/firebase-admin';

export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();
  const id = String(form.get('id') ?? '');
  const empresaId = String(form.get('empresaId') ?? '');
  const fechaInicioRaw = String(form.get('fechaInicio') ?? '');
  const fechaFinRaw = String(form.get('fechaFin') ?? '');

  if (!id || !empresaId || !fechaInicioRaw) {
    return new Response(null, {
      status: 303,
      headers: { Location: `/admin/instancias/${id || ''}/duplicar?error=1` },
    });
  }

  const origen = await db().collection('instancias').doc(id).get();
  const empresa = await db().collection('empresas').doc(empresaId).get();
  if (!origen.exists || !empresa.exists) {
    return new Response(null, { status: 303, headers: { Location: '/admin/instancias?error=1' } });
  }

  const data = origen.data()!;
  const fechaInicio = new Date(`${fechaInicioRaw}T09:00:00`);
  const fechaFin = fechaFinRaw ? new Date(`${fechaFinRaw}T18:00:00`) : null;

  const nueva = await db().collection('instancias').add({
    cursoId: data.cursoId,
    empresaId,
    tituloParticular: data.tituloParticular ?? null,
    particularidades: data.particularidades ?? null,
    visibilidad: 'privada',
    fechaInicio,
    fechaFin,
    modalidad: data.modalidad ?? null,
    creadoEn: FieldValue.serverTimestamp(),
  });

  return new Response(null, {
    status: 303,
    headers: { Location: `/admin/instancias/${nueva.id}?ok=1` },
  });
};
