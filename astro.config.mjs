import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  adapter: cloudflare(),
  // base path is handled by Webflow Cloud (COSMIC_MOUNT_PATH: /boston)
  trailingSlash: 'never',
});
