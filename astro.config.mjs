// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://docs.netlify.com/routing/redirects/
// to avoid see redirect...page, to quickly redirect from index.astro /src/pages/index.astro to default x language using netlify
import netlify from "@astrojs/netlify";

import svelte from "@astrojs/svelte";

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

  integrations: [svelte(), react()],

  env: {
    schema: {
      PRIVATE_FORM_URL: envField.string({ context: 'client', access: 'public' })
    }
  },

  adapter: netlify()
});