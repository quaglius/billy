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
  const nombre = String(form.get('nombre') ?? '').trim();
  if (!nombre) {
    return new Response(null, { status: 303, headers: { Location: '/admin/empresas?error=1' } });
  }

  const slugBase = slugify(nombre) || 'empresa';
  let slug = slugBase;
  let n = 1;
  while (!(await db().collection('empresas').where('slug', '==', slug).limit(1).get()).empty) {
    n += 1;
    slug = `${slugBase}-${n}`;
  }

  await db().collection('empresas').add({
    nombre,
    slug,
    rubro: String(form.get('rubro') ?? '') || null,
    logoUrl: null,
    contactoNombre: String(form.get('contactoNombre') ?? '') || null,
    contactoEmail: String(form.get('contactoEmail') ?? '') || null,
    contactoTelefono: String(form.get('contactoTelefono') ?? '') || null,
    notasInternas: String(form.get('notasInternas') ?? '') || null,
    creadoEn: FieldValue.serverTimestamp(),
  });

  return new Response(null, { status: 303, headers: { Location: '/admin/empresas' } });
};
