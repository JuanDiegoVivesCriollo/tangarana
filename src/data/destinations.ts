export type Destination = {
  slug: string;
  name: string;
  h1: string;
  eyebrow: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  perspective: string;
  layout: "panorama" | "editorial" | "earth" | "river";
  image: "oxapampaGroup" | "pozuzoGate" | "lagoonSwing" | "yaneshaExperience";
  marker: string;
  tourSlug: string;
  tourLinkLabel: string;
  highlights: string[];
};

export const destinations: Destination[] = [
  {
    slug: "oxapampa",
    name: "Oxapampa",
    h1: "Turismo en Oxapampa",
    eyebrow: "Destino en la Selva Central",
    seoTitle: "Oxapampa: turismo, rutas y tours | Tangarana Travel Tours",
    seoDescription: "Conoce la oferta de Tangarana Travel Tours para visitar Oxapampa, Chontabamba y Catarata Río Tigre, además del tour de 4 días por la Selva Central.",
    intro: "Oxapampa forma parte del tour de 4 días de Tangarana Travel Tours y está relacionada con las excursiones publicadas a Chontabamba y Catarata Río Tigre.",
    perspective: "Consulta cada tour para revisar el precio, el horario y las actividades anunciadas. El punto de salida se confirma directamente por WhatsApp.",
    layout: "panorama",
    image: "oxapampaGroup",
    marker: "01",
    tourSlug: "catarata-rio-tigre",
    tourLinkLabel: "Ver tour a Catarata Río Tigre",
    highlights: ["Mirador El Abra", "Manantial de la Virgen", "Catarata Río Tigre", "Turismo vivencial"],
  },
  {
    slug: "pozuzo",
    name: "Pozuzo",
    h1: "Turismo en Pozuzo",
    eyebrow: "Destino del tour de 4 días",
    seoTitle: "Pozuzo: turismo y tours | Tangarana Travel Tours",
    seoDescription: "Conoce Pozuzo y las experiencias que Tangarana Travel Tours ofrece en este destino. Encuentra el tour de un día y el paquete de 4 días.",
    intro: "Pozuzo es uno de los destinos incluidos en el paquete de 4 días y también cuenta con un tour de día completo publicado por Tangarana Travel Tours.",
    perspective: "La oferta disponible menciona el portal, cataratas, pozas de agua y sal, el parque de Pozuzo, una cervecería artesanal y el barrio Prusia.",
    layout: "editorial",
    image: "pozuzoGate",
    marker: "02",
    tourSlug: "pozuzo",
    tourLinkLabel: "Ver tour a Pozuzo",
    highlights: ["Catarata Rayatambo", "Cascada Yulitunqui", "Pozas de agua y sal", "Barrio Prusia"],
  },
  {
    slug: "villa-rica",
    name: "Villa Rica",
    h1: "Turismo en Villa Rica",
    eyebrow: "Destino del tour de 4 días",
    seoTitle: "Villa Rica: turismo y tours | Tangarana Travel Tours",
    seoDescription: "Conoce Villa Rica y las experiencias que Tangarana Travel Tours ofrece en este destino. Encuentra el tour de un día y el paquete de 4 días.",
    intro: "Villa Rica es uno de los destinos incluidos en el paquete de 4 días y también cuenta con un tour de día completo publicado por Tangarana Travel Tours.",
    perspective: "La oferta disponible menciona la Laguna El Oconal, el mirador, la plaza, la Cascada El León y degustaciones de café y chocolate.",
    layout: "earth",
    image: "lagoonSwing",
    marker: "03",
    tourSlug: "villa-rica",
    tourLinkLabel: "Ver tour a Villa Rica",
    highlights: ["Laguna El Oconal", "Mirador de Villa Rica", "Cascada El León", "Café y chocolate"],
  },
  {
    slug: "valle-del-perene",
    name: "Valle del Perené",
    h1: "Turismo en el Valle del Perené",
    eyebrow: "Destino del tour de 4 días",
    seoTitle: "Valle del Perené: turismo y tours | Tangarana Travel Tours",
    seoDescription: "Conoce el Valle del Perené y las experiencias que Tangarana Travel Tours ofrece en este destino. Encuentra el tour de un día y el paquete de 4 días.",
    intro: "El Valle del Perené es uno de los destinos incluidos en el paquete de 4 días y también cuenta con un tour de día completo publicado por Tangarana Travel Tours.",
    perspective: "La oferta disponible menciona deportes extremos, mariposario, paseo en bote, las cataratas Bayoz y Velo de la Novia, y una visita a una comunidad nativa asháninka.",
    layout: "river",
    image: "yaneshaExperience",
    marker: "04",
    tourSlug: "perene",
    tourLinkLabel: "Ver tour al Valle del Perené",
    highlights: ["Catarata Bayoz", "Catarata Velo de la Novia", "Paseo en bote", "Cultura asháninka"],
  },
];

export const destinationBySlug = Object.fromEntries(
  destinations.map((destination) => [destination.slug, destination]),
) as Record<string, Destination>;
