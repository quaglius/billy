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
  const nombre = String(form.get('nombre') ?? '').trim();
  if (!nombre) {
    const back = id ? `/admin/empresas/${id}?error=1` : '/admin/empresas?error=1';
    return new Response(null, { status: 303, headers: { Location: back } });
  }

  const rubroSel = String(form.get('rubro') ?? '');
  const rubro = rubroSel === '__otro__' ? String(form.get('rubroOtro') ?? '').trim() : rubroSel;

  const logoUrl = String(form.get('logoUrl') ?? '').trim() || null;

  const payload = {
    nombre,
    rubro: rubro || null,
    logoUrl,
    contactoNombre: String(form.get('contactoNombre') ?? '') || null,
    contactoEmail: String(form.get('contactoEmail') ?? '') || null,
    contactoTelefono: String(form.get('contactoTelefono') ?? '') || null,
    notasInternas: String(form.get('notasInternas') ?? '') || null,
  };

  if (id) {
    await db().collection('empresas').doc(id).update(payload);
    return new Response(null, {
      status: 303,
      headers: { Location: `/admin/empresas/${id}?ok=1` },
    });
  }

  const slugBase = slugify(nombre) || 'empresa';
  let slug = slugBase;
  let n = 1;
  while (!(await db().collection('empresas').where('slug', '==', slug).limit(1).get()).empty) {
    n += 1;
    slug = `${slugBase}-${n}`;
  }

  await db().collection('empresas').add({
    ...payload,
    slug,
    creadoEn: FieldValue.serverTimestamp(),
  });

  return new Response(null, { status: 303, headers: { Location: '/admin/empresas?ok=1' } });
};
