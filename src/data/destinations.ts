export type Destination = {
  slug: string;
  name: string;
  eyebrow: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  perspective: string;
  layout: "panorama" | "editorial" | "earth" | "river";
  image: "hero" | "trail" | "river";
  marker: string;
};

export const destinations: Destination[] = [
  {
    slug: "oxapampa",
    name: "Oxapampa",
    eyebrow: "Punto de partida",
    seoTitle: "Tours en Oxapampa | Tangarana Travel Tours",
    seoDescription: "Explora opciones de tours en Oxapampa y una ruta de 4 días por la Selva Central con Tangarana Travel Tours.",
    intro: "Oxapampa abre la ruta de Tangarana por la Selva Central: un punto de encuentro entre paisaje, cultura y una forma más pausada de viajar.",
    perspective: "Desde aquí puedes consultar el paquete principal y coordinar directamente por WhatsApp los detalles de tu viaje.",
    layout: "panorama",
    image: "hero",
    marker: "01",
  },
  {
    slug: "pozuzo",
    name: "Pozuzo",
    eyebrow: "Segunda parada",
    seoTitle: "Turismo en Pozuzo | Tangarana Travel Tours",
    seoDescription: "Conoce Pozuzo dentro de la ruta de 4 días por la Selva Central organizada por Tangarana Travel Tours.",
    intro: "Pozuzo ocupa la segunda estación del recorrido. La página está preparada para sumar información confirmada, fotografías reales y detalles coordinados del itinerario.",
    perspective: "Tangarana integra este destino en su ruta de cuatro días sin esconder la información esencial: duración, inclusiones, precio y contacto.",
    layout: "editorial",
    image: "trail",
    marker: "02",
  },
  {
    slug: "villa-rica",
    name: "Villa Rica",
    eyebrow: "Tercera parada",
    seoTitle: "Tours en Villa Rica | Tangarana Travel Tours",
    seoDescription: "Incluye Villa Rica en tu viaje por la Selva Central con el tour de 4 días de Tangarana Travel Tours.",
    intro: "Villa Rica marca la tercera jornada de la ruta. Su espacio visual adopta tonos de tierra y bosque, con contenido prudente hasta confirmar el itinerario completo.",
    perspective: "Consulta con el equipo qué experiencias se coordinarán para la fecha de tu viaje antes de reservar.",
    layout: "earth",
    image: "trail",
    marker: "03",
  },
  {
    slug: "valle-del-perene",
    name: "Valle del Perené",
    eyebrow: "Cierre de ruta",
    seoTitle: "Valle del Perené: turismo | Tangarana Travel Tours",
    seoDescription: "Descubre el Valle del Perené como cuarta parada del tour de 4 días por la Selva Central de Tangarana Travel Tours.",
    intro: "El Valle del Perené cierra el recorrido de cuatro días. Una composición inspirada en el movimiento del río guía esta última etapa.",
    perspective: "Los lugares, horarios y actividades concretas se confirman directamente con Tangarana Travel Tours.",
    layout: "river",
    image: "river",
    marker: "04",
  },
];

export const destinationBySlug = Object.fromEntries(
  destinations.map((destination) => [destination.slug, destination]),
) as Record<string, Destination>;
