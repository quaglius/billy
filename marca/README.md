# Marca — Guille Nuesch

Sistema de logo e iconografía para el sitio. Reutiliza 1:1 los tokens de color y tipografía ya definidos en la [guía visual de Solvior Home 05](../fotos/solvior-home05-guia-visual.md), así que encaja sin fricción en el layout que se va a construir.

## El concepto

Un ícono, no un monograma. En vez de las iniciales "GN" (que ya usa medio internet), el mark es **dos personas que construyen un espacio de conversación, con una señal de avance en el centro**. La forma azul termina en una cola de diálogo: no representa una consulta aislada, sino una conversación que sostiene. Encaja con cuatro cosas a la vez:

1. Pone a las personas antes que a la herramienta o la institución.
2. Es lo que Guillermo hace literalmente: abrir y sostener espacios de conversación en el trabajo.
3. Conecta con el método completo: escuchar, nombrar, equipar y sostener.
4. Anticipa el diferencial del sitio — participación con respuesta y avance concreto — sin caer en cerebros, corazones, manos ni cruces médicas.

Es deliberadamente simple: a 16px (tamaño real de pestaña de navegador) un ícono con muchos detalles se vuelve una mancha. Este se lee incluso ahí.

## Archivos

| Archivo | Uso |
|---|---|
| `favicon.svg` | **El archivo para la pestaña del navegador**, ícono de app y base del avatar de redes (círculo navy `#051229`, figura clara y figura azul). Ya trae fondo, no necesita nada más encima. |
| `icono-oscuro.svg` | Mark solo, sin fondo, trazo oscuro. Para usar sobre fondos claros (`#f7f7f7`, `#e1e8f0`, blanco). |
| `icono-claro.svg` | Mark solo, sin fondo, trazo claro. Para usar sobre fondos oscuros (`#051229`). |
| `logo-horizontal.svg` | Ícono + "Guille Nuesch" + tagline "Salud mental en el trabajo". Para el **header** (fondo claro). |
| `logo-horizontal-oscuro.svg` | Misma pieza en blanco. Para el **footer** (fondo `#051229`). |
| `logo-vertical.svg` | Ícono arriba, nombre y tagline centrados abajo. Para usos cuadrados: sello de página, portada de PDF (media kit, certificados), o como base de foto de perfil en redes si se prefiere el logo completo al ícono solo. |

## Uso en el sitio (HTML)

```html
<!-- Favicon: SVG moderno + fallback -->
<link rel="icon" type="image/svg+xml" href="/marca/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/marca/favicon-32.png">
<link rel="apple-touch-icon" sizes="180x180" href="/marca/favicon-180.png">

<!-- Header -->
<img src="/marca/logo-horizontal.svg" alt="Guille Nuesch" height="40">

<!-- Footer (fondo #051229) -->
<img src="/marca/logo-horizontal-oscuro.svg" alt="Guille Nuesch" height="36">
```

## Pendiente: exportar tamaños raster (PNG/ICO)

Los SVG son el archivo maestro y alcanzan para el sitio (todos los navegadores modernos soportan favicon en SVG). Pero **Instagram, LinkedIn, WhatsApp Business y el `apple-touch-icon` de iOS todavía piden PNG**, y no hay una herramienta de conversión instalada en este entorno (`magick`/`inkscape`/`rsvg-convert` no están disponibles) para generarlos automáticamente.

Paso siguiente, dos minutos: subir `favicon.svg` a **[realfavicongenerator.net](https://realfavicongenerator.net)** (gratis, no requiere cuenta) y descargar el paquete completo — genera automáticamente:

- `favicon-16.png`, `favicon-32.png`, `favicon-48.png` (navegador)
- `favicon-180.png` (`apple-touch-icon`, iOS)
- `favicon-192.png`, `favicon-512.png` (Android / PWA)
- `favicon.ico` (fallback para navegadores viejos)

Guardar el resultado en esta misma carpeta (`marca/`). Para el avatar cuadrado de Instagram/LinkedIn/WhatsApp, exportar `favicon.svg` a PNG 512×512 con cualquier conversor online (mismo sitio sirve) — el círculo navy ya deja margen de sobra para el recorte circular que hacen esas plataformas.

## Reglas de uso

- **No** estirar el ícono de forma no proporcional.
- **No** poner el ícono oscuro (`icono-oscuro.svg`) sobre fondos oscuros, ni el claro sobre fondos claros — sin contraste el check azul queda flotando sin bubble visible.
- El azul `#0075ff` del check **no cambia nunca**, sea cual sea el fondo — es el hilo de color entre el logo y el resto del sitio (botones, links, acentos).
- Margen mínimo alrededor del ícono: el ancho del propio ícono ÷ 4, en cualquier aplicación (tarjetas, redes, papelería).
