import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { FieldValue, Timestamp, getFirestore } from 'firebase-admin/firestore';
import { generarCodigoActividad } from '../src/lib/codigo';
import { postsDesdePlan } from './plan-posts';

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
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
}

const posts = postsDesdePlan();

const testimonios = [
  {
    cita: 'Guillermo nos ayudó a abrir un tema que durante años fue tabú en el sindicato. Los delegados hoy tienen herramientas concretas para acompañar a un compañero, y eso cambió la forma en que se manejan los conflictos en planta.',
    organizacion: 'SITOS',
    orden: 1,
  },
  {
    cita: 'Lo contratamos para una charla puntual y terminamos armando un programa de varios meses. La diferencia con otras capacitaciones es que no se queda en la teoría: da herramientas que los mandos medios usan al día siguiente.',
    organizacion: 'Fundación Provincia ART',
    orden: 2,
  },
  {
    cita: 'Trabajamos con Guillermo desde hace años en distintas líneas. Lo que más valoramos es la cercanía: entiende la realidad del trabajador ferroviario, no llega con un power point genérico.',
    organizacion: 'Trenes Argentinos Línea Roca',
    orden: 3,
  },
];

async function main() {
  init();
  const db = getFirestore();
  const now = FieldValue.serverTimestamp();

  const curso1 = {
    slug: 'prevencion-consumos-problematicos-ambito-laboral',
    titulo: 'Prevención de consumos problemáticos en el ámbito laboral',
    descripcionCorta: 'Un espacio para hablar de lo que habitualmente no se habla, con todo el personal.',
    descripcion:
      'Un espacio para hablar de lo que habitualmente no se habla. Trabajamos sobre las ideas que cada uno trae sobre el consumo de sustancias, cómo esas ideas condicionan lo que hacemos cuando un compañero está en problemas, y qué podemos hacer concretamente desde nuestro lugar de trabajo. No se trata de convertir a nadie en especialista: se trata de que nadie se quede sin saber qué hacer.',
    formato: 'encuentro',
    duracionTexto: '90 minutos a media jornada',
    dirigidoA: 'todo el personal, sin distinción de rango ni sector',
    objetivos: [
      'Reconocer las representaciones sociales propias sobre el consumo y ponerlas en discusión',
      'Diferenciar consumo, consumo problemático y adicción',
      'Identificar factores de riesgo y de cuidado en el propio ámbito de trabajo',
      'Saber qué hacer y qué no hacer frente a la situación de un compañero',
    ],
    temario: [
      'Qué nos viene a la cabeza cuando decimos "droga"',
      'Consumo, consumo problemático y adicción: por qué la diferencia importa',
      'El trabajo como lugar de cuidado (y a veces de riesgo)',
      'Señales de alerta: qué se ve y qué no se ve',
      'Qué puedo hacer yo: escuchar, acompañar, derivar',
      'A dónde se puede recurrir',
    ],
  };
  const curso2 = {
    slug: 'taller-delegados-mandos-medios',
    titulo: 'Taller para delegados y mandos medios: detectar, escuchar, derivar',
    descripcionCorta: 'Herramientas concretas para quien tiene gente a cargo o representa a sus compañeros.',
    descripcion:
      'Quien tiene gente a cargo o representa a sus compañeros suele ser el primero en darse cuenta de que algo pasa. Y también el que más solo se siente cuando eso pasa. Este taller da herramientas concretas: cómo abrir una conversación difícil, qué decir y qué no, hasta dónde llega tu rol, cuándo y a dónde derivar, y cómo cuidarte vos en el proceso.',
    formato: 'taller',
    duracionTexto: '1 a 2 jornadas',
    dirigidoA: 'delegados sindicales, supervisores, jefes de área, RRHH',
    objetivos: [
      'Distinguir el rol de acompañar del rol de diagnosticar',
      'Manejar una primera conversación sin invadir ni minimizar',
      'Conocer los circuitos de derivación disponibles',
      'Reconocer el desgaste propio de quien acompaña',
    ],
    temario: [
      'El lugar incómodo del que se da cuenta primero',
      'Señales de alerta: cambios de conducta, ausentismo, presentismo',
      'Cómo se abre una conversación (y cómo no)',
      'Qué NO hacer: diagnosticar, prometer confidencialidad absoluta, amenazar',
      'Marco normativo: qué protege al trabajador, qué obliga a la organización',
      'Circuitos de derivación: Línea 141 y red pública',
      'El cuidado de quien cuida',
    ],
  };
  const curso3 = {
    slug: 'programa-integral-prevencion-cuidado',
    titulo: 'Programa integral de prevención y cuidado',
    descripcionCorta: 'Dos o tres meses para dejar un protocolo propio y referentes internos formados.',
    descripcion:
      'No alcanza con una charla. Este programa acompaña a la organización durante dos o tres meses para construir algo que quede: un protocolo propio de actuación, referentes internos formados, y un espacio instalado donde se pueda hablar del tema. Al final, la organización no depende de que yo vuelva.',
    formato: 'programa',
    duracionTexto: '2 a 3 meses, encuentros quincenales',
    dirigidoA: 'la organización completa, en cohortes por área o turno',
    objetivos: [
      'Diagnóstico inicial de la organización',
      'Ciclo de encuentros con la organización completa',
      'Elaboración de un protocolo propio de actuación',
    ],
    temario: [
      'Diagnóstico y apertura',
      'Marco conceptual',
      'Condiciones y medio ambiente de trabajo',
      'Detección y primera intervención',
      'Marco normativo y circuitos',
      'Construcción del protocolo y cierre',
    ],
  };

  async function upsertCurso(id: string, data: typeof curso1) {
    await db
      .collection('cursos')
      .doc(id)
      .set({
        ...data,
        imagenPortadaUrl: null,
        adjuntos: [],
        publicado: true,
        creadoEn: now,
        actualizadoEn: now,
      });
  }

  await upsertCurso('curso-encuentro', curso1);
  await upsertCurso('curso-taller', curso2);
  await upsertCurso('curso-programa', curso3);

  for (const p of posts) {
    const existente = await db.collection('posts').where('slug', '==', p.slug).limit(1).get();
    const payload = {
      slug: p.slug,
      titulo: p.titulo,
      bajada: p.bajada,
      keywordPrincipal: p.keywordPrincipal,
      cuerpoMd: p.cuerpoMd,
      estado: p.publicar ? 'publicado' : 'borrador',
      publicadoEn: p.publicar && p.publicadoEn ? Timestamp.fromDate(p.publicadoEn) : null,
      actualizadoEn: now,
    };
    if (existente.empty) {
      await db.collection('posts').add({
        ...payload,
        imagenPortadaUrl: null,
        creadoEn: now,
      });
    } else {
      await existente.docs[0]!.ref.set(payload, { merge: true });
    }
    console.log(`post ${p.slug} → ${payload.estado}`);
  }

  for (const t of testimonios) {
    const existente = await db.collection('testimonios').where('organizacion', '==', t.organizacion).limit(1).get();
    if (existente.empty) {
      await db.collection('testimonios').add({
        ...t,
        autorNombre: null,
        autorCargo: null,
        esPlaceholder: true,
      });
    }
  }

  const empRef = db.collection('empresas').doc('org-ejemplo');
  await empRef.set({
    nombre: 'Organización de ejemplo',
    slug: 'organizacion-de-ejemplo',
    rubro: 'demo',
    logoUrl: null,
    contactoNombre: null,
    contactoEmail: null,
    contactoTelefono: null,
    notasInternas: 'Empresa demo para probar el flujo en vivo. No pública.',
    creadoEn: now,
  });

  const instRef = db.collection('instancias').doc('demo-encuentro');
  await instRef.set({
    cursoId: 'curso-encuentro',
    empresaId: 'org-ejemplo',
    slug: 'demo-organizacion-ejemplo',
    tituloParticular: null,
    particularidades: null,
    visibilidad: 'privada',
    fechaInicio: null,
    fechaFin: null,
    modalidad: 'presencial',
    creadoEn: now,
  });

  const enc1 = db.collection('encuentros').doc('demo-enc-1');
  await enc1.set({
    instanciaId: 'demo-encuentro',
    orden: 1,
    titulo: 'Encuentro 1: Diagnóstico y apertura',
    fechaHora: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    duracionMinutos: 120,
    descripcion: 'Encuentro de demostración',
  });

  const enc2 = db.collection('encuentros').doc('demo-enc-2');
  await enc2.set({
    instanciaId: 'demo-encuentro',
    orden: 2,
    titulo: 'Taller demo: detectar, escuchar, derivar',
    fechaHora: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    duracionMinutos: 120,
    descripcion: null,
  });

  const acts1 = [
    { orden: 1, tipo: 'texto_libre', consigna: '¿Cuál es la primera palabra que se te viene a la cabeza cuando escuchás "droga"?', opciones: null, cursoId: 'curso-encuentro' },
    {
      orden: 2,
      tipo: 'seleccion_multiple',
      consigna: '¿Cuáles de estas considerás que son sustancias que pueden generar un consumo problemático?',
      opciones: ['Alcohol', 'Tabaco', 'Medicamentos recetados (ansiolíticos, para dormir)', 'Bebidas energizantes', 'Marihuana', 'Cocaína', 'Apuestas online'],
      cursoId: 'curso-encuentro',
    },
    { orden: 3, tipo: 'si_no', consigna: '¿Alguna vez te preocupaste por un compañero de trabajo, pero no supiste qué hacer?', opciones: null, cursoId: 'curso-encuentro' },
    {
      orden: 4,
      tipo: 'seleccion_multiple',
      consigna: '¿Cuáles de estas situaciones están presentes en tu trabajo?',
      opciones: ['Turnos rotativos o trabajo nocturno', 'Presión por tiempos de entrega o de respuesta', 'Exposición a situaciones de riesgo o de violencia', 'Trabajo aislado o en soledad', 'Poco reconocimiento por lo que hago', 'Dificultad para desconectar fuera del horario', 'Ninguna de las anteriores'],
      cursoId: 'curso-encuentro',
    },
    {
      orden: 5,
      tipo: 'seleccion_unica',
      consigna: 'Un compañero te cuenta que está teniendo un problema con el consumo. ¿Qué es lo primero que harías?',
      opciones: ['Aconsejarle que deje', 'Hablarlo con el jefe o con el delegado', 'Escucharlo y preguntarle qué necesita', 'Recomendarle un especialista', 'No meterme, es su vida'],
      cursoId: 'curso-encuentro',
    },
    { orden: 6, tipo: 'texto_libre', consigna: 'En una palabra: ¿con qué te vas de este encuentro?', opciones: null, cursoId: 'curso-encuentro' },
  ];

  const acts2 = [
    { orden: 1, tipo: 'si_no', consigna: '¿Sentiste alguna vez que tenías que resolver solo una situación para la que no estabas preparado?', opciones: null, cursoId: 'curso-taller' },
    {
      orden: 2,
      tipo: 'seleccion_multiple',
      consigna: '¿Cuáles de estas señales te parecen motivo para acercarte a un compañero?',
      opciones: ['Llega tarde o falta más seguido que antes', 'Cambió el humor, está más irritable', 'Se aisló del grupo', 'Bajó la calidad de su trabajo', 'Pidió adelantos de sueldo varias veces', 'Descuidó su aspecto personal', 'Tuvo un accidente o un cuasi-accidente'],
      cursoId: 'curso-taller',
    },
    { orden: 3, tipo: 'texto_libre', consigna: '¿Con qué frase abrirías la conversación con ese compañero?', opciones: null, cursoId: 'curso-taller' },
    {
      orden: 4,
      tipo: 'seleccion_unica',
      consigna: 'Un compañero te pide que no le cuentes a nadie lo que te está por decir. ¿Qué respondés?',
      opciones: ['"Quedate tranquilo, no le digo a nadie"', '"No te puedo prometer eso, pero sí te puedo prometer que no voy a hacer nada sin avisarte"', '"Depende de lo que me digas"', '"Lo tengo que informar igual"'],
      cursoId: 'curso-taller',
    },
    { orden: 5, tipo: 'numero', consigna: 'Del 1 al 10, ¿cuánto sentís que te afecta personalmente acompañar estas situaciones?', opciones: null, cursoId: 'curso-taller' },
  ];

  // Las actividades viven directamente del curso, con código y QR permanentes — no se clonan
  // por instancia. Sembramos una sola vez por curso; "Renovar" (sesionDesde) se resetea sola
  // cada vez que alguien la usa, así que acá arranca en `creadoEn`.
  async function seedActividades(cursoId: string, items: typeof acts1) {
    const existentes = await db.collection('actividades').where('cursoId', '==', cursoId).get();
    if (!existentes.empty) return;
    for (const item of items) {
      const codigo = await generarCodigoActividad();
      await db.collection('actividades').add({
        cursoId,
        codigo,
        tipo: item.tipo,
        consigna: item.consigna,
        opciones: item.opciones,
        orden: item.orden,
        sesionDesde: now,
        creadoEn: now,
      });
    }
  }

  await seedActividades('curso-encuentro', acts1);
  await seedActividades('curso-taller', acts2);

  console.log('Seed OK: cursos, posts, testimonios, instancia demo y actividades (con QR permanente por curso).');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
