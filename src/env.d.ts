/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly FIREBASE_PROJECT_ID: string;
  readonly FIREBASE_SERVICE_ACCOUNT_KEY_BASE64: string;
  readonly FIREBASE_STORAGE_BUCKET: string;
  readonly ADMIN_USERNAME: string;
  readonly ADMIN_PASSWORD: string;
  readonly SESSION_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
