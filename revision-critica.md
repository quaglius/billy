# Revisión crítica del proyecto — agosto 2026

> Revisión de todo lo trabajado hasta ahora ([perfil](guillermo-perfil.md), [plan de blog](blog-content-plan.md), [banco de fotos](fotos-index.md), [estrategia de sitio](estrategia-sitio-web.md)), con foco en tres preguntas: ¿esto ayuda a Guillermo a vender?, ¿es usable de verdad en una sala con 40 trabajadores?, ¿el contenido tiene por dónde circular?
>
> Adelanto la conclusión: hay **tres problemas estructurales** y un conjunto de mejoras puntuales. El más importante es que la división Fase 1 / Fase 2 que propuse antes está mal hecha y conviene rehacerla.

---

## ✅ Decisiones tomadas sobre esta revisión (agosto 2026)

Tres puntos de este documento fueron resueltos y **lo que sigue abajo hay que leerlo a la luz de estas decisiones**:

1. **Blog: van los 10 posts pilar completos**, no un arranque de 3-4. La grilla de 10 semanas sigue en pie como contenido de lanzamiento; el punto 3.1 sobre sostenibilidad aplica al *después* del lanzamiento, no al lanzamiento.
2. **El motor de actividades se construye propio** (punto 2.1). Existe Mentimeter y equivalentes, pero tenerlo como capacidad propia es clave, y hay razones que lo sostienen: sin marca ajena en su charla, sin costo por participante, control sobre datos sensibles, y —la más importante— **los datos acumulados quedan en su poder**. De la recomendación original se conserva solo probar la dinámica antes de terminarla, aunque sea en papel.
3. **Anonimato total, pero midiendo todo** (Problema 3). Sin login en ningún caso para las actividades. Y las respuestas se agregan **por curso** —nunca por persona ni por empresa— para construir un acumulado propio: **el Observatorio**. Esto no es un anexo técnico, es parte del discurso del método: los cuatro pasos arrancan con *Escuchar*, y el Observatorio es la forma sistemática de hacerlo. Diseño completo en [cursos-demo.md](cursos-demo.md) y [estrategia-sitio-web.md](estrategia-sitio-web.md).

También quedó resuelto el **Riesgo 5** (falta de foto profesional): ya hay retratos de estudio y recortes sin fondo. Ver [fotos-index.md](fotos-index.md), sección 0 — con una advertencia de posicionamiento sobre cuál usar en el hero.

---

## Parte 1 — Los tres problemas estructurales

### Problema 1: la Fase 1 no vende nada (y el error es mío)

En [estrategia-sitio-web.md](estrategia-sitio-web.md) dejé una Fase 1 que consiste en: sitio de marca + blog + alta de cursos y empresas + página pública de cada curso. Todo lo interesante —las actividades en vivo por QR— quedó en Fase 2.

Releyéndolo con criterio comercial, esa división está mal. **Lo que quedó en Fase 1 es un folleto.** En una reunión con la comisión directiva de un sindicato o con RRHH de una empresa, mostrar "tengo un sitio con mi cronograma y mi temario" no diferencia a Guillermo de Convivir, Lumenti o cualquier consultora: todas tienen eso.

Lo que sí diferencia es una demo de 30 segundos: Guillermo saca el celular, muestra un QR en la pantalla, la persona que tiene enfrente lo escanea, responde, y ve su respuesta aparecer en vivo en el gráfico proyectado. Eso se vende solo, y no lo tiene nadie en el nicho.

**El error de fondo fue calcular mal el peso técnico.** Asumí que las actividades en vivo eran "la parte pesada" porque las agrupé con login de usuarios, quiz y generación de certificados PDF. Pero son cosas separables:

| Componente | Peso real | ¿Hace falta para la demo que vende? |
|---|---|---|
| Motor de actividades + QR + pantalla de resultados en vivo | Bajo-medio | **Sí, es el core** |
| Login de participantes | Medio | No — y además conviene NO tenerlo (ver Problema 3) |
| Quiz final con explicaciones | Medio | No |
| Certificado PDF | Medio-alto | No |
| Analítica por alumno | Medio | No |

Sin login y sin PDF, el motor de actividades es sustancialmente más liviano: un formulario que escribe una respuesta en una tabla, y una pantalla que lee esa tabla cada 2 segundos y dibuja un gráfico. La parte "en tiempo real" no necesita websockets ni infraestructura especial — con recargar los datos cada par de segundos alcanza y sobra para una sala de 40 personas.

**Propuesta: rehacer el corte de fases así.**

**Fase 1 (lo que se construye ahora):**
- Sitio de marca: home, sobre Guillermo, cómo trabajo, contacto (WhatsApp)
- Blog con los primeros posts
- Alta de Cursos, Empresas e Instancias con cronograma
- Página pública por curso
- **Motor de actividades en vivo, anónimo, con QR y pantalla de resultados proyectable** ← se adelanta desde Fase 2

**Fase 2 (backlog):**
- Identificación del participante (solo para certificados)
- Quiz final con explicación de respuestas
- Certificado PDF verificable
- Analítica por participante
- Comunidad / foro entre encuentros

---

### Problema 2: el contenido no tiene por dónde circular

El [plan de blog](blog-content-plan.md) tiene 10 posts bien pensados y un buen diagnóstico de huecos de mercado. Pero asume una distribución que hoy no existe:

- **LinkedIn: 31 conexiones, 31 seguidores.** Publicar ahí hoy es publicar al vacío. Todo el checklist de Open Graph que dejé sirve para que el link se vea lindo, pero no resuelve que no hay audiencia que lo vea.
- **Instagram: no existe.** Y es el canal natural para marca personal en este rubro.
- **YouTube: existe y está desaprovechado.** El canal @EquilibrarSaludMentalyAdicciones ya tiene material de los encuentros virtuales del ciclo de charlas. Es un activo real que no aparece mencionado en ningún plan.

Además hay un problema de sostenibilidad que no contemplé: **10 artículos largos son mucho pedir.** Guillermo da varias charlas por semana (la planilla que aparece en el banco de fotos muestra 4 organizaciones distintas en una sola semana) y tiene 60 y pico de años. Un plan que depende de que escriba ensayos de 1.200 palabras todas las semanas se muere en el post 3.

**Lo que sí es sostenible es cosechar, no crear.** Su post de LinkedIn que ya funciona (el recap del encuentro con AGOEC) lo escribió porque acababa de pasar. Ese es el motor: cada charla que da es materia prima. Detalle en la Parte 3.

---

### Problema 3: hay un riesgo legal serio en el diseño de la plataforma, y nadie lo miró

Este es el hallazgo más importante de la revisión.

El diseño actual dice: el participante **se loguea con Google o mail** y responde. Y las preguntas de Guillermo son, por la naturaleza de su trabajo, cosas como *"¿alguna vez consumiste alcohol para poder dormir después del turno?"* o *"¿viste a un compañero con signos de consumo en el trabajo?"*.

Eso significa guardar, asociado a la identidad de una persona, información sobre su consumo de sustancias. Según la [Ley 25.326 de Protección de Datos Personales](https://www.argentina.gob.ar/normativa/nacional/ley-25326-64790/texto), eso es **dato sensible** por dos vías distintas:

1. **Datos de salud** — explícitamente listados como sensibles.
2. **Afiliación sindical** — también listada como sensible, y buena parte del trabajo de Guillermo es con sindicatos, donde la instancia misma revela la afiliación.

La ley es exigente con esto: el consentimiento debe ser **libre, expreso e informado, y documentado por escrito**; los datos de salud **no pueden cederse a terceros** sin consentimiento previo expreso; y —el punto más filoso— **nadie puede ser obligado a proporcionar datos sensibles.** Un trabajador respondiendo en una actividad organizada por su empleador, en horario laboral, difícilmente pueda considerarse que consiente libremente.

Y hay tres problemas más, además del legal:

- **Pedagógico:** si la persona tiene que loguearse con su mail para contestar si toma alcohol para dormir, **miente**. La actividad pierde todo valor como disparador de reflexión, que es justamente para lo que Guillermo la quiere.
- **Político:** ningún delegado sindical va a aceptar un sistema que registre, persona por persona, qué contestó cada trabajador sobre consumos. Y los sindicatos son el canal principal de Guillermo. Un solo mal entendido acá le cierra puertas que tardó años en abrir.
- **Práctico:** pedir login con Google en un comedor de planta, con conectividad mala y celulares de gama baja, mata la participación. Las fotos del banco muestran exactamente esos contextos.

**Propuesta: anonimato por diseño, y convertirlo en argumento de venta.**

- Las actividades en vivo **no piden identificación de ningún tipo**. Ni mail, ni nombre, ni login. Se entra por el QR y se responde.
- Técnicamente: un identificador random guardado en el navegador, solo para evitar que la misma persona vote dos veces en la misma pregunta. No se asocia a ninguna identidad y se puede descartar al cerrar la actividad.
- **No se guarda IP ni ningún dato que permita reidentificar.**
- Los reportes a la empresa/sindicato son **exclusivamente agregados**, nunca individuales. Esto hay que decirlo explícito en el sitio y en la propuesta comercial.
- La identificación aparece **solo en Fase 2 y solo para el certificado**, que es el único caso donde hace falta saber quién es la persona. Y ahí el dato que se guarda es "Fulano completó el curso", no sus respuestas sobre consumo.

Y acá está lo interesante: esto no es solo cubrirse. **Es una ventaja competitiva y hay que comunicarla.** Una línea como:

> *"Las respuestas son anónimas. Nadie —ni la empresa, ni el sindicato, ni yo— puede saber quién contestó qué. Solo vemos el conjunto. Por eso la gente contesta la verdad."*

...es exactamente el tipo de garantía que destraba una negociación con un cuerpo de delegados, y que además es *pedagógicamente cierta*: es la razón por la que la dinámica funciona. Coincide, además, con cómo funciona la [Línea 141 de SEDRONAR](https://www.argentina.gob.ar/latiendo/beneficios-y-canales-de-atencion/linea-141-sedronar) (anónima, gratuita, confidencial), que es el estándar del sector.

---

## Parte 2 — Mejoras concretas a la plataforma

### 2.1 Antes de construir nada: validar con una herramienta que ya existe

Hay que ser honestos sobre una cosa: **las encuestas en vivo por QR no son un invento.** Mentimeter, Slido, AhaSlides y Kahoot hacen exactamente esto desde hace años, con nubes de palabras, votaciones y gráficos en vivo, y cuestan entre USD 17 y 200 por mes.

Esto no invalida el plan, pero lo reencuadra. La ventaja de construirlo propio no es la funcionalidad, es:

- **Está integrado al curso y a su marca** (no aparece el logo de Mentimeter en medio de su charla)
- **No tiene costo por participante ni por evento** — con volumen de charlas semanales, las licencias por asiento se vuelven caras
- **Las preguntas quedan guardadas como parte del programa**, reutilizables entre organizaciones, no rearmadas cada vez
- **Control total sobre dónde viven los datos** — relevante dado el Problema 3; las plataformas comerciales alojan en el exterior, lo que agrega una transferencia internacional de datos sensibles al análisis legal
- **Es demostrable como capacidad propia** en una reunión comercial

Pero la recomendación práctica es: **que Guillermo use Mentimeter o AhaSlides en sus próximas 2-3 charlas, ya, esta semana, antes de que construyamos nada.** Es gratis o casi, y responde la pregunta que ningún documento puede responder: *¿los trabajadores del comedor de planta efectivamente escanean el QR y participan, o miran el celular y no pasa nada?*

Si funciona, construimos con confianza. Si no funciona en ciertos contextos, aprendemos por qué (¿conectividad? ¿celulares? ¿resistencia a la dinámica?) y lo diseñamos distinto. Eso vale más que cualquier decisión que tomemos en el papel.

### 2.2 El QR necesita un plan B (o la actividad se cae en la mitad de las salas)

Mirando el [banco de fotos](fotos-index.md): comedores de planta con hornos industriales, aulas ferroviarias, círculos de sillas en predios, salones rústicos, centros de monitoreo. **No todos esos lugares tienen wifi ni buena señal**, y no todos los participantes tienen un smartphone con datos disponibles.

Mínimos para que esto no se rompa:

- **Código corto además del QR:** que la pantalla muestre también algo tipo `guillenuesch.com/x/K7M2`, tipeable en 5 segundos. Resuelve el celular que no lee QR, la cámara con problemas, y la persona sentada lejos de la pantalla.
- **Diseñar para participación parcial:** si contestan 12 de 40, la actividad tiene que seguir siendo útil. Nunca mostrar "12 de 40 respuestas" (expone y presiona); mostrar solo los resultados sobre quienes participaron.
- **Que la pantalla de resultados no se rompa si se cae internet:** que mantenga en pantalla los últimos datos recibidos en vez de mostrar un error en el medio de la charla. Un error técnico proyectado frente a 40 personas le cuesta autoridad.
- **Salida analógica:** que Guillermo pueda ver e imprimir la consigna, para hacerla a mano alzada si la tecnología no acompaña ese día. La actividad es la dinámica, no la pantalla.

### 2.3 Las páginas de curso no pueden ser todas públicas

Punto que no estaba contemplado y es delicado: si se publica una página que dice *"Prevención de consumos problemáticos — Trenes Argentinos Línea Roca, marzo 2026"*, se está informando públicamente que esa organización tiene un programa de prevención de adicciones en marcha. **Eso puede no gustarle nada al cliente**, y es información que le pertenece a él, no a Guillermo.

Cada Instancia de curso necesita un control de visibilidad con tres estados:

| Estado | Quién la ve | Para qué sirve |
|---|---|---|
| **Privada** | Solo con el link/QR directo, sin indexar en buscadores | Default para clientes corporativos y sindicales |
| **Pública** | Visible y linkeada desde el sitio | Cuando el cliente autoriza y quiere mostrarlo |
| **Anonimizada** | Pública pero sin nombre de la organización ("Programa para un sindicato del sector ferroviario") | Sirve de portfolio sin exponer al cliente |

**El default tiene que ser privada.** Es más fácil pedirle permiso a un cliente para publicar que explicarle por qué apareció en Google.

### 2.4 El panel de administración tiene que ser usable desde el celular

Guillermo no es un usuario técnico y trabaja en la calle: viaja a Mar del Plata, a Olavarría, a Berisso. La carga de un curso probablemente pase la noche anterior, desde el celular o una tablet.

- **Mobile-first en serio**, no "responsive porque sí": botones grandes, formularios cortos, nada de tablas de 12 columnas.
- **Duplicar una instancia con un click.** Es lo que más va a usar: el mismo curso base para otra organización, cambiando fechas y nombre. Si eso toma 30 segundos, usa el sistema; si toma 15 minutos de formularios, vuelve al Word.
- **Guardado automático de borradores.** Se le va a cortar la carga a la mitad más de una vez.
- **Un solo lugar para "lo de hoy":** una vista tipo "mi próxima charla" con el cronograma del día y los QR de las actividades listos para proyectar, sin tener que navegar el admin en el momento.

### 2.5 El certificado tiene que ser verificable (Fase 2, pero definirlo ahora)

Un PDF descargable sin verificación no tiene valor como credencial: cualquiera lo edita. Y para un trabajador, ese certificado puede tener valor real en su legajo o en una paritaria.

Solución barata: cada certificado lleva un código único y un QR que apunta a una página pública tipo `/verificar/ABC123` que muestra: *"Certificado válido. [Nombre] completó [curso] el [fecha], dictado por Guillermo Nuesch, X horas."* Nada más — sin datos de las respuestas.

Esto es barato de construir y sube mucho el valor percibido, sobre todo frente a un área de RRHH que necesita documentar capacitaciones.

### 2.6 Una página que falta y es la más útil de todas: "Si necesitás ayuda"

Hoy, cuando Guillermo termina una charla, un trabajador que se sintió tocado por el tema se queda sin nada. Falta una página pública, simple, permanente, linkeada desde todas las páginas de curso y desde el pie del sitio:

- **[Línea 141 (SEDRONAR)](https://www.argentina.gob.ar/latiendo/beneficios-y-canales-de-atencion/linea-141-sedronar)** — gratuita, anónima, confidencial, nacional, las 24 horas los 365 días
- Red de atención de la Provincia de Buenos Aires (donde Guillermo tiene vínculo institucional directo desde su rol en el Ministerio de Salud provincial)
- Qué esperar cuando llamás, y qué no
- Cómo acompañar a un compañero sin invadir
- Diferencia entre acompañar y diagnosticar

Vale por tres razones distintas: **es genuinamente útil** (alguien la va a usar de verdad), **es coherente con su discurso** ("lo peor que podemos hacer es no hacer nada" pierde fuerza si no decís qué hacer), y **es excelente SEO** — es exactamente lo que alguien busca a las 2 de la mañana. Es de las pocas páginas del sitio que puede traer tráfico sostenido sin depender de redes.

---

## Parte 3 — Contenido, redes y SEO

### 3.1 El motor sostenible: cosechar, no escribir

Los 10 posts del plan actual son buenos, pero son **contenido de lanzamiento**, no un sistema. Propongo separarlos:

**Contenido "pilar" (los 10 posts existentes):** se escriben una vez, son largos, cargan el SEO, se actualizan cada tanto. No tienen fecha de vencimiento. Producirlos de a uno cada 2-3 semanas, no semanal.

**Contenido "de campo" (el motor real):** después de cada encuentro, Guillermo saca 2-3 fotos (ya lo hace) y graba **un audio de 2 minutos** contando qué pasó: qué preguntó la gente, qué lo sorprendió, qué frase quedó dando vueltas. De ese audio salen, sin que él escriba nada:

- un post de blog corto (400-500 palabras)
- un post de LinkedIn
- un carrusel de Instagram
- 1-2 frases sueltas para historias

Esto es sostenible porque **no le agrega trabajo nuevo**: ya da las charlas, ya saca fotos. Solo agrega el audio. Y produce lo que ninguna consultora del rubro puede producir: material de campo real, de esta semana, de un comedor de planta.

**Regla de oro para este contenido: nunca un caso identificable.** Ni la persona, ni —salvo autorización— la organización. Siempre la situación, nunca el sujeto.

### 3.2 Instagram: el hueco está confirmado

Relevé el panorama: las cuentas fuertes de salud mental en Argentina (`@psicologasargentinas`, `@redsaludmentalarg`, `@saludmentalba`) hacen **divulgación clínica general** — ansiedad, terapia, autocuidado, dirigido al individuo. Es el mismo patrón que encontramos en el blog: **nadie habla de salud mental desde el mundo del trabajo, y menos desde el trabajo operativo y sindical.**

Un capacitador que publica desde un comedor de planta, un taller ferroviario o una asamblea gremial no compite con esas cuentas: **ocupa un espacio vacío.**

**Cuatro pilares de contenido, 2-3 publicaciones por semana:**

1. **"Del campo"** *(el diferencial)* — carrusel o foto del encuentro de la semana + qué se trabajó. Nadie más tiene este material.
2. **"Señales"** — práctico y accionable: cómo detectar, qué decir, qué no decir, cómo acompañar sin diagnosticar. Es el contenido que más se guarda y se comparte.
3. **"Tus derechos"** — normativa explicada simple: qué dice la Ley 26.657, qué cubre una licencia psiquiátrica, qué es CyMAT. Muy compartible en grupos sindicales de WhatsApp, que es donde realmente circula la información en su público.
4. **"25 años"** — frases, aprendizajes, anécdotas. Es lo que construye la marca personal y lo que lo hace citable.

**Formato:** carruseles y fotos primero (bajo costo de producción, y ya tiene el material). Video corto después, cuando haya rutina. El canal de YouTube ya tiene material largo que se puede recortar en clips verticales sin grabar nada nuevo.

**Advertencia importante:** vale acá con más fuerza lo ya señalado en el [banco de fotos](fotos-index.md) — **no publicar rostros de trabajadores identificables sin autorización.** En Instagram el alcance es mayor y menos controlable que en el sitio. Priorizar tomas de espaldas, planos generales, o foco en Guillermo. Ante la duda, no se publica.

### 3.3 LinkedIn: hay que aceptar que hoy no existe

31 seguidores significa que el contenido no llega a nadie. Antes de invertir en producir para LinkedIn, hay una tarea previa y aburrida pero necesaria: **construir la red.** Conectar con RRHH, delegados, referentes de las 30+ organizaciones donde ya trabajó, gente de ART, de sindicatos. Tiene 25 años de contactos reales que no están en la red.

Es probablemente **la acción de mayor retorno de todo el plan** y no requiere programar nada. Un objetivo razonable: 500 conexiones cualificadas en 3 meses. A partir de ahí, publicar en LinkedIn empieza a tener sentido.

### 3.4 YouTube: reactivar un activo que ya existe

El canal @EquilibrarSaludMentalyAdicciones ya tiene material del ciclo de charlas virtuales. Sin grabar nada nuevo:

- Embeber los videos en las páginas de curso y en el blog (sube el tiempo de permanencia, que ayuda al SEO)
- Recortar clips verticales para Instagram y LinkedIn
- Revisar títulos y descripciones con criterio SEO — YouTube es el segundo buscador del mundo y "salud mental en el trabajo" tiene búsqueda real

### 3.5 Falta captura de interés (hoy el sitio no convierte)

Un responsable de RRHH lee el post sobre el protocolo de la SRT un martes a las 11 de la noche. Le interesa. ¿Y después? Hoy: nada. No va a escribir por WhatsApp a esa hora, y mañana se olvidó.

Falta un paso intermedio entre "leer" y "contratar":

- **Un recurso descargable** a cambio del mail. Algo genuinamente útil y muy suyo, por ejemplo: *"Guía breve: 10 señales de alerta en el equipo de trabajo (y qué hacer con cada una)"*, o un modelo de protocolo de actuación — que es literalmente uno de los servicios que ya presta según su perfil.
- **Una lista de mails simple.** No hace falta newsletter semanal: con enviar cada post nuevo alcanza. Una lista propia de 300 responsables de RRHH y delegados vale más que 3.000 seguidores de Instagram, porque no depende de ningún algoritmo.

### 3.6 Un media kit para vender offline

Dado que la prioridad es la venta offline, falta la pieza más obvia: **un PDF de una o dos páginas** con bio corta, temas de charla, formatos y duraciones, organizaciones donde trabajó, una foto profesional y el contacto. Descargable desde el sitio y enviable por WhatsApp después de una reunión.

Es barato de hacer y es lo que efectivamente circula dentro de una organización cuando alguien tiene que convencer a su jefe de contratarlo.

---

## Parte 4 — Empaquetar la oferta

Hoy la propuesta es *"charlas, talleres y programas a medida"*. Es vago y obliga a explicar todo desde cero en cada reunión. Los competidores relevados ya empaquetan (Lumenti: charla 60-90min / taller 2-4hs / programa 4-8 sesiones).

Propongo tres productos con nombre, alineados a los formatos que Guillermo ya dicta:

| Producto | Formato | Para quién | Qué se lleva |
|---|---|---|---|
| **Encuentro** | 90 min a media jornada | Toda la planta, sin distinción de rango | Sensibilización + actividades en vivo + página de recursos |
| **Taller de delegados y mandos medios** | 1-2 jornadas | Delegados, supervisores, RRHH | Herramientas de detección, escucha y derivación + protocolo básico |
| **Programa** | 2-3 meses, encuentros quincenales | Organización completa | Diagnóstico, ciclo de encuentros, protocolo de actuación propio, certificados y reporte agregado |

Sin precios en el sitio (patrón del rubro), pero con **alcance claro**. Esto ordena la conversación comercial y hace visible por qué un Programa cuesta lo que cuesta.

Y conecta directo con la metodología de 4 pasos ya esbozada (Escuchar → Nombrar → Equipar → Sostener): el **Encuentro** cubre *Nombrar*, el **Taller** cubre *Equipar*, y el **Programa** es el único que cubre los cuatro. Eso da un argumento natural y honesto para vender el formato largo, sin presionar.

> **Pendiente con Guillermo:** los cuatro pasos son un borrador mío, armado desde su perfil. Hay que validarlos con él y, sobre todo, ponerle nombre al método. Un método con nombre es citable en una reunión; "mi enfoque" no.

---

## Parte 5 — Riesgos del proyecto

Vale nombrarlos, porque son los que efectivamente matan proyectos así:

1. **Que Guillermo no alimente el sistema.** Es el riesgo número uno. Todo el plan de contenido depende de que él mande audios y fotos, y todo el sistema de cursos depende de que cargue las instancias. Mitigación: el flujo del audio de 2 minutos, el admin desde el celular, y definir explícitamente quién carga y edita (si no es él, hay que decir quién).
2. **Que la dinámica del QR no funcione con su público real.** Mitigación: probar con Mentimeter antes de construir (punto 2.1).
3. **Un incidente de privacidad.** Un solo caso de un trabajador que sienta que su respuesta llegó a su jefe le cierra el canal sindical de por vida. Mitigación: anonimato por diseño (Problema 3), sin excepciones ni "modo identificado" opcional.
4. **Publicar un dato normativo mal.** El post sobre la Resolución 8/2026 de la SRT sigue **sin verificar contra el texto del Boletín Oficial**, y el proyecto de ley de ludopatía está en trámite parlamentario, o sea que puede cambiar. Un error normativo en un sitio que se presenta como técnico cuesta credibilidad. Mitigación: verificar antes de publicar y fechar los posts normativos ("actualizado a agosto 2026").
5. **Falta una foto profesional.** Todo el banco son fotos espontáneas de capacitaciones. Excelentes para mostrar trabajo real, insuficientes para el retrato principal de una marca personal, el media kit y el perfil de LinkedIn. Es una sesión de fotos de una hora y resuelve un cuello de botella que aparece en todos lados.

---

## Parte 6 — Qué haría primero

Ordenado por retorno sobre esfuerzo, no por orden lógico de construcción:

**Esta semana, sin escribir código:**
1. Guillermo prueba Mentimeter/AhaSlides en su próxima charla (valida el supuesto central del producto)
2. Empieza a sumar conexiones en LinkedIn (la acción de mayor retorno del plan)
3. Graba el audio de 2 minutos después de cada encuentro (arranca el motor de contenido desde ya)
4. Agenda una sesión de fotos profesionales

**Primera versión del sitio:**
5. Sitio de marca + "Cómo trabajo" con los tres productos + WhatsApp
6. Página "Si necesitás ayuda" (barata, útil, buen SEO)
7. Blog con 3-4 posts pilar, no los 10 de una
8. Alta de cursos/empresas/instancias, con visibilidad privada por default
9. **Motor de actividades anónimas con QR + pantalla en vivo** ← el diferenciador, adelantado a Fase 1

**Después:**
10. Instagram con los 4 pilares
11. Recurso descargable + lista de mails
12. Fase 2: identificación, quiz, certificado verificable, analítica

---

## Resumen de cambios propuestos a los documentos existentes

| Documento | Cambio |
|---|---|
| [estrategia-sitio-web.md](estrategia-sitio-web.md) | Rehacer corte Fase 1/2; agregar anonimato por diseño; visibilidad por instancia; código corto; empaquetado de productos; página de recursos |
| [blog-content-plan.md](blog-content-plan.md) | Separar contenido pilar de contenido de campo; agregar plan de Instagram, YouTube y LinkedIn; agregar lead magnet |
| [guillermo-perfil.md](guillermo-perfil.md) | Sin cambios de fondo; sumar el canal de YouTube como activo y el dato de la Línea 141 como recurso de derivación |
| [fotos-index.md](fotos-index.md) | Reforzar la advertencia de consentimiento para uso en redes; agregar necesidad de sesión de fotos profesional |
