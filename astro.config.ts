import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

import { SITE_URL } from "./src/data/site";

export default defineConfig({
  site: SITE_URL,
  output: "static",
  trailingSlash: "always",
  integrations: [
    sitemap({
      filter: (page) =>
        !page.endsWith("/politica-de-privacidad/") &&
        !page.endsWith("/terminos-y-condiciones/"),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
