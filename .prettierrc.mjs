/**
 * Zentrale Prettier-Konfiguration.
 * Lädt erforderliche Plugins für Astro, Svelte und die automatische
 * Sortierung von Tailwind-Klassen zur Gewährleistung einer konsistenten Code-Formatierung.
 */
export default {
  plugins: [
    "prettier-plugin-astro",
    "prettier-plugin-svelte",
    "prettier-plugin-tailwindcss",
  ],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
