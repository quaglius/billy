# Proyecto Guille Nuesch — sitio, blog y plataforma de cursos

Sitio de marca personal para **Guillermo "Billy" Nuesch**, capacitador en salud mental y prevención de consumos problemáticos en el ámbito laboral (25+ años de trayectoria con sindicatos, ART, organismos públicos, transporte, salud e industria).

El proyecto tiene tres patas: **marca personal + blog con foco SEO + una plataforma de cursos con actividades interactivas en vivo** que hoy no ofrece nadie en el nicho.

## Documentos

| Documento | Qué contiene |
|---|---|
| [plan-de-trabajo.md](plan-de-trabajo.md) | **Para ejecutar la construcción, empezar por acá.** Especificación completa: stack técnico, modelo de datos, mapa de páginas, etapas con criterios de aceptación, y el contenido final de la página exclusiva para Guillermo |
| [revision-critica.md](revision-critica.md) | Revisión crítica de todo el proyecto: los tres problemas estructurales, mejoras de plataforma, plan de redes y qué hacer primero |
| [estrategia-sitio-web.md](estrategia-sitio-web.md) | Análisis de competencia, arquitectura del sitio, metodología propia, productos, y el diseño de la plataforma de cursos (Fase 1 y backlog) |
| [cursos-demo.md](cursos-demo.md) | Tres cursos completos con sus actividades y consignas ya redactadas, quiz final de ejemplo, y el diseño del Observatorio de datos anónimos |
| [blog-content-plan.md](blog-content-plan.md) | Diagnóstico de huecos de contenido, 10 posts pilar con keywords y ángulos, y el plan de distribución en Instagram / LinkedIn / YouTube |
| [guillermo-perfil.md](guillermo-perfil.md) | Perfil completo: bio, trayectoria, formación, clientes, temas, y el marco conceptual del curso SEDRONAR/INAP como referencia pedagógica |
| [fotos-index.md](fotos-index.md) | Índice curado del banco de fotos: cuáles usar, para qué, cuáles evitar y las advertencias de consentimiento |
| [fotos/solvior-home05-guia-visual.md](fotos/solvior-home05-guia-visual.md) | Guía visual de implementación del front: tokens, tipografía, animaciones y specs para clonar el layout de referencia |
| [marca/README.md](marca/README.md) | Logo, ícono y favicon: concepto, archivos SVG listos para usar, y pendiente de exportar tamaños PNG/ICO |

Datos crudos: [`linkedin.txt`](linkedin.txt) (perfil original) y [`fotos/descripciones.json`](fotos/descripciones.json) (análisis técnico de las imágenes).

## Canales

- **WhatsApp (contacto principal):** +54 9 11 6831-3878
- **Instagram:** [@equilibrarprosalud](https://www.instagram.com/equilibrarprosalud)
- **YouTube:** @EquilibrarSaludMentalyAdicciones

## Estado

Fase de definición: no hay código todavía. Repositorio: [github.com/quaglius/billy](https://github.com/quaglius/billy.git) (privado). Se publica en **Netlify** bajo la marca "Guille Nuesch" (sin dominio propio por ahora), con **Firebase** (Firestore + Storage, plan gratuito) como base de datos y archivos. Login del panel de administración con usuario y contraseña propios (no Firebase Auth) — Guillermo es el único administrador. Ver [plan-de-trabajo.md](plan-de-trabajo.md) para el detalle completo antes de empezar a construir.

**Lo más importante a tener presente:**

- **Anonimato por diseño, pero midiendo todo.** Las actividades en vivo no piden identificación de ningún tipo. No es una decisión técnica: bajo la Ley 25.326 las respuestas sobre consumo y la afiliación sindical son datos sensibles, y si la persona se identifica, miente. Los datos se agregan **por curso**, nunca por persona ni por empresa — y ese acumulado es un activo propio (el Observatorio).
- **Las páginas de curso son privadas por default.** Publicar que una empresa hace un programa de prevención de adicciones es información de esa empresa, no de Guillermo.
- **El motor de actividades se construye propio**, no se terceriza a Mentimeter ni similares: es la capacidad diferencial y los datos quedan en su poder.
- **Nunca publicar rostros de trabajadores sin autorización**, y con más razón en redes.
- **El hero va con la foto del sweater azul, no con la de traje.** El diferencial es no parecer la consultora corporativa genérica. Ver [fotos-index.md](fotos-index.md), sección 0.
