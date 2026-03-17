import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  base: '/boston',
  trailingSlash: 'never',
});
