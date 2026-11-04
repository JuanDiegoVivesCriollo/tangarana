import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

import { SITE_URL } from "./src/data/site";

export default defineConfig({
  site: SITE_URL,
  output: "static",
  trailingSlash: "always",
  redirects: {
    "/tours/perene-dia-completo": "/tours/perene/",
    "/tours/villa-rica-dia-completo": "/tours/villa-rica/",
    "/tours/pozuzo-dia-completo": "/tours/pozuzo/",
    "/tours/chontabamba-medio-dia": "/tours/chontabamba/",
    "/tours/selva-central-4-dias": "/paquetes/4-dias-3-noches/",
  },
  integrations: [
    sitemap({
      filter: (page) =>
        !page.endsWith("/politica-de-privacidad/") &&
        !page.endsWith("/terminos-y-condiciones/") &&
        !page.endsWith("/tours/perene-dia-completo/") &&
        !page.endsWith("/tours/villa-rica-dia-completo/") &&
        !page.endsWith("/tours/pozuzo-dia-completo/") &&
        !page.endsWith("/tours/chontabamba-medio-dia/") &&
        !page.endsWith("/tours/selva-central-4-dias/"),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
