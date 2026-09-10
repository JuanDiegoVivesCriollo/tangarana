# Tangarana Travel Tours — frontend

Sitio oficial informativo de Tangarana Travel Tours, desarrollado con Astro, TypeScript y Tailwind CSS. El proyecto genera HTML estático y está preparado para Netlify.

## Abrir en VS Code

Abre directamente esta carpeta:

```text
front-end-tangarana
```

Desde una terminal ubicada dentro de la carpeta:

```bash
npm install
npm run dev
```

Astro mostrará la URL local, normalmente `http://localhost:4321`.

## Comandos

```bash
npm run dev      # desarrollo
npm run check    # validación TypeScript/Astro
npm run build    # build de producción
npm run preview  # vista previa del build
```

## Despliegue en Netlify

1. Sube la carpeta `front-end-tangarana` a un repositorio Git.
2. En Netlify, crea un sitio a partir del repositorio.
3. Si el repositorio contiene únicamente este proyecto, Netlify leerá `netlify.toml` automáticamente.
4. Si el repositorio también contiene otras carpetas, configura `front-end-tangarana` como directorio base.
5. El comando de build es `npm run build` y el directorio publicado es `dist`.
6. Revisa la URL temporal de Netlify antes de conectar el dominio oficial.

## Dominio recomendado

Recomendación principal: `tangaranatravel.pe`.

La consulta WHOIS realizada el 9 de septiembre de 2026 indicó `No Object Found`, es decir, no aparecía registrado en ese momento. La disponibilidad puede cambiar y debe volver a comprobarse justo antes de comprarlo.

Como protección de marca, también conviene adquirir `tangaranatravel.com` y redirigirlo al `.pe`.

### Configurar el dominio comprado en Hostinger

1. Compra el dominio en Hostinger.
2. En Netlify, abre **Domain management** y añade el dominio personalizado.
3. Netlify mostrará los registros DNS exactos que debes configurar.
4. En Hostinger, abre la zona DNS del dominio y copia esos registros exactamente. No inventes valores.
5. Espera la propagación y confirma que el certificado HTTPS esté activo en Netlify.
6. Mantén una sola versión canónica, preferiblemente `https://tangaranatravel.pe`.

> **TODO obligatorio: configurar y comprar el dominio oficial antes de publicar la web definitiva.**

Si se elige otro dominio, actualiza `SITE_URL` en `src/data/site.ts`, las URLs de `public/robots.txt`, `public/llms.txt` y `public/llms-full.txt`, y vuelve a ejecutar el build.

## Dónde editar la información

- Teléfonos, WhatsApp, dirección, dominio y redes: `src/data/site.ts`.
- Navegación: `src/data/navigation.ts`.
- Destinos y textos introductorios: `src/data/destinations.ts`.
- Preguntas frecuentes: `src/data/faq.ts`.
- Imágenes centralizadas: `src/data/images.ts`.
- Paquetes publicados: `src/content/tours/` (expedición de 4 días y cinco excursiones).
- Logo oficial optimizado: `src/assets/brand/tangarana-logo.webp`.
- Estilos y tokens de marca: `src/styles/global.css`.

## Agregar un nuevo tour

1. Duplica un archivo dentro de `src/content/tours/`.
2. Cambia `slug`, título, SEO, precio, duración, destinos, inclusiones e itinerario.
3. Usa solo datos confirmados.
4. Coloca `status: "published"` cuando esté listo.
5. Ejecuta `npm run build` y revisa la nueva URL.

Los tours se leen desde una Astro Content Collection. Si se incorpora otra excursión, añádela también al orden editorial definido en `src/pages/tours/index.astro`.

## Cambiar las imágenes

Las fotografías reales entregadas por Tangarana están optimizadas en `src/assets/images/tangarana/`; el hero editorial aprobado permanece en `src/assets/images/`. Todas se importan desde `src/data/images.ts`. Para reemplazarlas:

1. Añade la fotografía real con un nombre descriptivo.
2. Actualiza solo el import correspondiente en `src/data/images.ts`.
3. Conserva el texto alternativo preciso.
4. No hace falta exportar manualmente AVIF/WebP: el componente `Picture` de Astro genera los formatos y tamaños responsivos al construir el sitio.

Los archivos de `public/og/` son las vistas previas para redes sociales y se conservan como recursos independientes del logotipo de navegación.

Las fotografías originales de WhatsApp no se copian al proyecto. Se trabajó con 12 selecciones convertidas a WebP, con nombres descriptivos; Astro produce además variantes AVIF y tamaños responsivos para móvil y escritorio durante la compilación.

Los cinco afiches recibidos se usaron únicamente como fuente de horarios, precios e itinerarios. No se publican como imágenes: cada paquete está reconstruido con componentes web responsivos.

## Imágenes provisionales generadas

Se usó el generador integrado de imágenes para producir los recursos editoriales iniciales sin texto ni marcas de agua. El hero generado se conserva por decisión del cliente; las demás fotografías visibles principales ya son reales:

- `selva-central-montanas-hero.webp`: montaña y bosque nublado al amanecer para el hero.
- `sendero-selva-central.webp`: sendero húmedo de expedición para secciones editoriales.
- `rio-bosque-selva-central.webp`: río sinuoso y bosque para la narrativa de ruta.
- `public/og/tangarana-social.png`: tarjeta social de marca.
- `public/og/tour-selva-central-4-dias.png`: tarjeta social del tour.

Prompts finales: fotografía editorial natural de bosque nublado, sendero y río de montaña en la Selva Central; paleta verde bosque, niebla y ámbar; geografía creíble; sin monumentos identificables, promesas turísticas, marcas de agua, texto ni estética de stock. Para las tarjetas sociales se pidió únicamente el texto visible ya aprobado en la web.

## SEO y contenido

- Canonicals absolutos centralizados mediante `SITE_URL`.
- Sitemap generado automáticamente por `@astrojs/sitemap`.
- `robots.txt`, `llms.txt` y `llms-full.txt` incluidos.
- JSON-LD para sitio, agencia, tour, breadcrumbs y preguntas frecuentes.
- Metadatos Open Graph y Twitter con imágenes específicas.
- H1, titles y metadescripciones únicos según la intención de búsqueda de cada URL.
- Landings comerciales independientes en `/tours/pozuzo/`, `/tours/villa-rica/`, `/tours/perene/`, `/tours/chontabamba/`, `/tours/catarata-rio-tigre/` y `/tours/selva-central-4-dias/`.
- Páginas informativas independientes en `/destinos/` para evitar duplicar la intención comercial de los tours.
- Redirecciones de compatibilidad desde las cuatro URLs largas utilizadas antes de la refactorización.
- Páginas legales marcadas como borrador y `noindex` hasta revisión.
- La arquitectura de blog está preparada en `src/content/blog/`; no hay artículos ficticios publicados.

## Pasos después del deploy

1. Añadir el dominio final a Google Search Console.
2. Verificar la propiedad del dominio.
3. Enviar `https://DOMINIO-FINAL/sitemap-index.xml`.
4. Inspeccionar la home y `/tours/`.
5. Inspeccionar cada landing comercial de tour.
6. Solicitar indexación cuando el dominio definitivo esté publicado.
7. Revisar cobertura e indexación después de la publicación.
8. Conectar Google Business Profile cuando la empresa lo tenga configurado y verificado.

## Tema y accesibilidad

- Tema claro y oscuro con detección del sistema y preferencia persistente.
- Skip link, landmarks, foco visible y controles utilizables con teclado.
- Navegación inferior móvil y dock lateral en escritorio.
- Tipografía mínima de 16 px para el contenido principal.
- `prefers-reduced-motion` desactiva el scroll suave y reduce animaciones.

## Datos SEO pendientes del cliente

- [ ] Dominio final comprado y confirmado.
- [x] Dirección física: Av. San Martín 0001, frente al hospedaje Tunki Lodge, Oxapampa, Pasco.
- [ ] Horarios de atención.
- [ ] Punto de salida de cada tour.
- [ ] Qué incluye cada tour individual.
- [ ] Qué no incluye cada tour individual.
- [ ] Política de reservas.
- [ ] Política de cancelación y reprogramación.
- [ ] Métodos de pago.
- [ ] Correo comercial.
- [x] Fotos oficiales iniciales.
- [ ] Fotos oficiales adicionales por destino y tour.
- [ ] RUC, si se desea publicar.
- [ ] Descripción e historia oficial de la empresa.
- [ ] Misión y visión.
- [ ] Condiciones para niños y adultos.
- [ ] Testimonios verificables.
- [x] Logo oficial en PNG/WebP.
- [ ] Logo oficial en SVG, si se entrega una versión vectorial.
- [ ] Isotipo independiente de la hormiga, si existe.
- [ ] Texto legal revisado para privacidad y términos.

El frontend no inventa estos datos ni muestra disponibilidad falsa. La futura capa de reservas puede reemplazar los CTA de WhatsApp sin rehacer la estructura de contenido.
