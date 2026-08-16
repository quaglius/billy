# Plan de trabajo — sitio, blog y plataforma de cursos de Guille Nuesch

> **Este documento es la especificación completa para construir el producto.** Está escrito para que lo ejecute un modelo de IA sin margen de interpretación: cada decisión de diseño, dato, texto y regla ya está tomada en algún documento de este repo. Si en algún punto no está claro qué hacer, **la respuesta está en otro archivo del proyecto — leerlo antes de inventar nada.**

---

## 0. Cómo trabajar con este documento (leer primero, sin excepción)

1. **No se inventa nada que ya esté decidido.** Colores, tipografía, textos, nombres de producto, número de WhatsApp, handle de Instagram, estructura de datos: todo está definido en los documentos de este repo. Antes de escribir una línea de código, leer el documento correspondiente a la etapa (cada etapa dice cuáles).
2. **Si algo no está definido y hay que decidirlo, no se decide solo.** Se detiene el trabajo en ese punto, se deja una nota explícita en el código (`// DECISIÓN PENDIENTE: ...`) y se sigue con la siguiente tarea que no dependa de eso. No hay que "resolverlo con criterio propio" — eso es exactamente lo que este documento quiere evitar.
3. **El orden de las etapas importa.** No se arranca la Etapa 3 sin haber terminado los criterios de aceptación de la Etapa 2. Cada etapa tiene una lista de "Hecho quiere decir" al final: si no se puede tildar cada ítem, la etapa no está terminada.
4. **Los textos que aparecen entre comillas o en bloques de código en este documento son textos finales, no ejemplos.** Se copian tal cual, no se parafrasean ni se "mejoran".
5. **Las microinteracciones y animaciones (Etapa 8) van al final a propósito.** Es más importante que la plataforma de cursos funcione que que el cursor tenga un efecto lindo. Si hay que cortar por falta de tiempo, se corta ahí, nunca antes.

### Documentos fuente (todo lo que sigue los da por leídos)

| Documento | Para qué sirve en esta etapa |
|---|---|
| [revision-critica.md](revision-critica.md) | Por qué el proyecto es como es — los tres problemas estructurales que definieron el diseño |
| [estrategia-sitio-web.md](estrategia-sitio-web.md) | Arquitectura de información, modelo conceptual de datos, reglas de anonimato y visibilidad |
| [cursos-demo.md](cursos-demo.md) | Contenido semilla: 3 cursos completos con actividades, consignas y quiz |
| [blog-content-plan.md](blog-content-plan.md) | Contenido semilla: 10 posts (briefs), plan de redes |
| [guillermo-perfil.md](guillermo-perfil.md) | Bio, trayectoria, textos de "Sobre mí", recursos de ayuda |
| [fotos-index.md](fotos-index.md) | Qué foto va dónde |
| [fotos/solvior-home05-guia-visual.md](fotos/solvior-home05-guia-visual.md) | Especificación visual pixel a pixel de las páginas de marca |
| [marca/README.md](marca/README.md) | Logo, ícono, favicon — archivos listos para usar |
| [fotos/recursos-solvior/](fotos/recursos-solvior/) | Librerías CSS/JS/fuentes del tema de referencia, ya descargadas, y fotos de Guillermo ya recortadas y nombradas por uso |

---

## 1. Decisiones ya tomadas — no volver a discutirlas

Esta tabla existe para que nadie pierda tiempo "decidiendo" algo que ya está resuelto.

| Decisión | Valor | Fuente |
|---|---|---|
| Nombre de marca | **Guille Nuesch** | [estrategia-sitio-web.md](estrategia-sitio-web.md) §6 |
| Hosting | **Netlify**, sin dominio propio por ahora | [estrategia-sitio-web.md](estrategia-sitio-web.md) §6 |
| Repositorio de código | **[github.com/quaglius/billy](https://github.com/quaglius/billy.git)** | actualizado en esta revisión |
| Base de datos, archivos y autenticación | **Firebase, plan gratuito (Spark)** — Firestore + Firebase Storage. **No Supabase.** | actualizado en esta revisión, ver §2 |
| Login del panel de administración | Usuario y contraseña simples (no es login de Firebase Auth — ver §2.2 el porqué). Usuario administrador: **Guillermo**. Credenciales de arranque en §2.2 | actualizado en esta revisión |
| WhatsApp (CTA principal, en todo el sitio) | **+54 9 11 6831-3878** → link `https://wa.me/5491168313878` | [estrategia-sitio-web.md](estrategia-sitio-web.md) §3 |
| Instagram | **[@equilibrarprosalud](https://www.instagram.com/equilibrarprosalud)** — se mantiene el handle, se personaliza el perfil | [blog-content-plan.md](blog-content-plan.md) §4.b |
| YouTube | @EquilibrarSaludMentalyAdicciones (activo, no se toca en esta fase) | [guillermo-perfil.md](guillermo-perfil.md) |
| Motor de actividades en vivo | **Se construye propio**, no se usa Mentimeter/Slido | [estrategia-sitio-web.md](estrategia-sitio-web.md) §5 |
| Identificación de participantes en actividades | **Prohibida.** Sin login, sin mail, sin nombre. Nunca, en ningún caso, dentro del alcance de este plan | [estrategia-sitio-web.md](estrategia-sitio-web.md) §5, [revision-critica.md](revision-critica.md) Problema 3 |
| Agregación de datos de actividades | **Por curso**, nunca por empresa ni por persona (el "Observatorio") | [estrategia-sitio-web.md](estrategia-sitio-web.md) §5, [cursos-demo.md](cursos-demo.md) |
| Visibilidad por defecto de una instancia de curso | **Privada** | [estrategia-sitio-web.md](estrategia-sitio-web.md) §5 |
| Login/quiz identificado/certificado/analítica individual | **Fuera de alcance de este plan.** No se construye nada de esto. Si en algún punto parece necesario, es una señal de que se está construyendo Fase 2 por error — parar. | [estrategia-sitio-web.md](estrategia-sitio-web.md) §5 |
| Colores de marca | `#051229` (oscuro/texto), `#0075ff` (acento), `#e1e8f0` / `#f7f7f7` (fondos claros) — tabla completa en §3 de este documento | [fotos/solvior-home05-guia-visual.md](fotos/solvior-home05-guia-visual.md) §2 |
| Tipografía | Lato (texto), Libre Franklin (títulos) | [fotos/solvior-home05-guia-visual.md](fotos/solvior-home05-guia-visual.md) §2-3 |
| Logo / ícono / favicon | Archivos ya generados en `marca/` | [marca/README.md](marca/README.md) |
| Foto de portada del hero | `fotos/recursos-solvior/guille/hero-brazos-cruzados.png` (ver nota de posicionamiento en §4.2 de este plan) | — |

> ⚠️ **Dos puntos de esta tabla todavía no están 100% cerrados** (visibilidad del repositorio, y a nombre de quién se crea el proyecto de Firebase). Están marcados como PENDIENTE en §2 y se le preguntan al usuario al final de este documento — no avanzar la Etapa 0 sin esa respuesta.

---

## 2. Stack técnico — decisión y justificación

### 2.1 Frontend y hosting (sin cambios respecto de la versión anterior de este plan)

- **Framework:** [Astro](https://astro.build), modo SSR (`output: 'server'`), con el [adaptador oficial de Netlify](https://docs.astro.build/en/guides/integrations-guide/netlify/).
- **Estilos:** CSS plano con variables CSS (custom properties), replicando 1:1 los tokens de [fotos/solvior-home05-guia-visual.md](fotos/solvior-home05-guia-visual.md) §2. **No usar Tailwind ni ningún framework de utilidades.**
- **JavaScript de interactividad puntual:** JavaScript plano (`<script>` en componentes `.astro`). No traer React/Vue/Preact — no hace falta con este alcance.

**Por qué Astro:** el sitio de marca (home, sobre mí, blog) está especificado como un template clásico de HTML/CSS/JS (Bootstrap 5 + GSAP + Lenis + WOW + Swiper + Odometer + Venobox — ver la guía visual). Esas librerías son archivos `.css`/`.js` sueltos, pensados para pegarse con `<link>`/`<script>` directo en el HTML. Astro renderiza HTML por defecto y no pelea con eso.

### 2.2 Base de datos, archivos y login del panel — **Firebase, plan gratuito (Spark), sin Supabase**

> Esto reemplaza la versión anterior de este plan, que usaba Supabase. La decisión de fondo (Astro SSR, sin exponer datos sensibles al cliente, anonimato por diseño) **no cambia** — solo cambia qué producto guarda los datos.

- **Base de datos:** [Cloud Firestore](https://firebase.google.com/docs/firestore), en modo Nativo, plan gratuito **Spark**. Estructura de colecciones en §4.
- **Archivos (imágenes de portada, adjuntos, logos de empresa):** [Firebase Storage](https://firebase.google.com/docs/storage), plan gratuito.
- **Login del panel de administración:** **no se usa Firebase Authentication.** Se implementa un login propio, simple, de usuario y contraseña fijos — la razón es doble: (a) Firebase Auth con email/contraseña exige que el identificador tenga formato de email, y acá se pidió explícitamente un usuario literal ("admin"), no un correo; (b) con un solo administrador (Guillermo) y sin necesidad de altas de usuarios nuevos, un login casero es más simple de construir y de explicar que integrar un proveedor de autenticación completo.

**Cómo funciona el login propio, en concreto:**
1. Las credenciales viven en variables de entorno de Netlify, **nunca escritas en el código fuente**: `ADMIN_USERNAME` y `ADMIN_PASSWORD`.
2. `/admin/login` es un formulario simple. Al enviarlo, un endpoint de servidor (`src/pages/api/login.ts`) compara lo tipeado contra esas dos variables de entorno.
3. Si coincide, el endpoint genera una cookie de sesión `httpOnly`, `secure`, firmada (HMAC con una clave secreta propia, variable de entorno `SESSION_SECRET`), con expiración de 7 días.
4. Un middleware de Astro (`src/middleware.ts`) revisa esa cookie en cada request a `/admin/*` y `/api/admin/*`. Si no es válida, redirige a `/admin/login`.
5. No hay "olvidé mi contraseña" ni recuperación automática en esta fase — si hace falta cambiar la contraseña, se cambia el valor de `ADMIN_PASSWORD` en Netlify y listo.

**Credenciales de arranque** (pedidas explícitamente para esta primera versión):

```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=Billymagic1$
```

> 🔒 **Nota de seguridad, no es opcional:**
> - Esta contraseña **no debe quedar commiteada en texto plano en ningún archivo del repositorio** (ni en código, ni en `.env` versionado). Va **solo** en las variables de entorno de Netlify (Site settings → Environment variables) y, si hace falta un `.env` local para desarrollar, ese archivo tiene que estar listado en `.gitignore` desde el primer commit.
> - Este documento (`plan-de-trabajo.md`) menciona la contraseña en texto plano porque así se pidió explícitamente. **Si el repositorio de GitHub es público, esta contraseña queda expuesta apenas se suba este archivo.** Ver la pregunta pendiente sobre visibilidad del repo al final de este documento — hasta tener esa respuesta, tratar el repo como si fuera público y no confiarse.
> - Recomendación: una vez que el panel funcione y Guillermo lo haya probado, cambiar `ADMIN_PASSWORD` por una contraseña nueva que no haya estado nunca escrita en un documento compartido.

### 2.3 Cómo se accede a Firestore/Storage — Admin SDK del lado del servidor, no SDK de cliente

**Regla central de esta arquitectura, aplica a todo el proyecto:** el navegador del visitante **nunca habla directo con Firebase**. Todo pasa por endpoints de Astro que corren en el servidor (Netlify Functions) usando el **Firebase Admin SDK** (`firebase-admin`, paquete de Node) con una cuenta de servicio.

Esto es así por tres razones:
1. **Evita tener que diseñar reglas de seguridad de Firestore complejas.** El Admin SDK tiene acceso total y no pasa por las reglas de seguridad — como nunca se expone una API key de cliente ni se conecta nadie directo a la base, no hay superficie de ataque que cubrir con reglas.
2. **Es más simple para un ejecutor con poco margen de error.** Un solo patrón de acceso a datos (llamadas de servidor), no dos (cliente + servidor).
3. **La actualización "en vivo" de la pantalla de resultados se resuelve con sondeo periódico (polling) desde el navegador a un endpoint propio, no con listeners de Firestore en el cliente.** Ver §6.5 — ya estaba decidido así en la versión anterior de este plan por motivos de robustez en conectividad mala (comedores de planta, aulas con wifi flojo), y encaja perfecto con no exponer Firebase al cliente.

**Configuración de la cuenta de servicio:**
- En la consola de Firebase: Configuración del proyecto → Cuentas de servicio → Generar nueva clave privada. Descarga un JSON.
- Ese JSON completo se guarda en una variable de entorno de Netlify, en base64: `FIREBASE_SERVICE_ACCOUNT_KEY_BASE64`.
- En el servidor, se decodifica y se inicializa `firebase-admin` una sola vez (patrón singleton, para no reinicializar en cada request).
- **Este archivo JSON no se sube al repositorio bajo ningún concepto** — ni siquiera al `.gitignore`'d local, para evitar que alguien lo commitee por error. Vive únicamente como variable de entorno.

### 2.4 Variables de entorno completas

```
# Firebase
FIREBASE_PROJECT_ID=
FIREBASE_SERVICE_ACCOUNT_KEY_BASE64=
FIREBASE_STORAGE_BUCKET=

# Login del panel
ADMIN_USERNAME=admin
ADMIN_PASSWORD=Billymagic1$
SESSION_SECRET=            # generar una cadena aleatoria larga, distinta para cada entorno (no reusar entre local y producción)
```

### 2.5 Límites del plan gratuito de Firebase (Spark) — a tener presente, no a resolver ahora

El plan gratuito de Firestore incluye, por día: 50.000 lecturas, 20.000 escrituras, 20.000 borrados, 1 GiB de almacenamiento total. Firebase Storage: 5 GB de almacenamiento, 1 GB/día de descarga. **Importante:** estas cuotas se consumen igual cuando se accede vía Admin SDK, no es "gratis por ser servidor" — el Admin SDK evita las reglas de seguridad, no el cobro/cuota. Para el volumen esperado de este proyecto (un capacitador, charlas puntuales, no miles de visitas diarias) esto alcanza de sobra. Si en algún momento el sondeo de la pantalla en vivo (§6.5) empieza a acercarse al límite de lecturas por un evento con mucha gente, la solución es espaciar el intervalo de sondeo, no cambiar de plan — no hay que anticiparse a ese problema ahora.

### 2.6 Qué NO hacer en esta etapa

- No elegir Next.js, Remix, SvelteKit ni ningún otro framework "porque es más conocido". La decisión ya está tomada y justificada arriba.
- No usar Supabase, ni Postgres, ni MongoDB. Es Firebase (Firestore + Storage).
- No instalar Tailwind, styled-components, ni CSS-in-JS.
- No usar Firebase Authentication para el login del panel. Es el login propio de §2.2.
- No agregar el SDK de cliente de Firebase (`firebase`, el paquete de navegador) al proyecto. Solo `firebase-admin`, del lado del servidor.

---

## 3. Sistema de diseño — referencia rápida

*(Fuente completa: [fotos/solvior-home05-guia-visual.md](fotos/solvior-home05-guia-visual.md). Esto es un resumen para no tener que abrir ese archivo constantemente — ante cualquier duda de detalle visual, ese archivo manda.)*

### Tokens de color (copiar literal en `src/styles/tokens.css`)

```css
:root {
  --tj-ff-body: 'Lato', sans-serif;
  --tj-ff-heading: 'Libre Franklin', sans-serif;

  --tj-color-common-white: #f7f7f7;
  --tj-color-common-white-2: #a9b0b8;
  --tj-color-common-black: #000000;
  --tj-color-common-black-2: #676e7a;
  --tj-color-common-black-3: #969ca5;
  --tj-color-heading-primary: #051229;
  --tj-color-text-body: #364052;
  --tj-color-text-body-2: #7e8590;
  --tj-color-theme-primary: #0075ff;
  --tj-color-theme-dark: #051229;
  --tj-color-theme-bg: #e1e8f0;
  --tj-color-theme-bg-2: #dfecfd;
  --tj-color-border-1: #27354d;
  --tj-color-border-2: #ced7e0;
  --tj-color-border-3: #d7d8db;
}
```

Google Fonts a cargar: `Lato:ital,wght@0,300;0,400;0,700;0,900;1,400` + `Libre+Franklin:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400`.

### Reglas que no se rompen (repetidas acá porque son las que más se olvidan)

- El gris del hero es `#e1e8f0`, **no** blanco ni ningún gris "de sistema".
- El azul es `#0075ff` exacto, **no** un azul "parecido".
- Border-radius: solo píldoras (`50px`) y círculos. **Nunca** `12px`/`16px`/`24px` en cards — eso es el anti-patrón que la guía prohíbe explícitamente.
- Botón primario: la píldora oscura con el chip azul que se expande al hover, con el markup de dos flechas exacto que especifica la guía §4. No simplificar a un `<button>` con `background: blue`.
- Tipografía: nunca Inter, Poppins, Montserrat ni ninguna fuente "parecida". Es Lato + Libre Franklin.

### Assets ya descargados y listos para usar

Todo esto ya está en el repo, **no hay que volver a descargarlo ni buscarlo en internet**:

- `fotos/recursos-solvior/css/*` — Bootstrap, Swiper, Venobox, Odometer, animate.css, y los CSS propios del tema
- `fotos/recursos-solvior/js/*` — GSAP + ScrollTrigger + SplitText, Lenis, WOW, Swiper, Venobox, Odometer, magiccursor
- `fotos/recursos-solvior/fonts/*` — fuente de íconos del tema + Font Awesome 6 Pro
- `fotos/recursos-solvior/shapes/*` y `decorative/*` — SVG/PNG decorativos del hero, about, process, testimonials (ver el listado completo en `fotos/recursos-solvior/iconografia/README.md`)
- `fotos/recursos-solvior/guille/*` — las fotos de Guillermo **ya recortadas y nombradas según dónde van**:

| Archivo | Uso |
|---|---|
| `hero-brazos-cruzados.png` | **Hero de la home.** Ver nota de posicionamiento abajo. |
| `hero-hires-sonrisa.png` | Alternativa de hero / imagen grande de "Sobre mí" |
| `about-gesticulando.png` | Sección "Sobre mí" / "Cómo trabajo" — foto en sweater, dando una charla |
| `avatar-sonrisa.png` | Favicon de respaldo si hace falta PNG, avatar de redes, foto de perfil pequeña |
| `blog-laptop.png` | Imagen de autor en el blog (bio al pie de cada post) |
| `blog-camisa-blanca-escritorio.png` | Imagen secundaria de "Sobre mí" o CTA final |
| `blog-cuerpo-entero-oficina.png` | Imagen de cuerpo entero para media kit / página "Sobre mí" |

- `marca/*` — logo, ícono y favicon del sitio (**no confundir con `fotos/recursos-solvior/home05/logo-icon.svg` ni `primary-logo.png`, que son del tema de referencia y no se usan** — el logo real del sitio es el de la carpeta `marca/`)

> ⚠️ **Nota de posicionamiento — leer antes de tocar el hero.** El diferencial completo del proyecto es "no soy la consultora corporativa genérica, soy el que entiende el comedor de planta" (ver [revision-critica.md](revision-critica.md)). Las fotos de saco fueron elegidas para el hero porque calzan con la pose exacta que pide la guía visual de Solvior (brazos cruzados, sonriendo a cámara) y dan seriedad institucional. Es una decisión tomada y no hay que revertirla sola, pero si en algún punto Guillermo pide "que no parezca un banco", la alternativa ya lista es `about-gesticulando.png` (sweater azul, gesticulando) — está pensada exactamente para ese caso.

---

## 4. Modelo de datos (Cloud Firestore)

Todas las colecciones son **planas** (top-level), sin subcolecciones — más simple de recorrer y de razonar para un ejecutor con poco margen de error. Las relaciones se resuelven con campos que guardan el ID del documento relacionado (`cursoId`, `empresaId`, etc.), igual que una foreign key pero sin integridad referencial automática — **quien escribe el código tiene que validar a mano que el ID referenciado existe antes de guardar.**

Nombres de colección y de campo: `camelCase`, en español. No traducir al inglés ni cambiar la convención.

### Colección `cursos` (plantillas reutilizables)

| Campo | Tipo | Notas |
|---|---|---|
| `slug` | string | único |
| `titulo` | string | |
| `descripcionCorta` | string | 1-2 frases, para tarjetas de listado |
| `descripcion` | string | texto largo (markdown), va en la página del curso |
| `formato` | string | uno de: `'encuentro'`, `'taller'`, `'programa'` |
| `duracionTexto` | string | texto libre, ej: "90 minutos a media jornada" |
| `dirigidoA` | string | |
| `objetivos` | array\<string\> | |
| `temario` | array\<string\> | en orden de presentación |
| `imagenPortadaUrl` | string \| null | URL de Firebase Storage |
| `adjuntos` | array\<{nombre: string, url: string}\> | |
| `publicado` | boolean | default `false` |
| `creadoEn` | timestamp | |
| `actualizadoEn` | timestamp | |

### Colección `empresas`

| Campo | Tipo | Notas |
|---|---|---|
| `nombre` | string | |
| `slug` | string | único |
| `rubro` | string \| null | |
| `logoUrl` | string \| null | |
| `contactoNombre` | string \| null | |
| `contactoEmail` | string \| null | **nunca se expone en ninguna página pública** |
| `contactoTelefono` | string \| null | **nunca se expone en ninguna página pública** |
| `notasInternas` | string \| null | **solo visible en `/admin`, nunca en páginas públicas** |
| `creadoEn` | timestamp | |

### Colección `instancias` (un curso dictado a una empresa)

| Campo | Tipo | Notas |
|---|---|---|
| `cursoId` | string | referencia a `cursos` |
| `empresaId` | string | referencia a `empresas` |
| `slug` | string | único — URL pública: `/cursos/{slug}` |
| `tituloParticular` | string \| null | override opcional del título del curso base |
| `particularidades` | string \| null | markdown, específico de esta cursada |
| `visibilidad` | string | uno de: `'privada'`, `'publica'`, `'anonimizada'` — default `'privada'` |
| `fechaInicio` | date \| null | |
| `fechaFin` | date \| null | |
| `modalidad` | string \| null | uno de: `'presencial'`, `'virtual'`, `'hibrida'` |
| `creadoEn` | timestamp | |

### Colección `encuentros` (items de cronograma)

| Campo | Tipo | Notas |
|---|---|---|
| `instanciaId` | string | referencia a `instancias` |
| `orden` | number | |
| `titulo` | string | ej: "Encuentro 1: Diagnóstico y apertura" |
| `fechaHora` | timestamp | |
| `duracionMinutos` | number \| null | si es null, asumir 120 para el cálculo de estado |
| `descripcion` | string \| null | |

> El **estado** del encuentro (completado / en curso / próximo) **nunca se guarda como campo**. Se calcula siempre en el momento de renderizar, comparando `fechaHora` con la hora actual del servidor. Ver fórmula exacta en §6.2.

### Colección `actividades` (ligadas a un encuentro)

| Campo | Tipo | Notas |
|---|---|---|
| `encuentroId` | string | referencia a `encuentros` |
| `instanciaId` | string | desnormalizado, para no tener que resolver la cadena completa en cada lectura |
| `cursoId` | string | desnormalizado a propósito: el Observatorio agrega por curso y tiene que sobrevivir aunque se borre la instancia |
| `codigo` | string | 5 caracteres, único. Ver generador en §6.1 |
| `tipo` | string | uno de: `'si_no'`, `'seleccion_unica'`, `'seleccion_multiple'`, `'numero'`, `'fecha'`, `'texto_libre'` |
| `consigna` | string | |
| `opciones` | array\<string\> \| null | solo se usa si `tipo` es `seleccion_unica` o `seleccion_multiple` |
| `orden` | number | |
| `activa` | boolean | solo puede haber **una** actividad `activa: true` por encuentro a la vez |
| `cerradaEn` | timestamp \| null | |
| `creadoEn` | timestamp | |

### Colección `respuestas` (anónimas, sin excepción)

| Campo | Tipo | Notas |
|---|---|---|
| `actividadId` | string | referencia a `actividades` |
| `cursoId` | string | desnormalizado, para que el Observatorio funcione aunque se borre la instancia |
| `valor` | objeto | formato según tipo, ver tabla en §6.4 |
| `tokenNavegador` | string | UUID random generado en el navegador del participante (`crypto.randomUUID()`), guardado en `localStorage`. **Nunca se vincula a una identidad.** |
| `creadoEn` | timestamp | |

**Cómo se evita que la misma persona vote dos veces en la misma actividad, sin usar una restricción de base de datos:** el ID del documento **no se genera automático** — se arma como `{actividadId}_{tokenNavegador}`. Antes de crear la respuesta, el endpoint del servidor hace `get()` de ese ID; si ya existe, no la crea de nuevo y devuelve el mensaje de "ya registramos tu respuesta". Esto se hace en el propio endpoint (Admin SDK), no hace falta ninguna regla de seguridad de Firestore para esto porque el cliente nunca escribe directo.

### Colección `posts` (blog)

| Campo | Tipo | Notas |
|---|---|---|
| `slug` | string | único |
| `titulo` | string | |
| `bajada` | string | 150-160 caracteres, se usa como meta description y `og:description` |
| `cuerpoMd` | string | markdown |
| `imagenPortadaUrl` | string \| null | |
| `keywordPrincipal` | string \| null | |
| `estado` | string | `'borrador'` o `'publicado'` — default `'borrador'` |
| `publicadoEn` | timestamp \| null | |
| `creadoEn` | timestamp | |

### Colección `testimonios`

| Campo | Tipo | Notas |
|---|---|---|
| `cita` | string | |
| `autorNombre` | string \| null | null mientras sea placeholder |
| `autorCargo` | string \| null | |
| `organizacion` | string | |
| `esPlaceholder` | boolean | default `true` |
| `orden` | number | default `0` |

### Campos que la colección `respuestas` **NUNCA** debe tener, bajo ningún concepto

Si en cualquier punto de la construcción alguien agrega uno de estos campos a un documento de `respuestas`, es un error grave y hay que revertirlo:

- `nombre`, `email`, `usuarioId` o cualquier campo que identifique a la persona que respondió
- `ip` o `userAgent`
- `empresaId` directo (la relación a empresa existe solo indirectamente vía `actividad → encuentro → instancia → empresa`, y **no se usa para reportar nada** — ver §6.6)

### Índices compuestos a crear en Firestore

Firestore pide crear índices compuestos manualmente para ciertas consultas. Los que va a necesitar este proyecto (Firestore va a avisar con un link directo la primera vez que falte uno, pero conviene crearlos de entrada):

- `encuentros`: `instanciaId` (asc) + `orden` (asc) — para listar el cronograma en orden
- `actividades`: `encuentroId` (asc) + `orden` (asc) — para listar actividades de un encuentro en orden
- `actividades`: `encuentroId` (asc) + `activa` (asc) — para encontrar la actividad activa de un encuentro
- `respuestas`: `actividadId` (asc) + `creadoEn` (asc) — para leer las respuestas de una actividad en orden
- `respuestas`: `cursoId` (asc) — para el Observatorio (agregado histórico por curso)
- `posts`: `estado` (asc) + `publicadoEn` (desc) — para el listado público del blog
- `instancias`: `visibilidad` (asc) — para el catálogo público de `/cursos`

### Reglas de seguridad de Firestore y Storage

Dado que **nada accede a Firebase desde el navegador** (§2.3), las reglas de seguridad se dejan en modo cerrado por completo — nadie tiene permiso de leer ni escribir directo:

```
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

```
// storage.rules
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

Todo el acceso real pasa por el Admin SDK en los endpoints del servidor, que ignora estas reglas. Esto es intencional y no hay que "abrir" las reglas para que algo funcione — si algo no anda, el problema está en el endpoint de servidor, no en las reglas.

---

## 5. Mapa de páginas y rutas

### Públicas (sin login)

| Ruta | Contenido |
|---|---|
| `/` | Home — hero, 4 pilares, cómo trabajo (resumen), productos, testimonios, blog reciente, CTA |
| `/sobre-mi` | Trayectoria, método de 4 pasos completo, los 3 productos con detalle |
| `/cursos` | Catálogo: los 3 cursos-tipo (Encuentro / Taller / Programa) + instancias con visibilidad pública o anonimizada |
| `/cursos/[slug]` | Página pública de una instancia o de un curso-tipo sin instancia asociada |
| `/a/[codigo]` | Pantalla de participante — responde una actividad, sin login |
| `/blog` | Listado de posts publicados |
| `/blog/[slug]` | Post individual |
| `/ayuda` | "Si necesitás ayuda" — Línea 141 y recursos de derivación |
| `/empezar-aca` | **Página exclusiva para Guillermo** (ver contenido completo en §9). `noindex`, no aparece en el menú de navegación. |

**No crear** una página `/contacto` separada en esta fase — el WhatsApp es el CTA principal y va como botón flotante + en el header + en el footer. Ver §1.

### Administración (requiere login propio, ver §2.2)

| Ruta | Contenido |
|---|---|
| `/admin/login` | Formulario de usuario y contraseña |
| `/admin` | Dashboard — "lo de hoy": próximo encuentro con sus QR listos para proyectar, accesos rápidos |
| `/admin/cursos` | Listado + alta/edición de cursos (plantillas) |
| `/admin/cursos/[id]` | Edición de un curso |
| `/admin/empresas` | Listado + alta/edición de empresas |
| `/admin/empresas/[id]` | Edición de una empresa |
| `/admin/instancias` | Listado + alta de instancias, con botón "Duplicar" en cada fila |
| `/admin/instancias/[id]` | Edición de instancia + gestión de su cronograma de encuentros |
| `/admin/instancias/[id]/encuentros/[encuentroId]` | Gestión de actividades de ese encuentro |
| `/admin/instancias/[id]/encuentros/[encuentroId]/vivo` | **Pantalla para proyectar** — QR de la actividad activa + resultados en vivo |
| `/admin/posts` | Listado + alta/edición de posts (editor markdown simple) |
| `/admin/observatorio` | Datos agregados por curso (ver §6.6) |

---

## 6. El motor de actividades en vivo — especificación funcional completa

*(Esto es lo más importante del proyecto. Ver también [estrategia-sitio-web.md](estrategia-sitio-web.md) §5 y [cursos-demo.md](cursos-demo.md) para el contenido de ejemplo.)*

### 6.1 Generación de código corto

Cada actividad, al crearse (vía endpoint de servidor con Admin SDK), recibe un código de 5 caracteres. Alfabeto permitido: `ABCDEFGHJKLMNPQRSTUVWXYZ23456789` (sin `0`, `O`, `1`, `I` porque se confunden al leerlos o tipearlos). Generar y consultar Firestore (`where('codigo', '==', candidato)`) hasta encontrar uno que no exista.

URL pública del participante: `https://{sitio}/a/{codigo}` — ej. `https://guillenuesch.netlify.app/a/K7M2X`.

### 6.2 Cálculo de estado de un encuentro

**No se guarda en la base.** Se calcula así, siempre en el momento de renderizar:

```
si fechaHora del encuentro + duracionMinutos < ahora → "completado"
si ahora está entre fechaHora y fechaHora + duracionMinutos → "en curso"
si fechaHora > ahora → "próximo"
```

Si `duracionMinutos` es null, asumir 120 minutos para el cálculo.

### 6.3 Flujo de una actividad

1. Desde `/admin/instancias/[id]/encuentros/[encuentroId]`, Guillermo (o quien administre) crea actividades para ese encuentro, en el orden en que se van a usar. Cada actividad tiene: tipo, consigna, y si corresponde, opciones. Esto se hace vía un endpoint de servidor (`/api/admin/actividades`, Admin SDK).
2. En el momento del encuentro, entra a `/admin/instancias/[id]/encuentros/[encuentroId]/vivo`. Esa pantalla muestra la primera actividad `activa: false` en orden, con un botón **"Activar"**. Al activarla: el endpoint de servidor pone `activa: true` en esa actividad, y en la misma operación (un batch write del Admin SDK) pone `activa: false` en todas las demás actividades del mismo `encuentroId` — nunca puede haber dos activas a la vez.
3. La pantalla `/vivo`, con la actividad activa, muestra:
   - El **QR** apuntando a `/a/{codigo}` (generar con una librería liviana, ej. `qrcode` de npm, del lado del servidor, embebido como imagen o SVG en la página)
   - El **código corto** tipeable, bien grande, al lado del QR
   - La consigna de la actividad
   - Un **gráfico de resultados que se actualiza solo por sondeo periódico** (ver 6.5)
   - Un botón **"Cerrar actividad"** (marca `cerradaEn`) y **"Siguiente actividad"**
4. El participante entra a `/a/{codigo}` desde su celular. Esa página:
   - Si no tiene ya un `tokenNavegador` en `localStorage`, genera uno (`crypto.randomUUID()`) y lo guarda.
   - Muestra la consigna y el control correspondiente al tipo de actividad (ver tabla abajo). Esta parte de la página puede renderizarse server-side (Astro SSR con Admin SDK) — no hace falta que el navegador hable con Firebase para ver la consigna.
   - Al responder, el navegador hace un `POST` a un endpoint propio (`/api/responder`) con `{ actividadId, tokenNavegador, valor }`. Ese endpoint (Admin SDK) arma el ID determinístico `{actividadId}_{tokenNavegador}` (§4), chequea si ya existe, y si no, lo crea con `cursoId` heredado de la actividad.
   - Si ya existía (ya había respondido), el endpoint devuelve un estado que la página traduce a: *"Ya registramos tu respuesta para esta actividad. Gracias por participar."* — nunca un error técnico.
   - Si la actividad ya no está `activa` (se cerró o cambiaron a la siguiente), el endpoint lo detecta y la página muestra: *"Esta actividad ya cerró. Prestá atención a la pantalla para la próxima."*

### 6.4 Tipos de actividad — captura y visualización

| `tipo` | Formato de `valor` guardado | Control de captura (participante) | Visualización en vivo |
|---|---|---|---|
| `si_no` | `{ valor: true }` o `{ valor: false }` | Dos botones grandes: "Sí" / "No" | Barras horizontales con el % de cada opción |
| `seleccion_unica` | `{ opcion: "texto de la opción elegida" }` | Radio buttons, una sola selección | Barras horizontales ordenadas de mayor a menor |
| `seleccion_multiple` | `{ opciones: ["texto 1", "texto 2"] }` | Checkboxes, selección múltiple | Barras horizontales — el total puede superar el 100% de participantes |
| `numero` | `{ valor: 7 }` | Input numérico | Promedio + valor mínimo/máximo, o histograma simple si hay más de 15 respuestas |
| `fecha` | `{ valor: "2026-09-15" }` | Selector de fecha | Línea de tiempo simple, agrupando por semana |
| `texto_libre` | `{ valor: "texto escrito" }` | Textarea corto (límite 60 caracteres) | **Nube de palabras** — cada palabra distinta que se repite se agranda; calcularla en el propio endpoint de resultados (contar frecuencias) y dibujarla con posiciones simples en JS del lado del cliente, no hace falta una librería pesada |

**Robustez, no es opcional (ver [revision-critica.md](revision-critica.md) §2.2):**
- La pantalla `/vivo` nunca debe mostrar "X de Y respuestas" (expone quién no participó). Solo mostrar el resultado sobre quienes sí respondieron.
- Si se corta la conexión, la pantalla `/vivo` debe seguir mostrando el último dato recibido, nunca un mensaje de error en pantalla completa (si el `fetch()` del sondeo falla, simplemente no actualizar y reintentar en el próximo ciclo).
- La página `/vivo` debe tener un botón "Imprimir consigna" (abre una vista simple con la pregunta en grande, para hacer la dinámica a mano alzada si la tecnología falla ese día).

### 6.5 Actualización en vivo — sondeo periódico (polling), no listeners en tiempo real

**No se usan listeners de Firestore en el navegador** (coherente con §2.3: el cliente nunca habla con Firebase). En cambio:

1. Existe un endpoint `GET /api/actividad/{id}/resultados` que, del lado del servidor (Admin SDK), lee todas las `respuestas` de esa `actividadId` y devuelve el agregado ya calculado según el `tipo` (los porcentajes, el promedio, las frecuencias de palabras — lo que corresponda).
2. La pantalla `/vivo`, mientras hay una actividad activa, llama a ese endpoint **cada 2 segundos** con `fetch()` y redibuja el gráfico con la respuesta.
3. Este intervalo (2 segundos) es suficiente para que se sienta "en vivo" en una sala de hasta varias decenas de personas, y es mucho más simple de implementar y de depurar que una suscripción en tiempo real. Ver el límite de cuota de lecturas en §2.5 antes de acortar este intervalo.

### 6.6 El Observatorio — agregados por curso

En `/admin/observatorio`: para cada curso (plantilla), y para cada actividad de ese curso (identificada por su `consigna`, agrupando todas las instancias que la usaron), mostrar el agregado de todas las respuestas históricas. Esto se calcula en un endpoint de servidor que lee todas las `respuestas` con ese `cursoId` (usando el índice compuesto de §4) y agrupa por `actividadId`/`consigna`.

**Regla dura, sin excepción:** si una actividad tiene menos de **30 respuestas acumuladas** en total, no se muestra el agregado — se muestra el texto *"Todavía no hay suficientes respuestas acumuladas para este dato (mínimo 30)."* Esto se calcula en el servidor, no se dejan mostrar los números "por las dudas".

El panel de Observatorio **no muestra en ningún lugar** a qué empresa pertenece cada respuesta — ni siquiera para el admin. Es agregado por curso, punto. Si Guillermo necesita saber cuánta gente participó en una instancia particular, esa es información distinta (ver siguiente punto) y vive en la página de la instancia, no en el Observatorio.

En `/admin/instancias/[id]`, sí se puede mostrar un número simple: "142 respuestas registradas en este curso" (conteo, sin desglose de contenido) — eso es lo único que se le puede informar a una empresa sobre su propia instancia.

---

## 7. Contenido semilla — qué cargar y cómo

> Cargar este contenido con un script de una sola vez (`scripts/seed.ts`, corrido a mano por línea de comandos con `firebase-admin`, nunca expuesto como endpoint público), no a mano desde el panel — así queda repetible si hay que resetear el entorno de pruebas.

### 7.1 Cursos (3 documentos en `cursos`, desde [cursos-demo.md](cursos-demo.md))

Cargar los tres cursos **tal como están escritos** en `cursos-demo.md`: título, descripción, objetivos, temario. Son:

1. **Prevención de consumos problemáticos en el ámbito laboral** — `formato: 'encuentro'`
2. **Taller para delegados y mandos medios: detectar, escuchar, derivar** — `formato: 'taller'`
3. **Programa integral de prevención y cuidado** — `formato: 'programa'`

Cada uno con `publicado: true` (son los "cursos-tipo" del catálogo público en `/cursos`, no instancias — no exponen ninguna empresa).

### 7.2 Actividades de ejemplo

Cargar **todas** las actividades detalladas en `cursos-demo.md` para el Curso 1 (6 actividades) y el Curso 2 (5 actividades), con su `tipo`, `consigna` y `opciones` tal como están escritas ahí. Estas actividades quedan asociadas a un encuentro de demostración — **no hace falta crear una instancia real ni una empresa real para esto**: se puede crear una empresa demo llamada "Organización de ejemplo" con una instancia de visibilidad `privada` pura para que el admin pueda probar el flujo completo (crear actividad → activar → ver QR → responder desde otro dispositivo → ver el resultado en vivo) sin que eso aparezca en ningún lado público.

El quiz final del Curso 2 documentado en `cursos-demo.md` **no se carga como funcionalidad** — es contenido de referencia para Fase 2 (fuera de alcance, ver §1). Se puede dejar como texto de ejemplo en `cursos-demo.md`, no se construye pantalla de quiz.

### 7.3 Posts de blog (10 documentos en `posts`, desde [blog-content-plan.md](blog-content-plan.md))

**Punto crítico — leer con atención.** Los 10 posts de `blog-content-plan.md` están definidos como *briefs* (keyword, ángulo, idea de desarrollo, dato de anclaje con fuente, imagen sugerida, CTA, hashtags) — **no como artículos terminados**. No están escritos el cuerpo completo de cada nota.

Para cada uno de los 10 posts:

1. Crear el documento en `posts` con `estado: 'borrador'` (nunca `'publicado'` — eso lo decide Guillermo o quien redacte el contenido final, no el ejecutor de este plan).
2. `titulo`: el título tal como aparece en `blog-content-plan.md`.
3. `bajada`: escribir una bajada de 150-160 caracteres basada en la "Idea de desarrollo" de ese post — esto sí lo puede redactar quien ejecuta el plan, porque es un resumen del brief, no contenido nuevo inventado.
4. `cuerpoMd`: **no escribir el artículo completo.** Cargar un esqueleto en markdown con esta estructura, usando la información literal del brief:

```markdown
> **Borrador — pendiente de redacción final.** Este texto es un esqueleto armado a partir del brief de contenido, no la nota terminada.

## [ángulo del post, tal como está en el brief]

[Reescribir acá, en 2-3 líneas, la "idea de desarrollo" del brief]

### El dato

> [dato de anclaje tal como está escrito en el brief, con la cita a la fuente]

Fuente: [nombre de la fuente y link, tal como aparece en blog-content-plan.md]

### Desarrollo

<!-- TODO: desarrollar el cuerpo del artículo. No inventar estadísticas, cifras ni citas normativas que no estén en blog-content-plan.md o guillermo-perfil.md. -->

### Para seguir leyendo

- [Ayuda: Línea 141 y recursos de derivación](/ayuda)
```

5. Si el post es el **#6 (Protocolo SRT 2026)**, agregar además, arriba de todo, este aviso — es obligatorio, no opcional, porque el dato normativo todavía no está verificado contra el Boletín Oficial:

```markdown
> ⚠️ **No publicar sin verificar el texto completo de la Resolución 8/2026 de la SRT contra el Boletín Oficial.** Ver blog-content-plan.md, post #6.
```

6. `imagenPortadaUrl`: usar la imagen sugerida en la tabla de mapeo de `fotos-index.md` §4, si el archivo existe en el repo (subirla a Firebase Storage vía el script de seed, usando Admin SDK). Si no existe, dejar `null` y anotar en una lista aparte qué posts quedaron sin imagen (no usar una imagen de stock genérica).

### 7.4 Testimonios (3 documentos en `testimonios`, ya redactadas)

Cargar tal cual, con `esPlaceholder: true`:

1. *"Guillermo nos ayudó a abrir un tema que durante años fue tabú en el sindicato. Los delegados hoy tienen herramientas concretas para acompañar a un compañero, y eso cambió la forma en que se manejan los conflictos en planta."* — organización: **SITOS** (placeholder)
2. *"Lo contratamos para una charla puntual y terminamos armando un programa de varios meses. La diferencia con otras capacitaciones es que no se queda en la teoría: da herramientas que los mandos medios usan al día siguiente."* — organización: **Fundación Provincia ART** (placeholder)
3. *"Trabajamos con Guillermo desde hace años en distintas líneas. Lo que más valoramos es la cercanía: entiende la realidad del trabajador ferroviario, no llega con un power point genérico."* — organización: **Trenes Argentinos Línea Roca** (placeholder)

**En la interfaz pública**, estos tres testimonios se muestran normalmente (no llevan ninguna marca de "ficticio" visible al usuario final — esa advertencia es solo para quien construye el sitio, ver `estrategia-sitio-web.md` §8). Pero en `/admin`, junto a cada testimonio con `esPlaceholder: true`, mostrar un badge visible: **"⚠️ Placeholder — reemplazar por cita real"**.

### 7.5 Página "Si necesitás ayuda" (`/ayuda`)

Contenido fijo (no editable desde admin en esta fase, va directo en el código de la página), tomado literal de [guillermo-perfil.md](guillermo-perfil.md):

- **Línea 141 (SEDRONAR):** gratuita, anónima y confidencial, alcance nacional, las 24 horas los 365 días del año. Sirve para uno mismo, un familiar o un compañero. Link: `https://www.argentina.gob.ar/latiendo/beneficios-y-canales-de-atencion/linea-141-sedronar`
- Mención de la Red de atención de la Provincia de Buenos Aires (vínculo institucional de Guillermo por su rol en el Ministerio de Salud provincial)
- Sección breve: "Cómo acompañar a un compañero sin invadir" y "Qué esperar cuando llamás" — **este texto sí hay que redactarlo**, en tono simple y directo, basado en el temario de `cursos-demo.md` (Curso 2, tema "Qué NO hacer"). No inventar recomendaciones que contradigan lo ya escrito ahí.

---

## 8. Etapas de construcción

Cada etapa tiene: objetivo, tareas, y una lista **"Hecho quiere decir"** que son los criterios de aceptación. No pasar a la siguiente etapa sin poder tildar todos los ítems.

### Etapa 0 — Scaffold del proyecto, git y Firebase

**Objetivo:** tener un proyecto Astro vacío, conectado a Firebase y desplegable en Netlify, con el repositorio de git funcionando.

**Tareas:**
- Crear proyecto Astro con `output: 'server'` y el adaptador de Netlify.
- Inicializar git en el proyecto, agregar el remoto `https://github.com/quaglius/billy.git`, hacer el primer commit y push a `main`. Crear `.gitignore` desde el primer commit incluyendo al menos: `node_modules/`, `.env`, `.env.*`, `dist/`, `.netlify/`.
- Conectar el sitio en Netlify al repositorio, con deploy automático en cada push a `main`.
- Crear el proyecto en la consola de Firebase (o usar uno existente — ver pregunta pendiente al final de este documento). Habilitar Firestore (modo Nativo) y Storage, ambos en el plan gratuito Spark.
- Generar la clave de cuenta de servicio (§2.3) y cargarla como variable de entorno en Netlify, junto con el resto de §2.4.
- Publicar las reglas de seguridad cerradas de §4 (`firestore.rules`, `storage.rules`) usando la Firebase CLI o pegándolas directo en la consola.
- Instalar `firebase-admin` como dependencia del proyecto. **No instalar** el paquete `firebase` (SDK de cliente).
- Cargar los tokens de diseño en `src/styles/tokens.css` (§3).
- Copiar a `public/` (o `src/assets/`, según convenga a Astro) los archivos necesarios de `fotos/recursos-solvior/` y `marca/`.
- Configurar el favicon (`marca/favicon.svg`) en el `<head>` global.
- Implementar el login propio (§2.2): `/admin/login`, endpoint `/api/login`, middleware de sesión.
- Confirmar que un "Hola mundo" en `/` y una página protegida de prueba en `/admin` (que redirige a `/admin/login` si no hay sesión) funcionan en la URL pública de Netlify.

**Hecho quiere decir:**
- [ ] El repositorio en GitHub tiene el primer commit y el proyecto Astro completo
- [ ] El proyecto compila y corre localmente sin errores
- [ ] El deploy a Netlify funciona automáticamente al hacer push a `main`
- [ ] Firestore y Storage existen en el proyecto de Firebase, en plan Spark
- [ ] Las reglas de seguridad cerradas están publicadas
- [ ] Entrar a `/admin` sin sesión redirige a `/admin/login`; loguearse con `admin` / `Billymagic1$` deja entrar y la sesión persiste al recargar
- [ ] El favicon de Guille Nuesch aparece en la pestaña del navegador
- [ ] Ningún archivo con secretos (`.env`, la clave de cuenta de servicio) quedó commiteado — revisar el historial de git, no solo el estado actual

### Etapa 1 — Componentes base del sistema de diseño

**Objetivo:** header, footer, botón primario, y la estructura de layout que todas las páginas van a reusar.

**Tareas:**
- Componente `Layout.astro` con `<head>` (fonts, favicon, meta tags OG por defecto), header y footer.
- Header: logo (`marca/logo-horizontal.svg`), navegación (Inicio, Sobre mí, Cursos, Blog, Ayuda), CTA de WhatsApp como botón píldora, siguiendo el markup exacto de la guía visual §4 (dos flechas, chip que se expande).
- Footer: logo en variante oscura (`marca/logo-horizontal-oscuro.svg` sobre fondo `#051229`), links de redes (Instagram `@equilibrarprosalud`, YouTube, LinkedIn), copyright.
- Botón flotante de WhatsApp, visible en todas las páginas.
- Componente de botón primario reutilizable (`<BotonPrimario href="..." texto="..." />`) implementando el markup y microinteracción de la guía visual §4. **En esta etapa alcanza con que el botón se vea y funcione bien** (fondo, colores, hover simple con transición CSS) — la animación exacta del chip que se expande con las dos flechas puede quedar para la Etapa 8 si hace falta priorizar tiempo.

**Hecho quiere decir:**
- [ ] Header y footer se ven en todas las páginas de prueba
- [ ] El botón de WhatsApp abre `https://wa.me/5491168313878` en una pestaña nueva
- [ ] Los colores y tipografía coinciden exactamente con los tokens de §3 (comparar con inspector del navegador, no "a ojo")
- [ ] El sitio es usable en mobile (viewport 375px) sin overflow horizontal

### Etapa 2 — Páginas de marca: Home, Sobre mí, y la página de Guillermo

**Objetivo:** las páginas públicas principales, siguiendo la guía visual de Solvior donde aplica.

**Tareas — Home (`/`):**
- Hero: siguiendo `fotos/solvior-home05-guia-visual.md` §7. Foto: `hero-brazos-cruzados.png`. Texto del H1 y bajada: a definir con Guillermo el copy final, pero la estructura (badge, H1 con una palabra en azul, bajada, CTA) sigue la guía.
- Barra de 4 features (guía §10): usar los 4 pilares de contenido del método o los 3 productos + 1 diferencial (a definir el texto exacto con el copy de `estrategia-sitio-web.md` §4.b, no inventar contenido nuevo).
- Sección "Cómo trabajo" resumida (versión corta de §11 de la guía / About), con el método de 4 pasos.
- Sección de los 3 productos (Encuentro / Taller / Programa) — tabla de `estrategia-sitio-web.md` §4.b.
- Sección de testimonios (los 3 de §7.4 de este plan).
- Sección de blog reciente (últimos 3 posts publicados).
- CTA final de WhatsApp.

**Tareas — Sobre mí (`/sobre-mi`):**
- Trayectoria completa (de `guillermo-perfil.md`).
- Método de 4 pasos completo, con explicación de cada paso.
- Los 3 productos con el detalle completo de la tabla.
- Logos/nombres de organizaciones donde trabajó (lista de `guillermo-perfil.md`, sección de clientes).

**Tareas — página de Guillermo (`/empezar-aca`):**
- Copiar **exactamente** el contenido de §9 de este documento. No es un resumen para inspirarse: es el texto final.
- Marcar la página con `<meta name="robots" content="noindex">` y no incluirla en la navegación del header.

**Hecho quiere decir:**
- [ ] La home tiene las secciones descriptas, en el orden de la guía visual
- [ ] El hero muestra la foto correcta y el layout coincide con la guía (columna izquierda texto, derecha foto con círculos decorativos)
- [ ] `/sobre-mi` incluye el método de 4 pasos y los 3 productos completos
- [ ] `/empezar-aca` existe, tiene el contenido de §9 sin modificar, y no aparece en el menú ni es indexable

### Etapa 3 — Blog

**Objetivo:** listado, página de post, y los 10 posts semilla cargados como borrador.

**Tareas:**
- `/blog`: listado de posts con `estado: 'publicado'` únicamente (los borradores no se muestran acá), leído server-side vía Admin SDK.
- `/blog/[slug]`: renderiza `cuerpoMd`, con `og:title`, `og:description` (= `bajada`), `og:image` configurados dinámicamente por post (ver checklist de `blog-content-plan.md` §5).
- Bio de autor al pie de cada post, con foto `blog-laptop.png`.
- Correr el script de seed (§7.3) para cargar los 10 posts.
- Vista en `/admin/posts` para editar y cambiar `estado` de borrador a publicado, vía endpoint de servidor.

**Hecho quiere decir:**
- [ ] Los 10 posts existen en Firestore con `estado: 'borrador'`
- [ ] Ninguno aparece en `/blog` público hasta que se cambie manualmente a `publicado` desde `/admin/posts`
- [ ] El post #6 (protocolo SRT) tiene el aviso de no publicar sin verificar
- [ ] Al pegar el link de un post publicado en LinkedIn/WhatsApp, se ve título + imagen + descripción (probar con el inspector de meta tags del navegador, no asumir que funciona)

### Etapa 4 — Cursos, empresas e instancias (sin actividades todavía)

**Objetivo:** todo el flujo de administración de cursos/empresas/instancias, y las páginas públicas de curso, sin el motor de actividades (eso es la Etapa 5).

**Tareas:**
- `/admin/cursos`, `/admin/empresas`, `/admin/instancias`: alta/edición/listado, todo vía endpoints de servidor con Admin SDK (nunca escritura directa desde el navegador).
- Botón "Duplicar" en instancias: crea una copia de la instancia con el mismo `cursoId`, pidiendo solo `empresaId` nueva y fechas nuevas.
- Gestión de cronograma (`encuentros`) dentro de la edición de una instancia.
- Cálculo de estado del encuentro en tiempo real (§6.2), mostrado como badge visual (ej. verde "completado", azul "en curso", gris "próximo").
- `/cursos` y `/cursos/[slug]` públicas, respetando la regla de visibilidad (§4 — nunca mostrar una instancia `privada` fuera de su link directo).
- Correr el script de seed (§7.1) para cargar los 3 cursos.
- El admin debe ser usable desde el celular (ver requisitos de §4.4 de `estrategia-sitio-web.md`): formularios cortos, botones grandes, sin tablas de muchas columnas en mobile.

**Hecho quiere decir:**
- [ ] Se puede crear un curso, una empresa, y una instancia que los une, sin errores
- [ ] Duplicar una instancia tarda menos de 30 segundos de interacción
- [ ] Una instancia `privada` no aparece en `/cursos` ni es indexable, pero su URL directa funciona
- [ ] El cronograma muestra el estado correcto comparando contra la fecha/hora real del sistema
- [ ] El admin es operable en una pantalla de 375px de ancho

### Etapa 5 — Motor de actividades en vivo (la etapa más importante)

**Objetivo:** todo lo especificado en §6, funcionando de punta a punta.

**Tareas:**
- CRUD de actividades dentro de un encuentro, vía endpoints de servidor.
- Generador de código corto (§6.1).
- Página `/a/[codigo]`, con el HTML de la consigna renderizado server-side y el control de captura según tipo (tabla de §6.4), que hace `POST` a `/api/responder`.
- Endpoint `/api/responder` con la lógica de ID determinístico anti-doble-voto (§4, §6.3).
- Página `/admin/.../vivo` con QR, código, gráfico en vivo por tipo, actualizado por sondeo cada 2 segundos contra `/api/actividad/{id}/resultados` (§6.5).
- Lógica de "una sola actividad activa a la vez" (§6.3, paso 2).
- Manejo de errores silencioso (nunca mostrar error técnico al participante).
- Botón "Imprimir consigna" como respaldo analógico.
- `/admin/observatorio` con la regla de mínimo 30 respuestas (§6.6).
- Correr el script de seed (§7.2) para cargar las actividades de ejemplo del Curso 1 y Curso 2, en una instancia demo no pública.

**Hecho quiere decir — probar esto de verdad, con dos dispositivos distintos, no solo leer el código:**
- [ ] Se puede crear una actividad de cada uno de los 6 tipos y responderla desde un celular real escaneando el QR
- [ ] La pantalla `/vivo` en una laptop se actualiza dentro de los 2-3 segundos de haber respondido desde el celular
- [ ] Responder dos veces desde el mismo navegador a la misma actividad no duplica el voto ni rompe nada — muestra el mensaje de "ya registramos tu respuesta"
- [ ] En la colección `respuestas`, después de las pruebas, no hay ningún campo ni valor que identifique a quién respondió
- [ ] El Observatorio no muestra ningún agregado con menos de 30 respuestas
- [ ] Apagar el wifi del celular a mitad de una respuesta no rompe la pantalla `/vivo` (sigue mostrando el último dato)

### Etapa 6 — Página de ayuda, footer legal, y detalles pendientes

**Objetivo:** cerrar los cabos sueltos de contenido.

**Tareas:**
- `/ayuda` según §7.5.
- Link a `/ayuda` en el footer de todas las páginas y al final de cada página de curso.
- Revisar que ningún dato sensible (nombre de empresa en instancias privadas, notas internas) sea visible en ninguna página pública, ni siquiera mirando el código fuente HTML o la respuesta de red en las herramientas de desarrollador del navegador.

**Hecho quiere decir:**
- [ ] `/ayuda` existe, tiene el número de la Línea 141 correcto y el link correcto
- [ ] Inspeccionando el HTML fuente de una página de curso pública, no aparece ningún dato de `empresas.notasInternas` ni `empresas.contactoEmail`
- [ ] El footer de cada página incluye el link a `/ayuda`

### Etapa 7 — Migración de Instagram

**Objetivo:** dejar la cuenta de Instagram lista, según lo decidido en `blog-content-plan.md` §4.b.

**Tareas (no son de código, son de gestión de cuenta):**
- Actualizar foto de perfil de `@equilibrarprosalud` con `marca/favicon.svg` exportado a PNG (ver pendiente en `marca/README.md`).
- Actualizar bio con el posicionamiento de marca personal.
- Agregar el link del sitio (cuando exista URL de Netlify) en la bio.

**Hecho quiere decir:**
- [ ] El perfil de Instagram tiene foto y bio actualizadas
- [ ] El link del sitio está en la bio

### Etapa 8 — Microinteracciones y pulido visual (la última, y la que se puede recortar)

**Objetivo:** llevar las páginas de marca (Home, Sobre mí) a fidelidad completa con la guía visual de Solvior.

**Tareas, en orden de prioridad** (si hay que cortar por tiempo, cortar desde abajo de esta lista):
1. Scroll suave con Lenis
2. Animaciones de entrada WOW.js (`fadeInUp`/`fadeInLeft`/`fadeInDown`) en las secciones de home y sobre mí
3. Botón primario con la animación completa del chip azul (guía §4)
4. GSAP SplitText en los títulos H1/H2
5. Contadores Odometer (si se usan cifras animadas)
6. Cursor personalizado de dos anillos (guía §5) — **el más prescindible de todos**

**Hecho quiere decir:**
- [ ] Cada ítem que se haya implementado coincide con los valores exactos de timing/easing de la guía visual (no aproximados)
- [ ] Ninguna animación rompe la usabilidad en mobile (la guía ya indica qué desactivar en mobile — respetarlo)
- [ ] El sitio sigue siendo perfectamente usable si se desactivan todas las animaciones (JavaScript debe ser progresivo, no bloqueante)

---

## 9. Página exclusiva para Guillermo (`/empezar-aca`) — contenido final

> Copiar este contenido tal cual en la página. Tono: directo, cercano, como si se lo estuviera explicando alguien de confianza, no un manual técnico. Sin jerga de desarrollo.

---

### [Título de la página] Che, Guillermo — esto es lo que armamos

Esta página es solo para vos. No está en el menú del sitio y no aparece en Google. Es la explicación de qué es esto, cómo se usa, y qué hacer primero.

### Qué es esto, en una frase

Un sitio con tu nombre, un blog, y algo que hoy no tiene nadie en tu rubro en Argentina: un sistema para hacer las dinámicas de tus charlas con el celular de la gente, en vivo, de forma anónima, y que te queden los resultados guardados.

### Por qué lo armamos así

Relevamos las páginas de otras consultoras y capacitadores del rubro (Convivir, Lumenti, Ahora Wellness, y varios speakers corporativos). Todas se parecen: una fundación sin cara visible, o un catálogo de charlas sin nada más. Ninguna tiene lo que vos tenés — 25 años de laburo real, con sindicatos, con ART, con el Estado, en comedores de planta y talleres ferroviarios, no en oficinas. El sitio está pensado para que eso se note, no para que te parezcas a ellos.

Y hay una sola cosa que nadie más ofrece: la posibilidad de que, en medio de una charla, la gente conteste algo desde el celular — anónimo, nadie sabe quién contestó qué — y vos veas el resultado proyectado en el momento. Es la versión digital de lo que ya hacés con tus "disparadores y dinámicas interactivas", pero con memoria: cada encuentro deja un dato que se suma a los anteriores.

### Cómo entrás

El sitio tiene una parte pública (la que ve cualquiera) y un panel privado para vos, en `/admin`. Te vamos a pasar el usuario y la contraseña por WhatsApp, aparte de esta página — no los escribimos acá por seguridad.

### Cómo se usa — lo que vas a hacer más seguido

**1. Cargar una charla nueva para una organización**

Vas a `/admin/instancias`, tocás "Nueva", elegís cuál de tus tres formatos es (Encuentro, Taller o Programa), para qué empresa o sindicato es, y las fechas. Si ya diste ese mismo curso antes para otra organización, mejor: buscá esa instancia vieja y tocá "Duplicar" — te arma una copia con el mismo contenido, vos solo cambiás la organización y las fechas.

**2. Preparar las actividades de un encuentro**

Dentro de esa charla, entrás al encuentro del día y cargás las preguntas que vas a hacer. Elegís el tipo: Sí/No, opción única, opción múltiple, número, fecha, o texto libre (esta última arma una nube de palabras con lo que la gente escribe, queda muy bien proyectada). Ya te dejamos tres cursos con preguntas de ejemplo cargadas — podés usarlas tal cual o cambiarlas.

**3. El día de la charla**

Abrís la pantalla "Vivo" de ese encuentro en tu notebook o tablet, la proyectás. Ahí aparece un código QR grande y también un código cortito para el que no puede escanear. La gente entra desde su celular, sin bajar nada, sin registrarse, contesta, y vos ves el gráfico armarse en vivo (tarda un par de segundos en actualizarse, no es instantáneo pero se siente en vivo). Cuando terminó esa pregunta, tocás "Siguiente" y pasás a la próxima.

**4. Después de la charla**

Nada más que hacer con el sistema — las respuestas ya quedaron guardadas, sumadas a las de todas las veces anteriores que diste ese mismo curso. Con el tiempo vas a poder ver, en el panel de "Observatorio", cosas como "el 78% de la gente que pasó por mis encuentros dijo que se preocupó por un compañero y no supo qué hacer" — un dato real, tuyo, que no tiene nadie más.

**5. El blog**

Ya está cargado con 10 temas armados (a partir de investigar qué se está hablando y qué no en Argentina sobre esto), pero **son borradores, no notas terminadas** — faltan escribirse. Cuando quieras publicar uno, entrás a `/admin/posts`, lo completás o lo mandás a que te ayuden a redactarlo, y tocás "Publicar".

### Tus prioridades — qué atacar primero

**Esta semana, sin necesidad de tocar el sitio:**
- [ ] Probá la dinámica de preguntas en tu próxima charla, aunque sea con lápiz y papel o a mano alzada, para ver si engancha con tu público real
- [ ] Empezá a conectar en LinkedIn con la gente con la que ya trabajaste — delegados, RRHH, gente de ART y sindicatos de estos 25 años. Hoy tenés muy pocos contactos ahí, y es lo que más rápido te va a servir
- [ ] Después de cada charla que des, grabate un audio de 2 minutos contando qué preguntó la gente, qué te sorprendió, qué frase se te quedó dando vueltas. Con eso solo, sin escribir nada más, se arma contenido para el blog, LinkedIn e Instagram

**Cuando el sitio esté publicado:**
- [ ] Revisá la página `/sobre-mi` y avisanos si algo de tu historia está mal contado
- [ ] Elegí 2 o 3 de los 10 temas del blog para que te ayudemos a terminarlos y publicarlos primero
- [ ] Mandanos el contacto de alguien de SITOS, la Fundación Provincia ART, o Trenes Argentinos que te pueda dar un testimonio real — hoy tenemos tres inventados solo para mostrar cómo se ve la sección, hay que reemplazarlos

**En redes (Instagram @equilibrarprosalud):**
- [ ] Cambiá la foto de perfil y la biografía (te vamos a pasar el archivo listo)
- [ ] Empezá a publicar 2-3 veces por semana con lo que ya tenés: fotos de tus charlas + el audio de 2 minutos de después de cada encuentro
- [ ] Nunca publiques la cara de un trabajador sin que te digan que sí — mejor una foto de espaldas o de todo el grupo que arriesgarte

**Más adelante (no ahora):**
- Certificados descargables, el quiz final con explicación, y saber quién completó cada curso: eso lo dejamos pensado pero no lo construimos todavía. Primero queremos ver si la parte de las preguntas en vivo funciona bien en tus charlas reales.

### Si algo no funciona o querés cambiar algo

Anotá bien qué pantalla, qué botón, y qué esperabas que pasara. Cuanto más concreto, más rápido se arregla.

---

## 10. Checklist final antes de decir "Fase 1 lista"

No alcanza con que cada etapa individual esté tildada. Antes de entregar, verificar de punta a punta:

- [ ] Se puede completar el flujo entero sin ayuda: crear empresa → crear instancia → duplicarla → cargar actividades → proyectar → responder desde un celular → ver resultado en vivo → ver el dato sumado en el Observatorio
- [ ] Ninguna página pública expone datos de una empresa que no haya autorizado visibilidad pública
- [ ] Ninguna respuesta de actividad tiene forma de rastrearse hasta una persona
- [ ] El sitio entero, en mobile, no tiene scroll horizontal en ninguna página
- [ ] `/empezar-aca` tiene el contenido de §9 sin parafrasear
- [ ] Los 10 posts de blog existen como borrador, ninguno publicado sin revisión humana
- [ ] El botón de WhatsApp funciona en cada página y va al número correcto
- [ ] El favicon y el logo son los de `marca/`, no los del tema Solvior de referencia
- [ ] No hay ningún secreto (contraseña de admin, clave de cuenta de servicio de Firebase) commiteado en el repositorio, ni siquiera en commits viejos

---

## 11. Preguntas pendientes — resueltas

1. **Visibilidad del repositorio:** `github.com/quaglius/billy` es **privado**. Confirmar en GitHub → Settings → General → Danger Zone que efectivamente figura como "Private" antes del primer push, y no cambiarlo a público más adelante sin antes rotar `ADMIN_PASSWORD` y regenerar la clave de cuenta de servicio de Firebase (porque este plan queda con la contraseña de arranque en texto plano, ver §2.2).
2. **Proyecto de Firebase:** se crea uno nuevo en la Etapa 0, bajo la cuenta de Google de quien gestiona hoy el proyecto (no la de Guillermo). Si más adelante conviene transferir la titularidad del proyecto a una cuenta de Guillermo, Firebase permite agregar otro usuario como propietario desde Configuración del proyecto → Usuarios y permisos — no hace falta migrar datos, es un cambio de permisos.
