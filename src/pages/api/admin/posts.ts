import type { APIRoute } from 'astro';
import { FieldValue } from 'firebase-admin/firestore';
import { db } from '../../../lib/firebase-admin';

function redirect(to: string) {
  return new Response(null, { status: 303, headers: { Location: to } });
}

function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();
  const id = String(form.get('id') ?? '');
  const action = String(form.get('_action') ?? 'guardar');

  if (action === 'archivar' || action === 'restaurar') {
    if (!id) return redirect('/admin/posts?error=post');
    const ref = db().collection('posts').doc(id);
    const actual = await ref.get();
    if (!actual.exists) return redirect('/admin/posts?error=post');
    const archivado = action === 'archivar';
    await ref.update({ archivado, actualizadoEn: FieldValue.serverTimestamp() });
    return redirect(`/admin/posts?ok=${archivado ? 'archivado' : 'restaurado'}`);
  }

  const titulo = String(form.get('titulo') ?? '').trim();
  if (!titulo) {
    return redirect(id ? `/admin/posts/${id}?error=1` : '/admin/posts?error=1');
  }

  if (!id) {
    const slugBase = slugify(titulo) || 'post';
    let slug = slugBase;
    let n = 1;
    while (!(await db().collection('posts').where('slug', '==', slug).limit(1).get()).empty) {
      n += 1;
      slug = `${slugBase}-${n}`;
    }

    const creado = await db().collection('posts').add({
      slug,
      titulo,
      bajada: '',
      cuerpoMd: '',
      imagenPortadaUrl: null,
      keywordPrincipal: null,
      estado: 'borrador',
      publicadoEn: null,
      archivado: false,
      creadoEn: FieldValue.serverTimestamp(),
      actualizadoEn: FieldValue.serverTimestamp(),
    });
    return redirect(`/admin/posts/${creado.id}?ok=creado`);
  }

  const estado = form.get('estado') === 'publicado' ? 'publicado' : 'borrador';
  const publicado = estado === 'publicado';
  const imagenPortadaUrl = String(form.get('imagenPortadaUrl') ?? '').trim() || null;

  const ref = db().collection('posts').doc(id);
  const actual = await ref.get();
  if (!actual.exists) return redirect('/admin/posts?error=post');
  // No pisar la fecha de publicación original si se pasa a borrador y se vuelve a publicar:
  // solo se pone la fecha la primera vez que el post pasa a publicado.
  const yaTeniaFecha = Boolean(actual.data()?.publicadoEn);
  const payload: Record<string, unknown> = {
    titulo,
    bajada: String(form.get('bajada') ?? ''),
    cuerpoMd: String(form.get('cuerpoMd') ?? ''),
    imagenPortadaUrl,
    estado,
    actualizadoEn: FieldValue.serverTimestamp(),
  };
  if (publicado && !yaTeniaFecha) {
    payload.publicadoEn = FieldValue.serverTimestamp();
  }
  await ref.update(payload);

  return redirect(`/admin/posts/${id}?ok=1`);
};
