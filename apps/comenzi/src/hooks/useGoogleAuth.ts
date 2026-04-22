import { useState, useEffect, useCallback, useRef } from 'react'
import { env } from '@/config/env'
import {
  requestAccessToken,
  fetchUserInfo,
  revokeToken,
  clearToken,
  getToken,
  hasValidToken,
  waitForGis,
  persistUser,
  restoreUser,
} from '@/lib/google/client'
import type { AuthState } from '@/types/google'

type AuthStatus = AuthState['status']

interface AuthHookState {
  status: AuthStatus
  email: string | null
  name: string | null
  picture: string | null
}

export function useGoogleAuth(): AuthState {
  const [state, setState] = useState<AuthHookState>(() => {
    if (!env.useGoogle) return { status: 'authenticated', email: null, name: null, picture: null }

    // If we have a valid token from sessionStorage, restore immediately
    if (hasValidToken()) {
      const user = restoreUser()
      if (user) {
        return { status: 'authenticated', email: user.email, name: user.name, picture: user.picture }
      }
      // Have token but no user info — need to fetch it
      return { status: 'loading', email: null, name: null, picture: null }
    }

    return { status: 'unauthenticated', email: null, name: null, picture: null }
  })
  const triedRestore = useRef(false)

  // On mount: if we have token but no user info, fetch user info
  useEffect(() => {
    if (!env.useGoogle || triedRestore.current) return
    triedRestore.current = true

    if (state.status !== 'loading') return

    let cancelled = false
    const fetchUser = async () => {
      try {
        const token = await getToken()
        const user = await fetchUserInfo(token)
        if (cancelled) return

        if (
          env.allowedEmails.length > 0 &&
          !env.allowedEmails.includes(user.email.toLowerCase())
        ) {
          await revokeToken()
          setState({ status: 'unauthorized', email: user.email, name: user.name, picture: user.picture })
          return
        }

        persistUser(user)
        setState({ status: 'authenticated', email: user.email, name: user.name, picture: user.picture })
      } catch {
        if (!cancelled) {
          clearToken()
          setState({ status: 'unauthenticated', email: null, name: null, picture: null })
        }
      }
    }

    fetchUser()
    return () => { cancelled = true }
  }, [state.status])

  const login = useCallback(async () => {
    setState((s) => ({ ...s, status: 'loading' }))
    try {
      await waitForGis()
      await requestAccessToken({ prompt: 'consent' })

      const token = await getToken()
      const user = await fetchUserInfo(token)

      if (
        env.allowedEmails.length > 0 &&
        !env.allowedEmails.includes(user.email.toLowerCase())
      ) {
        await revokeToken()
        setState({ status: 'unauthorized', email: user.email, name: user.name, picture: user.picture })
        return
      }

      persistUser(user)
      setState({ status: 'authenticated', email: user.email, name: user.name, picture: user.picture })
    } catch {
      clearToken()
      setState((s) => ({ ...s, status: 'unauthenticated' }))
    }
  }, [])

  const logout = useCallback(async () => {
    await revokeToken()
    setState({ status: 'unauthenticated', email: null, name: null, picture: null })
  }, [])

  const getTokenFn = useCallback(async (): Promise<string> => {
    if (hasValidToken()) return getToken()

    // Token expired — user needs to re-login
    clearToken()
    setState((s) => ({ ...s, status: 'unauthenticated' }))
    throw new Error('Sesiunea a expirat.')
  }, [])

  return {
    ...state,
    login,
    logout,
    getToken: getTokenFn,
  }
}
