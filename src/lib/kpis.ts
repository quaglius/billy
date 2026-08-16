// Helper de meses para los graficos evolutivos de los listados admin (Empresas, Instancias).
// No depende de Observatorio: es mas simple, solo cuenta documentos por mes de creacion.
export type MesBucket = { etiqueta: string; pertenece: (d: Date) => boolean };

const MESES_CORTOS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

export function ultimosNMeses(n: number, ahora: Date = new Date()): MesBucket[] {
  const out: MesBucket[] = [];
  for (let i = n - 1; i >= 0; i -= 1) {
    const y = ahora.getFullYear();
    const m = ahora.getMonth() - i;
    const inicio = new Date(y, m, 1);
    const fin = new Date(y, m + 1, 1);
    out.push({
      etiqueta: `${MESES_CORTOS[inicio.getMonth()]} ${String(inicio.getFullYear()).slice(2)}`,
      pertenece: (d: Date) => d >= inicio && d < fin,
    });
  }
  return out;
}
