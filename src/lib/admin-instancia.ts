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
  };
}

export type Miga = { href?: string; label: string };

type PaginaInstancia = 'listado' | 'cronograma' | 'duplicar' | 'encuentro';

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

  const encuentroLabel = args.encuentroLabel || 'Encuentro';
  return [admin, listado, inst, cronograma, { label: encuentroLabel }];
}
