import type { APIRoute } from 'astro';
import { FieldValue } from 'firebase-admin/firestore';
import { db } from '../../../lib/firebase-admin';

export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();
  const cursoId = String(form.get('cursoId') ?? '');
  const empresaId = String(form.get('empresaId') ?? '');
  const slug = String(form.get('slug') ?? '').trim();
  if (!cursoId || !empresaId || !slug) {
    return new Response(null, { status: 303, headers: { Location: '/admin/instancias?error=1' } });
  }

  const curso = await db().collection('cursos').doc(cursoId).get();
  const empresa = await db().collection('empresas').doc(empresaId).get();
  if (!curso.exists || !empresa.exists) {
    return new Response(null, { status: 303, headers: { Location: '/admin/instancias?error=1' } });
  }

  const slugTaken = await db().collection('instancias').where('slug', '==', slug).limit(1).get();
  if (!slugTaken.empty) {
    return new Response(null, { status: 303, headers: { Location: '/admin/instancias?error=slug' } });
  }

  const fechaInicioRaw = String(form.get('fechaInicio') ?? '');
  const fechaFinRaw = String(form.get('fechaFin') ?? '');
  const modalidad = String(form.get('modalidad') ?? '') || null;

  await db().collection('instancias').add({
    cursoId,
    empresaId,
    slug,
    tituloParticular: null,
    particularidades: null,
    visibilidad: String(form.get('visibilidad') ?? 'privada'),
    fechaInicio: fechaInicioRaw ? new Date(`${fechaInicioRaw}T00:00:00`) : null,
    fechaFin: fechaFinRaw ? new Date(`${fechaFinRaw}T00:00:00`) : null,
    modalidad,
    creadoEn: FieldValue.serverTimestamp(),
  });

  return new Response(null, { status: 303, headers: { Location: '/admin/instancias' } });
};
