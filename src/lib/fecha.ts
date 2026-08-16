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

export function formatFecha(d: Date | null): string {
  if (!d || Number.isNaN(d.getTime())) return 'Sin fecha';
  return new Intl.DateTimeFormat('es-AR', { dateStyle: 'short' }).format(d);
}
