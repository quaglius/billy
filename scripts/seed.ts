import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import { generarCodigoActividad } from '../src/lib/codigo';

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

function esqueleto(opts: {
  angulo: string;
  idea: string;
  dato: string;
  fuente: string;
  avisoSrt?: boolean;
}): string {
  const aviso = opts.avisoSrt
    ? `> ⚠️ **No publicar sin verificar el texto completo de la Resolución 8/2026 de la SRT contra el Boletín Oficial.** Ver blog-content-plan.md, post #6.\n\n`
    : '';
  return `${aviso}> **Borrador — pendiente de redacción final.** Este texto es un esqueleto armado a partir del brief de contenido, no la nota terminada.

## ${opts.angulo}

${opts.idea}

### El dato

> ${opts.dato}

Fuente: ${opts.fuente}

### Desarrollo

<!-- TODO: desarrollar el cuerpo del artículo. No inventar estadísticas, cifras ni citas normativas que no estén en blog-content-plan.md o guillermo-perfil.md. -->

### Para seguir leyendo

- [Ayuda: Línea 141 y recursos de derivación](/ayuda)
`;
}

const posts = [
  {
    slug: 'salud-mental-laboral-desde-el-piso',
    titulo: 'Lo que nadie te cuenta de la salud mental laboral: la mirada desde el piso, no desde la oficina',
    bajada:
      'Casi todo el bienestar laboral habla de oficinas. Guillermo escribe desde 25 años con guardas, casinos y sindicatos: el piso, no el escritorio.',
    keywordPrincipal: 'salud mental laboral Argentina',
    cuerpoMd: esqueleto({
      angulo: 'casi todo el contenido de 2026 habla de oficinas; Guillermo escribe desde 25 años con guardas de tren, saneamiento, casinos, penitenciarios.',
      idea: 'Contrastar las estadísticas de burnout "de oficina" (ej. datos de Wellhub sobre estrés/burnout en Argentina) con la experiencia real de trabajadores operativos y de servicios esenciales, donde el discurso de bienestar casi no llega. Reflexión: el bienestar laboral no puede ser un beneficio de oficina con pelota de yoga, tiene que llegar también al que maneja un tren o recolecta residuos.',
      dato: 'cifras de estrés/burnout en Argentina 2026 (fuente: notas de Wellhub sobre bienestar laboral 2026).',
      fuente: 'notas de Wellhub sobre bienestar laboral 2026',
    }),
  },
  {
    slug: 'delegado-sindical-salud-mental',
    titulo: 'El delegado sindical como primera línea de cuidado: una guía práctica',
    bajada:
      'Nadie escribió una guía de primeros auxilios psicológicos para el delegado gremial argentino. Cómo abrir la charla, qué no decir y cuándo derivar.',
    keywordPrincipal: 'delegado sindical salud mental',
    cuerpoMd: esqueleto({
      angulo: 'nadie escribió una guía de primeros auxilios psicológicos pensada específicamente para el delegado gremial argentino.',
      idea: 'A partir de su experiencia con SITOS y otros sindicatos, proponer un mini-protocolo: cómo abrir una conversación difícil con un compañero, qué NO decir, cuándo derivar, cómo cuidarse el delegado a sí mismo (el "cuidado de quien cuida"). Diferenciar el rol del delegado del rol del profesional de salud mental (no diagnostica, acompaña y deriva).',
      dato: 'marco de primeros auxilios psicológicos (PAP) usado institucionalmente en Argentina (Ministerio de Trabajo, SRT).',
      fuente: 'Ministerio de Trabajo, SRT — marco de primeros auxilios psicológicos (PAP)',
    }),
  },
  {
    slug: 'ludopatia-en-el-trabajo',
    titulo: 'Ludopatía en el trabajo: la adicción silenciosa que nadie está mirando',
    bajada:
      'Mientras el país discute las apuestas online, en el trabajo ya se ven adelantos de sueldo, ausentismo e irritabilidad. Se previene como cualquier consumo.',
    keywordPrincipal: 'ludopatía en el trabajo',
    cuerpoMd: esqueleto({
      angulo: 'el debate 2026 es legislativo (proyectos en el Congreso sobre apuestas online); falta la lectura organizacional/preventiva.',
      idea: 'Explicar que mientras el país discute cómo regular las apuestas online, las empresas y sindicatos tienen un problema concreto y silencioso hoy: pedidos de adelanto de sueldo, ausentismo, irritabilidad, deudas. Dar señales de alerta específicas para mandos medios y una postura clara: esto se previene igual que cualquier otro consumo problemático, no es "un vicio menor".',
      dato: 'Las consultas por juego compulsivo a la Línea 141 de SEDRONAR crecieron 27% en 2025. Más de 1 de cada 4 estudiantes secundarios apostó dinero online en el último año (Observatorio Argentino de Drogas).',
      fuente: 'https://chequeado.com/el-explicador/en-2025-crecieron-un-27-las-consultas-por-juego-compulsivo-a-la-linea-141/ — Observatorio Argentino de Drogas',
    }),
  },
  {
    slug: 'consumo-de-alcohol-en-el-trabajo',
    titulo: 'El after office también se diseña: cómo prevenir sin prohibir',
    bajada:
      'El after office no es solo lifestyle: es política de prevención. Cómo diseñar eventos que no naturalicen el alcohol como condición para pertenecer.',
    keywordPrincipal: 'consumo de alcohol en el trabajo',
    cuerpoMd: esqueleto({
      angulo: 'las notas sobre after office/daycaps son de lifestyle; falta la lectura de prevención organizacional.',
      idea: 'Tomar la tendencia real de "consumo consciente" (daycaps, opciones sin alcohol) y traducirla a una guía para RRHH/mandos: cómo diseñar eventos de la empresa (aniversarios, fin de año, after office) que no naturalicen el consumo como parte de "pertenecer al equipo", sin caer en la prohibición vacía. Tono: no es sobre prohibir la fiesta, es sobre no dejar afuera al que no toma y no empujar al que ya tiene un problema.',
      dato: 'la tendencia de "after 0.0" / daycaps como señal de cambio cultural real en Argentina (nota de Vinomanos/Luján Hoy).',
      fuente: 'Vinomanos / Luján Hoy — tendencia after 0.0 y daycaps',
    }),
  },
  {
    slug: 'presentismo-laboral',
    titulo: "Presentismo: cuando 'estar siempre' es la primera señal de alarma",
    bajada:
      'El presentismo no es solo productividad: a veces se sostiene con café, energizantes, psicofármacos o alcohol para dormir. Hay que nombrarlo sin estigmatizar.',
    keywordPrincipal: 'presentismo laboral',
    cuerpoMd: esqueleto({
      angulo: 'se habla del presentismo como problema de productividad; falta la lectura clínica/preventiva de qué sostiene ese presentismo (estimulantes, ansiolíticos, alcohol nocturno "para bajar").',
      idea: 'Explicar la diferencia entre ausentismo y presentismo, y proponer una idea incómoda pero real de su experiencia de campo: mucha gente "aguanta" en el puesto gracias a sustancias (café en exceso, energizantes, psicofármacos sin control, alcohol para dormir), y eso rara vez se nombra como consumo problemático porque la persona "sigue rindiendo". Dar pautas para que un mando medio identifique este patrón sin estigmatizar.',
      dato: 'cifras de presentismo/burnout Argentina 2026 (Wellhub, Punto Biz).',
      fuente: 'Wellhub, Punto Biz — presentismo/burnout Argentina 2026',
    }),
  },
  {
    slug: 'protocolo-salud-mental-laboral-srt-2026',
    titulo: 'Qué dice (en criollo) el nuevo protocolo de salud mental laboral de la SRT',
    bajada:
      'La Resolución 8/2026 de la SRT es normativa reciente y casi no tiene explicación en lenguaje llano. Qué cambia para el trabajador, la empresa y la ART.',
    keywordPrincipal: 'protocolo salud mental laboral SRT 2026',
    cuerpoMd: esqueleto({
      avisoSrt: true,
      angulo: 'normativa muy reciente (enero 2026), casi sin contenido explicativo en lenguaje llano; oportunidad SEO de baja competencia y alta vigencia.',
      idea: 'Traducir en lenguaje simple qué cambia con el nuevo protocolo de servicios de psiquiatría/salud mental de la Superintendencia de Riesgos del Trabajo: qué implica para el trabajador, qué implica para la empresa/ART, y por qué esto refuerza (según su mirada) la necesidad de trabajar la prevención antes de que el caso llegue a una licencia. Es un post más "informativo/legal" pero con su bajada de prevención al final.',
      dato: 'Resolución 8/2026, Superintendencia de Riesgos del Trabajo (Boletín Oficial, 30/01/2026) y su relación con la Ley 26.657.',
      fuente: 'Boletín Oficial, 30/01/2026 — Resolución 8/2026 SRT; Ley 26.657',
    }),
  },
  {
    slug: 'condiciones-y-medio-ambiente-de-trabajo-cymat',
    titulo: 'CyMAT: la palabra técnica que explica por qué tu trabajo te enferma (o te cuida)',
    bajada:
      'CyMAT no es solo clima laboral: es organización del trabajo, ritmos y jerarquías. Cuando las condiciones son malas, el consumo a veces es una forma de aguantar.',
    keywordPrincipal: 'condiciones y medio ambiente de trabajo CyMAT',
    cuerpoMd: esqueleto({
      angulo: 'marco académico (Julio C. Neffa) clave en la formación de Guillermo (UBA), casi inexistente en formato blog accesible. Nicho SEO con poquísima competencia.',
      idea: 'Explicar en criollo el concepto de CyMAT (condiciones y medio ambiente de trabajo): no es solo "el clima laboral", incluye la organización del trabajo, los ritmos, las relaciones jerárquicas, el ambiente físico. Conectar con consumos problemáticos: cuando las condiciones de trabajo son malas, el consumo muchas veces aparece como forma de "aguantar" el puesto, no como una debilidad individual. Este post da autoridad académica al resto del contenido.',
      dato: 'marco conceptual de Julio César Neffa (CONICET/CEIL) sobre CyMAT, ya presente en la bibliografía del curso INAP/Sedronar.',
      fuente: 'Julio César Neffa (CONICET/CEIL) — CyMAT; bibliografía INAP/Sedronar',
    }),
  },
  {
    slug: 'inteligencia-artificial-salud-mental-trabajo',
    titulo: 'La incertidumbre por la IA también es un riesgo de salud mental laboral',
    bajada:
      'El 41% de los empleados en Argentina cree que la IA reemplazará su trabajo. Eso es un riesgo psicosocial, no solo un tema de capacitación técnica.',
    keywordPrincipal: 'inteligencia artificial y salud mental en el trabajo',
    cuerpoMd: esqueleto({
      angulo: 'la IA y el empleo se cubren como nota económica/tecnológica; falta la lectura de salud mental ocupacional.',
      idea: 'Partir del dato de que crece el temor al reemplazo laboral por IA en Argentina y leerlo como lo que es en su campo: un factor de riesgo psicosocial (incertidumbre, pérdida de sentido, ansiedad anticipatoria) que puede derivar en desgaste emocional y, en algunos casos, en consumos como forma de manejar esa ansiedad. Proponer que las organizaciones incorporen este tema a sus espacios de escucha, no solo a sus políticas de capacitación técnica.',
      dato: 'el 41% de los empleados en Argentina cree que la IA reemplazará su trabajo en el corto plazo (nota Infobae, abril 2026), subiendo desde 36% el año anterior.',
      fuente: 'Infobae, abril 2026 — temor al reemplazo laboral por IA en Argentina',
    }),
  },
  {
    slug: 'generacion-z-salud-mental-trabajo',
    titulo: 'Generación Z en trabajos que no son de oficina: lo que todavía no se está hablando',
    bajada:
      'La Gen Z prioriza la salud mental, pero en transporte, saneamiento y sector público no hay día de salud mental ni flexibilidad. La prevención necesita otro diseño.',
    keywordPrincipal: 'generación Z salud mental trabajo',
    cuerpoMd: esqueleto({
      angulo: 'el contenido sobre Gen Z y salud mental habla de flexibilidad/propósito de oficina; falta la mirada de jóvenes que entran a trabajos operativos, sindicalizados o del sector público, donde esos beneficios "de oficina" no existen.',
      idea: 'Usar el dato de que la Generación Z prioriza la salud mental por sobre el salario o la estabilidad, y preguntarse qué pasa con los jóvenes que entran a trabajar en rubros donde no hay "día de salud mental" ni flexibilidad horaria (transporte, saneamiento, salud, seguridad). Proponer que la prevención en estos ámbitos necesita otro diseño, no copiar el manual corporativo de oficina.',
      dato: '52% de la Generación Z en Argentina reporta altos niveles de estrés laboral diario, vs. 33% de baby boomers (nota sobre radiografía de Gen Z).',
      fuente: 'nota sobre radiografía de Gen Z — estrés laboral diario Argentina',
    }),
  },
  {
    slug: '25-anos-escuchando-al-mundo-del-trabajo',
    titulo: '25 años escuchando al mundo del trabajo: lo que cambió y lo que no cambió',
    bajada:
      'De tabú a tema instalado, pero todavía mal abordado. 25 años con Ministerio, ART, sindicatos y ferrocarril, y la misma premisa: lo peor es no hacer nada.',
    keywordPrincipal: 'salud mental en el trabajo Argentina',
    cuerpoMd: esqueleto({
      angulo: 'post de autoridad y marca personal, distinto a los otros 9 (que parten de un hueco de mercado). Sirve de "post ancla" para presentar quién es Guillermo y linkear a los demás.',
      idea: 'Recorrido personal por sus 25+ años de trabajo (Ministerio de Salud de la Provincia de Buenos Aires desde 1999, ART, sindicatos, sector ferroviario, casinos, saneamiento), qué cambió en la forma de hablar de salud mental y consumos en el trabajo (de tabú a tema instalado, pero todavía mal abordado en muchos ámbitos), y qué se mantiene igual (la premisa de que "lo peor que podemos hacer es no hacer nada"). Cierra presentando su propuesta de charlas/talleres/programas.',
      dato: 'ninguno externo necesario — el dato es su propia trayectoria (usar CV real del perfil).',
      fuente: 'guillermo-perfil.md — trayectoria de Guillermo Nuesch',
    }),
  },
];

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
      ...p,
      imagenPortadaUrl: null,
      estado: 'borrador',
      publicadoEn: null,
      creadoEn: now,
    };
    if (existente.empty) await db.collection('posts').add(payload);
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

  async function seedActs(encuentroId: string, instanciaId: string, items: typeof acts1) {
    const existentes = await db.collection('actividades').where('encuentroId', '==', encuentroId).get();
    if (!existentes.empty) return;
    for (const item of items) {
      const codigo = await generarCodigoActividad();
      await db.collection('actividades').add({
        encuentroId,
        instanciaId,
        cursoId: item.cursoId,
        codigo,
        tipo: item.tipo,
        consigna: item.consigna,
        opciones: item.opciones,
        orden: item.orden,
        activa: false,
        cerradaEn: null,
        creadoEn: now,
      });
    }
  }

  await seedActs('demo-enc-1', 'demo-encuentro', acts1);
  await seedActs('demo-enc-2', 'demo-encuentro', acts2);

  console.log('Seed OK: cursos, posts, testimonios, instancia demo y actividades.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
