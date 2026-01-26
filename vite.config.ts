import { preact } from '@preact/preset-vite';
import tailwindcss from '@tailwindcss/vite';
import { type ConfigEnv, defineConfig, loadEnv } from 'vite';
import { checker } from 'vite-plugin-checker';

export default ({ mode }: ConfigEnv) =>
  defineConfig({
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
  });
