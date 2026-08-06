import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

import astro from "eslint-plugin-astro";
import svelte from "eslint-plugin-svelte";
import svelteParser from "svelte-eslint-parser";

export default tseslint.config(
  {
    ignores: ["dist/", ".astro/", "node_modules/", ".vercel/", "coverage/"],
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  ...astro.configs.recommended,

  ...svelte.configs["flat/recommended"],

  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  {
    files: ["**/*.svelte"],

    languageOptions: {
      parser: svelteParser,

      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: [".svelte"],
      },
    },
  },

  {
    files: ["**/*.astro"],

    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: [".astro"],
      },
    },
  },

  {
    rules: {
      // TypeScript
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      // JS
      "no-console": "warn",
      "no-debugger": "error",

      // Allgemein
      "prefer-const": "error",
      "no-var": "error",
      "object-shorthand": "error",
      "prefer-template": "warn",
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
    },
  },
);
