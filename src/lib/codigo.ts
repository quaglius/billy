import { db } from './firebase-admin';

const ALFABETO = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function candidato(): string {
  let out = '';
  for (let i = 0; i < 5; i++) {
    out += ALFABETO[Math.floor(Math.random() * ALFABETO.length)];
  }
  return out;
}

export async function generarCodigoActividad(): Promise<string> {
  const col = db().collection('actividades');
  for (let i = 0; i < 50; i++) {
    const codigo = candidato();
    const snap = await col.where('codigo', '==', codigo).limit(1).get();
    if (snap.empty) return codigo;
  }
  throw new Error('No se pudo generar un código único de actividad.');
}
