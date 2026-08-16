import { db } from './firebase-admin';

export type PostPublico = {
  slug: string;
  titulo: string;
  bajada: string;
  imagenPortadaUrl: string | null;
  publicadoEn: Date | null;
};

function toDate(value: unknown): Date | null {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof value === 'object' && value !== null && 'toDate' in value) {
    const d = (value as { toDate: () => Date }).toDate();
    return d instanceof Date ? d : null;
  }
  return null;
}

function mapDocs(docs: { data: () => Record<string, unknown> }[]): PostPublico[] {
  return docs.map((d) => {
    const data = d.data();
    return {
      slug: String(data.slug ?? ''),
      titulo: String(data.titulo ?? ''),
      bajada: String(data.bajada ?? ''),
      imagenPortadaUrl: data.imagenPortadaUrl ? String(data.imagenPortadaUrl) : null,
      publicadoEn: toDate(data.publicadoEn) ?? toDate(data.creadoEn),
    };
  });
}

export async function listarPostsPublicados(): Promise<PostPublico[]> {
  try {
    const snap = await db()
      .collection('posts')
      .where('estado', '==', 'publicado')
      .orderBy('publicadoEn', 'desc')
      .get();
    return mapDocs(snap.docs);
  } catch {
    const snap = await db().collection('posts').where('estado', '==', 'publicado').get();
    return mapDocs(snap.docs);
  }
}

export function formatFecha(d: Date | null): { dia: string; mes: string; largo: string } {
  if (!d) return { dia: '—', mes: '', largo: '' };
  const dia = String(d.getDate()).padStart(2, '0');
  const mes = d.toLocaleDateString('es-AR', { month: 'short' }).replace('.', '');
  const largo = d.toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' });
  return { dia, mes, largo };
}
