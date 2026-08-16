import type { APIRoute } from 'astro';
import { FieldValue } from 'firebase-admin/firestore';
import { db } from '../../../lib/firebase-admin';
import { generarCodigoActividad } from '../../../lib/codigo';

// Alta de una actividad de un curso. El código y el QR se generan acá, una sola vez, y no
// vuelven a cambiar: es lo que Guillermo imprime y reutiliza en todas las cursadas de ese curso.
export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();
  const cursoId = String(form.get('cursoId') ?? '');
  const consigna = String(form.get('consigna') ?? '').trim();
  const tipo = String(form.get('tipo') ?? 'si_no');
  if (!cursoId || !consigna) {
    return new Response(null, { status: 303, headers: { Location: `/admin/cursos/${cursoId}?error=1` } });
  }

  const opcionesRaw = String(form.get('opciones') ?? '')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);

  const actualesSnap = await db().collection('actividades').where('cursoId', '==', cursoId).get();
  const orden = actualesSnap.size + 1;
  const codigo = await generarCodigoActividad();
  const ahora = FieldValue.serverTimestamp();

  await db().collection('actividades').add({
    cursoId,
    codigo,
    tipo,
    consigna,
    opciones: opcionesRaw.length ? opcionesRaw : null,
    orden,
    sesionDesde: ahora,
    creadoEn: ahora,
  });

  return new Response(null, { status: 303, headers: { Location: `/admin/cursos/${cursoId}?ok=1` } });
};
