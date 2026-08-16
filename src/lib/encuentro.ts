export function fechaDeDoc(value: unknown): Date {
  if (value && typeof value === 'object' && 'toDate' in value && typeof (value as { toDate: () => Date }).toDate === 'function') {
    return (value as { toDate: () => Date }).toDate();
  }
  return new Date(value as string | number | Date);
}

export function toDatetimeLocal(d: Date): string {
  if (Number.isNaN(d.getTime())) return '';
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function formatFechaEncuentro(d: Date): string {
  if (Number.isNaN(d.getTime())) return 'Sin fecha';
  return new Intl.DateTimeFormat('es-AR', { dateStyle: 'short', timeStyle: 'short' }).format(d);
}

export function estadoEncuentro(
  fechaHora: Date,
  duracionMinutos: number | null,
  ahora: Date = new Date(),
): 'completado' | 'en curso' | 'próximo' {
  const duracion = duracionMinutos ?? 120;
  const fin = new Date(fechaHora.getTime() + duracion * 60 * 1000);
  if (fin.getTime() < ahora.getTime()) return 'completado';
  if (fechaHora.getTime() > ahora.getTime()) return 'próximo';
  return 'en curso';
}
