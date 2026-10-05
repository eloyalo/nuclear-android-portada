// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // URLs absolutas (canonical, hreflang, Open Graph, sitemap)
  site: 'https://nuclear.eloyalonso.dev',
  // /sitemap-index.xml con la versión en inglés (raíz) y en español (/es/)
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', es: 'es' },
      },
    }),
  ],
  server: {
    host: true, // escucha en 0.0.0.0 para que el puerto sea accesible fuera del contenedor
    port: 4322,
  },
});
