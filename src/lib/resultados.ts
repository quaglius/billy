type Valor =
  | { valor: boolean }
  | { valor: number }
  | { valor: string }
  | { opcion: string }
  | { opciones: string[] };

export type ResultadoAgregado = {
  tipo: string;
  total: number;
  barras?: { etiqueta: string; cantidad: number; porcentaje: number }[];
  numero?: { promedio: number; min: number; max: number; histogram?: { bucket: string; cantidad: number }[] };
  semanas?: { semana: string; cantidad: number }[];
  palabras?: { palabra: string; cantidad: number }[];
};

function asValor(raw: unknown): Valor | null {
  if (!raw || typeof raw !== 'object') return null;
  return raw as Valor;
}

export function agregarRespuestas(tipo: string, docs: { valor: unknown }[]): ResultadoAgregado {
  const total = docs.length;
  if (tipo === 'si_no') {
    let si = 0;
    let no = 0;
    for (const d of docs) {
      const v = asValor(d.valor);
      if (v && 'valor' in v && v.valor === true) si += 1;
      else if (v && 'valor' in v && v.valor === false) no += 1;
    }
    return {
      tipo,
      total,
      barras: [
        { etiqueta: 'Sí', cantidad: si, porcentaje: total ? Math.round((si / total) * 100) : 0 },
        { etiqueta: 'No', cantidad: no, porcentaje: total ? Math.round((no / total) * 100) : 0 },
      ],
    };
  }

  if (tipo === 'seleccion_unica') {
    const counts = new Map<string, number>();
    for (const d of docs) {
      const v = asValor(d.valor);
      if (v && 'opcion' in v && typeof v.opcion === 'string') {
        counts.set(v.opcion, (counts.get(v.opcion) ?? 0) + 1);
      }
    }
    const barras = [...counts.entries()]
      .map(([etiqueta, cantidad]) => ({
        etiqueta,
        cantidad,
        porcentaje: total ? Math.round((cantidad / total) * 100) : 0,
      }))
      .sort((a, b) => b.cantidad - a.cantidad);
    return { tipo, total, barras };
  }

  if (tipo === 'seleccion_multiple') {
    const counts = new Map<string, number>();
    for (const d of docs) {
      const v = asValor(d.valor);
      if (v && 'opciones' in v && Array.isArray(v.opciones)) {
        for (const op of v.opciones) {
          counts.set(op, (counts.get(op) ?? 0) + 1);
        }
      }
    }
    const barras = [...counts.entries()]
      .map(([etiqueta, cantidad]) => ({
        etiqueta,
        cantidad,
        porcentaje: total ? Math.round((cantidad / total) * 100) : 0,
      }))
      .sort((a, b) => b.cantidad - a.cantidad);
    return { tipo, total, barras };
  }

  if (tipo === 'numero') {
    const nums: number[] = [];
    for (const d of docs) {
      const v = asValor(d.valor);
      if (v && 'valor' in v && typeof v.valor === 'number') nums.push(v.valor);
    }
    if (!nums.length) return { tipo, total: 0, numero: { promedio: 0, min: 0, max: 0 } };
    const min = Math.min(...nums);
    const max = Math.max(...nums);
    const promedio = nums.reduce((a, b) => a + b, 0) / nums.length;
    const numero: ResultadoAgregado['numero'] = { promedio, min, max };
    if (nums.length > 15) {
      const buckets = new Map<string, number>();
      for (const n of nums) {
        const key = String(Math.round(n));
        buckets.set(key, (buckets.get(key) ?? 0) + 1);
      }
      numero.histogram = [...buckets.entries()]
        .map(([bucket, cantidad]) => ({ bucket, cantidad }))
        .sort((a, b) => Number(a.bucket) - Number(b.bucket));
    }
    return { tipo, total, numero };
  }

  if (tipo === 'fecha') {
    const semanas = new Map<string, number>();
    for (const d of docs) {
      const v = asValor(d.valor);
      if (v && 'valor' in v && typeof v.valor === 'string') {
        const dt = new Date(`${v.valor}T00:00:00`);
        if (Number.isNaN(dt.getTime())) continue;
        const day = dt.getDay();
        const diff = (day + 6) % 7;
        const lunes = new Date(dt);
        lunes.setDate(dt.getDate() - diff);
        const key = lunes.toISOString().slice(0, 10);
        semanas.set(key, (semanas.get(key) ?? 0) + 1);
      }
    }
    return {
      tipo,
      total,
      semanas: [...semanas.entries()]
        .map(([semana, cantidad]) => ({ semana, cantidad }))
        .sort((a, b) => a.semana.localeCompare(b.semana)),
    };
  }

  const palabras = new Map<string, number>();
  for (const d of docs) {
    const v = asValor(d.valor);
    if (v && 'valor' in v && typeof v.valor === 'string') {
      const tokens = v.valor
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .split(/[^a-z0-9áéíóúñ]+/i)
        .filter((w) => w.length > 2);
      for (const t of tokens) palabras.set(t, (palabras.get(t) ?? 0) + 1);
    }
  }
  return {
    tipo,
    total,
    palabras: [...palabras.entries()]
      .map(([palabra, cantidad]) => ({ palabra, cantidad }))
      .sort((a, b) => b.cantidad - a.cantidad)
      .slice(0, 40),
  };
}
