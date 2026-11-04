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
  image: "oxapampaGroup" | "pozuzoGate" | "lagoonSwing" | "yaneshaExperience" | "hiking";
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
    seoTitle: "Oxapampa: turismo, tours y paquetes | Tangarana Travel Tours",
    seoDescription: "Descubre Oxapampa con tours a Chontabamba, Catarata Río Tigre y paquetes con alojamiento, desayunos, traslados y recorridos por la Selva Central.",
    intro: "Oxapampa es la base de nuestros paquetes con alojamiento y el punto de partida de los tours a Chontabamba y Catarata Río Tigre.",
    perspective: "Revisa el precio, horario y actividades de cada tour o compara paquetes de 2 a 5 días. La operación final se confirma por WhatsApp.",
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
    eyebrow: "Destino de tours y paquetes",
    seoTitle: "Pozuzo: turismo, tours y paquetes | Tangarana Travel Tours",
    seoDescription: "Visita Pozuzo con Tangarana: tour de día completo y paquetes con alojamiento para conocer cataratas, pozas turquesas, Prusia y su legado austro-alemán.",
    intro: "Pozuzo cuenta con un tour de día completo y está incluido en todos nuestros paquetes de 2 a 5 días.",
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
    eyebrow: "Destino de tours y paquetes",
    seoTitle: "Villa Rica: tours, café y Laguna El Oconal | Tangarana",
    seoDescription: "Explora Villa Rica con Tangarana: Laguna El Oconal, cafetera gigante, ictioterapia, miradores, Cascada El León y experiencias de café y chocolate.",
    intro: "Villa Rica cuenta con un tour de día completo y está incluida en los paquetes de 3, 4 y 5 días.",
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
    eyebrow: "Destino de tours y paquetes",
    seoTitle: "Valle del Perené: tours y paquetes | Tangarana Travel Tours",
    seoDescription: "Recorre el Valle del Perené con Tangarana entre las cataratas Bayoz y Velo de la Novia, paseo en bote, naturaleza tropical y cultura asháninka.",
    intro: "El Valle del Perené cuenta con un tour de día completo y está incluido en el paquete de 5 días y 4 noches.",
    perspective: "La oferta disponible menciona deportes extremos, mariposario, paseo en bote, las cataratas Bayoz y Velo de la Novia, y una visita a una comunidad nativa asháninka.",
    layout: "river",
    image: "yaneshaExperience",
    marker: "04",
    tourSlug: "perene",
    tourLinkLabel: "Ver tour al Valle del Perené",
    highlights: ["Catarata Bayoz", "Catarata Velo de la Novia", "Paseo en bote", "Cultura asháninka"],
  },
  {
    slug: "yanachaga-chemillen",
    name: "Yanachaga Chemillén",
    h1: "Parque Nacional Yanachaga Chemillén",
    eyebrow: "Área natural protegida",
    seoTitle: "Yanachaga Chemillén: caminata desde Oxapampa | Tangarana",
    seoDescription: "Conoce el sector San Alberto del Parque Nacional Yanachaga Chemillén en una caminata guiada desde Oxapampa entre bosque, flora, fauna y árboles antiguos.",
    intro: "El sector San Alberto permite caminar por el bosque y observar flora, fauna, plantas silvestres y árboles antiguos.",
    perspective: "La ruta publicada tiene aproximadamente 14 km entre ida y regreso. La fecha y las condiciones del sendero se confirman por WhatsApp.",
    layout: "panorama",
    image: "hiking",
    marker: "05",
    tourSlug: "yanachaga-chemillen",
    tourLinkLabel: "Ver tour Yanachaga Chemillén",
    highlights: ["Flora y fauna", "Plantas del bosque", "Árboles antiguos", "Caminata de 14 km"],
  },
];

export const destinationBySlug = Object.fromEntries(
  destinations.map((destination) => [destination.slug, destination]),
) as Record<string, Destination>;
