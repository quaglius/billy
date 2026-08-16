import type { APIRoute } from 'astro';
import { FieldValue } from 'firebase-admin/firestore';
import { db } from '../../../lib/firebase-admin';

export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();
  const id = String(form.get('id') ?? '');
  if (!id) {
    return new Response(null, { status: 303, headers: { Location: '/admin/posts' } });
  }

  const titulo = String(form.get('titulo') ?? '').trim();
  if (!titulo) {
    return new Response(null, {
      status: 303,
      headers: { Location: `/admin/posts/${id}?error=1` },
    });
  }

  const estado = String(form.get('estado') ?? 'borrador');
  const publicado = estado === 'publicado';
  const imagenPortadaUrl = String(form.get('imagenPortadaUrl') ?? '').trim() || null;

  const ref = db().collection('posts').doc(id);
  const actual = await ref.get();
  // No pisar la fecha de publicación original si se pasa a borrador y se vuelve a publicar:
  // solo se pone la fecha la primera vez que el post pasa a publicado.
  const yaTeniaFecha = Boolean(actual.data()?.publicadoEn);
  const payload: Record<string, unknown> = {
    titulo,
    bajada: String(form.get('bajada') ?? ''),
    cuerpoMd: String(form.get('cuerpoMd') ?? ''),
    imagenPortadaUrl,
    estado,
  };
  if (publicado && !yaTeniaFecha) {
    payload.publicadoEn = FieldValue.serverTimestamp();
  }
  await ref.update(payload);

  return new Response(null, {
    status: 303,
    headers: { Location: `/admin/posts/${id}?ok=1` },
  });
};
