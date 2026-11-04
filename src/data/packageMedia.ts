import type { ImageMetadata } from "astro";

export interface PackagePhoto {
  src: ImageMetadata;
  alt: string;
}

export interface PackageVideo {
  src: string;
  label: string;
}

const modules = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/images/packages/**/*.{jpg,jpeg,png,webp}",
  { eager: true },
);

const descriptions: Record<string, string[]> = {
  chontabamba: [
    "Iglesia y jardines de Chontabamba",
    "Recorrido por la cueva Tunqui",
    "Visitantes explorando las formaciones de la cueva Tunqui",
    "Casa al Revés de Chontabamba",
    "Grupo de visitantes dentro de la cueva Tunqui",
    "Casa tradicional visitada durante el tour",
    "Visitantes frente a la Casa al Revés",
    "Experiencia cultural durante la visita a Chontabamba",
  ],
  perene: [
    "Experiencia cultural en el Valle del Perené",
    "Visitantes participando en una presentación cultural asháninka",
    "Encuentro con la cultura asháninka",
    "Paseo en bote durante el tour al Valle del Perené",
    "Mariposa observada durante la visita al mariposario",
    "Catarata visitada en el Valle del Perené",
    "Viajero frente a una catarata del Valle del Perené",
    "Ave observada durante el recorrido por el Valle del Perené",
  ],
  pozuzo: [
    "Pórtico de bienvenida a Pozuzo con viajeros de Tangarana",
    "Parque de Pozuzo rodeado de jardines",
    "Cervecería artesanal de Pozuzo",
    "Degustación de cerveza artesanal de Pozuzo",
    "Plaza y representación histórica de Pozuzo",
    "Aguas cristalinas de las pozas de agua y sal de Pozuzo",
  ],
  "rio-tigre": [
    "Catarata Río Tigre rodeada por el bosque",
    "Sendero y caída de agua de la Catarata Río Tigre",
    "Pozas de aguas cristalinas rodeadas por el bosque",
    "Manantial natural y zona de baño del recorrido",
    "Actividad recreativa en el Mirador El Abra",
    "Vista panorámica de las montañas desde El Abra",
    "Visitante participando en el ordeño de una vaca",
    "Grupo de viajeros frente a una catarata del recorrido",
    "Experiencia cultural de estilo tirolés cerca de Oxapampa",
  ],
  "villa-rica": [
    "Paisaje de Villa Rica visto desde una embarcación",
    "Degustación de café durante el tour a Villa Rica",
    "Taza y granos durante una degustación en Villa Rica",
    "Flores acuáticas de la laguna El Oconal",
    "Plaza de Villa Rica",
    "Columpio junto a la laguna El Oconal",
    "Viajeros descansando junto al agua en Villa Rica",
    "Mirador con vista panorámica de Villa Rica",
    "Grupo de viajeros durante el paseo en bote",
    "Mirador fotográfico junto a la laguna",
  ],
  yanachaga: [
    "Caminata entre helechos en Yanachaga Chemillén",
    "Fauna observada durante la caminata en Yanachaga Chemillén",
    "Especie silvestre observada en el bosque",
    "Ave de la Selva Central observada durante la ruta",
    "Oso de anteojos en el bosque de Yanachaga Chemillén",
    "Pequeña caída de agua entre musgo y helechos",
    "Caminantes cruzando una quebrada en Yanachaga Chemillén",
    "Sendero de ingreso al bosque de Yanachaga Chemillén",
  ],
};

const photosByFolder = Object.entries(modules).reduce<Record<string, PackagePhoto[]>>((groups, [path, module]) => {
  const folder = path.split("/").at(-2) ?? "";
  const photos = groups[folder] ?? [];
  photos.push({ src: module.default, alt: "" });
  groups[folder] = photos;
  return groups;
}, {});

for (const [folder, photos] of Object.entries(photosByFolder)) {
  photos.sort((a, b) => a.src.src.localeCompare(b.src.src, "es"));
  photos.forEach((photo, index) => {
    photo.alt = descriptions[folder]?.[index] ?? `Fotografía del tour ${folder}, imagen ${index + 1}`;
  });
}

const chontabamba = photosByFolder.chontabamba ?? [];
const perene = photosByFolder.perene ?? [];
const pozuzo = photosByFolder.pozuzo ?? [];
const rioTigre = photosByFolder["rio-tigre"] ?? [];
const villaRica = photosByFolder["villa-rica"] ?? [];
const yanachaga = photosByFolder.yanachaga ?? [];

export const packagePhotos: Record<string, PackagePhoto[]> = {
  chontabamba,
  perene,
  pozuzo,
  "catarata-rio-tigre": rioTigre,
  "villa-rica": villaRica,
  "yanachaga-chemillen": yanachaga,
  "selva-central-4-dias": [
    perene[5],
    pozuzo[0],
    pozuzo[4],
    villaRica[0],
    villaRica[5],
    villaRica[8],
    perene[1],
  ].filter(Boolean) as PackagePhoto[],
};

export const packageVideos: Record<string, PackageVideo | undefined> = {
  pozuzo: { src: "/media/packages/pozuzo/experiencia-pozuzo.mp4", label: "Video de la experiencia en Pozuzo" },
  perene: { src: "/media/packages/perene/experiencia-perene.mp4", label: "Video de la experiencia en el Valle del Perené" },
};

export const packageCover = (slug: string) => {
  const preferredIndex: Record<string, number> = {
    chontabamba: 2,
    perene: 5,
    pozuzo: 0,
    "catarata-rio-tigre": 0,
    "villa-rica": 5,
    "yanachaga-chemillen": 6,
    "selva-central-4-dias": 0,
  };
  const photos = packagePhotos[slug] ?? [];
  return photos[preferredIndex[slug] ?? 0] ?? photos[0];
};
