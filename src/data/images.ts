import hero from "../assets/images/selva-central-montanas-hero.webp";
import trail from "../assets/images/sendero-selva-central.webp";
import river from "../assets/images/rio-bosque-selva-central.webp";
import airBike from "../assets/images/tangarana/actividad-bicicleta-aerea.webp";
import highBridge from "../assets/images/tangarana/actividad-puente-altura.webp";
import lagoonSwing from "../assets/images/tangarana/laguna-columpio.webp";
import hiking from "../assets/images/tangarana/senderismo-selva-central.webp";
import butterfly from "../assets/images/tangarana/mariposa-selva-central.webp";
import pozuzoGate from "../assets/images/tangarana/pozuzo-portico.webp";
import yaneshaExperience from "../assets/images/tangarana/experiencia-yanesha.webp";
import yaneshaCulture from "../assets/images/tangarana/cultura-yanesha.webp";
import lagoonGroup from "../assets/images/tangarana/grupo-laguna-bote.webp";
import waterfallGroup from "../assets/images/tangarana/grupo-cascada.webp";
import oxapampaGroup from "../assets/images/tangarana/oxapampa-mirador-grupo.webp";
import waterPause from "../assets/images/tangarana/grupo-pies-agua.webp";

export const siteImages = {
  hero: {
    src: hero,
    alt: "Montañas cubiertas de bosque y neblina en un paisaje que evoca la Selva Central",
  },
  trail: {
    src: trail,
    alt: "Sendero húmedo entre helechos y bosque de montaña",
  },
  river: {
    src: river,
    alt: "Río sinuoso rodeado por bosque tropical y montañas",
  },
  airBike: {
    src: airBike,
    alt: "Tres viajeras recorriendo bicicletas suspendidas sobre un valle verde",
  },
  highBridge: {
    src: highBridge,
    alt: "Viajeras con casco y arnés cruzando un puente de aventura entre montañas",
  },
  lagoonSwing: {
    src: lagoonSwing,
    alt: "Viajera en un columpio bajo un árbol frente a una laguna",
  },
  hiking: {
    src: hiking,
    alt: "Grupo de viajeros caminando por un sendero junto a una quebrada",
  },
  butterfly: {
    src: butterfly,
    alt: "Mariposa de grandes ocelos posada sobre el tronco de un árbol",
  },
  pozuzoGate: {
    src: pozuzoGate,
    alt: "Pórtico de bienvenida a Pozuzo rodeado de vegetación",
  },
  yaneshaExperience: {
    src: yaneshaExperience,
    alt: "Visitantes en una experiencia de historia y cultura yanesha",
  },
  yaneshaCulture: {
    src: yaneshaCulture,
    alt: "Pareja participando en una experiencia cultural yanesha",
  },
  lagoonGroup: {
    src: lagoonGroup,
    alt: "Grupo de viajeros saludando desde una embarcación junto a una laguna",
  },
  waterfallGroup: {
    src: waterfallGroup,
    alt: "Grupo de viajeros reunido frente a una cascada en el bosque",
  },
  oxapampaGroup: {
    src: oxapampaGroup,
    alt: "Grupo de viajeros frente al letrero de Oxapampa y un mirador de madera",
  },
  waterPause: {
    src: waterPause,
    alt: "Grupo de viajeros descansando con los pies en el agua",
  },
} as const;

export type SiteImageKey = keyof typeof siteImages;

export const activityMoments = [
  {
    marker: "01",
    image: siteImages.airBike,
    title: "Altura y movimiento",
    description: "Circuitos de aventura con el bosque y las montañas siempre a la vista.",
  },
  {
    marker: "02",
    image: siteImages.highBridge,
    title: "Cruces que se recuerdan",
    description: "Retos en altura para quienes disfrutan una ruta con más adrenalina.",
  },
  {
    marker: "03",
    image: siteImages.hiking,
    title: "Senderos vivos",
    description: "Caminatas entre vegetación, agua y el sonido cercano del bosque.",
  },
  {
    marker: "04",
    image: siteImages.butterfly,
    title: "Naturaleza de cerca",
    description: "Detalles que obligan a bajar el ritmo y mirar con más atención.",
  },
] as const;

export const journeyMoments = [
  {
    image: siteImages.waterfallGroup,
    label: "Naturaleza compartida",
  },
  {
    image: siteImages.lagoonGroup,
    label: "Viajes en grupo",
  },
  {
    image: siteImages.yaneshaCulture,
    label: "Encuentros culturales",
  },
  {
    image: siteImages.waterPause,
    label: "Pausas en la ruta",
  },
] as const;
