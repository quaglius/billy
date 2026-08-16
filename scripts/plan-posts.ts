import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export type PostSemilla = {
  n: number;
  slug: string;
  titulo: string;
  bajada: string;
  keywordPrincipal: string;
  cuerpoMd: string;
  publicar: boolean;
  publicadoEn: Date | null;
};

const SLUGS: Record<number, { slug: string; keywordPrincipal: string; publicar: boolean; publicadoEn: string | null }> =
  {
    1: {
      slug: 'salud-mental-laboral-desde-el-piso',
      keywordPrincipal: 'salud mental laboral Argentina',
      publicar: true,
      publicadoEn: '2026-06-15T12:00:00-03:00',
    },
    2: {
      slug: 'delegado-sindical-salud-mental',
      keywordPrincipal: 'delegado sindical salud mental',
      publicar: true,
      publicadoEn: '2026-07-06T12:00:00-03:00',
    },
    3: {
      slug: 'ludopatia-en-el-trabajo',
      keywordPrincipal: 'ludopatía en el trabajo',
      publicar: true,
      publicadoEn: '2026-07-13T12:00:00-03:00',
    },
    4: {
      slug: 'consumo-de-alcohol-en-el-trabajo',
      keywordPrincipal: 'consumo de alcohol en el trabajo',
      publicar: true,
      publicadoEn: '2026-07-20T12:00:00-03:00',
    },
    5: {
      slug: 'presentismo-laboral',
      keywordPrincipal: 'presentismo laboral',
      publicar: true,
      publicadoEn: '2026-06-29T12:00:00-03:00',
    },
    6: {
      slug: 'protocolo-salud-mental-laboral-srt-2026',
      keywordPrincipal: 'protocolo salud mental laboral SRT 2026',
      publicar: false,
      publicadoEn: null,
    },
    7: {
      slug: 'condiciones-y-medio-ambiente-de-trabajo-cymat',
      keywordPrincipal: 'condiciones y medio ambiente de trabajo CyMAT',
      publicar: true,
      publicadoEn: '2026-06-22T12:00:00-03:00',
    },
    8: {
      slug: 'inteligencia-artificial-salud-mental-trabajo',
      keywordPrincipal: 'inteligencia artificial y salud mental en el trabajo',
      publicar: true,
      publicadoEn: '2026-07-27T12:00:00-03:00',
    },
    9: {
      slug: 'generacion-z-salud-mental-trabajo',
      keywordPrincipal: 'generación Z salud mental trabajo',
      publicar: true,
      publicadoEn: '2026-08-03T12:00:00-03:00',
    },
    10: {
      slug: '25-anos-escuchando-al-mundo-del-trabajo',
      keywordPrincipal: 'salud mental en el trabajo Argentina',
      publicar: true,
      publicadoEn: '2026-06-08T12:00:00-03:00',
    },
  };

function recortar(bloque: string, desde: string, hasta: string[]): string {
  const i = bloque.indexOf(desde);
  if (i < 0) return '';
  let rest = bloque.slice(i + desde.length);
  let cut = rest.length;
  for (const marca of hasta) {
    const j = rest.indexOf(marca);
    if (j >= 0 && j < cut) cut = j;
  }
  return rest.slice(0, cut).trim();
}

export function postsDesdePlan(): PostSemilla[] {
  const root = join(dirname(fileURLToPath(import.meta.url)), '..');
  const plan = readFileSync(join(root, 'blog-content-plan.md'), 'utf8');
  const seccion = plan.split('## 7. Redacción completa de los 10 posts')[1];
  if (!seccion) throw new Error('No encontré la sección 7 en blog-content-plan.md');

  const bloques = seccion.split(/(?=### Post \d+ —)/).filter((b) => /^### Post \d+ —/.test(b.trim()));
  if (bloques.length !== 10) throw new Error(`Esperaba 10 posts en la sección 7, encontré ${bloques.length}`);

  return bloques.map((bloque) => {
    const n = Number(/^### Post (\d+)/.exec(bloque.trim())?.[1]);
    const meta = SLUGS[n];
    if (!meta) throw new Error(`Post ${n} sin slug`);

    const titulo = /^### Post \d+ —\s*(.+)$/m.exec(bloque)?.[1]?.trim();
    if (!titulo) throw new Error(`Post ${n} sin título`);

    const bajada = /\*\*Bajada:\*\*\s*(.+)/.exec(bloque)?.[1]?.trim();
    if (!bajada) throw new Error(`Post ${n} sin bajada`);

    let cuerpo = recortar(bloque, '**Cuerpo del post:**', [
      '**Sobre Guillermo Nuesch:**',
      '**Versión LinkedIn:**',
    ]);
    if (cuerpo.length < 400) throw new Error(`Post ${n} con cuerpo demasiado corto`);

    if (n === 6) {
      cuerpo = `> ⚠️ **No publicar sin verificar el texto completo de la Resolución 8/2026 de la SRT contra el Boletín Oficial.**\n\n${cuerpo}`;
    }

    const fuentes = /\*\*Fuentes:\*\*\s*(.+)/.exec(bloque)?.[1]?.trim();
    if (fuentes) cuerpo += `\n\n## Fuentes\n\n${fuentes}`;

    cuerpo += '\n\n[Si necesitás ayuda](/ayuda)';

    return {
      n,
      slug: meta.slug,
      titulo,
      bajada,
      keywordPrincipal: meta.keywordPrincipal,
      cuerpoMd: cuerpo,
      publicar: meta.publicar,
      publicadoEn: meta.publicadoEn ? new Date(meta.publicadoEn) : null,
    };
  });
}
