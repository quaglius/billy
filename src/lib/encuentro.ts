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
