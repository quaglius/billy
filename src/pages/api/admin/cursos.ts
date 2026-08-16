import type { APIRoute } from 'astro';
import { FieldValue } from 'firebase-admin/firestore';
import { db } from '../../../lib/firebase-admin';

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
  const titulo = String(form.get('titulo') ?? '').trim();
  if (!titulo) {
    const back = id ? `/admin/cursos/${id}?error=1` : '/admin/cursos?error=1';
    return new Response(null, { status: 303, headers: { Location: back } });
  }

  const objetivos = String(form.get('objetivos') ?? '')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
  const temario = String(form.get('temario') ?? '')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);

  const payload = {
    titulo,
    descripcionCorta: String(form.get('descripcionCorta') ?? ''),
    descripcion: String(form.get('descripcion') ?? ''),
    formato: String(form.get('formato') ?? 'encuentro'),
    duracionTexto: String(form.get('duracionTexto') ?? ''),
    dirigidoA: String(form.get('dirigidoA') ?? ''),
    objetivos,
    temario,
    publicado: form.get('publicado') === 'on',
    actualizadoEn: FieldValue.serverTimestamp(),
  };

  if (id) {
    await db().collection('cursos').doc(id).update(payload);
    return new Response(null, {
      status: 303,
      headers: { Location: `/admin/cursos/${id}?ok=1` },
    });
  }

  const slugBase = slugify(titulo) || 'curso';
  let slug = slugBase;
  let n = 1;
  while (!(await db().collection('cursos').where('slug', '==', slug).limit(1).get()).empty) {
    n += 1;
    slug = `${slugBase}-${n}`;
  }

  await db().collection('cursos').add({
    ...payload,
    slug,
    imagenPortadaUrl: null,
    adjuntos: [],
    creadoEn: FieldValue.serverTimestamp(),
  });

  return new Response(null, { status: 303, headers: { Location: '/admin/cursos?ok=1' } });
};
