import { z } from 'zod/v4'

const schema = z.object({
  VITE_USE_GOOGLE: z.enum(['true', 'false']).default('false'),
  VITE_GOOGLE_CLIENT_ID: z.string().optional(),
  VITE_SHEETS_ID: z.string().optional(),
  VITE_SHEETS_TAB: z.string().default('Orders'),
  VITE_DRIVE_ROOT_FOLDER_ID: z.string().optional(),
  VITE_ALLOWED_EMAILS: z.string().optional(),
})

export const env = (() => {
  const parsed = schema.parse(import.meta.env)
  const useGoogle = parsed.VITE_USE_GOOGLE === 'true'

  if (useGoogle) {
    const required: (keyof typeof parsed)[] = [
      'VITE_GOOGLE_CLIENT_ID',
      'VITE_SHEETS_ID',
      'VITE_DRIVE_ROOT_FOLDER_ID',
    ]
    for (const k of required) {
      if (!parsed[k]) {
        throw new Error(`[Comenzi] Lipsește variabila de env: ${k}`)
      }
    }
  }

  return {
    useGoogle,
    googleClientId: parsed.VITE_GOOGLE_CLIENT_ID ?? '',
    sheetsId: parsed.VITE_SHEETS_ID ?? '',
    sheetsTab: parsed.VITE_SHEETS_TAB,
    driveRootFolderId: parsed.VITE_DRIVE_ROOT_FOLDER_ID ?? '',
    allowedEmails: (parsed.VITE_ALLOWED_EMAILS ?? '')
      .split(',')
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean),
  }
})()
