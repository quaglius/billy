import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { FieldValue } from 'firebase-admin/firestore';
import { db } from '../../../../lib/firebase-admin';

// Firebase Storage exige el plan Blaze (con tarjeta) desde el 3/2/2026, sin excepción aunque
// el uso sea $0 — Firestore, en cambio, sigue siendo gratis en el plan Spark. Por eso las
// imágenes NO van a Storage: se comprimen acá y se guardan como base64 adentro del propio
// documento de Firestore, con un límite duro de 1 MiB por documento. Se sirven después vía
// /img/[id].ts, con caché largo, para no pegarle a Firestore en cada visita.
const TIPOS_PERMITIDOS = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SUBIDA_BYTES = 15 * 1024 * 1024; // 15MB en crudo, tal como llega del celular
const MAX_COMPRIMIDO_BYTES = 650 * 1024; // ~650KB comprimido -> ~870KB en base64, con margen bajo 1 MiB

async function comprimir(buffer: Buffer): Promise<Buffer> {
  const base = () => sharp(buffer).rotate().resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true });

  let calidad = 82;
  let out = await base().jpeg({ quality: calidad, mozjpeg: true }).toBuffer();
  while (out.length > MAX_COMPRIMIDO_BYTES && calidad > 35) {
    calidad -= 12;
    out = await base().jpeg({ quality: calidad, mozjpeg: true }).toBuffer();
  }
  if (out.length > MAX_COMPRIMIDO_BYTES) {
    out = await sharp(buffer)
      .rotate()
      .resize({ width: 1000, height: 1000, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 45, mozjpeg: true })
      .toBuffer();
  }
  return out;
}

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
  if (archivo.size > MAX_SUBIDA_BYTES) {
    return new Response(JSON.stringify({ error: 'La imagen pesa más de 15MB. Achicala e intentá de nuevo.' }), { status: 400 });
  }

  const nombreOriginal = String(form.get('nombre') ?? archivo.name ?? 'imagen').slice(0, 80);

  let comprimida: Buffer;
  try {
    const original = Buffer.from(new Uint8Array(await archivo.arrayBuffer()));
    comprimida = await comprimir(original);
  } catch {
    return new Response(JSON.stringify({ error: 'No se pudo procesar la imagen. Probá con otro archivo.' }), { status: 400 });
  }

  if (comprimida.length > MAX_COMPRIMIDO_BYTES) {
    return new Response(
      JSON.stringify({ error: 'La imagen sigue pesando demasiado incluso comprimida. Probá con una foto más simple o ya redimensionada.' }),
      { status: 400 },
    );
  }

  try {
    const ref = db().collection('imagenes').doc();
    const url = `/img/${ref.id}`;
    await ref.set({
      nombre: nombreOriginal,
      origen: 'firestore',
      mime: 'image/jpeg',
      datosBase64: comprimida.toString('base64'),
      bytes: comprimida.length,
      url,
      creadoEn: FieldValue.serverTimestamp(),
    });

    return new Response(JSON.stringify({ id: ref.id, url, nombre: nombreOriginal }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'No se pudo guardar la imagen.';
    return new Response(JSON.stringify({ error: msg }), { status: 500 });
  }
};
