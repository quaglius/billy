import type { APIRoute } from 'astro';
import { db } from '../../../../lib/firebase-admin';

// Edita el contenido de una actividad (consigna, tipo, opciones). El código y el QR
// nunca cambian acá — si cambiaran, el cartel impreso dejaría de servir.
export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();
  const id = String(form.get('id') ?? '');
  const cursoId = String(form.get('cursoId') ?? '');
  const consigna = String(form.get('consigna') ?? '').trim();
  const tipo = String(form.get('tipo') ?? 'si_no');
  if (!id || !cursoId || !consigna) {
    return new Response(null, { status: 303, headers: { Location: `/admin/cursos/${cursoId}?error=1` } });
  }

  const opcionesRaw = String(form.get('opciones') ?? '')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);

  await db()
    .collection('actividades')
    .doc(id)
    .update({
      consigna,
      tipo,
      opciones: opcionesRaw.length ? opcionesRaw : null,
    });

  return new Response(null, { status: 303, headers: { Location: `/admin/cursos/${cursoId}?ok=editada` } });
};
