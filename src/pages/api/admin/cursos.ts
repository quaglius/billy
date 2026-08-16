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
  const titulo = String(form.get('titulo') ?? '').trim();
  if (!titulo) {
    return new Response(null, { status: 303, headers: { Location: '/admin/cursos?error=1' } });
  }

  const slugBase = slugify(titulo) || 'curso';
  let slug = slugBase;
  let n = 1;
  while (!(await db().collection('cursos').where('slug', '==', slug).limit(1).get()).empty) {
    n += 1;
    slug = `${slugBase}-${n}`;
  }

  const objetivos = String(form.get('objetivos') ?? '')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
  const temario = String(form.get('temario') ?? '')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);

  await db().collection('cursos').add({
    slug,
    titulo,
    descripcionCorta: String(form.get('descripcionCorta') ?? ''),
    descripcion: String(form.get('descripcion') ?? ''),
    formato: String(form.get('formato') ?? 'encuentro'),
    duracionTexto: String(form.get('duracionTexto') ?? ''),
    dirigidoA: String(form.get('dirigidoA') ?? ''),
    objetivos,
    temario,
    imagenPortadaUrl: null,
    adjuntos: [],
    publicado: form.get('publicado') === 'on',
    creadoEn: FieldValue.serverTimestamp(),
    actualizadoEn: FieldValue.serverTimestamp(),
  });

  return new Response(null, { status: 303, headers: { Location: '/admin/cursos' } });
};
