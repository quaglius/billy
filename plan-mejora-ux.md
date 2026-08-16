# Plan de mejora UX/UI — Guille Nuesch / Equilibrar ProSalud

Auditoría 16 ago 2026. Live: https://guillenuesch.netlify.app/  
Refs (estructura, no marca): [Solvior blog](https://solvior.themejunction.net/blog/), [blog-grid](https://solvior.themejunction.net/blog-grid/), `fotos/solvior-home05-guia-visual.md` §§19, 32, 33.  
Canvas: `canvases/auditoria-ux.canvas.tsx` (abrir al lado del chat).

**Reglas que no se tocan:** tokens `#051229` / `#0075ff` / `#e1e8f0`, Lato + Libre Franklin, radius solo píldoras/círculos (nunca 12/16/24 en cards), sin cursor custom (plan-de-trabajo Etapa 8 ítem 6), sin clonar assets con copyright de Solvior. WhatsApp: **una** CTA, **una** flecha.

---

## Cómo se auditó

- Código de las 37 rutas en `src/pages/`.
- Live: `/`, `/blog`, `/cursos`, `/ayuda` (home todavía muestra “no hay notas”; el blog live ya tiene 2 posts publicados).
- Inventario de `public/fotos/guille/*`, `public/marca/*`, `public/shapes/*`.
- Browser MCP no disponible en la sesión; Solvior se contrastó por fetch + la guía visual local.

---

## Hallazgos más graves (priorizados)

| Pri | Pantalla | Archivo | Qué cambiar | Impacto | Estado |
|---|---|---|---|---|---|
| P0 | Home | `src/pages/index.astro` | Sacar `prerender = true` (o islar el bloque blog). Hoy el HTML estático miente: “Todavía no hay notas publicadas” con posts live. | Confianza | ✅ |
| P0 | Home features | `src/styles/base.css` `.feature-item__icon` | SVG negro sobre `#051229`. `filter: brightness(0) invert(1)` o inline `currentColor: #fff`. Ratio ~1.2:1, falla WCAG AA. | Accesibilidad | ✅ |
| P0 | Global CTA | `BotonPrimario.astro` + `boton.css` | Dos `i.tji-arrow-right` (chevron duplicado). Dejar **una** flecha. Chip azul que se expande se mantiene. | Pedido explícito | ✅ |
| P0 | Float WA | `WhatsAppFlotante.astro` | Texto “WA”. Ícono SVG, `aria-label`, `focus-visible`, `bottom` que no tape el CTA. | Usabilidad | ✅ |
| P0 | Blog listado | `src/pages/blog/index.astro` | Lista pelada. Implementar Solvior §33: page-header, col 8/4, cards borde `#ced7e0`, thumb 16:10 `scale(1.12)`, date badge blur, meta chip, “Leer más”, sidebar (búsqueda local, recientes, CTA WhatsApp). Covers: `blog-laptop.png`, `blog-cuerpo-entero-oficina.png`, `blog-camisa-blanca-escritorio.png` (ciclo por slug; `imagenPortadaUrl` si existe). | Marca | ✅ |
| P0 | Post | `src/pages/blog/[slug].astro` | Hero imagen, meta fecha, author `avatar-sonrisa.png` en círculo, shine en imagen, OG image local. | Marca | ✅ |
| P0 | Home IG | `src/pages/index.astro` | Quitar aside “PENDIENTE — aplicar en la cuenta”. Eso es `/empezar-aca`. Home: handle + 4 pilares + link. | Marca | ✅ |
| P1 | Inner pages | nuevo `PageHeader.astro` | Banda `#051229` + overlay foto `blog-cuerpo-entero-oficina.png` (no el webp de Solvior). H1 blanco 48/42/36. Breadcrumb píldora. Padding 96/64 mobile. | Jerarquía | ✅ |
| P1 | Cursos | `cursos/index.astro` + `[slug].astro` | 3 cards (foto + formato + extracto + hover). Detalle con objetivos/temario en checklist, CTA WhatsApp. | Conversión | ✅ |
| P1 | Header | `Header.astro` | Hamburger ≤767, panel `data-lenis-prevent`, nav no wrap. Sticky. | Mobile | ✅ |
| P1 | Admin | `admin/*` | Chrome con nav de secciones, tablas (estado pill), forms 640px, mensajes error/éxito, login centrado **sin** float WA. Edit curso/empresa/post + instancias. | Operación | ✅ |
| P1 | Vivo + responder | `vivo.astro`, `a/[codigo].astro` | Código 72px, QR alto contraste, gráfico con clases (no inline), Sí/No 56px full-width, empty “no hay actividad” como card. | Charla real | ✅ |
| P1 | Home productos/testimonios | `index.astro` + `base.css` | Hover translateY(-4px) 0.3s, borde `#ced7e0`, link line-hover. Avatar de iniciales (no foto de Guille como si fuera el autor). | Pulido | ✅ |
| P2 | Footer | `Footer.astro` | 3–4 col: marca, nav, redes círculos, copyright bar navy. | Fidelidad | ✅ |
| P2 | Sobre mí | `sobre-mi.astro` | Composición recorte + círculos; no `<img>` suelta bajo el H1. | Fidelidad | ✅ |
| P2 | GO TOP | nuevo | 40×130 vertical, aparece al scroll ≥768. | Guía §22 | ✅ |
| P2 | Observatorio | `observatorio.astro` | Barra hacia umbral 30; layout de métrica, no `<ul>`. | Admin | ✅ |

Cursor custom: **no**. Plan original lo marca como el más prescindible.

---

## Design tokens (aplicar, no reinventar)

Ver `src/styles/tokens.css`. Añadir utilidades:

- `--focus-ring: 2px solid #0075ff; --focus-offset: 3px`
- Links `.line-hover`: underline scaleX 0→1, 0.3s
- Cards: `border: 1px solid var(--tj-color-border-2)`; hover imagen `transform: scale(1.12)`, 0.4s ease
- Date badge: `background: rgba(247,247,247,0.1); backdrop-filter: blur(35px)`
- Spacing sección: 80px desktop / 48px mobile (hoy 40/80 inconsistente)
- Features: 4 col ≥768, 2 col ≥480, 1 col mobile (guía §27)

Estados obligatorios en cada flujo: **hover, focus-visible, empty, loading (si hay fetch), error**.

---

## Imágenes (usar estas, no stock)

| Archivo | Uso |
|---|---|
| `public/fotos/guille/hero-brazos-cruzados.png` | Hero (ya) |
| `public/fotos/guille/hero-hires-sonrisa.png` | srcset 2× |
| `public/fotos/guille/about-gesticulando.png` | Sobre mí |
| `public/fotos/guille/blog-laptop.png` | Cover blog 1, about shine |
| `public/fotos/guille/blog-cuerpo-entero-oficina.png` | Cover blog 2, page-header |
| `public/fotos/guille/blog-camisa-blanca-escritorio.png` | Cover blog 3, recent 100×100 |
| `public/fotos/guille/avatar-sonrisa.png` | Author |
| `public/shapes/feature-*.svg` | Features, invertidos a blanco |
| `public/marca/logo-horizontal.svg` / `-oscuro.svg` | Header / footer |

---

## Microinteracciones (sí / no)

**Sí:** Lenis ≥768 (ya), fadeIn secciones (ya), SplitText títulos (ya), chip del botón (ya, con **una** flecha), scale imagen blog, line-hover, shine unificado (post-hero, thumb blog, thumb curso, about), hamburger, GO TOP bounce. `prefers-reduced-motion: reduce` apaga todo.

**No:** cursor de dos anillos, magiccursor, clonar `carrow.png` de Solvior.

---

## Admin — IA concreta

- `AdminChrome.astro`: título, nav (Cursos, Empresas, Instancias, Posts, Observatorio, Salir), `noindex`.
- Tablas: columnas Título / Estado / Acciones. Pill `publicado` azul, `borrador` gris, `privada` gris.
- Forms: `max-width: 640px`; inputs 48px alto; checkbox no recortado por `border-radius: 50px`.
- Login: card 420px centrada, fondo `#e1e8f0`, **ocultar** WhatsApp flotante (`Layout` prop `flotante={false}`).
- Duplicar: ya pide empresa+fechas. Añadir resumen “se copian N encuentros / M actividades”.
- Mobile: tabla → cards apiladas (`display:block` thead hidden ≤767).

---

## Orden de ejecución (esta sesión)

1. Contraste + focus + WhatsApp una flecha + ícono float  
2. PageHeader + blog listing/post tipo Solvior + covers locales  
3. Home SSR posts + sacar IG pendiente + hover productos  
4. Cursos cards + inner pages  
5. Admin chrome + login + tablas  
6. Vivo / responder si entra  
7. Footer / about / GO TOP si entra  
8. Forms edit admin restantes + shine consistente + testimonios con avatar  

**Hecho 16 ago (tarde):** vivo proyección, `/a/[codigo]` tap 56px, footer 4 col, Sobre mí composición, GO TOP, Observatorio barras, duplicar con conteo, skip-link/focus tokens. Instagram pendiente no está en home.

**Hecho 16 ago (noche):** edit curso/empresa/post con feedback ok/error; forms 640px / inputs 48px; shine en post, blog, cursos y Sobre mí; testimonios con inicial en círculo navy (no se usa la cara de Guille como si fuera el autor). P0/P1/P2 de código **cerrados**.

**Queda fuera de código (no automatizable acá):**
- Instagram: foto de perfil, bio y highlight en la cuenta real (`@equilibrarprosalud`)
- Firebase Storage / plan Blaze para subidas
- Testimonios reales de SITOS, Fundación Provincia ART y Trenes Argentinos (hoy hay placeholders honestos)
- Rotar `ADMIN_PASSWORD` si el repo es público

Commits frecuentes, push cada 3–4 a `main`. Sin Netlify CLI.
