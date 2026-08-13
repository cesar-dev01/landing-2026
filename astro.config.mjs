import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import vercel from '@astrojs/vercel';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import sanity from '@sanity/astro';

const env = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '');
const projectId = env.PUBLIC_SANITY_PROJECT_ID;
const dataset = env.PUBLIC_SANITY_DATASET || 'production';
const site = env.PUBLIC_SITE_URL || 'https://example.com';

export default defineConfig({
  site,
  output: 'static',
  adapter: vercel(),
  integrations: [
    sitemap({ filter: (page) => !page.includes('/admin') }),
    ...(projectId
      ? [sanity({ projectId, dataset, useCdn: false, studioBasePath: '/admin' })]
      : []),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  compressHTML: true,
  prefetch: { prefetchAll: false, defaultStrategy: 'viewport' },
});
