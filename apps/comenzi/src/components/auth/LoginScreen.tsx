interface Props {
  onLogin: () => void
  isLoading?: boolean
}

export function LoginScreen({ onLogin, isLoading }: Props) {
  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-6">
      <div className="max-w-sm w-full text-center">
        <div className="font-display text-[28px] font-normal tracking-[-0.01em] mb-2">
          Cismind<em className="italic text-accent font-medium">.</em>
        </div>
        <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faded mb-12">
          Comenzi Tracker
        </div>

        <h1 className="font-display text-xl font-normal mb-2">
          Bine ai venit.
        </h1>
        <p className="font-mono text-xs text-ink-faded tracking-[0.02em] mb-8">
          Loghează-te cu contul Google Cismind pentru a accesa comenzile.
        </p>

        <button
          onClick={onLogin}
          disabled={isLoading}
          className="w-full font-mono text-[11px] tracking-[0.1em] uppercase text-paper bg-ink px-5 py-3.5 rounded-sm hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Se conectează...' : 'Login cu Google'}
        </button>
      </div>
    </div>
  )
}
