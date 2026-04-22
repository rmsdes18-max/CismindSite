/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_USE_GOOGLE: string
  readonly VITE_GOOGLE_CLIENT_ID: string
  readonly VITE_SHEETS_ID: string
  readonly VITE_SHEETS_TAB: string
  readonly VITE_DRIVE_ROOT_FOLDER_ID: string
  readonly VITE_ALLOWED_EMAILS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
