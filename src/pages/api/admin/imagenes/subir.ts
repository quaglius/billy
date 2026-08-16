import type { APIRoute } from 'astro';
import { FieldValue } from 'firebase-admin/firestore';
import { db, storage } from '../../../../lib/firebase-admin';

const TIPOS_PERMITIDOS = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_BYTES = 8 * 1024 * 1024; // 8MB

export const POST: APIRoute = async ({ request }) => {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return new Response(JSON.stringify({ error: 'No se pudo leer el archivo.' }), { status: 400 });
  }

  const archivo = form.get('archivo');
  if (!(archivo instanceof File) || archivo.size === 0) {
    return new Response(JSON.stringify({ error: 'Elegí un archivo primero.' }), { status: 400 });
  }
  if (!TIPOS_PERMITIDOS.includes(archivo.type)) {
    return new Response(JSON.stringify({ error: 'Solo se aceptan imágenes JPG, PNG o WEBP.' }), { status: 400 });
  }
  if (archivo.size > MAX_BYTES) {
    return new Response(JSON.stringify({ error: 'La imagen pesa más de 8MB. Achicala e intentá de nuevo.' }), { status: 400 });
  }

  let bucket;
  try {
    bucket = storage().bucket();
  } catch {
    return new Response(
      JSON.stringify({
        error:
          'Todavía no se puede subir imágenes nuevas: el proyecto de Firebase está en el plan gratuito (Spark) y guardar archivos requiere pasar al plan Blaze (pago por uso, con capa gratuita). Mientras tanto, elegí una imagen del banco.',
      }),
      { status: 503 },
    );
  }

  const nombreOriginal = String(form.get('nombre') ?? archivo.name ?? 'imagen').slice(0, 80);
  const ext = archivo.type === 'image/png' ? 'png' : archivo.type === 'image/webp' ? 'webp' : 'jpg';
  const ruta = `banco/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  try {
    const bytes = new Uint8Array(await archivo.arrayBuffer());
    const file = bucket.file(ruta);
    await file.save(Buffer.from(bytes), { contentType: archivo.type, public: true });
    await file.makePublic();
    const url = `https://storage.googleapis.com/${bucket.name}/${ruta}`;

    const doc = await db().collection('imagenes').add({
      url,
      nombre: nombreOriginal,
      origen: 'subida',
      creadoEn: FieldValue.serverTimestamp(),
    });

    return new Response(JSON.stringify({ id: doc.id, url, nombre: nombreOriginal }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'No se pudo subir la imagen.';
    return new Response(JSON.stringify({ error: msg }), { status: 500 });
  }
};
