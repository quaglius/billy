# Guille Nuesch — sitio, blog y plataforma de cursos

Sitio de marca personal para **Guillermo "Billy" Nuesch**, capacitador en salud mental y prevención de consumos problemáticos en el ámbito laboral (25+ años de trayectoria con sindicatos, ART, organismos públicos, transporte, salud e industria).

El proyecto tiene tres patas: **marca personal + blog con foco SEO + una plataforma de cursos con actividades interactivas en vivo** (preguntas con QR, respuestas anónimas desde el celular, resultados proyectados en el momento).

**En producción:** [guillenuesch.netlify.app](https://guillenuesch.netlify.app)

## Stack

- **[Astro](https://astro.build)** en modo `server` (SSR), adaptador `@astrojs/netlify`
- **Firebase Admin SDK** (`firebase-admin`) para todo el acceso a datos — nunca se usa el SDK de cliente ni se expone una API key al navegador
- **Firestore** como única base de datos, plan Spark (gratuito). No se usa Firebase Storage: desde feb/2026 exige el plan Blaze con tarjeta, así que las imágenes que sube el admin se comprimen con `sharp` y se guardan como base64 dentro del propio documento de Firestore (`src/pages/api/admin/imagenes/subir.ts`, servidas por `src/pages/img/[id].ts`)
- **Netlify** para hosting y deploy continuo (push a `main` → deploy automático)
- Login de admin propio (usuario/contraseña + cookie de sesión firmada), no Firebase Auth

## Estructura

```
src/
  pages/            rutas públicas y del panel de admin (Astro file-based routing)
    admin/          panel privado (requiere login, noindex)
    api/            endpoints server-side (formularios, login, actividades en vivo)
  components/       componentes .astro reutilizables
  layouts/          Layout.astro (head, header, footer, GA)
  lib/              lógica compartida: firebase-admin, tipos, observatorio, covers, etc.
  styles/           CSS (tokens, base, páginas, admin)
scripts/            scripts one-off (seed de datos, corridos con tsx --env-file=.env)
public/
  fotos/            fotos reales del sitio (guille/, campo/) — estas sí están en el repo
  marca/            logo, favicon e íconos ya exportados en los formatos que sirve el sitio
marca/              fuente de los SVG del logo (ver marca/README.md)
docs/               documentos de planificación y contenido (ver docs/README.md)
```

## Desarrollo local

```bash
npm install
npm run dev
```

Necesita un `.env` local (nunca se commitea — ver `.env.example`) con:

- `FIREBASE_PROJECT_ID`
- `FIREBASE_SERVICE_ACCOUNT_KEY_BASE64` — el JSON completo de la cuenta de servicio de Firebase, en base64 (Firebase Console → Configuración del proyecto → Cuentas de servicio → Generar nueva clave privada)
- `FIREBASE_STORAGE_BUCKET`
- `ADMIN_USERNAME`, `ADMIN_PASSWORD` — credenciales del panel
- `SESSION_SECRET` — cadena aleatoria larga para firmar la cookie de sesión

Las mismas variables van cargadas en Netlify (Site settings → Environment variables) para producción. **Nunca en un archivo commiteado.**

```bash
npm run build      # build de producción
npm run seed:imagenes   # carga el banco de imágenes estáticas en Firestore
```

## Seguridad y datos sensibles

- Las respuestas a las actividades en vivo son **anónimas por diseño** — sin login, sin dato personal, sin forma de rastrear una respuesta a una persona (Ley 25.326: salud y afiliación sindical son datos sensibles).
- Las instancias (un curso dictado a una empresa concreta) son **siempre privadas**: no se listan ni se indexan, solo se accede por link o QR directo.
- Los datos de contacto y notas internas de una empresa nunca se exponen en páginas públicas.
- Este repositorio es **público**. Ningún secreto (claves, contraseñas, tokens) va en el código ni en la documentación — solo en `.env` local (gitignored) o en las variables de entorno de Netlify.

## Documentos

Ver [docs/README.md](docs/README.md) para el índice de documentos de planificación, contenido y estrategia (contexto histórico del proyecto, no reflejan necesariamente el estado actual del código).

## Canales

- **WhatsApp (contacto principal):** +54 9 11 6831-3878
- **Instagram:** [@equilibrarprosalud](https://www.instagram.com/equilibrarprosalud)
- **YouTube:** @EquilibrarSaludMentalyAdicciones
