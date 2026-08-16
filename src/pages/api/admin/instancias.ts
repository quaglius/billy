import type { APIRoute } from 'astro';
import { FieldValue } from 'firebase-admin/firestore';
import { db } from '../../../lib/firebase-admin';

export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();
  const id = String(form.get('id') ?? '');
  const cursoId = String(form.get('cursoId') ?? '');
  const empresaId = String(form.get('empresaId') ?? '');
  const errorParam = id ? 'errorInst' : 'error';
  const volver = id ? `/admin/instancias/${id}` : '/admin/instancias';

  if (!cursoId || !empresaId) {
    return new Response(null, { status: 303, headers: { Location: `${volver}?${errorParam}=1` } });
  }

  const curso = await db().collection('cursos').doc(cursoId).get();
  const empresa = await db().collection('empresas').doc(empresaId).get();
  if (!curso.exists || !empresa.exists) {
    return new Response(null, { status: 303, headers: { Location: `${volver}?${errorParam}=1` } });
  }

  const fechaInicioRaw = String(form.get('fechaInicio') ?? '');
  const fechaFinRaw = String(form.get('fechaFin') ?? '');
  const modalidad = String(form.get('modalidad') ?? '') || null;
  const tituloParticular = String(form.get('tituloParticular') ?? '').trim() || null;
  const particularidades = String(form.get('particularidades') ?? '').trim() || null;

  const payload = {
    cursoId,
    empresaId,
    tituloParticular,
    particularidades,
    visibilidad: 'privada',
    fechaInicio: fechaInicioRaw ? new Date(`${fechaInicioRaw}T00:00:00`) : null,
    fechaFin: fechaFinRaw ? new Date(`${fechaFinRaw}T00:00:00`) : null,
    modalidad,
  };

  if (id) {
    const existente = await db().collection('instancias').doc(id).get();
    if (!existente.exists) {
      return new Response(null, { status: 303, headers: { Location: '/admin/instancias?error=1' } });
    }
    await db().collection('instancias').doc(id).update(payload);
    return new Response(null, { status: 303, headers: { Location: `/admin/instancias/${id}?ok=editada` } });
  }

  await db()
    .collection('instancias')
    .add({ ...payload, creadoEn: FieldValue.serverTimestamp() });

  return new Response(null, { status: 303, headers: { Location: '/admin/instancias?ok=1' } });
};
