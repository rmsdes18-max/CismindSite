import { useState, useRef, useEffect } from 'react'
import { env } from '@/config/env'

interface Props {
  name: string | null
  picture: string | null
  email: string | null
  onLogout: () => void
}

export function UserBadge({ name, picture, email, onLogout }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  if (!env.useGoogle) return null

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        {picture ? (
          <img
            src={picture}
            alt={name ?? ''}
            className="w-6 h-6 rounded-full"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-6 h-6 rounded-full bg-ink-faded flex items-center justify-center font-mono text-[10px] text-paper">
            {(name ?? 'U')[0]?.toUpperCase()}
          </div>
        )}
        <span className="font-mono text-[11px] text-ink-faded tracking-[0.03em] hidden sm:inline">
          {name?.split(' ')[0]}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 bg-paper border border-rule rounded-sm shadow-[0_8px_24px_rgba(0,0,0,0.12)] py-2 px-3 min-w-[180px] z-40">
          <div className="font-mono text-[10px] text-ink-faded tracking-[0.05em] mb-1 uppercase">
            Cont
          </div>
          <div className="font-display text-sm text-ink mb-0.5">{name}</div>
          <div className="font-mono text-[11px] text-ink-faded mb-3">{email}</div>
          <button
            onClick={() => {
              setOpen(false)
              onLogout()
            }}
            className="w-full text-left font-mono text-[11px] tracking-[0.08em] uppercase text-ink-faded hover:text-accent transition-colors py-1.5 border-t border-rule-soft"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}
