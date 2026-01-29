/// <reference types="vite/client" />
/// <reference types="vitest" />
/// <reference types="vite" />

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly BASE?: string;
}
