import type { APIRoute } from 'astro';
import { FieldValue } from 'firebase-admin/firestore';
import { db } from '../../../../lib/firebase-admin';

export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();
  const id = String(form.get('id') ?? '');
  const origen = await db().collection('instancias').doc(id).get();
  if (!origen.exists) {
    return new Response(null, { status: 303, headers: { Location: '/admin/instancias?error=1' } });
  }

  const data = origen.data()!;
  const slugBase = `${String(data.slug ?? 'instancia')}-copia`;
  let slug = slugBase;
  let n = 1;
  while (!(await db().collection('instancias').where('slug', '==', slug).limit(1).get()).empty) {
    n += 1;
    slug = `${slugBase}-${n}`;
  }

  const nueva = await db().collection('instancias').add({
    cursoId: data.cursoId,
    empresaId: data.empresaId,
    slug,
    tituloParticular: data.tituloParticular ?? null,
    particularidades: data.particularidades ?? null,
    visibilidad: 'privada',
    fechaInicio: null,
    fechaFin: null,
    modalidad: data.modalidad ?? null,
    creadoEn: FieldValue.serverTimestamp(),
  });

  const encuentros = await db().collection('encuentros').where('instanciaId', '==', id).get();
  const batch = db().batch();
  encuentros.docs.forEach((doc) => {
    const e = doc.data();
    const ref = db().collection('encuentros').doc();
    batch.set(ref, {
      instanciaId: nueva.id,
      orden: e.orden,
      titulo: e.titulo,
      fechaHora: e.fechaHora,
      duracionMinutos: e.duracionMinutos ?? null,
      descripcion: e.descripcion ?? null,
    });
  });
  await batch.commit();

  return new Response(null, {
    status: 303,
    headers: { Location: `/admin/instancias/${nueva.id}` },
  });
};
