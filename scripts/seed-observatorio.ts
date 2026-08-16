import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { Timestamp, getFirestore } from 'firebase-admin/firestore';

function init() {
  if (getApps().length) return;
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const keyB64 = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_BASE64;
  if (!projectId || !keyB64) throw new Error('Faltan variables FIREBASE_*');
  const sa = JSON.parse(Buffer.from(keyB64, 'base64').toString('utf8'));
  initializeApp({
    credential: cert({
      projectId: sa.project_id ?? projectId,
      clientEmail: sa.client_email,
      privateKey: sa.private_key,
    }),
    projectId,
  });
}

function pickWeighted<T>(items: [T, number][], rand: () => number): T {
  const total = items.reduce((sum, [, w]) => sum + w, 0);
  let r = rand() * total;
  for (const [item, w] of items) {
    r -= w;
    if (r <= 0) return item;
  }
  return items[items.length - 1]![0];
}

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function fechaEnRango(i: number, n: number, rand: () => number): Date {
  const start = new Date('2026-06-02T11:00:00-03:00').getTime();
  const end = new Date('2026-08-14T18:30:00-03:00').getTime();
  const t = start + ((i + 0.15) / n) * (end - start) + (rand() - 0.5) * 36 * 60 * 60 * 1000;
  return new Date(Math.min(end, Math.max(start, t)));
}

type Valor =
  | { valor: boolean }
  | { valor: number }
  | { opcion: string }
  | { opciones: string[] };

type Target = {
  cursoId: string;
  tipo: string;
  match: string;
  n: number;
  valor: (i: number, rand: () => number) => Valor;
};

const TARGETS: Target[] = [
  {
    cursoId: 'curso-encuentro',
    tipo: 'si_no',
    match: 'preocupaste por un compañero',
    n: 42,
    valor: (_i, rand) => ({ valor: rand() < 0.78 }),
  },
  {
    cursoId: 'curso-encuentro',
    tipo: 'seleccion_unica',
    match: 'problema con el consumo',
    n: 40,
    valor: (_i, rand) => ({
      opcion: pickWeighted(
        [
          ['Escucharlo y preguntarle qué necesita', 18],
          ['Recomendarle un especialista', 9],
          ['Hablarlo con el jefe o con el delegado', 7],
          ['Aconsejarle que deje', 4],
          ['No meterme, es su vida', 2],
        ],
        rand,
      ),
    }),
  },
  {
    cursoId: 'curso-encuentro',
    tipo: 'seleccion_multiple',
    match: 'sustancias que pueden generar',
    n: 40,
    valor: (_i, rand) => {
      const pool: [string, number][] = [
        ['Alcohol', 0.88],
        ['Tabaco', 0.72],
        ['Medicamentos recetados (ansiolíticos, para dormir)', 0.48],
        ['Bebidas energizantes', 0.42],
        ['Marihuana', 0.38],
        ['Apuestas online', 0.34],
        ['Cocaína', 0.18],
      ];
      const opciones = pool.filter(([, p]) => rand() < p).map(([op]) => op);
      return { opciones: opciones.length ? opciones : ['Alcohol'] };
    },
  },
  {
    cursoId: 'curso-taller',
    tipo: 'si_no',
    match: 'resolver solo una situación',
    n: 38,
    valor: (_i, rand) => ({ valor: rand() < 0.71 }),
  },
];

async function main() {
  init();
  const db = getFirestore();
  const acts = await db.collection('actividades').get();

  let escritas = 0;
  for (const target of TARGETS) {
    const act = acts.docs.find((d) => {
      const data = d.data();
      return (
        String(data.cursoId) === target.cursoId &&
        String(data.tipo) === target.tipo &&
        String(data.consigna).toLowerCase().includes(target.match)
      );
    });
    if (!act) {
      console.warn(`No encontré actividad: ${target.cursoId} / ${target.match}`);
      continue;
    }

    const rand = mulberry32(target.match.length * 97 + target.n);
    const batch = db.batch();
    for (let i = 0; i < target.n; i += 1) {
      const token = `seed-obs-${act.id.slice(0, 8)}-${String(i).padStart(3, '0')}`;
      const ref = db.collection('respuestas').doc(`${act.id}_${token}`);
      batch.set(ref, {
        actividadId: act.id,
        cursoId: target.cursoId,
        valor: target.valor(i, rand),
        tokenNavegador: token,
        esSeed: true,
        creadoEn: Timestamp.fromDate(fechaEnRango(i, target.n, rand)),
      });
    }
    await batch.commit();
    escritas += target.n;
    console.log(`OK ${target.n} respuestas → ${act.id} (${target.tipo})`);
  }

  console.log(`Seed observatorio OK: ${escritas} respuestas anónimas en guille-nuesch.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
