/// <reference types="vite/client" />
/// <reference types="vitest" />

interface ImportMetaEnv {
  readonly VITE_TZ?: string;
}

// The plugin ships as plain JS without type declarations.
declare module '@preact/eslint-plugin-signals' {
  const plugin: import('eslint').ESLint.Plugin;
  export default plugin;
}
