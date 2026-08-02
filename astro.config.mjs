import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

/**
 * Zentrale Astro-Projektkonfiguration.
 * Definiert den Build-Output, integriert den Vercel-Adapter für das Deployment
 * sowie Vite-Plugins für Tailwind CSS v4 und Svelte.
 */
export default defineConfig({
  site: "https://lucasfrey.de",

  integrations: [svelte()],

  output: "static",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),

  vite: {
    plugins: [tailwindcss()],
  },
});
