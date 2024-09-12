/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_GOOGLE_KEY: string
  readonly VITE_NUTRITIONIX_ID: string
  readonly VITE_NUTRITIONIX_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}