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
  },
  integrations: [
    sitemap({
      filter: (page) =>
        !page.endsWith("/politica-de-privacidad/") &&
        !page.endsWith("/terminos-y-condiciones/") &&
        !page.endsWith("/tours/perene-dia-completo/") &&
        !page.endsWith("/tours/villa-rica-dia-completo/") &&
        !page.endsWith("/tours/pozuzo-dia-completo/") &&
        !page.endsWith("/tours/chontabamba-medio-dia/"),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
