// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

// SSR mode: the Cloudflare adapter runs the site as a Cloudflare Pages Function.
// One deployment handles all subdomains — the middleware resolves the tenant
// from the Host header on every request.
// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
  },
});