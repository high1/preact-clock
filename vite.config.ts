import { preact } from '@preact/preset-vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, loadEnv } from 'vite';
import { checker } from 'vite-plugin-checker';

export default defineConfig(({ mode }) => ({
  base: loadEnv(mode, process.cwd(), '')['BASE'] ?? '',
  plugins: [
    preact({ prefreshEnabled: mode === 'development' }),
    tailwindcss(),
    checker({
      eslint: {
        lintCommand: 'eslint . --max-warnings 0',
        useFlatConfig: true,
      },
      typescript: true,
    }),
  ],
  resolve: {
    tsconfigPaths: true,
  },
  // test: {
  //   alias: {
  //     '@/': new URL('./src/', import.meta.url).pathname,
  //   },
  //   browser: {
  //     enabled: true,
  //     headless: true,
  //     instances: [{ browser: 'chromium' }],
  //     provider: playwright(),
  //     screenshotFailures: false,
  //   },
  //   coverage: {
  //     exclude: ['./src/index.css'],
  //   },
  //   environment: 'happy-dom',
  // },
}));
