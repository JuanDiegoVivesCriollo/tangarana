export type Destination = {
  slug: string;
  name: string;
  eyebrow: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  perspective: string;
  layout: "panorama" | "editorial" | "earth" | "river";
  image: "oxapampaGroup" | "pozuzoGate" | "lagoonSwing" | "yaneshaExperience";
  marker: string;
  tourSlug: string;
  highlights: string[];
};

export const destinations: Destination[] = [
  {
    slug: "oxapampa",
    name: "Oxapampa",
    eyebrow: "Punto de partida",
    seoTitle: "Tours en Oxapampa | Tangarana Travel Tours",
    seoDescription: "Explora opciones de tours en Oxapampa y una ruta de 4 días por la Selva Central con Tangarana Travel Tours.",
    intro: "Oxapampa abre la ruta de Tangarana por la Selva Central: un punto de encuentro entre paisaje, cultura y una forma más pausada de viajar.",
    perspective: "Desde Oxapampa puedes enlazar la expedición de cuatro días con salidas cercanas como Catarata Río Tigre y Chontabamba.",
    layout: "panorama",
    image: "oxapampaGroup",
    marker: "01",
    tourSlug: "catarata-rio-tigre",
    highlights: ["Mirador El Abra", "Manantial de la Virgen", "Catarata Río Tigre", "Turismo vivencial"],
  },
  {
    slug: "pozuzo",
    name: "Pozuzo",
    eyebrow: "Segunda parada",
    seoTitle: "Turismo en Pozuzo | Tangarana Travel Tours",
    seoDescription: "Conoce Pozuzo dentro de la ruta de 4 días por la Selva Central organizada por Tangarana Travel Tours.",
    intro: "Pozuzo ocupa la segunda estación del recorrido, con una identidad reconocible desde su pórtico de bienvenida y su paisaje rodeado de vegetación.",
    perspective: "La jornada anunciada conecta cascadas, pozas de agua y sal, el portal, el parque de Pozuzo, la cervecería artesanal y el barrio Prusia.",
    layout: "editorial",
    image: "pozuzoGate",
    marker: "02",
    tourSlug: "pozuzo-dia-completo",
    highlights: ["Catarata Rayatambo", "Cascada Yulitunqui", "Pozas de agua y sal", "Barrio Prusia"],
  },
  {
    slug: "villa-rica",
    name: "Villa Rica",
    eyebrow: "Tercera parada",
    seoTitle: "Tours en Villa Rica | Tangarana Travel Tours",
    seoDescription: "Incluye Villa Rica en tu viaje por la Selva Central con el tour de 4 días de Tangarana Travel Tours.",
    intro: "Villa Rica marca la tercera jornada de la ruta, con paisaje verde y espacios donde el viaje puede bajar el ritmo frente al agua.",
    perspective: "Su excursión de día completo reúne Laguna El Oconal, mirador, cascada y degustaciones de café y chocolate.",
    layout: "earth",
    image: "lagoonSwing",
    marker: "03",
    tourSlug: "villa-rica-dia-completo",
    highlights: ["Laguna El Oconal", "Mirador de Villa Rica", "Cascada El León", "Café y chocolate"],
  },
  {
    slug: "valle-del-perene",
    name: "Valle del Perené",
    eyebrow: "Cierre de ruta",
    seoTitle: "Valle del Perené: turismo | Tangarana Travel Tours",
    seoDescription: "Descubre el Valle del Perené como cuarta parada del tour de 4 días por la Selva Central de Tangarana Travel Tours.",
    intro: "El Valle del Perené cierra el recorrido de cuatro días con una mirada al paisaje, la comunidad y la memoria cultural de la zona.",
    perspective: "La propuesta del día combina deportes extremos, mariposario, paseo en bote, cataratas y un encuentro con una comunidad nativa asháninka.",
    layout: "river",
    image: "yaneshaExperience",
    marker: "04",
    tourSlug: "perene-dia-completo",
    highlights: ["Catarata Bayoz", "Catarata Velo de la Novia", "Paseo en bote", "Cultura asháninka"],
  },
];

export const destinationBySlug = Object.fromEntries(
  destinations.map((destination) => [destination.slug, destination]),
) as Record<string, Destination>;
