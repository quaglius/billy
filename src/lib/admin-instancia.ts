export function etiquetaInstancia(
  data: { tituloParticular?: unknown },
  cursoTitulo?: string,
  empresaNombre?: string,
): string {
  const titulo = String(data.tituloParticular ?? '').trim();
  if (titulo) return titulo;
  if (cursoTitulo && empresaNombre) return `${cursoTitulo} — ${empresaNombre}`;
  return cursoTitulo || 'Instancia';
}

export function rutasInstancia(instanciaId: string) {
  const base = `/admin/instancias/${instanciaId}`;
  return {
    ficha: base,
    duplicar: `${base}/duplicar`,
  };
}

export type Miga = { href?: string; label: string };

type PaginaInstancia = 'listado' | 'ficha' | 'duplicar';

export function migasInstancia(args: {
  pagina: PaginaInstancia;
  instanciaId?: string;
  instanciaLabel?: string;
}): Miga[] {
  const admin = { href: '/admin', label: 'Admin' };
  const listado = { href: '/admin/instancias', label: 'Instancias' };

  if (args.pagina === 'listado') {
    return [admin, { label: 'Instancias' }];
  }

  const instanciaId = args.instanciaId ?? '';
  const nombre = args.instanciaLabel || 'Instancia';
  const fichaHref = `/admin/instancias/${instanciaId}`;

  if (args.pagina === 'ficha') {
    return [admin, listado, { label: nombre }];
  }

  return [admin, listado, { href: fichaHref, label: nombre }, { label: 'Duplicar' }];
}

export function estadoInstancia(
  fechaInicio: Date | null,
  fechaFin: Date | null,
  ahora: Date = new Date(),
): 'completado' | 'en curso' | 'próxima' | 'sin fecha' {
  if (!fechaInicio) return 'sin fecha';
  const fin = fechaFin ?? fechaInicio;
  if (fin.getTime() < ahora.getTime()) return 'completado';
  if (fechaInicio.getTime() > ahora.getTime()) return 'próxima';
  return 'en curso';
}
