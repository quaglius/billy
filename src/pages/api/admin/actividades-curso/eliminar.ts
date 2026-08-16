import type { APIRoute } from 'astro';
import { db } from '../../../../lib/firebase-admin';

export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();
  const id = String(form.get('id') ?? '');
  const cursoId = String(form.get('cursoId') ?? '');
  if (!id || !cursoId) {
    return new Response(null, { status: 303, headers: { Location: '/admin/cursos' } });
  }

  await db().collection('actividades_curso').doc(id).delete();

  return new Response(null, { status: 303, headers: { Location: `/admin/cursos/${cursoId}?okBanco=eliminada` } });
};
