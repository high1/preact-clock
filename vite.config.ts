import { defineConfig, loadEnv, type ConfigEnv } from 'vite';
import preact from '@preact/preset-vite';
import uno from 'unocss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default ({ mode }: ConfigEnv) =>
  defineConfig({
    base: loadEnv(mode, process.cwd(), '')['BASE'] ?? '',
    plugins: [preact(), uno(), tsconfigPaths()],
  });
