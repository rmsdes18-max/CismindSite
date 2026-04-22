import { useState } from 'react'
import type { OrderVersion } from '@/types/order'
import { fmtRelative } from '@/lib/dates'

interface Props {
  versions: OrderVersion[]
  onAddVersion: (note: string) => void
}

export function VersionsBlock({ versions, onAddVersion }: Props) {
  const [text, setText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    onAddVersion(text.trim())
    setText('')
  }

  const nextV = (versions[versions.length - 1]?.v ?? 0) + 1

  return (
    <div className="col-span-full pt-1.5 border-t border-dashed border-rule mt-1.5">
      <div className="flex items-baseline justify-between mb-3">
        <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink">
          Versiuni de progres
        </span>
        <span className="font-mono text-[10px] text-ink-faded tracking-[0.05em]">
          {versions.length} {versions.length === 1 ? 'versiune' : 'versiuni'}
        </span>
      </div>

      {versions.length === 0 && (
        <div className="font-mono text-[11px] text-ink-faded py-1 pb-2.5 tracking-[0.03em]">
          — nicio versiune încă —
        </div>
      )}

      {versions.length > 0 && (
        <ol className="list-none m-0 mb-2.5 p-0 pl-2 border-l border-rule relative">
          {versions.map((ver, i) => {
            const isLatest = i === versions.length - 1
            return (
              <li
                key={i}
                className="relative grid grid-cols-[50px_110px_1fr] gap-3 py-2 pl-3 items-baseline"
              >
                <span
                  className={`absolute -left-1 top-3.5 w-[7px] h-[7px] rounded-full ${
                    isLatest
                      ? 'bg-accent shadow-[0_0_0_3px_rgba(231,0,80,0.15)]'
                      : 'bg-ink-faded'
                  }`}
                />
                <span
                  className={`font-mono text-xs tracking-[0.03em] ${
                    isLatest ? 'text-accent' : 'text-ink'
                  }`}
                >
                  v{ver.v}
                </span>
                <span className="font-mono text-[10px] text-ink-faded tracking-[0.03em]">
                  {fmtRelative(ver.at)}
                </span>
                <span
                  className={`font-display text-sm leading-[1.4] ${
                    isLatest ? 'text-ink' : 'text-ink-soft'
                  }`}
                >
                  {ver.note}
                </span>
              </li>
            )
          })}
        </ol>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex gap-2.5 items-center py-2 border-t border-dashed border-rule mt-1.5"
      >
        <span className="font-mono text-[11px] text-accent min-w-7 tracking-[0.03em]">
          v{nextV}
        </span>
        <input
          placeholder="ce s-a schimbat în această versiune"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 font-display text-sm py-1.5 placeholder:text-ink-faded placeholder:italic"
        />
        <button
          type="submit"
          className="font-mono text-[10px] tracking-[0.08em] uppercase text-ink-faded px-2.5 py-1.5 rounded-sm hover:text-accent transition-colors"
        >
          + adaugă
        </button>
      </form>
    </div>
  )
}
