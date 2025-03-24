// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en", "br"],
  },
  prefetch: true,
  vite: {
    plugins: [tailwindcss()]
  }
});