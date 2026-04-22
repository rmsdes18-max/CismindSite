export interface AuthState {
  status: 'loading' | 'unauthenticated' | 'authenticated' | 'unauthorized'
  email: string | null
  name: string | null
  picture: string | null
  login: () => Promise<void>
  logout: () => Promise<void>
  getToken: () => Promise<string>
}

export interface TokenResponse {
  access_token: string
  expires_in: number
  scope: string
  token_type: string
  error?: string
}

export interface GoogleUserInfo {
  email: string
  name: string
  picture: string
}
