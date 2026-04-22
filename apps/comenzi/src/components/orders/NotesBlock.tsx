import { useState } from 'react'
import type { OrderNote } from '@/types/order'
import { fmtRelative } from '@/lib/dates'

interface Props {
  notes: OrderNote[]
  onAddNote: (text: string) => void
}

export function NotesBlock({ notes, onAddNote }: Props) {
  const [text, setText] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    onAddNote(text.trim())
    setText('')
  }

  return (
    <div className="col-span-full pt-1.5 border-t border-dashed border-rule mt-1.5">
      <div className="flex items-baseline justify-between mb-3">
        <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink">Note</span>
        <span className="font-mono text-[10px] text-ink-faded tracking-[0.05em]">
          {notes.length}
        </span>
      </div>

      {notes.length === 0 && (
        <div className="font-mono text-[11px] text-ink-faded py-1 pb-2.5 tracking-[0.03em]">
          — fără note —
        </div>
      )}

      {notes.length > 0 && (
        <ul className="list-none m-0 mb-2.5 p-0">
          {notes.map((n, i) => (
            <li key={i} className="py-2.5 border-b border-dashed border-rule last:border-b-0">
              <div className="flex justify-between mb-1">
                <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-ink">
                  {n.by}
                </span>
                <span className="font-mono text-[10px] text-ink-faded tracking-[0.03em]">
                  {fmtRelative(n.at)}
                </span>
              </div>
              <div className="font-display text-[13px] leading-[1.45] text-ink-soft">{n.text}</div>
            </li>
          ))}
        </ul>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex gap-2.5 items-center py-2 border-t border-dashed border-rule mt-1.5"
      >
        <span className="font-mono text-[11px] text-accent min-w-7 tracking-[0.03em]">›</span>
        <input
          placeholder="adaugă o notă…"
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
