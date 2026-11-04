# Prompt contextualizador completo — Tangarana Travel Tours

> Copia este documento completo en la nueva IA. Está escrito para que pueda continuar el proyecto sin perder las decisiones de diseño, negocio, contenido, SEO, rendimiento ni seguridad acumuladas durante la conversación original.

## Instrucción para la IA que recibe este contexto

Actúa como desarrollador/a principal y diseñador/a UX del proyecto **Tangarana Travel Tours**. Continúa desde el estado actual del repositorio y no reconstruyas desde cero lo que ya funciona. Antes de modificar algo, inspecciona los archivos relacionados y conserva los cambios existentes del usuario.

El objetivo es mantener una web turística rápida, clara, visualmente atractiva, fácil de entender en pocos segundos y completamente responsive. Toda decisión debe respetar la separación comercial entre **tours individuales** y **paquetes completos con alojamiento**.

Reglas de trabajo importantes:

- No uses `git reset --hard`, `git checkout --` ni descartes cambios sin autorización.
- El árbol de trabajo contiene muchos cambios válidos todavía sin commit. Trátalos como trabajo del usuario.
- No publiques ni despliegues la web a menos que el usuario lo solicite expresamente.
- No expongas, imprimas ni confirmes valores de claves API.
- La clave de Gemini debe permanecer únicamente en variables privadas del servidor.
- No hagas consultas reales al chatbot durante pruebas salvo que el usuario lo autorice, porque consumen recursos de la API.
- Prioriza cambios precisos y relacionados con lo solicitado. El usuario prefiere soluciones bien pensadas, pero no auditorías o rediseños adicionales no pedidos.
- Verifica siempre móvil, tablet, laptop pequeña y escritorio cuando el cambio afecte diseño o interacción.
- Evita espacios vacíos grandes, elementos cortados, contenido escondido detrás del navbar y secciones principales que obliguen a hacer scroll solo para completar el bloque inicial.
- Mantén el rendimiento: imágenes optimizadas, JavaScript acotado, carga diferida y videos bajo demanda.
- No inventes precios, horarios, actividades, disponibilidades ni inclusiones. Si un dato operativo no es seguro, indica que debe confirmarse por WhatsApp.
- El idioma y mercado principal son español de Perú (`es-PE`).

---

## 1. Ubicación y estado del proyecto

Proyecto principal:

```text
C:\Users\diego\Desktop\Tangarana-project\front-end-tangarana
```

Proyecto de referencia utilizado para replicar el sistema de chatbot:

```text
C:\Users\diego\Desktop\elfen-hospedaje\front-elfen
```

Carpeta original de las cuatro ilustraciones de la hormiguita:

```text
C:\Users\diego\Desktop\svghormigabot
```

Estado general:

- Es una web de Astro estática con funciones serverless de Netlify para el asistente de IA.
- El dominio canónico configurado es `https://tangaranatours.com`.
- Durante el desarrollo se ha usado `http://127.0.0.1:4321/`.
- También existe una publicación histórica o de pruebas en `https://tangarana.netlify.app`.
- Los cambios más recientes se encuentran en local y no debe asumirse que ya fueron desplegados.
- El repositorio está deliberadamente “dirty”: hay archivos modificados y nuevos que pertenecen al trabajo realizado. No limpiarlos ni revertirlos automáticamente.

Última validación conocida:

- `astro check`: 0 errores, 0 advertencias y 0 hints.
- `npm run build`: correcto.
- `npm run audit`: correcto para 30 archivos HTML.
- La auditoría revisa H1, metadatos únicos, Open Graph, imágenes, enlaces, sitemap, redirecciones y JSON-LD.
- La interfaz del chatbot se comprobó manualmente en móvil, modo claro y modo oscuro sin enviar preguntas reales al modelo.

---

## 2. Tecnología y dependencias

Stack actual:

- Astro `7.3.2`.
- TypeScript `5.9.3`.
- Tailwind CSS `4.3.3`, aunque gran parte del diseño utiliza CSS propio global y por componente.
- `@astrojs/sitemap` para el sitemap.
- `@fontsource-variable/manrope` y `@fontsource-variable/source-sans-3` para tipografías locales.
- `@lucide/astro` para iconografía.
- Lenis para scroll suave y coordinación del bloqueo de scroll en modales.
- `@netlify/blobs` para métricas, deduplicación y circuit breaker del chatbot.
- Netlify Functions con bundler esbuild.

Comandos principales:

```bash
npm install
npm run dev
npm run check
npm run build
npm run audit
npm run preview
```

Observación técnica pendiente:

- Se instaló `@netlify/blobs@11.x`, igual que en el proyecto Elfen. Durante la instalación apareció una advertencia de peer dependency porque una dependencia interna de Astro declara compatibilidad con una versión anterior. La compilación funciona, pero conviene vigilarlo cuando se actualicen dependencias.

---

## 3. Identidad del negocio

Nombre comercial:

```text
Tangarana Travel Tours
```

Datos configurados:

- RUC: `10459748941`.
- Dirección: `Av. San Martín 0001, frente al hospedaje Tunki Lodge, Oxapampa, Pasco`.
- WhatsApp principal: `+51 931 530 169`.
- Teléfonos adicionales: `+51 916 414 716` y `+51 926 594 184`.
- Instagram: `tangaranatraveltours_2026`.
- Facebook y TikTok están configurados en `src/data/site.ts`.
- Tagline: `Vive, explora, conecta`.

Propuesta de valor:

- Tours individuales por Oxapampa y la Selva Central.
- Paquetes completos de 2 a 5 días que combinan tours, alojamiento, desayunos, recepción en terminal, traslados y guiado.
- Atención y confirmación personal por WhatsApp.
- No existe pago en línea ni confirmación automática de reserva.

Distinción comercial fundamental:

1. **Tours**: recorridos individuales por destino, normalmente de medio día o día completo.
2. **Paquetes**: programas de varios días con alojamiento en Carolina Egg, desayunos, traslados y varios tours.

Esta distinción se corrigió porque inicialmente muchos tours eran llamados “paquetes”. En la versión actual `/tours/` corresponde a recorridos individuales y `/paquetes/` corresponde a los programas completos con hotel.

---

## 4. Arquitectura de páginas

Rutas principales:

```text
/
/tours/
/tours/[slug]/
/paquetes/
/paquetes/[slug]/
/destinos/
/destinos/[slug]/
/nosotros/
/contacto/
/preguntas-frecuentes/
/politica-de-privacidad/
/terminos-y-condiciones/
/blog/[slug]/
/404/
```

Redirecciones existentes:

- `/tours/perene-dia-completo` → `/tours/perene/`
- `/tours/villa-rica-dia-completo` → `/tours/villa-rica/`
- `/tours/pozuzo-dia-completo` → `/tours/pozuzo/`
- `/tours/chontabamba-medio-dia` → `/tours/chontabamba/`
- `/tours/selva-central-4-dias` → `/paquetes/4-dias-3-noches/`

Archivos centrales:

- `src/layouts/BaseLayout.astro`: layout global, SEO, navegación, footer, modal de reserva y chatbot.
- `src/styles/global.css`: sistema visual y responsive principal.
- `src/data/site.ts`: identidad, teléfonos, dirección, redes y helpers de WhatsApp.
- `src/data/navigation.ts`: navegación principal y destinos.
- `src/data/images.ts`: imágenes globales con textos alternativos.
- `src/content/tours/*.md`: catálogo base de tours.
- `src/data/packageDetails.ts`: información expandida de “Lo que harás” para los tours.
- `src/data/packageMedia.ts`: asociación de medios por recorrido.
- `src/data/stayPackages.ts`: definición completa de los paquetes con alojamiento.
- `src/pages/tours/[slug].astro`: plantilla de detalle de tour.
- `src/pages/paquetes/[slug].astro`: plantilla de detalle de paquete.

---

## 5. Sistema visual actual

Dirección estética:

- Editorial de turismo de naturaleza, con sensación de expedición y Selva Central.
- Paleta principal: verde bosque oscuro, verde suave, blanco cálido y amarillo/dorado para llamadas a la acción y precios.
- Elementos con bordes redondeados, líneas topográficas decorativas, etiquetas, marcadores numerados y fotografías protagonistas.
- Tipografía de títulos: Manrope Variable.
- Tipografía de lectura e interfaz: Source Sans 3 Variable.
- Existe tema claro y oscuro mediante `data-theme` en el elemento raíz.
- Los colores del footer y otras secciones fueron corregidos para responder al tema, no solo el contenido central.
- Los controles deben conservar contraste suficiente en ambos temas.

Principios visuales acordados con el cliente:

- El logo debe verse grande y completamente visible.
- No se debe cortar la parte superior del logo en laptops pequeñas.
- En móvil el logo se separa del resto de los controles para poder agrandarlo sin aumentar demasiado la altura de una barra sólida.
- Los iconos sociales muestran sus colores oficiales: Instagram con degradado, Facebook azul y TikTok multicolor.
- No se deben añadir fondos verdes innecesarios detrás del logo.
- En móvil, tema, hamburguesa y redes aparecen como piezas o círculos separados, con efecto glassmorphism individual.
- Al hacer scroll, el encabezado móvil adopta un estado compacto; los iconos sociales se reorganizan y el conjunto no debe tapar el contenido.
- En escritorio se mantiene un navbar vertical lateral a la derecha y el logo se presenta arriba de él, con espacio suficiente y sin cubrir títulos.

---

## 6. Responsive y navegación

Componentes relevantes:

- `src/components/ExpeditionNav.astro`
- `src/components/BrandMark.astro`
- `src/components/ThemeToggle.astro`
- reglas asociadas en `src/styles/global.css`

Comportamiento esperado:

- Escritorio amplio: logo grande en la zona superior derecha y navegación vertical lateral.
- Laptop normal o pequeña: el logo y el navbar deben reducirse o recolocarse sin tapar títulos, breadcrumbs, formularios ni carruseles.
- Tablet: se usa el encabezado móvil/compacto para evitar diseños híbridos rotos.
- Móvil: logo grande a la izquierda; redes, tema y hamburguesa distribuidos como controles independientes.
- A partir de aproximadamente 48 px de scroll se activa `.is-scrolled` en el encabezado móvil.
- El menú móvil fue corregido porque en modo claro podía mostrar texto blanco sobre fondo claro.
- El botón hamburguesa fue corregido para que siga siendo visible en modo oscuro.
- Las páginas nunca deben depender de un único tamaño de referencia. Revisar especialmente 390×844, 428×805, 768–900 px de ancho, laptops de 1366×768 y escritorios grandes.

---

## 7. Home page y hero principal

Componente:

```text
src/components/HeroExpedition.astro
```

Estado textual actual:

- Eyebrow: `Agencia de tours y paquetes en Oxapampa`.
- H1 SEO: `Tours en Oxapampa y la Selva Central`.
- Línea secundaria: `Tours por destino y paquetes completos.`
- Descripción: `Elige recorridos de un día o programas con alojamiento, desayunos y traslados.`
- Botones: `Ver paquetes` y `Ver tours`.

El H1 se corrigió para que la intención principal sea “tours”, mientras “paquetes” aparece en el texto secundario y no diluye el encabezado SEO.

Historia de ajustes del hero:

- En móvil el contenido estaba amontonado en la parte superior y dejaba un gran espacio vacío abajo.
- Después se separó demasiado el contenido y seguía existiendo espacio muerto.
- La solución final compactó jerarquía, tipografía, chips y botones para que todo el hero entre en una pantalla móvil sin quedar pegado al navbar ni dejar huecos enormes.
- El orden lógico móvil es: título y descripción, destinos/etiquetas cuando corresponda, botones principales y precio destacado.
- El hero debe sentirse completo en una sola vista, similar a una portada editorial, no como media sección cortada.
- Se mejoró el peso de las letras para que no se vieran demasiado delgadas.
- La etiqueta de precio usa amarillo/dorado llamativo.
- El hero carga una imagen separada para móvil y otra para escritorio.
- Las variantes AVIF y WebP se generan con `astro:assets`.
- La imagen LCP usa `loading="eager"`, `fetchpriority="high"`, dimensiones explícitas y `decoding="async"`.

Secciones actuales de la home:

- Paquete recomendado.
- Actividades y momentos de aventura.
- Tours individuales por destino.
- Qué incluye un paquete Tangarana.
- Destinos de la Selva Central.
- Fotografías de viajeros.
- Preguntas frecuentes.
- CTA final para elegir entre tour o paquete.

---

## 8. Tours individuales actuales

### Tour a Chontabamba

- Slug: `chontabamba`.
- Precio: S/30 por persona.
- Horario publicado: 10:30 a. m. a 2:30 p. m.
- Tipo: medio día.
- Actividades: tirolesa, Casa al Revés, Tunqui Cueva opcional, experiencia apícola, artesanías JC, Wharapo opcional, plaza de Chontabamba y cultura yanesha.
- Se corrigieron imágenes repetidas usando las fotografías disponibles para Chontabamba.
- Si el cliente aporta nuevas fotos, deben incorporarse sin repetir las actuales y sin empeorar el peso de carga.

### Tour a Pozuzo

- Slug: `pozuzo`.
- Precio: S/70 por persona.
- Horario: 5:30 a. m. a 6:30 p. m.
- Tipo: día completo.
- Narrativa principal: historia y naturaleza de la colonia austro-alemana en la Selva Central.
- Puntos: Catarata Rayantambo, Cascada Yulitunqui, portal, desayunos típicos, pozas de agua y sal, parque, cervecería artesanal y barrio Prusia.
- La sección “Pozas de agua y sal” usa la fotografía específica de aguas cristalinas, no la entrada de Pozuzo.
- Incluye botón `Ver video de las aguas cristalinas` que abre un reproductor modal bajo demanda.
- Video: `public/media/packages/pozuzo/experiencia-pozuzo.mp4`.

### Tour a Villa Rica

- Slug: `villa-rica`.
- Precio: S/60 por persona.
- Horario: 8:00 a. m. a 6:30 p. m.
- Tipo: día completo.
- Incluye plaza principal y la cafetera gigante de Villa Rica, presentada como referente del destino y asociada a un récord Guinness según el contenido proporcionado por el cliente.
- Otros puntos: deportes extremos, portal, Laguna El Oconal, paseo en bote, flores de loto, ictioterapia, mirador, Cascada El León, café y chocolate.
- La explicación de ictioterapia aclara que es una exfoliación natural superficial mediante pequeños peces y recomienda precaución si hay heridas o sensibilidad.

### Tour al Valle del Perené

- Slug: `perene`.
- Precio: S/70 por persona.
- Horario publicado en el contenido: 8:00 a. m. a 6:30 p. m.
- Tipo: día completo.
- Puntos: deportes extremos, mariposario, Pepe Lucho, paseo en bote, Catarata Bayoz, Velo de la Novia y experiencia con una comunidad asháninka.
- Video: `public/media/packages/perene/experiencia-perene.mp4`.
- Mantener un lenguaje respetuoso al presentar experiencias culturales.

### Tour a Catarata Río Tigre

- Slug: `catarata-rio-tigre`.
- Precio: S/45 por persona.
- Tipo: medio día, aproximadamente cuatro horas.
- Puntos: Mirador El Abra, Manantial de Aguas Cristalinas, Gruta de la Virgen, Catarata Río Tigre y experiencia con animales de granja.
- Se añadieron más fotografías desde la carpeta entregada por el cliente, incluyendo experiencias de ordeño y entorno rural.
- Se añadió la actividad extrema `Silla voladora`.
- La fotografía de la silla voladora usa un encuadre que evita cortarla de forma extraña.
- Video: `public/media/packages/rio-tigre/silla-voladora.mp4`.
- El reproductor de la silla voladora debe abrir centrado y funcionar bien en móvil y escritorio.
- La operación de la actividad depende del clima, mantenimiento y condiciones de seguridad; no prometer disponibilidad automática.

### Tour Yanachaga Chemillén

- Slug: `yanachaga-chemillen`.
- Precio: S/90 por persona.
- Salida: 7:00 a. m.
- Retorno: por confirmar.
- Caminata aproximada: 14 km.
- Puntos: bosque de neblina, biodiversidad, flora, orquídeas, bromelias, árboles gigantes, plantas medicinales y ornamentales, observación responsable de fauna.
- La observación de animales silvestres nunca debe presentarse como garantizada.

Todos los tours incluyen de forma estándar:

- Movilidad cómoda durante el recorrido.
- Guías totalmente especializados.
- Botiquín de primeros auxilios.

Recomendaciones estándar de qué llevar:

- Repelente.
- Bloqueador solar.
- Zapatillas cómodas.
- Ropa de baño.
- Toalla.
- Dinero en efectivo.
- Abrigo ligero.

---

## 9. Diseño de las páginas de tours

La sección “Lo que harás” fue enriquecida para que el recorrido sea fácil de comprender sin saturar.

Diseño actual:

- Cada punto aparece como una franja/rectángulo numerado.
- Toda la franja funciona como control desplegable.
- Existe botón `Ver más` / `Ver menos`.
- Al expandir se muestran texto adicional y una o varias imágenes relacionadas.
- Las imágenes no deben dominar toda la pantalla; son apoyo visual dentro del relato.
- Los puntos aparecen en secuencia y el usuario puede avanzar verticalmente.
- En móvil se mantiene el formato apilado porque es más legible que un carrusel complejo.
- En escritorio se aprovecha el ancho, pero no se transforma en una cuadrícula saturada.
- Los videos se abren bajo demanda, centrados, y no se cargan reproduciéndose automáticamente.

También existe un panel de reserva junto al contenido en escritorio y adaptado debajo o en modal en móvil.

La sección “Otros tours” usa un carrusel automático y arrastrable. Se corrigió un problema en el que el drag impedía hacer clic sobre las tarjetas. Ahora debe diferenciar un clic normal de un desplazamiento real.

---

## 10. Paquetes completos con alojamiento

Los paquetes actuales son exactamente cuatro:

| Paquete | Ruta | Habitación estándar | Cabaña |
|---|---|---:|---:|
| 2 días / 1 noche | Chontabamba · Pozuzo | S/297 | S/319 |
| 3 días / 2 noches | Chontabamba · Pozuzo · Villa Rica | S/495 | S/539 |
| 4 días / 3 noches | Chontabamba · Pozuzo · Villa Rica · Río Tigre | S/644 | S/710 |
| 5 días / 4 noches | Chontabamba · Pozuzo · Villa Rica · Valle del Perené · Río Tigre | S/841 | S/930 |

No añadir paquetes de 6 o 7 días salvo nueva instrucción del cliente.

Incluyen:

- Tours durante todos los días del programa con tickets de ingreso a los atractivos programados.
- Alojamiento en Carolina Egg.
- Un desayuno por cada día de estadía.
- Recepción en el terminal terrestre de Oxapampa.
- Traslado al hospedaje.
- Traslado final al terminal terrestre.
- Movilidad cómoda en van turística.
- Guías totalmente especializados.
- Botiquín de primeros auxilios.

Condiciones comunes:

- Niños de 3 a 10 años: 75% de la tarifa adulta.
- No válido en feriados largos.
- Recorridos guiados en español.
- Descuentos para grupos sujetos a confirmación.
- Mascotas permitidas bajo consulta, tarifa adicional y políticas de convivencia.
- Reserva confirmada con el 50% del monto total, sujeto a confirmación directa.

No incluyen:

- Almuerzos, con referencia de S/27 a S/50.
- Transporte desde la ciudad de origen hacia Oxapampa.
- Canopy de Villa Rica desde S/30 en los paquetes que pasan por Villa Rica.
- Paseo en bote del Perené a S/10 en el paquete de 5 días.

### Hospedaje Carolina Egg

Contenido integrado:

- Cabañas de madera y habitaciones estándar.
- Piscina temperada.
- Jardines y áreas verdes.
- Cochera.
- Fogata al aire libre.
- Juegos para niños.
- Pet friendly sujeto a políticas.
- Ubicación a cinco cuadras de la Plaza de Armas de Oxapampa.
- Check-in: 2:00 p. m.
- Check-out: 11:00 a. m.
- Early check-in y late check-out con costo adicional y sujetos a disponibilidad.

Se incorporaron las fotos locales de Carolina Egg en `src/assets/images/stay-packages/carolina-egg/`.

### Referencia de Cruz del Sur

Se presenta solo como referencia porque el pasaje hacia Oxapampa no forma parte del paquete.

- Económico 140°: S/80 referenciales.
- Suite 160°: S/112 referenciales.
- Horarios de referencia: 8:15 p. m., 8:45 p. m. y 9:15 p. m.
- Duración estimada Lima–Oxapampa: 10 horas.
- Terminales de referencia en Javier Prado, Plaza Norte y terminal de Oxapampa.
- Los precios pueden cambiar según temporada.

Fotos disponibles en `src/assets/images/stay-packages/cruz-del-sur/`.

### Diseño del catálogo de paquetes

- `/paquetes/` muestra cuatro tarjetas con imágenes diferentes para evitar repetición visual.
- Se eliminó la repetición excesiva de “3 días / 2 noches” y equivalentes dentro de la misma tarjeta.
- Cada tarjeta presenta duración una sola vez de forma protagonista, ruta breve, beneficios y precio desde habitación estándar.
- Las tarjetas enlazan a su detalle correspondiente.

### Diseño del detalle de paquete

- Hero/encabezado con imágenes relacionadas a los destinos incluidos.
- Itinerario diario ordenado.
- Secciones de inclusiones, exclusiones, condiciones y qué llevar.
- Bloque dedicado a Carolina Egg con galería.
- Bloque informativo de Cruz del Sur.
- Formulario de solicitud visible en escritorio y adaptado a móvil.
- Sección `Otros paquetes` con carrusel automático cada 1,5 segundos.
- En móvil, el contenido textual aparece primero y el carrusel/galería debajo para evitar que el navbar cubra las imágenes.
- La galería debe llenar su contenedor; no dejar un área blanca grande debajo.

---

## 11. Formularios y flujo de reserva

No existe compra ni pago en línea. Los formularios preparan un mensaje y abren WhatsApp.

### Modal global de tours

Archivo:

```text
src/components/ReservationModal.astro
```

Datos principales:

- Tour seleccionado.
- Adultos.
- Niños y edades opcionales.
- Nombre completo.
- Número de WhatsApp.
- Lugar de hospedaje o recojo opcional.
- Consulta opcional.
- Consentimiento.

Corrección importante:

- Al abrir desde `Reservar`, el formulario debe mostrarse siempre desde el comienzo, no scrolleado a la mitad.
- Se fuerza `scrollTop = 0` en diálogo y formulario y se maneja el foco sin provocar desplazamientos.

### Formulario de paquetes con alojamiento

Archivo:

```text
src/components/StayPackageReservationPanel.astro
```

Incluye:

- Fecha solicitada.
- Tipo de habitación: estándar o cabaña.
- Adultos.
- Niños.
- Mascotas.
- Nombre.
- WhatsApp.
- Hospedaje/recojo o consulta según el contexto.
- Cálculo estimado de tarifa sin incluir mascotas.

La fecha, mascotas, disponibilidad y precio final siempre se confirman por WhatsApp.

---

## 12. Carruseles e interacción

Velocidades actuales aproximadas:

- Tours de la home: 2 segundos.
- Galería principal de detalle: 1,8 segundos.
- Otros tours: 1,8 segundos.
- Otros paquetes: 1,5 segundos.

Comportamiento común:

- Pausan o reinician correctamente al interactuar.
- Respetan `prefers-reduced-motion`.
- Deben funcionar desde la carga inicial en móvil, sin requerir que el usuario avance manualmente una vez para activar el autoplay.
- Las imágenes deben mostrarse también en móvil; se corrigió un caso en el que solo aparecían en escritorio.
- Flechas manuales disponibles.
- Drag/swipe disponible cuando corresponde.
- El arrastre no debe bloquear el clic sobre una tarjeta.
- No usar autoplay demasiado lento; el cliente pidió transiciones dinámicas y rápidas.

Componentes relevantes:

- `DayTourCollection.astro`
- `PackageGallery.astro`
- `RelatedPackageRail.astro`
- `StayPackageRail.astro`

---

## 13. Imágenes, videos y rendimiento

Trabajo realizado:

- Se preparó una versión mejorada del logo y se usan activos locales.
- Se añadieron imágenes específicas para hero móvil y escritorio.
- Se reorganizaron las fotos de tours para evitar repeticiones evidentes.
- Se integraron fotos nuevas de Chontabamba y Catarata Río Tigre.
- Se integraron fotografías de Carolina Egg y Cruz del Sur.
- Se usan `astro:assets`, AVIF y WebP cuando corresponde.
- Las imágenes tienen dimensiones explícitas y textos alternativos descriptivos.
- Las imágenes por debajo del primer viewport usan carga diferida.
- Los videos MP4 se abren bajo demanda para evitar carga inicial innecesaria.
- El LCP se trata de forma prioritaria en el hero.

Videos locales:

```text
public/media/packages/pozuzo/experiencia-pozuzo.mp4
public/media/packages/perene/experiencia-perene.mp4
public/media/packages/rio-tigre/silla-voladora.mp4
```

Historial de PageSpeed:

- Una medición mostró 58 en escritorio debido a trabajo del hilo principal, reflow forzado y entrega de imágenes.
- En incógnito una repetición mostró aproximadamente 97.
- Se concluyó que extensiones, caché y variabilidad de Lighthouse pueden afectar la puntuación.
- No se prometió 100 permanente; el objetivo es mantener métricas reales buenas y evitar regresiones.
- El LCP observado rondó 1,2 s y el CLS 0,002 en una prueba mostrada por el usuario.

No optimizar de forma destructiva sacrificando diseño o calidad sin medir primero.

---

## 14. SEO, datos estructurados y navegación para IA

SEO técnico implementado:

- Canonical por página.
- `index, follow, max-image-preview:large` para páginas indexables.
- Open Graph y Twitter/social image.
- Titles y descriptions únicos.
- Un único H1 objetivo por página.
- Sitemap generado por Astro.
- `robots.txt` con sitemap.
- Redirecciones desde slugs antiguos.
- Imágenes con alt.
- Breadcrumbs semánticos.
- JSON-LD por tipo de página.

JSON-LD actual:

- Home: `WebSite`, `TravelAgency`/`Organization` y `FAQPage`.
- Catálogo de tours: `ItemList`.
- Tour: `TouristTrip`, `Offer`, `TravelAgency` y `FAQPage`.
- Catálogo de paquetes: `ItemList`, `TouristTrip` y `AggregateOffer`.
- Paquete: `TouristTrip`, ofertas por tipo de habitación y `FAQPage`.
- Destino: `TouristDestination`.
- Contacto: `TravelAgency`.

Navegación agéntica:

- Se corrigió `llms.txt` porque PageSpeed indicaba que no contenía enlaces.
- `public/llms.txt` ahora tiene H1, descripción y enlaces Markdown a todas las páginas principales.
- `public/llms-full.txt` contiene información ampliada, precios, inclusiones y condiciones.
- Netlify sirve `llms*.txt` como `text/markdown; charset=utf-8`.
- PageSpeed llegó a mostrar navegación agéntica 3/3.

Noindex actual:

- Política de privacidad.
- Términos y condiciones.
- Página 404.

Privacidad y términos están marcados como borradores pendientes de revisión legal y se excluyen del sitemap.

---

## 15. Chatbot “Tanga” con Gemini

Se replicó la arquitectura del chatbot de Elfen Hospedaje, pero se adaptó completamente al dominio de Tangarana.

### Personaje y estados visuales

La hormiguita se llama **Tanga**.

Activos:

```text
src/assets/assistant/tangarana-ant-idle.png
src/assets/assistant/tangarana-ant-greeting.png
src/assets/assistant/tangarana-ant-thinking.png
src/assets/assistant/tangarana-ant-presenting.png
```

Estados:

- Idle: espera.
- Greeting: saludo al abrir.
- Thinking: mientras la función prepara una respuesta.
- Presenting: cuando muestra el resultado.

Componente visual:

```text
src/components/TangaranaAssistant.astro
```

Cliente:

```text
src/scripts/tangaranaAssistant.ts
```

Características:

- Carga diferida: el JavaScript completo del chat se importa al hacer el primer clic.
- Las imágenes alternas se precargan después del idle.
- No guarda la conversación en `localStorage`; solo vive en memoria de la página.
- Historial visual limitado y DOM acotado.
- Compatible con teclado: Enter envía, Shift+Enter agrega salto y Escape cierra.
- Ajusta posición con `visualViewport` cuando aparece el teclado móvil.
- Acciones rápidas: ver tours, comparar paquetes, consultar precios, qué llevar y reservar.
- Puede abrir el formulario global mediante `data-open-reservation`.
- En móvil el panel ocupa el ancho útil con márgenes reales, sin desbordarse por el scrollbar.
- En escritorio evita colisionar con el navbar lateral.
- Tiene estilos específicos para tema oscuro.
- Respeta reducción de movimiento.

### Arquitectura server-side

Entrada Netlify:

```text
netlify/functions/tangarana-chat.mjs
```

Servicio:

```text
server/tangarana/service.mjs
server/tangarana/storage.mjs
server/tangarana/prompt.mjs
server/tangarana/providers/gemini.mjs
server/tangarana/providers/openai.mjs
server/tangarana/providers/http.mjs
shared/tangarana-contract.mjs
```

Conocimiento:

```text
src/data/tangaranaKnowledge.mjs
```

La base de conocimiento incluye tours, paquetes, precios, horarios, destinos, Carolina Egg, condiciones, niños, mascotas, qué llevar, reservas y contacto.

Seguridad y control de calidad:

- POST únicamente.
- Cuerpo máximo aproximado de 12 KB.
- Mensaje máximo de 800 caracteres.
- Historial reciente limitado.
- Honeypot.
- Detección de información sensible.
- Detección de inyección de prompts.
- Cookie de sesión firmada, HttpOnly, Secure y SameSite Strict.
- Allowlist estricta de orígenes de producción y desarrollo configurado.
- La salida del modelo es JSON estructurado.
- El servidor valida intención, IDs de hechos, longitud, precios y afirmaciones.
- No acepta HTML, Markdown, URLs ni correos proporcionados por el modelo.
- Las acciones y URLs de WhatsApp se reconstruyen con un catálogo confiable del servidor.
- Bloquea afirmaciones falsas de reserva, pago o contacto confirmado.
- Circuit breaker, cooldown, deduplicación por sesión/request y métricas técnicas.
- No se almacena el contenido de la conversación en el almacenamiento operativo.
- Gemini es el proveedor principal.
- Existe fallback opcional a OpenAI solo si se habilita mediante variable de entorno.

Variables esperadas, sin incluir valores:

```text
WANDER_AI_ENABLED
GEMINI_API_KEY
WANDER_PRIMARY_MODEL
WANDER_ENABLE_OPENAI_FALLBACK
OPENAI_API_KEY
WANDER_FALLBACK_MODEL
WANDER_MONTHLY_AI_LIMIT
WANDER_SESSION_SECRET
WANDER_ALLOWED_ORIGINS
```

Se conservaron nombres internos `WANDER_*` para reutilizar la misma configuración privada de Elfen. No cambiarlos sin migrar también el entorno.

Estado de secretos:

- Existe un `.env` local copiado desde Elfen con la misma configuración privada.
- `.env` y `.env.*` están ignorados por Git.
- `.env.example` solo contiene variables vacías y seguras.
- La clave no está incluida en el cliente ni debe aparecer en este documento.
- Para producción todavía debe configurarse el mismo conjunto de variables en el proyecto Netlify de Tangarana.
- La función no fue probada realizando una consulta real, por solicitud del usuario.

---

## 16. Seguridad y hosting

Configuración Netlify:

- Build: `npm run build`.
- Publish: `dist`.
- Functions: `netlify/functions`.
- Node: 24.
- Bundler: esbuild.

Cabeceras globales:

- `X-Content-Type-Options: nosniff`.
- `Referrer-Policy: strict-origin-when-cross-origin`.
- Permissions Policy deshabilita cámara, micrófono, geolocalización, pagos y USB.
- CSP restringe recursos a origen propio y permite salida de formulario hacia `wa.me`.
- Activos de `/_astro/` se sirven con caché inmutable de un año.

No hay cuentas, login, pagos en línea ni base de datos de reservas.

---

## 17. Accesibilidad

Aspectos implementados:

- Skip link al contenido.
- H1 único.
- Jerarquía semántica de headings.
- `aria-label`, `aria-current`, `aria-expanded`, roles de diálogo y log.
- Navegación por teclado en menús, formularios, carruseles y chatbot.
- Foco visible.
- Textos alternativos descriptivos.
- Bloqueo de scroll cuando un diálogo está abierto.
- Respeto de `prefers-reduced-motion`.
- Contraste revisado en tema claro y oscuro.
- PageSpeed llegó a mostrar accesibilidad 100.

---

## 18. Fortalezas actuales

- Separación clara entre tours y paquetes.
- Catálogo estructurado desde datos, evitando duplicación de plantillas.
- Contenido comercial mucho más completo que la versión inicial.
- Diseño consistente, reconocible y adaptado al rubro de naturaleza.
- Hero móvil compacto y visualmente completo.
- Navbar responsive con logo muy visible.
- Buen sistema de formularios hacia WhatsApp sin falsas confirmaciones.
- Galerías y videos vinculados al punto exacto del itinerario.
- SEO técnico amplio y datos estructurados por página.
- Navegación preparada para agentes mediante `llms.txt` y `llms-full.txt`.
- Rendimiento cuidado mediante Astro estático, fuentes locales, AVIF/WebP, lazy loading y JavaScript diferido.
- Chatbot con fuertes controles de seguridad, conocimiento curado y clave protegida en servidor.
- Auditoría interna automatizada.

---

## 19. Debilidades, riesgos y pendientes reales

1. **Despliegue del chatbot**: las variables privadas todavía deben configurarse en Netlify para que funcione en producción.
2. **Prueba real del chatbot**: no se hizo una solicitud real a Gemini para evitar consumo. La estructura y build están validados, pero falta una prueba funcional autorizada en un entorno de Netlify.
3. **Revisión legal**: privacidad y términos son borradores; deben ser revisados por el negocio o un profesional antes de publicarlos como definitivos.
4. **Datos operativos**: algunos precios, horarios, actividades y afirmaciones turísticas provienen del cliente. Deben seguir tratándose como información sujeta a confirmación por WhatsApp.
5. **Afirmaciones promocionales**: expresiones como “única colonia austro-alemana del mundo” o referencias a récord Guinness deben conservar una redacción prudente y verificarse si se usarán en campañas formales.
6. **Pruebas automatizadas**: existen check, build y auditoría estática, pero no una suite E2E completa para todos los breakpoints y gestos táctiles.
7. **Compatibilidad de Netlify Blobs**: vigilar la advertencia de peer dependency al actualizar Astro.
8. **Peso de fuentes originales de la hormiguita**: los PNG fuente pesan varios cientos de KB cada uno; Astro genera derivados WebP pequeños, pero no sustituir el pipeline por carga directa del PNG original.
9. **Videos**: pueden ser pesados. Deben mantenerse bajo demanda y con controles nativos, sin autoplay.
10. **Worktree sin commit**: hay muchos cambios válidos no versionados. Antes de crear commits o PR, revisar cuidadosamente qué corresponde a este proyecto.
11. **Puntuación de Lighthouse**: puede variar entre ejecuciones. No perseguir 100 con cambios arbitrarios; medir en incógnito y revisar métricas concretas.

---

## 20. Cronología resumida del proceso de creación

1. Se partió de una web turística con hero, navegación lateral y cards de recorridos.
2. Se corrigió el hero móvil repetidamente hasta eliminar contenido amontonado y espacios vacíos grandes.
3. Se reconstruyó la presentación del logo y el navbar móvil: piezas independientes, glassmorphism, redes con colores oficiales, tema y hamburguesa visibles.
4. Se amplió y recolocó el logo en escritorio, tablet y laptops pequeñas.
5. Se adaptaron los breakpoints para evitar que el logo o navbar cubrieran títulos y carruseles.
6. Se corrigieron cards de tours demasiado altas y carruseles que no cabían en móvil.
7. Se ajustaron autoplay y velocidades de galerías y se corrigió el clic bloqueado por drag.
8. Se corrigió el modal de reserva para abrir siempre desde el tope.
9. Se propagó el tema claro/oscuro al footer y secciones que no lo respetaban.
10. Se optimizaron imágenes y se añadieron formatos modernos.
11. Se enriquecieron los itinerarios con secciones desplegables, imágenes y explicaciones más completas.
12. Se corrigieron imágenes concretas de Pozuzo y se añadieron videos modales.
13. Se ampliaron Chontabamba y Río Tigre con más fotografías; se incorporó la silla voladora y su video.
14. Se corrigió `llms.txt` y la navegación agéntica llegó a 3/3.
15. Se separaron definitivamente tours individuales y paquetes con alojamiento.
16. Se crearon los cuatro paquetes de 2 a 5 días, con Carolina Egg, Cruz del Sur, itinerarios, tarifas y formularios.
17. Se eliminaron repeticiones textuales e imágenes duplicadas en las tarjetas de paquetes.
18. Se incorporaron las inclusiones estándar y recomendaciones de equipaje.
19. Se replicó y adaptó el chatbot seguro de Elfen usando Gemini y el personaje Tanga.
20. Se corrigió el H1 de la home a `Tours en Oxapampa y la Selva Central`, desplazando la mención de paquetes al texto secundario.

---

## 21. Archivos más importantes para continuar

```text
src/layouts/BaseLayout.astro
src/styles/global.css
src/components/ExpeditionNav.astro
src/components/BrandMark.astro
src/components/HeroExpedition.astro
src/components/ReservationModal.astro
src/components/PackageGallery.astro
src/components/RelatedPackageRail.astro
src/components/StayPackageCard.astro
src/components/StayPackageRail.astro
src/components/StayPackageReservationPanel.astro
src/components/TangaranaAssistant.astro
src/pages/index.astro
src/pages/tours/index.astro
src/pages/tours/[slug].astro
src/pages/paquetes/index.astro
src/pages/paquetes/[slug].astro
src/data/site.ts
src/data/images.ts
src/data/packageDetails.ts
src/data/packageMedia.ts
src/data/stayPackages.ts
src/data/tangaranaKnowledge.mjs
src/scripts/tangaranaAssistant.ts
shared/tangarana-contract.mjs
server/tangarana/service.mjs
server/tangarana/prompt.mjs
server/tangarana/storage.mjs
netlify/functions/tangarana-chat.mjs
public/llms.txt
public/llms-full.txt
scripts/audit.mjs
astro.config.ts
netlify.toml
```

---

## 22. Protocolo recomendado para futuros cambios

1. Leer el archivo del componente y su CSS relacionado antes de editar.
2. Confirmar si el cambio afecta tours, paquetes o ambos.
3. Mantener los datos de negocio en `src/data` o `src/content`, no duplicarlos en plantillas.
4. Para imágenes, reutilizar activos locales y procesarlos con Astro.
5. Para videos, conservar carga bajo demanda.
6. Si se toca navegación o hero, validar al menos móvil, tablet, laptop y escritorio.
7. Si se toca carrusel, probar autoplay desde carga inicial, flechas, swipe y clic en tarjetas.
8. Si se toca reserva, comprobar que el formulario abre arriba y que el mensaje de WhatsApp sea claro.
9. Si se toca SEO, actualizar también `scripts/audit.mjs`, `llms.txt`, `llms-full.txt`, sitemap o redirecciones cuando corresponda.
10. Si se toca el chatbot, no enviar consultas reales sin autorización; validar sintaxis, build y contrato local.
11. Ejecutar al terminar:

```bash
npm run check
npm run build
npm run audit
```

12. Informar de forma concreta qué se cambió, qué se verificó y qué queda pendiente.

---

## 23. Resultado que debe preservarse

La web actual debe comunicar en pocos segundos:

- Tangarana ofrece tours directos por Oxapampa y la Selva Central.
- También ofrece paquetes completos con alojamiento para quienes quieren resolver todo el viaje.
- Cada servicio muestra precio, duración, itinerario y condiciones de forma clara.
- El usuario puede comparar, revisar imágenes y videos, consultar a Tanga y terminar la solicitud por WhatsApp.
- Ningún formulario ni chatbot promete disponibilidad o reserva automática.
- La experiencia debe sentirse profesional, natural, cálida y confiable en cualquier tamaño de pantalla.

Continúa el proyecto respetando estas decisiones. Si una nueva solicitud contradice este contexto, sigue la instrucción nueva del usuario, pero señala brevemente el impacto sobre diseño, contenido, SEO, rendimiento o negocio antes de realizar una modificación irreversible.
