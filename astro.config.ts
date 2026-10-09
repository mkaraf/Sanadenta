import path from 'path';
import { fileURLToPath } from 'url';

import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

import astrowind from './vendor/integration';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: 'https://www.sanadenta.cz',
  output: 'static',
  trailingSlash: 'always',

  integrations: [
    sitemap({
      filter: (page) => new URL(page).pathname !== '/404/',
    }),
    icon({
      include: {
        tabler: ['*'],
      },
    }),

    astrowind({
      config: './src/config.yaml',
    }),
  ],

  image: {
    domains: [],
  },

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  },
});
