import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://lucasfreyarbeit.github.io",
  base: "/portfolio-webseite/",

  integrations: [svelte()],

  vite: {
    plugins: [tailwindcss()]
  }
});