import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import { IMAGENES_SEED } from '../src/lib/banco-imagenes';

function init() {
  if (getApps().length) return;
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const keyB64 = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_BASE64;
  if (!projectId || !keyB64) throw new Error('Faltan variables FIREBASE_*');
  const sa = JSON.parse(Buffer.from(keyB64, 'base64').toString('utf8'));
  initializeApp({
    credential: cert({ projectId: sa.project_id ?? projectId, clientEmail: sa.client_email, privateKey: sa.private_key }),
    projectId,
  });
}

async function main() {
  init();
  const db = getFirestore();
  let creadas = 0;
  let saltadas = 0;

  for (const item of IMAGENES_SEED) {
    const existente = await db.collection('imagenes').where('url', '==', item.url).limit(1).get();
    if (!existente.empty) {
      saltadas += 1;
      continue;
    }
    await db.collection('imagenes').add({
      url: item.url,
      nombre: item.nombre,
      origen: 'estatica',
      creadoEn: FieldValue.serverTimestamp(),
    });
    creadas += 1;
  }

  console.log(`Banco de imágenes: ${creadas} agregadas, ${saltadas} ya existían.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
