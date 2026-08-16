import type { APIRoute } from 'astro';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import { db } from '../../../../lib/firebase-admin';
import { generarCodigoActividad } from '../../../../lib/codigo';

export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();
  const id = String(form.get('id') ?? '');
  const empresaId = String(form.get('empresaId') ?? '');
  const fechaInicioRaw = String(form.get('fechaInicio') ?? '');
  const fechaFinRaw = String(form.get('fechaFin') ?? '');

  if (!id || !empresaId || !fechaInicioRaw) {
    return new Response(null, {
      status: 303,
      headers: { Location: `/admin/instancias/${id || ''}/duplicar?error=1` },
    });
  }

  const origen = await db().collection('instancias').doc(id).get();
  const empresa = await db().collection('empresas').doc(empresaId).get();
  if (!origen.exists || !empresa.exists) {
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

  const fechaInicio = new Date(`${fechaInicioRaw}T09:00:00`);
  const fechaFin = fechaFinRaw ? new Date(`${fechaFinRaw}T18:00:00`) : null;

  const nueva = await db().collection('instancias').add({
    cursoId: data.cursoId,
    empresaId,
    slug,
    tituloParticular: data.tituloParticular ?? null,
    particularidades: data.particularidades ?? null,
    visibilidad: 'privada',
    fechaInicio,
    fechaFin,
    modalidad: data.modalidad ?? null,
    creadoEn: FieldValue.serverTimestamp(),
  });

  const encuentros = await db().collection('encuentros').where('instanciaId', '==', id).get();
  const ordered = encuentros.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .filter((e) => !e.archivado)
    .sort((a, b) => Number(a.orden ?? 0) - Number(b.orden ?? 0));

  const primeraFecha = ordered[0]?.fechaHora?.toDate?.() ?? ordered[0]?.fechaHora;
  const baseMs = primeraFecha instanceof Date ? primeraFecha.getTime() : Date.now();
  const delta = fechaInicio.getTime() - baseMs;

  for (const e of ordered) {
    const oldFecha = e.fechaHora?.toDate?.() ?? e.fechaHora;
    const nuevaFecha =
      oldFecha instanceof Date
        ? Timestamp.fromDate(new Date(oldFecha.getTime() + delta))
        : Timestamp.fromDate(fechaInicio);
    const encRef = await db().collection('encuentros').add({
      instanciaId: nueva.id,
      orden: e.orden,
      titulo: e.titulo,
      fechaHora: nuevaFecha,
      duracionMinutos: e.duracionMinutos ?? null,
      descripcion: e.descripcion ?? null,
      archivado: false,
    });

    const acts = await db().collection('actividades').where('encuentroId', '==', e.id).get();
    for (const act of acts.docs) {
      const a = act.data();
      const codigo = await generarCodigoActividad();
      await db().collection('actividades').add({
        encuentroId: encRef.id,
        instanciaId: nueva.id,
        cursoId: a.cursoId,
        codigo,
        tipo: a.tipo,
        consigna: a.consigna,
        opciones: a.opciones ?? null,
        orden: a.orden,
        activa: false,
        cerradaEn: null,
        creadoEn: FieldValue.serverTimestamp(),
      });
    }
  }

  return new Response(null, {
    status: 303,
    headers: { Location: `/admin/instancias/${nueva.id}?ok=1` },
  });
};
