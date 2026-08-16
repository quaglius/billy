import { cert, getApps, initializeApp, type App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

let app: App | undefined;

export function getFirebaseAdmin(): App {
  if (app) return app;
  if (getApps().length > 0) {
    app = getApps()[0]!;
    return app;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const bucket = process.env.FIREBASE_STORAGE_BUCKET;
  const keyB64 = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_BASE64;
  // DECISIÓN PENDIENTE: Firebase Storage para proyectos nuevos exige plan Blaze
  // (cambio de Google desde sept 2024). El Admin SDK queda listo; no hay bucket
  // en Spark. Portadas e imágenes se sirven desde /public hasta que se active Blaze.

  if (!projectId || !keyB64) {
    throw new Error(
      'Faltan FIREBASE_PROJECT_ID o FIREBASE_SERVICE_ACCOUNT_KEY_BASE64 en el entorno.',
    );
  }

  const json = Buffer.from(keyB64, 'base64').toString('utf8');
  const serviceAccount = JSON.parse(json) as {
    project_id?: string;
    client_email: string;
    private_key: string;
  };

  app = initializeApp({
    credential: cert({
      projectId: serviceAccount.project_id ?? projectId,
      clientEmail: serviceAccount.client_email,
      privateKey: serviceAccount.private_key,
    }),
    projectId,
    storageBucket: bucket,
  });

  return app;
}

export function db() {
  return getFirestore(getFirebaseAdmin());
}

export function storage() {
  const bucket = process.env.FIREBASE_STORAGE_BUCKET;
  if (!bucket) {
    throw new Error(
      'Firebase Storage no está disponible: Google exige plan Blaze para crear un bucket nuevo. Mientras tanto las imágenes se sirven desde /public.',
    );
  }
  return getStorage(getFirebaseAdmin());
}
