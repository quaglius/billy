import type { APIRoute } from 'astro';
import { FieldValue } from 'firebase-admin/firestore';
import { db } from '../../../lib/firebase-admin';

function redirect(to: string) {
  return new Response(null, { status: 303, headers: { Location: to } });
}

export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();
  const action = String(form.get('_action') ?? 'crear');
  const instanciaId = String(form.get('instanciaId') ?? '');
  const encuentroId = String(form.get('id') ?? '');
  const cronograma = `/admin/instancias/${instanciaId}`;
  const ficha = encuentroId ? `${cronograma}/encuentros/${encuentroId}` : cronograma;

  if (!instanciaId) return redirect('/admin/instancias');

  const inst = await db().collection('instancias').doc(instanciaId).get();
  if (!inst.exists) return redirect('/admin/instancias');

  if (action === 'archivar' || action === 'restaurar' || action === 'eliminar') {
    if (!encuentroId) return redirect(`${cronograma}?error=1`);
    const enc = await db().collection('encuentros').doc(encuentroId).get();
    if (!enc.exists || String(enc.data()?.instanciaId) !== instanciaId) {
      return redirect(cronograma);
    }

    if (action === 'eliminar') {
      const acts = await db().collection('actividades').where('encuentroId', '==', encuentroId).get();
      const batch = db().batch();
      acts.docs.forEach((doc) => batch.delete(doc.ref));
      batch.delete(enc.ref);
      await batch.commit();
      return redirect(`${cronograma}?ok=eliminado`);
    }

    const archivado = action === 'archivar';
    await enc.ref.update({ archivado });
    if (archivado) {
      const acts = await db().collection('actividades').where('encuentroId', '==', encuentroId).get();
      const activas = acts.docs.filter((doc) => doc.data().activa);
      if (activas.length > 0) {
        const batch = db().batch();
        activas.forEach((doc) => {
          batch.update(doc.ref, { activa: false, cerradaEn: FieldValue.serverTimestamp() });
        });
        await batch.commit();
      }
    }
    return redirect(`${cronograma}?ok=${archivado ? 'archivado' : 'restaurado'}`);
  }

  const titulo = String(form.get('titulo') ?? '').trim();
  const fechaHoraRaw = String(form.get('fechaHora') ?? '');
  if (!titulo || !fechaHoraRaw) {
    const back = encuentroId ? `${ficha}?error=1` : `${cronograma}?error=1`;
    return redirect(back);
  }

  const duracionRaw = String(form.get('duracionMinutos') ?? '');
  const descripcionRaw = String(form.get('descripcion') ?? '').trim();
  const payload = {
    instanciaId,
    orden: Number(form.get('orden') ?? 1),
    titulo,
    fechaHora: new Date(fechaHoraRaw),
    duracionMinutos: duracionRaw ? Number(duracionRaw) : null,
    descripcion: descripcionRaw || null,
  };

  if (encuentroId) {
    const enc = await db().collection('encuentros').doc(encuentroId).get();
    if (!enc.exists || String(enc.data()?.instanciaId) !== instanciaId) {
      return redirect(cronograma);
    }
    await enc.ref.update(payload);
    return redirect(`${ficha}?ok=1`);
  }

  const creado = await db().collection('encuentros').add({
    ...payload,
    archivado: false,
  });
  return redirect(`${cronograma}/encuentros/${creado.id}?ok=creado`);
};
