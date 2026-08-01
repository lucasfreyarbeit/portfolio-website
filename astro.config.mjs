import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import vercel from "@astrojs/vercel";

export default defineConfig({
  site: "https://lucasfrey.de",

  integrations: [svelte()],

  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true
    }
  }),

  vite: {
  }
});