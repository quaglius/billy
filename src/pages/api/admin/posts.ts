import type { APIRoute } from 'astro';
import { FieldValue } from 'firebase-admin/firestore';
import { db } from '../../../lib/firebase-admin';

export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();
  const id = String(form.get('id') ?? '');
  if (!id) {
    return new Response(null, { status: 303, headers: { Location: '/admin/posts' } });
  }

  const estado = String(form.get('estado') ?? 'borrador');
  const publicado = estado === 'publicado';
  await db()
    .collection('posts')
    .doc(id)
    .update({
      titulo: String(form.get('titulo') ?? ''),
      bajada: String(form.get('bajada') ?? ''),
      cuerpoMd: String(form.get('cuerpoMd') ?? ''),
      estado,
      publicadoEn: publicado ? FieldValue.serverTimestamp() : null,
    });

  return new Response(null, {
    status: 303,
    headers: { Location: `/admin/posts/${id}` },
  });
};
