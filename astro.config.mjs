// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: "en",
    locales: ["es", "en", "br"],
    routing: {
      prefixDefaultLocale: true,
    },
  },

  prefetch: true,

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()],

  env: {
    schema: {
      PRIVATE_FORM_URL: envField.string({ context: 'client', access: 'public' })
    }
  }
});