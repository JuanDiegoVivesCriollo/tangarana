import type { ImageMetadata } from "astro";
import { packagePhotos, type PackagePhoto } from "./packageMedia";

export interface StayPackageDay {
  day: number;
  destination: string;
  tourSlug: string;
  pickup: string;
  start: string;
  end: string;
  summary: string;
  details: string[];
  photo: PackagePhoto;
}

export interface StayPackage {
  slug: string;
  title: string;
  durationLabel: string;
  days: number;
  nights: number;
  cabinPrice: number;
  standardPrice: number;
  summary: string;
  routeSummary: string;
  seoTitle: string;
  seoDescription: string;
  itinerary: StayPackageDay[];
  includes: string[];
  excludes: string[];
  conditions: string[];
  bring: string[];
  gallery: PackagePhoto[];
}

interface LodgingPhoto extends PackagePhoto {
  fileName: string;
}

const stayMediaModules = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/images/stay-packages/**/*.{jpg,jpeg,png,webp}",
  { eager: true },
);

const mediaDescriptions: Record<string, string[]> = {
  "carolina-egg": [
    "Habitación de madera preparada en el hospedaje Carolina Egg",
    "Habitación familiar tipo cabaña en Carolina Egg",
    "Interior amplio de una cabaña en Carolina Egg",
    "Áreas verdes y jardines del hospedaje Carolina Egg",
    "Piscina temperada del hospedaje Carolina Egg",
    "Recepción y jardines del hospedaje Carolina Egg",
    "Zona de descanso al aire libre en Carolina Egg",
    "Cabañas de madera rodeadas de vegetación en Carolina Egg",
    "Desayuno servido a huéspedes de Carolina Egg",
  ],
  "cruz-del-sur": [
    "Bus Cruz del Sur en la ruta hacia Oxapampa",
    "Asientos reclinables del servicio suite de Cruz del Sur",
    "Buses Cruz del Sur en Oxapampa y la Selva Central",
  ],
};

const groupedMedia = Object.entries(stayMediaModules).reduce<Record<string, LodgingPhoto[]>>((groups, [path, module]) => {
  const folder = path.split("/").at(-2) ?? "";
  const fileName = path.split("/").at(-1) ?? path;
  const photos = groups[folder] ?? [];
  photos.push({ src: module.default, alt: "", fileName });
  groups[folder] = photos;
  return groups;
}, {});

for (const [folder, photos] of Object.entries(groupedMedia)) {
  photos.sort((a, b) => a.fileName.localeCompare(b.fileName, "es"));
  photos.forEach((photo, index) => {
    photo.alt = mediaDescriptions[folder]?.[index] ?? `Fotografía de ${folder}, imagen ${index + 1}`;
  });
}

export const carolinaEggPhotos: PackagePhoto[] = groupedMedia["carolina-egg"] ?? [];
export const cruzDelSurPhotos: PackagePhoto[] = groupedMedia["cruz-del-sur"] ?? [];

const tourPhoto = (slug: string, preferredIndex: number): PackagePhoto => {
  const photos = packagePhotos[slug] ?? [];
  return photos[preferredIndex] ?? photos[0] ?? carolinaEggPhotos[0];
};

const dayPlans: Record<string, Omit<StayPackageDay, "day">> = {
  chontabamba: {
    destination: "Chontabamba",
    tourSlug: "chontabamba",
    pickup: "9:45 a. m.",
    start: "10:00 a. m.",
    end: "2:00 p. m.",
    summary: "Tradición, aventura y producción local en uno de los distritos más cercanos a Oxapampa.",
    details: [
      "Degustación de quesos artesanales, danzas típicas y recorrido por la plaza principal.",
      "Visita a la Casa al Revés y Tunqui Cueva, además del tour de la miel, el guarapo y las artesanías.",
    ],
    photo: tourPhoto("chontabamba", 3),
  },
  pozuzo: {
    destination: "Pozuzo",
    tourSlug: "pozuzo",
    pickup: "5:00 a. m.",
    start: "5:30 a. m.",
    end: "6:30 p. m.",
    summary: "Naturaleza e historia en la única colonia austro-alemana del mundo asentada en la selva tropical.",
    details: [
      "Ruta por pozas turquesas, cataratas, plazas tradicionales y puentes colgantes.",
      "Experiencias vinculadas con las costumbres locales, su gastronomía, cerveza artesanal y danzas típicas.",
    ],
    photo: tourPhoto("pozuzo", 0),
  },
  "villa-rica": {
    destination: "Villa Rica",
    tourSlug: "villa-rica",
    pickup: "8:15 a. m.",
    start: "8:30 a. m.",
    end: "6:30 p. m.",
    summary: "Día entre café, laguna, miradores y paisajes del reconocido destino cafetalero del Perú.",
    details: [
      "Visita a la plaza principal y a la cafetera más grande del mundo, reconocida con un récord Guinness.",
      "Paseo en bote, miradores, actividades de aventura y degustaciones de café y chocolate artesanal.",
    ],
    photo: tourPhoto("villa-rica", 5),
  },
  perene: {
    destination: "Valle del Perené",
    tourSlug: "perene",
    pickup: "7:45 a. m.",
    start: "8:00 a. m.",
    end: "8:00 p. m.",
    summary: "Valle tropical de cataratas, biodiversidad y encuentro con la cultura asháninka.",
    details: [
      "Visita a un mariposario, mini zoológico y cataratas rodeadas de vegetación.",
      "Encuentro cultural con una comunidad asháninka y posibilidad de realizar un paseo en bote.",
    ],
    photo: tourPhoto("perene", 5),
  },
  "catarata-rio-tigre": {
    destination: "Catarata Río Tigre",
    tourSlug: "catarata-rio-tigre",
    pickup: "9:45 a. m.",
    start: "10:00 a. m.",
    end: "2:00 p. m.",
    summary: "Catarata, pozas cristalinas, naturaleza y una experiencia familiar cerca de Oxapampa.",
    details: [
      "Recorrido junto a las caídas de agua, sus paredes rocosas y la Gruta de la Virgen.",
      "Visita a fundos ganaderos, un mirador panorámico y la zona de juegos extremos con silla voladora; según la operación, podrás interactuar con animales de granja.",
    ],
    photo: tourPhoto("catarata-rio-tigre", 0),
  },
};

const makeDays = (slugs: string[]): StayPackageDay[] => slugs.map((slug, index) => ({
  day: index + 1,
  ...dayPlans[slug],
}));

const makeGallery = (slugs: string[]): PackagePhoto[] => {
  const preferred: Record<string, number> = {
    chontabamba: 3,
    pozuzo: 0,
    "villa-rica": 5,
    perene: 5,
    "catarata-rio-tigre": 0,
  };
  const selected = slugs.map((slug) => tourPhoto(slug, preferred[slug] ?? 0));
  if (carolinaEggPhotos[5]) selected.push(carolinaEggPhotos[5]);
  return selected;
};

const commonConditions = [
  "Niños de 3 a 10 años pagan el 75% de la tarifa de adulto.",
  "Tarifas no válidas durante feriados largos.",
  "Alojamiento en el hospedaje Carolina Egg y transporte en van turística.",
  "Recorridos guiados en español.",
  "Descuentos especiales para grupos, sujetos a confirmación.",
  "Si viajas con mascota, consulta la tarifa adicional y las políticas de convivencia.",
  "La reserva se confirma con el 50% del monto total.",
];

const commonExcludes = [
  "Almuerzos, con precios referenciales de S/27 a S/50.",
  "Pasaje desde tu ciudad de origen hacia Oxapampa.",
];

const includesFor = (days: number, nights: number) => [
  `Tours durante ${days} días con tickets de ingreso a los atractivos programados.`,
  `Alojamiento por ${days} días / ${nights} ${nights === 1 ? "noche" : "noches"}.`,
  `${days} desayunos, uno por cada día de estadía.`,
  "Recepción en el terminal terrestre de Oxapampa y traslado al hospedaje.",
  "Guías totalmente especializados en las rutas.",
  "Movilidad cómoda en van turística durante los recorridos.",
  "Botiquín de primeros auxilios.",
  "Traslado final desde el hospedaje al terminal terrestre.",
];

const packageBring = [
  "Repelente.",
  "Bloqueador solar.",
  "Zapatillas cómodas.",
  "Ropa de baño.",
  "Toalla.",
  "Dinero en efectivo.",
  "Abrigo ligero.",
];

const definitions = [
  {
    slug: "2-dias-1-noche",
    days: 2,
    nights: 1,
    cabinPrice: 319,
    standardPrice: 297,
    daySlugs: ["chontabamba", "pozuzo"],
    routeSummary: "Chontabamba · Pozuzo",
  },
  {
    slug: "3-dias-2-noches",
    days: 3,
    nights: 2,
    cabinPrice: 539,
    standardPrice: 495,
    daySlugs: ["chontabamba", "pozuzo", "villa-rica"],
    routeSummary: "Chontabamba · Pozuzo · Villa Rica",
  },
  {
    slug: "4-dias-3-noches",
    days: 4,
    nights: 3,
    cabinPrice: 710,
    standardPrice: 644,
    daySlugs: ["chontabamba", "pozuzo", "villa-rica", "catarata-rio-tigre"],
    routeSummary: "Chontabamba · Pozuzo · Villa Rica · Río Tigre",
  },
  {
    slug: "5-dias-4-noches",
    days: 5,
    nights: 4,
    cabinPrice: 930,
    standardPrice: 841,
    daySlugs: ["chontabamba", "pozuzo", "villa-rica", "perene", "catarata-rio-tigre"],
    routeSummary: "Chontabamba · Pozuzo · Villa Rica · Valle del Perené · Río Tigre",
  },
] as const;

export const stayPackages: StayPackage[] = definitions.map((definition) => {
  const durationLabel = `${definition.days} días / ${definition.nights} ${definition.nights === 1 ? "noche" : "noches"}`;
  const excludes = [...commonExcludes];
  if (definition.days >= 3) excludes.splice(1, 0, "Canopy en el tour de Villa Rica, desde S/30.");
  if (definition.days >= 5) excludes.splice(2, 0, "Paseo en bote en el Valle del Perené: S/10.");

  return {
    slug: definition.slug,
    title: `Paquete ${durationLabel}`,
    durationLabel,
    days: definition.days,
    nights: definition.nights,
    cabinPrice: definition.cabinPrice,
    standardPrice: definition.standardPrice,
    summary: `Programa de ${durationLabel} con tours, alojamiento en Carolina Egg, desayunos y traslados en Oxapampa.`,
    routeSummary: definition.routeSummary,
    seoTitle: `Paquete ${durationLabel} en Oxapampa | Tangarana Tours`,
    seoDescription: `Paquete de ${durationLabel} en Oxapampa con alojamiento, desayunos y tours por ${definition.routeSummary}. Desde S/${definition.standardPrice} por persona.`,
    itinerary: makeDays([...definition.daySlugs]),
    includes: includesFor(definition.days, definition.nights),
    excludes,
    conditions: [...commonConditions],
    bring: [...packageBring],
    gallery: makeGallery([...definition.daySlugs]),
  };
});

export const stayPackageBySlug = Object.fromEntries(stayPackages.map((item) => [item.slug, item])) as Record<string, StayPackage>;

export const lodgingCopy = {
  intro: "A tu llegada a Oxapampa te recibiremos en el terminal terrestre y te trasladaremos al hospedaje, donde disfrutarás de un desayuno de bienvenida. El check-in es a las 2:00 p. m.; antes podrás dejar el equipaje en recepción y utilizar las instalaciones para tu aseo personal.",
  departure: "El último día, el check-out es a las 11:00 a. m. Podrás dejar el equipaje en recepción y continuar usando las instalaciones hasta el traslado final al terminal terrestre.",
  summary: "Carolina Egg ofrece cabañas y habitaciones estándar, piscina temperada, jardines, cochera, fogata al aire libre y juegos para niños. Es pet friendly, sujeto a políticas de convivencia, y está a cinco cuadras de la Plaza de Armas de Oxapampa.",
  cabin: "Cabaña construida en madera con terraza y vista al jardín. Incluye microondas, hervidor de agua, frigobar, menaje básico, baño privado con agua caliente, TV con cable local y Wi-Fi.",
  standard: "Habitación estándar con baño y ducha privados, agua caliente, TV con cable local y Wi-Fi. Incluye acceso a un área compartida con frigobar, microondas, hervidor y menaje básico.",
  schedule: "Check-in: 2:00 p. m. · Check-out: 11:00 a. m. Early check-in y late check-out tienen costo adicional, están sujetos a disponibilidad y deben confirmarse.",
};

export const busCopy = {
  intro: "El pasaje hacia Oxapampa no está incluido. Como referencia, Cruz del Sur ofrece servicios desde Lima con costo adicional según el asiento elegido.",
  economy: 80,
  suite: 112,
  times: ["8:15 p. m.", "8:45 p. m.", "9:15 p. m."],
  duration: "Duración estimada: 10 horas",
  terminals: [
    "Av. Javier Prado 1109, La Victoria, Lima",
    "Av. Gerardo Unger 6917, Plaza Norte, Lima",
    "Terminal terrestre de Oxapampa",
  ],
  note: "Tarifas referenciales por persona y sujetas a cambios según temporada. Tangarana confirma únicamente los servicios incluidos en el paquete.",
};
