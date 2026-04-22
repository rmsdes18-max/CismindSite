import { env } from '@/config/env'
import type { TokenResponse, GoogleUserInfo } from '@/types/google'

declare global {
  interface Window {
    google?: {
      accounts: {
        oauth2: {
          initTokenClient: (config: {
            client_id: string
            scope: string
            callback: (response: TokenResponse) => void
            error_callback?: (error: { type: string; message: string }) => void
          }) => { requestAccessToken: (opts?: { prompt?: string }) => void }
          revoke: (token: string, callback: () => void) => void
        }
      }
    }
  }
}

const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
].join(' ')

const TOKEN_KEY = 'cismind.tk'
const EXPIRY_KEY = 'cismind.tkexp'
const USER_KEY = 'cismind.user'

// Token lives in memory + sessionStorage (cleared on tab close)
let accessToken: string | null = null
let tokenExpiresAt = 0

// Restore from sessionStorage on module load (survives refresh)
function restoreFromSession(): void {
  try {
    const tk = sessionStorage.getItem(TOKEN_KEY)
    const exp = sessionStorage.getItem(EXPIRY_KEY)
    if (tk && exp) {
      const expNum = parseInt(exp, 10)
      if (expNum > Date.now()) {
        accessToken = tk
        tokenExpiresAt = expNum
      } else {
        // Expired — clean up
        sessionStorage.removeItem(TOKEN_KEY)
        sessionStorage.removeItem(EXPIRY_KEY)
        sessionStorage.removeItem(USER_KEY)
      }
    }
  } catch { /* noop */ }
}

function persistToSession(): void {
  try {
    if (accessToken && tokenExpiresAt > 0) {
      sessionStorage.setItem(TOKEN_KEY, accessToken)
      sessionStorage.setItem(EXPIRY_KEY, String(tokenExpiresAt))
    }
  } catch { /* noop */ }
}

function clearSession(): void {
  try {
    sessionStorage.removeItem(TOKEN_KEY)
    sessionStorage.removeItem(EXPIRY_KEY)
    sessionStorage.removeItem(USER_KEY)
  } catch { /* noop */ }
}

export function persistUser(user: GoogleUserInfo): void {
  try {
    sessionStorage.setItem(USER_KEY, JSON.stringify(user))
  } catch { /* noop */ }
}

export function restoreUser(): GoogleUserInfo | null {
  try {
    const raw = sessionStorage.getItem(USER_KEY)
    if (raw) return JSON.parse(raw) as GoogleUserInfo
  } catch { /* noop */ }
  return null
}

// Restore on module init
restoreFromSession()

export function isGisReady(): boolean {
  return typeof window !== 'undefined' && !!window.google?.accounts?.oauth2
}

export async function waitForGis(timeoutMs = 5000): Promise<void> {
  const start = Date.now()
  while (!isGisReady()) {
    if (Date.now() - start > timeoutMs) {
      throw new Error('Google Identity Services nu s-a încărcat. Verifică conexiunea.')
    }
    await new Promise((r) => setTimeout(r, 100))
  }
}

export function requestAccessToken(opts?: { prompt?: string }): Promise<TokenResponse> {
  return new Promise((resolve, reject) => {
    if (!window.google?.accounts?.oauth2) {
      reject(new Error('GIS not loaded'))
      return
    }

    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: env.googleClientId,
      scope: SCOPES,
      callback: (response: TokenResponse) => {
        if (response.error) {
          reject(new Error(response.error))
          return
        }
        accessToken = response.access_token
        tokenExpiresAt = Date.now() + response.expires_in * 1000
        persistToSession()
        resolve(response)
      },
      error_callback: (error) => {
        reject(new Error(error.message || 'OAuth error'))
      },
    })

    client.requestAccessToken({ prompt: opts?.prompt ?? 'consent' })
  })
}

export async function getToken(): Promise<string> {
  if (accessToken && Date.now() < tokenExpiresAt - 60_000) {
    return accessToken
  }

  // Token gone — caller needs to handle re-auth
  clearToken()
  throw new Error('Sesiunea a expirat. Loghează-te din nou.')
}

export async function fetchUserInfo(token: string): Promise<GoogleUserInfo> {
  const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('Nu am putut obține informațiile contului.')
  return res.json()
}

export function revokeToken(): Promise<void> {
  return new Promise((resolve) => {
    if (!accessToken) {
      clearToken()
      resolve()
      return
    }
    const token = accessToken
    clearToken()
    if (window.google?.accounts?.oauth2) {
      window.google.accounts.oauth2.revoke(token, () => resolve())
    } else {
      resolve()
    }
  })
}

export function clearToken(): void {
  accessToken = null
  tokenExpiresAt = 0
  clearSession()
}

export function hasValidToken(): boolean {
  return !!accessToken && Date.now() < tokenExpiresAt - 60_000
}
