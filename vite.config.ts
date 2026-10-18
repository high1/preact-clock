import { preact } from '@preact/preset-vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { checker } from 'vite-plugin-checker';

export default defineConfig(({ mode }) => ({
  base: process.env['BASE'] ?? '',
  plugins: [
    tailwindcss(),
    preact({ prefreshEnabled: mode === 'development' }),
    {
      ...checker({
        ...(process.env['CI']
          ? {}
          : { eslint: { lintCommand: 'eslint . --max-warnings 0' } }),
        typescript: true,
      }),
      apply: () => mode !== 'test',
    },
  ],
  resolve: {
    tsconfigPaths: true,
  },
}));
