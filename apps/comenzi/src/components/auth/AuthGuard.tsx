import type { ReactNode } from 'react'
import { env } from '@/config/env'
import type { AuthState } from '@/types/google'
import { LoginScreen } from './LoginScreen'

interface Props {
  auth: AuthState
  children: ReactNode
}

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-paper grid place-items-center">
      <div className="font-display text-[32px] font-normal tracking-[-0.01em]">
        Cismind<em className="italic text-accent font-medium">.</em>
      </div>
    </div>
  )
}

function UnauthorizedScreen({ email, onLogout }: { email: string | null; onLogout: () => void }) {
  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-6">
      <div className="max-w-sm w-full text-center">
        <div className="font-display text-[28px] font-normal tracking-[-0.01em] mb-8">
          Cismind<em className="italic text-accent font-medium">.</em>
        </div>

        <h1 className="font-display text-xl font-normal mb-2">Acces restricționat</h1>
        <p className="font-mono text-xs text-ink-faded tracking-[0.02em] mb-2">
          Contul <span className="text-ink">{email}</span> nu are acces la această aplicație.
        </p>
        <p className="font-mono text-xs text-ink-faded tracking-[0.02em] mb-8">
          Contactează un administrator pentru a fi adăugat.
        </p>

        <button
          onClick={onLogout}
          className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink-faded hover:text-accent transition-colors"
        >
          ← Încearcă alt cont
        </button>
      </div>
    </div>
  )
}

export function AuthGuard({ auth, children }: Props) {
  if (!env.useGoogle) return <>{children}</>

  if (auth.status === 'loading') return <LoadingScreen />
  if (auth.status === 'unauthenticated') return <LoginScreen onLogin={auth.login} />
  if (auth.status === 'unauthorized')
    return <UnauthorizedScreen email={auth.email} onLogout={auth.logout} />

  return <>{children}</>
}
