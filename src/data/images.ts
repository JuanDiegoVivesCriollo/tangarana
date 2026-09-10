import hero from "../assets/images/selva-central-montanas-hero.webp";
import trail from "../assets/images/sendero-selva-central.webp";
import river from "../assets/images/rio-bosque-selva-central.webp";

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
} as const;
