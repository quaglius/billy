export function etiquetaInstancia(data: { tituloParticular?: unknown; slug?: unknown }): string {
  const titulo = String(data.tituloParticular ?? '').trim();
  return titulo || String(data.slug ?? 'Instancia');
}

export function rutasInstancia(instanciaId: string, encuentroId?: string) {
  const base = `/admin/instancias/${instanciaId}`;
  const encuentro = encuentroId ? `${base}/encuentros/${encuentroId}` : '';
  return {
    cronograma: base,
    duplicar: `${base}/duplicar`,
    encuentro,
    actividades: encuentro ? `${encuentro}/actividades` : '',
    vivo: encuentro ? `${encuentro}/vivo` : '',
    vivoDe: (actividadId: string) => (encuentro ? `${encuentro}/vivo?actividad=${actividadId}` : ''),
    imprimirDe: (actividadId: string) => (encuentro ? `${encuentro}/imprimir?actividad=${actividadId}` : ''),
  };
}

export type Miga = { href?: string; label: string };

type PaginaInstancia = 'listado' | 'cronograma' | 'duplicar' | 'encuentro' | 'actividades' | 'vivo';

export function migasInstancia(args: {
  pagina: PaginaInstancia;
  instanciaId?: string;
  instanciaLabel?: string;
  encuentroId?: string;
  encuentroLabel?: string;
}): Miga[] {
  const admin = { href: '/admin', label: 'Admin' };
  const listado = { href: '/admin/instancias', label: 'Instancias' };

  if (args.pagina === 'listado') {
    return [admin, { label: 'Instancias' }];
  }

  const instanciaId = args.instanciaId ?? '';
  const nombre = args.instanciaLabel || 'Instancia';
  const cronogramaHref = `/admin/instancias/${instanciaId}`;
  const inst = { href: cronogramaHref, label: nombre };
  const cronograma = { href: cronogramaHref, label: 'Cronograma' };

  if (args.pagina === 'cronograma') {
    return [admin, listado, inst, { label: 'Cronograma' }];
  }
  if (args.pagina === 'duplicar') {
    return [admin, listado, inst, { label: 'Duplicar' }];
  }

  const encuentroHref = `/admin/instancias/${instanciaId}/encuentros/${args.encuentroId ?? ''}`;
  const encuentroLabel = args.encuentroLabel || 'Encuentro';

  if (args.pagina === 'encuentro') {
    return [admin, listado, inst, cronograma, { label: encuentroLabel }];
  }
  if (args.pagina === 'actividades') {
    return [admin, listado, inst, cronograma, { href: encuentroHref, label: encuentroLabel }, { label: 'Actividades' }];
  }
  return [admin, listado, inst, cronograma, { href: encuentroHref, label: encuentroLabel }, { label: 'En vivo' }];
}
