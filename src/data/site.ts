export const SITE_URL = "https://tangaranatravel.pe";

export const siteConfig = {
  name: "Tangarana Travel Tours",
  shortName: "Tangarana",
  tagline: "Vive, explora, conecta",
  description: "Tours turísticos por la Selva Central del Perú.",
  locale: "es_PE",
  language: "es",
  location: {
    street: "Av. San Martín 0001, frente al hospedaje Tunki Lodge",
    city: "Oxapampa",
    region: "Pasco",
    country: "PE",
    display: "Av. San Martín 0001, frente al hospedaje Tunki Lodge, Oxapampa, Pasco",
  },
  phones: ["+51931530169", "+51916414716", "+51926594184"],
  primaryWhatsApp: "+51931530169",
  primaryWhatsAppDisplay: "+51 931 530 169",
  socials: {
    facebook: "https://www.facebook.com/share/18pYh7JSDx/",
    instagram: "https://www.instagram.com/tangaranatraveltours_2026/",
    tiktok: "https://www.tiktok.com/@tangarana_travel_tours",
  },
} as const;

export const defaultWhatsAppMessage =
  "Hola, vi la web de Tangarana Travel Tours y quisiera consultar disponibilidad y detalles de sus tours.";

export const tourWhatsAppMessage =
  "Hola, vi en la web el tour de 4 días por Oxapampa, Pozuzo, Villa Rica y Valle del Perené. Quisiera consultar disponibilidad y detalles.";

export function whatsappUrl(message = defaultWhatsAppMessage) {
  return `https://wa.me/${siteConfig.primaryWhatsApp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}

export function phoneHref(phone: string) {
  return `tel:${phone}`;
}
