import type { APIRoute } from 'astro';
import { FieldValue } from 'firebase-admin/firestore';
import { db } from '../../../lib/firebase-admin';

// Alta de una pregunta en el banco reutilizable de un curso. Esto NO crea un QR ni acepta
// respuestas por sí sola — es la plantilla que después se copia a los encuentros de cada
// instancia (ver /api/admin/actividades/importar).
export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();
  const cursoId = String(form.get('cursoId') ?? '');
  const consigna = String(form.get('consigna') ?? '').trim();
  const tipo = String(form.get('tipo') ?? 'si_no');
  if (!cursoId || !consigna) {
    return new Response(null, { status: 303, headers: { Location: `/admin/cursos/${cursoId}?errorBanco=1` } });
  }

  const opcionesRaw = String(form.get('opciones') ?? '')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);

  const bancoSnap = await db().collection('actividades_curso').where('cursoId', '==', cursoId).get();
  const orden = bancoSnap.size + 1;

  await db().collection('actividades_curso').add({
    cursoId,
    tipo,
    consigna,
    opciones: opcionesRaw.length ? opcionesRaw : null,
    orden,
    creadoEn: FieldValue.serverTimestamp(),
  });

  return new Response(null, { status: 303, headers: { Location: `/admin/cursos/${cursoId}?okBanco=1` } });
};
