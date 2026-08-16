import { agregarRespuestas, type ResultadoAgregado } from './resultados';

export const OBS_MIN = 30;

export type FiltrosObservatorio = {
  cursoId: string;
  desde: string;
  hasta: string;
};

export type CursoObs = { id: string; titulo: string };

export type ActividadObs = {
  id: string;
  cursoId: string;
  tipo: string;
  consigna: string;
  opciones: string[] | null;
};

export type RespuestaObs = {
  actividadId: string;
  cursoId: string;
  valor: unknown;
  creadoEn: Date;
};

export type BloqueObs = {
  key: string;
  cursoId: string;
  cursoTitulo: string;
  consigna: string;
  tipo: string;
  total: number;
  listo: boolean;
  agregado: ResultadoAgregado | null;
  actividadIds: string[];
};

export type ChartSpec = {
  id: string;
  tipo: 'bar' | 'doughnut' | 'line';
  titulo: string;
  labels: string[];
  values: number[];
  horizontal?: boolean;
};

export type DashboardObs = {
  filtros: FiltrosObservatorio;
  kpis: {
    participacionPct: number | null;
    consignasListas: number;
    consignasTotal: number;
    pctSi: number | null;
    siTotal: number;
    actividadesCargadas: number;
    respuestasEnRango: number;
  };
  porCurso: { etiqueta: string; cantidad: number }[];
  tendencia: { etiqueta: string; cantidad: number }[];
  siNo: { si: number; no: number } | null;
  bloques: BloqueObs[];
  charts: ChartSpec[];
};

const TIPO_LABEL: Record<string, string> = {
  si_no: 'Sí / No',
  seleccion_unica: 'Opción única',
  seleccion_multiple: 'Varias opciones',
  numero: 'Número',
  fecha: 'Fecha',
  texto_libre: 'Texto libre',
};

export function etiquetaTipo(tipo: string): string {
  return TIPO_LABEL[tipo] ?? tipo;
}

export function parseFiltros(params: URLSearchParams): FiltrosObservatorio {
  return {
    cursoId: (params.get('curso') ?? '').trim(),
    desde: (params.get('desde') ?? '').trim(),
    hasta: (params.get('hasta') ?? '').trim(),
  };
}

function parseDia(iso: string, finDelDia: boolean): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
  return new Date(`${iso}T${finDelDia ? '23:59:59.999' : '00:00:00'}-03:00`);
}

export function enRango(fecha: Date, filtros: FiltrosObservatorio): boolean {
  const desde = parseDia(filtros.desde, false);
  const hasta = parseDia(filtros.hasta, true);
  if (desde && fecha < desde) return false;
  if (hasta && fecha > hasta) return false;
  return true;
}

function fmtDia(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function fmtDiaCorto(iso: string): string {
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y?.slice(2) ?? ''}`;
}

function contarSiNo(docs: { valor: unknown }[]): { si: number; no: number } {
  let si = 0;
  let no = 0;
  for (const d of docs) {
    const v = d.valor;
    if (v && typeof v === 'object' && 'valor' in v) {
      if ((v as { valor: unknown }).valor === true) si += 1;
      else if ((v as { valor: unknown }).valor === false) no += 1;
    }
  }
  return { si, no };
}

export function armarDashboard(opts: {
  filtros: FiltrosObservatorio;
  cursos: CursoObs[];
  actividades: ActividadObs[];
  respuestas: RespuestaObs[];
}): DashboardObs {
  const { filtros, cursos } = opts;
  const cursoMap = new Map(cursos.map((c) => [c.id, c.titulo]));

  const actividades = filtros.cursoId
    ? opts.actividades.filter((a) => a.cursoId === filtros.cursoId)
    : opts.actividades;

  const actIds = new Set(actividades.map((a) => a.id));
  const respuestas = opts.respuestas.filter(
    (r) => actIds.has(r.actividadId) && enRango(r.creadoEn, filtros) && (!filtros.cursoId || r.cursoId === filtros.cursoId),
  );

  const porActividad = new Map<string, RespuestaObs[]>();
  for (const r of respuestas) {
    const list = porActividad.get(r.actividadId) ?? [];
    list.push(r);
    porActividad.set(r.actividadId, list);
  }

  const grupos = new Map<
    string,
    { cursoId: string; consigna: string; tipo: string; ids: string[]; docs: { valor: unknown }[] }
  >();
  for (const a of actividades) {
    const key = `${a.cursoId}::${a.consigna}`;
    const g = grupos.get(key) ?? {
      cursoId: a.cursoId,
      consigna: a.consigna,
      tipo: a.tipo,
      ids: [],
      docs: [],
    };
    g.ids.push(a.id);
    for (const r of porActividad.get(a.id) ?? []) g.docs.push({ valor: r.valor });
    grupos.set(key, g);
  }

  const bloques: BloqueObs[] = [...grupos.entries()].map(([key, g]) => {
    const total = g.docs.length;
    const listo = total >= OBS_MIN;
    return {
      key,
      cursoId: g.cursoId,
      cursoTitulo: cursoMap.get(g.cursoId) ?? 'Curso',
      consigna: g.consigna,
      tipo: g.tipo,
      total,
      listo,
      agregado: listo ? agregarRespuestas(g.tipo, g.docs) : null,
      actividadIds: g.ids,
    };
  });
  bloques.sort((a, b) => {
    if (a.listo !== b.listo) return a.listo ? -1 : 1;
    if (b.total !== a.total) return b.total - a.total;
    return a.consigna.localeCompare(b.consigna, 'es');
  });

  const consignasListas = bloques.filter((b) => b.listo).length;
  const consignasTotal = bloques.length;
  const participacionPct = consignasTotal ? Math.round((consignasListas / consignasTotal) * 100) : null;

  const siNoDocs: { valor: unknown }[] = [];
  for (const a of actividades) {
    if (a.tipo !== 'si_no') continue;
    for (const r of porActividad.get(a.id) ?? []) siNoDocs.push({ valor: r.valor });
  }
  const siNoCount = contarSiNo(siNoDocs);
  const siNoTotal = siNoCount.si + siNoCount.no;
  const siNo = siNoTotal >= OBS_MIN ? siNoCount : null;
  const pctSi = siNo && siNoTotal ? Math.round((siNo.si / siNoTotal) * 100) : null;

  const actividadesCargadas = actividades.length;

  const porCursoMap = new Map<string, number>();
  for (const r of respuestas) {
    const titulo = cursoMap.get(r.cursoId) ?? r.cursoId;
    porCursoMap.set(titulo, (porCursoMap.get(titulo) ?? 0) + 1);
  }
  const porCurso = [...porCursoMap.entries()]
    .map(([etiqueta, cantidad]) => ({ etiqueta, cantidad }))
    .sort((a, b) => b.cantidad - a.cantidad);

  const porDia = new Map<string, number>();
  for (const r of respuestas) {
    const key = fmtDia(r.creadoEn);
    porDia.set(key, (porDia.get(key) ?? 0) + 1);
  }
  const tendencia = [...porDia.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([etiqueta, cantidad]) => ({ etiqueta, cantidad }));

  const charts: ChartSpec[] = [];
  if (siNo) {
    charts.push({
      id: 'obs-chart-sino',
      tipo: 'doughnut',
      titulo: 'Sí / No en el recorte',
      labels: ['Sí', 'No'],
      values: [siNo.si, siNo.no],
    });
  }
  if (tendencia.length >= 2) {
    charts.push({
      id: 'obs-chart-tendencia',
      tipo: 'line',
      titulo: 'Respuestas por día',
      labels: tendencia.map((t) => fmtDiaCorto(t.etiqueta)),
      values: tendencia.map((t) => t.cantidad),
    });
  }
  if (porCurso.length >= 1 && !filtros.cursoId) {
    charts.push({
      id: 'obs-chart-cursos',
      tipo: 'bar',
      titulo: 'Respuestas por curso',
      labels: porCurso.map((c) => c.etiqueta),
      values: porCurso.map((c) => c.cantidad),
    });
  }

  bloques.forEach((b, i) => {
    if (!b.agregado) return;
    if (b.agregado.barras?.length) {
      charts.push({
        id: `obs-chart-act-${i}`,
        tipo: 'bar',
        titulo: b.consigna,
        labels: b.agregado.barras.map((x) => x.etiqueta),
        values: b.agregado.barras.map((x) => x.cantidad),
        horizontal: b.agregado.barras.some((x) => x.etiqueta.length > 22) || b.agregado.barras.length > 4,
      });
    } else if (b.agregado.numero?.histogram?.length) {
      charts.push({
        id: `obs-chart-act-${i}`,
        tipo: 'bar',
        titulo: b.consigna,
        labels: b.agregado.numero.histogram.map((x) => x.bucket),
        values: b.agregado.numero.histogram.map((x) => x.cantidad),
      });
    }
  });

  return {
    filtros,
    kpis: {
      participacionPct,
      consignasListas,
      consignasTotal,
      pctSi,
      siTotal: siNoTotal,
      actividadesCargadas,
      respuestasEnRango: respuestas.length,
    },
    porCurso,
    tendencia,
    siNo,
    bloques,
    charts,
  };
}
