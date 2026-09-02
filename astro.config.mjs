import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import { siteConfig } from "./src/config/site";

export default defineConfig({
  site: siteConfig.url,

  integrations: [sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },
});
