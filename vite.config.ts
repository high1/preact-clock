import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import uno from 'unocss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  base: '/preact-clock/',
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
  plugins: [preact(), uno(), tsconfigPaths()],
  optimizeDeps: {
    disabled: false,
  },
  build: {
    commonjsOptions: { include: [] },
  },
});
